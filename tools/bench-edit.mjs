// Times what runs per edit on the real library (ISSUES.md E1-E4): reindex and its parts, serialising (autosave), the tree counts, an 80-word bulk add, the sub-theme table.
// Run: node tools/bench-edit.mjs [library file]   Reads only; writes nothing.
import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import * as M from '../js/model.js';
const { reindex, addEntry, sameText, themeStats, descendants, deleteEntry, unlinkEntry, themeLocked } = M;
import { parseProject, serializeProject } from '../js/store.js';

const lib = process.argv[2] || new URL('../data/wordlist-en.project.json', import.meta.url);
const text = readFileSync(lib, 'utf8');
const time = (label, fn, n = 5) => { fn(); const ts = []; for (let i = 0; i < n; i++) { const t0 = performance.now(); fn(); ts.push(performance.now() - t0); } ts.sort((a, b) => a - b); console.log(label.padEnd(52), ts[n >> 1].toFixed(1).padStart(8), 'ms (median of', n + ')'); };

let P = parseProject(text); reindex(P);
console.log(`${P.entries.length} entries, ${P.themes.length} themes`);
time('parseProject', () => parseProject(text), 3);
time('reindex (full)', () => reindex(P));
time('serializeProject (autosave)', () => serializeProject(P), 3);
time('tree counts: themeStats for every theme', () => { for (const t of P.themes) if (!t.group) themeStats(P, t.id); });

// The sub-theme table of entryTable (app.js) without the DOM: the pool, the forms map, the rows with the words under each root.
const tid = 'language_wordplay';
const subTable = () => {
  const t = P.ix.theme.get(tid), subIds = new Set([t.id, ...descendants(P, t.id).map(x => x.id)]);
  const pool = [...new Map([...subIds].flatMap(id => P.ix.byTheme.get(id) || []).map(e => [e.id, e])).values()];
  const formsOf = new Map();
  for (const a of P.entries) if (a.aliasKind === 'form' && a.aliasOf) { if (!formsOf.has(a.aliasOf)) formsOf.set(a.aliasOf, []); formsOf.get(a.aliasOf).push(a); }
  const own = e => e.typ[t.id] !== undefined, locked = themeLocked(P, t);
  const inList = new Set(pool.map(e => e.id)), roots = pool.filter(e => !e.aliasOf || !inList.has(e.aliasOf));
  let n = 0; for (const e of roots) n += pool.filter(x => x.aliasOf === e.id && x.aliasKind !== 'form' && !(locked && !own(x))).length;
  return [pool.length, roots.length, n];
};
console.log('sub-theme table of', tid, subTable());
time('sub-theme table, old (formsOf scan + per-root filter)', subTable, 3);
const subTableNew = () => {
  const t = P.ix.theme.get(tid), subIds = new Set([t.id, ...descendants(P, t.id).map(x => x.id)]);
  const pool = [...new Map([...subIds].flatMap(id => P.ix.byTheme.get(id) || []).map(e => [e.id, e])).values()];
  const formsOf = id => (P.ix.aliases.get(id) || []).filter(a => a.aliasKind === 'form');
  for (const e of pool) formsOf(e.id);
  const own = e => e.typ[t.id] !== undefined, locked = themeLocked(P, t);
  const inList = new Set(pool.map(e => e.id)), roots = pool.filter(e => !e.aliasOf || !inList.has(e.aliasOf));
  const kids = new Map(); for (const x of pool) if (x.aliasOf) { if (!kids.has(x.aliasOf)) kids.set(x.aliasOf, []); kids.get(x.aliasOf).push(x); }
  let n = 0; for (const e of roots) n += (kids.get(e.id) || []).filter(x => x.aliasKind !== 'form' && !(locked && !own(x))).length;
  return [pool.length, roots.length, n];
};
console.log('new gives', subTableNew());
time('sub-theme table, new (alias index + grouped once)', subTableNew, 3);

// Bulk add of 80 new words to one theme, the way dialogs.js bulkAdd did it (reindex after each word) and the way it does now (indexEntry).
const words = Array.from({ length: 80 }, (_, i) => 'benchword' + i);
const bulk = (inc) => { const Q = parseProject(text); reindex(Q); const t0 = performance.now();
  for (const w of words) { if (sameText(Q, w).length) continue; const e = addEntry(Q, w, { typ: { colors: 3 } }); inc ? M.indexEntry(Q, e) : reindex(Q); }
  reindex(Q); return performance.now() - t0; };
console.log('bulk add 80 words, reindex per word'.padEnd(52), bulk(false).toFixed(0).padStart(8), 'ms');
if (M.indexEntry) console.log('bulk add 80 words, indexEntry per word'.padEnd(52), bulk(true).toFixed(0).padStart(8), 'ms');

// One edit dialog save, end to end minus the DOM: the edit itself, then the index update.
const e = P.entries.find(x => !x.aliasOf && Object.keys(x.typ).length > 1 && P.ix.aliases.get(x.id));
time('edit: unlink one theme + full reindex', () => { const tid = Object.keys(e.typ)[0], v = e.typ[tid]; unlinkEntry(P, e, tid); reindex(P); e.typ[tid] = v; reindex(P); }, 5);
if (M.reindexEntries) time('edit: unlink one theme + reindexEntries', () => { const tid = Object.keys(e.typ)[0], v = e.typ[tid]; unlinkEntry(P, e, tid); M.reindexEntries(P, [e]); e.typ[tid] = v; M.reindexEntries(P, [e]); }, 5);
{ const Q = parseProject(text); reindex(Q); const x = Q.ix.entry.get(e.id), t0 = performance.now(); M.updateIndex ? M.updateIndex(Q, deleteEntry(Q, x)) : (deleteEntry(Q, x), reindex(Q)); console.log('delete a root with aliases + index update'.padEnd(52), (performance.now() - t0).toFixed(1).padStart(8), 'ms (once)'); }

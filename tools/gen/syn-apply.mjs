// Applies synonym review results (phase 3 of DESIGN-entries.md): node tools/gen/syn-apply.mjs <result file>... [--lib file]
// One line per synonym alias:
//   Y <id> [-<theme id>]... [~<theme id>]...   a true synonym of its root: it becomes an entry of its own in every theme its root is in (and its own themes), grouped with the root there.
//                                              -theme: not in that theme at all; ~theme: in it but not grouped with the root (not interchangeable there).
//   O <id> | <meaning label or ->             a different sense: an entry of its own with only its own theme links, no group.
//   X <id>                                    delete (the root already covers it; no theme link of its own worth keeping)
//   R <id> <spelling|form|regional|abbreviation|translation> [UK,AU...]   it is really another kind of alias of the root; its own links move to the root.
//   F <id> [UK,AU...]                          flip: the synonym becomes the root and the old root becomes its regional alias, tagged with the given regions (the old root's own region when none is given). For a region-differing pair where the synonym is the US/default word.
// Done ids are recorded in tools/gen/syn/done.json.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry, sameText, ALIAS_KINDS } from '../../js/model.js';
const args = process.argv.slice(2), li = args.indexOf('--lib');
const LIB = li >= 0 ? args.splice(li, 2)[1] : new URL('../../data/wordlist-en.project.json', import.meta.url);
const doneFile = li >= 0 ? LIB + '.syn-done.json' : new URL('./syn/done.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const problems = [], stat = { Y: 0, O: 0, X: 0, R: 0, F: 0, groups: 0, links: 0 };
const group = (t, a, b) => {
  const gs = t.groups = t.groups || [];
  const ga = gs.find(g => g.includes(a)), gb = gs.find(g => g.includes(b));
  if (ga && gb) { if (ga !== gb) { ga.push(...gb.filter(x => !ga.includes(x))); gs.splice(gs.indexOf(gb), 1); } }
  else if (ga) ga.push(b); else if (gb) gb.push(a); else gs.push([a, b]);
  stat.groups++;
};
for (const f of args) for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
  const s = line.trim(); if (!s || s[0] === '#') continue;
  let m;
  const find = id => { const e = P.ix.entry.get(+id); if (!e || e.aliasKind !== 'synonym' || !e.aliasOf) { if (!done.has(+id)) problems.push(`${f}: ${id} is not a synonym alias (${s.slice(0, 50)})`); return null; } return e; };
  if ((m = /^Y (\d+)((?: [-~]\w+)*)$/.exec(s))) {
    const e = find(m[1]); if (!e) continue; const r = P.ix.entry.get(e.aliasOf);
    const drop = new Set(), loose = new Set();
    for (const x of m[2].trim().split(/\s+/).filter(Boolean)) (x[0] === '-' ? drop : loose).add(x.slice(1));
    for (const x of [...drop, ...loose]) if (!P.ix.theme.get(x)) problems.push(`${f}: no theme ${x}`);
    if (sameText(P, e.text).some(o => o !== e && !o.gloss) && !e.gloss) { problems.push(`${f}: ${e.id} "${e.text}" shares its text with an entry that has no label: use O with a label, or X`); continue; }
    for (const [t, p] of Object.entries(r.th)) if (e.th[t] === undefined && !drop.has(t)) e.th[t] = p;
    for (const t of drop) delete e.th[t];
    e.aliasOf = 0; e.aliasKind = ''; reindex(P);
    for (const t of Object.keys(e.th)) { stat.links++; if (r.th[t] !== undefined && !loose.has(t)) group(P.ix.theme.get(t), r.id, e.id); }
    done.add(e.id); stat.Y++;
  } else if ((m = /^O (\d+)(?: \| (.*))?$/.exec(s))) {
    const e = find(m[1]); if (!e) continue;
    const gloss = (m[2] || '').trim() === '-' ? '' : (m[2] || '').trim();
    if (gloss) e.gloss = gloss;
    if (sameText(P, e.text).some(o => o !== e && !o.gloss) && !e.gloss) { problems.push(`${f}: ${e.id} "${e.text}" needs a meaning label`); continue; }
    if (!Object.keys(e.th).length) { problems.push(`${f}: ${e.id} "${e.text}" has no theme links of its own: use X, Y or R`); continue; }
    e.aliasOf = 0; e.aliasKind = ''; reindex(P); done.add(e.id); stat.O++;
  } else if ((m = /^X (\d+)$/.exec(s))) {
    const e = find(m[1]); if (!e) continue; deleteEntry(P, e); reindex(P); done.add(+m[1]); stat.X++;
  } else if ((m = /^R (\d+) (\w+)(?: ([A-Z,]+))?$/.exec(s))) {
    const e = find(m[1]); if (!e) continue;
    if (!ALIAS_KINDS.includes(m[2]) || m[2] === 'synonym' || m[2] === '') { problems.push(`${f}: bad kind ${m[2]}`); continue; }
    const r = P.ix.entry.get(e.aliasOf);
    for (const [t, p] of Object.entries(e.th)) if (r.th[t] === undefined) r.th[t] = p;
    e.th = {}; e.aliasKind = m[2]; if (m[3]) e.region = m[3].split(','); reindex(P); done.add(e.id); stat.R++;
  } else if ((m = /^F (\d+)(?: ([A-Z,]+))?$/.exec(s))) {
    const e = find(m[1]); if (!e) continue; const r = P.ix.entry.get(e.aliasOf);
    for (const [t, p] of Object.entries(r.th)) if (e.th[t] === undefined) e.th[t] = p;
    for (const a of P.entries) if (a.aliasOf === r.id && a !== e) a.aliasOf = e.id;
    for (const t of P.themes) for (const g of t.groups || []) if (g.includes(r.id)) { const i = g.indexOf(r.id); if (g.includes(e.id)) g.splice(i, 1); else g[i] = e.id; }
    e.use = Object.assign({}, r.use, e.use); e.show = Object.assign({}, r.show, e.show); e.nameOkIn = [...new Set([...(e.nameOkIn || []), ...(r.nameOkIn || [])])];
    r.th = {}; r.use = {}; r.show = {}; r.nameOkIn = []; r.aliasOf = e.id; r.aliasKind = 'regional'; if (m[2]) r.region = m[2].split(',');
    e.aliasOf = 0; e.aliasKind = ''; e.region = []; reindex(P); done.add(e.id); stat.F++;
  } else problems.push(`${f}: cannot read "${s.slice(0, 60)}"`);
}
for (const p of problems.slice(0, 40)) console.log('PROBLEM', p);
if (problems.length > 40) console.log('... and', problems.length - 40, 'more');
reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
fs.writeFileSync(doneFile, JSON.stringify([...done].sort((a, b) => a - b)));
console.log(stat, 'library v' + P.lib.version, done.size, 'done');

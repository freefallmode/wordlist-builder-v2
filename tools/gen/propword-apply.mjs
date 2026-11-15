// Applies the proper-word review (BRIEF-propword.md): tools/gen/propword/out-<n>.txt, then tools/gen/propword/settled.txt, whose lines override.
// Line: `id <TAB> verdict <TAB> text <TAB> note`.
//   P  the entry contains a proper word: the text takes the given capitals and the entry is typed proper
//   C  no proper word: the text is stored as given (lowercase); the type stays
//   K  keep as it is          X, ?  not applied: they must be settled in settled.txt (a P, C or K line for the id), or by hand
// settled.txt (written by whoever settles the open lines; its P, C, K lines may also name entries that were on no list) may also hold:
//   `id <TAB> PT <TAB> text`               P, and the entry is flagged as a trademark
//   `M <TAB> fromId <TAB> intoId`          merge two entries that are one thing (applied after the case changes)
//   `S <TAB> id <TAB> themeId <TAB> text`  set the shown text of one link (an empty text removes it)
// After a text change every shown text of the entry follows the case of the new text word by word (`neapolitan` -> `Neapolitan`), and a shown text
// equal to the entry text is dropped. Two roots that end up with the same text, neither with a meaning label, are merged (the lower id survives).
// The word list of the case lint (js/caselint-words.js) is rewritten: PROPER_WORDS gains the words the review capitalised, LOWER_OK the entries
// judged right in lowercase that contain one of those words.
// Run: node tools/gen/propword-apply.mjs            (dry run: prints what would change, writes nothing)
//      node tools/gen/propword-apply.mjs --apply    (writes the library with a new version, js/caselint-words.js and propword/log.txt)
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint, initialism, properWordsIn } from '../../js/caselint.js';
import { PROPER_WORDS, LOWER_OK } from '../../js/caselint-words.js';
import { CASE_OK } from '../../js/caselint-allow.js';
import { parseFreq, setFreq } from '../../js/freq.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(here('../../data/freq-en.txt'), 'utf8')));
const low = s => s.toLowerCase(), cap = s => /^\p{Lu}/u.test(s);
const core = w => w.replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, '');
const words = s => s.split(/[\s/]+/).map(core).filter(Boolean);
const tally = (xs, k) => { const m = {}; for (const x of xs) { const key = k(x); m[key] = (m[key] || 0) + 1; } return m; };
const issues = () => tally(validate(P).filter(i => i.sev !== 'info'), i => i.sev + ':' + i.kind);
const before = issues();

// ----- read the verdicts -----
const V = new Map(), merges = [], shows = [], bad = [], log = [];
const read = (file, override) => {
  if (!fs.existsSync(file)) return 0;
  let n = 0;
  for (const l of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    if (!l.trim() || l.startsWith('#')) continue;
    const f = l.split('\t').map(s => s.trim());
    if (f[0] === 'M') { merges.push([+f[1], +f[2]]); continue; }
    if (f[0] === 'S') { shows.push([+f[1], f[2], f[3] || '']); continue; }
    const [id, v, text = '', note = ''] = f;
    if (!/^\d+$/.test(id) || !['P', 'PT', 'C', 'K', 'X', '?'].includes(v)) { bad.push('unreadable: ' + l); continue; }
    if (V.has(+id) && !override) bad.push('listed twice: ' + l);
    V.set(+id, { v, text, note }); n++;
  }
  return n;
};
let nOut = 0; for (let i = 1; fs.existsSync(here(`./propword/out-${i}.txt`)); i++) nOut += read(here(`./propword/out-${i}.txt`), false);
const nSettled = read(here('./propword/settled.txt'), true);
const listed = new Set(); for (let i = 1; fs.existsSync(here(`./propword/list-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./propword/list-${i}.txt`), 'utf8').split(/\r?\n/)) if (l.trim()) listed.add(+l.split('\t')[0]);
for (const id of listed) if (!V.has(id)) bad.push('no verdict for ' + id);

// ----- apply the case changes -----
const alignCase = (show, text) => {   // each word of the shown text takes the case it has in the entry text
  const m = new Map(words(text).map(w => [low(w), w]));
  return show.split(/(\s+|\/)/).map(tok => { const c = core(tok); return c && m.has(low(c)) ? tok.replace(c, m.get(low(c))) : tok; }).join('');
};
const stat = { P: 0, C: 0, K: 0, open: 0, textChanged: 0, typed: 0, shows: 0, showsDropped: 0, merged: 0 }, changed = new Set(), open = [];
const capitalised = new Map(), keptLower = new Set();   // word -> example, for the lint's word list
for (const [id, d] of V) {
  const e = P.ix.entry.get(id);
  if (!e) { bad.push('no entry ' + id); continue; }
  if (d.v === 'X' || d.v === '?') { stat.open++; open.push(`${id}\t${d.v}\t${e.text}\t${d.note}`); continue; }
  if (d.v === 'PT') { d.v = 'P'; if (!e.tm) { e.tm = true; changed.add(id); log.push(`trademark flag set: ${e.text}`); } }
  stat[d.v]++;
  if (d.v === 'K') { for (const w of words(e.text)) if (!cap(w)) keptLower.add(w); continue; }
  if (!d.text || low(d.text) !== low(e.text)) { bad.push(`${id}: "${d.text}" is not "${e.text}" with other capitals`); continue; }
  if (d.v === 'C' && words(d.text).some(w => cap(w) && !initialism(w))) { bad.push(`${id}: C verdict with a capital: "${d.text}"`); continue; }
  if (d.v === 'P' && !words(d.text).some(cap)) { bad.push(`${id}: P verdict with no capital: "${d.text}"`); continue; }
  const old = e.text;
  if (d.v === 'P') { const cw = words(d.text).filter(w => cap(w) && !initialism(w)); if (cw.length === 1 && words(d.text).length > 1) capitalised.set(low(cw[0]), d.text); }   // one name inside a phrase; `Lab` alone or `Black Forest cake` teach the lint nothing safe
  else for (const w of words(d.text)) keptLower.add(w);
  if (old !== d.text) { e.text = d.text; stat.textChanged++; changed.add(id); log.push(`text: ${old} -> ${d.text}`); }
  if (d.v === 'P' && e.type !== 'proper') { log.push(`type: ${e.text}: ${e.type} -> proper`); e.type = 'proper'; stat.typed++; changed.add(id); }
  for (const [tid, s] of Object.entries(e.show || {})) {
    const s2 = alignCase(s, e.text);
    if (s2 === e.text) { delete e.show[tid]; stat.showsDropped++; changed.add(id); log.push(`shown text dropped (same as the entry): ${e.text} in ${tid}`); }
    else if (s2 !== s) { e.show[tid] = s2; stat.shows++; changed.add(id); log.push(`shown: ${e.text} in ${tid}: ${s} -> ${s2}`); }
  }
}

// ----- merges: asked for in settled.txt, and roots that now share a text with no meaning label on either -----
const merge = (from, into) => {
  for (const [t, v] of Object.entries(from.typ)) if (into.typ[t] === undefined) { into.typ[t] = v; if (from.show?.[t]) into.show[t] = from.show[t]; if (from.use?.[t]) into.use[t] = from.use[t]; }
  for (const t of from.nameOkIn || []) if (into.typ[t] !== undefined && !into.nameOkIn.includes(t)) into.nameOkIn.push(t);
  for (const a of P.entries) { if (a.aliasOf === from.id) a.aliasOf = into.id; for (const [t, id] of Object.entries(a.use || {})) if (id === from.id) a.use[t] = into.id; }
  for (const th of P.themes) if (th.groups) { th.groups = th.groups.map(g => [...new Set(g.map(id => id === from.id ? into.id : id))]).filter(g => g.length > 1); if (!th.groups.length) delete th.groups; }
  for (const k of ['adult', 'sensitive', 'tm', 'vulgar']) into[k] = into[k] || from[k];
  for (const r of from.region || []) if (!into.region.includes(r)) into.region.push(r);
  if (!into.gloss && from.gloss) into.gloss = from.gloss;
  for (const k of CASE_OK) if (k.startsWith(from.id + '|')) log.push(`NOTE: js/caselint-allow.js has the key ${k} of a merged entry; move it to ${into.id}`);
  P.entries = P.entries.filter(x => x !== from); stat.merged++; changed.add(into.id);
  log.push(`merged: ${from.id} "${from.text}"${from.gloss ? ' [' + from.gloss + ']' : ''} into ${into.id} "${into.text}"${into.gloss ? ' [' + into.gloss + ']' : ''}`);
};
for (const [id, tid, s] of shows) {
  const e = P.ix.entry.get(id); if (!e || !P.ix.theme.get(tid) || e.typ[tid] === undefined) { bad.push(`S ${id} ${tid}: no such entry, theme or link`); continue; }
  const was = e.show?.[tid] || ''; if (s) e.show[tid] = s; else delete e.show[tid];
  changed.add(id); log.push(`shown (settled): ${e.text} in ${tid}: ${was || '(none)'} -> ${s || '(none)'}`);
}
reindex(P);
for (const [a, b] of merges) { const from = P.ix.entry.get(a), into = P.ix.entry.get(b); if (!from || !into) { bad.push(`merge ${a} ${b}: no such entry`); continue; } merge(from, into); reindex(P); }
const collisions = [];
{ const byText = new Map(); for (const e of P.entries) { if (!byText.has(e.text)) byText.set(e.text, []); byText.get(e.text).push(e); }
  for (const [text, es] of byText) {
    if (es.length < 2 || !es.some(e => changed.has(e.id))) continue;
    if (es.length === 2 && es.every(e => !e.aliasOf && !e.gloss)) { const [into, from] = [...es].sort((x, y) => x.id - y.id); merge(from, into); into.type = 'proper'; continue; }
    collisions.push(`"${text}": ` + es.map(e => `${e.id}${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}${e.aliasOf ? ' alias of ' + e.aliasOf : ''} (${Object.keys(e.typ).length} links)`).join('  |  '));
  } }
reindex(P);

// ----- the lint's word list -----
const commonSingle = new Set(P.entries.filter(e => (e.type === 'common' || e.type === 'phrase') && !/\s/.test(e.text) && !cap(e.text)).map(e => e.text));
const NOT_LEARNED = new Set(['colonial', 'brazil']);   // colonial: capitalised in one phrase (Colonial architecture) but an ordinary word in most; brazil: brazil nut is lowercase by Simon's decision of 2026-11-14 (propword-fix-brazil.mjs)
const newWords = [...capitalised.keys()].filter(w => w.length > 2 && !PROPER_WORDS.has(w) && !keptLower.has(w) && !commonSingle.has(w) && !NOT_LEARNED.has(w)).sort();
for (const w of newWords) PROPER_WORDS.add(w);
const lowerOk = P.entries.filter(e => (e.type === 'common' || e.type === 'phrase') && !/\p{Lu}/u.test(e.text) && properWordsIn(e.text).length && (LOWER_OK.has(e.id) || ['K', 'C'].includes(V.get(e.id)?.v)));
for (const e of lowerOk) LOWER_OK.add(e.id);
const wrap = ws => { const out = []; let line = ''; for (const w of ws) { if ((line + ' ' + w).length > 150) { out.push(line); line = w; } else line = line ? line + ' ' + w : w; } if (line) out.push(line); return out.join('\n'); };
const wordsFile = () => {
  const src = fs.readFileSync(here('../../js/caselint-words.js'), 'utf8');
  const head = src.slice(0, src.indexOf('export const PROPER_WORDS')), mid = src.slice(src.indexOf('// Entries (by id)'), src.indexOf('export const LOWER_OK'));
  return head + 'export const PROPER_WORDS = new Set(`\n' + wrap([...PROPER_WORDS].sort()) + '\n`.split(/\\s+/).filter(Boolean));\n\n' + mid +
    'export const LOWER_OK = new Set([\n' + lowerOk.sort((a, b) => a.text.localeCompare(b.text)).map(e => `  ${e.id}, // ${e.text}`).join('\n') + '\n]);\n';
};

// ----- report -----
const after = issues(), lint = caseLint(P);
console.log(`${nOut} verdicts, ${nSettled} settled lines, ${listed.size} listed`);
console.log(stat);
console.log(`${newWords.length} words added to PROPER_WORDS: ${newWords.join(' ')}`);
console.log(`${lowerOk.length} entries in LOWER_OK: ${lowerOk.map(e => e.text).join(', ')}`);
if (bad.length) console.log(`\n${bad.length} PROBLEMS\n  ` + bad.join('\n  '));
if (open.length) console.log(`\n${open.length} OPEN (X or ?), to settle in propword/settled.txt\n  ` + open.join('\n  '));
if (collisions.length) console.log(`\n${collisions.length} SAME TEXT after the changes, to settle (M lines)\n  ` + collisions.join('\n  '));
const delta = [...new Set([...Object.keys(before), ...Object.keys(after)])].filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log('\nChecks, errors and warnings that changed: ' + (delta.join('; ') || 'none'));
console.log('case lint after: ' + JSON.stringify(tally(lint, i => i.kind)));
for (const i of lint.slice(0, 40)) console.log('  ' + i.kind + ' | ' + i.msg);
if (process.argv.includes('--apply')) {
  if (bad.length) { console.error('Not applied: fix the problems first.'); process.exit(1); }
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  fs.writeFileSync(here('../../js/caselint-words.js'), wordsFile());
  fs.writeFileSync(here('./propword/log.txt'), log.join('\n') + '\n');
  console.log(`\nwritten: library v${P.lib.version}, js/caselint-words.js, propword/log.txt (${log.length} lines)`);
} else console.log(`\ndry run: nothing written (${log.length} log lines)`);

// Library batch v429: fixes from the review of Julia's v423-v428 (Body & Health), for Simon's review.
// Each change, by the batch it follows up:
//   v423 healing traditions
//   1. prunus africana 15633 -> "Prunus africana" (a binomial: the genus is a name, so a capital, typed proper) and linked back in
//      African remedies at its pre-v423 typicality 3 (v423 took it out only for its lowercase Latin spelling).
//   v424 sleep
//   2. feeling tired is a theme of synonyms: renamed "words for tired" (the id feeling_tired stays: ids are kept when a theme is renamed,
//      LIBRARY-RULES 4) and moved under synonyms beside words for big, words for noise (pop 2, ident 2 as there; lang comes from the folder).
//      tired leaves it (the name may not contain a member's word); its note drops tired. Its groups went at v425.
//   3. CPAP joins sleep (typicality 4, beside apnea, which it treats).
//   4. run-down gets the gloss tired (the review's call; see the notice: the text has one entry).
//   v425 nutrition
//   5. vitamins: vitamin B (a collection of vitamins), B complex (a supplement of them) and beta-carotene (a provitamin) out;
//      B complex joins supplements.
//   6. B12 -> "vitamin B12", shown "B12" in vitamins like vitamin B1 to B7 (shown B1 ... B7).
//   7. supplements: calcium, omega-3 and folic acid join (supplements has no groups, so omega-3 is not grouped with fish oil).
//   8. The eight non-vitamin stubs v425 left in no theme are deleted: vitamin P, B4, B8, B10, B11, B13, B15, B17.
//   v426 fitness
//   9. The words that were in both fitness and fitness words (v422) keep the better typicality of the two in fitness (LIBRARY-RULES 2:
//      a merge keeps the better typicality); cutting [fitness] takes the 3 of cutting [diet] 15981, which v426 deleted as its duplicate.
//  10. star [arms-out] 64806 leaves ways to jump and is deleted: jumping jack (alias star jump) is there.
//  11. boot camp [military] and basic training are ordinary nouns: type common, not phrase.
//  12. IT band 62747, in no theme since v426, is deleted.
//  13. cutting [fitness] 3653: familiarity 3 (that of the deleted cutting [diet]); its gloss fitness stays (it names the sense).
//   v427 mind and wellbeing
//  14. Mariánské Lázně 16592 becomes the translation alias of Marienbad 16591, the usual English name (it leaves European spa towns and
//      the group of the two goes); its plain alias Marianske Lazne 68109 now points at Marienbad (an alias cannot point at an alias), as a
//      translation too (it is the Czech name written plain, not a spelling of Marienbad).
//   v428 babies and birth
//  15. carrier [sling] 64021 -> "baby carrier", shown "carrier" in baby gear (as baby monitor is shown "monitor"); gloss dropped (the
//      text is now unique); its kin to carry [math] and carry [esports] goes (not one word family). The group with baby sling and baby
//      wrap stays.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch429.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteEntry, placeTheme, setKin } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
{ const b = new URL('../../data/breaks-en.txt', import.meta.url); if (fs.existsSync(b)) setBreaks(parseBreaks(fs.readFileSync(b, 'utf8'))); }
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const T = tid => { const t = ix.theme.get(tid); if (!t) throw Error('no theme ' + tid); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
// Difficulty spread and theme-difficulty gap of a theme (LIBRARY-RULES 3.7 and 6): usable roots, band = the game's word band.
const THEMES = ['african_remedies', 'sleep', 'feeling_tired', 'vitamins', 'supplements', 'fitness', 'ways_to_jump', 'european_spa_towns', 'baby_gear'];
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return 'no theme';
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.vulgar);
  const b = ws.map(e => difficultyBand(P, e, tid)).sort((x, y) => x - y), td = themeDifficulty(t);
  return `${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, theme difficulty ${td}, 4th-easiest band ${b[3]}, gap ${b[3] - td}`;
};
const prof0 = Object.fromEntries(THEMES.map(t => [t, profile(t)]));
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], alone = new Set(), deleted = [];
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const chk2 = (id, a, b) => { const e = E(id); if (e.text !== a && e.text !== b) throw Error(`${id} is "${e.text}", not "${a}" or "${b}"`); return e; };
const where = e => { const r = linkIds(P, e).filter(t => ix.theme.has(t)); return r.length ? `stays in ${r.join(', ')}` : 'now in no theme: not exported'; };
const unlinkE = (e, tid, why) => {
  T(tid);
  if (e.typ[tid] === undefined) return;
  unlinkEntry(P, e, tid); n++; reindex(P);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`out of ${tid}: ${lab(e)}: ${why} (${where(e)})`);
};
const out = (tid, list, why) => { for (const [id, text] of list) unlinkE(chk(id, text), tid, why); };
const linkE = (e, tid, typ, why, extra = {}) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return;
  e.typ[tid] = typ; n++;
  if (extra.show) e.show = { ...(e.show || {}), [tid]: extra.show };
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}): ${why}`);
};
const link = (id, text, tid, typ, why, extra) => linkE(chk(id, text), tid, typ, why, extra);
const rate = (id, text, tid, typ, why) => {
  const e = chk(id, text); if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++;
};
const setE = (id, text, field, value, why) => {
  const e = chk(id, text); if (JSON.stringify(e[field]) === JSON.stringify(value)) return;
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++;
};
const retext = (id, from, to, why) => {
  const e = chk2(id, from, to); if (e.text === to) return e;
  A.push(`text: ${from} ${id} -> "${to}": ${why}`); e.text = to; n++; reindex(P); return e;
};
const setShow = (e, tid, text, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.show?.[tid] === text) return;
  e.show = { ...(e.show || {}), [tid]: text }; n++;
  A.push(`${lab(e)} shown "${text}" in ${tid}: ${why}`);
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return;
  A.push(`theme ${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++;
};
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases: delete them first`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  if (P.themes.some(t => (t.groups || []).some(g => g.includes(id)))) throw Error(`${lab(e)} is in a group`);
  const kin = (e.kin || []).length || P.entries.some(x => (x.kin || []).includes(id));
  deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e));
  A.push(`deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}${kin ? ' (its kin entries lose it)' : ''}`);
};

// ---------- v423 healing traditions ----------
A.push('1. Prunus africana (v423 healing traditions)');
{ const e = retext(15633, 'prunus africana', 'Prunus africana', 'a binomial: the genus name takes a capital, the species epithet does not');
  setE(15633, 'Prunus africana', 'type', 'proper', 'a scientific name with a capital (a proper word)');
  linkE(e, 'african_remedies', 3, 'its pre-v423 typicality: the bark is a well-known African remedy; v423 took it out only for its lowercase spelling'); }

// ---------- v424 sleep ----------
A.push('2. feeling tired -> words for tired, under synonyms');
setT('feeling_tired', 'name', 'words for tired', 'a theme of synonyms, named like words for big and words for noise (the id stays: ids are kept on a rename)');
setT('feeling_tired', 'note', 'sleepy, exhausted, worn out, weary', 'tired is no longer a member');
if (T('feeling_tired').groups?.length) setT('feeling_tired', 'groups', undefined, 'a theme of synonyms takes no groups');
if (T('feeling_tired').parent !== 'synonyms') {
  const from = T('feeling_tired').parent;
  if (!placeTheme(P, 'feeling_tired', 'words_for_noise', 'after')) throw Error('place feeling_tired'); reindex(P); n++;
  A.push(`theme feeling_tired moved from ${from} to synonyms, after words_for_noise: the folder of the "words for X" themes (pop 2, ident 2 as there; lang from the folder)`);
}
for (const [f, v] of [['pop', 2], ['ident', 2]]) setT('feeling_tired', f, v, 'as its siblings under synonyms');
out('feeling_tired', [[62393, 'tired']], 'the theme name may not contain a member\'s word');
A.push('3. sleep');
link(16148, 'CPAP', 'sleep', 4, 'the breathing machine for sleep apnea, beside apnea (v424 took it out of sleep disorders)');
A.push('4. run-down');
setE(68103, 'run-down', 'gloss', 'tired', 'the tired sense (a run-down building is another)');

// ---------- v425 nutrition ----------
A.push('5. vitamins: collections and a provitamin out');
out('vitamins', [[16638, 'vitamin B'], [62758, 'B complex']], 'the B vitamins together, not one vitamin (never a collection)');
out('vitamins', [[3885, 'beta-carotene']], 'a provitamin (the body makes vitamin A from it), not a vitamin');
link(62758, 'B complex', 'supplements', 2, 'a common supplement of the B vitamins');
A.push('6. vitamin B12');
{ const e = retext(62759, 'B12', 'vitamin B12', 'the full term, like vitamin B1 to B7');
  setShow(e, 'vitamins', 'B12', 'shown short like vitamin B1 to B7 (B1 ... B7)'); }
A.push('7. supplements');
link(3829, 'calcium', 'supplements', 2, 'one of the commonest supplements');
link(3834, 'omega-3', 'supplements', 3, 'sold as a supplement (supplements has no groups; fish oil is its usual source)');
link(3865, 'folic acid', 'supplements', 2, 'the supplement taken in pregnancy');
A.push('8. Non-vitamin stubs in no theme deleted');
for (const [id, text] of [[16643, 'vitamin P'], [16644, 'vitamin B4'], [16645, 'vitamin B8'], [16646, 'vitamin B10'], [16647, 'vitamin B11'], [16648, 'vitamin B13'], [16649, 'vitamin B15'], [16650, 'vitamin B17']])
  delE(id, text, 'not a vitamin; in no theme since v425, no alias, group or kin');

// ---------- v426 fitness ----------
A.push('9. fitness: the merged words keep the better typicality (fitness words at v422)');
for (const [id, text, typ] of [[3607, 'flexibility', 2], [3608, 'warm-up', 1], [3609, 'cool-down', 2], [3610, 'rep', 1], [3611, 'repetition', 2], [3612, 'set', 1],
  [3619, 'personal best', 2], [3634, 'protein shake', 2], [3637, 'heart rate', 2], [3638, 'BMI', 3], [3640, 'one-rep max', 3], [3642, 'DOMS', 4], [3646, 'macros', 3],
  [3648, 'creatine', 3], [3652, 'bulking', 3], [3654, 'gains', 2], [3662, 'progressive overload', 4], [3663, 'hypertrophy', 4]])
  rate(id, text, 'fitness', typ, 'its typicality in fitness words, the better of the two');
rate(3653, 'cutting', 'fitness', 3, 'the typicality of its deleted duplicate cutting [diet] 15981 in fitness words, the better of the two');
A.push('10. star [arms-out]');
if (ix.entry.get(64806)) out('ways_to_jump', [[64806, 'star']], 'a bare stub; jumping jack (alias star jump) is in ways to jump');
delE(64806, 'star', 'a bare stub for one theme (LIBRARY-RULES 5); jumping jack 15844 with its alias star jump covers it');
A.push('11. boot camp and basic training');
setE(4412, 'boot camp', 'type', 'common', 'an ordinary noun, not an idiom');
setE(4413, 'basic training', 'type', 'common', 'an ordinary noun, not an idiom');
A.push('12. IT band');
delE(62747, 'IT band', 'in no theme since v426 (a band of tissue, not a stretch), no alias, group or kin');
A.push('13. cutting [fitness]');
setE(3653, 'cutting', 'fam', 3, 'the familiarity of its deleted duplicate cutting [diet] 15981 (gloss fitness stays: it names the sense)');

// ---------- v427 mind and wellbeing ----------
A.push('14. Mariánské Lázně: translation alias of Marienbad');
{ const mb = chk(16591, 'Marienbad'), ml = chk(16592, 'Mariánské Lázně'), pl = chk(68109, 'Marianske Lazne');
  if (!ml.aliasOf) {
    unlinkE(ml, 'european_spa_towns', 'the Czech name of Marienbad, which is in the theme; becomes its translation alias');
    if (ml.kin?.length) throw Error('16592 has kin: by hand');
    Object.assign(ml, { aliasOf: mb.id, aliasKind: 'translation', typ: {}, show: {}, use: {}, nameOkIn: [] }); n++; reindex(P);
    A.push(`alias: ${lab(ml)} -> translation alias of ${lab(mb)}: Marienbad is the usual English name`);
  }
  if (pl.aliasOf !== mb.id) { A.push(`alias: ${lab(pl)} re-pointed from ${lab(E(pl.aliasOf))} to ${lab(mb)} (an alias cannot point at an alias)`); pl.aliasOf = mb.id; n++; }
  if (pl.aliasKind !== 'translation') { A.push(`alias: ${lab(pl)} kind ${pl.aliasKind} -> translation: the Czech name written plain, not a spelling of Marienbad`); pl.aliasKind = 'translation'; n++; }
  reindex(P); }

// ---------- v428 babies and birth ----------
A.push('15. carrier [sling] -> baby carrier');
{ const e = retext(64021, 'carrier', 'baby carrier', 'the full term, shown short in baby gear like baby monitor');
  setE(64021, 'baby carrier', 'gloss', '', 'the text is now unique: no gloss needed');
  setShow(e, 'baby_gear', 'carrier', 'shown short, as baby monitor is shown "monitor" and baby sling "sling"');
  for (const id of [41623, 45779]) { const k = E(id); if ((e.kin || []).includes(id)) { setKin(P, e, k, false); n++; A.push(`kin dropped: ${lab(e)} <-> ${lab(k)}: not one word family`); } } }

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const themeless = [...alone].filter(id => ix.entry.get(id) && !linkIds(P, E(id)).length).map(id => lab(E(id)));

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (the library or export code changed since it was written: compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
const tLast = (() => { for (let i = x1.themes.length - 1; i >= 0; i--) if (x0.themes[i] !== x1.themes[i]) return i; return -1; })();
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to index ${tLast} ("${x1.themes[tLast]}", was "${x0.themes[tLast]}")`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${name(id)} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const toAlias = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(name);
cmp.push(`root -> alias rows ${toAlias.length}: ${toAlias.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${name(x1.ids[firstLinkShift])}) on, link positions move`}`);
const textChanged = x1.ids.filter((id, i) => ia.has(id) && x0.text[ia.get(id)] !== x1.text[i]).map(id => `${name(id)} (was "${x0.text[ia.get(id)]}")`);
cmp.push(`Rows whose text changed: ${textChanged.join(', ') || 'none'}`);
{ const F = x1.themeFields, pi = F.indexOf('parent'), row = (x, r) => F.map((f, k) => k === pi ? (r[k] === null || r[k] === undefined || r[k] < 0 ? r[k] : x.themes[r[k]]) : r[k]);   // parent as id: index moves alone are not field changes
  const thCh = x1.themeRows.map((r, i) => [r, i]).filter(([r]) => { const j = x0.themes.indexOf(r[0]); return j >= 0 && JSON.stringify(row(x0, x0.themeRows[j])) !== JSON.stringify(row(x1, r)); })
    .map(([r, i]) => { const j = x0.themes.indexOf(r[0]), a = row(x0, x0.themeRows[j]), b = row(x1, r); return `${r[0]} (index ${j} -> ${i}: ${F.filter((f, k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map(f => { const k = F.indexOf(f); return `${f} ${JSON.stringify(a[k])} -> ${JSON.stringify(b[k])}`; }).join(', ')})`; });
  cmp.push(`Theme rows whose fields changed (parent compared by id): ${thCh.join('; ') || 'none'}`); }
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Fixes from the review of v423-v428 (Body & Health): Prunus africana back in African remedies; feeling tired renamed words for tired under synonyms (tired out); CPAP in sleep; vitamins keep single vitamins (vitamin B, B complex, beta-carotene out; vitamin B12); calcium, omega-3, folic acid and B complex in supplements; eight non-vitamin stubs, star [arms-out] and IT band deleted; fitness keeps the better typicality of the merged words; boot camp and basic training common; Mariánské Lázně an alias of Marienbad; carrier -> baby carrier.',
  ...A.map(x => /^\d+\./.test(x) || x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:',
  ...THEMES.map(t => `  ${t}: ${prof0[t]} -> ${profile(t)}`),
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch429-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

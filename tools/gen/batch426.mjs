// Library batch v426: fitness (Body & Health > fitness), proposed on branch julia-category-fixes-2 for Simon's review.
// Each change, by kind:
//   1. fitness words merges into fitness (LIBRARY-RULES: a theme and its "X words" twin merge): 28 of its 36 words are already in fitness.
//      The words fitness lacks move there at the same typicality (muscle, pump, cheat meal, superset, drop set, tempo, dad bod).
//      cutting [diet] 15981 is the same sense as cutting [fitness] 3653 (the fat-loss phase), which fitness has: it is deleted.
//      PB was a root grouped with personal best: an abbreviation is an alias (LIBRARY-RULES 3.8), so it becomes the abbreviation alias of
//      personal best, as PT is of personal trainer (the game reads abbreviation aliases for leak tests only and shows "personal best").
//      Then fitness words is deleted.
//   2. fitness: Weight Watchers is a diet programme (stays in diet types).
//   3. fitness exercises: star [arms-out] is a bare stub beside jumping jack, whose UK name star jump is already its alias (stays in ways to jump).
//   4. yoga poses: child's pose joins (one of the best-known poses; it was only in stretches), shown "child" like the other poses (cobra,
//      tree), same answer as balasana, its Sanskrit name.
//   5. yoga words: Sanskrit is a language, not a yoga word (stays in the language themes).
//   6. workout types: basic training is military training. boot camp was the military entry: the fitness class gets its own entry
//      (boot camp [workout]), the military one the gloss military and stays in military and army words; the two are kin (one written word).
//   7. stretches: hip flexor (a muscle) becomes hip flexor stretch and cross-body (an adjective) cross-body stretch, each shown short as
//      hamstring stretch is shown "hamstring". IT band is a band of tissue, not a stretch.
// Words taken out stay in the library. Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch426.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, addEntry, linkIds, themeDifficulty, difficultyBand, deleteEntry, deleteTheme, setKin } from '../../js/model.js';
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
const THEMES = ['fitness', 'fitness_words', 'exercises', 'yoga_poses', 'yoga_words', 'workout_types', 'stretches'];
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
  if (extra.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}${extra.nameOk ? ', may contain the theme name (nameOkIn)' : ''}): ${why}`);
};
const link = (id, text, tid, typ, why, extra) => linkE(chk(id, text), tid, typ, why, extra);
const setE = (id, text, field, value, why) => {
  const e = chk(id, text); if (JSON.stringify(e[field]) === JSON.stringify(value)) return;
  if (P.entries.some(a => a.aliasOf === e.id) && ['adult', 'sensitive', 'tm', 'vulgar'].includes(field)) throw Error(`${lab(e)} has aliases: set their flag too`);
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++;
};
const addToGroup = (tid, ids, why) => {   // ids join one synonym group of tid (joined with any group they are already in)
  const t = T(tid); t.groups ||= [];
  for (const id of ids) if (E(id).typ[tid] === undefined) throw Error(`${id} is not in ${tid}`);
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++;
  A.push(`group in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`);
};
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return;
  chk(id, text); deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e));
  A.push(`deleted entry: ${lab(e)}: ${why}`);
};
const rename = (id, from, to, why, extra = {}) => {   // a new text for a root (rerun: already renamed); show: {theme: text}; pos
  const e = E(id); if (e.text === to) return e;
  if (e.text !== from) throw Error(`${id} is "${e.text}"`);
  if ((ix.byText.get(to.toLowerCase()) || []).length) throw Error(`"${to}" exists: by hand`);
  e.text = to; if (extra.pos) e.pos = extra.pos; if (extra.show) e.show = { ...(e.show || {}), ...extra.show }; n++; reindex(P);
  A.push(`renamed: ${from} ${id} -> "${to}"${extra.pos ? ` (${extra.pos})` : ''}${extra.show ? `, shown ${JSON.stringify(extra.show)}` : ''}: ${why}`);
  return e;
};

// ---------- 1. fitness words merges into fitness ----------
A.push('1. fitness words merges into fitness (a theme and its "X words" twin)');
if (ix.theme.has('fitness_words')) {
  const MOVE = [[3244, 'muscle'], [15984, 'pump'], [15987, 'cheat meal'], [15982, 'superset'], [15983, 'drop set'], [15986, 'tempo'], [15985, 'dad bod']];
  const OTHER = new Set([15980, 15981]);   // PB and cutting [diet]: below
  const lack = (ix.byTheme.get('fitness_words') || []).filter(e => !e.aliasOf && e.typ.fitness_words !== undefined && e.typ.fitness === undefined);
  const unknown = lack.filter(e => !MOVE.some(([id]) => id === e.id) && !OTHER.has(e.id));
  if (unknown.length) throw Error('fitness words has words this batch does not decide: ' + unknown.map(lab).join(', '));
  for (const [id, text] of MOVE) { const e = chk(id, text); linkE(e, 'fitness', e.typ.fitness_words, 'from fitness words, at the same typicality'); }
  delE(15981, 'cutting', 'the same sense as cutting [fitness] 3653 (the fat-loss phase), which fitness has');
  const ids = (ix.byTheme.get('fitness_words') || []).filter(e => e.typ.fitness_words !== undefined).map(e => e.id);
  deleteTheme(P, 'fitness_words'); reindex(P); n++;
  A.push(`deleted theme: fitness_words "fitness words": merged into fitness; ${ids.length} links go with it`);
}
{
  const pb = E(15980), pbest = chk(3619, 'personal best');
  if (pb.aliasOf !== pbest.id) {
    if (pb.text !== 'PB' || Object.keys(pb.typ).length || P.entries.some(a => a.aliasOf === pb.id) || (pb.kin || []).length) throw Error('PB 15980 is not the plain root this batch expects');
    Object.assign(pb, { aliasOf: pbest.id, aliasKind: 'abbreviation', gloss: '', region: ['UK', 'AU', 'NZ', 'IE'] }); n++; reindex(P); alone.delete(pb.id);
    A.push(`alias: PB 15980 becomes the abbreviation alias of ${lab(pbest)} (region UK, AU, NZ, IE; US runners say PR), as PT is of personal trainer`);
  }
}

// ---------- 2. fitness ----------
A.push('2. fitness');
out('fitness', [[3659, 'Weight Watchers']], 'a diet programme, typicality 5 here');

// ---------- 3. fitness exercises ----------
A.push('3. fitness exercises');
out('exercises', [[64806, 'star']], 'a bare stub beside jumping jack, whose UK name star jump is already its alias');

// ---------- 4. yoga poses ----------
A.push('4. yoga poses');
link(15901, "child's pose", 'yoga_poses', 1, 'one of the best-known yoga poses; shown without "pose" like the other poses (cobra, tree, corpse), so the name does not give the theme away', { show: 'child' });
addToGroup('yoga_poses', [15901, 65747], 'same answer: balasana is the Sanskrit name of child\'s pose');

// ---------- 5. yoga words ----------
A.push('5. yoga words');
out('yoga_words', [[7559, 'Sanskrit']], 'a language, not a yoga word');

// ---------- 6. workout types ----------
A.push('6. workout types');
out('workout_types', [[4413, 'basic training']], 'military training, not a workout');
{
  const mil = chk(4412, 'boot camp');
  if (mil.gloss !== 'military') setE(4412, 'boot camp', 'gloss', 'military', 'the military sense; the fitness class is now its own entry');
  let fit = (ix.byText.get('boot camp') || []).find(e => e.gloss === 'workout');
  if (!fit) {
    fit = addEntry(P, 'boot camp', { gloss: 'workout', pos: 'noun', type: 'common', fam: 2, region: [], typ: {}, status: 'rev' }); n++; reindex(P);
    A.push(`new word: ${lab(fit)} (noun, common, familiarity 2, gloss workout): the group fitness class, its own sense`);
  }
  if (mil.typ.workout_types !== undefined) { const typ = mil.typ.workout_types; unlinkE(mil, 'workout_types', 'the military sense; boot camp [workout] takes its place'); linkE(fit, 'workout_types', typ, 'the fitness-class sense'); }
  if (!(fit.kin || []).includes(mil.id)) { setKin(P, fit, mil, true); n++; A.push(`kin: ${lab(fit)} <-> ${lab(mil)}: one written word in two senses`); }
}

// ---------- 7. stretches ----------
A.push('7. stretches');
rename(62746, 'hip flexor', 'hip flexor stretch', 'a hip flexor is a muscle; the stretch is the member, shown short like hamstring stretch', { show: { stretches: 'hip flexor' } });
rename(62744, 'cross-body', 'cross-body stretch', 'cross-body alone is an adjective; the stretch is the member, shown short', { pos: 'noun', show: { stretches: 'cross-body' } });
out('stretches', [[62747, 'IT band']], 'a band of tissue in the leg, not a stretch');

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
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}")`}`);
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
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Fitness (Body & Health): fitness words merged into fitness (cutting duplicate deleted, PB an abbreviation alias of personal best); Weight Watchers, star, Sanskrit, basic training and IT band out; child\'s pose in yoga poses; boot camp split into its military and workout senses; hip flexor and cross-body renamed to their stretches.',
  ...A.map(x => /^\d+\./.test(x) || x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:',
  ...THEMES.map(t => `  ${t}: ${prof0[t]} -> ${profile(t)}`),
  '  yoga words stays hard-heavy: a niche theme (popularity 4) whose easy words are few.',
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch426-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

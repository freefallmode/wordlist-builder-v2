// Library batch v425: nutrition (Body & Health > nutrition), proposed on branch julia-category-fixes-2 for Simon's review.
// Each change, by kind:
//   1. feeling tired (v424) loses its two groups, sleepy = drowsy and lethargic = listless: it is a theme of synonyms, and LIBRARY-RULES 5 says
//      themes of synonyms ("words for happy") take no groups.
//   2. vitamins: vitamin C was missing (it is in the library): linked, same answer as ascorbic acid. Out: vitamin B4, B8, B10, B11, B13, B15,
//      B17 and vitamin P, which are not vitamins (B17 is the name a disproven cancer cure is sold under); choline, an essential nutrient not
//      classed as a vitamin, moves to nutrients; multivitamin, a pill of several vitamins (LIBRARY-RULES 5: never a mixture), moves to the new
//      supplements theme.
//   3. dietary minerals: cobalt was linked through cobalt [color]; cobalt [metal] takes its place (also in chemical elements, the same mix-up).
//      trace elements and electrolyte are groups of minerals, not minerals (they stay in nutrition and nutrients).
//   4. food groups: sugar, candy, junk food and empty calories are not food groups (they stay in their other themes).
//   5. nutrition: vegan, vegetarian, keto, ketogenic diet, paleo and intermittent fasting (typicality 5 here) stay in diet types; thiamine,
//      riboflavin and niacin stay in vitamins. The group keto = ketogenic diet = ketosis goes with them (ketosis is a state, not the same answer);
//      keto and ketosis become kin instead, so the game still keeps them apart in a level.
//   6. superfoods: monkey bread tree is the baobab tree, not a food; sea grass is not eaten.
//   7. New theme supplements under nutrition: 20 words, 4 of them new entries (fish oil, protein powder, glucosamine, evening primrose oil).
//      cod liver oil and whey protein are left out (a more specific form of fish oil and protein powder), omega-3 too (two words for fish oil).
// Words taken out stay in the library. Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch425.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, addEntry, linkIds, placeTheme, themeDifficulty, difficultyBand, setKin } from '../../js/model.js';
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
const THEMES = ['nutrition', 'vitamins', 'dietary_minerals', 'food_groups', 'nutrients', 'superfoods', 'supplements', 'feeling_tired'];
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
const A = [], alone = new Set();
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
const move = (id, text, from, to, typ, why) => { const e = chk(id, text); linkE(e, to, typ ?? e.typ[from], why); unlinkE(e, from, why); };
const addToGroup = (tid, ids, why) => {   // ids join one synonym group of tid (joined with any group they are already in)
  const t = T(tid); t.groups ||= [];
  for (const id of ids) if (E(id).typ[tid] === undefined) throw Error(`${id} is not in ${tid}`);
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++;
  A.push(`group in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`);
};
const dropGroup = (tid, ids, why) => {   // the group of exactly these ids leaves tid (its words stay in the theme)
  const t = T(tid), g = (t.groups || []).find(x => x.length === ids.length && ids.every(id => x.includes(id))); if (!g) return;
  t.groups = t.groups.filter(x => x !== g); if (!t.groups.length) delete t.groups; n++;
  A.push(`group dropped in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`);
};
const makeTheme = (id, name, after, fields, why) => {   // a new theme placed right after the theme `after` (same parent)
  if (ix.theme.has(id)) return;
  if (P.themes.some(t => t.name.toLowerCase() === name.toLowerCase())) throw Error('a theme is already named ' + name);
  const parent = T(after).parent;
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: '', ...fields });
  reindex(P); if (!placeTheme(P, id, after, 'after')) throw Error('place ' + id); reindex(P); n++;
  A.push(`new theme: ${id} "${name}" under ${parent}, after ${after} (pop ${fields.pop}, ident ${fields.ident}, note "${fields.note}"): ${why}`);
};
const findNew = (text, gloss, alias) => {   // the entry a previous run of this batch made (a rerun finds it), or null
  const m = (ix.byText.get(text.toLowerCase()) || []).filter(e => e.text === text);
  if (!m.length) return null;
  const hit = m.filter(e => e.gloss === gloss && (alias ? e.aliasOf === alias : !e.aliasOf));
  if (hit.length !== 1) throw Error(`"${text}" already exists (${m.map(lab).join(', ')}): by hand`);
  return hit[0];
};
const newRoot = (text, o, why) => {
  const had = findNew(text, o.gloss || '', 0); if (had) return had;
  if ((ix.byText.get(text.toLowerCase()) || []).length) throw Error(`"${text}" exists in another case or sense: by hand`);
  const e = addEntry(P, text, { gloss: o.gloss || '', pos: o.pos, type: o.type || 'common', fam: o.fam, region: [], typ: {}, status: 'rev' }); n++; reindex(P);
  A.push(`new word: ${lab(e)} (${o.pos}, ${o.type || 'common'}, familiarity ${o.fam}${o.gloss ? ', gloss ' + o.gloss : ''}): ${why}`);
  return e;
};

// ---------- 1. feeling tired: no groups ----------
A.push('1. feeling tired (v424): a theme of synonyms takes no groups (LIBRARY-RULES 5)');
dropGroup('feeling_tired', [3686, 3687], 'feeling tired is a theme of synonyms');
dropGroup('feeling_tired', [32933, 32934], 'feeling tired is a theme of synonyms');

// ---------- 2. vitamins ----------
A.push('2. vitamins');
link(15528, 'vitamin C', 'vitamins', 1, 'one of the best-known vitamins; it was missing', { nameOk: true });
addToGroup('vitamins', [15528, 40507], 'same answer: ascorbic acid is vitamin C');
out('vitamins', [[16644, 'vitamin B4'], [16645, 'vitamin B8'], [16646, 'vitamin B10'], [16647, 'vitamin B11'], [16648, 'vitamin B13'], [16649, 'vitamin B15'], [16643, 'vitamin P']], 'not a vitamin: an old or unofficial name for another substance');
out('vitamins', [[16650, 'vitamin B17']], 'not a vitamin: the name a disproven cancer cure (laetrile) is sold under');
move(16641, 'choline', 'vitamins', 'nutrients', 4, 'an essential nutrient, not classed as a vitamin');
makeTheme('supplements', 'supplements', 'healthy_snacks', { pop: 3, ident: 2, note: 'multivitamin, fish oil, vitamin D, protein powder, zinc' }, 'no theme had supplements');
move(16639, 'multivitamin', 'vitamins', 'supplements', 1, 'a pill of several vitamins, not a vitamin (never a mixture)');

// ---------- 3. dietary minerals ----------
A.push('3. dietary minerals');
{
  const color = E(63), metal = chk(31702, 'cobalt');
  if (color.text !== 'cobalt' || color.gloss !== 'color' || metal.gloss !== 'metal') throw Error('cobalt entries changed');
  for (const tid of ['dietary_minerals', 'chemical_elements']) if (color.typ[tid] !== undefined) {
    linkE(metal, tid, color.typ[tid], 'the metal sense of cobalt');
    unlinkE(color, tid, 'the colour sense; cobalt [metal] takes its place');
  }
}
out('dietary_minerals', [[62760, 'trace elements'], [3863, 'electrolyte']], 'a group of minerals, not a mineral');

// ---------- 4. food groups ----------
A.push('4. food groups');
out('food_groups', [[3830, 'sugar'], [607, 'candy'], [3871, 'junk food'], [3873, 'empty calories']], 'not a food group');

// ---------- 5. nutrition ----------
A.push('5. nutrition');
out('nutrition', [[3837, 'vegan'], [3838, 'vegetarian'], [3854, 'keto'], [3855, 'ketogenic diet'], [3856, 'paleo'], [3853, 'intermittent fasting']], 'a diet, typicality 5 here; diet types holds it');
out('nutrition', [[3886, 'thiamine'], [3887, 'riboflavin'], [3888, 'niacin']], 'a single vitamin, typicality 5 here; vitamins holds it');
{ const keto = chk(3854, 'keto'), ketosis = chk(3870, 'ketosis');
  if (!(keto.kin || []).includes(ketosis.id)) { setKin(P, keto, ketosis, true); n++; A.push(`kin: ${lab(keto)} <-> ${lab(ketosis)}: one word family; the nutrition group kept them apart in a level before`); } }

// ---------- 6. superfoods ----------
A.push('6. superfoods');
out('superfoods', [[1662, 'monkey bread tree']], 'the baobab tree, not a food (baobab stays)');
out('superfoods', [[1291, 'sea grass']], 'seagrass is not eaten');

// ---------- 7. supplements ----------
A.push('7. New theme: supplements');
for (const [id, text, typ] of [[15528, 'vitamin C', 1], [16618, 'vitamin D', 1], [16651, 'iron', 2], [207, 'zinc', 3], [16652, 'magnesium', 3], [3700, 'melatonin', 2],
  [14353, 'collagen', 2], [3835, 'probiotic', 2], [15563, 'ginseng', 3], [15532, 'echinacea', 3], [16637, 'biotin', 3], [3648, 'creatine', 2], [8949, 'spirulina', 3],
  [1665, 'ginkgo', 4], [30655, "St John's wort", 4]]) link(id, text, 'supplements', typ, 'taken as a supplement');
for (const [text, fam, typ] of [['fish oil', 2, 1], ['protein powder', 2, 2], ['glucosamine', 3, 3], ['evening primrose oil', 4, 4]]) {
  const e = newRoot(text, { pos: 'noun', fam }, 'a common supplement');
  linkE(e, 'supplements', typ, 'taken as a supplement');
}

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
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Nutrition (Body & Health): vitamins keep vitamins (vitamin C in; B4, B8, B10, B11, B13, B15, B17, P, choline and multivitamin out); cobalt [metal] in dietary minerals and chemical elements; groups of minerals out of dietary minerals; non-food-groups out of food groups; diets and single vitamins out of nutrition; monkey bread tree and sea grass out of superfoods; new theme supplements; feeling tired loses its groups.',
  ...A.map(x => /^\d+\./.test(x) || x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:',
  ...THEMES.map(t => `  ${t}: ${prof0[t]} -> ${profile(t)}`),
  '  food groups keeps few hard words: the hard ones were the words that are not food groups. vitamins stays hard-heavy: most real vitamin names are technical.',
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch425-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

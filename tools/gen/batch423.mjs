// Library batch v423: healing traditions (Body & Health > healing traditions), proposed on branch julia-category-fixes-2 for Simon's review.
// The four "remedies" themes keep remedies: things or treatments used to heal. Each change, by kind:
//   1. Drugs: peyote, khat and iboga are drugs (LIBRARY-RULES 4: adult = this sense is drugs). They leave the remedy themes, which are not
//      adult and so let them play, and the entries are flagged adult like coca and ayahuasca. peyote and khat stay in illegal drugs.
//   2. Healers are people, not remedies: witch doctor (also widely felt to be disrespectful), traditional healer, sangoma, nyanga,
//      medicine man, shaman, ngangkari. medicine man stays in Native American folklore, shaman in religious leaders.
//   3. Ceremonies and religious rites are not remedies: sweat lodge, vision quest, smudging, medicine wheel, smoking ceremony, ruqyah,
//      Zamzam water. sweat lodge and vision quest stay in Native American folklore; smudging and medicine wheel join them there;
//      smoking ceremony stays in Aboriginal culture; Zamzam is in the Islam themes.
//   4. The name of a tradition, not one of its remedies: Unani, bush medicine, rongoā; tridosha is the three doshas together.
//   5. People, not medicine: Huang Di, Charaka, Sushruta.
//   6. Middle Eastern remedies: aloe and aloe vera (typicality 5; African remedies keeps them); sidr honey and ajwa dates beside honey
//      and dates (a word and a more specific form of it).
//   7. African remedies: cat's claw is South American; neem is Indian (Ayurveda words keeps it); prunus africana is a Latin species name.
//   8. Oceanian remedies: aloe and aloe vera are not native there; piripiri reads as the chili (piri piri, its own entry).
//   9. Native American remedies: witch hazel typicality 3 -> 2 (one of the best-known Native American remedies); the note names sage
//      instead of sweat lodge.
//  10. brahmi was one entry for the Ayurvedic herb and the Brahmi script (writing systems): the script gets its own entry, capital
//      like Ogham and Cyrillic; the herb keeps 15668 with the gloss herb.
// Words taken out stay in the library. Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch423.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, addEntry, linkIds, placeTheme, themeDifficulty, difficultyBand } from '../../js/model.js';
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
const THEMES = ['chinese_medicine', 'middle_eastern_remedies', 'african_remedies', 'oceanian_remedies', 'ayurveda_words', 'native_american_remedies'];
const profile = tid => {
  const t = T(tid), ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.vulgar);
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
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}): ${why}`);
};
const link = (id, text, tid, typ, why, extra) => linkE(chk(id, text), tid, typ, why, extra);
const rate = (id, text, tid, typ, why) => {
  const e = chk(id, text); if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++;
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return;
  A.push(`${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++;
};
const setE = (id, text, field, value, why) => {
  const e = chk(id, text); if (JSON.stringify(e[field]) === JSON.stringify(value)) return;
  if (P.entries.some(a => a.aliasOf === e.id) && ['adult', 'sensitive', 'tm', 'vulgar'].includes(field)) throw Error(`${lab(e)} has aliases: set their flag too`);
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++;
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
  const e = addEntry(P, text, { gloss: o.gloss || '', pos: o.pos, type: o.type || 'common', fam: o.fam, region: [], typ: {}, status: 'rev' }); n++; reindex(P);
  A.push(`new word: ${lab(e)} (${o.pos}, ${o.type || 'common'}, familiarity ${o.fam}${o.gloss ? ', gloss ' + o.gloss : ''}): ${why}`);
  return e;
};

// ---------- 1. drugs ----------
A.push('1. Drugs leave the remedy themes and are flagged adult (like coca and ayahuasca)');
out('native_american_remedies', [[15507, 'peyote']], 'a hallucinogenic drug; this theme is not adult, so it played in the family game');
out('african_remedies', [[15515, 'khat']], 'a stimulant drug; this theme is not adult, so it played in the family game');
out('african_remedies', [[15630, 'iboga']], 'a hallucinogenic drug; this theme is not adult, so it played in the family game');
for (const [id, text] of [[15507, 'peyote'], [15515, 'khat'], [15630, 'iboga']]) setE(id, text, 'adult', true, 'the sense is a drug (LIBRARY-RULES 4: adult)');

// ---------- 2. healers ----------
A.push('2. Healers are people, not remedies');
out('african_remedies', [[15629, 'witch doctor']], 'a healer, not a remedy; the term is also widely felt to be disrespectful');
out('african_remedies', [[15628, 'traditional healer'], [15620, 'sangoma'], [15635, 'nyanga']], 'a healer, not a remedy');
out('native_american_remedies', [[15692, 'medicine man'], [15708, 'shaman']], 'a healer, not a remedy');
out('oceanian_remedies', [[15655, 'ngangkari']], 'a healer, not a remedy');

// ---------- 3. ceremonies and religious rites ----------
A.push('3. Ceremonies and religious rites are not remedies');
out('native_american_remedies', [[15690, 'sweat lodge'], [15709, 'vision quest'], [50124, 'smudging'], [15693, 'medicine wheel']], 'a ceremony or sacred symbol, not a remedy');
link(50124, 'smudging', 'native_american_folklore', 3, 'a cleansing ceremony, beside sweat lodge and vision quest');
link(15693, 'medicine wheel', 'native_american_folklore', 4, 'a sacred symbol and ceremony, beside sweat lodge and vision quest');
out('oceanian_remedies', [[15649, 'smoking ceremony']], 'a ceremony, not a remedy');
out('middle_eastern_remedies', [[15606, 'ruqyah'], [15602, 'Zamzam water']], 'a religious rite and holy water, not a remedy (Zamzam is in the Islam themes)');

// ---------- 4. names of traditions ----------
A.push('4. The name of a tradition, not one of its remedies');
out('middle_eastern_remedies', [[15607, 'Unani']], 'the name of the tradition itself');
out('oceanian_remedies', [[15648, 'bush medicine'], [15642, 'rongoā']], 'the name of the tradition itself');
out('ayurveda_words', [[15684, 'tridosha']], 'the three doshas together; vata, pitta and kapha are the members');

// ---------- 5. people ----------
A.push('5. People, not medicine');
out('chinese_medicine', [[15587, 'Huang Di']], 'a legendary emperor, not a practice, herb or idea of the medicine');
out('ayurveda_words', [[15675, 'Charaka'], [15676, 'Sushruta']], 'an ancient physician, not a practice, herb or idea of Ayurveda');

// ---------- 6. Middle Eastern remedies ----------
A.push('6. Middle Eastern remedies');
out('middle_eastern_remedies', [[1781, 'aloe'], [1780, 'aloe vera']], 'typicality 5 here; African remedies keeps it');
out('middle_eastern_remedies', [[15600, 'sidr honey'], [15609, 'ajwa dates']], 'a more specific form of honey and dates, which the theme holds');

// ---------- 7. African remedies ----------
A.push('7. African remedies');
out('african_remedies', [[15625, "cat's claw"]], 'a South American plant');
out('african_remedies', [[15627, 'neem']], 'an Indian tree; Ayurveda words keeps it');
out('african_remedies', [[15633, 'prunus africana']], 'a Latin species name, written without its capital');

// ---------- 8. Oceanian remedies ----------
A.push('8. Oceanian remedies');
out('oceanian_remedies', [[1781, 'aloe'], [1780, 'aloe vera']], 'not native to Oceania (typicality 5)');
out('oceanian_remedies', [[15653, 'piripiri']], 'reads as the chili piri piri, its own entry');

// ---------- 9. Native American remedies ----------
A.push('9. Native American remedies');
rate(15688, 'witch hazel', 'native_american_remedies', 2, 'one of the best-known Native American remedies');
setT('native_american_remedies', 'note', 'echinacea, willow bark, goldenseal, witch hazel, yarrow, sage', 'sweat lodge left the theme');

// ---------- 10. brahmi: herb and script ----------
A.push('10. brahmi: the herb and the script are two senses');
{
  const herb = chk(15668, 'brahmi');
  const script = newRoot('Brahmi', { gloss: 'script', pos: 'noun', type: 'proper', fam: 4 }, 'the ancient Indian script, its own sense (capital, like Ogham and Cyrillic)');
  setE(15668, 'brahmi', 'gloss', 'herb', 'the Ayurvedic herb; the script is now its own entry');
  if (herb.typ.writing_systems !== undefined) {
    linkE(script, 'writing_systems', herb.typ.writing_systems, 'the script sense');
    unlinkE(herb, 'writing_systems', 'the herb sense; the script is the new Brahmi entry');
  }
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

const summary = ['Healing traditions (Body & Health): the remedy themes keep remedies. Drugs out and flagged adult; healers, ceremonies, tradition names and people out; aloe, neem and a few others left the themes they fit least; brahmi split into herb and script.',
  ...A.map(x => /^\d+\./.test(x) ? x : '  ' + x),
  'Difficulty spread and gap (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:',
  ...THEMES.map(t => `  ${t}: ${prof0[t]} -> ${profile(t)}`),
  '  These traditions are niche (popularity 4-5): no easy word that really belongs was found to add; existing candidates (oil pulling, neti pot, golden milk, tongue scraper) are no easier.',
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch423-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

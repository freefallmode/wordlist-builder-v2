// Library batch v407 (I26, Simon 2026-11-19: "fix these how you think best"): near-duplicate themes.
// A. Merges: every link of the source theme moves to the target (a member already there keeps the better rating, 1 = best; its shown text, form and name allowance
//    for the source go with it); then the emptied source is deleted with the model's deleteTheme (as the app's Delete does: no sub-themes, no rule names it,
//    shown texts and allowances for it dropped). A member whose text the target already shows under another entry is skipped (the target's entry stays).
//    1 fish_from_rivers_and_lakes -> freshwater_fish: "fish from rivers and lakes" is what freshwater fish means; 7 of its 9 are already there (tilapia, Arctic char move).
//    2 colours_named_after_fruit -> fruit_shades ("colors named after fruits"): the same theme under two spellings. Where the library has a colour sense of the word
//      (orange, lime, olive, peach, plum) the colour sense is linked, as fruit_shades already does for peach and plum.
//    3 fish_on_the_menu -> fish_to_eat: all 25 already in fish to eat; the names mean the same.
//    4 horse_races -> famous_horse_races: all 8 already there, same regions; "horse races" under famous races is the same theme.
//    5 golf_scores -> scoring_terms ("golf scoring terms"): 7 of 9 shared; stableford and condor move.
//    6 landforms ("mountain landforms") -> mountain_features: 22 shared, same meaning; crevasse, serac and fell move.
//    7 parts_of_a_ship -> ship_parts: same theme under two word orders. First galley #47431 (the ship, gloss "ship") leaves ship parts: the part is the ship's kitchen,
//      galley #2823, which comes in from parts of a ship with its rating.
// B. toys_and_characters ("toys and characters with eyes"): mask #21720 (a face covering) is neither a toy nor a character and leaves; Argus (the hundred-eyed giant)
//    and Sauron (the great Eye) are characters known for their eyes and stay. mask stays in things with eyes.
// C. public_transportation is the topic theme (vehicles, stops, fares, passengers; the two wordplay themes name it in their rules, so it stays):
//    renamed "public transport words" (the root entry's spelling, the "X words" topic pattern) with a note, so it no longer reads as a twin of types_of_public_transport.
// Every entry this batch changes (a link moved, rated, added or dropped with a deleted theme) gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch407.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteTheme, unlinkEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_SOFT, CLASH_MAX } from '../../js/family.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp();
let n = 0, revSet = 0;
const revd = new Set(), rev = e => { if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } revd.add(e.id); };
const shownIn = (e, tid) => (e.show?.[tid] || e.text).trim().toLowerCase();

// ---------- A. merges ----------
const A = [];
const MERGES = [
  ['fish_from_rivers_and_lakes', 'freshwater_fish', {}],
  ['colours_named_after_fruit', 'fruit_shades', { sub: { 75: 7683, 76: 2, 360: 7694, 93: 7687, 94: 7699 }, rate: { 7694: 2 } }],   // fruit sense -> colour sense; olive the colour is 2 in colors named after foods
  ['fish_on_the_menu', 'fish_to_eat', {}],
  ['horse_races', 'famous_horse_races', {}],
  ['golf_scores', 'scoring_terms', {}],
  ['landforms', 'mountain_features', {}],
  ['parts_of_a_ship', 'ship_parts', { before() {   // the wrong sense of galley leaves ship parts first
    const g = E(47431); if (g.gloss !== 'ship') throw Error('galley 47431 is not the ship');
    if (g.typ.ship_parts !== undefined) { A.push(`  ship_parts: ${lab(g)} (gloss "ship", the vessel) unlinked (was ${g.typ.ship_parts}); the part is the galley kitchen 2823`); unlinkEntry(P, g, 'ship_parts'); n++; rev(g); }
  } }],
];
for (const [src, tgt, o] of MERGES) {
  const S = ix.theme.get(src), T = ix.theme.get(tgt);
  if (!T) throw Error('no target ' + tgt);
  if (!S) { A.push(`done: ${src} is gone (merged into ${tgt} "${T.name}")`); continue; }
  if ((ix.kids.get(src) || []).length) throw Error(src + ' has sub-themes');
  for (const g of S.groups || []) if (!(T.groups || []).some(h => g.every(id => h.includes(id)))) throw Error(`${src} group ${g} is not in a ${tgt} group: by hand`);
  if (o.before) { o.before(); reindex(P); }
  const head = `${src} "${S.name}" -> ${tgt} "${T.name}":`, moved = [], rated = [], skipped = [];
  const members = P.entries.filter(e => e.typ[src] !== undefined);
  for (const e of members) {
    const t = o.sub?.[e.id] ? E(o.sub[e.id]) : e, v = Math.min(e.typ[src], o.rate?.[t.id] ?? 9);
    const tag = t === e ? lab(e) : `${lab(e)} as ${lab(t)} (colour sense)`;
    if (t.typ[tgt] !== undefined) { if (v < t.typ[tgt]) { rated.push(`${tag} ${t.typ[tgt]} -> ${v}`); t.typ[tgt] = v; n++; rev(t); } continue; }
    const rid = t.aliasOf || t.id, here = (ix.byTheme.get(tgt) || []).filter(x => x.typ[tgt] !== undefined || !x.aliasOf);
    const twin = here.find(x => x.id !== t.id && ((x.aliasOf || x.id) === rid || shownIn(x, tgt) === (t === e ? shownIn(e, src) : t.text.toLowerCase())));
    if (twin) { skipped.push(`${tag} (${tgt} already has ${lab(twin)})`); continue; }
    t.typ[tgt] = v; n++;
    if (t === e && e.show?.[src]) e.show[tgt] = e.show[src];
    if (t === e && e.use?.[src]) e.use[tgt] = e.use[src];
    if (t === e && e.nameOkIn?.includes(src) && !e.nameOkIn.includes(tgt)) e.nameOkIn.push(tgt);
    moved.push(`${tag} ${v}${t.show?.[tgt] ? ` shown "${t.show[tgt]}"` : ''}`); rev(t);
  }
  for (const e of members) rev(e);   // each loses its link to the deleted theme
  deleteTheme(P, src); n++; reindex(P);
  A.push(`${head} ${members.length} links; added ${moved.length}: ${moved.join(', ') || 'none'}; better rating taken ${rated.length}: ${rated.join(', ') || 'none'}; skipped ${skipped.length}: ${skipped.join(', ') || 'none'}; ${src} deleted`);
}

// ---------- B. toys and characters with eyes ----------
const B = [];
{ const m = E(21720); if (m.text !== 'mask') throw Error('21720 is not mask');
  if (m.typ.toys_and_characters !== undefined) { unlinkEntry(P, m, 'toys_and_characters'); n++; rev(m); B.push(`${lab(m)} unlinked (a face covering, not a toy or character; stays in things with eyes); Argus and Sauron stay (characters known for their eyes)`); }
  reindex(P); }

// ---------- C. public transport ----------
const C = [];
{ const t = ix.theme.get('public_transportation'), to = 'public transport words';
  const note = 'travelling by public transport: vehicles, stops and stations, tickets and fares, people; the kinds of vehicle alone are in types of public transport';
  if (t.name !== to) { if (P.themes.some(x => x !== t && x.name.toLowerCase() === to)) throw Error('name taken'); C.push(`public_transportation: "${t.name}" -> "${to}"`); t.name = to; n++; }
  if (t.note !== note) { t.note = note; n++; C.push('note set'); } }
reindex(P);

// ---------- listed, not changed (scan of all themes: normalised names and member Jaccard; tools/gen/batch407-review.txt) ----------
const LISTED = [
  'places_of_worship / religious_buildings (J 0.70, 30 shared): worship places vs buildings (monastery, minaret, bell tower vs mausoleum, ziggurat): kept',
  'snow_sports / winter_sports (parent, 34 shared): winter has ice sports: kept',
  'bears (complete species set) / bear_types (grizzly, Kodiak, cinnamon under hibernating animals): kept',
  'days_of_the_week / weekdays; fracture_types / bone_and_joint_injuries; Oceanian countries / star flags of Oceania; alkali themes: subsets with their own meaning: kept',
  'needlework / thread crafts (J 0.53); folk / national instruments (J 0.51); African capitals / cities; aircraft / aircraft types: overlap, different meaning: kept',
  'place topic vs "X words" pairs: airport / airport words (J 0.54), pond / pond life (0.54), movie theater / movie theater words (0.48), restaurant / restaurant words, hospital / hospital words, art gallery / art gallery words: a pattern for Simon',
];

{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');

// export comparison (before = the committed v406 file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(CE.text, x0.text) && same(CE.links, x0.links) && same(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v${P.lib.version} before the changes: ${baseOk ? 'yes' : 'NO'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]})`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : firstShift}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => String(id)).join(', ') || 'none'}`);
const textCh = x1.ids.filter((id, i) => ia.has(id) && x1.text[i] !== x0.text[ia.get(id)]).map(id => `${x0.text[ia.get(id)]} -> ${x1.text[ib.get(id)]} (${id})`);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]).map(id => lab(E(id)));
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed: ${flagCh.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(E(x1.ids[firstLinkShift]))}) on, link positions move`}`);
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const m0 = shownMap(x0), m1 = shownMap(x1);
const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
const fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (row of ${id})`; };
const byTh = ks2 => { const c = {}; for (const k of ks2) { const th = k.split('\t')[0]; c[th] = (c[th] || 0) + 1; } return Object.entries(c).map(([t, v]) => `${t} ${v}`).join(', ') || 'none'; };
cmp.push(`Links by theme + shown text + row: gone ${lost.length} (${byTh(lost)}), new ${gained.length}, rating changed ${rated.length}`);
for (const k of gained) cmp.push(`  new: ${fmt(k)}`);
for (const k of rated) cmp.push(`  rating: ${fmt(k)} ${m0.get(k)} -> ${m1.get(k)}`);
for (const k of lost.filter(k => !tGone.includes(k.split('\t')[0]))) cmp.push(`  gone (theme kept): ${fmt(k)}`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);

const summary = [`A. merges (${A.length}):`, ...A.map(x => '  ' + x), `B. toys and characters with eyes: ${B.join('; ') || 'done'}`, `C. public transport: ${C.join('; ') || 'done'}`,
  'Listed, not changed:', ...LISTED.map(x => '  ' + x),
  `library changes ${n}; status set to rev ${revSet}; entries touched ${revd.size}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch407-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

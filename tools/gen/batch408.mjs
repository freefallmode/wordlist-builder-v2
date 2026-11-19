// Library batch v408 (Simon 2026-11-19: "do the duplicate theme pairs"): the near-duplicate theme pairs v407 listed for him.
// The game builds a level from several themes; two themes that mean nearly the same thing make the sort ambiguous, and a shared word can sit in only one.
// Pattern chosen: when two themes collect the same kind of words (a place and its "X words" / "X life" twin, or two names for one set), they become one theme:
//   the twin is merged into the theme that has sub-themes, the place-topic name or the better ident, keeps its id, name and folder; the twin is deleted.
//   Where a theme can be cut cleanly instead (a twin that is the mix of two sharper themes), the members that belong to the other theme are left there.
//   Parent topic / "X words" child pairs (fitness, sleep, religion, archaeology, pirates) and habitat / "X animals" or "X features" pairs are sub-themes: kept.
// Merge mechanics as v407: every link of the source moves to the target (a member already there keeps the better rating, 1 = best; its shown text, form and
// name allowance go with it); a member whose shown text the target already shows (or a near twin listed in skip) is not moved; the source's synonym groups
// come along for the members that land (joined with a target group they share a member with); then the emptied source is deleted with the model's deleteTheme.
// B. The skipped true duplicates become spelling aliases (id kept, no region, status rev): kids menu -> kids' menu, nurses station -> nurses' station,
//    baptistry -> baptistery.
//   1 pond_life -> pond: the pond habitat already holds its animals and plants (30 of 42 shared); 12 more move. great diving beetle, caddisfly larva and
//     mayfly nymph join diving beetle, caddisfly and mayfly in synonym groups (one of each per level).
//   2 airport_words -> airport: the same words of the place (28 shared); 16 move. Skipped: airport shuttle shown "shuttle" (airport has shuttle bus).
//   3 movie_theater_words -> movie_theater: 25 shared; 13 move. Skipped: movie theater (the theme's own name), recliner (reclining seat is there).
//   4 restaurant_words -> restaurant: 22 shared; 13 move. Skipped: kids menu (kids' menu is there). New group: specials / specials board.
//   5 hospital_words -> hospital: 17 shared; 18 move. First nurses station #60575 leaves hospital (nurses' station #15307 comes in, the usual spelling);
//     patient #15282 is skipped (patient #3451 is there). New groups: intensive care / ICU, rounds / ward round.
//   6 art_gallery_words -> art_gallery: 12 shared; 26 move. First dealer #45206 (gloss "card handler", the casino dealer) leaves art gallery: the art
//     dealer #12152 (shown "dealer") comes in. Skipped: gallery (the theme's own name).
//   7 religious_buildings -> places_of_worship: both are the buildings people worship in (30 shared); zendo, chantry, gompa move. Skipped: minaret and
//     bell tower (parts of a building: they stay in mosque parts and church parts), baptistry (places of worship has baptistery, the other spelling).
//   8 thread_crafts -> needlework: thread crafts was the mix of needlework and yarn and thread crafts. Its needle crafts are all in needlework already;
//     tatting and kumihimo stay in yarn and thread crafts (both already there). The two kept themes now split cleanly: needle on fabric vs yarn and lace.
//   9 national_instruments -> folk_instruments: a national instrument is a folk instrument (36 shared); 12 move. folk instruments has 10 sub-themes and stays.
// Every entry this batch changes (a link moved, rated, added or dropped with a deleted theme) gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch408.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const leave = (id, text, tid, why) => () => {   // a wrong or duplicate member leaves the target before the merge
  const e = E(id); if (e.text !== text) throw Error(`${id} is not ${text}`);
  if (e.typ[tid] !== undefined) { A.push(`  ${tid}: ${lab(e)} unlinked (was ${e.typ[tid]}): ${why}`); unlinkEntry(P, e, tid); n++; rev(e); }
};
const MERGES = [
  ['pond_life', 'pond', { groups: [[9003, 9764], [9207, 9777], [1388, 9778]] }],   // near twins come in as a synonym group: one of each per level
  ['airport_words', 'airport', { skip: { 46895: 'shuttle bus 46881 is there' } }],
  ['movie_theater_words', 'movie_theater', { skip: { 2477: "the theme's own name", 341: 'reclining seat 57605 is there' } }],
  ['restaurant_words', 'restaurant', { skip: { 20022: "kids' menu 38190 is there" }, groups: [[20019, 38188]] }],
  ['hospital_words', 'hospital', { before: leave(60575, 'nurses station', 'hospital', "nurses' station 15307 (the usual spelling) comes in"),
    skip: { 15282: 'patient 3451 is there' }, groups: [[3491, 57507], [15305, 60574]] }],
  ['art_gallery_words', 'art_gallery', { before: leave(45206, 'dealer', 'art_gallery', 'the casino dealer (gloss "card handler"); the art dealer 12152 shown "dealer" comes in'),
    skip: { 6301: "the theme's own name" } }],
  ['religious_buildings', 'places_of_worship', { skip: { 6556: 'a part of a mosque (stays in mosque parts)', 14001: 'a part of a church (stays in church parts)', 57661: 'baptistery 14011 is there (other spelling)' } }],
  ['thread_crafts', 'needlework', { skip: { 5874: 'lace, in yarn and thread crafts', 5911: 'braiding, in yarn and thread crafts' } }],
  ['national_instruments', 'folk_instruments', {}],
];
function addGroup(T, ids, out) {   // a synonym group for members linked in T, joined with any T group it shares a member with
  ids = ids.filter(id => { const e = ix.entry.get(id); return e && !e.aliasOf && e.typ[T.id] !== undefined; });
  if (ids.length < 2) return;
  const gs = T.groups || (T.groups = []), hit = gs.filter(g => ids.some(id => g.includes(id)));
  const u = [...new Set([...hit.flat(), ...ids])];
  if (hit.length === 1 && hit[0].length === u.length) return;   // already there
  T.groups = [...gs.filter(g => !hit.includes(g)), u]; n++;
  out.push(u.map(id => E(id).text).join(' / '));
}
for (const [src, tgt, o] of MERGES) {
  const S = ix.theme.get(src), T = ix.theme.get(tgt);
  if (!T) throw Error('no target ' + tgt);
  if (!S) { A.push(`done: ${src} is gone (merged into ${tgt} "${T.name}")`); continue; }
  if ((ix.kids.get(src) || []).length) throw Error(src + ' has sub-themes');
  if (P.themes.some(x => x.rule && x.rule.includes('@' + src) && new RegExp('@' + src + '\\b').test(x.rule))) throw Error('a rule names ' + src);
  if (o.before) { o.before(); reindex(P); }
  const head = `${src} "${S.name}" -> ${tgt} "${T.name}":`, moved = [], rated = [], skipped = [], grouped = [];
  const members = P.entries.filter(e => e.typ[src] !== undefined);
  for (const e of members) {
    const v = e.typ[src];
    if (e.typ[tgt] !== undefined) { if (v < e.typ[tgt]) { rated.push(`${lab(e)} ${e.typ[tgt]} -> ${v}`); e.typ[tgt] = v; n++; rev(e); } continue; }
    if (o.skip?.[e.id]) { skipped.push(`${lab(e)} (${o.skip[e.id]})`); continue; }
    const rid = e.aliasOf || e.id, here = (ix.byTheme.get(tgt) || []).filter(x => x.typ[tgt] !== undefined || !x.aliasOf);
    const twin = here.find(x => x.id !== e.id && ((x.aliasOf || x.id) === rid || shownIn(x, tgt) === shownIn(e, src)));
    if (twin) { skipped.push(`${lab(e)} (${tgt} already has ${lab(twin)})`); continue; }
    e.typ[tgt] = v; n++;
    if (e.show?.[src]) e.show[tgt] = e.show[src];
    if (e.use?.[src]) e.use[tgt] = e.use[src];
    if (e.nameOkIn?.includes(src) && !e.nameOkIn.includes(tgt)) e.nameOkIn.push(tgt);
    moved.push(`${lab(e)} ${v}${e.show?.[tgt] ? ` shown "${e.show[tgt]}"` : ''}`); rev(e);
  }
  reindex(P);
  for (const g of [...(S.groups || []), ...(o.groups || [])]) addGroup(T, g, grouped);
  for (const e of members) rev(e);   // each loses its link to the deleted theme
  deleteTheme(P, src); n++; reindex(P);
  const orphans = members.filter(e => !Object.keys(e.typ).length && !e.aliasOf).map(lab);
  A.push(`${head} ${members.length} links; added ${moved.length}: ${moved.join(', ') || 'none'}; better rating taken ${rated.length}: ${rated.join(', ') || 'none'}; skipped ${skipped.length}: ${skipped.join(', ') || 'none'}; groups ${grouped.length}: ${grouped.join('; ') || 'none'}; now unlinked ${orphans.length}: ${orphans.join(', ') || 'none'}; ${src} deleted; ${tgt} now ${P.entries.filter(e => e.typ[tgt] !== undefined).length} words`);
}

// ---------- B. the skipped true duplicates become spelling aliases of their twins (id kept; no region: both spellings are standard) ----------
const B = [];
for (const [aid, atext, rid, rtext] of [[20022, 'kids menu', 38190, "kids' menu"], [60575, 'nurses station', 15307, "nurses' station"], [57661, 'baptistry', 14011, 'baptistery']]) {
  const a = E(aid), r = E(rid);
  if (a.text !== atext || r.text !== rtext) throw Error(`${aid}/${rid} are not ${atext}/${rtext}`);
  if (a.aliasOf === rid && a.aliasKind === 'spelling') { B.push(`done: ${lab(a)}`); continue; }
  if (r.aliasOf || P.entries.some(x => x.aliasOf === aid)) throw Error('alias chain at ' + aid);
  if (Object.keys(a.typ).length) throw Error(`${lab(a)} still has links: ${Object.keys(a.typ)}`);
  if (a.show && Object.keys(a.show).length || a.use && Object.keys(a.use).length || a.kin?.length) throw Error(lab(a) + ' has show, use or kin');
  a.aliasOf = rid; a.aliasKind = 'spelling'; n++; rev(a); rev(r);
  B.push(`${lab(a)} -> spelling alias of ${lab(r)} (fam ${a.fam} kept, no region)`);
}
reindex(P);

// ---------- listed, not changed ----------
const LISTED = [
  'parent topic / its "X words" child: fitness / fitness words (J 0.36), sleep / sleep words (0.34), religion / religion words (0.31), archaeology / archaeology words (0.31), pirates / pirate words (0.16): sub-themes, kept',
  'habitat or place / "X animals", "X features": savanna (0.46), zoo (0.38), rainforest, desert, woodland animals; mountain (0.47), garden (0.38), desert, woodland features: a kind within the place, kept',
  'X / "X words" with no shared words (wines / wine words, dinosaurs / dinosaur words, card games / card game words, ...): different sets, kept',
  'days_of_the_week / weekdays and the other subset pairs: kept (not re-judged)',
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

// export comparison (before = the committed v407 file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = same(CE.text, x0.text) && same(CE.links, x0.links) && same(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of v${P.lib.version} before the changes: ${baseOk ? 'yes' : 'NO'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]})`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : firstShift}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${lab(E(id))}`).join(', ') || 'none'}`);
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
cmp.push(`Links by theme + shown text + row: gone ${lost.length} (${byTh(lost)}), new ${gained.length} (${byTh(gained)}), rating changed ${rated.length}`);
for (const k of rated) cmp.push(`  rating: ${fmt(k)} ${m0.get(k)} -> ${m1.get(k)}`);
for (const k of lost.filter(k => !tGone.includes(k.split('\t')[0]))) cmp.push(`  gone (theme kept): ${fmt(k)}`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);

const summary = ['Pattern: two themes that collect the same kind of words become one (the twin merged into the theme with sub-themes, the place name or the better ident; that one keeps its id, name and folder); a twin that mixed two sharper themes is cut so its members stay in the sharper one. Parent topic / "X words" child pairs and habitat / "X animals" pairs are sub-themes and stay.',
  `A. merges (${MERGES.length}):`, ...A.map(x => '  ' + x), `B. duplicates made spelling aliases: ${B.join('; ')}`,
  'Listed, not changed:', ...LISTED.map(x => '  ' + x),
  `library changes ${n}; status set to rev ${revSet}; entries touched ${revd.size}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch408-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

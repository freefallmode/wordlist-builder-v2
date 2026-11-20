// Library batch v415 (DRAFT: not approved by Simon yet; do not --apply until he has). Issue I27 (ISSUES.md): theme memberships the v409
// rating reviewers flagged, and the items added to I27 on 2026-11-20. Per item:
//   1. kitchen brigade: pizzaiolo and sushi chef are cuisine specialists, not brigade stations: unlinked (both stay in food jobs). baker and
//      butcher stay: the classic brigade de cuisine has a boulanger and a boucher (butcher 20057 is glossed [kitchen] for that sense).
//   2. greenhouse gases: water vapor added. The only entry was water vapour 31998, a UK synonym alias of vapor 40475 (v412); it becomes the
//      UK spelling of a new root water vapor (US root, LIBRARY-RULES "Aliases"), linked in greenhouse gases and in water cycle (its name
//      allowance for water cycle, until now stale, applies again; the root gets the same).
//   3. Earth's layers: liquid core and solid core are descriptions of the outer and inner core, not names of layers: unlinked (their
//      synonym groups dissolve).
//   4. renewable energy: dam, heat pump and battery storage are not renewable sources; dam fits engineering and heat pump heating and
//      cooling better (both stay there): unlinked.
//   5. courtroom words (no note): tort and estoppel are general law, not courtroom words: unlinked; estoppel moves to law and order
//      (which already holds tort).
//   6. whales and dolphins: the bare possessives become the full names (DESIGN-entries.md 3.6: the entry is the full term), shown in full
//      with a name allowance as white-beaked dolphin; Hector's dolphin loses its shown "Hector's" the same way. Cuvier's beaked whale is
//      grouped with beaked whale (a more specific form of it: LIBRARY-RULES "Overlap").
//   7. nicknames for workers: trucker and garbageman are the ordinary job names: unlinked (both stay in jobs).
//   8. river features: stream, brook, creek and bayou are kinds of watercourse, held by bodies of water: unlinked; rivulet, the fourth
//      member of their group and in no other theme, moves to bodies of water into the stream group.
//   9. sidewinder 27592 [snake] in cowboy slang and desert: the desert link is the snake, so it moves to sidewinder 1194 [animal]; 27592
//      keeps cowboy slang as the slang sense, glossed [sneaky person].
//  10. the five oceans: Southern 65542, Pacific 32040 and Indian 65531 [major water] are second roots of Southern Ocean 32178, Pacific Ocean
//      36993 and Indian Ocean 32042 (one sense, LIBRARY-RULES "never a second root"). The full roots are linked with the shown text, as
//      Atlantic Ocean and Arctic Ocean are (DESIGN-entries.md 9), keeping the typicality, and the short roots are deleted. Southern Ocean
//      32178 survives: batch416 must target it (the_five_oceans typicality 4 -> 2) instead of 65542.
//  11. Platonic solids: triangular pyramid is the tetrahedron by another name: a synonym alias of tetrahedron (its links in Platonic
//      solids and 3D shapes go: the root is in both).
//  12. Queen members: Farrokh Bulsara is Freddie Mercury's birth name, never the answer: unlinked (a synonym alias would let the game
//      show it as a Queen member).
//  13. socks and hosiery: thigh-high boots unlinked (stays in boots).
//  14. places of worship: mausoleum unlinked (a tomb; stays in tombs and burials).
//  15. animals covered in spikes: pufferfish, blowfish and globefish are one animal: pufferfish the root, blowfish and globefish synonym
//      aliases (their links go: pufferfish is in each of their themes, including ___fish, which so loses "blow" and "globe": one alias
//      family has one member per theme). fugu is the dish in English (Oxford, M-W): unlinked from the animal themes, glossed [dish] and
//      linked in Japanese food.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch415.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, addEntry, deleteEntry, linkIds } from '../../js/model.js';
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
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], alone = new Set(), DEL = new Map();
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const unlink = (id, text, tid, why) => {
  const e = chk(id, text); T(tid);
  if (e.typ[tid] === undefined) return;
  unlinkEntry(P, e, tid); n++; reindex(P);
  const rest = linkIds(P, e); if (!rest.length) alone.add(e.id);
  A.push(`unlinked: ${lab(e)} from ${tid}: ${why}${rest.length ? '' : ' (now in no theme: not exported)'}`);
};
const link = (id, text, tid, typ, why, extra = {}) => {
  const e = chk(id, text); T(tid);
  if (e.typ[tid] !== undefined) return;
  e.typ[tid] = typ; n++;
  if (extra.show) e.show = { ...(e.show || {}), [tid]: extra.show };
  if (extra.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${extra.show ? `, shown "${extra.show}"` : ''}${extra.nameOk ? ', name allowed' : ''}): ${why}`);
};
const addToGroup = (tid, ids, why) => {   // ids join one synonym group of tid (joined with any group they are already in)
  const t = T(tid); t.groups ||= [];
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++;
  A.push(`group in ${tid}: ${g.map(id => lab(E(id))).join(', ')}: ${why}`);
};
const toSynonym = (id, text, rootId, rootText, why) => {   // a root becomes a synonym alias of another root; its own links go where the root is linked
  const X = chk(id, text), R = chk(rootId, rootText);
  if (R.aliasOf) throw Error(`${rootId} is an alias`);
  if (X.aliasOf === rootId) return;
  if (X.aliasOf) throw Error(`${id} is an alias of ${X.aliasOf}`);
  if ((ix.aliases.get(id) || []).length || (X.kin || []).length || Object.keys(X.use || {}).length) throw Error(`${id} has aliases, kin or use: by hand`);
  const kept = [];
  for (const tid of Object.keys(X.typ)) {
    if (R.typ[tid] === undefined) { kept.push(tid); continue; }
    unlinkEntry(P, X, tid);
  }
  if (kept.length) throw Error(`${id}: the root is not in ${kept.join(', ')}: by hand`);
  Object.assign(X, { aliasOf: R.id, aliasKind: 'synonym', show: {}, use: {}, nameOkIn: [] });
  n++; reindex(P);
  A.push(`synonym alias: ${lab(X)} of ${lab(R)} (familiarity ${X.fam}, its own): ${why}`);
};

// ---------- 1. kitchen brigade ----------
A.push('1. kitchen brigade');
unlink(20076, 'pizzaiolo', 'kitchen_brigade', 'a pizza maker, not a brigade station (stays in food jobs)');
unlink(20054, 'sushi chef', 'kitchen_brigade', 'a cuisine specialist, not a brigade station (stays in food jobs)');
A.push('  kept: baker 20056, butcher 20057 [kitchen]: the classic brigade de cuisine has a boulanger and a boucher');

// ---------- 2. water vapor ----------
A.push('2. greenhouse gases: water vapor');
{ const al = chk(31998, 'water vapour'), vap = chk(40475, 'vapor');
  let R = P.entries.find(e => e.text === 'water vapor' && !e.aliasOf);
  if (!R) {
    R = addEntry(P, 'water vapor', { fam: 2, pos: 'noun', type: 'common', region: [], typ: {}, status: 'rev' }); n++; reindex(P);
    A.push(`  new root: ${lab(R)} (familiarity 2, noun, common): water as a gas, the most abundant greenhouse gas`);
  }
  if (al.aliasOf === vap.id) {
    Object.assign(al, { aliasOf: R.id, aliasKind: 'spelling', region: ['UK'], fam: R.fam, pos: R.pos, type: R.type });
    for (const f of ['adult', 'vulgar', 'sensitive', 'tm']) al[f] = !!R[f];
    n++; reindex(P);
    A.push(`  re-pointed: ${lab(al)} [UK] from synonym of ${lab(vap)} to spelling of ${lab(R)}; its name allowance for water_cycle_words stays (the alias is shown to UK players there) and the root gets the same`);
  }
  link(R.id, 'water vapor', 'greenhouse_gases', 3, 'the most abundant greenhouse gas, seldom named first');
  link(R.id, 'water vapor', 'water_cycle_words', 3, 'evaporation makes it, condensation turns it back (the alias carried a name allowance for this theme)', { nameOk: true });
}

// ---------- 3. Earth's layers ----------
A.push("3. Earth's layers");
unlink(31914, 'liquid core', 'layers_of_the_earth', 'a description of the outer core (in the theme, grouped with it), not a layer name');
unlink(31913, 'solid core', 'layers_of_the_earth', 'a description of the inner core (in the theme, grouped with it), not a layer name');

// ---------- 4. renewable energy ----------
A.push('4. renewable energy');
unlink(7380, 'dam', 'renewable_energy', 'not a source; a barrier, in engineering and huge things (hydropower and hydro stay)');
unlink(23592, 'heat pump', 'renewable_energy', 'not a source; in heating and cooling and eco home');
unlink(32247, 'battery storage', 'renewable_energy', 'storage, not a source of energy');

// ---------- 5. courtroom words ----------
A.push('5. courtroom words (no note)');
unlink(4272, 'tort', 'courtroom_words', 'general (civil) law, not a courtroom word; stays in law and order');
link(61126, 'estoppel', 'law_and_order', 5, 'general law, moved from courtroom words');
unlink(61126, 'estoppel', 'courtroom_words', 'a doctrine of general law, not a courtroom word; moved to law and order');

// ---------- 6. whales and dolphins ----------
A.push('6. whales and dolphins: full names for the bare possessives');
{ const W = 'whales_and_dolphins';
  for (const [id, from, to] of [[63012, "Bryde's", "Bryde's whale"], [63013, "Commerson's", "Commerson's dolphin"], [63014, "Cuvier's", "Cuvier's beaked whale"],
    [63016, "Fraser's", "Fraser's dolphin"], [63020, "Risso's", "Risso's dolphin"]]) {
    const e = E(id); if (e.text === to) continue; if (e.text !== from) throw Error(`${id} is ${e.text}`);
    if (P.entries.some(x => x.text === to)) throw Error(`${to} exists`);
    if (Object.keys(e.typ).join() !== W) throw Error(`${id} has other themes`);
    e.text = to; if (!(e.nameOkIn || []).includes(W)) e.nameOkIn = [...(e.nameOkIn || []), W]; n++;
    A.push(`  text: ${from} ${id} -> "${to}", shown in full (name allowed in ${W}, as white-beaked dolphin)`);
  }
  reindex(P);
  const h = chk(7891, "Hector's dolphin");
  if (h.show?.[W]) { delete h.show[W]; if (!(h.nameOkIn || []).includes(W)) h.nameOkIn = [...(h.nameOkIn || []), W]; n++; A.push(`  ${lab(h)}: shown "Hector's" -> shown in full (name allowed), as the five above`); }
  addToGroup(W, [7876, 63014], "Cuvier's beaked whale is a beaked whale (a word and a more specific form of it: one per level)");
}

// ---------- 7. nicknames for workers ----------
A.push('7. nicknames for workers');
unlink(4118, 'trucker', 'nicknames_for_workers', 'the ordinary job name (stays in jobs, transport jobs)');
unlink(4130, 'garbageman', 'nicknames_for_workers', 'the ordinary job name (stays in jobs, bins and recycling)');

// ---------- 8. river features ----------
A.push('8. river features: watercourse types to bodies of water');
for (const [id, text] of [[30152, 'stream'], [30873, 'brook'], [30874, 'creek'], [28728, 'bayou']]) {
  if (E(id).typ.bodies_of_water === undefined) throw Error(`${text} is not in bodies of water`);
  unlink(id, text, 'river_features', 'a kind of watercourse, not a feature of a river; stays in bodies of water');
}
link(30871, 'rivulet', 'bodies_of_water', 5, 'a small stream, the fourth member of the stream group in river features');
unlink(30871, 'rivulet', 'river_features', 'a kind of watercourse; moved to bodies of water');
addToGroup('bodies_of_water', [30152, 30873, 30874, 30871], 'rivulet joins stream, brook, creek (as in river features)');

// ---------- 9. sidewinder ----------
A.push('9. sidewinder: the snake and the slang sense');
{ const sn = chk(1194, 'sidewinder'), sl = chk(27592, 'sidewinder');
  if (sn.gloss !== 'animal') throw Error('1194 gloss');
  link(1194, 'sidewinder', 'desert', sl.typ.desert ?? 3, 'the snake; moved from 27592');
  unlink(27592, 'sidewinder', 'desert', 'the snake sense belongs to 1194');
  if (sl.gloss === 'snake') { sl.gloss = 'sneaky person'; n++; A.push(`  gloss: ${lab(sl)} [snake] -> [sneaky person]: its cowboy-slang sense ("you low-down sidewinder"); 1194 [animal] is the snake`); }
}

// ---------- 10. the five oceans ----------
A.push('10. the five oceans: one root per ocean');
for (const [oid, otext, fid, ftext, sh] of [[65542, 'Southern', 32178, 'Southern Ocean', 'Southern'], [32040, 'Pacific', 36993, 'Pacific Ocean', 'Pacific'], [65531, 'Indian', 32042, 'Indian Ocean', 'Indian']]) {
  const F = chk(fid, ftext), O = ix.entry.get(oid), tid = 'the_five_oceans';
  if (!O) { if (F.typ[tid] === undefined || F.show?.[tid] !== sh) throw Error(`${ftext}: not linked as expected`); continue; }
  if (O.text !== otext) throw Error(`${oid} is ${O.text}`);
  if (Object.keys(O.typ).join() !== tid || (ix.aliases.get(oid) || []).length || (O.kin || []).length || (O.nameOkIn || []).length) throw Error(`${oid}: unexpected shape`);
  link(fid, ftext, tid, O.typ[tid], `in place of ${lab(O)} [${O.gloss}], the same ocean`, { show: sh });
  deleteEntry(P, O); DEL.set(oid, lab(O)); n++; reindex(P);
  A.push(`  deleted: ${lab(O)} [${O.gloss}] (typicality ${O.typ[tid]} carried to ${lab(F)}): a second root for one ocean`);
}

// ---------- 11. Platonic solids ----------
A.push('11. Platonic solids');
toSynonym(58209, 'triangular pyramid', 38881, 'tetrahedron', 'the same solid by another name (was grouped with it in Platonic solids and 3D shapes)');

// ---------- 12. Queen members ----------
A.push('12. Queen members');
unlink(51974, 'Farrokh Bulsara', 'queen_members', "Freddie Mercury's birth name, never the answer (a synonym alias would let the game show it)");

// ---------- 13, 14 ----------
A.push('13. socks and hosiery');
unlink(24661, 'thigh-high boots', 'socks_and_hosiery', 'footwear, not hosiery; stays in boots');
A.push('14. places of worship');
unlink(2506, 'mausoleum', 'places_of_worship', 'a tomb, not a place of worship; stays in tombs and burials');

// ---------- 15. pufferfish ----------
A.push('15. animals covered in spikes: one pufferfish');
{ const fugu = chk(1233, 'fugu');
  link(1233, 'fugu', 'japanese_food', 4, 'the pufferfish delicacy');
  for (const tid of Object.keys(fugu.typ)) if (tid !== 'japanese_food') unlink(1233, 'fugu', tid, 'fugu is the dish in English (the fish is pufferfish)');
  if (fugu.gloss === 'pufferfish') { fugu.gloss = 'dish'; n++; A.push(`  gloss: ${lab(fugu)} [pufferfish] -> [dish] (fugu [smock] 55375 is the other)`); }
  toSynonym(1232, 'blowfish', 1231, 'pufferfish', 'the same fish; its links go (pufferfish is in all its themes; ___fish loses "blow")');
  toSynonym(1234, 'globefish', 1231, 'pufferfish', 'the same fish; its links go (pufferfish is in all its themes; ___fish loses "globe")');
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
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift}`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : (DEL.get(id) || String(id));
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

const summary = ['Issue I27: theme memberships (kitchen brigade, greenhouse gases, Earth\'s layers, renewable energy, courtroom words, whales and dolphins, nicknames for workers, river features, sidewinder, the five oceans, Platonic solids, Queen members, socks and hosiery, places of worship, pufferfish).',
  ...A.map(x => /^\d+\./.test(x) ? x : '  ' + x.replace(/^ {2}/, '')),
  `Entries left in no theme (not exported): ${themeless.join(', ') || 'none'}`,
  'Surviving ocean roots in the five oceans: Southern Ocean 32178, Pacific Ocean 36993, Indian Ocean 32042 (batch416 rates Southern 65542: re-target it to 32178)',
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch415-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

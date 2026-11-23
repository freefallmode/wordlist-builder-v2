// Library batch v436: tidy-up step 3 (TIDY-UP.md), the Nature & Earth group: every theme under nature_earth read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v433. Applied after v434 (Food & Drink) and v435 (Animals): everything here works by entry id + text and theme id, never by
// position, and every step is skipped when it is already done (rerun: 0 changes).
//   1. Twins and the tree: the mountains cluster is settled (famous mountains and ranges, a sub-theme of mountains, twins its parent and
//      Places & Geography's famous mountains and mountain ranges: deleted; its peaks and ranges stay in mountains and in those two themes;
//      Everest and Fuji, second roots of Mount Everest and Mount Fuji, become their aliases). Deleted as twins of a theme that holds all their
//      words: marine animals (sea life, ocean), water movements (tides and currents, ocean), minibeasts (insects and bugs, meadow), Australian
//      wildlife (Australian animals, outback), polar formations (merged into ice features), frozen formations (polar regions, ice features).
//      trees native to Britain gains six native trees that are not deciduous (it twinned deciduous trees); precious elements -> precious metals.
//   2. Two roots of one sense merged (the second becomes an alias, or is deleted when its text is the same or as an alias would leak a theme name): pine tree -> pine, fir tree -> fir,
//      palm tree -> palm, tree trunk -> trunk, rubber [latex source] -> rubber tree, ebony [wood] -> ebony, jet [gemstone] -> jet [gem],
//      Atacama Desert -> Atacama, Gobi Desert -> Gobi, Glencoe -> Glen Coe, passion flower -> passionflower, sun dog -> sundog, fohn -> foehn,
//      scirocco -> sirocco, bird's foot trefoil -> bird's-foot trefoil, furze and whin -> gorse, pack -> pack ice, nymphaea -> water lily,
//      sledging [sledding] -> sledding (UK synonym; the cricket sense gets its own entry), toadstools -> toadstool (form),
//      st elmo's fire -> St. Elmo's fire; stubs deleted: sheet [glacier], floe, buffalo [prairie type], couch [weed type], lightning bugs, spiders' webs, red amaryllis.
//   3. Wrong senses: fuchsia (the flower, not the color) in four flower themes; hickory (the tree) in nut trees; ovary [flower]; rose quartz [gem];
//      conker in signs of autumn; new sense entries take the link: plumbago [plant], arrowhead [plant], attrition [erosion], foam [sea],
//      moor [boat] (sailing themes; mooring moves to it), sledging [cricket].
//   4. Belonging: members of another kind leave (athlete's foot and ringworm from fungi, stone/quad/mire from garden styles, barbecue from
//      garden furniture, brick and adobe from building stones, driftwood from types of wood, durian and mangosteen from Asian trees, mandarin
//      from fruit trees, Christmas tree from New Zealand plants, birthstone from gemstones, heat [physics] from dry season, uni from rock pool
//      life, tote bag from eco swaps, deciduous from trees). Added where a theme was thin or missing its key word: four pines in pine species,
//      water lily in water plants, focus and rupture in earthquakes (orphans), buffalo grass and couch grass in grasses and reeds.
//   5. Case, type and spelling: plant names typed phrase -> common; Holiday cactus -> holiday cactus; Kuroshio, Humboldt, St. Elmo's fire,
//      Stevenson screen, Brocken specter (UK spelling Brocken spectre), Cape doctor, Brent crude, Adirondack chair, UV index; ploughing ->
//      plowing (UK spelling ploughing); pinon -> piñon (plain pinon, rule 8); Mont Blanc typed place; mold and aluminum can untagged (US
//      spellings with a UK spelling alias, v413); alias kinds (hanky, weathervane, seafloor); the alias mould allergy deleted.
//   6. Ratings, kin, groups: ripple familiarity 4 -> 2; kin humid / humidity; steamy leaves the muggy group (clash group of 11); shown texts
//      equal to the text removed; winter aconite no longer shown as "aconite" (another plant).
//   7. Reviewer's fixes (2026-11-23): grassland blooms deleted (a near-twin of meadow); Mount Everest shown "Everest" in famous marathons;
//      moor [boat] out of ports and harbors; sledging the UK regional alias of sledding, tobogganing a synonym; wicker out of and jute [plant]
//      into fiber plants; puff, sticky, warm, wet markets out; loose phrases deleted from dry season and seashells; garden styles show full
//      terms (nameOkIn) for water, rain, moon, roof and kitchen garden; gorse and Scots pine familiarity 4 -> 3.
//   8. Simon's decisions (2026-11-23, "Take all"): hot weather words -> hot weather talk; lime [linden] the UK regional alias of linden
//      (basswood, lime tree synonyms); föhn the root (Collins prints föhn); medicinal plants not sensitive.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch436.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
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
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(i.kind === 'rating-vs-zipf' ? `${i.sev} ${i.kind}: entry ${i.entryId}` : `${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const GROUP = 'nature_earth';
const inGroup = tid => { let t = ix.theme.get(tid); while (t && t.parent) t = ix.theme.get(t.parent); return t?.id === GROUP; };
const groupThemes = () => P.themes.filter(t => t.id !== GROUP && inGroup(t.id)).map(t => t.id);
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return 'deleted';
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.offensive);
  const b = ws.map(e => difficultyBand(P, e, tid)).sort((x, y) => x - y), td = themeDifficulty(t);
  return `"${t.name}" pop ${t.pop} ident ${t.ident}: ${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, theme difficulty ${td}, 4th-easiest band ${b[3] ?? '-'}, gap ${b[3] === undefined ? '-' : (b[3] - td).toFixed(1)}`;
};
const THEMES0 = groupThemes(), prof0 = Object.fromEntries(THEMES0.map(t => [t, profile(t)]));
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], alone = new Set(), deleted = [], added = [], touchedT = new Set(), counts = { merged: 0, deletedThemes: 0, renamed: 0 };
const sec = s => A.push('#' + s);
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const where = e => { const r = linkIds(P, e).filter(t => ix.theme.has(t)); return r.length ? `stays in ${r.join(', ')}` : 'now in no theme: not exported'; };
const shownE = (e, tid) => e.show?.[tid] ? { ...e, text: e.show[tid] } : e;
const leakOf = (e, tid) => nameLeak(T(tid), shownE(e, tid));
const groupsWith = id => P.themes.filter(t => (t.groups || []).some(g => g.includes(id)));

const unlinkE = (e, tid, why) => {
  T(tid);
  if (e.typ[tid] === undefined) return false;
  unlinkEntry(P, e, tid); n++; reindex(P); touchedT.add(tid);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`out of ${tid}: ${lab(e)}: ${why} (${where(e)})`);
  return true;
};
const out = (tid, list, why) => { for (const [id, text] of list) unlinkE(chk(id, text), tid, why); };
// Link e in tid. A full term that contains a word of the theme name needs `show` (a short text) or `nameOk` (the full name is the member).
const linkE = (e, tid, typ, why, x = {}) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return false;
  e.typ[tid] = typ; n++; touchedT.add(tid); alone.delete(e.id);
  if (x.show) e.show = { ...(e.show || {}), [tid]: x.show };
  if (x.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  const leak = leakOf(e, tid); if (leak) throw Error(`${lab(e)} in ${tid}: "${leak}" of the theme name: give a show or nameOk`);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${x.show ? `, shown "${x.show}"` : ''}${x.nameOk ? ', nameOkIn: the full name contains a word of the theme name' : ''}): ${why}`);
  return true;
};
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return false;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e)); alone.delete(id);
  A.push(`deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}`);
  return true;
};
const setE = (e, field, value, why) => {
  if (JSON.stringify(e[field]) === JSON.stringify(value)) return false;
  A.push(`${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++; reindex(P); return true;
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return false;
  A.push(`theme ${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++; touchedT.add(tid); reindex(P); return true;
};
const rate = (e, tid, typ, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++; touchedT.add(tid);
};
const setShow = (e, tid, s, why) => {
  const cur = e.show?.[tid] || null; if (cur === s) return;
  if (s) e.show = { ...(e.show || {}), [tid]: s }; else { e.show = { ...e.show }; delete e.show[tid]; }
  A.push(`${lab(e)} in ${tid}: shown ${JSON.stringify(cur)} -> ${JSON.stringify(s)}: ${why}`); n++; touchedT.add(tid);
};
const addToGroup = (tid, ids, why) => {
  const t = T(tid); t.groups ||= [];
  for (const id of ids) if (E(id).typ[tid] === undefined) throw Error(`${id} is not in ${tid}`);
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++; touchedT.add(tid);
  A.push(`group in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`);
};
const leaveGroup = (tid, id, why) => {
  const t = T(tid), g = (t.groups || []).find(g => g.includes(id)); if (!g) return;
  const rest = g.filter(x => x !== id);
  t.groups = [...t.groups.filter(x => x !== g), ...(rest.length > 1 ? [rest] : [])]; n++; touchedT.add(tid);
  A.push(`group in ${tid}: ${lab(E(id))} leaves ${g.map(x => E(x).text).join(' = ')}${rest.length > 1 ? '' : ' (dissolved)'}: ${why}`);
};
// A theme's link moves from a wrong-sense entry to the right one (same typicality unless given; group places follow; show given or none).
const swap = (tid, fromE, toE, why, x = {}) => {
  if (fromE.typ[tid] === undefined) return;
  const typ = x.typ ?? fromE.typ[tid];
  const gs = (T(tid).groups || []).filter(g => g.includes(fromE.id)).map(g => [...g]);
  linkE(toE, tid, typ, why, x);
  unlinkE(fromE, tid, `wrong sense: ${lab(toE)}${toE.gloss ? ' [' + toE.gloss + ']' : ''} takes the link`);
  for (const g of gs) { const ids = [...g.filter(id => id !== fromE.id && ix.entry.get(id) && E(id).typ[tid] !== undefined), toE.id]; if (ids.length > 1) addToGroup(tid, ids, `${lab(toE)} takes the place of ${lab(fromE)}`); }
};
// A new entry (rerun: found by text + gloss).
const newEntry = (text, gloss, fields, why) => {
  let e = (ix.byText.get(text.toLowerCase()) || []).find(x => x.text === text && x.gloss === gloss && (fields.aliasOf ? x.aliasOf === fields.aliasOf : !x.aliasOf));
  if (e) return e;
  e = addEntry(P, text, { gloss, status: 'rev', ...fields }); reindex(P); n++; added.push(e.id);
  A.push(`new entry: ${lab(e)}${gloss ? ' [' + gloss + ']' : ''} ${e.pos}, ${e.type}, familiarity ${e.fam}${e.aliasOf ? `, ${e.aliasKind} alias of ${lab(E(e.aliasOf))}${e.region.length ? ' [' + e.region + ']' : ''}` : ''}: ${why}`);
  return e;
};
// Two roots of one sense: gone's links move to keep (the better typicality where both are linked; show, use, nameOkIn and group places follow),
// its kin and aliases move; then gone is deleted (same text) or becomes keep's alias of `kind` in place (id kept).
const mergeInto = (keepId, keepText, goneId, goneText, kind, fam, why, o = {}) => {
  const keep = chk(keepId, keepText), gone = ix.entry.get(goneId);
  if (!gone) return;
  if (gone.aliasOf === keepId) return;
  chk(goneId, goneText);
  if (keep.aliasOf || gone.aliasOf) throw Error(`${goneText}/${keepText}: an alias`);
  const moved = [], rated = [];
  for (const a of P.entries.filter(a => a.aliasOf === goneId)) {
    const dup = P.entries.find(b => b.aliasOf === keepId && b.text === a.text);
    if (dup || a.text === keep.text) { for (const x of P.entries) if (x.use) for (const [t, id] of Object.entries(x.use)) if (id === a.id) delete x.use[t]; P.entries = P.entries.filter(x => x !== a); n++; A.push(`  deleted alias ${lab(a)} of ${lab(gone)}: ${lab(keep)} has it already`); continue; }
    a.aliasOf = keepId; n++; A.push(`  alias ${lab(a)} (${a.aliasKind}) moves to ${lab(keep)}`);
  }
  reindex(P);
  for (const [tid, typ] of Object.entries(gone.typ)) {
    const t = T(tid); touchedT.add(tid);
    if (keep.typ[tid] === undefined) {
      keep.typ[tid] = typ; moved.push(`${tid}:${typ}`);
      if (gone.use?.[tid] && !keep.use?.[tid]) keep.use = { ...(keep.use || {}), [tid]: gone.use[tid] };
      const gs = gone.show?.[tid] || gone.text;
      if (gs !== keep.text && (o.keepShow || gone.show?.[tid]) && !keep.show?.[tid]) keep.show = { ...(keep.show || {}), [tid]: gs };
      if (keep.show?.[tid] === keep.text) { keep.show = { ...keep.show }; delete keep.show[tid]; }
      reindex(P);
      if (leakOf(keep, tid)) {
        if (!nameLeak(t, { ...gone, text: gs, nameOkIn: [] }) && gs !== keep.text) keep.show = { ...(keep.show || {}), [tid]: gs };
        else keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), tid])];
      }
    } else if (typ < keep.typ[tid]) { rated.push(`${tid} ${keep.typ[tid]} -> ${typ}`); keep.typ[tid] = typ; }
    const gs2 = (t.groups || []).map(g => g.includes(goneId) ? [...new Set(g.map(id => id === goneId ? keepId : id))] : g);
    const hit = gs2.filter(g => g.includes(keepId));
    t.groups = [...gs2.filter(g => !hit.includes(g)), ...(hit.length ? [[...new Set(hit.flat())]] : [])].filter(g => g.length > 1);
  }
  n++; counts.merged++;
  if ((gone.kin || []).length) { A.push(`  kin of ${lab(gone)} moves to ${lab(keep)}: ${gone.kin.map(id => lab(E(id))).join(', ')}`); moveKin(P, gone, keep); }
  for (const tid of Object.keys(gone.typ)) delete gone.typ[tid];
  gone.show = {}; gone.use = {}; gone.nameOkIn = [];
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.filter(id => id !== goneId)).filter(g => g.length > 1);
  reindex(P);
  const tail = `${moved.length ? '; links move: ' + moved.join(' ') : ''}${rated.length ? '; better typicality kept: ' + rated.join(', ') : ''}`;
  if (gone.text === keep.text || o.del) {
    deleteEntry(P, gone); reindex(P); deleted.push(lab(gone));
    A.push(`${lab(gone)}${gone.gloss ? ' [' + gone.gloss + ']' : ''} merged into ${lab(keep)}${keep.gloss ? ' [' + keep.gloss + ']' : ''} and deleted${o.del ? ` (${o.del})` : ' (same text)'}${tail}: ${why}`);
  } else {
    gone.aliasOf = keepId; gone.aliasKind = kind; gone.fam = fam; gone.kin = [];
    if (o.region) gone.region = o.region;
    if (kind === 'spelling') { for (const f of ['adult', 'sensitive', 'offensive', 'tm']) gone[f] = !!keep[f]; gone.type = keep.type; if (!o.region) gone.region = []; }
    if (o.gloss !== undefined) gone.gloss = o.gloss;
    reindex(P);
    A.push(`${lab(gone)}${gone.gloss ? ' [' + gone.gloss + ']' : ''} becomes a ${kind} alias of ${lab(keep)} (familiarity ${fam}${gone.region.length ? ', region ' + gone.region : ''})${tail}: ${why}`);
  }
};
// A whole theme goes; every word must stay linked elsewhere (or be listed as moved first).
const dropTheme = (tid, why) => {
  if (!ix.theme.has(tid)) return;
  const t = T(tid), ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined);
  const lost = ws.filter(e => linkIds(P, e).filter(x => x !== tid).length === 0);
  if (lost.length) throw Error(`${tid}: words that would be in no theme: ${lost.map(lab).join(', ')}`);
  if (t.note) A.push(`  (its note "${t.note}" goes with it)`);
  const kids = P.themes.filter(x => x.parent === tid).map(x => x.id);
  if (kids.length) throw Error(`${tid} has sub-themes`);
  deleteTheme(P, tid); reindex(P); n++; counts.deletedThemes++;
  A.push(`deleted theme: ${tid} "${t.name}" (${ws.length} words, all still in other themes): ${why}`);
};

// =================================================================================================
sec('1. Twins and the tree');
// 1a. The mountains cluster
mergeInto(6757, 'Mount Everest', 32079, 'Everest', 'synonym', 1, 'the same mountain: Mount Everest is the name famous mountains uses; Everest, the short name, is its alias (the game swaps none, so the theme shows the full name)');
mergeInto(2354, 'Mount Fuji', 32087, 'Fuji', 'synonym', 2, 'the same mountain (gloss mountain kept: Fuji is also an apple and a music style)');
if (E(6757).typ.famous_marathons !== undefined) setShow(E(6757), 'famous_marathons', 'Everest', 'the race is the Everest Marathon (reviewer)');
setE(chk(18416, 'Mont Blanc'), 'type', 'place', 'a mountain is a place (the other Mont Blanc, the dessert, is proper)');
dropTheme('famous_mountains_and_ranges', 'a twin of its parent mountains (all 11 words are there) and of Places & Geography\'s famous mountains and mountain ranges, which hold every peak and range in it; the name kept in v433 is settled by merging it into them');
// 1b. Habitat sub-themes that twin a theme holding all their words
dropTheme('marine_animals', 'twins sea life (Animals: 12 of its 14 words); all 14 are in its parent ocean');
dropTheme('moving_water', '"water movements" twins tides and currents (8 of 10); all 10 are in its parent ocean');
dropTheme('minibeasts', 'twins insects and bugs (Animals: 8 of 10); all 10 are in its parent meadow');
dropTheme('grassland_blooms', 'all 22 words are in its parent meadow and 17 in wildflowers: a near-duplicate (reviewer)');
dropTheme('australian_wildlife', 'twins Australian animals (Animals: 11 of 13); all 13 are in its parent outback');
// 1c. Ice: polar formations (snow and ice) and frozen formations (polar regions) are 12-word sets inside ice features
{ const t = 'polar_formations';
  if (ix.theme.has(t)) {
    // its stubs first: sheet [glacier] and floe are bare stubs of ice sheet and ice floe; pack [drifting floes] is pack ice
    const sh = chk(28525, 'sheet'), fl = chk(28526, 'floe');
    linkE(chk(30901, 'ice sheet'), t, sh.typ[t], 'the full term of the stub sheet [glacier]');
    linkE(chk(21052, 'ice floe'), t, fl.typ[t], 'the full term of the stub floe');
    unlinkE(sh, t, 'a bare stub: ice sheet takes the link'); unlinkE(fl, t, 'a bare stub: ice floe takes the link');
  }
  delE(28525, 'sheet', 'a bare stub of ice sheet made for polar formations (LIBRARY-RULES 5: never a bare stub); in no theme');
  delE(28526, 'floe', 'a bare stub of ice floe made for polar formations; in no theme');
  mergeInto(30904, 'pack ice', 63778, 'pack', 'synonym', 4, 'pack [drifting floes] is pack ice (ice features shows it as "pack")', { gloss: 'drifting floes' });
  if (ix.theme.has(t)) linkE(chk(31303, 'pancake ice'), 'ice_features', 5, 'from polar formations (its one word ice features lacked)', { show: 'pancake' });
  dropTheme(t, 'with its stubs replaced it shares 11 of 12 words with ice features (a twin); pancake ice moves there; all its words stay in ice features and snow and ice');
  dropTheme('frozen_formations', 'all 12 words are in its parent polar regions and 9 in ice features: a near-duplicate of both');
}
// 1d. trees native to Britain shared 13 of 16 words with deciduous trees: the native evergreens and shrub-trees complete it
for (const [id, text, typ, why] of [[29955, 'Scots pine', 2, 'Britain\'s native pine'], [29953, 'holly', 2, 'a native evergreen'], [1655, 'juniper', 3, 'one of the three native conifers'],
  [30070, 'box', 4, 'a native evergreen (box hill)'], [29988, 'crab apple', 3, 'the native wild apple'], [30073, 'blackthorn', 3, 'a native small tree (sloes)']])
  linkE(chk(id, text), 'trees_native_to_britain', typ, `${why}: the theme held only deciduous trees (theme-twin with deciduous trees, 13 of 16)`);
setT('hot_weather_words', 'name', 'hot weather talk', 'how people talk about the heat (scorcher, scorchio, sweltering, dog days); it shared 19 of 42 words with words for hot (xwords-twin), LIBRARY-RULES 6: renamed for what it is (Simon, 2026-11-23); the id stays');
setT('medicinal_plants', 'sensitive', false, 'no member is a drug plant and the theme is not religion, politics or death (Simon, 2026-11-23)');
setT('precious_elements', 'name', 'precious metals', 'gold, silver, platinum and the platinum-group metals are called precious metals; the everyday name (the id stays)');

// =================================================================================================
sec('2. Two roots of one sense');
mergeInto(1629, 'pine', 39535, 'pine tree', 'synonym', 1, 'the same tree; LIBRARY-RULES 5 names pine as a short word that names the thing alone (pine tree was shown "pine" where it leaked)', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(1638, 'fir', 30687, 'fir tree', 'synonym', 1, 'the same tree (fir tree was shown "fir" in trees and needle-leaf trees)', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(1631, 'palm', 32116, 'palm tree', 'synonym', 1, 'the same tree (palm tree was shown "palm" in trees)', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(30032, 'trunk', 40163, 'tree trunk', 'synonym', 1, 'the same part (tree trunk was shown "trunk" in tree parts)', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(1659, 'ebony', 38999, 'ebony', 'synonym', 3, 'one sense: the tree entry is also the wood in types of wood, as oak, ash and teak (sense-twin)');
mergeInto(31691, 'jet', 40127, 'jet', 'synonym', 4, 'jet [gem] and jet [gemstone] are one sense (sense-twin in gemstones)');
mergeInto(32054, 'Atacama', 37669, 'Atacama Desert', 'synonym', 3, 'the same desert; the bare name like Sahara, Kalahari, Mojave (desert showed it as "Atacama")', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(32050, 'Gobi', 21111, 'Gobi Desert', 'synonym', 2, 'the same desert; the bare name like Sahara (desert showed it as "Gobi")', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(30983, 'Glen Coe', 30990, 'Glencoe', 'spelling', 3, 'the same glen, both glossed valley in Scottish landscape words (Glencoe is the usual spelling of the village)');
mergeInto(56512, 'passionflower', 30399, 'passion flower', 'spelling', 3, 'one word written two ways (Merriam-Webster: passionflower)', { del: "as an alias its text would hold the theme name's word wherever the root is linked (theme-name)" });
mergeInto(31405, 'sundog', 31435, 'sun dog', 'spelling', 4, 'one word written two ways (grouped as one answer in sky phenomena and ice-crystal effects)');
mergeInto(31336, E(31336).text, 31366, 'fohn', 'spelling', 5, 'one word written two ways (German Föhn; grouped in named winds)');
{ const f = E(31336);
  if (f.text === 'foehn') { A.push('text: foehn 31336 -> "föhn": rule 8: Collins English Dictionary prints föhn as the headword, with foehn as its variant (dictionary.com British entry, Collins English Dictionary 2012; Merriam-Webster and Random House print foehn); Simon, 2026-11-23'); f.text = 'föhn'; n++; reindex(P); }
  newEntry('foehn', '', { aliasOf: 31336, aliasKind: 'spelling', region: [], pos: f.pos, type: f.type, fam: 5 }, 'the variant spelling (Merriam-Webster\'s headword); fohn stays the plain spelling (rule 8)'); }
mergeInto(31335, 'sirocco', 31367, 'scirocco', 'spelling', 5, 'one word written two ways (grouped in named winds)');
mergeInto(30364, "bird's-foot trefoil", 60176, "bird's foot trefoil", 'spelling', 5, 'the same plant, written with and without the hyphen (wildflowers and meadow use the hyphen)');
{ const bw = chk(1678, 'basswood'), lt = chk(1677, 'lime tree');
  setE(bw, 'aliasKind', 'synonym', 'lime becomes the UK display word of linden; basswood, the timber name used in the US, is a synonym (Simon, 2026-11-23)');
  setE(lt, 'aliasKind', 'synonym', 'moves with lime to linden: one display alias per dialect, lime is the UK one (Simon, 2026-11-23)'); }
mergeInto(1676, 'linden', 64792, 'lime', 'regional', 3, 'the UK name of the linden tree (grouped as one answer in trees and deciduous trees): its UK regional alias (Simon, 2026-11-23)', { region: ['UK'] });
mergeInto(1796, 'gorse', 1797, 'furze', 'synonym', 4, 'another name of gorse (all three grouped as one answer in plants, yellow flowers and thorny plants); keeps its UK tag', { region: ['UK'] });
mergeInto(1796, 'gorse', 1798, 'whin', 'synonym', 5, 'another name of gorse; keeps its UK tag', { region: ['UK'] });
{ const w = chk(1791, 'water lily'), ny = ix.entry.get(63142);
  if (ny && !ny.aliasOf) { linkE(w, 'water_plants', 1, 'the best-known water plant, missing from the theme (nymphaea, its Latin genus name, held the link at typicality 1 because water lily leaks "water"); shown "lily" as water hyacinth and water fern are', { show: 'lily' }); unlinkE(ny, 'water_plants', 'water lily takes the link'); }
  mergeInto(1791, 'water lily', 63142, 'nymphaea', 'synonym', 5, 'the Latin genus name of the water lily'); }
// rock pool [UK] / tide pool: one thing, but as an alias rock pool would leak the name of rock pool life: listed for Simon
{ const sl = chk(5366, 'sledging');
  if (!sl.aliasOf && sl.typ.cricket_terms !== undefined) {
    const ck = newEntry('sledging', 'cricket', { pos: 'noun', type: 'common', fam: 4 }, 'verbal needling of a batsman in cricket; the old entry mixed it with sledding (gloss "sledding or cricket banter")');
    swap('cricket_terms', sl, ck, 'the cricket sense');
  }
  if (!sl.aliasOf) { setE(sl, 'gloss', 'sledding', 'the snow sense; the cricket sense is its own entry'); }
  setE(chk(5365, 'tobogganing'), 'aliasKind', 'synonym', 'sledging becomes the UK display word for sledding (one per dialect); tobogganing stays a synonym with its UK and CA tags (reviewer)');
  mergeInto(5364, 'sledding', 5366, 'sledging', 'regional', 2, 'the UK word for sledding (same activity): its UK regional alias', { region: ['UK'] }); }
// bats 23197 (a plural root of bat) stays: the export needs the word bats (stab in reversible words), and as a form alias of bat it would repeat the theme name bats: listed for Simon
{ const ts = chk(31544, 'toadstools'), t1 = chk(22509, 'toadstool');
  if (!ts.aliasOf) {
    const tid = 'signs_of_autumn', typ = ts.typ[tid], gs = (T(tid).groups || []).find(g => g.includes(31544));
    unlinkE(ts, tid, 'a plural root of toadstool: toadstool takes the link and shows the plural'); linkE(t1, tid, typ, 'from toadstools, its plural'); t1.use = { ...(t1.use || {}), [tid]: 31544 };
    if (gs) addToGroup(tid, [...gs.filter(id => id !== 31544), 22509], 'toadstool takes the place of toadstools');
    ts.aliasOf = 22509; ts.aliasKind = 'form'; n++; reindex(P); alone.delete(31544);
    A.push('toadstools 31544 becomes a form alias of toadstool 22509; toadstool shows "toadstools" (use) in signs of autumn');
  } }
{ const sw = ix.entry.get(31531);
  if (sw) { unlinkE(chk(31531, "spiders' webs"), 'signs_of_autumn', 'repeats spider web (with its form spider webs), already in the theme and in the same group'); delE(31531, "spiders' webs", 'a plural duplicate of spider web 39072, in no theme now'); } }
{ const lb = ix.entry.get(31592);
  if (lb) { unlinkE(chk(31592, 'lightning bugs'), 'nature_at_night', 'repeats firefly, whose US alias is lightning bug (both were in the theme, grouped)'); delE(31592, 'lightning bugs', 'a root that repeats the alias lightning bug 1360 of firefly, in no theme now'); } }
{ const r = ix.entry.get(65482);
  if (r) { linkE(chk(30014, 'rubber tree'), 'south_american_trees', r.typ.south_american_trees ?? 2, 'from rubber [latex source], a second root of the rubber tree', { show: 'rubber' }); unlinkE(chk(65482, 'rubber'), 'south_american_trees', 'rubber tree takes the link'); delE(65482, 'rubber', 'a second root of the rubber tree made for South American trees ("rubber" alone is the material); in no theme'); } }
{ const bf = ix.entry.get(63763);
  if (bf) { linkE(chk(60209, 'buffalo grass'), 'grasses_and_reeds', bf.typ.grasses_and_reeds ?? 4, 'the full term of the stub buffalo [prairie type]', { show: 'buffalo' }); unlinkE(chk(63763, 'buffalo'), 'grasses_and_reeds', 'a bare stub: buffalo grass takes the link'); delE(63763, 'buffalo', 'a bare modifier stub of buffalo grass (LIBRARY-RULES 5); in no theme'); } }
{ const cg = ix.entry.get(63765);
  if (cg) { linkE(chk(30646, 'couch grass'), 'grasses_and_reeds', cg.typ.grasses_and_reeds ?? 4, 'the full term of the stub couch [weed type]', { show: 'couch' }); unlinkE(chk(63765, 'couch'), 'grasses_and_reeds', 'a bare stub: couch grass takes the link'); delE(63765, 'couch', 'a bare modifier stub of couch grass (LIBRARY-RULES 5); in no theme'); } }
{ const ra = ix.entry.get(30693);
  if (ra) { unlinkE(chk(30693, 'red amaryllis'), 'christmas_plants', 'amaryllis 1751 is in the theme: a word and a more specific form of it (LIBRARY-RULES 5, overlap)'); delE(30693, 'red amaryllis', 'made for Christmas plants beside amaryllis; in no theme'); } }

// =================================================================================================
sec('3. Wrong senses');
{ const fc = chk(7685, 'fuchsia'), ff = chk(62419, 'fuchsia');
  for (const tid of ['hedge_plants', 'garden_flowers', 'edible_flowers', 'south_american_flowers']) swap(tid, fc, ff, 'the plant (fuchsia [pink-purple] is the color)'); }
swap('nut_trees', chk(17363, 'hickory nut'), chk(1656, 'hickory'), 'the tree, as the other members (hickory nut is the nut; it was shown "hickory")');
swap('flower_parts', chk(14368, 'ovary'), chk(40954, 'ovary'), 'the part of a flower (sense-link)');
swap('quartz_varieties', chk(38661, 'rose quartz'), chk(31680, 'rose quartz'), 'the gem (rose quartz [color] is the color)', { show: 'rose' });
swap('signs_of_autumn', chk(5960, 'conkers'), chk(30088, 'conker'), 'the horse chestnut seed (conkers 5960 is the game)');
{ const old = chk(2066, 'plumbago');
  if (old.typ.south_african_flowers !== undefined || old.typ.blue_flowers !== undefined) {
    const p = newEntry('plumbago', 'plant', { pos: 'noun', type: 'common', fam: 5 }, 'the blue-flowered shrub (leadwort); the old entry is graphite');
    for (const tid of ['south_african_flowers', 'blue_flowers']) swap(tid, old, p, 'the plant');
  }
  if (!old.gloss) setE(old, 'gloss', 'graphite', 'its text is now shared with plumbago [plant]'); }
{ const old = chk(21715, 'arrowhead');
  if (old.typ.water_plants !== undefined) { const p = newEntry('arrowhead', 'plant', { pos: 'noun', type: 'common', fam: 4 }, 'the water plant Sagittaria (the old entry is the tip of an arrow)'); swap('water_plants', old, p, 'the plant'); }
  if (!old.gloss) setE(old, 'gloss', 'arrow tip', 'its text is now shared with arrowhead [plant]'); }
{ const old = chk(21371, 'attrition');
  if (old.typ.erosion_words !== undefined) { const p = newEntry('attrition', 'erosion', { pos: 'noun', type: 'common', fam: 4 }, 'rocks wearing each other down as they are carried (the old entry, from war words in v430, is the war of attrition)'); swap('erosion_words', old, p, 'the erosion sense'); }
  if (!old.gloss) setE(old, 'gloss', 'war', 'its text is now shared with attrition [erosion]'); }
{ const old = chk(16291, 'foam');
  if (old.typ.wave_words !== undefined) { const p = newEntry('foam', 'sea', { pos: 'noun', type: 'common', fam: 1 }, 'the white froth of breaking waves (the old entry is bath foam)'); swap('wave_words', old, p, 'the sea sense'); } }
{ const old = chk(1952, 'moor'), sail = ['sailing_words', 'ports_and_harbors', 'cruise_words'];
  if (sail.some(t => old.typ[t] !== undefined)) {
    const p = newEntry('moor', 'boat', { pos: 'verb', type: 'common', fam: 3 }, 'to tie up a boat (the old entry is the heath landscape; it also held the sailing themes and the form mooring)');
    for (const tid of sail) swap(tid, old, p, 'the boat sense');
    unlinkE(p, 'ports_and_harbors', 'the theme lists harbor parts (nouns) and berth [mooring] is there; mooring is an alias of moor [boat], not a root (reviewer)');
    const m = chk(47466, 'mooring'); if (m.aliasOf !== p.id) { m.aliasOf = p.id; n++; reindex(P); A.push(`mooring 47466 (form) moves from moor [heath] to ${lab(p)} [boat]: a mooring is where a boat is moored`); }
  }
  if (!old.gloss) setE(old, 'gloss', 'heath', 'its text is now shared with moor [boat]'); }

// =================================================================================================
sec('4. Belonging');
out('fungi', [[3431, "athlete's foot"], [3433, 'ringworm']], 'an infection caused by a fungus, not a fungus');
out('garden_styles', [[2050, 'stone'], [6565, 'quad'], [1927, 'mire']], 'not a garden style (rock garden, courtyard garden and bog garden are the styles)');
out('garden_furniture', [[19767, 'barbecue']], 'barbecue [grilled meat] is the meal, and a grill is not furniture');
out('building_stones', [[24030, 'brick'], [50304, 'adobe']], 'made, not stone (in building materials)');
out('types_of_wood', [[30059, 'driftwood']], 'wood washed up on a beach, not a kind of wood (in beachcombing finds)');
out('asian_trees', [[365, 'durian'], [378, 'mangosteen']], 'the fruit entry (no tree sense); the theme names trees');
out('fruit_trees', [[79, 'mandarin']], 'the fruit entry in a theme of "X tree" entries; tangerine tree, with which it was grouped, stays');
out('new_zealand_plants', [[25007, 'Christmas tree']], 'the decorated Christmas tree (evergreen tree); pōhutukawa, the New Zealand Christmas tree, stays');
out('gemstones', [[31696, 'birthstone']], 'a role, not a kind of gem');
out('dry_season', [[40847, 'heat']], 'heat [physics] is the science term');
out('rock_pool', [[503, 'uni']], 'sea urchin roe as food; sea urchin is the animal (in rock pool life)');
out('eco_swaps', [[4991, 'tote bag']], 'a kind of reusable bag, which is in the theme (overlap; its group made a clash group of 9)');
out('fiber_plants', [[30682, 'wicker']], 'a weave of rattan, willow or cane, not a plant (reviewer)');
{ const old = chk(24866, 'jute'); if (old.typ.fiber_plants !== undefined) { const p = newEntry('jute', 'plant', { pos: 'noun', type: 'common', fam: 3 }, 'the plant grown for jute fiber (the old entry is the fabric; flax and hemp have plant senses)'); swap('fiber_plants', old, p, 'the plant (reviewer)'); } }
out('wind_words', [[17037, 'puff']], 'puff [breath] is a breath, not a gust (reviewer)');
out('hot_weather_words', [[14804, 'sticky'], [31463, 'warm']], 'sticky [tacky] is the texture sense; warm [not hot] is glossed as not hot (reviewer)');
{ const DS = [[31655, 'lack of rain'], [31643, 'low rivers'], [31647, 'brown grass'], [31649, 'shrinking lake']], SH = [[31029, 'spiral shell'], [31036, 'sea snail shell']], WM = [[31628, 'wet markets']];
  for (const [tid, list, why] of [['dry_season', DS, 'a loose description, not a fixed term (reviewer)'], ['seashells', SH, 'a loose description, not the name of a shell (reviewer)'], ['monsoon_season', WM, 'markets selling fresh meat and fish, not a sign of the monsoon (reviewer)']])
    for (const [id, text] of list) if (ix.entry.get(id)) { out(tid, [[id, text]], why); delE(id, text, `made for ${tid} only; in no theme now`); } }
out('trees', [[1673, 'deciduous']], 'an adjective, not a tree (deciduous trees is a theme of its own)');
// added where the theme was thin or lacked its key words
for (const [id, text, typ, show] of [[56468, 'white pine', 3, 'white'], [56465, 'bristlecone pine', 4, 'bristlecone'], [56464, 'loblolly pine', 4, 'loblolly'], [56472, 'Aleppo pine', 4, 'Aleppo']])
  linkE(chk(id, text), 'pine_species', typ, 'a true pine (Pinus); the theme had 4 words, all hard', { show });
linkE(chk(31881, 'focus'), 'earthquake_words', 4, 'the point where an earthquake starts (an orphan since v415; hypocenter is its synonym)');
if (E(31881).typ.earthquake_words !== undefined) addToGroup('earthquake_words', [31880, 31881], 'focus and hypocenter, the same answer');
linkE(chk(31884, 'rupture'), 'earthquake_words', 4, 'the break along a fault in an earthquake (an orphan since v415)');

// =================================================================================================
sec('5. Case, type and spelling');
for (const [id, text] of [[1726, 'forget-me-not'], [1752, 'bird of paradise'], [30442, "baby's breath"], [30353, 'love-in-a-mist'], [30405, "angel's trumpet"],
  [30475, 'hen and chicks'], [2540, 'cherry blossom'], [30548, 'fiddle-leaf fig'], [30556, 'string of pearls'], [1662, 'monkey bread tree'], [2553, 'silver fern'],
  [2554, 'ponga'], [48724, 'game reserve']])
  setE(chk(id, text), 'type', 'common', 'the name of a plant or place type, not an idiom: type phrase is for idioms and set phrases only (LIBRARY-RULES 4; ponga was contract-type-common)');
const retext = (id, from, to, type, why) => { const e = E(id); if (e.text === to) { if (type) setE(e, 'type', type, why); return e; } chk(id, from); A.push(`text: ${lab(e)} -> "${to}": ${why}`); e.text = to; n++; reindex(P); if (type) setE(e, 'type', type, why); return e; };
retext(65496, 'Holiday cactus', 'holiday cactus', 'common', 'holiday is not a proper word (Christmas cactus keeps its capital)');
retext(31138, 'kuroshio', 'Kuroshio', 'proper', 'the name of a current, like Agulhas and Benguela beside it');
setE(chk(63111, 'Humboldt'), 'type', 'proper', 'the Humboldt Current (a named current), not the person');
mergeInto(39978, "St. Elmo's fire", 31431, "st elmo's fire", 'spelling', 4, 'the same glow, a second root; St. Elmo\'s fire 39978 (named after St. Elmo; the library writes St. with a period) takes its link', { del: 'a case-only variant of the root' });
retext(31315, 'stevenson screen', 'Stevenson screen', 'proper', 'named after Thomas Stevenson (Oxford: Stevenson screen)');
retext(31368, 'cape doctor', 'Cape doctor', 'proper', 'the wind of the Cape (Dictionary of South African English: Cape doctor), like Fremantle doctor');
retext(32348, 'brent crude', 'Brent crude', 'proper', 'named after the Brent oilfield');
retext(30741, 'adirondack chair', 'Adirondack chair', 'proper', 'named after the Adirondacks (Merriam-Webster: Adirondack chair)');
retext(16351, 'uv index', 'UV index', 'proper', 'UV is an initialism, written in capitals');
{ const b = retext(31416, 'brocken spectre', 'Brocken specter', 'proper', 'named after the Brocken; US spelling as root (Merriam-Webster: Brocken specter)');
  newEntry('Brocken spectre', '', { aliasOf: b.id, aliasKind: 'spelling', region: ['UK'], pos: 'noun', type: 'proper', fam: b.fam }, 'the UK spelling'); }
{ const p = retext(31549, 'ploughing', 'plowing', null, 'US spelling as root (LIBRARY-RULES 5)');
  newEntry('ploughing', '', { aliasOf: p.id, aliasKind: 'spelling', region: ['UK'], pos: p.pos, type: 'common', fam: p.fam }, 'the UK spelling'); }
{ const p = retext(17361, 'pinon', 'piñon', null, 'rule 8: Merriam-Webster prints piñon');
  newEntry('pinon', '', { aliasOf: p.id, aliasKind: 'spelling', region: [], pos: p.pos, type: p.type, fam: p.fam }, 'the plain form, kept as a spelling (rule 8)'); }
setE(chk(30330, 'mold'), 'region', [], 'the US spelling root of mould [UK]: untagged, as color is (v413)');
setE(chk(23983, 'aluminum can'), 'region', [], 'the US spelling root of aluminium can [UK]: untagged, as color is (v413)');
setE(chk(4977, 'hanky'), 'aliasKind', 'abbreviation', 'a short form of handkerchief like hankie (not a spelling of handkerchief; alias-kind-suspect)');
setE(chk(31306, 'weathervane'), 'aliasKind', 'synonym', 'another name of the wind vane, not a spelling of it (alias-kind-suspect)');
setE(chk(32035, 'seafloor'), 'aliasKind', 'synonym', 'another word for the seabed, not a spelling of it (alias-kind-suspect)');
{ const m = ix.entry.get(14935); if (m) { chk(14935, 'mould allergy'); if (m.aliasOf !== 30330) throw Error('mould allergy');
  for (const x of P.entries) if (x.use) for (const [t, id] of Object.entries(x.use)) if (id === 14935) throw Error('mould allergy is used');
  P.entries = P.entries.filter(x => x !== m); n++; reindex(P); deleted.push('mould allergy 14935');
  A.push('deleted alias: mould allergy 14935, a UK "spelling" of mold: an allergy to mould is not a spelling of mold (mould 30331 is the UK spelling)'); } }

// =================================================================================================
sec('6. Ratings, kin, groups, shown texts');
for (const [id, text, tids] of [[30776, 'water garden', ['garden_styles']], [60279, 'rain garden', ['garden_styles']], [30792, 'moon garden', ['garden_styles']], [30789, 'roof garden', ['garden_styles']], [1870, 'kitchen garden', ['garden_styles', 'garden', 'garden_features']]]) {
  const e = chk(id, text);
  for (const tid of tids) if (e.show?.[tid]) { setShow(e, tid, null, 'the modifier alone does not name the kind: the full term, with nameOkIn (reviewer)'); e.nameOkIn = [...new Set([...(e.nameOkIn || []), tid])]; reindex(P); }
}
setE(chk(1796, 'gorse'), 'fam', 3, 'as heather and bracken (reviewer: 4 too hard)');
setE(chk(29955, 'Scots pine'), 'fam', 3, 'many adults know it (reviewer: 4 too hard)');
setE(chk(20008, 'ripple'), 'fam', 2, 'nearly every adult knows the word (4 was too hard)');
{ const a = chk(31443, 'humid'), b = chk(2002, 'humidity'); if (!(a.kin || []).includes(b.id)) { setKin(P, a, b, true); n++; A.push('kin: humid 31443 <-> humidity 2002: one word family in different themes (family-kin)'); } }
leaveGroup('hot_weather_words', 31455, 'steamy is kin of steam: the group made a clash group of 11 (clash-large); muggy and humid stay grouped');
{ const w = chk(30388, 'winter aconite'); if (w.show?.signs_of_winter) { setShow(w, 'signs_of_winter', null, 'aconite alone is another plant (monkshood): the theme shows the full name'); w.nameOkIn = [...new Set([...(w.nameOkIn || []), 'signs_of_winter'])]; A.push('  winter aconite 30388: nameOkIn signs_of_winter: winter is part of the plant\'s name'); } }
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const themeless = [...alone].filter(id => ix.entry.get(id) && !E(id).aliasOf && !linkIds(P, E(id)).length).map(id => lab(E(id)));

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (the library or export code changed since it was written: compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
const tLast = (() => { for (let i = x1.themes.length - 1; i >= 0; i--) if (x0.themes[i] !== x1.themes[i]) return i; return -1; })();
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.map(t => `${t} (index ${x0.themes.indexOf(t)})`).join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to the last index ${x1.themes.length - 1}`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const movedRows = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entry rows ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${movedRows}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${id} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const toAliasRows = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(name);
const toRootRows = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] === 0 && x0.root[ia.get(id)] !== 0).map(name);
cmp.push(`root -> alias rows ${toAliasRows.length}: ${toAliasRows.join(', ') || 'none'}; alias -> root rows ${toRootRows.length}: ${toRootRows.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${name(x1.ids[firstLinkShift])}) on, link positions move`}`);
const textChanged = x1.ids.filter((id, i) => ia.has(id) && x0.text[ia.get(id)] !== x1.text[i]).map(id => `${name(id)} (was "${x0.text[ia.get(id)]}")`);
cmp.push(`Rows whose text changed: ${textChanged.join(', ') || 'none'}`);
{ const chars = x => { const s = new Set(); for (const t of [...x.text, ...x.shown.map(v => v[0]), ...x.themeRows.map(r => r[1])]) for (const ch of String(t)) s.add(ch); return s; };
  const had = new Set([...chars(x0), ...(baseOk ? chars({ text: CE.text, shown: CF.shown || [], themeRows: CF.themes }) : [])]);
  const fresh = [...chars(x1)].filter(ch => !had.has(ch));
  cmp.push(`New characters in the export (list them in the notice: the game font needs them): ${fresh.map(ch => `${ch} U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(', ') || 'none'}`); }
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone (other than the deleted themes): ${lost.filter(k => !tGone.includes(k.split('\t')[0])).map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const spreads = [...touchedT].filter(t => prof0[t] || ix.theme.has(t)).filter(t => THEMES0.includes(t) || inGroup(t)).sort().map(t => `  ${t}: ${prof0[t] || 'new'} -> ${profile(t)}`);
const summary = [`Library batch v436: tidy-up step 3, Nature & Earth (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch436-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch436-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch436-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

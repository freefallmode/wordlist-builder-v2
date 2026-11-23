// Library batch v437: tidy-up step 3 (TIDY-UP.md), the Places & Geography group: every theme under places_geography read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v436. Applied first in round 2 (before v438 Travel & Transport, v439 Body & Health): everything works by entry id + text and
// theme id, never by position, and every step is skipped when it is already done (rerun: 0 changes).
//   1. Tree and twins: Balkan countries under Eastern European nations, Thirteen Colonies under US states, British and Irish rivers under
//      European rivers (each a subset of its new parent: theme-twin); the three "star flags of" continent sub-themes deleted (all their words
//      are countries in flags with stars and in the continent's countries).
//   2. Regional roots with a same-sense root become its aliases (LIBRARY-RULES 5, Aliases; contract-root-region): Eire, Frisco, Lady Liberty
//      (both roots), Elizabeth Tower, Golden Gate, Millennium Wheel, Sultan Ahmed Mosque, Bondi, triangulation pillar, Greenwich Meridian,
//      Old Glory, nightstick, layby; Fujiyama a synonym of Mount Fuji (v436), ordered after Fuji; jail and Aussie untagged; Angora to old
//      city names. Second roots of one place merged: Washington DC, Salt Lake, Surinam, The Netherlands, Vinson, Galapagos Islands,
//      St Lawrence, Amazon River, Caspian [sea], Hatshepsut [temple], Harmandir Sahib, Great Pyramid of Giza, Sphinx [Giza], Tower of Pisa,
//      Neuschwanstein, LoC, mailbag, teepee, wading pool, stop and go.
//   3. Wrong senses: one entry held two places (Lincoln, Dover, Charleston, Hamilton, Newcastle, Kingston, Córdoba, Hanover, Cannes, Busan,
//      Normandy, Cyprus, Bangka, Baffin, Altai, Neapolitan, Gold Coast): the other place gets its own entry; Broadway, goggles, Fiji swapped.
//   4. Belonging: territories out of country themes, flags that fail their test, stubs deleted, named towers out of towers and skyscrapers.
//   5. Case and type: White House, Terracotta Army, Jolly Roger, North Rhine-Westphalia, names of things typed phrase -> common.
//   6. Reviewer's fixes (2026-11-23): the six leaking names kept as aliases with nameOkIn; bare stubs in gulfs and bays, straits and canals,
//      peninsulas and famous streets become full names shown short; famous streets out of street names; Seven Ancient Wonders one root per
//      item; alias order (Fuji before Fujiyama, Frisco an abbreviation, whiff-whaff stays a root); all names of things typed common.
// Run: node tools/gen/batch437.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin, placeTheme } from '../../js/model.js';
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
const GROUP = 'places_geography';
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
const A = [], alone = new Set(), deleted = [], added = [], touchedT = new Set(), counts = { merged: 0, deletedThemes: 0, renamed: 0, moved: 0 };
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

// ---------- helpers added for v437 ----------
// A theme moves under another (the tree; id kept).
const moveT = (tid, into, why) => {
  const t = T(tid); T(into); if (t.parent === into) return false;
  const from = t.parent; if (!placeTheme(P, tid, into, 'in')) throw Error('place ' + tid); reindex(P); n++; counts.moved++; touchedT.add(tid);
  A.push(`theme ${tid} "${t.name}" moves from ${from} to ${into} "${T(into).name}": ${why}`); return true;
};
// Text change in place (id kept).
const retext = (id, from, to, type, why) => { const e = E(id); if (e.text === to) { if (type) setE(e, 'type', type, why); return e; } chk(id, from); A.push(`text: ${lab(e)} -> "${to}": ${why}`); e.text = to; n++; reindex(P); if (type) setE(e, 'type', type, why); return e; };
// One entry held two senses: a new entry of the other sense takes the listed links; the old one gets a gloss.
const split = (oldId, oldText, oldGloss, newGloss, fields, tids, why) => {
  const old = chk(oldId, oldText);
  if (tids.some(t => old.typ[t] !== undefined)) {
    const p = newEntry(oldText, newGloss, { pos: 'noun', ...fields }, why);
    for (const tid of tids) swap(tid, old, p, `the ${newGloss} sense`);
  }
  if (old.gloss !== oldGloss) setE(old, 'gloss', oldGloss, `its text is shared with ${oldText} [${newGloss}]`);
  return (ix.byText.get(oldText.toLowerCase()) || []).find(x => x.text === oldText && x.gloss === newGloss && !x.aliasOf);
};
const delStub = (id, text, tid, why) => { if (!ix.entry.get(id)) return; unlinkE(chk(id, text), tid, why); delE(id, text, `a stub made for ${tid} only; in no theme now`); };
const delAlias = (id, text, rootId, why) => { const a = ix.entry.get(id); if (!a) return; chk(id, text); if (a.aliasOf !== rootId) throw Error(`${text} is not an alias of ${rootId}`);
  for (const x of P.entries) if (x.use) for (const id2 of Object.values(x.use)) if (id2 === id) throw Error(`${text} is used`);
  P.entries = P.entries.filter(x => x !== a); n++; reindex(P); deleted.push(lab(a)); A.push(`deleted alias: ${lab(a)}: ${why}`); };
const nameOk = (e, tid, why) => { if ((e.nameOkIn || []).includes(tid)) return; e.nameOkIn = [...(e.nameOkIn || []), tid]; n++; reindex(P); A.push(`${lab(e)}: nameOkIn ${tid}: ${why}`); };

// =================================================================================================
sec('1. Twins and the tree');
moveT('balkan_countries', 'eastern_european_countries', 'all 11 Balkan countries are Eastern European nations (theme-twin 11 of 11): a real subtype, so a sub-theme of it rather than its sibling');
moveT('original_thirteen_colonies', 'us_states', 'the 13 colonies are the 13 original states, all in US states (theme-twin 13 of 13): a sub-theme of it');
moveT('british_and_irish_rivers', 'european_rivers', 'British and Irish rivers are European rivers (theme-twin 7 of 8): a sub-theme of European rivers rather than its sibling');
moveT('continents', 'continents_and_supercontinents', 'the seven continents are a complete subset of continents and supercontinents (theme-twin 8 of 8 once Australia is added): a sub-theme of it');
for (const [tid, of] of [['countries_in_africa', 'African countries'], ['countries_in_asia', 'Asian countries'], ['countries_in_oceania', 'Oceanian countries']])
  dropTheme(tid, `every word is a country of ${of} (theme-twin: all or all but one shared) and in its parent flags with stars; the continent split of one flag feature is not a theme a player can tell apart (ident 4)`);

// =================================================================================================
sec('2. Regional roots with a same-sense root (contract-root-region) and second roots of one place');
mergeInto(2138, 'Ireland', 2139, 'Eire', 'translation', 4, 'the Irish name of Ireland (both were linked in the same 10 themes, grouped): its translation alias, keeping its IE and UK tags', { region: ['IE', 'UK'] });
mergeInto(2241, 'San Francisco', 2242, 'Frisco', 'abbreviation', 4, 'a short nickname of San Francisco (grouped with it in cities and American cities): its US abbreviation (not a synonym, which the game may show as the alternative; reviewer)', { region: ['US'] });
mergeInto(2312, 'Statue of Liberty', 2313, 'Lady Liberty', 'synonym', 2, 'the nickname of the Statue of Liberty (grouped with it in 5 themes): its synonym; known everywhere, so untagged', { region: [] });
mergeInto(2312, 'Statue of Liberty', 62566, 'Lady Liberty', 'synonym', 2, 'a second root of the same statue made for famous statues (Statue of Liberty leaks "statue"): the statue takes the link, shown "Lady Liberty"', { del: 'its text is already the alias Lady Liberty of the statue', keepShow: true });
mergeInto(2314, 'Big Ben', 2315, 'Elizabeth Tower', 'synonym', 4, 'the official name of the tower called Big Ben (grouped with it in 4 themes, linked in the same 7): its UK synonym, with nameOkIn where its text holds a word of the theme name (reviewer)', { region: ['UK'] });
mergeInto(2325, 'Golden Gate Bridge', 2326, 'Golden Gate', 'synonym', 2, 'the short name of the bridge (grouped with it in landmarks and US landmarks): its synonym; known everywhere, so untagged', { region: [] });
mergeInto(2345, 'London Eye', 2346, 'Millennium Wheel', 'synonym', 4, 'the London Eye\'s first name (grouped with it): its UK synonym', { region: ['UK'] });
mergeInto(2363, 'Blue Mosque', 2364, 'Sultan Ahmed Mosque', 'synonym', 4, 'the official name of the Blue Mosque (grouped with it): its synonym, keeping its TR tag, with nameOkIn for famous mosques (reviewer)', { region: ['TR'] });
{ const b = E(2363); if (b.show?.famous_mosques && b.show.famous_mosques !== 'Blue Mosque') { setShow(b, 'famous_mosques', null, 'the full name, as the other mosques in the theme'); nameOk(b, 'famous_mosques', 'a mosque\'s name holds the word'); } }
mergeInto(2354, 'Mount Fuji', 2355, 'Fujiyama', 'synonym', 3, 'another name of Mount Fuji (grouped with it in famous mountains, landmarks and Japanese landmarks; TIDY-UP.md, from v436)');
{ const fi = P.entries.findIndex(e => e.id === 32087), yi = P.entries.findIndex(e => e.id === 2355);
  if (fi > yi && E(32087).aliasOf === 2354) { const [f] = P.entries.splice(fi, 1); P.entries.splice(yi, 0, f); reindex(P); n++;
    A.push('alias order: Fuji 32087 moves to the row before Fujiyama 2355: the game shows the first synonym alias in row order as the alternative (GAME-CONTRACT.md, flags 512), and Fuji is the better one (reviewer)'); } }
mergeInto(36613, 'Bondi Beach', 36614, 'Bondi', 'synonym', 3, 'the short name of Bondi Beach (grouped with it in Australian landmarks): its synonym, keeping its AU tag', { region: ['AU'] });
mergeInto(2449, 'trig point', 2450, 'triangulation pillar', 'synonym', 5, 'the formal name of a trig point (grouped with it in maps and globes): its UK synonym', { region: ['UK'] });
mergeInto(2419, 'prime meridian', 2420, 'Greenwich Meridian', 'synonym', 4, 'the prime meridian through Greenwich (grouped with it in two themes): its UK synonym', { region: ['UK'] });
mergeInto(2533, 'Stars and Stripes', 2534, 'Old Glory', 'synonym', 3, 'a nickname of the US flag (grouped with it in 3 themes): its US synonym', { region: ['US'] });
for (const tid of ['national_symbols', 'symbols_of_the_usa']) leaveGroup(tid, 2535, 'the national anthem is a symbol of its own, not another name of the flag (national anthem is in the theme too)');
// whiff-whaff 5246 [UK] stays a root grouped with table tennis: as table tennis's only synonym alias the game would show it (fam 5) as the alternative (GAME-CONTRACT.md, flags 512); no other kind fits (For Simon)
mergeInto(57632, 'kiddie pool', 57631, 'wading pool', 'synonym', 3, 'another US word for the kiddie pool (grouped with it in water park): its US synonym, with nameOkIn for swimming pool as paddling pool has (reviewer)', { region: ['US'] });
// tube map [UK] stays a root: as the UK regional alias of subway map its text would leak "map" in kinds of maps (theme-name)
{ const nk = ix.entry.get(33701), tr = chk(33681, 'truncheon');
  if (nk && !nk.aliasOf) { tr.aliasOf = 33682; n++; reindex(P); A.push('  alias truncheon 33681 (regional [UK]) moves from nightstick to baton [police] 33682'); }
  mergeInto(33682, 'baton', 33701, 'nightstick', 'synonym', 4, 'a US name for the police baton (grouped with it in police station; both in police words and officer\'s equipment): its US synonym; truncheon stays the UK display word', { region: ['US'] }); }
mergeInto(27385, 'lay-by', 38439, 'layby', 'spelling', 4, 'a closed spelling of lay-by (lay-by [pull-in] is in traffic words, layby in parts of a road): its spelling');
mergeInto(67195, 'stop-and-go', 38412, 'stop and go', 'spelling', 3, 'one term written with and without hyphens, both in traffic words: its spelling');
setE(chk(2486, 'jail'), 'region', [], 'jail is everyday British English too (fam 1): no region (prison words, buildings)');
setE(chk(38015, 'Aussie'), 'region', [], 'every UK and US adult knows the word (fam 1), as Kiwi, which is untagged');
{ const a = chk(36158, 'Angora');
  if (a.typ.capital_cities !== undefined) { linkE(a, 'old_city_names', 4, 'the old name of Ankara (in no other theme)'); out('capital_cities', [[36158, 'Angora']], 'an old name of Ankara, not a capital today (grouped with Ankara)'); out('turkish_cities', [[36158, 'Angora']], 'an old name of Ankara (grouped with Ankara)'); } }
out('foods_named_after_places', [[966, 'bubbly']], 'a nickname of champagne, not named after a place (champagne is in the theme; they were grouped)');
// other second roots of one place
mergeInto(38117, 'Washington', 35774, 'Washington DC', 'synonym', 1, 'the same city (Washington [city] is in American capitals and US cities, Washington DC in capital cities)');
mergeInto(35922, 'Salt Lake City', 62825, 'Salt Lake', 'abbreviation', 3, 'a short name of Salt Lake City, a second root made for American cities: the city takes the link, shown "Salt Lake"', { keepShow: true });
mergeInto(2202, 'Suriname', 36146, 'Surinam', 'spelling', 4, 'an older spelling of Suriname (grouped with it in 3 themes)', { gloss: '' });
mergeInto(2140, 'Netherlands', 2142, 'The Netherlands', 'synonym', 2, 'the same name with the article (grouped with Netherlands in 4 themes)');
mergeInto(36535, 'Vinson Massif', 57169, 'Vinson', 'synonym', 4, 'the short name of the same mountain (Seven Summits names it "Vinson", which now matches the alias)');
mergeInto(57215, 'Galápagos', 36587, 'Galapagos Islands', 'synonym', 2, 'the same islands; the root keeps the diacritic (rule 8); nameOkIn for famous islands (reviewer)');
mergeInto(57313, 'St. Lawrence', 36788, 'St Lawrence', 'spelling', 3, 'the same river, written without the period (the library writes St.)', { gloss: '' });
mergeInto(36769, 'Amazon', 60557, 'Amazon River', 'synonym', 1, 'the same river; the bare name as Nile; nameOkIn for the river themes (reviewer)');
mergeInto(36861, 'Caspian Sea', 63268, 'Caspian', 'synonym', 3, 'the same sea, a second root made for Asian waters', { del: 'Caspian [pony] keeps the text; the sea needs no second spelling of its short name' });
mergeInto(37349, 'Temple of Hatshepsut', 65610, 'Hatshepsut', 'synonym', 4, 'a second root of the temple made for famous temples (the person Hatshepsut keeps the text): the temple takes the link, shown "Hatshepsut"', { del: 'its text is the pharaoh\'s name', keepShow: true });
mergeInto(34327, 'Golden Temple', 63304, 'Harmandir Sahib', 'translation', 5, 'the Punjabi name of the Golden Temple (famous temples\' note names "Golden Temple"); translation, so the game does not show it (fam 5) as the synonym alternative');
{ const g = E(34327); if (g.show?.famous_temples) { setShow(g, 'famous_temples', null, 'the temple\'s everyday name, in full'); nameOk(g, 'famous_temples', 'its name holds the word, as Temple of Heaven'); } }
mergeInto(6659, 'Great Pyramid', 37205, 'Great Pyramid of Giza', 'synonym', 1, 'the same pyramid (Seven Ancient Wonders\' note: "Great Pyramid of Giza (Great Pyramid)")');
mergeInto(37118, 'Great Sphinx', 2357, 'Sphinx', 'synonym', 2, 'the same monument at Giza (Sphinx [Giza] was in landmarks, ancient Egypt and Egyptian symbols): its synonym; also clears two contract-dup-root hits (sphinx after Sphinx)', { gloss: 'Giza' });
{ const gs = E(37118); if (gs.show?.egyptian_symbols === 'sphinx') setShow(gs, 'egyptian_symbols', 'Sphinx', "a shown text keeps the root's capital (the show came from Sphinx [Giza])"); }
mergeInto(2324, 'Leaning Tower of Pisa', 2323, 'Tower of Pisa', 'synonym', 1, 'the same tower, linked only in landmarks and grouped with it; nameOkIn for famous towers (reviewer)');
mergeInto(2373, 'Neuschwanstein Castle', 2372, 'Neuschwanstein', 'synonym', 3, 'the same castle, linked only in landmarks and grouped with it');
mergeInto(37881, 'Line of Control', 63862, 'LoC', 'abbreviation', 4, 'the abbreviation of the Line of Control (grouped with it; both were in lines on a map, where Line of Control keeps its link and full name)');
mergeInto(35180, 'mail bag', 38225, 'mailbag', 'spelling', 3, 'one word written open and closed, both in post office (the open form shows "mail" in ___ bag)');
mergeInto(48547, 'tepee', 48535, 'teepee', 'spelling', 3, 'one word, two spellings, both in tent types (Merriam-Webster: tepee, also teepee)');
setE(E(48547), 'fam', 3, 'as teepee (tepee was 4)');

// =================================================================================================
sec('3. Wrong senses');
const L = split(29892, 'Lincoln', 'England', 'Nebraska', { type: 'place', fam: 3 }, ['us_state_capitals', 'places_named_after_people', 'us_cities'], 'Lincoln, Nebraska (named after Abraham Lincoln), the state capital; the old entry is the English city');
split(36048, 'Dover', 'England', 'Delaware', { type: 'place', fam: 4 }, ['us_state_capitals'], 'the capital of Delaware; the old entry is the English port');
split(36057, 'Charleston', 'South Carolina', 'West Virginia', { type: 'place', fam: 4 }, ['us_state_capitals'], 'the capital of West Virginia; the old entry is the South Carolina port');
split(35946, 'Hamilton', 'Ontario', 'New Zealand', { type: 'place', fam: 4 }, ['new_zealand_cities', 'oceanian_cities'], 'the New Zealand city; the old entry is Hamilton, Ontario');
split(56863, 'Newcastle', 'England', 'Australia', { type: 'place', fam: 4 }, ['australian_cities'], 'Newcastle, New South Wales; the old entry is the English city');
split(35959, 'Kingston', 'Ontario', 'Jamaica', { type: 'place', fam: 3 }, ['american_capitals'], 'the capital of Jamaica; the old entry is Kingston, Ontario');
setE(chk(56798, 'cordoba'), 'gloss', 'currency', 'its text is now shared with the plain spellings of Córdoba');
{ const c = split(35975, 'Córdoba', 'Spain', 'Argentina', { type: 'place', fam: 4 }, ['south_american_cities'], 'the Argentine city; the old entry is the Spanish city');
  for (const [root, gl] of [[35975, 'Spain'], [c?.id, 'Argentina']]) if (root) newEntry('Cordoba', gl, { aliasOf: root, aliasKind: 'spelling', region: [], pos: 'noun', type: 'place', fam: E(root).fam }, 'the plain form, kept as a spelling (rule 8)'); }
split(22853, 'Hanover', 'royal house', 'city', { type: 'place', fam: 3 }, ['german_cities'], 'the German city; the old entry is the royal house');
split(12769, 'Cannes', 'film festival', 'city', { type: 'place', fam: 2 }, ['french_cities'], 'the French city; the old entry is the film festival');
split(12777, 'Busan', 'film festival', 'city', { type: 'place', fam: 4 }, ['asian_cities', 'port_cities', 'ports_in_asia'], 'the Korean port city (fam 4); the old entry is the film festival');
{ const nm = chk(6829, 'Normandy');
  split(6829, 'Normandy', 'region', 'battle', { type: 'proper', fam: 2, adult: true, sensitive: true }, ['wars_and_battles', 'famous_battles', 'world_war_ii_battles'], 'the 1944 Battle of Normandy (D-Day), adult and sensitive as war; the old entry is the French region');
  if (!['wars_and_battles', 'famous_battles', 'world_war_ii_battles'].some(t => nm.typ[t] !== undefined)) { setE(nm, 'adult', false, 'the region: the war flags go with the battle sense'); setE(nm, 'sensitive', false, 'the region: the war flags go with the battle sense'); } }
split(36576, 'Cyprus', 'island', 'country', { type: 'place', fam: 2 }, ['european_countries', 'island_nations', 'tiny_countries', 'middle_eastern_countries'], 'the country, as Malta, Fiji and Mauritius have country and island entries; the island keeps famous islands and Mediterranean islands');
split(57233, 'bangka', 'boat', 'island', { type: 'place', fam: 5 }, ['indonesian_islands'], 'the Indonesian island Bangka; the old entry is the Philippine boat');
{ const b = (ix.byText.get('bangka') || []).find(x => x.gloss === 'island'); if (b && b.text === 'bangka') retext(b.id, 'bangka', 'Bangka', null, 'an island is a proper noun'); }
{ const bi = chk(63166, 'Baffin');
  if (bi.typ.gulfs_and_bays !== undefined) { const bb = newEntry('Baffin Bay', '', { pos: 'noun', type: 'place', fam: 4 }, 'Baffin Bay (the old entry is Baffin Island, in famous islands); a full name shown short, as Hudson Bay (reviewer)');
    swap('gulfs_and_bays', bi, bb, 'the bay', { show: 'Baffin' }); } }
split(25901, 'Altai', 'language', 'mountains', { type: 'place', fam: 4 }, ['mountain_ranges'], 'the Altai Mountains; the old entry is the Turkic language');
split(20207, 'Neapolitan', 'ice cream', 'Naples', { type: 'proper', fam: 3 }, ['city_demonyms'], 'a person from Naples, as Florentine [of Florence]; the old entry is the ice cream');
split(36020, 'Gold Coast', 'city', 'colony', { type: 'place', fam: 3 }, ['old_country_names'], 'the old name of Ghana; the old entry is the Queensland city');
// Broadway leaves street names with the other famous streets (section 4)
swap('swimming_pool', chk(24786, 'goggles'), chk(48808, 'goggles'), 'swimming goggles (sense-twin)');
swap('pacific_islands', chk(35766, 'Fiji'), chk(36586, 'Fiji'), 'the island group (sense-twin; Fiji [country] stays in island nations and Oceanian countries)');
{ const h = chk(59399, 'Hastings'); setE(h, 'adult', false, 'the New Zealand city, not the battle (flags copied from Hastings [battle])'); setE(h, 'sensitive', false, 'the New Zealand city, not the battle'); }
out('north_american_rivers', [[31943, 'Yellowstone'], [57043, 'Sacramento']], 'the park / the city entry, not the river (the theme has 38 rivers)');
out('pacific_islands', [[24468, 'bikini']], 'the swimsuit, not Bikini Atoll');
out('famous_parks', [[30774, 'English garden']], 'the garden style, not Munich\'s Englischer Garten');
out('places_that_are_also_words', [[2157, 'Cuba'], [20971, 'Eyam']], 'not an English word or a homophone of one');

// =================================================================================================
sec('4. Belonging');
out('western_european_countries', [[60511, E(60511).text]], 'a British territory, not a country (stays in straits and canals)');
{ const d = chk(60518, 'DR Congo'); if (d.typ.southern_african_countries !== undefined) { linkE(d, 'central_african_lands', 2, 'the largest Central African country, missing from the theme'); out('southern_african_countries', [[60518, 'DR Congo']], 'Central Africa (now in Central African nations)'); } }
delStub(60514, 'Kurdistan', 'middle_eastern_countries', 'a region, not a country');
{ const ra = P.entries.find(a => a.aliasOf === 60515 && a.text === 'Reunion'); if (ra) delAlias(ra.id, 'Reunion', 60515, 'the plain spelling of Réunion, which goes'); }
delStub(60515, 'Réunion', 'east_african_countries', 'a French overseas department, not a country');
delStub(60516, 'Mayotte', 'east_african_countries', 'a French overseas department, not a country');
delStub(60512, 'Gaza Strip', 'middle_eastern_countries', 'a territory, not a country; Palestine (sensitive) stays (Simon, 2026-11-23)');
delStub(60513, 'West Bank', 'middle_eastern_countries', 'a territory, not a country; Palestine (sensitive) stays (Simon, 2026-11-23)');
delStub(60517, 'Somaliland', 'east_african_countries', 'an unrecognised state, not a country of the list (Simon, 2026-11-23)');
setE(chk(56834, 'Palestine'), 'sensitive', true, 'politics (Simon, 2026-11-23)');
setE(chk(6874, 'Pompeii'), 'sensitive', false, 'an ancient city: not religion, politics or death in the narrow v417 sense (Simon, 2026-11-23)');
setE(chk(4111, 'server'), 'region', [], 'stays a root apart from waiter (v413); the US tag goes (Simon, 2026-11-23)');
setT('central_african_lands', 'note', 'Central African Republic is left out: its name is over the 20-letter limit (Simon, 2026-11-23)', 'why the obvious member is missing');
out('wine_regions', [[19671, 'Chablis'], [19672, 'Barolo']], 'the wine entry, not the region (rule 9: a wine and its region are separate entries; the wine themes keep them)');
out('flags_with_crosses', [[32063, 'Greenland']], 'its flag has a disc, no cross');
out('red_and_white_flags', [[37968, 'Trinidad']], 'the flag of Trinidad and Tobago is red, black and white');
out('flags_with_a_sun', [[35769, 'Palau']], 'the disc on its flag is the moon');
delStub(63868, 'Vergina Star', 'flags_with_a_sun', 'an ancient emblem, not a national flag');
delStub(60554, 'Vergina Sun', 'flags_with_a_sun', 'an ancient emblem, not a national flag');
out('tricolor_flags', [[2163, 'Austria'], [2158, 'Peru'], [2177, 'Nigeria']], 'a two-color triband, not a tricolor');
out('flags_with_animals', [[48, 'Scotland'], [35676, 'Lithuania']], 'the national flag has no animal (Scotland\'s is the saltire, the lion rampant is the royal banner; Lithuania\'s is a plain tricolor)');
if (E(36160).typ.flags_with_animals !== undefined && E(60556).typ.flags_with_animals !== undefined) addToGroup('flags_with_animals', [36160, 60556], 'California\'s flag is the Bear Flag: one answer');
out('places_ending_in_land', [[2180, 'Siam']], 'does not end in "land"');
out('countries_ending_in_ia', [[37855, 'Arabia']], 'a region, not a country (Saudi Arabia is in the theme)');
out('places_named_after_people', [[2282, 'Saigon'], [2221, 'Big Apple']], 'not named after a person (Ho Chi Minh City and New York are)');
delStub(62622, 'Durand', 'lines_on_a_map', 'a bare person stub for the Durand Line (LIBRARY-RULES 5: never a bare stub)');
delStub(62623, 'Radcliffe', 'lines_on_a_map', 'a bare person stub for the Radcliffe Line');
out('kinds_of_maps', [[2418, 'Google Maps']], 'an app, not a kind of map (stays in maps and globes)');
{ const au = chk(37812, 'Australia'); linkE(au, 'continents', 1, 'the seven-continent list most people learn names Australia; grouped with Oceania as one item');
  addToGroup('continents', [37815, 37812], 'Oceania and Australia, one continent');
  rate(chk(37815, 'Oceania'), 'continents', 2, 'a member of a complete set is never 4-5 just for being named later');
  setT('continents', 'note', 'Africa, Antarctica, Asia, Europe, North America, Oceania (Australia), South America', 'Australia, the usual name of the continent, as the alternative'); }
retext(57497, 'indoor indoor fountain', 'indoor fountain', null, 'the word was typed twice');
setE(chk(28439, 'street'), 'fam', 1, 'every child knows it (typicality 1 in road types)');
out('police_station', [[1439, 'doggo']], 'internet slang for a dog (police dog is in the theme)');
out('vet_clinic', [[50004, 'silicon chip']], 'the computer part, not the pet microchip (microchip is in the theme)');
out('hospital', [[3506, 'hospice']], 'a separate place of care, not part of a hospital');
out('public_buildings', [[23134, 'toilet']], 'the fixture, not a building');
out('street_furniture', [[35174, 'mail slot']], 'a slot in a door, not street furniture (stays in post office)');
out('swimming_pool', [[50008, 'safety glasses']], 'safety eyewear, not swimming goggles');
out('art_gallery', [[2472, 'museum']], 'another place, not a thing in a gallery');
out('builders_tools', [[7248, 'theodolite']], 'a surveyor\'s instrument (stays in construction site)');
out('dentist_s_office', [[4799, 'drill'], [57567, 'probe']], 'dental drill and dental probe are in the theme (drill [tool] is the power tool, probe the space probe)');
addToGroup('dentist_s_office', [15434, 57569], 'tooth extraction and extraction, one answer');
{ const s = chk(2465, 'school'); if (s.typ.ski_resort !== undefined) swap('ski_resort', s, chk(43555, 'ski school'), 'the ski school (school [building] is the building)', { nameOk: true }); }
{ const p = chk(4215, 'patrol'); if (p.typ.ski_resort !== undefined) swap('ski_resort', p, chk(43542, 'ski patrol'), 'the ski patrol (patrol is the police and military sense)', { nameOk: true }); }
out('middle_eastern_buildings', [[2360, 'Alhambra']], 'in Spain, not the Middle East');
out('national_costumes', [[38553, 'gaucho']], 'a person, not a costume (bombachas is in the theme)');
// towers and skyscrapers: "kinds of tower" (its note); the named towers are in famous towers or famous buildings
linkE(chk(38283, 'Shard'), 'famous_towers', 3, 'London\'s tallest building, from towers and skyscrapers (its only theme)');
out('towers_and_skyscrapers', [[2314, 'Big Ben'], [2328, 'Empire State Building'], [2337, 'Burj Khalifa'], [56924, 'Pisa'], [37041, 'Chrysler Building'], [2370, 'CN Tower'], [38283, 'Shard'], [2367, 'Space Needle'],
  [37092, 'Shanghai Tower'], [37043, 'Taipei 101'], [37090, 'Tokyo Skytree'], [37050, 'Willis Tower']], 'a named tower or skyscraper in a theme of kinds of tower (its note); it stays in famous towers or famous buildings');
delStub(62559, 'Eiffel', 'towers_and_skyscrapers', 'a bare stub of Eiffel Tower (famous towers shows Eiffel Tower as "Eiffel")');
delStub(62564, 'Petronas', 'towers_and_skyscrapers', 'a bare stub of Petronas Towers (famous towers shows it as "Petronas")');
// famous towers: bare stubs become the full names, shown short as the other towers are
{ const b = ix.entry.get(62565); if (b) { linkE(chk(20525, 'Tower of Babel'), 'famous_towers', b.typ.famous_towers, 'the full name of the stub Babel (sensitive, as the stub was)', { show: 'Babel' }); delStub(62565, 'Babel', 'famous_towers', 'a bare stub of Tower of Babel'); } }
for (const [id, from, to, sh] of [[62558, 'Belem', 'Belem Tower', 'Belem'], [62563, 'Ostankino', 'Ostankino Tower', 'Ostankino'], [62557, 'Azadi', 'Azadi Tower', 'Azadi'], [62561, 'Jin Mao', 'Jin Mao Tower', 'Jin Mao']]) {
  const e = retext(id, from, to, 'place', 'a bare stub becomes the full name (LIBRARY-RULES 5), shown short as Eiffel Tower is');
  setShow(e, 'famous_towers', sh, 'the short name, as the other towers');
}

// =================================================================================================
sec('4b. Bare stubs in the water and street themes become full names, shown short (reviewer; LIBRARY-RULES 5: never a bare stub)');
// stubTo: the full-name entry takes the stub's link (an existing entry, or the stub retexted in place), shown short as Hudson Bay is
const stubTo = (tid, id, text, full, show, fullId) => {
  if (fullId) { const s = ix.entry.get(id); if (!s) return; const f = chk(fullId, full);
    if (s.typ[tid] !== undefined) { linkE(f, tid, s.typ[tid], `the full name of the stub ${text}`, show ? { show } : {}); unlinkE(chk(id, text), tid, `a bare stub: ${full} takes the link`); }
    if (!linkIds(P, E(id)).length) delE(id, text, `a bare stub of ${full}, in no theme now`); return; }
  const e = E(id); if (e.text === full) return;
  retext(id, text, full, 'place', `a bare stub becomes the full name ${full}`);
  if (e.gloss && !(ix.byText.get(full.toLowerCase()) || []).some(x => x !== e && !x.aliasOf && x.text === full)) setE(e, 'gloss', '', 'the full name needs no gloss');
  if (show && show !== full) setShow(e, tid, show, 'the short name, as the theme shows the others');
  for (const t of linkIds(P, e)) if (t !== tid && leakOf(e, t)) nameOk(e, t, 'the full name holds the word, as the other members there');
};
for (const [id, text, full, show, fullId] of [[63251, 'Mexico', 'Gulf of Mexico', 'Mexico'], [63241, 'Bengal', 'Bay of Bengal', 'Bengal'], [63242, 'Biscay', 'Bay of Biscay', 'Biscay'],
  [63246, 'Chesapeake', 'Chesapeake Bay', 'Chesapeake'], [63253, 'Halong', 'Halong Bay', 'Halong'], [63243, 'Fundy', 'Bay of Fundy', 'Fundy', 36961], [63255, 'Montego', 'Montego Bay', 'Montego'],
  [63256, 'Monterey', 'Monterey Bay', 'Monterey'], [63248, 'Aqaba', 'Gulf of Aqaba', 'Aqaba'], [63245, 'Biscayne', 'Biscayne Bay', 'Biscayne'], [63249, 'Bothnia', 'Gulf of Bothnia', 'Bothnia'],
  [63250, 'Carpentaria', 'Gulf of Carpentaria', 'Carpentaria'], [63247, 'Guanabara', 'Guanabara Bay', 'Guanabara'], [63257, 'Morecambe', 'Morecambe Bay', 'Morecambe'], [63252, 'Tonkin', 'Gulf of Tonkin', 'Tonkin'],
  [63259, 'Walvis', 'Walvis Bay', 'Walvis'], [63254, 'Jervis', 'Jervis Bay', 'Jervis'], [63244, 'Kotor', 'Bay of Kotor', 'Kotor'], [63258, 'Moreton', 'Moreton Bay', 'Moreton']])
  stubTo('gulfs_and_bays', id, text, full, show, fullId);
for (const [id, text, full, show, fullId] of [[62660, 'Panama', 'Panama Canal', 'Panama'], [62662, 'Suez', 'Suez Canal', 'Suez', 36908], [60511, 'Gibraltar', 'Strait of Gibraltar', 'Gibraltar'],
  [63230, 'Bering', 'Bering Strait', 'Bering'], [63234, 'Hormuz', 'Strait of Hormuz', 'Hormuz'], [63236, 'Malacca', 'Strait of Malacca', 'Malacca', 21270], [63235, 'Magellan', 'Strait of Magellan', 'Magellan'],
  [62657, 'Corinth', 'Corinth Canal', 'Corinth', 36920], [62659, 'Kiel', 'Kiel Canal', 'Kiel'], [63231, 'Menai', 'Menai Strait', 'Menai'], [63238, 'Torres', 'Torres Strait', 'Torres'],
  [62661, 'Rideau', 'Rideau Canal', 'Rideau', 36927], [63233, 'Bonifacio', 'Strait of Bonifacio', 'Bonifacio'], [63232, 'Palk', 'Palk Strait', 'Palk'], [63237, 'Sunda', 'Sunda Strait', 'Sunda'], [63239, 'Tsushima', 'Tsushima Strait', 'Tsushima']])
  stubTo('straits_and_canals', id, text, full, show, fullId);
for (const [id, text, full, show] of [[63175, 'Gaspé', 'Gaspé Peninsula', 'Gaspé'], [63177, 'Kenai', 'Kenai Peninsula', 'Kenai'], [63178, 'Shandong', 'Shandong Peninsula', 'Shandong'], [63179, 'Yorke', 'Yorke Peninsula', 'Yorke']])
  stubTo('peninsulas', id, text, full, show);
{ const g = P.entries.find(a => a.aliasOf === 63175 && a.text === 'Gaspe'); if (g) { g.text = 'Gaspe Peninsula'; n++; reindex(P); A.push('text: Gaspe 63175 alias -> "Gaspe Peninsula": the plain spelling follows its root (rule 8)'); } }
for (const [id, text, keep] of [[63176, 'Iberian', 'Iberia'], [63174, 'Balkan', 'Balkans']]) if (ix.entry.get(id)) { unlinkE(chk(id, text), 'peninsulas', `a bare stub of the ${text} Peninsula; ${keep} is in the theme (they were grouped)`); delE(id, text, 'a stub made for peninsulas only; in no theme now'); }
// famous streets: Downing Street and Wall Street take the stubs' links; three more stubs become full names
stubTo('famous_streets', 62636, 'Downing', 'Downing Street', 'Downing', 33602);
stubTo('famous_streets', 62641, 'Wall', 'Wall Street', 'Wall', 34068);
setE(chk(33602, 'Downing Street'), 'type', 'place', 'a street is a place, as the other famous streets');
for (const [id, text, full, show] of [[62596, 'Carnaby', 'Carnaby Street', 'Carnaby'], [62597, 'Lombard', 'Lombard Street', 'Lombard'], [62595, 'Bleecker', 'Bleecker Street', 'Bleecker']])
  stubTo('famous_streets', id, text, full, show);
// street names is for common street names (its note: Main, High, Church, Elm, Park, Station, Mill); the famous streets are in famous streets
out('street_names', [[12388, 'Broadway'], [37253, 'Fifth Avenue'], [37262, 'Park Avenue'], [37256, 'Abbey Road'], [37257, 'Baker Street'], [33602, 'Downing Street'], [37265, 'Penny Lane'],
  [37260, 'Sunset Boulevard'], [34068, 'Wall Street'], [37277, 'Orchard Road'], [37268, 'Bourbon Street'], [37272, 'Fleet Street']], 'a famous street, not a common street name (it is in famous streets; reviewer)');

// =================================================================================================
sec('4c. Seven Ancient Wonders as an exact set: one root per wonder, the other names its aliases (reviewer)');
mergeInto(37211, 'Alexandria Lighthouse', 37210, 'Pharos of Alexandria', 'synonym', 4, 'the same lighthouse (grouped in both wonders themes); its alias Pharos moves with it');
mergeInto(37129, 'Statue of Zeus', 60561, 'Zeus at Olympia', 'synonym', 5, 'the same statue (grouped in three themes), a stand-in made for the set', { del: 'as the only synonym alias (fam 5) the game would show it as the alternative of Statue of Zeus (fam 3)' });
mergeInto(37119, 'Colossus of Rhodes', 60559, 'Colossus', 'abbreviation', 3, 'the short name of the same statue (grouped in three themes)');
mergeInto(37208, 'Temple of Artemis', 37209, 'Temple of Diana', 'synonym', 4, 'the same temple under its Roman name (grouped in three themes)');
mergeInto(6653, 'Hanging Gardens', 60560, 'Gardens of Babylon', 'synonym', 3, 'the same gardens (grouped in five themes)');
mergeInto(37213, 'Mausoleum of Mausolus', 37214, 'Tomb of Mausolus', 'synonym', 4, 'the same tomb (grouped with it in wonders of the world)');
setT('seven_wonders_of_the_ancient_world', 'note', 'Great Pyramid of Giza (Great Pyramid), Hanging Gardens of Babylon (Hanging Gardens), Statue of Zeus, Temple of Artemis, Mausoleum of Mausolus (Tomb of Mausolus), Colossus of Rhodes, Lighthouse of Alexandria (Alexandria Lighthouse)', 'one item per root after the merges');

// =================================================================================================
sec('5. Case, type, spelling and aliases');
{ const w = retext(33580, 'white house', 'White House', 'place', 'the president\'s house is a proper noun');
  if (w.show?.blank_house === 'white') setShow(w, 'blank_house', 'White', 'keeps the root\'s capital'); }
setE(chk(38139, 'Normal'), 'gloss', 'Illinois', 'the town of Normal, Illinois (the gloss said ordinary)');
setE(chk(6657, 'Terracotta Army'), 'type', 'proper', 'an army of statues, not an organisation');
setE(chk(6766, 'Jolly Roger'), 'type', 'proper', 'a flag, not a person');
{ const lb = chk(36859, 'Lake Biwa'); if (lb.show?.famous_lakes === 'biwa') setShow(lb, 'famous_lakes', 'Biwa', 'the shown text keeps the capital'); }
{ const nw = retext(36402, 'Nordrhein-Westfalen', 'North Rhine-Westphalia', null, 'the English name, as Bavaria and Lower Saxony');
  newEntry('Nordrhein-Westfalen', '', { aliasOf: nw.id, aliasKind: 'translation', region: ['DE'], pos: 'noun', type: 'place', fam: 5 }, 'the German name');
  const t = T('german_states'); if (t.note.includes('Nordrhein-Westfalen')) setT('german_states', 'note', t.note.replace('Nordrhein-Westfalen', 'North Rhine-Westphalia'), 'the member\'s English name'); }
setE(chk(56262, 'Vladimir'), 'fam', 4, 'the city, not the name (Kazan and Omsk are 4)');
setE(chk(3132, 'combine harvester'), 'aliasKind', 'synonym', 'the full name of the combine, not a spelling of it (alias-kind-suspect)');
setE(chk(5400, 'tae kwon do'), 'type', 'common', 'a spelling alias takes its root\'s type (alias-kind-suspect)');
// type phrase is for idioms and set phrases (LIBRARY-RULES 4): names of things in the group's themes become common
{ const keep = new Set([67329, 67331, 67340, 67333, 67338, 67332, 67339, 67337, 20036, 11216, 955, 20037, 20041, 20034]);   // activities (fly a kite) and set phrases (on the house, a la carte)
  const ids = [...new Set(groupThemes().flatMap(t => (ix.byTheme.get(t) || []).filter(e => !e.aliasOf && e.typ[t] !== undefined && e.type === 'phrase').map(e => e.id)))];
  for (const id of ids) { const e = E(id); if (keep.has(id) || /^[A-Z]/.test(e.text)) continue;
    for (const a of P.entries.filter(a => a.aliasOf === id && ['spelling', 'form'].includes(a.aliasKind) && a.type === 'phrase')) setE(a, 'type', 'common', 'a spelling or form alias takes its root\'s type');
    setE(e, 'type', 'common', 'the name of a thing, not an idiom: type phrase is for idioms and set phrases (LIBRARY-RULES 4)'); } }

// =================================================================================================
sec('6. Shown texts');
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');
// aliases whose text holds a word of a theme name where their root is linked get nameOkIn there (as v435 for the Galapagos penguin; reviewer)
for (const a of P.entries.filter(a => a.aliasOf)) { const r = ix.entry.get(a.aliasOf); if (!r) continue;
  const need = linkIds(P, r).filter(t => ix.theme.has(t) && inGroup(t) && leakOf({ ...a, nameOkIn: [] }, t));
  const add = need.filter(t => !(a.nameOkIn || []).includes(t)); if (!add.length) continue;
  a.nameOkIn = [...(a.nameOkIn || []), ...add]; n++; reindex(P); A.push(`${lab(a)} (alias of ${lab(r)}): nameOkIn ${add.join(', ')}: its text holds a word of the theme name, as the root's`); }

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
const summary = [`Library batch v437: tidy-up step 3, Places & Geography (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch437-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch437-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch437-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

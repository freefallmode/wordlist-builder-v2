// Library batch v445: tidy-up step 3 (TIDY-UP.md), the Science & Tech group: every theme under science_tech read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v442 (main). Applied after v443/v444 (Arts & Entertainment,
// History & Myth): everything here works by entry id + text and theme id, never by position, and every step is skipped when it is already
// done or when another batch has already made the merge (rerun: 0 changes).
//   1. Tree and twins: statistics terms, parts of an experiment, experiment glassware, load-bearing supports, length measuring tools deleted
//      (twins); lab protective equipment merged into lab safety gear, old ways to keep in touch into old ways to communicate (People & Society);
//      alkali and alkaline earths (Nature & Earth) deleted as the union of the two complete sets; four themes renamed.
//   2. Belonging and X-words twins (life cycle words, nuclear words / nuclear power plant, spaceflight words / launch pad).
//   3. Regional roots (region-root-equiv): saltpeter, squillion, sidewalk; emulsion split.
//   4. Two roots of one sense: people (full name the root, surname its first synonym: LIBRARY-RULES 5), and about 35 things (KB, hard disk, USB stick, chip, PCB, paraffin ...).
//   5. Wrong senses (Perseus, thou, click, drag, ping, prompt, inheritance, coat, glasses, hatch ...). 6. Kinds of engineers (new theme).
//   7. Case, types, ratings, alias kinds. 8. The first synonym alias of every root (game flag 512).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch445.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const GROUP = 'science_tech';
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

const unlinkE = (e, tid, why) => {
  if (!ix.theme.has(tid)) return false;
  if (e.typ[tid] === undefined) return false;
  unlinkEntry(P, e, tid); n++; reindex(P); touchedT.add(tid);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`out of ${tid}: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why} (${where(e)})`);
  return true;
};
const out = (tid, list, why) => { for (const [id, text] of list) { if (ix.entry.get(id)) unlinkE(chk(id, text), tid, why); } };
// Link e in tid. A full term that contains a word of the theme name needs `show` (a short text) or `nameOk` (the full name is the member).
const linkE = (e, tid, typ, why, x = {}) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return false;
  e.typ[tid] = typ; n++; touchedT.add(tid); alone.delete(e.id);
  if (x.show) e.show = { ...(e.show || {}), [tid]: x.show };
  if (x.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  const leak = leakOf(e, tid); if (leak && !(e.nameOkIn || []).includes(tid)) throw Error(`${lab(e)} in ${tid}: "${leak}" of the theme name: give a show or nameOk`);
  A.push(`linked: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''} in ${tid} (typicality ${typ}${x.show ? `, shown "${x.show}"` : ''}${x.nameOk ? ', nameOkIn: the full name contains a word of the theme name' : ''}): ${why}`);
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
const moveT = (tid, target, where, why) => {
  const t = T(tid), want = where === 'in' ? target : T(target).parent;
  if (t.parent === want) return false;
  const from = t.parent; if (!placeTheme(P, tid, target, where)) throw Error('place ' + tid); reindex(P); n++; counts.moved++;
  A.push(`theme ${tid} "${t.name}" moves from ${from} to ${want}${where !== 'in' ? ` (${where} ${target})` : ''}: ${why}`); return true;
};
const setShow = (e, tid, s, why) => {
  const cur = e.show?.[tid] || null; if (cur === s) return;
  if (s) e.show = { ...(e.show || {}), [tid]: s }; else { e.show = { ...e.show }; delete e.show[tid]; }
  A.push(`${lab(e)} in ${tid}: shown ${JSON.stringify(cur)} -> ${JSON.stringify(s)}: ${why}`); n++; touchedT.add(tid);
};
const rate = (e, tid, typ, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++; touchedT.add(tid);
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
// A theme's link moves from a wrong-sense entry (or a stub) to the right one (same typicality unless given; group places follow; show given or none).
const swap = (tid, fromE, toE, why, x = {}) => {
  if (!ix.theme.has(tid) || fromE.typ[tid] === undefined) return;
  const typ = x.typ ?? fromE.typ[tid];
  const gs = (T(tid).groups || []).filter(g => g.includes(fromE.id)).map(g => [...g]);
  if (toE.typ[tid] === undefined) linkE(toE, tid, typ, why, x);
  unlinkE(fromE, tid, x.outWhy || `wrong sense: ${lab(toE)}${toE.gloss ? ' [' + toE.gloss + ']' : ''} takes the link`);
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
// its kin and aliases move; then gone is deleted (same text, or o.del) or becomes keep's alias of `kind` in place (id kept).
// Skipped when another batch has already made the merge, in either direction.
const mergeInto = (keepId, keepText, goneId, goneText, kind, fam, why, o = {}) => {
  const gone = ix.entry.get(goneId), keep0 = ix.entry.get(keepId);
  if (!gone || !keep0) { A.push(`  (skipped: ${goneText} ${goneId} into ${keepText} ${keepId}: ${!gone ? goneText : keepText} is gone already)`); return; }
  if (gone.aliasOf === keepId) return;
  if (keep0.aliasOf === goneId || gone.aliasOf) { A.push(`  (skipped: ${goneText} ${goneId} into ${keepText} ${keepId}: another batch has merged them already)`); return; }
  const keep = chk(keepId, keepText); chk(goneId, goneText);
  if (keep.aliasOf) throw Error(`${keepText}: an alias`);
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
  if (o.dropKin) for (const id of [...(gone.kin || [])]) { const k = ix.entry.get(id); if (k) { setKin(P, gone, k, false); A.push(`  kin ${lab(gone)} - ${lab(k)} dropped (a different word)`); } }
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
// A whole theme goes; every word must stay linked elsewhere.
const dropTheme = (tid, why) => {
  if (!ix.theme.has(tid)) return;
  const t = T(tid), ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined);
  const lost = ws.filter(e => linkIds(P, e).filter(x => x !== tid).length === 0);
  if (lost.length) throw Error(`${tid}: words that would be in no theme: ${lost.map(lab).join(', ')}`);
  if (t.note) A.push(`  (its note "${t.note}" goes with it)`);
  if (P.themes.some(x => x.parent === tid)) throw Error(`${tid} has sub-themes`);
  deleteTheme(P, tid); reindex(P); n++; counts.deletedThemes++;
  A.push(`deleted theme: ${tid} "${t.name}" (${ws.length} words, all still in other themes): ${why}`);
};
const retext = (id, from, to, why, x = {}) => {
  const e = E(id);
  if (e.text !== to) { chk(id, from); A.push(`text: ${lab(e)} -> "${to}": ${why}`); e.text = to; n++; reindex(P); }
  for (const f of ['type', 'pos', 'gloss', 'fam', 'tm']) if (x[f] !== undefined) setE(e, f, x[f], why);
  return e;
};

// ---------- helpers of this batch ----------
const delAlias = (id, text, why) => {
  const a = ix.entry.get(id); if (!a) return false; chk(id, text); if (!a.aliasOf) throw Error(`${lab(a)} is not an alias`);
  for (const x of P.entries) if (x.use) for (const [t, u] of Object.entries(x.use)) if (u === id) delete x.use[t];
  P.entries = P.entries.filter(x => x !== a); reindex(P); n++; deleted.push(lab(a));
  A.push(`deleted alias: ${lab(a)} (${a.aliasKind} of ${lab(E(a.aliasOf))}): ${why}`); return true;
};
const newAlias = (rootId, text, gloss, kind, fam, region, why) => {
  const r = E(rootId);
  return newEntry(text, gloss, { aliasOf: rootId, aliasKind: kind, fam, region, pos: r.pos, type: kind === 'spelling' ? r.type : (r.type === 'phrase' ? 'common' : r.type), adult: !!r.adult, sensitive: !!r.sensitive, offensive: !!r.offensive, tm: kind === 'spelling' ? !!r.tm : false }, why);
};
const setUse = (e, tid, aliasId, why) => {
  if (e.use?.[tid] === aliasId) return; if (e.typ[tid] === undefined) throw Error(`${lab(e)} not in ${tid}`);
  e.use = { ...(e.use || {}), [tid]: aliasId }; n++; touchedT.add(tid); A.push(`${lab(e)} in ${tid}: shows its form ${lab(E(aliasId))} (use): ${why}`);
};
const rename = (tid, name, why) => { if (setT(tid, 'name', name, why)) counts.renamed++; };
// A wrong sense in some themes: a new entry of the right sense takes those links (rerun: found by text + gloss).
const split = (oldId, oldText, tids, text, gloss, fields, why, oldGloss) => {
  const o = chk(oldId, oldText);
  if (tids.some(t => o.typ[t] !== undefined)) { const ne = newEntry(text, gloss, { pos: 'noun', type: 'common', ...fields }, why); for (const t of tids) swap(t, o, ne, why); }
  if (oldGloss && !o.gloss) setE(o, 'gloss', oldGloss, `its text is now shared with ${text} [${gloss}]`);
};
// surname or other name of one person: becomes an alias of the full-name root (as Riemann, Hilbert and Karpov are), links and group places move
const P2 = (k, kt, g, gt, kind, fam, why, o) => mergeInto(k, kt, g, gt, kind, fam, why, o), M = P2;

// =================================================================================================
sec('1. Twins and the tree');
dropTheme('statistics_terms', 'a twin: all 12 of its words are in its parent scientific method, 7 in statistics words (xwords-twin 100% and 58%); "statistics terms" beside "statistics words" was an X-words pair');
dropTheme('parts_of_an_experiment', 'a twin of scientific method (all 14 words there; theme-twin) and of scientific method steps; its words stay in scientific method and science fair');
// lab protective equipment (science places) = lab safety gear (chemistry): one theme
if (ix.theme.has('protective_equipment')) {
  linkE(chk(24458, 'safety goggles'), 'lab_safety_gear', 1, 'from lab protective equipment, merged into lab safety gear', { nameOk: true });
}
dropTheme('experiment_glassware', 'a twin of lab equipment (10 of 12 words; theme-twin) and of lab glassware, which hold all its words');
dropTheme('load_bearing_supports', 'a twin of bridge parts (8 of 9 words; theme-twin): beams, arches, girders, trusses and struts are there and in engineering');
dropTheme('instruments_for_measuring_length', 'a twin of measuring tools (Home & Everyday; all 8 words; theme-twin) and a subset of its parent measuring instruments, which holds them all');
if (ix.theme.has('old_ways_to_keep_in_touch')) {
  linkE(chk(25651, 'answering machine'), 'old_ways_to_communicate', 3, 'from old ways to keep in touch, merged into old ways to communicate');
  linkE(chk(35144, 'payphone'), 'old_ways_to_communicate', 3, 'from old ways to keep in touch, merged into old ways to communicate');
}
dropTheme('old_ways_to_keep_in_touch', 'the twin of old ways to communicate (People & Society) that Simon put on the step 3 merge list (TIDY-UP.md); its 11 devices stay in retro tech, answering machine and payphone join old ways to communicate');
dropTheme('alkali_and_alkaline_earth_elements', 'the TIDY-UP.md item "alkali and alkaline earths to Science & Tech": its 12 words are exactly the two complete sets alkali metals and alkaline earth metals (chemistry), so moved here it would be their twin; deleted instead, every word stays in both');
rename('quark_flavours', 'quark flavors', 'US spelling (LIBRARY-RULES 6)');
if (ix.theme.has('moon_phases_and_moods') && T('moon_phases_and_moods').tkind !== 'compound') {   // a compound theme: harvest moon, blue moon, full moon ...
  out('moon_phases_and_moods', [[41354, 'new'], [41358, 'waxing'], [41359, 'waning'], [41357, 'gibbous'], [41379, 'moonrise'], [41380, 'moonset'], [31429, 'earthshine'], [41382, 'terminator'], [41383, 'libration']],
    'not a ___ moon compound: a phase word or a moon term (phases of the moon is the complete set of phases)');
  for (const [id, text, typ] of [[41358, 'waxing', 3], [41359, 'waning', 3], [41357, 'gibbous', 4], [41382, 'terminator', 5], [41383, 'libration', 5]])
    if (!linkIds(P, chk(id, text)).length) linkE(E(id), 'astronomy_terms', typ, 'from moon phases and moods: an astronomy term of the moon');
  rename('moon_phases_and_moods', '___ moon', 'a compound theme of the moon names (harvest moon, blue moon, wolf moon, supermoon); "moods" fitted no member (reviewer)');
  setT('moon_phases_and_moods', 'tkind', 'compound', 'members combine with moon');
  setT('moon_phases_and_moods', 'rule', 'compound-end:moon', 'the game tests that each member ends with moon');
}
for (const e of (ix.byTheme.get('moon_phases_and_moods') || []).filter(e => !e.aliasOf && e.typ.moon_phases_and_moods !== undefined)) {
  const sh = { 41361: 'super', 41377: 'micro', 41381: 'super blood' }[e.id];
  if (sh && e.show?.moon_phases_and_moods !== sh) setShow(e, 'moon_phases_and_moods', sh, 'the short word, as in a compound theme');
  if (!(e.nameOkIn || []).includes('moon_phases_and_moods')) setE(e, 'nameOkIn', [...(e.nameOkIn || []), 'moon_phases_and_moods'], 'a compound member: the full term contains moon');
}
rename('islamic_golden_age_scholars', 'medieval Muslim scholars', 'shorter (27 -> 24 characters; reviewer)');
out('data_structures_and_types', [[42300, 'string'], [41505, 'integer'], [42301, 'boolean']], 'a data type, not a data structure (in coding words)');
rename('data_structures_and_types', 'data structures', 'shorter (25 -> 15 characters); string, integer and boolean (types) left it (reviewer)');
rename('science_experiments_for_kids', 'experiments for kids', 'shorter (28 -> 20 characters); the folder says science');

// =================================================================================================
sec('2. Belonging, X-words twins and overlaps');
out('life_cycle_words', [[41073, 'cygnet'], [8808, 'elver'], [10142, 'parr'], [10143, 'smolt'], [41059, 'fingerling'], [8430, 'fledgling'], [9195, 'hatchling']],
  'the young of one animal, in baby animals; life cycle words keeps the stages and processes (xwords-twin with baby animals 32%)');
swap('life_cycle_words', chk(518, 'egg'), chk(68162, 'egg'), 'the animal egg as a life stage (TIDY-UP.md: egg [food] in life cycle words)');
swap('life_cycle_words', chk(6922, 'nymph'), chk(10146, 'nymph'), 'the young insect, not the spirit of myth', { typ: 3 });
out('nuclear_words', [[38276, 'cooling tower'], [40816, 'fuel rod'], [40815, 'control rods']], 'a part of the plant, in nuclear power plant (xwords-twin 38%)');
out('nuclear_power_plant', [[40819, 'Chernobyl'], [40820, 'Fukushima'], [40821, 'Three Mile Island'], [40431, 'isotope']], 'an accident site or a physics word, not a thing at a nuclear power plant (in nuclear words; xwords-twin 38%)');
out('launch_pad', [[7115, 'astronaut'], [7116, 'spaceman'], [7117, 'cosmonaut'], [7118, 'taikonaut'], [41352, 'launch window'], [41333, 'mission control']],
  'a person, a time or a room far from the pad, in spaceflight words (xwords-twin 37%); launch pad keeps the things at the pad');
out('launch_pad', [[40167, 'ignition']], 'ignition [car start] is the car\'s ignition, not the rocket\'s');
out('statistics_words', [[7448, 'educated guess'], [7449, 'hunch']], 'a word for a guess, not a statistics word (in scientific method and science fair)');
out('math_tools', [[7219, 'stopwatch'], [327, 'spirit level']], 'a measuring tool, not a math tool (in measuring instruments and measuring tools)');
out('famous_stargazing_sites', [[7168, 'Hubble']], 'a telescope in orbit, not a site on Earth (in space missions and observatory)');
for (const t of ['inventions', 'european_inventions']) out(t, [[4576, 'idiot box'], [4577, 'small screen']], 'a nickname of television, not an invention (television is there)');
out('engines', [[50000, 'gasoline'], [40927, 'hybrid']], 'a fuel, or hybrid [cross-breed] (the plant or animal cross), not an engine');
out('machine_parts', [[23139, 'plunger']], 'plunger [tool] is the sink plunger, not a machine part');
out('volume_units', [[11146, 'half note']], 'half note is the musical note (its UK alias minim is also an old volume unit, but the root is the note; reviewer)');
out('accidental_inventions', [[895, 'brandy']], 'not an accidental invention (reviewer)');
out('computer_actions', [[41795, 'drop']], 'drop [unit] is a unit of volume (drag and drop is there)');
out('space_missions', [[4382, 'mariner']], 'mariner [sailor], not the Mariner space probes');
out('southern_sky', [[1254, 'dorado']], 'dorado [fish], not the constellation Dorado');
out('power_grid_words', [[37884, 'grid']], 'grid [map grid] is the grid on a map; national grid is the power grid');
out('bridge_parts', [[30127, 'hanger']], 'hanger [wood] is a wood on a hillside (UK), not the bridge hanger (suspender cable is there)');
out('science_lab', [[35663, 'stirrer'], [4508, 'composition book']], 'a coffee stirrer, or a school exercise book (lab notebook is the lab\'s)');
out('ai_words', [[47165, 'co-pilot']], 'co-pilot is the aircraft\'s second pilot, not Microsoft Copilot');
out('assistants_and_apps', [[47165, 'co-pilot']], 'co-pilot is the aircraft\'s second pilot, not Microsoft Copilot');
{ const d = ix.entry.get(66090); if (d && d.text === 'domotics') { unlinkE(d, 'smart_home', 'domotics (home automation) is the topic of smart home itself'); delAlias(49470, 'home automation', 'the alias of domotics, which goes'); delE(66090, 'domotics', 'a rare word for home automation, made for smart home; in no theme'); } }

// =================================================================================================
sec('3. Regional roots (region-root-equiv, contract-root-region)');
mergeInto(40530, 'potassium nitrate', 40531, 'saltpeter', 'synonym', 4, 'the common name of potassium nitrate (grouped as one answer in chemical compounds); not a US word: saltpetre is its UK spelling');
{ const s = ix.entry.get(40532); if (s && s.aliasKind === 'spelling') { setE(s, 'aliasKind', 'synonym', 'the UK spelling of saltpeter, another name of potassium nitrate, not a spelling of it (alias-kind-suspect)'); } }
mergeInto(41541, 'zillion', 41551, 'squillion', 'synonym', 3, 'the UK informal word for zillion (grouped as one answer in big numbers)', { region: ['UK'] });
setE(chk(38436, 'sidewalk'), 'region', [], 'the US root of a regional pair: untagged, as color is (v413); its UK word pavement is its regional alias (region-root-equiv in bridge parts)');
split(23756, 'emulsion', ['chemistry_words'], 'emulsion', 'chemistry', { fam: 3 }, 'a mixture of two liquids that do not blend (23756 is UK emulsion paint)', 'paint');

// =================================================================================================
sec('4. Two roots of one sense');
// people (LIBRARY-RULES 5, Aliases; Simon 2026-11-23, "Yes, full names"): the full name is the root, the surname its first synonym alias at the
// same familiarity; a person known by one name (Galileo, Avicenna) keeps it as root
const firstSyn = (rootId, aliasId, why) => {   // the alias goes first among the root's synonym aliases in row order (the game shows the first one)
  const a = ix.entry.get(aliasId); if (!a || a.aliasOf !== rootId || a.aliasKind !== 'synonym') return;
  const syn = P.entries.filter(x => x.aliasOf === rootId && x.aliasKind === 'synonym');
  if (syn[0] === a) return;
  P.entries = P.entries.filter(x => x !== a); P.entries.splice(P.entries.indexOf(syn[0]), 0, a); reindex(P); n++;
  A.push(`  ${lab(a)} moves before ${lab(syn[0])} in row order: the first synonym of ${lab(E(rootId))} is ${why}`);
};
const person = (k, kt, g, gt, why) => {
  const r = ix.entry.get(k), s = ix.entry.get(g); if (!r || !s) return mergeInto(k, kt, g, gt, 'synonym', 3, why);
  const f = Math.min(r.fam, s.fam);
  mergeInto(k, kt, g, gt, 'synonym', f, why);
  if (ix.entry.get(g)?.aliasOf === k) { setE(E(k), 'fam', f, 'the same familiarity as the surname (LIBRARY-RULES 5, people\'s names)'); setE(E(g), 'fam', f, 'the same familiarity as the full name'); firstSyn(k, g, 'his surname (flag 512)'); }
};
person(40887, 'Charles Darwin', 41018, 'Darwin', 'his surname as a second root (grouped): the surname becomes the first synonym of the full name (LIBRARY-RULES 5)');
for (const [k, kt, g, gt] of [[41927, 'Albert Einstein', 41928, 'Einstein'], [41932, 'Louis Pasteur', 41933, 'Pasteur'],
  [41950, 'Dmitri Mendeleev', 41951, 'Mendeleev'], [41962, 'Werner Heisenberg', 58213, 'Heisenberg'], [41947, 'Richard Feynman', 58210, 'Feynman'], [41935, 'Niels Bohr', 58211, 'Bohr'],
  [41936, 'Max Planck', 58212, 'Planck'], [41964, 'Ernest Rutherford', 58214, 'Rutherford'], [41992, 'Gottfried Leibniz', 41993, 'Leibniz'], [41994, 'René Descartes', 41995, 'Descartes'],
  [42023, 'Benoit Mandelbrot', 42024, 'Mandelbrot'], [41989, 'Pierre de Fermat', 41990, 'Fermat'], [42002, 'Srinivasa Ramanujan', 42003, 'Ramanujan'], [41986, 'Leonhard Euler', 41987, 'Euler'],
  [42011, 'Évariste Galois', 42012, 'Galois'], [42036, 'Omar Khayyam', 61995, 'Khayyam'], [58183, 'David Attenborough', 58184, 'Attenborough'], [40999, 'Carl Linnaeus', 40998, 'Linnaeus'],
  [12523, 'Wole Soyinka', 61993, 'Soyinka']])
  person(k, kt, g, gt, 'his surname as a second root (grouped): the surname becomes the first synonym of the full name (LIBRARY-RULES 5)');
mergeInto(41930, 'Galileo', 41929, 'Galileo Galilei', 'synonym', 2, 'his full name as a second root (grouped); Galileo is known by one name, so it stays the root (LIBRARY-RULES 5, the exception)');
for (const [k, kt, g, gt] of [[41981, 'Avicenna', 62225, 'Ibn Sina'], [41979, 'Ibn al-Haytham', 62226, 'Alhazen'], [58148, 'Averroes', 58149, 'Ibn Rushd'], [58146, 'Al-Razi', 58147, 'Rhazes'],
  [58151, 'Al-Zahrawi', 58152, 'Albucasis'], [58153, 'Jabir ibn Hayyan', 58154, 'Geber']]) {
  const g0 = ix.entry.get(g); mergeInto(k, kt, g, gt, 'synonym', g0?.fam ?? 5, 'his other name (Latin or Arabic), grouped as one answer');
}
setE(chk(41979, 'Ibn al-Haytham'), 'fam', 4, 'as well known as Alhazen, his Latin name (reviewer)');
{ const c = ix.entry.get(22955), r = ix.entry.get(41945); if (c && !c.aliasOf && r && r.text === 'Copernicus' && !r.aliasOf) mergeInto(41945, 'Copernicus', 22955, 'Copernicus', 'synonym', 3, 'Copernicus [Renaissance] is the same astronomer (renaissance takes the link)'); }
// surname roots flipped: the full name (an alias) becomes the root's text, the surname its first synonym (ids kept)
for (const [rid, sur, aid, full, gloss] of [[41938, 'Faraday', 41937, 'Michael Faraday', ''], [41943, 'Kepler', 41942, 'Johannes Kepler', 'scientist'], [41945, 'Copernicus', 41944, 'Nicolaus Copernicus', '']]) {
  const r = ix.entry.get(rid), a = ix.entry.get(aid);
  if (r && a && r.text === full && a.text === sur && a.aliasOf === rid) continue;   // done
  if (!r || !a || r.aliasOf || r.text !== sur || a.aliasOf !== rid || a.text !== full) { A.push(`  (skipped: ${sur} ${rid} / ${full} ${aid}: changed by another batch)`); continue; }
  retext(rid, sur, full, 'the full name is the root (LIBRARY-RULES 5, people\'s names; replaces v164 "shorter name is the root")');
  if (r.gloss) setE(r, 'gloss', '', 'the full name is unique');
  retext(aid, full, sur, 'the surname becomes the first synonym of the full name');
  setE(a, 'aliasKind', 'synonym', 'the surname alias (LIBRARY-RULES 5)'); setE(a, 'gloss', gloss, gloss ? 'its text is shared with another ' + sur : 'its text is unique');
  const f = Math.min(r.fam, a.fam); setE(r, 'fam', f, 'the same familiarity as the surname'); setE(a, 'fam', f, 'the same familiarity as the full name');
  firstSyn(rid, aid, 'his surname (flag 512)');
}
// surname aliases kept as abbreviations become synonyms (Riemann, Hilbert, Noether, Fourier, Laplace, Gödel, Poincaré, Erdős, Perelman, Roebling; Karpov)
for (const a of P.entries.filter(x => x.aliasOf && x.aliasKind === 'abbreviation' && x.type === 'person')) {
  const r = ix.entry.get(a.aliasOf); if (!r || r.type !== 'person') continue;
  if (!(a.id === 58864 || linkIds(P, r).some(inGroup))) continue;
  const last = r.text.split(' ').at(-1); if (a.text !== last || r.text === last) continue;
  setE(a, 'aliasKind', 'synonym', 'the surname is the first synonym alias of the full name (LIBRARY-RULES 5, people\'s names)');
  if (a.fam !== r.fam) setE(a, 'fam', r.fam, 'the same familiarity as the full name');
  firstSyn(r.id, a.id, 'the surname (flag 512)');
}
M(41390, 'Horsehead Nebula', 41391, 'Horsehead', 'abbreviation', 3, 'the short name of the same nebula (grouped)');
M(40409, 'microscope slide', 41079, 'slide', 'synonym', 1, 'slide [microscope] is the microscope slide', { dropKin: true, del: 'a bare short form; microscope parts shows microscope slide as "slide"' });
M(40399, 'graduated cylinder', 57973, 'measuring cylinder', 'regional', 3, 'the UK name of the graduated cylinder (lab glassware held both apart)', { region: ['UK'] });
M(15396, 'eyewash', 57984, 'eye wash', 'spelling', 3, 'one word written two ways (lab safety gear held eye wash, science lab eyewash)');
M(24451, 'lab coat', 64608, 'white coat', 'synonym', 2, 'the same lab garment (white coat [lab garment] in science lab, lab coat in work clothes)', { del: 'as an alias of lab coat (in white things) its text would repeat "white" (theme-name)' });
if (E(24451).typ.science_lab !== undefined) setShow(E(24451), 'science_lab', 'coat', 'the full term shown short ("lab" is in the theme name), as in lab equipment');
M(7193, 'scale', 49966, 'scales', 'synonym', 1, 'scales [lab] is the weighing scale', { dropKin: true, del: 'its text repeats the form alias scales of scale; science lab shows that form' });
if (E(7193).typ.science_lab !== undefined && !E(7193).use?.science_lab && ix.entry.get(38223)?.aliasOf === 7193) setUse(E(7193), 'science_lab', 38223, 'the lab has scales');
M(49322, 'kilobyte', 49333, 'KB', 'abbreviation', 2, 'the short form (grouped as one answer)');
M(49323, 'megabyte', 49334, 'MB', 'abbreviation', 2, 'the short form (grouped as one answer)');
M(49324, 'gigabyte', 49335, 'GB', 'abbreviation', 2, 'the short form (grouped as one answer)');
M(49325, 'terabyte', 49336, 'TB', 'abbreviation', 2, 'the short form (grouped as one answer)');
M(7304, 'hard drive', 42241, 'hard disk', 'synonym', 2, 'the same drive (grouped in three themes)');
M(42232, 'flash drive', 49344, 'USB stick', 'synonym', 1, 'the same drive (grouped in computer storage)');
M(42232, 'flash drive', 49357, 'thumb drive', 'synonym', 2, 'the same drive (grouped)');
M(42232, 'flash drive', 49358, 'pen drive', 'synonym', 3, 'the same drive, the Indian name (grouped)');
M(3636, 'fitness tracker', 49534, 'activity tracker', 'synonym', 2, 'the same wristband (grouped in wearable tech)');
M(41840, 'pedometer', 49533, 'step counter', 'synonym', 2, 'the same device (grouped in wearable tech)');
M(23559, 'speaker', 49544, 'loudspeaker', 'synonym', 2, 'the same thing (grouped in audio gear)');
M(11312, 'tape deck', 23566, 'cassette deck', 'synonym', 4, 'the same deck (grouped in audio gear)');
M(49597, 'button cell', 49602, 'coin cell', 'synonym', 3, 'the same battery (grouped)');
M(7435, 'safety factor', 7436, 'factor of safety', 'synonym', 4, 'the same number (grouped in engineering)');
M(58362, 'bunker fuel', 64600, 'bunker oil', 'synonym', 4, 'the same ship fuel (grouped in fuels)');
M(32333, 'kerosene', 58360, 'paraffin', 'regional', 3, 'the UK word for kerosene (grouped in fuels); UK players see paraffin', { region: ['UK'] });
M(49767, 'microchip', 49787, 'chip', 'synonym', 1, 'chip [electronics] is the microchip (grouped in two themes)', { dropKin: true });
M(49767, 'microchip', 50004, 'silicon chip', 'synonym', 2, 'the same chip (grouped)');
M(42625, 'circuit board', 42627, 'PCB', 'abbreviation', 3, 'the short form of printed circuit board (grouped in two themes)');
M(49784, 'photoresistor', 49785, 'LDR', 'abbreviation', 5, 'the short form of light-dependent resistor (grouped in two themes)');
M(23662, 'transformer', 40682, 'transformer', 'synonym', 2, 'transformer [electric] is the same device (electricity words)');
M(40678, 'AC', 49838, 'alternating current', 'synonym', 2, 'the full name of AC (grouped in power grid words)');
M(58387, 'nickel silver', 58386, 'German silver', 'synonym', 4, 'the same alloy (grouped)');
M(49890, 'ice drill', 49902, 'ice auger', 'synonym', 4, 'the same drill (grouped)');
M(49954, 'radio telescope', 49938, 'radio dish', 'synonym', 2, 'the same telescope (grouped)');
M(37734, 'Griffith Observatory', 62952, 'Griffith', 'synonym', 4, 'Griffith [observatory] is the Griffith Observatory', { del: 'a bare short form; observatory shows Griffith Observatory as "Griffith"' });
M(49889, 'snowcat', 3141, 'sno-cat', 'spelling', 5, 'one vehicle written two ways (grouped in two themes)');
M(62175, 'ODT', 67018, 'ODT file', 'synonym', 4, 'the same file format', { del: 'a second root of ODT made for file types (case: typed common)' });
M(41489, 'score', 25355, 'score', 'synonym', 3, 'score [twenty years] is the same score, twenty (sense-twin); time units takes it');
setE(E(41489), 'fam', 3, 'score as twenty is known from "four score" (the merged entry was rated 3)');

// =================================================================================================
sec('5. Wrong senses and stubs');
split(21, 'Earth', ['classical_elements'], 'earth', 'soil', { fam: 1 }, 'the classical element earth (21 is the planet)');
split(6953, 'Perseus', ['constellations'], 'Perseus', 'constellation', { type: 'proper', fam: 3 }, 'the constellation (6953 is the Greek hero), as Andromeda and Hercules', 'hero');
split(26444, 'thou', ['length_units', 'imperial_units'], 'thou', 'unit', { fam: 4 }, 'a thousandth of an inch (26444 is the pronoun)');
split(41776, 'kilo', ['metric_prefixes'], 'kilo', 'prefix', { pos: 'other', fam: 1 }, 'the metric prefix (41776 is the kilogram)');
split(39581, 'click', ['computer_actions'], 'click', 'mouse', { pos: 'verb', fam: 1 }, 'to press a mouse button (39581 is the sound)');
split(40620, 'drag', ['computer_actions'], 'drag', 'mouse', { pos: 'verb', fam: 1 }, 'to move with the mouse button held (40620 is air resistance)');
swap('networking', chk(28873, 'ping'), chk(45769, 'ping'), 'the network ping (45769, in esports words for network lag), not the sound (reviewer)');
setE(chk(45769, 'ping'), 'gloss', 'network', 'the signal and delay of a network connection, in networking and esports words');
split(39306, 'prompt', ['ai_words'], 'prompt', 'AI', { fam: 2 }, 'the text a user gives an AI model (39306 is the adjective quick)');
swap('evolution_words', chk(33869, 'inheritance'), chk(40951, 'inheritance'), 'inheritance [genetics], the passing on of traits (33869 is a legacy)', { typ: 3 });
swap('lab_equipment', chk(4872, 'coat'), chk(24451, 'lab coat'), 'the lab coat, shown short as before', { show: 'coat' });
swap('lab_safety_gear', chk(4872, 'coat'), chk(24451, 'lab coat'), 'the lab coat, shown short as before', { show: 'coat' });
swap('lab_safety_gear', chk(24782, 'glasses'), chk(50008, 'safety glasses'), 'safety glasses, not everyday glasses', { nameOk: true });
if (ix.theme.has('lab_safety_gear')) addToGroup('lab_safety_gear', [24786, 50008, 24458], 'goggles, safety goggles and safety glasses are one answer (as in lab protective equipment)');
dropTheme('protective_equipment', 'a twin of lab safety gear (all its words are there now: safety goggles added, white coat merged into lab coat, eyewash merged with eye wash)');
swap('space_station', chk(9184, 'hatch'), chk(47445, 'hatch'), 'the door of a craft, not the verb hatch [emerge]');
{ const r = ix.entry.get(50086); if (r && r.text === 'reticulum') retext(50086, 'reticulum', 'Reticulum', 'a constellation name, capital like its siblings (Mensa, Pavo)', { type: 'proper' }); }
{ const a = ix.entry.get(20930); if (a && a.text === 'Acre') { retext(20930, 'Acre', 'acre', 'acre [unit] is the unit of area, a common word (Acre [city] 50009 is the place)', { type: 'common' }); setShow(a, 'imperial_units', null, 'the text is now acre'); } }
{ const h = ix.entry.get(50025); if (h && h.text === 'Half-Life') { retext(50025, 'Half-Life', 'half-life', 'half-life [decay time] is the physics word, lowercase (Half-Life 5806 is the video game)', { type: 'common', tm: false }); } }
{ const h = ix.entry.get(62917); if (h && h.text === 'HCl') {
  retext(62917, 'HCl', 'hydrochloric acid', 'the acid\'s name; HCl, its formula, becomes its abbreviation alias');
  setShow(h, 'acids_and_bases', 'hydrochloric', 'the full term shown short, as nitric, citric and acetic acid');
  const al = newAlias(62917, 'HCl', '', 'abbreviation', 3, [], 'the formula used as a short name'); if (al.type !== 'acronym') al.type = 'acronym'; } }
linkE(chk(40509, 'sulfuric acid'), 'acids_and_bases', 2, 'a strong acid (reviewer); the full name is the member', { nameOk: true });
{ const sp = ix.entry.get(40510); if (sp && sp.aliasOf === 40509 && !(sp.nameOkIn || []).includes('acids_and_bases')) setE(sp, 'nameOkIn', [...(sp.nameOkIn || []), 'acids_and_bases'], 'its UK spelling sulphuric acid holds acid too'); }
delAlias(52732, 'Jalal ad-Din Rumi', 'a spelling alias that is the full name (alias-kind-suspect); as a synonym (familiarity 5) it would be Rumi\'s first synonym, shown at some levels (reviewer)');
{ const o = ix.entry.get(62918); if (o && o.text === 'oil of vitriol') {
  unlinkE(o, 'acids_and_bases', 'the old name of sulfuric acid, at typicality 1; sulfuric acid takes its place');
  delE(62918, 'oil of vitriol', 'an old name of sulfuric acid; as its first synonym (familiarity 5 for a familiarity-2 root) it would be shown at some levels'); } }

// =================================================================================================
sec('6. Kinds of engineers: the people out of engineering fields');
if (!ix.theme.has('kinds_of_engineers')) {
  P.themes.push({ id: 'kinds_of_engineers', name: 'kinds of engineers', parent: 'engineering', group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: '', pop: 4, ident: 2 });
  reindex(P); placeTheme(P, 'kinds_of_engineers', 'engineering_fields', 'after'); reindex(P); n++;
  A.push('new theme: kinds_of_engineers "kinds of engineers" under engineering, after engineering fields (pop 4, ident 2): the 11 engineers that were in engineering fields (reviewer)');
}
for (const [id, a] of [[49711, 'mechanical'], [49712, 'electrical'], [49717, 'structural'], [49716, 'biomedical'], [49721, 'industrial'], [49723, 'automotive'], [49738, 'electronic'],
  [49743, 'aeronautical'], [49725, 'agricultural'], [49726, 'geotechnical'], [49747, 'reliability']]) {
  const e = chk(id, a + ' engineer'), typ = e.typ.engineering_fields;
  if (typ !== undefined) { linkE(e, 'kinds_of_engineers', typ, 'a kind of engineer, from engineering fields', { show: a }); unlinkE(e, 'engineering_fields', 'a person, not a field (in kinds of engineers)'); }
}

// =================================================================================================
sec('7. Case, type, flags, ratings, alias kinds');
for (const [id, text] of [[62172, 'INI file'], [67015, 'LED screen']]) setE(chk(id, text), 'type', 'proper', 'a term with a capitalised acronym (case: typed common), as USB port and LCD screen');
for (const [id, text] of [[49489, 'Canon'], [49490, 'Nikon'], [49507, 'Atari']]) setE(chk(id, text), 'type', 'org', 'a company and brand, typed like Sony and Kodak (it was common)');
setE(chk(58175, 'Lord Kelvin'), 'type', 'person', 'a person, not a title (a book, film or song)');
{ const v = chk(19578, 'V8'); setE(v, 'type', 'common', 'the engine layout, typed like V6 (the brand is V8 [juice] 50150)'); setE(v, 'tm', false, 'not a trademark (V8 [juice] is the brand)'); }
setE(chk(50056, 'Monte Carlo'), 'type', 'proper', 'the Monte Carlo method, a name, not the place');
{ const r = ix.entry.get(50085); if (r && r.text === 'raid') { retext(50085, 'raid', 'RAID', 'the acronym (redundant array of independent disks) is written in capitals', { type: 'acronym', fam: 4 }); rate(r, 'computer_storage', 4, 'a specialist storage term'); } }
setE(chk(11319, '8-track'), 'aliasKind', 'synonym', 'the same word written with a numeral, as 10 pin (alias-kind-suspect)');
for (const [id, text] of [[6866, 'carbon dating'], [7142, 'zero gravity'], [7231, 'margin of error'], [7434, 'finite element'], [7440, 'moment of inertia'], [39864, 'pitch drop']])
  setE(chk(id, text), 'type', 'common', 'a term, not an idiom (type phrase is for idioms)');
setE(chk(39911, 'combustion'), 'fam', 3, 'many adults know combustion (internal combustion engine)');
{ const sn = ix.entry.get(2417); if (sn && sn.text === 'satnav' && sn.aliasOf === 2415) setE(sn, 'fam', 2, 'sat nav written as one word, as well known as sat nav (2); as the first synonym of GPS (familiarity 1) it must be well known (flag 512)'); }
setE(chk(50063, 'Pegasus'), 'fam', 3, 'the constellation is known to many adults, not every child (it had the winged horse\'s familiarity)');

// =================================================================================================
sec('8. First synonym alias (game flag 512): no harder than the root + 1');
{ const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  let all = 0, bad = 0;
  for (const [rid, list] of syn) { const r = ix.entry.get(rid); if (!linkIds(P, r).some(t => inGroup(t))) continue; all++;
    if (list[0].fam > r.fam + 1) { bad++; A.push(`  STILL TOO HARD: ${lab(r)} f${r.fam}: first synonym ${lab(list[0])} f${list[0].fam}`); } }
  A.push(`  roots linked in the group with synonym aliases: ${all}; first synonym harder than root + 1: ${bad}`); }
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
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.map(t => `${t} (index ${x0.themes.indexOf(t)})`).join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to the last index ${x1.themes.length - 1}`}`);
{ const F = x1.themeFields, pi = F.indexOf('parent'), row = (x, r) => F.map((f, k) => k === pi ? (r[k] === null || r[k] === undefined || r[k] < 0 ? r[k] : x.themes[r[k]]) : r[k]);
  const thCh = x1.themeRows.map((r, i) => [r, i]).filter(([r]) => { const j = x0.themes.indexOf(r[0]); return j >= 0 && JSON.stringify(row(x0, x0.themeRows[j])) !== JSON.stringify(row(x1, r)); })
    .map(([r, i]) => { const j = x0.themes.indexOf(r[0]), a = row(x0, x0.themeRows[j]), b = row(x1, r); return `${r[0]} (index ${j} -> ${i}: ${F.filter((f, k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map(f => { const k = F.indexOf(f); return `${f} ${JSON.stringify(a[k])} -> ${JSON.stringify(b[k])}`; }).join(', ')})`; });
  cmp.push(`Theme rows whose fields changed (parent compared by id): ${thCh.length}: ${thCh.join('; ') || 'none'}`); }
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
const summary = [`Library batch v445: tidy-up step 3, Science & Tech (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch445-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch445-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch445-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

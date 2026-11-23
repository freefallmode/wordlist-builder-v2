// Library batch v446: tidy-up step 3 (TIDY-UP.md), the Language & Wordplay group: every theme under language_wordplay read against the checklist,
// and every wordplay theme's members tested against its rule on the text the game shows, against roots (never aliases) of the theme the rule names.
// Base: library v439. Applied after v440-v442 (round 3) and v443-v445: everything works by entry id + text and theme id, never by position, and every
// step is skipped when it is already done (rerun: 0 changes). A merge another batch has already made is skipped.
//   1. Wordplay: hand [body] and 12 given names added (the rules need them); starts/ends with a pet -> an animal, starts/ends with transport name
//      modes of transport (TIDY-UP item), relative and shape rules widened to the themes that hold the words; members that fail their test out;
//      compound shows fixed; silly rhyming pairs merged into rhyming pairs.
//   2. Tree: Spanish numbers -> numbers in Spanish under foreign numbers; Latin phrases not foreign; months in French and Spanish complete.
//   3. region-root-equiv: fairy cake and head server ungrouped (compound answers). 4. Second roots of one sense merged (languages, tenses).
//   5. Wrong senses split (Rapa Nui, Qom, cannae, dost, crumbs, shoot, quince) or moved (tweet, applesauce, fuchsia, hackney). 6. Belonging.
//   7. British English words shows the British word for every US root; boot, bonnet, fringe, lay-by, car park merged (parking lot the root).
//   8. Types and ratings. 9. First synonym check.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch446.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const GROUP = 'language_wordplay';
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
const T0 = new Set(THEMES0);

const M = (k, kt, g, gt, kind, fam, why, o) => mergeInto(k, kt, g, gt, kind, fam, why, o);

// =================================================================================================
sec('1. Wordplay themes: every member passes the game\'s test on its shown text, against roots (never aliases) of the theme the rule names');
// Words the rules need that the library lacks: hand (body parts) and common given names (hidden names).
{ const h = newEntry('hand', 'body', { pos: 'noun', type: 'common', fam: 1 }, 'the body part was missing from the library (only hand [unit], [cards] and [clock] existed); starts with a body part (handsome, handbag), ends with a body part (stagehand) and hidden body parts (chandelier, shandy) need it');
  linkE(h, 'body_parts', 1, 'a body part everyone names first (Body & Health: the word was missing)');
  linkE(h, 'hands_and_feet', 1, 'the hand itself, as foot is linked here'); }
setE(chk(52804, 'Amy'), 'gloss', 'Little Women', 'its text is now shared with Amy [name]');
for (const [text, gloss, tid, typ, fam, why] of [
  ['Ann', '', 'girls_names', 2, 1, 'a common girl\'s name; hidden names needs it (ANNoy, bANNer, cANNon)'],
  ['Amy', 'name', 'girls_names', 2, 1, 'a common girl\'s name; hidden names needs it (dreAMY)'],
  ['Eric', '', 'boys_names', 2, 1, 'a common boy\'s name; hidden names needs it (AmERICa)'],
  ['Roy', '', 'boys_names', 3, 2, 'a common boy\'s name; hidden names needs it (ROYal, destROY)'],
  ['Carl', '', 'boys_names', 3, 1, 'a common boy\'s name; hidden names needs it (sCARLet)'],
  ['Dan', 'name', 'short_forms_of_names', 2, 1, 'Daniel; hidden names needs it (DANger, DANce)'],
  ['Ken', 'name', 'short_forms_of_names', 3, 1, 'Kenneth; hidden names needs it (broKEN, toKEN)'],
  ['Ray', 'name', 'short_forms_of_names', 2, 1, 'Raymond; hidden names needs it (cRAYon, spRAY)'],
  ['Don', 'name', 'short_forms_of_names', 2, 1, 'Donald; hidden names needs it (parDON, LonDON)'],
  ['Ron', 'name', 'short_forms_of_names', 2, 1, 'Ronald; hidden names needs it (baRON)'],
  ['Stan', 'name', 'short_forms_of_names', 3, 2, 'Stanley; hidden names needs it (PakiSTAN, STANza)']]) {
  const e = newEntry(text, gloss, { pos: 'noun', type: 'person', fam }, why); linkE(e, tid, typ, why); }
out('hidden_names', [[4476, 'lesson'], [6759, 'pirate'], [1997, 'snowstorm']], 'hides no given name of the names themes');

// Rules that named a theme which lacks the words: point them at the theme that holds them, keep names true to the members.
rename('starts_with_a_pet', 'starts with an animal', 'its words begin with a farm animal or a young animal as often as a pet (coward, pigment, henna, lambda, pupil, newton): no pets theme holds cow, pig, hen, lamb, pup, goat or newt');
setT('starts_with_a_pet', 'rule', 'starts:@animals', 'the pets theme holds none of cow, pig, hen, goat, lamb, pup, mouse, newt, horse: 9 of its 14 words failed the test');
out('starts_with_a_pet', [[619, 'mousse']], 'mousse begins with mous-, not mouse: the test fails');
setT('starts_with_a_pet', 'note', 'one word for each animal that begins with its name but has nothing to do with it: category (cat), ratchet (rat), dogmatic (dog), pigment (pig), coward (cow)', 'animals, not pets');
rename('ends_with_a_pet', 'ends with an animal', 'kitchen (hen) and geoduck (duck) end with an animal that is no pet');
setT('ends_with_a_pet', 'rule', 'ends:@animals', 'the pets theme holds neither hen nor duck');
setT('ends_with_a_pet', 'note', 'carat (rat), kitchen (hen), selfish (fish), ducat (cat), geoduck (duck)', 'animals, not pets');
setT('starts_with_public_transport', 'rule', 'starts:@modes_of_transport', 'TIDY-UP.md known item: v433 dropped "public" from the name, and transport covers cars, bikes and planes; the rule now names modes of transport (as hidden vehicles does), so the name "starts with transport" is true; "public transport words" held neither plane nor car, and cab, tram, metro and tube are aliases there');
setT('starts_with_public_transport', 'note', 'one word for each kind of transport that begins with its name but has nothing to do with it: busy (bus), planet (plane), trainer (train), taxidermy (taxi), carpet (car), vanilla (van)', 'the words that pass the test');
out('starts_with_public_transport', [[119, 'cabin'], [28708, 'jetty'], [38372, 'railing'], [40262, 'metronome'], [28700, 'trample'], [17667, 'tuber']],
  'cab, tram, metro and tube are aliases (of taxi, streetcar, subway), jet and rail no transport word: the test fails (cabin and metronome stay in starts with cab and starts with metro)');
linkE(chk(23501, 'carpet'), 'starts_with_public_transport', 2, 'begins with car, nothing to do with it');
linkE(chk(719, 'vanilla'), 'starts_with_public_transport', 2, 'begins with van, nothing to do with it');
setT('ends_with_public_transport', 'rule', 'ends:@modes_of_transport', 'as starts with transport: vicar (car) and worship (ship) failed against public transport words');
setT('ends_with_public_transport', 'note', 'syllabus (bus), vicar (car), restrain (train), worship (ship)', 'vocab left (cab is an alias)');
out('ends_with_public_transport', [[67117, 'vocab']], 'cab is an alias of taxi: the test fails');
setT('starts_with_a_family_member', 'rule', 'starts:@family_and_friends', 'family members holds neither ma, pa, kid, gran nor nan (they are in words for mother, father, grandparents and ages and stages under family and friends)');
setT('starts_with_a_family_member', 'note', 'sonar (son), kidney (kid), granite (gran), broccoli (bro), papaya (papa), twinkle (twin)', 'mumps and sisal left');
out('starts_with_a_family_member', [[3363, 'mumps'], [25534, 'sisal']], 'mum and sis are aliases (of mom and sister): the test fails');
setT('ends_with_a_family_member', 'rule', 'ends:@family_and_friends', 'as starts with a relative (drama: ma)');
setT('ends_with_a_family_member', 'note', 'lesson (son), flaunt (aunt), banana (nana), poison (son), jaunt (aunt)', 'basis, maximum and drama left');
out('ends_with_a_family_member', [[67108, 'basis'], [67104, 'maximum']], 'sis and mum are aliases: the test fails (they stay in ends with sis and ends with mum)');
linkE(chk(88, 'banana'), 'ends_with_a_family_member', 2, 'ends with nana, nothing to do with it (keeps the theme at 4 words)');
setT('starts_with_a_shape', 'rule', 'starts:@shapes_and_patterns', '2D shapes holds no ball, arc or ring (ballet, Arctic, ringtone failed); shapes and patterns has them');
setT('starts_with_a_shape', 'note', 'ballet (ball), starch (star), Arctic (arc), ringtone (ring), hearthstone (heart)', 'discount and dotage left');
out('starts_with_a_shape', [[34001, 'discount'], [67087, 'dotage']], 'disc and dot are in no shapes theme: the test fails (discount stays in starts with disc)');
setT('ends_with_a_shape', 'rule', 'ends:@shapes_and_patterns', 'as starts with a shape (string: ring, silicone: cone)');
setT('ends_with_a_shape', 'note', 'string (ring), silicone (cone), scone (cone), across (cross)', 'trampoline and peridot left');
out('ends_with_a_shape', [[5944, 'trampoline'], [38799, 'peridot']], 'line and dot are in no shapes theme: the test fails (trampoline stays in ends with line)');
linkE(chk(576, 'scone'), 'ends_with_a_shape', 3, 'ends with cone, nothing to do with it');
linkE(chk(26463, 'across'), 'ends_with_a_shape', 2, 'ends with cross, nothing to do with it');

// Members that fail their rule, or pass only through an alias.
out('silent_w_words', [[20683, 'sword'], [56056, 'answer'], [28881, 'two'], [26429, 'who'], [28761, 'whole'], [26431, 'whose'], [56064, 'Norwich'], [56063, 'Warwick']],
  'a silent w, but not the "wr" the rule tests (contains:wr); the theme keeps 20 wr words');
setT('silent_w_words', 'note', 'write, wrist, wrong, wrap, wreck', 'the examples pass the rule');
out('silent_g_words', [[3268, 'diaphragm'], [15548, 'phlegm'], [56071, 'paradigm']], 'a silent g, but not the "gn" the rule tests');
out('silent_g_words', [[966, 'bubbly']], 'no g at all (it came in as champagne\'s group partner)');
out('silent_b_words', [[21287, 'coxswain']], 'no b at all');
out('starts_with_a_body_part', [[29230, 'heartless'], [29229, 'gumption']], 'heart and gum are organs and mouth parts, in no body parts theme: the test fails');
out('starts_with_a_body_part', [[3193, 'underarm'], [3194, 'axilla']], 'a body part itself that begins with no body part (under, ax)');
out('starts_with_a_color', [[79, 'mandarin']], 'begins with no color (it was grouped with tangerine)');
out('starts_with_a_color', [[268, 'greyhound']], 'grey is an alias of gray: the test fails');
out('hidden_colors', [[268, 'greyhound']], 'grey is an alias of gray: the test fails');
out('hidden_colors', [[62394, 'married']], 'hides no color');
out('hidden_birds', [[3755, 'towel'], [1853, 'trowel']], 'hides no bird (t-o-w-e-l is not owl)');
out('hidden_birds', [[24069, 'kitchen'], [26515, 'when']], 'hen is poultry, in no birds theme: the test fails (kitchen stays in ends with an animal)');
out('hidden_birds', [[1024, 'baboon']], 'hides no bird');
out('hidden_insects', [[56040, 'bugbear'], [297, 'bugle']], 'bug is in no insects theme: the test fails');
out('hidden_insects', [[924, 'slice'], [4207, 'police'], [56037, 'malice']], 'lice is the plural; insects holds louse: the test fails');
out('hidden_insects', [[7205, 'unit'], [24884, 'knit'], [2056, 'granite']], 'nit is in no insects theme: the test fails');
out('hidden_insects', [[1343, 'wasp'], [4864, 'trousers'], [4865, 'slacks'], [26460, 'between'], [969, 'brewski'], [4210, 'old bill']], 'hides no insect (slacks, brewski and old bill came in as group partners of trousers, beer and police)');
out('hidden_body_parts', [[1367, 'snail'], [293, 'trombone'], [28627, 'collide'], [28626, 'solid'], [23247, 'gutter'], [28631, 'delivery'], [38492, 'colony']],
  'nail, bone, lid, gut, liver and colon are in no body parts theme (bones and organs are inside the body): the test fails');
out('hidden_vehicles', [[119, 'cabin'], [28704, 'cable'], [4671, 'cabinet'], [395, 'cabbage'], [28700, 'trample'], [5944, 'trampoline']], 'cab and tram are aliases (of taxi, streetcar): the test fails');
out('hidden_vehicles', [[28712, 'limousine'], [28464, 'craft'], [23977, 'recycle'], [28719, 'submit'], [28801, 'subject'], [42800, 'strike'], [21046, 'sledge'], [28708, 'jetty'], [42790, 'draft'], [28709, 'tankard'], [28713, 'rehearse']],
  'limo, raft, cycle, sub, trike, sled, jet, tank and hearse are not in modes of transport: the test fails');
setT('hidden_vehicles', 'note', 'a vehicle inside a longer word: sCARf, aBUSe, VANilla, PLANEt, resTRAIN', 'the examples pass the test (cabin and stramp do not: cab and tram are aliases)');
out('hidden_trees', [[28727, 'bayonet'], [28728, 'bayou']], 'bay is in no trees theme: the test fails');
out('starts_with_a_piece_of_clothing', [[2801, 'captain'], [14263, 'socket'], [13394, 'bibliography'], [23056, 'bootlegger'], [41909, 'tierce']],
  'cap, sock, bib, boot and tie are not roots of the clothes themes (socks and boots are; sock is an alias): the test fails (they stay in starts with cap and starts with bib)');
setT('starts_with_a_piece_of_clothing', 'note', 'hatchet (hat), brain (bra), sashimi (sash), vestibule (vest), kilter (kilt)', 'the examples pass the test');
out('ends_with_a_piece_of_clothing', [[43041, 'handicap'], [32458, 'sweetie'], [63144, 'tussock']], 'cap, tie and sock are not roots of the clothes themes: the test fails');
setT('ends_with_a_piece_of_clothing', 'note', 'zebra (bra), harvest (vest), microbe (robe), somewhat (hat)', 'the examples pass the test');
out('starts_with_a_musical_instrument', [[40395, 'pipette']], 'pipe is in no instruments theme: the test fails');
out('starts_with_a_tree', [[28727, 'bayonet'], [29229, 'gumption']], 'bay and gum are in no trees theme: the test fails');
setT('starts_with_a_tree', 'note', 'first (fir), ashamed (ash), alderman (alder), ashore (ash), firmware (fir)', 'bayonet, plumber and fight left');
out('starts_with_a_weather_word', [[616, 'sundae']], 'sun is in no weather theme: the test fails (it stays in starts with sun)');
setT('starts_with_a_weather_word', 'note', 'window (wind), mistake (mist), hazelnut (haze), galette (gale), dewlap (dew)', 'sundae left');
out('ends_with_a_weather_word', [[21278, 'bosun']], 'sun is in no weather theme: the test fails');
setT('ends_with_a_weather_word', 'note', 'sprain (rain), chemist (mist), mildew (dew), terrain (rain)', 'bosun and juice left');
setShow(chk(9859, 'colobus monkey'), 'ends_with_bus', 'colobus', 'the theme tests the shown text: colobus ends with bus, colobus monkey does not');
out('sounds_like_a_number', [[1440, 'cat'], [1442, 'kitty']], 'sounds like no number in any language the theme uses (it holds French, German and Japanese sound-alikes: sank, dry, knee)');
out('homophones', [[1966, 'rainfall']], 'no homophone (rain, reign and rein are)');
out('acronyms', [[16903, 'swat']], 'swat [hit] is the verb; SWAT the acronym is not in the library');
out('acronyms', [[25489, 'vat']], 'vat [tub] is the tank; VAT the tax is not in the library');
out('acronyms', [[7299, 'modem']], 'a blend (modulator-demodulator), not an acronym (it stays in the word blend themes)');
// Compound themes: the shown part and the theme word make the full term (or a regional alias of it, the approved way to show a UK term).
setShow(chk(2592, 'dashboard'), 'blank_board', 'dash', 'a compound member is shown as its first part (dash + board)');
setShow(chk(35174, 'mail slot'), 'blank_box', 'letter', 'letter + box = letterbox, its UK alias (the shown "letterbox" made "letterboxbox")');
if (!E(4717).aliasOf) { swap('blank_box', chk(4716, 'fridge'), chk(4717, 'icebox'), 'icebox is its own root now (v441): the compound member is icebox', { show: 'ice' });
swap('ice_blank', chk(4716, 'fridge'), chk(4717, 'icebox'), 'icebox is its own root now (v441): the compound member is icebox', { show: 'box' }); }   // on v439 icebox is still fridge's alias: fridge shown ice/box already makes icebox
swap('blank_line', chk(3245, 'blood'), chk(3946, 'bloodline'), 'the compound member is the full term bloodline, shown "blood" (LIBRARY-RULES 5)', { show: 'blood' });
out('blank_ship', [[4279, 'worship']], 'not a compound of ship (wor- is no word)');
setShow(chk(28281, 'harebell'), 'blank_bell', 'hare', 'a compound member is shown as its first part (hare + bell)');
out('eye_blank', [[66915, 'eyeful']], 'eye + -ful is a suffix, not a compound with a word after eye (it was shown "full")');
// silly rhyming pairs twins rhyming pairs.
linkE(chk(27836, 'jiggery-pokery'), 'rhyming_pairs', 3, 'from silly rhyming pairs (a twin, deleted)');
linkE(chk(27839, 'oompa-loompa'), 'rhyming_pairs', 4, 'from silly rhyming pairs (a twin, deleted)');
dropTheme('rhyming_word_pairs', 'a twin of rhyming pairs (11 of its 14 words are there or in zigzag words); jiggery-pokery and oompa-loompa move to rhyming pairs; mishmash and pitter-patter change the vowel (zigzag words) and hubbub does not rhyme');

// =================================================================================================
sec('2. Tree, names, flags, complete sets');
rename('spanish_numbers', 'numbers in Spanish', 'named like its siblings numbers in French, German, Italian and Japanese');
moveT('spanish_numbers', 'numbers_in_french', 'before', 'beside the other foreign number themes, in the folder foreign numbers');
for (const [tid, id, text] of [['months_in_french', 62339, 'mois'], ['months_in_spanish', 62340, 'mes']]) {
  out(tid, [[id, text]], 'the word for month, not a month');
  delE(id, text, 'a stub made for the months theme (the word for month); in no theme');
  setT(tid, 'complete', true, 'the twelve months, one agreed set (as months in German); the note lists them'); }

// =================================================================================================
sec('3. Regional roots (region-root-equiv)');
leaveGroup('blank_cake', 66355, 'fairy cake and cupcake are two compound answers (fairy + cake, cup + cake), as fire engine and fire truck are in fire ___ (v438); grouped, the UK root was flagged as a same-sense regional root');
leaveGroup('head_blank', 66689, 'head server and head waiter are two compound answers (head + server, head + waiter)');

// =================================================================================================
sec('4. Two roots of one sense');
M(7541, 'Persian', 7542, 'Farsi', 'translation', 3, 'the Persian name of the language (grouped as one answer)');
M(7532, 'Irish', 59438, 'Irish Gaelic', 'synonym', 2, 'the same language (grouped)');
M(59441, 'Scottish Gaelic', 25816, 'Scots Gaelic', 'synonym', 3, 'the same language (grouped)');
M(25832, 'Sinhala', 25833, 'Sinhalese', 'synonym', 4, 'the same language (grouped)');
M(25857, 'Fula', 25858, 'Fulani', 'synonym', 4, 'the same language (grouped)');
M(25849, 'Tswana', 25850, 'Setswana', 'translation', 5, 'the language\'s own name (grouped)');
M(25867, 'Berber', 25868, 'Tamazight', 'translation', 5, 'the language\'s own name (grouped)');
M(25867, 'Berber', 25869, 'Amazigh', 'translation', 5, 'the language\'s own name (grouped)');
M(29382, 'Mandarin', 55903, 'Putonghua', 'translation', 4, 'the Chinese name of Mandarin (grouped)');
M(25883, 'Azerbaijani', 25884, 'Azeri', 'synonym', 4, 'the same language (grouped)');
M(59419, 'Manx', 62343, 'Gaelg', 'translation', 5, 'the language\'s own name (grouped)');
M(25895, 'Yakut', 25896, 'Sakha', 'translation', 5, 'the language\'s own name (grouped)');
M(62326, 'Cook Islands Māori', 25921, 'Rarotongan', 'synonym', 5, 'the same language (grouped)');
M(26362, 'simple present', 26366, 'present simple', 'synonym', 2, 'the same tense (both orders are in use)');
M(26363, 'simple past', 26367, 'past simple', 'synonym', 2, 'the same tense');
M(26365, 'simple future', 26368, 'future simple', 'synonym', 3, 'the same tense');
M(26478, 'amid', 26479, 'amidst', 'synonym', 4, 'the same preposition (grouped)');
M(7608, 'capital letter', 26211, 'capital letters', 'form', 1, 'the plural of capital letter (grouped in typography words)', { gloss: '' });

// =================================================================================================
sec('5. Wrong senses and stubs');
split(21155, 'Rapa Nui', ['pacific_languages'], 'Rapa Nui', 'language', { type: 'proper', fam: 4 }, 'the Polynesian language of Easter Island (21155 is the island)', 'island');
split(36063, 'Qom', ['indigenous_south_american_languages'], 'Qom', 'language', { type: 'proper', fam: 5 }, 'the Qom (Toba) language of Argentina (36063 is the Iranian city)', 'city');
split(21330, 'Cannae', ['scottish_words'], 'cannae', "can't", { pos: 'verb', fam: 4 }, 'Scots for can\'t (21330 is the Roman battle site)', 'battle site');
split(27033, 'dost', ['old_fashioned_english_words', 'archaic_pronouns_and_verb_forms'], 'dost', 'archaic verb', { pos: 'verb', fam: 4 }, 'the old form of do (thou dost); 27033 is the Hindi word for friend', 'friend');
setE(chk(27717, 'crumbs'), 'gloss', 'bread', 'its text is now shared with crumbs [exclamation]');
split(39504, 'crumb', ['polite_swears', 'british_exclamations'], 'crumbs', 'exclamation', { pos: 'other', fam: 2 }, 'the mild British exclamation (39504 is a crumb of bread)');
split(27736, 'shoot', ['polite_swears', 'american_exclamations'], 'shoot', 'oath', { pos: 'other', fam: 1 }, 'the mild oath, as fudge [oath] and sugar [oath] (27736 is to fire a gun, in sports verbs)');
split(108, 'quince', ['spanish_numbers'], 'quince', 'Spanish number', { fam: 3 }, 'Spanish for fifteen (108 is the fruit)', 'fruit');
swap('things_you_read', chk(10192, 'tweet'), chk(50153, 'tweet'), 'a post you read, not the bird sound (sense-link)');
swap('words_meaning_nonsense', chk(19927, 'applesauce'), chk(27275, 'applesauce'), 'the 1920s word for nonsense, not the food (sense-link)');
swap('words_named_after_people', chk(7685, 'fuchsia'), chk(62419, 'fuchsia'), 'the plant is named after Leonhart Fuchs; the color after the plant (sense-link)');
if (ix.entry.get(29566)) swap('words_named_after_places', chk(29566, 'hackney'), chk(47010, 'hackney carriage'), 'the carriage (and horse) named after Hackney; 29566 is the district', { show: 'hackney' });
if (ix.entry.get(29566) && !linkIds(P, E(29566)).length) delE(29566, 'hackney', 'a lowercase stub of the London district made for words named after places; in no theme');
out('hawaiian_words', [[34495, 'Pali']], 'Pali [language] is the Indian language; the Hawaiian pali (cliff) is another word');
out('words_from_mythology', [[21085, 'Titanic']], 'Titanic [ship] is the ship; the adjective titanic is not in the library');
out('words_named_after_places', [[38123, 'Dijon']], 'the city itself, not a word named after it (Dijon mustard is not in the library)');
retext(29597, 'spanglish', 'Spanglish', 'Merriam-Webster and Oxford capitalise it (a blend of Spanish and English: proper names)', { type: 'proper' });

// =================================================================================================
sec('6. Belonging');
out('gen_z_slang', [[13536, 'lead']], 'lead [role] is a starring role, not slang');
out('1920s_slang', [[2644, 'banger']], 'banger [old car] is modern British slang, not 1920s');
out('canadian_slang', [[27564, 'yooper']], 'a Michigan word (Upper Peninsula), not Canadian');
out('old_fashioned_english_words', [[27903, 'bespoke']], 'in everyday use (bespoke suits, software)');
out('british_english_words', [[4865, 'slacks']], 'the US word (it was grouped with trousers)');
out('brand_names_used_as_words', [[4736, 'Hoover']], 'the brand itself; hoover [to vacuum] is the brand used as a word (same-display: both show "hoover")');
out('brand_names_used_as_words', [[3064, 'vacuum flask'], [5934, 'flying disc']], 'the generic word, never a brand (it was grouped with thermos, Frisbee)');
out('brand_names_used_as_words', [[23901, 'coin laundry']], 'the generic word, never a brand (it was grouped with laundromat; as an alias of laundromat it would repeat laundry in laundry words, theme-name)');
out('words_from_french', [[970, 'cook']], 'from Old English (Latin coquus), not French');
leaveGroup('words_from_french', 29275, 'cuisine is the cooking, not the cook');
leaveGroup('food_and_dining_words', 29275, 'cuisine is the cooking, not the cook');
addToGroup('food_and_dining_words', [916, 971], 'cuisinier is French for chef (one answer, as in words from French)');
out('words_from_spanish', [[4530, 'lunchroom']], 'English, not from Spanish (it was grouped with cafeteria)');
out('words_from_spanish', [[1980, 'zephyr']], 'from Greek, not Spanish');
for (const t of ['words_from_spanish', 'wild_west_words']) out(t, [[9624, 'wild horse']], 'English, not from Spanish (it was grouped with mustang)');
out('words_from_italian', [[6334, 'street art'], [6335, 'tagging']], 'English, not from Italian (grouped with graffiti)');
out('words_from_italian', [[7685, 'fuchsia']], 'named after the German botanist Fuchs, not Italian');
out('words_from_arabic', [[46262, 'water pipe']], 'English, not from Arabic (grouped with hookah)');
out('words_from_chinese', [[29382, 'Mandarin']], 'from Portuguese mandarim (via Malay and Sanskrit), not Chinese');
out('words_from_afrikaans', [[1031, 'gnu']], 'from a Khoikhoi word, not Afrikaans (grouped with wildebeest)');
for (const t of ['portmanteau_words', 'tech_blends']) out(t, [[4598, 'weblog']], 'a compound of web and log, not a blend (grouped with blog)');
out('words_named_after_places', [[79, 'mandarin']], 'from Portuguese mandarim (an official), not a place (grouped with tangerine)');
out('words_named_after_places', [[966, 'bubbly']], 'not named after a place (grouped with champagne)');

// =================================================================================================
sec('7. British English words (locked: each member shows the British word), car park, lay-by, fringe');
M(2577, 'trunk', 27381, 'boot', 'regional', 1, 'boot is the UK word for a car trunk', { del: 'trunk has boot 2578 as its UK alias already', keepShow: true, dropKin: true });
M(2579, 'hood', 27382, 'bonnet', 'regional', 2, 'bonnet is the UK word for a car hood', { del: 'hood has bonnet 2580 as its UK alias already', keepShow: true, dropKin: true });
M(14274, 'bangs', 27384, 'fringe', 'regional', 2, 'fringe is the UK word for bangs', { del: 'bangs has fringe 14275 as its UK alias already', keepShow: true, dropKin: true });
{ const lb = ix.entry.get(38439); if (lb && lb.aliasOf === 27385) delAlias(38439, 'layby', 'a spelling of lay-by; rest area has lay-by as its UK alias'); }
M(46736, 'rest area', 27385, 'lay-by', 'regional', 4, 'TIDY-UP.md, from round 2: lay-by into rest area (its UK alias lay-by 46738 since v438)', { del: 'rest area has lay-by 46738 as its UK alias already', keepShow: true });
for (const t of ['traffic_words', 'parts_of_a_road']) if (E(46736).typ[t] !== undefined) setShow(E(46736), t, null, 'not a locked theme: the UK alias lay-by shows for UK players, rest area for US players');
{ const cp = E(63317), cq = ix.entry.get(27371);
  if (cp.text === 'car park') { retext(63317, 'car park', 'parking lot', 'TIDY-UP.md, from round 2: parking lot is the US and neutral root (LIBRARY-RULES 5), car park its UK alias', { gloss: '' });
    setE(E(63317), 'nameOkIn', [...new Set([...(E(63317).nameOkIn || []), 'parking_words'])], 'parking lot names the thing in parking words; the full name contains a word of the theme name'); }
  if (cq && !cq.aliasOf) {
    mergeInto(63317, 'parking lot', 27371, 'car park', 'regional', 2, 'TIDY-UP.md, from round 2: car park 27371 [UK English] becomes the UK alias of parking lot in place (id and export row kept); UK players see car park', { region: ['UK'], keepShow: true, gloss: '' });
    if (E(63317).show?.parts_of_a_town) setShow(E(63317), 'parts_of_a_town', null, 'not a locked theme: the UK alias car park shows for UK players'); } }
for (const [id, text, show] of [[566, 'cookie', 'biscuit'], [3552, 'diaper', 'nappy'], [4873, 'sweater', 'jumper'], [19090, 'potato chips', 'crisps'], [25775, 'elevator', 'lift'],
  [132, 'pharmacy', 'chemist'], [3028, 'flashlight', 'torch'], [3557, 'stroller', 'pushchair'], [44007, 'running shoes', 'trainers'], [3554, 'pacifier', 'dummy'], [4720, 'stove', 'cooker'],
  [26091, 'period', 'full stop'], [3113, 'garbage truck', 'bin lorry'], [4973, 'suspenders', 'braces'], [34812, 'crossing guard', 'lollipop lady'], [23972, 'trash', 'rubbish'], [50000, 'gasoline', 'petrol']])
  setShow(chk(id, text), 'british_english_words', show, `the theme is locked and shows exactly its text: the US root showed "${text}"; its UK alias is ${show}`);
setShow(chk(2640, 'pickup truck'), 'australian_slang', 'ute', 'the locked theme showed "pickup truck"; the Australian word is its alias ute');

// =================================================================================================
sec('8. Case, types, ratings');
for (const [id, text] of [[27442, 'porkies'], [27461, 'whistle'], [27446, 'barnet']]) setE(chk(id, text), 'type', 'common', 'a word, not an idiom (contract-type-common)');
setE(chk(51337, 'cuatro'), 'fam', 3, 'far better known than familiarity 5 (dos, tres and cinco are 1-2); 3 keeps it in line with its word frequency');
setE(chk(28034, 'up'), 'fam', 1, 'every child knows it'); setE(chk(27978, 'hot'), 'fam', 1, 'every child knows it'); setE(chk(28179, 'down'), 'fam', 1, 'every child knows it');
if (!P.entries.some(a => a.aliasOf === 25379 && a.text === 'datebook')) out('blank_book', [[25379, 'planner']], 'shown "date", but planner no longer has the alias datebook (v441): date + book is not this entry');

// ---------- reviewer's fixes (2026-11-23): the game builds an @id rule's words from the named theme and its sub-themes, root texts only, single words of 3 or more letters ----------
sec("10. Reviewer's fixes: two-letter targets and alias targets never count");
out('starts_with_a_family_member', [[95, 'mango'], [1000, 'panda']], 'ma and pa have two letters: the game counts words of 3 or more (papaya stays: papa)');
out('ends_with_a_family_member', [[12436, 'drama']], 'ma has two letters: the game counts words of 3 or more');
linkE(chk(67102, 'poison'), 'ends_with_a_family_member', 2, 'ends with son, nothing to do with it (keeps the theme at 4+ words)');
linkE(chk(2927, 'jaunt'), 'ends_with_a_family_member', 3, 'ends with aunt, nothing to do with it');
out('hidden_names', [[28698, 'vocal']], 'Al has two letters: the game counts words of 3 or more (Al is not added)');
out('hidden_fruits', [[7281, 'update'], [28672, 'candidate'], [28674, 'mandate'], [28679, 'dated'], [32846, 'sedate'], [46939, 'validate']], 'date is a form alias of dates: the test fails');
out('hidden_body_parts', [[12062, 'flash'], [43291, 'splash']], 'lash is no root (eyelash is): the test fails');
out('hidden_trees', [[28667, 'figure']], 'fig is in fruits, not trees (fig tree is two words): the test fails');
out('starts_with_a_tree', [[4093, 'plumber'], [28816, 'fight']], 'plum and fig are in fruits, not trees: the test fails (plumber stays in starts with plum)');
linkE(chk(60660, 'ashore'), 'starts_with_a_tree', 2, 'begins with ash, nothing to do with it (keeps the theme at 4+ words)');
linkE(chk(7315, 'firmware'), 'starts_with_a_tree', 3, 'begins with fir, nothing to do with it');
out('ends_with_a_tree', [[24975, 'peplum']], 'plum is in fruits, not trees: the test fails');
linkE(chk(63345, 'bass'), 'instruments', 2, 'bass [instrument] had no link; starts with an instrument (basset) needs it');
out('ends_with_a_weather_word', [[862, 'juice']], 'ice is in no weather theme: the test fails');
linkE(chk(67118, 'terrain'), 'ends_with_a_weather_word', 2, 'ends with rain, nothing to do with it (keeps the theme at 4 words)');
out('names_that_are_months', [[62423, 'Julius'], [67466, 'Augustus'], [67465, 'Augustine'], [67464, 'Augusta'], [67463, 'Julio']], 'named after the namesake of a month, not a month itself');
out('starts_with_a_pet', [[14749, 'fishy'], [14276, 'ponytail'], [14294, 'goatee'], [17442, 'horseradish']], 'comes from its animal, against the note (nothing to do with it)');
// =================================================================================================
sec('9. First synonym alias (game flag 512): no harder than the root + 1');
{ const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  let all = 0, bad = 0;
  for (const [rid, list] of syn) { const r = ix.entry.get(rid); if (!linkIds(P, r).some(t => inGroup(t))) continue; all++;
    if (list[0].fam > r.fam + 1) { bad++; A.push(`  STILL TOO HARD: ${lab(r)} f${r.fam}: first synonym ${lab(list[0])} f${list[0].fam}`); } }
  A.push(`  roots linked in the group with synonym aliases: ${all}; first synonym harder than root + 1: ${bad} (the merges of this batch chose kinds so none is added)`); }
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
const summary = [`Library batch v446: tidy-up step 3, Language & Wordplay (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch446-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch446-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch446-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

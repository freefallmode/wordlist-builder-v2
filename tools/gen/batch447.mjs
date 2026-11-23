// Library batch v447: tidy-up step 3 (TIDY-UP.md), the Qualities group: every theme under qualities read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v439. Applied after v440-v442 (round 3) and v443-v446: everything here works by entry id + text and theme id, never by
// position, and every step is skipped when it is already done or its entry is gone or an alias (rerun: 0 changes).
//   1. Twins: fermented foods and drinks into fermented foods, things on wheels into things with wheels; reading material, aircraft,
//      confectionery, fragrant flowers (twins of other groups' themes) and toys and characters with eyes deleted.
//   2. Synonym themes: no synonym groups, no topic word, wrong senses out. 3-11. Wrong senses, second roots, stubs, belonging, types.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch447.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin, placeTheme } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
import { CASE_OK } from '../../js/caselint-allow.js';
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
const GROUP = 'qualities';
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
// ---------- helpers of this batch (2) ----------
const addNameOk = (e, tid, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} not in ${tid}`);
  if ((e.nameOkIn || []).includes(tid)) return; e.nameOkIn = [...(e.nameOkIn || []), tid]; n++; touchedT.add(tid);
  A.push(`${lab(e)} in ${tid}: nameOkIn (the full name contains a word of the theme name): ${why}`);
};
const dropGroups = (tid, why) => { if (!ix.theme.has(tid)) return; const t = T(tid); if (!(t.groups || []).length) return;
  A.push(`theme ${tid}: synonym groups removed (${t.groups.map(g => g.map(id => E(id).text).join(' = ')).join('; ')}): ${why}`); t.groups = []; n++; touchedT.add(tid); };
const typeCommon = (list, why) => { for (const [id, text] of list) { const e = ix.entry.get(id); if (e && e.text === text && e.type === 'phrase') setE(e, 'type', 'common', why); } };
const linkIf = (id, text, tid, typ, why, x) => { const e = ix.entry.get(id); if (!e || e.text !== text || e.aliasOf || !ix.theme.has(tid)) return false; return linkE(e, tid, typ, why, x); };
const swapIf = (tid, fromId, fromText, toId, toText, why, x) => { const f = ix.entry.get(fromId), t = ix.entry.get(toId); if (!f || !t || f.text !== fromText || t.text !== toText || t.aliasOf) return; swap(tid, f, t, why, x); };

// =================================================================================================
sec('1. Twins and the tree');
if (ix.theme.has('fermented_foods_and_drinks')) {
  linkIf(18876, 'umeboshi', 'fermented_foods', 5, 'from fermented foods and drinks, merged into fermented foods (the only word it lacked; v433 and v434 named the pair)');
  dropTheme('fermented_foods_and_drinks', 'a twin of fermented foods (Food & Drink): 9 of its 10 words are there and umeboshi moved (TIDY-UP.md known item; theme-twin)'); }
if (ix.theme.has('things_on_wheels')) {
  linkIf(25767, 'trolley', 'things_with_wheels', 3, 'from things on wheels, merged into things with wheels');
  if (linkIf(39779, 'roller skate', 'things_with_wheels', 2, 'from things on wheels, merged into things with wheels') && ix.entry.get(40182)?.typ.things_with_wheels !== undefined)
    addToGroup('things_with_wheels', [40182, 39779], 'skate [roller skate] and roller skate are one answer');
  dropTheme('things_on_wheels', 'a twin of things with wheels (10 of its 12 words there; Home & Everyday named the pair: theme-twin); trolley and roller skate moved, pram [boat] (v441: stroller) stays in small boats'); }
if (ix.theme.has('reading_material')) {
  linkIf(13566, 'comic book', 'things_you_read', 3, 'from reading material, merged into things you read');
  dropTheme('reading_material', 'a twin of things you read (Language & Wordplay; 10 of its 11 words, comic book moved) and of media and communication (9 of 11): theme-twin; it sat under things made of paper as a property it is not'); }
if (ix.theme.has('aircraft')) {
  if (linkIf(39497, 'airship', 'flying_machines', 3, 'from aircraft, merged into flying machines')) {
    const g = (T('flying_machines').groups || []).find(g => g.includes(2751) || g.includes(29348));
    if (g || (E(2751).typ.flying_machines !== undefined && E(29348).typ.flying_machines !== undefined)) addToGroup('flying_machines', [...new Set([...(g || []), 2751, 29348, 39497])].filter(id => E(id).typ.flying_machines !== undefined), 'blimp, zeppelin and airship are one answer (as in aircraft)'); }
  dropTheme('aircraft', 'a twin of flying machines (Travel & Transport; 14 of its 15 words, airship moved): theme-twin'); }
dropTheme('confectionery', 'a twin of candy (Food & Drink; 11 of its 15 words) and of desserts and sweets (13 of 15): theme-twin; chocolate, candy, marzipan and praline stay in sweet foods');
dropTheme('fragrant_flowers', 'a twin of sweet-smelling flowers (Nature & Earth; 15 of its 16 words): theme-twin; roses stays in things that smell good');
if (ix.theme.has('toys_and_characters')) {
  linkIf(40208, 'Mr. Potato Head', 'things_with_eyes', 3, 'from toys and characters with eyes, merged into things with eyes');
  dropTheme('toys_and_characters', 'a 29-character name (theme-name-long) for 9 words, 8 of them already in its parent things with eyes; Mr. Potato Head moved'); }

// =================================================================================================
sec('2. Synonym themes ("words for X"): no synonym groups, no topic word, no wrong sense');
const SYN = ['words_for_big', 'words_for_small', 'words_for_fast', 'words_for_good', 'words_for_bad', 'words_for_smart', 'words_for_strange', 'words_for_pretty', 'words_for_old', 'words_for_noise', 'feeling_tired', 'words_for_hot', 'words_for_cold', 'words_for_shiny', 'words_for_dark'];
for (const tid of SYN) dropGroups(tid, 'themes of synonyms take no synonym groups (LIBRARY-RULES 5): every member is the same answer by design (TIDY-UP.md known item for words for big and small)');
for (const [tid, id, text] of [['words_for_hot', 27978, 'hot'], ['words_for_fast', 11101, 'fast'], ['words_for_small', 39289, 'small'], ['words_for_smart', 29046, 'smart'], ['words_for_strange', 39417, 'strange'],
  ['words_for_pretty', 39442, 'pretty'], ['words_for_old', 39471, 'old'], ['words_for_cold', 39943, 'cold'], ['words_for_dark', 28162, 'dark'], ['words_for_shiny', 40021, 'shiny']])
  out(tid, [[id, text]], 'the topic word itself: the theme name gives it away (it was let through with nameOkIn); a word for X is another word');
out('words_for_big', [[1562, 'mammoth'], [1563, 'woolly mammoth'], [21085, 'Titanic']], 'the animal or the ship, not the adjective (mammoth, titanic = huge); woolly mammoth was grouped with mammoth');
out('words_for_small', [[1473, 'bantam']], 'the chicken breed, not an adjective for small');
swapIf('words_for_small', 16224, 'compact', 28806, 'compact', 'compact [small], the adjective; compact [makeup] is the powder case', { typ: 4 });
out('words_for_fast', [[34689, 'fleet'], [2618, 'turbocharger']], 'fleet [ships] is a group of ships (the adjective fleet is not in the library); a turbocharger is an engine part');
swapIf('words_for_good', 32045, 'swell', 27266, 'swell', 'swell [fine], the slang adjective; swell [ocean] is the sea swell');
out('words_for_bad', [[50889, 'bad dog'], [23972, 'trash']], 'bad dog (shown "bad") is the topic word in disguise; trash is a noun (garbage), not an adjective for bad');
out('words_for_hot', [[14804, 'sticky'], [2020, 'sunny'], [2027, 'muggy'], [31443, 'humid']], 'weather or texture, not hot: sticky [tacky] (v436 took it out of hot weather talk for the same reason), sunny, muggy and humid (in hot weather talk)');
out('words_for_cold', [[39202, 'bitter'], [32061, 'Arctic']], 'the wrong sense: bitter [taste] and Arctic [region] (the place) are linked; the cold senses are not in the library');
{ const r = ix.entry.get(39951); if (r && r.text === 'raw' && r.typ.words_for_cold !== undefined) setE(r, 'gloss', 'cold and damp', 'its one link is words for cold (a raw wind); "uncooked" named another sense'); }
{ const s = ix.entry.get(50116); if (s && s.text === 'Sooty') { out('words_for_dark', [[50116, 'Sooty']], 'Sooty is the UK puppet bear (a name), not the adjective sooty'); setE(s, 'gloss', 'puppet bear', 'the puppet; "soot-black" described the adjective it was mistaken for'); } }

// =================================================================================================
sec('3. Colors');
mergeInto(7744, 'navy blue', 50057, 'navy', 'abbreviation', 1, 'the short name of the same color (navy blue is in shades of blue shown "navy"); two roots of one sense', { keepShow: true });
setE(chk(7744, 'navy blue'), 'gloss', 'color', 'US spelling of the label (as the other color entries)');
mergeInto(7670, 'sable', 38717, 'sable', 'synonym', 4, 'sable [black] is the same color word as sable [color] (sense-link, sense-twin)');
setE(chk(7670, 'sable'), 'fam', 4, 'as the merged sable [black]: the color word is known to people with the interest (reviewer)');
for (const [tid, list, why] of [
  [['shades_of_brown', 'drink_shades', 'colors_named_after_foods'], [[961, 'java']], 'java is slang for coffee, not a color name (coffee is there; it was grouped with it)'],
  [['shades_of_red', 'drink_shades', 'colors_named_after_foods'], [[965, 'vino']], 'vino is slang for wine, not a color name (red wine and wine are there; it was grouped with them)'],
  [['metallic_colors'], [[876, 'champagne'], [966, 'bubbly']], 'champagne [drink] and bubbly are the drink (sense-twin: the color champagne is not in the library)'],
  [['shades_of_gray'], [[1975, 'pea-souper'], [1976, 'haar'], [2066, 'plumbago']], 'kinds of fog and the mineral plumbago are not gray shades (they were grouped with fog and graphite)'],
  [['shades_of_black'], [[2066, 'plumbago'], [2077, 'volcanic glass'], [6444, 'noir']], 'not a color name: plumbago and volcanic glass (grouped with graphite and obsidian), noir [film genre] (the film style)'],
  [['colors_named_after_gems'], [[2077, 'volcanic glass']], 'not a color name (obsidian is there)'],
  [['colors_named_after_foods'], [[18934, 'bisque']], 'the color bisque is named after unglazed pottery, not the soup'],
  [['colors_named_after_animals'], [[7776, 'sand cat']], 'an animal; there is no color sand cat'],
  [['colors_named_after_places'], [[7685, 'fuchsia']], 'named after the botanist Leonhart Fuchs (a person), not a place']]) for (const t of tid) out(t, list, why);
setE(chk(7743, 'eau de nil'), 'type', 'common', 'a color name, not an idiom (type phrase is for idioms)');
setE(chk(6444, 'noir'), 'type', 'common', 'a film style, a common noun (contract-type-common)');
for (const [id, text] of [[38633, 'bay'], [38635, 'dun']]) mergeInto(id === 38633 ? 9523 : 9530, text, id, text, 'synonym', 3, `${text} [color] is the horse coat color, the same sense as ${text} [horse color] (sense-twin)`);

// =================================================================================================
sec('4. Shapes and patterns');
split(6619, 'pyramid', ['3d_shapes'], 'pyramid', 'shape', { fam: 1 }, 'the solid shape (6619 is the monument; it stays in huge things, triangular things and things with faces)');
setE(chk(19788, 'cube'), 'pos', 'noun', 'the shape, a noun');
split(12548, 'harlequin', ['patterns'], 'harlequin', 'pattern', { fam: 4 }, 'the diamond-check pattern (12548 is the clown character)');
addToGroup('symbols', [4617, 26141, 26128].filter(id => E(id).typ.symbols !== undefined), 'hashtag, octothorpe and pound sign are one symbol (#)');
out('round_things', [[43935, 'discus throw']], 'the event, not the round discus (which is there)');
out('square_things', [[12096, 'polaroid']], 'the camera is not square (the photo is)');
out('oval_things', [[5207, 'American football']], 'the sport, not the ball (rugby ball is there)');

// =================================================================================================
sec('5. Materials');
out('hard_materials', [[39004, 'anvil']], 'a tool, not a material');
mergeInto(39010, 'plastic wrap', 39022, 'cling wrap', 'regional', 2, 'the Australian and NZ word for plastic wrap (its UK word cling film is an alias already)', { region: ['AU', 'NZ'] });
for (const [stub, st, full, ft, typ] of [[66150, 'shot', 48819, 'shot glass', 2], [66151, 'wine', 20141, 'wine glass', 1]]) {
  const s = ix.entry.get(stub); if (!s || s.text !== st) continue;
  swap('things_made_of_glass', s, chk(full, ft), 'the full name, linked with nameOkIn like drinking glass and magnifying glass', { typ, nameOk: true, outWhy: `a bare stub of ${ft} made for this theme` });
  delE(stub, st, `a bare stub of ${ft} made for things made of glass (LIBRARY-RULES 5); in no theme${stub === 66150 ? ' (contract-type-common)' : ''}`); }
mergeInto(24652, 'cowboy boots', 55462, 'western boots', 'synonym', 2, 'another name of the same boots (grouped as one answer)', { del: 'as an alias its text would repeat western and boot in western wear and boots (theme-name)' });
typeCommon([[6807, 'skull and crossbones'], [5053, 'hook-and-loop'], [5930, 'rocking horse'], [7012, 'crystal ball'], [5881, 'stained glass'], [6793, 'treasure chest'], [5920, 'teddy bear'],
  [5971, 'plush toy'], [5969, 'fidget spinner'], [5945, 'bouncy castle'], [6283, 'bunny hop'], [39864, 'pitch drop'], [39523, 'dead weight'], [39754, 'frankincense and myrrh'], [4602, 'two-way radio'], [5845, 'game console']],
  'a name of a thing, not an idiom (type phrase is for idioms and set phrases)');

// =================================================================================================
sec('6. Textures');
swapIf('soft_things', 32091, 'sherpa', 25752, 'sherpa', 'the fleece fabric, not the mountain guide (sense-link)');
out('sticky_things', [[355, 'honeydew'], [356, 'honeydew melon']], 'the melon; the sticky honeydew is the aphids\' secretion, not in the library (TIDY-UP.md, wrong-sense list)');
swapIf('sticky_things', 39068, 'paste', 23809, 'paste', 'the adhesive, not the computer command');
mergeInto(23326, 'chewing gum', 39064, 'gum', 'synonym', 1, 'gum [chewing] is chewing gum: two roots of one sense');
out('prickly_things', [[503, 'uni']], 'the food (sea urchin roe), not the spiky animal; sea urchin is there');
dropTheme('animals_covered_in_spikes', 'a twin of spiny animals (Animals; 7 of its 9 words, and uni is the food; with uni out theme-twin fires: 7 of 8); spiny anteater, grouped with echidna there, stays in its other themes');
{ const b = ix.entry.get(39096); if (b && b.text === 'burr') { setE(b, 'gloss', 'prickly seed', 'its one use is the prickly seed head (with cocklebur and burdock); "rough edge" named another sense'); out('machine_sounds', [[39096, 'burr']], 'the prickly seed, not the whirring sound'); } }
setE(chk(67169, 'knobby'), 'region', [], 'the US root of a regional pair: untagged, as color is (v413); its UK word knobbly is its regional alias (contract-root-region)');

// =================================================================================================
sec('7. Tastes');
swapIf('spicy_foods', 24938, 'madras', 53521, 'madras', 'the curry, not the fabric (madras [curry] is in spicy dishes of Asia)');
out('things_that_melt', [[609, 'lollipop'], [610, 'lolly']], 'a hard candy does not melt like an ice pop; lolly [lollipop or ice pop] was grouped with both (popsicle and ice pop stay)');
out('things_that_pop', [[609, 'lollipop'], [610, 'lolly'], [966, 'bubbly'], [967, 'fizz']], 'a lollipop does not pop; bubbly and fizz are other names of champagne, which stays');
mergeInto(39162, 'salt cod', 62445, 'bacalao', 'translation', 4, 'the Spanish and Portuguese name of salt cod (grouped as one answer)');
mergeInto(39187, 'bonito flakes', 39195, 'katsuobushi', 'translation', 5, 'the Japanese name of bonito flakes (grouped as one answer in three themes)');
mergeInto(53141, 'pappadum', 62475, 'papadum', 'spelling', 3, 'one word written two ways (grouped)');
mergeInto(18768, 'piri piri', 62453, 'piri-piri', 'spelling', 3, 'one word written two ways (grouped)');
mergeInto(18768, 'piri piri', 57878, 'pili pili', 'spelling', 5, 'the same chili sauce, another spelling (grouped in spicy dishes of Africa)');
mergeInto(57843, 'tapioca pearls', 57844, 'boba', 'synonym', 3, 'the same pearls (grouped)');
mergeInto(57843, 'tapioca pearls', 57845, 'bubble tea pearls', 'synonym', 3, 'the same pearls (grouped)');
setE(chk(39199, 'Maggi'), 'type', 'org', 'a brand (tm), written with a capital');
setE(chk(19904, 'kipper'), 'pos', 'noun', 'the fish, a noun');
out('bitter_foods', [[968, 'brew'], [969, 'brewski'], [961, 'java']], 'slang for beer and coffee, grouped with beer and coffee, which stay');
{ const c = chk(628, 'cotton candy'); if (c.show?.american_candy) { setShow(c, 'american_candy', null, 'a show may not stand on an entry with regional and spelling aliases (candy floss, candyfloss); "cotton" alone does not say cotton candy'); addNameOk(c, 'american_candy', 'the full name, as candy corn, candy cane and rock candy'); } }

// =================================================================================================
sec('8. Sounds and smells');
setE(chk(35287, 'squelch'), 'fam', 3, 'many adults know squelch (it was rated as rare as susurration)');
out('onomatopoeia', [[20001, 'whizz']], 'whizz [blend] is the UK verb for using a blender, not the sound');
out('machine_sounds', [[20001, 'whizz']], 'whizz [blend] is the UK verb for using a blender, not the sound');
{ const p = ix.entry.get(5276); if (p && p.typ.machine_sounds !== undefined) {
  out('racket_and_target_sports', [[5276, 'Putt-Putt']], 'a brand of mini golf, beside mini golf (overlap; as v442 does, which applies first)');
  setE(p, 'gloss', 'mini golf brand', 'the Putt-Putt mini golf brand; the engine sound gets its own entry');
  const s = newEntry('putt-putt', 'engine sound', { pos: 'other', type: 'common', fam: 3 }, 'the sound of a small engine (v442 follow-up: Putt-Putt [brand] held the link)');
  swap('machine_sounds', p, s, 'the lowercase sound word, not the brand'); } }
out('quiet_things', [[1975, 'pea-souper'], [1976, 'haar']], 'kinds of fog (grouped with fog, which stays)');
out('water_sounds', [[1991, 'mizzle'], [10190, 'roar']], 'mizzle is fine rain, not a sound; roar [animal] is the animal sound');
for (const t of ['things_that_smell_good', 'smells_from_the_kitchen', 'candle_scents']) out(t, [[961, 'java']], 'slang for coffee, grouped with coffee, which stays');
mergeInto(18706, "za'atar", 39757, 'zaatar', 'spelling', 4, 'one word written two ways (grouped)');
swapIf('middle_eastern_scents', 10540, 'oud', 16292, 'oud', 'oud [perfume] (agarwood oil), the scent the note names first; oud [instrument] is the lute', { typ: 1 });

// =================================================================================================
sec('9. Motion, size, temperature, light');
out('motion_verbs', [[61248, 'Scud']], 'the Scud missile (a name), not the verb scud');
mergeInto(43170, 'dart', 39774, 'dart', 'synonym', 1, 'dart [missile] is the same thrown dart as dart [darts] (v442 follow-up)');
{ const d = ix.entry.get(39831); if (d && d.text === 'dasher') { out('fast_things', [[39831, 'dasher']], 'not a word in use for a sprinter'); delE(39831, 'dasher', 'a made-up sense made for fast things; in no theme'); } }
swapIf('blue_things', 14718, 'sonic', 45815, 'Sonic', 'Sonic the Hedgehog, the blue game character, not the adjective sonic', { typ: 3 });
out('fast_things', [[14718, 'sonic']], 'the adjective (of sound), not a fast thing; Sonic [hedgehog] would trip the case lint in this theme of common words (case-sense-proper)');
setE(chk(14718, 'sonic'), 'tm', false, 'the adjective (of sound) is not a trademark; the game character is its own entry');
swapIf('ways_to_jump', 21241, 'cannonball', 43323, 'cannonball', 'the cannonball dive, not the ammunition', { typ: 4 });
if (E(39855).typ.ways_to_jump !== undefined && E(39841).typ.ways_to_jump !== undefined) addToGroup('ways_to_jump', [39841, 39855], 'broad jump is the old US name of the long jump: one answer');
mergeInto(39523, 'dead weight', 39876, 'deadweight', 'spelling', 4, 'one word written two ways');
out('things_that_sink', [[28671, 'plummet']], 'a verb, not a thing');
out('hot_things', [[972, 'broil'], [961, 'java']], 'broil is a US cooking verb (grouped with grill); java is slang for coffee (grouped with coffee)');
mergeInto(3125, 'tank', 39517, 'tank', 'synonym', 1, 'tank [vehicle] is the military tank (sense-twin)');
{ const h = ix.entry.get(39977); if (h && h.text === 'halo') { swapIf('things_that_glow', 39977, 'halo', 34275, 'halo', 'the glowing halo of an angel or saint (reviewer); the sky halo [light] 31404 is a ring seen around the sun or moon', { outWhy: 'a second root of halo made for things that glow' });
  delE(39977, 'halo', 'a second root of halo made for things that glow (sense-twin with halo [light]); in no theme'); } }
// mirror ball stays a root grouped with disco ball: in ___ ball (compound) mirror and disco are different answers (reviewer)

// =================================================================================================
sec('10. Things by color');
out('black_things', [[4511, 'greenboard'], [961, 'java'], [2066, 'plumbago'], [2077, 'volcanic glass']], 'a greenboard is green; java, plumbago and volcanic glass are other names of coffee, graphite and obsidian, which stay');
out('dark_foods_and_drinks', [[961, 'java']], 'slang for coffee, which stays');
for (const t of ['dark_creatures', 'black_things']) swapIf(t, 29938, 'raven', 1083, 'raven', 'the bird, not the color raven');
mergeInto(30472, 'tiger lily', 40139, 'tigerlily', 'spelling', 4, 'one word written two ways (grouped)');
{ const c = ix.entry.get(238); if (c) swapIf('orange_things', 38122, 'Cheddar', 238, c.text, 'the (orange) cheese, not the village', { typ: 4 }); }
{ const b = ix.entry.get(40118); if (b && b.text === 'bluetit') {
  out('blue_things', [[40118, 'bluetit']], 'a stub for blue tit made for this theme (the bird is blue tit 8166, which would leak "blue"); flagged offensive, it never played');
  delAlias(40119, 'blue tit', 'the alias of the stub bluetit');
  delE(40118, 'bluetit', 'a stub of blue tit 8166 (offensive-unlisted: flagged for "tit" in a one-word spelling); in no theme'); } }
{ const g = ix.entry.get(50023); if (g && g.text === 'grimace') { out('purple_things', [[50023, 'grimace']], 'the McDonald\'s mascot Grimace entered lowercase: players read grimace [expression] 16785; a capital Grimace trips case-sense-proper here');
  delE(50023, 'grimace', 'a lowercase stub of the mascot made for purple things; in no theme'); } }
out('brown_things', [[963, 'cuppa']], 'British slang for a cup of tea, grouped with tea, which stays (region-root-equiv)');
setE(chk(28051, 'mud'), 'fam', 1, 'every child knows mud (mud [color] is 1)');
mergeInto(38366, 'fire hydrant', 28342, 'hydrant', 'abbreviation', 2, 'the short name of the same hydrant (grouped in red things and street furniture)');

// =================================================================================================
sec('11. Things with ..., things that ...');
{ const m = ix.entry.get(40194); if (m && m.text === 'mitre') { out('things_with_teeth', [[40194, 'mitre']], 'a miter joint has no teeth'); delE(40194, 'mitre', 'a UK-spelled stub made for things with teeth; in no theme'); } }
mergeInto(23705, 'washer', 40232, 'washer', 'synonym', 2, 'washer [hardware] is the same washer as washer [fastener]');
mergeInto(24293, 'safe', 40166, 'safe', 'synonym', 2, 'safe [vault] is the same safe as safe [strongbox]');
mergeInto(40219, 'bell', 28550, 'bell', 'synonym', 1, 'bell [chime] is the same bell as bell [ringing]');
out('things_with_holes', [[39662, 'piercing']], 'the adjective (a piercing sound), not a body piercing');
swapIf('things_with_holes', 973, 'sieve', 25770, 'sieve', 'the kitchen tool, not the verb', { typ: 2 });
mergeInto(9819, "Portuguese man o' war", 40247, "man o' war", 'synonym', 3, 'the short name of the Portuguese man o\' war (a stub made for things that sting)');
mergeInto(9819, "Portuguese man o' war", 40250, 'bluebottle', 'regional', 3, 'the Australian name of the man o\' war (region-root-equiv in things that sting)', { region: ['AU'] });
out('things_that_sting', [[503, 'uni']], 'the food (sea urchin roe); sea urchin is there');
mergeInto(39575, 'paper plane', 49987, 'paper airplane', 'synonym', 1, 'the same toy (its US name)', { del: 'as an alias its text would repeat paper in paper crafts and things made of paper (theme-name)' });
// =================================================================================================
sec("13. Reviewer's fixes (2026-11-23)");
out('words_for_hot', [[31463, 'warm'], [2029, 'sultry'], [39933, 'close'], [31449, 'oppressive'], [32028, 'tropical'], [39941, 'sweaty']],
  'not a word for hot: warm [not hot] by its own gloss; sultry, close, oppressive, tropical and sweaty describe weather or the body, as sunny, muggy and humid (reviewer)');
out('words_for_cold', [[39966, 'tepid'], [39964, 'snowy']], 'not a word for cold: tepid is lukewarm; snowy describes snow cover (reviewer)');
out('words_for_dark', [[40077, 'swarthy']], 'a skin-tone word (sensitive), not a word for dark light (reviewer)');
out('colors_named_after_flowers', [[1694, 'tulip'], [1695, 'daisy'], [1696, 'sunflower'], [1697, 'lily'], [1699, 'daffodil'], [1700, 'narcissus'], [1704, 'carnation'], [1705, 'dianthus'], [1717, 'peony'], [1727, 'dandelion'],
  [1732, 'foxglove'], [1737, 'camellia'], [1738, 'azalea'], [1741, 'lupine'], [1716, 'hibiscus'], [1707, 'pansy'], [1713, 'hyacinth']], 'a flower, not a color name (as sand cat in animal-named colors; reviewer)');
out('red_things', [[7710, 'vermilion'], [7725, 'carmine'], [7736, 'madder'], [38822, 'cochineal']], 'a color word, not a red thing: a property theme links things (reviewer)');
out('blue_things', [[66, 'turquoise'], [6, 'indigo'], [63, 'cobalt'], [64, 'azure'], [72, 'ultramarine'], [7729, 'Prussian blue']], 'a color word, not a blue thing: a property theme links things (reviewer)');
for (const t of ['things_with_eyes', 'things_with_teeth', 'things_with_tongues', 'things_with_tails'])
  out(t, [[1439, 'doggo'], [1436, 'hound'], [1438, 'mutt'], [1437, 'pooch'], [1442, 'kitty'], [1136, 'serpent']], 'padding: another word for dog, cat or snake beside dog, cat and snake (reviewer)');
out('things_with_eyes', [[2008, 'cyclone'], [2009, 'typhoon']], 'padding beside hurricane (one storm with an eye; reviewer)');
out('shades_of_white', [[1664, 'magnolia']], 'the tree; the color magnolia is not in the library (reviewer)');
out('things_with_holes', [[24102, 'doorknob'], [24103, 'door handle']], 'no hole of its own (reviewer)');

// =================================================================================================
sec('14. Simon (2026-11-23, "Take all and apply")');
{ const l = ix.entry.get(610), lp = chk(609, 'lollipop');
  if (l && l.text === 'lolly' && !l.aliasOf && l.gloss !== 'sweets') {
    setE(l, 'gloss', 'sweets', 'Simon: lolly is split; this root keeps the Australian sense (sweets, candy in general), its lollipop sense becomes an alias of lollipop');
    setE(l, 'region', ['AU'], 'the sweets sense is Australian');
    for (const tid of linkIds(P, l).filter(t => t !== 'australian_slang')) if (lp.typ[tid] !== undefined) unlinkE(l, tid, 'the lollipop sense, now an alias of lollipop, which is here (they were grouped); lolly [sweets] stays in Australian slang'); else swap(tid, l, lp,'the lollipop sense: lollipop takes the link (Simon: lolly [lollipop] is its UK and AU alias)', { outWhy: 'the lollipop sense, now an alias of lollipop; lolly [sweets] stays in Australian slang' }); }
  newAlias(609, 'lolly', 'lollipop', 'regional', 2, ['UK', 'AU'], 'Simon: the UK and Australian word for a lollipop (region-root-equiv: lolly was a regional root grouped with lollipop)'); }
linkIf(40021, 'shiny', 'texture_words', 2, 'Simon: a texture word beside glossy and matte (it left words for shiny as its topic word)');
out('hot_weather_words', [[31448, 'torrid'], [39936, 'canicular'], [31465, 'searing'], [31464, 'broiling'], [31445, 'sizzling']],
  'Simon: a literary or plain synonym of hot, not how people talk about hot weather (in words for hot); boiling, roasting and baking stay');
if (CASE_OK.has('57763|colors_named_after_places')) swapIf('colors_named_after_places', 19663, 'Bordeaux', 57763, 'bordeaux', 'Simon: the color bordeaux (as in jewel tones), not the wine (sense-link); allowed lowercase here by js/caselint-allow.js');
else A.push('  (Bordeaux swap waits for the case allow key 57763|colors_named_after_places in js/caselint-allow.js: add it, then rerun)');

for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');

// =================================================================================================
sec('12. First synonym alias (game flag 512): no harder than the root + 1');
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
const summary = [`Library batch v447: tidy-up step 3, Qualities (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch447-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch447-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch447-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

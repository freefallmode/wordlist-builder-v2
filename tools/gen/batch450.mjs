// Library batch v450: the follow-up batch of the library tidy-up (TIDY-UP.md, "Left for the tree batch and later"), library-wide:
//   1. hard first synonyms (the game shows a root's first synonym alias at some levels: no harder than the root's familiarity + 1);
//   2. translations stored as roots made translation aliases of the known name; 3. foods named after places holds foods only;
//   4. the dinosaur capital pass (genus names lowercase).
// Base: library v447. Applied after v448 (tree) and v449 (diacritics): everything here works by entry id + text and theme id, never by
// position, and every step is skipped when it is already done or its entry is gone or changed (rerun: 0 changes).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch450.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const inGroup = () => true;   // library-wide
const groupThemes = () => P.themes.filter(t => !t.group).map(t => t.id);
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

// ---------- helpers of this batch (v450) ----------
// An entry by id + text, or null (and a note) when another batch has deleted or retyped it: v448 and v449 apply first.
const live = (id, text, what = '') => { const e = ix.entry.get(id); if (e && e.text === text) return e; A.push(`  (skipped: ${text} ${id}${what ? ' ' + what : ''}: ${e ? `now "${e.text}"` : 'gone'})`); return null; };
const rootThemes = r => linkIds(P, r).filter(t => ix.theme.has(t));
const wordIn = (s, w) => new RegExp(`(^|[^\\p{L}])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^\\p{L}]|$)`, 'iu').test(s || '');
// Delete a hard first synonym alias: refused when a theme of its root shows its text, or a theme note names it.
const dropAlias = (id, text, why) => {
  const a = ix.entry.get(id); if (!a) return; if (a.text !== text) { A.push(`  (skipped: ${text} ${id}: now "${a.text}")`); return; }
  if (!a.aliasOf) { A.push(`  (skipped: ${text} ${id}: no longer an alias)`); return; }
  const r = E(a.aliasOf);
  for (const t of rootThemes(r)) { if (r.show?.[t] === a.text) throw Error(`${lab(r)} shows "${a.text}" in ${t}`); if (wordIn(T(t).note, a.text)) throw Error(`the note of ${t} names ${a.text}`); }
  delAlias(id, text, why);
};
const setKind = (id, text, kind, why, fam) => {
  const a = live(id, text); if (!a) return; if (!a.aliasOf) { A.push(`  (skipped: ${text} ${id}: no longer an alias)`); return; }
  if (a.aliasKind !== kind) { A.push(`${lab(a)} (alias of ${lab(E(a.aliasOf))}): kind ${a.aliasKind} -> ${kind}: ${why}`); a.aliasKind = kind; n++; reindex(P); }
  if (fam !== undefined) setE(a, 'fam', fam, why);
};
const rateAlias = (id, text, fam, why) => { const a = live(id, text); if (a) setE(a, 'fam', fam, why); };
const firstSynLine = (label) => {
  const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  const bad = []; for (const [rid, list] of syn) { const r = ix.entry.get(rid); if (list[0].fam > r.fam + 1) bad.push(`${lab(r)} f${r.fam} / ${lab(list[0])} f${list[0].fam}`); }
  return { all: syn.size, bad };
};
const FS0 = firstSynLine();

// =================================================================================================
sec('1. Hard first synonyms (game flag 512: the game shows a root\'s first synonym alias, in row order, at some levels; it must be no harder than the root\'s familiarity + 1)');
A.push(`  library-wide before: ${FS0.all} roots have synonym aliases; ${FS0.bad.length} have a first synonym harder than the root + 1`);
// 1a. Deleted: obscure, not a strict synonym, or nothing needs it (no theme of the root shows it, no note names it; aliases hold no links)
for (const [id, text, why] of [
  [4531, 'dinner hall', 'a UK school word (familiarity 4), the first synonym of cafeteria (1); canteen stays its UK regional alias and lunch hall a grouped root in places in a school'],
  [1164, 'polliwog', 'a US dialect word (familiarity 5), the first synonym of tadpole (2); not the US standard word, so not a regional alias either (v447 listed it)'],
  [1165, 'pollywog', 'another spelling of polliwog (familiarity 5), the next synonym of tadpole once polliwog goes'],
  [1153, 'Komodo monitor', 'a rare name (familiarity 5), the only synonym of Komodo dragon (2)'],
  [1262, 'saithe', 'the fishmonger\'s name (familiarity 5), the first synonym of pollock (3); coley stays its UK regional alias'],
  [2346, 'Millennium Wheel', 'the name the London Eye had in 2000 (familiarity 4), its only synonym (2)'],
  [57686, 'shippon', 'a dialect word (familiarity 5), the only synonym of cowshed (3); byre stays its UK regional alias'],
  [2534, 'Old Glory', 'a US nickname of the flag (familiarity 3) as the only synonym of Stars and Stripes (1): UK players rarely know it, and a nickname is not a strict synonym'],
  [2583, 'registration plate', 'the formal UK term (familiarity 3), the first synonym of license plate (1); number plate stays its UK regional alias'],
  [49257, 'dumper truck', 'familiarity 4 as the first synonym of dump truck (1), once dumper and tipper are abbreviations; tipper truck stays its UK regional alias'],
  [15021, 'goose egg', 'US slang for a big bump on the head (familiarity 3), the only synonym of bump [injury] (1): not a strict synonym'],
  [15353, 'dosette box', 'a UK pharmacy term (familiarity 4), the only synonym of pill organizer (2); pill organiser stays its UK spelling'],
  [48561, 'jacket potatoes', 'the plural of the UK regional alias jacket potato, not a synonym (familiarity 3) of baked potato (1)'],
  [47844, 'section hand', 'a US railroad term (familiarity 5), the next synonym of track worker once gandy dancer is a root of its own'],
  [48292, 'tripometer', 'a rare word (familiarity 5), the only synonym of trip meter (3)'],
  [59179, 'gin palace', 'UK slang for a flashy motor yacht (familiarity 4), not a strict synonym of motor yacht (2); also a Victorian pub'],
  [62671, 'Mother Road', 'a nickname of Route 66 (familiarity 4), its only synonym (2)'],
  [63021, 'cachalot', 'a rare name of the sperm whale (familiarity 4), its only synonym (2; v447 listed it)'],
  [15550, 'choler', 'the old name of yellow bile (familiarity 5), its only synonym (3); the four humours note does not name it'],
  [8020, 'ratel', 'the old name of the honey badger (familiarity 5), its only synonym (3)'],
]) dropAlias(id, text, why);
// 1b. Another kind fits
setKind(3107, 'dumper', 'abbreviation', 'the short form of dumper truck (a short form is an abbreviation, which the game does not show)');
setKind(49256, 'tipper', 'abbreviation', 'the short form of tipper truck, the UK regional alias of dump truck');
setKind(63528, 'jacket', 'abbreviation', 'the short form of jacket potato, the UK regional alias of baked potato');
setKind(64794, 'estate', 'abbreviation', 'the UK short form of estate car, the UK regional alias of station wagon', 4);
// 1b2. Reviewer (standing approval): not strict synonyms, but words worth having: each becomes a root of its own in one theme (no group: a different answer)
const promote = (id, text, rootId, x, why) => {
  const a = live(id, text); if (!a) return;
  if (a.aliasOf && a.aliasOf !== rootId) { A.push(`  (skipped: ${text} ${id}: now an alias of ${a.aliasOf})`); return; }
  if (a.aliasOf) { A.push(`${lab(a)}: alias (${a.aliasKind}) of ${lab(E(rootId))} -> a root of its own: ${why}`); a.aliasOf = 0; a.aliasKind = ''; n++; reindex(P); }
  for (const f of ['type', 'region', 'fam']) if (x[f] !== undefined) setE(a, f, x[f], why);
  if (ix.theme.has(x.tid)) linkE(a, x.tid, x.typ, why); else A.push(`  (skipped: link of ${text}: theme ${x.tid} is gone)`);
};
promote(1441, 'moggy', 1440, { type: 'common', region: ['UK'], fam: 3, tid: 'british_slang', typ: 3 }, 'UK slang for a (non-pedigree) cat: not a strict synonym of cat, and as cat\'s first synonym too hard (3 for a familiarity-1 root); kept as a British slang word (reviewer)');
promote(33150, 'gandy dancer', 47833, { tid: 'nicknames_for_workers', typ: 4 }, 'old US railroad slang for a track worker: not a strict synonym, and as track worker\'s first synonym too hard (5 for 3); kept as a nickname for workers, beside sparky and chippy (reviewer)');
setKind(63142, 'nymphaea', 'translation', 'the Latin (genus) name of the water lily, as hookah has narghile as its translation; not a word to show');
// 1c. Rerated: the familiarity was too hard for the word
rateAlias(19543, 'club soda', 2, 'the everyday US word in every bar, known to UK adults from drinks menus (v447 listed it); soda water stays the US regional alias');
rateAlias(14686, 'dekko', 4, 'UK slang known to most UK adults (familiarity 4: known in its region), not to "few people"');
rateAlias(14685, 'shufti', 4, 'UK slang known to most UK adults (familiarity 4: known in its region)');
rateAlias(60879, 'squiz', 4, 'Australian slang known to most Australians (familiarity 4: known in its region)');
rateAlias(47097, 'reconnaissance plane', 3, 'reconnaissance is a word many adults know; the plain description of a spy plane');
// 1d. Row order: put an easier synonym first where one exists (none needed after 1a-1c; checked below)
{ const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  for (const [rid, list] of syn) { const r = E(rid); if (list[0].fam <= r.fam + 1) continue; const ok = list.find(a => a.fam <= r.fam + 1); if (!ok) continue;
    const i = P.entries.indexOf(ok), j = P.entries.indexOf(list[0]); P.entries.splice(i, 1); P.entries.splice(j, 0, ok); reindex(P); n++;
    A.push(`${lab(ok)} moves before ${lab(list[0])} in row order: the first synonym of ${lab(r)} (familiarity ${r.fam}) is now ${ok.text} (${ok.fam})`); } }
{ const f = firstSynLine(); A.push(`  library-wide after: ${f.all} roots have synonym aliases; ${f.bad.length} have a first synonym harder than the root + 1${f.bad.length ? ': ' + f.bad.join(', ') : ''}`); }

// =================================================================================================
sec('2. Translations stored as roots: a translation alias of the known name (links move, the better typicality kept; no theme needs the foreign text: none is lang-locked or shows it)');
for (const [keepId, keepText, goneId, goneText, fam, why] of [
  [2310, 'Eiffel Tower', 2311, 'La Tour Eiffel', 4, 'the French name of the Eiffel Tower (grouped with it in landmarks, Paris landmarks and tall things)'],
  [2338, 'Christ the Redeemer', 2339, 'Cristo Redentor', 4, 'the Portuguese name of Christ the Redeemer (grouped with it in four themes)'],
  [37099, 'Berlin TV Tower', 37100, 'Fernsehturm', 4, 'the German name of the Berlin TV Tower (grouped with it in famous towers)'],
  [37419, "St Stephen's Cathedral", 37429, 'Stephansdom', 5, "the German name of St Stephen's Cathedral, Vienna (grouped with it in famous churches)"],
  [2341, 'Arc de Triomphe', 2342, 'Arch of Triumph', 3, 'the English rendering of the Arc de Triomphe, the name English uses (grouped with it in landmarks and Paris landmarks)'],
  [57407, "Musée d'Orsay", 57408, 'Orsay Museum', 3, "the English rendering of the Musée d'Orsay, the name English uses (grouped with it in Paris landmarks)"],
  [60562, 'Great Mosque of Mecca', 37380, 'Masjid al-Haram', 3, 'the Arabic name of the Great Mosque of Mecca (grouped with it in famous mosques)'],
]) { if (!live(keepId, keepText, '(the root to keep)') || !ix.entry.get(goneId)) { A.push(`  (skipped: ${goneText} ${goneId} into ${keepText} ${keepId})`); continue; } mergeInto(keepId, keepText, goneId, goneText, 'translation', fam, why); }
// An alias is checked for theme-name like a root: one whose text holds a word of a theme name of its root gets nameOkIn there, as the real name (as v437 did for Elizabeth Tower).
for (const [id, text] of [[57408, 'Orsay Museum']]) {
  const al = ix.entry.get(id); if (!al || al.text !== text || !al.aliasOf) continue; const r = E(al.aliasOf);
  for (const t of rootThemes(r)) if (nameLeak(T(t), { ...al, nameOkIn: [] }) && !(al.nameOkIn || []).includes(t)) {
    al.nameOkIn = [...(al.nameOkIn || []), t]; n++; A.push(`${lab(al)}: nameOkIn ${t} (its text holds a word of the theme name; it is the real name)`); } }

// =================================================================================================
sec('3. foods named after places: foods only (TIDY-UP.md): each place gives its link to the food named after it, shown by the place word where the food is called so (Dijon, Parma)');
const FNP = 'foods_named_after_places';
if (ix.theme.has(FNP)) {
  const dm = ix.entry.get(38123)?.typ[FNP] !== undefined ? newEntry('Dijon mustard', '', { pos: 'noun', type: 'proper', fam: 2 }, 'the mustard named after Dijon (the theme linked the city)') : (ix.byText.get('dijon mustard') || []).find(x => !x.aliasOf);
  const kb = ix.entry.get(36054)?.typ[FNP] !== undefined ? newEntry('Kobe beef', '', { pos: 'noun', type: 'proper', fam: 3 }, 'the beef named after Kobe (the theme linked the city)') : (ix.byText.get('kobe beef') || []).find(x => !x.aliasOf);
  for (const [fromId, fromText, to, x, why] of [
    [38122, 'Cheddar', [238, 'cheddar'], { typ: 1 }, 'the cheese, not the village'],
    [38123, 'Dijon', dm && [dm.id, dm.text], { typ: 1, show: 'Dijon' }, 'the mustard, not the city'],
    [38124, 'Parma', [17798, 'Parma ham'], { typ: 1, show: 'Parma' }, 'the ham, not the city'],
    [2235, 'Peking', [17731, 'Peking duck'], { typ: 2, show: 'Peking' }, 'the duck dish, not the old name of Beijing'],
    [2249, 'Bombay', [19111, 'Bombay mix'], { typ: 4, show: 'Bombay' }, 'the snack, not the old name of Mumbai'],
    [2283, 'Kyiv', [20242, 'chicken Kiev'], { typ: 2, show: 'Kiev' }, 'the chicken dish, not the city (the theme showed "Kiev")'],
    [2290, 'Brussels', [39165, 'Brussels sprouts'], { typ: 2 }, 'the vegetable, not the city (no show: sprouts is its UK regional alias)'],
    [20922, 'Jerusalem', [17444, 'Jerusalem artichoke'], { typ: 3 }, 'the vegetable, not the city (no show: sunchoke is its US regional alias)'],
    [35818, 'Hamburg', [812, 'hamburger'], { typ: 1 }, 'the food, not the city'],
    [35819, 'Frankfurt', [29351, 'frankfurter'], { typ: 2 }, 'the sausage, not the city'],
    [36054, 'Kobe', kb && [kb.id, kb.text], { typ: 3, show: 'Kobe' }, 'the beef, not the city'],
    [36274, 'Cheshire', [17932, 'Cheshire'], { typ: 3 }, 'Cheshire [cheese], not the county'],
    [38126, 'Worcester', [773, 'Worcestershire sauce'], { typ: 3, show: 'Worcestershire' }, 'the sauce, not the city (shown "Worcestershire", as in words named after places)'],
    [38127, 'Bakewell', [18181, 'Bakewell tart'], { typ: 3, show: 'Bakewell' }, 'the tart, not the town'],
    [28046, 'eccles', [18096, 'Eccles cake'], { typ: 3, show: 'Eccles' }, 'the full name of the cake (eccles was a lowercase stub of it)'],
    [28049, 'madeira', [66364, 'Madeira cake'], { typ: 3, show: 'Madeira' }, 'the full name of the cake (madeira [cake] was a lowercase stub of it)'],
  ]) { if (!to) continue; swapIf(FNP, fromId, fromText, to[0], to[1], why, x); }
  out(FNP, [[876, 'champagne'], [19663, 'Bordeaux'], [19671, 'Chablis'], [19731, 'cognac']], 'a drink, not a food (it stays in its drinks themes and in words named after places or wines named for places)');
  out(FNP, [[36306, 'Burgundy'], [36583, 'Java']], 'a place; what is named after it is a drink (burgundy wine, java coffee), not a food');
  out(FNP, [[28041, 'jaffa'], [38125, 'Marsala'], [38131, 'Mocha']], 'a place or a stub, and no food of the library is named after it (Jaffa orange is not in the library; Marsala and mocha are drinks)');
  out('puddings', [[38127, 'Bakewell']], 'the town, not Bakewell pudding (not in the library); puddings has 28 other words');
  for (const [id, text, why] of [[28041, 'jaffa', 'a lowercase stub made for foods named after places (Jaffa oranges); in no theme'], [28046, 'eccles', 'a lowercase stub of Eccles cake made for foods named after places; in no theme'],
    [28049, 'madeira', 'a stub of Madeira cake made for foods named after places; in no theme'], [38125, 'Marsala', 'the town, a stub made for foods named after places; in no theme (Marsala [wine] stays)'],
    [38126, 'Worcester', 'the city, a stub made for foods named after places; in no theme'], [38127, 'Bakewell', 'the town, a stub made for foods named after places and puddings; in no theme'],
    [38131, 'Mocha', 'the Yemeni port, a stub made for foods named after places; in no theme (mocha [coffee] and [brown] stay)']]) {
    const e = ix.entry.get(id); if (e && e.text === text && !e.aliasOf && !linkIds(P, e).length) delE(id, text, why); }
  { const s = ix.entry.get(38129); if (s && s.text === 'Savoy' && s.type === 'place') setE(s, 'type', 'proper', 'the cabbage, a thing named after a place, typed for itself (LIBRARY-RULES 5: Limousin [cattle breed] proper)'); }
  if (dm) linkIf(dm.id, 'Dijon mustard', 'french_food', 2, 'a French food');
  if (dm) linkIf(dm.id, 'Dijon mustard', 'sauces_and_condiments', 3, 'a condiment (beside mustard: a kind beside its generic word is fine in a kinds theme)');
  if (kb) linkIf(kb.id, 'Kobe beef', 'japanese_food', 3, 'a Japanese food');
  setT(FNP, 'note', 'foods only, each named after a place; a food is shown by the place word where it is called so (Dijon, Parma, Peking, Kiev, Kobe): Dijon mustard, Parma ham, cheddar, hamburger, bologna', 'the theme holds foods now, not the place names');
}

// =================================================================================================
sec('4. Dinosaur and prehistoric animal names: lowercase (TIDY-UP.md, the capital pass): a genus used as an animal name is a common noun in Oxford and Merriam-Webster (stegosaurus, diplodocus, triceratops, already lowercase here); names with no dictionary entry follow their siblings (rule 2). Tyrannosaurus rex and T. rex keep the capital (a binomial); the periods (Jurassic, Cretaceous) are names');
for (const [id, text] of [[1552, 'Tyrannosaurus'], [1556, 'Stegosaurus'], [1557, 'Velociraptor'], [1558, 'Brontosaurus'], [1559, 'Diplodocus'], [1560, 'Brachiosaurus'], [1570, 'Allosaurus'], [1571, 'Ankylosaurus'],
  [1572, 'Spinosaurus'], [1573, 'Pteranodon'], [1574, 'Archaeopteryx'], [1575, 'Iguanodon'], [1578, 'Ichthyosaur'], [1579, 'Parasaurolophus'], [1580, 'Pachycephalosaurus'], [1581, 'Gallimimus'], [1582, 'Dilophosaurus'],
  [1583, 'Compsognathus'], [1584, 'Carnotaurus'], [1585, 'Giganotosaurus'], [1586, 'Utahraptor'], [1587, 'Dimetrodon'], [1588, 'Megatherium'], [1589, 'Deinonychus'], [1590, 'Argentinosaurus'], [1591, 'Quetzalcoatlus'],
  [1592, 'Dunkleosteus'], [1593, 'Anomalocaris'], [1594, 'Hallucigenia'], [1595, 'Elasmosaurus'], [1596, 'Titanoboa'], [1597, 'Liopleurodon'], [1598, 'Therizinosaurus'],
  [10040, 'Doedicurus'], [10041, 'Macrauchenia'], [10042, 'Toxodon'], [10043, 'Cuvieronius'], [60060, 'Homotherium'], [60061, 'Diprotodon'], [60062, 'Arctodus'], [60063, 'Procoptodon'], [60064, 'Stephanorhinus'],
  [60065, 'Mylodon'], [60066, 'Palaeoloxodon']]) {
  if (id === 1552) { const t = ix.entry.get(1553), r = ix.entry.get(1554);   // reviewer: T. rex abbreviates Tyrannosaurus rex, not tyrannosaurus
    if (t && t.text === 'T. rex' && t.aliasOf === 1552 && r && r.text === 'Tyrannosaurus rex' && !r.aliasOf) { A.push(`${lab(t)}: abbreviation of ${lab(r)} (was of ${lab(E(1552))}): the short form of the binomial (reviewer)`); t.aliasOf = 1554; t.aliasKind = 'abbreviation'; n++; reindex(P); }
    else if (t && t.aliasOf !== 1554) A.push(`  (skipped: T. rex 1553: changed by another batch)`); }
  const low = text[0].toLowerCase() + text.slice(1), e = ix.entry.get(id);
  if (!e || (e.text !== text && e.text !== low)) { A.push(`  (skipped: ${text} ${id}: ${e ? `now "${e.text}"` : 'gone'})`); continue; }
  retext(id, text, low, 'lowercase: the animal name is a common noun (stegosaurus, triceratops)', { type: 'common' });
  for (const t of Object.keys(e.show || {})) if (e.show[t] && /^[A-Z]/.test(e.show[t]) && e.show[t].toLowerCase().startsWith(low.slice(0, 3))) setShow(e, t, e.show[t][0].toLowerCase() + e.show[t].slice(1), 'the shown text follows the root\'s case');
}

for (const tid of [...touchedT]) { if (!ix.theme.has(tid)) continue; for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text'); }
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
const summary = [`Library batch v450: the tidy-up follow-up batch (hard first synonyms, translations stored as roots, foods named after places, the dinosaur capital pass). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch450-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch450-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch450-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

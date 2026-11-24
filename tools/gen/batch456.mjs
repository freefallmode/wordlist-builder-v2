// Library batch v456: the 72 themes the game found rated 1.5 or more levels easier than their words (ISSUES W11; list tools/gen/underrated-72.txt;
// Simon, 2026-11-24: "Yes, draft it"). Per theme: easy members added or word ratings fixed where plainly wrong, or the theme re-rated (ident/pop),
// eggs made playable (no theme merged). Each theme's decision and its before -> after measure is in the review.
// Base: library v455. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch456.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin, placeTheme, themeProfile, themeLocked, eff } from '../../js/model.js';
import { validate, nameLeak, isNameWord } from '../../js/validate.js';
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

// ---------- helpers of this batch (v450, reused) ----------
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

// ---------- helpers of this batch (v451) ----------
const confirm = new Set();   // entries whose group places change: status rev (LIBRARY-RULES 2: every entry a batch changes or confirms)
const ungroup = (tid, id, text, why) => { if (!ix.theme.has(tid)) return; const e = live(id, text); if (!e) return; const had = (T(tid).groups || []).some(g => g.includes(id)); leaveGroup(tid, id, why); if (had) confirm.add(id); };
const untag = (id, text, why) => { const e = live(id, text); if (e && e.region.length) setE(e, 'region', [], why); };
const tag = (id, text, region, why) => { const e = live(id, text); if (e) setE(e, 'region', region, why); };
const unlinkIf = (tids, id, text, why) => { const e = live(id, text); if (e) for (const t of tids) unlinkE(e, t, why); };
const merge = (keepId, keepText, goneId, goneText, kind, fam, why, o = {}) => { if (ix.entry.get(goneId)?.aliasOf === keepId) return; if (!live(keepId, keepText, '(the root to keep)')) return; mergeInto(keepId, keepText, goneId, goneText, kind, fam, why, o); };

// ---------- helpers of this batch (v452) ----------
// A new theme (rerun: found by id), placed after `after` under the same parent.
const newTheme = (fields, after, why) => {
  if (ix.theme.has(fields.id)) return T(fields.id);
  P.themes.push({ group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: '', ...fields });
  reindex(P); if (!placeTheme(P, fields.id, after, 'after')) throw Error('place ' + fields.id); reindex(P); n++; touchedT.add(fields.id);
  A.push(`new theme: ${fields.id} "${fields.name}" under ${T(fields.id).parent} (after ${after}), pop ${fields.pop}, ident ${fields.ident}${fields.tm ? ', tm' : ''}: ${why}`);
  return T(fields.id);
};
const linkL = (tid, list, why) => { for (const [id, text, typ, w] of list) { const e = live(id, text); if (e && !e.aliasOf) linkE(e, tid, typ, w || why); } };
const delL = (list) => { for (const [id, text, why] of list) { const e = ix.entry.get(id); if (e && e.text === text && !e.aliasOf && !linkIds(P, e).length) delE(id, text, why); } };
// Move an alias to another root (kind and region kept unless given).
const reAlias = (id, text, rootId, rootText, why, x = {}) => {
  const a = live(id, text); if (!a || !live(rootId, rootText)) return; if (!a.aliasOf) throw Error(`${lab(a)} is not an alias`);
  if (a.aliasOf !== rootId) { A.push(`${lab(a)} (${a.aliasKind}${a.region.length ? ' ' + a.region : ''}): alias of ${lab(E(a.aliasOf))} -> alias of ${lab(E(rootId))}: ${why}`); a.aliasOf = rootId; n++; reindex(P); }
  for (const f of Object.keys(x)) setE(a, f, x[f], why);
};
const KEEP = new Map();   // orphans kept on purpose: id -> reason (the review lists every orphan left, with its reason)
const keep = (ids, why) => { for (const id of ids) KEEP.set(id, why); };
const ORPH0 = P.entries.filter(e => !e.aliasOf && e.enabled !== false && !linkIds(P, e).filter(t => ix.theme.has(t)).length).map(e => e.id);

// ---------- measure (v456): the 72 themes of tools/gen/underrated-72.txt ----------
// ours: themeProfile lo (js/model.js; sensitive words count, no regional raise). game-like: as the game bands for its list (GAME-CONTRACT.md):
// roots only, not adult/offensive/sensitive, not a name word (the shown text, or a UK/US display alias of an unshown, unlocked link, is a word of the
// theme name, or the text leaks a theme-name word); band = max(familiarity incl. that display alias, typicality) + the root's regional raise, capped at 5.
// On v455 this reproduces the game's 4th-easiest band for all 72 themes.
const LIST72 = fs.readFileSync(new URL('./underrated-72.txt', import.meta.url), 'utf8').split('\n')
  .flatMap(l => { const m = l.match(/^([a-z_0-9]+) [\d.]+->\d$/); if (m) return [m[1]]; const k = l.match(/^1\.5->3: (.*)$/); return k ? k[1].trim().split(/\s+/) : []; });
if (LIST72.length !== 72) throw Error('the list has ' + LIST72.length + ' themes');
const raiseOf = e => { const r = e.region || []; if (!r.length) return 0; const uk = r.includes('UK'), us = r.includes('US'); if (uk && us) return 0;
  if (uk || us) { const o = uk ? 'US' : 'UK'; return (ix.aliases.get(e.id) || P.entries.filter(a => a.aliasOf === e.id)).some(a => (a.region || []).includes(o)) ? 0 : 1; } return 2; };
const gameLo = tid => {
  const t = ix.theme.get(tid); if (!t) return 0; const locked = themeLocked(P, t), ef = eff(P, tid);
  const b = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && e.enabled !== false && !e.adult && !e.offensive && !e.sensitive && !ef.adult).flatMap(e => {
    const sh = e.show?.[tid] || e.text, shown = !!e.show?.[tid];
    const disp = P.entries.filter(a => a.aliasOf === e.id && ['spelling', 'regional'].includes(a.aliasKind) && (a.region.includes('UK') || a.region.includes('US')));
    if (isNameWord(t, sh) || (!shown && !locked && disp.some(a => isNameWord(t, a.text))) || nameLeak(t, { ...e, text: sh })) return [];
    return [Math.min(5, Math.max(e.fam, ...(shown || locked ? [] : disp.map(a => a.fam)), e.typ[tid] || 0) + raiseOf(e))];
  }).sort((x, y) => x - y);
  return b.length >= 4 ? b[3] : 0;
};
const measure = () => Object.fromEntries(LIST72.map(tid => { const t = ix.theme.get(tid); if (!t) return [tid, null];
  return [tid, { name: t.name, pop: t.pop, ident: t.ident, td: themeDifficulty(t), our: themeProfile(P, tid).lo, game: gameLo(tid) }]; }));
const M0 = measure();
const MERGED = {};   // gone theme -> survivor (measured in its place afterwards)
const WHY = {};      // theme -> the one-line decision
const why = (tid, s) => { WHY[tid] = s; };

// ---------- this batch (v456) ----------
const famIf = (id, text, fam, w) => { const e = live(id, text); if (e) setE(e, 'fam', fam, w); };
const rateIf = (id, text, tid, typ, w) => { const e = live(id, text); if (e && ix.theme.has(tid)) rate(e, tid, typ, w); };
const mergeTheme = (goneId, keepId, w) => {
  MERGED[goneId] = keepId; if (!ix.theme.has(goneId)) return;
  if ((T(goneId).groups || []).length) throw Error(goneId + ' has synonym groups: move them first');
  for (const e of (ix.byTheme.get(goneId) || []).filter(e => !e.aliasOf && e.typ[goneId] !== undefined)) {
    const g = e.typ[goneId];
    if (e.typ[keepId] === undefined) linkE(e, keepId, g, `from its twin ${goneId}`, e.show?.[goneId] ? { show: e.show[goneId] } : {});
    else if (g < e.typ[keepId]) rate(e, keepId, g, `the better typicality, from its twin ${goneId}`);
  }
  dropTheme(goneId, w);
};
// A synonym alias becomes the root (ids kept: the alias keeps its id and text and becomes the root; the root becomes its alias), links and show move.
const promoteAlias = (aliasId, aliasText, rootId, rootText, kind, w) => {
  const a = live(aliasId, aliasText), r = live(rootId, rootText); if (!a || !r) return; if (r.aliasOf === aliasId) return;
  if (a.aliasOf !== rootId) throw Error(`${lab(a)} is not an alias of ${lab(r)}`);
  if (P.entries.some(x => x.aliasOf === rootId && x !== a)) throw Error(`${lab(r)} has other aliases`);
  if ((r.kin || []).length || Object.keys(r.use || {}).length) throw Error(`${lab(r)} has kin or use`);
  for (const t of P.themes) if ((t.groups || []).some(g => g.includes(rootId))) throw Error(`${lab(r)} is in a group of ${t.id}`);
  a.typ = { ...r.typ }; a.show = {}; a.nameOkIn = []; a.aliasOf = 0; a.aliasKind = '';
  r.typ = {}; r.show = {}; r.use = {}; r.nameOkIn = []; r.aliasOf = aliasId; r.aliasKind = kind;
  n++; for (const t of Object.keys(a.typ)) touchedT.add(t); reindex(P);
  A.push(`${lab(a)} becomes the root and ${lab(r)} its ${kind} alias (ids kept; links move: ${Object.entries(a.typ).map(([t, v]) => t + ':' + v).join(' ')}): ${w}`);
};

sec('1. Themes rated too easy for their words: ratings raised where the subject is specialist or few members are household names (LIBRARY-RULES 6, I30; as v416)');
const reRate = (tid, field, v, w) => setT(tid, field, v, w);
// identifiability: specialist knowledge, or a neighbour theme fits the four easiest members as well
// antelopes: springbok untagged below (no ident raise)
if (false) reRate('antelopes', 'ident', 3, 'gazelle, wildebeest, impala, springbok read as savanna animals or animals with horns first (neighbours); beyond them the members are specialist names (kudu, eland, oryx)');
reRate('ancient_india', 'ident', 3, 'a mixed history theme: Ganges, Sanskrit, Indus Valley, Harappa fit India or Hinduism as well; the rest is specialist history');
reRate('archangels', 'ident', 3, 'Gabriel, Michael, Raphael, Uriel: Michael and Raphael read as names or painters first; beyond the four the names are obscure (Raguel, Jophiel)');
reRate('new_zealand_animals', 'ident', 3, 'kiwi, moa, kea, kākāpō overlap Australian animals and flightless birds; beyond kiwi the members are Māori names (pūkeko, tūī, wētā)');
reRate('contemplative_practices', 'ident', 4, 'meditation, mindfulness, mantra, koan read as meditation first; that they are Buddhist practices, and vipassana, zazen, metta, jhana, is knowledge most lack');
reRate('musical_modes', 'ident', 4, 'Ionian, Dorian, Phrygian, Lydian: music theory most players lack (complete set of seven)');
reRate('rivers_of_the_underworld', 'ident', 4, 'Styx, Acheron, Lethe, Phlegethon, Cocytus: Greek myth few players know beyond Styx (complete set of five)');
reRate('south_indian_dishes', 'ident', 4, 'masala dosa, idli, rasam, sambar read as Indian food; that they are South Indian is knowledge most lack');
reRate('turkish_singers', 'ident', 4, 'Tarkan aside, every member is a Turkish name few UK/US players know (Sezen Aksu, Ajda Pekkan)');
// popularity: a narrow pick for a general UK/US player
reRate('african_languages', 'pop', 5, 'beyond Swahili, Zulu and Afrikaans the members are names few UK/US players know (Hausa, Igbo, Oromo): a niche pick');
reRate('flying_reptiles', 'pop', 5, 'pterodactyl, pteranodon, pterosaur aside, 34 specialist genus names: a niche pick');
reRate('istanbul_landmarks', 'pop', 5, 'region-tied (TR); beyond Hagia Sophia, the Blue Mosque and the Grand Bazaar the landmarks are little known outside Turkey: a niche pick');
reRate('nicknames_for_drinks', 'pop', 5, 'five of its nine words are alcohol slang (sensitive, from level 31); the others are regional slang (joe, cuppa, char): a narrow pick');
reRate('horned_and_armored_beasts', 'pop', 3, 'triceratops and stegosaurus aside, the members are specialist genus names: an ordinary pick, not a popular one');
reRate('long_necked_giants', 'pop', 3, 'brontosaurus, diplodocus and brachiosaurus aside, the sauropods are specialist genus names: an ordinary pick, not a popular one');
for (const [tid, w] of [
  ['days_of_the_week_in_french', 'a complete foreign-language set, every member familiarity 3: nothing to add; an ordinary pick'],
  ['days_of_the_week_in_spanish', 'a complete foreign-language set, every member familiarity 3-4: nothing to add; an ordinary pick'],
  ['months_in_french', 'a complete foreign-language set, mars aside every member familiarity 3-4: nothing to add; an ordinary pick'],
  ['months_in_spanish', 'a complete foreign-language set, every member familiarity 3-4: nothing to add; an ordinary pick'],
  ['phases_of_the_moon', 'a complete set: new and full aside the phases (first quarter, waxing crescent, gibbous) are familiarity 3-4; nothing to add'],
  ['seven_wonders_of_the_ancient_world', 'a complete set: the Great Pyramid aside the wonders are familiarity 3-4 (ancient history); nothing to add'],
  ['wives_of_henry_viii', 'a complete set, region-tied (UK): Anne Boleyn aside the wives are familiarity 3-4 for a general UK/US adult; nothing to add'],
]) reRate(tid, 'pop', 3, w);
reRate('main_cloud_types', 'ident', 3, 'the ten cloud genera (cirrus, stratus, cumulus, nimbostratus ...): Latin school-science names, as atmosphere layers (v416: ident 3); a complete set, nothing to add');

sec('3. Easy members added and word ratings fixed where plainly wrong');
// bats: the link sits on the species "common vampire bat" (familiarity 4); the everyday word "vampire bat" (2) takes it
{ const f = live(8053, 'common vampire bat'), t = live(8025, 'vampire bat'); if (f && t) swap('bats', f, t, 'vampire bat is the everyday word (familiarity 2); the species common vampire bat (4) made the best-known bat hard', { show: 'vampire', outWhy: 'vampire bat 8025 (familiarity 2) takes the link' }); }
delL([[8053, 'common vampire bat', 'left in no theme once vampire bat 8025 holds the bats link (orphan deleted, as in v433)']]);
// blue cheeses: Danablu is the Danish name of Danish blue, the English name
{ const d = newEntry('Danish blue', '', { pos: 'noun', type: 'proper', fam: 3, region: [] }, 'the English name of the Danish blue cheese (Danablu is its Danish name)');
  if (!d.aliasOf && d.typ.blue_cheeses === undefined) linkE(d, 'blue_cheeses', 2, 'the English name; shown "Danish" (blue is a word of the theme name), as Shropshire blue', { show: 'Danish' });
  merge(d.id, 'Danish blue', 63280, 'Danablu', 'translation', 4, 'Danablu is the Danish name of Danish blue'); }
// cell parts: plasma membrane is the textbook name of the cell membrane, the everyday school word
{ const c = newEntry('cell membrane', '', { pos: 'noun', type: 'common', fam: 2, region: [] }, 'the school word for the plasma membrane');
  if (!c.aliasOf && c.typ.cell_parts === undefined) linkE(c, 'cell_parts', 2, 'the everyday name (as cell wall, nameOkIn)', { nameOk: true });
  merge(c.id, 'cell membrane', 40904, 'plasma membrane', 'synonym', 4, 'the same membrane: plasma membrane is the textbook name'); }
// eggs
promoteAlias(64688, 'egg white', 63421, 'albumen', 'synonym', 'egg white is the everyday word (familiarity 1); albumen (4) was the root');
{ const e = live(64688, 'egg white'); if (e && !e.aliasOf && e.typ.eggs !== undefined) { if (e.show?.eggs !== 'white') setShow(e, 'eggs', 'white', 'shown short, as yolk and shell (egg is the theme name)'); rate(e, 'eggs', 2, 'a part of the egg, as yolk and shell (2)'); } }
linkL('eggs', [[8852, 'roe', 2, 'fish eggs, eaten as food; a member whose text does not repeat "egg"']]);
// yolk: the everyday word, a root; egg yolk becomes its synonym alias (links move with their typicality; the eggs show "yolk" is the text itself now)
{ const y = newEntry('yolk', '', { pos: 'noun', type: 'common', fam: 1, region: [] }, 'the yellow part of an egg: the everyday word, so that eggs has a fourth member with no "egg" token under the game\'s full-text rule');
  merge(y.id, 'yolk', 40091, 'egg yolk', 'synonym', 1, 'the same thing: egg yolk is the full name of the yolk');
  const a = live(40091, 'egg yolk'); if (a && a.aliasOf === y.id && !(a.nameOkIn || []).includes('eggs')) setE(a, 'nameOkIn', [...(a.nameOkIn || []), 'eggs'], 'the alias inherits eggs, where its full name contains egg (as egg white had)'); }
// pants and shorts, socks and hosiery, words for father
rateIf(4914, 'cargo pants', 'pants_and_shorts', 2, 'one of the commonest kinds of trousers; 3 was too peripheral');
rateIf(16064, 'bed socks', 'socks_and_hosiery', 2, 'an everyday kind of sock; 3 was too peripheral');
rateIf(32382, 'papa', 'words_for_father', 2, 'one of the first words for father (pop is 2)');
rateIf(56633, 'pa', 'words_for_father', 2, 'as papa');
// cage birds
rateIf(1093, 'canary', 'cage_birds', 1, 'the classic cage bird (a canary in a cage)');
rateIf(1472, 'lovebird', 'cage_birds', 2, 'a typical cage bird, as budgie');
// Christmas carols
rateIf(55598, 'Carol of the Bells', 'christmas_carols', 2, 'a classic carol (its name says so)');
rateIf(55599, 'Little Drummer Boy', 'christmas_carols', 2, 'a classic carol');
// data displays, storage, input devices
rateIf(41679, 'bar chart', 'data_displays', 1, 'the first data display anyone names');
rateIf(41680, 'pie chart', 'data_displays', 1, 'as bar chart');
rateIf(41703, 'line graph', 'data_displays', 2, 'a typical data display');
rateIf(41702, 'tally chart', 'data_displays', 2, 'a typical school data display');
rateIf(42232, 'flash drive', 'data_storage_devices', 2, 'the USB stick, an everyday storage device');
rateIf(42233, 'memory card', 'data_storage_devices', 2, 'a storage device by definition; 4 was far too peripheral');
rateIf(25644, 'floppy disk', 'data_storage_devices', 2, 'the classic storage medium; 4 was far too peripheral');
setKind(49999, 'jump drive', 'synonym', 'flash drive is the US word itself (LIBRARY-RULES 5: no display alias of a dialect whose word the root is); as the US display alias, jump drive (4) replaced flash drive (2) for every US player');
rateIf(4563, 'microphone', 'input_devices', 2, 'a textbook input device (keyboard, mouse, microphone, scanner); 4 was far too peripheral');
rateIf(7258, 'scanner', 'input_devices', 2, 'as microphone');
rateIf(5846, 'joystick', 'input_devices', 3, 'an input device by definition; 5 was far too peripheral');
rateIf(7376, 'stylus', 'input_devices', 3, 'an input device for touch screens; 5 was far too peripheral');
// famous mountains
famIf(18416, 'Mont Blanc', 3, 'the highest mountain in the Alps, widely known (tunnel, pens); 4 was too hard (Matterhorn and Eiger are 3)');
rateIf(31850, 'Vesuvius', 'famous_mountains', 2, 'one of the most famous mountains (Pompeii)');
rateIf(2330, 'Mount Rushmore', 'famous_mountains', 3, 'a famous mountain (the carved presidents); 5 was too peripheral');
// Greek myth objects, halogens, police equipment, supercars, sea fish, seashells
rateIf(54889, 'trident', 'greek_myth_objects', 2, 'Poseidon\'s trident, an iconic object of Greek myth');
rateIf(54888, 'thunderbolt', 'greek_myth_objects', 2, 'Zeus\'s thunderbolt, as trident');
rateIf(16654, 'iodine', 'halogens', 2, 'a core member of a complete set (as LIBRARY-RULES 4: never high just for being named later)');
rateIf(40344, 'bromine', 'halogens', 2, 'as iodine');
rateIf(29571, 'taser', 'officer_s_equipment', 2, 'standard police equipment');
rateIf(196, 'Aston Martin', 'supercar_makers', 2, 'a classic supercar maker (James Bond\'s cars)');
rateIf(482, 'anchovy', 'sea_fish', 2, 'a typical sea fish, as sardine');
rateIf(31018, 'mussel shell', 'seashells', 2, 'as oyster shell (2)');
// creamy sauces and dips
rateIf(725, 'mayonnaise', 'sauces_and_dips', 1, 'the archetypal creamy sauce');
rateIf(747, 'hummus', 'sauces_and_dips', 2, 'a typical creamy dip');
rateIf(16768, 'guacamole', 'sauces_and_dips', 2, 'a typical creamy dip');
linkL('sauces_and_dips', [[57853, 'ranch dressing', 2, 'a creamy dressing and dip (in its parent creamy foods already)']]);
// familiarity of words most adults know
famIf(11367, 're', 2, 're [solfège]: do-re-mi is known to nearly every adult (The Sound of Music); do, mi and la are 2');
famIf(9086, 'garden spider', 2, 'a plain everyday name nearly every adult knows');
famIf(14728, 'din', 2, 'an everyday word (a terrible din), as racket and uproar');
famIf(55608, 'Dasher', 2, 'the first reindeer of the song ("Dasher and Dancer and Prancer and Vixen"), known to nearly every adult');
famIf(55609, 'Dancer', 2, 'as Dasher'); rateIf(55609, 'Dancer', 'santa_s_reindeer', 2, 'a member of a complete set, named second; 3 only for being named later');
famIf(55610, 'Prancer', 2, 'as Dasher'); rateIf(55610, 'Prancer', 'santa_s_reindeer', 2, 'as Dancer');
famIf(55619, 'French hens', 2, 'three French hens: the song is known to nearly every adult (turtle doves and gold rings are 2)');
famIf(1108, 'partridge', 2, 'a well-known bird word (a partridge in a pear tree)');
// road trip games: housie is the Australian word for bingo; UK players say bingo
{ const h = live(5669, 'housie'); if (h && h.region.includes('UK')) setE(h, 'region', h.region.filter(r => r !== 'UK'), 'housie is Australian (and NZ, Indian) English; British players say bingo: tagged UK it showed housie to every UK player for bingo (band 4)'); }

// reviewer's word fixes (v456 review)
famIf(8614, 'Nile crocodile', 2, 'a famous crocodile nearly every adult has heard of');
famIf(8612, 'saltwater crocodile', 2, 'as Nile crocodile (the largest reptile, well known from wildlife TV)');
rateIf(17618, 'truffle', 'mushrooms', 2, 'a famous edible fungus, typical of the theme');
merge(8640, 'poison dart frog', 1169, 'dart frog', 'synonym', 3, 'one frog: dart frog is the short name of the poison dart frog');
{ const e = live(8640, 'poison dart frog'); if (e && e.typ.frogs_and_toads !== undefined && e.show?.frogs_and_toads !== 'poison dart') setShow(e, 'frogs_and_toads', 'poison dart', 'frog is a word of the theme name: shown short, as tree frog (tree)'); }
{ const a = live(1169, 'dart frog'); if (a && a.aliasOf === 8640 && !(a.nameOkIn || []).includes('frogs_and_toads')) setE(a, 'nameOkIn', [...(a.nameOkIn || []), 'frogs_and_toads'], 'the alias inherits frogs and toads, where its full name contains frog (as devilled eggs in v434)'); }
famIf(8640, 'poison dart frog', 2, 'a famous rainforest frog nearly every adult knows');
famIf(8641, 'common frog', 2, 'a plain everyday name');
famIf(1729, 'hydrangea', 2, 'a common garden shrub nearly every adult knows');
famIf(29998, 'pecan tree', 2, 'pecan is an everyday nut');
famIf(29999, 'pistachio tree', 2, 'pistachio is an everyday nut');
famIf(30000, 'cashew tree', 2, 'cashew is an everyday nut');
famIf(1652, 'hazel', 2, 'hazel [tree]: hazelnut, hazel eyes: an everyday word');
famIf(31899, 'outer core', 2, 'school science every adult met (crust, mantle, outer core, inner core)');
famIf(31900, 'inner core', 2, 'as outer core');
famIf(55611, 'Vixen', 2, 'as Dasher (the song)');
famIf(11370, 'fa', 2, 'fa [solfège]: do-re-mi-fa, as re');
for (const [id, text] of [[55625, 'ladies dancing'], [55628, 'drummers drumming'], [55624, 'maids a-milking'], [55626, 'lords a-leaping']]) rateIf(id, text, 'twelve_days_of_christmas_gifts', 3, 'a member of a complete set: never 4-5 just for being named later (LIBRARY-RULES 4)');
{ const s2 = live(2555, 'springbok'); if (s2 && s2.region.length) setE(s2, 'region', [], 'an animal name, world knowledge (LIBRARY-RULES 4); the ZA tag added 2 to its band everywhere (reviewer, for Simon\'s OK)'); }

// the one-line decision per theme (the review lists it with the measure)
why('places_of_worship', 'left as is (For Simon): every easy word is sensitive (church, temple, mosque, synagogue, cathedral); the theme is sensitive itself, so it plays only from level 31, where those words count (our measure: band 2)');
why('religious_festivals', 'left as is (For Simon): every easy word is sensitive (Christmas, Easter, Diwali, Hanukkah, Eid); the theme is sensitive itself, so it plays only from level 31, where those words count (our measure: band 2)');
why('antelopes', 'springbok loses its ZA tag (band 5 -> 3); ident stays 2');
why('bats', 'vampire bat (2) replaces the species common vampire bat (4)');
why('blue_cheeses', 'Danish blue (3) replaces its Danish name Danablu (4)');
why('pants_and_shorts', 'cargo pants typicality 3 -> 2 (trousers shows "pants" to US players, a name word)');
why('socks_and_hosiery', 'bed socks typicality 3 -> 2 (socks and hosiery are name words)');
why('words_for_father', 'papa and pa typicality 3 -> 2 (father, dad, daddy are one synonym group)');
for (const t of ['african_languages', 'flying_reptiles', 'istanbul_landmarks', 'nicknames_for_drinks']) why(t, 'pop 4 -> 5 (a niche pick; no easy member missing)');
for (const t of ['ancient_india', 'archangels', 'new_zealand_animals']) why(t, 'ident 2 -> 3 (specialist, or a neighbour theme fits)');
for (const t of ['contemplative_practices', 'musical_modes', 'rivers_of_the_underworld', 'south_indian_dishes', 'turkish_singers']) why(t, 'ident 3 -> 4 (specialist knowledge)');
why('horned_and_armored_beasts', 'pop 2 -> 3 (two famous dinosaurs, then genus names)');
why('long_necked_giants', 'pop 2 -> 3 (three famous dinosaurs, then genus names)');
why('crocodilians', 'Nile crocodile and saltwater crocodile familiarity 3 -> 2');
why('mushrooms', 'truffle typicality 3 -> 2 (mushroom, button mushroom, portobello, truffle)');
why('frogs_and_toads', 'dart frog becomes the alias of poison dart frog (shown "poison dart", familiarity 2); common frog familiarity 3 -> 2');
why('blue_flowers', 'hydrangea familiarity 3 -> 2; stays for the g27 floor (cornflower shows its US alias bachelor\'s button, 4)');
why('nut_trees', 'pecan, pistachio and cashew tree familiarity 3 -> 2; hazel 3 -> 2');
why('curries', 'left as is: curry, butter chicken, tikka masala, madras are band 2 or easier (our measure)');
for (const t of ['melons', 'owls', 'penguins', 'cat_breeds', 'rabbits_and_hares', 'butterflies_and_moths', 'turtles_and_tortoises', 'long_pasta', 'sushi_types', 'rvs_and_campers', 'chili_peppers', 'cloud_types']) why(t, 'left as is: no fourth easy member exists; an easy subject, so no popularity raise (the game\'s g27 floor)');
why('capsicums', 'left as is (follow-up: merge into chili_peppers; chili 29499 and chili pepper 17658 are two roots of one sense)');
for (const t of ['days_of_the_week_in_french', 'days_of_the_week_in_spanish', 'months_in_french', 'months_in_spanish', 'phases_of_the_moon', 'seven_wonders_of_the_ancient_world', 'wives_of_henry_viii']) why(t, 'pop 2 -> 3 (complete set: nothing to add, members familiarity 3)');
why('earth_s_layers', 'outer core and inner core familiarity 3 -> 2 (kept, not merged: Simon kept it in v409)');
why('layers_of_the_earth', 'outer core and inner core familiarity 3 -> 2');
why('main_cloud_types', 'ident 2 -> 3 (kept, not merged: an exact complete subset)');
why('cage_birds', 'canary typicality 3 -> 1, lovebird 3 -> 2');
why('cell_parts', 'cell membrane (2) replaces the textbook plasma membrane (4)');
why('christmas_carols', 'Carol of the Bells and Little Drummer Boy typicality 3 -> 2 (the religious carols are sensitive)');
why('data_displays', 'bar chart and pie chart typicality 3 -> 1, line graph and tally chart 3 -> 2');
why('data_storage_devices', 'flash drive typicality 3 -> 2, memory card and floppy disk 4 -> 2; jump drive no longer flash drive\'s US display alias');
why('eggs', 'egg white (1) becomes the root of albumen (4); roe joins; yolk becomes the root of egg yolk (eggshell, roe, yolk and one "egg" word fill a level under the full-text rule)');
why('famous_mountains', 'Vesuvius typicality 3 -> 2, Mount Rushmore 5 -> 3, Mont Blanc familiarity 4 -> 3');
why('greek_myth_objects', 'trident and thunderbolt typicality 3 -> 2');
why('halogens', 'iodine and bromine typicality 3 -> 2 (complete set)');
why('input_devices', 'microphone and scanner typicality 4 -> 2, joystick and stylus 5 -> 3');
why('officer_s_equipment', 'taser typicality 3 -> 2 (handcuffs and cuffs are one group)');
why('road_trip_games', 'housie (bingo\'s alias) loses its UK tag: UK players saw housie (4) for bingo');
why('santa_s_reindeer', 'Dasher, Dancer, Prancer, Vixen familiarity 3 -> 2; Dancer and Prancer typicality 3 -> 2 (complete set)');
why('sauces_and_dips', 'mayonnaise typicality 3 -> 1, hummus and guacamole 3 -> 2; ranch dressing joins');
why('sea_fish', 'anchovy typicality 3 -> 2');
why('seashells', 'mussel shell typicality 3 -> 2');
why('solfege_notes', 're and fa familiarity 3 -> 2 (complete set)');
why('spiders', 'garden spider familiarity 3 -> 2');
why('supercar_makers', 'Aston Martin typicality 3 -> 2');
why('twelve_days_of_christmas_gifts', 'French hens and partridge familiarity 3 -> 2; four gifts typicality 4 -> 3 (complete set)');
why('words_for_noise', 'din familiarity 3 -> 2');

for (const tid of [...touchedT]) { if (!ix.theme.has(tid)) continue; for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text'); }
// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined }) && !confirm.has(e.id)) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } }
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
// ---------- the 72 themes, before -> after ----------
const M1 = measure();
const fmtM = m => m ? `pop ${m.pop} ident ${m.ident} difficulty ${m.td}, 4th-easiest band ours ${m.our || '-'} / game-like ${m.game || '-'}` : 'gone';
const within = (m, k) => !!(m && m[k] && m[k] - m.td <= 1);
const after72 = tid => M1[tid] || M1[MERGED[tid]];
const rows72 = LIST72.map(tid => { const a = M0[tid], b = after72(tid), via = !M1[tid] && MERGED[tid] ? ` (merged into ${MERGED[tid]})` : '';
  return `  ${tid}: ${fmtM(a)} -> ${fmtM(b)}${via}; within 1 band: ours ${within(a, 'our') ? 'yes' : 'no'} -> ${within(b, 'our') ? 'yes' : 'no'}, game-like ${within(a, 'game') ? 'yes' : 'no'} -> ${within(b, 'game') ? 'yes' : 'no'}. ${WHY[tid] || 'NO DECISION'}`; });
const cnt = (get, k) => LIST72.filter(tid => within(get(tid), k)).length;
const missing = LIST72.filter(tid => !WHY[tid]); if (missing.length) throw Error('no decision for ' + missing.join(', '));
const notWithin = LIST72.filter(tid => !within(after72(tid), 'game'));
const table = [`The 72 themes (tools/gen/underrated-72.txt): theme difficulty against the band of the 4th-easiest usable word, before -> after.`,
  `  ours = themeProfile lo (js/model.js: sensitive words count, no regional raise); game-like = the game's bands for its list (roots not sensitive, adult, offensive or a name word; UK/US display alias and regional raise included; it reproduces the game's list on v455).`,
  `  Within 1 band (4th-easiest band - difficulty <= 1): ours ${cnt(t => M0[t], 'our')} -> ${cnt(after72, 'our')} of 72; game-like ${cnt(t => M0[t], 'game')} -> ${cnt(after72, 'game')} of 72.`,
  `  Not within 1 band game-like after: ${notWithin.map(t => `${t} (${WHY[t]})`).join('; ') || 'none'}`,
  ...rows72];
const summary = [`Library batch v456: the 72 themes the game found rated 1.5 or more levels easier than their words (ISSUES W11; Simon, 2026-11-24: "Yes, draft it"): ratings raised where the subject is specialist, easy members added or word ratings fixed where plainly wrong, eggs made playable; themes no word can fix are left to the game's g27 floor.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp, '', ...table];
const TAIL = fs.existsSync(new URL('./batch456-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch456-review-tail.txt', import.meta.url), 'utf8') : '';
const NOTICE = fs.existsSync(new URL('./batch456-notice.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch456-notice.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + (NOTICE ? '\n' + NOTICE : ''));
fs.writeFileSync(REVIEW || new URL('./batch456-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

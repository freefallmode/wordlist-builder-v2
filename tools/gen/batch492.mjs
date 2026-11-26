// Library batch v492: fixes from the review of Julia's v476-v491 (tools/gen/review-julia-v476-v491.md): section A (clear fixes), section B
// (the first recommendation of each item) and section C (minor, with the items outside the batches); Simon, 2026-11-26: fix all "as you think best".
// Base: library v491. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch492.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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


// A new entry linked in tid. x: gloss, pos, show.
const add = (tid, text, fam, typ, why, x = {}) => { const e = newEntry(text, x.gloss || '', { pos: x.pos || 'noun', type: 'common', fam }, why); linkE(e, tid, typ, why, x.show ? { show: x.show } : {}); return e; };
const outL = (tid, list) => { for (const [id, text, why] of list) unlinkIf([tid], id, text, why); };
const grp = (tid, ids, why) => { if (ids.every(id => ix.entry.get(id) && E(id).typ[tid] !== undefined)) addToGroup(tid, ids, why); };
const rateL = (tid, list, why) => { for (const [id, text, typ] of list) { const e = live(id, text); if (e && e.typ[tid] !== undefined) rate(e, tid, typ, why); } };
const famL = (list, why) => { for (const [id, text, fam, w] of list) { const e = live(id, text); if (e) setE(e, 'fam', fam, w || why); } };
const glossIf = (id, text, gloss, why) => { const e = live(id, text); if (e && !e.gloss) setE(e, 'gloss', gloss, why); };
// Delete an entry left in no theme (a stub or a loose phrase); skipped when it is linked or has aliases.
const delStub = (id, text, why) => { const e = ix.entry.get(id); if (!e || e.text !== text) return; if (linkIds(P, e).filter(t => ix.theme.has(t)).length) { A.push(`  (kept: ${lab(e)} is still in ${linkIds(P, e).join(', ')})`); return; } delE(id, text, why); };


// ---------- this batch (v492) ----------
const linkIf2 = (tid, list, why) => { for (const [id, text, typ, w, x] of list) { const e = live(id, text); if (e && !e.aliasOf && ix.theme.has(tid)) linkE(e, tid, typ, w || why, x || {}); } };
const swapL = (tid, fromId, fromText, toId, toText, why, x) => { const f = live(fromId, fromText), t = live(toId, toText); if (f && t && !t.aliasOf) swap(tid, f, t, why, x); };
const flag = (id, text, f, v, why) => { const e = live(id, text); if (e) setE(e, f, v, why); };

sec('A1. a regional alias that shows the theme\'s own name word (I37)');
outL('things_underground', [[2647, 'subway', 'UK players see "underground", the theme\'s own name word (I37)']]);
outL('things_you_climb', [[5981, 'jungle gym', 'UK players see "climbing frame", which holds "climb" (I37); monkey bars stays']]);

sec('A2-A4. things that…');
linkIf2('things_that_cut', [[3475, 'scalpel', 2, 'a surgeon\'s blade: left out in v476 with no reason']]);
outL('things_that_tick', [[1138, 'crocodile', 'an association (Peter Pan\'s crocodile), not a thing that ticks']]);
outL('bell_types', [[2544, 'Liberty Bell', 'one bell, not a type'], [47659, 'diving bell', 'an underwater chamber, not a bell']]);
outL('baked_treats', [[18079, 'cannoli', 'the shells are fried, not baked']]);
grp('things_you_climb', [23153, 25803], 'a ladder and a stepladder: one answer');
grp('cured_fish', [18861, 62444], 'rollmops are pickled herring: one answer');

sec('A5-A9. trees, flowers, plants');
swapL('crops', 406, 'corn', 408, 'maize', 'the crop is maize; corn [vegetable] shows UK "sweetcorn"', { typ: 1 });
swapL('grasses_and_reeds', 406, 'corn', 408, 'maize', 'the grass is maize; corn [vegetable] shows UK "sweetcorn"', { typ: 3 });
grp('plant_biology', [17436, 60232], 'testa is the botanist\'s word for the seed coat: one answer');
grp('autumn_flowers', [1735, 56557], 'the Michaelmas daisy is an aster: one answer');
grp('purple_flowers', [1735, 56557], 'the Michaelmas daisy is an aster: one answer');
{ const sp = live(1801, 'mimosa');
  if (sp) { const ac = newEntry('mimosa', 'acacia flower', { pos: 'noun', type: 'common', fam: 3 }, 'the yellow winter flower of the silver wattle (Acacia dealbata), sold as mimosa');
    for (const t of ['winter_flowers', 'yellow_flowers', 'sweet_smelling_flowers']) swap(t, sp, ac, 'the yellow, sweet-smelling winter flower is the acacia; mimosa 1801 is the sensitive plant');
    setE(sp, 'gloss', 'sensitive plant', 'its text is shared with mimosa [acacia flower]; its alias is sensitive plant'); } }
linkIf2('things_that_grow_on_trees', [[30307, 'walnut', 2], [20261, 'chestnut', 2], [75, 'lime', 3], [15598, 'dates', 3], [30088, 'conker', 3]], 'a nut or fruit that grows on a tree; left out only for an info-level check');

sec('A10-A14. garden, landscapes, seashore, weather');
merge(68985, 'coloring book', 66417, 'colouring book', 'spelling', 1, 'the UK spelling of coloring book (v485 made coloring book a second root)', { region: ['UK'] });
{ const cb = live(68985, 'coloring book'); if (cb && cb.typ.blank_book !== undefined && cb.show?.blank_book === 'colouring') setShow(cb, 'blank_book', 'coloring', 'the US root shows its own first word in ___book'); }
// Hanging Gardens cannot take the link: its synonym alias Gardens of Babylon holds "garden" of the theme name (theme-name, a new warning). The city goes out alone.
outL('famous_gardens', [[6624, 'Babylon', 'the city, not a garden (Hanging Gardens cannot take the link: its alias Gardens of Babylon would leak "garden")']]);
outL('famous_gardens', [[37441, 'Tivoli Gardens', 'an amusement park, not a garden']]);
grp('rock_formations', [31088, 31076], 'a sea arch is a natural arch: one answer');
grp('water_sources', [30152, 30874, 30873], 'stream, creek and brook: one answer');
grp('countryside', [1830, 30166], 'a hedge and a hedgerow: one answer');
outL('water_sources', [[7380, 'dam', 'it holds water back; reservoir is the source'], [1974, 'fog', 'not a source of water people use']]);
outL('things_that_block_the_sun', [[24678, 'baseball cap', 'hat is there (cowboy hat was left out for the same overlap)'], [24681, 'sombrero', 'hat is there'], [24692, 'bonnet', 'hat is there'], [7131, 'eclipse', 'the event, not a thing that blocks the sun (moon is there)']]);

sec('A15-A19. seasons, rocks, earth science, habitats, environment');
linkIf2('natural_resources', [[32327, 'natural gas', 1, 'a first answer for natural resources; shown "gas" (the full name holds "natural" of the theme name)', { show: 'gas' }], [24031, 'wood', 1]], 'a first answer for natural resources');
newAlias(68994, 'carolling', '', 'spelling', 3, ['UK'], 'the UK spelling of caroling');
linkIf2('river', [[2779, 'boat', 1, 'in the theme\'s own note'], [1010, 'beaver', 2, 'the river\'s dam builder']]);
outL('river', [[2813, 'gondola', 'a Venetian canal boat']]);
outL('conservation_words', [[1001, 'giant panda', 'an emblem of conservation, not a conservation word']]);
linkIf2('rocks_and_minerals', [[202, 'gold', 2, 'a mineral (fool\'s gold is there)']]);
linkIf2('mining_words', [[2054, 'coal', 1, 'what is mined; coal mine is the place, not the same answer']]);

sec('B1. weak or figurative members of the new property themes');
outL('things_that_grow', [[7106, 'universe', 'figurative'], [33873, 'interest', 'figurative'], [28397, 'shadow', 'figurative'], [1643, 'bonsai', 'kept small, the opposite']]);
outL('things_that_hang', [[23758, 'wallpaper', '"hang wallpaper" is a verb sense; it does not hang']]);
outL('things_that_buzz', [[35500, 'crowd', 'figurative']]);
outL('things_underground', [[6988, 'hobbit', 'a fictional creature in a hole']]);
outL('things_you_climb', [[1860, 'trellis', 'plants climb it, people do not'], [32085, 'Kilimanjaro', 'Mount Everest and mountain cover it'], [32083, 'K2', 'Mount Everest and mountain cover it'], [32084, 'Matterhorn', 'Mount Everest and mountain cover it']]);
outL('autumn_fun', [[5060, 'quilting', 'not tied to autumn'], [57575, 'petting zoo', 'not tied to autumn'], [13830, 'parade', 'not tied to autumn'], [5859, 'birdwatching', 'not tied to autumn']]);
outL('winter_fun', [[48874, 'ski lodge', 'a place, not fun'], [16539, 'hot tub', 'not tied to winter'], [5922, 'jigsaw puzzle', 'not tied to winter']]);
outL('in_a_cave', [[3698, 'hibernation', 'an event, not a thing in a cave'], [995, 'wolf', 'not a cave animal'], [1767, 'moss', 'needs light: cave mouths only']]);
outL('rainy_day_fun', [[227, 'hot chocolate', 'a drink, not fun to do'], [6418, 'popcorn', 'a snack, not fun to do']]);
outL('recycling_words', [[13566, 'comic book', 'kept, not recycled']]);
outL('water_sources', [[23117, 'sink', 'where water goes, not where it comes from'], [23780, 'pipe', 'carries water'], [1844, 'hose', 'carries water'], [1846, 'sprinkler', 'spreads water']]);
outL('rock_formations', [[2086, 'geode', 'a rock, not a formation'], [30850, 'scree', 'loose stones, not a formation']]);
outL('weather', [[68983, 'climate', 'weather over years, not weather']]);

sec('B2. biomes: landforms out, forest in');
outL('biomes', [[1894, 'mountain', 'a landform, not a biome'], [1908, 'river', 'a landform, not a biome'], [1919, 'meadow', 'a landform, not a biome'], [1945, 'estuary', 'a landform, not a biome']]);
linkIf2('biomes', [[28392, 'forest', 1, 'the first biome named']]);
grp('biomes', [30177, 30176, 30180], 'taiga, boreal forest and coniferous forest: one biome');

sec('B3. autumn fun');
linkIf2('autumn_fun', [[5104, 'Thanksgiving', 2, 'the US and Canadian autumn feast (its region tag stays)'], [5131, 'Bonfire Night', 3, 'the UK autumn night of fireworks']]);
tag(68991, 'hayride', ['US'], 'a US autumn custom');
// corn maze: a UK alias, maize maze, is added (C), so its root stays untagged (as written test / theory test).

sec('B4. winter flowers: the spring flowers out');
outL('winter_flowers', [[1702, 'violet', 'a spring flower'], [1699, 'daffodil', 'a spring flower'], [1712, 'iris', 'a spring flower'], [1745, 'anemone', 'a spring flower']]);
rateL('winter_flowers', [[1725, 'crocus', 3], [1713, 'hyacinth', 3]], 'late winter at the earliest');
linkIf2('winter_flowers', [[30388, 'winter aconite', 3, 'it flowers in January and February; shown "aconite" as winter jasmine is shown "jasmine"', { show: 'aconite' }]]);

sec('B5-B7');
outL('sunrise_and_sunset_sights', [[25416, 'sunrise', 'the topic itself (no-topic-word rule)'], [25417, 'sunset', 'the topic itself (no-topic-word rule)']]);
linkIf2('backyard', [[46075, 'sandbox', 2, 'in the theme\'s own note']]);
outL('ocean_ingredients', [[467, 'tuna', 'general seafood, not an umami ingredient'], [478, 'clam', 'general seafood'], [481, 'sardine', 'general seafood'], [29435, 'caviar', 'general seafood']]);

sec('B8. missing first answers');
{ const bbq = newEntry('barbecue', 'grill', { pos: 'noun', type: 'common', fam: 1 }, 'the outdoor grill itself (the old entry is the grilled meat)');
  linkE(bbq, 'summer_fun', 1, 'a first summer pleasure');
  if (ix.theme.has('hot_things')) linkE(bbq, 'hot_things', 3, 'the appliance hot_things lacked in v474'); }
linkIf2('summer_fun', [[61490, 'water fight', 2], [32589, 'pool party', 2]], 'a first summer pleasure');
linkIf2('vegetable_garden', [[417, 'green beans', 2], [395, 'cabbage', 2], [420, 'beet', 3], [398, 'spinach', 2]], 'grown in every vegetable garden');
linkIf2('things_that_buzz', [[1383, 'bumblebee', 2, 'the buzzing bee']]);
linkIf2('things_underground', [[1443, 'rabbit', 3, 'it lives in a burrow']]);
linkIf2('on_a_nature_walk', [[10147, 'nest', 1, 'seen on every walk']]);
linkIf2('heath_and_moor_plants', [[371, 'bilberry', 2, 'the moorland berry']]);
{ const ch = newEntry('champagne', 'color', { pos: 'noun', type: 'common', fam: 2 }, 'the pale golden color named after the wine');
  linkE(ch, 'drink_shades', 2, 'a color named after a drink'); }
linkIf2('on_a_desert_island', [[28110, 'sea', 1, 'all around it'], [43383, 'wave', 2, 'on every beach']]);

sec('B9-B10');
linkIf2('minerals', [[31659, 'sapphire', 3, 'the gem variety of corundum, beside ruby (accepted, as emerald beside beryl)']]);
merge(50332, 'plantain', 50252, 'plantain', 'synonym', 3, 'one plant (Plantago), entered as a weed and as a herb');

sec('C. groups');
grp('things_that_grow', [28286, 1696], 'flower and sunflower: one answer');
grp('things_that_grow', [3190, 14290, 14292], 'hair, beard and mustache: one answer');
grp('things_you_climb', [2049, 2052], 'rock and boulder: one answer');
// glasses = sunglasses in pairs_you_wear: skipped, it joins a clash group of 18 (clash-big, a new warning).
grp('poisonous_plants', [1738, 30383], 'an azalea is a rhododendron: one answer');
grp('pink_flowers', [1738, 30383], 'an azalea is a rhododendron: one answer');
grp('things_that_block_the_sun', [4962, 5004], 'umbrella and parasol: one answer');
grp('rainy_day_fun', [67289, 5713, 5732], 'board game beside its kinds chess and dominoes: one answer');
grp('on_a_desert_island', [59990, 1215], 'fish and shark: one answer');
grp('countryside', [38169, 38170], 'hay bale and haystack: one answer');
grp('rock_formations', [1913, 30925], 'a grotto is a cave: one answer');
for (const t of ['dark_places', 'parts_of_a_house']) grp(t, [24074, 24075], 'basement and cellar: one answer');
outL('wetlands', [[32071, 'waterfowl', 'the category of duck, which is there']]);
merge(66564, 'flowerpot', 1855, 'plant pot', 'regional', 1, 'the UK word for a flowerpot: one entry (in ___pot both played, now flowerpot only)', { region: ['UK'] });

sec('C. swaps');
swapL('things_that_buzz', 3737, 'razor', 67285, 'electric razor', 'the razor that buzzes', { outWhy: 'a blade razor does not buzz; electric razor takes the link' });
swapL('backyard', 10159, 'kennel', 50858, 'dog house', 'the backyard dog house (UK kennel is a boarding place too)', { typ: 3, outWhy: 'dog house takes the link' });

sec('C. ratings');
famL([[68966, 'weeping willow', 2], [68973, 'sugar beet', 3], [28410, 'bunting', 3], [68988, 'pumpkin carving', 2], [68993, 'snow angel', 2], [68969, 'mahonia', 4]], 'rated one step off (review of v476-v491)');
rateL('things_that_buzz', [[23481, 'light bulb', 4]], 'a faint buzz, not typical');
rateL('wildflowers', [[1696, 'sunflower', 4]], 'mostly a garden flower');
rateL('orange_flowers', [[1707, 'pansy', 3]], 'orange is one of many pansy colors');
rateL('autumn_flowers', [[62419, 'fuchsia', 3]], 'summer into autumn');
rateL('south_american_flowers', [[1698, 'orchid', 3]], 'worldwide, not tied to South America');
rateL('bodies_of_water', [[31213, 'puddle', 4]], 'too small to be a typical body of water');
rateL('flat_landscapes', [[1907, 'desert', 3]], 'many deserts are dunes or mountains');
rateL('desert', [[6619, 'pyramid', 4]], 'Egypt only');
rateL('in_a_cave', [[6982, 'dragon', 3], [6765, 'treasure', 3]], 'storybook caves');
rateL('cured_fish', [[481, 'sardine', 3]], 'mostly canned, not cured');
setT('natural_resources', 'ident', 3, 'several themes fit four of its members');
setT('autumn_fun', 'ident', 3, 'several seasons fit four of its members');

sec('C. weak links');
outL('things_that_drip', [[97, 'watermelon', 'juicy, not a thing that drips']]);
outL('things_that_beep', [[7358, 'Game Boy', 'not known for beeping']]);
outL('vines_and_climbers', [[403, 'pumpkin', 'a trailing vine at most; climbers are the point'], [97, 'watermelon', 'a trailing vine'], [400, 'cucumber', 'a trailing vine']]);
outL('crops', [[31498, 'hay', 'dried grass, not a crop']]);
outL('on_a_nature_walk', [[8408, 'binoculars', 'brought along, not found'], [66176, 'eggshell', 'a kitchen eggshell']]);
outL('eucalypt_species', [[60169, 'mallee', 'a growth form, not a species']]);
outL('conservation_words', [[28885, 'zoo', 'a place, not a conservation word']]);
outL('natural_resources', [[40337, 'oxygen', 'not counted as a natural resource'], [2056, 'granite', 'stone is there'], [2057, 'marble', 'stone is there'], [2058, 'limestone', 'stone is there'], [27965, 'tree', 'forest and wood are there'], [59990, 'fish', 'wildlife is there']]);
outL('drink_shades', [[38561, 'claret', 'burgundy and bordeaux are there']]);
outL('summer_fun', [[40176, 'go-kart', 'not tied to summer']]);
flag(5125, 'Oktoberfest', 'sensitive', true, 'a beer festival: sensitive like the other beer words');

sec('C. regional');
newAlias(23337, 'surgical spirit', '', 'regional', 2, ['UK'], 'the UK word for rubbing alcohol');
newAlias(68992, 'maize maze', '', 'regional', 3, ['UK'], 'the UK word for a corn maze');

sec('C. outside the batches');
setKind(17369, 'monkey nut', 'synonym', 'UK players say peanut; monkey nut is a peanut in its shell (not the display word)');
{ const e = ix.entry.get(30956); if (e && (e.text === 'great plains' || e.text === 'Great Plains')) retext(30956, 'great plains', 'Great Plains', 'the North American region: a place', { type: 'place' }); }
flag(18034, 'brine', 'pos', 'noun', 'linked as the salt water, a noun');
newAlias(41154, 'Plough', 'asterism', 'regional', 2, ['UK'], 'the UK name of the Big Dipper');
flag(25016, 'sleigh', 'gloss', 'sled', 'the gloss names the sense, not one use');

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
const flagRows = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]).length;
cmp.push(`Rows whose flags changed: ${flagRows}`);
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

const spreads = [...touchedT].filter(t => prof0[t] || ix.theme.has(t)).sort().map(t => `  ${t}: ${prof0[t] || 'new'} -> ${profile(t)}`);
const FS1 = firstSynLine();
const summary = [`Library batch v492 (fixes from the review of Julia's v476-v491; Simon, 2026-11-26: fix all as you think best): clear fixes, the first recommendation of each judgement call, minor items.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `First synonym aliases harder than root familiarity + 1: ${FS0.bad.length} -> ${FS1.bad.length}${FS1.bad.length ? ': ' + FS1.bad.join(', ') : ''}`,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id))).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}; themes deleted ${counts.deletedThemes}; entries merged ${counts.merged}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch492-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch492-review-tail.txt', import.meta.url), 'utf8') : '';
const NOTICE = fs.existsSync(new URL('./batch492-notice.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch492-notice.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + (NOTICE ? '\n' + NOTICE : ''));
fs.writeFileSync(REVIEW || new URL('./batch492-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

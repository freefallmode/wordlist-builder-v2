// Library batch v474: fixes from the review of Julia's v460-v473 (tools/gen/review-julia-v460-v473.md): section A (clear fixes), the calls on
// B2-B11 (Simon, 2026-11-25: "fix all how you think best"; nice, mammoth and Earth in things_with_layers held for Simon) and section C (minor).
// Base: library v473. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch474.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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


// ---------- this batch (v474) ----------
// A new entry linked in tid. x: gloss, pos, show.
const add = (tid, text, fam, typ, why, x = {}) => { const e = newEntry(text, x.gloss || '', { pos: x.pos || 'noun', type: 'common', fam }, why); linkE(e, tid, typ, why, x.show ? { show: x.show } : {}); return e; };
const outL = (tid, list) => { for (const [id, text, why] of list) unlinkIf([tid], id, text, why); };
const grp = (tid, ids, why) => { if (ids.every(id => ix.entry.get(id) && E(id).typ[tid] !== undefined)) addToGroup(tid, ids, why); };
const rateL = (tid, list, why) => { for (const [id, text, typ] of list) { const e = live(id, text); if (e && e.typ[tid] !== undefined) rate(e, tid, typ, why); } };
const famL = (list, why) => { for (const [id, text, fam, w] of list) { const e = live(id, text); if (e) setE(e, 'fam', fam, w || why); } };
const glossIf = (id, text, gloss, why) => { const e = live(id, text); if (e && !e.gloss) setE(e, 'gloss', gloss, why); };
// Delete an entry left in no theme (a stub or a loose phrase); skipped when it is linked or has aliases.
const delStub = (id, text, why) => { const e = ix.entry.get(id); if (!e || e.text !== text) return; if (linkIds(P, e).filter(t => ix.theme.has(t)).length) { A.push(`  (kept: ${lab(e)} is still in ${linkIds(P, e).join(', ')})`); return; } delE(id, text, why); };

sec('A1. emergency brake 46812 is the car brake (UK alias handbrake): on a train or the subway UK players would see "handbrake". A new entry emergency brake [train] takes those two links');
{ const car = live(46812, 'emergency brake');
  if (car) { const tr = newEntry('emergency brake', 'train', { pos: 'noun', type: 'common', fam: 2 }, 'the passenger alarm on a train or subway car, not the car handbrake');
    swap('on_a_train', car, tr, 'the train sense: the car sense shows "handbrake" to UK players');
    swap('on_the_subway', car, tr, 'the train sense: the car sense shows "handbrake" to UK players');
    if (!car.gloss) setE(car, 'gloss', 'car', 'its text is now shared with emergency brake [train]'); } }

sec('A2. learning_to_drive: learner\'s permit (US) and provisional license (UK, IE) are one thing under two dialect words: one root, the UK word a regional alias (LIBRARY-RULES 5, Aliases)');
merge(68680, "learner's permit", 68691, 'provisional license', 'synonym', 4, 'the same document: the UK and Irish name of the learner\'s permit (the US spelling of a UK term: a synonym, so the UK display alias is "provisional licence")', { region: ['UK', 'IE'] });
setKind(68692, 'provisional licence', 'regional', 'the UK and Irish everyday word for the learner\'s permit (one display alias per dialect)', 3);
tag(68692, 'provisional licence', ['UK', 'IE'], 'a UK and Irish word');
untag(68680, "learner's permit", 'the root of a US word with a UK, IE regional alias is untagged (as written test / theory test): UK players see "provisional licence"');

sec('A3. car_wash');
outL('car_wash', [[23882, 'detergent', 'UK players see "washing powder", a laundry word; soap and shampoo cover it']]);

sec('A4. size_labels: a word and its abbreviation are one answer');
grp('size_labels', [68820, 39548], 'extra small and XS are one size label');
grp('size_labels', [39539, 39546], 'extra large and XL are one size label');

sec('A5. things_that_burn: figurative links out');
outL('things_that_burn', [[7379, 'bridge', 'figurative ("burn bridges")'], [49347, 'CD', 'to burn a CD is to write it, not set it on fire'], [3827, 'calorie', 'figurative ("burn calories")'], [29499, 'chili', 'it tastes hot, it does not burn']]);

sec('A6. deep_things');
outL('deep_things', [[24952, 'pocket', 'figurative ("deep pockets")'], [68808, 'outer space', 'figurative ("deep space"); not a deep thing']]);
linkL('deep_things', [[31789, 'pit', 3, 'a deep hole dug in the ground (the mine sense, as mine [pit] there)']]);
grp('deep_things', [31788, 31789], 'mine [pit] and pit [mine] are one answer');

sec('A7. words_for_cold');
linkL('words_for_cold', [[39916, 'frozen', 2, 'an everyday word for very cold ("I\'m frozen")']]);

sec('A8. middle_eastern_scents');
outL('middle_eastern_scents', [[16304, 'olive oil soap', 'a product, not a scent (kohl went out as "not a scent" in v465)'], [39731, 'patchouli', 'a South and Southeast Asian scent, not a Middle Eastern one']]);

sec('A9. pungent_foods: liver went out as "taste, not smell" (v465); the same holds for these');
outL('pungent_foods', [[405, 'radish', 'sharp in taste, not pungent in smell'], [721, 'black pepper', 'sharp in taste, not pungent in smell']]);
rateL('pungent_foods', [[467, 'tuna', 4]], 'canned tuna smells, but it is not one of the first pungent foods named');

sec('A10. things_that_smell_bad: mothball and its form mothballs');
famL([[66296, 'mothball', 2], [23189, 'mothballs', 2]], 'nearly every adult knows mothballs; the singular is not easier than the plural people say');
{ const m = live(66296, 'mothball'); if (m && m.typ.things_that_smell_bad !== undefined) setUse(m, 'things_that_smell_bad', 23189, 'mothballs is the form people say for the smell'); }

sec('A11. plants_with_spines and thorny_plants are twins (17 of 27 shared): plants_with_spines merges into thorny_plants (LIBRARY-RULES 6, a near-duplicate is merged): the links it lacks move (the better typicality kept), its group moves, then it is deleted');
if (ix.theme.has('plants_with_spines')) {
  const PW = 'plants_with_spines', TP = 'thorny_plants';
  for (const e of (ix.byTheme.get(PW) || []).filter(e => !e.aliasOf && e.typ[PW] !== undefined).sort((a, b) => a.id - b.id)) {
    if (e.id === 1778) continue;   // nettle: stinging hairs, not thorns or spines; it stays in prickly_things
    if (e.typ[TP] === undefined) linkE(e, TP, e.typ[PW], 'moved from plants_with_spines (merged)', (e.nameOkIn || []).includes(PW) ? { nameOk: true } : {});
    else if (e.typ[PW] < e.typ[TP]) rate(e, TP, e.typ[PW], 'the better typicality of the two twins is kept');
  }
  grp(TP, [29503, 30574], 'nopal and prickly pear are one answer (moved from plants_with_spines)');
  unlinkE(E(1778), PW, 'stinging hairs, not thorns or spines: not a thorny plant; it stays in prickly_things');
  dropTheme(PW, 'the twin of thorny_plants (17 of its 27 words shared): merged into thorny_plants');
  setT(TP, 'pop', 3, 'with rose, cactus, thistle and holly the merged theme is an ordinary pick, as plants_with_spines was rated (it was 5)');
}

sec('A12. prickly_things: rose is in the group thorn = rose thorn = rose (a thing and its part)');
outL('prickly_things', [[1693, 'rose', 'the plant whose part is the thorn; thorn = rose thorn stays']]);

sec('A13. symbols');
grp('symbols', [68837, 26117], 'division sign and obelus are the same ÷');

sec('A14-A16. synonyms and sounds, textures');
outL('words_for_fast', [[27830, 'lickety-split', 'an adverb (precipitate went out for the same reason)']]);
famL([[28397, 'shadow', 1]], 'every child knows the word shadow');
outL('fragile_things', [[29101, 'reputation', 'abstract'], [32273, 'ecosystem', 'abstract'], [3238, 'heart', 'figurative (the organ is not fragile)']]);
linkL('fragile_things', [[24032, 'glass', 1, 'the first fragile thing anyone names']]);
outL('fragile_things', [[24782, 'glasses', 'one word family with glass, now there (LIBRARY-RULES 5: keep the better fit); wine glass stays']]);

sec('A17-A20. colors, things with, motion');
outL('gold_things', [[6957, 'Midas', 'a king, not a gold thing'], [37714, 'Fort Knox', 'a vault, not a gold thing'], [21218, 'El Dorado', 'a legendary place, not a gold thing']]);
// With the three names out, capitals fall under a fifth of the theme and the case lint reads Oscar [award] as the wrong sense (case-sense-proper,
// baseline 0): three well-known gold trophies, all names, keep the theme's real mix.
linkL('gold_things', [[12748, 'Grammy', 3, 'a gold gramophone trophy'], [12750, 'Golden Globe', 3, 'a gold globe trophy'], [44447, "Ballon d'Or", 4, 'the golden ball of football']]);
outL('things_with_numbers', [[38221, 'mailbox', 'the street postbox has no number']]);
linkL('things_with_numbers', [[44229, 'jersey', 2, 'players\' shirts carry big numbers']]);
linkL('motion_verbs', [[67311, 'fly', 1, 'the most obvious motion verb'], [10380, 'creep', 3, 'a well-known motion verb']]);
outL('things_that_roll', [[6396, 'credits', 'figurative ("the credits roll")']]);
outL('ways_to_jump', [[5625, 'parkour', 'a sport of running, climbing and jumping, not a way to jump']]);

sec('B2. cold_things: polar bear and penguin stay out (v463); named places other than the poles and fiction go: they are cold places, not cold things (polar_and_frozen_places holds them). The poles, the Arctic and Antarctica stay: they are the cold itself in the first words people name');
outL('cold_things', [[32111, 'Alaska', 'a US state, a cold place, not a cold thing'], [62517, 'Hoth', 'a fictional planet'], [32063, 'Greenland', 'a cold place, not a cold thing'], [32106, 'Siberia', 'a cold place, not a cold thing'], [31816, 'Yukon', 'a cold place, not a cold thing'], [32064, 'Svalbard', 'a cold place, not a cold thing'], [36684, 'Vostok Station', 'a cold place, not a cold thing'], [62516, 'Oymyakon', 'a cold place, not a cold thing'], [26, 'Neptune', 'a planet, not a cold thing'], [21099, 'Pluto', 'a dwarf planet, not a cold thing'], [6757, 'Mount Everest', 'a mountain, not a cold thing']]);

sec('B3. winter_vehicles: snow tube is not a vehicle; luge and bobsled get their sled sense (the existing entries are the sport); skeleton stays out');
outL('winter_vehicles', [[68777, 'snow tube', 'an inflatable ring for sliding, not a vehicle']]);
{ const sport = live(5351, 'bobsled');
  if (sport) {
    const sled = newEntry('bobsled', 'sled', { pos: 'noun', type: 'common', fam: 2 }, 'the sled itself, not the sport');
    newAlias(sled.id, 'bobsleigh', 'sled', 'regional', 2, ['UK', 'IE', 'AU'], 'the UK, Irish and Australian word for the sled');
    swap('winter_vehicles', sport, sled, 'the sled sense: the bobsled entry is the sport');
    if (!sport.gloss) setE(sport, 'gloss', 'sport', 'its text is now shared with bobsled [sled]');
    glossIf(5352, 'bobsleigh', 'sport', 'its text is now shared with bobsleigh [sled]');
  }
  const luge = live(5353, 'luge');
  if (luge) {
    const sled = newEntry('luge', 'sled', { pos: 'noun', type: 'common', fam: 3 }, 'the sled itself, not the sport');
    linkE(sled, 'winter_vehicles', 3, 'a small racing sled ridden feet first');
    if (!luge.gloss) setE(luge, 'gloss', 'sport', 'its text is now shared with luge [sled]');
  } }

sec('B4. winged_creatures: real animals only; v470\'s mythical additions go back out (winged_beasts holds them)');
outL('winged_creatures', [[6989, 'fairy', 'mythical'], [6982, 'dragon', 'mythical'], [6941, 'Pegasus', 'mythical'], [6962, 'phoenix', 'mythical'], [6944, 'griffin', 'mythical'], [6963, 'harpy', 'mythical'], [6620, 'sphinx', 'mythical']]);

sec('B5. sharp_things: weapons of war and execution out of a non-adult theme (sword, dagger, knife, spear, arrow stay)');
outL('sharp_things', [[33828, 'guillotine', 'an execution device'], [28727, 'bayonet', 'a weapon of war'], [34650, 'lance', 'a weapon of war']]);

sec('B6. two_wheelers: bikes, motorbikes, scooters and the like only');
outL('two_wheelers', [[20383, 'chariot', 'a cart, not a bike'], [22973, 'hansom cab', 'a carriage, not a bike'], [50129, 'sulky', 'a cart, not a bike'], [40184, 'gig', 'a carriage, not a bike'], [49173, 'dogcart', 'a cart, not a bike'], [48235, 'pony cart', 'a cart, not a bike'], [39859, 'ox cart', 'a cart, not a bike'], [24258, 'hand truck', 'a trolley, not a vehicle you ride'], [2684, 'rickshaw', 'a cart, not a bike (the cycle rickshaw has three wheels)']]);
setT('two_wheelers', 'note', 'vehicles on two wheels: bicycle, motorcycle, scooter, moped, Segway', 'chariot is out');

sec('B7. loose phrases (v462 removed this kind elsewhere): unlinked, and deleted when made by v460-v461 and in no other theme');
outL('travel_trouble', [[68770, 'bad weather', 'a loose phrase'], [68772, 'hidden fees', 'a loose phrase'], [68762, 'lost passport', 'a loose phrase (lost luggage is the fixed term)']]);
outL('car_trouble', [[68662, 'cracked windshield', 'a loose phrase'], [68666, 'squeaky brakes', 'a loose phrase'], [68671, 'slipping clutch', 'a loose phrase'], [68670, 'fuel leak', 'a loose phrase']]);
outL('in_a_glove_box', [[68700, 'ketchup packet', 'a loose phrase']]);
outL('airport_security', [[68732, 'bag search', 'a loose phrase'], [68733, 'random search', 'a loose phrase']]);
for (const [id, text] of [[68770, 'bad weather'], [68772, 'hidden fees'], [68762, 'lost passport'], [68662, 'cracked windshield'], [68666, 'squeaky brakes'], [68671, 'slipping clutch'], [68670, 'fuel leak'], [68700, 'ketchup packet'], [68732, 'bag search'], [68733, 'random search']]) delStub(id, text, 'a loose phrase made by v461 for one theme, now in none');

sec('B8. synonym themes: words that are not true synonyms out; ratings');
outL('words_for_funny', [[68877, 'entertaining', 'not a synonym of funny'], [29096, 'facetious', 'not a synonym of funny (flippant)']]);
outL('words_for_new', [[68920, 'trendy', 'fashionable, not new'], [68919, 'futuristic', 'of the future, not new'], [68923, 'pristine', 'unspoiled, not new']]);
outL('words_for_old', [[68862, 'primitive', 'early or simple, not old']]);
outL('words_for_smart', [[68853, 'precocious', 'advanced for one\'s age, not smart']]);
outL('words_for_strong', [[68901, 'indestructible', 'unbreakable and invincible stay; three for one idea is too many']]);
rateL('words_for_funny', [[68869, 'silly', 2], [68873, 'ridiculous', 3]], 'silly and ridiculous are not the first words for funny');
rateL('words_for_strange', [[68854, 'mysterious', 3], [68856, 'unfamiliar', 4], [68855, 'exotic', 4]], 'loose synonyms of strange');
rateL('words_for_old', [[68861, 'mature', 3]], 'grown-up rather than old');

sec('B9. hot_things: a verb and a dish standing in for the appliances (no appliance entry exists: grill and barbecue are the verb and the meat)');
outL('hot_things', [[921, 'grill', 'the verb, not the appliance'], [19767, 'barbecue', 'the grilled meat, not the appliance']]);
linkL('hot_things', [[25302, 'summer', 3, 'the hot season']]);

sec('B9. stubs left in no theme by v460-v473: loose phrases and duplicate stubs deleted (bluetongue and chipboard become aliases below)');
for (const [id, text, why] of [
  [39017, 'pane', 'a stub left by v471 (window is the word)'], [40124, 'albino', 'a stub left by v472'], [40215, 'coalface', 'a stub left by v473'], [38948, 'thin', 'a stub left by v468 (thin [slim] is the word)'],
  [39974, 'glowing plankton', 'a loose phrase'], [39982, 'glowing coals', 'a loose phrase (embers is the word)'], [39985, 'new coin', 'a loose phrase'], [39986, 'chrome bumper', 'a loose phrase'],
  [39995, 'wet pavement', 'a loose phrase'], [40000, 'patent shoes', 'a loose phrase (patent leather is the word)'], [39753, 'mahogany teakwood', 'a candle product name, a loose phrase'],
  [39754, 'frankincense and myrrh', 'two words joined, a loose phrase'], [39940, 'hot as hell', 'a loose simile'], [39576, 'Pringle', 'a stub left by v464, duplicating Pringles']]) delStub(id, text, why);

sec('B10. US vacation spots');
setT('american_holiday_spots', 'ident', 3, 'with Las Vegas, Hawaii and Walt Disney World in, four members name it after a moment');
linkL('american_holiday_spots', [[2219, 'New York', 1], [31943, 'Yellowstone', 2], [2331, 'Niagara Falls', 2], [48930, 'Disneyland', 2]], 'a top US vacation spot; it was not linked');

sec('B11. overlaps');
outL('words_for_shiny', [[28031, 'bright', 'the topic word of words_for_bright, its sibling']]);
outL('scented_products', [[3745, 'sunscreen', 'personal care, scented only incidentally'], [3732, 'mouthwash', 'personal care, scented only incidentally'], [23138, 'toilet paper', 'a household product, scented only incidentally'], [50839, 'cat litter', 'a household product, scented only incidentally'], [23370, 'trash bags', 'a household product, scented only incidentally'], [34759, 'marker', 'a novelty, scented only incidentally'], [12017, 'eraser', 'a novelty, scented only incidentally']]);
outL('flat_things', [[2140, 'Netherlands', 'a flat country, a place, not a flat thing'], [32168, 'Kansas', 'a flat state, a place, not a flat thing'], [1950, 'mesa', 'a landform (flat_landscapes holds it)'], [1940, 'steppe', 'a landform (flat_landscapes holds it)']]);
outL('pink_animals', [[1041, 'manatee', 'gray, not pink']]);
linkL('gray_things', [[1041, 'manatee', 3, 'a gray animal'], [13663, 'Eeyore', 3, 'the gray donkey (moved from blue_things)'], [39899, 'ash', 2, 'gray ash, as in ash gray']]);

sec('C. regional gaps');
newAlias(68658, 'flat battery', '', 'regional', 2, ['UK'], 'the UK word for a dead battery');
newAlias(68676, 'out of petrol', '', 'regional', 2, ['UK'], 'the UK words for out of gas');
newAlias(68642, 'package holiday', '', 'regional', 2, ['UK'], 'the UK word for a package tour');
newAlias(68954, "barber's pole", '', 'regional', 3, ['UK'], 'the UK form of barber pole');
tag(68725, 'medallion', ['US'], 'the taxi medallion is a US (New York) thing');
tag(68641, 'spring break', ['US'], 'a US college custom');

sec('C. on_a_train: conductor and ticket inspector are one answer (the conductor\'s UK alias is ticket inspector)');
grp('on_a_train', [2862, 46964], 'conductor and inspector [ticket] are one answer');

sec('C. ratings');
for (const tid of ['rectangular_things', 'flat_things']) { setT(tid, 'pop', 3, 'like its siblings square_things and oval_things'); setT(tid, 'ident', 3, 'like its siblings square_things and oval_things: a loose shape property'); }
setT('things_with_numbers', 'ident', 3, 'a loose property: several themes fit four of its members');
famL([[68929, 'nascent', 4], [68887, 'jocular', 4], [68885, 'farcical', 3], [68884, 'uproarious', 3], [68903, 'strapping', 3], [68867, 'zonked', 3], [68831, 'speckled', 2], [68832, 'crisscross', 2], [50133, 'strut', 3]], 'better known than rated: one step easier');
rateL('purple_things', [[425, 'turnip', 4]], 'only its top is purple');
rateL('blue_things', [[861, 'water', 3]], 'drawn blue, but clear');
rateL('striped_things', [[42671, 'referee', 3]], 'striped shirts in US sports only');
rateL('natural_materials', [[30101, 'rubber', 3]], 'most rubber now is synthetic');

sec('C. weak links out');
outL('food_chillers', [[3063, 'thermos', 'it keeps food hot or cold, it does not chill it']]);
outL('words_for_hot', [[68814, 'infernal', 'hellish in general, rarely "hot"']]);
outL('words_for_cold', [[68817, 'unheated', 'a fact about a room, not a word for cold']]);
outL('eating_sounds', [[16980, 'hiccup', 'not made by eating'], [16989, 'gurgle', 'a stomach or water sound, not an eating sound']]);
outL('quiet_things', [[34608, 'stealth bomber', 'hidden from radar, not quiet']]);
outL('sticky_things', [[12554, 'Spider-Man', 'a character; his webs are the sticky thing']]);
outL('square_things', [[5765, 'tic-tac-toe', 'a grid game, the board not clearly square'], [3667, 'pillow', 'usually rectangular']]);
outL('oval_things', [[111, 'avocado', 'pear-shaped, not oval']]);
outL('blue_things', [[13663, 'Eeyore', 'gray, not blue (now in gray_things)']]);
outL('pink_things', [[103, 'lychee', 'red outside, white inside']]);
outL('yellow_things', [[215, 'lion', 'tawny, not yellow']]);
outL('gray_things', [[33938, 'nickel', 'the US coin is silver-colored']]);
outL('things_with_tongues', [[41927, 'Albert Einstein', 'a famous photo, not a thing with a tongue']]);
outL('things_with_necks', [[23481, 'light bulb', 'the neck of a bulb is a specialist term']]);
outL('things_with_keys', [[4106, 'janitor', 'a person who carries keys, not a thing with keys']]);
outL('things_that_sink', [[2232, 'Venice', 'a city that is slowly sinking, figurative']]);
outL('airport_security', [[67358, 'swab', 'a specialist detail'], [4956, 'gloves', 'not a checkpoint thing']]);
outL('in_a_glove_box', [[68701, 'valve cap', 'kept on the tire, not in the glove box']]);
outL('summer_camp', [[3024, 'campfire', 'it holds "camp" of the theme name']]);
setT('summer_camp', 'note', 'camp for kids: cabin, canoe, archery, friendship bracelet', 'campfire is out');
{ const h = live(10193, 'howl'), c = live(17016, 'howl'); if (h && c) swap('voice_sounds', h, c, 'a voice sound is the cry (howl [cry]), not the animal sound'); }

sec('C. missing words');
linkL('smells_from_the_kitchen', [[393, 'onion', 2, 'frying onions: a first kitchen smell']]);
linkL('striped_things', [[9845, 'tabby cat', 3, 'a striped cat'], [1014, 'badger', 3, 'a striped face']]);
linkL('things_with_layers', [[639, 'trifle', 3, 'a layered dessert']]);
linkL('roadwork', [[3099, 'bulldozer', 2, 'a roadwork machine']]);
linkL('in_a_hotel_room', [[25706, 'keycard', 2, 'the room key'], [23136, 'mirror', 3, 'in every room'], [23340, 'hangers', 2, 'in every closet']]);
{ const bb = newEntry('bad breath', '', { pos: 'noun', type: 'common', fam: 1 }, 'the everyday word; halitosis becomes its synonym');
  merge(bb.id, 'bad breath', 62959, 'halitosis', 'synonym', 3, 'the medical word for bad breath'); }

sec('C. duplicates');
// horned owl as an alias of great horned owl would hold "owl" of the theme name owls (theme-name, a new warning): the duplicate stub is deleted instead.
delStub(40201, 'horned owl', 'a stub left by v473 duplicating great horned owl (as its alias it would leak "owl" in owls)');
merge(1209, 'blue-tongued skink', 40223, 'bluetongue', 'synonym', 4, 'the Australian name of the blue-tongued skink');
merge(24055, 'particle board', 24054, 'chipboard', 'regional', 3, 'the UK word for particle board', { region: ['UK'] });
grp('heavy_things', [21211, 21214], 'a gold bar is an ingot: one answer (grouped so in treasure)');

sec('C. types');
// ID card stays proper: typed common, its capital trips case-cap-common in three themes (a new warning); left for Simon.
{ const e = live(5968, "Rubik's Cube"); if (e) setE(e, 'type', 'proper', 'a named product (proper + tm), not a company'); }
{ const e = live(5932, 'Slinky'); if (e) setE(e, 'type', 'proper', 'a named product (proper + tm), not a company'); }
{ const e = ix.entry.get(2384); if (e && (e.text === 'Moai' || e.text === 'moai')) retext(2384, 'Moai', 'moai', 'the statues: a common noun, lowercase in Merriam-Webster and Oxford', { type: 'common' }); }
typeCommon([[5937, 'hula hoop']], 'a toy, not an idiom (tm stays)');
{ const e = live(50032, 'husky'); if (e) setE(e, 'pos', 'adjective', 'a husky voice: an adjective'); }

sec('C. notes');
{ const t = T('things_made_of_glass'); if (t.note.includes('lightbulb')) setT('things_made_of_glass', 'note', t.note.replace('lightbulb', 'light bulb'), 'the root is light bulb'); }

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
const summary = [`Library batch v474 (fixes from the review of Julia's v460-v473; Simon, 2026-11-25: "fix all how you think best"): clear fixes, the calls on B2-B11, minor items; plants_with_spines merged into thorny_plants.`,
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
const TAIL = fs.existsSync(new URL('./batch474-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch474-review-tail.txt', import.meta.url), 'utf8') : '';
const NOTICE = fs.existsSync(new URL('./batch474-notice.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch474-notice.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + (NOTICE ? '\n' + NOTICE : ''));
fs.writeFileSync(REVIEW || new URL('./batch474-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

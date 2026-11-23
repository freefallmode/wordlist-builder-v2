// Library batch v451: the last batch of the library tidy-up (TIDY-UP.md): the residual check hits, library-wide, by kind:
//   region-root-equiv (warn), sense-link, xwords-twin, theme-twin, sense-twin, alias-kind-suspect, alias-fullname, same-display, clash-large (info).
//   Each hit is fixed (merge, alias, ungroup, unlink, relink, split, untag) or recorded as correct in batch451-review-tail.txt (with the allow-list keys proposed).
// Base: library v450. Everything works by entry id + text and theme id, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch451.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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

// =================================================================================================
sec('1. region-root-equiv (warn, 73 at v450): a regional root grouped with an untagged root of the same sense (LIBRARY-RULES 4 region, 5 Aliases)');
sec('1a. One sense: the regional root becomes an alias of the root in place (id kept; links move, the better typicality kept; groups dissolve into the one root)');
merge(371, 'bilberry', 372, 'whortleberry', 'synonym', 5, 'one plant (Vaccinium myrtillus); bilberry is its usual name and stays the UK root (no US word for it: huckleberry and blueberry are other plants); whortleberry is its rarer synonym (familiarity 5, the root 4: no harder than the root + 1)', { region: [] });
merge(17359, 'pine nut', 17361, 'piñon', 'translation', 5, 'the Spanish name of the pine nut, used in the US Southwest; as a synonym (familiarity 5 for a familiarity-2 root) it would be too hard as the shown first synonym, and as a US regional alias it would replace pine nut, the US standard word', { region: ['US'] });
setKind(68188, 'pinon', 'translation', 'the plain form of piñon, which is now a translation of pine nut (not a spelling of pine nut)');
merge(64683, 'pointed cabbage', 62540, 'hispi', 'synonym', 4, 'Hispi is the UK trade name of the pointed (sweetheart) cabbage: one vegetable; the UK everyday name is pointed cabbage too, so a synonym keeping its UK tag, not the UK display word', { region: ['UK'] });
merge(19036, 'bacon sandwich', 19035, 'bacon butty', 'synonym', 3, 'butty is UK informal for a sandwich: one food; the UK everyday name is bacon sandwich too, so a synonym keeping its UK tag (familiarity 3, the root 2)', { region: ['UK'] });
merge(7787, 'oncilla', 7803, 'tigrina', 'translation', 5, 'the Brazilian Portuguese name of the oncilla (Leopardus tigrinus): one cat', { region: ['BR'] });
merge(8562, 'shingleback', 8563, 'bobtail', 'synonym', 5, 'the Western Australian name of the shingleback lizard (Tiliqua rugosa): one lizard; a synonym keeping its AU tag (familiarity 5, the root 5)', { region: ['AU'] });
merge(30118, 'copse', 30121, 'spinney', 'synonym', 4, 'a small wood: Oxford defines spinney as a small area of trees, a copse; a synonym keeping its UK tag (familiarity 4, the root 3)', { region: ['UK'] });
merge(30314, 'cleavers', 30669, 'goosegrass', 'synonym', 5, 'one plant (Galium aparine): cleavers is its usual name; goosegrass its synonym (familiarity 5, the root 5)', { region: [] });
merge(1952, 'moor', 1953, 'moorland', 'synonym', 3, 'moorland is land of moors, the same landscape word; a synonym keeping its UK tag (familiarity 3, the root 3)', { region: ['UK'] });
merge(1955, 'fen', 30951, 'fenland', 'synonym', 4, 'fenland is land of fens, the same landscape word; fen (UK) stays the root, fenland its synonym (familiarity 4, the root 3)', { region: [] });
merge(27391, 'loch', 30970, 'lough', 'regional', 5, 'lough is the Irish English word for the Scottish loch (both the Gaelic loch, a lake or sea inlet): a regional alias tagged IE (the game picks a display word only for UK and US tags)', { region: ['IE'] });
merge(32260, 'wildlife reserve', 68037, 'wildlife refuge', 'regional', 2, 'the US name of a wildlife reserve (National Wildlife Refuge): US players see wildlife refuge; wildlife reserve has no other US alias', { region: ['US'] });
merge(2643, 'jalopy', 67131, 'clunker', 'synonym', 3, 'US slang for an old, worn-out car, as jalopy; a synonym keeping its US tag (familiarity 3, the root 4); 1920s slang is a slang theme (lang, locked), so it still shows jalopy only', { region: ['US'], dropKin: true });
merge(2690, 'paratransit', 2689, 'dial-a-ride', 'regional', 5, 'the UK name of the US paratransit (door-to-door transport booked by phone): UK players see dial-a-ride; paratransit, the US word, is the untagged root', { region: ['UK'] });
merge(47006, 'planned maintenance', 47005, 'engineering works', 'regional', 4, 'the UK rail name of planned maintenance (lines closed for track work): UK players see engineering works', { region: ['UK'] });
// Reviewer (standing approval): planned maintenance is retexted to the everyday neutral name; engineering works stays its UK regional alias
{ const e = ix.entry.get(47006); if (e && (e.text === 'planned maintenance' || e.text === 'track work')) retext(47006, 'planned maintenance', 'track work', 'the everyday name of rail work that closes a line (US and UK); planned maintenance was a generic office term (reviewer)', { fam: 3 }); }
merge(3843, 'nutrition label', 3844, 'nutrition facts', 'regional', 2, 'Nutrition Facts is the US name of the nutrition label (the FDA panel): US players see nutrition facts (reviewer)', { region: ['US'] });
{ const al = ix.entry.get(3844); if (al && al.text === 'nutrition facts' && al.aliasOf === 3843 && !(al.nameOkIn || []).includes('nutrition')) { al.nameOkIn = [...(al.nameOkIn || []), 'nutrition']; n++; A.push(`${lab(al)}: nameOkIn nutrition (its text holds the theme name; it is the real name, as Orsay Museum in v450)`); } }
merge(2933, 'getaway', 2969, 'mini-break', 'synonym', 3, 'a UK word for a short getaway; a synonym keeping its UK tag (familiarity 3, the root 2)', { region: ['UK'] });
// Indian head massage: the known name; champissage (a coined trade name, familiarity 5) was the root and is deleted; the alias takes its link and group
{ const c = ix.entry.get(65750), h = ix.entry.get(16459);
  if (c && c.text === 'champissage' && !c.aliasOf && h && h.text === 'Indian head massage' && h.aliasOf === 65750 && P.entries.filter(a => a.aliasOf === 65750).length === 1) {
    deleteEntry(P, c); reindex(P); n++; deleted.push(lab(c)); counts.merged++;
    A.push(`${lab(c)} deleted; its synonym ${lab(h)} becomes the root and takes its link (massage types, typicality ${h.typ.massage_types}) and its group with head massage and scalp massage: Indian head massage is the name people know (familiarity 3); champissage is a trade name coined for it (familiarity 5), too hard as its first synonym`);
    if (h.region.length) setE(h, 'region', [], 'Indian head massage is offered and named so in the UK and the US alike (it took the UK tag of champissage when promoted)'); } }

sec('1b. Different things grouped as one answer: the regional root leaves the group (both stay answers; a kind beside its generic word is fine in a kinds theme, LIBRARY-RULES 5 Overlap)');
ungroup('apple_varieties', 17306, "Cox's Orange Pippin", 'a different apple from Newtown Pippin and from the generic Pippin');
ungroup('nuts', 17364, 'cobnut', 'a cultivated hazelnut (Kentish cob), a kind beside its generic word');
ungroup('nut_trees', 30005, 'cobnut tree', 'a cultivated hazel, a kind beside its species');
ungroup('flatbreads', 53137, 'roti canai', 'the flaky Malaysian flatbread, not chapati or roti (which stay grouped as one answer)');
ungroup('cakes', 18111, 'lemon drizzle', 'a kind of lemon cake beside its generic word');
ungroup('spreads', 18831, 'jelly', 'a different preserve: jelly is set from strained fruit juice, jam from crushed fruit (Merriam-Webster); jam and fruit preserves stay one answer');
ungroup('savory_pies', 62978, 'steak and kidney', 'a kind of steak pie beside its generic word');
for (const t of ['savory_pies', 'british_food']) ungroup(t, 19176, 'cottage pie', 'two dishes in Britain: cottage pie is made with beef, shepherd\'s pie with lamb');
ungroup('small_wild_cats', 7798, 'Scottish wildcat', 'the Scottish population of the European wildcat, a kind beside its species');
for (const t of ['garden_bugs', 'insects_and_bugs', 'garden_pests']) ungroup(t, 1374, 'blackfly', 'the black bean aphid, a kind beside its generic word (aphid, shown greenfly to UK players)');
ungroup('coastal_plants', 454, 'samphire', 'samphire names two plants (rock samphire and marsh samphire): not one answer with them');
ungroup('coastal_plants', 31105, 'rock samphire', 'Crithmum maritimum, a different plant from marsh samphire and glasswort (Salicornia), which stay one answer');
for (const t of ['shipwreck_coast_words', 'weather']) ungroup(t, 1976, 'haar', 'a cold sea fog of the North Sea coast, a kind beside its generic word');
for (const t of ['weather', 'snow_and_ice']) ungroup(t, 1989, 'wintry mix', 'not sleet in US English (wintry mix is snow, sleet and rain together; US sleet is ice pellets): two answers');
ungroup('post_office', 35178, 'certified mail', 'a different US service: certified mail proves mailing and delivery, registered mail is carried under signed custody (USPS)');
ungroup('ports_and_harbors', 47517, 'landing stage', 'a floating platform, not a fixed pier or jetty');
ungroup('campfire_foods', 48557, 'damper', 'two breads of two traditions: Australian damper (soda bread baked in the coals) and Scottish and Canadian bannock');
ungroup('emergency_vehicles', 49033, 'pumper truck', 'a kind of fire truck beside its generic word');
unlinkIf(['common_illnesses', 'illnesses'], 3358, 'lurgy', 'a jokey word for any minor illness ("the dreaded lurgy"), not an illness to name (reviewer)');
{ const e = live(3358, 'lurgy'); if (e && !e.aliasOf) linkE(e, 'british_slang', 3, 'UK slang (also Australian), its right theme (reviewer)'); }
unlinkIf(['sleep', 'short_sleeps'], 3694, 'kip', 'UK slang for sleep; these themes have sleep words, kip stays in British slang (reviewer, as cuppa)');
ungroup('sports_injuries', 15019, 'charley horse', 'a cramp in the leg muscle, a kind of cramp: a separate answer, tagged US (reviewer)');
unlinkIf(['camouflaged_animals', 'alpine_animals'], 1044, 'stoat', 'ermine is there (the stoat in its white winter coat); stoat and ermine both stay roots (Simon, v435) (reviewer)');

sec('1c. Slang or regional words in a general theme beside their standard word (as v440 did for mate, copper, bobby): they leave that theme and stay in their slang or regional themes');
unlinkIf(['drinks'], 969, 'brewski', 'slang for beer; drinks has beer (brewski stays in nicknames for drinks)');
unlinkIf(['cafe', 'drinks', 'hot_drinks'], 963, 'cuppa', 'a nickname for a cup of tea; these themes have tea (cuppa stays in British slang and nicknames for drinks)');
unlinkIf(['drinks', 'new_year', 'wines'], 966, 'bubbly', 'a nickname for champagne; these themes have champagne (bubbly stays in nicknames for drinks)');
unlinkIf(['drinks', 'new_year', 'wines'], 967, 'fizz', 'a nickname for champagne; these themes have champagne (fizz stays in nicknames for drinks)');
unlinkIf(['lizards'], 8561, 'goanna', 'the Australian name of the monitor lizards; lizards has monitor lizard (goanna stays in Australian animals and outback)');
unlinkIf(['weather'], 1991, 'mizzle', 'a UK dialect word for fine drizzle; weather has drizzle (mizzle stays in rain words)');
unlinkIf(['cars', 'things_inside_the_cabin'], 2627, 'moonroof', 'a kind of sunroof (a glass panel), typicality 5; these themes have sunroof (moonroof stays in moon___)');
unlinkIf(['journeys', 'arduous_trips'], 2955, 'schlep', 'Yiddish-derived US slang for a tedious trip, typicality 5; these themes have tramp, trudge and slog (schlep stays in words from Yiddish)');

sec('1d. Known to UK and US adults alike, or the US root of a dialect pair: the region tag goes (LIBRARY-RULES 4 region; v440 untagged 29 such roots)');
untag(17419, 'pip', 'Merriam-Webster prints pip (a small fruit seed, as of an apple or orange) unmarked; known to US adults too');
untag(19096, 'candy bar', 'understood by UK adults (familiarity 1); the US word with no UK alias, so the tag only raises its band for UK players');
untag(973, 'sieve', 'the verb sieve is unmarked in Merriam-Webster; US cooks sieve too');
untag(30849, 'cwm', 'the geology and mountaineering term for a cirque (the Western Cwm of Everest), unmarked in Merriam-Webster; the word is Welsh, its use international');
unlinkIf(['scottish_landscape_words'], 30849, 'cwm', 'a Welsh word, not Scottish (the Scottish word is corrie, cirque\'s UK alias) (reviewer)');
merge(20475, 'Grand Canal', 36922, 'Grand Canal', 'synonym', 4, 'Grand Canal [canal] in straits and canals is the Chinese canal (reviewer: China): one sense with Grand Canal [China] in ancient China, so merged (same text: deleted, its link moves); Grand Canal [Venice] stays apart');
{ const e = live(49461, 'Nest'); if (e) setE(e, 'type', 'proper', 'a named product with tm is proper (LIBRARY-RULES 4 type: Big Mac) (reviewer)'); }
untag(35178, 'certified mail', 'the US root of a dialect pair: its UK word recorded delivery is already its UK regional alias, as color has colour');
untag(38303, 'freeway', 'the US root of a dialect pair: its UK word motorway is already its UK regional alias');
untag(48242, 'horse and cart', 'plain words known everywhere (familiarity 2), not a UK word');

sec('1e. Both roots regional: the untagged one gets its region (who knows it, LIBRARY-RULES 4 region; only codes the export already has: a new code would shift the region bits of every theme row)');
tag(46890, 'dollar van', ['US'], 'a New York City shared van, the US jitney');

sec('1f. One entry held two senses: the wrong-sense links move to a new entry of the right sense');
split(8733, 'barbel', ['fish_body_parts', 'animal_body_parts', 'parts_of_water_animals'], 'barbel', 'body part', { fam: 4, region: [] }, 'the barbel of a fish is its whisker-like feeler, a body part (neutral English, untagged); the old entry is the European river fish (UK); fish body parts keeps it grouped with whiskers', 'fish');
split(3072, 'outhouse', ['farm_buildings'], 'outhouse', 'outbuilding', { fam: 3, region: [] }, 'in farm buildings an outhouse is an outbuilding (Merriam-Webster sense 1, Oxford), not the US outdoor toilet', 'toilet');
ungroup('campsite', 3072, 'outhouse', 'an outhouse is a toilet hut over a pit; a latrine is the pit or trench itself: two answers');

// =================================================================================================
sec('2. alias-kind-suspect (info, 25 at v450)');
{ const a = live(35172, 'PO box'); if (a && a.aliasOf === 35171) setE(a, 'type', 'proper', 'a spelling alias has its root\'s type (P.O. box is proper)'); }
dropAlias(18993, 'nicoise salad', 'a longer plain name of niçoise, kept as a spelling: no theme shows it, no note names it, and nicoise stays its plain spelling (rule 8); as a synonym it would show "salad" in salads');

// =================================================================================================
sec('3. sense-link, sense-twin, alias-fullname, clash-large, xwords-twin, theme-twin, same-display: no data change (allow-list keys proposed and reasons in the review tail)');

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
const summary = [`Library batch v451: the last batch of the tidy-up, the residual check hits (region-root-equiv, alias-kind-suspect; the info kinds reviewed). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch451-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch451-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch451-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

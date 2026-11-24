// Library batch v452: the last clean-up after the library tidy-up (TIDY-UP.md), standing approval: orphans (link, merge, delete stubs, keep with a reason;
//   new theme animal categories), alias-kind-suspect, small oddities (Pietà, otitis media), the still-open items of ISSUES T16, T33, T34, and people typed
//   person in themes of real people (new theme fashion houses). Reasons per word in the review (batch452-review.txt), its tail in batch452-review-tail.txt.
// Base: library v451. Everything works by entry id + text and theme id, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch452.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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

// =================================================================================================
sec('1. Orphans (info, 304 at v451): entries in no theme. Linked where a theme clearly fits, merged as an alias where another root has the sense, deleted when a stub made for one theme, else kept with a reason (LIBRARY-RULES 2 Deleting)');
sec('1a. New theme "animal categories": real names of animal categories (marsupial, arachnid, mollusk ...), left in no theme when v435 took the bare category words out of their kinds themes');
newTheme({ id: 'animal_categories', name: 'animal categories', parent: 'animal_words', pop: 3, ident: 2, note: 'the big categories of animals: mammal, bird of prey, reptile, amphibian, insect, marsupial, arachnid, mollusk' }, 'hybrid_animals',
  'a home for the real category names v435 left in no theme (LIBRARY-RULES 6 Themes: 4+ real members, a clear name), with the easy class words mammal, reptile, amphibian and insect (reviewer); a player names it from mammal, reptile, insect and marsupial after a second look (ident 2); an ordinary pick (pop 3)');
merge(8119, 'bird of prey', 8118, 'raptor', 'synonym', 3, 'one sense: a raptor [bird] is a bird of prey (Merriam-Webster raptor 2); bird of prey is the plainer name (familiarity 2), raptor its synonym (familiarity 3, the root + 1); the dinosaur raptor 9971 is another entry');
for (const [text, typ, w] of [['mammal', 1, 'warm-blooded animals that feed their young on milk'], ['reptile', 1, 'snakes, lizards, turtles and crocodiles'], ['insect', 1, 'six-legged animals: ants, bees, beetles, butterflies'], ['amphibian', 2, 'frogs, toads, newts and salamanders']]) {
  const e = newEntry(text, '', { pos: 'noun', type: 'common', fam: 1, region: [] }, 'the class word of a big animal category; none existed (reviewer)'); linkE(e, 'animal_categories', typ, w); }
linkL('animal_categories', [
  [7919, 'marsupial', 2, 'the pouched mammals (kangaroo, koala, opossum)'],
  [9112, 'arachnid', 2, 'spiders, scorpions, ticks and mites'],
  [8896, 'mollusk', 2, 'snails, clams, squid and octopus'],
  [8119, 'bird of prey', 2, 'eagles, hawks, falcons and owls'],
  [50653, 'corvid', 3, 'the crow family (crows, ravens, magpies, jays)'],
  [7893, 'cetacean', 3, 'whales, dolphins and porpoises'],
  [32071, 'waterfowl', 3, 'ducks, geese and swans'],
  [66428, 'songbird', 3, 'perching birds that sing (thrushes, warblers, finches)'],
  [8986, 'echinoderm', 3, 'starfish, sea urchins and sea cucumbers'],
  [8905, 'pinniped', 3, 'seals, sea lions and walruses'],
  [8257, 'ratite', 4, 'the flightless running birds (ostrich, emu, kiwi)'],
  [9625, 'equid', 4, 'the horse family (horse, donkey, zebra)'],
], 'a category of related animals');

sec('1b. Linked to an existing theme that clearly fits');
linkL('texture_words', [[14830, 'fleecy', 3], [14831, 'abrasive', 4], [14842, 'sandpapery', 4]], 'a texture word; batch421 took it out of touch words because texture words holds the textures, but it was never linked there');
linkL('medical_pioneers', [[15676, 'Sushruta', 4, 'the ancient Indian physician known as the father of surgery, beside Avicenna'], [15675, 'Charaka', 5, 'the ancient Indian physician of the Charaka Samhita, beside Avicenna']]);
linkL('maori_culture', [[15642, 'rongoā', 4, 'traditional Māori healing (Te Aka), a part of Māori culture as marae and tapu are']]);
linkL('aboriginal_culture', [[15655, 'ngangkari', 4, 'the traditional healers of the Anangu (Ngaanyatjarra Pitjantjatjara Yankunytjatjara Women\'s Council), as bush tucker is Aboriginal food'], [15648, 'bush medicine', 3, 'traditional Aboriginal plant medicine, beside bush tucker']]);
linkL('magic_items', [[22498, 'pixie dust', 3, 'the magic dust of Peter Pan that makes people fly (its synonym fairy dust stays its alias)']]);
linkL('shopping_words', [[25289, 'Cyber Monday', 3, 'the online sales day after Thanksgiving, beside Black Friday']]);
linkL('old_time_jobs', [[31166, 'lighthouse keeper', 3, 'a job that vanished when lighthouses were automated (the theme note: jobs that have mostly vanished in the last 150 years)']]);
linkL('casino_words', [[45199, 'craps table', 3, 'the table of the dice game craps, beside roulette wheel']]);
linkL('flight_crew', [[47181, 'fighter pilot', 3], [47184, 'helicopter pilot', 3], [47180, 'test pilot', 4], [47183, 'stunt pilot', 4]], 'a kind of pilot, beside airline pilot, commercial pilot and chief pilot');
linkL('boys_names', [[62423, 'Julius', 4], [67466, 'Augustus', 4], [67465, 'Augustine', 4]], 'a given-name entry (gloss name, type person), an old Latin boy\'s name');
linkL('girls_names', [[67464, 'Augusta', 4, 'a given-name entry (gloss name, type person), an old Latin girl\'s name']]);
linkL('latin_american_names', [[67463, 'Julio', 3, 'a given-name entry (gloss name, type person), a common Spanish boy\'s name']]);
linkL('geothermal_wonders', [[60441, 'Larderello', 4, 'the Tuscan geothermal field of fumaroles, the first geothermal power (1904)'], [60442, 'Wairakei', 4, 'the New Zealand geothermal field and terraces near Taupō, beside Rotorua']]);
linkL('renewable_energy', [[32251, 'concentrated solar', 4, 'a kind of solar power (mirrors focus sunlight), beside photovoltaic'], [32256, 'green hydrogen', 4, 'hydrogen made with renewable electricity, beside biofuel and biogas']]);
linkL('conservation_words', [[32262, 'protected area', 3, 'land or sea protected for nature, beside wildlife corridor and Red List'], [32289, 'buffer zone', 4, 'the belt around a protected area, beside wildlife corridor']]);
linkL('eco_habits', [[32357, 'public transport', 2, 'taking the bus or train instead of the car, beside cycling, walking and carpooling']]);

sec('1c. Same sense as another root: merged (the orphan becomes an alias in place, or is deleted when its text repeats)');
merge(66586, 'butcher shop', 131, "butcher's", 'synonym', 2, 'the UK everyday name of a butcher shop ("the butcher\'s"); a synonym keeping its UK tag, not the UK display word: butcher shop shows "butcher" in shops and ___shop, and a regional alias would swap that text', { region: ['UK'] });
merge(2643, 'jalopy', 2644, 'banger', 'regional', 3, 'banger is the UK word for an old, worn-out car (Oxford "banger" 3): the UK display word of jalopy (no UK alias yet); jalopy stays in 1920s slang (locked)', { region: ['UK'] });
merge(39131, 'nubby', 14843, 'nubbly', 'regional', 4, 'the UK word for nubby (Oxford nubbly; Merriam-Webster nubby): the UK display word; their kin goes (one word now)', { region: ['UK'], dropKin: true });
merge(6069, 'pitch', 14710, 'pitch', 'synonym', 2, 'one sense: the highness or lowness of a sound; pitch [music] 6069 already holds it in music words and acoustics words (batch421 called it a second copy)', { dropKin: true });
merge(35258, 'frequency', 14723, 'frequency', 'synonym', 3, 'one sense: the rate of a wave\'s vibration; frequency 35258 already holds it in acoustics words and physics words (batch421 called it a second copy)', {});
{ const e = live(35258, 'frequency'); if (e) setE(e, 'gloss', 'wave', 'the one wave sense now (radio, sound, physics); the gloss names it (reviewer)'); }

sec('1d. Deleted: stubs made for one theme, with no alias, kin, group or nameOkIn depending on them (LIBRARY-RULES 2, Deleting)');
delL([
  [9626, 'Equus', 'the Latin genus name of horses, made for horse family (v435 took it out as the bare category word); equid is the group word, now in animal categories'],
  [9667, 'Caretta caretta', 'the Latin name of the loggerhead turtle, made for Turkish animals, where loggerhead turtle is the member'],
  [8706, 'caudate', 'the zoologist\'s order name of the salamanders (familiarity 5), made for salamanders and newts; no theme of order names'],
  [8707, 'urodele', 'the other order name of the salamanders (familiarity 5), made for salamanders and newts'],
  [9996, 'flying reptile', 'a description, made for flying reptiles, whose name it is'],
  [50724, 'venomous snake', 'a description, made for venomous snakes, whose name it is'],
  [14864, 'pupillary', 'an adjective made for eye parts, not a part'],
  [15587, 'Huang Di', 'a second romanization of the Yellow Emperor, whose translation alias Huangdi it repeats'],
  [15600, 'sidr honey', 'a specific honey made for Middle Eastern remedies, where honey is the member'],
  [15609, 'ajwa dates', 'a specific date made for Middle Eastern remedies, where dates is the member'],
  [15684, 'tridosha', 'the three doshas together, made for Ayurveda words, where vata, pitta and kapha are the members'],
  [16150, 'exploding head', 'a misleading short form of exploding head syndrome, made for sleep disorders'],
  [18407, 'praline filling', 'a generated stub (a filling, not a chocolate) with no theme'],
  [18408, 'truffle shell', 'a generated stub (a confectioner\'s part) with no theme'],
  [32003, 'hydrologic cycle', 'a technical name of the water cycle (familiarity 5), too hard as its first synonym (familiarity 2 + 1 at most); made for the water cycle theme, whose name is water cycle'],
  [40270, 'cooling engine', 'a generated stub that is not an established term'],
  [60846, 'arachibutyrophobia', 'a joke coinage (fear of peanut butter sticking to the roof of the mouth), made for phobias and taken out as a joke word'],
  [14837, 'feel up', 'a crude sexual phrase (LIBRARY-RULES 5, Offensive words: delete an entry whose meaning is crude), unflagged; made for touch words'],
  [14793, 'cerumen', 'the medical word for earwax (familiarity 5), made for ear parts; too hard as earwax\'s first synonym (familiarity 2 + 1 at most)'],
  [47182, 'crop duster pilot', 'a stub: crop duster 47088 (aircraft types, farm vehicles) covers it; the job is the pilot of a crop duster (reviewer)'],
  [9878, 'sea elephant', 'an old name of the elephant seal (familiarity 4); as its synonym it would give away sea mammals and seals and sea lions (theme-name: "sea")'],
  [23901, 'coin laundry', 'a second name of the laundromat (familiarity 3); as its synonym it would give away laundry words (theme-name: "laundry")'],
]);

sec('1e. Kept in no theme, on purpose (listed with the reasons at the end of the review)');
keep([1476, 1617, 13744, 5825, 50741, 50992, 50993, 50997, 51015, 51016, 51017, 64778, 58921, 28466, 3324, 41335, 32007, 31915, 32292, 32185, 14249], 'a real category word, or the name of a theme, with its kinds or members in that theme: the bare category word is not a member (LIBRARY-RULES 5)');
keep([3309, 3314, 3315, 3327, 3328, 3329, 3335, 3337, 3338, 3339, 3342, 3343, 3345, 3347, 3348, 3349, 3352, 50101, 14589, 60780, 60781, 60782, 14673, 14688, 14692, 14693, 14697, 14713, 14724, 14725, 14765, 14576, 14584, 14586, 14588, 14205, 14206, 14207],
  'a senses or body word left when batch421 and v439 narrowed the senses and body themes; a real word, no theme of its kind (perception words, body processes)');
keep([14820, 14835], 'a sexual sense, flagged (offensive or adult); a real word, no family theme takes it');
keep([22426, 15629, 29041], 'left by the offensive pass (v432); a real word, flagged or only a reversible partner (T34)');
keep([7991, 7992, 8496, 14514, 54884, 47620, 44290, 62068, 22822, 22825, 28197, 27948, 27903, 28464, 28515, 28627, 28631, 28698, 28713, 28719, 29046, 29229, 29230, 39417, 39442, 39933, 39941, 40077, 56037, 56056, 56071, 62394, 66915, 67087, 67117, 28481, 32216, 62412, 16020, 16029, 16093],
  'a general word or idiom with no theme of its kind (v433, v446, v447 kept these)');
keep([55631, 55632, 55633], 'a jubilee is the anniversary of a reign or a founding, not a personal milestone: milestone celebrations is not its theme (reviewer); no theme of anniversaries');
keep([1513], 'a general word: horse racing terms holds race and the kinds of race');
keep([1673], 'an adjective of trees: the tree themes hold trees, and no theme holds tree adjectives');
keep([27564], 'a US regional nickname (a person from Michigan\'s Upper Peninsula): no theme of regional nicknames');
keep([62493], 'the UK word for a smarty-pants: as its synonym it would give away clever people (theme-name: "clever"), and a second root of one sense is not linked; British slang holds UK words with no general equivalent');
keep([8298, 50116, 50562, 51048, 58866, 5276, 55779, 48428, 48464], 'a named character, product or title with no theme of its kind (fictional animals, a song, a booking site, a menu item)');
keep([15602, 15606, 15607, 15620, 15625, 15630, 15635, 15628, 15653, 22214, 22218, 62043, 34238, 34426],
  'a healer, rite, tradition or faith with no theme of its kind (taken out of the remedy themes by batch423, of religion by v444); a real word');
keep([16413, 16414, 16472, 16473, 60849, 16638, 16731, 16054], 'a real term taken out of the theme it was made for as not a member (prejudice, not a phobia; a massage stroke, not a massage type; the B vitamins together; a diet adjective; a fabric measure)');
keep([17220, 17232, 17578, 17722, 17726, 17728, 18269, 18900, 19269], 'a real food word with no theme of its kind; a more specific form of a member (maraschino cherry beside cherry on top, duck breast beside duck) is not a member (LIBRARY-RULES 5)');
keep([31908, 31909, 31913, 31914], 'Earth\'s-layers words left by v415: layers of the earth holds inner and outer core');
keep([31956, 31957, 31961, 32232, 32258, 60443, 60444, 60445], 'a geothermal power word: geothermal features holds natural features only, renewable energy holds geothermal energy');
keep([31978, 31980, 31981, 32006, 60446, 60453, 60459, 32188, 32203, 32216, 32217, 32218, 32219, 32220, 32221, 32222, 32223, 32224, 32225, 32226, 32227, 32247, 32252, 32253, 32254, 32255, 32287, 32290, 32308, 32318, 32355, 32359, 32360, 32366, 32368, 32370, 32371, 32373, 32375, 32376, 32377, 32378, 32379, 49760, 60502],
  'an environment word with no theme of its kind (most are adjectives or processes; the eco themes hold things and habits); flooding is a form of flood, which natural disasters holds; ride share and car share are carpooling, which eco habits holds');
keep([32338, 32346, 60510, 31838, 41321, 41343, 40949, 40204, 50763, 47416, 49185, 48612, 47040, 25300, 23388, 28465, 34645, 34950, 45495, 45496, 44976, 44907, 42969, 42972, 44428, 58911],
  'a real word with no clearly right theme: a more specific form of a member (oil well, coal seam beside seam, comet tail, bull elephant), a part, an event or a niche sport (kin-ball, footgolf: v442 kept these)');
keep([20730, 56063, 35765, 36213, 36214], 'a place with no theme of its kind: no theme of Welsh or English towns; French Guiana is not a country; Nunavut and Northwest Territories are territories, not among the 10 Canadian provinces (complete set)');

// =================================================================================================
sec('2. alias-kind-suspect (info, 23 at v451): real variant spellings (romanizations, old and eye-dialect spellings, UK plough, spelled-out DJ and MC); one kind fixed');
setKind(22199, 'Oxum', 'translation', 'Oxum is the Portuguese (Brazilian Candomblé) name of the orisha Oshun, as Roma is the Italian name of Rome: a translation, not an English spelling');

// =================================================================================================
sec('3. Small oddities');
{ const e = live(37121, 'Pietà'); if (e) setE(e, 'type', 'title', 'Michelangelo\'s Pietà is a sculpture, an artwork: type title (LIBRARY-RULES 4 type: book, film, song, game, artwork), not a place');
  const a = P.entries.find(x => x.aliasOf === 37121 && x.text === 'Pieta'); if (a) setE(a, 'type', 'title', 'a spelling alias has its root\'s type'); }
{ const a = live(62722, 'otitis media'); const ei = live(14876, 'ear infection');
  if (a && a.aliasOf === 14876) { A.push(`${lab(a)}: alias (${a.aliasKind}) of ear infection 14876 -> its own root (familiarity 4): the medical name of a middle-ear infection, the member infections shows; as ear infection's first synonym it was too hard (5 for a familiarity-1 root) (reviewer)`); a.aliasOf = null; delete a.aliasKind; a.fam = 4; a.typ ||= {}; n++; reindex(P); }
  if (a && !a.aliasOf) linkE(a, 'infections', 4, 'the medical name, shown there before through ear infection (reviewer)');
  if (ei && ei.typ.infections !== undefined && linkIds(P, ei).filter(t => t !== 'infections').length) unlinkE(ei, 'infections', 'otitis media takes its place (its show "otitis media" goes with the link) (reviewer)'); }

// =================================================================================================
sec('4. T16, T33, T34 (ISSUES.md): what is still wrong and clear');
merge(23980, 'dumpster', 60580, 'skip', 'regional', 3, 'T33: a second root of dumpster [UK skip], untagged, beside dumpster in construction site; dumpster already has skip as its UK regional alias, so the root is deleted (its link merges into dumpster, typicality kept); its kin with skipping [exercise] was a different word', { del: 'its text is already the UK regional alias skip of dumpster', dropKin: true });
split(47452, 'transom', ['window_styles'], 'transom', 'window', { fam: 4, region: [] }, 'T33: a transom window (the small window over a door, Merriam-Webster transom 2) is another sense than the ship\'s transom (the flat stern)', 'ship');
{ const c = live(4893, 'coveralls');
  if (c && c.aliasOf) { A.push(`${lab(c)}: regional alias (US) of overalls 4891 -> a root (untagged, the US and neutral word): T33, the one-piece garment; overalls keeps dungarees, the bib sense (reviewer)`); c.aliasOf = null; delete c.aliasKind; c.region = []; c.typ ||= {}; n++; reindex(P); }
  merge(4893, 'coveralls', 24453, 'boiler suit', 'regional', 3, 'T33: the UK word for coveralls: the UK display word; its links (work clothes 2, clothes 4) move to coveralls (reviewer)', { region: ['UK'] });
  const b = live(4908, 'boilersuit'); if (b && b.aliasOf === 4893) { setKind(4908, 'boilersuit', 'synonym', 'the closed spelling of the UK boiler suit: a UK synonym of coveralls (one UK display word, boiler suit) (reviewer)'); if (JSON.stringify(b.region) !== '["UK"]') setE(b, 'region', ['UK'], 'a UK word'); } }
merge(5214, 'Australian rules', 38526, 'Aussie rules', 'synonym', 3, 'T33: one sport, the informal Australian name; a synonym keeping its AU tag (familiarity 3, the root 3)', { region: ['AU'] });
{ const e = live(39075, 'Blu-Tack'); if (e && e.type !== 'proper') setE(e, 'type', 'proper', 'T33: a named product with tm is proper (LIBRARY-RULES 4 type)'); }
merge(39075, 'Blu-Tack', 23824, 'Blu Tack', 'spelling', 3, 'T33: one product; Oxford prints Blu-Tack (trademark): the root; Blu Tack its plain spelling (untagged)', {});
{ const e = live(28950, 'roly poly'); if (e) { setE(e, 'type', 'common', 'T34: an adjective (plump), not an idiom (LIBRARY-RULES 4 type phrase)'); if (!e.gloss) setE(e, 'gloss', 'plump', 'T34: names the sense beside roly-poly [pill bug] 1418'); } }

// =================================================================================================
sec('6. People typed person (the game may detect a people theme from 70% person members): themes of mostly real people');
{ const e = live(8441, 'Audubon'); if (e) setE(e, 'type', 'person', 'John James Audubon, the bird painter: a real person in famous naturalists (beside Lamarck and Buffon, also surname roots typed person)'); }
newTheme({ id: 'fashion_houses', name: 'fashion houses', parent: 'clothes', pop: 2, ident: 2, tm: true, note: 'luxury fashion houses (companies): Chanel, Dior, Gucci, Prada, Louis Vuitton, Versace' }, 'fashion_designers',
  'fashion designers held 14 fashion houses (companies, typed org) beside 21 designers; the houses get their own theme, so fashion designers holds people only (100% person)');
for (const [id, text] of [[24532, 'Chanel'], [24533, 'Dior'], [24534, 'Versace'], [24535, 'Armani'], [24536, 'Prada'], [24537, 'Gucci'], [24538, 'Louis Vuitton'], [24543, 'Givenchy'], [24544, 'Balenciaga'], [24545, 'Burberry'], [24546, 'Hermès'], [24547, 'Valentino'], [24548, 'Fendi'], [24549, 'Dolce & Gabbana']]) {
  const e = live(id, text); if (!e) continue;
  if (e.typ.fashion_designers !== undefined) { linkE(e, 'fashion_houses', e.typ.fashion_designers, 'a fashion house (company), typicality kept'); unlinkE(e, 'fashion_designers', 'a company, now in fashion houses'); }
}
for (const [full, sur, houseId, fam, typ] of [['Christian Dior', 'Dior', 24533, 2, 1], ['Giorgio Armani', 'Armani', 24535, 2, 1], ['Gianni Versace', 'Versace', 24534, 3, 2]]) {
  const p = newEntry(full, '', { pos: 'noun', type: 'person', fam, region: [] }, `the designer who founded the house ${sur}; the house entry is the company, in fashion houses (reviewer: easy members; in fashion houses the house entry already covers the name, and a person there would show "${sur}" twice, so the designer goes in fashion designers)`);
  linkE(p, 'fashion_designers', typ, 'a famous designer, an easy member');
  newAlias(p.id, sur, 'designer', 'synonym', fam, [], 'the people-names rule: the surname is the first synonym, at the same familiarity');
  const h = live(houseId, sur); if (h && !h.gloss) setE(h, 'gloss', 'fashion house', `its text is now shared with ${sur} [designer], the alias of ${full}`); }
setT('fashion_designers', 'note', 'real designers: Coco Chanel, Ralph Lauren, Vivienne Westwood, Karl Lagerfeld, Yves Saint Laurent', 'the houses moved to fashion houses');

// The orphans left, each with its reason
const ORPH1 = P.entries.filter(e => !e.aliasOf && e.enabled !== false && !linkIds(P, e).filter(t => ix.theme.has(t)).length);
const noReason = ORPH1.filter(e => !KEEP.has(e.id) && ORPH0.includes(e.id));
const newOrph = ORPH1.filter(e => !ORPH0.includes(e.id));
const KEPT_LINES = []; { const by = new Map(); for (const e of ORPH1) { const r = KEEP.get(e.id) || (ORPH0.includes(e.id) ? 'NO REASON' : 'new in no theme'); if (!by.has(r)) by.set(r, []); by.get(r).push(lab(e)); } for (const [r, l] of by) KEPT_LINES.push(`  ${l.length}: ${l.join(', ')}: ${r}`); }
A.push(`Orphans: ${ORPH0.length} before, ${ORPH1.length} after; kept with a reason ${ORPH1.length - noReason.length - newOrph.length}; without a reason ${noReason.length}${noReason.length ? ': ' + noReason.map(lab).join(', ') : ''}; new ${newOrph.length}${newOrph.length ? ': ' + newOrph.map(lab).join(', ') : ''}`);
A.push('#Orphans left in no theme, by reason (kept on purpose):', ...KEPT_LINES);


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
const summary = [`Library batch v452: the last clean-up after the tidy-up (orphans, alias kinds, oddities, ISSUES T16/T33/T34, people typed person). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch452-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch452-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch452-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

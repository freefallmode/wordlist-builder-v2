// Library batch v457: ISSUES W12 and W13 (Simon, 2026-11-24: "fix"; drafted for his review, not applied).
// W12: sensitive flags on religious words made consistent with LIBRARY-RULES 4 (this sense touches religion, politics or death; narrow), by sense,
//   not by theme: religious concepts, rites, texts, clergy, places of worship, holy days and gods are sensitive; cultural customs, food and
//   decorations are not, nor named people and historical titles (v417 Roosevelt). No flag is removed (Simon declined narrowing in I31). Aliases follow
//   their root. Scope settled by Simon (2026-11-24): the reviewer's narrower version plus the yoga words.
// W13: capsicums merged into its near-twin chili peppers; chili pepper becomes the synonym alias of chili; blue penguin and fairy penguin
//   regional aliases (NZ, AU) of little penguin; curry and mushroom leave their own kinds themes (curries, mushrooms) with a fourth easy member each; bachelor's button no longer
//   cornflower's US display alias (as jump drive, v456).
// Base: library v456. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch457.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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


// ---------- helpers of this batch (v456, reused) ----------
const raiseOf = e => { const r = e.region || []; if (!r.length) return 0; const uk = r.includes('UK'), us = r.includes('US'); if (uk && us) return 0;
  if (uk || us) { const o = uk ? 'US' : 'UK'; return P.entries.some(a => a.aliasOf === e.id && (a.region || []).includes(o)) ? 0 : 1; } return 2; };
// the game's band of the 4th-easiest usable word below level 31 (v456: reproduces the game's list): roots not adult, offensive, sensitive or a name word
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
const MERGED = {};   // gone theme -> survivor
// themes whose playable floor this batch can move: the game-like 4th-easiest band, before -> after (0: fewer than 4 usable words below level 31)
const GT = ['curries', 'mushrooms', 'chili_peppers', 'capsicums', 'penguins', 'blue_flowers', 'christmas_carols', 'christmas', 'easter', 'church_parts', 'mosque_parts', 'asian_temple_features', 'famous_temples', 'spicy_foods', 'fungi', 'flightless_birds', 'new_zealand_animals'];
const G0 = Object.fromEntries(GT.map(t => [t, gameLo(t)]));
const famIf = (id, text, fam, w) => { const e = live(id, text); if (e) setE(e, 'fam', fam, w); };

// ---------- W12: sensitive flags on religious words ----------
// The themes whose counts the review gives (the religion tree, the holiday themes, the religious buildings and their parts).
const under = (tid, root) => { let t = ix.theme.get(tid); while (t) { if (t.id === root) return true; t = ix.theme.get(t.parent); } return false; };
const SCOPE = P.themes.filter(t => !t.group && (under(t.id, 'religion') || ['christmas', 'christmas_carols', 'easter', 'festivals_of_the_world', 'ramadan_and_eid', 'hindu_festivals', 'hindu_gods',
  'church_parts', 'mosque_parts', 'famous_churches', 'famous_mosques', 'famous_temples', 'holy_cities', 'asian_temple_features'].includes(t.id))).map(t => t.id);
const sensCount = () => Object.fromEntries(SCOPE.filter(t => ix.theme.has(t)).map(t => { const ws = (ix.byTheme.get(t) || []).filter(e => !e.aliasOf && e.typ[t] !== undefined); return [t, [ws.filter(e => e.sensitive).length, ws.length]]; }));
const S0 = sensCount();
const FLAGGED = [];   // [entry, on]: for the review (which themes that are not sensitive themselves now hold the word back to level 31)
const flag = (on, list, why) => {
  for (const [id, text] of list) {
    const e = live(id, text); if (!e) continue; if (e.aliasOf) throw Error(`${lab(e)} is an alias: flag its root`);
    if (!!e.sensitive !== on) { setE(e, 'sensitive', on, why); FLAGGED.push([e, on]); for (const t of linkIds(P, e)) touchedT.add(t); }
    for (const a of P.entries.filter(a => a.aliasOf === e.id)) if (!!a.sensitive !== on) setE(a, 'sensitive', on, `${a.aliasKind} alias of ${lab(e)}: the same sense, as its root`);
  }
};

sec('1. W12: religious words flagged sensitive by sense (LIBRARY-RULES 4: this sense touches religion, politics or death; narrow), consistent with the flags already set (church, Christmas, priest, Bible, karma, Diwali)');
flag(true, [[14006, 'sanctuary'], [14011, 'baptistery'], [14045, 'stupa'], [14050, 'shrine'], [15943, 'ashram'], [20552, 'fire temple'], [27397, 'kirk'], [34279, 'gurdwara'], [34280, 'basilica'], [34281, 'minster'],
  [34282, 'priory'], [34283, 'nunnery'], [34284, 'mandir'], [34285, 'meeting house'], [34286, 'tabernacle'], [34287, 'oratory'], [34288, 'Kingdom Hall'], [34289, 'vihara'], [34290, 'wat'], [34292, 'masjid'],
  [34294, 'parish church'], [34295, 'Orthodox church'], [57662, 'zendo'], [57663, 'chantry'], [57664, 'gompa']],
  'a place of worship, as church, mosque, temple and synagogue (sensitive: religion)');
flag(true, [[25195, 'Vesak'], [25196, 'Obon'], [25198, 'Thaipusam'], [25201, 'Eid al-Fitr'], [34192, 'Advent'], [34193, 'Ascension Day'], [34195, 'Shavuot'], [34196, 'Maha Shivaratri'], [34197, 'Vaisakhi'],
  [34198, 'Candlemas'], [34199, 'All Saints Day'], [34200, 'Lammas'], [34201, 'Mawlid'], [34202, 'Ashura'], [61174, "Tisha B'Av"], [61175, 'Simchat Torah'], [61176, 'Kumbh Mela'], [61177, 'Lailat al-Qadr'],
  [61178, 'Esala Perahera'], [25062, 'Eastertide'], [34455, 'Shabbat'], [34456, 'Sabbath'], [55708, 'Laylat al-Qadr']],
  'a religious holy day or season, as Lent, Pentecost, Passover, Eid and Diwali (sensitive: religion)');
flag(true, [[14030, 'muezzin'], [15708, 'shaman'], [20753, 'sexton'], [20852, 'abbot'], [20853, 'friar'], [28716, 'vicar'], [34203, 'archbishop'], [34204, 'cardinal'], [34205, 'minister'],
  [34206, 'deacon'], [34207, 'mullah'], [34208, 'ayatollah'], [34209, 'chaplain'], [34210, 'curate'], [34211, 'rector'], [34212, 'abbess'], [34213, 'prior'], [34215, 'lama'], [34216, 'swami'],
  [34218, 'archdeacon'], [34219, 'dean'], [34220, 'canon'], [34221, 'moderator'], [34222, 'verger'], [34223, 'Grand Mufti'], [34224, 'pontiff'], [61179, 'metropolitan'],
  [61180, 'archimandrite'], [61182, 'granthi'], [61183, 'rebbe'], [61184, 'pujari'], [34510, 'sadhu'], [34520, 'pandit'], [34488, 'bhikkhu'], [34487, 'arhat'], [61225, 'tulku'], [61217, 'mohel']],
  'a religious office or role, as priest, rabbi, imam, bishop and monk (sensitive: religion)');
flag(true, [[34182, 'bless'], [34183, 'pray'], [34187, 'absolution'], [34190, 'offering'], [34191, 'catechism'], [22790, 'exorcism'], [34184, 'creed'], [34185, 'atheism'], [34186, 'divine'], [34188, 'canon'],
  [34189, 'grace'], [61170, 'theodicy'], [61171, 'syncretism'], [61172, 'numinous'], [34181, 'soul']],
  'a religious rite, belief or term, as prayer, sermon, sacrament, atheist and holy (sensitive: religion)');
flag(true, [[55595, 'Holly and the Ivy'], [55596, 'Ding Dong Merrily'], [55601, 'I Saw Three Ships']],
  'a carol about the Nativity (Mary and Jesus in the words), as Silent Night and The First Noel; Deck the Halls, Jingle Bells, Carol of the Bells, O Tannenbaum and the Wassail Song stay unflagged (secular)');
flag(true, [[22155, 'Tripitaka'], [34225, 'Talmud'], [34226, 'Psalms'], [34227, 'Book of Mormon'], [34228, 'Bhagavad Gita'], [34229, 'Guru Granth Sahib'], [34230, 'Dhammapada'], [34231, 'Tao Te Ching'],
  [34232, 'Hadith'], [34233, 'New Testament'], [34234, 'Old Testament'], [34237, 'Apocrypha'], [34239, 'Septuagint'], [34240, 'Book of Common Prayer'], [34242, 'Sutras'], [34244, 'Puranas'], [34245, 'Zohar'],
  [34246, 'Tanakh'], [34247, 'Pentateuch'], [34248, 'Book of Job'], [34249, 'Lotus Sutra'], [34251, 'King James Bible'], [50014, 'gospel'], [61185, 'Vulgate'], [61186, 'Rigveda'], [61187, 'Book of Enoch'],
  [61188, 'Adi Granth'], [61189, 'Nag Hammadi'], [61190, 'Gospel of Thomas'], [61191, 'Targum'], [62771, 'Exodus'], [62772, 'Genesis'], [62774, 'Revelation'], [15944, 'sutra'], [34462, 'Haggadah'],
  [34473, 'Mishnah'], [61211, 'tafsir'], [34450, 'surah'], [61220, 'parsha'], [61231, 'smriti']],
  'a holy book or scripture, as Bible, Quran, Torah and Vedas (sensitive: religion); I Ching and Kojiki stay unflagged (divination and chronicle)');
flag(true, [[34252, 'guardian angel'], [34253, 'cherub'], [34254, 'seraph'], [34256, 'archangel'], [34257, 'Gabriel'], [34258, 'Michael'], [34259, 'Raphael'], [34260, 'Uriel'], [34261, 'demon'], [34262, 'Satan'],
  [34263, 'Lucifer'], [34264, 'fallen angel'], [34268, 'Beelzebub'], [34269, 'Azrael'], [34270, 'Metatron'], [34271, 'throne'], [34272, 'principality'], [34273, 'Abaddon'], [56825, 'Raguel'], [56826, 'Remiel'],
  [56827, 'Sariel'], [56828, 'Raziel'], [56829, 'Jophiel'], [56830, 'Chamuel'], [56831, 'Zadkiel'], [56832, 'Haniel'], [56833, 'Barachiel']],
  'an angel or devil of the Bible and Quran, as angel and devil (sensitive: religion); folklore spirits (fairy, ghost, banshee, djinn, imp) stay unflagged');
flag(true, [[34403, 'heaven'], [34404, 'hell'], [34405, 'purgatory'], [34406, 'limbo'], [34407, 'afterlife'], [34409, 'Sheol'], [34410, 'Jannah'], [34411, 'Gehenna'], [34412, 'Pearly Gates'],
  [34413, 'Judgment Day'], [34414, 'damnation'], [34416, 'hereafter'], [34417, 'transmigration'], [34418, 'Day of Judgment'], [34423, 'moksha'], [34424, 'samsara'], [34425, "Abraham's bosom"],
  [34429, 'life after death'], [61202, 'Naraka'], [61212, 'barzakh'], [56819, 'Death']],
  'the afterlife in religious belief, or death itself (Death the horseman), as salvation and reincarnation (sensitive: religion, death)');
flag(true, [[14026, 'qibla'], [14031, 'prayer rug'], [34323, 'Kaaba'], [34431, 'Allah'], [34432, 'Muhammad'], [34433, 'salah'], [34435, 'sharia'], [34436, 'fatwa'], [34437, 'Sunni'],
  [34438, 'Shia'], [34439, 'Sufi'], [34440, 'umrah'], [34441, 'sawm'], [34442, 'shahada'], [34445, 'wudu'], [34447, 'caliphate'], [34448, 'madrasa'], [34449, 'takbir'], [34451, 'dhikr'], [34452, 'ummah'],
  [34453, 'mashallah'], [34454, 'inshallah'], [61206, 'tawhid'], [61207, 'ijtihad'], [61208, 'tarawih'], [55707, 'taraweeh'], [61209, 'kiswah'], [61210, 'ihram'], [55710, 'qurbani'], [55715, 'adhan']],
  'a term of Islamic faith and worship, as hajj, imam, halal and jihad (sensitive: religion; inşallah and maşallah are flagged already)');
flag(true, [[34379, 'tallit'], [34380, 'prayer shawl'], [34381, 'tefillin'], [61218, 'tzitzit'], [34457, 'mezuzah'], [34459, 'seder'], [34460, 'yeshiva'], [34461, 'Star of David'], [34464, 'minyan'],
  [34466, 'Kaddish'], [34467, 'mikvah'], [34468, 'Ark'], [34469, 'Kabbalah'], [34471, 'Zion'], [34474, 'Hasidic'], [61214, 'eruv'], [61215, 'gematria'], [61216, 'chuppah'], [61219, 'Sanhedrin']],
  'a term of Jewish faith and worship, as Torah, shofar, menorah, kosher and bar mitzvah (sensitive: religion); food (challah, latke), dreidel and everyday words (shalom, mazel tov) stay unflagged');
flag(true, [[14048, 'prayer wheel'], [14061, 'bodhi tree'], [15937, 'mantra'], [15950, 'dharma'], [15960, 'tantra'], [29449, 'Zen'], [34475, 'bodhisattva'], [34476, 'sangha'], [34477, 'koan'],
  [34479, 'Four Noble Truths'], [34480, 'Eightfold Path'], [34481, 'satori'], [34482, 'thangka'], [34483, 'prayer flag'], [34484, 'Theravada'], [34485, 'Mahayana'], [34486, 'Vajrayana'], [34489, 'vipassana'],
  [34490, 'zazen'], [34491, 'dukkha'], [34492, 'Siddhartha'], [34496, 'metta'], [50207, 'enlightenment'], [61222, 'anatta'], [61223, 'anicca'], [61224, 'skandha'], [61226, 'bardo'], [61227, 'jhana'], [61228, 'parinirvana']],
  'a term of Buddhist faith and practice, as Buddha, karma, nirvana and meditation (sensitive: religion); lotus, mindfulness, singing bowl and mandala stay unflagged (secular use)');
flag(true, [[15660, 'chakra'], [34497, 'puja'], [34498, 'avatar'], [34511, 'om'], [34514, 'aarti'], [34515, 'prasad'], [34516, 'darshan'], [34518, 'atman'], [34519, 'murti'], [34521, 'yajna'], [34522, 'lingam'],
  [51756, 'kirtan'], [61229, 'Brahman'], [61230, 'bhakti'], [61232, 'varna'], [61233, 'samskara'], [61234, 'jnana']],
  'a term of Hindu faith and worship, as guru, Brahmin, caste and Vedas (sensitive: religion); yoga, bindi, tilak, rangoli and diya stay unflagged (secular or cultural use)');
flag(true, [[21962, 'Vishnu'], [21963, 'Shiva'], [21964, 'Brahma'], [21965, 'Ganesh'], [21968, 'Hanuman'], [21969, 'Krishna'], [21971, 'Lakshmi'], [21972, 'Saraswati'], [21973, 'Parvati'],
  [21974, 'Durga'], [21975, 'Kali'], [21976, 'Indra'], [21977, 'Agni'], [21978, 'Surya'], [21979, 'Varuna'], [21980, 'Vayu'], [21981, 'Yama'], [21982, 'Kartikeya'], [21984, 'Sita'], [21985, 'Radha'],
  [21986, 'Kubera'], [21987, 'Kama'], [21988, 'Ganga'], [21989, 'Narasimha'], [21991, 'Nandi'], [21992, 'Vamana'], [21993, 'Parashurama'], [21994, 'Balarama'], [21995, 'Shakti'],
  [21996, 'Rudra'], [21997, 'Matsya'], [21998, 'Kurma'], [21999, 'Varaha'], [22000, 'Kalki'], [22001, 'Vishwakarma'], [22002, 'Jagannath'], [22003, 'Ayyappan'], [22004, 'Trimurti']],
  'a Hindu god, as god, deity, Allah and Buddha (sensitive: religion); Rama and Garuda are left: one entry holds the god and the legendary hero or winged beast (follow-up)');
flag(true, [[14004, 'font'], [14013, 'confessional'], [14022, 'cross'], [68380, 'stoup']],
  'a furnishing for a rite (baptism, confession, holy water) or the cross itself, as altar (sensitive: religion); the building parts (nave, pulpit, crypt, belfry) stay unflagged as architecture');
// metropolitan: starts with metro holds the bishop sense; the everyday adjective takes that link (the theme keeps its 4th word), then the bishop sense is flagged
{ const b = live(61179, 'metropolitan');
  if (b && b.typ.starts_with_metro !== undefined) { const m = newEntry('metropolitan', 'of a city', { pos: 'adjective', type: 'common', fam: 2, region: [] }, 'the everyday adjective (a metropolitan area), the sense a player knows');
    swap('starts_with_metro', b, m, 'wrong sense: the everyday adjective metropolitan [of a city] takes the link (familiarity 2)', { typ: 2, outWhy: 'the bishop sense: metropolitan [of a city] takes the link' }); }
  flag(true, [[61179, 'metropolitan']], 'a religious office (a bishop of the Orthodox churches), as bishop and archbishop'); }
const S1 = sensCount();

// ---------- W13a: capsicums into chili peppers; chili pepper becomes chili's alias ----------
sec('2. W13a: chili pepper becomes the synonym alias of chili (two roots of one sense; chili, the US and neutral word, is the root, chilli its UK spelling); capsicums, a near-twin of chili peppers, is merged into it (LIBRARY-RULES 6: twins)');
merge(29499, 'chili', 17658, 'chili pepper', 'synonym', 2, 'one sense: chili pepper is the full name of the chili (familiarity 2, the root 1)');
{ const gone = 'capsicums', keepT = 'chili_peppers';
  MERGED[gone] = keepT;
  if (ix.theme.has(gone)) {
    if ((T(gone).groups || []).length) throw Error(gone + ' has synonym groups');
    for (const e of (ix.byTheme.get(gone) || []).filter(e => !e.aliasOf && e.typ[gone] !== undefined)) {
      if (e.id === 29499) continue;   // chili: the bare category word, not one of the kinds (below)
      const g = e.typ[gone];
      if (e.typ[keepT] === undefined) linkE(e, keepT, g, `from its twin ${gone}`, nameLeak(T(keepT), e) ? { nameOk: true } : {});
      else if (g < e.typ[keepT]) rate(e, keepT, g, `the better typicality, from its twin ${gone}`);
    }
    const c = live(29499, 'chili'); if (c && c.typ[gone] !== undefined) unlinkE(c, gone, 'the bare category word: not linked in chili peppers (LIBRARY-RULES 5: never the bare category word in a theme of its kinds)');
    dropTheme(gone, `a near-twin of ${keepT} (pop 2, ident 2 both): its words are in ${keepT} now, with the better typicality of the two`);
  }
  const c = live(29499, 'chili'); if (c) unlinkE(c, keepT, 'the bare category word in a theme of its kinds (it came with chili pepper\'s link): it stays in spicy foods, words from Nahuatl, Andean crops and hot things');
  if (c && (c.nameOkIn || []).includes(keepT)) setE(c, 'nameOkIn', c.nameOkIn.filter(t => t !== keepT), 'no longer in chili peppers');
}

// ---------- W13b: blue penguin into little penguin ----------
sec('3. W13b: blue penguin (NZ) and fairy penguin (AU) become regional aliases of little penguin (one bird; little penguin, its standard name, is the root)');
merge(8241, 'little penguin', 51222, 'blue penguin', 'regional', 3, 'one bird (Eudyptula minor): blue penguin is its New Zealand name', { region: ['NZ'] });
merge(8241, 'little penguin', 8242, 'fairy penguin', 'regional', 4, 'one bird: fairy penguin is its Australian name (its show "fairy" in penguins cannot move: little penguin shows "little" there)', { region: ['AU'] });
{ const a = live(8242, 'fairy penguin'); if (a && a.aliasOf === 8241 && !(a.nameOkIn || []).includes('penguins')) setE(a, 'nameOkIn', [...(a.nameOkIn || []), 'penguins'], 'the alias inherits penguins, where its full name contains penguin (as little blue penguin)'); }
{ const a = live(51222, 'blue penguin'); if (a && a.aliasOf === 8241 && !(a.nameOkIn || []).includes('penguins')) setE(a, 'nameOkIn', [...(a.nameOkIn || []), 'penguins'], 'the alias inherits penguins, where its full name contains penguin (as little blue penguin)'); }
famIf(8241, 'little penguin', 3, 'the standard name of the smallest penguin, as well known as blue penguin (3); 4 made the root harder than its alias');

// ---------- W13c: curry and mushroom out of their own kinds themes ----------
sec('4. W13c: curry and mushroom leave curries and mushrooms (LIBRARY-RULES 5: never the bare category word in a theme of its kinds); each theme keeps four easy members');
unlinkIf(['curries'], 799, 'curry', 'the general word beside its own kinds');
unlinkIf(['mushrooms'], 17645, 'mushroom', 'the general word beside its own kinds');
{ const f = live(17851, 'fish curry'); if (f && !f.aliasOf && ix.theme.has('curries')) linkE(f, 'curries', 2, 'a well-known curry (familiarity 2), a fourth easy member once curry leaves: shown "fish" (curry is a word of the theme name), as "button" in mushrooms', { show: 'fish' }); }
famIf(17613, 'oyster mushroom', 2, 'a supermarket staple nearly every adult has seen (as portobello, 2); the fourth easy member once mushroom leaves (Zipf 3.2)');

// ---------- W13d: bachelor's button no longer cornflower's US display alias ----------
sec('5. W13d: bachelor\'s button becomes a plain synonym of cornflower (as jump drive, v456)');
setKind(1748, "bachelor's button", 'synonym', 'cornflower is the US word as well (cornflower blue, the Crayola color); bachelor\'s button is a garden name. As the US display alias it showed every US player "bachelor\'s button" (familiarity 4) for cornflower (3)');

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

const spreads = [...touchedT].filter(t => GT.includes(t) || ['curries', 'mushrooms', 'chili_peppers', 'penguins'].includes(t)).filter(t => prof0[t] || ix.theme.has(t)).sort().map(t => `  ${t}: ${prof0[t] || 'new'} -> ${profile(t)}`);
const sensRows = SCOPE.filter(t => S0[t]).map(t => { const a = S0[t], b = S1[t] || [0, 0]; return `  ${t}${eff(P, t).sensitive ? '' : ' (theme not sensitive)'}: ${a[0]}/${a[1]} -> ${b[0]}/${b[1]}${a[0] === b[0] ? '' : ` (${b[0] - a[0] > 0 ? '+' : ''}${b[0] - a[0]})`}`; });
const heldBack = FLAGGED.filter(([e, on]) => on).map(([e]) => [e, linkIds(P, e).filter(t => ix.theme.has(t) && !eff(P, t).sensitive)]).filter(([, ts]) => ts.length).map(([e, ts]) => `${lab(e)} (${ts.join(', ')})`);
const freed = FLAGGED.filter(([e, on]) => !on).map(([e]) => `${lab(e)} (${linkIds(P, e).filter(t => ix.theme.has(t) && !eff(P, t).sensitive).join(', ') || 'only sensitive themes'})`);
const gRows = GT.map(t => `  ${t}: ${G0[t] || '-'} -> ${ix.theme.has(t) ? (gameLo(t) || '-') : 'gone' + (MERGED[t] ? ` (merged into ${MERGED[t]}: ${gameLo(MERGED[t]) || '-'})` : '')}${ix.theme.has(t) ? ` (theme difficulty ${themeDifficulty(T(t))})` : ''}`);
const FS1 = firstSynLine();
const summary = [`Library batch v457 (ISSUES W12, W13; Simon, 2026-11-24: "fix"): religious words flagged sensitive by sense; capsicums merged into chili peppers, chili pepper the alias of chili, blue penguin and fairy penguin regional aliases of little penguin; curry and mushroom out of their kinds themes; bachelor's button no longer cornflower's US display alias.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  `Sensitive roots linked per theme (sensitive / all), before -> after (${FLAGGED.filter(f => f[1]).length} roots flagged, ${FLAGGED.filter(f => !f[1]).length} unflagged; aliases follow their roots):`, ...sensRows,
  `Newly flagged roots also linked in themes that are not sensitive (held back to level 31 there now) ${heldBack.length}: ${heldBack.join('; ') || 'none'}`,
  `Unflagged roots, now usable before level 31 in: ${freed.join('; ') || 'none'}`,
  'Game-like 4th-easiest band below level 31 (roots not sensitive, adult, offensive or a name word; v456 measure), before -> after:', ...gRows,
  'Difficulty spread and gap of the W13 themes (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `First synonym aliases harder than root familiarity + 1: ${FS0.bad.length} -> ${FS1.bad.length}${FS1.bad.length ? ': ' + FS1.bad.join(', ') : ''}`,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id))).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}; themes deleted ${counts.deletedThemes}; entries merged ${counts.merged}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch457-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch457-review-tail.txt', import.meta.url), 'utf8') : '';
const NOTICE = fs.existsSync(new URL('./batch457-notice.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch457-notice.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + (NOTICE ? '\n' + NOTICE : ''));
fs.writeFileSync(REVIEW || new URL('./batch457-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

// Library batch v453: only real people are typed person (Simon, 2026-11-24). Fictional characters, figures of myth, legend and folklore, and
//   personifications are retyped person -> proper (LIBRARY-RULES 4 type), with their aliases typed person; given-name entries stay person.
//   Reason: the game may hold back a theme as a people theme when 70% of its members are typed person; character themes must keep playing early.
//   Reasons per word and the borderline decisions in the review (batch453-review.txt).
// Base: library v452. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch453.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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

// ---------- helpers of this batch (v453) ----------
// Person share of a theme: its root members typed person / all its root members.
const share = tid => { const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined); return [ws.filter(e => e.type === 'person').length, ws.length]; };
const SH0 = Object.fromEntries(P.themes.map(t => [t.id, share(t.id)]));
// Themes about fictional, mythical or legendary figures (for the share report and the kept-person list)
const FICTION = new Set(['national_symbols', 'symbols_of_the_usa', 'british_isles_symbols', 'detective_words', 'fictional_detectives', 'video_game_characters', 'nintendo_characters', 'villains_and_monsters',
  'shakespeare_characters', 'characters_in_tragedies', 'characters_in_comedies', 'fairy_tales', 'march_sisters', 'superheroes', 'fantasy', 'mythology', 'greek_gods', 'trojan_war', 'second_generation_titans',
  'inca_gods', 'chinese_mythology', 'maori_mythology', 'yoruba_orishas', 'mythical_creatures', 'shapeshifters', 'giants_of_legend', 'greek_monsters', 'greek_heroes', 'legendary_heroes', 'arthurian_legend',
  'robin_hood_legend', 'japanese_folklore', 'celtic_folklore', 'african_folklore', 'slavic_folklore', 'native_american_folklore', 'turkish_folklore', 'arabian_nights', 'american_tall_tales', 'egyptian_afterlife',
  'famous_knights', 'knights', 'dragons']);
const BORDER = [], RT = { roots: new Set(), aliases: new Set() };
// Retype a root person -> proper, and its aliases typed person with it (an alias carries its root's type: LIBRARY-RULES 4).
const retype = (id, text, why) => {
  const e = live(id, text); if (!e) return;
  if (e.aliasOf) throw Error(`${lab(e)} is an alias`);
  if (e.type === 'person') { setE(e, 'type', 'proper', why); RT.roots.add(id); for (const t of linkIds(P, e)) if (ix.theme.has(t)) touchedT.add(t); }
  for (const a of P.entries.filter(a => a.aliasOf === id && a.type === 'person')) { setE(a, 'type', 'proper', `${a.aliasKind} alias of ${lab(e)}: its root's type`); RT.aliases.add(a.id); }
};
const R = (why, list) => { for (const [id, text, w] of list) retype(id, text, w ? `${why}: ${w}` : why); };
// Borderline: retyped (proper) or kept (person), with the reason; listed in the review.
const borderP = (id, text, why) => { retype(id, text, `borderline, proper: ${why}`); BORDER.push(`  ${text} ${id}: proper: ${why}`); };
const borderK = (id, text, why) => { const e = live(id, text); if (e) BORDER.push(`  ${text} ${id}: stays person: ${why}`); };

// =================================================================================================
sec('1. Only real people are typed person (Simon, 2026-11-24): fictional characters, figures of myth, legend and folklore, and personifications are typed proper (LIBRARY-RULES 4 type). The game may hold back a theme as a people theme when 70% of its members are typed person; character themes must keep playing early. An alias typed person follows its root.');
sec('1a. Personifications');
R('a personification, not a real person', [[2529, 'Uncle Sam', 'the national personification of the USA'], [2541, 'John Bull', 'the national personification of England'], [2542, 'Britannia', 'the national personification of Britain'],
  [2543, 'Marianne', 'the national personification of France'], [13920, 'Rei Momo', 'King Momo, the carnival king of Brazilian carnival (the Greek god of mockery Momus)']]);

sec('1b. Fictional characters (novels, plays, films, TV, comics, games)');
R('fictional', [
  [13571, 'Sherlock Holmes', "Arthur Conan Doyle's detective"], [13573, 'Hercule Poirot', "Agatha Christie's detective"], [13575, 'Miss Marple', "Agatha Christie's detective"], [13576, 'Nancy Drew', 'the girl detective of the Stratemeyer books'],
  [13577, 'Philip Marlowe', "Raymond Chandler's detective"], [13578, 'Sam Spade', "Dashiell Hammett's detective"], [13579, 'Inspector Clouseau', 'the detective of the Pink Panther films'], [13580, 'Columbo', 'the TV detective'],
  [13581, 'Father Brown', "G. K. Chesterton's priest detective"], [13582, 'Lord Peter Wimsey', "Dorothy L. Sayers's detective"], [13583, 'Inspector Morse', "Colin Dexter's detective"], [13585, 'Inspector Rebus', "Ian Rankin's detective"],
  [13586, 'Kinsey Millhone', "Sue Grafton's detective"], [13587, 'Dirk Gently', "Douglas Adams's detective"], [13588, 'Encyclopedia Brown', "Donald J. Sobol's boy detective"], [13589, 'Jessica Fletcher', 'the detective of Murder, She Wrote'],
  [13590, 'Inspector Gadget', 'the cartoon detective'], [13591, 'Precious Ramotswe', "Alexander McCall Smith's detective"], [13592, 'Harry Bosch', "Michael Connelly's detective"], [13593, 'Adrian Monk', 'the TV detective of Monk'],
  [13594, 'Veronica Mars', 'the TV detective'], [13595, 'Brother Cadfael', "Ellis Peters's monk detective"], [13596, 'Jules Maigret', "Georges Simenon's detective"], [13598, 'Auguste Dupin', "Edgar Allan Poe's detective"],
  [61140, 'Dupin', "Poe's detective C. Auguste Dupin"], [13599, 'Mike Hammer', "Mickey Spillane's detective"], [13600, 'Lisbeth Salander', "Stieg Larsson's hacker"], [13601, 'Kurt Wallander', "Henning Mankell's detective"],
  [13602, 'Dick Tracy', 'the comic-strip detective'], [13603, 'Nero Wolfe', "Rex Stout's detective"], [13604, 'Cormoran Strike', "Robert Galbraith's detective"], [13605, 'Hamish Macbeth', "M. C. Beaton's detective"],
  [13606, 'Jim Rockford', 'the detective of The Rockford Files'], [13607, 'Ace Ventura', 'the pet detective of the films'],
  [6781, 'Long John Silver', 'the pirate of Treasure Island'], [6782, 'Captain Hook', 'the pirate of Peter Pan'], [6783, 'Jack Sparrow', 'the pirate of Pirates of the Caribbean'], [6810, 'Dread Pirate Roberts', 'the pirate of The Princess Bride'],
  [21199, 'Captain Flint', 'the pirate of Treasure Island'], [21200, 'Hector Barbossa', 'the pirate of Pirates of the Caribbean'], [21202, 'Captain Pugwash', 'the cartoon pirate'],
  [6910, 'Indiana Jones', 'the archaeologist of the films'], [7003, 'Gandalf', "Tolkien's wizard"], [7005, 'Dumbledore', 'the headmaster of the Harry Potter books'],
  [22980, 'Ebenezer Scrooge', "Dickens's miser of A Christmas Carol"], [22979, 'Oliver Twist', "Dickens's orphan"], [22989, 'Fagin', 'the thief of Oliver Twist'], [22990, 'Tiny Tim', 'the boy of A Christmas Carol'],
  [54092, 'Don Quixote', "Cervantes's knight"], [40096, 'Homer Simpson', 'the cartoon father of The Simpsons'], [52811, 'Tony Stark', 'Iron Man of Marvel comics'], [58866, 'Beth Harmon', 'the chess player of The Queen\'s Gambit'],
  [45814, 'Luigi', 'a Nintendo game character'], [45815, 'Sonic', 'the Sega game hedgehog'], [45816, 'Link', 'the hero of The Legend of Zelda'], [45817, 'Zelda', 'the princess of The Legend of Zelda'],
  [45818, 'Bowser', 'the Mario games villain'], [45819, 'Princess Peach', 'a Mario games character'], [45820, 'Yoshi', 'a Mario games character'], [45821, 'Samus Aran', 'the hero of Metroid'],
  [45822, 'Mega Man', 'a game character'], [45823, 'Lara Croft', 'the hero of Tomb Raider'], [45824, 'Master Chief', 'the hero of Halo'], [45825, 'Kratos', 'the hero of God of War'],
  [45826, 'Crash Bandicoot', 'a game character'], [45827, 'Ryu', 'a Street Fighter character'], [45828, 'Cloud Strife', 'the hero of Final Fantasy VII'], [45829, 'Steve', 'the Minecraft player character'],
  [45830, 'Creeper', 'the Minecraft monster'], [45831, 'Tails', 'a Sonic games character'], [45832, 'Q*bert', 'a game character'], [45833, 'Solid Snake', 'the hero of Metal Gear'],
  [45834, 'Geralt', 'the hero of The Witcher'], [45835, 'Ezio', "the hero of Assassin's Creed II"], [45836, 'Sackboy', 'the LittleBigPlanet character'], [45837, 'Rayman', 'a game character'],
  [45838, 'Spyro', 'the game dragon'], [45839, 'Ganondorf', 'the Zelda games villain'], [45840, 'Toad', 'a Mario games character'], [45841, 'Dr. Robotnik', 'the Sonic games villain'],
  [45842, 'Knuckles', 'a Sonic games character'], [45843, 'Chun-Li', 'a Street Fighter character'], [45844, 'Sub-Zero', 'a Mortal Kombat character'], [45845, 'Ms. Pac-Man', 'a game character'],
  [45846, 'Fox McCloud', 'the hero of Star Fox'], [45847, 'Wario', 'a Mario games character'], [45848, 'Dante', 'the hero of Devil May Cry'], [45849, 'Ellie', 'a character of The Last of Us'],
  [45850, 'Aloy', 'the hero of Horizon'], [45851, 'Doomguy', 'the hero of Doom'], [45852, 'Duke Nukem', 'a game character'], [45853, 'GLaDOS', 'the AI villain of Portal'],
  [61803, 'Gordon Freeman', 'the hero of Half-Life'], [61804, 'Sephiroth', 'the Final Fantasy VII villain'], [61805, 'Simon Belmont', 'the hero of Castlevania'], [61806, 'Captain Falcon', 'the F-Zero character'],
  [61807, 'Earthworm Jim', 'a game character'], [61808, 'Pyramid Head', 'the Silent Hill monster'], [61809, 'Isaac Clarke', 'the hero of Dead Space'], [61810, 'Marcus Fenix', 'the hero of Gears of War'],
]);

sec('1c. Figures of myth (Greek, Trojan War, Egyptian, Chinese, Hindu, Māori)');
R('a figure of myth', [
  [6926, 'Medusa', 'the Gorgon of Greek myth'], [6950, 'Hercules', 'the hero of Greek and Roman myth'], [6951, 'Achilles', 'the hero of the Iliad'], [6952, 'Odysseus', 'the hero of the Odyssey'],
  [6953, 'Perseus', 'the Greek hero'], [6954, 'Theseus', 'the Greek hero'], [6955, 'Prometheus', 'the Titan of Greek myth'], [6956, 'Narcissus', 'the youth of Greek myth'],
  [6958, 'Icarus', 'the son of Daedalus in Greek myth'], [6959, 'Sisyphus', 'the king punished in Greek myth'], [6960, 'Orpheus', 'the singer of Greek myth'],
  [22271, 'Jason', 'the leader of the Argonauts'], [22272, 'Bellerophon', 'the Greek hero'], [22273, 'Atalanta', 'the Greek huntress'], [22274, 'Ajax', 'the hero of the Iliad'],
  [22275, 'Hector', 'the Trojan hero of the Iliad'], [22276, 'Agamemnon', 'the king of the Iliad'], [22277, 'Menelaus', 'the king of the Iliad'], [22278, 'Patroclus', 'the hero of the Iliad'],
  [22279, 'Diomedes', 'the hero of the Iliad'], [22280, 'Aeneas', 'the Trojan hero of the Aeneid'], [22281, 'Cadmus', 'the founder of Thebes in Greek myth'], [22282, 'Oedipus', 'the king of Greek myth'],
  [22283, 'Meleager', 'the Greek hero'], [22284, 'Nestor', 'the old king of the Iliad'], [22285, 'Paris', 'the Trojan prince of the Iliad'], [22286, 'Castor', 'one of the Dioscuri'],
  [22287, 'Pollux', 'one of the Dioscuri'], [22289, 'Telemachus', 'the son of Odysseus'], [22291, 'Helen of Troy', 'the queen of the Iliad'], [22292, 'Medea', 'the sorceress of Greek myth'],
  [22293, 'Antigone', 'the daughter of Oedipus'], [22294, 'Philoctetes', 'the archer of the Trojan War'], [22295, 'Orion', 'the giant hunter of Greek myth'], [22296, 'Daedalus', 'the craftsman of Greek myth'],
  [22288, 'Peleus', 'the father of Achilles'], [22298, 'Laocoön', 'the Trojan priest of the Aeneid (famous statues holds the statue named after him)'], [53993, 'Pelops', 'the founder of the Olympic games in Greek myth'],
  [54871, 'Priam', 'the king of Troy in the Iliad'], [54872, 'Cassandra', 'the Trojan seer'], [54873, 'Hecuba', 'the queen of Troy'], [54874, 'Andromache', 'the wife of Hector'],
  [54875, 'Briseis', 'the captive of Achilles'], [54876, 'Sinon', 'the Greek who brought in the wooden horse'], [54877, 'Thetis', 'the sea nymph, mother of Achilles'], [54878, 'Neoptolemus', 'the son of Achilles'],
  [54879, 'Penthesilea', 'the Amazon queen'], [54880, 'Memnon', 'the Ethiopian king of the Trojan War'], [54881, 'Sarpedon', 'the son of Zeus at Troy'], [54885, 'Calchas', 'the Greek seer'],
  [54886, 'Deiphobus', 'the Trojan prince'], [54887, 'Polyxena', 'the Trojan princess'],
  [53935, 'Ammit', 'the devourer of the dead in Egyptian myth'], [22129, 'Houyi', 'the archer of Chinese myth'], [55695, 'Hou Yi', 'the archer of the Moon legend'], [55694, 'Wu Gang', 'the woodcutter on the Moon'],
  [55681, 'Prahlad', 'the devotee of Vishnu in the Holi story'], [55682, 'Holika', 'the demoness of the Holi story'], [55683, 'Hiranyakashipu', 'the demon king of the Holi story'],
  [22178, 'Rata', 'the canoe builder of Māori myth'], [22183, 'Tāwhaki', 'the demigod of Māori myth'], [22184, 'Hatupatu', 'the hero of Māori legend'],
]);

sec('1d. Figures of legend and folklore');
R('a figure of legend or folklore', [
  [7004, 'Merlin', 'the wizard of Arthurian legend'], [20687, 'King Arthur', 'the king of Arthurian legend'], [20689, 'Lancelot', 'the knight of Arthurian legend'], [20698, 'Galahad', 'the knight of Arthurian legend'],
  [20699, 'Gawain', 'the knight of Arthurian legend'], [54089, 'Tristan', 'the knight of Arthurian legend'], [54090, 'Bedivere', 'the knight of Arthurian legend'], [54091, 'Sir Bors', 'the knight of Arthurian legend'],
  [54095, 'Sir Ector', 'the foster father of Arthur'], [54100, 'Sir Palamedes', 'the knight of Arthurian legend'], [54102, 'Sir Lionel', 'the knight of Arthurian legend'], [22526, 'Guinevere', 'the queen of Arthurian legend'],
  [22530, 'Mordred', 'the traitor of Arthurian legend'], [55053, 'Morgan le Fay', 'the enchantress of Arthurian legend'], [55057, 'Uther Pendragon', 'the father of Arthur'], [55058, 'Isolde', 'the lover of Tristan'],
  [55059, 'Kay', 'the knight of Arthurian legend'], [55060, 'Igraine', 'the mother of Arthur'], [55061, 'Nimue', 'the Lady of the Lake'], [55065, 'Pellinore', 'the king of Arthurian legend'],
  [55067, 'Lamorak', 'the knight of Arthurian legend'], [55068, 'Gareth', 'the knight of Arthurian legend'], [55069, 'Elaine of Astolat', 'the maid of Arthurian legend'],
  [22523, 'Little John', 'of the Robin Hood legend'], [22524, 'Friar Tuck', 'of the Robin Hood legend'], [22525, 'Maid Marian', 'of the Robin Hood legend'], [22528, 'Will Scarlet', 'of the Robin Hood legend'],
  [55071, 'Sheriff of Nottingham', 'of the Robin Hood legend'], [55074, 'Guy of Gisborne', 'of the Robin Hood legend'], [55075, 'Alan-a-Dale', 'of the Robin Hood legend'], [55076, 'Much the Miller', 'of the Robin Hood legend'],
  [55088, 'Hood', 'Robin Hood (whose root 12551 is proper already)'], [62904, 'Loxley', 'Robin of Loxley, Robin Hood'],
  [20677, 'Cú Chulainn', 'the hero of the Ulster Cycle'], [22517, 'Finn McCool', 'the giant hero of Irish legend'], [22512, 'Beowulf', 'the hero of the Old English epic'], [22514, 'Siegfried', 'the hero of the Nibelungenlied'],
  [62055, 'Rustam', 'the hero of the Shahnameh'], [22538, 'Urashima Taro', 'the fisherman of Japanese folklore'], [22703, 'Deli Dumrul', 'the hero of the Book of Dede Korkut'],
  [22704, 'Aladdin', 'of the Arabian Nights'], [22705, 'Scheherazade', 'the storyteller of the Arabian Nights'], [22713, 'Morgiana', 'of the Arabian Nights (Ali Baba)'], [22714, 'Princess Jasmine', 'of the Disney Aladdin'],
  [22717, 'Cassim', 'the brother of Ali Baba'], [22721, 'Shahryar', 'the king of the Arabian Nights frame story'], [22722, 'Dinarzad', 'the sister of Scheherazade'],
  [22751, 'Paul Bunyan', 'the giant lumberjack of American tall tales'], [22753, 'Pecos Bill', 'the cowboy of American tall tales'], [22760, 'Febold Feboldson', 'of American tall tales'], [22761, 'Stormalong', 'the sailor of American tall tales'],
  [22762, 'Slue-Foot Sue', 'the wife of Pecos Bill'], [22763, 'Joe Magarac', 'the steelworker of American tall tales'], [22768, 'Johnny Kaw', 'of Kansas tall tales'], [22769, 'Sally Ann Thunder', 'of American tall tales'],
  [22770, 'Tony Beaver', 'of American tall tales'], [22773, 'Rip Van Winkle', "Washington Irving's sleeper"], [21180, 'Davy Jones', "the sailors' devil of the sea (Davy Jones's locker)"],
  [55043, 'Anak', 'the giant of the Bible'], [55044, 'Og of Bashan', 'the giant king of the Bible and later legend'],
]);

sec('1e. Borderline: disputed historicity, a real person mainly known as a legend, or a sense that mixes real and fictional (listed with reasons in the review)');
borderP(20515, 'Gilgamesh', 'maybe a real king of Uruk, but the entry is the hero of the Epic (mesopotamia, legendary heroes)');
borderP(20407, 'Romulus', 'the legendary founder of Rome, not accepted as historical');
borderP(6957, 'Midas', 'the king with the golden touch of Greek myth (in mythology); the real Phrygian king Mita is another figure');
borderP(22078, 'Manco Capac', 'the legendary first Inca, son of the sun god (in Inca gods); historicity disputed');
borderP(22220, 'Oduduwa', 'the progenitor of the Yoruba, worshipped as an orisha (in Yoruba orishas); maybe a deified king');
borderP(22174, 'Kupe', 'the legendary navigator who found Aotearoa in Māori tradition (Māori mythology, Polynesian voyaging)');
borderP(20590, 'Ragnar Lothbrok', 'a saga hero; historians treat him as legendary or a composite of several Vikings');
borderP(22635, 'Sadko', 'the merchant hero of the Novgorod bylina; at most loosely based on a real merchant');
borderP(22636, 'Ilya Muromets', 'the bogatyr of the byliny (legendary heroes); a venerated monk of the name is a separate figure');
borderP(22683, 'Dede Korkut', 'the legendary bard of the Oghuz epic, not accepted as historical');
borderP(22688, 'Nasreddin', 'the folk wit of the jokes (Turkish folklore); a real 13th-century man is possible but unproven; his alias Hodja is typed proper already');
borderP(22702, 'Koroglu', 'the outlaw hero of the Turkic epic; possibly based on a 16th-century rebel, known as the legend');
borderP(22754, 'John Henry', 'the steel-driving man of the folk song (American tall tales); a real man behind him is possible but unproven');
borderP(22708, 'Jafar', 'the vizier as a character of the Arabian Nights (and the Disney villain); the real Jaʿfar al-Barmaki is the model, the entry the character');
borderP(62875, 'Sheba', 'the Queen of Sheba of the Bible and legend (famous queens); her historicity is not established');
borderP(54632, 'Dido', 'the founder queen of Carthage of the Aeneid (famous queens); historicity disputed, known as the legend');
borderP(34338, 'Christopher', 'reviewer: the clearest legendary saint, dropped from the general Roman calendar in 1969 for doubtful historicity (same test as John Henry)');
borderP(55155, 'Molly Pitcher', 'reviewer: a composite or folk figure, only possibly Mary Ludwig Hays (same test as John Henry)');
R('reviewer: a clan, not one person; the other houses in dynasties are proper and surnames are proper (LIBRARY-RULES 4 type)', [[20567, 'Tokugawa'], [20572, 'Minamoto'], [20583, 'Ashikaga']]);
{ const a = live(55070, 'Pendragon'); if (a && a.aliasOf === 55057 && a.type !== 'proper') setE(a, 'type', 'proper', 'reviewer: synonym alias of Uther Pendragon 55057 (proper); an alias carries its root\'s type, and title is for works, not ranks'); }
borderK(20367, 'Homer', 'the poet of the Iliad and Odyssey; whether he lived is debated, but he is treated as the author (ancient Greek writers)');
borderK(20465, 'Laozi', 'the founder of Taoism; historicity debated, treated as a real thinker (ancient China)');
borderK(20463, 'Sun Tzu', 'the author of The Art of War; historicity debated, treated as a real general and writer');
borderK(20534, 'Zoroaster', 'the prophet of Zoroastrianism, generally accepted as real though his dates are unknown');
borderK(20607, 'Björn Ironside', 'a semi-legendary Viking king, generally accepted as a real person');
borderK(20671, 'Brigid', 'Saint Brigid of Kildare (gloss saint, famous saints); also in Celtic folklore, where the goddess Brigid blends with her: one sense mixing both, not split here');
borderK(22471, 'Saint George', 'a real martyr; the dragon (dragons) is legend: one sense covering both');
borderK(25031, 'Saint Nicholas', 'the real bishop of Myra; in Christmas he is also the gift-bringer: one sense covering both');
borderK(22515, 'Roland', 'the real Frankish lord killed at Roncevaux (778), mainly known from the Song of Roland');
borderK(20700, 'El Cid', 'Rodrigo Díaz de Vivar, a real knight, also the hero of the epic');
borderK(62056, 'Hereward the Wake', 'a real English rebel against the Normans, mainly known as a legend');
borderK(22575, 'Taliesin', 'a real 6th-century bard; in Celtic folklore also the legendary Taliesin: one sense covering both');
borderK(22647, 'Hiawatha', 'the real Iroquois leader (gloss chief), though Native American folklore and Longfellow\'s poem make a legend of him');
borderK(22755, 'Johnny Appleseed', 'John Chapman, a real nurseryman (Simon\'s list)');
borderK(22756, 'Davy Crockett', 'a real frontiersman and congressman (Simon\'s list)');
borderK(22757, 'Casey Jones', 'a real engineer (Simon\'s list)');
borderK(22758, 'Calamity Jane', 'Martha Jane Canary, a real frontierswoman');
borderK(22759, 'Mike Fink', 'a real keelboatman, mainly known from tall tales');
borderK(21682, 'Lady Godiva', 'Godgifu, a real Anglo-Saxon noblewoman; the naked ride is legend');
borderK(22447, 'Nicolas Flamel', 'a real Paris scribe; his alchemy is legend');
borderK(22709, 'Harun al-Rashid', 'the real Abbasid caliph, also a character of the Arabian Nights');
borderK(55073, 'Prince John', 'the real King John, as he appears in the Robin Hood legend (gloss Robin Hood); like Richard the Lionheart there');
borderK(21201, 'Redbeard', 'gloss empty, in famous pirates: the nickname of the real Barbarossa brothers (Hayreddin is Barbarossa 20650); no clear fictional Redbeard');
borderK(6881, 'Iceman', 'Ötzi, a real prehistoric man');
borderK(20578, 'Hattori Hanzo', 'a real samurai (Hattori Masanari), also a figure of ninja legend');

sec('1f. Kept person on purpose: given-name entries (and names) that also hold a link in a character theme (accepted earlier: ISSUES I18, DESIGN-entries v394-v397)');
const KEPT_NAMES = P.entries.filter(e => !e.aliasOf && e.type === 'person' && linkIds(P, e).some(t => FICTION.has(t)) && !BORDER.some(b => b.startsWith(`  ${e.text} ${e.id}:`)) && linkIds(P, e).some(t => /names|palindromes/.test(t)));
for (const e of KEPT_NAMES) A.push(`  kept person: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''} in ${linkIds(P, e).join(', ')}`);
const LEFT = P.entries.filter(e => !e.aliasOf && e.type === 'person' && linkIds(P, e).some(t => FICTION.has(t)) && !KEPT_NAMES.includes(e) && !BORDER.some(b => b.startsWith(`  ${e.text} ${e.id}:`)));
A.push(`  other entries typed person in a character theme (real people) ${LEFT.length}: ${LEFT.map(e => `${lab(e)} (${linkIds(P, e).filter(t => FICTION.has(t)).join(', ')})`).join('; ') || 'none'}`);
A.push('#Borderline (' + BORDER.length + '):', ...BORDER);

sec('1g. Person share of the themes (root members typed person / root members), before -> after');
{ const rows = [], fic70 = [], low = [];
  for (const t of P.themes) { const [a0, b0] = SH0[t.id] || [0, 0], [a1, b1] = share(t.id); if (!b1) continue;
    const p0 = b0 ? a0 / b0 : 0, p1 = a1 / b1;
    if (a0 !== a1) rows.push(`  ${t.id}: ${a0}/${b0} ${Math.round(100 * p0)}% -> ${a1}/${b1} ${Math.round(100 * p1)}%`);
    if (p1 >= 0.7 && FICTION.has(t.id)) fic70.push(`${t.id} ${Math.round(100 * p1)}%`);
    if (p1 >= 0.4 && p1 < 0.7) low.push(`${t.id} ${a1}/${b1} ${Math.round(100 * p1)}%`); }
  A.push(`themes whose person share changed ${rows.length}:`, ...rows);
  A.push(`  character, myth or legend themes now at 70%+ person: ${fic70.join(', ') || 'none'}`);
  A.push(`  themes at 40-69% person after (themes of real people under 70%?): ${low.join(', ') || 'none'}`); }


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
const summary = [`Library batch v453: only real people typed person (Simon, 2026-11-24): ${RT.roots.size} fictional, mythical, legendary and personified figures retyped person -> proper (${RT.aliases.size} aliases with them), ${BORDER.length} borderline decisions listed (${BORDER.filter(b => b.includes(': proper:')).length} proper, ${BORDER.filter(b => b.includes(': stays person:')).length} stay person); given-name entries stay person.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch453-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch453-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch453-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

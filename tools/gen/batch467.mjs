// Library batch v467 (for Simon's review): Qualities, synonyms branch (11 themes read word by word, 2026-11-25).
// Words that do not fit go and well-known words are added, about 8 a theme at most; new themes: words for funny, words for strong, words for new.
// Base: library v466. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch467.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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

// ---------- this batch (v467) ----------
// A new entry linked in tid. x: gloss, pos, show.
const add = (tid, text, fam, typ, why, x = {}) => { const e = newEntry(text, x.gloss || '', { pos: x.pos || 'noun', type: 'common', fam }, why); linkE(e, tid, typ, why, x.show ? { show: x.show } : {}); return e; };
const outL = (tid, list) => { for (const [id, text, why] of list) unlinkIf([tid], id, text, why); };
const grp = (tid, ids, why) => { if (ids.every(id => ix.entry.get(id) && E(id).typ[tid] !== undefined)) addToGroup(tid, ids, why); };
const rateL = (tid, list, why) => { for (const [id, text, typ] of list) { const e = live(id, text); if (e && e.typ[tid] !== undefined) rate(e, tid, typ, why); } };
const addKin = (a, b, why) => { if (!a || !b || a.id === b.id || (a.kin || []).includes(b.id)) return; setKin(P, a, b, true); n++; reindex(P); A.push(`kin: ${lab(a)}${a.gloss ? ' [' + a.gloss + ']' : ''} <-> ${lab(b)}${b.gloss ? ' [' + b.gloss + ']' : ''}: ${why}`); };
const N = {};

sec("1. words for big");
N["astronomical[huge]"] = add("words_for_big", "astronomical", 3, 3, 'a common word that was not in the library', { gloss: "huge", pos: "adjective" });

sec("2. words for small");
N["minute[tiny]"] = add("words_for_small", "minute", 3, 2, 'a common word that was not in the library', { gloss: "tiny", pos: "adjective" });

sec("3. words for fast");
outL("words_for_fast", [[39322, "lightning-fast", "holds \"fast\", the word in the category name"], [39317, "rapid-fire", "rapid is there"], [50080, "precipitate", "a verb here, not an adjective"]]);
linkL("words_for_fast", [[27830, "lickety-split", 3]], "well known here; it was not linked");

sec("4. words for good");
linkL("words_for_good", [[27359, "ace", 3]], "well known here; it was not linked");
N["perfect[flawless]"] = add("words_for_good", "perfect", 1, 2, 'a common word that was not in the library', { gloss: "flawless", pos: "adjective" });
N["incredible"] = add("words_for_good", "incredible", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["phenomenal"] = add("words_for_good", "phenomenal", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["sensational"] = add("words_for_good", "sensational", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["exceptional"] = add("words_for_good", "exceptional", 2, 3, 'a common word that was not in the library', { pos: "adjective" });

sec("5. words for bad");
outL("words_for_bad", [[29409, "dreck", "a noun among adjectives"], [62485, "godawful", "awful is there"]]);
linkL("words_for_bad", [[29048, "evil", 2], [60914, "abominable", 3]], "well known here; it was not linked");
N["disgusting"] = add("words_for_bad", "disgusting", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["unpleasant"] = add("words_for_bad", "unpleasant", 2, 2, 'a common word that was not in the library', { pos: "adjective" });

sec("6. words for smart");
outL("words_for_smart", [[39403, "whip-smart", "holds \"smart\", the word in the category name"], [62496, "nous", "a noun among adjectives"]]);
N["educated"] = add("words_for_smart", "educated", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["intellectual"] = add("words_for_smart", "intellectual", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["well-read"] = add("words_for_smart", "well-read", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["cunning"] = add("words_for_smart", "cunning", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["precocious"] = add("words_for_smart", "precocious", 3, 4, 'a common word that was not in the library', { pos: "adjective" });

sec("7. words for strange");
N["mysterious"] = add("words_for_strange", "mysterious", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["exotic"] = add("words_for_strange", "exotic", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["unfamiliar"] = add("words_for_strange", "unfamiliar", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["off-the-wall"] = add("words_for_strange", "off-the-wall", 3, 3, 'a common word that was not in the library', { pos: "adjective" });

sec("8. words for pretty");
outL("words_for_pretty", [[39470, "drop-dead gorgeous", "gorgeous is there"]]);
linkL("words_for_pretty", [[40029, "dazzling", 3], [66923, "eye-catching", 3]], "well known here; it was not linked");
N["glamorous"] = add("words_for_pretty", "glamorous", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["breathtaking"] = add("words_for_pretty", "breathtaking", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["photogenic"] = add("words_for_pretty", "photogenic", 3, 4, 'a common word that was not in the library', { pos: "adjective" });

sec("9. words for old");
outL("words_for_old", [[39485, "olden", "a form of \"old\", the word in the category name"], [32524, "senior", "a noun among adjectives"], [39475, "aging", "aged is there"], [28679, "dated", "outdated is there"], [39477, "historic", "it means important, and prehistoric is there"], [39492, "tried and true", "it means proven, not old"]]);
linkL("words_for_old", [[25154, "over the hill", 3]], "well known here; it was not linked");
N["mature[grown-up]"] = add("words_for_old", "mature", 1, 2, 'a common word that was not in the library', { gloss: "grown-up", pos: "adjective" });
N["primitive"] = add("words_for_old", "primitive", 2, 3, 'a common word that was not in the library', { pos: "adjective" });

sec("10. words for noise");
linkL("words_for_noise", [[14696, "sound", 2], [39587, "clatter", 3], [27795, "kerfuffle", 4], [29564, "bedlam", 4]], "well known here; it was not linked");

sec("11. words for tired");
N["wiped out"] = add("feeling_tired", "wiped out", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["burned out"] = add("feeling_tired", "burned out", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["frazzled"] = add("feeling_tired", "frazzled", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["spent[exhausted]"] = add("feeling_tired", "spent", 3, 4, 'a common word that was not in the library', { gloss: "exhausted", pos: "adjective" });
N["zonked"] = add("feeling_tired", "zonked", 4, 4, 'a common word that was not in the library', { pos: "adjective" });

sec("12. words for funny (new)");
newTheme({ id: "words_for_funny", name: "words for funny", parent: "synonyms", pop: 2, ident: 2, tkind: "category", note: "hilarious, amusing, silly, comical, witty" }, "words_for_strange", "a basic word with no list; most of its words were not in the library");
linkL("words_for_funny", [[39424, "wacky", 3], [39425, "zany", 3], [29096, "facetious", 4], [29080, "wry", 4]], "a well-known member of the new theme");
N["hilarious"] = add("words_for_funny", "hilarious", 1, 1, 'a common word that was not in the library', { pos: "adjective" });
N["silly"] = add("words_for_funny", "silly", 1, 1, 'a common word that was not in the library', { pos: "adjective" });
N["amusing"] = add("words_for_funny", "amusing", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["humorous"] = add("words_for_funny", "humorous", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["comical"] = add("words_for_funny", "comical", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["ridiculous"] = add("words_for_funny", "ridiculous", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["hysterical"] = add("words_for_funny", "hysterical", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["witty"] = add("words_for_funny", "witty", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["goofy[silly]"] = add("words_for_funny", "goofy", 2, 3, 'a common word that was not in the library', { gloss: "silly", pos: "adjective" });
N["entertaining"] = add("words_for_funny", "entertaining", 1, 3, 'a common word that was not in the library', { pos: "adjective" });
N["laughable"] = add("words_for_funny", "laughable", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["priceless"] = add("words_for_funny", "priceless", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["tongue-in-cheek"] = add("words_for_funny", "tongue-in-cheek", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["side-splitting"] = add("words_for_funny", "side-splitting", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["absurd"] = add("words_for_funny", "absurd", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["droll"] = add("words_for_funny", "droll", 4, 4, 'a common word that was not in the library', { pos: "adjective" });
N["uproarious"] = add("words_for_funny", "uproarious", 4, 4, 'a common word that was not in the library', { pos: "adjective" });
N["farcical"] = add("words_for_funny", "farcical", 4, 4, 'a common word that was not in the library', { pos: "adjective" });
N["rib-tickling"] = add("words_for_funny", "rib-tickling", 4, 4, 'a common word that was not in the library', { pos: "adjective" });
N["jocular"] = add("words_for_funny", "jocular", 5, 4, 'a common word that was not in the library', { pos: "adjective" });
N["risible"] = add("words_for_funny", "risible", 5, 4, 'a common word that was not in the library', { pos: "adjective" });

sec("13. words for strong (new)");
newTheme({ id: "words_for_strong", name: "words for strong", parent: "synonyms", pop: 2, ident: 2, tkind: "category", note: "powerful, mighty, tough, sturdy, muscular" }, "words_for_smart", "a basic word with no list; most of its words were not in the library");
linkL("words_for_strong", [[29177, "tough", 2], [29516, "herculean", 4]], "a well-known member of the new theme");
N["powerful"] = add("words_for_strong", "powerful", 1, 1, 'a common word that was not in the library', { pos: "adjective" });
N["mighty"] = add("words_for_strong", "mighty", 2, 1, 'a common word that was not in the library', { pos: "adjective" });
N["sturdy"] = add("words_for_strong", "sturdy", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["muscular"] = add("words_for_strong", "muscular", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["unbreakable"] = add("words_for_strong", "unbreakable", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["rugged"] = add("words_for_strong", "rugged", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["hardy"] = add("words_for_strong", "hardy", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["robust"] = add("words_for_strong", "robust", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["burly"] = add("words_for_strong", "burly", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["brawny"] = add("words_for_strong", "brawny", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["beefy[muscular]"] = add("words_for_strong", "beefy", 3, 3, 'a common word that was not in the library', { gloss: "muscular", pos: "adjective" });
N["invincible"] = add("words_for_strong", "invincible", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["indestructible"] = add("words_for_strong", "indestructible", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["heavy-duty"] = add("words_for_strong", "heavy-duty", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["strapping[sturdy]"] = add("words_for_strong", "strapping", 4, 4, 'a common word that was not in the library', { gloss: "sturdy", pos: "adjective" });
N["formidable"] = add("words_for_strong", "formidable", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["potent"] = add("words_for_strong", "potent", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["sinewy"] = add("words_for_strong", "sinewy", 4, 4, 'a common word that was not in the library', { pos: "adjective" });
N["vigorous"] = add("words_for_strong", "vigorous", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["puissant"] = add("words_for_strong", "puissant", 5, 5, 'a common word that was not in the library', { pos: "adjective" });

sec("14. words for new (new)");
newTheme({ id: "words_for_new", name: "words for new", parent: "synonyms", pop: 2, ident: 2, tkind: "category", note: "fresh, modern, recent, latest, original" }, "words_for_old", "words for old had no opposite; its words were not in the library");
N["fresh[new]"] = add("words_for_new", "fresh", 1, 1, 'a common word that was not in the library', { gloss: "new", pos: "adjective" });
N["modern"] = add("words_for_new", "modern", 1, 1, 'a common word that was not in the library', { pos: "adjective" });
N["recent"] = add("words_for_new", "recent", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["latest"] = add("words_for_new", "latest", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["original[first]"] = add("words_for_new", "original", 1, 2, 'a common word that was not in the library', { gloss: "first", pos: "adjective" });
N["unused"] = add("words_for_new", "unused", 1, 2, 'a common word that was not in the library', { pos: "adjective" });
N["up-to-date"] = add("words_for_new", "up-to-date", 2, 2, 'a common word that was not in the library', { pos: "adjective" });
N["contemporary"] = add("words_for_new", "contemporary", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["cutting-edge"] = add("words_for_new", "cutting-edge", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["state-of-the-art"] = add("words_for_new", "state-of-the-art", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["futuristic"] = add("words_for_new", "futuristic", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["trendy"] = add("words_for_new", "trendy", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["innovative"] = add("words_for_new", "innovative", 2, 3, 'a common word that was not in the library', { pos: "adjective" });
N["unopened"] = add("words_for_new", "unopened", 1, 3, 'a common word that was not in the library', { pos: "adjective" });
N["pristine"] = add("words_for_new", "pristine", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["hot off the press"] = add("words_for_new", "hot off the press", 3, 3, 'a common word that was not in the library', { pos: "adjective" });
N["groundbreaking"] = add("words_for_new", "groundbreaking", 2, 4, 'a common word that was not in the library', { pos: "adjective" });
N["pioneering"] = add("words_for_new", "pioneering", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["budding"] = add("words_for_new", "budding", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["inaugural"] = add("words_for_new", "inaugural", 3, 4, 'a common word that was not in the library', { pos: "adjective" });
N["nascent"] = add("words_for_new", "nascent", 5, 4, 'a common word that was not in the library', { pos: "adjective" });
N["novel[new]"] = add("words_for_new", "novel", 3, 4, 'a common word that was not in the library', { gloss: "new", pos: "adjective" });

sec('glosses and kin');
{ const a = live(41071, 'mature'); if (a) setE(a, 'gloss', 'grow up', 'its text is now shared with mature [grown-up]'); const b = live(53252, 'original'); if (b) setE(b, 'gloss', 'flavor', 'its text is now shared with original [first]'); }
addKin(N["beefy[muscular]"], live(459, "beef"), 'one word family');
addKin(N["disgusting"], live(3980, "disgust"), 'one word family');
addKin(N["disgusting"], live(32852, "disgusted"), 'one word family');
addKin(N["amusing"], live(4013, "amusement"), 'one word family');
addKin(N["witty"], live(13775, "wit"), 'one word family');
addKin(N["mysterious"], live(12567, "mystery"), 'one word family');
addKin(N["novel[new]"], live(6459, "novelist"), 'one word family');
addKin(N["comical"], live(6523, "comedy"), 'one word family');
addKin(N["comical"], live(26279, "comic"), 'one word family');
addKin(N["modern"], live(6596, "modernism"), 'one word family');
addKin(N["modern"], live(13929, "modernist"), 'one word family');
addKin(N["pioneering"], live(6748, "pioneer"), 'one word family');
addKin(N["astronomical[huge]"], live(7155, "astronomy"), 'one word family');
addKin(N["astronomical[huge]"], live(32975, "astronomer"), 'one word family');
addKin(N["futuristic"], live(26349, "future"), 'one word family');
addKin(N["futuristic"], live(11981, "futurism"), 'one word family');
addKin(N["farcical"], live(12263, "farce"), 'one word family');
addKin(N["latest"], live(67372, "late"), 'one word family');
addKin(N["latest"], live(32504, "later"), 'one word family');
addKin(N["hysterical"], live(17152, "hysterics"), 'one word family');
addKin(N["perfect[flawless]"], live(26377, "perfective"), 'one word family');
addKin(N["mighty"], live(28818, "might"), 'one word family');
addKin(N["educated"], live(29095, "education"), 'one word family');
addKin(N["priceless"], live(33863, "price"), 'one word family');
addKin(N["trendy"], live(35078, "trending"), 'one word family');
addKin(N["laughable"], live(39651, "laugh"), 'one word family');
addKin(N["exceptional"], live(42329, "exception"), 'one word family');
addKin(N["original[first]"], live(67098, "origin"), 'one word family');
addKin(N["zonked"], live(57968, "zonk"), 'one word family');
addKin(N["uproarious"], live(68077, "uproar"), 'one word family');
addKin(N["budding"], live(30629, "bud"), 'one word family');
addKin(N["powerful"], live(40599, "power"), 'one word family');
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
const summary = [`Library batch v467 (for Simon's review): Qualities, synonyms branch: words that do not fit out and well-known words added; new themes words for funny, words for strong and words for new.`,
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
const TAIL = fs.existsSync(new URL('./batch467-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch467-review-tail.txt', import.meta.url), 'utf8') : '';
const NOTICE = fs.existsSync(new URL('./batch467-notice.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch467-notice.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + (NOTICE ? '\n' + NOTICE : ''));
fs.writeFileSync(REVIEW || new URL('./batch467-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

// Library batch v461 (for Simon's review): Travel & Transport, gap check, part 2: 16 new everyday themes.
// The gap check of all 170 Travel & Transport themes (2026-11-24, on v459) found topics with no theme anywhere in the library: car wash,
// car trouble, learning to drive, roadwork, in a glove box, two-wheelers, travel hubs, on a train, on the subway, taxi ride, airport security,
// in a hotel room, on a cruise ship, summer camp, travel trouble, winter vehicles. Two-wheelers, travel hubs and roadwork are also categories
// of rival games (our category research). No theme with these names or these words existed before.
// Base: library v460. Everything works by entry id + text, never by position; every step is skipped when it is done already or its entry
// is gone or changed (rerun: 0 changes). Every entry this batch changes gets status "rev".
// Run: node tools/gen/batch461.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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

// ---------- this batch (v461) ----------
const addKin = (a, b, why) => { if (!a || !b || a.id === b.id || (a.kin || []).includes(b.id)) return; setKin(P, a, b, true); n++; reindex(P); A.push(`kin: ${lab(a)}${a.gloss ? ' [' + a.gloss + ']' : ''} <-> ${lab(b)}${b.gloss ? ' [' + b.gloss + ']' : ''}: ${why}`); };
// A new entry linked in tid. x: gloss, pos, type, region, show, nameOk, tm.
const add = (tid, text, fam, typ, why, x = {}) => {
  const e = newEntry(text, x.gloss || '', { pos: x.pos || 'noun', type: x.type || 'common', fam, ...(x.region ? { region: x.region } : {}), ...(x.tm ? { tm: true } : {}) }, why);
  linkE(e, tid, typ, why, { ...(x.show ? { show: x.show } : {}), ...(x.nameOk ? { nameOk: true } : {}) }); return e;
};
const gl = (id, text, from, to, why) => { const e = live(id, text); if (e && e.gloss === from) setE(e, 'gloss', to, why); };
const grp = (tid, ids, why) => { if (ids.every(id => ix.entry.get(id) && E(id).typ[tid] !== undefined)) addToGroup(tid, ids, why); };
const UKX = ['UK', 'IE', 'AU', 'NZ'];

sec('1. Glosses of entries now used more widely');
gl(46905, 'seat', 'bus', 'vehicle', 'the seat of a bus or a train'); gl(46909, 'window', 'bus', 'vehicle', 'the window of a bus or a train');
gl(46908, 'aisle', 'bus', 'vehicle', 'the aisle of a bus or a train'); gl(46926, 'pole', 'bus', 'vehicle', 'the pole riders hold on a bus or a subway train');
gl(47321, 'announcement', 'flight', '', 'its text has one meaning: on a plane, at a station, on a train'); gl(57621, 'instructor', 'ski', '', 'its text has one meaning: a teacher of skiing, driving and so on');
gl(48311, 'sing-along', 'car game', '', 'its text has one meaning: in a car, at a camp');
gl(45651, 'checkpoint', '', 'game', 'its text is now shared with checkpoint [security]'); gl(6991, 'wand', '', 'magic', 'its text is now shared with wand [scanner]');
gl(47113, 'undercarriage', '', 'aircraft', 'its text is now shared with undercarriage [car]'); gl(24752, 'medallion', '', 'jewelry', 'its text is now shared with medallion [taxi]'); gl(43805, 'right of way', '', 'fencing', 'its text is now shared with right of way [road]');

{ const hb = ix.byText.get('horseback')?.find(e => !e.aliasOf), h = live(153, 'horse', '[animal]');   // v460 linked horse; Simon's v438 keeps the ways of travelling and leaves the animals to their themes
  if (hb && h && h.typ.modes_of_transport !== undefined) { swap('modes_of_transport', h, hb, 'a way of getting around (v438: the animals themselves are in the animal themes, as in animal-powered travel)', { typ: 3, outWhy: 'linked in v460; an animal, not a way of travelling (Simon, v438): horseback takes the link' }); } }

sec('2. car wash');
{ const t = 'car_wash', why = 'a thing or step of a car wash';
  newTheme({ id: t, name: 'car wash', parent: 'cars', pop: 3, ident: 2, note: 'washing a car: sponge, bucket, hose, suds, wax, squeegee' }, 'gas_station', 'no theme had it');
  linkL(t, [[23835, 'sponge', 1], [1844, 'hose', 1], [3726, 'soap', 1], [23378, 'bucket', 2], [16291, 'foam', 2], [24004, 'suds', 2], [23860, 'rinse', 2], [861, 'water', 2], [4735, 'vacuum', 2],
    [3755, 'towel', 3], [46778, 'squeegee', 2], [23861, 'polish', 3], [23545, 'pressure washer', 3], [23845, 'microfiber cloth', 3], [28689, 'spray', 3], [23882, 'detergent', 3], [28051, 'mud', 3],
    [50180, 'chamois', 2], [38199, 'conveyor belt', 4], [3727, 'shampoo', 4], [23395, 'air freshener', 4], [46758, 'nozzle', 4], [39999, 'hubcap', 5], [2575, 'windshield', 4], [23874, 'buff', 4], [16343, 'lather', 4]], why);
  const wax = add(t, 'wax', 2, 1, 'the polish for a car\'s paint; wax [candle], [surfing], [skiing] are others', { gloss: 'car' });
  add(t, 'drive-through', 1, 2, 'a car wash the car rolls through'); const blw = add(t, 'blower', 3, 3, 'the hot air that dries the car'); addKin(blw, ix.entry.get(17055), 'one word family'); add(t, 'detailing', 3, 4, 'a thorough clean inside and out');
  add(t, 'undercarriage', 4, 4, 'the underside a car wash sprays; undercarriage (landing gear) is the plane\'s', { gloss: 'car' }); const dgr = add(t, 'degreaser', 4, 4, 'cleaner for wheels and engines'); addKin(dgr, ix.entry.get(23873), 'one word family');
  add(t, 'tire shine', 4, 4, 'spray that blackens tires'); add(t, 'clay bar', 5, 5, 'the putty that lifts grit off paint');
  for (const id of [39127, 41358]) addKin(wax, ix.entry.get(id), 'one word family, as wax [candle]');
  grp(t, [16291, 24004, 16343], 'the same answer: soapy bubbles'); grp(t, [23861, 23874], 'the same answer: rubbing to a shine'); }

sec('3. car trouble');
{ const t = 'car_trouble', why = 'a sign or kind of car trouble';
  newTheme({ id: t, name: 'car trouble', parent: 'cars', pop: 2, ident: 2, note: 'what goes wrong with a car: breakdown, flat tire, dead battery, oil leak' }, 'driving_words', 'no theme had it');
  linkL(t, [[47991, 'flat tire', 1], [59008, 'check engine light', 2], [58998, 'warning light', 2], [40083, 'rust', 3], [46665, 'stall', 3], [30277, 'smoke', 3], [39637, 'rattle', 3], [16570, 'steam', 4], [49204, 'backfire', 4], [2641, 'fender bender', 3]], why);
  const N = [['breakdown', 1, 1], ['dead battery', 1, 1], ['overheating', 2, 2], ['oil leak', 2, 2], ['engine failure', 2, 2], ['cracked windshield', 1, 2], ['blowout', 2, 3], ['blown fuse', 2, 3], ['dent', 1, 3], ['squeaky brakes', 2, 3], ['brake failure', 2, 3],
    ['bald tire', 2, 4], ['blown gasket', 3, 4], ['fuel leak', 2, 4], ['slipping clutch', 3, 4], ['misfire', 4, 4], ['flooded engine', 4, 4], ['engine knock', 4, 5]];
  for (const [x, f, ty] of N) add(t, x, f, ty, why);
  const sc = add(t, 'scratch', 1, 4, 'a mark on the paint; scratch [itch] is the verb', { gloss: 'mark' });
  { const oh = ix.byText.get('overheating')?.find(e => !e.aliasOf); addKin(oh, ix.entry.get(66973), 'one word family'); }
  add(t, 'out of gas', 1, 1, why, { pos: 'other', type: 'phrase' }); add(t, 'locked out', 1, 4, 'with the keys inside the car', { pos: 'adjective' });
  for (const id of [10964, 26188, 50904]) addKin(sc, ix.entry.get(id), 'one word family, as scratch [itch]');
  grp(t, [59008, 58998], 'a word and its more specific form: one answer'); }

sec('4. learning to drive');
{ const t = 'learning_to_drive', why = 'a thing of driving lessons and the test';
  newTheme({ id: t, name: 'learning to drive', parent: 'cars', pop: 3, ident: 2, note: 'driving lessons and the test: instructor, parallel parking, three-point turn, learner\'s permit' }, 'car_trouble', 'no theme had it');
  linkL(t, [[57621, 'instructor', 1], [46797, 'parallel parking', 1], [2568, 'steering wheel', 1], [2594, 'rearview mirror', 2], [2569, 'seat belt', 2], [46674, 'turn signal', 2], [46607, 'clutch', 2], [46665, 'stall', 2], [46659, 'reverse', 2], 
    [46662, 'three-point turn', 2], [50161, 'blind spot', 3], [34832, 'pass', 3], [34833, 'fail', 3], [46605, 'gearshift', 3], [38396, 'speed limit', 3], [40080, 'stop sign', 3], [46601, 'gas pedal', 3],
    [3990, 'nerves', 4], [46806, 'curb', 4], [38409, 'traffic cone', 4], [66751, 'hand signal', 4]], why);
  const wt = add(t, 'written test', 2, 2, 'the test on the rules (UK theory test); driving test would repeat "drive" of the theme name'); newAlias(wt.id, 'theory test', '', 'regional', 2, ['UK', 'IE'], 'the UK name');
  add(t, "learner's permit", 2, 2, 'the license to practice', { region: ['US', 'CA', 'AU'] }); add(t, 'emergency stop', 2, 2, why); add(t, 'brake pedal', 1, 2, 'beside the gas pedal'); add(t, 'lane change', 2, 3, why); const exr = add(t, 'examiner', 3, 2, 'the person who gives the test'); addKin(exr, ix.entry.get(16940), 'one word family');
  add(t, 'L-plate', 3, 3, 'the red L on a learner\'s car', { region: UKX }); 
  add(t, 'dual controls', 4, 4, 'the instructor\'s own pedals'); add(t, 'hill start', 4, 4, 'starting on a slope', { region: UKX }); add(t, 'right of way', 2, 4, 'who goes first; right of way [fencing] is another', { gloss: 'road' });
  add(t, 'Highway Code', 3, 4, 'the UK book of road rules', { type: 'title', region: ['UK'] }); add(t, 'biting point', 5, 5, 'where the clutch starts to grip', { region: ['UK', 'IE'] });
  const pl = add(t, 'provisional license', 4, 4, 'the UK learner\'s license', { region: ['UK', 'IE'] }); newAlias(pl.id, 'provisional licence', '', 'spelling', 4, ['UK'], 'the UK spelling'); }

sec('5. roadwork');
{ const t = 'roadwork', why = 'a thing seen where a road is being repaired';
  newTheme({ id: t, name: 'roadwork', parent: 'streets_and_roads', pop: 3, ident: 2, note: 'repairing a road: traffic cone, hard hat, jackhammer, asphalt, detour' }, 'traffic_words', 'no theme had it');
  linkL(t, [[38409, 'traffic cone', 1], [24454, 'hard hat', 1], [57550, 'high-vis vest', 1], [23693, 'jackhammer', 1], [3128, 'steamroller', 2], [38434, 'asphalt', 2], [2940, 'detour', 2], [3102, 'digger', 2], [1850, 'shovel', 2], [38435, 'pothole', 2], [46975, 'delay', 2],
    [27387, 'tarmac', 3], [2053, 'gravel', 3], [4799, 'drill', 3], [39066, 'tar', 3], [61414, 'barricade', 3], [3108, 'cement mixer', 3], [3105, 'dump truck', 3], [49047, 'paver', 3], [7396, 'concrete', 3], [38385, 'traffic jam', 3],
    [47839, 'flagman', 3], [38422, 'manhole', 4], [38406, 'contraflow', 4], [3148, 'grader', 4], [66333, 'floodlight', 4], [31770, 'rubble', 4], [21689, 'trench', 4], [3127, 'backhoe', 4], [25774, 'pickaxe', 4], [24060, 'bitumen', 4], [4164, 'surveyor', 4], [66528, 'sandbag', 5], [23180, 'dust', 4]], why);
  const b = add(t, 'barrier', 1, 2, 'what closes the road off'); add(t, 'lane closure', 2, 2, why); add(t, 'resurfacing', 3, 3, 'a new top layer for the road'); add(t, 'arrow board', 4, 4, 'the lit arrow that moves traffic over');
  grp(t, [b.id, 61414], 'the same answer: what closes the road off'); grp(t, [38434, 27387], 'the same answer: the black road surface'); grp(t, [39066, 24060], 'the same answer: the black binder'); }

sec('6. in a glove box');
{ const t = 'in_a_glove_box', why = 'a thing many drivers keep there';
  newTheme({ id: t, name: 'in a glove box', parent: 'where_things_are_kept', pop: 3, ident: 3, note: 'what drivers keep in the glove box: owner\'s manual, registration, napkins, tire gauge' }, 'in_a_pocket', 'no theme had it; a sibling of in a handbag, in a pocket and junk drawer');
  add(t, "owner's manual", 1, 1, why); add(t, 'registration', 1, 1, 'the car\'s papers'); add(t, 'parking permit', 2, 3, why); add(t, 'ketchup packet', 2, 4, why); add(t, 'valve cap', 4, 5, 'a spare for a tire');
  linkL(t, [[23302, 'insurance card', 1], [19926, 'napkin', 2], [41855, 'tire gauge', 2], [3028, 'flashlight', 2], [34758, 'pen', 2], [4952, 'sunglasses', 2], [25548, 'tissue', 2], [2404, 'road map', 2],
    [15322, 'hand sanitizer', 3], [23326, 'chewing gum', 3], [23317, 'mints', 3], [23572, 'phone charger', 3], [46868, 'ice scraper', 3], [23276, 'loose change', 3], [23290, 'receipt', 3], [4227, 'parking ticket', 3], [15344, 'first aid kit', 3], [607, 'candy', 3],
    [19944, 'wet wipes', 4], [317, 'screwdriver', 4], [4504, 'notebook', 4], [61492, 'garage door opener', 4], [3777, 'lip balm', 4], [3745, 'sunscreen', 4], [40676, 'fuse', 4], [25623, 'multitool', 4], [23265, 'spare keys', 4], [23330, 'reading glasses', 4], [3754, 'hairbrush', 5], [3782, 'hand cream', 5]], why); }

sec('7. two-wheelers');
{ const t = 'two_wheelers', why = 'it runs on two wheels';
  newTheme({ id: t, name: 'two-wheelers', parent: 'bikes_and_boards', pop: 2, ident: 2, note: 'vehicles on two wheels: bicycle, motorcycle, scooter, moped, Segway, chariot' }, 'motorcycle_types', 'no theme had it; a category of a rival game (Two-Wheeled Transport)');
  linkL(t, [[23154, 'bicycle', 1], [40174, 'motorcycle', 1], [5954, 'scooter', 1], [29601, 'moped', 1], [7356, 'Segway', 2], [47885, 'tandem', 2], [47936, 'dirt bike', 2], [62668, 'mountain bike', 2],
    [40180, 'penny-farthing', 2], [7369, 'hoverboard', 3], [44069, 'BMX', 3], [7370, 'e-scooter', 2], [20383, 'chariot', 3], [47886, 'electric bike', 3], [47942, 'superbike', 3], [2684, 'rickshaw', 3], [47893, 'balance bike', 3], [47888, 'racing bike', 3],
    [40277, 'folding bike', 4], [24258, 'hand truck', 4], [47949, 'minibike', 3], [50129, 'sulky', 4], [40184, 'gig', 4], [40183, 'velocipede', 4], [47906, 'bone shaker', 4], [49173, 'dogcart', 4], [22973, 'hansom cab', 4], [48235, 'pony cart', 4], [39859, 'ox cart', 5]], why);
  const dh = add(t, 'dandy horse', 5, 4, 'the pedal-less bicycle of 1817'); void dh; grp(t, [5954, 7370], 'a word and its more specific form: one answer'); }

sec('8. travel hubs');
{ const t = 'travel_hubs', why = 'a place where trips start, stop or change';
  newTheme({ id: t, name: 'travel hubs', parent: 'travel_transport', pop: 3, ident: 2, note: 'places where trips start or change: airport, train station, bus stop, harbor' }, 'modes_of_transport', 'no theme had it; a category of a rival game (Travel Hubs)');
  linkL(t, [[2715, 'airport', 1], [57667, 'train station', 1], [2657, 'bus station', 1], [2804, 'harbor', 2], [47506, 'ferry terminal', 2], [2656, 'bus stop', 2], [48887, 'port', 2],
    [67180, 'taxi stand', 3], [47492, 'marina', 3], [47507, 'cruise terminal', 3], [2807, 'pier', 3], [2806, 'dock', 3], [2677, 'park and ride', 3], [47512, 'seaport', 3], [2680, 'terminus', 3],
    [2482, 'depot', 4], [41353, 'spaceport', 4], [2696, 'interchange', 4], [47491, 'wharf', 4], [32122, 'rest stop', 4], [48281, 'truck stop', 4], [47153, 'helipad', 4], [66821, 'airfield', 4], [47489, 'quay', 4], [2748, 'airstrip', 4], [2520, 'caravanserai', 5]], why);
  add(t, 'subway station', 1, 2, why); add(t, 'tram stop', 2, 3, why); add(t, 'heliport', 3, 3, why); add(t, 'border crossing', 2, 4, why); const ae = add(t, 'aerodrome', 4, 4, 'an old word for an airfield'); add(t, 'way station', 4, 5, 'a stop between main stops');
  grp(t, [48887, 47512], 'a word and its more specific form: one answer'); grp(t, [66821, ae.id], 'the same answer'); }

sec('9. on a train');
{ const t = 'on_a_train', why = 'what a passenger finds on a train';
  newTheme({ id: t, name: 'on a train', parent: 'trains', pop: 2, ident: 2, note: 'what a passenger finds on board: conductor, aisle, window, dining car, luggage rack' }, 'station_words', 'no theme had it; a sibling in kind of on a bus and in-flight words');
  linkL(t, [[46905, 'seat', 1], [46909, 'window', 1], [2862, 'conductor', 1], [46940, 'ticket', 1], [2663, 'passenger', 1], [46910, 'luggage rack', 2], [2883, 'dining car', 2], [46908, 'aisle', 2], [38233, 'first class', 2], [46985, 'next stop', 2],
    [4663, 'table', 3], [46812, 'emergency brake', 3], [47321, 'announcement', 3], [7296, 'Wi-Fi', 3], [2880, 'sleeper car', 3], [6562, 'corridor', 3], [46960, 'reservation', 3],
    [47323, 'reading light', 4], [2761, 'tray table', 4], [12242, 'curtain', 5], [27904, 'restroom', 4], [46927, 'headrest', 4], [4567, 'newspaper', 4], [47687, 'observation car', 4], [46964, 'inspector', 4], [23460, 'berth', 4], [2875, 'whistle', 4], [2886, 'tunnel', 4]], why);
  add(t, 'compartment', 2, 2, 'a closed set of seats'); const scn = add(t, 'scenery', 1, 3, 'what passengers look out at'); addKin(scn, ix.entry.get(6373), 'one word family'); add(t, 'quiet car', 3, 3, why); add(t, 'snack cart', 2, 3, why);
  const bk = add(t, 'bunk', 2, 4, 'a bed on a sleeper; bunk [nonsense] is another word', { gloss: 'bed' }); add(t, 'couchette', 5, 4, 'a fold-down bed on a European train');
  grp(t, [bk.id, 23460], 'the same answer: a bed on a train'); grp(t, [4663, 2761], 'a word and its more specific form: one answer'); }

sec('10. on the subway');
{ const t = 'on_the_subway', why = 'a thing of the subway';
  newTheme({ id: t, name: 'on the subway', parent: 'public_transportation', pop: 2, ident: 2, note: 'riding the subway: turnstile, platform, escalator, mind the gap, rush hour' }, 'on_a_bus', 'no theme had it');
  linkL(t, [[39524, 'train', 1], [2857, 'platform', 1], [2492, 'station', 1], [2664, 'turnstile', 1], [29567, 'escalator', 2], [2668, 'rush hour', 2], [2662, 'commuter', 2], [46905, 'seat', 2], [2886, 'tunnel', 2], [2658, 'fare', 2], [2395, 'map', 2], [24068, 'stairs', 2], [46985, 'next stop', 2],
    [46983, 'mind the gap', 2], [2694, 'token', 3], [6160, 'busker', 3], [46926, 'pole', 3], [46907, 'strap', 3], [2695, 'transfer', 3], [46966, 'MetroCard', 3], [46967, 'Oyster card', 3], [47321, 'announcement', 3], [6333, 'graffiti', 3], [2865, 'express', 3], [40239, 'ticket machine', 3], [35500, 'crowd', 3], [46975, 'delay', 3],
    [47701, 'third rail', 4], [46994, 'straphanger', 4], [992, 'rat', 4], [4567, 'newspaper', 4], [2862, 'conductor', 4], [47728, 'yellow line', 4], [24299, 'handrail', 4], [46812, 'emergency brake', 4], [46984, 'stand clear', 4], [4564, 'poster', 4], [7330, 'headphones', 4], [24041, 'tile', 5]], why);
  const ln = add(t, 'line', 1, 2, 'a colored route on the map; line [geometry] and [fishing] are others', { gloss: 'route' }); for (const k of [41555, ...(E(41555).kin || [])]) addKin(ln, ix.entry.get(k), 'one word family, as line [geometry]'); }

sec('11. taxi ride');
{ const t = 'taxi_ride', why = 'a thing of a taxi ride';
  newTheme({ id: t, name: 'taxi ride', parent: 'public_transportation', pop: 2, ident: 2, note: 'riding in a cab: meter, fare, tip, back seat, destination' }, 'taxis_of_the_world', 'no theme had it; taxis of the world holds the vehicles');
  { const e = live(40266, 'taximeter'); if (e) linkE(e, t, 1, 'what adds up the fare', { show: 'meter' }); }
  linkL(t, [[2658, 'fare', 1], [20015, 'tip', 1], [2566, 'driver', 1], [48275, 'back seat', 1], [2663, 'passenger', 1], [47008, 'yellow cab', 1], [23290, 'receipt', 2], [47009, 'black cab', 2], [23285, 'cash', 2],
    [4115, 'cabbie', 2], [46998, 'shortcut', 3], [38368, 'traffic light', 3], [2668, 'rush hour', 3], [35417, 'small talk', 3], [38385, 'traffic jam', 3], [2415, 'GPS', 3], [7265, 'app', 3],
    [2581, 'license plate', 4], [2569, 'seat belt', 4], [47150, 'luggage', 4], [16992, 'whistle', 4], [23395, 'air freshener', 4], [47030, 'minicab', 4], [46806, 'curb', 4], [2577, 'trunk', 4], [2940, 'detour', 4]], why);
  add(t, 'destination', 1, 1, 'where the ride ends'); add(t, 'drop-off', 2, 2, why); add(t, 'pickup', 2, 2, 'where the ride starts', { gloss: 'ride' });
  add(t, 'hail', 2, 2, 'to wave a cab down', { gloss: 'flag down', pos: 'verb' }); add(t, 'flat rate', 3, 3, 'a fixed price'); add(t, 'surge pricing', 3, 3, 'the higher price at busy times'); add(t, 'keep the change', 2, 3, 'said when tipping', { pos: 'other', type: 'phrase' });
  add(t, 'partition', 3, 4, 'the screen behind the driver'); add(t, 'star rating', 2, 4, 'given to the driver'); add(t, 'medallion', 5, 5, 'a New York cab\'s license', { gloss: 'taxi' }); }

sec('12. airport security');
{ const t = 'airport_security', why = 'a thing of the airport checkpoint';
  newTheme({ id: t, name: 'airport security', parent: 'airport', pop: 2, ident: 2, note: 'the airport checkpoint: metal detector, X-ray machine, tray, pat-down' }, 'people_at_an_airport', 'no theme had it; a sub-theme of airport beside people at an airport');
  linkL(t, [[6897, 'metal detector', 1], [15191, 'X-ray machine', 1], [2719, 'boarding pass', 2], [48763, 'passport', 2], [4943, 'belt', 2], [23349, 'shoes', 2], [7251, 'laptop', 2],
    [35405, 'queue', 3], [9459, 'sniffer dog', 2], [23294, 'ID card', 3], [66541, 'plastic bag', 3], [38199, 'conveyor belt', 3], [19921, 'water bottle', 3], [4871, 'jacket', 3],
    [4956, 'gloves', 4], [67358, 'swab', 4], [4225, 'fingerprint', 4], [5026, 'scissors', 4], [3046, 'pocketknife', 4], [21717, 'coin', 4], [25699, 'key', 4], [3730, 'toothpaste', 4]], why);
  { const e = live(47176, 'security officer'); if (e) linkE(e, t, 2, 'who checks the bags', { show: 'officer' }); }
  add(t, 'body scanner', 2, 1, why); add(t, 'tray', 1, 2, 'where belongings go through'); add(t, 'pat-down', 2, 2, 'a search by hand'); add(t, 'checkpoint', 2, 2, 'where travelers are checked; checkpoint [game] is another', { gloss: 'security' });
  add(t, 'TSA', 2, 2, 'the US agency', { type: 'acronym', region: ['US'] }); add(t, 'wand', 2, 3, 'a hand-held scanner; wand [magic] is another', { gloss: 'scanner' });   // kin with wand [magic] left unset: its clash group (wands, batons, rods ...) would reach 13 (LIBRARY-RULES 5)
  add(t, 'bag search', 2, 3, why); add(t, 'random search', 2, 3, why);
  add(t, 'no-fly list', 3, 4, why); add(t, 'contraband', 3, 4, 'what may not go through'); add(t, 'facial recognition', 3, 4, why); const bio = add(t, 'biometrics', 4, 4, 'fingerprint and face checks'); addKin(bio, ix.entry.get(42543), 'one word family');
  { const lq = live(40460, 'liquid', '[state of matter]'); if (lq) { const f = newAlias(lq.id, 'liquids', 'form', 'form', 1, [], 'the plural, as in the rule on liquids'); linkE(lq, t, 2, 'only small bottles may go through'); setUse(lq, t, f.id, 'the rule speaks of liquids'); } } }

sec('13. in a hotel room');
{ const t = 'in_a_hotel_room', why = 'a thing found in a hotel room';
  newTheme({ id: t, name: 'in a hotel room', parent: 'accommodation', pop: 2, ident: 3, note: 'what a guest finds in the room: minibar, safe, kettle, bathrobe, do not disturb sign' }, 'room_types', 'no theme had it; hotel holds the things of the whole hotel');
  linkL(t, [[3666, 'bed', 1], [48318, 'minibar', 1], [4572, 'television', 1], [48321, 'do not disturb', 1], [48325, 'safe', 2], [4730, 'kettle', 2], [3767, 'hair dryer', 2], [3755, 'towel', 2], [4888, 'bathrobe', 2], [4732, 'coffee maker', 2], [6390, 'remote', 2], [3667, 'pillow', 2],
    [25760, 'iron', 3], [34144, 'slippers', 3], [4479, 'desk', 3], [34150, 'lamp', 3], [40165, 'telephone', 3], [23462, 'closet', 3], [23219, 'notepad', 3], [3685, 'alarm clock', 3], [46910, 'luggage rack', 3], [23554, 'ironing board', 3], [16156, 'shower cap', 3], [4737, 'air conditioner', 3], [3727, 'shampoo', 3], [3726, 'soap', 3], [4676, 'nightstand', 3], [66841, 'ice bucket', 3], [23399, 'bottled water', 3],
    [26281, 'menu', 4], [337, 'armchair', 4], [5034, 'sewing kit', 4], [24113, 'peephole', 4], [23367, 'trouser press', 4], [4290, 'Bible', 4], [16268, 'bathtub', 4], [6559, 'balcony', 4], [16033, 'bedspread', 4], [16053, 'headboard', 4], [55237, 'blackout curtains', 4], [48769, 'laundry bag', 4], [40243, 'tea bag', 4], [24277, 'smoke detector', 4], [23575, 'thermostat', 4], [24114, 'deadbolt', 5]], why);
  add(t, 'shoehorn', 3, 5, why); }

sec('14. on a cruise ship');
{ const t = 'on_a_cruise_ship', why = 'a place or thing on board';
  newTheme({ id: t, name: 'on a cruise ship', parent: 'cruise_words', pop: 2, ident: 3, note: 'places on board: casino, buffet, sun deck, swimming pool, cabin' }, 'cruise_lines', 'no theme had it; cruise words holds the words of a cruise');
  linkL(t, [[40120, 'swimming pool', 1], [29326, 'casino', 1], [28646, 'buffet', 1], [48886, 'cabin', 1], [2480, 'theater', 2], [48324, 'spa', 2], [44162, 'gym', 2], [57627, 'water slide', 2], [66632, 'sun deck', 2], [16539, 'hot tub', 2], [29271, 'restaurant', 2], [2791, 'lifeboat', 2], [30738, 'deck chair', 2],
    [5274, 'mini golf', 3], [46083, 'climbing wall', 3], [12144, 'gift shop', 3], [29328, 'arcade', 3], [16537, 'sauna', 3], [5278, 'shuffleboard', 3], [6559, 'balcony', 3], [2834, 'bridge', 3],
    [2471, 'library', 4], [39043, 'ice rink', 4], [44164, 'basketball court', 4], [29060, 'ballroom', 4], [46079, 'zip line', 4], [20874, 'infirmary', 4], [6558, 'atrium', 4], [66574, 'duty-free shop', 4], [48891, 'lido deck', 3]], why);
  add(t, 'nightclub', 1, 2, why); add(t, "kids' club", 3, 3, why); add(t, 'piano bar', 3, 3, why); add(t, 'jogging track', 2, 4, why); add(t, 'beauty salon', 2, 4, why); add(t, 'karaoke bar', 2, 4, why); add(t, 'muster station', 4, 4, 'where passengers gather in an emergency'); add(t, 'solarium', 4, 5, 'a glass-roofed deck'); }

sec('15. summer camp');
{ const t = 'summer_camp', why = 'a thing of summer camp';
  newTheme({ id: t, name: 'summer camp', parent: 'vacations', pop: 2, ident: 2, note: 'camp for kids: cabin, campfire, canoe, archery, friendship bracelet' }, 'ski_trip', 'no theme had it');
  linkL(t, [[119, 'cabin', 1], [3708, 'bunk bed', 1], [2781, 'canoe', 1], [3024, 'campfire', 1], [5248, 'archery', 2], [3040, "s'more", 2], [45861, 'friendship bracelet', 2], [1909, 'lake', 2], [5290, 'swimming', 2], [5604, 'hiking', 2], [3025, 'sleeping bag', 2], [611, 'marshmallow', 2],
    [46120, 'capture the flag', 3], [48311, 'sing-along', 3], [5885, 'tie-dye', 3], [4422, 'mess hall', 3], [4044, 'homesickness', 3], [12610, 'talent show', 3], [44072, 'tug of war', 3], [2782, 'kayak', 3], [46102, 'scavenger hunt', 3], [3052, 'bug spray', 3], [3028, 'flashlight', 3],
    [48630, 'whistle', 4], [4999, 'lanyard', 4], [297, 'bugle', 4], [46123, 'relay race', 4], [30614, 'poison ivy', 4], [37969, 'flagpole', 4], [46191, 'obstacle course', 4], [4469, 'reveille', 5]], why);
  add(t, 'ghost story', 1, 2, 'told round the fire'); add(t, 'arts and crafts', 1, 2, why); add(t, 'care package', 2, 3, 'sent from home'); add(t, 'mosquito bite', 1, 3, why);
  add(t, 'rope swing', 2, 4, why); add(t, 'nature walk', 2, 4, why); add(t, 'bunkmate', 3, 4, why); add(t, 'cookout', 2, 4, why, { region: ['US', 'CA'] }); add(t, 'ropes course', 3, 4, why); add(t, 'prank', 1, 4, why); add(t, 'trust fall', 3, 4, why); add(t, 'color war', 4, 4, 'a camp-wide team contest (US)', { region: ['US'] }); }

sec('16. travel trouble');
{ const t = 'travel_trouble', why = 'what can go wrong on a trip';
  newTheme({ id: t, name: 'travel trouble', parent: 'journeys', pop: 2, ident: 2, note: 'what goes wrong on a trip: lost luggage, missed flight, jet lag, pickpocket' }, 'arduous_trips', 'no theme had it');
  linkL(t, [[47149, 'delay', 1], [2720, 'jet lag', 2], [38385, 'traffic jam', 2], [2758, 'overbooking', 2], [14337, 'sunburn', 3], [3412, 'food poisoning', 3], [47991, 'flat tire', 3], [2721, 'turbulence', 3],
    [4044, 'homesickness', 4], [42549, 'scam', 4], [33625, 'theft', 4], [35333, 'strike', 4], [45094, 'altitude sickness', 4], [3413, 'stomach bug', 4], [48914, 'tourist trap', 4], [1395, 'bedbug', 4], [39856, 'red tape', 4], [38386, 'gridlock', 4], [14331, 'blister', 5]], why);
  add(t, 'lost luggage', 1, 1, why); add(t, 'missed flight', 1, 1, why); add(t, 'lost passport', 1, 1, why); const cn = add(t, 'cancellation', 2, 2, 'of a flight or train; cancellation [postal] is another', { gloss: 'flight' }); const ppk = add(t, 'pickpocket', 2, 2, why); addKin(ppk, ix.entry.get(33649), 'one word family'); add(t, 'language barrier', 2, 2, why); add(t, 'missed connection', 2, 2, why);
  const ms = add(t, 'motion sickness', 2, 2, why), ss = add(t, 'seasickness', 2, 3, why), cs = add(t, 'car sickness', 2, 3, why);
  add(t, 'bad weather', 1, 3, why); add(t, 'culture shock', 2, 3, why); add(t, 'hidden fees', 2, 3, why); add(t, 'wrong turn', 1, 3, why); add(t, 'volcanic ash', 3, 5, 'it grounded planes in 2010');
  { const bd = ix.byText.get('breakdown')?.find(e => !e.aliasOf); if (bd) linkE(bd, t, 3, why); const mb = ix.byText.get('mosquito bite')?.find(e => !e.aliasOf); if (mb) linkE(mb, t, 4, why); }
  addKin(ss, ix.entry.get(66642), 'one word family'); addKin(cn, ix.entry.get(61355), 'one word in two senses'); grp(t, [ms.id, ss.id, cs.id], 'a word and its more specific forms: one answer'); }

sec('17. winter vehicles');
{ const t = 'winter_vehicles', why = 'a vehicle for snow or ice';
  newTheme({ id: t, name: 'winter vehicles', parent: 'special_vehicles', pop: 3, ident: 2, note: 'vehicles for snow and ice: snowplow, snowmobile, sled, sleigh, Zamboni' }, 'electric_vehicles', 'no theme had it; polar vehicles (Antarctic research base) holds 10 polar ones, 5 of them here too');
  linkL(t, [[3139, 'snowmobile', 1], [3094, 'snowplow', 1], [48885, 'sled', 1], [25016, 'sleigh', 2], [29486, 'toboggan', 2], [48228, 'dog sled', 2], [5351, 'bobsled', 2], [49889, 'snowcat', 3], [5353, 'luge', 3], [3130, 'Zamboni', 3], [48234, 'reindeer sleigh', 3], [59146, 'icebreaker', 3],
    [5354, 'skeleton', 4], [57624, 'snow groomer', 4], [3131, 'ice resurfacer', 4], [48239, 'troika', 4], [49903, 'ski plane', 4], [49907, 'snow tractor', 4]], why);
  const sl = add(t, 'salt truck', 2, 2, 'it spreads salt on icy roads (US)'); newAlias(sl.id, 'gritter', '', 'regional', 3, ['UK'], 'the UK word'); add(t, 'snow tube', 2, 3, 'an inflated ring for sliding'); const sbk = add(t, 'snowbike', 3, 4, 'a bike on skis'); addKin(sbk, ix.entry.get(61599), 'one word family');
  add(t, 'snow coach', 4, 4, 'a bus on tracks'); const iy = add(t, 'ice yacht', 4, 4, 'a sailing boat on runners'); newAlias(iy.id, 'iceboat', '', 'synonym', 4, [], 'another name'); add(t, 'kicksled', 5, 4, 'a Nordic sled pushed by foot'); add(t, 'pulka', 5, 5, 'a low Nordic sled pulled by a skier');
  grp(t, [3130, 3131], 'the same answer: the ice rink machine'); grp(t, [49889, 57624], 'the same answer: the machine that grooms slopes'); grp(t, [25016, 48234], 'a word and its more specific form: one answer'); grp(t, [48885, 48228], 'a word and its more specific form: one answer'); }
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
const summary = [`Library batch v461 (for Simon's review): Travel & Transport gap check, part 2: 16 new everyday themes: car wash, car trouble, learning to drive, roadwork, in a glove box, two-wheelers, travel hubs, on a train, on the subway, taxi ride, airport security, in a hotel room, on a cruise ship, summer camp, travel trouble, winter vehicles.`,
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
const TAIL = fs.existsSync(new URL('./batch461-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch461-review-tail.txt', import.meta.url), 'utf8') : '';
const NOTICE = fs.existsSync(new URL('./batch461-notice.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch461-notice.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + (NOTICE ? '\n' + NOTICE : ''));
fs.writeFileSync(REVIEW || new URL('./batch461-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  // rating-vs-zipf is outside the gate (LIBRARY-RULES 4; the gate's Checks run without the frequency list): listed in the review, not refused
  { const hard = nw.filter(x => !x.startsWith('warn rating-vs-zipf')); if (hard.length) throw Error('new issues, not written:\n' + hard.join('\n')); }
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

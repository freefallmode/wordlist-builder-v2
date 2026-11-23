// Library batch v448: tidy-up step 3 (TIDY-UP.md), the tree batch that closes step 3: the cross-group moves listed in the batch434-447 reviews,
// the cross-group twins and wrong-sense links the group batches could not fix, cowboy words / Wild West, clever people, and the tree as a whole.
// Base: library v447 (main). Everything works by entry id + text and theme id, never by position, and every step is skipped when it is
// already done or its entry is gone or an alias (rerun: 0 changes). Theme indexes shift once, in this batch (TIDY-UP.md, Decided).
//   1. Theme moves between groups: Nobel laureates, Inca engineering, seaweeds, prehistoric periods, historic weapons, famous canals,
//      cycling races, gaucho words, European spa towns; Industrial Revolution into the revolutions folder. 9. The reviewer's fixes.
//   2. Twins across groups: Italian musical terms into Italian music words, gym gear into gym equipment, old music gear into old ways to hear music.
//   3. Cowboy words merged into Wild West (cowboy riding gear into cowboy gear, people of the frontier under Wild West); Spanish Wild West words
//      renamed for what it is. 4. Clever people (new, from words for smart). 5. People and second roots across groups (Dürer, Marconi, sled, ...).
//   6. Wrong-sense and missing links listed by the group batches. 7. The game's wordplay test on every starts/ends/hidden @id theme.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch448.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
// The tree batch reads the whole tree: every playable theme counts as "in the group" for the spreads.
const inGroup = tid => !!ix.theme.get(tid);
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

// ---------- helpers of this batch (3) ----------
// The game's test of an @id wordplay rule (batch446, reviewer): the named theme and its sub-themes, root texts only, single words of 3+ letters.
const desc = tid => { const out = [tid]; for (let i = 0; i < out.length; i++) for (const t of P.themes) if (t.parent === out[i]) out.push(t.id); return out; };
const WP = () => {
  const res = new Map();
  for (const t of P.themes) {
    const m = /^(starts|ends|hidden):@(.+)$/.exec(t.rule || ''); if (!m || !ix.theme.has(m[2])) continue;
    const pool = new Set(); for (const d of desc(m[2])) for (const e of ix.byTheme.get(d) || []) if (!e.aliasOf && e.typ[d] !== undefined && !/\s/.test(e.text.trim()) && e.text.trim().length >= 3) pool.add(e.text.trim().toLowerCase());
    const pass = new Set();
    for (const e of (ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.typ[t.id] !== undefined)) {
      const s = (e.show?.[t.id] || e.text).toLowerCase().replace(/[^\p{L}]/gu, '');
      const ok = [...pool].some(w => { const x = w.replace(/[^\p{L}]/gu, ''); if (x.length < 3 || x === s) return false;
        return m[1] === 'starts' ? s.startsWith(x) : m[1] === 'ends' ? s.endsWith(x) : s.includes(x); });
      if (ok) pass.add(e.id);
    }
    res.set(t.id, pass);
  }
  return res;
};
const moveIn = (tid, target, why) => moveT(tid, target, 'in', why);
const moveAfter = (tid, sib, why) => moveT(tid, sib, 'after', why);
// Moves the links of `from` that `to` lacks (typicality kept, or x.typ), skipping the listed ids; a leak of `to`'s name is skipped and reported.
const takeLinks = (from, to, skip, why, x = {}) => {
  if (!ix.theme.has(from) || !ix.theme.has(to)) return;
  for (const e of (ix.byTheme.get(from) || []).filter(e => !e.aliasOf && e.typ[from] !== undefined)) {
    if (e.typ[to] !== undefined || skip.has(e.id)) continue;
    if (nameLeak(T(to), e)) { A.push(`  (not moved: ${lab(e)}: its text repeats a word of "${T(to).name}")`); continue; }
    linkE(e, to, x.typ?.[e.id] ?? e.typ[from], `from ${T(from).name}, merged into ${T(to).name}${why ? ': ' + why : ''}`);
  }
};
const WP0 = WP();

// =================================================================================================
sec('1. Theme moves between groups (the Cross-group moves of the batch434-447 reviews)');
moveIn('nobel_laureates', 'famous_people', 'a theme of people (Einstein, Curie, Mandela, Malala), not of science history; with its peace, literature and physics sub-themes it goes under famous people, the ancestor by which the game finds people themes (v445 cross-group item: "People & Society (famous people)"; famous people is in History & Myth)');
moveIn('inca_engineering', 'inca_empire', 'mostly Inca sites and works (Machu Picchu, Qhapaq Ñan, Sacsayhuamán, quipu, terraces): a sub-theme of the Inca empire, not science history (v445 cross-group item)');
moveAfter('seaweeds', 'water_plants', 'algae and sea plants, not animals: from Animals > sea life to Nature & Earth > plants, beside water plants (v435 cross-group item)');
moveIn('prehistoric_periods', 'earth_science', 'geological time (Jurassic, Cambrian, Pleistocene) and the Stone Age, not creatures: from Animals > prehistoric life to Nature & Earth > earth science, with its sub-theme geological epochs (v435 cross-group item)');
moveAfter('historic_weapons', 'siege_weapons', 'weapons of history (sword, longbow, musket, halberd): from People & Society > military to History & Myth > wars and battles, beside siege weapons and armor; it shares 27 of its 45 words with medieval weapons (tree; both themes are adult, so play is unchanged)');
moveAfter('famous_canals', 'straits_and_canals', 'named canals (Suez, Panama, Erie, Grand Canal) are famous waters: from Travel & Transport > boats and ships to Places & Geography > famous waters, beside straits and canals, which shares 11 of its 25 words (tree)');
moveIn('cycling_races', 'famous_races', 'races are sporting events: from Travel & Transport > bikes and boards to Sports & Games > famous races, beside motor races (8 of its words are in famous races; tree)');
moveIn('industrial_revolution', 'revolutions', 'the revolutions folder held only the French and American Revolutions while the Industrial Revolution sat beside it (tree: similar themes as siblings)');

// =================================================================================================
sec('2. Twins across groups');
if (ix.theme.has('musical_terms')) {
  linkIf(6078, 'trio', 'italian_music_words', 3, 'from Italian musical terms, merged into Italian music words');
  dropTheme('musical_terms', 'a twin of Italian music words (Arts & Entertainment; 10 of its 13 words, the xwords-twin v443 left for the tree batch); trio moved; pianoforte (piano is there: one instrument) and bravo (a cheer, not a music term) stay in words from Italian, which keeps all 13'); }
if (ix.theme.has('gym_gear')) {
  takeLinks('gym_gear', 'gym_equipment', new Set(), 'the same topic');
  dropTheme('gym_gear', 'a twin of gym equipment (Body & Health; 11 of its 16 words); its other 5 moved there, and all 16 stay in sports equipment'); }
if (ix.theme.has('old_music_gear')) {
  takeLinks('old_music_gear', 'old_ways_to_hear_music', new Set(), 'the same topic', { typ: { 11307: 2, 11311: 2 } });
  dropTheme('old_music_gear', 'a twin of old ways to hear music (Science & Tech; the same old players, Walkman, boombox, eight-track, tape recorder); its other 4 moved there, and all 8 stay in retro household items'); }

// =================================================================================================
sec('3. Cowboy words and the Wild West (Simon, v446: merge, or name a talk theme for what it is)');
mergeInto(33184, 'yee-haw', 27575, 'yeehaw', 'spelling', 2, 'one word written two ways (Merriam-Webster prints yee-haw); cowboy slang, a locked theme, now shows yee-haw');
if (ix.theme.has('riding_gear')) {
  for (const [id, text] of [[44940, 'riata'], [60942, 'latigo'], [60943, 'tapaderos']]) linkIf(id, text, 'cowboy_gear', 5, 'from cowboy riding gear, merged into cowboy gear');
  dropTheme('riding_gear', 'a twin of cowboy gear (Wild West; 6 of its 9 words, the other three moved): the gear of one rider'); }
moveIn('people_of_the_frontier', 'wild_west', 'the cowboys and frontier people (wrangler, drover, vaquero, greenhorn) go under the Wild West, beside lawmen of the West and bad guys of the West, when cowboy words merges into it');
if (ix.theme.has('cowboy_words')) {
  // Not moved: generic hat and boots (cowboy boots instead), the talk words (in cowboy slang, the talk theme), the riding-gear specialist words (in cowboy gear).
  const SKIP = new Set([4944, 21315, 27574, 27582, 27587, 27577, 27579, 27578, 27585, 33184, 44940, 60942, 60943, 1786]);
  linkIf(24652, 'cowboy boots', 'wild_west', 1, 'boots [cowboy words] as the full term');
  takeLinks('cowboy_words', 'wild_west', SKIP, 'the same topic (xwords-twin: 18 of its 53 words were in Wild West)');
  dropTheme('cowboy_words', 'merged into Wild West (History & Myth): the same topic, the things and people of the cattle frontier (TIDY-UP.md, Simon v446: merge or rename). How cowboys talk is cowboy slang (Language & Wordplay), which keeps howdy, yee-haw, greenhorn, tenderfoot, buckaroo, hoosegow, dogie and maverick; hat and boots are generic (cowboy hat and cowboy boots are in Wild West)'); }
rename('wild_west_words', 'cowboy words from Spanish', 'named for what it is, a loanword theme under words from Spanish (rodeo, lasso, mustang, desperado, vamoose): as "Spanish Wild West words" it read as a twin of cowboy words and cowboy slang (xwords-twin 50% and 40%; Simon held both allow keys, v446)');

// =================================================================================================
sec('4. Clever people (TIDY-UP.md: the nouns of words for smart)');
mergeInto(39412, 'whiz kid', 35585, 'whizz kid', 'spelling', 2, 'the UK spelling of whiz kid (two roots of one word)', { region: ['UK'] });
mergeInto(29347, 'wunderkind', 35586, 'wunderkind', 'synonym', 3, 'wunderkind [whizz kid] is the same word as wunderkind [prodigy]');
if (!ix.theme.has('clever_people')) {
  P.themes.push({ id: 'clever_people', name: 'clever people', parent: 'kinds_of_people', group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: 'nouns for a clever person: genius, prodigy, boffin, egghead, brainiac, whiz kid, polymath', pop: 3, ident: 2 });
  reindex(P); placeTheme(P, 'clever_people', 'words_for_expert', 'after'); reindex(P); n++;
  A.push('new theme: clever_people "clever people" under kinds of people, after words for expert (pop 3, ident 2): the nouns for clever people that were in words for smart, a theme of adjectives'); }
for (const [id, text, typ] of [[35569, 'genius', 1], [35570, 'prodigy', 2], [39412, 'whiz kid', 2], [27345, 'boffin', 2], [39409, 'egghead', 2], [39411, 'brainiac', 2],
  [39410, 'mastermind', 3], [62494, 'smarty-pants', 3], [35582, 'polymath', 3], [28707, 'savant', 3], [29347, 'wunderkind', 3], [35573, 'sage', 4]]) {
  const e = chk(id, text); linkE(e, 'clever_people', typ, 'a noun for a clever person');
  unlinkE(e, 'words_for_smart', 'a noun for a clever person, now in clever people; words for smart holds adjectives'); }

// =================================================================================================
sec('5. People and second roots across groups');
if (ix.entry.get(52133) && !ix.entry.get(52133).aliasOf) {
  setE(chk(22960, 'Albrecht Dürer'), 'fam', 3, 'the better-known familiarity of the two roots of one painter (people\'s names rule, as v444)');
  const sp = ix.entry.get(68315); if (sp && sp.text === 'Albrecht Durer') setE(sp, 'fam', 3, 'a plain spelling has its root\'s familiarity');
  mergeInto(22960, 'Albrecht Dürer', 52133, 'Durer', 'synonym', 3, 'two roots of one painter (v444 cross-group item): the full name is the root and the surname its first synonym at the same familiarity (LIBRARY-RULES 5, people\'s names); renaissance painters shows the full name as its other painters do'); }
{ const d = ix.entry.get(52133); if (d && d.aliasOf === 22960 && d.text === 'Durer') retext(52133, 'Durer', 'Dürer', 'the surname spelled as its root (v444 kept the umlaut under rule 8)'); }
if (ix.entry.get(35288) && !ix.entry.get(35288).aliasOf) {
  mergeInto(21609, 'Guglielmo Marconi', 35288, 'Marconi', 'synonym', 3, 'two roots of one inventor (v444 cross-group item); the surname is the first synonym at the root\'s familiarity', { gloss: '' });
  setE(E(35288), 'type', 'person', 'a person\'s surname, typed as its root'); }
if (ix.entry.get(21046) && !ix.entry.get(21046).aliasOf) {
  mergeInto(48885, 'sled', 21046, 'sledge', 'regional', 2, 'the US or neutral word is the root (LIBRARY-RULES 5): sled [snow] takes the polar links of sledge, which becomes its UK regional alias; the old US alias sled [polar] repeated the root (v413 left the flip "out of scope"; v445 cross-group item)', { region: ['UK'], gloss: '' }); }
if (ix.entry.get(16678) && !ix.entry.get(16678).aliasOf) {
  const eg = chk(518, 'egg'), es = chk(16678, 'eggs'); setKin(P, eg, es, false); n++; A.push('kin egg 518 - eggs 16678 dropped: one word, merged below');
  mergeInto(518, 'egg', 16678, 'eggs', 'form', 1, 'eggs [food] is the plural of egg [food from hens]: two roots of one sense (v439 cross-group item); its five themes show egg',
    { del: 'as a form alias its text would be the name of the theme eggs, where egg is linked (is-theme-name)' }); }
mergeInto(7946, 'grizzly bear', 7945, 'grizzly', 'abbreviation', 2, 'the short name of the same bear, grouped with it in three themes (v437 cross-group item; as hydrant and navy, v447)');
mergeInto(2262, 'Rio de Janeiro', 2263, 'Rio', 'abbreviation', 2, 'the short name of the same city, grouped with it in five themes (v442 cross-group item)');
mergeInto(727, 'soy sauce', 39197, 'shoyu', 'translation', 4, 'the Japanese name of soy sauce, grouped with it (v447 cross-group item; as katsuobushi and bacalao)');
if (ix.entry.get(27373) && !ix.entry.get(27373).aliasOf) {
  delAlias(38397, 'roundabout', 'a UK alias of traffic circle whose text the root roundabout 27373 had: 27373 takes its place as the alias');
  mergeInto(38398, 'traffic circle', 27373, 'roundabout', 'regional', 1, 'two roots of one junction (v438 cross-group item): the US or neutral root traffic circle, roundabout its UK regional alias', { region: ['UK'] });
  const tc = E(38398); if (tc.typ.british_english_words !== undefined) setShow(tc, 'british_english_words', 'roundabout', 'the locked theme shows the UK word, as cookie shows biscuit');
  const ro = ix.entry.get(48272); if (ro && ro.aliasOf === 38398 && ro.aliasKind === 'regional') setE(ro, 'aliasKind', 'synonym', 'traffic circle is itself the US word: rotary (New England) is a US synonym, not its US display alias (LIBRARY-RULES 5, one display alias per dialect)'); }

// =================================================================================================
sec('6. Wrong-sense and missing links listed by the group batches');
swapIf('shiny_things', 10406, 'armor', 21346, 'suit of armor', 'a knight\'s shining armor, not an animal\'s armor (v444 and v447 cross-group items)');
swapIf('travel_verbs', 31931, 'meander', 68227, 'meander', 'the verb (to wander), not the river bend (v439 cross-group item)', { typ: 4 });
out('shops', [[33271, 'ironmonger']], 'a shopkeeper, not a shop (grouped with hardware store; v440 cross-group item); it stays in shopkeepers');
{ const s = newEntry('stoup', '', { pos: 'noun', type: 'common', fam: 4 }, 'the basin for holy water at a church door (v441 cross-group item: church parts lost stoop, the wrong word)'); linkE(s, 'church_parts', 4, 'a church part, beside font'); }
linkIf(64279, 'mitt', 'baseball_terms', 3, 'the catcher\'s and first baseman\'s glove; it was in no theme (v441 cross-group item)');
linkIf(68377, 'harlequin', 'fabric_prints', 4, 'the diamond-check print; harlequin [clown character] left fabric prints in v441 (v447 cross-group item)');
for (const [id, text, why] of [[50506, 'Bambi', 'the deer of Felix Salten\'s book'], [50745, 'Kaa', 'the python of The Jungle Book'], [50973, 'Toto', 'the dog of The Wonderful Wizard of Oz'], [50579, 'Hedwig', 'the owl of Harry Potter']])
  linkIf(id, text, 'children_s_book_characters', 3, `${why}; in no theme since v435 took fictional animals out of the animal themes (v435 cross-group item)`);
// =================================================================================================
sec("9. Reviewer's fixes and tree decisions (second agent, 2026-11-23; standing approval: the reviewer's recommendations are the decisions)");
{ const ss = chk(727, 'soy sauce'); for (const t of ['asian_sauces', 'herbs_spices_and_sauces', 'sauces_and_condiments']) if (ss.typ[t] !== undefined) setShow(ss, t, 'soy', 'the English short name (sauce is in the theme name); shoyu, its Japanese name, is a translation alias'); }
out('words_for_expert', [[35569, 'genius'], [35570, 'prodigy'], [29347, 'wunderkind'], [39412, 'whiz kid'], [35582, 'polymath']], 'a clever person, not an expert: now in clever people (reviewer)');
rate(chk(62494, 'smarty-pants'), 'clever_people', 2, 'a common word for a clever person (reviewer)');
{ const t = T('cowboy_slang'); if (t.note.includes('yeehaw')) setT('cowboy_slang', 'note', t.note.replace('yeehaw', 'yee-haw'), 'yee-haw is the root now'); }
setE(chk(38398, 'traffic circle'), 'fam', 2, 'nearly every adult knows it (reviewer); its UK alias roundabout is 1');
delAlias(48272, 'rotary', 'as the first synonym (familiarity 4) of a familiarity-2 root it would be too hard where the game shows it (flag 512; as picture house and Farrokh Bulsara, v443)');
moveAfter('gaucho_words', 'aboriginal_culture', 'Argentine and Uruguayan cowboy culture, not a job: under society beside Māori and Aboriginal culture (reviewer)');
moveAfter('european_spa_towns', 'port_cities', 'a theme of towns (Bath, Baden-Baden, Vichy): under cities beside port cities, not under mind and wellbeing (reviewer)');
out('ancient_greek_thinkers', [[20364, 'Socrates'], [20365, 'Plato'], [53967, 'Protagoras'], [53963, 'Epicurus'], [53960, 'Parmenides']], 'a philosopher, not a scientist: stays in Greek philosophers (reviewer)');
rename('ancient_greek_thinkers', 'ancient Greek scientists', 'it holds the scientists (Archimedes, Euclid, Hippocrates, Ptolemy); the philosophers are in Greek philosophers (History & Myth), which shared 15 of its words');
rename('life_milestones', 'milestone celebrations', 'the parties and ceremonies of a milestone, beside life events (People & Society), which shares 9 of its 12 words (reviewer)');
// brine and rake stay pos verb: ways to preserve food and gardening verbs link them as verbs (v447 cross-group item, left: see the review).
// =================================================================================================
sec("7. The game's wordplay test on every starts/ends/hidden @id theme (seaweeds and prehistoric periods leave Animals: @animals shrinks)");
{ const WP1 = WP(); let lost = 0, all = 0;
  for (const [tid, p0] of WP0) { const p1 = WP1.get(tid) || new Set(); all += p1.size;
    for (const id of p0) if (!p1.has(id) && ix.entry.get(id) && E(id).typ[tid] !== undefined) { lost++; A.push(`  FAILS NOW: ${lab(E(id))} in ${tid}`); } }
  A.push(`  ${WP0.size} @id themes; members passing after the batch ${all}; members that passed before and fail now: ${lost}`);
  if (lost) throw Error('wordplay members fail the game\'s test after the batch'); }
sec('8. First synonym alias (game flag 512) of the roots this batch touches: no harder than the root + 1');
{ let all = 0, bad = 0;
  for (const r of P.entries.filter(e => !e.aliasOf && snap.get(e.id) !== JSON.stringify({ ...e, status: undefined }))) {
    const s = P.entries.find(a => a.aliasOf === r.id && a.aliasKind === 'synonym'); if (!s) continue; all++;
    if (s.fam > r.fam + 1) { bad++; A.push(`  TOO HARD: ${lab(r)} f${r.fam}: first synonym ${lab(s)} f${s.fam}`); } }
  A.push(`  roots changed here with synonym aliases: ${all}; first synonym harder than root + 1: ${bad}`); }
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
const summary = [`Library batch v448: tidy-up step 3, the tree batch (${THEMES0.length} playable themes). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch448-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch448-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch448-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

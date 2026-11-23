// Library batch v440: tidy-up step 3 (TIDY-UP.md), the People & Society group: every theme under people_society read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v439. Applied first in round 3, before v441 (Home & Everyday) and v442 (Sports & Games): everything here works by entry id + text
// and theme id, never by position, and every step is skipped when it is already done (rerun: 0 changes; v442's hookah translations too).
//   1. Twins and the tree: jobs working with sound (a twin of musicians), cowboy outfits (of cowboy gear) and Hindu gods and goddesses (of Hindu
//      gods) deleted; theatre and movie crew renamed theater and movie crew; navy words gives its ship parts to ship parts.
//   2. Regional roots (region-root-equiv, gated at 202): US roots with a UK alias untagged; same-word spellings and other-dialect words merged as
//      aliases; the slang words v413 kept as words in their own right (mate, nan, fresher, copper, bobby ...) stay roots but leave the groups and
//      general themes that joined them with the standard word; tetchy and cabin crew untagged, fruiterer ungrouped (reviewer).
//   3. Two roots of one sense merged (cop, maitre d, court martial, dog tags, rouble, aga, bashaw, dog collar, Fatima, salute, cart, mate [tea] ...).
//   4. Wrong senses: Telegram [app], avatar [internet], SAT, Commonwealth, Paul [saint], gym, the evangelists, lowercase major, sergeant and
//      professor for the ranks and jobs, enlightenment, VAT.
//   5. Belonging; 6. case, spelling and diacritics (rule 8); 7. nouns typed phrase -> common; 8. reviewer's fixes and ratings; 9. first synonym aliases.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch440.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(i.kind === 'rating-vs-zipf' || i.kind === 'region-root-equiv' ?`${i.sev} ${i.kind}: entry ${i.entryId}` : `${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const GROUP = 'people_society';
const inGroup = tid => { let t = ix.theme.get(tid); while (t && t.parent) t = ix.theme.get(t.parent); return t?.id === GROUP; };
const groupThemes = () => P.themes.filter(t => t.id !== GROUP && inGroup(t.id)).map(t => t.id);
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

// ---------- helpers added for v440 ----------
// A root's type; its spelling and form aliases follow (they are the same word).
const retype = (id, text, type, why) => { const e = chk(id, text); const r = setE(e, 'type', type, why); for (const a of P.entries.filter(a => a.aliasOf === id && ['spelling', 'form'].includes(a.aliasKind) && a.type !== type)) setE(a, 'type', type, `a ${a.aliasKind} of ${e.text}, typed as its root`); return r; };
const untag = (id, text, why) => setE(chk(id, text), 'region', [], why);
// A plain or other-dialect alias of a root (rerun: found by text + gloss + root).
const addAlias = (rootId, text, kind, region, why, x = {}) => {
  const r = E(rootId);
  return newEntry(text, x.gloss ?? '', { aliasOf: rootId, aliasKind: kind, region, pos: r.pos, type: x.type ?? r.type, fam: x.fam ?? r.fam,
    adult: !!r.adult, sensitive: !!r.sensitive, offensive: !!r.offensive, tm: !!r.tm }, why);
};
// Root keeps the diacritics or US spelling; the old text becomes its alias (rule 8 / US root with UK spelling).
const respell = (id, from, to, aliasRegion, why, x = {}) => {
  const e = ix.entry.get(id); if (!e) return;
  if (e.text === from) { A.push(`text: ${lab(e)} -> "${to}": ${why}`); e.text = to; n++; reindex(P); }
  for (const f of ['type', 'gloss']) if (x[f] !== undefined) setE(e, f, x[f], why);
  const at = x.aliasText ?? from;
  if (!P.entries.some(a => a.aliasOf === id && a.text === at)) addAlias(id, at, 'spelling', aliasRegion, aliasRegion.length ? `the ${aliasRegion} spelling of ${to}` : `the plain spelling of ${to} (LIBRARY-RULES 5, rule 8)`, { gloss: x.aliasGloss ?? '' });
};
const clearKin = (id, why) => { const e = E(id); if (!(e.kin || []).length) return; A.push(`kin of ${lab(e)} cleared (${e.kin.map(k => lab(E(k))).join(', ')}): ${why}`); for (const k of [...e.kin]) setKin(P, e, E(k), false); n++; };
const rename = (tid, name, why) => { if (setT(tid, 'name', name, why)) counts.renamed++; };
const famE = (id, text, fam, why) => setE(chk(id, text), 'fam', fam, why);
// Move alias `id` to just before alias `beforeId` in row order (the game shows a root's first synonym alias).
const moveBefore = (id, beforeId, why) => {
  const i = P.entries.findIndex(e => e.id === id), j = P.entries.findIndex(e => e.id === beforeId);
  if (i < 0 || j < 0 || i < j) return;
  const [e] = P.entries.splice(i, 1); P.entries.splice(j, 0, e); reindex(P); n++;
  A.push(`row order: ${lab(e)} moves before ${lab(E(beforeId))}: ${why}`);
};
const outOf = (tids, list, why) => { for (const t of tids) out(t, list, why); };

// =================================================================================================
sec('1. Twins and the tree');
dropTheme('people_who_work_with_sound', 'a near-twin of musicians (Arts & Entertainment): 11 of its 13 words are there, and all 13 are in its parent arts jobs (theme-twin)');
dropTheme('western_outfits', 'all 9 words are in cowboy gear (Wild West, History & Myth) and in its parent cowboy words (theme-twin)');
dropTheme('hindu_gods_and_goddesses', 'all 12 words are in Hindu gods (mythology, History & Myth) and in its parent Hinduism words (theme-twin)');
rename('theatre_and_movie_crew', 'theater and movie crew', 'US spelling for theme names (LIBRARY-RULES 6)');
{ const SHIP = new Set((ix.byTheme.get('ship_parts') || []).filter(e => e.typ.ship_parts !== undefined).map(e => e.id));
  const parts = (ix.byTheme.get('navy_words') || []).filter(e => !e.aliasOf && e.typ.navy_words !== undefined && SHIP.has(e.id) && !['gun deck', 'quarterdeck', 'galley', 'brig'].includes(e.text));
  for (const e of parts) unlinkE(e, 'navy_words', 'a part of any ship, in ship parts (Travel & Transport); navy words keeps the navy itself: its ships, people, weapons and places (xwords-twin with ship parts)'); }

// =================================================================================================
sec('2. Regional roots (region-root-equiv; contract-root-region)');
// US roots that already have their UK word as an alias: untagged, as color is (v413, v436, v439)
for (const [id, text, uk] of [[146, 'newsstand', 'newsagent'], [4120, 'mail carrier', 'postman'], [4125, 'garbage collector', 'binman'], [4489, 'report card', 'school report'], [4492, 'recess', 'break'],
  [4523, 'elementary school', 'primary school'], [4530, 'lunchroom', 'canteen'], [4550, 'freshman', 'first-year'], [4575, 'tube', 'telly'], [23714, 'thumbtack', 'drawing pin'], [33005, 'sales clerk', 'shop assistant'],
  [33251, 'esthetician', 'aesthetician'], [33929, 'routing number', 'sort code'], [34803, 'substitute teacher', 'supply teacher'], [34808, 'lunch lady', 'dinner lady'], [34809, 'guidance counselor', 'school counsellor'],
  [34812, 'crossing guard', 'lollipop lady'], [34816, 'gym teacher', 'PE teacher'], [34820, 'homeroom teacher', 'form tutor'], [34951, 'BS', 'BSc'], [35006, 'pajama day', 'pyjama day'], [35131, 'busy signal', 'engaged tone'],
  [35133, 'area code', 'dialling code'], [65783, 'cell', 'mobile'], [67137, 'special election', 'by-election'], [67164, 'slowdown', 'go-slow'], [67176, 'senior citizen', 'pensioner'], [67206, 'university president', 'vice-chancellor'],
  [67328, 'color in', 'colour in']])
  untag(id, text, `the US root of a regional pair: untagged, as color is (v413; v436 mold; v439 faucet); its UK word ${uk} is its alias`);
untag(4583, 'ring', 'ring [phone call] ("give me a ring") is said in the US too (Merriam-Webster gives it without a regional label); its UK alias is bell on phone call');
untag(50130, 'sultana', 'sultana [sultan\'s wife] is not a UK word (the UK tag belongs to sultana the raisin)');
// The same word spelt another way
mergeInto(56646, 'granddad', 56645, 'grandad', 'spelling', 2, 'grandad is the UK spelling of granddad (both in words for grandparents, grouped)', { region: ['UK'] });
untag(56646, 'granddad', 'the US and general spelling; grandad is now its UK spelling alias');
mergeInto(32392, 'nana', 56647, 'nanna', 'spelling', 3, 'another spelling of nana [grandmother] (grouped in words for grandparents); also clears a contract-dup-root against the god Nanna');
mergeInto(56643, 'grandma', 56650, 'gramma', 'spelling', 3, 'an informal spelling of grandma');
mergeInto(3951, 'kinfolk', 3952, 'kinsfolk', 'spelling', 5, 'kinsfolk is the other spelling of kinfolk (Merriam-Webster: kinfolk or kinsfolk); both were in the same three themes, grouped');
// Regional words that are the other dialect's word for a same-sense root
untag(32936, 'tetchy', 'Merriam-Webster gives tetchy no regional label; it is not one strict sense with testy, so it stays a root, grouped with grumpy, cranky and testy in moods (reviewer)');
mergeInto(4120, 'mail carrier', 4124, 'letter carrier', 'synonym', 4, 'the formal US name of the mail carrier (grouped as one answer in jobs)', { region: ['US'] });
retype(4129, 'trash collector', 'common', 'a job name, not an idiom (type phrase is for idioms)');
retype(4130, 'garbageman', 'common', 'a single word, not an idiom (contract-type-common)');
mergeInto(4125, 'garbage collector', 4129, 'trash collector', 'synonym', 2, 'the same job (grouped as one answer in jobs); garbage collector is the root, with binman (UK) and garbage man (US)', { region: ['US'] });
mergeInto(4125, 'garbage collector', 4130, 'garbageman', 'synonym', 3, 'garbage man written closed, a second root of the same job (grouped in jobs; both in bins and recycling)', { region: ['US'] });
mergeInto(64103, 'station', 33684, 'precinct', 'synonym', 3, 'the US word for the police station (grouped as one answer in police words): a US synonym alias, not the display word for every US player (reviewer); precinct [district] stays a root', { region: ['US'] });
mergeInto(60948, 'lifeboat crew', 33226, 'lifeboatman', 'synonym', 4, 'a member of the lifeboat crew (grouped as one answer in emergency workers)', { region: ['UK'] });
untag(33246, 'cabin crew', 'a collective name used outside the UK too; it stays a root, grouped with flight attendant in transport jobs (reviewer)');
leaveGroup('shopkeepers', 60955, 'a fruiterer sells fruit only, a greengrocer fruit and vegetables: not one strict sense; separate answers (reviewer)');
mergeInto(35377, 'collection box', 35387, 'collection tin', 'synonym', 3, 'the UK collection tin for the collection box (grouped as one answer in charity words): a UK synonym alias (reviewer: as precinct)', { region: ['UK'] });
mergeInto(34858, 'answer key', 34840, 'mark scheme', 'regional', 3, 'the UK word for the answer key (grouped as one answer in exam words)', { region: ['UK'] });
mergeInto(34934, 'PhD', 34952, 'DPhil', 'abbreviation', 5, 'Oxford\'s abbreviation for the PhD (grouped as one answer in university degrees)', { region: ['UK'] });
mergeInto(61311, 'prize giving', 61310, 'speech day', 'synonym', 4, 'the school prize-giving day (grouped as one answer in school events)', { region: ['UK'] });
clearKin(4545, 'hooky (truancy) is not one family with hook [music], hook [fastening] and the other hooks (DESIGN-entries.md 3.7: words that only share letters); it made a clash group of 12');
mergeInto(4544, 'truancy', 4545, 'hooky', 'synonym', 4, 'US for truancy ("play hooky"; grouped as one answer in school)', { region: ['US'] });
retype(4517, 'sports day', 'common', 'a school event, not an idiom');
mergeInto(4517, 'sports day', 61313, 'sports carnival', 'regional', 4, 'the Australian word for sports day (grouped as one answer in school events)', { region: ['AU'] });
mergeInto(34610, 'ejection seat', 34609, 'ejector seat', 'regional', 2, 'the British name of the ejection seat (Collins), grouped as one answer in air force words', { region: ['UK'] });
{ const h = ix.entry.get(4593);
  if (h && !h.aliasOf) {
    addAlias(4592, 'hoarding', 'regional', ['UK'], 'the UK word for a billboard, as its UK regional alias (the old entry mixed the billboard and the site fence: v413)', { gloss: 'billboard', fam: 3 });
    for (const t of ['media_and_communication', 'advertising_words', 'road_trip_words']) unlinkE(h, t, 'the billboard sense: billboard is there, and UK players see its new alias hoarding');
    setE(h, 'gloss', 'site fence', 'it keeps the fence around a building site (construction site)'); } }
// Regional slang that v413 kept as words in their own right (mate, nan, fresher, copper, bobby): kept as roots, taken out of the groups that joined them
// with a same-sense standard word, and out of the general themes where the standard word plays.
outOf(['family_and_friends'], [[3929, 'cobber'], [3928, 'mucker'], [3930, 'mate']], 'slang for a friend beside friend and buddy; it plays in words for friend');
for (const id of [3929, 3928, 3930, 50300, 50301]) leaveGroup('words_for_friend', id, 'a slang word for friend in a theme of words for friend: a separate answer (v413 kept it a word in its own right)');
out('family_members', [[32391, 'nan']], 'a pet name for grandmother: it plays in words for grandparents');
leaveGroup('words_for_grandparents', 32391, 'a pet name for grandmother in a theme of such words: a separate answer (v413 kept nan a word in its own right)');
for (const id of [56623, 56624]) leaveGroup('words_for_mother', id, 'a regional word for mother in a theme of words for mother: a separate answer');
leaveGroup('words_for_father', 56638, 'a regional word for father in a theme of words for father: a separate answer');
outOf(['jobs', 'emergency_workers'], [[4089, 'copper'], [4090, 'bobby']], 'police slang beside police officer, policeman and cop; it plays in nicknames for workers and police words (v413 kept it a word in its own right)');
outOf(['law_and_order', 'police_words'], [[4211, 'rozzers'], [4210, 'old bill']], 'UK police slang beside police; it plays in police slang');
out('law_and_order', [[4206, 'perp']], 'US slang for a perpetrator beside criminal; it plays in wrongdoers');
leaveGroup('wrongdoers', 4206, 'perp (perpetrator) is its own word, not the US word for criminal');
leaveGroup('words_for_beginner', 35592, 'fresher (UK) stays a word in its own right (v413) in a theme of words for beginner; freshman is now untagged with its UK alias first-year');
out('university_words', [[35592, 'fresher']], 'the UK word for freshman, which is there (UK players see its alias first-year); fresher stays in words for beginner (reviewer: no two answers for one thing)');
untag(33090, 'bursar', 'the bursar\'s office is as American as British (US colleges have a bursar); it stays grouped with bursary (one word family)');
leaveGroup('emotions', 4060, 'hiraeth (Welsh) and saudade (Portuguese) are each language\'s own word; neither is the other\'s dialect word');
leaveGroup('shopkeepers', 33277, 'a costermonger is a street hawker of fruit and vegetables, not any market trader');
outOf(['school', 'classroom_items'], [[4511, 'greenboard']], 'a rare US word (familiarity 5) for a green chalkboard, grouped with blackboard and chalkboard');
out('kinds_of_party', [[5106, 'Hogmanay']], 'the Scottish New Year festival (in New Year and festival themes), not a kind of party; its group with New Year\'s Eve party dissolves');
out('prison_words', [[4908, 'boilersuit']], 'a work overall (UK coverall), not prison wear; it was grouped with jumpsuit');
out('bazaar', [[963, 'cuppa']], 'a British cup of tea, not a thing of a Middle Eastern market (typicality 5)');

// =================================================================================================
sec('3. Two roots of one sense');
mergeInto(4088, 'cop', 33680, 'cop', 'synonym', 1, 'cop [officer] and cop [police] are one sense (contract-dup-root)');
mergeInto(20027, "maître d'", 33106, 'maitre d', 'spelling', 3, "another plain spelling of maître d' (service jobs has the root; food jobs had this second root)");
mergeInto(4438, 'court-martial', 34570, 'court martial', 'spelling', 3, 'one word written two ways (military, army words)');
retype(4414, 'dog tag', 'common', 'a thing, not an idiom');
mergeInto(4414, 'dog tag', 24751, 'dog tags', 'form', 3, 'the plural of dog tag, a second root (military, army words, army kit)');
mergeInto(309, 'ruble', 33884, 'rouble', 'spelling', 2, 'the UK spelling of ruble (grouped as one answer in currencies)', { region: ['UK'] });
mergeInto(56739, 'agha', 33389, 'aga', 'spelling', 5, 'another spelling of agha (grouped in Ottoman titles)');
mergeInto(20639, 'pasha', 56752, 'bashaw', 'spelling', 5, 'the old English spelling of pasha (grouped in Ottoman titles)');
mergeInto(34382, 'clerical collar', 50199, 'dog collar', 'synonym', 2, 'the everyday name of the clerical collar (grouped as one answer in religious clothing; sense-twin with dog collar [pet collar])', { gloss: 'clerical collar' });
mergeInto(34304, 'Fatima', 36064, 'Fatima', 'synonym', 4, 'the same town in Portugal (sense-link): Fatima [Portugal] takes holy cities');
mergeInto(16818, 'salute', 35429, 'salute', 'synonym', 2, 'salute [greeting] and salute [gesture] are the same gesture (sense-twin in polite gestures)');
mergeInto(39781, 'shopping cart', 33996, 'cart', 'synonym', 1, 'the same cart (both shown "cart" in shopping words: same-display)', { del: 'a bare stub of shopping cart (LIBRARY-RULES 5)' });
mergeInto(19416, 'mate', 33191, 'mate', 'synonym', 3, 'mate [tea] is the same drink as mate [drink] (yerba mate)');
for (const [id, text] of [[15445, 'narghile'], [46261, 'narguile']]) { const a = ix.entry.get(id); if (a && a.aliasOf === 46259) setE(a, 'aliasKind', 'translation', 'the Turkish and Persian name of the hookah: a translation, not a synonym the game would show in its place (familiarity 5; first-synonym rule)'); }
mergeInto(46259, 'hookah', 34149, 'nargile', 'translation', 5, 'the Turkish word for the hookah (grouped as one answer in bazaar), as narghile');
{ const af = ix.entry.get(64815); if (af) { clearKin(64815, 'atomic family is not one family with atom [particle]'); unlinkE(chk(64815, 'atomic family'), 'family_and_friends', 'a rare name for the nuclear family (grouped with it; typed adjective)'); delE(64815, 'atomic family', 'made for family and friends; in no theme'); } }

// =================================================================================================
sec('4. Wrong senses');
{ const t = chk(4594, 'telegram');
  if (t.typ.social_media_platforms !== undefined) { const tg = newEntry('Telegram', 'app', { pos: 'noun', type: 'org', fam: 2, tm: true }, 'the messaging app; telegram 4594 is the message sent by wire'); swap('social_media_platforms', t, tg, 'the app'); }
  setE(t, 'gloss', 'message', 'its text is now shared with Telegram [app]');
  out('social_media_platforms', [[4595, 'wire']], 'wire [telegram] is a message, not a platform (it was grouped with telegram)'); }
swap('social_media_words', chk(34498, 'avatar'), chk(42414, 'avatar'), 'the profile picture (avatar [incarnation] is the Hindu sense)');
{ const s = chk(28920, 'sat');
  if (s.typ.exam_words !== undefined) { const sat = newEntry('SAT', 'exam', { pos: 'noun', type: 'acronym', fam: 2, region: ['US'] }, 'the US college admission test (as ACT); sat 28920 is the past of sit'); swap('exam_words', s, sat, 'the test'); }
  setE(s, 'gloss', 'sit', 'its text is now shared with SAT [exam]'); }
{ const c = chk(33447, 'commonwealth');
  if (c.typ.international_organizations !== undefined) { const cw = newEntry('Commonwealth', 'nations', { pos: 'noun', type: 'org', fam: 2 }, 'the Commonwealth of Nations; commonwealth 33447 is the kind of state'); swap('international_organizations', c, cw, 'the organization'); }
  setE(c, 'gloss', 'state', 'its text is now shared with Commonwealth [nations]'); }
swap('famous_saints', chk(57054, 'Saint Paul'), chk(34340, 'Paul'), 'the apostle (Saint Paul 57054 is the city in Minnesota)', { outWhy: 'the city, not the saint: Paul [saint] takes the link' });
swap('places_in_a_school', chk(34930, 'gymnasium'), chk(44162, 'gym'), 'the school gym (gymnasium [school] is the German school type, in school types)');
for (const [id, text, fam] of [[28467, 'Mark', 2], [56818, 'John', 1], [29667, 'Matthew', 1]]) {
  const nm = chk(id, text);
  if (nm.typ.the_four_evangelists !== undefined) { const s = newEntry(text, 'evangelist', { pos: 'noun', type: 'person', fam }, `Saint ${text}, the gospel writer (the old entry is the given name, LIBRARY-RULES 5: a name entry holds no link of another sense)`); swap('the_four_evangelists', nm, s, 'the evangelist'); }
  if (!nm.gloss) setE(nm, 'gloss', 'name', `its text is now shared with ${text} [evangelist]`); }
setT('the_four_evangelists', 'note', 'Exactly: Matthew, Mark, Luke, John.', 'Mark is a name (the note had "mark")');
for (const [id, text, low, gloss, tids] of [[32575, 'Major', 'major', 'army officer', ['military_ranks']], [32576, 'Sergeant', 'sergeant', 'rank', ['police_words', 'military_ranks', 'police_station']], [32569, 'Professor', 'professor', 'academic', ['university_words', 'academic_staff']]]) {
  const T0 = chk(id, text);
  if (tids.some(t => T0.typ[t] !== undefined)) { const l = newEntry(low, gloss, { pos: 'noun', type: 'common', fam: T0.fam }, `the rank or job as a common noun; ${text} ${id} is the title before a name (honorifics)`);
    for (const t of tids) swap(t, T0, l, 'the rank or job, lowercase (no case-only show where a correctly cased entry can be linked)'); }
  if (!T0.gloss) setE(T0, 'gloss', 'title', `its text is now shared with ${low} [${gloss}]`); }
{ if (E(50207).text === 'Enlightenment') retext(50207, 'Enlightenment', 'enlightenment', 'spiritual awakening in Buddhism is a common noun (the Enlightenment 7053 is the age of reason)', { type: 'common' });
  for (const t of ['buddhism_words', 'key_teachings']) if (E(50207).show?.[t] === E(50207).text) setShow(E(50207), t, null, 'the shown text equals the text'); }
setE(chk(50194, 'deadhead'), 'pos', 'noun', 'a Grateful Dead fan is a noun');
retext(50151, 'vat', 'VAT', 'value-added tax, an initialism in capitals', { type: 'acronym' });
setE(chk(28321, 'waste'), 'gloss', 'squander', 'the verb (waste money), as it is linked; gloss "rubbish" named the noun');
out('fans_and_followers', [[42578, 'booster']], 'booster [rocket] is the rocket stage');
out('words_for_a_person', [[32568, 'Dame']], 'Dame [title] is the title; the slang dame is another word (typicality 5)');
out('school_events', [[24188, 'open house']], 'open house [home showing event] is the house sale viewing, not the school event');
out('political_titles', [[4551, 'prefect']], 'prefect 4551 is the school prefect (the Roman or French prefect is another sense)');
out('us_government', [[57491, 'rose garden']], 'rose garden 57491 is any rose garden (park); the White House Rose Garden would be its own entry');

// =================================================================================================
sec('5. Belonging');
out('family_members', [[3908, 'kinsman'], [3950, 'kin'], [3951, 'kinfolk'], [3953, 'next of kin']], 'a general word for relatives, not a family member (LIBRARY-RULES 5: no general word beside its kinds); it stays in extended family and family and friends');
out('words_for_friend', [[3902, 'classmate'], [3911, 'playmate'], [3940, 'acquaintance']], 'not a word for a friend (typicality 4-5); it stays in family and friends');
outOf(['religious_clothing'], [[24356, 'sari'], [24441, 'dhoti'], [24776, 'keffiyeh']], 'everyday or national dress, not religious clothing (typicality 5)');
out('hinduism_words', [[24356, 'sari']], 'Indian dress, not a word of Hinduism (typicality 5)');
out('buddhism_words', [[21747, 'cremation']], 'not a word of Buddhism (typicality 5)');
{ const k = ix.entry.get(62773); if (k) { unlinkE(chk(62773, 'Kells'), 'holy_books', 'a stub of the Book of Kells, an illuminated gospel manuscript, not a holy book'); delE(62773, 'Kells', 'a stub made for holy books; in no theme'); } }
{ const ep = ix.entry.get(61268); if (ep) { unlinkE(chk(61268, 'educational psychologist'), 'school_staff', 'the UK name of the school psychologist, who is there (long: 23 letters)'); delE(61268, 'educational psychologist', 'made for school staff; in no theme (long)'); } }
out('university_degrees', [[34950, 'honors degree']], 'a degree classification, not a kind of degree; its UK spelling "honours degree" held the theme name\'s word (theme-name), and a US root with a UK spelling alias may not take a show');

// =================================================================================================
sec('6. Case, spelling and diacritics');
for (const [id, from, to, gloss] of [[33529, 'attache', 'attaché', ''], [33538, 'demarche', 'démarche', ''], [33539, "charge d'affaires", "chargé d'affaires", ''], [61062, 'agrement', 'agrément', ''],
  [61063, 'aide-memoire', 'aide-mémoire', ''], [61064, 'communique', 'communiqué', ''], [56796, 'colon', 'colón', 'currency'], [56798, 'cordoba', 'córdoba', 'currency'], [33904, 'bolivar', 'bolívar', 'currency'],
  [32580, 'Senor', 'Señor', ''], [32583, 'Fraulein', 'Fräulein', '']])
  respell(id, from, to, [], 'Merriam-Webster prints the accent (LIBRARY-RULES 5, rule 8: the root keeps it; the plain form is its spelling alias)', { aliasGloss: gloss });
respell(33371, 'tanaiste', 'Tánaiste', [], 'the Irish deputy prime minister: capital and accent as in Oxford (rule 8)', { type: 'proper', aliasText: 'Tanaiste' });
retext(33362, 'taoiseach', 'Taoiseach', 'the Irish prime minister\'s title, capitalized in Oxford and Merriam-Webster', { type: 'proper' });
respell(61108, 'Sinn Fein', 'Sinn Féin', [], 'Oxford prints Sinn Féin (rule 8)');
respell(32826, 'fervour', 'fervor', ['UK'], 'US spelling for the root; fervour is its UK spelling alias');
respell(32584, 'Your Honour', 'Your Honor', ['UK'], 'US spelling for the root; Your Honour is its UK spelling alias');
respell(33353, 'councillor', 'councilor', ['UK'], 'US spelling for the root (Merriam-Webster: councilor); councillor is its UK spelling alias');
{ const lh = chk(ix.entry.get(34629).text === 'Legion of Honor' ? 34629 : 34629, E(34629).text);
  if (!(lh.nameOkIn || []).includes('medals_and_honors')) setE(lh, 'nameOkIn', [...(lh.nameOkIn || []), 'medals_and_honors'], 'the full name is the member ("Honor" of the order, as US spelling makes it match the theme name medals and honors)'); }
respell(34629, 'Legion of Honour', 'Legion of Honor', ['UK'], 'US spelling for the root (Merriam-Webster: Legion of Honor); the UK spelling is its alias');
for (const [id, from, to, type] of [[33520, 'zionism', 'Zionism', 'proper'], [33521, 'fabianism', 'Fabianism', 'proper'], [61054, 'bolshevism', 'Bolshevism', 'proper'],
  [61055, 'menshevism', 'Menshevism', 'proper'], [61058, 'pan-africanism', 'Pan-Africanism', 'proper'], [34484, 'theravada', 'Theravada', 'proper'], [34485, 'mahayana', 'Mahayana', 'proper'], [34486, 'vajrayana', 'Vajrayana', 'proper'],
  [29449, 'zen', 'Zen', 'proper'], [34288, 'kingdom hall', 'Kingdom Hall', 'proper'], [29588, 'brexit', 'Brexit', 'proper'], [33415, 'trooping the colour', 'Trooping the Colour', 'proper'],
  [33579, 'supreme court', 'Supreme Court', 'org'], [33582, 'oval office', 'Oval Office', 'place'], [33587, 'secret service', 'Secret Service', 'org'], [33589, 'federal reserve', 'Federal Reserve', 'org'],
  [33600, 'library of congress', 'Library of Congress', 'org'], [33583, 'speaker of the house', 'Speaker of the House', 'title']])
  retext(id, from, to, 'a name or a word from a name, capitalized in Oxford and Merriam-Webster (the capital rule)', { type });
setE(chk(62776, 'CB'), 'type', 'acronym', 'CB (citizens band) is letters said as letters');
{ const g = chk(2487, 'gaol'); if (g.aliasOf !== 2486) setE(g, 'aliasOf', 2486, 'gaol is a spelling of jail, not of prison (alias-kind-suspect: it differs from "prison" in 5 of 6 letters); untagged rare variant (Simon, v420)'); }
retext(34990, 'parent-teacher conference', 'parent-teacher meeting', 'the same event in 20 letters (long: 23); parents\' evening stays its UK alias');
famE(28571, 'murder', 1, 'every child knows the word (it was 4)');
famE(28443, 'pay', 1, 'every child knows the word (it was 3)');
famE(28493, 'team', 1, 'every child knows the word (it was 3)');
{ const s = chk(62520, 'stir'); setE(s, 'fam', 4, 'prison slang ("in stir"), known to people with the interest (it was 1)'); setE(s, 'pos', 'noun', 'the prison, a noun'); }
famE(50064, 'pawn', 3, 'to pawn [hock] is known to many adults, not every child (it was 1)');
famE(3936, 'slumber party', 2, 'every US adult knows it (it is sleepover\'s first synonym, which the game shows: GAME-CONTRACT flag 512)');
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');

// =================================================================================================
sec('7. Types: compound nouns typed phrase (type phrase is for idioms only; contract-type-common)');
for (const [id, text] of [[4086, 'police officer'], [4087, 'policeman'], [4088, 'cop'], [4089, 'copper'], [4090, 'bobby'], [4114, 'taxi driver'], [4115, 'cabbie'], [4117, 'truck driver'], [4118, 'trucker'],
  [4123, 'postie'], [4125, 'garbage collector'], [4171, 'notary public'], [4176, 'claims adjuster'], [4248, 'law enforcement'], [4251, 'neighborhood watch'], [4267, 'contempt of court'], [4398, 'air raid'],
  [4405, 'military base'], [4422, 'mess hall'], [4436, 'commanding officer'], [4489, 'report card'], [4521, 'high school'], [4523, 'elementary school'], [4524, 'boarding school'], [4535, 'school uniform'],
  [4536, 'spelling bee'], [4543, "teachers' lounge"], [4549, 'show and tell'], [4555, 'sick bay'], [4565, 'social media'], [4581, 'electronic mail'], [4582, 'phone call'], [4583, 'ring'], [4584, 'buzz'],
  [4602, 'two-way radio'], [4612, 'news anchor'], [4621, 'video call'], [4626, 'live stream'], [4628, 'smoke signal'], [4639, 'chat room'], [4641, 'press release'], [4645, 'push notification'], [4649, 'fake news'],
  [4654, 'wire service'], [5181, 'bachelor party'], [5184, 'bachelorette party'], [5187, 'bar mitzvah'], [5894, 'ham radio'], [6146, 'disc jockey'], [6400, 'stunt double'], [6425, 'prime time'], [6443, 'film noir'],
  [6444, 'noir'], [28961, 'fun run'], [32447, 'open relationship'], [32558, 'naming ceremony'], [35640, 'hardcore fan'], [67351, 'class president'], [61143, 'letters patent'], [3953, 'next of kin']])
  retype(id, text, 'common', 'a noun (ring and buzz are single words, the others compound nouns), not an idiom (LIBRARY-RULES 4: type phrase is for idioms and set phrases only)');

// =================================================================================================
for (const [id, text] of [[4121, 'postman'], [4126, 'binman'], [4127, 'dustman'], [4128, 'refuse collector'], [4124, 'letter carrier'], [4546, 'bunking off']]) { const a = chk(id, text); if (a.type === 'phrase') setE(a, 'type', 'common', 'a noun, not an idiom (reviewer: aliases still typed phrase)'); }
{ const sp = chk(402, 'sweet potato'), ku = chk(27110, 'kūmara'); if (sp.typ.maori_culture !== undefined) swap('maori_culture', sp, ku, 'the Māori word is the member of Māori culture (reviewer)', { outWhy: 'the English word; kūmara takes the link' }); }
for (const [t, id, why] of [['jobs', 4143, 'a translator writes, an interpreter speaks: different jobs'], ['jobs', 4157, 'an optician fits glasses, an optometrist examines eyes: different jobs'],
  ['medical_jobs', 4157, 'an optician fits glasses, an optometrist examines eyes: different jobs'], ['shopkeepers', 4157, 'an optician fits glasses, an optometrist examines eyes: different jobs'],
  ['jobs', 4109, 'a janitor looks after a building, a cleaner cleans: different jobs']]) leaveGroup(t, id, why + ' (reviewer)');
famE(50130, 'sultana', 4, 'the sultan\'s wife is known to people with the interest, not nearly every adult (reviewer)');
famE(28467, 'Mark', 1, 'a name every child knows (reviewer)');
famE(28546, 'money', 1, 'every child knows the word (reviewer)');

sec("8. Reviewer's fixes (2026-11-23) and ratings");
for (const [id, text, tid, typ, why] of [[33424, 'monarchy', 'types_of_government', 1, 'one of the first types anyone names'], [33425, 'republic', 'types_of_government', 1, 'one of the first types anyone names'],
  [33430, 'theocracy', 'types_of_government', 3, 'an ordinary member'], [33434, 'totalitarianism', 'types_of_government', 3, 'an ordinary member'], [33445, 'military rule', 'types_of_government', 3, 'an ordinary member'],
  [33454, 'regency', 'types_of_government', 4, 'a stand-in rule, not a form of government anyone names first'], [61029, 'mobocracy', 'types_of_government', 4, 'a rare word'], [33452, 'ochlocracy', 'types_of_government', 4, 'a rare word'],
  [33424, 'monarchy', 'ruled_by_one_leader', 1, 'the classic rule by one'], [33454, 'regency', 'ruled_by_one_leader', 4, 'a stand-in for a monarch'],
  [61029, 'mobocracy', 'words_ending_in_cracy', 4, 'a rare word'], [33452, 'ochlocracy', 'words_ending_in_cracy', 4, 'a rare word'], [33430, 'theocracy', 'words_ending_in_cracy', 3, 'an ordinary member'],
  [33439, 'technocracy', 'words_ending_in_cracy', 4, 'less typical'], [33442, 'kleptocracy', 'words_ending_in_cracy', 4, 'less typical'], [61057, 'Luxemburgism', 'political_ideologies', 5, 'a peripheral ideology (it was 2)']])
  rate(chk(id, text), tid, typ, `typicality: ${why} (the ratings of the theme were out of order)`);

// =================================================================================================
sec('9. First synonym alias (the game shows a root\'s first synonym alias at some levels: GAME-CONTRACT flag 512)');
moveBefore(66687, 4501, 'principal\'s first synonym was head (familiarity 4); head teacher (2) now comes first');
moveBefore(50476, 33230, 'locomotive engineer\'s first synonym was locomotive driver (3); engineer [US] (1) now comes first');
{ const syn = new Map(); for (const a of P.entries) if (a.aliasOf && a.aliasKind === 'synonym') { if (!syn.has(a.aliasOf)) syn.set(a.aliasOf, []); syn.get(a.aliasOf).push(a); }
  const bad = [...syn].filter(([rid, ss]) => linkIds(P, E(rid)).some(inGroup) && ss[0].fam > E(rid).fam + 1).map(([rid, ss]) => `${lab(E(rid))} (familiarity ${E(rid).fam}): ${lab(ss[0])} (${ss[0].fam})`);
  A.push(`  first synonym harder than the root's familiarity + 1, left: ${bad.length}: ${bad.join('; ') || 'none'}`); }

// =================================================================================================
sec('10. Decided by Simon (2026-11-23, "Take all and apply")');
// The v413 slang stays roots; they leave the groups (or the themes where they only repeat the standard word) that joined them with it.
outOf(['military', 'army_words'], [[4376, 'squaddie'], [4377, 'digger'], [4378, 'grunt']], "a nation's nickname for its soldiers beside soldier; it plays in kinds of soldier and service members (Simon: v413 slang stays a root)");
for (const t of ['service_members', 'kinds_of_soldier', 'wars_and_battles']) for (const id of [4376, 4377, 4378]) leaveGroup(t, id, "a nation's nickname for its soldiers (British, Australian, US): a separate answer, not that nation's everyday word for soldier (Simon)");
out('anzac_day', [[4376, 'squaddie'], [4378, 'grunt']], 'the British and US nicknames, not ANZAC words (typicality 4-5); digger stays');
leaveGroup('anzac_day', 4377, 'digger is the Australian and New Zealand soldier the day remembers: a separate answer beside soldier (Simon)');
outOf(['dress_up_costumes', 'jobs_with_uniforms'], [[4090, 'bobby'], [4089, 'copper']], 'police slang repeating police officer and cop, the costume (typicality 5; Simon: v413 slang stays a root)');
out('nicknames_for_workers', [[4088, 'cop']], 'cop and copper are one family (cop is short for copper) and were grouped as one answer; the nickname theme keeps copper (UK), cop plays in jobs and police words (Simon)');
// Comic Relief and Deadhead: the case lint needs a js/caselint-allow.js key for each link (the manager adds them at apply time); skipped until the keys are there.
{ const ok = k => CASE_OK.has(k) || process.env.FORCE_CASE;
  const c = chk(13527, 'comic relief');
  if (c.typ.charity_words !== undefined && ok(`${P.nextId}|charity_words`)) { const cr = newEntry('Comic Relief', 'charity', { pos: 'noun', type: 'org', fam: 3, region: ['UK'] }, 'the UK charity behind Red Nose Day (Simon); comic relief 13527 is the light moment in a drama (story roles)');
    for (const t of ['charity_words', 'helping_groups']) swap(t, c, cr, 'the charity'); setE(c, 'gloss', 'humor', 'its text is now shared with Comic Relief [charity]'); }
  else if (c.typ.charity_words !== undefined) A.push(`  (skipped until js/caselint-allow.js has '${P.nextId}|charity_words': Comic Relief [charity] would take entry id ${P.nextId})`);
  if (E(50194).text === 'deadhead' && ok('50194|fans_and_followers')) retext(50194, 'deadhead', 'Deadhead', 'a Grateful Dead fan (Merriam-Webster: Deadhead, capitalized; Simon)', { type: 'proper' });
  else if (E(50194).text === 'deadhead') A.push(`  (skipped until js/caselint-allow.js has '50194|fans_and_followers': Deadhead)`); }
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
const summary = [`Library batch v440: tidy-up step 3, People & Society (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch440-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch440-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch440-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

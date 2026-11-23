// Library batch v442: tidy-up step 3 (TIDY-UP.md), the Sports & Games group: every theme under sports_games read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v439. Applied after v440 (People & Society) and v441 (Home & Everyday): everything here works by entry id + text and theme id,
// never by position, and every step is skipped when it is already done (rerun: 0 changes). A merge another batch has already made is skipped.
//   1. Tree and twins: bike races and games played with a deck deleted (twins), old-fashioned playthings merged into traditional playthings,
//      Olympic snow sports renamed Winter Olympic sports under Olympic sports; golf scores, baseball hitting, horseback riding renamed.
//   2. X-words twins: landforms out of mountaineering words, specialist gear out of climbing words, resort facilities out of skiing words ...
//   3. Regional roots (region-root-equiv): whiff-whaff, Spurs, Cim Bom, hot corner, arrows, sports hall, plaza de toros, microlight flying,
//      bobber, pokies, bark chippings, cornhole, the AFL nicknames, Galo, Kara Kartallar ...; abseiling/rappelling flipped.
//   4. About 110 second roots of one sense merged. 5. Wrong senses split (fore, relay, jump shot, crease, ruck, flanker, stalking, nerf ...).
//   6. Belonging. 7. Case, diacritics (épée, massé, pétanque, macramé), types, flags. 8. The first synonym alias of every root (game flag 512).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch442.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin, placeTheme } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
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
const GROUP = 'sports_games';
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

// =================================================================================================
sec('1. Twins and the tree');
dropTheme('bike_races', 'a twin of cycling races (all 8 of its words are there, and in famous races): LIBRARY-RULES 3 names this pair (TIDY-UP.md, known item)');
dropTheme('games_played_with_a_deck', 'a twin of casino games (all 9 words are there; theme-twin); an adult theme that never plays');
for (const [id, text, typ] of [[5926, 'yo-yo', 2], [46066, 'pull toy', 3], [46073, 'zoetrope', 5], [5949, 'toy soldier', 3]])
  if (ix.theme.has('old_fashioned_playthings')) linkE(chk(id, text), 'traditional_playthings', typ, 'from old-fashioned playthings, merged into traditional playthings');
if (ix.theme.has('old_fashioned_playthings')) addToGroup('traditional_playthings', [5949, 64356], 'toy soldier and tin soldier are one answer (as in old-fashioned playthings)');
dropTheme('old_fashioned_playthings', 'the same theme as traditional playthings (8 of its 12 words shared; the names mean the same); its other 4 words move there');
rename('olympic_snow_sports', 'Winter Olympic sports', 'it holds the Winter Olympic sports (curling, luge and bobsled are not snow sports); a twin of Olympic sports as it stood (11 of 12 words), now its sub-theme');
moveT('olympic_snow_sports', 'aquatic_sports', 'after', 'a sub-theme of Olympic sports, beside Olympic team sports and Olympic aquatic sports (theme-twin)');
for (const [id, text, typ] of [[5348, 'figure skating', 1], [5349, 'ice hockey', 1], [5359, 'speed skating', 2], [5360, 'short track', 3], [5394, 'ski mountaineering', 4]])
  linkE(chk(id, text), 'olympic_snow_sports', typ, 'a Winter Olympic sport (ski mountaineering since 2026)');
out('olympic_snow_sports', [[5345, 'skiing']], 'the general word beside its kinds (alpine, cross-country, freestyle skiing)');
out('snow_sports', [[5350, 'curling']], 'played on ice, not snow');
rename('scoring_terms', 'golf scores', 'its words are the scores of a hole (birdie, par, bogey); "golf scoring terms" was an "X terms" twin of golf terms (91%) and scoring words (73%)');
out('scoring_terms', [[43066, 'stableford']], 'a scoring system, not a score');
addToGroup('scoring_terms', [43032, 43033], 'hole in one and ace are one answer (as in golf terms)');
rename('hitting_terms', 'baseball hitting', 'a subset of baseball terms (all 13 words); named for what it is (xwords-twin with baseball terms and scoring words)');
rename('horse_riding_words', 'horseback riding', 'the topic of riding (tack, gaits, riding), not an "X words" twin of horses (Animals); US name, as horseback riding 5636 (v438)');
out('horse_riding_words', [[1451, 'pony'], [1463, 'stallion'], [1464, 'mare'], [1465, 'gelding'], [1487, 'foal'], [1502, 'mane'], [1503, 'hoof']], 'a kind or part of the horse, not riding (in horses)');

// =================================================================================================
sec('2. X-words twins: things to the theme they belong to');
out('mountaineering_words', [[1911, 'glacier'], [1930, 'ridge'], [1964, 'moraine'], [30843, 'pass'], [30845, 'col'], [30850, 'scree'], [30851, 'snowline'], [30858, 'couloir'], [30908, 'serac'], [48667, 'arête']],
  'a mountain landform (in mountains), not mountaineering (xwords-twin: 20 of 48 words shared with mountains)');
out('climbing_words', [[26216, 'ascender'], [45073, 'hangboard'], [45087, 'jumar'], [45089, 'webbing'], [45090, 'cam'], [45092, 'grigri'], [47582, 'Prusik']],
  'a specialist piece of gear, in climbing gear (xwords-twin: 18 of 49 words shared)');
out('swimming_words', [[43289, 'deep end'], [43290, 'shallow end']], 'a part of the pool (in swimming pool; xwords-twin 13 of 41)');
out('skiing_words', [[127, 'chalet'], [43537, 'T-bar'], [43538, 'button lift'], [43555, 'ski school'], [43527, 'gondola'], [47073, 'lift pass'], [43535, 'off-piste']], 'a ski resort facility (in ski resort and ski trip; xwords-twin 37% and 30%)');
out('lottery_words', [[5670, 'raffle'], [5702, 'football pools'], [5679, 'sweepstake'], [5703, 'premium bonds'], [5695, 'Pick 3']], 'a game of chance of its own, not lottery words (in games of chance; xwords-twin 31%)');
out('arcade_words', [[45714, 'slingshot'], [45709, 'multiball'], [45713, 'drop target'], [45715, 'skill shot'], [45708, 'plunger'], [45712, 'extra ball']], 'a pinball word (in its sub-theme pinball words; xwords-twin 9 of 28)');

// =================================================================================================
sec('3. Regional roots (region-root-equiv, contract-root-region)');
mergeInto(58475, 'Tottenham', 58476, 'Spurs', 'synonym', 3, 'the club\'s nickname, grouped as one answer', { region: ['UK'] });
mergeInto(46213, 'Galatasaray', 46214, 'Cim Bom', 'synonym', 5, 'the club\'s nickname, grouped as one answer', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
mergeInto(46218, 'Beşiktaş', 46220, 'Kara Kartallar', 'synonym', 5, 'the club\'s nickname (Black Eagles), grouped as one answer', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
mergeInto(46442, 'Atlético Mineiro', 46444, 'Galo', 'synonym', 5, 'the club\'s nickname, grouped as one answer', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
mergeInto(58629, 'third base', 58630, 'hot corner', 'synonym', 4, 'US slang for third base, grouped as one answer', { del: 'as the first synonym of third base (familiarity 1) it would be shown at some levels; slang (baseball bases is complete: third base)' });
mergeInto(43170, 'dart', 43194, 'arrows', 'synonym', 3, 'UK slang for darts, grouped as one answer', { del: 'as the first synonym of dart (familiarity 1) it would be shown at some levels' });
mergeInto(5256, 'real tennis', 5286, 'jeu de paume', 'translation', 5, 'the French name of real tennis, grouped as one answer (real tennis stays a UK root: its US name court tennis is not in the library)');
mergeInto(44178, 'gymnasium', 44179, 'sports hall', 'regional', 2, 'the UK word for a gymnasium (a hall for sports), grouped as one answer', { del: 'as an alias its text would repeat sport in sports venues (theme-name); UK players see gymnasium' });
mergeInto(44184, 'bullring', 44943, 'bull ring', 'spelling', 3, 'one word written two ways (Merriam-Webster and Oxford: bullring): bullring [arena] in sports venues, bull ring in bullfighting words');
mergeInto(44184, 'bullring', 44955, 'plaza de toros', 'translation', 4, 'Spanish for bullring, grouped as one answer', { region: ['ES'] });
{ const m = ix.entry.get(45028); if (m && m.text === 'microlight flying') { retext(45028, 'microlight flying', 'ultralight flying', 'the US and general name (as ultralight 39775 with its UK alias microlight); microlight flying was a UK root grouped with it'); setE(m, 'region', [], 'the general word'); newAlias(45028, 'microlight flying', '', 'regional', 4, ['UK'], 'the UK name: a UK player sees it'); } }
mergeInto(45127, 'float', 45128, 'bobber', 'regional', 3, 'the US word for a fishing float, grouped as one answer (Travel & Transport list)', { region: ['US'] });
mergeInto(5662, 'slot machine', 5665, 'pokies', 'regional', 4, 'the Australian and NZ word for slot machines, grouped as one answer (it was in British pub games too)', { region: ['AU', 'NZ'] });
leaveGroup('betting_words', 65890, 'bookies [betting shop] is the shop, not the bookmaker');
mergeInto(46081, 'wood chips', 46087, 'bark chippings', 'regional', 4, 'the UK word for playground wood chips, grouped as one answer', { region: ['UK'] });
mergeInto(46126, 'bean bag toss', 5272, 'cornhole', 'regional', 3, 'the US name of bean bag toss, grouped as one answer (US players see cornhole)', { region: ['US'] });
for (const [keep, kt, gone, gt] of [[46401, 'North Melbourne', 46402, 'Kangaroos'], [46401, 'North Melbourne', 46403, 'Roos'], [46385, 'Collingwood', 46386, 'Magpies'], [46385, 'Collingwood', 46387, 'Pies'],
  [46404, 'Western Bulldogs', 46405, 'Doggies'], [46406, 'St Kilda', 46407, 'Saints'], [46416, 'Fremantle', 46417, 'Dockers'], [46392, 'Richmond', 46393, 'Tigers'], [46422, 'GWS Giants', 46423, 'Greater Western Sydney'],
  [46422, 'GWS Giants', 46424, 'Giants'], [46414, 'Port Adelaide', 46415, 'Power'], [46408, 'Sydney Swans', 46409, 'Swans'], [46388, 'Carlton', 46389, 'Blues'], [46420, 'Gold Coast Suns', 46421, 'Suns'],
  [46390, 'Essendon', 46391, 'Bombers'], [46410, 'West Coast Eagles', 46411, 'Eagles'], [46394, 'Hawthorn', 46395, 'Hawks']]) {
  const g = ix.entry.get(gone);
  mergeInto(keep, kt, gone, gt, 'synonym', gone === 46423 ? 4 : g?.fam ?? 4, 'the club\'s nickname or other name, grouped as one answer (as Geelong Cats has Cats, Adelaide Crows has Crows)', gone === 46405 ? { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' } : g?.region?.length ? { region: g.region } : {});
}
setE(chk(67170, 'recreation center'), 'region', [], 'the US root of a regional pair: untagged, as color is (v413); its UK word leisure centre is its regional alias (region-root-equiv in public buildings)');
for (const [id, text, why] of [[44166, 'soccer field', 'football pitch'], [67159, 'soccer jersey', 'football shirt'], [67161, 'C-clamp', 'G-clamp']])
  setE(chk(id, text), 'region', [], `the US root of a regional pair: untagged, as color is (v413); its UK word ${why} is its regional alias`);
if (ix.theme.has('outdoor_activities')) leaveGroup('outdoor_activities', 5652, 'fell running is UK hill running, a kind of trail running, not the same answer (region-root-equiv)');
{ const a = E(5622); if (a.text === 'abseiling') { retext(5622, 'abseiling', 'rappelling', 'the US root (LIBRARY-RULES 5: the root is the US or neutral word); abseiling becomes its UK alias, as rappel / abseil (verb)');
    const al = chk(5623, 'rappelling'); retext(5623, 'rappelling', 'abseiling', 'the UK word of rappelling'); setE(al, 'region', ['UK', 'AU'], 'the UK and Australian word'); } }

// =================================================================================================
sec('4. Two roots of one sense');
const M = (k, kt, g, gt, kind, fam, why, o) => mergeInto(k, kt, g, gt, kind, fam, why, o);
M(5206, 'field hockey', 44063, 'hockey', 'regional', 1, 'in the UK, Ireland, Australia and India "hockey" is field hockey (in the US it is ice hockey): its regional alias', { region: ['UK', 'IE', 'AU', 'NZ', 'IN'] });
M(5312, 'whitewater rafting', 5617, 'white-water rafting', 'spelling', 2, 'one sport written two ways (grouped)', { del: 'as an alias its text would repeat water in water sports (theme-name)' });
M(5312, 'whitewater rafting', 45017, 'white water rafting', 'spelling', 2, 'one sport written a third way (extreme sports)', { del: 'as an alias its text would repeat water in water sports (theme-name)' });
M(43228, 'tenpin', 43227, '10 pin', 'synonym', 4, 'the same word written with a numeral');
M(5404, 'mixed martial arts', 5403, 'MMA', 'abbreviation', 1, 'the short form (grouped as one answer)');
M(5409, 'sumo', 5430, 'sumo wrestling', 'synonym', 2, 'the same sport (grouped)');
M(5406, 'jiu-jitsu', 43699, 'jujutsu', 'spelling', 3, 'one art written two ways (Merriam-Webster: jujitsu, also jiujitsu, jujutsu; grouped in Japanese martial arts)');
M(43753, 'technical knockout', 43734, 'TKO', 'abbreviation', 3, 'the short form (grouped)');
M(43755, 'takedown', 43791, 'take-down', 'spelling', 3, 'one word written two ways (grouped)');
M(39846, 'triple jump', 43960, 'hop, step and jump', 'synonym', 4, 'the old name of the triple jump', { del: 'as the first synonym of triple jump (familiarity 2) it would be shown at some levels; an old name' });
M(43970, 'high bar', 43971, 'horizontal bar', 'synonym', 3, 'the same apparatus (grouped)');
M(16876, 'somersault', 43976, 'salto', 'translation', 4, 'the Italian and Spanish word for a somersault (grouped)');
M(3609, 'cool-down', 44000, 'cooldown', 'spelling', 2, 'one word written two ways (running words; the gaming sense is split below)', { gloss: 'exercise' });
M(44350, 'heat', 43292, 'heat', 'synonym', 2, 'heat [swimming] is the same qualifying race as heat [race]');
M(44339, 'seed', 43006, 'seed', 'synonym', 3, 'seed [tennis] is the same tournament seed');
M(42999, 'tiebreak', 44261, 'tie-break', 'spelling', 2, 'one word written two ways (tennis terms, scoring words)');
M(43176, '180', 44265, 'one-eighty', 'synonym', 4, 'the darts score written out');
M(43176, '180', 43182, 'ton-eighty', 'synonym', 4, 'the darts slang for 180 (grouped)', { region: ['UK'] });
M(61721, 'nine-dart finish', 43177, 'nine-darter', 'synonym', 4, 'the same feat');
M(44237, 'cycling shorts', 24335, 'bike shorts', 'synonym', 3, 'the same shorts (grouped)', { del: 'as an alias its text would repeat bike in bike gear and shorts in pants and shorts (theme-name)' });
M(4928, 'gilet', 4929, 'bodywarmer', 'synonym', 4, 'the same sleeveless jacket (both UK words, grouped)', { region: ['UK'] });
M(44141, 'shin guards', 44230, 'shin pads', 'regional', 2, 'the UK word for shin guards', { region: ['UK'] });
M(42671, 'referee', 44217, 'ref', 'abbreviation', 1, 'the short form (grouped)');
M(57390, 'Wembley Stadium', 44383, 'Wembley', 'synonym', 2, 'the stadium (English football grounds took the short name)', { keepShow: true });
M(44413, 'Signal Iduna Park', 61751, 'Westfalenstadion', 'synonym', 5, 'the same stadium\'s old name (grouped)', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
M(42926, 'Webb Ellis Cup', 44474, 'Webb Ellis', 'synonym', 4, 'the same trophy (rugby terms has the full name)');
M(44338, 'Hawaii Ironman', 50038, 'kona', 'synonym', 5, 'the Ironman World Championship at Kona', { del: 'a lowercase stub of the race name; triathlon words takes Hawaii Ironman' });
M(44625, 'Julius Erving', 44626, 'Dr. J', 'synonym', 4, 'his nickname (grouped)');
M(52932, 'Harry Houdini', 52933, 'Houdini', 'synonym', 1, 'the same man (grouped)');
M(52932, 'Harry Houdini', 52934, 'Ehrich Weisz', 'synonym', 5, 'his birth name (grouped)');
M(52948, 'James Randi', 52960, 'The Amazing Randi', 'synonym', 4, 'his stage name (grouped)');
for (const [k, kt, g, gt] of [[58861, 'Magnus Carlsen', 58862, 'Carlsen'], [58859, 'Bobby Fischer', 58860, 'Fischer'], [58857, 'Garry Kasparov', 58858, 'Kasparov']])
  M(k, kt, g, gt, 'synonym', 3, 'his surname as a second root (grouped), as Karpov is an alias of Anatoly Karpov');
M(5752, 'Catan', 5753, 'Settlers of Catan', 'synonym', 3, 'the same game (its old name; grouped)');
M(5763, 'Chinese chess', 5762, 'xiangqi', 'translation', 4, 'the Chinese name of Chinese chess (grouped)');
M(58807, 'gomoku', 58808, 'gobang', 'synonym', 5, 'the same game (grouped)', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
M(45412, 'speed', 45413, 'spit', 'synonym', 3, 'the same card game (grouped)');
M(45489, "liar's dice", 45505, 'dudo', 'translation', 5, 'the Spanish name of the game (grouped)');
M(45534, 'checker', 45541, 'draughtsman', 'regional', 4, 'the UK word for a checker (grouped)', { region: ['UK'] });
M(45265, 'pair', 58916, 'one pair', 'synonym', 3, 'the same poker hand (grouped)', { del: 'as the first synonym of pair (familiarity 1) it would be shown at some levels; the complete note keeps "pair"' });
M(5689, "Texas hold'em", 45204, "Hold'em", 'synonym', 3, 'the short name of the same game (grouped)');
M(5662, 'slot machine', 45195, 'slots', 'synonym', 1, 'the casino game of slot machines (grouped)');
M(44874, 'bookmaker', 33279, 'bookie', 'synonym', 2, 'the informal word for a bookmaker (grouped)');
M(67034, 'each way bet', 44858, 'each way', 'synonym', 3, 'the same bet (kinds of wager shows the full term short)', { keepShow: true });
M(67020, 'Yankee bet', 45343, 'Yankee', 'synonym', 4, 'the same bet', { keepShow: true });
M(5994, 'Russian doll', 5995, 'matryoshka', 'translation', 4, 'the Russian name of the Russian doll (grouped)');
M(5957, 'hide-and-seek', 46094, 'hide and seek', 'spelling', 1, 'one game written two ways (Merriam-Webster: hide-and-seek)');
M(45393, 'Guess Who?', 46113, 'Guess Who', 'spelling', 2, 'the same game');
M(25063, 'egg and spoon race', 58939, 'egg and spoon', 'synonym', 2, 'the same race');
M(46514, 'caber toss', 46515, 'tossing the caber', 'synonym', 3, 'the same event (grouped)');
M(5271, 'horseshoes', 46136, 'horseshoe pitching', 'synonym', 4, 'the same game (grouped)', { del: 'as the first synonym of horseshoes (familiarity 2) it would be shown at some levels' });
M(46122, 'ladder toss', 58946, 'ladder golf', 'synonym', 4, 'the same game (grouped)');
M(46147, 'bricks', 46156, 'interlocking bricks', 'synonym', 2, 'the same toy (grouped)');
M(46076, 'spring rider', 46089, 'rocker', 'synonym', 3, 'the same playground ride (grouped)');
M(45857, 'lacemaking', 5875, 'lace making', 'spelling', 4, 'one word written two ways');
M(24620, 'sneakers', 45868, 'sneakers', 'synonym', 1, 'sneakers [collecting] is the same shoe');
M(4851, 'drawknife', 4852, 'drawshave', 'synonym', 5, 'the same tool (grouped in five themes)');
M(58927, "Einstein's puzzle", 64353, "Einstein's riddle", 'synonym', 4, 'the same puzzle (grouped)');
M(5569, 'falconry', 5600, 'hawking', 'synonym', 4, 'the same sport (grouped in three themes)', { dropKin: true });
M(5581, 'cutting', 44910, 'cutting', 'synonym', 4, 'cutting [horse event] is the same western riding event (sense-twin)', { dropKin: true });
M(5575, 'vaulting', 44906, 'vaulting', 'synonym', 3, 'vaulting [horse] is the same horse sport (sense-twin)');
M(9554, 'blinkers', 44866, 'blinkers', 'synonym', 3, 'blinkers [horse] is the same tack (sense-twin)');
M(44840, 'side saddle', 44915, 'side-saddle', 'spelling', 4, 'one word written two ways');
M(1511, 'show jumping', 44919, 'jumping', 'synonym', 2, 'the short name of the same event: equestrian events takes show jumping', { del: 'the bare word jumping would repeat jump' });
M(5561, 'calf roping', 44933, 'tie-down roping', 'synonym', 4, 'the same rodeo event (grouped)');
M(44945, 'cape', 44971, 'red cape', 'synonym', 1, 'the same cape (grouped)');
M(44942, 'bullfight', 44952, 'corrida', 'translation', 3, 'the Spanish word (grouped)');
M(44961, 'sword', 44960, 'estoque', 'translation', 5, 'the Spanish word for the matador\'s sword (grouped)');
M(44148, 'ice axe', 45116, 'piolet', 'translation', 5, 'the French word (grouped)');
M(39868, 'sinker', 58804, 'weight', 'synonym', 2, 'weight [fishing] is the sinker (grouped)');
M(5635, 'gliding', 45036, 'soaring', 'synonym', 3, 'the same air sport (grouped)');
M(5239, 'wheelchair rugby', 61765, 'murderball', 'synonym', 3, 'its old name (grouped)');
M(61687, 'CP football', 61688, 'seven-a-side football', 'synonym', 5, 'the same Paralympic sport');
M(44122, 'para ice hockey', 5393, 'sled hockey', 'regional', 4, 'the US name of para ice hockey (sledge hockey is its UK name)', { region: ['US'] });
M(5308, 'synchronized swimming', 5309, 'artistic swimming', 'synonym', 3, 'the new name of synchronized swimming (2017; grouped)');
M(46230, 'Rizespor', 46231, 'Caykur Rizespor', 'synonym', 5, 'the same club (grouped)');
M(46247, 'Karagümrük', 46249, 'Fatih Karagumruk', 'synonym', 5, 'the same club (grouped)');
M(46222, 'Başakşehir', 46224, 'Istanbul Basaksehir', 'synonym', 5, 'the same club (grouped)');
M(46288, 'Wydad Casablanca', 46289, 'Wydad', 'synonym', 5, 'the same club (grouped)');
M(46290, 'Raja Casablanca', 46291, 'Raja Club Athletic', 'synonym', 5, 'the same club (grouped)', { del: 'as an alias its text would repeat club in African soccer clubs (theme-name)' });
M(46335, 'kushti', 46336, 'pehlwani', 'synonym', 5, 'the same wrestling (grouped)', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
M(46329, 'seven stones', 46328, 'lagori', 'translation', 5, 'the Indian name of seven stones (grouped)');
M(46363, 'speccy', 46365, 'screamer', 'synonym', 4, 'the same spectacular mark (grouped)', { dropKin: true });
M(46504, 'cordão', 46505, 'corda', 'synonym', 5, 'the same capoeira belt (grouped)');
M(46517, 'stone put', 46518, 'putting the stone', 'synonym', 4, 'the same event (grouped)');
M(46529, 'heavy events', 46534, 'heavies', 'synonym', 5, 'the same events (grouped)', { dropKin: true, del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
M(46545, 'ring the bull', 46546, 'bull and ring', 'synonym', 5, 'the same pub game (grouped)', { del: 'as the first synonym (familiarity 5) of a familiarity-4 root it would be shown at some levels (flag 512); a nickname or variant few players know (reviewer)' });
M(46540, 'foosball', 46539, 'table football', 'regional', 2, 'the UK name of foosball (grouped)', { region: ['UK'] });
M(46537, 'bar skittles', 46538, 'table skittles', 'synonym', 4, 'the same game (grouped)');
M(42993, 'net', 44138, 'net', 'synonym', 1, 'net [sports] in sports equipment is the same net (v433: net is merged where the meaning is the same)');
setE(chk(42993, 'net'), 'gloss', 'sports', 'now also the net in sports equipment');
{ // fly, free and breast are the swimmers' short names of three strokes
  M(50368, 'butterfly', 43268, 'fly', 'abbreviation', 2, 'the swimmers\' short name of butterfly (grouped)', { dropKin: true });
  M(10960, 'freestyle', 43269, 'free', 'abbreviation', 3, 'the swimmers\' short name of freestyle (grouped)');
  M(43243, 'breaststroke', 43270, 'breast', 'abbreviation', 3, 'the swimmers\' short name of breaststroke (grouped)'); }
{ const s = ix.entry.get(64816); if (s) { // synchronized: a modifier stub of synchronized diving
  setShow(chk(43324, 'synchronized diving'), 'diving_terms', 'synchronized', 'the full term shown short, in place of the stub synchronized');
  const sy = ix.entry.get(64330); if (sy && sy.aliasOf === 64816) { setE(sy, 'aliasOf', 43324, 'synchro is the short name of synchronized diving'); reindex(P); }
  delAlias(64986, 'synchronised', 'the UK spelling of the stub synchronized (synchronized diving has synchronised diving)');
  unlinkE(chk(64816, 'synchronized'), 'diving_terms', 'a modifier stub grouped with synchronized diving, which takes its place shown short');
  delE(64816, 'synchronized', 'a modifier stub made for diving terms (LIBRARY-RULES 5); in no theme'); } }

// =================================================================================================
sec('5. Wrong senses and stubs');
swap('volleyball_terms', chk(39098, 'spike'), chk(44276, 'spike'), 'the volleyball attack (sense-link)');
swap('swimming_words', chk(24786, 'goggles'), chk(48808, 'goggles'), 'swimming goggles (sense-link)');
swap('skiing_words', chk(24786, 'goggles'), chk(48872, 'goggles'), 'ski goggles (sense-link)');
out('swimming_words', [[50008, 'safety glasses']], 'lab and workshop eyewear, not a swimming word (it was grouped with goggles)');
out('skiing_words', [[50008, 'safety glasses']], 'lab and workshop eyewear, not a skiing word (it was grouped with goggles)');
swap('game_pieces', chk(36, 'knight'), chk(28733, 'knight'), 'the chess piece (sense-link)');
{ const c = chk(34, 'castle'); if (c.typ.chess_pieces !== undefined || c.typ.game_pieces !== undefined) {
  newAlias(33, 'castle', 'chess piece', 'synonym', 2, [], 'the other name of the rook (chess pieces: rook (castle)); castle [building] held the link');
  out('chess_pieces', [[34, 'castle']], 'castle [building] is the building; the rook\'s other name is now its alias castle [chess piece]');
  out('game_pieces', [[34, 'castle']], 'castle [building] is the building; the rook\'s other name is now its alias castle [chess piece]'); } }
if (E(33).typ.chess_pieces !== undefined && !(T('chess_pieces').note || '').includes('rook (castle)')) setT('chess_pieces', 'note', 'Exactly: king, queen, rook (castle), bishop, knight, pawn.', 'the castle is the rook\'s alias');
{ const f = chk(47602, 'fore'); if (f.typ.golf_terms !== undefined) { const g = newEntry('fore', 'golf warning', { pos: 'other', type: 'common', fam: 2 }, 'the golfer\'s warning shout; fore [ship front] held the link'); swap('golf_terms', f, g, 'the golf shout'); } }
for (const t of ['track_events', 'sports_day_events']) out(t, [[42635, 'relay']], 'relay [electronics] is the electrical switch, not the race; the relay races (4x100 relay, sprint relay ...) are there (reviewer)');
split(42723, 'jump shot', ['cue_sports_terms', 'cue_strokes'], 'jump shot', 'billiards', { fam: 3 }, 'the cue ball jumps (v433: a term whose meaning differs between sports is kept apart)', 'basketball');
split(42843, 'perfect game', ['bowling_terms'], 'perfect game', 'bowling', { fam: 3 }, 'twelve strikes, 300 (the baseball perfect game is another feat)', 'baseball');
split(42854, 'crease', ['ice_hockey_terms'], 'crease', 'ice hockey', { fam: 3 }, 'the area in front of the goal (the cricket crease is a line)', 'cricket');
split(42895, 'ruck', ['aussie_rules_terms'], 'ruck', 'Australian rules', { fam: 4 }, 'the AFL ruck contest (the rugby ruck is another play)', 'rugby');
split(42906, 'flanker', ['aussie_rules_terms'], 'flanker', 'Australian rules', { fam: 4 }, 'an AFL half-back or half-forward flank player (the rugby flanker is a forward)', 'rugby');
split(24974, 'back pocket', ['aussie_rules_terms'], 'back pocket', 'Australian rules', { fam: 4 }, 'the AFL defensive position (24974 is the pocket of trousers)', 'trousers');
split(33657, 'stalking', ['hunting_words'], 'stalking', 'hunting', { fam: 2 }, 'creeping up on game (33657 is the crime)');
split(61680, 'bento box', ['triathlon_words', 'kit_and_equipment'], 'bento box', 'bike bag', { fam: 5 }, 'the small bag on a triathlon bike\'s top tube (61680 is the lunch box)', 'lunch box');
split(13469, 'David Copperfield', ['famous_magicians'], 'David Copperfield', 'magician', { type: 'person', fam: 2 }, 'the American magician (13469 is the Dickens novel)', 'novel');
split(45647, 'nerf', ['toys'], 'Nerf', 'toy brand', { type: 'org', tm: true, fam: 2 }, 'the foam toy blaster brand (45647 is the gaming verb nerf)', 'game balance');
{ const cd = chk(3609, 'cool-down'), al = P.entries.find(a => a.id === 44000); // gaming cooldown: a different sense (an ability's recharge time)
  if (cd.typ.gaming_words !== undefined) { const g = newEntry('cooldown', 'game ability', { pos: 'noun', type: 'common', fam: 3 }, 'the recharge time of an ability in a game (cool-down is the exercise)'); swap('gaming_words', cd, g, 'the gaming sense'); } }
out('sports_balls', [[5190, 'soccer']], 'the sport; soccer ball (shown "soccer") is the ball (same-display)');
for (const [gone, show] of [[42653, 'water polo'], [42659, 'polo']]) { const b = ix.entry.get(gone); if (!b) continue;
  for (const t of ['ball_sports', 'team_ball_sports']) swap(t, b, chk(gone === 42653 ? 5202 : 5203, show), `the sport ${show}, not its ball (the ball stays in sports balls)`); }
out('american_football_terms', [[39536, 'pylon']], 'pylon [tower] is the electricity pylon, not the end-zone marker');
out('bowling_terms', [[23247, 'gutter']], 'gutter [drain] is the roof gutter; gutter ball is the bowling word');
out('mahjong_words', [[28757, 'pair']], 'pair [couple] is a couple of people, not the mahjong pair');
out('cheerleading_words', [[39584, 'tick-tock']], 'tick-tock is the clock sound, not the cheer stunt');
out('word_games', [[27755, 'balderdash']], 'balderdash [nonsense] is the word for nonsense; the game Balderdash is a brand');
out('swimming_strokes', [[5323, 'sculling']], 'sculling 5323 is the rowing sport (in water sports); the swimmer\'s sculling is a hand movement, not a stroke');
for (const [id, text, typ] of [[43251, 'treading water', 4], [43255, 'dolphin kick', 4], [43256, 'flutter kick', 4], [43257, 'frog kick', 4], [43259, 'scissor kick', 4], [43258, 'whip kick', 4],
  [43267, 'streamline', 5], [43263, 'bilateral breathing', 5], [43264, 'catch-up', 5], [43266, 'human torpedo', 5]]) {
  const e = chk(id, text); if (e.typ.swimming_strokes === undefined) continue;
  linkE(e, 'swimming_words', typ, 'from swimming strokes: a swimming word'); unlinkE(e, 'swimming_strokes', 'a kick, drill or body position, not a stroke (moved to swimming words)'); }
{ const t = ix.entry.get(65907); if (t) { swap('toys', chk(65907, 'soldier'), chk(5949, 'toy soldier'), 'the full term shown short', { show: 'soldier', outWhy: 'a bare stub: toy soldier takes the link' }); delE(65907, 'soldier', 'a bare stub of toy soldier made for toys (LIBRARY-RULES 5); in no theme (contract-type-common)'); } }
{ const t = ix.entry.get(65908); if (t) { swap('toys', chk(65908, 'wind-up'), chk(5989, 'wind-up toy'), 'the full term shown short', { show: 'wind-up', outWhy: 'a bare stub: wind-up toy takes the link' }); delE(65908, 'wind-up', 'a bare stub of wind-up toy made for toys; in no theme'); } }
{ const t = ix.entry.get(62841); if (t) { swap('building_toys', chk(62841, 'blocks'), chk(5923, 'building blocks'), 'the full term shown short', { show: 'blocks', outWhy: 'a bare stub: building blocks takes the link' }); delE(62841, 'blocks', 'a bare stub of building blocks made for building toys; in no theme (contract-type-common)'); } }

// =================================================================================================
sec('6. Belonging');
out('ice_hockey_terms', [[5349, 'ice hockey']], 'the topic word itself (LIBRARY-RULES 5)');
out('curling_words', [[5350, 'curling']], 'the topic word itself');
out('table_tennis_terms', [[5245, 'ping pong']], 'the topic word itself (another name of table tennis)');
out('sumo_words', [[5409, 'sumo']], 'the topic word itself');
out('video_games', [[5825, 'video game']], 'the topic word itself');
out('logic_puzzles', [[58921, 'logic puzzle']], 'the topic word itself');
out('racket_sports', [[5198, 'cricket'], [5201, 'lacrosse'], [5205, 'rounders']], 'played with a bat or stick, not a racket');
out('sports_with_a_net', [[5198, 'cricket'], [5243, 'squash'], [42972, 'footgolf'], [42969, 'kin-ball']], 'played without a net');
linkE(chk(5349, 'ice hockey'), 'sports_played_with_sticks', 1, 'the stick sport most people name first');
for (const [id, text, typ] of [[5334, 'underwater hockey', 4], [5377, 'broomball', 4], [5233, 'stickball', 4]]) linkE(chk(id, text), 'sports_played_with_sticks', typ, 'played with a stick (the theme shared 8 of its 10 words with team ball sports and sports with a net: theme-twin)');
M(29328, 'arcade', 45691, 'arcade', 'synonym', 1, 'arcade [games] is the same amusement arcade as arcade [game room] (sense-twin)');
out('racket_and_target_sports', [[5276, 'Putt-Putt']], 'a brand of mini golf, beside mini golf (overlap); the entry stands for the engine sound in machine sounds');
out('cricket_fielding_positions', [[42847, 'bowler']], 'a role, not a fielding position (in cricket roles)');
out('field_events', [[3619, 'personal best'], [43958, 'decathlon'], [43959, 'heptathlon']], 'not a field event (a result, or a combined event)');
linkE(chk(43933, 'shot put'), 'field_events', 1, 'one of the four throwing events, linked only as its implement shot');
out('sports_equipment', [[43935, 'discus throw'], [43937, 'javelin throw'], [20685, 'helmet']], 'an event, not equipment; or helmet [armor], the knight\'s helmet (football helmet is there)');
out('protective_gear', [[20685, 'helmet']], 'helmet [armor] is a knight\'s helmet; football and batting helmets are the sports gear');
out('olympic_sports', [[15963, 'weight training'], [44072, 'tug of war']], 'not an Olympic sport (tug of war last in 1920)');
out('wrestling_terms', [[4896, 'tank top']], 'a vest, not the wrestler\'s one-piece singlet');
out('famous_sporting_events', [[58911, 'Flushing Meadows']], 'a venue, not an event');
for (const t of ['famous_sporting_events', 'multi_sport_events']) out(t, [[44331, 'Gold Coast Games']], 'not a name of any event (the 2018 Commonwealth Games were held on the Gold Coast)');
delE(44331, 'Gold Coast Games', 'not a real name; in no theme');
out('famous_stadiums', [[44428, 'Yoyogi']], 'a district of Tokyo, not a stadium');
out('trophies_and_prizes', [[4408, 'medal']], 'the general word beside its kinds (gold, silver, bronze medal)');
out('prizes_you_can_wear', [[4408, 'medal']], 'the general word beside its kinds');
out('equestrian_events', [[50016, 'hacking'], [44907, 'pony club'], [44064, 'modern pentathlon']], 'not an equestrian event (a ride, a club, a five-sport event)');
out('bullfighting_words', [[35500, 'crowd'], [44976, 'spectacle']], 'a general word, better in other themes');
out('casino_games', [[5555, 'horse racing']], 'not a casino game');
out('asian_board_games', [[5768, 'Chinese checkers'], [5728, 'Ludo']], 'not Asian (Chinese checkers is German, Ludo English)');
out('table_games', [[5751, 'Twister']], 'played on a floor mat, not a table (in party games)');
out('board_games', [[7006, 'Dungeons & Dragons']], 'a role-playing game, not a board game');
out('dice_games', [[45495, 'snake eyes'], [45496, 'boxcars']], 'a dice roll, not a game');
out('famous_chess_players', [[58866, 'Beth Harmon']], 'a fictional character (The Queen\'s Gambit), not a chess player');
out('building_toys', [[5783, 'Minecraft']], 'a video game, not a building toy');
out('sports_clothing', [[4966, 'Alice band']], 'a hair accessory, not sports clothing (grouped with headband)');
leaveGroup('skating_words', 43569, 'quad [skating] is the quadruple jump (figure skating moves), not quad skates');
leaveGroup('south_american_soccer_clubs', 46449, 'Nacional (Uruguay) and Atlético Nacional (Colombia) are different clubs');
{ const g = (T('south_asian_games').groups || []).find(x => x.includes(46331) && x.includes(46323)); if (g) { leaveGroup('south_asian_games', 46323, 'gilli danda is the stick game, not marbles'); leaveGroup('south_asian_games', 46324, 'danda goli is the stick game, not marbles'); addToGroup('south_asian_games', [46323, 46324], 'one stick game, two names'); } }
addToGroup('darts_terms', [50376, 40210], 'bull and bullseye are one answer in darts');
addToGroup('sports_clothing', [59421, 43868], 'judogi is the judo gi (gi and karate gi were grouped)');
{ const b = chk(58913, 'backstop'); for (const t of ['baseball_terms']) leaveGroup(t, 58913, 'backstop here is the fence behind home plate, not the catcher'); out('baseball_positions', [[58913, 'backstop']], 'the fence behind home plate (ballpark parts), a catcher only in slang'); }

// =================================================================================================
sec('7. Case, spelling, type, flags, ratings, alias kinds');
for (const [id, from, to, plain] of [[43793, 'epee', 'épée', 'epee'], [43119, 'masse', 'massé', 'masse'], [5216, 'petanque', 'pétanque', 'petanque'], [5851, 'macrame', 'macramé', 'macrame']]) {
  const e = E(id); if (e.text === from) { retext(id, from, to, 'Merriam-Webster prints the accent (LIBRARY-RULES 5, rule 8)'); newAlias(id, plain, e.gloss || '', 'spelling', e.fam, [], 'the plain form (rule 8)'); } }
retext(45559, 'i spy', 'I spy', 'the pronoun I is always a capital (Simon, 2026-11-23: change it, keep type common; case-lint keys 45559|word_games and 45559|road_trip_games in js/caselint-allow.js)');
retext(43011, 'hawk-eye', 'Hawk-Eye', 'a trademark in its brand sense: capital (rule 4)', { type: 'proper' });
for (const [id, text] of [[5863, 'philately'], [5865, 'numismatics'], [65894, 'coins'], [65896, 'stamps'], [62821, 'climbing'], [5219, 'lawn bowls']]) setE(chk(id, text), 'type', 'common', 'a word, not an idiom (type phrase is for idioms; contract-type-common)');
setE(chk(50033, 'interception'), 'fam', 3, 'many adults know the football interception');
setE(chk(50377, 'duck'), 'fam', 3, 'the cricket score of nothing is known to cricket followers, not every child (it had the animal\'s familiarity)');
setE(chk(10984, 'backspin'), 'fam', 3, 'many adults know backspin');
setE(chk(5895, 'home brewing'), 'adult', false, 'alcohol is sensitive, not adult (LIBRARY-RULES 4)'); setE(E(5895), 'sensitive', true, 'alcohol is sensitive');
setE(chk(50017, 'grog'), 'sensitive', false, 'grog [clay] is crushed fired clay, not the drink');
setE(chk(39776, 'autogyro'), 'fam', 4, 'known to people interested in flying (it is the first synonym of gyrocopter, shown at some levels)');
setE(chk(58829, 'Caro-Kann Defense'), 'aliasKind', 'synonym', 'the full name, not a spelling (alias-kind-suspect)');
setE(chk(5301, 'water skiing'), 'type', 'common', 'a spelling of waterskiing, typed like it (alias-kind-suspect)');
delAlias(64938, 'centre snap', 'not a word in use (the snap is called the snap in the UK too); as a UK spelling it would have shown in place of snap');
setE(chk(5966, 'water gun'), 'aliasKind', 'synonym', 'squirt gun is the US word itself: water gun is another name, not its US display alias');
setUse(chk(2780, 'yacht'), 'water_sports', 5322, 'the sport is yachting');
setUse(chk(20904, 'joust'), 'horse_and_animal_sports', 5585, 'the sport is jousting (alias-fullname)');
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');


// =================================================================================================
sec("9. Reviewer's fixes (2026-11-23)");
unlinkE(E(5662), 'australian_slang', 'slot machine took the link of its new alias pokies; the locked theme must show the Australian word, which slot machine is not (reviewer)');
rate(chk(5350, 'curling'), 'olympic_snow_sports', 2, 'a well-known Winter Olympic sport (reviewer)');
out('horse_riding_words', [[153, 'horse']], 'the topic word itself (reviewer)');
M(42993, 'net', 42937, 'net', 'synonym', 1, 'the volleyball net is the same net (Simon v433: net is merged where the meaning is the same; reviewer)');
M(43001, 'rally', 42938, 'rally', 'synonym', 2, 'the volleyball rally is the same exchange (Simon v433; reviewer)');
setE(chk(43001, 'rally'), 'gloss', 'exchange of shots', 'now the rally of tennis, table tennis and volleyball (rally [sports] 44280 is the verb)');
M(42985, 'serve', 42932, 'serve', 'synonym', 1, 'the volleyball serve is the same serve (reviewer)');
M(42985, 'serve', 43075, 'serve', 'synonym', 1, 'the table tennis serve is the same serve (reviewer)');
setE(chk(42985, 'serve'), 'gloss', 'sports', 'now the serve of tennis, table tennis and volleyball');
M(46199, 'cross-country', 43923, 'cross country', 'spelling', 2, 'one sense written two ways (Merriam-Webster: cross-country; reviewer)');
for (const [id, a, b] of [[43922, '60 metres', '60 meters'], [61666, '150 metres', '150 meters'], [61665, '300 metres', '300 meters'], [61664, '1000 metres', '1000 meters'], [43928, '3000 metres', '3000 meters']]) {
  const e = E(id); if (e.text === a) { retext(id, a, b, 'US spelling for the root, as 100 meters (reviewer)'); newAlias(id, a, '', 'spelling', e.fam, ['UK'], 'the UK spelling, as 100 metres'); } }
addToGroup('afl_clubs', [46404, 46428], 'Footscray is the Western Bulldogs\' old name (one club; an alias of familiarity 5 would be shown as the first synonym)');
addToGroup('afl_clubs', [46408, 46427], 'South Melbourne is the Sydney Swans\' old name (one club)');
addToGroup('famous_stadiums', [44424, 61756], 'Lansdowne Road is the old ground on the Aviva Stadium site (one answer)');
addToGroup('rugby_grounds', [44424, 61756], 'Lansdowne Road is the old ground on the Aviva Stadium site (one answer)');
out('soccer_terms', [[42688, 'dugout']], 'dugout [baseball]: the baseball sense, at typicality 5 (reviewer)');
setE(chk(45458, 'bullet'), 'fam', 3, 'bullet chess (one-minute games) is known to chess players, not every child (reviewer)');
{ // sailing sports: by its name, sailing as a sport (races, regattas, classes, racing tactics); the general sailing terms are in sailing words
  out('sailing_sports', [[5296, 'sailing'], [21169, 'windward'], [21172, 'jib'], [31252, 'leeward'], [43465, 'spinnaker'], [43466, 'mainsail'], [43474, 'running'], [43476, 'capsize'], [47443, 'boom'], [47460, 'jibe'], [2800, 'rudder']],
    'a general sailing word (sail, boat part, point of sail), in sailing words; sailing sports keeps the races, regattas, classes and racing moves (reviewer); sailing is the topic word');
  const cb = chk(43479, 'centerboard'); if (cb.typ.sailing_sports !== undefined) { linkE(cb, 'sailing_words', 4, 'a part of a sailing dinghy, from sailing sports'); unlinkE(cb, 'sailing_sports', 'a boat part, moved to sailing words'); }
  setUse(chk(2780, 'yacht'), 'sailing_sports', 5322, 'the sport is yachting');
  setT('sailing_sports', 'note', 'sailing as a sport: races, regattas, boat classes and racing moves (the general sailing words are in sailing words)', 'says what the theme holds (reviewer)'); }
{ const a = ix.entry.get(44265), b = ix.entry.get(43182); if (a && b && a.aliasOf === 43176 && b.aliasOf === 43176 && P.entries.indexOf(a) > P.entries.indexOf(b)) {
  P.entries = P.entries.filter(x => x !== a); P.entries.splice(P.entries.indexOf(b), 0, a); reindex(P); n++; A.push('one-eighty 44265 moves before ton-eighty 43182 in row order: the first synonym of 180 is the plain written-out form (flag 512; reviewer)'); } }

// =================================================================================================
sec('10. Simon (2026-11-23, "Yes, do it that way"): lumber the root, timber its UK alias; two region-root-equiv hits from rounds 1-2');
mergeInto(24038, 'lumber', 24037, 'timber', 'regional', 2, 'Simon: lumber [US timber] stays the root (LIBRARY-RULES 5: the root is the US or neutral word) and timber becomes its UK regional alias; they were grouped as one answer in things made from trees, forestry words and building materials; UK players see timber', { region: ['UK'] });
setE(chk(24038, 'lumber'), 'region', [], 'the root of a regional pair: untagged, as color is (v413); timber is its UK alias (region-root-equiv)');
setE(E(24038), 'gloss', 'sawn wood', 'lumber [move heavily] 68165 is the other sense; "US timber" no longer fits the root of both words');
setShow(E(24038), 'hidden_names', 'timber', 'hidden names tests the shown text: timber hides TIM (timber had the link, at typicality 2); one family has one member there, so lumber\'s own link gives way to the word that hides the name');
const bh = chk(48402, 'beach hut');
if (bh.region?.length) setE(bh, 'region', [], 'known to UK and US adults alike (familiarity 2): not a regional word; not made cabana\'s alias, because an alias is checked like a root and "beach hut" would repeat "beach" in beach vacation and beach themes (theme-name); it stays grouped with cabana as one answer in vacation homes (region-root-equiv)');
if (ix.theme.has('hiking_gear')) leaveGroup('hiking_gear', 48640, 'a blister plaster (a hydrocolloid dressing) and moleskin (felt padding cut to size) are different products, not one answer (region-root-equiv)');

// =================================================================================================
sec('8. First synonym alias (game flag 512): no harder than the root + 1');
{ const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  let all = 0, bad = 0;
  for (const [rid, list] of syn) { const r = ix.entry.get(rid); if (!linkIds(P, r).some(t => inGroup(t))) continue; all++;
    if (list[0].fam > r.fam + 1) { bad++; A.push(`  STILL TOO HARD: ${lab(r)} f${r.fam}: first synonym ${lab(list[0])} f${list[0].fam}`); } }
  A.push(`  roots linked in the group with synonym aliases: ${all}; first synonym harder than root + 1: ${bad} (before: gyrocopter/autogyro, fixed above; hookah/narghile is v440's; the merges of this batch chose kinds or deletions so none is added)`); }
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
const summary = [`Library batch v442: tidy-up step 3, Sports & Games (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch442-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch442-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch442-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

// Library batch v444: tidy-up step 3 (TIDY-UP.md), the History & Myth group: every theme under history_myth read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v439. Applied after v440 (People & Society), v441 (Home & Everyday), v442 (Sports & Games) and v443 (Arts & Entertainment):
// everything here works by entry id + text and theme id, never by position, and every step is skipped when it is already done (rerun: 0 changes).
// A merge another batch has already made is skipped.
//   1. Tree and twins: Greek myth creatures merged into Greek monsters (renamed Greek myth creatures, moved under mythical creatures); famous voyages
//      deleted (a twin of exploration ships); gold rush words moved from Nature & Earth beside the Wild West; royal houses untagged.
//   2-4. About 120 second roots of one sense merged: surnames beside full names (Columbus, Magellan, Lincoln ... shown as before), Sir Lancelot,
//      Templar, Hospitaller, Garter, Thor, Tang, Shang, the Stone Ages, Victorian age, yeti / Abominable Snowman, Odin's other names ...
//   5. Regional roots: Murugan, casket. 6. Wrong senses (axe, Caernarfon, armor, pantheon, sphinx, Puck, sprite, harmony, Odyssey, Pericles,
//      Julius Caesar, Barnet, the empires' language entries); dragon egg its own root. 7. Belonging. 8. Case, types, ratings, alias kinds.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch444.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const GROUP = 'history_myth';
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
const M = (k, kt, g, gt, kind, fam, why, o) => mergeInto(k, kt, g, gt, kind, fam, why, o);
const SYN = 'the same person or thing under another name (two roots of one sense, LIBRARY-RULES 5)';

// =================================================================================================
sec('1. Twins and the tree');
{ // Greek myth creatures (12 words) twins Greek monsters (10 of its 12 words there): one theme, under mythical creatures, with the more popular name
  if (ix.theme.has('greek_myth_creatures')) {
    linkE(chk(6941, 'Pegasus'), 'greek_monsters', 1, 'from Greek myth creatures (merged here): the winged horse of Greek myth');
    linkE(chk(6923, 'satyr'), 'greek_monsters', 3, 'from Greek myth creatures (merged here)');
  }
  dropTheme('greek_myth_creatures', 'a twin of Greek monsters (theme-twin: 10 of its 12 words there); Pegasus and satyr move there and the theme takes its name');
  rename('greek_monsters', 'Greek myth creatures', 'it now holds Pegasus and satyr too (not monsters); the name of the twin it absorbs, pop 2 as that theme had');
  setT('greek_monsters', 'pop', 2, 'a popular theme (as Greek myth creatures was rated)');
  moveT('greek_monsters', 'giants_of_legend', 'after', 'creatures, beside the other kinds of mythical creature (where Greek myth creatures stood), not under Greek gods');
}
{ // famous voyages (29 words) twins exploration ships (Travel & Transport: 15 of its 16 words); its other words are famous ships, not voyages
  if (ix.theme.has('famous_voyages')) {
    for (const [id, text, typ] of [[21087, 'Victoria', 4], [21094, 'Trinidad', 5], [21093, 'Ra II', 4]])
      linkE(chk(id, text), 'exploration_ships', typ, 'from famous voyages (deleted): an exploration ship (Magellan\'s Victoria and Trinidad, Heyerdahl\'s Ra II), its only theme');
    linkE(chk(21097, "Hokule'a"), 'polynesian_voyaging', 3, 'from famous voyages (deleted): the voyaging canoe that revived Polynesian wayfinding');
    unlinkE(chk(2925, 'odyssey'), 'famous_voyages', 'the common noun (a long journey), not a voyage');
  }
  dropTheme('famous_voyages', 'a twin of exploration ships (theme-twin, TIDY-UP.md known item: 15 of the 16 exploration ships are here); every other word is a famous ship (in famous ships) or a person, not a voyage');
}
moveT('gold_rush_words', 'wild_west', 'after', 'a history topic (forty-niner, Klondike, Sutter\'s Mill, boomtown, claim jumper), not rocks and minerals: beside the Wild West (v436 cross-group move, TIDY-UP.md)');
setT('royal_houses', 'region', [], 'a mixed theme (Habsburg, Bourbon, Romanov, Medici, Bernadotte beside Tudor and Windsor): not UK knowledge only (LIBRARY-RULES 4, region)');
out('ages_of_history', [[62068, 'Age of Aquarius']], 'an astrological age, not an age of history');

// =================================================================================================
sec('2. Two roots of one person');
M(6875, 'Tutankhamun', 6876, 'King Tut', 'synonym', 2, 'his popular name (grouped as one answer in four themes)');
M(53910, 'Khufu', 53911, 'Cheops', 'synonym', 4, 'the Greek name of Khufu (grouped)');
M(53912, 'Khafre', 53913, 'Chephren', 'synonym', 5, 'the Greek name of Khafre (grouped)');
M(6716, 'Christopher Columbus', 21003, 'Columbus', 'synonym', 1, 'his surname as a second root (explorers), as Karpov is an alias of Anatoly Karpov');
M(6717, 'Ferdinand Magellan', 21004, 'Magellan', 'synonym', 2, 'his surname as a second root (explorers)');
M(6723, 'Roald Amundsen', 21005, 'Amundsen', 'synonym', 3, 'his surname as a second root (explorers, polar exploration)');
M(6724, 'Ernest Shackleton', 21006, 'Shackleton', 'synonym', 3, 'his surname as a second root (explorers, polar exploration)');
M(54174, 'Henry Morton Stanley', 21012, 'Henry Stanley', 'synonym', 4, 'the same explorer (explorers)', { del: 'the surname Stanley is his first synonym (LIBRARY-RULES 5, people names); Henry Stanley would come first in row order (reviewer)' });
M(54174, 'Henry Morton Stanley', 54175, 'Stanley', 'synonym', 3, 'his surname as a second root (grouped in explorers of Africa)');
delAlias(67557, 'Cortes', 'the plain form of Cortés, which becomes an alias of Hernán Cortés (that root has its own plain form Hernan Cortes)');
M(21007, 'Hernán Cortés', 20412, 'Cortés', 'synonym', 3, 'his surname as a second root (Aztecs and Maya, conquistadors)');
leaveGroup('conquistadors', 54123, 'Gonzalo Pizarro is Francisco Pizarro\'s brother, another man, not the same answer');
M(21008, 'Francisco Pizarro', 20437, 'Pizarro', 'synonym', 3, 'his surname as a second root (Inca empire, conquistadors)');
M(21014, 'Hernando de Soto', 54106, 'de Soto', 'synonym', 3, 'his surname as a second root (conquistadors)');
M(54124, 'Vasco Núñez de Balboa', 67412, 'Balboa', 'synonym', 4, 'his surname as a second root (grouped in conquistadors)');
M(54128, 'Henry the Navigator', 54129, 'Prince Henry', 'synonym', 4, 'the same prince (grouped)');
M(21192, 'Francis Drake', 21010, 'Sir Francis Drake', 'synonym', 3, 'the same man with his title (explorers; famous pirates has Francis Drake)');
M(6779, 'Henry Morgan', 50176, 'Captain Morgan', 'synonym', 3, 'the pirate\'s other name (grouped in famous pirates)');
{ const a = ix.entry.get(50176); if (a && a.aliasOf === 6779) setE(a, 'tm', false, 'the pirate, not the rum brand: no trademark'); }
M(54218, 'Robert Falcon Scott', 21043, 'Captain Scott', 'synonym', 3, 'the same explorer (polar exploration)');
M(54244, 'James Cook', 6720, 'Captain Cook', 'synonym', 2, 'the same man (exploration, explorers, Australian explorers; Antarctic explorers has James Cook)');
M(54486, 'Shaka Zulu', 54487, 'Shaka', 'synonym', 3, 'the same king (grouped)');
M(54491, 'Sundiata Keita', 22590, 'Sundiata', 'synonym', 4, 'the same king of Mali (African folklore has Sundiata)');
M(54512, 'Simón Bolívar', 54513, 'El Libertador', 'translation', 4, 'his Spanish title, "the Liberator" (grouped)');
delAlias(67762, 'Jose Gervasio Artigas', 'the plain form of José Gervasio Artigas, which becomes an alias of José Artigas (that root has its own plain form)');
M(54522, 'José Artigas', 54535, 'José Gervasio Artigas', 'synonym', 5, 'his full name (grouped)');
M(21520, 'Queen Victoria', 54563, 'Victoria', 'synonym', 1, 'the same queen (English monarchs shows "Victoria", as famous queens does)', { keepShow: true });
M(20659, 'Boudicca', 54629, 'Boudica', 'spelling', 3, 'one queen\'s name written two ways (Celts, famous women in history; famous queens); Boadicea moves with it');
M(21686, 'Mary Queen of Scots', 62874, 'Mary Stuart', 'synonym', 3, 'the same queen (famous queens)');
M(21681, 'Empress Cixi', 54639, 'Cixi', 'synonym', 5, 'the same empress dowager (famous queens)', { gloss: '' });
M(54663, 'Hongwu', 54677, 'Zhu Yuanzhang', 'synonym', 5, 'the Hongwu Emperor\'s personal name (grouped)');
M(54665, 'Liu Bang', 54681, 'Han Gaozu', 'synonym', 5, 'Liu Bang\'s temple name (grouped)');
M(22135, 'Yellow Emperor', 62877, 'Huangdi', 'translation', 4, 'the Chinese name of the Yellow Emperor (Chinese emperors)');
for (const [k, kt, g, gt, fam] of [[21515, 'Abraham Lincoln', 21563, 'Lincoln', 1], [21404, 'George Washington', 21564, 'Washington', 1], [54538, 'Thomas Jefferson', 21565, 'Jefferson', 2],
  [54540, 'James Madison', 21585, 'Madison', 3], [21405, 'Ulysses Grant', 21581, 'Grant', 3], [42195, 'Barack Obama', 21568, 'Obama', 1], [42198, 'Jimmy Carter', 21575, 'Carter', 2], [42200, 'Woodrow Wilson', 21580, 'Wilson', 3]])
  M(k, kt, g, gt, 'synonym', fam, 'the president\'s surname as a second root: US presidents shows the surname (show), as before', { keepShow: true });
M(21641, 'Mahatma Gandhi', 21518, 'Gandhi', 'synonym', 1, 'the same man (famous leaders)');
leaveGroup('reformers', 21633, 'Martin Luther (the 16th-century reformer) and Martin Luther King are two men, not one answer');
M(21607, 'Johannes Gutenberg', 22946, 'Gutenberg', 'synonym', 3, 'his surname as a second root (Renaissance)');
M(41945, 'Copernicus', 22955, 'Copernicus', 'synonym', 3, 'Copernicus [Renaissance] is the same astronomer');
M(41930, 'Galileo', 41929, 'Galileo Galilei', 'synonym', 2, 'his full name as a second root (grouped); Galileo is known by one name, so it stays the root (LIBRARY-RULES 5, the exception; reviewer; as v445)');
M(22980, 'Ebenezer Scrooge', 25028, 'Scrooge', 'synonym', 2, 'the same character (Christmas shows "Scrooge")', { keepShow: true });
M(55189, 'Judge Roy Bean', 62094, 'Roy Bean', 'synonym', 4, 'the same man (Wild West, lawmen of the West)');
M(54570, 'George III', 55152, 'King George III', 'synonym', 3, 'the same king (American Revolution)');
M(20689, 'Lancelot', 22513, 'Sir Lancelot', 'synonym', 2, 'the same knight with his title (legendary heroes)');
M(20699, 'Gawain', 22527, 'Sir Gawain', 'synonym', 3, 'the same knight with his title (legendary heroes)');
M(55068, 'Gareth', 54094, 'Sir Gareth', 'synonym', 5, 'the same knight with his title (famous knights)');
M(55059, 'Kay', 54088, 'Sir Kay', 'synonym', 4, 'the same knight with his title (famous knights)');
M(55067, 'Lamorak', 54096, 'Sir Lamorak', 'synonym', 5, 'the same knight with his title (famous knights)');
M(55057, 'Uther Pendragon', 55070, 'Pendragon', 'synonym', 3, 'Uther\'s surname (grouped in Arthurian legend; it was typed title)', { gloss: '' });
M(20924, 'Richard the Lionheart', 55083, 'King Richard', 'synonym', 2, 'the same king (Robin Hood legend shows "King Richard")', { keepShow: true, del: 'Richard III is just as much King Richard: not an alias (reviewer)' });
M(22688, 'Nasreddin', 22687, 'Hodja', 'synonym', 4, 'Nasreddin Hodja, one man (grouped)');
M(21970, 'Rama', 22521, 'Rama', 'synonym', 4, 'Rama [hero] is the same Rama, the hero of the Ramayana (legendary heroes)');
M(6950, 'Hercules', 22519, 'Heracles', 'translation', 3, 'the Greek form of the Latin Hercules (grouped)');
M(6952, 'Odysseus', 22529, 'Ulysses', 'translation', 2, 'the Latin name of Odysseus (grouped)');
M(22514, 'Siegfried', 22518, 'Sigurd', 'translation', 5, 'the Norse name of Siegfried (grouped)');
M(6882, 'Lucy', 21098, 'Lucy', 'synonym', 4, 'Lucy [fossil] is the same skeleton (discoveries, fossils)');
setE(chk(6882, 'Lucy'), 'type', 'proper', 'a fossil skeleton\'s name (proper), as Ötzi; not a person');

// =================================================================================================
sec('3. Two roots of one thing, place or period');
M(6647, 'hieroglyphs', 6648, 'hieroglyphics', 'synonym', 2, 'the same writing (grouped in four themes; v403: not a form)');
M(20695, 'Knights Templar', 20694, 'Templar', 'synonym', 3, 'the same order (Crusades; knights shows "Templar")');
M(54052, 'Knights Hospitaller', 20696, 'Hospitaller', 'synonym', 4, 'the same order (Crusades)', { del: 'Knights Hospitaller has the alias Hospitallers already' });
M(20697, 'Teutonic Knights', 64518, 'Teutonic Order', 'synonym', 4, 'the same order (knights)', { del: 'as an alias its text would repeat order in orders of knighthood (theme-name)' });
M(20707, 'Order of the Garter', 62870, 'Garter', 'synonym', 4, 'the same order (orders of knighthood shows "Garter")', { keepShow: true });
setE(chk(20707, 'Order of the Garter'), 'fam', 4, 'known to people interested in royalty and honours, as the other orders (it was 5)');
M(6948, 'Thor', 20586, 'Thor', 'synonym', 1, 'Thor [Norse god] is the same god (Vikings)');
setE(chk(6948, 'Thor'), 'type', 'proper', 'a deity is proper (LIBRARY-RULES 4, type), as Odin and Loki');
setE(E(6948), 'tm', false, 'the Norse god, not the Marvel character (Thor [Marvel] 52813)');
M(41271, 'North Star', 41270, 'Polaris', 'synonym', 2, 'the same star (grouped)');
M(21029, 'lead line', 21033, 'sounding line', 'synonym', 5, 'the same line (grouped)');
M(21125, 'Moluccas', 21126, 'Maluku', 'translation', 5, 'the Indonesian name of the Moluccas (grouped)');
leaveGroup('pirate_crew', 21279, 'a boatswain\'s mate is the boatswain\'s assistant, another rank');
M(6805, 'yo-ho-ho', 21176, 'yo ho ho', 'spelling', 2, 'one cry written two ways (pirate talk)');
delAlias(67749, 'Faberge eggs', 'the plain form of Fabergé eggs, which becomes a form of Fabergé egg (that root has its own plain form)');
M(21221, 'Fabergé egg', 54315, 'Fabergé eggs', 'form', 4, 'the plural of the same thing (lost treasures shows it)');
{ const f = P.entries.find(a => a.id === 54315); if (f && f.aliasOf === 21221) setUse(E(21221), 'lost_treasures', 54315, 'the lost Fabergé eggs'); }
M(20703, 'chain mail', 21343, 'chainmail', 'spelling', 2, 'one word written two ways (Merriam-Webster: chain mail)');
M(21437, 'Soviet Union', 21438, 'USSR', 'abbreviation', 2, 'the short form (grouped in Cold War)');
M(22888, 'Russian Empire', 66018, 'Tsarist Russia', 'synonym', 3, 'the same empire (grouped)');
M(7103, 'Tang dynasty', 20461, 'Tang', 'synonym', 4, 'the same dynasty (ancient China)', { del: 'the bare name; Tang dynasty shows "Tang" where the theme needs it' });
M(21808, 'Shang dynasty', 20467, 'Shang', 'synonym', 4, 'the same dynasty (ancient China)', { del: 'the bare name; Shang dynasty shows "Shang" where the theme needs it' });
M(7056, 'Victorian era', 7057, 'Victorian age', 'synonym', 3, 'the same period (grouped)');
M(7074, 'prehistory', 7075, 'prehistoric times', 'synonym', 2, 'the same time (grouped)');
M(22832, 'Copper Age', 22831, 'Chalcolithic', 'synonym', 5, 'the same age (grouped)');
M(7062, 'Regency', 22837, 'Regency Era', 'synonym', 4, 'the same period (ages of history)');
delAlias(67533, 'Ancien Regime', 'the plain form of Ancien Régime; ancien régime [system] has its own plain form');
M(55127, 'ancien régime', 7104, 'Ancien Régime', 'spelling', 4, 'the same order of things (historical periods)', { del: 'a capitalized second root: Oxford and Merriam-Webster print ancien régime lowercase (rule 1)' });
M(55127, 'ancien régime', 55128, 'old regime', 'synonym', 3, 'its English name (grouped in French Revolution)');
M(55116, 'La Marseillaise', 55117, 'Marseillaise', 'synonym', 3, 'the same anthem (grouped)');
M(21390, 'minuteman', 55135, 'minutemen', 'form', 3, 'the plural of the same word (American Revolution shows it)');
{ const f = P.entries.find(a => a.id === 55135); if (f && f.aliasOf === 21390) setUse(E(21390), 'american_revolution', 55135, 'the minutemen of 1775'); }
M(22856, 'Habsburg', 55175, 'Hapsburg', 'spelling', 3, 'one name written two ways (grouped in royal houses)', { gloss: '' });
M(22858, 'Romanov', 55176, 'Romanoff', 'spelling', 4, 'one name written two ways (grouped)', { gloss: '' });
M(22850, 'Stuart', 55174, 'Stewart', 'spelling', 3, 'the Scottish spelling of the same royal house (grouped)', { gloss: 'royal house' });
M(31953, 'Pamukkale', 60563, 'Cotton Castle', 'translation', 4, 'the English meaning of Pamukkale (grouped)');
M(54761, "Mada'in Salih", 54762, 'Hegra', 'synonym', 5, 'the same site (grouped)');
M(54790, 'Bagan', 54805, 'Pagan', 'synonym', 4, 'the old name of Bagan (grouped)');
M(6623, 'Troy', 54882, 'Ilium', 'translation', 4, 'the Latin name of Troy (grouped in Trojan War)', { gloss: '' });
M(22301, 'Mount Olympus', 6918, 'Olympus', 'synonym', 2, 'the same mountain (mythology)');
M(6866, 'carbon dating', 6865, 'radiocarbon dating', 'synonym', 3, 'the same method (grouped)');
M(6871, 'barrow', 6872, 'tumulus', 'synonym', 5, 'the same burial mound (grouped)');
M(20737, 'cooper', 47639, 'cooper', 'synonym', 3, 'cooper [ship] is the same barrel maker (ship crew; sense-link)');
M(22387, 'invisibility cloak', 22386, 'cloak of invisibility', 'synonym', 2, 'the same cloak (grouped)');
M(22996, 'lasso', 55213, 'lariat rope', 'synonym', 3, 'the same rope (grouped)');
M(22752, 'Babe the Blue Ox', 22771, 'blue ox', 'synonym', 2, 'the same ox (grouped)', { del: 'a lowercase stub of Babe the Blue Ox' });
M(55049, 'Belt of Hippolyta', 55050, 'girdle of Hippolyta', 'synonym', 5, 'the same belt (grouped)');

// =================================================================================================
sec('4. Two roots of one figure of myth and folklore');
M(22258, 'yeti', 55002, 'Abominable Snowman', 'synonym', 2, 'the same creature (grouped)');
M(22259, 'Bigfoot', 55001, 'Sasquatch', 'synonym', 2, 'the same creature (grouped)');
M(22260, 'Loch Ness Monster', 10022, 'Nessie', 'synonym', 2, 'the same monster (grouped)');
M(22041, 'Quetzalcoatl', 22483, 'Quetzalcoatl', 'synonym', 3, 'Quetzalcoatl [feathered serpent] is the same god');
M(22041, 'Quetzalcoatl', 22069, 'Feathered Serpent', 'synonym', 4, 'the English name of Quetzalcoatl (grouped)', { gloss: '' });
M(21895, 'Odin', 21924, 'Allfather', 'synonym', 3, 'Odin\'s title (grouped)', { gloss: '' });
M(21895, 'Odin', 21922, 'Woden', 'translation', 3, 'the Old English name of Odin (grouped)', { gloss: '' });
M(21895, 'Odin', 21923, 'Wotan', 'translation', 3, 'the German name of Odin (grouped)', { gloss: '' });
M(6969, 'Yggdrasil', 54947, 'World Tree', 'synonym', 3, 'the same tree (grouped)');
M(6968, 'Bifrost', 54944, 'Bilrost', 'spelling', 5, 'one name written two ways (grouped)');
M(21965, 'Ganesh', 21967, 'Ganapati', 'synonym', 4, 'the same god (grouped)');
M(22072, 'Pachamama', 62039, 'Mama Pacha', 'synonym', 5, 'the same goddess (grouped)');
M(22127, 'Monkey King', 22126, 'Sun Wukong', 'translation', 4, 'the Chinese name of the Monkey King (grouped)');
M(22154, 'Pigsy', 22153, 'Zhu Bajie', 'translation', 4, 'the Chinese name of Pigsy (grouped)');
M(22145, 'Kitchen God', 22159, 'Zao Jun', 'translation', 5, 'the Chinese name of the Kitchen God (grouped)', { gloss: '' });
M(22620, 'Snow Maiden', 22619, 'Snegurochka', 'translation', 5, 'the Russian name of the Snow Maiden (grouped)');
M(22644, 'Great Spirit', 22651, 'Wakan Tanka', 'translation', 5, 'the Lakota name of the Great Spirit (grouped)');
M(13342, 'Sinbad', 22718, 'Sindbad', 'spelling', 4, 'one name written two ways (grouped)');
M(22264, 'roc', 22711, 'Roc', 'synonym', 4, 'the same giant bird (Arabian Nights)', { del: 'a capitalized second root: Merriam-Webster and Oxford print roc lowercase' });
M(22724, 'Dreamtime', 34428, 'Dreaming', 'synonym', 4, 'the same idea (grouped)', { gloss: '' });
M(22238, 'Cerridwen', 54982, 'Ceridwen', 'spelling', 5, 'one name written two ways (Celtic gods; shapeshifters)');
M(22506, 'pooka', 54984, 'Puca', 'translation', 5, 'the Irish name of the pooka (grouped)');
M(6965, 'banshee', 22579, 'bean sidhe', 'translation', 5, 'the Irish name of the banshee (grouped)');

// =================================================================================================
sec('5. Regional roots (region-root-equiv, contract-root-region)');
M(21982, 'Kartikeya', 21983, 'Murugan', 'synonym', 4, 'the Tamil name of Kartikeya, grouped as one answer; it keeps its IN tag');
M(21740, 'coffin', 21741, 'casket', 'regional', 2, 'the US word for a coffin (grouped in tombs and burials): US players see casket', { region: ['US'] });

// =================================================================================================
sec('6. Wrong senses and stubs');
swap('castles', chk(20730, 'Caernarfon'), chk(62581, 'Caernarfon'), 'the castle, not the town (sense-link)');
swap('medieval_weapons', chk(322, 'axe'), chk(34648, 'axe'), 'the weapon, not the tool (sense-link)');
for (const t of ['knights', 'jousting_tournament']) swap(t, chk(10406, 'armor'), chk(21346, 'suit of armor'), 'a knight\'s armor; armor [animal covering] is a shell or scales');
swap('ancient_rome', chk(6920, 'pantheon'), chk(37040, 'Pantheon'), 'the temple in Rome, not the word for all the gods', { typ: 3 });
swap('famous_ruins_and_monuments', chk(6620, 'sphinx'), chk(37118, 'Great Sphinx'), 'the monument at Giza, not the creature of myth');
swap('black_death', chk(20951, 'rats'), chk(992, 'rat'), 'the animal that carried the fleas; rats 20951 is the exclamation (polite swears)');
swap('fairy_folk', chk(22493, 'puck'), chk(52773, 'Puck'), 'Puck the sprite (A Midsummer Night\'s Dream), not the hockey puck', { typ: 3 });
out('fairy_folk', [[19538, 'Sprite']], 'Sprite [drink] is the soft drink, not a fairy (a new lowercase sprite [fairy] would sit after the brand: contract-dup-root)');
{ const h = newEntry('harmony', 'accord', { pos: 'noun', type: 'common', fam: 2 }, 'agreement, peace between people; the peace words link was on harmony [music]');
  swap('peace_words', chk(6058, 'harmony'), h, 'living in harmony, not musical harmony'); }
{ const o = newEntry('Odyssey', 'epic', { pos: 'noun', type: 'title', fam: 2 }, 'Homer\'s epic (as Iliad 6930); mythology linked the common noun odyssey');
  swap('mythology', chk(2925, 'odyssey'), o, 'the epic, not a long journey');
  if (!E(2925).gloss) setE(E(2925), 'gloss', 'long journey', 'its text is now shared with Odyssey [epic]'); }
split(13307, 'Pericles', ['ancient_greece', 'famous_leaders'], 'Pericles', 'statesman', { type: 'person', fam: 4 }, 'the Athenian statesman (13307 is Shakespeare\'s play)', 'play');
{ const c = E(20382); if (c.text === 'Caesar') {
    retext(20382, 'Caesar', 'Julius Caesar', 'the full name of the Roman general (Caesar alone is also the title of later emperors)');
    newAlias(20382, 'Caesar', 'Roman', 'synonym', 1, [], 'his surname, as it was the root text'); }
  for (const t of ['famous_generals', 'famous_leaders']) swap(t, chk(13292, 'Julius Caesar'), E(20382), 'the general and dictator, not Shakespeare\'s play');
  if (E(13292).gloss !== 'play') setE(E(13292), 'gloss', 'play', 'its text is now shared with Julius Caesar [Roman]'); }
{ const b = newEntry('Barnet', 'battle', { pos: 'noun', type: 'place', fam: 5 }, 'the Battle of Barnet (1471, Wars of the Roses); medieval battles linked barnet, the Cockney word for hair');
  swap('medieval_battles', chk(27446, 'barnet'), b, 'the battle, not the slang for hair');
  setE(E(27446), 'type', 'common', 'a word, not an idiom (contract-type-common)'); setE(E(27446), 'gloss', 'hair', 'its text is now shared with Barnet [battle]'); }
{ const k = newEntry('Khmer Empire', '', { pos: 'noun', type: 'proper', fam: 3 }, 'the empire of Angkor; empires linked Khmer, the language');
  swap('empires', chk(25831, 'Khmer'), k, 'the empire, not the language', { show: 'Khmer' }); }
for (const [from, ft, to, tt] of [[25947, 'Babylonian', 6624, 'Babylon'], [25826, 'Macedonian', 20380, 'Macedon'], [25877, 'Assyrian', 20510, 'Assyria'], [25942, 'Hittite', 6630, 'Hittites'], [25963, 'Mayan', 6637, 'Maya']])
  swap('empires', chk(from, ft), chk(to, tt), `the state, not the language ${ft} (the language entries stay in the language themes)`);
setE(chk(55142, 'Declaration'), 'type', 'proper', 'the Declaration of Independence (the full name has 25 letters, over the limit of 20): a document\'s name, not a book or film');
// Simon (2026-11-23, "Take all and apply"): the bare "Declaration" stays out of historic documents (it stays in American Revolution)

{ const a = P.entries.find(x => x.id === 22473); if (a && a.aliasOf === 518) { // TIDY-UP.md: dragon egg its own root
  unlinkE(E(518), 'dragons', 'egg [food from hens] stood in for its form alias dragon egg (alias-fullname); dragon egg is now its own root');
  delete a.aliasOf; delete a.aliasKind; a.typ = { dragons: 2 }; a.nameOkIn = []; a.show = { dragons: 'egg' }; a.use = {}; a.type = 'common'; a.pos = 'noun'; a.fam = 2; n++; reindex(P); touchedT.add('dragons');
  A.push('dragon egg 22473: no longer a form alias of egg 518 but its own root (familiarity 2), linked in dragons (typicality 2, shown "egg", as dragon slayer is shown "slayer") in place of egg (alias-fullname; TIDY-UP.md, round 1 item)'); } }
out('cowboy_gear', [[55212, 'spurs and boots']], 'a pair of things, not one piece of gear (spurs and boots are both members)');
delE(55212, 'spurs and boots', 'a stub made for cowboy gear; in no theme');

// =================================================================================================
sec('7. Belonging');
out('feudal_japan', [[2354, 'Mount Fuji']], 'a mountain, not a part of feudal Japan (in Japanese and mountain themes)');
out('ottoman_empire', [[344, 'ottoman']], 'ottoman [furniture] is a footstool');
out('dynasties', [[344, 'ottoman']], 'ottoman [furniture] is a footstool, not the Ottoman dynasty');
out('aztecs_and_maya', [[2077, 'volcanic glass']], 'the description of obsidian, which is there (they were grouped)');
out('famous_ruins_and_monuments', [[6656, 'Rosetta Stone']], 'an inscribed stone in a museum, not a ruin or monument (in artifacts and ancient writing)');
out('pirate_weapons', [[20135, 'knife']], 'knife [cutlery] is a table knife; dagger and dirk are the pirate\'s knives');
out('medieval_clothing', [[4890, 'robe'], [4894, 'leggings']], 'robe [bathrobe] is a dressing gown and leggings are modern (hose and chausses are the medieval legwear)');
out('pirate_ships', [[13785, 'pirate ship'], [21234, 'warship']], 'pirate ship [ride] is the fairground ride; warship is the general word, not a pirate ship');
out('siege_weapons', [[20715, 'arrow slit']], 'a window in a castle wall, not a siege weapon (in castles and castle parts)');
out('chinese_emperors', [[21412, 'Genghis Khan']], 'the Mongol khan, never emperor of China (his grandson Kublai Khan is there)');
out('famous_queens', [[33387, 'queen mother']], 'a title, not a famous queen');
out('conquistadors', [[29312, 'conquistador']], 'the topic word itself (LIBRARY-RULES 5)');
out('shinto_kami', [[22120, 'kami']], 'the topic word itself');
out('yoruba_orishas', [[22214, 'Orisha'], [22218, 'Santeria'], [62043, 'Candomble']], 'the topic word itself, and two religions, not orishas');
out('sea_monsters', [[21261, "Davy Jones' Locker"]], 'the bottom of the sea, not a monster (in pirate places)');
linkE(chk(22297, 'Leonidas'), 'ancient_greece', 3, 'the Spartan king of Thermopylae (reviewer: he was left in no theme)');
out('greek_heroes', [[22297, 'Leonidas']], 'the historical Spartan king, not a hero of Greek myth (now in ancient Greece)');
out('dragons', [[1152, 'Komodo dragon']], 'a real lizard, a dragon only by name (in lizards)');
out('fairy_folk', [[22509, 'toadstool']], 'a fungus, not one of the fairy folk');
out('wild_west_town', [[5999, 'pianoforte']], 'the formal name of the piano, which is there (they were grouped)');
leaveGroup('robin_hood_legend', 55077, 'Nottingham is the town, the Sheriff of Nottingham a man: not one answer');

// =================================================================================================
sec('8. Case, spelling, types, flags, ratings, alias kinds');
for (const [id, text] of [[6949, 'Zeus'], [20349, 'Isis'], [20443, 'Inti'], [20430, 'Kukulkan'], [20432, 'Itzamna'], [20541, 'Ahura Mazda'], [3718, 'Morpheus']])
  setE(chk(id, text), 'type', 'proper', 'a deity is proper (LIBRARY-RULES 4, type), as the other gods');
for (const [id, text] of [[5764, "nine men's morris"], [6246, 'morris dance'], [6281, 'lindy hop'], [6772, 'pieces of eight'], [6792, 'buried treasure'], [6801, "cat o' nine tails"],
  [6802, 'sea shanty'], [6807, 'skull and crossbones'], [6808, 'letter of marque'], [6809, 'articles of agreement'], [6821, 'civil war'], [6866, 'carbon dating'], [6892, 'flint knapping'],
  [6900, 'cave painting'], [6903, 'spoil heap'], [6904, 'grid square'], [6911, 'bog body'], [7008, 'dark lord'], [7012, 'crystal ball'], [7038, 'sword and sorcery'], [7039, 'high fantasy'],
  [7045, 'dungeon master'], [7048, 'chosen one'], [7084, 'postwar era'], [55009, 'living dead'], [55011, 'reanimated corpse'], [55078, 'archery contest'], [4398, 'air raid']])
  setE(chk(id, text), 'type', 'common', 'a name for a thing, not an idiom (type phrase is for idioms and set phrases)');
setE(chk(20439, 'Sapa Inca'), 'type', 'proper', 'a ruler\'s title, not a book or film (type title)');
retext(20431, 'Tlatoani', 'tlatoani', 'a ruler\'s title, written lowercase (as sapa, shogun); it was typed title', { type: 'common' });
setE(chk(55071, 'Sheriff of Nottingham'), 'type', 'person', 'a character, not a title of a work');
setE(chk(55203, 'Texas Ranger'), 'type', 'proper', 'a lawman of the Texas Rangers, not a title of a work');
setE(chk(22152, 'Journey to the West'), 'type', 'title', 'the novel (gloss novel)');
retext(21512, 'pax Romana', 'Pax Romana', 'Merriam-Webster and Oxford capitalize both words');
{ const e = E(22960); if (e.text === 'Albrecht Durer') { retext(22960, 'Albrecht Durer', 'Albrecht Dürer', 'Merriam-Webster prints the umlaut (rule 8)'); newAlias(22960, 'Albrecht Durer', '', 'spelling', 4, [], 'the plain form (rule 8)'); } }
{ const e = E(54806); if (e.text === 'Copan') { retext(54806, 'Copan', 'Copán', 'the root keeps the accent Merriam-Webster prints (rule 8); it was the alias'); retext(54807, 'Copán', 'Copan', 'the plain form, now the spelling alias (rule 8)'); } }
setE(chk(21845, 'Uranus'), 'fam', 3, 'the god is known to many adults, not every child (it had the planet\'s familiarity)');
setE(chk(21837, 'Nike'), 'fam', 2, 'the goddess is known to most adults through the brand, not every child (it had the brand\'s familiarity)');
setE(chk(2417, 'satnav'), 'fam', 2, 'the one-word spelling of sat nav (familiarity 2); as GPS\'s first synonym it is shown at some levels (flag 512)');
delAlias(62642, 'Tin Lizzie', 'as the first synonym (familiarity 4) of Model T (familiarity 2) it would be shown at some levels; a nickname few players know');
{ const a = E(6803); if (a.text === 'chantey') retext(6803, 'chantey', 'sea chantey', 'the variant spelling of the whole term (alias-kind-suspect: chantey differed in 6 of 10 letters)'); }
{ const a = E(20343); if (a.text === 'Ramses') retext(20343, 'Ramses', 'Ramses II', 'the variant spelling of the whole name (alias-kind-suspect)'); }
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');
// =================================================================================================
sec("9. Reviewer's fixes (2026-11-23)");
{ const m = chk(54328, 'Megiddo'); if (m.typ.world_war_i_battles !== undefined) {
  const w = newEntry('Megiddo', '1918 battle', { pos: 'noun', type: 'place', fam: 5 }, 'the Battle of Megiddo of 1918 (Allenby); Megiddo 54328 is the ancient city and its battle of about 1457 BC');
  swap('world_war_i_battles', m, w, 'the 1918 battle, not the ancient one (reviewer)'); }
  if (m.gloss !== 'ancient city') setE(m, 'gloss', 'ancient city', 'its text is now shared with Megiddo [1918 battle]'); }
out('ancient_battles', [[54337, 'Syracuse']], 'Syracuse [city] is the city; the theme holds battles (reviewer)');
out('superstitions', [[22822, 'omen'], [22823, 'portent'], [22824, 'augury'], [22825, 'harbinger']], 'a word for a sign, not a superstition (reviewer)');

// =================================================================================================
sec("10. People's names (LIBRARY-RULES 5, Simon 2026-11-23): the surname is the full name's first synonym, at the same familiarity");
const sameFam = (rootId, rootText, aliasText, why) => {
  const r = ix.entry.get(rootId); if (!r || r.text !== rootText || r.aliasOf) return;
  const a = P.entries.find(x => x.aliasOf === rootId && x.text === aliasText); if (!a) return;
  const f = Math.min(r.fam, a.fam);
  setE(r, 'fam', f, `the same familiarity as its surname alias ${aliasText} (LIBRARY-RULES 5, people's names)${why ? ': ' + why : ''}`);
  setE(a, 'fam', f, `the same familiarity as its root ${rootText} (LIBRARY-RULES 5, people's names)`);
};
for (const [id, root, al] of [[54538, 'Thomas Jefferson', 'Jefferson'], [42198, 'Jimmy Carter', 'Carter'], [42200, 'Woodrow Wilson', 'Wilson'], [54540, 'James Madison', 'Madison'],
  [21014, 'Hernando de Soto', 'de Soto'], [55057, 'Uther Pendragon', 'Pendragon'], [20699, 'Gawain', 'Sir Gawain'], [55059, 'Kay', 'Sir Kay'], [55068, 'Gareth', 'Sir Gareth'],
  [21192, 'Francis Drake', 'Sir Francis Drake'], [21515, 'Abraham Lincoln', 'Lincoln'], [21404, 'George Washington', 'Washington'], [21405, 'Ulysses Grant', 'Grant'], [42195, 'Barack Obama', 'Obama'],
  [6716, 'Christopher Columbus', 'Columbus'], [6717, 'Ferdinand Magellan', 'Magellan'], [6723, 'Roald Amundsen', 'Amundsen'], [6724, 'Ernest Shackleton', 'Shackleton'],
  [54174, 'Henry Morton Stanley', 'Stanley'], [21007, 'Hernán Cortés', 'Cortés'], [21008, 'Francisco Pizarro', 'Pizarro'], [54124, 'Vasco Núñez de Balboa', 'Balboa'],
  [21607, 'Johannes Gutenberg', 'Gutenberg'], [21641, 'Mahatma Gandhi', 'Gandhi'], [22980, 'Ebenezer Scrooge', 'Scrooge']])
  sameFam(id, root, al, '');
// Full-name roots of the group with no surname alias: add the surname where it names only this person (SURNAMES below, checked by hand)
const SURNAMES = [[6718, 'Vasco da Gama', 'da Gama'], [6725, 'Edmund Hillary', 'Hillary'], [6729, 'Amerigo Vespucci', 'Vespucci'], [6730, 'John Cabot', 'Cabot'], [21061, 'Buzz Aldrin', 'Aldrin'], [21062, 'Yuri Gagarin', 'Gagarin'], [21517, 'Nelson Mandela', 'Mandela'], [21531, 'Fidel Castro', 'Castro'], [21601, 'Thomas Edison', 'Edison'], [21605, 'Benjamin Franklin', 'Franklin'], [21615, 'Tim Berners-Lee', 'Berners-Lee'], [21636, 'William Wilberforce', 'Wilberforce'], [21638, 'Harriet Tubman', 'Tubman'], [21639, 'Frederick Douglass', 'Douglass'], [21670, 'Amelia Earhart', 'Earhart'], [21671, 'Helen Keller', 'Keller'], [21674, 'Ada Lovelace', 'Lovelace'], [13185, 'Jane Austen', 'Austen'], [13186, 'Charles Dickens', 'Dickens'], [11936, 'Frida Kahlo', 'Kahlo'], [12905, 'Charlie Chaplin', 'Chaplin'], [12973, 'Buster Keaton', 'Keaton'], [11513, 'Duke Ellington', 'Ellington'], [23058, 'Al Capone', 'Capone'], [23060, 'Charles Lindbergh', 'Lindbergh'], [22756, 'Davy Crockett', 'Crockett'], [54227, 'Lawrence Oates', 'Oates'], [54546, 'Thomas Paine', 'Paine'], [54596, 'Anne Boleyn', 'Boleyn'], [55137, 'Paul Revere', 'Revere'], [55195, 'Daniel Boone', 'Boone']];
for (const [id, root, sur] of SURNAMES) {
  const r = ix.entry.get(id); if (!r || r.aliasOf || r.text !== root) continue;
  if (P.entries.some(a => a.aliasOf === id && a.text === sur)) continue;
  const a = newAlias(id, sur, '', 'synonym', r.fam, [], `the surname of ${root}, its first synonym at the same familiarity (LIBRARY-RULES 5, people's names)`);
  const i = P.entries.indexOf(a), first = P.entries.findIndex(x => x.aliasOf === id && x.aliasKind === 'synonym');
  if (first >= 0 && first < i) { P.entries.splice(i, 1); P.entries.splice(first, 0, a); reindex(P); A.push(`  ${lab(a)} moves before the other synonyms of ${root} in row order (the first synonym is the surname)`); }
}
// The surname must be the first synonym of each full name merged above
for (const [id, sur] of [[54218, null], [54174, 'Stanley']]) { if (!sur) continue; const r = ix.entry.get(id); if (!r) continue;
  const syns = P.entries.filter(x => x.aliasOf === id && x.aliasKind === 'synonym'); const s0 = syns.find(x => x.text === sur);
  if (s0 && syns[0] !== s0) { P.entries.splice(P.entries.indexOf(s0), 1); P.entries.splice(P.entries.indexOf(syns[0]), 0, s0); reindex(P); n++; A.push(`  ${sur} moves first among the synonyms of ${r.text} (row order)`); } }

// =================================================================================================
sec('11. Decided by Simon (2026-11-23, "Take all and apply")');
setT('ottoman_empire', 'region', [], 'Simon: world history by the region rule, like ancient Egypt (Ottoman sultans keeps its own TR)');
setE(chk(4375, 'GI'), 'region', [], 'Simon: an American soldier, known to UK adults too');
setE(chk(6716, 'Christopher Columbus'), 'sensitive', false, 'Simon: a person is not sensitive just for being historical (v417)');

// =================================================================================================
sec('12. First synonym alias (game flag 512): no harder than the root + 1');
{ const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  let all = 0, bad = 0;
  for (const [rid, list] of syn) { const r = ix.entry.get(rid); if (!linkIds(P, r).some(t => inGroup(t))) continue; all++;
    if (list[0].fam > r.fam + 1) { bad++; A.push(`  STILL TOO HARD: ${lab(r)} f${r.fam}: first synonym ${lab(list[0])} f${list[0].fam}`); } }
  A.push(`  roots linked in the group with synonym aliases: ${all}; first synonym harder than root + 1: ${bad} (before: GPS/satnav and Model T/Tin Lizzie, fixed above; the merges of this batch chose kinds or deletions so none is added)`); }
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
const summary = [`Library batch v444: tidy-up step 3, History & Myth (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch444-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch444-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch444-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

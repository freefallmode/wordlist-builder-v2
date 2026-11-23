// Library batch v443: tidy-up step 3 (TIDY-UP.md), the Arts & Entertainment group: every theme under arts_entertainment read against the
// checklist (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v439. Applied after v440 (People & Society), v441 (Home & Everyday) and v442 (Sports & Games): everything here works by entry id +
// text and theme id, never by position, and every step is skipped when it is already done or another batch has done it (rerun: 0 changes).
//   1. Tree and twins: plucked instruments under string instruments (theme-twin), poets out from under poetry terms, famous ballets under dance,
//      poetry rhythm words renamed poetic meters; the "X words" twins (music, painting, ballet, film, TV, award, poetry, photography) trimmed.
//   2. Regional roots (region-root-equiv): Macca, hoofing, pavement artist, tribute act, bobby and copper in costumes; US roots untagged.
//   3. About 75 second roots of one sense merged (painters' short names, author initials, Shakespeare, DJ / disc jockey, steel drum, timpani ...).
//   4. Wrong senses (AIDA, cabaret, hairspray, freestyle, pan, tap, fantasia ...). 5. Belonging. 6. Case, diacritics, types, ratings, long words.
//   7. Orphans. 8. The first synonym alias of every root (game flag 512).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch443.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const GROUP = 'arts_entertainment';
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

// ---------- more helpers of this batch ----------
const has = id => { const e = ix.entry.get(id); return e && !e.aliasOf ? e : null; };   // a root that is still there (round 3 may have merged it)
const M = (k, kt, g, gt, kind, fam, why, o) => mergeInto(k, kt, g, gt, kind, fam, why, o);
// A link moves from a stub or wrong-sense entry to the full term (shown short), and the stub goes when it is left in no theme.
const stubTo = (tid, fromId, fromText, toId, toText, show, why) => {
  const f = ix.entry.get(fromId); if (!f || f.aliasOf || f.typ[tid] === undefined) return;
  chk(fromId, fromText); swap(tid, f, chk(toId, toText), why, { ...(show ? { show } : {}), outWhy: `a stub or second root of ${toText}: ${toText} ${toId} takes the link` });
  if (!linkIds(P, f).length && !P.entries.some(a => a.aliasOf === fromId)) delE(fromId, fromText, `a second root of ${toText}, made for one theme; in no theme now`);
};
const outT = (tid, ids, why) => { if (ix.theme.has(tid)) out(tid, ids, why); };

// =================================================================================================
sec('1. Tree and twins');
moveT('plucked_instruments', 'bowed_instruments', 'after', 'plucked instruments is a kind of string instrument, beside bowed instruments (theme-twin: all 9 of its words were in string instruments)');
for (const [id, text, typ] of [[288, 'lute', 2], [291, 'zither', 3], [290, 'balalaika', 3], [10538, 'bouzouki', 3], [10539, 'koto', 3], [10540, 'oud', 3], [10659, 'shamisen', 3],
  [10546, 'autoharp', 3], [38530, 'kora', 3], [10551, 'charango', 4], [10660, 'pipa', 4], [10661, 'guzheng', 4], [10664, 'sarod', 5], [10545, 'cittern', 5], [10542, 'theorbo', 5]])
  linkE(chk(id, text), 'plucked_instruments', typ, 'a plucked string instrument (the theme held only 9 words, all of them in things with strings too: theme-twin)');
moveT('poets', 'poetry_terms', 'after', 'poets are not poetry terms: a theme of people beside poetry terms under literature (Persian poets stays under poets)');
moveT('persian_poets', 'poets', 'in', 'Persian poets is a kind of poets, not of poetry terms');
moveT('famous_ballets', 'ballet_terms', 'after', 'ballets are works, not ballet terms: under dance, beside ballet terms');
rename('rhythm_words', 'poetic meters', 'its words are the meters and metrical feet (iamb, trochee, dactyl ...), a sub-theme of poetry terms; "poetry rhythm words" was an "X words" twin of it (xwords-twin 100%)');
for (const [id, text, typ] of [[52146, 'Mary Cassatt', 3], [52161, 'John Singer Sargent', 3]]) linkE(chk(id, text), 'american_painters', typ, 'an American painter (the theme shared 7 of its 8 words with modern artists once Georgia O\'Keeffe was one root: theme-twin)');
out('literature', [[6536, 'iambic pentameter'], [6537, 'free verse'], [6510, 'elegy'], [6509, 'ode']], 'a poetry term, in poetry terms (xwords-twin: poetry terms shared 16 of its 45 words with literature once the poetry forms left it)');
outT('rhythm_words', [[13247, 'meter']], 'the general word beside its kinds (it stays in poetry terms)');

sec('1b. X-words twins: each "X words" theme keeps its own topic, the specialist kinds go to the theme they belong to');
out('music_words', [[6071, 'measure'], [6087, 'staff'], [6088, 'staccato'], [6089, 'legato'], [6091, 'arpeggio'], [6092, 'syncopation'], [6093, 'counterpoint'], [6094, 'timbre'],
  [6095, 'cadence'], [6096, 'coda'], [6098, 'leitmotif'], [6101, 'ostinato'], [6103, 'glissando'], [6104, 'vibrato'], [6105, 'tremolo'], [6106, 'fermata'], [6107, 'pause'], [6108, 'hemiola'],
  [6112, 'key signature'], [6113, 'time signature'], [6114, 'accidental'], [6116, 'sharp'], [6121, 'appoggiatura'], [6083, 'octave']],
  'a notation or theory term, in its sub-theme music terms (xwords-twin: music words shared 35 of 72 words with music terms); music words keeps the everyday words (song, tune, beat, lyrics, chorus, verse, hook, riff, solo)');
for (const [id, text, typ] of [[5998, 'piano', 1], [10782, 'opera', 1], [6076, 'solo', 1], [10991, 'tempo', 1], [6196, 'soprano', 1], [11113, 'forte', 2], [11074, 'allegro', 2],
  [11076, 'adagio', 2], [11077, 'presto', 2], [10848, 'aria', 2], [10815, 'concerto', 2], [10816, 'sonata', 2], [12339, 'libretto', 2], [12392, 'finale', 3], [6141, 'maestro', 3],
  [6159, 'virtuoso', 3], [6167, 'diva', 3], [11016, 'falsetto', 3], [11118, 'diminuendo', 3], [6199, 'prima donna', 3], [10841, 'intermezzo', 4], [10820, 'oratorio', 3]]) {
  const e = has(id); if (e && e.text === text) linkE(e, 'italian_music_words', typ, 'a music word taken from Italian (the theme had no easy word and shared all 15 of its words with music words, its parent: xwords-twin)'); }
out('dance', [[6228, 'barre'], [6268, 'plié'], [6270, 'jeté'], [6273, 'entrechat'], [6274, 'fouetté'], [6267, 'pas de deux'], [6272, 'arabesque']],
  'a ballet term, in ballet terms (xwords-twin: ballet terms shared 13 of 35 words with dance)');
out('art', [[6299, 'acrylic'], [6328, 'gouache'], [6329, 'tempera'], [6330, 'chiaroscuro'], [6350, 'sfumato'], [6351, 'impasto'], [6348, 'triptych'], [6349, 'diptych'], [6343, 'miniature'], [6290, 'palette']],
  'a painting word, in painting words (xwords-twin: painting words shared 21 of 41 words with art)');
out('photography_words', [[12088, 'lens cap'], [12089, 'light meter']], 'a camera part or accessory, in camera parts and cameras (xwords-twin: photography words shared 14 of 45 words with cameras)');
out('film_and_tv', [[6397, 'cameo'], [6401, 'clapperboard'], [6403, 'slate'], [6408, 'voiceover'], [6410, 'cliffhanger'], [6431, 'MacGuffin'], [6433, 'Foley'], [6435, 'dailies'],
  [6440, 'jump cut'], [6441, 'montage'], [6447, 'mise-en-scène'], [6451, 'continuity']],
  'a film-making term, in film words (xwords-twin: film words shared 26 of 58 words with film and TV, its parent)');
out('film_and_tv', [[4576, 'idiot box'], [6411, 'spin-off'], [6412, 'pilot'], [6422, 'rerun'], [6425, 'prime time'], [6427, 'laugh track'], [6428, 'canned laughter'], [6429, 'teleprompter']],
  'a TV term, in TV words (xwords-twin: TV words shared 17 of 46 words with film and TV, its parent)');
out('award_words', [[12753, 'Razzie'], [12755, 'Peabody'], [12757, "People's Choice"], [12759, 'Mercury Prize'], [12760, 'Olivier Award'], [12762, 'Golden Bear'], [12763, 'Golden Lion'],
  [12764, "Critics' Choice"], [12765, 'Obie'], [12767, 'Webby'], [63348, 'Brits'], [12752, 'BAFTA'], [12761, "Palme d'Or"]],
  'a named award, in its sub-theme entertainment awards (xwords-twin: award words shared 17 of 36 words with it); award words keeps the ceremony words and the four best-known awards');
out('poetry_terms', [[13263, 'villanelle'], [13264, 'sestina'], [13265, 'ghazal'], [13266, 'pantoum'], [13267, 'tanka'], [13268, 'cinquain'], [13274, 'prose poem'], [13275, 'concrete poem'],
  [13283, 'terza rima'], [13284, 'ottava rima'], [26714, 'epigram'], [7652, 'acrostic']],
  'a poetry form, in poetry forms (xwords-twin: poetry terms shared 23 of 57 words with poetry forms)');

// =================================================================================================
sec('2. Regional roots (region-root-equiv, contract-root-region)');
{ const m = ix.entry.get(51970); if (m && m.text === 'McCartney' && !m.aliasOf) {
    retext(51970, 'McCartney', 'Paul McCartney', 'the full name is the root, as John Lennon, George Harrison and Ringo Starr');
    const a = ix.entry.get(51969); if (a && a.aliasOf === 51970 && a.text === 'Paul McCartney') retext(51969, 'Paul McCartney', 'McCartney', 'the surname, now the synonym alias of Paul McCartney (it was the root)'); } }
M(51970, 'Paul McCartney', 51971, 'Macca', 'synonym', 4, 'his British nickname, grouped with him as one answer; a synonym alias keeping its UK tag, after McCartney in row order (the first synonym stays McCartney; v410 kept Macca as an accepted name, which the alias still is)', { region: ['UK'] });
M(51967, 'John Lennon', 51968, 'Lennon', 'synonym', 1, 'the same Beatle (grouped as one answer): the surname is the first synonym (people-names rule)');
{ const a = ix.entry.get(51968); if (a && a.aliasOf === 51967) setE(a, 'fam', 1, "the surname alias has the root's familiarity (people-names rule)"); }
if (ix.theme.has('the_beatles')) setT('the_beatles', 'note', 'Exactly: John Lennon, Paul McCartney, George Harrison, Ringo Starr.', 'McCartney is now the alias of Paul McCartney');
M(6210, 'tap dance', 6211, 'hoofing', 'synonym', 5, 'US slang for tap dancing, grouped as one answer in musicals words', { del: 'as the first synonym (familiarity 5) of tap dance (familiarity 1) it would be shown at some levels; slang few players know' });
M(13811, 'chalk artist', 13810, 'pavement artist', 'regional', 3, 'the UK word for a chalk artist, grouped as one answer in street performers; UK players see it', { region: ['UK'] });
leaveGroup('party_entertainment', 13875, 'a tribute act imitates one star or band; a cover band plays other people\'s songs: not one answer');
M(11351, 'tribute band', 13875, 'tribute act', 'synonym', 4, 'the same act (a tribute band, in rock band lineup); "tribute act" is used in the US too, so the alias has no region', { region: [] });
for (const t of ['dress_up_costumes', 'jobs_with_uniforms']) out(t, [[4090, 'bobby'], [4089, 'copper']], 'police slang beside police officer, policeman and cop (v440 took them out of jobs and emergency workers for the same reason; they play in police words and nicknames for workers)');
for (const [id, text, why] of [[67178, 'pregame', 'pre-drinks [UK]'], [67192, 'orchestra', 'stalls [UK]']])
  { const e = has(id); if (e && e.text === text) setE(e, 'region', [], `the US root of a regional pair: untagged, as color is (v413); its UK word ${why} is its regional alias`); }
setE(chk(6216, 'square dance'), 'region', [], 'known to UK and US adults alike (familiarity 2): the US tag made it a harder word for everyone (LIBRARY-RULES 4: who knows it, not where it is from)');
setE(chk(6055, 'vuvuzela'), 'region', [], 'world knowledge since the 2010 World Cup (familiarity 3): not a South African word for players');

// =================================================================================================
sec('3. Two roots of one sense');
// People (LIBRARY-RULES 5, Aliases; Simon 2026-11-23): the full name is the root, the surname its FIRST synonym alias at the same familiarity
// (the root takes the surname's familiarity). Exceptions: one-name people and full names over 20 letters. Other spellings become spelling aliases.
const firstSyn = (rootId, aliasId) => { const a = ix.entry.get(aliasId); if (!a || a.aliasOf !== rootId) return;
  const syn = P.entries.filter(x => x.aliasOf === rootId && x.aliasKind === 'synonym'); if (syn[0] === a) return;
  P.entries = P.entries.filter(x => x !== a); P.entries.splice(P.entries.indexOf(syn[0]), 0, a); reindex(P); n++;
  A.push(`  ${lab(a)} moves before ${lab(syn[0])} in row order: the surname is the first synonym of ${lab(E(rootId))} (people-names rule)`); };
const sameFam = (rootId, aliasId, fam) => { const r = ix.entry.get(rootId), a = ix.entry.get(aliasId); if (!r || !a || a.aliasOf !== rootId) return;
  setE(r, 'fam', fam, "the full name takes its surname's familiarity (people-names rule)"); setE(a, 'fam', fam, "the surname alias has the root's familiarity (people-names rule)"); firstSyn(rootId, aliasId); };
for (const [k, kt, g, gt, fam] of [
  [52461, 'J. K. Rowling', 13181, 'J.K. Rowling', 1], [52484, 'C. S. Lewis', 13215, 'C.S. Lewis', 2], [52465, 'H. G. Wells', 13225, 'H.G. Wells', 2],
  [52483, 'J. R. R. Tolkien', 13214, 'J.R.R. Tolkien', 1], [52663, 'A. A. Milne', 13218, 'A.A. Milne', 3], [11945, "Georgia O'Keeffe", 52176, 'Georgia OKeeffe', 3]])
  M(k, kt, g, gt, 'spelling', fam, 'the same person written another way (the library spaces initials: T. S. Eliot, E. M. Forster)');
const SURNAMES = [
  [12480, 'William Shakespeare', 12481, 'Shakespeare', 1], [13204, 'Chinua Achebe', 61992, 'Achebe', 3], [52566, 'Chimamanda Adichie', 61994, 'Adichie', 3],
  [52604, 'Matsuo Basho', 52605, 'Basho', 3], [52692, 'William Wordsworth', 52693, 'Wordsworth', 3], [13187, 'Leo Tolstoy', 52533, 'Tolstoy', 1],
  [13245, 'Fyodor Dostoevsky', 52534, 'Dostoevsky', 2], [12485, 'Anton Chekhov', 52535, 'Chekhov', 2], [13571, 'Sherlock Holmes', 13572, 'Holmes', 1],
  [13573, 'Hercule Poirot', 13574, 'Poirot', 2], [11931, 'Claude Monet', 52140, 'Monet', 1], [11930, 'Pablo Picasso', 52162, 'Picasso', 1], [11934, 'Salvador Dali', 52163, 'Dali', 1],
  [11929, 'Vincent van Gogh', 52150, 'Van Gogh', 1], [11962, 'Edgar Degas', 52142, 'Degas', 2], [11963, 'Pierre-Auguste Renoir', 52141, 'Renoir', 2],
  [11943, 'Paul Cezanne', 52149, 'Cezanne', 2], [11961, 'Paul Gauguin', 52151, 'Gauguin', 3], [11964, 'Camille Pissarro', 52144, 'Pissarro', 3],
  [11942, 'Johannes Vermeer', 52181, 'Vermeer', 3], [11955, 'Francisco Goya', 52202, 'Goya', 2], [11956, 'Diego Velazquez', 52203, 'Velazquez', 3],
  [51875, 'Jean-Philippe Rameau', 51874, 'Rameau', 4], [51915, 'Vincenzo Bellini', 51914, 'Bellini', 4], [51913, 'Gaetano Donizetti', 51912, 'Donizetti', 4],
  [13960, 'Christopher Wren', 13961, 'Wren', 3], [13957, 'Antoni Gaudi', 13958, 'Gaudi', 3]];
for (const [k, kt, g, gt, fam] of SURNAMES) { M(k, kt, g, gt, 'synonym', fam, 'the same person, two roots (grouped, or in sibling themes): the full name is the root, the surname its first synonym (people-names rule)'); sameFam(k, g, fam); }
for (const [k, kt, g, gt, fam] of [[13651, 'Winnie the Pooh', 13652, 'Pooh', 1], [12527, 'George Bernard Shaw', 12528, 'Bernard Shaw', 3], [12980, 'Jimmy Stewart', 12981, 'James Stewart', 2],
  [51977, 'Agnetha Faltskog', 51978, 'Agnetha', 4], [51981, 'Benny Andersson', 51982, 'Benny', 4], [51983, 'Anni-Frid Lyngstad', 51984, 'Frida', 4]])
  M(k, kt, g, gt, 'synonym', fam, 'the same person under a shorter or other name (grouped); one root, the other its synonym alias');
{ const b = ix.entry.get(51980); if (b && b.aliasOf === 51979) setE(b, 'aliasKind', 'synonym', 'his first name, a synonym like Agnetha, Benny and Frida (not an abbreviation)'); }
// surname roots still beside full names in their themes: the full name becomes the root text, the surname its first synonym
for (const [id, sur, full, fam] of [[52143, 'Manet', 'Edouard Manet', 2], [52145, 'Sisley', 'Alfred Sisley', 4], [52152, 'Seurat', 'Georges Seurat', 3],
  [52205, 'Zurbaran', 'Francisco de Zurbaran', 5], [52206, 'Sorolla', 'Joaquin Sorolla', 5], [52536, 'Pushkin', 'Alexander Pushkin', 3], [52537, 'Gogol', 'Nikolai Gogol', 3]]) {
  const e = has(id); if (!e || e.text !== sur) continue;
  retext(id, sur, full, 'the full name is the root (people-names rule), as the other painters and writers in its theme');
  firstSyn(id, newAlias(id, sur, '', 'synonym', fam, [], 'the surname, its first synonym at the same familiarity (people-names rule)').id); }
M(52700, 'Lord Byron', 52701, 'George Gordon Byron', 'synonym', 5, 'the same poet', { del: 'as the first synonym (familiarity 5) of Lord Byron (familiarity 2) it would be shown at some levels' });
{ const g = ix.entry.get(42174); if (g && !g.aliasOf) { delAlias(13202, 'Garcia Marquez', 'the plain form of García Márquez, which becomes an alias itself (Gabriel García Márquez keeps its plain form Gabriel Garcia Marquez)');
    M(52627, 'Gabriel García Márquez', 42174, 'García Márquez', 'synonym', 3, 'the same writer, two roots (authors and the prize themes linked the surname)'); } }
M(52627, 'Gabriel García Márquez', 52629, 'Gabo', 'synonym', 5, 'his nickname, grouped as one answer; after García Márquez in row order, so not the first synonym');
// musicians and instruments
M(6136, 'pianist', 6137, 'piano player', 'synonym', 1, 'the same musician (grouped)');
M(6151, 'saxophonist', 6152, 'sax player', 'synonym', 2, 'the same musician (grouped)');
M(6143, 'bassist', 6144, 'bass player', 'synonym', 2, 'the same musician (grouped)');
M(6143, 'bassist', 11353, 'bass guitarist', 'synonym', 2, 'the same musician (grouped in rock band lineup)');
M(11335, 'keyboardist', 11336, 'keys player', 'synonym', 3, 'the same musician (grouped)');
M(6191, 'backup singer', 11337, 'backing vocalist', 'synonym', 2, 'the same singer (grouped; backup singer has backing singer as its UK alias)');
M(6145, 'DJ', 6146, 'disc jockey', 'synonym', 2, 'the full form of DJ, grouped as one answer in four themes; the first synonym of DJ (deejay stays its spelling alias, v440)');
M(10608, 'steel drum', 65917, 'steel pan', 'synonym', 2, 'the same instrument, two roots (steel pan in drums; steelpan and steel drum were grouped)');
M(10608, 'steel drum', 10609, 'steelpan', 'synonym', 3, 'the same instrument written closed (grouped with steel drum and steel pan)');
{ const a = ix.entry.get(65917), b = ix.entry.get(10609); if (a && b && a.aliasOf === 10608 && b.aliasOf === 10608 && P.entries.indexOf(a) > P.entries.indexOf(b)) {
  P.entries = P.entries.filter(x => x !== a); P.entries.splice(P.entries.indexOf(b), 0, a); reindex(P); n++; A.push('steel pan 65917 moves before steelpan 10609 in row order: the first synonym of steel drum is the familiar steel pan (flag 512)'); } }
M(6025, 'timpani', 6026, 'kettledrums', 'synonym', 3, 'the same drums (grouped with timpani in four themes)');
M(6025, 'timpani', 51400, 'kettle drum', 'synonym', 3, 'one of the timpani (grouped with timpani and kettledrums in drums)', { del: 'as an alias its text would repeat drum in drums (theme-name); timpani and its alias kettledrums stay' });
M(10552, 'tin whistle', 10553, 'penny whistle', 'synonym', 3, 'the same whistle (grouped in four themes)');
M(10565, 'panpipes', 10564, 'pan flute', 'synonym', 3, 'the same instrument (grouped)');
M(10672, 'zampona', 51559, 'zamponia', 'spelling', 5, 'one word written two ways (zampoña)');
M(10554, 'English horn', 10555, 'cor anglais', 'regional', 4, 'the UK name of the English horn (grouped); UK players see it', { region: ['UK'] });
M(10741, 'pick', 10740, 'plectrum', 'synonym', 3, 'the same guitar pick (grouped)');
M(10724, 'whammy bar', 10725, 'tremolo arm', 'synonym', 4, 'the same bar (grouped)');
// dance, art, theater, film, books, shows, buildings
{ const r = has(6245); if (r && r.typ.arabic_music_words !== undefined) unlinkE(r, 'arabic_music_words', 'the dance, not a music word (it becomes the Arabic name of belly dance)'); }
M(6244, 'belly dance', 6245, 'raqs sharqi', 'translation', 5, 'the Arabic name of belly dance (grouped as one answer in three themes)');
M(6359, 'dada', 6358, 'dadaism', 'synonym', 4, 'the same movement (grouped)');
M(6289, 'brush', 12016, 'paintbrush', 'synonym', 1, 'the same brush (grouped in art materials); the themes it brings show "paintbrush"', { keepShow: true });
M(14031, 'prayer rug', 14032, 'prayer mat', 'synonym', 2, 'the same rug (grouped)');
M(22724, 'Dreamtime', 34428, 'Dreaming', 'synonym', 4, 'the same Aboriginal belief (grouped)');
M(11062, 'orchestra pit', 12299, 'pit', 'synonym', 3, 'the same pit (grouped)');
M(12291, 'safety curtain', 12292, 'iron curtain', 'synonym', 3, 'the same theater curtain (grouped)');
M(12441, 'Beijing opera', 12440, 'Peking opera', 'synonym', 3, 'the same opera (grouped)');
M(6380, 'sitcom', 6381, 'situation comedy', 'synonym', 3, 'the full form of sitcom (grouped)', { del: 'as an alias its text would repeat comedy in comedy words (theme-name)' });
M(6382, 'soap opera', 6383, 'soap', 'synonym', 2, 'the short form of soap opera (grouped; contract-type-common)');
M(6427, 'laugh track', 6428, 'canned laughter', 'synonym', 4, 'the same recorded laughter (grouped)');
M(6401, 'clapperboard', 6403, 'slate', 'synonym', 4, 'the same board (grouped)');
M(12605, 'police procedural', 12632, 'procedural', 'synonym', 4, 'the same genre (grouped)');
M(12599, 'reality TV', 6384, 'reality show', 'synonym', 2, 'the same genre (grouped)');
M(4612, 'news anchor', 4613, 'newscaster', 'synonym', 3, 'the same presenter (grouped)');
M(12876, 'smoke machine', 12877, 'fog machine', 'synonym', 2, 'the same machine (grouped)');
M(12753, 'Razzie', 59396, 'golden raspberry', 'synonym', 4, 'the same award (grouped)');
M(12410, 'Tony Award', 12749, 'Tony', 'synonym', 2, 'the same award (award words linked Tony Award shown Tony, entertainment awards linked Tony)', { keepShow: true });
M(52848, 'super strength', 52849, 'superhuman strength', 'synonym', 2, 'the same power (grouped)');
M(13804, 'living statue', 13805, 'human statue', 'synonym', 2, 'the same performer (grouped)');
M(13784, 'log flume', 13853, 'flume', 'synonym', 3, 'the same ride (grouped)');
M(6560, 'staircase', 6561, 'stairway', 'synonym', 2, 'the same stairs (grouped)');
M(14023, 'mihrab', 14042, 'prayer niche', 'synonym', 4, 'the English name of the mihrab (grouped)');
M(13926, 'Victorian', 67017, 'Victorian architecture', 'synonym', 3, 'the same style (house styles linked Victorian [architecture], architecture styles a second root shown Victorian)', { del: 'as an alias its text would repeat "architecture" in architecture styles (theme-name), and it was over 20 letters (long)' });
stubTo('european_folk_dances', 62850, 'morris', 6246, 'morris dance', 'morris', 'the same dance: the full term shown short, as in dance, dances and folk dances (contract-type-common)');
stubTo('european_folk_dances', 64436, 'maypole', 11799, 'maypole dance', 'maypole', 'the same dance: the full term shown short, as in folk dances');
stubTo('folk_dances', 11802, 'clog dancing', 52121, 'clog dance', 'clogging', 'the same dance: clog dance, shown clogging as in the other two dance themes');
stubTo('painting_words', 11917, 'trompe loeil', 6353, "trompe l'oeil", null, "the same term written without its apostrophe (trompe l'oeil is in art)");
stubTo('dances', 64433, 'tap', 6210, 'tap dance', 'tap', 'the dance is tap dance (tap [rhythm] stays in reversible words)');

// =================================================================================================
sec('4. Wrong senses');
{ const e = chk(35250, 'AIDA'); if (e.typ.famous_operas !== undefined) swap('famous_operas', e, newEntry('Aida', 'opera', { pos: 'noun', type: 'title', fam: 2 }, "Verdi's opera; AIDA [marketing] held the link"), 'the opera'); }
{ const c = chk(12416, 'cabaret'); if (c.typ.famous_musicals !== undefined || c.typ.one_word_musical_titles !== undefined) {
    const m = newEntry('Cabaret', 'musical', { pos: 'noun', type: 'title', fam: 2, tm: true }, 'the Kander and Ebb musical (cabaret [stage genre] held the link)');
    for (const t of ['famous_musicals', 'one_word_musical_titles']) swap(t, c, m, 'the musical'); }
  setE(c, 'gloss', 'stage genre', 'its text is now shared with Cabaret [musical]'); }
{ const h = chk(3770, 'hairspray'); if (h.typ.famous_musicals !== undefined || h.typ.one_word_musical_titles !== undefined) {
    const m = newEntry('Hairspray', 'musical', { pos: 'noun', type: 'title', fam: 2, tm: true }, 'the musical (hairspray [hair product] held the link)');
    for (const t of ['famous_musicals', 'one_word_musical_titles']) swap(t, h, m, 'the musical'); }
  setE(h, 'gloss', 'hair product', 'its text is now shared with Hairspray [musical]'); }
{ const f = chk(10960, 'freestyle'); if (f.typ.hip_hop_words !== undefined) swap('hip_hop_words', f, newEntry('freestyle', 'rap', { pos: 'noun', type: 'common', fam: 3 }, 'an improvised rap; freestyle [swimming] held the link'), 'the improvised rap'); }
{ const p = chk(11254, 'pan'); if (p.typ.camera_shots !== undefined) swap('camera_shots', p, newEntry('pan', 'camera move', { pos: 'noun', type: 'common', fam: 2 }, 'the camera turning sideways; pan [recording] (stereo panning) held the link'), 'the camera move'); }
setE(chk(10716, 'bridge'), 'gloss', 'instrument part', 'the part of a guitar or violin that holds the strings; "music" was vague beside bridge [song], the section of a song in music words (sense-link)');
outT('film_festivals', [[10850, 'fantasia']], 'fantasia [music] is the musical form, not the Fantasia film festival');
outT('dance_studio_words', [[4064, 'educator'], [4065, 'schoolteacher']], 'a schoolteacher, not a dance studio word (they were grouped with dance teacher)');

// =================================================================================================
{ const p = chk(1479, 'piglet'); if (p.typ.children_s_book_characters !== undefined) swap('children_s_book_characters', p, newEntry('Piglet', 'Pooh character', { pos: 'noun', type: 'proper', fam: 1 }, 'the Winnie the Pooh character (piglet [young pig] held the link)'), 'the Pooh character');
  setE(p, 'gloss', 'young pig', 'its text is now shared with Piglet [Pooh character]'); }
{ const c = chk(12691, 'colorist'); if (c.typ.comic_book_words !== undefined) { const ne = newEntry('colorist', 'comics', { pos: 'noun', type: 'common', fam: 5 }, 'the artist who colors comic pages; colorist [film colorist] held the link');
    swap('comic_book_words', c, ne, 'the comics colorist'); newAlias(ne.id, 'colourist', 'comics', 'spelling', 5, ['UK'], 'the UK spelling, as the other colorists'); } }
setE(chk(13869, 'casino night'), 'adult', true, 'gambling is adult (LIBRARY-RULES 4, Simon 2026-11-20); party entertainment keeps it as a word that never plays');

sec('5. Belonging');
outT('church_parts', [[6615, 'veranda']], 'a house veranda, not part of a church (it was grouped with porch)');
outT('mosque_parts', [[6565, 'quad']], 'a college courtyard, not part of a mosque (courtyard and sahn are there)');
outT('puppets', [[12362, 'puppet show'], [12363, 'puppeteer'], [12368, 'water puppetry']], 'not a puppet (a show, a person, an art form); the compound theme is kinds of puppet');
outT('architecture', [[34, 'castle']], 'castle [building] is a building, beside palace and cathedral at typicality 5: a member of buildings, not an architecture word');

// =================================================================================================
sec('6. Case, spelling, type, ratings, long words, alias kinds');
setE(chk(3346, 'audition'), 'fam', 2, 'nearly every adult knows the word (it had familiarity 5)');
retext(11768, 'tour en lair', "tour en l'air", 'the French term has an apostrophe');
for (const [id, from, to] of [[11761, 'chasse', 'chassé'], [11759, 'releve', 'relevé'], [11765, 'assemble', 'assemblé'], [11769, 'passe', 'passé'], [11772, 'demi-plie', 'demi-plié']]) {
  const e = E(id); if (e.text === from) { retext(id, from, to, 'the ballet terms keep their French accents, as plié, jeté and fouetté in the same theme (LIBRARY-RULES 5, rule 2: follow the siblings)');
    newAlias(id, from, '', 'spelling', e.fam, [], 'the plain form (rule 8)'); } }
retext(13964, 'I M Pei', 'I. M. Pei', 'the initials take periods (as T. S. Eliot)');
for (const [id, from, to] of [[12123, 'Campbells Soup Cans', "Campbell's Soup Cans"], [12118, 'Whistlers Mother', "Whistler's Mother"], [12135, 'Christinas World', "Christina's World"]])
  retext(id, from, to, 'the title has an apostrophe');
retext(13934, 'byzantine architecture', 'byzantine style', 'a shorter full term (22 letters was over the 20-letter limit: long); still shown "byzantine"');
retext(13946, 'Queen Anne architecture', 'Queen Anne style', 'a shorter full term (21 letters: long), the usual name of the style; still shown "Queen Anne"');
{ const a = ix.entry.get(14176); if (a && a.aliasOf === 14177) { delAlias(14176, 'louvred window', 'as an alias its text repeats "window" in window styles (theme-name)'); setShow(E(14177), 'window_styles', 'louvered', 'the US spelling, as the root (the UK spelling alias is gone)'); } }
for (const [id, text] of [[11319, '8-track'], [51426, 'djun-djun']]) { const a = ix.entry.get(id); if (a && a.aliasOf && a.text === text) setE(a, 'aliasKind', 'synonym', 'not a spelling of the root but another name or form (alias-kind-suspect)'); }
for (const e of P.entries.filter(e => !e.aliasOf && e.type === 'phrase' && e.pos === 'noun' && e.id !== 7048 && e.id !== 6240 && linkIds(P, e).some(t => inGroup(t))))
{ setE(e, 'type', 'common', 'a noun, not an idiom (LIBRARY-RULES 4: type phrase is for idioms and set phrases only)');
    for (const al of P.entries.filter(x => x.aliasOf === e.id && ['spelling', 'form'].includes(x.aliasKind) && x.type === 'phrase')) setE(al, 'type', 'common', 'typed like its root (a spelling or form alias)'); }

// =================================================================================================
delAlias(2478, 'picture house', 'an old UK synonym (familiarity 4) that was the first synonym of movie theater (familiarity 1), shown at some levels (flag 512); UK players see cinema, its UK regional alias');
delAlias(51974, 'Farrokh Bulsara', 'his birth name (familiarity 5) was the first synonym of Freddie Mercury (familiarity 1), shown at some levels (flag 512); v433 made it an alias (For Simon)');

// =================================================================================================
sec('7. Orphans that belong here (batch433-review: left for step 3)');
{ const e = has(11927); if (e && e.text === 'oil on canvas') linkE(e, 'painting_words', 3, 'the medium and support of most paintings'); }
{ const e = has(13118); if (e && e.text === 'Shonen Jump') linkE(e, 'anime_and_manga_words', 4, 'the best-known manga magazine'); }
{ const e = has(10905); if (e && e.text === 'bollywood' && !linkIds(P, e).length) delE(10905, 'bollywood', 'a lowercase second root of Bollywood music 51757; in no theme'); }

// =================================================================================================
sec('8. First synonym alias (game flag 512): no harder than the root + 1');
{ const syn = new Map(); for (const e of P.entries) if (e.aliasOf && e.aliasKind === 'synonym') { if (!syn.has(e.aliasOf)) syn.set(e.aliasOf, []); syn.get(e.aliasOf).push(e); }
  let all = 0, bad = 0;
  for (const [rid, list] of syn) { const r = ix.entry.get(rid); if (!linkIds(P, r).some(t => inGroup(t))) continue; all++;
    if (list[0].fam > r.fam + 1) { bad++; A.push(`  STILL TOO HARD: ${lab(r)} f${r.fam}: first synonym ${lab(list[0])} f${list[0].fam}`); } }
  A.push(`  roots linked in the group with synonym aliases: ${all}; first synonym harder than root + 1: ${bad} (the merges of this batch chose kinds, row order or deletions so that none is too hard)`); }
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
const summary = [`Library batch v443: tidy-up step 3, Arts & Entertainment (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.renamed} renamed, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch443-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch443-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch443-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

// Library batch v441: tidy-up step 3 (TIDY-UP.md), the Home & Everyday group: every theme under home_everyday read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v439. Applied after v440 (People & Society): everything here works by entry id + text and theme id, never by position,
// and every step is skipped when it is already done (rerun: 0 changes). A merge that another batch has already made is skipped.
//   1. Twins and the tree: kitchen electricals and table types deleted (near-twins of kitchen appliances and tables and desks); heating and
//      cooling loses the fireplace parts and tools; fireplace words renamed "around the fireplace".
//   2. Two roots of one sense merged (stubs, spellings, plurals, short names, translations).
//   3. Regional roots (region-root-equiv): regional words grouped with their same-sense word become its aliases; pairs Simon called
//      different (v413) are ungrouped; US roots of a regional pair untagged; pants (trousers) gets its right region.
//   4. plaster -> adhesive bandage (UK plaster, US Band-Aid), with band-aids and plaster [bandage].
//   5. Wrong senses and stubs; 6. belonging; 7. case, type, alias kinds; 8. first synonyms the game shows.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch441.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const GROUP = 'home_everyday';
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
let mergeInto = (keepId, keepText, goneId, goneText, kind, fam, why, o = {}) => {
  const gone = ix.entry.get(goneId), keep0 = ix.entry.get(keepId);
  if (!gone || !keep0) { A.push(`  (skipped: ${goneText} ${goneId} into ${keepText} ${keepId}: ${!gone ? goneText : keepText} is gone already)`); return; }
  if (gone.aliasOf === keepId) return;
  if (keep0.aliasOf === goneId || gone.aliasOf) { A.push(`  (skipped: ${goneText} ${goneId} into ${keepText} ${keepId}: another batch has merged them already)`); return; }
  const keep = chk(keepId, keepText); chk(goneId, goneText);
  if (o.pre) o.pre();
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
      if (o.nameOk || o.show?.[tid]) {   // the theme shows the keep's own text or a given short text, never the alias's text (LIBRARY-RULES 4, show)
        if (o.show?.[tid]) keep.show = { ...(keep.show || {}), [tid]: o.show[tid] };
        reindex(P); if (leakOf(keep, tid)) keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), tid])];
      } else {
        const gs = gone.show?.[tid] || gone.text;
        if (gs !== keep.text && (o.keepShow || gone.show?.[tid]) && !keep.show?.[tid]) keep.show = { ...(keep.show || {}), [tid]: gs };
        if (keep.show?.[tid] === keep.text) { keep.show = { ...keep.show }; delete keep.show[tid]; }
        reindex(P);
        if (leakOf(keep, tid)) {
          if (!nameLeak(t, { ...gone, text: gs, nameOkIn: [] }) && gs !== keep.text) keep.show = { ...(keep.show || {}), [tid]: gs };
          else keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), tid])];
        }
      }
    } else if (typ < keep.typ[tid]) { rated.push(`${tid} ${keep.typ[tid]} -> ${typ}`); keep.typ[tid] = typ; }
    const gs2 = (t.groups || []).map(g => g.includes(goneId) ? [...new Set(g.map(id => id === goneId ? keepId : id))] : g);
    const hit = gs2.filter(g => g.includes(keepId));
    t.groups = [...gs2.filter(g => !hit.includes(g)), ...(hit.length ? [[...new Set(hit.flat())]] : [])].filter(g => g.length > 1);
  }
  n++; counts.merged++;
  if ((gone.kin || []).length) {
    if (gone.text === keep.text || ['spelling', 'form'].includes(kind) || o.keepKin) { A.push(`  kin of ${lab(gone)} moves to ${lab(keep)}: ${gone.kin.map(id => lab(E(id))).join(', ')}`); moveKin(P, gone, keep); }
    else { A.push(`  kin of ${lab(gone)} dropped (it was the word family of ${gone.text}, not of ${keep.text}): ${gone.kin.map(id => lab(E(id))).join(', ')}`); for (const id of [...gone.kin]) setKin(P, gone, E(id), false); }
  }
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
const AL = (rid, text) => P.entries.find(a => a.aliasOf === rid && a.text === text);
const kindA = (rid, text, kind, why) => { const a = AL(rid, text); if (a) setE(a, 'aliasKind', kind, why); };
const delAlias = (rid, text, why) => {
  const a = AL(rid, text); if (!a) return;
  for (const x of P.entries) if (x.use) for (const [t, id] of Object.entries(x.use)) if (id === a.id) delete x.use[t];
  P.entries = P.entries.filter(x => x !== a); reindex(P); n++; deleted.push(lab(a));
  A.push(`deleted alias ${lab(a)}${a.gloss ? ' [' + a.gloss + ']' : ''} of ${lab(E(rid))}: ${why}`);
};
const untag = (id, text, why) => { const e = ix.entry.get(id); if (!e || e.aliasOf) return; chk(id, text); setE(e, 'region', [], why); };
const retype = (id, text, type, why) => { const e = ix.entry.get(id); if (e) setE(chk(id, text), 'type', type, why); };
const newAlias = (rid, text, gloss, kind, fam, region, why) => { const r = E(rid);
  return newEntry(text, gloss, { aliasOf: rid, aliasKind: kind, fam, region, pos: r.pos, type: r.type, adult: !!r.adult, sensitive: !!r.sensitive, offensive: !!r.offensive, tm: kind === 'spelling' ? !!r.tm : false }, why); };
const merged = id => { const e = ix.entry.get(id); return !e || !!e.aliasOf; };
const ungroup = (tid, ids, why) => { for (const id of ids) leaveGroup(tid, id, why); };
const inGroupE = e => linkIds(P, e).some(t => ix.theme.has(t) && inGroup(t));
const DEL_LEAK = new Set([23172, 23534, 4839, 23688, 24877, 24881, 25784, 14168, 24107, 55447, 24768, 62788, 64322, 4997, 25711, 25717, 25618, 55644]);
// obscure words that would be the root's first synonym (the game shows it at some levels): deleted once their links have moved
const DEL_OBSCURE = new Set([4575, 24384, 23502, 25258, 25407]);
{ const mi = mergeInto; mergeInto = (k, kt, g, gt, kind, fam, why, o = {}) => mi(k, kt, g, gt, kind, fam, why, DEL_OBSCURE.has(g) && !o.del ? { ...o, del: 'as a synonym alias it would be the first synonym of a well-known root, which the game shows at some levels; the word is too obscure for that' } : DEL_LEAK.has(g) && !o.del ? { ...o, del: 'as an alias its text would hold a word of the name of a theme its root is in (theme-name)' } : o); }
const PHRASE_WHY = 'the name of a thing or an action, not an idiom: type phrase is for idioms and set phrases only (LIBRARY-RULES 4; v438 precedent)';

// =================================================================================================
sec('1. Twins and the tree');
// kitchen electricals: 23 of its 25 words are in appliances, 20 in kitchen appliances (theme-twin)
{ if (ix.theme.has('kitchen_gadgets')) {
    linkE(chk(23612, 'hot plate'), 'kitchen_appliances', 3, 'from kitchen electricals, which is deleted');
    linkE(chk(4784, 'popcorn maker'), 'kitchen_appliances', 4, 'from kitchen electricals, which is deleted');
    dropTheme('kitchen_gadgets', 'kitchen electricals shared 23 of its 25 words with appliances and 20 with its near-twin kitchen appliances (theme-twin); its other words (hot plate, popcorn maker) move to kitchen appliances');
  } }
// table types: 7 of its 8 words are in tables and desks (theme-twin)
{ if (ix.theme.has('table_types')) {
    linkE(chk(25809, 'tea table'), 'tables_and_desks', 4, 'from table types, which is deleted', { show: 'tea' });
    dropTheme('table_types', 'shared 7 of its 8 words with tables and desks (theme-twin), the theme of table kinds shown short; tea table moves there');
  } }
// heating and cooling held the fireplace's tools and parts, which are the theme fireplace words (xwords-twin 39%)
out('heating_and_cooling', [[23584, 'hearth'], [23109, 'mantelpiece'], [50022, 'grate'], [62524, 'kindle'], [23589, 'bellows'], [23586, 'fire screen'], [23590, 'flue'], [23588, 'andirons'], [2915, 'firebox'], [23591, 'log basket'], [23585, 'fire poker']],
  'a part or tool of the fireplace, not a way of heating or cooling a home: it is in the sub-theme fireplace words (xwords-twin: they shared 39%)');
setT('fireplace_words', 'name', 'around the fireplace', 'the members are things at the fireplace (logs, poker, grate, bellows), not words for talking about it (LIBRARY-RULES 6: an "X words" theme is named for what it holds)');

// =================================================================================================
sec('2. Two roots of one sense');
// stubs and short second roots
mergeInto(4676, 'nightstand', 64796, 'bedside', 'synonym', 4, 'a bare stub of bedside table (the UK alias of nightstand), grouped with it as one answer in furniture and bedroom', { del: 'a stub: nightstand has the alias bedside table' });
mergeInto(4708, 'secretary desk', 64797, 'secretary', 'synonym', 3, 'the same fold-down desk, grouped with it as one answer in furniture and antique furniture', { gloss: 'fold-down desk' });
mergeInto(4688, 'daybed', 23534, 'day bed', 'spelling', 3, 'the same bed written open (Merriam-Webster and Oxford: daybed)');
mergeInto(4695, 'wingback chair', 23409, 'wingback', 'synonym', 4, 'the short name of the wingback chair, a stub made for seating');
mergeInto(4695, 'wingback chair', 23533, 'wing chair', 'synonym', 4, 'another name of the wingback chair');
mergeInto(14031, 'prayer rug', 14032, 'prayer mat', 'synonym', 2, 'the same rug, grouped as one answer in rugs and carpets');
mergeInto(4781, 'immersion blender', 4783, 'hand blender', 'synonym', 3, 'the same blender (its UK alias is stick blender), grouped as one answer in every theme it was in');
mergeInto(4761, 'bread maker', 4762, 'bread machine', 'synonym', 2, 'the same machine, grouped as one answer in every theme it was in');
mergeInto(4756, 'waffle iron', 4757, 'waffle maker', 'synonym', 2, 'the same appliance, grouped as one answer in every theme it was in');
mergeInto(4755, 'deep fryer', 23538, 'deep fat fryer', 'regional', 3, 'the UK name of the deep fryer: its UK regional alias', { region: ['UK'] });
mergeInto(4773, 'range hood', 23537, 'extractor hood', 'synonym', 4, 'the same hood (its UK regional alias is cooker hood)', { region: ['UK'] });
delAlias(4773, 'extractor fan', 'an extractor fan is the bathroom fan (exhaust fan, whose UK alias it is), not the range hood');
mergeInto(23602, 'sandwich maker', 4788, 'toastie maker', 'synonym', 3, 'the same appliance (a toastie is a toasted sandwich)', { region: ['UK', 'AU', 'IE'] });
mergeInto(4851, 'drawknife', 4852, 'drawshave', 'synonym', 5, 'another name of the drawknife, grouped as one answer in every theme it was in');
mergeInto(55278, 'handsaw', 4839, 'hand saw', 'spelling', 2, 'one word written two ways (Merriam-Webster and Oxford: handsaw)');
mergeInto(40290, 'bandsaw', 23688, 'band saw', 'spelling', 3, 'one word written two ways');
delAlias(23270, 'drawing pins', 'the plural of drawing pin, which thumbtack has already');
mergeInto(23714, 'thumbtack', 23270, 'thumbtacks', 'form', 3, 'the plural of thumbtack, a second root (its UK alias drawing pins is the plural of drawing pin)');
mergeInto(7392, 'screw', 39029, 'screw', 'synonym', 1, 'screw [fastener] and screw [hardware] are one sense');
mergeInto(23393, "plumber's tape", 23789, 'ptfe tape', 'synonym', 4, 'the same tape (PTFE tape), grouped as one answer in plumbing words');
mergeInto(23817, 'silicone', 61457, 'silicone sealant', 'synonym', 3, 'silicone [sealant] is the same sealant');
mergeInto(23886, 'laundry basket', 65827, 'hamper', 'synonym', 2, 'hamper [clothes] is the laundry basket', { nameOk: true, del: 'laundry basket has the alias hamper [US] already' });
mergeInto(24007, 'dish rack', 24019, 'dish drainer', 'synonym', 3, 'the same rack, grouped as one answer in washing up');
mergeInto(67038, 'hip roof', 14109, 'hipped roof', 'regional', 4, 'the same roof, grouped as one answer in roof parts', { region: ['UK'] });
out('parts_of_a_door', [[24107, 'window ledge']], 'a window part, not a door part');
mergeInto(24106, 'windowsill', 24107, 'window ledge', 'synonym', 2, 'the same ledge, grouped as one answer in windows and doors');
mergeInto(66888, 'door knocker', 28557, 'knocker', 'synonym', 2, 'the same knocker (door knocker shows "knocker" in parts of a door)', { keepKin: true });
mergeInto(24279, 'carbon monoxide alarm', 24280, 'co detector', 'synonym', 3, 'the same alarm, grouped as one answer in home safety');
mergeInto(24453, 'boiler suit', 4908, 'boilersuit', 'spelling', 3, 'one word written two ways (both in work clothes, grouped)', { region: ['UK'] });
mergeInto(4885, 'tuxedo', 4886, 'tux', 'abbreviation', 2, 'the short form of tuxedo, grouped as one answer in clothes');
mergeInto(4885, 'tuxedo', 64798, 'dinner', 'synonym', 3, 'a stub of dinner jacket, the UK alias of tuxedo', { del: 'a stub: tuxedo has the alias dinner jacket' });
mergeInto(4898, 'tracksuit', 4900, 'jogging suit', 'synonym', 3, 'the same suit, grouped as one answer in clothes');
mergeInto(4928, 'gilet', 4929, 'bodywarmer', 'synonym', 4, 'the same sleeveless jacket, grouped as one answer in clothes and coats and jackets', { region: ['UK'] });
mergeInto(24332, 'palazzo pants', 64233, 'palazzos', 'synonym', 4, 'the short name of palazzo pants, grouped as one answer in pants and shorts');
mergeInto(4914, 'cargo pants', 62787, 'cargos', 'synonym', 3, 'the short name of cargo pants, grouped as one answer in pants and shorts');
mergeInto(24334, 'board shorts', 64231, 'boardies', 'synonym', 4, 'Australian slang for board shorts', { region: ['AU'], nameOk: true });
mergeInto(23187, 'wedding dress', 62788, 'wedding gown', 'synonym', 2, 'the same dress');
mergeInto(23187, 'wedding dress', 64322, 'bridal gown', 'synonym', 2, 'the same dress');
mergeInto(24387, 'sports jacket', 24388, 'sports coat', 'synonym', 3, 'the same jacket, grouped as one answer in coats and jackets');
mergeInto(55422, 'Hawaiian shirt', 55421, 'aloha shirt', 'synonym', 2, 'the same shirt, grouped as one answer in Pacific Island clothing');
mergeInto(24448, 'grass skirt', 55429, 'hula skirt', 'synonym', 3, 'the same skirt, grouped as one answer in Pacific Island clothing');
mergeInto(24469, 'swimsuit', 24478, 'bathing suit', 'synonym', 2, 'the same swimsuit, grouped as one answer in swimwear');
mergeInto(24630, 'flats', 24631, 'ballet flats', 'synonym', 2, 'the same shoes, grouped as one answer in shoes');
mergeInto(24644, 'boat shoes', 24643, 'deck shoes', 'regional', 3, 'the same shoes, grouped as one answer in shoes', { region: ['UK'] });
mergeInto(24455, 'steel-toe boots', 65833, 'steel-toes', 'synonym', 3, 'the short name of steel-toe boots');
mergeInto(24684, 'panama', 55447, 'panama hat', 'synonym', 2, 'panama [hat] is the panama hat');
mergeInto(23064, 'cloche hat', 24695, 'cloche', 'synonym', 4, 'cloche [hat] is the cloche hat');
mergeInto(55124, 'Phrygian cap', 55484, 'liberty cap', 'synonym', 5, 'another name of the Phrygian cap, grouped as one answer in historical hats');
mergeInto(67140, 'grocery bag', 28261, 'carrier', 'synonym', 2, 'carrier [bag] is the carrier bag (the UK alias of grocery bag), grouped with shopping bag in bags (reviewer)', { region: ['UK'], show: { bags: 'grocery' } });
mergeInto(24713, 'duffel bag', 28264, 'duffel', 'synonym', 2, 'the same bag (same-display: both showed "duffel" in bags)');
mergeInto(4996, 'keychain', 4997, 'key ring', 'synonym', 2, 'the same ring (its UK alias keyring is the same word), grouped as one answer in accessories');
mergeInto(24491, 'mittens', 24778, 'mitts', 'synonym', 2, 'the same mittens, grouped as one answer in scarves and gloves');
mergeInto(24766, 'evening gloves', 24768, 'opera gloves', 'synonym', 4, 'the same gloves, grouped as one answer in scarves and gloves');
mergeInto(23330, 'reading glasses', 24800, 'readers', 'synonym', 3, 'the short US name of reading glasses, grouped as one answer in eyewear', { region: ['US'], keepKin: true });
mergeInto(24782, 'glasses', 24783, 'spectacles', 'synonym', 2, 'the formal name of glasses, grouped as one answer in eyewear');
mergeInto(24782, 'glasses', 24804, 'eyeglasses', 'synonym', 2, 'the US name of glasses, grouped as one answer in eyewear (region-root-equiv)', { region: ['US'] });
mergeInto(4965, 'headband', 24807, 'hairband', 'synonym', 2, 'the same band, grouped as one answer in hair accessories');
delAlias(23322, 'Kirby grips', 'the plural of Kirby grip, which bobby pin has already');
mergeInto(3799, 'bobby pin', 23322, 'bobby pins', 'form', 3, 'the plural of bobby pin, a second root');
// necktie stays a root, grouped with tie in neckwear (reviewer: as an alias, tie in the locked theme starts with a body part showed "tie")
mergeInto(5067, 'pinking shears', 5068, 'pinking scissors', 'synonym', 4, 'the same shears, grouped as one answer in every theme it was in');
mergeInto(5033, 'cross-stitch', 24877, 'cross stitch', 'spelling', 3, 'one word written two ways');
mergeInto(5096, 'whipstitch', 24881, 'whip stitch', 'spelling', 5, 'one word written two ways');
mergeInto(5071, 'bias tape', 24874, 'bias binding', 'regional', 4, 'the same tape (bias binding is the UK name)', { region: ['UK'] });
mergeInto(24869, 'terrycloth', 55492, 'terry cloth', 'spelling', 3, 'one word written two ways, grouped as one answer in cotton fabrics');
mergeInto(5058, 'pincushion', 55546, 'pin cushion', 'spelling', 3, 'one word written two ways');
mergeInto(24982, 'snap', 55554, 'snaps', 'form', 2, 'the plural of snap [fastener], a second root');
mergeInto(24923, 'houndstooth', 24936, 'dogtooth', 'synonym', 4, 'the UK name of houndstooth, grouped as one answer in fabric prints', { region: ['UK'] });
mergeInto(24923, 'houndstooth', 24947, 'pied-de-poule', 'translation', 5, 'the French name of houndstooth, grouped as one answer in fabric prints');
mergeInto(55556, 'scoop neck', 55557, 'scoop', 'synonym', 2, 'a stub of scoop neck, grouped with it as one answer in necklines', { del: 'a bare stub (LIBRARY-RULES 5)' });
mergeInto(55561, 'halter neck', 55562, 'halter', 'synonym', 2, 'a stub of halter neck, grouped with it as one answer in necklines', { del: 'a bare stub (LIBRARY-RULES 5)' });
mergeInto(55558, 'boat neck', 55559, 'bateau', 'translation', 4, 'the French name of the boat neck, grouped as one answer in necklines');
mergeInto(5128, 'Lunar New Year', 64799, 'Lunar', 'synonym', 3, 'a stub of Lunar New Year', { del: 'a bare stub (LIBRARY-RULES 5)' });
mergeInto(5118, 'Passover', 5119, 'Pesach', 'translation', 4, 'the Hebrew name of Passover, grouped as one answer wherever both were linked');
mergeInto(5145, 'Day of the Dead', 5146, 'Día de los Muertos', 'translation', 3, 'the Spanish name of the Day of the Dead, grouped as one answer wherever both were linked');
unlinkE(chk(5145, 'Day of the Dead'), 'day_of_the_dead', 'the theme itself (it came with Día de los Muertos; is-theme-name)');
kindA(5145, 'Dia de los Muertos', 'translation', 'the plain form of the Spanish name (moved with it)');
mergeInto(5170, 'Dussehra', 5171, 'Vijayadashami', 'synonym', 5, 'another name of Dussehra, grouped as one answer wherever both were linked');
mergeInto(5131, 'Bonfire Night', 5132, 'Guy Fawkes Night', 'synonym', 3, 'the same night, grouped as one answer in holidays and celebrations', { region: ['UK'] });
mergeInto(21965, 'Ganesh', 21967, 'Ganapati', 'synonym', 4, 'another name of Ganesh, grouped as one answer in Diwali');
mergeInto(25231, 'firecracker', 25248, 'cracker', 'abbreviation', 3, 'cracker [firework] is a firecracker, grouped as one answer in fireworks');
mergeInto(20473, 'gunpowder', 25250, 'black powder', 'synonym', 3, 'the same powder, grouped as one answer in fireworks');
mergeInto(25235, 'fountain', 25258, 'gerb', 'synonym', 5, 'the pyrotechnic name of the fountain firework, grouped as one answer in fireworks (region-root-equiv)', { region: ['UK'] });
mergeInto(4525, 'lunchbox', 25509, 'lunch box', 'spelling', 1, 'one word written two ways');
mergeInto(4991, 'tote bag', 25486, 'tote', 'synonym', 2, 'tote [bag] is the tote bag');
mergeInto(39989, 'aluminum foil', 39990, 'tin foil', 'synonym', 1, 'the everyday name of aluminum foil, grouped as one answer in food storage');
mergeInto(3058, 'guy rope', 3059, 'guy line', 'synonym', 3, 'the same line, grouped as one answer in cords and strings');
mergeInto(25562, 'parchment paper', 28323, 'greaseproof', 'synonym', 3, 'a stub of greaseproof paper (the UK alias of parchment paper)', { del: 'a stub: parchment paper has the alias greaseproof paper' });
mergeInto(23138, 'toilet paper', 65858, 'toilet roll', 'synonym', 1, 'the same paper', { region: ['UK'], nameOk: true });
mergeInto(49491, 'instant camera', 64818, 'instant', 'synonym', 4, 'a stub of instant camera', { del: 'a bare stub (LIBRARY-RULES 5)' });
mergeInto(4795, 'mangle', 25654, 'wringer', 'synonym', 4, 'the same machine, grouped as one answer in retro household items');
mergeInto(25656, 'bed warmer', 61442, 'bedwarmer', 'spelling', 4, 'one word written two ways');
mergeInto(20162, 'gravy boat', 55856, 'sauce boat', 'synonym', 3, 'the same jug, grouped as one answer in serving dishes');
mergeInto(19813, 'casserole dish', 64324, 'casserole', 'synonym', 2, 'casserole [oven vessel] is the casserole dish (sense-twin with casserole [dish], the food)', { del: 'its text would be a second "casserole" beside the food; casserole dish shows "casserole" in serving dishes' });
mergeInto(19827, 'tagine', 55863, 'tagine', 'synonym', 3, 'tagine [pot] and tagine [cookware] are one sense (sense-twin)');
mergeInto(25712, 'door chain', 25711, 'chain lock', 'synonym', 3, 'the same chain, grouped as one answer in locks and keys');
mergeInto(25716, 'bike lock', 25717, 'bicycle lock', 'synonym', 1, 'the same lock, grouped as one answer in locks and keys');
mergeInto(25708, 'lock pick', 25709, 'lockpick', 'spelling', 3, 'one word written two ways (an orphan)');
delAlias(67223, 'hair straighteners', 'the plural; hair straightener needs no UK alias (it is the UK word)');
mergeInto(3793, 'hair straightener', 67223, 'flat iron', 'regional', 3, 'flat iron [hair] is the US name of the hair straightener', { del: 'hair straightener has the alias flat iron [US] already' });
mergeInto(61492, 'garage door opener', 23172, 'garage opener', 'synonym', 3, 'the same opener');
mergeInto(7298, 'router', 23225, 'router', 'synonym', 2, 'router [internet] and router [network] are one sense');
mergeInto(24375, 'duffel coat', 25783, 'duffle coat', 'spelling', 3, 'one word written two ways (Oxford: duffel coat, also duffle coat)');
mergeInto(24380, 'peacoat', 25784, 'pea coat', 'spelling', 3, 'one word written two ways');
mergeInto(4694, 'four-poster bed', 25808, 'four-poster', 'synonym', 3, 'the short name of the four-poster bed');
mergeInto(25810, 'sun lounger', 23410, 'lounger', 'synonym', 3, 'lounger [sun] is the sun lounger');
mergeInto(23986, 'curbside pickup', 32212, 'curbside collection', 'synonym', 3, 'the same collection (an orphan since v433)', { region: ['US'] });
mergeInto(23991, 'deposit return', 32211, 'deposit scheme', 'synonym', 3, 'the same scheme (an orphan since v433)', { region: ['UK'] });
mergeInto(20744, 'chandler', 25618, 'candle maker', 'synonym', 2, 'a chandler is a candle maker (an orphan since v433)');
mergeInto(24109, 'French doors', 14168, 'French door', 'form', 2, 'the singular of French doors (an orphan since v433)');
mergeInto(24465, 'toque', 24619, 'tuque', 'spelling', 5, 'the same Canadian winter hat (grouped as one answer in winter clothes)', { del: 'toque has the spelling alias tuque already' });

// =================================================================================================
sec('3. Regional roots (region-root-equiv, contract-root-region)');
mergeInto(6390, 'remote', 6389, 'remote control', 'synonym', 1, 'the same device (remote is the short form people use, LIBRARY-RULES 5), grouped as one answer in every theme of the group');
mergeInto(6390, 'remote', 6392, 'zapper', 'synonym', 4, 'UK slang for the remote, grouped as one answer wherever both were linked: a synonym keeping its tag (region-root-equiv)', { region: ['UK'] });
mergeInto(4572, 'television', 4575, 'tube', 'synonym', 3, 'US slang for the television, grouped as one answer wherever both were linked; its UK alias telly moves to television (region-root-equiv)', { region: ['US'] });
mergeInto(23500, 'cushions', 23116, 'throw pillow', 'synonym', 2, 'the US name of a cushion, grouped as one answer in living room and home decor; cushion is said in the US too, so a synonym (region-root-equiv)', { region: ['US'] });
kindA(23500, 'scatter cushion', 'synonym', 'moved with throw pillow; cushion is the UK everyday word, so scatter cushion is not the display alias');
mergeInto(23234, 'letter tray', 23228, 'in-tray', 'regional', 3, 'the UK name of the letter tray, grouped as one answer in home office (region-root-equiv)', { region: ['UK'] });
unlinkE(chk(6616, 'stoop'), 'church_parts', 'wrong sense: the church basin for holy water is a stoup, not the front steps (listed for Arts & Entertainment)');
leaveGroup('parts_of_a_house', 6616, 'a stoop is the raised platform at a US front door, not the doorstep (reviewer): it stays a US root, not one answer with doorstep');
mergeInto(23392, 'shutoff valve', 23381, 'stop valve', 'synonym', 4, 'the same valve, grouped as one answer in under the sink (region-root-equiv); shutoff valve stays the root and loses its US tag (its UK alias is stopcock)');
mergeInto(23918, 'descaler', 23391, 'limescale remover', 'synonym', 3, 'the UK name of descaler, grouped as one answer in under the sink and cleaning products (region-root-equiv)', { region: ['UK'] });
mergeInto(23418, 'side table', 23419, 'end table', 'regional', 2, 'the US name of a side table, grouped as one answer in tables and desks (region-root-equiv)', { region: ['US'] });
mergeInto(23490, 'torchiere', 23488, 'uplighter', 'regional', 4, 'the UK name of the torchiere, grouped as one answer in lights and lamps (region-root-equiv)', { region: ['UK'] });
mergeInto(12242, 'curtain', 23502, 'drapes', 'synonym', 3, 'the US name of (heavy) curtains, grouped as one answer in soft furnishings and window coverings (region-root-equiv)', { region: ['US'] });
delAlias(62781, 'blind', 'a blind is a roller blind, which shade [blind] now becomes the US alias of');
mergeInto(23520, 'roller blind', 62781, 'shade', 'regional', 2, 'shade [blind] is the US name of the roller blind (its UK alias "blind" sat beside blinds and roller blind in window coverings)', { region: ['US'] });
mergeInto(11320, 'hi-fi', 11321, 'music centre', 'synonym', 3, 'the UK name of an all-in-one hi-fi, grouped as one answer wherever both were linked (region-root-equiv)', { region: ['UK'] });
kindA(11320, 'music center', 'synonym', 'the US spelling of music centre, not the US everyday word for a hi-fi');
mergeInto(12831, 'set-top box', 23564, 'cable box', 'regional', 3, 'the US name of the set-top box, grouped as one answer in home electronics (region-root-equiv)', { region: ['US'] });
mergeInto(23653, 'wall socket', 23654, 'outlet', 'regional', 2, 'outlet [electrical] is the US name of the wall socket, grouped as one answer in electrical fittings; its UK and Australian aliases socket and power point move to wall socket (region-root-equiv)', { region: ['US'] });
mergeInto(330, 'awl', 4841, 'bradawl', 'synonym', 4, 'the UK name of the small awl, grouped as one answer in tools and hand tools (region-root-equiv)', { region: ['UK'] });
mergeInto(4918, 'raincoat', 24384, 'mackintosh', 'synonym', 3, 'the UK name of a raincoat, grouped as one answer in rain gear (region-root-equiv); words named after people shows "mackintosh"', { region: ['UK'], keepShow: true });
mergeInto(24605, 'rainwear', 24599, 'waterproofs', 'synonym', 3, 'the UK name of rainwear, grouped as one answer in rain gear (region-root-equiv)', { region: ['UK'] });
mergeInto(24483, 'swim briefs', 24488, 'budgie smugglers', 'synonym', 4, 'Australian slang for swim briefs, grouped as one answer in swimwear (region-root-equiv)', { region: ['AU'] });
mergeInto(24577, 'no-show socks', 24576, 'trainer socks', 'regional', 3, 'the UK name of no-show socks, grouped as one answer in socks and hosiery (region-root-equiv)', { region: ['UK'] });
mergeInto(57995, 'hearing protection', 24463, 'ear defenders', 'synonym', 4, 'the UK name of hearing protection, grouped as one answer in lab safety gear (region-root-equiv)', { region: ['UK'] });
mergeInto(25379, 'planner', 25407, 'datebook', 'synonym', 4, 'the US name of a planner, grouped as one answer in clocks and calendars (region-root-equiv)', { region: ['US'] });
{ const tw = ix.entry.get(25281); if (tw) { chk(25281, 'two weeks');
  for (const tid of ['days_and_weeks', 'time_units']) leaveGroup(tid, 25280, 'fortnight and two weeks were one answer');
  for (const tid of linkIds(P, tw)) unlinkE(tw, tid, 'a phrase used everywhere, not a word or a time unit (v413, Simon: fortnight is the word)');
  delE(25281, 'two weeks', 'a phrase, not a word; fortnight stays a regional root (v413; reviewer)'); } }
mergeInto(55686, 'Festival of Colors', 55688, 'Phagwah', 'translation', 5, 'the Caribbean name of Holi, the Festival of Colors, grouped as one answer in Holi (region-root-equiv)', { region: ['GY', 'TT'] });
mergeInto(55696, 'Moon Festival', 55702, 'Tet Trung Thu', 'translation', 5, 'the Vietnamese name of the Moon Festival, grouped as one answer in Mid-Autumn Festival (region-root-equiv)', { region: ['VN'] });
mergeInto(25145, 'party favor', 55644, 'party favors', 'form', 2, 'the plural of party favor, a second root (grouped with goodie bag in party supplies: region-root-equiv)', { nameOk: true, pre: () => delAlias(55644, 'party favours', 'the plural of party favour, which party favor has already') });
mergeInto(25142, 'goodie bag', 55638, 'goody bag', 'spelling', 2, 'one word written two ways, grouped as one answer in party supplies');
// regional words grouped with an untagged word that differs (v413, Simon: different observances; ungrouped so the warning goes)
ungroup('holidays_and_celebrations', [5137, 5136], 'Remembrance Day, Veterans Day and Armistice Day are different observances (v413, Simon): not one answer');
for (const tid of ['holidays_and_celebrations', 'festivals_of_the_world']) leaveGroup(tid, 5121, 'Mardi Gras and Pancake Day / Shrove Tuesday are different observances (v413, Simon); Pancake Day and Shrove Tuesday stay one answer');
for (const tid of ['holidays_and_celebrations', 'new_year']) leaveGroup(tid, 5106, 'Hogmanay and New Year\'s Eve are different observances (v413, Simon): Hogmanay is the Scottish festival');
leaveGroup('window_styles', 14183, 'a fanlight is the fan-shaped window over a door, a transom any window over one (v413, Simon: the pair mixes senses)');
{ const t = T('midsummer'); const g = (t.groups || []).find(g => g.includes(55753)); if (g) { t.groups = t.groups.filter(x => x !== g); n++; touchedT.add('midsummer'); A.push('group in midsummer dissolved: Litha = Juhannus = Ivan Kupala = Midsommar are different festivals (pagan, Finnish, Slavic, Swedish), not one answer (region-root-equiv)'); } }
untag(6615, 'veranda', 'known everywhere (Merriam-Webster has no regional label; a US porch is often a veranda): the tag made it a harder word for everyone');
untag(336, 'chesterfield', 'a sofa style known in the US and UK (and the Canadian word for any sofa), not a UK-only word');
untag(4865, 'slacks', 'said in the UK too (Oxford: no regional label)');
untag(23314, 'dollar bill', 'every UK adult knows it (familiarity 1); region is who knows a word');
// a US root of a regional or spelling pair is untagged, as color is (v413; v436 mold; v439)
for (const e of P.entries.filter(e => !e.aliasOf && inGroupE(e) && e.region.length && e.region.every(r => r === 'US' || r === 'CA') && e.id !== 5133))
  if (P.entries.some(a => a.aliasOf === e.id && a.region.includes('UK') && ['spelling', 'regional'].includes(a.aliasKind))) setE(e, 'region', [], `the US root of a regional pair: untagged, as color is (v413; v436 mold); its UK word is its alias`);
setE(chk(4863, 'pants'), 'region', ['US', 'CA'], 'pants is the US word for trousers; it was tagged UK, IE, AU, NZ, so a UK player saw "pants" (underwear in the UK) for trousers');
out('in_the_fridge', [[969, 'brewski']], 'a third word for beer beside beer and brew (US slang; grouped with them as one answer)');
out('oktoberfest', [[969, 'brewski']], 'a third word for beer beside beer and brew (US slang; grouped with them as one answer)');
out('mid_autumn_festival', [[963, 'cuppa']], 'British slang for a cup of tea, nothing to do with the Mid-Autumn Festival (tea is there)');
out('anzac_day', [[4378, 'grunt'], [4376, 'squaddie'], [4379, 'doughboy']], 'a US or British word for a soldier, not an Anzac one (digger and soldier stay)');

// =================================================================================================
sec('4. Plaster and band-aids: adhesive bandage (TIDY-UP.md, round 2)');
{ const p = ix.entry.get(15383);
  if (p && p.text === 'plaster') {
    delAlias(23332, 'plasters', 'the plural of plaster, which the root gets as its UK alias');
    retext(15383, 'plaster', 'adhesive bandage', 'the neutral name (Simon, round 2: plaster becomes "adhesive bandage"); plaster is the UK word, Band-Aid the US one', { gloss: '', fam: 3 });
    setE(p, 'region', [], 'the neutral root of a regional pair');
  }
  newAlias(15383, 'plaster', 'adhesive', 'regional', 1, ['UK'], 'the UK word for an adhesive bandage');
  mergeInto(15383, 'adhesive bandage', 23332, 'band-aids', 'synonym', 1, 'band-aids is the same bandage (Band-Aid, the US alias, already stands for it)', { del: 'the plural of the alias Band-Aid' });
  mergeInto(15383, 'adhesive bandage', 27383, 'plaster', 'synonym', 1, 'plaster [bandage] is the same bandage; british english words shows "plaster"', { del: 'the root has the UK alias plaster now', keepShow: true }); }

// =================================================================================================
sec('5. Wrong senses and stubs');
{ const sv = chk(956, 'sous vide'); if (sv.typ.kitchen_appliances !== undefined) swap('kitchen_appliances', sv, chk(4792, 'sous vide machine'), 'the appliance (sous vide is the cooking method)', { typ: 4 }); }
{ const c = ix.entry.get(23439); if (c) { unlinkE(chk(23439, 'counter'), 'tables_and_desks', 'a kitchen counter is not a table or desk'); mergeInto(23122, 'countertop', 23439, 'counter', 'synonym', 2, 'counter [kitchen] is the countertop'); } }
{ const m = ix.entry.get(64203); if (m) { swap('saws', chk(64203, 'mitre'), chk(23691, 'miter saw'), 'the full term of the stub mitre [angle cutting] (US spelling root; its UK spelling alias is mitre saw)', { show: 'miter', outWhy: 'a bare stub: miter saw takes the link' }); delE(64203, 'mitre', 'a bare UK stub of miter saw made for saws; in no theme'); } }
{ const d = ix.entry.get(65806); if (d) { unlinkE(chk(65806, 'dressing'), 'tables_and_desks', 'a bare stub of dressing table, the UK alias of vanity, which is linked and was grouped with it'); delE(65806, 'dressing', 'a bare stub; in no theme'); } }
{ const pb = ix.entry.get(62778); if (pb && pb.text === 'Pembroke') { retext(62778, 'Pembroke', 'Pembroke table', 'the full term of the stub (LIBRARY-RULES 5)'); setShow(pb, 'tables_and_desks', 'Pembroke', 'the full term shown short, as the other tables'); } }
{ const g = ix.entry.get(62803); if (g && g.text === 'Gregorian') { retext(62803, 'Gregorian', 'Gregorian calendar', 'the full term of the stub (LIBRARY-RULES 5)'); setShow(g, 'clocks_and_calendars', 'Gregorian', 'the full term shown short, as lunar and Julian calendar'); } }
{ const cr = ix.entry.get(62799); if (cr && cr.text === 'Cretan') { retext(62799, 'Cretan', 'Cretan stitch', 'the full term of the stub (LIBRARY-RULES 5)'); setShow(cr, 'embroidery_stitches', 'Cretan', 'the full term shown short, as the other stitches'); } }
{ const tc = ix.entry.get(65906); if (tc) { swap('in_a_toy_box', chk(65906, 'car'), chk(5948, 'toy car'), 'the full term (toy car 5948), shown "car" as in toys', { show: 'car', outWhy: 'a stub of toy car typed phrase (contract-type-common): toy car takes the link' }); delE(65906, 'car', 'a stub of toy car [5948] made for in a toy box; in no theme'); } }
{ const mc = ix.entry.get(64282); if (mc) { swap('sewing_tools', chk(64282, 'machine'), chk(4766, 'sewing machine'), 'the full term of the stub machine [stitching device] (sense-twin)', { show: 'machine', outWhy: 'a bare stub: sewing machine takes the link' }); delE(64282, 'machine', 'a bare stub of sewing machine; in no theme'); } }
for (const tid of ['fabrics', 'tough_fabrics']) swap(tid, chk(6287, 'canvas'), chk(48497, 'canvas'), 'the fabric (sense-link, sense-twin)');
for (const tid of ['fabrics', 'fabrics_from_animals']) swap(tid, chk(161, 'alpaca'), chk(55503, 'alpaca'), 'the wool, not the animal');
for (const tid of ['tops', 'winter_clothes']) swap(tid, chk(5046, 'fleece'), chk(62790, 'fleece'), 'the garment, not the fabric');
swap('things_on_wheels', chk(59131, 'pram'), chk(3557, 'stroller'), 'the baby carriage (pram [boat] is a dinghy; the baby pram is a UK alias of stroller)');
if (ix.entry.get(24833)) swap('neckwear', chk(24833, 'dog collar'), (E(50199).aliasOf ? E(E(50199).aliasOf) : chk(50199, 'dog collar')), 'the clerical collar is neckwear; the pet collar is not (24833 carried the sensitive flag of the clerical sense; if v440 merged dog collar [clerical collar] into clerical collar, that root takes the link)');
delE(24833, 'dog collar', 'dog collar [pet collar] was made for neckwear only; in no theme');
swap('work_clothes', chk(24465, 'toque'), chk(24711, 'chef hat'), 'the chef\'s hat (toque [hat] is the Canadian winter hat, grouped with beanie in hats)', { typ: 4 });
{ const pp = chk(19177, 'pork pie');
  if (pp.typ.hats !== undefined || pp.typ.historical_hats !== undefined) {
    const ph = newEntry('porkpie', 'hat', { pos: 'noun', type: 'common', fam: 3 }, 'the hat (Merriam-Webster: porkpie); pork pie 19177 is the British pie (round 1 cross-group list)');
    for (const tid of ['hats', 'historical_hats']) swap(tid, pp, ph, 'the hat, not the pie');
  } }
{ const p0 = chk(41190, 'Pisces');
  if (p0.typ.zodiac_signs !== undefined) { const pz = newEntry('Pisces', 'zodiac sign', { pos: 'noun', type: 'proper', fam: 2 }, 'the zodiac sign, as Aries [zodiac] and the other signs have (Pisces 41190 is the constellation)'); swap('zodiac_signs', p0, pz, 'the zodiac sign, not the constellation'); } }
{ const jb = chk(66551, 'jingle bell');
  if (jb.typ.christmas_carols !== undefined) { const js = newEntry('Jingle Bells', 'song', { pos: 'noun', type: 'title', fam: 1 }, 'the song; jingle bell 66551 is the small bell'); swap('christmas_carols', jb, js, 'the song, not the bell'); }
  const jf = AL(66551, 'jingle bells'); if (jf && !jf.gloss) setE(jf, 'gloss', 'bells', 'its text is now shared with Jingle Bells [song]'); }
unlinkE(chk(4572, 'television'), 'tops', 'wrong sense: it came through the alias boob tube, which is the strapless top only in the UK');
{ const tt = newEntry('tube top', '', { pos: 'noun', type: 'common', fam: 2 }, 'the strapless top (UK: boob tube), in place of the television that stood in for it'); linkE(tt, 'tops', 3, 'the strapless top', { show: 'tube' }); }
{ const k = ix.entry.get(3042);
  if (k && k.aliasOf === 62524) {
    delete k.aliasOf; delete k.aliasKind; k.typ ||= {}; k.kin ||= []; n++; reindex(P);
    A.push(`kindling 3042 becomes a root (it was a form alias of the verb kindle [to light]: the small sticks are a noun, not a form of the verb; contract-dup-root)`);
    const kv = chk(62524, 'kindle'); if (kv.use) { kv.use = {}; }
    for (const tid of ['fire_words', 'campsite', 'things_made_from_trees', 'fireplace_words', 'heating_and_cooling']) swap(tid, kv, k, 'the sticks for lighting a fire (fire words showed the form kindling through use)');
    delE(62524, 'kindle', 'every link of kindle [to light] meant kindling, now a root; in no theme (it was also a contract-dup-root after Kindle)');
  } }
swap('heating_and_cooling', chk(42237, 'cooling fan'), chk(4742, 'fan'), 'the electric fan of the home (cooling fan is a machine part)', { typ: 2 });
mergeInto(55266, 'poker', 23585, 'fire poker', 'synonym', 3, 'the same poker (poker [fireplace] in fireplace words)');
for (const tid of ['paper_goods']) swap(tid, chk(20137, 'plate'), chk(25551, 'paper plate'), 'the paper plate (plate [dinner dish] is china)', { show: 'plate' });

// shown texts after the merges: the slang or loanword stays the answer only where the theme is about the word itself
{ const tv = E(4572); if (tv.typ.media_slang !== undefined) setShow(tv, 'media_slang', 'tube', 'media slang wants the slang word (tube merged into television)'); }
{ const ds = E(24080); for (const tid of ['outside_the_house', 'architecture']) if (ds.show?.[tid]) setShow(ds, tid, null, 'doorstep is the everyday word; only words from Dutch shows "stoop"'); }
{ const gb = E(25142); if (gb.show?.blank_bag === 'goody') setShow(gb, 'blank_bag', 'goodie', 'the shown part follows the spelling of the root'); }

// =================================================================================================
sec('6. Belonging');
out('electrical_fittings', [[21166, 'ballast']], 'wrong sense: ballast [ship] is the weight in a ship\'s hull, not the lamp ballast');
out('measuring_tools', [[19949, 'cup']], 'the unit, not the tool: measuring cup (shown "cup") is the tool (same-display)');
out('kitchen_appliances', [[19832, 'bain-marie']], 'a water bath for cooking, not an appliance');
out('time_units', [[39644, 'ticking']], 'the sound of a clock, not a unit of time');
out('scarves_and_gloves', [[64279, 'mitt']], 'wrong sense: the baseball mitt (stays in its sports themes)');
out('fabric_prints', [[12548, 'harlequin']], 'wrong sense: harlequin [clown character], not the diamond pattern');
out('south_american_clothing', [[55450, 'llama wool']], 'a fiber, not a garment');
delE(55450, 'llama wool', 'made for South American clothing only; in no theme');
out('things_without_a_plug', [[4716, 'fridge']], 'a fridge has a plug (it was there for its alias icebox)');
out('retro_household_items', [[4716, 'fridge']], 'a fridge is not retro (it was there for its alias icebox)');
out('things_with_handles', [[4526, 'packed lunch']], 'a meal, not a thing with a handle (lunchbox is in the theme)');
out('things_with_lids', [[4526, 'packed lunch']], 'a meal, not a thing with a lid (lunchbox is in the theme)');
out('cleaning_verbs', [[23842, 'squeegee']], 'the tool (a noun); the theme holds verbs');
{ const m = chk(23834, 'mop');
  if (m.typ.cleaning_verbs !== undefined) { const mv = newEntry('mop', 'to clean', { pos: 'verb', type: 'common', fam: 1 }, 'to clean with a mop (the old entry is the tool)'); swap('cleaning_verbs', m, mv, 'the verb'); }
  if (!m.gloss) setE(m, 'gloss', 'cleaning tool', 'its text is now shared with mop [to clean]'); }
for (const tid of ['paper_goods', 'things_used_for_wiping']) leaveGroup(tid, 25207, 'tissue paper is the wrapping paper, not a tissue');
out('things_used_for_wiping', [[25207, 'tissue paper']], 'wrapping paper, not for wiping');
leaveGroup('knitwear', 24496, 'a bobble hat is a beanie with a bobble, a kind of it, not the same answer');
leaveGroup('scarves_and_gloves', 24770, 'latex gloves are medical gloves, not rubber kitchen gloves');
linkE(chk(24206, 'listing agent'), 'real_estate_words', 4, 'a real estate word (an orphan since v433)');

// =================================================================================================
sec('7. Case, type, alias kinds');
retext(23315, "traveler's cheque", "traveler's check", 'the US spelling of the root (the UK alias stays traveller\'s cheque)');
retext(24320, 'v-neck', 'V-neck', 'the letter V is a capital (Merriam-Webster, Oxford: V-neck), as T-shirt');
retext(24346, 'a-line skirt', 'A-line skirt', 'the letter A is a capital (Merriam-Webster: A-line)');
{ const a = chk(24346, 'A-line skirt'); if (a.show?.dresses_and_skirts === 'a-line') setShow(a, 'dresses_and_skirts', 'A-line', 'the shown text follows the capital'); }
retext(24417, 'y-fronts', 'Y-fronts', 'the letter Y is a capital (Oxford: Y-fronts)');
retext(24992, 'd-ring', 'D-ring', 'the letter D is a capital (as D-lock)');
retext(24225, 'tv license', 'TV license', 'TV is an initialism (as TV stand)', { type: 'proper' });
{ const a = AL(24225, 'tv licence'); if (a) { setE(a, 'text', 'TV licence', 'the UK spelling follows the root\'s capitals'); setE(a, 'type', 'proper', 'a spelling has its root\'s type'); } }
retext(24221, 'cable tv', 'cable TV', 'TV is an initialism', { type: 'proper' });
retext(24280, 'co detector', 'CO detector', 'CO (carbon monoxide) is written in capitals');
{ const a = AL(23393, 'ptfe tape'); if (a) setE(a, 'text', 'PTFE tape', 'PTFE is an initialism'); }
retext(23928, 'mould remover', 'mold remover', 'US spelling for the root; the UK spelling is its alias');
{ const mr = chk(23928, 'mold remover'); setE(mr, 'region', [], 'the US-spelled root of a spelling pair'); newAlias(23928, 'mould remover', '', 'spelling', mr.fam, ['UK'], 'the UK spelling'); }
retext(24546, 'Hermes', 'Hermès', 'the house writes it with the accent, as the dictionaries do (rule 8)');
newAlias(24546, 'Hermes', 'fashion house', 'spelling', 3, [], 'the plain form (rule 8)');
retype(24729, 'Birkin', 'proper', 'a named product with a capital (LIBRARY-RULES 4: proper with tm)');
kindA(55614, 'Donder', 'synonym', 'the original name of Donner in the 1823 poem, not a spelling');
delAlias(1345, 'skeeter', 'US slang; as mosquito\'s only synonym the game would show it at some levels (reviewer: a synonym, not an abbreviation; deleted as too obscure for that)');
for (const [id, text] of [[4668, 'chest of drawers'], [4785, 'ice cream maker'], [4792, 'sous vide machine'], [5053, 'hook-and-loop'], [5158, 'public holiday'], [5181, 'bachelor party'], [5184, 'bachelorette party'],
  [5187, 'bar mitzvah'], [5845, 'game console'], [5881, 'stained glass'], [5920, 'teddy bear'], [5928, 'spinning top'], [5930, 'rocking horse'], [5936, 'jump rope'], [5945, 'bouncy castle'], [5947, 'action figure'],
  [5950, 'train set'], [5965, 'squirt gun'], [5970, 'stuffed animal'], [5993, 'rag doll'], [6227, 'pointe shoes'], [6390, 'remote'], [6793, 'treasure chest'], [4602, 'two-way radio'], [4125, 'garbage collector'],
  [4251, 'neighborhood watch'], [24048, 'wattle and daub'], [23875, 'steam clean'], [23876, 'spring clean'], [23877, 'deep clean'], [23881, 'wash down'], [24134, 'sand down'],
  [67237, 'toe cap'], [67238, 'toe box'], [67239, 'arch support'], [67246, 'heel counter'], [67251, 'heel tab'], [67252, 'pull tab'], [55850, 'yard of ale'], [5948, 'toy car']])
  { const e = ix.entry.get(id); if (e && !e.aliasOf && e.type === 'phrase') { chk(id, text); setE(e, 'type', 'common', PHRASE_WHY); for (const a of P.entries.filter(a => a.aliasOf === id && a.type === 'phrase')) setE(a, 'type', 'common', 'an alias has its root\'s type'); } }
mergeInto(4125, 'garbage collector', 4130, 'garbageman', 'synonym', 3, 'the same worker (garbage man is its alias already), grouped as one answer in bins and recycling (contract-type-common)', { region: ['US'] });
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');
setT('hindu_festivals', 'ident', 3, 'four Hindu festival names need a moment and a niche fact (LIBRARY-RULES 4: ident 3); theme-gap 2.0 -> 1.0 (I30, the one baseline theme-gap warning)');

// =================================================================================================
sec("7b. Reviewer's fixes (2026-11-23)");
{ const ab = E(15383), pl = ix.entry.get(32957); if (pl && (ab.kin || []).includes(32957)) { setKin(P, ab, pl, false); n++; A.push('kin: adhesive bandage 15383 and plasterer 32957 dropped: a plasterer works with wall plaster, not bandages'); } }
for (const [rid, text] of [[23714, 'thumbtacks'], [3799, 'bobby pins']]) { const a = AL(rid, text); if (a) setE(a, 'region', [], 'a form alias carries no region (the plural of the root)'); }
{ const g = AL(4125, 'garbageman'); if (g) setE(g, 'type', 'common', 'an alias has its root\'s type (garbage collector is common now)'); }
{ const ib = ix.entry.get(4717);
  if (ib && ib.aliasOf === 4716) {
    delete ib.aliasOf; delete ib.aliasKind; ib.typ ||= {}; ib.kin ||= []; n++; reindex(P);
    setE(ib, 'region', [], 'a root of its own: the old ice-cooled cabinet, known in the UK and US');
    A.push('icebox 4717 becomes a root: the old ice-cooled cabinet, not the everyday US word for a fridge (it was a regional US alias of fridge, so US players saw "icebox") (reviewer)');
  }
  if (ib) { linkE(chk(4717, 'icebox'), 'retro_household_items', 3, 'the old ice-cooled cabinet (the theme held fridge for it)'); linkE(ib, 'things_without_a_plug', 3, 'the old ice-cooled cabinet (the theme held fridge for it)'); } }
out('wedding_anniversaries', [[55633, 'diamond jubilee'], [55631, 'golden jubilee'], [55632, 'silver jubilee']], 'a jubilee marks years of a reign, not of a marriage (reviewer); in no theme now, for History & Myth (royal jubilees)');
out('ramadan_and_eid', [[4278, 'orison'], [4277, 'supplication']], 'a general word for prayer, not a Ramadan or Eid word (reviewer); stays in religion and monastery');
out('building_materials', [[6578, 'lintel'], [7403, 'girder']], 'a building part, not a material (reviewer); stays in parts of a house, construction site and other part themes');
{ const j = chk(24046, 'joist'); if (j.typ.building_materials !== undefined) { linkE(j, 'parts_of_a_house', 4, 'a building part (reviewer), from building materials'); unlinkE(j, 'building_materials', 'a building part, not a material (reviewer)'); } }
out('office_and_school_supplies', [[4610, 'flyer']], 'a printed leaflet, not an office or school supply (reviewer)');
out('kitchen_tools', [[19809, 'saucepan'], [19808, 'skillet'], [19811, 'wok']], 'cookware, not a kitchen tool (reviewer); stays in things with handles and the cookware themes');
for (const [id, text] of [[19840, 'whisk'], [19843, 'peeler']]) rate(chk(id, text), 'kitchen_tools', 2, 'one of the first kitchen tools anyone names; with the cookware gone the theme needs its easy words (I30 gap)');
for (const [id, text] of [[55360, 'shayla'], [55358, 'taqiyah'], [55363, 'tarha']]) { const e = chk(id, text); if (e.sensitive) setE(e, 'sensitive', false, 'a headscarf or cap, flagged like hijab, niqab, burqa, chador and kufi in the same theme (not sensitive) (reviewer: consistent flags)'); }
out('traditional_clothes', [[38552, 'tartan'], [23028, 'Stetson']], 'a cloth pattern / a hat brand, not a traditional garment (reviewer); tartan stays in European folk costume and fabric prints, Stetson in western wear and hats');

// =================================================================================================
sec('7c. Decided by Simon (2026-11-23, "Take all and apply")');
mergeInto(4716, 'fridge', 4715, 'refrigerator', 'synonym', 1, 'one word, the long form of fridge (Simon: merge, as remote / remote control); fridge is the short form people use (LIBRARY-RULES 5), refrigerator its well-known first synonym');
mergeInto(4722, 'microwave', 4723, 'microwave oven', 'synonym', 1, 'one word, the long form of microwave (Simon: merge); microwave is the form people use');
mergeInto(4735, 'vacuum', 4734, 'vacuum cleaner', 'synonym', 1, 'one word, the long form of vacuum (Simon: merge); vacuum is the short form people use');
mergeInto(24277, 'smoke detector', 24276, 'smoke alarm', 'synonym', 1, 'the same device (Simon: merge); smoke detector keeps the root (the more linked; both are well known, so the first synonym is too)');
{ const p = chk(12007, 'pencil'); if (!(p.nameOkIn || []).includes('in_a_pencil_case')) setE(p, 'nameOkIn', [...(p.nameOkIn || []), 'in_a_pencil_case'], 'the pencil is the first thing in a pencil case (Simon kept it there in v337; theme-name)'); }

// =================================================================================================
sec('8. Familiarity of first synonyms (the game shows a root\'s first synonym at some levels)');
setE(chk(19945, 'ice chest'), 'fam', 3, 'many adults know it (US); the first synonym of cooler');
{ const l = AL(3050, 'lilo'); if (l) setE(l, 'fam', 3, 'many adults know it (UK, Australia); the first synonym of air mattress'); }
setE(chk(3801, 'Kirby grip'), 'fam', 3, 'many adults know it (UK); the first synonym of bobby pin');
// a better-known later synonym moves before an obscure first one (export row order)
{ const kj = AL(4873, 'knitted jumper'), je = AL(4873, 'jersey'); if (kj && je && P.entries.indexOf(kj) > P.entries.indexOf(je)) { P.entries = P.entries.filter(x => x !== kj); P.entries.splice(P.entries.indexOf(P.entries.find(a => a.aliasOf === 4873 && a.aliasKind === 'synonym')), 0, kj); reindex(P); n++; A.push('knitted jumper 25746 (familiarity 2) moves first among the synonyms of sweater 4873 in row order: the game shows the first synonym (jersey is harder, jumpers a plural)'); } }
const firstSynLeft = [];
for (const e of P.entries.filter(e => !e.aliasOf && inGroupE(e))) {
  const syn = P.entries.filter(a => a.aliasOf === e.id && a.aliasKind === 'synonym');
  if (!syn.length || syn[0].fam <= e.fam + 1) continue;
  const good = syn.find(a => a.fam <= e.fam + 1);
  if (!good) { firstSynLeft.push(`${lab(e)} (familiarity ${e.fam}): ${syn.map(a => `${a.text} ${a.fam}`).join(', ')}`); continue; }
  P.entries = P.entries.filter(x => x !== good); P.entries.splice(P.entries.indexOf(syn[0]), 0, good); reindex(P); n++;
  A.push(`${lab(good)} (familiarity ${good.fam}) moves before ${lab(syn[0])} (familiarity ${syn[0].fam}) in row order: the first synonym of ${lab(e)} (familiarity ${e.fam}) is the one the game shows`);
}
A.push(`  first synonyms still harder than the root + 1 (no better synonym, for Simon) ${firstSynLeft.length}: ${firstSynLeft.join('; ') || 'none'}`);

// regional and form aliases that hold a word of a theme name where their root is linked (the theme shows the root's short text): nameOkIn, as bedside table
{ const NK = [[23418, 'end table'], [11320, 'music centre'], [23691, 'mitre saw'], [24577, 'trainer socks'], [25145, 'party favour'], [25551, 'paper plates'], [67038, 'hipped roof'], [24644, 'deck shoes'], [24387, 'sports coat'], [24375, 'duffle coat'], [20473, 'black powder'], [67140, 'carrier bag']];
  for (const [rid, text] of NK) { const a = AL(rid, text); if (!a) continue;
    const add = linkIds(P, E(rid)).filter(tid => ix.theme.has(tid) && nameLeak(T(tid), a) && !(a.nameOkIn || []).includes(tid));
    if (add.length) setE(a, 'nameOkIn', [...(a.nameOkIn || []), ...add], `the alias text holds a word of the theme name; the theme shows the root's text or its short form (as bedside table in tables and desks)`); } }
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
const summary = [`Library batch v441: tidy-up step 3, Home & Everyday (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch441-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch441-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch441-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

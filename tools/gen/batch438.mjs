// Library batch v438: tidy-up step 3 (TIDY-UP.md), the Travel & Transport group: every theme under travel_transport read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v436. Applied after v437 (Places & Geography): everything works by entry id + text and theme id, never by position, and every
// step is skipped when it is already done (rerun: 0 changes).
//   1. Tree, twins, names: types of public transport moves under public transport words, which gives its vehicles to it (theme-twin);
//      wind-powered vessels, human-powered craft, outdoor kitchen gear, naval vessels and Southern African words deleted as twins;
//      flight crew -> aviation jobs, holiday travel -> leisure trips, American holiday spots -> US vacation spots; three mixed themes untagged.
//   2. Regional words: regional roots with a same-sense word become its aliases (jetway, cop car, platelayer, gandy dancer, Tube, okada,
//      slug bug, bellhop, engineer [train], gorge walking, carry on, trolley case, gin palace, toilet [plane], rev counter); horseback
//      riding and center stand become US roots; US roots with a UK alias untagged; UK-tagged words US speakers use untagged.
//   3. Two roots of one sense merged (the weaker becomes an alias, or is deleted when its text repeats an alias or would leak a theme name).
//   4. Wrong senses: Sia -> Singapore Airlines, captain [ship], Fiji and Mauritius [islands], Daytona Beach, Indianapolis and Bathurst
//      [circuit], Petrified Forest [park], genoa [sail], saddle [bicycle], fairing [motorcycle], burner [balloon], air brake [train],
//      Bajaj [motorcycle maker], putt-putt [engine sound], bobber [motorcycle], F1 the abbreviation of Formula 1; stubs replaced by full terms.
//   5. Belonging: members of another kind leave (headlamp from car themes, traffic words from driving words, dwellings from traditional
//      lodgings, the vehicles from public transport words, and more).
//   6. Case, type, spelling: knot names lowercase, Gare de l'Est, gruppetto, Carnival, Pot Noodle, mountain bike (MTB its abbreviation),
//      yield (give way its UK alias), plow (plough its UK alias), flâneur; alias kinds; names of things typed phrase -> common.
//   7. Ratings, groups, shown texts (a show that hid a regional alias is replaced by the full name).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch438.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, themeDifficulty, difficultyBand, deleteTheme, deleteEntry, addEntry, setKin, moveKin, placeTheme, themeLocked } from '../../js/model.js';
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
const GROUP = 'travel_transport';
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
const groupsWith = id => P.themes.filter(t => (t.groups || []).some(g => g.includes(id)));

const unlinkE = (e, tid, why) => {
  T(tid);
  if (e.typ[tid] === undefined) return false;
  unlinkEntry(P, e, tid); n++; reindex(P); touchedT.add(tid);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`out of ${tid}: ${lab(e)}: ${why} (${where(e)})`);
  return true;
};
const out = (tid, list, why) => { for (const [id, text] of list) unlinkE(chk(id, text), tid, why); };
// Link e in tid. A full term that contains a word of the theme name needs `show` (a short text) or `nameOk` (the full name is the member).
const linkE = (e, tid, typ, why, x = {}) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return false;
  e.typ[tid] = typ; n++; touchedT.add(tid); alone.delete(e.id);
  if (x.show) e.show = { ...(e.show || {}), [tid]: x.show };
  if (x.nameOk && !(e.nameOkIn || []).includes(tid)) e.nameOkIn = [...(e.nameOkIn || []), tid];
  reindex(P);
  const leak = leakOf(e, tid); if (leak) throw Error(`${lab(e)} in ${tid}: "${leak}" of the theme name: give a show or nameOk`);
  A.push(`linked: ${lab(e)} in ${tid} (typicality ${typ}${x.show ? `, shown "${x.show}"` : ''}${x.nameOk ? ', nameOkIn: the full name contains a word of the theme name' : ''}): ${why}`);
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
const rate = (e, tid, typ, why) => {
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} is not in ${tid}`);
  if (e.typ[tid] === typ) return;
  A.push(`typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++; touchedT.add(tid);
};
const setShow = (e, tid, s, why) => {
  const cur = e.show?.[tid] || null; if (cur === s) return;
  if (s) e.show = { ...(e.show || {}), [tid]: s }; else { e.show = { ...e.show }; delete e.show[tid]; }
  A.push(`${lab(e)} in ${tid}: shown ${JSON.stringify(cur)} -> ${JSON.stringify(s)}: ${why}`); n++; touchedT.add(tid);
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
// A theme's link moves from a wrong-sense entry to the right one (same typicality unless given; group places follow; show given or none).
const swap = (tid, fromE, toE, why, x = {}) => {
  if (fromE.typ[tid] === undefined) return;
  const typ = x.typ ?? fromE.typ[tid];
  const gs = (T(tid).groups || []).filter(g => g.includes(fromE.id)).map(g => [...g]);
  linkE(toE, tid, typ, why, x);
  unlinkE(fromE, tid, `wrong sense: ${lab(toE)}${toE.gloss ? ' [' + toE.gloss + ']' : ''} takes the link`);
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
// its kin and aliases move; then gone is deleted (same text) or becomes keep's alias of `kind` in place (id kept).
const mergeInto = (keepId, keepText, goneId, goneText, kind, fam, why, o = {}) => {
  const keep = chk(keepId, keepText), gone = ix.entry.get(goneId);
  if (!gone) return;
  if (gone.aliasOf === keepId) return;
  chk(goneId, goneText);
  if (keep.aliasOf || gone.aliasOf) throw Error(`${goneText}/${keepText}: an alias`);
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
// A whole theme goes; every word must stay linked elsewhere (or be listed as moved first).
const dropTheme = (tid, why) => {
  if (!ix.theme.has(tid)) return;
  const t = T(tid), ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined);
  const lost = ws.filter(e => linkIds(P, e).filter(x => x !== tid).length === 0);
  if (lost.length) throw Error(`${tid}: words that would be in no theme: ${lost.map(lab).join(', ')}`);
  if (t.note) A.push(`  (its note "${t.note}" goes with it)`);
  const kids = P.themes.filter(x => x.parent === tid).map(x => x.id);
  if (kids.length) throw Error(`${tid} has sub-themes`);
  deleteTheme(P, tid); reindex(P); n++; counts.deletedThemes++;
  A.push(`deleted theme: ${tid} "${t.name}" (${ws.length} words, all still in other themes): ${why}`);
};

// ---------- helpers from v437 ----------
// A theme moves under another (the tree; id kept).
const moveT = (tid, into, why) => {
  const t = T(tid); T(into); if (t.parent === into) return false;
  const from = t.parent; if (!placeTheme(P, tid, into, 'in')) throw Error('place ' + tid); reindex(P); n++; counts.moved++; touchedT.add(tid);
  A.push(`theme ${tid} "${t.name}" moves from ${from} to ${into} "${T(into).name}": ${why}`); return true;
};
// Text change in place (id kept).
const retext = (id, from, to, type, why) => { const e = E(id); if (e.text === to) { if (type) setE(e, 'type', type, why); return e; } chk(id, from); A.push(`text: ${lab(e)} -> "${to}": ${why}`); e.text = to; n++; reindex(P); if (type) setE(e, 'type', type, why); return e; };
// One entry held two senses: a new entry of the other sense takes the listed links; the old one gets a gloss.
const split = (oldId, oldText, oldGloss, newGloss, fields, tids, why) => {
  const old = chk(oldId, oldText);
  if (tids.some(t => old.typ[t] !== undefined)) {
    const p = newEntry(oldText, newGloss, { pos: 'noun', ...fields }, why);
    for (const tid of tids) swap(tid, old, p, `the ${newGloss} sense`);
  }
  if (old.gloss !== oldGloss) setE(old, 'gloss', oldGloss, `its text is shared with ${oldText} [${newGloss}]`);
  return (ix.byText.get(oldText.toLowerCase()) || []).find(x => x.text === oldText && x.gloss === newGloss && !x.aliasOf);
};
const delStub = (id, text, tid, why) => { if (!ix.entry.get(id)) return; unlinkE(chk(id, text), tid, why); delE(id, text, `a stub made for ${tid} only; in no theme now`); };

// ---------- helpers added for v438 ----------
const dropKin = (id, why) => { const e = ix.entry.get(id); if (!e || e.aliasOf) return; for (const k of [...(e.kin || [])]) { const x = ix.entry.get(k); if (!x) continue; setKin(P, e, x, false); n++; A.push(`kin removed: ${lab(e)} <-> ${lab(x)}: ${why}`); } };
const untag = (id, text, why) => { const e = ix.entry.get(id); if (!e || e.aliasOf) return; chk(id, text); setE(e, 'region', [], why); };
const retype = (id, text, type, why) => { const e = ix.entry.get(id); if (!e) return; chk(id, text); setE(e, 'type', type, why); };
const setAlias = (id, text, rootId, kind, why, region) => { const a = ix.entry.get(id); if (!a) return; chk(id, text); if (!a.aliasOf) throw Error(`${lab(a)} is not an alias`);
  if (a.aliasOf !== rootId) { A.push(`${lab(a)}: alias of ${lab(E(a.aliasOf))} -> ${lab(E(rootId))}: ${why}`); a.aliasOf = rootId; n++; reindex(P); }
  setE(a, 'aliasKind', kind, why); if (region) setE(a, 'region', region, why); };
const delAlias = (id, text, why) => { const a = ix.entry.get(id); if (!a) return; chk(id, text); if (!a.aliasOf) throw Error(`${lab(a)} is not an alias`);
  for (const x of P.entries) if (x.use) for (const id2 of Object.values(x.use)) if (id2 === id) throw Error(`${lab(a)} is used`);
  P.entries = P.entries.filter(x => x !== a); n++; reindex(P); deleted.push(lab(a)); A.push(`deleted alias: ${lab(a)}${a.gloss ? ' [' + a.gloss + ']' : ''} of ${lab(E(a.aliasOf))}: ${why}`); };
// Root and alias trade texts (ids kept): the root takes `to`, the alias the root's old text.
const swapRootText = (rootId, rootText, aliasId, aliasText, why, x = {}) => {
  const r = E(rootId), a = E(aliasId); if (r.text === aliasText && a.text === rootText) return;
  chk(rootId, rootText); chk(aliasId, aliasText); if (a.aliasOf !== rootId) throw Error(`${aliasId} is not an alias of ${rootId}`);
  r.text = aliasText; a.text = rootText; if (x.rootGloss !== undefined) r.gloss = x.rootGloss; if (x.aliasGloss !== undefined) a.gloss = x.aliasGloss;
  if (x.aliasRegion) a.region = x.aliasRegion; if (x.aliasKind) a.aliasKind = x.aliasKind; n++; reindex(P);
  A.push(`texts swapped: root ${rootId} "${rootText}" -> "${aliasText}", alias ${aliasId} "${aliasText}" -> "${rootText}"${x.aliasRegion ? ' [' + x.aliasRegion + ']' : ''}: ${why}`);
};
const keepOnly = new Set();   // links kept on purpose (reported)

// =================================================================================================
sec('1. Tree, twins and names');
setT('flight_crew', 'name', 'aviation jobs', 'the theme holds pilots, cabin crew, mechanics, air traffic controllers, gate and check-in agents, baggage handlers and air marshals: airline and airport jobs, not only the crew of a flight (the id stays)');
for (const [id, text] of [[47169, 'flight engineer'], [47194, 'flight instructor'], [47172, 'flight dispatcher'], [47195, 'flight nurse']]) { const e = chk(id, text); if (e.show?.flight_crew) setShow(e, 'flight_crew', null, 'the theme is now aviation jobs: the full name no longer repeats a word of the theme name ("nurse" alone named any nurse)'); }
{ const e = chk(47188, 'deadheading crew'); if ((e.nameOkIn || []).includes('flight_crew')) setE(e, 'nameOkIn', e.nameOkIn.filter(t => t !== 'flight_crew'), 'the theme name no longer contains "crew" (stale nameOkIn)'); }
setT('holiday_travel', 'name', 'leisure trips', 'holiday is the UK word (LIBRARY-RULES 6, Names); the members are kinds of trip taken for pleasure (Simon, 2026-11-23: "leisure trips"; the id stays)');
setT('american_holiday_spots', 'name', 'US vacation spots', 'US wording and shorter; the members are US beach and island vacation places (the id stays)');
setT('famous_locomotives', 'region', [], 'a mixed theme: Big Boy, The General, Tom Thumb, John Bull, Best Friend and Stourbridge Lion are American (LIBRARY-RULES 4, region: do not tag mixed themes)');
setT('road_trip_games', 'region', [], 'a mixed theme: I spy, twenty questions, bingo, would you rather, yellow car are not US-only (LIBRARY-RULES 4, region)');
setT('campfire_foods', 'region', [], 'a mixed theme: damper (AU), bannock, beans on toast (UK), sausages and baked beans are not US-only (LIBRARY-RULES 4, region)');
moveT('types_of_public_transport', 'public_transportation', 'the kinds of public transport vehicle, a sub-theme of public transport words beside bus types, taxis of the world and cable cars and lifts (it was a top-level theme beside its twin)');
dropTheme('wind_powered_vessels', 'a near-twin of sailing ships (11 of its 14 words); all 14 are in boat types, sailing ships or pleasure boats');
dropTheme('human_powered_craft', 'twins boat types (10 of 11) and small boats (9 of 11) (theme-twin); all 11 words are in boat types');
dropTheme('cooking_and_drinking_gear', '"outdoor kitchen gear" twins camping gear (9 of 11) (theme-twin); all 11 words are in campsite');
dropTheme('naval_vessels', 'twins warships (People & Society: 11 of 12) (theme-twin); all 12 words are in its parent military vehicles');
dropTheme('southern_african_words', 'all 10 words are in its parent safari words (xwords-twin, 100%) and 4 in words from Afrikaans; a regional word list inside a safari theme');

// =================================================================================================
sec('2. Regional roots with a same-sense word become its aliases; US roots with a UK alias lose their tag (contract-root-region)');
mergeInto(2776, 'jet bridge', 2775, 'jetway', 'synonym', 4, 'the same walkway (grouped as one answer in air travel); jetway is a US trade name; its UK alias air bridge moves to jet bridge', { region: ['US'] });
mergeInto(3091, 'police car', 3093, 'cop car', 'synonym', 2, 'US slang for a police car (grouped as one answer in three themes); squad car is its US display alias', { region: ['US'] });
mergeInto(3091, 'police car', 49252, 'patrol car', 'synonym', 2, 'another name of the police car (grouped as one answer in special and emergency vehicles)');
mergeInto(47833, 'track worker', 47841, 'platelayer', 'regional', 5, 'the UK word for a railroad track worker (grouped as one answer in railroad jobs)', { region: ['UK'] });
mergeInto(47833, 'track worker', 33150, 'gandy dancer', 'synonym', 5, 'US slang for a track worker (grouped as one answer)', { region: ['US'] });
mergeInto(47833, 'track worker', 47844, 'section hand', 'synonym', 5, 'another name of a track worker (grouped as one answer)', { region: ['US'] });
mergeInto(47764, 'London Underground', 47765, 'Tube', 'synonym', 2, 'the nickname of the London Underground (grouped as one answer in metro systems); the Underground stays its UK display alias', { region: ['UK'] });
mergeInto(47015, 'moto taxi', 47017, 'okada', 'regional', 5, 'the Nigerian word for a motorcycle taxi (grouped as one answer), as boda boda is the East African one', { region: ['NG'] });
mergeInto(48300, 'punch buggy', 48301, 'slug bug', 'synonym', 4, 'the same game under another name (grouped as one answer)', { region: ['US'] });
{ const sm = ix.entry.get(17892); if (sm && !sm.aliasOf) { const tids = Object.keys(sm.typ).filter(t => E(3040).typ[t] === undefined);
  mergeInto(3040, "s'more", 17892, "s'mores", 'form', 2, 'the plural of s\'more, a second root (campfire foods, barbecue foods, North American food); the themes show "s\'mores" (use), as for knot and packing cube');
  const k = E(3040); for (const tid of tids) if (k.typ[tid] !== undefined && k.use?.[tid] !== 17892) { k.use = { ...(k.use || {}), [tid]: 17892 }; n++; touchedT.add(tid); A.push(`  s'more 3040 shows "s'mores" (use) in ${tid}`); } } }
untag(3040, "s'more", 'one word with s\'mores, which carried no tag: known well beyond the US and Canada (as the s\'mores theme)');
mergeInto(48323, 'bellboy', 33007, 'bellhop', 'regional', 3, 'the US word for a bellboy (grouped as one answer in hotel and hotel staff)', { region: ['US'] });
dropKin(50476, 'engineer [train] becomes an alias of locomotive engineer, a compound, not one family with engine');
mergeInto(67204, 'locomotive engineer', 50476, 'engineer', 'synonym', 1, 'the short US word for a locomotive engineer (grouped as one answer in railroad jobs)', { region: ['US'] });
mergeInto(67204, 'locomotive engineer', 33230, 'locomotive driver', 'synonym', 3, 'another name of the locomotive engineer (grouped as one answer; train driver is the UK display alias)');
mergeInto(33245, 'brakeman', 47845, 'brakie', 'synonym', 5, 'US railroad slang for a brakeman (grouped as one answer)', { region: ['US'] });
mergeInto(5314, 'canyoneering', 5643, 'gorge walking', 'synonym', 4, 'the British name of canyoneering (grouped as one answer in outdoor activities); canyoning stays its UK display alias', { region: ['UK'] });
mergeInto(48249, 'keep going', 48270, 'carry on', 'regional', 3, 'the UK way of saying keep going in directions (grouped as one answer)', { region: ['UK'] });
mergeInto(48748, 'wheeled bag', 48747, 'trolley case', 'regional', 3, 'the UK word for a wheeled suitcase (grouped as one answer in luggage)', { region: ['UK'] });
mergeInto(59177, 'motor yacht', 59179, 'gin palace', 'synonym', 4, 'British slang for a big motor yacht (grouped as one answer in pleasure boats)', { region: ['UK'] });
dropKin(47326, 'toilet [plane] becomes an alias of lavatory [plane]; kin belongs to roots');
mergeInto(47325, 'lavatory', 47326, 'toilet', 'regional', 1, 'the UK word for the lavatory on a plane (grouped as one answer in in-flight words)', { region: ['UK'] });
mergeInto(41843, 'tachometer', 59002, 'rev counter', 'regional', 3, 'the UK word for a tachometer (grouped as one answer in dashboard items)', { region: ['UK'] });
if (!E(67228).aliasOf) mergeInto(46605, 'gear shift', 67228, 'gearshift', 'spelling', 3, 'one word written two ways (grouped as one answer in car parts); its UK alias gear lever moves');
swapRootText(46605, 'gear shift', 67228, 'gearshift', 'Merriam-Webster writes gearshift as one word: it is the root, gear shift its spelling (one gloss "car": gearshift [motorcycle] shares the text)', { rootGloss: 'car', aliasGloss: '' });
setE(E(46605), 'fam', 3, 'as the one-word gearshift was (rating-vs-zipf: 2 was easier than its use)'); setE(E(67228), 'fam', 3, 'a spelling is never easier than its root');
setAlias(46606, 'gear lever', 46605, 'synonym', 'gearstick is the UK display alias of gear shift (one per dialect)');
{ const mg = ix.entry.get(46871); if (mg) { out('car_accessories', [[46871, 'mud guard']], 'a second copy of mudguard, the UK alias of fender [bicycle]; the accessory is mud flaps (it was grouped with them)'); delE(46871, 'mud guard', 'a second copy of mudguard (UK alias of fender); in no theme now'); } }
{ const h = E(48672); if (h.text === 'horse riding') { retext(48672, 'horse riding', 'horseback riding', 'common', 'the US name as root (LIBRARY-RULES 5): horse riding is British'); }
  setE(h, 'region', [], 'the US word is now the root');
  newEntry('horse riding', '', { aliasOf: 48672, aliasKind: 'regional', region: ['UK'], pos: 'noun', type: 'common', fam: 1 }, 'the UK word for horseback riding'); }
{ const c = E(48084); if (c.text === 'centre stand') retext(48084, 'centre stand', 'center stand', null, 'US spelling as root (LIBRARY-RULES 5)');
  setE(c, 'region', [], 'the US spelling is now the root');
  newEntry('centre stand', '', { aliasOf: 48084, aliasKind: 'spelling', region: ['UK'], pos: 'noun', type: 'common', fam: 5 }, 'the UK spelling'); }
// US roots that already have a UK regional or spelling alias: the root takes no tag (v434, v435 did the same)
for (const [id, text] of [[2575, 'windshield'], [2577, 'trunk'], [2579, 'hood'], [2588, 'windshield wiper'], [2596, 'sedan'], [2602, 'minivan'], [2608, 'muffler'], [2641, 'fender bender'],
  [2647, 'subway'], [2707, 'airplane'], [2728, 'layover'], [2859, 'railcar'], [2870, 'caboose'], [2873, 'freight car'], [2888, 'switch'], [3028, 'flashlight'], [3073, 'camp counselor'],
  [3089, 'fire truck'], [3094, 'snowplow'], [3113, 'garbage truck'], [3121, 'ice cream truck'], [3150, 'mail truck'], [3153, 'bookmobile'], [3162, 'tractor trailer'], [4988, 'fanny pack'],
  [23288, "driver's license"], [46721, 'do not enter'], [46736, 'rest area'], [46740, 'no passing zone'], [46772, 'tire inflator'], [46801, 'handicap spot'], [48158, 'vacationer'],
  [67136, 'grille guard'], [67139, 'RV park'], [67142, 'cattle guard'], [67172, 'lost and found'], [67173, 'baggage car'], [67180, 'taxi stand'], [67189, 'signal tower'],
  [67198, 'T-intersection'], [67199, 'dish towel'], [67204, 'locomotive engineer'], [67207, 'side mirror'], [67225, 'pass'], [67226, 'blind']])
  untag(id, text, 'the US word is the root and its UK word a regional or spelling alias: the root takes no tag (LIBRARY-RULES 5; the game never reads root regions; v434, v435)');
// UK-tagged roots that US speakers use too
for (const [id, text, why] of [[3064, 'vacuum flask', 'the generic name of the flask, in US dictionaries too (thermos is the trademark, grouped with it)'],
  [3735, 'roll-on', 'US deodorant is sold as roll-on too'], [2674, 'coach', 'a coach (bus) is a US word too ("coach bus", "motorcoach")'], [2896, 'branch line', 'a standard US railroad term too'],
  [46922, 'upper deck', 'not British only: any double-decker (and US stadiums) has an upper deck'], [46893, 'open-top bus', 'US city tours use open-top buses too'],
  [46930, 'exact change', 'US buses ask for exact change too (it was tagged US)'], [48265, 'second left', '"take the second left" is everyday US English too'],
  [48266, 'first right', '"take the first right" is everyday US English too'], [50143, 'topside', 'a US Navy word too'], [47798, "King's Cross", 'a world-famous station (Harry Potter), like Paddington and Waterloo, which carry no tag']])
  untag(id, text, `${why} (LIBRARY-RULES 4, region: who knows it)`);

// =================================================================================================
sec('3. Two roots of one sense');
mergeInto(46562, 'Mercedes', 46561, 'Mercedes-Benz', 'synonym', 1, 'the same brand (grouped as one answer); the short name people use is the root (LIBRARY-RULES 5)');
mergeInto(2611, 'speedometer', 59003, 'speedo', 'abbreviation', 3, 'a short form of speedometer (grouped as one answer in dashboard items); gloss car kept (speedo [swimwear])');
mergeInto(2612, 'glove box', 2613, 'glove compartment', 'synonym', 3, 'the same compartment (grouped as one answer in four themes)');
mergeInto(2569, 'seat belt', 2570, 'safety belt', 'synonym', 2, 'the same belt (grouped as one answer in three themes)');
mergeInto(46766, 'gas cap', 46767, 'fuel cap', 'synonym', 2, 'the same cap (grouped as one answer in gas station); petrol cap stays its UK alias');
mergeInto(46837, 'phone mount', 46838, 'phone holder', 'synonym', 2, 'the same holder (grouped as one answer)');
mergeInto(46839, 'dash cam', 46840, 'dashboard camera', 'synonym', 3, 'the same camera (grouped as one answer); the short name people use is the root');
mergeInto(46874, 'rain guard', 46875, 'wind deflector', 'synonym', 4, 'the same window visor (grouped as one answer)');
mergeInto(46793, 'parking space', 46794, 'parking spot', 'synonym', 1, 'the same space (grouped as one answer in parking words); parking bay stays the UK alias');
mergeInto(46921, 'smart card', 2698, 'smartcard', 'spelling', 3, 'one word written two ways');
mergeInto(46920, 'fare box', 60628, 'farebox', 'spelling', 5, 'one word written two ways');
mergeInto(46945, 'concession', 2697, 'concession fare', 'synonym', 4, 'the same reduced fare (concession is the everyday word)', { region: ['UK', 'AU'] });
mergeInto(47002, 'transit card', 2693, 'farecard', 'synonym', 4, 'the same stored-value card');
mergeInto(2695, 'transfer', 46987, 'transfer', 'synonym', 2, 'one sense: changing to another bus or train ([commuting] and [transit] entered twice)');
mergeInto(2696, 'interchange', 47723, 'interchange', 'synonym', 3, 'one sense: a station where you change lines ([station] and [transit] entered twice)');
mergeInto(46940, 'ticket', 2864, 'ticket', 'synonym', 1, 'one sense: a travel ticket ([train], [transport] and [travel] entered three times)');
mergeInto(46940, 'ticket', 48774, 'ticket', 'synonym', 1, 'one sense: a travel ticket');
mergeInto(2492, 'station', 46977, 'station', 'synonym', 1, 'one sense: a train or bus station ([train] and [transport] entered twice)');
mergeInto(40088, 'taxi', 40089, 'cab', 'synonym', 1, 'the same vehicle (grouped as one answer in four themes); gloss "yellow taxi" kept for the text');
mergeInto(2682, 'tuk-tuk', 2683, 'auto rickshaw', 'synonym', 4, 'the same three-wheeled taxi (grouped as one answer in four themes)');
mergeInto(47019, 'shared taxi', 47020, 'collective taxi', 'synonym', 4, 'the same taxi (grouped as one answer); colectivo stays its regional alias');
mergeInto(43527, 'gondola', 47042, 'gondola', 'synonym', 2, 'one sense: the cable-car cabin ([lift] and [ski] entered twice)');
mergeInto(43527, 'gondola', 47072, 'ski gondola', 'synonym', 3, 'the same lift (grouped as one answer in cable cars and lifts)', { del: 'as an alias "ski gondola" would repeat "ski" of ski trip and ski resort (theme-name)' });
mergeInto(43527, 'gondola', 47050, 'telecabine', 'translation', 4, 'the French word for a gondola lift (grouped as one answer)', { region: ['FR'] });
mergeInto(47053, 'bubble chair', 47054, 'bubble lift', 'synonym', 4, 'the same chairlift (grouped as one answer)', { del: 'as an alias "bubble lift" would repeat "lift" of cable cars and lifts (theme-name)' });
mergeInto(47051, 'detachable quad', 47052, 'high-speed quad', 'synonym', 4, 'the same chairlift (grouped as one answer)');
mergeInto(2747, 'air traffic controller', 65658, 'controller', 'synonym', 3, 'a stub of air traffic controller made for air travel, where the full name repeats "air" (contract-type-common); air travel shows it as "controller"', { del: 'not a strict synonym: controller alone names any controller' });
mergeInto(2723, 'flight attendant', 65660, 'attendant', 'synonym', 2, 'a bare stub of flight attendant made for flight crew (now aviation jobs, where the full name no longer leaks)', { del: 'a bare stub (LIBRARY-RULES 5)' });
mergeInto(47077, 'propeller plane', 47078, 'prop plane', 'abbreviation', 3, 'a short form of propeller plane (grouped as one answer)');
mergeInto(47098, 'spy plane', 47097, 'reconnaissance plane', 'synonym', 4, 'the same plane (grouped as one answer); the everyday name is the root');
mergeInto(45043, 'gyrocopter', 39776, 'autogyro', 'synonym', 5, 'the same aircraft (grouped as one answer in flying machines); the more familiar name is the root');
mergeInto(47264, 'JFK', 47265, 'Kennedy Airport', 'synonym', 3, 'the same airport (grouped as one answer)', { del: 'as an alias "Kennedy Airport" would repeat "airport" of famous airports (theme-name)' });
mergeInto(47316, 'neck pillow', 47317, 'travel pillow', 'synonym', 2, 'the same pillow (grouped as one answer in two themes)', { del: 'as an alias "travel pillow" would repeat "travel" of travel accessories (theme-name)' });
mergeInto(47315, 'airline meal', 63319, 'airplane food', 'synonym', 2, 'the same meal (grouped as one answer)');
mergeInto(47312, 'seat pocket', 47313, 'seatback pocket', 'synonym', 3, 'the same pocket (grouped as one answer)');
mergeInto(47308, 'seatbelt sign', 47309, 'fasten seatbelt sign', 'synonym', 3, 'the same sign (grouped as one answer)');
mergeInto(47334, 'exit row', 47335, 'emergency row', 'synonym', 3, 'the same row (grouped as one answer in three themes)');
mergeInto(47339, 'air sickness bag', 2760, 'airsickness bag', 'spelling', 3, 'one word written two ways (air travel and in-flight words held one each)');
mergeInto(47311, 'emergency exit', 46923, 'emergency exit', 'synonym', 2, 'one sense: an emergency exit ([bus] and [plane] entered twice)');
{ const ee = ix.entry.get(47311); if (ee && ee.gloss && !(ix.byText.get('emergency exit') || []).some(x => x !== ee && !x.aliasOf)) setE(ee, 'gloss', '', 'the only entry with this text now; it is in bus and plane themes'); }
dropKin(2788, 'steamer [ship] becomes an alias of steamship, a compound, not one family with steam');
mergeInto(2787, 'steamship', 2788, 'steamer', 'synonym', 3, 'the same ship (grouped as one answer); steamer [cookware] is another entry');
dropKin(2809, 'freighter becomes an alias of cargo ship');
mergeInto(2808, 'cargo ship', 2809, 'freighter', 'synonym', 3, 'the same ship (grouped as one answer in working boats)');
mergeInto(47599, 'port side', 60658, 'portside', 'spelling', 3, 'one word written two ways (both in nautical directions)');
mergeInto(59138, 'barque', 59142, 'bark', 'spelling', 4, 'one word, two spellings (grouped as one answer in sailing ships); gloss ship kept (bark [tree])');
mergeInto(37935, 'ahead', 47604, 'ahead', 'synonym', 2, 'one sense: in front (a ship\'s ahead is everyone\'s ahead; sense-twin)');
mergeInto(37931, 'forward', 47615, 'forward', 'synonym', 2, 'one sense: toward the front (sense-twin; fore and bow are the ship words)');
{ const k = ix.entry.get(47473); if (k && !k.aliasOf) {
  mergeInto(47467, 'knot', 47473, 'knots', 'form', 2, 'the plural of knot [nautical], the speed unit (grouped as one answer in sailing words)');
  const kk = E(47467); if (kk.typ.cruise_words !== undefined && !kk.use?.cruise_words) { kk.use = { ...(kk.use || {}), cruise_words: 47473 }; n++; A.push('knot 47467 shows "knots" (use) in cruise words'); }
  setE(kk, 'gloss', 'speed unit', 'the nautical mile per hour (knot [tie] and others share the text)'); } }
mergeInto(47796, 'Grand Central', 47797, 'Grand Central Terminal', 'synonym', 3, 'the same station (grouped as one answer)');
mergeInto(47801, 'Penn Station', 47802, 'Pennsylvania Station', 'synonym', 3, 'the same station (same-display: both showed "Penn")', { del: 'as an alias "Pennsylvania Station" would repeat "station" of famous train stations (theme-name)' });
mergeInto(47824, 'Chhatrapati Shivaji', 47823, 'Victoria Terminus', 'synonym', 5, 'the old name of the same station (grouped as one answer)');
mergeInto(47721, 'stationmaster', 47832, 'station master', 'spelling', 3, 'one word written two ways', { del: 'as an alias "station master" would repeat "station" of station words (theme-name)' });
mergeInto(47681, 'Pullman car', 2882, 'Pullman', 'synonym', 4, 'the Pullman sleeping car (the company entry held the car in trains and parts of a train)', { region: [] });
dropKin(47699, 'sleeper [train car] becomes an alias of sleeper car');
mergeInto(2880, 'sleeper car', 2881, 'sleeping car', 'synonym', 3, 'the same car (grouped as one answer)');
mergeInto(2880, 'sleeper car', 47699, 'sleeper', 'synonym', 3, 'the same car (grouped as one answer in parts of a train)');
mergeInto(47735, 'Thomas the Tank Engine', 59214, 'Thomas', 'synonym', 1, 'the same character, a second root in famous locomotives');
mergeInto(47907, 'Harley-Davidson', 47908, 'Harley', 'synonym', 1, 'the same make (grouped as one answer)');
mergeInto(44324, "Giro d'Italia", 60713, 'Giro', 'synonym', 3, 'the same race (grouped as one answer)');
mergeInto(44324, "Giro d'Italia", 60714, 'Tour of Italy', 'translation', 3, 'the same race in English (grouped as one answer)');
mergeInto(44325, 'Vuelta a España', 60715, 'Tour of Spain', 'translation', 3, 'the same race in English (grouped as one answer)');
mergeInto(48024, '360 flip', 48025, 'tre flip', 'synonym', 4, 'the same trick (grouped as one answer)');
dropKin(60687, 'board [skateboard] becomes an alias of deck');
mergeInto(48118, 'deck', 60687, 'board', 'synonym', 2, 'the deck is the board (grouped as one answer in skateboard parts)');
mergeInto(5379, 'halfpipe', 60679, 'half pipe', 'spelling', 3, 'one word written two ways (grouped as one answer)');
mergeInto(60720, 'bivy sack', 48487, 'bivouac sack', 'synonym', 5, 'the same sack: bivy sack is the everyday name (familiarity 4 against 5), the shortest form people use (LIBRARY-RULES 5)');
mergeInto(60720, 'bivy sack', 48524, 'bivy', 'abbreviation', 4, 'the same sack (grouped as one answer in tent types)');
mergeInto(63957, 'stuff sack', 60721, 'stuff sack', 'synonym', 4, 'one sense entered twice');
mergeInto(3046, 'pocketknife', 48483, 'pocket knife', 'spelling', 2, 'one word written two ways (campsite and camping gear held one each)');
mergeInto(3032, 'tarp', 3033, 'tarpaulin', 'synonym', 2, 'the same sheet (grouped as one answer in two themes); the short word people use is the root');
mergeInto(48599, 'trailer', 48607, 'travel trailer', 'synonym', 3, 'the same camping trailer (grouped as one answer); its UK alias caravan moves');
mergeInto(46843, 'tow hitch', 48613, 'hitch', 'synonym', 3, 'the same hitch (grouped with towbar in RVs and campers)');
mergeInto(46843, 'tow hitch', 48614, 'towbar', 'spelling', 3, 'the same bar; tow bar is already its UK alias', { del: 'tow bar, the same word, is already an alias' });
mergeInto(15344, 'first aid kit', 46866, 'first aid kit', 'synonym', 1, 'one sense entered twice ([car] and [medical])');
mergeInto(2976, 'bed and breakfast', 2975, 'B&B', 'abbreviation', 2, 'the short form (grouped as one answer)');
dropKin(3007, 'dorm becomes an alias of dormitory');
mergeInto(3006, 'dormitory', 3007, 'dorm', 'abbreviation', 2, 'the short form (grouped as one answer in two themes)');
mergeInto(2981, 'boarding house', 3009, 'lodging house', 'synonym', 4, 'the same house (grouped as one answer)');
mergeInto(2998, 'yurt', 48475, 'ger', 'translation', 4, 'the Mongolian name of the yurt (grouped as one answer)');
mergeInto(48288, 'tollbooth', 46832, 'tollbooth', 'synonym', 3, 'one sense entered twice ([parking] and [toll road])');
mergeInto(59001, 'trip meter', 48292, 'tripometer', 'synonym', 5, 'the same meter');
{ const tm = E(59001); if (tm.show?.road_trip_words) { setShow(tm, 'road_trip_words', null, 'shown by its name, not the rarer tripometer'); tm.nameOkIn = [...new Set([...(tm.nameOkIn || []), 'road_trip_words'])]; reindex(P); A.push('  trip meter 59001: nameOkIn road_trip_words: the name contains "trip"'); } }
{ const pc = ix.entry.get(48837); if (pc && !pc.aliasOf) { mergeInto(48759, 'packing cube', 48837, 'packing cubes', 'form', 3, 'the plural of packing cube');
  const k = E(48759); if (k.typ.travel_accessories !== undefined && !k.use?.travel_accessories) { k.use = { ...(k.use || {}), travel_accessories: 48837 }; n++; A.push('packing cube 48759 shows "packing cubes" (use) in travel accessories'); } } }
mergeInto(48766, 'adapter', 48838, 'travel adapter', 'synonym', 2, 'the same plug adapter', { del: 'as an alias "travel adapter" would repeat "travel" of travel accessories (theme-name)' });
mergeInto(7338, 'power bank', 7339, 'portable charger', 'synonym', 2, 'the same charger (grouped as one answer in two themes)');
mergeInto(48412, 'Chelsea Hotel', 48429, 'Hotel Chelsea', 'synonym', 4, 'the same hotel (same-display: both showed "Chelsea")', { del: 'as an alias "Hotel Chelsea" would repeat "hotel" of famous hotels (theme-name)' });
mergeInto(4860, 'T-shirt', 4861, 'tee', 'abbreviation', 2, 'the short form (grouped as one answer in souvenirs)');
mergeInto(5006, 'folding fan', 48829, 'fan', 'synonym', 2, 'the same fan; gloss folding kept');
mergeInto(46180, 'kokeshi', 59308, 'kokeshi doll', 'synonym', 4, 'the same doll', { del: 'as an alias "kokeshi doll" would repeat "doll" of dolls and figures (theme-name)' });
setE(E(46180), 'fam', 4, 'as kokeshi doll was');
mergeInto(48836, 'worry doll', 59332, 'worry dolls', 'form', 4, 'the plural of worry doll, a second root (worry dolls are Guatemalan, not Mexican: Mexican souvenirs loses them)', { del: 'as an alias "worry dolls" would repeat "doll" of dolls and figures (theme-name)' });
mergeInto(22820, 'hamsa', 22819, 'Hand of Fatima', 'synonym', 4, 'the same amulet (superstitions held both)');
mergeInto(59294, 'worry beads', 59303, 'tespih', 'translation', 5, 'the Turkish word (grouped as one answer)', { region: ['TR'] });
mergeInto(59306, 'lucky cat', 59305, 'maneki-neko', 'translation', 3, 'the Japanese name (grouped as one answer)');
mergeInto(5006, 'folding fan', 59320, 'sensu', 'translation', 5, 'the Japanese word (grouped as one answer)');
mergeInto(25682, 'wind chime', 59317, 'furin', 'translation', 5, 'the Japanese word (grouped as one answer)');
mergeInto(47073, 'lift pass', 47074, 'ski pass', 'synonym', 2, 'the same pass (grouped as one answer in ski trip)', { del: 'as an alias "ski pass" would repeat "ski" of ski trip and ski resort (theme-name)' });
mergeInto(47073, 'lift pass', 43539, 'ski pass', 'synonym', 2, 'the same pass, a second root in skiing words (Sports & Games)', { del: 'as an alias "ski pass" would repeat "ski" of ski trip and ski resort (theme-name)' });
mergeInto(3108, 'cement mixer', 3109, 'concrete mixer', 'synonym', 2, 'the same truck (grouped as one answer in three themes)');
mergeInto(3108, 'cement mixer', 49201, 'concrete truck', 'synonym', 2, 'the same truck (grouped as one answer in truck types)', { del: 'as an alias "concrete truck" would repeat "truck" of truck types (theme-name)' });
mergeInto(3099, 'bulldozer', 3100, 'dozer', 'abbreviation', 3, 'the short form (grouped as one answer in two themes)');
mergeInto(3113, 'garbage truck', 49258, 'refuse truck', 'synonym', 4, 'the same truck (grouped as one answer)', { del: 'as an alias "refuse truck" would repeat "truck" of truck types (theme-name)' });
mergeInto(3148, 'grader', 3149, 'road grader', 'synonym', 4, 'the same machine (grouped as one answer in two themes)');
dropKin(49255, 'tanker [truck] becomes an alias of tanker truck');
mergeInto(3119, 'tanker truck', 49255, 'tanker', 'synonym', 2, 'the same truck; its UK alias road tanker moves');
{ const mv = ix.entry.get(67182); if (mv && !mv.aliasOf) { out('car_types', [[67182, 'moving van']], 'a truck, not a type of car'); out('modes_of_transport', [[67182, 'moving van']], 'a kind of truck, not a mode of transport (truck and van are there)');
  mergeInto(49127, 'moving truck', 67182, 'moving van', 'synonym', 2, 'the same truck (grouped as one answer in delivery vehicles); its UK alias removal van moves', { del: 'as an alias "moving van" would repeat "moving" of moving house (theme-name)' });
  const mt = E(49127); if (mt.show?.moving_house) { setShow(mt, 'moving_house', null, 'moving truck has a UK regional alias now (removal van): no show, the full name with nameOkIn'); mt.nameOkIn = [...new Set([...(mt.nameOkIn || []), 'moving_house'])]; reindex(P); } } }
mergeInto(3150, 'mail truck', 49113, 'postal van', 'synonym', 3, 'the same van (grouped as one answer)');
mergeInto(49189, 'car transporter', 49190, 'car carrier', 'synonym', 3, 'the same truck (grouped as one answer)');
mergeInto(3162, 'tractor trailer', 49186, 'big rig', 'synonym', 2, 'the same truck (grouped as one answer in truck types)', { region: ['US'] });
mergeInto(3162, 'tractor trailer', 49187, '18-wheeler', 'synonym', 3, 'the same truck (grouped as one answer)', { region: ['US'] });
mergeInto(47886, 'electric bike', 63994, 'e-bike', 'abbreviation', 2, 'the short form (grouped as one answer in electric vehicles)', { del: 'as an alias "e-bike" would repeat "bike" of bike types (theme-name)' });
mergeInto(188, 'Tesla', 46567, 'Tesla', 'synonym', 1, 'one sense: the carmaker ([car] and [car company] entered twice)');
mergeInto(67052, 'hybrid car', 46641, 'hybrid', 'synonym', 2, 'the same car; gloss car kept');
mergeInto(49227, 'Tesla Model S', 59035, 'Model S', 'synonym', 3, 'the same car (famous car models shows "Model S")', { keepShow: true, del: 'as an alias "Model S" would repeat "model" of famous car models (theme-name)' });
mergeInto(23067, 'Model T', 62642, 'Tin Lizzie', 'synonym', 4, 'the nickname of the Model T, which stood in for it in famous car models (the note names Model T)', { keepShow: false });
{ const mt = E(23067); if (mt.show?.famous_car_models) { setShow(mt, 'famous_car_models', null, 'the car is shown by its name, not its nickname'); mt.nameOkIn = [...new Set([...(mt.nameOkIn || []), 'famous_car_models'])]; reindex(P); A.push('  Model T 23067: nameOkIn famous_car_models: the name contains "model" (as Model S)'); } }
mergeInto(37264, 'Route 66', 62671, 'Mother Road', 'synonym', 4, 'the nickname of Route 66, which stood in for it in famous routes (the note names Route 66)');
mergeInto(32058, 'Masai Mara', 48735, 'Maasai Mara', 'spelling', 3, 'the same reserve, written two ways (safari words and African national parks held one each)');
setE(E(32058), 'fam', 3, 'as Maasai Mara was (a spelling alias is never easier than its root)');
mergeInto(36923, 'Canal du Midi', 65678, 'Midi', 'synonym', 4, 'a stub of Canal du Midi made for famous canals; the canal is shown "Midi" there');
mergeInto(34714, 'USS Missouri', 47539, 'Missouri', 'synonym', 3, 'the same battleship (warships holds USS Missouri)');
setE(E(34714), 'fam', 3, 'as Missouri [battleship] was');
mergeInto(6753, 'HMS Beagle', 62003, 'Beagle', 'synonym', 3, 'the same ship, a second root in famous voyages (History & Myth)');
{ const sh = ix.entry.get(2676); if (sh && !sh.aliasOf) unlinkE(chk(2676, 'shuttle'), 'public_transportation', 'a kind of bus (shuttle bus is in bus types; the vehicles are in types of public transport and bus types)'); }
mergeInto(46881, 'shuttle bus', 2676, 'shuttle', 'synonym', 2, 'the same bus; gloss bus kept');
mergeInto(48547, 'tepee', 48535, 'teepee', 'spelling', 3, 'one word, two spellings (Merriam-Webster: tepee, also teepee; v437 does the same)');
mergeInto(48547, 'tepee', 48479, 'tipi', 'spelling', 3, 'one word, three spellings (grouped as one answer in tent types)');
setE(E(48547), 'fam', 3, 'as teepee and tipi');
mergeInto(2672, 'double-decker', 40085, 'double-decker bus', 'synonym', 1, 'the same bus, known everywhere (bus types showed it as "double-decker"); the UK tag goes with the second root', { del: 'as an alias "double-decker bus" would repeat "bus" of bus types (theme-name)' });
mergeInto(48843, 'toiletry bag', 48804, 'dopp kit', 'synonym', 4, 'the US name of the toiletry bag (grouped with wash bag as one answer in toiletries)', { region: ['US'] });
{ const b = ix.entry.get(65654); if (b) { out('bus_types', [[65654, 'bendy']], 'a bare stub of bendy bus, the UK alias of articulated bus, grouped with it here'); delE(65654, 'bendy', 'bendy [long hinged], a bare stub of bendy bus (LIBRARY-RULES 5); in no theme now'); } }
delAlias(38313, 'turnpike', 'a turnpike is a toll road, not a toll; turnpike [toll] 62632 is its own root in road types');
{ const sq = chk(44434, 'Squaw Valley');
  if (sq.typ.famous_ski_resorts !== undefined) { const p = newEntry('Palisades Tahoe', '', { pos: 'noun', type: 'place', fam: 4 }, 'the resort\'s name since 2021 (Simon, 2026-11-23)');
    linkE(p, 'famous_ski_resorts', sq.typ.famous_ski_resorts, 'the resort under its current name (Simon, 2026-11-23)');
    unlinkE(sq, 'famous_ski_resorts', 'renamed Palisades Tahoe in 2021 because "squaw" is widely seen as a slur; Squaw Valley stays only in Olympic host cities, for 1960 (Simon, 2026-11-23)'); }
  setE(sq, 'offensive', true, 'the name contains "squaw", widely seen as a slur (LIBRARY-RULES 5, Offensive words; Simon, 2026-11-23); it stays in Olympic host cities for 1960'); }
{ const lp = chk(2581, 'license plate'), np = chk(48295, 'number plate game');
  const g = newEntry('license plate game', '', { pos: 'noun', type: 'common', fam: 2 }, 'the road trip game of spotting license plates (Simon, 2026-11-23): number plate game was an alias of license plate, not the same answer in every theme');
  if (lp.typ.road_trip_games !== undefined) { linkE(g, 'road_trip_games', lp.typ.road_trip_games, 'the game takes the link of license plate (Simon, 2026-11-23)', { nameOk: true }); unlinkE(lp, 'road_trip_games', 'the plate, not the game: license plate game takes the link'); }
  if (np.aliasOf !== g.id) { A.push(`number plate game 48295: alias of license plate 2581 -> ${lab(g)}: the UK name of the game (Simon, 2026-11-23)`); np.aliasOf = g.id; n++; reindex(P); }
  setE(np, 'aliasKind', 'regional', 'the UK name of the license plate game'); setE(np, 'type', 'common', 'the name of a game, as its root');
  setE(np, 'nameOkIn', ['road_trip_games'], 'the UK name repeats "game" of road trip games, as its root does'); }
setT('public_transportation', 'note', 'travelling by public transport: stops and stations, tickets and fares, services and people; the vehicles are in types of public transport and bus types', 'the vehicles moved to its sub-theme types of public transport');
setT('airlines_of_the_americas', 'region', [], 'a mixed theme: LATAM, Avianca, Aeromexico and Copa are Latin American (LIBRARY-RULES 4, region)');
setT('animal_powered_travel', 'note', 'ways of travelling powered by animals: horseback, camel caravan, dog sled, ox cart, stagecoach, horse and buggy, sleigh', 'the theme keeps the ways of travelling; the animals themselves are in the animal themes');
out('animal_powered_travel', [[1002, 'camel'], [158, 'donkey'], [979, 'elephant'], [163, 'mule'], [160, 'llama'], [159, 'ass'], [1454, 'water buffalo']], 'an animal, not a way of travelling (the theme holds horseback, camel caravan, pack mule, dog sled and the vehicles; the animal is in working animals and the other animal themes)');
mergeInto(47127, 'air brake', 47128, 'speed brake', 'synonym', 4, 'one sense in plane parts (grouped as one answer): the aircraft air brake is the speed brake; air brake [train] is the train one');
for (const [id, text, typ] of [[47217, 'Turkish Airlines', 2], [59117, 'Pegasus', 3], [59122, 'SunExpress', 4], [59123, 'AnadoluJet', 5]]) { const e = chk(id, text);
  linkE(e, 'european_airlines', typ, 'a Turkish airline based in Istanbul, a member of the European airline groups (Star Alliance, IATA Europe)', id === 47217 ? { show: 'Turkish' } : {});
  out('middle_eastern_airlines', [[id, text]], 'Turkish, not Middle Eastern (now in European airlines)'); }
for (const [id, text, fam, why] of [[50013, 'Aspen', 2, 'nearly every adult knows Aspen as a ski town'], [48982, 'Whistler', 2, 'the best-known Canadian resort (2010 Olympics)'], [48984, 'St. Moritz', 2, 'a famous name for the rich and the Winter Olympics'],
  [44432, 'Chamonix', 3, 'many adults know it (first Winter Olympics, Mont Blanc)'], [32160, 'Inca Trail', 2, 'nearly every adult knows the trail to Machu Picchu'], [48679, 'Everest Base Camp', 2, 'nearly every adult knows it'],
  [2867, 'Shinkansen', 3, 'many adults know the Japanese bullet train by name']]) setE(chk(id, text), 'fam', fam, `${why} (the theme had almost no easy words; 4 or 3 was too hard)`);
rate(chk(36840, 'Lake Placid'), 'famous_ski_resorts', 2, 'a two-time Winter Olympics host (4 was too peripheral)');
rate(chk(44435, 'Innsbruck'), 'famous_ski_resorts', 3, 'a two-time Winter Olympics host (4 was too peripheral)');
linkE(chk(2867, 'Shinkansen'), 'high_speed_trains', 1, 'the first high-speed train, named first in the note; it was missing from the theme');
setT('public_transportation', 'pop', 2, 'now the stops, tickets, fares and people of public transport (the vehicles are in its sub-theme types of public transport, pop 1): popular, not a headline theme');

mergeInto(38398, 'traffic circle', 48253, 'traffic circle', 'synonym', 3, 'one sense entered twice ([junction] and [directions]); the duplicate UK alias roundabout goes with it');
mergeInto(7127, 'space shuttle', 63990, 'shuttle', 'synonym', 2, 'a bare stub of space shuttle made for space vehicles, where the full name repeats "space"; space shuttle is shown "shuttle" there', { del: 'a bare stub (LIBRARY-RULES 5)' });

// =================================================================================================
sec('4. Wrong senses');
{ const cs = chk(2801, 'captain'), cc = chk(47168, 'captain');
  for (const tid of ['ship_crew', 'cruise_words']) swap(tid, cc, cs, 'the ship\'s captain (sense-link: captain [ship] fits the theme)');
  if (cc.gloss !== 'airline') setE(cc, 'gloss', 'airline', 'what is left of captain [crew]: the airline captain in aviation jobs and people at an airport'); }
{ const sia = chk(11505, 'Sia');
  if (sia.typ.airlines !== undefined || sia.typ.asian_airlines !== undefined) {
    const sa = newEntry('Singapore Airlines', '', { pos: 'noun', type: 'org', fam: 2 }, 'the airline; the singer Sia held its links in airlines and Asian airlines');
    swap('airlines', sia, sa, 'the airline', { show: 'Singapore' }); swap('asian_airlines', sia, sa, 'the airline', { show: 'Singapore' }); } }
swap('island_getaways', chk(35766, 'Fiji'), chk(36586, 'Fiji'), 'the islands (sense-twin: Fiji [islands] names the theme)');
swap('island_getaways', chk(35772, 'Mauritius'), chk(36599, 'Mauritius'), 'the island (sense-twin)');
swap('american_holiday_spots', chk(59042, 'Daytona'), chk(36622, 'Daytona Beach'), 'the beach resort (Daytona [59042] is the speedway in famous race tracks)');
split(57047, 'Indianapolis', 'city', 'circuit', { type: 'place', fam: 2 }, ['famous_race_tracks'], 'the Indianapolis Motor Speedway, home of the Indy 500; the city held the link (as Monaco [circuit] beside Monaco)');
split(57105, 'Bathurst', 'city', 'circuit', { type: 'place', fam: 4 }, ['famous_race_tracks'], 'Mount Panorama at Bathurst; the city held the link');
{ const pf = chk(30193, 'petrified forest');
  if (pf.typ.us_national_parks !== undefined || pf.typ.desert_parks !== undefined) { const p = newEntry('Petrified Forest', 'park', { pos: 'noun', type: 'place', fam: 3 }, 'Petrified Forest National Park; the common noun (fossil wood) held the park links');
    for (const tid of ['us_national_parks', 'desert_parks']) swap(tid, pf, p, 'the national park'); }
  if (pf.gloss !== 'fossil wood') setE(pf, 'gloss', 'fossil wood', 'its text is now shared with Petrified Forest [park]'); }
{ const g = chk(20962, 'Genoa');
  if (g.typ.sailing_words !== undefined || g.typ.gear_above_the_deck !== undefined) { const s = newEntry('genoa', 'sail', { pos: 'noun', type: 'common', fam: 4 }, 'the large overlapping jib; the city Genoa held the link, shown lowercase');
    for (const tid of ['sailing_words', 'gear_above_the_deck']) swap(tid, g, s, 'the sail'); }
  if (g.gloss !== 'city') setE(g, 'gloss', 'city', 'its text is now shared with genoa [sail]'); }
split(1492, 'saddle', 'horse gear', 'bicycle', { type: 'common', fam: 1 }, ['bicycle_parts'], 'the seat of a bicycle; saddle [horse gear] held the link');
split(42584, 'fairing', 'rocket', 'motorcycle', { type: 'common', fam: 4 }, ['motorcycle_parts'], 'the streamlined shell of a motorcycle; fairing [rocket] held the link');
setE(chk(28438, 'burner'), 'gloss', 'balloon', 'the entry is only in hot air balloon parts: the propane burner of a balloon, not a stove ring (burner [disposable] shares the text)');
out('parts_of_a_train', [[47128, 'speed brake']], 'an aircraft part (speed brake = air brake [aircraft]), not a train part');
split(47127, 'air brake', 'aircraft', 'train', { type: 'common', fam: 3 }, ['parts_of_a_train'], 'the compressed-air brake of a train; air brake [aircraft] (the speed brake) held the link');
{ const b = chk(47035, 'bajaj');
  if (b.typ.motorcycle_brands !== undefined) { const p = newEntry('Bajaj', 'motorcycle maker', { pos: 'noun', type: 'org', fam: 4 }, 'Bajaj Auto, the Indian motorcycle maker; the lowercase bajaj [auto rickshaw] held the link');
    swap('motorcycle_brands', b, p, 'the maker'); }
  if (b.gloss !== 'auto rickshaw') setE(b, 'gloss', 'auto rickshaw', 'the Indonesian word for the auto rickshaw (taxis of the world); Bajaj [motorcycle maker] is the company'); }
out('vehicle_sounds', [[5276, 'Putt-Putt']], 'the Putt-Putt mini golf brand (org, tagged US), not the sound (listed for the Sports & Games batch: the sound needs its own entry there, which the case lint ties to this one)');
split(45128, 'bobber', 'fishing float', 'motorcycle', { type: 'common', fam: 4 }, ['motorcycle_types'], 'the stripped-down custom motorcycle; bobber (the US word for a fishing float, tagged US) held the link');
{ const f = chk(46690, 'F1');
  unlinkE(f, 'motor_racing', 'the F1 key (keyboard keys); Formula 1, grouped with it, is the race series and takes F1 as its abbreviation');
  if (f.gloss !== 'key') setE(f, 'gloss', 'key', 'its text is now shared with F1 [racing], the abbreviation of Formula 1');
  newEntry('F1', 'racing', { aliasOf: 46689, aliasKind: 'abbreviation', region: [], pos: 'noun', type: 'proper', fam: 1 }, 'the short name of Formula 1'); }
setE(chk(46689, 'Formula 1'), 'fam', 1, 'as F1 (every adult knows Formula 1)');
setE(chk(2823, 'galley'), 'gloss', 'kitchen', 'sense-twin with galley [ship]: the glosses shared "ship"; the kitchen of a ship or plane (galley [plane] is the plane one)');
setE(chk(47431, 'galley'), 'gloss', 'oared vessel', 'sense-twin with galley [ship kitchen]: the glosses shared "ship"');
setE(chk(50071, 'podium'), 'gloss', "winners' platform", "sense-twin with podium [conductor's stand]: the glosses shared \"stand\"");
setE(chk(46694, 'rally'), 'gloss', 'car racing', 'sense-twin with rally [racket sports]: the glosses shared "sport"');
{ const z = ix.entry.get(48494); if (z) { swap('tent_parts', chk(48494, 'zip'), chk(5023, 'zipper'), 'the zipper (zip is its UK alias); zip [tent] was a second root of it'); delE(48494, 'zip', 'a second root of the zipper made for tent parts; in no theme now'); } }
{ const s = ix.entry.get(63909); if (s) { unlinkE(chk(63909, 'season'), 'ticket_words', 'a bare stub of season ticket (UK alias of commuter pass); the full term cannot be linked here: every name of it repeats "ticket" of ticket words (commuter pass is in commuting words)'); delE(63909, 'season', 'a stub of commuter pass / season ticket made for ticket words; in no theme now'); } }
{ const s = ix.entry.get(65655); if (s) { unlinkE(chk(65655, 'booth'), 'ticket_words', 'a bare stub of ticket booth; the full term cannot be linked here: it and its UK alias ticket office repeat "ticket" (ticket booth is in station words)'); delE(65655, 'booth', 'a bare stub of ticket booth (LIBRARY-RULES 5); in no theme now'); } }
{ const s = ix.entry.get(63993); if (s) { swap('truck_types', chk(63993, 'reefer'), chk(49126, 'refrigerated truck'), 'the full term; reefer [chilled cargo] was a slang stub of it', { show: 'refrigerated' }); delE(63993, 'reefer', 'a slang stub of refrigerated truck made for truck types (reefer is also marijuana); in no theme now'); } }
out('emergency_vehicles', [[62692, 'fire engine']], 'fire engine is the UK alias of fire truck, grouped with it here (fire engine [emergency] stays for fire ___, which needs both words)');
linkE(chk(3089, 'fire truck'), 'truck_types', 1, 'the fire truck (fire engine [emergency], a second root of it, held the place)', { nameOk: true });
out('truck_types', [[62692, 'fire engine']], 'fire truck takes the place (fire engine is its UK alias)');

// =================================================================================================
sec('5. Belonging');
out('cars', [[23856, 'wash']], 'wash [cleaning] is the verb; car wash is in gas station');
for (const tid of ['cars', 'car_parts', 'exterior_parts', 'motorcycle_parts']) out(tid, [[2572, 'headlamp']], 'the lamp worn on the head (its UK alias is head torch); the vehicle lamp is the headlight, grouped with it');
out('driving_words', [[38385, 'traffic jam'], [38396, 'speed limit'], [38402, 'road rage'], [2668, 'rush hour'], [38400, 'intersection'], [38406, 'contraflow'], [46681, 'filter lane'], [33651, 'jaywalking'], [38404, 'carpool'], [38398, 'traffic circle']],
  'traffic or the road, not driving: in traffic words (Places & Geography), road signs or giving directions; driving words keeps what a driver does (xwords-twin with traffic words: 14 of 40 shared)');
out('public_transportation', [[2646, 'bus'], [2647, 'subway'], [39524, 'train'], [2652, 'streetcar'], [2654, 'ferry'], [40088, 'taxi'], [47041, 'cable car'], [2670, 'monorail'], [2671, 'minibus'],
  [2674, 'coach'], [2669, 'light rail'], [2682, 'tuk-tuk'], [2675, 'trolleybus'], [2684, 'rickshaw'], [2685, 'jeepney'], [2687, 'funicular'], [2691, 'water bus'], [2686, 'matatu'],
  [2655, 'school bus'], [2672, 'double-decker'], [2702, 'articulated bus'], [2673, 'night bus'], [2688, 'people mover'], [2703, 'dolmuş']],
  'a kind of vehicle: types of public transport (now its sub-theme), bus types and taxis of the world hold the vehicles, as the note says; public transport words keeps stops, tickets, fares, services and people (theme-twin and xwords-twin: 20 of 24 shared, LIBRARY-RULES 6)');
out('public_transportation', [[2668, 'rush hour'], [2681, 'end of the line']], 'a commuting word (in commuting words, grouped there with terminus): public transport words shared 9 of 30 with its sub-theme commuting words (xwords-twin)');
out('trains', [[2887, 'viaduct'], [2888, 'switch'], [2901, 'junction'], [2902, 'derailment'], [2896, 'branch line'], [2897, 'siding'], [2900, 'marshalling yard'], [2898, 'spur']],
  'a railroad line word, in its sub-theme railway words: railway words shared 12 of 32 with trains (xwords-twin); trains keeps the trains, their parts, people and the everyday track, tunnel and signal');
out('bus_types', [[50478, 'Greyhound'], [2652, 'streetcar']], 'not a type of bus: a bus company (in public transport words) / a tram');
{ const r = ix.entry.get(46900); if (r) { out('bus_types', [[46900, 'RV bus']], 'not an established term (a bus conversion is in RVs and campers)'); delE(46900, 'RV bus', 'made for bus types only; in no theme now'); } }
out('electric_vehicles', [[23150, 'car'], [48055, 'kick scooter']], 'not electric: the general word car beside its electric kinds / a scooter pushed by foot');
out('horse_drawn_vehicles', [[48228, 'dog sled']], 'pulled by dogs (in animal-powered travel)');
out('truck_types', [[2655, 'school bus']], 'a bus, not a truck');
out('vehicle_sounds', [[46600, 'horn']], 'a part, not a sound (honk and toot are there); it showed its UK alias "hooter" to every player');
out('tourist_attractions', [[1904, 'gulch'], [1905, 'arroyo']], 'a dry ravine, not a tourist attraction (it was grouped with canyon)');
rate(chk(34, 'castle'), 'tourist_attractions', 2, 'one of the first attractions anyone names (5 was "peripheral")');
rate(chk(2867, 'Shinkansen'), 'trains', 3, 'a named train system, not one of the first train words (1 was too typical)');
out('traditional_boats', [[47018, 'vaporetto']], 'a modern Venetian water bus (in taxis of the world)');
out('sailing_words', [[24593, 'rain hat']], 'a hat, not a sailing word (sou\'wester, the sailor\'s hat, stays)');
out('cycling_words', [[47477, 'headwind']], 'the sailing entry, and weather rather than a cycling term');
{ const fm = ix.entry.get(47196); if (fm) { out('flight_crew', [[47196, 'first mate']], 'a ship\'s officer; the aircraft rank is first officer, in the theme'); delE(47196, 'first mate', 'first mate [aircraft], a misuse made for flight crew; in no theme now'); } }
linkE(chk(47186, 'jump seat'), 'places_you_can_sit', 4, 'the fold-down crew seat on a plane');
out('flight_crew', [[47186, 'jump seat']], 'a seat, not a job (now in places to sit on a plane)');
out('tent_parts', [[6606, 'lobby'], [6615, 'veranda'], [6616, 'stoop']], 'a part of a building (the tent\'s entrance is vestibule or porch, in the theme)');
out('skate_park_features', [[345, 'loveseat'], [43577, 'skate park']], 'loveseat [sofa] is furniture / the skate park is the whole place, not a feature');
{ const el = ix.entry.get(63346); if (el) { out('scooters_and_skates', [[63346, 'electric']], 'an adjective stub, not a scooter or skate (electric skateboard and e-scooter are there)'); delE(63346, 'electric', 'electric [powered], a bare modifier stub made for scooters and skates; in no theme now'); } }
out('hot_air_balloon_parts', [[2802, 'crew'], [47416, 'chase vehicle'], [27773, 'hot air'], [30682, 'wicker']], 'not a part of a balloon: the crew, their car, the air inside, the material of the basket');
{ const l = ix.entry.get(47417); if (l) { out('hot_air_balloon_parts', [[47417, 'lift']], 'a force, not a part'); delE(47417, 'lift', 'lift [balloon], made for hot air balloon parts only; in no theme now'); } }
out('cable_cars_and_lifts', [[47057, 'inclined plane']], 'a simple machine (in simple machines), not a lift');
out('safari_words', [[27372, 'zebra crossing']], 'a road crossing, not a safari word');
out('beach_gear', [[2762, 'wind sock']], 'an airfield wind indicator (in air travel), not beach gear');
out('sightseeing_words', [[14687, 'lookout']], 'lookout [person] is the watchman, not a sightseeing word');
out('famous_hotels', [[48428, 'Hotel California']], 'a song by the Eagles, not a hotel');
out('hotel_chains', [[48464, 'Hostelworld']], 'a booking website, not a hotel chain');
linkE(chk(48385, 'pied-à-terre'), 'vacation_homes', 4, 'a small second home in a city');
out('room_types', [[48385, 'pied-à-terre']], 'a small second home, not a hotel room (now in vacation homes)');
out('souvenirs', [[963, 'cuppa']], 'a cup of tea to drink, not a souvenir (tea is there)');
out('turkish_souvenirs', [[963, 'cuppa']], 'a British word for a cup of tea, not a Turkish souvenir (Turkish tea is there)');
out('taxis_of_the_world', [[67180, 'taxi stand']], 'where taxis wait, not a kind of taxi (it showed "rank", hiding its UK alias taxi rank)');
out('traditional_lodgings', [[118, 'igloo'], [29489, 'wigwam'], [48476, 'longhouse'], [48480, 'hogan'], [38296, 'tulou'], [38298, 'minka'], [48547, 'tepee']],
  'a traditional home, not a place where travelers stay (all are in traditional dwellings, Places & Geography)');
linkE(chk(47679, 'heritage railway'), 'railway_words', 4, 'a preserved railway line', { nameOk: true });
out('train_types', [[47679, 'heritage railway']], 'a railway, not a kind of train (now in railway words)');
out('farm_vehicles', [[3162, 'tractor trailer']], 'a semi truck, not a farm vehicle (tractor and grain truck are there)');

// =================================================================================================
sec('6. Case, type and spelling');
for (const [id, from, to] of [[47565, "Hangman's knot", "hangman's knot"], [47571, "Fisherman's knot", "fisherman's knot"], [47572, "Monkey's fist", "monkey's fist"], [47573, "Trucker's hitch", "trucker's hitch"],
  [47576, "Lark's head", "lark's head"], [47581, "Surgeon's knot", "surgeon's knot"]])
  retext(id, from, to, 'common', 'a knot named after a trade or animal, not a proper name: lowercase common, like reef knot and clove hitch (Turk\'s head, Windsor and Prusik keep their capitals)');
retext(47825, 'Gare de lEst', "Gare de l'Est", null, 'the apostrophe was missing');
retext(47828, 'Gare dAusterlitz', "Gare d'Austerlitz", null, 'the apostrophe was missing');
retext(48007, 'grupetto', 'gruppetto', null, 'the Italian cycling word is spelled gruppetto');
{ const c = retext(59348, 'carnival', 'Carnival Cruise Line', 'org', 'the cruise line is a brand (capital); its full name, as Disney Cruise Line, so it does not share a spelling with carnival [festival]'); if (c.show?.cruise_lines !== 'Carnival') setShow(c, 'cruise_lines', 'Carnival', 'the full name repeats "cruise" of the theme name: shown short like Disney and Celebrity'); }
retext(48568, 'pot noodle', 'Pot Noodle', 'proper', 'a brand name (a named product, capital, tm)');
retype(59314, 'Tokyo Banana', 'proper', 'a named product (capital, tm), not a common noun');
for (const [id, text] of [[6750, 'Mayflower'], [6752, 'Kon-Tiki'], [47835, 'Pullman porter'], [60672, 'Tour de France Femmes']]) retype(id, text, 'proper', 'the name of a ship, raft, job or race, not a title (book or film)');
{ const m = E(62668); if (m.text === 'MTB') { retext(62668, 'MTB', 'mountain bike', 'common', 'the full term; MTB becomes its abbreviation (bike types showed only the abbreviation, at typicality 1)'); setE(m, 'fam', 1, 'every adult knows the mountain bike'); }
  if (m.show?.bike_types !== 'mountain') setShow(m, 'bike_types', 'mountain', 'the full term contains "bike" of the theme name: shown short like road, folding and electric');
  newEntry('MTB', '', { aliasOf: 62668, aliasKind: 'abbreviation', region: [], pos: 'noun', type: 'acronym', fam: 3 }, 'the abbreviation of mountain bike');
  const mb = chk(5621, 'mountain biking'); if (!(m.kin || []).includes(5621)) { setKin(P, m, mb, true); n++; A.push('kin: mountain bike 62668 <-> mountain biking 5621: one word family in different themes'); } }
swapRootText(46719, 'give way', 46718, 'yield', 'the US word is the root and the UK word its regional alias (LIBRARY-RULES 5; v413 left the flip for later); the US word was the alias, tagged UK', { rootGloss: 'sign', aliasGloss: '', aliasRegion: ['UK'] });
{ swapRootText(49080, 'plough', 59436, 'plow', 'US spelling as root (LIBRARY-RULES 5; alias-kind-suspect: a US spelling was the alias); plough becomes its UK spelling', { aliasRegion: ['UK'] });
  const pl = E(49080); if (pl.typ.ough_words !== undefined && pl.show?.ough_words !== 'plough') setShow(pl, 'ough_words', 'plough', 'the ough words theme (locked wordplay) needs the UK spelling: link the root and show the alias text (LIBRARY-RULES 5, Aliases)'); }
swapRootText(48919, 'flaneur', 48920, 'flâneur', 'rule 8: Merriam-Webster prints flâneur; the plain form stays its spelling');
setAlias(3132, 'combine harvester', 3133, 'synonym', 'the long name of the combine, not a spelling of it (alias-kind-suspect)');
setAlias(4998, 'keyring', 4996, 'regional', 'the UK word for a keychain, not a spelling of it (alias-kind-suspect)', ['UK']);
setAlias(46261, 'narguile', 46259, 'synonym', 'a variant of narghile, not a spelling of hookah (alias-kind-suspect)');
setAlias(43468, 'jibing', 47460, 'form', 'a form of the verb jibe, not of the sail jib');
setAlias(2704, 'dolmus', 2703, 'spelling', 'the plain form of dolmuş: untagged (rule 8)', []);
delAlias(47490, 'key', 'not a spelling of quay: key is another word (a low island, cay) (alias-kind-suspect)');
delAlias(48908, 'tendering', 'not a form of tender [ship boat]: tendering is another word (offering, a bid)');
const KEEP_PHRASE = new Set([48279, 48271, 48915, 26807, 48894, 2681, 2961, 48321, 60689, 60692, 48606]);   // class A (typed below); are we there yet, you can't miss it, off the beaten path, bon voyage, all aboard, end of the line, milk run, do not disturb, as the crow flies, a stone's throw
for (const e of [...P.entries]) if (!e.aliasOf && e.type === 'phrase' && !KEEP_PHRASE.has(e.id) && linkIds(P, e).some(inGroup))
  setE(e, 'type', /[A-Z]/.test(e.text) ? 'proper' : 'common', 'the name of a thing, place, job, activity or game, not an idiom: type phrase is for idioms and set phrases only (LIBRARY-RULES 4; contract-type-common)');
retype(48606, 'class A', 'common', 'a class of motorhome, a common noun (the A is a letter, not a name)');
for (const [id, text] of [[60689, 'as the crow flies'], [60692, "a stone's throw"]]) retype(id, text, 'phrase', 'an idiom (LIBRARY-RULES 4, type)');

// =================================================================================================
sec('7. Ratings, groups and shown texts');
setE(chk(48843, 'toiletry bag'), 'fam', 3, 'many adults know the term (wash bag, toilet bag and Dopp kit are as common); 2 was easier than its use (rating-vs-zipf)');
setE(chk(44324, "Giro d'Italia"), 'fam', 3, 'as Giro and Tour of Italy, its aliases now (many adults know the Giro)');
leaveGroup('cycling_races', 47983, 'the Giro Rosa is the women\'s race, not the same answer as the Giro d\'Italia');
leaveGroup('parking_words', 46801, 'a kind of parking space, not the same answer');
leaveGroup('parking_words', 46823, 'an EV charging bay is not bay parking (a way of parking)');
{ const kd = E(62524); if (kd.typ.campsite !== undefined && kd.use?.campsite !== 3042) { kd.use = { ...(kd.use || {}), campsite: 3042 }; n++; touchedT.add('campsite'); A.push('kindle 62524 shows its form kindling (use) in campsite: the thing at a campsite, not the verb'); } }
// a shown text hides a region's alias from those players: on unlocked themes the full name is shown (with nameOkIn where it holds a theme-name word)
for (const tid of groupThemes()) { const t = T(tid); if (themeLocked(P, t)) continue;
  for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid])) {
    const al = P.entries.filter(a => a.aliasOf === e.id && (a.aliasKind === 'regional' || a.aliasKind === 'spelling') && a.region?.length);
    if (!al.length) continue;
    setShow(e, tid, null, `it has the alias ${al.map(a => `${a.text} [${a.region}]`).join(', ')}: a shown text would hide it from those players (LIBRARY-RULES 4, show); the full name is shown`);
    if (leakOf(e, tid)) { e.nameOkIn = [...new Set([...(e.nameOkIn || []), tid])]; reindex(P); A.push(`  ${lab(e)}: nameOkIn ${tid}: the full name contains a word of the theme name`); } } }
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');

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
const tLast = (() => { for (let i = x1.themes.length - 1; i >= 0; i--) if (x0.themes[i] !== x1.themes[i]) return i; return -1; })();
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.map(t => `${t} (index ${x0.themes.indexOf(t)})`).join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to the last index ${x1.themes.length - 1}`}`);
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
const summary = [`Library batch v438: tidy-up step 3, Travel & Transport (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch438-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch438-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch438-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

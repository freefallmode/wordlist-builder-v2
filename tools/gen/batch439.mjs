// Library batch v439: tidy-up step 3 (TIDY-UP.md), the Body & Health group: every theme under body_health read against the checklist
// (senses, belonging, twins, names, spread, ratings, complete sets, case and aliases, families, size, the tree). For Simon's review.
// Base: library v436. Applied after v437 (Places & Geography) and v438 (Travel & Transport): everything here works by entry id + text and
// theme id, never by position, and every step is skipped when it is already done (rerun: 0 changes). A merge that another batch has already
// made (in either direction) is skipped.
// Julia's themes (senses, healing traditions, sleep, nutrition, fitness, mind and wellbeing, babies and birth; v421, v423-v429, reviewed by
// Simon) are only checked against the new checks and mechanical faults (two roots of one sense, alias kinds, a type); her decisions stand.
//   1. Twins and the tree: healthcare workers (7 of 8 words in medical jobs), bone and joint injuries (6 of 9 words are fracture types, all
//      9 in injuries) and cortex areas (4 words, all in brain parts; cerebral cortex is the whole cortex, not an area) deleted; hand parts,
//      foot parts and fingers become sub-themes of hands and feet.
//   2. Two roots of one sense merged: the sniffles, common cold, mono/mononucleosis, otitis media, torn ACL, slapped cheek syndrome, fever
//      blisters, intravenous drip, family physician, exam table, sutures, canine tooth, brainstem, amygdalae, bun [hairstyle], tragus [face],
//      skin [hand], tendon [hand], Lyme, hot stone, spa [hot tub], jump [leap up], narghile, CNS, GI tract, cardiovascular, wholegrains, choler.
//   3. Bare stubs replaced by their full terms shown short: kit (first aid kit), bubbles (bubble bath), bomb (bath bomb), salts (bath salts),
//      pouf (bath pouf), gel (hair gel), straightener (hair straightener), brush (shaving brush), tie (hair elastic is already there); the body
//      systems adjectives become "X system" entries (shown short); fetal -> fetal position, Fowler's -> Fowler's position, hinge joint.
//   4. Wrong senses: Cranium (the board game's spelling and type) -> cranium; run [cricket] -> run [move fast]; faucet -> tap [touch lightly]
//      in hand actions; meander [wander]; eyeball [look at]; red for redhead in hair colors; fish [animal] for fish [food] in things with eyes /
//      tails (maybe-duplicate); gum [chewing] out of mouth actions.
//   5. Belonging: body systems keeps the organ systems; members of another kind leave (gizzard, tusk, trunk, skin, visage/countenance/mug,
//      neck, parathyroid, skeleton, brain, soap kinds, manicurist, stroll/saunter/strut/swagger in ways to move, common cold and fever blisters
//      in cold weather ailments ...); spinal cord to inside the body.
//   6. Regional roots (contract-root-region): tum, graze, goose egg, gawp, blub, crease up, fall about, dekko, shufti, squiz, blusher become
//      aliases of their same-sense root; US roots with a UK regional alias untagged (bangs, shot, faucet, doctor's note, sharps container,
//      crib bumper), argan oil untagged (known everywhere).
//   7. Case, type and flags: Pap smear, DNA test, UV protection, SPF lip balm, UV lamp, BB cream, CC cream, vitamin C serum, Karlovy Vary;
//      illnesses, medical specialties and operating room no longer sensitive (the deadly diseases keep their own flag); Korean skincare not
//      tm; rifle [search through] not adult or sensitive; alias kinds (white of the eye, eye white, COVID-19, narguile).
//   8. Reviewer's fixes (2026-11-23): scrape [clean] takes cleaning verbs (graze is the UK alias of scrape [injury]); rifle and paw familiarity;
//      Black Death, bubonic plague, Spanish flu, seasonal depression sensitive; circulatory and endocrine system familiarity; middle finger out of
//      gestures, tummy out of organs; four everyday body-movement themes pop 3; medical tests typicality; ways to move loses every kind of walking;
//      easier familiarity for well-known brain, hormone and muscle words.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch439.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
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
const GROUP = 'body_health';
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

// =================================================================================================
sec('1. Twins and the tree');
dropTheme('healthcare_workers', 'a near-twin of medical jobs (People & Society), which holds 7 of its 8 words; locum stays in medical words (theme-twin)');
dropTheme('bone_and_joint_injuries', 'all 9 words are in its parent injuries, and 6 of them are the fracture types of its sibling fracture types (a near-twin)');
dropTheme('cortex_areas', 'four words, all in its parent brain parts; cerebral cortex is the whole cortex, not an area, so fewer than 4 real members');
moveT('hand_parts', 'hands_and_feet', 'in', 'a part of the hands and feet topic: its sibling hands and feet held 15 of its words (hand and foot parts were added beside it in v328)');
moveT('foot_parts', 'hand_parts', 'after', 'as hand parts: hands and feet is the theme of both');
moveT('fingers', 'foot_parts', 'after', 'the five fingers belong with the hands');

// =================================================================================================
sec('2. Two roots of one sense');
mergeInto(14891, 'sniffles', 3357, 'the sniffles', 'synonym', 3, 'the same mild cold (sniffles is in common illnesses and upper airway problems; illnesses had the form with the article)');
{ const cc = ix.entry.get(14956); if (cc && !cc.aliasOf) unlinkE(chk(14956, 'common cold'), 'cold_weather_ailments', 'a virus, not caused by the cold (it was the one ailment of the theme that is not an effect of cold weather; the theme name leaked into it)'); }
mergeInto(3355, 'cold', 14956, 'common cold', 'synonym', 1, 'the same illness: cold [illness] in illnesses and common illnesses, common cold in infections and viral illnesses', { del: 'as an alias its text would hold the theme name\'s word in common illnesses (theme-name)' });
mergeInto(3408, 'mono', 14971, 'mononucleosis', 'synonym', 4, 'the same illness; mono is the short form people use (LIBRARY-RULES 5: the long name is an alias of the short root); its UK alias glandular fever stays on mono');
mergeInto(14876, 'ear infection', 62722, 'otitis media', 'synonym', 5, 'the medical name of a (middle) ear infection; it was in infections at typicality 2 beside a word every parent knows');
mergeInto(15015, 'ACL tear', 15014, 'torn ACL', 'synonym', 3, 'the same injury, grouped as one answer in injuries and soft tissue injuries');
mergeInto(14905, 'slapped cheek', 14906, 'slapped cheek syndrome', 'synonym', 4, 'the same illness, grouped as one answer (with fifth disease) in childhood illnesses');
{ const fb = ix.entry.get(65745); if (fb && !fb.aliasOf) unlinkE(chk(65745, 'fever blisters'), 'cold_weather_ailments', 'cold sores are a virus (herpes simplex), not a cold-weather ailment');
  mergeInto(3432, 'cold sore', 65745, 'fever blisters', 'synonym', 3, 'the same sore (fever blister is the other name); its alias cold sores becomes the plural form of cold sore');
  const cs = ix.entry.get(15089); if (cs && cs.aliasOf === 3432) { setE(cs, 'aliasKind', 'form', 'the plural of cold sore'); setE(cs, 'nameOkIn', [], 'an alias holds no nameOkIn (it was for cold weather ailments, which fever blisters left; nameOk-stale)'); } }
mergeInto(15167, 'IV drip', 15168, 'intravenous drip', 'synonym', 3, 'the same drip, grouped as one answer in forms of medicine and medical equipment', { del: 'as an alias its text would hold "drip" in things that drip, where IV drip is linked (theme-name)' });
mergeInto(3488, 'family doctor', 65746, 'family physician', 'synonym', 2, 'the same doctor (grouped with general practitioner in doctor\'s office, as family doctor is in medical words)');
mergeInto(15309, 'exam table', 15308, 'examination table', 'synonym', 2, 'the same table, grouped as one answer in doctor\'s office; exam table is the short form people use; the UK alias examination couch moves with it');
mergeInto(15359, 'suture', 3477, 'sutures', 'form', 3, 'the plural of suture, a second root (both in operating room, grouped with stitches)');
mergeInto(14484, 'canine', 15416, 'canine tooth', 'synonym', 2, 'the same tooth: canine [tooth] in teeth, canine tooth (shown "canine") in tooth types', { del: 'as an alias its text would hold "tooth" in tooth types (theme-name)' });
mergeInto(14522, 'brain stem', 14560, 'brainstem', 'spelling', 3, 'one word written two ways (both in brain parts, grouped)');
mergeInto(14525, 'amygdala', 14550, 'amygdalae', 'form', 5, 'the plural of amygdala, a second root (both in brain parts, grouped)');
mergeInto(14280, 'bun', 11901, 'bun', 'synonym', 1, 'bun [hair] and bun [hairstyle] are one sense (sense-twin in hairstyles); dance studio words takes bun [hair]');
{ const tf = ix.entry.get(14208); if (tf) { unlinkE(chk(14208, 'tragus'), 'face', 'the tragus is part of the outer ear (in ear parts)'); delE(14208, 'tragus', 'a second root of tragus [ear] 14789 made for face parts; in no theme now'); } }
mergeInto(3189, 'skin', 67266, 'skin', 'synonym', 1, 'skin [hand] is the same skin (a second root made for hand parts in v328)');
mergeInto(3273, 'tendon', 67265, 'tendon', 'synonym', 2, 'tendon [hand] is the same word (a second root made for hand parts in v328)');
{ const ly = ix.entry.get(62726); if (ly) { unlinkE(chk(62726, 'Lyme'), 'tropical_diseases', 'Lyme disease is carried by ticks in temperate forests, not a tropical disease; Lyme 62726 was a second root of Lyme disease 14964'); delE(62726, 'Lyme', 'a short second root of Lyme disease, made for tropical diseases; in no theme now'); } }
mergeInto(67031, 'hot stone massage', 16443, 'hot stone', 'synonym', 2, 'the same treatment (hot stone massage is in massage types, shown "hot stone")', { del: 'a bare stub of hot stone massage made for spa (LIBRARY-RULES 5: never a bare stub)' });
mergeInto(16539, 'hot tub', 28453, 'spa', 'synonym', 3, 'spa [hot tub] is a hot tub (an orphan since v433)', { del: 'as an alias of hot tub its text would be the name of the theme spa, where hot tub is linked (theme-name)' });
mergeInto(11824, 'jump', 67309, 'jump', 'synonym', 1, 'jump [leap up] and jump [move] are one sense (sense-link: jump [move] fits ways to move better)');
mergeInto(46259, 'hookah', 15445, 'narghile', 'synonym', 5, 'another name of the hookah (grouped as one answer with hookah, shisha and water pipe in smoking words)');
{ const ng = ix.entry.get(46261); if (ng && ng.aliasOf === 46259) setE(ng, 'aliasKind', 'synonym', 'narguile is a spelling of narghile, not of hookah (alias-kind-suspect)'); }
mergeInto(3857, 'whole grain', 16531, 'wholegrains', 'spelling', 2, 'the same food written closed (UK); healthy habits takes whole grain (its plural form whole grains is an alias already)', { region: ['UK'] });
mergeInto(15549, 'yellow bile', 15550, 'choler', 'synonym', 5, 'choler is the old name of yellow bile, one of the four humours (an orphan since v433)');

// =================================================================================================
sec('3. Bare stubs and stub adjectives');
{ const k = ix.entry.get(64015); if (k) { swap('first_aid', chk(64015, 'kit'), chk(15344, 'first aid kit'), 'the full term of the stub kit [medical supplies]', { show: 'kit', outWhy: 'a bare stub: first aid kit takes the link' }); delE(64015, 'kit', 'a bare stub of first aid kit made for first aid (LIBRARY-RULES 5); in no theme'); } }
for (const [sid, stext, fid, ftext, show, tid] of [[64062, 'bubbles', 3758, 'bubble bath', 'bubbles', 'bath_time'], [64053, 'bomb', 3813, 'bath bomb', 'bomb', 'bath_time'],
  [64060, 'salts', 15510, 'bath salts', 'salts', 'bath_time'], [64058, 'pouf', 60810, 'bath pouf', 'pouf', 'bath_time'], [63873, 'gel', 3769, 'hair gel', 'gel', 'hair_care'],
  [57468, 'straightener', 3793, 'hair straightener', 'straightener', 'hair_care'], [64064, 'brush', 16320, 'shaving brush', 'brush', 'shaving']]) {
  const s = ix.entry.get(sid); if (!s) continue;
  swap(tid, chk(sid, stext), chk(fid, ftext), `the full term of the stub ${stext}`, { show, outWhy: `a bare stub: ${ftext} takes the link` });
  delE(sid, stext, `a bare stub of ${ftext} made for ${tid} (LIBRARY-RULES 5: never a bare stub); in no theme`);
}
{ const t = ix.entry.get(64040); if (t) { unlinkE(chk(64040, 'tie'), 'hair_care', 'a bare stub of hair tie; hair elastic (the same thing, shown "elastic") is already in the theme and was grouped with it'); delE(64040, 'tie', 'a bare stub made for hair care; in no theme'); } }
// body systems: the organ systems as full terms shown short; processes, parts and other words out
{ const BS = 'body_systems';
  out(BS, [[14585, 'digestion'], [14584, 'respiration'], [14458, 'circulation'], [14586, 'immune response'], [3848, 'metabolism'], [14581, 'CNS'], [14576, 'central nervous system'],
    [14580, 'GI tract'], [3329, 'sensory'], [14589, 'special senses'], [14588, 'enteric nervous system'], [14583, 'blood system'], [14545, 'limbic system'], [62711, 'renal'], [62716, 'vascular'], [62702, 'cardiovascular']],
    'not one of the body\'s organ systems (a process, a part of a system, an adjective or a second name): the theme keeps the systems');
  linkE(chk(14585, 'digestion'), 'digestive_system', 2, 'from body systems: the process the digestive system theme is about');
  delE(62711, 'renal', 'an adjective stub made for body systems; in no theme');
  delE(62716, 'vascular', 'an adjective stub made for body systems; in no theme');
  delE(62702, 'cardiovascular', 'an adjective stub made for body systems (grouped with circulatory as one answer); in no theme');
  delE(14583, 'blood system', 'not a name of a body system (the circulatory system), made for body systems; in no theme');
  mergeInto(14576, 'central nervous system', 14581, 'CNS', 'abbreviation', 3, 'the short form of central nervous system (grouped as one answer in body systems)');
  mergeInto(65743, 'alimentary canal', 14580, 'GI tract', 'synonym', 3, 'the same tract (alimentary canal, with its alias digestive tract, is in digestive system)');
  for (const [id, adj, fam] of [[62703, 'circulatory', 2], [62704, 'endocrine', 3], [62705, 'excretory', 4], [62706, 'immune', 2], [62707, 'integumentary', 5], [62709, 'lymphatic', 3],
    [62710, 'muscular', 3], [62712, 'reproductive', 2], [62713, 'respiratory', 2], [62714, 'skeletal', 2], [62715, 'urinary', 3]]) {
    const e = retext(id, adj, adj + ' system', 'the full term of the stub adjective, made for body systems (LIBRARY-RULES 5: a member that is only a modifier is the full term shown short)', { pos: 'noun', fam });
    setShow(e, BS, adj, 'the full term shown short, as digestive system and nervous system are');
  } }
{ const f = retext(62765, 'fetal', 'fetal position', 'the full term of the stub adjective (its UK spelling alias is already foetal position)', { pos: 'noun' });
  setShow(f, 'body_positions', 'fetal', 'the full term shown short ("position" is in the theme name)');
  const fa = ix.entry.get(17074); if (fa && fa.aliasOf === 62765) setE(fa, 'pos', 'noun', 'a spelling of fetal position'); }
{ const f = retext(62766, "Fowler's", "Fowler's position", 'the full term of the stub (gloss medical position)', { gloss: '' });
  setShow(f, 'body_positions', "Fowler's", 'the full term shown short'); }
{ const h = chk(23713, 'hinge');
  if (h.typ.joints !== undefined) { const hj = newEntry('hinge joint', '', { pos: 'noun', type: 'common', fam: 3 }, 'the joint type (elbow, knee); hinge 23713 is the door hinge'); swap('joints', h, hj, 'the joint type', { show: 'hinge' }); } }

// =================================================================================================
sec('4. Wrong senses');
retext(50189, 'Cranium', 'cranium', 'cranium [skull] is the skull (Oxford, Merriam-Webster lowercase); it had the capital, type and trademark of Cranium the board game 5778', { type: 'common', tm: false });
{ const rc = chk(42858, 'run'), rm = chk(67308, 'run');
  for (const tid of ['body_actions', 'motion_verbs', 'sports_verbs']) swap(tid, rc, rm, 'the movement (run [cricket] is the run scored; sense-link)'); }
{ const fa = chk(16278, 'faucet');
  if (fa.typ.hand_actions !== undefined) { const tp = newEntry('tap', 'touch lightly', { pos: 'verb', type: 'common', fam: 1 }, 'to touch lightly with the fingers; the link was on faucet, through its UK alias tap'); swap('hand_actions', fa, tp, 'the hand action'); } }
{ const m = chk(31931, 'meander');
  if (m.typ.ways_of_walking !== undefined || m.typ.motion_verbs !== undefined) {
    const mw = newEntry('meander', 'wander', { pos: 'verb', type: 'common', fam: 3 }, 'to wander slowly without a set course (the old entry is the bend of a river)');
    for (const tid of ['ways_of_walking', 'motion_verbs']) swap(tid, m, mw, 'the verb of walking');
  }
  setE(m, 'pos', 'noun', 'the bend of a river (travel verbs, still on this entry, is listed for the Travel & Transport batch)'); }
{ const eb = chk(3351, 'eyeball');
  if (eb.typ.ways_of_looking !== undefined) { const v = newEntry('eyeball', 'look at', { pos: 'verb', type: 'common', fam: 3 }, 'to look at closely or stare (the old entry is the eyeball itself)'); swap('ways_of_looking', eb, v, 'the verb'); }
  if (!eb.gloss) setE(eb, 'gloss', 'eye', 'its text is now shared with eyeball [look at]'); }
swap('hair_colors', chk(14300, 'redhead'), chk(1, 'red'), 'the hair color (redhead is the person; it stays in hair)');
{ const ff = chk(16671, 'fish'), fa = chk(59990, 'fish');
  swap('things_with_eyes', ff, fa, 'the animal has eyes (sense-link)');
  if (fa.typ.things_with_tails !== undefined) unlinkE(ff, 'things_with_tails', 'fish [animal] is in the theme already (maybe-duplicate)'); }
out('mouth_actions', [[39064, 'gum']], 'gum [chewing] is chewing gum, not something the mouth does (sense-twin)');

// =================================================================================================
sec('5. Belonging');
out('face', [[14205, 'visage'], [14206, 'countenance'], [14207, 'mug']], 'a word for the face itself, not a part of it');
out('torso', [[14249, 'trunk']], 'another word for the torso itself, not a part of it');
out('skin_words', [[3189, 'skin']], 'the topic word itself');
out('joints', [[3169, 'neck']], 'not a joint (its joints are the vertebrae)');
out('paired_body_parts', [[14375, 'parathyroid']], 'there are four parathyroid glands, not two');
out('inside_the_body', [[3296, 'gizzard']], 'a bird\'s stomach, not a human organ (stays in digestive system beside crop and the ruminant stomachs)');
out('organs', [[3296, 'gizzard']], 'a bird\'s stomach, not a human organ');
out('bones', [[3248, 'skeleton']], 'all the bones together, not a bone (LIBRARY-RULES 5: never the whole category)');
out('brain_parts', [[3242, 'brain']], 'the whole organ, not a part of it');
{ const sc = chk(14559, 'spinal cord'); if (sc.typ.brain_parts !== undefined) { linkE(sc, 'inside_the_body', 2, 'a key part of the body, linked only in brain parts'); unlinkE(sc, 'brain_parts', 'not a part of the brain (it runs down the spine)'); } }
out('teeth', [[10328, 'tusk']], 'an animal\'s tooth (elephants, walruses), not one of ours');
out('throat_and_airway_parts', [[3268, 'diaphragm']], 'a breathing muscle below the lungs, not a part of the throat or airway');
out('toiletries_for_washing', [[16151, 'bar soap'], [16152, 'hand soap'], [16158, 'liquid soap'], [16154, 'antibacterial soap'], [16161, 'Castile soap'], [16294, 'black soap']],
  'a kind of soap beside soap, grouped with it as one answer (a clash group of 7); the kinds are the sub-theme soap types (LIBRARY-RULES 5, overlap)');
out('nail_care', [[33016, 'manicurist']], 'a person, not nail care; grouped with manicure only to pass the family check (stays in beauty and service jobs)');
out('sun_care', [[4953, 'shades']], 'another word for sunglasses, which is in the theme (they were grouped as one answer with shade [sun], a different thing: a clash group of 10)');
leaveGroup('sun_care', 16365, 'shade [sun] is shade from the sun, not sunglasses');
out('ways_to_move', [[16909, 'stroll'], [10393, 'saunter'], [50133, 'strut'], [16917, 'swagger']], 'a kind of walking beside walk, grouped with it as one answer (a clash group of 12); they are in ways of walking');
out('cold_weather_ailments', [[15096, 'numb fingers']], 'a loose description, not the name of an ailment (frostnip and frostbite are the terms)');
delE(15096, 'numb fingers', 'made for cold weather ailments only; in no theme now');

// =================================================================================================
sec('6. Regional roots (contract-root-region)');
mergeInto(3196, 'tummy', 3197, 'tum', 'abbreviation', 2, 'the short UK, Irish and Australasian form of tummy, grouped with it as one answer in every theme it was in', { region: ['UK', 'AU', 'NZ', 'IE'] });
{ const sc = chk(14989, 'scrape');
  if (sc.typ.cleaning_verbs !== undefined) { const v = newEntry('scrape', 'clean', { pos: 'verb', type: 'common', fam: 1 }, 'to clean by scraping (the old entry is the injury; as graze becomes its UK alias, a UK player would have seen "graze" as a cleaning verb) (reviewer)'); swap('cleaning_verbs', sc, v, 'the cleaning verb'); }
  setE(sc, 'gloss', 'injury', 'its text is now shared with scrape [clean]'); }
mergeInto(14989, 'scrape', 14990, 'graze', 'regional', 2, 'the UK word for a scrape (grouped as one answer in injuries and skin-breaking injuries): its UK regional alias', { region: ['UK'] });
mergeInto(15020, 'bump', 15021, 'goose egg', 'synonym', 3, 'the US slang for a bump on the head (grouped as one answer in injuries); not the US everyday word, so a synonym keeping its tag', { region: ['US'] });
mergeInto(14662, 'gawk', 60878, 'gawp', 'regional', 4, 'the UK form of gawk (to stare stupidly): its UK regional alias', { region: ['UK'] });
mergeInto(50164, 'blubber', 17015, 'blub', 'abbreviation', 4, 'the UK short form of blubber (grouped as one answer in ways of crying)', { region: ['UK'] });
mergeInto(17138, 'crack up', 17145, 'crease up', 'synonym', 3, 'UK for crack up (laugh uncontrollably); crack up is said in the UK too, so a synonym keeping its tag', { region: ['UK'] });
mergeInto(17138, 'crack up', 17146, 'fall about', 'synonym', 3, 'UK for crack up (fall about laughing); a synonym keeping its tag', { region: ['UK'] });
mergeInto(50242, 'gander', 14686, 'dekko', 'synonym', 5, 'UK slang for a look ("have a dekko"), as "take a gander"; a synonym keeping its tag', { region: ['UK'] });
mergeInto(50242, 'gander', 14685, 'shufti', 'synonym', 5, 'UK slang for a look ("have a shufti"), as "take a gander"; a synonym keeping its tag', { region: ['UK'] });
mergeInto(50242, 'gander', 60879, 'squiz', 'synonym', 5, 'Australian slang for a look ("have a squiz"), as "take a gander"; a synonym keeping its tag', { region: ['AU'] });
mergeInto(3786, 'blush', 3785, 'blusher', 'regional', 3, 'the UK word for blush [makeup] (grouped as one answer in personal care and makeup): its UK regional alias', { region: ['UK'] });
for (const [id, text, why] of [[14274, 'bangs', 'its UK word fringe is its regional alias'], [3455, 'shot', 'its UK word jab is its regional alias'], [16278, 'faucet', 'its UK word tap is its regional alias'],
  [67188, "doctor's note", 'its UK word sick note is its regional alias'], [67186, 'sharps container', 'its UK word sharps bin is its regional alias'], [67146, 'crib bumper', 'its UK word cot bumper is its regional alias']])
  setE(chk(id, text), 'region', [], `the US root of a regional pair: untagged, as color is (v413; v436 mold); ${why}`);
setE(chk(15626, 'argan oil'), 'region', [], 'known everywhere (familiarity 2), not a Moroccan word (LIBRARY-RULES 4: region is who knows it)');

// =================================================================================================
sec('7. Case, type, flags and alias kinds');
retext(15251, 'pap smear', 'Pap smear', 'named after George Papanicolaou (Merriam-Webster and Oxford: Pap smear)', { type: 'proper' });
setE(chk(15269, 'DNA test'), 'type', 'proper', 'a phrase with an initialism in capitals, typed as UV index (case)');
retext(16354, 'uv protection', 'UV protection', 'UV is an initialism, written in capitals (as UV index)', { type: 'proper' });
retext(16352, 'lip balm with spf', 'SPF lip balm', 'SPF is an initialism; the usual name of the product', { type: 'proper' });
retext(16256, 'uv lamp', 'UV lamp', 'UV is an initialism, written in capitals', { type: 'proper' });
retext(16230, 'bb cream', 'BB cream', 'BB (blemish balm) is written in capitals (Oxford: BB cream)', { type: 'proper' });
retext(16231, 'cc cream', 'CC cream', 'CC (color correcting) is written in capitals, as BB cream', { type: 'proper' });
retext(16188, 'vitamin c serum', 'vitamin C serum', 'vitamin C is written with a capital C (as vitamin C 15528)');
setE(chk(12775, 'Karlovy Vary'), 'type', 'place', 'a town is a place, as the other spa towns');
setT('illnesses', 'sensitive', false, 'illness is not religion, politics or death; the deadly ones carry their own flag (cancer, dementia, stroke, Ebola, plague, sepsis, HIV, anthrax). The flag passed down to all 13 illness and injury themes, so common illnesses, allergies and injuries were held back to level 31');
setT('medical_specialties', 'sensitive', false, 'medical fields are not religion, politics or death (palliative care keeps its own flag)');
setT('operating_room', 'sensitive', false, 'operating room equipment is not religion, politics or death');
setT('korean_skincare', 'tm', false, 'no member is a brand (tm marks brands, titles and characters)');
{ const r = chk(50089, 'rifle'); setE(r, 'adult', false, 'rifle [search through] is the verb, not the gun'); setE(r, 'sensitive', false, 'rifle [search through] is the verb, not the gun'); }
for (const [id, text] of [[14848, 'white of the eye'], [14863, 'eye white']]) { const a = chk(id, text); setE(a, 'aliasKind', 'synonym', 'another name of the sclera, not a grammatical form of white (alias-fullname)'); }
{ const t = chk(64433, 'tap'); if (t.type === 'phrase') setE(t, 'type', 'common', 'tap [rhythm] (tap dance, in dances) is a word, not an idiom (type phrase is for idioms); as phrase it came before the verb tap [touch lightly] in text lookup (contract-dup-root)'); }
{ const c = chk(2431, 'contour'); if (c.type === 'phrase') setE(c, 'type', 'common', 'contour [map line] is a word, not an idiom; as phrase it came before contour [makeup] in text lookup (contract-dup-root; in Places & Geography themes, a type only)'); }
setE(chk(3381, 'COVID-19'), 'aliasKind', 'synonym', 'the full name of the disease Covid, not a spelling of it (alias-kind-suspect)');
for (const tid of groupThemes()) for (const e of (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.show?.[tid] === e.text)) setShow(e, tid, null, 'the shown text equals the text');

// =================================================================================================
sec("8. Reviewer's fixes (2026-11-23)");
setE(chk(50089, 'rifle'), 'fam', 3, 'now exported (no longer adult): the verb "rifle through" is known to many adults, not every child');
setE(chk(50065, 'paw'), 'fam', 2, 'the verb (paw at) is less known than the noun');
for (const [id, text] of [[15054, 'Black Death'], [15055, 'bubonic plague'], [15056, 'Spanish flu']]) setE(chk(id, text), 'sensitive', true, 'a deadly epidemic, flagged like plague 3379 (sensitive: death)');
setE(chk(15095, 'seasonal depression'), 'sensitive', true, 'a mental illness, as the words of mental health words (a sensitive theme)');
out('gestures', [[14380, 'middle finger']], 'the finger entry; the gesture is the rude one (stays in hand parts and fingers)');
out('organs', [[3196, 'tummy']], "a child's word for the belly, not an organ (stomach is there)");
for (const [tid, pop] of [['mouth_actions', 3], ['hand_actions', 3], ['ways_of_looking', 3], ['body_positions', 3]]) setT(tid, 'pop', pop, 'an ordinary everyday theme, rated like ways of walking and body actions (it was rated narrow or less popular)');
for (const [id, text, typ] of [[62729, 'urinalysis', 3], [62727, 'lipid panel', 3], [62728, 'audiometry', 4]]) rate(chk(id, text), 'medical_tests', typ, 'a specialist test, not one of the first anyone names (blood test, X-ray)');
out('ways_to_move', [[16911, 'march'], [16872, 'shuffle'], [16912, 'limp'], [16913, 'stagger'], [16919, 'stumble'], [16867, 'tiptoe'], [10358, 'waddle'], [16915, 'wander']],
  'a way of walking: the theme is the basic ways to move the body (walk, run, hop, crawl, swim, climb, roll); the kinds of walking are in ways of walking, as stroll, saunter, strut and swagger (reviewer: be consistent)');
for (const [id, text, fam, why] of [[14522, 'brain stem', 2, 'nearly every adult knows it'], [14534, 'gray matter', 2, 'an everyday phrase ("use your gray matter")'], [14524, 'hippocampus', 3, 'many adults know it (memory)'],
  [3295, 'hypothalamus', 3, 'many adults know it'], [3294, 'pituitary gland', 3, 'many adults know it'], [14537, 'neuron', 2, 'nearly every adult knows it'], [14527, 'frontal lobe', 2, 'nearly every adult knows it'],
  [3700, 'melatonin', 2, 'a common sleep supplement'], [14232, 'quadriceps', 2, 'nearly every adult knows it (quads)'],
  [3268, 'diaphragm', 2, 'nearly every adult knows the breathing muscle']])
  setE(chk(id, text), 'fam', fam, `familiarity: ${why}; brain parts, hormones and muscles were heavy with hard words (reviewer)`);
{ const g = P.entries.find(x => x.aliasOf === 14534 && x.text === 'grey matter'); if (g) setE(g, 'fam', E(14534).fam, "a UK spelling has its root's familiarity (spelling-fam)"); }

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
const summary = [`Library batch v439: tidy-up step 3, Body & Health (${THEMES0.length} themes read). ${counts.deletedThemes} themes deleted, ${counts.moved} moved, ${counts.merged} second roots merged, ${added.length} entries added, ${deleted.length} deleted.`,
  ...A.map(x => x.startsWith('#') ? x.slice(1) : x.startsWith('  ') ? x : '  ' + x),
  'Difficulty spread and gap of the themes touched (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themeless.length}: ${themeless.join(', ') || 'none'}`,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
const TAIL = fs.existsSync(new URL('./batch439-review-tail.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch439-review-tail.txt', import.meta.url), 'utf8') : '';
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (TAIL ? '\n' + TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch439-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

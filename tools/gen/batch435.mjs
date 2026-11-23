// Library batch v435: the tidy-up, step 3 (TIDY-UP.md), group Animals. Drafted for Simon's review (DRY RUN until he approves).
// Works by entry ids and theme ids only (it is applied after v434, Food & Drink, which touches none of these themes).
//   1. Wrong senses: a link moves to the entry of the sense the theme means (lamb, nymph, antenna, Maltese, hock, boar, man-of-war, Ross seal);
//      new senses where none existed (egg [animal egg], proboscis [mouthpart], puggle [baby echidna], lumber [move heavily], possum [Australian]).
//   2. Bare stubs (LIBRARY-RULES 5, Kinds themes: never a bare modifier stub): a stub whose full term exists goes into it (the theme shows the
//      short word); a stub with no full term is renamed to the full term and shows the short word (Geoffroy's -> Geoffroy's cat, shown "Geoffroy's").
//   3. Two roots of one thing (spellings, short names, other names): the weaker goes into the stronger, as an alias in place (id kept) or deleted
//      when it repeats the survivor's text; links move at the better typicality, groups and kin follow, the theme shows the old text where needed.
//   4. Belonging: words that are not members of the theme leave it (young, male and female words, homes and body parts in kinds themes, the bare
//      category word, fictional characters, food senses, modern animals in prehistoric themes, animals not native to a region theme ...).
//   5. Regional roots (contract-root-region) with a same-sense equivalent become aliases; US roots with UK spellings (dapple gray, gray kangaroo,
//      animal behaviorist, Asian lady beetle); case (Great Dane, Rhodesian ridgeback, Pel's fishing owl, miniature bull terrier).
//   6. Tree: new world songbirds merges into American songbirds; bird-only parts, long-necked and horned dinosaurs, cold-blooded animals and pet
//      snacks move to their real parents; Galapagos animals is written Galápagos animals.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch435.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, deleteEntry, addEntry, setKin, moveKin, deleteTheme, placeTheme, descendants, themeDifficulty, themeProfile, difficultyBand } from '../../js/model.js';
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
// The Animals group: its themes (sub-themes included), for the spreads before and after.
const groupThemes = () => [...new Set(['animals', ...descendants(P, 'animals').map(t => t.id)])].filter(id => !T(id).group);
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return null;
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.offensive);
  const b = ws.map(e => difficultyBand(P, e, tid)), td = themeDifficulty(t), lo = themeProfile(P, tid).lo;
  return `${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, difficulty ${td}, 4th-easiest band ${lo}, gap ${Math.round((lo - td) * 10) / 10}`;
};
const prof0 = new Map(groupThemes().map(t => [t, profile(t)]));
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], deleted = [], added = [], alone = new Set(), counts = { out: 0, link: 0, swap: 0, absorb: 0, alias: 0, rename: 0, show: 0, field: 0, newE: 0, del: 0, themeDel: 0, themeMove: 0, themeRename: 0, group: 0 };
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const chk2 = (id, a, b) => { const e = E(id); if (e.text !== a && e.text !== b) throw Error(`${id} is "${e.text}"`); return e; };
const sec = s => A.push(s);
const where = e => { const r = linkIds(P, e).filter(t => ix.theme.has(t)); return r.length ? `stays in ${r.join(', ')}` : 'now in no theme'; };
const leakCheck = (e, tid) => { const t = T(tid); const shown = e.show?.[tid] ? { ...e, text: e.show[tid] } : e; return nameLeak(t, shown); };

// ---------- helpers ----------
const unlinkE = (e, tid, why) => {
  T(tid); if (e.typ[tid] === undefined) return false;
  unlinkEntry(P, e, tid); n++; counts.out++; reindex(P);
  if (!linkIds(P, e).length) alone.add(e.id);
  A.push(`  out of ${tid}: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why} (${where(e)})`);
  return true;
};
const out = (tid, list, why) => { for (const [id, text] of list) { const e = ix.entry.get(id); if (e) unlinkE(chk(id, text), tid, why); } };
const linkE = (e, tid, typ, why, o = {}) => {
  T(tid); if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return false;
  e.typ[tid] = typ; n++; counts.link++;
  if (o.show) e.show = { ...(e.show || {}), [tid]: o.show };
  if (o.nameOk) e.nameOkIn = [...new Set([...(e.nameOkIn || []), tid])];
  reindex(P);
  const leak = leakCheck({ ...e, nameOkIn: e.nameOkIn }, tid);
  if (leak && !(e.nameOkIn || []).includes(tid)) throw Error(`${lab(e)} in ${tid}: "${leak}" leaks the theme name; give a show or nameOk`);
  for (const a of P.entries.filter(a => a.aliasOf === e.id)) aliasNameOk(a);
  A.push(`  linked: ${lab(e)} in ${tid} (typicality ${typ}${o.show ? `, shown "${o.show}"` : ''}${o.nameOk ? ', nameOkIn: the full name contains a word of the theme name' : ''}): ${why}`);
  return true;
};
const setE = (e, field, value, why) => {
  if (JSON.stringify(e[field]) === JSON.stringify(value)) return false;
  A.push(`  ${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++; counts.field++; reindex(P); return true;
};
const setShow = (e, tid, s, why) => {
  if ((e.show?.[tid] || null) === s) return false;
  if (e.typ[tid] === undefined) throw Error(`${lab(e)} not in ${tid}`);
  A.push(`  ${lab(e)} in ${tid}: shown ${JSON.stringify(e.show?.[tid] || null)} -> ${JSON.stringify(s)}: ${why}`);
  e.show = { ...(e.show || {}) }; if (s) e.show[tid] = s; else delete e.show[tid]; n++; counts.show++; return true;
};
const rate = (e, tid, typ, why) => { if (e.typ[tid] === undefined) throw Error(`${lab(e)} not in ${tid}`); if (e.typ[tid] === typ) return; A.push(`  typicality: ${lab(e)} in ${tid} ${e.typ[tid]} -> ${typ}: ${why}`); e.typ[tid] = typ; n++; counts.field++; };
const fixGroups = () => { for (const t of P.themes) if (t.groups) { const g2 = t.groups.map(g => [...new Set(g)]).filter(g => g.length > 1); if (JSON.stringify(g2) !== JSON.stringify(t.groups)) t.groups = g2; } };
const groupDrop = (tid, id, why) => {
  const t = T(tid); const g = (t.groups || []).find(g => g.includes(id)); if (!g) return false;
  t.groups = t.groups.map(x => x === g ? x.filter(y => y !== id) : x).filter(x => x.length > 1); n++; counts.group++;
  A.push(`  group in ${tid}: ${lab(E(id))} leaves ${g.map(y => ix.entry.get(y)?.text).join(' = ')}: ${why}`); return true;
};
const groupAdd = (tid, ids, why) => {
  const t = T(tid); t.groups ||= [];
  for (const id of ids) if (E(id).typ[tid] === undefined) throw Error(`${id} is not in ${tid}`);
  const hit = t.groups.filter(g => g.some(id => ids.includes(id)));
  if (hit.length === 1 && ids.every(id => hit[0].includes(id))) return false;
  const g = [...new Set([...hit.flat(), ...ids])];
  t.groups = [...t.groups.filter(x => !hit.includes(x)), g]; n++; counts.group++;
  A.push(`  group in ${tid}: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`); return true;
};
// A link moves from a wrong-sense entry to the right one (same typicality unless given; show, nameOk and group places follow).
const swap = (tid, fromE, toE, why, typ) => {
  if (fromE.typ[tid] === undefined) return false;
  const t = typ ?? fromE.typ[tid], gs = (T(tid).groups || []).filter(g => g.includes(fromE.id)), show = fromE.show?.[tid];
  if (toE.typ[tid] === undefined) { toE.typ[tid] = t; if (show) toE.show = { ...(toE.show || {}), [tid]: show }; if ((fromE.nameOkIn || []).includes(tid)) toE.nameOkIn = [...new Set([...(toE.nameOkIn || []), tid])]; }
  else if (t < toE.typ[tid]) toE.typ[tid] = t;
  for (const g of gs) if (!g.includes(toE.id)) g.push(toE.id);
  n++; counts.swap++; reindex(P);
  A.push(`  ${tid}: the link moves from ${lab(fromE)} [${fromE.gloss}] to ${lab(toE)} [${toE.gloss}] (typicality ${t}${gs.length ? ', its group place too' : ''}): ${why}`);
  unlinkEntry(P, fromE, tid); reindex(P); if (!linkIds(P, fromE).length) alone.add(fromE.id);
  return true;
};
// A new entry (rerun: found by text + gloss).
const newE = (text, gloss, fields, why) => {
  let e = (ix.byText.get(text.toLowerCase()) || []).find(x => !x.aliasOf && x.text === text && x.gloss === gloss);
  if (e) return e;
  e = addEntry(P, text, { gloss, status: 'rev', ...fields }); reindex(P); n++; counts.newE++; added.push(e.id);
  A.push(`  new entry: ${lab(e)}${gloss ? ' [' + gloss + ']' : ''} ${e.pos}, ${e.type}, familiarity ${e.fam}: ${why}`);
  return e;
};
// An alias appears in its root's themes: where its text holds a word of the theme name it carries nameOkIn for that theme (as terraced house, crawfish).
const aliasNameOk = a => { const r = E(a.aliasOf), add = Object.keys(r.typ).filter(tid => !(a.nameOkIn || []).includes(tid) && !T(tid).nameOk && nameLeak(T(tid), { ...a, nameOkIn: [] })); if (add.length) { a.nameOkIn = [...(a.nameOkIn || []), ...add]; A.push(`    ${lab(a)}: nameOkIn ${add.join(', ')} (its text holds a word of the theme name; the root is linked)`); } };
// A new alias of a root (rerun: found by root + text).
const newAlias = (root, text, kind, region, fam, why, type) => {
  if (P.entries.some(a => a.aliasOf === root.id && a.text === text)) return null;
  const a = addEntry(P, text, { aliasOf: root.id, aliasKind: kind, region, fam, pos: root.pos, type: type || root.type, status: 'rev', adult: root.adult, sensitive: root.sensitive, offensive: root.offensive, tm: root.tm });
  reindex(P); n++; counts.alias++; added.push(a.id);
  A.push(`  new alias: ${lab(a)} (${kind}${region.length ? ' ' + region.join('/') : ''}, familiarity ${fam}) of ${lab(root)}: ${why}`);
  aliasNameOk(a); return a;
};
const renameE = (e, text, why, o = {}) => {
  if (e.text === text) return false;
  A.push(`  text: ${lab(e)} -> "${text}"${o.type ? `, type ${e.type} -> ${o.type}` : ''}: ${why}`);
  e.text = text; if (o.type) e.type = o.type; if (o.gloss !== undefined) e.gloss = o.gloss;
  if (o.clearKin && (e.kin || []).length) { A.push(`    its kin goes (it was set for the bare word): ${e.kin.map(id => lab(E(id))).join(', ')}`); for (const id of [...e.kin]) setKin(P, e, E(id), false); }
  n++; counts.rename++; reindex(P); return true;
};
// The weaker root goes into the stronger: its links move (the better typicality where both are linked; o.show[tid] or its own show is shown),
// group places and kin follow (o.noKin drops kin set for a bare stub), its aliases move; then it is deleted (kind 'delete') or becomes an alias in place.
const absorb = (goneId, goneText, keepId, keepText, kind, fam, why, o = {}) => {
  const keep = chk(keepId, keepText), gone = ix.entry.get(goneId);
  if (!gone || gone.aliasOf === keepId) return false;
  chk(goneId, goneText); if (gone.aliasOf || keep.aliasOf) throw Error(`${goneText}/${keepText}: an alias`);
  const moved = [], rated = [];
  for (const [tid, typ] of Object.entries(gone.typ)) {
    if (keep.typ[tid] === undefined) {
      keep.typ[tid] = typ; moved.push(`${tid} ${typ}`);
      const s = o.show?.[tid] ?? gone.show?.[tid]; if (s) keep.show = { ...(keep.show || {}), [tid]: s };
      if ((gone.nameOkIn || []).includes(tid) || (o.nameOk || []).includes(tid)) keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), tid])];
    } else { if (typ < keep.typ[tid]) { rated.push(`${tid} ${keep.typ[tid]} -> ${typ}`); keep.typ[tid] = typ; } if (o.show?.[tid]) keep.show = { ...(keep.show || {}), [tid]: o.show[tid] }; }
  }
  for (const t of P.themes) if ((t.groups || []).some(g => g.includes(goneId))) {
    const gs = t.groups.map(g => g.includes(goneId) ? [...new Set(g.map(id => id === goneId ? keepId : id))] : g), hit = gs.filter(g => g.includes(keepId));
    t.groups = [...gs.filter(g => !hit.includes(g)), ...(hit.length ? [[...new Set(hit.flat())]] : [])].filter(g => g.length > 1);
  }
  for (const a of P.entries.filter(a => a.aliasOf === goneId)) {
    if (a.text === keep.text || P.entries.some(b => b.aliasOf === keepId && b.text === a.text)) { for (const x of P.entries) if (x.use) for (const [t, id] of Object.entries(x.use)) if (id === a.id) delete x.use[t]; P.entries = P.entries.filter(x => x !== a); deleted.push(lab(a)); A.push(`    deleted alias ${lab(a)}: ${lab(keep)} has it already`); continue; }
    a.aliasOf = keepId; A.push(`    alias ${lab(a)} (${a.aliasKind}) moves to ${lab(keep)}`);
    for (const [t, id] of Object.entries(gone.use || {})) if (id === a.id && keep.typ[t] !== undefined && !keep.use?.[t]) keep.use = { ...(keep.use || {}), [t]: id };
  }
  reindex(P);
  if ((gone.kin || []).length) { if (o.noKin) { A.push(`    kin of ${lab(gone)} dropped (set for the bare word, not the thing): ${gone.kin.map(id => lab(E(id))).join(', ')}`); for (const id of [...gone.kin]) setKin(P, gone, E(id), false); } else { A.push(`    kin of ${lab(gone)} moves to ${lab(keep)}: ${gone.kin.map(id => lab(E(id))).join(', ')}`); moveKin(P, gone, keep); } }
  gone.typ = {}; gone.show = {}; gone.use = {}; gone.nameOkIn = []; reindex(P);
  const tail = `${moved.length ? '; links move: ' + moved.join(', ') : ''}${rated.length ? '; better typicality kept: ' + rated.join(', ') : ''}${o.show ? '; shown: ' + Object.entries(o.show).map(([t, s]) => `"${s}" in ${t}`).join(', ') : ''}`;
  if (kind === 'delete') { deleteEntry(P, gone); reindex(P); deleted.push(lab(gone)); counts.absorb++; A.push(`  ${lab(gone)}${gone.gloss ? ' [' + gone.gloss + ']' : ''} goes into ${lab(keep)} and is deleted${tail}: ${why}`); }
  else {
    gone.aliasOf = keepId; gone.aliasKind = kind; gone.fam = fam; if (o.region) gone.region = o.region;
    if (kind === 'spelling' || kind === 'form') for (const f of ['adult', 'sensitive', 'offensive', 'tm']) gone[f] = !!keep[f];
    if (kind === 'spelling' || kind === 'form' || kind === 'abbreviation') gone.type = keep.type;
    if (o.gloss !== undefined) gone.gloss = o.gloss;
    reindex(P); counts.absorb++;
    A.push(`  ${lab(gone)} becomes a ${kind} alias of ${lab(keep)} (familiarity ${fam}${gone.region.length ? ', region ' + gone.region.join('/') : ''})${tail}: ${why}`);
  }
  for (const a of P.entries.filter(a => a.aliasOf === keepId)) aliasNameOk(a);
  for (const m of moved) { const tid = m.split(' ')[0]; if (leakCheck(keep, tid) && !(keep.nameOkIn || []).includes(tid)) throw Error(`${lab(keep)} in ${tid} leaks "${leakCheck(keep, tid)}": give a show`); }
  n++; return true;
};
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return false;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  deleteEntry(P, e); reindex(P); n++; counts.del++; deleted.push(lab(e)); alone.delete(id);
  A.push(`  deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}`);
  return true;
};
const setT = (tid, field, value, why) => { const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return false; A.push(`  theme ${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++; if (field === 'name') counts.themeRename++; return true; };
const moveT = (tid, target, where, why) => {
  const t = T(tid), want = where === 'in' ? target : T(target).parent;
  if (t.parent === want) return false;
  const from = t.parent; if (!placeTheme(P, tid, target, where)) throw Error('place ' + tid); reindex(P); n++; counts.themeMove++;
  A.push(`  theme ${tid} "${t.name}" moves from ${from} to ${want}${where !== 'in' ? ` (${where} ${target})` : ''}: ${why}`); return true;
};
// Merge theme `from` into `into` (as batch430): the words `into` lacks move at their typicality (except STAY), shared words keep the better typicality.
const mergeTheme = (from, into, MOVE, STAY, why) => {
  if (!ix.theme.has(from)) return;
  const f = T(from), it = T(into);
  const ws = (ix.byTheme.get(from) || []).filter(e => !e.aliasOf && e.typ[from] !== undefined);
  const lack = ws.filter(e => e.typ[into] === undefined), shared = ws.filter(e => e.typ[into] !== undefined);
  const unknown = lack.filter(e => !MOVE.some(([id]) => id === e.id) && !STAY.has(e.id));
  if (unknown.length) throw Error(`${from}: words this batch does not decide: ${unknown.map(lab).join(', ')}`);
  A.push(`  ${from} "${f.name}": ${ws.length} words, ${shared.length} already in ${into}, ${MOVE.length} move, ${STAY.size} stay out: ${why}`);
  for (const [id, text] of MOVE) { const e = chk(id, text); linkE(e, into, e.typ[from], `from ${f.name}, at the same typicality`); }
  for (const e of shared) if (e.typ[from] < e.typ[into]) rate(e, into, e.typ[from], `its typicality in ${f.name}, the better of the two`);
  for (const [id, w] of STAY) A.push(`  not moved: ${lab(E(id))}: ${w}`);
  deleteTheme(P, from); reindex(P); n++; counts.themeDel++;
  A.push(`  deleted theme: ${from} "${f.name}", merged into ${into} "${it.name}"`);
};

// =====================================================================================================================
sec('1. Wrong senses (LIBRARY-RULES 5, Entries: link the entry in the sense the theme means)');
swap('farm_animals', chk(461, 'lamb'), chk(25044, 'lamb'), 'the animal, not the meat (sense-twin)');
swap('baby_animals', chk(461, 'lamb'), chk(25044, 'lamb'), 'the young sheep, not the meat (sense-twin)');
swap('insect_life_cycle', chk(6922, 'nymph'), chk(10146, 'nymph'), 'the young insect, not the spirit of myth (sense-twin)');
swap('insect_body_parts', chk(4606, 'antenna'), chk(10338, 'antenna'), 'the feeler, not the radio aerial (sense-link); the antenna = feeler = antennae group follows');
swap('dog_breeds', chk(7583, 'Maltese'), chk(50998, 'Maltese'), 'the dog, not the language (sense-link)');
absorb(9588, 'hock', 10344, 'hock', 'delete', 0, 'hock [leg joint] and hock [animal] are one sense, the joint in the hind leg of an animal (sense-link): the second root goes');
swap('animals_with_tusks', chk(1458, 'boar'), chk(9678, 'wild boar'), 'the tusked wild boar; boar [pig] 1458 is the male pig (male animals, farm animals) (sense-twin, sense-link)');
swap('sea_life', chk(1317, 'man-of-war'), chk(9819, "Portuguese man o' war"), 'the stinging sea creature; man-of-war 1317 also holds the warship themes (age of sail, warships, navy words, sailing ships)');
swap('jellyfish_and_relatives', chk(1317, 'man-of-war'), chk(9819, "Portuguese man o' war"), 'the stinging sea creature (the blue bottle group follows)');
setE(E(1317), 'gloss', 'warship', 'it now holds only the warship sense (Portuguese man o\' war 9819 is the sea creature)');
out('seals_and_sea_lions', [[32173, 'Ross Sea']], 'the sea (a place), not the seal; Ross seal 9712 takes its place');
linkE(chk(9712, 'Ross seal'), 'seals_and_sea_lions', 4, 'the Antarctic seal the theme meant (shown "Ross", as the Ross Sea link was)', { show: 'Ross' });
{ const egg = newE('egg', 'animal egg', { pos: 'noun', type: 'common', fam: 1 }, 'the egg an animal lays, the first life stage; egg 518 is glossed [food from hens] and holds the food themes');
  for (const tid of ['insect_life_cycle', 'butterfly_life_stages']) swap(tid, E(518), egg, 'the life stage, not the food');
}
{ const pr = newE('proboscis', 'mouthpart', { pos: 'noun', type: 'common', fam: 4 }, 'the sucking mouthpart of a butterfly, moth or fly; proboscis 9132 is the elephant\'s trunk sense');
  swap('insect_body_parts', E(9132), pr, 'the insect mouthpart, not the elephantine nose');
  swap('bug_parts', E(9132), pr, 'the insect mouthpart, not the elephantine nose'); }
{ const pg = newE('puggle', 'baby echidna', { pos: 'noun', type: 'common', fam: 4 }, 'the young of an echidna or platypus; puggle 10516 is the pug-beagle cross (hybrid animals)');
  swap('baby_animals', chk(10516, 'puggle'), pg, 'the baby echidna, not the dog cross');
  setE(E(10516), 'gloss', 'dog', 'its text is now shared with puggle [baby echidna]'); }
{ const lu = newE('lumber', 'move heavily', { pos: 'verb', type: 'common', fam: 3 }, 'to move in a slow heavy way (Oxford, M-W); lumber 24038 is the US word for sawn timber');
  swap('animal_movements', chk(24038, 'lumber'), lu, 'the way of moving, not timber', 3);
  swap('ways_of_walking', E(24038), lu, 'the way of moving, not timber');
  setE(E(24038), 'pos', 'noun', 'the timber sense is a noun (its verb links moved to lumber [move heavily])'); }
{ const po = newE('possum', 'Australian', { pos: 'noun', type: 'common', fam: 2 }, 'the Australian possums (brushtail, ringtail), not the American opossum that possum 1047 [US] names');
  swap('australian_animals', chk(1047, 'possum'), po, 'the Australian marsupial, not the American opossum', 3);
  setE(E(1047), 'gloss', 'opossum', 'its text is now shared with possum [Australian]'); }
absorb(1047, 'possum', 1046, 'opossum', 'synonym', 3, 'the American possum is the opossum (Simon: merge); possum keeps its US tag as a synonym alias', { region: ['US'] });
setE(chk(2527, 'crest'), 'type', 'common', 'crest [helmet emblem] is a common noun, not a set phrase; typed phrase it made the animal crests (8364, 9604) never count as everyday words (contract-dup-root)');
setE(chk(1613, 'Ice Age'), 'tm', false, 'the period, not the film: every theme it is in is a period theme (LIBRARY-RULES 4: tm only for a brand, title or product)');

// =====================================================================================================================
sec('1b. Galápagos (Simon: rule 8, the root keeps the diacritic, the plain form is its spelling alias; v390 had left the texts plain)');
for (const [id, plain] of [[8244, 'Galapagos penguin'], [50810, 'Galapagos sea lion'], [8576, 'Galapagos tortoise'], [63286, 'Galapagos cormorant'], [51263, 'Galapagos racer'], [51265, 'Galapagos rail']]) {
  const acc = plain.replace('Galapagos', 'Galápagos'), e = chk2(id, plain, acc);
  renameE(e, acc, 'Galápagos with its diacritic (M-W prints it; rule 8), as the shown texts and the theme name already write it');
  newAlias(e, plain, 'spelling', [], e.fam, 'the plain spelling (rule 8)'); }

sec('2. Bare stubs (LIBRARY-RULES 5, Kinds themes: the member is the full term, shown short; never a bare stub). The display in the theme stays the same.');
const S = (g, gt, k, kt, tid, show, why, o = {}) => absorb(g, gt, k, kt, 'delete', 0, why || 'a bare stub of the full term, which takes its link', { show: show ? { [tid]: show } : undefined, noKin: true, ...o });
S(63577, 'red', 7962, 'red fox', 'wild_dogs_and_foxes', 'red');
S(63564, 'mule', 9734, 'mule deer', 'deer', 'mule', 'a bare stub of mule deer (sense-twin with mule [animal]); mule deer takes the link');
S(63566, 'roe', 9679, 'roe deer', 'deer', 'roe');
S(63568, 'sable', 40205, 'sable antelope', 'antelopes', 'sable');
S(63600, 'harpy', 8108, 'harpy eagle', 'eagles', 'harpy');
S(63623, 'snapper', 1201, 'snapping turtle', 'turtles_and_tortoises', 'snapping', 'snapper [turtle] is the snapping turtle; its eight kin were set for the word snapper (snap, snappy ...), not the turtle');
S(65319, 'giant', 8575, 'giant tortoise', 'turtles_and_tortoises', 'giant');
S(65318, 'Galapagos', 8576, 'Galápagos tortoise', 'turtles_and_tortoises', 'Galápagos');
S(65332, 'radiated', 8603, 'radiated tortoise', 'turtles_and_tortoises', 'radiated', 'a bare stub of radiated tortoise; its kin radiation was set for the word, not the tortoise');
S(65320, 'gopher', 8606, 'gopher tortoise', 'turtles_and_tortoises', 'gopher', 'a bare stub of gopher tortoise (sense-twin with gopher [pocket rodent])');
S(65273, 'collared', 8471, 'Eurasian collared dove', 'pigeons_and_doves', null, 'a bare stub of Eurasian collared dove, which is in the theme and in its group; its kin (collar) was set for the word');
S(65287, 'mourning', 8464, 'mourning dove', 'pigeons_and_doves', 'mourning', 'a bare stub of mourning dove; its kin mournful was set for the word');
S(65292, 'rock', 8461, 'rock dove', 'pigeons_and_doves', 'rock', 'a bare stub of rock dove (the feral pigeon group follows); its kin rock [stone] was set for the word');
S(63688, 'peacock', 9024, 'peacock butterfly', 'butterflies_and_moths', 'peacock');
S(63686, 'hawk', 9044, 'hawk moth', 'butterflies_and_moths', 'hawk');
S(63687, 'luna', 9042, 'luna moth', 'butterflies_and_moths', 'luna', 'a bare stub of luna moth (its bare text clashes with Luna, contract-dup-root)');
S(63694, 'queen', 9057, 'queen bee', 'bees_and_wasps', 'queen');
S(63656, 'eagle', 8797, 'eagle ray', 'rays_and_eels', 'eagle');
S(63054, 'manta', 1329, 'manta ray', 'rays_and_eels', 'manta');
S(63055, 'moray', 1320, 'moray eel', 'rays_and_eels', 'moray', 'a bare stub of moray eel (its bare text clashes with Moray, contract-dup-root)');
S(1330, 'great white', 8743, 'great white shark', 'sea_life', null, 'a second root of great white shark: the full term takes its link (sea life shows the full name)');
S(1331, 'hammerhead', 51267, 'hammerhead shark', 'sea_life', null, 'a second root of hammerhead shark: the full term takes its links');
S(65422, 'Pacific octopus', 8973, 'giant Pacific octopus', 'ocean_giants', 'Pacific octopus', 'a second root of the giant Pacific octopus (shown as before: giant is a word of the theme name)');
S(63029, 'tanuki', 7974, 'tanuki', 'wild_dogs_and_foxes', null, 'a second root of tanuki: the Japanese raccoon dog is one animal in Japanese animals, Japanese folklore and wild dogs (left for step 3 by v433)', { noKin: false });
S(9637, 'bongo', 50510, 'bongo', 'african_animals', null, 'a second root of bongo [antelope]', { noKin: false });
S(7931, 'boar', 9678, 'wild boar', 'hoofed_mammals', null, 'boar [animal] is the wild boar (sense-twin with boar [pig], the male pig): wild boar takes its link', { noKin: false });
S(63089, 'Przewalski', 9483, "Przewalski's horse", 'horses', "Przewalski's", 'a bare stub of Przewalski\'s horse', { show: { horses: "Przewalski's", horse_breeds: "Przewalski's", horse_family: "Przewalski's" } });
S(63088, 'Persian', 9304, 'Persian cat', 'cat_breeds', 'Persian', 'a second root of Persian cat');
S(63734, 'bobtail', 51171, 'Japanese bobtail', 'japanese_animals', 'bobtail', 'a bare stub of Japanese bobtail');
S(63735, 'Chin', 51003, 'Japanese Chin', 'japanese_animals', 'Chin', 'a bare stub of Japanese Chin');
S(50612, 'griffon', 50604, 'Himalayan griffon', 'himalayan_animals', 'griffon', 'the griffon of the Himalayas is the Himalayan griffon');
S(9344, 'Highland', 40202, 'Highland cow', 'cattle_breeds', 'Highland', 'the same breed as Highland cow 40202 (animals with horns)', { noKin: false });
S(9339, 'holstein', 9863, 'Holstein', 'cattle_breeds', null, 'the same breed as Holstein 9863 (proper: M-W and Oxford capitalise it); v376 kept the lowercase copy only because capitalising it would duplicate 9863, so the two now become one', { noKin: false });
setE(E(9863), 'gloss', 'cattle', 'fits both former roots (the breed)');
S(64801, 'cinnamon', 7951, 'cinnamon bear', 'north_american_animals', null, 'a bare stub of cinnamon bear, linked in the same three themes and grouped with it');
const RN = (id, t, nt, tid, show, why, o = {}) => { const e = chk2(id, t, nt); renameE(e, nt, why || 'the full term; the bare possessive or modifier was a stub (LIBRARY-RULES 5)', o); if (show) for (const x of [].concat(tid)) setShow(e, x, show, 'the theme shows the short word, as before'); };
RN(63002, "Geoffroy's", "Geoffroy's cat", 'small_wild_cats', "Geoffroy's");
RN(63003, "De Brazza's", "De Brazza's monkey", 'monkeys', "De Brazza's");
RN(63004, "Goeldi's", "Goeldi's monkey", 'monkeys', "Goeldi's");
RN(63030, "Daubenton's", "Daubenton's bat", 'bats', "Daubenton's");
RN(63031, "Natterer's", "Natterer's bat", 'bats', "Natterer's");
RN(63033, "Tengmalm's", "Tengmalm's owl", 'owls', "Tengmalm's");
RN(63032, 'saw-whet', 'saw-whet owl', 'owls', 'saw-whet');
RN(63039, "Bewick's", "Bewick's swan", 'geese_and_swans', "Bewick's");
RN(63042, "Meyer's", "Meyer's parrot", 'parrots', "Meyer's");
RN(63043, 'Nicobar', 'Nicobar pigeon', 'pigeons_and_doves', 'Nicobar');
RN(63058, 'Steller', 'Steller sea lion', 'seals_and_sea_lions', 'Steller');
RN(63046, 'Aldabra', 'Aldabra tortoise', 'turtles_and_tortoises', 'Aldabra');
RN(63641, 'pink', 'pink salmon', 'salmon_and_trout', 'pink', null, { gloss: '', clearKin: true });
RN(65357, 'horned', 'horned frog', 'frogs_and_toads', 'horned', null, { gloss: '', clearKin: true });
absorb(63736, 'jackass', 8243, 'African penguin', 'synonym', 4, 'jackass penguin is another name of the African penguin: a synonym alias (reviewer); it keeps its offensive flag');

// =====================================================================================================================
sec('3. Two roots of one thing: the weaker becomes an alias in place (id kept) or goes into the stronger; the theme shows the old text where it needs it');
const AL = (g, gt, k, kt, kind, fam, why, o) => absorb(g, gt, k, kt, kind, fam, why, o);
AL(1347, 'skeeter', 1345, 'mosquito', 'synonym', 3, 'US slang for mosquito, in all of mosquito\'s themes and grouped with it (contract-root-region); synonym, not regional: mosquito is the US word', { region: ['US'] });
AL(1441, 'moggy', 1440, 'cat', 'synonym', 3, 'British slang for a (non-pedigree) cat, grouped with cat in every theme it is in (contract-root-region)', { region: ['UK', 'IE'] });
AL(1429, 'maybug', 1428, 'cockchafer', 'synonym', 5, 'another name of the cockchafer, grouped with it (contract-root-region)', { region: ['UK'] });
AL(9006, 'may bug', 1428, 'cockchafer', 'synonym', 4, 'maybug written apart: another name of the cockchafer', { region: ['UK'] });
AL(8136, 'bonxie', 8135, 'great skua', 'synonym', 5, 'the Shetland name of the great skua, grouped with it (contract-root-region)', { region: ['UK'] });
AL(51194, 'bin chicken', 1116, 'ibis', 'synonym', 4, 'Australian slang for the ibis, grouped with it (contract-root-region)', { region: ['AU'] });
AL(57686, 'shippon', 38174, 'cowshed', 'synonym', 5, 'a dialect word for a cowshed, grouped with it in every theme (contract-root-region); byre is cowshed\'s UK regional alias', { region: ['UK'] });
AL(9970, 'dino', 1551, 'dinosaur', 'abbreviation', 1, 'short for dinosaur, grouped with it');
AL(63097, 'Van cat', 9338, 'Turkish Van', 'synonym', 4, 'the same breed', { show: { turkish_animals: 'Van cat' } });
AL(9664, 'Angora cat', 9318, 'Turkish Angora', 'synonym', 3, 'the same breed', { show: { turkish_animals: 'Angora cat' } });
AL(63098, 'spectacled cobra', 9695, 'Indian cobra', 'synonym', 4, 'another name of the Indian cobra', { show: { indian_animals: 'spectacled cobra' } });
AL(51127, 'rhesus macaque', 7814, 'rhesus monkey', 'synonym', 3, 'the same monkey');
AL(40146, 'pink dolphin', 9722, 'pink river dolphin', 'synonym', 3, 'the Amazon river dolphin', { show: { pink_animals: 'river dolphin', pink_things: 'river dolphin' } });
AL(63300, 'boto', 9722, 'pink river dolphin', 'synonym', 4, 'the Amazon river dolphin (its Portuguese name; contract-dup-root with Boto)', { show: { pink_animals: 'river dolphin', pink_things: 'river dolphin', whales_and_dolphins: 'boto' } });
AL(63122, "Mitchell's cockatoo", 8295, 'pink cockatoo', 'synonym', 4, 'Major Mitchell\'s cockatoo is the pink cockatoo (the common name is the root, reviewer); pink animals holds it with nameOkIn: the full name', { nameOk: ['pink_animals'] });
AL(51268, 'marine turtle', 1293, 'sea turtle', 'synonym', 3, 'another name of the sea turtle');
out('wild_dogs_and_foxes', [[7994, 'Tasmanian wolf']], 'a marsupial (the thylacine), not a dog or fox');
AL(7994, 'Tasmanian wolf', 1606, 'thylacine', 'synonym', 4, 'another name of the thylacine (Tasmanian tiger is grouped with it)');
AL(7970, 'painted dog', 7969, 'African wild dog', 'synonym', 4, 'another name of the African wild dog, grouped with it', { show: { african_animals: 'painted dog' } });
AL(63574, 'painted wolf', 7969, 'African wild dog', 'synonym', 4, 'another name of the African wild dog', { show: { wild_dogs_and_foxes: 'painted wolf' } });
AL(63095, 'grey parrot', 8265, 'African grey', 'synonym', 3, 'the same parrot', { show: { african_birds: 'grey parrot' } });
AL(51218, 'little blue penguin', 8241, 'little penguin', 'synonym', 4, 'the same penguin (blue, fairy and little penguin and korora are grouped with it)');
AL(7800, 'Andean mountain cat', 9804, 'Andean cat', 'synonym', 5, 'the same cat');
AL(63744, 'mountain cat', 9804, 'Andean cat', 'synonym', 5, 'the same cat, grouped with it');
AL(63116, 'wisent', 9741, 'European bison', 'synonym', 4, 'the European bison', { show: { european_animals: 'wisent' } });
AL(7816, 'colobus', 9859, 'colobus monkey', 'synonym', 4, 'the same monkey');
AL(9792, 'Sumatran rhino', 51173, 'Sumatran rhinoceros', 'abbreviation', 4, 'the same animal, rhino short for rhinoceros');
out('himalayan_animals', [[7948, 'Kodiak'], [7946, 'grizzly bear'], [7945, 'grizzly']], 'a North American bear, not a Himalayan one');
AL(7948, 'Kodiak', 7947, 'Kodiak bear', 'abbreviation', 3, 'the same bear, grouped with it');
AL(8569, 'loggerhead', 8610, 'loggerhead turtle', 'abbreviation', 4, 'the same turtle');
out('sea_reptiles', [[1202, 'leatherback'], [1293, 'sea turtle'], [8612, 'saltwater crocodile'], [1328, 'sea snake'], [1200, 'marine iguana'], [10022, 'Nessie']], 'a living animal or a monster, not a prehistoric sea reptile');
AL(1202, 'leatherback', 8609, 'leatherback turtle', 'abbreviation', 4, 'the same turtle', { show: { reptiles_and_amphibians: 'leatherback' } });
AL(8571, 'hawksbill', 8912, 'hawksbill turtle', 'abbreviation', 4, 'the same turtle');
AL(9914, 'bush baby', 7820, 'bushbaby', 'spelling', 3, 'bushbaby written apart');
AL(9851, 'bumble bee', 1383, 'bumblebee', 'spelling', 1, 'bumblebee written apart, grouped with it');
AL(9825, 'yellow jacket', 1409, 'yellowjacket', 'spelling', 3, 'yellowjacket written apart');
AL(9018, 'glow-worm', 1415, 'glowworm', 'spelling', 3, 'the British spelling (Oxford: glow-worm; M-W: glowworm)', { region: ['UK'] });
AL(9124, 'cranefly', 1386, 'crane fly', 'spelling', 3, 'crane fly written as one word');
AL(51176, 'mouse-deer', 9693, 'mouse deer', 'spelling', 4, 'mouse deer with a hyphen');
AL(60034, 'mallee fowl', 51186, 'malleefowl', 'spelling', 5, 'malleefowl written apart');
AL(50706, 'hammerkop', 51103, 'hamerkop', 'spelling', 4, 'the commoner spelling is hamerkop');
AL(1339, 'seagrass', 1291, 'sea grass', 'spelling', 4, 'sea grass written as one word, grouped with it');
AL(8083, 'cony', 8084, 'coney', 'spelling', 5, 'the same word, grouped with it');
AL(9452, 'oxen', 162, 'ox', 'form', 2, 'the plural of ox, grouped with it');
AL(9135, 'antennae', 10338, 'antenna', 'form', 3, 'the plural of antenna, grouped with it');
AL(63024, 'whitetail', 9733, 'white-tailed deer', 'synonym', 3, 'the same deer', { show: { deer: 'whitetail' } });
AL(41021, "Darwin's finches", 51251, "Darwin's finch", 'form', 4, 'the plural', { show: { finches: "Darwin's" } });
AL(63100, 'star tortoise', 8604, 'Indian star tortoise', 'synonym', 4, 'the same tortoise', { show: { indian_animals: 'star tortoise' } });
AL(8624, 'mugger crocodile', 8633, 'mugger', 'synonym', 5, 'the same crocodile');
AL(8637, 'marsh crocodile', 8633, 'mugger', 'synonym', 5, 'another name of the mugger, grouped with it');
AL(8635, 'swamp crocodile', 8633, 'mugger', 'synonym', 4, 'another name of the mugger');
AL(9748, 'beluga whale', 1309, 'beluga', 'synonym', 3, 'the same whale');

// =====================================================================================================================
sec('4. Belonging (LIBRARY-RULES 6, Themes: every member belongs unambiguously; never the bare category word; no word beside its own kinds)');
const YOUNG = 'a young, male or female animal, not a kind of the theme (it is in baby, male or female animals)';
out('big_cats', [[7763, 'pride'], [7762, 'cub'], [7767, 'maneater']], 'not a big cat (a group, a young animal, a description)');
groupAdd('big_cats', [215, 7766], 'king of the jungle is a name for the lion: one answer');
out('whales_and_dolphins', [[7893, 'cetacean'], [36797, 'Irrawaddy']], 'the bare category word / a river (place), not a whale or dolphin');
out('marsupials', [[7919, 'marsupial'], [7918, 'pouch'], [9702, 'joey']], 'the bare category word, a body part or a young animal, not a marsupial');
out('bats', [[8056, 'roost'], [8057, 'colony'], [3341, 'echolocation']], 'not a bat (a home, a group, an ability)');
out('rabbits_and_hares', [[8078, 'buck'], [8077, 'doe'], [8079, 'kit'], [8080, 'leveret']], YOUNG);
out('rabbits_and_hares', [[10163, 'hutch'], [8082, 'burrow'], [8081, 'warren']], 'a home, not a rabbit or hare (in animal homes)');
out('wild_dogs_and_foxes', [[7995, 'vixen']], YOUNG);
out('deer', [[50506, 'Bambi'], [25017, 'Rudolph']], 'a fictional character, not a kind of deer');
out('mammals_that_live_in_water', [[979, 'elephant']], 'not an aquatic mammal');
out('birds_of_prey', [[8119, 'bird of prey'], [8118, 'raptor']], 'the theme\'s own name, the bare category word');
out('birds_of_prey', [[8120, 'talon']], 'a body part, not a bird');
out('owls', [[10135, 'owlet']], YOUNG); out('owls', [[50579, 'Hedwig']], 'a fictional owl (Harry Potter), not a kind of owl');
out('eagles', [[10134, 'eaglet']], YOUNG);
groupAdd('eagles', [2528, 50597], 'American eagle is the bald eagle: one answer');
out('crows_and_ravens', [[10240, 'murder'], [50653, 'corvid']], 'a collective noun / the bare category word');
out('ducks', [[10128, 'duckling'], [1480, 'drake']], YOUNG);
out('ducks', [[65266, 'rubber']], 'the bath toy (rubber duck), not a duck');
out('geese_and_swans', [[10131, 'gosling'], [41073, 'cygnet'], [1481, 'gander'], [10287, 'cob'], [50686, 'pen']], YOUNG);
out('wading_birds', [[32072, 'wader']], 'the bare category word (wading bird)');
out('flightless_birds', [[8256, 'flightless'], [8257, 'ratite']], 'an adjective / the bare category word');
out('penguins', [[51227, 'Antarctic penguin']], 'not a species: a description that fits several');
out('parrots', [[8297, 'polly'], [8298, 'Norwegian blue']], 'a pet name / a comedy parrot (Monty Python), not a kind of parrot');
out('game_birds', [[8321, 'gun dog'], [8323, 'shoot'], [8322, 'beater'], [8319, 'brace'], [8320, 'covey']], 'a word of the shoot, not a game bird');
out('bird_body_parts', [[8407, 'drumstick']], 'a cut of cooked poultry, not a part of a living bird');
out('local_status_labels', [[8419, 'migration']], 'not a status label (resident, vagrant, summer visitor ...)');
out('pigeons_and_doves', [[8493, 'coo'], [8486, 'squab'], [8491, 'dovecote'], [8492, 'pigeon loft']], 'a sound, a young bird or a home, not a pigeon or dove');
setShow(chk(9921, 'pink pigeon'), 'pigeons_and_doves', 'pink', 'shown "pigeon" leaked the theme name; the modifier is what identifies it');
setShow(chk(9857, 'spotted dolphin'), 'whales_and_dolphins', 'spotted', 'shown "dolphin" leaked the theme name');
setE(chk(4629, 'carrier pigeon'), 'type', 'common', 'a common noun, not a set phrase (LIBRARY-RULES 4, type)');
out('venomous_snakes', [[50724, 'venomous snake']], 'the theme\'s own name');
out('constrictor_snakes', [[50741, 'constrictor']], 'the bare category word');
out('constrictor_snakes', [[50745, 'Kaa']], 'a fictional python (The Jungle Book)');
for (const [stub, full] of [[63617, 1192], [63615, 1191], [63616, 8507]]) { const s = ix.entry.get(stub); if (s) S(stub, s.text, full, E(full).text, 'american_serpents', null, 'a bare stub of the full snake name, which takes its link (no word of "American serpents" in it)'); }
out('turtles_and_tortoises', [[8599, 'shell'], [8597, 'carapace'], [8598, 'plastron'], [8596, 'hatchling']], 'a body part or a young animal, not a turtle');
out('turtles_and_tortoises', [[8611, 'Lonesome George']], 'one famous tortoise, not a kind (he stays in Galápagos animals and extinct animals)');
out('crocodilians', [[8634, 'crocodilian']], 'the bare category word');
out('frogs_and_toads', [[8673, 'croak'], [8674, 'ribbit'], [8672, 'spawn'], [8676, 'frogspawn'], [8675, 'lily pad'], [8671, 'froglet'], [8677, 'toadlet'], [1163, 'tadpole']], 'a sound, eggs, a young frog or a lily pad, not a frog or toad');
out('frogs_and_toads', [[8670, 'Kermit']], 'a puppet (The Muppets), not a kind of frog');
out('salamanders_and_newts', [[10334, 'gill'], [8710, 'larva'], [8706, 'caudate'], [8707, 'urodele']], 'a body part, a young stage or the bare category word');
out('salmon_and_trout', [[17792, 'lox']], 'a food (smoked salmon), not a salmon or trout');
out('salmon_and_trout', [[41059, 'fingerling'], [50760, 'alevin'], [10142, 'parr'], [10143, 'smolt'], [50761, 'kelt'], [50759, 'grilse'], [50762, 'redd']], 'a life stage of a salmon (or its nest), not a kind of salmon or trout');
out('tropical_fish', [[1214, 'goldfish'], [1239, 'koi']], 'a cold-water fish, not a tropical one');
out('rays_and_eels', [[8808, 'elver']], 'a young eel, not a kind');
out('deep_sea_fish', [[1318, 'giant squid'], [8832, 'dumbo octopus'], [8831, 'vampire squid']], 'a cephalopod, not a fish');
out('fish_body_parts', [[17671, 'fillet']], 'a cut of meat, not a part of a living fish');
for (const tid of ['sea_life', 'mollusks', 'cephalopods', 'tentacled_animals']) out(tid, [[486, 'calamari']], 'squid as food (squid is a member)');
for (const tid of ['sea_life', 'reef_life', 'starfish_and_sea_urchins', 'spiny_animals']) out(tid, [[503, 'uni']], 'sea urchin roe as food (sea urchin is a member)');
unlinkE(chk2(8896, 'mollusc', 'mollusk'), 'mollusks', 'the theme\'s own word, the bare category word');
{ const e = chk2(8896, 'mollusc', 'mollusk'); if (e.text === 'mollusc') { renameE(e, 'mollusk', 'US spelling for the root (contract-root-region: the UK spelling was the root and the library had no mollusk)'); setE(e, 'region', [], 'the root is the US form'); }
  newAlias(e, 'mollusc', 'spelling', ['UK'], e.fam, 'the UK spelling'); }
for (const tid of ['cephalopods', 'tentacled_animals']) out(tid, [[8895, 'cephalopod']], 'the bare category word');
for (const tid of ['cephalopods', 'ocean_giants', 'tentacled_animals']) out(tid, [[6947, 'Kraken']], 'a sea monster of legend (in mythical creatures and sea monsters)');
for (const tid of ['cephalopods', 'jellyfish_and_relatives']) out(tid, [[8933, 'tentacle']], 'a body part, not an animal');
out('jellyfish_and_relatives', [[8934, 'nematocyst']], 'a stinging cell, not an animal');
for (const tid of ['sea_mammals', 'seals_and_sea_lions']) out(tid, [[8905, 'pinniped']], 'the bare category word');
out('sea_mammals', [[7893, 'cetacean']], 'the bare category word');
out('seals_and_sea_lions', [[10133, 'pup'], [10175, 'rookery'], [50818, 'haul-out']], 'a young seal or a place, not a seal');
out('seals_and_sea_lions', [[22262, 'selkie']], 'a creature of folklore, not a seal');
out('seaweeds', [[18998, 'seaweed salad'], [19917, 'agar'], [8949, 'spirulina']], 'a food or product, not a seaweed');
out('seaweeds', [[1291, 'sea grass'], [8953, 'eelgrass']], 'a flowering plant, not a seaweed');
out('starfish_and_sea_urchins', [[8987, 'tube feet'], [8986, 'echinoderm'], [63062, 'holothurian']], 'a body part, the bare category word, or a sea cucumber');
out('spiders', [[8861, 'spider crab']], 'a crab, not a spider');
out('spiders', [[9112, 'arachnid'], [9113, 'spiderling'], [9115, 'spinneret']], 'the bare category word, a young spider or a body part');
out('insect_body_parts', [[9138, 'cuticle']], 'cuticle [nail], the human sense; insects have an exoskeleton (a member)');
out('biting_bugs', [[1342, 'bee'], [1343, 'wasp'], [1382, 'hornet']], 'it stings, it does not bite or suck blood (the theme note); in venomous animals');
out('ants_and_termites', [[10242, 'colony'], [9227, 'anthill'], [9230, 'formicary']], 'a group or a home, not an ant');
out('ants_and_termites', [[1434, 'antlion']], 'an insect larva of another order, not an ant');
groupDrop('butterflies_and_moths', 9033, 'the purple emperor (a butterfly) is not the emperor moth: two answers');
out('domestic_animals', [[1476, 'livestock']], 'the bare category word');
out('terriers', [[50973, 'Toto']], 'a fictional dog (The Wizard of Oz)');
setShow(chk(50969, 'Silky terrier'), 'terriers', 'Silky', 'a show keeps the root\'s case (LIBRARY-RULES 4, show)');
out('toy_dogs', [[51015, 'toy dog'], [51017, 'lapdog'], [51016, 'teacup dog']], 'the theme\'s own word or a category, not a breed');
out('herding_dogs', [[51048, 'Lassie']], 'a fictional collie');
out('horse_tack', [[3668, 'blanket']], 'blanket [bedding]; the horse\'s blanket is the saddle blanket (a member)');
for (const tid of ['horse_family']) out(tid, [[9625, 'equid'], [9626, 'Equus']], 'the bare category word');
groupDrop('horses', 153, 'a mustang is a kind of horse, not the same answer as horse'); groupDrop('horse_family', 153, 'a mustang is a kind of horse, not the same answer as horse');
out('wild_pigs', [[50562, 'Pumbaa']], 'a fictional warthog (The Lion King)');
for (const tid of ['turkish_animals', 'european_animals', 'alpine_animals']) out(tid, [[7946, 'grizzly bear'], [7945, 'grizzly']], 'the North American brown bear');
for (const tid of ['turkish_animals', 'european_animals']) out(tid, [[7966, 'timber wolf']], 'the North American name of the gray wolf (gray wolf is a member)');
out('turkish_animals', [[9667, 'Caretta caretta']], 'the Latin name of the loggerhead turtle (a member)');
out('himalayan_animals', [[1147, 'newt'], [1148, 'eft']], 'not a Himalayan animal (typicality 5)');
out('alpine_animals', [[1148, 'eft']], 'a young newt, not an Alpine animal (Alpine newt is a member)');
out('australian_animals', [[9702, 'joey']], YOUNG);
out('prehistoric_life', [[1610, 'Jurassic'], [1611, 'Cretaceous'], [1612, 'Triassic'], [1607, 'Mesozoic'], [1619, 'Cambrian'], [1609, 'Cenozoic'], [1608, 'Paleozoic'], [1613, 'Ice Age'], [1620, 'Pangaea']], 'a period or a supercontinent, not a creature (in prehistoric periods)');
out('prehistoric_life', [[1621, 'fossil record'], [1616, 'paleontologist'], [1627, 'carnivore'], [1626, 'herbivore'], [1614, 'extinction'], [1615, 'amber'], [1567, 'fossil']], 'a word of the science, not a creature (in dinosaur science)');
out('flying_reptiles', [[9996, 'flying reptile'], [9997, 'winged reptile'], [9998, 'flying dinosaur']], 'the theme\'s own name or a description (pterosaurs were not dinosaurs)');
out('prehistoric_periods', [[10092, 'Anthropocene']], 'the present age, not a prehistoric one');
out('male_animals', [[1436, 'hound'], [1438, 'mutt'], [1437, 'pooch'], [1439, 'doggo']], 'a word for any dog, not a male one');
out('animal_movements', [[10149, 'burrow']], 'a home (noun), not a movement');
// African grey 8265 joins pets / cage birds already; little penguin in NZ animals
// =====================================================================================================================
sec('4b. Reviewer\'s fixes (second agent: apply after fixes)');
out('deer', [[9780, 'stag'], [9781, 'doe'], [10130, 'fawn'], [10288, 'hart'], [50504, 'hind'], [50505, 'roebuck']], YOUNG + ' (as in ducks, geese, owls and rabbits)');
delE(50504, 'hind', 'hind [deer], a second root of hind [animal] 10309 (female animals), made for deer');
linkE(chk(50505, 'roebuck'), 'male_animals', 4, 'the male roe deer: a male animal word');
out('worms', [[3433, 'ringworm'], [6533, 'bookworm']], 'an infection / a person, not a worm');
out('hounds', [[1436, 'hound'], [50997, 'hunting dog'], [50992, 'sighthound'], [50993, 'scent hound']], 'the theme\'s own word or a category of hounds, not a breed');
out('prehistoric_life', [[1617, 'megafauna'], [1624, 'sauropod'], [1625, 'theropod']], 'a category word, not a creature');
AL(63021, 'cachalot', 1308, 'sperm whale', 'synonym', 4, 'another name of the sperm whale');
AL(63015, 'finback', 7868, 'fin whale', 'synonym', 4, 'another name of the fin whale');
AL(1601, 'woolly rhinoceros', 10025, 'woolly rhino', 'synonym', 4, 'the same animal, grouped with it; woolly rhino is the commoner name');
AL(1176, 'beardie', 1175, 'bearded dragon', 'abbreviation', 4, 'short for bearded dragon, grouped with it (its kin beard was set for the word)', { noKin: true });
AL(1153, 'Komodo monitor', 1152, 'Komodo dragon', 'synonym', 5, 'another name of the Komodo dragon, grouped with it');
AL(8020, 'ratel', 8003, 'honey badger', 'synonym', 5, 'another name of the honey badger, grouped with it');
AL(7832, 'Barbary ape', 7831, 'Barbary macaque', 'synonym', 4, 'the Barbary macaque (not an ape), grouped with it');
AL(8016, 'beech marten', 8015, 'stone marten', 'synonym', 5, 'another name of the stone marten');
setE(chk(17734, 'mallard'), 'fam', 2, 'nearly every adult knows the mallard (the common wild duck); it gives ducks an easy word');
setT('odd_toed_animals', 'ident', 3, 'horse, zebra, rhino, tapir: needs a moment (hoofed animals fit too), not hard');
setE(chk(1473, 'bantam'), 'fam', 3, 'a small chicken many adults know (chicken breeds had no easy or middle words)');
setE(chk(1604, 'moa'), 'fam', 3, 'the giant extinct bird of New Zealand is known to many adults');
setE(chk(1597, 'Liopleurodon'), 'fam', 4, 'known to people with an interest (Walking with Dinosaurs), not to few');

sec('4c. Simon\'s decisions on the first draft ("Take all")');
absorb(1049, 'woodchuck', 1048, 'groundhog', 'synonym', 4, 'the same animal (Simon: merge); groundhog is the usual name (the commoner root), woodchuck a synonym with its US/CA tag', { region: ['US', 'CA'], show: { words_from_native_american_languages: 'woodchuck' } });
absorb(1186, 'bullsnake', 8517, 'bull snake', 'spelling', 4, 'the same word written as one (Simon: merge)');
swap('royal_things', chk(9751, 'ermine'), chk(20847, 'ermine'), 'the royal robes are trimmed with ermine fur, not the animal (Simon); stoat and ermine [animal] stay separate');
absorb(9697, 'budgerigar', 1094, 'budgie', 'synonym', 3, 'the full name of the budgie (Simon: budgie stays the root)');
for (const id of [8137, 14323]) setE(chk(id, 'shag'), 'offensive', true, 'the crude British slang sense makes many players snigger (Simon; LIBRARY-RULES 5 snigger test, like tit and booby): every sense is flagged');

sec('5. Regional roots, US spelling and case');
{ const e = chk2(1544, 'dapple grey', 'dapple gray'); if (e.text === 'dapple grey') { renameE(e, 'dapple gray', 'US spelling for the root (LIBRARY-RULES 5: the UK spelling is a spelling alias tagged UK; gray [horse color] is already the root)'); setE(e, 'region', [], 'the root is the US form'); }
  newAlias(e, 'dapple grey', 'spelling', ['UK'], e.fam, 'the UK spelling'); }
{ const e = chk2(7900, 'grey kangaroo', 'gray kangaroo'); renameE(e, 'gray kangaroo', 'US spelling for the root (gray whale, gray wolf, gray squirrel)'); newAlias(e, 'grey kangaroo', 'spelling', ['UK'], e.fam, 'the UK spelling'); }
{ const e = chk2(10470, 'animal behaviourist', 'animal behaviorist'); renameE(e, 'animal behaviorist', 'US spelling for the root'); setShow(e, 'animal_experts', 'behaviorist', 'the shown word in US spelling'); newAlias(e, 'animal behaviourist', 'spelling', ['UK'], e.fam, 'the UK spelling'); }
{ const e = chk2(1426, 'harlequin ladybird', 'Asian lady beetle'); if (e.text === 'harlequin ladybird') { renameE(e, 'Asian lady beetle', 'the US name of the insect (lady beetle, as ladybug is the root of ladybird; contract-root-region)', { type: 'proper' }); setE(e, 'region', [], 'the root is the US name'); }
  newAlias(e, 'harlequin ladybird', 'regional', ['UK'], 4, 'the British name', 'common'); }
setE(chk(1403, 'katydid'), 'region', [], 'the US root of its UK regional alias bush cricket: a root carries no region (contract-root-region)');
renameE(chk2(9278, 'great dane', 'Great Dane'), 'Great Dane', 'M-W and Oxford capitalise the breed (a proper word, Dane)', { type: 'proper' });
renameE(chk2(9291, 'rhodesian ridgeback', 'Rhodesian ridgeback'), 'Rhodesian ridgeback', 'M-W and Oxford capitalise Rhodesian', { type: 'proper' });
renameE(chk2(51110, "pel's fishing owl", "Pel's fishing owl"), "Pel's fishing owl", 'named after a person (Pel): capital', { type: 'proper' });
renameE(chk2(60003, 'Miniature bull terrier', 'miniature bull terrier'), 'miniature bull terrier', 'no proper word in it: lowercase, as miniature schnauzer and miniature pinscher', { type: 'common' });

// =====================================================================================================================
sec('6. Tree: merges and moves inside the group (TIDY-UP.md, Tree)');
mergeTheme('new_world_songbirds', 'new_world_birds',
  [[8342, 'indigo bunting'], [8341, 'painted bunting'], [8340, 'scarlet tanager'], [8353, 'green jay'], [8160, 'goldfinch']],
  new Map([[8355, 'paradise tanager: a South American bird (stays in colorful birds)'], [8350, 'red-crested cardinal: a South American bird (stays in colorful birds)']]),
  'New World songbirds (under colorful birds, US/CA) and American songbirds (under songbirds, US/CA) are one topic; 5 of its 12 words were already in American songbirds');
mergeTheme('bird_parts', 'bird_body_parts', [], new Map(), 'all 10 of its words are in bird body parts and in animal body parts (theme-twin): a copy of a part of the bird theme');
mergeTheme('bug_parts', 'insect_body_parts', [], new Map([[10349, 'pedipalp: a spider part, not an insect part (it stays in animal body parts)']]), '7 of its 8 words are in insect body parts (theme-twin)');
mergeTheme('cold_blooded_animals', 'reptiles_and_amphibians', [], new Map([[1148, 'eft: grouped with newt there already']]), 'all 10 of its words are in reptiles and amphibians (theme-twin), and it was filed under insect eaters');
for (const [id, text, typ] of [[9681, 'Indian rhinoceros', 3], [51173, 'Sumatran rhinoceros', 4], [51172, 'Javan rhinoceros', 4], [9685, 'Malayan tapir', 4], [51233, 'mountain tapir', 4]])
  linkE(chk(id, text), 'odd_toed_animals', typ, 'an odd-toed hoofed animal (rhinos and tapirs, with the horses): the theme held 8 horse-family words of 10 (theme-twin with horse family)');
moveT('long_necked_giants', 'plant_eating_dinosaurs', 'in', '8 of its 9 words are plant-eaters (theme-twin): the sauropods are a kind of plant-eating dinosaur');
moveT('horned_and_armored_beasts', 'plant_eating_dinosaurs', 'in', '7 of its 8 words are plant-eaters (theme-twin): a kind of plant-eating dinosaur');
moveT('pet_snacks_and_feed', 'pet_supplies', 'after', 'what pets are fed: beside pet supplies under pets, not a sibling of farm animals');
setT('galapagos_animals', 'name', 'Galápagos animals', 'the diacritic, as the theme\'s shown texts (v390) and LIBRARY-RULES 6 write it');

// =====================================================================================================================
sec('7. Entries left in no theme by this batch: stubs and category words made for these themes are deleted (LIBRARY-RULES 2, Deleting); real words are kept');
const DEL = [
  [7767, 'maneater', 'a description made for big cats'], [8056, 'roost', 'roost [bats], made for bats (roost [birds] is in animal homes)'], [8057, 'colony', 'colony [bats], made for bats (colony [ants] is in collective nouns)'],
  [8078, 'buck', 'buck [rabbit], made for rabbits and hares (buck [male animal] is in male animals)'], [8077, 'doe', 'doe [rabbit], made for rabbits and hares (doe [deer] is in female animals)'],
  [8079, 'kit', 'kit [rabbit], made for rabbits and hares (kit [fox] is in baby animals)'], [8082, 'burrow', 'burrow [rabbit], made for rabbits and hares (burrow [animal home] is in animal homes)'],
  [7919, 'marsupial', 'the bare category word, made for marsupials'], [7918, 'pouch', 'pouch [marsupial], made for marsupials (pouch [animal] is in animal body parts)'],
  [8119, 'bird of prey', 'the theme\'s own name'], [8118, 'raptor', 'raptor [bird], the bare category word (raptor [dinosaur] stays)'],
  [32072, 'wader', 'the bare category word'], [8257, 'ratite', 'the bare category word'], [8256, 'flightless', 'an adjective made for flightless birds'],
  [51227, 'Antarctic penguin', 'not a species'], [8321, 'gun dog', 'gun dog [game], made for game birds'], [8323, 'shoot', 'shoot [game], made for game birds'],
  [8322, 'beater', 'beater [game], made for game birds'], [8319, 'brace', 'brace [game], made for game birds'], [50653, 'corvid', 'the bare category word'],
  [50724, 'venomous snake', 'the theme\'s own name'], [50741, 'constrictor', 'the bare category word'], [8634, 'crocodilian', 'the bare category word'],
  [8706, 'caudate', 'the bare category word'], [8707, 'urodele', 'the bare category word'], [8710, 'larva', 'larva [amphibian], made for salamanders (larva [grub] is in insect life cycle)'],
  [50761, 'kelt', 'a salmon life stage made for salmon and trout'], [50759, 'grilse', 'a salmon life stage made for salmon and trout'], [50762, 'redd', 'a salmon nest made for salmon and trout'],
  [8934, 'nematocyst', 'a cell, made for jellyfish'], [50818, 'haul-out', 'a word made for seals'],
  [8986, 'echinoderm', 'the bare category word'], [8987, 'tube feet', 'a body part made for starfish'], [63062, 'holothurian', 'a sea cucumber word made for starfish'],
  [9112, 'arachnid', 'the bare category word'], [9115, 'spinneret', 'a body part made for spiders'],
  [51015, 'toy dog', 'the theme\'s own word'], [51017, 'lapdog', 'a category made for toy dogs'], [51016, 'teacup dog', 'a description made for toy dogs'],
  [9625, 'equid', 'the bare category word'], [9626, 'Equus', 'the bare category word (the genus)'], [9667, 'Caretta caretta', 'a Latin name'],
  [9996, 'flying reptile', 'the theme\'s own name'], [9997, 'winged reptile', 'a description'], [9998, 'flying dinosaur', 'a wrong description (pterosaurs are not dinosaurs)'],
  [8297, 'polly', 'a pet name made for parrots'], [65266, 'rubber', 'a bare stub of rubber duck (the toy, 46070)'], [8599, 'shell', 'shell [turtle], made for turtles (shell [animal] is in animal body parts)'],
  [8596, 'hatchling', 'hatchling [turtle], made for turtles (hatchling [baby animal] is in baby animals)'], [8672, 'spawn', 'spawn [frog], made for frogs (frogspawn is its synonym)'],
  [8671, 'froglet', 'a young frog made for frogs'], [8677, 'toadlet', 'a young toad made for frogs'],
  [8407, 'drumstick', 'drumstick [bird], a cut of cooked poultry made for bird body parts'], [8905, 'pinniped', 'the bare category word'], [1476, 'livestock', 'the bare category word, made for domestic animals'],
];
const DEL_KEEP = new Map([   // left in no theme on purpose: a real word or name whose theme is in another group
  [50506, 'Bambi: a candidate for kids\' book or film characters (another group)'], [50579, 'Hedwig: candidate for kids\' book characters'], [8298, 'Norwegian blue: a comedy sketch parrot'],
  [50745, 'Kaa: candidate for kids\' book characters'], [51048, 'Lassie: candidate for a famous animals theme'], [50973, 'Toto: candidate for kids\' book characters'],
  [50562, 'Pumbaa: candidate for film characters'],
]);
const KEEP_CAT = new Set([7919, 9112, 8986, 8905, 1476, 8118, 50653, 8257, 8119, 50741, 32072, 8634, 8706, 8707, 9625, 9626, 51015, 51017, 51016, 50724, 9996, 9667]);   // real words: kept as orphans (LIBRARY-RULES 2 deletes only stubs; reviewer)
for (const id of KEEP_CAT) if (!DEL_KEEP.has(id)) DEL_KEEP.set(id, 'a real category word or name, kept in the library (LIBRARY-RULES 2: only stubs are deleted)');
for (const [id, text, why] of DEL) { const e = ix.entry.get(id); if (e && !KEEP_CAT.has(id) && !linkIds(P, e).length) delE(id, text, why); }

// ---------- status ----------
fixGroups();
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const themeless = [...alone].filter(id => ix.entry.get(id) && !E(id).aliasOf && !linkIds(P, E(id)).length);
const themelessLines = themeless.map(id => `  ${lab(E(id))}${E(id).gloss ? ' [' + E(id).gloss + ']' : ''}: ${DEL_KEEP.get(id) || 'kept: a real word (not made only for the theme it left)'}`);

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();
const spreads = [...new Set([...prof0.keys(), ...groupThemes()])].map(t => [t, prof0.get(t) || 'new', profile(t) || 'deleted']).filter(([, a, b]) => a !== b).map(([t, a, b]) => `  ${t}: ${a} -> ${b}`);

// export comparison (as batch433)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
const tLast = (() => { for (let i = x1.themes.length - 1; i >= 0; i--) if (x0.themes[i] !== x1.themes[i]) return i; return -1; })();
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.map(t => `${t} (index ${x0.themes.indexOf(t)})`).join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to index ${tLast} ("${x1.themes[tLast]}", was "${x0.themes[tLast]}")`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entry rows ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${id} (row ${ia.get(id)})`).join(', ') || 'none'}`);
const toAliasRows = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(name);
cmp.push(`root -> alias rows ${toAliasRows.length}: ${toAliasRows.join(', ') || 'none'}`);
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
  cmp.push(`New characters in the export: ${fresh.map(ch => `${ch} U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(', ') || 'none'}`); }
{ const F = x1.themeFields, pi = F.indexOf('parent'), row = (x, r) => F.map((f, k) => k === pi ? (r[k] === null || r[k] === undefined || r[k] < 0 ? r[k] : x.themes[r[k]]) : r[k]);
  const thCh = x1.themeRows.map((r, i) => [r, i]).filter(([r]) => { const j = x0.themes.indexOf(r[0]); return j >= 0 && JSON.stringify(row(x0, x0.themeRows[j])) !== JSON.stringify(row(x1, r)); })
    .map(([r, i]) => { const j = x0.themes.indexOf(r[0]), a = row(x0, x0.themeRows[j]), b = row(x1, r); return `${r[0]} (index ${j} -> ${i}: ${F.filter((f, k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map(f => { const k = F.indexOf(f); return `${f} ${JSON.stringify(a[k])} -> ${JSON.stringify(b[k])}`; }).join(', ')})`; });
  cmp.push(`Theme rows whose fields changed (parent compared by id): ${thCh.length}: ${thCh.join('; ') || 'none'}`); }
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const REVIEW_TAIL = fs.existsSync(new URL('./batch435-notes.txt', import.meta.url)) ? fs.readFileSync(new URL('./batch435-notes.txt', import.meta.url), 'utf8') : '';
const summary = [`Library batch v435: tidy-up step 3, group Animals (TIDY-UP.md; for Simon's review). ${counts.swap} links moved to the right sense, ${counts.absorb} second roots or stubs merged (aliases in place or deleted), ${counts.out} links out, ${counts.link} links added, ${counts.rename} texts changed, ${counts.show} shown texts, ${counts.newE} new entries and ${counts.alias} new aliases, ${counts.del} orphans deleted; themes: ${counts.themeDel} merged, ${counts.themeMove} moved, ${counts.themeRename} renamed.`,
  ...A,
  'Difficulty spread and gap of the themes that changed (usable words; band 1-2 easy, 3 middle, 4-5 hard; gap = 4th-easiest band - theme difficulty), before -> after:', ...spreads,
  `Entries left in no theme (kept in the library, not exported) ${themelessLines.length}:`, ...themelessLines,
  `Entries added ${added.length}: ${added.map(id => lab(E(id)) + (E(id).gloss ? ' [' + E(id).gloss + ']' : '') + (E(id).aliasOf ? ' (alias)' : '')).join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n` + (REVIEW_TAIL ? '\n' + REVIEW_TAIL : '');
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch435-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

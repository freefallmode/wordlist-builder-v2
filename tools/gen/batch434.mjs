// Library batch v434: the tidy-up, step 3 (TIDY-UP.md), group Food & Drink. Every theme under Food & Drink read against the checklist, plus
// the checks' items in the group. For Simon's review (TIDY-UP.md: an Opus agent drafts, a second agent reviews, Simon approves).
//   1. Senses: links on the wrong sense move to the right one (pistachio [flavor] in ice cream flavors, steam [cooking], dice [chop],
//      bell pepper in salad ingredients, damper [bread], coriander seed in edible seeds, lamb chop without the puppet's capital and flags).
//   2. Bare modifiers (DESIGN-entries.md 3.6, LIBRARY-RULES 5 Kinds themes): a bare word entered as the wrong thing (the fruit, not the juice;
//      the grain, not the milk) becomes the full term shown short. Juices, soups, oils and vinegars, teas, savory pies and pies and tarts link
//      the full term (new where missing); stub entries made for one theme (cottage, cream, blue, American, Swiss in cheeses; apple, pecan ...
//      [dessert] in pies; barbecue, hot, fish, oyster [sauce]; chocolate [cocoa-based]; soda [leavener]; Benedict, scrambled, fried; dan dan;
//      mac) merge into their full term, which takes the link shown as the stub's text.
//   3. Two roots of one sense merge (bbq sauce, bean thread, mie goreng, goji, collards, fava beans, bubblegum, General Tso chicken, fries,
//      gyro [kebab], navel, chicken thigh); the weaker becomes an alias of the stronger (or is deleted when its text repeats it).
//      Orphans v433 left for this pass that belong here are linked (chicken breast, onion powder, bacon bits, pot roast [cook]).
//      (candy bar / chocolate bar stays: batch 413 kept them apart.)
//   4. Belonging: words that are not members leave (guinea pig in Andean crops, bunny in game meats, omelet in dairy ...); stubs left in no
//      theme are deleted.
//   5. Root regions (contract-root-region): a US root with a UK alias loses its redundant US tag; wrong tags go (yuzu AU, Birds Eye UK+US).
//   6. Case and flags: Lancashire hotpot, Kendal mint cake, Pontefract cake, Hainanese chicken, Tex-Mex, Nanaimo bar, General Tso's chicken
//      capitalised (a phrase with a proper word, LIBRARY-RULES 5); pisco sour, brandy butter and Caesar [cocktail] lose adult (alcohol is
//      sensitive only, Simon v418/v419).
//   7. Themes: Asian dishes merges into Asian food (a 14-of-15 twin), ways to cook eggs into egg dishes (8 of 10), pasta meals into Italian
//      food (all 13 there); jam flavours -> "jam flavors" (US spelling); winemaking
//      terms -> "winemaking" (a sub-topic of wine world, not talk about it); savory pies pop 5 -> 3.
//   8. Clash: the kebab clash group (clash-big, 14) is cut: gyro [kebab] merges into gyro [food]; shashlik and brochette leave the kebab
//      synonym group in foods on a stick (different dishes, not the same answer).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch434.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, unlinkEntry, linkIds, deleteEntry, setKin, moveKin, addEntry, deleteTheme, placeTheme, descendants, themeDifficulty, difficultyBand } from '../../js/model.js';
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
// The group's themes and their spread (LIBRARY-RULES 3.7 and 6): usable roots (not adult, not offensive), band = the game's word band.
const GROUP = 'food_drink';
const groupIds = () => new Set([GROUP, ...descendants(P, GROUP).map(t => t.id)]);
const profile = tid => {
  const t = ix.theme.get(tid); if (!t) return 'no theme';
  const ws = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && !e.adult && !e.offensive);
  const b = ws.map(e => difficultyBand(P, e, tid)).sort((x, y) => x - y), td = themeDifficulty(t);
  return `${ws.length} words, easy/middle/hard ${b.filter(x => x <= 2).length}/${b.filter(x => x === 3).length}/${b.filter(x => x >= 4).length}, difficulty ${td}, 4th-easiest band ${b[3] ?? '-'}`;
};
const prof0 = new Map([...groupIds()].filter(id => !T(id).group).map(id => [id, profile(id)]));
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;
const A = [], deleted = [], added = [], touchedThemes = new Set();
const say = (tid, line) => { touchedThemes.add(tid || ''); A.push([tid || '', line]); };
const chk = (id, text) => { const e = E(id); if (e.text !== text) throw Error(`${id} is "${e.text}", not "${text}"`); return e; };
const groupsWith = id => P.themes.filter(t => (t.groups || []).some(g => g.includes(id)));
// The root linked to theme tid with this text (and gloss, when given): the lists below name words as the theme shows them.
const inT = (tid, text, gloss) => {
  const hit = (ix.byTheme.get(tid) || []).filter(e => !e.aliasOf && e.typ[tid] !== undefined && e.text === text && (gloss === undefined || e.gloss === gloss));
  if (hit.length > 1) throw Error(`${tid}: "${text}" twice`);
  return hit[0] || null;
};
const leakOf = (tid, e, show) => nameLeak(T(tid), { ...e, text: show || e.text, nameOkIn: [] });
// An alias of a root linked to a theme is checked for the theme name too (validate, theme-name): one whose own text has a word of the name gets
// the name allowance, as the library's other aliases do (string beans in beans and pulses).
const aliasLeaks = (root, tids = linkIds(P, root)) => {
  for (const a of P.entries.filter(a => a.aliasOf === root.id)) for (const tid of tids) {
    if ((a.nameOkIn || []).includes(tid) || !ix.theme.has(tid)) continue;
    const w = nameLeak(T(tid), { ...a, nameOkIn: [] });
    if (w) { a.nameOkIn = [...(a.nameOkIn || []), tid]; n++; say(tid, `  alias ${lab(a)} of ${lab(root)}: nameOkIn ${tid} ("${w}" of the theme name is part of the alias)`); }
  }
};
const linkE = (e, tid, typ, why, show) => {
  T(tid);
  if (e.aliasOf) throw Error(`${lab(e)} is an alias: link its root`);
  if (e.typ[tid] !== undefined) return false;
  e.typ[tid] = typ; n++;
  if (show && show !== e.text) e.show = { ...(e.show || {}), [tid]: show };
  const leak = leakOf(tid, e, show);
  if (leak) e.nameOkIn = [...new Set([...(e.nameOkIn || []), tid])];
  reindex(P);
  aliasLeaks(e, [tid]);
  say(tid, `linked: ${lab(e)} (typicality ${typ}${show ? `, shown "${show}"` : ''}${leak ? `; nameOkIn: "${leak}" of the theme name is part of the full term` : ''}): ${why}`);
  return true;
};
const alone = new Set();
const unlinkE = (e, tid, why) => {
  T(tid);
  if (e.typ[tid] === undefined) return false;
  unlinkEntry(P, e, tid); n++; reindex(P);
  const left = linkIds(P, e);
  if (!left.length) alone.add(e.id);
  say(tid, `out: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why} (${left.length ? 'stays in ' + left.join(', ') : 'now in no theme'})`);
  return true;
};
const out = (tid, list, why) => { for (const [text, gloss] of list) { const e = inT(tid, text, gloss); if (e) unlinkE(e, tid, why); } };
const delE = (id, text, why) => {
  const e = ix.entry.get(id); if (!e) return false;
  chk(id, text); if (P.entries.some(a => a.aliasOf === id)) throw Error(`${lab(e)} has aliases`);
  if (linkIds(P, e).length) throw Error(`${lab(e)} is still linked: ${linkIds(P, e).join(', ')}`);
  if (groupsWith(id).length) throw Error(`${lab(e)} is in a group`);
  deleteEntry(P, e); reindex(P); n++; deleted.push(lab(e)); alone.delete(id);
  say('', `deleted entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''}: ${why}`);
  return true;
};
const setE = (e, field, value, why, tid = '') => {
  if (JSON.stringify(e[field]) === JSON.stringify(value)) return false;
  say(tid, `${lab(e)}: ${field} ${JSON.stringify(e[field])} -> ${JSON.stringify(value)}: ${why}`); e[field] = value; n++; reindex(P); return true;
};
const setT = (tid, field, value, why) => {
  const t = T(tid); if (JSON.stringify(t[field]) === JSON.stringify(value)) return false;
  say(tid, `theme ${tid}: ${field} ${JSON.stringify(t[field])} -> ${JSON.stringify(value)}: ${why}`); t[field] = value; n++; return true;
};
// A theme's link moves from a wrong-sense entry to the right one (same typicality unless given; group places follow).
const swap = (tid, fromE, toE, why, { typ, show } = {}) => {
  if (!fromE || fromE.typ[tid] === undefined) return;
  const t = typ ?? fromE.typ[tid];
  const gs = (T(tid).groups || []).filter(g => g.includes(fromE.id));
  if (toE.typ[tid] === undefined) linkE(toE, tid, t, why, show);
  else if (t < toE.typ[tid]) { say(tid, `typicality: ${lab(toE)} ${toE.typ[tid]} -> ${t}: the better of the two`); toE.typ[tid] = t; n++; }
  for (const g of gs) if (!g.includes(toE.id)) { g.push(toE.id); say(tid, `  group: ${lab(toE)} takes the place of ${lab(fromE)}`); }
  unlinkE(fromE, tid, `${lab(toE)}${toE.gloss ? ' [' + toE.gloss + ']' : ''} takes the link`);
};
// A new root (rerun: found by text and gloss).
const newE = (text, fields, why) => {
  let e = (ix.byText.get(text.toLowerCase()) || []).find(x => !x.aliasOf && x.text === text && (x.gloss || '') === (fields.gloss || ''));
  if (e) return e;
  e = addEntry(P, text, { pos: 'noun', type: 'common', status: 'rev', ...fields }); reindex(P); n++; added.push(lab(e));
  say('', `new entry: ${lab(e)}${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.pos}, ${e.type}, familiarity ${e.fam}: ${why}`);
  return e;
};
// Merge root `gone` into root `keep` (one sense): links move (the better typicality where both are linked; `shows` sets the shown text per
// theme, else the gone root's own show, else its text when it differs from keep's), group places, kin and aliases move. Then the gone root is
// deleted (alias: null) or becomes an alias of keep in place (alias: { kind, fam }).
const mergeInto = (keepId, keepText, goneId, goneText, why, { alias = null, shows = {}, tid: sayTid = '', noKin = false } = {}) => {
  const keep = chk(keepId, keepText), gone = ix.entry.get(goneId);
  if (!gone || gone.aliasOf) return false;
  chk(goneId, goneText);
  const moved = [], rated = [];
  for (const a of P.entries.filter(a => a.aliasOf === goneId)) {
    const dup = P.entries.find(b => b.aliasOf === keepId && b.text === a.text);
    if (dup || a.text === keep.text) { for (const x of P.entries) if (x.use) for (const [t, id] of Object.entries(x.use)) if (id === a.id) delete x.use[t]; P.entries = P.entries.filter(x => x !== a); n++; say(sayTid, `  deleted alias ${lab(a)} of ${lab(gone)}: ${lab(keep)} has it already`); continue; }
    a.aliasOf = keepId; n++; say(sayTid, `  alias ${lab(a)} (${a.aliasKind}) moves to ${lab(keep)}`);
  }
  reindex(P);
  for (const [tid, typ] of Object.entries(gone.typ)) {
    const t = T(tid); touchedThemes.add(tid);
    if (keep.typ[tid] === undefined) {
      keep.typ[tid] = typ;
      const sh = tid in shows ? shows[tid] : gone.show?.[tid] ?? (!alias && gone.text !== keep.text ? gone.text : null);
      if (sh && sh !== keep.text) keep.show = { ...(keep.show || {}), [tid]: sh };
      if (gone.use?.[tid] && !keep.use?.[tid]) keep.use = { ...(keep.use || {}), [tid]: gone.use[tid] };
      if (leakOf(tid, keep, keep.show?.[tid])) keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), tid])];
      moved.push(`${tid}:${typ}${keep.show?.[tid] ? ' shown "' + keep.show[tid] + '"' : ''}${(keep.nameOkIn || []).includes(tid) ? ' nameOkIn' : ''}`);
    } else if (typ < keep.typ[tid]) { rated.push(`${tid} ${keep.typ[tid]} -> ${typ}`); keep.typ[tid] = typ; }
    const gs = (t.groups || []).map(g => g.includes(goneId) ? [...new Set(g.map(id => id === goneId ? keepId : id))] : g);
    const hit = gs.filter(g => g.includes(keepId));
    t.groups = [...gs.filter(g => !hit.includes(g)), ...(hit.length ? [[...new Set(hit.flat())]] : [])].filter(g => g.length > 1);
  }
  n++;
  if (noKin && (gone.kin || []).length) { say(sayTid, `  kin of ${lab(gone)} is not moved: ${keep.text} is not of the family of ${gone.kin.map(id => E(id).text).join(', ')} (moving it would join a clash group of 13, clash-big)`); for (const k of [...gone.kin]) setKin(P, gone, E(k), false); }
  if ((gone.kin || []).length) { say(sayTid, `  kin of ${lab(gone)} moves to ${lab(keep)}: ${gone.kin.map(id => lab(E(id))).join(', ')}`); moveKin(P, gone, keep); }
  for (const tid of Object.keys(gone.typ)) delete gone.typ[tid];
  gone.show = {}; gone.use = {}; gone.nameOkIn = [];
  reindex(P);
  if (!alias) { deleteEntry(P, gone); reindex(P); deleted.push(lab(gone)); }
  else {
    gone.aliasOf = keepId; gone.aliasKind = alias.kind; gone.fam = alias.fam; gone.kin = [];
    if (alias.kind === 'spelling' || alias.kind === 'form') for (const f of ['adult', 'sensitive', 'offensive', 'tm']) gone[f] = !!keep[f];
    if (alias.region) gone.region = alias.region; else if (alias.kind !== 'regional') gone.region = [];
    if (alias.type) gone.type = alias.type;
    reindex(P);
  }
  aliasLeaks(keep);
  say(sayTid, `${lab(gone)}${gone.gloss ? ' [' + gone.gloss + ']' : ''} into ${lab(keep)}${moved.length ? '; links move: ' + moved.join(', ') : ''}${rated.length ? '; better typicality kept: ' + rated.join(', ') : ''}${alias ? `; ${goneText} becomes its ${alias.kind} alias (familiarity ${alias.fam})` : '; deleted'}: ${why}`);
  return true;
};
// Merge theme `from` into `into` (LIBRARY-RULES 2, deleting a theme): the words `into` lacks move at their typicality and shown text, shared
// words keep the better typicality, sub-themes move up (deleteTheme), then `from` is deleted. MOVE lists the ids expected to move.
const mergeTheme = (from, into, MOVE, why) => {
  if (!ix.theme.has(from)) return;
  const f = T(from), it = T(into);
  if (f.note && it.note === undefined) throw Error(`${from} has a note`);
  if (P.themes.some(t => /^(?:starts|ends|hidden):@/.test(t.rule || '') && t.rule.endsWith('@' + from))) throw Error(`a rule names ${from}`);
  const ws = (ix.byTheme.get(from) || []).filter(e => !e.aliasOf && e.typ[from] !== undefined);
  const lack = ws.filter(e => e.typ[into] === undefined), shared = ws.filter(e => e.typ[into] !== undefined);
  const unknown = lack.filter(e => !MOVE.includes(e.id)), gone = MOVE.filter(id => !lack.some(e => e.id === id));
  if (unknown.length || gone.length) throw Error(`${from}: words this batch does not decide: ${unknown.map(lab).join(', ')}; expected but not there: ${gone.join(', ')}`);
  say(into, `theme ${from} "${f.name}" merges into ${into} "${it.name}": ${ws.length} words, ${shared.length} already there, ${lack.length} move: ${why}`);
  for (const e of lack) linkE(e, into, e.typ[from], `from ${f.name}, at the same typicality`, e.show?.[from]);
  for (const e of shared) if (e.typ[from] < e.typ[into]) { say(into, `typicality: ${lab(e)} ${e.typ[into]} -> ${e.typ[from]}: its typicality in ${f.name}, the better of the two`); e.typ[into] = e.typ[from]; n++; }
  const kids = P.themes.filter(t => t.parent === from).map(t => t.id);
  deleteTheme(P, from); reindex(P); n++;
  say(into, `deleted theme: ${from} "${f.name}"${kids.length ? `; its sub-themes move up: ${kids.join(', ')}` : ''}`);
};
const removeGroup = (tid, ids, why) => {
  const t = T(tid); const g = (t.groups || []).find(g => ids.every(id => g.includes(id)));
  if (!g) return false;
  t.groups = t.groups.filter(x => x !== g); n++;
  say(tid, `group removed: ${g.map(id => lab(E(id))).join(' = ')}: ${why}`); return true;
};
const dropFromGroup = (tid, groupMember, ids, why) => {
  const t = T(tid); const g = (t.groups || []).find(g => g.includes(groupMember));
  if (!g || !ids.some(id => g.includes(id))) return false;
  const ng = g.filter(id => !ids.includes(id));
  t.groups = t.groups.map(x => x === g ? ng : x).filter(x => x.length > 1); n++;
  say(tid, `group: ${ids.map(id => lab(E(id))).join(', ')} leave ${g.map(id => lab(E(id))).join(' = ')}: ${why}`); return true;
};

// =================== 1. senses ===================
const S = (tid, fromId, fromText, toId, toText, why, opt) => { const f = ix.entry.get(fromId); if (f && f.typ[tid] !== undefined) { chk(fromId, fromText); swap(tid, f, chk(toId, toText), why, opt); } };
S('ice_cream_flavors', 17353, 'pistachio', 20206, 'pistachio', 'the flavor, not the nut (sense-link, sense-twin; ice cream parlor links the flavor)');
S('cooking_methods', 16570, 'steam', 929, 'steam', 'the cooking method, not water vapor (sense-link)');
S('ways_to_cut_food', 927, 'dice', 44583, 'dice', 'to cut into cubes, not the gaming cubes (cooking links dice [chop])');
S('salad_ingredients', 722, 'pepper', 409, 'bell pepper', 'a salad takes the vegetable, not the ground spice');
S('oceanian_food', 10732, 'damper', 48557, 'damper', 'the bush bread (Australian food links it), not the damper of a piano');
S('edible_seeds', 754, 'cilantro', 17393, 'coriander seed', 'the seed is coriander seed (spices); cilantro is the leaf', { show: 'coriander' });
{ const e = E(50042); if (e.text.toLowerCase() !== 'lamb chop') throw Error('50042 is ' + e.text);
  if (e.text !== 'lamb chop') { say('cuts_of_meat', `text: Lamb Chop 50042 -> "lamb chop": the meat cut is a common noun; the capital, the US tag and tm belonged to the puppet Lamb Chop`); e.text = 'lamb chop'; n++; reindex(P); }
  setE(e, 'region', [], 'a cut of meat known everywhere (the US tag was the puppet\'s)', 'cuts_of_meat');
  setE(e, 'tm', false, 'not a trademark (the puppet\'s flag)', 'cuts_of_meat');
  setE(e, 'fam', 2, 'nearly every adult knows a lamb chop (3 was the puppet\'s rating; reviewer)', 'cuts_of_meat'); }
// brown bread: breads linked the rhyming-slang entry ("brown bread" = dead)
{ const slang = chk(18059, 'brown bread');
  if (slang.typ.breads !== undefined) { const b = newE('brown bread', { gloss: 'bread', fam: 2 }, 'the bread; the old entry is the cockney rhyming slang for dead');
    swap('breads', slang, b, 'the bread sense', { show: 'brown' }); }
 }
// coffee words: the bean is the coffee bean (the entry's gloss said legume; it is in no other theme)
setE(chk(28259, 'bean'), 'gloss', 'coffee', 'its one theme is coffee words: the coffee bean, not a legume', 'coffee_words');
// sandwiches: the egg sandwich (a form alias of egg with a longer name, alias-fullname) becomes its own root
{ const es = chk(19011, 'egg sandwich'), egg = chk(518, 'egg');
  if (es.aliasOf) { es.aliasOf = 0; es.aliasKind = ''; es.nameOkIn = []; es.status = 'rev'; n++; reindex(P); say('sandwiches', `egg sandwich 19011: a form alias of egg 518 becomes its own root (alias-fullname: a longer name, not a form)`); }
  swap('sandwiches', egg, es, 'the sandwich, shown "egg"', { show: 'egg' }); }

// =================== 2. bare modifiers: the full term shown short ===================
// juices: the fruit entries stood for their juice (3.6: the grain, not the milk)
const JUICE = [['apple', 'fruit', 1], ['orange', 'fruit', 1], ['cranberry', 'red berry', 2], ['grapefruit', 'citrus fruit', 2], ['pineapple', undefined, 1],
  ['carrot', 'vegetable', 2], ['cherry', 'fruit', 3], ['lime', 'fruit', 2], ['mango', 'tropical fruit', 2], ['pomegranate', undefined, 2], ['prune', 'dried plum', 2],
  ['tomato', 'fruit', 2], ['celery', undefined, 3], ['guava', undefined, 3], ['passion fruit', undefined, 3], ['watermelon', undefined, 3]];
for (const [text, gloss, fam] of JUICE) { const f = inT('juices', text, gloss); if (!f) continue;
  const j = newE(text + ' juice', { fam }, `the juice (juices linked the ${text} itself)`); swap('juices', f, j, 'the juice, shown short', { show: text }); }
out('juices', [['açaí'], ['lychee'], ['noni']], 'the fruit, not a juice people order (typicality 5; no juice entry is worth adding)');
// soups
for (const [text, gloss, soup, fam] of [['tomato', 'fruit', 'tomato soup', 1], ['lentil', undefined, 'lentil soup', 2], ['potato', 'vegetable', 'potato soup', 2],
  ['pumpkin', 'vegetable', 'pumpkin soup', 2], ['split pea', undefined, 'split pea soup', 2], ['wonton', undefined, 'wonton soup', 3]]) {
  const f = inT('soups', text, gloss); if (!f) continue;
  swap('soups', f, newE(soup, { fam }, `the soup (soups linked the ${text} itself)`), 'the soup, shown short', { show: text }); }
out('stews', [['oxtail']], 'the cut of meat (in meat and seafood), not a stew');
// oils and vinegars: the plants, nuts and seeds stood for their oils
for (const [text, gloss, full, fam] of [['sunflower', undefined, 'sunflower oil', 1], ['peanut', 'legume nut', 'peanut oil', 2], ['avocado', undefined, 'avocado oil', 2],
  ['corn', 'vegetable', 'corn oil', 2], ['walnut', 'nut', 'walnut oil', 3], ['red wine', undefined, 'red wine vinegar', 2], ['safflower', undefined, 'safflower oil', 4]]) {
  const f = inT('oils_and_vinegars', text, gloss); if (!f) continue;
  swap('oils_and_vinegars', f, newE(full, { fam }, `the ${full.endsWith('vinegar') ? 'vinegar' : 'oil'} (oils and vinegars linked the ${text} itself)`), 'the full term, shown short', { show: text }); }
// stubs made for this theme only: they become the full term (id kept), shown short
for (const [id, text, full, fam] of [[62962, 'malt', 'malt vinegar', 2], [62961, 'grapeseed', 'grapeseed oil', 3], [62963, 'rice bran', 'rice bran oil', 4]]) {
  const e = E(id); if (e.text === full) continue; chk(id, text);
  if (linkIds(P, e).join() !== 'oils_and_vinegars') throw Error(`${lab(e)} is in other themes`);
  say('oils_and_vinegars', `text: ${lab(e)} -> "${full}" (familiarity ${e.fam} -> ${fam}), shown "${text}": a stub made for this theme; the member is the ${full.split(' ').pop()}`);
  for (const k of [...(e.kin || [])]) { const x = ix.entry.get(k); if (x) { setKin(P, e, x, false); say('oils_and_vinegars', `  kin ${lab(e)} <-> ${lab(x)} removed: the ${full.split(' ').pop()} is not of the family of ${x.text}`); } }
  e.text = full; e.fam = fam; e.show = { ...(e.show || {}), oils_and_vinegars: text }; n++; reindex(P);
}
out('oils_and_vinegars', [['sesame seed'], ['maize'], ['soybean'], ['flaxseed'], ['hazelnut', 'nut'], ['hemp', 'plant'], ['mustard'], ['pepitas'], ['perilla'], ['pumpkin seed'], ['canola']],
  'a plant, seed or condiment, not an oil or vinegar (the oil is there where it is a common one: sesame oil, linseed oil, canola oil)');
out('oils_and_vinegars', [['extra virgin']], 'a grade of olive oil beside olive oil (a word and a more specific form of it, LIBRARY-RULES 5 Overlap)');
// teas
{ const nt = inT('teas', 'nettle'); if (nt) { const t = newE('nettle tea', { fam: 3 }, 'the tea (teas linked the plant)'); swap('teas', nt, t, 'the tea, shown short', { show: 'nettle' }); }
  out('teas', [['stinging nettle']], 'the plant; nettle tea is the member');
  for (const [text, full, fam] of [['rosehip', 'rosehip tea', 3], ['fennel', 'fennel tea', 4]]) { const f = inT('teas', text); if (f) swap('teas', f, newE(full, { fam }, 'the tea (teas linked the plant)'), 'the tea, shown short', { show: text }); } }
// pies and tarts, savory pies
S('savory_pies', 16670, 'meat', 19172, 'meat pie', 'the pie, not meat itself', { show: 'meat' });
S('savory_pies', 460, 'pork', 19177, 'pork pie', 'the pie, not pork itself', { show: 'pork' });
S('pies_and_tarts', 17163, 'key lime', 18174, 'key lime pie', 'the pie, not the fruit', { show: 'key lime' });
{ const f = inT('pies_and_tarts', 'shoofly'); if (f) swap('pies_and_tarts', f, newE('shoofly pie', { fam: 4 }, 'the Pennsylvania Dutch molasses pie (pies and tarts linked shoofly of ___fly)'), 'the pie, shown short', { show: 'shoofly' }); }
const STUB = 'a stub made for this theme (3.6: the full term shown short)';
mergeInto(18168, 'apple pie', 63456, 'apple', STUB, { tid: 'pies_and_tarts' });
mergeInto(18171, 'pecan pie', 63459, 'pecan', STUB, { tid: 'pies_and_tarts' });
mergeInto(18170, 'pumpkin pie', 63460, 'pumpkin', STUB, { tid: 'pies_and_tarts' });
mergeInto(18187, 'sweet potato pie', 63462, 'sweet potato', STUB, { tid: 'pies_and_tarts' });
mergeInto(18184, 'chess pie', 65019, 'chess', STUB, { tid: 'pies_and_tarts' });
mergeInto(17863, 'stargazy pie', 62883, 'stargazy', STUB, { tid: 'pies_and_tarts' });
mergeInto(17841, 'fish pie', 65148, 'fish', STUB, { tid: 'savory_pies', noKin: true });
mergeInto(19193, 'Scotch pie', 65150, 'Scotch', STUB, { tid: 'savory_pies' });
// cheeses
mergeInto(529, 'cottage cheese', 64999, 'cottage', STUB, { tid: 'cheeses' });
mergeInto(530, 'cream cheese', 65000, 'cream', STUB, { tid: 'cheeses' });
mergeInto(17929, 'blue cheese', 63423, 'blue', STUB, { tid: 'cheeses' });
mergeInto(17942, 'American cheese', 63422, 'American', STUB, { tid: 'cheeses' });
mergeInto(17920, 'Swiss cheese', 17956, 'Swiss', STUB, { tid: 'cheeses' });
mergeInto(815, 'mac and cheese', 63448, 'mac', 'the same dish (cheese dishes takes mac and cheese, like grilled cheese and cheese fries); mac is the short name, typed phrase (contract-type-common): now a common abbreviation', { tid: 'cheese_dishes', alias: { kind: 'abbreviation', fam: 2, type: 'common' }, shows: { cheese_dishes: null } });
// sauces
mergeInto(729, 'barbecue sauce', 65074, 'barbecue', STUB, { tid: 'sauces_and_condiments' });
mergeInto(728, 'hot sauce', 65076, 'hot', STUB, { tid: 'sauces_and_condiments' });
mergeInto(768, 'fish sauce', 65075, 'fish', STUB, { tid: 'asian_sauces', noKin: true });
mergeInto(18793, 'oyster sauce', 65090, 'oyster', STUB, { tid: 'asian_sauces' });
mergeInto(729, 'barbecue sauce', 17890, 'bbq sauce', 'one sauce, two roots in burger toppings (both linked)', { tid: 'burger_toppings', alias: { kind: 'abbreviation', fam: 1 }, shows: { barbecue_foods: null, burger_toppings: null } });
// drinks, pantry, eggs, noodles
mergeInto(227, 'hot chocolate', 65163, 'chocolate', STUB, { tid: 'hot_drinks' });
mergeInto(585, 'baking soda', 64823, 'soda', 'a stub of baking soda, both in the pantry in one group', { tid: 'in_the_pantry' });
mergeInto(17985, 'eggs Benedict', 62545, 'Benedict', STUB, { tid: 'egg_dishes' });
mergeInto(17981, 'scrambled eggs', 63445, 'scrambled', STUB, { tid: 'egg_dishes' });
{ const dv = ix.entry.get(63441); if (dv && !dv.aliasOf) { const al = ix.entry.get(66182); if (al && al.aliasOf === 63441) { al.aliasKind = 'synonym'; n++; say('egg_dishes', 'devilled 66182: spelling -> synonym (UK kept): it moves to deviled eggs, which has its UK spelling devilled eggs already (one UK display alias per dialect)'); } }
  mergeInto(17986, 'deviled eggs', 63441, 'deviled', STUB + ' (reviewer)', { tid: 'egg_dishes' }); }
mergeInto(17982, 'fried egg', 63443, 'fried', STUB + '; egg dishes has fried egg already', { tid: 'egg_dishes' });
mergeInto(18548, 'dan dan noodles', 62890, 'dan dan', STUB, { tid: 'noodle_dishes' });
mergeInto(17161, 'navel orange', 50241, 'navel', 'a stub of navel orange, both in citrus fruits in one group', { tid: 'citrus_fruits' });

// =================== 3. two roots of one sense ===================
mergeInto(63505, 'bean threads', 18562, 'bean thread', 'one noodle, both in noodles in one group', { tid: 'noodles', alias: { kind: 'form', fam: 4 } });
mergeInto(18555, 'mee goreng', 53187, 'mie goreng', 'one dish (Malay and Indonesian spellings)', { tid: 'noodle_dishes', alias: { kind: 'spelling', fam: 4 } });
mergeInto(15570, 'goji berry', 28140, 'goji', 'one berry', { tid: 'berries', alias: { kind: 'synonym', fam: 2 }, shows: { berries: 'goji', dried_fruits: null } });
mergeInto(17457, 'collard greens', 62531, 'collards', 'one vegetable', { tid: 'leafy_greens', alias: { kind: 'synonym', fam: 3 }, shows: { leafy_greens: 'collards', green_vegetables: 'collards' } });
mergeInto(17558, 'fava', 67295, 'fava beans', 'one bean (fava [bean] in beans and pulses)', { tid: 'green_vegetables', alias: { kind: 'synonym', fam: 3 }, shows: { green_vegetables: null } });
mergeInto(39076, 'bubble gum', 18288, 'bubblegum', 'one candy, both in pink things; M-W writes bubble gum', { tid: 'candy', alias: { kind: 'spelling', fam: 1 }, shows: { ice_cream_flavors: null, candy: null, pink_things: null } });
{ const g = E(53524);
  if (g.text === 'general tso\'s chicken') { say('chinese_food', `text: general tso's chicken 53524 -> "General Tso's chicken", type proper: named after General Tso (LIBRARY-RULES 5: a phrase with a proper word keeps the capital; M-W capitalises it)`); g.text = 'General Tso\'s chicken'; g.type = 'proper'; n++; reindex(P); }
  mergeInto(53524, 'General Tso\'s chicken', 20272, 'General Tso chicken', 'one dish', { tid: 'chinese_food', alias: { kind: 'spelling', fam: 3 }, shows: { foods_named_after_people: null } }); }
mergeInto(19050, 'French fries', 59629, 'fries', 'one food; fries is the everyday short name', { tid: 'street_food', alias: { kind: 'synonym', fam: 1 }, shows: { street_food: null } });
mergeInto(19019, 'gyro', 53385, 'gyro', 'one dish (the clash group of kebab had 14 words, clash-big)', { tid: 'kebab_types' });
dropFromGroup('foods_on_a_stick', 813, [20252, 20253], 'shashlik and brochette are other dishes, not another name for a kebab (the group joined them into the kebab clash group of 14, clash-big)');

// =================== 4. belonging ===================
out('andean_crops', [['guinea pig'], ['cavy']], 'an animal, not a crop');
out('andean_crops', [['tuber']], 'a plant part, not a crop');
out('andean_crops', [['chicha']], 'a maize drink (in South American drinks), not a crop');
out('poultry', [['wishbone', 'bird']], 'a bone of a bird, not poultry');
out('game_meats', [['bunny']], 'a pet word for a rabbit (rabbit is there)');
out('dairy_and_eggs', [['omelet']], 'an egg dish (in egg dishes), not dairy');
out('dairy_and_eggs', [['margarine']], 'a vegetable-oil spread (in spreads), not dairy');
out('dairy_and_eggs', [['custard powder']], 'a starch powder, not dairy');
{ const cp = chk(549, 'custard powder'); if (!linkIds(P, cp).length) linkE(cp, 'baking_ingredients', 4, 'a baking powder for custard (it was only in dairy)'); }
out('salad_dressings', [['Vidalia onion']], 'the onion, not a dressing');
out('jam_flavours', [['marmalade']], 'a preserve, not a flavor (it is in spreads and pickles and preserves)');
out('chip_flavors', [['chicken', 'bird']], 'the bird; the flavor is roast chicken (there, in one group)');
out('south_american_food', [['java', 'coffee']], 'US slang for coffee, not South American food (coffee is there)');
out('ways_to_preserve_food', [['kipper', 'fish']], 'the smoked fish, not a way to preserve');
out('chinese_food', [["Lion's Head"]], 'the Cape Town mountain (a place), not the Chinese meatball dish');
out('cabbage_family', [['rocket', 'salad']], 'a second root of arugula (rocket is its UK alias; arugula is there)');
out('cabbage_family', [['cruciferous']], 'an adjective, not a vegetable');
out('vegetables', [['green', 'scallion']], 'a stub; scallion is there');
out('squashes', [['kombucha squash']], 'a mistaken name of kabocha (there), which shows "kombucha", a drink');
out('blue_cheeses', [['bleu', 'cheese']], 'French for blue, not a cheese');
// reviewer's additions
out('melons', [['karela'], ['bitter melon']], 'a bitter gourd, not a melon (reviewer)');
mergeInto(15586, 'bitter melon', 39175, 'karela', 'one vegetable: karela is its Hindi name (reviewer)', { tid: 'melons', alias: { kind: 'regional', fam: 5, region: ['IN'] } });
for (const [text, typ] of [['wax gourd', 5], ['chilacayote', 5]]) { const e = inT('melons', text); if (e) { unlinkE(e, 'melons', 'a gourd, not a melon (reviewer)'); linkE(e, 'squashes', typ, 'a gourd of the squash family (bottle gourd is there)'); } }
{ const m = E(63278); if (m.text === 'musk') { say('melons', 'text: musk 63278 [sweet-scented] -> "muskmelon" (gloss dropped), shown "musk": the melon; the stub had no full term (reviewer)'); m.text = 'muskmelon'; m.gloss = ''; m.fam = 3; m.show = { ...(m.show || {}), melons: 'musk' }; n++; reindex(P); } }
out('dumplings', [['dim sum']], 'a meal of small dishes, not a dumpling (reviewer)');
mergeInto(18664, 'shumai', 18648, 'siu mai', 'one dish, two spellings (reviewer); shumai is the M-W headword', { tid: 'dumplings', alias: { kind: 'spelling', fam: 4 } });
mergeInto(59497, 'hard sauce', 18455, 'brandy butter', 'one topping: brandy butter is the UK name of hard sauce (reviewer; v413 skipped them only because brandy butter was adult)', { tid: 'toppings', alias: { kind: 'regional', fam: 4, region: ['UK'] } });
setE(chk(815, 'mac and cheese'), 'type', 'common', 'a dish name, not an idiom (reviewer)', 'cheese_dishes');
setE(chk(927, 'dice'), 'pos', 'noun', 'the cubes (reviewer)', 'ways_to_cut_food');
{ const ls = (ix.byText.get('lentil soup') || [])[0]; if (ls && ls.typ.soups === 1) { say('soups', 'typicality: lentil soup ' + ls.id + ' 1 -> 2 (reviewer)'); ls.typ.soups = 2; n++; } }
for (const [id, text, why] of [[17521, 'kombucha squash', 'a mistaken name of kabocha, in no other theme'], [64789, 'green', 'a stub of scallion made for vegetables'],
  [17609, 'cruciferous', 'an adjective, in no other theme'], [17608, 'rocket', 'a second root of arugula (rocket 444 is its UK alias)'], [53112, 'bleu', 'a stub made for blue cheeses']]) {
  const e = ix.entry.get(id); if (e && !linkIds(P, e).length) delE(id, text, why); }
{ const t = T('blue_cheeses'); const g = (t.groups || []).find(g => g.some(id => E(id).text.startsWith('bleu d'))); if (g) removeGroup('blue_cheeses', g, 'bleu d\'Auvergne, bleu de Gex and bleu de Bresse are three cheeses, not one answer'); }
{ const t = T('sandwiches'); const g = (t.groups || []).find(g => g.some(id => E(id).text === 'finger sandwich') && g.some(id => E(id).text === 'fish finger sandwich')); if (g) removeGroup('sandwiches', g, 'a finger sandwich (a small tea sandwich) is not a fish finger sandwich'); }
mergeInto(17719, 'chicken thigh', 17881, 'chicken thighs', 'one food: the singular is the root and the plural its form, as with other foods (reviewer); barbecue foods keeps showing the plural through use', { tid: 'barbecue_foods', alias: { kind: 'form', fam: 2 }, shows: { barbecue_foods: null } });
{ const ct = E(17719); if (ct.typ.barbecue_foods !== undefined && ct.use?.barbecue_foods !== 17881) { ct.use = { ...(ct.use || {}), barbecue_foods: 17881 }; n++; say('barbecue_foods', 'chicken thigh 17719: barbecue foods shows the form chicken thighs 17881 (use)'); } }
// orphans that belong here (v433 left them for this pass)
for (const [id, text, tid, typ, why] of [[17718, 'chicken breast', 'cuts_of_meat', 2, 'the commonest cut of chicken'],   [17584, 'onion powder', 'in_the_pantry', 3, 'a pantry seasoning'], [17808, 'bacon bits', 'salad_ingredients', 3, 'a salad topping'], [19780, 'pot roast', 'cooking_methods', 4, 'to cook meat slowly in a covered pot (the dish is pot roast [dish])']]) {
  const e = chk(id, text); if (!linkIds(P, e).length) linkE(e, tid, typ, `in no theme (v433 left it for this pass): ${why}`); }

// =================== 5. root regions ===================
for (const [id, text] of [[443, 'arugula'], [445, 'rutabaga'], [534, 'heavy cream'], [754, 'cilantro'], [23370, 'trash bags'], [67141, 'superfine sugar'], [67174, 'oven fries'],
  [67181, 'canola oil'], [67194, 'stew meat'], [67197, 'jelly roll'], [67202, 'top round'], [67229, 'plain'], [3035, 'cooler']])
  setE(chk(id, text), 'region', [], 'the US word is the root and its UK word a regional alias: the root takes no tag (LIBRARY-RULES 5; the game never reads root regions, contract-root-region)');
setE(chk(84, 'yuzu'), 'region', [], 'a Japanese citrus, not an Australian word');
setE(chk(20331, 'Birds Eye'), 'region', [], 'known in the UK and the US: no tag');

// =================== 6. case and flags ===================
const CASE = [[53306, 'lancashire hotpot', 'Lancashire hotpot'], [59484, 'kendal mint cake', 'Kendal mint cake'], [59483, 'pontefract cake', 'Pontefract cake'],
  [53531, 'hainanese chicken', 'Hainanese chicken'], [19451, 'tex-mex', 'Tex-Mex'], [59416, 'tex-mex', 'Tex-Mex'], [19459, 'nanaimo bar', 'Nanaimo bar'], [53751, 'nanaimo bars', 'Nanaimo bars']];
for (const [id, from, to] of CASE) { const e = E(id); if (e.text === to) continue; chk(id, from);
  say('', `text: ${lab(e)} -> "${to}", type ${e.type} -> proper: named after a place (Lancashire, Kendal, Pontefract, Hainan, Texas, Nanaimo; LIBRARY-RULES 5: a phrase with a proper word keeps the capital, as M-W and Oxford print it)`);
  e.text = to; e.type = 'proper'; n++; reindex(P); }
setE(chk(38130, 'Waldorf'), 'type', 'proper', 'the salad named after the hotel: proper, not a place', 'salads');
for (const [id, text] of [[19415, 'pisco sour'], [18455, 'brandy butter'], [27554, 'Caesar']].filter(([id]) => ix.entry.get(id)))
  setE(chk(id, text), 'adult', false, 'alcohol is not adult, only sensitive (Simon, I31, v418/v419; LIBRARY-RULES 4)');

// =================== 7. themes ===================
mergeTheme('asian_dishes', 'asian_food', [822], 'a twin (14 of its 15 words are in Asian food; theme-twin)');
mergeTheme('pasta_meals', 'italian_food', [], 'all 13 words are in Italian food; a muddle of pasta shapes and sauces beside pasta shapes and pasta dishes');
mergeTheme('ways_to_cook_eggs', 'egg_dishes', [16759], 'a twin (8 of its 10 words are in egg dishes; theme-twin)');
setT('jam_flavours', 'name', 'jam flavors', 'US spelling (LIBRARY-RULES 6, Names); the id stays');
setT('winemaking_terms', 'name', 'winemaking', 'its words are the making of wine (steps and materials), a sub-topic of wine world, not talk about it (xwords-twin; LIBRARY-RULES 6)');
setT('savory_pies', 'pop', 3, 'shepherd\'s pie, pot pie, quiche, pasties: an ordinary theme, not niche (theme difficulty 4 -> 3)');

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (the library or export code changed since it was written: compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
const tLast = (() => { for (let i = Math.max(x0.themes.length, x1.themes.length) - 1; i >= 0; i--) if (x0.themes[i] !== x1.themes[i]) return i; return -1; })();
cmp.push(`Theme rows ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift: ${tShift < 0 ? 'none' : `from index ${tShift} ("${x1.themes[tShift]}", was "${x0.themes[tShift]}") to index ${tLast} ("${x1.themes[tLast]}", was "${x0.themes[tLast]}")`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const name = id => ix.entry.get(id) ? lab(E(id)) : String(id);
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entry rows ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${name(x1.ids[firstShift])}, was ${name(x0.ids[firstShift])})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${name(id)} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${id} (row ${ia.get(id)})`).join(', ') || 'none'}`);
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
{ const F = x1.themeFields, pi = F.indexOf('parent'), row = (x, r) => F.map((f, k) => k === pi ? (r[k] === null || r[k] === undefined || r[k] < 0 ? r[k] : x.themes[r[k]]) : r[k]);
  const thCh = x1.themeRows.map((r, i) => [r, i]).filter(([r]) => { const j = x0.themes.indexOf(r[0]); return j >= 0 && JSON.stringify(row(x0, x0.themeRows[j])) !== JSON.stringify(row(x1, r)); })
    .map(([r, i]) => { const j = x0.themes.indexOf(r[0]), a = row(x0, x0.themeRows[j]), b = row(x1, r); return `${r[0]} (index ${j} -> ${i}: ${F.filter((f, k) => JSON.stringify(a[k]) !== JSON.stringify(b[k])).map(f => { const k = F.indexOf(f); return `${f} ${JSON.stringify(a[k])} -> ${JSON.stringify(b[k])}`; }).join(', ')})`; });
  cmp.push(`Theme rows whose fields changed (parent compared by id): ${thCh.join('; ') || 'none'}`); }
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

// ---------- review text ----------
const G1 = groupIds();
const byTheme = new Map(); for (const [tid, line] of A) { if (!byTheme.has(tid)) byTheme.set(tid, []); byTheme.get(tid).push(line); }
const order = [...P.themes.map(t => t.id), ...[...byTheme.keys()].filter(k => k && !ix.theme.has(k))];
const sections = [];
for (const tid of order) { if (!byTheme.has(tid)) continue; const t = ix.theme.get(tid);
  sections.push(`${t ? t.name : tid} [${tid}]${t && !t.group ? `\n  spread before: ${prof0.get(tid) || '(new here)'}\n  spread after:  ${profile(tid)}` : ''}`, ...byTheme.get(tid).map(l => '  ' + l)); }
if (byTheme.has('')) sections.push('Entries (no one theme)', ...byTheme.get('').map(l => '  ' + l));
const nowAlone = [...alone].filter(id => ix.entry.get(id) && !E(id).aliasOf && !linkIds(P, E(id)).length).map(id => lab(E(id)));
const tail = fs.readFileSync(new URL('./batch434-sections.txt', import.meta.url), 'utf8');
const summary = [`Library batch v434: tidy-up step 3, Food & Drink (TIDY-UP.md). The group: ${prof0.size} themes with words before (and 5 folders), ${[...G1].filter(id => !T(id).group).length} after; every one read against the checklist.`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}; new entries ${added.length}: ${added.join(', ') || 'none'}`,
  `Entries deleted ${deleted.length}: ${deleted.join(', ') || 'none'}`,
  `Left in no theme by this batch (real words, kept): ${nowAlone.join(', ') || 'none'}`,
  '', 'Changes by theme (spreads before and after: usable words, easy/middle/hard bands, theme difficulty, 4th-easiest band):', ...sections, '',
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  ...cmp, '', tail];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText + fs.readFileSync(new URL('./batch434-notice.txt', import.meta.url), 'utf8'));
fs.writeFileSync(REVIEW || new URL('./batch434-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}

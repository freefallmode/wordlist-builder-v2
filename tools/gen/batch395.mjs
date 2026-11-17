// Library batch v395 (2026-11-18, Simon delegated T31 and I19 to the manager; decisions approved).
// Rule (DESIGN-entries.md, after the I18 paragraph): every link in a given-name theme sits on a given-name entry (gloss "name", type person);
//   another sense of the same word (a place, a goddess, a month, a virtue, an opera ...) is its own entry and keeps its own themes, and a name
//   entry holds no link of another sense.
// T31: Persephone, Leo, Norma, Ravi, Vladimir split (a new [name] entry takes the given-name link); Sophia's capital links go to a new Sofia [city];
//   Ben's scottish_landscape_words link goes to ben [mountain]; Dot's tiny_things link goes to a new dot [small spot].
// I19: months April, June, May, July, August split as T30; virtue names Honor, Mercy, Temperance, Valor, Humility, Honesty become the names and new
//   lowercase common entries take knightly_virtues (honour, valour as UK spelling aliases); places in names_that_are_places split (or, when only in
//   name themes, become the name entry). Same pattern found while checking (manager's item 4): 18 place entries in names_that_are_places
//   (Holland ... Kimberley), Carmen [opera] (as Norma), myrtle (a plant in old_fashioned_names).
// New [name] entries take the old entry's fam, so every moved link keeps its difficulty (as batch394), unless the receiving sense is a different
//   word to a player (dot, ben, Sofia, the virtues' commons keep the old fam, see batch395-changes.txt).
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch395.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint } from '../../js/caselint.js';
import { CASE_OK } from '../../js/caselint-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/caselint-allow.js', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const TH = id => { const t = P.themes.find(t => t.id === id); if (!t) throw Error(`no theme ${id}`); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const sameText = () => { const s = new Set(); for (const t of P.themes) { const seen = new Map(); for (const e of P.ix.byTheme.get(t.id) || []) { const k = ((!e.aliasOf && e.show?.[t.id]) || e.text).toLowerCase(); if (seen.has(k) && seen.get(k) !== e.id) s.add(`${t.id}: "${k}" (${seen.get(k)}, ${e.id})`); else seen.set(k, e.id); } } return s; };
const [before, mBefore] = count(), sameBefore = sameText();
const log = [], dropKeys = new Set();
let n = 0;
const TOUCHED = new Set();   // roots changed by this batch (their proper aliases follow a type change)
const lab = e => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}`;
const NAMES = new Set(); const walk = id => { for (const t of P.themes) if (t.parent === id && t.id !== 'surnames') { NAMES.add(t.id); walk(t.id); } };
walk('names'); NAMES.add('flowers_used_as_girls_names');

// move the link of theme tid from entry `from` to entry `to`, same typicality; a shown text that only changes case is dropped
function move(tid, from, to, why) {
  const a = E(from), b = E(to); TH(tid); TOUCHED.add(from);
  if (a.typ[tid] === undefined && b.typ[tid] !== undefined) return;
  if (a.typ[tid] === undefined) throw Error(`${from}: not in ${tid}`);
  if (b.typ[tid] !== undefined) throw Error(`${to}: already in ${tid}`);
  const grp = (TH(tid).groups || []).filter(g => g.includes(from));
  if (grp.length && !GROUP_OK.has(from + '|' + tid)) throw Error(`${from} is in a group of ${tid}: check by hand`);
  if (a.nameOkIn?.includes(tid)) throw Error(`${from} has nameOkIn ${tid}: check by hand`);
  for (const x of P.ix.aliases.get(from) || []) if (x.typ?.[tid] !== undefined) throw Error(`alias ${x.id} of ${from} has its own ${tid} link: check by hand`);
  const v = a.typ[tid], sh = a.show?.[tid];
  if (sh && sh.toLowerCase() !== b.text.toLowerCase()) throw Error(`${from} shows "${sh}" in ${tid}: check by hand`);
  delete a.typ[tid]; if (a.show) delete a.show[tid]; if (a.use) delete a.use[tid];
  b.typ[tid] = v; n++; dropKeys.add(from + '|' + tid);
  for (const g of grp) g.splice(g.indexOf(from), 1, to);
  log.push(`${tid}: ${lab(a)} (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}) -> ${lab(b)} (same typicality${sh ? ', the case-only shown text goes' : ''}${grp.length ? '; its place in the theme group ' + grp.map(g => '[' + g.join(',') + ']').join(' ') + ' goes with it (' + GROUP_OK.get(from + '|' + tid) + ')' : ''})  (${why})`);
}
// theme groups checked by hand: the moved link's place in the group goes to the receiving entry
const GROUP_OK = new Map([['29835|scottish_landscape_words', 'group with Ben Nevis 30980: one of the two per level, as "ben" is part of "Ben Nevis"; the same holds for ben [mountain]'],
  ['29922|knightly_virtues', 'synonym group with courage 54076, bravery 54077: the virtue valor'],
  ['29926|knightly_virtues', 'synonym group with truthfulness 54083: the virtue honesty']]);
function newEntry(text, over, why) {
  let e = P.entries.find(x => x.text === text && x.gloss === over.gloss && !x.aliasOf === !over.aliasOf);
  if (!e) { e = addEntry(P, text, { pos: 'noun', status: 'gen', region: [], ...over }); reindex(P); n++;
    log.push(`new entry ${lab(e)} fam ${e.fam}${e.aliasOf ? ', ' + e.aliasKind + ' alias of ' + e.aliasOf : ''}, region ${e.region.join(' ') || 'none'}, status gen  (${why})`); }
  return e;
}
const nameEntry = (text, fam, why) => newEntry(text, { gloss: 'name', type: 'person', fam }, why);
function set(id, key, val, why) {
  const e = E(id); TOUCHED.add(id); if (e[key] === val) return;
  log.push(`${lab(e)} ${key} ${e[key] || 'none'} -> ${val}  (${why})`); e[key] = val; n++;
}
// split: a new [name] entry (fam of the old entry) takes every given-name link of `id`; the old entry keeps its other themes
function split(id, sense, why) {
  const e = E(id), th = Object.keys(e.typ).filter(t => NAMES.has(t));
  if (sense.gloss) set(id, 'gloss', sense.gloss, sense.glossWhy || 'needs-gloss once the [name] entry exists');
  if (sense.type) set(id, 'type', sense.type, sense.typeWhy);
  const nm = nameEntry(sense.name || e.text, e.fam, `fam ${e.fam} as ${e.id}, so the moved links keep their difficulty`);
  for (const t of th) move(t, id, nm.id, why);
  if (Object.keys(E(id).typ).some(t => NAMES.has(t))) throw Error(`${id} still in a name theme`);
  return nm;
}
const sec = s => log.push('', s);

// ---------- T31 ----------
sec('T31.1: other sense holds a name link: split');
split(21833, { }, 'T31: the goddess keeps greek_gods; Persephone stays proper [goddess], as Hera, Athena, Demeter (37 of 40 in greek_gods are proper)');
split(25457, { }, 'T31: the sign keeps zodiac_signs; Leo stays proper [zodiac sign], as all 24 zodiac_signs members');
split(29782, { gloss: 'opera', type: 'title', typeWhy: 'an opera is a title (46 of 48 in famous_operas)' }, 'T31: Norma the opera keeps famous_operas');
split(56161, { gloss: 'river', type: 'place', typeWhy: 'a river is a place (31 of 32 in asian_rivers)' }, 'T31: the Ravi river keeps asian_rivers');
split(56262, { gloss: 'city', type: 'place', typeWhy: 'a city is a place (31 of 32 in russian_cities)' }, 'T31: the city keeps russian_cities');
sec('T31.2: Sophia in capital_cities and european_capitals (the city is Sofia; Sofia 29620 was a spelling alias of Sophia [name], so the export showed both in those themes)');
const sofia = newEntry('Sofia', { gloss: 'city', type: 'place', fam: 2 }, 'T31: the capital of Bulgaria; no Sofia place entry existed. fam 2 as Vienna, Prague (a capital most players know, less than Paris or Cairo); gloss "city" as Paris, London [city]');
move('capital_cities', 29619, sofia.id, 'T31: the city is Sofia');
move('european_capitals', 29619, sofia.id, 'T31: the city is Sofia');
set(29620, 'gloss', 'name', 'needs-gloss: the alias "Sofia" (of Sophia [name]) now shares its text with Sofia [city]');
set(29619, 'type', 'person', 'I18: Sophia keeps only name themes (girls_names, latin_american_names)');
sec('T31.3: Ben in scottish_landscape_words');
move('scottish_landscape_words', 29835, 27437, 'T31: ben, a Scottish mountain (as in Ben Nevis), is the common word; ben 27437 [mountain] exists (scottish_words). The link had no shown text, so the export showed "Ben" in the theme: case-only, now "ben"');
set(29835, 'type', 'person', 'I18: Ben [name] keeps only short_forms_of_names');
sec('T31.4: Dot in tiny_things');
const dot = newEntry('dot', { gloss: 'small spot', type: 'common', fam: 1 }, 'T31: the small mark; the only lowercase dot was dot [music] 11169 (notes_and_rests). fam 1 as ant, crumb in tiny_things');
move('tiny_things', 29843, dot.id, 'T31: a dot is a tiny thing; the name is not');
set(29843, 'type', 'person', 'I18: Dot [name] keeps only short_forms_of_names');

// ---------- I19 ----------
sec('I19.1: months in names_that_are_months: split as T30 (no May [name] existed: v391 put the link on May [month]; Mai [name] 29880 is another name)');
for (const id of [15, 16, 25269]) split(id, { gloss: 'month', glossWhy: 'needs-gloss once the [name] entry exists; as May, August [month]' }, 'I19: the month keeps its month themes');
for (const id of [25268, 25271]) split(id, { }, 'I19: the month keeps its month themes');
sec('I19.2: virtue names that also served knightly_virtues: the capitalised entry is the name, a lowercase common entry takes knightly_virtues');
const VIRT = [[29911, 'honor', 'honour'], [29914, 'mercy'], [29915, 'temperance'], [29922, 'valor', 'valour'], [29925, 'humility'], [29926, 'honesty']];
for (const [id, low, uk] of VIRT) {
  const e = E(id);
  const c = newEntry(low, { gloss: 'virtue', type: 'common', fam: e.fam }, `I19: the virtue; no lowercase "${low}" existed. fam ${e.fam} as ${e.text} ${id} (the rating was of the word), so the knightly_virtues link keeps its difficulty; gloss "virtue" (needs-gloss beside ${e.text} [name])`);
  move('knightly_virtues', id, c.id, `I19: the knightly virtue is the common word, as justice, faith, loyalty there. No shown text on the link, so the export showed "${e.text}": case-only, now "${low}"`);
  if (uk) newEntry(uk, { gloss: '', type: 'common', fam: e.fam, region: ['UK'], aliasOf: c.id, aliasKind: 'spelling', typ: {}, show: {}, use: {}, nameOkIn: [] }, `I19: UK spelling of ${low}, as colour, humour, armour (region UK, no links of its own)`);
  set(id, 'gloss', 'name', 'the rule: a given-name entry has gloss "name"; needs-gloss beside ' + low + ' [virtue]');
  set(id, 'type', 'person', 'I18: keeps only names_that_are_virtues');
}
sec('I19.3: places in names_that_are_places');
split(29724, { type: 'place', typeWhy: 'a county is a place (39 of 40 in english_counties)' }, 'I19: Devon [county] keeps english_counties; the name entry takes unisex_names and names_that_are_places');
split(29888, { type: 'place', typeWhy: 'a continent is a place (6 of 7 in continents)' }, 'I19: Asia [continent] keeps continents, continents_and_supercontinents');
split(29892, { type: 'place', typeWhy: 'a city is a place, as Denver, Augusta [city]' }, 'I19: Lincoln [city] keeps british_cities, us_state_capitals, places_named_after_people, us_cities');
split(29896, { gloss: 'city', type: 'place', typeWhy: 'a city is a place (31 of 32 in italian_cities)' }, 'I19: Siena keeps italian_cities');
split(29899, { type: 'place', typeWhy: 'a city is a place, as Denver, Augusta [city]' }, 'I19: Cheyenne [city] keeps us_state_capitals');
split(29900, { gloss: 'US state', glossWhy: 'needs-gloss once the [name] entry exists; as Virginia [US state]', type: 'place', typeWhy: 'a state is a place (49 of 50 in us_states)' }, 'I19: Montana keeps us_states');
split(29904, { gloss: 'town', type: 'place', typeWhy: 'a town is a place (29 of 31 in french_cities)' }, 'I19: Lourdes keeps pilgrimage_sites, holy_cities, french_cities');
move('places_named_after_people', 29905, 35987, 'I19: that link is the city (Alexandria in Egypt, named after Alexander); Alexandria [city] 35987 exists (african_cities, port_cities). Not a plain retype: the [name] entry held a place link');
set(29905, 'type', 'person', 'I19: Alexandria [name] keeps only names_that_are_places');
set(29882, 'gloss', 'name', 'I19: Brooklyn was only in names_that_are_places: the entry is the name (Brooklyn Beckham ...), not the borough');
set(29882, 'type', 'person', 'I19');
set(29897, 'gloss', 'name', 'I19: Carolina was only in names_that_are_places: the entry is the name, not the US state');
set(29897, 'type', 'person', 'I19');
sec('Same pattern found while checking (item 4): place entries holding given-name links');
const PLACES = [[2141, 'country'], [2153, 'country'], [2171, 'country'], [2176, 'country'], [2217], [2218], [2225, 'city'], [2232], [2236, 'city'], [2244, 'city'],
  [2270, 'city'], [6623, 'ancient city'], [20664], [35912], [35921], [35945], [36170], [36246]];
for (const [id, g] of PLACES) split(id, g ? { gloss: g } : {}, `item 4: ${E(id).text} keeps its place themes (as Lincoln, Devon above)`);
sec('Same pattern found while checking (item 4): Carmen (as Norma), myrtle (a plant holding a name link)');
split(52368, { gloss: 'opera' }, 'item 4: Carmen the opera keeps famous_operas and stays title (as Norma)');
split(29776, { name: 'Myrtle', gloss: 'plant', glossWhy: 'needs-gloss once Myrtle [name] exists; myrtle is an evergreen shrub' }, 'item 4: myrtle the plant keeps mediterranean_trees; the old_fashioned_names link was lowercase (allow-listed)');
reindex(P);
sec('Aliases typed proper whose root changed type follow it (as I18)');
for (const e of P.entries) if (e.aliasOf && TOUCHED.has(e.aliasOf) && e.type === 'proper' && E(e.aliasOf).type !== 'proper' && E(e.aliasOf).type !== 'common')
  set(e.id, 'type', E(e.aliasOf).type, `${e.aliasKind} alias of ${lab(E(e.aliasOf))}`);
reindex(P);

// what is left in given-name themes that is not a person entry with only name themes (listed in batch395-changes.txt, not changed)
const left = [];
for (const e of P.entries) {
  const th = Object.keys(e.typ || {}); if (!th.some(t => NAMES.has(t))) continue;
  const other = th.filter(t => !NAMES.has(t));
  if (e.type === 'person' && !other.length && (e.gloss === 'name' || !e.gloss)) continue;
  left.push(`${lab(e)}: ${th.filter(t => NAMES.has(t)).map(t => t + (e.show?.[t] ? ' "' + e.show[t] + '"' : '')).join(', ')}${other.length ? ' | other: ' + other.join(', ') : ''}`);
}

// allow list: keys of links gone; keys for new case-lint hits
const unused = [...dropKeys].filter(k => CASE_OK.has(k));
const keep = new Set([...CASE_OK].filter(k => !dropKeys.has(k)));
const lint = caseLint(P), newAllow = [];
for (const i of lint) { const k = i.entryId + '|' + i.themeId; if (!keep.has(k) && !newAllow.includes(k)) newAllow.push(k); }
const lintMsg = lint.filter(i => !keep.has(i.entryId + '|' + i.themeId)).map(i => `${i.entryId}|${i.themeId}: ${i.msg || i.kind || ''}`);
const [after, mAfter] = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const newSame = [...sameAfter].filter(x => !sameBefore.has(x));
const body = `${log.join('\n  ').trim() || 'none'}`
  + `\n\nLeft in given-name themes (not a person entry with only name themes): ${left.length}\n    ${left.join('\n    ')}`
  + `\nSame text twice in a theme, new: ${newSame.join('; ') || 'none'}\nAllow-list keys removed (links gone): ${unused.join(', ') || 'none'}`
  + `\nCase lint after (not allowed): ${lintMsg.join(' | ') || 'none'}\nAllow-list keys to add: ${newAllow.join(', ') || 'none'}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}`;
console.log(body + `\n\n${n} changes`);
if (process.argv.includes('--apply') && n) {
  if (newAllow.length) throw Error('case-lint hit with no reviewed reason, not applied: ' + newAllow.join(', '));
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  let src = fs.readFileSync(ALLOW, 'utf8');
  for (const k of unused) { const re = new RegExp(`\\n  '${k.replace('|', '\\|')}',[^\\n]*`); if (!re.test(src)) throw Error('allow key not found ' + k); src = src.replace(re, ''); }
  fs.writeFileSync(ALLOW, src);
  console.log('library v' + P.lib.version + ' ' + P.lib.modified);
}

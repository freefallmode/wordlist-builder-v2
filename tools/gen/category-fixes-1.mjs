// One-off: first category clean-up pass (outright errors and duplicate themes), for review.
// Run once from the repository root: node tools/gen/category-fixes-1.mjs
//
// 1. Outright errors
//    - US states, Mexican states, German states: synonym groups that joined different states
//      (Virginia = West Virginia, Baja California = Baja California Sur, Saxony = Lower Saxony = Saxony-Anhalt) are removed.
//    - four humours (complete set of four): the temperaments, emotions and doctors are unlinked; choler stays as yellow bile's synonym.
//    - nicknames for workers / nicknames for drinks: the plain words (firefighter, electrician, carpenter, coffee, tea) were linked
//      so that their nickname aliases would come along. The link moves to the nickname itself (firie, sparky, chippy, joe, char).
//    - wrongdoers: felony is a crime, not a person.
//    - animals with a poisonous bite (they are venomous; all but one are in venomous snakes): merged into venomous snakes.
// 2. Duplicate themes: the smaller theme's words move to the bigger one (with their in-theme ratings, shown texts and synonym groups)
//    and the smaller theme is deleted. Words whose shown text the target already has are not moved.
//    "penguins" moves under flightless birds (it held Galapagos, African and Humboldt penguins under Antarctic animals),
//    and "poetry forms" moves from grammar to literature.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteTheme, deleteEntry, placeTheme } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; };
const T = id => { const t = P.ix.theme.get(id); if (!t) throw Error('no theme ' + id); return t; };
const issueKey = i => i.sev + ' ' + i.msg;
const before = new Set(validate(P).filter(i => i.sev !== 'info').map(issueKey));
const touched = new Set();

// Drops ids from a theme's synonym groups; a group left with one member goes.
const ungroup = (tid, ids) => { const t = T(tid); if (!t.groups) return; t.groups = t.groups.map(g => g.filter(i => !ids.includes(i))).filter(g => g.length > 1); if (!t.groups.length) delete t.groups; };
// Removes the synonym group that holds exactly these ids.
const dropGroup = (tid, ids) => { const t = T(tid), g = (t.groups || []).find(g => g.length === ids.length && ids.every(i => g.includes(i))); if (!g) throw Error(`no group ${ids} in ${tid}`); t.groups = t.groups.filter(x => x !== g); if (!t.groups.length) delete t.groups; console.log('ungroup', tid, ids.map(i => E(i).text).join(' = ')); };
// Removes an entry's link to a theme and every theme-local setting for it.
const unlink = (tid, id) => { const e = E(id); if (e.typ[tid] === undefined) throw Error(`${e.text} not in ${tid}`); delete e.typ[tid]; if (e.show) delete e.show[tid]; if (e.use) delete e.use[tid]; if (e.nameOkIn) e.nameOkIn = e.nameOkIn.filter(x => x !== tid); ungroup(tid, [id]); touched.add(id); console.log('unlink', tid, e.text); };
// Moves a theme link from a root to one of its regional aliases (the nickname is the member, not the plain word).
const toAlias = (tid, rootId, aliasId) => { const r = E(rootId), a = E(aliasId); if (a.aliasOf !== rootId) throw Error(`${a.text} is not an alias of ${r.text}`); a.typ[tid] = r.typ[tid]; unlink(tid, rootId); console.log('  link', tid, a.text, 'rating', a.typ[tid]); };
const shownText = (e, tid) => (e.show?.[tid] || P.ix.entry.get(e.use?.[tid])?.text || e.text).toLowerCase();
// Deletes a theme and the theme-local settings that point at it.
const removeTheme = tid => { for (const e of P.entries) { if (e.typ[tid] !== undefined) touched.add(e.id); if (e.show) delete e.show[tid]; if (e.use) delete e.use[tid]; if (e.nameOkIn?.includes(tid)) e.nameOkIn = e.nameOkIn.filter(x => x !== tid); } deleteTheme(P, tid); reindex(P); };
// Moves the words of `from` into `to` (as tools/gen/easy/merge-dups.mjs does), then deletes `from`. `skip` lists entry ids that stay out of `to`.
const merge = (from, to, skip = []) => {
  const f = T(from), t = T(to);
  if (P.themes.some(k => k.parent === from)) throw Error(from + ' has sub-themes');
  const shown = new Set((P.ix.byTheme.get(to) || []).map(e => shownText(e, to)));
  const moved = [], kept = [], skipped = [];
  for (const e of P.entries) {
    if (e.typ[from] === undefined) continue;
    if (e.typ[to] !== undefined) { kept.push(e.text); continue; }
    if (skip.includes(e.id) || shown.has(shownText(e, from))) { skipped.push(e.text); continue; }
    e.typ[to] = e.typ[from]; moved.push(e.text);
    if (e.show?.[from] !== undefined && e.show[to] === undefined) e.show[to] = e.show[from];
    if (e.nameOkIn?.includes(from) && !e.nameOkIn.includes(to)) e.nameOkIn.push(to);
  }
  for (const g of f.groups || []) {   // groups whose members are now in the target join the target's groups
    const m = g.filter(id => P.ix.entry.get(id)?.typ[to] !== undefined); if (m.length < 2) continue;
    t.groups = t.groups || [];
    const hits = [...new Set(m.map(id => t.groups.find(x => x.includes(id))).filter(Boolean))], first = hits[0] || [];
    for (const id of m) if (!first.includes(id)) first.push(id);
    for (const x of hits.slice(1)) { for (const id of x) if (!first.includes(id)) first.push(id); t.groups.splice(t.groups.indexOf(x), 1); }
    if (!hits.length) t.groups.push(first);
  }
  removeTheme(from);
  console.log(`merge ${from} -> ${to}: moved ${moved.length} (${moved.join(', ')}); already there ${kept.length}; left out ${skipped.length}${skipped.length ? ' (' + skipped.join(', ') + ')' : ''}`);
};

// ---------- 1. outright errors ----------
dropGroup('us_states', [36170, 36192]);              // Virginia, West Virginia
dropGroup('mexican_states', [36234, 36235]);         // Baja California, Baja California Sur
dropGroup('german_states', [36391, 36397, 36399]);   // Saxony, Lower Saxony, Saxony-Anhalt
// four humours: blood, phlegm, yellow bile (= choler), black bile
for (const id of [4023, 4024, 15553, 15554, 15555, 32907, 15556, 15557]) unlink('four_humours', id);   // melancholy, melancholia, choleric, melancholic, phlegmatic, sanguine, Hippocrates, Galen
toAlias('nicknames_for_workers', 4083, 4085);        // firefighter -> firie
toAlias('nicknames_for_workers', 4091, 4092);        // electrician -> sparky
toAlias('nicknames_for_workers', 4094, 4096);        // carpenter -> chippy (joiner is a job title, not a nickname)
toAlias('nicknames_for_drinks', 226, 962);           // coffee -> joe
toAlias('nicknames_for_drinks', 225, 964);           // tea -> char
unlink('wrongdoers', 4242);                          // felony
reindex(P);
merge('animals_with_a_poisonous_bite', 'venomous_snakes', [1174]);   // gila monster is a lizard (already in venomous animals)

// ---------- 2. duplicate themes ----------
merge('colours_named_after_fruit', 'fruit_shades');
merge('poem_forms', 'poetry_forms');
if (!placeTheme(P, 'poetry_forms', 'poetry_terms', 'after')) throw Error('move poetry_forms'); reindex(P);
merge('kitchen_crew', 'kitchen_brigade');
merge('chef_roles', 'kitchen_brigade');
merge('whale_types', 'whales_and_dolphins');
merge('seal_types', 'seals_and_sea_lions');
merge('penguin_species', 'penguins');
if (!placeTheme(P, 'penguins', 'flightless_birds', 'in')) throw Error('move penguins'); reindex(P);
removeTheme('bear_types'); console.log('delete bear_types (bears is the complete set of species; grizzly, Kodiak and cinnamon are not species)');
merge('animals_of_the_far_north', 'arctic_animals', [264, 9450]);   // husky and sled dog are working dogs, not wild Arctic animals
merge('animals_of_the_far_south', 'antarctic_animals');
merge('soggy_places', 'wetlands');
merge('famous_stretches_of_sand', 'famous_beaches');

// ---------- entries left with no theme ----------
reindex(P);
for (const id of touched) {
  const e = P.ix.entry.get(id); if (!e || e.aliasOf) continue;
  const als = P.ix.aliases.get(id) || [];
  if (Object.keys(e.typ).length || als.some(a => Object.keys(a.typ).length)) continue;
  console.log('no theme left, deleted:', e.text, als.length ? '(and aliases ' + als.map(a => a.text).join(', ') + ')' : '');
  for (const a of als) P.entries = P.entries.filter(x => x !== a);
  deleteEntry(P, e); reindex(P);
}

// ---------- check and save ----------
reindex(P);
const after = validate(P).filter(i => i.sev !== 'info'), fresh = after.filter(i => !before.has(issueKey(i)));
console.log(`checks: ${before.size} warnings/errors before, ${after.length} after, ${fresh.length} new`);
for (const i of fresh) console.log('  NEW', i.sev, i.msg);
if (fresh.some(i => i.sev === 'error')) { console.log('Not saved: new errors.'); process.exit(1); }
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

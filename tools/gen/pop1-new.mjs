// One-off (2026-11-03): new popularity-1 themes of everyday things. Run: node tools/gen/pop1-new.mjs --apply, then node tools/apply-words.mjs tools/gen/pop1-new-words.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, moveTheme } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);
const T = [
  ['sandwich_fillings', 'sandwich fillings', 'dishes', 'what goes between two slices of bread'],
  ['salad_ingredients', 'salad ingredients', 'dishes', 'things that go in a salad'],
  ['jam_flavours', 'jam flavours', 'desserts_and_sweets', 'fruits that jam and marmalade are made from'],
  ['ways_to_cook_eggs', 'ways to cook eggs', 'eggs', 'styles of cooked egg: boiled, fried, scrambled'],
  ['pet_snacks_and_feed', 'pet snacks and feed', 'domestic_animals', 'what pets are fed or given to chew'],
  ['things_on_wheels', 'things on wheels', 'household_objects', 'everyday things that roll on wheels'],
  ['things_you_brush', 'things you brush', 'household_objects', 'things people brush: teeth, hair, shoes'],
  ['things_you_open', 'things you open', 'household_objects', 'things people open: door, jar, present'],
  ['things_you_pour', 'things you pour', 'household_objects', 'liquids and loose things people pour'],
  ['fluffy_things', 'fluffy things', 'textures', 'soft, fluffy things: kitten, cloud, chick'],
  ['wet_things', 'wet things', 'textures', 'things that are wet: rain, puddle, sponge'],
  ['hot_things', 'hot things', 'temperature', 'things that are hot: sun, fire, oven'],
  ['tiny_things', 'tiny things', 'size_and_weight', 'very small things: ant, pea, crumb'],
  ['things_made_of_metal', 'things made of metal', 'made_of', 'everyday things made of metal'],
  ['things_made_of_plastic', 'things made of plastic', 'made_of', 'everyday things made of plastic'],
  ['morning_routine', 'morning routine', 'time', 'what people do after waking up'],
];
for (const [id, name, parent, note] of T) {
  if (P.ix.theme.has(id) || P.themes.some(t => t.name === name)) { console.log('exists, skipped', id); continue; }
  if (!P.ix.theme.has(parent)) throw Error('no parent ' + parent);
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note, pop: 1 });
  reindex(P); moveTheme(P, id, parent); reindex(P);
}
if (process.argv.includes('--apply')) { stampSave(P); writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

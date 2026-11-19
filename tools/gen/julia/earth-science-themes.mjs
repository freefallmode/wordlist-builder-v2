// Earth science branch, step 1 of 3: shorter names, two themes moved, three new themes (skips what is already done).
// Run in order: node tools/gen/julia/earth-science-themes.mjs; node tools/apply-words.mjs tools/gen/julia/earth-science.mjs; node tools/gen/julia/earth-science-fixes.mjs
// A library file argument is for trying it on a scratch copy: node tools/gen/julia/earth-science-themes.mjs scratch.json
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme, placeTheme } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const named = name => P.themes.find(t => t.name.toLowerCase() === name.toLowerCase());

// Short names. The ids stay, so nothing that points at a theme breaks.
const RENAME = {
  volcano_words: 'volcanoes',
  types_of_volcano: 'volcano types',
  earthquake_words: 'earthquakes',
  layers_of_the_earth: "Earth's layers",
  earth_s_layers: "Earth's four layers",
  erosion_words: 'erosion',
  geothermal_words: 'geothermal features',
  soil_words: 'soil types',
  water_cycle_words: 'water cycle',
  layers_of_the_atmosphere: 'atmosphere layers',
  layers_of_a_rainforest: 'rainforest layers',
};
let renamed = 0;
for (const [id, name] of Object.entries(RENAME)) {
  const t = P.ix.theme.get(id); if (!t) throw Error('no theme ' + id);
  if (t.name === name) continue;
  const other = named(name); if (other && other.id !== id) throw Error(`a theme is already named ${name} (${other.id})`);
  console.log(`rename "${t.name}" -> "${name}"`); t.name = name; renamed++;
}

// Volcano types belong under volcanoes; rainforest layers are not earth science and go under "rainforest" (habitats).
const MOVE = { types_of_volcano: 'volcano_words', layers_of_a_rainforest: 'rainforest' };
for (const [id, parent] of Object.entries(MOVE)) {
  if (T(id).parent === parent) continue;
  if (!placeTheme(P, id, parent, 'in')) throw Error(`move ${id}`); reindex(P); console.log(`move "${T(id).name}" under "${T(parent).name}"`);
}
function T(id) { const t = P.ix.theme.get(id); if (!t) throw Error('no theme ' + id); return t; }

const THEMES = [
  ['volcano_parts', 'volcano parts', 'volcano_words', 'parts of a volcano: crater, vent, cone, magma chamber, caldera, summit, conduit, fissure, flank'],
  ['geothermal_wonders', 'geothermal wonders', 'geothermal_words', 'famous geysers, hot springs and geothermal parks: Old Faithful, Yellowstone, Blue Lagoon, Pamukkale, Rotorua, Geysir'],
  ['soil_layers', 'soil layers', 'soil_words', 'layers from the surface down: leaf litter, humus, topsoil, subsoil, hardpan, regolith, bedrock'],
];
let made = 0;
for (const [id, name, parent, note] of THEMES) {
  if (P.ix.theme.has(id)) continue;
  if (!P.ix.theme.has(parent)) throw Error('no parent ' + parent);
  if (named(name)) throw Error('a theme is already named ' + name);
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note });
  reindex(P); moveTheme(P, id, parent); reindex(P); made++;
}
stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
console.log(`${renamed} themes renamed, ${made} themes created; library v${P.lib.version}`);

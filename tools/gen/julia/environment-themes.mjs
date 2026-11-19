// Environment branch, step 1 of 3: shorter names for five themes and seven new themes under them (skips what is already done).
// Run in order: node tools/gen/julia/environment-themes.mjs; node tools/apply-words.mjs tools/gen/julia/environment.mjs; node tools/gen/julia/environment-fixes.mjs
// A library file argument is for trying it on a scratch copy: node tools/gen/julia/environment-themes.mjs scratch.json
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const named = name => P.themes.find(t => t.name.toLowerCase() === name.toLowerCase());

// Short names. The ids stay, so nothing that points at a theme breaks.
const RENAME = {
  pollution_words: 'pollution',
  recycling_words: 'recyclables',       // now only the things that go in the recycling bin (environment-fixes.mjs)
  conservation_words: 'conservation',
  climate_words: 'climate change',
  green_living_words: 'green living',   // becomes a group of the three eco themes (environment-fixes.mjs)
};
let renamed = 0;
for (const [id, name] of Object.entries(RENAME)) {
  const t = P.ix.theme.get(id); if (!t) throw Error('no theme ' + id);
  if (t.name === name) continue;
  const other = named(name); if (other && other.id !== id) throw Error(`a theme is already named ${name} (${other.id})`);
  console.log(`rename "${t.name}" -> "${name}"`); t.name = name; renamed++;
}

const THEMES = [
  ['pollution_types', 'pollution types', 'pollution_words', 'kinds of pollution, shown short: air, water, soil, noise, light, plastic, thermal, visual'],
  ['oil_industry', 'oil industry', 'fossil_fuels', 'how oil and gas are got out and moved: oil rig, derrick, pump jack, drilling, fracking, refinery, pipeline, tanker'],
  ['protected_areas', 'protected areas', 'conservation_words', 'places set aside for nature: national park, nature reserve, sanctuary, marine park, game reserve'],
  ['greenhouse_gases', 'greenhouse gases', 'climate_words', 'gases that trap heat: carbon dioxide, methane, nitrous oxide, ozone, CFC'],
  ['eco_habits', 'eco habits', 'green_living_words', 'things people do to live greener: composting, recycling, carpooling, cycling, mending, line drying'],
  ['eco_swaps', 'eco swaps', 'green_living_words', 'reusable or greener things used instead of throwaway ones: reusable bag, metal straw, bamboo toothbrush, beeswax wrap'],
  ['eco_home', 'eco home', 'green_living_words', 'things in a home that save energy or water: solar panel, insulation, heat pump, smart meter, rain barrel'],
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

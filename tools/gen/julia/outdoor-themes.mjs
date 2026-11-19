// Creates the themes of the outdoor batch (skips any that exist). Words come next: node tools/apply-words.mjs tools/gen/julia/outdoor.mjs
// Run: node tools/gen/julia/outdoor-themes.mjs [library file]   (a library file argument is for trying it on a scratch copy)
// Each new theme sits under the theme or group it belongs to, so the level builder knows they are related.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const THEMES = [
  ['smores', 's\'mores', 'campfire_foods', 'what you need to make s\'mores: marshmallow, chocolate, graham cracker, campfire'],
  ['hiking_snacks', 'hiking snacks', 'outdoors', 'food to carry on a hike: trail mix, granola bar, energy bar, beef jerky, banana'],
  ['hiking_dangers', 'hiking dangers', 'outdoors', 'things that can go wrong or hurt you on a hike: blister, sunburn, tick, snake, lightning'],
  ['bike_gear', 'bike gear', 'bikes_and_boards', 'what a cyclist wears or carries: helmet, lock, pump, lights, gloves, water bottle'],
];
let made = 0;
for (const [id, name, parent, note] of THEMES) {
  if (P.ix.theme.has(id)) continue;
  if (!P.ix.theme.has(parent)) throw Error('no parent ' + parent);
  if (P.themes.some(t => t.name.toLowerCase() === name.toLowerCase())) throw Error('a theme is already named ' + name);
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note });
  reindex(P); moveTheme(P, id, parent); reindex(P); made++;
}
stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
console.log(`${made} themes created; library v${P.lib.version}`);

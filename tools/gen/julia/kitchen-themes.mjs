// Creates the themes of the kitchen batch (skips any that exist). Words come next: node tools/apply-words.mjs tools/gen/julia/kitchen.mjs
// Run: node tools/gen/julia/kitchen-themes.mjs [library file]   (a library file argument is for trying it on a scratch copy)
// Each new theme sits under the theme it is a kind of, so the level builder knows they are related.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const THEMES = [
  ['bakeware', 'bakeware', 'cookware', 'pans and dishes that go in the oven for baking: baking sheet, cake pan, muffin tin, pie dish'],
  ['kitchen_linens', 'kitchen linens', 'kitchen', 'cloth things used in the kitchen and at the table: apron, dish towel, oven mitt, tablecloth'],
  ['food_storage', 'food storage', 'containers', 'things for keeping food fresh: jar, plastic wrap, foil, freezer bag, cookie jar'],
];
let made = 0;
for (const [id, name, parent, note] of THEMES) {
  if (P.ix.theme.has(id)) continue;
  if (!P.ix.theme.has(parent)) throw Error('no parent ' + parent);
  if (P.themes.some(t => t.name.toLowerCase() === name)) throw Error('a theme is already named ' + name);
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note });
  reindex(P); moveTheme(P, id, parent); reindex(P); made++;
}
stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
console.log(`${made} themes created; library v${P.lib.version}`);

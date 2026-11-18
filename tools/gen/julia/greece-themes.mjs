// Creates the themes of the Ancient Greece batch (skips any that exist). Words come next: node tools/apply-words.mjs tools/gen/julia/greece.mjs
// Run: node tools/gen/julia/greece-themes.mjs [library file]   (a library file argument is for trying it on a scratch copy)
// Each new theme sits under the theme it is a kind of, so the level builder knows they are related.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const THEMES = [
  ['greek_goddesses', 'Greek goddesses', 'greek_gods', 'female gods of Greek myth: Athena, Aphrodite, Hera, Artemis, Demeter, Persephone'],
  ['greek_myth_objects', 'Greek myth objects', 'greek_gods', 'famous objects in Greek myths: Trojan Horse, Pandora\'s box, Golden Fleece, golden apple'],
  ['greek_city_states', 'Greek city-states', 'ancient_greece', 'cities of ancient Greece that ruled themselves: Athens, Sparta, Corinth, Thebes'],
  ['ancient_greek_writers', 'ancient Greek writers', 'ancient_greece', 'poets, playwrights and historians of ancient Greece: Homer, Aesop, Sophocles, Sappho, Herodotus'],
  ['greek_buildings', 'Greek buildings', 'greek_landmarks', 'famous ancient buildings of Greece: Parthenon, Acropolis, Erechtheion, Temple of Poseidon'],
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

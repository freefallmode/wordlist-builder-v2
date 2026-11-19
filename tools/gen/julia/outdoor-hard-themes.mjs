// Creates the themes of the hard outdoor batch (skips any that exist). Words come next: node tools/apply-words.mjs tools/gen/julia/outdoor-hard.mjs
// Run: node tools/gen/julia/outdoor-hard-themes.mjs [library file]   (a library file argument is for trying it on a scratch copy)
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const THEMES = [
  ['climbing_holds', 'climbing holds', 'climbing_words', 'shapes of hold a climber grabs or stands on: jug, crimp, sloper, pinch, pocket'],
  ['bike_tricks', 'bike tricks', 'bikes_and_boards', 'BMX and mountain bike tricks: wheelie, bunny hop, manual, tailwhip, barspin'],
  ['bike_park', 'bike park', 'bikes_and_boards', 'features of a mountain bike park: berm, pump track, dirt jump, kicker, drop, rock garden'],
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

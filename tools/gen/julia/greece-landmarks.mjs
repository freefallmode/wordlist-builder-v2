// Takes the famous buildings and the islands out of "Greek landmarks", so the three themes do not overlap:
// the buildings are in "Greek buildings" (a sub-theme of Greek landmarks) and the islands in "Greek islands".
// Run after the Greece batch: node tools/gen/julia/greece-landmarks.mjs [library file]
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const FROM = 'greek_landmarks';
const MOVE = {
  greek_buildings: [2334, 2335, 21806, 37347, 37355, 37356, 37771, 37777, 37782, 37783],   // Acropolis, Parthenon, Knossos, Temple of Poseidon, Erechtheion, Temple of Olympian Zeus, Panathenaic Stadium, Propylaea, Lion Gate, Treasury of Atreus
  greek_islands: [21815, 36600, 36601, 37770],                                               // Santorini, Mykonos, Rhodes, Delos
};
const t = P.ix.theme.get(FROM); if (!t) throw Error('no theme ' + FROM);
let n = 0;
for (const [to, ids] of Object.entries(MOVE)) for (const id of ids) {
  const e = P.ix.entry.get(id); if (!e) throw Error('no entry ' + id);
  if (e.typ[to] === undefined) throw Error(`${e.text} is not in ${to}; run the Greece batch first`);
  if (e.typ[FROM] === undefined) continue;   // already done
  delete e.typ[FROM]; if (e.show) delete e.show[FROM]; if (e.use) delete e.use[FROM]; if (e.nameOkIn) e.nameOkIn = e.nameOkIn.filter(x => x !== FROM);
  n++; console.log(`out of Greek landmarks: ${e.text} (now in ${P.ix.theme.get(to).name})`);
}
if (t.groups) { const all = Object.values(MOVE).flat(); t.groups = t.groups.map(g => g.filter(i => !all.includes(i))).filter(g => g.length > 1); if (!t.groups.length) delete t.groups; }
reindex(P);
console.log(`${n} words moved out; Greek landmarks now has ${(P.ix.byTheme.get(FROM) || []).filter(e => !e.aliasOf).length} words`);
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

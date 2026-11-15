// Restores four entries capmark-fix.mjs lowercased wrongly (Crux, Dot the name, Raven the trickster, Holstein).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const [t, g] of [['crux', 'constellation'], ['dot', 'name'], ['raven', 'trickster'], ['holstein', 'cow']]) {
  const e = P.entries.find(x => x.text === t && x.gloss === g); if (!e) { console.log('missing', t); continue; }
  e.text = t[0].toUpperCase() + t.slice(1); e.type = 'proper'; console.log('restored', e.text);
}
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version);

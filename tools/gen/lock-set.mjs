// One-off (2026-11-05): lock themes where the exact spelling matters. Run: node tools/gen/lock-set.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const id of ['sweet_treats_of_turkey', 'intercardinal_directions', 'compass_directions']) { const t = P.ix.theme.get(id); if (!t) throw Error(id); t.locked = true; }
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

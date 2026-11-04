// One-off (2026-11-05): "footlong" is Subway's trademark as well as a generic sandwich size: flag it as a trademark. Run: node tools/gen/footlong-tm.mjs --apply
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const e = P.ix.entry.get(19074); if (!e || e.text !== 'footlong') throw Error('entry 19074 is not footlong');
e.tm = true; console.log('footlong: trademark on');
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

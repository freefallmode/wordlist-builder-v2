// One-off (2026-11-06): "top hat" (13720) showed in full in hats and historical hats; both now show "top". Run: node tools/gen/tophat-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const e = P.ix.entry.get(13720); if (e?.text !== 'top hat') throw Error('entry not as expected');
for (const t of ['hats', 'historical_hats']) { if (!(t in e.th)) throw Error('not in ' + t); e.show = { ...e.show, [t]: 'top' }; }
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 5).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

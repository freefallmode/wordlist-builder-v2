// One-off (2026-11-06): entry 50015 was "Hamlet" (type title, familiarity 1) with the village meaning. The settlement word is the common noun "hamlet". Run: node tools/gen/hamlet-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const e = P.ix.entry.get(50015); if (e?.text !== 'Hamlet' || e.gloss !== 'village') throw Error('entry not as expected');
e.text = 'hamlet'; e.type = 'common'; e.fam = 3; e.status = 'rev';
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 5).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

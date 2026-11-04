// One-off (2026-11-05): two leftovers of flagged-fix.mjs. Run: node tools/gen/flagged-fix2.mjs [--apply]
//  - "snow line" (now a spelling alias of snowline) needs the same nameOkIn as its root, or the theme-name check flags it in snow___, ___line and snow and ice
//  - "ice pop" left "brand names used as words" but was still in that theme's synonym group
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => P.ix.entry.get(id);
const sl = E(45101), root = E(30851); if (!sl || sl.text !== 'snow line' || !root) throw Error('snow line / snowline not found');
sl.nameOkIn = [...new Set([...(sl.nameOkIn || []), ...(root.nameOkIn || []), 'snow_and_ice'])];
const t = P.ix.theme.get('brand_names_used_as_words');
if (t.groups) t.groups = t.groups.map(g => g.filter(id => id !== 18305)).filter(g => g.length > 1);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg) && !/rating-vs-zipf/.test(i.kind || i.msg));
console.log('issues left', bad.length, bad.slice(0, 5).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

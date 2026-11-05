// One-off (2026-11-06): powdered milk is shown as "powdered" in types of milk (the entry stays the full term); "milk powder" is the same thing, so it becomes a synonym alias of it.
// Run: node tools/gen/milk-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const a = P.ix.entry.get(536), b = P.ix.entry.get(537), T = 'types_of_milk';
if (a?.text !== 'powdered milk' || b?.text !== 'milk powder') throw Error('entries not as expected');
console.log('milk powder links:', Object.keys(b.typ), 'aliases of it:', P.entries.filter(x => x.aliasOf === 537).length);
a.show = { ...a.show, [T]: 'powdered' };
for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === 537 ? 536 : id))]).filter(g => g.length > 1);
for (const tid of Object.keys(b.typ).filter(x => x !== T)) if (a.typ[tid] === undefined) a.typ[tid] = b.typ[tid];   // its other themes move to the root
b.typ = {}; b.show = {}; b.aliasOf = 536; b.aliasKind = 'synonym'; b.nameOkIn = [T];   // an alias of a nameOk entry needs the same exemption
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 5).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

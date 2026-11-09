// Follow-up to spelling-flip.mjs (library v339): the three pairs the new alias-us-root check still flagged.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const find = (r, a) => P.entries.find(x => x.aliasOf && x.text === a && P.ix.entry.get(x.aliasOf).text === r && x.region.includes('US') && x.aliasKind === 'spelling');
const w = find('whisky', 'whiskey'); if (w) w.region = [];
for (const [r, a] of [['tadpole', 'pollywog'], ['downtown', 'town center']]) { const x = find(r, a); if (x) x.aliasKind = 'regional'; else console.log('not found', a); }
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

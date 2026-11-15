// Rowan the tree and mountain ash were a synonym pair inside "unisex names": drop the stray tree links and the pair; gloss the flower/tree twins.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const t = P.themes.find(x => x.name === 'unisex names');
t.groups = (t.groups || []).filter(g => !g.includes(1679));
const ma = P.entries.find(e => e.text === 'mountain ash'); if (ma && ma.typ) { delete ma.typ[t.id]; if (ma.show) delete ma.show[t.id]; }
for (const [txt, g] of [['rowan', 'tree'], ['daisy', 'flower'], ['lily', 'flower']]) { const e = P.entries.find(x => x.text === txt && !x.gloss && !x.aliasOf); if (e) { e.gloss = g; console.log('gloss', txt); } }
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version);

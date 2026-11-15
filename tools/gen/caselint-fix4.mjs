// Tidies the entries the names fix created: merge Drew and Mark into the existing name entries; give the lowercase twins of Taro, Hank, Sue a gloss.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const [id, old] of [[67406, 28891], [67407, 28467]]) {
  const n = P.entries.find(e => e.id === id), o = P.entries.find(e => e.id === old); if (!n || !o) { console.log('missing', id); continue; }
  console.log(o.text, o.type, o.gloss, Object.keys(o.typ).length);
  Object.assign(o.typ, n.typ); o.text = n.text; o.type = 'person'; if (o.show) for (const k of Object.keys(o.show)) if (o.show[k].toLowerCase() === o.text.toLowerCase()) delete o.show[k];
  P.entries.splice(P.entries.indexOf(n), 1);
}
const G = { taro: 'root vegetable', hank: 'coil of yarn', sue: 'take to court' };
for (const e of P.entries) if (G[e.text] && !e.gloss && !e.aliasOf) { e.gloss = G[e.text]; console.log('gloss', e.text); }
for (const e of P.entries) if (['Taro', 'Hank', 'Sue'].includes(e.text) && e.gloss === 'name') e.gloss = 'given name';
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version);

// Two senses found by the game manager's level review: banyan (the tree, not the hotel chain) and Brazil nut.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const hotel = P.ix.entry.get(48470), tree = P.ix.entry.get(1663), nut = P.ix.entry.get(17356);
for (const t of ['trees', 'tropical_trees']) { tree.typ[t] = hotel.typ[t]; delete hotel.typ[t]; delete hotel.show[t]; }
if (!Object.keys(hotel.show).length) delete hotel.show;
nut.text = 'Brazil nut'; nut.show = Object.assign({}, nut.show, { nuts: 'Brazil' });
reindex(P);
console.log(validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)).length);
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

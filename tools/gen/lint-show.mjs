import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { caseLint } from '../../js/caselint.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const L = caseLint(P).filter(i => i.kind !== 'cap-common'); const c = {};
for (const i of L) c[i.kind] = (c[i.kind] || 0) + 1; console.log(c);
for (const i of L) console.log(i.kind, '|', i.msg);

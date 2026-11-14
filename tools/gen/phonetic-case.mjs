// Phonetic alphabet: show every word lowercase (the capitalised entries get a lowercase shown text).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const T = 'phonetic_alphabet'; let n = 0;
for (const e of P.entries) if (e.typ && e.typ[T] != null && !e.aliasOf && /^\p{Lu}[a-z]+$/u.test(e.text)) { e.show = Object.assign({}, e.show, { [T]: e.text.toLowerCase() }); n++; }
console.log('shown lowercase:', n);
reindex(P);
console.log(validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)).length);
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

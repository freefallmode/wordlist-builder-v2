// One-off: the Kindle e-reader was linked to fire_words for the verb "kindle"; move that to a new verb entry and make "kindling" its alias.
import { readFileSync, writeFileSync } from 'node:fs';
import { addEntry, reindex } from '../../js/model.js';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { validate } from '../../js/validate.js';
const F = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(F, 'utf8')); reindex(P);
const kin = P.entries.find(e => e.id === 7354), kg = P.entries.find(e => e.text === 'kindling' && !e.gloss);
console.log(kin.text, kin.th.fire_words, kg.text, kg.th.fire_words, kg.rec);
delete kin.th.fire_words;
const v = addEntry(P, 'kindle', { gloss: 'to light', pos: 'verb', type: 'common', rec: 2, th: { fire_words: 2 }, status: 'gen' });
reindex(P);
kg.aliasOf = v.id; kg.aliasKind = 'synonym';
for (const t of Object.keys(kg.th)) if (t !== 'fire_words') { v.th[t] ??= kg.th[t]; }
reindex(P); stampSave(P);
writeFileSync(F, serializeProject(P));
console.log('v' + P.lib.version, validate(P).filter(i => i.sev === 'error').length, 'errors');

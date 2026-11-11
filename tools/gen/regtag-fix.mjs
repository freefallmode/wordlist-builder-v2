// "holidays and celebrations" carried the region IN, which every one of its 33 descendant themes (christmas, halloween, easter ...) inherited. Removed: Indian festivals have their own tags.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const t = P.ix.theme.get('holidays_and_celebrations'); console.log(t.region); t.region = [];
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

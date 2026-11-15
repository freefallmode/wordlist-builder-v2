// Writes js/caselint-allow.js: every current non-cap-common lint hit is judged legitimate (right capital for the sense) and allowed per link.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { caseLint } from '../../js/caselint.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const ent = new Map(P.entries.map(e => [e.id, e])), th = new Map(P.themes.map(t => [t.id, t]));
const rows = caseLint(P).filter(i => i.kind !== 'cap-common').map(i => `  '${i.entryId}|${i.themeId}', // ${ent.get(i.entryId).text} in ${th.get(i.themeId).name}`);
fs.writeFileSync(new URL('../../js/caselint-allow.js', import.meta.url), `// Links where the capital (or lowercase) is intended for the sense the word has in that theme, so the case lint does not flag them.\n// Key: entryId|themeId. Add a line only after checking the word is right as shown. Generated first by tools/gen/caselint-allow.mjs.\nexport const CASE_OK = new Set([\n${rows.join('\n')}\n]);\n`);
console.log(rows.length);

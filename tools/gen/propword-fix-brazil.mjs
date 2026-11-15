// One-off after the proper-word pass (v371): `brazil nut` and `brazil nut tree` go back to lowercase.
// Simon asked for the lowercase b on 2026-11-14 (commit 501dda4, library v357); the pass capitalised them again under its general rule
// without knowing that. This restores text, type and shown texts as they were at v370. The lint's word list no longer holds `brazil`
// (js/caselint-words.js; tools/gen/propword-apply.mjs will not learn it again).
// Run: node tools/gen/propword-fix-brazil.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { caseLint } from '../../js/caselint.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
let n = 0;
for (const [id, text] of [[17356, 'brazil nut'], [30002, 'brazil nut tree']]) {
  const e = P.ix.entry.get(id);
  if (!e || e.text.toLowerCase() !== text) throw Error(`entry ${id} is not "${text}"`);
  if (e.text !== text || e.type !== 'common') n++;
  e.text = text; e.type = 'common';
  for (const [t, s] of Object.entries(e.show || {})) if (s !== s.replace(/Brazil/g, 'brazil')) { e.show[t] = s.replace(/Brazil/g, 'brazil'); n++; }
  console.log(id, JSON.stringify(e.text), e.type, JSON.stringify(e.show));
}
reindex(P);
console.log(`${n} changes; case lint: ${caseLint(P).length}`);
if (process.argv.includes('--apply') && n) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

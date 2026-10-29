// Shows the library entries whose text matches, with their meaning label, type and themes: node tools/gen/find-word.mjs mandarin navel steel
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, sameText, linkIds } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
reindex(P);
for (const w of process.argv.slice(2)) {
  const m = sameText(P, w);
  if (!m.length) console.log(`${w}: (none)`);
  for (const e of m) console.log(`${w}: id ${e.id} gloss "${e.gloss || ''}" type ${e.type}${e.aliasOf ? ' alias of ' + P.ix.entry.get(e.aliasOf).text : ''} themes ${linkIds(P, e).join(', ')}`);
}

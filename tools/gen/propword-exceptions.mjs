// Entries that stay lowercase by Simon's own decision although the proper-word rule would capitalise them (DESIGN-entries.md, Capital rule and lint).
// The proper-word pass (v371) capitalised them; this puts text, type and shown texts back to lowercase and common. It changes nothing when they
// are already right, so it can be run again after a later pass as a check.
//   brazil nut, brazil nut tree   decided 2026-11-14 (commit 501dda4, v357); restored at v372. `brazil` is kept out of PROPER_WORDS.
//   gothic art, byzantine art     decided 2026-11-15: in "art movements" they are lowercase like cubism and surrealism; restored at v373.
//                                 Both ids are in LOWER_OK (js/caselint-words.js), since gothic and byzantine are capitalised elsewhere.
// Run: node tools/gen/propword-exceptions.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { caseLint } from '../../js/caselint.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
let n = 0;
for (const [id, text] of [[17356, 'brazil nut'], [30002, 'brazil nut tree'], [11993, 'gothic art'], [11994, 'byzantine art']]) {
  const e = P.ix.entry.get(id);
  if (!e || e.text.toLowerCase() !== text) throw Error(`entry ${id} is not "${text}"`);
  if (e.text !== text) { e.text = text; n++; }
  if (e.type !== 'common') { e.type = 'common'; n++; }
  for (const [t, s] of Object.entries(e.show || {})) if (s !== s.toLowerCase()) { e.show[t] = s.toLowerCase(); n++; }
  console.log(id, JSON.stringify(e.text), e.type, JSON.stringify(e.show));
}
reindex(P);
const lint = caseLint(P);
console.log(`${n} changes; case lint: ${lint.length}`); for (const i of lint.slice(0, 10)) console.log('  ' + i.kind + ' | ' + i.msg);
if (process.argv.includes('--apply') && n) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

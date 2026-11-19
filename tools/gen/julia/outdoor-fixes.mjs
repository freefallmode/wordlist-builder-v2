// Follow-up to the outdoor batch. Run after it: node tools/gen/julia/outdoor-fixes.mjs [library file]
// 1. Kinds theme rule: "climbing styles" shows the short word (sport, lead ...) for each full term, as it already does for rock, ice, trad.
// 2. The new alias U-lock may contain "lock" in "locks and keys", like its root D-lock (nameOkIn).
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseProject, serializeProject, stampSave, } from '../../../js/store.js';
import { reindex, sameText } from '../../../js/model.js';
const LIB = process.argv[2] ? pathToFileURL(resolve(process.argv[2])) : new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const TID = 'climbing_styles';
const SHOW = { 'indoor climbing': 'indoor', 'sport climbing': 'sport', 'lead climbing': 'lead', 'speed climbing': 'speed', 'aid climbing': 'aid', 'alpine climbing': 'alpine' };
for (const [text, short] of Object.entries(SHOW)) {
  const e = (P.ix.byTheme.get(TID) || []).find(x => !x.aliasOf && x.text === text && x.typ[TID] !== undefined);
  if (!e) throw Error(`${text} is not in ${TID}; run the outdoor batch first`);
  e.show = Object.assign({}, e.show, { [TID]: short });
  console.log(`climbing styles: ${text} shown as "${short}"`);
}
const ulock = sameText(P, 'U-lock').find(e => e.aliasOf && P.ix.entry.get(e.aliasOf)?.text === 'D-lock');
if (!ulock) throw Error('no U-lock alias of D-lock; run the outdoor batch first');
const root = P.ix.entry.get(ulock.aliasOf);
ulock.nameOkIn = [...new Set([...(ulock.nameOkIn || []), ...(root.nameOkIn || [])])];
console.log('U-lock nameOkIn: ' + ulock.nameOkIn.join(', '));
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

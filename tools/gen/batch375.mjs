// Library batch v375 (2026-11-15, approved by Simon): clears the Checks errors of ISSUES.md T1, B23 and the data half of B14.
//   T1   three UK spelling aliases had no meaning label beside a same-text entry (needs-gloss); each takes its root's gloss, as grey [color] 7673 already does.
//   B23  the nine hotel room terms got part of speech `noun phrase` from the one-off tools/gen/rooms-fix.mjs (v288), not a value of POS; every other room term is a noun.
//   B14  "South Beach diet" got type `name` from a verdict line of the kinds pass (tools/gen/bare/v-2.txt, v288); the bare entry was `proper`, like Zone diet and Mediterranean diet.
// Changes nothing when already right, so it can be rerun as a check. Run: node tools/gen/batch375.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const FIX = [
  [1740, 'lupin', 'gloss', 'flower'], [9526, 'grey', 'gloss', 'horse color'], [37976, 'colours', 'gloss', 'flag'],
  ...[[48358, 'single'], [48359, 'double'], [48360, 'twin'], [63321, 'deluxe'], [63322, 'king'], [63323, 'quad'], [63324, 'queen'], [63325, 'standard'], [63326, 'triple']].map(([id, w]) => [id, w + ' room', 'pos', 'noun']),
  [67019, 'South Beach diet', 'type', 'proper'],
];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return JSON.stringify(c); };
console.log('checks before:', count());
let n = 0;
for (const [id, text, f, v] of FIX) {
  const e = P.ix.entry.get(id); if (!e || e.text !== text) throw Error(`entry ${id} is not "${text}"`);
  if (f === 'gloss' && e.gloss !== v && P.ix.entry.get(e.aliasOf)?.gloss !== v) throw Error(`entry ${id}: root gloss is not "${v}"`);
  if (e[f] === v) continue;
  console.log(`${id} "${text}" ${f}: ${JSON.stringify(e[f])} -> ${JSON.stringify(v)}`); e[f] = v; n++;
}
reindex(P);
console.log(`${n} changes; checks after:`, count());
if (process.argv.includes('--apply') && n) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

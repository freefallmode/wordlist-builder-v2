// Themes that need more words: thin (under 16 roots, not complete), or too few hard (in-theme rating 4-5) or easy (1-2) words.
// Run: node tools/gen/list-topup.mjs            counts of chunks
//      node tools/gen/list-topup.mjs <n>        chunk n (25 themes) with what each needs and the words it has
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const SIZE = 25, MINEASY = 3, MINTOTAL = 16;
const rows = new Map(); for (const e of P.entries) if (!e.aliasOf) for (const [t, r] of Object.entries(e.th)) (rows.get(t) || rows.set(t, []).get(t)).push([e.text + (e.gloss ? ` (${e.gloss})` : ''), r]);
const need = [];
for (const t of P.themes) {
  if (t.group) continue;
  const w = rows.get(t.id) || [], hard = w.filter(x => x[1] >= 4).length, easy = w.filter(x => x[1] <= 2).length;
  const MINHARD = t.d <= 2 ? 2 : 3;
  const n = []; if (!t.complete && w.length < MINTOTAL) n.push(`thin (${w.length} words)`);
  if (!t.complete && hard < MINHARD) n.push(`needs ${MINHARD - hard}+ hard words (rating 4-5)`);
  if (!t.complete && easy < MINEASY) n.push(`needs ${MINEASY - easy}+ easy words (rating 1-2)`);
  if (n.length) need.push({ t, w, n });
}
const arg = process.argv[2];
if (!arg) { console.log(need.length, 'themes,', Math.ceil(need.length / SIZE), 'chunks'); process.exit(); }
for (const { t, w, n } of need.slice((arg - 1) * SIZE, arg * SIZE)) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  console.log(`\n${t.id}  "${path.join(' > ')}"  d:${t.d}${t.note ? '  note: ' + t.note : ''}${t.region.length ? ' region:' + t.region.join('/') : ''}\n  NEEDS: ${n.join('; ')}\n  HAS: ${w.map(x => `${x[0]}:${x[1]}`).join(', ')}`);
}

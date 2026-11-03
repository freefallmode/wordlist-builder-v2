// Lists the words at difficulty 2 of pop-1 themes that have fewer than 6 words at difficulty 1 but 6+ at difficulty 2 or lower, in chunks (BRIEF-ease.md).
// Run: node tools/gen/ease-make.mjs [chunks=8]   -> tools/gen/ease/list-N.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, effRec, popIn } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const N = +process.argv[2] || 8, blocks = [];
for (const t of P.themes) {
  if (t.group || t.enabled === false || t.pop !== 1) continue;
  const roots = new Map();
  for (const e of P.ix.byTheme.get(t.id) || []) { if (!e.enabled) continue; const r = e.aliasOf ? P.ix.entry.get(e.aliasOf) : e; if (r && !roots.has(r.id)) roots.set(r.id, r); }
  const lv = [...roots.values()].map(r => [r, effRec(P, r, t.id) || 5]);
  const d1 = lv.filter(([, d]) => d === 1), d2 = lv.filter(([, d]) => d === 2);
  if (d1.length >= 6 || d1.length + d2.length < 6 || lv.length < 8) continue;
  const lab = r => (r.show?.[t.id] || r.text) + (r.gloss ? ' [' + r.gloss + ']' : '');
  blocks.push([`T ${t.id} | ${t.name} | ${lv.length} words | ${d1.length} at difficulty 1`, 'EASY ALREADY: ' + d1.map(([r]) => lab(r)).join(', '), ...d2.map(([r]) => `${r.id} | ${lab(r)} | ${r.type} | familiarity ${r.rec} | typicality ${popIn(P, r, t.id) || '-'}`)].join('\n'));
}
const per = Math.ceil(blocks.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(here(`./ease/list-${i + 1}.txt`), blocks.slice(i * per, (i + 1) * per).join('\n\n') + '\n');
console.log(blocks.length + ' themes in ' + N + ' chunks');

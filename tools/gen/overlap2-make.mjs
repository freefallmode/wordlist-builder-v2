// Lists generic themes that hold brand or organisation entries, for agents looking for a brand next to the generic word it stands for (Pepsi next to cola) under BRIEF-overlap2.md.
// Run: node tools/gen/overlap2-make.mjs [chunks=12]   writes tools/gen/overlap2/list-<n>.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, eff } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const n = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 12;
const blocks = [];
for (const t of P.themes) {
  if (t.group || eff(P, t.id).tm || !eff(P, t.id).enabled) continue;
  const es = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.enabled).map(e => ({ e, txt: e.show?.[t.id] || e.text }));
  const brands = es.filter(x => x.e.tm || x.e.type === 'org'), others = es.filter(x => !(x.e.tm || x.e.type === 'org'));
  if (!brands.length || !others.length) continue;
  blocks.push({ size: brands.length + Math.ceil(others.length / 12), text: `T ${t.id} | ${t.name} | ${es.length} words\nBRANDS: ${brands.map(x => `${x.e.id} ${x.txt}`).join('; ')}\nOTHERS: ${others.slice(0, 160).map(x => `${x.e.id} ${x.txt}`).join('; ')}\n` });
}
const total = blocks.reduce((s, b) => s + b.size, 0), per = Math.ceil(total / n), files = Array.from({ length: n }, () => []); let f = 0, acc = 0;
for (const b of blocks) { if (acc >= per && f < n - 1) { f++; acc = 0; } files[f].push(b.text); acc += b.size; }
files.forEach((c, i) => fs.writeFileSync(here(`./overlap2/list-${i + 1}.txt`), c.join('\n')));
console.log(blocks.length + ' themes; per file', files.map(c => c.length).join(','));

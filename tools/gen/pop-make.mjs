// Lists themes of popularity 1 and 2 for agents re-rating under BRIEF-pop2.md.
// Run: node tools/gen/pop-make.mjs [chunks=10] [--pops 1,2]   writes tools/gen/pop/list-<n>.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, effRec, eff } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const n = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 10;
const pops = new Set((process.argv.includes('--pops') ? process.argv[process.argv.indexOf('--pops') + 1] : '1,2').split(',').map(Number));
const NAMED = new Set(['person', 'place', 'org', 'title', 'proper']);
const rows = [];
for (const t of P.themes) {
  if (t.group || !eff(P, t.id).enabled || !pops.has(t.pop)) continue;
  const roots = new Map();
  for (const e of P.ix.byTheme.get(t.id) || []) { if (!e.enabled) continue; const r = e.aliasOf ? P.ix.entry.get(e.aliasOf) : e; if (r && !roots.has(r.id)) roots.set(r.id, { r, d: effRec(P, r, t.id) || 5 }); }
  const xs = [...roots.values()]; if (!xs.length) continue;
  xs.sort((a, b) => a.d - b.d || a.r.text.localeCompare(b.r.text));
  const easy = xs.filter(x => x.d <= 3).length / xs.length, named = xs.filter(x => NAMED.has(x.r.type)).length / xs.length;
  const txt = x => `${x.r.show?.[t.id] || x.r.text}(${x.d})`;
  const pick = [...xs.slice(0, 6), ...xs.slice(-4)].filter((x, i, a) => a.indexOf(x) === i);
  rows.push(`${t.id} | ${t.name} | ${t.tkind || 'category'} | pop ${t.pop} | ${xs.length} words | easy ${Math.round(easy * 100)}% | named ${Math.round(named * 100)}% | ${pick.map(txt).join(', ')}`);
}
const sz = Math.ceil(rows.length / n);
for (let i = 0; i < n; i++) fs.writeFileSync(here(`./pop/list-${i + 1}.txt`), rows.slice(i * sz, (i + 1) * sz).join('\n') + '\n');
console.log(rows.length + ' themes in ' + n + ' chunks of about ' + sz);

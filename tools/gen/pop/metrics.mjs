// Draft theme-popularity check: for each theme, share of root words that are easy (difficulty 1-2) and share that are named things.
// Run: node tools/gen/pop/metrics.mjs   (writes tools/gen/pop/metrics.tsv)
import fs from 'node:fs';
import { parseProject } from '../../../js/store.js';
import { reindex, effRec } from '../../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const NAMED = new Set(['person', 'place', 'org', 'title', 'proper']);
const rows = [];
for (const t of P.themes) {
  if (t.group || t.enabled === false) continue;
  const roots = new Map();
  for (const e of P.ix.byTheme.get(t.id) || []) { if (!e.enabled) continue; const r = e.aliasOf ? P.ix.entry.get(e.aliasOf) : e; if (r && !roots.has(r.id)) roots.set(r.id, effRec(P, r, t.id) || 5); }
  const n = roots.size; if (!n) continue;
  const easy = [...roots.values()].filter(v => v <= 3).length / n;
  const named = [...roots.keys()].filter(id => NAMED.has(P.ix.entry.get(id).type)).length / n;
  const cur = t.pop || 3;
  let want = cur, why = '';
  if (named >= 0.5 && cur < 3) { want = 3; why = 'named things'; }
  else if (easy < 0.45 && cur < 2) { want = 2; why = 'few easy words'; }
  else if (cur >= 2 && named < 0.2 && easy >= 0.75) { want = cur - 1; why = 'candidate: everyday, easy words'; }
  rows.push({ id: t.id, name: t.name, kind: t.tkind || 'category', n, cur, easy, named, want, why });
}
fs.writeFileSync(new URL('./metrics.tsv', import.meta.url), 'id\tname\tkind\twords\tpop\teasy\tnamed\tproposed\twhy\n' + rows.map(r => [r.id, r.name, r.kind, r.n, r.cur, r.easy.toFixed(2), r.named.toFixed(2), r.want, r.why].join('\t')).join('\n'));
const cnt = f => rows.filter(f).length;
console.log('themes', rows.length, 'demote', cnt(r => r.want > r.cur), 'promote candidates', cnt(r => r.want < r.cur));
for (const p of [1, 2, 3, 4, 5]) console.log('pop', p, 'now', cnt(r => r.cur === p), 'median easy', rows.filter(r => r.cur === p).map(r => r.easy).sort((a, b) => a - b)[cnt(r => r.cur === p) >> 1]?.toFixed(2));
for (const id of ['egypt', 'ancient_egypt', 'famous_ships', 'nuts', 'dairy', 'herbs']) { const r = rows.find(r => r.id === id || r.name.toLowerCase() === id.replace('_', ' ')); console.log(id, r ? JSON.stringify(r) : 'none'); }
console.log('--demotions from 1:', rows.filter(r => r.cur === 1 && r.want > 1).length, rows.filter(r => r.cur === 1 && r.want > 1).slice(0, 25).map(r => `${r.name}(${r.easy.toFixed(2)}/${r.named.toFixed(2)})`).join('; '));
console.log('--promotions to 1:', rows.filter(r => r.cur === 2 && r.want === 1).length, rows.filter(r => r.cur === 2 && r.want === 1).slice(0, 40).map(r => `${r.name}(${r.easy.toFixed(2)})`).join('; '));

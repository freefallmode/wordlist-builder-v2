// Lists the playable (non-group) themes at tree depth 3 under a root, in chunks, for writing a word batch.
// Run: node tools/gen/list-depth.mjs                  chunk counts per root
//      node tools/gen/list-depth.mjs <rootId> <n>     chunk n (1-based) of that root, with each theme's path, notes, flags, sub-themes and the words it already has
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
reindex(P);
const SIZE = 30;
const depth = t => { let d = 1, x = t; while (x.parent) { x = P.ix.theme.get(x.parent); d++; } return d; };
const under = rootId => P.themes.filter(t => { let x = t; while (x.parent) x = P.ix.theme.get(x.parent); return x.id === rootId; });
const chunksOf = rootId => { const l = under(rootId).filter(t => depth(t) === 3 && !t.group); return Array.from({ length: Math.ceil(l.length / SIZE) }, (_, i) => l.slice(i * SIZE, (i + 1) * SIZE)); };
const [root, n] = process.argv.slice(2);
if (!root) { for (const r of P.ix.kids.get('')) console.log(r.id.padEnd(22), chunksOf(r.id).length, 'chunks'); process.exit(); }
const chunk = chunksOf(root)[n - 1];
if (!chunk) throw Error('no such chunk');
for (const t of chunk) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',') + (t.region.length ? ' region:' + t.region.join('/') : '');
  const kids = P.ix.kids.get(t.id) || [];
  console.log(`${t.id}  "${path.join(' > ')}"  d:${t.d || '?'}  ${flags}${t.note ? '  note: ' + t.note : ''}${kids.length ? '  sub-themes: ' + kids.map(k => k.name).join(' | ') : ''}`);
}

// Lists themes for the "stands alone" naming review: node tools/gen/rename-make.mjs [<n>]   (no n: number of chunks)
// Per theme: id | path in the tree | name | words | flags, then a few typical words. Frozen listings are written by redirecting the output.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const tree = []; const walk = id => { for (const t of P.ix.kids.get(id) || []) { tree.push(t); walk(t.id); } }; walk('');
const list = tree.filter(t => !t.group);
const SIZE = 260, chunks = []; for (let i = 0; i < list.length; i += SIZE) chunks.push(list.slice(i, i + SIZE));
const n = +process.argv[2]; if (!n) { console.log(chunks.length, 'chunks;', list.length, 'themes'); process.exit(); }
for (const t of chunks[n - 1]) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  const es = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf).sort((a, b) => (a.typ[t.id] || 9) - (b.typ[t.id] || 9) || (a.fam || 9) - (b.fam || 9));
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',');
  console.log(`${t.id} | ${path.join(' > ')} | ${es.length} words${flags ? ' | ' + flags : ''}${t.note ? ' | note: ' + t.note : ''}\n   ${es.slice(0, 7).map(e => e.text).join(', ')}`);
}

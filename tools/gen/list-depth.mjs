// Lists the playable (non-group) themes at tree depth 3 under a root, in chunks, for writing a word batch.
// Run: node tools/gen/list-depth.mjs                  chunk counts per root
//      node tools/gen/list-depth.mjs <rootId> <n> [rest]     chunk n (with rest: the still-empty themes instead of depth 3) (1-based) of that root, with each theme's path, notes, flags, sub-themes and the words it already has
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
reindex(P);
const SIZE = 30;
const depth = t => { let d = 1, x = t; while (x.parent) { x = P.ix.theme.get(x.parent); d++; } return d; };
const under = rootId => P.themes.filter(t => { let x = t; while (x.parent) x = P.ix.theme.get(x.parent); return x.id === rootId; });
const [root, n, mode] = process.argv.slice(2);
const words = new Map(); for (const e of P.entries) if (!e.aliasOf) for (const t of Object.keys(e.typ)) words.set(t, (words.get(t) || 0) + 1);
// mode 'rest': every playable theme of the root still holding fewer than 4 words (depth 4 and deeper, plus strays), instead of the depth-3 themes
const chunksOf = rootId => { const l = under(rootId).filter(t => !t.group && (mode === 'rest' ? (words.get(t.id) || 0) < 4 : depth(t) === 3)); return Array.from({ length: Math.ceil(l.length / SIZE) }, (_, i) => l.slice(i * SIZE, (i + 1) * SIZE)); };
if (!root) { for (const r of P.ix.kids.get('')) console.log(r.id.padEnd(22), chunksOf(r.id).length, 'chunks'); process.exit(); }
const chunk = chunksOf(root)[n - 1];
if (!chunk) throw Error('no such chunk');
for (const t of chunk) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',') + (t.region.length ? ' region:' + t.region.join('/') : '');
  const kids = P.ix.kids.get(t.id) || [];
  console.log(`${t.id}  "${path.join(' > ')}"  d:${t.d || '?'}  ${flags}${t.note ? '  note: ' + t.note : ''}${kids.length ? '  sub-themes: ' + kids.map(k => k.name).join(' | ') : ''}`);
}

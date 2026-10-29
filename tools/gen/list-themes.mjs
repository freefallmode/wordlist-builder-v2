// Prints the level-2 themes under a root group, with their sub-themes and notes, for writing a word batch.
// Run: node tools/gen/list-themes.mjs <rootId>      (no argument lists the roots)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
reindex(P);
const root = process.argv[2];
if (!root) { for (const t of P.ix.kids.get('')) console.log(t.id, '-', t.name); process.exit(); }
const n = id => (P.ix.byTheme.get(id) || []).length;
for (const t of P.ix.kids.get(root) || []) {
  const kids = P.ix.kids.get(t.id) || [];
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',') + (t.region.length ? ' region:' + t.region.join('/') : '');
  console.log(`${t.group ? 'GROUP (skip)' : 'THEME'}  ${t.id}  "${t.name}"  words:${n(t.id)}  ${flags}${t.note ? '  note: ' + t.note : ''}`);
  if (kids.length) console.log('    sub-themes: ' + kids.map(k => k.name + (k.complete ? ' [complete]' : '') + (k.adult ? ' [adult]' : '') + (k.sensitive ? ' [sensitive]' : '') + (k.tm ? ' [tm]' : '') + (k.lang ? ' [lang]' : '')).join(' | '));
}

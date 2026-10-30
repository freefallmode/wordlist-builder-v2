// Lists themes whose entries look mistagged as nouns although the same text is tagged as a verb or adjective elsewhere in the library.
// Run: node tools/gen/pos-gap.mjs [min count, default 3]
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { norm, EXEMPT } from './pos-lib.mjs';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const MIN = +process.argv[2] || 3, other = new Map();
for (const e of P.entries) { const p = norm(e); if (!e.aliasOf && (p === 'verb' || p === 'adjective')) { const k = e.text.toLowerCase(); (other.get(k) || other.set(k, new Set()).get(k)).add(p); } }
let n = 0;
for (const t of P.themes) {
  if (t.group || EXEMPT(t)) continue;
  const roots = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.type !== 'phrase');
  const hits = roots.filter(e => norm(e) === 'noun' && other.has(e.text.toLowerCase()));
  if (hits.length >= MIN) { n++; console.log(`${t.id}\t${hits.length}/${roots.length}\t${hits.slice(0, 8).map(e => e.text + ':' + [...other.get(e.text.toLowerCase())][0][0]).join(', ')}`); }
}
console.log(n, 'themes');

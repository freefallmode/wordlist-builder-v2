// Lists aliases whose text is just the root's text with words added or removed ("sense of smell" for "smell", "the Netherlands" for "Netherlands").
// Run: node tools/gen/alias-extra.mjs [library] [out.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(readFileSync(process.argv[2] || new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const norm = t => ` ${t.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim()} `;
const out = [];
for (const a of P.entries) {
  if (!a.aliasOf) continue; const r = P.ix.entry.get(a.aliasOf); if (!r) continue;
  const x = norm(a.text), y = norm(r.text);
  if (x !== y && (x.includes(y) || y.includes(x))) out.push({ id: a.id, alias: a.text, kind: a.aliasKind, root: r.text, rootGloss: r.gloss, rootId: r.id, themes: Object.keys(a.th).length });
}
console.log(out.length, 'aliases'); if (process.argv[3]) writeFileSync(process.argv[3], JSON.stringify(out, null, 1));

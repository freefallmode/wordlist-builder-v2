// Lists themes where one entry's text contains another entry's text as whole words (e.g. "smell" and "sense of smell").
// Run: node tools/gen/near-dups.mjs [library] [--aliases]
import { readFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const P = parseProject(readFileSync(process.argv[2] || new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const by = new Map(); for (const e of P.entries) for (const t of linkIds(P, e)) (by.get(t) || by.set(t, []).get(t)).push(e);
let n = 0;
for (const [t, es] of by) {
  const w = es.map(e => ({ e, s: ` ${e.text.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim()} ` }));
  for (const a of w) for (const b of w) if (a !== b && a.s.length < b.s.length && b.s.includes(a.s) && a.e.aliasOf !== b.e.id && b.e.aliasOf !== a.e.id && !(a.e.aliasOf && a.e.aliasOf === b.e.aliasOf)) { console.log(`${t}: "${a.e.text}" in "${b.e.text}"`); n++; }
}
console.error(n, 'pairs');

// Lists the entries that still need a meaning label: groups of entries with the same text where one has none.
// Run: node tools/gen/needs-gloss.mjs
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const by = new Map();
for (const e of P.entries) { const k = e.text.trim().toLowerCase(); (by.get(k) || by.set(k, []).get(k)).push(e); }
for (const g of by.values()) {
  if (g.length < 2 || g.every(e => e.gloss)) continue;
  console.log('--', g[0].text);
  for (const e of g) console.log(`  ${e.id}\t${e.gloss ? '(' + e.gloss + ')' : '[NO LABEL]'}\t${e.aliasOf ? e.aliasKind + ' of ' + P.ix.entry.get(e.aliasOf)?.text : 'root'}\t${Object.keys(e.typ).slice(0, 4).join(',')}`);
}

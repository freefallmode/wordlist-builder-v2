// One-off (2026-11-01): foreign-language names that the synonym run promoted to entries (or that were entries before it) become `translation` aliases of their English roots.
// Their theme links are already the root's; any extra link moves to the root. They leave their synonym groups. Run once: node tools/gen/syn-translations.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// alias id -> root id
const PAIRS = { 36153: 2164, 36151: 2145, 36152: 2146, 2166: 2165, 2134: 2133, 2152: 2151, 2148: 2147, 2144: 2143,
  36149: 49, 36150: 48, 2245: 2244, 2256: 2255, 2223: 2222, 2271: 2270, 2273: 2272, 36142: 35741,
  59439: 7532, 59440: 7531, 62342: 7586, 62344: 25816, 62341: 7587, 55879: 55878, 6362: 6361 };
let n = 0;
for (const [aid, rid] of Object.entries(PAIRS)) {
  const e = P.ix.entry.get(+aid), r = P.ix.entry.get(rid);
  if (!e || !r || e.aliasOf) { console.log('skip', aid, rid); continue; }
  for (const [t, p] of Object.entries(e.th)) if (r.th[t] === undefined) r.th[t] = p;
  e.th = {}; e.use = {}; e.show = {}; e.aliasOf = r.id; e.aliasKind = 'translation'; n++;
}
const gone = new Set(Object.keys(PAIRS).map(Number));
for (const t of P.themes) if (t.groups) { t.groups = t.groups.map(g => g.filter(id => !gone.has(id))).filter(g => g.length > 1); if (!t.groups.length) delete t.groups; }
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
console.log(n, 'translation aliases, library v' + P.lib.version);

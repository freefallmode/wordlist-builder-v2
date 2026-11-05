// Spreads theme popularity to the target shares (10/25/35/20/10 % for 1..5) across the library.
// Themes keep their order: sorted by the rating the generator gave, ties broken by how popular the theme's own words are (mean word popularity, lower first), then cut into the target shares.
// Run: node tools/gen/pop-normalise.mjs [--apply]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);
const SHARE = [0.10, 0.25, 0.35, 0.20, 0.10];
const sum = new Map(), cnt = new Map();
for (const e of P.entries) if (!e.aliasOf) for (const [t, v] of Object.entries(e.typ)) { sum.set(t, (sum.get(t) || 0) + v); cnt.set(t, (cnt.get(t) || 0) + 1); }
const rated = P.themes.filter(t => !t.group && t.pop);
const key = t => t.pop + (cnt.get(t.id) ? sum.get(t.id) / cnt.get(t.id) / 10 : 0.25);   // mean word popularity (1..5) / 10 never crosses a whole rating step
rated.sort((a, b) => key(a) - key(b));
const n = rated.length, cuts = []; let acc = 0;
for (const s of SHARE) { acc += s; cuts.push(Math.round(acc * n)); }
const before = [0, 0, 0, 0, 0, 0], after = [0, 0, 0, 0, 0, 0], moved = {};
rated.forEach((t, i) => {
  const np = cuts.findIndex(c => i < c) + 1;
  before[t.pop]++; after[np]++;
  if (np !== t.pop) { const k = t.pop + '->' + np; moved[k] = (moved[k] || 0) + 1; t.newPop = np; }
});
console.log('before', before.slice(1).join(' '), '\nafter ', after.slice(1).join(' '), '\nmoved', JSON.stringify(moved));
if (process.argv[2] === '--apply') {
  for (const t of rated) if (t.newPop) { t.pop = t.newPop; }
  for (const t of rated) delete t.newPop;
  stampSave(P); writeFileSync(LIB, serializeProject(P)); console.log('applied, v' + P.lib.version);
}

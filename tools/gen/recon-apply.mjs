// Applies tools/gen/recon/out-*.json (merge / gloss ops from the review agents) to a library file in place.
// Run: node tools/gen/recon-apply.mjs <library file>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const lib = process.argv[2];
const P = parseProject(readFileSync(lib, 'utf8')); reindex(P);
const dir = new URL('recon/', import.meta.url);
const ops = readdirSync(dir).filter(f => /^out-\d+\.json$/.test(f)).flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')));
const E = id => P.ix.entry.get(id);
let g = 0, m = 0, skipped = 0;
for (const o of ops) if (o.gloss !== undefined) { const e = E(o.id); if (!e) { skipped++; continue; } e.gloss = o.gloss; g++; }
const fwd = new Map(); const dest = id => { while (fwd.has(id)) id = fwd.get(id); return id; };
for (const o of ops) if (o.merge !== undefined) {
  const s = E(dest(o.id)), t = E(dest(o.merge));
  if (!s || !t || s === t) { skipped++; continue; }
  for (const [th, v] of Object.entries(s.typ)) if (t.typ[th] === undefined) t.typ[th] = v;
  for (const a of P.entries) if (a.aliasOf === s.id) a.aliasOf = t.id;
  t.adult ||= s.adult; t.sensitive ||= s.sensitive; t.tm ||= s.tm; t.vulgar ||= s.vulgar;
  fwd.set(s.id, t.id); P.entries = P.entries.filter(x => x !== s); reindex(P); m++;
}
reindex(P); stampSave(P); writeFileSync(lib, serializeProject(P));
const errs = validate(P).filter(i => i.sev === 'error');
console.log(`${g} glossed, ${m} merged, ${skipped} skipped; ${errs.length} errors remain`);
for (const i of errs.slice(0, 40)) console.log(i.kind, i.msg);

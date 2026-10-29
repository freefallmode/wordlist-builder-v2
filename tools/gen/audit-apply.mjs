// Applies tools/gen/recon/audit-out-*.json ops (keep + split) to a library file in place.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const lib = process.argv[2], P = parseProject(readFileSync(lib, 'utf8')); reindex(P);
const dir = new URL('recon/', import.meta.url);
const ops = readdirSync(dir).filter(f => /^audit-out-\d+\.json$/.test(f)).flatMap(f => JSON.parse(readFileSync(new URL(f, dir), 'utf8')));
let n = 0, skipped = 0;
for (const o of ops) {
  const e = P.ix.entry.get(o.id); if (!e || e.gloss || !o.keep) { skipped++; continue; }
  const groups = (o.split || []).map(g => ({ ...g, themes: g.themes.filter(t => e.th[t] !== undefined) })).filter(g => g.themes.length && g.gloss && g.gloss !== o.keep);
  if (!groups.length) { skipped++; continue; }
  e.gloss = o.keep;
  for (const g of groups) { const th = {}; for (const t of g.themes) { th[t] = e.th[t]; delete e.th[t]; }
    addEntry(P, e.text, { gloss: g.gloss, pos: e.pos, type: g.type || e.type, rec: e.rec, th, tm: e.tm, adult: e.adult, sensitive: e.sensitive, vulgar: e.vulgar, region: e.region, status: 'gen' }); reindex(P); n++; }
}
reindex(P); stampSave(P); writeFileSync(lib, serializeProject(P));
const errs = validate(P).filter(i => i.sev === 'error');
console.log(`${ops.length} ops, ${n} new entries, ${skipped} skipped; ${errs.length} errors`); for (const i of errs.slice(0, 30)) console.log(i.kind, i.msg);

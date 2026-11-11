// Lists themes with no region tag (own or inherited) for agents working under BRIEF-regtag.md.
// Run: node tools/gen/regtag-make.mjs [chunks=8]   writes tools/gen/regtag/list-<n>.txt
// Themes already reviewed are in tools/gen/regtag/done.json (regtag-apply.mjs adds them), so only new themes are listed next time.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, difficultyBand, eff } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const n = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 8;
const doneFile = here('./regtag/done.json'), done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const rows = [];
for (const t of P.themes) {
  const ef = eff(P, t.id);
  if (!ef.enabled || ef.region.length || done.has(t.id) || t.lang) continue;
  const parent = t.parent ? P.ix.theme.get(t.parent)?.name : '';
  if (t.group) { rows.push(`${t.id} | ${t.name} | in ${parent || '-'} | folder`); continue; }
  const roots = new Map();
  for (const e of P.ix.byTheme.get(t.id) || []) { if (!e.enabled) continue; const r = e.aliasOf ? P.ix.entry.get(e.aliasOf) : e; if (r && !roots.has(r.id)) roots.set(r.id, r); }
  const xs = [...roots.values()]; if (!xs.length) continue;
  xs.sort((a, b) => (a.typ[t.id] ?? 9) - (b.typ[t.id] ?? 9) || a.text.localeCompare(b.text));
  rows.push(`${t.id} | ${t.name} | in ${parent || '-'} | ${t.tkind || 'category'} | ${xs.slice(0, 8).map(r => r.show?.[t.id] || r.text).join(', ')}`);
}
const sz = Math.ceil(rows.length / n);
for (let i = 0; i < n; i++) fs.writeFileSync(here(`./regtag/list-${i + 1}.txt`), rows.slice(i * sz, (i + 1) * sz).join('\n') + '\n');
console.log(rows.length + ' themes in ' + n + ' chunks of about ' + sz);

// Lists words of region-tied themes whose familiarity (`fam`) is 3 or lower, for agents re-rating them for a general US/UK adult under BRIEF-regrec.md.
// A region-tied theme is one whose own or inherited region tags do not include both US and UK.
// Run: node tools/gen/regrec-make.mjs [chunks=10]   writes tools/gen/regrec/list-<n>.txt
// Reviewed entries are in tools/gen/regrec/done.json (regrec-apply.mjs adds them).
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, eff } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const n = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 10;
const doneFile = here('./regrec/done.json'), done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const tied = new Map();
for (const t of P.themes) { if (t.group) continue; const ef = eff(P, t.id); if (ef.enabled && ef.region.length && !(ef.region.includes('US') && ef.region.includes('UK'))) tied.set(t.id, ef.region); }
const rows = [];
for (const e of P.entries) {
  if (e.aliasOf || !e.enabled || !e.fam || e.fam > 3 || done.has(e.id)) continue;
  const ts = Object.keys(e.typ).filter(t => tied.has(t)); if (!ts.length) continue;
  const tn = ts.slice(0, 2).map(t => `${P.ix.theme.get(t).name} (${tied.get(t).join(',')})`).join(' / ');
  rows.push(`${e.id} | ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''} | ${e.type || 'common'} | fam ${e.fam} | ${tn}${e.region.length ? ' | word region ' + e.region.join(',') : ''}`);
}
const sz = Math.ceil(rows.length / n);
for (let i = 0; i < n; i++) fs.writeFileSync(here(`./regrec/list-${i + 1}.txt`), rows.slice(i * sz, (i + 1) * sz).join('\n') + '\n');
console.log(rows.length + ' entries in ' + n + ' chunks of about ' + sz);

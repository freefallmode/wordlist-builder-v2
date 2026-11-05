// Lists the members of compound themes ("___ room", "fire ___") for the full-term migration (BRIEF-compound.md): the bare word each theme links, the full term it stands for, and the existing entry for that term if any.
// Run: node tools/gen/compound-make.mjs [--themes blank_room,blank_time] [chunks=1]   -> tools/gen/compound/list-N.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, typicality } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const arg = n => process.argv.includes(n) ? process.argv[process.argv.indexOf(n) + 1] : '';
const only = arg('--themes') ? arg('--themes').split(',') : null, N = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 1;
const byText = new Map(); for (const e of P.entries) { if (e.aliasOf) continue; const k = e.text.toLowerCase(); (byText.get(k) || byText.set(k, []).get(k)).push(e); }
const flags = e => ['adult', 'sensitive', 'tm', 'vulgar'].filter(f => e[f]).join(',') || '-';
const desc = e => `${e.id} [${e.gloss || ''}] ${e.pos} ${e.type} rec ${e.fam} flags ${flags(e)} region ${(e.region || []).join(',') || '-'} in ${Object.keys(e.typ).length} themes`;
const blocks = [];
for (const t of P.themes.filter(t => t.tkind === 'compound' && (!only || only.includes(t.id)))) {
  const m = /^compound-(end|start):(.+)$/.exec(t.rule || ''); if (!m) continue; const [, dir, w] = m, out = [`T ${t.id} | ${t.name} | ${dir === 'end' ? '___ ' + w : w + ' ___'}`];
  for (const e of P.ix.byTheme.get(t.id) || []) {
    if (e.aliasOf) continue; const b = e.show?.[t.id] || e.text;
    if (b.toLowerCase().includes(w.toLowerCase())) { out.push(`${e.id} | ${b} | CLOSED (already the full term)`); continue; }
    const full = (dir === 'end' ? [b + ' ' + w, b + '-' + w, b + w] : [w + ' ' + b, w + '-' + b, w + b]).map(c => c.toLowerCase()), hit = full.flatMap(c => byText.get(c) || []);
    out.push(`${e.id} | ${b} -> ${full[0]} | bare: ${desc(e)}, link ${typicality(P, e, t.id) || '-'} | ${hit.length ? 'EXISTS: ' + hit.map(desc).join(' ; ') : 'NEW'}`);
  }
  blocks.push(out.join('\n'));
}
const per = Math.ceil(blocks.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(here(`./compound/list-${i + 1}.txt`), blocks.slice(i * per, (i + 1) * per).join('\n\n') + '\n');
console.log(blocks.length + ' themes, ' + blocks.join('\n').split('\n').filter(l => /\| (EXISTS|NEW)/.test(l) || /EXISTS|NEW$/.test(l)).length + ' links');

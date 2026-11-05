// Lists overlap pairs (a word inside a longer entry of the same theme) for agents working under BRIEF-overlap.md.
// Run: node tools/gen/overlap-make.mjs [chunks=12]   writes tools/gen/overlap/list-<n>.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, eff } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const n = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 12;
const toks = s => s.toLowerCase().match(/[a-z0-9]+/g) || [];
const hasRun = (big, small) => { for (let i = 0; i + small.length <= big.length; i++) if (small.every((w, j) => big[i + j] === w)) return true; return false; };
const blocks = [];
for (const t of P.themes) {
  if (t.group || !eff(P, t.id).enabled) continue;
  const list = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.enabled).map(e => ({ e, txt: e.show?.[t.id] || e.text })).map(x => ({ ...x, w: toks(x.txt) })).filter(x => x.w.length);
  const grouped = new Map(); for (const g of t.groups || []) for (const id of g) grouped.set(id, g);
  const fmt = x => `${x.e.id} ${x.txt}${x.e.gloss ? ' [' + x.e.gloss + ']' : ''} (${x.e.type || 'common'}, rec ${x.e.fam || '-'}${x.e.tm ? ', brand' : ''}, in ${Object.keys(x.e.typ).length} themes)`;
  const lines = [];
  for (const a of list) {
    const bs = list.filter(b => a.w.length < b.w.length && hasRun(b.w, a.w) && !(grouped.has(a.e.id) && grouped.get(a.e.id) === grouped.get(b.e.id)));
    if (bs.length) lines.push('A ' + fmt(a), ...bs.map(b => '  B ' + fmt(b)));
  }
  if (lines.length) blocks.push({ size: lines.length, text: `T ${t.id} | ${t.name} | ${list.length} words${t.note ? ' | note: ' + t.note.slice(0, 120) : ''}\n${lines.join('\n')}\n` });
}
const total = blocks.reduce((s, b) => s + b.size, 0), per = Math.ceil(total / n);
const files = Array.from({ length: n }, () => []); let f = 0, acc = 0;
for (const b of blocks) { if (acc >= per && f < n - 1) { f++; acc = 0; } files[f].push(b.text); acc += b.size; }
files.forEach((c, i) => fs.writeFileSync(here(`./overlap/list-${i + 1}.txt`), c.join('\n')));
console.log(blocks.length + ' themes, ' + total + ' lines, sizes', files.map(c => c.length).join(','));

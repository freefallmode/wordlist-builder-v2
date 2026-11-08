// Lists themes with their words for agents finding words that mean the same in that theme but are not yet in a synonym group (subtract / minus / subtraction), under BRIEF-syn3.md.
// Run: node tools/gen/syn3-make.mjs [chunks=24] [--under <theme id>]   writes tools/gen/syn3/list-<n>.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, eff } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const args = process.argv.slice(2), ui = args.indexOf('--under'), under = ui >= 0 ? args[ui + 1] : null;
const n = +args.find(a => /^\d+$/.test(a)) || 24;
const inUnder = t => { for (let x = t; x; x = P.ix.theme.get(x.parent)) if (x.id === under) return true; return false; };
const blocks = [];
for (const t of P.themes) {
  if (t.group || !eff(P, t.id).enabled || eff(P, t.id).lang || (under && !inUnder(t))) continue;   // language themes (word puzzles) declare no groups
  const es = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.enabled);
  if (es.length < 2) continue;
  const grouped = (t.groups || []).map(g => g.join(' ')).join('; ');
  blocks.push({ size: Math.ceil(es.length / 10) + 1, text: `T ${t.id} | ${t.name}${t.note ? ' | ' + t.note : ''}\nW: ${es.map(e => `${e.id} ${e.show?.[t.id] || e.text}${e.gloss ? ' [' + e.gloss + ']' : ''}${e.pos && e.pos !== 'noun' ? ' (' + e.pos + ')' : ''}`).join('; ')}${grouped ? '\nG: ' + grouped : ''}\n` });
}
const total = blocks.reduce((s, b) => s + b.size, 0), per = Math.ceil(total / n), files = Array.from({ length: n }, () => []); let f = 0, acc = 0;
for (const b of blocks) { if (acc >= per && f < n - 1) { f++; acc = 0; } files[f].push(b.text); acc += b.size; }
fs.mkdirSync(here('./syn3/'), { recursive: true });
files.forEach((c, i) => fs.writeFileSync(here(`./syn3/list-${i + 1}.txt`), c.join('\n')));
console.log(blocks.length + ' themes; per file', files.map(c => c.length).join(','));

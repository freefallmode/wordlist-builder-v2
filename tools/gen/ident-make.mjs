// Lists the themes whose identifiability needs a judgement (wordplay, compound, property, and category themes with a broad "things" name) for agents working under BRIEF-ident.md.
// Run: node tools/gen/ident-make.mjs [chunks=6] [--all]   -> tools/gen/ident/list-N.txt   (--all also lists themes already rated)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, popIn } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const C = +process.argv[2] || 6, ALL = process.argv.includes('--all'), REST = process.argv.includes('--rest');   // --rest: every other unrated theme (places, plain categories, sub-themes), numbered after the existing lists
const items = [];
for (const t of P.themes) {
  if (t.group || t.enabled === false) continue;
  const k = t.tkind || 'category';
  if (!REST && (k === 'place' || (k === 'category' && !/ things$|^things /.test(t.name)))) continue;
  if (t.ident && !ALL) continue;
  const mine = (P.ix.byTheme.get(t.id) || []).filter(e => e.enabled && !e.aliasOf);
  const ws = mine.map(e => ({ s: e.show?.[t.id] || e.text, p: popIn(P, e, t.id) || 3 })).sort((a, b) => a.p - b.p || a.s.length - b.s.length);
  items.push({ t, k, n: mine.length, sample: ws.slice(0, 8).map(w => w.s) });
}
fs.mkdirSync(here('./ident/'), { recursive: true });
const per = Math.ceil(items.length / C);
let first = 1; if (REST) while (fs.existsSync(here(`./ident/list-${first}.txt`))) first++;
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./ident/list-${first + c}.txt`), items.slice(c * per, (c + 1) * per).map(({ t, k, n, sample }) =>
  `${t.id} | ${t.name} | ${k}${t.rule ? ' ' + t.rule : ''} | pop ${t.pop || '-'} | ${n} words${t.note ? ' | note: ' + t.note.slice(0, 120) : ''}\n   e.g. ${sample.join(', ')}`).join('\n') + '\n');
console.log(items.length + ' themes listed in ' + C + ' files');

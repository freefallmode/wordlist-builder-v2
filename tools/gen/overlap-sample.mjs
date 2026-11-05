// Samples overlap pairs (one word inside another in the same theme, as validate.js 'overlap' finds them) for review by agents.
// Run: node tools/gen/overlap-sample.mjs [count=300] [chunks=2]   -> tools/gen/overlap/sample-N.txt (a fixed random seed, so the sample is repeatable)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, eff, typicality } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const ALL = process.argv[2] === 'all', N = ALL ? Infinity : +process.argv[2] || 300, C = +process.argv[3] || 2, DIR = process.argv[4] || 'overlap', PFX = ALL ? 'list' : 'sample';   // all: every pair in theme order (a full pass), chunked: node tools/gen/overlap-sample.mjs all 19 overlap3
const toks = s => s.toLowerCase().match(/[a-z0-9]+/g) || [];
const hasRun = (big, small) => { for (let i = 0; i + small.length <= big.length; i++) if (small.every((w, j) => big[i + j] === w)) return true; return false; };
const pairs = [];
for (const t of P.themes) {
  if (t.group || !eff(P, t.id).enabled) continue;
  const list = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.enabled).map(e => ({ e, w: toks(e.show?.[t.id] || e.text) })).filter(x => x.w.length);
  const grouped = new Map(); for (const g of t.groups || []) for (const id of g) grouped.set(id, g);
  for (const a of list) for (const b of list) {
    if (a.w.length >= b.w.length || !hasRun(b.w, a.w) || grouped.get(a.e.id) === grouped.get(b.e.id) && grouped.has(a.e.id)) continue;
    pairs.push({ t, a: a.e, b: b.e });
  }
}
let seed = 20261105; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
if (!ALL) for (let i = pairs.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pairs[i], pairs[j]] = [pairs[j], pairs[i]]; }
const pick = pairs.slice(0, N);
const d = (t, e) => `${e.id} "${e.show?.[t.id] || e.text}"${e.show?.[t.id] ? ' (full: ' + e.text + ')' : ''}${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.pos} ${e.type} rec ${e.fam} link ${typicality(P, e, t.id) || '-'}`;
fs.mkdirSync(here('./' + DIR + '/'), { recursive: true });
const per = Math.ceil(pick.length / C);
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./${DIR}/${PFX}-${c + 1}.txt`), pick.slice(c * per, (c + 1) * per).map(({ t, a, b }, i) => `${c * per + i + 1} | theme ${t.id} "${t.name}"${t.note ? ' (note: ' + t.note.slice(0, 120) + ')' : ''}\n   SHORT ${d(t, a)}\n   LONG  ${d(t, b)}`).join('\n') + '\n');
console.log(pairs.length + ' pairs in total, sampled ' + pick.length + ' into ' + C + ' files');

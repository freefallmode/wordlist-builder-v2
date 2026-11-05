// Compares a second, blind identifiability pass (tools/gen/ident2/r-<n>.txt) with the ratings in the library.
// Run: node tools/gen/ident-compare.mjs [--apply=new|avg]   (no --apply: report only)
//   new  the second pass replaces the library rating
//   avg  the rounded mean of the two passes (halves round toward the second pass)
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const mode = (process.argv.find(a => a.startsWith('--apply=')) || '').split('=')[1];
const second = new Map(); let bad = 0;
for (let i = 1; fs.existsSync(here(`./ident2/list-${i}.txt`)); i++) {
  if (!fs.existsSync(here(`./ident2/r-${i}.txt`))) { console.log('no result file for chunk ' + i); continue; }
  const listed = new Set(fs.readFileSync(here(`./ident2/list-${i}.txt`), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith(' ')).map(l => l.split(' | ')[0]));
  for (const l of fs.readFileSync(here(`./ident2/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim() || l.startsWith('#')) continue;
    const m = /^(\S+)\s+([1-5])\s*$/.exec(l.trim());
    if (!m || !listed.has(m[1])) { bad++; console.log('bad line r-' + i + ': ' + l); continue; }
    second.set(m[1], +m[2]);
  }
}
const mat = Array.from({ length: 6 }, () => Array(6).fill(0)), dist1 = [0, 0, 0, 0, 0, 0], dist2 = [0, 0, 0, 0, 0, 0], finalDist = [0, 0, 0, 0, 0, 0];
let missing = 0, changed = 0; const big = [];
for (const t of P.themes) {
  if (t.group || t.enabled === false) continue;
  const b = second.get(t.id), a = t.ident;
  if (!b) { missing++; continue; }
  mat[a][b]++; dist1[a]++; dist2[b]++;
  if (Math.abs(a - b) >= 2) big.push(`${a}->${b} ${t.tkind || 'cat'} ${t.name}`);
  const f = mode === 'new' ? b : mode === 'avg' ? (a + b) / 2 === Math.floor((a + b) / 2) ? (a + b) / 2 : b > a ? Math.ceil((a + b) / 2) : Math.floor((a + b) / 2) : a;
  finalDist[f]++; if (f !== a) { changed++; if (mode) t.ident = f; }
}
console.log({ rated: second.size, missing, bad });
console.log('rows = first pass, columns = second pass');
console.log('      ' + [1, 2, 3, 4, 5].map(n => String(n).padStart(6)).join(''));
for (let a = 1; a <= 5; a++) console.log(String(a).padStart(4) + '  ' + [1, 2, 3, 4, 5].map(b => String(mat[a][b]).padStart(6)).join(''));
const agree = [1, 2, 3, 4, 5].reduce((s, n) => s + mat[n][n], 0), within1 = [1, 2, 3, 4, 5].reduce((s, a) => s + [1, 2, 3, 4, 5].filter(b => Math.abs(a - b) <= 1).reduce((x, b) => x + mat[a][b], 0), 0), tot = second.size - missing;
console.log(`exact agreement ${agree}/${tot} (${(100 * agree / tot).toFixed(0)}%), within 1: ${within1}/${tot} (${(100 * within1 / tot).toFixed(0)}%), differ by 2+: ${big.length}`);
console.log('first pass ', dist1.slice(1).join(' '), '| second pass', dist2.slice(1).join(' '), mode ? '| result ' + finalDist.slice(1).join(' ') + ' (' + changed + ' changed)' : '');
if (process.argv.includes('--list-big')) console.log(big.join('\n'));
if (mode) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

// Lists the bare members of kinds themes (types of X, X breeds ...) for review by agents (BRIEF-bare.md): is the bare word a modifier only (oat in types of milk) or does it name the thing (merino)?
// Run: node tools/gen/bare-sample.mjs [count|all] [chunks=2] [dir=bare]   -> tools/gen/<dir>/list-N.txt (fixed seed)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, popIn } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const ALL = process.argv[2] === 'all', N = ALL ? Infinity : +process.argv[2] || 300, C = +process.argv[3] || 2, DIR = process.argv[4] || 'bare';
const byText = new Map(P.entries.filter(e => !e.aliasOf).map(e => [e.text.toLowerCase(), e]));
const done = new Set(); if (ALL && fs.existsSync(here('./bare/'))) for (const f of fs.readdirSync(here('./bare/')).filter(f => /^list-\d+\.txt$/.test(f))) for (const m of fs.readFileSync(here('./bare/' + f), 'utf8').matchAll(/BARE (\d+) /g)) done.add(+m[1]);   // a full pass leaves out what the first sample already reviewed
const items = [];
for (const t of P.themes) {
  if (t.group) continue;
  const m = /^(?:types|kinds|varieties|styles|breeds|forms) of (.+)$/.exec(t.name) || /^(.+?) (?:types|varieties|styles|breeds|kinds)$/.exec(t.name); if (!m) continue;
  const headWord = m[1].split(' ').pop(), head = headWord.toLowerCase().replace(/ies$/, 'y').replace(/(ch|sh|x|s)es$/, '$1').replace(/s$/, ''); if (head.length < 3) continue;
  const re = new RegExp('(^|[^a-z])' + head, 'i');
  for (const e of (P.ix.byTheme.get(t.id) || []).filter(e => e.enabled && !e.aliasOf)) {
    if (e.show?.[t.id] || re.test(e.text) || /[ \-]/.test(e.text) && e.text.toLowerCase().includes(head)) continue;
    const cand = [...new Set([e.text + ' ' + head, head + ' ' + e.text, e.text + ' ' + m[1], e.text + '-' + head].map(s => byText.get(s.toLowerCase())).filter(Boolean))];
    if (!done.has(e.id)) items.push({ t, e, head: m[1], cand });
  }
}
let seed = 20261106; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
if (!ALL) for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
const pick = items.slice(0, N), per = Math.ceil(pick.length / C);
const d = (t, e) => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.pos} ${e.type} rec ${e.rec} link ${popIn(P, e, t.id) || '-'}`;
fs.mkdirSync(here('./' + DIR + '/'), { recursive: true });
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./${DIR}/list-${c + 1}.txt`), pick.slice(c * per, (c + 1) * per).map(({ t, e, head, cand }, i) => `${c * per + i + 1} | theme ${t.id} "${t.name}"${t.note ? ' (note: ' + t.note.slice(0, 100) + ')' : ''}\n   BARE ${d(t, e)}\n   ${cand.length ? 'FULL-TERM ENTRIES IN LIBRARY: ' + cand.map(x => d(t, x)).join(' ; ') : 'no full-term entry in the library'}`).join('\n') + '\n');
console.log(items.length + ' bare members in total, listed ' + pick.length + ' in ' + C + ' files');

// Lists the members of kinds themes that are full terms shown in full ("sports car" in car types) for review by agents (BRIEF-full.md): does a short display still identify the kind?
// Run: node tools/gen/full-list.mjs [chunks=2] [dir=full]   -> tools/gen/<dir>/list-N.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, popIn } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const C = +process.argv[2] || 2, DIR = process.argv[3] || 'full', items = [];
for (const t of P.themes) {
  if (t.group) continue;
  const m = /^(?:types|kinds|varieties|styles|breeds|forms) of (.+)$/.exec(t.name) || /^(.+?) (?:types|varieties|styles|breeds|kinds)$/.exec(t.name); if (!m) continue;
  const head = m[1].split(' ').pop().toLowerCase().replace(/ies$/, 'y').replace(/(ch|sh|x|s)es$/, '$1').replace(/s$/, ''); if (head.length < 3) continue;
  const re = new RegExp('(^|[ -])' + head + '(s|es)?($|[ -])', 'i');
  for (const e of (P.ix.byTheme.get(t.id) || []).filter(e => e.enabled && !e.aliasOf)) if (!e.show?.[t.id] && re.test(e.text)) items.push({ t, e });
}
const d = (t, e) => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.pos} ${e.type} rec ${e.rec} link ${popIn(P, e, t.id) || '-'}`;
fs.mkdirSync(here('./' + DIR + '/'), { recursive: true });
const per = Math.ceil(items.length / C);
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./${DIR}/list-${c + 1}.txt`), items.slice(c * per, (c + 1) * per).map(({ t, e }, i) => `${c * per + i + 1} | theme ${t.id} "${t.name}"${t.note ? ' (note: ' + t.note.slice(0, 100) + ')' : ''}\n   ${d(t, e)}`).join('\n') + '\n');
console.log(items.length + ' members listed in ' + C + ' files');

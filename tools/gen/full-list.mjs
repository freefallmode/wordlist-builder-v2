// Lists the members of kinds themes that are full terms shown in full ("sports car" in car types) for review by agents (BRIEF-full.md): does a short display still identify the kind?
// Run: node tools/gen/full-list.mjs [chunks=2] [dir=full] [plain]   -> tools/gen/<dir>/list-N.txt
// plain: category themes named by their head noun (hats, cakes, owls) instead of kinds themes; a theme needs 3+ such members.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, popIn } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const C = +process.argv[2] || 2, DIR = process.argv[3] || 'full', PLAIN = process.argv[4] === 'plain', items = [];
const KINDS = /^(?:types|kinds|varieties|styles|breeds|forms) of |(?: types| varieties| styles| breeds| kinds)$/;
for (const t of P.themes) {
  if (t.group) continue;
  let m = /^(?:types|kinds|varieties|styles|breeds|forms) of (.+)$/.exec(t.name) || /^(.+?) (?:types|varieties|styles|breeds|kinds)$/.exec(t.name);
  if (PLAIN) { if (m || KINDS.test(t.name) || t.tkind === 'compound' || t.tkind === 'wordplay') continue; m = [t.name, t.name]; }
  if (!m) continue;
  const head = m[1].split(' ').pop().toLowerCase().replace(/ies$/, 'y').replace(/(ch|sh|x|s)es$/, '$1').replace(/s$/, ''); if (head.length < 3) continue;
  const re = PLAIN ? new RegExp("^[a-z\\-' ]+ " + head + '$', 'i') : new RegExp('(^|[ -])' + head + '(s|es)?($|[ -])', 'i');
  const mine = (P.ix.byTheme.get(t.id) || []).filter(e => e.enabled && !e.aliasOf && !e.show?.[t.id] && re.test(e.text));
  if (PLAIN && mine.length < 3) continue;
  for (const e of mine) items.push({ t, e });
}
const d = (t, e) => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.pos} ${e.type} rec ${e.rec} link ${popIn(P, e, t.id) || '-'}`;
fs.mkdirSync(here('./' + DIR + '/'), { recursive: true });
const per = Math.ceil(items.length / C);
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./${DIR}/list-${c + 1}.txt`), items.slice(c * per, (c + 1) * per).map(({ t, e }, i) => `${c * per + i + 1} | theme ${t.id} "${t.name}"${t.note ? ' (note: ' + t.note.slice(0, 100) + ')' : ''}\n   ${d(t, e)}`).join('\n') + '\n');
console.log(items.length + ' members listed in ' + C + ' files');

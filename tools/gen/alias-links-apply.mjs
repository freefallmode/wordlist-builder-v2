// Applies tools/gen/aliaslinks/decisions.txt (`<alias id> | <theme id> | MOVE|SHOW|USE|DROP | reason`): an alias with its own theme link hands it to its root.
//   MOVE  the root gets the link; SHOW  the root gets the link and the theme displays the alias text; USE  the root gets the link and the theme displays the alias (a form);
//   DROP  the link is removed. Run: node tools/gen/alias-links-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const APPLY = process.argv.includes('--apply');
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const count = {}, bad = [];
for (const line of fs.readFileSync(new URL('./aliaslinks/decisions.txt', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = /^(\d+) \| (\S+) \| (MOVE|SHOW|USE|DROP) \|/.exec(line.trim()); if (!m) { if (line.trim()) bad.push(line); continue; }
  const a = P.ix.entry.get(+m[1]), t = m[2]; let how = m[3];
  if (!a || !a.aliasOf || a.th[t] === undefined) { bad.push('no such link: ' + line); continue; }
  const r = P.ix.entry.get(a.aliasOf), v = a.th[t];
  if (how === 'USE' && a.aliasKind !== 'form') how = 'SHOW';
  if (how !== 'DROP') {
    if (r.th[t] === undefined) r.th[t] = v;
    if (how === 'SHOW') r.show = { ...r.show, [t]: a.text };
    if (how === 'USE') r.use = { ...r.use, [t]: a.id };
  }
  delete a.th[t]; count[how] = (count[how] || 0) + 1;
}
console.log(count, bad.length ? 'PROBLEMS:\n' + bad.join('\n') : '');
if (APPLY) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

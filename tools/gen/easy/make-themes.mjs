// One-off: creates the easy everyday themes of spec.mjs (skips any that exist) and splits them into chunk lists for agents (list-<n>.txt).
// Run: node tools/gen/easy/make-themes.mjs [chunks=5]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, moveTheme } from '../../../js/model.js';
import { SPEC } from './spec.mjs';
const here = p => new URL(p, import.meta.url), LIB = here('../../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const C = +process.argv[2] || 5;
for (const [id, name, parent, note] of SPEC) {
  if (P.ix.theme.has(id)) continue;
  if (!P.ix.theme.has(parent)) throw Error('no parent ' + parent);
  P.themes.push({ id, name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note });
  reindex(P); moveTheme(P, id, parent); reindex(P);
}
// opposites is a word-play theme
P.ix.theme.get('opposites').lang = true;
stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
const per = Math.ceil(SPEC.length / C);
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./list-${c + 1}.txt`), SPEC.slice(c * per, (c + 1) * per).map(([id, name, parent, note]) => `T ${id} | ${name} | under ${parent} | ${note}`).join('\n') + '\n');
console.log(SPEC.length + ' themes; library v' + P.lib.version);

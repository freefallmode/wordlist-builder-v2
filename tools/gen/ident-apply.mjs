// Applies agent ratings of theme identifiability (tools/gen/ident/r-<n>.txt: `<theme id> <1-5>` per theme listed in list-<n>.txt).
// Run: node tools/gen/ident-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const stat = { files: 0, set: 0, changed: 0, bad: 0, missing: 0, dist: [0, 0, 0, 0, 0, 0] };
for (let i = 1; fs.existsSync(here(`./ident/list-${i}.txt`)); i++) {
  if (!fs.existsSync(here(`./ident/r-${i}.txt`))) { console.log('no result file for chunk ' + i); continue; }
  stat.files++;
  const listed = new Set(fs.readFileSync(here(`./ident/list-${i}.txt`), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith(' ')).map(l => l.split(' | ')[0]));
  const seen = new Set();
  for (const l of fs.readFileSync(here(`./ident/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim() || l.startsWith('#')) continue;
    const m = /^(\S+)\s+([1-5])\s*$/.exec(l.trim()), t = m && P.ix.theme.get(m[1]);
    if (!m || !t || !listed.has(m[1])) { stat.bad++; console.log('bad line r-' + i + ': ' + l); continue; }
    seen.add(m[1]); stat.set++; stat.dist[+m[2]]++;
    if (t.ident !== +m[2]) { t.ident = +m[2]; stat.changed++; }
  }
  for (const id of listed) if (!seen.has(id)) { stat.missing++; console.log('not rated: ' + id); }
}
console.log(stat);
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

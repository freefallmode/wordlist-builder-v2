// Applies agent reviews of `rec` (tools/gen/rec/r-<n>.txt: `<id> <new rec>` for each change) and marks every entry in the matching list-<n>.txt as reviewed.
// Run: node tools/gen/rec-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const doneFile = here('./rec/done.json'), done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const stat = { files: 0, changed: 0, easier: 0, harder: 0, bad: 0, reviewed: 0 };
for (let i = 1; fs.existsSync(here(`./rec/list-${i}.txt`)); i++) {
  if (!fs.existsSync(here(`./rec/r-${i}.txt`))) { console.log('no result file for chunk ' + i + ', left unreviewed'); continue; }
  stat.files++;
  const listed = new Set(fs.readFileSync(here(`./rec/list-${i}.txt`), 'utf8').split(/\r?\n/).filter(Boolean).map(l => +l.split(' | ')[0]));
  for (const l of fs.readFileSync(here(`./rec/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const m = /^(\d+)\s+([1-5])\s*$/.exec(l.trim()), e = m && P.ix.entry.get(+m[1]);
    if (!m || !e || e.aliasOf || !listed.has(e.id)) { stat.bad++; console.log('bad line r-' + i + ': ' + l); continue; }
    if (e.fam !== +m[2]) { if (+m[2] < e.fam) stat.easier++; else stat.harder++; e.fam = +m[2]; stat.changed++; }
  }
  for (const id of listed) { done.add(id); stat.reviewed++; }
}
console.log(stat);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 8).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(doneFile, JSON.stringify([...done].sort((a, b) => a - b))); console.log('library v' + P.lib.version); }

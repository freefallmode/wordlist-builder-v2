// Applies agent region tags (tools/gen/regtag/r-<n>.txt: `<theme id> <CODE,CODE>`) and marks every theme in the matching list-<n>.txt as reviewed.
// Run: node tools/gen/regtag-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const doneFile = here('./regtag/done.json'), done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const stat = { files: 0, tagged: 0, bad: 0, reviewed: 0 }, used = {};
for (let i = 1; fs.existsSync(here(`./regtag/list-${i}.txt`)); i++) {
  if (!fs.existsSync(here(`./regtag/r-${i}.txt`))) { console.log('no result file for chunk ' + i + ', left unreviewed'); continue; }
  stat.files++;
  const listed = new Set(fs.readFileSync(here(`./regtag/list-${i}.txt`), 'utf8').split(/\r?\n/).filter(Boolean).map(l => l.split(' | ')[0]));
  for (const l of fs.readFileSync(here(`./regtag/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const m = /^(\S+)\s+([A-Z]{2}(?:,[A-Z]{2})*)\s*$/.exec(l.trim()), t = m && P.ix.theme.get(m[1]);
    if (!m || !t || !listed.has(t.id)) { stat.bad++; console.log('bad line r-' + i + ': ' + l); continue; }
    t.region = [...new Set([...(t.region || []), ...m[2].split(',')])]; stat.tagged++;
    for (const c of m[2].split(',')) used[c] = (used[c] || 0) + 1;
  }
  for (const id of listed) { done.add(id); stat.reviewed++; }
}
console.log(stat, used);
if (process.argv.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(doneFile, JSON.stringify([...done].sort())); console.log('library v' + P.lib.version); }

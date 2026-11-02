// Sets meaning labels: node tools/gen/apply-labels.mjs <file>... [--apply]    each line `<entry id> | <label>`
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const args = process.argv.slice(2), files = args.filter(a => !a.startsWith('--'));
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
let n = 0; const bad = [];
for (const f of files) for (const l of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
  const m = /^(\d+) \| (.+)$/.exec(l.trim()); if (!m) { if (l.trim()) bad.push('cannot read: ' + l.slice(0, 60)); continue; }
  const e = P.ix.entry.get(+m[1]); if (!e) { bad.push('no entry ' + m[1]); continue; }
  if (e.gloss) { bad.push(`${m[1]} ${e.text} already has a label (${e.gloss})`); continue; }
  e.gloss = m[2].trim(); n++;
}
for (const b of bad.slice(0, 30)) console.log('PROBLEM', b);
console.log(n, 'labels', bad.length ? bad.length + ' problems' : '');
if (args.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

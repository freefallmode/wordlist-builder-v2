// Sets part of speech from tools/gen/pos/q-*.txt (BRIEF-pos2.md: `<id> <pos>` for each entry that is not a noun). Aliases of kind spelling, regional, abbreviation, translation and synonym take their root's part of speech.
// Run once: node tools/gen/pos/apply2.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, POS } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const LIB = new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const stat = { set: 0, bad: 0, notRoot: 0, alreadySet: 0, aliases: 0 }, seen = {}, files = [];
for (let n = 1; n <= 15; n++) {
  const f = new URL(`./q-${n}.txt`, import.meta.url); if (!fs.existsSync(f)) { console.log('missing q-' + n); continue; }
  files.push(n);
  for (const l of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const m = /^(\d+)\s+(verb|adjective|adverb|other)\s*$/.exec(l.trim());
    if (!m) { stat.bad++; console.log('bad line q-' + n + ': ' + l); continue; }
    const e = P.ix.entry.get(+m[1]);
    if (!e || e.aliasOf) { stat.notRoot++; continue; }
    if (e.pos && e.pos !== 'noun') { stat.alreadySet++; continue; }
    e.pos = m[2]; stat.set++; seen[m[2]] = (seen[m[2]] || 0) + 1;
  }
}
for (const a of P.entries) if (a.aliasOf && ['spelling', 'regional', 'abbreviation', 'translation', 'synonym'].includes(a.aliasKind)) { const r = P.ix.entry.get(a.aliasOf); if (r && a.pos !== r.pos) { a.pos = r.pos; stat.aliases++; } }
console.log(files.length + ' files', stat, seen);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 10).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

// Applies tools/gen/capmark/r-<n>.txt (`<entryId>\t<mark>`): sets entry.type; `common` lowercases the entry text.
// Acronym marks on text that is not all capitals become `proper` (the validator wants acronyms in capitals).
// Run: node tools/gen/capmark-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const key = (t, g) => t + '|' + (g || '');
const seen = new Set(P.entries.filter(e => !e.aliasOf).map(e => key(e.text, e.gloss)));
const stat = { common: 0, lowered: 0, dup: 0, typed: 0, acroToProper: 0, bad: 0 }, log = [];
const OK = new Set(['common', 'person', 'place', 'org', 'title', 'proper', 'acronym']);
for (let i = 1; fs.existsSync(here(`./capmark/r-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./capmark/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const [id, m0] = l.trim().split(/\s+/); let m = m0;
  const e = P.ix.entry.get(+id);
  if (!e || !OK.has(m)) { stat.bad++; console.log('bad ' + l); continue; }
  if (m === 'acronym' && e.text !== e.text.toUpperCase()) { m = 'proper'; stat.acroToProper++; }
  if (m !== 'common' && e.text === e.text.toLowerCase()) { m = 'common'; stat.keptLower = (stat.keptLower || 0) + 1; log.push('kept lowercase (earlier decision): ' + e.text); }
  if (m === 'common') {
    stat.common++;
    const low = e.text.toLowerCase();
    if (low === e.text) { e.type = 'common'; continue; }
    if (seen.has(key(low, e.gloss))) { stat.dup++; log.push(`dup, kept proper: ${e.text}`); e.type = 'proper'; continue; }
    seen.delete(key(e.text, e.gloss)); e.text = low; seen.add(key(low, e.gloss)); e.type = 'common'; stat.lowered++; log.push(`lowered: ${low}`);
  } else { e.type = m; stat.typed++; }
}
console.log(stat);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg) && !/^case-/.test(i.kind || '')); console.log(bad.length, bad.slice(0, 12).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(here('./capmark/log.txt'), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }
if (process.argv.includes('--list')) for (const i of validate(P)) if (/proper name but/.test(i.msg)) console.log(i.msg, i.entryId ?? '');

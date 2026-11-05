// Applies tools/gen/<dir>/v-*.txt (BRIEF-full.md): SHOW <theme> <entry id> <short text> sets the theme's display for a full term. The entry text is unchanged.
// Run: node tools/gen/full-apply.mjs [--dir full] [--skip id,id] [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url), arg = (k, d) => process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : d;
const DIR = arg('--dir', 'full'), SKIP = new Set(arg('--skip', '').split(',').filter(Boolean).map(Number)), LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
let n = 0, skipped = 0; const problems = [];
for (const f of fs.readdirSync(here('./' + DIR + '/')).filter(f => /^v-\d+\.txt$/.test(f)).sort()) for (const raw of fs.readFileSync(here('./' + DIR + '/' + f), 'utf8').split(/\r?\n/)) {
  const l = raw.trim(); if (!l || l.startsWith('#')) continue;
  const m = /^SHOW\s+(\S+)\s+(\d+)\s+(.+)$/.exec(l), e = m && P.ix.entry.get(+m[2]);
  if (!m || !e || e.aliasOf || e.th[m[1]] === undefined) { problems.push(`${f}: cannot apply "${l.slice(0, 70)}"`); continue; }
  if (SKIP.has(e.id)) { skipped++; continue; }
  const short = m[3].trim(); if (!e.text.toLowerCase().includes(short.toLowerCase())) { problems.push(`${f}: "${short}" is not in "${e.text}"`); continue; }
  e.show = { ...e.show, [m[1]]: short }; e.nameOkIn = [...new Set([...(e.nameOkIn || []), m[1]])];
  for (const a of P.entries) if (a.aliasOf === e.id) a.nameOkIn = [...new Set([...(a.nameOkIn || []), m[1]])];
  n++;
}
reindex(P);
console.log({ shortened: n, skipped }, problems.join('\n'));
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 6).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

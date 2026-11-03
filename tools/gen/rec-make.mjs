// Lists entries whose `rec` has not been reviewed yet, for agents working under BRIEF-rec.md. Names (every type except common) by default.
// Run: node tools/gen/rec-make.mjs [chunks=6] [--common] [--theme-pop 1,2]   writes tools/gen/rec/list-<n>.txt
// Entries already reviewed are in tools/gen/rec/done.json (rec-apply.mjs adds them), so new words and names added later are the only ones listed next time.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { parseFreq, setFreq, zipf } from '../../js/freq.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(here('../../data/freq-en.txt'), 'utf8')));
const n = +process.argv.slice(2).find(a => /^\d+$/.test(a)) || 6, common = process.argv.includes('--common');
const tp = process.argv.includes('--theme-pop') ? new Set(process.argv[process.argv.indexOf('--theme-pop') + 1].split(',').map(Number)) : null;
const doneFile = here('./rec/done.json'), done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const rows = P.entries.filter(e => !e.aliasOf && e.rec && !done.has(e.id) && (common || (e.type || 'common') !== 'common')
  && (!tp || Object.keys(e.th).some(t => tp.has(P.ix.theme.get(t)?.pop)))).map(e => {
  const ts = Object.keys(e.th).slice(0, 2).map(t => P.ix.theme.get(t)?.name).filter(Boolean).join(' / '), z = zipf(e.text);
  return `${e.id} | ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''} | ${e.type || 'common'} | rec ${e.rec} | ${ts} | ${z == null ? 'z-' : 'z' + z.toFixed(1)}`;
});
const sz = Math.ceil(rows.length / n);
for (let i = 0; i < n; i++) fs.writeFileSync(here(`./rec/list-${i + 1}.txt`), rows.slice(i * sz, (i + 1) * sz).join('\n') + '\n');
console.log(rows.length + ' entries in ' + n + ' chunks of about ' + sz);

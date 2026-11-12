// Puts the capitals of tools/gen/disp/r-<n>.txt (`<themeId> <TAB> <name with capitals>`) into the theme names themselves.
// Only capitals may change. Run: node tools/gen/disp-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
let n = 0, bad = 0; const log = [];
for (let i = 1; fs.existsSync(here(`./disp/r-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./disp/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const [id, d] = l.split('\t'), t = P.ix.theme.get(id);
  if (!t || !d || d.toLowerCase() !== t.name.toLowerCase() || d === t.name) { bad++; console.log('skip: ' + l); continue; }
  log.push(t.name + ' => ' + d); t.name = d; n++;
}
console.log({ renamed: n, skipped: bad });
reindex(P);
const dup = new Map(); for (const t of P.themes) { const k = t.name.toLowerCase(); if (dup.has(k)) console.log('duplicate name', t.name); dup.set(k, t.id); }
const v = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(v.length, v.slice(0, 10).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(here('./disp/log.txt'), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }

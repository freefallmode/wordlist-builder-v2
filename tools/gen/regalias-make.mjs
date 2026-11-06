// Lists region-flagged common root words that have no regional alias, for agents working under BRIEF-regalias.md.
// Run: node tools/gen/regalias-make.mjs [chunks=6]   -> tools/gen/regalias/list-N.txt
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const C = +process.argv[2] || 6;
const aliases = new Map(); for (const e of P.entries) if (e.aliasOf && e.enabled) (aliases.get(e.aliasOf) || aliases.set(e.aliasOf, []).get(e.aliasOf)).push(e);
const items = P.entries.filter(e => e.enabled && !e.aliasOf && e.type === 'common' && e.region.length && !(aliases.get(e.id) || []).some(a => a.aliasKind === 'regional'));
const themes = e => Object.keys(e.typ).slice(0, 2).map(id => P.ix.theme.get(id)?.name).filter(Boolean).join('; ');
fs.mkdirSync(here('./regalias/'), { recursive: true });
const per = Math.ceil(items.length / C);
for (let c = 0; c < C; c++) fs.writeFileSync(here(`./regalias/list-${c + 1}.txt`), items.slice(c * per, (c + 1) * per).map(e =>
  `${e.id} | ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''} | ${e.pos} | ${e.region.join('/')} | ${themes(e)}${(aliases.get(e.id) || []).length ? ' | has aliases: ' + aliases.get(e.id).map(a => a.text + ' (' + (a.aliasKind || '?') + ')').join(', ') : ''}`).join('\n') + '\n');
console.log(items.length + ' words in ' + C + ' files');

// Entries typed common but shown with a capital (case-lint kind cap-common): each needs its mark decided.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { caseLint } from '../../js/caselint.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const ids = [...new Set(caseLint(P).filter(i => i.kind === 'cap-common').map(i => i.entryId))];
const rows = ids.map(id => P.ix.entry.get(id)).filter(Boolean).map(e => { const th = Object.keys(e.typ || {}).slice(0, 3).map(t => P.ix.theme.get(t)?.name).join('; '); return `${e.id}\t${e.text}\t${e.gloss || ''}\t${e.pos || ''}\t${th}`; });
const N = 6, per = Math.ceil(rows.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(new URL(`./capmark/list-${i + 1}.txt`, import.meta.url), rows.slice(i * per, (i + 1) * per).join('\n') + '\n');
console.log(rows.length);

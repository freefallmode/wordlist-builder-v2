// Library summary: node tools/gen/stats.mjs [library]
import { readFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(readFileSync(process.argv[2] || new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const cnt = new Map(); for (const e of P.entries) if (!e.aliasOf) for (const t of Object.keys(e.typ)) cnt.set(t, (cnt.get(t) || 0) + 1);
const leaf = P.themes.filter(t => !t.group), filled = leaf.filter(t => (cnt.get(t.id) || 0) >= 4);
const dd = {}; for (const t of filled) dd[t.d || 0] = (dd[t.d || 0] || 0) + 1;
console.log('version', P.lib.version, 'entries', P.entries.length, 'leaf themes', leaf.length, 'filled', filled.length, 'still empty', leaf.length - filled.length, 'd counts', dd);
const rb = {}; for (const e of P.entries) if (!e.aliasOf) rb[e.fam] = (rb[e.fam] || 0) + 1; console.log('root words by rec', rb);
console.log('unrated filled themes', filled.filter(t => !t.d).map(t => t.id).join(' ') || 'none');

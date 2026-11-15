// Entries shown lowercase on some links and capitalised on others, but common words: lowercase everywhere (the capital was the stray).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const n of ['Triceratops', 'Pterodactyl', 'Plesiosaur', 'Impressionism', 'Carnival']) for (const e of P.entries.filter(x => x.text === n && !x.aliasOf)) {
  const lc = n.toLowerCase(); if (P.entries.some(x => x !== e && x.text === lc && (x.gloss || '') === (e.gloss || ''))) { console.log('dup', n); continue; }
  e.text = lc; e.type = 'common'; for (const k of Object.keys(e.show || {})) if (e.show[k].toLowerCase() === lc) delete e.show[k]; if (e.show && !Object.keys(e.show).length) delete e.show; console.log('common', lc);
}
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version);

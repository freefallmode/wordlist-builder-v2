// Gem/mineral/colour-word entries that the marking pass left as proper: they are common words (gloss differs from the lowercase twin).
// Run: node tools/gen/capmark-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const W = new Set(['Beryl','Garnet','Jasper','Topaz','Amethyst','Citrine','Peridot','Zircon','Agate','Raven','Hemlock','Dot','Crux','Shellac','Holstein']);
const log = [];
for (const e of P.entries) {
  if (!W.has(e.text) || e.aliasOf || !(e.type === 'proper')) continue;
  const low = e.text.toLowerCase();
  if (P.entries.some(x => x !== e && x.text === low && (x.gloss || '') === (e.gloss || ''))) { log.push('dup skip ' + e.text + ' / ' + e.gloss); continue; }
  e.text = low; e.type = 'common';
  if (e.show) { for (const k of Object.keys(e.show)) if (e.show[k] === low) delete e.show[k]; if (!Object.keys(e.show).length) delete e.show; }
  log.push('common ' + low + ' / ' + e.gloss);
}
console.log(log.join('\n')); reindex(P);
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version); }

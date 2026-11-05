// One-off (2026-11-06): hotel room types held nine bare modifiers (single, double, queen ...). They become the full term (single room) shown short, as DESIGN-entries.md 3.6 says.
// The entries are retexted in place (each is linked only here), so nothing else moves. Run: node tools/gen/rooms-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const T = 'room_types';
// id, bare text, familiarity of the full term, typicality in the theme
const FIX = [[48358, 'single', 1, 1], [48359, 'double', 1, 1], [48360, 'twin', 2, 1], [63321, 'deluxe', 2, 2], [63322, 'king', 2, 2], [63323, 'quad', 3, 3], [63324, 'queen', 2, 2], [63325, 'standard', 1, 2], [63326, 'triple', 3, 3]];
for (const [id, bare, rec, link] of FIX) {
  const e = P.ix.entry.get(id); if (!e || e.text !== bare || Object.keys(e.typ).length !== 1) throw Error('unexpected entry ' + id);
  e.text = bare + ' room'; e.gloss = ''; e.pos = 'noun phrase'; e.type = 'common'; e.fam = rec; e.typ[T] = link;
  e.show = { ...e.show, [T]: bare }; e.nameOkIn = [...new Set([...(e.nameOkIn || []), T])];
}
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 6).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

// Library batch v520 (Simon, 2026-11-27, through the game session: "you can drop zipf from the export now"): the export stops writing the zipf column, because the game's
// generator g29 no longer reads it. That is a change in tools/export-game.mjs (no Zipf override; the Word Safari preset has none), not in the library; this batch only raises the library version so
// the changed export carries a new version (GAME-CONTRACT: the version changes whenever the export's contents change).
// Base: library v519. Rerun: 0 changes (the version is already 520 or later).
// Run: node tools/gen/batch520.mjs [--apply | --out <path>] [--lib <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
let n = 0;
if (P.lib.version < 520) {
  n++;
  console.log('Library batch v520: version raised for the export change (zipf no longer written; the game generator g29 does not read it). No theme or word changes.');
}
console.log(`\nlibrary changes ${n}; entries changed 0; status set to rev 0; themes deleted 0; entries merged 0\n${n} library changes`);
if ((APPLY || OUT) && n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }

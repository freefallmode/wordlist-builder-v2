// Writes the game file (export format 3) from the working library: node tools/export-game.mjs [preset] [out]
// Default: the "family" preset with Zipf, to data/export/wordlist-game-family.json. Run from the repository root.
import fs from 'node:fs';
import path from 'node:path';
import { parseProject } from '../js/store.js';
import { reindex } from '../js/model.js';
import { buildExport, PRESETS } from '../js/export.js';
import { parseFreq, setFreq } from '../js/freq.js';
import { parseBreaks, setBreaks } from '../js/breaks.js';
const preset = process.argv[2] || 'family', out = process.argv[3] || 'data/export/wordlist-game-family.json';
if (!PRESETS[preset]) { console.error('No preset ' + preset + '. Presets: ' + Object.keys(PRESETS).join(', ')); process.exit(2); }
const P = parseProject(fs.readFileSync(new URL('../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../data/freq-en.txt', import.meta.url), 'utf8')));
if (fs.existsSync('data/breaks-en.txt')) setBreaks(parseBreaks(fs.readFileSync('data/breaks-en.txt', 'utf8')));
const { file, report } = buildExport(P, { ...PRESETS[preset], zipf: true });
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(file));
console.log(`${out}: ${(fs.statSync(out).size / 1e6).toFixed(1)} MB, library v${P.lib.version}, ${report.themesOut} themes, ${report.entriesOut} entries`);
for (const n of report.notes) console.log(' ', n);

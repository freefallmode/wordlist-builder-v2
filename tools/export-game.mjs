// Writes the game file (export format 4) from the working library: node tools/export-game.mjs [preset] [out] [--strict] [--lib <file>]
// Default: the "Word Safari" preset (the family filters; Zipf is still added until the game commits g29; js/export.js PRESETS, the same preset the web app offers), to data/export/wordlist-game-family.json in this repository (from any directory; an explicit out is relative to the current directory).
// --lib <file>: export that library file instead of data/wordlist-en.project.json (e.g. a draft; the frequency list and break points are still this repository's).
// --strict (in any position): exit 1 when the case lint finds issues, before anything is written.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseProject } from '../js/store.js';
import { reindex } from '../js/model.js';
import { buildExport, PRESETS, exportName, lintLine, reportLists } from '../js/export.js';
import { parseFreq, setFreq } from '../js/freq.js';
import { caseLint } from '../js/caselint.js';
import { parseBreaks, setBreaks } from '../js/breaks.js';
let args = process.argv.slice(2), libArg = null;
{ const i = args.indexOf('--lib'); if (i >= 0) { libArg = args[i + 1]; if (!libArg || libArg.startsWith('--')) { console.error('--lib needs a file'); process.exit(2); } args = args.filter((_, j) => j !== i && j !== i + 1); } }
const flags = args.filter(a => a.startsWith('--')), pos = args.filter(a => !a.startsWith('--'));
const bad = flags.filter(a => a !== '--strict');
if (bad.length) { console.error('Unknown option ' + bad.join(', ') + '. Options: --strict, --lib <file>'); process.exit(2); }
const preset = pos[0] || 'Word Safari', out = pos[1] || fileURLToPath(new URL('../data/export/' + exportName({}, pos[0] || 'family'), import.meta.url));   // the game's file keeps its name wordlist-game-family.json
if (!PRESETS[preset]) { console.error('No preset ' + preset + '. Presets: ' + Object.keys(PRESETS).join(', ')); process.exit(2); }
const P = parseProject(fs.readFileSync(libArg ? path.resolve(libArg) : new URL('../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../data/freq-en.txt', import.meta.url), 'utf8')));
const brk = new URL('../data/breaks-en.txt', import.meta.url);
if (fs.existsSync(brk)) setBreaks(parseBreaks(fs.readFileSync(brk, 'utf8')));
else console.warn(`Warning: ${fileURLToPath(brk)} not found; the export has no break points.`);
const { file, report } = buildExport(P, { ...PRESETS[preset], zipf: true });   // zipf stays in the game's file until the game commits generator g29 (it drops the zipf test; g28 still needs it): then remove this override so the file follows the Word Safari preset
const c = caseLint(P), text = JSON.stringify(file);   // every kind counts
const show = () => { console.log(`${out}: ${(Buffer.byteLength(text) / 1e6).toFixed(1)} MB, library v${P.lib.version}, ${report.themesOut} themes, ${report.entriesOut} entries`); for (const n of report.notes) console.log(' ', n); for (const l of reportLists(report, PRESETS[preset].minWords ?? 4, 20)) { console.log('  ' + l.title + ' (' + l.why + ')'); for (const x of l.lines) console.log('    ' + x); } console.log('  ' + lintLine(c.length)); };
if (flags.includes('--strict') && c.length) { show(); console.error('--strict: case lint found issues; nothing written.'); process.exit(1); }
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text);
show();

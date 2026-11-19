// Lists the long words (8+ letters) that appear in the game export's entries, shown texts and theme names but are missing from data/breaks-en.txt,
// and writes them in chunks of 700 to tools/gen/brk/todo-N.txt. Run from anywhere: node tools/brk-tokens.mjs [export.json]
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const R = p => fileURLToPath(new URL('../' + p, import.meta.url));   // paths from the repository root, whatever the current directory
import { parseBreaks, MIN_BREAK_LETTERS } from '../js/breaks.js';
const src = process.argv[2] || R('data/export/wordlist-game-family.json');
const o = JSON.parse(fs.readFileSync(src, 'utf8'));
const ni = o.themeFields.indexOf('name');
const texts = [...o.entries.text, ...o.themes.map(r => r[ni]), ...(o.shown || []).map(s => s[0])];
const have = fs.existsSync(R('data/breaks-en.txt')) ? parseBreaks(fs.readFileSync(R('data/breaks-en.txt'), 'utf8')) : new Map();
const WORD = /\p{L}[\p{L}']*\p{L}|\p{L}/gu;
const todo = new Set();
for (const t of texts) for (const m of String(t).matchAll(WORD)) { const w = m[0].toLowerCase(); if (w.replace(/'/g, '').length >= MIN_BREAK_LETTERS && !have.has(w)) todo.add(w); }
const a = [...todo].sort();
const BRK = R('tools/gen/brk/');
fs.mkdirSync(BRK, { recursive: true });
for (const f of fs.readdirSync(BRK)) if (/^todo(-out)?-\d+\.txt$/.test(f)) fs.unlinkSync(BRK + f);
for (let c = 0; c * 700 < a.length; c++) fs.writeFileSync(BRK + `todo-${c}.txt`, a.slice(c * 700, (c + 1) * 700).join('\n') + '\n');
console.log(a.length + ' words to do in ' + Math.ceil(a.length / 700) + ' chunks' + (a.length ? ': agents read tools/gen/brk/todo-N.txt under tools/gen/brk/BRIEF-brk.md and write todo-out-N.txt, then node tools/brk-merge.mjs todo' : ''));

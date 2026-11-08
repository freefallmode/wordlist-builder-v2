// Lists the long words (8+ letters) that appear in the game export's entries, shown texts and theme names but are missing from data/breaks-en.txt,
// and writes them in chunks of 700 to tools/gen/brk/todo-N.txt. Run from the repository root: node tools/brk-tokens.mjs [export.json]
import fs from 'node:fs';
import { parseBreaks, MIN_BREAK_LETTERS } from '../js/breaks.js';
const src = process.argv[2] || 'data/export/wordlist-game-family.json';
const o = JSON.parse(fs.readFileSync(src, 'utf8'));
const ni = o.themeFields.indexOf('name');
const texts = [...o.entries.text, ...o.themes.map(r => r[ni]), ...(o.shown || []).map(s => s[0])];
const have = fs.existsSync('data/breaks-en.txt') ? parseBreaks(fs.readFileSync('data/breaks-en.txt', 'utf8')) : new Map();
const WORD = /\p{L}[\p{L}']*\p{L}|\p{L}/gu;
const todo = new Set();
for (const t of texts) for (const m of String(t).matchAll(WORD)) { const w = m[0].toLowerCase(); if (w.replace(/'/g, '').length >= MIN_BREAK_LETTERS && !have.has(w)) todo.add(w); }
const a = [...todo].sort();
fs.mkdirSync('tools/gen/brk', { recursive: true });
for (let c = 0; c * 700 < a.length; c++) fs.writeFileSync(`tools/gen/brk/todo-${c}.txt`, a.slice(c * 700, (c + 1) * 700).join('\n') + '\n');
console.log(a.length + ' words to do in ' + Math.ceil(a.length / 700) + ' chunks');

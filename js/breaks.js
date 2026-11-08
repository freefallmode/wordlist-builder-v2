// Line-break points for display. data/breaks-en.txt maps a long word (lowercase) to its hyphenated form, e.g. "playground=play-ground".
// breakPoints(text) returns the character indexes in `text` where a hyphen may go (the index of the first letter of the next piece), or [] when there are none.
// Only words of 8 or more letters are looked up; spaces and existing hyphens are the game's own natural breaks and are never listed.
let table = new Map();

export const MIN_BREAK_LETTERS = 8;
// A word: letters (any script) with inner apostrophes, ended by a letter. Mirrors the extraction in tools/brk-tokens.mjs.
const WORD = /\p{L}[\p{L}']*\p{L}|\p{L}/gu;

export function parseBreaks(text) {
  const m = new Map();
  for (const line of text.split(/\r?\n/)) {
    const i = line.indexOf('=');
    if (i < 1) continue;
    m.set(line.slice(0, i), line.slice(i + 1).trim());
  }
  return m;
}
export function setBreaks(m) { table = m; }

// The letter offsets inside a word where its hyphenated form has a hyphen (apostrophes count as characters).
export function offsetsOf(word, hyphenated) {
  if (!hyphenated || hyphenated.indexOf('-') < 0 || hyphenated.replace(/-/g, '') !== word) return [];
  const out = []; let n = 0;
  for (const part of hyphenated.split('-').slice(0, -1)) { n += part.length; out.push(n); }
  return out;
}

export function breakPoints(text) {
  const out = [];
  for (const m of String(text).matchAll(WORD)) {
    const w = m[0].toLowerCase();
    if (w.replace(/'/g, '').length < MIN_BREAK_LETTERS) continue;
    const h = table.get(w);
    if (!h) continue;
    // the lowercase form can differ in length from the original for rare letters; skip rather than misplace a hyphen
    if (w.length !== m[0].length) continue;
    for (const o of offsetsOf(w, h)) out.push(m.index + o);
  }
  return out;
}

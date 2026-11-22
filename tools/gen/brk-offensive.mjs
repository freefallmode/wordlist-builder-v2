// Offensive words (DESIGN-entries.md 3.8): no line break may leave an offensive piece (cock-tail, jew-ellery, homo-phones).
// For every word of data/breaks-en.txt, removes each hyphen whose part before or after it is a word of the offensive list (js/offensive.js
// offensivePiece), so the game never shows "cock" on one line of "cocktail". The other break points stay.
// node tools/gen/brk-offensive.mjs [--apply]   (dry run lists the changes; --apply rewrites the table; rerun to 0 changes)
import fs from 'node:fs';
import { offensivePiece } from '../../js/offensive.js';
const F = new URL('../../data/breaks-en.txt', import.meta.url);
const text = fs.readFileSync(F, 'utf8'), nl = text.includes('\r\n') ? '\r\n' : '\n';
const changes = [];
const out = text.split(/\r?\n/).map(line => {
  const i = line.indexOf('='); if (i < 0) return line;
  const word = line.slice(0, i), parts = line.slice(i + 1).split('-');
  if (parts.length < 2) return line;
  // walk the hyphens; drop one when the word before it or after it (the whole run of letters on that side) is offensive
  const keep = []; let pre = parts[0];
  for (let k = 1; k < parts.length; k++) {
    const post = parts.slice(k).join(''), w = offensivePiece(pre) || offensivePiece(post);
    keep.push(!w); if (w) changes.push(`${word}: ${parts.slice(0, k).join('')}|${post} leaves "${w}"`);
    pre += parts[k];
  }
  if (keep.every(Boolean)) return line;
  let h = parts[0]; for (let k = 1; k < parts.length; k++) h += (keep[k - 1] ? '-' : '') + parts[k];
  return `${word}=${h}`;
});
console.log(changes.join('\n')); console.log(`${changes.length} break points removed`);
if (process.argv.includes('--apply') && changes.length) { fs.writeFileSync(F, out.join(nl)); console.log('written data/breaks-en.txt'); }

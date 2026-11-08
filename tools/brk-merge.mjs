// Checks the generated out-N.txt files against in-N.txt / todo-N.txt and merges the valid lines into data/breaks-en.txt.
// node tools/brk-merge.mjs [prefix: in|todo]  (todo-N.txt from tools/brk-tokens.mjs is answered in todo-out-N.txt)   Prints the problems; invalid lines are written to tools/gen/brk/bad.txt for a rerun.
import fs from 'node:fs';
const dir = 'tools/gen/brk/', prefix = process.argv[2] || 'in';
const file = 'data/breaks-en.txt';
const have = new Map(fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(l => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]) : []);
let ok = 0, none = 0, missing = 0, single = 0; const bad = [];
for (const f of fs.readdirSync(dir).filter(f => new RegExp('^' + prefix + '-\\d+\\.txt$').test(f))) {
  const outF = dir + (prefix === 'in' ? f.replace('in', 'out') : 'todo-out-' + f.replace(/^todo-/, ''));
  if (!fs.existsSync(outF)) { console.log('no output for ' + f); continue; }
  const want = fs.readFileSync(dir + f, 'utf8').split(/\r?\n/).filter(Boolean);
  const got = new Map(fs.readFileSync(outF, 'utf8').split(/\r?\n/).filter(l => l.includes('=')).map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]));
  for (const w of want) {
    let h = got.get(w);
    if (h === undefined) { missing++; bad.push(w); continue; }
    if (h.replace(/-/g, '') !== w || h.split('-').some(p => !p)) { bad.push(w); continue; }          // letters changed, or an empty piece
    const parts = h.split('-');
    // a piece of one letter, or one that starts with an apostrophe, is joined to its neighbour (a-bre-vi-a-tion -> a-bre-via-tion)
    for (let i = 0; i < parts.length && parts.length > 1;) {
      if (parts[i].replace(/'/g, '').length < 2 || parts[i].startsWith("'")) {
        if (i > 0) { parts.splice(i - 1, 2, parts[i - 1] + parts[i]); i--; } else parts.splice(i, 2, parts[i] + parts[i + 1]);   // join to the piece before, or the one after at the start
        single++; i = Math.max(0, i - 0);
      } else i++;
    }
    h = parts.join('-');
    have.set(w, h); ok++; if (parts.length === 1) none++;
  }
}
fs.writeFileSync(file, [...have].sort((a, b) => a[0] < b[0] ? -1 : 1).map(([w, h]) => w + '=' + h).join('\n') + '\n');
fs.writeFileSync(dir + 'bad.txt', bad.join('\n') + (bad.length ? '\n' : ''));
console.log(`merged ${ok} (${none} left unbroken); ${bad.length} rejected (${missing} missing, ${single} repaired single-letter pieces) -> ${dir}bad.txt; table now ${have.size}`);

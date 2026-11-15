// Proper-word pass (ISSUES.md T14): lists entries typed common or phrase that contain, or may contain, a proper word, for review under BRIEF-propword.md.
// Three groups, one line per entry in tools/gen/propword/list-<n>.txt (`id <TAB> group <TAB> text <TAB> gloss <TAB> type <TAB> shown texts <TAB> suspect words <TAB> some themes`):
//   A  the text has a capitalised word (not a letter-shaped term, not a trademark) but the entry is typed common: `Neapolitan pizza`
//   B  the text is lowercase and a shown text has a capital: `vidalia onion` shown `Vidalia`
//   C  the text is lowercase, has two or more words, and one of them is known as a name: `french fries`, `yorkshire terrier`
// A name, for group C: a word of PROPER_WORDS (js/caselint-words.js: nationality words and the names earlier reviews confirmed), or a single-word place, person, proper, org or title entry of the library whose lowercase form
// is not itself a common single-word entry (so `turkey sandwich` and `china cabinet` are not listed, `jersey cow` is). False hits are expected; the review settles them.
// Run: node tools/gen/propword-make.mjs [chunks=3]      (reads the library, writes only tools/gen/propword/list-*.txt)
//      node tools/gen/propword-make.mjs more            (a further list of what the first rule cannot see; see the end of the file)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { initialism } from '../../js/caselint.js';
import { PROPER_WORDS } from '../../js/caselint-words.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const chunks = +process.argv[2] || 3;

const NAMEY = new Set(['person', 'place', 'proper', 'org', 'title']);
const low = s => s.toLowerCase(), cap = s => /^\p{Lu}/u.test(s);
const words = s => s.split(/[\s/]+/).map(w => w.replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, '')).filter(Boolean);

const commonSingle = new Set(), nameSingle = new Map();
for (const e of P.entries) {
  if (/\s/.test(e.text)) continue;
  if (NAMEY.has(e.type) && cap(e.text) && !initialism(e.text)) nameSingle.set(low(e.text), e.text);
  else if ((e.type === 'common' || e.type === 'phrase') && !cap(e.text)) commonSingle.add(e.text);
}
const known = w => PROPER_WORDS.has(w) || (nameSingle.has(w) && !commonSingle.has(w) && w.length > 2);

const themeNames = e => { const r = e.aliasOf ? P.ix.entry.get(e.aliasOf) : e; return Object.keys((r && r.typ) || {}).slice(0, 4).map(t => P.ix.theme.get(t)?.name || t).join('; '); };
const rows = [];
for (const e of P.entries) {
  if (e.type !== 'common' && e.type !== 'phrase') continue;
  const ws = words(e.text), shows = Object.values(e.show || {});
  const capWords = ws.filter(w => cap(w) && !initialism(w));
  let group = '', suspects = [];
  if (capWords.length && !e.tm && !initialism(e.text)) { group = 'A'; suspects = capWords; }
  else if (!capWords.length && shows.some(s => words(s).some(w => cap(w) && !initialism(w)))) { group = 'B'; suspects = [...new Set(shows.flatMap(s => words(s).filter(w => cap(w) && !initialism(w))))]; }
  else if (!capWords.length && ws.length >= 2 && ws.some(w => known(w))) { group = 'C'; suspects = ws.filter(known).map(w => nameSingle.get(w) || w[0].toUpperCase() + w.slice(1)); }
  if (!group) continue;
  rows.push([e.id, group, e.text, e.gloss || '', e.type + (e.aliasOf ? ' alias of "' + (P.ix.entry.get(e.aliasOf)?.text || '?') + '" (' + e.aliasKind + ')' : ''), [...new Set(shows)].join(' | '), [...new Set(suspects)].join(' '), themeNames(e)]);
}
rows.sort((a, b) => low(a[2]).localeCompare(low(b[2])));
fs.mkdirSync(here('./propword/'), { recursive: true });
if (process.argv[2] !== 'more') {
const per = Math.ceil(rows.length / chunks);
for (let i = 0; i < chunks; i++) fs.writeFileSync(here(`./propword/list-${i + 1}.txt`), rows.slice(i * per, (i + 1) * per).map(r => r.join('\t')).join('\n') + '\n');
const n = g => rows.filter(r => r[1] === g).length;
console.log(`${rows.length} candidates: A ${n('A')}, B ${n('B')}, C ${n('C')}; ${chunks} lists of about ${per} in tools/gen/propword/`);
}

// Second list (`node tools/gen/propword-make.mjs more`): group D, entries the first rule cannot see because the name in them is not a single-word entry
// (`beef wellington`, `devon rex`, `peach melba`). A lowercase entry of two or more words is listed when one of its words is written with a capital inside
// a name entry or in a P verdict of the earlier lists, is used in lowercase no more often than that (or at most twice), is not itself a common single-word entry (unless names use it at
// least three times as often), and was not judged an ordinary word in the earlier lists. Written to the next free list-<n>.txt; entries already listed are left out.
if (process.argv[2] === 'more') {
  const done = new Set(), pWords = new Set(), kept = new Set();
  let n = 1;
  for (; fs.existsSync(here(`./propword/list-${n}.txt`)); n++) {
    for (const l of fs.readFileSync(here(`./propword/list-${n}.txt`), 'utf8').split(/\r?\n/)) if (l.trim()) done.add(+l.split('\t')[0]);
    if (!fs.existsSync(here(`./propword/out-${n}.txt`))) continue;
    for (const l of fs.readFileSync(here(`./propword/out-${n}.txt`), 'utf8').split(/\r?\n/)) {
      const f = l.split('\t'), e = P.ix.entry.get(+f[0]); if (!e) continue;
      if (f[1] === 'P') { const cw = words(f[2]).filter(w => cap(w) && !initialism(w)); if (cw.length === 1) pWords.add(low(cw[0])); }
      else if (f[1] === 'K' || f[1] === 'C') for (const w of words(e.text)) kept.add(low(w));
    }
  }
  const inNames = new Map(), lowerUse = new Map();
  for (const e of P.entries) for (const w of words(e.text)) {
    if (NAMEY.has(e.type) && /^\p{Lu}\p{Ll}{3,}$/u.test(w)) inNames.set(low(w), (inNames.get(low(w)) || 0) + 1);
    if (!cap(w)) lowerUse.set(w, (lowerUse.get(w) || 0) + 1);
  }
  const sus = w => (inNames.has(w) || pWords.has(w)) && !kept.has(w) && (lowerUse.get(w) || 0) <= Math.max(2, inNames.get(w) || 0) && (!commonSingle.has(w) || (inNames.get(w) || 0) >= 3 * (lowerUse.get(w) || 0));
  const more = [];
  for (const e of P.entries) {
    if ((e.type !== 'common' && e.type !== 'phrase') || done.has(e.id) || /\p{Lu}/u.test(e.text)) continue;
    const ws = words(e.text); if (ws.length < 2 || !ws.some(sus)) continue;
    more.push([e.id, 'D', e.text, e.gloss || '', e.type + (e.aliasOf ? ' alias of "' + (P.ix.entry.get(e.aliasOf)?.text || '?') + '" (' + e.aliasKind + ')' : ''), [...new Set(Object.values(e.show || {}))].join(' | '), ws.filter(sus).map(w => w[0].toUpperCase() + w.slice(1)).join(' '), themeNames(e)]);
  }
  more.sort((a, b) => low(a[2]).localeCompare(low(b[2])));
  fs.writeFileSync(here(`./propword/list-${n}.txt`), more.map(r => r.join('\t')).join('\n') + '\n');
  console.log(`${more.length} more candidates (group D) in tools/gen/propword/list-${n}.txt`);
}

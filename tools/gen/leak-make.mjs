// Lists one chunk of themes whose entries contain a word of the theme's name (see nameLeak in js/validate.js).
// Run: node tools/gen/leak-make.mjs            number of chunks
//      add --kept to list instead the entries kept by name (nameOkIn) for a stricter second look: node tools/gen/leak-make.mjs --kept [<n>]
//      node tools/gen/leak-make.mjs <n>        chunk n (1-based): per theme its path, flags, note, a sample of the other words, and every leaking entry with a suggested shorter form
// Chunks are filled in theme tree order up to about SIZE leaking entries each (a theme is never split); themes already in tools/gen/leak/done.json or marked nameOk are skipped.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, sameText } from '../../js/model.js';
import { nameLeak, themeNameWords } from '../../js/validate.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
reindex(P);
const ki = process.argv.indexOf('--kept'), KEPT = ki >= 0; if (KEPT) process.argv.splice(ki, 1);   // KEPT: the roots whose full text was kept by name
const SIZE = KEPT ? 200 : 330;
const doneFile = new URL('./leak/' + (KEPT ? 'kept-done.json' : 'done.json'), import.meta.url);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const tree = []; const walk = id => { for (const t of P.ix.kids.get(id) || []) { tree.push(t); walk(t.id); } }; walk('');
const todo = [];
for (const t of tree) {
  if (t.group || t.nameOk || done.has(t.id)) continue;
  const ws = themeNameWords(t), ents = P.ix.byTheme.get(t.id) || [], leaks = KEPT ? ents.filter(e => !e.aliasOf && (e.nameOkIn || []).includes(t.id) && nameLeak(t, { text: e.text }, ws)) : ents.filter(e => nameLeak(t, e, ws));
  if (leaks.length) todo.push({ t, ws, ents, leaks });
}
const chunks = []; let cur = [], n0 = 0;
for (const x of todo) { if (cur.length && n0 + x.leaks.length > SIZE) { chunks.push(cur); cur = []; n0 = 0; } cur.push(x); n0 += x.leaks.length; }
if (cur.length) chunks.push(cur);
const n = +process.argv[2];
if (!n) { console.log(chunks.length, 'chunks;', todo.length, 'themes and', todo.reduce((s, x) => s + x.leaks.length, 0), 'entries left'); process.exit(); }
const chunk = chunks[n - 1]; if (!chunk) throw Error('no such chunk');
const FILLER = new Set(['of', 'the', 'a', 'an', 'de', 'du', 'la', 'le', 'and', 'in', 'on']);
const stem = w => w.length > 4 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 4 && /(ches|shes|sses|xes)$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w;
function strip(text, ws) {
  const toks = text.split(/\s+/).filter(w => !ws.includes(stem(w.toLowerCase().normalize('NFKD').replace(/[^a-z]/g, ''))));
  while (toks.length && FILLER.has(toks[0].toLowerCase())) toks.shift();
  while (toks.length && FILLER.has(toks[toks.length - 1].toLowerCase())) toks.pop();
  return toks.join(' ');
}
for (const { t, ws, ents, leaks } of chunk) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',') + (t.region.length ? ' region:' + t.region.join('/') : '');
  const clean = ents.filter(e => !leaks.includes(e) && !e.aliasOf);
  console.log(`\nTHEME ${t.id} | ${path.join(' > ')} | ${flags || 'no flags'}${t.note ? ' | note: ' + t.note : ''} | name words: ${ws.join(', ')} | ${leaks.length} of ${ents.length} entries leak`);
  if (clean.length) console.log(`  other words (no leak): ${clean.slice(0, 8).map(e => e.text).join(', ')}${clean.length > 8 ? ', ... (' + clean.length + ')' : ''}`);
  for (const e of leaks.sort((a, b) => a.text.localeCompare(b.text))) {
    const s = strip(e.text, ws), same = s ? sameText(P, s).filter(x => x !== e) : [];
    const root = e.aliasOf && P.ix.entry.get(e.aliasOf);
    console.log(`${e.id} ${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''} | ${e.pos || ''} ${e.type} | rec ${e.fam} pop ${e.typ[t.id] || (root && root.typ[t.id]) || '-'} | ${root ? 'ALIAS (' + e.aliasKind + ') of ' + root.text : 'root'}${Object.keys(e.typ).length > 1 ? ' | in ' + Object.keys(e.typ).length + ' themes' : ''}` +
      ` | shorter: ${s ? '"' + s + '"' : '(nothing left)'}${same.length ? ' | existing "' + s + '": ' + same.map(x => `${x.id}${x.gloss ? ' (' + x.gloss + ')' : ''}${x.aliasOf ? ' alias' : ''} rec ${x.fam}${(P.ix.byTheme.get(t.id) || []).includes(x) ? ' ALREADY IN THIS THEME' : ''}`).join('; ') : ''}`);
  }
}

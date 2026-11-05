// Lists one chunk of themes that mix parts of speech (see pos-lib.mjs) for the part-of-speech review.
// Run: node tools/gen/pos-make.mjs            number of chunks
//      node tools/gen/pos-make.mjs <n>        chunk n (1-based)
//      node tools/gen/pos-make.mjs skipped    the exempt themes that would otherwise have been flagged
// Chunks are filled in theme tree order up to about SIZE listed entries each (a theme is never split); themes already in tools/gen/pos/done.json are skipped.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, sameText } from '../../js/model.js';
import { flagged, norm, EXEMPT } from './pos-lib.mjs';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const SIZE = 120;
const doneFile = new URL('./pos/done.json', import.meta.url);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const order = new Map(); { let i = 0; const walk = id => { for (const t of P.ix.kids.get(id) || []) { order.set(t.id, i++); walk(t.id); } }; walk(''); }
const todo = flagged(P).filter(x => !done.has(x.t.id)).sort((a, b) => order.get(a.t.id) - order.get(b.t.id));
const chunks = []; let cur = [], n0 = 0;
for (const x of todo) { if (cur.length && n0 + x.minor.length > SIZE) { chunks.push(cur); cur = []; n0 = 0; } cur.push(x); n0 += x.minor.length; }
if (cur.length) chunks.push(cur);
const arg = process.argv[2];
if (arg === 'skipped') {
  for (const t of P.themes) if (!t.group && EXEMPT(t)) {
    const roots = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && !/[ -]/.test(e.text)), by = {}; for (const e of roots) by[norm(e)] = (by[norm(e)] || 0) + 1;
    const v = Object.values(by).sort((a, b) => b - a); if (roots.length >= 6 && v[1] / roots.length >= 0.15) console.log(t.id + (t.lang ? ' (language-specific)' : ''), JSON.stringify(by));
  }
  process.exit();
}
if (arg === 'theme') {   // every root entry of one theme with its part of speech: node tools/gen/pos-make.mjs theme <themeId>
  const t = P.ix.theme.get(process.argv[3]); if (!t) throw Error('no such theme');
  for (const e of (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf).sort((a, b) => norm(a).localeCompare(norm(b)) || a.text.localeCompare(b.text))) console.log(`${e.id} ${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''} | ${norm(e)} | rec ${e.fam} pop ${e.typ[t.id]}`);
  process.exit();
}
const n = +arg;
if (!n) { console.log(chunks.length, 'chunks;', todo.length, 'themes and', todo.reduce((s, x) => s + x.minor.length, 0), 'entries left'); process.exit(); }
const chunk = chunks[n - 1]; if (!chunk) throw Error('no such chunk');
const FORMS = (a, b) => { const c = [a + 'y', a + 'ly', a + 'ing', a + 'ed', a + 'er', a + 's', a + 'es', a.replace(/e$/, '') + 'ing', a.replace(/e$/, '') + 'y', a.replace(/e$/, '') + 'ed', a + a.slice(-1) + 'y', a + a.slice(-1) + 'ing', a + a.slice(-1) + 'ed', a + 'al', a + 'ic', a + 'ish', a + 'ful', a + 'less', a.replace(/y$/, 'ier'), a.replace(/y$/, 'ies'), a + 'ness', a + 'ment', a + 'ion', a + 'ation', a + 'ity']; return c.includes(b); };
const label = e => e.text + (e.gloss ? ` (${e.gloss})` : '');
for (const { t, roots, ranked, dominant, minor } of chunk) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',') + (t.region.length ? ' region:' + t.region.join('/') : '');
  console.log(`\nTHEME ${t.id} | ${path.join(' > ')} | ${flags || 'no flags'}${t.note ? ' | note: ' + t.note : ''} | ${ranked.map(([p, l]) => l.length + ' ' + p).join(', ')} | most common: ${dominant} | ${minor.length} of ${roots.length} are not ${dominant}`);
  const dom = roots.filter(e => norm(e) === dominant);
  console.log(`  ${dominant} words in the theme: ${dom.slice(0, 10).map(e => e.text).join(', ')}${dom.length > 10 ? ', ... (' + dom.length + ')' : ''}`);
  for (const e of minor.sort((a, b) => a.text.localeCompare(b.text))) {
    const w = e.text.toLowerCase(), inTheme = roots.filter(r => r !== e && (FORMS(r.text.toLowerCase(), w) || FORMS(w, r.text.toLowerCase())));
    const others = Object.keys(e.typ).filter(x => x !== t.id).map(x => P.ix.theme.get(x)?.name).filter(Boolean);
    const stems = [...new Set([w.replace(/(y|ly|ing|ed|er|ness|ish|ful|less|al|ic)$/, ''), w.replace(/(ied|ier|ies)$/, 'y')])].filter(s => s.length > 2 && s !== w);
    const lib = stems.flatMap(s => sameText(P, s)).filter(x => !x.aliasOf && x !== e && !inTheme.includes(x));
    console.log(`${e.id} ${label(e)} | ${norm(e)} ${e.type} | rec ${e.fam} pop ${e.typ[t.id]} | ${others.length ? 'also in ' + others.length + ' themes: ' + others.slice(0, 3).join(', ') : 'only in this theme'}` +
      `${inTheme.length ? ' | SAME WORD IN THEME: ' + inTheme.map(r => `${r.id} ${label(r)} ${norm(r)}`).join('; ') : ''}${lib.length ? ' | related entries elsewhere: ' + lib.slice(0, 4).map(r => `${r.id} ${label(r)} ${norm(r)}`).join('; ') : ''}`);
  }
}

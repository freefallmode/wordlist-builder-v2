// Lists themes (8+ words) where a second part of speech makes up 15% or more of the words, with the minority words (a weather theme of three adjectives and a noun).
// Run: node tools/gen/mixed-pos.mjs [out.md]      default out: tools/gen/mixed-pos.md
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const norm = e => { const p = (e.pos || 'noun').toLowerCase(); return p === 'adj' ? 'adjective' : p; };
const lab = e => e.text + (e.gloss ? ` (${e.gloss})` : '');
const rows = [];
for (const t of P.themes) {
  if (t.group) continue;
  const roots = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.type !== 'phrase' && !/ /.test(e.text));
  if (roots.length < 8) continue;
  const by = {}; for (const e of roots) (by[norm(e)] ||= []).push(e);
  const ranked = Object.entries(by).sort((a, b) => b[1].length - a[1].length);
  if (ranked.length < 2) continue;
  const minor = ranked.slice(1).flatMap(([, l]) => l), share = minor.length / roots.length;
  if (ranked[1][1].length / roots.length < 0.15) continue;
  rows.push({ t, roots, ranked, share, minor });
}
rows.sort((a, b) => b.share - a.share);
const out = ['# Themes that mix parts of speech', '', `${rows.length} themes with 8+ single-word entries where the second most common part of speech is 15% or more. Wordplay themes (language-specific flag) are marked. Phrases and multi-word entries are not counted.`, ''];
for (const { t, roots, ranked, share, minor } of rows) {
  out.push(`### ${t.id}${t.lang ? ' (language-specific)' : ''}${t.complete ? ' (complete)' : ''}: ${ranked.map(([p, l]) => `${l.length} ${p}`).join(', ')} of ${roots.length} (${Math.round(share * 100)}% not ${ranked[0][0]})`);
  out.push(`Minority: ${minor.map(lab).join('; ')}`, '');
}
fs.writeFileSync(process.argv[2] || new URL('./mixed-pos.md', import.meta.url), out.join('\n'));
console.log(rows.length, 'themes;', rows.filter(r => !r.t.lang).length, 'not language-specific;', rows.filter(r => r.share >= 0.3).length, 'at 30% or more');

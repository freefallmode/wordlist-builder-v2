// Kin pass v400 (I22): lists the family-kin suggestions left on the current library (as js/validate.js finds them) and splits them into chunks for review.
// Usage: node tools/gen/kin400/make-chunks.mjs [chunkSize]   -> tools/gen/kin400/chunk-NN.tsv, all.tsv
// Columns: idA idB textA textB typeA typeB famA famB glossA glossB themesA themesB inFamilyExport(A,B)
import fs from 'node:fs';
import { parseProject } from '../../../js/store.js';
import { reindex, eff } from '../../../js/model.js';
import { familyPairs, clashGroups } from '../../../js/family.js';
import { FAMILY_OK } from '../../../js/family-allow.js';
import { buildExport, PRESETS } from '../../../js/export.js';
const dir = new URL('./', import.meta.url);
const P = parseProject(fs.readFileSync(new URL('../../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const ix = P.ix, playable = P.themes.filter(t => !t.group && eff(P, t.id).enabled), isPlay = new Set(playable.map(t => t.id));
const pk = (a, b) => a < b ? a + '|' + b : b + '|' + a;
const cg = clashGroups(P, playable, id => !!ix.entry.get(id)?.enabled);
let fam;   // ids in the family export (the gloss trick of tools/gen/batch399.mjs: the export carries glosses, so put the id in the gloss for one build)
{ const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }); fam = new Set(file.entries.gloss.map(Number)); } finally { for (const e of P.entries) e.gloss = g.get(e.id); } }
const items = [];
for (const e of P.entries) { if (e.aliasOf || !e.enabled) continue; const ts = Object.keys(e.typ).filter(t => isPlay.has(t)); if (ts.length) items.push({ id: e.id, text: e.text, ts: new Set(ts), e }); }
const rows = [];
for (const [a, b] of familyPairs(items)) {
  if ((a.e.kin || []).includes(b.id) || FAMILY_OK.has(pk(a.id, b.id))) continue;
  if (a.e.type !== b.e.type || /^\p{Lu}/u.test(a.text) !== /^\p{Lu}/u.test(b.text)) continue;
  if (cg.id(a.id) && cg.id(a.id) === cg.id(b.id)) continue;
  if (![...a.ts].some(t => !b.ts.has(t)) && ![...b.ts].some(t => !a.ts.has(t))) continue;
  const [x, y] = a.id < b.id ? [a, b] : [b, a];
  rows.push({ mn: Math.min(x.e.fam || 9, y.e.fam || 9), mx: Math.max(x.e.fam || 9, y.e.fam || 9), cols: [x.id, y.id, x.text, y.text, x.e.type, y.e.type, x.e.fam, y.e.fam, x.e.gloss || '', y.e.gloss || '', [...x.ts].slice(0, 4).join(','), [...y.ts].slice(0, 4).join(','), (fam.has(x.id) ? 'F' : '-') + (fam.has(y.id) ? 'F' : '-')] });
}
rows.sort((p, q) => p.mn - q.mn || p.mx - q.mx || p.cols[0] - q.cols[0] || p.cols[1] - q.cols[1]);
const size = +process.argv[2] || 490, lines = rows.map(r => r.cols.join('\t'));
fs.writeFileSync(new URL('all.tsv', dir), lines.join('\n') + '\n');
for (let i = 0, n = 1; i < lines.length; i += size, n++) fs.writeFileSync(new URL(`chunk-${String(n).padStart(2, '0')}.tsv`, dir), lines.slice(i, i + size).join('\n') + '\n');
console.log('library v' + P.lib.version, 'suggestions', rows.length, 'chunks', Math.ceil(rows.length / size), 'family-export flag computed:', fam.size > 0);

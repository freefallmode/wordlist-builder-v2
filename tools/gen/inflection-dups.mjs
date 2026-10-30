// Finds themes holding two entries that are inflections of one word (wood / woods, run / running, city / cities).
// Run: node tools/gen/inflection-dups.mjs [library] [out.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const P = parseProject(readFileSync(process.argv[2] || new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
// all plausible base forms of a lower-case word, longest-removal last
const bases = w => { const b = new Set([w]);
  if (w.endsWith('ies')) b.add(w.slice(0, -3) + 'y');
  if (w.endsWith('ves')) { b.add(w.slice(0, -3) + 'f'); b.add(w.slice(0, -3) + 'fe'); }
  if (w.endsWith('es')) b.add(w.slice(0, -2));
  if (w.endsWith('s') && !w.endsWith('ss')) b.add(w.slice(0, -1));
  if (w.endsWith('ing') && w.length > 5) { const s = w.slice(0, -3); b.add(s); b.add(s + 'e'); if (/(.)\1$/.test(s)) b.add(s.slice(0, -1)); }
  if (w.endsWith('ed') && w.length > 4) { const s = w.slice(0, -2); b.add(s); b.add(s + 'e'); if (/(.)\1$/.test(s)) b.add(s.slice(0, -1)); if (w.endsWith('ied')) b.add(w.slice(0, -3) + 'y'); }
  return b; };
const by = new Map(); for (const e of P.entries) for (const t of linkIds(P, e)) (by.get(t) || by.set(t, []).get(t)).push(e);
const out = [], seen = new Set();
for (const [t, es] of by) {
  const ix = new Map(); for (const e of es) (ix.get(e.text.toLowerCase()) || ix.set(e.text.toLowerCase(), []).get(e.text.toLowerCase())).push(e);
  for (const [w, list] of ix) for (const b of bases(w)) if (b !== w && ix.has(b)) {
    const A = ix.get(b)[0], B = list[0]; if ((A.gloss || '') !== (B.gloss || '') && A.gloss && B.gloss) continue;   // different labelled meanings: not an inflection pair
    if (A.aliasOf === B.id || B.aliasOf === A.id) continue;
    const k = t + '|' + A.id + '|' + B.id; if (seen.has(k)) continue; seen.add(k);
    out.push({ theme: t, base: A.text, form: B.text, baseId: A.id, formId: B.id, baseAlias: !!A.aliasOf, formAlias: !!B.aliasOf, kind: w.endsWith('ing') ? 'ing' : w.endsWith('ed') ? 'ed' : 's', baseRating: A.th[t], formRating: B.th[t] });
  }
}
const k = {}; for (const o of out) k[o.kind] = (k[o.kind] || 0) + 1;
console.log(out.length, 'pairs in', new Set(out.map(o => o.theme)).size, 'themes', k, '| distinct word pairs', new Set(out.map(o => o.baseId + '|' + o.formId)).size);
if (process.argv[3]) writeFileSync(process.argv[3], JSON.stringify(out, null, 1));

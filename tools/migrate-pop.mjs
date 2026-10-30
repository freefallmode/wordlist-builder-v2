// One-off migration to the popularity model: inflected aliases (skis for ski) become kind 'form', the stored theme difficulty `d` is dropped (it is worked out now)
// and every theme gets an unrated popularity `pop`.
// Run: node tools/migrate-pop.mjs [library]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../js/store.js';
import { reindex } from '../js/model.js';
const LIB = process.argv[2] || new URL('../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);
const bases = w => { const b = new Set([w]);
  if (w.endsWith('ies')) b.add(w.slice(0, -3) + 'y');
  if (w.endsWith('ves')) { b.add(w.slice(0, -3) + 'f'); b.add(w.slice(0, -3) + 'fe'); }
  if (w.endsWith('es')) b.add(w.slice(0, -2));
  if (w.endsWith('s') && !w.endsWith('ss')) b.add(w.slice(0, -1));
  if (w.endsWith('ing') && w.length > 5) { const s = w.slice(0, -3); b.add(s); b.add(s + 'e'); if (/(.)\1$/.test(s)) b.add(s.slice(0, -1)); }
  if (w.endsWith('ed') && w.length > 4) { const s = w.slice(0, -2); b.add(s); b.add(s + 'e'); if (/(.)\1$/.test(s)) b.add(s.slice(0, -1)); }
  return b; };
let forms = 0; const names = [];
for (const e of P.entries) {
  if (!e.aliasOf || e.aliasKind !== 'synonym') continue;
  const r = P.ix.entry.get(e.aliasOf), a = e.text.toLowerCase(), b = r.text.toLowerCase();
  if (a !== b && (bases(a).has(b) || bases(b).has(a))) { e.aliasKind = 'form'; forms++; names.push(r.text + '/' + e.text); }
}
for (const t of P.themes) { delete t.d; t.pop = t.pop || 0; }
stampSave(P); writeFileSync(LIB, serializeProject(P));
console.log(forms, 'aliases made forms:', names.join(', '));
console.log('library v' + P.lib.version);

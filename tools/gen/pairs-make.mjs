// Lists replacements where the review chose a different well-known name (synonym) although the shortened form of the full name is also a candidate:
// "baking soda" replaced by "bicarb" could also be "soda". The full name is now an alias (nameOkIn) of the chosen name.
// Run: node tools/gen/pairs-make.mjs
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, sameText } from '../../js/model.js';
import { themeNameWords } from '../../js/validate.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const FILLER = new Set(['of', 'the', 'a', 'an', 'de', 'du', 'la', 'le', 'and', 'in', 'on']);
const stem = w => w.length > 4 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 4 && /(ches|shes|sses|xes)$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w;
let n = 0;
for (const a of P.entries) {
  if (!a.aliasOf || a.aliasKind !== 'synonym' || !(a.nameOkIn || []).length) continue;
  const r = P.ix.entry.get(a.aliasOf); if (!r) continue;
  for (const tid of a.nameOkIn) {
    const t = P.ix.theme.get(tid); if (!t) continue;
    const ws = themeNameWords(t);
    const toks = a.text.split(/\s+/).filter(w => !ws.includes(stem(w.toLowerCase().normalize('NFKD').replace(/[^a-z]/g, ''))));
    while (toks.length && FILLER.has(toks[0].toLowerCase())) toks.shift(); while (toks.length && FILLER.has(toks[toks.length - 1].toLowerCase())) toks.pop();
    const bare = toks.join(' '); if (!bare || bare.toLowerCase() === r.text.toLowerCase() || bare.length < 2) continue;
    const have = sameText(P, bare).filter(x => !x.aliasOf);
    n++;
    console.log(`${a.id}\t${tid}\t${a.text}\t-> ${r.id} ${r.text}${r.gloss ? ' (' + r.gloss + ')' : ''}\tbare "${bare}"${have.length ? ' EXISTS: ' + have.map(x => x.id + (x.gloss ? ' (' + x.gloss + ')' : '') + (x.typ[tid] !== undefined ? ' IN THEME' : '')).join('; ') : ''}`);
  }
}
console.log(n, 'candidates');

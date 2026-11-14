// Shown texts whose capital does not fit: common words that kept the capital of the old bare stub (Killer -> killer), and proper nouns shown lowercase (neapolitan -> Neapolitan).
// Wordplay and compound themes are left alone (the game treats a shown text there as a leftover part). Run: node tools/gen/case-fix2.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, themeLocked } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const LOWER = new Set(['Killer', 'Quarter', 'Gum', 'Kitchen', 'Secretary', 'Plush', 'Moon', 'Pointer', 'Sling', 'Brown', 'Forbidden', 'Pointed', 'Sandy', 'Capital', 'Vocational', 'Pine', 'Fixed-gear', 'Hillbilly', 'Instant', 'Atomic', 'Glass', 'Slayer', 'High']);
const CAP = { neapolitan: 'Neapolitan', sicilian: 'Sicilian', mornay: 'Mornay', danish: 'Danish', bengal: 'Bengal', berber: 'Berber', banyan: 'Banyan', 'brazil nut': 'Brazil nut', bollywood: 'Bollywood', overlook: 'Overlook', 'bhutanese red': 'Bhutanese red', worcestershire: 'Worcestershire', dundee: 'Dundee', madeira: 'Madeira' };
const log = [];
for (const e of P.entries) if (e.show) for (const [t, s] of Object.entries(e.show)) {
  const th = P.ix.theme.get(t); if (!th || themeLocked(P, th) || th.tkind === 'wordplay' || th.tkind === 'compound') continue;
  if (e.text.startsWith('phonetic')) continue;
  let n = null;
  if (LOWER.has(s) && !/^\p{Lu}/u.test(e.text)) n = s.toLowerCase();
  else if (CAP[s]) n = CAP[s];
  if (n && n !== s) { e.show[t] = n; log.push(`${t}: ${e.text}  ${s} -> ${n}`); }
}
console.log(log.length); console.log(log.join('\n'));
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length);
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(new URL('./case-fix2-log.txt', import.meta.url), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }

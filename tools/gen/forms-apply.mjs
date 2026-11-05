// Applies the shorter-root swaps and word-family merges decided from forms-analyze.mjs.
// Run: node tools/gen/forms-apply.mjs [--apply]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);
// alias ids whose (shorter) text becomes the root; reviewed by hand: modifier + head, name + category word, distinctive surnames of well-known people. Left alone: idioms, team nicknames, obscure surnames, ambiguous short texts.
const SWAP = [722,1160,1297,1379,1781,2263,2326,2431,2524,3133,3167,3383,4735,6383,6390,6444,7950,12481,13572,13574,13652,13958,13961,15091,17189,17389,17489,18521,18957,36140,36614,36652,36996,37000,37002,38367,38539,41077,41391,41928,41930,41933,41938,41943,41945,41951,41987,41990,41993,41995,42003,42024,43648,46516,46562,46778,47908,49254,49255,50232,50238,50241,52605,52693,52933,51968,51970,55557,55562,55117,55737,58184,58210,58211,58212,58213,58214,58830,58858,58860,58862,58912,60559,60713,61992,61993,61994,61995];
// [root, alias] same word, other part of speech; the alias becomes a `form`
const FAMILY = [[1965,2022],[1969,2023],[1970,2021],[1971,2025],[1974,2024],[40,14745],[14740,14748],[14741,14773],[25279,25293],[1979,31246],[2014,31247],[25303,25318],[12529,22799]];
const move = (A, B, kind) => {   // B becomes the root, A its alias
  for (const x of P.entries) if (x.aliasOf === A.id && x !== B) x.aliasOf = B.id;
  for (const [t, v] of Object.entries(A.typ)) B.typ[t] = B.typ[t] === undefined ? v : Math.min(B.typ[t], v);
  B.aliasOf = null; delete B.aliasKind;
  A.aliasOf = B.id; A.aliasKind = kind; A.typ = {};
};
let ns = 0, nf = 0, skip = [];
for (const id of SWAP) {
  const B = P.ix.entry.get(id), A = B && B.aliasOf && P.ix.entry.get(B.aliasOf);
  if (!A || A.aliasOf) { skip.push(id); continue; }
  move(A, B, 'synonym'); ns++;
}
for (const [r, a] of FAMILY) {
  const R = P.ix.entry.get(r), A = P.ix.entry.get(a);
  if (!R || !A || R.aliasOf || A.aliasOf) { skip.push(a); continue; }
  move(A, R, 'form'); nf++;
}
console.log(ns, 'swaps,', nf, 'forms merged; skipped', skip.join(' ') || 'none');
for (const id of [722, 1965, 1974, 36996]) { const e = P.ix.entry.get(id); console.log(id, e.text, e.aliasOf ? 'alias of ' + e.aliasOf : 'root', Object.keys(e.typ).length + ' themes'); }
if (process.argv[2] === '--apply') { reindex(P); stampSave(P); writeFileSync(LIB, serializeProject(P)); console.log('applied, v' + P.lib.version); }

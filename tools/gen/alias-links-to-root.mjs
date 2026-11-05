// Spelling and form aliases are the same word as their root, so the themes they are linked to belong on the root.
// Moves each such alias's own links to its root and clears them from the alias, except in language-specific themes (silent letters, rhymes, spelling wordplay), where the exact spelling matters.
// Run: node tools/gen/alias-links-to-root.mjs [--apply]
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);
let moved = 0, kept = 0, cleared = 0; const sample = [];
for (const a of P.entries) {
  if (!a.aliasOf || !['spelling', 'form'].includes(a.aliasKind)) continue;
  const r = P.ix.entry.get(a.aliasOf); if (!r) continue;
  for (const [tid, v] of Object.entries(a.typ)) {
    if (P.ix.theme.get(tid)?.lang) { kept++; continue; }
    if (r.typ[tid] === undefined) { r.typ[tid] = v; moved++; if (sample.length < 14) sample.push(`${a.text} -> ${r.text}: ${tid}`); } else cleared++;
    delete a.typ[tid];
  }
}
console.log(moved, 'links moved to the root;', cleared, 'already on the root (cleared from the alias);', kept, 'kept on the alias in language-specific themes');
console.log(sample.join('\n'));
if (process.argv[2] === '--apply') { reindex(P); stampSave(P); writeFileSync(LIB, serializeProject(P)); console.log('applied, v' + P.lib.version); }

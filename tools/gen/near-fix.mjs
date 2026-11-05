// Turns reviewed near-duplicate pairs into aliases of the short root: node tools/gen/near-fix.mjs <library>
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const f = process.argv[2], P = parseProject(readFileSync(f, 'utf8')); reindex(P);
const PAIRS = [['sense of smell', 'smell', 'synonym'], ['sense of touch', 'touch', 'synonym'], ['double double', 'double-double', 'spelling'], ['to starboard', 'starboard', 'synonym'], ['to port', 'port', 'synonym']];
for (const [al, root, kind] of PAIRS) {
  const a = P.entries.filter(e => e.text === al && !e.aliasOf), r = P.entries.filter(e => e.text === root && !e.aliasOf);
  if (a.length !== 1 || !r.length) { console.log('skip', al, a.length, r.length); continue; }
  const ra = a[0]; const rt = r.find(x => Object.keys(x.typ).some(t => ra.typ[t] !== undefined)) || r[0];
  if (P.entries.some(e => e.aliasOf === ra.id)) { console.log('has aliases', al); continue; }
  ra.aliasOf = rt.id; ra.aliasKind = kind; ra.type = rt.type; console.log('alias', al, '->', rt.text, rt.gloss || '');
}
reindex(P); stampSave(P); writeFileSync(f, serializeProject(P));

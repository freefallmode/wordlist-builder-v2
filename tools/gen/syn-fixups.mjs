// Fixes after the full synonym run: PNG (image format) back as its own entry, and the same-meaning pairs the promotion created (merged into one entry).
// Run once: node tools/gen/syn-fixups.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry, sameText } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const png = P.ix.entry.get(36148), root = P.ix.entry.get(png.aliasOf);
delete root.typ.file_types; png.aliasOf = 0; png.aliasKind = ''; png.gloss = 'image'; png.typ = { file_types: 1 };
const pairs = [['shisha', 'hookah', 'water pipe'], ['safety glasses', 'protective', 'goggles'], ['cab', 'yellow taxi', 'taxi'], ['Roomba', 'robot vacuum', 'gadget'], ['rookie', 'recruit', 'beginner']];
for (const [text, g1, g2] of pairs) {
  const a = sameText(P, text).find(e => e.gloss === g1 && !e.aliasOf), b = sameText(P, text).find(e => e.gloss === g2 && !e.aliasOf);
  if (!a || !b) { console.log('missing pair', text); continue; }
  const keep = Object.keys(a.typ).length >= Object.keys(b.typ).length ? a : b, drop = keep === a ? b : a;
  for (const [t, p] of Object.entries(drop.typ)) keep.typ[t] = keep.typ[t] === undefined ? p : Math.min(keep.typ[t], p);
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === drop.id ? keep.id : id))]).filter(g => g.length > 1);
  for (const x of P.entries) if (x.aliasOf === drop.id) x.aliasOf = keep.id;
  keep.fam = Math.min(keep.fam || 9, drop.fam || 9);
  deleteEntry(P, drop); reindex(P); console.log('merged', text, g1, '+', g2, '->', keep.gloss);
}
for (const t of P.themes) if (t.groups && !t.groups.length) delete t.groups;
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

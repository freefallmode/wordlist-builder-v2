// Fixes after the region-differing synonym run (library v215): same-meaning pairs the promotion created are merged into one entry.
// Run once: node tools/gen/syn-fixups2.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry, sameText } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const sets = [['dryer', ['clothes dryer', 'clothes']], ['sandbox', ['toy', 'play area']], ['schedule', ['timetable', 'bus', 'transport']]];
for (const [text, glosses] of sets) {
  const es = glosses.map(g => sameText(P, text).find(e => e.gloss === g && !e.aliasOf));
  if (es.some(e => !e)) { console.log('missing', text); continue; }
  const keep = es.reduce((a, b) => Object.keys(b.th).length > Object.keys(a.th).length ? b : a);
  for (const drop of es.filter(e => e !== keep)) {
    for (const [t, p] of Object.entries(drop.th)) keep.th[t] = keep.th[t] === undefined ? p : Math.min(keep.th[t], p);
    for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === drop.id ? keep.id : id))]).filter(g => g.length > 1);
    for (const x of P.entries) if (x.aliasOf === drop.id) x.aliasOf = keep.id;
    keep.rec = Math.min(keep.rec || 9, drop.rec || 9);
    deleteEntry(P, drop); reindex(P);
  }
  console.log('merged', text, '->', keep.gloss);
}
for (const t of P.themes) if (t.groups && !t.groups.length) delete t.groups;
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

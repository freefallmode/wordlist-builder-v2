// Phase 4 (families) of DESIGN-entries.md, 2026-11-01: the library has 92 form aliases and only three in-theme pairs that are one answer in two forms; those become form aliases.
// Run once: node tools/gen/syn-forms.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const [rid, fid] of [[43937, 43956], [43935, 43957], [61990, 52044]]) {   // javelin throw/throwing, discus throw/throwing, Maasai jump/jumping
  const r = P.ix.entry.get(rid), f = P.ix.entry.get(fid);
  if (!r || !f || f.aliasOf) { console.log('skip', rid, fid); continue; }
  for (const [t, p] of Object.entries(f.typ)) if (r.typ[t] === undefined) r.typ[t] = p;
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(id => id === fid ? rid : id))]).filter(g => g.length > 1);
  for (const x of P.entries) if (x.aliasOf === fid) x.aliasOf = rid;
  f.typ = {}; f.use = {}; f.show = {}; f.aliasOf = rid; f.aliasKind = 'form'; console.log(f.text, '-> form of', r.text);
}
for (const t of P.themes) if (t.groups && !t.groups.length) delete t.groups;
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);

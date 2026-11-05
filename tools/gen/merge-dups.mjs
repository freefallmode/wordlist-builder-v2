// Merges root entries with the same text and part of speech that share a theme (two review agents each made the bare word): node tools/gen/merge-dups.mjs [--apply] [--skip id,id]
// The lower id stays: it takes the other's theme links (the easier rating), display texts, aliases, flags and group places; the other is deleted. --skip lists ids to leave alone (two real senses).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const args = process.argv.slice(2), APPLY = args.includes('--apply');
const skip = new Set((args[args.indexOf('--skip') + 1] || '').split(',').filter(Boolean).map(Number));
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const by = new Map();
for (const e of P.entries) if (!e.aliasOf) { const k = e.text.trim().toLowerCase() + '|' + e.pos; (by.get(k) || by.set(k, []).get(k)).push(e); }
let n = 0;
for (const g of by.values()) {
  if (g.length < 2) continue;
  g.sort((a, b) => a.id - b.id);
  for (const o of g.slice(1)) {
    const keep = g.find(x => x.id < o.id && !skip.has(x.id) && !skip.has(o.id) && linkIds(P, x).some(t => linkIds(P, o).includes(t)) && (x.gloss || o.gloss));
    if (!keep) continue;
    console.log(`merge ${o.id} ${o.text} (${o.gloss}) into ${keep.id} (${keep.gloss})`); n++;
    if (!APPLY) continue;
    for (const [t, v] of Object.entries(o.typ)) keep.typ[t] = keep.typ[t] === undefined ? v : Math.min(keep.typ[t] || 9, v || 9) % 9 || keep.typ[t];
    keep.show = { ...o.show, ...keep.show }; keep.use = { ...o.use, ...keep.use };
    keep.nameOkIn = [...new Set([...(keep.nameOkIn || []), ...(o.nameOkIn || [])])];
    for (const f of ['adult', 'sensitive', 'tm', 'vulgar']) keep[f] = keep[f] || o[f];
    keep.fam = Math.min(keep.fam || 9, o.fam || 9) % 9 || keep.fam;
    for (const a of P.entries) if (a.aliasOf === o.id) a.aliasOf = keep.id;
    for (const e of P.entries) for (const [t, id] of Object.entries(e.use || {})) if (id === o.id) e.use[t] = keep.id;
    for (const t of P.themes) if (t.groups) t.groups = t.groups.map(gr => [...new Set(gr.map(id => id === o.id ? keep.id : id))]).filter(gr => gr.length >= 2);
    P.entries = P.entries.filter(x => x !== o); reindex(P);
  }
}
console.log(n, 'merges');
if (APPLY) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

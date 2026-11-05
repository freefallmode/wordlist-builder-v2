// Turns the full names that the kept-by-name review left as "form" aliases of a bare word (rock garden of rock) back into entries of their own.
// The theme shows the bare text through the entry's `show` field. Needs the library as it was before that review (git show 06ba55c:data/wordlist-en.project.json > tools/gen/.tmp/pre-kept.json).
// Run once: node tools/gen/show-migrate.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const O = parseProject(fs.readFileSync(new URL('./.tmp/pre-kept.json', import.meta.url), 'utf8')); reindex(O);
const tk = t => new Set(t.toLowerCase().split(/\W+/).filter(Boolean));
const plan = new Map();   // `${tid}|${rootId}` -> aliases wanting that bare word in that theme
for (const a of P.entries) {
  if (a.aliasKind !== 'form' || !a.nameOkIn.length || !/\s/.test(a.text.trim())) continue;
  const r = P.ix.entry.get(a.aliasOf), oa = O.ix.entry.get(a.id);
  if (oa?.aliasOf || ![...tk(r.text)].every(w => tk(a.text).has(w))) continue;   // a genuine form (skis, hot springs), not a full name
  const or = O.ix.entry.get(r.id);
  for (const tid of a.nameOkIn) {
    if (r.typ[tid] === undefined) continue;
    if (or && or.typ[tid] !== undefined) continue;   // the bare word was already in the theme: the review merged two entries; left for a person
    const k = tid + '|' + r.id; if (!plan.has(k)) plan.set(k, []); plan.get(k).push(a);
  }
}
const stat = { restored: 0, links: 0, ambiguous: 0, rootsDeleted: 0, moved: 0 }, ambiguous = [], restoredBy = new Map();
for (const [k, as] of plan) {
  const [tid, rid] = k.split('|'), r = P.ix.entry.get(+rid);
  if (as.length > 1) { stat.ambiguous++; ambiguous.push(`${tid}: ${as.map(a => a.text).join(' / ')} -> ${r.text}`); continue; }
  const a = as[0], pop = r.typ[tid];
  a.typ[tid] = pop; a.show = { ...a.show, [tid]: r.text }; delete r.typ[tid];
  for (const s of P.entries) if (s.aliasOf === r.id && s.aliasKind === 'synonym' && s !== a && s.typ[tid] === undefined) s.typ[tid] = pop;   // the synonym stays in the theme until synonyms are migrated
  if (!restoredBy.has(a.id)) restoredBy.set(a.id, new Set()); restoredBy.get(a.id).add(r.id);
  stat.links++;
}
for (const [aid, rids] of restoredBy) {
  const a = P.ix.entry.get(aid);
  a.aliasOf = 0; a.aliasKind = ''; a.nameOkIn = []; stat.restored++;
  for (const rid of rids) {
    const r = P.ix.entry.get(rid);
    if (Object.keys(r.typ).length || O.ix.entry.get(r.id)) continue;   // still used elsewhere, or an older entry
    const others = [...restoredBy].filter(([x, set]) => x !== aid && set.has(rid));
    if (others.length) continue;
    for (const s of P.entries) if (s.aliasOf === r.id) { s.aliasOf = a.id; stat.moved++; }   // its other names now belong to the full entry
    r.aliasOf = 0; P.entries.splice(P.entries.indexOf(r), 1); stat.rootsDeleted++;
    reindex(P);
  }
}
for (const a of P.entries) if (a.aliasKind === 'form' && a.nameOkIn.length && a.aliasOf) { /* left as they were */ }
reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
console.log(stat, 'library v' + P.lib.version);
fs.writeFileSync(new URL('./.tmp/show-ambiguous.txt', import.meta.url), ambiguous.join('\n'));
const left = P.entries.filter(a => a.aliasKind === 'form' && a.nameOkIn.length && /\s/.test(a.text.trim()));
console.log('multi-word forms with nameOkIn left:', left.length, left.slice(0, 20).map(a => a.text + '<-' + P.ix.entry.get(a.aliasOf).text).join('; '));

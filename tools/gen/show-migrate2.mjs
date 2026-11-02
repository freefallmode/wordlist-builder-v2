// Turns the full names that the kept-by-name review left as "form" aliases of a bare word (road map of road) back into entries of their own;
// the theme shows the bare text through the entry's `show` field. Works on the library as it is (show-migrate.mjs needed the pre-review copy).
// Run once: node tools/gen/show-migrate2.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const tk = t => new Set(t.toLowerCase().split(/\W+/).filter(Boolean));
const plan = new Map(), skipped = [];   // `${tid}|${rootId}` -> aliases wanting that bare word in that theme
for (const a of P.entries) {
  if (a.aliasKind !== 'form' || !a.nameOkIn?.length) continue;
  const r = P.ix.entry.get(a.aliasOf);
  if (!r || ![...tk(r.text)].every(w => tk(a.text).has(w)) || tk(a.text).size === tk(r.text).size) continue;   // not a longer name of the root
  if (!a.nameOkIn.every(tid => r.th[tid] !== undefined)) { skipped.push(`${a.text} <- ${r.text}: root not in all of ${a.nameOkIn}`); continue; }
  for (const tid of a.nameOkIn) { const k = tid + '|' + r.id; if (!plan.has(k)) plan.set(k, []); plan.get(k).push(a); }
}
const ambiguous = new Set();
for (const [k, as] of plan) if (as.length > 1) { for (const a of as) ambiguous.add(a.id); skipped.push(`${k}: ${as.map(a => a.text).join(' / ')} want the same bare word`); }
const done = [...new Set([...plan.values()].flat())].filter(a => a.nameOkIn.every(tid => plan.get(tid + '|' + a.aliasOf).length === 1) && !ambiguous.has(a.id));
const stat = { restored: 0, links: 0, rootsDeleted: 0, movedAliases: 0, groups: 0 };
for (const a of done) {
  const r = P.ix.entry.get(a.aliasOf);
  for (const tid of a.nameOkIn) {
    const pop = r.th[tid]; a.th[tid] = pop; a.show = { ...a.show, [tid]: r.text }; delete r.th[tid]; stat.links++;
    for (const s of P.entries) if (s.aliasOf === r.id && s.aliasKind === 'synonym' && s.th[tid] === undefined) s.th[tid] = pop;
    const t = P.ix.theme.get(tid); if (t.groups) t.groups = t.groups.map(g => g.map(id => id === r.id ? a.id : id)).map(g => [...new Set(g)]).filter(g => { if (g.length > 1) return true; stat.groups++; return false; });
    if (!r.show) continue; delete r.show[tid];
  }
  a.aliasOf = 0; a.aliasKind = ''; a.nameOkIn = []; stat.restored++;
}
// a bare word left in no theme and no other restored name's root is deleted; its other names go to the full entry
const roots = new Set(done.map(a => a.aliasOf));
reindex(P);
const byRoot = new Map(); for (const a of done) { /* aliasOf was cleared; look the root up through the plan */ }
for (const [k, as] of plan) {
  if (as.length !== 1 || !done.includes(as[0])) continue;
  const r = P.ix.entry.get(+k.split('|')[1]); if (!r || r.aliasOf || Object.keys(r.th).length) continue;
  if (![...plan].every(([k2, as2]) => k2.split('|')[1] !== String(r.id) || as2.length === 1 && done.includes(as2[0]))) continue;
  const heirs = [...new Set([...plan].filter(([k2]) => k2.split('|')[1] === String(r.id)).flatMap(([, as2]) => as2))];
  if (heirs.length !== 1) continue;
  for (const s of P.entries) if (s.aliasOf === r.id) { s.aliasOf = heirs[0].id; stat.movedAliases++; }
  P.entries.splice(P.entries.indexOf(r), 1); stat.rootsDeleted++; reindex(P);
}
reindex(P);
console.log(stat, 'skipped', skipped.length); console.log(skipped.slice(0, 20).join('\n'));
const drop = (id, tid) => { const e = P.ix.entry.get(id); delete e.th[tid]; if (e.show) { delete e.show[tid]; if (!Object.keys(e.show).length) delete e.show; } };
// three cases the show text cannot settle (checked by hand)
drop(8812, 'eagles');   // a spotted eagle ray is a fish, not an eagle
drop(44251, 'coats_and_jackets');   // sports jacket (blazer) is already there
{ const e = P.ix.entry.get(49220); delete e.show.truck_types; e.nameOkIn = ['truck_types']; }   // "truck" alone is the theme's own word, so the full name stays
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(JSON.stringify(bad.slice(0, 4)));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

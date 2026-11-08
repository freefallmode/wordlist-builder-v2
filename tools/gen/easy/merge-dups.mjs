// One-off: eight of the new easy themes turned out to be the same idea as an existing theme under another name. Their words (with the in-theme ratings) move to the existing theme and the new theme is deleted.
// Also drops "pencil" from "in a pencil case" (it gives the theme away) and reports the "roast chicken" link in dinner foods.
// Run: node tools/gen/easy/make-themes.mjs must NOT be re-run afterwards (it would recreate the merged themes).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, deleteTheme } from '../../../js/model.js';
const here = p => new URL(p, import.meta.url), LIB = here('../../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const MERGE = [['things_with_a_tail', 'things_with_tails'], ['things_with_batteries', 'things_that_run_on_batteries'], ['on_a_burger', 'burger_toppings'], ['noisy_things', 'loud_things'],
  ['things_you_cut_with', 'things_that_cut'], ['things_you_do_with_your_mouth', 'mouth_actions'], ['art_supplies', 'art_materials'], ['air_vehicles', 'flying_machines']];
const same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
for (const [from, to] of MERGE) {
  const f = P.ix.theme.get(from), t = P.ix.theme.get(to); if (!f || !t) throw Error('missing ' + from + ' / ' + to);
  let moved = 0, kept = 0;
  for (const e of P.entries) {
    if (e.typ[from] === undefined) continue;
    if (e.typ[to] === undefined) { e.typ[to] = e.typ[from]; moved++; } else kept++;
    if (e.show?.[from] !== undefined && e.show[to] === undefined) e.show[to] = e.show[from];
    if (e.show) delete e.show[from];
  }
  // groups whose members are all in the target now, and are not already grouped there
  for (const g of f.groups || []) {
    const m = g.filter(id => P.ix.entry.get(id)?.typ[to] !== undefined); if (m.length < 2) continue;
    t.groups = t.groups || [];
    const hits = [...new Set(m.map(id => t.groups.find(x => x.includes(id))).filter(Boolean))], first = hits[0] || [];
    for (const id of m) if (!first.includes(id)) first.push(id);
    for (const x of hits.slice(1)) { for (const id of x) if (!first.includes(id)) first.push(id); t.groups.splice(t.groups.indexOf(x), 1); }
    if (!hits.length) t.groups.push(first);
  }
  deleteTheme(P, from); reindex(P);
  console.log(`${from} -> ${to}: ${moved} moved, ${kept} already there`);
}
// the theme name gives "pencil" away
const pen = P.entries.find(e => e.text === 'pencil' && e.typ.in_a_pencil_case !== undefined); if (pen) { delete pen.typ.in_a_pencil_case; console.log('pencil removed from in_a_pencil_case'); }
for (const e of P.entries) if (e.text === 'roast chicken') console.log('roast chicken', e.id, JSON.stringify(e.gloss), Object.keys(e.typ).join(','));
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version);

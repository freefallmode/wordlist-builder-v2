// Puts the agents' regional equivalents (r-<n>.txt) into synonym groups in every theme that holds both words, where the two are not already grouped.
// Only pairs reviewed as "same thing in that theme": the rows listed in SKIP (judgement calls and not-synonyms) are left out. Row numbers are the order this script finds the pairs in
// (the same order as the review list). Rockery / rock garden is not grouped in the Japanese garden theme.
// Run: node tools/gen/regalias/group-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const here = p => new URL(p, import.meta.url), LIB = here('../../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const SKIP = new Set([6, 14, 28, 79, 95, 209,                 // not the same thing: skewbald/pinto, solicitor/lawyer, twitcher/birder, camp bed/cot (twice), down payment/deposit
  11, 22, 23, 96, 99, 141, 170, 173]);                          // judgement calls, left out for now
const NOT_IN = { 7: new Set(['japanese_garden']) };            // row -> themes where the pair is not the same thing
const byText = new Map(); for (const e of P.entries) if (e.enabled) { const k = e.text.toLowerCase(); (byText.get(k) || byText.set(k, []).get(k)).push(e); }
const inGroup = (a, b, t) => (t.groups || []).some(g => g.includes(a) && g.includes(b));
const lab = e => e.text + (e.gloss ? ' [' + e.gloss + ']' : '');
const pairs = [];   // found first, before any group is made, so the row numbers match the review list
for (let i = 1; fs.existsSync(here(`./list-${i}.txt`)); i++) {
  for (const l of fs.readFileSync(here(`./r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const [id, eq] = l.split('|').map(s => s.trim()), root = P.ix.entry.get(+id); if (!root) continue;
    const hits = (byText.get(eq.toLowerCase()) || []).filter(e => e.id !== root.id);
    if (hits.some(e => e.aliasOf === root.id)) continue;
    const roots = hits.filter(e => !e.aliasOf); if (!roots.length) continue;
    const hit = roots.find(h => Object.keys(root.typ).some(t => h.typ[t] !== undefined)); if (!hit) continue;
    const shared = Object.keys(root.typ).filter(t => hit.typ[t] !== undefined);
    if (shared.some(t => inGroup(root.id, hit.id, P.ix.theme.get(t)))) continue;
    pairs.push({ root, hit, shared });
  }
}
let made = 0, extended = 0, merged = 0, themesTouched = new Set(), skipped = [];
pairs.forEach(({ root, hit, shared }, n) => {
    const row = n + 1;
    if (SKIP.has(row)) { skipped.push(`${row} ${lab(root)} / ${lab(hit)}`); return; }
    for (const tid of shared) {
      if (NOT_IN[row]?.has(tid)) continue;
      const t = P.ix.theme.get(tid); if (inGroup(root.id, hit.id, t)) continue;
      t.groups = t.groups || [];
      const ga = t.groups.find(g => g.includes(root.id)), gb = t.groups.find(g => g.includes(hit.id));
      if (ga && gb) { ga.push(...gb.filter(x => !ga.includes(x))); t.groups.splice(t.groups.indexOf(gb), 1); merged++; }
      else if (ga) { ga.push(hit.id); extended++; }
      else if (gb) { gb.push(root.id); extended++; }
      else { t.groups.push([root.id, hit.id]); made++; }
      themesTouched.add(tid);
    }
});
console.log('pairs reviewed', pairs.length, '| skipped', skipped.length); console.log(skipped.join('\n'));
console.log({ newGroups: made, extendedGroups: extended, mergedGroups: merged, themes: themesTouched.size });
const bad = validate(P).filter(i => /group/.test(i.kind || '') || /Synonym group/.test(i.msg)); console.log('group issues', bad.length, bad.slice(0, 8).map(i => i.msg));
if (process.argv.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

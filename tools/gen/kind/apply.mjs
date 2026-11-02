// Sets each theme's `tkind` (category, place, property, wordplay, compound) and `rule` from tools/gen/kind/k-*.txt (BRIEF-kind.md).
// Rules for compounds are written as compound-end:<word> (the member plus the word: "___ bag") or compound-start:<word> (the word plus the member: "snow ___").
// Run once: node tools/gen/kind/apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const LIB = new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const KINDS = ['category', 'place', 'property', 'wordplay', 'compound'];
const OVERRIDE = { words_named_after_places: 'category', colors_named_after_places: 'category', wines_named_for_places: 'category', names_that_are_places: 'category', places_ending_in_land: 'wordplay' };   // checked by hand
const stat = { set: 0, bad: 0, missing: 0 }, seen = {};
for (let n = 1; n <= 6; n++) {
  for (const l of fs.readFileSync(new URL(`./k-${n}.txt`, import.meta.url), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const [id, kind0, rule0 = '-'] = l.split('|').map(x => x.trim());
    const t = P.ix.theme.get(id); let kind = OVERRIDE[id] || kind0;
    if (!t || !KINDS.includes(kind)) { stat.bad++; console.log('bad', l); continue; }
    let rule = rule0 === '-' ? '' : rule0;
    if (kind === 'compound') rule = rule.replace(/^follows:/, 'compound-end:').replace(/^precedes:/, 'compound-start:');
    if (kind !== 'wordplay' && kind !== 'compound') rule = '';
    if (kind === 'compound' && !/^compound-(end|start):./.test(rule)) { kind = 'category'; rule = ''; console.log('compound without a rule, now category:', id); }
    if (kind === 'category') delete t.tkind; else t.tkind = kind;
    if (rule) t.rule = rule; else delete t.rule;
    stat.set++; seen[kind] = (seen[kind] || 0) + 1;
  }
}
stat.missing = P.themes.filter(t => !t.group && t.enabled !== false && !(t.id in {}) && false).length;
console.log(stat, seen);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 10).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

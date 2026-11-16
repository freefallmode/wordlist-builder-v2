// Library batch v387 (2026-11-16): rule 8 applied to 19124 "doner kebab" (Simon approved; Cambridge prints the headword "döner kebab"; döner is already the root since v386).
//   RECASE: 19124 text -> "döner kebab" (links, show, name allowance stay on it). ALIAS: "doner kebab" added as a new spelling alias of 19124, as maître d' / maitre d' (v385) so the plain spelling stays findable.
//   Rule 8 note: Simon ruled the Dictionary of South African English counts as a major regional dictionary (DESIGN-entries.md; droëwors keeps its diacritic root).
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch387.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const msgs = []; const count = () => { const c = {}; msgs.push(new Set()); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; msgs.at(-1).add(i.msg); } return c; };
const before = count();
const log = []; let n = 0;
const e = P.ix.entry.get(19124); if (!e) throw Error('no entry 19124');
if (e.text === 'doner kebab') {
  if (e.aliasOf || P.entries.some(x => x.aliasOf === 19124 || x.text === 'döner kebab' || x.text === 'doner kebab' && x !== e)) throw Error('19124 has aliases or döner kebab exists: check by hand');
  e.text = 'döner kebab'; n++;
  const a = addEntry(P, 'doner kebab', { pos: e.pos, fam: e.fam, status: e.status, region: [], gloss: '', type: e.type, typ: {}, show: {}, use: {}, nameOkIn: [...(e.nameOkIn || [])], aliasOf: 19124, aliasKind: 'spelling' });
  reindex(P); n++;
  log.push(`19124 text "doner kebab" -> "döner kebab" (type=${e.type} pos=${e.pos} fam=${e.fam} links=${JSON.stringify(e.typ)} show=${JSON.stringify(e.show)} nameOkIn=${e.nameOkIn}); new entry ${a.id} "doner kebab" spelling alias of 19124 (type ${a.type}, fam ${a.fam}), appended`);
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const nw = [...msgs[1]].filter(x => !msgs[0].has(x)); if (nw.length) console.log('new issues:\n  ' + nw.join('\n  ')); }
const body = log.join('\n') || '  none';
console.log(body); console.log(`\n${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = `Evidence: Cambridge English Dictionary prints the headword "döner kebab" (read 2026-11-16, v386 change log); Oxford Learner's and Collins print it plain. Rule 8 (amended v386): one major dictionary with the diacritic is enough.
Convention followed: 19124 had no aliases and no "döner kebab" entry existed. Accent roots with a plain form (maître d' 20027 / maitre d' 20028, döner 26966 / doner 29440) keep the plain form as a spelling alias, so "doner kebab" was added as a new spelling alias (appended; export index +1 at the end, no shifts).
Shown text: "doner" in "kebab types" is kept as it was (it shows the short word without "kebab"; the theme name already holds it). Not touched.
Rule 8 ruling recorded in DESIGN-entries.md: Simon, 2026-11-16: the Dictionary of South African English counts as a major regional dictionary (droëwors keeps its diacritic root).
For Simon (not changed, no wider audit): other un-accented entries that rule 8 might change were not searched for.`;
  fs.writeFileSync(new URL('batch387-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch387.mjs, ${P.lib.modified}): ${n} changes (doner kebab -> döner kebab with a plain spelling alias).\nChecks: changed kinds ${diff.join(', ') || 'none'}\n\n${body}\n\n${NOTE}\n`);
  console.log('library v' + P.lib.version);
}

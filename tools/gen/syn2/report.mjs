// Turns tools/gen/syn2/decisions.txt into a readable table (needs the pre-migration library in tools/gen/.tmp/pre-syn.json: git show e9e55f6:data/wordlist-en.project.json).
// Run: node tools/gen/syn2/report.mjs <out.md>
import fs from 'node:fs';
const O = JSON.parse(fs.readFileSync(new URL('../.tmp/pre-syn.json', import.meta.url), 'utf8')), ob = new Map(O.entries.map(e => [e.id, e]));
const L = fs.readFileSync(new URL('./decisions.txt', import.meta.url), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#')).map(l => l.split('|').map(x => x.trim()));
const syn = O.entries.filter(e => e.aliasKind === 'synonym');
console.log('lines', L.length, 'synonyms', syn.length, 'missing', syn.filter(e => !L.some(l => +l[0] === e.id)).map(e => e.id));
const by = {}; for (const l of L) (by[l[1]] = by[l[1]] || []).push(l);
const row = l => {
  const a = ob.get(+l[0]), r = ob.get(a.aliasOf);
  const res = l[2] === 'S' ? `"${a.text}" is the root, "${r.text}" the alias` : l[2] === 'K' ? `"${a.text}" is an alias of "${r.text}"` : `"${a.text}" and "${r.text}" separate`;
  return `| ${a.text} | ${r.text} | ${res}${l[3] ? ' (' + l[3] + ')' : ''} | ${l[4]} |`;
};
const sec = (k, t, d) => `## ${t} (${(by[k] || []).length})\n${d}\n\n| Alias (was) | Root (was) | Result | Why |\n|---|---|---|---|\n${(by[k] || []).map(row).join('\n')}\n\n`;
fs.writeFileSync(process.argv[2], '# Re-check of the 133 retired synonym aliases\n\nProposal only; nothing is changed yet. The decisions are in tools/gen/syn2/decisions.txt of the library repo.\n\n' +
  sec('SYN', 'Strict synonym aliases', 'Same answer in every theme. Stored as an alias of kind synonym (export bit 512). The game picks which of the two to show by difficulty.') +
  sec('TRANS', 'Translation aliases', 'The foreign or native name becomes the alias; the English name is the root.') +
  sec('REG', 'Regional aliases', 'The regional word is the alias with its region tag; the neutral or US word is the root.') +
  sec('ABBR', 'Abbreviation aliases', 'Already so since v251.') +
  sec('SHOWN', 'Shown text', 'Already so since v251.') +
  sec('ENTRY', 'Near matches', 'Stay entries of their own with a synonym group, as since v251.') +
  `## Dropped (${(by.DROP || []).length})\ne-bike: an entry exists already.\n`);

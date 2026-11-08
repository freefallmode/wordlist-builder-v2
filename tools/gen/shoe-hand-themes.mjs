// One-off: adds the themes "shoe parts" (after shoes) and "hand parts" (after hands and feet). Words come from tools/gen/shoe-hand-parts.mjs via apply-words.
// Run: node tools/gen/shoe-hand-themes.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, placeTheme } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);
const THEMES = [
  { id: 'shoe_parts', name: 'shoe parts', after: 'shoes', parent: 'accessories', note: 'the parts of a shoe: sole, heel, upper, tongue, laces, eyelets, insole' },
  { id: 'hand_parts', name: 'hand parts', after: 'hands_and_feet', parent: 'body_parts', note: 'the parts of a hand: palm, fingers, thumb, knuckles, fingernails, wrist' },
  { id: 'foot_parts', name: 'foot parts', after: 'hand_parts', parent: 'body_parts', note: 'the parts of a foot: toes, heel, sole, arch, ankle, instep' },   // added in a second run, once the first two existed
];
for (const t of THEMES) {
  if (P.ix.theme.has(t.id)) continue;
  P.themes.push({ id: t.id, name: t.name, parent: t.parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: t.note });
  reindex(P); placeTheme(P, t.id, t.after, 'after'); reindex(P);
}
stampSave(P); writeFileSync(LIB, serializeProject(P));
console.log('themes added; library v' + P.lib.version);
// data/themes.txt (the starter outline) gets the same lines, once each
const TXT = new URL('../../data/themes.txt', import.meta.url);
let s = readFileSync(TXT, 'utf8');
const add = (after, line) => {
  if (s.includes('\n    ' + line.split(' --')[0])) return;
  s = s.replace(new RegExp('^(    ' + after + '[^\n]*\n)', 'm'), '$1    ' + line + '\n');
};
add('shoes', 'shoe parts -- the parts of a shoe: sole, heel, upper, tongue, laces, eyelets, insole');
add('hands and feet', 'hand parts -- the parts of a hand: palm, fingers, thumb, knuckles, fingernails, wrist');
add('hand parts', 'foot parts -- the parts of a foot: toes, heel, sole, arch, ankle, instep');
writeFileSync(TXT, s);

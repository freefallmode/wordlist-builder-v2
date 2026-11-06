// Builds four wordplay themes under letter play: homophones of animals, homophones of body parts, numbers with the first letter changed, animals plus a letter
// (drafts in tools/gen/wordplay-samples.md). Each shown word is a plain common word; the word it hides is listed in the theme note (the model has no field for it).
// Run: node tools/gen/wordplay-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, sortDepthFirst, uniqueThemeId } from '../../js/model.js';
import { validate, nameLeak, themeNameWords } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url), LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// [shown, pos, familiarity, typicality (how readily it comes to mind for the theme), hidden word]
const THEMES = [
  { name: 'homophones of animals', rule: 'homophone:animals', ident: 4, rows: [
    ['dear', 'noun', 1, 1, 'deer'], ['bare', 'adjective', 2, 1, 'bear'], ['hair', 'noun', 1, 2, 'hare'], ['flee', 'verb', 2, 2, 'flea'], ['mousse', 'noun', 2, 3, 'moose'],
    ['turn', 'verb', 1, 3, 'tern'], ['dough', 'noun', 2, 3, 'doe'], ['bore', 'verb', 2, 3, 'boar'], ['foul', 'adjective', 2, 3, 'fowl'], ['hoarse', 'adjective', 3, 3, 'horse'],
    ['muscle', 'noun', 2, 3, 'mussel'], ['towed', 'verb', 3, 4, 'toad'], ['links', 'noun', 3, 4, 'lynx'], ['new', 'adjective', 1, 4, 'gnu'], ['guerrilla', 'noun', 3, 5, 'gorilla']] },
  { name: 'homophones of body parts', rule: 'homophone:body', ident: 4, rows: [
    ['knows', 'verb', 2, 1, 'nose'], ['heal', 'verb', 2, 2, 'heel'], ['waste', 'noun', 1, 2, 'waist'], ['soul', 'noun', 1, 2, 'sole'], ['tow', 'verb', 2, 3, 'toe'],
    ['vain', 'adjective', 2, 3, 'vein'], ['aye', 'other', 3, 4, 'eye']] },
  { name: 'numbers with the first letter changed', rule: 'letter:numbers:first', ident: 4, rows: [
    ['hen', 'noun', 1, 2, 'ten'], ['pen', 'noun', 1, 2, 'ten'], ['fix', 'verb', 1, 2, 'six'], ['mix', 'verb', 1, 2, 'six'], ['pour', 'verb', 1, 2, 'four'], ['tour', 'noun', 2, 3, 'four'],
    ['dive', 'verb', 1, 2, 'five'], ['hive', 'noun', 2, 3, 'five'], ['mine', 'other', 1, 2, 'nine'], ['wine', 'noun', 1, 2, 'nine'], ['hero', 'noun', 1, 3, 'zero']] },
  { name: 'animals plus a letter', rule: 'letter:animals:plus', ident: 4, rows: [
    ['then', 'other', 1, 2, 'hen'], ['brat', 'noun', 2, 2, 'rat'], ['bowl', 'noun', 1, 2, 'owl'], ['chat', 'verb', 1, 2, 'cat'], ['beard', 'noun', 1, 3, 'bear'], ['aunt', 'noun', 1, 3, 'ant'],
    ['board', 'noun', 1, 3, 'boar'], ['mouth', 'noun', 1, 3, 'moth'], ['heel', 'noun', 1, 3, 'eel'], ['cape', 'noun', 1, 3, 'ape'], ['gloat', 'verb', 3, 4, 'goat'], ['model', 'noun', 1, 4, 'mole'],
    ['drove', 'verb', 2, 4, 'dove'], ['beet', 'noun', 2, 4, 'bee'], ['stick', 'noun', 1, 4, 'tick']] },
];
const entryFor = (text, pos, fam) => P.entries.find(x => !x.aliasOf && x.enabled && x.text === text && x.type !== 'proper') || addEntry(P, text, { pos, type: 'common', fam, status: 'gen' });
let made = 0;
for (const T of THEMES) {
  if (P.ix.theme.get(uniqueThemeId(P, T.name.replace(/[^a-z0-9]+/g, '_'))) && P.themes.some(t => t.name === T.name)) { console.log('exists, skipped: ' + T.name); continue; }
  const note = 'Shown word (hidden word): ' + T.rows.slice(0, 6).map(r => `${r[0]} (${r[4]})`).join(', ');
  const t = { id: uniqueThemeId(P, T.name.replace(/[^a-z0-9]+/g, '_')), name: T.name, parent: 'letter_play', group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false,
    lang: true, region: [], note, pop: 3, ident: T.ident, tkind: 'wordplay', rule: T.rule };
  P.themes.push(t); reindex(P);
  for (const [text, pos, fam, link] of T.rows) {
    const before = P.entries.length, e = entryFor(text, pos, fam); if (P.entries.length > before) made++;
    e.typ[t.id] = link; if (nameLeak(t, e, themeNameWords(t))) e.nameOkIn = [...new Set([...(e.nameOkIn || []), t.id])];
  }
  reindex(P); console.log(`${t.name}: ${T.rows.length} words`);
}
sortDepthFirst(P); reindex(P);
console.log('new entries:', made);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 12).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }

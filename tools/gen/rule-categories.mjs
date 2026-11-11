// Wordplay rules that name a category ("starts with a color", "hidden insects") now name the category theme by id:
// starts:color -> starts:@colors. The game reads the target from the id instead of guessing it from the theme name.
// Literal rules (starts:dog, ends:ia) are left as they are. Run once: node tools/gen/rule-categories.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const MAP = { bird: 'birds', insect: 'insects_and_bugs', 'body part': 'body_parts', color: 'colors', number: 'numbers', fruit: 'fruits', name: 'names', vehicle: 'modes_of_transport', tree: 'trees', pet: 'pets', 'piece of clothing': 'clothes', drink: 'drinks', 'family member': 'family_members', 'musical instrument': 'instruments', shape: '2d_shapes', 'weather word': 'weather', 'public transport': 'public_transportation', metal: 'metals', animal: 'animals' };
let n = 0;
for (const t of P.themes) {
  const m = /^(starts|ends|hidden):(.+)$/.exec(t.rule || ''); if (!m || m[2][0] === '@') continue;
  const id = MAP[m[2]]; if (!id) continue;
  if (!P.ix.theme.get(id)) { console.log('missing target theme', id, 'for', t.id); continue; }
  t.rule = `${m[1]}:@${id}`; n++;
}
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('rules updated', n, 'library v' + P.lib.version);

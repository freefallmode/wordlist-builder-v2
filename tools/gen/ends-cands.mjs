// Candidate lists for "ends with ..." wordplay themes (BRIEF-ends-with.md): per type word, the library's single-word entries that end with it.
// Run: node tools/gen/ends-cands.mjs   -> tools/gen/ends/cands-<theme>.txt  (edit THEMES to add a theme)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const THEMES = {   // key: [theme name after "ends with", type words]
  pets: ['a pet', 'dog cat rat pig hen cow pup fish bird mouse horse goat lamb duck'],
  transport: ['public transport', 'bus cab car tram train taxi bike plane boat ship ferry metro tube'],
  colors: ['a color', 'red tan pink blue gold gray green rose lime jade teal navy plum rust'],
  body: ['a body part', 'arm leg lip hip ear eye toe shin chin hand foot knee back rib skin nose head neck palm'],
  numbers: ['a number', 'one two six ten nine four five three seven eight'],
  clothing: ['a piece of clothing', 'hat cap tie bra sock vest belt coat boot shoe robe'],
  family: ['a family member', 'son mum dad aunt nan gran twin kid'],
  drinks: ['a drink', 'tea gin rum ale wine milk cola mead sake port'],
  instruments: ['a musical instrument', 'horn bell drum harp gong tuba oboe lute lyre fife'],
  weather: ['a weather word', 'wind mist hail fog sun snow rain frost dew storm cloud ice haze'],
  birds: ['a bird', 'crow wren gull dove swan emu owl jay kite lark tern hawk rook duck'],
  trees: ['a tree', 'fir ash oak elm pine palm fig gum bay yew plum'],
  shapes: ['a shape', 'ball heart disc line star arc ring dot oval cone cross wedge loop'],
};
const words = P.entries.filter(e => !e.aliasOf && e.enabled && !/[ \-'\d]/.test(e.text) && e.type !== 'proper' && !/^[A-Z]/.test(e.text));
fs.mkdirSync(here('./ends/'), { recursive: true });
for (const [key, [name, types]] of Object.entries(THEMES)) {
  const out = [`# ends with ${name}: library words that end with each type word (raw matches: many are related to the type and must be rejected)`];
  for (const t of types.split(' ')) { const m = words.filter(e => e.text.toLowerCase().endsWith(t) && e.text.length > t.length + 1).sort((a, b) => a.rec - b.rec || a.text.length - b.text.length).slice(0, 60);
    out.push(`\nTYPE ${t}${m.length ? '' : '  (no library words)'}`); for (const e of m) out.push(`  ${e.text} | ${e.pos} | rec ${e.rec}${e.gloss ? ' | ' + e.gloss : ''}`); }
  fs.writeFileSync(here(`./ends/cands-${key}.txt`), out.join('\n') + '\n');
}
console.log(Object.keys(THEMES).length + ' candidate files in tools/gen/ends/');

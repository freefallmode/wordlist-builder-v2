// Candidate lists for "starts with ..." wordplay themes (BRIEF-starts-with.md): per type word, the library's single-word entries that begin with it.
// Run: node tools/gen/starts-cands.mjs   -> tools/gen/starts/cands-<theme>.txt  (edit THEMES to add a theme)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const here = p => new URL(p, import.meta.url);
const P = parseProject(fs.readFileSync(here('../../data/wordlist-en.project.json'), 'utf8')); reindex(P);
const THEMES = {   // key: [theme name after "starts with", type words]
  clothing: ['a piece of clothing', 'hat cap sock tie vest boot belt shirt bra cape coat glove robe shoe skirt scarf sash gown apron jacket mitt veil bib sari kilt'],
  shapes: ['a shape', 'ball heart disc line star arc ring dot oval cone cross wedge loop point square prism curve'],
  family: ['a family member', 'son kid gran mum dad bro sis aunt nan pa ma papa twin'],
  drinks: ['a drink', 'tea gin rum ale port wine milk cola cocoa mead sake juice soda cider punch'],
  instruments: ['a musical instrument', 'horn bell drum harp organ flute lute gong tuba oboe lyre fife piano banjo cello viol sitar kazoo'],
  weather: ['a weather word', 'wind mist hail fog sun snow rain frost dew storm cloud gale ice haze smog sleet thunder'],
  birds: ['a bird', 'crow wren gull dove swan emu owl jay kite lark tern hawk rook duck kiwi finch stork crane heron swift quail raven eagle goose parrot coot rail ibis'],
  trees: ['a tree', 'fir ash oak elm pine palm fig gum bay yew beech plum cedar teak maple birch larch alder hazel'],
  metals: ['a metal', 'iron tin lead gold zinc steel silver copper brass bronze nickel cobalt'],
};
const words = P.entries.filter(e => !e.aliasOf && e.enabled && !/[ \-'\d]/.test(e.text) && e.type !== 'proper' && !/^[A-Z]/.test(e.text));
fs.mkdirSync(here('./starts/'), { recursive: true });
for (const [key, [name, types]] of Object.entries(THEMES)) {
  const out = [`# starts with ${name}: library words that begin with each type word (raw matches: many are related to the type and must be rejected)`];
  for (const t of types.split(' ')) { const m = words.filter(e => e.text.toLowerCase().startsWith(t) && e.text.length > t.length + 1).sort((a, b) => a.rec - b.rec || a.text.length - b.text.length).slice(0, 60);
    out.push(`\nTYPE ${t}${m.length ? '' : '  (no library words)'}`); for (const e of m) out.push(`  ${e.text} | ${e.pos} | rec ${e.rec}${e.gloss ? ' | ' + e.gloss : ''}`); }
  fs.writeFileSync(here(`./starts/cands-${key}.txt`), out.join('\n') + '\n');
}
console.log(Object.keys(THEMES).length + ' candidate files in tools/gen/starts/');

// Builds js/offensive-words.js, the word list behind the offensive checks (DESIGN-entries.md 3.8).
// node tools/gen/offensive-list-make.mjs <base.txt> <ofcom2016.tsv> <ofcom2026.tsv> <wiktionary-swear.txt>
// Sources: LDNOOBW (Simon's en_offensive.txt), Ofcom 2016 and 2026 (word, category, rating), Wiktionary "English swear words".
// The list holds words to flag wherever they appear as a whole word (plurals are added by js/offensive.js). Words whose harmless
// meaning comes to mind first (cow, spade, slope: Simon, 2026-11-22) and search-filter fragments are left out here, by name, below.
import fs from 'node:fs';
const [baseF, of16F, of26F, swearF] = process.argv.slice(2);
if (!swearF) { console.error('usage: offensive-list-make.mjs <base.txt> <ofcom2016.tsv> <ofcom2026.tsv> <wiktionary-swear.txt>'); process.exit(2); }
const lines = f => fs.readFileSync(f, 'utf8').split(/\r?\n/).map(s => s.split('\t')[0].trim().toLowerCase()).filter(Boolean);

// Left out of the sources: search fragments, titles and brands, and words whose harmless meaning comes first (the two-meaning test).
const DROP = new Set(`2g1c xx girl on taste my tongue in a big black hot chick tied up tight white huge fat jelly donut tainted love pleasure chest
octopussy playboy twinkie babeland domination escort lolita bareback skeet cornhole scat hardcore suck sucks babe gitch snowballing undressing
sultry women blonde action brunette action girls gone wild hot carl how to kill how to murder style doggy dog style girl on top
cow spade spades slope ginger ging-er pansy fairy tart god jesus christ vegetable special gash slag bonk shag monkey coconut cracker queen dwarf
tinker invalid bang nip downs balls snatch mental jock mick paddy taff prod bender bent nancy mincing div coloured ho cum spook lame`
  .split('\n').flatMap(l => l.trim().split(/\s{2,}|(?<=\S) (?=\S)/)));
// The line above splits on spaces, so multi-word drops are listed again here as phrases.
for (const p of ['girl on', 'taste my', 'tongue in a', 'big black', 'hot chick', 'tied up', 'tight white', 'huge fat', 'jelly donut', 'tainted love',
  'pleasure chest', 'sultry women', 'blonde action', 'brunette action', 'girls gone wild', 'hot carl', 'how to kill', 'how to murder', 'style doggy',
  'dog style', 'girl on top', 'jesus christ', 'blonde on blonde action']) DROP.add(p);
const PHRASE_ONLY_OK = new Set(['big', 'black', 'girl', 'on', 'taste', 'my', 'tongue', 'in', 'a', 'hot', 'chick', 'tied', 'up', 'tight', 'white', 'huge', 'fat',
  'jelly', 'donut', 'tainted', 'love', 'pleasure', 'chest', 'sultry', 'women', 'blonde', 'action', 'brunette', 'girls', 'gone', 'wild', 'carl', 'how', 'to',
  'kill', 'murder', 'style', 'doggy', 'dog', 'top', 'jesus', 'christ']);
for (const w of PHRASE_ONLY_OK) DROP.delete(w);   // single words from the phrase list are not drops of their own

// Added by Simon (2026-11-22) and by the decisions in DESIGN-entries.md 3.8, with derived words (the list matches whole words only).
const ADD = `witch witches witchcraft witchery wizard wizards wizardry cult cults cultist cultish
hell hellish hellhole hellfire devil devils satan satanic satanism satanist
idiot idiotic idiocy moron moronic ninny imbecile golly golliwog
condom nude nudity nudist nudism heroin suicide suicidal slave slavery enslaved slaver swastika
gay homosexual homosexuality bisexual bisexuality penis vagina anus rectum
ass tit booby boobies bitch knob jizz faggots negro sambo hun beaver hooker kaffir gypsy gypsies hillbilly
shitty shithole shitstorm bullshit horseshit dipshit shithead chickenshit apeshit batshit fuckwit clusterfuck
asshole arsehole jackass dumbass badass smartass wiseass kickass hardass cocksucker dickhead
porn porno pornography
dingus sheeny scumbag crapper cocaine marijuana methamphetamine meth ganja hashish skag warlock sorcery necromancy pothead gyppo`.split(/\s+/);   // the last line: batch 432 (Simon, 2026-11-22)
const ADD_PHRASES = ['choc ice', 'paddy wagon', 'son of a bitch', 'pissed off', 'sod off', 'deaf and dumb', 'mentally challenged', 'wheelchair bound',
  'window licker', 'half-caste', 'uncle tom', 'curry muncher', 'sheep shagger', 'bible basher', 'jungle bunny', 'bud bud', 'ching chong', 'white power'];

const all = new Set();
for (const w of [...lines(baseF), ...lines(of16F), ...lines(of26F), ...lines(swearF), ...ADD, ...ADD_PHRASES]) {
  const x = w.replace(/\s+/g, ' ').replace(/^damm$/, 'damn');
  if (!DROP.has(x)) all.add(x);
}
const words = [...all].sort();
const out = `// Offensive words: the list behind the offensive checks (js/offensive.js; DESIGN-entries.md 3.8, LIBRARY-RULES.md).
// Built by tools/gen/offensive-list-make.mjs from LDNOOBW, Ofcom 2016 and 2026 and Wiktionary "English swear words", less search fragments and
// words whose harmless meaning comes first (cow, spade, slope), plus Simon's additions. A word here is flagged wherever it is a whole word of an
// entry or theme name; its plural is matched too (other forms are listed words of their own). Edit this file to add a word (a list change is a rule change: tell Simon).
export const OFFENSIVE_WORDS = ${JSON.stringify(words, null, 0).replace(/","/g, '",\n  "').replace('["', '[\n  "').replace('"]', '",\n]')};
`;
fs.writeFileSync(new URL('../../js/offensive-words.js', import.meta.url), out);
console.log(words.length, 'words');

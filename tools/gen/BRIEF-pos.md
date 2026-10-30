# Brief: make each theme grammatically consistent

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme by meaning. When a theme mixes grammatical forms (rain, cloudy, fog, windy; or "stay" and "walkies" among dog commands) the grammar gives clues and the theme looks sloppy. Your chunk lists themes where a second part of speech is 15% or more of the single-word entries. Make each theme read as one kind of thing.

## What a theme should be
Each theme has ONE natural grammatical form, the one its name implies: "weather" -> nouns (rain, fog); "hot weather words" -> adjectives and nouns that read as one family; "gardening verbs" -> verbs; "ways of laughing" -> verbs. Judge by what a player expects, not by the count alone. The "most common" form shown in the listing is only a hint: it can itself be wrong.

## Check, in this order, for each listed entry
1. **Is the part-of-speech tag simply wrong?** Many entries default to "noun" although they are verbs or adjectives in this theme ("down (dog command)", "prune (trim)", "scorching", "sweltering"). Retag with `P <id> <pos>` (noun, verb, adjective, adverb, other). Judge the word AS USED IN THIS THEME (the label/gloss tells you the sense). You may also retag entries that were NOT listed when they are wrong (see all entries: `node tools/gen/pos-make.mjs theme <themeId>`), for example when the "most common" form is wrong because many entries are mistagged. Retagging never changes anything but the tag.
2. **Is the same word already in the theme in the right form?** (rainy and rain, cloudy and cloud). Make the off-form word a `form` alias of it: `F <id> = <rootId>` (root = the theme's form, fewest words, simplest). The listing shows "SAME WORD IN THEME". The off-form entry is taken out of this theme and, if it is in no other theme, becomes the alias (so players typing it still match).
3. **Is there a real, well-known word of the theme's form meaning the same thing?** Replace: `S <id> = <existingId>` or `S <id> | <new text> | <meaning label or -> | <rec 1-5> | <pos>` (rec = how well known the new word is: 1 every child ... 5 few people; a label is needed only when other entries with that text exist; never use the theme name in a label). Use this only for a genuine equivalent; never invent words.
4. **Otherwise keep it:** `K <id>`. When in doubt KEEP. A theme may legitimately contain two forms when both read naturally together (a noun that is also the usual verb: "ways of breathing": sniff, puff, rasp).

Rules: never drop an entry without a replacement; never merge different meanings; never change an entry's text except through S; a COMPLETE theme (flag "complete") may not lose members, so F and S into an entry already in the theme are refused there (use P or K). Skip nothing: write one line for EVERY entry the listing shows under a theme.

## Listing
`node tools/gen/pos-make.mjs <n>` (n is given in your task). Per theme: path, flags, note, part-of-speech counts, the most common form with sample words, then each off-form entry: `<id> <text> (<label>) | pos type | rec r pop p | also in N themes: a, b, c | SAME WORD IN THEME: <id text pos> | related entries elsewhere: <id text pos>`.

## Output
ONE file `tools/gen/pos/p-<n>.txt`. For every theme in the chunk, in order:
```
T <themeId>
P <id> <pos>
F <id> = <rootId>
S <id> = <existingId>
S <id> | <text> | <meaning label or -> | <rec 1-5> | <pos>
K <id>
```
Nothing else in the file: no comments.

## Test it
Work on a scratch copy; never run the apply script on the real library:
```
cp data/wordlist-en.project.json tools/gen/pos/.scratch-<n>.json
node tools/gen/pos-apply.mjs tools/gen/pos/p-<n>.txt --lib tools/gen/pos/.scratch-<n>.json
```
It must report no PROBLEM lines and 0 still open. Fix and re-run until it does. Delete the scratch file and its `.pos-done.json` (only yours). Do NOT edit the real library, anything under js/, or other agents' files, and do NOT commit.

## Report (under 100 words)
File path, themes, counts of P / F / S / K, and any theme where you suspect the main part-of-speech tags are wrong in bulk or where you were unsure.

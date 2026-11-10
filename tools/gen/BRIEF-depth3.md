# Brief: word batch for depth-3 themes

You write one batch module of generated words for a chunk of ~30 themes. The app is a theme-sorting word game: a level shows sets of 4 words from 8–12 themes and the player sorts each word into its theme, so every theme needs words a player can tell belong to it, across a wide range of difficulty.

## Read first
- `DESIGN.md` sections 3, 5 (rating scales and flag meanings) and 12 (how data is produced).
- The header comment of `tools/apply-words.mjs` (the batch format) and `tools/gen/animals.mjs` / `tools/gen/food-drink.mjs` as worked examples of finished batches.
- Your theme list: `node tools/gen/list-depth.mjs <root> <n>` (prints each theme's id, path, notes, flags and sub-themes).

## What to produce: `tools/gen/d3-<root>-<n>.mjs`
Exports `DATA`, `THEMES` and, where useful, `ALIASES`, as in the examples. Cover EVERY theme in your list.

Per theme:
- **15 to 40 distinct words** (a narrow theme may have fewer, never under 8 unless the theme is genuinely a tiny closed set). Words must be unmistakably members of THAT theme, not just related to it; a player should be able to place each one.
- **Spread of difficulty inside every theme**: roughly a third rated 1–2, a third 3, a third 4–5 (in-theme rating `inRec`, the 3rd number of a row, is how readily a player places the word in this theme; `rec`, the 2nd number, is how well known the word itself is). Include some aliases (synonyms / spelling variants / short forms) with ratings different from their root.
- **Theme difficulty `d` in THEMES** (1–5, how hard the theme is to recognise and fill: 1 = everyone knows the topic, 5 = specialist). Spread these deliberately across your chunk: the library badly needs both very easy themes (d 1) and hard specialist ones (d 4–5), so do not rate everything 2–3. Hard words belong in easy themes too, and easy themes keep easy words.
- **Foreign-language themes:** a theme whose words are mostly NOT English (numbers, days, months, colors or greetings in another language, Swahili or Maori words) gets `foreign: true` in THEMES. English words of foreign origin (french phrases in english, words from french, cuisines, places) do not. The validator warns (`foreign-flag`) when a theme named like "… in german" or "swahili words" lacks it.
- **Theme identifiability `ident` in THEMES** (1–5, for every theme you create or fill): how easily a player works out the theme from four of its members, assuming easy words. 1 = obvious (colors, farm animals), 2 = clear and specific, 3 = needs a moment (loose property, compound), 4 = broad or a trick (things made of metal, hidden words, starts-with), 5 = obscure. It is separate from `pop` (how popular and appealing the theme is). The full scale is in BRIEF-ident.md.
- Set every flag honestly on themes (`complete`, `adult`, `sensitive`, `tm`, `lang`, `region`, `note`) and on words (`adult`, `sens`, `tm`, `vulgar`, `reg`, `pos`, `type`). Flag meanings are in DESIGN.md section 5. Theme flags inherit downward, so do not repeat a flag a word already gets from its theme unless it is the word's own.
- `complete: true` only for closed sets you list exactly (e.g. planets, days). Then the theme must contain exactly the members.

## Entry rules (these were broken in an earlier batch, do not repeat)
- **`type` must say what the entry really is**: common, person, place, org, title, proper, acronym. `phrase` is ONLY for ordinary multi-word expressions or idioms. NEVER type a name as `phrase` and never change a type to get under the word limit. A name that does not fit the limit is shortened or left out.
- **At most 4 words and 20 letters** per entry. Prefer 1–2 words; 3–4 only for real names and set expressions.
- Proper nouns capitalised; common words lower case; acronyms in capitals.
- **Never drop a good word because its text is already used for another meaning** (mandarin the language vs the fruit, navel, steel, saddle, duck ...). Look the word up first: `node tools/gen/find-word.mjs mandarin navel` prints each existing entry with its meaning label, type and themes. Then:
  - same meaning as an existing entry: use the same text and the same gloss (empty if it has none), so it is only linked;
  - different meaning and the existing entry has no gloss: give the EXISTING entry a gloss with `FIXES` (`{ gloss: [text, aThemeItIsLinkedTo, 'fruit'] }`) and add yours with its own gloss (`['mandarin', 2, 2, { g: 'language', type: 'common' }]`);
  - the existing entry is linked to a theme for the wrong meaning (a conflation, e.g. the fruit "mandarin" sitting in the languages theme): `FIXES` `{ split: [text, thatThemeId, 'language'] }` moves that link onto a new entry, and `{ gloss: ... }` labels the original.
  Glosses are short (1-2 words: fruit, language, body part). Only rename a word (e.g. "clothes iron") when that is how people actually say it. See the `FIXES` description in the header of `tools/apply-words.mjs`.
- Many words will already exist in the library (the level-2 themes are filled). Reusing them is good: a word may sit in several themes. Do not re-describe them, just include the row with the same text/gloss.
- Other agents are writing other chunks at the same time and cannot see your file, so give a `g` to anything ambiguous.
- British/American variants: the root is the US spelling, the British one is a `spelling` alias tagged UK: `['color',1,1,{ al: [['colour','spelling',2,2,['UK']]] }]`. If both spellings are standard in the US (doughnut / donut, whisky / whiskey), keep the usual one as root and leave the other untagged. Region-bound words get `reg`.

## Test it (do not skip)
Work on a scratch copy, never on the real library:
```
cp data/wordlist-en.project.json tools/gen/.scratch-<root>-<n>.json
node tools/apply-words.mjs tools/gen/d3-<root>-<n>.mjs tools/gen/.scratch-<root>-<n>.json
```
Fix every `error` it prints (needs-gloss, bad ratings, too many words) and every warning about your entries (long, rating-vs-zipf, type). Delete the scratch file when done. Do NOT edit `data/wordlist-en.project.json`, anything under `js/`, or other agents' files, and do NOT commit.

## Report (under 150 words)
The file path; number of words, aliases and themes; the `d` spread you chose; any word you had to skip because of a clash; flag judgement calls worth the user's review.

## Keep entries short, no near-duplicates (added after review)
Use the shortest form people actually use: "smell", not "sense of smell"; "touch", not "sense of touch"; "dentist", not "dentist's office" unless the long form is a different thing. Inside one theme never add an entry whose text merely contains another entry of that theme as a whole word ("sense of smell" next to "smell", "red wine" next to "wine" is fine only when it is a different thing). If the long form is a common alternative name, make it an alias of the short root instead. Check the theme's existing words (list-depth shows them) before adding.
Overlap (checked on a sample in 2026-11-05: about 7% of kept pairs were wrong). A longer entry that merely contains a member's word is not a member because of that: check it against the theme on its own. A part, product, food, person, place or event built on a member is a different thing (not "oil well" in fossil fuels, "chicken wings" or "duck breast" in poultry, "candle maker" in candle words, "elephant seal" in animals with tusks, "engagement party" in life events). When a player would take two entries as the same answer (pruning shears and shears, user interface and interface, stand mixer and mixer, spinning top and top), list only the shorter. A species or breed beside its generic word is fine in a theme of kinds. See the Overlap rule in js/ai.js and DESIGN-entries.md.

## Same thing, different form (added with the synonym pass)
Do not list two words for the same answer in one theme as if they were separate members: the verb, noun and symbol forms of one concept (`subtract`, `subtraction`, `minus`, `take away`; `add`, `addition`, `plus`), a plain and a technical name (`salt` / `sodium chloride`), or ordinary synonyms (`couch` / `sofa`, `average` / `mean`). Prefer one form per concept. If more than one is worth having (they differ in difficulty or players would use either), add every form and then put them in a synonym group for that theme so a level never shows two of them. A generation module cannot make groups, so list them in a comment above the rows, one line per group: `// GROUP <theme id>: subtract / minus / subtraction`, and the group is made afterwards (tools/gen/syn3-make.mjs, BRIEF-syn3.md, syn3-apply.mjs). Related but different things are not a group: a sum is the result of addition, a product the result of multiplication; a word and its opposite, kind or part are never grouped.

## Long words get line-break points afterwards (added with the balloon text pass)
The game wraps words of 8 or more letters over two lines and needs a hyphenation point for each (play-ground, not playg-round). You do not write these: after the module is applied, `apply-words.mjs` counts the long words with no break and prints the follow-up (`node tools/brk-tokens.mjs`, agents under `tools/gen/brk/BRIEF-brk.md`, `node tools/brk-merge.mjs todo`; data in `data/breaks-en.txt`, then re-export). It covers words inside phrases and theme names too. Nothing to add to the module; just spell long words and names normally, with an apostrophe or accent where they belong, because the break data is keyed by the exact lowercase spelling.

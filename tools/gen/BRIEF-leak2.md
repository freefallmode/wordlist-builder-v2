# Brief: words that still give their theme away (second pass)

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme; a theme's name is shown only when the theme is complete. A word that contains a word from its theme's name gives the theme away ("tomato soup" in "soups"). An earlier pass already replaced the easy ones. Your chunk lists the entries that are LEFT. Decide for each one:

- **S (replace by the bare/alternative name)** when what remains is a real, recognisable name of the same thing in this theme and a player seeing just that word would still place it here: `canary melon` -> `canary`, `musk melon` -> `musk`, `Lake Erie` -> `Erie`, `emperor penguin` -> `emperor`, `fish course` -> `fish`, `coffee course` -> `coffee`. Also fine: a different well-known name of the same thing (pitaya for dragon fruit).
- **K (keep as is)** when the full text IS the thing's real, recognisable name and the bare word would be wrong, meaningless or a different thing: `dried apple` (bare "apple" is just a fruit, not dried), `dragon fruit` ("dragon" is a creature), `green melon`, `snap melon`, `passion fruit`, `bailan melon` (nobody says "bailan"), `sun-dried raisin`, `Pacific Ocean` when the bare name would be ambiguous. When in doubt between a poor bare form and the full name, choose K.
- Entries listed as **ALIAS**: always K (do not touch aliases).
- Never use D. Never invent names; never write a new text that still contains a word of the theme name.
- If the theme is real wordplay where sharing the word is the whole point (words that start with / end with / contain, hidden words, rhymes, "___ fire" compounds), write `T <id> OK` alone for it.

## Listing
`node tools/gen/leak-make.mjs <n>` (n is given in your task). Per theme: path, flags, note, the forbidden name words, a few good example words, then each entry: `<id> <text> (<label>) | pos type | rec r pop p | root or ALIAS | in N themes | shorter: "<mechanical bare form>" | existing "<text>": <ids with labels>`. The "shorter" form is mechanical and often bad. If an existing entry of that text with the right meaning is listed, replace by it with `=`; if the text already exists with other meanings, the new entry needs a short meaning label (never containing the theme name).

## Output
ONE file `tools/gen/leak/k-<n>.txt`. For every theme in the chunk, in order:
```
T <themeId>
S <id> = <existing entry id>
S <id> | <new text> | <meaning label or -> | <rec 1-5>
K <id>
```
or `T <themeId> OK` alone. One line for EVERY entry listed under the theme. `rec` = how well known the new text is as that thing (1 every child ... 5 few people). Nothing else in the file: no comments.

## Test it
Work on a scratch copy; never run the apply script on the real library:
```
cp data/wordlist-en.project.json tools/gen/leak/.scratch-<n>.json
node tools/gen/leak-apply.mjs tools/gen/leak/k-<n>.txt --keep-drops --lib tools/gen/leak/.scratch-<n>.json
```
It must report no PROBLEM lines. Fix and re-run until it does. Delete the scratch file and its .done.json when done. Do NOT edit the real library, anything under js/, or other agents' files, and do NOT commit.

## Report (under 80 words)
File path, themes, counts of S / K / OK, and any theme you were unsure about.

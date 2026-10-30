# Brief: words that give their theme away

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme; a theme's name is shown only when the theme is complete. A word that contains a word from its theme's name gives the theme away ("tomato soup" in the theme "soups", "Lake Erie" in "great lakes", "emperor penguin" in "penguins"), which spoils the sorting. The rule: **a word's text must not contain a word of its theme's name.** Your chunk lists every entry that breaks it. Decide for each one.

## Listing
`node tools/gen/leak-make.mjs <n>` (n is given in your task). Per theme: its path, flags, note, the words of the theme name that are forbidden ("name words"), a few of the other words (so you can see what a good word looks like), then each leaking entry:
`<id> <text> (<meaning label>) | pos type | rec r pop p | root or ALIAS | in N themes | shorter: "<mechanical shorter form>" | existing "<that text>": <ids with labels>`.
The "shorter" form is only a mechanical suggestion (the theme word cut out). It is often bad ("bitter" for bitter melon). Use your own judgement.

## What to do with each leaking entry
Choose exactly one:
1. **Replace by a real shorter or alternative name that stands on its own**, so a player seeing just that word would still recognise the thing and place it in the theme:
   - the distinguishing part is a real name of the thing: tomato (soup), minestrone, Erie (lake), emperor (penguin), Boston (marathon), Superior (lake), cheddar, kinetic (energy);
   - or another well-known name of the same thing without the theme word: pitaya for dragon fruit, karela for bitter melon.
2. **Replace by an entry that already exists** (`= id`) when the listing shows an existing entry of that text with the same meaning (goji, acai).
3. **Drop it** (`D`) when no good standalone form exists: the remainder is an ordinary word that means nothing alone ("bitter", "green", "winter", "snap", "passion", "dragon" for those fruits and melons), when the word IS the theme word itself (owl in owls, eagle in eagles), when a version without the theme word is already in the theme ("ALREADY IN THIS THEME"), or when it is an ALIAS line.
Prefer 1 or 2 where the short form is genuinely recognisable; do not force a poor shorter form. Losing some words from a theme is fine; do not worry if a theme gets thin (report it).

Never write a new text that still contains a word of the theme name. Do not invent things: only use names that are real and well-known (or at least real). Proper-name themes (lakes, canals, bridges, mosques, marathons, gulfs, towers) normally shorten to the distinguishing name ("Lake Titicaca" -> "Titicaca", "Gulf of Mexico" -> "Mexico", "Boston Marathon" -> "Boston", "Eiffel Tower" -> "Eiffel"); keep the capitals of a proper name. If the shortened text is also an ordinary word that means something else (Mexico is only a place, but Persian, Superior, Bay are ambiguous), prefer D or a clearer alternative.

If the theme is real **wordplay** where sharing the word is the whole point (words that start with, end with, contain, rhyme with, hidden words, "___ fire" compounds), mark the theme `T <id> OK` and write no other lines for it. Do this only for such themes.

## Output
ONE plain text file `tools/gen/leak/r-<n>.txt` (n = your chunk number). For every theme in the chunk, in order:
```
T <themeId>
S <id> | <new text> | <meaning label or -> | <rec 1-5>
S <id> = <existing entry id>
D <id>
```
or `T <themeId> OK` alone. One line for EVERY leaking entry id listed under the theme (roots and ALIAS lines). `rec` is how well known the new text is as that thing (1 every child ... 5 few people); the new entry inherits part of speech, type, flags and its popularity in the theme from the old one. A meaning label is needed only when another entry with that text exists (then it must differ from all of them) and is otherwise `-`; keep labels short and never use the theme name in them. Nothing else in the file: no comments.

## Test it
Work on a scratch copy; never run the apply script on the real library:
```
cp data/wordlist-en.project.json tools/gen/leak/.scratch-<n>.json
node tools/gen/leak-apply.mjs tools/gen/leak/r-<n>.txt --lib tools/gen/leak/.scratch-<n>.json
```
It must report no PROBLEM lines and 0 still open. Fix and re-run until it does. Delete the scratch file and its .done.json when done. Do NOT edit the real library, anything under js/, or other agents' files, and do NOT commit.

## Report (under 120 words)
The file path, number of themes, counts of S / D / OK, and the themes you were unsure about or that ended up with fewer than 4 words.

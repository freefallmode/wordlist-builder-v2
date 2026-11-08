# Brief: words that mean the same in a theme

A word-sorting game shows four words from a theme and the player sorts each into its theme. If a level holds two words that are the same answer, the player is confused. Words that stand for one another IN A THEME are put in a synonym group, and the game never shows two members of a group together. Earlier passes grouped near-synonyms and brand/generic pairs. This pass finds what is left: other names for one thing, and especially different forms of one concept that were entered separately: `subtract` / `subtraction` / `minus` / `take away` in math operations; `add` / `addition` / `plus`; `multiply` / `multiplication` / `times`.

Listing, per theme: `T <theme id> | <name> | <note>`, then `W:` the words, `<id> <text> [meaning label] (part of speech if not a noun)`, separated by `;`. A `G:` line, when present, lists the groups already made (ids, space separated, groups separated by `;`). Do not repeat those, but you may extend one: write the whole group including its old members.

## What to group
Group words when, in THIS theme, a player would give the same answer for either: they name the same thing, action, quantity or idea.
- Verb, noun and symbol forms of one operation or concept: `subtract`, `subtraction`, `minus`, `take away`.
- Ordinary synonyms: `couch` / `sofa`, `dessert` / `pudding`, `big` / `large`.
- The same thing under a technical and a plain name: `sodium chloride` / `salt`.
- Abbreviation or nickname entered as its own entry next to the full name: `Big Apple` / `New York City` in a theme of cities.

## What NOT to group
- Related but different: `sum` and `addition` are close but a sum is a result; `product` is a result, `multiplication` the act. Keep them apart unless the theme treats them as one answer. When unsure, leave out and say so in the note.
- A word and its kind, part, or opposite: `add` and `subtract`; `square` and `rectangle`.
- A theme whose point is words with a shared meaning (`words for happy`, `ways to walk`): write nothing for such a theme.
- Same text with different meaning labels (`bat` animal / `bat` sports): not a synonym pair.
- Be conservative. A group of 2 to 4 is normal; more than 5 needs a reason.
- One word in at most one group per theme. A group needs two or more words from that theme's `W:` list.

## Output
ONE file `tools/gen/syn3/s-<n>.txt` (n is in your task). One line per group: `<theme id> | <id> <id> [<id> ...] | <note under 10 words>`. Use only ids listed for that theme. Read the whole listing; do not stop early. If a chunk has none, write an empty file.

Do NOT edit the library, other files or js/, and do NOT commit.

## Report (under 40 words)
File path, number of groups, and the themes with the most.

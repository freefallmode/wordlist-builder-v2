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

## Capital rule (applies to every entry, link and shown text you create)

One rule decides the capital of every word: **a word is written the way it is correctly written for the sense it has in that theme.**

- An entry's text is **lowercase unless it is a proper noun** (person, place, organisation, title, brand, named period) or an acronym/initialism in capitals. Mark proper entries with `type` person/place/org/title/proper, acronyms `acronym`; common words need no type.
- **Never copy a capital** from a stub, a list heading or another entry. "garnet" the gem is lowercase even when a list prints "Garnet".
- Link the entry whose **sense fits the theme**. If a theme wants the common noun (gemstone, raven the bird, hemlock the poison) and only a proper entry exists, create the lowercase common-noun entry with its own short gloss; do not link the proper one.
- Do **not** use a `show` text just to change case where a correctly cased entry can be linked (a case-only show text changes UK alias behaviour and wordplay rules).
- Theme names carry their own capitals (proper nouns only).
- **A phrase that contains a proper word keeps the capital on that word and is typed `proper`**: `French fries`, `Brussels sprouts`, `Yorkshire terrier`, `eggs Benedict`, `Black Forest cake`. A short shown text keeps it too (`Vidalia`, `Italian`). Lowercase only where dictionaries agree the word is no longer felt as a name (`venetian blind`, `manila folder`, `graham cracker`). The lint flags a lowercase phrase that contains a listed proper word (`js/caselint-words.js`).
- **Styles and movements are lowercase** (art, architecture, design, literature, fashion): `cubism`, `baroque`, `gothic`, `byzantine`, `renaissance`, `art deco`, `colonial`, `modernist`, `international style`. A word in the name keeps a capital only when English has it only as a name or the adjective of a name: `Victorian`, `Georgian`, `Tudor`, `Palladian`, `Greek revival`, `Moorish`, `Romanesque`, `Bauhaus`, `Pre-Raphaelites`. The historical period of the same name is a name and a separate entry: `Renaissance`, `Baroque`, `Regency` in themes of periods.
- Checked automatically: `node tools/export-game.mjs` prints a `case lint` count (`--strict` fails on any); `node tools/gen/lint-show.mjs` lists each issue.

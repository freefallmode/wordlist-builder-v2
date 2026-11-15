## Capital rule (applies to every entry, link and shown text you create)

One rule decides the capital of every word: **a word is written the way it is correctly written for the sense it has in that theme.**

- An entry's text is **lowercase unless it is a proper noun** (person, place, organisation, title, brand, named period) or an acronym/initialism in capitals. Mark proper entries with `type` person/place/org/title/proper, acronyms `acronym`; common words need no type.
- **Never copy a capital** from a stub, a list heading or another entry. "garnet" the gem is lowercase even when a list prints "Garnet".
- Link the entry whose **sense fits the theme**. If a theme wants the common noun (gemstone, raven the bird, hemlock the poison) and only a proper entry exists, create the lowercase common-noun entry with its own short gloss; do not link the proper one.
- Do **not** use a `show` text just to change case where a correctly cased entry can be linked (a case-only show text changes UK alias behaviour and wordplay rules).
- Theme names carry their own capitals (proper nouns only).
- Checked automatically: `node tools/export-game.mjs` prints a `case lint` count (`--strict` fails on any); `node tools/gen/lint-show.mjs` lists each issue.

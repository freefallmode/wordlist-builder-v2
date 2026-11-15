# Brief addendum: the remaining (deeper) themes

Follow `tools/gen/BRIEF-depth3.md` in full, with these differences:
- Your theme list comes from `node tools/gen/list-depth.mjs <root> <n> rest` (the still-empty playable themes of that root: depth 4 and deeper, plus a few strays). Cover EVERY theme in it. Parent themes that are not groups may have sub-themes listed; give each listed theme its own words (a parent's words may overlap its children but should also include members that fit no child).
- Name the module `tools/gen/d45-<root>-<n>.mjs` and test it on a scratch copy as described.
- These themes are narrower, so 12 to 30 words per theme is right (never under 8 unless the theme is a tiny closed set); keep the difficulty spread within each theme and spread theme `d` across the chunk, using 4 and 5 for specialist themes.
- The library now has labels on every shared text (e.g. "mouth (river)", "bat (animal)"). ALWAYS run `node tools/gen/find-word.mjs word ...` for any word that might exist already or has several meanings and reuse the exact label of the matching meaning (so it is only linked); give new meanings their own label. Never skip a word for a clash.
- Apply the section "Same thing, different form" at the end of `tools/gen/BRIEF-depth3.md` (words for one concept in one theme: pick one form, or list the group in a comment).
- Long words (8+ letters) get line-break points afterwards: see the last section of `tools/gen/BRIEF-depth3.md`. Nothing to add to your module.

## Capital rule (applies to every entry, link and shown text you create)

One rule decides the capital of every word: **a word is written the way it is correctly written for the sense it has in that theme.**

- An entry's text is **lowercase unless it is a proper noun** (person, place, organisation, title, brand, named period) or an acronym/initialism in capitals. Mark proper entries with `type` person/place/org/title/proper, acronyms `acronym`; common words need no type.
- **Never copy a capital** from a stub, a list heading or another entry. "garnet" the gem is lowercase even when a list prints "Garnet".
- Link the entry whose **sense fits the theme**. If a theme wants the common noun (gemstone, raven the bird, hemlock the poison) and only a proper entry exists, create the lowercase common-noun entry with its own short gloss; do not link the proper one.
- Do **not** use a `show` text just to change case where a correctly cased entry can be linked (a case-only show text changes UK alias behaviour and wordplay rules).
- Theme names carry their own capitals (proper nouns only).
- **A phrase that contains a proper word keeps the capital on that word and is typed `proper`**: `French fries`, `Brussels sprouts`, `Yorkshire terrier`, `eggs Benedict`, `Black Forest cake`. A short shown text keeps it too (`Vidalia`, `Italian`). Lowercase only where dictionaries agree the word is no longer felt as a name (`venetian blind`, `manila folder`, `graham cracker`). The lint flags a lowercase phrase that contains a listed proper word (`js/caselint-words.js`).
- Checked automatically: `node tools/export-game.mjs` prints a `case lint` count (`--strict` fails on any); `node tools/gen/lint-show.mjs` lists each issue.

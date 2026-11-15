# Brief: what kind of theme is each one

A word-sorting game shows sets of words and the player sorts each word into its theme. The game must check some themes by a rule it can test on the word itself, not by meaning. Your listing is a chunk of themes: `<id> | <name> {note} | up to 8 member words`. Give each theme a kind, and for wordplay and compound themes a rule.

## Kinds (exactly one per theme)
- category: the members are kinds or instances of one thing (soups, tools, dog breeds, famous painters, verbs of cooking). The default.
- place: the members are places (countries, capitals, rivers, landmarks, cities of a country, islands).
- property: the members share an attribute, not a type (red things, loud things, things with wheels, round things, sticky things).
- wordplay: members are chosen by spelling or sound, not meaning: hidden words, rhymes, palindromes, anagrams, homophones, starts or ends with something, double letters, onomatopoeia, letter patterns.
- compound: every member combines with one shared word to make a known compound or phrase ("___ bag", "snow ___", words that follow "fire").

## Rule (wordplay and compound only; leave `-` for the others)
A short machine-readable string the game can test:
- `hidden:<what>` a <what> is hidden inside the word (`hidden:tree`, `hidden:animal`, `hidden:color`, `hidden:body part`)
- `rhyme:<ending>` the word ends with that sound (`rhyme:ake` for "rhymes with cake"; use the spelling ending that fits most members)
- `palindrome`, `anagram` (members are anagrams of each other or of the name), `homophone` (sounds like another word), `onomatopoeia`, `double-letters`
- `starts:<what>` or `ends:<what>` (`starts:color`, `starts:number`, `ends:ia`, `starts:letter-a`)
- `contains:<what>` any other fixed letters or word inside
- `follows:<word>` / `precedes:<word>` for compounds ("snow ___" is `precedes:snow`, the missing word comes after "snow"; "___ bag" is `follows:bag`, meaning the member comes before "bag")
- `other` for wordplay you cannot express in the list above
Use the member words in the listing to decide the exact word or ending. When a theme is half rule, half meaning, choose the main one.

## Output
ONE file `tools/gen/kind/k-<n>.txt` (n is given in your task). One line for EVERY theme in the listing, in order: `<id> | <kind> | <rule or ->`. Nothing else: no comments, no headings. Read the whole listing (about 500 lines).

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, count per kind, and any theme you were unsure about.

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

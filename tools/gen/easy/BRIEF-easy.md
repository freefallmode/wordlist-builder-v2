# Brief: easy everyday themes

The game shows four words from a theme and the player sorts each into its theme. The library needs more EASY themes (everyone knows the topic, the obvious members are known to a child). Your list is about ten new, still-empty themes about everyday things. Fill each one.

Follow `tools/gen/BRIEF-depth3.md` in full (entry rules, glosses, types, `FIXES`, testing on a scratch copy, the overlap and same-thing-different-form rules), with these differences.

## Your files
- Listing: `tools/gen/easy/list-<n>.txt` (n is in your task): `T <theme id> | <name> | under <parent> | <note with example members>`. The themes already exist in the library.
- Output: `tools/gen/easy/easy-<n>.mjs`, exporting `THEMES`, `DATA`, and where needed `ALIASES`, `FIXES` and `GROUPS`.
- Test on a scratch copy as in BRIEF-depth3: `cp data/wordlist-en.project.json tools/gen/.scratch-easy-<n>.json` then `node tools/apply-words.mjs tools/gen/easy/easy-<n>.mjs tools/gen/.scratch-easy-<n>.json`. Delete the scratch file after. Do not touch the real library, js/ or other files, and do not commit.

## What each theme needs
- **At least 12 words, usually 15 to 30.** Every word must be a clear member by the theme's defining property; a player should place it at once. The note lists examples, not the whole set.
- **Mostly easy words** (familiarity 1-2, in-theme rating 1-2: the first words anyone names), plus some medium ones (3) and a few harder ones (4). No obscure specialist words.
- **THEMES entry for every theme:** `pop` 1 or 2 (everyday, popular), `ident` as honestly as the scale in BRIEF-ident.md says (a loose property like "things that swim" is 2-3, not 1), `d` is not used here; flags as usual (`foreign: true` for a theme whose words are mostly not English, such as numbers or colors in another language; the validator warns `foreign-flag` if you forget). Do not set `complete`.
- **Theme-name leaks:** do not use words that contain a significant word of the theme's name or the note's defining word (no `pencil case` entry in "in a pencil case", no `school bag` in "in a school bag", no `hospital bed` in "people at a hospital"). Prefer the bare member (`ruler`, not `school ruler`).
- **Things that merely sit near the theme are not members.** A boat floats, it does not swim. A word needs the property, not an association.
- **Overlap with other themes is fine** (a word may sit in many themes): look up existing words with `node tools/gen/find-word.mjs word ...` and reuse the exact text and gloss so the word is only linked; give new meanings a gloss.

## Aliases and synonym groups (required where they apply)
- **Regional aliases** wherever the word differs between English-speaking regions: `['eraser', 1, 1, { al: [['rubber', 'regional', 2, 2, ['UK']]] }]`, flashlight / torch, cookie / biscuit, sweater / jumper, trash / rubbish, candy / sweets, pants / trousers, soccer / football. The root is the more general or US form unless the other is clearly the base; tag every region-bound word with `reg`.
- **Region-tied themes and words.** When the knowledge in a theme belongs to one country or culture (a country's foods, clothes, festivals, sports teams and leagues, cities, politicians, TV, slang), set the theme's `region` to the countries that know it (tag rules in tools/gen/BRIEF-regtag.md), and rate every word's familiarity (`rec`) and the theme's popularity and identifiability for a **general adult US or UK player**, not for a local: rasgulla is 4, not 2; a UK player knows few NHL teams. Global things (sushi, kebab, Mumbai, football, the Olympics) keep low ratings. Word-rating rules for such themes are in tools/gen/BRIEF-regrec.md.
- **Spelling aliases** for UK/US spellings: the root is the US spelling, the alias the British one tagged UK (`['gray', 1, 1, { al: [['grey', 'spelling', 2, 2, ['UK']]] }]`).
- **Strict synonym aliases** only when the other word is ALWAYS the same answer (`couch` / `sofa`, `TV` / `television` is an abbreviation alias).
- **Near synonyms that are both worth having** are separate entries and go in the theme's synonym group so a level never shows two of them: export `GROUPS`, `[themeId, 'text', 'text', ...]`, one line per group (`['ways_to_move', 'walk', 'stroll']`). Add `|gloss` to a member when its text has several meanings in the theme. Related but different things are not grouped (walk and run, a sum and addition).
- In a verb theme (things you do with your eyes) forms of one verb (look / looking) are not separate words.

## Report (under 120 words)
The file path; number of themes, words, aliases and groups; the `ident` ratings you chose; any word you skipped because of a clash; judgement calls worth the user's review.

## Kinds themes: full term, shown short
In a "kinds of X" theme (eagles, sharks, cakes, hats, seals) the member is the FULL term as an entry (`bald eagle`, `tiger shark`, `red velvet cake`). If the short word identifies the kind on its own, the link gets a `show` of that short word (`bald`, `tiger`, `red velvet`). Never add the bare short word as its own entry just for this theme (a stub `bald` or `tiger` linked only to eagles or sharks): its part of speech, rating and meaning would describe a different thing, and the game cannot show the full term. The exception is a short word that really is how people name the thing and the full term is not used (`husky`, `panama`, `harpy`): keep that as the entry. See DESIGN-entries.md 3.6 and `tools/gen/BRIEF-shortmem.md`.

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

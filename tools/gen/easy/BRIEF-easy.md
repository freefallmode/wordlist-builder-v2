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
- **THEMES entry for every theme:** `pop` 1 or 2 (everyday, popular), `ident` as honestly as the scale in BRIEF-ident.md says (a loose property like "things that swim" is 2-3, not 1), `d` is not used here; flags as usual. Do not set `complete`.
- **Theme-name leaks:** do not use words that contain a significant word of the theme's name or the note's defining word (no `pencil case` entry in "in a pencil case", no `school bag` in "in a school bag", no `hospital bed` in "people at a hospital"). Prefer the bare member (`ruler`, not `school ruler`).
- **Things that merely sit near the theme are not members.** A boat floats, it does not swim. A word needs the property, not an association.
- **Overlap with other themes is fine** (a word may sit in many themes): look up existing words with `node tools/gen/find-word.mjs word ...` and reuse the exact text and gloss so the word is only linked; give new meanings a gloss.

## Aliases and synonym groups (required where they apply)
- **Regional aliases** wherever the word differs between English-speaking regions: `['eraser', 1, 1, { al: [['rubber', 'regional', 2, 2, ['UK']]] }]`, flashlight / torch, cookie / biscuit, sweater / jumper, trash / rubbish, candy / sweets, pants / trousers, soccer / football. The root is the more general or US form unless the other is clearly the base; tag every region-bound word with `reg`.
- **Spelling aliases** for UK/US spellings (`['gray', 'spelling', ...]`).
- **Strict synonym aliases** only when the other word is ALWAYS the same answer (`couch` / `sofa`, `TV` / `television` is an abbreviation alias).
- **Near synonyms that are both worth having** are separate entries and go in the theme's synonym group so a level never shows two of them: export `GROUPS`, `[themeId, 'text', 'text', ...]`, one line per group (`['ways_to_move', 'walk', 'stroll']`). Add `|gloss` to a member when its text has several meanings in the theme. Related but different things are not grouped (walk and run, a sum and addition).
- In a verb theme (things you do with your eyes) forms of one verb (look / looking) are not separate words.

## Report (under 120 words)
The file path; number of themes, words, aliases and groups; the `ident` ratings you chose; any word you skipped because of a clash; judgement calls worth the user's review.

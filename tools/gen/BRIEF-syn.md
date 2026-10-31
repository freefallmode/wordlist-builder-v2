# Brief: synonym aliases become entries of their own (pilot)

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme. Read DESIGN-entries.md sections 2, 3.2 and 10 first (5 minutes).

A **synonym alias** is a different word with (nearly) the same meaning as its **root** (anchor `rain` / synonym `rainfall`). Until now it followed every theme its root is in and could also carry theme links of its own. That was wrong: whether two words mean the same depends on the theme. The new model:
- the synonym becomes an **ordinary entry** with its own theme links;
- in each theme that holds both words they form a **synonym group** (the game shows only one member of a group per level, so the player is never asked to sort two words that mean the same);
- aliases are only for the same word (spelling, form, regional name, abbreviation).

Your chunk lists synonym aliases. For each one decide what it really is, then write ONE line.

## Decisions
- `Y <id>` **true synonym**: interchangeable with the root in the root's themes. It becomes an entry in every theme the root is in plus its own themes, and is grouped with the root wherever both are. Add exceptions when needed:
  - `-<themeId>`: not in that theme at all (the link was wrong or pointless; for example a word-play theme where the synonym does not fit, or a theme about a sense of the word the synonym does not have);
  - `~<themeId>`: in that theme but NOT grouped with the root (the two are different things there, or the theme is a list of synonyms).
  Example: `Y 4510 -darts_terms ~starts_with_a_color` (chalkboard: no darts, and "starts with a color" is word-play where chalkboard and blackboard are both fine).
- `O <id> | <label or ->` **a different sense**: the word is not really a synonym of the root (`castle` for `rook`, `collar` for `arrest`). It becomes an entry with only its own theme links, no group. Give a short meaning label if it will share its text with another entry (the listing shows "same text elsewhere"); the label must not repeat the theme name. It must have its own theme links.
- `X <id>` **delete**: it adds nothing (a near-duplicate spelling already covered, a mislabelled word with no own links that nobody would say, a made-up word). Use sparingly: a genuine synonym with no links of its own is a `Y`, not an `X`.
- `R <id> <kind> [UK,AU]` it is really another kind of alias: `spelling`, `form` (an inflection of the root only), `regional` (same thing, another country's word: give the region codes), `abbreviation` (short form of the root). Its own theme links move to the root.

## How to judge
1. Look at the root's and the synonym's themes. Is the synonym a word people would use for the same thing in those themes? Then Y. Slang names for drugs (`weed` for `cannabis`), nicknames (`doggo`) and old or poetic names (`Siam` for `Thailand`, `Hellas`) are still Y: they are other words for the same thing at a different difficulty. (Region-specific words were already set aside; you will not see those.)
2. A synonym that is narrower or broader than its root in some themes is still a Y, with `-theme` or `~theme` for the themes where it breaks down.
3. If the root has many themes (a dozen cat themes), do not review them all in depth: look for word-play or property themes (`___bird`, `sounds like a number`, `starts with a color`, `things with tails`) and check whether the synonym still qualifies (the synonym's own links already tell you what a previous review chose; those are safe). A theme that contains the root only because of its spelling (`___bird`: bluebird, catbird) does not apply to a synonym: add `-theme`.
4. Only use the listing; do not search the repo. Theme ids are in the listing (before the parentheses).
5. One line for EVERY listed id, in the same order, nothing else except `#` comment lines.

## Output and test
Write `tools/gen/syn/s-<n>.txt` (n is given in your task). Test on a scratch copy, never the real library:
```
cp data/wordlist-en.project.json tools/gen/syn/.scratch-<n>.json
node tools/gen/syn-apply.mjs tools/gen/syn/s-<n>.txt --lib tools/gen/syn/.scratch-<n>.json
```
It must print no PROBLEM lines. Fix and re-run until it does (re-copy the scratch file first). Delete `.scratch-<n>.json` and `.scratch-<n>.json.syn-done.json` when done (delete those two files by name, never with wildcards). Do not edit anything else and do not commit.

## Report (under 80 words)
File path, counts of Y / O / X / R, how many `-theme` and `~theme` exceptions, and anything you were unsure about.

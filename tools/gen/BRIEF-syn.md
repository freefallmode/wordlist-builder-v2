# Brief: synonym aliases become entries of their own, or other kinds of alias

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme. Read DESIGN-entries.md sections 2, 3.2 and 10 first (5 minutes).

A **synonym alias** is a different word with (nearly) the same meaning as its **root** (anchor `rain` / synonym `rainfall`). Until now it followed every theme its root is in and could also carry theme links of its own. That was wrong: whether two words mean the same depends on the theme. The new model:
- the synonym becomes an **ordinary entry** with its own theme links;
- in each theme that holds both words they form a **synonym group** (the game shows only one member of a group per level, so the player is never asked to sort two words that mean the same);
- aliases are only for the same word or the same name: spelling, form, regional name, abbreviation, translation.

Your chunk lists synonym aliases. For each one decide what it really is, then write ONE line. Two runs so far (1,557 aliases) showed the agents leaned too hard on `Y` (86%) and did not apply the rules below the same way from chunk to chunk, so follow them literally.

## Decisions
- `Y <id>` **true synonym**: interchangeable with the root in the root's themes. It becomes an entry in every theme the root is in plus its own themes, and is grouped with the root wherever both are. Add exceptions when needed:
  - `-<themeId>`: not in that theme at all (the link was wrong or pointless; for example a word-play theme where the synonym does not fit, or a theme about a sense of the word the synonym does not have);
  - `~<themeId>`: in that theme but NOT grouped with the root (the two are different things there, or the theme is a list of synonyms).
  Example: `Y 4510 -darts_terms ~starts_with_a_color` (chalkboard: no darts, and "starts with a color" is word-play where chalkboard and blackboard are both fine).
- `O <id> | <label or ->` **a different sense or a related thing**: not really the root's synonym (`castle` for `rook`, `collar` for `arrest`; an alter ego or role such as `Tony Stark` for `Iron Man`; a person versus their title). It becomes an entry with only its own theme links, no group. Give a short meaning label if it will share its text with another entry (the listing shows "same text elsewhere"); the label must not repeat the theme name. It must have its own theme links.
- `X <id>` **delete**: the alias itself is junk: a mislabelled or truncated word nobody would say (`Moon` for `Asiatic black bear`, from "moon bear"), a made-up word, or a near-duplicate already covered. Check that the alias is a sensible thing to say for the root BEFORE choosing Y. A genuine synonym with no links of its own is a `Y`, not an `X`.
- `R <id> <kind> [UK,AU]` it is really another kind of alias: `spelling`, `form`, `regional` (give the region codes), `abbreviation` or `translation`. Its own theme links move to the root, so see rule 6 below.
- `F <id> [UK,AU]` (region-differing run only) **flip**: the synonym is the US/default word and the root is the regional one. The synonym becomes the root and the old root becomes its regional alias tagged with the given regions.

## Rules for the borderline cases
1. **Be discriminating.** Y is not the default. Over a whole chunk expect roughly one in ten lines to be O, R, X or F. A chunk that is all Y has not been read carefully.
2. **Names and clipped forms are R, not Y.** A full name and its surname or short name (`William Shakespeare` / `Shakespeare`, `Hercule Poirot` / `Poirot`), a clipping (`tarp` / `tarpaulin`, `rep` / `repetition`), or a long name and its short name (`microwave oven` / `microwave`, `Atlantic Ocean` / `Atlantic`) are the same name: `R <id> abbreviation`. Exception: if both are established names rated differently by a person or a theme, ask whether a puzzle would ever show both; if yes, Y.
3. **Different ending, same word: R.** The two differ only by a plural, an ending or a variant form (`Balkans` / `Balkan`, `Capricorn` / `Capricornus`, `Argentine` / `Argentinian`, `Sinhalese` / `Sinhala`): `R <id> form` (grammatical forms only) or `R <id> spelling` (another accepted spelling or variant).
4. **Another language: R translation.** The same thing named in another language (`Danmark`, `Deutschland`, `Roma`, `Wien`, `Gaeilge` for Irish, `Cymraeg` for Welsh): `R <id> translation`. It follows the root's themes. Do NOT promote it to an entry. Old or alternative names in English (`Ceylon`, `Calcutta`, `Constantinople`) are still Y: they are other words for the same thing at a different difficulty.
5. **Nicknames, slang and informal names stay Y** (`Kiwi` for `New Zealander`, `Big Apple` for `New York`, `weed` for `cannabis`). They are other words for the same thing.
6. **R moves the alias's own theme links to the root.** Before choosing R, read the own-themes list: if it has links in themes that do not fit the root (the first run turned `PNG` the image format into an abbreviation of `Papua New Guinea` and moved its `file_types` link onto the country), the alias also has a second meaning: use `O` with a label instead. Check the root's themes too.
7. **Check the "already with the root" line** in the listing. If the synonym means the same as one of the entries already listed there (`cab` / `taxi`, `shisha` / `hookah`), do not promote a second duplicate: give it `X`, or `R` if it is another form of that entry. Sibling aliases in the same listing can be duplicates of each other; decide one and note it.
8. **Do not inherit the root's word-play.** For each Y, look at the root's themes for word-play or property themes (`___bird`, `sounds like a number`, `starts with a color`, `things with tails`, `words from Arabic`, double letters) and check whether the synonym still qualifies; if not, add `-theme`. A theme that contains the root only because of its spelling (`___bird`: bluebird, catbird) does not apply to a synonym. The synonym's own links already tell you what a previous review chose; those are safe. If the root has many themes, look only for word-play and property themes.

## Phase 2: the region-differing run (`syn-make.mjs ... --regional`)
The listing now shows synonyms whose region differs from their root's (`flat` UK for `apartment`, `rappelling` US for `abseiling`). They hold in every theme, so they are normally **aliases**, not entries: the default is `R <id> regional <REGION>` (region of the alias). The root should be the word of the default dialect (US):
- alias is the regional word, root is the default word: `R <id> regional UK`;
- the synonym is the default (US) word and the root is the regional one: `F <id> UK` (the tags go on the old root, which becomes the alias);
- the two are different things after all (`vanity` for `dressing table` is a US sense; `Alice band` is not `headband` in every theme): Y, O or X as above. Region-specific words that are also slang (`Kiwi`) stay Y.
Rules 1-8 apply here too; rule 1 changes to: expect most lines to be R or F.

## How to judge (all runs)
0. Read the own-themes list: a synonym with links of its own in themes unrelated to its root (castle for rook in buildings) is probably a different sense (O), and a synonym whose own links are all word-play or property themes may be junk. Use ~theme where the synonym and root are both in a theme but are not interchangeable there (a theme of types of one thing, a theme of words for a feeling at different strengths, kinship terms of different gender).
1. A synonym that is narrower or broader than its root in some themes is still a Y, with `-theme` or `~theme` for the themes where it breaks down.
2. Only use the listing; do not search the repo. Theme ids are in the listing (before the parentheses).
3. One line for EVERY listed id, in the same order. **Add a `#` comment line with a one-line reason above every O, X, F and R decision and every `~` or `-` exception** (a few words are enough: `# alter ego, not a synonym`). Nothing else but comments.

## Output and test
Write `tools/gen/syn/s-<n>.txt` (n is given in your task). Test on a scratch copy, never the real library:
```
cp data/wordlist-en.project.json tools/gen/syn/.scratch-<n>.json
node tools/gen/syn-apply.mjs tools/gen/syn/s-<n>.txt --lib tools/gen/syn/.scratch-<n>.json
```
It must print no PROBLEM lines. Fix and re-run until it does (re-copy the scratch file first). Delete `.scratch-<n>.json` and `.scratch-<n>.json.syn-done.json` when done (delete those two files by name, never with wildcards). Do not edit anything else and do not commit.

## Report (under 80 words)
File path, counts of Y / O / X / R / F, how many `-theme` and `~theme` exceptions, and anything you were unsure about.

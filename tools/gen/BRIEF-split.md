# Brief: propose sub-themes for big themes

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme. Big themes (50+ words) can often yield extra, narrower themes that make good puzzles. Read DESIGN-entries.md section 4 first (2 minutes).

Your chunk lists themes with their words (`id text [meaning] pos rec pop`: rec = how well known the word is, 1 every child to 5 few; pop = how typical it is of the theme, 1 first thing anyone thinks of to 5 peripheral). For each theme decide whether it has one or more **sub-themes** worth adding: a subset of its words that a player can recognise as a group. The members stay in the parent too.

## Output
One line per decision, in the order of the listing:
- `S <parent theme id> | <new theme name> | <theme popularity 1-5> | <word id>,<word id>,...`  propose one sub-theme (a theme can have up to 3 `S` lines);
- `N <parent theme id>`  no useful split.
Add a `#` comment line above every `S` with a one-line reason (the test a player uses to decide membership). Nothing else but comments. Every listed theme gets at least one line.

## Rules
1. **A sub-theme has a clear membership test**, so a player can place any word: `adjectives for the weather`, `animals that live in water`, `tools with a blade`. Not vague moods or "misc".
2. **At least 8 words**, all taken from the parent's list (use their ids). At most about 60% of the parent: a split that holds nearly everything adds nothing.
3. **The name must not give the members away.** No name word may appear in a member (the name `tomato things` for tomato soup is a leak). A member that is just the name's head noun is fine (`bug` in `garden bugs`). Names are lowercase plural phrases like the existing ones (`big cats`, `rain words`); do not use the parent's name as a prefix to make a longer name (`jobs in jobs`).
4. **No duplicates**: do not propose what an existing sub-theme or sibling (listed) already is, even under another name.
5. **Complete themes** (marked COMPLETE) are fixed sets: only propose a sub-theme if it is itself an exact fixed set (`noble gases` in chemical elements). Otherwise `N`.
6. **Language-specific themes** (wordplay such as `___ball`) get `N` unless the split is also wordplay.
7. **Good splitting axes**: part of speech (adjectives vs nouns vs verbs), what kind of thing (people, places, tools, creatures), size or scale, setting or use, era, origin (Greek gods vs Norse gods), a property a player can test. Avoid axes that depend on knowing the word (famous vs obscure) or on rating.
8. **Do not invent words.** Use only the listed ids; a missing member is fine.
9. Be selective: expect a good split in roughly 1 theme of 3. `N` is a correct answer.
10. Sensitive, adult or trademark themes follow the same rules; do not split off content that would be worse than the parent.

## Output and test
Write `tools/gen/split/p-<n>.txt` (n is given in your task). Test: `node tools/gen/split-apply.mjs tools/gen/split/p-<n>.txt` (a dry run: it reports problems and writes nothing). It must print no PROBLEM lines; fix and re-run. Do not edit anything else and do not commit.

## Report (under 60 words)
File path, number of `S` and `N` lines, and anything you were unsure about.

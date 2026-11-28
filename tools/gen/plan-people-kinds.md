# Plan: `people` and `name` theme kinds (2026-11-28, for Simon's approval)

## Why

Generator g29 holds people and first-name themes to level 41, but it finds them by guessing: the ancestor names "famous people", "names" and "surnames", or a person word in the theme name with 70% of the words capitalised or of type person (GAME-CONTRACT, theme name row). Renaming a folder or moving a theme silently changes which levels may use it. The game said an explicit kind would be "more reliable and simpler", and asked us to keep given names apart from people and to say where surnames go.

## The two kinds

| Kind | What it is | Examples | Themes |
|---|---|---|---|
| `people` | real people, famous or historical, by name | US presidents, composers, explorers, the Beatles | about 133 (below) |
| `name` | personal names as words, not particular people | girls' names, short forms of names, names that are flowers, surnames that are jobs | 20 + 3 surnames |

- **Not `people`:** fictional characters (Disney, superheroes), gods and myth figures, and job or role words (doctors, kings as a chess piece). They stay category; firstLevel can still hold any of them back.
- **Surnames (3 themes):** I recommend `name`. They are lists of names as words, like the first-name themes, and today they play from level 1 as category. Making them `name` holds them to 41 like first names. The other choice is leaving them category.
- **Wordplay stays wordplay:** a names theme built on spelling (none today) would keep wordplay.

## Which themes become `people`

- **Famous people branch:** all 23 playable themes.
- **Elsewhere:** 110 themes with 70% or more members of type person. Sports (famous athletes and its subthemes), music (composers, band members, singers), art (painters, sculptors, architects), stage and film (playwrights, directors, film stars, comedians), literature (authors, poets), history (pharaohs, sultans, explorers, generals, pirates, Wild West legends), science (scientists, mathematicians, engineers), religion (the four evangelists, famous saints), fashion designers.
- **Check by hand:** the six under 100% (famous pirates 76%, Wild West legends 84%, astronauts 92%, Australian explorers 96%, classic film stars 97%, famous saints 98%).

**What changes in play:** whichever of the 110 the game's test misses today move from level 1 to level 41. The game is checking which ones that is (asked 2026-11-28); if many play from level 1 now, you choose between holding them all to 41 or keeping some early with their own firstLevel.

## Code

1. `js/export.js` THEME_KINDS and `tools/export-contract.mjs` KIND_NAMES: append `people`, `name` (indexes 5, 6; the existing five keep their numbers).
2. `js/dialogs.js`: the Kind hint gains the two kinds.
3. `js/validate.js`, new warning `kind-people` (baseline 0): a non-group theme with 70% or more person-type members that is not `people`, or a `people` theme under 70%. And `kind-name`: a theme under the names folder that is not `name`. Both warnings, so a deliberate exception goes on the allow-list with your OK.
4. `js/ai.js`: the generation prompt says what a people or name theme is.
5. Tests: the new kinds export at 5 and 6; the checks fire.
6. Docs: LIBRARY-RULES section 3 step 4 (kinds and rating defaults: people rated like category, 1-2, 3+ for specialists), DESIGN.md (kinds, check list), GAME-CONTRACT (kindNames, kind row, the theme name row once the game drops the guess).

## Library

Batch v523 sets `tkind` on the people and name themes (status `rev` on no entries: theme fields only). The export changes in those theme rows' kind column and in `kindNames` (two names added).

## Order, so play does not change by accident

1. The game adds `people` and `name` to KindOf (people to h, name to n), keeping the ancestor test as a fallback for older exports.
2. Then the library ships v523, and the notice goes to the game on your word.
3. Later, once the game pins v523 or later, it can drop the ancestor test, and GAME-CONTRACT drops the warning about renaming those folders.

## Your decisions

1. Surnames: `name` (held to 41), or stay category?
2. The people themes the game's test misses today: hold all to 41, or keep some early?

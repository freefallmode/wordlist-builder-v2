# Brief: overlap in a theme (a word and a longer form of it)

A word-sorting game shows four words from a theme and the player sorts each into its theme. A theme must not list two words that are the same answer, or one word that gives the other's category away (cola and Coca-Cola in soft drinks). Your listing is a chunk of themes where one entry's text sits inside another's. Decide what to do with each pair.

Listing format: `T <theme id> | <theme name> | <word count>` starts a theme. `A <id> <text> (<type>, rec, themes)` is the shorter word; each indented `B ...` line is a longer entry in the same theme containing it. `brand` marks a trademark; `in N themes` is how many themes the entry is linked to.

## Verdicts (write only the ones that are NOT "keep"; most pairs are fine)
Keep when A and B are different things a player would sort separately: `ice` and `ice cream`, `fire` and `fire engine`, `apple` and `custard apple`, `lemon` and `meyer lemon` (a variety in a fruit list is fine).

1. **MERGE**: A and B are the same thing, or B only adds a word that carries no meaning here (`pasta` / `pasta dish`, `smell` / `sense of smell`). B leaves this theme; A stays. Write `MERGE <theme id> <A id> <B id>`.
2. **BRAND**: B is a brand (or product line) of A, or a brand of something generic that A names (`cola` / `Coca-Cola`, `tissue` / `Kleenex`). B leaves this generic theme; it belongs in brand themes. Write `BRAND <theme id> <A id> <B id>`. Do not use it for a brand listed with no generic counterpart in the theme: that is not an overlap.
3. **GROUP**: A and B are near the same answer but both worth keeping (`sofa` / `settee` style), so the game must never use both in one level. Write `GROUP <theme id> <A id> <B id>`.
4. **SUB**: four or more entries are all kinds of one thing and are enough to be a theme of their own (`whale` with `blue whale`, `humpback whale`, `killer whale`, `sperm whale`; `shark` with its species). Write `SUB <theme id> | <new theme id> | <new theme name> | <id> <id> <id> <id> ...`. List only ids that appear in your listing for that theme, at least 4. The new theme name must be a lowercase plural phrase that stands alone out of tree context and does not contain any member's text as a leak (`whale types`, `shark species`, `blue-collar jobs`); the members stay in the parent too. Also write verdict lines for the rest of the pairs as normal.

Rules:
- Be conservative: only act when confident. A variety, a kind, or a compound that the player must tell apart from the plain word is a keep.
- If B is the same answer as A but A is the longer, rarer form, still write `MERGE` with the pair as shown (the shorter A stays; the short-entries rule prefers the shortest form).
- Do not invent ids; use only those in the listing. Do not change anything else.
- One line per pair, no duplicates. Put a `#` comment line above any non-obvious verdict with a few words of reason.

## Output
ONE file `tools/gen/overlap/v-<n>.txt` (n is given in your task). Read the whole listing; do not skip lines or stop early. If nothing needs changing, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, counts of MERGE, BRAND, GROUP and SUB lines, and the most common kinds of overlap you saw.

# Brief: overlap pairs, full pass (second look)

A word-sorting game shows four words from a theme and the player sorts each into its theme. An earlier pass (tools/gen/BRIEF-overlap.md: read it first, its verdict meanings apply) acted on the clear pairs where one entry's text sits inside another's in the same theme. The pairs it left (about 5,600) were all treated as keep. A random sample showed about 3% of them are clear errors and about 4% more should be grouped, so every pair is now being checked.

Listing (`tools/gen/overlap3/list-<n>.txt`): per pair a number, the theme (id, name, note), then `SHORT` and `LONG` with the entry id, the text the player sees, meaning label, pos, type, familiarity (`rec`) and link rating. SHORT's text is inside LONG's ("cactus" in "organ pipe cactus").

## Verdict per pair (write only the ones that are NOT keep; most are keep)
- **Keep**: different things a player sorts separately: `ice` / `ice cream`, `mop` / `mop bucket`, `family` / `family tree`, a species or breed beside its generic word in a theme of kinds (`foxhound` / `English foxhound`, `ground squirrel` / `Arctic ground squirrel`, `elbow macaroni` / `macaroni` in tube pasta), and the bare word of a plural-named theme (`snake` in snakes, `saw` in saws, `bat` in bats).
- `OUT <theme id> <SHORT id> <LONG id>`: LONG is not one of the theme's things. It merely contains a member's word, but is a part, product, food, person, place or event built on it: `oil well` in fossil fuels, `chicken wings` and `duck breast` in poultry, `candle maker` in candle words, `elephant seal` in animals with tusks, `engagement party` in life events. LONG leaves this theme.
- `MERGE <theme id> <SHORT id> <LONG id>`: the same thing under two texts (`spinning top` / `top`, `going viral` / `viral`, `pasta` / `pasta dish`). LONG leaves; SHORT stays.
- `BRAND <theme id> <SHORT id> <LONG id>`: LONG is a brand of the generic SHORT in a theme of a general category (`cola` / `Coca-Cola`; `pot` / `Instant Pot` in cookware). LONG leaves.
- `GROUP <theme id> <SHORT id> <LONG id>`: a player would take them as the same answer, both worth keeping, never both in one level (`pruning shears` / `shears`, `user interface` / `interface`, `stand mixer` / `mixer`, `big bad wolf` / `wolf` in fairy tale villains, `rock samphire` / `samphire`, `rolled fondant` / `fondant`).
- `SHORT-OUT <theme id> <SHORT id> <LONG id>`: only when the theme name says it collects kinds ("types of X", "X types", breeds, varieties, species, styles) and SHORT is the bare category word (`road` in road types). Never for a plural-named theme.
- Be conservative: when unsure write nothing. Judge only with what the listing shows. Do not invent ids.

## Output
ONE file `tools/gen/overlap3/v-<n>.txt` (n given in your task): the verdict lines only, one per pair, a `#` comment line above any non-obvious one. Read the whole listing and do not stop early. If nothing needs changing, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, counts of OUT, MERGE, BRAND, GROUP and SHORT-OUT lines, and the most common kinds of error you saw.

# Brief: a brand next to the generic word it stands for

A word-sorting game shows four words from a theme and the player sorts each into its theme. A theme must not list two words that are the same answer. The first sweep caught pairs where one text contains the other (cola / Coca-Cola). This one catches pairs that share no words: Pepsi next to cola, Sprite next to lemon-lime soda, Kleenex next to tissue, Hoover next to vacuum cleaner.

Listing: `T <theme id> | <name> | <word count>`, then `BRANDS:` (brand and organisation entries in that theme, `<id> <text>`) and `OTHERS:` (the other entries, `<id> <text>`). Look at each brand and decide whether OTHERS holds the generic word it stands for, or another entry that is the same answer.

## Decide what the theme is
- **A theme of a general category** (soft drinks, cleaning products, tissues, vacuum cleaners): a brand and its generic word are one answer to the player. Write `GROUP` (keep both, the game never shows both), or `BRAND` when the brand adds nothing and can leave the theme.
- **A theme of examples or kinds** (fizzy drinks, chocolate bars, car makes): Pepsi, cola, Sprite and lemonade are different things a player sorts separately. Keep them all, write nothing.
- Test: would a player hesitate over which of the two a word is? If yes, group. If the two are clearly different things in this theme, keep.

## Verdicts (only write the ones that act; most themes need nothing)
- `GROUP <theme id> <generic id> <brand id>`: same answer, keep both.
- `BRAND <theme id> <generic id> <brand id>`: the brand leaves this theme. Use only when the brand is a plain stand-in for the generic word and is not worth keeping.

Rules:
- Be conservative. A brand next to a different generic word (Sprite and cola) is a keep unless the theme is about the category as a whole.
- Never pair two brands with each other, and never pair a brand with an entry that is also a brand or organisation.
- Use only ids from your listing, generic id first. One line per pair, no duplicates. A `#` comment line above any non-obvious verdict is welcome.

## Output
ONE file `tools/gen/overlap2/v-<n>.txt` (n is given in your task). Read the whole listing. If nothing needs changing, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, counts of GROUP and BRAND lines, and the commonest cases.

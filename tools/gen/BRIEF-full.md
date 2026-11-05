# Brief: full terms shown in full in kinds themes

In themes of kinds ("car types", "clock types", "island types") a word-sorting game shows a member's text and the player sorts it into its theme. Rule (DESIGN-entries.md 3.6): an entry is the FULL term; the theme may show a shorter word (`show`) when that word, seen alone in the theme, still identifies the kind (`whole milk` shown as "whole", `oat milk` as "oat"). The members in your listing are full terms that are still shown in full, so the theme name's word appears in them ("sports car" in car types).

Listing (`tools/gen/full/list-<n>.txt`): per item a number, the theme (id, name, note), then the entry (id, text, meaning label, pos, type, familiarity `rec`, link rating).

## Decide per item (write a line only for items that should be shortened)
`SHOW <theme id> <entry id> <short text>`
- Shorten when the theme word is the LAST word (or the head) and what is left is a word or phrase that, taken alone, still points to the kind in this theme: `sports car` → `sports`, `desert island` → `desert`, `mantel clock` → `mantel`, `lava rock` → `lava`, `wild horse` → `wild`. Use the modifier exactly as it is written in the entry.
- Leave whole (write nothing) when: the theme word comes first or in the middle and the rest would not identify the kind (`island chain`, `island arc`, `cloud bank`, `massage gun`, `Google Maps`, `site map` if "site" alone is unclear); the entry is a name or fixed phrase (`A-road`, `Lady Apple`, `connecting rooms`); the remainder is a function word, a number or a fragment; or the remainder could just as easily point to another kind or another theme (`town car`, `toy train`, `tiny house`, `night train` are borderline: shorten only if "town", "toy" ... would still read as that kind to a player who sees the theme name).
- Be conservative: when unsure, leave it whole. Judge only with what the listing shows.

## Output
ONE file `tools/gen/full/v-<n>.txt` (n in your task): the SHOW lines only, `#` comment above any non-obvious one. Read the whole listing; do not stop early. Empty file if none.

Do NOT edit the library, js/ or other files, and do NOT commit.

## Report (under 50 words)
File path, number of SHOW lines, and the commonest reason items were left whole.

## Plain category themes (listing `tools/gen/full2/`)
The same decision applies to category themes named by their head noun ("hats", "cakes", "owls", "snakes"): members written as modifier + head (`sun hat`, `birthday cake`, `sea snake`) are full terms that may be shown with the modifier alone. Same test: seen alone in this theme, does the short word still identify the member? Shorten `sun hat` → `sun`, `birthday cake` → `birthday`, `Ural owl` → `Ural`; leave whole only when the short word could point elsewhere in this theme or is a fixed name. A colour, size, season or habitat word is NOT a reason to leave an item whole: the decision for kinds (teas, swans, squashes) is `green tea` shown as "green", `black swan` as "black", `summer squash` as "summer"; judge by the same test (does the short word alone identify the kind in this theme?). Place and street names (`Red Square`, `Golden Bay`) are fixed names and stay whole. Write verdicts to the `full2` directory (v-<n>.txt there) when your task says so.

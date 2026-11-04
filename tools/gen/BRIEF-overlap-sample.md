# Brief: overlap sample (checking the pairs an earlier pass kept)

A word-sorting game shows four words from a theme and the player sorts each into its theme. An earlier pass (BRIEF-overlap.md) reviewed pairs where one entry's text sits inside another's in the same theme and acted on the clear ones (merge, brand, group, sub-theme). The pairs left, about 5,600, were all treated as KEEP. We want to know how many of those keeps were wrong, from a random sample. Read tools/gen/BRIEF-overlap.md first: its verdict definitions apply (MERGE, BRAND, GROUP) and so does its conservative stance.

Listing (`tools/gen/overlap/sample-<n>.txt`): per pair a number, the theme (id, name, note), then SHORT and LONG: the entry id, the text the player sees, meaning label, pos, type, familiarity (`rec`) and link rating. The SHORT text is inside the LONG text ("cactus" in "organ pipe cactus").

## Verdicts, one per pair
- `K`: keep. Different things the player sorts separately: `ice` / `ice cream`, `lemon` / `meyer lemon` (a variety in a fruit list), `mop` / `mop bucket`, `family` / `family tree`.
- `MERGE`: the same thing under two texts, or the long one only adds a word with no meaning here (`pasta` / `pasta dish`).
- `BRAND`: the long one is a brand of the short generic word (`cola` / `Coca-Cola`).
- `GROUP`: near the same answer, both worth keeping, never both in one level.
- `SHORT-GONE`: the theme collects kinds of the short word, so the short word alone is a bare category word that should leave (`cactus` in a theme of cactus kinds).
- `LONG-GONE`: the long one is a kind, variety or part of the short one that the player cannot tell apart from the short one in this theme, or it does not belong to the theme's idea (a pine grosbeak in a taiga theme listing trees and animals is fine: K; `Hellfire missile` next to `missile` in modern weapons is LONG-GONE).
- When unsure choose `K` and say so in the note. Judge only with what the listing shows.

## Output
ONE file `tools/gen/overlap/sv-<n>.txt` (n given in your task), one line per pair in order, never skip one:
`<pair number> | <verdict> | <note under 12 words>`

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, counts per verdict, and anything odd.

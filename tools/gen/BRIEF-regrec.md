# Brief: re-rate how well known words of region-tied themes are (`fam`)

A word-sorting game picks words by how well known they are (`fam`, 1 to 5). It is played mostly by adults from the US and UK. Some themes are tied to one country or culture (indian sweets, turkish food, NHL teams, AFL clubs). The first ratings of the words in them were often set from the point of view of someone who lives there, which makes them too easy for a general player. Your listing is words of such themes that are currently rated 3 or easier. Check each rating against a **typical adult US or UK player**, who does not live in the theme's country and has no special interest in it.

Listing lines: `<id> | <text> [<meaning label>] | <type> | fam <current> | <up to two region-tied themes, with their region codes> | word region <codes, only when tagged>`.

## The scale (a typical adult player of an English-language game, US and UK mostly)
- 1 every child and adult knows it (pizza, London, Elvis Presley, Santa Claus)
- 2 nearly every adult (sushi, Tokyo, Cleopatra, NASA)
- 3 many adults, not all (baklava, Timbuktu, Frida Kahlo, hockey's Maple Leafs)
- 4 people with the interest, job, heritage or region (rasgulla, dolma, a regional league's minor club, a Turkish city)
- 5 few people (a village, an obscure official, a specialist dish known only locally)

## Rules
- The rater is a mix of US and UK adults. For a US-tied theme (NHL teams, country singers) that means a UK adult knows it less: rate for the mix, not for a local fan. For a theme tied to another country, rate as someone who has never lived there and eats, watches and reads what US and UK media offer.
- Food, drink, clothes and places that have gone global (sushi, curry, kebab, tacos, pizza, tea, Mumbai, Istanbul) keep a low rating. Local specialities, regional dishes, local brands, domestic politicians, domestic sports clubs and players, local festivals and the words for them in the local language usually deserve 4 or 5.
- Be conservative: between two ratings pick the harder one. Change a rating only when you are confident it is wrong by at least one step. Most lines in a chunk of globally known items will be fine; leave them out.
- A name is rated as the name, so `Washington [state]` and `Washington [person]` are different entries.
- Do not change anything else (text, labels, themes).

## Output
ONE file `tools/gen/regrec/r-<n>.txt` (n is given in your task). One line for each entry whose rating should change: `<id> <new fam 1-5>`. Nothing else in the file: no comments. Read the whole listing; do not skip lines or stop early. If nothing needs changing, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, how many lines you wrote, how many went harder and how many easier, and the kinds of words you most often corrected.

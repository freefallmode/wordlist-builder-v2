# Brief: regional equivalents

The word library marks words that belong to one English-speaking region (`UK`, `US`, `AU`, `NZ`, `IE`, `CA`, `ZA`, `IN`) with that region. A word can have a regional alias: the same thing under another region's name (`sidewalk` US and `pavement` UK; `trousers` UK and `pants` US; `rockmelon` AU/NZ and `cantaloupe`). Your listing is region-flagged words that have no regional alias yet. For each one, decide whether a common equivalent exists in another region.

Listing lines: `<id> | <word> [<meaning label>] | <part of speech> | <region> | <up to two themes> | has aliases: ...` (the last part only when it has aliases of another kind).

## What counts as an equivalent
- The SAME thing under a different name used in another English-speaking region or in general English: sidewalk / pavement, elevator / lift, eggplant / aubergine, hood (car) / bonnet, jelly (UK dessert) / Jell-O is NOT (different things).
- A near match is not an equivalent: a Chesterfield is a kind of sofa, not another name for one; a flat white is a coffee with no other name; a specific food or custom with no other name (haggis, stilton, poutine, pavlova, kulfi, grits) has no equivalent.
- The equivalent must be a real, common word or short term that a player in that region would accept as the same answer. Prefer one word.
- General English counts: for `rockmelon` (AU/NZ) the equivalent is `cantaloupe` (US/general).
- One word may have more than one equivalent in different regions (`lift`; `elevator`): list each.

## Output
ONE file `tools/gen/regalias/r-<n>.txt` (n is in your task). One line per equivalent, nothing else: `<id> | <equivalent> | <regions where the equivalent is used, e.g. US or general>`. Write nothing for words with no equivalent. Lowercase the equivalent. Read the whole listing; do not stop early. If no word has one, write an empty file.

Do NOT edit the library, other files or js/, and do NOT commit.

## Report (under 40 words)
File path, how many words had at least one equivalent, how many lines you wrote.

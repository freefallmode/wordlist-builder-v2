# Brief: part of speech for every entry still tagged by default

The word library feeds a word-sorting game that, in each theme, wants members of one grammatical form. Most entries have no part of speech recorded, and the library treats those as nouns. Your listing is a chunk of those entries. Find the ones that are NOT nouns.

Listing lines: `<id> | <text> [<meaning label>] | <up to two themes the entry belongs to>`.

## Judge
The part of speech of the word or phrase AS USED in the sense the label and themes show.
- noun: things, people, places, names, noun phrases (`golden retriever`, `high five`, `rain`). Compound nouns and noun phrases are nouns however many words they have.
- verb: an action word or verb phrase (`prune`, `sprint`, `walk the dog`, `give up`).
- adjective: describes a thing (`scorching`, `industrial` in "industrial robot", `humanoid`, `black` in a coffee theme when it means plain coffee is a NOUN use, so judge by sense). A colour in a colour theme is a noun.
- adverb: `quickly`, `sideways`.
- other: interjections, prepositions, conjunctions, idioms and fixed phrases that are not noun phrases (`oh dear`, `out of order`, `sweet and sour`).
When a word is both (`run`, `light`) use the sense the label and themes indicate; with no clue, noun.

## Output
ONE file `tools/gen/pos/q-<n>.txt` (n is given in your task). One line for each entry that is NOT a noun: `<id> <verb|adjective|adverb|other>`. Leave every noun out. Nothing else in the file: no comments, no blank headings. Read the whole listing; do not skip lines or stop early.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, how many lines you wrote per part of speech, and anything surprising (for example a whole theme of non-nouns).

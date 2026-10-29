# Brief: settle same-text word entries

A word-sorting game library holds several entries with the same text. Each entry is one *meaning* of the word and needs a short meaning label (`gloss`, 1-2 words: "planet", "soccer", "baby kangaroo") whenever another entry shares its text. Batches written in parallel left many entries with an EMPTY gloss beside others of the same text, so some are real duplicates (same meaning, should be one entry) and some are different meanings (need a label).

Your input: `tools/gen/recon/in-N.json` (N given in your task): a list of groups. Each group = all entries with one text (case-insensitive): id, gloss ("" = none), type, rec, alias-of, and up to 7 of the themes the entry sits in (`theme name [theme_id]`; "more" = further links not shown).

For every entry that has an EMPTY gloss decide, from its themes, what the word means in them:
- same meaning as another entry of the group (labelled or not) -> `{"id": <this id>, "merge": <target id>}`. Prefer a labelled entry as target. The merged entry's theme links move to the target. In wordplay themes (blank_*, anagrams, rhymes, hidden words, words with letters...) the meaning is incidental: merge such an entry into whichever other entry's meaning fits, usually the most common sense.
- a different meaning from every other entry -> `{"id": <id>, "gloss": "label"}` with a short label unlike the others' labels.
- if it is the group's only unlabelled entry and every other entry is glossed and different, it still needs a label.
Also, if two LABELLED entries clearly mean the same thing (e.g. "soccer" and "football (soccer)"), merge one into the other. Do not touch the gloss of labelled entries otherwise. If two unlabelled entries merge into each other the survivor must still end up with a label whenever other meanings of that text remain (give it a gloss op too). A final group must end with every remaining entry having a distinct non-empty gloss (or only one entry left).
Aliases (alias-of present): an alias entry follows its root; merge an alias only into another entry that is the same alias of the same root, otherwise just give it a gloss matching the sense.
Capitalised vs lower-case texts (Lee/lee, Orthodox/orthodox) are separate words: each just needs a label.
Think about real meaning, not lookalike themes: "mars" the planet vs "Mars" the god are different; "green" the colour in two colour themes is one entry; a river "mouth" is not a face "mouth". Label words by their most natural short sense ("name" for given names, "planet", "god", "river", "tool", "sport"...).

Output: write `tools/gen/recon/out-N.json` containing a JSON array of ops, one per decided entry (omit nothing that has an empty gloss). Do not edit any other file and do not touch the library. Verify with `node -e` that your JSON parses and that each id exists in the input. Report in under 60 words: counts of merges and glosses, and any group you were unsure about.

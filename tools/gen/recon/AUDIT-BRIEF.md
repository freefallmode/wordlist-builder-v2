# Brief: find words linked for the wrong meaning

A word-sorting game library keeps one entry per *meaning* of a word, with a short meaning label (`gloss`) when a text has several meanings. Batches written in parallel sometimes linked one unlabelled entry into themes for DIFFERENT meanings (e.g. NATO "India" in both the phonetic alphabet and countries; "egg" the food and the dairy product are fine, but "Pegasus" the constellation and the myth horse are two things).

Input: `tools/gen/recon/audit-in-N.json`: unlabelled entries (the only entry of their text) with up to 10 of the themes they sit in (`name [id] (root)`).
For each entry decide whether its themes all use ONE meaning of the word. Most do: the same thing seen from several angles (a lion in animals, mascots, heraldry; a violin in instruments and orchestra) is ONE meaning; wordplay themes (rhymes, blank_*, anagrams, hidden words) never count. It is a problem only when the themes need genuinely different senses (a different thing, not a different topic): river mouth vs face mouth, India the country vs the NATO letter, Mars planet vs god, Jordan the country vs the name.
Only when meanings really differ write an op, using ONLY themes shown (if you cannot see enough, decide from the shown themes; "more"-style entries show at most 10):
`{"id": <entry id>, "keep": "label for the senses that stay", "split": [{"gloss": "label", "themes": ["theme_id", ...], "type": "common|person|place|org|title|proper|acronym" (optional, default same)}, ...]}`
`keep` labels the original entry, which keeps every theme not listed in a split group; each split group becomes a new entry with its own label and just those themes. Labels are 1-2 words and differ from each other. Be conservative: skip anything doubtful.

Output: `tools/gen/recon/audit-out-N.json`, a JSON array of ops (empty array if none). Do not edit other files. Check it parses and that every id/theme comes from the input. Use a unique scratch script name containing your N if you need scripts (other agents run at once; never use /tmp/o.js). Report in under 50 words: number of ops.

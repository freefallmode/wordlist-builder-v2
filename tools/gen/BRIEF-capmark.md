# Capital or not: mark every capitalised common entry

Each line of `tools/gen/capmark/list-N.txt`: `entryId <TAB> text <TAB> gloss <TAB> pos <TAB> some of its themes`.
These entries are marked "common" in the library but are written with a capital. Rule: an entry is written the way it is correctly written for its sense.
A capital only for a proper noun (person, place, brand, organisation, nationality or language word, title of a work, named period or movement, deity),
an acronym/initialism, or a letter-shaped term (GI, MIDI, X-ray, T-bar). Everything else is lowercase (common nouns, adjectives, materials, gems, colours,
creatures, ranks and titles used as common words, units, foods without a proper name).
A phrase containing a proper word (`Chinese chives`, `Bramley apple`, `Hamburg parsley`) is `proper`.

Decide per line, one mark:
- `common` the capital is wrong; the entry should be lowercase (`Acre` the unit -> common)
- `person`, `place`, `org`, `title`, `proper` the capital is right; give the best mark (`proper` for anything else that is a name or contains one)
- `acronym` initialism or letter-shaped term
When unsure choose `proper`. Write `tools/gen/capmark/r-N.txt`: `entryId <TAB> mark`, one line per input line, every line once. Edit no other file.

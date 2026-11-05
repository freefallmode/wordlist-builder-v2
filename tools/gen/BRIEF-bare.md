# Brief: bare members of kinds themes

The library has themes of kinds ("types of milk", "tent types", "dog breeds", "rice varieties"). A word-sorting game shows a member's text and the player sorts it into its theme. Rule (DESIGN-entries.md 3.6): an entry is the FULL term; a theme may show a shorter word (`show`) when that word still identifies the kind. Some members are entered as the bare modifier instead (`oat` in types of milk is entered as the grain, so its part of speech, type and familiarity describe the grain, not the milk).

Listing (`tools/gen/bare/list-<n>.txt`): per item a number, the theme (id, name, note), `BARE` (entry id, text, meaning label, pos, type, familiarity `rec`, link rating in the theme), and the full-term entries the library already has for it, if any.

## Decide per item
- **Names the thing** (leave it): the bare word, taken alone, already means the kind or the thing: `merino` in sheep breeds, `cumulus` in cloud types, `oriel` in window styles, `bivy` in tent types, `notebook` in kinds of machines, `cuckoo` in clock types is NOT this (cuckoo alone is a bird; it needs "clock").
- **Modifier only**: the word needs the theme's word to mean the kind: `oat`, `almond`, `soy`, `cuckoo`, `semi-skimmed`, `condensed`. These get a full term (`oat milk`, `cuckoo clock`).
- Closed compounds (`buttermilk`), hyphenated terms and words already complete are never touched by this pass.

## Output lines (write only items that are modifier only; most may be fine)
`FULL <theme id> <bare id> <full term text> <full entry id or NEW> | <pos> | <type> | <rec 1-5> | <link 1-5>`
- If the listing shows a full-term entry that is the right one, use its id and leave pos/type/rec/link out after the id (end the line there).
- If none exists, write NEW with pos (noun, adj ...), type (common, name ...), familiarity `rec` (1 easiest ... 5 hardest) and typicality `link` (how well the full term is a typical kind of the theme, 1 most typical) judged for the FULL term, not the bare word.
- The theme will show the bare word (`oat`), the library keeps the full term (`oat milk`).
- Judge only from the listing. Be conservative: when unsure the bare word names the thing, write nothing. Do not invent ids.

## Output
ONE file `tools/gen/bare/v-<n>.txt` (n in your task): the FULL lines only, `#` comment above any non-obvious one. Read the whole listing; do not stop early. Empty file if none.

Do NOT edit the library, js/ or other files, and do NOT commit.

## Report (under 60 words)
File path, number of FULL lines (and how many NEW), and the commonest kinds of modifier-only entry you saw.

## Decisions from the first sample (2026-11-06)
- Breed-style and variety names that people say alone stay bare: `Gala`, `Siberian`, `Newfoundland`, `Andalusian`, `merino`. Genre and material names that stand alone stay bare: `axe`, `bomba`, `veneer`. Sibling notations (`9-volt`, `12-volt`, `AA`) stay bare.
- Hotel room types was converted by hand (rooms-fix.mjs): `single`, `double`, `queen` ... are modifier-only there.

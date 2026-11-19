# Kin pass v400: brief for one chunk reviewer (I22)

You decide one chunk of word-family suggestions in the Wordlist Builder library (repo C:\Simon\Dev\wordlist-builder-v2, library v399). You write ONE decisions file. Do not change the library, js/, the export or any other file, do not commit, do not message other sessions, and never use port 8100.

## Why

The word game (Word Safari) builds each level from several themes. Two look-alike words of one family that land in different groups of one level (joy in "emotions", joyful in "happy words") tempt a wrong drop and cost the player a try. When two entries are made **kin**, the export gives them a shared clash id, and the game never puts them in one level. Kin changes nothing else: both words stay in their themes. It is cheap: a level uses about 20 of ~60,000 words.

Read DESIGN-entries.md section 3.7 (Word families). Then read the pilot's 500 decisions in tools/gen/batch399-review.txt. They are your worked examples, approved by Simon; follow the same standard.

## Input

`tools/gen/kin400/chunk-NN.tsv` (your NN is in your prompt). There is one tab-separated line per suggestion:

idA, idB, textA, textB, typeA, typeB, famA, famB (familiarity 1 every child knows ... 5 rare), glossA, glossB, themesA (up to 4), themesB (up to 4), and a 2-letter flag (F = in the game's family export, - = not; both are still decided).

The pairs come from a rough suffix-stripping detector, so many are false.

## Decide each line

| Code | Meaning | Examples |
|---|---|---|
| `K` | Kin: one word family that a player would see as look-alikes | bake/baker, snow/snowy, extinct/extinction, pup/puppy |
| `K` | Kin: one written word in another sense (Simon's ruling) | hearts the suit / heart the organ, trunks/trunk, clubs the suit / club the weapon |
| `KD` | Kin, and the two look like ONE word in ONE sense, stored twice | apple/apples, flea/fleas |
| `K?` | Kin, but a judgement call | |
| `N` | Not kin: letters only | mansion/man, belly/bell, mane/mansion |
| `N` | Not kin: a relation no ordinary player feels | |
| `N?` | Not kin, but a judgement call | |

Notes on the codes:
- `KD` pairs are still kin. They are also listed for a later merge into one entry (issue I23).
- Be sparing with N. When in doubt, choose `K?`: kin only keeps two words out of one level.
- Proper names follow the same test (Spain/Spanish would be kin; it is rare here because the detector skips pairs that differ in type or capitals).
- Use the glosses and themes to see the senses. If you need more context for an entry, you may read its line in the library with a targeted search, e.g. `grep -m1 '"id":12345,' data/wordlist-en.project.json`. Never read the whole file.
- Some pairs left unlinked in the pilot because a clash group would grow over 8 (engine/engineer, dig, ribs, stroll, sweaty, sing, pots, glasses) appear again. Decide them on the merits; the size limit is applied later by the consolidation step, not by you.

## Output

Write `tools/gen/kin400/decisions-NN.txt`. Use exactly one line per input line, in input order, in the same format as tools/gen/batch399-pairs.txt:

`idA idB CODE textA/textB -- short reason`

A reason is optional for plain K and for N on obvious letter matches. It is required for `K?`, `N?`, `KD`, sense-ruling `K`, and any N that is not letters-only.

## Check before you finish

Count the lines of the decisions file and the chunk file: the counts must match, and the ids must be the same in the same order. Do this with a small node or shell command.

## Report

Under 120 words:
- counts per code;
- the kin rate;
- up to 10 of the hardest calls;
- anything odd in the data, such as a wrong gloss, a wrong theme link, or a pair stored twice.

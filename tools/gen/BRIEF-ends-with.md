# Brief: "ends with ..." wordplay themes

Language & Wordplay › letter play holds themes of words that end with a word of some kind: "ends with a pet", "ends with a number" (bone, often, phone), "ends with a body part" (alarm, tulip, machine), "ends with a color" (hundred, hatred, sultan). The player sees a word and sorts it into the kind its last letters spell. The mirror of "starts with ..." (BRIEF-starts-with.md); the fun is that the ending is a coincidence.

## The criteria (every word must pass all of them)
1. **Unrelated.** The ending is only letters. The word's meaning has nothing to do with the type word. Good: `alarm` (arm), `tulip` (lip), `machine` (chin), `often` (ten), `phone` (one), `hundred` (red), `scarf` (car), `trumpet` (pet), `puppet` (pet). Reject anything built from the type word or about the same thing: `bulldog`, `bobcat`, `earring`, `sunshine`, `racecar`, `rainbow` (for colors), `lipstick`, `redhead`-style compounds, `thumbtack`. Test: if the type word explains part of the meaning, reject it.
2. **The type word is a real, separate ending.** The word must end with the type and be longer than it by at least two letters, and the type must not come only from an ordinary suffix (-ed, -er, -ing, -ly, -s, -es): reject `bored`, `tired`, `scared` for "red", `dancer` for "er". Reject the type word itself. Also reject words that are only the type word plus a prefix of the same word family (`suntan`, `bedroom`).
3. **Not a name.** Common words only: no brands, no places, no personal names, no title-case entries.
4. **Each word counts once per type.** In a type's group, no word may contain another, and no two words differ only by an ending (`hundred` / `hundreds`). Pick the better-known one.
5. **Known words.** Prefer words most adults know (familiarity 1 to 3). One or two harder words per type are fine (4 to 5), never made-up or archaic ones.
6. **Kid-safe.** No vulgar, adult or sensitive words.
7. **The type word itself is never a member**, and the kind word (pet, bird, tree ...) is not a type: the type words are the specific things (dog, cat; crow, wren).

## What to produce
For each type word in your candidate file, choose up to 6 words (fewer if fewer pass). You may add good words that are not in the library list; check them against the criteria. Skip a type if nothing passes.

The first word listed under a type is its **best** word: the one the player is most likely to know and the clearest coincidence. It becomes the type's word in the combined theme "ends with <kind>". A type with 4 or more words also gets its own sub-theme "ends with <type>" (`ends with arm`: alarm, farm, charm, harm).

Candidate files: `tools/gen/ends/cands-<theme>.txt` (raw matches: many are related or only suffix coincidences and must be rejected; read them all, then add your own).

## Output file `tools/gen/ends/<theme>.txt`
```
THEME <kind phrase as in "ends with ..."> | <one-line note with 4 or 5 examples>
TYPE <type word>
W <word> | <pos> | <rec 1-5> | <link 1-5>
W <word> | <pos> | <rec> | <link>
TYPE <next type word>
...
```
- `pos`: noun, verb, adjective, adverb or other. `rec` is familiarity (1 every child knows it ... 5 few adults). `link` is how clear and well-known an example the word is for the theme (1 best, 5 weakest): the best word of a type is usually 1 or 2.
- Lowercase words, exactly as in the candidate list when they come from it.
- The THEME line shows the kind with its article, e.g. `THEME a body part | alarm (arm), tulip (lip) ...`.
- No other lines. A `#` comment above a doubtful word is allowed.

Do NOT edit the library, the candidate files, js/ or anything else, and do NOT commit.

## Report (under 60 words)
File path, number of types with a best word, number of types with a sub-theme (4+ words), and the commonest reason candidates were rejected.

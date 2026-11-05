# Brief: "starts with ..." wordplay themes

Language & Wordplay › letter play holds themes of words that begin with a word of some kind: "starts with a color" (redeem, greenhouse), "starts with a body part" (handsome, armchair), "starts with a number" (tenant, ninety), "starts with a pet", "starts with public transport". The player sees a word and sorts it into the kind its first letters spell. The fun is that the beginning is a coincidence.

## The criteria (every word must pass all of them)
1. **Unrelated.** The beginning is only letters. The word's meaning has nothing to do with the type word. Good: `category` (cat), `ratchet` (rat), `busy` (bus), `window` (wind), `mistake` (mist), `hatchet` (hat), `socket` (sock), `ballet` (ball), `kidney` (kid), `teacher` (tea). Reject anything built from the type word or about the same thing: `snowflake`, `windmill`, `raincoat`, `fishnet`, `catfish`, `dogfight`, `birdbath`, `hatband`. Test: if the type word explains part of the meaning, reject it.
2. **The type word is a real, separate beginning.** The word must start with the type and be longer than it by at least two letters, without being the type word with an ordinary ending (reject `hats`, `bells`, `birds`, `windy`, `sunny`, `rainy`, `frosty`, `trains`). Reject the type word itself. Also reject words that are only the type word plus a prefix or suffix of the same word family (`drummer` for drum, `organist` for organ, `leader` for lead, `teacher` is fine: tea is not part of teach).
3. **Not a name.** Common words only: no brands, no places, no personal names, no title-case entries.
4. **Each word counts once per type.** In a type's group, no word may contain another (`petal`/`petalled`, `dogma`/`dogmatic`). Pick the better-known one.
5. **Known words.** Prefer words most adults know (familiarity 1 to 3). One or two harder words per type are fine (4 to 5), never made-up or archaic ones.
6. **Kid-safe.** No vulgar, adult or sensitive words.
7. **The type word itself is never a member**, and the kind word (pet, bird, tree ...) is not a type: the type words are the specific things (dog, cat; crow, wren).

## What to produce
For each type word in your candidate file, choose up to 6 words (fewer if fewer pass). You may add good words that are not in the library list; check them against the criteria. Skip a type if nothing passes.

The first word listed under a type is its **best** word: the one the player is most likely to know and the clearest coincidence. It becomes the type's word in the combined theme "starts with <kind>". A type with 4 or more words also gets its own sub-theme "starts with <type>" (`starts with dog`: dogmatic, doggerel, dogged, dogsbody).

Candidate files: `tools/gen/starts/cands-<theme>.txt` (raw matches: most are related and must be rejected; read them all, then add your own).

## Output file `tools/gen/starts/<theme>.txt`
```
THEME <kind phrase as in "starts with ..."> | <one-line note with 4 or 5 examples>
TYPE <type word>
W <word> | <pos> | <rec 1-5> | <link 1-5>
W <word> | <pos> | <rec> | <link>
TYPE <next type word>
...
```
- `pos`: noun, verb, adjective, adverb or other. `rec` is familiarity (1 every child knows it ... 5 few adults). `link` is how clear and well-known an example the word is for the theme (1 best, 5 weakest): the best word of a type is usually 1 or 2.
- Lowercase words, exactly as in the candidate list when they come from it.
- No other lines. A `#` comment above a doubtful word is allowed.

Do NOT edit the library, the candidate files, js/ or anything else, and do NOT commit.

## Report (under 60 words)
File path, number of types with a best word, number of types with a sub-theme (4+ words), and the commonest reason candidates were rejected.

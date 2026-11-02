# Brief: what kind of theme is each one

A word-sorting game shows sets of words and the player sorts each word into its theme. The game must check some themes by a rule it can test on the word itself, not by meaning. Your listing is a chunk of themes: `<id> | <name> {note} | up to 8 member words`. Give each theme a kind, and for wordplay and compound themes a rule.

## Kinds (exactly one per theme)
- category: the members are kinds or instances of one thing (soups, tools, dog breeds, famous painters, verbs of cooking). The default.
- place: the members are places (countries, capitals, rivers, landmarks, cities of a country, islands).
- property: the members share an attribute, not a type (red things, loud things, things with wheels, round things, sticky things).
- wordplay: members are chosen by spelling or sound, not meaning: hidden words, rhymes, palindromes, anagrams, homophones, starts or ends with something, double letters, onomatopoeia, letter patterns.
- compound: every member combines with one shared word to make a known compound or phrase ("___ bag", "snow ___", words that follow "fire").

## Rule (wordplay and compound only; leave `-` for the others)
A short machine-readable string the game can test:
- `hidden:<what>` a <what> is hidden inside the word (`hidden:tree`, `hidden:animal`, `hidden:color`, `hidden:body part`)
- `rhyme:<ending>` the word ends with that sound (`rhyme:ake` for "rhymes with cake"; use the spelling ending that fits most members)
- `palindrome`, `anagram` (members are anagrams of each other or of the name), `homophone` (sounds like another word), `onomatopoeia`, `double-letters`
- `starts:<what>` or `ends:<what>` (`starts:color`, `starts:number`, `ends:ia`, `starts:letter-a`)
- `contains:<what>` any other fixed letters or word inside
- `follows:<word>` / `precedes:<word>` for compounds ("snow ___" is `precedes:snow`, the missing word comes after "snow"; "___ bag" is `follows:bag`, meaning the member comes before "bag")
- `other` for wordplay you cannot express in the list above
Use the member words in the listing to decide the exact word or ending. When a theme is half rule, half meaning, choose the main one.

## Output
ONE file `tools/gen/kind/k-<n>.txt` (n is given in your task). One line for EVERY theme in the listing, in order: `<id> | <kind> | <rule or ->`. Nothing else: no comments, no headings. Read the whole listing (about 500 lines).

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, count per kind, and any theme you were unsure about.

# Review: language-specific (`lang`) themes that are not wordplay or compound (library v520, 2026-11-28)

Rule (LIBRARY-RULES.md section 4): `lang` marks a theme that depends on English spelling, sound or slang and will not translate. It also locks the theme by default (no regional or family word stands in), and the game may drop it by plan.
Test used here: could a translator translate each member and keep a good theme? If yes, `lang` goes. History: the only earlier decision is v517 (lang off the superhero themes).

Scope: 209 themes (195 category, 7 property, 1 place, 6 groups). None of the drops has an explicit `locked` or `foreign`.

## Drop `lang` (58): ordinary things, concepts or jargon that translate member by member

- Food: types of milk, cookies, flours, puddings, chocolates, pizza styles, ways to cut food, meals of the day, foods named after people, foods named after places, American candy
- Animals: horse colors
- Roads and travel: traffic words, road signs, parking words, taxis of the world, nautical directions, metro systems, hotel room types
- Body: stretches, body noises
- People and occasions: honorifics, wedding anniversaries, cozy things
- Sport and games: scoring words, sports verbs, word games, Aussie rules terms
- Music and literature: jazz words, hip hop words, notes and rests, solfege notes, poetry terms, poetic meters, comic book words
- History: superstitions, empires
- Numbers and measures: numbers one to ten, multiples of ten, big numbers, imperial units, old units
- Computers: keyboard keys, internet words, computer actions
- Grammar concepts (not the words themselves): grammar terms, sentence parts, clause types, figures of speech
- Qualities: opposites, see-through materials, things made of rubber, texture words, taste words, touch words, size labels, sound qualities, fire words

Effect: the theme is no longer locked, so a regional or family word may stand in (biscuit for cookie in the UK); 166 of their members have aliases. A plan that forbids `lang` would no longer drop them.

## Drop `lang` on the 6 groups (no effect in play)

slang and sayings, hidden animals, silent letter words, word origins, foreign color words, synonyms. Groups are never played and flags no longer pass down (v516), so the flag does nothing there.

## Keep `lang` (142)

- Sounds: animal sounds, vehicle sounds, eating sounds, water sounds, machine sounds (onomatopoeia)
- English word stock: baby animals, male animals, female animals, collective nouns, animal adjectives, city demonyms, street names
- Dialect and slang: Scottish landscape words, rain words, wind words, pirate talk, terms of endearment, money slang, the whole slang and sayings branch, words for toilet
- Synonym sets (they collapse into one word in translation): words for big / small / fast / good / bad / smart / strong / strange / funny / pretty / old / new / noise / tired / hot / cold / shiny / bright / dark, smell words, ways of walking / looking / speaking, surprised words, disgust words, words for friend / mother / father / grandparents / kids / a person, troublemakers
- The English words themselves: pronouns, prepositions, conjunctions, interjections, irregular past tenses and plurals (and their subthemes)
- Puns on an English word: things with legs, things with keys, things with teeth, things that pop
- English texts: Christmas carols, wedding rhyme
- Word origins: the whole word origins branch, brands used as words
- Names: unisex names, old-fashioned names, short forms, names that are flowers / gems / months / places / virtues / colors / trees, surnames that are jobs
- Words from other languages, relative to English: French loan phrases, Latin phrases, legal Latin, the foreign words themes, days, months, numbers and colors in other languages (16 of these also carry `foreign`)

## Simon's call (3)

- greetings, ways to say goodbye: mostly words from other languages (hola, sayonara) mixed with English ones; keep `lang`, or treat them like the foreign words themes and add `foreign`?
- tenses: names such as present continuous are English grammar; the idea of tense translates. Keep, I lean.

## Outcome: batch v521 (Simon, 2026-11-28: "yes, do what you think best")

- `lang` off 54 of the 58 and off the 6 groups. The export changes only in those 60 theme rows (bits 8 lang and 64 locked off); no word, link or index changes.
- Kept for now: puddings, parking words, taxis of the world, things made of rubber. Unlocked, they raise theme-name warnings (Christmas pud, car park, parking spot, collective taxi, rubber, rubber bands, rubber gloves) and case-sense-proper (Grab, Bolt); ISSUES I38.
- Greetings, ways to say goodbye and tenses keep `lang` (no `foreign` added).

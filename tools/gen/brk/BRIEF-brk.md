# Brief: line-break points for long words

A word-sorting game shows each word on a balloon. A long word that has to wrap over two lines is hyphenated at one of the points you mark. Your input file lists one lowercase word (or word with an apostrophe) per line. Output the same word with hyphens at every acceptable break, one line per input line, in the same order, as `word=wo-rd`.

## Rules
1. **Compounds break at the join:** play-ground, screw-driver, wheel-chair, speaker-phone, hair-dryer, sun-flower, basket-ball.
2. **Prefixes break after the prefix:** super-heroes, super-villains, under-ground, over-coat, micro-wave, anti-biotic. Likewise common suffixes that are words in their own right (-ship, -hood, -ness, -less, -ful, -ment, -ing, -ed).
3. **Everything else breaks at normal dictionary syllable boundaries** (Merriam-Webster style): kan-ga-roo, cro-co-dile, ham-bur-ger. Never put a consonant on the wrong side (supe-rheroes is wrong: the r belongs with hero).
4. **Never leave a single letter** on either side of a break, and never break before an apostrophe or the final `'s`.
5. Mark every acceptable break, not just one (super-hero-es), so the game can pick the one nearest the middle. Do not mark breaks that no dictionary would allow.
6. Proper names (people, places, brands): break at syllables, or at the join of a compound (Wash-ington, Mc-Donald's is wrong: leave McDonald's as mc-donald's only if that is natural; otherwise use syllables).
7. Foreign words and words you cannot split with confidence: output the word unchanged (no hyphen). That is fine.
8. Keep the letters exactly as given; only insert hyphens. No other output, no comments, no blank lines.

## Output
Write the result to the output path you are given, one `word=hyphenated` line per input line, exactly as many lines as the input.

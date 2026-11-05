# Brief: rate theme identifiability

The game shows a player four words and asks them to work out what links them (the theme). Identifiability (`ident`) is how easily a player works out the theme from four of its members. It is a property of the theme, judged separately from how hard the words are: assume the words shown are easy ones. Do not rate how popular or appealing the theme is.

## The scale
1. **Obvious.** Any four members point straight at the theme: colors, farm animals, fruits, kitchen tools.
2. **Clear.** The theme is specific and natural; most players name it from three or four words: musical instruments, card games, chess pieces.
3. **Needs a moment.** Several plausible themes fit four members until the last word, or the theme is a loose property: "things that are round", "things with wheels", "words ending in -ship".
4. **Hard.** The link is broad or a trick, or the player has to notice a spelling or sound pattern: "things made of metal" (any four metal objects could also be tools, kitchen things or jewelry), hidden words, words that rhyme with a pattern, homophones, "starts with ..." themes.
5. **Obscure.** Even with all four members few players find it: unusual letter patterns, themes needing specialist knowledge, rules a player would not think to test.

## How to judge
- Picture four of the example words together with no theme name. What would a player guess? If the first guess is the right theme, rate 1 or 2. If several other themes fit equally well, rate 3 or 4. If the link is invisible unless you look at the letters or sounds, rate 4 or 5.
- Wordplay themes (hidden words, starts with, ends with, letter changes, homophones) are usually 4. Use 3 for an easy and widely known pattern (rhymes, double letters, palindromes) and 5 for a hard or unusual one.
- Compound themes (words that can follow or precede a shared word) are usually 3: "___ball" is guessable once you see two of them; use 2 when the shared word is very common and the members are strong.
- Property themes ("things that are ...") are usually 3 or 4; use 2 only when the property is concrete and specific (things with wheels), 4 or 5 when it is broad or abstract (things that are hard).
- Plain category themes (kinds of one thing: cheeses, owls, musical instruments) are usually 1 or 2. Rate 3 or more when the topic is specialist (cheesemaking words, heraldry terms), when members overlap a neighbouring theme so four of them could belong to several (kinds of pasta against Italian foods), or when the theme is a vague or abstract collection. A sub-theme is rated for what the player sees, not the parent: a narrow sub-theme with a distinctive name is often easier to identify than its parent.
- Place themes (cities, rivers, US states, capitals) are usually 1 or 2; rate higher only when the places have nothing visible in common beyond the name or are very obscure.
- Use the whole scale, but most themes are 2 to 4. Judge each theme on its own; do not spread ratings to fill a quota.

## Output
A file `tools/gen/ident/r-<n>.txt` for your list, with one line per theme in the list and nothing else:
```
<theme id> <ident 1-5>
```
Use the theme ids from the list exactly. Rate every theme in your list. A `#` comment line above a doubtful rating is allowed.

Do NOT edit the library, the list files, js/ or anything else, and do NOT commit.

## Report (under 40 words)
File path, number of themes rated and the count at each rating 1 to 5.

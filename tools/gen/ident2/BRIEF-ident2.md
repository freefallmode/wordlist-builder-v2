# Brief (experimental): rate theme identifiability in a crowd

The game shows a player a grid of words (for example 16) that come from several different themes mixed together. The player has to find the four words that share one theme and work out what links them. The theme name is hidden. Identifiability (`ident`) is how easily a typical English-speaking player finds those four words among the other words and names the link. Judge the theme, not the difficulty of its words: assume the four members are easy, well-known words. Do not rate how popular or appealing the theme is.

Important differences from judging four words in isolation:
- The four members are scattered among about twelve unrelated words. A player first spots a pair that "feels" related, then looks for more. A theme is easy when its members pull together strongly and rarely look like they belong anywhere else.
- Words that belong to many themes are weak anchors. If a member could just as well sit in several other themes, the player is pulled away from the right group. Broad or loose themes are easily lost in a crowd; narrow, concrete, distinctive ones stand out.
- Knowledge that is local to one country or culture makes a theme harder for everyone else, even when the answer is obvious to locals. Rate for a general English-speaking player, not a local one. If a theme only works for one country's players, or its members depend on a regional convention (yellow taxis, yellow school buses, a national sport, a country's holidays), rate it higher than the same theme would be otherwise.

## The scale
1. **Obvious.** The members jump out of the crowd and the link is named at once: colors, farm animals, fruits, kitchen tools.
2. **Clear.** A specific, natural theme. Two members make the player suspect it and the others confirm: musical instruments, card games, chess pieces.
3. **Needs some work.** The player sees a pair but several themes fit it until a third or fourth member; or a loose property or compound; or a regional or specialist theme that most players can still work out.
4. **Hard.** The link is broad, a trick, a spelling or sound pattern, or depends on knowledge many players lack. Members are easily mistaken for other themes.
5. **Obscure.** Even knowing the four members few players find the link: unusual patterns, specialist knowledge, rules a player would not think to test.

## How to judge
- Imagine the four easiest example members dropped among twelve random words from other themes. Would a player collect exactly those four and name the theme? If yes at once, 1 or 2. If they would find a pair but take a wrong word or two first, 3. If they would not group them without being told, 4 or 5.
- Count how many other themes each example word could belong to. Many rivals means a higher rating.
- Plain narrow categories (kinds of one thing) are usually 1 or 2. Broad "things that are..." properties, themes whose members also fit big neighbouring themes, and anything regional are usually 3 or 4.
- Wordplay themes (hidden words, starts with, ends with, homophones) are usually 4 (3 for easy, well-known patterns, 5 for obscure ones).
- Use the whole scale. Judge each theme on its own; do not spread ratings to fill a quota.

## Task
Rate every theme in `tools/gen/ident2/list.txt` (format: `id | name | parent | example members, easiest first`). Judge only from the list and your own knowledge. Do NOT open any other file in the repository (in particular no data/*.json and no current.txt: existing ratings must not influence you). Write `tools/gen/ident2/r-new.txt` with one line per theme and nothing else:
`<theme id> <ident 1-5>`
Where the rating is doubtful because of regional dependence, add a line `# <id> regional` above it. Do not edit anything else and do not commit.

Report (under 40 words): number rated, count at each rating.

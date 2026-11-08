# Brief v3 (experimental): rate theme identifiability on a 12-word screen

The game puts up to 12 words on the screen at once. The player is told nothing: not the themes, not which words go together, not even how many themes there are. Typically the words come from 2 or 3 themes (each contributing 4 words, which can be merged into one group once the player sees them), and the rest are stray words whose theme has no other member on screen yet, so they belong to no group the player can complete. The player must pick out four words that share a theme and name the link. Identifiability () is how easily a typical English-speaking player finds those four words in that jumble. Judge the theme, not the difficulty of its words: assume its members are easy, well-known words. Do not rate how popular or appealing the theme is.

What makes this strict:
- Nothing tells the player where to start. Every word is a candidate for every group, so a member that also fits other themes on screen (or any big neighbouring theme) pulls the player the wrong way.
- Stray words look like members. A stray that loosely fits a broad theme (another animal in an animals theme, another food in a food theme) is a convincing decoy, so broad themes are easily mis-grouped and a player can be tempted to assemble five or six candidates. Narrow, distinctive themes whose members clearly belong together and not elsewhere stand out.
- Themes that are siblings or parent and child of other themes (street food next to fast food, African animals next to mammals) are hard because several groups may be on the screen together.
- Knowledge local to one country or culture makes a theme harder for everyone else even when locals find it obvious. Rate for a general English-speaking player. Themes whose members depend on regional convention (yellow taxis, yellow school buses) need extra weight.

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
Rate every theme in tools/gen/ident2/list.txt (format: id | name | parent | example members, easiest first). Judge only from the list and your own knowledge. Do NOT open any other file in the repository (in particular no data/*.json, no current.txt and no r-*.txt: other ratings must not influence you). Write tools/gen/ident2/r-v3.txt with one line per theme and nothing else:
<theme id> <ident 1-5>
Where the rating is doubtful because of regional dependence, add a line '# <id> regional' above it. Do not edit anything else and do not commit.

Report (under 40 words): number rated, count at each rating.

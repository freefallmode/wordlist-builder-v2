# Brief: theme popularity, second pass

A word-sorting game shows four words from a theme and the player sorts each into its theme. A theme's popularity (`pop`, 1 to 5) decides how early and how often a theme is put in front of a new player. The first pass forced a spread of ratings, so it ranked themes against each other instead of measuring how familiar each one is. Re-rate your chunk against the rubric below, theme by theme, on its own merits. There is no target spread: if most of your chunk deserves a 1, give it 1.

Listing lines: `<id> | <name> | <kind> | pop <current> | <n> words | easy <share of words at difficulty 3 or lower> | named <share that are named people, places, organisations, titles> | <sample words with difficulty in brackets: the easiest six and the hardest four>`.

## What pop measures
How familiar the theme is to a typical adult. Ask three questions in order:
1. **Everyday contact.** Does a typical adult meet this topic in a normal week (kitchen, garden, home, body, clothes, pets, school, street, shop)?
2. **Common-noun category, or a named-thing domain?** Are the members everyday words, or named people, places, ships, events, franchises? Named-thing domains need cultural knowledge; the basics everyone is taught (countries, continents, US states, planets, months) are the exception.
3. **Do the sampled words look recognisable?** `easy` and the samples are a check, not the rule: a theme about a familiar topic whose members are mostly obscure is a notch less popular.

## Scale
- **1** everyday topic, plain words, most members recognised, and the first thing a player would think of: fruits, vegetables, nuts, dairy, herbs, spices, pets, farm animals, body parts, clothes, colours, kitchen items, weather, countries, the planets, months. Complete school-basic sets are 1.
- **2** a familiar topic, but narrower or with a thinner member set, or one that needs school-level knowledge: pasta shapes, dog breeds, cheeses, Greek gods, capital cities, musical instruments, common tools, popular sports.
- **3** a topic many adults like but that needs real interest or culture: ancient Egypt, famous ships, wine regions, chess terms, film genres, famous painters, a particular country's landmarks.
- **4** specialist or technical: knots, geology terms, heraldry, specific sub-sub-categories.
- **5** niche or obscure: narrow technical lists, tiny regional topics.

Rules:
- Rate the theme, not its words. Do not give 1 to a theme just because it is a headline word (famous ships and ancient Egypt are not 1: a typical adult does not name those words readily).
- A narrow sub-theme (blood, navel, valencia in "orange varieties") is rarely better than 2; its parent is usually the 1.
- A theme with fewer than about 8 words, or a vague boundary, goes down a step.
- Complete themes of well-known closed sets (planets, months, days) are 1.
- Adult and sensitive themes are rated on the same scale as any other.
- Keep a theme's current pop unless you are confident it is wrong by at least one step.

## Output
ONE file `tools/gen/pop/p-<n>.txt` (n is given in your task). One line for each theme whose pop should change: `<themeId> <new pop> | <reason in about 8 words>`. Nothing else. Read the whole listing; do not skip lines or stop early. If nothing changes, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 60 words)
File path, how many changed, how many went to 1, how many moved down, and the topics you most often moved.

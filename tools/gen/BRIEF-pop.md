# Brief: popularity ratings for one chunk of themes

The library feeds a word-sorting game: a level shows sets of 4 words from 8-12 themes and the player sorts each word into its theme. The game picks words and themes by two things: DIFFICULTY and POPULARITY. This pass sets popularity, in two places.

## 1. Word popularity inside a theme (1-5)
How typical and central the word is of THIS theme: how readily it comes to mind when someone is asked to name things in the theme. It is not how well known the word is (that is `rec`, already set, shown for each word) and not whether it belongs (everything listed belongs).
- **1** the first words anyone names for the theme (weather: rain, sun, cloud, snow, wind)
- **2** typical, clearly central (fog, thunderstorm, hail, storm)
- **3** ordinary member (drizzle, blizzard, heatwave)
- **4** less typical or more specialist member (hurricane in a UK-centred weather theme is 2; cyclone, monsoon 3-4; jet stream, isobar 4)
- **5** real member but peripheral, or only in a stretch (a famous word that is a stretch for the theme, e.g. tomato in fruits, is a 5; a very obscure member is 5 too)

Rules of thumb:
- Spread the ratings: a theme of 20+ words normally has a few 1s (2-4), several 2s, and the rest spread over 3, 4 and 5. Do not give everything 2-3, and do not copy `rec`. A very well-known word can still be a 4 or 5 in a theme it only just fits, and an uncommon word can be a 1 or 2 when it is exactly what the theme is about (the theme "swimming strokes": backstroke 1, trudgen 3 or 4, not 1).
- `old` is only a loose hint left from an earlier rating of a different thing (how easily a word is placed). Ignore it when it disagrees with your judgement.
- Judge the theme as the typical player of this English-language game would; regional words follow the theme's region.
- Synonym lines (`~`) are alternative names of the word above them: rate each on its own, as how central THAT name is in the theme (couch 1, settee 3; physalis lower than cape gooseberry if it is less used there). Spelling variants and inflected forms are not listed: they take the root's rating.

## 2. Theme popularity (1-5)
How good a pick the theme is for a level: how broadly interesting, familiar and fun it is for a general player. 1 = the headline themes people love (fruits, animals, weather, sports, colours, the planets); 5 = narrow, dry or niche (obscure sub-sub-themes, narrow technical lists).
- **Complete themes (flag `complete`) are rated one step more popular than the same topic would otherwise get** (closed sets like the planets or months are satisfying to sort): months 1, planets 1, a niche complete set 3.
- Use the whole scale across your chunk: about 10% 1, 25% 2, 35% 3, 20% 4, 10% 5. A theme with only a few words, or an awkward vague boundary, is less popular.
- Rate adult and sensitive themes on the same scale (their audience limits are flags, not popularity).

## Output
Your chunk listing: `node tools/gen/pop-make.mjs <n>` (n is given in your task; chunk numbers stay fixed during the run).
Write ONE plain text file `tools/gen/pop/chunk-<n>.txt` (n = your chunk number) with, for every theme in the chunk, in order:
```
T <themeId> <themePopularity>
<entryId> <popularity>
<entryId> <popularity>
...
```
One line per word id shown in the listing, roots AND `~` synonyms (ids are the leading numbers; the number after `|` is not an id). Nothing else in the file: no comments, no blank themes. Every word listed under a theme must appear exactly once under that theme.

## Test it
Work on a scratch copy; never run the apply script on the real library:
```
cp data/wordlist-en.project.json tools/gen/pop/.scratch-<n>.json
node tools/gen/pop-apply.mjs tools/gen/pop/chunk-<n>.txt --lib tools/gen/pop/.scratch-<n>.json
```
It must report 0 problems and 0 words still unrated. Delete the scratch file and its .done.json when done. Do NOT edit the real library, anything under js/, or other agents' files, and do NOT commit.

## Report (under 120 words)
The file path, number of themes and words, the spread you used (counts of 1-5), and any theme where you were unsure.

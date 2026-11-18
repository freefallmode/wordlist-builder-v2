# Category research: what popular category-sorting games use

November 2026. A check of which categories the popular "sort the words into categories" games use, and how many of them this library already has. Like `tools/gen/connections-titles.txt`, this collects **category names only**, never the words inside a category, and only from public pages (fan answer sites, store listings, published party-game lists). It is a source of ideas and a coverage check, not something to copy.

Files:
- `sources.tsv`: 1,756 category names with their game, level (where known) and the page they came from.
- `compare.mjs`: matches them against the library's theme names. Run from the repository root:
  `node tools/gen/category-research/compare.mjs data/wordlist-en.project.json tools/gen/category-research/compared.tsv tools/gen/category-research/sources.tsv`
- `compared.tsv`: the result, one row per distinct category: how many sources use it, verdict (have / close / missing) and the nearest themes. It matches names only, so read it with care: a "missing" can be a theme under another name (Non-Flying Birds is flightless birds).

## Games and sources

The genre's biggest games, by estimated installs (Android installs from the public Play page plus AppGoblin's modelled iOS installs; full table of 47 apps plus one web game, with a link for every number, in `ranking.md`):

| # | Game (developer) | Kind | Launched | Android installs | iOS ratings (US) |
|---|---|---|---|---|---|
| 1 | Solitaire Associations Journey (Hitapps) | cards | 2025-08 | 37.1M | 234K |
| 2 | Connect Word: Association Game (Hitapps) | tiles | 2024-04 | 9.7M | 178K |
| 3 | Associations Word Connections (Hitapps) | tiles | 2022-07 | 11.2M | 40K |
| 4 | Associations - Colorwood Game (Burny) | tiles | 2025-08 | 5.8M | 46K |
| 5 | Bubble Word Jam (Lion Studios Plus) | bubbles | 2025-09 | 2.0M | 65K |
| 6 | Word Solitaire Now! (MAXX / Arrowise) | cards | 2025-12 | 2.5M | 30K |
| 7 | Word Connect Association (PlaySimple) | tiles | 2025-07 | 2.0M | 42K |
| 8 | Associate Words: Solitaire (Astrasen) | cards | 2025-11 | 2.7M | 8K |

Bubble Word Jam is the only bubble game with over a million installs; the other bubble games found have a few hundred ratings. Only Solitaire Associations Journey (number 1) and Bubble Word Jam (number 5, the closest to this game) have their categories published as text, so they are the two main sources below.

| Source | Category names | From |
|---|---|---|
| Bubble Word Jam | 832 (637 distinct) | bubblewordjamanswers.net (fan site): levels 1-50 and about 30 levels between 73 and 128, plus its list of the 30 most repeated categories |
| Solitaire Associations Journey | 322 | hs-gamehub.pages.dev: levels 1-30, 100, 250, 500, 1000 |
| Word Mindsort Solitaire, Word Sort Solitaire (Playcus) | 38 | a levelwalks guide and store listings (weak: examples, not real level labels) |
| Red Herring Express | 45 | touchtapplay walkthrough, levels 1-15 |
| LinkedIn Pinpoint | 166 | daily puzzles 15 May to 17 Nov 2026 (sportsdunia.com) |
| Only Connect | 26 | OCDB fan archive |
| Associations (Hitapps) and other tile games | 25 | store reviews and descriptions (weak) |
| Party category lists | 301 | Scattergories (original lists) and classroom "categories" game lists |

## Findings

**1. The library already covers what the genre plays most.** 177 categories are used by two or more sources (fish, fruits, flowers, weather, drinks, birds, furniture, trees, planets, colors, countries, pets, toys ...). 83 have a theme of the same name here and 76 a close one. Of the other 18, most are here under another name (beverages = drinks, footwear = shoes, professions = jobs, pills = medications, magazine = periodicals, zombies = undead, cactus = cacti and succulents, rainy = rain words, landmass = continents); the clear gap is **biomes** (the habitats group has a theme per habitat but no list of them), and "things that have spots" exists only as spotted animals. Of the 30 categories Bubble Word Jam repeats most, 16 are here under the same name, 10 under a more specific one (Opera = opera words, Chess = chess terms, Pasta = pasta shapes), and 4 are missing as such: Violin, Mint, Origami, Heart (violin and origami are covered by bowed instruments and paper crafts).

**2. The main difference is style, not coverage.** The leading games mostly use one short noun that means "anything to do with X": Heart, Egg, Chess, Circus, Opera, Bicycle, Snow. The most-played game, Solitaire Associations Journey, uses this style for every category (of its 309 sampled names, 87 match a theme here by name, 128 closely, and the 94 others are mostly single-word associations such as Grandma, Tuxedo, Roadwork, 24 hours, or verbs such as Achieve and Navigate). The library mostly names exactly what a theme collects (chess terms, parts of a violin), which is what keeps membership unambiguous (DESIGN.md section 4). Worth knowing when choosing how theme names are shown when a set is complete; not a reason to change the rule. The few library themes in the association style (eggs, circus, desert) are the ones that match the genre most closely, and the genre's other favourite pattern, "Things With X" / "Things That X" / "Shades Of X", is one the library already uses widely.

**3. Real gaps worth considering** (no theme under any name):
- Biomes (desert, tundra, rainforest, savanna, taiga ... as one theme).
- Everyday "things ..." themes, the genre's signature easy sets: fragile things, things you carry, things that grow, things you refill or replace, things you stack, things in a vending machine, spotted things (not only animals).
- More compound themes like the "words after" group: grand___, green___, free___, front___, ground___ (Pinpoint also uses close, door, safety, save, think).
- Brands and media (would be trademark-flagged): shoe brands, clothing brands, shops, web browsers, mobile apps, sitcoms, TV game shows, Harry Potter, Disney films and characters.
- Modern money: cryptocurrency, payment methods.
- Holidays as a list (US holidays, holidays through the year); the library has themes per holiday but not one of the holidays themselves.

**4. Not gaps, just other names:** spiky things = prickly things, floating things = things that float, noisy things = loud things, words after "paper" = paper___, types of clouds = cloud types, sea animals = sea life, professions = jobs, rooms in a house = the rooms group, Greek alphabet = Greek letters, mythological creatures = mythical creatures, zombies and vampires = undead, tornado = storms, something on a pizza = pizza toppings.

## Caveats

- No game publishes how often each category is played. "Popular" here means used by several games, or repeated across a game's levels (designers repeat what works and put crowd-pleasers in early levels).
- The fan sites are unofficial. Bubble Word Jam's site says it merges public answer sources and checked 69 levels against the game; names were tidied to Title Case by that site, so capitals may differ from the game.
- Bubble Word Jam is sampled from about 78 early levels out of its full run; later levels may lean more specialised, as Solitaire Associations Journey's do (by level 1000: Igneous, Plateau, Seams, Scripts).

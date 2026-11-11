# Brief: tag themes whose knowledge belongs to one region or culture

The word library marks words and themes with the countries that know them (`region`: US, UK, CA, IE, AU, NZ, ZA, IN, TR and other country codes). A region tag means **who knows it** (the audience), not what the theme is about. The game uses the tag to hold a theme back from players who are unlikely to know it, so it matters that a theme is tagged when it needs local knowledge, and is NOT tagged when it is general knowledge. Your listing is themes with no tag yet (a theme under a tagged folder is already covered; folders are listed too, because a tag on a folder covers every theme below it).

Listing lines: `<theme id> | <name> | in <parent> | <kind> | <its eight most typical words>`, or `<id> | <name> | in <parent> | folder`.

## Tag a theme when
The typical member is known mainly by people in particular countries, so a general adult player from the US or UK (the typical player of this game) would know clearly less than a local:
- sports teams, leagues, players, venues and competitions that belong to a country (NHL teams: US, CA; AFL clubs: AU; county cricket: UK; Gaelic games: IE);
- a country's foods, drinks, clothes, festivals, holidays, music, TV, newspapers, politicians, currencies, shops and brands (indian sweets: IN; turkish food: TR; Thanksgiving foods: US; Boxing Day: UK and others who keep it);
- cities, regions, rivers and landmarks of a country OTHER than the US or UK, and the lesser-known ones of the US or UK (indian cities: IN; Welsh towns: UK);
- a country's school, law, army, health or political system, slang and dialect.
Use one or more country codes: the countries where the theme is genuinely well known. Several are fine (`UK,IE,AU,NZ,ZA,IN` for cricket). A US-only theme is tagged `US`: UK players know it less.

## Do not tag
- General or world knowledge that is taught and shown everywhere: animals, plants, the body, the planets, world capitals and famous landmarks, major world religions and their festivals, world history topics (Ancient Egypt, the Roman Empire, the Ottoman empire, Mesopotamia), famous artists, scientists, composers and writers known worldwide, global brands and sports (football, tennis, the Olympics, Formula 1).
- Themes about words, spelling, sounds or letters (wordplay), and foreign-language word lists (those have their own flag).
- Mixed themes where only a few members are local. If you are unsure, leave it untagged: the word ratings carry the difficulty.
- Folders: tag a folder only when EVERYTHING below it is tied to those countries (a folder named "indian culture"). Otherwise tag the individual themes.

## Output
ONE file `tools/gen/regtag/r-<n>.txt` (n is given in your task). One line per theme to tag: `<theme id> <CODE,CODE>`. Codes are upper case, comma separated, no spaces. Nothing else in the file: no comments. Read the whole listing; do not stop early. If nothing needs a tag, write an empty file.

Do NOT edit the library, anything under js/ or other agents' files, and do NOT commit.

## Report (under 40 words)
File path, how many themes you tagged, and the countries you used most.

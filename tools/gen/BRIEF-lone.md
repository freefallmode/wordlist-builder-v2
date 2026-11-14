# Lone capitals in lowercase themes

Each line of `tools/gen/lone/list-N.txt`: `entryId <TAB> themeId <TAB> theme name <TAB> shown text <TAB> (entry: text if different) <TAB> gloss <TAB> type`.
In this theme at least 80% of the members are lowercase words, but this member is shown with a capital (a single word). In the game all
words are lowercase while playing, and the capital only reappears on the finished theme, so a capital must be right for the word's sense there.

Decide per line:
- `L` lowercase it: in this theme the word is a common noun, adjective, title, rank, material, colour, gem, tree, flower, unit or similar
  (`acre` in imperial units, `amethyst` in gemstones, `aurora` in sky phenomena, `sergeant` in military ranks, `blossom` in flower parts,
  `rosewood` in types of wood, `lunar` in new year).
- `K` keep: it is a proper noun in this sense (a person, place, nationality, brand, deity, planet or other named thing: `Earth`, `Greyhound`,
  `Sirius`, `Zeus`), or an initialism/acronym, or the theme is really about names.
When unsure choose K. Write `tools/gen/lone/r-N.txt`: `entryId <TAB> themeId <TAB> L|K`, one line per input line. Edit no other file.

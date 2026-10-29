# Wordlist Builder v2: design notes

## Purpose

Builds one language's library of themes and words for a game where each level shows sets of four words from 8 to 12 themes, gradually, and the player sorts them into their themes. The game needs thousands of levels across five difficulty modes (easy to ultra-hard, 1000 to 2000 levels each), so the library needs many themes, many words per theme, and honest difficulty data. The old app (`../wordlist-builder`) is a reference only; its words are not reused because they were over-inclusive and obscure words were rated too easy.

## Model

**Theme tree.** One parent per theme. Groups (`name:` in the outline) are folders, never played. Themes can have sub-themes. Flags: enabled, difficulty 1-5 (0 = unrated), complete (finite fixed set), adult, sensitive, trademark, language-specific (depends on English spelling, sound or slang), audience regions (`region`, e.g. US, UK: who knows it), kind (`place`, `property`, `wordplay`, or plain), `geo` (part of the world the theme is about, not who knows it), a note. Adult, sensitive, trademark, language-specific, disabled pass down to sub-themes; regions are unioned.

**Membership is explicit.** A word is in a theme only if it is linked to that theme. A theme never pulls in its sub-themes' words, because a sub-theme's rating (kumquat in "citrus") says how typical it is of that sub-theme, not of the parent ("fruits"). The tree is for navigation, flag inheritance and telling the generator which themes are related. If a word should be available in both, link it to both; each link has its own rating.

**Entry** (one meaning of one written form). Two meanings of "bat" are two entries; "Apple" the company and "apple" the fruit are two entries; identity is the id, not the text, and a short "meaning/context" label (stored as `gloss`) tells same-text entries apart (required once the text is shared). Text keeps its capitals (Paris, NASA, iPhone) and accents. Everything that depends on meaning is on the entry: part of speech (`noun verb adjective adverb other`), `type` (`common person place org title proper acronym phrase`), enabled, `rec` (recognisability of the word itself), adult, sensitive, trademark, vulgar, regions, status (`new` by hand, `gen` generated unreviewed, `rev` reviewed), note. The link to a theme (`th: {themeId: rating}`) carries only the in-theme rating.

**Aliases.** `aliasOf` (id of the root), `aliasKind` (`synonym` couch/sofa/settee, `spelling` color/colour) and the entry's own `region` (so a regional synonym is a synonym with region UK). An alias takes its themes from its root, and has its own flags and ratings. Its rating in a theme is its own override (`th[theme]`) else the harder of its root's rating there and its own `rec`. Aliases add variety in difficulty (settee is harder than couch) but never add words to one level: the game must not show two entries of one alias group together. A theme's minimum of 4 words counts distinct roots, not aliases.

**Ratings** 1 to 5 everywhere: 1 every child knows it, 2 nearly every adult, 3 many adults, 4 interest/job/region, 5 few people. 0 = unrated. Stored: word recognisability (`rec`), in-theme recognisability (`th`), theme difficulty (`d`). Everything else that makes a level hard (closeness of themes, completeness, length, number of themes) is computed by the generator. Zipf frequency is only a cross-check (validation flags easy ratings on rare words) and an optional export column.

## Files

**Theme outline** (`data/themes.txt`): two spaces per level; `name:` is a group; tags `[place] [property] [wordplay] [complete] [adult] [sensitive] [trademark] [lang] [off] [d:3] [region:US,UK] [geo:Asia]`; ` -- note` at the end. For complete sets the note lists the exact members.

**Project file** (`wordlist-en.project.json`): `{"project":{schema, lang, lib, nextId, settings},"themes":[...],"entries":[...]}` with one JSON record per line; entry fields equal to their default are left out. `lib.version` and `lib.modified` are bumped each time the file is saved with changes.

**Library export** (Export…): filters per flag (adult, sensitive, trademark, vulgar, language-specific: include / leave out / only; region-specific: everything / leave out / only, optionally for listed regions; synonyms and spelling variants on or off; rating range; unrated on or off; minimum words per theme). Filters apply per link (entry in theme): a link is flagged when the entry or its theme or an ancestor is. Entries with no link left are dropped, then themes under the minimum, repeated until stable; the report lists dropped themes. If an alias's root is filtered out, the first surviving alias becomes the root. Output is columnar JSON:

```
{ v, lang, lib, generated, options, regions[], posNames[], typeNames[], kindNames[], themeBits, entryBits,
  themeFields: [id, name, parent, flags, difficulty, regions, kind, geo (+ note)], themes: [rows],
  entries: { text[], pos[], type[], flags[], rec[], regions[], root[], linkCount[], links[] (+ zipf[], gloss[], note[]) } }
```
Entry i is `text[i]` etc.; its themes are the next `linkCount[i]` pairs `(themeIndex, rating)` in `links`. `root[i]` is 0 for a root, else index+1 of the root it is an alias of. Theme `flags` bits: adult 1, sensitive 2, trademark 4, language 8, complete 16, group 32 (also set for ancestors kept only to keep the tree). Entry `flags` bits: adult 1, sensitive 2, trademark 4, vulgar 8, spelling alias 16. `regions` is a bit mask over `regions[]`. Balloon text (accents folded) is not stored; derive it.

## Claude

Called from the browser with the user's key (Settings; session only unless remembered). Structured outputs; models Opus 5.5 (default), Sonnet 5.5, Haiku 4.5. "Generate with Claude…" asks for words with all entry fields plus aliases, shows a preview, and adds the selected ones with status `gen`. Existing entries (same text and gloss) are only linked. "Rate themes…" rates unrated themes under the selected one. The prompt (`GAME` in `js/ai.js`) defines the scales and says complete themes must list every member exactly.

## Not built yet

- Theme check: ask Claude which other themes each word could also fit (the old app's clashes and links), and show confusable theme pairs.
- Rating review pass (second opinion on `rec`), bulk review of `gen` entries, merge entries.
- Per-group project files; undo.
- Other languages: a library per language with shared theme ids; the `lang` flag marks themes that will not translate.

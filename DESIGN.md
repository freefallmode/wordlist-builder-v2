# Wordlist Builder v2: design record

This is the specification of the app and the reasons behind it. It should be enough to rebuild the app from scratch: what it is for, the data model, every rule that is not obvious, the file formats, the screens, and how the data is meant to be produced. Where a decision replaced an earlier idea, the reason is given so it is not reopened by accident.

Contents: 1 Purpose · 2 Decisions and reasons · 3 Data model · 4 Theme tree · 5 Rating scales and flag meanings · 6 Validation · 7 Storage and file formats · 8 Library export · 9 Claude generation · 10 Screens and behaviour · 11 Project layout and how to run it · 12 How the data is produced · 13 Not built yet

---

## 1. Purpose

A browser tool that builds one language's library of **themes** and **words** for a sorting game. A level shows sets of four words from 8 to 12 themes, revealed gradually; the player sorts each word into its theme, and a theme's name is shown when it is complete. The game needs thousands of levels across five difficulty modes (easy to ultra-hard, about 1,000 to 2,000 levels each). Levels may ship as fixed data now and may later be generated at run time, so the library has to be rich and its difficulty data honest:

- many themes, from broad (fruits) through focused (citrus fruits) to **complete sets** (planets, months with 30 days), where the listed words must be exactly the members;
- at least 4 distinct words per playable theme;
- every word and theme carries the flags and ratings the level generator filters and balances on.

The old app (`../wordlist-builder`) is a reference only. Its words were over-inclusive and obscure words were rated too easy, so none of its words are reused. Its theme tree was reused as a skeleton (section 4).

## 2. Decisions and reasons

| Decision | Reason |
|---|---|
| **Separate entries per meaning.** "bat" (animal), "bat" (sports) and "Apple"/"apple" are different entries. | Flags and ratings depend on meaning (ass: donkey vs. vulgar; Mercury: planet vs. element). One entry with per-theme overrides would need every flag duplicated per theme. |
| **A short "meaning/context" label (`gloss`) tells same-text entries apart**, required once text is shared. | Without it two entries named "bat" cannot be told apart in lists, pickers and exports. Identity is the numeric id, never the text. |
| **Theme membership is explicit.** A word is in a theme only if linked to it; a theme never pulls in its sub-themes' words. | A sub-theme rating (kumquat in "citrus fruits": hard) says how typical the word is of that sub-theme, not of "fruits". Inheriting would give ratings that are not valid in the parent. If a word should be in both, link it to both; each link has its own rating. Optional per-branch roll-up can be added later. |
| **The tree is for navigation, flag inheritance and telling the generator which themes are related.** | See above. |
| **Aliases** (`aliasOf` + `aliasKind` + the entry's own `region`) instead of a special US/UK pair type. | One mechanism covers sidewalk/pavement and color/colour. Six kinds, see section 3. |
| **Aliases add variety, not words to a level.** An alias takes its themes from its root; the game must never show two entries of one alias group in the same level; a theme's 4-word minimum counts distinct roots. | Aliases give extra difficulty steps (settee is harder than couch) and extra surface forms, but must not make a thin theme look big. |
| **Synonyms are theme-local, not global aliases.** A theme lists its synonym groups; one member per group per level; a cross-theme `clash` id in the export stops synonyms of different themes meeting in a level. | Whether two words mean the same depends on the theme (pudding and dessert). A global alias cannot be right everywhere and had already been misused (castle as an alias of rook). See DESIGN-entries.md. |
| **A form alias is a grammatical form only; a shorter text in one theme is `show`, not an alias.** | rock garden is not a form of rock and rock does not mean rock garden elsewhere; it is only the natural answer to "what type of garden?" in one theme. |
| **Ratings are 1-5** (0 = not rated), everywhere. | Five levels map onto the five difficulty modes and are what a person can rate consistently. 1-10 gave false precision. |
| **Four stored ratings:** word recognisability (`fam`), typicality of a word inside a theme (`typ[themeId]`), popularity of a theme (`pop`) and identifiability of a theme (`ident`, how easily a player works out the theme from its members). Theme difficulty is never stored: it is computed from `ident` and `pop` (`themeDifficulty`) and exported, and the words in a theme are profiled by `themeProfile`. Everything else that makes a level hard (closeness of themes, completeness, length, number of themes) is computed by the generator. | Keeps stored data to what only a human or Claude can judge. The game picks words and themes by difficulty and popularity that match its progression. Zipf frequency is only a cross-check (validation) and an optional export column. |
| **Part of speech and kind of word are separate fields:** `pos` (noun, verb, adjective, adverb, other) and `type` (common, person, place, org, title, proper, acronym, phrase). | "Paris" is a noun and a place; one field cannot hold both. `type` also drives case checks. |
| **Text is stored with its proper case** (Paris, NASA, iPhone) and accents. The game derives upper-case and accent-folded balloon text. | Case carries meaning and lets validation catch mistakes. Smaller than storing both forms. |
| **Words and flags are regenerated, not copied from the old library.** | The old data was suspect (section 1). |
| **Regionality on both words and themes** (`region[]`: US, CA, UK, IE, AU, NZ, ZA, IN, TR). | A word or theme known mainly in some countries (satsuma, UK nations, US states) should be filterable. Region means *who knows it* (audience), not *what it is about*. |
| **Theme flags:** enabled, complete, adult, sensitive, trademark/copyright, language-specific, foreign-language, regions. Adult, sensitive, trademark, language-specific and disabled **pass down** to sub-themes; regions are unioned. | A parent decision (all of "drugs" is adult) should not have to be repeated on every child. |
| **Export filtering is per link (entry in theme), not per entry.** | A flag can come from the entry or from the theme it sits in; the same word can be fine in one theme and flagged in another. |
| **The project file has one record per line.** | Diffs and merges in git stay readable. |
| **Claude generation lives in the app (browser, the user's key), and the data is also produced by Claude in working sessions** (section 12). | In-app generation is for ongoing top-ups; both paths must set every flag. |
| **Removed: theme "part of the world" (`geo`).** | Not asked for; it duplicated what theme names say. Old `[geo:X]` tags are ignored when read. |
| **Theme kind (`tkind`) and `rule` are back, as optional fields.** `tkind` is category (the default, not stored), place, property, wordplay or compound; `rule` says how the game tests a word of a wordplay or compound theme (`rhyme:ake`, `palindrome`, `compound-end:bag`, `hidden:@birds`). Both are edited in the theme dialog, never in the outline text (the outline keeps them on re-import), and exported as `kind` and `rule`. | The first design dropped kind as redundant; the game needs it to test wordplay and compound themes. Old `[wordplay]` tags still map to the language-specific flag. |
| **Language is a library setting**, not an app setting. Default English; en, pt, de, es, fr, jp. A library per language with shared theme ids is the plan. | The word data, the frequency check and the generation prompt are per language. |
| **Model choice and API key are app settings** (browser storage, not in the library file). | They belong to the user, not the library, and must not end up in a shared project file. |

## 3. Data model

Pure functions over a plain project object (`js/model.js`), so the core can be tested in Node.

**Project:** `{ schema: 1, lang, lib: { version, modified }, nextId, settings: { minWords: 4, maxWords: 4, maxLen: 20 }, themes[], entries[] }`.

**Theme:** `{ id, name, parent, group, enabled, pop, ident, complete, adult, sensitive, tm, lang, foreign, region[], note, groups?, tkind?, rule?, locked?, nameOk? }`.
- `id`: stable slug (`citrus_fruits`). A leading or trailing `___` in a name becomes "blank" so `___ball` and `ball` get different ids. Duplicate ids get `_2`, `_3`.
- `group`: a folder, never played, holds no words (validation warns if it does).
- `pop`: theme popularity 1-5 (1 most popular and appealing), 0 = unrated. `ident`: identifiability 1-5 (1 obvious ... 5 obscure), 0 = unrated. Difficulty is not stored (an old `d` field was dropped): it is worked out from `ident` and `pop`.
- `foreign`: the words are mostly not English (inherits down the tree). `tkind`, `rule`: see section 2. `locked`: true or false forces or forbids word substitution (regional, spelling or alias words standing in for the linked one); absent, it follows the kind (wordplay, compound) and the language-specific flag. `nameOk`: the theme's words may appear in its members' text (wordplay themes), so the theme-name check skips it.
- `groups` (optional): synonym groups, a list of lists of entry ids of this theme. Words in one group stand for one another *in this theme*: only one of them may appear in a level. A word is in at most one group per theme; members must be roots linked to the theme. See DESIGN-entries.md.
- `note`: shown to the generator and to people. **For complete sets it lists the exact members.**
- The order of the `themes` array is the depth-first outline order (the tree order). Moving a theme moves its whole sub-tree.

**Entry:** `{ id, text, gloss, pos, type, enabled, fam, adult, sensitive, tm, vulgar, region[], aliasOf, aliasKind, typ{ themeId: typicality }, status, note, nameOkIn[], use{}, show{} }`.
- One meaning of one written form. Everything that depends on meaning is here; the only thing that differs between themes is the typicality in `typ`.
- `status`: `new` (added by hand), `gen` (generated, not reviewed), `rev` (reviewed).
- `nameOkIn`: themes where the full text may contain a word of the theme's name (dried apple in dried fruits); the theme-name check skips it there. The check also lets through a single word that is the thing the theme collects (the last word of the name, or of each part of "A and B"): `pants` in pants and shorts, `bug` in garden bugs; not `police` in police words, and not longer text such as tomato soup.
- `use` `{ themeId: id of one of its form aliases }`: that theme shows the form (rainy) instead of the entry (rain). `show` `{ themeId: text }`: that theme shows a shorter text (rock for rock garden). Both are theme-local display choices: the entry keeps its identity, ratings and links. Neither is an alias.
- `vulgar` (crude or offensive wording) is an entry flag only; themes have no vulgar flag. Entries have no language-specific flag; that flag is for themes.

**Aliases.** `aliasOf` is the id of the root; an alias is never the root of another alias (chains are an error). An alias takes its themes from its root and has its own flags, ratings, `region` and `aliasKind`: `spelling` (colour/color), `form` (the same word in another grammatical form: an inflection or derivation such as skis for ski or rainy for rain; a compound or a longer name is NOT a form), `regional` (bonnet for hood: the same thing under another regional name, tagged with its `region`), `abbreviation` (PC for personal computer), `translation` (Danmark for Denmark, Gaeilge for Irish: the same thing named in another language) or `synonym` (a strict synonym only, always the same answer as its root; near matches are separate entries in a theme synonym group, DESIGN-entries.md). Spellings and forms never have their own link rating (`typ`), they take the root's; the other four kinds may hold links of their own (96 aliases do), at most one family member per theme (`family-twice`). Its difficulty in a theme is the harder of its typicality there (own `typ`, else its root's) and its own `fam`. Deleting a root promotes an alias to root: the first spelling alias, else the first that is not a form, else the first. It takes the root's links and synonym groups, adult, sensitive and (if it has none) region; if it is the same word (spelling, form) it also takes trademark, vulgar, name allowances and the forms the themes used, otherwise the old root's spellings and abbreviations become its synonyms. Deleting or unlinking also removes the entry's shown text, `use` and group places for that theme, and a theme named by another theme's wordplay rule cannot be deleted. In the entry editor, "This is an alias of" and "Aliases of this entry" are a single block in a single place, both shown as tappable links that open the other entry.

**Indexes** (`P.ix`, built by `reindex`): theme by id, children by parent, entry by id, aliases by root, entries by theme (an alias appears under its root's themes), entries by lower-cased text; every list in `P.entries` order. An edit updates them with `updateIndex(P, touch)`, where touch names the entries whose text, root or links changed (their aliases follow), the deleted ones and whether themes changed: only those are re-filed (`reindexEntries`, `reindexThemes`; `deleteEntry` and `deleteTheme` return their touch). Without a touch, with duplicate ids or with a new entry that is not at the end of `P.entries`, it rebuilds everything. A test checks that a series of edits leaves the same indexes as a full rebuild.

**Theme statistics** (`themeStats`): entries, distinct roots, counts by rating band. A theme is "ready" when its distinct roots reach `settings.minWords`.

**Effective flags** (`eff(P, id)`): walks up the tree; adult, sensitive, tm, lang and disabled inherit, regions are unioned.

## 4. Theme tree

A logical category tree: 14 top-level groups (Food & Drink, Animals, Nature & Earth, Places & Geography, Travel & Transport, Body & Health, People & Society, Home & Everyday, Sports & Games, Arts & Entertainment, History & Myth, Science & Tech, and so on), then groups and playable themes below. The starter tree (`data/themes.txt`) has about 2,600 themes: 118 groups, about 2,480 playable, 134 complete sets. The working library has grown to 3,317 themes (118 groups, 131 complete sets, each with a note) at v374.

It was produced from the old library's groups as a skeleton and reworked (`tools/convert-tree.mjs`, kept as a record; `themes.txt` is now maintained by hand or in the app): `[separate]` dropped (membership is explicit now), `[english-only]` became `[lang]`, region padding and duplicates removed, a few themes renamed (for example "houses and homes" became "buildings to live in"), `[sensitive]` stripped where it did not fit, and about 130 new themes added, including many more complete sets whose notes list the exact members.

**Outline text format** (import, export, starter file): two spaces per level; `name:` marks a group; tags in square brackets after the name; ` -- note` at the end.

```
Food & Drink:
  fruits
    citrus fruits
  months with 30 days [complete] -- April, June, September, November
  rude words [adult] [lang]
  national dishes [region:UK,US] [pop:3] [ident:2]
  dairy [id:dairy_and_eggs]
```

Tags: `[complete] [adult] [sensitive] [trademark] [lang] [foreign] [off] [pop:3] [ident:2] [region:US,UK] [id:dairy_and_eggs]`. `[pop:n]` is the theme popularity and `[ident:n]` the identifiability, both 1 to 5 and unrated when absent. `[id:...]` gives the theme's id and is written only when the id is not the slug of the name: ids stay when a theme is renamed, and without the tag a renamed theme would be read as a new one. Retired tags `[geo:..] [place] [property] [d:n]` are ignored and `[wordplay]` means `[lang]`, so old files still load.

**Import theme outline** matches themes by id. A new id is added; on an existing theme only the fields the outline carries are written, and only where they differ, so kind, rule, locked, the name-words flag and synonym groups are left alone. Exporting the outline and importing it again changes nothing (a test checks this on the working library). A line sets every field the format carries: a hand-written line with no tags resets that theme to enabled, unrated popularity and identifiability, no flags and no regions, and a line without ` -- ` clears the note, because the format cannot tell "not mentioned" from "cleared".

**What makes a good theme set.** A mixture of general themes (fruits), focused ones (citrus fruits) and complete sets. A word must belong to its theme unambiguously: a thoughtful player must not be able to argue it fits a different, ordinary theme better.

## 5. Rating scales and flag meanings

**Word recognisability `fam`:** 1 every child knows it (apple, dog) · 2 nearly every adult (plum, otter) · 3 many adults but not all (quince, ocelot) · 4 people with the interest, job or region (kumquat, quokka) · 5 few people (pulasan, a rare specialist term). Rate by what a typical adult actually knows, not how common the thing is in the world.

**Word popularity in a theme, `typ[themeId]`:** how typical and central the word is of that theme, i.e. how readily it comes to mind when someone names things in the theme: 1 the first words anyone names (weather: rain, sun, snow) · 2 typical · 3 ordinary member · 4 less typical or specialist · 5 real member but peripheral (a famous word that only just fits, e.g. tomato in fruits, or a very obscure member). It is not recognisability and not whether the word belongs. **Difficulty of a word in a theme** (`difficultyBand` for counting and filtering; the export sends `wordDifficulty`, a 0.7/0.3 blend of the two) is the harder of `fam` and the typicality: a word few people know is hard however typical it is, and a famous word that is a stretch for the theme is hard too.

**Theme popularity `pop`:** how good a pick the theme is for a level: 1 the headline themes people love (fruits, weather, the planets) · 3 ordinary · 5 narrow, dry or niche. Complete sets rate one step more popular (closed sets are satisfying to sort). **Theme difficulty** is worked out, not rated: `themeProfile` counts the distinct roots at each difficulty 1 to 5, takes the median, and gives the range in which the theme can fill a 4-word set (its 4th easiest and 4th hardest root). A theme with only 3 easy words and 40 obscure ones cannot serve an easy level however its average looks, so the game should choose themes by their counts at the level's target difficulty, not by one number.

**Flag meanings** (`FLAG_HELP` in `js/model.js`, used by the editors and the generation prompt so the wording stays identical):
- **Trademark / copyright:** brands, titles, characters, and so on.
- **Adult:** drugs, sexual content, violence, and so on.
- **Sensitive:** religion, politics, death, and so on. The game can keep these out of early or easy levels.
- **Language-specific:** depends on the library language's spelling, sound or slang, so it will not translate: rhymes, puns, slang, acronyms, anagrams, spoonerisms, wordplay, and so on.
- **Vulgar** (entries only): crude or offensive wording in this meaning.
- **Region:** who mainly knows it.

## 6. Validation (Checks screen)

Each issue has a severity (error breaks the model, warn is probably a mistake, info is work to do), a kind and a link to the theme or entry. The Checks screen filters by severity and kind.

- **Themes:** group with words linked (warn `group-words`); empty theme (info `empty`); thin theme under the minimum (`thin`: error if complete, warn otherwise); complete theme with no note (info `complete-note`); theme with words but **no theme popularity** (warn `theme-unrated`); count of empty unrated themes (info); a `rule` naming (`starts:@id`, `ends:@id`, `hidden:@id`) a theme that does not exist (error `rule-theme`); a member whose text contains a word of the theme name, which gives the theme away (warn `theme-name`; skipped for entries in `nameOkIn`, for themes with `nameOk`, and for a single word that is the thing the theme collects).
- **Entries:** empty text (error); leading or trailing spaces (warn); a `type` or `pos` outside the lists (errors `bad-type`, `bad-pos`); duplicate text+gloss (error); same text with no gloss (error); same text, same part of speech, sharing a theme (warn: one entry or two meanings?); too many words or letters per the library settings (warn `long`; no type is exempt); a name typed `phrase` (warn `type`); acronym not in capitals, or a person/place/org/title/proper name with no capital (warn `case`); common word starting with a capital (info `case`); not linked to any theme (info `orphan`); linked to a missing theme (error) or to a group (warn); entry text equal to the name of its theme (warn); a link rating outside 0-5 (error `bad-rating`); no familiarity (info `unrated`).
- **Aliases:** root missing, alias chain, alias of itself (errors); same text as its root, no kind, unknown kind (warn); regional alias with no region (info); a spelling or form alias with links of its own (warn `alias-link-kind`); a `form` alias that is a longer name containing its root (info `alias-fullname`: make it an entry with a shown text); a US-tagged spelling alias whose root is not US and has no UK spelling (warn `alias-us-root`: the US spelling should be the root); two members of one alias family linked in one theme (warn `family-twice`). A spelling alias needs a region only when it is a US/UK difference (colour/color), not for variants such as accents, hyphens or transliterations.
- **Foreign flag:** a theme named like a list of words in another language (`numbers in german`, `swahili words`, `colors in turkish`) that is not flagged foreign (warn `foreign-flag`). Loanword themes (`french phrases in english`) and names that only mention a country (`french cities`, `chinese food`) are exempt; themes such as `hello around the world` have no language in the name and need the flag set by hand.
- **Groups, show and use:** a group with fewer than two members, or a member that is not a word of its theme (warn); a `use` form that is not a form of the entry, or a `use`/`show` for a theme the entry is not in (warn); two words that read the same in one theme (info `same-display`: allowed in the library, the export keeps the more popular, section 8); one word inside another in the same theme (info `overlap`: cola and Coca-Cola, pasta and pasta sauce; not when the two are in one synonym group).
- **Case lint** (`js/caselint.js`, warnings of kind `case-<kind>`): a word is shown the way it is written for its sense in the theme. Eleven kinds: `cap-common`, `lower-proper`, `style-capital`, `sense-proper`, `sense-common`, `common-in-names`, `case-split`, `case-shown-wordplay`, `case-shown-alias`, `bare-stub` (per link) and `lower-proper-word` (per entry). A link whose capital is intended is listed in the allow-list `js/caselint-allow.js` (`CASE_OK`, keys `entryId|themeId`). The rule and each kind: DESIGN-entries.md, "Capital rule and lint".
- **Rating vs. frequency** (English libraries only): a rating of 1-2 on a common word that is rare in text (Zipf below 2.3 warn, below 3.0 info) or absent from the list (warn); a rating of 4-5 on a very common word (Zipf above 5, info). Thresholds are loose because frequency in text undersells concrete everyday nouns (igloo, tuba, feta).

## 7. Storage and file formats

**Autosave** goes to the browser (IndexedDB, database `wordlist-builder-v2`, key `project`), debounced, with a status line ("Unsaved to file · autosaved 18:42"). Whether the browser copy differs from the last project file is stored with it (key `dirty`, written in the same transaction), so "Unsaved to file" survives a reload; a copy stored before that key existed counts as unsaved. **File ▾ → Save project file** downloads the project JSON and **bumps `lib.version` and `lib.modified`** (the library's own change counter); it does nothing if nothing changed. **Open project file** loads one. Other File items: Import theme outline, Export theme outline, Reset to the starter theme tree.

**Starter library.** `data/wordlist-en.project.json` is the library shipped with the app. On start: if the browser holds no library (or one with no themes) the starter is loaded and autosaved; if it holds one and the starter has the same language and a higher `lib.version`, the app asks once whether to open it (replacing the browser copy, with a reminder to save a file first); Cancel remembers that version in localStorage (`wlb2-starter-declined`) so it is not asked again. If the starter file is missing it falls back to the empty outline `data/themes.txt`. Nothing else ever replaces the browser library without the user choosing Open project file or Reset.

**A browser copy that cannot be read** (storage fails to open, or the stored text does not parse) is never treated as "no library". The starter is shown, autosave is switched off so the stored copy stays as it is, and a dialog says what happened and offers: download the stored text (when it could be read), keep autosave off, open a project file, or go on with the starter (asks again, then replaces the stored copy). The status line says autosave is off and reopens the dialog when clicked. Autosave comes back only through the last two choices.

**Project file** (`wordlist-en.project.json`): `{"project":{schema, lang, lib, nextId, settings},"themes":[...],"entries":[...]}` with one JSON record per line; entry fields equal to their default are left out; retired theme fields (`geo`, `kind`) are dropped on read and write.

**App settings in browser local storage:** `wlb2-key` (API key, only if "remember" is ticked), `wlb2-model`, `wlb2-unlock` (tree dragging unlocked).

**Frequency data** (`data/freq-en.txt`): English word frequencies as Zipf x 10 from [wordfreq](https://github.com/rspeer/wordfreq) by Robyn Speer, CC BY-SA 4.0. Loaded asynchronously; used only for validation and the optional export column, and only when the library language is English.

## 8. Library export (Export…)

The export is the only thing the Word Safari game reads from this project (the file `data/export/wordlist-game-family.json`). This section is its specification; the code is `buildExport` in `js/export.js`, and `tools/export-game.mjs` runs it from the command line. Checked against the code and the committed file at library v374 (2026-11-15).

### 8.1 Two ways to run it

- **Export… in the app**: presets "full" (the default), "family", "family, no trademarks", plus any saved with the project (`settings.exportPresets`). Preview shows entries and themes out of those in, the size and a gzip estimate, and how many themes were dropped as too small. It loads `data/breaks-en.txt` like the command line does (`loadBreaks`, retried on each Preview or Download); if that fails the dialog says the file has no break points and the export still works. Download saves `exportName(P, preset, true)` = `wordlist-game-<preset>-v<lib.version>.json` (preset slug, e.g. `family-no-trademarks`). The info panel also shows the report notes and the case lint count (`lintLine`, shared with the command line). Under the counts, collapsed lists name the dropped themes (`droppedThin`) and the same-text drops (`sameText`, `text in theme (kept X, left out Y)`), shown only when not empty and cut to 200 lines (`reportLists`, `capLines` in js/export.js); the command line prints the same lists, 20 lines each.
- **`node tools/export-game.mjs [preset] [out] [--strict]`** (any directory): reads `data/wordlist-en.project.json`, `data/freq-en.txt` and `data/breaks-en.txt` (missing: a warning, and every `breaks` list is empty); preset default `family`, always with `zipf: true`; `out` default is `data/export/` plus `exportName` (the committed `wordlist-game-family.json` for the default preset; an explicit `out` is relative to the current directory). It prints the size, library version, theme and entry counts and the report notes, then runs the case lint over the **whole library** (not the export) and prints its count. `--strict` exits 1 when the lint finds anything, **before anything is written** (the summary and notes are still printed, so a failing run never overwrites an existing export). An unknown flag or preset exits 2 without writing.

### 8.2 Options (`options`, echoed into the file)

| key | default | meaning |
|---|---|---|
| `adult`, `sensitive`, `tm` | `include` | `include` or `exclude` (`only` still works in code, the screen does not offer it). Judged per link: flagged when the entry or the theme (with inheritance) has the flag. |
| `vulgar` | `include` | entry flag only. |
| `lang` | `include` | the theme's language-specific flag (inherited) only. |
| `region` | `{mode:'all', codes:[9 codes], v:2}` | `mode` `all` keeps everything; `exclude` drops themes whose inherited regions, and entries whose **root's** regions, meet `codes` (an alias follows its root; its own tag is ignored here but still written). Presets without `v: 2` used `[]` for every region and are converted on read. |
| `synonyms` | true | keep aliases of kind synonym, regional, abbreviation, translation. |
| `spellings` | true | keep aliases of kind spelling and form. |
| `recMin`, `recMax`, `unrated` | 1, 5, true | range on the whole-number band of the link (the harder of familiarity, typicality and the `use` form's familiarity); band 0 is kept only when `unrated`. |
| `minWords` | 4 | a theme with fewer distinct roots among its kept links is dropped. |
| `maxEntryWords` | 0 | entries with more whitespace-separated words are dropped; 0 = no limit. |
| `zipf`, `gloss`, `notes` | false | optional columns (below). |

Presets: `family` = adult and vulgar `exclude`; `family, no trademarks` adds `tm: exclude`.

### 8.3 Process

1. Candidates are enabled entries. A link (entry in theme) is kept when the theme is not a group, is enabled with its ancestors, passes `lang` and `region`, and the entry and link pass the rest of 8.2. An alias's themes are its root's plus any of its own (`linkIds`).
2. **Same text in one theme**: links are grouped by theme and lowercased displayed text (shown text, else the entry text; an alias's inherited links are not counted). Of two or more, the one with the lower typicality number wins (unrated counts as 9), then lower familiarity, then lower id; the others leave that theme, and when a root leaves, its aliases leave with it.
3. **Thin themes**: themes under `minWords` distinct roots are dropped, and entries left with no link; repeated (at most 6 passes) until nothing changes.
4. Written themes are the themes with a kept link plus all their ancestors. If an alias's root did not survive, the first surviving alias of it (in entry order) is written as the root and the other aliases point to it.

### 8.4 File layout

One JSON object, no whitespace. Top-level keys in this order:

| key | type | content |
|---|---|---|
| `v` | number | format version, 3. |
| `lang` | string | library language (`en`). |
| `lib` | `{version, modified}` | library change counter and its time, local `YYYY-MM-DD HH:MM`. |
| `generated` | string | export time, ISO 8601 UTC. |
| `dialect` | string | the library's default dialect (`settings.dialect`, else `US` for English): the variant the app shows for a word that has a regional or spelling alternative. |
| `options` | object | the options used, 8.2. |
| `regions` | string[] | region codes used by any written theme or entry: `UK`, `US`, then the rest alphabetically. |
| `regionBits` | number | 30: `regions[i]` is bit i of the low mask for i < 30, else bit i-30 of the high mask. |
| `kindNames` | string[] | `category, place, property, wordplay, compound`. |
| `posNames` | string[] | `noun, verb, adjective, adverb, other`. |
| `typeNames` | string[] | `common, person, place, org, title, proper, acronym, phrase`. |
| `themeBits`, `entryBits` | object | the bit values below, name to number. |
| `themeFields` | string[] | names of the theme row positions. |
| `themes` | array[] | one row per theme. |
| `entries` | object | columns, one value per entry. |
| `shown` | array[] | display texts, `[text, pos, breaks]`. |
| `nameWordLinks` | number[] | link numbers. |
| `nameThemeLinks` | `[number, number][]` | link number, theme index. |
| `shownUK` | `[number, number][]` | link number, index+1 into `shown`. |
| `linkFields` | string[] | `theme, difficulty, typicality, shown`. |

A **link number** n is the n-th link in file order: `entries.links[4n .. 4n+3]`. Read positions by name from `themeFields` and `linkFields`: positions have moved within version 3 (8.6).

**Themes**, in library order, filtered (every parent comes before its children in the committed file; the export does not sort). Row = `themeFields`:

| # | field | type | content |
|---|---|---|---|
| 0 | `id` | string | the theme's id (a slug, stable across versions). |
| 1 | `name` | string | display name. |
| 2 | `parent` | number | index of the parent row, -1 at the top. |
| 3 | `flags` | number | theme bits: adult 1, sensitive 2, trademark 4, lang 8, complete 16, group 32, locked 64, foreign 128. Adult, sensitive, trademark, lang and foreign are inherited down the tree; complete is the theme's own; locked is the theme's own setting, else on for wordplay and compound themes and language-specific ones (show exactly the linked word, no regional, spelling or family substitute); group is set on group themes and on ancestors written only to hold the tree, which have no links. Foreign: the words are mostly not English (numbers, days, greetings in another language; Swahili or Maori words), not English words of foreign origin. |
| 4 | `regions` | number | low region mask, inherited (union up the tree). |
| 5 | `popularity` | number | theme popularity 1 (most) to 5, 0 unrated. |
| 6 | `counts` | number[5] | words at band 1..5 (root and band pairs, unrated counted as 5), from **every enabled word** of the theme, not only those that passed the filters; zeros for a group. |
| 7 | `range` | number[2] | band of the 4th easiest and the 4th hardest root (same basis as counts); `[0,0]` under 4 roots or for a group. With fewer than 7 roots the first can exceed the second. |
| 8 | `regionsHi` | number | high region mask. |
| 9 | `kind` | number | index into `kindNames` (missing kind = 0, category). |
| 10 | `rule` | string | membership test for wordplay themes (e.g. `starts:@colors`), `''` if none. |
| 11 | `identifiability` | number | 1 (obvious) to 5 (obscure), 0 unrated. |
| 12 | `difficulty` | number | identifiability + 0.5 x (popularity - 3), kept to 1..5, one decimal; identifiability alone when popularity is unrated; 0 when identifiability is unrated. |
| 13 | `breaks` | number[] | hyphen points in `name` (as for entries). |
| 14 | `note` | string | only with the `notes` option. |

**Entries**, in library order (an alias can come before its root). Columns, each the same length:

| column | type | content |
|---|---|---|
| `text` | string | the word as stored, capitals included. |
| `breaks` | number[] | character indexes in `text` where a hyphen may go (before that character); words of 8+ letters found in `data/breaks-en.txt`, and only when the library language is `en` (otherwise every list is `[]`); spaces and existing hyphens are never listed; `[]` for none. |
| `pos` | number | index into `posNames`. |
| `type` | number | index into `typeNames`. |
| `flags` | number | entry bits: adult 1, sensitive 2, trademark 4, vulgar 8 (the entry's own flags, not the theme's), then the alias kind: spelling 16, form 32, regional 64, abbreviation 128, translation 256, synonym 512. A root has none of 16-512; an alias written as root (8.3 step 4) keeps its kind bit, so tell roots by `root`, not by `flags`. |
| `familiarity` | number | 1 (every child knows it) to 5, 0 unrated. |
| `regions`, `regionsHi` | number | the entry's own region tags as low and high masks (an alias's own tags). |
| `root` | number | 0 for a root, else index+1 of its root entry (always a root itself). |
| `clash` | number | 0, or an id shared by entries that stand for one another in some theme's synonym `groups` (merged across themes; an alias carries its root's): never put two with the same id in one level. |
| `linkCount` | number | how many links follow in `links` (at least 1). |
| `links` | number[] | all links, 4 numbers each, entry by entry: the entry's links are the next `linkCount[i]` groups. |
| `zipf` | number | only with `zipf` and language `en`: Zipf frequency x 10, rounded, 0 unknown. |
| `gloss`, `note` | string | only with the `gloss` / `notes` options. |

**A link** = `linkFields`: `theme` (row index into `themes`), `difficulty` (decimal 1.0-5.0, 0 unrated: 0.7 x the harder plus 0.3 x the easier of familiarity and typicality, one decimal, the one set if only one is; familiarity is the harder of the entry's and its `use` form's), `typicality` (1-5, 0 unrated; an alias without its own value takes its root's), `shown` (0 = show `text`, else index+1 into `shown`). Links come in the entry's stored order (an alias: its root's themes, then its own).

**Aliases**: an alias is a separate entry with `root` pointing at its root and its kind in `flags`. It carries links to every theme of its root (and any of its own), so it can be played in its root's themes. The library's per-theme display choices travel as `shown`: an entry's `show` text for that theme (with the entry's part of speech) or its `use` form (another enabled entry: its text and part of speech). An alias's inherited link (no typicality of its own in that theme) never has a shown text.

**`shown`**: each distinct `[text, pos]` once, with its `breaks` as the third value. **`nameWordLinks`**: links whose displayed text is a single word that is a word of the theme's name or its singular or plural (`isNameWord` in `js/validate.js`). **`nameThemeLinks`**: links whose displayed text is the whole name of another written theme (compared lowercase, punctuation as spaces, one final s dropped; the first theme of that name), a "passenger" word; the theme may be a group. **`shownUK`**: for a root entry with a shown text and a UK-only spelling alias in the export, the British form of the shown text (the words that differ between root and alias swapped, gray to grey) when it differs; links not listed show the same text to everyone. Balloon text is not stored; derive it.

Out of range: an entry or shown text whose stored part of speech or type is not in the list is written as -1 (9 entries with `noun phrase` and one with type `name` at v374, corrected at v375; Checks reports any new one as `bad-pos` or `bad-type`; ISSUES.md B14, B23).

Size at v374, family preset: 3.9 MB, 3,240 themes (118 groups), 60,533 entries (2,047 aliases), 106,730 links, 3,758 shown texts, 55 region codes. The two masks hold at most 61 codes.

### 8.5 Two words that read the same

Allowed in the library (a shown text equal to another word's, two synonyms with one text); the export keeps one per theme (8.3 step 2). The game additionally keeps every displayed text unique within a level, compared in lowercase.

### 8.6 Versions and pinning

- `v` is the format version. It has been 3 since 2026-10-31, while fields were added and moved (theme `difficulty` was dropped from position 4 and came back at 12; the link field `popularity` became `typicality`; the entry column `rec` became `familiarity`; `dialect`, `regionBits`, `kindNames`, `regionsHi`, `breaks`, `nameWordLinks`, `nameThemeLinks`, `shownUK` and entry bit 512 were added). A reader must find theme and link positions by name and treat unknown keys as optional.
- `lib.version` identifies the content: it rises on every Save project file that changed something. The export must be regenerated after every library version and a library change must come with a new version, since the game tells exports apart by it.
- The game **pins** one library version: it re-slims the committed export into its own copy and runs its checks in its three difficulty modes, only when Simon asks. A pin rebuilds saved level histories and any change to a theme's links shifts most levels, so library changes are best batched into one version. The pinned version is recorded in ISSUES.md, section "Open between the library and the game".

## 9. Claude generation

Called from the browser with the user's key (Settings; kept for the session unless "remember" is ticked), using the `anthropic-dangerous-direct-browser-access` header and **structured outputs** (`output_config.format` json_schema) so replies are always valid. Models: Opus 5.5 (default), Sonnet 5.5, Haiku 4.5; the server-side fallback beta header is sent for the first two. Cost is estimated from usage and shown.

- **Generate with Claude…** (on a playable theme) asks for N words with a spread of difficulty (even / easy / hard) and optional extra instructions. The reply holds, per word: text, gloss, pos, type, familiarity, typicality, adult, sensitive, tm, vulgar, region, and aliases (text, gloss, kind synonym, regional or spelling, region, familiarity, typicality). A preview table lets you untick words; Add creates them with status `gen`. A word that already exists (same text and gloss) is only linked to the theme; each alias is created under its root and follows the root's links. Themes are not rated here (`rateThemes` in `js/ai.js` is dead code, ISSUES.md U1).
- The prompt (`GAME` in `js/ai.js`) states the game, the scales, the flag definitions, the entry and alias rules, and says complete themes must list every member exactly. The theme-specific part adds the path in the tree, the note, the words already there (not to repeat), the sub-themes, and a rule line for language-specific themes ("every word must satisfy its rule exactly").

## 10. Screens and behaviour

**Header:** brand button (home), the library line `library v374 · date · N themes · N words (N enabled)`, save status, File ▾ menu, Checks, Export…, Settings. The page title is "Wordlist Builder v2".

**Left pane (tree):** search box; Expand all / Collapse all; a lock button (🔒/🔓, remembered) that turns theme dragging on or off; a filter dropdown; the tree.
- Rows show the name, flag badges (✓ complete, A adult, S sensitive, T trademark, L language, F foreign, region codes) and a count: words for a leaf, `ready/playable` for groups. Thin themes (under the minimum) are highlighted, empty ones dimmed, disabled ones faded.
- Click selects; **click the selected row again to unselect** and return to the overview. Selecting a theme with sub-themes opens it.
- Hovered or selected rows show `+` (add sub-theme), `✎` (rename) and `🗑` (delete, with confirmation; sub-themes move up, words stay but lose the link).
- **Dragging (when unlocked):** drop on the middle of a row to nest, near the top or bottom edge to reorder as a sibling, or on the "drop here to make top level" strip. A theme cannot go inside itself or its own descendants.
- **Filter dropdown:** All, Disabled, Groups, Complete, Adult, Sensitive, Trademark, Language-specific, Foreign-language, Region-specific, Locked words, and three that open a second dropdown for the level: Popularity (1-5 or not rated), Identifiability (1-5 or not rated) and Difficulty (themes that can serve a level 1-5, or have too few words to fill a set). Inherited flags count; matches are shown with their parents, fully expanded, with "N themes match".
- **Search** (themes and words): two collapsible sections, "Themes (n)" and "Words (n)" (collapse state is remembered across searches; words need 2+ letters; capped at 60 each). The filter narrows the search: only matching themes, and words in them.
- There is no top-level "+ Theme" button; new themes come from the `+` row buttons or "+ Sub-theme", and clearing the Parent field in the dialog makes a top-level theme.

**Overview:** counts, **All words…** and **All themes…** buttons, and a table of groups with themes / ready / words.

**Theme screen:** crumbs, name, badges (flags, popularity, identifiability, the computed difficulty, and the range the theme can serve, worked out from its words), note; buttons Theme settings…, + Sub-theme, + Add words…, Generate with Claude…; a pool bar (distinct words against the minimum, depth by rating band); the **word table** with a filter box, "show disabled" and **"show words in sub-themes"** (lists every word below this theme once, with a read-only "themes" column; capped at 500 rows; on a group it is the only way the table appears).
- Word table columns: enabled checkbox with an expander, word, synonyms, pos, type, familiarity (`fam`, editable), typicality (`typ`, editable; "themes" in the sub-theme view), difficulty (worked out, read-only), flags, status. A row shows the word **as this theme shows it**: `rainy ← rain` (form chosen with `use`), `rock ← rock garden` (`show`), then the meaning label when needed to tell same-text words apart. Form aliases have no rows of their own; a small arrow box beside the word chooses the form this theme shows. The expander on a row opens its other names (spelling, regional, abbreviation, translation and synonym aliases, and the root when the row shows the dialect variant), each as an indented row with its own ratings; a locked theme lists only the aliases it links itself. The synonyms column shows the group-mates as chips with a ✕ (removes that word from the group) and a lookup box to add one (adding a word joins the two groups). Words are not draggable. All columns sort.
- Fixed column widths so sorting never shifts them. Sortable headings are dark with a dotted underline and a ⇅ mark; the sorted one is shaded with ▲. Non-sortable headings stay grey.

**Theme dialog:** name, parent (datalist picker), flags (enabled, group, complete, adult, sensitive, trademark, language-specific, foreign-language, and "words may contain the theme's own words", `nameOk`) with the flag definitions beneath, audience regions, kind and rule (a compound theme needs `compound-end:` or `compound-start:`, a wordplay theme a rule), word substitution (follow the kind / locked / allowed), theme popularity, identifiability, note; Delete and Save. Difficulty is not a field. Names must be unique (case-insensitive) and a theme cannot be placed inside itself.

**Entry dialog:** text, meaning/context (the label reads "Meaning/context"), pos, type, familiarity, status, flags (enabled, adult, sensitive, trademark, vulgar) with definitions, regions, note; a Themes table (each link with its typicality and shown text, removable; **theme names are links**: following one with unsaved changes asks "Unsaved changes" with Stay / Discard changes / Save and go); the single alias block (this is an alias of / aliases of this entry / make this an alias); Save, Delete, and "+ Add alias" for saved roots. The alias picker accepts "text (meaning) #id" and parses the `#id`.

**All themes screen:** every theme and group in one table (theme, parent, words, words with sub-themes, sub-themes, difficulty, popularity, identifiability, flags) with a filter on name, path or note, a show dropdown (all, playable, groups, each flag, complete, disabled, with no words, with too few words), sortable columns, 200 rows per page. A click opens the theme.

**All words screen:** every entry in one table with a text filter and a scope (word or alias, word, alias, meaning, themes, everything) and match mode (contains / starts with / exactly), dropdowns (show: all / enabled / disabled / roots / aliases / not in any theme; flags: any / adult / sensitive / trademark / vulgar / region-specific / none; familiarity; status), sortable columns (click again to reverse), enabled checkbox, 200 rows per page with Prev/Next above and below. Filters and sort are remembered until reload. A word click opens the entry dialog; "← Overview" returns.

**Settings dialog**, two sections:
- *General (this app, all libraries):* Anthropic API key (+ remember), model.
- *Library (saved with this library):* Language (en, pt, de, es, fr, jp; default English), default dialect (none or a region: which regional or spelling variant the word tables show), minimum words per theme (4), longest entry in words (4), longest entry in letters (20).

**Other:** "+ Add words…" pastes a list into a theme; Checks lists the issues with links; Export shows its report before downloading.

## 11. Project layout and how to run it

Static vanilla JavaScript ES modules, **no build step, no dependencies**. Node is only used for the dev server, the tests and the tools.

```
index.html, style.css
js/    outline.js (theme text format)   model.js (model, indexes, ratings, edits)   validate.js   caselint.js, caselint-words.js, caselint-allow.js (capital-letter lint, its word lists, its allow-list)
       export.js (filtered columnar export)   breaks.js (line-break points)   store.js (autosave, project file)   freq.js (Zipf)
       ai.js (Claude)   dom.js (h(), dialog(), toast, plural)   state.js (shared state A)
       dialogs.js (theme, entry, generate, checks, export, settings)   allwords.js   allthemes.js   app.js (shell, tree, theme view)
data/  themes.txt   freq-en.txt   old-themes.txt (provenance)   pilot.project.json (retired format, see ISSUES.md T2)
       wordlist-en.project.json (working library)   breaks-en.txt (word=hyphenated form)   export/ (game file written by tools/export-game.mjs)
tools/ convert-tree.mjs (one-off)   pilot.mjs (builds the pilot project)   apply-words.mjs + gen/*.mjs (generated word batches; gen/INVENTORY.md lists them)
       export-game.mjs (writes the game file)   brk-tokens.mjs, brk-merge.mjs (line-break table)
       game/ (LoadV3.cs.txt: the game's format-3 reader, kept as a copy)
tests/core.test.mjs   serve.mjs   .claude/launch.json
```

Commands: `node tools/apply-words.mjs <module> [library file]` applies a batch to the working library or to a scratch copy (a module may also carry `GROUPS`, synonym groups per theme, section 12); `node tools/export-game.mjs [preset] [out] [--strict]` writes the game file (section 8.1); `node tools/brk-tokens.mjs [export.json]` and `node tools/brk-merge.mjs [in|todo]` maintain `data/breaks-en.txt`.

Run: `node serve.mjs 8100` (127.0.0.1 only; `--lan` listens on all interfaces for a phone) and open http://localhost:8100/ (opened as `file://` the modules and the frequency list cannot load). Tests: `npm test` (`node --test tests/core.test.mjs`: outline, model, aliases, validation, case lint, export). The browser UI is checked by driving the page.

Conventions: the UI works at phone width too; dialogs use `dialog()` whose action may throw to show an error; after any edit call `A.changed(touch)` (update the indexes, mark dirty, autosave, render); `A.changed()` without a touch rebuilds every index, the safe choice when an edit does not say what it changed. A render of the same word table patches it in place: rows that come out identical are kept (js/app.js `patchTable`), so a row's handlers must read anything that can change without changing the row (the theme's word list: `livePool`) at event time, and a new row value they act on goes in the row's `_ids`. A row is not even built again when nothing in it changed: each row is written once for two builders, `h` and `sig` (js/dom.js, the row's signature without building it), and a row whose signature, `_ids` and control values match the last render's is reused as it is (`rowFor`); so whatever a row shows must come from what its builder is given, never from the DOM. The sort reuses the last order when no key changed (`sortByKey` with a memo, js/model.js).

## 12. How the data is produced

The data is generated by Claude in working sessions (and in the app on request), not only through the API. **Every word and theme that is generated or edited must have all its flags and ratings set**: for themes `pop`, `ident`, complete, adult, sensitive, trademark, language-specific, foreign, regions and a note (exact members for complete sets); for entries `fam`, typicality, pos, type, adult, sensitive, trademark, vulgar, region, aliases, and the meaning label where text is shared. Afterwards run Checks and clear the "no theme popularity" and "unrated" items for what was touched. Complete themes must be exactly right. Generated words keep status `gen` until reviewed.

**Working library and batches.** `data/wordlist-en.project.json` is the working library (`apply-words.mjs` still falls back to creating it from the pilot when it is missing, ISSUES.md T2). Each batch of generated data is a module in `tools/gen/` (for example `food-drink.mjs`: `DATA` rows per theme, `THEMES` ratings and flags, `ALIASES` for roots that already exist), applied with `node tools/apply-words.mjs tools/gen/food-drink.mjs [library file]` (the optional second argument is another library file, such as a scratch copy to try a batch on), which adds the entries, bumps `lib.version` and prints the problems Checks would find. Rules for a batch: each theme gets 30 to 75 distinct words spread across ratings 1 to 5 (roughly a third easy, a third middle, a third hard, including a real tail of 4s and 5s), and aliases at several difficulties (a familiar synonym, a regional word, a rare or slangy one). Alcoholic drinks are flagged adult and sensitive like the themes they sit in; brands are `org` with trademark; regional words carry `region`. Existing entries are only linked, never changed.

**Depth-3 and reconcile workflow.** Themes at depth 3 (the leaf themes under the roots' sub-groups) are generated in chunks of about 30 by parallel agents: `node tools/gen/list-depth.mjs <root> <n>` lists a chunk, `tools/gen/BRIEF-depth3.md` is the brief (15 to 40 words per theme spread over ratings, a rating of each theme's popularity and identifiability, honest types, at most 4 words and 20 letters, never skip a word because its text is used for another meaning), `tools/gen/find-word.mjs <word>...` shows existing entries of a text, and each chunk is written as `tools/gen/d3-<root>-<n>.mjs` and tested on a scratch copy. Beyond `DATA`, `THEMES`, `ALIASES` and `SETTINGS`, a batch can carry `GROUPS` (`[themeId, 'text', 'text|gloss', ...]`: synonym groups for that theme, each member the text of a root linked to it, `|gloss` when the text has several meanings there) and `FIXES`: `gloss` (labels an unlabelled entry), `merge`, `split` (moves one theme link to a new entry with its own meaning label, used when a link was made for the wrong meaning) and `del`. Agents run in parallel and cannot see each other, so after the batches are applied the library holds same-text entries where some lack a label. `tools/gen/recon-make.mjs` lists those groups into `tools/gen/recon/in-N.json`, review agents write `out-N.json` (merge into the same-meaning entry, or add a label; brief in `recon/BRIEF.md`), and `tools/gen/recon-apply.mjs` applies them. `tools/gen/audit-make.mjs` and `audit-apply.mjs` do the same for single unlabelled entries linked into themes of unrelated roots (possible mixed meanings; brief in `recon/AUDIT-BRIEF.md`). Remaining empty themes (depth 4 and deeper) use `node tools/gen/list-depth.mjs <root> <n> rest` and `tools/gen/BRIEF-rest.md`; themes that are thin or lack hard (typicality 4-5) or easy (1-2) words are listed by `node tools/gen/list-topup.mjs <n>` and filled with `tools/gen/BRIEF-topup.md` (`t-<n>.mjs`). `tools/gen/near-dups2.mjs` finds near-duplicate pairs in a theme ("smell" / "sense of smell"; most hits are legitimate aliases) and `tools/gen/near-fix.mjs` folds reviewed pairs into aliases; `tools/gen/stats.mjs` prints the library summary. The library is correct when Checks shows no errors: every text with several entries has distinct meaning labels.

`data/pilot.project.json` (built by `tools/pilot.mjs`) was a hand-written set of 347 entries made to judge quality before bulk generation (Apple/apple, Mercury planet/element, ass donkey vs. buttocks vulgar, flat/apartment). It is in the retired format (themes carry `d`, entries `rec` and `th`), so the current code reads its entries without ratings or links; it is kept as a record (ISSUES.md T2).

## 13. Not built yet

- The synonym / forms / regional redesign (DESIGN-entries.md) is built and applied to the library (phases 0-5, default dialect included). The game reads export format 3 (library v374 pinned, ISSUES.md).
- Theme check: which other themes each word could also fit (clashes and confusable theme pairs).
- Rating review of the common words' `fam` (the names were reviewed at v256, DESIGN-entries.md), bulk review of `gen` entries, merging entries.
- Per-group project files; undo.
- Other languages beyond the language label: a library per language with shared theme ids.
- Optional per-branch roll-up of sub-theme words.
- A dedicated "add top-level theme" button.

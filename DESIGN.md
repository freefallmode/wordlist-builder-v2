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
| **Aliases** (`aliasOf` + `aliasKind` synonym/spelling + the entry's own `region`) instead of a special US/UK pair type. | One mechanism covers couch/sofa/settee, sidewalk/pavement and color/colour. A regional synonym is a synonym with region UK. |
| **Aliases add variety, not words to a level.** An alias takes its themes from its root; the game must never show two entries of one alias group in the same level; a theme's 4-word minimum counts distinct roots. | Aliases give extra difficulty steps (settee is harder than couch) and extra surface forms, but must not make a thin theme look big. |
| **Ratings are 1-5** (0 = not rated), everywhere. | Five levels map onto the five difficulty modes and are what a person can rate consistently. 1-10 gave false precision. |
| **Three stored ratings:** word recognisability (`rec`), recognisability inside a theme (`th[themeId]`), theme difficulty (`d`). Everything else that makes a level hard (closeness of themes, completeness, length, number of themes) is computed by the generator. | Keeps stored data to what only a human or Claude can judge. Zipf frequency is only a cross-check (validation) and an optional export column. |
| **Part of speech and kind of word are separate fields:** `pos` (noun, verb, adjective, adverb, other) and `type` (common, person, place, org, title, proper, acronym, phrase). | "Paris" is a noun and a place; one field cannot hold both. `type` also drives case checks. |
| **Text is stored with its proper case** (Paris, NASA, iPhone) and accents. The game derives upper-case and accent-folded balloon text. | Case carries meaning and lets validation catch mistakes. Smaller than storing both forms. |
| **Words and flags are regenerated, not copied from the old library.** | The old data was suspect (section 1). |
| **Regionality on both words and themes** (`region[]`: US, CA, UK, IE, AU, NZ, ZA, IN, TR). | A word or theme known mainly in some countries (satsuma, UK nations, US states) should be filterable. Region means *who knows it* (audience), not *what it is about*. |
| **Theme flags:** enabled, difficulty, complete, adult, sensitive, trademark/copyright, language-specific, regions. Adult, sensitive, trademark, language-specific and disabled **pass down** to sub-themes; regions are unioned. | A parent decision (all of "drugs" is adult) should not have to be repeated on every child. |
| **Export filtering is per link (entry in theme), not per entry.** | A flag can come from the entry or from the theme it sits in; the same word can be fine in one theme and flagged in another. |
| **The project file has one record per line.** | Diffs and merges in git stay readable. |
| **Claude generation lives in the app (browser, the user's key), and the data is also produced by Claude in working sessions** (section 12). | In-app generation is for ongoing top-ups; both paths must set every flag. |
| **Removed: theme "part of the world" (`geo`).** | Not asked for; it duplicated what theme names say. Old `[geo:X]` tags are ignored when read. |
| **Removed: theme `kind` (place / property / wordplay).** | `wordplay` duplicated the language-specific flag (all 93 wordplay themes had it); `place`/`property` only added a sentence to the prompt, and the theme name or note already says it. Old tags are ignored on read; `[wordplay]` maps to the language-specific flag. |
| **Language is a library setting**, not an app setting. Default English; en, pt, de, es, fr, jp. A library per language with shared theme ids is the plan. | The word data, the frequency check and the generation prompt are per language. |
| **Model choice and API key are app settings** (browser storage, not in the library file). | They belong to the user, not the library, and must not end up in a shared project file. |

## 3. Data model

Pure functions over a plain project object (`js/model.js`), so the core can be tested in Node.

**Project:** `{ schema: 1, lang, lib: { version, modified }, nextId, settings: { minWords: 4, maxWords: 4, maxLen: 20 }, themes[], entries[] }`.

**Theme:** `{ id, name, parent, group, enabled, d, complete, adult, sensitive, tm, lang, region[], note }`.
- `id`: stable slug (`citrus_fruits`). A leading or trailing `___` in a name becomes "blank" so `___ball` and `ball` get different ids. Duplicate ids get `_2`, `_3`.
- `group`: a folder, never played, holds no words (validation warns if it does).
- `d`: theme difficulty 1-5, 0 = unrated.
- `note`: shown to the generator and to people. **For complete sets it lists the exact members.**
- The order of the `themes` array is the depth-first outline order (the tree order). Moving a theme moves its whole sub-tree.

**Entry:** `{ id, text, gloss, pos, type, enabled, rec, adult, sensitive, tm, vulgar, region[], aliasOf, aliasKind, th{ themeId: inThemeRating }, status, note }`.
- One meaning of one written form. Everything that depends on meaning is here; the only thing that differs between themes is the in-theme rating in `th`.
- `status`: `new` (added by hand), `gen` (generated, not reviewed), `rev` (reviewed).
- `vulgar` (crude or offensive wording) is an entry flag only; themes have no vulgar flag. Entries have no language-specific flag; that flag is for themes.

**Aliases.** `aliasOf` is the id of the root; an alias is never the root of another alias (chains are an error). An alias takes its themes from its root and has its own flags, ratings, `region` and `aliasKind` (`synonym`, `spelling`). Its rating in a theme is its own `th[theme]` override, else the harder (higher) of its root's rating there and its own `rec`. Deleting a root promotes its first alias to root (it keeps the ratings it was getting). In the entry editor, "This is an alias of" and "Aliases of this entry" are a single block in a single place, both shown as tappable links that open the other entry.

**Indexes** (`reindex`, rebuilt after every edit): theme by id, children by parent, entry by id, aliases by root, entries by theme (an alias appears under its root's themes), entries by lower-cased text.

**Theme statistics** (`themeStats`): entries, distinct roots, counts by rating band. A theme is "ready" when its distinct roots reach `settings.minWords`.

**Effective flags** (`eff(P, id)`): walks up the tree; adult, sensitive, tm, lang and disabled inherit, regions are unioned.

## 4. Theme tree

A logical category tree: 14 top-level groups (Food & Drink, Animals, Nature & Earth, Places & Geography, Travel & Transport, Body & Health, People & Society, Home & Everyday, Sports & Games, Arts & Entertainment, History & Myth, Science & Tech, and so on), then groups and playable themes below. The starter tree (`data/themes.txt`) has about 2,600 themes: 118 groups, about 2,480 playable, 134 complete sets.

It was produced from the old library's groups as a skeleton and reworked (`tools/convert-tree.mjs`, kept as a record; `themes.txt` is now maintained by hand or in the app): `[separate]` dropped (membership is explicit now), `[english-only]` became `[lang]`, region padding and duplicates removed, a few themes renamed (for example "houses and homes" became "buildings to live in"), `[sensitive]` stripped where it did not fit, and about 130 new themes added, including many more complete sets whose notes list the exact members.

**Outline text format** (import, export, starter file): two spaces per level; `name:` marks a group; tags in square brackets after the name; ` -- note` at the end.

```
Food & Drink:
  fruits
    citrus fruits
  months with 30 days [complete] -- April, June, September, November
  rude words [adult] [lang]
  national dishes [region:UK,US] [d:3]
```

Tags: `[complete] [adult] [sensitive] [trademark] [lang] [off] [d:3] [region:US,UK]`. Retired tags `[geo:..] [place] [property]` are ignored and `[wordplay]` means `[lang]`, so old files still load.

**What makes a good theme set.** A mixture of general themes (fruits), focused ones (citrus fruits) and complete sets. A word must belong to its theme unambiguously: a thoughtful player must not be able to argue it fits a different, ordinary theme better.

## 5. Rating scales and flag meanings

**Word recognisability `rec`, and in-theme rating:** 1 every child knows it (apple, dog) · 2 nearly every adult (plum, otter) · 3 many adults but not all (quince, ocelot) · 4 people with the interest, job or region (kumquat, quokka) · 5 few people (pulasan, a rare specialist term). Rate by what a typical adult actually knows, not how common the thing is in the world. The in-theme rating is how readily a player who knows the word would place it in this theme (a tomato in "fruits" is a 4 even though everyone knows tomato).

**Theme difficulty `d`:** how recognisable the *category* is: 1 everyone gets it at a glance (fruits, animals, colors) · 2 most adults (musical instruments, kitchen tools) · 3 many adults (sailing words, architectural styles) · 4 needs some interest or knowledge (heraldry terms) · 5 specialist or obscure. A vague boundary makes it harder.

**Flag meanings** (`FLAG_HELP` in `js/model.js`, used by the editors and the generation prompt so the wording stays identical):
- **Trademark / copyright:** brands, titles, characters, and so on.
- **Adult:** drugs, sexual content, violence, and so on.
- **Sensitive:** religion, politics, death, and so on. The game can keep these out of early or easy levels.
- **Language-specific:** depends on the library language's spelling, sound or slang, so it will not translate: rhymes, puns, slang, acronyms, anagrams, spoonerisms, wordplay, and so on.
- **Vulgar** (entries only): crude or offensive wording in this meaning.
- **Region:** who mainly knows it.

## 6. Validation (Checks screen)

Each issue has a severity (error breaks the model, warn is probably a mistake, info is work to do), a kind and a link to the theme or entry. The Checks screen filters by severity and kind.

- **Themes:** group with words linked (warn); empty theme (info); thin theme under the minimum (error if complete, warn otherwise); complete theme with no note (info); theme with words but **no difficulty** (warn); count of empty unrated themes (info).
- **Entries:** empty text (error); leading or trailing spaces (warn); duplicate text+gloss (error); same text with no gloss (error); same text, same part of speech, sharing a theme (warn: one entry or two meanings?); too many words or letters per the library settings (warn; no type is exempt; a name typed phrase is a warn); acronym not in capitals, or a person/place/org/title/proper name with no capital (warn); common word starting with a capital (info); not linked to any theme (info); linked to a missing theme (error) or to a group (warn); entry text equal to the name of its theme (warn); unrated (info).
- **Aliases:** root missing, alias chain, alias of itself (errors); same text as its root, no kind (warn); spelling alias with no region (info).
- **Rating vs. frequency** (English libraries only): a rating of 1-2 on a common word that is rare in text (Zipf below 2.3 warn, below 3.0 info) or absent from the list (warn); a rating of 4-5 on a very common word (Zipf above 5, info). Thresholds are loose because frequency in text undersells concrete everyday nouns (igloo, tuba, feta).

## 7. Storage and file formats

**Autosave** goes to the browser (IndexedDB, database `wordlist-builder-v2`, key `project`), debounced, with a status line ("Unsaved to file · autosaved 18:42"). **File ▾ → Save project file** downloads the project JSON and **bumps `lib.version` and `lib.modified`** (the library's own change counter); it does nothing if nothing changed. **Open project file** loads one. Other File items: Import theme outline, Export theme outline, Reset to the starter theme tree.

**Project file** (`wordlist-en.project.json`): `{"project":{schema, lang, lib, nextId, settings},"themes":[...],"entries":[...]}` with one JSON record per line; entry fields equal to their default are left out; retired theme fields (`geo`, `kind`) are dropped on read and write.

**App settings in browser local storage:** `wlb2-key` (API key, only if "remember" is ticked), `wlb2-model`, `wlb2-unlock` (tree dragging unlocked).

**Frequency data** (`data/freq-en.txt`): English word frequencies as Zipf x 10 from [wordfreq](https://github.com/rspeer/wordfreq) by Robyn Speer, CC BY-SA 4.0. Loaded asynchronously; used only for validation and the optional export column, and only when the library language is English.

## 8. Library export (Export…)

Filters, each applied **per link** (a link is flagged when the entry, its theme, or any ancestor theme has the flag):
- region-specific filter: judged on root words only; an alias (synonym or spelling variant) is kept or dropped with its root and its own region tag is ignored (its tag is still written to the file);
- longest entry in words (`maxEntryWords`, 0 = no limit): entries with more words are left out, aliases included;

- adult, sensitive, trademark, vulgar, language-specific: **include / leave out** (the export code still understands "only", the screen does not offer it);
- region-specific: one tick-box "Include region-specific words and themes", plus region boxes (all ticked by default, with all / none links) saying which regions the setting applies to; none ticked = nothing is left out. Presets saved before `region.v: 2` used an empty list for "every region" and are converted when read. Every option is a tick-box (flag filters: ticked = include), laid out in two columns on wide screens;
- include synonyms, include spelling variants (on/off);
- rating range and "include unrated";
- minimum words per theme.

Process: filter links; drop entries with no link left; drop themes under the minimum (counted in distinct roots); repeat until stable; the report lists the dropped themes and the sizes (with a gzip estimate). If an alias's root is filtered out, the first surviving alias becomes the root. Ancestors kept only to hold the tree together are written with the group bit. Presets: full, family, family without trademarks, English spelling only without regional words, no variants. Optional columns: Zipf, meanings (gloss), notes.

Output is columnar JSON to keep the file small:

```
{ v, lang, lib, generated, options, regions[], posNames[], typeNames[], themeBits, entryBits,
  themeFields: [id, name, parent, flags, difficulty, regions, (+ note)], themes: [rows],
  entries: { text[], pos[], type[], flags[], rec[], regions[], root[], linkCount[], links[] (+ zipf[], gloss[], note[]) } }
```

Entry i is `text[i]` etc.; its themes are the next `linkCount[i]` pairs `(themeIndex, rating)` in `links`. `root[i]` is 0 for a root, else index+1 of the root it aliases. Theme `flags` bits: adult 1, sensitive 2, trademark 4, language 8, complete 16, group 32. Entry `flags` bits: adult 1, sensitive 2, trademark 4, vulgar 8, spelling alias 16. `regions` is a bit mask over `regions[]`. Balloon text is not stored; derive it.

## 9. Claude generation

Called from the browser with the user's key (Settings; kept for the session unless "remember" is ticked), using the `anthropic-dangerous-direct-browser-access` header and **structured outputs** (`output_config.format` json_schema) so replies are always valid. Models: Opus 5.5 (default), Sonnet 5.5, Haiku 4.5; the server-side fallback beta header is sent for the first two. Cost is estimated from usage and shown.

- **Generate with Claude…** (on a playable theme) asks for N words with a spread of difficulty (even / easy / hard) and optional extra instructions. The reply holds `themeDifficulty` and, per word: text, gloss, pos, type, rec, inRec, adult, sensitive, tm, vulgar, region, and aliases (text, gloss, kind, region, rec, inRec). A preview table lets you untick words; Add creates them with status `gen`. A word that already exists (same text and gloss) is only linked to the theme. The theme difficulty is applied only if the theme is still unrated.
- **Rate themes…** rates the unrated themes under the selected one.
- The prompt (`GAME` in `js/ai.js`) states the game, the scales, the flag definitions, the entry and alias rules, and says complete themes must list every member exactly. The theme-specific part adds the path in the tree, the note, the words already there (not to repeat), the sub-themes, and a rule line for language-specific themes ("every word must satisfy its rule exactly").

## 10. Screens and behaviour

**Header:** brand button (home), the library line `library v1 · date · 2,483 themes · 347 words (347 enabled)`, save status, File ▾ menu, Checks, Export…, Settings. The page title is "Wordlist Builder v2".

**Left pane (tree):** search box; Expand all / Collapse all; a lock button (🔒/🔓, remembered) that turns theme dragging on or off; a filter dropdown; the tree.
- Rows show the name, flag badges (✓ complete, A adult, S sensitive, T trademark, L language, region codes) and a count: words for a leaf, `ready/playable` for groups. Thin themes (under the minimum) are highlighted, empty ones dimmed, disabled ones faded.
- Click selects; **click the selected row again to unselect** and return to the overview. Selecting a theme with sub-themes opens it.
- Hovered or selected rows show `+` (add sub-theme), `✎` (rename) and `🗑` (delete, with confirmation; sub-themes move up, words stay but lose the link).
- **Dragging (when unlocked):** drop on the middle of a row to nest, near the top or bottom edge to reorder as a sibling, or on the "drop here to make top level" strip. A theme cannot go inside itself or its own descendants.
- **Filter dropdown:** All, Disabled, Groups, Complete, Adult, Sensitive, Trademark, Language-specific, Region-specific. Inherited flags count; matches are shown with their parents, fully expanded, with "N themes match".
- **Search** (themes and words): two collapsible sections, "Themes (n)" and "Words (n)" (collapse state is remembered across searches; words need 2+ letters; capped at 60 each). A search overrides the filter.
- There is no top-level "+ Theme" button; new themes come from the `+` row buttons or "+ Sub-theme", and clearing the Parent field in the dialog makes a top-level theme.

**Overview:** counts, an **All words…** button, and a table of groups with themes / ready / words.

**Theme screen:** crumbs, name, badges, difficulty, note; buttons Theme settings…, + Sub-theme, + Add words…, Generate with Claude…, Rate themes…; sub-theme chips with counts; a pool bar (distinct words against the minimum, depth by rating band); the **word table** with a filter box, "show disabled" and **"show words in sub-themes"** (lists every word below this theme once, with a read-only "themes" column; capped at 500 rows; on a group it is the only way the table appears).
- Word table columns: enabled checkbox, word (click opens the entry), pos, type, rating (editable), in-theme rating (editable), flags, status. Aliases sit under their root, indented.
- Fixed column widths so sorting never shifts them. Sortable headings are dark with a dotted underline and a ⇅ mark; the sorted one is shaded with ▲. Non-sortable headings stay grey.

**Theme dialog:** name, parent (datalist picker), flags (enabled, group, complete, adult, sensitive, trademark, language-specific) with the four flag definitions beneath, difficulty, audience regions, note; Delete and Save. Names must be unique (case-insensitive) and a theme cannot be placed inside itself.

**Entry dialog:** text, meaning/context (the label reads "Meaning/context"), pos, type, rating, status, flags (enabled, adult, sensitive, trademark, vulgar) with definitions, regions, note; a Themes table (each link with its in-theme rating, removable; **theme names are links**: following one with unsaved changes asks "Unsaved changes" with Stay / Discard changes / Save and go); the single alias block (this is an alias of / aliases of this entry / make this an alias); Save, Delete, and "+ Add alias" for saved roots. The alias picker accepts "text (meaning) #id" and parses the `#id`.

**All words screen:** every entry in one table with a text filter (word, meaning or theme name), dropdowns (show: all / enabled / disabled / roots / aliases / not in any theme; flags: any / adult / sensitive / trademark / vulgar / region-specific / none; rating; status), sortable columns (click again to reverse), enabled checkbox, 200 rows per page with Prev/Next above and below. Filters and sort are remembered until reload. A word click opens the entry dialog; "← Overview" returns.

**Settings dialog**, two sections:
- *General (this app, all libraries):* Anthropic API key (+ remember), model.
- *Library (saved with this library):* Language (en, pt, de, es, fr, jp; default English), minimum words per theme (4), longest entry in words (3), longest entry in letters (20).

**Other:** "+ Add words…" pastes a list into a theme; Checks lists the issues with links; Export shows its report before downloading.

## 11. Project layout and how to run it

Static vanilla JavaScript ES modules, **no build step, no dependencies**. Node is only used for the dev server, the tests and the tools.

```
index.html, style.css
js/    outline.js (theme text format)   model.js (model, indexes, ratings, edits)   validate.js
       export.js (filtered columnar export)   store.js (autosave, project file)   freq.js (Zipf)
       ai.js (Claude)   dom.js (h(), dialog(), toast, plural)   state.js (shared state A)
       dialogs.js (theme, entry, generate, checks, export, settings)   allwords.js   app.js (shell, tree, theme view)
data/  themes.txt   freq-en.txt   old-themes.txt (provenance)   pilot.project.json   wordlist-en.project.json (working library)
tools/ convert-tree.mjs (one-off)   pilot.mjs (builds the pilot project)   apply-words.mjs + gen/*.mjs (generated word batches)
tests/core.test.mjs   serve.mjs   .claude/launch.json
```

Run: `node serve.mjs 8100` and open http://localhost:8100/ (opened as `file://` the modules and the frequency list cannot load). Tests: `node --test tests/core.test.mjs` (9 tests: outline round trip, model, aliases, validation, export filters and format). The browser UI is checked by driving the page.

Conventions: the UI works at phone width too; dialogs use `dialog()` whose action may throw to show an error; after any edit call `A.changed()` (reindex, mark dirty, autosave, render).

## 12. How the data is produced

The data is generated by Claude in working sessions (and in the app on request), not only through the API. **Every word and theme that is generated or edited must have all its flags and ratings set**: for themes `d`, complete, adult, sensitive, trademark, language-specific, regions and a note (exact members for complete sets); for entries `rec`, in-theme rating, pos, type, adult, sensitive, trademark, vulgar, region, aliases, and the meaning label where text is shared. Afterwards run Checks and clear the "no difficulty" and "unrated" items for what was touched. Complete themes must be exactly right. Generated words keep status `gen` until reviewed.

**Working library and batches.** `data/wordlist-en.project.json` is the working library (created from the pilot on the first run). Each batch of generated data is a module in `tools/gen/` (for example `food-drink.mjs`: `DATA` rows per theme, `THEMES` ratings and flags, `ALIASES` for roots that already exist), applied with `node tools/apply-words.mjs tools/gen/food-drink.mjs`, which adds the entries, bumps `lib.version` and prints the problems Checks would find. Rules for a batch: each theme gets 30 to 75 distinct words spread across ratings 1 to 5 (roughly a third easy, a third middle, a third hard, including a real tail of 4s and 5s), and aliases at several difficulties (a familiar synonym, a regional word, a rare or slangy one). Alcoholic drinks are flagged adult and sensitive like the themes they sit in; brands are `org` with trademark; regional words carry `region`. Existing entries are only linked, never changed.

`data/pilot.project.json` (built by `tools/pilot.mjs`) holds 29 themes and 347 entries written by hand to judge quality before bulk generation; it includes the awkward cases (Apple/apple, Mercury planet/element, ass donkey vs. buttocks vulgar, sofa/couch/settee, flat/apartment, aluminum/aluminium).

## 13. Not built yet

- Theme check: which other themes each word could also fit (clashes and confusable theme pairs).
- Rating review pass (second opinion on `rec`), bulk review of `gen` entries, merging entries.
- Per-group project files; undo.
- Other languages beyond the language label: a library per language with shared theme ids.
- Optional per-branch roll-up of sub-theme words.
- A dedicated "add top-level theme" button.

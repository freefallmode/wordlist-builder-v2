# Issues

Everything known to be broken, inconsistent, inefficient or no longer needed in this project. One item per line. The design and its reasons are in DESIGN.md and DESIGN-entries.md; this file only tracks problems.

How to read an item: **id** `status` statement (place). *check*.

- Status: `open`, `fixed` (with date and commit), `dropped` (with the reason).
- Check: *seen* = the manager read the code or data and confirmed it; *run* = an audit agent reproduced it by running code; *read* = an audit agent traced it by reading only; *suspected* = plausible, not proven.
- Ids are never reused. Fixed and dropped items move to the end of their section.

Baseline: read-only audit of 2026-11-15 at library v366 (commit 6a15bee), by four agents (app code, tooling and data, tools/gen inventory, docs against code). 14 of 14 tests pass.

Re-check at library v370 (commit 5a508bc, same day, after the case-lint commits 69c6f4b and 5a508bc by another session): B2, B3, B14, T1 and T10 are unchanged (Checks: 3 errors, the same three; case lint: 48 `cap-common`, nothing else; 99 `aliasOf: null`; entry 67019 still type `name`). js/caselint.js gained two kinds (`case-split`, `common-in-names`), so its line numbers below are one or more lines lower than in the file now (the `&& false` of U5 is at line 33).

## Broken: app (js/)

- **B1** `open` The export filter "Longest entry in words" splits on the letter s (`/s+/`), not on whitespace. With a limit of 1 it keeps "Northern Ireland" and drops "Venus" (js/export.js:58). No test covers it. *seen, run*
- **B2** `open` Case lint never runs in Checks: `validate()` imports `caseLint` and never calls it, although caselint.js:4, commit dff5793 and DESIGN-entries.md say it does (js/validate.js:5). *seen*
- **B3** `open` The 48 `cap-common` lint issues (Vidalia in onion family, Chinese in cabbage family) are shown nowhere: tools/export-game.mjs:21 filters that kind out before printing "case lint: 0", the allow-list cannot suppress it (js/caselint.js:16), and B2 hides it in the app. *seen, run*
- **B4** `open` Saving a theme or an entry in its dialog drops every region code outside the 9 tick-boxes. The library uses 55 codes; 69 entries and 49 themes carry others (js/dialogs.js:91, :237; `REGIONS` in js/model.js:17). *seen*
- **B5** `open` The unsaved state is lost on reload: `A.dirty` starts false and is not stored, so after a reload edits that exist only in the browser autosave show as "File saved" and Save project file answers "No changes since the last file save" (js/state.js:10, js/app.js:488). *seen*
- **B6** `open` A failed autosave read replaces the browser library: `loadLocal` turns every error (IndexedDB failure, parse error) into "empty", boot then loads the starter and autosaves over the stored copy (js/store.js:23, js/app.js:450-456). How often the trigger happens is unknown. *seen*
- **B7** `open` Import theme outline matches themes by the slug of the name, but 165 themes have an id that differs from it (`dairy_and_eggs` / "dairy"). Exporting the outline and importing it again adds 165 duplicate themes and moves 39 children under them (js/app.js:412, js/outline.js:23). *seen, run*
- **B8** `open` Import theme outline resets fields of existing themes: the merge is `Object.assign`, so `pop` and `ident` go to 0 when the line has no tag, and the outline format does not carry `tkind`, `rule`, `locked`, `nameOk` or `groups` at all (js/app.js:417, js/outline.js:76-87). *seen*
- **B9** `open` Deleting a root gives the promoted alias the wrong in-theme rating: it stores `difficultyBand` (the harder of familiarity and typicality) as the typicality (js/model.js:171). *seen, run*
- **B10** `open` The theme popularity dropdown uses the typicality wording ("1 the first words anyone thinks of") (js/dialogs.js:50). *seen*
- **B11** `open` A missing frequency file is not detected: `loadFreq` does not check the response status, a 404 body parses to an empty list and counts as loaded, so the "did not load" message never shows and Checks would warn about every easy common word (js/freq.js:20). *seen*
- **B12** `open` Deleting or unlinking leaves stale references: `deleteTheme` leaves `show`, `use`, `nameOkIn` and `@theme` rules pointing at the theme; `deleteEntry` leaves the id in theme `groups` and in other entries' `use`; unlinking in the entry dialog removes `show` but not `use` or `nameOkIn` (js/model.js:166, :178, js/dialogs.js:169). The library has none today. *read*
- **B13** `open` Case lint details: a `break` leaves only an inner one-item loop, so one link can be reported twice; `stem('pies')` gives `py`; `hasUkAlias` counts an alias with any region (js/caselint.js:56 and nearby). *run*
- **B14** `open` Validation does not check that an entry's `type` is one of `TYPES`; entry 67019 "South Beach diet" has type `name` (js/validate.js, js/model.js:14). *seen*
- **B15** `open` js/ai.js: the cache-read prices for Opus 5.5 and Sonnet 5.5 are reported as twice the current price; a reply from a fallback model is priced as Opus 5.5; the Haiku entry is the previous generation (`claude-haiku-4-5`) and the no-effort, no-fallback special case is keyed on that one id; `wordsPrompt` checks the theme's own language flag, not the inherited one (js/ai.js:5-6, :36, :99). Model ids and structure *seen*; prices *read* against the API reference by the agent, to be checked again when fixed.
- **B16** `open` Autosave may never report failure: no `tx.onabort` handler, so a quota error can leave the promise unresolved; a new IndexedDB connection is opened per autosave and never closed (js/store.js:7-22). *suspected*
- **B17** `open` `parseProject` spreads every entry id into `Math.max(...)`; this overflowed the call stack at about 130,000 entries in one run. The library has 62,273 (js/store.js:52). *suspected*
- **B18** `open` Settings reads localStorage without try/catch, unlike every other access, so the dialog could fail to open where storage is blocked (js/dialogs.js:437). *read*

## Broken: tools and data

- **T1** `open` The library has 3 Checks errors (`needs-gloss`): "lupin" (ids 1740, 50239), "grey" (7673, 9526), "colours" (37976, 43131). In each case a UK spelling alias has no meaning label. DESIGN.md section 12 says the library is correct only with no errors. *seen*
- **T2** `open` data/pilot.project.json is in the retired format (themes carry `d`, entries `rec` and `th`). Read by the current code its 347 entries have no ratings and no theme links. tools/apply-words.mjs:33 still falls back to it when the library file is missing, and README and DESIGN.md present it as usable. *seen (themes), run (entries)*
- **T3** `open` tools/pilot.mjs writes the retired theme field `d` and no `pop`; its own validation reports every pilot theme as unrated. *run*
- **T4** `open` tools/export-game.mjs finds data/breaks-en.txt and its default output relative to the current directory, the library relative to the script. Run from another directory it writes an export with no break points and says nothing. tools/brk-tokens.mjs and brk-merge.mjs depend on the current directory throughout. *seen, run*
- **T5** `open` `--strict` works only as the third argument of tools/export-game.mjs: as the first it is taken as the preset name, as the second as the output path (a file named `--strict`) (tools/export-game.mjs:11). *seen*
- **T6** `open` Line breaks cover only the family export: tools/brk-tokens.mjs reads the committed family export, so 403 long words that appear only in adult or vulgar entries (prosecco, absinthe, artillery) never get queued, while tools/apply-words.mjs counts over the whole library and reports them on every run. *run*
- **T7** `open` data/breaks-en.txt line 12604 is `sightseer=sight-see-er` (an extra e), so that word gets no breaks. tools/brk-merge.mjs validates only new lines, never the existing table. *seen*
- **T8** `open` tools/gen/stats.mjs and tools/gen/list-topup.mjs still read the retired theme field `t.d` (stats.mjs:8, :11; list-topup.mjs:14, :24), so "unrated filled themes" lists every theme and the top-up thresholds use `undefined`. DESIGN.md section 12 names both as live tools. *seen*
- **T9** `open` tools/game/LoadV3.cs.txt reads the column `entries.rec`, renamed `familiarity` at v301, and casts the now-decimal difficulties to integers. It is a kept copy of a reverted Unity reader, not a live tool. *suspected (not compiled)*
- **T10** `open` Leftovers in the project file: `settings.model` (nothing reads it; the model is a browser setting), 99 entries with `aliasOf: null` instead of 0, `nextId` 67399 while the highest id is 67399 (corrected on load, but a tool wrote an entry without advancing it). *seen*
- **T11** `open` serve.mjs: a malformed URL (`/%E0%A4%A`) throws outside the try block and stops the server; it listens on every network interface and serves the whole folder including .git/. *seen, run*
- **T12** `open` The run line at the top of tests/core.test.mjs (`node --test tests`) fails on Node 24; package.json has no `scripts`, so `npm test` and `npm start` do nothing. *seen*

## Inconsistent

- **I1** `open` The browser export and the Node export differ for the same library. Browser: no break points at all (nothing calls `setBreaks`), Zipf only if ticked and all zeros if the list has not loaded, no case lint, the report notes are not shown, file name `wordlist-en-v366.json`. Node: breaks, Zipf always, lint count, built-in presets only, file name `wordlist-game-family.json`. The committed export matches a fresh Node export of v366. *run*
- **I2** `open` A browser export carries the last saved library version even when the browser copy has unsaved edits, so two different exports can have the same version (js/store.js:77). *read*
- **I3** `open` Two capital rules: Checks has its own simpler `case` rule (161 notes) while caselint.js has the full one (48 `cap-common`); they disagree on forms such as "MPs" (js/validate.js:104-106). Goes with B2. *run*
- **I4** `open` "+ Add words…" links whichever entry matches the text, including a spelling or form alias, and does not check the alias family; generation handles both (js/dialogs.js:263 against :313-315). *read*
- **I5** `open` The Export screen starts from a fixed minimum of 4 words per theme and ignores the library setting `minWords` (js/dialogs.js:377). *read*
- **I6** `open` The Export screen shows only counts: the dropped theme names, the same-text drops and the report notes are computed and not shown, though DESIGN.md section 8 says they are listed (js/dialogs.js:413-415). *read*
- **I7** `open` The word table shows a `use` form even when that form entry is disabled; the export then falls back to the root text. No data hits this today (js/app.js:297, js/export.js:66). *read*
- **I8** `open` The theme screen shows two things both called difficulty: the decimal from identifiability and popularity, and the range a theme can serve from its words (js/app.js:224, :253). *read*
- **I9** `open` Language code `jp` in Settings; the standard code is `ja` (js/dialogs.js:432). *read*
- **I10** `open` The starter-update check compares the shipped library version with the browser copy's, but Save project file raises the same counter, so the comparison means little after a save (js/app.js:437). *suspected*
- **I11** `open` Status: 62,271 of 62,273 entries are still `gen`; the review the status exists for has not happened, so it currently carries no information. *run*

## Inefficient

- **E1** `open` Every small edit redoes everything: a full reindex (160 to 390 ms in Node), a full render, then a full serialise (0.9 s for 8 MB) and IndexedDB write. Some actions render twice (js/app.js:24). *run (Node timings)*
- **E2** `open` The filter boxes of the word table, All words and All themes re-render on every keystroke without a debounce (js/app.js:291, js/allwords.js:111, js/allthemes.js:47). *read*
- **E3** `open` "+ Add words…" and generation reindex the whole library after every word and alias: about 100 reindexes for a batch of 80 (js/dialogs.js:266, :320, :327). tools/apply-words.mjs does the same (lines 69, 82, 88, 101): roughly 45 s of a 1,000-word batch. *read, timed*
- **E4** `open` "Show words in sub-themes" has a quadratic step: 922 ms for Language & Wordplay (8,017 words) on every render, before the 500-row cap; `formsOf` scans all entries on every render (js/app.js:296, :311). *run*
- **E5** `open` The committed export is one 3.9 MB line with a fresh timestamp: 60 commits each stored it whole, the pack is 22 MB, and re-exporting an unchanged library still makes a diff (data/export/wordlist-game-family.json). *run*

## No longer needed

- **U1** `open` Dead AI code: `rateThemes`, `RATE_SCHEMA`, `THEME_SCALE`; no button calls them and they ask for the retired theme `d` (js/ai.js:128-135). *seen*
- **U2** `open` Unused imports. app.js: descendants, nowStamp, entryDefaults. dialogs.js: `$`, TYPICALITY_HELP, linkIds, difficultyBand, eff, themeLocked, descendants, PRESETS, SPREADS. export.js: REGIONS, freqLoaded. validate.js: difficultyBand, pathOf (caseLint is B2). *run (script and grep)*
- **U3** `open` Exports nothing uses: model.js `rootOf`, `wordDifficulty`, `linkEntry`, `unlinkEntry`; dom.js `$$`, `option`; the `onopen` option of `dialog()`; `A.checkStarter`. *run (script and grep)*
- **U4** `open` CSS for elements that no longer exist: `.groups` and its two child rules, `.arrow`, `.row.nowrap` (style.css:79, :106, :146-148). *read*
- **U5** `open` Dead expressions: `&& false` makes a condition in js/caselint.js:32 always true; `Math.max(0, i - 0)` in tools/brk-merge.mjs:22. *seen (caselint)*
- **U6** `open` Compatibility code with nothing left to read: the `geo`/`kind` strip (js/store.js:38, :50; 0 themes have them), retired outline tags (js/outline.js:54-67; only data/old-themes.txt has them), export mode `only` (the screen cannot choose it). Cheap, and needed only to open old files: keep or drop is a decision. *read*
- **U7** `open` Spent one-off tools: tools/migrate-pop.mjs and tools/retype-phrases.mjs change nothing on v366 but still bump the version and rewrite the file if run; tools/convert-tree.mjs and data/old-themes.txt are kept as a record; tools/pilot.mjs (T3); tools/game/ (T9). *run*
- **U8** `open` tools/gen: see the section below (G1, G2, G5, G6).

## tools/gen

The per-file classification behind these items is tools/gen/INVENTORY.md (static reading by an audit agent, spot-checked by the manager; nothing was run). Nothing here has been deleted or moved: what to archive is a decision.

- **G1** `open` About 24.7 MB of the 25.5 MB tracked in tools/gen (1,468 files) is spent material as far as references show: 149 applied batch modules (2.75 MB), 73 one-off scripts the docs or commits record as applied, 65 scripts no document mentions, and about 21 MB of inputs, answers and logs of finished passes (shortmem/candidates.json alone is 4.4 MB). What must stay is about 0.7 MB: 15 pipeline scripts, the current briefs, and three state stores that live scripts read (rec/done.json, recon/audited-ids.json, brk/in-N.txt and out-N.txt). *read*
- **G2** `open` tools/gen/.tmp/ (ignored by git) holds 56 MB: 8 old library snapshots of about 7 MB each and 22 scratch scripts. Four spent scripts read snapshots from it (show-leftovers, show-migrate, syn2/apply, syn2/report), so they cannot run on a fresh clone. *seen (size)*
- **G3** `open` tools/gen/pop/metrics.mjs imports `effRec`, removed from js/model.js at v301; it fails on import. *seen*
- **G4** `open` Spent scripts that would do harm if rerun: syn2/apply.mjs and syn2/loose-ends.mjs still write the retired field `th`; caselint-allow.mjs overwrites js/caselint-allow.js, whose header says lines are added by hand after checking; migrate-pop and retype-phrases (U7) bump the version for no change. *seen (`th`, caselint-allow)*
- **G5** `open` Tracked by accident: tools/gen/pos/.scratch-2.json.pos-done.json and .scratch-3.json.pos-done.json (leak/ has a .gitignore for this pattern, pos/ has none). tools/gen/brk/bad.txt is a tracked empty output file. *seen*
- **G6** `open` Briefs: 44, of which about 10 are current (depth3, rest, topup, rec, ident, regtag, CAPITAL-RULE, brk/BRIEF-brk, recon/BRIEF, recon/AUDIT-BRIEF). Superseded: leak, leak2, leak3 (by leak4), overlap (by overlap3), pos (by pos2), disp (by disp2), ident2/BRIEF-ident2. About 20 belong to finished passes. The capital rule was appended to four briefs of finished passes (pop, full, kind, capmark), so "has the rule" does not mean "in use". *read*
- **G7** `open` Unclear whether still wanted: syn3-make and syn3-apply (the briefs point at them for later runs, the log records the sweep as done), the starts-with and ends-with generator briefs, recon/REPAIR-BRIEF, easy/BRIEF-easy, the done.json files of passes that could be rerun (regtag, regrec, pos, syn, leak), and five top-level lists nothing reads (alias-extra-list.md, connections-titles.txt, inflection-dups-list.md, long-names-list.md, nameok-list.txt). *read*
- **G8** `open` shortmem-find.mjs and shortmem-make.mjs only work from the repo root (paths relative to the current directory). The applied data modules still use the pre-v301 names (`rec`), which apply-words accepts as an old option. *read*

## Open between the library and the game

Reported by the Word Safari manager session on 2026-11-15; not checked on the game side. These are decisions waiting on Simon or work not built, not defects.

- **W1** `open` Art movements were made lowercase everywhere at v370 (cubism, surrealism, impressionism); earlier they were kept capitalised as named movements. Which is wanted is undecided.
- **W2** `open` The "Names that are ..." themes mix capitals on purpose (cedar, elm, Ash, laurel); whether they should be uniform is undecided.
- **W3** `open` The game does not read the theme region tags (`regions`, `regionsHi`); holding region-tied themes back by level is not built.
- **W4** `open` The game's generator has no related-word rule (joy and joyful, fish and goldfish); a word-family column in the export was discussed as the way to supply it, undecided.
- **W5** `open` Whether the game should treat a shown text that differs from its entry only in case as a plain case fix (a game change).
- **W6** `open` The game manager understands case lint to run in Checks and the strict export to fail on any issue. Neither is so: B2 (not in Checks) and B3 (the 48 `cap-common` hits are left out of the count and of `--strict`).

## Documentation out of date

Each item is one area to rewrite, checked against the code on 2026-11-15. Line numbers are those of the docs at commit 6a15bee.

- **D1** `open` DESIGN.md section 8 describes an old export format: theme fields and their order, the entry column `rec` (now `familiarity`), the link tuple (now theme, difficulty, typicality, shown), shown items (now text, pos, breaks), missing top-level keys (`dialect`, `regionBits`, `kindNames`, `nameWordLinks`, `nameThemeLinks`, `shownUK`), missing entry bit synonym 512. DESIGN-entries.md lines 200, 216 and 217 give field positions that later additions made false. This is the one that matters to a game-side reader. *checked against js/export.js*
- **D2** `open` Rating names: the code uses `fam`, `typ`, `familiarity`, `typicality` throughout; the docs mix in `rec`, `th`, `inRec`, `effRec`, link "popularity" (DESIGN.md:60, :100, :157, :163; DESIGN-entries.md:129, :218, :223).
- **D3** `open` Theme difficulty is described three ways (manual `diff` override in DESIGN.md:32, :37; never stored and not exported in DESIGN-entries.md:200; stored on save in DESIGN-entries.md:127). The code computes it from identifiability and popularity, never stores it, and exports it.
- **D4** `open` DESIGN.md:42 says theme kind was removed; `tkind` and `rule` are stored on 581 and 200 themes, edited in the theme dialog and exported. The theme field list (DESIGN.md:52) also lacks `ident`, `foreign`, `locked`, `nameOk`.
- **D5** `open` Alias kinds: DESIGN.md:27 names two, DESIGN-entries.md:28 says four and lists five, the code has six. `synonym` is described as being phased out, retired, and brought back as strict (the code has the last). "An alias never holds theme links" (DESIGN.md:28, DESIGN-entries.md:194) is reversed by DESIGN-entries.md section 3.5; 96 aliases hold links.
- **D6** `open` Screens (DESIGN.md section 10) describe things that are gone or different: "Rate themes…", sub-theme chips, a theme difficulty field, word-table columns, "a search overrides the filter" (the code narrows the search by the filter), longest entry default 3 (it is 4). Not described: the All themes screen, the Foreign / Locked / Popularity / Identifiability / Difficulty tree filters, `nameOk`, the "Shown as" column, the other-names expander, the Default dialect setting.
- **D7** `open` Validation (DESIGN.md section 6) lacks `rule-theme`, `family-twice`, `alias-link-kind`, `alias-fullname`, `alias-us-root`, `overlap`, `theme-name`, `bad-rating`, `type`, and the case lint with its seven kinds and allow-list; "no difficulty" should read "no theme popularity".
- **D8** `open` Outline format (DESIGN.md:89, :92) lists the dead tag `[d:3]` and lacks `[pop:n]`, `[ident:n]`, `[foreign]`.
- **D9** `open` File layouts and commands: README and DESIGN.md section 11 leave out js/allthemes.js, breaks.js, caselint.js, caselint-allow.js (README also dom.js, state.js), data/breaks-en.txt, data/export/, tools/export-game.mjs, brk-tokens.mjs, brk-merge.mjs, migrate-pop.mjs, retype-phrases.mjs, tools/game/; README does not mention DESIGN-entries.md; "9 tests" is 14; the `GROUPS` block and the library-file argument of apply-words and the arguments of export-game are not documented.
- **D10** `open` Stale counts and references: 134 closed sets and "all 49 have a note" (131 complete themes, all with notes); "1,327 information notes" for capitals (161); "section 6 of DESIGN.md" for the export (it is 8); a brief called "easy" (it is BRIEF-ease.md); the pilot described as 29 themes and usable (T2).
- **D11** `open` Open items that are closed: DESIGN-entries.md section 8 (all three questions are answered later in the file), "the game repo is still on export format 1", "23 theme-name leaks still to settle" (3 warnings remain), "not yet applied: see phases 1-2", the 25 via-alias compound links (looks done), DESIGN.md section 13 "rating review pass" (partly done).
- **D12** `open` DESIGN-entries.md section 10 is a dated log that mixes rules still in force with records of finished passes, and later entries reverse earlier ones without the earlier text changing. About 25 of its 55 entries state a rule that belongs in the main body.

# Wordlist Builder v2

A browser tool for building theme-based word libraries for a sorting game: levels show sets of four words from 8 to 12 themes, and the player sorts each word into its theme. Static files, no build step.

Run it: `node serve.mjs [port]` (or `npm start`; it listens on 127.0.0.1 only) then open http://localhost:8100/ (opened as `file://` the modules and frequency list cannot load). Tests: `npm test` (`node --test tests/core.test.mjs`). The browser keeps its copy of the library per address, so anything that tries the app out (an agent, a test) uses another port, `node serve.mjs 8141` (launch configuration `wordlist-builder-v2-test`), and never touches the working copy at 8100. To open the app from a phone, add `--lan` (or set `HOST=0.0.0.0`): the server then listens on every network interface, so everything in this folder (except dot folders) is readable by anyone on the local network; it prints a warning and the URLs to use.

Every change to the library data must pass the library gate, `npm run gate` (`tools/gate.mjs`: tests, Checks against `tools/checks-baseline.json`, strict export, the case scripts, the committed export current, the version bumped). It runs before each commit through `.githooks/pre-commit` and in CI (`.github/workflows/library-gate.yml`). Enable the hook once per clone: `git config core.hooksPath .githooks`. While working on a library change, `npm run check -- <draft file> [--diff data/wordlist-en.project.json] [--kind <k>] [--export] [--json]` runs the same Checks (step b) on a draft such as a batch script's `--out` file and lists only the issues that are new compared with another file.

## Files

- `index.html`, `style.css`, `js/*.js`: the app (ES modules).
  - `outline.js` theme tree text format; `model.js` data model, indexes, ratings, edits; `validate.js` checks; `caselint.js` (with `caselint-words.js` and the allow-list `caselint-allow.js`) capital-letter lint; `export.js` filtered columnar export; `breaks.js` line-break points; `store.js` autosave + project file; `freq.js` Zipf lookup; `ai.js` Claude generation; `dom.js` and `state.js` UI helpers and shared state; `dialogs.js`, `allwords.js`, `allthemes.js`, `app.js` UI.
- `data/themes.txt`: the starter theme tree (about 2,600 themes in 14 groups, 134 complete sets). Loaded when there is no saved project. The working library below has grown to 3,317 themes at v374.
- `data/freq-en.txt`: English word frequencies (Zipf x 10), from [wordfreq](https://github.com/rspeer/wordfreq) by Robyn Speer, CC BY-SA 4.0 (includes Google Books Ngrams, Wikipedia, OpenSubtitles, SUBTLEX and other sources listed in the wordfreq README).
- `data/wordlist-en.project.json`: the working library (load it with File ▾ → Open project file). `tools/apply-words.mjs` adds a generated batch from `tools/gen/*.mjs` to it (the depth-3 batches are `tools/gen/d3-*.mjs`; `tools/gen/recon*` settles same-text entries, see DESIGN.md section 12); `node tools/apply-words.mjs <module> [library file]` can target a scratch copy instead; the first load in an empty browser uses the library as the starter, and a newer version is offered on reload. The earlier hand-written pilot (data/pilot.project.json) was deleted 2026-11-19; git history keeps it.
- `data/breaks-en.txt`: line-break points for long words (`playground=play-ground`), kept up with `tools/brk-tokens.mjs` and `tools/brk-merge.mjs`. `data/export/`: the game file, written by `node tools/export-game.mjs [preset] [out] [--strict]` (default preset `family`; `--strict` exits 1 when the case lint finds issues).
- `data/old-themes.txt` and `tools/convert-tree.mjs`: the old app's tree and the one-off script that produced `data/themes.txt` (kept as a record; `themes.txt` is now maintained by hand or in the app).
- `DESIGN.md`: the design record: decisions and reasons, data model, file formats, screens, how to rebuild the app. `DESIGN-entries.md`: the design for synonym groups, word forms and regional variants, the capital rule, and a dated decisions log.
- `ISSUES.md`: everything known to be broken, inconsistent, inefficient or no longer needed, one line each with its status. `tools/gen/INVENTORY.md`: what each script, brief and data folder in `tools/gen` is and whether anything still uses it.

## Working

Autosave goes to the browser (IndexedDB). File ▾ → Save project file writes a git-friendly JSON file (one theme or entry per line) and bumps the library version; Open project file loads one. Export… writes the game library (see DESIGN.md).

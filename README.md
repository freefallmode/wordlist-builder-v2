# Wordlist Builder v2

A browser tool for building theme-based word libraries for a sorting game: levels show sets of four words from 8 to 12 themes, and the player sorts each word into its theme. Static files, no build step.

Run it: `node serve.mjs` then open http://localhost:8100/ (opened as `file://` the modules and frequency list cannot load). Tests: `node --test tests/core.test.mjs`.

## Files

- `index.html`, `style.css`, `js/*.js`: the app (ES modules).
  - `outline.js` theme tree text format; `model.js` data model, indexes, ratings, edits; `validate.js` checks; `export.js` filtered columnar export; `store.js` autosave + project file; `freq.js` Zipf lookup; `ai.js` Claude generation; `dialogs.js`, `app.js` UI.
- `data/themes.txt`: the starter theme tree (about 2,600 themes in 14 groups, 134 complete sets). Loaded when there is no saved project.
- `data/freq-en.txt`: English word frequencies (Zipf x 10), from [wordfreq](https://github.com/rspeer/wordfreq) by Robyn Speer, CC BY-SA 4.0 (includes Google Books Ngrams, Wikipedia, OpenSubtitles, SUBTLEX and other sources listed in the wordfreq README).
- `data/old-themes.txt` and `tools/convert-tree.mjs`: the old app's tree and the one-off script that produced `data/themes.txt` (kept as a record; `themes.txt` is now maintained by hand or in the app).
- `HANDOFF.md`: design decisions and file formats.

## Working

Autosave goes to the browser (IndexedDB). File ▾ → Save project file writes a git-friendly JSON file (one theme or entry per line) and bumps the library version; Open project file loads one. Export… writes the game library (see HANDOFF.md).

# Project status: handover to the next manager session

Written 2026-11-18, library v395. Read this, then `ISSUES.md`. Do not re-audit: `ISSUES.md` is the audit.

## 1. Overview

Wordlist Builder v2: a browser tool that builds a library of themes and words for the Word Safari sorting game (Unity, separate repo, separate manager session `_WS_` (ref adcfe0 since its upgrade on 2026-11-17; `_WS_old` 58bb35 and `_WS_Manager_old` are old, never message them);). Vanilla JavaScript ES modules, no build step, no dependencies. Node runs only the dev server, tests and tools.

- `js/`: the app. `model.js` data and indexes, `validate.js` Checks, `caselint*.js` capital rules and allow-list, `export.js`, `store.js`, `dialogs.js`/`app.js` UI.
- `data/wordlist-en.project.json`: the library (8 MB, one record per line, ~62k entries, ~3.2k themes). `data/export/wordlist-game-family.json`: the export the game reads, written by `tools/export-game.mjs`.
- `tools/gen/`: one-off pass scripts (batch375-392.mjs with batchNNN-changes.txt; archived 2026-11-17, ~146 files left), `INVENTORY.md` classifies it.
- `tests/core.test.mjs`: 43 tests.
- Docs: `DESIGN.md` (design record, export format in section 8), `DESIGN-entries.md` (capital and style rules, decisions log), `ISSUES.md`.

## 2. Current status

Done: audit, bug batches, performance E1-E4/E6/E7/E9, I1, I6, I16, T13, `--strict` fails before writing, T1/T7/T15/T18/T23/T24/T25, W2/W5/T17, library batches v375-v395 (W9, T30, I18, T31, I19), E9, I16, T26-T28, tools/gen archive (G1, G4-G6; G2 dropped).

Game side: it pinned v395 on 2026-11-18 (its commit f878b7a; all checks passed); it pins only when Simon asks. The v393+v394 notice and the v395 notice (with the plain-alias result) were sent 2026-11-18 (texts at the end of `tools/gen/batch394-changes.txt` and `batch395-changes.txt`); the correction on its v392 points 1-2 was sent 2026-11-18; send when Simon says. Notices v375-v390 were sent to `_WS_` (v390 sent 2026-11-17; not confirmed read). A combined v391+v392 notice was sent to `_WS_` (adcfe0) on 2026-11-17 (not confirmed read).

In progress: nothing.

Waiting on Simon: deferred W4 (word-family column) and E8. Ruled 2026-11-18: export format is 4 (the v394 notice asks `_WS_` to check its reader and DESIGN.md 8.6); the alias-promotion rule in DESIGN.md 3 stands; draconian stays lowercase.

## 3. Decisions (do not reopen)

- **Capital rules** (DESIGN-entries.md "Single-word names", rules 1-9): a word is written as correctly written for its sense; dictionary rule with tie-break (disagree or "often capitalized" means lowercase); sibling convention when no entry; brand sense gets capital and tm, genericised sense lowercase; tm marks products not companies; wine varieties lowercase unless the name has a proper word; place-named wines capital only when dictionaries do; "names that are ..." themes are uniformly capital. Reason: consistency across 62k entries.
- **Rule 8 (amended):** a root keeps diacritics when at least one major English dictionary prints them (regional ones count: Te Aka, Oxford NZ/AU, DSAE); plain form is kept as spelling alias.
- **Style rule:** style and movement names lowercase unless the word exists only as a name; period names capital.
- **Simon's rulings:** `brazil nut`, `brazil nut tree` lowercase; Balboa [dance] and Bordeaux stay capital; hoover (verb) drops out of the family export, accepted. 2026-11-17 (v392): names-that-are themes keep only words with real given-name use (borderline ones with hundreds of US births or UK use stay); gavi, côtes du rhône, liebfraumilch lowercase; Hawaiian dictionaries (Pukui-Elbert) do not count under rule 8.
- **Allow-list** (`js/caselint-allow.js`): only for links whose capital is intended, each checked.
- **Commits:** verified work goes straight to main without asking; never push.
- **Library versions are batched,** because each pin rebuilds the game's saved levels.
- **Notices to `_WS_`:** Simon decides each send; the game pins only when he asks; never write "please re-pin".

## 4. Open tasks, in priority order

All need Simon's go-ahead first (he approves every library change).

| # | Task | Difficulty | Model |
|---|---|---|---|
| 1 | I20 common words shown capitalised in "names that are" themes (needs Simon) | deep reasoning | Opus |
| 1b | T32 plain spelling aliases for 386 accented roots (rule 8; needs Simon) | standard | Sonnet |
| 2 | E8 (low priority, later: Simon 2026-11-18; tried 2026-11-17, no gain without changing row geometry, so it needs a fixed table layout or fewer rows) | standard | Sonnet |
| 3 | W4 word-family column (deferred by Simon until the game reports a problem) | standard | Opus |

## 5. Subagents

No custom agent definitions exist (`.claude/agents/` absent). All delegation used the built-in `general-purpose` agent with an explicit `model`; none uses `inherit`. Keep passing `model` every time (an unset one inherits the manager's).

- Code fix batch, one writer at a time: **Opus**.
- Library passes, capital or sense judgement, anything a script applies to the library: **Opus**.
- Read-only inventory or bulk listing: **Sonnet**.
- Mechanical lookups: Haiku. Fable only with Simon's permission.
- Built-in `Explore`/`Plan` not used; if used, Haiku and Opus.

## 6. Conventions and gotchas

- Code style is dense: long lines, short names, few comments. Match it.
- Tests: `npm test`. Strict export: `node tools/export-game.mjs --strict` rewrites the committed export; for a scratch path give the preset first: `node tools/export-game.mjs full <path> --strict`, outside the repo.
- Library change workflow: script in `tools/gen` with dry run, then `--apply`; bump version/modified; `npm test`; strict export to scratch; rerun `tools/gen/style-case.mjs` and `propword-exceptions.mjs` (both 0 changes); Checks 0 errors (warnings theme-name 3, long 5, maybe-duplicate 1); regenerate the committed export; commit; draft the `_WS_` notice with index shifts.
- **Before any pass, search git history for Simon's earlier decisions on those words.**
- **Never use port 8100** (Simon's stored library). Use 8141, launch config `wordlist-builder-v2-test`.
- Commit with explicit paths; `git add` untracked files first. Other sessions may edit this tree.
- Bash heredocs and node one-liners mangle backslashes and quotes: write scripts with the Write tool.
- tools/gen was archived 2026-11-17 (restore from `bc6e646`, see INVENTORY.md). `ISSUES.md`: one line per item, fixed items move to the end of their section with the date.
- Browser Preview once showed "case lint: 1 issue" while the CLI said 0; not reproduced, likely a stale browser copy.

## 7. Delegation rules

- Brief: goal, exact files, what is known, hard limits (no commits, files it may touch, port 8141), what done looks like.
- Ask for, per item: what changed, how verified, what was not, choices made. Details go to a file; the reply stays under about 40 lines.
- Review every diff and rerun tests yourself before committing. Up to 5 agents at once; more needs Simon's OK.
- Escalate to Opus for data-safety code, model semantics, capital judgement, or anything a script applies to the library. Rewrite agent-drafted `_WS_` notices: they were vague on index shifts and wrongly asked to re-pin.

## 8. Token-saving notes

- Whole verdict lists, big diffs and library lines printed uncut cost most: pipe through `cut`, `head`, `grep`.
- The two design docs are 90 KB: grep for the section, never read whole.
- Tighten a candidate rule before sending agents (270 of 315 hits were false once).
- Do not repeat a broad audit (about 860k tokens).
- Keep updates short; do not recap long lists Simon has already seen.

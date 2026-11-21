# Project status: handover to the next manager session

Written 2026-11-19, library v422. Read this, then `ISSUES.md`. Do not re-audit: `ISSUES.md` is the audit.

## 1. Overview

Wordlist Builder v2: a browser tool that builds a library of themes and words for the Word Safari sorting game (Unity, separate repo, separate manager session `_WS_` (ref adcfe0 since its upgrade on 2026-11-17; `_WS_old` 58bb35 and `_WS_Manager_old` are old, never message them);). Vanilla JavaScript ES modules, no build step, no dependencies. Node runs only the dev server, tests and tools.

- `js/`: the app. `model.js` data and indexes, `validate.js` Checks, `caselint*.js` capital rules and allow-list, `export.js`, `store.js`, `dialogs.js`/`app.js` UI.
- `data/wordlist-en.project.json`: the library (8 MB, one record per line, ~62k entries, ~3.2k themes). `data/export/wordlist-game-family.json`: the export the game reads, written by `tools/export-game.mjs`.
- `tools/gen/`: one-off pass scripts (batch375-392.mjs with batchNNN-changes.txt; archived 2026-11-17, ~146 files left), `INVENTORY.md` classifies it.
- `tests/core.test.mjs`: 43 tests.
- Docs: `DESIGN.md` (design record, export format in section 8), `DESIGN-entries.md` (capital and style rules, decisions log), `ISSUES.md`.

## 2. Current status

Done: audit, bug batches, performance E1-E4/E6/E7/E9, I1, I6, I16, T13, `--strict` fails before writing, T1/T7/T15/T18/T23/T24/T25, W2/W5/T17, library batches v375-v398 (W9, T30, I18, T31, I19, T32, I20, I21, I22 in-theme pairs v398, kin pilot v399, kin pass v400, salty-foods trim v401), E9, I16, T26-T28, tools/gen archive (G1, G4-G6; G2 dropped).

Game side: it pinned v411 on 2026-11-20 on Simon's word (its commit 0f6c8fb; source wordlist-builder-v2 commit f857237). All its pin checks passed (slim equals full, verify 0, restart test, splitcheck 0, bot in 3 modes, glyphs, compile); wordbreaks rebuilt (18,820 words). Its generator is g23 (a shown text never returns within 5 levels). v411 covers v409 (Julia's branch replayed), v410 (complete sets exact, complete-* checks) and v411 (three set fixes); measured clean against v408. Earlier pins: v408 (305a761), v405 (f7dac62), v397 (45b3f56); versions in between were measured but not pinned on their own. It pins only when Simon asks and wants his yes in its own session. Send each new version's notice to `_WS_` (cc19ae); notice texts are at the end of each `tools/gen/batchNNN-changes.txt`. v412 (one display alias per dialect, alias flags) applied 2026-11-20; v413 (alias links through roots, 44 regional pairs merged) applied 2026-11-20; v414 (wordplay rule strings, alphabetical theme deleted, reversible fixes) and the export change (no alias links) applied 2026-11-20; one notice for v412-v414 at the end of `tools/gen/batch414-changes.txt`, not yet sent; v415 (I27 theme memberships, `tools/gen/batch415-changes.txt`) applied 2026-11-20; v416 (theme ratings vs their words, I30: 27 gaps to 2) applied 2026-11-20; one notice for v412-v416 at the end of `tools/gen/batch416-changes.txt`, sent to `_WS_` 2026-11-20 on Simon's word. Game measured v416 against v411 under g24: clean (no failed levels, same mean difficulty, fewer pick and word-phase losses, more distinct themes); silly rhyming pairs now 0/4/4 per 2,000 levels, silly-sounding words 8/13/3 (lang bit not a factor). Words shown under their strict-synonym alias text rose 1/1/0 -> 2/7/8, expected from the v412 and v415 synonym aliases (game: not a fault). Pinned by the game 2026-11-20 on Simon's word (game commit 93f68c6, library commit 1222b4c, g24; all pin checks passed). v417 (Theodore and Teddy Roosevelt no longer sensitive, I31) applied 2026-11-20, pinned by the game on Simon's word (game afbaf4b, library e827fdc, g25); game g25 (e1eb544, on v416) holds sensitive words to its sensitive start level, 31, instead of dropping them; first sensitive word at level 36-37; places of worship, religious festivals and religion now play. v418 (42 drinks adult -> sensitive only, Simon) applied 2026-11-20, notice sent to `_WS_` 2026-11-20 on Simon's word; measured clean against v417 under g25 (no sensitive word below level 31; alcoholic drinks 14/3/2 per 2,000 levels, first at level 132/550/897; theme-pick retries up, no failures); pinned by the game on Simon's word (game 0f0a4ea, library e615940, g25); v419 (11 drink themes adult -> sensitive, Simon) applied 2026-11-20, notice in `tools/gen/batch419-changes.txt`; v420 (73 spelling-alias familiarity fixes, Simon) applied 2026-11-20; one v419+v420 notice sent to `_WS_` 2026-11-20 with Simon's request to pin v420 ("update game and ask it to pin latest"); pinned by the game 2026-11-20 (game 90a7cf0, library 0385d54, g25; measured clean against v418, first drink theme at level 33/34/76); alcoholic drinks now exports and plays from level 31. v421 (senses clean-up, Julia, branch julia-category-fixes-2) merged 2026-11-21 on Simon's word; v422 (difficulty spread of words for noise and eyesight, Simon "Fix the spread and merge it") applied 2026-11-21; notices for v421 and v422 at the end of `tools/gen/batch421-changes.txt` and `batch422-changes.txt`, sent to `_WS_` together 2026-11-21 on Simon's word (with the I34 zipf fix); measured clean against v420 under g25 (eyesight 13/13/4 -> 5/4/1 and hearing words 10/15/12 -> 1/6/1 per 2,000 levels: they appear less often, not looked into, Simon accepted for now); pinned by the game 2026-11-21 on Simon's word (game baa2d70 on its branch regional-words-g17, library 20c0c1d, g25; compare, verify, splitcheck and failed all 0, bot passes in 3 modes). Game g24 (be895a3) reads no-vowels, roman, reversible, curated; regional band raise; any-root lookup. The game's answers on wordplay rules, root regions, text lookup and alias links: `tools/gen/ws-questions-2026-11-20.md` (Simon to decide).

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
| 1 | E8 (low priority, later: Simon 2026-11-18; tried 2026-11-17, no gain without changing row geometry, so it needs a fixed table layout or fewer rows) | standard | Sonnet |

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
- Library change workflow: script in `tools/gen` with dry run, then `--apply`, rerun to 0 changes; bump version/modified; regenerate the committed export; `npm run gate` (tools/gate.mjs: `npm test`, Checks 0 errors, warnings within `tools/checks-baseline.json` (theme-name 3, long 5, maybe-duplicate 1, clash-big 1, alias-flags 19, theme-name-long 0, complete-extra 0, complete-missing 0) and none new by identity, strict export, export contract (GAME-CONTRACT.md; warnings baselined: contract-root-region 1802, contract-dup-root 186, contract-alias-dialect 71, contract-type-common 43, contract-rule-unknown 15, contract-thin 6), changed entries status `rev` and rule 8 plain aliases on the diff, raised baselines or allow-list keys flagged "needs Simon's approval", `style-case.mjs` and `propword-exceptions.mjs` 0 changes, committed export current, version bumped, changed batch reruns to 0); commit (the pre-commit hook `.githooks/pre-commit` runs the gate with `--staged`; CI runs it too; a Claude Code hook blocks hand edits of `data/` library and export files and `--no-verify` commits); draft the `_WS_` notice with index shifts. Raising a baseline count is an explicit edit of `tools/checks-baseline.json`, with Simon's OK.
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

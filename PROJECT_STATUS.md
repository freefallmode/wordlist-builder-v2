# Project status: handover to the next manager session

Written 2026-11-15, updated at commit `a116a9c`, library v374, clean tree. Read this, then `ISSUES.md`. Do not re-audit: `ISSUES.md` is the audit.

## 1. Overview

Wordlist Builder v2: a browser tool that builds a library of themes and words for the Word Safari sorting game (Unity, separate repo, separate manager session `_WS_`). Vanilla JavaScript ES modules, no build step, no dependencies. Node runs only the dev server, tests and tools.

- `js/`: the app. `model.js` data, `validate.js` Checks, `caselint*.js` capital rules, `export.js`, `store.js`, `outline.js`, `app.js`/`dialogs.js` UI.
- `data/wordlist-en.project.json`: the library (8 MB, one record per line). `data/export/wordlist-game-family.json`: the export the game reads, written by `tools/export-game.mjs`.
- `tools/gen/`: one-off pass scripts, briefs and their data (`INVENTORY.md` classifies it).
- `tests/core.test.mjs`: 26 tests.
- Docs: `DESIGN.md` (design record), `DESIGN-entries.md` (capital and style rules, decisions log), `ISSUES.md` (72 open, 22 fixed).

## 2. Current status

Done: baseline audit, bug batches, case lint in Checks, proper-word pass (v371), style rule (v374), B12/B14/B15/B18/B19/B20/B22/B23/B24, D1-D12, E1-E4 and E6 (incremental indexes, in-place table patching), I1 and most of I16, `--strict` now fails before writing, U1/U4/U5 (U2/U3 partly), T1/T7/T15/T18/T23/T24/T25. Library is now v389 (batches 375-389, scripts tools/gen/batch375-389.mjs; the nine single-word capital rules are in DESIGN-entries.md "Single-word names"). The game contact is the local session `_WS_` (58bb35); it has the v375-v380 notices; the v381-v389 notice was SENT 2026-11-16 (not confirmed read). Nothing pinned. The game pinned v389 on 2026-11-16 (game commit 2ad66b4, from our export 19d2895; all its checks passed; v379-v388 included). Two gaps reported by `_WS_`: a Māori word shown without macron ("Maori") and plain "doner" shown in one theme beside "döner kebab" (under investigation: tools/gen/investigate-maori-doner.txt).

In progress: nothing. Waiting on Simon: T13, T17, W2, W4, W5, what to archive in `tools/gen` (G1, G2); whether to bump export format version 3 (needs `_WS_`); confirm the alias-promotion rule (DESIGN.md section 3); `_WS_` to check the pinning text in DESIGN.md 8.6; hoover: accept it is not in the family export, or give it another link; unverified rule-9 words (Gavi, Côtes du Rhône, Liebfraumilch).

## 3. Decisions (do not reopen)

- **Capital rule:** a word is written as it is correctly written for its sense. A phrase with a proper word keeps that capital and is typed `proper` (French fries). Simon's rule from earlier sessions.
- **Style rule:** style and movement names are lowercase unless a word exists only as a name (gothic, baroque lowercase; Victorian, Bauhaus capital). Period names stay capital as separate entries. Simon delegated the rule; full text in `DESIGN-entries.md`.
- **Simon's exceptions:** `brazil nut`, `brazil nut tree` lowercase. Kept by `tools/gen/propword-exceptions.mjs`.
- **Allow-list** (`js/caselint-allow.js`) is for links whose capital is intended, after checking each.
- **Commits:** verified work goes straight to main without asking; never push.
- **Agents:** up to 5 at once without asking; more needs Simon's OK.
- **Library versions are batched,** because every pin rebuilds the game's saved levels.

## 4. Open tasks, in priority order

| # | Task (ISSUES.md ids) | Difficulty | Model |
|---|---|---|---|
| 1 | E7: Language & Wordplay with sub-themes still opens in 340-420 ms (labels and sort keys computed for 8,017 words before the 500-row cap); I16 Zipf-only-if-ticked; I6 dropped theme names and same-text drops not listed in the Export dialog | standard | Sonnet |

## 5. Subagents

No custom agent definitions exist (`.claude/agents/` is absent). All delegation used the built-in `general-purpose` agent with an explicit `model`:

- Code fix batch, one writer at a time: **Opus**.
- Read-only audit or judgement pass over word lists: **Opus**.
- Mechanical inventory or bulk listing: **Sonnet**.

Flag: an Agent call with no `model` inherits the manager's model. Always pass `model`. Built-in `Explore` and `Plan` were not used; if used, set Haiku for `Explore`, Opus for `Plan`.

## 6. Conventions and gotchas

- Tests: `npm test`. Strict export: `node tools/export-game.mjs --strict` (rewrites the committed export; give an output path to avoid that).
- **Never use port 8100** (Simon's stored library). Use 8141, launch config `wordlist-builder-v2-test`.
- Code style is dense: long lines, short names, few comments. Match it.
- Library change workflow: script in `tools/gen` with a dry run, then `--apply`; run tests and the strict export; then rerun `tools/gen/style-case.mjs` and `tools/gen/propword-exceptions.mjs` (both must print 0 changes); commit; message `_WS_` with version, changes, what to check.
- **Before any pass, search git history for Simon's earlier decisions on those words.** The proper-word pass reversed `brazil nut` by not doing this.
- Commit with explicit paths (`git commit -- file ...`); other sessions may edit this tree.
- Bash heredocs mangle backslashes: write scripts with the Write tool, not `cat <<EOF`.
- `tools/gen/propword-apply.mjs` is spent; rerunning it reports problems.
- `ISSUES.md`: one line per item; fixed items move to the end of their section with the date.

## 7. Delegation rules

- Brief: goal, exact files, what is already known, hard limits (no commits, files it may touch, port 8141), what done looks like.
- Ask for, per item: what changed, how it was verified, what was not, choices made. Details go to a file; the reply stays under about 40 lines.
- Review every diff and rerun tests yourself before committing.
- Escalate to Opus for data-safety code, model semantics, capital judgement, or anything a script applies to the library.

## 8. Token-saving notes

- The four audit agents cost about 860k tokens. Do not repeat a broad audit.
- Whole verdict lists, the 400-line inventory and full diffs in the manager's context were costly: pipe through `cut`, `head`, `grep`; never print library lines uncut.
- The two design docs are 90 KB: grep for the section, do not read them whole.
- A loose candidate rule wastes an agent (270 of 315 were false hits): tighten it first.

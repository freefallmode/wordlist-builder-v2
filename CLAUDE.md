# Wordlist Builder v2: rules for Claude sessions

A browser tool and its word library for the Word Safari game. Node, vanilla ES modules, no npm dependencies.
Library: `data/wordlist-en.project.json` (8 MB, one theme or entry per line). Game export: `data/export/wordlist-game-family.json`.

## Read first

- LIBRARY-RULES.md: read before generating or editing any words or themes.
- `PROJECT_STATUS.md`: current state, the library change workflow, delegation rules, warnings baseline.
- `DESIGN.md`: design record; section 6 lists the check kinds, "Enforcement" the gate.
- `DESIGN-entries.md`: word families, synonym groups, forms, the capital (case) rule, decisions log.
- `ISSUES.md`: known problems, one line each. Log new ones there and tell Simon.
- The word-family, case, theme-name and complete-set rules live in DESIGN-entries.md and DESIGN.md. Grep for the section; never read those docs whole.
- Before any pass on words, search git history for Simon's earlier decisions on them.

## Changing the library

1. Simon approves every library change before it is applied.
2. Changes go only through a script `tools/gen/batchNNN.mjs` (the next number; copy the shape of the latest one): dry run first, then `--apply`, then rerun to 0 changes. Check the `--out` draft with `npm run check -- <file> --diff data/wordlist-en.project.json` before `--apply`.
3. Every entry the batch touches gets status `"rev"`. The version is bumped (`stampSave`, as `--apply` does).
4. Regenerate the export: `node tools/export-game.mjs`.
5. `npm run gate` must pass before the commit. The pre-commit hook runs it again (`--staged`) and CI runs it on main.
6. Write the notice `tools/gen/batchNNN-changes.txt` (what changed, index shifts). Sending it to the game session, and any pin, happen only on Simon's word.

Raising a warning count in `tools/checks-baseline.json` is an explicit edit that Simon approves. Lower it when a batch removes warnings.

## Never

- Hand-edit `data/*.json` (a hook blocks it). Use a batch script.
- Read the library whole: grep it, or load it in a script with `parseProject` and `reindex`.
- Use port 8100 (Simon's stored library in the browser). Use 8141, launch config `wordlist-builder-v2-test`.
- Commit with `--no-verify` or `-n` (a hook blocks it while `data/` has changes).
- Push unless Simon says so.

## Handy

- `npm run check -- [file] [--diff <other>] [--kind <k>] [--export] [--json]`: the gate's Checks (errors, warnings against `tools/checks-baseline.json`) on a draft library, default the real one; exit 1 on an error or a kind over its baseline; `--diff` shows only issues new compared with another file (kind + message + location). Code shared with the gate: `tools/checks-core.mjs`.
- `npm test`, `npm run gate`, `node tools/gate.mjs --base HEAD~1`.
- One-time per clone: `git config core.hooksPath .githooks`.
- Write scripts with the Write tool: shell heredocs and node one-liners mangle backslashes and quotes.

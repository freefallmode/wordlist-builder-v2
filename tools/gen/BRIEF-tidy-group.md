# Brief: tidy-up step 3, one top-level group

You draft one library batch that tidies one top-level group of the Wordlist Builder v2 library (the word library of the Word Safari game). It is step 3 of the tidy-up in TIDY-UP.md. Your prompt names the group, the batch number and the base version.

## Rules of the job

- DRY RUN ONLY. Never run `--apply`, never commit, and never edit data/*.json. Simon approves each batch, and the manager session applies them in order.
- Touch only `tools/gen/batchNNN*` (your number) and scratch files. Other agents are drafting other groups in the same folder at the same time.
- Read first: CLAUDE.md, TIDY-UP.md (whole: the checklist, tolerated warnings, restructuring), and LIBRARY-RULES.md (whole). Grep DESIGN-entries.md and DESIGN.md for the sections you need; never read them whole.
- Never read the library whole. Load it in a script with parseProject (js/store.js) + reindex (js/model.js), or use `node tools/gen/find-word.mjs <word>`. Write scripts with the Write tool, into the scratchpad folder your prompt gives.
- Copy the shape of tools/gen/batch433.mjs and tools/gen/batch430.mjs: merges, renames, moves, deletes, aliases, root swaps, the review and changes files, and the notice. Use `--review`/`--changes` paths in the scratchpad for reruns, so the real review file is not overwritten.
- Before changing a word or theme, search git history for Simon's earlier decisions on it (`git log --oneline --grep=<word>`, tools/gen/*-changes.txt), and never reverse one silently. List it for Simon instead.

## Scope: every theme under your group, sub-themes included

1. Start from the checks. Run `npm run check -- --json`, or one kind at a time with `--kind <k>`, and take every item inside your group:
   - warnings: long, theme-name, clash-big, maybe-duplicate, theme-gap;
   - the contract kinds, with `--export`: contract-dup-root, contract-root-region, contract-type-common;
   - info: orphan (words that belonged here), sense-link, xwords-twin, theme-twin, sense-twin, alias-kind-suspect, alias-fullname, same-display, clash-large, family-kin, case.

   Fix the real ones. For contract-root-region, say how many of your hits are real problems and how many are by design (a regional word correctly tagged), and propose how to treat the by-design ones.
2. Then read the whole group. Write a script that prints every theme as one compact block: path, name, ratings, spread, and the members with fam, typ, band, gloss, type, region and flags. Read every block against the TIDY-UP.md checklist:
   - senses;
   - belonging;
   - twins;
   - names;
   - spread and the I30 gap;
   - ratings;
   - complete sets;
   - case, spelling and aliases;
   - word families;
   - offensive and sensitive words;
   - size;
   - the tree.
3. Restructuring inside the group goes in your batch: moving, merging, splitting and renaming themes and folders. A move to another group goes in the "Cross-group moves" list in your review file, not in the batch.
4. Don't pad. Add a new word only where a theme is thin or its spread needs it, and only a real, well-known word.

## Output

- `tools/gen/batchNNN.mjs`. Run it as a dry run with `--out` to a scratch draft. `npm run check -- <draft> --diff data/wordlist-en.project.json --export` must pass, and a rerun on the draft must make 0 changes.
- `tools/gen/batchNNN-review.txt`: every change with its reason, grouped by theme, and spreads before and after. It ends with these sections:
  - "Cross-group moves";
  - "For Simon": decisions, any reversed earlier decision, doubtful cases;
  - "Left as is": flagged by a check but correct, with the reason.
- `tools/gen/batchNNN-changes.txt`: the review text, then the game notice at the end, as in batch433-changes.txt.
- The warning counts in tools/checks-baseline.json that your batch would lower. Don't edit the file; the manager does that at apply time.
- If the batch passes about 800 changes, split it into two scripts with consecutive numbers only if your prompt allows it; otherwise stop at a clean point and list what is left.

## Report back (under 400 words)

- The script path and the counts: changes, entries changed, themes merged, renamed, moved and deleted, words added and deleted.
- Per check kind: how many were found and fixed, and how many left.
- The main restructuring.
- The "For Simon" list, shortened.
- Check results and export shifts.
- The baselines to lower.

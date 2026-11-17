# tools/gen inventory

What is left in tools/gen after the archive pass of 2026-11-17 (library v392, commit bc6e646), and why. Everything else is in git history (see the last section). Earlier version of this file (the full audit of v366, with a row for every file): `git show bc6e646:tools/gen/INVENTORY.md`.

## Pipeline scripts (live; read only `js/` and `data/`)

| script | use |
|---|---|
| audit-make / audit-apply | single unlabelled entries in unrelated roots; reads and writes recon/audited-ids.json, recon/audit-in/out-N.json |
| find-word | shows existing entries of a text (named in BRIEF-depth3, BRIEF-rest, REPAIR-BRIEF) |
| lint-show | case-lint checker (named in CAPITAL-RULE and the creation briefs) |
| list-depth, list-topup | list a depth-3 / rest chunk, thin themes (T8: list-topup and stats still read the retired `t.d`) |
| near-dups2, near-fix | near-duplicate pairs in a theme, fold reviewed pairs into aliases |
| rec-make / rec-apply | recognisability review of names; state in rec/done.json; tools/apply-words.mjs points at both |
| recon-make / recon-apply | same-text groups for reconcile (recon/BRIEF.md) |
| stats | library summary |
| syn3-make / syn3-apply | synonym groups; the depth3 and topup briefs point at them for later runs (write/read syn3/, which is now empty and recreated on a run) |
| style-case, propword-exceptions | the two idempotent checks run after every library change (both must report 0 changes) |
| batch375 to batch392 (.mjs and -changes.txt), evidence392-*.txt | recent library batches and their evidence; the newest are in use |
| animals.mjs, food-drink.mjs | worked examples of finished batches, named by BRIEF-depth3 |
| ident-make / ident-apply, regtag-make / regtag-apply | scripts of the two current briefs below |
| starts-cands, ends-cands | write starts/ and ends/ candidate lists for the starts-with and ends-with briefs |

## Briefs

Current: BRIEF-depth3, BRIEF-rest, BRIEF-topup, BRIEF-rec, BRIEF-ident, BRIEF-regtag, CAPITAL-RULE, brk/BRIEF-brk, recon/BRIEF, recon/AUDIT-BRIEF.
Kept, unclear whether wanted again (G7): BRIEF-starts-with, BRIEF-ends-with, recon/REPAIR-BRIEF, easy/BRIEF-easy.

## State and lists

- rec/done.json (read by rec-make and apply-words), recon/audited-ids.json (read by audit-make), brk/in-N.txt and out-N.txt (read by tools/brk-merge.mjs).
- done.json of passes that could be rerun: regtag, regrec, pos, syn, pop, leak/kept-done.json. The make/apply scripts of regrec, pos, syn, pop and leak are archived, so these are only records unless a pass is rebuilt.
- Top-level lists nothing reads (G7): alias-extra-list.md, connections-titles.txt, inflection-dups-list.md, long-names-list.md, nameok-list.txt.
- leak/.gitignore (ignores `.scratch-*`).
- tools/gen/.tmp/ is untracked scratch (56 MB of old library snapshots); not part of the repository.

## Archived 2026-11-17 — restore with `git checkout bc6e646 -- <path>`

1,393 tracked files, 25.6 MB (the list is in the commit that records the deletion; any path also works from `git show bc6e646:tools/gen/<path>`).

- Applied batch modules: d3-*.mjs (67), d45-*.mjs (25), t-N.mjs (24), r-*.mjs (9), easy/easy-N.mjs (5), the level-2 root batches (arts_entertainment, history_myth, home_everyday, language_wordplay, nature_earth, people_society, places_geography, qualities, science_tech, sports_games, travel_transport, body_health, onion-varieties).
- About 190 one-off and unreferenced top-level scripts: the *-make / *-apply / *-fix pairs of finished passes (capmark, compound, disp, disp2, ease, full, ends, starts, ident-compare, kind, leak, lone, overlap, pop, pos, propword, regalias, regrec, rename, shortmem, split, syn, wordplay, and others), case-fix 1 to 5, caselint-fix 1 to 5, caselint-allow.mjs, case-scan, org-scan, spelling-flip, show-migrate, show-leftovers, pos-lib and the rest (G4 included: syn2/apply.mjs, syn2/loose-ends.mjs, caselint-allow.mjs, propword-apply.mjs).
- Inputs, answers, logs and reports of finished passes, by directory: aliaslinks, bare, bare2, brk (bad.txt, tokens.txt only), capmark, complete, compound, disp, disp2, ease, easy (all but BRIEF-easy), ends, full, full2, full3, ident, ident2 (with BRIEF-ident2, BRIEF-ident3), kind, leak (all but kept-done.json and .gitignore), lone, long, overlap, overlap2, overlap3, pop (all but done.json and metrics.mjs), pos (all but done.json), propword, rec (list/r files), recon (in/out and audit-in/out files), regalias, regrec, regtag (list/r files), rename, shortmem (candidates.json 4.4 MB), shortmem2, split, starts, ends, syn, syn2, syn3 (list and s files).
- Superseded and finished-pass briefs: BRIEF-bare, capmark, compound, disp, disp2, ease, full, kind, leak, leak2, leak3, leak4, lone, long, modifier, overlap, overlap2, overlap3, overlap-sample, pop, pop2, pos, pos2, propword, regalias, regrec, rename, shortmem, shortmem2, split, syn, syn3.
- Accidentally tracked (G5): pos/.scratch-2.json.pos-done.json, pos/.scratch-3.json.pos-done.json, brk/bad.txt.

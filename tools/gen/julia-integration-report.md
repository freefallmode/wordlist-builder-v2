# Integration report: branch `origin/julia-category-fixes` into main (v408)

2026-11-20. Read-only analysis. Nothing on main was changed. Scratch work (diff scripts, a dry-run replay on a copy of v408) is in `C:\Users\simon\AppData\Local\Temp\claude\julia\`.

## 1. What the branch does

The branch forks from main at f5d7ddf (v365). It has 8 commits (v366-v382) and runs 17 scripts. None of its scripts uses an entry id it created itself. The fix scripts use v365 ids, which still mean the same entries on main, with the two exceptions in section 2.

| Commit | Library | Topic | Themes | Entries | Links |
|---|---|---|---|---|---|
| C1 044d841 | v366 | Clean-up 1 (`tools/gen/category-fixes-1.mjs`): drops wrong state synonym groups (US, Mexico, Germany); unlinks the temperaments and doctors from four humours; moves the nickname-theme links from coffee/tea/firefighter/electrician/carpenter to their regional aliases joe/char/firie/sparky/chippy; unlinks felony from wrongdoers; merges 13 duplicate themes; moves penguins under flightless birds and poetry forms under literature | -13 deleted, 8 changed | Bondi deleted; 46 nameOkIn/show cleaned | 168 |
| C2 91bde19 | - | Category research (`tools/gen/category-research/`) | - | - | - |
| C3 c3a43b5 | v367-368 | Kitchen: bakeware, kitchen linens, food storage | +3 | +17 (4 aliases) | 47 |
| C4 b672dd1 | v369-371 | Ancient Greece: Greek buildings, Greek city-states, ancient Greek writers, Greek goddesses, Greek myth objects; Greek landmarks split | +5 | +9 | 85 |
| C5 577f896 | v372-374 | Outdoor: s'mores, hiking snacks, hiking dangers, bike gear; more climbing styles | +4 | +17 (3 aliases) | 66 |
| C6 0039aa1 | v375-376 | Hard outdoor: climbing holds, bike tricks, bike park | +3 | +29; 7 existing homographs given glosses | 40 |
| C7 0187038 | v377-379 | Environment: 5 renames ("pollution words" to "pollution" and so on); 7 new themes; green living becomes a folder; renewable sources and buried fuels merged | +7, -2, 7 changed | +32 (2 aliases) | 257 |
| C8 2cfd779 | v380-382 | Earth science: 10 renames; 3 new themes; volcano types and rainforest layers re-parented | +3, 11 changed | +5; conduit glossed | 170 |

Totals, v365 to v382:
- **Themes:** 25 added, 15 deleted, 26 modified. The modifications are 16 renames, 4 re-parents, 1 theme turned into a folder, 4 notes and 19 synonym-group edits.
- **Entries:** 109 added (100 roots and 9 aliases), 1 deleted, 73 edited (57 nameOkIn, 51 show, 8 gloss).
- **Links:** 833 changed.
- **Other files:**
  - `data/breaks-en.txt`: 13 new lines.
  - `data/export/wordlist-game-family.json`: regenerated.
  - `tools/gen/category-research/`: 5 new files.
  - `js/`, `README.md` and the `DESIGN` docs are not touched.

## 2. Comparison with main v408

### Already on main

- **colours named after fruit:** merged into fruit shades in v407. Main did it better: it linked the colour-sense entries (lime #7683, olive #7694 and the colour orange). Drop the branch's 3 links of the fruit senses (75, 76, 360) to `fruit_shades`.
- **earth_s_layers:** v406 renamed it "Earth's four layers", the same name the branch chose.
- **13 link removals:** done on main through the deleted theme.

Nothing else is on main. Main created **no new themes** after v365. Of the branch's 869 link intents (text + gloss + theme), a dry-run replay on v408 reproduced **865**. The 4 that differ are the 3 superseded fruit_shades links and Aegis, which main lowercased to "aegis" and which still gets linked.

### Id collision

All 109 new ids on the branch (67399-67507) are different entries on main, for example #67399 is Ruby and #67467 is Persephone. Never merge or cherry-pick `data/wordlist-en.project.json` or the export.

### Conflicts with main decisions (need Simon)

| # | Branch change | Main since v365 | Suggestion |
|---|---|---|---|
| 1 | Deletes bear_types | v407 review: "bears / bear_types ... kept" | Keep it (main's decision), or Simon reverses it |
| 2 | Merges animals_with_a_poisonous_bite into venomous snakes. It moves 0 words and leaves out gila monster, copperhead and sidewinder | v406 renamed it "venomous biters" (Simon approved the name) | Simon decides. If merged, copperhead and sidewinder must actually move |
| 3 | Unlinks melancholy, melancholia, choleric, melancholic, phlegmatic, sanguine, Hippocrates and Galen from four humours | v398 (family rule) grouped them: groups `[4023,4024,15551,15554]`, `[15549,15550,15553]` | Julia is right on the facts: a temperament is not a humour, and the theme is a complete set of four. Take it if Simon agrees, and drop the v398 groups with it |
| 4 | Links peanuts, raisins and dried apricots to hiking snacks | I23 made them **form** aliases of peanut, raisin and dried apricot. Linked directly, they raise the `alias-link-kind` warning | Link the root and set `use[hiking_snacks]` to the alias |
| 5 | Unlinks el nino and la nina (#31135, #31136) from climate change | I23 merged them: the ids are now aliases 67515 and 67516, and the root is El Niño #2038 / La Niña #2040 | Unlink the roots 2038 and 2040 instead. The dry run needed this patch |
| 6 | Turns green living into a folder and drops refill and refillery from it | v398 grouped refill and refillery; they are kin of refillable | Fine. refillery is left with no theme (see 7) |
| 7 | **85 entries are left with no theme** (Julia kept them in the library), for example temblor, megathrust, MRF, SSSI, Larderello, climate change, water cycle, solar, wind | Main has 130 such orphans and v408 tidied some | They drop out of the export. Simon decides: leave them, delete them, or relink the good ones. Many are the old theme's own name, which the rename now gives away |
| 8 | Links regional aliases (joe, char, firie, sparky, chippy) directly to the nickname themes | Allowed on main: regional aliases may hold links. No warning | Take it |
| 9 | Galapagos penguin: removes its `show` value in penguin_species | v390 changed the shown text to "Galápagos" | No conflict. The key goes with the deleted theme |

### Theme-name rules (v406: entry case rule, soft limit 24, hard limit 30)

All 25 new names are 7-21 characters and lowercase except proper words ("Greek ...", "ancient Greek writers"). All 16 renames are 24 characters or fewer, and none clashes with an existing main name. Near-duplicates to review:
- **"Earth's layers"** (the rename of "layers of the Earth") is the parent of main's **"Earth's four layers"**. The two names are almost identical.
- **Greek goddesses:** 19 of its 20 words are also in Greek gods (its parent).
- **Overlaps with other themes:**
  - eco_* themes with green living;
  - protected areas with conservation;
  - pollution types with pollution;
  - geothermal wonders with geothermal features;
  - soil layers with soil types.

  All are parent/child pairs, a kind v408 keeps.
- **Renamed themes sharing an entry's text:** "climate change", "erosion", "pollution", "water cycle". The branch unlinked those entries, which follows the is-theme-name rule.

### New words compared with main entries (Simon: link an existing entry instead of making a duplicate)

- **Exact matches:** none of the 109 matches a main entry with the same text, gloss and type.
- **Spelling or form variants already on main:**

| Branch new | Main entry | Suggestion |
|---|---|---|
| knee pads | kneepads #24462 (work clothes) | Same thing: link #24462 to bike gear. Make "knee pads" a spelling alias of it, or leave it out |
| multi-tool | multitool #25623 | Same: link #25623 and add the spelling alias "multi-tool" |
| wall ride (bike park) | wallride #48037 (skateboard trick) | Same move: link #48037. "wall ride" becomes a spelling alias. Re-gloss it as a trick |
| manual (bike trick) | manual #48023 (skateboard trick) | Same move (a wheelie balance): link #48023 and re-gloss it "trick" |
| helmet (cycling) | helmet #20685 (armor; it is already in protective gear and sports equipment), #48702 (climbing) | The same sense as #20685 used for sport: link #20685 rather than a third helmet. Simon decides |
| pump (tire) | pump #7389 (machine) | A bike pump is a pump. Simon decides between linking #7389 and keeping a separate sense |
| lights (bicycle) | light #27963 (illumination) | Same sense, plural: link #27963 with `use` → a form alias "lights" |
| bunny hop, can-can, tabletop, skinny, step-down, rock garden, edge, pocket, pinch, volume, flake, jib, drop, derrick, conduit, flank, deposition (court) | Existing entries with other senses | Real homographs: keep them as new entries. The branch's glosses for the existing entries (8 edits) still apply |

Per Simon, new words go only into Julia's themes. The plan adds no other links.

### Word families (rule 3.7)

After the replay, `family-pair` (warn) does not fire. `family-kin` gives 29 suggestions (info). The real pairs, to confirm as kin:
- recycling / recycle
- thrifting / thrift
- gusher / gush
- stoppie / stop
- deposition (court) / deposit
- lights / light, if lights stays a separate entry

The rest are noise: skinny/skin, edge/edgy, flank/flanker, drop/dropper. Two clash groups grow past 8 (12: reusable bag and the others; 10: bike lock and the others), both within the allowed 12.

### Other checks (dry run, compared with v408)

- New warnings:
  - `alias-link-kind` ×3: see conflict 4.
  - `case-lower-proper-word` "alpine climbing": add it to LOWER_OK, since "alpine" is not a name here.
- New errors: none.
- New infos:
  - 86 orphans;
  - 29 family-kin;
  - 43 overlap;
  - 1 rating-vs-zipf: "can-can (bike trick)" fam 5. Its zipf is high only because of the dance sense, so ignore it.

## 3. Non-library changes

| File | Verdict |
|---|---|
| `tools/gen/category-research/*` (README, ranking.md, sources.tsv, compared.tsv, compare.mjs) | Useful, and nothing conflicts (the folder is not on main). It holds category names only. Take it, then rerun `compare.mjs` against v408, because `compared.tsv` was measured on v365 theme names |
| `data/breaks-en.txt` (+13: ariadne's, bakeware, earthquakes, hexafluoride, industry, plutarch, prismatic, recyclables, rockfall, roughneck, sidepull, tailwhip, thrifting) | None of these is on main. Take them; they add lines without touching others |
| `data/export/wordlist-game-family.json` | Drop it. Regenerate after the replay |
| `tools/gen/julia/*.mjs`, `tools/gen/category-fixes-1.mjs` | Keep them as the record and the source of the replay (the data modules use the `tools/apply-words.mjs` format and are text-based). Do not run them unpatched |
| js/, docs | Not changed on the branch, so nothing to take |

## 4. Integration plan

**Do not merge.** Replay Julia's intent by text on top of v408, as **one library batch, v409**. One version per batch suits the game, which pins whole exports.

1. Write `tools/gen/batch409.mjs` in the style of `batch408.mjs`: dry run by default, `--apply`, a changes file and a review file, and the export comparison. It reuses Julia's modules in memory:
   - **a. Clean-up 1**, with these patches:
     - skip the colours merge;
     - no bear_types delete and no venomous-biters merge unless Simon says so;
     - four humours as Simon decides.
   - **b.** Create the 25 themes (her `*-themes.mjs`, renames included).
   - **c.** Load her words through `apply-words` logic with these changes:
     - the 7 variant cases above link the main entry, no new duplicate;
     - plural form aliases go through `use`.
   - **d.** Her fix steps, with El Niño and La Niña patched.
   - **e.** Status `rev` on every entry touched (about 730) and on new entries.
   - **f.** One `stampSave`.
2. Run the checks and fix new warnings: LOWER_OK for alpine climbing, `use` for the 3 form aliases.
3. **Enrichment pass** (an Opus agent per theme cluster; see 4.1 and 4.2).
4. Run the line-break pass for the new long words (`tools/brk-tokens.mjs`, BRIEF-brk, `tools/brk-merge.mjs`) and add her 13 lines to `breaks-en.txt`. Run the `rec` review (rec-make/rec-apply) for the new names. Run `regtag` for the 25 new themes.
5. Regenerate the export and draft the v409 notice to the game. Commit.

**Size (dry run on v408):**
- **Themes:** +25, -14 (-12 if bear_types and venomous biters stay), 26 modified.
- **Entries:** +109 (about 101 after the variant links), 1 deleted, 73 edited. About 730 entries touched.
- **Links:** about 817 changed: 375 added, 442 removed.
- **Export:**
  - themes 3224 → 3235 (+11);
  - **theme indexes shift from index 192** (kitchen utensils → bakeware);
  - rows 61029 → 61049, and **row positions shift from row 26379** (spa #28453, a new orphan);
  - links 109262 → 109208;
  - new entry rows come after the end at the old v408 position (ids from 67956).

### 4.1 Entry fields to today's standard (what the branch has, what is missing, how to fill it)

| Field | On the branch's new entries | Main standard since v365 | How to fill it |
|---|---|---|---|
| fam | All set by hand (1-5) | Set at generation, checked by `rating-vs-zipf` against `data/freq-en.txt` | Opus review (4.2) |
| typ (rating in theme) | All set, one theme each | Same | Opus re-judge per theme (4.2) |
| type | Set: proper, place, person, acronym where needed | Same, plus the case lint | Case lint gives 1 fix |
| gloss | On all 21 new homographs; 8 existing entries re-glossed | Gloss when the text is ambiguous | Done. Re-check the 7 variant cases |
| region | 10 entries (UK/US) | Same | Opus spot check |
| tm | All false | Same | Opus spot check (none looks like a trademark) |
| aliases | 9 (7 regional, 2 spelling) | Form aliases for grammatical forms, I23 | Add "lights" and the spelling aliases from the variant table |
| show / use / nameOkIn | show on 11, nameOkIn on 1 | `use` for a form a theme needs | 3 `use` fixes (conflict 4) |
| synonym groups | 11 of the 25 new themes have some | Rule 3.7 groups | Opus check per theme |
| kin | None | 4,772 entries carry kin | About 5 pairs, confirmed by Opus from the `family-kin` list |
| status | `gen`; touched entries not `rev` | Every batch-touched entry `rev` | The batch script |
| rec, breaks, theme regtag | Not done | Main tooling | `rec-make`/`rec-apply`, the brk tools, `regtag` |

**Tools:**
- `tools/apply-words.mjs` (the same row format as the generation schema in `js/ai.js`);
- `js/validate.js` checks: case lint, rating-vs-zipf, family-pair and family-kin;
- `js/family.js`;
- the rec, regtag and brk tools.

Only the judgement calls go to Opus.

### 4.2 Ratings

- **fam:** Main sets fam at generation, and the check is `rating-vs-zipf` (zipf from `data/freq-en.txt`). Julia's new roots fit main's distribution:

  | Zipf band | Main (fam 1/2/3/4/5) | Branch |
  |---|---|---|
  | B | 3072 / 5055 / 4856 / 3079 / 1281 | 8 / 14 / 13 / 10 / 2 |
  | D | 64 / 463 / 2604 / 4681 / 3895 | 0 / 0 / 3 / 6 / 1 |

  The one flag is a homograph and can be ignored. No rating-scale change was found since v365.

  Proposal: an Opus pass reads each new root next to 3-5 similar main entries (for example tart pan beside cake pan and pie dish) and adjusts fam only where it is clearly off. About 100 roots and 9 aliases.
- **typicality:** Re-judge each of her 25 themes as it will stand on v408. That is 323 links: 232 existing entries plus 91 new. Existing entries keep their own fam; only their typicality in her theme is checked. Also re-check the 15 renamed or narrowed themes, whose scope changed ("soil words" became "soil types"; about 258 remaining links). None of her themes' parents was merged or deleted on main (v403/v407/v408).
- **Size:** about 580 typicality judgements and about 110 fam checks. With about 10 theme clusters, that is about 10 Opus agent tasks. One sitting, the same scale as a v40x review batch.

### 4.3 Decisions for Simon

1. bear_types: keep (v407) or delete (Julia).
2. venomous biters: keep or merge.
3. four humours: unlink the temperaments (Julia) or keep the v398 groups.
4. The 85 entries left with no theme: leave them, delete them, or relink.
5. The variant table: helmet, pump and lights especially.
6. "Earth's layers" vs "Earth's four layers"; Greek goddesses inside Greek gods.
7. Whether to keep Julia's scripts under `tools/gen/julia/` as the record.

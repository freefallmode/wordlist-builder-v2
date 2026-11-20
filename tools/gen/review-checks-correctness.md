# Review: correctness of the existing checks (library v411)

Read-only review, 2026-11-20. Scope: js/validate.js, js/caselint.js, js/family.js, js/family-allow.js, the check-like filters in js/export.js, tools/gate.mjs, tools/checks-baseline.json, against DESIGN.md 6 and 8 and DESIGN-entries.md (3.7, the capital rule, theme names). Coverage gaps (rules with no check) are a separate review.

Method: v411 loaded with `parseProject` + `reindex` and `validate` run (as tools/gen/batch411.mjs does), plus synthetic projects built with `newProject`/`addEntry` for the edge cases. The scripts are in the session scratchpad (syn.mjs, lib.mjs, t8.mjs, perf.mjs), not in the repo. "Tn" below refers to those synthetic cases.

v411 result: 0 errors; warnings theme-name 3, long 5, maybe-duplicate 1, clash-big 1 (exactly the baseline); info overlap 4929, family-kin 322, orphan 225, clash-large 60, alias-fullname 44, same-display 10, case 4. The library has no disabled entries or themes, so findings about disabled data are latent.

## Fixes, in priority order

1. **The gate baseline counts per kind, so it can hide a regression** (tools/gate.mjs:143-149). One `theme-name` warning fixed and another added keeps the count at 3 and passes. A count below the baseline also passes (only a "lower it" note), so the slack stays and a later regression fits into it. The baseline is read from the target tree (gate.mjs:139), so a commit can raise its own limit; tools/claude-guard.mjs protects only data/, not the baseline or the allow lists (FAMILY_OK, CASE_OK, LOWER_OK), and an allow-list line silences a check without touching the baseline. Fix: store fingerprints (`sev|kind|entryId|themeId`; v411 has only 10 warnings), fail on any new fingerprint, and fail (or at least warn) when the baseline or an allow list grows relative to the base commit.
2. **`same-display` does not match the export's same-text drop it describes** (validate.js:69 vs export.js:92-93). Validate folds accents (`fold`), but the export only lowercases and trims. So café and cafe get the info "the export keeps the more popular one", but the export keeps both (T2). Validate also skips every alias, but the export counts an alias with its own link: `Truck` (a regional alias linked on its own) beside `truck` is dropped by the export with no Checks issue (T4). Validate also counts disabled entries and `use` forms that are disabled, which the export ignores (T3, T21). The 10 cases in v411 match by luck. Fix: one shared helper in export.js (the shown text of a link, lowercased and trimmed, own links only, enabled only) used by both.
3. **A promoted alias loses its clash id in the export** (export.js:172 and 196, family.js:173-174). `clashGroups` is built with `keep = keep.has`. When the root is filtered out (adult or vulgar) and an alias is promoted to root, the root is in no union, and the alias reads `clash.id(root.id)`, which is 0. Synthetic T8: `polite` (alias of a vulgar root grouped with `bread`) gets clash 0 in the family preset and 1 in the full preset. In the v411 family export this hits `door staff` (root bouncer, kin of bounce x3) and `betting shop` (root bookies, grouped with bookie and bookmaker). Small today. Fix: let the union keep a root when any of its aliases is kept, or give the promoted alias's id the root's place in the union.
4. **`noteItems` drops the start of a first item that contains a colon** (validate.js:168). The label rule strips everything before the first colon when no comma or parenthesis comes before it, so in a note with no label, `Star Wars: A New Hope, ...` gives the item `a new hope` (T6). 66 of the 131 complete notes have no label. There are no hits in v411 (complete-extra 0, complete-missing 0), but a title note would misfire. Fix: treat the text before the colon as a label only when it starts with "the" or a digit, or when the note has a second colon. Or add an explicit separator such as `label::`.
5. **The docs disagree with the code on the clash limit.** DESIGN.md:125 says `clash-big` is a warning above 8 and does not mention `clash-large`. The code warns above 12 and gives info for 9-12 (validate.js:212-215, family.js:181-182). DESIGN-entries.md:131 still says "code change pending after v403". Fix both docs.
6. **`alias-same` can never fire on its own** (validate.js:101-105 vs 125). An alias with the same text as its root, even differing only in case, also raises `duplicate` (error, same empty gloss) and `needs-gloss` (error, once per entry) (T1). Decide whether it is an error (make it one, and exempt root and alias pairs from the other two) or a warning (exempt them from duplicate and needs-gloss).
7. **The `overlap` tokenizer is ASCII-only** (validate.js:78, `/[a-z0-9]+/`). Accented letters split words: `kākā` becomes k, k, which "is inside" `kākāpō`; `tūī`/`wētā`, `Åre`/`Val d'Isère`, `à la carte`/`la` (T13). There are 11 false hits of 4929 in v411 (info only). Fix: `/[\p{L}\p{N}]+/gu`.
8. **`show` and `use` checks accept what the export ignores.** `show-theme` (validate.js:142) tests `linkIds`, which includes an alias's inherited themes, but the export drops a `show` on an inherited alias link (export.js:67) (T7). `use-form` (validate.js:146) does not check that the form is enabled, and the export then silently shows the root's text (T21). 0 hits in v411. Fix: test `e.typ[tid] !== undefined` for aliases, and `a.enabled`.
9. **Severities.** A dangling id in a synonym group (`group-member`, validate.js:66) or in kin (`kin-bad` "missing", validate.js:220) is a warning, while a dangling `aliasOf` is an error. By DESIGN.md 6's definition, a broken reference is an error. Split out a `group-missing` error. `complete-missing` is info (validate.js:189), but the export sets the complete bit (THEME_BITS.complete) on a set that is then not complete; it should be a warning. `thin` on a complete theme is an error (validate.js:61), but nothing breaks (the export drops the theme), so it should be a warning, unless "complete sets of fewer than 4 cannot exist" is the intent, which should then be documented.
10. **Disabled data is handled inconsistently.** Theme checks skip disabled themes, but caseLint runs over every theme (caselint.js:23-25, T12) and so feeds gated warnings and `--strict`. `theme-name`, `same-display` and `family-twice` include disabled entries (validate.js:62, 69, 71; T3). Moot at v411 (0 disabled), but it will block the gate once something is disabled. Fix: filter on `eff(P, t.id).enabled` and `e.enabled` the way `family-pair` does.
11. Minor (details in the tables): `alias-self` also raises `alias-chain` and `alias-same`; `duplicate` does not trim the gloss; the `type` capital test uses `[A-ZÀ-Ý]`; `settings.minWords || 4` makes 0 impossible; the export's thin-theme loop stops after 6 passes without saying so; one kind name covers two different checks (`long`, `case`, `rating-vs-zipf`, `theme-unrated`), so the baseline cannot tell them apart; the leak check and the case lint ignore a `use` form's text.

## Themes (js/validate.js 47-75, 164-190)

| Check | Verdict | Evidence | Fix |
|---|---|---|---|
| rule-theme (error) | OK | validate.js:48. Runs on disabled themes too, which is harmless | - |
| theme-name-long (warn) | OK | :49, code points, 30 passes and 31 warns (T20); matches DESIGN-entries.md:200 | - |
| group-words (warn) | OK | :54. The same links are reported again per entry as `link-group` (:138), counted twice in the baseline | Optional: report one of the two |
| theme-unrated (warn, plus an info total) | OK | :58, :75. One kind name for both severities | Rename the info |
| foreign-flag (warn) | OK | :59, uses the inherited flag | - |
| empty / thin | Severity | :60-61. Thin on a complete theme is an error although the export only drops the theme. `minWords || 4` ignores a setting of 0 | Warning (or document the intent); use `??` |
| theme-name (leak, warn) | Bug (latent) | :62. Includes disabled entries (T3); uses `show` but not the `use` form's text, which is what the export shows | Skip `!e.enabled`; use the shown text, `use` included |
| group-small / group-member (warn) | Severity | :65-66. A missing id (`!e`) is a broken reference, unlike alias-missing (error) | Split out `group-missing` as an error |
| same-display (info) | Bug / doc mismatch | :69 vs export.js:92-93: fold vs lowercase; aliases with own links skipped; disabled entries and disabled `use` forms counted (T2, T3, T4, T21) | Shared helper with the export |
| family-twice (warn) | OK, latent | :70-72, includes disabled entries | Filter on enabled |
| overlap (info) | Bug | :78, ASCII tokens; 11 false hits in v411 (kākā/kākāpō, tūī/wētā, Åre/Val d'Isère). `grouped` keeps only the last group of an id that is in two groups (:83; 0 such ids in v411) | Unicode tokens |
| complete-no-note / complete-extra / complete-missing | Bug + severity | noteItems :168 eats a first item with a colon (T6); complete-missing is info though the complete bit is exported | Stricter label rule; complete-missing as a warning |

## Entries and aliases (js/validate.js 92-158)

| Check | Verdict | Evidence | Fix |
|---|---|---|---|
| empty-text, bad-type, bad-pos (error) | OK | :97-100 (the export writes -1 for a bad type or part of speech) | - |
| spaces (warn) | OK | :98 | - |
| duplicate (error) | Minor bug | :101, gloss not trimmed: `animal` and `animal ` are not duplicates and fall to maybe-duplicate (T18); also fires for a root and its alias with the same text (T1) | Trim the gloss; see fix 6 |
| needs-gloss (error) | OK by the doc, noisy | :105, also fires for an alias that shares its text with an unrelated root (T17) and for root and alias pairs (T1) | See fix 6 |
| maybe-duplicate (warn) | OK | :107 | - |
| long (warn, two checks) | OK, one kind | :110 and :112 share the kind `long` | `long-words` / `long-letters` |
| type (warn) | Minor | :111, `/^[A-ZÀ-Ý]/` misses `Ō`, `Ł`, Greek letters | `/^\p{Lu}/u` |
| case (warn and info) | OK | :114-116 | Separate kind names per severity |
| alias-missing / alias-chain / alias-self (error) | Minor | :121-124. An alias of itself gives alias-chain + alias-self + alias-same (T11) | Test self first and `continue` |
| alias-same (warn) | Never alone | :125, always with duplicate + needs-gloss errors (T1) | Fix 6 |
| alias-kind, alias-region, alias-fullname, alias-link-kind | OK | :126-132 | - |
| alias-us-root (warn) | OK, slow if it grows | :129, `P.entries.some` per hit is O(N); 0 hits in v411 | Use `ix.aliases.get(r.id)` |
| orphan (info), bad-theme (error), link-group (warn), is-theme-name (warn) | OK | :133-139 | - |
| bad-rating (error) | OK | :141 | - |
| show-theme (warn) | Bug (latent) | :142 accepts a `show` on an alias's inherited link; export.js:67 ignores it (T7) | Require an own link |
| use-theme / use-form (warn) | Bug (latent) | :145-146 do not test `a.enabled`; the export falls back to the root's text (T21) | Add `!a.enabled` |
| unrated, rating-vs-zipf | OK | :148-157. rating-vs-zipf is never gated (the gate runs without the frequency list) | Document it, or load the list in the gate |

## Case lint (js/caselint.js)

| Check | Verdict | Evidence | Fix |
|---|---|---|---|
| Members (`own`) | Bug (latent) | :11, :23-25: no `eff(...).enabled` or `e.enabled` filter, so disabled themes and entries raise gated warnings (T12) | Filter like validate's theme loop |
| cap-common, lower-proper, sense-*, common-in-names | OK | :35-46, :85-93; thresholds of 8 members and 0.8/0.2 shares, as documented | - |
| style-capital | OK | :40 | - |
| case-split | OK | :48, hard-codes "phonetic alphabet" | Move the exception to CASE_OK |
| case-shown-wordplay / case-shown-alias | OK | :50-52. `hasUkAlias` holds any regional or spelling alias with a region, not only UK ones (the name misleads) | Rename |
| bare-stub, lower-proper-word | OK | :61-74. `lower-proper-word` cannot be allowed through CASE_OK (it has no theme); LOWER_OK is the documented route | - |
| Shown text | Gap | `textOf` (:27) ignores `use`, so a form shown with a wrong capital is not checked | Include the `use` text |
| Kind names | OK | validate.js:160 prefixes `case-` except where the kind already has it; matches DESIGN.md 6 (11 kinds) | - |

## Word families (js/family.js, validate.js 192-236)

| Check | Verdict | Evidence | Fix |
|---|---|---|---|
| isFamily / famKeys / stems | OK | family.js:111-147. Plain [a-z] words only, so accented and hyphenated words are never compared (by design). FAMILY_OK has 2,428 keys, which shows how noisy the detector is | - |
| familyPairs | OK, fast | :150-164; 8,617 pairs over all roots in 138 ms; the pair key `a*1e6+b` is unique below 1e6 items | - |
| FAMILY_OK keys | OK | ids are numbers, so `pairKey` compares numerically and matches "smaller id first"; 0 stale keys in v411 | Add a test that every key names existing entries and themes |
| family-pair (warn) | OK | validate.js:198-206: skips locked and familyOk themes, disabled entries and inherited links; allow-list by id and by root | - |
| family-kin (info) | OK | :223-235; ignores theme-scoped allow keys (as intended) | - |
| kin-bad (warn) | Severity | :218-221. A missing kin id is a broken reference | Error for "missing" |
| clash-large (info) / clash-big (warn) | Doc mismatch | :210-215, soft 8 / hard 12. DESIGN.md:125 says warn above 8, and DESIGN-entries.md:131 says "pending". Validate counts every enabled entry in playable themes, so it is an upper bound on the export (61 groups over 8 vs 59 in the family export; kebab 14 in both) | Update the docs |
| clashGroups | Bug in the export use | family.js:173-174 with export.js:172/196: a promoted alias loses its clash id (T8; door staff, betting shop in v411) | Fix 3 |

## Export filters that act as checks (js/export.js, tools/export-game.mjs)

| Filter | Verdict | Evidence | Fix |
|---|---|---|---|
| --strict (case lint) | OK, redundant | export-game.mjs:24-26 lints the whole library, as documented (DESIGN.md 8.1). Gate step b already fails on any case-* warning (none are in the baseline) | - |
| Same-text drop | Mismatch with validate | export.js:90-107. Lowercase + trim, own links only. The tie-break `familiarity: r` is the blended difficulty, not familiarity (DESIGN.md 8.3 says familiarity; the order is the same at equal typicality, apart from rounding) | Shared helper (fix 2); rename the field |
| Inherited alias drop | OK | export.js:74-88, matches 8.3 (form aliases kept); 19 drops in v411 | - |
| Thin themes dropped | Minor | export.js:111: at most 6 passes, then silently continues, so a theme still under minWords could be written | Loop until stable, or report when the cap is hit |
| droppedThin as a check | Not gated | 77 themes dropped in the family export at v411 (mostly by the adult filter); only the report lists them | (coverage review) |

## Gate (tools/gate.mjs, tools/checks-baseline.json)

| Aspect | Verdict | Evidence | Fix |
|---|---|---|---|
| Errors at 0 | OK | gate.mjs:141-142 | - |
| Warnings counted per kind | Can hide a regression | :143-149: swapping one warning for another of the same kind passes; `long` and `case` each merge two checks | Fingerprint baseline |
| Count below the baseline | Slack | :148 only notes it | Fail until the baseline is lowered, or lower it automatically |
| Baseline from the target tree | Self-approving | :139; claude-guard.mjs:23 does not protect the baseline or the allow lists | Compare with the base commit's baseline and allow lists; fail or warn on growth |
| Info not gated | By design | :150. complete-missing (info) can grow unnoticed | Move complete-missing to warn (fix 9) |
| rating-vs-zipf | Never gated | --checks-json does not load the frequency list (by design, documented) | - |
| Relevance closure | OK | :80-90 follows relative imports, so family-allow.js, caselint-allow.js and caselint-words.js trigger the gate | - |

## Performance (v411: 62,924 entries, 3,312 themes)

validate 1.2 s, caseLint 0.18 s, family export 1.0 s, load 0.27 s. The largest theme has 129 links, so the O(n²) overlap and same-display loops are cheap. The only O(N)-per-hit check is alias-us-root (validate.js:129), with 0 hits now. No problems.

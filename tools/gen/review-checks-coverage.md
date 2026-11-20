# Rule coverage of the checks (library v411, 2026-11-20)

Read-only review: which data rules the project states are enforced by a check, and which are not. A separate review covers whether the existing checks are correct (review-checks-correctness.md). Counts were measured on `data/wordlist-en.project.json` v411, loaded with `parseProject` + `reindex`. The scripts are in the session scratchpad (`cov/measure.mjs`, `m2.mjs`, `m3.mjs`, `m4.mjs`, `revdiff.mjs`), not in the repo.

What enforces what:
- **validate.js**: the Checks kinds. The gate (step b) fails on any error and on any warn kind above `tools/checks-baseline.json`. **Info kinds are never gated.** The gate runs validate without the frequency list, so `rating-vs-zipf` never runs in the gate.
- **caselint.js**: the `case-*` warns, gated twice (Checks and the strict export).
- **family.js**: `family-pair`, `family-kin`, `clash-big`/`clash-large`, `kin-bad`.
- **export --strict**: case lint = 0 only. Nothing else in the export is a check. It drops thin themes, same-text links and inherited alias links, lists them in a report, and passes.
- **gate.mjs**: tests, Checks, strict export, the `style-case` and `propword-exceptions` reruns at 0, the export equal to a fresh one, the version bump, and changed batch scripts rerun (warning only).

## 1. Rules → check or gap

| Rule (source) | Enforced by | State at v411 |
|---|---|---|
| Entry type/pos in lists; text not empty, no edge spaces | `bad-type`, `bad-pos`, `empty-text`, `spaces` (error/warn) | 0 |
| Same text needs a gloss; text+gloss unique | `needs-gloss`, `duplicate` (error) | 0 |
| One entry per sense (DESIGN-entries 3.6; I21, I23) | `maybe-duplicate` only when the two **share a theme** | **gap**: same-sense roots in different themes, 108-177 candidates (P1) |
| Link is on the right sense (T26, T27, T30, T31) | none | **gap**: heuristic finds wrong-sense links (P1) |
| Alias root exists, no chains, has a known kind | `alias-missing/-chain/-self/-same/-kind` | 0 |
| Spelling/form aliases have no own links | `alias-link-kind` | 0 |
| Spelling/form alias *is the same word* (3.1) | none | **gap**: 54 spelling aliases far from the root, e.g. satnav for GPS (P4) |
| Spelling/form alias shares the root's flags (DESIGN 3: "same word" takes tm, vulgar ...) | none | **gap**: 19 (9 sensitive, 10 tm) (P3) |
| Non-form alias copies the root's pos | none | 0 differ (cheap to add) |
| One alias family per theme | `family-twice` | 0 |
| US spelling is the root | `alias-us-root` | 0 |
| Spelling aliases carry US or UK only (3.1, 3.4) | none | 44 carry other codes too, 8 have neither UK nor US (dolmus TR, bodhran IE). The docs disagree with each other ("tags stay fully detailed"), so settle the rule first |
| UK player sees *the* UK alias (3.4 game rule 1) | none | **gap**: 75 families with 2+ UK-tagged spelling/regional aliases, e.g. scallion: spring onion, green onion (P8) |
| Regional alias has a region | `alias-region` (info) | 0 |
| Rule 8: accented root keeps a plain spelling alias | `tools/gen/plaincheck.mjs`, by hand only, not in validate or the gate | 23 = the 25 known v396 skips, nothing new; **gap** for regressions (P6) |
| Rule 8: root is accented when a dictionary prints it | judgement | 22 plain roots with an accented spelling alias (Zurich/Zürich, facade/façade, eclair/éclair): a review list |
| Shown text keeps the root's diacritics (v390) | none | not measured (only locked foreign themes may differ) |
| Capital rules 1-9, style rule, brand types | case lint + `style-case`/`propword-exceptions` reruns; dictionaries by hand | gated; dictionary calls are judgement |
| Theme name: ≤30 chars | `theme-name-long` | 0 |
| Theme name: house (US) spelling and root diacritics (v406) | none | **gap**: 3 ("birds named after a colour", "theatre and movie crew", "Galapagos animals") (P5) |
| Theme name: capitals only for proper nouns | none | heuristic too noisy (47, mostly demonyms); leave to review |
| Theme name doesn't leak members | `theme-name`, `is-theme-name` | 3 (baselined) |
| Theme name describes members outside the tree | judgement | n/a |
| Theme pop rated | `theme-unrated` (warn) | 0 |
| Theme ident rated | none | 0 unrated (cheap to add) |
| Complete set: note exists, members = note | `complete-no-note`, `complete-extra` (warn, gated 0), `complete-missing` (info), `thin` (error) | 0 |
| Complete set: two separate answers for one note item | none (completeCheck lets both pass) | 0 |
| Complete set: number in the note label equals the item count | none (batch411 asserts it per batch) | 0 real; a heuristic gives 6 false positives ("months with 30 days"). Not worth a check |
| Synonym groups: ≥2 members, members are linked roots | `group-small`, `group-member` | 0 |
| A word is in at most one group per theme | none | 0 (cheap to add) |
| `show`/`use` keys on linked themes; use is a form | `show-theme`, `use-theme`, `use-form` | 0 |
| `nameOkIn` keys on linked themes | none | **gap**: 72 stale keys, e.g. kebab 813 → kebab_types (P2) |
| Alias `show` only on its own links (T20) | none (`show-theme` uses inherited links) | 0 now; a regression would pass |
| `use` form enabled (I7) | none | 0 |
| kin symmetric, roots only, existing | `kin-bad` | 0 |
| One-family words: grouped in a theme, kin across themes | `family-pair` (warn), `family-kin` (info) | 0 / 322 info |
| Clash groups ≤12 (soft 8) | `clash-big` (warn), `clash-large` (info) | 1 (baselined) / 60 |
| Overlap rule (cola / Coca-Cola) | `overlap` (info) | 4,929 info, too noisy to act on |
| Same shown text twice in a theme | `same-display` (info); the export keeps one | 10 |
| Rule names an existing theme | `rule-theme` (error) | 0 |
| tkind in the kind list; rule only on wordplay/compound; rule grammar (DESIGN 8 / v255 note) | none (an unknown tkind is exported silently as `category`) | tkind 0 bad; **4 rules outside the documented grammar** (`homophone:animals`, `homophone:body`, `letter:numbers:first`, `letter:animals:plus`): document them or check them (P7) |
| Compound member is the full term (3.6) | none | 2: `blood` in blank_line (should be `bloodline`), `clockwork` in blank_works (P9) |
| Theme tree: parent exists, no cycle, unique id/name, depth-first order | none (a cycle would hang `eff`, not report) | 0 each (P7) |
| Group (folder) holds no words; links not to groups | `group-words`, `link-group` | 0 |
| Region codes (I12) | none | 55 codes, all well-formed (cheap format check) |
| `status` ∈ new/gen/rev | none | 0 bad (gen 60,466, rev 2,457, new 1) |
| I11: a batch sets `rev` on every entry it changes | none | **gap**: v408-v411 diffs show 3 changed entries left `gen` (movie theatre 64832 at v408, grey whale 7870 and harbour seal 8900 at v409, all nameOkIn changes) (P6) |
| Version bumped on change | gate f | pass |
| `modified` stamp, `nextId` > max id | `stampSave`, load fix-up; not checked | ok |
| Export equals a fresh one; batch idempotent | gate e, g (g warns only) | pass |
| Adult/sensitive/vulgar flags right | none (judgement); flags do not pass from theme to entry (`eff` is for themes) | 1,344 non-adult roots only in adult themes and 93 adult roots in no adult theme (wine): both by design, not checks |
| Duplicate themes (I26, v407/v408 by hand) | none | **gap**: 55 non-nested pairs with ≥80% containment (P2) |
| Theme membership right (I27) | judgement | n/a |
| Ratings (fam, typ) right | `unrated` (info), `bad-rating`; `rating-vs-zipf` outside the gate | judgement |
| Orphans | `orphan` (info, not gated); the export drops them | 225 info (French Guiana by design) |

## 2. Proposed checks, ranked by value

Ranked by real cases found and low false positives. All are new validate kinds unless noted. Each heuristic one needs an allow list in the style of `family-allow.js`, so it can be gated at 0 once triaged.

**P1. `sense-twin` (info, later warn with an allow list).** Logic: for two enabled roots with the same text, pos and type, flag when (a) their glosses share a word of four or more letters, or (b) a theme holds A while B's gloss contains a word of the theme name and A's gloss does not. Hits: 108 (a) + 177 (b), overlapping.
- Same-sense duplicates: python [animal]/[snake], boar [pig]/[animal], ram [sheep]/[animal], lamb, calf, doe, port [ship side]/[left side]/[ship left], periwinkle, coral, drake, bit [horse tack]/[horse bit], bill/spur/wattle [animal]/[bird], mouse [animal]/[rodent], boto.
- Wrong-sense links: **Maltese [language] in dog breeds**, pistachio [nut] in ice cream flavors, steam [vapor] in cooking methods, nymph [myth] in insect life cycle, ebony [tree] in types of wood, fuchsia [pink-purple] in garden flowers.
- False positives about 25-30%: mule [antlered animal] (mule deer), swift [bird] in fast animals, buckeye [nut].
- Highest yield of all: it is the I21/I23/T26-T31 class, which agents have so far found by hand.

**P2. `theme-twin` (info + allow list `THEME_TWIN_OK`).** Logic: two playable themes, neither an ancestor of the other, with the smaller ≥8 roots and ≥80% of the smaller's roots in the larger (55 pairs). Also flag normalised-name twins ("X" / "X words" / "types of X" / "famous X", colour→color, plural) with ≥50% overlap (about 12).
- Real candidates: bike races / cycling races (9 of 9), Hindu gods / Hindu gods and goddesses (12 of 12), fragrant / sweet-smelling flowers (15 of 16), spiny animals / animals covered in spikes (11 of 12), naval vessels / warships (11 of 12), reading material / things you read, Asian dishes / Asian food, software words ⊇ kinds of software (16 of 16), fitness / fitness words (27 of 36), sleep / sleep words, religion / religion words.
- False positives: true subsets kept on purpose (planets in things in space, Thirteen Colonies in US states, star flags in countries). The allow list absorbs them after one triage.

**P3. `alias-flags` (warn, gate at 0).** A spelling or form alias whose adult, vulgar, sensitive or tm differs from its root. 19 hits.
- sensitive: Süleymaniye/Suleymaniye Mosque, hymn/hymns, quinceañera, pākehā, Día de los Muertos, inşallah (mostly the v396 plain aliases, created without the flag).
- tm: the Pokémon ×4, Kahlúa, Jägermeister, Guaraná Antarctica plain aliases lack tm.
- slip and slide / Slip n Slide is really a wrong alias kind.
- False positives ≈ 0. The data is fixable in one batch.

**P4. `alias-kind-suspect` (info).** A spelling alias whose folded edit distance from the root is above 40%, or whose type or initial capital differs from the root's. 54 hits (+11 type, 7 case, overlapping).
- Real: satnav ← GPS, fitness centre ← gym, cabby ← taxi driver, staffroom ← teachers' lounge, hanky ← handkerchief, combine harvester ← combine, keyring ← keychain, emmentaler ← Swiss cheese, gaol ← prison (gaol is jail).
- False positives: Kiev/Kyiv, catsup, gryphon (real spellings).
- It matters because spelling aliases take the root's ratings and are swapped in by region.

**P5. `theme-name-spelling` (warn).** A theme name word that is a UK-tagged spelling alias (outside lang themes), or the plain form of an accented root (words of three or more letters, not themselves an entry). 3 hits, all real: "birds named after a colour", "theatre and movie crew", "Galapagos animals".

**P6. Gate step h: rule-of-record checks on the diff against the base (gate, FAIL).**
- (a) Every entry whose data changed or was added has status `rev` (I11): 3 misses over v408-v411.
- (b) Rule 8 regression: an accented root without a plain spelling alias that is not on the known-skip list. Move `plaincheck.mjs`'s logic into validate as `plain-alias` (warn) with the 25 skips in an allow list.

  Both have 0 false positives by construction.

**P7. Structural errors (error, all 0 today, cheap insurance):** `theme-parent` (missing or cycle), `theme-dup-id`, `theme-dup-name` (case-folded), `group-dup-member`, `bad-status`, `bad-region` (format `^[A-Z]{2}$`), `bad-tkind`, `rule-syntax` (4 hits today: write the `homophone:<x>` and `letter:<x>:<pos>` forms into the documented grammar first), `ident-unrated` (warn).

**P2b. `name-ok-stale` (warn, gate 0).** A `nameOkIn` key for a theme the entry is not linked to, own or inherited. 72 hits, e.g. kebab 813 → kebab_types, owl → owls, dolphin → whales_and_dolphins. False positives 0. Harmless today, but if the entry is relinked later the stale key silently mutes the leak check. Ranked here for certainty, not impact.

**P8. `region-ambiguous` (info).** A family with two or more enabled UK-tagged spelling/regional aliases, or two or more US-tagged spelling aliases. 75 hits (scallion: spring onion + green onion; pruning shears: secateurs + pruners; lapwing: peewit + green plover). Ask the game which one it shows. Then either make it a warn with a "preferred" marker, or retag.

**P9. `compound-full-term` (warn).** A member of a `compound-start/end:w` theme whose text lacks w. 2 hits: blood in blank_line (real, should be bloodline), clockwork in "___works" (borderline).

Not proposed: a complete-set count check (0 real at v411, after v410 rewrote the notes); locked-theme change tracking (0 membership changes v408-v411, and no rule forbids it); adult/sensitive inheritance from themes (the data is by design); orphans as a warn (dropped by the export; the info is enough).

## 3. Judgement-only rules, and how the workflow covers them

| Rule | Why no check | Suggested coverage |
|---|---|---|
| Theme membership: a member is one of the theme's things, not a mix, not a near-miss (I27: kitchen_brigade baker, renewable_energy dam) | meaning | A rotating theme audit: each batch notice samples N themes (largest first) for one agent's membership review. Findings go to ISSUES as I-items |
| Complete-set truth (French Guiana is not a country) | world knowledge | Re-verify each complete note once against a source. Record the source in the note's batch evidence |
| Rule 8 / capital rules 1-9 / rule 9 wines: the dictionary verdict | external dictionaries | Already "recheck" marked in change logs. P4 and the 22-item accent-on-alias list feed it |
| Fam / typicality ratings | judgement | Two blind passes as for ident. `rating-vs-zipf` could run in the gate with the frequency list loaded (today it never does) |
| Alias kind (strict synonym vs regional vs form; same-answer test) | meaning | P4 surfaces suspects. A reviewer decides |
| Overlap rule and the brand-vs-generic call | meaning | `overlap` is 4,929 info: unusable as is. Restrict to brands (`tm`) vs generic in one theme to get a reviewable list |
| Kin confirmation; group strictness | meaning | `family-kin` (322) is the queue; keep it falling per version |
| Theme name describes members outside the tree; theme-name capitals | meaning | Name pass per new theme (prompt + reviewer). P5 covers spelling |
| Adult, sensitive, vulgar, region accuracy | judgement | Flag audit by theme group. P3 keeps alias families consistent |
| `show` shortening test (3.6) and `familyOk`/`nameOk`/`locked` settings | judgement | Batch review files list each one set. Nothing generated sets them |
| Same-display and region choice in the game | the game's behaviour | The game re-measures each pin. P8 raises the open question |

Workflow suggestion: run the heuristic kinds (P1, P2, P4, P8) as info with allow lists. After one triage pass by Simon, baseline their warn counts at the remainder, so new cases fail the gate while accepted ones stay quiet. This is the pattern `family-allow.js` and `caselint-allow.js` already use.

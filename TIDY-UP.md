# Library tidy-up (started 2026-11-23, Simon: "Let's do this")

A standardisation pass over the whole library after weeks of edits. Each batch is still approved by Simon before `--apply` (CLAUDE.md, "Changing the library").

## Steps

1. **Script sweep** (1-2 batches). Mechanical problems, found by script, little judgement:
   - entries in no theme (`orphan`): delete stubs made for one theme, home real words, list the rest;
   - stale `nameOkIn` keys (`nameOk-stale`);
   - two roots of one sense (same text, same meaning; floss, top hat and fold were examples): merge;
   - I32 leftovers (spelling-alias regions and roots);
   - I33: theme names over 24 characters (shorten; no index shifts).
2. **Tighter checks** (code, before the reading pass), so the standard stays after the tidy-up:
   - an "X words" twin check: an "X words" theme sharing 30% or more of its words with another theme (the `theme-twin` check needs 80%);
   - a wrong-sense check: a word with two or more senses whose linked sense's gloss fits the theme less well than a sibling sense's (compares glosses with the theme's name, its folders and its other members);
   - the I30 gap (theme difficulty against its 4th-easiest word) as a warning.
3. **Group by group** (one batch per top-level group, all 13 groups, Body & Health included). An Opus agent drafts, a second agent reviews, Simon approves. Two or three groups at a time. Order: Food & Drink, Animals, Nature & Earth first (most played), then the rest.
4. **Game rounds**: one combined notice to `_WS_` every 3-4 groups; a pin only when a round measures clean.

## Checklist for each group (step 3)

Read LIBRARY-RULES.md first; this list points into it.

- **Senses** (5, Entries): every link is the sense the theme means; split a wrongly linked sense into its own entry.
- **Belonging** (6, Themes): every member belongs unambiguously; no member better in another ordinary theme; no general word beside its own kinds.
- **Twins** (6, Themes): no near-duplicate theme; same-topic "X words" merged, talk/jargon themes named for what they are.
- **Names** (6, Themes): short (24 characters or fewer), lowercase except proper nouns, no member's word, US spelling.
- **Spread** (3.7): about a third easy, middle and hard; theme difficulty within one band of its 4th-easiest word (I30).
- **Ratings** (4, 6 Links and ratings): fam, typ, pop and ident consistent with similar words and themes; better typicality kept in merges.
- **Complete sets** (6, Themes): note exact, every item covered once.
- **Case, spelling, aliases** (5): capital rule, US root with regional aliases, plain alias for accented roots (rule 8), alias kinds right.
- **Word families** (5, Same word or related words): kin only inside one group per theme.
- **Offensive and sensitive words** (5, Offensive words): flags per the 2026-11-22 rules.
- **Size** (6, Themes): at least 4 usable words; stubs with no theme deleted.

## Decided (Simon, 2026-11-23)

- Every group, including Body & Health, is done in this pass, not by Julia ("i'll do all").
- Scope includes restructuring the tree ("restructuring too"): moving, merging, splitting and renaming folders and themes. Within a group it goes in that group's batch. A move between groups is listed in the group's review and done in one tree batch at the end of step 3, so theme indexes shift once per game round, not in every batch.

## Tolerated warnings (Simon, 2026-11-23)

Each group's batch also fixes the baseline warnings (tools/checks-baseline.json) in its own themes and entries and lowers the counts. By the end of the tidy-up every count is 0, or the remainder is accepted by Simon with a reason written in the baseline note. Counts at the start (v432): warn: spelling-fam 5 (I32, step 1), long 5, theme-name 3, clash-big 1, maybe-duplicate 1, theme-gap 1; contract: contract-dup-root 188, contract-root-region 1781, contract-type-common 42. Some contract kinds may be largely by design (region-tagged roots); the first group batch says how many of its hits are real and proposes how to treat the rest. The info kinds the group touches (orphan, sense-link, xwords-twin, theme-twin, sense-twin, nameOk-stale) are cleared the same way, without a baseline.

## Checklist addition for restructuring

- **Tree**: each folder is a real category with a clear name; no folder holding one theme; no theme filed under the wrong group; similar themes are siblings, not scattered; nesting no deeper than needed. Don't rename the ancestors "names", "famous people" and "surnames": the game uses them.

## Progress

- 2026-11-23: plan written. Step 2 done: checks xwords-twin, sense-link (info) and theme-gap (warn, baseline 1) merged (e43fd26). Step 1 done: v433 applied (Simon: "Yes, fix and apply"): 60 orphans deleted, 17 linked, 3 aliased, 225 left with reasons (tools/gen/batch433-review.txt); 68 stale nameOkIn removed; 166 same-sense roots merged; I32 leftovers fixed (spelling-fam 5 -> 0); 84 theme names shortened. For step 3: twins fermented foods and drinks, old ways to keep in touch.
- 2026-11-23: step 3, first round applied (Simon: "Take all"): v434 Food & Drink, v435 Animals, v436 Nature & Earth, each drafted by one agent, reviewed by a second and corrected; baselines clash-big 0, contract-dup-root 177, contract-root-region 1744, contract-type-common 39; six allow-list keys (Simon). Not sent to the game yet.

## Waiting for later batches

- Cross-group moves from round 1: alkali and alkaline earths to Science & Tech; gold rush words to History & Myth; seaweeds and prehistoric periods to Nature & Earth; fermented foods and drinks (under Qualities) into fermented foods; old ways to keep in touch twin; dragon egg its own root; wrong-sense links in other groups' themes: egg [food] in insect life cycle, butterfly life stages, life cycle words; applesauce, Bordeaux, plum, fish, lamb, champagne, pork pie in hats, honeydew in sticky things.
- Fujiyama an alias of Mount Fuji (Places & Geography).
- A dinosaur capital-letter pass (about 150 entries: stegosaurus lowercase, Tyrannosaurus rex capital).
- "starts with public transport" / "ends with public transport": v433 dropped "public"; put it back (Language & Wordplay).
- Region check: merged 2026-11-23 (a52a5a5): contract-root-region is info; warning region-root-equiv at 202 (v439), to bring down in the remaining group batches.
- föhn was made the root from Collins (Oxford could not be fetched); check Oxford by hand if it matters.
- 2026-11-23: step 3, round 2 applied (Simon: "Take all and apply"): v437 Places & Geography, v438 Travel & Transport, v439 Body & Health; drafted, reviewed, corrected; nine allow-list keys; baselines maybe-duplicate 0, contract-dup-root 175, contract-root-region 1631, contract-type-common 31. Notice for v433-v439 sent to _WS_ 2026-11-23 (tools/gen/notice-v433-v439.txt); measured clean against v432 under g25 (no failures, bot passes, mean difficulty 2.12/2.56/3.37; words shown as their strict synonym 268/277/257 -> 546/593/664 from the synonym-alias merges; rating gaps 6 -> 8, new blue cheeses and Queen members); not pinned: Simon pins once, at the end of the tidy-up ("Wait for the end"). For the remaining groups: the first synonym alias of each root (row order) must be a well-known word, since the game shows it at some levels. Round 3 started: People & Society v440, Home & Everyday v441, Sports & Games v442.
- From round 2, for later batches: parking lot root with car park its UK alias (two car park roots 27371, 63317) and lay-by 27385 into rest area; plaster -> "adhesive bandage"; a diacritics pass for Mexican places and landmarks (Belém Tower, Kız Kulesi, Zócalo); translations stored as roots made translation aliases (La Tour Eiffel, Cristo Redentor, Berlin TV Tower); foods named after places as foods only; "squaw" on js/offensive-words.js (Squaw Valley is flagged offensive; needs Simon); cross-group items in batch437-439-review.txt.

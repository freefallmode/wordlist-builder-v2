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

## Checklist addition for restructuring

- **Tree**: each folder is a real category with a clear name; no folder holding one theme; no theme filed under the wrong group; similar themes are siblings, not scattered; nesting no deeper than needed. Don't rename the ancestors "names", "famous people" and "surnames": the game uses them.

## Progress

- 2026-11-23: plan written; step 1 and step 2 started.

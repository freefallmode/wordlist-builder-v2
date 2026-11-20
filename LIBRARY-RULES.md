# Library rules: read before generating or editing words or themes

The short form of the content rules. Detail: DESIGN-entries.md (3.1-3.7, 4, "Rules in force", "Capital rule and lint") and DESIGN.md (3, 4, 5, 6). Brackets give the check: a kind of `npm run check`; "(info)" is reported but never gated; "(error)" always fails; other kinds are warnings gated against `tools/checks-baseline.json`, and a warning new by identity fails the gate too.

## Entries

- One entry is one meaning of one written form; two senses are two entries. Make the entry the full term the player sees named (`green tea` shown "green" in teas). (`maybe-duplicate`, only when they share a theme; else no check: judgement)
- Text as normally written, US spelling, no edge spaces, at most 4 words and 20 letters. (`empty-text`, `spaces`, `long`)
- When two entries share a text, every one of them has a short gloss naming its sense; text + gloss is unique. `ass` [donkey] / `ass` [buttocks]. (`needs-gloss`, `duplicate`)
- Type says what the entry is: common, person (given names too), place, org (brand: with tm), title, proper (named product: with tm), acronym, phrase (idiom only, never a name). (`bad-type`, `bad-pos`, `type`)
- Case: write the word as it is written for its sense. Dictionary rule: Oxford and M-W; if they disagree or say "often capitalized", lowercase (cheddar rule). A proper word inside a phrase keeps its capital (`French fries`). Style and movement names lowercase unless the word exists only as a name (`baroque`, `Victorian`). (`case`, `case-*`, gate reruns of style-case and propword-exceptions)
- tm marks live product and brand names, not companies (`Ford` none, `Kleenex` tm). (no check: judgement)
- Familiarity `fam` 1-5, always for a general UK/US adult (a regional word too): 1 every child, 5 few people. Rate the word, not the thing; when unsure, the harder. Every entry and alias gets fam, pos, type, flags, region. (`unrated` (error))
- Ratings are always all four (theme pop and ident, word fam, link typ), set in the same batch that creates the theme, word or link; none is left at 0. (`theme-unrated` (error), `unrated` (error), `bad-rating` (error))
- Set adult, sensitive, vulgar for this sense only; theme flags pass to links, not entries. (no check: judgement)

## Aliases

- Kinds: `spelling` (colour), `form` (rainy for rain: a grammatical form only, never a compound or longer name), `regional` (bonnet for hood), `abbreviation` (PC), `translation` (Danmark), `synonym` (strict: always the same answer, besan / gram flour). Near matches are two entries in a synonym group. (`alias-kind`; `alias-fullname` (info); fit of kind: judgement, helped by `alias-kind-suspect` (info))
- Spelling and form aliases are the same word and have no links of their own; the other kinds may hold their own link. `satnav` is not a spelling of GPS. (`alias-link-kind`; same-word test: `alias-kind-suspect` (info))
- The root is the US spelling; the UK spelling is a `spelling` alias tagged UK. (`alias-us-root`)
- Rule 8: a root keeps its diacritics when any major English dictionary prints them (regional ones count); the plain form is always kept as a `spelling` alias with no region. `jalapeño` root, `jalapeno` alias. (gate step i on the diff: a root the change adds or touches may not lack it; the older gaps: `tools/gen/plaincheck.mjs` by hand)
- A regional alias always carries its region codes. `pavement` [UK] for sidewalk. (`alias-region` (info)) Spelling aliases are tagged US or UK for a US/UK difference and untagged for a plain (accent) form; a spelling alias may keep other region codes for now (44 do at v411), until Simon settles it.
- A spelling or form alias has the root's adult, vulgar, sensitive and tm flags. (`alias-flags`)
- An alias points at a root, never at another alias, and differs from the root's text. (`alias-missing`, `alias-chain`, `alias-self` (errors), `alias-same`)

## Same word or related words

- Look for an existing entry first (grep the library, `tools/gen/find-word.mjs`); reuse it, never add a second root for the same sense, in any theme. (`duplicate`; across themes `sense-twin` (info), allow list `js/sense-allow.js`)
- Word families (3.7): a form of the same word is a `form` alias, and the theme shows it via `use`/`show` (apple / apples). Related but different words (gamer/gaming, pup/puppy) appear in one theme only inside one synonym group; otherwise keep the better one. Locked and `familyOk` themes are the exception; `familyOk` is set by hand only. (`family-pair`)
- Synonym groups hold same-answer words of one theme (sofa / couch): at least 2 members, all roots linked there, one group per word per theme. (`group-small`, `group-member`, `group-missing` (error))
- One alias family has at most one member linked per theme. (`family-twice`)
- Kin joins one-family roots in different themes (joy in emotions, joyful in happy words): symmetric, roots only. Clash groups stay at 8 or fewer, 12 at most. (`kin-bad`, `kin-missing` (error), `family-kin` (info), `clash-large` (info) for 9-12, `clash-big` above 12)
- Overlap: a theme never holds two words for one thing or a word and a more specific form of it (cola / Coca-Cola, shears / pruning shears) unless grouped; never a mixture or the bare category word (mixed nuts, `road` in road types). (`overlap` (info); judgement)

## Themes

- Name: lowercase except proper nouns, their adjectives and acronyms; house (US) spelling and the root's diacritics (`Galápagos animals`). Aim at 24 characters, never over 30. It must describe the members alone, outside the tree, and not contain a member's word. (`theme-name-long`, `theme-name`, `is-theme-name`; spelling and case: no check yet)
- Not a near-duplicate of an existing theme: search the theme names and members first (bike races / cycling races). (`theme-twin` (info), allow list `js/theme-twin-allow.js`)
- Parent: put it under the group or theme it is a real subtype of; a group holds no words. A sub-theme needs at least 4 distinct words and is a real subtype, not a shared word. (`group-words`, `link-group`, `theme-parent` (error), `theme-dup-id` (error); placement: judgement)
- Complete set: only a set with one agreed membership; the note is the exact comma list of members (`label: a, b (alt), c`); every member matches a note item, every item is covered, one entry per item; nicknames go in the member's synonym group. (`complete-no-note`, `complete-extra`, `complete-missing`, `thin`)
- Flags: pop and ident (1-5) on every theme with words; adult, sensitive, tm, lang, foreign, region where they apply (inherited down the tree). (`theme-unrated` (error), `foreign-flag`; the rest: judgement)
- A wordplay or compound theme has a rule in the game's grammar (GAME-CONTRACT.md: palindrome, double-letters, homophone, onomatopoeia, anagram, rhyme:X, contains:X, compound-start:X, compound-end:X, starts:X, ends:X, hidden:@id); otherwise it never plays. (`rule-theme` (error); export contract `contract-rule` (error), `contract-rule-unknown`)

## Links and ratings

- Typicality `typ` 1-5 is relative to that theme: 1 the first words named, 5 a real but peripheral member (tomato in fruits is 5); 0 is not a rating. (`bad-rating` (error); `rating-vs-zipf` outside the gate)
- Link the entry in the sense the theme means: Maltese [dog] in dog breeds, never Maltese [language]; split a wrongly linked sense into its own entry. (`sense-twin` (info))
- `show` (a shorter text) and `use` (a form alias) only on themes the entry is linked to; a shown text keeps the root's case and diacritics. (`show-theme`, `use-theme`, `use-form`, `same-display` (info))
- `nameOkIn` only for themes the entry is in. (`nameOk-stale` (info))
- Every member belongs to the theme unambiguously: a thoughtful player must not argue it fits another ordinary theme better. (no check: judgement)

## Workflow (CLAUDE.md "Changing the library")

1. Simon approves the change. Search git history for his earlier decisions on the words.
2. Write `tools/gen/batchNNN.mjs`: dry run with `--out <draft>`, then `npm run check -- <draft> --diff data/wordlist-en.project.json` (no new issues).
3. `--apply`; every entry it changes or confirms gets status `rev`; the version is bumped (`stampSave`). Rerun to 0 changes.
4. `node tools/export-game.mjs`, then `npm run gate` (it also checks the export against GAME-CONTRACT.md, that every entry the change adds or changes has status `rev`, and that no warning is new by identity; a raised baseline or an added allow-list key is printed as "needs Simon's approval").
5. Write the notice `tools/gen/batchNNN-changes.txt`. Sending it, and any pin, only on Simon's word.

## Doc conflicts found

- `clash-big`: settled 2026-11-20: warn above 12, info `clash-large` for 9-12 (DESIGN.md 6, DESIGN-entries.md 3.7 and the code agree).
- Spelling alias regions: DESIGN-entries.md 3.1 says US or UK only; 3.4 says every tag is kept; DESIGN.md 6 says a spelling alias needs a region only for a US/UK difference. 44 aliases carry other codes. Brief: US/UK spellings tagged, plain (accent) aliases untagged, as batch396 made them; Simon to settle the rest.
- Regional fam: settled 2026-11-20: familiarity is always for a general UK/US adult ("Rules in force"); DESIGN-entries.md 5's regional audience no longer applies.
- Theme-name rule (DESIGN-entries.md, v406) cites "the theme-generation prompt"; the app has none: the rule sits in the word prompt `GAME`. DESIGN.md 9 still names `rateThemes`, which js/ai.js no longer has.
- DESIGN.md 12 describes batches through `tools/apply-words.mjs`; CLAUDE.md's batchNNN workflow is the current one.

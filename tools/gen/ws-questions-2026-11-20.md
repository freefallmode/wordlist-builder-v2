# Questions for the game session (_WS_), sent 2026-11-20 to ref 38470e

Drafted 2026-11-20; first attempt failed (_WS_ unreachable); sent on Simon's word once it was back.

Questions from Simon, following your field table (now recorded in wordlist-builder-v2 GAME-CONTRACT.md and enforced by a new export-contract gate step). Please answer from the code, with a rough cost for each change.

1. **Wordplay rules.** 15 wordplay themes never play because their rule is "other" or "letter:...":
   - places that are also words
   - rhyming pairs
   - silly rhyming pairs
   - homographs
   - zigzag words
   - reversible words
   - no vowels
   - letters in alphabetical order
   - words made of Roman numerals
   - acronyms
   - portmanteau words, tech word blends, entertainment word blends
   - numbers, first letter changed (letter:numbers:first)
   - animals plus a letter (letter:animals:plus)

   Which new rule types could you add cheaply, where the property can be tested from the text (e.g. no-vowels, alphabetical, roman, reversible, plus-letter:@id, first-letter-changed:@id)? For the rest, our plan is to make them plain category themes with a curated list. Is that safe on your side, given that you can't check that no other word on the level also fits?

2. **Root regions.** 1,802 roots carry a region (satsuma [UK], newsagent [UK], Stilton [UK], butt [US], flat white [UK, AU, NZ]), and you ignore root regions, so everyone sees them. Where a matching word exists in the other dialect, we'll make the regional word a regional alias. For words with no equivalent, could the game read the root region? For example, it could raise the word's band for players of the other dialect, or keep it out of early levels. What would you suggest, and at what cost?

3. **Text lookup.** Lookup by text keeps the first root. 3,209 texts are shared by several roots, almost all real homographs (bat the animal / bat the club). Can your lookup accept any root with that text, for splits and compound tests? Our checks now flag only same-text roots that hide a common word (186).

4. **Alias links.** Please confirm that you never read links on alias rows. Most of the 2,931 are copies of the root's links that our export writes onto form and spelling aliases. 97 regional aliases have links of their own. Simon asks:
   - Why doesn't the game use alias links?
   - Would using them increase the variety and range of themes and words in levels? For example: a regional alias as an answer in its own region's levels, a form alias (apples) where a theme shows that form, a synonym or abbreviation alias as an answer, or a spelling alias shown by dialect.
   - What would it take to use them, and what risks do you see (duplicates within a level, clash, difficulty)?
   - If you'll never use them, we'll stop exporting them.

A table per question is ideal.

## The game's answers (2026-11-20, from its code and v411)

Proposals only; Simon decides. Any game change bumps its generator to g24.

**1. Wordplay rules.** The game tests every other word on a level against an exact theme's rule. Category themes get no property test, so turning these into plain categories is unsafe (another word with the property gets through). Options:
- A, cost 0.5 h: no-vowels, alphabetical, roman. Members all pass except chimpanzee.
- B: reversible (the reverse is a library word). 16 members' reverses aren't library words (denim/mined, diaper/repaid, knits).
- C, cost 1 h: plus-letter:@id and first-letter-changed:@id. "model" fails in animals plus a letter. @animals is too broad (it bars about 1,007 roots), so point it at a narrow species theme.
- D, cost 2 h: zigzag and rhyming pair, approximate.
- F, cost 1 h: a `members` rule that bars any level word whose text equals a member text. It's safe only if every root with the property is linked. Meant for homographs, acronyms, blends, places that are also words.
Its suggestion: A, B and C now (8 of 15 themes), F for the untestable ones with exhaustive linking, and D or F for zigzag and rhyming.
Library fixes it asked for: chimpanzee in alphabetical order; model in animals plus a letter; "fitness centre" in no vowels (inherited from gym); the duplicates in different spellings between the rhyming and zigzag themes (mishmash/mish mash, hodgepodge/hodge podge, wishy-washy/wishy washy).

**2. Root regions.** Levels are the same for both dialects, so the game can't drop a word for one dialect. In v411:
- 1,097 UK-only roots have no US alias;
- 293 US-only roots have no UK alias;
- 194 US-only roots have a UK alias;
- 187 roots have neither tag.
Recommended option A, cost 1-2 h: raise the band by +1 for a one-dialect root with no variant, and by +2 for one with neither tag. Option B, holding them out of early levels, only if A isn't enough. Library: make regional words regional aliases where an equivalent exists.

**3. Text lookup.** Two live uses keep only the first root: everyday split halves and the shared-theme-word test. Accepting any root costs about 1 h. 351 texts would newly qualify as split halves. After that change, the 186 same-text flags stop mattering for splits.

**4. Alias links.** Confirmed never read: by design an alias is a variant, not a word, and one level serves both dialects. The variety gain would be tiny: 8,343 of 8,437 alias links duplicate the root's own link. The other ~94 are mostly alias-as-answer cases. Using alias links would cost 1-2 days, with risks. Its recommendation: express those ~94 as root links with a `shown` text, then stop exporting alias links. That saves bytes and changes no levels.

## Simon's decisions and the agreed rule strings (2026-11-20)

Decisions:
- No members rule; the 9 untestable themes stay wordplay with rule `curated`, which plays from links with no property test.
- The alphabetical-order theme is deleted.
- Game g24 builds the 5 rule tests, the regional band raise (option A) and the any-root text lookup.
- Alias links are no longer exported.

The game confirmed the rule strings:
- `no-vowels`: letters only, no a, e, i, o, u; y is not a vowel; spaces and hyphens are ignored.
- `roman`: every letter is one of i, v, x, l, c, d, m.
- `reversible`: the reversed text is a different library word; palindromes don't count.
- `first-letter-changed:@id`: same length as a member of @id, with only the first letter different. @numbers is fine.
- `plus-letter:@id`: a member of @id with one letter inserted anywhere. It needs a new, narrow reference theme of everyday one-word animal names of about 3-6 letters, because `animals` is too broad. The theme can be kept from playing on its own.
- `curated`: links only. Any other unknown rule still never plays, so the contract check stays strict.

@id members include the whole subtree. An unplayable reference theme works too.

**Change (Simon, 2026-11-20):** "numbers, first letter changed" and "animals plus a letter" are exempt from property rules too: both are `curated`, with no reference theme. Tested: no-vowels, roman, reversible (3); curated: 11.

**Game g24 committed (Word Safari be895a3, 2026-11-20):** reads no-vowels, roman, reversible and curated (all 14 themes play on a v411 copy; rhyming_word_pairs appeared 0 times in 2,000 levels per mode). Regional roots +1/+2 band; shared texts looked up in every root; the slim drops alias links, so the export may stop writing them. Data fault: for 13 of 47 reversible_words members the reverse is not a library word (time/emit, trap/part, snap/pans, denim/mined, diaper/repaid, straw/warts); proposed contract check: every reversible member's reverse is an exported word.

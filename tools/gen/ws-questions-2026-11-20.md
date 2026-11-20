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

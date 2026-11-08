# Brief: top up themes that are thin or lack hard/easy words

Read `tools/gen/BRIEF-depth3.md` (rules, entry rules, clash handling, short entries, flags) and `tools/gen/BRIEF-rest.md`'s last bullet (always `find-word` and reuse labels; never skip a clash). Your input: `node tools/gen/list-topup.mjs <n>` (chunk n of 25 themes). For each theme it prints what is missing and every word it already has with its in-theme rating (1 = player places it instantly ... 5 = very hard to place).

Add words so that every listed theme meets its NEEDS line and, if still under 20 words, grows toward 20-30:
- Hard words (in-theme rating 4-5): genuine but less obvious members: rarer items, specialist terms, regional ones, foreign names. They must still unmistakably belong to THIS theme and be correct. For closed-set or tiny themes only add if truly valid; skip a theme (say so in your report) when nothing honest can be added.
- Easy words (rating 1-2): the most obvious members.
- Do not repeat words the theme already has; do not add near-duplicates ("smell" vs "sense of smell"); shortest natural form.
- Give existing entries (same text and label) rows with their usual `rec`; the in-theme rating is what you set per row.
- Do not change theme `d` unless clearly wrong (then set it in THEMES).
Write `tools/gen/t-<n>.mjs` (exports `DATA`, optional `ALIASES`, `FIXES`, `THEMES`), test on a scratch copy as in BRIEF-depth3, delete the scratch, do not commit or touch the real library. Report under 80 words: rows added, themes you could not fill and why.

## Same thing, different form (added with the synonym pass)
Do not list two words for the same answer in one theme as if they were separate members: the verb, noun and symbol forms of one concept (`subtract`, `subtraction`, `minus`, `take away`; `add`, `addition`, `plus`), a plain and a technical name (`salt` / `sodium chloride`), or ordinary synonyms (`couch` / `sofa`, `average` / `mean`). Prefer one form per concept. If more than one is worth having (they differ in difficulty or players would use either), add every form and then put them in a synonym group for that theme so a level never shows two of them. A generation module cannot make groups, so list them in a comment above the rows, one line per group: `// GROUP <theme id>: subtract / minus / subtraction`, and the group is made afterwards (tools/gen/syn3-make.mjs, BRIEF-syn3.md, syn3-apply.mjs). Related but different things are not a group: a sum is the result of addition, a product the result of multiplication; a word and its opposite, kind or part are never grouped.

## Long words get line-break points afterwards
See the last section of `tools/gen/BRIEF-depth3.md`: words of 8+ letters get hyphenation points in a follow-up pass that `apply-words.mjs` reminds the user to run; nothing to add to your module.

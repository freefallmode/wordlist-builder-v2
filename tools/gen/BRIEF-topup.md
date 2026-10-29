# Brief: top up themes that are thin or lack hard/easy words

Read `tools/gen/BRIEF-depth3.md` (rules, entry rules, clash handling, short entries, flags) and `tools/gen/BRIEF-rest.md`'s last bullet (always `find-word` and reuse labels; never skip a clash). Your input: `node tools/gen/list-topup.mjs <n>` (chunk n of 25 themes). For each theme it prints what is missing and every word it already has with its in-theme rating (1 = player places it instantly ... 5 = very hard to place).

Add words so that every listed theme meets its NEEDS line and, if still under 20 words, grows toward 20-30:
- Hard words (in-theme rating 4-5): genuine but less obvious members: rarer items, specialist terms, regional ones, foreign names. They must still unmistakably belong to THIS theme and be correct. For closed-set or tiny themes only add if truly valid; skip a theme (say so in your report) when nothing honest can be added.
- Easy words (rating 1-2): the most obvious members.
- Do not repeat words the theme already has; do not add near-duplicates ("smell" vs "sense of smell"); shortest natural form.
- Give existing entries (same text and label) rows with their usual `rec`; the in-theme rating is what you set per row.
- Do not change theme `d` unless clearly wrong (then set it in THEMES).
Write `tools/gen/t-<n>.mjs` (exports `DATA`, optional `ALIASES`, `FIXES`, `THEMES`), test on a scratch copy as in BRIEF-depth3, delete the scratch, do not commit or touch the real library. Report under 80 words: rows added, themes you could not fill and why.

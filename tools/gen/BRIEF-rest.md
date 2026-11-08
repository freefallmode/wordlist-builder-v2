# Brief addendum: the remaining (deeper) themes

Follow `tools/gen/BRIEF-depth3.md` in full, with these differences:
- Your theme list comes from `node tools/gen/list-depth.mjs <root> <n> rest` (the still-empty playable themes of that root: depth 4 and deeper, plus a few strays). Cover EVERY theme in it. Parent themes that are not groups may have sub-themes listed; give each listed theme its own words (a parent's words may overlap its children but should also include members that fit no child).
- Name the module `tools/gen/d45-<root>-<n>.mjs` and test it on a scratch copy as described.
- These themes are narrower, so 12 to 30 words per theme is right (never under 8 unless the theme is a tiny closed set); keep the difficulty spread within each theme and spread theme `d` across the chunk, using 4 and 5 for specialist themes.
- The library now has labels on every shared text (e.g. "mouth (river)", "bat (animal)"). ALWAYS run `node tools/gen/find-word.mjs word ...` for any word that might exist already or has several meanings and reuse the exact label of the matching meaning (so it is only linked); give new meanings their own label. Never skip a word for a clash.
- Apply the section "Same thing, different form" at the end of `tools/gen/BRIEF-depth3.md` (words for one concept in one theme: pick one form, or list the group in a comment).

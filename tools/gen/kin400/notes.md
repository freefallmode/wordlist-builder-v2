# Kin pass v400: progress and data oddities reported by chunk reviewers

| Chunk | K | KD | K? | N | N? | Kin rate |
|---|---|---|---|---|---|---|
| 01 | 233 | 66 | 49 | 129 | 13 | 71% |
| 02 | 249 | 34 | 79 | 106 | 22 | 74% |
| 03 | 262 | 16 | 67 | 114 | 31 | 70% |
| 04 | 250 | 5 | 75 | 131 | 29 | 67% |
| 05 | 244 | 3 | 68 | 145 | 30 | 64% |
| 06 | 194 | 8 | 83 | 184 | 21 | 58% |
| 07 | 249 | 53 | 65 | 109 | 14 | 75% |
| 08 | 209 | 41 | 61 | 143 | 36 | 63% |
| 09 | 236 | 31 | 73 | 89 | 61 | 69% |
| 10 | 255 | 13 | 57 | 136 | 29 | 66% |
| 11 | 257 | 16 | 45 | 145 | 27 | 65% |
| 12 | 190 | 39 | 81 | 148 | 32 | 63% |
| 13 | 189 | 14 | 80 | 167 | 40 | 58% |
| 14 | 153 | 41 | 94 | 135 | 30 | 64% |
| **all** | **3170** | **380** | **977** | **1881** | **415** | **66%** (4,527 of 6,823) |

Data oddities (for ISSUES.md after the pass):
- 14822 "silky": gloss "long-haired terrier" but linked in touch_words, texture_words (wrong sense linked?) (chunk 01)
- 25002 "pin" [fastening]: also linked in banking_words (PIN code sense mixed in?) (chunk 01)
- Same word stored twice (I23): scale 7193 / scales 38223 (both "weighing"), scale 8836 / scales 10395, bolt 7390 / bolts 48122; spare keys 23265 / spare key 23312 (chunk 02)
- reversible_words (wordplay) holds stressed 29030 and knits 29044: check they belong (stressed reverses to desserts; knits to stink: fine if the theme is reversals) (chunk 02)
- Same word stored twice (I23): cable/cables (balloon, bridge), two trash bag entries (chunk 05)
- "chattering" has gloss "cat" (misplaced?); "chat" linked in animal themes (chat the bird? check sense) (chunk 05)
- 62396 "set" glossed "French seven": the French word is "sept"; wrong text or gloss (chunk 03)
- object (26310, 28788) and mine (26416, 31788) each stored twice in other senses: check (chunk 03)
- Same word stored twice (I23): blood type/blood types, cold showers/cold shower, mothballs, yearbooks, peel/peels 17410/62411 (chunk 04)
- "sleep" 28696 linked in hidden_names; "reading" 50087 in places_that_are_also_words is the town Reading (capital/sense?) (chunk 04)
- Same word stored twice (I23): fig/figs, sardine/sardines, scone/scones, raccoon/raccoons, badger/badgers, tadpole/tadpoles, bluebell/bluebells, seedling/seedlings (chunk 06)
- Many entries without a gloss (polis, mumming, livery); "chess" the pie in pies_and_tarts is easy to misread (needs a gloss) (chunk 06)
- Consolidation: chunks differ on set/settings (01 K?) vs setter/set (03 K?), bear/bearing and train/trainer N? (pilot's bat/batter rule); pitcher (jug)/pitch N? in 03 but K? in 07; bowler hat/bowl K? in 07 vs bowl/bowler N? in 04: make consistent
- Same word stored twice (I23): chestnut/chestnuts (the nut, 2 pairs), Inca/Incas in ancient_civilizations (chunk 07)
- Same word stored twice (I23): hieroglyph / hieroglyphs / hieroglyphic / hieroglyphics (4 entries, one sense); gyros/gyro, counters/counter, terrace/terraces (chunk 08)
- Same word stored twice (I23): washer/washers 23705/48141 (chunk 10)
- Same word stored twice (I23): port "left side" 47462/47598; washer 23705, 23783 and washers 61446; fuse 40676/49766 (chunk 09)
- Same word stored twice (I23): washer/washers, bearing/bearings, flank/flanks, rune/runes, rusk/rusks (chunk 11). Chunk 11 has port/porter K? (09 says N?) and stationer/station K?: the chunk 09 rule decides
- Same word stored twice (I23): quark/quarks (particle), gauntlet/gauntlets (chunk 13)
- "axe" in latin_music_styles has lost its accent (axé: rule 8); Montpellier (French city) / Montpelier (US capital): near-duplicate texts, both correct (chunk 13)
- Same word stored twice (I23): buffers/buffer (railway) (chunk 12)
- Bobcats linked as a current NBA team (renamed Hornets 2014): check the theme (chunk 12, line 381)
- Chunk 12: porter/port 15x all N, buff/buffer 9x all N; bellow/bellows N? (13 says K?): settle by the chunk 09 rule
- Chunk 09's rule for other-sense pairs (consider for all chunks): a plain -s/-ing form of the same written word is K? (dock/docking, bear/bearing); a word derived from the other sense is N? (porter/port, washer/wash, pitcher/pitch); follows the pilot's gum/gums and lead/leader
- "atomic" 65890 in family_and_friends, gloss "atomic": should probably be "nuclear family" (chunk 10)
- hawkish in words_for_cold (wrong link?) (chunk 14)
- Same word stored twice (I23): kippers/kipper, dividers/divider, nubbly/nubby, calving/calve and others: 41 KD in chunk 14

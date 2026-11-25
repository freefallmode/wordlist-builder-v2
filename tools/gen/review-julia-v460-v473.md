# Review of Julia's v460-v473 (branch julia-category-fixes-2, 2026-11-25)

Automated checks on the branch: tests pass; gate PASS (9 passed, 1 warning: batch461 replays luge and skeleton into winter vehicles, which v462 takes out again; expected); `check --diff` against v459: no new errors or warnings, status rev and rule 8 fine; export contract PASS.
Content read by four Opus reviewers (v460-v461, v462-v465, v466-v469, v470-v473). The main claims were spot-checked against the library.
Verdict: every batch can merge, with fixes. As with v423-v428, the plan is merge, then one fix batch (v474) on main.

## A. Clear fixes (proposed for v474)

v460-v461 (travel)
1. emergency brake 46812 is the car brake (UK alias handbrake) but is linked in on_a_train and on_the_subway: UK players would see "handbrake" on a train. New entry emergency brake [train], move both links; gloss 46812 [car].
2. learning_to_drive: learner's permit 68680 (US,CA,AU) and provisional license 68691 (UK,IE) are two roots for one thing. Make provisional license (and licence) a UK,IE regional alias of learner's permit.
3. car_wash: detergent 23882 shows UK "washing powder". Unlink (soap and shampoo cover it).

v462-v465 (light, temperature, size, smells)
4. size_labels: extra small 68820 next to XS 39548, and extra large next to XL, with no group. Group them.
5. things_that_burn: figurative links. Drop bridge 7379 ("burn bridges"), CD 49347, calorie 3827; chili 29499 probably too.
6. deep_things: drop pocket 24952 ("deep pockets") and outer space 68808 ("deep space"); link pit [mine] 31789.
7. words_for_cold: link frozen 39916 (t2).
8. middle_eastern_scents: drop olive oil soap 16304 (kohl went out as "not a scent" in the same batch).
9. pungent_foods: liver went out as "taste, not smell", yet radish 405 and black pepper 721 came in. Drop them; tuna 467 t2 -> t4.
10. things_that_smell_bad: mothball 66296 fam 1 but its form mothballs fam 3: set fam 2-3, show mothballs.

v466-v469 (shapes, synonyms, sounds, textures)
11. plants_with_spines shares 17 of 27 words with thorny_plants (and most with its parent prickly_things); v469 added raspberry, acacia, rose, bougainvillea, all already in thorny_plants. Merge it into thorny_plants (twin rule), or at least take the four new links out.
12. prickly_things: rose 1693 put in the group thorn = rose thorn = rose (a word and its part). Unlink rose here; restore thorn = rose thorn.
13. symbols: division sign 68837 added beside obelus 26117 (the same ÷). Group them.
14. words_for_fast: lickety-split 27830 is an adverb (precipitate went out for that reason). Unlink.
15. quiet_things: shadow 28397 fam 3 -> 1.
16. fragile_things: drop reputation 29101 and ecosystem 32273 (abstract); add glass [material] 24032 at t1.

v470-v473 (motion, materials, colors, things with)
17. gold_things: Midas 6957 (a king) and Fort Knox 37714 (a vault) are not gold things. Unlink; El Dorado 21218 probably too.
18. things_with_numbers: mailbox 38221 is the street postbox (no number). Unlink; add jersey [sports shirt] 44229.
19. motion_verbs: link fly 67311 (the most obvious motion verb).
20. things_that_roll: drop credits 6396; ways_to_jump: drop parkour 5625.

## B. Decisions for Simon

1. Topic-word compounds. v462-v463 took red-hot, white-hot, piping hot, stone cold and pitch dark out of the words-for themes "as v447 found". v447 took out only the bare words hot, cold and dark, so this extends the rule and loses easy answers. Keep the extension, or put them back?
2. cold_things: polar bear and penguin went out ("not cold themselves"), but igloo, winter, Alaska, ski slope stay. Put them back at t3, or prune the associations too?
3. winter_vehicles: luge and skeleton out (the sport), bobsled stays (also the sport); snow tube is not a vehicle; shares half its words with polar_vehicles. Add a luge [sled] entry and fix bobsled, or merge into polar_vehicles?
4. winged_creatures: v470 added seven mythical creatures; now 17 of its 23 words are in things_that_fly and 17 in things_with_wings. Revert the mythical additions, or merge it into things_with_wings?
5. sharp_things: 10 of 46 words are weapons (sword, dagger, bayonet, guillotine...), not flagged, in a non-adult theme. Trim guillotine, bayonet, lance?
6. two_wheelers: 7 of 30 are carts and carriages (chariot, hansom cab, gig...); also hand truck, rickshaw. Keep to bikes and motorbikes?
7. Loose phrases in travel_trouble, car_trouble, in_a_glove_box, airport_security (bad weather, hidden fees, cracked windshield, squeaky brakes, ketchup packet, bag search...): v462 removed this kind elsewhere. Drop them?
8. Synonym fit in words_for_funny/new/old/strange/smart/strong: entertaining, facetious, trendy, futuristic, pristine, primitive, precocious are not true synonyms; ratings of silly, ridiculous, mysterious, mature high. Prune as listed?
9. Julia's own open items: nice (words_for_good) and mammoth (words_for_big) held back by the contract-dup-root baseline (raising it needs your OK); grill (verb) and barbecue (meat) standing in for appliances in hot_things; about 30 stub entries left in no theme (delete?); license plate out of things_with_numbers because UK "number plate" holds the theme word (lock the theme and add it?); Earth out of things_with_layers (case-sense-proper allow entry?).
10. US vacation spots: ident 4 -> 2 or 3 now that Las Vegas, Hawaii, Disney World are in; link New York, Yellowstone, Niagara Falls, Disneyland.
11. Overlaps worth a look: words_for_shiny keeps bright (now its own theme's topic word) and shares brilliant, dazzling, radiant, gleaming with words_for_bright; scented_products shares 18 of 39 with personal_care (trim sunscreen, mouthwash, toilet paper, cat litter, trash bags); flat_things holds landforms, flatfish, flatbreads and Netherlands/Kansas; manatee out of pink_things but still in pink_animals.

## C. Minor (fold into v474 unless Simon objects)

- Regional gaps: dead battery (UK flat battery), out of gas (out of petrol), package tour (package holiday), medallion [taxi] US, spring break US, barber pole (barber's pole).
- on_a_train: conductor and inspector [ticket] are one answer (conductor's UK alias is ticket inspector): group them.
- Ratings: rectangular_things and flat_things pop/ident 2 -> 3 like their siblings; things_with_numbers ident 2 -> 3; familiarity of nascent, jocular, farcical, uproarious, strapping, zonked, speckled, crisscross, atmosphere, strut one step easier; turnip, water, referee, rubber typicality one step lower.
- Weak links: thermos (food_chillers), infernal (words_for_hot), unheated, sewer (group with sewage), patchouli (Middle Eastern scents), hiccup and gurgle (eating_sounds), stealth bomber (quiet_things), Spider-Man (sticky_things), heart (fragile_things), tic-tac-toe/pillow (square), avocado (oval), Eeyore (blue -> gray), lychee (pink), lion (yellow), nickel (gray), Albert Einstein (tongues), light bulb (necks), janitor (keys), credits, Venice, swab, gloves, valve cap, campfire (summer camp holds "camp"), howl [animal sound] in voice_sounds (link howl [cry] 17016).
- Missing: summer (hot_things), onion (kitchen smells), bad breath (root, halitosis alias), tabby cat and badger (striped), ash (gray), trifle (layers), bulldozer (roadwork), creep (motion verbs), keycard/mirror/hangers (hotel room).
- Duplicates: horned owl -> alias of great horned owl; bluetongue -> alias of blue-tongued skink; chipboard UK alias of particle board; gold bar / ingot group; delete stubs pane, albino, coalface, thin [line].
- Types: ID card proper -> common; Rubik's Cube and Slinky org -> proper tm; Moai place -> common; hula hoop phrase -> common tm; husky [voice] pos adjective.
- things_made_of_glass note: "lightbulb" -> "light bulb". dark_creatures could be renamed "black animals".
- Notices: v460's notice says no link reverses an earlier decision, but it re-linked horse in modes_of_transport (Simon, v438); v461 reverts it. Send v460-v474 as one notice.

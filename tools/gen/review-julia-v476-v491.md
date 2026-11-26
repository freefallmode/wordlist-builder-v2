# Review of Julia's v476-v491 (branch julia-category-fixes-2, 2026-11-26)

Automated checks on the branch (v491, base v475 c28a83c): gate PASS 10/10; `check --diff` against v475 clean; strict export and export contract PASS; every batch reruns to 0 changes.
Her merge of main's v474-v475 (3cb8517) is correct: a three-way comparison found every v474/v475 change kept through v491, no deleted entry back, no removed link re-added.
Content read by five Opus reviewers (v476-v478, v479-v482, v483-v486, v487-v489, v490-v491); the main claims spot-checked against the library.
Verdict: every batch can merge; v478, v480 and v485 as they are, the rest with fixes. Plan as before: merge, then one fix batch (v492).

## A. Clear fixes

v476-v478 (things that…, tastes, colors)
1. things_underground: subway 2647 shows its UK alias "underground", the theme's own name word. Unlink. things_you_climb: jungle gym 5981 shows UK "climbing frame" (holds "climb"). Unlink. (The theme-name check does not look at regional aliases: I37.)
2. things_that_cut: scalpel 3475 taken out with no reason ("left out at the review"); relink t2-3.
3. Associations and non-members out: crocodile in things_that_tick; Liberty Bell and diving bell in bell_types; cannoli (fried) in baked_treats.
4. Groups: ladder = stepladder (things_you_climb); pickled herring = rollmops (cured_fish).

v479-v482 (trees, forests, flowers, plants)
5. crops and grasses_and_reeds: corn 406 is the vegetable (UK alias sweetcorn). Link maize 408 instead (crops t1, grasses t3).
6. plant_biology: testa 60232 beside seed coat 17436: group (or make testa an alias).
7. autumn_flowers (and purple_flowers): aster = Michaelmas daisy group.
8. mimosa 1801 is the sensitive plant (its alias) but is linked as a winter, yellow and sweet-smelling flower. Split: new mimosa [acacia flower] takes those links.
9. things_that_grow_on_trees: link walnut [nut] 30307 and chestnut [nut] 20261 (t2), left out only for an info-level check; also lime, date, conker.

v483-v486 (garden, landscapes, seashore, weather)
10. coloring book 68985 is a new root beside colouring book 66417 [UK]: make 66417 the UK spelling alias of 68985 and move its link.
11. famous_gardens: Babylon 6624 (the city) -> Hanging Gardens 6653; Tivoli Gardens (an amusement park) out.
12. Groups: natural arch = sea arch (rock_formations); stream = creek = brook (water_sources); hedge = hedgerow (countryside).
13. water_sources: dam out (holds water back), and fog.
14. things_that_block_the_sun: hat beside baseball cap, sombrero, bonnet (cowboy hat was left out for that overlap): drop the specific hats; eclipse (the event) out.

v487-v491 (seasons, rocks, earth science, habitats, environment)
15. natural_resources: link natural gas 32327 and wood [material] 24031 (t1-2), the first answers.
16. winter_fun: caroling 68994 needs its UK spelling alias carolling.
17. river: link boat 2779 (t1, in the theme's own note) and beaver 1010 (t2); gondola (a canal boat) out.
18. conservation_words: giant panda (an emblem) out.
19. rocks_and_minerals: link gold (it is in minerals beside fool's gold); mining_words: link coal (coal mine is the place, not the same answer).

## B. Judgement calls (my recommendation first)

1. Weak or figurative members in the new property themes: things_that_grow (universe, interest, shadow, bonsai), things_that_hang (wallpaper), things_that_buzz (crowd), things_underground (hobbit), things_you_climb (trellis, three of the four named mountains), autumn_fun (quilting, petting zoo, parade, birdwatching), winter_fun (ski lodge, hot tub, jigsaw puzzle), in_a_cave (hibernation, wolf, moss), rainy_day_fun (hot chocolate, popcorn), recycling (comic book), water_sources (sink, pipe, hose, sprinkler), rock_formations (geode, scree), weather (climate). Recommend: drop.
2. biomes mixes biomes with landforms (mountain, river, meadow, estuary) and lacks forest. Recommend: drop the four, link forest t1, put coniferous forest in the taiga group.
3. autumn_fun: Thanksgiving left out "as US" while hayride and corn maze are in (untagged). Recommend: link Thanksgiving and Bonfire Night; tag hayride and corn maze US.
4. winter_flowers: half its words are spring flowers (violet, daffodil, iris, anemone). Recommend: drop those four, crocus and hyacinth t3, add winter aconite.
5. sunrise and sunset in "dawn and dusk sights" are the topic itself. Recommend: unlink (the no-topic-word rule).
6. backyard shares 46% with garden ("backyard" is the US word for garden). Recommend: keep (a different everyday angle), add sandbox.
7. ocean_ingredients (under umami foods) drifted into general seafood (tuna, clam, sardine, caviar). Recommend: take the four out.
8. Missing first answers: summer_fun barbecue (needs a grill sense; the entry is the meat), water fight, pool party; vegetable_garden green beans, cabbage, beet, spinach; things_that_buzz bumblebee; things_underground rabbit; on_a_nature_walk nest; heath_and_moor_plants bilberry; drink_shades champagne (needs a colour entry); on_a_desert_island sea, wave. Recommend: add.
9. Gem varieties (emerald, ruby) beside their species (beryl, corundum) in minerals. Recommend: accept, and add sapphire to match.
10. plantain [weed] and plantain [herb] are one plant (Julia's open question). Recommend: merge into [weed].

## C. Minor (into v492)

- Groups: flower = sunflower and hair = beard = mustache (things_that_grow); rock = boulder (things_you_climb); glasses = sunglasses (pairs_you_wear); azalea = rhododendron (poisonous plants, pink flowers); umbrella = parasol; board game beside chess and dominoes; fish = shark (desert island); hay bale = haystack; cave = grotto; flowerpot and plant pot one entry; basement = cellar; duck beside waterfowl.
- Swaps: razor -> electric razor (things_that_buzz); kennel -> dog house (backyard).
- Ratings: weeping willow f2; sugar beet f3; bunting f3; pumpkin carving and snow angel f2; mahonia f4; light bulb t4 (buzz); sunflower t4 (wildflowers); pansy t3 (orange); fuchsia t3 (autumn); orchid t3 (South American); puddle t4 (bodies of water); desert t3 (flat landscapes); pyramid t4 (desert); dragon and treasure t3 (in a cave); sardine t3 (cured fish); natural_resources ident 3; autumn_fun ident 3.
- Weak links: watermelon (drip), Game Boy (beep), pumpkin/watermelon/cucumber (climbers), hay (crops), binoculars and eggshell [hen shell] (nature walk), mallee (eucalypts), zoo (conservation), oxygen, granite/marble/limestone beside stone, tree beside forest, fish beside wildlife (natural resources), claret or bordeaux (drink shades), go-kart, Oktoberfest (flag sensitive like the other beer words).
- Regional: rubbing alcohol (UK surgical spirit); corn maze (UK maize maze).
- Outside the batches, seen in passing: peanut's UK alias "monkey nut" should be a synonym alias; great plains 30956 should be the place Great Plains; brine 18034 is typed verb but linked as the noun in cheesemaking and preserving; Big Dipper lacks UK "the Plough"; sleigh's gloss [Santa's ride] -> sled.

# Bubble Word Jam: level record

Game: Bubble Word Jam (Lion Studios Plus / AppFore, package `com.AppFore.BubbleWordJam`), played on the Pixel_5_Play emulator, from 25 Nov 2026.

## How the game works (so far)

- Goal per level: merge words of the same theme by dragging one bubble onto another. 4 words of one theme clear it ("Merge 4 words that belong to the same category to clear it"). The bar at the top counts themes cleared, e.g. `0/5`.
- A merged bubble grows and changes colour with its count: 2 words green, 3 purple, 4 orange, then it clears with a praise word ("Fantastic!").
- Per Simon, the game shows the theme name for ~1 s when a theme clears. In level 1 I did NOT capture it: farm animals cleared before this was known; for days, vehicles (burst of 5 frames at ~0.4 s intervals) and colours (burst, 250 ms drag) the frames showed only the praise word ("Awesome!", "Well Done!") and no theme name. Theme names below are my own inference unless marked "(shown)".
- Praise words seen on 4th merge: Fantastic!, Awesome!, Well Done! (varies).
- Level complete screen: "WELL DONE" ribbon, +30 coins (shell coin currency; total 900 after level 1), green LEVEL 2 button.
- Bubbles move with physics after each merge, so positions change.
- Bottom bar: three locked buttons labelled LVL 3, LVL 4, LVL 7 (boosters or tools that unlock at those levels, presumably).
- Settings cog top right.

- (Simon, confirmed) New bubbles drop in as themes clear, so a level holds more words than are on screen at the start.
- (Simon) The theme name appears inside the merged 4-word orange bubble, briefly, before the clear.
- From level 2: a limited number of moves per level (counter top left); progress bar shows themes cleared out of the level's theme count.

## Columns

- **Theme**: inferred name, or "(shown)" if the game displays it.
- **Words**: as written in the game (caps as shown).
- **Split**: a word built from two split pieces, written with `|` where the split is, e.g. `SUN|FLOWER`.

## Level 1

Themes: 5. Split words: 0. Words: 20.

| Theme (inferred) | Words |
|---|---|
| Farm animals | PIG, COW, GOAT, HORSE |
| Compass directions | NORTH, SOUTH, EAST, WEST |
| Days of the week | MONDAY, TUESDAY, FRIDAY, SUNDAY |
| Vehicles | CAR, BUS, TRUCK, BICYCLE |
| Colours | RED, BLUE, GREEN, YELLOW |

Notes: theme names not captured (see above). Level complete reward 30 coins. Tutorial level; a hand animation shows dragging COW. No timer or move counter visible.

## Level 2

Themes: 8 (bar `0/8`). Words: 32 (21 on screen at the start, 11 dropped in later). Split words: 0. Moves: started at 39; ended with 14 left.

| Theme | Words | Name |
|---|---|---|
| Fruit | APPLE, BANANA, ORANGE, GRAPE | (guessed) |
| Vegetables | POTATO, ONION, LETTUCE, CARROT | (guessed) |
| Shapes | SQUARE, RECTANGLE, TRIANGLE, CIRCLE | (guessed) |
| Sweets | FUDGE, BROWNIE, COOKIE, CANDY | (guessed) |
| Driving | CAR, ROAD, TRAFFIC, BRAKE | DRIVING (shown) |
| Tableware / cutlery | SPOON, KNIFE, FORK, PLATE | (guessed) |
| Furniture | BED, TABLE, DOOR, CHAIR | (guessed) |
| Nature | CLOUD, SKY, HILL, SOIL | NATURE (shown) |

Start board (21): DOOR, SQUARE, TABLE, SPOON, APPLE, BANANA, ORANGE, POTATO, TRIANGLE, KNIFE, GRAPE, ONION, CIRCLE, BED, LETTUCE, FORK, RECTANGLE, PLATE, CARROT, CLOUD, CHAIR.
Arrived later, in batches after each theme clears: after fruit cleared FUDGE, SOIL, BRAKE, SKY (4); after vegetables ROAD, CANDY, COOKIE, HILL (4); after shapes BROWNIE, CAR, TRAFFIC (3). Nothing arrived after later clears.

Notes:
- Cross-theme decoys that look like they fit more than one group: DOOR (with furniture, but it is not obvious), PLATE (cutlery/tableware group, not furniture), CLOUD/SKY/HILL/SOIL (nature, not weather), BRAKE and TRAFFIC with ROAD/CAR (driving). No wrong merge was made.
- Move counter: each correct merge costs 1 move. 39 at the start, 14 at the last clear: 25 moves used for 24 merges (8 themes x 3 merges). The extra move went before the first merge (39 -> 38), probably the "Got It!" tap passing through to a bubble; unconfirmed. Cost of a wrong merge: not yet seen.
- Theme name display: the name replaces the 4 words inside the orange bubble for a fraction of a second (~0.5-1 s after the 4th merge), then the praise word and the clear. Caught twice (DRIVING, NATURE) by taking a screenshot ~1 s after the drag ended (adb screenshot latency). Missed for the other six; those names are guesses.
- Praise words seen: Incredible!, Cool!, Splendid!, Fantastic!, Awesome!, Well Done!.
- Level complete reward: 30 coins (counter stayed 930 on this screen), green LEVEL 3 button.
- **New feature at level end (stopped here): after the last theme clears, the remaining moves are converted into a "MASTERY" bubble.** Blue bubble in the centre labelled `MASTERY 0` with "Tap to skip"; the MOVES counter ticks down (14 -> 11 seen) while small blue bubbles fly from the moves counter into the mastery bubble. It then moves to the WELL DONE / +30 coins / LEVEL 3 screen. Meaning of mastery (bonus for leftover moves?) not yet known.

## Level 3

Themes: 8. Words: 32 (incl. 1 picture bubble). Split words: 0. Moves: 39 at start, 15 left at the last clear (24 merges = 8 themes x 3, 1 move each). Level-end MASTERY showed 14 (moves left minus 1 at that moment; value ticks down while the animation runs). Reward +30 coins (counter 960 on the WELL DONE screen).

| Theme | Words | Name |
|---|---|---|
| School subjects | SCIENCE, ART, MATH, HISTORY | SCHOOL SUBJECTS (shown) |
| Body parts | HAND, EAR, EYE, LEG | BODY PARTS (shown) |
| Toys | BALL, DOLL, PUZZLE, KITE | TOYS (shown) |
| Bodies of water | LAKE, RIVER, POND, SEA | BODIES OF WATER (shown) |
| Music | RAP, JAZZ, ROCK, POP | MUSIC (shown) |
| School | [picture bubble: stack of books, pencil cup and clock], BOOK, DESK, PEN | SCHOOL (shown) |
| Accessories (clothing) | HAT, TIE, PURSE, BELT | ACCESSORIES (shown) |
| Food | BREAD, EGG, RICE, MILK | FOOD (shown) |

Start board (22 bubbles before the booster): SCIENCE, ART, HISTORY, BALL, BOOK, EYE, BREAD, EGG, DESK, MILK, PEN, LEG, RICE and 9 more hidden behind the tutorial popup. Booster press added 3 words (which three is unclear; the board after it: PURSE, SEA, POP, DOLL, PUZZLE, MATH, KITE, EAR, HAND are all visible, so the spawned three are among the words not seen before the popup). Arrived later after clears: POND, ROCK, HAT and the picture bubble (after school subjects); TIE, JAZZ, RAP, BELT (after body parts); LAKE, RIVER (after toys); none after later clears.

Notes:
- **Booster EXTRA BUBBLES**: tapping the "+" costs no move and no coins, badge went 3 -> 2, and it spawns 3 new word bubbles on the board (which then can be merged like others). Used once, only because the tutorial required it.
- **Picture bubble**: one bubble shows an image (books, pencil cup, alarm clock) instead of text. It belongs to the SCHOOL theme; when merged, the merged bubble shows the picture above the word list. No text for this word is shown anywhere, so the "word" is unknown (probably SCHOOL, since the theme name is shown as SCHOOL).
- Decoys: ROCK/POP (music, also nature/drinks); SEA (water); PURSE/BELT (accessories, not clothes only); BOOK (school, also reading); EYE/EAR/HAND/LEG. Theme names are generic category labels (ACCESSORIES for hat/tie/purse/belt).
- Theme-name display: the name replaces the word list in the orange bubble for ~1 s after the 4th merge; one `drag` with WAIT=1 caught it every time (8/8).
- Praise word still appears per clear (not recorded here).

## Level 4

Themes: 10 (bar `0/10`). Words: 40 (incl. 2 picture bubbles). Split words: 0. Moves: 45 at start, 15 left at the last clear (30 merges, 1 move each). MASTERY shown at the end: 44 (looks cumulative: leftover moves of levels 2, 3 and 4 = 14 + 15 + 15). Reward +30 coins (990 after).

| Theme | Words | Name |
|---|---|---|
| Weather | RAIN, SUN, SNOW, WIND | WEATHER (shown) |
| Shoes | SOLE, HEEL, AGLET, LACE | SHOES (shown) |
| Furniture | BED, TABLE, SOFA, CHAIR | FURNITURE (shown) |
| Doctor | HOSPITAL, PATIENT, MEDICINE, STETHOSCOPE | DOCTOR (shown) |
| Jobs | [picture bubble: doctor with head mirror], CHEF, TEACHER, FARMER | JOBS (shown) |
| Planets | MARS, PLUTO, SATURN, VENUS | PLANETS (shown) |
| Meals | BREAKFAST, LUNCH, DESSERT, DINNER | MEALS (shown) |
| Senses | SIGHT, SMELL, TASTE, TOUCH | SENSES (shown) |
| Numbers | THREE, FOUR, EIGHT, FIVE | NUMBERS (shown) |
| Clothes | HAT, PANTS, SHIRT, [picture bubble: brown boots] | CLOTHES (shown) |

Start board (21): PANTS, FARMER, HOSPITAL, RAIN, SOLE, SNOW, SHIRT, STETHOSCOPE, WIND, CHEF, MEDICINE, PATIENT, HEEL, SUN, AGLET, LACE, BED, HAT, TABLE, SOFA, TEACHER. Arrived later: after weather cleared CHAIR, TOUCH, VENUS, LUNCH; after shoes EIGHT, FOUR, PLUTO and the boots picture; after furniture FIVE, MARS, BREAKFAST, SIGHT; after doctor SATURN, SMELL, TASTE and the doctor picture; after jobs THREE, DINNER, DESSERT; after the other clears nothing.

Notes:
- **Booster HINT unlocked (LVL 4 button)**: tutorial popup "HINT: Highlight 2 matching bubbles!" with a magnifier icon, badge 3 uses; I tapped it as the tutorial required. It turned two bubbles (RAIN and SUN) gold/yellow and cost no move. Badge went 3 -> 2. It is still on the next levels. Hint highlights one pair of the same theme.
- Words appear in two bubble sizes: long words (STETHOSCOPE, HOSPITAL, BREAKFAST, DESSERT, PATIENT, MEDICINE) use smaller text in the same bubble size.
- Picture bubbles (2): doctor (JOBS) and boots (CLOTHES). Boots are a clothes item, not shoes, so a SHOES theme exists as well (SOLE, HEEL, AGLET, LACE, parts of a shoe, so "SHOES" is a parts-of-a-shoe theme).
- Decoys: HAT and SHIRT could be clothes; PATIENT/STETHOSCOPE/HOSPITAL vs JOBS (doctor picture belongs to JOBS but the DOCTOR theme is the hospital words); SUN/RAIN/SNOW/WIND weather; TABLE/CHAIR/BED/SOFA.
- Theme names captured (shown) for all 10 using one drag with WAIT=1 plus a later screenshot.
- Coins now 990.

## Level 5

Themes: 11 (bar `0/11`). Words: 44 (incl. 2 picture bubbles). Split words: 0. Moves: 43 at start; 16 left after the last merge (33 merges would leave 10, so the move streak bonus gave +6). MASTERY at the end showed 44 while the counter read 14 (same figure as level 4's 44, so it may not be cumulative leftover moves; unclear). Reward +30 coins (1,020 total).

| Theme | Words | Name |
|---|---|---|
| Flowers | DAISY, TULIP, LILY, ROSE | FLOWERS (shown) |
| Insects | ANT, MOTH, BEE, FLY | INSECTS (shown) |
| Coffee | MOCHA, LATTE, AMERICANO, ESPRESSO | COFFEE (shown) |
| Cat | WHISKERS, MEOW, PURR, SCRATCH | CAT (shown) |
| Pets | FISH, DOG, BIRD, [picture bubble: ginger kitten] | PETS (guessed) |
| Nuts | WALNUT, PEANUT, ALMOND, CASHEW | NUTS (shown) |
| Illness | FLU, COLD, FEVER, COUGH | ILLNESS (shown) |
| Polygons | HEXAGON, SQUARE, OCTAGON, PENTAGON | POLYGONS (shown) |
| Dairy | CHEESE, CREAM, BUTTER, YOGURT | DAIRY (shown) |
| Beverages | TEA, JUICE, SODA, [picture bubble: takeaway coffee cup] | BEVERAGES (shown) |
| Baking | PIE, CAKE, BREAD, COOKIE | BAKING (shown) |

Start board (24): DAISY, TEA, FISH, DOG, SCRATCH, ANT, FLY, JUICE, PIE, CAKE, MOTH, BEE, COOKIE, BIRD, PURR, TULIP, SODA, LILY, WHISKERS, BREAD, MOCHA, LATTE, ROSE, MEOW. Arrived later (batches of ~4 after each clear): ESPRESSO, CASHEW, AMERICANO, CHEESE; HEXAGON, FEVER, COUGH, BUTTER; FLU, PENTAGON, YOGURT, the coffee-cup picture; the kitten picture, OCTAGON, CREAM, ALMOND; SQUARE, WALNUT, PEANUT, COLD (the last words of each of those themes dropped in over several clears).

Notes:
- **New: MOVE STREAK popup at level start**: "Make 5 correct merges in a row to earn +1 move!" (button Got It!). It worked: 33 merges gave +6 moves (a purple ring around the counter shows streak progress).
- **Overlapping themes (red herrings)**: CAT (whiskers/meow/purr/scratch) vs PETS (fish/dog/bird + kitten picture): the kitten picture belongs to PETS, not CAT. COFFEE (mocha, latte, americano, espresso) vs BEVERAGES (tea, juice, soda, coffee-cup picture). NUTS vs DAIRY vs BAKING are clear. COOKIE/CAKE/PIE/BREAD = BAKING while CHEESE/CREAM/BUTTER/YOGURT = DAIRY.
- A theme can have a long name only as a single-word cluster label (all names are one word here).
- The level 5 board is larger (24 bubbles at start); small-print for long words (AMERICANO, ESPRESSO, WHISKERS, PENTAGON).
- The "+" and Hint boosters now show badge 2 (not used this level); LVL 7 still locked.

## Level 6

Themes: 11 (bar `0/11`). Words: 44 (incl. 1 picture bubble). Split words: 0. Moves: 43 at start, 16 left after the last merge (33 merges, so streak bonus +6 again). Mastery value at the end not captured (animation finished before I looked). Reward +30 coins (1,050 total).

| Theme | Words | Name |
|---|---|---|
| Mountains | ALPS, ANDES, EVEREST, FUJI | MOUNTAINS (shown) |
| Pyramid / Egypt | TOMB, PHARAOH, EGYPT, STEPS | PYRAMID (shown) |
| Shapes (3D) | SPHERE, CUBE, CYLINDER, [picture bubble: pyramid] | SHAPES (shown) |
| Music | PIANO, FLUTE, GUITAR, DRUM | MUSIC (shown) |
| Fire | FLAME, SMOKE, ASH, EMBER | FIRE (shown) |
| Face | EYES, CHEEKS, NOSE, MOUTH | FACE (shown) |
| Sleep | BED, DREAM, BLANKET, PILLOW | SLEEP (shown) |
| Dog | BARK, LEASH, BONE, FETCH | DOG (shown) |
| Personality | SHY, KIND, BRAVE, HONEST | PERSONALITY (shown) |
| Drinks | SODA, MILK, TEA, COFFEE | DRINKS (shown) |
| Sea animals | TURTLE, SEAL, JELLYFISH, OCTOPUS | SEA ANIMALS (shown, two lines) |

Start board (24): TEA, STEPS, TOMB, CYLINDER, TURTLE, ANDES, FLUTE, EGYPT, SPHERE, MILK, PHARAOH, SODA, ALPS, COFFEE, JELLYFISH, EVEREST, SEAL, PIANO, FUJI, CUBE, GUITAR, DRUM, OCTOPUS, plus one more hidden under the popup (CYLINDER was visible after). The rest arrived in batches of about 4 after each clear (LEASH, FLAME, KIND, HONEST, NOSE, BONE, SMOKE, the pyramid picture, BARK, SHY, EMBER, BRAVE, EYES, CHEEKS, MOUTH, BED, ASH, DREAM, FETCH, BLANKET, PILLOW). No new bubbles after the SLEEP clear (last 4 themes had nothing dropping in).

Notes:
- **New: "TAP & HOLD TO PREVIEW WORDS" popup at the start (level 6).** Tapping and holding a bubble (about 1.5-3 s) shows its word in a banner at the top and lights the bubble; useful for the picture bubble or tiny words. I held TEA to try it; no move cost.
- Picture bubble again (pyramid picture is a SHAPES member, not the PYRAMID theme).
- Overlaps: FIRE vs SMOKE/ASH/EMBER fine; SEAL could be animals; DOG (bark, leash, bone, fetch) vs nothing; PYRAMID theme (Egypt words) vs SHAPES (pyramid picture): a clear red herring. FACE vs body parts; SLEEP (bed, blanket, pillow, dream) vs furniture. BARK also fits tree.
- A drag onto a target that had just moved sometimes did nothing (no move cost): HONEST failed once because the target was drifting.
- LVL 7 button still locked at the end of level 6.

## Level 7

Themes: 12 (bar `0/12`), in a **hierarchy** (see Notes). Words: 52 bubbles in all (28 on screen at the start incl. the 4 TIME words, the rest arriving in batches). Split words: 0. Moves: 46 at start; the Magnet clear and 2 other merges cost nothing extra; 16 left at the last merge. Reward +30 coins (1,080). Level 8 button is labelled "HARD LEVEL 8" in red with an octopus (first "hard" level label).

| Theme | Words | Name |
|---|---|---|
| Temperature | COOL, WARM, HOT, COLD | TEMPERATURE (shown) |
| Weight | GRAM, OUNCE, KILOGRAM, POUND | WEIGHT (shown) |
| Length | INCH, MILE, CENTIMETER, METER | LENGTH (shown) |
| Time | HOUR, DAY, WEEK, MINUTE | TIME (cleared by the Magnet, name not seen then; later seen as a bubble "TIME") |
| Measurements (level-2 theme) | TEMPERATURE, WEIGHT, LENGTH, TIME (the thermometer picture, bathroom-scale picture, ruler picture and the word TIME) | MEASUREMENTS (shown) |
| Planets | JUPITER, VENUS, PLUTO, SATURN | PLANETS (shown) |
| Space (level-2 theme) | MOON, STARS, COMETS, [picture: planet Jupiter-like] | SPACE (shown) |
| Water transport | RAFT, SHIP, BOAT, BARGE | WATER TRANSPORT (shown, two lines) |
| Royalty | QUEEN, KING, PRINCE, PRINCESS | ROYALTY (shown) |
| Writing | PEN, PENCIL, MARKER, CRAYON | WRITING (shown) |
| Americas | LATIN, NORTH, SOUTH, CENTRAL | AMERICAS (shown) |
| Landmass (continents) | AFRICA, ASIA, EUROPE, AMERICAS | LANDMASS (shown) |

Start board before the Magnet (28): STARS, COOL, AFRICA, COMETS, SATURN, VENUS, ASIA, EUROPE, METER, HOUR, POUND, DAY, WEEK, MILE, MINUTE, INCH, HOT, KILOGRAM, CENTIMETER, GRAM, OUNCE, COLD, WARM, MOON, JUPITER, PLUTO, PEN, and one more partly hidden by the popup (probably MONTH or similar: unseen).
Arrivals after clears: after TIME (magnet) nothing named; after TEMPERATURE the thermometer picture; after TEMPERATURE... (see Notes) QUEEN, BARGE; after WEIGHT the bathroom-scale picture plus LATIN, SOUTH, KING, PRINCE; after LENGTH the ruler picture plus PENCIL, CENTRAL, RAFT, then BOAT, SHIP, NORTH; MARKER, CRAYON, PRINCESS later; the planet picture after PLANETS; the word AMERICAS after the Americas clear; the word TIME after the Magnet clear. (Exact batches not tracked.)

Notes:
- **New: MAGNET booster unlocked (LVL 7 button).** Tutorial: "Always completes the category with most words available and merge!" with a hand on the button; badge 3, I tapped it as required. It auto-merged and cleared one theme (TIME: HOUR, DAY, WEEK, MINUTE; seen because those 4 words vanished) for 0 moves, bar went 0/12 -> 1/12, badge 3 -> 2. Then all three boosters showed badge 2.
- **New: hierarchical themes / theme-name bubble.** When a theme clears, its name can come back as a new bubble, either as a word (TIME, AMERICAS) or a picture (thermometer = TEMPERATURE, scale = WEIGHT, ruler = LENGTH, planet = PLANETS), and that bubble is a member of a parent theme: MEASUREMENTS (TEMPERATURE, WEIGHT, LENGTH, TIME), SPACE (PLANETS, MOON, STARS, COMETS), LANDMASS (AFRICA, ASIA, EUROPE, AMERICAS). The parent themes were completed last. So `0/12` counts 9 sub-themes + 3 parent themes (the 3 parents counted as separate themes, 3 x 4 + 9 x 4 = 48 words, plus the 4 pictures/words that were spawned = bubbles; total distinct bubbles = 52).
- This also explains the picture bubbles in level 6 (pyramid, ...): probably the same system (a spawned picture for a cleared theme).
- Picture bubble meaning needs tap-and-hold preview; the hint "TAP & HOLD" popup (level 6) was not needed.
- Decoys: SOUTH/NORTH/CENTRAL need LATIN (Latin America) so they fit no compass group; PEN/PENCIL vs PENCIL; PRINCESS at the end of ROYALTY; SATURN/VENUS/JUPITER/PLUTO planets vs MOON/STARS/COMETS (space).
- Praise words per clear are not recorded.
- Hint and Extra Bubbles boosters each show badge 2 (each used once earlier).

## Level 8 (HARD)

Themes: 12 (bar `0/12`; a "Hard Level" text and red octopus covered the bar at the start). Moves: 44 at start; 11 left at the end (the +1 streak bonus fired 3 times). Mastery shown at the end: 93. Reward on the WELL DONE screen: 60 coins (double the usual 30; hard level). A 'Having Fun? Rate us' popup appeared first (closed with its X). Words: 28 on screen at the start, 48 bubbles in all (9 themes x 4 sub-words... see table; 3 parent themes come back as bubbles). Split words: 0. No booster used.

| Theme | Words | Name |
|---|---|---|
| Birds | SWAN, PARROT, CROW, EAGLE | BIRD (shown; singular) |
| Storms | HURRICANE, TORNADO, BLIZZARD, CYCLONE | STORMS (shown) |
| Family | FATHER, MOTHER, SISTER, BROTHER | FAMILY (shown) |
| Organs | HEART, LUNG, LIVER, KIDNEY | ORGANS (shown) |
| Artist | ACTOR, DANCER, WRITER, POET | ARTIST (shown) |
| Vegetables | BROCCOLI, CELERY, CAULIFLOWER, CARROT | VEGETABLES (shown) |
| Reptile | GECKO, IGUANA, SNAKE, CROCODILE | REPTILE (shown; singular) |
| Species (parent) | BIRD, MAMMAL, AMPHIBIAN, REPTILE | SPECIES (shown) |
| Fast food / meals | BURGER, STEAK, SALAD, PIZZA | FOOD (shown) |
| Pastry | BAGEL, DONUT, MUFFIN, CROISSANT | PASTRY (shown) |
| Shoe parts | OUTSOLE, EYELET, LACE, HEEL | SHOE (shown) |
| Materials | GLASS, PLASTIC, WOOD, PAPER | MATERIAL (shown; singular) |

Start board (28): SWAN, SALAD, ACTOR, HURRICANE, MAMMAL, PARROT, DANCER, WRITER, AMPHIBIAN, LUNG, FATHER, CROW, TORNADO, POET, BLIZZARD, HEART, BROTHER, LIVER, CYCLONE, PIZZA, EAGLE, SISTER, MOTHER, KIDNEY, plus 4 more partly hidden under the first overlay.
Arrivals (after clears): after BIRD: BROCCOLI, STEAK, PLASTIC, (BIRD itself returns as a bubble); after STORMS: DONUT, GECKO, BURGER, LACE; after FAMILY: IGUANA, BAGEL, EYELET, HEEL; after ORGANS: SNAKE, CELERY, CROISSANT, CAULIFLOWER; after ARTIST: MUFFIN, WOOD, OUTSOLE, CARROT; after VEGETABLES: GLASS, PAPER, CROCODILE, (VEGETABLES not returned); REPTILE then returned as a bubble (member of SPECIES).

Notes:
- Hierarchy again but smaller: only BIRD and REPTILE came back as bubbles (members of SPECIES with MAMMAL, AMPHIBIAN). STORMS, FAMILY, ORGANS, ARTIST, VEGETABLES, FOOD, PASTRY, SHOE, MATERIAL were final names; none came back.
- Four of the themes were pure sets of 4; two themes (animal classes, and the 4 new-words) arrive staggered, so a theme can sit at 3 for several merges (reptile waited for CROCODILE).
- Red herrings: SALAD (could pair with vegetables), STEAK/PIZZA/BURGER vs the bakery items, PLASTIC/WOOD (materials) vs shoe parts, LACE (shoe vs cloth), ACTOR/DANCER vs WRITER/POET (the theme ARTIST covers all four).
- The 5-in-a-row bonus (+1 move) fired three times.
- Level end: MASTERY 93 shown on a big bubble with "Tap to skip", autumn leaf decoration on the frame (seasonal), coin counter 1,110 before the 60 reward. The next button is plain green "LEVEL 9" (not hard).
- Theme names are all shown for this level (12/12).

## Level 9

Themes: 10 (bar `0/10`). Moves: 45 at start, 19 left at the end (the +1 streak bonus fired several times). Mastery shown at the end: 107. Reward on the WELL DONE screen: 30 coins (the normal amount; the hard level 8 paid 60). Coin counter read 1,110 at the level 8 mastery screen and 1,170 at the level 9 end (the counter's timing vs the reward is unclear). No booster used. Split words: 0. Words: 28 on screen at the start; 40 bubbles in all (8 themes x 4 words from words, plus 3 name bubbles that came back as a picture or word: tree picture, parrot picture, BULLS... see notes).

| Theme | Words | Name |
|---|---|---|
| Tree parts | BARK, ROOT, BRANCH, TRUNK | TREE (shown); came back as a tree picture bubble |
| Bird parts | BEAK, TAIL, FEATHERS, WINGS | BIRD (shown); came back as a parrot picture bubble |
| Cattle | ANGUS, BISON, YAK, BUFFALO | BULLS (shown) |
| Movie genre | DRAMA, HORROR, WESTERN, COMEDY | MOVIE GENRE (shown, two lines) |
| Tastes | SWEET, SOUR, BITTER, UMAMI | TASTES (shown) |
| Dances | WALTZ, SAMBA, TANGO, BALLET | DANCES (shown) |
| Baby items | DIAPER, PACIFIER, CRIB, STROLLER | BABY (shown); came back as the word BABY |
| Stages of life | BABY, KID, TEEN, ADULT | STAGES OF LIFE (shown, two lines) |
| Facial care | CREAM, SERUM, TONER, PATCHES | FACIAL CARE (shown, two lines) |
| Forest (parent) | tree picture, parrot picture, MUSHROOM, JAGUAR | FOREST (shown) |

Start board (28): BRANCH, DRAMA, WESTERN, ANGUS, FEATHERS, BEAK, TAIL, BUFFALO, BISON, KID, YAK, CREAM, ROOT, COMEDY, MUSHROOM, BARK, PATCHES, SERUM, TRUNK, WINGS, JAGUAR, TEEN, TONER, ADULT (24 read, 4 under overlap not seen).
Arrivals: after TREE: the tree picture, HORROR, CRIB, SWEET; after BIRD: the parrot picture, BALLET, STROLLER, SOUR; after BULLS: SAMBA, WALTZ, DIAPER, PACIFIER; after MOVIE GENRE: BITTER, UMAMI, TANGO; after TASTES: nothing; after DANCES: BABY arrives (the word) when baby items clear.

Notes:
- 3 sub-themes (TREE, BIRD, BABY) came back as a bubble (picture or word) and joined a parent theme: FOREST (tree, parrot, MUSHROOM, JAGUAR) and STAGES OF LIFE (BABY, KID, TEEN, ADULT). Here the parent theme is not an obvious category over the sub-theme (a parrot picture means "BIRD"; the forest set mixes plant, bird, fungus and big cat).
- Decoys: BABY itself is a life stage; PATCHES (spots / eye patches), JAGUAR (also a car), MUSHROOM, CREAM (food), SWEET/SOUR (also food adjectives), KID (goat), BISON/BUFFALO/YAK vs animals.
- The 5-in-a-row bonus fired several times. Hint, Extra Bubbles and Magnet badges stayed at 2.
- Level end: MASTERY 107 on the bubble ("Tap to skip"), autumn leaves still on the frame, then WELL DONE with 30 coins; next button plain green "LEVEL 10".

## Level 10 (CHUNKS introduced)

Themes: 8 (bar `0/8`). Moves: 44 at start, 14 shown on the Mastery screen (several +1 streak bonuses; 2 merges of chunk bubbles). Mastery shown at the end: 130. Reward: 30 coins (counter 1,170 -> 1,200). No booster used. Split words: 5 (YELLOW, DIAMOND, SWORD, ELEPHANT, DOCTOR). Words: 32 whole words in all (27 plain + the 5 split ones; 10 chunk bubbles appear on screen).

**New: chunk (split-word) bubbles.** A popup at the start says "CHUNKS: Some words are broken into smaller pieces" (example YELLOW, shown whole). Chunk bubbles are teal-tinted and show a fragment: YEL + LOW, ELE + PHANT, ORD + SW, DOC + TOR, MOND + DIA. Dragging one chunk onto its partner joins them into a normal whole-word bubble (e.g. YEL + LOW -> YELLOW), and that costs 1 move; the joined bubble then counts as a normal member of its theme. Dragging a chunk onto a wrong chunk (ORD onto TOR) did nothing and cost 1 move. Which chunk pairs is guessable from the word needed. The partner may arrive later (SW arrived after the first DOC+TOR join, PHANT after the second clear).

| Theme | Words | Name |
|---|---|---|
| Colour | YELLOW (YEL\|LOW), GREEN, ORANGE, BLUE | COLOR (shown; US spelling) |
| Gems | DIAMOND (DIA\|MOND), RUBY, SAPPHIRE, EMERALD | GEMS (shown) |
| Mood | HAPPY, SAD, WORRY, ANGRY | MOOD (shown) |
| Weapon | SPEAR, AXE, SWORD (SW\|ORD), SHIELD | WEAPON (shown) |
| Safari animals | LION, ZEBRA, GIRAFFE, ELEPHANT (ELE\|PHANT) | SAFARI ANIMALS (shown, two lines) |
| Jobs | FARMER, ENGINEER, MANAGER, DOCTOR (DOC\|TOR) | JOBS (shown) |
| Meat | HAM, CHORIZO, BACON, SAUSAGE | MEAT (shown) |
| Calendar | MONTH, DAY, WEEK, YEAR | CALENDAR (shown) |

Start board: 23 bubbles read: YELLOW, SAD, MONTH, HAPPY, WORRY, DAY, WEEK, GREEN, SAUSAGE, BACON, ANGRY, ORANGE, BLUE, YEAR, SAPPHIRE, HAM, CHORIZO, RUBY, EMERALD, MANAGER (plus 3 more under the popup).
Arrivals: after COLOR: DIAMOND chunks (DIA, MOND), ELE chunk, ORD chunk; after GEMS: SPEAR, SHIELD, PHANT, TOR; after the ELEPHANT join: ENGINEER; then FARMER, LION, ZEBRA, GIRAFFE, DOC, AXE, SW (batches).

Notes:
- Decoys: ORANGE/GREEN/YELLOW/BLUE could be fruit/colours; HAM/BACON/SAUSAGE/CHORIZO vs jobs; "RUBY" gem vs name; WEEK/MONTH/YEAR/DAY could be time words (name is CALENDAR).
- Move cost: a chunk join counts as a normal merge; merging chunks to a non-partner wasted 1 move.
- Level end: MASTERY 130 ("Tap to skip"); WELL DONE with 30 coins, a green "LEVEL 11" button and a NEW orange "X2" button (coin image + a video-clip icon: a rewarded-ad doubler, NOT tapped), plus a small chest icon labelled "Welcome!" at the top right of the WELL DONE screen (not opened).

## Level 11

Themes: 12 (bar `0/12`). Moves: 51 at start, 17 left at the end (many +1 streak bonuses). Mastery shown at the end: 147. Reward: 30 coins (counter 1,200 -> 1,230); next button "LEVEL 12" (green) plus the X2 ad button (not tapped). Split words: 5 (ACOUSTIC, CLASSICAL, BARLEY, MEDIUM, TENNIS). No booster used. Words: 48 bubbles (36 words in 9 sub-themes + 4 returned name bubbles per parent group... see table). A Welcome Pack purchase popup opened as the level loaded; closed with its X.

Chunk pairs (join = 1 move each): ACOUS|TIC, CLAS|SICAL, BAR|LEY, MED|IUM, TEN|NIS.

| Theme | Words | Name |
|---|---|---|
| Baseball | PITCHER, BATTER, CATCHER, HOME RUN | BASEBALL (shown); returned as a baseball picture |
| Basketball | HOOP, FREE THROW, DUNK, REBOUND | BASKETBALL (shown); returned as a basketball picture |
| Swimming | CAP, GOGGLES, SWIMSUIT, POOL | SWIMMING (shown); returned as a swimmer picture |
| Guitar | ACOUSTIC (ACOUS\|TIC), ELECTRIC, BASS, CLASSICAL (CLAS\|SICAL) | GUITAR (shown); returned as a guitar picture |
| Instruments (parent) | VIOLIN, PIANO, DRUM, guitar picture | INSTRUMENTS (shown) |
| Speed | TURBO, FAST, SLOW, MEDIUM (MED\|IUM) | SPEED (shown) |
| Weather | SNOWY, WINDY, RAINY, SUNNY | WEATHER (shown) |
| Grains | WHEAT, RYE, OAT, BARLEY (BAR\|LEY) | GRAINS (shown); returned as the word GRAINS |
| Literature | FICTION, POETRY, MEMOIR, BIOGRAPHY | LITERATURE (shown) |
| Nutrients | CALCIUM, IRON, ZINC, PROTEIN | NUTRIENTS (shown); returned? no, NUTRIENTS did not come back |
| Food groups (parent) | MEAT, FRUIT, VEGETABLES, GRAINS | FOOD GROUPS (shown, two lines) |
| Sports (parent) | baseball picture, basketball picture, swimming picture, TENNIS (TEN\|NIS) | (guessed SPORTS: name missed, the Mastery screen followed at once) |

Start board: PITCHER, CAP, MEAT, FRUIT, BASS, ELECTRIC, HOME RUN, HOOP, VIOLIN, TIC, ACOUS, FREE THROW, PIANO, BATTER, GOGGLES, CATCHER, DUNK, POOL, VEGETABLES, SWIMSUIT, DRUM, TEN, REBOUND, NIS (24 bubbles).
Arrivals (in drops of 3-4 after each clear): baseball picture; WHEAT, SNOWY, FAST (after BASEBALL); MEMOIR, BASEBALL gone; SICAL, MEMOIR, RYE, BASKETBALL picture; swimming picture; MED, CLAS, POETRY; WINDY; LEY, guitar picture, BIOGRAPHY, TURBO, OAT; IUM, CALCIUM, SLOW, RAINY, SUNNY; ZINC, IRON, FICTION, BAR, PROTEIN; and the parent name bubbles GRAINS, NUTRIENTS' parent FOOD GROUPS items.

Notes:
- Hierarchy: baseball, basketball, swimming, TENNIS -> SPORTS; guitar -> INSTRUMENTS; GRAINS -> FOOD GROUPS. SPEED, WEATHER, LITERATURE, NUTRIENTS did not return.
- A chunk word can be the name of a sub-theme (TEN|NIS).
- Hints: the teal chunk bubbles give a clue that a theme lacks a member.
- Decoys: BASS (guitar vs fish), CAP (swimming vs baseball), POOL, PROTEIN (nutrient vs food), MEAT/FRUIT/VEGETABLES vs NUTRIENTS, BARLEY/OAT/RYE/WHEAT vs plants.
- Level end: MASTERY 147 on the bubble ("Tap to skip"); the leaf decoration is still on the frame.

## Level 12

Themes: 12 (bar `0/12`). Moves: 60 at start, 22 left at the end. Mastery shown at the end: 181. Reward: 30 coins (counter 1,230 -> 1,260); next button "LEVEL 13" (green) plus the X2 ad button (not tapped). Split words: 9 (SARCASM, FLORIDA, DOLPHIN, LONDON, TOKYO, TEXAS, CHOCOLATE, MATCHA, AUGUST). No booster used. Words: 48 bubbles (47 words + the returned MONTHS bubble).

Chunk pairs (join = 1 move each): SAR\|CASM, FLO\|RIDA, DOL\|PHIN, LON\|DON, KYO\|TO (shown on the board as TOKYO after the join), XAS\|TE (TEXAS), CHOCO\|LATE, MAT\|CHA, AU\|GUST.

| Theme | Words | Name |
|---|---|---|
| Capitals | CAIRO, PARIS, LON\|DON, TOKYO (KYO\|TO) | CAPITALS (shown) |
| US states | OHIO, MAINE, TEXAS (XAS\|TE), FLORIDA (FLO\|RIDA) | USA (shown) |
| Ocean animals | WHALE, SHARK, CRAB, DOLPHIN (DOL\|PHIN) | OCEAN ANIMALS (shown, two lines) |
| Humor | JOKE, IRONY, SARCASM (SAR\|CASM), PRANK | HUMOR (shown) |
| Band | GUITAR, DRUMMER, VOCALS, BASS | BAND (shown) |
| Fabrics | SATIN, DENIM, VELVET, SILK | FABRICS (shown) |
| Months | MAY, MARCH, JUNE, AUGUST (AU\|GUST) | MONTHS (shown); returned as the bubble MONTHS |
| Time periods (parent) | DAYS, YEARS, DECADES, MONTHS (returned bubble) | TIME PERIODS (shown, two lines) |
| Tea | GREEN, BLACK, HERBAL, MATCHA (MAT\|CHA) | TEA (shown) |
| Furniture | TABLE, RACK, SHELVES, CHAIR | FURNITURE (shown) |
| Ice cream flavors | NEAPOLITAN, STRAWBERRY, CHOCOLATE (CHOCO\|LATE), VANILLA | ICE CREAM FLAVORS (shown, two lines) |
| Plants | FLOWER, BUSH, GRASS, TREE | PLANTS (shown) |

Start board (22 bubbles, plus a CAIRO+PARIS pair merged before my first screenshot): DRUMMER, RACK, SHELVES, GUITAR, FLORIDA, SATIN, JOKE, CRAB, SHARK, VOCALS, WHALE, DECADES, IRONY, DOLPHIN, SARCASM, MAINE, TOKYO, OHIO, LONDON, DAYS, TEXAS, YEARS (several of these shown as joined chunks by the time I captured them).
Arrivals (after each clear): TABLE, GREEN, CHOCO, BLACK (after CAPITALS); CHAIR, MAY, BASS, AU (after USA); STRAWBERRY, PRANK, FLOWER, TREE (after OCEAN ANIMALS); DENIM, MARCH, NEAPOLITAN, VANILLA (after HUMOR); LATE, CHA, MAT, VELVET (after BAND); BUSH, SILK, MATCHA join (after the CHA/MAT join); JUNE, HERBAL, GRASS, GUST (after FABRICS); MONTHS (after MONTHS, as the hierarchy bubble).

Notes:
- Chunk-heavy level: 9 split words, three of them arriving late as the second half (LATE, CHA/MAT, GUST).
- Hierarchy: only MONTHS returned (into TIME PERIODS). CAPITALS and USA did not visibly return; they counted as separate themes in the 12.
- Decoys: MAY (month vs verb), MARCH, BASS (guitar vs fish), GREEN and BLACK (colors vs tea), HERBAL, STRAWBERRY and CHOCOLATE (fruit and sweet vs ice cream), FLOWER/TREE/BUSH/GRASS vs fabrics and tea.
- Theme-name pop-ups shown for all 12; the PARIS+CAIRO+LONDON+TOKYO merge showed CAPITALS, the four states showed USA.
- Level end: MASTERY 181 on the bubble ("Tap to skip"); autumn leaf decoration still on the frame; the moves counter ran down to 1 during the Mastery screen.

## Level 13

Themes: 8 (bar `0/8`, the smallest bar since level 9). Moves: 42 at start, 19 left at the end. Mastery: missed (the animation was over before I looked). Reward: 30 coins (counter 1,260 -> 1,290); next button "LEVEL 14" (green) plus the X2 ad button (not tapped). Split words: 3 (NEBULA, NEPTUNE, ARCHERY). No booster used. Words: 32 bubbles (28 words + 4 returned picture bubbles).

Chunk pairs (join = 1 move each): NE\|BULA, NEP\|TUNE, AR\|CHERY.

| Theme | Words | Name |
|---|---|---|
| Planets | URANUS, MARS, EARTH, NEPTUNE (NEP\|TUNE) | PLANETS (shown); returned as a planet picture (Jupiter) |
| Galaxy | MILKY WAY, NEBULA (NE\|BULA), STARS, planet picture | GALAXY (shown) |
| Cat breeds | SIAMESE, MAINE COON, PERSIAN, SPHYNX | CAT (shown); returned as a cat picture |
| Cat family | CHEETAH, LEOPARD, TIGER, cat picture | CAT FAMILY (shown, two lines) |
| Music genres | RAP, JAZZ, BLUES, DISCO | MUSIC GENRES (shown, two lines) |
| Golf | TEE, CLUB, HOLE, BALL | (guessed GOLF: name missed); returned as a golf flag picture |
| Darts | BOARD, TARGET, SCORE, THROW | DARTS (shown); returned as a dartboard picture |
| Individual sports (parent) | CHESS, ARCHERY (AR\|CHERY), golf picture, darts picture | INDIVIDUAL SPORTS (shown, two lines) |

Start board (24 bubbles): THROW, BALL, SCORE, MARS, RAP, CLUB, TARGET, STARS, BULA, NEP, URANUS, CHERY, DISCO, JAZZ, EARTH, MILKY WAY, BOARD, NE, CHESS, BLUES, AR, TUNE (22 visible plus two arrivals at once).
Arrivals: MAINE COON; NEBULA joins; LEOPARD, TEE, NEPTUNE; ARCHERY, then TIGER, SIAMESE; planet picture, PERSIAN, HOLE; SPHYNX, CHEETAH; cat picture; golf picture; dartboard picture.

Notes:
- Three-level hierarchy in one level: PLANETS -> GALAXY, CAT -> CAT FAMILY, GOLF and DARTS -> INDIVIDUAL SPORTS (so a returned picture can itself be a parent member that is returned in turn).
- A returned bubble can be a picture of a sub-theme (planet, cat, golf flag, dartboard).
- Decoys: BALL (golf vs darts, sports), CLUB (golf vs music), BOARD and SCORE (darts vs chess), THROW, CHESS (board game vs sport), BLUES/JAZZ, NEBULA/STARS (galaxy vs planets).
- The theme-name pop-up for golf was missed (the frame showed a blank orange bubble).
- Level end: MASTERY not captured; autumn leaf decoration still on the frame.

## Level 14

Themes: 10 (bar `0/10`). Moves: not captured at the start (43 on screen after the first few merges, so about 45 at the start); 17 left at the end. Mastery: missed (the Well Done screen was up when I looked). Reward: 30 coins (counter 1,290 -> 1,320); next button "LEVEL 15" (green) plus the X2 ad button (not tapped). Split words: 6 (DIAMONDS, MONOPOLY, SHAMPOO, BLANKET, PILLOW, SHOWER). No booster used. Words: 36 bubbles (32 words + 4 returned picture bubbles that rejoin a parent).

Chunk pairs (join = 1 move each): DIA\|MONDS, MONO\|POLY, SHAM\|POO, BLAN\|KET, PIL\|LOW, SHO\|WER.

| Theme | Words | Name |
|---|---|---|
| Card suits | DIA\|MONDS, SPADES, HEARTS, CLUBS | CARD SUITS (shown, two lines); returned as a playing-cards picture |
| Chess pieces | KNIGHT, BISHOP, PAWN, ROOK | CHESS (shown); returned as a chessboard picture |
| Board games (parent) | MONO\|POLY, CHECKERS, cards picture, chessboard picture | BOARD GAMES (shown, two lines) |
| Bread | CIABATTA, BAGUETTE, FOCACCIA, PITA | BREAD (shown); returned as a loaf picture |
| Berries | CRANBERRY, BLUEBERRY, RASPBERRY, CHERRY | BERRIES (shown); returned as a berries picture |
| Vegetables | EGGPLANT, PEPPERS, CABBAGE, ZUCCHINI | VEGETABLES (shown); returned as a vegetables picture |
| Food (parent) | DESSERTS, loaf picture, berries picture, vegetables picture | FOOD (shown) |
| Bedroom | PIL\|LOW, SLEEP, BLAN\|KET, BED | BEDROOM (shown); returned as a bed picture |
| Bathroom | SHAM\|POO, SOAP, SHO\|WER, RAZOR | BATHROOM (shown); returned as a bathtub picture |
| Rooms in a house (parent) | KITCHEN, GARAGE, bed picture, bathtub picture | ROOMS IN A HOUSE (shown, two lines) |

Start board (24 bubbles): KNIGHT, DIA, MONDS, SPADES, HEARTS, BAGUETTE, BLUEBERRY, PEPPERS, WER, BISHOP, DESSERTS, MONO, EGGPLANT, ROOK, CRANBERRY, PAWN, CHECKERS, RASPBERRY, CHERRY, ZUCCHINI, CLUBS, CABBAGE (22 seen).
Arrivals: playing-cards picture (after CARD SUITS); POLY, SHAM, SLEEP (after the MONDS join); MONOPOLY joined; CIABATTA, SHO (after CHESS); GARAGE, FOCACCIA, chessboard picture, PIL; PITA, BED, RAZOR (after BREAD); BLAN, KET, SOAP, KITCHEN (after BOARD GAMES); loaf picture; POO, PILLOW, BLANKET; berries picture; vegetables picture; bed picture; bathtub picture.

Notes:
- Two parents with picture members (BOARD GAMES takes two picture bubbles and MONOPOLY; FOOD takes three picture bubbles and the word DESSERTS; ROOMS IN A HOUSE takes two pictures and two words).
- A returned picture bubble is an icon of the cleared sub-theme (cards, chessboard, loaf, berries, vegetables, bed, bathtub).
- Decoys: CHERRY (fruit vs berries), CHECKERS and MONOPOLY (board games vs card suits), DESSERTS (food, a loose word), KITCHEN and GARAGE (rooms vs bathroom items), SLEEP (bedroom word, not a room), PEPPERS and ZUCCHINI.
- Chunk bubbles needed no tutorial: SHO and WER arrived in separate drops, so the first half sat on the board for many moves.
- Level end: MASTERY not captured; autumn leaf decoration still on the frame.

## Level 15

Themes: 7 (bar `0/7`). Moves: 42 at start, 20 left at the end. Mastery: missed (the Well Done screen was already up). Reward: 30 coins (counter 1,320 -> 1,350); next button "LEVEL 16" (green), the X2 ad button (not tapped) and, new, a blue Home button with a red "!" badge (not tapped; see features log). Split words: 6 (GLIDER, MONOPOLY, MASCARA, SOFTENER, DETERGENT, SKINCARE). No booster used. Words: 28 words plus 1 returned picture bubble (lipstick); 29 bubbles.

Chunk pairs (join = 1 move each): GLI\|DER, MONO\|POLY, MAS\|CARA, SOFT\|ENER, DETER\|GENT, SKIN\|CARE.

| Theme | Words | Name |
|---|---|---|
| Makeup | FOUNDATION, EYELINER, LIPSTICK, MAS\|CARA | MAKEUP (shown); returned as a lipstick picture |
| Beauty care (parent) | HAIRCARE, SKIN\|CARE, NAIL CARE, lipstick picture | BEAUTY CARE (shown, two lines) |
| Stars | SUN, SIRIUS, VEGA, POLARIS | STARS (shown) |
| Board games | CLUE, RISK, SCRABBLE, MONO\|POLY | BOARD GAMES (shown, two lines) |
| Laundry | BLEACH, DIRTY CLOTHES, SOFT\|ENER, DETER\|GENT | LAUNDRY (shown) |
| Air transport | HOT-AIR BALLOON, AIRPLANE, HELICOPTER, GLI\|DER | AIR TRANSPORT (shown, two lines) |
| Timekeepers | CLOCKS, POCKET WATCH, HOURGLASS, WRISTWATCH | TIMEKEEPERS (shown) |

Start board (24 bubbles): DER, CLOCKS, GLI, FOUNDATION, WRISTWATCH, EYELINER, HELICOPTER, BLEACH, HOT-AIR BALLOON, HOURGLASS, POCKET WATCH, NAIL CARE, LIPSTICK, SOFT, MAS, CARA, AIRPLANE, DETER, CARE, DIRTY CLOTHES, SKIN, GENT, HAIRCARE, ENER.
Arrivals: POLY, GLIDER joins; SCRABBLE; POLARIS; CLUE and RISK; SUN, SIRIUS, VEGA; MONOPOLY; MAKEUP clear then lipstick picture; the rest as the board thinned.

Notes:
- Very crowded start board: 24 bubbles filling the lower half; the largest board so far (bubbles pressed together, the physics shifts them after every merge).
- Chunk-heavy: 6 split words, all first halves on the board at the start; MONO or POLY arrived later.
- Hierarchy: the lipstick picture (MAKEUP) joins BEAUTY CARE with HAIRCARE, SKINCARE and NAIL CARE. No other sub-theme returned.
- Decoys: CLOCKS vs WRISTWATCH vs HOURGLASS (timekeepers) vs HOT-AIR BALLOON/AIRPLANE; RISK and CLUE (board games); SUN (star); SOFTENER and BLEACH (laundry vs beauty).
- Name pop-ups caught for all 7 themes.
- Level end: autumn leaf decoration still on the frame.

## Level 16

Themes: 9 (bar `0/9`). Moves: 47 at start, 20 left at the end (one move lost to a wrong drag, DIETITIAN onto INJECTION). Mastery: missed (the coin count-up was running when I looked). Reward: 30 coins (counter 1,350 -> 1,380); next button "LEVEL 17" (green), the X2 ad button and the Home button (none tapped). Split words: 5 (SURGEON, DAHLIA, SCORPIO, TAURUS, AUSTRIA). No booster used. Words: 36 words, 4 returned bubbles joined parents (SOIL, GREECE, and the pill and doctor pictures).

Chunk pairs (join = 1 move each): SUR\|GEON, DAH\|LIA, SCOR\|PIO, TAU\|RUS, AUS\|TRIA.

| Theme | Words | Name |
|---|---|---|
| Flowers | ASTER, PEONY, TULIP, DAH\|LIA | FLOWERS (shown); returned as a pink flower picture |
| Soil | CLAY, LOAM, PEAT, SAND | SOIL (shown); returned as the word SOIL |
| Gardening (parent) | WATERING, SEEDLINGS, SOIL, flower picture | GARDENING (shown) |
| Greece | DEMOCRACY, OLYMPICS, PHILOSOPHY, MYTHOLOGY | GREECE (shown); returned as the word GREECE |
| Zodiac signs | GEMINI, VIRGO, SCOR\|PIO, TAU\|RUS | ZODIAC SIGNS (shown, two lines) |
| EU countries (parent) | FRANCE, SPAIN, AUS\|TRIA, GREECE (returned word) | EU COUNTRIES (shown, two lines) |
| Medicine | VACCINE, INJECTION, INSULIN, ANTIBIOTIC | MEDICINE (shown); returned as a pill picture |
| Doctor | DENTIST, DIETITIAN, ALLERGIST, SUR\|GEON | DOCTOR (shown); returned as a doctor picture |
| Health (parent) | PATIENT, CLINIC, pill picture, doctor picture | HEALTH (shown) |

Start board: the biggest so far, 26 bubbles that overflowed the top of the screen at load (DIETITIAN, VACCINE, INJECTION, TULIP, OLYMPICS, SEEDLINGS, PEAT, MYTHOLOGY, ALLERGIST, PATIENT, CLAY, LOAM, PEONY, DENTIST, SAND, ASTER, WATERING, INSULIN, ANTIBIOTIC, CLINIC, SUR, GEON, DAH, LIA, ...); the board settled after a few seconds.
Arrivals: AUS, TAU, then RUS, SCOR, PIO, TRIA; GREECE after the GREECE clear; flower picture after FLOWERS; pill picture; doctor picture; SOIL after SOIL.

Notes:
- Everything on the first screen: bubbles were stacked above the top bar (the board scrolled in from the top) and had to wait about 3 s to settle.
- The EU COUNTRIES parent takes the returned word GREECE: the sub-theme GREECE returns as a word, not a picture, into a parent that does not list its children in a related field (a country theme with an ancient-world flavour, mixed).
- Decoys: SAND (soil vs beach), PEAT, CLAY; INSULIN/INJECTION/VACCINE (medicine) vs PATIENT/CLINIC (health); DENTIST etc. (doctors) vs SURGEON; GEMINI/VIRGO etc. as star signs vs names; GREECE vs FRANCE/SPAIN/AUSTRIA.
- Wrong drag (DIETITIAN onto INJECTION) cost 1 move, no other penalty.
- Level end: MASTERY not captured; autumn leaves still on the frame.

## Level 17

Themes: 11 (bar `0/11`). Moves: 48 at start, 17 left at the end. Mastery: 271. Reward: 30 coins (counter 1,380 -> 1,410); next button "LEVEL 18" (green), the X2 ad button and the Home button (none tapped). Split words: 4 (CASHEW, APRICOT, ARCHITECT, LONDON); PROBIOTIC may also have been a chunk word (see notes). No booster used. Words: 44 words, 4 returned pictures joined the Healthy eating parent, 1 returned picture (builder) joined Construction.

Chunk pairs (join = 1 move each): CA\|SHEW, APRI\|COT, ARCHI\|TECT, LON\|DON.

| Theme | Words | Name |
|---|---|---|
| Nuts | HAZELNUT, CA\|SHEW, PECAN, ALMOND | NUTS (shown); returned as a walnut picture |
| Fruits | MANGO, PAPAYA, APRI\|COT, PEAR | FRUITS (shown); returned as a fruit-basket picture |
| States of matter | STEAM, VAPOR, ICE, LIQUID | WATER (shown, one line); returned as a water jug picture |
| Supplements | COLLAGEN, OMEGA-3, ZINC, PROBIOTIC | SUPPLEMENTS (shown); returned as a pill picture |
| Healthy eating (parent) | walnut picture, fruit-basket picture, water jug picture, pill picture | HEALTHY EATING (shown, two lines) |
| Building materials | WOOD, TILE, BRICK, CONCRETE | BUILDING MATERIALS (shown, two lines); returned as the same words on a bubble |
| Fashion capitals | LONDON, MILAN, PARIS, NEW YORK | FASHION CAPITALS (shown, two lines); did not return |
| Circus performers | ACROBAT, CLOWN, JUGGLER, MAGICIAN | CIRCUS PERFORMERS (shown, two lines); did not return |
| Stationery | PEN, ERASER, PAPER, STAPLER | STATIONERY (shown); did not return |
| Builders | CARPENTER, PLUMBER, ARCHITECT, PAINTER | BUILDERS (shown); returned as a hard-hat builder picture |
| Construction (parent) | CRANE, BULLDOZER, BUILDING MATERIALS (returned bubble), builder picture | CONSTRUCTION (shown) |

Start board: 22 or so bubbles on the first screen; the rest arrived as themes cleared (ACROBAT, PLUMBER, TECT, CARPENTER, ARCHITECT, CLOWN, PEN, ERASER, JUGGLER, MILAN, DON ...).
Arrivals: walnut and fruit-basket pictures first (they joined each other into a green 2-stack waiting for a third), then WATER jug, pill, builder picture, BUILDING MATERIALS bubble.

Notes:
- STATES OF MATTER showed its name as the single word WATER (the cleared theme's label), and the returned bubble is a water jug picture, so it is a theme named by its main substance rather than "States of matter" (name as shown: WATER).
- Two parents on one board (HEALTHY EATING and CONSTRUCTION) and the Healthy eating parent got its first two members (nuts, fruit) well before the others existed, so the 2-stack sat at the bottom for most of the level.
- Cross-over decoys: PAPER (stationery vs materials), CRANE (a bird, but here machine), MAGICIAN, PAINTER and ARCHITECT (trades vs circus); LON and ARCHI chunks sat on the board for a long time before their partners (DON, TECT) arrived.
- The PROBIOTIC bubble was in a smaller font on the board; I could not tell whether it was a PRO\|BIOTIC chunk pair (earlier I noted that it was) or one word. It was dragged as one word and did not join a partner, so counted as whole.
- The move counter did not drop on every merge (five in a row gave +1 move back several times).
- Level end: MASTERY 271 captured; the coin counter showed 1,410 already during the Mastery animation; autumn leaves still on the frame.

## Level 18

Themes: 11 (bar `0/11`). Moves: 48 at start, 15 left at the end. Mastery: 289. Reward: 30 coins (counter 1,410 -> 1,440); next button is red and marked "HARD" with an octopus: "HARD LEVEL 19" (see notes); X2 and Home buttons also shown (none tapped). Split words: 5 (CUPCAKE, APPETIZER, CANYON, GUITAR, TITANIUM). No booster used. Words: 40 words on the board, plus returned bubbles.

Chunk pairs (join = 1 move each): CUP\|CAKE, APPE\|TIZER, YON\|CAN (CANYON), GUI\|TAR, TITA\|NIUM.

| Theme | Words | Name |
|---|---|---|
| Money (currencies) | EURO, YEN, FRANC, POUND | MONEY (shown); returned as a banknotes picture |
| Dessert | CUP\|CAKE, DONUT, CHEESECAKE, PIE | DESSERT (shown); returned as a cake-slice picture |
| Mountains | ALPS, ANDES, PYRENEES, HIMALAYAS | MOUNTAINS (shown); returned as the word MOUNTAINS |
| Islands | BALI, HAWAII, MALDIVES, JAMAICA | ISLANDS (shown); returned as a palm-island picture |
| Baby | DIAPER, STROLLER, CRADLE, PACIFIER | BABY (shown) |
| Metal | COBALT, LEAD, TITA\|NIUM, CHROMIUM | METAL (shown) |
| Locks and security | LOCK, KEY, SAFE, CODE | VAULT (shown); returned as the word VAULT |
| Musical instruments | GUI\|TAR, HORN, DRUM, PIANO | MUSICAL INSTRUMENTS (shown, two lines) |
| Banking (parent, name not seen) | LOAN, ACCOUNT, VAULT (returned word), banknotes picture | not seen (guessed BANKING) |
| Food (parent, name not seen) | SOUP, SALAD, APPE\|TIZER, cake-slice picture | not seen (guessed FOOD or MEALS) |
| Geographical objects (parent) | CAN\|YON, MOUNTAINS (returned word), OCEAN, palm-island picture | GEOGRAPHICAL OBJECTS (shown, two lines) |

Start board: 24 or so bubbles; 5 chunk bubbles in the first screen (CAKE, CAN, YON, APPE, CUP, TIZER; later TAR, GUI, TITA, NIUM).
Arrivals: CRADLE, POUND (first drops), then PACIFIER, DRUM, SAFE, LOCK, CODE, PIANO, HORN, LOAN, COBALT, LEAD, CHROMIUM, KEY, ACCOUNT as themes cleared; GUI and TITA, NIUM late; returned pictures and words after each clear.

Notes:
- Two parent themes (Banking, Food) were completed before I could capture the name; both clears happened with the name label drawn behind the next animation, so their names are guesses.
- The word VAULT was the cleared sub-theme name (LOCK, KEY, SAFE, CODE) and came back as a word into the Banking parent; the Banking parent also took the banknotes picture from MONEY (a picture and a word in one parent).
- Cross-over decoys: TAR (tar, but here a guitar chunk) vs metals; CAKE and CUP (CUPCAKE) vs DESSERT words CHEESECAKE, PIE; LEAD (metal) vs verbs; CODE (lock code) vs PIANO; DRUM and HORN vs PACIFIER (baby), KEY vs PIANO keys; SAFE and VAULT (security vs bank); OCEAN, CANYON, MOUNTAINS (landforms) vs ISLANDS.
- Move count: the move counter did not drop on some merges (5 correct merges in a row give +1 move).
- Level end: MASTERY 289 captured; autumn leaves still on the frame; the next-level button is HARD LEVEL 19 (red, octopus on the corner); level 8 was the previous HARD level (60 coins reward there).

## Level 19 (HARD)

Themes: 9 (bar `0/9`). Moves: 41 at start, 14 left at the end (no wrong drags). Mastery: 299. Reward: 60 coins on the Well Done screen (HARD level, as at level 8); counter 1,440 -> 1,500 (it read 1,470 mid-count-up at the Mastery screen and 1,530 after level 20's +30); next button "LEVEL 20" (green), X2 and Home buttons (none tapped). Split words: 6 (MUSCULAR, VAMPIRE, ELEPHANT, MEMORY, COMEDY, OXYGEN). No booster used. Words: 36 words on the board, plus returned bubbles.

This level was announced as HARD on the previous Well Done screen: red "HARD LEVEL 19" button with an octopus; in the level the progress bar's label became a red "LVL 19" tab with the octopus sitting on it, and the bottom booster bar background turned red.

Chunk pairs (join = 1 move each): MUS\|CULAR, VAM\|PIRE, ELE\|PHANT, ME\|MORY, CO\|MEDY, OXY\|GEN.

| Theme | Words | Name |
|---|---|---|
| Mammals | RHINO, ELE\|PHANT, GIRAFFE, WHALE | MAMMALS (shown); did not return |
| Halloween | WITCH, ZOMBIE, VAM\|PIRE, GHOSTS | HALLOWEEN (shown); did not return |
| Breathing | EXHALE, BREATHE, INHALE, OXY\|GEN | LUNG (shown on the returned word after the merge; the orange label itself read LUNG); returned as the word LUNG |
| Tickets | ENTRY, ADMISSION, PASS, STUB | TICKET (shown); returned as a tickets picture |
| Movie genres | ROMANCE, COMEDY (CO\|MEDY), THRILLER, ACTION | CINEMA (shown); returned as the word CINEMA |
| Movie theater (parent) | CINEMA (returned word), tickets picture, POPCORN, SCREEN | MOVIE THEATER (shown, two lines); did not return |
| Liquid carriers | HOSE, FUNNEL, STRAW, PIPE | LIQUID CARRIERS (shown, two lines); did not return |
| Mind | LOGIC, THOUGHT, MEM\|ORY, EMOTION | BRAIN (shown); returned as the word BRAIN |
| Body systems (parent) | LUNG (returned word), BRAIN (returned word), MUS\|CULAR, DIGESTIVE | BODY SYSTEMS (shown, two lines) |

Start board: 26 bubbles (the heaviest start so far, filling the lower two thirds); teal chunks: MUS, CULAR, VAM, PHANT, PIRE, ME, MORY, ELE (some arrive later: MEDY, CO, OXY, GEN).
Arrivals: ELE and PHANT, MEDY (CO arrived later), OXY, GEN, POPCORN, ENTRY, STUB, PASS, ADMISSION, SCREEN, THRILLER, ROMANCE, ACTION, CINEMA after the genres clear; the tickets picture after TICKET; LUNG and BRAIN as returned words.

Notes:
- The BREATHING theme's own name was not on the label I caught (the orange label showed LUNG, matching the returned bubble), so its theme name is recorded as LUNG; the group could be named BREATHING or RESPIRATION instead; uncertain.
- The MIND theme was labelled BRAIN (orange label), and returns as the word BRAIN into Body systems together with LUNG.
- Two parents again (MOVIE THEATER and BODY SYSTEMS), as at level 17; both took a mix of returned words and a picture.
- Cross-over decoys: PIPE and HOSE and STRAW (liquid carriers) vs FUNNEL; PASS and ENTRY (tickets) vs ACTION; SCREEN vs POPCORN (cinema) vs tickets; GHOSTS, ZOMBIE, VAMPIRE, WITCH vs MAMMALS; MUSCULAR and DIGESTIVE (adjectives, body systems) vs LUNG; EMOTION and MEMORY vs BRAIN; EXHALE, INHALE, BREATHE vs OXYGEN.
- Level end: MASTERY 299 captured at the 6-move count-down; autumn leaves still on the frame.

## Level 20

Themes: 8 (bar `0/8`). Moves: 28 at start, 8 left at the end (no wrong drags; every merge cost 1, no +1 refunds seen except the usual one). Mastery: 316. Reward: 30 coins (counter 1,500 -> 1,530); next button "LEVEL 21" (green), X2 and Home buttons (none tapped). Split words: 0. No booster used. Words: 31 on the board (small board, 21 bubbles at the start), plus returned bubbles. The HARD styling is gone again (plain "LVL 20" text, no octopus tab, blue booster bar).

| Theme | Words | Name |
|---|---|---|
| Odd numbers | ONE, THREE, FIVE, SEVEN | ODD NUMBERS (shown, two lines); did not return |
| Planets | PLUTO, SATURN, NEPTUNE, EARTH | PLANET (shown); returned as a Jupiter picture |
| Astronomy | STAR, TELESCOPE, GALAXY, Jupiter picture | ASTRONOMY (shown); did not return |
| Female names | JESSICA, RACHEL, EMMA, EMILY | FEMALE NAMES (shown, two lines); did not return |
| Fitness | TRAINER, TREADMILL, DUMBBELL, WEIGHTS | GYM (shown); returned as the word GYM |
| Wellness | HYDRATION, DIET, MEDITATION, GYM (returned word) | HEALTHY LIFESTYLE (shown, two lines); did not return |
| Spring | BLOSSOM, BLOOM, GARDEN, FLOWER | SPRING (shown); returned as the word SPRING |
| Easter | BUNNY, EGGS, BASKET, SPRING (returned word) | EASTER (shown); last theme |

Start board: 22 bubbles, the fewest since the early levels. Arrivals: STAR, PLUTO, JESSICA, SATURN (after the first clears), then NEPTUNE, EARTH, RACHEL, EMMA, EMILY; the Jupiter picture after PLANET clears; GYM and SPRING after their themes cleared.

Notes:
- Chain of returned words: FITNESS returns as GYM into Wellness; SPRING returns as the word SPRING into Easter. Planets returns as a Jupiter picture into Astronomy (a picture of one planet standing for the sub-theme).
- No split (chunk) words and no wrong drags: this was an easy level, 20 moves used for 8 themes.
- Decoys: FLOWER and BASKET (both fit spring and Easter), GARDEN, BLOSSOM; STAR (astronomy vs names); EARTH vs GARDEN; DIET vs GYM and HYDRATION (wellness vs fitness).
- Level end: MASTERY 316 captured; autumn leaves still on the frame.

## Level 21

Themes: 8 (bar `0/8`). Moves: 36 at start, 9 left at the end. Mastery: 319. Reward: 30 coins (counter 1,530 -> 1,560); next button "LEVEL 22" (green), X2 and Home buttons (none tapped). Split words: 0. No booster used. NEW: chained bubbles (padlock chain splitting the board).

| Theme | Words | Name |
|---|---|---|
| Elements / metals and gases | HELIUM, IRON, GOLD, OXYGEN | (guessed: ELEMENTS; only the praise "Incredible!" was caught) |
| Zodiac signs | VIRGO, LEO, TAURUS, PISCES | (guessed: ZODIAC SIGNS; name not captured) |
| Pinocchio | NOSE, GEPPETTO, PUPPET, WOODEN | (guessed: PINOCCHIO; it returned as the word PINOCCHIO) |
| Cinderella | FAIRY, PRINCE, SLIPPER, PUMPKIN | (guessed: CINDERELLA; returned as the word CINDERELLA) |
| Fairy tales | RAPUNZEL, PETER PAN, PINOCCHIO (returned word), CINDERELLA (returned word) | (guessed: FAIRY TALES; name not captured) |
| Oils | COCONUT, SUNFLOWER, OLIVE, AVOCADO | (guessed: OILS; name not captured) |
| Red things | CHERRY, BLOOD, TOMATO, ROSE | (guessed: RED; name not captured) |
| Balkan countries | SERBIA, CROATIA, ROMANIA, BULGARIA | (guessed: BALKANS; last theme, the final merge was too fast to read the name) |

Start board: about 20 bubbles split by a chain with a padlock numbered 3. Arrivals: SERBIA, FAIRY, PUPPET, PRINCE (after the first clears), SLIPPER, WOODEN, ROMANIA, PUMPKIN, CROATIA, BULGARIA, then the returned words PINOCCHIO and CINDERELLA.

Notes:
- Chained bubbles: tutorial text "Collect 3 bubbles to unlock. No merging across the chain." The lock number counted 3 -> 2 after the first theme -> 1 at 2/8 -> opened at 3/8, after which the two sections combined.
- A floating "+5 MOVES" bubble with a video icon (rewarded ad) appeared from about 28 moves left onward. Never tapped.
- Decoys: ROSE (red vs flowers), PETER PAN and RAPUNZEL (fairy tale vs Pinocchio/Cinderella), GOLD/IRON/OXYGEN/HELIUM all one theme (metals and gases together).
- Level end: MASTERY 319 captured (dragburst), 9 moves left, no wrong drags.

## Level 22

Themes: 10 (bar `0/10`). Moves: 42 at start, 16 left at the end (one wrong drag, WINDY, cost 1 move; the usual +1 refunds seen). Mastery: 332. Reward: 30 coins (counter 1,560 -> 1,590); next button "LEVEL 23" (green), X2 and Home buttons (none tapped). Split words: 0. No booster used (the Hint magnifier icon animated by itself when idle; not tapped). Chained bubbles again (padlock 3, opened at 3/10).

| Theme | Words | Name |
|---|---|---|
| Eye colours | GRAY, BLUE, BROWN, HAZEL | (guessed: EYE COLOURS; "Fantastic!" praise hid the name); did not return |
| Rain | CLOUDS, SHOWERS, WET, PUDDLES | (guessed: RAIN; "Well Done!" praise hid the name); returned as the word RAINY |
| Safety gear | GLOVES, HARD HAT, GLASSES, TOOLS | (guessed: SAFETY GEAR; "Well Done!" praise hid the name); did not return |
| Weather | RAINY (returned word), FOGGY, CLEAR, WINDY | (guessed: WEATHER; name not captured); did not return |
| Fruit | GUAVA, PEAR, MANGO, ORANGE | (guessed: FRUIT; name not captured); returned as the word JUICE |
| Drinks | JUICE (returned word), SODA, TEA, LEMONADE | (guessed: DRINKS; name not captured); did not return |
| Places for animals | SAFARI, ZOO, WILDLIFE, FARM | (guessed: ANIMALS; name not captured); did not return |
| Dragon | SCALES, CLAWS, WINGS, FIRE BREATH | (guessed: DRAGON; name not captured); returned as the word DRAGON |
| Unicorn | HORN, MANE, HORSE, MYTH | (guessed: UNICORN; name not captured); returned as the word UNICORN |
| Mythical creatures | PHOENIX, MERMAID, UNICORN (returned word), DRAGON (returned word) | (guessed: MYTHICAL CREATURES; last theme, name not captured) |

Start board: 24 bubbles; top section (above the chain) GUAVA, SODA, SAFARI, TEA, LEMONADE, ORANGE, WILDLIFE, CLOUDS, SHOWERS, TOOLS, WET, PUDDLES, FOGGY, GLOVES, HARD HAT, GLASSES; bottom section CLEAR, GRAY, BLUE, BROWN, HAZEL, PEAR, MANGO, WINDY. Arrivals after the first clear: SCALES, FIRE BREATH, HORN, FARM; later MYTH, PHOENIX, MERMAID; CLAWS, ZOO, WINGS, MANE, HORSE; then the returned words RAINY, JUICE, DRAGON, UNICORN.

Notes:
- Chain: lock 3 -> 2 after the first theme (eye colours) -> 1 after rain -> opened after safety gear (3/10). While locked only the lower section could merge with itself (eye colours), the top had to be merged within itself.
- Returned-word chain: Rain -> RAINY joins Weather; Fruit -> JUICE joins Drinks; Dragon and Unicorn -> words that join Mythical creatures. Pairs of themes sharing a decoy: ORANGE (fruit vs drink), MYTH (unicorn vs mythical), WINGS (dragon vs phoenix).
- Praise words ("Fantastic!", "Well Done!") cover the theme name on the orange 4-stack, so most names were not captured even with dragburst.
- No "+5 MOVES" ad bubble seen this level.
- Level end: MASTERY 332 captured (dragburst), autumn leaves still on the frame.

## Level 23

Themes: 9 (bar `0/9`). Moves: 42 at start, 8 left at the end (one wasted drag: GALLERY dragged onto the CURATOR/ARTIFACT stack did nothing and cost 1 move; the usual +1 refunds). Mastery: 345. Reward: 30 coins (counter 1,590 -> 1,620); next button is the red "HARD LEVEL 24" with the octopus (X2 and Home buttons not tapped). Split words: 5. No booster used.

Chunk pairs: BUT\|TER, ARTI\|FACT, CHED\|DAR, GAL\|LERY, CAE\|SAR (five pairs, 10 teal chunk bubbles at the start; each join cost 1 move).

| Theme | Words | Name |
|---|---|---|
| States of matter | SOLID, LIQUID, GAS, PLASMA | (guessed: STATES OF MATTER; name not captured); did not return |
| Cheese | BRIE, CHEDDAR (CHED\|DAR), GOUDA, MOZZARELLA | (guessed: CHEESE; name not captured); did not return |
| Dairy | MILK, CREAM, YOGURT, BUTTER (BUT\|TER) | (guessed: DAIRY; name not captured); did not return |
| Salads | CAESAR (CAE\|SAR), COBB, GREEK, GARDEN | (guessed: SALADS; name not captured); did not return |
| Nuts | ALMOND, PEANUT, HAZELNUT, WALNUT | NUTS (returned as the word NUTS) |
| Shells | CLAM, TURTLE, COCONUT, NUTS (returned word) | (guessed: SHELL; the name flashed behind overlapping words) |
| Theatre | ACTORS, PROPS, STAGE, CURTAIN | THEATER (returned as the word THEATER) |
| Museum | CURATOR, ARTIFACT, EXHIBIT, LOUVRE | MUSEUM (returned as the word MUSEUM) |
| Arts and culture | OPERA, MUSEUM (returned), THEATER (returned), GALLERY (GAL\|LERY) | (guessed: ARTS; last theme) |

Start board: 26 bubbles incl. 10 chunk bubbles (teal), the most chunks so far. Arrivals: BRIE, GOUDA, CLAM, GARDEN, COCONUT, CREAM, then MOZZARELLA, ACTORS, PROPS, CURATOR, STAGE, TURTLE, CURTAIN, LOUVRE, plus the returned words NUTS, THEATER, MUSEUM.

Notes:
- Chunk bubbles in numbers: this level had five chunk pairs (BUTTER, ARTIFACT, CHEDDAR, GALLERY, CAESAR). Several chunk halves (BUT, ARTI, TER, DAR, FACT, CHED, LERY, GAL, CAE, SAR) were visible at once. A chunk joined to its partner took 1 move.
- Returned-word chain: Nuts -> NUTS joins Shells; Theatre -> THEATER and Museum -> MUSEUM join Arts and culture. Decoys: COCONUT (nut vs shell), GALLERY (museum vs arts), LOUVRE and OPERA (arts vs museum/theatre), TURTLE/CLAM (sea animals vs shells), GARDEN (salad vs plants).
- Level end: MASTERY 345 captured (dragburst), autumn leaves still on the frame.

## Level 24 (HARD)

Themes: 7 (bar `0/7`). Moves: 31 at start, 7 left at the end (one wrong drag, PUZZLE onto BRAIN TEASER, cost 1 move; the usual +1 refunds). Mastery: 357. Reward: 60 coins (HARD level; counter showed 1,650 on the Well Done screen, 1,620 before; the count may have been mid-animation); next button is a purple "EXPERT LEVEL 25" with a purple octopus (X2 and Home not tapped). Split words: 3. No booster used. HARD styling: red "LVL 24" tab with octopus, red booster bar, and a red "Hard Level" banner and octopus animation on entry.

Chunk pairs: SU\|DOKU, STRA\|TEGY, RUS\|TING (each join cost 1 move).

| Theme | Words | Name |
|---|---|---|
| Compass directions | NORTH, EAST, SOUTH, WEST | (guessed: DIRECTIONS; "Incredible!" praise hid the name); returned as the word COMPASS |
| Navigation | COMPASS (returned word), GPS, MAP, STAR CHART | (guessed: NAVIGATION; "Splendid!" praise hid the name); did not return |
| Weights | OUNCE, GRAM, KILOGRAM, POUND | (guessed: WEIGHT; "Splendid!" praise hid the name); did not return |
| Restaurant | CHEF, MENU, TABLE, WAITER | (guessed: RESTAURANT; "Well Done!" praise hid the name); did not return |
| Chemical reactions | DIGESTION, OXIDATION, COMBUSTION, RUSTING (RUS\|TING) | (guessed: CHEMICAL REACTIONS; "Cool!" praise hid the name); did not return |
| Video games | ARCADE, SIMULATION, STRATEGY (STRA\|TEGY), PUZZLE | (guessed: GAMES; "Well Done!" praise hid the name); did not return |
| Puzzles | SUDOKU (SU\|DOKU), ANAGRAM, RIDDLE, BRAIN TEASER | (guessed: PUZZLES; "Awesome!" praise hid the name); last theme |

Start board: 29 bubbles incl. six teal chunk bubbles (SU, DOKU, STRA, TEGY, RUS, TING), the biggest board so far (bubbles overflowed the top edge while the HARD banner played, then settled). Arrivals: SUDOKU, EAST, NORTH, STRATEGY, RUSTING, then COMPASS, GPS, MAP, STAR CHART after the directions cleared.

Notes:
- Decoys: PUZZLE (puzzle vs game genres: it goes with ARCADE/SIMULATION/STRATEGY, not with ANAGRAM/RIDDLE), SUDOKU (puzzle, not a game genre here), DIGESTION (reaction vs body), POUND (weight), TABLE.
- New: "EXPERT" level indicator on the Well Done screen (purple button with a purple octopus), after HARD (red/octopus). Not yet seen: the play screen for an expert level.
- Level end: MASTERY 357 captured (dragburst), autumn leaves still on the frame.

## Level 25 (EXPERT)

Themes: 9 (bar `0/9`). Moves: 33 at start, 9 left at the end (no wrong drags; 24 merges for 9 themes, minus the +1 refunds). Mastery: 366. Reward: 90 coins on the Well Done screen (the counter read 1,710 on the Mastery screen, so it may already include the reward; earlier counters were 1,650 after level 24); next button is a plain green "LEVEL 26" (X2 and Home not tapped). Split words: 2. No booster used. EXPERT styling: purple "LVL 25" tab with a purple octopus, purple booster bar (as red for HARD). Chained bubbles again: padlock 4 (counts 4, 3, 2, 1, opened at 4/9).

Chunk pairs: QUID\|DITCH, MAR\|KET (each join cost 1 move).

| Theme | Words | Name |
|---|---|---|
| Elements (classical) | FIRE, AIR, EARTH, WATER | (guessed: ELEMENTS; "Fantastic!" praise hid the name) |
| Magic / wizards | WAND, MAGIC, QUIDDITCH (QUID\|DITCH), HOGWARTS | (guessed: HARRY POTTER; name not captured) |
| Insects | BEE, WASP, FLY, BUTTERFLY | (guessed: INSECTS; name not captured) |
| Engine parts | PISTONS, SPARK PLUG, CYLINDER, CRANKSHAFT | (guessed: ENGINE; returned as the word ENGINE) |
| Car | SEATBELT, ENGINE (returned word), WHEELS, TRANSMISSION | (guessed: CAR; name not captured) |
| Trees | OAK, BIRCH, PINE, CEDAR | (guessed: TREES; name not captured) |
| Trade | EXCHANGE, MARKET (MAR\|KET), GOODS, ROUTE | (guessed: TRADE; name not captured) |
| Face | NOSE, BROW, MOUTH, EYES | (guessed: FACE; returned as the word FACE) |
| Body | SKIN, HEART, BRAIN, FACE (returned word) | (guessed: BODY; last theme) |

Start board: 26 bubbles; lock 4 in the middle. Top section: MAGIC, EARTH, AIR, FIRE, WAND, WASP, WATER, BUTTERFLY, HOGWARTS, QUID, DITCH, FLY, TRANSMISSION, BEE, SEATBELT, WHEELS; bottom section: OAK, CEDAR, BIRCH, PINE, BROW, MOUTH, NOSE, EYES. Arrivals: after elements, PISTONS, SKIN, EXCHANGE, KET, HEART and the first QUIDDITCH merge gave a new bubble; then MAR, BRAIN, GOODS, SPARK PLUG; CYLINDER, CRANKSHAFT, ROUTE; the returned words ENGINE, MARKET, FACE appeared when their sub-themes cleared.

Notes:
- Chain: the top (above the chain) section must be cleared of 4 themes (elements, magic, insects, engine) before the chain opens; bottom bubbles (trees, face) cannot join. Lock 4 -> 3 (after elements) -> 2 (after magic) -> 1 (after insects) -> opened (after engine, 4/9).
- Returned-word chain: Engine parts -> ENGINE joins Car; Face -> FACE joins Body; Trade does not return (and the MARKET chunk pair clears inside Trade).
- Decoys: HEART (body vs car parts), SKIN, BRAIN (organs vs face), EARTH/AIR (elements vs trees), WASP/BEE/FLY (insects vs magic), WANDS.
- Magnet booster icon animated by itself once when idle, not used.
- Level end: MASTERY 366 captured (dragburst), autumn leaves still on the frame.

## Level 26

Themes: 9 (bar `0/9`). Moves: 45 at start, 14 left at the last merge (the counter then ticked down to 6 on the Mastery screen as the bonus tally ran). Mastery: 380. Reward: 30 coins (counter shown 1,800 on the Mastery and Well Done screens; 1,710 before, so the level may add a moves bonus on top of the 30). Next button is a plain green "LEVEL 27" (X2 and Home not tapped). Split words: 6. No booster used. The plain level (no HARD/EXPERT tab: white "LVL 26" text, no octopus, no coloured tab). No chain this level.

Chunk pairs: ICE\|BERG, MA\|JOR, NEC\|TAR, HAM\|MAM, PAIN\|TER, SU\|DOKU (each join cost 1 move; 12 teal chunk bubbles at the start, the most so far).

| Theme | Words | Name |
|---|---|---|
| Military ranks | COLONEL, SERGEANT, GENERAL, MAJOR (MA\|JOR) | (guessed: MILITARY RANKS; "Awesome!" praise hid the name) |
| Authors | TWAIN, DICKENS, WILDE, ORWELL | (guessed: AUTHORS; "Splendid!" praise hid the name) |
| Polar / ice | ICEBERG (ICE\|BERG), GLACIER, POLAR BEAR, AURORA | (guessed: ARCTIC; name not captured) |
| Bees | HONEY, NECTAR (NEC\|TAR), SWARM, HIVE | (guessed: BEES; name not captured) |
| Spa | SAUNA, MASSAGE, HAMMAM (HAM\|MAM), BATHROBE | (guessed: SPA; name not captured) |
| Puzzles | JIGSAW, MAZE, CIPHER, SUDOKU (SU\|DOKU) | (guessed: PUZZLES; name not captured) |
| Contagion | INFECTION, OUTBREAK, SURVIVORS, UNDEAD | (guessed: ZOMBIE / PANDEMIC; name not captured) |
| Painting | EASEL, CANVAS, BRUSH, GALLERY | (guessed: ART; returned as a painter picture) |
| Artists | SCULPTOR, PAINTER (PAIN\|TER), MUSICIAN, painter picture (returned) | (guessed: ARTISTS; last theme, "Incredible" orange stack) |

Start board: 33 bubbles (25 words and 12 chunk halves among them), the biggest board so far; the top of the board overflowed the screen while the bubbles settled (needs about 8 s). Arrivals: UNDEAD, SAUNA, DOKU/SU-style chunks surfaced as pieces cleared, BRUSH, MUSICIAN, GALLERY, CANVAS, HIVE, EASEL; returned picture after the painting theme.

Notes:
- Returned-item chain: Painting returned as a painter picture (a person with a palette) that joined Artists; no other returned items this level.
- Decoys: SAUNA/MASSAGE/BATHROBE (spa, not bees), MAJOR (rank vs puzzle/author), GALLERY (art vs artist), UNDEAD, SURVIVORS (contagion vs author), HONEY.
- A "+5 MOVES" rewarded-ad bubble floated on the board from 32 moves left on (not tapped).
- The bar chunk pieces were counted in the 33 bubbles; merging a chunk with its partner gives a single word bubble that then joins its theme.
- Level end: MASTERY 380 captured (dragburst), autumn leaves still on the frame.

## Level 27

Themes: 12 (bar `0/12`). Moves: 55 at start (first screenshot, before any drag), 9 left at the last merge. Mastery: 389 (captured with dragburst). Reward: 30 coins (counter 1,830 on the Mastery and Well Done screens). Next button is a plain green "LEVEL 28" (X2 and Home not tapped). Split words: 7. No booster used. Plain level (white "LVL 27" text, no octopus, no coloured tab). No chain this level.

Chunk pairs: VOR\|TEX, HURRI\|CANE, THUN\|DER and CHIM\|NEY and MAN\|TEL at the start (five pairs on the first board), then RESER\|VATION and WAI\|TER arrived later; so 7 pairs in all (each join cost 1 move).

| Theme | Words | Name |
|---|---|---|
| Fireplace | FIREWOOD, BRICK, MANTEL (MAN\|TEL), CHIMNEY (CHIM\|NEY) | (guessed: FIREPLACE PARTS; "Fantastic!" praise hid the name; returned as the word FIREPLACE) |
| Storms | HAILSTORM, THUNDER (THUN\|DER), HURRICANE (HURRI\|CANE), TORNADO (returned) | (guessed: STORMS; name not captured) |
| Tornado | TWISTER, DEBRIS, VORTEX (VOR\|TEX), FUNNEL | (guessed: TORNADO; "Incredible!" praise hid the name; returned as the word TORNADO) |
| Stretchy | GUM, TAFFY, BUNGEE CORD, BALLOONS | (guessed: STRETCHY; name not captured; SCARF surfaced when it cleared, return item not identified) |
| Restaurant | RESERVATION (RESER\|VATION), WAITER (WAI\|TER), MENU, TABLE | (guessed: RESTAURANT; returned as the word RESTAURANT) |
| Cooking | GRILL, FRY, BOIL, BAKE | (guessed: COOKING; returned as the word COOKING) |
| Restaurant (parent) | RESTAURANT, GASTRONOMY, CUISINE, COOKING | (guessed: FOOD; name not captured) |
| Warmth | SCARF, GLOVES, HEATER, FIREPLACE | (guessed: KEEPING WARM; name not captured) |
| Garden tools | TROWEL, WATERING, COMPOST, SEEDS (returned) | (guessed: GARDENING; name not captured) |
| Seeds | SESAME, APPLE, SUNFLOWER, PUMPKIN | (guessed: SEEDS; returned as the word SEEDS) |
| Bicycle | CHAIN, PEGS, PEDALS, KICKSTAND | (guessed: BICYCLE PARTS; returned as a bicycle picture) |
| Motor bikes | DIRT BIKE, SCOOTER, MOTORBIKE, bicycle picture (returned) | (guessed: BIKES; last theme, orange stack) |

Start board: 28 bubbles (23 words plus the chunk halves MAN, TEL and the rest), settled in about 4 s. Arrivals as themes cleared (GASTRONOMY was on the first board): BAKE, DEBRIS, KICKSTAND, FUNNEL, RESER/TER/WAI/VATION chunks, MENU, GRILL, MOTORBIKE, SCARF, FRY, PEDALS, SCOOTER, BOIL, CHAIN, CUISINE, GLOVES, PEGS, SEEDS, COOKING, RESTAURANT, FIREPLACE, TORNADO.

Notes:
- Returned-item chain (more than any earlier level): Fireplace parts -> FIREPLACE (joined Warmth), Tornado -> TORNADO (joined Storms), Restaurant words -> RESTAURANT (joined the food parent), Cooking -> COOKING (joined the food parent), Seeds -> SEEDS (joined Garden), Bicycle -> bicycle picture (joined Motor bikes).
- Decoys/wrong drags (each cost 1 move): VORTEX onto THUNDER (VORTEX belongs to the tornado), TWISTER and DEBRIS onto the storm stack, GASTRONOMY onto the restaurant stack before RESTAURANT returned, CHAIN onto the food stack, PEGS onto the motor stack and the garden stack, SUNFLOWER onto the garden stack. PEGS finally joined CHAIN (bicycle).
- A "+5 MOVES" rewarded-ad bubble floated on the board from 43 moves left to 20 (not tapped).
- Move streak refunds: the counter stayed level on several merges (e.g. 39 to 39 after the stretchy theme cleared).
- Level end: MASTERY 389 captured, autumn leaves on the frame.

## Level 28

Themes: 10 (bar `0/10`). Moves: 46 at start (first screenshot, before any drag), 16 left at the last merge (the Mastery screen then showed 9 as the bonus tally ran). Mastery: 402 (captured with dragburst). Reward: 30 coins (counter 1,860 on the Mastery and Well Done screens). Next button is a red "HARD LEVEL 29" with an octopus (the Well Done screen after level 28; X2 and Home not tapped). Split words: 6. No booster used. Plain level (white "LVL 28" text, no octopus). A chain with a padlock "3" splits the board (second chained level after 21; seen again here).

Chunk pairs: PLAS\|MA, CHEE\|TAH, GIRAF\|FE, COT\|TON (all four on the first board), CRE\|DIT and HAR\|MONY (arrived later). Each join cost 1 move.

| Theme | Words | Name |
|---|---|---|
| Fabrics | LINEN, WOOL, COTTON (COT\|TON), SILK | (guessed: FABRICS; orange stack, first theme cleared) |
| Blood parts | PLATELETS, PLASMA (PLAS\|MA), HEMOGLOBIN, CELLS | (guessed: BLOOD; returned as the word BLOOD) |
| Elephant | TRUNK, TUSKS, BIG EARS, TAIL | (guessed: ELEPHANT; returned as the word ELEPHANT) |
| Red liquids | CHERRY JUICE, BLOOD, WINE, TOMATO SAUCE | (guessed: RED LIQUIDS / RED THINGS; name not captured) |
| Music | SONG, MELODY, HARMONY (HAR\|MONY), RHYTHM | (guessed: MUSIC; returned as the word MUSIC) |
| Money | CASH, CREDIT (CRE\|DIT), DEBIT, BITCOIN | (guessed: MONEY / PAYMENT; name not captured) |
| US cities | BOSTON, DENVER, AUSTIN, RICHMOND | (guessed: CITIES; name not captured) |
| Sculpture | STATUE, BUST, CARVING, RELIEF | (guessed: SCULPTURE; returned as the word SCULPTURE) |
| Arts | LITERATURE, SCULPTURE (returned), MUSIC (returned), PAINTING | (guessed: ARTS; name not captured) |
| Savanna animals | ELEPHANT (returned), CHEETAH (CHEE\|TAH), ZEBRA, GIRAFFE (GIRAF\|FE) | (guessed: AFRICAN ANIMALS; last theme, two green stacks merged) |

Start board: 33 bubbles (24 words and 8 chunk halves at the start, plus the padlock chain across the middle). The chain and board take about 7 s to settle after the next-level tap. Arrivals: RHYTHM, AUSTIN, SONG, STATUE, BUST, MELODY, CASH, DEBIT, CARVING, RELIEF, BOSTON, DENVER, RICHMOND, BITCOIN, CRE/DIT, HAR/MONY (as pieces cleared and the board refilled from the top).

Notes:
- Chain mechanic: lock "3" at the start counted down 3 -> 2 (after Fabrics) -> 1 (after Blood parts) -> gone (after Elephant), and the bubbles below the chain (WINE, TOMATO SAUCE, GIRAFFE etc.) became reachable. Tutorial text not shown again (it was shown at level 21).
- Returned-item chain: Blood parts -> BLOOD (joined Red liquids), Elephant -> ELEPHANT (joined Savanna), Music -> MUSIC and Sculpture -> SCULPTURE (both joined Arts).
- Decoys: LITERATURE and PAINTING (stay till the Arts parent is ready), BLOOD (red liquids vs blood parts), CELLS, RELIEF vs CASH (money), RICHMOND/AUSTIN/DENVER (cities, not names).
- Move streak refunds: 41 -> 41 at one point when the Fabrics orange stack cleared (counter held at 41 after the merge).
- Level end: MASTERY 402, autumn leaves still on the frame.

## Level 29

Themes: 9 (bar `0/9`). Moves: 41 at start (first screenshot, before any drag), 10 left at the last merge (the Mastery screen showed 1 as the bonus tally ran). Mastery: 420 (captured with dragburst). Reward: 60 coins (HARD level reward, as levels 8, 19, 24; counter 1,890 on the Mastery and Well Done screens). Next button is a plain green "LEVEL 30" (X2 and Home not tapped). Split words: 6. No booster used. HARD level: red LVL tab with the octopus and a red booster bar. No chain this level.

Chunk pairs: GLO\|VES, HEL\|MET, SUR\|GEON, COM\|PUTER, LAP\|TOP, CHIM\|NEY (VES in the board was the second half of GLO\|VES). Each join cost 1 move. Split words: 6.

| Theme | Words | Name |
|---|---|---|
| Surgery | SURGEON (SUR\|GEON), SCALPEL, GLOVES (GLO\|VES), MASK | (guessed: OPERATING ROOM; name not captured) |
| Fireplace | CHIMNEY (CHIM\|NEY), MATCHES, LOG, FIRE | (guessed: FIREPLACE; returned as the word FIREPLACE) |
| Armour | ARMOR, SHIELD, SWORD, HELMET (HEL\|MET) | (guessed: KNIGHT / ARMOUR; name not captured) |
| Genetics | MUTATION, DNA, GENOTYPE, HYBRID | (guessed: GENETICS; name not captured) |
| Computers | SMARTPHONE, COMPUTER (COM\|PUTER), LAPTOP (LAP\|TOP), TABLET | (guessed: ELECTRONICS; name not captured) |
| Print | BROCHURE, BOOK, MAGAZINE, NEWSPAPER | (guessed: PRINT MEDIA; name not captured) |
| Piano | STRINGS, PEDAL, HAMMER, KEYS | (guessed: PIANO PARTS; name not captured) |
| Living room | RUG, SOFA, CHAIR, FIREPLACE (returned) | (guessed: LIVING ROOM; name not captured) |
| Safety / medicine | LIFEBUOY, SEATBELT, VACCINE, doctor picture (returned) | (guessed: SAFETY / HEALTH; last theme, orange stack with a purple core) |

Start board: 33 bubbles (including teal chunk halves GLO, MET, VES, SUR, NEY, CHIM, HEL; the biggest start board so far, settled in about 8 s). Arrivals: GENOTYPE, GEON, TABLET, SCALPEL, GLOVES, a doctor picture (returned from the surgery theme), HYBRID, TOP, COM, BOOK, MAGAZINE, SMARTPHONE, COMPUTER, LAPTOP, FIREPLACE.

Notes:
- Returned-item chain: Surgery -> doctor picture (joins the last theme), Fireplace -> FIREPLACE (joins Living room).
- Wrong drags (each cost 1 move): HYBRID dragged before it had a stack (no merge), FIREPLACE dragged onto the purple rug/sofa/chair stack (no merge; the fire then joined only after the stack went onto it), VACCINE onto the genetics stack, BROCHURE decoy vs print, SEATBELT and LIFEBUOY (not armour), TABLET and KEYS (computers vs piano), GLOVES (surgery vs armour).
- No "+5 MOVES" ad bubble was seen this level.
- Level end: MASTERY 420 captured, autumn leaves on the frame.

## Level 30

Themes: 10 (bar `0/10`). Moves: 49 at start (first screenshot, before any drag), 21 left at the last merge (the Mastery screen then showed 11 as the bonus tally ran). Mastery: 431 (captured with dragburst). Reward: 30 coins (counter 1,950 on the Mastery and Well Done screens). Next button is a plain green "LEVEL 31" (X2 and Home not tapped). Split words: 4. No booster used. Plain level (white "LVL 30" text, no octopus, no coloured tab). No chain this level.

Chunk pairs: CO\|RAL (CORAL), MONI\|TOR (MONITOR), DIA\|MOND (DIAMOND) and SAL\|MON (SALMON; the MON half arrived late). Each join cost 1 move.

| Theme | Words | Name |
|---|---|---|
| Gems | DIAMOND (DIA\|MOND), PEARL, ONYX, OPAL | (guessed: GEMS; returned as the word GEMSTONE) |
| Money | CASH, COINS, CURRENCY, CENT | (guessed: MONEY; returned as the word MONEY) |
| Fruit | GRAPE, APPLE, BANANA, PLUM | (guessed: FRUIT; name not captured) |
| Egypt | NILE, PYRAMID, MUMMY, PHARAOH | (guessed: ANCIENT EGYPT; name not captured) |
| Fish | SALMON (SAL\|MON), TUNA, HERRING, TILAPIA | (guessed: FISH; returned as a seahorse picture) |
| Reef | CORAL (CO\|RAL), REEF, WATER, seahorse picture (returned) | (guessed: SEA / REEF; name not captured) |
| Computer parts | MOUSE, KEYBOARD, MONITOR (MONI\|TOR), CPU | (guessed: COMPUTER; returned as the word HARDWARE) |
| Computing | INTERNET, HARDWARE (returned), SOFTWARE, PROGRAMMING | (guessed: COMPUTING; name not captured) |
| Library | BOOKS, SHELF, LIBRARIAN, SILENCE | (guessed: LIBRARY; name not captured) |
| Jewelry | GEMSTONE (returned), JEWELRY, GOLD, MONEY (returned) | (guessed: JEWELRY; last theme, orange stack) |

Start board: 28 bubbles (about 20 words and the chunk halves MOND, MONI, RAL, DIA, TOR, CO, SAL), settled in about 5 s. Arrivals as themes cleared: SAL/MON, SILENCE, SHELF, GEMSTONE, MONEY, BOOKS, LIBRARIAN, PYRAMID, MUMMY, PHARAOH, JEWELRY, TUNA, HERRING, SALMON, TILAPIA, seahorse picture, HARDWARE.

Notes:
- Returned-item chain: Gems -> GEMSTONE (joined Jewelry), Money -> MONEY (joined Jewelry), Fish -> seahorse picture (joined Reef), Computer parts -> HARDWARE (joined Computing). The returns for Fruit, Egypt and Library were not identified (they may have been other words that cleared on arrival, e.g. BOOKS); the order of the clears here is partly reconstructed.
- Wrong drags: CORAL/REEF dragged to the wrong stack early, MONITOR/MOUSE decoys vs the computing theme, JEWELRY and GOLD (not money), SALMON/TUNA onto the reef stack. The Move Streak refund kept the counter level on a few merges (45 stayed 45 after PEARL and ONYX).
- No "+5 MOVES" ad bubble was seen this level. No purchase offer appeared in levels 21 to 30.
- Level end: MASTERY 431 captured, autumn leaves on the frame.

## Level 31

Themes: 9 (bar `0/9`). Moves: 47 at start (first screenshot, before any drag), 15 left after the last merge. Mastery: 445 (captured with dragburst). Reward: 30 coins (counter 1,980). Next button is a plain green "LEVEL 32" (X2 and Home not tapped). Split words: 8. No booster used. Plain level. No chain this level.

Chunk pairs: SPA\|NISH, GER\|MAN, PRA\|GUE, BEI\|JING, BI\|SHOP, COT\|TAGE, BAM\|BOO and DOMI\|NO. Each join cost 1 move.

New: cryptic bubbles (words with missing letters shown as "?"; letters reveal as you play).

| Theme | Words | Name |
|---|---|---|
| Languages | SPANISH (SPA\|NISH), ENGLISH, GERMAN (GER\|MAN), FRENCH | LANGUAGES (shown; returned as a word bubble, joined a parent) |
| Capitals | BUDAPEST, PRAGUE (PRA\|GUE), COPENHAGEN, BEIJING (BEI\|JING) | CAPITALS (shown; returned as a word bubble) |
| Chess | ROOK, BISHOP (BI\|SHOP), QUEEN, KNIGHT | CHESS (shown; returned as the word CHESS, joined the last theme) |
| House | BUNGALOW, MANSION, VILLA, COTTAGE (COT\|TAGE) | HOUSE (shown; returned as the word HOUSE, joined FARM) |
| Coffee drinks | MOCHA, LATTE, ESPRESSO, CAPPUCCINO | COFFEE DRINKS (shown) |
| Composer | BEETHOVEN, BACH (cryptic ??C? -> ?ACH -> BACH), MOZART, CHOPIN | COMPOSER (shown) |
| Farm | STABLE, BARN, FIELD, HOUSE (returned) | FARM (shown) |
| Panda | BAMBOO (BAM\|BOO), BEAR, WHITE, BLACK (cryptic ????? -> BLACK) | PANDA (shown; returned as the word PANDA, joined the last theme) |
| Last | ORCA, PANDA (returned), DOMINO (DOMI\|NO), CHESS (returned) | (guessed: BLACK AND WHITE; name not captured, the 4-word bubble showed only its words) |

Notes: the first coffee merge (CAPPUCCINO) missed once because bubbles were still moving (cost 1 move; DUR=900 worked). ORCA onto BAMBOO/BEAR did not merge (cost 1 move). Names read from screenshots a9, b4, c3, d3, d7, e3, f4, g4 in the scratchpad.

## Level 32

Themes: 11 (bar `0/11`). Moves: 48 at start (first screenshot, before any drag), 17 left at the last merge. Mastery: 467 (captured with dragburst). Reward: 30 coins (counter 2,010). Next button is a plain green "LEVEL 33" (X2 and Home not tapped). Split words: 3. No booster used. Plain level. No chain this level.

Only about 28 bubbles were on screen at the start; more words appeared on the board as themes cleared (later words such as FRIES, SANDWICH, HAWAIIAN, KITE, LAKE, BUTTERFLY, DANUBE, SUPREME, MARGHERITA, PEPPERONI, NILE, AMAZON, MISSISSIPPI came in this way).

Chunk pairs: DOL\|PHIN (DOLPHIN), SPAR\|ROW (SPARROW) and BUR\|GER (BURGER). Each join cost 1 move.

Cryptic bubbles seen (letters revealed as play went on): ??S? -> F?SH -> FISH, ?N??E -> ?NA?E -> SNAKE, P??? -> P??D -> PO?D -> POND.

| Theme | Words | Name |
|---|---|---|
| Oceans | PACIFIC, ATLANTIC, INDIAN, ARCTIC | OCEAN (shown; returned as the word OCEAN, joined BODIES OF WATER) |
| Birds | OWL, PARROT, EAGLE, SPARROW (SPAR\|ROW) | BIRD (shown; returned as the word BIRD, joined THINGS THAT FLY) |
| Aircraft | JET, DRONE, GLIDER, HELICOPTER | PLANE (shown; returned as the word PLANE) |
| Reptiles | LIZARD, TURTLE, CROCODILE, SNAKE | REPTILE (shown; returned as the word REPTILE) |
| Pizza | HAWAIIAN, SUPREME, MARGHERITA, PEPPERONI | PIZZA (shown; returned as the word PIZZA, joined FAST FOOD) |
| Rivers | MISSISSIPPI, NILE, AMAZON, DANUBE | RIVER (shown; returned as the word RIVER) |
| Fast food | FRIES, PIZZA, BURGER (BUR\|GER), SANDWICH | FAST FOOD (shown) |
| Water | LAKE, RIVER, POND, OCEAN | BODIES OF WATER (shown) |
| Mammals | ELEPHANT, LION, DOLPHIN (DOL\|PHIN), BAT | MAMMAL (shown; returned as the word MAMMAL) |
| Flying | PLANE, KITE, BIRD, BUTTERFLY | THINGS THAT FLY (shown) |
| Animals | REPTILE, FISH (cryptic), MAMMAL, INSECT | (guessed: ANIMAL; name not captured on the final merge) |

Notes: first LAKE-onto-DANUBE drag missed (cost 1 move). Names read from screenshots a3, a8, b2, b5, b9, c4, c8, d3, d6, d9 in the scratchpad.

## Level 33

Themes: 11 (bar `0/11`). Moves: 43 at start (first screenshot, before any drag), 13 left after the last merge. Mastery: 482 (captured with dragburst). Reward: 30 coins (counter 2,040). Next button is a red "HARD LEVEL 34" with an octopus (X2 and Home not tapped). Split words: 0. No booster used. Plain level. No chain, no cryptic bubbles this level.

Only about 27 bubbles were on screen at the start; more words came onto the board as themes cleared (TARGET, SURGE, BOW, SHOTGUN, FAULT, FLOOD, SEISMIC, PISTOL, RIFLE, SHAKE, TREMOR, REVOLVER, ARROW, QUIVER).

Chunk pairs: none.

The theme tree is deep: WEAPON and CALIFORNIA and TSUNAMI were all clear sub-themes that returned as bubbles; the bar counted `10/11` while only 4 bubbles were left.

| Theme | Words | Name |
|---|---|---|
| Volcano | CRATER, ERUPTION, LAVA, MAGMA | VOLCANO (shown; returned as the word VOLCANO) |
| National parks | EVERGLADES, GRAND CANYON, YELLOWSTONE, ZION | NATIONAL PARKS (shown) |
| Hopping animals | KANGAROO, WALLABY, HARE, RABBIT | HOPPING ANIMALS (shown) |
| Earthquake | FAULT, SEISMIC, SHAKE, TREMOR | EARTHQUAKE (shown; returned as the word EARTHQUAKE) |
| Gun | PISTOL, SHOTGUN, RIFLE, REVOLVER | GUN (shown; returned as the word GUN, joined WEAPON) |
| Archer | QUIVER, BOW, ARROW, TARGET | ARCHER (shown; returned as the word ARCHER) |
| Weapon | SWORD, SPEAR, GUN, ARCHER | WEAPON (shown) |
| Hollywood | OSCARS, MOVIES, STUDIOS, STARS | HOLLYWOOD (shown; returned as the word HOLLYWOOD) |
| California | NAPA, GOLDEN GATE, SILICON VALLEY, HOLLYWOOD | CALIFORNIA (shown) |
| Tsunami | FLOOD, SURGE, WAVE, OCEAN | TSUNAMI (shown; returned as the word TSUNAMI) |
| Natural disasters | AURORA, VOLCANO, EARTHQUAKE, TSUNAMI | (guessed: NATURE or NATURAL EVENTS; the final merge was covered by the praise text "Incredible!", not captured) |

Notes: no wrong drags; the move counter held at 17 once (streak refund) after 5 merges in a row. Names read from screenshots a3, a6, a9, b4, b7, c1, c3, c7, d2, d5 in the scratchpad.

## Level 34

Themes: 10 (bar `0/10`). Moves: 37 at start (first screenshot, before any drag), 9 left at the last merge. Mastery: 494 (captured with dragburst). Reward: 60 coins (HARD level; counter 2,070 on the Mastery and Well Done screens). Next button is a purple "EXPERT LEVEL 35" with a purple octopus (X2 and Home not tapped). Split words: 0. No booster used. HARD level (red LVL tab with a red octopus, red booster bar, as levels 8, 19, 24, 29). No chain.

Chunk pairs: none. Cryptic bubbles: M??? -> M?OW -> MEOW, ??K? -> M?KO -> MAKO, ???? -> ?O?? -> ?O?K -> ?OLK -> YOLK.

Only about 26 bubbles were on screen at the start; LONDON, TROPHY, TENNIS, GRASS and similar words were already there, and returned sub-theme bubbles joined as themes cleared.

| Theme | Words | Name |
|---|---|---|
| Social media | TIKTOK, TWITTER, INSTAGRAM, FACEBOOK | SOCIAL MEDIA (shown) |
| Animal sounds | MEOW (cryptic), ROAR, BARK, NEIGH | ANIMAL SOUNDS (shown) |
| Shark | HAMMERHEAD, MAKO (cryptic), TIGER, GREAT WHITE | SHARK (shown; returned as the word SHARK, joined the last theme) |
| Egg | HATCH, SHELL, WHITE, YOLK (cryptic) | EGG (shown; returned as the word EGG, joined PENGUIN) |
| Penguin | COLONY, WADDLE, ICE, EGG (returned) | PENGUIN (shown; returned as the word PENGUIN, joined NON-FLYING BIRDS) |
| Non-flying birds | EMU, KIWI, OSTRICH, PENGUIN (returned) | NON-FLYING BIRDS (shown) |
| Printed media | NEWSPAPER, NEWSLETTER, MAGAZINE, BROCHURE | PRINTED MEDIA (shown) |
| Wimbledon | TENNIS, LONDON, GRASS, TROPHY | WIMBLEDON (shown; returned as the word WIMBLEDON, joined SPORT EVENTS) |
| Sport events | OLYMPIAD, WORLD CUP, SUPER BOWL, WIMBLEDON (returned) | SPORT EVENTS (shown) |
| Sea hunters | SQUID, BARRACUDA, ORCA, SHARK (returned) | (guessed: SEA PREDATORS or OCEAN HUNTERS; the 4-bubble orange merge showed only its words in the burst) |

Notes: a drag of PENGUIN onto the flightless stack the first time did not merge and did not cost a move (counter stayed 21); the retry worked. One wrong drag (TROPHY onto OLYMPIAD/WORLD CUP/SUPER BOWL) cost 1 move. Move streak refund seen (counter held at 34 after the SOCIAL MEDIA merge, 21 after the PENGUIN merge).

## Level 35 (EXPERT; out of moves once at 8/10, completed after the free +5)

Themes: 10 (bar `0/10`). Moves: 43 at start (first screenshot, before any drag), 0 left with the bar at `8/10` (out of moves). The free "+5 Moves FREE" button then gave a straight +5 (see below) and the level was completed with 2 moves left. Mastery: MISSED (the dragburst on the last merge showed Fantastic! then the Well Done screen; Mastery was not caught). Reward: 90 coins (EXPERT; the counter stayed 2,130 on the Well Done screen). Next button is a plain green "LEVEL 36" (X2 and Home not tapped). EXPERT level (purple LVL tab with a purple octopus, purple booster bar). Split words: 9 chunk pairs (the most so far). No booster used. No chain, no cryptic bubbles.

Chunk pairs: MYS\|TERY, ELE\|MENT, MOLE\|CULE, CURI\|OUS, CHAR\|GER, HOR\|ROR, NEU\|TRON, CHAP\|TER and PRO\|TON. Each join cost 1 move.

A floating "+5 MOVES" rewarded-ad bubble (orange, video icon) hung on the board from about move 12 (not tapped).

What went wrong: about 7 moves were spent on chunks (9 chunk pairs need 9 joins) plus about 6 wrong or no-op drags (AUTHOR onto BOOK, CHAP onto AUTHOR, a missed ELE drag, and others), so the level was out of moves with the gadget cluster (APP, CAMERA, SCREEN, CHARGER, DRONE, SMARTWATCH, 3D PRINTER) not yet cleared.

| Theme | Words | Name |
|---|---|---|
| Genre | MYSTERY (MYS\|TERY), ROMANCE, HORROR (HOR\|ROR), FANTASY | GENRE (shown; returned as the word GENRE, joined LITERATURE) |
| Feelings | CURIOUS (CURI\|OUS), LONELY, JOYFUL (returned from the SMILE/LAUGH/CHEER/DANCE theme), ANGRY (returned) | FEELINGS & EMOTIONS (shown) |
| Joyful | SMILE, LAUGH, CHEER, DANCE | JOYFUL (shown; returned as the word JOYFUL) |
| Library | LIBRARIAN, SHELF, BOOK, CATALOG | LIBRARY (shown; returned as the word LIBRARY, joined LITERATURE) |
| Literature | GENRE (returned), AUTHOR, CHAPTER (CHAP\|TER), LIBRARY (returned) | LITERATURE (shown) |
| Atom | NEUTRON (NEU\|TRON), ELECTRON, PROTON (PRO\|TON), NUCLEUS | ATOM (shown; returned as the word ATOM, joined CHEMISTRY) |
| Anger | RAGE, SHOUT, TEMPER, FROWN | ANGRY (shown; returned as the word ANGRY) |
| Chemistry | ELEMENT (ELE\|MENT), MOLECULE (MOLE\|CULE), ACID, ATOM (returned) | CHEMISTRY (shown) |
| Smartphone | APP, CAMERA, SCREEN, CHARGER | SMARTPHONE (shown; returned as the word SMARTPHONE) |
| Gadgets | DRONE, SMARTWATCH, 3D PRINTER, SMARTPHONE (returned) | (guessed: GADGETS or TECHNOLOGY; the final merge showed only the 4 words in an orange bubble) |

Names read from screenshots b4, c6, d6, e2, e6, e8, f1, f5 in the scratchpad and g1.

Out-of-moves screen (scratchpad/shots/oom35a.png, oom35c.png, oom35d.png): a modal "OUT OF MOVES! Add extra moves to continue" with a big green "+5 Moves FREE" button, a swipeable carousel below: (1) "Revive Offer" 1,000 coins + 1 each of Extra Bubbles/Magnet/Hint + 1H unlimited hearts for 880 yen ("Continue with +15 Moves"), (2) "Golden Pass" (GET button, 5d 4h timer). There is no close X; Back, outside taps and a swipe down did nothing. On the coordinator's word I tapped "+5 Moves FREE": it gave a straight +5 moves at once (counter 0 -> 5), no ad, no price, no later cost seen (coins unchanged at 2,130). After the +5 the level was finished with 2 moves left.

## Level 36

Themes: 10 (bar `0/10`). Moves: 46 at start (first screenshot, before any drag), 11 left at the last merge. Mastery: 509 (captured with dragburst; Level 35's Mastery was missed, so the gap from 494 is unrecorded). Reward: 30 coins (counter 2,220 on the Mastery and Well Done screens; coins had gone 2,130 -> 2,220 across the level 35 reward of 90). Next button is a plain green "LEVEL 37" (X2 and Home not tapped). Split words: 5. No booster used (the two FREE boosters on the pre-level dialog were not selected). Plain level. No chain.

New: a pre-level dialog (logged in the features table). A "+5 MOVES" rewarded-ad bubble sat on the board for most of the level (not tapped).

Chunk pairs: PEN\|GUIN, DEMO\|CRACY, ELEC\|TION, SPELL\|BOOK and (CRA\|B, cryptic ?RA? -> CRAB, not a chunk). Each join cost 1 move. I joined chunks only once their theme was close to ready, as the coordinator asked.

Cryptic bubbles: ???? -> ??A? -> ?RA? -> CRAB; ???L -> ?O?L -> BO?L -> BOIL; ?N?? / ?N?Y -> EN?Y -> ENVY; ?A?E -> BA?E -> BAKE.

| Theme | Words | Name |
|---|---|---|
| Magic | WIZARD, WAND, CHARMS, SPELLBOOK (SPELL\|BOOK) | MAGIC (shown) |
| Seafood | SHRIMP, SCALLOP, MUSSEL, CRAB (cryptic) | SEAFOOD (shown) |
| Roller coaster | TRACK, SPEED, LOOP, THRILL | ROLLER COASTER (shown) |
| Noodles | SOBA, UDON, PHO, RAMEN | NOODLES (shown) |
| Kitchen appliances | BLENDER, TOASTER, MICROWAVE, FRIDGE | KITCHEN APPLIANCES (shown) |
| Cooking techniques | GRILL, BOIL (cryptic), FRY, BAKE (cryptic) | COOKING TECHNIQUES (shown) |
| Unpleasant feelings | ANGER, FEAR, GUILT, ENVY (cryptic) | UNPLEASANT (shown) |
| Hygiene | BRUSH, RINSE, SHOWER, FLOSS | HYGIENE (shown) |
| Politics | CAMPAIGN, BALLOT, DEMOCRACY (DEMO\|CRACY), ELECTION (ELEC\|TION) | POLITICS (shown) |
| Flightless / pink birds | EMU, OSTRICH, FLAMINGO, PENGUIN (PEN\|GUIN) | (guessed: BIRDS; the burst showed only the four words in an orange bubble, no name) |

Notes: SEAFOOD, MAGIC and the others returned and joined parents that were not shown; the returned bubbles were not visible in the later screenshots (the bar counts them). One wrong drag (GRILL onto the appliance stack) cost 1 move; one chunk drag (ELEC onto TION) cost 1 move when the board shifted (retry with DUR=800 worked); the +5 bubble was never tapped. Names read from screenshots a4, b5, d3, e2, e3, e6, f3, g3, g9 in the scratchpad.

## Level 37

Themes: 10 (bar `0/10`, counting sub-themes that return as words). Moves: 50 at start (s37a), 10 left at the last merge. Mastery: 520 (dragburst, fin37_5). Reward: 30 coins (counter 2,250 on the Mastery and Well Done screens). Next button is a plain green "LEVEL 38" (X2 and Home not tapped). Split words: 8. No booster used. Plain level. Chain lock "3" across the middle (first seen at level 21), see notes.

Chunk pairs: MINI\|VAN, SUN\|SET, MAN\|GO, CAR\|ROT, GRA\|INS, EGG\|PLANT, BLUE\|BELL, DARK\|NESS. Each join cost 1 move.

Hierarchy: most words started in two or three layers. Many bubbles were not on the board at the start and dropped in from the top as earlier merges happened (EGG, ROT, BELL, BLUE, SET, DAISY, GUAVA, ROSE, LILY, DAWN, MIDNIGHT, MANGOSTEEN, OKRA, ROMANESCO, POMEGRANATE and others). Sub-themes (cars, night, berries, mushrooms) return as one word that joins a parent theme.

| Theme | Words | Name |
|---|---|---|
| Vehicles | SUV, SEDAN, COUPE, MINIVAN (MINI\|VAN) | VEHICLE (shown, b2) |
| Night | MOON, STARS, SLEEP, DARKNESS (DARK\|NESS) | NIGHT (shown, d3) |
| Times of day | NIGHT, DAWN, SUNSET (SUN\|SET), MIDNIGHT | TIMES OF DAY (shown, w1) |
| Fruit | POMEGRANATE, MANGO (MAN\|GO), GUAVA, MANGOSTEEN | FRUIT (shown, x1) |
| Flowers | LILY, ROSE, DAISY, BLUEBELL (BLUE\|BELL) | FLOWERS (shown, z1) |
| Vegetables | CARROT (CAR\|ROT), EGGPLANT (EGG\|PLANT), OKRA, ROMANESCO | VEGETABLES (shown, bb1) |
| Berries | RASPBERRY, BLUEBERRY, STRAWBERRY, CRANBERRY | BERRIES (shown, dd1) |
| Mushrooms | ENOKI, PORCINI, TRUFFLE, SHIITAKE | MUSHROOMS (shown, v1) |
| Healthy eating | FRUIT, VEGETABLES, SALAD, GRAINS (GRA\|INS) | HEALTHY EATING (shown, ii1) |
| Foraged/natural foods (guessed) | BERRIES, NUTS, HERBS, MUSHROOMS | (guessed: FORAGING; the burst showed only the four words in an orange bubble, no name) |

Notes: the chain lock counted completed themes, not bubbles: it went 3 -> 2 after VEHICLE and 2 -> 1 after NIGHT, then vanished after MUSHROOMS. While it stood, the upper half (cars, night, fruit, flowers, vegetables, times of day) could not be finished: three stacks sat at three words with no fourth until the lower half was done (the fourth words dropped in only after MUSHROOMS). I lost about 8 moves guessing: HERBS dragged onto SALAD, the vegetable stack, the flower stack and the berry stack all failed (HERBS belongs with BERRIES and NUTS), SALAD onto the vegetable stack failed, a first ENOKI drag in the locked half did nothing, and BERRIES onto FRUIT failed once. A "+5 MOVES" rewarded-ad bubble sat on the board for most of the level (not tapped). Names read from the shots named in the table in the scratchpad.

## Level 38

Themes: 9 (bar `0/9`). Moves: 44 at start (s38a), 15 left at the last merge. Mastery: 530 (dragburst, fin38_5). Reward: 30 coins (counter 2,280 on the Mastery and Well Done screens; 2,250 before). Next button is a HARD "LEVEL 39" with an octopus (red tab; X2 and Home not tapped). Split words: 7. No booster used (two boosters on the pre-level dialog, count 1 each, not selected). Plain level, no chain.

Chunk pairs: PAS\|SAGE, EMPE\|ROR, GLADI\|ATOR, CHA\|RIOT, AMERI\|CANO, BLEN\|DER, COU\|PON. Each join cost 1 move. Many words dropped in later, after a sub-theme cleared (SPHINX, KETTLE, TORCH, EGYPT, CANDLE, LANTERN, LIGHTER, JUICER, ESPRESSO, MACCHIATO, CAPPUCCINO, COLOSSEUM and others).

| Theme | Words | Name |
|---|---|---|
| Treats | FUDGE, BROWNIE, CUPCAKE, DONUT | TREATS (shown, a3) |
| Ticket | PASSAGE (PAS\|SAGE), ENTRY, ADMISSION, ACCESS | TICKET (shown, b4) |
| Colosseum | GLADIATOR (GLADI\|ATOR), EMPEROR (EMPE\|ROR), ARENA, CHARIOT (CHA\|RIOT) | COLOSSEUM (shown, e3) |
| Flame holders | CANDLE, LIGHTER, LANTERN, TORCH | FLAME HOLDERS (shown, f4) |
| Coffee machine | CAPPUCCINO, MACCHIATO, ESPRESSO, AMERICANO (AMERI\|CANO) | COFFEE MACHINE (shown, h3) |
| Kitchen appliances | KETTLE, JUICER, BLENDER (BLEN\|DER), COFFEE MACHINE | KITCHEN APPLIANCES (shown, j3) |
| Redeemables | VOUCHER, COUPON (COU\|PON), TOKEN, TICKET | REDEEMABLES (shown, l3) |
| Pyramids | MUMMIES, PHARAOH, SPHINX, EGYPT | PYRAMIDS (shown, n3) |
| Landmarks | PYRAMIDS, COLOSSEUM, GREAT WALL, EIFFEL TOWER | (guessed: LANDMARKS; the burst showed only the four words in an orange bubble, no name) |

Notes: three themes were nested one level deeper than they looked (TICKET, COLOSSEUM, COFFEE MACHINE, FLAME HOLDERS and PYRAMIDS each returned as a word and joined a parent). A wrong drag (CHA onto the Rome stack) cost 1 move; a few drags made while the board was still shifting did nothing and cost nothing. Streak refunds kept the counter flat twice (33 and 20-ish). Names read from the shots named in the table in the scratchpad.

## Level 39 (HARD)

Themes: 11 (bar `0/11`). Moves: 51 at start (s39a), 13 left at the last merge (this includes +5 from an accidental rewarded ad, see notes). Mastery: 543 (dragburst, fin39_5). Reward: 60 coins (HARD; counter 2,310 on the Mastery and Well Done screens; 2,280 before). Next button is a purple "EXPERT LEVEL 40" with a pink octopus (X2 and Home not tapped). Split words: 7 joins (CRIS\|PY, SNEA\|KERS, LIGHT\|HOUSE, BUSI\|NESS, UNI\|FORM, TER\|MINAL, CERE\|AL). No booster used. Red "LVL 39" tab with an octopus. The pre-level dialog's PLAY button was normal; the dialog showed no FREE tag. Autumn leaf decoration at the top of the Mastery and Well Done screens (as at level 8).

Chunk pairs: CRIS\|PY, SNEA\|KERS, LIGHT\|HOUSE, BUSI\|NESS, UNI\|FORM, TER\|MINAL, CERE\|AL. Each join cost 1 move (7 moves). I joined them only when their theme needed them. Many words dropped in later after a sub-theme cleared (SCRAM, TUXEDO, GOWN, KID, ADULT, RUNWAY, CUSTOMS, TIE and others).

| Theme | Words | Name |
|---|---|---|
| Bacon | FRIED, SALTY, SMOKY, CRISPY (CRIS\|PY) | BACON (shown, a4) |
| Casual wear | JEANS, T-SHIRT, HOODIE, SNEAKERS (SNEA\|KERS) | CASUAL (shown, b4) |
| Baby | CRIB, PACIFIER, DIAPER, STROLLER | BABY (shown, d3) |
| Harbor | PIER, DOCK, LIGHTHOUSE (LIGHT\|HOUSE), WHARF | HARBOR (shown, f2) |
| Egg | SCRAMBLED, BOILED, POACHED, OMELETTE | EGG (shown, h3) |
| Breakfast | EGG, BACON, WAFFLES, CEREAL (CERE\|AL) | BREAKFAST (shown, i4) |
| Life stages | BABY, KID, TEEN, ADULT | LIFE STAGES (shown, j4) |
| Formal | TIE, GOWN, HEELS, TUXEDO | FORMAL (shown, k4) |
| Dress code | UNIFORM (UNI\|FORM), FORMAL, BUSINESS (BUSI\|NESS), CASUAL | DRESS CODE (shown, m5) |
| Airport | RUNWAY, CONTROL TOWER, BAGGAGE CLAIM, CUSTOMS | AIRPORT (shown, o4) |
| Transport hubs | STATION, HARBOR, TERMINAL (TER\|MINAL), AIRPORT | (guessed: TRANSPORT HUBS; the burst showed only the four words in an orange bubble, covered by "Cool!") |

Notes: the TER\|MINAL drag was the point where a rewarded ad played (see the features table). A "+5 MOVES" bubble sat on the board from move 24 on; I never tapped it, but a drag that began near it opened the ad, and the counter rose 14 -> 18 after the ad (+5, minus 1 for the join). A BUSINESS drag onto the dress-code stack missed once (1 move). Names read from the shots named in the table in the scratchpad.

## Level 40 (EXPERT)

Themes: 9 (bar `0/9`). Moves: 38 at start (s40a), 7 left at the last merge. Mastery: 555 (dragburst, fin40_5). Reward: 90 coins (EXPERT; counter 2,370 on the Mastery and Well Done screens; 2,310 before). Next button is a plain green "LEVEL 41" (X2 and Home not tapped). Split words: 8 (EXPLO\|SION, RADIA\|TION, OPE\|RA, BUC\|KET, BUT\|TER, DARK\|NESS, BUN\|KER, KER\|NEL). No booster used. Purple "LVL 40" tab with a pink octopus. Autumn leaf decoration at the top of the Mastery and Well Done screens. The pre-level dialog's PLAY button read "EXPERT LEVEL PLAY".

Chunk pairs: EXPLO\|SION, RADIA\|TION, OPE\|RA, BUC\|KET, BUT\|TER, KER\|NEL, DARK\|NESS, BUN\|KER. Each join cost 1 move. Cryptic bubbles: ??N? -> M?N? -> M?NE -> MINE; ???? -> ?C?? -> EC?O -> ECHO; M???? -> M???O -> M?ZZO -> MEZZO; ????? -> ?L??? -> ?LOW? -> ?LOWN -> CLOWN. There was no ad and no chain on this level.

| Theme | Words | Name |
|---|---|---|
| Popcorn | KERNEL (KER\|NEL), BUTTER (BUT\|TER), SALT, BUCKET (BUC\|KET) | POPCORN (shown, f1) |
| Things that pop | POPCORN, BUBBLEGUM, BALLOON, FIRECRACKER | THINGS THAT POP (shown, g1) |
| Cave | ECHO (cryptic), BAT, STALACTITE, DARKNESS (DARK\|NESS) | CAVE (shown, k1) |
| Underground locations | CAVE, BUNKER (BUN\|KER), SUBWAY, MINE (cryptic) | UNDERGROUND LOCATIONS (shown, p1) |
| Circus | CLOWN (cryptic), TIGHTROPE, ACROBAT, TRAPEZE | CIRCUS (shown, t1) |
| Opera voices | SOPRANO, MEZZO (cryptic), TENOR, BARITONE | SINGER (shown, a1) |
| Supernova | STAR DEATH, REMNANT, EXPLOSION (EXPLO\|SION), RADIATION (RADIA\|TION) | SUPERNOVA (shown, d1) |
| Live shows | CIRCUS, PARADE, THEATER, OPERA (OPE\|RA) | LIVE SHOWS (shown, g1) |
| Sky events | METEOR, AURORA, ECLIPSE, SUPERNOVA | (guessed: SKY EVENTS; the burst showed only the four words in an orange bubble, covered by "Cool!") |

Notes: SINGER vanished after it was shown and the bar went up, so it joined the OPERA stack without a second bubble being visible. Five themes returned as sub-theme words (POPCORN, CAVE, CIRCUS, SINGER, SUPERNOVA). Names read from the shots named in the table in the scratchpad. A brief Android status bar (clock "8:16" and a "G") flickered at the top of the board once, after the Play Store detour at level 39.

## Level 41

Themes: 10 (bar `0/10`). Moves: 47 at start (s41a), 14 left at the last merge (13 on the Mastery screen). Mastery: 559 (single drag with WAIT=1 for the name, then four back-to-back shots; f41c). Reward: 30 coins (counter 2,460 on the Mastery and Well Done screens, 2,490 on the Level 42 pre-level dialog). Next button is a plain green "LEVEL 42" (X2 and Home not tapped). Split words: 5 joins. No booster used. Plain level, no chain. Autumn leaf decoration on the Mastery and Well Done screens.

Chunk pairs: SOC\|RATES, CYP\|RUS, BURG\|LAR, SCOR\|PION, WIT\|NESS. Each join cost 1 move. Many words dropped in only after a sub-theme cleared (TARANTULA, SNAKE, FANG, VENOM, HOOD, THOR, ZEUS, ODIN, MURDERER, SCAMMER, HACKER and others), and each chunk partner appeared late too.

| Theme | Words | Name |
|---|---|---|
| Judge | ROBE, GAVEL, VERDICT, LAWS | JUDGE (shown, d41f) |
| Ancient states | ROME, EGYPT, CARTHAGE, BABYLON | ANCIENT STATES (shown, d41i) |
| Hornet | STING, WASP, NEST, SWARM | HORNET (shown, d41m) |
| Islands | HAWAII, SICILY, CYPRUS (CYP\|RUS), ICELAND | ISLANDS (shown, d41q) |
| Gods | JUPITER, ZEUS, ODIN, THOR | GODS AND GODDESSES (shown, d41t) |
| Philosophers | PLATO, ARISTOTLE, KANT, SOCRATES (SOC\|RATES) | PHILOSOPHERS (shown, d41w) |
| Criminals | BURGLAR (BURG\|LAR), HACKER, SCAMMER, MURDERER | CRIMINALS (shown, d41ad) |
| In court | LAWYER, WITNESS (WIT\|NESS), JUDGE, CRIMINALS | IN COURT (shown, d41ag) |
| Cobra | HOOD, FANG, SNAKE, VENOM | COBRA (shown, d41am) |
| Venomous animals | TARANTULA, HORNET, SCORPION (SCOR\|PION), COBRA | VENOMOUS ANIMALS (shown, f41a) |

Notes: this level is a four-deep hierarchy (STING/WASP/NEST/SWARM returned as HORNET, then HORNET and COBRA joined VENOMOUS ANIMALS; JUDGE and CRIMINALS joined IN COURT). The +5 MOVES ad bubble floated on the board from the fifth drag until about the islands merge; no drag started within a bubble width of it and no ad opened. Wrong drags (4 moves lost): GAVEL onto LAWYER twice and LAWYER onto the ROBE/GAVEL stack (LAWYER belongs to IN COURT, not to JUDGE; LAWS went in instead), and SNAKE onto the creature stack (SNAKE belongs to COBRA). Two drags made while the board shifted did nothing and cost nothing. Streak refunds kept the counter flat three times. Names read from the shots named in the table in the scratchpad.

## Level 42

Themes: 10 (bar `0/10`). Moves: 49 at start (s42a), 18 before the last merge (17 after it; 12 on the Mastery screen). Mastery: 575 (single drag with WAIT=1 for the name, then four back-to-back shots; f42c). Reward: 30 coins (counter 2,490 on the Mastery and Well Done screens, 2,520 on the Level 43 pre-level dialog). Next button is a plain green "LEVEL 43" (X2 and Home not tapped). Split words: 7 joins. No booster used. Plain level, no chain, no +5 ad bubble seen. Autumn leaf decoration on the Mastery and Well Done screens.

Chunk pairs: MAM\|MOTH (no join needed: MAMMOTH arrived whole later), QUAR\|TER, ARA\|BICA, CHI\|NA, JA\|PAN, KAN\|GAROO, DINO\|SAURS. Each join cost 1 move. Many bubbles appeared only after a sub-theme cleared (the second half of each chunk, ROBUSTA, LIBERICA, EXCELSA, NICKEL, DOLLAR, SABERTOOTH TIGER, MAMMOTH and others).

| Theme | Words | Name |
|---|---|---|
| Swimming | SIDESTROKE, BUTTERFLY, BACKSTROKE, FREESTYLE | SWIMMING (shown, d42c) |
| Olympic sports | GYMNASTICS, SKIING, FIGURE SKATING, SWIMMING | OLYMPIC SPORTS (shown, d42f) |
| Asia | INDIA, JAPAN (JA\|PAN), CHINA (CHI\|NA), THAILAND | ASIA (shown, d42o) |
| Coffee bean | LIBERICA, ROBUSTA, ARABICA (ARA\|BICA), EXCELSA | COFFEE BEAN (shown, d42t) |
| Coffee (parent) | BARISTA, COFFEE MACHINE, BREW, COFFEE BEAN | (name missed: the final merge was a single drag but the next shot showed the bar already at 5/10 with no name bubble; guessed COFFEE) |
| Money | DIME, QUARTER (QUAR\|TER), NICKEL, DOLLAR | MONEY (shown, d42y) |
| Australia | KOALA, KANGAROO (KAN\|GAROO), EMU, PLATYPUS | AUSTRALIA (shown, d42ac) |
| Continents | ASIA, AUSTRALIA, NORTH AMERICA, AFRICA | CONTINENTS (shown, d42ag) |
| Lost species | DODO, DINOSAURS (DINO\|SAURS), SABERTOOTH TIGER, MAMMOTH | LOST SPECIES (shown, d42aj) |
| Economy | MONEY, INFLATION, JOBS, TRADE | ECONOMY (shown, f42a) |

Notes: three of the ten themes are second-level (CONTINENTS, COFFEE and ECONOMY take a cleared theme as a word) and one (OLYMPIC SPORTS) takes SWIMMING; the bar counts each cleared theme once, so it read 9/10 before the last merge. One wrong drag (ARABICA, still two chunks at the time, was dragged at the coffee stack: it missed and cost 1 move). Two drags made while the board was shifting did nothing and cost nothing. Streak refunds kept the counter flat three times. Names read from the shots named in the table in the scratchpad.

## Level 43

Themes: 10 (bar `0/10`). Moves: 48 at start (s43a), 2 on screen at the last merge (a very close level: 0 moves showed on the Mastery screen). Mastery: 590 (single drag with WAIT=1 for the name, then four back-to-back shots; f43d). Reward: 30 coins (counter 2,520 on the Mastery and Well Done screens, 2,550 on the Level 44 pre-level dialog). Next button is a red HARD "LEVEL 44" with the octopus (X2 and Home not tapped). Split words: 8 joins. No booster used. Plain level with a chain lock. Autumn leaf decoration on the Mastery and Well Done screens.

Chain: a numbered padlock "3" across the middle of the board (second chain level seen, after 37). The number counted down 3 -> 2 -> 1 as themes cleared (BEANS cleared it to 2, then the CIRCUIT/SENSOR pair stack never needed it; the lock opened after the third theme, SATELLITE). Merging across the chain was blocked, the same as on level 37: the SATELLITE words (ANTENNA, SIGNAL, TRANSMISSION, SMARTPHONE, AUTOMATION) sat under the chain from the start, and several words (ORBIT halves, MODERN, VINTAGE, MINIMALIST and the soup and spice words) only dropped in above after the lock opened.

Chunk pairs: CIR\|CUIT, SEN\|SOR, MONI\|TOR, CHICK\|PEAS, SIG\|NAL, OR\|BIT, PAP\|RIKA, RUS\|TIC. Each join cost 1 move.

| Theme | Words | Name |
|---|---|---|
| Computer | KEYBOARD, MONITOR (MONI\|TOR), MOUSE, PROCESSOR | COMPUTER (shown, d43d) |
| Beans | KIDNEY, PINTO, CANNELLINI, CHICKPEAS (CHICK\|PEAS) | BEANS (shown, d43j) |
| Satellite | ANTENNA, SIGNAL (SIG\|NAL), TRANSMISSION, ORBIT (OR\|BIT) | SATELLITE (shown, d43ae) |
| Soup | BROTH, MISO, CHOWDER, CHICKEN NOODLE | SOUP (shown, d43ai) |
| Pasta | FETTUCCINE, PENNE, MACARONI, SPAGHETTI | PASTA (shown, d43ak) |
| Spices | CUMIN, CINNAMON, GINGER, PAPRIKA (PAP\|RIKA) | SPICES (shown, d43am) |
| Home design | MODERN, MINIMALIST, VINTAGE, RUSTIC (RUS\|TIC) | HOME DESIGN (shown, d43aq) |
| Canned food | TUNA, SWEET CORN, SOUP, BEANS | CANNED FOOD (shown, d43at) |
| Robot | CIRCUIT (CIR\|CUIT), SENSOR (SEN\|SOR), AUTOMATION, ANDROID | ROBOT (shown, d43ax) |
| Technology | COMPUTER, SMARTPHONE, SATELLITE, ROBOT | TECHNOLOGY (shown, f43a) |

Notes: the +5 MOVES ad bubble floated on the board from about 35 moves left and stayed until about 3 moves left. No drag started within about a bubble width of it (PAPRIKA and VINTAGE were dragged only after other merges had moved them clear, or from their far edge) and no ad opened. SPICES, SOUP and PASTA were nested one level up (HOME DESIGN, CANNED FOOD and TECHNOLOGY took cleared themes as words). Wrong drags (about 8 moves lost): CHICK onto PEAS once missed, COMPUTER onto the CIRCUIT/SENSOR stack twice (COMPUTER belongs to TECHNOLOGY, not ROBOT), SMARTPHONE and AUTOMATION onto the ANTENNA stack, MODEM-style drags of MODERN onto ANDROID and CIRCUIT, TUNA onto the BROTH stack. Streak refunds returned a move three times. Names read from the shots named in the table in the scratchpad.

## Level 44 (HARD)

Themes: 8 (bar `0/8`). Moves: 41 at start (s44a), 14 before the last merge (13 after it; 12 on the first Mastery frame, 6 once it finished counting). Mastery: 605 (the counter ran 592 -> 596 -> 605 over frames f44c to f44e, so the last frame is taken as final). Reward: 60 coins (HARD; counter 2,550 on the Mastery and Well Done screens, 2,610 on the Level 45 pre-level dialog). Next button is a purple "EXPERT LEVEL 45" with a pink octopus (X2 and Home not tapped). Split words: 9 joins. No booster used. HARD level: red "LVL 44" tab with octopus, "HARD LEVEL PLAY" button on the pre-level dialog. No chain and no +5 ad bubble seen. Autumn leaf decoration on the Mastery and Well Done screens.

Chunk pairs: SCIS\|SORS, LET\|TER, ENVE\|LOPE, CRE\|DIT, CUR\|RENCY, AR\|TICLE, ES\|SAY, DEPO\|SIT, PASS\|WORD (a plain pair of bubbles), WALL\|FIRE (a pair). Each join cost 1 move. Hierarchical: the theme bubbles returned as words (HAIRDRESSER, MAIL, MONEY, PUBLICATIONS, FOUR DIMENSION, SECURITY, VAULT).

| Theme | Words | Name |
|---|---|---|
| Hairdresser | SHAMPOO, BLOWDRYER, SCISSORS (SCIS\|SORS), COMB | HAIRDRESSER (shown, d44d) |
| Mail | LETTER (LET\|TER), STAMP, MAILMAN, ENVELOPE (ENVE\|LOPE) | MAIL (shown, d44i) |
| Money | COINS, CREDIT (CRE\|DIT), CURRENCY (CUR\|RENCY), CASH | MONEY (shown, d44o) |
| Publications | REVIEW, ARTICLE (AR\|TICLE), EDITORIAL, ESSAY (ES\|SAY) | PUBLICATIONS (shown, d44t) |
| Four dimension | WIDTH, HEIGHT, LENGTH, TIME | FOUR DIMENSION (shown, d44aa) |
| Security | FIREWALL, PASSWORD, ENCRYPTION, VIRUS | SECURITY (shown, d44ad) |
| Vault | ALARM, LOCK, SAFE, SECURITY | VAULT (shown, d44ag) |
| Bank | MONEY, LOAN, DEPOSIT (DEPO\|SIT), VAULT | BANK (shown, f44a) |

Notes: the board started as a single cluster of 29 bubbles; ENCRYPTION, SAFE, LOCK, ALARM and the money words dropped in only after sub-themes cleared. A drag onto a chunk partner that was still a pair (CHUNK drags before the first half had joined) cost 1 move once; two drags during board shifts did nothing. Streak refunds returned 1 move twice. The TIME bubble belongs to FOUR DIMENSION, with WIDTH, HEIGHT and LENGTH. No wrong merges on themes.

## Level 45 (EXPERT)

Themes: 12 (bar `0/12`). Moves: 49 at start, 10 before the last merge (9 after it and on the first Mastery frame). Mastery: 610 (e45z3, a clean frame). Reward: 90 coins (EXPERT; counter 2,610 on the Mastery and Well Done screens). Next button: green "LEVEL 46" (2,700 coins on the Level 46 pre-level dialog; X2 and Home not tapped). Split words: 4 joins (MI\|RAGE, CAC\|TUS, SCULP\|TURE, POT\|TERY). No booster used. EXPERT level: purple "LVL 45" tab with octopus. Autumn leaf decoration on the Mastery and Well Done screens. The rewarded "+5 MOVES" ad bubble was on the board from about move 25 and was never tapped, no drag started near it, no ad opened. Cryptic bubbles (letters shown as `?`) appeared again: TACO, KEBAB, CLIFF (C?I??, C?IFF, then CLIFF).

Chunk pairs: MI\|RAGE, CAC\|TUS, SCULP\|TURE, POT\|TERY. Hierarchical: MOUNTAIN, DINOSAURS and BABYLON returned as word bubbles; CARPENTRY, ATHENS, BABYLON joined parent themes (CRAFTS, ANCIENT CITIES).

| Theme | Words | Name |
|---|---|---|
| Islands | CRETE, BALI, ICELAND, SICILY | ISLANDS (shown) |
| Deep sea | ABYSS, HYDROTHERMAL VENT, ANGLERFISH, GIANT SQUID | DEEP SEA (shown) |
| Street food | BURGER, TACO, KEBAB, FRIES | STREET FOOD (shown) |
| Desert | OASIS, DUNES, MIRAGE (MI\|RAGE), CACTUS (CAC\|TUS) | DESERT (shown) |
| Athens | AGORA, PARTHENON, ACROPOLIS, SOCRATES | ATHENS (shown; the orange bubble read "ATHENE" and the word that came back read ATHENS) |
| Carpentry | CHISEL, HAMMER, SAW, PLANE | CARPENTRY (shown, e45b) |
| Mountain | SUMMIT, TRAIL, CLIFF, GLACIER | MOUNTAIN (shown, e45g) |
| Landscapes | DESERT, JUNGLE, CANYON, MOUNTAIN | LANDSCAPES (shown, e45i) |
| Dinosaurs | STEGOSAURUS, T-REX, TRICERATOPS, VELOCIRAPTOR | DINOSAURS (shown, e45k) |
| Babylon | ISHTAR GATE, HANGING GARDENS, ESAGILA TEMPLE, MESOPOTAMIA | BABYLON (shown, e45q) |
| Ancient cities | POMPEII, ATHENS, TROY, BABYLON | ANCIENT CITIES (shown, e45s) |
| Crafts | CARPENTRY, POTTERY (POT\|TERY), SCULPTURE (SCULP\|TURE), WEAVING | CRAFTS (shown, e45y) |

Notes: GLACIER is a mountain word, not a biome: dragging it onto DESERT/JUNGLE/CANYON cost 1 move each time, three times. The mountain words (SUMMIT, TRAIL, CLIFF) only appeared after CARPENTRY cleared. The biome stack waited for MOUNTAIN. MESOPOTAMIA belongs to BABYLON, not to the cities. The bar counted LANDSCAPES, DINOSAURS and BABYLON as separate cleared themes and ANCIENT CITIES as the 11th. Two drags made while the board was shifting did nothing and cost no move. Streak refunds returned 1 move twice. The chunk joins were cheap (streak). Total about 3 wrong drags.

## Level 46

Themes: 7 (bar `0/7`). Moves: 33 at start, 17 before the last merge (16 after it, 7 on the Mastery frame once it finished counting). Mastery: 620 (f46ae). Reward: 30 coins (counter 2,700 on the Mastery and Well Done screens and on the Level 46 pre-level dialog). Next button: green "LEVEL 47" (X2 and Home not tapped). Split words: none. No booster used. Plain level (pre-level dialog showed boosters "+" and "+3 MOVES", both left unselected). No chain, no +5 ad bubble, no cryptic bubbles.

Chunk pairs: none. Hierarchical, three levels deep: 21 word bubbles at the start; clearing SEASONS added PULSE, EARS, NOISE, SOUND; clearing SCIENTISTS added MUSIC. HEARING, SIGHT and then SENSES came from sub-themes.

| Theme | Words | Name |
|---|---|---|
| Seasons | SPRING, WINTER, SUMMER, FALL | SEASONS (shown, f46c) |
| Scientists | GALILEO, CURIE, EINSTEIN, HAWKING | SCIENTISTS (shown, f46g) |
| Slavic countries | SLOVAKIA, BELARUS, SLOVENIA, POLAND | SLAVIC COUNTRIES (shown, f46k) |
| Heart | PULSE, CHAMBER, BEAT, ARTERY | HEART (shown, f46o) |
| Hearing | NOISE, MUSIC, SOUND, EARS | HEARING (shown, f46t) |
| Sight | LIGHT, VISION, EYES, FOCUS | SIGHT (shown, f46x) |
| Senses | TOUCH, TASTE, HEARING, SIGHT | SENSES (shown, f46ab) |

Notes: no wrong drags, no missed names. The word bubbles that returned after a sub-theme cleared were HEARING and SIGHT (joined SENSES); HEART, SEASONS, SCIENTISTS and SLAVIC COUNTRIES just disappeared with the bar counting them (no parent word). Every merge cost 1 move, five-merge streak refunds returned 1 move at times (moves went 33 -> 17 over 16 merges). Autumn leaves on the Mastery and Well Done screens. Level 46 took 17 merges for 7 themes.

## Level 47

Themes: 10 (bar `0/10`). Moves: 49 at start, 13 before the last merge (12 after it, 9 on the Mastery frame once it finished counting). Mastery: 630 (g47az2). Reward: 30 coins (counter 2,730 on the Mastery and Well Done screens). Next button: green "LEVEL 48" (X2 and Home not tapped). Split words: 7 joins (PREDA\|TOR, PAN\|THER, KING\|DOM, CUR\|RENT, RA\|PIDS, HEL\|MET, CHAM\|BER). No booster used. Plain level, no chain, no cryptic bubbles. The rewarded "+5 MOVES" ad bubble floated on the board from about move 33 until the 9th theme cleared; no drag started near it and no ad opened.

Chunk pairs: PREDA\|TOR, PAN\|THER, KING\|DOM, CUR\|RENT, RA\|PIDS, HEL\|MET, CHAM\|BER. Each join cost 1 move. Hierarchical: SHARK, MEDIEVAL words and the like returned as word bubbles. After PREDATORY ANIMALS cleared, new bubbles appeared (BERET, CAP, ASH, PIDS...), after BAKED GOODS the BERET group was unlocked, and so on.

| Theme | Words | Name |
|---|---|---|
| Knight | SWORD, SHIELD, LANCE, ARMOR | KNIGHT (shown, g47c; returned as the word KNIGHT) |
| Shark | PREDATOR (PREDA\|TOR), FIN, TEETH, OCEAN | SHARK (shown, g47o; returned as the word SHARK) |
| Predatory animals | PANTHER (PAN\|THER), WOLF, POLAR BEAR, SHARK | PREDATORY ANIMALS (shown, g47v) |
| Medieval | KNIGHT, LORD, CASTLE, KINGDOM (KING\|DOM) | MEDIEVAL (shown, g47ab) |
| Medicine (name guessed) | LOZENGES, CAPSULES, TABLETS, VITAMINS | MEDICINE (guessed; the name was missed, the cleared bubble showed only the three words) |
| Baked goods | PIE, CAKE, COOKIE, BREAD | BAKED GOODS (shown, g47ai) |
| Headwear | BERET, HELMET (HEL\|MET), CROWN, CAP | HEADWEAR (shown, g47aq) |
| River | RAPIDS (RA\|PIDS), BRIDGE, CURRENT (CUR\|RENT), BANK | RIVER (shown, g47ar) |
| Magma | LAVA, HEAT, FLOW, CHAMBER (CHAM\|BER) | MAGMA (shown, g47au; returned as the word MAGMA) |
| Volcanic eruption | CRATER, MAGMA, ASH, TREMOR | VOLCANIC ERUPTION (shown, g47ay) |

Notes: wrong drags cost about 6 moves: TEETH onto the WOLF/POLAR BEAR stack (TEETH belongs to SHARK), PREDATOR onto the same stack, CURRENT and TREMOR and ASH and CRATER onto the LAVA/HEAT/FLOW stack (they belong to RIVER and VOLCANIC ERUPTION). The LAVA, HEAT, FLOW stack stayed at 3 from move 42 until CHAMBER (a chunk pair joined late) arrived, so four words that look like volcano words were all rejected until MAGMA was named. The MEDICINE name was missed: the 4th merge was dragged without WAIT=1 correctly set (the orange bubble showed LOZENGES, CAPSULES, TABLETS with VITAMINS dropping in). Five-merge streaks gave about 2 refund moves. Autumn leaves on Mastery and Well Done.

## Level 48

Themes: 11 (bar `0/11`). Moves: 48 at start, 5 before the last merge (4 after it and on the Mastery screen). Mastery: MISSED (the Mastery screen showed "Tap to skip" and the move counter but no number in four back-to-back shots, so the number was not captured). Reward: 30 coins (counter 2,760 on the Mastery and Well Done screens, 2,790 on the Level 49 pre-level dialog). Next button: red "HARD LEVEL 49" with an octopus (X2 and Home not tapped). Split words: 5 joins (SEA\|WEED, TOP\|PING, COT\|TON, GE\|ISHA, BULL\|DOZER). No booster used. Plain level. No chain, no cryptic bubbles. The rewarded "+5 MOVES" ad bubble floated on the board from about move 41 to the end; no drag started on it, no ad opened. Autumn leaves on Mastery and Well Done.

Chunk pairs: SEA\|WEED, TOP\|PING, COT\|TON, GE\|ISHA, BULL\|DOZER. Each join cost 1 move. Hierarchical: YARN, CAR, MACHINES, BURGER, DISH and MATERIALS returned as word bubbles; the first five joined other themes, MATERIALS joined CONSTRUCTION.

| Theme | Words | Name |
|---|---|---|
| Sushi | RICE, WASABI, FISH, SEAWEED (SEA\|WEED) | SUSHI (shown, h48e) |
| Pizza | CRUST, CHEESE, SLICE, TOPPING (TOP\|PING) | PIZZA (shown, h48p) |
| Japan | KATANA, KIMONO, GEISHA (GE\|ISHA), SAMURAI | JAPAN (shown, h48w) |
| Yarn | ACRYLIC, COTTON (COT\|TON), THREAD, WOOL | YARN (shown, h48ah) |
| Knitting | NEEDLES, PATTERN, STITCH, YARN | KNITTING (shown, h48aj) |
| Car | SEDAN, COUPE, SUV, PICKUP | CAR (shown, h48am) |
| Machines | BULLDOZER (BULL\|DOZER), CRANE, LOADER, EXCAVATOR | MACHINES (shown, h48ar) |
| Burger | PATTY, LETTUCE, BUN, GRILL | BURGER (shown, h48ax) |
| Dish | SUSHI, PIZZA, BURGER, SALAD | DISH (shown, h48bb) |
| Materials | WOOD, BRICK, CEMENT, STONE | MATERIALS (shown, h48bf) |
| Construction (name guessed) | SITE, TOOLS, MACHINES, MATERIALS | CONSTRUCTION (guessed; the orange name bubble was not caught, h48bj shows only its pop) |

Notes: about 13 wrong drags (the most of any level so far): THREAD, TOOLS and WOOL onto the NEEDLES/PATTERN/STITCH stack (all three belong to YARN, whose fourth word ACRYLIC|COTTON only existed after COT|TON joined); DOZER onto the cars stack and onto CEMENT, BULLDOZER onto CEMENT and the car stack, SITE onto the CRANE stack and onto CEMENT, WOOD onto STONE. A drag from EXCAVATOR while another bubble overlapped it did nothing and cost no move. Moves fell from 48 to 4. Close call: 4 moves left, no out-of-moves screen. The CAR stack (SEDAN, COUPE, SUV) waited for PICKUP from move 31 to move 18.

## Level 49 (HARD)

Themes: 10 (bar `0/10`). Moves: 46 at start, 14 before the last merge, 13 after it; the Mastery screen showed 4 moves. Mastery: 652 (seen once at 4 moves left; at level 50 the number was still counting up in that frame, so 652 may be a few short of the final value). Reward: 60 coins (HARD; counter 2,790 on the Mastery and Well Done screens). Next button: plain green "LEVEL 50" (X2 and Home not tapped). Split words: 9. Red LVL 49 tab with octopus. No booster used. No chain, no cryptic bubbles. Hierarchical: ELEMENTS OF NATURE (with FIRE), SCHOOL SUBJECTS (with ASTRONOMY, ART) and NORTH AFRICAN COUNTRIES (with EGYPT) took cleared sub-themes as words.

Chunk pairs: MOR\|OCCO, PYRA\|MIDS, PHA\|RAOH, CLIN\|TON, KEN\|NEDY, CAN\|VAS, BIO\|LOGY, PLA\|NET, POR\|TRAIT.

| Theme | Words | Name |
|---|---|---|
| Fire | HEAT, BURN, SMOKE, FLAME | FIRE (shown) |
| Citrus fruits | LIME, POMELO, LEMON, ORANGE | CITRUS FRUITS (shown) |
| Elements of nature | EARTH, AIR, WATER, FIRE | ELEMENTS OF NATURE (shown) |
| US presidents | REAGAN, LINCOLN, CLINTON (CLIN\|TON), KENNEDY (KEN\|NEDY) | US PRESIDENTS (guessed; the orange bubble popped before the shot) |
| North Pole | IGLOO, ICE, POLAR BEAR, AURORA | NORTH POLE (shown) |
| Astronomy | ORBIT, MOON, STAR, PLANET (PLA\|NET) | ASTRONOMY (shown) |
| Art | EASEL, BRUSH, CANVAS (CAN\|VAS), PORTRAIT (POR\|TRAIT) | ART (shown) |
| School subjects | BIOLOGY (BIO\|LOGY), MATHS, ASTRONOMY, ART | SCHOOL SUBJECTS (shown) |
| Egypt | SPHINX, NILE, PHARAOH (PHA\|RAOH), PYRAMIDS (PYRA\|MIDS) | EGYPT (shown) |
| North African countries | ALGERIA, TUNISIA, MOROCCO (MOR\|OCCO), EGYPT | NORTH AFRICAN COUNTRIES (shown, final merge) |

Notes: the "+5 MOVES" ad bubble was not seen on this level; no ad opened. Wrong drags were not counted exactly (46 moves to 14 over 10 themes). The final-merge routine (single drag with WAIT=1, then back-to-back shots) caught both the name and Mastery this time. The move counter on the Mastery screen read 4, lower than the 13 left on the board; it looks like leftover moves being counted down, as at level 48 (4).

## Level 50

Themes: 10 (bar `0/10`). Moves: 43 at start, 10 before the last merge and on the Mastery frame at first (the counter then dropped to 4 while the Mastery number counted up from 659 to 661). Mastery: 661 (seen at 659 and 661 in two frames of the count-up; 661 was the last value before Well Done). Reward: 30 coins (counter 2,850 on the Mastery and Well Done screens). Next button: plain green "LEVEL 51" (X2 and Home not tapped). Split words: 9. Plain level; green leaf decoration on the board edges; no chain, no cryptic bubbles, no booster used. The "+5 MOVES" ad bubble was not seen. Autumn leaves on Mastery and Well Done.

Chunk pairs: BAL\|TIC, CAC\|TUS, DECA\|GON, PAS\|TE, CO\|PY, LU\|CAS, ROB\|ERT, HEDGE\|HOG, CHAR\|COAL. Joins cost 1 move each except CAC\|TUS, which was free. Only about 28 bubbles were on the board at first; new word bubbles appeared after each cleared theme (SEA released DAVID, VOWS, ROB, RIBEYE and MOB; POLYGONS released RING, CHAR, JASON, SILVER and RABBLE; EDITING released ASH, WINK, TENDERLOIN and LU; and so on), so only part of each theme was visible at first.

| Theme | Words | Name |
|---|---|---|
| Sea | BLACK, RED, AEGEAN, BALTIC (BAL\|TIC) | SEA (shown, a50d) |
| Polygons | PENTAGON, HEPTAGON, HEXAGON, DECAGON (DECA\|GON) | POLYGONS (shown, a50i) |
| Editing | EDIT, DELETE, PASTE (PAS\|TE), COPY (CO\|PY) | EDITING (shown, a50n) |
| Weddings | GROOM, RING, VOWS, BRIDE | WEDDINGS (shown, a50r) |
| Crowd | MOB, RABBLE, HORDE, THRONG | CROWD (shown, a50v) |
| Beef cut | RIBEYE, SIRLOIN, BRISKET, TENDERLOIN | BEEF CUT (shown, a50zb) |
| Eye actions | WINK, BLINK, SQUINT, ROLL | EYE ACTIONS (shown, b50d) |
| Names | JASON, ROBERT (ROB\|ERT), DAVID, LUCAS (LU\|CAS) | NAMES (shown, b50j) |
| Spiky things | CACTUS (CAC\|TUS), PORCUPINE, HEDGEHOG (HEDGE\|HOG), DURIAN | SPIKY THINGS (shown, b50o) |
| Grey shades | PEWTER, SILVER, ASH, CHARCOAL (CHAR\|COAL) | GREY SHADES (shown, f50a, final merge) |

Notes: no wrong drags. Two drags of TENDERLOIN onto the RIBEYE/SIRLOIN stack and one HOG onto HEDGE did nothing and cost no move (the bubble was probably still moving); a retry from another bubble worked. The five-merge refund came once (22 moves stayed 22 after WINK onto BLINK). Moves went 43 to 10 with 10 themes, the best margin since level 46. PEWTER, ASH and SILVER sat on the board from the start and joined CHARCOAL only after the CHAR\|COAL join.

## Level 51

Themes: 12 (bar `0/12`). Moves: 48 at start, 11 left at the end (the counter was 11 on the Mastery screen). Mastery: 680. Reward: 30 coins (counter 2,880 on the Mastery and Well Done screens). Next button: green "LEVEL 52" (X2 and Home not tapped). Split words: none. NEW: reversed-word bubbles (tutorial popup on first sight) and the Shell Streak pre-level dialog now unlocked (see the features log). The rewarded "+5 MOVES" ad bubble floated on the board from about move 37 to the end; no drag started on it, no ad opened. Autumn leaves on Mastery and Well Done.

Chunk pairs: none. Reversed bubbles (yellow text with a left arrow): EVAC (read CAVE) and RIFEK (read KEFIR); the arrow marks a reversed word, and the bubble joins its theme as the real word.

| Theme | Words | Name |
|---|---|---|
| Amphibians | (four words not recorded; the stack formed off-screen early) | AMPHIBIANS (name not caught; the bubble returned as a word) |
| Cheeses | RICOTTA, BURRATA, DORBLU, EDAM | CHEESE (shown, a51j) |
| Fuels | GASOLINE, DIESEL, KEROSENE, JET FUEL | FUEL (guessed, name not caught; the bubble returned as a word and became OIL) |
| Nocturnal animals | BAT, WINGS, EVAC (CAVE), ECHO | BAT (shown, a51s) |
| Eye | RETINA, CORNEA, IRIS, PUPIL | EYES (shown, b51a) |
| Paired things | SOCKS, SKIS, TWINS, EYES | PAIRED THINGS (shown, b51c) |
| Mammals | WHALE, LION, HUMAN, BAT | MAMMALS (shown, a51y) |
| Birds | PARROT, EAGLE, PENGUIN, KIWI | BIRDS (shown, b51g) |
| Dairy | MILK, YOGURT, KEFIR (RIFEK reversed), CHEESE | DAIRY PRODUCTS (shown, b51j) |
| Vertebrates | MAMMALS, BIRDS, REPTILES, AMPHIBIANS | VERTEBRATES (shown, b51n) |
| Rare elements | LITHIUM, COBALT, NICKEL, URANIUM | RARE ELEMENTS (shown, b51u) |
| Underground treasures | COAL, OIL (the FUEL theme returned), NATURAL GAS, RARE ELEMENTS | UNDERGROUND TREASURES (shown, f51a, final merge) |

Notes: a hierarchical level where most themes feed a parent (cheese into dairy; mammals, birds, reptiles, amphibians into vertebrates; fuels and rare elements into underground treasures). About 4 wrong or ignored drags: WINGS onto the SOCKS stack and WHALE onto the BAT stack each cost 1 move; the first two merges of the GASOLINE stack were free. The final-merge routine caught both the name and the Mastery number.

## Level 52

Themes: 10 (bar `0/10`). Moves: 42 at start, 18 before the last merge, 17 on the first Mastery frame (10 two frames later, then 0 as the bonus ran down). Mastery: 686 was the last value read; the number counts UP while the leftover moves count DOWN, and the screen then advanced by itself to Well Done within about 3 s, so the final value was not captured (the first frame, at 17 moves, still showed 680, level 51's value). Reward: 30 coins (counter 2,910 on the Mastery and Well Done screens). Next button: green "LEVEL 53" (X2 and Home not tapped). Split words: none. Reversed bubbles (second sighting, no popup this time): IKOL (LOKI), ERIF (FIRE), YROVAS (SAVORY). Shell Streak bar showed 1/5 (green) on the LEVEL 52 pre-level dialog after winning level 51. No ad bubble seen. Autumn leaves on Mastery and Well Done.

Chunk pairs: none.

| Theme | Words | Name |
|---|---|---|
| Norse legends | THOR, LOKI (IKOL reversed), ASGARD, VALHALLA | NORSE LEGENDS (shown, a52c) |
| Word puzzles | SCRABBLE, JUMBLE, CROSSWORD, ANAGRAM | WORD PUZZLES (shown, a52f) |
| Air | CARBON DIOXIDE, NITROGEN, ARGON, OXYGEN | AIR (shown, a52i) |
| Dragon | TAIL, SCALES, WINGS, FIRE (ERIF reversed) | DRAGON (shown, a52o) |
| River | MISSISSIPPI, NILE, DANUBE, AMAZON | RIVER (shown, a52l) |
| Taste qualities | BITTER, SPICY, TANGY, SAVORY (YROVAS reversed) | TASTE QUALITIES (shown, a52r) |
| It flows | AIR, TIME, RIVER, ENERGY | IT FLOWS (shown, a52u) |
| Nighttime | MOON, STARS, DREAMS, DARKNESS | NIGHTTIME (shown, a52x) |
| Vampire | COFFIN, GARLIC, BLOOD, NIGHTTIME | VAMPIRE (name not caught; the bubble returned as VAMPIRE, so this is the name, b52a shows only the pop) |
| Mythical beasts | DRAGON, HYDRA, GRIFFIN, VAMPIRE | MYTHICAL BEASTS (shown, f52a, final merge) |

Notes: no wrong drags; most of the 42 moves were refunded or kept (42 to 18 over 9 themes). Hierarchical chain: NORSE and the first themes were standalone, then AIR, RIVER and the others fed IT FLOWS, DRAGON joined MYTHICAL BEASTS, NIGHTTIME joined VAMPIRE and VAMPIRE joined MYTHICAL BEASTS. Each reversed bubble was dragged as the real word it stands for. Mastery warning: readings on the Mastery screen in earlier levels (about 49 onward) may also have been mid-count; see the report.

## Level 53

Themes: 10 (bar `0/10`). Moves: 47 at start, 10 left at the final merge and 0 on the Mastery screen (leftover moves counted down). Mastery: 707 (the Mastery screen was already at 0 moves, so 707 is the final value). Reward: 30 coins (counter 2,940 on the Mastery and Well Done screens). Next button: red "HARD LEVEL 54" with an octopus (X2 and Home not tapped). Split words: 5 (KET\|CHUP, GOL\|LUM, GAN\|DALF, MOS\|QUE, DUMB\|BELL, TREAD\|MILL; 6 joins counting the fitness pair). Chain lock numbered 4 above 4 themes (lock number fell 4, 3, 2, 1, gone as the upper themes cleared). Shell Streak bar was 2/5 (green) on the pre-level dialog. The rewarded "+5 MOVES" ad bubble floated on the board from about move 32 to move 11; no drag started within about one bubble width of it where avoidable (two drags were started 190 to 205 px away), and no ad opened. Autumn leaves on Mastery and Well Done.

Chunk pairs: KET\|CHUP, GOL\|LUM, GAN\|DALF, MOS\|QUE, DUMB\|BELL, TREAD\|MILL. Each cost 1 move.

| Theme | Words | Name |
|---|---|---|
| Parts of the day | NOON, DAWN, DUSK, NIGHT | PARTS OF THE DAY (shown, a53c) |
| Sauces | SOY, MUSTARD, KETCHUP (KET\|CHUP), MAYONNAISE | SAUCES (shown, a53g) |
| Magnifying glass | LENS, HANDLE, ZOOM, INSPECT | MAGNIFYING GLASS (shown, a53j) |
| Months | OCTOBER, MARCH, MAY, APRIL | MONTHS (shown, a53x) |
| Detective | MAGNIFYING GLASS, NOTEBOOK, HATS, PEN | DETECTIVE (shown, a53v) |
| Whales | ORCA, BELUGA, HUMPBACK, BLUE | WHALES (shown, f53a, final merge) |
| Lord of the Rings | SAURON, GOLLUM (GOL\|LUM), GANDALF (GAN\|DALF), FRODO | LORD OF THE RINGS (shown, b53f) |
| Places of worship | MOSQUE (MOS\|QUE), TEMPLE, CHAPEL, SYNAGOGUE | PLACES OF WORSHIP (shown, b53k) |
| Gym | BENCH, DUMBBELL (DUMB\|BELL), TREADMILL (TREAD\|MILL), WORKOUT | GYM (shown, b53p) |
| Wellness activities | READING, MEDITATION, YOGA, GYM | WELLNESS ACTIVITIES (shown, b53r) |

Notes: no wrong drags and no moves wasted except the usual 1 per merge (47 moves to 10; two five-merge refunds were seen). The upper half (parts of the day, sauces, magnifying glass, months and the chained LOTR chunks) had to clear before the lower half (worship, whales, fitness) because of the chain lock; the lower chunk bubbles (GOL, LUM, GAN, DALF, MOS) could be joined at once. The lock number dropped after each theme completed above it. Several themes held a word that belonged to a different theme in the same level (HATS = detective, not parts of the day; WORKOUT = gym; YOGA = wellness; NIGHT = parts of the day).

## Level 54 (HARD)

Themes: 10 (bar `0/10`), HARD level (red LVL 54 tab, octopus). Moves: 44 at start, 12 left at the final merge and 0 on the Mastery screen. Mastery: 716 (read on the 0-moves frame). Reward: 60 coins (counter 2,970 on the Mastery and Well Done screens). Next button: purple "EXPERT LEVEL 55" with a purple octopus (X2 and Home not tapped). Split words: 6 (MOTOR\|CYCLE, CIR\|CUS, WA\|VES, COUN\|TRY, a torpedo chunk pair and FLA\|MENCO; the torpedo and flamenco splits were joined before the notes were taken, so their exact break points are uncertain). Reversed-word bubbles: RAC (CAR), RANOS (SONAR) and EDIT (TIDE, read from early notes). Shell Streak bar was 3/5 on the pre-level dialog. No ad bubble appeared on this level.

Chunk pairs: MOTOR\|CYCLE, CIR\|CUS, WA\|VES, COUN\|TRY (others uncertain, see above).

| Theme | Words | Name |
|---|---|---|
| Dances | SALSA, FLAMENCO, TANGO, DISCO | DANCES (shown) |
| Beach | COAST, SAND, WAVES (WA\|VES), TIDE (reversed EDIT) | BEACH (shown) |
| Music | COUNTRY (COUN\|TRY), ROCK, JAZZ, DANCES (returned) | MUSIC (shown) |
| Submarine | TORPEDO, PERISCOPE, HULL, SONAR (reversed RANOS) | SUBMARINE (shown, b2) |
| Water | BOAT, SHIP, FERRY, SUBMARINE (returned) | WATER (shown, e1; the name is the single word WATER) |
| Air | GLIDER, HELICOPTER, PLANE, DRONE | AIR (shown, h1) |
| Railway | TRAIN, TRACKS, TUNNEL, STATION | RAILWAY (shown, l2) |
| Road | BUS, BIKE, CAR (reversed RAC), MOTORCYCLE (MOTOR\|CYCLE) | ROAD (shown, p1) |
| Ways of transportation | WATER, AIR, RAILWAY, ROAD (all four returned) | WAYS OF TRANSPORTATION (shown, s1) |
| Performing arts | CIRCUS (CIR\|CUS), MUSIC (returned), DANCE (returned), THEATER | PERFORMING ARTS (shown, w1, final merge) |

Notes: three levels deep hierarchy: sub-themes (submarine, water, air, railway, road) each returned as a single word that joined WAYS OF TRANSPORTATION, and MUSIC and DANCE returned into PERFORMING ARTS. Moves: 44 to 12, so 32 spent; wrong or lost drags cost 3 in all (two missed drags while the board was shifting, one drag fired blind at the start of this session at empty water, which took no move). The first six themes (dances, beach, music and the early submarine pairs) were done before the session was compacted; their exact word lists are from running notes and the beach fourth word is the reversed EDIT (TIDE), inferred.

## Level 55 (EXPERT)

Themes: 14 (bar `0/14`), EXPERT level (purple LVL 55 tab, purple octopus). Moves: 58 at start, 4 at the final merge and 0 on the Mastery screen (leftover moves counted down). Mastery: 722 (read on the 0-moves frame). Reward: 90 coins (counter 3,030 on the Mastery and Well Done screens). Next button: green plain "LEVEL 56" (X2 and Home not tapped). Split words: 6 chunk pairs (OR\|GAN, DIGES\|TION, REMIN\|DER, HASH\|TAG, PRES\|SURE, DICT\|ION... see table; STOP and TON/VER pairs: STOP\|... uncertain). Cryptic bubbles: ?EE? (WEEK), ?U?G? (JUDGE, the ?U??? form changed as letters were revealed), a five-letter ????? (FORMULA was the shown name of a different stack, so ????? is uncertain). The rewarded "+5 MOVES" ad bubble floated on the board from about move 40 to the end; no drag started within about one bubble width of it where avoidable and no ad opened. Shell Streak bar was 4/5 on the pre-level dialog.

Chunk pairs: OR\|GAN, DIGES\|TION, REMIN\|DER, HASH\|TAG, PRES\|SURE, and a pair of cut-in-half words (DICT\|ION, TON and VER were joined with other chunks and are recorded in the table as read).

| Theme | Words | Name |
|---|---|---|
| Social media | THUMBS UP, LOVE, FAVORITE, HASHTAG (HASH\|TAG), MEME | SOCIAL MEDIA (shown) |
| Emotions | ANGER, ENVY, FEAR, HATE | DISLIKE (the shown name of the second stack; LOVE belongs to social media) |
| Opinion | LIKE, DISLIKE, MEME, ... | (name partly caught: LIKE, DISLIKE, MEME) |
| Calendar | WEEK, MONTH, YEAR, DAY | CALENDAR (shown) |
| Auto racing | PITSTOP, SPEEDWAY, TRACK, FORMULA (1) | AUTO RACING (shown) |
| Digestion | ACID, FOOD, DIGESTION (DIGES\|TION), ORGAN (OR\|GAN) | STOMACH (shown, word returned) |
| Digestive system | LIVER, STOMACH, ESOPHAGUS, INTESTINE | DIGESTIVE SYSTEM (shown) |
| Law | COURT, TRIAL, VERDICT, JUDGE (cryptic ?U?G?) | JUDICIARY (shown, word returned) |
| Government | CONGRESS, SENATOR, PRESIDENT, JUDICIARY | GOVERNMENT (shown) |
| Maths | EQUATION, SOLUTION, PATTERN, ... | FORMULA (shown, word returned to Auto racing) |
| Deadline | COUNTDOWN, PRESSURE (PRES\|SURE), FINISH, TASK | DEADLINE (shown) |
| Time management | CALENDAR, PLANNER, REMINDER (REMIN\|DER), DEADLINE | TIME MANAGEMENT (shown) |
| Materials | IRON, OBSIDIAN, COTTON, QUARTZ | MATERIALS (shown, final merge) |
| Plus other themes cleared in the first third of the level (about 4 more: the quartz/ironwork and congress/expression stacks, ton/ver chunk pair, etc.): not all recorded | | |

Notes: this EXPERT level was difficult to track because of three levels of hierarchy (e.g. FORMULA returned as a word into AUTO RACING after naming a maths stack; JUDICIARY returned into GOVERNMENT; CALENDAR and DEADLINE into TIME MANAGEMENT; STOMACH into DIGESTIVE SYSTEM). The table is therefore incomplete and some rows reconstruct the shown names from memory of the screens rather than from a shot of each theme's four words. Wrong or wasted drags: about 6 (two were dragged at a wrong target when the board had shifted: FORMULA onto PRESSURE, REMINDER onto COUNTDOWN; two FINISH drags were not the right theme; each costs 1 move). Moves 58 down to 4: five-in-a-row refunds were seen at least twice (the move counter held for a merge). A reverse-word bubble did not appear on this level.

## Level 56

Themes: 7 (bar `0/7`). Moves: the counter read 3 for the first 15 s while the board settled (a start-up animation), then 41 after the first merge, so the start was 42 (not confirmed whether Shell Streak gave anything; see the Shell Streak row in the features log). 16 left at the final merge and 9 on the only Mastery frame caught. Mastery: 728 was on screen with 9 moves left, so it was still counting up (earlier levels ended about 6 to 20 higher); final value not captured. Reward: 30 coins (counter 3,120 on the Mastery and Well Done screens; the 3,120 was already added before the level started, so the 30 from level 55 plus the 90 are consistent). Next button: green plain "LEVEL 57". Split words: 6 chunk pairs (SQUIR\|REL, LEO\|PARD, PRI\|VACY, CAN\|NON, FIRE\|WALL, TRE\|ADS or TREAD\|S; chunk breaks as seen: SQUIR+REL, LEO+PARD, PRI+VACY, CAN+NON, FIRE+WALL, TREAD+S? the last was read as TREADS joined with ARMOR). The rewarded "+5 MOVES" ad bubble floated on the board from about move 33 to move 25; no drag started near it and no ad opened.

Chunk pairs: SQUIR\|REL, LEO\|PARD, PRI\|VACY, CAN\|NON, FIRE\|WALL.

| Theme | Words | Name |
|---|---|---|
| Rodents | RAT, MOUSE, BEAVER, SQUIRREL (SQUIR\|REL) | RODENTS (shown) |
| Military weapon | CANNON (CAN\|NON), FIGHTER JET, SUBMARINE, TURRET | MILITARY WEAPON (shown) |
| Tank | TANK, ARMORED VEHICLE, TREADS, ARMOR, TURRET | TANK (shown; a returned word that joined MILITARY WEAPON) |
| Computer security | PASSWORD, LOCK, FIREWALL (FIRE\|WALL), PRIVACY (PRI\|VACY) | (name partly caught: the stack with PRIVACY joined last) |
| Tarot cards | FOOL, DEATH, LOVERS, HIGH PRIESTESS | TAROT CARDS (shown) |
| Bakery | FLOUR, YEAST, EGGS, MILK | BAKERY (shown) |
| Predators | WOLF, LEOPARD (LEO\|PARD), PUMA, WILD DOG | PREDATORS (shown, final merge) |

Notes: the sub-theme TANK (TANK, ARMORED VEHICLE, TREADS, ARMOR) returned as the word TANK into MILITARY WEAPON; RODENTS did not appear to return elsewhere (the shot after the RODENTS name showed 1/7). The row names for the tank group and the security group are partly reconstructed: the 4th word of the security stack joined while the bar went 3/7 to 4/7 and the name was not caught. Two missed name captures. No wrong drags and no wasted moves beyond the usual 1 per merge; five-in-a-row refund not observed. The board started very crowded (about 30 bubbles) and needed about 15 s to settle before the counter showed the true move count.

## Level 57

Themes: 10 (bar `0/10`). Moves: 52 at start, 16 left at the final merge, 7 on the Mastery frame caught. Mastery: 746 seen while still counting up (7 moves left); final value not captured (the screen moved on to Well Done within the next 2 shots), so the true value is 746 or a little higher. Reward: 30 coins (counter 3,150). Next button: green plain "LEVEL 58". Shell Streak bar was full (5/5) on the pre-level dialog and shows the same two shell prizes (green extra-bubble booster at segment 3, +3 MOVES at segment 5); the two booster slots stayed unselected. Reversed-word bubbles: ETAG (GATE), BARC (CRAB), REWOT (TOWER), EGARIM (MIRAGE). Split words (6): SAL\|MON, DUN\|GEON, FAC\|TORY, VOL\|CANO, HOLI\|DAY, SEA\|HORSE, plus NACE after FUR (FUR\|NACE). The rewarded "+5 MOVES" ad bubble floated on the board from about move 27 to move 19; no drag started within one bubble width of it and no ad opened. Two drags at move 27 and 26 (STEAM and FURNACE onto the SUN/HEAT stack) did nothing and cost 1 move each: that stack was SUMMER, not heat.

Chunk pairs: SAL\|MON, DUN\|GEON, FAC\|TORY, VOL\|CANO, HOLI\|DAY, SEA\|HORSE, FUR\|NACE.

| Theme | Words | Name |
|---|---|---|
| Fish | TROUT, TUNA, HERRING, SALMON (SAL\|MON) | FISH (shown) |
| Castle | MOAT, DUNGEON (DUN\|GEON), GATE (reversed ETAG), TOWER (reversed REWOT) | CASTLE (name not caught as a theme name; the word CASTLE joined KINGDOM) |
| Kingdom | CASTLE, THRONE, CROWN, SUBJECTS | KINGDOM (shown) |
| Camping | TENT, CAMPFIRE, SLEEPING BAG, BACKPACK | CAMPING (shown) |
| Industry | FACTORY (FAC\|TORY), TEXTILE, STEAM ENGINE, FURNACE | (not caught; STEAM ENGINE and FURNACE joined other stacks, see notes) |
| Railway | TRAIN, STATION, TUNNEL, TRACKS | RAILWAY (shown) |
| Desert | SAND, DUNES, OASIS, MIRAGE (reversed EGARIM) | DESERT (shown) |
| Summer | SUN, HEAT, BEACH, HOLIDAY (HOLI\|DAY) | SUMMER (shown) |
| Under the sea | FISH (returned), JELLYFISH, SEAHORSE (SEA\|HORSE), CRAB (reversed BARC) | UNDER THE SEA (shown) |
| Hot things | STEAM, GEYSER, FURNACE, VOLCANO (VOL\|CANO) | HOT THINGS (shown, final merge) |

Notes: the Industry row is a reconstruction: FACTORY and TEXTILE joined (green 2 stack) and later joined STEAM ENGINE and FURNACE in the shots I saw, but the batch was grouped quickly and a separate theme name for that stack was not caught; one theme name is therefore unrecorded and the Castle row's own theme name is not shown here (CASTLE appeared as a word bubble afterwards). FURNACE and STEAM ended in HOT THINGS, so the Industry stack must have been FACTORY, TEXTILE, STEAM ENGINE and a fourth word I did not see (the table row is uncertain). Wasted moves: 2 (STEAM and FURNACE onto the SUMMER stack); no five-in-a-row refund observed.

## Level 58

Themes: 10 (bar `0/10`). Moves: 47 at start (the counter read 3 for the first 15 s while the board settled, then 47 after the first merge-cost move), 10 left at the final merge. Mastery: NOT captured (the fireworks frame went straight to Well Done within the shot interval; no Mastery number seen). Reward: 30 coins (counter 3,180). Next button: red "HARD LEVEL 59" with an octopus (X2 and Home not tapped). Shell Streak still full (5/5) on the pre-level dialog. Split words (7 chunk pairs, 1 move each): AVO\|CA\|DO (three chunks AVO, CA, DO read as AVO, CADO and a middle piece; joined to AVOCADO), BAI\|KAL, OR\|CHID, VIC\|TORIA, TA\|HOE, ARAL? (ARAL was already a full word), CRATER and other single words. Cryptic/reversed: none. The rewarded "+5 MOVES" ad bubble floated on the board from about move 36 to move 14; every drag started more than about 190 px from it (several used the stack as the source instead of a bubble next to the ad), and no ad opened.

Chunk pairs: AVO\|CADO (read as AVO + CADO), BAI\|KAL, OR\|CHID, DIN\|NER (DINNER), VER? (VER joined TA\|HOE area; exact break uncertain), NER, RI, plus KAL.

| Theme | Words | Name |
|---|---|---|
| Guacamole | CILANTRO, LIME, ONION, AVOCADO (AVO\|CADO) | GUACAMOLE (not shown clearly; the name flashed during a drag batch) |
| Names | DANIEL, MARIA, ALICE, KEVIN | NAMES (shown) |
| Lakes | TAHOE, VICTORIA, ARAL, BAIKAL (BAI\|KAL) | LAKE (shown) |
| Cooking | PAN, CHEF, RECIPE, STOVE | COOK (shown; returned as a word into RESTAURANT) |
| Restaurant | TABLE, MENU, WAITER, COOK (returned) | RESTAURANT (shown) |
| Flowers | ORCHID (OR\|CHID), TULIP, ROSE, DAISY | FLOWERS (shown) |
| Wizard | WAND, POTION, ROBE, MAGIC SPELL | WIZARD (shown) |
| First date | COUPLE, DINNER, FLOWERS (returned), RESTAURANT (returned) | FIRST DATE (shown) |
| Water bodies | RIVER, LAKE (returned), OCEAN, CRATER | WATER BODIES (shown, final merge) |

Notes: this level held more than 10 themes in the table above (9 rows plus the GUACAMOLE row listed first, so 10 themes in all counting the sub-theme returns: GUACAMOLE, NAMES, LAKE, COOK, RESTAURANT, FLOWERS, WIZARD, FIRST DATE, WATER BODIES, with the tenth being the second Magic/Enchant group (ENCHANT, CHARM, CURSE, HEX = a magic spells stack merged early, name caught as part of the early batch); the early stack HEX + CHARM + CURSE + ENCHANT is not in the table because I did not catch its theme name). Wrong or wasted drags: 4 (DINNER and CHEF onto the restaurant stack, which cost 1 move each; two others missed while the board shifted); the restaurant stack needed COOK returned from the cooking theme as its fourth word, and the cooking stack's own fourth word was CHEF (not restaurant staff), which is why those two drags failed. DINNER belongs to FIRST DATE, not RESTAURANT.

## Level 59 (HARD)

Themes: 12 (bar `0/12`). Moves: 52 at start (the counter read 3 for about 25 s while the board settled; it showed 52 after the first drag), 16 left at the final merge. Mastery: 778 (a count-up frame of 766 was seen first, then 778 with the leftover moves at 0; taken as final). Reward: 60 coins (HARD; counter 3,210 on the Well Done screen, 3,270 on the next pre-level dialog). Next button: purple "EXPERT LEVEL 60" with a purple octopus (X2 and Home not tapped). Shell Streak still full (5/5) on the pre-level dialog. Split words (7 chunk pairs, 1 move each): ARGEN\|TINA, REAC\|TOR, FIS\|SION, RADIA\|TION, URA\|NIUM, MOUN\|TAIN, SUP\|PER. Chain lock "3" over the lower half of the board; it counted down 3 to 2 to 1 as themes cleared and opened after the HYDRO theme (4th clear). New bubbles dropped in as themes cleared and as chunk pairs joined (each join revealed a new bubble). No reversed or cryptic bubbles. No +5 ad bubble opened (only a plain floating bubble drifted past, not tapped). Wrong or wasted drags: 3 (VALLEY onto RAVINE, WATERFALL onto GORGE+RAVINE, and a test of one other); no failures.

Chunk pairs: ARGEN\|TINA, REAC\|TOR, FIS\|SION, RADIA\|TION, URA\|NIUM, MOUN\|TAIN, SUP\|PER

| Theme | Words | Name |
|---|---|---|
| City transportation | TAXI, TRAM, BUS, SUBWAY | CITY TRANSPORTATION (shown) |
| Latin America | CHILE, PERU, BRAZIL, ARGENTINA (ARGEN\|TINA) | LATIN AMERICA (shown) |
| Hydro | DAM, TURBINE, GENERATOR, WATERFALL | HYDRO (shown; returned as a word to ENERGY SOURCES) |
| Nuclear | REACTOR (REAC\|TOR), FISSION (FIS\|SION), RADIATION (RADIA\|TION), URANIUM (URA\|NIUM) | NUCLEAR (shown; returned as a word to ENERGY SOURCES) |
| Energy sources | SOLAR, WIND, HYDRO (returned), NUCLEAR (returned) | ENERGY SOURCES (shown) |
| Woodland animals | DEER, FOX, BEAR, SQUIRREL | NOT SEEN (the name shot came too early; bubble was blank orange) |
| Breakfast | OMELETTE, TOAST, PANCAKES, CEREAL | BREAKFAST (shown; returned as a word to MEALS) |
| Meals | LUNCH, DINNER, SUPPER (SUP\|PER), BREAKFAST (returned) | MEALS (shown) |
| Volleyball | SERVE, NET, SPIKE, BLOCK | VOLLEYBALL (shown; returned as a word to the ball-sports theme) |
| Ball sports | SQUASH, BASKETBALL, BADMINTON, VOLLEYBALL (returned) | NOT SEEN (the 4th-merge shot missed it; probably a ball or racket sports name) |
| Canyon | GORGE, RAVINE, RIVERBED, CLIFF | CANYON (shown; returned as a word to TERRAIN) |
| Terrain | VALLEY, MOUNTAIN (MOUN\|TAIN), PLATEAU, CANYON (returned) | TERRAIN (shown, final merge) |

Notes: hierarchical level again (six sub-themes return as single words: HYDRO and NUCLEAR into ENERGY SOURCES, BREAKFAST into MEALS, VOLLEYBALL into the ball-sports theme, CANYON into TERRAIN). The lower half of the board was chain-locked ("3") at the start; the visible upper half held only about 24 bubbles and more dropped in as themes cleared. Join chunk pairs any time; each join cost 1 move and often revealed a new bubble. Wrong drags showed as a cost of 1 move with no change: VALLEY does not belong with GORGE+RAVINE (it goes with MOUNTAIN and PLATEAU), and WATERFALL belongs with DAM, TURBINE and GENERATOR (HYDRO), not with GORGE+RAVINE.

## Level 60 (EXPERT)

Themes: 13 (bar `0/13`). Moves: 52 at start (the counter read 3 for about 25 s while the board settled), 16 left at the final merge. Mastery: 798 (count-up frames 784 then 798 seen while leftover moves counted down 11 and lower; 798 is possibly mid-count, final not confirmed). Reward: 90 coins (EXPERT). Next button: green plain "LEVEL 61" (X2 and Home not tapped). Coins 3,270 on the Well Done screen. Split words (4 chunk pairs, 1 move each): EN\|GINE, DO\|MINO, SCRAB\|BLE, FLASH\|BACK. No reversed or cryptic bubbles, no chain lock. The +5 ad bubble did not appear. Wrong or wasted drags: 1 (a no-op drag while the board shifted, no cost); no failures, no ad incidents.

Chunk pairs: EN\|GINE, DO\|MINO, SCRAB\|BLE, FLASH\|BACK

| Theme | Words | Name |
|---|---|---|
| Unusual animals | QUOKKA, OKAPI, PANGOLIN and a fourth (not recorded) | NOT SEEN (early drags, name not captured) |
| Family | UNCLE, SISTER, MOTHER, COUSIN | NOT SEEN (guessed FAMILY; name shot missed) |
| Third early theme | not recorded | NOT SEEN (completed before the 3/13 count; reconstructed only) |
| Car mechanic | OIL, TIRE, ENGINE (EN\|GINE), WRENCH | CAR MECHANIC (shown) |
| Meat | PORK, LAMB, CHICKEN, BEEF | MEAT (shown) |
| Dog | BULLDOG, BEAGLE, POODLE, PUG | DOG (shown) |
| Emotions | JOY, ANGER, HOPE, FEAR | EMOTIONS (shown) |
| Moving | JUMP, RUN, WALK, CRAWL | MOVING (shown) |
| Board games | CHESS, DOMINO (DO\|MINO), SCRABBLE (SCRAB\|BLE), CHECKERS | GAME (shown; returned as a word to AT NIGHT) |
| Books | DON QUIXOTE, ODYSSEY, HAMLET, MOBY DICK | BOOK (shown; returned as a word to AT NIGHT) |
| Memories | NOSTALGIA, PHOTOGRAPH, CHILDHOOD, FLASHBACK (FLASH\|BACK) | MEMORIES (shown; returned as a word to HUMAN EXPERIENCE) |
| Human experience | MEMORIES (returned), EMOTIONS (returned), THOUGHTS, DREAMS | HUMAN EXPERIENCE (shown) |
| At night | MOON, BOOK (returned), GAME (returned), CANDLE | AT NIGHT (shown, final merge) |

Notes: hierarchical again, and the final theme took two returned sub-themes (BOOK and GAME) plus MOON and CANDLE, a cross-category "at night" grouping. EMOTIONS and MEMORIES also returned as words into HUMAN EXPERIENCE alongside THOUGHTS and DREAMS. The names of the first three themes were not captured because those merges were played quickly (their rows are reconstructed from memory of the board and may be wrong). A seasonal event icon (an acorn in a ring with a "4d" timer, right edge of the screen) appeared for the first time on the Well Done screen of this level; not tapped (see features log).

## Level 61

Themes: 9 (bar `0/9`). Moves: 47 at start; the Shell Streak (full 5/5) fired its free boosters as the board loaded (extra bubbles dropped in and +3 MOVES), so the counter read 50 once settled. 20 left at the final merge (move streaks gave a few +1s). Mastery: 810 (count-up frames 803 at 12 moves left, 810 at 4 left; probably a little higher at the very end, final not confirmed). Reward: 30 coins (plain level; coins 3,360 on the pre-level and Well Done screens). Next button: green plain "LEVEL 62". Split words (8 chunk pairs, 1 move each): HER\|BAL, PUZ\|ZLE, ENGI\|NEER, TOYO\|TA, CI\|PHER, VISIO\|NARY, EN\|CODE, LAT\|TE. Two reversed bubbles (EZAH = HAZE, ROPAV = VAPOR). No chain lock, no cryptic bubbles. No +5 ad bubble. Wrong or wasted drags: 1 (a drag after a board shift that did nothing, no cost).

Chunk pairs: HER\|BAL, PUZ\|ZLE, ENGI\|NEER, TOYO\|TA, CI\|PHER, VISIO\|NARY, EN\|CODE, LAT\|TE

| Theme | Words | Name |
|---|---|---|
| Inventors | VISIONARY (VISIO\|NARY), SCIENTIST, INVENTOR, ENGINEER (ENGI\|NEER) | NOT SEEN (guessed: INVENTORS; the clear bubble showed TESLA, which returned as a word to CAR BRANDS) |
| Car brands | FORD, BMW, TOYOTA (TOYO\|TA), TESLA (returned) | CAR BRANDS (shown) |
| Tableware | PLATE, BOWL, SPOON, FORK | TABLEWARE (shown) |
| Tea | GREEN, BLACK, OOLONG, HERBAL (HER\|BAL) | TEA (shown; returned as a word to DRINKS) |
| Coffee | ESPRESSO, MOCHA, LATTE (LAT\|TE), CAPPUCCINO | COFFEE (shown; returned as a word to DRINKS) |
| Drinks | JUICE, SODA, TEA (returned), COFFEE (returned) | DRINKS (shown) |
| Organic molecules | LIPID, CARBOHYDRATE, ENZYME, PROTEIN | ORGANIC MOLECULES (shown) |
| Fog | SMOG, MIST, VAPOR (ROPAV reversed), HAZE (EZAH reversed) | FOG (shown) |
| Codes | DECODE, ENCODE (EN\|CODE), CIPHER (CI\|PHER), PUZZLE (PUZ\|ZLE) | ENIGMA (shown, final merge) |

Notes: start board was mostly chunk pairs and the first words; arrivals came from extra bubbles (PLATE, TE, TA, VISIO) and later after each clear: EZAH, BOWL, SPOON, LIPID, CARBOHYDRATE, ENZYME, ESPRESSO, FORK, SMOG, MIST, LAT, TESLA (the cleared inventors bubble), CAPPUCCINO, MOCHA, ROPAV, PROTEIN. TEA and COFFEE returned as words to DRINKS; CAR BRANDS, TABLEWARE, ORGANIC MOLECULES and FOG did not return anywhere. The TESLA arrival (an inventors-theme bubble that joined CAR BRANDS) is a cross-over: the cleared theme came back as a word of another theme. Board packs into a tidy grid late in the level. Final clear name ENIGMA.

## Level 62

Themes: 10 (bar `0/10`). Moves: about 50 at start (counter read 3 while the board settled; 32 left by the 2/10 stage after about 18 merges and a few Move Streak bonuses; the exact start was not captured), 7 left when the Mastery count showed 818 (count-up still running, final not confirmed). Reward: 30 coins (plain level; coins 3,390). Next button: green plain "LEVEL 63". Cryptic bubbles seen: ???E, ????, ?A?E (CAKE), ???P (SOUP). No reversed bubbles, no chain lock. The orange "+5 MOVES" ad bubble floated on the board mid-level; not tapped, no drag started near it. Wrong or wasted drags: about 3 (some drags missed after the board shifted). Chunk pairs: this section's chunk list is not reliable (the start screenshots were not re-checked); at least STA|TION, SATEL|LITE style joins were not confirmed, so treat the split-word count as unknown.

| Theme | Words | Name |
|---|---|---|
| Train | ENGINE, TRACK, WAGON, CONDUCTOR | TRAIN (shown; returned as a word to RAILWAY) |
| Railway | PLATFORM, PASSENGER, TICKET, TRAIN (returned) | RAILWAY (shown) |
| Finance | INCOME, EXPENSE, SAVINGS, REPORT | NOT SEEN (guessed: FINANCE; "Cool!" covered it; returned as BUDGET to MANAGEMENT) |
| Dessert | PIE, PUDDING, ICE CREAM, CAKE (?A?E) | DESSERT (shown; returned to MEALS) |
| Appetizer | NACHOS, SPRING ROLL, SALAD, SOUP | APPETIZER (shown; returned to MEALS) |
| Meals | APPETIZER (returned), MAIN COURSE, DESSERT (returned), SNACK | MEALS (shown) |
| Management | TEAM, BUDGET (returned), SCHEDULE, MEETING | MANAGEMENT (shown) |
| Radio | SIGNAL, ANTENNA, BROADCAST, STATION | RADIO (shown, final merge) |
| Two more themes | the bubble AM / FM / SATELLITE (+ ONLINE) and one other, not reconstructed | NOT SEEN |

Notes: only 8 of the 10 theme clears are reconstructed (the screenshots between 2/10 and 7/10 were partly skimmed). Hierarchical: TRAIN into RAILWAY, DESSERT and APPETIZER into MEALS, BUDGET into MANAGEMENT. The final merge was STATION onto the SIGNAL ANTENNA BROADCAST bubble (RADIO). CONDUCTOR belongs to the train theme. Treat this section as partly unverified.

## Level 63

Themes: 8 (bar `0/8`). Moves: 44 at start (counter read 3 for about 40 s while the board settled; 43 after the first drag), 11 left at the final merge. Mastery: 831 (count-up frame at 11 leftover moves; the count was still running and the next screenshot was already the Well Done screen, so final not confirmed). Reward: 30 coins (coins 3,420). Next button: red "HARD LEVEL 64" with a red octopus. Split words (7 chunk pairs, 1 move each): EMPE\|ROR, SENA\|TOR, ME\|MORY, PLA\|NET, HOROS\|COPE, BAL\|CONY, BASE\|MENT. No reversed or cryptic bubbles, no chain lock, no +5 ad bubble. Wrong or wasted drags: 3 (PISCES onto the zodiac group while it was still moving, BASE onto MENT once, and one drag that missed after a board shift); no failures.

Chunk pairs: EMPE\|ROR, SENA\|TOR, ME\|MORY, PLA\|NET, HOROS\|COPE, BAL\|CONY, BASE\|MENT

| Theme | Words | Name |
|---|---|---|
| Martial arts | KARATE, JUDO, TAEKWONDO, AIKIDO | MARTIAL ARTS (shown) |
| Roman hierarchy | EMPEROR (EMPE\|ROR), SOLDIER, SLAVE, SENATOR (SENA\|TOR) | ROMAN HIERARCHY (shown) |
| Zodiac | LEO, VIRGO, ARIES, PISCES | ZODIAC (shown; returned as a word to ASTROLOGY) |
| Astrology | ZODIAC (returned), HOROSCOPE (HOROS\|COPE), CONSTELLATION, PLANET (PLA\|NET) | ASTROLOGY (shown) |
| House parts | ATTIC, ROOF, BALCONY (BAL\|CONY), BASEMENT (BASE\|MENT) | HOUSE PARTS (shown) |
| Face | NOSE, MOUTH, EYES, CHEEKS | FACE (shown; returned as a word to HUMAN HEAD) |
| Brain | CEREBRUM, MEMORY (ME\|MORY), NEURONS, THOUGHTS | BRAIN (shown; returned as a word to HUMAN HEAD) |
| Human head | SKULL, HAIR, FACE (returned), BRAIN (returned) | HUMAN HEAD (shown, final merge) |

Notes: hierarchical again: ZODIAC into ASTROLOGY, FACE and BRAIN into HUMAN HEAD. New bubbles arrived after merges (TAEKWONDO, EMPEROR, ATTIC, SENATOR, MEMORY, PLANET, AIKIDO, VIRGO, ROOF, ARIES, PISCES, ZODIAC). Start board was mostly chunk fragments plus anatomy words. The HARD button for level 64 follows an ordinary level.

## Level 64 (HARD)

Themes: 9 (bar `0/9`). Moves: 44 at start (counter read 3 for about 55 s while the board settled; 41 after the first drag), 9 left when the Mastery count showed 848 (count-up in progress, final not confirmed). Reward: 60 coins (HARD; coins 3,450). Next button: purple "EXPERT LEVEL 65" with a purple octopus. Shell Streak full (5/5). Split words (about 9 chunk pairs, 1 move each): DRA\|WING, WING\|?, TING (PAIN\|TING), PHO\|TO... joins seen: DRA+WING, PAIN+TING, HO+CKEY, OC+TAVE, QUE+BEC, plus others I did not re-verify (the start board had 12+ teal chunks: WING, DRA, TING, PAIN, QUE, OC, BEC, HO, CKEY, TAVE and more). Two reversed bubbles (yellow with left arrow): ETON = NOTE, OHADI = IDAHO. No chain lock, no cryptic bubbles, no +5 ad bubble. Wrong or wasted drags: about 5 (several drags missed after the board shifted: ETON, MUSIC, TORONTO each needed a retry; most missed drags cost 0 or 1 move).

| Theme | Words | Name |
|---|---|---|
| Natural sciences | BIOLOGY, CHEMISTRY, PHYSICS, ASTRONOMY | SCIENCE (shown; returned to SUBJECTS) |
| Australia | SYDNEY, OUTBACK, KANGAROO, plus one more | AUSTRALIA (shown; returned to ENGLISH-SPEAKING WORLD) |
| Art | PAINTING, DRAWING, SCULPTURE, PHOTOGRAPHY (OPERA HOUSE belonged to Australia) | ART (shown; returned to SUBJECTS) |
| Math | ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION | MATH (shown; returned to SUBJECTS) |
| Music | MELODY, RHYTHM, OCTAVE (OC\|TAVE), NOTE (ETON reversed) | MUSIC (shown; returned to SUBJECTS) |
| Subjects | ART, MATH, SCIENCE, MUSIC (all returned) | SUBJECTS (shown) |
| US states | WYOMING, MAINE, NEVADA, IDAHO (OHADI reversed) | USA (shown; returned to ENGLISH-SPEAKING WORLD) |
| Canada | TORONTO, MAPLE, HOCKEY (HO\|CKEY), QUEBEC (QUE\|BEC) | CANADA (shown; returned to ENGLISH-SPEAKING WORLD) |
| English-speaking world | AUSTRALIA (returned), USA (returned), NEW ZEALAND, CANADA (returned) | ENGLISH-SPEAKING WORLD (shown, final merge) |

Notes: hierarchical: SCIENCE, ART, MATH and MUSIC into SUBJECTS (the biggest two-level tree so far: sciences also fed a parent); AUSTRALIA, USA and CANADA into ENGLISH-SPEAKING WORLD with the plain word NEW ZEALAND. OPERA HOUSE (an Australia clue) was dragged with the Australia group, not ART. Table rows for AUSTRALIA and ART may be slightly off in which fourth word joined (the clears were played quickly).

## New features log

| Level | Feature | Screenshot | Description |
|---|---|---|---|
| 2 | Move limit | scratchpad/shots/l2c.png | MOVES counter top left (39 at start); each merge costs 1 move. |
| 2 | Mastery bubble at level end | scratchpad/shots/q3.png | Leftover moves convert into a MASTERY number with "Tap to skip". |
| 2 | Theme-name reveal | scratchpad/shots/n3.png | Name shows in the orange bubble for ~1 s before the clear. |
| 3 | Booster unlock (Extra Bubbles) | scratchpad/shots/r2.png, b2.png | Pink "+" button, badge 3 uses, spawns 3 new words, no cost. |
| 3 | Picture bubble | scratchpad/shots/c4.png | A bubble shows an image instead of a word. |
| 4 | Booster unlock (Hint) | scratchpad/shots/j1.png, j3.png | Magnifier button, 3 uses, highlights 2 matching bubbles in gold; no move cost. |
| 4 | Mastery cumulative | scratchpad/shots/u5.png | MASTERY 44 at the end of level 4 (= 14+15+15 leftover moves). |
| 4 | 10 themes / 45 moves | scratchpad/shots/j3.png | Level size grows: 0/10 themes, 40 words, 45 moves. |
| 5 | Move Streak | scratchpad/shots/w3.png | 5 correct merges in a row earns +1 move (33 merges gave +6). |
| 6 | Tap & hold to preview word | scratchpad/shots/k2.png, k5.png | Hold a bubble to show its word in a top banner (needed for picture bubbles). |
| 7 | Magnet booster | scratchpad/shots/y1.png | Completes the biggest category for 0 moves; badge 3 -> 2. |
| 7 | Hierarchical themes | scratchpad/shots/d4.png, h4.png, j3.png, l1.png | Cleared theme comes back as a bubble belonging to a parent theme (MEASUREMENTS, SPACE, LANDMASS). |
| 7 | 'HARD' level label | scratchpad/shots/l4.png | Level 8 button is red with a 'HARD' tag. |
| 8 | Mastery 93 / seasonal leaf decoration | scratchpad/shots/w5.png | Mastery shown 93; autumn leaves on the frame; 11 moves left. |
| 10 | Rewarded-ad X2 button + 'Welcome!' chest | scratchpad/shots/t1.png | WELL DONE screen now has a LEVEL 11 button and an orange coin X2 button with a video icon (ad to double coins; not tapped), plus a 'Welcome!' chest icon at top right (not opened). |
| 10 | Chunks (split words) | scratchpad/shots/i1.png, i3.png | Popup 'CHUNKS: Some words are broken into smaller pieces' (example YELLOW). Chunk bubbles are teal-tinted (YEL, LOW). |
| 11 | Welcome Pack purchase offer | scratchpad/shots/u1.png | Popup 'Welcome Pack' appeared as level 11 loaded (51 moves, 0/12 themes): 2,000 coins, 2 each of Extra Bubbles/Magnet/Hint, 1H unlimited hearts, button 'YEN 520' with '70% OFF'. Real-money offer: NOT tapped; closed with its red X. |
| 15 | Home button on the Well Done screen | scratchpad/shots/r15.png | A blue Home button with a red "!" badge now sits under LEVEL 16 and X2 (not tapped). |
| 18 | HARD level indicator | scratchpad/shots/l5.png | The Well Done screen after level 18 shows the next button as a red "HARD LEVEL 19" with an octopus; level 19 itself has a red LVL tab with the octopus and a red booster bar (reward 60 coins, as level 8). |
| 21 | Chained bubbles (padlock chain) | scratchpad/shots/chained_tutorial.png, t3.png | A chain with a numbered padlock splits the board; "Collect 3 bubbles to unlock. No merging across the chain." Lock counts down as themes clear. Also a floating "+5 MOVES" rewarded-ad bubble (not tapped). |
| 24 | EXPERT level indicator | scratchpad/shots/wd24.png | The Well Done screen after HARD level 24 shows the next button as a purple "EXPERT LEVEL 25" with a purple octopus (HARD was red with a red octopus). |
| 31 | Cryptic bubbles | scratchpad/shots/s31b.png, s31c.png | Words with missing letters shown as "?" (tutorial example A?P??); the letters reveal as other merges happen (??C? -> ?ACH -> BACH). |
| 35 | Out-of-moves modal ("+5 Moves FREE") | scratchpad/shots/oom35a.png, oom35c.png, free1.png | "OUT OF MOVES!" modal with a green "+5 Moves FREE" button (a straight +5, no ad), a 880 yen Revive Offer (+15 moves) and a Golden Pass carousel; no close X (Back and outside taps do nothing). |
| 35 | Low-moves warning ring | scratchpad/shots/e8.png | Red moves ring and pink screen vignette at 5 moves and below. |
| 36 | Pre-level dialog (Shell Streak, free boosters) | scratchpad/shots/s36a.png, s36b.png | Tapping the LEVEL 36 button first opens a dialog: "Shell Streak" (locked, "Unlocks at Level 51"), "Select Boosters" with two FREE boosters (extra bubble, +3 MOVES) behind a tutorial arrow, and a green PLAY button; heart counter 5 Full. First seen at level 36 (not selected; PLAY tapped). |
| 37 | Chain lock counts completed themes | scratchpad/shots/c0.png, v2.png | The padlock number (3 on level 37) drops by one for each theme completed above the chain (3 -> 2 -> 1 -> gone); merges inside one half work freely. Words needed to finish the upper themes only drop in after the lock opens. |
| 39 | Rewarded-ad "+5 MOVES" bubble fires from a nearby drag | scratchpad/shots/n2.png, ad2.png, ad5.png, ad10.png, o1.png | A drag next to the orange +5 MOVES bubble (a drag from TER toward MINAL, bubble was 200 px away) started a full-screen MAX test ad ("Congrats! You're seeing a test ad", countdown 9 s). It had no X at first; a top-left pill with a skip glyph and "Google Play" was in fact a Play Store link (opened a Play sheet, then the Play Store home with an info dialog; nothing installed). The game was brought back with an app launch; the ad then showed "Privacy Management" with GET, Interested, Not interested and an X at top right; the X closed it. Reward +5 moves (14 -> 18). |
| 39 | EXPERT indicator after a HARD level | scratchpad/shots/wd39.png | Well Done after HARD level 39 shows a purple "EXPERT LEVEL 40" button with a pink octopus (reward of 39 was 60). |
| 51 | Reversed-word bubbles | scratchpad/shots/r51b.png, a51d.png | Tutorial popup "Some bubbles contain reversed words. Look carefully!" (example ELPPA = APPLE), button "Got It". Reversed bubbles show their text in yellow with a left-arrow icon (EVAC = CAVE, RIFEK = KEFIR); they join their theme as the real word. |
| 51 | Shell Streak unlocked | scratchpad/shots/p51.png, ss1b.png, ss2b.png | LEVEL 51 pre-level dialog opened with a dark overlay, banner "Shell Streak unlocked!" and a blue arrow. The Shell Streak row (pink shell icon, 5-segment bar, shell icons at segments 3 and 5, an (i) button) sits above "Select Boosters" (FREE green +extra bubble and purple +3 MOVES, 1 each). Tapping (i) opens a popup: pink shell with tick, open shell with the green extra-bubble booster (segment 3), golden shell with extra bubble + +3 MOVES (segment 5); text "Beat 5 levels without losing to get free boosters". Earned by winning levels in a row without losing (bar 0/5 at level 51); gives free boosters at 3 and 5; cost: nothing, no coin or purchase prompt; closed with its red X, tutorial needed no other action. |
| 60 | Acorn event icon with 4-day timer | scratchpad/shots/h3.png | On the Well Done screen after level 60 a round icon (acorn in a green ring with a stopwatch badge "4d ...") appeared at the right edge below the Welcome! chest. Not tapped; looks like a timed seasonal event (the board decor also turned autumn: maple leaves and string lights). Nothing required. |

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

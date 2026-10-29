// Generated word data: Body & Health depth-3 themes (mind and wellbeing: spas; nutrition; body movement).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const place = (o = {}) => ({ type: 'place', ...o });
// every row of the list is a verb unless its options already set a part of speech
const vs = rows => rows.map(r => [r[0], r[1], r[2], { pos: 'verb', ...(r[3] || {}) }]);

export const THEMES = {
  turkish_bath: { d: 5 }, european_spa_towns: { d: 4 }, vitamins: { d: 1 }, dietary_minerals: { d: 2 }, food_groups: { d: 1 }, nutrients: { d: 2 },
  diet_types: { d: 1 }, superfoods: { d: 2 }, healthy_snacks: { d: 1 }, facial_expressions: { d: 1 }, gestures: { d: 1 }, body_actions: { d: 1 },
  hand_actions: { d: 2 }, ways_of_walking: { d: 2 }, ways_of_looking: { d: 3 }, ways_of_speaking: { d: 2 }, body_noises: { d: 1 }, ways_of_crying: { d: 2 },
  ways_of_breathing: { d: 4 }, body_positions: { d: 2 }, mouth_actions: { d: 2 }, ways_of_laughing: { d: 1 },
};

export const FIXES = [
  { gloss: ['duck', 'birds', 'bird'] }, { gloss: ['iron', 'metals', 'metal'] }, { gloss: ['hawk', 'birds', 'bird'] }, { gloss: ['carnivore', 'prehistoric_life', 'animal'] },
  { gloss: ['squall', 'weather', 'weather'] }, { gloss: ['mouth', 'body_parts', 'body part'] }, { gloss: ['eye', 'body_parts', 'body part'] },
];

export const DATA = {
  turkish_bath: [
    ['hammam', 3, 1, { al: [['hamam', 'spelling', 4, 2]] }], ['bathhouse', 2, 2], ['kese', 5, 3], ['pestemal', 5, 3, { al: [['peshtemal', 'spelling', 5, 3]] }],
    ['marble slab', 3, 2], ['steam', 1, 3], ['foam', 1, 3], ['dome', 2, 3], ['clogs', 2, 3], ['hot room', 3, 2],
    ['belly stone', 5, 3], ['tellak', 5, 4], ['cold room', 3, 3], ['basin', 2, 3], ['scrub', 2, 2], ['olive oil soap', 4, 3],
    ['loofah', 3, 3], ['foam massage', 4, 3], ['Turkish tea', 3, 4], ['Turkish delight', 2, 5], ['steam room', 2, 3], ['bath attendant', 3, 3],
    ['sauna', 2, 3], ['towel', 1, 4], ['soap', 1, 4, { g: 'wash' }], ['fez', 3, 5], ['changing cubicle', 4, 4], ['kurna', 5, 4], ['sweating', 2, 4],
  ],
  european_spa_towns: [
    ['Bath', 2, 1, place({ g: 'English city' })], ['Baden-Baden', 3, 1, place()], ['Vichy', 3, 1, place()], ['Spa', 3, 1, place({ g: 'Belgian town' })],
    ['Karlovy Vary', 3, 1, place({ al: [['Carlsbad', 'synonym', 4, 2, [], { type: 'place' }]] })], ['Evian', 3, 2, place({ g: 'French town' })],
    ['Marienbad', 4, 2, place({ al: [['Marianske Lazne', 'synonym', 5, 3, [], { type: 'place' }]] })],
    ['Harrogate', 3, 2, place()], ['Buxton', 4, 2, place()], ['Cheltenham', 3, 3, place()], ['Wiesbaden', 3, 3, place()], ['Aix-les-Bains', 4, 2, place()],
    ['Montecatini Terme', 5, 3, place()], ['Abano Terme', 5, 2, place()], ['Bad Gastein', 4, 2, place()], ['Bad Ems', 5, 2, place()], ['Bad Kissingen', 5, 2, place()],
    ['Bad Homburg', 4, 3, place()], ['Bad Ischl', 5, 2, place()], ['Piestany', 5, 2, place()], ['Heviz', 5, 2, place()], ['Franzensbad', 5, 2, place()],
    ['Merano', 4, 3, place()], ['Vittel', 4, 2, place()], ['Contrexeville', 5, 3, place()], ['Tunbridge Wells', 3, 3, place()], ['Malvern', 3, 3, place()],
    ['Llandrindod Wells', 5, 3, place()], ['Opatija', 5, 3, place()], ['Luhacovice', 5, 2, place()], ['Bagnoles-de-l\'Orne', 5, 3, place()], ['Bad Reichenhall', 5, 3, place()],
  ],
  vitamins: [
    ['vitamin C', 1, 1, { al: [['ascorbic acid', 'synonym', 3, 2]] }], ['vitamin D', 1, 1, { al: [['cholecalciferol', 'synonym', 5, 4], ['calciferol', 'synonym', 4, 3]] }],
    ['vitamin A', 1, 1, { al: [['retinol', 'synonym', 4, 3]] }], ['vitamin E', 2, 1, { al: [['tocopherol', 'synonym', 5, 4]] }], ['vitamin K', 2, 1, { al: [['phylloquinone', 'synonym', 5, 5]] }],
    ['vitamin B12', 3, 1, { al: [['cobalamin', 'synonym', 5, 4]] }], ['vitamin B6', 3, 1, { al: [['pyridoxine', 'synonym', 5, 4]] }],
    ['vitamin B1', 3, 2], ['thiamine', 4, 3], ['vitamin B2', 3, 2], ['riboflavin', 4, 3], ['vitamin B3', 3, 2], ['niacin', 3, 3],
    ['vitamin B5', 4, 2, { al: [['pantothenic acid', 'synonym', 5, 4]] }], ['vitamin B7', 4, 2, { al: [['biotin', 'synonym', 3, 3]] }],
    ['folic acid', 2, 2, { al: [['vitamin B9', 'synonym', 4, 3]] }], ['folate', 3, 3], ['vitamin B', 2, 2], ['multivitamin', 2, 2],
    ['vitamin B complex', 3, 2], ['beta-carotene', 3, 4], ['choline', 4, 4], ['vitamin H', 5, 4], ['vitamin P', 5, 5], ['vitamin B4', 5, 4], ['vitamin B8', 5, 5],
    ['vitamin B10', 5, 5], ['vitamin B11', 5, 5], ['vitamin B13', 5, 5], ['vitamin B15', 5, 5], ['vitamin B17', 5, 5],
  ],
  dietary_minerals: [
    ['iron', 1, 2, { g: 'mineral' }], ['calcium', 1, 1], ['zinc', 2, 2], ['magnesium', 2, 1], ['potassium', 2, 1], ['iodine', 2, 2], ['selenium', 3, 2],
    ['sodium', 2, 2], ['phosphorus', 3, 2], ['copper', 2, 3, { g: 'metal' }], ['manganese', 3, 3], ['chromium', 3, 3], ['fluoride', 2, 3], ['molybdenum', 4, 3],
    ['chloride', 3, 3], ['cobalt', 3, 4], ['sulfur', 3, 4, { al: [['sulphur', 'spelling', 3, 4, ['UK']]] }], ['boron', 4, 4], ['silicon', 3, 5], ['nickel', 2, 5], ['vanadium', 4, 5],
    ['trace minerals', 3, 2], ['electrolytes', 3, 3], ['salt', 1, 3], ['mineral', 2, 2, { g: 'nutrient' }],
  ],
  food_groups: [
    ['fruit', 1, 1], ['vegetables', 1, 1], ['dairy', 1, 1], ['grains', 1, 1], ['protein', 1, 1], ['meat', 1, 1], ['fish', 1, 1, { g: 'food' }], ['fats and oils', 2, 1],
    ['sweets', 1, 2], ['bread and cereals', 2, 2], ['starchy foods', 2, 1], ['legumes', 3, 2, { al: [['pulses', 'synonym', 3, 2, ['UK']]] }], ['nuts and seeds', 2, 2],
    ['eggs', 1, 2], ['poultry', 2, 2], ['cereals', 2, 2], ['carbohydrates', 2, 2], ['dairy products', 2, 1], ['beans', 1, 3], ['fruit and veg', 2, 1, { reg: ['UK'] }],
    ['whole grains', 2, 2], ['sugars', 2, 3], ['oils', 2, 3], ['empty calories', 3, 4], ['junk food', 1, 4], ['seafood', 1, 2],
  ],
  nutrients: [
    ['protein', 1, 1], ['carbohydrate', 2, 1], ['fat', 1, 1, { g: 'nutrient' }], ['fiber', 2, 1, { al: [['fibre', 'spelling', 2, 1, ['UK']]] }], ['vitamin', 1, 2], ['mineral', 2, 2, { g: 'nutrient' }], ['water', 1, 3],
    ['sugar', 1, 2], ['starch', 2, 2], ['amino acid', 3, 2], ['fatty acid', 3, 2], ['omega-3', 3, 2], ['antioxidants', 2, 2], ['electrolytes', 3, 3], ['saturated fat', 2, 2],
    ['unsaturated fat', 3, 2], ['trans fat', 3, 2], ['glucose', 2, 3], ['fructose', 3, 3], ['lactose', 3, 3], ['sucrose', 3, 3], ['lipid', 4, 3], ['macronutrient', 4, 2],
    ['micronutrient', 4, 2], ['phytonutrient', 5, 3], ['polyphenol', 4, 4], ['flavonoid', 4, 4], ['lutein', 5, 4], ['lycopene', 4, 4], ['glycogen', 4, 4], ['omega-6', 4, 3],
    ['collagen', 3, 4], ['cholesterol', 2, 4], ['probiotics', 3, 4], ['calories', 1, 3], ['carotenoid', 5, 4], ['complex carbs', 3, 2],
  ],
  diet_types: [
    ['vegan', 1, 1], ['vegetarian', 1, 1], ['keto', 2, 1], ['paleo', 2, 1], ['Atkins', 3, 2, { type: 'proper', tm: true }], ['pescatarian', 3, 1], ['gluten-free', 2, 1],
    ['low-carb', 2, 1], ['low-fat', 2, 1], ['Mediterranean', 2, 2, { g: 'diet' }], ['flexitarian', 4, 2], ['fruitarian', 4, 2], ['raw food', 2, 2], ['carnivore', 2, 2, { g: 'diet' }],
    ['Whole30', 4, 3, { type: 'proper', tm: true }], ['DASH', 4, 3, { type: 'acronym', g: 'diet' }], ['intermittent fasting', 3, 2], ['South Beach', 4, 3, { type: 'proper', tm: true }],
    ['Dukan', 5, 4, { type: 'proper', tm: true }], ['Weight Watchers', 3, 3, { type: 'org', tm: true }], ['juice cleanse', 3, 3], ['macrobiotic', 4, 3], ['halal', 3, 4, { sens: true }],
    ['kosher', 3, 4, { sens: true }], ['lactose-free', 2, 2], ['dairy-free', 2, 2], ['high-protein', 2, 2], ['plant-based', 2, 1], ['low FODMAP', 5, 3], ['cabbage soup diet', 3, 3],
    ['Zone diet', 4, 3], ['alkaline diet', 4, 3], ['sugar-free', 2, 3], ['low-sodium', 3, 3], ['ketogenic', 4, 2], ['grapefruit diet', 3, 3], ['5:2 diet', 4, 3], ['clean eating', 3, 3],
  ],
  superfoods: [
    ['blueberries', 1, 1], ['kale', 2, 1], ['quinoa', 2, 1], ['chia seeds', 2, 1], ['acai', 3, 1], ['goji berries', 3, 1], ['spirulina', 3, 1], ['turmeric', 2, 2], ['avocado', 1, 2],
    ['salmon', 1, 3, { g: 'fish' }], ['almonds', 1, 3], ['walnuts', 1, 3], ['spinach', 1, 3], ['broccoli', 1, 3], ['green tea', 1, 2], ['matcha', 2, 2], ['kefir', 3, 3], ['flaxseed', 3, 2],
    ['hemp seeds', 3, 2], ['lentils', 2, 4], ['sweet potato', 1, 4], ['garlic', 1, 4], ['dark chocolate', 1, 3], ['pomegranate', 2, 2], ['oats', 1, 3], ['beetroot', 2, 3],
    ['seaweed', 2, 3], ['maca', 4, 2], ['moringa', 4, 2], ['chlorella', 4, 2], ['sea buckthorn', 5, 3], ['baobab', 3, 3], ['cacao', 3, 2], ['wheatgrass', 3, 2],
    ['kombucha', 3, 3], ['camu camu', 5, 3], ['amaranth', 4, 3, { g: 'grain' }], ['teff', 5, 4], ['lucuma', 5, 3], ['noni', 5, 4],
  ],
  healthy_snacks: [
    ['apple slices', 1, 1], ['carrot sticks', 1, 1], ['celery sticks', 1, 1], ['hummus', 2, 2], ['almonds', 1, 2], ['popcorn', 1, 3], ['yogurt', 1, 1], ['rice cakes', 2, 2],
    ['trail mix', 2, 2], ['banana', 1, 2], ['grapes', 1, 2], ['cheese cubes', 2, 2], ['edamame', 3, 2], ['hard-boiled egg', 2, 2], ['mixed nuts', 1, 2], ['fruit salad', 1, 1],
    ['oatcakes', 3, 3], ['dried fruit', 2, 2], ['granola bar', 2, 3], ['veggie chips', 3, 3], ['kale chips', 3, 2], ['nut butter', 2, 3], ['cottage cheese', 2, 3],
    ['guacamole', 2, 3], ['seaweed snacks', 3, 3], ['roasted chickpeas', 3, 2], ['energy balls', 3, 2], ['protein bar', 2, 3], ['berries', 1, 2], ['cucumber slices', 2, 2],
    ['smoothie', 1, 3], ['air-popped popcorn', 3, 2], ['rice crackers', 2, 3], ['frozen yogurt', 2, 4], ['bean dip', 3, 3], ['stuffed dates', 4, 3],
  ],
  facial_expressions: [
    ['smile', 1, 1], ['frown', 1, 1], ['grin', 1, 1], ['smirk', 2, 1], ['scowl', 2, 1], ['pout', 2, 1], ['wink', 1, 1], ['grimace', 2, 1], ['sneer', 2, 1], ['glare', 2, 1],
    ['squint', 2, 2], ['raised eyebrow', 2, 1], ['blank stare', 2, 2], ['beam', 3, 2, { g: 'smile' }], ['leer', 3, 2], ['glower', 4, 2], ['wince', 2, 1], ['gape', 3, 3],
    ['poker face', 2, 1], ['furrowed brow', 3, 1], ['eye roll', 1, 1], ['sulk', 2, 3], ['pursed lips', 3, 1], ['deadpan', 3, 2], ['puppy dog eyes', 2, 2], ['duck face', 2, 2],
    ['gurn', 5, 3, { reg: ['UK'] }], ['moue', 5, 4], ['rictus', 5, 4], ['lip curl', 4, 2], ['knitted brow', 4, 2], ['snarl', 2, 3, { g: 'expression' }], ['simper', 4, 3],
    ['scrunched nose', 3, 2], ['wide-eyed look', 3, 3], ['death stare', 2, 2], ['side-eye', 2, 2],
  ],
  gestures: [
    ['wave', 1, 1, { g: 'gesture' }], ['thumbs up', 1, 1], ['thumbs down', 1, 1], ['shrug', 1, 1, { g: 'gesture' }], ['nod', 1, 1], ['point', 1, 2, { g: 'gesture' }], ['salute', 1, 1, { g: 'gesture' }], ['high five', 1, 1],
    ['fist bump', 1, 1], ['beckon', 3, 1], ['clap', 1, 2], ['handshake', 1, 1], ['hug', 1, 2], ['bow', 1, 2, { g: 'gesture' }], ['peace sign', 1, 1], ['OK sign', 1, 1],
    ['air quotes', 2, 1], ['crossed fingers', 2, 1], ['facepalm', 2, 1], ['blow a kiss', 2, 1], ['finger gun', 2, 1], ['fist pump', 2, 1], ['curtsy', 3, 1], ['namaste', 3, 1, { sens: true }],
    ['jazz hands', 2, 1], ['snap fingers', 2, 2], ['hand on heart', 3, 2], ['shush', 2, 2], ['thumbs sideways', 4, 2], ['shaka', 4, 2, { g: 'hand sign' }], ['horns sign', 4, 2],
    ['middle finger', 1, 3, { adult: true, vulgar: true }], ['V sign', 3, 2, { reg: ['UK'] }], ['hang loose', 3, 2], ['cheek kiss', 3, 2], ['forehead bow', 4, 3],
    ['wiggling fingers', 3, 3], ['thumb war', 3, 4], ['beckoning finger', 3, 2],
  ],
  body_actions: vs([
    ['jump', 1, 1], ['run', 1, 1], ['walk', 1, 1], ['sit', 1, 1], ['stand', 1, 1], ['kneel', 1, 1], ['crouch', 2, 1], ['bend', 1, 1], ['stretch', 1, 1], ['twist', 1, 2, { g: 'move' }], ['turn', 1, 2],
    ['lean', 1, 2], ['climb', 1, 1], ['crawl', 1, 1], ['hop', 1, 1], ['skip', 1, 2, { g: 'move' }], ['leap', 2, 1], ['duck', 1, 3, { g: 'dodge' }], ['lie down', 1, 1], ['squat', 2, 1],
    ['spin', 1, 2], ['swing', 1, 3, { g: 'move' }], ['kick', 1, 2], ['punch', 1, 3], ['tiptoe', 2, 2], ['sway', 2, 2], ['flex', 2, 2], ['slouch', 2, 2], ['stoop', 3, 3, { g: 'bend' }], ['shuffle', 2, 3],
    ['pivot', 3, 3], ['roll', 1, 2, { g: 'move' }], ['tumble', 2, 3], ['somersault', 2, 2], ['cartwheel', 2, 2], ['balance', 1, 3, { g: 'stay steady' }], ['hunch', 3, 3, { g: 'posture' }], ['shiver', 2, 3], ['tremble', 2, 3],
    ['lunge', 3, 3, { g: 'move' }], ['wriggle', 3, 3], ['writhe', 4, 4], ['contort', 4, 3], ['genuflect', 5, 4],
  ]),
  hand_actions: vs([
    ['clap', 1, 1], ['grab', 1, 1], ['grip', 2, 1], ['wave', 1, 2, { g: 'gesture' }], ['squeeze', 1, 1], ['pinch', 1, 1], ['poke', 2, 1],
    ['slap', 1, 1], ['tap', 1, 2], ['pat', 1, 1], ['stroke', 2, 1, { g: 'caress' }], ['rub', 1, 1], ['scratch', 1, 2], ['knead', 3, 2],
    ['flick', 2, 2], ['snap', 1, 2, { g: 'fingers' }], ['wring', 3, 2], ['push', 1, 2], ['pull', 1, 2], ['tickle', 1, 2],
    ['caress', 3, 2], ['clench', 3, 2], ['grasp', 2, 2], ['clutch', 3, 2, { g: 'grip' }], ['drum', 2, 3, { g: 'fingers' }], ['fumble', 3, 3],
    ['pluck', 3, 3], ['cup', 2, 3, { g: 'hands' }], ['swat', 3, 3], ['wipe', 1, 3], ['smack', 2, 3, { g: 'hit' }], ['fiddle', 3, 3],
    ['palm', 3, 4, { g: 'conceal' }], ['paw', 3, 4], ['rifle', 4, 4], ['manhandle', 4, 4], ['pummel', 4, 4],
  ]),
  ways_of_walking: vs([
    ['stroll', 1, 1], ['stride', 2, 1], ['march', 1, 1, { g: 'walk' }], ['strut', 2, 1], ['shuffle', 2, 1], ['limp', 2, 1], ['stagger', 2, 1], ['tiptoe', 2, 1], ['waddle', 2, 1],
    ['trudge', 3, 1], ['amble', 3, 1], ['saunter', 3, 1], ['plod', 3, 2], ['stomp', 2, 2], ['wander', 2, 2], ['hobble', 2, 1], ['sashay', 3, 2], ['swagger', 3, 1],
    ['pace', 2, 3, { g: 'walk' }], ['trot', 2, 3], ['lumber', 3, 2], ['stumble', 2, 2], ['totter', 4, 2], ['traipse', 4, 2], ['mosey', 4, 2], ['lurch', 3, 2],
    ['toddle', 3, 2], ['prowl', 2, 3], ['slink', 4, 3], ['sidle', 4, 3], ['meander', 3, 3], ['ramble', 3, 3, { g: 'walk' }], ['hike', 1, 3], ['promenade', 4, 3],
    ['perambulate', 5, 3], ['trundle', 4, 3], ['yomp', 5, 3, { reg: ['UK'] }], ['flounce', 4, 3], ['tramp', 3, 3, { g: 'walk' }], ['clump', 4, 4], ['goose step', 4, 3],
  ]),
  ways_of_looking: vs([
    ['glance', 1, 1], ['stare', 1, 1], ['gaze', 2, 1], ['glare', 2, 1], ['peek', 2, 1], ['peer', 2, 1], ['glimpse', 2, 1], ['squint', 2, 1], ['gawk', 3, 1], ['ogle', 3, 1],
    ['scan', 2, 2], ['watch', 1, 2, { g: 'look' }], ['observe', 2, 2], ['peep', 2, 2], ['scrutinize', 4, 2, { al: [['scrutinise', 'spelling', 4, 2, ['UK']]] }], ['survey', 3, 3, { g: 'look' }],
    ['eye', 2, 3, { g: 'look at' }], ['leer', 3, 2], ['gape', 3, 2], ['glower', 4, 2], ['behold', 4, 3], ['goggle', 3, 3], ['rubberneck', 4, 2], ['eyeball', 3, 3],
    ['gander', 4, 3, { pos: 'noun', al: [['dekko', 'synonym', 5, 3, ['UK']], ['shufti', 'synonym', 5, 3, ['UK']]] }], ['contemplate', 3, 4], ['inspect', 2, 3], ['examine', 2, 3], ['regard', 3, 4],
    ['blink', 1, 3], ['spy', 2, 3], ['stare down', 3, 2], ['pore over', 4, 3], ['check out', 2, 3], ['look daggers', 4, 3],
  ]),
  ways_of_speaking: vs([
    ['whisper', 1, 1], ['shout', 1, 1], ['mumble', 2, 1], ['mutter', 2, 1], ['murmur', 2, 1], ['yell', 1, 1], ['scream', 1, 1], ['shriek', 2, 1], ['stammer', 3, 1], ['stutter', 2, 1],
    ['drawl', 3, 1], ['babble', 3, 1], ['chatter', 2, 1], ['ramble', 3, 2, { g: 'talk' }], ['bellow', 3, 1], ['holler', 3, 1], ['whine', 2, 2], ['groan', 2, 3], ['croak', 3, 2], ['lisp', 3, 1],
    ['rant', 3, 2], ['bark', 2, 3, { g: 'shout' }], ['snap', 2, 3, { g: 'speak sharply' }], ['hiss', 2, 3], ['blurt', 3, 2], ['gabble', 4, 2], ['jabber', 4, 2], ['whimper', 3, 3],
    ['slur', 3, 2], ['rasp', 3, 3, { g: 'harsh sound' }], ['boom', 2, 3], ['squeak', 2, 3], ['prattle', 4, 2], ['burble', 4, 3], ['stage whisper', 4, 2, { pos: 'noun' }], ['harangue', 5, 3], ['intone', 5, 3],
    ['mouth off', 4, 3], ['bleat', 3, 4], ['rattle off', 4, 3],
  ]),
  body_noises: [
    ['burp', 1, 1, { g: 'noise' }], ['hiccup', 1, 1, { al: [['hiccough', 'spelling', 3, 2]] }], ['sneeze', 1, 1], ['cough', 1, 1], ['snore', 1, 1], ['yawn', 1, 1], ['sniff', 1, 1], ['gulp', 1, 1],
    ['sigh', 1, 1], ['fart', 1, 1, { vulgar: true }], ['belch', 2, 1], ['gasp', 1, 1], ['wheeze', 2, 1], ['gurgle', 3, 2], ['stomach rumble', 2, 1], ['sniffle', 3, 1], ['snort', 2, 2, { g: 'noise' }],
    ['whistle', 1, 3, { g: 'with lips' }], ['groan', 2, 2], ['moan', 2, 3], ['clear throat', 2, 1], ['knuckle crack', 2, 1], ['gag', 2, 3], ['retch', 3, 2], ['hum', 1, 4], ['grunt', 2, 2, { g: 'noise' }],
    ['splutter', 3, 3], ['choke', 2, 3], ['pant', 2, 3], ['huff', 3, 3], ['tummy growl', 2, 1], ['borborygmus', 5, 4], ['hawk', 4, 4, { g: 'clear throat', pos: 'verb' }],
    ['rattle', 2, 4, { g: 'chest' }], ['smack lips', 3, 3], ['teeth grinding', 3, 3], ['tut', 3, 4, { al: [['tsk', 'synonym', 4, 4]] }],
  ],
  ways_of_crying: vs([
    ['sob', 1, 1], ['weep', 2, 1], ['wail', 2, 1], ['bawl', 2, 1], ['whimper', 2, 1], ['sniffle', 3, 1], ['blub', 4, 2, { reg: ['UK'] }], ['blubber', 3, 1], ['howl', 2, 2, { g: 'cry' }],
    ['snivel', 3, 2], ['cry', 1, 1], ['tear up', 2, 1], ['keen', 4, 2, { g: 'wail' }], ['whine', 2, 3], ['lament', 4, 3], ['boo-hoo', 3, 2], ['mewl', 4, 3], ['pule', 5, 4],
    ['cry one\'s eyes out', 2, 1], ['well up', 3, 2], ['break down', 2, 2], ['squall', 4, 3, { g: 'cry' }], ['yowl', 3, 3], ['greet', 5, 4, { reg: ['UK'], g: 'cry' }],
    ['snuffle', 3, 3], ['shed tears', 2, 1], ['ugly cry', 2, 1], ['burst into tears', 2, 1], ['choke up', 3, 2],
  ]),
  ways_of_breathing: [
    ['inhale', 2, 1, verb()], ['exhale', 2, 1, verb()], ['pant', 2, 1, verb()], ['gasp', 2, 1, verb()], ['wheeze', 2, 2, verb()], ['sigh', 1, 2, verb()], ['puff', 2, 2, verb()],
    ['huff', 3, 2, verb()], ['hyperventilate', 3, 1, verb()], ['gulp', 2, 3, verb()], ['snort', 2, 3, verb({ g: 'noise' })], ['sniff', 1, 3, verb()], ['breathe in', 2, 1, verb()],
    ['breathe out', 1, 1, verb()], ['deep breath', 1, 1], ['rasp', 3, 3, verb({ g: 'harsh sound' })], ['hold breath', 1, 1, verb()], ['belly breathing', 3, 2],
    ['box breathing', 3, 2], ['nose breathing', 3, 3], ['mouth breathing', 3, 2], ['shallow breathing', 3, 2], ['labored breathing', 3, 2, { al: [['laboured breathing', 'spelling', 3, 2, ['UK']]] }],
    ['breathless', 2, 3, adj()], ['4-7-8 breathing', 4, 3], ['alternate nostril', 4, 3], ['pursed lip breathing', 4, 3], ['Cheyne-Stokes', 5, 4], ['respire', 4, 3, verb()],
    ['snuffle', 3, 4, verb()], ['blow', 1, 4, verb()], ['heave', 3, 4, verb()], ['draw breath', 3, 2, verb()], ['catch breath', 2, 2, verb()], ['lungful', 4, 3],
    ['pranayama', 5, 3, { sens: true }], ['Kussmaul breathing', 5, 4], ['rebreathe', 5, 4, verb()], ['gasp for air', 2, 1, verb()],
  ],
  body_positions: [
    ['standing', 1, 1, adj()], ['sitting', 1, 1, adj()], ['lying', 1, 1, { g: 'position', pos: 'adjective' }], ['kneeling', 1, 1, adj()], ['crouching', 2, 1, adj()], ['squatting', 2, 1, adj()],
    ['slouching', 2, 1, adj()], ['reclining', 3, 1, adj()], ['sprawling', 3, 1, adj()], ['curled up', 2, 1, adj()], ['cross-legged', 2, 1, adj()],
    ['fetal position', 3, 1, { al: [['foetal position', 'spelling', 3, 1, ['UK']]] }], ['lotus position', 3, 2], ['prone', 4, 2, adj()],
    ['supine', 4, 2, adj()], ['upright', 2, 2, adj()], ['on all fours', 3, 1, adj()], ['hunched', 3, 2, adj()], ['perched', 3, 3, adj()], ['recumbent', 5, 3, adj()], ['crossed arms', 2, 2],
    ['hands on hips', 3, 2], ['at attention', 2, 2], ['at ease', 3, 2], ['leaning', 1, 2, adj()], ['recovery position', 3, 2], ['spread-eagle', 4, 2, adj()], ['bent over', 2, 2, adj()],
    ['arms akimbo', 4, 3], ['headstand', 3, 3], ['handstand', 2, 3], ['stooped', 3, 3, adj()], ['seated', 2, 1, adj()], ['kneel-sitting', 4, 3],
    ['Trendelenburg', 5, 4, { type: 'proper' }], ['Fowler\'s position', 5, 4, { type: 'proper' }],
  ],
  mouth_actions: vs([
    ['kiss', 1, 1], ['lick', 1, 1], ['bite', 1, 1], ['chew', 1, 1], ['swallow', 1, 1, { g: 'throat' }], ['suck', 1, 2], ['spit', 1, 1], ['blow', 1, 2], ['whistle', 1, 2, { g: 'with lips' }], ['smile', 1, 2], ['yawn', 1, 2],
    ['nibble', 2, 1], ['gnaw', 3, 1], ['sip', 1, 1], ['gulp', 1, 1], ['munch', 2, 1], ['gargle', 2, 1], ['slurp', 2, 1], ['taste', 1, 2], ['pucker', 3, 2], ['pout', 2, 3], ['hum', 1, 3],
    ['gnash', 4, 2], ['grind teeth', 3, 2], ['clench jaw', 3, 2], ['lap', 3, 3, { g: 'drink' }], ['chomp', 2, 2], ['gobble', 2, 2], ['snarl', 2, 3, { g: 'growl' }], ['mouth', 2, 3, { g: 'say silently' }],
    ['drool', 2, 2], ['dribble', 3, 3], ['gum', 4, 3], ['smack', 2, 3, { g: 'lips' }], ['masticate', 5, 2], ['ruminate', 5, 4], ['champ', 4, 3], ['purse', 3, 3, { g: 'lips' }],
    ['spew', 3, 3], ['salivate', 3, 2],
  ]),
  ways_of_laughing: vs([
    ['giggle', 1, 1], ['chuckle', 1, 1], ['chortle', 3, 1], ['snicker', 2, 1], ['snigger', 3, 1, { reg: ['UK'] }], ['cackle', 2, 1], ['guffaw', 3, 1], ['titter', 3, 1],
    ['howl', 2, 2, { g: 'laugh' }], ['roar', 2, 2, { g: 'laugh' }], ['hoot', 2, 2], ['snort', 2, 2, { g: 'laugh' }], ['crack up', 2, 1], ['belly laugh', 2, 1, { pos: 'noun' }], ['tee-hee', 2, 1, { pos: 'interjection' }],
    ['ha-ha', 1, 1, { g: 'laugh', pos: 'interjection' }], ['LOL', 1, 1, { type: 'acronym', pos: 'interjection' }], ['ROFL', 2, 1, { type: 'acronym', pos: 'interjection' }],
    ['burst out laughing', 2, 1], ['crease up', 3, 2, { reg: ['UK'] }], ['fall about', 3, 2, { reg: ['UK'] }],
    ['bray', 3, 3, { g: 'laugh' }], ['laugh out loud', 1, 1], ['snort laugh', 2, 1, { pos: 'noun' }], ['hee-haw', 2, 3, { pos: 'interjection' }], ['silent laugh', 3, 2, { pos: 'noun' }],
    ['nervous laugh', 2, 1, { pos: 'noun' }], ['hysterics', 3, 2, { pos: 'noun' }], ['mirth', 4, 3, { pos: 'noun' }], ['merriment', 4, 3, { pos: 'noun' }],
    ['evil laugh', 2, 1, { pos: 'noun' }], ['twitter', 3, 4, { g: 'laugh' }], ['belly shake', 3, 3, { pos: 'noun' }], ['hehe', 2, 1, { pos: 'interjection' }], ['muahaha', 3, 2, { pos: 'interjection' }],
  ]),
};

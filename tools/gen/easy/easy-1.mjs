// Easy everyday themes, list 1: things that swim / in the sky / in space, noisy things, things you ride / throw / kick / catch / write with / cut with.
// Format: tools/apply-words.mjs. Ratings: [text, familiarity, in-theme rating, opts].
export const THEMES = {
  things_that_swim: { pop: 2, ident: 3 },
  things_in_the_sky: { pop: 1, ident: 2 },
  things_in_space: { pop: 1, ident: 2 },
  noisy_things: { pop: 2, ident: 3 },
  things_you_ride: { pop: 2, ident: 3 },
  things_you_throw: { pop: 2, ident: 3 },
  things_you_kick: { pop: 2, ident: 3 },
  things_you_catch: { pop: 2, ident: 3 },
  things_you_write_with: { pop: 2, ident: 2 },
  things_you_cut_with: { pop: 2, ident: 2 },
};

export const DATA = {
  things_that_swim: [
    ['fish', 1, 1, { g: 'animal' }], ['duck', 1, 1, { g: 'bird' }], ['whale', 1, 1, { g: 'animal' }], ['dolphin', 1, 1, { g: 'sea mammal' }],
    ['shark', 1, 1, { g: 'fish' }], ['goldfish', 1, 1], ['frog', 1, 2, { g: 'amphibian' }], ['seal', 1, 2, { g: 'animal' }], ['turtle', 1, 2, { g: 'shelled reptile' }],
    ['penguin', 1, 2, { g: 'bird' }], ['swan', 1, 2], ['octopus', 1, 2, { g: 'animal' }], ['crocodile', 1, 2], ['otter', 2, 2], ['salmon', 2, 2, { g: 'fish' }],
    ['jellyfish', 2, 2], ['eel', 2, 2], ['tadpole', 2, 2], ['sea lion', 2, 2], ['trout', 2, 2], ['tuna', 2, 2], ['hippo', 1, 3], ['polar bear', 1, 3],
    ['dog', 1, 3, { g: 'pet animal' }], ['beaver', 2, 3, { g: 'dam-building rodent' }],
  ],
  things_in_the_sky: [
    ['sun', 1, 1, { g: 'star' }], ['cloud', 1, 1, { g: 'weather' }], ['plane', 1, 1, { g: 'aircraft' }], ['airplane', 1, 1], ['bird', 1, 1], ['rainbow', 1, 1, { g: 'weather' }],
    ['kite', 1, 1, { g: 'toy' }], ['moon', 1, 1, { g: 'satellite' }], ['star', 1, 1, { g: 'sky' }], ['helicopter', 1, 1], ['balloon', 1, 2, { g: 'party' }],
    ['lightning', 1, 2, { g: 'storm' }], ['hot air balloon', 1, 2], ['eagle', 1, 2, { g: 'bird' }], ['butterfly', 1, 2, { g: 'insect' }], ['fireworks', 1, 2],
    ['jet', 1, 2, { g: 'plane' }], ['drone', 2, 2, { g: 'aircraft' }], ['parachute', 2, 2], ['shooting star', 2, 2], ['bat', 1, 3, { g: 'animal' }],
    ['comet', 2, 3, { g: 'astronomy' }], ['blimp', 2, 3], ['hang glider', 2, 3], ['rocket', 2, 3, { g: 'spacecraft' }], ['aurora', 3, 3, { g: 'sky lights' }],
    ['airship', 3, 3],
  ],
  things_in_space: [
    ['sun', 1, 1, { g: 'star' }], ['moon', 1, 1, { g: 'satellite' }], ['star', 1, 1, { g: 'sky' }], ['planet', 1, 1], ['rocket', 1, 1, { g: 'spacecraft' }],
    ['astronaut', 1, 1], ['Earth', 1, 1, { g: 'planet' }], ['Mars', 1, 1, { g: 'planet' }], ['Jupiter', 1, 2, { g: 'planet' }], ['Saturn', 1, 2, { g: 'planet' }],
    ['Venus', 1, 2, { g: 'planet' }], ['comet', 2, 2, { g: 'astronomy' }], ['satellite', 2, 2, { g: 'space' }], ['asteroid', 2, 2], ['galaxy', 2, 2],
    ['black hole', 2, 2], ['Milky Way', 2, 2, { g: 'galaxy' }], ['solar system', 2, 2], ['universe', 2, 2], ['meteor', 2, 2], ['Neptune', 2, 2, { g: 'planet' }],
    ['Mercury', 2, 2, { g: 'planet' }], ['Uranus', 2, 2, { g: 'planet' }], ['nebula', 3, 3], ['Pluto', 2, 3, { g: 'dwarf planet' }], ['constellation', 2, 3],
    ['supernova', 3, 3], ['meteorite', 3, 3], ['Hubble', 3, 3, { g: 'telescope' }], ['Apollo', 3, 3, { g: 'spacecraft' }], ['pulsar', 4, 4], ['quasar', 4, 4],
  ],
  noisy_things: [
    ['siren', 2, 1, { g: 'alarm' }], ['thunder', 1, 1, { g: 'storm' }], ['drum', 1, 1, { g: 'instrument' }], ['jackhammer', 2, 1], ['alarm', 1, 1, { g: 'warning' }],
    ['fireworks', 1, 1], ['helicopter', 1, 1], ['jet', 1, 1, { g: 'plane' }], ['explosion', 1, 1], ['car horn', 1, 1], ['chainsaw', 2, 1], ['motorcycle', 1, 2],
    ['train', 1, 2, { g: 'vehicle' }], ['lawnmower', 1, 2], ['vacuum cleaner', 1, 2], ['trumpet', 1, 2, { g: 'instrument' }], ['bulldozer', 2, 2],
    ['crowd', 1, 2, { g: 'people' }], ['baby', 1, 2, { g: 'infant' }], ['megaphone', 2, 2], ['cymbals', 2, 2], ['gong', 2, 2, { g: 'instrument' }],
    ['drill', 1, 2, { g: 'tool' }], ['fire truck', 1, 2], ['ambulance', 1, 2], ['rocket', 1, 2, { g: 'spacecraft' }], ['waterfall', 1, 3], ['blender', 1, 3],
    ['volcano', 1, 3], ['tractor', 1, 3], ['generator', 2, 3], ['foghorn', 3, 2],
  ],
  things_you_ride: [
    ['bike', 1, 1], ['bicycle', 1, 1], ['horse', 1, 1, { g: 'animal' }], ['bus', 1, 1, { g: 'public vehicle' }], ['skateboard', 1, 1, { g: 'skating' }],
    ['roller coaster', 1, 1, { al: [['rollercoaster', 'spelling', 2, 2]] }], ['motorcycle', 1, 1], ['scooter', 1, 1], ['camel', 1, 2, { g: 'animal' }],
    ['train', 1, 2, { g: 'vehicle' }], ['elephant', 1, 2, { g: 'animal' }], ['donkey', 1, 2, { g: 'farm animal' }], ['pony', 1, 2, { g: 'horse' }],
    ['Ferris wheel', 1, 2], ['carousel', 1, 2, { g: 'playground' }], ['merry-go-round', 1, 2], ['taxi', 1, 2], ['subway', 1, 2, { g: 'train' }], ['tricycle', 1, 2],
    ['sled', 1, 2, { g: 'snow' }], ['surfboard', 2, 2], ['snowboard', 2, 2], ['tram', 2, 2], ['unicycle', 2, 2], ['jet ski', 2, 2], ['moped', 2, 2],
    ['go-kart', 2, 2], ['escalator', 1, 3], ['hoverboard', 2, 3], ['ferry', 2, 3], ['mule', 2, 3, { g: 'animal' }], ['sleigh', 2, 3, { g: "Santa's ride" }],
    ['tractor', 2, 3], ['rickshaw', 3, 3],
  ],
  things_you_throw: [
    ['ball', 1, 1, { g: 'toy' }], ['frisbee', 1, 1], ['dart', 1, 1, { g: 'missile' }], ['boomerang', 1, 1], ['snowball', 1, 1], ['baseball', 1, 1],
    ['javelin', 2, 1, { g: 'sport' }], ['discus', 2, 2, { g: 'sport' }], ['shot put', 2, 2, { g: 'ball' }], ['spear', 1, 2], ['stone', 1, 2, { g: 'rock' }],
    ['rock', 1, 2, { g: 'stone' }], ['paper airplane', 1, 2], ['grenade', 1, 2], ['basketball', 1, 2], ['softball', 2, 2], ['water balloon', 1, 2],
    ['confetti', 1, 2], ['lasso', 2, 3], ['hammer', 2, 3, { g: 'athletics' }], ['tomato', 1, 3, { g: 'fruit' }], ['horseshoe', 2, 3, { g: 'horse gear' }],
    ['bouquet', 2, 3, { g: 'flowers' }], ['lifebuoy', 2, 3], ['net', 2, 4, { g: 'fishing' }],
  ],
  things_you_kick: [
    ['ball', 1, 1, { g: 'toy' }], ['can', 1, 1, { g: 'container' }], ['door', 1, 2, { g: 'house' }], ['tire', 1, 2, { g: 'wheel' }], ['stone', 1, 2, { g: 'rock' }],
    ['bucket', 1, 2, { g: 'pail' }], ['punching bag', 1, 2], ['hacky sack', 2, 2], ['pebble', 2, 3, { g: 'stone' }], ['habit', 2, 3, { g: 'routine' }],
    ['balloon', 1, 3, { g: 'party' }], ['sand', 1, 4, { g: 'sediment' }], ['leaf', 1, 4],
  ],
  things_you_catch: [
    ['ball', 1, 1, { g: 'toy' }], ['cold', 1, 1, { g: 'illness' }], ['fish', 1, 1, { g: 'animal' }], ['bus', 1, 1, { g: 'public vehicle' }],
    ['train', 1, 2, { g: 'vehicle' }], ['butterfly', 1, 2, { g: 'insect' }], ['wave', 1, 2, { g: 'water' }], ['flu', 1, 2], ['thief', 1, 2], ['frisbee', 1, 2],
    ['plane', 1, 2, { g: 'aircraft' }], ['taxi', 1, 2], ['baseball', 1, 2], ['firefly', 2, 3, { g: 'insect' }], ['snowflake', 2, 3, { g: 'ice crystal' }],
    ['mouse', 1, 3, { g: 'animal' }], ['virus', 1, 3, { g: 'biological' }], ['fever', 2, 3], ['fire', 1, 3, { g: 'flame' }], ['breath', 1, 3],
    ['crab', 1, 3, { g: 'animal' }], ['lobster', 2, 3], ['fly', 1, 3, { g: 'insect' }], ['bouquet', 2, 3, { g: 'flowers' }],
  ],
  things_you_write_with: [
    ['pen', 1, 1, { g: 'writing' }], ['pencil', 1, 1, { g: 'writing tool' }], ['crayon', 1, 1], ['marker', 1, 1, { g: 'pen' }], ['chalk', 1, 1, { g: 'for writing' }],
    ['keyboard', 1, 2, { g: 'computer' }], ['highlighter', 1, 2, { g: 'pen' }], ['quill', 2, 2, { g: 'feather pen' }], ['typewriter', 2, 2], ['felt tip', 2, 2],
    ['sharpie', 2, 3], ['laptop', 1, 3, { g: 'portable computer' }], ['computer', 1, 3, { g: 'electronic device' }], ['charcoal', 2, 3, { g: 'drawing' }],
    ['stylus', 3, 3, { g: 'gadget' }],
  ],
  things_you_cut_with: [
    ['knife', 1, 1, { g: 'cutlery' }], ['scissors', 1, 1], ['saw', 1, 1, { g: 'tool' }], ['axe', 1, 1, { g: 'tool' }], ['razor', 1, 2, { g: 'shaving tool' }],
    ['chainsaw', 1, 2], ['sword', 1, 2, { g: 'weapon' }], ['hatchet', 2, 2], ['pocketknife', 2, 2], ['shears', 2, 2], ['scalpel', 2, 2], ['clippers', 2, 2, { g: 'hair' }],
    ['cleaver', 2, 2], ['machete', 2, 2], ['hacksaw', 2, 2], ['lawnmower', 1, 3], ['laser', 2, 3, { g: 'beam' }], ['chisel', 2, 3], ['guillotine', 2, 3, { g: 'execution device' }],
    ['hedge trimmer', 2, 3], ['jigsaw', 2, 3, { g: 'saw' }], ['dagger', 2, 3, { g: 'weapon' }], ['cheese slicer', 2, 3], ['blade', 2, 3, { g: 'cutting edge' }],
    ['sickle', 3, 3], ['scythe', 3, 3], ['cutlass', 3, 3], ['katana', 3, 3],
  ],
};

export const ALIASES = [
  ['things_you_cut_with', 'axe', 'tool', [['ax', 'spelling', 2, 2, ['US']]]],
];

export const GROUPS = [
  ['things_in_the_sky', 'airplane', 'plane|aircraft'],
  ['things_you_ride', 'bike', 'bicycle'],
  ['things_you_ride', 'carousel|playground', 'merry-go-round'],
  ['things_you_throw', 'stone|rock', 'rock|stone'],
  ['things_you_write_with', 'marker|pen', 'felt tip'],
];

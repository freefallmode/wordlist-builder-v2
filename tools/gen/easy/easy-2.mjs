// Easy everyday themes, list 2: things you eat with a spoon, things with wings / a tail / batteries,
// in a school bag / pencil case / toy box / toolbox / pocket, on a burger.
// Format: tools/apply-words.mjs. Ratings: familiarity, then in-theme rating (1 first words anyone names ... 5 peripheral).
export const THEMES = {
  things_you_eat_with_a_spoon: { pop: 1, ident: 3 },
  things_with_wings: { pop: 1, ident: 2 },
  things_with_a_tail: { pop: 1, ident: 3 },
  things_with_batteries: { pop: 2, ident: 3 },
  in_a_school_bag: { pop: 1, ident: 2 },
  in_a_pencil_case: { pop: 1, ident: 2 },
  in_a_toy_box: { pop: 1, ident: 2 },
  in_a_toolbox: { pop: 2, ident: 2 },
  in_a_pocket: { pop: 2, ident: 3 },
  on_a_burger: { pop: 1, ident: 2 },
};

export const FIXES = [];

export const DATA = {
  things_you_eat_with_a_spoon: [
    ['soup', 1, 1, { g: 'liquid dish' }], ['cereal', 1, 1], ['yogurt', 1, 1, { g: 'cultured dairy' }], ['ice cream', 1, 1, { g: 'frozen dessert' }],
    ['porridge', 1, 1, { g: 'camping' }], ['oatmeal', 1, 1, { g: 'food' }], ['pudding', 1, 2], ['custard', 2, 2, { g: 'egg dessert' }],
    ['jello', 1, 2, { tm: true, al: [['jelly', 'regional', 1, 2, ['UK', 'AU'], { g: 'dessert' }]] }],
    ['applesauce', 2, 2, { g: 'food' }], ['stew', 2, 2, { g: 'dish' }], ['chili', 2, 2, { g: 'dish' }], ['cottage cheese', 2, 3],
    ['sundae', 2, 2], ['sorbet', 2, 2], ['gelato', 2, 2], ['mousse', 2, 2, { g: 'dessert' }], ['trifle', 2, 2], ['baby food', 2, 2],
    ['risotto', 3, 4], ['flan', 3, 3, { g: 'dessert' }], ['congee', 4, 4, { g: 'rice porridge' }],
  ],

  things_with_wings: [
    ['bird', 1, 1], ['airplane', 1, 1], ['plane', 1, 1, { g: 'aircraft' }], ['bee', 1, 1, { g: 'insect' }], ['bat', 1, 2, { g: 'animal' }],
    ['angel', 1, 1, { g: 'spirit' }], ['butterfly', 1, 1, { g: 'insect' }], ['dragon', 1, 2, { g: 'creature' }], ['fly', 1, 2, { g: 'insect' }],
    ['eagle', 1, 1, { g: 'bird' }], ['owl', 1, 1], ['seagull', 1, 1], ['duck', 1, 2, { g: 'bird' }], ['fairy', 1, 1, { g: 'mythical being' }],
    ['parrot', 1, 2], ['chicken', 1, 3, { g: 'bird' }], ['penguin', 1, 4, { g: 'bird' }], ['ostrich', 1, 4],
    ['wasp', 2, 2], ['moth', 2, 2], ['dragonfly', 2, 2], ['ladybug', 2, 2], ['bumblebee', 2, 2], ['pegasus', 2, 2, { g: 'winged horse' }],
    ['hawk', 2, 2, { g: 'bird' }], ['jet', 2, 2, { g: 'plane' }], ['mosquito', 2, 3], ['cupid', 2, 2, { g: 'cherub', type: 'proper' }],
    ['glider', 3, 3, { g: 'aircraft' }], ['hornet', 3, 3], ['phoenix', 3, 2, { g: 'bird' }], ['griffin', 3, 3], ['cherub', 3, 3],
    ['locust', 3, 3, { g: 'insect' }],
  ],

  things_with_a_tail: [
    ['dog', 1, 1, { g: 'pet animal' }], ['cat', 1, 1, { g: 'pet' }], ['monkey', 1, 1, { g: 'animal' }], ['kite', 1, 2, { g: 'toy' }],
    ['comet', 1, 2, { g: 'astronomy' }], ['mermaid', 1, 1], ['fox', 1, 1], ['horse', 1, 1, { g: 'animal' }], ['cow', 1, 2, { g: 'animal' }],
    ['pig', 1, 2, { g: 'animal' }], ['mouse', 1, 1, { g: 'animal' }], ['rat', 1, 1, { g: 'animal' }], ['squirrel', 1, 1, { g: 'tree rodent' }],
    ['lion', 1, 1], ['tiger', 1, 1, { g: 'animal' }], ['fish', 1, 1, { g: 'animal' }], ['whale', 1, 2, { g: 'animal' }],
    ['dolphin', 1, 2, { g: 'sea mammal' }], ['shark', 1, 2, { g: 'fish' }], ['lizard', 1, 2, { g: 'reptile' }], ['crocodile', 1, 2],
    ['peacock', 1, 2, { g: 'bird' }], ['rabbit', 1, 2], ['kangaroo', 1, 2], ['devil', 1, 2, { g: 'evil spirit' }], ['dinosaur', 1, 2],
    ['rooster', 1, 2], ['airplane', 1, 2], ['sheep', 1, 3, { g: 'farm animal' }], ['elephant', 1, 3, { g: 'animal' }],
    ['donkey', 1, 3, { g: 'farm animal' }], ['zebra', 1, 3, { g: 'animal' }], ['giraffe', 1, 3], ['beaver', 2, 2, { g: 'dam-building rodent' }],
    ['tadpole', 2, 2], ['scorpion', 2, 2, { g: 'arachnid' }], ['lemur', 2, 3],
  ],

  things_with_batteries: [
    ['flashlight', 1, 1], ['remote control', 1, 1], ['watch', 1, 2, { g: 'wristwatch' }], ['toy car', 1, 2], ['smoke alarm', 1, 1],
    ['phone', 1, 1, { g: 'device' }], ['laptop', 1, 2, { g: 'portable computer' }], ['camera', 1, 2], ['calculator', 1, 1],
    ['tablet', 1, 2, { g: 'computer' }], ['headphones', 1, 2], ['radio', 1, 2], ['game controller', 1, 2], ['toy robot', 1, 2],
    ['alarm clock', 1, 2], ['hearing aid', 2, 2, { g: 'ear device' }], ['electric toothbrush', 2, 2], ['doorbell', 2, 2],
    ['drone', 2, 2, { g: 'gadget' }], ['smartwatch', 2, 2], ['walkie-talkie', 2, 2], ['earbuds', 2, 2], ['e-reader', 2, 3],
    ['baby monitor', 2, 3], ['power bank', 2, 3], ['lantern', 2, 3], ['night light', 2, 3], ['thermometer', 2, 3],
    ['mouse', 1, 3, { g: 'computer' }], ['electric razor', 2, 3], ['pacemaker', 3, 4],
  ],

  in_a_school_bag: [
    ['book', 1, 1], ['textbook', 1, 2], ['notebook', 1, 1, { g: 'paper' }], ['lunchbox', 1, 1], ['pencil case', 1, 1], ['homework', 1, 1],
    ['water bottle', 1, 1], ['pen', 1, 1, { g: 'writing' }], ['pencil', 1, 1, { g: 'writing tool' }], ['ruler', 1, 1, { g: 'measuring tool' }],
    ['folder', 1, 2, { g: 'paper' }], ['calculator', 1, 2], ['eraser', 1, 2], ['sandwich', 1, 2], ['apple', 1, 2, { g: 'fruit' }],
    ['snack', 1, 2, { g: 'meal' }], ['crayon', 1, 2], ['scissors', 1, 3], ['binder', 2, 2, { g: 'folder' }], ['highlighter', 2, 2, { g: 'pen' }],
    ['glue stick', 2, 2], ['tissues', 2, 3], ['sharpener', 2, 3], ['hand sanitizer', 2, 3], ['laptop', 2, 3, { g: 'portable computer' }],
    ['tablet', 2, 3, { g: 'computer' }], ['headphones', 2, 3], ['planner', 3, 3], ['permission slip', 3, 3], ['jacket', 1, 4, { g: 'coat' }],
    ['umbrella', 1, 4, { g: 'rain shield' }],
  ],

  in_a_pencil_case: [
    ['pencil', 1, 1, { g: 'writing tool' }], ['pen', 1, 1, { g: 'writing' }], ['eraser', 1, 1], ['ruler', 1, 1, { g: 'measuring tool' }],
    ['sharpener', 1, 1], ['crayon', 1, 1], ['glue stick', 2, 2], ['marker', 1, 2, { g: 'pen' }], ['highlighter', 2, 2, { g: 'pen' }],
    ['scissors', 1, 3], ['paper clip', 1, 3], ['compass', 2, 3, { g: 'drawing' }], ['protractor', 2, 3], ['felt tip', 2, 2],
    ['rubber band', 1, 4], ['calculator', 1, 4], ['tape', 1, 4, { g: 'sticky' }], ['sticky notes', 2, 4], ['set square', 3, 4],
    ['correction fluid', 3, 3],
  ],

  in_a_toy_box: [
    ['doll', 1, 1, { g: 'toy' }], ['teddy bear', 1, 1], ['blocks', 1, 1], ['puzzle', 1, 1, { g: 'jigsaw' }], ['ball', 1, 1, { g: 'toy' }],
    ['action figure', 1, 1], ['car', 1, 1, { g: 'miniature vehicle' }], ['lego', 1, 1], ['stuffed animal', 1, 1], ['marbles', 1, 2, { g: 'toy' }],
    ['yo-yo', 1, 2], ['dollhouse', 1, 2], ['puppet', 1, 2], ['train set', 1, 2], ['jump rope', 1, 3],
    ['play dough', 1, 2],
    ['rattle', 2, 2, { g: 'toy' }], ['slinky', 2, 3], ['spinning top', 2, 3], ['tea set', 2, 3], ['board game', 1, 3], ['frisbee', 1, 4], ['kazoo', 3, 4],
  ],

  in_a_toolbox: [
    ['hammer', 1, 1, { g: 'tool' }], ['screwdriver', 1, 1, { g: 'tool' }], ['pliers', 1, 1], ['wrench', 1, 1], ['tape measure', 1, 1],
    ['nail', 1, 1, { g: 'fastener' }], ['saw', 1, 1, { g: 'tool' }], ['screw', 1, 1, { g: 'fastener' }], ['drill', 1, 2, { g: 'tool' }],
    ['level', 2, 2, { g: 'tool' }], ['chisel', 2, 3], ['utility knife', 2, 3], ['sandpaper', 2, 3], ['duct tape', 2, 3], ['hacksaw', 2, 3],
    ['bolt', 2, 3, { g: 'fastener' }], ['crowbar', 2, 3], ['hex key', 3, 3], ['clamp', 3, 3], ['mallet', 3, 3, { g: 'tool' }],
    ['wire cutters', 3, 3], ['file', 3, 4, { g: 'tool' }], ['vise', 3, 4, { g: 'tool' }], ['washers', 3, 4, { g: 'hardware' }],
    ['stud finder', 4, 4], ['gloves', 1, 4], ['glue', 1, 4],
  ],

  in_a_pocket: [
    ['keys', 1, 1, { g: 'lock' }], ['coins', 1, 1, { g: 'money' }], ['phone', 1, 1, { g: 'device' }], ['tissue', 1, 1, { g: 'paper' }],
    ['wallet', 1, 2], ['gum', 1, 1, { g: 'chewing' }], ['mints', 1, 2], ['candy', 1, 2], ['money', 1, 2], ['change', 2, 2, { g: 'coins' }],
    ['handkerchief', 2, 2], ['receipt', 2, 2], ['earbuds', 2, 2], ['comb', 1, 3, { g: 'hair tool' }], ['pen', 1, 3, { g: 'writing' }],
    ['lip balm', 2, 3], ['hand sanitizer', 2, 3], ['credit card', 1, 3], ['pebble', 2, 3, { g: 'stone' }], ['lint', 3, 3],
    ['bus pass', 3, 3], ['rubber band', 2, 4],
  ],

  on_a_burger: [
    ['patty', 2, 1, { g: 'meat' }], ['cheese', 1, 1, { g: 'dairy food' }], ['lettuce', 1, 1, { g: 'vegetable' }], ['tomato', 1, 1, { g: 'fruit' }],
    ['pickle', 1, 1, { g: 'food' }], ['bun', 1, 1, { g: 'bread' }], ['ketchup', 1, 1], ['bacon', 1, 1], ['onion', 1, 1, { g: 'bulb vegetable' }],
    ['mustard', 1, 2], ['mayonnaise', 1, 2], ['avocado', 1, 3], ['mushroom', 1, 3, { g: 'fungus' }], ['bbq sauce', 2, 2], ['fried egg', 2, 3],
    ['jalapeño', 2, 3], ['onion rings', 2, 3], ['guacamole', 2, 3], ['special sauce', 2, 3], ['hot sauce', 2, 3], ['sesame seeds', 2, 3],
    ['pineapple', 1, 4], ['relish', 3, 3], ['beetroot', 2, 3],
  ],
};

export const ALIASES = [
  ['in_a_pencil_case', 'eraser', '', [['rubber', 'regional', 2, 2, ['UK'], { g: 'eraser' }]]],
];

export const GROUPS = [
  ['things_you_eat_with_a_spoon', 'porridge|camping', 'oatmeal|food'],
  ['things_with_wings', 'airplane', 'plane|aircraft'],
  ['things_with_wings', 'bee|insect', 'bumblebee'],
  ['in_a_pocket', 'coins|money', 'change|coins'],
];

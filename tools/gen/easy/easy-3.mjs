// Easy everyday themes, batch 3 (food on toast, zoo animals, four-legged and egg-laying and tree animals, red and yellow fruits, green vegetables, finger foods, dinner foods).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
// Existing words are reused with their existing meaning labels so they are only linked.

export const THEMES = {
  on_toast: { pop: 2, ident: 2 },
  zoo_animals: { pop: 1, ident: 2 },
  four_legged_animals: { pop: 2, ident: 3 },
  egg_laying_animals: { pop: 2, ident: 3 },
  tree_dwelling_animals: { pop: 2, ident: 2 },
  red_fruits: { pop: 2, ident: 2 },
  yellow_fruits: { pop: 2, ident: 2 },
  green_vegetables: { pop: 2, ident: 2 },
  finger_foods: { pop: 2, ident: 3 },
  dinner_foods: { pop: 1, ident: 2 },
};

export const DATA = {
  on_toast: [
    ['butter', 1, 1], ['jam', 1, 1, { g: "preserve" }], ['honey', 1, 1, { g: "food" }], ['peanut butter', 1, 1], ['avocado', 1, 2], ['beans', 1, 2], ['egg', 1, 1, { g: "food from hens" }], ['marmalade', 2, 1], ['cheese', 1, 2, { g: "dairy food" }], ['Marmite', 2, 2], ['Vegemite', 2, 3], ['Nutella', 1, 2], ['mushroom', 1, 3, { g: "fungus" }], ['bacon', 1, 3], ['margarine', 2, 2], ['cream cheese', 1, 2], ['hummus', 2, 3], ['lemon curd', 3, 3], ['sardines', 2, 4, { g: "canned" }], ['smoked salmon', 2, 3], ['almond butter', 3, 3], ['tomato', 1, 3, { g: "fruit" }], ['cinnamon', 2, 4, { g: "spice" }],
  ],
  zoo_animals: [
    ['lion', 1, 1], ['elephant', 1, 1, { g: "animal" }], ['giraffe', 1, 1], ['monkey', 1, 1, { g: "animal" }], ['penguin', 1, 1, { g: "bird" }], ['zebra', 1, 1, { g: "animal" }], ['panda', 1, 1, { g: "animal" }], ['tiger', 1, 1, { g: "animal" }], ['bear', 1, 2, { g: "animal" }], ['hippo', 1, 2], ['rhinoceros', 1, 2, { g: 'animal' }], ['gorilla', 1, 1], ['chimpanzee', 1, 2], ['kangaroo', 1, 2], ['crocodile', 1, 2], ['flamingo', 1, 2], ['camel', 1, 2, { g: "animal" }], ['polar bear', 1, 2], ['leopard', 1, 2, { g: "big cat" }], ['cheetah', 1, 2, { g: "animal" }], ['koala', 1, 2], ['orangutan', 2, 2], ['seal', 1, 3, { g: "animal" }], ['snake', 1, 3, { g: "animal" }], ['parrot', 1, 3], ['meerkat', 2, 2], ['lemur', 2, 2], ['otter', 2, 3], ['tortoise', 2, 3], ['wolf', 1, 3, { g: "animal" }], ['ostrich', 1, 3], ['sloth', 2, 3, { g: "animal" }], ['red panda', 3, 3], ['okapi', 4, 4], ['tapir', 4, 4], ['komodo dragon', 3, 4], ['peacock', 2, 3, { g: "bird" }], ['hyena', 3, 3], ['toucan', 2, 3],
  ],
  four_legged_animals: [
    ['dog', 1, 1, { g: "pet animal" }], ['cat', 1, 1, { g: "pet" }], ['horse', 1, 1, { g: "animal" }], ['cow', 1, 1, { g: "animal" }], ['elephant', 1, 1, { g: "animal" }], ['lion', 1, 1], ['deer', 1, 1], ['sheep', 1, 1, { g: "farm animal" }], ['pig', 1, 1, { g: "animal" }], ['goat', 1, 1, { g: "animal" }], ['donkey', 1, 1, { g: "farm animal" }], ['tiger', 1, 1, { g: "animal" }], ['bear', 1, 2, { g: "animal" }], ['rabbit', 1, 2], ['mouse', 1, 2, { g: "animal" }], ['rat', 1, 2, { g: "animal" }], ['fox', 1, 2], ['wolf', 1, 2, { g: "animal" }], ['giraffe', 1, 2], ['zebra', 1, 2, { g: "animal" }], ['camel', 1, 2, { g: "animal" }], ['hippo', 1, 2], ['rhinoceros', 1, 2, { g: 'animal' }], ['squirrel', 1, 2, { g: "tree rodent" }], ['hamster', 1, 2], ['leopard', 1, 2, { g: "big cat" }], ['cheetah', 1, 2, { g: "animal" }], ['buffalo', 2, 3, { g: "animal" }], ['moose', 2, 3], ['hedgehog', 2, 3, { g: "animal" }], ['badger', 2, 3, { g: "animal" }], ['otter', 2, 3], ['ferret', 3, 3], ['guinea pig', 1, 2], ['llama', 2, 2], ['antelope', 3, 3, { g: "animal" }], ['wild boar', 3, 3], ['mole', 3, 4, { g: "animal" }],
  ],
  egg_laying_animals: [
    ['chicken', 1, 1, { g: "bird" }], ['duck', 1, 1, { g: "bird" }], ['goose', 1, 1], ['turtle', 1, 1, { g: "shelled reptile" }], ['snake', 1, 2, { g: "animal" }], ['frog', 1, 1, { g: "amphibian" }], ['salmon', 1, 2, { g: "fish" }], ['ostrich', 1, 1], ['platypus', 2, 3], ['butterfly', 1, 2, { g: "insect" }], ['penguin', 1, 1, { g: "bird" }], ['eagle', 1, 2, { g: "bird" }], ['robin', 1, 1, { g: "bird" }], ['owl', 1, 2], ['crocodile', 1, 2], ['lizard', 1, 2, { g: "reptile" }], ['spider', 1, 3, { g: "animal" }], ['ant', 1, 3], ['bee', 1, 3, { g: "insect" }], ['mosquito', 1, 3], ['ladybug', 1, 3], ['tortoise', 1, 2], ['toad', 1, 2, { g: "animal" }], ['goldfish', 1, 2], ['echidna', 3, 4, { g: "animal" }], ['octopus', 2, 3, { g: "animal" }], ['snail', 2, 3], ['turkey', 1, 2, { g: "bird" }], ['sparrow', 1, 2], ['parrot', 1, 2], ['hummingbird', 2, 3], ['seagull', 1, 2], ['trout', 2, 3], ['cockroach', 2, 4], ['dragonfly', 2, 3], ['newt', 3, 3], ['chameleon', 2, 3], ['gecko', 2, 3], ['dinosaur', 1, 2],
  ],
  tree_dwelling_animals: [
    ['monkey', 1, 1, { g: "animal" }], ['squirrel', 1, 1, { g: "tree rodent" }], ['koala', 1, 1], ['owl', 1, 2], ['sloth', 1, 1, { g: "animal" }], ['woodpecker', 1, 1], ['orangutan', 2, 2], ['gibbon', 3, 2], ['lemur', 2, 3], ['parrot', 1, 3], ['toucan', 2, 2], ['chameleon', 2, 3], ['bat', 1, 3, { g: "animal" }], ['sugar glider', 4, 3], ['red panda', 3, 3], ['chimpanzee', 1, 3], ['marmoset', 3, 3], ['capuchin', 3, 3], ['cockatoo', 2, 3], ['macaw', 2, 3], ['hornbill', 4, 3], ['iguana', 2, 4], ['possum', 2, 3], ['tarsier', 4, 4],
  ],
  red_fruits: [
    ['apple', 1, 1, { g: "fruit" }], ['strawberry', 1, 1, { g: "berry" }], ['cherry', 1, 1, { g: "fruit" }], ['raspberry', 1, 1], ['watermelon', 1, 2], ['cranberry', 1, 2, { g: "red berry" }], ['pomegranate', 2, 2], ['blood orange', 2, 3], ['rambutan', 3, 3], ['lychee', 2, 4], ['goji berry', 3, 4], ['lingonberry', 3, 3], ['rosehip', 3, 4], ['tomato', 1, 3, { g: "fruit" }],
  ],
  yellow_fruits: [
    ['banana', 1, 1, { g: "fruit" }], ['lemon', 1, 1, { g: "fruit" }], ['pineapple', 1, 1], ['mango', 1, 2, { g: "tropical fruit" }], ['grapefruit', 1, 3, { g: "citrus fruit" }], ['pear', 1, 3, { g: "fruit" }], ['starfruit', 2, 2], ['papaya', 2, 3], ['jackfruit', 3, 3], ['quince', 4, 3], ['plantain', 3, 3, { g: "fruit" }], ['pomelo', 3, 4], ['citron', 4, 3], ['yuzu', 4, 4], ['loquat', 4, 4], ['canary melon', 4, 3],
  ],
  green_vegetables: [
    ['broccoli', 1, 1], ['spinach', 1, 1, { g: "leafy green" }], ['peas', 1, 1], ['cucumber', 1, 2], ['lettuce', 1, 1, { g: "vegetable" }], ['cabbage', 1, 1, { g: "vegetable" }], ['kale', 2, 2], ['celery', 1, 2], ['asparagus', 2, 2], ['zucchini', 2, 2], ['brussels sprouts', 1, 1], ['leek', 2, 3], ['okra', 3, 3], ['bok choy', 3, 3], ['chard', 3, 3], ['watercress', 3, 3], ['arugula', 3, 3], ['edamame', 3, 3], ['artichoke', 3, 4, { g: "thistle vegetable" }], ['fennel', 3, 4], ['fava beans', 3, 3, { al: [['broad beans','regional',3,3,['UK']]] }], ['snow peas', 2, 3], ['runner beans', 3, 3, { reg: ["UK"] }], ['collards', 4, 4], ['sugar snap peas', 3, 3],
  ],
  finger_foods: [
    ['sandwich', 1, 1], ['pizza', 1, 1], ['french fries', 1, 1], ['potato chips', 1, 1], ['chicken wings', 1, 2], ['sushi', 2, 3, { g: "rice and fish" }], ['cheese cubes', 2, 3], ['sausage roll', 2, 2], ['popcorn', 1, 2], ['chicken nuggets', 1, 1], ['burger', 1, 1], ['hot dog', 1, 1], ['taco', 1, 2], ['spring roll', 2, 2], ['samosa', 2, 2], ['onion rings', 2, 2], ['mozzarella sticks', 3, 3], ['olives', 2, 4], ['crackers', 1, 2], ['cookie', 1, 3, { g: "biscuit" }], ['pretzel', 2, 3], ['meatballs', 1, 3], ['dumplings', 2, 3], ['empanada', 3, 3], ['nachos', 2, 2], ['cupcake', 1, 3, { g: "cake" }], ['canapé', 3, 3], ['quesadilla', 3, 3], ['falafel', 3, 3], ['corn dog', 3, 3], ['drumstick', 2, 2, { g: "chicken" }],
  ],
  dinner_foods: [
    ['spaghetti', 1, 1, { g: "long pasta" }], ['roast chicken', 1, 1], ['pizza', 1, 1], ['stew', 1, 2, { g: "dish" }], ['curry', 1, 1], ['fish and chips', 1, 2], ['taco', 1, 2], ['lasagna', 1, 1], ['steak', 1, 1], ['burger', 1, 2], ['soup', 1, 2, { g: "liquid dish" }], ['casserole', 2, 2, { g: "dish" }], ['stir-fry', 2, 2, { g: "dish" }], ['pie', 1, 3], ['meatloaf', 2, 2], ['sausage', 1, 2], ['chili', 2, 2, { g: "dish" }], ['risotto', 2, 3], ['pork chop', 2, 2], ["shepherd's pie", 2, 2], ['mac and cheese', 1, 2], ['spaghetti bolognese', 1, 2], ['fajitas', 2, 3], ['meatballs', 1, 3], ['pasta', 1, 1], ['noodles', 1, 2], ['fried rice', 1, 2], ['enchiladas', 3, 3], ['paella', 3, 3], ['schnitzel', 3, 3], ['pot roast', 3, 3, { g: 'dish' }], ['quiche', 2, 4],
  ],
};

export const GROUPS = [
  ['dinner_foods', 'stew|dish', 'casserole|dish'],
];

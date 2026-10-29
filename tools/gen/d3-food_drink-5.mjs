// Generated word data: Food & Drink depth-3 themes, chunk 5 (food properties: shells, named after people, holes, peel, canned, frozen).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const B = (o = {}) => ({ type: 'org', tm: true, ...o });

export const THEMES = {
  foods_with_shells: { d: 2 }, foods_named_after_people: { d: 4 }, foods_with_holes: { d: 3 },
  foods_you_peel: { d: 2 }, canned_foods: { d: 1 }, frozen_foods: { d: 1 },
};

export const DATA = {
  foods_with_shells: [
    ['egg', 1, 1], ['peanut', 1, 1], ['walnut', 1, 1], ['pistachio', 1, 1], ['coconut', 1, 2], ['crab', 1, 1], ['lobster', 1, 1], ['shrimp', 1, 2], ['prawn', 1, 2],
    ['almond', 1, 2], ['hazelnut', 2, 2], ['pecan', 2, 2], ['cashew', 2, 4], ['chestnut', 2, 2, { g: 'nut' }], ['brazil nut', 2, 2], ['oyster', 2, 1], ['clam', 2, 1],
    ['mussel', 2, 1], ['scallop', 2, 2], ['snail', 2, 3], ['escargot', 3, 3], ['duck egg', 2, 3], ['sunflower seed', 2, 4], ['pine nut', 2, 3], ['crayfish', 3, 2],
    ['macadamia', 3, 3], ['conch', 3, 3], ['razor clam', 3, 3], ['quail egg', 3, 3], ['pumpkin seed', 3, 4], ['whelk', 4, 3], ['cockle', 4, 3],
    ['langoustine', 4, 3], ['abalone', 4, 4], ['periwinkle', 4, 4, { g: 'sea snail' }], ['barnacle', 4, 5],
  ],

  foods_named_after_people: [
    ['sandwich', 1, 4], ['pavlova', 2, 2], ['nachos', 2, 4], ['beef Wellington', 2, 2], ['eggs Benedict', 2, 3, { al: [['eggs Benny', 'synonym', 4, 4]] }],
    ['Caesar salad', 2, 3, { al: [['Caesar', 'synonym', 3, 4, [], { g: 'salad' }]] }], ['graham cracker', 2, 3, { reg: ['US'] }], ['Earl Grey', 2, 3],
    ['Granny Smith', 2, 3], ['margherita pizza', 2, 3], ['peach melba', 3, 3], ['beef Stroganoff', 3, 3, { al: [['Stroganoff', 'synonym', 4, 4]] }],
    ['Reuben sandwich', 3, 3, { reg: ['US'] }], ['fettuccine Alfredo', 3, 3], ['lamington', 3, 3, { reg: ['AU', 'NZ'] }], ['Salisbury steak', 3, 3, { reg: ['US'] }],
    ['Cobb salad', 3, 3, { reg: ['US'] }], ['Victoria sponge', 3, 3, { reg: ['UK'] }], ['Battenberg cake', 3, 3, { reg: ['UK'], al: [['Battenburg', 'spelling', 4, 4, ['UK']]] }],
    ['General Tso chicken', 3, 4], ['carpaccio', 3, 4], ['madeleine', 3, 4], ['Shirley Temple', 3, 4, { g: 'drink' }], ['Bellini', 3, 4, { g: 'cocktail', adult: true, sens: true }],
    ['béchamel', 3, 4], ['praline', 4, 4], ['Garibaldi biscuit', 4, 4, { reg: ['UK'] }], ['crêpes Suzette', 4, 4], ['tarte Tatin', 4, 4], ['Sachertorte', 4, 4],
    ['chateaubriand', 4, 4], ['oysters Rockefeller', 4, 4], ['Melba toast', 4, 4], ['Hass avocado', 4, 4], ['Bartlett pear', 4, 4, { al: [['Williams pear', 'synonym', 4, 4, ['UK']]] }],
    ['Bramley apple', 4, 4, { reg: ['UK'] }], ['Duchess potatoes', 5, 5], ['Mornay sauce', 5, 5], ['Lady Baltimore cake', 5, 5, { reg: ['US'] }],
  ],

  foods_with_holes: [
    ['Swiss cheese', 1, 1], ['doughnut', 1, 1], ['bagel', 1, 1], ['Cheerios', 1, 1, B()], ['onion rings', 1, 3], ['macaroni', 1, 3], ['Life Savers', 2, 2, B()],
    ['pretzel', 2, 4], ['penne', 2, 3], ['crumpet', 2, 2, { reg: ['UK'] }], ['English muffin', 2, 3], ['olive', 1, 4, { g: 'fruit' }], ['Froot Loops', 2, 2, B()],
    ['Emmental', 3, 2], ['rigatoni', 3, 3], ['ziti', 3, 3], ['Jarlsberg', 3, 2], ['Polo mints', 3, 2, B({ reg: ['UK'] })], ['Hula Hoops', 3, 3, B({ reg: ['UK'] })],
    ['Gruyère', 3, 3], ['matzo', 3, 4], ['crispbread', 3, 4], ['bundt cake', 3, 3], ['cannelloni', 3, 4], ['bucatini', 4, 3], ['Maasdam', 4, 3], ['lotus root', 4, 3],
    ['cruller', 4, 3, { reg: ['US'] }], ['Ryvita', 4, 4, B({ reg: ['UK'] })], ['bublik', 5, 4], ['taralli', 5, 4],
  ],

  foods_you_peel: [
    ['banana', 1, 1], ['orange', 1, 1, { g: 'fruit' }], ['potato', 1, 2], ['carrot', 1, 2], ['onion', 1, 2], ['garlic', 1, 2], ['pineapple', 1, 2], ['apple', 1, 3, { g: 'fruit' }],
    ['hard-boiled egg', 1, 2], ['tomato', 1, 5], ['mandarin orange', 2, 2], ['tangerine', 2, 2], ['clementine', 2, 2], ['grapefruit', 2, 2], ['lemon', 2, 3],
    ['lime', 2, 3, { g: 'fruit' }], ['kiwi', 2, 2, { g: 'fruit' }], ['mango', 2, 2], ['pear', 2, 3], ['peach', 2, 3, { g: 'fruit' }], ['cucumber', 2, 3], ['ginger', 2, 3],
    ['avocado', 2, 3], ['butternut squash', 2, 3], ['sweet potato', 2, 3], ['melon', 2, 3], ['shrimp', 2, 3], ['prawn', 2, 3], ['satsuma', 3, 2], ['pomelo', 3, 3],
    ['lychee', 3, 2], ['pomegranate', 3, 3], ['papaya', 3, 3], ['turnip', 3, 3], ['parsnip', 3, 3], ['beetroot', 3, 3], ['plantain', 3, 3], ['yam', 3, 3],
    ['cantaloupe', 3, 4], ['passion fruit', 3, 4], ['shallot', 3, 3], ['rambutan', 4, 3], ['mangosteen', 4, 3], ['celeriac', 4, 3], ['cassava', 4, 3], ['jackfruit', 4, 3],
    ['kohlrabi', 4, 4], ['jicama', 4, 4], ['longan', 4, 4], ['persimmon', 4, 4], ['durian', 4, 4], ['salsify', 5, 5],
  ],

  canned_foods: [
    ['baked beans', 1, 1], ['tuna', 1, 1], ['soup', 1, 2], ['Spam', 1, 1, B({ g: 'canned meat' })], ['corn', 1, 2], ['peas', 1, 2], ['tomatoes', 1, 2], ['pineapple', 1, 2],
    ['sardines', 2, 1], ['chickpeas', 2, 2], ['kidney beans', 2, 3], ['peaches', 2, 2], ['fruit cocktail', 2, 2], ['cranberry sauce', 2, 3], ['condensed milk', 2, 3],
    ['salmon', 2, 2, { g: 'fish' }], ['chili', 2, 3, { g: 'dish' }], ['ravioli', 2, 3], ['corned beef', 2, 2], ['coconut milk', 2, 3], ['green beans', 2, 3],
    ['mushrooms', 2, 3], ['olives', 2, 3], ['pears', 2, 3], ['black beans', 2, 3], ['mandarin oranges', 2, 3], ["Campbell's", 2, 2, B({ g: 'soup' })],
    ['evaporated milk', 3, 3], ['anchovies', 3, 3], ['refried beans', 3, 3], ['lentils', 3, 4], ['water chestnuts', 3, 4], ['bamboo shoots', 3, 4], ['creamed corn', 3, 3],
    ['pumpkin puree', 3, 4], ['artichoke hearts', 3, 4], ['spaghetti hoops', 3, 3, { reg: ['UK'] }], ['luncheon meat', 3, 3], ['Chef Boyardee', 3, 3, B({ reg: ['US'] })],
    ['Vienna sausages', 4, 4], ['corned beef hash', 4, 4], ['jackfruit', 4, 5], ['Dinty Moore', 5, 5, B({ reg: ['US'] })], ['potted meat', 5, 5],
  ],

  frozen_foods: [
    ['ice cream', 1, 1], ['pizza', 1, 2], ['fish fingers', 1, 2, { reg: ['UK'], al: [['fish sticks', 'synonym', 2, 2, ['US']]] }], ['french fries', 1, 2],
    ['popsicle', 1, 1, { tm: true, reg: ['US'], al: [['ice pop', 'synonym', 3, 2]] }], ['chicken nuggets', 1, 2], ['peas', 1, 2], ['waffles', 1, 3], ['frozen yogurt', 2, 1],
    ['ice lolly', 2, 1, { reg: ['UK'] }], ['hash browns', 2, 3], ['frozen berries', 2, 2], ['spinach', 2, 3], ['corn', 1, 3], ['sorbet', 2, 2], ['gelato', 2, 2],
    ['lasagna', 2, 3], ['spring rolls', 2, 3], ['dumplings', 2, 3], ['garlic bread', 2, 3], ['mixed vegetables', 2, 3], ['Tater Tots', 2, 2, B({ reg: ['US'] })],
    ['edamame', 3, 3], ['sherbet', 3, 2, { reg: ['US'] }], ['gyoza', 3, 3], ['pot pie', 3, 3], ['Hot Pockets', 3, 3, B({ reg: ['US'] })],
    ['Magnum', 3, 2, B({ g: 'ice cream' })], ['Cornetto', 3, 2, B()], ['cookie dough', 3, 3], ['TV dinner', 3, 2, { al: [['frozen dinner', 'synonym', 2, 2]] }],
    ['puff pastry', 3, 4], ['Birds Eye', 3, 3, B({ reg: ['UK', 'US'] })], ['oven chips', 3, 3, { reg: ['UK'] }], ['Eggo', 4, 3, B({ reg: ['US'] })],
    ['Fudgsicle', 4, 3, B({ reg: ['US'] })], ["Dippin' Dots", 4, 4, B({ reg: ['US'] })], ['Viennetta', 4, 4, B({ reg: ['UK'] })], ['Klondike bar', 4, 4, B({ reg: ['US'] })],
    ['croquettes', 4, 4], ['pierogi', 4, 4], ['Arctic roll', 5, 4, { reg: ['UK'] }], ['Findus', 5, 5, B({ reg: ['UK'] })],
  ],
};

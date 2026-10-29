// Generated word data: Food & Drink depth-3 themes, chunk 4 (coffee drinks ... foods on a stick).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
// Alcohol themes (cocktails, wines, beers, spirits) are flagged adult + sensitive on the theme, so their words inherit that.
const v = (o = {}) => ({ pos: 'verb', ...o });
const B = (o = {}) => ({ type: 'org', tm: true, ...o });
const P = (o = {}) => ({ type: 'proper', ...o });

export const THEMES = {
  coffee_drinks: { d: 2 }, soft_drinks: { d: 1 }, juices: { d: 1 }, asian_drinks: { d: 3 }, cocktails: { d: 3 }, wines: { d: 4 }, beers: { d: 3 }, spirits: { d: 2 },
  cooking_methods: { d: 1 }, ways_to_cut_food: { d: 3 }, cookware: { d: 2 }, kitchen_utensils: { d: 1 }, ways_to_preserve_food: { d: 3 }, in_the_pantry: { d: 2 },
  lunchbox: { d: 1 }, picnic_basket: { d: 1 }, recipe_amounts: { d: 3 }, ways_to_mix: { d: 4 }, restaurant_words: { d: 2 }, kitchen_brigade: { d: 5 },
  courses_of_a_meal: { d: 2 }, meals_of_the_day: { d: 1 }, table_setting: { d: 2 }, diner: { d: 2 }, fairground_food: { d: 1 }, ice_cream_parlor: { d: 1 },
  fermented_foods: { d: 4 }, deep_fried_foods: { d: 2 }, stuffed_foods: { d: 3 }, foods_on_a_stick: { d: 4 },
};

export const DATA = {
  coffee_drinks: [
    ['espresso', 1, 1], ['latte', 1, 1, { al: [['caffè latte', 'synonym', 3, 3]] }], ['cappuccino', 1, 1], ['americano', 2, 2], ['mocha', 2, 2],
    ['macchiato', 2, 2], ['flat white', 2, 2], ['iced coffee', 1, 1], ['black coffee', 1, 1], ['cold brew', 2, 2], ['drip coffee', 2, 2], ['decaf', 2, 2], ['instant coffee', 1, 2],
    ['Irish coffee', 2, 2, { adult: true, sens: true }], ['Turkish coffee', 3, 3], ['café au lait', 3, 3], ['cortado', 3, 3], ['affogato', 3, 3], ['frappé', 3, 3, { al: [['frappe', 'spelling', 3, 3]] }],
    ['Vietnamese coffee', 3, 3], ['café con leche', 4, 4], ['ristretto', 4, 4], ['lungo', 4, 4], ['doppio', 4, 4], ['red eye', 4, 4, { g: 'coffee' }], ['long black', 4, 4, { reg: ['AU', 'NZ'] }],
    ['mochaccino', 4, 4], ['piccolo', 5, 5, { g: 'coffee' }], ['cortadito', 5, 5], ['breve', 5, 5, { g: 'coffee' }],
  ],

  soft_drinks: [
    ['cola', 1, 1], ['lemonade', 1, 1], ['root beer', 2, 2, { reg: ['US'] }], ['ginger ale', 2, 2], ['orange soda', 1, 1], ['diet cola', 1, 1], ['grape soda', 2, 2], ['cherry cola', 2, 2],
    ['lemon-lime soda', 2, 2], ['Coca-Cola', 1, 1, B({ al: [['Coke', 'synonym', 1, 1]] })], ['Pepsi', 1, 1, B()], ['Sprite', 1, 2, B()], ['Fanta', 2, 2, B()], ['7 Up', 2, 2, B()],
    ['Dr Pepper', 2, 2, B()], ['Mountain Dew', 2, 2, B()], ['tonic water', 2, 3], ['club soda', 3, 3, { reg: ['US'] }], ['cream soda', 3, 3], ['ginger beer', 3, 3], ['Schweppes', 3, 3, B()],
    ['Orangina', 4, 4, B()], ['Irn-Bru', 4, 3, B({ reg: ['UK'] })], ['Vimto', 4, 3, B({ reg: ['UK'] })], ['sarsaparilla', 4, 4], ['birch beer', 4, 4, { reg: ['US'] }], ['Ramune', 4, 4, B()],
    ['Squirt', 4, 4, B({ g: 'soda' })], ['Tizer', 5, 5, B({ reg: ['UK'] })], ['Moxie', 5, 5, B({ g: 'soda' })], ['Inca Kola', 5, 5, B()],
  ],

  juices: [
    ['orange juice', 1, 1, { al: [['OJ', 'synonym', 3, 3, ['US']]] }], ['apple juice', 1, 1], ['grape juice', 1, 1], ['pineapple juice', 1, 1], ['cranberry juice', 1, 1], ['lemon juice', 1, 2],
    ['tomato juice', 2, 2], ['grapefruit juice', 2, 2], ['lime juice', 2, 2], ['prune juice', 2, 2], ['carrot juice', 2, 2], ['pomegranate juice', 2, 2], ['mango juice', 2, 2], ['green juice', 2, 3],
    ['apple cider', 3, 3, { reg: ['US'] }], ['passion fruit juice', 3, 3], ['guava juice', 3, 3], ['cherry juice', 3, 3], ['celery juice', 3, 3], ['beet juice', 3, 3], ['watermelon juice', 3, 3],
    ['V8', 3, 3, B({ type: 'org' })], ['Tropicana', 3, 3, B()], ['Ocean Spray', 3, 3, B()], ['sugarcane juice', 4, 4], ['wheatgrass juice', 4, 4], ['lychee juice', 4, 4], ['açai juice', 4, 4],
    ['nectar', 3, 4, { g: 'fruit juice' }], ['noni juice', 5, 5], ['verjuice', 5, 5],
  ],

  asian_drinks: [
    ['bubble tea', 2, 2, { al: [['boba', 'synonym', 3, 3], ['pearl milk tea', 'synonym', 4, 4]] }], ['matcha', 2, 2], ['green tea', 1, 2], ['soy milk', 2, 3], ['chai', 2, 2],
    ['masala chai', 3, 3], ['mango lassi', 3, 3], ['lassi', 3, 3], ['Thai iced tea', 3, 3], ['jasmine tea', 2, 3], ['milk tea', 2, 3], ['oolong', 3, 3, { g: 'tea' }], ['Yakult', 3, 3, B()],
    ['Vietnamese coffee', 3, 3], ['teh tarik', 4, 4], ['cendol', 4, 4], ['falooda', 4, 4], ['nimbu pani', 4, 4], ['barley tea', 4, 4], ['sugarcane juice', 4, 4], ['Ramune', 4, 4, B()],
    ['dalgona coffee', 4, 4], ['Hong Kong milk tea', 4, 4, P({ type: 'common' })], ['aloe vera drink', 4, 4], ['sikhye', 5, 5], ['jaljeera', 5, 5], ['thandai', 5, 5], ['Calpis', 5, 5, B()],
    ['chrysanthemum tea', 5, 5], ['amazake', 5, 5], ['Pocari Sweat', 5, 5, B()],
  ],

  cocktails: [
    ['margarita', 1, 1, { g: 'cocktail' }], ['mojito', 1, 1], ['martini', 1, 1], ['cosmopolitan', 2, 2, { g: 'cocktail' }], ['daiquiri', 2, 2], ['old fashioned', 2, 2], ['manhattan', 2, 2, { g: 'cocktail' }],
    ['piña colada', 2, 2, { al: [['pina colada', 'spelling', 2, 2]] }], ['Bloody Mary', 2, 2, P()], ['mimosa', 2, 2, { g: 'cocktail' }], ['sangria', 2, 2], ['Moscow Mule', 2, 2, P()],
    ['Tequila Sunrise', 2, 2, P()], ['White Russian', 2, 2, P()], ['screwdriver', 2, 2, { g: 'cocktail' }], ['espresso martini', 2, 2], ['Aperol spritz', 3, 3, B({ type: 'common' })],
    ['whiskey sour', 3, 3], ['negroni', 3, 3], ['mai tai', 3, 3], ['gimlet', 3, 3], ['Tom Collins', 3, 3, P()], ['Cuba libre', 3, 3], ['caipirinha', 3, 3], ['mint julep', 3, 3], ['bellini', 3, 3],
    ['Black Russian', 3, 3, P()], ['Long Island Iced Tea', 3, 3, P()], ['sex on the beach', 3, 3, { type: 'phrase' }], ['sidecar', 4, 4, { g: 'cocktail' }], ['sazerac', 4, 4],
    ['Singapore Sling', 4, 4, P()], ['paloma', 4, 4, { g: 'cocktail' }], ['grasshopper', 4, 4, { g: 'cocktail' }], ['zombie', 4, 4, { g: 'cocktail' }], ['hurricane', 4, 4, { g: 'cocktail' }],
    ['boulevardier', 5, 5], ['vesper', 5, 5, { g: 'cocktail' }], ['aviation', 5, 5, { g: 'cocktail' }], ['gibson', 5, 5, { g: 'cocktail' }], ['rob roy', 5, 5],
  ],

  wines: [
    ['red wine', 1, 1], ['white wine', 1, 1], ['rosé', 2, 2, { g: 'wine', al: [['rose wine', 'synonym', 2, 2]] }], ['sparkling wine', 2, 2], ['champagne', 1, 2], ['prosecco', 3, 2], ['cava', 3, 3, { g: 'wine' }],
    ['mulled wine', 2, 3], ['house wine', 2, 2], ['table wine', 3, 3], ['dessert wine', 3, 3], ['fortified wine', 3, 3], ['port', 3, 3, { g: 'wine' }], ['sherry', 3, 3, { g: 'wine' }],
    ['merlot', 2, 2], ['chardonnay', 2, 2], ['pinot noir', 2, 2], ['cabernet sauvignon', 2, 2], ['sauvignon blanc', 2, 2], ['riesling', 3, 3], ['Chianti', 3, 3, P()], ['Bordeaux', 3, 3, P()],
    ['Burgundy', 3, 3, P({ g: 'wine' })], ['Rioja', 3, 3, P()], ['malbec', 3, 3], ['shiraz', 3, 3], ['zinfandel', 3, 3], ['pinot grigio', 3, 3], ['Beaujolais', 4, 4, P()], ['Chablis', 4, 4, P()],
    ['Barolo', 4, 4, P()], ['Lambrusco', 4, 4, P()], ['madeira', 4, 4, { g: 'wine' }], ['marsala', 4, 4, { g: 'wine' }], ['ice wine', 4, 4], ['orange wine', 4, 4], ['retsina', 4, 4], ['vinho verde', 4, 4],
    ['Sauternes', 5, 5, P()], ['Tokaji', 5, 5, P()], ['Amarone', 5, 5, P()], ['vin santo', 5, 5],
  ],

  beers: [
    ['lager', 1, 1], ['ale', 2, 1, { g: 'beer' }], ['stout', 2, 2, { g: 'beer' }], ['IPA', 2, 2, { type: 'acronym' }], ['pale ale', 2, 2], ['pilsner', 2, 2, { al: [['pils', 'synonym', 4, 4]] }],
    ['light beer', 2, 2], ['craft beer', 2, 2], ['Guinness', 1, 2, B()], ['Heineken', 1, 2, B()], ['Budweiser', 1, 2, B()], ['Corona', 1, 2, B({ g: 'beer' })], ['Stella Artois', 2, 3, B()],
    ['Carlsberg', 2, 3, B()], ['Coors', 2, 3, B()], ['Miller', 2, 3, B({ g: 'beer' })], ['porter', 3, 3, { g: 'beer' }], ['wheat beer', 3, 3], ['amber ale', 3, 3], ['brown ale', 3, 3], ['shandy', 3, 3],
    ['bitter', 3, 3, { g: 'beer', reg: ['UK'] }], ['real ale', 3, 3, { reg: ['UK'] }], ['Foster\'s', 3, 3, B({ g: 'beer' })], ['Asahi', 3, 3, B()], ['Sapporo', 3, 3, B()], ['Modelo', 3, 3, B()],
    ['Blue Moon', 3, 3, B({ g: 'beer' })], ['Peroni', 3, 3, B()], ['hefeweizen', 4, 4], ['bock', 4, 4], ['sour beer', 4, 4], ['Tsingtao', 4, 4, B()], ['Kirin', 4, 4, B({ g: 'beer' })],
    ['Pabst', 4, 4, B()], ['Singha', 4, 4, B()], ['malt liquor', 4, 4, { reg: ['US'] }], ['lambic', 5, 5], ['gose', 5, 5], ['saison', 5, 5], ['tripel', 5, 5], ['kölsch', 5, 5, P({ type: 'common' })],
    ['Chimay', 5, 5, B()],
  ],

  spirits: [
    ['vodka', 1, 1], ['whisky', 2, 2, { al: [['whiskey', 'spelling', 2, 2, ['US', 'IE']]] }], ['gin', 2, 2, { g: 'drink' }], ['rum', 1, 2, { g: 'drink' }], ['tequila', 2, 2], ['brandy', 2, 2],
    ['bourbon', 2, 2], ['scotch', 2, 2, { g: 'whisky', al: [['Scotch whisky', 'synonym', 2, 2]] }], ['cognac', 3, 2], ['mezcal', 3, 3], ['moonshine', 3, 3], ['ouzo', 3, 3], ['soju', 3, 3],
    ['white rum', 2, 2], ['dark rum', 2, 2], ['spiced rum', 2, 2], ['single malt', 3, 3], ['rye', 3, 3, { g: 'whiskey' }], ['Jack Daniel\'s', 2, 3, B()], ['Smirnoff', 2, 3, B()], ['Bacardi', 2, 3, B()],
    ['Johnnie Walker', 3, 3, B()], ['Jameson', 3, 3, B()], ['Absolut', 3, 3, B()], ['Grey Goose', 3, 3, B()], ['Hennessy', 3, 3, B()], ['Captain Morgan', 3, 3, B()], ['Jim Beam', 3, 3, B()],
    ['grappa', 4, 4], ['raki', 4, 4], ['pisco', 4, 4], ['cachaça', 4, 4, { al: [['cachaca', 'spelling', 4, 4]] }], ['calvados', 4, 4], ['eau de vie', 4, 4, { type: 'phrase' }],
    ['aquavit', 5, 5], ['armagnac', 5, 5], ['arak', 5, 5], ['genever', 5, 5], ['shochu', 5, 5], ['slivovitz', 5, 5], ['kirsch', 5, 5], ['poitín', 5, 5],
  ],

  cooking_methods: [
    ['bake', 1, 1, v()], ['boil', 1, 1, v()], ['fry', 1, 1, v()], ['roast', 1, 1, v()], ['grill', 1, 1, v()], ['toast', 1, 2, v({ g: 'cook' })], ['microwave', 1, 2, v({ g: 'cook' })], ['barbecue', 1, 1, v()],
    ['steam', 2, 1, v()], ['simmer', 2, 1, v()], ['poach', 3, 2, v()], ['broil', 2, 2, v({ reg: ['US'] })], ['stir-fry', 2, 2, v({ g: 'cook' })], ['deep-fry', 2, 2, v()], ['pan-fry', 2, 2, v()], ['stew', 2, 2, v({ g: 'cook' })],
    ['scramble', 2, 3, v()], ['air fry', 2, 2, v()], ['slow cook', 2, 2, v()], ['pressure cook', 3, 3, v()], ['braise', 3, 2, v()], ['sauté', 3, 2, v()], ['sear', 3, 3, v()], ['smoke', 2, 3, v({ g: 'food' })],
    ['griddle', 3, 3, v()], ['caramelize', 3, 3, v()], ['chargrill', 3, 3, v()], ['pot roast', 3, 3, v({ g: 'cook' })], ['blanch', 4, 3, v()], ['flambé', 4, 4, v()], ['parboil', 4, 4, v()], ['coddle', 4, 4, v()],
    ['spit-roast', 4, 4, v()], ['sous vide', 5, 5, { type: 'phrase' }], ['confit', 5, 5], ['en papillote', 5, 5, { type: 'phrase' }],
  ],

  ways_to_cut_food: [
    ['slice', 1, 1, v()], ['dice', 2, 1, v()], ['chop', 1, 1, v()], ['mince', 2, 2, v({ g: 'chop finely' })], ['peel', 1, 2, v()], ['carve', 2, 2, v()], ['shred', 2, 2, v()], ['grate', 2, 2, v()],
    ['cube', 2, 2, v()], ['quarter', 2, 2, v({ g: 'cutting' })], ['halve', 2, 2, v()], ['core', 2, 3, v({ g: 'fruit' })], ['trim', 2, 3, v()], ['julienne', 4, 3, v()], ['fillet', 3, 3, v()],
    ['score', 3, 3, v({ g: 'cutting' })], ['debone', 3, 3, v()], ['shave', 3, 3, v({ g: 'cutting' })], ['shuck', 3, 3, v()], ['zest', 3, 3, { g: 'citrus peel' }], ['devein', 4, 4, v()], ['spiralize', 4, 4, v()],
    ['butterfly', 4, 4, v({ g: 'cutting' })], ['hull', 4, 4, v({ g: 'fruit' })], ['bias cut', 4, 4], ['segment', 4, 4, v({ g: 'citrus' })], ['pare', 3, 3, v()], ['chiffonade', 5, 5], ['brunoise', 5, 5],
    ['batonnet', 5, 5], ['spatchcock', 5, 5, v()], ['rondelle', 5, 5], ['paysanne', 5, 5],
  ],

  cookware: [
    ['frying pan', 1, 1, { al: [['skillet', 'synonym', 2, 2, ['US']]] }], ['saucepan', 1, 1], ['pot', 1, 1, { g: 'cookware' }], ['wok', 2, 2], ['stockpot', 3, 3], ['Dutch oven', 2, 2, { g: 'cast iron pot' }],
    ['casserole dish', 2, 2], ['baking tray', 2, 2, { al: [['baking sheet', 'synonym', 2, 2, ['US']]] }], ['roasting pan', 2, 2, { al: [['roasting tin', 'synonym', 3, 3, ['UK']]] }],
    ['pressure cooker', 2, 2], ['slow cooker', 2, 2], ['rice cooker', 2, 2], ['air fryer', 2, 2], ['muffin tin', 2, 2], ['cake tin', 2, 2, { reg: ['UK'], al: [['cake pan', 'synonym', 2, 2, ['US']]] }],
    ['loaf pan', 2, 2], ['pie dish', 2, 2], ['cast iron pan', 3, 2], ['griddle pan', 3, 3], ['sauté pan', 3, 3], ['steamer', 3, 3, { g: 'cookware' }], ['tagine', 3, 3, { g: 'cookware' }], ['ramekin', 3, 3],
    ['springform pan', 3, 3], ['Crock-Pot', 3, 3, B({ g: 'slow cooker' })], ['paella pan', 4, 4], ['double boiler', 4, 4, { al: [['bain-marie', 'synonym', 4, 4]] }], ['bundt pan', 4, 4], ['terrine', 4, 4, { g: 'dish' }],
    ['karahi', 5, 5], ['tava', 5, 5], ['cocotte', 5, 5], ['sauteuse', 5, 5],
  ],

  kitchen_utensils: [
    ['spatula', 1, 1], ['whisk', 1, 1, { g: 'utensil' }], ['ladle', 1, 1], ['tongs', 1, 1], ['peeler', 1, 1], ['grater', 1, 1], ['rolling pin', 1, 1], ['can opener', 1, 1, { al: [['tin opener', 'synonym', 2, 2, ['UK']]] }],
    ['wooden spoon', 1, 1], ['measuring cup', 1, 1], ['measuring spoon', 1, 1], ['cutting board', 1, 1, { al: [['chopping board', 'synonym', 2, 2, ['UK']]] }], ['colander', 2, 2], ['sieve', 2, 2, { g: 'utensil' }],
    ['corkscrew', 2, 2], ['potato masher', 3, 3], ['slotted spoon', 2, 2], ['garlic press', 2, 2], ['pizza cutter', 2, 2], ['cookie cutter', 2, 2], ['paring knife', 2, 2], ['bread knife', 2, 2],
    ['oven mitt', 2, 2], ['ice cream scoop', 2, 2], ['nutcracker', 2, 3], ['pastry brush', 3, 3], ['melon baller', 3, 3], ['apple corer', 3, 3], ['salad spinner', 3, 3], ['egg slicer', 3, 3],
    ['pastry cutter', 3, 3], ['funnel', 3, 3], ['zester', 3, 3], ['mandoline', 4, 4], ['skimmer', 4, 4], ['ricer', 4, 4], ['baster', 4, 4], ['trivet', 4, 4], ['bench scraper', 4, 4],
    ['fish slice', 4, 4, { reg: ['UK'] }], ['Microplane', 4, 4, B({ type: 'org' })], ['offset spatula', 5, 5], ['mezzaluna', 5, 5], ['chinois', 5, 5], ['splatter guard', 5, 5],
  ],

  ways_to_preserve_food: [
    ['smoke', 2, 2, v({ g: 'food' })], ['salt', 1, 2, v({ g: 'preserve' })], ['pickle', 2, 2, v()], ['can', 2, 2, v({ g: 'preserve' })], ['freeze', 1, 1, v()], ['dry', 1, 2, v({ g: 'food' })], ['cure', 3, 3, v({ g: 'food' })],
    ['ferment', 3, 3, v()], ['refrigerate', 1, 2, v()], ['chill', 1, 3, v()], ['dehydrate', 3, 3, v()], ['vacuum seal', 3, 3, v()], ['brine', 3, 3, v()], ['sun-dry', 3, 3, v()], ['freeze-dry', 3, 3, v()],
    ['pasteurize', 3, 3, v()], ['bottle', 3, 3, v({ g: 'preserve' })], ['air-dry', 3, 3, v()], ['salt-cure', 3, 3, v()], ['jerk', 4, 4, v({ g: 'meat' })], ['dry-age', 4, 4, v()], ['kipper', 4, 4, v({ g: 'fish' })],
    ['confit', 5, 4], ['souse', 5, 5, v()], ['irradiate', 5, 5, v()], ['lacto-ferment', 5, 5, v()], ['corn', 5, 5, v({ g: 'meat' })],
  ],

  in_the_pantry: [
    ['flour', 1, 1], ['sugar', 1, 1], ['salt', 1, 1, { g: 'seasoning' }], ['rice', 1, 1], ['pasta', 1, 1], ['cereal', 1, 1], ['oats', 1, 1], ['honey', 1, 1], ['jam', 1, 1], ['peanut butter', 1, 1],
    ['olive oil', 1, 1], ['vinegar', 1, 2], ['noodles', 1, 1], ['canned tomatoes', 2, 2, { al: [['tinned tomatoes', 'synonym', 2, 2, ['UK']]] }], ['canned tuna', 1, 2], ['baking soda', 2, 2, { al: [['bicarbonate of soda', 'synonym', 3, 3, ['UK']]] }],
    ['baking powder', 2, 2], ['yeast', 2, 2], ['cornstarch', 2, 2, { al: [['cornflour', 'synonym', 3, 3, ['UK']]] }], ['lentils', 2, 2], ['dried beans', 2, 2], ['soy sauce', 2, 3], ['breadcrumbs', 2, 2],
    ['cocoa powder', 2, 2], ['vanilla extract', 2, 2], ['maple syrup', 2, 2], ['couscous', 2, 3], ['stock cube', 2, 2, { al: [['bouillon cube', 'synonym', 3, 3, ['US']]] }], ['molasses', 3, 3],
    ['quinoa', 3, 3], ['polenta', 3, 3], ['tahini', 3, 3], ['cornmeal', 3, 3], ['evaporated milk', 3, 3], ['condensed milk', 3, 3], ['gelatin', 3, 3], ['self-raising flour', 3, 3, { reg: ['UK'] }],
    ['cream of tartar', 4, 4], ['arrowroot', 4, 4], ['pectin', 4, 4], ['masa harina', 5, 5], ['agar', 5, 5, { g: 'gelling agent' }],
  ],

  lunchbox: [
    ['sandwich', 1, 1], ['apple', 1, 1, { g: 'fruit' }], ['banana', 1, 1], ['juice box', 1, 1], ['granola bar', 1, 1], ['yogurt', 1, 2], ['raisins', 1, 2], ['cookie', 1, 2], ['lunch bag', 1, 1],
    ['water bottle', 1, 2], ['ham sandwich', 1, 1], ['thermos', 2, 2], ['cheese stick', 2, 2, { al: [['string cheese', 'synonym', 2, 2, ['US']]] }], ['carrot sticks', 2, 2], ['pretzels', 2, 3],
    ['fruit snack', 2, 2], ['sandwich bag', 2, 2], ['napkin', 2, 3], ['applesauce', 2, 3], ['Capri-Sun', 2, 2, B({ type: 'org' })], ['Tupperware', 2, 3, B()], ['packed lunch', 2, 2, { reg: ['UK'] }],
    ['muffin', 2, 3], ['ice pack', 3, 3], ['Lunchables', 3, 3, B()], ['pudding cup', 3, 3], ['wrap', 3, 3, { g: 'sandwich' }], ['bento', 3, 3], ['fruit cup', 3, 3], ['trail mix', 3, 3],
    ['hard-boiled egg', 3, 3], ['PB&J', 3, 2, { type: 'acronym' }], ['Fruit Roll-Up', 3, 3, B()], ['fruit leather', 4, 4], ['lunch note', 4, 3],
  ],

  picnic_basket: [
    ['blanket', 1, 1], ['wicker basket', 1, 1], ['sandwiches', 1, 1], ['paper plates', 1, 1], ['plastic cups', 1, 1], ['napkins', 1, 2], ['cheese', 1, 2], ['grapes', 1, 2], ['watermelon', 1, 2],
    ['lemonade', 1, 2], ['cooler', 2, 2], ['bottle opener', 2, 2], ['potato salad', 2, 2], ['fried chicken', 2, 2], ['pasta salad', 2, 2], ['strawberries', 2, 2], ['tablecloth', 2, 2], ['picnic hamper', 2, 2, { reg: ['UK'] }],
    ['crackers', 2, 3], ['coleslaw', 3, 3], ['deviled eggs', 3, 3], ['sunscreen', 3, 3], ['wet wipes', 3, 3], ['sausage roll', 3, 3, { reg: ['UK'] }], ['quiche', 3, 3], ['baguette', 3, 3],
    ['corkscrew', 2, 3], ['pork pie', 4, 4, { reg: ['UK'] }], ['scotch egg', 4, 4, { reg: ['UK'] }], ['ice chest', 4, 4, { reg: ['US'] }], ['bug spray', 4, 4], ['gingham', 4, 4],
    ['cucumber sandwich', 4, 4], ['Pimm\'s', 4, 4, B({ adult: true, sens: true })], ['trash bag', 4, 4],
  ],

  recipe_amounts: [
    ['cup', 1, 1, { g: 'measure' }], ['tablespoon', 1, 1, { al: [['tbsp', 'synonym', 3, 3]] }], ['teaspoon', 1, 1, { al: [['tsp', 'synonym', 3, 3]] }], ['pinch', 2, 1], ['dash', 2, 2, { g: 'measure' }],
    ['gram', 1, 2], ['ounce', 1, 2, { al: [['oz', 'synonym', 2, 2]] }], ['pound', 1, 2, { g: 'weight', al: [['lb', 'synonym', 2, 2]] }], ['kilogram', 2, 2], ['milliliter', 3, 3, { al: [['ml', 'synonym', 2, 2]] }],
    ['liter', 2, 2], ['pint', 2, 2, { g: 'measure' }], ['quart', 2, 3], ['gallon', 2, 3], ['fluid ounce', 3, 3], ['splash', 3, 2], ['handful', 3, 2], ['drizzle', 3, 3, { g: 'amount' }], ['sprinkle', 3, 3, { g: 'amount' }],
    ['dollop', 3, 3], ['sprig', 3, 3], ['bunch', 3, 3, { g: 'amount' }], ['clove', 3, 3, { g: 'garlic' }], ['stick', 3, 4, { g: 'butter' }], ['to taste', 3, 3, { type: 'phrase' }], ['smidgen', 4, 4],
    ['knob', 4, 4, { g: 'butter', reg: ['UK'] }], ['dessertspoon', 4, 4, { reg: ['UK'] }], ['jigger', 4, 4], ['scant', 4, 4, { pos: 'adjective' }], ['heaping', 4, 4, { pos: 'adjective' }],
    ['gill', 5, 5, { g: 'measure' }], ['peck', 5, 5, { g: 'measure' }],
  ],

  ways_to_mix: [
    ['stir', 1, 1, v()], ['mix', 1, 1, v()], ['whisk', 1, 1, v({ g: 'stir' })], ['beat', 1, 2, v({ g: 'cooking' })], ['blend', 1, 1, v()], ['toss', 1, 2, v({ g: 'salad' })], ['shake', 1, 2, v({ g: 'drink' })],
    ['whip', 2, 2, v()], ['fold', 3, 3, v({ g: 'cooking' })], ['knead', 3, 3, v()], ['combine', 2, 2, v({ g: 'mix' })], ['mash', 2, 3, v()], ['swirl', 2, 3, v()], ['puree', 3, 3, v()], ['churn', 3, 3, v()],
    ['cream', 3, 3, v({ g: 'cooking' })], ['froth', 3, 3, v()], ['pulse', 3, 3, v({ g: 'blender' })], ['dissolve', 3, 3, v()], ['layer', 3, 4, v({ g: 'cooking' })], ['whizz', 3, 3, v({ reg: ['UK'] })],
    ['muddle', 4, 4, v()], ['emulsify', 4, 4, v()], ['aerate', 4, 4, v()], ['incorporate', 4, 4, v()], ['cut in', 4, 4, v({ type: 'phrase' })], ['marble', 4, 4, v({ g: 'batter' })], ['ripple', 4, 4, v()],
    ['swizzle', 4, 4, v()], ['rub in', 4, 4, v({ type: 'phrase' })], ['agitate', 5, 5, v()], ['homogenize', 5, 5, v()],
  ],

  restaurant_words: [
    ['menu', 1, 1], ['waiter', 1, 1], ['waitress', 1, 1], ['reservation', 1, 1], ['tip', 1, 2, { g: 'gratuity' }], ['bill', 1, 2, { g: 'restaurant' }], ['table', 1, 3, { g: 'restaurant' }], ['takeout', 1, 2],
    ['specials', 2, 2], ['host', 2, 3, { g: 'restaurant' }], ['hostess', 2, 3], ['kids menu', 2, 2], ['doggy bag', 2, 2], ['booth', 2, 3, { g: 'restaurant' }], ['high chair', 2, 3], ['wine list', 2, 2],
    ['server', 2, 2, { g: 'waiter' }], ['check', 2, 3, { g: 'restaurant', reg: ['US'] }], ['maître d\'', 3, 3, { al: [['maitre d\'', 'spelling', 3, 3]] }], ['sommelier', 3, 3], ['busboy', 3, 3],
    ['tasting menu', 3, 3], ['cover charge', 3, 3], ['gratuity', 3, 3], ['service charge', 3, 3], ['dress code', 3, 3], ['à la carte', 3, 3, { type: 'phrase' }], ['bar tab', 3, 3], ['walk-in', 3, 3],
    ['on the house', 3, 3, { type: 'phrase' }], ['prix fixe', 4, 4, { type: 'phrase' }], ['corkage', 4, 4], ['amuse-bouche', 4, 4], ['comp', 4, 4, { pos: 'verb', g: 'restaurant' }],
    ['table d\'hôte', 5, 5, { type: 'phrase' }], ['degustation', 5, 5], ['covers', 5, 5, { g: 'restaurant' }], ['eighty-six', 5, 5, { pos: 'verb' }],
  ],

  kitchen_brigade: [
    ['head chef', 1, 1], ['sous chef', 3, 2], ['pastry chef', 2, 2], ['line cook', 2, 2], ['executive chef', 3, 2], ['dishwasher', 2, 3, { g: 'person' }], ['prep cook', 3, 3], ['fry cook', 3, 3],
    ['grill cook', 3, 3], ['short-order cook', 3, 3], ['sushi chef', 3, 3], ['kitchen porter', 3, 3, { reg: ['UK'] }], ['baker', 2, 3], ['butcher', 2, 4, { g: 'kitchen' }], ['commis', 4, 3, { g: 'chef' }],
    ['commis chef', 4, 3], ['chef de partie', 4, 3], ['chef de cuisine', 4, 3], ['saucier', 4, 4], ['expediter', 4, 4, { al: [['expo', 'synonym', 4, 4]] }], ['pot washer', 4, 4, { reg: ['UK'] }],
    ['kitchen hand', 4, 4, { reg: ['AU', 'UK'] }], ['garde manger', 5, 5], ['rôtisseur', 5, 5], ['poissonnier', 5, 5], ['entremetier', 5, 5], ['pâtissier', 5, 5, { al: [['patissier', 'spelling', 5, 5]] }],
    ['chef tournant', 5, 5], ['aboyeur', 5, 5], ['communard', 5, 5], ['pizzaiolo', 5, 4], ['sauté cook', 4, 4], ['brigade', 4, 4, { g: 'kitchen' }],
  ],

  courses_of_a_meal: [
    ['appetizer', 1, 1, { al: [['starter', 'synonym', 1, 1, ['UK']]] }], ['main course', 1, 1, { al: [['main', 'synonym', 2, 2]] }], ['dessert', 1, 1, { al: [['sweet', 'synonym', 3, 3, ['UK'], { g: 'course' }]] }], ['pudding', 2, 2], ['afters', 3, 3],
    ['side dish', 2, 2], ['soup course', 3, 3], ['salad course', 3, 3], ['cheese course', 3, 3], ['fish course', 4, 4], ['entrée', 3, 2, { g: 'course' }], ['aperitif', 3, 3], ['digestif', 4, 4],
    ['amuse-bouche', 4, 4], ['palate cleanser', 4, 4], ['sorbet', 3, 4], ['hors d\'oeuvre', 3, 3, { al: [['hors d\'oeuvres', 'synonym', 3, 3]] }], ['canapé', 3, 3, { al: [['canape', 'spelling', 3, 3]] }],
    ['antipasto', 3, 3], ['petit fours', 4, 4], ['nightcap', 3, 4], ['primo', 4, 4, { g: 'Italian course' }], ['secondo', 4, 4, { g: 'Italian course' }], ['dolce', 4, 4, { g: 'Italian course' }],
    ['contorno', 5, 5], ['mignardises', 5, 5], ['intermezzo', 5, 4, { g: 'course' }], ['entremets', 5, 5], ['pre-dessert', 5, 4], ['coffee course', 4, 4],
  ],

  meals_of_the_day: [
    ['breakfast', 1, 1, { al: [['brekkie', 'synonym', 3, 3, ['AU', 'UK']]] }], ['brunch', 1, 1], ['lunch', 1, 1], ['dinner', 1, 1], ['supper', 2, 2], ['snack', 1, 2, { g: 'meal' }],
    ['afternoon tea', 2, 2, { reg: ['UK'] }], ['tea', 2, 3, { g: 'meal', reg: ['UK'] }], ['midnight snack', 2, 3], ['elevenses', 3, 3, { reg: ['UK'] }], ['high tea', 3, 3, { reg: ['UK'] }],
    ['cream tea', 3, 3, { reg: ['UK'] }], ['Sunday roast', 2, 3, { type: 'proper', reg: ['UK'] }], ['luncheon', 3, 3], ['tea time', 2, 3], ['morning tea', 3, 3, { reg: ['AU', 'NZ'] }],
    ['second breakfast', 4, 4], ['tiffin', 4, 4, { g: 'meal', reg: ['IN', 'UK'] }], ['sundowner', 4, 4, { g: 'drink' }], ['brinner', 4, 4], ['smoko', 5, 5, { reg: ['AU', 'NZ'] }], ['fika', 5, 5],
    ['merienda', 5, 5], ['midday meal', 3, 3],
  ],

  table_setting: [
    ['fork', 1, 1], ['knife', 1, 1, { g: 'cutlery' }], ['spoon', 1, 1], ['plate', 1, 1], ['bowl', 1, 1], ['glass', 1, 1, { g: 'drinking' }], ['napkin', 1, 1, { al: [['serviette', 'synonym', 3, 3, ['UK']]] }],
    ['placemat', 3, 3], ['tablecloth', 2, 2], ['wine glass', 2, 2], ['water glass', 2, 2], ['soup spoon', 2, 2], ['teacup', 2, 3], ['coaster', 2, 3], ['centerpiece', 2, 3], ['candle', 2, 3],
    ['salt shaker', 2, 3], ['pepper shaker', 2, 3], ['chopsticks', 2, 3], ['dinner fork', 3, 2], ['salad fork', 3, 2], ['dessert spoon', 3, 3], ['butter knife', 3, 3], ['steak knife', 3, 3],
    ['bread plate', 3, 3], ['salad plate', 3, 3], ['napkin ring', 3, 3], ['place card', 3, 3], ['saucer', 3, 3], ['table runner', 3, 3], ['gravy boat', 3, 4], ['champagne flute', 3, 3],
    ['charger', 4, 4, { g: 'plate' }], ['fish knife', 4, 4], ['cake fork', 4, 4], ['finger bowl', 4, 4], ['cruet', 4, 4], ['oyster fork', 5, 5], ['knife rest', 5, 5],
  ],

  diner: [
    ['booth', 2, 2, { g: 'restaurant' }], ['counter', 2, 2, { g: 'diner' }], ['stool', 2, 2], ['jukebox', 2, 2], ['milkshake', 1, 2], ['burger', 1, 1], ['cheeseburger', 1, 1], ['french fries', 1, 1],
    ['pancakes', 1, 1], ['hash browns', 2, 2], ['grilled cheese', 2, 2], ['apple pie', 2, 2], ['coffee pot', 2, 2], ['bottomless coffee', 3, 3], ['meatloaf', 3, 3], ['club sandwich', 3, 3],
    ['sunny side up', 3, 3, { type: 'phrase' }], ['BLT', 3, 3, { type: 'acronym' }], ['tuna melt', 3, 3], ['neon sign', 3, 3], ['checkered floor', 3, 3], ['order pad', 3, 3], ['greasy spoon', 3, 3],
    ['root beer float', 3, 3], ['ice cream soda', 3, 3], ['biscuits and gravy', 3, 3, { reg: ['US'] }], ['sugar dispenser', 3, 3], ['napkin dispenser', 3, 3], ['patty melt', 4, 4], ['short stack', 4, 4],
    ['blue plate special', 4, 4], ['over easy', 4, 4, { type: 'phrase' }], ['malted milkshake', 4, 4], ['chicken fried steak', 4, 4], ['egg cream', 5, 5], ['scrapple', 5, 5],
  ],

  fairground_food: [
    ['cotton candy', 1, 1, { al: [['candy floss', 'synonym', 1, 1, ['UK']], ['fairy floss', 'synonym', 3, 3, ['AU']]] }], ['popcorn', 1, 1], ['hot dog', 1, 1], ['candy apple', 1, 1, { al: [['toffee apple', 'synonym', 2, 2, ['UK']], ['caramel apple', 'synonym', 2, 2]] }],
    ['lemonade', 1, 2], ['ice cream cone', 1, 2], ['corn dog', 2, 2], ['funnel cake', 2, 2], ['churros', 2, 2], ['nachos', 2, 3], ['soft pretzel', 2, 3], ['snow cone', 2, 2, { al: [['shaved ice', 'synonym', 3, 3]] }],
    ['fish and chips', 2, 3], ['corn on the cob', 3, 3], ['kettle corn', 3, 2], ['turkey leg', 3, 2], ['fried dough', 3, 3], ['mini doughnuts', 3, 3], ['candied nuts', 3, 3], ['bratwurst', 3, 3],
    ['saltwater taffy', 3, 3], ['fudge', 2, 3], ['fried Oreos', 4, 3, B({ type: 'common' })], ['elephant ear', 4, 3, { g: 'pastry' }], ['fried pickles', 4, 4], ['stroopwafel', 5, 5], ['cheese curds', 5, 4],
    ['deep-fried Mars bar', 5, 4, B({ type: 'common', reg: ['UK'] })], ['tornado potato', 5, 4],
  ],

  ice_cream_parlor: [
    ['sundae', 1, 1], ['cone', 1, 1, { g: 'ice cream' }], ['scoop', 1, 1, { g: 'ice cream' }], ['sprinkles', 1, 1], ['whipped cream', 1, 1], ['vanilla', 1, 1], ['chocolate', 1, 2], ['strawberry', 1, 2],
    ['hot fudge', 2, 2], ['banana split', 2, 1], ['float', 2, 2, { g: 'ice cream' }], ['waffle cone', 2, 2], ['soft serve', 2, 2], ['frozen yogurt', 2, 2], ['milkshake', 1, 1], ['ice cream sandwich', 2, 2],
    ['topping', 2, 2, { g: 'ice cream' }], ['cherry on top', 2, 2, { type: 'phrase' }], ['sugar cone', 3, 3], ['mint chip', 3, 3], ['rocky road', 3, 3, { g: 'ice cream' }], ['cookie dough', 3, 3],
    ['pistachio', 3, 3, { g: 'flavor' }], ['cookies and cream', 3, 3], ['neapolitan', 3, 3, { g: 'ice cream' }], ['sorbet', 3, 3], ['gelato', 3, 3], ['sherbet', 3, 3], ['parfait', 3, 3],
    ['wafer', 3, 3, { g: 'ice cream' }], ['affogato', 3, 4], ['butter pecan', 4, 4], ['knickerbocker glory', 4, 3, { reg: ['UK'] }], ['rum raisin', 4, 4], ['tutti-frutti', 4, 4],
    ['jimmies', 4, 4, { reg: ['US'] }], ['hundreds and thousands', 4, 4, { reg: ['UK'] }], ['flake', 4, 4, { g: 'chocolate', reg: ['UK'] }], ['spumoni', 5, 5], ['cassata', 5, 5],
  ],

  fermented_foods: [
    ['yogurt', 1, 2, { al: [['yoghurt', 'spelling', 1, 2, ['UK']]] }], ['cheese', 1, 3], ['sourdough', 2, 3], ['sauerkraut', 2, 2], ['kimchi', 3, 2], ['miso', 3, 2], ['kombucha', 3, 2], ['kefir', 3, 3],
    ['tempeh', 3, 3], ['soy sauce', 2, 3], ['vinegar', 2, 4], ['pickles', 2, 4], ['sour cream', 2, 3], ['buttermilk', 2, 3], ['salami', 3, 4], ['fish sauce', 3, 4], ['natto', 4, 3], ['injera', 4, 4],
    ['idli', 4, 4], ['dosa', 4, 4], ['gochujang', 4, 4], ['skyr', 4, 3], ['crème fraîche', 3, 4], ['labneh', 4, 4], ['black garlic', 4, 4], ['stinky tofu', 4, 4], ['kvass', 5, 4],
    ['surströmming', 5, 4], ['garum', 5, 4], ['tepache', 5, 4], ['doenjang', 5, 5], ['fermented tofu', 5, 5],
  ],

  deep_fried_foods: [
    ['doughnut', 1, 1, { al: [['donut', 'spelling', 1, 1, ['US']]] }], ['french fries', 1, 1], ['fried chicken', 1, 1], ['onion rings', 1, 1], ['chicken nuggets', 1, 1], ['fish and chips', 2, 2],
    ['tempura', 2, 2], ['falafel', 2, 2], ['churros', 2, 2], ['corn dog', 2, 2], ['mozzarella sticks', 2, 2], ['calamari', 2, 2], ['spring roll', 2, 2], ['funnel cake', 2, 2], ['tater tots', 2, 2],
    ['popcorn chicken', 2, 2], ['hush puppies', 3, 3], ['samosa', 3, 3], ['fritter', 3, 3], ['beignet', 3, 3], ['croquette', 3, 3], ['arancini', 3, 3], ['pakora', 3, 3], ['onion bhaji', 3, 3],
    ['katsu', 3, 3], ['chimichanga', 3, 3], ['jalapeño poppers', 3, 3], ['fried pickles', 4, 4], ['fried Oreos', 4, 3, B({ type: 'common' })], ['fried ice cream', 4, 4], ['tonkatsu', 4, 4], ['crullers', 4, 4],
    ['vada', 4, 4], ['scotch egg', 4, 4, { reg: ['UK'] }], ['karaage', 5, 5], ['zeppole', 5, 5], ['sopapilla', 5, 5], ['youtiao', 5, 5],
  ],

  stuffed_foods: [
    ['burrito', 1, 1], ['dumpling', 1, 2], ['ravioli', 2, 1], ['tortellini', 2, 2], ['calzone', 3, 2], ['stuffed peppers', 2, 2], ['spring roll', 2, 3], ['taco', 1, 3], ['enchilada', 2, 3],
    ['samosa', 3, 2], ['empanada', 3, 2], ['pierogi', 3, 2], ['stuffed mushrooms', 3, 2], ['manicotti', 3, 3], ['cannelloni', 3, 3], ['gyoza', 3, 3], ['wonton', 3, 3], ['tamale', 3, 3], ['cabbage roll', 3, 3],
    ['bao', 3, 3], ['cannoli', 3, 3], ['stuffed shells', 3, 3], ['deviled eggs', 3, 3], ['arancini', 3, 3], ['jalapeño poppers', 3, 3], ['cream puff', 3, 4], ['chicken Kiev', 3, 3, P({ type: 'common' })],
    ['pasty', 2, 3, { g: 'pastry', reg: ['UK'] }], ['dolma', 4, 3], ['knish', 4, 3], ['momo', 4, 3], ['pelmeni', 4, 3], ['agnolotti', 4, 4], ['haggis', 3, 4], ['cordon bleu', 4, 4], ['scotch egg', 4, 4, { reg: ['UK'] }],
    ['manti', 5, 4], ['kreplach', 5, 4], ['involtini', 5, 4],
  ],

  foods_on_a_stick: [
    ['kebab', 1, 1], ['corn dog', 2, 1], ['lollipop', 1, 1], ['popsicle', 1, 1, { al: [['ice lolly', 'synonym', 2, 2, ['UK']], ['ice pop', 'synonym', 2, 2, ['US']]] }], ['satay', 3, 3],
    ['candy apple', 1, 1], ['shish kebab', 3, 3], ['cake pop', 2, 2], ['chicken skewers', 2, 2], ['fruit kebab', 3, 3], ['yakitori', 3, 3], ['souvlaki', 3, 2], ['kofta', 3, 3], ['chicken tikka', 3, 3],
    ['rock candy', 4, 4], ['shashlik', 4, 3], ['dango', 4, 3], ['brochette', 4, 3], ['pincho', 4, 3], ['frozen banana', 4, 4], ['pretzel rod', 4, 4], ['tanghulu', 5, 4], ['kushikatsu', 5, 4],
    ['anticuchos', 5, 4], ['espetada', 5, 4], ['sosatie', 5, 4],
  ],
};

// Words whose text is already used for another meaning: label the existing entry so both can be told apart.
export const FIXES = [
  { gloss: ['piccolo', 'instruments', 'instrument'] }, { gloss: ['screwdriver', 'hand_tools', 'tool'] }, { gloss: ['grasshopper', 'insects_and_bugs', 'insect'] },
  { gloss: ['hurricane', 'weather', 'storm'] }, { gloss: ['rye', 'pasta_rice_and_grains', 'grain'] }, { gloss: ['toast', 'breads_and_baking', 'bread'] },
  { gloss: ['butterfly', 'insects_and_bugs', 'insect'] }, { gloss: ['steamer', 'boats_and_ships', 'ship'] }, { gloss: ['tagine', 'dishes', 'dish'] },
  { gloss: ['corn', 'vegetables', 'vegetable'] }, { gloss: ['salt', 'herbs_spices_and_sauces', 'seasoning'] }, { gloss: ['drizzle', 'weather', 'rain'] },
  { gloss: ['table', 'furniture', 'furniture'] }, { gloss: ['dishwasher', 'appliances', 'appliance'] }, { gloss: ['brigade', 'military', 'military unit'] },
  { gloss: ['tea', 'hot_drinks', 'drink'] }, { gloss: ['microwave', 'appliances', 'appliance'] }, { gloss: ['stir-fry', 'dishes', 'dish'] },
  { gloss: ['stew', 'dishes', 'dish'] }, { gloss: ['pot roast', 'dishes', 'dish'] }, { gloss: ['hull', 'boats_and_ships', 'ship'] }, { gloss: ['whisk', 'cooking', 'stir'] },
];

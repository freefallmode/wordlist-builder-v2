// Generated word data: Food & Drink depth-3 themes, chunk 3 (spice blends ... teas).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const B = (o = {}) => ({ type: 'org', tm: true, ...o });
const ALC = (o = {}) => ({ adult: true, sens: true, ...o });

export const THEMES = {
  spice_blends: { d: 4 }, chili_peppers: { d: 4 }, sauces_and_condiments: { d: 2 }, dips: { d: 1 }, spreads: { d: 2 }, pickles_and_preserves: { d: 3 },
  oils_and_vinegars: { d: 2 }, soups: { d: 1 }, stews: { d: 2 }, salads: { d: 1 }, sandwiches: { d: 1 }, fast_food: { d: 1 }, breakfast_foods: { d: 1 },
  snacks: { d: 1 }, street_food: { d: 3 }, potato_dishes: { d: 2 }, savory_pies: { d: 3 }, pizza_styles: { d: 3 }, pizza_toppings: { d: 1 },
  pancakes_of_the_world: { d: 4 }, burger_toppings: { d: 1 }, turkish_food: { d: 4 }, middle_eastern_food: { d: 3 }, african_food: { d: 4 },
  asian_food: { d: 2 }, oceanian_food: { d: 5 }, south_american_food: { d: 4 }, north_american_food: { d: 2 }, hot_drinks: { d: 1 }, teas: { d: 3 },
};

const FULL = {
  spice_blends: [
    ['curry powder', 2, 2], ['garam masala', 3, 2], ['five spice', 3, 3, { al: [['five-spice powder', 'synonym', 4, 3]] }], ['Cajun seasoning', 2, 2, { type: 'proper' }],
    ['Creole seasoning', 3, 3, { type: 'proper' }], ['jerk seasoning', 3, 3], ['taco seasoning', 2, 2], ['pumpkin spice', 2, 2], ['chili powder', 2, 3],
    ['Italian seasoning', 2, 2, { type: 'proper' }], ['Old Bay', 3, 3, B()], ['mixed spice', 3, 3, { reg: ['UK'] }], ['apple pie spice', 3, 3],
    ['pickling spice', 3, 3], ['poultry seasoning', 3, 3], ['lemon pepper', 2, 3], ['seasoned salt', 3, 3], ['bouquet garni', 3, 3],
    ['herbes de Provence', 4, 3, { type: 'proper' }], ['fines herbes', 4, 4], ['za\'atar', 3, 3, { al: [['zaatar', 'spelling', 4, 4]] }],
    ['ras el hanout', 4, 4], ['baharat', 4, 4], ['dukkah', 4, 4, { al: [['dukka', 'spelling', 5, 5]] }], ['berbere', 4, 4], ['chaat masala', 4, 4],
    ['tandoori masala', 4, 4], ['panch phoron', 5, 5], ['shichimi togarashi', 5, 5], ['furikake', 4, 4], ['quatre épices', 5, 5], ['hawaij', 5, 5],
    ['sazon', 4, 4], ['adobo seasoning', 3, 3],
  ],

  chili_peppers: [
    ['chili pepper', 1, 1, { al: [['chilli', 'spelling', 2, 2, ['UK']]] }], ['jalapeño', 2, 2, { al: [['jalapeno', 'spelling', 2, 2]] }],
    ['cayenne', 2, 3, { al: [['cayenne pepper', 'synonym', 2, 2]] }], ['habanero', 3, 2], ['serrano', 3, 3], ['poblano', 3, 3], ['chipotle', 3, 2], ['ancho', 4, 3],
    ['scotch bonnet', 3, 3], ['bird\'s eye chili', 4, 3], ['ghost pepper', 3, 2, { al: [['bhut jolokia', 'synonym', 5, 5]] }], ['Carolina Reaper', 3, 2, { type: 'proper' }],
    ['trinidad scorpion', 5, 4], ['thai chili', 3, 3], ['anaheim pepper', 4, 4], ['pasilla', 4, 4], ['guajillo', 4, 4], ['cascabel', 5, 5], ['chile de arbol', 5, 5],
    ['piri piri', 3, 3, { al: [['peri-peri', 'spelling', 3, 3]] }], ['padron pepper', 4, 4], ['banana pepper', 3, 3], ['fresno', 4, 4, { g: 'chili' }],
    ['cherry pepper', 4, 4], ['aleppo pepper', 4, 4], ['pepperoncini', 3, 4], ['hatch chile', 4, 4], ['mulato', 5, 5], ['naga viper', 5, 5],
    ['red chili', 2, 2], ['green chili', 2, 2], ['tabasco pepper', 4, 3], ['cubanelle', 5, 5], ['datil', 5, 5, { g: 'pepper' }], ['peter pepper', 5, 5],
  ],

  sauces_and_condiments: [
    ['ketchup', 1, 1, { al: [['catsup', 'spelling', 3, 3]] }], ['mustard', 1, 1], ['mayonnaise', 1, 1, { al: [['mayo', 'short', 1, 1]] }],
    ['soy sauce', 1, 1], ['hot sauce', 1, 1], ['barbecue sauce', 1, 1, { al: [['BBQ sauce', 'short', 1, 1]] }], ['tomato sauce', 1, 1], ['gravy', 1, 2],
    ['tartar sauce', 2, 2, { al: [['tartare sauce', 'spelling', 3, 3, ['UK']]] }], ['pesto', 2, 2], ['salsa', 1, 2, { g: 'sauce' }], ['relish', 2, 2],
    ['sriracha', 2, 2], ['teriyaki sauce', 2, 2], ['horseradish', 2, 2], ['wasabi', 2, 3], ['cranberry sauce', 2, 2], ['apple sauce', 1, 3], ['marinara sauce', 2, 2],
    ['worcestershire sauce', 3, 2, { al: [['Worcester sauce', 'synonym', 3, 3, ['UK']]] }], ['hollandaise', 3, 3], ['chutney', 3, 2], ['aioli', 3, 3],
    ['hoisin sauce', 3, 3], ['tahini', 3, 3], ['fish sauce', 3, 3], ['oyster sauce', 3, 3], ['brown sauce', 3, 3, { reg: ['UK'] }], ['mint sauce', 3, 3, { reg: ['UK'] }],
    ['salad cream', 3, 3, { reg: ['UK'] }], ['harissa', 3, 3], ['chimichurri', 3, 3], ['Tabasco', 2, 2, B({ g: 'hot sauce' })], ['sweet chili sauce', 2, 2],
    ['béarnaise', 4, 3], ['béchamel', 4, 3], ['piccalilli', 4, 3], ['romesco', 4, 4], ['sambal', 4, 4], ['gochujang', 4, 4], ['ponzu', 4, 4], ['tkemali', 5, 5],
    ['sofrito', 4, 4], ['mole', 4, 4, { g: 'sauce' }], ['XO sauce', 5, 5], ['gentleman\'s relish', 5, 5], ['Marie Rose sauce', 4, 4],
  ],

  dips: [
    ['hummus', 1, 1, { al: [['houmous', 'spelling', 3, 3, ['UK']]] }], ['guacamole', 1, 1, { al: [['guac', 'short', 2, 2]] }], ['salsa', 1, 1, { g: 'sauce' }], ['tzatziki', 3, 2],
    ['queso', 2, 2], ['cheese dip', 1, 1], ['ranch dip', 2, 2], ['onion dip', 2, 2], ['french onion dip', 2, 2], ['spinach dip', 2, 2], ['bean dip', 2, 2],
    ['pico de gallo', 2, 3], ['nacho cheese', 2, 2], ['blue cheese dip', 2, 2], ['cheese fondue', 2, 3], ['baba ganoush', 3, 3, { al: [['baba ghanoush', 'spelling', 4, 4]] }],
    ['raita', 3, 3], ['artichoke dip', 3, 3], ['crab dip', 3, 3], ['buffalo chicken dip', 3, 3], ['chili con queso', 3, 3], ['dill dip', 3, 3],
    ['taramasalata', 4, 3, { al: [['taramosalata', 'spelling', 4, 4]] }], ['labneh', 4, 3], ['tapenade', 4, 3], ['whipped feta', 4, 4], ['bagna cauda', 5, 5],
    ['skordalia', 5, 5], ['muhammara', 5, 5], ['melitzanosalata', 5, 5], ['mutabal', 5, 5], ['ajvar', 5, 5, { g: 'dip' }], ['cacik', 5, 5],
  ],

  spreads: [
    ['jam', 1, 1, { g: 'preserve' }], ['marmalade', 1, 1], ['peanut butter', 1, 1], ['Nutella', 1, 1, B()], ['butter', 1, 1], ['margarine', 2, 2],
    ['honey', 1, 3], ['cream cheese', 1, 2], ['jelly', 1, 2, { g: 'spread', reg: ['US'] }], ['almond butter', 2, 2], ['chocolate spread', 2, 2], ['cheese spread', 2, 2],
    ['hazelnut spread', 2, 2], ['Marmite', 2, 2, B({ reg: ['UK'] })], ['Vegemite', 2, 2, B({ reg: ['AU'] })], ['lemon curd', 3, 2], ['pâté', 3, 2, { al: [['pate', 'spelling', 3, 3]] }],
    ['cashew butter', 3, 3], ['apple butter', 3, 3], ['dulce de leche', 3, 3], ['cookie butter', 3, 3], ['Biscoff spread', 3, 3, B()], ['tahini', 3, 4],
    ['rillettes', 4, 4], ['liverwurst', 4, 3], ['yeast extract', 4, 3], ['Bovril', 4, 4, B({ reg: ['UK'] })], ['fish paste', 4, 4], ['speculoos spread', 4, 4],
    ['braunschweiger', 5, 5], ['Promite', 5, 5, B({ reg: ['AU'] })], ['kaya', 5, 5], ['guava paste', 4, 4], ['fruit preserves', 2, 2],
  ],

  pickles_and_preserves: [
    ['pickle', 1, 1, { g: 'food' }], ['dill pickle', 1, 1], ['gherkin', 3, 2], ['sauerkraut', 2, 2], ['kimchi', 2, 3], ['jam', 1, 2, { g: 'preserve' }], ['marmalade', 1, 2],
    ['pickled onion', 2, 2], ['sweet pickle', 2, 2], ['relish', 2, 3], ['caper', 2, 3, { g: 'pickled bud' }], ['chutney', 3, 3], ['pickled beetroot', 3, 3],
    ['pickled herring', 3, 3], ['pickled ginger', 3, 3, { al: [['gari', 'synonym', 5, 5, [], { g: 'pickled ginger' }]] }], ['pickled egg', 3, 3], ['pickled peppers', 3, 3],
    ['compote', 3, 3], ['fruit leather', 3, 4], ['piccalilli', 4, 3], ['cornichon', 4, 4], ['lime pickle', 4, 3], ['mango pickle', 4, 4], ['preserved lemon', 4, 3],
    ['confit', 4, 4], ['conserve', 4, 3], ['quince paste', 4, 4, { al: [['membrillo', 'synonym', 5, 5]] }], ['rollmop', 5, 5, { reg: ['UK'] }], ['giardiniera', 5, 5],
    ['curtido', 5, 5], ['umeboshi', 5, 5], ['tsukemono', 5, 5], ['achar', 5, 5], ['chow-chow', 5, 5], ['kasundi', 5, 5],
  ],

  oils_and_vinegars: [
    ['olive oil', 1, 1], ['vegetable oil', 1, 1], ['sunflower oil', 1, 1], ['coconut oil', 1, 2], ['sesame oil', 2, 2], ['canola oil', 2, 2, { al: [['rapeseed oil', 'synonym', 3, 3, ['UK']]] }],
    ['peanut oil', 2, 2, { al: [['groundnut oil', 'synonym', 3, 3, ['UK']]] }], ['corn oil', 2, 2], ['palm oil', 2, 2], ['soybean oil', 2, 2], ['avocado oil', 3, 3],
    ['grapeseed oil', 3, 3], ['walnut oil', 3, 3], ['truffle oil', 3, 3], ['flaxseed oil', 3, 3, { al: [['linseed oil', 'synonym', 3, 4]] }], ['safflower oil', 3, 3],
    ['rice bran oil', 4, 4], ['mustard oil', 4, 4], ['hemp oil', 4, 4], ['argan oil', 4, 3], ['extra virgin', 2, 3], ['white vinegar', 1, 1], ['balsamic vinegar', 2, 2],
    ['malt vinegar', 2, 2], ['cider vinegar', 2, 2, { al: [['apple cider vinegar', 'synonym', 2, 2]] }], ['red wine vinegar', 2, 2], ['rice vinegar', 3, 3], ['white wine vinegar', 3, 3],
    ['distilled vinegar', 3, 3], ['sherry vinegar', 4, 4], ['black vinegar', 4, 4], ['champagne vinegar', 4, 4], ['coconut vinegar', 5, 5], ['verjuice', 5, 5],
    ['perilla oil', 5, 5], ['pumpkin seed oil', 4, 4], ['hazelnut oil', 4, 4], ['sake vinegar', 5, 5],
  ],

  soups: [
    ['chicken noodle soup', 1, 1], ['tomato soup', 1, 1], ['noodle soup', 1, 1], ['potato soup', 1, 1], ['vegetable soup', 1, 1], ['broth', 1, 2], ['minestrone', 3, 2],
    ['clam chowder', 2, 2], ['chowder', 2, 2], ['french onion soup', 2, 2], ['split pea soup', 2, 2], ['miso soup', 2, 2], ['wonton soup', 3, 2], ['lentil soup', 2, 2],
    ['egg drop soup', 2, 2], ['pumpkin soup', 2, 2], ['cream of mushroom', 2, 3], ['ramen', 2, 2], ['pho', 3, 3], ['borscht', 3, 3], ['gazpacho', 3, 3], ['bisque', 3, 3],
    ['lobster bisque', 3, 3], ['hot and sour soup', 3, 3], ['tom yum', 3, 3], ['scotch broth', 4, 4], ['bouillabaisse', 4, 3], ['vichyssoise', 4, 3],
    ['mulligatawny', 4, 4], ['consommé', 4, 4], ['laksa', 4, 4], ['pozole', 4, 4], ['tom kha', 4, 4], ['bird\'s nest soup', 4, 4], ['cullen skink', 5, 5],
    ['cock-a-leekie', 5, 5], ['ribollita', 5, 5], ['avgolemono', 5, 5], ['stracciatella', 5, 5], ['caldo verde', 5, 5], ['menudo', 5, 5, { g: 'soup' }], ['cawl', 5, 5],
  ],

  stews: [
    ['beef stew', 1, 1], ['chicken stew', 1, 1], ['vegetable stew', 1, 1], ['lamb stew', 2, 2], ['fish stew', 2, 2], ['irish stew', 2, 2], ['casserole', 2, 2],
    ['pot roast', 2, 3], ['chili', 2, 2, { g: 'dish' }], ['chili con carne', 2, 2], ['goulash', 3, 2], ['gumbo', 3, 3], ['tagine', 3, 3, { al: [['tajine', 'spelling', 4, 4]] }],
    ['beef bourguignon', 3, 3, { al: [['boeuf bourguignon', 'synonym', 3, 3]] }], ['beef stroganoff', 3, 3, { al: [['stroganoff', 'short', 3, 3]] }], ['coq au vin', 3, 3],
    ['osso buco', 3, 3], ['ratatouille', 3, 3], ['chicken cacciatore', 3, 3], ['oxtail stew', 3, 3], ['hotpot', 3, 3, { reg: ['UK'] }], ['curry', 1, 2],
    ['cassoulet', 4, 3], ['ragout', 4, 4], ['feijoada', 4, 4], ['rendang', 4, 4], ['brunswick stew', 4, 4], ['cioppino', 4, 4], ['scouse', 4, 4, { g: 'stew', reg: ['UK'] }],
    ['jambalaya', 3, 4], ['cholent', 5, 5], ['daube', 5, 5], ['navarin', 5, 5], ['bigos', 5, 5], ['carbonnade', 5, 5], ['étouffée', 5, 5], ['burgoo', 5, 5],
    ['stifado', 5, 5], ['pot-au-feu', 5, 5], ['blanquette', 5, 5],
  ],

  salads: [
    ['caesar salad', 1, 1], ['greek salad', 1, 1], ['garden salad', 1, 1], ['side salad', 1, 1], ['coleslaw', 1, 2], ['potato salad', 1, 1], ['fruit salad', 1, 1],
    ['pasta salad', 1, 1], ['chicken salad', 1, 1], ['spinach salad', 1, 1], ['tomato salad', 1, 1], ['house salad', 2, 2], ['chef salad', 2, 2], ['egg salad', 2, 2],
    ['tuna salad', 2, 2], ['macaroni salad', 2, 2], ['kale salad', 2, 2], ['taco salad', 2, 2], ['cucumber salad', 2, 2], ['beet salad', 2, 2], ['quinoa salad', 2, 2],
    ['waldorf salad', 3, 2], ['cobb salad', 3, 2], ['niçoise salad', 3, 3, { al: [['nicoise salad', 'spelling', 3, 3]] }], ['caprese salad', 3, 2], ['tabbouleh', 3, 3],
    ['wedge salad', 3, 3], ['three bean salad', 3, 3], ['seaweed salad', 3, 3], ['couscous salad', 3, 3], ['fattoush', 4, 4], ['panzanella', 4, 4], ['russian salad', 4, 4],
    ['larb', 4, 4], ['som tam', 4, 4], ['green papaya salad', 4, 4], ['mesclun', 4, 4], ['ambrosia', 4, 4, { g: 'salad' }], ['olivier salad', 5, 5], ['shopska salad', 5, 5],
    ['horiatiki', 5, 5], ['salade lyonnaise', 5, 5], ['kachumber', 5, 5],
  ],

  sandwiches: [
    ['ham sandwich', 1, 1], ['egg sandwich', 1, 1], ['chicken sandwich', 1, 1], ['grilled cheese', 1, 1], ['club sandwich', 2, 2], ['BLT', 2, 2, { type: 'acronym' }],
    ['PB&J', 2, 2, { type: 'acronym' }], ['cucumber sandwich', 2, 2], ['wrap', 1, 2, { g: 'sandwich' }], ['panini', 2, 2], ['gyro', 2, 2], ['sloppy joe', 2, 2, { g: 'sandwich' }],
    ['submarine sandwich', 2, 2, { al: [['sub', 'short', 2, 2, [], { g: 'sandwich' }], ['hoagie', 'synonym', 4, 4, ['US']], ['grinder', 'synonym', 4, 4, ['US'], { g: 'sandwich' }]] }],
    ['pulled pork sandwich', 2, 2], ['finger sandwich', 3, 3], ['tuna melt', 3, 3], ['patty melt', 3, 3], ['Reuben', 3, 3, { type: 'proper' }], ['cheesesteak', 3, 2, { al: [['philly cheesesteak', 'synonym', 3, 2]] }],
    ['po\' boy', 3, 3], ['banh mi', 3, 3], ['croque monsieur', 3, 3], ['cuban sandwich', 3, 3], ['lobster roll', 3, 3], ['open sandwich', 3, 3],
    ['bacon butty', 3, 3, { reg: ['UK'], al: [['bacon sandwich', 'synonym', 2, 2]] }], ['toastie', 3, 3, { reg: ['UK'] }], ['croque madame', 4, 4], ['monte cristo', 4, 4],
    ['muffuletta', 4, 4], ['chip butty', 4, 4, { reg: ['UK'] }], ['fish finger sandwich', 4, 4, { reg: ['UK'] }], ['french dip', 4, 4], ['bocadillo', 4, 4],
    ['smørrebrød', 5, 5], ['tramezzino', 5, 5], ['dagwood', 5, 5], ['katsu sando', 5, 5], ['chacarero', 5, 5],
  ],

  fast_food: [
    ['hamburger', 1, 1], ['cheeseburger', 1, 1], ['french fries', 1, 1], ['hot dog', 1, 1], ['chicken nuggets', 1, 1], ['pizza', 1, 1], ['fried chicken', 1, 1],
    ['onion rings', 1, 1], ['milkshake', 1, 2], ['taco', 1, 2], ['burrito', 1, 2], ['chicken wings', 1, 2], ['nachos', 1, 2], ['Big Mac', 1, 2, B({ type: 'proper' })],
    ['corn dog', 2, 2], ['Whopper', 2, 2, B({ type: 'proper' })], ['Happy Meal', 2, 3, B({ type: 'proper' })], ['combo meal', 2, 2], ['kids meal', 2, 3], ['quesadilla', 2, 3],
    ['hash brown', 2, 3], ['double cheeseburger', 2, 2], ['mozzarella sticks', 2, 2], ['tater tots', 2, 3, { tm: true }], ['popcorn chicken', 2, 2], ['chicken tenders', 2, 2],
    ['curly fries', 2, 2], ['soft serve', 2, 3], ['fish and chips', 3, 3], ['value meal', 3, 3], ['fish sandwich', 3, 3], ['chili cheese fries', 3, 3], ['breakfast burrito', 3, 3],
    ['fountain drink', 3, 3], ['slider', 3, 3, { g: 'burger' }], ['McFlurry', 3, 3, B({ type: 'proper' })], ['footlong', 3, 4], ['Chalupa', 4, 4, B({ type: 'proper' })],
    ['Crunchwrap', 4, 4, B({ type: 'proper' })], ['Baconator', 5, 5, B({ type: 'proper' })], ['supersize', 3, 4],
  ],

  breakfast_foods: [
    ['pancakes', 1, 1], ['waffles', 1, 1], ['bacon', 1, 1], ['eggs', 1, 1], ['scrambled eggs', 1, 1], ['fried egg', 1, 1], ['omelette', 1, 1, { al: [['omelet', 'spelling', 1, 1, ['US']]] }],
    ['cereal', 1, 1], ['cornflakes', 1, 1], ['oatmeal', 1, 1, { al: [['porridge', 'synonym', 2, 2, ['UK']]] }], ['toast', 1, 1], ['french toast', 1, 1], ['bagel', 1, 2],
    ['croissant', 1, 2], ['muffin', 1, 2], ['breakfast sausage', 2, 2], ['yogurt', 1, 2], ['hash browns', 2, 2], ['granola', 2, 2], ['muesli', 2, 2],
    ['eggs benedict', 2, 2], ['English muffin', 2, 2, { type: 'proper' }], ['breakfast burrito', 2, 2], ['breakfast sandwich', 2, 2], ['avocado toast', 2, 2],
    ['overnight oats', 2, 2], ['baked beans', 2, 3], ['Pop-Tart', 2, 3, B()], ['grits', 3, 3, { reg: ['US'] }], ['full English', 3, 3, { type: 'proper', reg: ['UK'] }],
    ['black pudding', 3, 3, { reg: ['UK'] }], ['biscuits and gravy', 3, 3], ['frittata', 3, 3], ['crumpet', 3, 3, { reg: ['UK'] }], ['home fries', 3, 3], ['fry-up', 3, 3, { reg: ['UK'] }],
    ['smoothie bowl', 3, 3], ['steak and eggs', 3, 3], ['kippers', 4, 3, { reg: ['UK'] }], ['congee', 4, 4], ['shakshuka', 4, 3], ['huevos rancheros', 4, 3],
    ['chilaquiles', 4, 4], ['kedgeree', 4, 4, { reg: ['UK'] }], ['eggs florentine', 4, 4], ['gallo pinto', 4, 4],
  ],

  snacks: [
    ['potato chips', 1, 1, { al: [['crisps', 'synonym', 1, 1, ['UK']]] }], ['popcorn', 1, 1], ['pretzels', 1, 1], ['peanuts', 1, 2], ['trail mix', 1, 1], ['granola bar', 1, 1],
    ['crackers', 1, 1], ['tortilla chips', 1, 1], ['chocolate bar', 1, 2], ['candy bar', 1, 2, { reg: ['US'] }], ['gummy bears', 1, 2], ['mixed nuts', 1, 2], ['cheese puffs', 2, 2],
    ['beef jerky', 1, 2], ['fruit snacks', 2, 2], ['rice cakes', 2, 2], ['pork rinds', 2, 2, { al: [['pork scratchings', 'synonym', 3, 3, ['UK']]] }], ['cheese sticks', 2, 2],
    ['string cheese', 2, 2], ['Pringles', 2, 2, B()], ['Doritos', 2, 2, B()], ['Cheetos', 2, 2, B()], ['pita chips', 3, 3], ['veggie straws', 3, 3], ['seaweed snacks', 3, 3],
    ['edamame', 3, 3], ['Cheez-It', 3, 3, B()], ['Chex Mix', 3, 3, B()], ['rice crackers', 3, 3], ['prawn crackers', 3, 3, { reg: ['UK'] }], ['banana chips', 3, 3],
    ['kale chips', 3, 3], ['Cracker Jack', 4, 4, B()], ['cheese straws', 4, 4], ['bombay mix', 4, 4, { reg: ['UK'] }], ['Twiglets', 4, 4, B({ reg: ['UK'] })],
    ['roasted chickpeas', 4, 4], ['wasabi peas', 4, 4], ['bhel puri', 4, 4], ['murukku', 5, 5], ['namkeen', 5, 5],
  ],

  street_food: [
    ['hot dog', 1, 3], ['taco', 1, 3], ['kebab', 2, 2], ['falafel', 2, 3], ['churros', 2, 3], ['soft pretzel', 2, 3], ['crepe', 2, 3], ['dumplings', 2, 3],
    ['spring roll', 2, 3], ['pad thai', 2, 3], ['gyro', 2, 3], ['bratwurst', 2, 3], ['funnel cake', 2, 3], ['shaved ice', 2, 3], ['coconut water', 2, 3], ['roasted chestnuts', 3, 3],
    ['satay', 3, 3], ['samosa', 3, 3], ['bao', 3, 3], ['empanada', 3, 3], ['banh mi', 3, 3], ['shawarma', 3, 3], ['doner kebab', 3, 3], ['arancini', 3, 4],
    ['elote', 3, 3], ['tamale', 3, 3], ['kettle corn', 3, 3], ['takoyaki', 4, 3], ['yakitori', 4, 3], ['pani puri', 4, 3, { al: [['golgappa', 'synonym', 5, 5]] }],
    ['arepa', 4, 4], ['vada pav', 4, 4], ['currywurst', 4, 4], ['tteokbokki', 4, 4], ['chaat', 4, 4], ['momo', 4, 4], ['dosa', 4, 4], ['stinky tofu', 4, 4],
    ['egg waffle', 4, 4], ['bubble waffle', 4, 4], ['tacos al pastor', 4, 4], ['sugarcane juice', 4, 4], ['jianbing', 5, 4], ['pav bhaji', 5, 4], ['choripan', 5, 4],
    ['anticuchos', 5, 4], ['banh xeo', 5, 5], ['kati roll', 5, 5], ['langos', 5, 5], ['kumpir', 5, 5], ['simit', 5, 4], ['balut', 5, 5], ['trdelnik', 5, 5],
  ],

  potato_dishes: [
    ['french fries', 1, 1], ['mashed potatoes', 1, 1], ['baked potato', 1, 1], ['roast potatoes', 1, 1], ['potato salad', 1, 1], ['hash browns', 1, 1], ['potato chips', 1, 2],
    ['potato wedges', 2, 2], ['curly fries', 2, 2], ['scalloped potatoes', 2, 2], ['potato skins', 2, 2], ['jacket potato', 2, 2, { reg: ['UK'] }], ['tater tots', 2, 2, { tm: true }],
    ['gnocchi', 2, 3], ['potato pancake', 2, 2], ['new potatoes', 2, 3], ['smashed potatoes', 2, 2], ['latke', 3, 3], ['home fries', 3, 3], ['waffle fries', 3, 3],
    ['shoestring fries', 3, 3], ['steak fries', 3, 3], ['potato gratin', 3, 3, { al: [['dauphinoise potatoes', 'synonym', 4, 4, ['UK']], ['gratin dauphinois', 'synonym', 5, 5]] }],
    ['twice baked potato', 3, 3], ['bubble and squeak', 3, 3, { reg: ['UK'] }], ['patatas bravas', 3, 3], ['aloo gobi', 3, 3], ['poutine', 3, 3], ['potato croquettes', 3, 3],
    ['pierogi', 3, 4], ['rösti', 4, 3, { al: [['rosti', 'spelling', 4, 3]] }], ['colcannon', 4, 4], ['hasselback potatoes', 4, 4], ['duchess potatoes', 4, 4],
    ['fondant potatoes', 4, 4], ['potato kugel', 4, 4], ['champ', 5, 5, { g: 'potato dish' }], ['boxty', 5, 5], ['pommes anna', 5, 5], ['aligot', 5, 5],
    ['tartiflette', 5, 5], ['papas arrugadas', 5, 5],
  ],

  savory_pies: [
    ['meat pie', 1, 1], ['chicken pot pie', 2, 2], ['pot pie', 2, 2], ['shepherd\'s pie', 2, 2], ['cottage pie', 2, 2, { reg: ['UK'] }], ['pork pie', 2, 2, { reg: ['UK'] }],
    ['quiche', 2, 2], ['steak pie', 2, 2], ['fish pie', 2, 2, { reg: ['UK'] }], ['sausage roll', 2, 3, { reg: ['UK'] }], ['pasty', 3, 3, { g: 'pie' }], ['Cornish pasty', 3, 3, { type: 'proper', reg: ['UK'] }],
    ['empanada', 3, 3], ['steak and kidney pie', 3, 3, { reg: ['UK'] }], ['spanakopita', 3, 3], ['game pie', 3, 3], ['chicken and leek pie', 3, 3, { reg: ['UK'] }],
    ['beef wellington', 3, 4], ['vol-au-vent', 3, 4], ['cheese and onion pie', 3, 3, { reg: ['UK'] }], ['tourtière', 4, 4, { al: [['tourtiere', 'spelling', 4, 4]] }],
    ['börek', 4, 4, { al: [['borek', 'spelling', 4, 4], ['burek', 'spelling', 4, 4]] }], ['pie and mash', 4, 4, { reg: ['UK'] }], ['scotch pie', 4, 4, { reg: ['UK'] }],
    ['tamale pie', 4, 4], ['stargazy pie', 5, 5, { reg: ['UK'] }], ['Melton Mowbray pie', 5, 4, { type: 'proper', reg: ['UK'] }], ['pithivier', 5, 5], ['coulibiac', 5, 5],
    ['pirozhki', 5, 4], ['kulebyaka', 5, 5], ['bridie', 5, 5, { reg: ['UK'] }], ['bierock', 5, 5], ['Runza', 5, 5, B({ reg: ['US'] })], ['pastilla', 5, 4],
  ],

  pizza_styles: [
    ['cheese pizza', 1, 1], ['pepperoni pizza', 1, 1], ['Hawaiian pizza', 1, 1], ['veggie pizza', 1, 1], ['thin crust', 1, 2], ['margherita', 2, 2, { g: 'pizza' }],
    ['meat lovers pizza', 2, 2], ['deep dish', 2, 2, { al: [['Chicago-style', 'synonym', 3, 3]] }], ['New York-style', 2, 2, { type: 'proper' }], ['stuffed crust', 2, 2],
    ['pan pizza', 2, 2], ['calzone', 3, 3], ['supreme', 2, 3, { g: 'pizza' }], ['BBQ chicken', 2, 2, { g: 'pizza' }], ['four cheese', 2, 2, { al: [['quattro formaggi', 'synonym', 4, 4]] }],
    ['neapolitan', 3, 3, { g: 'pizza' }], ['sicilian', 3, 3, { g: 'pizza' }], ['stromboli', 3, 3], ['white pizza', 3, 3], ['flatbread pizza', 3, 3], ['wood-fired', 3, 3],
    ['detroit-style', 4, 4], ['diavola', 4, 4], ['capricciosa', 4, 4], ['pizza marinara', 4, 4], ['grandma pizza', 4, 4], ['California-style', 4, 4], ['Greek pizza', 4, 4],
    ['quattro stagioni', 5, 5], ['fiorentina', 5, 5, { g: 'pizza' }], ['pizza bianca', 5, 5], ['pizza al taglio', 5, 5], ['tavern style', 5, 5], ['St. Louis-style', 5, 5],
    ['sfincione', 5, 5], ['pinsa', 5, 5], ['pizza fritta', 5, 5], ['tarte flambée', 5, 5],
  ],

  pizza_toppings: [
    ['pepperoni', 1, 1], ['mushroom', 1, 1], ['onion', 1, 1], ['sausage', 1, 1], ['extra cheese', 1, 1], ['green pepper', 1, 1], ['black olive', 1, 1], ['bacon', 1, 1],
    ['pineapple', 1, 1], ['ham', 1, 1], ['ground beef', 1, 1], ['chicken', 1, 1], ['tomato', 1, 2], ['mozzarella', 1, 2], ['basil', 1, 2], ['spinach', 1, 2], ['garlic', 1, 2],
    ['corn', 1, 2], ['broccoli', 1, 3], ['anchovy', 2, 2], ['jalapeño', 2, 2], ['oregano', 2, 2], ['salami', 2, 2], ['red onion', 2, 2], ['meatball', 2, 2], ['feta', 2, 3],
    ['parmesan', 2, 3], ['pesto', 2, 3], ['artichoke heart', 3, 3], ['sun-dried tomato', 3, 3], ['prosciutto', 3, 3], ['arugula', 3, 3, { al: [['rocket', 'synonym', 3, 3, ['UK'], { g: 'salad leaf' }]] }],
    ['goat cheese', 3, 3], ['ricotta', 3, 3], ['caper', 3, 3, { g: 'pickled bud' }], ['chorizo', 3, 3], ['pepperoncini', 3, 3], ['egg', 3, 4], ['pancetta', 4, 4], ['nduja', 5, 5],
  ],

  pancakes_of_the_world: [
    ['pancake', 1, 1], ['buttermilk pancake', 1, 1], ['crepe', 2, 2], ['hotcake', 3, 3, { g: 'pancake' }], ['flapjack', 3, 3, { g: 'pancake', reg: ['US'] }], ['blini', 3, 3],
    ['latke', 3, 3], ['crêpe suzette', 3, 3, { al: [['crepe suzette', 'spelling', 3, 3]] }], ['scallion pancake', 3, 3, { al: [['cong you bing', 'synonym', 5, 5]] }],
    ['swedish pancake', 3, 3], ['chinese pancake', 3, 3], ['buckwheat pancake', 3, 3], ['potato pancake', 3, 3], ['dosa', 4, 3], ['injera', 4, 3], ['okonomiyaki', 4, 3],
    ['dutch baby', 4, 4], ['drop scone', 4, 4], ['johnnycake', 4, 4], ['poffertjes', 4, 4], ['blintz', 4, 4], ['galette', 4, 4, { g: 'crepe' }], ['mille crepe', 4, 4],
    ['pannekoek', 5, 5], ['palatschinke', 5, 5], ['appam', 5, 5], ['uttapam', 5, 5], ['banh xeo', 5, 5], ['pajeon', 5, 5], ['jianbing', 5, 5], ['oladi', 5, 5],
    ['syrniki', 5, 5], ['ebelskiver', 5, 5], ['pikelet', 5, 5, { reg: ['AU'] }], ['socca', 5, 5], ['farinata', 5, 5], ['malpua', 5, 5], ['msemen', 5, 5], ['baghrir', 5, 5],
    ['kaiserschmarrn', 5, 5], ['palacsinta', 5, 5], ['hoecake', 5, 5], ['ploye', 5, 5], ['plattar', 5, 5], ['pfannkuchen', 5, 5],
  ],

  burger_toppings: [
    ['lettuce', 1, 1], ['tomato', 1, 1], ['onion', 1, 1], ['pickle', 1, 1, { g: 'food' }], ['cheese', 1, 1], ['bacon', 1, 1], ['ketchup', 1, 1], ['mustard', 1, 1],
    ['mayonnaise', 1, 1], ['avocado', 2, 2], ['fried egg', 2, 2], ['grilled onion', 2, 2], ['mushroom', 2, 2], ['jalapeño', 2, 2], ['barbecue sauce', 2, 2], ['special sauce', 2, 2],
    ['american cheese', 2, 2], ['cheddar', 2, 2], ['swiss cheese', 2, 3], ['onion ring', 2, 2], ['relish', 2, 2], ['burger sauce', 2, 2], ['blue cheese', 3, 3],
    ['caramelized onion', 3, 3], ['pineapple', 3, 3], ['coleslaw', 3, 3], ['aioli', 3, 3], ['pepper jack', 3, 3], ['arugula', 3, 3], ['pulled pork', 3, 3], ['guacamole', 3, 3],
    ['salsa', 3, 3, { g: 'sauce' }], ['thousand island', 3, 3], ['beetroot', 4, 4], ['peanut butter', 4, 4], ['gruyère', 4, 4], ['brie', 4, 4], ['alfalfa sprouts', 4, 4],
    ['smoked gouda', 4, 4], ['crispy shallots', 4, 4], ['hash brown', 4, 4], ['chili', 3, 3, { g: 'dish' }],
  ],

  turkish_food: [
    ['kebab', 2, 2], ['doner kebab', 2, 2], ['shish kebab', 3, 2], ['baklava', 2, 2], ['turkish delight', 2, 2, { al: [['lokum', 'synonym', 4, 4]] }], ['turkish coffee', 2, 2],
    ['turkish tea', 2, 3, { al: [['çay', 'synonym', 4, 4]] }], ['dolma', 3, 3], ['raki', 3, 3, ALC()], ['simit', 4, 3], ['lahmacun', 4, 3], ['pide', 4, 3], ['börek', 4, 3],
    ['köfte', 4, 3, { al: [['kofte', 'spelling', 4, 3]] }], ['ayran', 4, 3], ['adana kebab', 4, 3], ['manti', 4, 4], ['sarma', 4, 4], ['iskender', 4, 4], ['menemen', 4, 4],
    ['gözleme', 4, 4, { al: [['gozleme', 'spelling', 4, 4]] }], ['imam bayildi', 4, 4], ['künefe', 4, 4, { al: [['kunefe', 'spelling', 4, 4]] }], ['pilav', 4, 4], ['sucuk', 4, 4],
    ['helva', 4, 4], ['kaymak', 5, 5], ['ezme', 5, 5], ['cacik', 5, 5], ['sütlaç', 5, 5, { al: [['sutlac', 'spelling', 5, 5]] }], ['karniyarik', 5, 5], ['hunkar begendi', 5, 5],
    ['pastirma', 5, 5], ['tulumba', 5, 5], ['lokma', 5, 5], ['su boregi', 5, 5], ['şalgam', 5, 5], ['boza', 5, 5], ['cig kofte', 5, 5], ['kadayif', 5, 5], ['salep', 5, 5],
    ['ashure', 5, 5], ['kebap', 3, 3],
  ],

  middle_eastern_food: [
    ['hummus', 1, 2], ['falafel', 2, 2], ['pita', 1, 3], ['kebab', 2, 3], ['couscous', 2, 3], ['baklava', 2, 3], ['shawarma', 3, 2], ['baba ganoush', 3, 3], ['tabbouleh', 3, 3],
    ['halva', 3, 3], ['dolma', 3, 3], ['kofta', 3, 3], ['bulgur', 3, 3], ['halloumi', 3, 3], ['rose water', 3, 4], ['mint tea', 2, 3], ['arabic coffee', 3, 3], ['tahini', 3, 3],
    ['kibbeh', 4, 4], ['shakshuka', 4, 4], ['fattoush', 4, 4], ['labneh', 4, 3], ['za\'atar', 3, 3], ['sumac', 4, 4], ['lavash', 4, 4], ['pomegranate molasses', 4, 4],
    ['baharat', 4, 4], ['harissa', 3, 3], ['fatteh', 5, 5], ['mujaddara', 5, 5], ['maqluba', 5, 5], ['mansaf', 5, 5], ['knafeh', 5, 5], ['manakish', 5, 5], ['sabich', 5, 5],
    ['musakhan', 5, 5], ['basbousa', 5, 5], ['umm ali', 5, 5], ['freekeh', 5, 5], ['shish taouk', 5, 5], ['orange blossom water', 5, 5],
  ],

  african_food: [
    ['couscous', 2, 3], ['jollof rice', 3, 3], ['tagine', 3, 3], ['biltong', 3, 3], ['injera', 4, 3], ['fufu', 4, 3], ['bobotie', 4, 3], ['boerewors', 4, 3], ['bunny chow', 4, 4],
    ['ugali', 4, 4], ['piri piri', 3, 3], ['braai', 3, 3], ['rooibos', 3, 3, { g: 'tea' }], ['plantain', 3, 4], ['melktert', 4, 4], ['merguez', 4, 4],
    ['groundnut stew', 4, 4], ['berbere', 4, 4], ['harira', 5, 4], ['pastilla', 5, 4], ['doro wat', 5, 4], ['nyama choma', 5, 4], ['suya', 5, 4], ['koeksister', 5, 4],
    ['egusi', 5, 5], ['moi moi', 5, 5], ['pap', 5, 5, { g: 'maize porridge' }], ['chakalaka', 5, 5], ['sadza', 5, 5], ['tibs', 5, 5], ['kitfo', 5, 5], ['mandazi', 5, 5],
    ['brik', 5, 5], ['chermoula', 5, 5], ['mechoui', 5, 5], ['kenkey', 5, 5], ['banku', 5, 5], ['attieke', 5, 5], ['thieboudienne', 5, 5], ['chicken yassa', 5, 5],
    ['ful medames', 5, 5], ['koshari', 5, 5], ['malva pudding', 5, 5], ['potjiekos', 5, 5], ['vetkoek', 5, 5], ['sosatie', 5, 5], ['matoke', 5, 5], ['maafe', 5, 5],
  ],

  asian_food: [
    ['sushi', 1, 2], ['fried rice', 1, 2], ['tofu', 1, 2], ['ramen', 2, 2], ['pad thai', 2, 2], ['dumplings', 2, 2], ['spring roll', 2, 2], ['dim sum', 2, 2], ['chow mein', 2, 2],
    ['kimchi', 2, 3], ['tempura', 2, 3], ['naan', 2, 3], ['butter chicken', 2, 3], ['curry', 1, 2], ['sashimi', 2, 2], ['kung pao chicken', 2, 3], ['sweet and sour pork', 2, 3],
    ['hot pot', 2, 3, { g: 'dish' }], ['pho', 3, 3], ['bibimbap', 3, 3], ['samosa', 3, 3], ['chicken tikka masala', 3, 3], ['lo mein', 3, 3], ['peking duck', 3, 3], ['mapo tofu', 3, 3],
    ['satay', 3, 3], ['nasi goreng', 3, 3], ['adobo', 3, 3], ['katsu', 3, 3], ['gyoza', 3, 3], ['udon', 3, 3], ['soba', 3, 3], ['biryani', 3, 3], ['tandoori chicken', 3, 3],
    ['dal', 3, 3], ['paneer', 3, 3], ['vindaloo', 3, 3], ['korma', 3, 3], ['chapati', 3, 3], ['lassi', 3, 3], ['mochi', 3, 3], ['bulgogi', 4, 3], ['char siu', 4, 3], ['lumpia', 4, 3],
    ['onigiri', 4, 3], ['green curry', 3, 3], ['massaman', 4, 4], ['jalfrezi', 4, 4], ['balti', 4, 4], ['rogan josh', 4, 4], ['chana masala', 4, 4], ['xiaolongbao', 5, 4],
    ['sinigang', 5, 4], ['pancit', 5, 4], ['halo-halo', 5, 4], ['khao soi', 5, 5], ['pad see ew', 5, 5], ['bak kut teh', 5, 5], ['roti prata', 5, 5], ['poori', 5, 5],
  ],

  oceanian_food: [
    ['Vegemite', 2, 2, B({ reg: ['AU'] })], ['meat pie', 1, 3], ['kiwifruit', 2, 3], ['coconut', 1, 3], ['macadamia', 3, 3], ['pavlova', 3, 3], ['lamington', 3, 3, { reg: ['AU'] }],
    ['anzac biscuit', 3, 3, { reg: ['AU', 'NZ'] }], ['Tim Tam', 3, 3, B({ reg: ['AU'] })], ['Milo', 3, 3, B({ g: 'drink' })], ['kangaroo meat', 3, 3], ['poke', 3, 3, { g: 'dish' }], ['taro', 3, 4],
    ['breadfruit', 3, 4], ['sausage sizzle', 4, 4, { reg: ['AU'] }], ['damper', 4, 4, { reg: ['AU'] }], ['barramundi', 4, 3], ['witchetty grub', 4, 4], ['fairy bread', 4, 4, { reg: ['AU'] }],
    ['chicken parmigiana', 4, 4, { reg: ['AU'] }], ['hangi', 4, 3, { reg: ['NZ'] }], ['kumara', 4, 4, { reg: ['NZ'] }], ['hokey pokey', 4, 4, { g: 'ice cream', reg: ['NZ'] }],
    ['whitebait fritter', 4, 4, { reg: ['NZ'] }], ['Chiko Roll', 4, 4, B({ reg: ['AU'] })], ['dim sim', 4, 4, { reg: ['AU'] }], ['yabby', 4, 4, { reg: ['AU'] }],
    ['green-lipped mussel', 4, 4], ['loco moco', 4, 3, { reg: ['US'] }], ['kalua pork', 4, 4], ['spam musubi', 4, 4], ['poi', 4, 4, { g: 'taro paste' }],
    ['pineapple lump', 5, 5, { reg: ['NZ'] }], ['afghan biscuit', 5, 5, { reg: ['NZ'] }], ['paua', 5, 5, { reg: ['NZ'] }], ['toheroa', 5, 5, { reg: ['NZ'] }],
    ['lau lau', 5, 5], ['haupia', 5, 5], ['kokoda', 5, 5], ['palusami', 5, 5], ['umu', 5, 5], ['lilly pilly', 5, 5], ['quandong', 5, 5], ['Kakadu plum', 5, 5, { type: 'proper' }],
    ['bunya nut', 5, 5], ['wattleseed', 5, 5], ['lemon myrtle', 5, 5], ['moreton bay bug', 5, 5, { reg: ['AU'] }],
  ],

  south_american_food: [
    ['empanada', 3, 3], ['quinoa', 2, 3], ['ceviche', 3, 3], ['asado', 3, 3], ['churrasco', 3, 3], ['dulce de leche', 3, 3], ['chimichurri', 3, 3], ['tapioca', 3, 3],
    ['açaí bowl', 3, 3, { al: [['acai bowl', 'spelling', 3, 3]] }], ['tres leches cake', 3, 3], ['caipirinha', 3, 3, ALC()], ['pisco sour', 3, 3, ALC()], ['mate', 3, 3, { g: 'drink' }],
    ['feijoada', 4, 4], ['arepa', 4, 4], ['pão de queijo', 4, 4, { al: [['pao de queijo', 'spelling', 4, 4]] }], ['alfajor', 4, 4], ['lomo saltado', 4, 4], ['milanesa', 4, 4],
    ['brigadeiro', 4, 4], ['yuca', 4, 4], ['guarana', 4, 4], ['cachaça', 4, 4, ALC({ al: [['cachaca', 'spelling', 4, 4, [], ALC()]] })], ['anticuchos', 5, 4], ['choripan', 5, 4],
    ['moqueca', 5, 4], ['coxinha', 5, 4], ['sancocho', 5, 4], ['aji amarillo', 5, 5], ['cuy', 5, 5], ['locro', 5, 5], ['humita', 5, 5], ['farofa', 5, 5], ['bandeja paisa', 5, 5],
    ['cachapa', 5, 5], ['provoleta', 5, 5], ['matambre', 5, 5], ['bife de chorizo', 5, 5], ['tiradito', 5, 5], ['causa', 5, 5, { g: 'potato dish' }], ['pollo a la brasa', 5, 5],
    ['picarones', 5, 5], ['quindim', 5, 5], ['salteña', 5, 5], ['chicha', 5, 5, { g: 'drink' }],
  ],

  north_american_food: [
    ['hamburger', 1, 2], ['hot dog', 1, 2], ['apple pie', 1, 2], ['mac and cheese', 1, 2, { al: [['macaroni and cheese', 'synonym', 1, 2]] }], ['fried chicken', 1, 2],
    ['maple syrup', 1, 2], ['pumpkin pie', 1, 3], ['brownies', 1, 3], ['barbecue ribs', 1, 2], ['clam chowder', 2, 3], ['cornbread', 2, 2], ['buffalo wings', 2, 3], ['meatloaf', 2, 2],
    ['pecan pie', 2, 3], ['fajitas', 2, 3], ['enchiladas', 2, 3], ['california roll', 2, 3], ['tuna casserole', 2, 3], ['brisket', 2, 3], ["s'mores", 3, 3], ['Twinkie', 2, 3, B()],
    ['cranberry sauce', 2, 3], ['poutine', 3, 3], ['tex-mex', 3, 3], ['cobbler', 3, 3], ['key lime pie', 3, 3], ['sweet potato pie', 3, 3], ['green bean casserole', 3, 3],
    ['crab cake', 3, 3], ['hush puppies', 3, 3], ['collard greens', 3, 3], ['chicken fried steak', 3, 3], ['beignet', 3, 3], ['pulled pork', 3, 3], ['chimichanga', 3, 3],
    ['corn chowder', 3, 3], ['lobster roll', 3, 3], ['jambalaya', 3, 3], ['gumbo', 3, 3], ['nanaimo bar', 4, 4, { reg: ['CA'] }], ['butter tart', 4, 4, { reg: ['CA'] }],
    ['montreal smoked meat', 4, 4, { reg: ['CA'] }], ['peameal bacon', 4, 4, { reg: ['CA'] }], ['jello salad', 4, 4], ['tourtière', 4, 4], ['succotash', 4, 4],
    ['scrapple', 5, 5], ['hotdish', 5, 5], ['johnnycake', 4, 4], ['cioppino', 4, 4],
  ],

  hot_drinks: [
    ['hot cocoa', 1, 1], ['herbal tea', 1, 1], ['green tea', 1, 2], ['peppermint tea', 1, 2], ['hot milk', 1, 1], ['instant coffee', 1, 2], ['decaf', 1, 2], ['cocoa', 1, 2],
    ['chai latte', 2, 2], ['filter coffee', 2, 2], ['drip coffee', 2, 2], ['hot cider', 2, 2], ['honey and lemon', 2, 3], ['turkish coffee', 2, 2], ['mulled wine', 2, 2, ALC()],
    ['irish coffee', 2, 3, ALC()], ['hot toddy', 3, 3, ALC()], ['mulled cider', 3, 3], ['café au lait', 3, 3, { al: [['cafe au lait', 'spelling', 3, 3]] }], ['Horlicks', 3, 3, B({ reg: ['UK'] })],
    ['Ovaltine', 3, 3, B()], ['glühwein', 3, 3, ALC({ al: [['gluhwein', 'spelling', 4, 4, [], ALC()]] })], ['yerba mate', 3, 3], ['cortado', 4, 3], ['doppio', 4, 4], ['ristretto', 4, 4],
    ['long black', 4, 4], ['butter tea', 4, 4], ['golden milk', 4, 4], ['hot buttered rum', 4, 4, ALC()], ['red eye', 4, 4, { g: 'coffee' }], ['babyccino', 4, 4],
    ['lungo', 5, 5], ['piccolo', 5, 5, { g: 'coffee' }], ['wassail', 5, 5], ['salep', 5, 5], ['champurrado', 5, 5], ['atole', 5, 5], ['kopi luwak', 5, 5],
  ],

  teas: [
    ['black tea', 1, 1], ['green tea', 1, 1], ['herbal tea', 1, 1], ['iced tea', 1, 2], ['lemon tea', 1, 2], ['peppermint tea', 1, 2], ['Earl Grey', 2, 2, { type: 'proper' }],
    ['English breakfast', 2, 2, { type: 'proper' }], ['chamomile', 2, 2, { g: 'tea' }], ['jasmine tea', 2, 2], ['sweet tea', 2, 3], ['bubble tea', 2, 3, { al: [['boba tea', 'synonym', 3, 3]] }],
    ['milk tea', 2, 2], ['fruit tea', 2, 2], ['ginger tea', 2, 2], ['chai', 2, 3], ['matcha', 2, 3], ['white tea', 3, 3], ['oolong', 3, 3], ['Darjeeling', 3, 3, { type: 'proper' }],
    ['Assam', 3, 3, { type: 'proper', g: 'tea' }], ['Ceylon tea', 3, 3], ['rooibos', 3, 3, { g: 'tea' }], ['hibiscus tea', 3, 3], ['masala chai', 3, 3],
    ['kombucha', 3, 4], ['thai tea', 3, 3], ['nettle tea', 3, 3], ['fennel tea', 3, 3], ['rosehip tea', 3, 3], ['builder\'s tea', 3, 3, { reg: ['UK'] }], ['yerba mate', 3, 3],
    ['lapsang souchong', 4, 4], ['pu-erh', 4, 4, { al: [['puer', 'spelling', 5, 5]] }], ['sencha', 4, 4], ['gunpowder', 4, 4, { g: 'tea' }], ['Lady Grey', 4, 4, { type: 'proper' }],
    ['nilgiri', 4, 4], ['Irish breakfast', 4, 4, { type: 'proper' }], ['tisane', 4, 3], ['butter tea', 4, 4], ['genmaicha', 5, 5], ['hojicha', 5, 5], ['keemun', 5, 5],
    ['longjing', 5, 5], ['tieguanyin', 5, 5], ['da hong pao', 5, 5], ['russian caravan', 5, 5], ['yellow tea', 5, 5],
  ],
};

export const FIXES = [
  { gloss: ['piccolo', 'instruments', 'instrument'] },
  { gloss: ['hokey pokey', 'dance', 'dance'] },
];

// Keep each theme to at most 40 words: drop the hardest rows (latest first) beyond that, so easy and middle words all stay.
export const DATA = Object.fromEntries(Object.entries(FULL).map(([k, rows]) => {
  const keep = rows.slice();
  while (keep.length > 40) {
    const worst = Math.max(...keep.map(r => Math.max(r[1], r[2])));
    let i = keep.length - 1;
    while (Math.max(keep[i][1], keep[i][2]) < worst) i--;
    keep.splice(i, 1);
  }
  return [k, keep];
}));

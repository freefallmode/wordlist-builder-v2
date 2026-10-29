// Generated word data: Food & Drink and the playable themes directly under it (fruits ... cooking).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
// Alcoholic drinks are flagged adult and sensitive, matching the wines / beers / spirits / cocktails themes.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const ALC = (o = {}) => ({ adult: true, sens: true, ...o });

export const THEMES = {
  fruits: { d: 1 }, vegetables: { d: 1 }, meat_and_seafood: { d: 1 }, dairy_and_eggs: { d: 1 }, breads_and_baking: { d: 1 },
  desserts_and_sweets: { d: 1 }, pasta_rice_and_grains: { d: 1 }, herbs_spices_and_sauces: { d: 2 }, dishes: { d: 3 }, drinks: { d: 1 }, cooking: { d: 2 },
};

export const DATA = {
  // ---------------------------------------------------------------- fruits (27 already in the pilot)
  fruits: [
    ['lime', 1, 1], ['grapefruit', 1, 1], ['blueberry', 1, 1], ['raspberry', 1, 1], ['blackberry', 1, 1], ['coconut', 1, 2], ['tangerine', 2, 2], ['clementine', 2, 2],
    ['apricot', 2, 2], ['nectarine', 3, 3], ['cranberry', 2, 2], ['honeydew', 2, 2, { al: [['honeydew melon', 'synonym', 2, 2]] }],
    ['cantaloupe', 2, 2, { al: [['rockmelon', 'synonym', 3, 3, ['AU', 'NZ']]] }], ['date', 2, 3, { g: 'fruit' }], ['olive', 1, 4],
    ['dragon fruit', 2, 3, { al: [['pitaya', 'synonym', 4, 4]] }], ['starfruit', 3, 3, { al: [['carambola', 'synonym', 4, 5]] }], ['durian', 3, 3],
    ['gooseberry', 3, 3], ['mulberry', 3, 3], ['currant', 3, 3], ['plantain', 3, 4], ['elderberry', 3, 4], ['kumquat', 4, 4],
    ['bilberry', 4, 4, { reg: ['UK'], al: [['whortleberry', 'synonym', 5, 5]] }], ['damson', 4, 4, { reg: ['UK'] }], ['greengage', 4, 4, { reg: ['UK'] }],
    ['loquat', 4, 4], ['soursop', 4, 4], ['custard apple', 4, 4], ['mangosteen', 4, 5], ['longan', 4, 4], ['jujube', 4, 5], ['feijoa', 4, 4, { reg: ['NZ'] }],
    ['tamarillo', 4, 4], ['ackee', 4, 4], ['cherimoya', 4, 5], ['cape gooseberry', 4, 4, { al: [['physalis', 'synonym', 5, 5], ['goldenberry', 'synonym', 5, 5]] }],
    ['medlar', 5, 5], ['salak', 5, 5], ['sapodilla', 5, 5],
  ],

  // ---------------------------------------------------------------- vegetables
  vegetables: [
    ['carrot', 1, 1], ['potato', 1, 1], ['tomato', 1, 1], ['onion', 1, 1], ['lettuce', 1, 1], ['cabbage', 1, 1], ['broccoli', 1, 1], ['cauliflower', 1, 1],
    ['spinach', 1, 1], ['peas', 1, 1], ['cucumber', 1, 1], ['celery', 1, 1], ['sweet potato', 1, 1], ['pumpkin', 1, 2], ['garlic', 1, 2], ['radish', 1, 2],
    ['corn', 1, 1, { al: [['sweetcorn', 'synonym', 2, 2, ['UK']], ['maize', 'synonym', 3, 3]] }],
    ['bell pepper', 1, 1, { al: [['capsicum', 'synonym', 2, 2, ['AU', 'UK', 'NZ', 'IN']], ['sweet pepper', 'synonym', 2, 2]] }],
    ['eggplant', 2, 2, { al: [['aubergine', 'synonym', 2, 2, ['UK']], ['brinjal', 'synonym', 4, 4, ['IN']]] }],
    ['zucchini', 2, 2, { al: [['courgette', 'synonym', 2, 2, ['UK']]] }],
    ['green beans', 1, 1, { al: [['string beans', 'synonym', 3, 3, ['US']]] }],
    ['beetroot', 2, 2, { al: [['beet', 'synonym', 2, 2, ['US']]] }],
    ['spring onion', 2, 2, { al: [['scallion', 'synonym', 3, 3, ['US']], ['green onion', 'synonym', 2, 2, ['US', 'CA']]] }],
    ['asparagus', 2, 2], ['turnip', 2, 2], ['parsnip', 2, 2], ['leek', 2, 2], ['kale', 2, 2], ['artichoke', 2, 3], ['yam', 2, 3],
    ['shallot', 3, 3], ['fennel', 3, 3], ['okra', 3, 3, { al: [["lady's fingers", 'synonym', 4, 4, ['UK']]] }], ['cassava', 3, 3], ['chard', 3, 3], ['watercress', 3, 3],
    ['endive', 3, 3], ['radicchio', 3, 4], ['edamame', 3, 3], ['bok choy', 3, 3, { al: [['pak choi', 'synonym', 3, 3, ['UK']]] }],
    ['arugula', 3, 2, { reg: ['US'], al: [['rocket', 'synonym', 3, 2, ['UK'], { g: 'salad leaf' }]] }],
    ['rutabaga', 3, 3, { reg: ['US'], al: [['swede', 'synonym', 3, 3, ['UK']]] }],
    ['mangetout', 3, 3, { reg: ['UK'], al: [['snow peas', 'synonym', 3, 3, ['US']]] }],
    ['kohlrabi', 4, 4], ['celeriac', 4, 4], ['daikon', 4, 4], ['jicama', 4, 4], ['tomatillo', 4, 4], ['samphire', 4, 4, { reg: ['UK'] }], ['bamboo shoots', 4, 4],
    ['salsify', 5, 5], ['chayote', 5, 5], ['romanesco', 5, 5],
  ],

  // ---------------------------------------------------------------- meat and seafood
  meat_and_seafood: [
    ['beef', 1, 1], ['pork', 1, 1], ['chicken', 1, 1], ['lamb', 1, 1], ['bacon', 1, 1], ['ham', 1, 1], ['sausage', 1, 1], ['steak', 1, 1], ['turkey', 1, 2, { g: 'bird' }],
    ['duck', 1, 2], ['salmon', 1, 1], ['tuna', 1, 1], ['cod', 1, 1], ['lobster', 1, 1], ['crab', 1, 1],
    ['shrimp', 1, 1, { al: [['prawn', 'synonym', 1, 1, ['UK', 'AU']]] }],
    ['ground beef', 1, 1, { al: [['mince', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE'], { g: 'meat' }]] }],
    ['veal', 2, 2], ['oyster', 2, 2], ['mussel', 2, 2], ['clam', 2, 2], ['scallop', 2, 2], ['octopus', 2, 3], ['sardine', 2, 2], ['anchovy', 2, 2], ['trout', 2, 2],
    ['swordfish', 2, 3], ['squid', 2, 2, { al: [['calamari', 'synonym', 2, 2]] }], ['goose', 2, 3],
    ['venison', 3, 2], ['mutton', 3, 2], ['haddock', 3, 2], ['halibut', 3, 3], ['sea bass', 3, 3], ['mackerel', 3, 3], ['herring', 3, 3], ['tilapia', 3, 3], ['eel', 3, 3],
    ['oxtail', 3, 3], ['offal', 3, 3, { reg: ['UK'], al: [['organ meats', 'synonym', 3, 3]] }],
    ['crayfish', 3, 3, { al: [['crawfish', 'synonym', 3, 3, ['US']], ['crawdad', 'synonym', 4, 4, ['US']]] }],
    ['sea urchin', 4, 4, { al: [['uni', 'synonym', 5, 5]] }],
    ['tripe', 4, 4], ['whelk', 4, 4], ['cockle', 4, 4], ['abalone', 4, 4], ['monkfish', 4, 4], ['langoustine', 4, 4],
    ['skate', 4, 4, { g: 'fish' }], ['hogget', 5, 5, { reg: ['UK'] }], ['sweetbreads', 5, 5], ['lamprey', 5, 5],
  ],

  // ---------------------------------------------------------------- dairy and eggs
  dairy_and_eggs: [
    ['milk', 1, 1], ['cheese', 1, 1], ['butter', 1, 1], ['cream', 1, 1], ['egg', 1, 1], ['egg white', 1, 1, { al: [['albumen', 'synonym', 4, 4]] }], ['yolk', 1, 1],
    ['yogurt', 1, 1, { al: [['yoghurt', 'spelling', 1, 1, ['UK']]] }], ['milkshake', 1, 2], ['margarine', 2, 2], ['sour cream', 2, 2], ['buttermilk', 2, 2],
    ['whipped cream', 2, 2], ['cottage cheese', 2, 2], ['cream cheese', 2, 2], ['condensed milk', 2, 2], ['omelet', 2, 2, { al: [['omelette', 'spelling', 2, 2, ['UK']]] }],
    ['heavy cream', 2, 2, { reg: ['US'], al: [['double cream', 'synonym', 3, 3, ['UK']]] }],
    ['powdered milk', 3, 3, { al: [['milk powder', 'synonym', 3, 3]] }], ['evaporated milk', 3, 3], ['ghee', 3, 3], ['kefir', 3, 3], ['clotted cream', 3, 3, { reg: ['UK'] }],
    ['half and half', 3, 3, { type: 'phrase', reg: ['US'] }], ['whey', 3, 3],
    ['crème fraîche', 3, 3, { al: [['creme fraiche', 'spelling', 3, 3]] }],
    ['skyr', 4, 4], ['quark', 4, 4, { g: 'dairy' }], ['curds', 4, 4], ['custard powder', 4, 4, { reg: ['UK'] }], ['labneh', 5, 5], ['filmjölk', 5, 5],
  ],

  // ---------------------------------------------------------------- breads and baking
  breads_and_baking: [
    ['bread', 1, 1], ['loaf', 1, 1], ['roll', 1, 1, { g: 'bread' }], ['bagel', 1, 1], ['baguette', 1, 1], ['croissant', 1, 1], ['muffin', 1, 1], ['cake', 1, 1],
    ['cupcake', 1, 1], ['brownie', 1, 1], ['pie', 1, 1], ['flour', 1, 1], ['dough', 1, 2], ['toast', 1, 2],
    ['cookie', 1, 1, { al: [['biscuit', 'synonym', 1, 1, ['UK'], { g: 'cookie' }]] }],
    ['doughnut', 1, 1, { al: [['donut', 'spelling', 1, 1, ['US']]] }],
    ['pretzel', 2, 2], ['tortilla', 2, 2], ['naan', 2, 2], ['sourdough', 2, 2], ['flatbread', 2, 2], ['cornbread', 2, 2], ['scone', 2, 2], ['yeast', 2, 2],
    ['pita', 2, 2, { al: [['pitta', 'spelling', 3, 3, ['UK']]] }],
    ['icing', 2, 2, { al: [['frosting', 'synonym', 2, 2, ['US']]] }],
    ['sprinkles', 2, 2, { al: [['hundreds and thousands', 'synonym', 4, 4, ['UK'], { type: 'phrase' }]] }],
    ['baking powder', 2, 2], ['baking soda', 2, 2, { al: [['bicarbonate of soda', 'synonym', 3, 3, ['UK'], { type: 'phrase' }], ['bicarb', 'synonym', 4, 4, ['UK']]] }],
    ['focaccia', 3, 3], ['ciabatta', 3, 3], ['brioche', 3, 3], ['crumpet', 3, 3, { reg: ['UK'] }], ['soda bread', 3, 3, { reg: ['IE'] }], ['danish', 3, 3, { g: 'pastry' }],
    ['chapati', 3, 3, { reg: ['IN'], al: [['roti', 'synonym', 3, 3, ['IN']]] }], ['rolling pin', 2, 3],
    ['pumpernickel', 4, 4], ['challah', 4, 4], ['matzo', 4, 4], ['bannock', 4, 4], ['proofing', 4, 4], ['sourdough starter', 3, 4], ['lamination', 5, 5],
  ],

  // ---------------------------------------------------------------- desserts and sweets
  desserts_and_sweets: [
    ['ice cream', 1, 1], ['chocolate', 1, 1], ['cake', 1, 1], ['cookie', 1, 1], ['pie', 1, 1], ['cupcake', 1, 1], ['brownie', 1, 1], ['cheesecake', 1, 1],
    ['candy', 1, 1, { al: [['sweets', 'synonym', 1, 1, ['UK']]] }],
    ['lollipop', 1, 1, { al: [['lolly', 'synonym', 2, 2, ['UK', 'AU']]] }],
    ['marshmallow', 1, 1], ['caramel', 1, 1], ['gummy bear', 1, 1], ['pudding', 2, 2], ['custard', 2, 2], ['sundae', 2, 2], ['fudge', 2, 2], ['toffee', 2, 2], ['mousse', 2, 2],
    ['jelly beans', 2, 2], ['candy cane', 2, 2], ['sorbet', 2, 2], ['gelato', 2, 2], ['tiramisu', 2, 2], ['truffle', 2, 3, { g: 'chocolate' }],
    ['licorice', 2, 2, { al: [['liquorice', 'spelling', 2, 2, ['UK']]] }],
    ['cotton candy', 2, 2, { al: [['candy floss', 'synonym', 2, 2, ['UK']], ['fairy floss', 'synonym', 3, 3, ['AU']]] }],
    ['Kit Kat', 1, 2, { type: 'org', tm: true }], ['Snickers', 1, 2, { type: 'org', tm: true }], ['Skittles', 2, 3, { type: 'org', tm: true }],
    ['nougat', 3, 3], ['marzipan', 3, 3], ['panna cotta', 3, 3], ['baklava', 3, 3], ['churros', 3, 3], ['trifle', 3, 3, { reg: ['UK'] }],
    ['pavlova', 3, 3, { reg: ['AU', 'NZ', 'UK'] }], ['mochi', 3, 3], ['macaron', 3, 3], ['Turkish delight', 3, 3, { type: 'proper' }],
    ['crème brûlée', 3, 3, { al: [['creme brulee', 'spelling', 3, 3]] }],
    ['halva', 4, 4], ['kulfi', 4, 4, { reg: ['IN'] }], ['gulab jamun', 4, 4, { reg: ['IN'] }], ['blancmange', 4, 4, { reg: ['UK'] }], ['semifreddo', 5, 5], ['syllabub', 5, 5, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- pasta, rice and grains
  pasta_rice_and_grains: [
    ['pasta', 1, 1], ['rice', 1, 1], ['noodles', 1, 1], ['spaghetti', 1, 1], ['macaroni', 1, 1], ['oats', 1, 1], ['wheat', 1, 1], ['cereal', 1, 1], ['corn', 1, 2],
    ['lasagna', 1, 2, { al: [['lasagne', 'spelling', 2, 2, ['UK']]] }],
    ['penne', 2, 2], ['ravioli', 2, 2], ['couscous', 2, 2], ['quinoa', 2, 2], ['barley', 2, 2], ['rye', 2, 2], ['risotto', 2, 2], ['brown rice', 2, 2], ['ramen', 2, 2],
    ['instant noodles', 2, 2], ['granola', 2, 2], ['bran', 2, 2],
    ['fusilli', 3, 3], ['linguine', 3, 3], ['fettuccine', 3, 3], ['tortellini', 3, 3], ['rigatoni', 3, 3], ['farfalle', 3, 3], ['orzo', 3, 3], ['gnocchi', 3, 3],
    ['millet', 3, 3], ['buckwheat', 3, 3], ['spelt', 3, 3], ['polenta', 3, 3], ['wild rice', 3, 3], ['basmati', 3, 3], ['udon', 3, 3], ['vermicelli', 3, 3],
    ['rice noodles', 3, 3], ['muesli', 3, 3], ['grits', 3, 3, { reg: ['US'] }], ['semolina', 3, 3], ['cornmeal', 3, 3],
    ['bulgur', 3, 3, { al: [['bulgar', 'spelling', 4, 4]] }], ['pilaf', 3, 3, { al: [['pilau', 'spelling', 4, 4, ['UK']]] }],
    ['sorghum', 4, 4], ['amaranth', 4, 4], ['farro', 4, 4], ['arborio', 4, 4], ['soba', 4, 4], ['orecchiette', 4, 4], ['pappardelle', 4, 4], ['bucatini', 4, 4],
    ['teff', 5, 5], ['freekeh', 5, 5], ['kasha', 5, 5], ['trofie', 5, 5], ['triticale', 5, 5],
  ],

  // ---------------------------------------------------------------- herbs, spices and sauces
  herbs_spices_and_sauces: [
    ['salt', 1, 1], ['basil', 1, 1], ['parsley', 1, 1], ['mint', 1, 1], ['rosemary', 1, 1], ['cinnamon', 1, 1], ['ginger', 1, 2], ['vanilla', 1, 2], ['mustard', 1, 2],
    ['black pepper', 1, 1, { al: [['pepper', 'synonym', 1, 1, [], { g: 'spice' }]] }],
    ['ketchup', 1, 1, { al: [['catsup', 'spelling', 3, 3, ['US']]] }],
    ['mayonnaise', 1, 1, { al: [['mayo', 'synonym', 1, 1]] }],
    ['soy sauce', 1, 1], ['hot sauce', 1, 1], ['barbecue sauce', 1, 1], ['vinegar', 1, 1], ['gravy', 1, 1], ['salsa', 1, 1], ['olive oil', 1, 2],
    ['thyme', 2, 1], ['sage', 2, 1, { g: 'herb' }], ['oregano', 2, 1], ['dill', 2, 2], ['chives', 2, 2], ['bay leaf', 2, 2], ['nutmeg', 2, 2], ['paprika', 2, 2],
    ['cumin', 2, 2], ['cloves', 2, 2], ['chili powder', 2, 2], ['curry powder', 2, 2], ['pesto', 2, 2], ['hummus', 2, 2], ['relish', 2, 2], ['chutney', 2, 2],
    ['wasabi', 2, 3], ['tartar sauce', 2, 2, { al: [['tartare sauce', 'spelling', 3, 3, ['UK']]] }], ['ranch', 2, 2, { g: 'dressing' }],
    ['cilantro', 2, 1, { reg: ['US'], al: [['coriander', 'synonym', 2, 2, ['UK']]] }],
    ['tarragon', 3, 3], ['marjoram', 3, 3], ['lemongrass', 3, 3], ['turmeric', 3, 3], ['cardamom', 3, 3], ['saffron', 3, 3], ['cayenne', 3, 3], ['allspice', 3, 3],
    ['star anise', 3, 3], ['marinara', 3, 3], ['tahini', 3, 3], ['miso', 3, 3], ['fish sauce', 3, 3], ['aioli', 3, 3], ['vinaigrette', 3, 3], ['brown sauce', 3, 3, { reg: ['UK'] }],
    ['salad cream', 3, 3, { reg: ['UK'] }], ['Worcestershire sauce', 3, 3, { type: 'proper' }], ['Tabasco', 2, 3, { type: 'org', tm: true, g: 'hot sauce' }],
    ['béchamel', 3, 3, { al: [['bechamel', 'spelling', 3, 3]] }],
    ['chervil', 4, 4], ['sorrel', 4, 4], ['fenugreek', 4, 4], ['sumac', 4, 4], ['mace', 4, 4, { g: 'spice' }], ['hoisin', 4, 4], ['harissa', 4, 4], ['chimichurri', 4, 4],
    ['tapenade', 4, 4], ['mirin', 4, 4], ['mole', 4, 4, { g: 'sauce' }],
    ['lovage', 5, 5], ['borage', 5, 5], ['epazote', 5, 5], ['gochujang', 5, 5], ['ponzu', 5, 5],
    ['asafoetida', 5, 5, { al: [['hing', 'synonym', 5, 5, ['IN']]] }],
  ],

  // ---------------------------------------------------------------- dishes
  dishes: [
    ['pizza', 1, 1], ['sandwich', 1, 1], ['soup', 1, 1], ['salad', 1, 1], ['curry', 1, 1], ['sushi', 1, 1], ['taco', 1, 1], ['burrito', 1, 1], ['meatballs', 1, 1],
    ['pancakes', 1, 1], ['waffles', 1, 1], ['fried rice', 1, 1], ['nachos', 1, 1], ['hot dog', 1, 1], ['stew', 1, 2], ['dumplings', 1, 2],
    ['burger', 1, 1, { al: [['hamburger', 'synonym', 1, 1]] }],
    ['kebab', 1, 1, { al: [['kabob', 'spelling', 3, 3, ['US']]] }],
    ['mac and cheese', 1, 1, { type: 'phrase', al: [['macaroni cheese', 'synonym', 2, 2, ['UK']]] }],
    ['fish and chips', 1, 1, { type: 'phrase', reg: ['UK'] }],
    ['spaghetti bolognese', 2, 2, { al: [['spag bol', 'synonym', 3, 3, ['UK']]] }],
    ['lasagna', 1, 2], ['risotto', 2, 2], ['ramen', 2, 2],
    ['meatloaf', 2, 2], ['casserole', 2, 2], ['stir-fry', 2, 2], ['paella', 2, 2], ['pad thai', 2, 2], ['quiche', 2, 2], ['quesadilla', 2, 2], ['falafel', 2, 2],
    ['samosa', 3, 3], ['tempura', 2, 2], ['pot roast', 2, 2], ['roast dinner', 2, 2, { reg: ['UK'] }], ['French toast', 2, 2, { type: 'proper' }],
    ['moussaka', 3, 3], ['goulash', 3, 3], ['ratatouille', 3, 3], ['shawarma', 3, 3], ['tagine', 3, 3], ['biryani', 3, 3], ['dim sum', 3, 3], ['poutine', 3, 3, { reg: ['CA'] }],
    ['pierogi', 3, 3], ['frittata', 3, 3], ['gazpacho', 3, 3], ['pho', 3, 3], ['kimchi', 3, 3], ['haggis', 2, 2, { reg: ['UK'] }],
    ['borscht', 3, 3, { al: [['borsch', 'spelling', 4, 4]] }], ['bangers and mash', 3, 3, { type: 'phrase', reg: ['UK'] }],
    ['cassoulet', 4, 4], ['bouillabaisse', 4, 4], ['jollof rice', 4, 4], ['bibimbap', 4, 4], ['toad in the hole', 4, 4, { type: 'phrase', reg: ['UK'] }],
    ['chili', 2, 3, { g: 'dish' }], ['shakshuka', 4, 4], ['rendang', 4, 4], ['feijoada', 5, 5], ['khachapuri', 5, 5], ['cullen skink', 5, 5, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- drinks
  drinks: [
    ['water', 1, 1], ['milk', 1, 1], ['juice', 1, 1], ['tea', 1, 1], ['coffee', 1, 1], ['hot chocolate', 1, 1], ['lemonade', 1, 1], ['smoothie', 1, 1], ['milkshake', 1, 1],
    ['cola', 1, 1], ['iced tea', 1, 1],
    ['soda', 1, 1, { al: [['pop', 'synonym', 2, 2, ['US', 'CA'], { g: 'soft drink' }], ['fizzy drink', 'synonym', 2, 2, ['UK']], ['soft drink', 'synonym', 2, 2]] }],
    ['Coca-Cola', 1, 2, { type: 'org', tm: true, al: [['Coke', 'synonym', 1, 2]] }], ['Pepsi', 1, 2, { type: 'org', tm: true }],
    ['beer', 1, 1, ALC()], ['wine', 1, 1, ALC()], ['champagne', 1, 1, ALC()], ['vodka', 1, 2, ALC()], ['rum', 1, 2, ALC({ g: 'drink' })],
    ['sparkling water', 1, 1, { al: [['soda water', 'synonym', 2, 2, ['US']], ['fizzy water', 'synonym', 2, 2, ['UK']]] }],
    ['mineral water', 2, 2], ['tonic water', 2, 2], ['ginger ale', 2, 2], ['coconut water', 2, 2], ['energy drink', 2, 2], ['eggnog', 2, 3], ['root beer', 2, 3, { reg: ['US'] }],
    ['Red Bull', 2, 3, { type: 'org', tm: true }], ['squash', 2, 3, { g: 'drink', reg: ['UK'] }],
    ['whisky', 2, 2, ALC({ al: [['whiskey', 'spelling', 2, 2, ['US', 'IE']]] })], ['gin', 2, 2, ALC({ g: 'drink' })], ['tequila', 2, 2, ALC()], ['brandy', 2, 2, ALC()],
    ['cocktail', 1, 2, ALC()], ['cider', 2, 3, ALC({ g: 'alcoholic' })],
    ['kombucha', 3, 3], ['lassi', 3, 3], ['cordial', 3, 3, { reg: ['UK', 'AU'] }], ['prosecco', 3, 3, ALC()], ['sake', 3, 3, ALC()], ['mead', 3, 3, ALC()],
    ['sherry', 3, 3, ALC({ g: 'wine' })], ['port', 3, 3, ALC({ g: 'wine' })],
    ['horchata', 4, 4], ['yerba mate', 4, 4], ['absinthe', 4, 4, ALC()], ['vermouth', 4, 4, ALC()], ['schnapps', 4, 4, ALC()], ['ayran', 5, 5], ['kvass', 5, 5], ['baijiu', 5, 5, ALC()],
  ],

  // ---------------------------------------------------------------- cooking
  cooking: [
    ['recipe', 1, 1], ['ingredient', 1, 1], ['chef', 1, 1], ['bake', 1, 1, verb()], ['boil', 1, 1, verb()], ['fry', 1, 1, verb()], ['roast', 1, 1, verb()], ['grill', 1, 1, verb()],
    ['stir', 1, 1, verb()], ['chop', 1, 1, verb()], ['slice', 1, 2, verb()], ['melt', 1, 2, verb()],
    ['simmer', 2, 1, verb()], ['dice', 2, 2, verb()], ['whisk', 2, 2, verb()], ['steam', 2, 2, verb()], ['preheat', 2, 2, verb()], ['sift', 2, 2, verb()],
    ['mince', 2, 2, verb({ g: 'chop finely' })], ['season', 2, 2, verb({ g: 'cooking' })],
    ['knead', 3, 3, verb()], ['marinate', 3, 3, verb()], ['poach', 3, 3, verb()], ['braise', 3, 3, verb()], ['sear', 3, 3, verb()], ['baste', 3, 3, verb()],
    ['garnish', 3, 3, verb()], ['zest', 3, 3, { g: 'citrus peel' }], ['fold', 3, 3, verb({ g: 'cooking' })], ['reduce', 3, 3, verb({ g: 'cooking' })], ['sous chef', 3, 3],
    ['sauté', 3, 3, verb({ al: [['saute', 'spelling', 3, 3]] })],
    ['blanch', 4, 4, verb()], ['deglaze', 4, 4, verb()], ['julienne', 4, 4, verb()], ['prove', 4, 4, verb({ g: 'dough', reg: ['UK'], al: [['proof', 'synonym', 4, 4, ['US'], { g: 'dough' }]] })],
    ['flambé', 4, 4, verb({ al: [['flambe', 'spelling', 4, 4]] })], ['coddle', 4, 4, verb()], ['mise en place', 4, 4, { type: 'phrase' }],
    ['sous vide', 5, 5, { type: 'phrase' }], ['temper', 5, 5, verb({ g: 'chocolate' })], ['chiffonade', 5, 5], ['spatchcock', 5, 5, verb()], ['confit', 5, 5],
  ],
};

// Aliases for words that already existed (pilot) or that were added above, to give each theme aliases at several difficulties.
export const ALIASES = [
  ['drinks', 'coffee', '', [['java', 'synonym', 3, 3, [], { g: 'coffee' }], ['joe', 'synonym', 4, 4, ['US'], { g: 'coffee' }]]],
  ['drinks', 'tea', '', [['cuppa', 'synonym', 3, 3, ['UK', 'AU', 'NZ', 'IE']], ['char', 'synonym', 5, 5, ['UK'], { g: 'tea' }]]],
  ['drinks', 'wine', '', [['vino', 'synonym', 3, 3]]],
  ['drinks', 'champagne', '', [['bubbly', 'synonym', 3, 3, ['UK']], ['fizz', 'synonym', 4, 4, ['UK'], { g: 'champagne' }]]],
  ['drinks', 'beer', '', [['brew', 'synonym', 2, 2, [], { g: 'beer' }], ['brewski', 'synonym', 4, 4, ['US']]]],
  ['cooking', 'chef', '', [['cook', 'synonym', 1, 1, [], { g: 'person' }], ['cuisinier', 'synonym', 5, 5]]],
  ['cooking', 'grill', '', [['broil', 'synonym', 3, 3, ['US']]]],
  ['cooking', 'sift', '', [['sieve', 'synonym', 3, 3, ['UK'], { g: 'cooking' }]]],
  ['cooking', 'whisk', '', [['beat', 'synonym', 2, 2, [], { g: 'cooking' }]]],
  ['desserts_and_sweets', 'chocolate', '', [['choc', 'synonym', 2, 2, ['UK', 'AU']]]],
  ['desserts_and_sweets', 'pudding', '', [['afters', 'synonym', 3, 3, ['UK']]]],
  ['pasta_rice_and_grains', 'oats', '', [['rolled oats', 'synonym', 3, 3]]],
  ['pasta_rice_and_grains', 'cereal', '', [['breakfast cereal', 'synonym', 2, 2]]],
];

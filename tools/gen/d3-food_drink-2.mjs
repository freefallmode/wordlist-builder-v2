// Depth-3 batch: Food & Drink, chunk 2 (dairy, baking, desserts, pasta/rice/grains, herbs/spices themes).
const B = (o = {}) => ({ type: 'org', tm: true, ...o });   // brand

export const THEMES = {
  types_of_milk: { d: 2 }, egg_dishes: { d: 2 }, cheese_dishes: { d: 3 }, cheesemaking_words: { d: 5 },
  breads: { d: 1 }, pastries: { d: 2 }, cakes: { d: 1 }, cookies: { d: 1 }, pies_and_tarts: { d: 2 }, baking_ingredients: { d: 2 },
  flours: { d: 3 }, cake_decorations: { d: 3 }, ice_cream_flavors: { d: 1 }, frozen_desserts: { d: 1 }, puddings: { d: 3 },
  candy: { d: 1 }, chocolates: { d: 2 }, desserts_of_the_world: { d: 3 }, toppings: { d: 3 }, sweeteners: { d: 2 },
  pasta_shapes: { d: 2 }, pasta_dishes: { d: 2 }, noodles: { d: 2 }, rice_dishes: { d: 3 }, grains: { d: 3 },
  breakfast_cereals: { d: 2 }, dumplings: { d: 2 }, rice_varieties: { d: 4 }, herbs: { d: 2 }, spices: { d: 2 },
};

export const DATA = {
  types_of_milk: [
    ['whole milk', 1, 1], ['skim milk', 2, 1, { al: [['skimmed milk', 'spelling', 2, 2, ['UK']], ['nonfat milk', 'synonym', 3, 3, ['US']]] }],
    ['soy milk', 1, 1, { al: [['soya milk', 'spelling', 2, 2, ['UK']]] }], ['almond milk', 1, 1], ['oat milk', 1, 1], ['goat milk', 2, 2, { al: [["goat's milk", 'synonym', 2, 2]] }],
    ['buttermilk', 2, 2], ['condensed milk', 2, 2], ['evaporated milk', 2, 2], ['coconut milk', 1, 2], ['rice milk', 2, 2],
    ['cow milk', 2, 2, { al: [["cow's milk", 'synonym', 2, 2]] }], ['semi-skimmed milk', 3, 3, { reg: ['UK'] }], ['lactose-free milk', 3, 3],
    ['powdered milk', 3, 3, { al: [['milk powder', 'synonym', 3, 3]] }], ['raw milk', 3, 3], ['sheep milk', 3, 3], ['cashew milk', 3, 3], ['hemp milk', 4, 4],
    ['camel milk', 3, 3], ['chocolate milk', 1, 2], ['pea milk', 4, 4], ['donkey milk', 4, 4], ['buffalo milk', 3, 3],
  ],

  egg_dishes: [
    ['omelette', 1, 1, { al: [['omelet', 'spelling', 2, 2, ['US']]] }], ['scrambled eggs', 1, 1], ['fried egg', 1, 1], ['boiled egg', 1, 1], ['poached egg', 1, 1],
    ['eggs benedict', 2, 1], ['deviled eggs', 2, 1, { al: [['devilled eggs', 'spelling', 3, 3, ['UK']]] }], ['egg salad', 2, 1], ['quiche', 2, 2], ['frittata', 3, 2],
    ['soufflé', 3, 3, { al: [['souffle', 'spelling', 3, 3]] }], ['shakshuka', 4, 3], ['huevos rancheros', 4, 3], ['egg drop soup', 3, 3], ['egg fried rice', 2, 3],
    ['scotch egg', 3, 3, { reg: ['UK'] }], ['tamagoyaki', 4, 4], ['eggs florentine', 4, 3], ['eggs royale', 5, 4, { reg: ['UK'] }], ['soft-boiled egg', 2, 2],
    ['sunny side up', 2, 2], ['over easy', 2, 3], ['egg foo young', 4, 4], ['Spanish omelette', 3, 3, { al: [['tortilla española', 'synonym', 4, 4]] }],
    ['menemen', 5, 5], ['shirred eggs', 5, 4], ['coddled egg', 5, 4], ['century egg', 4, 4], ['egg in a basket', 3, 3], ['chawanmushi', 5, 5],
  ],

  cheese_dishes: [
    ['mac and cheese', 1, 1, { al: [['macaroni and cheese', 'synonym', 1, 1], ['macaroni cheese', 'synonym', 3, 3, ['UK']]] }],
    ['grilled cheese', 1, 1, { al: [['cheese toastie', 'synonym', 3, 3, ['UK']]] }], ['cheeseburger', 1, 2], ['quesadilla', 2, 1], ['nachos', 2, 2], ['fondue', 2, 1], ['raclette', 3, 2],
    ['welsh rarebit', 3, 2, { al: [['Welsh rabbit', 'synonym', 4, 4]] }], ['cheese sauce', 2, 2], ['cheesecake', 1, 3], ['cheese soufflé', 3, 3], ['cheese board', 2, 2],
    ['cauliflower cheese', 3, 3, { reg: ['UK'] }], ['croque monsieur', 3, 3], ['cheese straws', 3, 3, { reg: ['UK'] }],
    ['poutine', 3, 3, { reg: ['CA'] }], ['cheese fries', 2, 2], ['saganaki', 4, 3], ['halloumi fries', 4, 4], ['tartiflette', 4, 3], ['aligot', 5, 4],
    ['khachapuri', 4, 3], ['fonduta', 5, 4], ['queso fundido', 4, 3], ['cacio e pepe', 4, 4],
    ['cheese curds', 3, 3], ['paneer tikka', 4, 4],
  ],

  cheesemaking_words: [
    ['curds', 2, 1], ['whey', 2, 1], ['rennet', 3, 1], ['rind', 2, 2, { g: 'cheese' }], ['cheese wheel', 2, 1], ['brine', 2, 2], ['aging', 2, 2, { pos: 'verb', g: 'cheese', al: [['ageing', 'spelling', 2, 2, ['UK'], { g: 'cheese' }]] }],
    ['culture', 2, 3, { g: 'cheese' }], ['affinage', 5, 3], ['cheesecloth', 3, 2], ['cheese press', 3, 2], ['mold', 2, 3, { g: 'cheese' }], ['pasteurization', 3, 3],
    ['coagulation', 4, 3], ['cheddaring', 5, 2], ['cutting the curd', 4, 3], ['mesophilic', 5, 4], ['thermophilic', 5, 4],
    ['washed rind', 4, 3], ['bloomy rind', 4, 3], ['cheese vat', 4, 3], ['cheese harp', 5, 4], ['lipase', 5, 4], ['starter culture', 4, 2],
    ['cheese cave', 4, 3], ['ripening', 3, 3, { pos: 'verb' }], ['acidification', 5, 4],
  ],

  breads: [
    ['white bread', 1, 1], ['whole wheat bread', 1, 1, { al: [['wholemeal bread', 'synonym', 2, 2, ['UK']], ['brown bread', 'synonym', 2, 2]] }], ['baguette', 1, 1], ['sourdough', 1, 1], ['rye bread', 1, 1],
    ['bagel', 1, 1], ['pita', 1, 1, { al: [['pitta', 'spelling', 2, 2, ['UK']]] }], ['naan', 1, 1, { al: [['naan bread', 'synonym', 2, 2]] }], ['tortilla', 1, 2], ['ciabatta', 2, 1],
    ['focaccia', 2, 1], ['brioche', 2, 2], ['pumpernickel', 2, 2], ['cornbread', 1, 1], ['soda bread', 2, 1], ['challah', 3, 2], ['English muffin', 2, 2], ['flatbread', 2, 1],
    ['multigrain bread', 3, 1], ['chapati', 3, 2, { al: [['roti', 'synonym', 3, 3]] }], ['lavash', 4, 3],
    ['injera', 4, 3], ['bannock', 4, 3], ['matzo', 3, 3, { al: [['matzah', 'spelling', 4, 4]] }], ['pretzel', 1, 3], ['crumpet', 3, 3, { reg: ['UK'] }], ['stottie', 5, 4, { reg: ['UK'] }],
    ['bloomer', 4, 4, { g: 'bread', reg: ['UK'] }], ['pandesal', 4, 3], ['paratha', 4, 3],
    ['arepa', 4, 3], ['pain de campagne', 4, 4], ['batard', 4, 4],
  ],

  pastries: [
    ['croissant', 1, 1], ['danish', 2, 1, { g: 'pastry' }], ['donut', 1, 2, { al: [['doughnut', 'spelling', 1, 2, ['UK']]] }], ['eclair', 3, 1, { al: [['éclair', 'spelling', 2, 2]] }], ['cream puff', 2, 2],
    ['turnover', 2, 2, { g: 'pastry' }], ['strudel', 2, 2], ['cinnamon roll', 1, 2], ['puff pastry', 2, 2], ['baklava', 2, 2], ['cannoli', 2, 2], ['palmier', 3, 2], ['profiterole', 3, 2],
    ['pain au chocolat', 3, 2], ['macaron', 3, 3], ['mille-feuille', 4, 3, { al: [['napoleon', 'synonym', 3, 3, [], { g: 'pastry' }]] }], ['choux', 4, 3, { al: [['choux pastry', 'synonym', 3, 3]] }], ['sfogliatelle', 5, 3],
    ['kouign-amann', 5, 3], ['beignet', 3, 3], ['apple fritter', 2, 3], ['sausage roll', 2, 4, { reg: ['UK'] }], ['bear claw', 3, 3], ['cruller', 4, 3], ['churro', 3, 3],
    ['Chelsea bun', 4, 3, { reg: ['UK'] }], ['Eccles cake', 4, 4, { reg: ['UK'] }], ['vol-au-vent', 3, 3],
    ['rugelach', 4, 3], ['custard slice', 3, 3], ['cream horn', 3, 3], ['conchas', 4, 4],
  ],

  cakes: [
    ['chocolate cake', 1, 1], ['carrot cake', 1, 1], ['cheesecake', 1, 1], ['birthday cake', 1, 1], ['cupcake', 1, 1], ['pound cake', 2, 1], ['angel food cake', 2, 1], ['red velvet', 2, 1],
    ['sponge cake', 2, 1, { al: [['Victoria sponge', 'synonym', 3, 3, ['UK']]] }], ['fruitcake', 1, 2], ['lemon drizzle', 3, 2, { reg: ['UK'] }], ['black forest cake', 3, 2, { al: [['Black Forest gateau', 'synonym', 3, 3]] }],
    ['coffee cake', 2, 2], ['bundt cake', 3, 2], ['tiramisu', 2, 3], ['wedding cake', 1, 1], ['upside-down cake', 3, 2], ['layer cake', 2, 1], ['Battenberg', 4, 2, { reg: ['UK'] }],
    ['Dundee cake', 4, 2, { reg: ['UK'] }], ['Madeira cake', 4, 3, { reg: ['UK'] }], ['Sachertorte', 4, 3, { al: [['Sacher torte', 'spelling', 4, 4]] }], ['Genoise', 5, 4], ['chiffon cake', 4, 3], ['simnel cake', 5, 3, { reg: ['UK'] }],
    ['lamington', 4, 2, { reg: ['AU'] }], ['tres leches', 4, 2], ['opera cake', 4, 3], ['stollen', 4, 4], ['panettone', 3, 4], ['gugelhupf', 5, 3],
    ['ice cream cake', 1, 2], ['marble cake', 2, 1],
    ['Swiss roll', 2, 2, { reg: ['UK'] }], ['lemon cake', 1, 1],
  ],

  cookies: [
    ['chocolate chip', 1, 1, { al: [['choc chip', 'synonym', 2, 2, ['UK']]] }], ['oatmeal raisin', 1, 1], ['sugar cookie', 1, 1], ['gingerbread', 1, 2], ['peanut butter cookie', 1, 1], ['shortbread', 2, 2],
    ['snickerdoodle', 3, 1], ['macaroon', 3, 3], ['biscotti', 2, 2], ['fortune cookie', 1, 2], ['thumbprint', 4, 2], ['wafer', 2, 3],
    ['ladyfinger', 3, 3, { al: [['sponge finger', 'synonym', 3, 3, ['UK']]] }], ['black and white cookie', 3, 2], ['whoopie pie', 3, 3], ['spritz cookie', 4, 3],
    ['amaretti', 4, 3], ['speculoos', 4, 3, { al: [['biscoff', 'synonym', 3, 3, ['UK']]] }], ['digestive', 3, 3, { g: 'biscuit', reg: ['UK'] }], ['Anzac biscuit', 3, 2, { reg: ['AU', 'NZ'] }],
    ['florentine', 4, 3], ['lebkuchen', 4, 3], ['springerle', 5, 3], ['tuile', 4, 3], ['pizzelle', 5, 3],
    ['custard cream', 3, 3, { reg: ['UK'] }], ['ginger snap', 2, 2], ['linzer cookie', 4, 3],
  ],

  pies_and_tarts: [
    ['apple pie', 1, 1], ['cherry pie', 1, 1], ['pumpkin pie', 1, 1], ['pecan pie', 2, 1], ['blueberry pie', 1, 1], ['lemon meringue pie', 2, 1], ['key lime pie', 2, 1], ['banana cream pie', 2, 1],
    ['custard tart', 2, 1], ['fruit tart', 2, 1], ['mince pie', 3, 1, { reg: ['UK'] }], ['treacle tart', 3, 1, { reg: ['UK'] }],
    ['tarte tatin', 4, 2], ['Bakewell tart', 3, 1, { reg: ['UK'] }], ['rhubarb pie', 2, 1], ['mud pie', 2, 2], ['chess pie', 4, 2, { reg: ['US'] }],
    ['shoofly pie', 5, 2, { reg: ['US'] }], ['Mississippi mud pie', 3, 2], ['sweet potato pie', 2, 1],
    ['tarte au citron', 4, 2], ['Linzer torte', 4, 3], ['frangipane tart', 4, 2], ['Manchester tart', 5, 2, { reg: ['UK'] }],
    ['gooseberry pie', 4, 2], ['sugar pie', 4, 2], ['banoffee pie', 3, 2, { reg: ['UK'] }], ['Dutch apple pie', 3, 2],
  ],

  baking_ingredients: [
    ['flour', 1, 1], ['sugar', 1, 1], ['butter', 1, 1], ['eggs', 1, 1], ['baking soda', 2, 1, { al: [['bicarbonate of soda', 'synonym', 3, 3, ['UK']], ['bicarb', 'synonym', 4, 4, ['UK']]] }],
    ['baking powder', 2, 1], ['yeast', 2, 1], ['vanilla extract', 2, 1], ['brown sugar', 1, 1], ['powdered sugar', 2, 1, { al: [['icing sugar', 'synonym', 2, 2, ['UK']], ["confectioners' sugar", 'synonym', 4, 4, ['US']]] }],
    ['cocoa powder', 2, 1], ['cornstarch', 2, 2, { al: [['cornflour', 'synonym', 3, 3, ['UK']]] }], ['shortening', 3, 2], ['cream of tartar', 3, 2], ['chocolate chips', 1, 1],
    ['buttermilk', 2, 3], ['food coloring', 2, 2], ['sprinkles', 1, 3], ['almond extract', 3, 2], ['golden syrup', 3, 3, { reg: ['UK'] }],
    ['caster sugar', 3, 2, { reg: ['UK'] }], ['xanthan gum', 4, 3], ['ammonium carbonate', 5, 4], ['vital wheat gluten', 5, 3],
    ['sourdough starter', 3, 2], ['pectin', 4, 4], ['suet', 4, 3],
  ],

  flours: [
    ['all-purpose flour', 1, 1, { al: [['plain flour', 'synonym', 2, 2, ['UK']], ['AP flour', 'synonym', 4, 4]] }], ['wheat flour', 1, 1], ['whole wheat flour', 2, 1, { al: [['wholemeal flour', 'synonym', 3, 3, ['UK']]] }],
    ['bread flour', 2, 1, { al: [['strong flour', 'synonym', 4, 4, ['UK']]] }], ['self-rising flour', 2, 1, { al: [['self-raising flour', 'spelling', 2, 2, ['UK']]] }], ['cake flour', 2, 1], ['rye flour', 3, 1],
    ['almond flour', 2, 1], ['coconut flour', 2, 1], ['rice flour', 2, 1], ['corn flour', 2, 2], ['cornmeal', 2, 3], ['buckwheat flour', 3, 1], ['oat flour', 2, 1], ['spelt flour', 3, 1],
    ['semolina', 3, 2], ['pastry flour', 3, 1], ['chickpea flour', 3, 1, { al: [['gram flour', 'synonym', 4, 4], ['besan', 'synonym', 5, 5]] }], ['tapioca flour', 3, 2], ['potato flour', 3, 2], ['masa harina', 4, 2],
    ['durum flour', 4, 2], ['00 flour', 4, 2, { al: [['doppio zero', 'synonym', 5, 4]] }], ['teff flour', 4, 2], ['amaranth flour', 5, 2], ['sorghum flour', 4, 2], ['millet flour', 4, 2],
    ['cassava flour', 4, 2], ['quinoa flour', 4, 2], ['kamut flour', 5, 3], ['einkorn flour', 5, 3], ['arrowroot', 4, 4], ['hazelnut flour', 4, 3], ['atta', 5, 3], ['maida', 5, 3],
  ],

  cake_decorations: [
    ['frosting', 1, 1, { al: [['icing', 'synonym', 2, 1]] }], ['sprinkles', 1, 1, { al: [['hundreds and thousands', 'synonym', 3, 3, ['UK']], ['jimmies', 'synonym', 4, 4, ['US']]] }], ['candles', 1, 1],
    ['fondant', 3, 1], ['buttercream', 2, 1], ['marzipan', 3, 2], ['edible glitter', 3, 1], ['piping bag', 2, 1], ['whipped cream', 1, 2],
    ['cake topper', 2, 1], ['royal icing', 3, 1], ['ganache', 3, 2], ['gum paste', 4, 2], ['sugar flowers', 3, 1], ['edible pearls', 3, 1, { al: [['dragées', 'synonym', 4, 3]] }], ['rainbow sprinkles', 1, 1],
    ['chocolate curls', 3, 1], ['gold leaf', 3, 2], ['icing tip', 3, 1], ['sugar paste', 3, 1], ['sanding sugar', 4, 1], ['nonpareils', 4, 2], ['silver balls', 3, 1],
    ['petal dust', 5, 1], ['modeling chocolate', 5, 1], ['isomalt', 5, 2], ['rolled fondant', 3, 1],
    ['sugar pearls', 4, 1], ['confetti sprinkles', 3, 1],
  ],

  ice_cream_flavors: [
    ['vanilla', 1, 1], ['chocolate', 1, 1], ['strawberry', 1, 1], ['mint chocolate chip', 1, 1], ['cookies and cream', 1, 1], ['cookie dough', 1, 1], ['rocky road', 2, 1], ['butter pecan', 2, 1],
    ['neapolitan', 3, 1], ['pistachio', 2, 1], ['rum raisin', 3, 1], ['salted caramel', 2, 1], ['bubblegum', 1, 1],
    ['birthday cake', 1, 1], ['green tea', 2, 2], ['tutti frutti', 3, 1], ['praline', 3, 2], ['butterscotch', 2, 2],
    ['dulce de leche', 3, 1], ['cotton candy', 1, 1], ['raspberry ripple', 3, 1, { reg: ['UK'] }], ['stracciatella', 4, 2], ['black cherry', 2, 2], ['Moose Tracks', 4, 1, B({ reg: ['US'] })],
    ['Chunky Monkey', 3, 1, B({ reg: ['US'] })], ['black sesame', 4, 2], ['red bean', 4, 2], ['hokey pokey', 5, 1, { reg: ['NZ'] }], ['spumoni', 4, 1], ['pralines and cream', 3, 1],
    ['ube', 5, 2], ['stem ginger', 4, 3, { reg: ['UK'] }],
  ],

  frozen_desserts: [
    ['ice cream', 1, 1], ['sundae', 1, 1, { al: [['ice cream sundae', 'synonym', 1, 1]] }], ['popsicle', 1, 1, { tm: true, al: [['ice lolly', 'synonym', 2, 2, ['UK']], ['ice pop', 'synonym', 2, 2], ['paddle pop', 'synonym', 4, 4, ['AU'], { tm: true }]] }],
    ['sorbet', 2, 1], ['gelato', 2, 1], ['frozen yogurt', 2, 1, { al: [['froyo', 'synonym', 3, 3]] }], ['sherbet', 2, 2, { g: 'dessert', al: [['sherbert', 'spelling', 3, 3, [], { g: 'dessert' }]] }], ['ice cream cone', 1, 1],
    ['ice cream sandwich', 1, 1], ['granita', 3, 1], ['kulfi', 4, 2], ['snow cone', 1, 1, { al: [['shaved ice', 'synonym', 2, 2], ['slushie', 'synonym', 2, 3]] }], ['banana split', 2, 1],
    ['semifreddo', 4, 1], ['frozen custard', 3, 1], ['affogato', 4, 3], ['baked Alaska', 3, 2], ['soft serve', 2, 1], ['Italian ice', 2, 1], ['cassata', 5, 2], ['bombe', 5, 2, { g: 'dessert' }], ['mochi ice cream', 3, 2],
    ['kakigori', 5, 1], ['halo-halo', 5, 2], ['bingsu', 5, 2], ['dondurma', 5, 2], ['ice cream float', 2, 2, { al: [['root beer float', 'synonym', 2, 3]] }],
    ['choc ice', 3, 2, { reg: ['UK'] }],
  ],

  puddings: [
    ['rice pudding', 1, 1], ['chocolate pudding', 1, 1], ['bread pudding', 2, 1], ['banana pudding', 2, 1], ['tapioca pudding', 2, 1], ['sticky toffee pudding', 3, 1, { reg: ['UK'] }], ['Christmas pudding', 2, 1, { reg: ['UK'] }],
    ['vanilla pudding', 1, 1], ['butterscotch pudding', 2, 1], ['pudding cup', 1, 1],
    ['treacle sponge', 4, 1, { reg: ['UK'] }], ['jam roly-poly', 4, 1, { reg: ['UK'] }],
    ['summer pudding', 3, 1, { reg: ['UK'] }], ['semolina pudding', 3, 1, { reg: ['UK'] }],
    ['blancmange', 4, 1], ['junket', 5, 2], ["Eve's pudding", 5, 1, { reg: ['UK'] }], ['queen of puddings', 5, 1, { reg: ['UK'] }],
    ['Indian pudding', 4, 1, { reg: ['US'] }], ['hasty pudding', 5, 2], ['sago pudding', 4, 1], ['cabinet pudding', 5, 1],
    ['sussex pond pudding', 5, 1, { reg: ['UK'] }], ['plum pudding', 2, 1, { reg: ['UK'] }], ['steamed pudding', 3, 1], ['lemon pudding', 3, 1], ['pistachio pudding', 3, 1], ['chia pudding', 3, 1],
  ],

  candy: [
    ['lollipop', 1, 1], ['gummy bears', 1, 1], ['jelly beans', 1, 1], ['candy cane', 1, 1], ['bubblegum', 1, 1, { al: [['bubble gum', 'synonym', 1, 1]] }], ['cotton candy', 1, 1, { al: [['candy floss', 'synonym', 2, 2, ['UK']], ['fairy floss', 'synonym', 3, 3, ['AU']]] }],
    ['toffee', 2, 1], ['caramel', 1, 1], ['licorice', 2, 1, { al: [['liquorice', 'spelling', 2, 2, ['UK']]] }], ['marshmallow', 1, 1], ['gumdrop', 3, 1], ['jawbreaker', 3, 1], ['fudge', 2, 1], ['peppermint', 2, 1],
    ['hard candy', 1, 1], ['rock candy', 2, 1], ['butterscotch', 2, 1], ['nougat', 3, 1], ['bonbon', 3, 1],
    ['jelly babies', 3, 1, { reg: ['UK'] }], ['wine gum', 3, 1, { reg: ['UK'] }],
    ['lemon drop', 2, 1], ['candy corn', 2, 1, { reg: ['US'] }], ['sherbet lemon', 4, 1, { reg: ['UK'] }], ['pear drop', 4, 1, { reg: ['UK'] }],
    ['barley sugar', 4, 1, { reg: ['UK'] }], ['aniseed ball', 4, 1, { reg: ['UK'] }], ['brittle', 3, 2, { g: 'candy' }], ['sour belts', 3, 1], ['fruit chews', 2, 1], ['butter mint', 3, 1], ['peanut brittle', 2, 1],
    ['saltwater taffy', 3, 1, { reg: ['US'] }], ['gobstopper', 4, 1, { reg: ['UK'] }], ['fizzy cola bottles', 3, 1, { reg: ['UK'] }], ['rock sugar', 4, 1],
  ],

  chocolates: [
    ['milk chocolate', 1, 1], ['dark chocolate', 1, 1], ['white chocolate', 1, 1], ['truffle', 2, 1, { g: 'chocolate' }], ['chocolate bar', 1, 1],
    ['bittersweet chocolate', 2, 1], ['semisweet chocolate', 3, 1], ['praline', 3, 1], ['ganache', 3, 2], ['chocolate truffle', 2, 1],
    ['Snickers', 1, 1, B()], ['Kit Kat', 1, 1, B()], ['Toblerone', 2, 1, B()], ['Lindt', 2, 1, B()], ['Godiva', 3, 1, B()],
    ['Ferrero Rocher', 2, 1, B()], ['Mars bar', 2, 1, B({ reg: ['UK'] })], ['Twix', 1, 1, B()], ['Dairy Milk', 2, 1, B({ reg: ['UK'] })],
    ['couverture', 5, 1], ['gianduja', 5, 1], ['ruby chocolate', 4, 1], ['nibs', 4, 2, { g: 'cacao', al: [['cacao nibs', 'synonym', 4, 2]] }],
    ['Belgian chocolate', 2, 1], ['Swiss chocolate', 2, 1], ['chocolate orange', 3, 1], ['chocolate button', 3, 1], ['chocolate spread', 2, 2],
    ['cocoa butter', 3, 3], ['chocolate liquor', 5, 3], ['conche', 5, 4], ['praline filling', 4, 1], ['truffle shell', 5, 3], ['chocolatier', 3, 4],
  ],

  desserts_of_the_world: [
    ['tiramisu', 2, 1], ['crème brûlée', 2, 1], ['baklava', 2, 1], ['churros', 2, 1], ['flan', 2, 1, { g: 'dessert' }], ['cannoli', 2, 1], ['panna cotta', 3, 1], ['gelato', 2, 2], ['macaron', 3, 2],
    ['pavlova', 3, 1], ['baked Alaska', 3, 2], ['apple strudel', 2, 1], ['tres leches cake', 3, 1], ['Black Forest cake', 3, 1], ['profiteroles', 3, 2],
    ['zabaglione', 4, 1], ['semifreddo', 4, 1], ['Turkish delight', 3, 1, { al: [['lokum', 'synonym', 5, 4]] }], ['halva', 3, 1, { al: [['halwa', 'spelling', 4, 4]] }],
    ['sticky rice with mango', 3, 1], ['mont blanc', 4, 1], ['knafeh', 4, 1, { al: [['kunafa', 'spelling', 5, 4]] }],
    ['alfajores', 4, 1], ['brigadeiro', 4, 1], ['pastel de nata', 3, 1], ['loukoumades', 4, 1], ['dorayaki', 4, 1], ['taiyaki', 4, 1],
    ['mochi', 2, 1], ['kransekake', 5, 1], ['bibingka', 5, 1], ['galaktoboureko', 5, 1], ['tarte tatin', 4, 1], ['clafoutis', 4, 1], ['mille-feuille', 4, 2],
  ],

  toppings: [
    ['whipped cream', 1, 1], ['sprinkles', 1, 1], ['chocolate sauce', 1, 1], ['hot fudge', 2, 1], ['caramel sauce', 1, 1], ['maple syrup', 1, 2], ['cherry on top', 3, 1], ['crushed nuts', 2, 1],
    ['shredded coconut', 2, 1], ['strawberry sauce', 1, 1], ['marshmallow fluff', 2, 1], ['butterscotch sauce', 2, 1], ['crushed Oreos', 2, 1, { tm: true }], ['chocolate chips', 1, 2],
    ['streusel', 3, 2], ['crumble', 2, 3, { g: 'topping' }], ['meringue', 3, 3], ['candied pecans', 3, 1], ['toasted almonds', 2, 1], ['cinnamon sugar', 2, 1],
    ['granola', 2, 2], ['fresh berries', 1, 1], ['coulis', 4, 1], ['compote', 3, 2], ['chocolate shavings', 2, 1], ['cookie crumbs', 2, 1], ['toffee bits', 3, 1], ['mini marshmallows', 2, 1],
    ['hundreds and thousands', 3, 1, { reg: ['UK'] }], ['pistachio crumble', 4, 1], ['cacao nibs', 4, 2], ['edible flowers', 3, 2], ['brandy butter', 4, 2, { adult: true, reg: ['UK'] }], ['clotted cream', 3, 2, { reg: ['UK'] }],
    ['custard sauce', 3, 2], ['golden syrup drizzle', 4, 1, { reg: ['UK'] }], ['candied orange peel', 4, 2],
  ],

  sweeteners: [
    ['sugar', 1, 1], ['honey', 1, 1], ['maple syrup', 1, 1], ['brown sugar', 1, 1], ['stevia', 2, 1], ['aspartame', 3, 1], ['saccharin', 3, 1], ['sucralose', 3, 1], ['agave', 2, 1, { al: [['agave nectar', 'synonym', 3, 2]] }],
    ['molasses', 3, 1], ['corn syrup', 2, 1], ['cane sugar', 2, 1], ['raw sugar', 2, 1], ['treacle', 3, 1, { reg: ['UK'] }], ['golden syrup', 3, 1, { reg: ['UK'] }], ['jaggery', 4, 1],
    ['xylitol', 4, 1], ['erythritol', 4, 1], ['monk fruit', 3, 1], ['coconut sugar', 3, 1], ['date syrup', 3, 1], ['rice syrup', 3, 1], ['demerara', 4, 1, { al: [['demerara sugar', 'synonym', 4, 1]] }], ['muscovado', 4, 1],
    ['turbinado', 5, 1], ['HFCS', 4, 2, { type: 'acronym' }], ['sorbitol', 5, 1], ['maltitol', 5, 1],
    ['caster sugar', 3, 1, { reg: ['UK'] }], ['sorghum syrup', 5, 1], ['palm sugar', 4, 1], ['piloncillo', 5, 1], ['allulose', 5, 1],
  ],

  pasta_shapes: [
    ['spaghetti', 1, 1], ['penne', 1, 1], ['macaroni', 1, 1], ['fettuccine', 1, 1], ['lasagna', 1, 2], ['linguine', 2, 1], ['rigatoni', 2, 1], ['fusilli', 2, 1], ['farfalle', 2, 1, { al: [['bow tie pasta', 'synonym', 2, 1]] }],
    ['ravioli', 1, 2], ['tortellini', 2, 1], ['angel hair', 2, 1, { al: [['capellini', 'synonym', 3, 2]] }], ['orzo', 3, 1], ['rotini', 3, 1], ['shells', 2, 1, { g: 'pasta' }], ['elbow macaroni', 1, 1], ['cannelloni', 3, 1], ['manicotti', 3, 1],
    ['ziti', 3, 1], ['tagliatelle', 3, 1], ['pappardelle', 3, 1], ['orecchiette', 4, 1], ['conchiglie', 4, 1], ['bucatini', 4, 1], ['vermicelli', 3, 1], ['cavatappi', 4, 1], ['radiatori', 4, 1],
    ['paccheri', 5, 1], ['strozzapreti', 5, 1], ['trofie', 5, 1], ['casarecce', 5, 1], ['campanelle', 5, 1], ['gemelli', 4, 1], ['ditalini', 4, 1], ['stelline', 5, 1], ['agnolotti', 5, 1], ['cappelletti', 5, 1],
    ['mafalde', 5, 1], ['tortelloni', 4, 1], ['mezzelune', 5, 1], ['pici', 5, 1], ['fregola', 5, 1], ['ruote', 5, 1], ['tagliolini', 5, 1], ['spaghettini', 4, 1],
  ],

  pasta_dishes: [
    ['lasagna', 1, 1], ['mac and cheese', 1, 2], ['carbonara', 2, 1, { al: [['spaghetti carbonara', 'synonym', 2, 1]] }], ['bolognese', 2, 1, { al: [['ragù', 'synonym', 4, 2]] }],
    ['fettuccine alfredo', 3, 1, { al: [['alfredo', 'synonym', 2, 1]] }], ['pasta primavera', 3, 1], ['pesto pasta', 2, 1], ['baked ziti', 3, 1], ['cacio e pepe', 4, 1], ['puttanesca', 4, 1], ['arrabbiata', 4, 1],
    ['amatriciana', 5, 1], ['aglio e olio', 4, 1], ['pasta salad', 1, 2], ['pasta e fagioli', 4, 1], ['tortellini in brodo', 4, 1], ['stuffed shells', 2, 1],
    ['linguine with clams', 3, 1], ['pasta alla norma', 5, 1], ['spaghetti pomodoro', 3, 1], ['tuna pasta bake', 3, 1, { reg: ['UK'] }], ['spaghetti al limone', 5, 1], ['pasta al forno', 5, 1],
    ['pasta con le sarde', 5, 1], ['spaghetti vongole', 4, 1], ['pastitsio', 5, 1], ['cannelloni', 3, 2], ['penne arrabbiata', 3, 1],
  ],

  noodles: [
    ['ramen', 1, 1], ['egg noodles', 1, 1], ['rice noodles', 1, 1], ['udon', 2, 1], ['soba', 2, 1], ['lo mein', 2, 1], ['chow mein', 2, 1], ['pad thai', 2, 2], ['pho', 2, 2],
    ['vermicelli', 3, 2], ['glass noodles', 2, 1, { al: [['cellophane noodles', 'synonym', 3, 2]] }], ['instant noodles', 1, 1], ['dan dan noodles', 4, 2], ['yakisoba', 3, 2], ['somen', 4, 1],
    ['laksa', 4, 2], ['pancit', 4, 2], ['ho fun', 4, 1], ['hand-pulled noodles', 3, 1], ['mee goreng', 4, 2], ['kway teow', 4, 1], ['japchae', 4, 2], ['shirataki', 4, 1],
    ['mei fun', 4, 1], ['wonton noodles', 3, 1], ['singapore noodles', 3, 1], ['bean thread', 4, 1], ['soba noodles', 2, 1], ['udon noodles', 2, 1], ['cup noodles', 2, 1],
    ['ramen noodles', 1, 1], ['pho noodles', 3, 1], ['kuy teav', 5, 2], ['cold noodles', 3, 1], ['naengmyeon', 5, 1],
  ],

  rice_dishes: [
    ['fried rice', 1, 1], ['risotto', 2, 1], ['paella', 2, 1], ['rice pilaf', 3, 1, { }], ['biryani', 3, 1], ['jambalaya', 3, 1], ['congee', 3, 1, { al: [['rice porridge', 'synonym', 3, 2], ['jook', 'synonym', 5, 4]] }],
    ['rice and beans', 2, 1], ['bibimbap', 3, 1], ['onigiri', 3, 1], ['sticky rice', 2, 1], ['arroz con pollo', 3, 1], ['dirty rice', 3, 1], ['kedgeree', 4, 1, { reg: ['UK'] }],
    ['nasi goreng', 4, 1], ['pulao', 4, 1], ['khichdi', 5, 1], ['hoppin\' John', 4, 1, { reg: ['US'] }], ['chicken and rice', 1, 1], ['coconut rice', 2, 1], ['Spanish rice', 2, 1],
    ['jollof rice', 3, 1], ['gallo pinto', 5, 1], ['nasi lemak', 4, 1], ['donburi', 4, 1], ['lemon rice', 3, 1], ['plov', 5, 1], ['pongal', 5, 1],
    ['mujaddara', 5, 1], ['maqluba', 5, 1], ['kimbap', 4, 1], ['musubi', 4, 1], ['moros y cristianos', 5, 1], ['kabsa', 5, 1], ['egg fried rice', 2, 1], ['rice pudding', 1, 3],
  ],

  grains: [
    ['wheat', 1, 1], ['rice', 1, 1], ['corn', 1, 2], ['oats', 1, 1], ['barley', 2, 1], ['rye', 2, 1], ['quinoa', 2, 1], ['millet', 3, 1], ['sorghum', 4, 1], ['buckwheat', 3, 1], ['bulgur', 3, 1],
    ['farro', 3, 1], ['spelt', 3, 1], ['amaranth', 4, 1, { g: 'grain' }], ['teff', 4, 1], ['freekeh', 4, 1], ['kamut', 5, 1], ['triticale', 5, 1], ['einkorn', 5, 1], ['emmer', 5, 1], ['wild rice', 2, 2],
    ['cracked wheat', 3, 1], ['pearl barley', 3, 1], ['wheat berries', 4, 1], ['durum', 4, 1], ['fonio', 5, 1], ["job's tears", 5, 1],
    ['hulled barley', 4, 1], ['maize', 2, 1], ['brown rice', 1, 2], ['whole grain', 2, 2], ['rolled oats', 2, 2],
  ],

  breakfast_cereals: [
    ['cornflakes', 1, 1, { al: [['corn flakes', 'synonym', 1, 1]] }], ['oatmeal', 1, 1, { al: [['porridge', 'synonym', 2, 2, ['UK']]] }], ['granola', 1, 1], ['muesli', 2, 1], ['bran flakes', 2, 1], ['Cheerios', 1, 1, B()],
    ['Froot Loops', 1, 1, B()], ['Frosted Flakes', 1, 1, B({ al: [['Frosties', 'synonym', 2, 2, ['UK'], { type: 'org', tm: true }]] })], ['Lucky Charms', 1, 1, B()], ["Cap'n Crunch", 2, 1, B()], ['Rice Krispies', 1, 1, B()],
    ['Cocoa Puffs', 2, 1, B()], ['Honey Nut Cheerios', 2, 1, B()], ['Weetabix', 2, 1, B({ reg: ['UK'] })], ['Shredded Wheat', 2, 1, B()], ['Special K', 2, 1, B()],
    ['Raisin Bran', 2, 1, B()], ['Grape-Nuts', 3, 1, B()], ['Cinnamon Toast Crunch', 2, 1, B()], ['Trix', 2, 1, B()], ['Cookie Crisp', 3, 1, B()], ['Apple Jacks', 3, 1, B()], ['Golden Grahams', 3, 1, B()],
    ['Coco Pops', 2, 1, B({ reg: ['UK'] })], ['Alpen', 4, 1, B({ reg: ['UK'] })], ['Ready Brek', 4, 1, B({ reg: ['UK'] })],
    ['puffed rice', 2, 1], ['puffed wheat', 3, 1], ['Count Chocula', 3, 1, B()], ['Chex', 3, 1, B()], ['Wheaties', 3, 1, B()],
    ['Shreddies', 3, 1, B({ reg: ['UK'] })], ['Fruity Pebbles', 3, 1, B()],
  ],

  dumplings: [
    ['gyoza', 3, 1], ['potsticker', 4, 1], ['wonton', 3, 1], ['pierogi', 2, 1], ['dim sum', 2, 2], ['matzo ball', 3, 1],
    ['xiaolongbao', 4, 1, { al: [['soup dumpling', 'synonym', 3, 1]] }], ['har gow', 4, 1], ['siu mai', 4, 1], ['momo', 4, 1], ['mandu', 4, 1], ['pelmeni', 4, 1], ['vareniki', 5, 1],
    ['manti', 4, 1], ['spaetzle', 4, 2], ['kreplach', 5, 1], ['chicken and dumplings', 2, 1], ['apple dumpling', 2, 1], ['steamed dumpling', 1, 1], ['fried dumpling', 1, 1], ['jiaozi', 3, 1],
    ['khinkali', 5, 1], ['modak', 5, 1], ['suet dumpling', 4, 1, { reg: ['UK'] }],
    ['shumai', 4, 1], ['dango', 4, 2], ['tangyuan', 5, 1], ['kluski', 5, 2], ['knedlíky', 5, 1], ['dumpling soup', 2, 1], ['boiled dumpling', 2, 1],
  ],

  rice_varieties: [
    ['basmati', 3, 1, { al: [['basmati rice', 'synonym', 2, 1]] }], ['jasmine rice', 2, 1], ['brown rice', 1, 1], ['white rice', 1, 1], ['wild rice', 2, 2], ['sushi rice', 2, 1], ['arborio', 3, 1, { al: [['arborio rice', 'synonym', 3, 1]] }],
    ['long-grain rice', 2, 1], ['short-grain rice', 2, 1], ['sticky rice', 2, 1, { al: [['glutinous rice', 'synonym', 3, 2]] }], ['black rice', 3, 1, { al: [['forbidden rice', 'synonym', 4, 2]] }], ['red rice', 3, 1],
    ['carnaroli', 5, 1], ['bomba', 5, 1, { g: 'rice' }], ['calrose', 5, 1], ['parboiled rice', 3, 1, { al: [['converted rice', 'synonym', 4, 2, ['US']]] }], ['instant rice', 2, 1],
    ['sona masoori', 5, 1], ['ponni', 5, 1], ['koshihikari', 5, 1], ['Thai jasmine', 3, 1], ['patna rice', 4, 1],
    ['medium-grain rice', 3, 1], ['aromatic rice', 3, 1], ['Texmati', 5, 1, B()], ['Uncle Ben\'s', 2, 3, B()],
  ],

  herbs: [
    ['basil', 1, 1], ['parsley', 1, 1], ['mint', 1, 1], ['cilantro', 2, 1, { al: [['coriander', 'synonym', 2, 2, ['UK'], { g: 'herb' }]] }], ['rosemary', 1, 1], ['thyme', 2, 1], ['sage', 2, 1, { g: 'herb' }], ['oregano', 2, 1],
    ['dill', 2, 1], ['chives', 2, 1], ['bay leaf', 2, 1, { al: [['bay leaves', 'synonym', 2, 1]] }], ['tarragon', 3, 1], ['marjoram', 3, 1], ['lemongrass', 3, 2], ['chervil', 4, 1],
    ['sorrel', 4, 2], ['lovage', 5, 1], ['borage', 5, 1], ['savory', 4, 1, { g: 'herb' }], ['curry leaf', 4, 1], ['Thai basil', 3, 1], ['spearmint', 3, 1], ['peppermint', 2, 2], ['lemon balm', 4, 1],
    ['epazote', 5, 1], ['shiso', 4, 1], ['perilla', 5, 1], ['hyssop', 5, 1], ['culantro', 5, 1],
    ['lemon verbena', 4, 1], ['holy basil', 4, 1],
  ],

  spices: [
    ['cinnamon', 1, 1], ['black pepper', 1, 1], ['paprika', 2, 1], ['cumin', 2, 1], ['turmeric', 2, 1], ['nutmeg', 2, 1], ['cloves', 2, 1],
    ['cardamom', 3, 1], ['saffron', 2, 1, { g: 'spice' }], ['chili powder', 2, 1], ['cayenne', 2, 1, { al: [['cayenne pepper', 'synonym', 2, 1]] }], ['allspice', 3, 1], ['coriander seed', 3, 1], ['mustard seed', 3, 1],
    ['star anise', 3, 1], ['fennel seed', 3, 1], ['curry powder', 2, 1], ['garam masala', 3, 1], ['cinnamon stick', 1, 1], ['mace', 4, 1, { g: 'spice' }], ['fenugreek', 4, 1],
    ['sumac', 4, 1], ['asafoetida', 5, 1, { al: [['hing', 'synonym', 5, 2]] }], ['caraway', 3, 1], ['juniper berry', 4, 2], ['nigella', 5, 1, { al: [['kalonji', 'synonym', 5, 2]] }], ["za'atar", 4, 2],
    ['ras el hanout', 5, 1], ['five-spice powder', 4, 1], ['Sichuan peppercorn', 4, 1], ['annatto', 5, 1], ['grains of paradise', 5, 1], ['smoked paprika', 3, 1], ['white pepper', 2, 1],
    ['red pepper flakes', 2, 1], ['pumpkin pie spice', 3, 1], ['aniseed', 3, 2, { al: [['anise', 'synonym', 3, 2]] }],
  ],
};

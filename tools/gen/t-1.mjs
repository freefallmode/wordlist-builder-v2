// Top-up batch 1: thin themes and themes lacking hard words (cheeses ... breakfast foods).
const B = (o = {}) => ({ type: 'org', tm: true, ...o });   // brand names

export const THEMES = {};

export const FIXES = [{ gloss: ['humbug', 'words_meaning_nonsense', 'nonsense'] }];

export const DATA = {
  cheeses: [
    ['Caerphilly', 4, 4, { type: 'proper' }], ['Stinking Bishop', 4, 4, { type: 'proper', tm: true }], ['Appenzeller', 4, 4, { g: 'cheese' }],
    ['Vacherin', 5, 5], ['Cabrales', 5, 5], ['Livarot', 5, 5], ['Tete de Moine', 5, 5, { type: 'proper' }],
  ],
  cookies: [
    ['pfeffernusse', 4, 4], ['rugelach', 4, 4], ['hamantaschen', 5, 4], ['stroopwafel', 4, 4], ['polvoron', 5, 5], ['kourabiedes', 5, 5],
    ['sable', 4, 4, { g: 'biscuit' }],
  ],
  pies_and_tarts: [
    ['pithivier', 5, 5], ['tourtiere', 4, 4], ['stargazy pie', 4, 4], ['gypsy tart', 5, 5, { reg: ['UK'] }], ['scotch pie', 4, 4, { reg: ['UK'] }],
    ['galette des rois', 4, 4], ['pork pie', 2, 3], ['jam tart', 1, 1, { reg: ['UK'] }],
  ],
  flours: [
    ['plain flour', 1, 1], ['farina', 4, 4], ['besan', 4, 4], ['gram flour', 3, 3], ['ragi flour', 5, 5], ['chestnut flour', 4, 4],
    ['graham flour', 4, 4], ['bajra flour', 5, 5], ['lupin flour', 5, 5],
  ],
  cake_decorations: [
    ['dragee', 4, 4], ['cachous', 5, 5, { reg: ['UK'] }], ['angelica', 5, 5], ['piping gel', 4, 4], ['luster dust', 4, 4], ['pastillage', 5, 5],
    ['candied violets', 4, 4], ['glace cherry', 3, 3, { reg: ['UK'] }], ['hundreds and thousands', 3, 2, { reg: ['UK'] }], ['edible flowers', 2, 2],
  ],
  ice_cream_flavors: [
    ['gianduja', 5, 5], ['pandan', 4, 4, { g: 'flavor' }], ['taro', 4, 4], ['hokey pokey', 4, 4, { g: 'ice cream' }], ['fior di latte', 5, 5],
    ['nocciola', 5, 5], ['maple walnut', 3, 2], ['black walnut', 3, 3], ['mango', 1, 1], ['coffee', 1, 1],
  ],
  frozen_desserts: [
    ['sorbetto', 5, 4], ['cremolada', 5, 5], ['paletas', 4, 4], ['shaved ice', 2, 2], ['ice lolly', 2, 2], ['ice pop', 1, 1], ['tartufo', 4, 4],
    ['zuccotto', 5, 5], ['sorbetes', 5, 5],
  ],
  puddings: [
    ['spotted dick', 3, 3], ['figgy pudding', 4, 4], ['clootie dumpling', 5, 5, { reg: ['UK'] }], ['syllabub', 5, 5], ['posset', 5, 5],
    ['flummery', 5, 5], ['malva pudding', 5, 5], ['Bakewell pudding', 4, 4, { type: 'proper' }], ['cranachan', 5, 4], ['kheer', 4, 4],
    ['custard', 1, 1], ['trifle', 2, 3],
  ],
  candy: [
    ['humbug', 4, 4, { g: 'sweet' }], ['horehound', 5, 5], ['pontefract cake', 5, 5, { reg: ['UK'] }], ['kendal mint cake', 4, 4, { reg: ['UK'] }],
    ['cinder toffee', 4, 4, { reg: ['UK'] }], ['sugared almonds', 3, 3], ['divinity', 5, 5, { g: 'candy' }], ['penuche', 5, 5],
    ['Necco wafers', 5, 4, B()], ['comfit', 5, 5],
  ],
  desserts_of_the_world: [
    ['gulab jamun', 3, 3], ['jalebi', 3, 3], ['rasmalai', 4, 4], ['lamington', 4, 3], ['koeksister', 5, 5], ['melktert', 5, 5], ['sachertorte', 4, 4],
    ['dobos torte', 5, 5], ['tembleque', 5, 5], ['qatayef', 5, 5], ['trdelnik', 4, 4], ['tarta de santiago', 5, 5], ['mhalabiya', 5, 5],
  ],
  toppings: [
    ['jimmies', 4, 3, { reg: ['US'] }], ['chantilly cream', 4, 4], ['creme anglaise', 4, 4], ['hard sauce', 5, 5], ['cajeta', 5, 5],
    ['Magic Shell', 4, 4, B()], ['creme fraiche', 3, 3], ['dulce de leche', 3, 3], ['Cool Whip', 3, 2, B()], ['Nutella', 2, 2],
    ['hundreds and thousands', 3, 2],
  ],
  sweeteners: [
    ['neotame', 5, 5], ['advantame', 5, 5], ['acesulfame K', 5, 5, { type: 'proper' }], ['thaumatin', 5, 5], ['isomalt', 5, 5], ['mannitol', 5, 5],
    ['tagatose', 5, 5], ['panela', 4, 4], ['invert sugar', 4, 4], ['birch syrup', 5, 5], ['Splenda', 2, 2, B()], ['glucose syrup', 3, 3],
    ['fructose', 3, 3], ['maltose', 4, 4],
  ],
  pasta_shapes: [
    ['garganelli', 4, 4], ['busiate', 5, 5], ['malloreddus', 5, 5], ['trenette', 5, 5], ['scialatielli', 5, 5], ['maltagliati', 5, 5],
    ['cavatelli', 4, 4], ['lumache', 4, 4], ['anelli', 4, 4], ['corzetti', 5, 5], ['pizzoccheri', 5, 5], ['fideo', 4, 4], ['tripoline', 5, 5],
  ],
  pasta_dishes: [
    ['pasta alla gricia', 5, 5], ['pasta e ceci', 4, 4], ['timballo', 5, 5], ['pasta alla Genovese', 5, 5], ['penne alla vodka', 3, 3],
    ["pasta all'assassina", 5, 5], ['spaghetti bolognese', 1, 1], ['macaroni cheese', 2, 2], ['pasta bake', 1, 1, { reg: ['UK'] }],
  ],
  noodles: [
    ['lamian', 4, 4], ['dangmyeon', 5, 5], ['hiyamugi', 5, 5], ['saimin', 4, 4], ['mee pok', 5, 5], ['misua', 5, 5], ['yi mein', 4, 4],
    ['banh canh', 5, 5], ['rice sticks', 4, 4],
  ],
  noodle_dishes: [
    ['char kway teow', 4, 4], ['hokkien mee', 5, 5], ['wanton mee', 4, 4], ['bak chor mee', 5, 5], ['kitsune udon', 4, 4], ['zaru soba', 4, 4],
    ['kalguksu', 4, 4], ['mohinga', 5, 5], ['cao lau', 5, 5], ['biang biang noodles', 5, 5], ['yaki udon', 3, 3], ['miso ramen', 2, 2],
    ['tonkotsu ramen', 3, 3],
  ],
  rice_dishes: [
    ['arancini', 3, 3], ['sushi', 1, 2], ['ochazuke', 4, 4], ['omurice', 4, 4], ['tahdig', 5, 5], ['thieboudienne', 5, 5], ['waakye', 5, 5],
    ['bisi bele bath', 5, 5], ['khao man gai', 4, 4], ['nasi kuning', 5, 5], ['risi e bisi', 5, 5], ['arroz negro', 4, 4], ['jeera rice', 4, 3],
    ['tamago kake gohan', 5, 5],
  ],
  grains: [
    ['groats', 4, 4], ['kasha', 4, 4], ['pearl millet', 4, 4], ['finger millet', 4, 4], ['foxtail millet', 5, 5], ['ragi', 5, 5], ['jowar', 5, 5],
    ['bajra', 5, 5], ['kaniwa', 5, 5], ['maize', 2, 2], ['rolled oats', 2, 2],
  ],
  breakfast_cereals: [
    ['Ricicles', 4, 4, B({ reg: ['UK'] })], ['Sugar Puffs', 4, 4, B({ reg: ['UK'] })], ['Frosties', 3, 3], ['Corn Pops', 3, 3, B()], ['Kix', 4, 4, B()],
    ['Product 19', 5, 5, B()], ['Quisp', 5, 5, B()], ['Franken Berry', 4, 4, B()], ['Boo Berry', 4, 4, B()], ['Honey Smacks', 4, 4, B()],
    ['Crunchy Nut', 3, 3, B({ reg: ['UK'] })], ['Golden Nuggets', 5, 5, B()], ['Mueslix', 5, 5, B()],
  ],
  dumplings: [
    ['gnudi', 4, 4], ['gnocchi', 2, 3], ['canederli', 5, 5], ['Knödel', 3, 3], ['halusky', 5, 5], ['kopytka', 5, 5], ['uszka', 5, 5],
    ['nokedli', 5, 5], ['maultaschen', 5, 5], ['buuz', 5, 5], ['chuchvara', 5, 5], ['dumpling', 1, 1],
  ],
  rice_varieties: [
    ['forbidden rice', 3, 3], ['Carolina Gold', 5, 5, { type: 'proper' }], ['Vialone Nano', 5, 5, { type: 'proper' }], ['gobindobhog', 5, 5],
    ['matta rice', 4, 4], ['akitakomachi', 5, 5], ['sasanishiki', 5, 5], ['Wehani', 5, 5, B()], ['valencia rice', 4, 4], ['glutinous rice', 3, 3],
    ['Black Japonica', 5, 5, B()], ['bhutanese red', 5, 5],
  ],
  herbs: [
    ['rau ram', 5, 5], ['mitsuba', 5, 5], ['salad burnet', 5, 5], ['sweet cicely', 5, 5], ['papalo', 5, 5], ['hoja santa', 5, 5],
    ['winter savory', 4, 4], ['costmary', 5, 5], ['pennyroyal', 5, 4], ['angelica', 5, 4],
  ],
  spices: [
    ['ajwain', 4, 4], ['nigella', 4, 4], ['amchur', 5, 5], ['mahleb', 5, 5], ['cubeb', 5, 5], ['long pepper', 5, 5], ['sansho', 5, 5],
    ['cassia', 3, 3], ['kokum', 5, 5], ['black cardamom', 4, 4],
  ],
  salad_dressings: [
    ['wafu dressing', 5, 5], ['goma dressing', 5, 5], ['carrot ginger', 4, 4], ['Seven Seas', 5, 5, B()], ['Zesty Italian', 3, 3, B()],
    ['Wishbone', 4, 4, B({ g: 'dressing' })],
  ],
  breakfast_foods: [
    ['chilaquiles', 4, 4], ['scrapple', 4, 4], ['shakshuka', 3, 3], ['huevos rancheros', 3, 3], ['kedgeree', 4, 4], ['idli', 4, 4], ['upma', 5, 5],
    ['menemen', 5, 5], ['ful medames', 5, 5], ['laverbread', 5, 5], ['tattie scone', 4, 4, { reg: ['UK'] }], ['lorne sausage', 5, 5, { reg: ['UK'] }],
    ['bubble and squeak', 4, 4],
  ],
};

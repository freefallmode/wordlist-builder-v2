// Depth 4+ batch: Qualities, chunk 1 (colors in Spanish/French/Turkish, round/square/triangular/oval things, things made of wood/glass/paper/rubber/leather,
// food textures, spicy dishes, sweets by region, American candy, eating and impact sounds).

const adj = (o = {}) => ({ pos: 'adjective', ...o });
const BR = (o = {}) => ({ type: 'org', tm: true, ...o });

export const THEMES = {
  colors_in_spanish: { d: 2, lang: true }, colors_in_french: { d: 2, lang: true }, colors_in_turkish: { d: 4, lang: true },
  round_things: { d: 1 }, square_things: { d: 2 }, triangular_things: { d: 2 }, oval_things: { d: 3 },
  things_made_of_wood: { d: 1 }, things_made_of_glass: { d: 1 }, things_made_of_paper: { d: 1 }, things_made_of_rubber: { d: 2 }, things_made_of_leather: { d: 2 },
  crunchy_foods: { d: 1 }, chewy_foods: { d: 2 }, creamy_foods: { d: 2 }, fizzy_drinks: { d: 1 },
  spicy_dishes_of_asia: { d: 3 }, spicy_dishes_of_africa: { d: 5 }, sweet_treats_of_turkey: { d: 4 }, south_american_sweets: { d: 4 },
  american_candy: { d: 2 }, eating_sounds: { d: 2 }, impact_sounds: { d: 1 },
};

export const FIXES = [
  { gloss: ['noir', 'movie_genres', 'film genre'] },
  { gloss: ['dorado', 'fish', 'fish'] }, { gloss: ['esmeralda', 'names_that_are_gems', 'name'] },
];

export const DATA = {
  colors_in_spanish: [
    ['rojo', 2, 1, adj()], ['azul', 2, 1, adj({ g: 'color' })], ['verde', 2, 1, adj()], ['amarillo', 2, 1, adj()], ['blanco', 2, 1, adj()],
    ['negro', 2, 1, adj({ sens: true })], ['naranja', 3, 2, adj()], ['rosa', 3, 2, adj({ g: 'color' })], ['gris', 3, 2, adj()],
    ['morado', 3, 3, adj()], ['marrón', 3, 3, adj()], ['violeta', 3, 3, adj({ g: 'color' })], ['celeste', 4, 4, adj({ g: 'color' })],
    ['dorado', 3, 3, adj({ g: 'color' })], ['plateado', 4, 4, adj()], ['turquesa', 4, 4, adj()], ['anaranjado', 4, 4, adj()],
    ['rosado', 4, 4, adj()], ['púrpura', 4, 4, adj()], ['beige', 3, 4, adj()], ['lila', 4, 4, adj({ g: 'color' })], ['fucsia', 5, 4, adj()],
    ['azul marino', 4, 3, adj()], ['esmeralda', 4, 4, adj({ g: 'color' })], ['carmesí', 5, 5, adj()], ['granate', 5, 5, adj()],
    ['índigo', 5, 5, adj()], ['ámbar', 5, 5, adj({ g: 'color' })],
  ],
  colors_in_french: [
    ['rouge', 2, 1, adj({ g: 'red' })], ['bleu', 2, 1, adj()], ['vert', 2, 1, adj()], ['jaune', 2, 1, adj()], ['blanc', 2, 1, adj()],
    ['noir', 2, 1, adj({ g: 'color' })], ['orange', 1, 2, adj({ g: 'color' })], ['rose', 2, 2, adj({ g: 'color' })], ['gris', 3, 2, adj()],
    ['violet', 2, 3, adj({ g: 'color' })], ['marron', 3, 3, adj()], ['brun', 4, 4, adj()], ['doré', 4, 4, adj()], ['argenté', 4, 4, adj()],
    ['turquoise', 2, 3, adj({ g: 'color' })], ['beige', 3, 4, adj()], ['bleu marine', 4, 3, adj()], ['bleu ciel', 4, 3, adj()],
    ['pourpre', 4, 4, adj()], ['lilas', 4, 4, adj()], ['bordeaux', 3, 4, adj({ g: 'color' })], ['ocre', 4, 4, adj()],
    ['écarlate', 5, 5, adj()], ['cramoisi', 5, 5, adj()], ['grenat', 5, 5, adj()], ['rouille', 5, 5, adj()], ['fauve', 5, 5, adj()], ['noisette', 5, 5, adj()],
  ],
  colors_in_turkish: [
    ['kırmızı', 3, 1, adj({ al: [['kirmizi', 'spelling', 4, 3]] })], ['mavi', 3, 1, adj()], ['yeşil', 3, 1, adj({ al: [['yesil', 'spelling', 4, 3]] })],
    ['sarı', 3, 1, adj({ g: 'color' })], ['beyaz', 3, 1, adj()], ['siyah', 3, 1, adj()], ['turuncu', 4, 2, adj()], ['mor', 4, 2, adj()],
    ['pembe', 4, 2, adj()], ['gri', 4, 2, adj()], ['kahverengi', 4, 3, adj()], ['lacivert', 4, 3, adj()], ['altın', 4, 3, adj({ al: [['altin', 'spelling', 5, 4]] })],
    ['gümüş', 4, 3, adj({ al: [['gumus', 'spelling', 5, 4]] })], ['turkuaz', 4, 4, adj()], ['bej', 4, 4, adj()], ['bordo', 4, 4, adj()], ['krem', 4, 4, adj()],
    ['eflatun', 5, 4, adj()], ['haki', 5, 4, adj()], ['kızıl', 5, 5, adj()], ['fildişi', 5, 5, adj()], ['mercan', 5, 5, adj()], ['füme', 5, 5, adj()],
    ['kiremit', 5, 5, adj()], ['vişne', 5, 5, adj({ g: 'color' })], ['safran', 5, 5, adj({ g: 'color' })], ['çivit', 5, 5, adj()],
  ],

  round_things: [
    ['ball', 1, 1, { g: 'toy' }], ['coin', 1, 1, { g: 'money' }], ['plate', 1, 1], ['wheel', 1, 1], ['pizza', 1, 2], ['button', 1, 2, { g: 'sewing' }], ['moon', 1, 2],
    ['sun', 1, 2], ['bubble', 1, 1, { g: 'air bubble' }], ['ring', 1, 2, { g: 'jewelry' }], ['doughnut', 1, 2], ['pancake', 1, 3, { g: 'food' }], ['penny', 1, 2],
    ['clock face', 2, 2], ['cookie', 1, 3, { g: 'biscuit' }], ['frisbee', 2, 2], ['CD', 2, 2, { g: 'disc' }], ['hula hoop', 2, 2], ['manhole cover', 3, 2],
    ['saucer', 2, 3], ['bagel', 2, 3, { g: 'bread' }], ['Ferris wheel', 2, 3], ['dartboard', 3, 3], ['bullseye', 3, 3], ['steering wheel', 2, 3, { g: 'car' }],
    ['beach ball', 1, 2], ['bowling ball', 2, 2], ['snowball', 2, 2], ['marble', 2, 3, { g: 'glass ball' }], ['pearl', 2, 3, { g: 'gem' }], ['tambourine', 3, 3],
    ['cymbal', 3, 4], ['bottle cap', 2, 3], ['porthole', 3, 3], ['petri dish', 3, 4], ['pocket watch', 3, 3], ['grommet', 4, 4], ['washer', 3, 4, { g: 'fastener' }],
    ['roundel', 4, 4], ['discus', 3, 4, { g: 'sport' }], ['gong', 3, 4, { g: 'instrument' }],
  ],
  square_things: [
    ['napkin', 1, 2], ['sticky note', 1, 2], ['tile', 1, 2, { g: 'building' }], ['chessboard', 1, 2], ['checkerboard', 2, 2], ['waffle', 1, 3, { g: 'food' }],
    ['window', 1, 3, { g: 'house' }], ['picture frame', 1, 3], ['handkerchief', 2, 3], ['bandana', 2, 3], ['postage stamp', 2, 2], ['coaster', 2, 2, { g: 'drink mat' }],
    ['crossword', 2, 3, { g: 'puzzle' }], ['Sudoku', 2, 3], ['bouillon cube', 3, 4], ['sugar cube', 2, 3, { al: [['sugar lump', 'synonym', 3, 4, ['UK']]] }],
    ['town square', 2, 2], ['pixel', 2, 3], ['Polaroid', 2, 3, BR({ type: 'common' })], ['graph paper', 2, 2], ['brownie', 1, 3, { g: 'dessert' }], ['Jenga', 2, 4, BR()],
    ['Tetris', 2, 4, { type: 'title', tm: true }], ['post-it', 2, 2, BR()], ['canvas', 2, 3, { g: 'painting surface' }], ['floor tile', 2, 2], ['Scrabble tile', 3, 3, BR({ type: 'common' })],
    ['boxing ring', 2, 3], ['quilt square', 3, 4], ['sandbox', 2, 3, { g: 'play area' }],
  ],
  triangular_things: [
    ['pizza slice', 1, 1], ['sail', 1, 2, { g: 'boat' }], ['yield sign', 2, 2], ['guitar pick', 2, 2], ['nacho', 1, 2], ['pyramid', 1, 1], ['tent', 1, 3], ['gable', 3, 3],
    ['triangle', 1, 1, { g: 'instrument' }], ['set square', 3, 2], ['pennant', 2, 2], ['bunting', 2, 3, { g: 'flags' }], ['arrowhead', 2, 2], ['samosa', 2, 2],
    ['tortilla chip', 2, 2], ['onigiri', 3, 3], ['shark fin', 2, 3], ['Toblerone', 2, 2, BR()], ['Doritos', 1, 3, BR()], ['warning triangle', 2, 2],
    ['spinnaker', 3, 3], ['jib', 4, 4], ['pediment', 4, 3], ['Bermuda Triangle', 2, 2, { type: 'place' }], ['A-frame', 3, 3, { g: 'tent' }], ['tricorn', 4, 4], ['wedge', 2, 4, { g: 'shape' }],
    ['delta', 2, 4, { g: 'river' }],
  ],
  oval_things: [
    ['egg', 1, 1], ['rugby ball', 1, 2], ['American football', 1, 2], ['running track', 2, 2], ['racetrack', 2, 3], ['Oval Office', 2, 3], ['lemon', 1, 4],
    ['watermelon', 1, 4], ['olive', 1, 4, { g: 'fruit' }], ['almond', 2, 4, { g: 'nut' }], ['pill', 1, 4], ['lozenge', 3, 3], ['ellipse', 3, 2], ['locket', 2, 3],
    ['cameo', 3, 3, { g: 'brooch' }], ['platter', 2, 3], ['Colosseum', 2, 3], ['blimp', 2, 3], ['kidney bean', 2, 4], ['Fabergé egg', 3, 3], ['ostrich egg', 2, 2],
    ['quail egg', 3, 3], ['cartouche', 4, 4], ['velodrome', 3, 3], ['speedway', 4, 4], ['hand mirror', 2, 4], ['ovoid', 4, 3, { g: 'shape' }],
  ],

  things_made_of_wood: [
    ['pencil', 1, 1], ['chopsticks', 1, 2], ['violin', 1, 3], ['canoe', 2, 3], ['barrel', 1, 2, { g: 'container' }], ['table', 1, 3, { g: 'furniture' }],
    ['chair', 1, 3, { g: 'furniture' }], ['door', 1, 3, { g: 'house' }], ['fence', 1, 2], ['cabinet', 2, 3, { g: 'furniture' }], ['baseball bat', 1, 2], ['cricket bat', 2, 2],
    ['match', 1, 2], ['toothpick', 1, 2], ['clothespin', 2, 3], ['cutting board', 1, 2], ['rolling pin', 1, 2], ['log cabin', 1, 1], ['ladder', 1, 3, { g: 'steps' }],
    ['guitar', 1, 3], ['piano', 1, 4], ['wooden spoon', 1, 1], ['abacus', 2, 2], ['rocking horse', 2, 2], ['totem pole', 2, 2], ['clog', 2, 2], ['crate', 2, 3],
    ['coffin', 2, 3], ['mast', 3, 3], ['windmill', 2, 4, { g: 'building' }], ['hockey stick', 1, 2], ['xylophone', 2, 3], ['easel', 3, 3], ['gavel', 2, 2],
    ['toy blocks', 1, 2], ['cradle', 2, 3], ['popsicle stick', 2, 2], ['bench', 1, 3], ['pew', 3, 3], ['desk', 1, 3], ['shed', 2, 3], ['broom', 1, 3],
    ['tongue depressor', 3, 3], ['nutcracker', 2, 4], ['oar', 2, 3], ['skis', 1, 3], ['Pinocchio', 1, 1, { type: 'proper', tm: true }],
  ],
  things_made_of_glass: [
    ['window', 1, 1, { g: 'house' }], ['mirror', 1, 1, { g: 'object' }], ['bottle', 1, 2, { g: 'container' }], ['lightbulb', 1, 2], ['marble', 1, 2, { g: 'glass ball' }], ['jar', 1, 2],
    ['wine glass', 1, 1], ['drinking glass', 1, 1], ['windshield', 2, 2], ['eyeglasses', 1, 2], ['vase', 1, 2], ['aquarium', 2, 3], ['test tube', 2, 2], ['beaker', 2, 2],
    ['stained glass', 2, 1], ['snow globe', 2, 2], ['hourglass', 2, 3], ['glass slipper', 2, 2], ['crystal ball', 2, 2], ['monocle', 3, 3], ['greenhouse', 2, 2],
    ['thermometer', 2, 4], ['bead', 2, 4], ['kaleidoscope', 2, 4], ['magnifying glass', 1, 2], ['shot glass', 2, 2], ['chandelier', 2, 3], ['carafe', 3, 3], ['decanter', 3, 3],
    ['skylight', 2, 3], ['jam jar', 2, 2], ['prism', 2, 3], ['goblet', 3, 3], ['paperweight', 3, 3], ['fish bowl', 2, 2], ['glass eye', 3, 3],
    ['fiber optic cable', 3, 4, { al: [['optical fibre', 'synonym', 4, 4, ['UK']]] }], ['perfume bottle', 2, 3], ['milk bottle', 2, 2], ['beer mug', 2, 3],
  ],
  things_made_of_paper: [
    ['book', 1, 2], ['envelope', 1, 1, { g: 'mail' }], ['newspaper', 1, 1], ['magazine', 1, 2, { g: 'periodical' }], ['notebook', 1, 2, { g: 'paper' }], ['banknote', 2, 3],
    ['poster', 1, 2], ['map', 1, 3], ['paper plane', 1, 1], ['paper bag', 1, 1], ['wallpaper', 2, 2, { g: 'wall covering' }], ['cardboard', 1, 2], ['toilet paper', 1, 1],
    ['receipt', 1, 2], ['calendar', 1, 3], ['confetti', 1, 2], ['piñata', 2, 2], ['lantern', 2, 4], ['paper cup', 1, 1], ['diploma', 2, 2], ['postcard', 1, 1],
    ['comic book', 1, 2], ['coffee filter', 2, 2], ['paper towel', 1, 1], ['ballot', 2, 3], ['scroll', 2, 3, { g: 'writing' }], ['origami', 2, 1], ['paper chain', 2, 2],
    ['pamphlet', 2, 2], ['passport', 1, 3], ['papier-mâché', 3, 2], ['bookmark', 1, 2, { g: 'book' }], ['paper crane', 2, 1], ['paper fan', 2, 2], ['paper straw', 2, 2],
    ['wrapping paper', 1, 1], ['sheet music', 2, 3], ['kite', 1, 3, { g: 'toy' }], ['playing cards', 1, 3], ['greeting card', 1, 1], ['paper boat', 2, 2],
    ['paper hat', 2, 2], ['lottery ticket', 2, 3], ['tissue', 1, 2, { g: 'paper' }],
  ],
  things_made_of_rubber: [
    ['eraser', 1, 2], ['rain boots', 1, 2, { al: [['welly', 'synonym', 2, 2, ['UK']], ['gumboot', 'synonym', 3, 3, ['AU', 'NZ']]] }], ['hot water bottle', 2, 3],
    ['rubber band', 1, 1], ['rubber duck', 1, 1, { g: 'toy' }], ['rubber glove', 1, 2], ['hose', 1, 3, { g: 'pipe' }], ['bouncy ball', 1, 2], ['flip-flops', 1, 4],
    ['swim cap', 2, 2], ['inner tube', 2, 2], ['windshield wiper', 2, 3], ['doorstop', 3, 3], ['gasket', 3, 3], ['yoga mat', 3, 3], ['mouse pad', 2, 4], ['bungee cord', 2, 3],
    ['plunger', 2, 2, { g: 'tool' }], ['hockey puck', 2, 2], ['o-ring', 3, 3], ['bath mat', 1, 3], ['rubber stamp', 2, 2], ['wetsuit', 2, 3], ['galoshes', 3, 3],
    ['tire swing', 2, 3], ['squeegee', 2, 4, { g: 'cleaning' }], ['flippers', 2, 3], ['stopper', 2, 3], ['balloon', 1, 3, { g: 'party' }], ['tire', 1, 1, { g: 'wheel', al: [['tyre', 'spelling', 1, 1, ['UK']]] }],
  ],
  things_made_of_leather: [
    ['wallet', 1, 1], ['saddle', 2, 1, { g: 'horse gear' }], ['belt', 1, 1, { g: 'clothing' }], ['baseball glove', 1, 1], ['leather jacket', 1, 1], ['cowboy boots', 1, 2],
    ['handbag', 1, 2], ['briefcase', 2, 2], ['holster', 2, 2], ['bridle', 2, 2], ['harness', 2, 3, { g: 'horse tack' }], ['leash', 1, 3, { g: 'lead' }], ['satchel', 2, 2],
    ['suitcase', 1, 3], ['moccasin', 3, 2], ['loafer', 2, 3], ['punching bag', 2, 3], ['jerkin', 4, 3], ['bomber jacket', 2, 2], ['tool belt', 2, 3], ['upholstery', 3, 3],
    ['bookbinding', 4, 3], ['brogue', 4, 3], ['boxing glove', 1, 3], ['watch strap', 2, 3], ['chaps', 3, 2, { g: 'cowboy' }], ['sandals', 1, 4]
  ],

  crunchy_foods: [
    ['celery', 1, 1], ['crackers', 1, 1], ['apple', 1, 1, { g: 'fruit' }], ['croutons', 2, 1], ['pretzels', 1, 1], ['carrot', 1, 1], ['potato chips', 1, 1], ['popcorn', 1, 1],
    ['cornflakes', 1, 2], ['granola', 2, 2], ['almonds', 1, 2], ['peanut brittle', 2, 2], ['toast', 1, 2, { g: 'bread' }], ['cucumber', 1, 3], ['radish', 2, 3],
    ['tortilla chips', 1, 1], ['biscotti', 3, 2], ['crispbread', 3, 2], ['pork rinds', 2, 2], ['poppadom', 3, 2, { al: [['papadum', 'spelling', 4, 3]] }], ['tempura', 2, 3],
    ['spring roll', 2, 3], ['nachos', 1, 2], ['melba toast', 4, 3], ['bean sprouts', 2, 3], ['water chestnut', 3, 3], ['jicama', 4, 4], ['onion rings', 1, 3],
    ['pita chips', 2, 2], ['fried chicken', 1, 3], ['crackling', 3, 2], ['taco shell', 2, 2], ['breadsticks', 2, 2], ['rice cracker', 3, 2], ['gingersnap', 3, 2],
    ['puffed rice', 2, 2], ['brittle', 3, 2, { g: 'candy' }], ['wafer', 2, 3, { g: 'cookie' }],
  ],
  chewy_foods: [
    ['gummy bears', 1, 1], ['bagel', 1, 2, { g: 'bread' }], ['toffee', 2, 1], ['jerky', 2, 1], ['mochi', 3, 1], ['caramel', 1, 2], ['taffy', 2, 1], ['licorice', 2, 2],
    ['fruit leather', 3, 2], ['marshmallow', 1, 3], ['chewing gum', 1, 1], ['bubble gum', 1, 1], ['steak', 1, 3], ['calamari', 2, 3], ['dried mango', 2, 2], ['raisin', 1, 3],
    ['gummy worms', 1, 1], ['tapioca pearls', 3, 2, { al: [['boba', 'synonym', 3, 2], ['bubble tea pearls', 'synonym', 3, 3]] }], ['nougat', 3, 2], ['Starburst', 2, 2, BR({ type: 'proper' })],
    ['Tootsie Roll', 2, 2, BR()], ['granola bar', 1, 3], ['brownie', 1, 4, { g: 'dessert' }], ['dates', 2, 3, { g: 'fruit' }], ['ciabatta', 3, 4], ['naan', 2, 4],
    ['tteok', 5, 3], ['dumpling', 2, 4], ['dried apricot', 2, 3], ['Turkish delight', 2, 3], ['fudge', 1, 3, { g: 'sweet' }], ['jelly babies', 2, 2],
    ['wine gums', 3, 2, { reg: ['UK'] }], ['Mentos', 2, 2, BR()], ['Haribo', 2, 2, BR()], ['pizza crust', 1, 4], ['gnocchi', 2, 4], ['saltwater taffy', 2, 1],
  ],
  creamy_foods: [
    ['yogurt', 1, 1], ['custard', 1, 1], ['avocado', 1, 2], ['mashed potato', 1, 1], ['hummus', 2, 2], ['ice cream', 1, 1], ['pudding', 1, 1], ['cream cheese', 1, 1],
    ['mayonnaise', 1, 2], ['peanut butter', 1, 2], ['risotto', 2, 2], ['cream of mushroom', 2, 2], ['panna cotta', 3, 2], ['mousse', 2, 2, { g: 'dessert' }], ['cheesecake', 1, 2],
    ['béchamel', 3, 2], ['sour cream', 1, 2], ['guacamole', 1, 3], ['whipped cream', 1, 1], ['clotted cream', 3, 1, { reg: ['UK'] }], ['crème brûlée', 2, 2],
    ['milkshake', 1, 1], ['polenta', 3, 3], ['tzatziki', 3, 3], ['bisque', 3, 2, { g: 'soup' }], ['chowder', 3, 2], ['burrata', 3, 2], ['mascarpone', 3, 2],
    ['ricotta', 2, 3], ['fondue', 2, 3], ['hollandaise', 3, 2], ['crème fraîche', 3, 2], ['kefir', 3, 3], ['lemon curd', 3, 3], ['rice pudding', 2, 2],
    ['tahini', 3, 4], ['baba ganoush', 4, 3], ['gelato', 2, 3], ['tiramisu', 2, 3], ['alfredo sauce', 2, 2], ['ranch dressing', 1, 3],
  ],
  fizzy_drinks: [
    ['cola', 1, 1], ['sparkling water', 1, 1], ['ginger ale', 2, 1], ['tonic water', 2, 2], ['kombucha', 3, 3], ['lemonade', 1, 3], ['Coca-Cola', 1, 1], ['Pepsi', 1, 1],
    ['Sprite', 1, 1, { g: 'drink' }], ['Fanta', 1, 1], ['Dr Pepper', 2, 2], ['7UP', 2, 2, BR({ type: 'org' })], ['root beer', 2, 2], ['cream soda', 2, 2], ['orange soda', 1, 1],
    ['club soda', 2, 2], ['seltzer', 3, 2], ['soda water', 2, 2], ['energy drink', 1, 3], ['ginger beer', 2, 3], ['Irn-Bru', 3, 2, { reg: ['UK'] }], ['Mountain Dew', 2, 2],
    ['Schweppes', 2, 2], ['Perrier', 3, 2, BR()], ['San Pellegrino', 3, 3, BR()], ['Appletiser', 3, 2, BR({ reg: ['UK', 'AU'] })], ['Lilt', 4, 3, BR({ reg: ['UK'] })],
    ['Vimto', 3, 2, { reg: ['UK'] }], ['Lucozade', 3, 3, BR({ reg: ['UK'] })], ['Red Bull', 1, 3], ['Ramune', 4, 3], ['Moxie', 4, 3, { g: 'soda' }], ['sarsaparilla', 3, 3],
    ['fizzy pop', 2, 1, { reg: ['UK'] }], ['birch beer', 4, 4], ['Dandelion and Burdock', 4, 3, { reg: ['UK'] }], ['Cherry Coke', 2, 2, BR()], ['spritzer', 3, 4],
  ],

  spicy_dishes_of_asia: [
    ['kimchi', 2, 1], ['vindaloo', 3, 1], ['tom yum', 3, 2], ['mapo tofu', 3, 2], ['laksa', 3, 2], ['sambal', 3, 2], ['kung pao chicken', 2, 2], ['green curry', 2, 2],
    ['red curry', 2, 2], ['rendang', 3, 3], ['nasi goreng', 3, 3], ['tteokbokki', 3, 2], ['dan dan noodles', 3, 3], ['rogan josh', 3, 3], ['jalfrezi', 3, 3], ['madras', 2, 2, { g: 'curry' }],
    ['phaal', 4, 3], ['chili crab', 3, 3], ['som tam', 4, 3], ['larb', 4, 3], ['pad kra pao', 4, 4], ['sisig', 4, 4], ['bicol express', 5, 4], ['hot and sour soup', 2, 3],
    ['kimchi jjigae', 4, 3], ['mie goreng', 3, 3], ['ayam penyet', 5, 4], ['dak galbi', 5, 4], ['twice cooked pork', 4, 4], ['chole', 4, 4], ['ma la tang', 5, 4],
    ['gulai', 5, 5], ['hot pot', 2, 4, { g: 'dish' }],
  ],
  spicy_dishes_of_africa: [
    ['jollof rice', 3, 2], ['suya', 4, 2], ['harissa', 3, 2], ['doro wat', 4, 2], ['peri-peri chicken', 2, 1, { al: [['piri-piri chicken', 'spelling', 2, 1]] }], ['shakshuka', 3, 3],
    ['merguez', 3, 3], ['berbere', 4, 3], ['kitfo', 5, 4], ['tibs', 5, 4], ['egusi soup', 5, 3], ['pepper soup', 4, 3], ['kelewele', 5, 3], ['chakalaka', 4, 3],
    ['shito', 5, 4], ['pili pili', 5, 4], ['bunny chow', 4, 3], ['akara', 5, 4], ['harira', 4, 4], ['mechoui', 5, 4], ['zigni', 5, 4], ['misir wat', 5, 3],
    ['gored gored', 5, 5], ['ful medames', 4, 4], ['tagine', 3, 4, { g: 'dish' }], ['piri piri', 3, 2],
  ],
  sweet_treats_of_turkey: [
    ['baklava', 2, 1], ['Turkish delight', 2, 1], ['lokum', 3, 1], ['künefe', 4, 2, { al: [['kunefe', 'spelling', 4, 3]] }], ['helva', 4, 2], ['sütlaç', 4, 3],
    ['kadayıf', 5, 3, { al: [['kadayif', 'spelling', 5, 4]] }], ['tulumba', 5, 3], ['revani', 5, 4], ['lokma', 4, 3], ['aşure', 5, 4, { al: [['asure', 'spelling', 5, 4]] }], ['kazandibi', 5, 4],
    ['dondurma', 4, 3], ['şekerpare', 5, 4, { al: [['sekerpare', 'spelling', 5, 4]] }], ['tavuk göğsü', 5, 5, { al: [['tavuk gogsu', 'spelling', 5, 5]] }], ['ekmek kadayıfı', 5, 5],
    ['güllaç', 5, 5, { al: [['gullac', 'spelling', 5, 5]] }], ['pismaniye', 5, 5], ['cezerye', 5, 5], ['muhallebi', 4, 4], ['hosmerim', 5, 5], ['halka tatlisi', 5, 5],
    ['kabak tatlisi', 5, 5], ['ayva tatlisi', 5, 5], ['kestane sekeri', 5, 5],
  ],
  south_american_sweets: [
    ['dulce de leche', 2, 1, { al: [['doce de leite', 'synonym', 4, 3, ['BR']]] }], ['alfajor', 3, 2], ['brigadeiro', 4, 2], ['flan', 2, 3, { g: 'dessert' }], ['tres leches', 3, 3],
    ['churro', 2, 3], ['arroz con leche', 3, 3], ['quindim', 5, 3], ['picarones', 5, 3], ['arequipe', 5, 3], ['manjar blanco', 5, 3], ['cocada', 4, 3],
    ['dulce de membrillo', 4, 4], ['mazamorra morada', 5, 4], ['suspiro limeño', 5, 4], ['beijinho', 5, 4], ['paçoca', 5, 4], ['rapadura', 5, 4],
    ['pé de moça', 5, 5], ['dulce de batata', 5, 4], ['goiabada', 4, 4], ['chocotorta', 5, 4], ['canjica', 5, 5], ['bolo de rolo', 5, 5], ['arroz doce', 5, 4],
  ],
  american_candy: [
    ['candy corn', 2, 1], ['jelly beans', 1, 2], ['Twizzlers', 2, 1, BR()], ['Peeps', 3, 2, BR()], ['saltwater taffy', 2, 2], ['Reese\'s Cups', 2, 1, BR()],
    ['Hershey\'s Kisses', 2, 1, BR()], ['Snickers', 1, 1], ['M&M\'s', 1, 1, BR({ al: [['M&Ms', 'spelling', 1, 1]] })], ['Milky Way', 1, 2], ['Tootsie Roll', 2, 1, BR()],
    ['Jolly Rancher', 2, 2, BR()], ['Skittles', 1, 1, { g: 'candy' }], ['Starburst', 2, 2, BR({ type: 'proper' })], ['Sour Patch Kids', 2, 2, BR()],
    ['Butterfinger', 3, 2, BR()], ['Baby Ruth', 3, 2, BR()], ['Almond Joy', 3, 2, BR()], ['Three Musketeers', 3, 2, BR()], ['Twix', 1, 2], ['Kit Kat', 1, 2],
    ['Life Savers', 2, 2], ['Pez', 2, 2, BR()], ['Nerds', 3, 3, BR()], ['Swedish Fish', 3, 2, BR()], ['Junior Mints', 3, 2, BR()], ['Whoppers', 3, 3, BR()],
    ['Milk Duds', 4, 3, BR()], ['Pop Rocks', 2, 2], ['Atomic Fireball', 4, 3, BR()], ['jawbreaker', 2, 3], ['Dum Dums', 3, 3, BR()], ['Tootsie Pop', 3, 2, BR()],
    ['Bit-O-Honey', 5, 4, BR()], ['Mike and Ike', 4, 3, BR()], ['Red Vines', 4, 3, BR()], ['candy cane', 1, 2], ['cotton candy', 1, 2], ['candy apple', 1, 3],
    ['rock candy', 2, 3], ['Hot Tamales', 4, 3, BR()], ['Charleston Chew', 5, 4, BR()], ['Airheads', 3, 3, BR()], ['Mounds', 4, 3, BR()], ['Pixy Stix', 4, 3, BR()],
    ['Lemonheads', 4, 3, BR()], ['Good & Plenty', 5, 4, BR()],
  ],

  eating_sounds: [
    ['munch', 1, 1], ['slurp', 1, 1], ['gulp', 1, 1], ['chomp', 1, 1], ['crunch', 1, 1, { g: 'sound' }], ['burp', 1, 2, { g: 'noise' }], ['nom', 2, 1], ['chew', 1, 2],
    ['gobble', 1, 2], ['nom nom', 2, 1], ['yum', 1, 2, { pos: 'other' }], ['mmm', 1, 2, { pos: 'other' }], ['smack', 2, 2, { g: 'lips' }], ['glug', 2, 2], ['guzzle', 3, 3],
    ['sip', 1, 3], ['belch', 2, 2], ['gnaw', 2, 3], ['chug', 2, 3], ['champ', 3, 3, { g: 'chew' }], ['swallow', 1, 4, { g: 'throat' }], ['scoff', 3, 4], ['slobber', 3, 4],
    ['om nom nom', 2, 1], ['gnash', 3, 4],
  ],
  impact_sounds: [
    ['bang', 1, 1], ['crash', 1, 1, { g: 'sound' }], ['thud', 1, 1, { pos: 'other' }], ['thump', 1, 1, { pos: 'other' }], ['clang', 2, 1], ['splat', 1, 2], ['wham', 2, 2, { g: 'comic' }],
    ['boom', 1, 1, { g: 'sound' }], ['smash', 1, 2, { g: 'sound' }], ['whack', 2, 2, { pos: 'other' }], ['crack', 1, 2, { g: 'sound' }], ['bam', 2, 2, { g: 'comic' }],
    ['pow', 1, 2, { g: 'comic' }], ['wallop', 3, 3, { pos: 'other' }], ['slam', 1, 2, { pos: 'other' }], ['thwack', 3, 2], ['clunk', 2, 2], ['clatter', 2, 3], ['plop', 2, 4],
    ['bonk', 2, 2, { g: 'sound' }], ['clank', 2, 2], ['kapow', 2, 2], ['thunk', 3, 2, { pos: 'other' }], ['thwump', 5, 3, { pos: 'other' }], ['clonk', 4, 3, { pos: 'other' }],
    ['whomp', 4, 3, { pos: 'other' }], ['biff', 3, 3], ['zonk', 4, 4, { pos: 'other' }], ['kerplunk', 3, 4], ['bong', 2, 3], ['crump', 5, 4, { pos: 'other' }],
    ['kaboom', 2, 2, { pos: 'other', al: [['ka-boom', 'spelling', 2, 2]] }], ['whump', 4, 3], ['wump', 5, 4, { pos: 'other' }],
  ],
};

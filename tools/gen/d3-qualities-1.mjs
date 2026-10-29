// Generated word data: Qualities > colors (all sub-themes) and Qualities > shapes and patterns.
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
// c(): a colour name that has other meanings, glossed 'color' (matches the existing colour entries). s(): a shape word, glossed 'shape'.
const c = (t, r, i, o = {}) => [t, r, i, { g: 'color', ...o }];
const s = (t, r, i, o = {}) => [t, r, i, { g: 'shape', ...o }];
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });

export const THEMES = {
  shades_of_red: { d: 1 }, shades_of_blue: { d: 2 }, shades_of_green: { d: 1 }, shades_of_yellow: { d: 1 }, shades_of_purple: { d: 2 },
  shades_of_brown: { d: 1 }, shades_of_orange: { d: 1 }, shades_of_pink: { d: 1 }, shades_of_gray: { d: 2 }, metallic_colors: { d: 2 },
  shades_of_white: { d: 2 }, cmyk_inks: { d: 4 }, colors_of_the_rainbow: { d: 1 }, olympic_ring_colors: { d: 3 }, shades_of_black: { d: 2 },
  blue_green_shades: { d: 3 }, pastel_colors: { d: 2 }, neon_colors: { d: 2 }, earth_tones: { d: 3 }, jewel_tones: { d: 3 },
  colors_named_after_foods: { d: 2 }, colors_named_after_flowers: { d: 3 }, colors_named_after_gems: { d: 3 }, colors_named_after_animals: { d: 4 },
  colors_named_after_places: { d: 5 },
  '2d_shapes': { d: 1 }, '3d_shapes': { d: 2 }, patterns: { d: 2 }, line_types: { d: 3 }, symbols: { d: 3 },
};

export const DATA = {
  shades_of_red: [
    ['red', 1, 1], ['scarlet', 2, 1], ['crimson', 2, 1], c('maroon', 2, 2), c('burgundy', 2, 2), c('ruby', 2, 2), ['cherry', 1, 3], ['brick red', 2, 2],
    ['blood red', 1, 1], ['wine', 1, 3], ['tomato', 1, 3, { g: 'color' }], c('rust', 2, 4), ['vermilion', 3, 2], ['carmine', 3, 3], c('cardinal', 3, 3),
    ['claret', 3, 3, { g: 'color' }], ['cerise', 4, 3], c('garnet', 3, 3), c('cinnabar', 4, 4), c('madder', 5, 5), ['oxblood', 4, 4], c('carnelian', 4, 5),
    ['fire engine red', 2, 2], ['Venetian red', 4, 4, P()], ['Indian red', 4, 4, P()], c('sangria', 3, 4), ['alizarin', 5, 5], ['candy apple red', 3, 3],
    ['ruby red', 2, 1], c('cranberry', 2, 3),
  ].filter(Boolean),

  shades_of_blue: [
    ['blue', 1, 1], ['navy', 1, 2, { al: [['navy blue', 'synonym', 1, 1]] }], ['sky blue', 1, 1], ['baby blue', 1, 2], ['royal blue', 2, 1], ['azure', 3, 2], ['cobalt', 3, 2],
    ['cerulean', 3, 3], ['cyan', 3, 3], ['turquoise', 2, 3], c('teal', 2, 4), c('sapphire', 2, 2), ['indigo', 2, 3], ['ultramarine', 3, 3], ['midnight blue', 2, 2],
    ['powder blue', 2, 2], c('denim', 2, 3), c('periwinkle', 3, 3), ['cornflower blue', 3, 3], ['steel blue', 3, 3], ['electric blue', 2, 2],
    ['prussian blue', 4, 4, P({ }) ].slice(0, 3).concat([{ type: 'proper' }]), ['cadet', 4, 5, { g: 'color' }], ['ice blue', 2, 2], ['Oxford blue', 4, 4, P()],
    ['duck egg blue', 4, 4], ['Egyptian blue', 5, 5, P()], ['Delft blue', 4, 4, P()], c('lapis', 4, 4), ['petrol blue', 4, 4], ['Carolina blue', 4, 4, P()],
  ].map(r => (r[0] === 'prussian blue' ? ['Prussian blue', 4, 4, P()] : r)),

  shades_of_green: [
    ['green', 1, 1], c('lime', 1, 2), c('olive', 1, 3), c('emerald', 2, 2), ['forest green', 1, 1], ['mint', 1, 2], c('sage', 2, 3), c('jade', 2, 3),
    ['kelly green', 3, 3], ['hunter green', 3, 3], ['lime green', 1, 1], c('chartreuse', 3, 3), ['avocado', 1, 3], ['moss', 1, 3], ['pine green', 2, 2],
    ['sea green', 2, 2], ['seafoam', 3, 3, { al: [['sea foam', 'spelling', 3, 3]] }], ['pistachio', 2, 3], c('celadon', 4, 4), ['viridian', 4, 3], ['verdigris', 4, 4],
    ['bottle green', 3, 3], ['racing green', 3, 3], c('shamrock', 2, 2), c('fern', 2, 3), ['spring green', 2, 2], ['army green', 2, 2], c('malachite', 4, 4),
    ['Paris green', 5, 5, P()], ['Lincoln green', 5, 5, P()], ['eau de nil', 5, 5], ['jungle green', 2, 2], ['neon green', 1, 2], c('asparagus', 2, 4),
  ],

  shades_of_yellow: [
    ['yellow', 1, 1], ['lemon', 1, 2], c('gold', 1, 3), ['mustard', 1, 2], ['canary', 2, 2], c('banana', 1, 2), ['sunflower', 1, 2], c('amber', 2, 3),
    c('saffron', 3, 3), c('primrose', 3, 3), c('jonquil', 4, 4), c('maize', 3, 3), c('butter', 1, 3), c('buttercup', 2, 3), c('daffodil', 1, 3), c('honey', 1, 3),
    c('straw', 2, 3), c('flax', 4, 4), ['goldenrod', 3, 3], c('citrine', 4, 4), ['Naples yellow', 5, 5, P()], ['chrome yellow', 4, 4], ['school bus yellow', 2, 2],
    c('topaz', 3, 4), c('dandelion', 2, 3), ['cadmium yellow', 4, 4], ['lemon yellow', 1, 1], ['pale yellow', 1, 1], ['ochre', 3, 4],
  ].filter(Boolean),

  shades_of_purple: [
    ['purple', 1, 1], c('violet', 1, 2), c('lavender', 1, 2), c('lilac', 2, 2), ['mauve', 2, 2], c('plum', 2, 2), ['magenta', 2, 3], ['indigo', 2, 3], c('amethyst', 2, 3),
    c('periwinkle', 3, 3), ['orchid', 2, 3], c('grape', 1, 3), ['eggplant', 1, 3], c('heliotrope', 4, 4), c('wisteria', 3, 3), c('mulberry', 3, 3), c('thistle', 3, 4),
    ['royal purple', 2, 2], ['byzantium', 4, 4, { g: 'color' }], c('amaranth', 5, 5), ['Tyrian purple', 5, 5, P()], ['imperial purple', 4, 4], c('heather', 3, 3),
    c('iris', 3, 3), ['dark purple', 1, 1], ['light purple', 1, 1], ['aubergine', 3, 3], c('damson', 4, 3, { reg: ['UK'] }), ['fuchsia', 2, 3],
  ],

  shades_of_brown: [
    ['brown', 1, 1], ['chocolate', 1, 2], ['coffee', 1, 2], c('chestnut', 2, 2), c('tan', 2, 2), ['beige', 2, 3], ['taupe', 3, 3], c('mahogany', 3, 3), c('walnut', 2, 3),
    c('hazel', 2, 2), ['umber', 3, 3], ['sienna', 3, 3], ['sepia', 3, 3], ['russet', 3, 3], ['auburn', 3, 3], ['mocha', 2, 2], ['caramel', 1, 3], ['cinnamon', 2, 3],
    ['khaki', 2, 3], c('fawn', 3, 3), ['tawny', 3, 3], c('rust', 2, 4), ['burnt umber', 4, 4], ['raw sienna', 4, 4], c('cocoa', 2, 2), c('espresso', 2, 3), c('camel', 2, 3),
    c('buff', 3, 4), ['bistre', 5, 5], c('bay', 3, 4), c('drab', 4, 4), c('dun', 4, 4), ['mud brown', 1, 1], ['chocolate brown', 1, 1], c('toffee', 2, 3),
  ],

  shades_of_orange: [
    c('orange', 1, 1), ['tangerine', 2, 2], ['apricot', 2, 3], c('peach', 1, 3), c('coral', 2, 3), c('amber', 2, 3), ['pumpkin', 1, 3], ['carrot', 1, 3], c('salmon', 1, 3),
    ['burnt orange', 2, 1], c('rust', 2, 4), c('copper', 2, 3), ['terracotta', 3, 3], ['tawny', 3, 3], c('saffron', 3, 3), ['marigold', 2, 3], c('mango', 2, 3),
    c('cantaloupe', 3, 4), c('persimmon', 4, 4), c('flame', 2, 3), c('sunset', 2, 3), c('ginger', 2, 3), ['clementine', 2, 3], c('papaya', 3, 4), ['vermilion', 3, 4],
    ['safety orange', 2, 2], ['international orange', 4, 4], ['blaze orange', 3, 3], ['neon orange', 1, 2], c('bittersweet', 4, 5), ['cadmium orange', 5, 5],
    ['bright orange', 1, 1], ['pale orange', 1, 1],
  ],

  shades_of_pink: [
    ['pink', 1, 1], c('rose', 1, 2), c('blush', 2, 2), c('salmon', 1, 3), c('coral', 2, 3), ['fuchsia', 2, 2], ['magenta', 2, 3], ['hot pink', 1, 1], ['baby pink', 1, 1],
    ['bubblegum pink', 1, 1], ['flamingo', 2, 2], ['cerise', 4, 3], c('carnation', 3, 3), ['cherry blossom', 3, 3], c('peach', 1, 4), c('rouge', 3, 4), ['shocking pink', 3, 2],
    ['salmon pink', 2, 2], ['powder pink', 2, 2], ['millennial pink', 3, 3], ['candy pink', 2, 2], ['dusty rose', 3, 3], ['mauve', 2, 4], c('raspberry', 2, 4),
    c('watermelon', 2, 4), ['rose quartz', 3, 3, { g: 'color' }], ['Barbie pink', 3, 2, P({ tm: true })], ['light pink', 1, 1], ['deep pink', 1, 1], c('bubblegum', 1, 3),
  ],

  shades_of_gray: [
    ['gray', 1, 1], c('silver', 1, 3), c('charcoal', 2, 2), c('slate', 2, 2), c('ash', 2, 3), c('pewter', 3, 3), c('gunmetal', 3, 3), ['steel', 2, 3, { g: 'color' }],
    c('smoke', 2, 3), ['dove gray', 2, 2], ['battleship gray', 3, 3], c('stone', 2, 3), c('lead', 2, 3), c('graphite', 2, 3), ['platinum', 3, 4], c('fog', 2, 3),
    ['mouse gray', 2, 2], ['elephant gray', 3, 3], ['storm gray', 2, 3], c('cloud', 2, 3), c('pearl', 2, 4), c('oyster', 3, 3), c('cinder', 3, 3), c('flint', 3, 3),
    ['heather gray', 3, 3], c('concrete', 2, 3), ['gainsboro', 5, 5], ['light gray', 1, 1], ['dark gray', 1, 1], ['ash gray', 2, 2], ['anthracite', 4, 4, { g: 'color' }],
  ],

  metallic_colors: [
    c('gold', 1, 1), c('silver', 1, 1), c('bronze', 1, 1), c('copper', 1, 2), c('pewter', 3, 3), c('gunmetal', 3, 3), ['platinum', 3, 3], c('brass', 2, 2), c('chrome', 2, 2),
    ['steel', 2, 3, { g: 'color' }], c('titanium', 3, 3), ['rose gold', 2, 2], c('nickel', 3, 3), c('tin', 3, 3), c('champagne', 3, 3), ['antique gold', 3, 3], ['old gold', 3, 3],
    c('quicksilver', 3, 3), c('sterling', 3, 4), c('anthracite', 4, 4), c('gilt', 4, 4), ['gold leaf', 3, 3], c('zinc', 3, 4), c('palladium', 4, 5), ['electrum', 5, 5],
    c('iron', 2, 4), ['metallic silver', 1, 1], ['metallic gold', 1, 1], c('aluminum', 3, 4, { al: [['aluminium', 'spelling', 3, 4, ['UK']]] }),
  ],

  shades_of_white: [
    ['white', 1, 1], c('ivory', 2, 2), c('cream', 1, 2), c('snow', 1, 2), c('pearl', 2, 3), c('eggshell', 2, 2), c('alabaster', 3, 3), c('chalk', 2, 3), c('milk', 1, 3),
    c('vanilla', 2, 3), c('bone', 2, 3), c('linen', 3, 3), ['off-white', 1, 1], ['ghost white', 3, 3], c('porcelain', 3, 3), c('magnolia', 3, 4), c('cotton', 2, 4),
    c('seashell', 3, 3), ['antique white', 3, 3], ['floral white', 4, 4], ['oyster white', 3, 3], ['titanium white', 4, 4], ['bone white', 2, 2], ['pure white', 1, 1],
    ['ecru', 4, 4], c('parchment', 3, 4), c('salt', 2, 4), c('frost', 2, 3), ['arctic white', 2, 2], ['snow white', 1, 1, { g: 'color' }], ['coconut white', 3, 3],
  ],

  cmyk_inks: [
    ['cyan', 3, 1], ['magenta', 3, 1], ['yellow', 1, 2], ['black', 1, 2, { al: [['key', 'synonym', 4, 3, [], { g: 'printing' }]] }],
  ],

  colors_of_the_rainbow: [
    ['red', 1, 1], c('orange', 1, 1), ['yellow', 1, 1], ['green', 1, 1], ['blue', 1, 1], ['indigo', 3, 1], c('violet', 2, 1),
  ],

  olympic_ring_colors: [
    ['blue', 1, 1], ['yellow', 1, 1], ['black', 1, 1], ['green', 1, 1], ['red', 1, 1],
  ],

  shades_of_black: [
    ['black', 1, 1], c('jet', 2, 2, { al: [['jet black', 'synonym', 1, 1]] }), c('ebony', 3, 2), c('onyx', 2, 2), ['raven', 2, 3], ['sable', 4, 4], c('soot', 2, 3), c('charcoal', 2, 2),
    ['coal', 1, 3], ['pitch black', 1, 1], c('midnight', 2, 3), c('ink', 1, 3), ['obsidian', 3, 3], c('licorice', 2, 3, { al: [['liquorice', 'spelling', 2, 3, ['UK']]] }),
    c('carbon', 2, 3), c('tar', 2, 3), ['coal black', 1, 1], ['ebon', 5, 5], ['lampblack', 5, 5], ['ivory black', 5, 5], ['Vantablack', 3, 4, P({ tm: true })],
    c('noir', 3, 3), c('night', 1, 3), ['inky black', 2, 2], ['velvet black', 3, 3], c('graphite', 2, 4), c('crow', 2, 4), ['blackest black', 3, 3], ['eigengrau', 5, 5],
    c('oil', 2, 4), ['black', 1, 1],
  ].filter((r, i, a) => a.findIndex(x => x[0] === r[0]) === i),

  blue_green_shades: [
    c('teal', 2, 1), ['turquoise', 2, 1], ['aqua', 2, 1], ['cyan', 3, 2], c('aquamarine', 3, 2), ['viridian', 4, 3], ['cerulean', 3, 4], ['seafoam', 3, 3], ['sea green', 2, 3],
    c('peacock', 3, 3), c('jade', 2, 4), ['mint', 1, 4], ["robin's egg blue", 3, 3], ['duck egg', 4, 4], ['cadet', 4, 5, { g: 'color' }], c('lagoon', 2, 3),
    ['Caribbean blue', 3, 3, P()], ['Tiffany blue', 3, 3, P({ tm: true })], ['azure', 3, 4], ['peacock blue', 3, 3], c('petrol', 4, 4), ['verdigris', 4, 3], ['eau de nil', 5, 5],
    c('celeste', 4, 4), c('ocean', 2, 3), ['blue-green', 2, 1], ['green-blue', 2, 2], ['dark cyan', 3, 2], ['Persian green', 5, 5, P()], ['bluish green', 2, 2],
    c('spearmint', 2, 4), ['sea foam green', 3, 3], c('malachite', 4, 5), ['dark teal', 2, 2],
  ],

  pastel_colors: [
    c('lilac', 2, 1), ['baby blue', 1, 1], ['mint', 1, 2], c('peach', 1, 2), c('lavender', 1, 2), ['powder pink', 2, 1], ['baby pink', 1, 1], ['powder blue', 2, 1],
    c('periwinkle', 3, 3), c('buttercup', 2, 3), c('blush', 2, 2), ['seafoam', 3, 3], ['lemon chiffon', 3, 3], c('cotton candy', 2, 2), ['sky blue', 1, 3], ['pistachio', 2, 3],
    ['apricot', 2, 3], ['mauve', 2, 3], c('melon', 3, 3), ['pale yellow', 1, 2], c('sage', 2, 4), ['mint green', 1, 2], ['pastel pink', 1, 1], ['pastel blue', 1, 1],
    ['pastel green', 1, 1], ['pastel yellow', 1, 1], ['shell pink', 3, 3], ['pale lavender', 2, 2], c('sorbet', 3, 3), ['pastel orange', 1, 1], ['pastel purple', 1, 1],
    ['robin\'s egg', 3, 3], c('macaron', 3, 4), ['eau de nil', 5, 5],
  ].filter(r => r[0] !== 'eau de nil'),

  neon_colors: [
    ['electric blue', 2, 1], ['hot pink', 1, 2], c('lime', 1, 3), ['fluorescent yellow', 2, 2], ['neon orange', 1, 1], ['neon green', 1, 1], ['neon pink', 1, 1],
    ['neon yellow', 1, 1], ['electric lime', 3, 3], ['highlighter yellow', 2, 2], ['laser lemon', 4, 4], ['shocking pink', 3, 3], ['screaming green', 4, 4],
    ['atomic tangerine', 4, 4], ['neon blue', 1, 1], ['neon purple', 1, 1], ['electric purple', 3, 3], ['electric violet', 3, 3], ['Day-Glo', 3, 2, P({ tm: true })],
    ['fluorescent green', 2, 2], ['fluorescent pink', 2, 2], ['fluorescent orange', 2, 2], ['safety yellow', 2, 3], ['radioactive green', 3, 3], ['acid green', 3, 3],
    ['electric green', 2, 2], ['cyber yellow', 4, 4], c('volt', 4, 4), ['laser lime', 4, 4], ['neon red', 1, 2], ['hot magenta', 3, 3], ['ultra pink', 4, 4],
  ],

  earth_tones: [
    ['ochre', 3, 1], ['umber', 3, 1], ['sienna', 3, 1], ['khaki', 2, 2], ['terracotta', 3, 2], c('olive', 1, 2), c('rust', 2, 2), c('sand', 1, 2), c('clay', 2, 2), c('tan', 2, 2),
    ['taupe', 3, 3], ['beige', 2, 3], ['brown', 1, 2], c('mud', 1, 3), ['moss', 1, 3], c('sage', 2, 3), c('chestnut', 2, 3), ['sepia', 3, 3], c('cocoa', 2, 3),
    ['burnt orange', 2, 3], ['burnt sienna', 4, 3], c('camel', 2, 3), c('stone', 2, 3), c('adobe', 3, 3), c('sandstone', 2, 3), c('bark', 2, 4), ['raw umber', 4, 4],
    c('mushroom', 3, 4), c('driftwood', 3, 3), ['ecru', 4, 4], ['forest green', 1, 3], ['desert sand', 2, 3], c('hazel', 2, 4), c('russet', 3, 3),
  ].map(r => (r[0] === 'russet' ? ['russet', 3, 3] : r)),

  jewel_tones: [
    c('emerald', 2, 1), c('sapphire', 2, 1), c('ruby', 2, 1), c('amethyst', 2, 1), c('topaz', 3, 2), c('garnet', 3, 2), c('amber', 2, 3), c('jade', 2, 3),
    ['turquoise', 2, 3], c('onyx', 2, 3), c('peridot', 4, 3), c('citrine', 4, 4), c('aquamarine', 3, 3), c('tanzanite', 4, 4), ['sapphire blue', 2, 2], ['ruby red', 2, 1],
    ['emerald green', 1, 1], ['amethyst purple', 2, 2], c('plum', 2, 3), c('burgundy', 2, 3), c('teal', 2, 3), ['royal blue', 2, 3], ['magenta', 2, 3], ['fuchsia', 2, 3],
    c('lapis', 4, 4), c('tourmaline', 4, 4), c('malachite', 4, 4), c('alexandrite', 5, 5), c('zircon', 5, 5), ['deep teal', 2, 3], ['bordeaux', 3, 4], ['cobalt', 3, 3],
  ],

  colors_named_after_foods: [
    ['lemon', 1, 1], ['mint', 1, 1], ['peach', 1, 1, { g: 'color' }], ['cherry', 1, 1], ['chocolate', 1, 1], c('salmon', 1, 1), c('cream', 1, 2), c('olive', 1, 2),
    ['tangerine', 2, 2], ['apricot', 2, 2], ['avocado', 1, 2], ['pumpkin', 1, 2], ['carrot', 1, 3], ['caramel', 1, 2], ['cinnamon', 2, 2], ['mustard', 1, 2],
    ['coffee', 1, 2], ['mocha', 2, 2], ['wine', 1, 3], c('banana', 1, 2), c('tomato', 1, 3), c('raspberry', 2, 3), c('blueberry', 2, 3), c('plum', 2, 2), c('grape', 1, 3),
    c('honey', 1, 3), c('butter', 1, 3), c('vanilla', 2, 3), ['pistachio', 2, 2], c('mango', 2, 3), c('cocoa', 2, 3), ['eggplant', 1, 3], ['pea green', 3, 3],
    c('espresso', 2, 3), c('oatmeal', 3, 3), c('wheat', 3, 3), c('almond', 3, 3), c('cranberry', 2, 3), ['cantaloupe', 3, 4, { g: 'color' }],
  ].filter(Boolean),

  colors_named_after_flowers: [
    c('rose', 1, 1), c('violet', 1, 1), c('lilac', 2, 1), c('lavender', 1, 1), c('poppy', 2, 2), ['marigold', 2, 2], ['fuchsia', 2, 2], ['orchid', 2, 2], c('primrose', 3, 2),
    c('daffodil', 1, 3), c('buttercup', 2, 3), ['sunflower', 1, 3], c('heliotrope', 4, 4), c('amaranth', 5, 5), c('jonquil', 4, 4), c('magnolia', 3, 3), c('wisteria', 3, 3),
    c('iris', 3, 3), c('heather', 3, 3), c('pansy', 3, 3), c('carnation', 3, 3), c('tulip', 2, 3), c('lily', 2, 3), c('cornflower', 3, 3), c('hyacinth', 4, 4),
    c('foxglove', 4, 4), c('bluebell', 3, 3), c('peony', 3, 3), c('lupine', 4, 4), c('camellia', 4, 4), c('azalea', 3, 4), c('hibiscus', 3, 4), c('cyclamen', 4, 4),
    c('daisy', 2, 4), c('honeysuckle', 4, 4), c('dandelion', 2, 4), c('periwinkle', 3, 3),
  ],

  colors_named_after_gems: [
    c('emerald', 2, 1), c('ruby', 2, 1), c('sapphire', 2, 1), c('amber', 2, 2), c('jade', 2, 2), c('amethyst', 2, 1), c('topaz', 3, 2), c('garnet', 3, 2), ['turquoise', 2, 2],
    c('onyx', 2, 2), c('jet', 3, 3), c('opal', 3, 2), c('pearl', 2, 3), c('coral', 2, 3), c('aquamarine', 3, 2), c('peridot', 4, 3), c('citrine', 4, 3), ['lapis lazuli', 3, 3],
    c('tanzanite', 4, 4), c('tourmaline', 4, 4), c('carnelian', 4, 4), c('moonstone', 3, 3), c('diamond', 2, 4), ['rose quartz', 3, 3, { g: 'color' }], c('malachite', 4, 4),
    c('zircon', 5, 5), c('beryl', 5, 5), c('agate', 4, 4), c('jasper', 4, 4), ['obsidian', 3, 4], c('alexandrite', 5, 5), c('lapis', 4, 4),
  ],

  colors_named_after_animals: [
    c('salmon', 1, 1), ['canary', 2, 1], ['flamingo', 2, 2], ['mouse gray', 2, 2], c('fawn', 3, 2), ['taupe', 3, 4], ['peacock blue', 3, 3], c('lobster', 3, 4),
    ['elephant gray', 3, 3], ['dove gray', 2, 2], ['raven', 2, 3], ['sable', 4, 4], c('dun', 4, 4), c('camel', 2, 3), c('ermine', 4, 4), c('palomino', 4, 4), c('roan', 4, 5),
    c('cardinal', 3, 3), ['parrot green', 3, 3], c('kingfisher', 3, 4), ['seal brown', 4, 4], c('beaver', 3, 4), c('puce', 4, 4), ['isabelline', 5, 5],
    c('cochineal', 5, 5), ['sepia', 3, 4], c('tortoiseshell', 3, 3), ['robin\'s egg blue', 3, 4], ['pigeon gray', 3, 3], c('mole', 3, 4), c('sorrel', 4, 4),
    c('bay', 3, 4), ['fox red', 4, 4], ['sand cat', 5, 5], ['swan white', 2, 3], ['goldfish orange', 3, 3],
  ].filter(Boolean),

  colors_named_after_places: [
    ['sienna', 3, 1], ['magenta', 3, 1], ['bordeaux', 3, 2], c('burgundy', 2, 1), ['Prussian blue', 4, 2, P()], ['Tuscan red', 4, 3, P()], ['Nile green', 3, 3, P()],
    ['Persian blue', 5, 4, P()], ['Delft blue', 4, 3, P()], ['Oxford blue', 4, 3, P()], ['Cambridge blue', 4, 3, P()], ['Venetian red', 4, 3, P()], ['Indian red', 4, 3, P()],
    ['Paris green', 5, 4, P()], ['Lincoln green', 5, 4, P()], c('cordovan', 4, 4), ['Egyptian blue', 4, 3, P()], ['Naples yellow', 5, 4, P()], ['Carolina blue', 4, 3, P()],
    ['Columbia blue', 4, 3, P()], ['Yale blue', 4, 3, P()], ['Berlin blue', 5, 4, P()], ['Pompeian red', 5, 5, P()], ['Indian yellow', 5, 4, P()], ['Tyrian purple', 5, 4, P()],
    ['Havana brown', 4, 4, P()], ['Siena brown', 5, 4, P()], ['Caribbean blue', 3, 3, P()], ['Persian green', 5, 4, P()], ['turquoise', 2, 5],
    ['Dresden blue', 5, 5, P()], ['Bristol blue', 5, 4, P()],
  ],

  '2d_shapes': [
    s('circle', 1, 1), s('square', 1, 1), s('triangle', 1, 1), ['rectangle', 1, 1], ['oval', 1, 1], s('star', 1, 1), s('heart', 1, 1), s('diamond', 1, 1), ['pentagon', 2, 1, { g: 'shape' }],
    ['hexagon', 2, 1], ['octagon', 2, 1], s('crescent', 2, 2), ['trapezoid', 3, 2, { al: [['trapezium', 'synonym', 3, 3, ['UK']]] }], ['rhombus', 3, 2], ['parallelogram', 3, 2],
    ['ellipse', 3, 2], s('kite', 2, 3), ['semicircle', 2, 2], ['heptagon', 3, 3], ['decagon', 3, 3], ['nonagon', 4, 3], ['dodecagon', 4, 3], ['quadrilateral', 3, 3],
    ['polygon', 3, 3], ['annulus', 5, 4], ['lune', 5, 5, { g: 'shape' }], ['deltoid', 5, 5], s('cross', 1, 2), ['quatrefoil', 5, 5], ['pentagram', 3, 3],
    ['hendecagon', 5, 5], ['scalene triangle', 3, 3], ['right triangle', 2, 2], ['isosceles', 4, 4, { g: 'triangle' }], ['sector', 4, 4, { g: 'shape' }], ['arrow', 1, 3, { g: 'shape' }],
  ].map(r => (r[0] === 'isosceles' ? ['isosceles triangle', 3, 3] : r)),

  '3d_shapes': [
    ['cube', 1, 1], ['sphere', 1, 1], ['cone', 1, 1], ['cylinder', 1, 1], ['pyramid', 1, 1], ['prism', 2, 2], ['torus', 4, 3], ['hemisphere', 3, 2], ['cuboid', 3, 2],
    ['tetrahedron', 4, 3], ['octahedron', 4, 3], ['dodecahedron', 4, 3], ['icosahedron', 5, 4], ['ellipsoid', 4, 4], ['helix', 3, 4], ['spheroid', 4, 4],
    s('dome', 2, 3), ['triangular prism', 2, 2], ['square pyramid', 2, 2], ['rectangular prism', 2, 2], ['frustum', 4, 4], ['polyhedron', 3, 3], ['Platonic solid', 4, 3, P()],
    ['hexahedron', 5, 4], s('capsule', 2, 4), s('wedge', 2, 3), s('ovoid', 4, 4), ['paraboloid', 5, 5], ['hyperboloid', 5, 5], s('orb', 2, 3), ['trapezohedron', 5, 5],
    ['pentagonal prism', 3, 3], ['hexagonal prism', 3, 3], ['sphere', 1, 1],
  ].filter(Boolean).filter((r, i, a) => a.findIndex(x => x[0] === r[0]) === i),

  patterns: [
    ['stripes', 1, 1], ['polka dots', 1, 1], ['plaid', 2, 1], ['tartan', 2, 1], ['checkered', 2, 1, { al: [['checkerboard', 'synonym', 2, 2]] }], ['chevron', 3, 2], ['paisley', 3, 1],
    ['herringbone', 3, 2], ['houndstooth', 3, 2], ['argyle', 3, 2], ['gingham', 3, 2], ['camouflage', 2, 2], ['zigzag', 2, 2], ['damask', 4, 3], ['floral', 2, 2],
    ['pinstripe', 3, 2], ['leopard print', 2, 2], ['animal print', 2, 2], ['tie-dye', 2, 2], ['harlequin', 4, 3], ['toile', 4, 4], ['ikat', 5, 5], ['batik', 4, 4],
    ['tessellation', 4, 4], ['mosaic', 3, 3], ['spiral', 2, 3, { g: 'pattern' }], ['grid', 2, 3, { g: 'pattern' }], ['honeycomb', 3, 3], ['fleur-de-lis', 3, 3], ['greek key', 4, 4],
    ['basketweave', 4, 4], ['ombre', 3, 3], ['marbled', 3, 3], ['geometric', 2, 3], ['moire', 5, 5], ['trellis', 4, 4, { g: 'pattern' }], ['scallop', 3, 4, { g: 'pattern' }],
    ['Fair Isle', 4, 4, P()], ['windowpane', 4, 4, { g: 'pattern' }], ['glen plaid', 4, 4], ['madras', 4, 4, { g: 'pattern' }], ['buffalo check', 3, 3], ['check', 2, 2, { g: 'pattern' }],
  ].map(r => (['greek key'].includes(r[0]) ? ['Greek key', 4, 4, P()] : r)).slice(0, 40),

  line_types: [
    ['straight', 1, 1, adj()], ['curved', 1, 1, adj()], ['dotted', 1, 1, adj()], ['dashed', 1, 1, adj()], ['solid', 1, 2, adj({ g: 'line' })], ['wavy', 1, 1, adj()],
    ['diagonal', 2, 1, adj({ g: 'line' })], ['vertical', 2, 2, adj({ g: 'line' })], ['horizontal', 2, 2, adj({ g: 'line' })], ['parallel', 2, 2, adj({ g: 'line' })],
    ['perpendicular', 3, 2, adj()], ['zigzag', 2, 2, { g: 'line' }], ['tangent', 4, 4, { g: 'line' }], ['secant', 5, 5], ['chord', 4, 4, { g: 'line' }], ['arc', 3, 3, { g: 'line' }],
    ['curve', 2, 2, { g: 'line' }], ['squiggly', 3, 3, adj()], ['jagged', 2, 3, adj()], ['broken', 1, 3, adj({ g: 'line' })], ['dash-dot', 4, 4, adj()], ['hairline', 3, 3, { g: 'line' }],
    ['double', 1, 3, adj({ g: 'line' })], ['intersecting', 3, 3, adj()], ['skew', 5, 5, adj({ g: 'line' })], ['transversal', 5, 5], ['asymptote', 5, 5], ['bisector', 4, 4],
    ['slanted', 2, 3, adj()], ['oblique', 3, 3, adj({ g: 'line' })], ['contour', 3, 4, { g: 'map line' }], ['wiggly', 2, 2, adj()], ['freehand', 3, 4, adj()], ['line segment', 3, 3],
    ['ray', 3, 4, { g: 'line' }], ['spiral', 2, 3, { g: 'line' }], ['bold', 1, 3, adj({ g: 'line' })], ['thin', 1, 3, adj({ g: 'line' })],
  ],

  symbols: [
    ['ampersand', 3, 1], ['asterisk', 2, 1], ['hashtag', 2, 1], ['at sign', 2, 1], ['percent sign', 1, 1], ['dollar sign', 1, 1], ['pound sign', 2, 2], ['euro sign', 2, 2],
    ['yen sign', 3, 2], ['plus sign', 1, 1], ['minus sign', 1, 1], ['equals sign', 1, 1], ['copyright', 2, 2, { g: 'symbol' }], ['infinity', 2, 2], ['peace sign', 1, 1],
    ['checkmark', 2, 1, { al: [['tick', 'synonym', 1, 2, ['UK'], { g: 'symbol' }]] }], ['caret', 3, 3, { g: 'symbol' }], ['tilde', 3, 2], ['pilcrow', 5, 5], ['section sign', 4, 4],
    ['dagger', 3, 4, { g: 'symbol' }], ['obelus', 5, 5], ['interrobang', 4, 4], ['octothorpe', 4, 4], ['ankh', 4, 4, { sens: true }], ['yin yang', 3, 3], ['skull and crossbones', 3, 3],
    ['biohazard', 3, 3], ['caduceus', 4, 4], ['star of David', 3, 3, P({ sens: true })], ['recycling symbol', 2, 2], ['power symbol', 3, 3], ['trademark symbol', 2, 2],
    ['ellipsis', 3, 3], ['em dash', 3, 4], ['hyphen', 2, 3], ['ichthys', 5, 5, { sens: true }], ['pi', 2, 3, { g: 'symbol' }], ['radiation symbol', 2, 2],
  ].map(r => (r[0] === 'star of David' ? ['Star of David', 3, 3, P({ sens: true })] : r)),
};

// Words that already exist in the library without a gloss are reused as they are (same word, linked to these colour themes); words that would clash with another unglossed meaning are dropped.
const PLAIN = new Set('denim banana grape mango watermelon papaya persimmon tomato iron tin zinc aluminum nickel titanium cocoa espresso blueberry raspberry cranberry cantaloupe mulberry damson maize asparagus lobster oyster milk butter toffee sorbet licorice cotton candy macaron wheat salt ginger vanilla champagne camel beaver peacock kingfisher palomino magnolia tulip daisy lily daffodil poppy carnation pansy hyacinth hibiscus peony bluebell buttercup dandelion foxglove camellia azalea lupine cornflower fern thistle shamrock heather lagoon snow fog frost sandstone graphite flint malachite bone linen concrete steel puce noir zigzag'.split(' ').concat(['cotton candy']));
const DROP = new Set(['cadet', 'Adobe', 'adobe', 'chord', 'pentagon', 'dome', 'sorrel', 'trellis', 'scallop']);
for (const k of Object.keys(DATA)) {
  DATA[k] = DATA[k].filter(r => !DROP.has(r[0])).map(r => {
    if (r[3] && PLAIN.has(r[0]) && (r[3].g === 'color' || r[3].g === 'line')) { const { g, ...o } = r[3]; return [r[0], r[1], r[2], o]; }
    return r;
  });
}

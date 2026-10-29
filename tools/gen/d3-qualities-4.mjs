// Generated word data: Qualities > motion/temperature/light and dark/things by color/things with... (depth-3 chunk qualities-4).
const A = rows => rows.map(r => [r[0], r[1], r[2], { pos: 'adjective', ...(r[3] || {}) }]);
const V = rows => rows.map(r => [r[0], r[1], r[2], { pos: 'verb', ...(r[3] || {}) }]);
const PL = { type: 'place' }, PR = { type: 'proper' }, TM = { type: 'proper', tm: true };

export const THEMES = {
  slow_things: { d: 2 }, things_that_sink: { d: 2 }, hot_things: { d: 1 }, cold_things: { d: 1 }, things_that_melt: { d: 1 }, fire_words: { d: 3 },
  ice_words: { d: 4 }, words_for_hot: { d: 2 }, words_for_cold: { d: 2 }, things_that_glow: { d: 2 }, shiny_things: { d: 1 }, things_that_reflect: { d: 2 },
  words_for_shiny: { d: 3 }, words_for_dark: { d: 3 }, red_things: { d: 1 }, yellow_things: { d: 1 }, green_things: { d: 1 }, blue_things: { d: 1 },
  white_things: { d: 1 }, black_things: { d: 1 }, orange_things: { d: 1 }, pink_things: { d: 1 }, purple_things: { d: 1 }, brown_things: { d: 1 },
  things_with_keys: { d: 3 }, things_with_wheels: { d: 1 }, things_with_teeth: { d: 3 }, things_with_shells: { d: 2 }, things_with_horns: { d: 2 },
  things_with_eyes: { d: 4 },
};

export const DATA = {
  slow_things: [
    ['snail', 1, 1, { al: [['garden snail', 'synonym', 2, 2]] }], ['sloth', 1, 1, { g: 'animal' }], ['tortoise', 1, 1], ['turtle', 1, 1], ['slug', 2, 2, { g: 'animal' }], ['glacier', 2, 2], ['molasses', 3, 2],
    ['traffic jam', 1, 2], ['snail mail', 2, 3], ['dial-up', 3, 3, { al: [['dial-up internet', 'synonym', 3, 3]] }], ['slow cooker', 2, 4], ['caterpillar', 1, 3], ['manatee', 2, 4],
    ['rush hour', 1, 3], ['red tape', 2, 4], ['bureaucracy', 2, 4], ['paperwork', 2, 4], ['continental drift', 3, 3], ['sea cucumber', 4, 4], ['ox cart', 3, 3],
    ['barge', 3, 4], ['tractor', 1, 3], ['hour hand', 2, 4], ['sundial', 2, 4], ['stalactite', 3, 4], ['Galapagos tortoise', 3, 3, PR], ['three-toed sloth', 4, 3],
    ['snail race', 3, 3], ['slow lane', 2, 3], ['cold molasses', 4, 3], ['lava flow', 3, 4], ['sea slug', 4, 4], ['pitch drop', 5, 5, { type: 'phrase' }], ['cart horse', 3, 4],
  ],

  things_that_sink: [
    ['stone', 1, 1, { g: 'rock' }], ['rock', 1, 1], ['anchor', 1, 1], ['brick', 1, 2], ['coin', 1, 2], ['Titanic', 1, 1, { g: 'ship', type: 'proper' }], ['submarine', 1, 2], ['lead weight', 3, 3],
    ['bowling ball', 1, 2], ['cannonball', 2, 2], ['shipwreck', 2, 2], ['quicksand', 2, 2], ['key', 1, 4, { g: 'lock' }], ['sinker', 3, 2], ['boulder', 2, 2], ['dumbbell', 2, 3],
    ['marble', 2, 3, { g: 'glass ball' }], ['sunken treasure', 3, 2], ['lead', 2, 3, { g: 'metal' }], ['iron', 1, 3, { g: 'metal' }], ['pebble', 1, 1], ['sinking ship', 2, 1], ['plughole', 3, 4, { reg: ['UK'] }],
    ['gold bar', 2, 3], ['wrecked boat', 3, 3], ['Atlantis', 2, 3, PL], ['Lusitania', 4, 3, { type: 'proper' }], ['Bismarck', 4, 4, { g: 'battleship', type: 'proper' }],
    ['ballast', 4, 3], ['scuba weight', 4, 3], ['deadweight', 4, 4], ['Mary Rose', 4, 3, { g: 'ship', type: 'proper', reg: ['UK'] }], ['plummet', 3, 3, { pos: 'verb' }], ['millstone', 3, 3],
  ],

  hot_things: [
    ['sun', 1, 1], ['stove', 1, 1], ['lava', 1, 1], ['oven', 1, 1], ['fire', 1, 1], ['coffee', 1, 2], ['desert', 1, 2], ['sauna', 1, 1], ['furnace', 2, 1], ['volcano', 1, 2],
    ['boiling water', 1, 1], ['kettle', 1, 2], ['toaster', 1, 3], ['campfire', 1, 1], ['hot tub', 1, 2], ['chili pepper', 1, 3], ['curry', 2, 3], ['radiator', 2, 2],
    ['fireplace', 1, 2], ['grill', 1, 2], ['barbecue', 1, 2], ['magma', 2, 2], ['hot sauce', 2, 3], ['heater', 1, 1], ['steam', 1, 2], ['geyser', 2, 3, { g: 'landform' }], ['blowtorch', 2, 2],
    ['hot spring', 2, 2], ['forge', 3, 3], ['branding iron', 3, 3], ['Venus', 2, 3], ['sunbed', 3, 4], ['sparkler', 3, 3], ['iron', 1, 3, { g: 'appliance' }],
    ['hot water bottle', 2, 3], ['kiln', 3, 3], ['smelter', 4, 3], ['equator', 2, 4], ['Death Valley', 3, 3, PL], ['Sahara', 2, 2, PL],
  ],

  cold_things: [
    ['ice', 1, 1], ['snow', 1, 1], ['freezer', 1, 1], ['glacier', 2, 1], ['ice cream', 1, 2], ['popsicle', 1, 2], ['Antarctica', 1, 1, PL], ['iceberg', 1, 1], ['North Pole', 1, 1, PL],
    ['refrigerator', 1, 1], ['ice cube', 1, 1], ['snowman', 1, 1], ['winter', 1, 2], ['Arctic', 2, 1, PL], ['frost', 1, 1], ['icicle', 1, 1], ['penguin', 1, 2], ['polar bear', 1, 2],
    ['igloo', 1, 2], ['Pluto', 2, 3, { g: 'planet', type: 'proper' }], ['blizzard', 1, 2], ['sorbet', 2, 3], ['slushie', 3, 3], ['Siberia', 2, 2, PL], ['Greenland', 2, 2, PL],
    ['tundra', 2, 2], ['liquid nitrogen', 3, 3], ['dry ice', 2, 3], ['cold shower', 1, 3], ['ice pack', 2, 3], ['sleet', 2, 3], ['Alaska', 1, 2, PL], ['Mount Everest', 1, 3, PL],
    ['ski slope', 1, 3], ['ice rink', 1, 2], ['cooler', 2, 4], ['walk-in freezer', 3, 3], ['permafrost', 3, 2], ['Yukon', 3, 3, PL], ['absolute zero', 3, 3],
  ],

  things_that_melt: [
    ['ice', 1, 1], ['snow', 1, 1], ['butter', 1, 1], ['chocolate', 1, 1], ['wax', 1, 2], ['ice cream', 1, 1], ['candle', 1, 2], ['cheese', 1, 2], ['popsicle', 1, 1], ['marshmallow', 1, 2],
    ['glacier', 2, 2], ['icicle', 1, 1], ['snowman', 1, 1], ['crayon', 1, 2], ['plastic', 1, 3], ['solder', 3, 3], ['lead', 2, 3, { g: 'metal' }], ['gold', 1, 3, { g: 'metal' }], ['iron', 1, 3, { g: 'metal' }],
    ['caramel', 2, 3], ['margarine', 2, 3], ['lard', 3, 3], ['ice cube', 1, 1], ['ice cap', 2, 2], ['sherbet', 3, 3], ['gelato', 2, 2], ['tallow', 4, 4], ['ice sculpture', 2, 2],
    ['iceberg', 1, 2], ['permafrost', 3, 3], ['glass', 1, 4], ['sugar', 1, 4], ['fondue', 3, 3], ['fudge', 2, 3], ['glue stick', 3, 4], ['sealing wax', 3, 3], ['frozen yogurt', 2, 3],
    ['ice floe', 3, 3], ['steel', 2, 4], ['lollipop', 1, 4],
  ],

  fire_words: [
    ['flame', 1, 1], ['blaze', 1, 1], ['ember', 2, 1], ['spark', 1, 1], ['inferno', 2, 1], ['bonfire', 1, 1], ['campfire', 1, 1], ['kindle', 3, 2, { pos: 'verb' }], ['ignite', 2, 1, { pos: 'verb' }],
    ['scorch', 2, 2, { pos: 'verb' }], ['char', 2, 2, { pos: 'verb', g: 'burn' }], ['singe', 3, 2, { pos: 'verb' }], ['smolder', 3, 2, { pos: 'verb', al: [['smoulder', 'spelling', 3, 3, ['UK']]] }],
    ['flicker', 2, 2, { pos: 'verb' }], ['cinder', 3, 2], ['ash', 1, 2, { g: 'residue' }], ['soot', 2, 3], ['smoke', 1, 2], ['pyre', 3, 3], ['conflagration', 4, 3], ['tinder', 3, 3, { g: 'fire' }], ['kindling', 3, 2],
    ['wildfire', 1, 1], ['firestorm', 2, 2], ['flare', 2, 3], ['torch', 1, 3, { g: 'flame' }], ['combust', 4, 3, { pos: 'verb' }], ['incinerate', 3, 3, { pos: 'verb' }], ['up in smoke', 2, 3, { type: 'phrase' }],
    ['fan the flames', 2, 3, { type: 'phrase' }], ['firebrand', 4, 3], ['brazier', 4, 3], ['hearth', 3, 3], ['fuel', 1, 3], ['arson', 3, 3, { sens: true }], ['pyromania', 4, 3], ['combustion', 4, 3],
    ['bush fire', 3, 3, { reg: ['AU'] }], ['backdraft', 4, 4], ['flashpoint', 4, 4],
  ],

  ice_words: [
    ['frost', 1, 1], ['freeze', 1, 1, { pos: 'verb' }], ['icicle', 1, 1], ['glacier', 2, 1], ['floe', 4, 3], ['hail', 1, 2, { g: 'weather' }], ['sleet', 2, 2], ['rime', 4, 3], ['glaze', 3, 4], ['black ice', 2, 2],
    ['permafrost', 3, 3], ['frozen', 1, 1, { pos: 'adjective' }], ['icy', 1, 1, { pos: 'adjective' }], ['thaw', 2, 2, { pos: 'verb' }], ['hoarfrost', 4, 3], ['iceberg', 1, 1], ['crevasse', 3, 3],
    ['snowflake', 1, 2], ['frostbite', 2, 3], ['ice cap', 2, 2], ['pack ice', 3, 3], ['ice floe', 3, 3], ['ice sheet', 3, 3], ['verglas', 5, 4], ['firn', 5, 4], ['serac', 5, 4], ['calve', 4, 4, { pos: 'verb' }],
    ['nunatak', 5, 5], ['brash ice', 5, 4], ['bergy bit', 5, 5], ['moraine', 4, 4], ['sastrugi', 5, 5], ['ice age', 2, 3], ['ice shelf', 3, 3], ['frazil', 5, 5], 
    ['cryosphere', 5, 4], ['rink', 2, 4], ['hailstone', 3, 2], ['freeze-up', 4, 4],
  ],

  words_for_hot: A([
    ['hot', 1, 1], ['warm', 1, 2], ['scorching', 2, 1], ['sweltering', 2, 1], ['boiling', 1, 1], ['blazing', 2, 1], ['sizzling', 2, 1], ['balmy', 3, 3], ['torrid', 3, 2], ['sultry', 3, 2],
    ['roasting', 2, 1], ['baking', 2, 2], ['scalding', 2, 2], ['searing', 3, 2], ['steaming', 2, 2], ['humid', 2, 3], ['muggy', 2, 3], ['toasty', 2, 2], ['tropical', 2, 3], ['fiery', 2, 2],
    ['red-hot', 2, 2], ['piping hot', 2, 2, { type: 'phrase' }], ['white-hot', 3, 3], ['broiling', 3, 2], ['stifling', 3, 3], ['oppressive', 3, 4], ['burning', 1, 2], ['feverish', 3, 4], ['close', 2, 5, { g: 'stuffy' }],
    ['fervid', 5, 4], ['calid', 5, 5], ['canicular', 5, 5], ['sticky', 2, 4], ['heated', 2, 2], ['thermal', 3, 4], ['parching', 4, 3], ['sunny', 1, 3], ['hot as hell', 2, 3, { type: 'phrase', sens: true }],
    ['sweaty', 1, 3], ['hellish', 3, 4],
  ]),

  words_for_cold: A([
    ['cold', 1, 1, { g: 'temperature' }], ['cool', 1, 2], ['freezing', 1, 1], ['icy', 1, 1], ['chilly', 1, 1], ['frosty', 1, 1], ['frigid', 2, 1], ['nippy', 2, 1], ['bitter', 2, 2], ['brisk', 2, 3], ['crisp', 2, 3],
    ['arctic', 2, 2], ['glacial', 3, 2], ['polar', 2, 3], ['wintry', 2, 2], ['bleak', 2, 4], ['raw', 2, 3], ['parky', 4, 3, { reg: ['UK'] }], ['perishing', 3, 3, { reg: ['UK'] }],
    ['numbing', 3, 3], ['biting', 2, 2], ['subzero', 2, 2], ['bone-chilling', 3, 2], ['stone cold', 2, 3], ['gelid', 5, 4], ['algid', 5, 5], ['hyperborean', 5, 5], ['baltic', 4, 3, { reg: ['UK'] }],
    ['brumal', 5, 5], ['hibernal', 5, 5], ['snowy', 1, 3], ['arctic blast', 3, 3, { type: 'phrase' }], ['chill', 1, 2], ['tepid', 3, 5], ['hawkish', 5, 5], ['teeth-chattering', 3, 3],
  ]),

  things_that_glow: [
    ['firefly', 1, 1, { al: [['lightning bug', 'synonym', 1, 1, ['US']]] }], ['moon', 1, 1], ['lantern', 1, 1], ['embers', 2, 2], ['glow stick', 1, 1], ['jellyfish', 1, 3], ['lightbulb', 1, 2],
    ['candle', 1, 2], ['star', 1, 2, { g: 'sky' }], ['neon sign', 2, 1], ['glow worm', 2, 2], ['anglerfish', 2, 3], ['night light', 2, 2], ['LED', 3, 3, { type: 'acronym' }], ['fireplace', 1, 3],
    ['aurora', 2, 2, { al: [['northern lights', 'synonym', 1, 1]] }], ['radium', 3, 3], ['glowing plankton', 4, 3], ['will-o\'-the-wisp', 4, 3], ['phosphorescent paint', 4, 3], ['lava', 1, 3],
    ['sun', 1, 2], ['flashlight', 1, 2, { al: [['torch', 'synonym', 1, 2, ['UK'], { g: 'flashlight' }]] }], ['fluorescent tube', 3, 3], ['lava lamp', 2, 2], ['fairy lights', 2, 2, { reg: ['UK'] }],
    ['Christmas lights', 1, 2], ['sparkler', 3, 2], ['halo', 2, 3, { g: 'light ring' }], ['St. Elmo\'s fire', 4, 4], ['foxfire', 5, 4], ['uranium glass', 5, 4], ['plasma ball', 3, 3], ['glowing coals', 2, 2],
    ['bioluminescence', 4, 3], ['phosphor', 4, 4], ['light-up sneakers', 2, 3], ['laser', 2, 3],
  ],

  shiny_things: [
    ['mirror', 1, 1], ['new coin', 2, 2], ['chrome bumper', 2, 2], ['polished shoes', 1, 2], ['glitter', 1, 1], ['diamond', 1, 1], ['gold', 1, 1, { g: 'metal' }], ['silver', 1, 1, { g: 'metal' }], ['sequins', 2, 1],
    ['tinsel', 2, 1], ['aluminum foil', 1, 2, { al: [['tin foil', 'synonym', 1, 2], ['aluminium foil', 'spelling', 2, 2, ['UK']]] }], ['disco ball', 1, 1], ['trophy', 1, 2], ['satin', 2, 2], ['patent leather', 3, 2],
    ['mylar', 4, 3], ['pearl', 1, 2], ['jewelry', 1, 2], ['crown', 1, 3], ['spoon', 1, 3], ['armor', 2, 3], ['cymbal', 2, 3], ['brass', 2, 2], ['wet pavement', 3, 4], ['glazed donut', 2, 3],
    ['lacquer', 4, 3], ['polished floor', 2, 2], ['sword', 1, 4], ['sheen', 3, 2], ['gemstone', 2, 2], ['tiara', 2, 3], ['hubcap', 3, 3], ['patent shoes', 3, 3], ['bling', 3, 2, { g: 'jewelry' }],
    ['sparkly dress', 2, 2], ['lamé', 5, 4], ['foil balloon', 2, 3], ['glass', 1, 3], ['varnish', 3, 3], ['mother-of-pearl', 4, 3],
  ],

  things_that_reflect: [
    ['mirror', 1, 1], ['still lake', 2, 1], ['spoon', 1, 3], ['sunglasses', 1, 2, { al: [['mirrored shades', 'synonym', 3, 2]] }], ['window', 1, 2], ['puddle', 1, 2], ['pond', 1, 2],
    ['glass', 1, 2], ['water', 1, 2], ['chrome', 2, 2], ['polished metal', 2, 2], ['silver', 1, 3, { g: 'metal' }], ['disco ball', 1, 3], ['rearview mirror', 1, 1], ['periscope', 2, 3], ['telescope', 2, 4],
    ['cat\'s eye', 3, 3, { g: 'road reflector' }], ['road sign', 1, 3], ['bicycle reflector', 2, 2], ['hubcap', 3, 3], ['aluminum foil', 1, 3, { al: [['tin foil', 'synonym', 1, 3]] }],
    ['television screen', 2, 4], ['snow', 1, 4], ['moon', 1, 4], ['kettle', 1, 4], ['ice', 1, 3], ['retroreflector', 5, 4], ['bathroom tile', 3, 3], ['eyeball', 3, 4],
    ['hall of mirrors', 2, 2], ['compact mirror', 2, 1], ['vanity mirror', 2, 1], ['smartphone screen', 2, 4], ['reflective vest', 2, 2], ['lake', 1, 2], ['wet road', 2, 4], ['solar mirror', 4, 3],
    ['heliostat', 5, 4], ['mirror ball', 2, 2], ['looking glass', 3, 2],
  ],

  words_for_shiny: A([
    ['shiny', 1, 1], ['glossy', 2, 1], ['gleaming', 2, 1], ['lustrous', 3, 1], ['glittering', 2, 1], ['polished', 2, 2], ['radiant', 3, 3], ['bright', 1, 3], ['sparkling', 2, 1],
    ['glistening', 2, 1], ['shimmering', 2, 1], ['dazzling', 2, 2], ['brilliant', 2, 3], ['glassy', 2, 3], ['burnished', 4, 2], ['sleek', 2, 3], ['satiny', 3, 2], ['glinting', 3, 2],
    ['twinkling', 2, 3], ['luminous', 3, 3], ['lambent', 5, 4], ['resplendent', 4, 4], ['effulgent', 5, 4], ['refulgent', 5, 4], ['iridescent', 3, 3], ['opalescent', 4, 3], ['nacreous', 5, 4],
    ['lacquered', 4, 3], ['glazed', 2, 3], ['silvery', 2, 3], ['metallic', 2, 3], ['mirror-like', 3, 2], ['scintillating', 4, 3], ['sheeny', 5, 4], ['bling', 3, 4, { g: 'flashy' }],
    ['flashy', 2, 4], ['coruscating', 5, 4], ['lustrous sheen', 4, 3, { type: 'phrase' }],
  ]),

  words_for_dark: A([
    ['dark', 1, 1], ['dim', 1, 1], ['gloomy', 2, 1], ['murky', 2, 1], ['shadowy', 2, 1], ['pitch-black', 2, 1, { al: [['pitch dark', 'synonym', 2, 1]] }], ['dusky', 3, 1], ['black', 1, 2],
    ['unlit', 3, 2], ['inky', 3, 2], ['sunless', 3, 2], ['shady', 2, 3], ['dingy', 3, 3], ['somber', 3, 4], ['overcast', 2, 4], ['moonless', 3, 2], ['tenebrous', 5, 3], ['stygian', 5, 3],
    ['crepuscular', 5, 4], ['caliginous', 5, 4], ['sooty', 3, 4], ['jet-black', 2, 2], ['twilit', 4, 3], ['benighted', 5, 4], ['dreary', 2, 4], ['lightless', 4, 2], ['umbral', 5, 4],
    ['shaded', 2, 3], ['starless', 3, 2], ['sepulchral', 5, 4], ['obscure', 3, 4], ['murk', 3, 3, { pos: 'noun' }], ['dull', 1, 5], ['fuscous', 5, 4], ['swarthy', 4, 5], ['cavernous', 3, 3],
    ['blacked-out', 3, 3], ['gloaming', 4, 4],
  ]),

  red_things: [
    ['strawberry', 1, 1], ['fire truck', 1, 1, { al: [['fire engine', 'synonym', 1, 1, ['UK']]] }], ['ladybug', 1, 1, { al: [['ladybird', 'synonym', 1, 1, ['UK']]] }], ['tomato', 1, 1], ['stop sign', 1, 1],
    ['cherry', 1, 1], ['apple', 1, 1, { g: 'fruit' }], ['rose', 1, 1, { g: 'flower' }], ['blood', 1, 1], ['ruby', 1, 2], ['lobster', 1, 3], ['cardinal', 2, 2, { g: 'bird' }], ['fire hydrant', 2, 3],
    ['poppy', 2, 2], ['Mars', 2, 2], ['brick', 1, 3], ['lipstick', 1, 2], ['cranberry', 2, 2], ['beet', 2, 3], ['Santa suit', 1, 2], ['tulip', 1, 3],
    ['raspberry', 1, 2], ['pomegranate', 2, 3], ['ketchup', 1, 2], ['robin', 2, 4], ['cayenne', 3, 3], ['red wine', 1, 3, { adult: true, sens: true }], ['rust', 2, 4, { g: 'corrosion' }],
    ['scarlet macaw', 3, 3], ['post box', 2, 2, { reg: ['UK'] }], ['telephone box', 2, 2, { reg: ['UK'] }], ['double-decker bus', 1, 2, { reg: ['UK'] }], ['carmine', 4, 3], ['cochineal', 5, 4],
    ['cinnabar', 5, 4, { g: 'mineral' }], ['vermilion', 4, 3], ['madder', 5, 4, { g: 'color' }], ['red panda', 2, 3], ['Elmo', 2, 2, TM], ['Clifford', 3, 3, TM], ['maple leaf', 2, 4], ['paprika', 2, 3],
  ],

  yellow_things: [
    ['banana', 1, 1], ['school bus', 1, 1], ['lemon', 1, 1], ['sunflower', 1, 1], ['taxi', 1, 2, { al: [['cab', 'synonym', 1, 2]] }], ['butter', 1, 2], ['corn', 1, 2], ['canary', 1, 1],
    ['rubber duck', 1, 1], ['duckling', 1, 2], ['chick', 1, 2, { g: 'baby bird' }], ['egg yolk', 1, 2], ['daffodil', 1, 1], ['cheese', 1, 3], ['honey', 1, 3], ['mustard', 1, 2], ['sun', 1, 1],
    ['pineapple', 1, 3], ['buttercup', 2, 2], ['dandelion', 1, 2], ['goldfinch', 3, 3], ['smiley face', 1, 2], ['caution tape', 2, 3], ['highlighter', 1, 2], ['saffron', 3, 3, { g: 'spice' }], ['custard', 2, 3],
    ['sulfur', 3, 4], ['amber', 2, 3, { g: 'fossil resin' }], ['topaz', 3, 3], ['wasp', 2, 4], ['Pikachu', 1, 1, TM], ['Big Bird', 1, 1, TM], ['SpongeBob', 1, 1, TM], ['Homer Simpson', 1, 2, { type: 'person', tm: true }],
    ['forsythia', 4, 4], ['yellowhammer', 5, 4], ['gamboge', 5, 5], ['chrome yellow', 4, 4], ['yellow jersey', 3, 3], ['rapeseed', 4, 3, { reg: ['UK'], al: [['canola', 'synonym', 3, 3, ['US', 'CA']]] }],
    ['hazard light', 3, 4],
  ],

  green_things: [
    ['frog', 1, 1], ['lettuce', 1, 1], ['grass', 1, 1], ['emerald', 1, 1], ['lime', 1, 1, { g: 'fruit' }], ['leaf', 1, 1], ['cucumber', 1, 2], ['broccoli', 1, 1], ['pickle', 1, 2], ['avocado', 1, 2],
    ['kiwi', 1, 3, { g: 'fruit' }], ['spinach', 1, 2], ['shamrock', 2, 1], ['clover', 2, 2], ['peas', 1, 2], ['jade', 2, 2], ['cactus', 1, 2], ['lizard', 1, 3], ['parrot', 1, 3], ['fern', 2, 2],
    ['moss', 2, 2], ['mint', 1, 3, { g: 'herb' }], ['celery', 1, 2], ['basil', 2, 3], ['grasshopper', 1, 2], ['dollar bill', 1, 3], ['seaweed', 1, 2], ['algae', 2, 2], ['pine tree', 1, 3],
    ['Christmas tree', 1, 2], ['Kermit', 1, 1, TM], ['Shrek', 1, 1, TM], ['Hulk', 1, 1, TM], ['Yoda', 1, 2, TM], ['Grinch', 1, 1, TM], ['Statue of Liberty', 1, 2, { type: 'proper' }],
    ['Granny Smith', 2, 2], ['pistachio', 2, 3], ['chartreuse', 4, 3, { g: 'color' }], ['verdigris', 4, 3], ['malachite', 4, 4], ['chlorophyll', 3, 3], ['viridian', 5, 4], ['celadon', 5, 4, { g: 'color' }], ['green mamba', 4, 4],
    ['go light', 2, 3],
  ],

  blue_things: [
    ['sky', 1, 1], ['blueberry', 1, 1], ['sapphire', 2, 1], ['jeans', 1, 2], ['bluebird', 2, 1], ['ocean', 1, 1], ['sea', 1, 2], ['bluebell', 2, 1], ['blue whale', 1, 2], ['forget-me-not', 3, 2],
    ['Smurf', 1, 1, TM], ['Cookie Monster', 1, 1, TM], ['denim', 2, 2], ['lapis lazuli', 4, 3], ['cornflower', 3, 2], ['peacock', 1, 3], ['blue jay', 2, 2], ['hydrangea', 3, 3], ['turquoise', 2, 2],
    ['indigo', 3, 2], ['blue cheese', 1, 2], ['Neptune', 2, 3], ['Earth', 1, 3], ['police light', 2, 3], ['lagoon', 2, 3],
    ['azure', 3, 2], ['cobalt', 3, 2], ['blue tang', 3, 3], ['blue morpho', 4, 3], ['blue-ringed octopus', 4, 3], ['Delft pottery', 4, 3], ['Wedgwood', 4, 4, TM], ['ultramarine', 4, 3],
    ['woad', 5, 4], ['Sonic', 1, 1, TM], ['Tardis', 3, 2, TM], ['Superman suit', 2, 3], ['bluetit', 3, 3, { reg: ['UK'], al: [['blue tit', 'spelling', 3, 3]] }], ['swimming pool', 1, 3], ['iris', 2, 3, { g: 'flower' }],
    ['Prussian blue', 4, 3], ['Facebook', 1, 3, TM],
  ],

  white_things: [
    ['snow', 1, 1], ['milk', 1, 1], ['swan', 1, 2], ['polar bear', 1, 1], ['cloud', 1, 1, { g: 'weather' }], ['sugar', 1, 2], ['salt', 1, 2], ['paper', 1, 2, { g: 'material' }], ['egg', 1, 2], ['rice', 1, 3], ['flour', 1, 2],
    ['chalk', 1, 2, { g: 'for writing' }], ['bone', 1, 2], ['teeth', 1, 2], ['wedding dress', 1, 1], ['ghost', 1, 1], ['snowman', 1, 1], ['dove', 1, 1], ['lily', 2, 2], ['cotton', 1, 2], ['coconut', 1, 3],
    ['marshmallow', 1, 2], ['daisy', 1, 3], ['pearl', 1, 3], ['ivory', 2, 2, { g: 'color' }], ['cauliflower', 1, 3], ['tofu', 2, 3], ['lab coat', 1, 2], ['white flag', 1, 2], ['sheep', 1, 3], ['snowflake', 1, 1],
    ['vanilla ice cream', 1, 3], ['yogurt', 1, 3], ['porcelain', 2, 3], ['arctic fox', 2, 2], ['egret', 3, 3], ['bleach', 2, 3], ['cotton ball', 1, 2], ['white rabbit', 2, 2], ['alabaster', 4, 3],
    ['gypsum', 4, 4], ['kaolin', 5, 4], ['albino', 3, 3], ['Moby Dick', 2, 3, { g: 'whale', type: 'proper' }], ['White House', 1, 2, { type: 'proper' }], ['cliffs of Dover', 3, 2, { type: 'proper', reg: ['UK'] }],
    ['mozzarella', 2, 4], ['meringue', 3, 3],
  ],

  black_things: [
    ['coal', 1, 1], ['crow', 1, 1, { g: 'bird' }], ['tire', 1, 3, { g: 'wheel' }], ['panther', 1, 1], ['licorice', 1, 2, { al: [['liquorice', 'spelling', 2, 2, ['UK']]] }], ['night', 1, 2],
    ['ink', 1, 2], ['raven', 1, 1], ['charcoal', 1, 2, { g: 'fuel' }], ['tar', 2, 2], ['soot', 2, 2], ['asphalt', 2, 3], ['bat', 1, 3, { g: 'animal' }], ['black widow', 2, 2, { g: 'spider' }], ['black olive', 2, 3], ['caviar', 2, 3],
    ['black hole', 1, 2], ['onyx', 3, 2], ['obsidian', 3, 2], ['jet', 3, 3, { g: 'gemstone' }], ['coffee', 1, 3], ['tuxedo', 1, 3], ['blackboard', 1, 2], ['black cat', 1, 1], ['eight ball', 1, 2],
    ['vinyl record', 2, 3], ['oil', 1, 3], ['beetle', 1, 3], ['Darth Vader', 1, 1, { type: 'person', tm: true }], ['squid ink', 3, 3], ['ebony', 3, 2, { g: 'wood' }], ['pitch', 3, 3, { g: 'tar' }], ['graphite', 3, 4],
    ['tourmaline', 5, 4], ['melanin', 4, 4], ['void', 2, 3], ['top hat', 2, 4], ['piano keys', 2, 4], ['mourning dress', 3, 3], ['Batman', 1, 2, { type: 'proper', tm: true }], ['blackbird', 1, 1],
    ['gunpowder', 2, 3], ['soy sauce', 1, 4], ['bowler hat', 3, 4],
  ],

  orange_things: [
    ['orange', 1, 1, { g: 'fruit' }], ['carrot', 1, 1], ['pumpkin', 1, 1], ['tangerine', 2, 1], ['traffic cone', 1, 1], ['goldfish', 1, 1], ['tiger', 1, 2], ['fox', 1, 3], ['marigold', 2, 2],
    ['sunset', 1, 3], ['clownfish', 2, 2], ['cheddar', 2, 3], ['monarch butterfly', 2, 2], ['apricot', 2, 2], ['papaya', 2, 3], ['mango', 1, 3], ['persimmon', 3, 2], ['cantaloupe', 2, 3],
    ['sweet potato', 1, 3], ['safety vest', 2, 3], ['life jacket', 1, 3], ['Halloween', 1, 3], ['autumn leaves', 1, 3], ['Garfield', 1, 1, TM], ['Nemo', 1, 2, TM], ['Cheetos', 1, 2, { type: 'proper', tm: true }],
    ['Fanta', 1, 2, TM], ['prison jumpsuit', 2, 3], ['tabby cat', 2, 3], ['orangutan', 1, 2], ['saffron', 3, 4, { g: 'spice' }], ['amber', 2, 4, { g: 'fossil resin' }], ['koi', 3, 3], ['kumquat', 4, 3], ['sea buckthorn', 5, 4],
    ['salmon', 1, 4, { g: 'fish' }], ['nasturtium', 4, 3], ['butterscotch', 3, 4], ['tigerlily', 4, 4, { al: [['tiger lily', 'spelling', 3, 3]] }], ['ochre', 4, 3], ['burnt sienna', 4, 4],
    ['Dutch national team', 4, 3], ['basketball', 1, 2],
  ],

  pink_things: [
    ['flamingo', 1, 1], ['pig', 1, 2], ['bubble gum', 1, 1], ['cotton candy', 1, 1, { al: [['candy floss', 'synonym', 1, 1, ['UK']]] }], ['rose', 1, 3, { g: 'flower' }], ['piglet', 1, 2], ['salmon', 1, 3, { g: 'fish' }],
    ['ham', 1, 3], ['tongue', 1, 4], ['Barbie', 1, 1, TM], ['Pink Panther', 1, 2, TM], ['grapefruit', 2, 3], ['shrimp', 1, 4], ['eraser', 1, 3], ['ballet slippers', 2, 2], ['cherry blossom', 2, 1],
    ['strawberry milk', 1, 2], ['peony', 3, 2], ['carnation', 2, 2], ['lipstick', 1, 3], ['watermelon', 1, 3], ['rose quartz', 3, 3], ['Peppa Pig', 1, 1, TM], ['Hello Kitty', 1, 1, TM],
    ['axolotl', 3, 3], ['roseate spoonbill', 4, 3], ['pink dolphin', 3, 2], ['Himalayan salt', 3, 3], ['magnolia', 3, 3], ['dragon fruit', 2, 3], ['piggy bank', 1, 2], ['tutu', 2, 2],
    ['Pepto-Bismol', 2, 2, TM], ['Starburst', 2, 3, TM], ['fuchsia', 3, 2], ['blush', 2, 3, { g: 'makeup' }], ['bubblegum', 1, 1], ['rhodonite', 5, 5], ['azalea', 3, 3], ['coral', 2, 4, { g: 'marine animal' }], ['baby shower', 2, 4],
    ['Kirby', 2, 2, TM], ['manatee', 2, 5], ['cupcake', 1, 3], ['pink lemonade', 2, 2],
  ],

  purple_things: [
    ['grape', 1, 1], ['eggplant', 1, 2], ['plum', 1, 2, { g: 'fruit' }], ['violet', 1, 1, { g: 'flower' }], ['lavender', 2, 1, { g: 'flower' }], ['amethyst', 2, 1], ['grape juice', 1, 2], ['iris', 2, 3, { g: 'flower' }], ['orchid', 2, 2],
    ['lilac', 2, 1, { g: 'flower' }], ['Barney', 1, 1, { g: 'dinosaur', type: 'proper', tm: true }], ['Grimace', 2, 1, TM], ['Thanos', 2, 2, TM], ['royal robe', 2, 3], ['heather', 3, 2], ['red cabbage', 2, 3],
    ['Purple Heart', 2, 2, { type: 'proper' }], ['Ribena', 3, 3, { reg: ['UK'], type: 'proper', tm: true }], ['fig', 2, 3], ['passion fruit', 2, 3], ['wisteria', 3, 2], ['pansy', 2, 3],
    ['thistle', 3, 3], ['jacaranda', 3, 3], ['sprouting broccoli', 4, 3, { reg: ['UK'] }], ['murex', 5, 4], ['Tyrian purple', 4, 3], ['porphyry', 5, 4], ['mauve', 3, 2], ['magenta', 3, 3],
    ['beetroot', 2, 4], ['blackcurrant', 3, 4], ['aubergine', 2, 3, { reg: ['UK'] }], ['crocus', 2, 3], ['lupin', 3, 3], ['Tinky Winky', 3, 2, TM], ['purple potato', 3, 3], ['ube', 4, 3],
    ['acai', 3, 3], ['heliotrope', 5, 4, { g: 'color' }], ['bruise', 1, 3], ['bishop\'s robe', 4, 4], ['periwinkle', 3, 3, { g: 'color' }],
  ],

  brown_things: [
    ['chocolate', 1, 1], ['coffee', 1, 2], ['bear', 1, 1, { g: 'brown bear' }], ['mud', 1, 1], ['tree trunk', 1, 2], ['wood', 1, 2], ['bark', 1, 2, { g: 'tree' }], ['dirt', 1, 1], ['soil', 1, 2],
    ['leather', 1, 2], ['cardboard', 1, 2], ['potato', 1, 3], ['cinnamon', 1, 2], ['brownie', 1, 1], ['toast', 1, 3], ['peanut butter', 1, 2], ['cocoa', 1, 2], ['acorn', 1, 2], ['chestnut', 2, 2],
    ['walnut', 1, 3], ['horse', 1, 4], ['beaver', 1, 3], ['kiwi', 1, 4, { g: 'bird' }], ['paper bag', 1, 2], ['tea', 1, 4], ['nutmeg', 2, 3], ['caramel', 2, 3], ['sienna', 3, 3], ['umber', 4, 3],
    ['russet', 4, 3], ['sepia', 3, 3], ['tobacco', 2, 4, { sens: true }], ['teddy bear', 1, 3], ['gingerbread', 1, 2], ['rust', 2, 4, { g: 'corrosion' }], ['sparrow', 2, 4], ['mocha', 2, 3], ['cappuccino', 2, 4],
    ['hazelnut', 2, 3], ['coconut', 1, 4], ['pecan', 3, 3], ['UPS truck', 2, 3, { type: 'proper', tm: true }], ['taupe', 4, 3], ['fawn', 3, 3, { g: 'color' }], ['burlap', 4, 3], ['otter', 2, 4],
  ],

  things_with_keys: [
    ['piano', 1, 1], ['keyboard', 1, 1, { g: 'computer' }], ['lock', 1, 1], ['typewriter', 1, 1], ['calculator', 1, 1], ['map', 2, 4], ['organ', 2, 2, { g: 'instrument' }], ['accordion', 2, 2], ['computer', 1, 2],
    ['cash register', 1, 2], ['telephone', 1, 3], ['door', 1, 2], ['car', 1, 2], ['safe', 2, 2, { g: 'vault' }], ['padlock', 1, 1], ['keychain', 1, 1], ['ignition', 3, 2], ['saxophone', 2, 3],
    ['flute', 2, 4], ['clarinet', 2, 3], ['harmonium', 4, 3], ['synthesizer', 2, 2], ['celesta', 5, 4], ['harpsichord', 3, 2], ['clavichord', 5, 4], ['laptop', 1, 2], ['remote control', 1, 4],
    ['telegraph', 3, 3], ['music box', 2, 4], ['treasure chest', 1, 3], ['hotel room', 1, 3], ['keypad', 3, 2], ['jail cell', 2, 3], ['diary', 2, 4], ['glockenspiel', 4, 5], ['tin whistle', 4, 5],
    ['oboe', 3, 3], ['bassoon', 3, 3], ['accordion keys', 4, 3], ['electric piano', 3, 2], ['Casio', 3, 3, TM], ['Morse key', 5, 4],
  ],

  things_with_wheels: [
    ['car', 1, 1], ['bike', 1, 1], ['skateboard', 1, 1], ['wheelbarrow', 1, 1], ['shopping cart', 1, 1], ['roller skate', 1, 1], ['bus', 1, 1], ['truck', 1, 1, { g: 'vehicle' }], ['train', 1, 2], ['wagon', 1, 1],
    ['tricycle', 1, 1], ['scooter', 1, 1], ['stroller', 1, 1, { al: [['pram', 'synonym', 2, 2, ['UK']], ['pushchair', 'synonym', 2, 2, ['UK']]] }], ['wheelchair', 1, 1], ['office chair', 1, 2],
    ['suitcase', 1, 3], ['luggage trolley', 2, 2], ['hospital bed', 2, 3], ['tractor', 1, 1], ['motorcycle', 1, 1], ['airplane', 1, 4, { al: [['aeroplane', 'spelling', 1, 4, ['UK']]] }],
    ['unicycle', 2, 1], ['go-kart', 2, 1], ['Ferris wheel', 1, 3], ['roller blades', 2, 1], ['hand truck', 2, 2], ['lawn mower', 1, 3], ['cart', 1, 1], ['chariot', 2, 2], ['rickshaw', 2, 2],
    ['hearse', 2, 3], ['gurney', 3, 3], ['roller coaster', 1, 3], ['forklift', 2, 2], ['caster', 3, 3, { g: 'swivel wheel' }], ['penny-farthing', 3, 2], ['stagecoach', 3, 2], ['covered wagon', 2, 2],
    ['dolly', 3, 3, { g: 'trolley' }], ['skate', 1, 2, { g: 'roller skate' }], ['velocipede', 5, 3], ['gig', 4, 4, { g: 'carriage' }], ['dray', 5, 4],
  ],

  things_with_teeth: [
    ['comb', 1, 1], ['saw', 1, 1, { g: 'tool' }], ['zipper', 1, 1, { al: [['zip', 'synonym', 1, 1, ['UK']]] }], ['shark', 1, 1], ['gear', 1, 1, { g: 'machine' }], ['rake', 1, 2], ['cog', 2, 1], ['key', 1, 3, { g: 'lock' }],
    ['crocodile', 1, 1], ['dog', 1, 4], ['human', 1, 4, { pos: 'noun' }], ['chainsaw', 1, 1], ['bread knife', 2, 2], ['stamp', 2, 4], ['vampire', 1, 3], ['piranha', 1, 1], ['beaver', 1, 2],
    ['lion', 1, 3], ['walrus', 2, 4], ['dentures', 3, 3], ['bear trap', 2, 2], ['hacksaw', 2, 1], ['sprocket', 3, 2], ['ratchet', 3, 3, { g: 'socket wrench' }], ['serrated knife', 3, 2], ['jaw', 2, 3], ['wolf', 1, 3],
    ['sawfish', 3, 3], ['pinking shears', 4, 3], ['hairbrush', 1, 4], ['gear wheel', 3, 2], ['rack and pinion', 5, 3], ['sawtooth wave', 5, 4], ['hand saw', 1, 1], ['fork', 1, 5, { g: 'cutlery' }],
    ['pitchfork', 2, 4], ['mouth', 1, 3], ['dragon', 1, 4], ['tooth fairy', 2, 4], ['mitre', 5, 5, { g: 'joint' }],
  ],

  things_with_shells: [
    ['snail', 1, 1], ['egg', 1, 1], ['turtle', 1, 1], ['peanut', 1, 1], ['oyster', 1, 1], ['clam', 1, 1], ['crab', 1, 1], ['lobster', 1, 1], ['walnut', 1, 1], ['coconut', 1, 1],
    ['tortoise', 1, 1], ['mussel', 2, 1], ['scallop', 2, 1], ['armadillo', 2, 3], ['hermit crab', 1, 1], ['nautilus', 3, 2], ['conch', 3, 2], ['pistachio', 2, 2], ['almond', 1, 3], ['hazelnut', 2, 2],
    ['pecan', 2, 2], ['beetle', 1, 3], ['cockle', 3, 2], ['barnacle', 3, 3], ['taco', 1, 3], ['shrimp', 1, 4], ['bullet', 2, 4], ['limpet', 3, 3], ['abalone', 3, 3],
    ['chestnut', 2, 3], ['cowrie', 4, 3], ['periwinkle', 3, 3, { g: 'snail' }], ['whelk', 4, 3], ['ammonite', 3, 3], ['crayfish', 3, 3], ['prawn', 2, 4, { reg: ['UK'] }], ['macadamia', 3, 3],
    ['pie shell', 3, 4], ['seashell', 1, 1], ['sea urchin', 3, 3], ['trilobite', 4, 4], ['brazil nut', 2, 3], ['terrapin', 3, 2], ['ark shell', 5, 4],
  ],

  things_with_horns: [
    ['rhino', 1, 1, { al: [['rhinoceros', 'synonym', 1, 1]] }], ['goat', 1, 1], ['bull', 1, 1], ['car', 1, 2], ['unicorn', 1, 1], ['ram', 2, 1, { g: 'animal' }], ['buffalo', 1, 2, { g: 'bison' }], ['antelope', 2, 2], ['cow', 1, 3],
    ['ox', 2, 2], ['yak', 2, 2], ['bison', 2, 2], ['Viking helmet', 1, 2], ['trumpet', 1, 3], ['French horn', 2, 2], ['triceratops', 2, 1], ['minotaur', 2, 1], ['impala', 3, 3], ['gazelle', 2, 3],
    ['ibex', 3, 2], ['mountain goat', 2, 2], ['bighorn sheep', 3, 2], ['kudu', 4, 3], ['oryx', 4, 3], ['horned owl', 3, 3], ['rhinoceros beetle', 3, 2], ['horned lizard', 4, 3], ['shofar', 4, 3, { sens: true }],
    ['truck', 1, 3, { g: 'vehicle' }], ['ship', 2, 4], ['bugle', 2, 3], ['Highland cow', 2, 2, { g: 'cattle' }], ['water buffalo', 2, 2], ['longhorn', 3, 2], ['bull elephant', 3, 5], ['wildebeest', 3, 3],
    ['springbok', 4, 3], ['chamois', 4, 3], ['sable antelope', 4, 3], ['takin', 5, 4], ['markhor', 5, 4], ['saiga', 5, 4], ['narwhal', 2, 4], ['devil', 1, 3, { sens: true }], ['horn of plenty', 3, 4, { type: 'phrase' }],
  ],

  things_with_eyes: [
    ['person', 1, 1], ['cat', 1, 1], ['dog', 1, 1], ['fish', 1, 2], ['needle', 1, 2, { g: 'sewing' }], ['potato', 1, 2], ['hurricane', 1, 2], ['storm', 1, 4], ['peacock feather', 2, 2], ['spider', 1, 2],
    ['fly', 1, 2, { g: 'insect' }], ['owl', 1, 2], ['doll', 1, 2], ['teddy bear', 1, 2], ['Cyclops', 2, 1, { type: 'proper' }], ['hook and eye', 3, 3, { type: 'phrase' }], ['bird', 1, 2], ['frog', 1, 2],
    ['snake', 1, 2], ['scarecrow', 1, 2], ['snowman', 1, 2], ['cow', 1, 3], ['eagle', 1, 2], ['octopus', 1, 2], ['shrimp', 1, 4], ['mask', 1, 3], ['portrait', 2, 3], ['Argus', 4, 2, { type: 'proper' }],
    ['Mr. Potato Head', 1, 2, TM], ['Swiss cheese', 2, 3], ['pineapple', 1, 4], ['tuna', 1, 4], ['Sauron', 3, 3, { type: 'proper', tm: true }], ['bullseye', 2, 4], ['monster', 1, 2], ['typhoon', 2, 3],
    ['cyclone', 2, 3], ['face', 1, 2], ['baby', 1, 2], ['googly eyes', 2, 1], ['cuttlefish', 3, 3], ['mantis shrimp', 4, 4], ['chameleon', 2, 3], ['dragonfly', 2, 3],
  ],
};

export const FIXES = [
  { gloss: ['iron', 'metals', 'metal'] },
  { gloss: ['saw', 'hand_tools', 'tool'] },
  { gloss: ['mint', 'herbs_spices_and_sauces', 'herb'] },
];

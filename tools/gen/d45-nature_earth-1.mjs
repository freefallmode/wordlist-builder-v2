// Depth 4/5 batch: nature_earth chunk 1 (trees of the world, flowers of the world / by colour, regional plants, rocks and minerals, earth's layers). Format: tools/apply-words.mjs.
const P = (o = {}) => ({ type: 'proper', ...o });

export const THEMES = {
  african_trees: { d: 3 }, asian_trees: { d: 4 }, australian_trees: { d: 4 }, south_american_trees: { d: 4 }, north_american_trees: { d: 3 }, mediterranean_trees: { d: 3 },
  anatolian_flowers: { d: 5 }, south_african_flowers: { d: 4 }, flowers_of_east_asia: { d: 3 }, australian_wildflowers: { d: 5 }, south_american_flowers: { d: 4 }, alpine_flowers: { d: 4 },
  yellow_flowers: { d: 1 }, blue_flowers: { d: 2 }, red_flowers: { d: 1 }, white_flowers: { d: 2 }, purple_flowers: { d: 2 },
  plants_of_the_middle_east: { d: 4 }, new_zealand_plants: { d: 4 },
  quartz_varieties: { d: 4 }, igneous_rocks: { d: 3 }, sedimentary_rocks: { d: 3 }, mohs_scale_minerals: { d: 4, complete: true }, earth_s_layers: { d: 1, complete: true },
};

export const DATA = {
  african_trees: [
    ['baobab', 3, 1], ['acacia', 2, 2], ['ebony', 2, 3, { g: 'tree' }], ['mahogany', 2, 3, { g: 'wood' }], ['marula', 4, 3], ['fever tree', 4, 3], ['mopane', 5, 4], ['sausage tree', 4, 4],
    ['shea', 3, 4], ['iroko', 5, 5], ['camel thorn', 5, 4], ['umbrella thorn', 4, 3], ['yellowwood', 4, 4], ['argan', 3, 4], ['kola', 3, 4], ['African blackwood', 5, 5],
    ['sapele', 5, 5], ['dragon tree', 4, 4], ['wild olive', 4, 5], ['knobthorn', 5, 5], ['oil palm', 3, 4], ['kigelia', 5, 5],
  ],
  asian_trees: [
    ['banyan', 3, 1], ['teak', 2, 2], ['neem', 3, 3], ['sal', 5, 4, { g: 'tree' }], ['deodar', 5, 4], ['ginkgo', 3, 3], ['sandalwood', 3, 3], ['bodhi tree', 3, 2], ['peepal', 5, 4],
    ['rubber tree', 2, 3], ['camphor', 3, 4, { g: 'tree' }], ['tamarind', 3, 4], ['jackfruit', 3, 4], ['Japanese maple', 3, 3], ['sugi', 5, 5], ['durian', 3, 4],
    ['lacquer tree', 5, 5], ['mangosteen', 4, 5], ['dawn redwood', 4, 4], ['Himalayan cedar', 5, 4], ['rain tree', 5, 5], ['sakura', 3, 3],
  ],
  australian_trees: [
    ['eucalyptus', 2, 1], ['gum tree', 2, 1], ['wattle', 3, 3, { g: 'plant' }], ['jarrah', 4, 3], ['boab', 4, 3], ['banksia', 3, 3], ['ghost gum', 4, 3], ['river red gum', 5, 4],
    ['bottlebrush', 3, 4], ['Moreton Bay fig', 5, 4], ['Wollemi pine', 5, 3], ['macadamia', 3, 4], ['mulga', 5, 5], ['she-oak', 5, 4], ['paperbark', 4, 4], ['karri', 5, 4],
    ['Norfolk Island pine', 4, 4], ['bunya pine', 5, 5], ['grass tree', 4, 4], ['blue gum', 4, 3], ['silky oak', 5, 5], ['huon pine', 5, 5], ['snow gum', 5, 4], ['tea tree', 3, 4],
  ],
  south_american_trees: [
    ['jacaranda', 3, 2], ['ceiba', 4, 3], ['Brazil nut', 2, 2], ['rubber tree', 2, 2], ['monkey puzzle', 3, 2], ['quebracho', 5, 4], ['balsa', 3, 3], ['cacao', 3, 3], ['kapok', 4, 3],
    ['mahogany', 2, 3, { g: 'wood' }], ['rosewood', 3, 4], ['palo santo', 4, 4], ['brazilwood', 5, 4], ['cecropia', 5, 5], ['algarrobo', 5, 5], ['araucaria', 4, 4], ['guava', 2, 4],
    ['ipe', 5, 5], ['cinchona', 5, 5], ['cashew tree', 3, 4], ['acai palm', 4, 4], ['lapacho', 5, 5], ['pau-brasil', 5, 5],
  ],
  north_american_trees: [
    ['sequoia', 3, 1], ['redwood', 2, 2], ['sugar maple', 3, 2], ['bald cypress', 4, 3], ['black walnut', 4, 3], ['pecan', 2, 3], ['hickory', 3, 3], ['live oak', 4, 3],
    ['white oak', 3, 3], ['red maple', 4, 3], ['American elm', 4, 3], ['Joshua tree', 3, 2, { g: 'tree', type: 'proper' }], ['ponderosa pine', 4, 3], ['Douglas fir', 4, 3, P()], ['aspen', 3, 3, { g: 'tree' }], ['cottonwood', 4, 4],
    ['sweetgum', 4, 4], ['tulip tree', 4, 4], ['dogwood', 3, 3], ['redbud', 4, 4], ['loblolly pine', 5, 5], ['bristlecone pine', 5, 4], ['paper birch', 4, 4],
    ['western red cedar', 5, 4], ['giant sequoia', 4, 2], ['white pine', 4, 4], ['blue spruce', 4, 4], ['buckeye', 4, 4, { g: 'tree' }], ['tamarack', 5, 5], ['balsam fir', 4, 4],
  ],
  mediterranean_trees: [
    ['olive tree', 1, 1], ['cypress', 3, 2], ['stone pine', 5, 4], ['carob', 4, 3], ['fig tree', 2, 3], ['almond tree', 2, 3], ['pomegranate tree', 3, 4], ['holm oak', 4, 4], ['cork oak', 3, 3],
    ['bay laurel', 3, 4], ['myrtle', 3, 4], ['Aleppo pine', 5, 5], ['umbrella pine', 4, 4], ['lemon tree', 1, 3], ['orange tree', 1, 3], ['strawberry tree', 4, 4],
    ['mastic', 4, 5], ['plane tree', 4, 4], ['Judas tree', 5, 5], ['Italian cypress', 4, 3], ['cedar of Lebanon', 4, 4], ['terebinth', 5, 5], ['pistachio tree', 3, 4],
  ],
  anatolian_flowers: [
    ['tulip', 1, 1], ['hyacinth', 2, 2], ['crocus', 2, 2], ['cyclamen', 3, 3, { g: 'plant' }], ['fritillary', 4, 4, { g: 'flower' }], ['snowdrop', 2, 3], ['anemone', 3, 4, { g: 'flower' }], ['narcissus', 3, 4, { g: 'flower' }],
    ['iris', 2, 3, { g: 'flower' }], ['peony', 3, 4, { g: 'flower' }], ['poppy', 1, 3], ['saffron crocus', 4, 4], ['grape hyacinth', 3, 4], ['scilla', 5, 5], ['daffodil', 1, 4],
    ['cornflower', 3, 4], ['winter aconite', 5, 5], ['glory of the snow', 5, 5], ['orchid', 2, 4], ['carnation', 2, 4], ['Turkish tulip', 4, 3, { type: 'common' }], ['lily', 1, 4],
  ],
  south_african_flowers: [
    ['protea', 3, 1], ['strelitzia', 4, 2], ['agapanthus', 3, 2], ['freesia', 3, 2], ['clivia', 4, 3], ['gerbera', 3, 3], ['king protea', 4, 2], ['bird of paradise', 2, 2, { g: 'flower' }],
    ['pincushion', 3, 4], ['arum lily', 4, 4], ['gladiolus', 3, 4], ['watsonia', 5, 5], ['pelargonium', 4, 4], ['ixia', 5, 5], ['nerine', 5, 5],
    ['red hot poker', 3, 4], ['lachenalia', 5, 5], ['ice plant', 4, 5], ['osteospermum', 4, 5], ['African daisy', 3, 3], ['plumbago', 4, 5], ['leucospermum', 5, 5], ['disa', 5, 5],
  ],
  flowers_of_east_asia: [
    ['cherry blossom', 1, 1], ['lotus', 2, 1, { g: 'flower' }], ['chrysanthemum', 3, 2, { g: 'flower' }], ['peony', 3, 2, { g: 'flower' }], ['camellia', 3, 3], ['wisteria', 3, 3, { g: 'flower' }],
    ['plum blossom', 3, 2], ['orchid', 2, 3], ['azalea', 3, 3], ['magnolia', 3, 3], ['hydrangea', 3, 4], ['morning glory', 3, 5], ['forsythia', 4, 5], ['rhododendron', 4, 5],
    ['tree peony', 4, 3], ['osmanthus', 5, 4], ['sakura', 3, 1], ['ume', 5, 4, { g: 'plum' }], ['balloon flower', 4, 4], ['spider lily', 4, 4], ['gardenia', 3, 5], ['jasmine', 2, 5], ['rose of Sharon', 4, 4],
    ['kerria', 5, 5],
  ],
  australian_wildflowers: [
    ['kangaroo paw', 3, 1], ['waratah', 4, 2], ['wattle', 3, 2, { g: 'plant' }], ['banksia', 3, 2], ['flannel flower', 4, 3], ['bottlebrush', 3, 3], ["Sturt's desert pea", 5, 3],
    ['everlasting daisy', 4, 3], ['paper daisy', 4, 4], ['grevillea', 4, 4], ['boronia', 5, 5], ['eremophila', 5, 5], ['hakea', 5, 5], ['golden wattle', 4, 2], ['Christmas bush', 4, 4],
    ['Geraldton wax', 5, 4], ['trigger plant', 5, 5], ['sun orchid', 5, 5], ['spider orchid', 4, 5], ['hardenbergia', 5, 5], ['correa', 5, 5], ['pigface', 4, 5], ['running postman', 5, 5],
    ['billy buttons', 5, 5], ['Swan River daisy', 5, 5],
  ],
  south_american_flowers: [
    ['passionflower', 3, 1], ['fuchsia', 3, 2], ['alstroemeria', 4, 2], ['bromeliad', 3, 3], ['heliconia', 4, 3], ['cattleya', 5, 4], ['petunia', 2, 3], ['bougainvillea', 3, 3],
    ["angel's trumpet", 3, 4], ['calceolaria', 5, 5], ['nasturtium', 3, 4], ['lantana', 4, 5], ['verbena', 3, 5], ['begonia', 3, 4], ['air plant', 3, 4], ['giant water lily', 4, 4],
    ['Peruvian lily', 4, 2], ['cantua', 5, 5], ['anthurium', 3, 4], ['puya', 5, 5], ['calla lily', 3, 5], ['salvia', 3, 5], ['ceibo flower', 5, 5], ['slipper flower', 5, 5], ['tillandsia', 5, 5],
  ],
  alpine_flowers: [
    ['edelweiss', 2, 1], ['gentian', 3, 2], ['alpine rose', 4, 2], ['saxifrage', 4, 3], ['pasqueflower', 4, 3], ['alpine aster', 5, 4], ['alpenrose', 4, 3], ['soldanella', 5, 4],
    ['primula', 4, 4], ['alpine poppy', 5, 4], ['moss campion', 5, 4], ['glacier crowfoot', 5, 4], ['houseleek', 4, 4], ['trumpet gentian', 5, 3], ['stemless gentian', 5, 3],
    ['alpine forget-me-not', 5, 4], ['auricula', 5, 4], ['columbine', 3, 5, { g: 'flower' }], ['mountain avens', 5, 4], ['purple saxifrage', 5, 4], ['cinquefoil', 5, 5], ['alpine clematis', 5, 4], ['harebell', 4, 5],
    ['aubrieta', 4, 5],
  ],
  yellow_flowers: [
    ['daffodil', 1, 1], ['sunflower', 1, 1], ['buttercup', 1, 1], ['dandelion', 1, 1], ['marigold', 2, 2], ['primrose', 2, 2, { g: 'flower' }], ['forsythia', 3, 2], ['black-eyed Susan', 3, 3],
    ['goldenrod', 3, 3], ['gorse', 3, 3], ['broom', 3, 4], ['tansy', 4, 3], ['cowslip', 3, 3], ['mimosa', 3, 3, { g: 'plant' }], ['yellow rose', 1, 2], ['lesser celandine', 4, 3],
    ['coreopsis', 4, 4], ['rapeseed', 3, 4], ['yellow iris', 4, 3], ['evening primrose', 4, 3], ['yarrow', 3, 4], ["St John's wort", 3, 4], ['trollius', 5, 4], ['gazania', 4, 4],
    ['kerria', 5, 4], ['winter jasmine', 4, 4], ['wattle', 3, 4, { g: 'plant' }], ['sneezeweed', 5, 5],
  ],
  blue_flowers: [
    ['bluebell', 1, 1], ['cornflower', 2, 1], ['forget-me-not', 2, 1], ['delphinium', 3, 2], ['hydrangea', 2, 3], ['lupin', 3, 3, { g: 'flower' }], ['morning glory', 2, 3], ['agapanthus', 3, 3],
    ['larkspur', 3, 3], ['periwinkle', 3, 3, { g: 'flower' }], ['grape hyacinth', 3, 2], ['blue poppy', 4, 2], ['cranesbill', 4, 4], ['speedwell', 4, 3], ['borage', 3, 3], ['chicory', 3, 4, { g: 'flower' }],
    ['scilla', 5, 4], ['lobelia', 3, 3], ['love-in-a-mist', 4, 3], ['flax', 3, 4, { g: 'plant' }], ['gentian', 3, 2], ['anchusa', 5, 4], ['monkshood', 4, 4], ['harebell', 4, 3],
    ["viper's bugloss", 5, 5], ['plumbago', 4, 4], ['muscari', 5, 4], ['iris', 2, 4, { g: 'flower' }],
  ],
  red_flowers: [
    ['rose', 1, 1, { g: 'flower' }], ['poppy', 1, 1], ['tulip', 1, 1], ['carnation', 2, 2], ['geranium', 2, 2], ['amaryllis', 3, 3], ['poinsettia', 2, 2], ['hibiscus', 2, 3],
    ['camellia', 3, 4], ['gerbera', 3, 4], ['dahlia', 3, 3], ['anthurium', 3, 3], ['red hot poker', 3, 3], ['cardinal flower', 4, 2], ['begonia', 3, 4], ['salvia', 3, 4],
    ['peony', 3, 4, { g: 'flower' }], ['zinnia', 3, 4], ['cyclamen', 3, 4, { g: 'plant' }], ['bleeding heart', 3, 3], ['ranunculus', 4, 4], ['snapdragon', 3, 4], ['scarlet pimpernel', 4, 3],
    ['gladiolus', 3, 5], ['cockscomb', 4, 3], ['celosia', 5, 4], ['red clover', 3, 4], ['bee balm', 4, 4], ['pomegranate blossom', 5, 5],
  ],
  white_flowers: [
    ['lily', 1, 1], ['daisy', 1, 1], ['snowdrop', 2, 1], ['jasmine', 2, 2], ['gardenia', 3, 2], ['lily of the valley', 3, 2], ['edelweiss', 2, 2], ['magnolia', 3, 3],
    ['orange blossom', 2, 3], ['camellia', 3, 4], ['hawthorn', 3, 3, { g: 'tree' }], ['elderflower', 3, 3], ['cow parsley', 3, 3], ["Queen Anne's lace", 4, 3], ['white rose', 1, 2],
    ['stephanotis', 5, 4], ['narcissus', 3, 4, { g: 'flower' }], ["baby's breath", 3, 3], ['gypsophila', 4, 3], ['anemone', 3, 4, { g: 'flower' }], ['mock orange', 4, 4], ['wood anemone', 4, 3],
    ['oxeye daisy', 3, 3], ['calla lily', 3, 3], ['tuberose', 4, 4], ['feverfew', 4, 4], ['white clover', 3, 4], ['dogwood', 3, 4], ['bridal wreath', 5, 4], ['orchid', 2, 4],
  ],
  purple_flowers: [
    ['lavender', 2, 1, { g: 'flower' }], ['violet', 2, 1, { g: 'flower' }], ['iris', 2, 2, { g: 'flower' }], ['lilac', 2, 1, { g: 'flower' }], ['wisteria', 3, 2, { g: 'flower' }], ['crocus', 2, 2],
    ['pansy', 2, 2], ['clematis', 3, 3], ['aster', 3, 3], ['allium', 3, 3], ['foxglove', 3, 3], ['thistle', 2, 3], ['heather', 2, 3], ['orchid', 2, 4], ['lupin', 3, 4, { g: 'flower' }],
    ['petunia', 3, 4], ['hyacinth', 2, 4], ['verbena', 3, 4], ['buddleia', 4, 3], ['sweet pea', 3, 4], ['Michaelmas daisy', 4, 3], ['campanula', 4, 4], ['salvia', 3, 4],
    ['cranesbill', 4, 4], ['monkshood', 4, 4], ['African violet', 3, 2], ['heliotrope', 4, 4, { g: 'flower' }], ['catmint', 3, 4], ['echinacea', 3, 4], ['scabious', 4, 4], ['sea holly', 4, 4],
    ['pasqueflower', 4, 4],
  ],
  plants_of_the_middle_east: [
    ['date palm', 2, 1], ['cedar of Lebanon', 4, 2], ['frankincense', 3, 2], ['myrrh', 3, 2], ['henna', 3, 2], ['tamarisk', 4, 3], ['olive tree', 1, 3], ['fig', 1, 4],
    ['pomegranate', 2, 4], ['sidr', 5, 4], ['ghaf', 5, 4], ['saffron', 3, 4, { g: 'spice' }], ['sumac', 3, 3], ['hyssop', 4, 4], ['papyrus', 3, 3, { g: 'plant' }], ['aloe', 2, 4], ['oleander', 3, 4],
    ['jujube', 4, 4], ['mastic', 4, 4], ['damask rose', 4, 3], ['black seed', 3, 4], ['senna', 4, 4], ['balm of Gilead', 4, 4], ['sycamore fig', 5, 5], ['desert rose', 3, 4],
    ['licorice', 2, 5], ['terebinth', 5, 5], ['oud', 4, 4, { g: 'wood' }], ['gum arabic', 4, 4],
  ],
  new_zealand_plants: [
    ['kauri', 3, 1], ['pohutukawa', 4, 1], ['silver fern', 2, 1], ['manuka', 3, 2], ['kowhai', 4, 2], ['harakeke', 5, 3], ['flax', 3, 3, { g: 'plant' }], ['rimu', 4, 3], ['totara', 5, 3],
    ['kahikatea', 5, 4], ['nikau', 5, 3], ['cabbage tree', 4, 3], ['tree fern', 3, 2], ['ponga', 5, 4], ['mamaku', 5, 4], ['rata', 5, 4, { g: 'tree' }], ['kawakawa', 5, 3], ['toetoe', 5, 4],
    ['puriri', 5, 4], ['rewarewa', 5, 5], ['tawa', 5, 5, { g: 'tree' }], ['matai', 5, 5], ['hebe', 4, 4, { g: 'shrub' }], ['kanuka', 5, 4], ['ngaio', 5, 5], ['karaka', 5, 5], ['horopito', 5, 5],
    ['Mount Cook lily', 5, 4], ['Christmas tree', 1, 4],
  ],
  quartz_varieties: [
    ['amethyst', 2, 1, { g: 'gemstone' }], ['citrine', 3, 2, { g: 'gem' }], ['rose quartz', 3, 1, { g: 'gem' }], ['agate', 3, 2, { g: 'gemstone' }], ['onyx', 3, 3, { g: 'gem' }], ['jasper', 3, 3, { g: 'gemstone' }], ['carnelian', 4, 3, { g: 'gemstone' }], ["tiger's eye", 3, 3], ['smoky quartz', 3, 2],
    ['chalcedony', 4, 3], ['milky quartz', 4, 3], ['rock crystal', 4, 3], ['aventurine', 4, 4], ['chrysoprase', 5, 4], ['bloodstone', 4, 4], ['sard', 5, 5], ['ametrine', 5, 4],
    ['rutilated quartz', 5, 4], ['flint', 2, 5], ['chert', 4, 5], ['sardonyx', 5, 4], ['moss agate', 4, 3], ['heliotrope', 5, 5, { g: 'gemstone' }], ["hawk's eye", 5, 4],
    ['cairngorm', 5, 4], ['morion', 5, 5], ['prase', 5, 5], ["cat's eye", 3, 5, { g: 'gemstone' }],
  ],
  igneous_rocks: [
    ['granite', 1, 1], ['basalt', 2, 1], ['obsidian', 2, 1], ['pumice', 2, 1], ['gabbro', 4, 2], ['andesite', 4, 2], ['rhyolite', 4, 2], ['tuff', 4, 3], ['diorite', 4, 3], ['dolerite', 4, 3],
    ['peridotite', 5, 3], ['scoria', 4, 3], ['syenite', 5, 4], ['pegmatite', 5, 4], ['dacite', 5, 4], ['komatiite', 5, 4], ['kimberlite', 4, 4], ['porphyry', 4, 4], ['trachyte', 5, 4],
    ['diabase', 5, 4], ['lava rock', 2, 3], ['volcanic glass', 3, 3], ['felsite', 5, 5], ['anorthosite', 5, 4], ['granodiorite', 5, 4], ['pitchstone', 5, 4], ['ignimbrite', 5, 4], ['phonolite', 5, 5],
  ],
  sedimentary_rocks: [
    ['sandstone', 1, 1], ['limestone', 2, 1], ['shale', 3, 2], ['chalk', 1, 2, { g: 'rock' }], ['coal', 1, 3], ['conglomerate', 3, 2, { g: 'rock' }], ['flint', 2, 3], ['mudstone', 4, 2],
    ['siltstone', 4, 2], ['breccia', 4, 3], ['dolomite', 4, 3], ['travertine', 4, 3], ['chert', 4, 3], ['rock salt', 3, 3], ['ironstone', 4, 4], ['greywacke', 5, 4], ['marl', 4, 4],
    ['claystone', 5, 4], ['oolite', 5, 4], ['tufa', 5, 4], ['coquina', 5, 4], ['arkose', 5, 5], ['loess', 5, 5], ['lignite', 4, 4], ['oil shale', 4, 4], ['diatomite', 5, 5],
    ['gritstone', 4, 3], ['millstone grit', 5, 4], ['brownstone', 4, 4],
  ],
  mohs_scale_minerals: [
    ['talc', 2, 2], ['gypsum', 3, 3], ['calcite', 3, 3], ['fluorite', 3, 3], ['apatite', 4, 4], ['orthoclase', 5, 5, { al: [['feldspar', 'synonym', 3, 4]] }], ['quartz', 1, 1],
    ['topaz', 2, 2, { g: 'gemstone' }], ['corundum', 4, 4], ['diamond', 1, 1, { g: 'gem' }],
  ],
  earth_s_layers: [
    ['crust', 2, 1], ['mantle', 2, 1, { g: 'earth layer' }], ['outer core', 2, 1], ['inner core', 2, 1],
  ],
};

export const ALIASES = [];

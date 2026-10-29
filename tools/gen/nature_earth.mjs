// Generated word data: Nature & Earth, the playable themes directly under it (trees ... rocks and minerals).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const UK = ['UK'], US = ['US'];

export const THEMES = {
  trees: { d: 1 }, flowers: { d: 1 }, plants: { d: 2 }, garden: { d: 1 }, landscapes: { d: 2 }, weather: { d: 1 }, rocks_and_minerals: { d: 2 },
};

export const DATA = {
  // ---------------------------------------------------------------- trees
  trees: [
    ['oak', 1, 1], ['pine', 1, 1, { g: 'tree' }], ['maple', 1, 1], ['palm', 1, 2, { g: 'tree' }], ['ash', 1, 2, { g: 'tree' }], ['willow', 2, 2], ['birch', 2, 2],
    ['elm', 2, 2], ['beech', 2, 2], ['cedar', 2, 2], ['fir', 2, 2], ['spruce', 2, 2], ['redwood', 2, 2], ['eucalyptus', 2, 2, { al: [['gum tree', 'synonym', 2, 2, ['AU']]] }],
    ['bonsai', 2, 3], ['evergreen', 2, 2], ['sequoia', 3, 2], ['cypress', 3, 2], ['poplar', 3, 2], ['aspen', 3, 2, { al: [['quaking aspen', 'synonym', 4, 4]] }],
    ['sycamore', 3, 2], ['hawthorn', 3, 3], ['hazel', 3, 3, { g: 'tree' }], ['larch', 3, 3], ['yew', 3, 3], ['juniper', 3, 3], ['hickory', 3, 3],
    ['acacia', 3, 3], ['mahogany', 3, 3], ['ebony', 3, 4, { g: 'tree' }], ['teak', 3, 3], ['baobab', 3, 3, { al: [['monkey bread tree', 'synonym', 5, 5, [], { type: 'phrase' }]] }],
    ['banyan', 3, 3], ['magnolia', 3, 3], ['ginkgo', 3, 3, { al: [['maidenhair tree', 'synonym', 4, 4]] }], ['monkey puzzle', 3, 3, { al: [['Chile pine', 'synonym', 5, 5, [], { type: 'proper' }]] }],
    ['Joshua tree', 3, 3, { type: 'proper' }], ['jacaranda', 3, 3], ['mangrove', 3, 3], ['conifer', 3, 3], ['deciduous', 3, 3, adj()], ['sandalwood', 3, 4],
    ['alder', 4, 3], ['linden', 4, 3, { al: [['lime tree', 'synonym', 3, 3, UK, { g: 'linden' }], ['basswood', 'synonym', 4, 4, US]] }],
    ['rowan', 4, 3, { al: [['mountain ash', 'synonym', 3, 3]] }], ['dogwood', 4, 3], ['cottonwood', 4, 4], ['hornbeam', 4, 4], ['tulip tree', 4, 4], ['sweetgum', 4, 4],
    ['plane tree', 4, 4], ['Douglas fir', 4, 3, { type: 'proper' }], ['kauri', 4, 4, { reg: ['NZ'] }], ['balsa', 4, 4], ['tamarack', 5, 4, { reg: ['US', 'CA'] }],
    ['whitebeam', 5, 5, { reg: UK }], ['wych elm', 5, 5, { reg: UK }],
  ],

  // ---------------------------------------------------------------- flowers
  flowers: [
    ['rose', 1, 1, { g: 'flower' }], ['tulip', 1, 1], ['daisy', 1, 1], ['sunflower', 1, 1], ['lily', 1, 1], ['orchid', 1, 1], ['daffodil', 1, 1, { al: [['narcissus', 'synonym', 3, 3]] }],
    ['poppy', 1, 1], ['violet', 2, 1, { g: 'flower' }], ['lavender', 2, 2, { g: 'flower' }], ['carnation', 2, 1, { al: [['dianthus', 'synonym', 4, 4]] }], ['marigold', 2, 2],
    ['pansy', 2, 2], ['petunia', 2, 2], ['geranium', 2, 2], ['chrysanthemum', 2, 2, { al: [['mum', 'synonym', 2, 2, ['US'], { g: 'flower' }]] }],
    ['iris', 2, 2, { g: 'flower' }], ['hyacinth', 2, 2], ['lilac', 2, 2, { g: 'flower' }], ['jasmine', 2, 2], ['hibiscus', 2, 2], ['peony', 2, 2, { al: [['paeony', 'spelling', 4, 4, UK]] }],
    ['snapdragon', 2, 2, { al: [['antirrhinum', 'synonym', 5, 5]] }], ['sweet pea', 2, 2], ['bluebell', 2, 2], ['buttercup', 2, 2], ['snowdrop', 2, 2], ['crocus', 2, 2],
    ['forget-me-not', 2, 3, { type: 'phrase' }], ['dandelion', 1, 3], ['lotus', 2, 3, { g: 'flower' }], ['hydrangea', 3, 2], ['dahlia', 3, 2], ['primrose', 3, 2], ['foxglove', 3, 2],
    ['zinnia', 3, 3], ['begonia', 3, 3], ['aster', 3, 3], ['gardenia', 3, 3], ['camellia', 3, 3], ['azalea', 3, 3], ['delphinium', 3, 3],
    ['lupin', 3, 3, { al: [['lupine', 'spelling', 3, 3, US]] }], ['gladiolus', 3, 3, { al: [['sword lily', 'synonym', 5, 5]] }], ['freesia', 3, 3], ['anemone', 3, 3, { g: 'flower' }],
    ['edelweiss', 3, 3], ['cornflower', 3, 3, { al: [["bachelor's button", 'synonym', 4, 4, US]] }], ['hollyhock', 3, 3], ['nasturtium', 3, 3], ['amaryllis', 3, 3],
    ['bird of paradise', 3, 3, { g: 'flower', type: 'phrase' }], ['cosmos', 4, 3, { g: 'flower' }], ['sweet William', 4, 3, { type: 'proper' }], ['larkspur', 4, 4], ['columbine', 4, 4],
    ['verbena', 4, 4], ['salvia', 4, 4], ['protea', 4, 4], ['gerbera', 4, 3], ['ranunculus', 4, 4], ['agapanthus', 4, 4], ['celosia', 5, 5], ['lisianthus', 5, 5], ['astilbe', 5, 5],
  ],

  // ---------------------------------------------------------------- plants
  plants: [
    ['fern', 1, 1], ['moss', 1, 1], ['cactus', 1, 1], ['grass', 1, 1], ['ivy', 2, 1], ['bush', 1, 2], ['shrub', 2, 2], ['vine', 1, 2], ['bamboo', 1, 2], ['weed', 1, 2],
    ['clover', 2, 2], ['thistle', 2, 2], ['nettle', 2, 2, { al: [['stinging nettle', 'synonym', 2, 2]] }], ['aloe vera', 2, 2, { al: [['aloe', 'synonym', 2, 2]] }],
    ['venus flytrap', 2, 2, { al: [['Venus fly trap', 'spelling', 2, 2, [], { type: 'phrase' }]] }], ['reed', 2, 3, { g: 'plant' }], ['tumbleweed', 2, 3, { al: [['Russian thistle', 'synonym', 5, 5]] }],
    ['shamrock', 2, 3], ['seedling', 2, 3], ['sapling', 2, 3], ['mistletoe', 2, 3], ['water lily', 2, 3], ['sugarcane', 2, 3, { al: [['sugar cane', 'spelling', 2, 2]] }],
    ['heather', 3, 2], ['bracken', 3, 3], ['gorse', 3, 3, { reg: UK, al: [['furze', 'synonym', 4, 4, UK], ['whin', 'synonym', 5, 5, UK]] }], ['papyrus', 3, 3],
    ['pitcher plant', 3, 3], ['mimosa', 3, 3, { g: 'plant' }], ['yucca', 3, 3], ['agave', 3, 3], ['succulent', 3, 3], ['perennial', 3, 3, { g: 'plant' }], ['annual', 3, 3, { g: 'plant' }],
    ['rush', 3, 4, { g: 'plant' }], ['bramble', 3, 3], ['pampas grass', 3, 3], ['duckweed', 3, 3], ['seagrass', 3, 3], ['tree fern', 3, 3],
    ['sundew', 4, 4], ['sphagnum', 4, 4], ['horsetail', 4, 4], ['cycad', 4, 4], ['liana', 4, 4], ['bromeliad', 4, 4], ['sedge', 4, 4], ['biennial', 4, 4, { g: 'plant' }],
    ['kudzu', 4, 4, { reg: US }], ['bindweed', 4, 4], ['knotweed', 4, 4], ['sensitive plant', 4, 4], ['epiphyte', 5, 4], ['liverwort', 5, 4], ['hornwort', 5, 5], ['club moss', 5, 5],
  ],

  // ---------------------------------------------------------------- garden
  garden: [
    ['lawn', 1, 1], ['flower bed', 1, 1], ['hedge', 1, 1], ['shed', 1, 1], ['fence', 1, 2], ['path', 1, 2, { g: 'garden' }], ['patio', 1, 1], ['greenhouse', 1, 1], ['compost', 2, 1],
    ['mulch', 2, 1], ['soil', 1, 2], ['fertilizer', 2, 2, { al: [['fertiliser', 'spelling', 2, 2, ['UK', 'AU', 'NZ', 'IE']]] }], ['pond', 1, 2], ['gate', 1, 2, { g: 'garden' }],
    ['wheelbarrow', 1, 1], ['hose', 1, 1], ['watering can', 1, 1], ['sprinkler', 1, 1], ['lawnmower', 1, 1, { al: [['lawn mower', 'spelling', 1, 1], ['mower', 'synonym', 2, 2]] }],
    ['shovel', 1, 1], ['rake', 1, 1], ['spade', 1, 1], ['trowel', 2, 1], ['hoe', 2, 1, { g: 'tool' }], ['plant pot', 1, 2], ['bird feeder', 1, 2], ['scarecrow', 1, 2], ['fountain', 1, 2],
    ['birdbath', 2, 2], ['trellis', 2, 2], ['garden gnome', 2, 2], ['gazebo', 2, 2], ['raised bed', 2, 2], ['compost bin', 2, 2], ['potting shed', 2, 2], ['rock garden', 2, 2, { al: [['rockery', 'synonym', 3, 3, UK]] }],
    ['vegetable patch', 2, 2, { al: [['veg plot', 'synonym', 3, 3, UK], ['kitchen garden', 'synonym', 3, 3]] }],
    ['sundial', 2, 3], ['decking', 2, 2, { reg: UK }], ['terrace', 2, 3, { g: 'garden' }],
    ['allotment', 3, 2, { reg: UK, al: [['community garden', 'synonym', 2, 2, US]] }], ['pergola', 3, 3], ['arbor', 3, 3, { al: [['arbour', 'spelling', 3, 3, UK]] }], ['topiary', 3, 3],
    ['secateurs', 3, 2, { reg: UK, al: [['pruning shears', 'synonym', 3, 2, US], ['pruners', 'synonym', 3, 3, US]] }], ['water butt', 3, 3, { reg: UK, al: [['rain barrel', 'synonym', 2, 2, US]] }],
    ['seed tray', 3, 3], ['herbaceous border', 3, 3, { reg: UK }], ['cold frame', 4, 3], ['cloche', 4, 4, { g: 'garden' }], ['trug', 4, 4, { reg: UK }],
    ['dibber', 4, 4, { reg: UK, al: [['dibble', 'synonym', 5, 5, UK]] }], ['espalier', 4, 4], ['ha-ha', 5, 5, { g: 'garden wall' }],
  ],

  // ---------------------------------------------------------------- landscapes
  landscapes: [
    ['mountain', 1, 1, { al: [['mount', 'synonym', 2, 2]] }], ['hill', 1, 1, { al: [['hillock', 'synonym', 3, 3], ['knoll', 'synonym', 4, 4], ['hummock', 'synonym', 5, 5]] }],
    ['valley', 1, 1, { al: [['dale', 'synonym', 3, 3, UK], ['vale', 'synonym', 4, 3]] }], ['canyon', 1, 1, { al: [['gulch', 'synonym', 4, 4, US], ['arroyo', 'synonym', 5, 5, US]] }],
    ['cliff', 1, 1], ['desert', 1, 1], ['river', 1, 1], ['lake', 1, 1], ['island', 1, 1], ['glacier', 1, 1], ['volcano', 1, 1], ['cave', 1, 1], ['waterfall', 1, 1], ['beach', 1, 2],
    ['peak', 1, 2, { g: 'mountain' }], ['plain', 2, 2, { g: 'landscape' }], ['plateau', 2, 2], ['meadow', 2, 2], ['prairie', 2, 2], ['tundra', 2, 2], ['savanna', 2, 2, { al: [['savannah', 'spelling', 2, 2]] }],
    ['swamp', 1, 2], ['marsh', 2, 2], ['bog', 2, 3, { al: [['mire', 'synonym', 4, 4]] }], ['gorge', 2, 2], ['dune', 2, 2], ['ridge', 2, 2], ['crater', 2, 2], ['cove', 2, 2],
    ['summit', 2, 3], ['peninsula', 2, 2], ['grassland', 2, 2], ['wetland', 2, 3], ['oasis', 2, 3], ['geyser', 2, 3], ['cape', 2, 3, { g: 'headland' }], ['steppe', 3, 2],
    ['fjord', 3, 2, { al: [['fiord', 'spelling', 4, 4]] }], ['ravine', 3, 2], ['delta', 3, 2, { g: 'river' }], ['estuary', 3, 3], ['archipelago', 3, 3], ['lagoon', 3, 3], ['atoll', 3, 3],
    ['isthmus', 3, 3], ['mesa', 3, 3], ['badlands', 3, 3], ['moor', 3, 3, { al: [['moorland', 'synonym', 3, 3, UK]] }], ['heath', 3, 3, { g: 'landscape' }], ['fen', 3, 3, { reg: UK }],
    ['glen', 3, 3, { reg: ['UK', 'IE'] }], ['escarpment', 3, 3, { al: [['scarp', 'synonym', 5, 5]] }], ['foothills', 3, 3], ['outcrop', 3, 3], ['bluff', 3, 3, { g: 'landform' }],
    ['butte', 4, 4], ['tarn', 4, 4, { reg: UK }], ['moraine', 4, 4],
  ],

  // ---------------------------------------------------------------- weather
  weather: [
    ['rain', 1, 1, { al: [['rainfall', 'synonym', 2, 2]] }], ['snow', 1, 1, { al: [['snowfall', 'synonym', 2, 2]] }], ['wind', 1, 1, { g: 'weather' }], ['cloud', 1, 1], ['storm', 1, 1],
    ['thunder', 1, 1], ['lightning', 1, 1], ['fog', 1, 1, { al: [['pea-souper', 'synonym', 4, 4, UK], ['haar', 'synonym', 5, 5, UK]] }], ['thunderstorm', 1, 1, { al: [['electrical storm', 'synonym', 3, 3]] }],
    ['breeze', 1, 1, { al: [['zephyr', 'synonym', 4, 4]] }], ['frost', 1, 1], ['rainbow', 1, 2], ['shower', 1, 1, { g: 'rain' }], ['raindrop', 1, 1], ['snowflake', 1, 1],
    ['mist', 1, 2], ['hail', 2, 1, { g: 'weather' }], ['sleet', 2, 1, { al: [['wintry mix', 'synonym', 3, 3, US]] }], ['drizzle', 2, 1, { al: [['mizzle', 'synonym', 4, 4, UK]] }],
    ['gale', 2, 2], ['hurricane', 1, 2], ['tornado', 1, 2, { al: [['twister', 'synonym', 2, 2, US]] }], ['blizzard', 2, 1, { al: [['snowstorm', 'synonym', 2, 2]] }],
    ['heatwave', 2, 1, { al: [['heat wave', 'spelling', 2, 2]] }], ['drought', 2, 2], ['flood', 1, 2, { g: 'weather' }], ['humidity', 2, 2], ['forecast', 1, 2],
    ['downpour', 2, 1, { al: [['cloudburst', 'synonym', 4, 4], ['deluge', 'synonym', 3, 3, [], { g: 'rain' }]] }], ['overcast', 2, 2, adj()], ['cyclone', 2, 2], ['typhoon', 2, 2],
    ['monsoon', 2, 2], ['haze', 2, 2], ['smog', 2, 3], ['dew', 2, 2], ['gust', 2, 2], ['icicle', 2, 3], ['black ice', 2, 2], ['thaw', 2, 3], ['cold front', 2, 2],
    ['hailstone', 2, 2], ['sunny', 1, 1, adj()], ['cloudy', 1, 1, adj()], ['rainy', 1, 1, adj()], ['windy', 1, 1, adj()], ['foggy', 1, 1, adj()], ['stormy', 1, 1, adj()],
    ['chilly', 1, 2, adj()], ['muggy', 2, 2, adj()], ['balmy', 3, 2, adj()], ['sultry', 3, 3, adj()], ['blustery', 3, 3, adj()], ['wintry', 3, 3, adj()],
    ['squall', 3, 3], ['warm front', 3, 3], ['whiteout', 3, 3], ['jet stream', 3, 3], ['wind chill', 3, 3], ['polar vortex', 3, 3], ['El Niño', 3, 3, { type: 'proper' }],
    ['sun shower', 3, 3], ['La Niña', 4, 4, { type: 'proper' }], ['dew point', 4, 4], ['heat index', 4, 4], ['microburst', 4, 4], ['ball lightning', 4, 4], ['petrichor', 4, 4],
    ['derecho', 5, 5], ['haboob', 5, 5], ['graupel', 5, 5],
  ],

  // ---------------------------------------------------------------- rocks and minerals
  rocks_and_minerals: [
    ['rock', 1, 1, { al: [['stone', 'synonym', 1, 1, [], { g: 'rock' }]] }], ['pebble', 1, 2], ['boulder', 1, 1], ['gravel', 1, 2], ['coal', 1, 3], ['crystal', 1, 2], ['fossil', 1, 3],
    ['granite', 2, 1], ['marble', 2, 1, { g: 'stone' }], ['limestone', 2, 1], ['sandstone', 2, 1], ['slate', 2, 1, { g: 'rock' }], ['quartz', 2, 1], ['chalk', 1, 2, { g: 'rock' }],
    ['sand', 1, 3, { g: 'sediment' }], ['clay', 1, 4, { g: 'soil' }], ['graphite', 2, 3, { al: [['plumbago', 'synonym', 5, 5]] }], ['sulfur', 2, 3, { al: [['sulphur', 'spelling', 2, 3, ['UK']]] }],
    ['rock salt', 2, 2, { al: [['halite', 'synonym', 4, 3]] }], ['ore', 2, 3], ['meteorite', 2, 3], ['pyrite', 3, 2, { al: [["fool's gold", 'synonym', 2, 2]] }],
    ['basalt', 3, 2], ['obsidian', 3, 2, { al: [['volcanic glass', 'synonym', 4, 4]] }], ['pumice', 3, 2, { al: [['pumice stone', 'synonym', 2, 2]] }], ['shale', 3, 3], ['flint', 3, 2],
    ['mica', 3, 3], ['gypsum', 3, 3], ['talc', 3, 3], ['malachite', 3, 3], ['geode', 3, 3], ['soapstone', 3, 3], ['igneous', 3, 3, adj({ g: 'rock' })],
    ['metamorphic', 3, 3, adj({ g: 'rock' })], ['sedimentary', 3, 3, adj({ g: 'rock' })], ['feldspar', 4, 3], ['calcite', 4, 3], ['fluorite', 4, 3], ['magnetite', 4, 3], ['hematite', 4, 3],
    ['gneiss', 4, 3], ['schist', 4, 3], ['quartzite', 4, 4], ['dolomite', 4, 4], ['conglomerate', 4, 4], ['travertine', 4, 4], ['bauxite', 4, 4], ['galena', 4, 4], ['cinnabar', 4, 4],
    ['corundum', 4, 4], ['serpentine', 4, 4, { g: 'mineral' }], ['mudstone', 4, 4], ['lodestone', 4, 3, { al: [['loadstone', 'spelling', 5, 5]] }],
    ['azurite', 5, 4], ['olivine', 5, 4], ['breccia', 5, 5], ['tuff', 5, 4], ['chert', 5, 4], ['diorite', 5, 4], ['gabbro', 5, 5], ['rhyolite', 5, 5], ['andesite', 5, 5], ['siltstone', 5, 5],
  ],
};

export const ALIASES = [];

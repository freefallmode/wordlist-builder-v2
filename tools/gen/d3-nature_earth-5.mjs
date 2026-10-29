// Generated word data: Nature & Earth > habitats > antarctic coast and the environment themes (pollution ... green living).
// Format is described in tools/apply-words.mjs.
export const THEMES = {
  antarctic_coast: { d: 3 }, pollution_words: { d: 2 }, recycling_words: { d: 1 }, renewable_energy: { d: 2 }, conservation_words: { d: 3 },
  climate_words: { d: 3 }, endangered_animals: { d: 2 }, fossil_fuels: { d: 2 }, green_living_words: { d: 2 },
};

export const FIXES = [
  { gloss: ['Coke', 'drinks', 'drink'] }, { gloss: ['COP', 'jobs', 'police'] },
];

export const DATA = {
  antarctic_coast: [
    ['penguin', 1, 1], ['iceberg', 1, 1], ['seal', 1, 2, { g: 'animal' }], ['krill', 3, 2], ['ice shelf', 3, 2], ['research station', 2, 2], ['skua', 4, 2],
    ['emperor penguin', 2, 1], ['Adelie penguin', 4, 2], ['leopard seal', 3, 2], ['Weddell seal', 4, 3], ['elephant seal', 2, 3],
    ['glacier', 2, 3], ['pack ice', 3, 2], ['sea ice', 2, 3], ['Antarctica', 1, 2, { type: 'place' }], ['Ross Sea', 4, 3, { type: 'place' }], ['McMurdo Station', 4, 3, { type: 'place' }],
    ['fur seal', 3, 3], ['snow petrel', 5, 3], ['chinstrap penguin', 4, 2], ['crabeater seal', 5, 3], ['fast ice', 5, 4], ['polynya', 5, 5], ['colony', 2, 4, { g: 'animals' }],
    ['rookery', 4, 3], ['blizzard', 2, 4], ['tabular iceberg', 5, 4], ['sheathbill', 5, 4], ['orca', 2, 3], ['Southern Ocean', 3, 3, { type: 'place' }],
    ['brash ice', 5, 4], ['calving', 4, 4, { pos: 'verb' }],
  ],
  pollution_words: [
    ['smog', 2, 1], ['oil spill', 2, 1], ['litter', 1, 1], ['exhaust fumes', 2, 2], ['acid rain', 2, 1], ['sewage', 2, 2], ['toxic waste', 2, 1], ['pollutant', 2, 1],
    ['emissions', 2, 2], ['microplastics', 3, 2], ['runoff', 3, 2], ['smoke', 1, 3], ['contamination', 3, 2], ['noise pollution', 2, 1], ['light pollution', 2, 1],
    ['soot', 2, 3], ['particulates', 4, 2], ['carbon monoxide', 3, 3], ['effluent', 4, 2], ['fly-tipping', 4, 2, { reg: ['UK'], al: [['dumping', 'synonym', 2, 3]] }],
    ['air quality', 2, 2], ['nitrogen dioxide', 4, 3], ['eutrophication', 5, 3], ['slick', 3, 3], ['fallout', 3, 4], ['pesticide', 3, 3], ['landfill', 2, 3], ['haze', 2, 4],
    ['greywater', 5, 4], ['dioxin', 5, 4], ['PCB', 5, 4, { type: 'acronym', g: 'pollutant' }], ['smokestack', 3, 3], ['particulate matter', 4, 3],
  ],
  recycling_words: [
    ['recycle', 1, 1, { pos: 'verb' }], ['recycling bin', 1, 1], ['compost', 2, 2], ['reuse', 2, 1, { pos: 'verb' }], ['reduce', 2, 3, { pos: 'verb', g: 'waste' }], ['sort', 1, 4, { pos: 'verb' }],
    ['bottle bank', 2, 2, { reg: ['UK'] }], ['landfill', 2, 3], ['aluminum can', 1, 2, { al: [['aluminium can', 'spelling', 2, 2, ['UK']]] }], ['glass jar', 1, 3],
    ['cardboard', 1, 3], ['newspaper', 1, 4], ['plastic bottle', 1, 2], ['deposit scheme', 3, 2], ['curbside collection', 3, 2, { al: [['kerbside collection', 'spelling', 3, 2, ['UK']]] }],
    ['scrap metal', 2, 2], ['recycling plant', 2, 1], ['upcycle', 3, 2, { pos: 'verb' }], ['repurpose', 3, 2, { pos: 'verb' }], ['pulp', 3, 4], ['bale', 3, 4, { g: 'bundle' }],
    ['downcycle', 5, 3, { pos: 'verb' }], ['closed loop', 4, 3], ['MRF', 5, 3, { type: 'acronym', g: 'recycling' }],
    ['rinse', 1, 5, { pos: 'verb' }], ['refillable', 3, 3], ['reclaimed', 3, 4], ['salvage', 3, 3], ['recyclable', 2, 1], ['single stream', 4, 3],
    ['feedstock', 5, 4], ['reprocess', 4, 3, { pos: 'verb' }],
  ],
  renewable_energy: [
    ['solar power', 1, 1], ['wind turbine', 1, 1], ['hydropower', 2, 1, { al: [['hydroelectric power', 'synonym', 2, 1]] }], ['geothermal', 3, 2], ['biomass', 3, 2], ['tidal power', 2, 1],
    ['wind farm', 1, 1], ['solar panel', 1, 1], ['biofuel', 3, 2], ['wave energy', 3, 1], ['dam', 1, 3], ['photovoltaic', 4, 2, { al: [['PV', 'acronym', 4, 4]] }],
    ['solar farm', 2, 1], ['offshore wind', 3, 1], ['hydrogen', 2, 4], ['ethanol', 3, 4], ['biogas', 3, 2], ['heat pump', 3, 3], ['battery storage', 3, 3],
    ['solar cell', 2, 2], ['rotor blade', 3, 3], ['tidal barrage', 4, 3], ['concentrated solar', 5, 3], ['run-of-river', 5, 3], ['wave buoy', 5, 3],
    ['net metering', 5, 4], ['feed-in tariff', 5, 4], ['windmill', 1, 3], ['green hydrogen', 4, 2],
    ['biodiesel', 4, 3], ['geothermal well', 5, 3],
  ],
  conservation_words: [
    ['conservation', 2, 1], ['wildlife reserve', 2, 1], ['national park', 1, 1], ['protected area', 3, 1], ['habitat', 2, 1], ['biodiversity', 3, 1], ['sanctuary', 2, 2],
    ['rewilding', 3, 2], ['reforestation', 3, 2], ['poaching', 3, 2], ['ranger', 2, 2], ['nature reserve', 2, 1], ['captive breeding', 3, 2], ['wildlife corridor', 4, 2],
    ['marine park', 3, 2], ['endangered species', 2, 1], ['extinction', 2, 2], ['ecosystem', 2, 2], ['restoration', 3, 3, { g: 'habitat' }], ['stewardship', 4, 3], ['seed bank', 4, 2],
    ['wetland', 3, 3], ['rainforest', 1, 3], ['anti-poaching', 4, 2], ['biosphere reserve', 5, 3], ['Ramsar site', 5, 3, { type: 'proper' }], ['IUCN', 4, 3, { type: 'acronym' }],
    ['WWF', 3, 3, { type: 'acronym' }], ['Red List', 4, 3, { type: 'proper' }], ['green belt', 3, 3], ['invasive species', 3, 3], ['culling', 3, 4], ['reintroduction', 4, 2],
    ['sustainable', 2, 3], ['gene bank', 5, 3], ['buffer zone', 4, 3], ['SSSI', 5, 4, { type: 'acronym', reg: ['UK'] }],
  ],
  climate_words: [
    ['global warming', 1, 1], ['climate change', 1, 1], ['greenhouse effect', 2, 1], ['carbon footprint', 2, 1], ['sea level rise', 3, 1], ['drought', 2, 2], ['heatwave', 2, 2],
    ['carbon dioxide', 2, 2], ['greenhouse gas', 2, 1], ['ice cap', 2, 2], ['melting glacier', 3, 2], ['permafrost', 3, 2], ['methane', 3, 2], ['carbon neutral', 3, 2],
    ['net zero', 3, 1], ['Paris Agreement', 3, 2, { type: 'proper' }], ['IPCC', 4, 3, { type: 'acronym' }], ['El Nino', 3, 3, { type: 'proper' }], ['La Nina', 4, 3, { type: 'proper' }],
    ['tipping point', 3, 3], ['carbon offset', 3, 2], ['carbon tax', 3, 2], ['climate refugee', 3, 2], ['wildfire', 2, 3], ['flooding', 2, 3], ['deforestation', 2, 3],
    ['albedo', 5, 3], ['radiative forcing', 5, 3], ['ocean acidification', 4, 2], ['coral bleaching', 3, 2], ['Keeling Curve', 5, 4, { type: 'proper' }], ['anomaly', 4, 4],
    ['emissions target', 3, 2], ['decarbonize', 4, 2, { pos: 'verb', al: [['decarbonise', 'spelling', 4, 2, ['UK']]] }],
    ['COP', 4, 3, { type: 'acronym', g: 'climate summit' }], ['Kyoto Protocol', 3, 3, { type: 'proper' }], ['mitigation', 4, 3], ['adaptation', 4, 4],
  ],
  endangered_animals: [
    ['giant panda', 1, 1], ['tiger', 1, 2], ['black rhino', 2, 1], ['mountain gorilla', 2, 1], ['blue whale', 1, 2], ['orangutan', 2, 1], ['snow leopard', 2, 1],
    ['sea turtle', 2, 2], ['African elephant', 1, 2], ['polar bear', 1, 2], ['pangolin', 3, 1], ['vaquita', 4, 1], ['Amur leopard', 4, 1], ['Sumatran rhino', 4, 1],
    ['kakapo', 4, 1], ['California condor', 3, 1], ['saola', 5, 1], ['axolotl', 3, 2], ['hawksbill turtle', 4, 2], ['Javan rhino', 4, 1], ['chimpanzee', 1, 3],
    ['cheetah', 1, 3], ['bonobo', 3, 2], ['red panda', 2, 2], ['Iberian lynx', 4, 1], ['Asiatic lion', 4, 2], ['whooping crane', 4, 2], ['northern white rhino', 4, 1],
    ['Siberian tiger', 3, 2], ['Hawaiian monk seal', 5, 2], ['Philippine eagle', 4, 2], ['Cross River gorilla', 5, 2],
    ['loggerhead turtle', 4, 3], ['bluefin tuna', 3, 4], ['takin', 5, 4],
  ],
  fossil_fuels: [
    ['coal', 1, 1], ['oil', 1, 1, { g: 'fuel' }], ['natural gas', 2, 1], ['peat', 3, 2], ['lignite', 4, 2], ['anthracite', 4, 2], ['petroleum', 2, 1], ['tar sands', 4, 2],
    ['crude oil', 2, 1], ['petrol', 1, 2, { reg: ['UK'], al: [['gasoline', 'synonym', 2, 2, ['US']]] }],
    ['diesel', 1, 2, { g: 'fuel' }], ['kerosene', 3, 2], ['bituminous coal', 5, 2], ['shale gas', 3, 2], ['fracking', 3, 2], ['oil rig', 1, 2], ['oil well', 1, 2], ['coal mine', 1, 2],
    ['drilling', 2, 3], ['refinery', 2, 2], ['pipeline', 2, 3], ['propane', 3, 3], ['butane', 3, 3], ['LNG', 4, 2, { type: 'acronym' }], ['natural gas liquids', 5, 3],
    ['coke', 3, 3, { g: 'fuel' }], ['coal seam', 4, 3], ['oil shale', 4, 2], ['brent crude', 4, 3], ['bitumen', 4, 3], ['methane hydrate', 5, 3],
    ['heating oil', 3, 2], ['jet fuel', 2, 2], ['charcoal', 2, 4, { g: 'fuel' }], ['wellhead', 5, 3],
  ],
  green_living_words: [
    ['composting', 2, 1], ['upcycling', 3, 1], ['carpooling', 3, 1], ['reusable', 2, 1], ['refill', 2, 2], ['solar panel', 1, 2], ['rewilding', 3, 3],
    ['reusable bag', 1, 1], ['cycling', 1, 3], ['public transport', 1, 3], ['LED bulb', 2, 2], ['secondhand', 2, 2], ['thrift', 3, 3],
    ['water butt', 4, 2, { reg: ['UK'], al: [['rain barrel', 'synonym', 3, 2, ['US']]] }], ['vegetable garden', 1, 3], ['insulation', 2, 3], ['draught excluder', 3, 3, { reg: ['UK'] }],
    ['electric car', 1, 2], ['bamboo toothbrush', 3, 1], ['reusable cup', 2, 1], ['beeswax wrap', 4, 1], ['zero waste', 3, 1], ['minimalism', 3, 4], ['clothes swap', 3, 2],
    ['energy saving', 2, 2], ['wormery', 5, 2, { reg: ['UK'] }], ['bokashi', 5, 3], ['low flush', 4, 3], ['smart meter', 3, 4], ['farmers market', 2, 3, { al: [["farmers' market", 'spelling', 2, 3]] }],
    ['car share', 2, 2, { al: [['ride share', 'synonym', 2, 3]] }], ['repair cafe', 4, 2], ['plastic-free', 3, 1], ['refillery', 5, 2], ['clothesline', 2, 3, { al: [['washing line', 'synonym', 2, 3, ['UK']]] }],
  ],
};

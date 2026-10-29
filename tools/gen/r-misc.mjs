// Repair batch (misc): seed words skipped by the old clash rule, added as their own labelled entries.
export const FIXES = [
  { gloss: ['Chihuahua', 'dog_breeds', 'dog'] },
  { gloss: ['Cayenne', 'chili_peppers', 'pepper'] },
  { gloss: ['Savannah', 'landscapes', 'grassland'] },
  { gloss: ['Tyre', 'cars', 'wheel'] },
  { split: ['kingdom', 'fantasy', 'realm'] },
  { gloss: ['kingdom', 'taxonomic_ranks', 'taxonomy'] },
  { gloss: ['weight', 'measurement', 'measure'] },
  { gloss: ['replication', 'scientific_method', 'experiment'] },
  { gloss: ['ABS', 'muscles', 'abdominals'] },
  { gloss: ['buttress', 'architecture', 'building'] },
  { gloss: ['plantain', 'fruits', 'fruit'] },
  { gloss: ['hip', 'torso', 'body part'] },
];

const city = { type: 'place' };
export const DATA = {
  // places_geography
  mexican_cities: [['Chihuahua', 3, 3, { g: 'city', ...city }]],
  south_american_cities: [['Cayenne', 4, 4, { g: 'city', ...city }]],
  american_cities: [['Savannah', 3, 2, { g: 'city', ...city }]],
  ancient_cities: [['Tyre', 4, 3, { g: 'city', ...city }]],
  middle_eastern_cities: [['Tyre', 4, 3, { g: 'city', ...city }]],
  port_cities: [['Tyre', 4, 3, { g: 'city', ...city }], ['Savannah', 3, 3, { g: 'city', ...city }], ['Cayenne', 4, 4, { g: 'city', ...city }]],
  // science_tech
  biology_words: [['kingdom', 2, 3, { g: 'taxonomy' }]],
  physics_words: [['weight', 1, 2, { g: 'force' }]],
  forces: [['weight', 1, 2, { g: 'force' }]],
  genetics_words: [['replication', 3, 2, { g: 'DNA' }]],
  plastics: [['ABS', 3, 4, { g: 'plastic', type: 'acronym' }]],
  // nature_earth
  mountain_features: [
    ['saddle', 3, 3, { g: 'mountain' }],
    ['buttress', 4, 4, { g: 'mountain' }],
  ],
  river_features: [['mouth', 1, 2, { g: 'river' }]],
  tree_parts: [['buttress root', 4, 3, { g: 'tree' }]],
  rainforest: [['buttress root', 4, 4, { g: 'tree' }]],
  weeds: [['plantain', 3, 3, { g: 'weed' }]],
  medicinal_plants: [['plantain', 3, 3, { g: 'weed' }]],
  // home_everyday
  roof_parts: [['hip', 3, 3, { g: 'roof' }]],
  cleaning_appliances: [['iron', 1, 1, { g: 'appliance' }]],
  laundry_words: [['iron', 1, 1, { g: 'appliance' }]],
  appliances: [['iron', 1, 1, { g: 'appliance' }]],
  small_appliances: [['iron', 1, 1, { g: 'appliance' }]],
  building_materials: [['iron', 1, 3, { g: 'metal' }], ['rebar', 3, 3, { g: 'steel bar' }]],
  construction_site: [['rebar', 3, 3, { g: 'steel bar' }]],
};

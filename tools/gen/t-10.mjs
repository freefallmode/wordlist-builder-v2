// Top-up batch 10: survival skills ... workout types.
const pl = { type: 'place' }, pr = { type: 'proper' }, car = { type: 'proper', tm: true }, br = { type: 'org', tm: true };

export const THEMES = {};

export const DATA = {
  survival_skills: [
    ['celestial navigation', 4, 4], ['debris hut', 5, 5], ['cordage', 4, 4], ['transpiration bag', 5, 5], ['fatwood', 5, 5],
  ],
  hiking_gear: [
    ['bivy sack', 4, 4], ['ice axe', 3, 4], ['stuff sack', 4, 4], ['bear canister', 4, 4], ['headlamp', 2, 2], ['rucksack', 2, 2],
  ],
  outdoor_activities: [
    ['gorge walking', 4, 4], ['packrafting', 5, 5], ['rucking', 4, 4], ['fat biking', 4, 4], ['sandboarding', 3, 3], ['bushwalking', 3, 3, { reg: ['AU', 'UK'] }],
  ],
  famous_hiking_trails: [
    ['Dingle Way', 4, 4, pr], ['Kalalau Trail', 4, 4, pr], ['GR20', 5, 4, pr], ['Otter Trail', 5, 5, pr], ['Alpe-Adria Trail', 5, 5, pr],
    ['Alta Via 1', 5, 5, pr], ['Snowman Trek', 5, 5, pr],
  ],
  safari_words: [
    ['rondavel', 4, 4], ['marula', 4, 4], ['kudu', 3, 4], ['vlei', 5, 5], ['donga', 5, 5], ['sjambok', 5, 5],
  ],
  luggage: [
    ['gripsack', 5, 5], ['Pullman case', 4, 4, pr], ['attache case', 3, 4], ['sea bag', 4, 4], ['rucksack', 2, 2],
  ],
  things_to_pack: [
    ['sewing kit', 3, 4], ['lens cloth', 4, 4], ['microfiber towel', 3, 3], ['travel pillow', 2, 2], ['laundry detergent', 3, 3],
  ],
  toiletries: [
    ['tongue scraper', 4, 4], ['cuticle scissors', 4, 4], ['pumice stone', 3, 4], ['witch hazel', 4, 4], ['nail file', 1, 1], ['razor blades', 2, 2],
  ],
  beach_gear: [
    ['sand anchor', 5, 5], ['parasol', 3, 4], ['beach tent', 3, 3], ['beach towel', 1, 1], ['beach blanket', 2, 2], ['windsock', 4, 4],
  ],
  travel_accessories: [
    ['carabiner', 3, 4], ['cable organizer', 3, 4], ['laundry sheets', 5, 5], ['inflatable hanger', 5, 5], ['foot hammock', 5, 5],
    ['bag hook', 4, 4], ['sewing kit', 3, 4],
  ],
  beach_vacation: [
    ['riptide', 3, 4], ['driftwood', 3, 4, { g: 'beach' }], ['sandbar', 4, 4], ['beach hut', 2, 3], ['flip-flops', 1, 1],
  ],
  ski_trip: [
    ['tartiflette', 4, 5], ['raclette', 3, 4], ['snow chains', 3, 4], ['ski bum', 4, 4], ['glühwein', 4, 4],
  ],
  cruise_words: [
    ['aft', 3, 4], ['bilge', 4, 5, { g: 'ship' }], ['berth', 3, 4, { g: 'mooring' }], ['poop deck', 3, 4], ['mooring', 3, 4], ['gangway', 3, 3],
  ],
  beach_destinations: [
    ['Whitehaven Beach', 4, 4, pl], ['Navagio Beach', 5, 5, pl], ['Diani Beach', 5, 5, pl], ['Ko Lipe', 5, 5, pl], ['Sveti Stefan', 5, 5, pl],
    ['Zlatni Rat', 5, 5, pl],
  ],
  famous_ski_resorts: [
    ['Lake Placid', 3, 2, pl], ['Beaver Creek', 3, 3, pl], ['Heavenly', 4, 3, pl], ['Alpe d\'Huez', 4, 4, pl], ['Sestriere', 4, 4, pl],
    ['Zürs', 5, 5, pl], ['Alta', 4, 4, { type: 'place', g: 'ski resort' }],
  ],
  military_vehicles: [
    ['Merkava', 4, 4, pr], ['Leopard 2', 4, 4, pr], ['Challenger 2', 4, 4, pr], ['Stuka', 4, 4, pr], ['Marder', 5, 5, pr],
  ],
  delivery_vehicles: [
    ['dray', 4, 4], ['pedicab', 4, 4], ['trishaw', 5, 4], ['Piaggio Ape', 5, 5, car],
  ],
  electric_vehicles: [
    ['Rimac Nevera', 5, 5, car], ['Zeekr', 5, 5, br], ['NIO', 5, 5, br], ['VinFast', 5, 5, br], ['Sinclair C5', 4, 4, car],
    ['Renault Twizy', 4, 4, car], ['G-Wiz', 5, 5, car], ['electric bike', 1, 1],
  ],
  hormones: [
    ['angiotensin', 4, 4], ['adiponectin', 5, 5], ['inhibin', 5, 5], ['orexin', 5, 5], ['DHEA', 4, 4, { type: 'acronym' }], ['estradiol', 4, 4],
  ],
  touch_words: [
    ['mechanoreceptor', 5, 5], ['paresthesia', 5, 4], ['somatosensory', 5, 4], ['goosebumps', 1, 2], ['pins and needles', 2, 3, { type: 'phrase' }],
  ],
  common_illnesses: [
    ['lumbago', 5, 5], ['quinsy', 5, 5], ['cystitis', 4, 4], ['gastritis', 4, 4], ['dyspepsia', 5, 5],
  ],
  childhood_illnesses: [
    ['molluscum', 5, 5], ['Reye\'s syndrome', 5, 5, pr], ['tinea capitis', 5, 5], ['pinworm', 3, 4],
  ],
  injuries: [
    ['turf toe', 4, 4], ['Colles fracture', 5, 5, pr], ['boxer\'s fracture', 5, 5], ['mallet finger', 5, 5], ['golfer\'s elbow', 3, 4], ['stress fracture', 3, 3],
  ],
  maternity_ward: [
    ['meconium', 4, 4], ['colostrum', 4, 4], ['vernix', 5, 5], ['lochia', 5, 5], ['heel prick', 4, 4], ['birth plan', 3, 3, { type: 'phrase' }],
  ],
  workout_types: [
    ['isometrics', 4, 4], ['Tae Bo', 4, 4, { type: 'proper', tm: true }], ['animal flow', 5, 5], ['Nordic walking', 4, 4], ['Bikram yoga', 4, 4],
    ['rucking', 4, 4], ['kettlebell training', 3, 3],
  ],
};

export const ALIASES = [
  ['childhood_illnesses', 'whooping cough', '', [['pertussis', 'synonym', 5, 4]]],
];

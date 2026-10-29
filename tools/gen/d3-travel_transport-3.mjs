// Depth-3 batch: Travel & Transport 3 (accommodation, campsite, outdoors, packing, vacations).
const verb = (o = {}) => ({ pos: 'verb', ...o });
const org = (o = {}) => ({ type: 'org', tm: true, ...o });
const place = (o = {}) => ({ type: 'place', ...o });
const prop = (o = {}) => ({ type: 'proper', ...o });
const ph = (o = {}) => ({ type: 'phrase', ...o });
const person = (o = {}) => ({ ...o });

export const THEMES = {
  road_trip_games: { d: 2 }, hotel: { d: 1 }, hotel_staff: { d: 2 }, room_types: { d: 3 }, vacation_homes: { d: 2 },
  famous_hotels: { d: 4, tm: true }, hotel_chains: { d: 3, tm: true }, traditional_lodgings: { d: 5 },
  camping_gear: { d: 1 }, tent_parts: { d: 3 }, tent_types: { d: 4 }, campfire_foods: { d: 2 }, survival_skills: { d: 3 }, rvs_and_campers: { d: 3 },
  hiking_gear: { d: 2 }, trail_words: { d: 3 }, outdoor_activities: { d: 1 }, famous_hiking_trails: { d: 5 }, climbing_gear: { d: 4 }, safari_words: { d: 3 },
  luggage: { d: 1 }, things_to_pack: { d: 1 }, travel_documents: { d: 2 }, toiletries: { d: 1 }, beach_gear: { d: 1 }, souvenirs: { d: 2 },
  travel_accessories: { d: 3 }, beach_vacation: { d: 1 }, ski_trip: { d: 2 }, cruise_words: { d: 3 },
};

export const FIXES = [
  { gloss: ['twin', 'family_and_friends', 'sibling'] },
  { gloss: ['Ibis', 'birds', 'bird'] },
  { gloss: ['canvas', 'art', 'painting surface'] },
  { gloss: ['dome', 'architecture', 'building'] },
  { gloss: ['bladder', 'inside_the_body', 'organ'] },
  { gloss: ['saddle', 'horses', 'horse gear'] },
  { gloss: ['anchor', 'boats_and_ships', 'ship'] },
  { gloss: ['bush', 'plants', 'plant'] },
  { gloss: ['cabin', 'accommodation', 'building'] },
];

export const DATA = {
  // ---------------------------------------------------------------- road trip games
  road_trip_games: [
    ['I Spy', 1, 1, prop()], ['twenty questions', 2, 1, ph()], ['license plate game', 3, 1, ph({ reg: ['US'], al: [['number plate game', 'spelling', 3, 2, ['UK']]] })],
    ['alphabet game', 2, 1, ph()], ['road trip bingo', 3, 1, ph({ al: [['car bingo', 'synonym', 3, 2]] })], ['would you rather', 2, 2, ph()],
    ['the quiet game', 3, 2, ph()], ['punch buggy', 3, 2, ph({ reg: ['US'], al: [['slug bug', 'synonym', 4, 3, ['US']]] })],
    ['padiddle', 5, 3, { reg: ['US'] }], ['yellow car', 3, 3, ph()], ['name that tune', 2, 3, ph({ tm: true })], ['geography game', 3, 3, ph()],
    ['car karaoke', 3, 2, ph()], ['story chain', 4, 3, ph()], ['count the cows', 3, 2, ph()], ['animal alphabet', 4, 3, ph()],
    ['hangman', 2, 3], ['car tag', 4, 3, ph()], ['rock paper scissors', 2, 3, ph()], ['sing-along', 3, 3, ph({ g: 'car game' })],
    ['trivia', 2, 3, { g: 'quiz' }], ['word association', 3, 3, ph()], ['guess the song', 3, 2, ph()], 
    ['cows and cemeteries', 5, 5, ph()], ['ninety-nine bottles', 4, 4, ph()],
  ],

  // ---------------------------------------------------------------- hotel
  hotel: [
    ['lobby', 1, 1, { g: 'building' }], ['reception', 1, 1, { al: [['front desk', 'synonym', 2, 1]] }], ['elevator', 1, 2, { al: [['lift', 'synonym', 1, 2, ['UK']]] }],
    ['room key', 1, 1, ph()], ['minibar', 2, 1], ['bellhop', 3, 2], ['room service', 1, 1, ph()], ['check-in', 2, 1],
    ['check-out', 2, 1, { g: 'hotel' }], ['do not disturb', 2, 1, ph()], ['continental breakfast', 2, 1, ph()], ['bellboy', 3, 2],
    ['swimming pool', 1, 2, ph()], ['gym', 1, 3], ['spa', 1, 2, { g: 'hotel' }], ['safe', 2, 3, { g: 'room safe' }],
    ['turndown service', 3, 2, ph()], ['housekeeping', 2, 1], ['wake-up call', 2, 1, ph()], ['minibar fridge', 3, 2, ph()], ['hotel bar', 2, 2, ph()],
    ['key card', 2, 1, ph()], ['luggage cart', 3, 2, ph()], ['bed and breakfast', 2, 3, ph()], ['room number', 2, 2, ph()], ['atrium', 3, 3, { g: 'building' }],
    ['porte-cochere', 5, 5, { g: 'hotel entrance' }], ['rooftop terrace', 3, 3, ph()], ['bridal suite', 3, 3, ph()], ['bar tab', 3, 4, ph()],
    ['late checkout', 3, 2, ph()], ['concierge desk', 3, 2, ph()], ['night audit', 5, 5, ph()], ['overbooking', 3, 3],
  ],

  // ---------------------------------------------------------------- hotel staff
  hotel_staff: [
    ['receptionist', 1, 1, person()], ['concierge', 2, 1, person()], ['bellhop', 3, 1, person()], ['porter', 2, 2, person()], ['doorman', 2, 1, person()],
    ['maid', 1, 2, person({ g: 'hotel' })], ['housekeeper', 2, 1, person()], ['chambermaid', 3, 2, person()], ['room attendant', 3, 2, person()],
    ['valet', 2, 2, person({ g: 'parking' })], ['bellboy', 3, 1, person()], ['hotel manager', 2, 1, person()], ['general manager', 3, 3, person()],
    ['bartender', 1, 3, person({ g: 'hotel' })], ['waiter', 1, 3, person()], ['chef', 1, 4, person()], ['night porter', 3, 2, person()],
    ['lifeguard', 1, 4, person()], ['maintenance man', 3, 3, person()], ['front desk clerk', 3, 2, person()], ['night auditor', 5, 4, person()],
    ['sommelier', 3, 4, person({ g: 'hotel' })], ['events coordinator', 4, 4, person()], ['laundry attendant', 4, 3, person()], ['bell captain', 4, 3, person()],
    ['guest relations', 4, 4, person()], ['head housekeeper', 4, 3, person()], ['pool attendant', 3, 3, person()], ['reservations agent', 4, 3, person()],
    ['butler', 2, 3, person({ g: 'hotel' })], ['maître d\'', 4, 4, person()],
  ],

  // ---------------------------------------------------------------- room types
  room_types: [
    ['single', 1, 1, { g: 'room' }], ['double', 1, 1, { g: 'room' }], ['twin', 2, 1, { g: 'room' }], ['suite', 2, 1], ['family room', 1, 1, ph()],
    ['penthouse', 2, 2], ['deluxe room', 2, 1, ph()], ['standard room', 2, 1, ph()], ['junior suite', 3, 1, ph()], ['presidential suite', 3, 2, ph()],
    ['honeymoon suite', 3, 2, ph()], ['ocean view', 2, 2, ph()], ['connecting rooms', 3, 2, ph()], ['executive suite', 3, 2, ph()], ['studio', 2, 3, { g: 'hotel room' }],
    ['king room', 3, 2, ph()], ['queen room', 3, 2, ph()], ['accessible room', 3, 2, ph()], ['dormitory', 3, 3], ['bunk room', 3, 3, ph()],
    ['en suite', 3, 3, { g: 'room with bathroom' }], ['cabana room', 4, 4, ph()], ['loft suite', 4, 3, ph()], ['garden room', 3, 3, ph()], ['smoking room', 2, 2, ph()],
    ['standard double', 3, 2, ph()], ['triple room', 4, 3, ph()], ['quad room', 4, 3, ph()], ['bridal suite', 3, 3, ph()], ['poolside villa', 4, 4, ph()],
    ['pied-à-terre', 5, 5, { g: 'small second home' }], ['villa suite', 4, 4, ph()],
  ],

  // ---------------------------------------------------------------- vacation homes
  vacation_homes: [
    ['cabin', 1, 1, { g: 'building' }], ['cottage', 1, 1], ['villa', 2, 1], ['chalet', 2, 1], ['bungalow', 2, 2], ['condo', 2, 2, { al: [['condominium', 'synonym', 3, 3]] }],
    ['timeshare', 3, 2], ['beach house', 1, 1, ph()], ['lake house', 2, 1, ph()], ['holiday home', 1, 1, ph({ reg: ['UK'] })], ['holiday cottage', 2, 1, ph({ reg: ['UK'] })],
    ['log cabin', 2, 1, ph()], ['summer house', 2, 2, ph()], ['second home', 2, 2, ph()], ['cottage rental', 3, 2, ph()], ['mountain lodge', 3, 2, ph()],
    ['apartment', 1, 3], ['houseboat', 2, 3], ['treehouse', 2, 3, { g: 'vacation home' }], ['yurt', 3, 3],
    ['farmhouse', 2, 3, { g: 'holiday let' }], ['hunting lodge', 3, 3, ph()], ['holiday let', 3, 2, ph({ reg: ['UK'] })], ['vacation rental', 2, 1, ph()],
    ['finca', 4, 3, { g: 'Spanish country house' }], ['chateau', 3, 4], ['holiday park', 3, 3, ph({ reg: ['UK'] })], ['caravan', 2, 4, { g: 'holiday home' }],
    ['bothy', 5, 5, { reg: ['UK'] }], ['dacha', 4, 3], ['cabana', 3, 4], ['beach hut', 2, 2, ph({ reg: ['UK'] })],
  ],

  // ---------------------------------------------------------------- famous hotels
  famous_hotels: [
    ['Ritz', 2, 1, org({ g: 'hotel' })], ['Savoy', 3, 1, org({ g: 'hotel' })], ['Plaza', 2, 1, org({ g: 'hotel' })], ['Waldorf Astoria', 3, 1, org()],
    ['Burj Al Arab', 3, 1, org()], ['Raffles', 3, 2, org({ g: 'hotel' })], ['Pera Palace', 5, 4, org()], ['The Dorchester', 3, 2, org()],
    ['Claridge\'s', 3, 2, org()], ['Chateau Marmont', 4, 3, org()], ['Chelsea Hotel', 3, 2, org()], ['The Peninsula', 3, 3, org()],
    ['Bellagio', 2, 2, org({ g: 'hotel' })], ['Caesars Palace', 2, 2, org()], ['Venetian', 3, 3, org({ g: 'hotel' })], ['Mandalay Bay', 3, 3, org()],
    ['The Langham', 4, 3, org()], ['Adlon', 4, 3, org({ g: 'hotel' })], ['Gritti Palace', 5, 4, org()], ['Hotel de Paris', 4, 3, org()],
    ['The Shelbourne', 5, 4, org()], ['Grand Budapest Hotel', 3, 3, prop({ tm: true, g: 'film hotel' })], ['Overlook Hotel', 3, 3, prop({ tm: true, g: 'film hotel' })],
    ['Fairmont Banff Springs', 4, 3, org()], ['The Algonquin', 4, 4, org()], ['Hotel del Coronado', 4, 3, org()], ['Hotel California', 2, 4, prop({ tm: true, g: 'song' })],
    ['Hotel Chelsea', 4, 3, org()], ['The Carlyle', 4, 4, org()], ['Hotel Danieli', 5, 5, org()], ['La Mamounia', 5, 4, org()], ['Taj Mahal Palace', 4, 3, org()],
    ['Hotel Metropol', 5, 5, org()], ['The Greenbrier', 5, 5, org()], ['The Breakers', 4, 4, org({ g: 'hotel' })],
  ],

  // ---------------------------------------------------------------- hotel chains
  hotel_chains: [
    ['Hilton', 1, 1, org({ g: 'hotel' })], ['Marriott', 2, 1, org()], ['Hyatt', 2, 1, org()], ['Sheraton', 2, 1, org()], ['Holiday Inn', 1, 1, org()],
    ['Ibis', 3, 2, org({ g: 'hotel' })], ['Radisson', 3, 1, org()], ['Best Western', 2, 1, org()], ['Travelodge', 3, 1, org({ reg: ['UK'] })], ['Premier Inn', 3, 1, org({ reg: ['UK'] })],
    ['Motel 6', 2, 1, org()], ['Days Inn', 3, 1, org()], ['Comfort Inn', 3, 1, org()], ['Super 8', 3, 1, org()], ['Four Seasons', 2, 1, org()],
    ['Ramada', 3, 2, org()], ['Novotel', 3, 2, org()], ['Fairmont', 3, 2, org()], ['Westin', 3, 1, org()], ['Hampton Inn', 3, 1, org()], ['Embassy Suites', 3, 1, org()],
    ['Crowne Plaza', 3, 1, org()], ['Mandarin Oriental', 3, 2, org()], ['Intercontinental', 3, 1, org()], ['Wyndham', 3, 1, org()], ['Kimpton', 4, 2, org()],
    ['Accor', 4, 3, org()], ['Hostelworld', 3, 4, org({ g: 'booking site' })], ['Motel One', 4, 2, org()], ['Jurys Inn', 4, 2, org({ reg: ['UK'] })],
    ['Holiday Inn Express', 3, 1, org()], ['Courtyard by Marriott', 3, 3, org()], ['Aman', 4, 3, org({ g: 'hotel' })], ['Banyan Tree', 4, 3, org()],
    ['Shangri-La', 3, 2, org({ g: 'hotel' })], ['Sofitel', 4, 2, org()], ['Mercure', 4, 2, org()], ['La Quinta', 3, 2, org()],
  ],

  // ---------------------------------------------------------------- traditional lodgings
  traditional_lodgings: [
    ['ryokan', 4, 2], ['riad', 4, 2], ['caravanserai', 5, 3], ['pousada', 4, 3], ['parador', 4, 3], ['ger', 4, 2], ['longhouse', 3, 3],
    ['yurt', 3, 2], ['hostel', 2, 4], ['guesthouse', 2, 4], ['inn', 2, 4], ['tavern', 2, 5, { g: 'inn' }], ['posada', 4, 3],
    ['minshuku', 5, 3], ['homestay', 3, 3], ['pension', 3, 4, { g: 'guesthouse' }], ['gîte', 4, 3], ['agriturismo', 4, 3], ['hacienda', 3, 3],
    ['dak bungalow', 5, 4, ph({ reg: ['IN'] })], ['haveli', 5, 3, { g: 'mansion' }],
    ['tulou', 5, 4], ['igloo', 1, 4], ['wigwam', 3, 3], ['tipi', 3, 3, { g: 'tent' }], ['hogan', 4, 3, { g: 'Navajo house' }],
    ['kasbah', 4, 3], ['roadhouse', 3, 4], ['coaching inn', 4, 3, ph()], 
    ['refuge', 4, 4, { g: 'mountain hut' }], ['rifugio', 5, 3], ['bothy', 5, 4, { reg: ['UK'] }], ['minka', 5, 4],
  ],

  // ---------------------------------------------------------------- camping gear
  camping_gear: [
    ['tent', 1, 1], ['sleeping bag', 1, 1, ph()], ['backpack', 1, 1], ['flashlight', 1, 1, { al: [['torch', 'synonym', 1, 1, ['UK']]] }], ['lantern', 2, 1],
    ['camp stove', 2, 1, ph()], ['cooler', 1, 2, { al: [['cool box', 'synonym', 2, 2, ['UK']]] }], ['sleeping mat', 2, 1, ph()], ['hammock', 1, 2], ['campfire', 1, 1],
    ['compass', 1, 2], ['canteen', 2, 2, { g: 'water bottle' }], ['water bottle', 1, 2, ph()], ['headlamp', 2, 1], ['mess tin', 3, 2, ph()], ['camp chair', 2, 1, ph()], ['tarp', 2, 1],
    ['pocket knife', 2, 2, ph()], ['matches', 1, 2, { g: 'fire' }], ['bug spray', 1, 2, ph({ reg: ['US'] })], ['mallet', 3, 2], ['air mattress', 2, 2, ph()],
    ['thermos', 2, 3, { tm: true }], ['camping table', 3, 1, ph()], ['stakes', 3, 2], ['guy rope', 3, 2, ph()], ['firelighter', 3, 2], ['bivouac sack', 5, 4, ph()],
    ['water filter', 3, 2, ph()], ['dry bag', 3, 3, ph()], ['gas canister', 3, 2, ph()], ['trangia', 5, 5, { tm: true }], ['billy can', 4, 4, ph({ reg: ['AU'] })],
    ['sporks', 4, 4, { g: 'cutlery' }], ['percolator', 4, 4], ['tinderbox', 4, 4],
  ],

  // ---------------------------------------------------------------- tent parts
  tent_parts: [
    ['pole', 1, 1, { g: 'tent' }], ['peg', 2, 1, { g: 'tent', al: [['stake', 'synonym', 2, 2, [], { g: 'tent' }]] }], ['guy line', 3, 1, ph({ al: [['guy rope', 'synonym', 3, 1]] })],
    ['zip', 1, 3], ['flysheet', 4, 2, { al: [['rainfly', 'synonym', 4, 2, ['US']]] }], ['groundsheet', 3, 2, { al: [['footprint', 'synonym', 4, 3, [], { g: 'tent' }]] }],
    ['door', 1, 3, { g: 'tent' }], ['vestibule', 4, 3], ['porch', 2, 3], ['inner tent', 3, 1, ph()], ['canvas', 2, 3, { g: 'fabric' }],
    ['ridge pole', 4, 2, ph()], ['vent', 2, 3, { g: 'tent' }], ['mesh window', 3, 2, ph()], ['seams', 3, 3], ['tent bag', 2, 1, ph()], ['hub', 4, 4, { g: 'tent poles' }],
    ['corner', 2, 4, { g: 'tent' }], ['tension strap', 4, 3, ph()], ['guy out point', 5, 4, ph()], ['gear loft', 4, 3, ph()], ['bathtub floor', 5, 4, ph()],
    ['tent peg', 2, 1, ph()], ['awning', 3, 3, { g: 'tent' }], ['storm flap', 4, 3, ph()], ['hoop', 3, 4, { g: 'tent pole' }],
    ['pole sleeve', 4, 3, ph()], ['clip', 2, 4, { g: 'tent' }], ['eyelet', 4, 4, { g: 'tent' }], ['grommet', 4, 4], ['apex', 3, 5, { g: 'tent' }], ['tent flap', 2, 2, ph()],
    ['pegging loop', 5, 5, ph()], ['peg bag', 3, 3, ph()],
  ],

  // ---------------------------------------------------------------- tent types
  tent_types: [
    ['dome', 2, 1, { g: 'tent' }], ['tipi', 3, 1, { g: 'tent' }], ['bell tent', 3, 1, ph()], ['tunnel tent', 3, 1, ph()], ['pup tent', 4, 2, ph()], ['A-frame', 3, 2, { g: 'tent' }],
    ['bivy', 4, 2], ['pop-up tent', 2, 1, ph()], ['cabin tent', 3, 1, ph()], ['ridge tent', 3, 1, ph()],
    ['geodesic tent', 4, 2, ph()], ['four-season tent', 4, 2, ph()], ['family tent', 2, 1, ph()], ['hammock tent', 4, 3, ph()], ['roof tent', 3, 2, ph()],
    ['wall tent', 4, 2, ph()], ['canvas tent', 3, 1, ph()], ['lean-to', 3, 3, { g: 'shelter' }], ['marquee', 2, 3, { reg: ['UK'] }], ['teepee', 3, 2, { g: 'tent' }],
    ['backpacking tent', 3, 1, ph()], ['instant tent', 3, 1, ph()], ['inflatable tent', 3, 1, ph()], ['tarp tent', 4, 2, ph()], ['yurt tent', 4, 3, ph()],
    ['safari tent', 3, 2, ph()], ['glamping tent', 3, 2, ph()], ['beach tent', 2, 2, ph()], ['hoop tent', 4, 3, ph()], ['pyramid tent', 4, 2, ph()], ['mess tent', 4, 3, ph()],
    ['tepee', 4, 3, { g: 'tent' }], ['shelter half', 5, 4, ph()], ['bothy bag', 5, 5, ph()],
  ],

  // ---------------------------------------------------------------- campfire foods
  campfire_foods: [
    ["s'mores", 2, 1], ['marshmallow', 1, 1], ['hot dog', 1, 1, ph()], ['baked beans', 1, 2, ph()], ['bacon', 1, 2], ['eggs', 1, 3, { g: 'camping' }],
    ['foil packet', 3, 1, ph()], ['hobo dinner', 4, 1, ph()], ['campfire stew', 3, 1, ph()], ['roasted corn', 2, 1, ph()], ['baked potato', 1, 2, ph()], ['sausages', 1, 2],
    ['trail mix', 2, 2, ph()], ['pancakes', 1, 3], ['chili', 2, 2, { g: 'dish' }], ['banana boat', 4, 1, ph({ g: 'dessert' })], ['dutch oven cobbler', 4, 2, ph()],
    ['damper', 4, 2, { g: 'bread', reg: ['AU'] }], ['bannock', 4, 3], ['kebabs', 2, 2], ['burgers', 1, 3], ['popcorn', 1, 2], ['apple crumble', 3, 3, ph()],
    ['jacket potatoes', 3, 3, ph({ reg: ['UK'] })], ['beans on toast', 3, 3, ph({ reg: ['UK'] })], ['hot chocolate', 1, 2, ph()], ['campfire coffee', 3, 1, ph()],
    ['pie iron sandwich', 5, 2, ph()], ['jerky', 3, 3], ['pudgy pie', 5, 3, ph()], ['cowboy beans', 4, 2, ph()], ['skillet breakfast', 4, 2, ph()],
    ['pot noodle', 3, 4, ph({ tm: true })], ['porridge', 2, 4, { g: 'camping' }], ['freeze-dried meal', 4, 3, ph()],
  ],

  // ---------------------------------------------------------------- survival skills
  survival_skills: [
    ['fire starting', 2, 1, ph()], ['navigation', 2, 2], ['first aid', 1, 1, ph()], ['shelter building', 3, 1, ph()], ['foraging', 3, 2], ['fishing', 1, 3],
    ['trapping', 3, 2], ['water purification', 3, 1, ph()], ['signaling', 3, 2, { al: [['signalling', 'spelling', 3, 2, ['UK']]] }], ['tracking', 3, 2], ['orienteering', 3, 2],
    ['knot tying', 2, 1, ph()], ['hunting', 2, 3], ['map reading', 2, 1, ph()], ['finding water', 2, 1, ph()], ['staying warm', 3, 2, ph()], ['rationing', 4, 3],
    ['tool making', 4, 2, ph()], ['bushcraft', 4, 1], ['wayfinding', 4, 2], ['whittling', 3, 3], ['rope making', 4, 3, ph()], ['snaring', 4, 2], ['cooking over fire', 3, 2, ph()],
    ['using a compass', 2, 1, ph()], ['reading the stars', 3, 3, ph()], ['signal fire', 3, 2, ph()], ['building a raft', 3, 3, ph()], ['hypothermia care', 4, 3, ph()],
    ['splinting', 4, 3], ['mountain rescue', 3, 4, ph()], ['dead reckoning', 5, 3, ph()], ['fire by friction', 5, 2, ph()], ['bow drill', 5, 2, ph()],
    ['ferro rod', 5, 3, ph()], ['solar still', 5, 3, ph()],
  ],

  // ---------------------------------------------------------------- rvs and campers
  rvs_and_campers: [
    ['RV', 2, 1, { type: 'acronym' }], ['motorhome', 2, 1], ['camper van', 2, 1, ph()], ['trailer', 2, 2, { g: 'camping' }], ['Airstream', 3, 1, prop({ tm: true })],
    ['fifth wheel', 4, 1, ph()], ['teardrop', 4, 1, { g: 'trailer' }], ['caravan', 2, 1, { g: 'towed home', reg: ['UK'] }], ['pop-up camper', 3, 1, ph()],
    ['Winnebago', 3, 1, prop({ tm: true })], ['class A', 4, 2, ph({ type: 'phrase' })], ['travel trailer', 3, 1, ph()], ['toy hauler', 4, 2, ph()],
    ['bus conversion', 4, 2, ph()], ['skoolie', 5, 2], ['overlander', 4, 2], ['van life', 3, 2, ph()], ['hitch', 3, 3, { g: 'trailer' }], ['towbar', 3, 3],
    ['slide-out', 4, 3, { g: 'RV' }], ['awning', 3, 4, { g: 'RV' }], ['hookup', 3, 3, { g: 'RV' }], ['dump station', 4, 3, ph()], ['VW camper', 3, 1, prop({ tm: true })],
    ['Westfalia', 4, 2, prop({ tm: true })], ['gooseneck', 5, 4, { g: 'trailer' }], ['cab-over', 5, 4, { g: 'camper' }], ['pickup camper', 4, 2, ph()],
    ['tiny house on wheels', 4, 3, ph()], ['Sprinter', 4, 3, prop({ tm: true, g: 'van' })], ['Vanagon', 5, 3, prop({ tm: true })], ['jackknife', 4, 5, { g: 'trailer' }],
  ],

  // ---------------------------------------------------------------- hiking gear
  hiking_gear: [
    ['hiking boots', 1, 1, ph()], ['backpack', 1, 1], ['trekking poles', 2, 1, ph()], ['water bottle', 1, 2, ph()], ['map', 1, 2], ['compass', 1, 2], ['rain jacket', 1, 1, ph()],
    ['hiking socks', 2, 1, ph()], ['trail mix', 2, 2, ph()], ['sunscreen', 1, 3], ['headlamp', 2, 1], ['first aid kit', 1, 1, ph()], ['whistle', 1, 3, { g: 'safety' }],
    ['hydration pack', 3, 1, ph()], ['GPS', 2, 2, { type: 'acronym' }], ['gaiters', 4, 2], ['daypack', 3, 1], ['sun hat', 1, 3, ph()], ['fleece', 2, 2],
    ['water filter', 3, 2, ph()], ['bear spray', 3, 3, ph()], ['crampons', 4, 3], ['insoles', 3, 3], ['trail shoes', 2, 1, ph()], ['walking stick', 1, 2, ph({ g: 'cane' })],
    ['pedometer', 3, 3], ['energy bar', 2, 2, ph()], ['moleskin', 4, 3, { g: 'blister' }], ['blister plaster', 3, 3, ph({ reg: ['UK'] })], ['base layer', 3, 2, ph()],
    ['softshell', 4, 2], ['hardshell', 4, 3], ['microspikes', 5, 3], ['bladder', 3, 4, { g: 'hydration' }], ['Gore-Tex', 3, 3, prop({ tm: true })], ['trail map', 2, 1, ph()],
    ['locator beacon', 5, 3, ph()],
  ],

  // ---------------------------------------------------------------- trail words
  trail_words: [
    ['trailhead', 3, 1], ['switchback', 4, 1], ['summit', 2, 2], ['cairn', 4, 1], ['ridge', 2, 3], ['scramble', 3, 3, { g: 'hiking' }], ['saddle', 3, 4, { g: 'mountain' }],
    ['waymarker', 4, 1], ['blaze', 4, 2, { g: 'trail marker' }], ['loop trail', 3, 1, ph()], ['out and back', 4, 1, ph()], ['elevation gain', 3, 1, ph()], ['junction', 2, 3, { g: 'trail' }],
    ['footpath', 2, 2], ['bridleway', 4, 2, { reg: ['UK'] }], ['boardwalk', 3, 3], ['stile', 4, 2, { reg: ['UK'] }], ['col', 5, 3, { g: 'mountain pass' }], ['pass', 2, 4, { g: 'mountain' }],
    ['ford', 3, 4, { g: 'river crossing' }], ['singletrack', 4, 2], ['fire road', 4, 3, ph()], ['overlook', 3, 3], ['vista', 3, 3], ['peak bagging', 4, 2, ph()],
    ['through-hike', 4, 1, ph()], ['thru-hiker', 4, 1, { type: 'common' }], ['bushwhack', 4, 2, verb()], ['descent', 2, 4, { g: 'hiking' }], ['ascent', 2, 3, { g: 'hiking' }],
    ['rest stop', 2, 2, ph()], ['trail register', 4, 2, ph()], ['guidepost', 3, 2], ['tarn', 5, 3], ['scree', 4, 3], ['moraine', 5, 4], ['arête', 5, 4], ['gully', 4, 4],
    ['contour lines', 3, 3, ph({ g: 'map' })], ['grade', 2, 4, { g: 'slope' }], ['trailblazer', 3, 3], ['rucksack', 2, 4, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- outdoor activities
  outdoor_activities: [
    ['hiking', 1, 1], ['camping', 1, 1], ['fishing', 1, 1], ['kayaking', 2, 1], ['canoeing', 2, 1], ['rock climbing', 2, 1, ph()], ['cycling', 1, 1], ['mountain biking', 2, 1, ph()],
    ['swimming', 1, 2], ['bird watching', 2, 1, ph({})], ['rafting', 2, 1], ['orienteering', 3, 1], ['horse riding', 1, 1, ph({ reg: ['UK'] })],
    ['picnicking', 2, 1], ['stargazing', 2, 2], ['paddleboarding', 3, 1], ['trail running', 3, 1, ph()], ['zip lining', 3, 1, ph()], ['archery', 2, 2], ['foraging', 3, 2],
    ['geocaching', 4, 1], ['abseiling', 3, 2, { reg: ['UK'] }], ['rappelling', 3, 2, { reg: ['US'] }], ['bouldering', 3, 1], ['caving', 3, 1, { al: [['spelunking', 'synonym', 3, 2]] }],
    ['backpacking', 2, 1], ['snowshoeing', 3, 1], ['sailing', 2, 2], ['surfing', 1, 2], ['skiing', 1, 2], ['canyoning', 4, 1], ['coasteering', 5, 1, { reg: ['UK'] }],
    ['slacklining', 5, 1], ['wild swimming', 3, 1, ph({ reg: ['UK'] })], ['fell running', 5, 1, ph({ reg: ['UK'] })], ['paragliding', 3, 2], ['tubing', 3, 2, { g: 'water' }],
    ['ice climbing', 3, 1, ph()], ['via ferrata', 5, 1, ph()],
  ],

  // ---------------------------------------------------------------- famous hiking trails
  famous_hiking_trails: [
    ['Appalachian Trail', 2, 1, place()], ['Inca Trail', 3, 1, place()], ['Pacific Crest Trail', 3, 1, place()], ['Lycian Way', 5, 3, place()], ['Milford Track', 4, 2, place()],
    ['Camino de Santiago', 3, 1, place()], ['Tour du Mont Blanc', 4, 1, place()], ['West Highland Way', 4, 1, place({ reg: ['UK'] })], ['John Muir Trail', 4, 1, place()],
    ['Kokoda Track', 5, 2, place()], ['Overland Track', 5, 2, place({ reg: ['AU'] })], ['Great Ocean Walk', 4, 2, place()],
    ['Annapurna Circuit', 4, 1, place()], ['Everest Base Camp', 3, 3, place()], ['Kungsleden', 5, 2, place()], ['Cape Wrath Trail', 5, 2, place()], ['South West Coast Path', 4, 2, place({ reg: ['UK'] })],
    ['Pennine Way', 4, 1, place({ reg: ['UK'] })], ['Hadrian\'s Wall Path', 4, 3, place()], ['Camino Frances', 4, 2, place()], ['Kumano Kodo', 5, 2, place()], 
    ['Larapinta Trail', 5, 2, place()], ['Routeburn Track', 5, 2, place()], ['Laugavegur', 5, 2, place()], ['Haute Route', 4, 3, place()], ['Long Trail', 4, 3, place({ g: 'Vermont' })],
    ['Te Araroa', 5, 2, place()], ['Bruce Trail', 5, 2, place()], ['Tahoe Rim Trail', 5, 2, place()], ['Colorado Trail', 5, 2, place()], ['Great Himalaya Trail', 5, 2, place()],
    ['Via Francigena', 5, 3, place()],
    ['Tongariro Crossing', 5, 2, place()], ['Rim to Rim', 5, 3, prop({ g: 'Grand Canyon hike' })], ['Offa\'s Dyke Path', 5, 2, place({ reg: ['UK'] })], ['Cotswold Way', 4, 2, place({ reg: ['UK'] })],
  ],

  // ---------------------------------------------------------------- climbing gear
  climbing_gear: [
    ['rope', 1, 1, { g: 'climbing' }], ['carabiner', 3, 1], ['harness', 2, 1, { g: 'climbing' }], ['chalk', 1, 2, { g: 'climbing' }], ['crampons', 4, 1], ['ice axe', 3, 1],
    ['belay device', 4, 1], ['helmet', 1, 2, { g: 'climbing' }], ['climbing shoes', 2, 1, ph()], ['quickdraw', 4, 1], ['cam', 4, 1, { g: 'climbing' }], ['piton', 4, 1, { al: [['peg', 'synonym', 3, 3, [], { g: 'climbing' }]] }],
    ['nut', 3, 3, { g: 'climbing' }], ['sling', 3, 2, { g: 'climbing' }], ['chalk bag', 3, 1, ph()], ['crash pad', 4, 1, ph()], ['ascender', 4, 1], ['figure eight', 4, 2, { g: 'climbing knot' }],
    ['grigri', 5, 1, { tm: true }], ['ice screw', 4, 1, ph()], ['bolt', 3, 3, { g: 'climbing' }], ['anchor', 2, 4, { g: 'climbing' }], ['belay glasses', 5, 2, ph()],
    ['via ferrata set', 5, 2, ph()], ['hex', 5, 2, { g: 'climbing nut' }], ['hammer', 1, 4], ['tricams', 5, 2], ['jumar', 5, 2, { tm: true }],
    ['rack', 3, 4, { g: 'climbing' }], ['gear loop', 4, 2, ph()], ['dynamic rope', 4, 1, ph()], ['static rope', 4, 1, ph()], ['approach shoes', 4, 2, ph()], ['webbing', 4, 3],
    ['prusik', 5, 2], ['rope bag', 3, 1, ph()], ['hangboard', 4, 2], ['skyhook', 5, 3, { g: 'climbing' }], ['bolt hanger', 5, 3, ph()], ['gaiters', 4, 3],
  ],

  // ---------------------------------------------------------------- safari words
  safari_words: [
    ['game drive', 3, 1, ph()], ['big five', 3, 1, ph()], ['ranger', 2, 1], ['tracker', 3, 1], ['watering hole', 3, 1, ph()], ['lodge', 2, 1, { g: 'accommodation' }], ['savanna', 2, 1, { al: [['savannah', 'spelling', 2, 1, ['UK']]] }],
    ['jeep', 2, 1, { g: 'safari' }], ['binoculars', 1, 2], ['lion', 1, 3], ['elephant', 1, 3], ['rhino', 1, 3], ['buffalo', 2, 3, { g: 'safari' }],
    ['leopard', 2, 3], ['game reserve', 3, 1, ph()], ['national park', 1, 2, ph()], ['bush', 2, 2, { g: 'safari' }], ['kopje', 5, 2, { al: [['koppie', 'spelling', 5, 3]] }],
    ['guide', 1, 3, { g: 'safari' }], ['hide', 4, 2, { g: 'bird watching', reg: ['UK'] }], ['camp', 1, 4, { g: 'safari' }], ['tented camp', 4, 1, ph()], ['migration', 2, 2, { g: 'wildebeest' }],
    ['sundowner', 4, 1, { g: 'safari drink' }], ['spoor', 4, 2], ['predator', 2, 3], ['herd', 2, 3], ['pride', 2, 3, { g: 'lions' }], ['zebra crossing', 3, 4, ph()],
    ['Serengeti', 3, 2, place()], ['Maasai Mara', 3, 1, place()], ['Kruger', 3, 1, place()], ['Okavango Delta', 4, 2, place()], ['Ngorongoro', 4, 2, place()],
    ['kraal', 4, 3, { g: 'enclosure' }], ['boma', 5, 2], ['mopane', 5, 3], ['acacia', 3, 3], ['baobab', 3, 3], ['wildlife', 1, 3], ['safari hat', 2, 2, ph()], ['kill', 3, 3, { g: 'safari' }],
  ],

  // ---------------------------------------------------------------- luggage
  luggage: [
    ['suitcase', 1, 1], ['backpack', 1, 1], ['duffel bag', 2, 1, ph({ al: [['duffle bag', 'spelling', 2, 1]] })], ['carry-on', 2, 1], ['trunk', 2, 2, { g: 'luggage' }], ['briefcase', 2, 2],
    ['rucksack', 2, 2, { reg: ['UK'] }], ['holdall', 3, 2, { reg: ['UK'] }], ['garment bag', 3, 1, ph()], ['fanny pack', 2, 3, ph({ reg: ['US'], al: [['bum bag', 'synonym', 2, 3, ['UK']]] })],
    ['tote bag', 2, 2, ph()], ['hand luggage', 2, 1, ph({ reg: ['UK'] })], ['weekend bag', 3, 1, ph()], ['overnight bag', 2, 1, ph()], ['trolley case', 3, 1, ph({ reg: ['UK'] })],
    ['wheeled bag', 3, 1, ph()], ['hard shell case', 3, 1, ph()], ['steamer trunk', 4, 1, ph()], ['valise', 4, 2], ['portmanteau', 5, 3, { g: 'luggage' }], ['carpetbag', 4, 2],
    ['satchel', 3, 3], ['messenger bag', 3, 3, ph()], ['cabin bag', 3, 1, ph()], ['laptop bag', 2, 3, ph()], ['shoulder bag', 2, 3, ph()], ['kitbag', 4, 2],
    ['gladstone bag', 5, 2, ph()], ['suitcase set', 3, 1, ph()], ['luggage rack', 3, 3, ph()], ['hatbox', 4, 3, { g: 'luggage' }], ['sea chest', 5, 4, ph()], ['bindle', 4, 3],
    ['packing cube', 3, 2, ph()], ['day bag', 3, 2, ph()], ['money belt', 3, 3, ph()], ['luggage tag', 2, 2, ph()],
  ],

  // ---------------------------------------------------------------- things to pack
  things_to_pack: [
    ['clothes', 1, 1], ['toothbrush', 1, 1], ['passport', 1, 1], ['phone charger', 1, 1, ph()], ['socks', 1, 1], ['underwear', 1, 1], ['pajamas', 1, 1, { al: [['pyjamas', 'spelling', 1, 1, ['UK']]] }],
    ['sunglasses', 1, 1], ['camera', 1, 1], ['swimsuit', 1, 1, { al: [['swimming costume', 'synonym', 2, 2, ['UK']]] }], ['jacket', 1, 1], ['shoes', 1, 1], ['sunscreen', 1, 1],
    ['guidebook', 2, 1], ['sandals', 1, 2], ['adapter', 2, 1, { g: 'plug' }], ['umbrella', 1, 2], ['towel', 1, 2], ['medicine', 1, 2], ['snacks', 1, 2], ['wallet', 1, 2],
    ['book', 1, 2], ['headphones', 1, 2], ['laptop', 1, 2], ['hat', 1, 2], ['toiletries', 2, 1], ['travel pillow', 2, 1, ph()], ['first aid kit', 2, 2, ph()],
    ['insect repellent', 2, 2, ph()], ['travel insurance', 3, 3, ph()], ['power bank', 2, 1, ph()], ['laundry bag', 3, 2, ph()], ['hand sanitizer', 2, 2, ph()],
    ['reusable bottle', 3, 2, ph()], ['spare glasses', 3, 2, ph()], ['plastic bags', 3, 3, ph()], ['neck gaiter', 5, 4, ph()], ['dry shampoo', 4, 3, ph()],
  ],

  // ---------------------------------------------------------------- travel documents
  travel_documents: [
    ['passport', 1, 1], ['visa', 1, 1, { g: 'travel' }], ['ticket', 1, 1, { g: 'travel' }], ['boarding pass', 1, 1, ph()], ['itinerary', 2, 1], ['driver\'s license', 2, 2, ph({ al: [['driving licence', 'spelling', 2, 2, ['UK']]] })],
    ['travel insurance', 2, 1, ph()], ['hotel booking', 2, 1, ph()], ['e-ticket', 2, 1], ['vaccine certificate', 3, 1, ph()], ['IDP', 4, 1, { type: 'acronym', g: 'driving permit' }],
    ['customs form', 3, 1, ph()], ['immigration card', 4, 1, ph()], ['ESTA', 4, 1, { type: 'acronym' }], ['green card', 2, 3, ph({ g: 'US residency' })], ['ID card', 1, 2],
    ['car rental voucher', 4, 2, ph()], ['rail pass', 3, 1, ph()], ['travel permit', 3, 1, ph()], ['entry stamp', 3, 1, ph()], ['letter of invitation', 4, 2, ph()],
    ['birth certificate', 2, 3, ph()], ['reservation', 2, 3, { g: 'travel' }], ['visa waiver', 4, 1, ph()], ['transit visa', 4, 1, ph()], ['laissez-passer', 5, 2],
    ['cruise documents', 4, 2, ph()], ['EHIC', 4, 2, { type: 'acronym', reg: ['UK'] }], ['yellow card', 4, 3, ph({ g: 'vaccination record' })], ['global entry card', 5, 3, ph()],
    ['covid pass', 3, 2, ph()], ['luggage receipt', 4, 3, ph()], ['booking confirmation', 2, 1, ph()], ['emergency contact card', 5, 4, ph()], ['carnet', 5, 4],
  ],

  // ---------------------------------------------------------------- toiletries
  toiletries: [
    ['toothpaste', 1, 1], ['toothbrush', 1, 1], ['shampoo', 1, 1], ['conditioner', 1, 1, { g: 'hair' }], ['soap', 1, 1, { g: 'wash' }], ['razor', 1, 1], ['deodorant', 1, 1], ['floss', 2, 1, { g: 'dental' }],
    ['mouthwash', 2, 1], ['body wash', 2, 1, ph()], ['hairbrush', 1, 1], ['comb', 1, 2], ['lotion', 1, 2], ['sunscreen', 1, 3], ['shaving cream', 2, 1, ph()], ['cotton buds', 2, 1, ph({ reg: ['UK'], al: [['Q-tips', 'synonym', 2, 1, ['US'], { tm: true, type: 'proper' }]] })],
    ['tweezers', 2, 2], ['nail clippers', 2, 1, ph()], ['hand cream', 2, 2, ph()], ['lip balm', 2, 2, ph()], ['perfume', 1, 3], ['contact lens solution', 3, 2, ph()], ['face wash', 2, 1, ph()],
    ['tampons', 2, 2], ['toilet bag', 2, 1, ph({ reg: ['UK'] })], ['wash bag', 2, 1, ph({ reg: ['UK'] })], ['dopp kit', 4, 1, ph({ reg: ['US'] })], ['face wipes', 2, 2, ph()],
    ['dental floss', 2, 1, ph()], ['hair gel', 2, 2, ph()], ['hairspray', 2, 2], ['moisturizer', 2, 2], ['cleanser', 3, 2], ['pumice stone', 4, 3, ph()], ['cologne', 2, 3],
    ['aftershave', 2, 2], ['styptic pencil', 5, 3, ph()], ['mouth guard', 3, 4, ph()],
  ],

  // ---------------------------------------------------------------- beach gear
  beach_gear: [
    ['towel', 1, 1], ['sunscreen', 1, 1], ['sunglasses', 1, 1], ['umbrella', 1, 2], ['bucket', 1, 1, { g: 'beach' }], ['spade', 1, 1],
    ['flip-flops', 1, 1, { al: [['thongs', 'synonym', 2, 3, ['AU'], { g: 'sandals' }]] }], ['swimsuit', 1, 1], ['beach ball', 1, 1, ph()], ['cooler', 1, 2], ['deck chair', 1, 1, ph({ al: [['beach chair', 'synonym', 1, 1]] })],
    ['snorkel', 2, 1], ['surfboard', 1, 2], ['sun hat', 1, 1, ph()], ['frisbee', 1, 2, { tm: true }], ['goggles', 2, 2, { g: 'swimming' }], ['bodyboard', 3, 1],
    ['windbreak', 3, 1], ['sand toys', 2, 1, ph()], ['beach bag', 1, 1, ph()], ['floatie', 3, 1, { al: [['pool noodle', 'synonym', 2, 2]] }], ['life jacket', 1, 3, ph()],
    ['lilo', 3, 1, { reg: ['UK'], al: [['pool float', 'synonym', 2, 1]] }], ['beach mat', 2, 1, ph()], ['sun lounger', 2, 1, ph({ reg: ['UK'] })], ['cabana', 3, 2], ['paddle ball', 3, 2, ph()],
    ['kite', 1, 3, { g: 'toy' }], ['flippers', 2, 2, { al: [['fins', 'synonym', 2, 2, [], { g: 'swimming' }]] }], ['rash guard', 4, 2, ph()], ['wetsuit', 2, 3], ['sarong', 3, 2],
    ['bodyboard fins', 5, 3, ph()], ['metal detector', 3, 3, ph()], ['tide table', 4, 4, ph()], ['dry bag', 3, 3, ph()],
  ],

  // ---------------------------------------------------------------- souvenirs
  souvenirs: [
    ['postcard', 1, 1], ['magnet', 1, 1, { g: 'fridge' }], ['keychain', 1, 1, { al: [['keyring', 'synonym', 1, 1, ['UK']]] }], ['t-shirt', 1, 1], ['snow globe', 2, 1, ph()], ['mug', 1, 2, { g: 'souvenir' }],
    ['shot glass', 2, 1, ph()], ['souvenir spoon', 3, 1, ph()], ['fridge magnet', 1, 1, ph()], ['figurine', 3, 1], ['tea towel', 2, 2, ph({ reg: ['UK'] })], ['stuffed toy', 2, 2, ph()],
    ['seashell', 1, 3], ['baseball cap', 1, 3, ph()], ['poster', 1, 3], ['carved wood', 3, 2, ph()], ['handicraft', 3, 2], ['local crafts', 2, 1, ph()],
    ['pottery', 2, 2], ['woven basket', 2, 2, ph()], ['jewelry', 1, 3, { al: [['jewellery', 'spelling', 1, 3, ['UK']] ] }], ['scarf', 1, 3], ['miniature landmark', 4, 1, ph()],
    ['tin box', 3, 2, ph()], ['bookmark', 2, 2], ['pin badge', 3, 1, ph()], ['patch', 3, 3, { g: 'sewing' }], ['fan', 2, 4, { g: 'folding' }], ['shell necklace', 3, 2, ph()],
    ['regional food', 3, 2, ph()], ['bottle of wine', 2, 3, ph()], ['olive oil', 2, 4, ph()], ['tea', 1, 4], ['spice mix', 3, 3, ph()], ['maple syrup', 2, 3, ph()],
    ['matryoshka', 4, 1, { al: [['nesting doll', 'synonym', 3, 1]] }], ['wooden clog', 4, 2, ph()], ['kilt pin', 5, 3, ph()], ['worry doll', 5, 3, ph()], ['kokeshi', 5, 2], ['evil eye', 4, 2, ph()],
  ],

  // ---------------------------------------------------------------- travel accessories
  travel_accessories: [
    ['plug adapter', 2, 1, ph()], ['neck pillow', 2, 1, ph()], ['eye mask', 2, 1, ph()], ['earplugs', 2, 1], ['luggage tag', 2, 1, ph()],
    ['money belt', 3, 1, ph()], ['luggage lock', 3, 1, ph()], ['packing cubes', 3, 1], ['travel adapter', 2, 1, ph()], ['power bank', 2, 1, ph()], ['passport holder', 2, 1, ph()],
    ['luggage scale', 3, 1, ph()], ['travel mug', 2, 3, ph()], ['inflatable pillow', 3, 1, ph()], ['compression socks', 3, 1, ph()],
    ['travel towel', 3, 1, ph()], ['toiletry bag', 2, 2, ph()], ['universal charger', 3, 2, ph()], ['dry bag', 3, 3, ph()], ['travel blanket', 3, 1, ph()], ['sleep sack', 4, 2, ph()],
    ['TSA lock', 4, 1, prop({ tm: true })], ['RFID wallet', 4, 1, prop()], ['neck wallet', 3, 1, ph()], ['hanging toiletry bag', 4, 2, ph()], ['travel clothesline', 4, 2, ph()], ['shoe bags', 3, 2],
    ['bag strap', 3, 2, ph()], ['luggage trolley strap', 5, 3, ph()], ['collapsible bottle', 4, 3, ph()], ['bag tracker', 3, 1, ph({ al: [['AirTag', 'synonym', 3, 2, [], { tm: true, type: 'proper' }]] })], ['pill organizer', 3, 3, ph()],
    ['door stopper alarm', 5, 3, ph()], ['universal sink plug', 5, 3, ph()], ['portable iron', 4, 3, ph()],
  ],

  // ---------------------------------------------------------------- beach vacation
  beach_vacation: [
    ['sunscreen', 1, 1], ['deck chair', 1, 1, ph()], ['sandcastle', 1, 1], ['cabana', 3, 1], ['sunbathing', 1, 1], ['seashell', 1, 1], ['beach umbrella', 1, 1, ph()], ['swimming', 1, 2],
    ['snorkeling', 2, 1, { al: [['snorkelling', 'spelling', 2, 1, ['UK']]] }], ['sunset', 1, 3, { g: 'beach' }], ['cocktail', 1, 3], ['sun lounger', 2, 1, ph()], ['tan', 1, 2, { g: 'skin' }],
    ['seagull', 1, 2], ['boardwalk', 3, 3], ['ice cream', 1, 2, ph()], ['beach volleyball', 2, 1, ph()], ['jet ski', 2, 1, ph()], ['surfing', 1, 1], ['paddleboarding', 3, 1],
    ['sunburn', 1, 2], ['waves', 1, 2], ['lifeguard', 1, 2], ['tide pool', 3, 2, ph()], ['beach resort', 2, 1, ph()], ['all-inclusive', 3, 1], ['resort', 1, 2], ['hammock', 1, 2],
    ['parasailing', 3, 1], ['banana boat', 3, 1, { g: 'beach ride' }], ['beach bar', 2, 1, ph()], ['sand dune', 2, 3, ph()], ['kite surfing', 3, 2, ph()], ['tropical drink', 3, 2, ph()],
    ['sea breeze', 3, 3, ph()], ['pina colada', 3, 3, ph({ g: 'cocktail' })], ['pier', 2, 3], ['promenade', 3, 3], ['rock pool', 3, 3, ph({ reg: ['UK'] })], ['aloe vera', 3, 4],
  ],

  // ---------------------------------------------------------------- ski trip
  ski_trip: [
    ['chairlift', 2, 1], ['chalet', 2, 1], ['piste', 3, 1], ['lift pass', 3, 1, ph()], ['après-ski', 3, 1], ['skis', 1, 1], ['snowboard', 1, 1], ['goggles', 2, 1, { g: 'ski' }],
    ['ski poles', 2, 1, ph()], ['ski boots', 2, 1, ph()], ['gondola', 3, 1, { g: 'ski' }], ['ski lodge', 2, 1, ph()], ['ski jacket', 2, 1, ph()], ['slope', 2, 1, { g: 'ski' }], ['moguls', 4, 1],
    ['powder', 2, 1, { g: 'snow' }], ['ski school', 2, 1, ph()], ['ski instructor', 2, 1, ph()], ['hot chocolate', 1, 3, ph()], ['fondue', 3, 3], ['mulled wine', 3, 3, ph()],
    ['T-bar', 4, 1, { al: [['button lift', 'synonym', 4, 2, ['UK']], ['drag lift', 'synonym', 4, 2, ['UK']]] }], ['black run', 3, 1, ph()], ['red run', 3, 1, ph()], ['blue run', 3, 1, ph()],
    ['bunny slope', 3, 1, ph({ reg: ['US'], al: [['nursery slope', 'synonym', 3, 1, ['UK']]] })], ['snow bunny', 4, 2, ph()], ['ski rental', 3, 1, ph()], ['ski resort', 2, 1, ph()],
    ['balaclava', 3, 3], ['salopettes', 4, 2, { reg: ['UK'] }], ['base layer', 3, 2, ph()], ['ski pass', 2, 1, ph()], ['off-piste', 4, 1], ['ski patrol', 3, 1, ph()],
    ['cable car', 2, 2, ph()], ['avalanche beacon', 5, 2, ph()], ['hot tub', 2, 3, ph()], ['fresh tracks', 4, 2, ph()], ['ski wax', 3, 2, ph()], ['sled', 1, 4, { g: 'snow' }],
  ],

  // ---------------------------------------------------------------- cruise words
  cruise_words: [
    ['cabin', 2, 1, { g: 'ship' }], ['deck', 2, 1, { g: 'ship' }], ['port', 2, 2, { g: 'cruise stop' }], ['embark', 3, 1, verb()], ['disembark', 3, 1, verb()], ['gangway', 3, 1],
    ['porthole', 3, 2], ['balcony cabin', 3, 1, ph()], ['shore excursion', 4, 1, ph()], ['captain', 1, 3], ['cruise director', 3, 1, ph()], ['buffet', 2, 2, { g: 'meal' }],
    ['lido deck', 4, 1, ph()], ['muster drill', 4, 1, ph()], ['bow', 2, 3, { g: 'ship front' }], ['stern', 3, 3, { g: 'ship back' }], ['starboard', 3, 2], ['port side', 3, 2, ph()],
    ['all aboard', 2, 1, ph()], ['itinerary', 2, 2], ['tender', 4, 2, { g: 'ship boat' }], ['sea day', 3, 1, ph()], ['formal night', 3, 1, ph()], ['stateroom', 3, 1],
    ['cabin steward', 3, 1, ph()], ['promenade deck', 3, 1, ph()], ['bridge', 2, 3, { g: 'ship' }], ['galley', 3, 3, { g: 'ship kitchen' }], ['bon voyage', 2, 1, ph()],
    ['sail away', 3, 1, ph()], ['dock', 2, 3, { g: 'port' }], ['cruise terminal', 3, 1, ph()], ['lifeboat', 2, 3], ['life jacket', 1, 3, ph()], ['knots', 3, 3, { g: 'ship speed' }],
    ['purser', 4, 2], ['cruise card', 3, 1, ph()], ['ship deck plan', 4, 2, ph()], ['transatlantic', 3, 2], ['cruise ship', 1, 1, ph()], ['maiden voyage', 3, 2, ph()], ['fjord', 3, 3],
    ['specialty dining', 4, 2, ph()], ['tendering', 5, 3], ['bulkhead', 4, 4, { g: 'ship' }], ['crow\'s nest', 4, 4, ph()],
  ],
};

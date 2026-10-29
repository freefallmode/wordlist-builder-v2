// Top-up batch 9: places named after people ... tent types.
const car = (o = {}) => ({ type: 'org', tm: true, ...o });
const hotel = (o = {}) => ({ type: 'org', tm: true, ...o });
const air = (o = {}) => ({ type: 'org', ...o });
const ship = (o = {}) => ({ g: 'ship', type: 'proper', ...o });

export const THEMES = {};

export const ALIASES = [
  ['skateboard_parts', 'skateboard wheels', '', [['wheels', 'synonym', 1, 1]]],
  ['cycling_races', "Giro d'Italia", '', [['Giro', 'synonym', 2, 2], ['Tour of Italy', 'synonym', 2, 2]]],
  ['cycling_races', 'Vuelta a Espana', '', [['Tour of Spain', 'synonym', 3, 3]]],
];

export const FIXES = [
  { gloss: ['Waterloo', 'famous_battles', 'battle'] }, { gloss: ['axle', 'car_parts', 'car part'] }, { gloss: ['front of house', 'theater_building_parts', 'theater'] },
  { gloss: ['sandals', 'shoes', 'shoes'] }, { gloss: ['stairs', 'parts_of_a_house', 'house'] }, { gloss: ['air', 'classical_elements', 'element'] },
  { gloss: ['Riley', 'unisex_names', 'name'] }, { gloss: ['Rosewood', 'types_of_wood', 'wood'] }, { gloss: ['Batavia', 'old_city_names', 'city'] },
  { gloss: ['180', 'darts_terms', 'darts'] }, { gloss: ['stalefish', 'snowboard_tricks', 'snowboard'] },
];

export const DATA = {
  places_named_after_people: [
    ['Georgia', 2, 2, { g: 'US state', type: 'place' }], ['New York', 1, 2, { type: 'place' }], ['Jamestown', 3, 2, { type: 'place' }],
    ['Charleston', 2, 2, { g: 'city', type: 'place' }], ['Lincoln', 3, 2, { g: 'city', type: 'proper' }], ['Baltimore', 2, 3, { type: 'place' }],
    ['Annapolis', 3, 4, { type: 'place' }], ['Monrovia', 3, 4, { type: 'place' }], ['Louisville', 3, 3, { type: 'place' }],
    ['Brazzaville', 4, 5, { type: 'place' }], ['Port Elizabeth', 4, 5, { type: 'place' }], ['Cooktown', 5, 5, { type: 'place' }],
  ],
  restaurant: [
    ['mise en place', 4, 4], ['chef de partie', 4, 4], ['plongeur', 5, 5], ['garde manger', 5, 5], ['front of house', 3, 4, { g: 'restaurant' }],
    ['back of house', 4, 4], ['chef de rang', 5, 5], ['commis', 4, 5, { g: 'chef' }], ['expediter', 5, 5],
  ],
  hospital: [
    ['phlebotomist', 4, 4], ['autoclave', 4, 4], ['crash cart', 4, 4], ['sharps bin', 4, 4], ['ward round', 3, 4], ['nurses station', 4, 4],
    ['anaesthetist', 4, 4], ['telemetry', 5, 5], ['sphygmomanometer', 5, 5],
  ],
  office: [
    ['pigeonhole', 4, 4], ['letterhead', 4, 4], ['hot desk', 3, 4], ['dictaphone', 5, 5], ['franking machine', 5, 5], ['lever arch file', 5, 5],
    ['binder clip', 3, 4], ['carbon paper', 4, 4], ['punch clock', 4, 4], ['letter opener', 3, 4], ['swivel chair', 2, 3],
  ],
  construction_site: [
    ['gantry', 4, 5], ['screed', 5, 5], ['lintel', 4, 4], ['plumb bob', 4, 4], ['theodolite', 5, 5], ['dumpy level', 5, 5],
    ['hod', 5, 5, { g: 'brick carrier' }], ['cherry picker', 3, 3], ['skip', 3, 4, { g: 'rubbish container' }],
  ],
  vet_clinic: [
    ['kennel cough', 4, 4], ['parvovirus', 4, 5], ['distemper', 4, 5], ['ear mites', 4, 4], ['tick remover', 4, 4], ['wormer', 4, 4],
    ['pet passport', 4, 4, { reg: ['UK'] }], ['blood test', 2, 3],
  ],
  buildings_to_live_in: [
    ['farmhouse', 2, 2, { g: 'house' }], ['condo', 2, 2], ['duplex', 3, 3], ['yurt', 3, 4], ['maisonette', 4, 4], ['dacha', 4, 4],
    ['brownstone', 4, 4], ['hogan', 5, 5, { g: 'Navajo house' }], ['bothy', 5, 5], ['longhouse', 4, 5], ['wigwam', 3, 4], ['chateau', 3, 4],
    ['castle', 1, 2], ['tower block', 2, 2],
  ],
  shops: [
    ['shoe shop', 1, 1], ['corner shop', 2, 1, { reg: ['UK'] }], ['sweet shop', 2, 1, { reg: ['UK'] }], ['charity shop', 2, 2, { reg: ['UK'] }],
    ['fishmonger', 3, 2], ['chemist', 3, 2, { g: 'shop', reg: ['UK'] }], ['haberdashery', 4, 4], ['milliner', 4, 5], ['ironmonger', 4, 4, { reg: ['UK'] }],
    ['tobacconist', 3, 4], ['apothecary', 3, 4], ['pawnbroker', 3, 4], ['furrier', 5, 5], ['cobbler', 3, 4, { g: 'shoemaker' }],
    ['draper', 4, 5, { g: 'job' }], ['department store', 1, 1],
  ],
  traffic_words: [
    ['chicane', 4, 4], ['carriageway', 4, 4], ['lay-by', 4, 4, { g: 'pull-in', reg: ['UK'] }], ['box junction', 4, 4, { reg: ['UK'] }],
    ['sleeping policeman', 5, 5, { reg: ['UK'] }], ['tidal flow', 5, 5], ['filter lane', 4, 4], ['rubbernecking', 4, 4], ['ring road', 3, 3, { g: 'road' }],
    ['speed bump', 2, 2], ['bypass', 4, 4], ['underpass', 3, 4],
  ],
  parts_of_a_town: [
    ['cul-de-sac', 3, 4, { g: 'road' }], ['ginnel', 5, 5, { reg: ['UK'] }], ['conurbation', 5, 5], ['exurb', 5, 5], ['barrio', 4, 4], ['borough', 3, 4],
    ['medina', 4, 5, { g: 'old city' }], ['environs', 5, 5], ['hinterland', 4, 5], ['promenade', 3, 3, { g: 'harbor' }], ['plaza', 2, 3, { g: 'square' }],
  ],
  british_car_brands: [
    ['Vauxhall', 2, 1, car({ reg: ['UK'] })], ['MG', 2, 2, car({ g: 'car', type: 'org' })], ['Austin', 3, 3, car({ g: 'car' })], ['Morris', 3, 3, car({ g: 'car' })],
    ['Triumph', 3, 3, car({ g: 'car' })], ['Rover', 3, 3, car({ g: 'car' })], ['Daimler', 4, 4, car()], ['Jensen', 5, 5, car()], ['TVR', 4, 5, car()],
    ['Reliant', 4, 4, car()], ['Lagonda', 5, 5, car()], ['Riley', 5, 5, car({ g: 'car' })], ['Sunbeam', 5, 5, car()], ['Ginetta', 5, 5, car()],
    ['Alvis', 5, 5, car()], ['Wolseley', 5, 5, car()], ['Caterham', 4, 4, car()], ['Vanden Plas', 5, 5, car()],
  ],
  road_signs: [
    ['level crossing', 2, 4], ['cattle grid', 3, 4], ['loose chippings', 4, 4], ['traffic calming', 4, 4], ['double bend', 3, 4],
    ['staggered junction', 5, 5], ['crosswind', 4, 4], ['ahead only', 3, 4], ['tramway crossing', 4, 5], ['no waiting', 2, 3], ['filter lane', 4, 4],
  ],
  ticket_words: [
    ['excess fare', 4, 4], ['advance purchase', 4, 4], ['anytime return', 4, 4], ['super off-peak', 4, 4], ['split ticketing', 5, 5],
    ['fare capping', 5, 5], ['railway warrant', 5, 5], ['farebox', 5, 5], ['validator', 4, 4, { g: 'ticket' }], ['interrail', 4, 4, { reg: ['UK'] }],
    ['break of journey', 5, 5], ['ticket barrier', 3, 3], ['ticket collector', 2, 2], ['cancellation fee', 4, 4],
  ],
  airlines: [
    ['Icelandair', 4, 4, air()], ['Wizz Air', 3, 3, air()], ['Kenya Airways', 4, 4, air()], ['EgyptAir', 3, 4, air()], ['Braniff', 5, 5, air()],
    ['Allegiant', 4, 5, air()], ['Fiji Airways', 4, 5, air()], ['Copa Airlines', 4, 5, air()], ['Frontier (airline)', 3, 4, air()],
    ['LOT (airline)', 4, 5, air()], ['Air Tahiti Nui', 5, 5, air()], ['Hawaiian Airlines', 3, 3, air()], ['Air Astana', 5, 5, air()],
    ['Royal Air Maroc', 4, 5, air()], ['Laker Airways', 5, 5, air()],
  ],
  famous_ships: [
    ['Endurance', 3, 4, ship()], ['Erebus', 4, 4, ship()], ['Terra Nova', 4, 4, ship({ g: 'ship' })], ['Amistad', 4, 4, ship()],
    ['Great Eastern', 4, 5, ship()], ['SS Great Britain', 4, 4, ship({ g: '' })], ['Empress of Ireland', 4, 5, ship({ g: '' })],
    ['Wilhelm Gustloff', 4, 5, ship({ g: '' })], ['Batavia', 5, 5, ship()], ['Gjoa', 5, 5, ship({ g: '' })], ['Nimrod', 5, 5, ship()],
    ['Cap Arcona', 5, 5, ship({ g: '' })], ['Amerigo Vespucci', 5, 5, ship({ g: '' })], ['HMS Hood', 3, 4, ship({ g: '' })],
    ['Resolution', 4, 5, ship({ g: 'Cook ship' })], ['Discovery', 3, 4, ship()],
  ],
  knots: [
    ['double knot', 1, 1], ['shoelace knot', 1, 1], ['love knot', 3, 2], ['four-in-hand', 4, 4, { g: 'tie knot' }], ['Pratt knot', 5, 5],
  ],
  nautical_directions: [
    ['portside', 3, 2], ['overboard', 2, 2], ['ashore', 2, 2], ['offshore', 2, 3], ['aloft', 4, 4], ['athwartships', 5, 5],
  ],
  famous_train_stations: [
    ['Waterloo', 2, 2, { g: 'station', type: 'place' }], ['Waverley', 4, 4, { g: 'station', type: 'place' }],
    ['Manchester Piccadilly', 3, 3, { type: 'place' }], ['Birmingham New Street', 3, 3, { type: 'place' }],
    ['Sirkeci', 5, 5, { g: 'station', type: 'place' }], ['Ueno', 5, 5, { g: 'station', type: 'place' }], ['Anhalter Bahnhof', 5, 5, { type: 'place' }],
  ],
  cycling_races: [
    ['Olympic road race', 2, 2], ['Tour de France Femmes', 3, 2], ['Tour of Flanders', 4, 4], ['world championships', 2, 2, { g: 'cycling' }],
  ],
  skateboard_tricks: [
    ['180', 2, 2, { g: 'skateboard trick' }], ['air', 2, 2, { g: 'skateboard trick' }], ['rail slide', 3, 3], ['airwalk', 5, 5], ['stalefish', 5, 5, { g: 'grab' }],
    ['no comply', 5, 5],
  ],
  skate_park_features: [
    ['half pipe', 2, 1], ['ledge', 2, 2, { g: 'skate park' }], ['stairs', 1, 2, { g: 'skate park' }], ['rail', 2, 2, { g: 'skate park' }],
    ['mini bowl', 3, 3], ['transition', 4, 4, { g: 'skate park' }], ['loveseat', 5, 5],
  ],
  skateboard_parts: [
    ['nose', 2, 2, { g: 'skateboard' }], ['axle', 3, 3, { g: 'skateboard' }], ['board', 1, 1, { g: 'skateboard' }], ['truck', 2, 2, { g: 'skateboard' }],
  ],
  giving_directions: [
    ['as the crow flies', 3, 4], ['dogleg', 4, 5], ['bypass', 4, 4], ['straight on', 2, 2], ['bear right', 2, 3], ['underpass', 3, 4],
    ['double back', 3, 4, { g: 'turn back' }], ['a stone\'s throw', 3, 4],
  ],
  hotel_chains: [
    ['Ritz-Carlton', 2, 2, hotel()], ['Waldorf Astoria', 2, 2, hotel()], ['Doubletree', 2, 2, hotel()], ['Kempinski', 4, 4, hotel()],
    ['Rosewood', 4, 4, hotel({ g: 'hotel' })], ['Raffles', 3, 3, hotel({ g: 'hotel' })], ['Sandals', 3, 3, hotel({ g: 'resort' })],
    ['Moxy', 4, 4, hotel()], ['Melia', 4, 4, hotel()], ['Scandic', 4, 4, hotel()], ['Jumeirah', 4, 4, hotel()], ['Belmond', 5, 5, hotel()],
    ['Steigenberger', 5, 5, hotel()], ['Movenpick', 5, 5, hotel()],
  ],
  tent_types: [
    ['frame tent', 2, 3], ['wedge tent', 4, 4], ['umbrella tent', 3, 3], ['Sibley tent', 5, 5], ['Bedouin tent', 3, 4], ['expedition tent', 3, 3],
    ['bivouac sack', 5, 5], ['screen house', 4, 4], ['bender', 5, 5, { g: 'shelter' }],
  ],
};

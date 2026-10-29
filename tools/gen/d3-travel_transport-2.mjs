// Generated word data: Travel & Transport depth-3 themes, chunk 2 (knots ... road trip words).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const O = (o = {}) => ({ type: 'org', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const PL = (o = {}) => ({ type: 'place', ...o });
const AC = (o = {}) => ({ type: 'acronym', ...o });
const verb = (o = {}) => ({ pos: 'verb', ...o });
const syn = (t, r, i, reg = [], o = {}) => [t, 'synonym', r, i, reg, o];
const spell = (t, r, i, reg = [], o = {}) => [t, 'spelling', r, i, reg, o];

export const THEMES = {
  knots: { d: 4 }, famous_canals: { d: 3 }, nautical_directions: { d: 4 }, ship_crew: { d: 2 }, submarine_words: { d: 3 },
  train_types: { d: 2 }, parts_of_a_train: { d: 2 }, railway_words: { d: 3 }, station_words: { d: 1 }, famous_trains: { d: 3 },
  metro_systems: { d: 5 }, famous_train_stations: { d: 4 }, railroad_jobs: { d: 3 },
  bicycle_parts: { d: 1 }, bike_types: { d: 2 }, motorcycle_brands: { d: 2 }, motorcycle_types: { d: 2 }, cycling_races: { d: 4 },
  cycling_words: { d: 3 }, skateboard_tricks: { d: 3 }, scooters_and_skates: { d: 1 }, motorcycle_parts: { d: 3 },
  skate_park_features: { d: 5 }, skateboard_parts: { d: 2 },
  kinds_of_travelers: { d: 2 }, travel_verbs: { d: 1 }, famous_routes: { d: 3 }, animal_powered_travel: { d: 1 },
  giving_directions: { d: 1 }, road_trip_words: { d: 1 },
};

export const DATA = {
  // ---------------------------------------------------------------- knots
  knots: [
    ['slip knot', 2, 2, { al: [spell('slipknot', 2, 3)] }], ['granny knot', 2, 3], ['noose', 2, 3, { sens: true }], ['Windsor knot', 2, 4, { type: 'proper', g: 'tie' }],
    ['bowline', 3, 3], ['reef knot', 3, 3, { al: [syn('square knot', 3, 3)] }], ['clove hitch', 3, 3], ['half hitch', 3, 3], ['overhand knot', 3, 3],
    ['figure eight', 3, 4, { g: 'knot' }], ['Gordian knot', 3, 4, P()], ["Hangman's knot", 3, 3, { sens: true, type: 'proper' }],
    ['bow knot', 2, 3], ['sheepshank', 4, 4], ['sheet bend', 4, 4], ['rolling hitch', 4, 4], ['timber hitch', 4, 4], ["Fisherman's knot", 4, 4, { type: 'proper' }],
    ["Monkey's fist", 4, 4, { type: 'proper' }], ["Trucker's hitch", 4, 4, { type: 'proper' }], ['anchor hitch', 4, 4], ['stopper knot', 4, 4],
    ["Lark's head", 4, 5, { type: 'proper' }], ['carrick bend', 5, 5], ["Turk's head", 5, 5, P()], ['cow hitch', 5, 5], ['running bowline', 5, 5],
    ["Surgeon's knot", 5, 5, { type: 'proper' }], ['Prusik', 5, 5, P({ g: 'knot' })], ['Alpine butterfly', 5, 5, P()],
  ],

  // ---------------------------------------------------------------- famous canals
  famous_canals: [
    ['Suez Canal', 1, 1, PL()], ['Panama Canal', 1, 1, PL()], ['Erie Canal', 2, 2, PL()], ['Kiel Canal', 3, 3, PL()], ['Corinth Canal', 4, 4, PL()],
    ['Grand Canal', 3, 3, PL({ g: 'Venice' })], ['Canal du Midi', 4, 4, PL()], ['Manchester Ship Canal', 4, 5, PL()],
    ['Rideau Canal', 4, 4, PL()], ['Welland Canal', 5, 5, PL()], ["Regent's Canal", 4, 4, PL()], ['Grand Union Canal', 4, 4, PL()],
    ['Caledonian Canal', 4, 4, PL()], ['Bridgewater Canal', 5, 5, PL()], ['Volga-Don Canal', 5, 5, PL()], ['Karakum Canal', 5, 5, PL()],
    ['Albert Canal', 5, 5, PL()], ['Canal Saint-Martin', 5, 5, PL()], ['Cape Cod Canal', 4, 4, PL()], ['Gota Canal', 5, 5, PL()],
    ['Navigli', 5, 5, PL()], ['Midland Canal', 5, 5, PL({ g: 'Germany' })], ['Trent-Severn Waterway', 5, 5, PL()],
    ['Chicago Sanitary Canal', 5, 5, PL()], ['Amsterdam canal ring', 4, 5, PL({ g: 'Amsterdam' })],
  ],

  // ---------------------------------------------------------------- nautical directions
  nautical_directions: [
    ['starboard', 2, 2, { al: [syn('starboard side', 3, 3)] }], ['port', 2, 3, { g: 'ship left' , al: [syn('port side', 3, 3), syn('larboard', 5, 5)] }],
    ['bow', 2, 3, { g: 'ship front' }], ['stern', 2, 2], ['aft', 3, 3], ['fore', 3, 4, { g: 'ship front' }], ['astern', 4, 4], ['ahead', 2, 4, { g: 'ship direction' }],
    ['leeward', 4, 4], ['windward', 3, 3], ['amidships', 4, 4], ['abeam', 5, 5], ['abaft', 5, 5], ['fore and aft', 3, 3], ['dead ahead', 3, 3],
    ['downwind', 3, 4], ['upwind', 3, 4], ['lee', 4, 4, { g: 'shelter' }], ['broadside', 3, 4, { g: 'ship side' }], ['beam', 3, 4, { g: 'ship width' }],
    ['forward', 2, 4, { g: 'ship front' }], ['to port', 3, 3], ['to starboard', 3, 3], ['weather side', 5, 5], ['hard a-lee', 5, 5], ['stem to stern', 4, 4],
    ['below deck', 2, 3], ['topside', 4, 4], ['seaward', 4, 4], ['landward', 4, 4], ['alee', 5, 5], ['inboard', 4, 4], ['outboard', 3, 4],
  ],

  // ---------------------------------------------------------------- ship crew
  ship_crew: [
    ['captain', 1, 1], ['sailor', 1, 1], ['first mate', 2, 1], ['deckhand', 3, 1], ['cabin boy', 2, 2], ['skipper', 2, 2], ['navigator', 2, 3],
    ['seaman', 2, 2], ['mariner', 2, 2], ['steward', 2, 3, { g: 'ship' }], ['lookout', 2, 3], ['mate', 2, 3, { g: 'ship' }], ['shipmate', 3, 3],
    ['first officer', 2, 2], ['bosun', 3, 3, { al: [syn('boatswain', 3, 3)] }], ['purser', 3, 3], ['helmsman', 3, 3], ['quartermaster', 3, 3],
    ["ship's cook", 3, 2], ['chief engineer', 3, 3], ['pilot', 3, 3, { g: 'harbor' }], ['stoker', 4, 4], ['midshipman', 4, 3], ['coxswain', 4, 4, { al: [syn('cox', 4, 4)] }],
    ['powder monkey', 4, 4], ['able seaman', 4, 3], ['ordinary seaman', 4, 4], ['deck officer', 4, 4], ['rigger', 5, 4], ['ship\'s surgeon', 4, 3],
    ["ship's carpenter", 4, 4], ['sailmaker', 5, 5], ['cooper', 5, 5, { g: 'ship' }], ['ship\'s doctor', 3, 3],
  ],

  // ---------------------------------------------------------------- submarine words
  submarine_words: [
    ['periscope', 2, 1], ['torpedo', 2, 2], ['sonar', 2, 2], ['U-boat', 2, 2], ['Yellow Submarine', 2, 3, { type: 'title', tm: true }],
    ['conning tower', 3, 3], ['depth charge', 3, 3], ['airlock', 2, 3], ['snorkel', 3, 4, { g: 'submarine' }], ['torpedo tube', 3, 3],
    ['depth gauge', 3, 3], ['escape hatch', 3, 3], ['submariner', 3, 2], ['Trieste', 5, 5, P({ g: 'bathyscaphe' })], ['ballast tank', 4, 4],
    ['pressure hull', 4, 4], ['dive planes', 4, 4], ['crush depth', 4, 4], ['bathyscaphe', 4, 4], ['silent running', 4, 4], ['wolf pack', 4, 4],
    ['hydroplane', 4, 5, { g: 'submarine' }], ['sonar operator', 4, 4], ['Alvin', 5, 5, P({ g: 'submersible' })], ['minisub', 4, 4],
    ['missile tube', 4, 4], ['diving bell', 3, 4], ['sail', 3, 5, { g: 'submarine tower' }], ['dive alarm', 5, 5], ['pressure vessel', 5, 5],
  ],

  // ---------------------------------------------------------------- train types
  train_types: [
    ['steam train', 1, 1, { }], ['bullet train', 1, 1, { al: [syn('Shinkansen', 3, 3, ['JP'], P())] }], ['freight train', 1, 1, { al: [syn('goods train', 2, 2, ['UK'])] }],
    ['passenger train', 1, 1], ['diesel train', 2, 2], ['electric train', 2, 2], ['commuter train', 2, 2], ['high-speed train', 2, 2],
    ['monorail', 2, 2], ['express train', 2, 2], ['local train', 2, 2], ['sleeper train', 2, 2, { al: [syn('night train', 2, 2)] }], ['coal train', 2, 2],
    ['toy train', 1, 2], ['luxury train', 2, 2], ['maglev', 3, 3], ['light rail', 3, 3], ['funicular', 3, 3], ['mail train', 3, 3], ['excursion train', 3, 3],
    ['circus train', 3, 3], ['regional train', 3, 3], ['intercity train', 3, 3], ['cog railway', 4, 4, { al: [syn('rack railway', 4, 4)] }],
    ['narrow gauge', 4, 4], ['heritage railway', 4, 4, { reg: ['UK'] }], ['handcar', 4, 4], ['tilting train', 4, 4], ['Pullman car', 4, 4],
    ['boat train', 4, 4, { reg: ['UK'] }], ['DMU', 5, 5, AC()],
  ],

  // ---------------------------------------------------------------- parts of a train
  parts_of_a_train: [
    ['locomotive', 2, 2, { }], ['carriage', 2, 2, { g: 'train' }], ['dining car', 2, 2], ['sleeping car', 2, 2],
    ['passenger car', 2, 2], ['whistle', 1, 2, { g: 'train' }], ['caboose', 3, 3, { al: [syn("guard's van", 4, 4, ['UK'])] }], ['boxcar', 3, 3],
    ['smokestack', 3, 3, { al: [syn('funnel', 3, 4, [], { g: 'train' })] }], ['coupling', 3, 3, { g: 'train' }, { al: [syn('coupler', 4, 4)] }], ['tank car', 3, 3], ['flatcar', 3, 3],
    ['observation car', 3, 3], ['buffet car', 3, 3], ['driver\'s cab', 3, 3], ['railcar', 3, 3], ['tender', 4, 4, { g: 'train' }], ['cab', 2, 3, { g: 'train' }],
    ['pantograph', 4, 4], ['cowcatcher', 4, 4], ['firebox', 4, 4], ['boiler', 3, 4, { g: 'train' }], ['buffer', 3, 3, { g: 'train' }], ['bogie', 4, 4],
    ['hopper car', 4, 4], ['air brake', 4, 4], ['brake van', 4, 4, { reg: ['UK'] }], ['luggage van', 4, 4, { reg: ['UK'] }], ['wheelset', 5, 5],
    ['traction motor', 5, 5], ['smoke box', 5, 5], ['steam dome', 5, 5], ['sleeper', 3, 4, { g: 'train car' }],
  ],

  // ---------------------------------------------------------------- railway words
  railway_words: [
    ['railway track', 1, 2, { al: [syn('railroad track', 1, 2, ['US'])] }], ['timetable', 2, 3], ['tunnel', 1, 3, { g: 'railway' }], ['signal', 2, 3, { g: 'railway' }],
    ['level crossing', 2, 2, { reg: ['UK'], al: [syn('grade crossing', 4, 4, ['US']), syn('railroad crossing', 2, 2, ['US'])] }],
    ['viaduct', 3, 3], ['junction', 3, 3, { g: 'railway' }], ['siding', 3, 3], ['turntable', 3, 3], ['third rail', 3, 3], ['branch line', 3, 3], ['main line', 3, 3],
    ['derailment', 3, 3], ['whistle stop', 3, 3, { reg: ['US'] }], ['rolling stock', 4, 4], ['roundhouse', 4, 4], ['trestle', 4, 4], ['buffer stop', 4, 4],
    ['marshalling yard', 4, 4, { al: [syn('classification yard', 5, 5, ['US'])] }], ['embankment', 4, 4], ['railway gauge', 4, 4],
    ['points', 4, 4, { g: 'railway', reg: ['UK'], al: [syn('switch', 3, 4, ['US'], { g: 'railway' })] }], ['ballast', 4, 4, { g: 'railway' }],
    ['railway sleeper', 3, 3, { reg: ['UK'], al: [syn('railroad tie', 3, 3, ['US'])] }], ['catenary', 5, 5], ['railhead', 5, 5], ['railway cutting', 4, 4], ['right-of-way', 4, 4],
    ['permanent way', 5, 5, { reg: ['UK'] }], ['rail gauge', 4, 4], ['track bed', 5, 5], ['railway line', 1, 2],
  ],

  // ---------------------------------------------------------------- station words
  station_words: [
    ['platform', 1, 1, { g: 'station' }], ['ticket office', 2, 2], ['waiting room', 2, 2], ['ticket machine', 2, 2], ['arrivals board', 2, 2],
    ['departures board', 2, 2], ['timetable', 2, 3], ['information desk', 2, 2], ['station clock', 2, 2], ['kiosk', 2, 3], ['luggage trolley', 3, 3],
    ['concourse', 3, 3], ['ticket barrier', 3, 3], ['left luggage', 3, 3, { reg: ['UK'] }], ['turnstile', 3, 3], ['stationmaster', 3, 3],
    ['lost property', 3, 3, { reg: ['UK'] }], ['ticket inspector', 3, 3], ['terminus', 3, 3, { al: [syn('terminal', 2, 3, [], { g: 'station' })] }],
    ['mind the gap', 2, 3, { type: 'phrase' }], ['interchange', 3, 3, { g: 'station' }], ['railcard', 3, 3, { reg: ['UK'] }], ['footbridge', 4, 4],
    ['ticket hall', 4, 4, { reg: ['UK'] }], ['Tannoy', 4, 4, { tm: true, reg: ['UK'], g: 'station announcer' }], ['bay platform', 5, 5], ['platform edge', 3, 3],
    ['yellow line', 3, 3], ['ticket gate', 3, 3], ['track number', 4, 4], ['station staff', 3, 3], ['commuter rush', 4, 4],
  ],

  // ---------------------------------------------------------------- famous trains
  famous_trains: [
    ['Orient Express', 2, 1, { type: 'proper' }], ['Hogwarts Express', 2, 2, { type: 'proper', tm: true }], ['Thomas the Tank Engine', 1, 2, { type: 'proper', tm: true }],
    ['Polar Express', 2, 2, { type: 'title', tm: true }], ['Eurostar', 2, 2, O()], ['Flying Scotsman', 3, 2, { type: 'proper', reg: ['UK'] }],
    ['Trans-Siberian', 3, 3, P()], ['Shinkansen', 3, 3, P()], ['TGV', 3, 3, AC()], ['Chattanooga Choo Choo', 4, 3, { type: 'title', tm: true }],
    ['Blue Train', 4, 3, P({ g: 'South Africa' })], ['Rocky Mountaineer', 4, 4, P()], ['The Ghan', 4, 4, P({ reg: ['AU'] })], ['Indian Pacific', 4, 4, P({ reg: ['AU'] })],
    ['Acela', 4, 4, P({ tm: true, reg: ['US'] })], ['Thalys', 4, 4, P()], ['Mallard', 4, 4, P({ g: 'locomotive', reg: ['UK'] })], ["Stephenson's Rocket", 4, 4, P()],
    ['Golden Arrow', 4, 4, P({ g: 'train' })], ['Glacier Express', 4, 4, P()], ['California Zephyr', 4, 4, P({ reg: ['US'] })], ['Jacobite', 4, 4, P({ g: 'steam train', reg: ['UK'] })],
    ['Brighton Belle', 5, 5, P({ reg: ['UK'] })], ['Royal Scotsman', 5, 5, P({ reg: ['UK'] })], ['Bernina Express', 5, 5, P()], ['Empire Builder', 5, 5, P({ reg: ['US'] })],
    ['Coast Starlight', 5, 5, P({ reg: ['US'] })], ['Pride of Africa', 5, 5, P()], ['Caledonian Sleeper', 5, 5, P({ reg: ['UK'] })], ['Santa Fe Super Chief', 5, 5, P({ reg: ['US'] })],
    ['Hiawatha', 5, 5, P({ g: 'train' })], ['Venice Simplon', 5, 5, P()],
  ],

  // ---------------------------------------------------------------- metro systems
  metro_systems: [
    ['London Underground', 1, 2, P({ al: [syn('Tube', 2, 2, ['UK'], { type: 'proper', g: 'London' }), syn('the Underground', 2, 3, ['UK'], { type: 'proper' })] })],
    ['New York subway', 2, 2, P({ al: [syn('NYC Subway', 2, 3, [], { type: 'proper' })] })], ['Paris Metro', 2, 2, P()], ['Moscow Metro', 3, 3, P()],
    ['Tokyo Metro', 3, 3, P()], ['Delhi Metro', 3, 3, P()], ['Washington Metro', 3, 3, P()], ['U-Bahn', 3, 3, P({ reg: ['DE'] })], ['S-Bahn', 4, 4, P({ reg: ['DE'] })],
    ['BART', 4, 4, AC({ reg: ['US'] })], ['MTR', 4, 4, AC({ reg: ['HK'] })], ['the El', 4, 4, P({ reg: ['US'], g: 'Chicago' })], ['DLR', 4, 4, AC({ reg: ['UK'] })],
    ['Overground', 4, 4, P({ reg: ['UK'] })], ['RER', 4, 4, AC({ reg: ['FR'] })], ['Seoul Metro', 4, 4, P()], ['Elizabeth line', 4, 4, P({ reg: ['UK'] })],
    ['MRT', 4, 4, AC({ reg: ['SG'] })], ['Skytrain', 4, 4, P({ g: 'metro' })], ['Marmaray', 5, 5, P({ reg: ['TR'] })], ['MARTA', 5, 5, AC({ reg: ['US'] })],
    ['Subte', 5, 5, P({ reg: ['AR'] })], ['Tunnelbana', 5, 5, P({ reg: ['SE'] })], ['PATH', 5, 5, AC({ reg: ['US'], g: 'train' })], ['Glasgow Subway', 5, 5, P({ reg: ['UK'] })],
    ['Santiago Metro', 5, 5, P()], ['Metrorail', 5, 5, P()], ['TTC', 5, 5, AC({ reg: ['CA'] })], ['Tyne and Wear Metro', 5, 5, P({ reg: ['UK'] })],
  ],

  // ---------------------------------------------------------------- famous train stations
  famous_train_stations: [
    ['Grand Central', 2, 2, PL({ al: [syn('Grand Central Terminal', 3, 3, [], PL())] })], ["King's Cross", 2, 2, PL({ reg: ['UK'] })], ['Paddington', 2, 3, PL({ g: 'station' })],
    ['Clapham Junction', 4, 4, PL()], ['Penn Station', 3, 3, PL({ al: [syn('Pennsylvania Station', 3, 3, [], PL())] })], ['Victoria', 3, 3, PL({ g: 'station' })],
    ['St Pancras', 3, 3, PL()], ['Euston', 3, 4, PL()], ['Liverpool Street', 3, 3, PL()], ['Gare du Nord', 3, 3, PL()], ['Shinjuku', 3, 3, PL({ g: 'station' })],
    ['Tokyo Station', 3, 3, PL()], ['Union Station', 3, 3, PL()], ['Central Station', 3, 3, PL()], ['Gare de Lyon', 4, 4, PL()], ['Milano Centrale', 4, 4, PL()],
    ['Berlin Hauptbahnhof', 4, 4, PL()], ['Atocha', 4, 5, PL()], ['Kyoto Station', 4, 4, PL()], ['Flinders Street', 4, 4, PL({ reg: ['AU'] })],
    ['Antwerp Central', 4, 4, PL()], ['Gare Montparnasse', 4, 4, PL()], ['Saint-Lazare', 4, 4, PL()], ['Haydarpasa', 5, 5, PL()], ['Termini', 5, 5, PL({ g: 'Rome' })],
    ['Victoria Terminus', 5, 5, PL()], ['Chhatrapati Shivaji', 5, 5, PL()], ['Gare de lEst', 5, 5, PL()], ['Kazansky', 5, 5, PL()], ['Zurich Hauptbahnhof', 5, 5, PL()],
    ['Gare dAusterlitz', 5, 5, PL()], ['Hauptbahnhof Vienna', 5, 5, PL()],
  ],

  // ---------------------------------------------------------------- railroad jobs
  railroad_jobs: [
    ['conductor', 2, 2, { g: 'train' }], ['train driver', 2, 2, { reg: ['UK'] }], ['ticket collector', 2, 2], ['porter', 2, 3, { g: 'railway' }],
    ['signalman', 3, 3], ['stoker', 3, 3], ['brakeman', 3, 3], ['guard', 3, 3, { g: 'train', reg: ['UK'] }],
    ['station master', 3, 3], ['track worker', 3, 3], ['ticket inspector', 3, 3], ['train attendant', 3, 3], ['Pullman porter', 4, 4, { type: 'title' }],
    ['switchman', 4, 4], ['dispatcher', 4, 4, { g: 'train' }], ['yardmaster', 4, 4], ['flagman', 4, 4], ['navvy', 4, 4, { reg: ['UK'] }],
    ['gandy dancer', 5, 5], ['platelayer', 5, 5, { reg: ['UK'] }], ['lengthman', 5, 5, { reg: ['UK'] }], ['trackwalker', 5, 5], ['section hand', 5, 5],
    ['brakie', 5, 5], ['hostler', 5, 5], ['trainmaster', 5, 5], ['locomotive engineer', 3, 3], ['railway porter', 3, 3],
  ],

  // ---------------------------------------------------------------- bicycle parts
  bicycle_parts: [
    ['handlebars', 1, 1], ['pedal', 1, 1], ['spokes', 2, 2], ['chain', 1, 2, { g: 'bicycle' }], ['saddle', 2, 2], ['frame', 2, 3, { g: 'bicycle' }], ['brakes', 1, 2, { g: 'bicycle' }],
    ['gears', 1, 2, { g: 'bicycle' }], ['bike tire', 1, 2, { al: [spell('bike tyre', 1, 2, ['UK'])] }], ['inner tube', 2, 2], ['bell', 1, 2, { g: 'bicycle' }],
    ['kickstand', 3, 2], ['training wheels', 1, 2], ['reflector', 2, 3], ['basket', 2, 3, { g: 'bicycle' }], ['mudguard', 3, 3, { reg: ['UK'], al: [syn('fender', 3, 3, ['US'], { g: 'bicycle' })] }],
    ['fork', 3, 3, { g: 'bicycle' }], ['crank', 3, 3, { g: 'bicycle' }], ['derailleur', 3, 3], ['sprocket', 3, 3], ['seatpost', 3, 3], ['brake pad', 3, 3],
    ['hub', 3, 3, { g: 'bicycle wheel' }], ['rim', 3, 3, { g: 'bicycle wheel' }], ['pannier', 4, 4], ['cassette', 4, 4, { g: 'bicycle' }], ['chainring', 4, 4],
    ['headset', 4, 4, { g: 'bicycle' }], ['stem', 4, 4, { g: 'bicycle' }], ['shifter', 4, 4], ['freewheel', 4, 4], ['quick release', 4, 4], ['top tube', 4, 4],
    ['bottom bracket', 5, 5], ['down tube', 5, 5], ['dropouts', 5, 5], ['spoke nipple', 5, 5],
  ],

  // ---------------------------------------------------------------- bike types
  bike_types: [
    ['mountain bike', 1, 1], ['road bike', 1, 1], ['tricycle', 1, 1, { al: [syn('trike', 2, 2, [], { g: 'bicycle' })] }], ['BMX', 2, 2, AC()], ['tandem', 2, 2],
    ['electric bike', 2, 2, { al: [syn('e-bike', 2, 2)] }], ['racing bike', 2, 2], ['folding bike', 2, 2], ['bicycle', 1, 1, { al: [syn('pushbike', 3, 3, ['UK'])] }],
    ['unicycle', 2, 3], ['cruiser', 3, 3, { g: 'bike' }], ['hybrid bike', 3, 3], ['touring bike', 3, 3], ['penny-farthing', 3, 3, { al: [syn('high wheeler', 5, 5)] }],
    ['cargo bike', 3, 3], ['balance bike', 3, 3], ['city bike', 3, 3], ['commuter bike', 3, 3], ['recumbent', 4, 4], ['fixie', 4, 4, { al: [syn('fixed-gear bike', 4, 4)] }],
    ['gravel bike', 4, 4], ['lowrider', 5, 5], ['track bike', 4, 4], ['fat bike', 4, 4], ['beach cruiser', 4, 4],
    ['hardtail', 5, 5], ['velocipede', 5, 5], ['cyclocross bike', 5, 5], ['pedelec', 5, 5], ['quadricycle', 5, 5], ['bone shaker', 5, 5],
  ],

  // ---------------------------------------------------------------- motorcycle brands
  motorcycle_brands: [
    ['Harley-Davidson', 1, 1, O({ al: [syn('Harley', 1, 1)] })], ['Honda', 1, 1, O()], ['Yamaha', 2, 2, O()], ['Suzuki', 2, 2, O()], ['Kawasaki', 2, 2, O()],
    ['Ducati', 2, 2, O()], ['BMW', 1, 2, O({ type: 'acronym' })], ['Triumph', 2, 2, O({ g: 'motorcycle' })], ['Vespa', 3, 3, O()], ['Indian', 3, 3, O({ g: 'motorcycle' })],
    ['Royal Enfield', 3, 3, O()], ['KTM', 4, 4, O({ type: 'acronym' })], ['Piaggio', 4, 4, O()], ['Aprilia', 4, 4, O()], ['Moto Guzzi', 4, 4, O()],
    ['Norton', 4, 4, O({ reg: ['UK'] })], ['BSA', 4, 4, O({ type: 'acronym', reg: ['UK'] })], ['Husqvarna', 4, 4, O()], ['Matchless', 5, 5, O()],
    ['Bajaj', 4, 4, O({ reg: ['IN'] })], ['Lambretta', 4, 4, O()], ['MV Agusta', 5, 5, O()], ['Buell', 5, 5, O()], ['Cagiva', 5, 5, O()], ['Benelli', 5, 5, O()],
    ['Vincent', 5, 5, O({ g: 'motorcycle' })], ['Brough Superior', 5, 5, O()], ['Ural', 5, 5, O({ g: 'motorcycle' })], ['Gilera', 5, 5, O()], ['TVS', 5, 5, O({ type: 'acronym', reg: ['IN'] })],
    ['Hesketh', 5, 5, O()], ['Zero', 4, 4, O({ g: 'electric motorcycle' })],
  ],

  // ---------------------------------------------------------------- motorcycle types
  motorcycle_types: [
    ['motorcycle', 1, 1, { al: [syn('motorbike', 1, 1, ['UK'])] }], ['moped', 2, 2], ['dirt bike', 2, 2], ['motor scooter', 2, 2], ['custom chopper', 3, 3],
    ['cruiser', 3, 3, { g: 'motorcycle' }], ['sidecar', 3, 3], ['sport bike', 2, 3, { al: [syn('superbike', 3, 3)] }], ['motocross bike', 3, 3], ['quad bike', 3, 3],
    ['trike', 3, 3, { g: 'motorcycle' }], ['cafe racer', 4, 4], ['adventure bike', 4, 4], ['scrambler', 4, 4], ['bobber', 4, 4], ['enduro', 4, 5], ['minibike', 4, 4],
    ['hog', 4, 4, { g: 'motorcycle' }], ['touring motorcycle', 3, 3], ['naked bike', 5, 5], ['dual-sport', 5, 5], ['pit bike', 5, 5], ['trials bike', 5, 5],
    ['pocket bike', 5, 5], ['streetfighter', 5, 5, { g: 'motorcycle' }], ['police motorcycle', 3, 3], ['electric motorcycle', 3, 3], ['standard bike', 4, 4],
    ['bagger', 5, 5], ['sports tourer', 5, 5], ['racing motorcycle', 3, 3],
  ],

  // ---------------------------------------------------------------- cycling races
  cycling_races: [
    ['Tour de France', 1, 1, P({ al: [syn('Le Tour', 2, 2, [], P())] })], ["Giro d'Italia", 3, 3, P({ al: [syn('the Giro', 4, 4, [], P())] })],
    ['Vuelta a Espana', 4, 4, P({ al: [syn('the Vuelta', 4, 4, [], P()), spell('Vuelta a España', 4, 4, [], P())] })], ['Paris-Roubaix', 4, 4, P({ al: [syn('Hell of the North', 5, 5, [], P())] })],
    ['Tour of Flanders', 4, 4, P()], ['Milan-San Remo', 5, 5, P()], ['Liege-Bastogne-Liege', 5, 5, P()], ['Il Lombardia', 5, 5, P()], ['Tour Down Under', 4, 4, P({ reg: ['AU'] })],
    ['Tour of Britain', 4, 4, P({ reg: ['UK'] })], ['Tour de Suisse', 5, 5, P()], ['Paris-Nice', 4, 4, P()], ['Tirreno-Adriatico', 5, 5, P()], ['Amstel Gold Race', 5, 5, P()],
    ['Fleche Wallonne', 5, 5, P()], ['Strade Bianche', 5, 5, P()], ['Gent-Wevelgem', 5, 5, P()], ['Tour of California', 4, 4, P()], ['Tour de Pologne', 5, 5, P()],
    ['Tour de Romandie', 5, 5, P()], ['Race Across America', 4, 4, P()], ['Paris-Brest-Paris', 5, 5, P()], ['Tour de Yorkshire', 5, 5, P({ reg: ['UK'] })],
    ['Criterium du Dauphine', 5, 5, P()], ['Giro Rosa', 5, 5, P()], ['Tour of Oman', 5, 5, P()], ['Tour of Utah', 5, 5, P()], ['Tour de Luxembourg', 5, 5, P()],
    ['Tour of Turkey', 5, 5, P()], ['Tour of Qatar', 5, 5, P()], ['Tour of Guangxi', 5, 5, P()],
  ],

  // ---------------------------------------------------------------- cycling words
  cycling_words: [
    ['cyclist', 1, 2], ['bike lane', 1, 3, { al: [syn('cycle lane', 2, 3, ['UK'])] }], ['flat tire', 1, 3, { al: [syn('puncture', 2, 3, ['UK'], { g: 'tire' })] }],
    ['yellow jersey', 2, 2], ['lycra', 2, 3], ['headwind', 2, 3], ['wheelie', 2, 3], ['chase group', 5, 5], ['breakaway', 3, 3, { g: 'cycling' }],
    ['polka dot jersey', 3, 3, { al: [syn('King of the Mountains', 4, 4, [], { type: 'title' })] }], ['drafting', 3, 3, { al: [syn('slipstream', 3, 3, [], { g: 'cycling' })] }],
    ['time trial', 3, 3], ['stage', 3, 4, { g: 'cycling' }], ['cadence', 3, 3], ['saddle sore', 3, 3], ['velodrome', 3, 3], ['domestique', 4, 4],
    ['bunch sprint', 4, 4], ['cyclocross', 4, 4], ['team car', 4, 4], ['century ride', 4, 4], ['echelon', 5, 5], ['bonk', 5, 5, { g: 'cycling' }],
    ['lanterne rouge', 5, 5], ['grupetto', 5, 5], ['criterium', 5, 5], ['feed zone', 5, 5], ['hors categorie', 5, 5], ['sag wagon', 5, 5, { al: [syn('broom wagon', 5, 5)] }],
    ['keirin', 5, 5], ['gran fondo', 5, 5], ['clipless', 5, 5], ['bib shorts', 4, 4], ['cleats', 3, 3, { g: 'cycling' }],
  ],

  // ---------------------------------------------------------------- skateboard tricks
  skateboard_tricks: [
    ['ollie', 2, 2], ['kickflip', 3, 2], ['grind', 2, 3, { g: 'skateboard' }], ['fakie', 3, 3], ['heelflip', 3, 3], ['shove-it', 3, 3], ['pop shove-it', 3, 3],
    ['manual', 3, 3, { g: 'skateboard' }], ['360 flip', 3, 3, { al: [syn('tre flip', 4, 4)] }], ['drop-in', 3, 3], ['kickturn', 3, 3], ['carve', 3, 3, { g: 'skateboard' }],
    ['900', 3, 3, { g: 'skateboard trick' }], ['nollie', 4, 4], ['boardslide', 4, 4], ['50-50', 4, 4], ['5-0', 4, 4], ['nosegrind', 4, 4], ['tailslide', 4, 4], ['noseslide', 4, 4],
    ['indy grab', 4, 4], ['melon grab', 4, 4], ['method air', 4, 4], ['hardflip', 4, 4], ['varial', 4, 4], ['McTwist', 4, 4], ['switch stance', 4, 4], ['wallride', 4, 4],
    ['revert', 4, 4], ['powerslide', 4, 4], ['tic-tac', 4, 4], ['handplant', 4, 4], ['bluntslide', 4, 4, { al: [syn('blunt', 4, 4, [], { g: 'skateboard' })] }],
    ['mute grab', 5, 5], ['ollie north', 5, 5], ['rock to fakie', 5, 5], ['caveman', 5, 5, { g: 'skateboard' }], ['primo', 5, 5, { g: 'skateboard' }],
    ['casper', 5, 5, { g: 'skateboard' }], ['bigspin', 5, 5], ['laser flip', 5, 5], ['darkslide', 5, 5], ['boneless', 5, 5], ['impossible', 4, 4, { g: 'skateboard' }],
  ],

  // ---------------------------------------------------------------- scooters and skates
  scooters_and_skates: [
    ['skateboard', 1, 1], ['roller skates', 1, 1], ['ice skates', 1, 2, { al: [syn('figure skates', 2, 3)] }], ['kick scooter', 2, 2, { }],
    ['inline skates', 2, 2, { al: [syn('Rollerblades', 2, 2, [], { tm: true })] }], ['hoverboard', 2, 3], ['unicycle', 2, 3], ['electric scooter', 2, 2], ['e-scooter', 3, 3],
    ['Segway', 3, 3, { tm: true, type: 'org' }], ['longboard', 3, 3], ['stunt scooter', 3, 3], ['speed skates', 3, 3], ['mobility scooter', 3, 4],
    ['penny board', 4, 4], ['quad skates', 4, 4], ['Heelys', 4, 4, { tm: true, type: 'org' }], ['electric skateboard', 4, 4], ['Ripstik', 5, 5, { tm: true, type: 'org' }],
    ['Onewheel', 5, 5, { tm: true, type: 'org' }], ['rollerskis', 5, 5], ['snakeboard', 5, 5, { tm: true }], ['caster board', 5, 5], ['pogo stick', 2, 4],
    ['roller shoes', 3, 3], ['Razor scooter', 2, 2, { tm: true, type: 'org' }], ['scooter', 1, 1], ['skates', 1, 1], ['wave board', 5, 5],
  ],

  // ---------------------------------------------------------------- motorcycle parts
  motorcycle_parts: [
    ['handlebars', 1, 1], ['headlight', 1, 2], ['engine', 1, 3, { g: 'machine' }], ['fuel tank', 2, 2], ['exhaust pipe', 2, 2, { al: [syn('exhaust', 2, 3)] }], ['tail light', 2, 3],
    ['speedometer', 2, 3], ['kickstand', 3, 2], ['throttle', 3, 3], ['front fork', 3, 3], ['carburetor', 3, 3, { al: [spell('carburettor', 3, 3, ['UK'])] }],
    ['saddlebag', 3, 3], ['disc brake', 3, 3], ['brake lever', 3, 3], ['shock absorber', 3, 3], ['drive chain', 3, 3], ['spark plug', 3, 4],
    ['clutch lever', 4, 4], ['fairing', 4, 4], ['foot peg', 4, 4], ['tachometer', 4, 4, { al: [syn('rev counter', 4, 4, ['UK'])] }], ['kick starter', 4, 4],
    ['side stand', 4, 4], ['gearshift', 4, 4], ['fuel injector', 4, 4], ['swingarm', 5, 5], ['sissy bar', 5, 5], ['crash bar', 5, 5], ['centre stand', 5, 5, { reg: ['UK'] }],
    ['crankcase', 5, 5], ['fuel cap', 4, 4], ['rear-view mirror', 2, 3], ['wing mirror', 2, 3, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- skate park features
  skate_park_features: [
    ['half-pipe', 2, 2, { al: [spell('halfpipe', 2, 2)] }], ['quarter pipe', 3, 3, { al: [spell('quarterpipe', 3, 3)] }], ['ramp', 1, 3, { g: 'skate park' }], ['handrail', 3, 3],
    ['grind rail', 3, 3], ['skate bowl', 3, 3], ['mini ramp', 3, 3], ['stair set', 4, 4], ['funbox', 4, 4], ['grind ledge', 4, 4], ['bank ramp', 4, 4], ['kicker', 4, 4, { g: 'ramp' }],
    ['launch ramp', 4, 4], ['vert ramp', 4, 4], ['skate pool', 4, 4], ['flat bar', 4, 4], ['skate plaza', 4, 4], ['manual pad', 5, 5], ['spine ramp', 5, 5], ['hip ramp', 5, 5],
    ['snake run', 5, 5], ['coping', 5, 5], ['roll-in', 5, 5], ['step-up', 5, 5], ['pump bump', 5, 5], ['euro gap', 5, 5], ['wedge ramp', 5, 5],
    ['hubba ledge', 5, 5], ['down rail', 5, 5], ['launch box', 5, 5], ['skate park', 1, 2], ['concrete bowl', 4, 4], ['pyramid ramp', 5, 5],
  ],

  // ---------------------------------------------------------------- skateboard parts
  skateboard_parts: [
    ['deck', 2, 2, { g: 'skateboard' }], ['trucks', 3, 3, { g: 'skateboard' }], ['skateboard wheels', 2, 2], ['bearings', 3, 3], ['grip tape', 3, 3, { al: [spell('griptape', 3, 3)] }],
    ['bolts', 2, 3], ['tail', 2, 4, { g: 'skateboard' }], ['kingpin', 4, 4], ['bushings', 4, 4], ['riser pads', 4, 4], ['truck axle', 4, 4],
    ['hanger', 4, 4, { g: 'skateboard' }], ['baseplate', 5, 5], ['concave', 4, 4], ['nose guard', 5, 5], ['tail guard', 5, 5], ['wheel bite', 5, 5], ['urethane', 5, 5],
    ['hardware', 4, 4, { g: 'skateboard' }], ['bearing spacer', 5, 5], ['speed rings', 5, 5], ['pivot cup', 5, 5], ['kicktail', 4, 4], ['wheelbase', 4, 4], ['tail skid', 5, 5],
    ['lock nuts', 4, 4], ['washers', 4, 4, { g: 'skateboard' }], ['wood plies', 5, 5], ['maple deck', 4, 4],
  ],

  // ---------------------------------------------------------------- kinds of travelers
  kinds_of_travelers: [
    ['tourist', 1, 1, { al: [syn('sightseer', 3, 3)] }], ['passenger', 1, 3], ['commuter', 1, 2], ['explorer', 1, 3], ['backpacker', 2, 2], ['nomad', 2, 3], ['pilgrim', 2, 2],
    ['hitchhiker', 2, 2], ['traveler', 1, 1, { al: [spell('traveller', 1, 1, ['UK'])] }], ['adventurer', 2, 3], ['globetrotter', 3, 3], ['wanderer', 3, 3], ['vagabond', 3, 3],
    ['drifter', 3, 3], ['voyager', 3, 3], ['jet-setter', 3, 3, { al: [spell('jetsetter', 3, 3)] }], ['holidaymaker', 3, 3, { reg: ['UK'] }], ['vacationer', 3, 3, { reg: ['US'] }],
    ['digital nomad', 3, 3], ['trekker', 3, 3], ['stowaway', 3, 4], ['day tripper', 4, 4, { al: [syn('tripper', 4, 4, ['UK'])] }], ['wayfarer', 4, 4], ['snowbird', 4, 4, { reg: ['US'] }],
    ['rambler', 4, 4, { g: 'hiker', reg: ['UK'] }], ['cruise passenger', 3, 3], ['flashpacker', 5, 5], ['sojourner', 5, 5], ['itinerant', 5, 5], ['expat', 3, 4],
    ['pilgrim traveler', 4, 4], ['road warrior', 4, 4],
  ],

  // ---------------------------------------------------------------- travel verbs
  travel_verbs: [
    ['travel', 1, 1, verb()], ['arrive', 1, 1, verb()], ['depart', 2, 2, verb()], ['visit', 1, 3, verb()], ['journey', 2, 2, verb()], ['wander', 2, 3, verb()],
    ['commute', 2, 2, verb()], ['board', 2, 3, verb({ g: 'get on' })], ['explore', 2, 3, verb()], ['set off', 2, 2, verb({ al: [syn('set out', 2, 2, [], verb())] })],
    ['check in', 2, 3, verb()], ['tour', 2, 2, verb()], ['embark', 3, 3, verb()], ['roam', 3, 3, verb()], ['hitchhike', 3, 3, verb()], ['voyage', 3, 3, verb()],
    ['trek', 3, 3, verb()], ['sightsee', 3, 3, verb()], ['traverse', 3, 4, verb()], ['disembark', 3, 3, verb({ al: [syn('alight', 4, 4, ['UK'], verb({ g: 'train' }))] })],
    ['jet off', 3, 3, verb()], ['detour', 3, 3, verb()], ['ramble', 3, 4, verb({ g: 'walk' })], ['meander', 3, 4, verb()], ['island-hop', 3, 3, verb()], ['migrate', 3, 4, verb()],
    ['stop over', 3, 3, verb()], ['rove', 4, 4, verb()], ['gallivant', 5, 5, verb()], ['traipse', 5, 5, verb()], ['globetrot', 5, 5, verb()], ['sojourn', 5, 5, verb()], ['wend', 5, 5, verb()],
  ],

  // ---------------------------------------------------------------- famous routes
  famous_routes: [
    ['Silk Road', 2, 2, P()], ['Route 66', 2, 2, P({ al: [syn('Mother Road', 4, 4, ['US'], P())] })], ['Appalachian Trail', 2, 2, P()], ['Oregon Trail', 2, 2, P()],
    ['Camino de Santiago', 3, 3, P({ al: [syn('Camino', 3, 3, [], P()), syn('Way of St James', 5, 5, [], P())] })], ['Pan-American Highway', 3, 3, P()], ['Spice Route', 3, 3, P()],
    ['Pacific Crest Trail', 3, 3, P()], ['Trans-Siberian Railway', 3, 3, P()], ['Inca Trail', 3, 3, P()], ['Appian Way', 3, 3, P()], ['Trans-Canada Highway', 3, 3, P()],
    ['Alaska Highway', 3, 3, P()], ['Pacific Coast Highway', 3, 3, P({ al: [syn('Highway 1', 3, 3, [], P())] })], ['Great Ocean Road', 3, 3, P({ reg: ['AU'] })],
    ['Santa Fe Trail', 3, 3, P()], ['Amber Road', 4, 4, P()], ['Incense Route', 4, 4, P()], ['Garden Route', 4, 4, P({ reg: ['ZA'] })], ['Ring Road', 4, 4, P({ g: 'Iceland' })],
    ['Lincoln Highway', 4, 4, P()], ['Blue Ridge Parkway', 4, 4, P()], ['Cabot Trail', 4, 4, P()], ['Pennine Way', 4, 4, P({ reg: ['UK'] })], ['West Highland Way', 4, 4, P({ reg: ['UK'] })],
    ['Chisholm Trail', 4, 4, P()], ['Karakoram Highway', 4, 4, P()], ['John Muir Trail', 4, 4, P()], ['Hippie Trail', 4, 4, P()], ['Royal Road', 5, 5, P()],
    ['Tea Horse Road', 5, 5, P()], ['Via Francigena', 5, 5, P()], ['Kokoda Track', 5, 5, P()], ['Tokaido', 5, 5, P()], ['Nakasendo', 5, 5, P()], ['Natchez Trace', 5, 5, P()],
    ['Stuart Highway', 5, 5, P({ reg: ['AU'] })], ['Tour du Mont Blanc', 5, 5, P()], ['Overland Track', 5, 5, P({ reg: ['AU'] })],
  ],

  // ---------------------------------------------------------------- animal-powered travel
  animal_powered_travel: [
    ['camel', 1, 2], ['donkey', 1, 3], ['elephant', 1, 3], ['dog sled', 2, 2, { al: [spell('dogsled', 2, 2)] }], ['horseback', 2, 2], ['horse and buggy', 2, 2],
    ['mule', 2, 3], ['llama', 2, 4], ['stagecoach', 2, 2], ['sleigh', 2, 2], ['covered wagon', 2, 2], ['camel caravan', 2, 2], ['horse-drawn carriage', 2, 2],
    ['ox cart', 3, 3, { al: [syn('bullock cart', 3, 3)] }], ['chariot', 2, 3], ['reindeer sleigh', 3, 3], ['pony cart', 3, 3], ['pack mule', 3, 3], ['pack horse', 3, 3],
    ['wagon train', 3, 3], ['camel train', 3, 3], ['mule train', 3, 3], ['husky team', 3, 3], ['water buffalo', 4, 3], ['hansom cab', 4, 4],
    ['troika', 4, 4], ['hackney carriage', 4, 4], ['phaeton', 5, 5], ['dray', 5, 5], ['landau', 5, 5], ['tonga', 5, 5, { g: 'carriage', reg: ['IN'] }],
    ['horse and cart', 2, 2, { reg: ['UK'] }], ['Pony Express', 3, 3, O()],
  ],

  // ---------------------------------------------------------------- giving directions
  giving_directions: [
    ['turn left', 1, 1], ['turn right', 1, 1], ['go straight', 1, 1, { al: [syn('straight ahead', 1, 1)] }], ['on your left', 1, 1], ['on your right', 1, 1],
    ['keep going', 1, 2], ['turn around', 1, 2], ['cross the street', 1, 2], ['traffic light', 1, 2], ['U-turn', 2, 2], ['next exit', 2, 2],
    ['roundabout', 2, 2, { g: 'traffic', al: [syn('traffic circle', 2, 2, ['US'])] }], ['dead end', 2, 2], ['one-way street', 2, 2], ['crossroads', 2, 3], ['intersection', 2, 3],
    ['landmark', 2, 3], ['across from', 2, 2], ['head north', 2, 2], ['around the corner', 2, 2], ['down the road', 2, 2], ['first exit', 2, 2], ['follow the signs', 2, 2],
    ['turn off', 2, 2], ['two blocks', 3, 3], ['bear left', 3, 3], ['fork in the road', 3, 3], ['second left', 3, 3, { reg: ['UK'] }], ['first right', 3, 3, { reg: ['UK'] }],
    ['road junction', 3, 3], ['half a mile', 3, 3], ['slip road', 3, 3, { reg: ['UK'], al: [syn('exit ramp', 3, 3, ['US'])] }], ['T-junction', 3, 3, { reg: ['UK'] }],
    ['carry on', 3, 3, { reg: ['UK'] }], ["you can't miss it", 3, 3, { type: 'phrase' }], ['rotary', 4, 4, { g: 'traffic circle', reg: ['US'] }],
  ],

  // ---------------------------------------------------------------- road trip words
  road_trip_words: [
    ['motel', 1, 1], ['snacks', 1, 2], ['playlist', 1, 2], ['highway', 1, 2], ['back seat', 1, 2], ['detour', 2, 2], ['rest stop', 2, 2, { al: [syn('rest area', 2, 2, ['US'])] }],
    ['mileage', 2, 2], ['carpool', 2, 2], ['odometer', 2, 2], ['gas station', 1, 2], ['road map', 2, 2], ['passenger seat', 2, 2], ['are we there yet', 2, 3, { type: 'phrase' }],
    ['cruise control', 2, 3], ['billboard', 2, 3], ['diner', 2, 2], ['souvenir', 2, 3], ['truck stop', 2, 3], ['camper van', 2, 3], ['RV', 2, 3, AC()], ['spare tire', 2, 3],
    ['packed lunch', 2, 2], ['pit stop', 2, 3], ['sightseeing', 2, 3], ['convoy', 3, 3], ['glove box', 3, 3, { al: [syn('glove compartment', 3, 3)] }],
    ['shotgun', 3, 3, { g: 'front seat' }], ['roadside attraction', 3, 3], ['service station', 3, 3, { reg: ['UK'] }], ['road atlas', 3, 3], ['travel mug', 3, 3],
    ['tollbooth', 3, 3, { al: [spell('toll booth', 3, 3)] }], ['fuel gauge', 3, 3], ['scenic route', 3, 3], ['roof rack', 3, 3], ['rumble strip', 4, 4], ['CB radio', 4, 4],
    ['Airstream', 4, 4, O({ g: 'trailer' })], ['tripometer', 5, 5],
  ],
};

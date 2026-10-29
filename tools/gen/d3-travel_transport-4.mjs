// Depth-3 batch: Travel & Transport 4 (vacations: sightseeing, attractions, theme parks, beaches, ski resorts; special vehicles).
const verb = (o = {}) => ({ pos: 'verb', ...o });
const place = (o = {}) => ({ type: 'place', ...o });
const prop = (o = {}) => ({ type: 'proper', ...o });
const brand = (o = {}) => ({ type: 'proper', tm: true, ...o });

export const THEMES = {
  sightseeing_words: { d: 2 }, tourist_attractions: { d: 1 }, famous_theme_parks: { d: 3, tm: true }, beach_destinations: { d: 2 }, famous_ski_resorts: { d: 4 },
  emergency_vehicles: { d: 1 }, construction_vehicles: { d: 2 }, farm_vehicles: { d: 2 }, military_vehicles: { d: 3 }, delivery_vehicles: { d: 3 },
  space_vehicles: { d: 3 }, horse_drawn_vehicles: { d: 4 }, truck_types: { d: 2 }, vehicle_sounds: { d: 2, lang: true }, electric_vehicles: { d: 3 },
};

export const FIXES = [
  { gloss: ['Apollo', 'space', 'spacecraft'] },
  { gloss: ['tiger', 'big_cats', 'animal'] }, { gloss: ['gator', 'reptiles_and_amphibians', 'animal'] }, { gloss: ['mammoth', 'prehistoric_life', 'animal'] },
  { gloss: ['cabriolet', 'cars', 'car'] }, { gloss: ['curiosity', 'emotions', 'feeling'] }, { gloss: ['Atlantis', 'mythology', 'lost city'] },
  { gloss: ['dragon', 'fantasy', 'creature'] }, { gloss: ['starship', 'space', 'spaceship'] },
];

export const ALIASES = [
  ['emergency_vehicles', 'police car', '', [['squad car', 'synonym', 2, 2, ['US']], ['patrol car', 'synonym', 2, 2], ['cop car', 'synonym', 2, 2, ['US']], ['panda car', 'synonym', 4, 4, ['UK']]]],
  ['truck_types', 'flatbed truck', '', [['flatbed', 'short form', 2, 2]]],
  ['truck_types', 'tanker truck', '', [['tanker', 'short form', 2, 3, [], { g: 'truck' }]]],
  ['truck_types', 'dump truck', '', [['tipper', 'synonym', 3, 3, ['UK']], ['dumper truck', 'synonym', 4, 4, ['UK']]]],
  ['truck_types', 'tow truck', '', [['wrecker', 'synonym', 4, 4, ['US']], ['breakdown truck', 'synonym', 3, 3, ['UK']]]],
  ['truck_types', 'garbage truck', '', [['bin lorry', 'synonym', 3, 3, ['UK']], ['dustcart', 'synonym', 4, 4, ['UK']], ['refuse truck', 'synonym', 4, 4]]],
  ['construction_vehicles', 'bulldozer', '', [['dozer', 'short form', 3, 3]]],
  ['construction_vehicles', 'steamroller', '', [['road roller', 'synonym', 3, 3]]],
  ['farm_vehicles', 'ATV', '', [['four-wheeler', 'synonym', 3, 3, ['US'], { type: 'common' }]]],
  ['military_vehicles', 'tank', 'military vehicle', [['main battle tank', 'synonym', 4, 3]]],
];

export const DATA = {
  // ---------------------------------------------------------------- sightseeing words
  sightseeing_words: [
    ['sightseeing', 1, 1], ['tourist', 1, 1], ['tour', 1, 2], ['tour guide', 1, 1], ['guidebook', 2, 1], ['map', 1, 2], ['souvenir', 1, 2], ['postcard', 1, 2],
    ['landmark', 2, 1], ['itinerary', 3, 2], ['excursion', 3, 2], ['day trip', 2, 2], ['tour bus', 2, 2], ['hop-on hop-off', 3, 2], ['audio guide', 3, 2],
    ['walking tour', 2, 2], ['admission', 3, 3], ['queue', 2, 4, { g: 'line' }], ['selfie stick', 2, 3], ['binoculars', 2, 3], ['panorama', 3, 3], ['vista', 3, 3],
    ['lookout', 3, 3], ['scenic route', 3, 3], ['photo op', 3, 3], ['must-see', 3, 3], ['tourist trap', 3, 3], ['off the beaten path', 3, 3, { type: 'phrase' }],
    ['sightseer', 3, 2], ['brochure', 2, 3], ['souvenir shop', 2, 3], ['gift shop', 2, 3], ['ticket booth', 3, 3], ['travel guide', 2, 2], ['guided tour', 2, 2],
    ['sights', 2, 2], ['wander', 2, 4, verb()], ['stroll', 2, 4, verb()], ['rubberneck', 4, 4, verb()], ['flaneur', 5, 5, { al: [['flâneur', 'spelling', 5, 5]] }],
  ],

  // ---------------------------------------------------------------- tourist attractions
  tourist_attractions: [
    ['museum', 1, 1], ['zoo', 1, 1], ['aquarium', 1, 1], ['castle', 1, 1], ['palace', 1, 1], ['cathedral', 2, 1], ['lighthouse', 1, 2], ['fountain', 1, 2],
    ['waterfall', 1, 2], ['national park', 1, 2], ['monument', 2, 1], ['statue', 1, 2], ['tower', 1, 3], ['art gallery', 2, 1], ['gallery', 2, 2, { g: 'art' }],
    ['observation deck', 3, 2], ['viewpoint', 2, 1], ['old town', 2, 1], ['market', 1, 3], ['night market', 3, 2], ['botanical garden', 3, 2], ['amusement park', 1, 2],
    ['theme park', 1, 2], ['planetarium', 3, 2], ['wax museum', 3, 2], ['science museum', 2, 2], ['historic site', 3, 2], ['ruins', 2, 2], ['temple', 2, 3, { g: 'building' }],
    ['cave', 1, 3], ['canyon', 2, 3], ['geyser', 3, 3, { g: 'landform' }], ['hot spring', 3, 3], ['opera house', 3, 3], ['ferris wheel', 2, 3], ['cable car', 2, 3], ['vineyard', 2, 4],
    ['city walls', 3, 3], ['harbour', 2, 3, { al: [] }], ['bridge', 1, 4, { g: 'structure' }], ['battlefield', 3, 4], ['observatory', 3, 4], ['catacombs', 4, 4], ['mausoleum', 4, 4],
  ],

  // ---------------------------------------------------------------- famous theme parks
  famous_theme_parks: [
    ['Disneyland', 1, 1, brand({ type: 'place' })], ['Walt Disney World', 1, 1, brand({ type: 'place' })], ['Universal Studios', 2, 1, brand({ type: 'place' })],
    ['Legoland', 2, 1, brand({ type: 'place' })], ['Six Flags', 2, 2, brand({ type: 'org', reg: ['US'] })], ['SeaWorld', 2, 2, brand({ type: 'place' })],
    ['Magic Kingdom', 2, 2, brand({ type: 'place' })], ['Epcot', 3, 2, brand({ type: 'place' })], ['Disneyland Paris', 2, 2, brand({ type: 'place' })],
    ['Busch Gardens', 3, 3, brand({ type: 'place', reg: ['US'] })], ['Knott\'s Berry Farm', 3, 3, brand({ type: 'place', reg: ['US'] })], ['Dollywood', 3, 3, brand({ type: 'place', reg: ['US'] })],
    ['Alton Towers', 3, 2, place({ reg: ['UK'] })], ['Thorpe Park', 3, 2, place({ reg: ['UK'] })], ['Blackpool', 2, 5, place({ g: 'resort town', reg: ['UK'] })],
    ['Tivoli Gardens', 3, 2, place()], ['Efteling', 4, 3, place()], ['Europa-Park', 4, 3, place()], ['Cedar Point', 4, 3, place({ reg: ['US'] })],
    ['Everland', 4, 3, place({ reg: ['KR'] })], ['Lotte World', 4, 3, place({ reg: ['KR'] })], ['Ocean Park', 4, 3, place({ reg: ['HK'] })],
    ['Hersheypark', 4, 3, brand({ type: 'place', reg: ['US'] })], ['Islands of Adventure', 4, 3, brand({ type: 'place' })], ['Hollywood Studios', 3, 3, brand({ type: 'place' })],
    ['Gardaland', 4, 3, place({ reg: ['IT'] })], ['PortAventura', 4, 3, place({ reg: ['ES'] })], ['Liseberg', 5, 3, place({ reg: ['SE'] })],
    ['Phantasialand', 5, 3, place({ reg: ['DE'] })], ['Energylandia', 5, 3, place({ reg: ['PL'] })], ['Fuji-Q Highland', 5, 3, place({ reg: ['JP'] })],
    ['Ferrari World', 4, 3, brand({ type: 'place' })], ['Chessington', 4, 3, place({ g: 'theme park', reg: ['UK'] })], ['Parc Asterix', 5, 3, place({ reg: ['FR'] })],
    ['Movie Park', 5, 4, place({ reg: ['DE'] })], ['Drayton Manor', 5, 4, place({ reg: ['UK'] })], ['Coney Island', 3, 4, place({ g: 'amusement area' })],
  ],

  // ---------------------------------------------------------------- beach destinations
  beach_destinations: [
    ['Hawaii', 1, 1, place()], ['Bahamas', 2, 1, place()], ['Miami Beach', 2, 1, place()], ['Bali', 2, 1, place()], ['Cancun', 2, 1, place({ al: [['Cancún', 'spelling', 3, 2]] })],
    ['Maldives', 2, 1, place()], ['Ibiza', 2, 2, place()], ['Phuket', 3, 2, place()], ['Maui', 2, 2, place()], ['Bondi', 3, 2, place({ g: 'beach', reg: ['AU'] })],
    ['Copacabana', 3, 2, place()], ['Waikiki', 3, 2, place()], ['Malibu', 3, 2, place()], ['Santorini', 3, 2, place()], ['Mykonos', 3, 2, place()],
    ['Algarve', 3, 2, place()], ['Costa del Sol', 3, 2, place()], ['Tenerife', 3, 2, place()], ['Majorca', 3, 2, place({ al: [['Mallorca', 'spelling', 3, 2]] })],
    ['Punta Cana', 3, 2, place()], ['Aruba', 3, 2, place()], ['Barbados', 3, 2, place()], ['Jamaica', 2, 3, place()], ['Fiji', 2, 2, place()], ['Tahiti', 3, 2, place()],
    ['Bora Bora', 3, 2, place()], ['Seychelles', 3, 2, place()], ['Zanzibar', 3, 2, place()], ['Mauritius', 3, 2, place()], ['Gold Coast', 3, 2, place({ reg: ['AU'] })],
    ['Daytona Beach', 3, 2, place({ reg: ['US'] })], ['Myrtle Beach', 3, 2, place({ reg: ['US'] })], ['Venice Beach', 3, 2, place({ reg: ['US'] })], ['Key West', 3, 2, place({ reg: ['US'] })],
    ['Cabo', 3, 3, place()], ['Tulum', 4, 3, place()], ['Boracay', 4, 3, place()], ['Koh Samui', 4, 3, place()], ['Krabi', 4, 3, place()], ['Bodrum', 4, 3, place()],
    ['Marbella', 4, 3, place()], ['Benidorm', 4, 3, place({ reg: ['UK'] })], ['Lanzarote', 4, 3, place()], ['Positano', 4, 3, place()], ['Ipanema', 3, 3, place()],
    ['Langkawi', 5, 3, place()], ['Goa', 3, 3, place()],
  ],

  // ---------------------------------------------------------------- famous ski resorts
  famous_ski_resorts: [
    ['Aspen', 2, 2, place()], ['Whistler', 3, 3, place({ g: 'ski resort' })], ['Zermatt', 3, 3, place()], ['Chamonix', 3, 3, place()], ['St. Moritz', 3, 3, place()],
    ['Niseko', 4, 3, place()], ['Vail', 3, 2, place()], ['Courchevel', 4, 3, place()], ['Verbier', 4, 3, place()], ['Kitzbühel', 4, 3, place({ al: [['Kitzbuhel', 'spelling', 4, 4]] })],
    ['St. Anton', 4, 3, place()], ['Val d\'Isère', 4, 3, place({ al: [['Val d\'Isere', 'spelling', 4, 4]] })], ['Lake Louise', 3, 3, place()], ['Jackson Hole', 3, 3, place()],
    ['Park City', 3, 3, place()], ['Telluride', 4, 3, place()], ['Breckenridge', 4, 3, place()], ['Banff', 3, 3, place()], ['Cortina', 4, 3, place({ g: 'ski resort' })],
    ['Davos', 3, 3, place()], ['Gstaad', 4, 3, place()], ['Val Thorens', 4, 3, place()], ['Les Arcs', 4, 3, place()], ['Tignes', 4, 3, place()], ['Mammoth', 4, 4, place({ g: 'ski resort' })],
    ['Sun Valley', 3, 3, place()], ['Stowe', 4, 3, place()], ['Killington', 5, 3, place()], ['Mont Tremblant', 4, 3, place()], ['Hakuba', 5, 3, place()], ['Ischgl', 5, 3, place()],
    ['Sölden', 5, 3, place({ al: [['Solden', 'spelling', 5, 5]] })], ['Saas-Fee', 5, 3, place()], ['Bansko', 5, 3, place()], ['Cervinia', 5, 3, place()], ['Lech', 5, 3, place({ g: 'ski resort' })],
    ['Innsbruck', 3, 4, place()], ['Garmisch', 4, 3, place()], ['Åre', 5, 3, place({ al: [['Are', 'spelling', 5, 5]] })], ['Squaw Valley', 4, 3, place()],
  ],

  // ---------------------------------------------------------------- emergency vehicles
  emergency_vehicles: [
    ['ambulance', 1, 1], ['fire truck', 1, 1], ['fire engine', 1, 1], ['police car', 1, 1], ['police van', 2, 2], ['air ambulance', 2, 2], ['rescue helicopter', 2, 2],
    ['police helicopter', 2, 2], ['fireboat', 3, 2, { al: [['fire boat', 'spelling', 3, 2]] }], ['lifeboat', 2, 2], ['rescue boat', 2, 2], ['ladder truck', 3, 2],
    ['police motorcycle', 2, 2], ['paramedic car', 3, 2], ['rapid response vehicle', 4, 3], ['hazmat truck', 3, 3], ['bomb disposal truck', 3, 3], ['rescue truck', 2, 2],
    ['coast guard cutter', 3, 3], ['riot van', 3, 3], ['fire tender', 3, 3, { reg: ['UK'] }], ['pumper truck', 4, 3, { reg: ['US'] }], ['hook and ladder', 4, 3],
    ['crash tender', 4, 4], ['brush truck', 4, 4, { reg: ['US'] }], ['water bomber', 3, 3, { al: [['firefighting plane', 'synonym', 3, 3]] }], ['mobile command unit', 4, 4],
    ['snow rescue vehicle', 4, 4], ['police boat', 3, 3], ['tactical vehicle', 3, 3], ['incident response unit', 4, 4], ['rescue squad', 3, 3],
    ['tow truck', 2, 4],
  ],

  // ---------------------------------------------------------------- construction vehicles
  construction_vehicles: [
    ['bulldozer', 1, 1], ['excavator', 1, 1], ['digger', 1, 1, { g: 'machine' }], ['crane', 1, 2, { g: 'machine' }], ['dump truck', 1, 1], ['cement mixer', 1, 1],
    ['concrete mixer', 2, 1], ['backhoe', 2, 2], ['steamroller', 2, 2], ['front loader', 2, 2], ['skid steer', 3, 2], ['grader', 3, 2], ['forklift', 2, 3],
    ['telehandler', 4, 3], ['pile driver', 3, 3, { g: 'machine' }], ['tower crane', 2, 2], ['mobile crane', 3, 2], ['crawler crane', 4, 3], ['wheel loader', 3, 2],
    ['paver', 3, 3, { g: 'machine' }], ['asphalt paver', 4, 3], ['scraper', 3, 4, { g: 'machine' }], ['compactor', 3, 3], ['trencher', 4, 3], ['mini digger', 2, 2],
    ['cherry picker', 2, 3], ['boom lift', 3, 3], ['scissor lift', 3, 3], ['concrete pump', 4, 3], ['dumper', 3, 3], ['Bobcat', 2, 2], ['JCB', 3, 3],
    ['site dumper', 4, 4], ['drilling rig', 3, 3], ['road roller', 2, 2], ['loader', 2, 3, { g: 'machine' }], ['rock crusher', 4, 4],
  ],

  // ---------------------------------------------------------------- farm vehicles
  farm_vehicles: [
    ['tractor', 1, 1], ['combine harvester', 1, 1], ['combine', 2, 2, { g: 'harvester' }], ['hay baler', 2, 2], ['baler', 3, 3], ['pickup truck', 1, 3], ['ATV', 2, 3, { type: 'acronym' }],
    ['quad bike', 2, 3], ['utility vehicle', 3, 3], ['manure spreader', 3, 2], ['crop sprayer', 3, 2], ['crop duster', 3, 3], ['cotton picker', 3, 3], ['forage harvester', 4, 3],
    ['grain cart', 3, 3], ['hay wagon', 2, 2], ['livestock trailer', 3, 3], ['horse trailer', 2, 3], ['potato harvester', 4, 3], ['sugar beet harvester', 5, 4],
    ['windrower', 4, 4], ['swather', 5, 4], ['feed wagon', 3, 3], ['tractor trailer', 2, 4], ['grain truck', 3, 3], ['silage truck', 4, 4], ['ride-on mower', 3, 4],
    ['John Deere', 2, 2, brand({ type: 'org' })], ['Massey Ferguson', 3, 3, brand({ type: 'org' })], ['Fendt', 4, 3, brand({ type: 'org' })], ['Kubota', 4, 3, brand({ type: 'org' })],
    ['New Holland', 4, 3, brand({ type: 'org' })], ['Land Rover', 2, 4, brand({ type: 'org' })], ['tracked tractor', 4, 3], ['plough', 2, 3, { g: 'farm implement' }],
    ['thresher', 4, 3, { g: 'machine' }], ['seed drill', 4, 3], ['golf cart', 2, 5], ['Gator', 4, 4, brand({ g: 'utility vehicle' })],
  ],

  // ---------------------------------------------------------------- military vehicles
  military_vehicles: [
    ['tank', 1, 1, { g: 'military vehicle' }], ['jeep', 1, 2], ['Humvee', 2, 2, brand()], ['armored car', 2, 2], ['personnel carrier', 3, 2],
    ['APC', 3, 2, { type: 'acronym' }], ['troop carrier', 3, 2], ['fighter jet', 1, 1], ['bomber', 2, 1], ['helicopter gunship', 3, 2], ['Apache', 3, 3, { g: 'helicopter', type: 'proper', tm: true }],
    ['Black Hawk', 3, 3, brand({ g: 'helicopter' })], ['Chinook', 3, 3, { g: 'helicopter', type: 'proper' }], ['destroyer', 2, 2, { g: 'warship' }], ['battleship', 2, 1, { g: 'warship' }],
    ['aircraft carrier', 2, 1], ['submarine', 1, 2], ['frigate', 3, 2], ['cruiser', 3, 3, { g: 'warship' }], ['minesweeper', 3, 3], ['gunboat', 3, 2],
    ['patrol boat', 3, 3], ['landing craft', 3, 2], ['missile launcher', 3, 2], ['self-propelled gun', 4, 3], ['half-track', 4, 3], ['tank destroyer', 4, 3],
    ['Sherman', 3, 3, { g: 'tank', type: 'proper' }], ['Abrams', 3, 3, { g: 'tank', type: 'proper' }], ['Panzer', 3, 3, { type: 'proper' }], ['Tiger', 3, 4, { g: 'tank', type: 'proper' }],
    ['Spitfire', 3, 2, { type: 'proper' }], ['Stealth bomber', 3, 2, { type: 'proper' }], ['Harrier', 4, 3, { g: 'jet', type: 'proper' }], ['Warthog', 4, 4, { g: 'A-10 jet', type: 'proper' }],
    ['warship', 2, 1], ['warplane', 3, 1], ['U-boat', 3, 2], ['troop transport', 3, 2], ['supply truck', 3, 3], ['military truck', 2, 2], ['Stryker', 4, 3, brand()],
    ['Bradley', 4, 3, { g: 'fighting vehicle', type: 'proper' }], ['T-34', 4, 3, { type: 'proper' }], ['Predator drone', 3, 3, brand({ g: 'drone' })],
  ],

  // ---------------------------------------------------------------- delivery vehicles
  delivery_vehicles: [
    ['delivery van', 1, 1], ['mail truck', 1, 1], ['box truck', 2, 2], ['cargo van', 2, 2], ['courier van', 3, 2], ['postal van', 3, 2], ['cargo bike', 3, 2],
    ['bike courier', 2, 2], ['delivery drone', 2, 2], ['delivery robot', 3, 2], ['moped', 2, 3], ['milk float', 3, 2], ['bread van', 3, 2], ['pizza delivery car', 3, 2],
    ['ice cream truck', 1, 3], ['food truck', 1, 3], ['parcel truck', 2, 2], ['UPS truck', 2, 2, brand({ g: 'delivery truck' })], ['FedEx van', 3, 2, brand()], ['DHL van', 3, 2, brand()],
    ['Amazon van', 3, 2, brand()], ['Royal Mail van', 3, 2, brand({ reg: ['UK'] })], ['armored truck', 3, 3], ['refrigerated truck', 3, 3], ['removal van', 3, 3, { reg: ['UK'] }],
    ['moving truck', 2, 2, { al: [['U-Haul', 'synonym', 3, 3, ['US'], { tm: true }]] }], ['furniture van', 3, 2], ['cargo trike', 4, 3], ['tuk-tuk', 3, 4], ['Sprinter van', 4, 3, brand()],
    ['newspaper truck', 4, 3], ['freight van', 3, 3], ['sidewalk robot', 4, 3], ['water delivery truck', 4, 3], ['Transit van', 3, 3, brand({ g: 'delivery van' })],
    ['flatbed truck', 2, 3], ['pickup truck', 1, 3],
  ],

  // ---------------------------------------------------------------- space vehicles
  space_vehicles: [
    ['rocket', 1, 1, { g: 'spacecraft' }], ['space shuttle', 1, 1], ['spaceship', 1, 1], ['spacecraft', 2, 1], ['satellite', 1, 2, { g: 'space' }], ['capsule', 2, 2, { g: 'space' }],
    ['space station', 1, 1], ['lunar rover', 2, 1], ['moon buggy', 2, 1], ['Mars rover', 2, 1], ['space probe', 2, 1], ['lander', 3, 2, { g: 'spacecraft' }], ['lunar module', 3, 2],
    ['ISS', 2, 2, { type: 'acronym', g: 'space station' }], ['Soyuz', 3, 3, prop({ g: 'spacecraft' })], ['Apollo', 2, 3, prop({ g: 'spacecraft' })], ['Saturn V', 3, 2, prop({ g: 'rocket' })],
    ['Falcon 9', 3, 3, prop({ g: 'rocket' })], ['Starship', 3, 3, brand({ g: 'rocket' })], ['Sputnik', 3, 2, prop()], ['Voyager', 3, 3, prop({ g: 'space probe' })],
    ['Skylab', 4, 3, prop()], ['Mir', 4, 3, prop({ g: 'space station' })], ['Challenger', 3, 3, prop({ g: 'space shuttle' })], ['Columbia', 3, 3, prop({ g: 'space shuttle' })],
    ['Atlantis', 3, 3, prop({ g: 'space shuttle' })], ['Discovery', 3, 3, prop({ g: 'space shuttle' })], ['Endeavour', 4, 3, prop({ g: 'space shuttle' })],
    ['Curiosity', 3, 3, prop({ g: 'rover' })], ['Perseverance', 3, 3, prop({ g: 'rover' })], ['Orion', 4, 4, prop({ g: 'spacecraft' })], ['Gemini', 3, 4, prop({ g: 'spacecraft' })],
    ['Mercury', 2, 4, prop({ g: 'spacecraft' })], ['Hubble', 3, 4, prop({ g: 'space telescope' })], ['booster', 3, 3, { g: 'rocket' }], ['orbiter', 4, 3], ['space plane', 3, 3],
    ['Millennium Falcon', 2, 3, brand({ g: 'spaceship' })], ['Dragon', 2, 5, prop({ g: 'spacecraft' })], ['Sojourner', 5, 4, prop({ g: 'rover' })], ['Space Launch System', 5, 4, prop()],
  ],

  // ---------------------------------------------------------------- horse-drawn vehicles
  horse_drawn_vehicles: [
    ['carriage', 1, 1, { g: 'horse-drawn' }], ['wagon', 1, 1], ['stagecoach', 2, 1], ['chariot', 2, 1], ['sleigh', 1, 1], ['covered wagon', 2, 1], ['hansom cab', 3, 2],
    ['buggy', 2, 2, { g: 'carriage' }], ['cart', 1, 3, { g: 'horse-drawn' }], ['coach', 2, 3, { g: 'carriage' }], ['hay wagon', 2, 2], ['phaeton', 4, 3], ['landau', 4, 4],
    ['brougham', 4, 4], ['surrey', 4, 4, { g: 'carriage' }], ['gig', 3, 4, { g: 'carriage' }], ['trap', 3, 4, { g: 'carriage' }], ['dray', 4, 4], ['hackney carriage', 3, 3],
    ['sulky', 4, 4], ['tumbril', 5, 4], ['travois', 4, 5], ['chaise', 4, 4, { g: 'carriage' }], ['barouche', 4, 4], ['curricle', 5, 5], ['dogcart', 4, 4], ['troika', 4, 4],
    ['jaunting car', 5, 4], ['vardo', 5, 4], ['wain', 5, 5], ['victoria', 4, 5, { g: 'carriage' }], ['caleche', 5, 5, { al: [['calash', 'spelling', 5, 5]] }], ['omnibus', 3, 4, { g: 'horse-drawn' }],
    ['cabriolet', 4, 4, { g: 'carriage' }], ['pony cart', 2, 2], ['horse and cart', 2, 2], ['pumpkin coach', 3, 3], ['Conestoga wagon', 4, 3, prop()],
    ['Concord coach', 5, 4, prop()], ['dog sled', 2, 5],
  ],

  // ---------------------------------------------------------------- truck types
  truck_types: [
    ['truck', 1, 2, { g: 'vehicle', al: [['lorry', 'synonym', 2, 2, ['UK']]] }], ['pickup truck', 1, 1, { al: [['pickup', 'short form', 2, 2, [], { g: 'truck' }], ['ute', 'synonym', 3, 3, ['AU', 'NZ']]] }],
    ['semi', 2, 2, { g: 'truck' }], ['dump truck', 1, 1], ['tow truck', 1, 1], ['flatbed truck', 2, 2], ['tanker truck', 2, 2], ['box truck', 2, 2], ['garbage truck', 1, 1],
    ['cement mixer', 1, 2], ['fire truck', 1, 3], ['monster truck', 1, 2], ['ice cream truck', 1, 3], ['food truck', 1, 3], ['delivery truck', 1, 1], ['moving truck', 2, 2],
    ['semi trailer', 3, 2], ['big rig', 2, 2], ['18-wheeler', 3, 2], ['articulated lorry', 3, 2, { reg: ['UK'] }], ['tractor unit', 4, 3, { reg: ['UK'] }], ['road train', 3, 3],
    ['logging truck', 3, 2], ['car transporter', 3, 3, { al: [['car carrier', 'synonym', 3, 3]] }], ['refrigerated truck', 3, 2, { al: [['reefer', 'slang', 4, 4]] }],
    ['stake truck', 4, 3], ['crew cab', 4, 3], ['dually', 4, 4], ['low loader', 4, 3], ['bucket truck', 3, 3], ['fuel truck', 2, 2], ['water truck', 3, 3], ['cab-over', 5, 4],
    ['chassis cab', 5, 4], ['panel truck', 4, 3], ['concrete truck', 2, 2], ['armored truck', 3, 3], ['mail truck', 2, 3], ['school bus', 1, 5],
  ],

  // ---------------------------------------------------------------- vehicle sounds
  vehicle_sounds: [
    ['honk', 1, 1, verb()], ['beep', 1, 1, verb()], ['vroom', 1, 1], ['toot', 1, 1, verb()], ['screech', 2, 2, verb()], ['rumble', 2, 2, verb()], ['roar', 1, 2, verb()],
    ['hum', 1, 3, verb()], ['whirr', 3, 3, verb({ al: [['whir', 'spelling', 3, 3]] })], ['purr', 2, 3, verb()], ['squeal', 2, 2, verb()], ['chug', 2, 2, verb()], ['rev', 2, 2, verb()],
    ['hiss', 1, 3, verb()], ['clang', 2, 3, verb()], ['ding', 1, 3], ['whoosh', 2, 3, verb()], ['choo-choo', 1, 1], ['siren', 1, 2, { g: 'alarm' }], ['clatter', 3, 3, verb()],
    ['rattle', 2, 3, verb({ g: 'sound' })], ['zoom', 1, 2, verb()], ['putt-putt', 3, 2], ['backfire', 3, 2, verb()], ['skid', 2, 3, verb()], ['clunk', 3, 3], ['sputter', 3, 3, verb({ al: [['splutter', 'spelling', 3, 3, ['UK']]] })],
    ['thrum', 4, 4, verb()], ['klaxon', 4, 3], ['hooter', 3, 3, { reg: ['UK'] }], ['parp', 4, 3, { reg: ['UK'] }], ['wail', 2, 3, verb()], ['whine', 2, 3, verb()],
    ['clickety-clack', 3, 2], ['chugga chugga', 3, 2], ['beep beep', 1, 1], ['honk honk', 1, 1], ['toot toot', 1, 1], ['ahooga', 5, 4], ['ding-ding', 2, 2],
    ['rumbling', 2, 3], ['drone', 3, 4, verb({ g: 'engine noise' })], ['creak', 2, 4, verb()], ['grind', 2, 4, verb()], ['bleep', 3, 3, verb()],
  ],

  // ---------------------------------------------------------------- electric vehicles
  electric_vehicles: [
    ['electric car', 1, 1], ['Tesla', 1, 1, { g: 'car company', type: 'org', tm: true }], ['hybrid', 2, 2, { g: 'car' }], ['plug-in hybrid', 3, 2], ['e-bike', 2, 1],
    ['electric scooter', 2, 1], ['electric bus', 2, 1], ['electric truck', 2, 2], ['trolleybus', 3, 3], ['tram', 2, 3], ['golf cart', 2, 3], ['milk float', 3, 3],
    ['mobility scooter', 2, 3], ['Segway', 3, 2, brand()], ['hoverboard', 3, 3], ['electric motorbike', 3, 2], ['electric van', 3, 2], ['charging station', 2, 3],
    ['Nissan Leaf', 3, 1, brand()], ['Chevy Bolt', 3, 1, brand()], ['Tesla Model 3', 2, 1, brand()], ['Tesla Model S', 2, 1, brand()], ['Cybertruck', 2, 1, brand()],
    ['BMW i3', 4, 2, brand()], ['Rivian', 3, 2, brand({ type: 'org' })], ['Polestar', 4, 2, brand({ type: 'org' })], ['Renault Zoe', 4, 2, brand()], ['Hyundai Ioniq', 4, 2, brand()],
    ['Kia EV6', 4, 2, brand()], ['Porsche Taycan', 4, 2, brand()], ['Mustang Mach-E', 4, 2, brand()], ['Audi e-tron', 4, 2, brand()], ['Jaguar I-Pace', 5, 2, brand()],
    ['Lucid Air', 5, 2, brand()], ['F-150 Lightning', 4, 2, brand()], ['Fiat 500e', 5, 3, brand()], ['BYD', 3, 2, brand({ type: 'org' })], ['Mercedes EQS', 5, 3, brand()],
    ['Smart EQ', 5, 3, brand()], ['GM EV1', 5, 3, brand()], ['Tesla Roadster', 3, 2, brand()], ['electric vehicle', 2, 1, { al: [['BEV', 'short form', 4, 3, [], { type: 'acronym' }]] }],
    ['EV', 2, 1, { type: 'acronym' }], ['solar car', 3, 3], ['electric kick scooter', 4, 3],
  ],
};

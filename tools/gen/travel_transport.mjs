// Generated word data: Travel & Transport, the playable themes directly under it (cars ... special vehicles).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const PH = (o = {}) => ({ type: 'phrase', ...o });

export const THEMES = {
  cars: { d: 1 }, public_transportation: { d: 2 }, air_travel: { d: 1 }, boats_and_ships: { d: 2 }, trains: { d: 1 },
  journeys: { d: 3 }, accommodation: { d: 2 }, campsite: { d: 2 }, special_vehicles: { d: 2 },
};

export const DATA = {
  // ---------------------------------------------------------------- cars
  cars: [
    ['driver', 1, 1, { g: 'vehicle' }], ['engine', 1, 1, { g: 'machine' }], ['steering wheel', 1, 1], ['seat belt', 1, 1, { al: [['safety belt', 'synonym', 2, 2]] }],
    ['headlight', 1, 1, { al: [['headlamp', 'synonym', 3, 3]] }], ['bumper', 1, 1, { g: 'car' }], ['garage', 1, 2], ['car wash', 1, 1, PH()],
    ['windshield', 1, 1, { reg: ['US', 'CA'], al: [['windscreen', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE']]] }],
    ['trunk', 1, 2, { g: 'car', reg: ['US', 'CA'], al: [['boot', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE'], { g: 'car' }]] }],
    ['hood', 1, 2, { g: 'car', reg: ['US', 'CA'], al: [['bonnet', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE'], { g: 'car' }]] }],
    ['license plate', 1, 1, { al: [['number plate', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE']], ['registration plate', 'synonym', 3, 3, ['UK']], ['tag', 'synonym', 4, 4, ['US'], { g: 'license plate' }]] }],
    ['tire', 1, 1, { g: 'wheel', al: [['tyre', 'spelling', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN']]] }],
    ['wiper', 1, 2, { al: [['windshield wiper', 'synonym', 2, 2, ['US']]] }],
    ['gas tank', 2, 2, { al: [['petrol tank', 'synonym', 2, 2, ['UK', 'AU', 'NZ']], ['fuel tank', 'synonym', 2, 2]] }],
    ['dashboard', 1, 2, { al: [['dash', 'synonym', 2, 2, [], { g: 'car' }]] }],
    ['rearview mirror', 2, 2, { al: [['rear-view mirror', 'spelling', 2, 2, ['UK']]] }],
    ['sedan', 2, 2, { reg: ['US', 'CA', 'AU'], al: [['saloon', 'synonym', 3, 3, ['UK', 'IE'], { g: 'car' }]] }],
    ['hatchback', 2, 2], ['convertible', 2, 2, { al: [['cabriolet', 'synonym', 4, 4]] }], ['sports car', 1, 1], ['minivan', 2, 2, { reg: ['US', 'CA'], al: [['people carrier', 'synonym', 3, 3, ['UK']]] }],
    ['station wagon', 2, 2, { al: [['estate car', 'synonym', 3, 3, ['UK', 'AU']]] }], ['hot rod', 3, 2], ['SUV', 2, 2, { type: 'acronym' }],
    ['muffler', 3, 3, { g: 'car', reg: ['US', 'CA'], al: [['silencer', 'synonym', 4, 4, ['UK'], { g: 'car' }]] }],
    ['odometer', 3, 3], ['speedometer', 2, 2], ['glove box', 2, 2, { al: [['glove compartment', 'synonym', 3, 3]] }],
    ['airbag', 2, 2], ['chassis', 3, 3], ['carburetor', 3, 3, { al: [['carburettor', 'spelling', 3, 3, ['UK', 'AU']]] }],
    ['turbocharger', 3, 3, { al: [['turbo', 'synonym', 2, 2]] }], ['catalytic converter', 3, 3], ['crankshaft', 4, 4], ['camshaft', 4, 4],
    ['dipstick', 3, 3, { g: 'oil gauge' }], ['cruise control', 2, 2], ['tailgate', 3, 3, { g: 'car' }], ['sunroof', 2, 2, { al: [['moonroof', 'synonym', 4, 4, ['US']]] }],
    ['spare tire', 2, 2, { al: [['spare tyre', 'spelling', 2, 2, ['UK']]] }], ['jump start', 2, 2, PH()], ['tune-up', 3, 3, { al: [['service', 'synonym', 2, 3, ['UK'], { g: 'car' }]] }],
    ['MOT', 3, 3, { type: 'acronym', reg: ['UK'] }], ['road tax', 3, 3, { reg: ['UK'] }],
    ['tappets', 5, 5, { reg: ['UK'] }], ['distributor cap', 5, 5], ['serpentine belt', 5, 5], 
    ['bull bar', 4, 4, { reg: ['AU', 'UK'] }], ['ute', 4, 4, { reg: ['AU', 'NZ'], al: [['pickup truck', 'synonym', 2, 2, ['US']]] }], 
    ['fender bender', 4, 3, { reg: ['US'] }], ['joyride', 3, 3], ['jalopy', 4, 4, { al: [['banger', 'synonym', 3, 3, ['UK'], { g: 'old car' }], ['heap', 'synonym', 4, 4, [], { g: 'old car' }]] }],
  ],

  // ---------------------------------------------------------------- public transportation
  public_transportation: [
    ['bus', 1, 1], ['subway', 1, 1, { g: 'train', reg: ['US', 'CA'], al: [['underground', 'synonym', 2, 2, ['UK'], { g: 'train' }], ['tube', 'synonym', 2, 2, ['UK'], { g: 'London Underground' }], ['metro', 'synonym', 2, 2]] }],
    ['tram', 2, 2, { al: [['streetcar', 'synonym', 2, 2, ['US', 'CA']], ['trolley', 'synonym', 3, 3, ['US'], { g: 'tram' }]] }],
    ['ferry', 1, 2], ['school bus', 1, 3], ['bus stop', 1, 1], ['bus station', 1, 1], ['fare', 2, 1, { g: 'transport' }], ['timetable', 2, 2, { reg: ['UK', 'AU', 'IE'], al: [['schedule', 'synonym', 1, 1, ['US', 'CA'], { g: 'timetable' }]] }],
    ['conductor', 2, 3, { g: 'transport' }], ['commuter', 2, 2], ['passenger', 1, 1], ['turnstile', 3, 3], ['transit pass', 3, 2, { al: [['travelcard', 'synonym', 3, 3, ['UK']], ['bus pass', 'synonym', 2, 2]] }],
    ['rush hour', 1, 2, PH()], ['light rail', 3, 2, PH()], ['monorail', 2, 3], ['minibus', 2, 2], ['double-decker', 2, 2], ['night bus', 3, 2, PH()],
    ['coach', 2, 3, { g: 'bus', reg: ['UK', 'AU', 'IE'] }], ['trolleybus', 3, 3], ['shuttle', 2, 3, { g: 'bus' }], ['park and ride', 3, 2, PH()],
    ['bus lane', 3, 2, PH()], ['route', 2, 2, { g: 'transport' }], ['terminus', 3, 3, { al: [['end of the line', 'synonym', 3, 3, [], { type: 'phrase' }]] }],
    ['tuk-tuk', 3, 3, { al: [['auto rickshaw', 'synonym', 4, 4]] }], ['rickshaw', 3, 3], ['jeepney', 4, 4], ['matatu', 5, 5],
    ['funicular', 4, 4], ['people mover', 4, 3, PH()], ['dial-a-ride', 5, 4, { reg: ['UK'] }], ['paratransit', 5, 4], ['water bus', 4, 3, PH()],
    ['hop-on hop-off', 3, 3, PH()], ['farecard', 4, 3], ['token', 3, 3, { g: 'transit' }], ['transfer', 2, 3, { g: 'transit' }], ['interchange', 3, 3, { g: 'transit' }],
    ['concession fare', 4, 3, PH({ reg: ['UK', 'AU'] })], ['smartcard', 3, 3], ['tap in', 3, 3, PH()], ['request stop', 4, 3, PH({ reg: ['UK'] })],
    ['bendy bus', 3, 3, { reg: ['UK'], al: [['articulated bus', 'synonym', 4, 4]] }], ['dolmuş', 5, 5, { reg: ['TR'], al: [['dolmus', 'spelling', 5, 5, ['TR']]] }],
    ['guided busway', 5, 5, PH({ reg: ['UK'] })], ['transit authority', 4, 4, PH()],
  ],

  // ---------------------------------------------------------------- air travel
  air_travel: [
    ['airplane', 1, 1, { reg: ['US', 'CA'], al: [['aeroplane', 'spelling', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN']], ['plane', 'synonym', 1, 1, [], { g: 'aircraft' }], ['aircraft', 'synonym', 2, 2]] }],
    ['jet', 1, 1, { g: 'plane' }], ['helicopter', 1, 1, { al: [['chopper', 'synonym', 2, 2]] }], ['pilot', 1, 1], ['airport', 1, 1], ['runway', 1, 1],
    ['takeoff', 1, 1], ['landing', 1, 1, { g: 'plane' }], ['boarding pass', 1, 1], ['jet lag', 2, 1], ['turbulence', 2, 1], ['cockpit', 2, 2],
    ['flight attendant', 1, 1, { al: [['air hostess', 'synonym', 2, 2, ['UK']], ['stewardess', 'synonym', 2, 2]] }],
    ['passport control', 2, 2, { al: [['immigration', 'synonym', 2, 2, [], { g: 'airport' }]] }], ['layover', 2, 2, { reg: ['US', 'CA'], al: [['stopover', 'synonym', 2, 2, ['UK', 'AU', 'NZ']]] }],
    ['carry-on', 1, 1], ['check-in', 1, 1], ['departure gate', 2, 2, PH()], ['control tower', 2, 2], ['hangar', 2, 2], ['jumbo jet', 2, 2], ['glider', 2, 3],
    ['seaplane', 3, 3], ['propeller', 2, 2], ['jet engine', 2, 2], ['airline', 1, 1], ['flight', 1, 1], ['black box', 2, 3], ['fuselage', 3, 3], ['aisle seat', 2, 2],
    ['window seat', 1, 1], ['red-eye', 3, 3, { g: 'flight' }], ['air traffic controller', 2, 2, PH()], ['airstrip', 3, 3], ['biplane', 3, 3], ['drone', 2, 3, { g: 'aircraft' }],
    ['blimp', 2, 3], ['autopilot', 2, 2], ['altitude', 2, 2], ['baggage claim', 2, 2], ['duty-free', 2, 2], ['frequent flyer', 2, 2], ['standby', 3, 3, { g: 'flight' }],
    ['overbooking', 3, 3], ['charter flight', 3, 3], ['airsickness bag', 3, 3], ['tray table', 3, 3], ['jet stream', 3, 4], ['wind sock', 3, 3, { al: [['windsock', 'spelling', 3, 3]] }],
    ['taxiing', 3, 3], ['holding pattern', 4, 3, PH()], ['go-around', 5, 5], ['flaps', 4, 4], ['ailerons', 4, 4], ['transponder', 5, 5], ['avionics', 5, 5],
    ['yoke', 5, 5, { g: 'aircraft' }], ['bush plane', 4, 4], ['ground crew', 3, 3], ['apron', 5, 5, { g: 'airport' }], ['jetway', 4, 4, { reg: ['US'], al: [['jet bridge', 'synonym', 4, 4], ['air bridge', 'synonym', 5, 5, ['UK']]] }],
  ],

  // ---------------------------------------------------------------- boats and ships
  boats_and_ships: [
    ['ship', 1, 1], ['boat', 1, 1], ['yacht', 1, 1], ['ferry', 1, 2], ['canoe', 1, 1], ['kayak', 1, 1], ['sailboat', 1, 1, { al: [['sailing boat', 'synonym', 2, 2, ['UK']]] }],
    ['rowboat', 1, 1, { al: [['rowing boat', 'synonym', 2, 2, ['UK']]] }], ['steamship', 2, 2, { al: [['steamer', 'synonym', 3, 3]] }], ['tugboat', 2, 2, { al: [['tug', 'synonym', 3, 3]] }],
    ['lifeboat', 1, 2], ['dinghy', 2, 2], ['schooner', 3, 3], ['galleon', 3, 3], ['raft', 1, 2], ['anchor', 1, 1], ['hull', 3, 3], ['mast', 2, 2], ['sail', 1, 1, { g: 'boat' }],
    ['rudder', 3, 3], ['captain', 1, 1, { g: 'ship' }], ['crew', 1, 2], ['voyage', 2, 2], ['harbor', 1, 1, { al: [['harbour', 'spelling', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN']]] }],
    ['dock', 1, 2, { g: 'port' }], ['pier', 2, 2], ['cargo ship', 2, 1, { al: [['freighter', 'synonym', 3, 3]] }], ['tanker', 2, 2, { g: 'ship' }], ['trawler', 3, 3],
    ['barge', 2, 2], ['gondola', 2, 3, { g: 'boat' }], ['catamaran', 3, 3], ['clipper', 3, 3, { g: 'ship' }], ['ketch', 4, 4],
    ['junk', 3, 4, { g: 'ship' }], ['dhow', 4, 4], ['coracle', 4, 4], ['punt', 3, 3, { g: 'boat' }], ['sloop', 4, 4], ['frigate', 3, 3], ['galley', 3, 3, { g: 'ship kitchen' }],
    ['porthole', 2, 2], ['gangplank', 2, 3, { al: [['gangway', 'synonym', 3, 3]] }], ['life jacket', 1, 2, { al: [['life vest', 'synonym', 2, 2, ['US']], ['life preserver', 'synonym', 3, 3, ['US']]] }],
    ['buoy', 2, 2], ['keel', 3, 3], ['bilge', 4, 4], ["crow's nest", 3, 3, PH()], ['bridge', 2, 3, { g: 'ship' }], ['cruise ship', 1, 1, { al: [['liner', 'synonym', 3, 3, [], { g: 'ship' }]] }],
    ['outboard motor', 3, 3, PH()], ['paddle steamer', 3, 3, PH()], ['jolly boat', 5, 5], ['skiff', 4, 4], ['pinnace', 5, 5], ['carrack', 5, 5], ['brigantine', 5, 5],
    ['longship', 3, 3, { al: [['longboat', 'synonym', 4, 4]] }], ['windjammer', 5, 5], ['scow', 5, 5], ['tender', 5, 5, { g: 'ship' }], ['lugger', 5, 5],
  ],

  // ---------------------------------------------------------------- trains
  trains: [
    ['locomotive', 2, 1, { al: [['engine', 'synonym', 1, 1, [], { g: 'locomotive' }], ['loco', 'synonym', 3, 3, ['UK']]] }], ['steam engine', 1, 1, { al: [['steam locomotive', 'synonym', 2, 2]] }],
    ['railway', 1, 1, { reg: ['UK', 'AU', 'IN', 'IE', 'NZ', 'ZA'], al: [['railroad', 'synonym', 1, 1, ['US', 'CA']]] }], ['station', 1, 1, { g: 'train' }], ['platform', 1, 1, { g: 'station' }],
    ['track', 1, 1, { g: 'railway' }], ['railcar', 2, 2, { reg: ['US'], al: [['carriage', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE'], { g: 'train' }], ['coach', 'synonym', 3, 3, ['UK', 'IN'], { g: 'train' }]] }],
    ['conductor', 1, 2, { g: 'train', al: [['guard', 'synonym', 2, 2, ['UK', 'AU', 'IN'], { g: 'train' }]] }], ['ticket', 1, 1, { g: 'train' }], ['express', 2, 2, { g: 'train' }],
    ['bullet train', 1, 1, { al: [['shinkansen', 'synonym', 4, 4]] }], ['freight train', 2, 2, { al: [['goods train', 'synonym', 3, 3, ['UK', 'IN']]] }], ['caboose', 3, 3, { reg: ['US', 'CA'], al: [["guard's van", 'synonym', 4, 4, ['UK']]] }],
    ['boxcar', 3, 3, { al: [['freight car', 'synonym', 3, 3, ['US']]] }], ['tender', 4, 4, { g: 'train' }], ['whistle', 1, 2, { g: 'train' }], ['signal', 2, 2, { g: 'railway' }],
    ['level crossing', 2, 2, { reg: ['UK', 'AU', 'IE', 'NZ'], al: [['grade crossing', 'synonym', 4, 4, ['US', 'CA']], ['railroad crossing', 'synonym', 2, 2, ['US']]] }],
    ['sleeper car', 2, 2, { al: [['sleeping car', 'synonym', 3, 3], ['Pullman', 'synonym', 4, 4, ['US'], { tm: true, type: 'org' }]] }], ['dining car', 2, 2, { al: [['buffet car', 'synonym', 3, 3, ['UK']]] }],
    ['diesel', 2, 3, { g: 'train' }], ['tunnel', 1, 2, { g: 'train' }], ['viaduct', 3, 3], ['switch', 3, 3, { g: 'railway', reg: ['US'], al: [['points', 'synonym', 3, 3, ['UK', 'AU', 'NZ', 'IE'], { g: 'railway' }]] }],
    ['buffers', 4, 4, { g: 'railway', reg: ['UK'] }], ['coupling', 3, 3, { g: 'train' }], ['ticket inspector', 2, 2, { reg: ['UK'] }], ['maglev', 3, 3], ['narrow gauge', 4, 4],
    ['tank engine', 3, 3, { reg: ['UK'] }], ['branch line', 4, 4, { reg: ['UK'] }], ['siding', 4, 4, { al: [['spur', 'synonym', 5, 5, [], { g: 'railway' }]] }],
    ['switchyard', 4, 4, { reg: ['US'], al: [['marshalling yard', 'synonym', 4, 4, ['UK']]] }], ['junction', 3, 3, { g: 'railway' }], ['derailment', 3, 3], ['rack railway', 4, 4, { al: [['cog railway', 'synonym', 4, 4, ['US']]] }],
    ['signal box', 4, 4, { reg: ['UK'] }], ['railcard', 4, 3, { reg: ['UK'] }], ['model railway', 3, 3, { reg: ['UK'], al: [['model railroad', 'synonym', 3, 3, ['US']]] }],
    ['commuter train', 2, 2], ['steam whistle', 3, 3], ['cowcatcher', 4, 4], ['bogie', 5, 5, { reg: ['UK'], al: [['truck', 'synonym', 5, 5, ['US'], { g: 'railway' }]] }],
    ['pantograph', 5, 5], ['firebox', 5, 5], ['railbus', 5, 5], ['handcar', 5, 5, { al: [['pump trolley', 'synonym', 5, 5, ['AU']]] }], ['trainspotter', 4, 4],
  ],

  // ---------------------------------------------------------------- journeys
  journeys: [
    ['voyage', 2, 2], ['trek', 2, 2], ['tour', 1, 1], ['excursion', 2, 2], ['expedition', 2, 2], ['outing', 2, 2], ['odyssey', 3, 2], ['trip', 1, 1, { al: [['jaunt', 'synonym', 3, 3]] }],
    ['safari', 2, 3], ['cruise', 1, 2], ['road trip', 1, 1], ['commute', 1, 2], ['hike', 1, 2], ['getaway', 2, 2, { al: [['escape', 'synonym', 2, 3, [], { g: 'trip' }]] }],
    ['junket', 4, 4], ['sojourn', 4, 3], ['crossing', 2, 3, { g: 'sea' }], ['passage', 3, 3, { g: 'journey' }], ['itinerary', 3, 2], ['detour', 2, 3], ['day trip', 1, 1],
    ['field trip', 1, 1], ['round trip', 2, 2], ['quest', 2, 3], ['pilgrimage', 3, 2, { sens: true }], ['grand tour', 3, 3], ['ramble', 3, 3, { g: 'walk' }], ['errand', 2, 3],
    ['drive', 1, 2, { g: 'trip' }], ['ride', 1, 2, { g: 'trip' }], ['joyride', 3, 3], ['peregrination', 5, 5], ['wanderings', 4, 3], ['travels', 2, 2],
    ['tramp', 4, 4, { g: 'long walk' }], ['schlep', 4, 3, { reg: ['US'] }], ['trudge', 3, 3], ['slog', 3, 3, { g: 'journey' }],
    ['circuit', 3, 4, { g: 'tour' }], ['transit', 3, 3, { g: 'passage' }], ['stopover', 2, 2], ['long haul', 2, 2, PH()], ['milk run', 4, 4, PH()],
    ['wayfaring', 4, 4], ['sightseeing', 2, 2], ['gap year', 3, 3, { reg: ['UK', 'AU', 'NZ', 'IE'] }], ['staycation', 3, 4, { al: [['holiday at home', 'synonym', 3, 3, ['UK'], { type: 'phrase' }]] }],
    ['hajj', 3, 3, { sens: true }], ['leg', 3, 3, { g: 'journey' }], ['mini-break', 3, 3, { reg: ['UK'] }], ['hegira', 5, 5, { sens: true }],
  ],

  // ---------------------------------------------------------------- accommodation
  accommodation: [
    ['hotel', 1, 1], ['motel', 1, 1], ['hostel', 1, 1, { al: [['youth hostel', 'synonym', 2, 2]] }], ['inn', 2, 1], ['B&B', 2, 1, { type: 'acronym', al: [['bed and breakfast', 'synonym', 1, 1, [], { type: 'phrase' }]] }],
    ['guesthouse', 2, 2, { al: [['guest house', 'spelling', 2, 2]] }], ['resort', 1, 2], ['lodge', 2, 2, { g: 'accommodation' }], ['villa', 2, 2], ['cabin', 1, 2], ['cottage', 1, 2],
    ['chalet', 2, 2], ['boarding house', 3, 2, { al: [['rooming house', 'synonym', 4, 3, ['US']]] }], ['pension', 4, 3, { g: 'guesthouse' }], ['bungalow', 2, 3],
    ['apartment hotel', 3, 3], ['serviced apartment', 3, 3], ['Airbnb', 2, 2, { type: 'org', tm: true }], ['capsule hotel', 3, 3], ['ryokan', 4, 4], ['riad', 4, 4], ['parador', 4, 4],
    ['pousada', 5, 5], ['auberge', 4, 4], ['albergue', 5, 5], ['posada', 4, 4], ['homestay', 3, 3], ['timeshare', 3, 3], ['boutique hotel', 3, 3], ['safari lodge', 3, 3],
    ['houseboat', 2, 3], ['yurt', 3, 3], ['glamping', 3, 3], ['hut', 2, 3, { g: 'mountain shelter' }], ['bothy', 5, 4, { reg: ['UK'] }],
    ['caravan park', 3, 3, { reg: ['UK', 'AU', 'NZ', 'IE'] }], ['vacation rental', 2, 2, { al: [['holiday let', 'synonym', 3, 3, ['UK']], ['holiday home', 'synonym', 2, 2, ['UK', 'AU']]] }],
    ['luxury hotel', 2, 2], ['dormitory', 2, 3, { al: [['dorm', 'synonym', 2, 3]] }], ['bunkhouse', 4, 4], ['lodging house', 4, 4], ['hospice', 4, 4, { g: 'inn', sens: true }],
    ['caravanserai', 5, 5], ['khan', 5, 5, { g: 'inn' }], ['dak bungalow', 5, 5, { reg: ['IN'] }], ['dharamshala', 5, 5, { reg: ['IN'], sens: true }], ['minshuku', 5, 5], ['refuge', 3, 4, { g: 'mountain hut' }],
    ['rest house', 4, 4], ['roadhouse', 4, 4], ['country inn', 3, 2], ['coaching inn', 4, 3, { reg: ['UK'] }], ['agriturismo', 5, 5], ['gîte', 4, 4, { al: [['gite', 'spelling', 4, 4]] }],
  ],

  // ---------------------------------------------------------------- campsite
  campsite: [
    ['tent', 1, 1], ['campfire', 1, 1], ['sleeping bag', 1, 1, { al: [['bedroll', 'synonym', 3, 3]] }], ['lantern', 2, 1], ['flashlight', 1, 1, { reg: ['US', 'CA'], al: [['torch', 'synonym', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN'], { g: 'flashlight' }]] }],
    ['backpack', 1, 2, { al: [['rucksack', 'synonym', 2, 2, ['UK']]] }], ['tarp', 2, 2, { al: [['tarpaulin', 'synonym', 2, 2]] }], ['camp stove', 2, 1], ['cooler', 2, 2, { reg: ['US', 'CA'], al: [['cool box', 'synonym', 2, 2, ['UK']], ['esky', 'synonym', 4, 4, ['AU']], ['chilly bin', 'synonym', 4, 4, ['NZ']]] }],
    ['canteen', 3, 2, { g: 'water bottle' }], ['marshmallow', 1, 2], ["s'more", 2, 2, { reg: ['US', 'CA'] }], ['firewood', 1, 1], ['kindling', 2, 2], ['fire pit', 2, 2], ['hammock', 1, 2],
    ['compass', 1, 2], ['pocketknife', 2, 3, { al: [['penknife', 'synonym', 3, 3, ['UK']]] }], ['mess kit', 3, 2], ['cot', 2, 3, { g: 'camp bed' }], ['air mattress', 2, 2, { al: [['lilo', 'synonym', 4, 4, ['UK', 'IE']]] }],
    ['bug spray', 1, 2, { al: [['insect repellent', 'synonym', 2, 2]] }], ['camp chair', 2, 1], ['picnic table', 1, 2], ['tent peg', 2, 1, { al: [['tent stake', 'synonym', 2, 2, ['US']]] }],
    ['guy rope', 3, 2, { al: [['guy line', 'synonym', 3, 3]] }], ['groundsheet', 3, 3, { reg: ['UK', 'AU'], al: [['ground cloth', 'synonym', 3, 3, ['US']]] }], ['campground', 2, 1, { reg: ['US', 'CA'] }],
    ['Thermos', 2, 3, { type: 'org', tm: true, al: [['vacuum flask', 'synonym', 3, 3, ['UK'], { type: 'common', tm: false }]] }], ['mosquito net', 2, 3], ['hatchet', 3, 3], ['matches', 1, 2, { g: 'fire' }], ['headlamp', 3, 2, { al: [['head torch', 'synonym', 3, 3, ['UK']]] }],
    ['bear canister', 4, 3], ['rainfly', 4, 3, { al: [['flysheet', 'synonym', 4, 4, ['UK']]] }], ['campervan', 2, 3, { reg: ['UK', 'AU', 'NZ'] }], ['latrine', 3, 3], ['outhouse', 3, 3, { reg: ['US'] }],
    ['camp counselor', 2, 2, { reg: ['US', 'CA'] }], ['trail mix', 2, 3], ['bivouac', 4, 4, { al: [['bivvy', 'synonym', 4, 4, ['UK']]] }],
    ['tinder', 3, 3, { g: 'fire' }], ['ferro rod', 5, 4], ['paracord', 4, 4], ['carabiner', 4, 4], ['spork', 3, 3], ['billy can', 5, 4, { reg: ['AU', 'NZ', 'UK'], al: [['billycan', 'spelling', 5, 4, ['AU', 'NZ']]] }],
    ['hurricane lamp', 4, 4], ['Trangia', 5, 5, { type: 'org', tm: true }], ['Dutch oven', 3, 3, { g: 'cast iron pot' }], ['percolator', 4, 4],
  ],

  // ---------------------------------------------------------------- special vehicles
  special_vehicles: [
    ['ambulance', 1, 1], ['fire truck', 1, 1, { reg: ['US', 'CA'], al: [['fire engine', 'synonym', 1, 1, ['UK', 'AU', 'NZ', 'IE']]] }], ['police car', 1, 1, { al: [['squad car', 'synonym', 2, 2, ['US']], ['cop car', 'synonym', 2, 2, ['US']]] }],
    ['snowplow', 1, 1, { reg: ['US', 'CA'], al: [['snowplough', 'spelling', 1, 1, ['UK', 'AU', 'NZ', 'IE']]] }], ['forklift', 2, 1], ['tractor', 1, 1], ['hearse', 2, 1, { sens: true }],
    ['bulldozer', 1, 1, { al: [['dozer', 'synonym', 3, 3]] }], ['excavator', 2, 2, { al: [['digger', 'synonym', 1, 1, [], { g: 'machine' }], ['JCB', 'synonym', 3, 3, ['UK', 'IE'], { tm: true, type: 'org' }]] }],
    ['crane', 1, 2, { g: 'machine' }], ['dump truck', 1, 1, { al: [['tipper truck', 'synonym', 3, 3, ['UK']], ['dumper', 'synonym', 4, 4, ['UK']]] }], ['cement mixer', 2, 1, { al: [['concrete mixer', 'synonym', 2, 2]] }],
    ['tow truck', 1, 1, { al: [['wrecker', 'synonym', 4, 4, ['US']], ['breakdown truck', 'synonym', 3, 3, ['UK']]] }],
    ['garbage truck', 1, 1, { reg: ['US', 'CA'], al: [['bin lorry', 'synonym', 3, 3, ['UK']], ['dustcart', 'synonym', 4, 4, ['UK']], ['rubbish truck', 'synonym', 3, 3, ['AU', 'NZ']]] }],
    ['street sweeper', 2, 2, { al: [['road sweeper', 'synonym', 3, 3, ['UK']]] }], ['tanker truck', 2, 2, { al: [['road tanker', 'synonym', 4, 4, ['UK']]] }],
    ['ice cream truck', 1, 2, PH({ reg: ['US', 'CA'], al: [['ice cream van', 'synonym', 1, 2, ['UK', 'AU', 'NZ', 'IE'], { type: 'phrase' }]] })], ['school bus', 1, 2], ['armored car', 2, 2, { al: [['armoured car', 'spelling', 2, 2, ['UK']]] }],
    ['tank', 1, 2, { g: 'military vehicle', adult: true, sens: true }], ['police van', 2, 2], ['backhoe', 3, 3], ['steamroller', 2, 2, { al: [['road roller', 'synonym', 3, 3, ['UK']]] }],
    ['Zamboni', 3, 3, { type: 'org', tm: true, al: [['ice resurfacer', 'synonym', 5, 5, [], { type: 'common', tm: false }]] }], ['combine harvester', 2, 2, { al: [['combine', 'synonym', 2, 2, [], { g: 'harvester' }]] }],
    ['cherry picker', 3, 3, { al: [['aerial work platform', 'synonym', 5, 5, [], { type: 'phrase' }]] }], ['lunar rover', 3, 3], ['golf cart', 1, 3, { al: [['golf buggy', 'synonym', 3, 3, ['UK']]] }],
    ['snowmobile', 2, 2, { al: [['Ski-Doo', 'synonym', 3, 3, ['CA'], { tm: true, type: 'org' }], ['sno-cat', 'synonym', 5, 5]] }], ['ATV', 2, 3, { type: 'acronym', al: [['quad bike', 'synonym', 2, 2, ['UK', 'AU', 'NZ'], { type: 'common' }]] }],
    ['monster truck', 1, 3], ['food truck', 1, 2], ['flatbed truck', 3, 3], ['front loader', 3, 3], ['grader', 4, 4, { al: [['road grader', 'synonym', 4, 4]] }],
    ['mail truck', 2, 2, { reg: ['US'], al: [['post van', 'synonym', 3, 3, ['UK']]] }], ['milk float', 4, 4, { reg: ['UK'] }], ['bookmobile', 4, 4, { reg: ['US', 'CA'], al: [['mobile library', 'synonym', 3, 3, ['UK']]] }],
    ['hovercraft', 2, 3], ['amphibious vehicle', 3, 3], ['skid steer', 4, 4, { al: [['Bobcat', 'synonym', 3, 3, ['US'], { tm: true, type: 'org' }]] }],
    ['telehandler', 5, 5], ['pile driver', 4, 4, { g: 'machine' }], ['road train', 4, 4, { reg: ['AU'] }], ['tractor trailer', 2, 3, { reg: ['US'], al: [['semi', 'synonym', 2, 2, ['US'], { g: 'truck' }], ['articulated lorry', 'synonym', 3, 3, ['UK']]] }],
    ['wheelchair van', 3, 3], ['hay baler', 4, 4, { al: [['baler', 'synonym', 4, 4]] }],
  ],
};

export const ALIASES = [];

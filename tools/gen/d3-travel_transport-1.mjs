// Generated word data: Travel & Transport depth-3 themes, chunk 1 (cars, public transportation, air travel, boats and ships).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const O = (o = {}) => ({ type: 'org', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const PL = (o = {}) => ({ type: 'place', ...o });
const verb = (o = {}) => ({ pos: 'verb', ...o });
const syn = (t, r, i, reg = [], o = {}) => [t, 'synonym', r, i, reg, o];

export const THEMES = {
  car_brands: { d: 1 }, car_parts: { d: 2 }, car_types: { d: 2 }, driving_words: { d: 3 }, motor_racing: { d: 3 }, road_signs: { d: 3 },
  gas_station: { d: 2 }, parking_words: { d: 3 }, car_accessories: { d: 2 }, bus_types: { d: 2 }, on_a_bus: { d: 2 }, ticket_words: { d: 3 },
  commuting_words: { d: 3 }, taxis_of_the_world: { d: 4 }, cable_cars_and_lifts: { d: 3 }, aircraft_types: { d: 2 }, plane_parts: { d: 3 },
  airport_words: { d: 2 }, flight_crew: { d: 2 }, airlines: { d: 2 }, flying_machines: { d: 1 }, famous_airports: { d: 3 }, in_flight_words: { d: 2 },
  aircraft_makers: { d: 4 }, hot_air_balloon_parts: { d: 5 }, boat_types: { d: 2 }, ship_parts: { d: 3 }, sailing_words: { d: 4 },
  ports_and_harbors: { d: 3 }, famous_ships: { d: 3 },
};

export const DATA = {
  // ---------------------------------------------------------------- car brands
  car_brands: [
    ['Toyota', 1, 1, O()], ['Ford', 1, 1, O()], ['Honda', 1, 1, O()], ['Chevrolet', 1, 1, O({ al: [['Chevy', 'synonym', 1, 1, ['US']]] })],
    ['Volkswagen', 1, 1, O({ al: [['VW', 'synonym', 1, 1, [], { type: 'acronym' }]] })], ['BMW', 1, 1, O({ type: 'acronym' })],
    ['Mercedes-Benz', 1, 1, O({ al: [['Mercedes', 'synonym', 1, 1]] })], ['Audi', 1, 1, O()], ['Nissan', 1, 1, O()], ['Hyundai', 2, 1, O()],
    ['Kia', 2, 1, O()], ['Tesla', 1, 1, O({ g: 'car' })], ['Volvo', 2, 1, O()], ['Porsche', 1, 1, O()], ['Ferrari', 1, 1, O()],
    ['Lamborghini', 1, 1, O()], ['Jaguar', 1, 2, O({ g: 'car' })], ['Mazda', 2, 1, O()], ['Subaru', 2, 1, O()], ['Fiat', 2, 1, O()],
    ['Jeep', 1, 2, O()], ['Land Rover', 2, 2, O()], ['Lexus', 2, 1, O()], ['Bentley', 2, 2, O()], ['Rolls-Royce', 2, 2, O({ al: [['Roller', 'synonym', 4, 4, ['UK']]] })],
    ['Aston Martin', 2, 2, O()], ['Maserati', 3, 2, O()], ['Bugatti', 3, 2, O()], ['Peugeot', 3, 2, O()], ['Renault', 3, 2, O()],
    ['Citroen', 3, 2, O({ al: [['Citroën', 'spelling', 3, 3]] })], ['Skoda', 3, 2, O()], ['Saab', 3, 2, O()], ['Lotus', 3, 3, O({ g: 'car' })],
    ['McLaren', 3, 3, O()], ['Alfa Romeo', 3, 2, O()], ['Dodge', 2, 2, O()], ['Cadillac', 2, 2, O()], ['Buick', 3, 2, O()], ['Lancia', 4, 3, O()],
    ['Suzuki', 2, 2, O()], ['Dacia', 4, 3, O()], ['Pagani', 5, 4, O()], ['Koenigsegg', 5, 4, O()], ['Opel', 4, 3, O()], ['Vauxhall', 3, 3, O({ reg: ['UK'] })],
    ['Pontiac', 3, 3, O()], ['Hummer', 3, 3, O()], ['DeLorean', 3, 3, O()], ['Tata', 4, 4, O({ g: 'carmaker' })],
  ],

  // ---------------------------------------------------------------- car parts
  car_parts: [
    ['engine', 1, 1], ['wheel', 1, 1], ['tire', 1, 1, { al: [['tyre', 'spelling', 1, 1, ['UK']]] }], ['steering wheel', 1, 1], ['brake', 1, 1, { g: 'car' }],
    ['door', 1, 2, { g: 'car' }], ['windshield', 1, 1, { al: [['windscreen', 'spelling', 2, 2, ['UK']]] }], ['seat belt', 1, 1], ['headlight', 1, 1],
    ['horn', 1, 2, { g: 'car' }], ['trunk', 1, 2, { g: 'car', al: [['boot', 'synonym', 1, 3, ['UK'], { g: 'car' }]] }], ['hood', 2, 3, { g: 'car', al: [['bonnet', 'synonym', 2, 2, ['UK']]] }],
    ['bumper', 1, 1], ['gas pedal', 2, 2, { al: [['accelerator', 'synonym', 2, 2], ['throttle', 'synonym', 3, 3, [], { g: 'car' }]] }],
    ['gearstick', 3, 2, { reg: ['UK'], al: [['gear shift', 'synonym', 2, 2, ['US']], ['gear lever', 'synonym', 3, 3, ['UK']]] }],
    ['clutch', 2, 2, { g: 'car' }], ['battery', 1, 2, { g: 'car' }], ['radiator', 2, 2, { g: 'car' }], ['spark plug', 2, 1], ['exhaust pipe', 2, 1, { al: [['tailpipe', 'synonym', 3, 3]] }],
    ['muffler', 3, 2, { reg: ['US'], al: [['silencer', 'synonym', 3, 3, ['UK']]] }], ['wiper', 2, 1, { al: [['windshield wiper', 'synonym', 2, 1]] }],
    ['rearview mirror', 2, 1, { al: [['rear-view mirror', 'spelling', 2, 1, ['UK']]] }], ['hubcap', 3, 1, { al: [['wheel cover', 'synonym', 3, 3]] }],
    ['axle', 3, 2], ['transmission', 2, 2, { al: [['gearbox', 'synonym', 2, 2, ['UK']]] }], ['carburetor', 4, 3, { al: [['carburettor', 'spelling', 4, 3, ['UK']]] }],
    ['alternator', 4, 3], ['piston', 3, 2], ['crankshaft', 4, 3], ['camshaft', 4, 4], ['catalytic converter', 3, 3], ['fuel injector', 4, 3],
    ['shock absorber', 3, 2, { al: [['damper', 'synonym', 4, 4, [], { g: 'car' }]] }], ['brake pad', 3, 2], ['drive shaft', 4, 3], ['differential', 4, 3],
    ['fan belt', 3, 3, { al: [['serpentine belt', 'synonym', 4, 4, ['US']]] }], ['distributor', 4, 4], ['timing belt', 4, 3], ['gasket', 4, 4], ['manifold', 4, 4], ['dipstick', 3, 3],
    ['starter motor', 4, 3], ['subframe', 5, 5], ['tie rod', 5, 5], ['cylinder head', 4, 3],
  ],

  // ---------------------------------------------------------------- car types
  car_types: [
    ['sedan', 2, 1, { al: [['saloon', 'synonym', 2, 2, ['UK'], { g: 'car' }]] }], ['hatchback', 2, 1], ['convertible', 1, 1, { al: [['cabriolet', 'synonym', 4, 3], ['drophead', 'synonym', 5, 5, ['UK']]] }],
    ['coupe', 2, 1, { al: [['coupé', 'spelling', 2, 1]] }], ['SUV', 1, 1, { type: 'acronym' }], ['minivan', 2, 1, { al: [['people carrier', 'synonym', 3, 2, ['UK']], ['MPV', 'synonym', 4, 3, ['UK'], { type: 'acronym' }]] }],
    ['pickup truck', 1, 1, { al: [['ute', 'synonym', 4, 4, ['AU', 'NZ']], ['pickup', 'synonym', 2, 2, [], { g: 'truck' }]] }], ['station wagon', 2, 1, { al: [['estate car', 'synonym', 2, 2, ['UK']]] }],
    ['sports car', 1, 1], ['limousine', 1, 1, { al: [['limo', 'synonym', 1, 1]] }], ['jeep', 2, 3, { g: 'vehicle' }], ['van', 1, 2, { g: 'vehicle' }],
    ['crossover', 3, 2, { g: 'car' }], ['roadster', 3, 2], ['muscle car', 2, 2], ['supercar', 2, 2, { al: [['hypercar', 'synonym', 3, 3]] }], ['compact car', 3, 2],
    ['subcompact', 4, 3], ['microcar', 4, 3], ['city car', 3, 2, { reg: ['UK'] }], ['electric car', 1, 1, { al: [['EV', 'synonym', 3, 2, [], { type: 'acronym' }]] }],
    ['hybrid', 2, 2, { g: 'car' }], ['hot hatch', 4, 3, { reg: ['UK'] }], ['dune buggy', 3, 3], ['hot rod', 3, 2], ['lowrider', 4, 3], ['kit car', 4, 4, { reg: ['UK'] }],
    ['town car', 3, 3], ['grand tourer', 4, 4, { al: [['GT', 'synonym', 3, 3, [], { type: 'acronym', g: 'car' }]] }], ['targa', 4, 4, { g: 'car' }], ['fastback', 4, 3],
    ['shooting brake', 5, 5, { reg: ['UK'] }], ['liftback', 5, 5], ['microvan', 5, 5], ['vintage car', 2, 2, { al: [['classic car', 'synonym', 1, 1]] }], ['jalopy', 3, 3, { al: [['banger', 'synonym', 3, 3, ['UK'], { g: 'car' }]] }],
  ],

  // ---------------------------------------------------------------- driving words
  driving_words: [
    ['accelerate', 2, 1, verb()], ['brake', 1, 2, verb({ g: 'to slow' })], ['steer', 2, 1, verb()], ['overtake', 2, 2, verb({ reg: ['UK'], al: [['pass', 'synonym', 1, 3, ['US'], { pos: 'verb', g: 'overtake' }]] })],
    ['reverse', 1, 2, verb({ g: 'drive' })], ['park', 1, 2, verb({ g: 'car' })], ['honk', 1, 2, verb({ al: [['beep', 'synonym', 1, 2, [], { pos: 'verb', g: 'horn' }]] })], ['merge', 2, 2, verb({ g: 'traffic' })],
    ['u-turn', 2, 1], ['three-point turn', 3, 2], ['roundabout', 2, 2, { reg: ['UK'], al: [['traffic circle', 'synonym', 3, 3, ['US']], ['rotary', 'synonym', 4, 4, ['US'], { g: 'traffic' }]] }],
    ['intersection', 2, 2, { al: [['junction', 'synonym', 2, 2, ['UK']], ['crossroads', 'synonym', 2, 2]] }], ['speed limit', 1, 1], ['speeding', 1, 1], ['tailgate', 3, 2, verb({ g: 'drive' })],
    ['hairpin bend', 3, 2], ['cruise control', 2, 2], ['stall', 2, 2, verb({ g: 'engine' })], ['skid', 2, 2, verb()], ['hydroplane', 4, 3, verb({ al: [['aquaplane', 'synonym', 4, 3, ['UK'], { pos: 'verb' }]] })],
    ['drift', 2, 3, verb({ g: 'car' })], ['learner driver', 2, 2, { reg: ['UK'], al: [['student driver', 'synonym', 3, 3, ['US']]] }], ['driving test', 1, 1], ['road rage', 2, 2],
    ['rush hour', 1, 2], ['traffic jam', 1, 1, { al: [['gridlock', 'synonym', 3, 3], ['tailback', 'synonym', 4, 4, ['UK']]] }], ['carpool', 2, 2, verb({ al: [['car share', 'synonym', 3, 3]] })],
    ['blind spot', 2, 2], ['pothole', 2, 3], ['hazard lights', 2, 1, { al: [['four-way flashers', 'synonym', 4, 4, ['US']]] }], ['indicator', 2, 2, { g: 'car', reg: ['UK'], al: [['turn signal', 'synonym', 2, 2, ['US']], ['blinker', 'synonym', 3, 3, ['US']]] }],
    ['jaywalk', 3, 3, verb({ reg: ['US'] })], ['double park', 3, 2, verb()], ['hit and run', 2, 2], ['joyride', 3, 3], ['heel and toe', 5, 5], ['double declutch', 5, 5],
    ['slipstream', 3, 4, { g: 'driving' }], ['contraflow', 4, 3, { reg: ['UK'] }], ['filter lane', 4, 3, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- motor racing
  motor_racing: [
    ['pit stop', 1, 1], ['pit crew', 2, 1], ['checkered flag', 1, 1, { al: [['chequered flag', 'spelling', 2, 2, ['UK']]] }], ['pole position', 2, 1], ['grid', 3, 2, { g: 'racing' }],
    ['lap', 1, 2, { g: 'race' }], ['podium', 2, 3], ['paddock', 3, 2, { g: 'racing' }], ['chicane', 3, 1], ['hairpin', 3, 2, { g: 'racing' }], ['Formula 1', 3, 1, { al: [['F1', 'synonym', 1, 1], ['Formula One', 'spelling', 2, 1]] }],
    ['NASCAR', 2, 1, { type: 'acronym', tm: true }], ['IndyCar', 3, 2, { tm: true, type: 'proper', al: [] }], ['rally', 2, 2, { g: 'motor sport' }], ['drag racing', 2, 1], ['go-kart', 2, 2, { al: [['kart', 'synonym', 3, 3], ['go-cart', 'spelling', 2, 2, ['US']]] }],
    ['stock car', 2, 1], ['dragster', 3, 2], ['slick', 4, 3, { g: 'tire' }], ['pace car', 3, 2], ['safety car', 3, 2], ['qualifying', 3, 2], ['formation lap', 4, 3],
    ['black flag', 4, 3], ['red flag', 3, 3, { g: 'racing' }], ['downforce', 4, 2], ['slipstream', 3, 3, { g: 'racing' }], ['drafting', 3, 3], ['apex', 4, 3, { g: 'corner' }], ['pit lane', 3, 2],
    ['chequered', 4, 4, { reg: ['UK'] }], ['DRS', 5, 4, { type: 'acronym' }], ['undercut', 5, 4, { g: 'racing' }], ['parc ferme', 5, 5, { type: 'common' }], ['Le Mans', 3, 2, PL({ g: 'race' })],
    ['Daytona 500', 3, 2, P()], ['Indy 500', 3, 2, P()], ['Monaco Grand Prix', 3, 2, P()], ['Grand Prix', 2, 1, P()], ['motocross', 3, 3], ['hill climb', 4, 3], ['time trial', 3, 3, { g: 'motor sport' }],
    ['tarmac rally', 5, 5], ['Dakar Rally', 4, 3, P()], ['co-driver', 4, 3],
  ],

  // ---------------------------------------------------------------- road signs
  road_signs: [
    ['stop', 1, 1, { g: 'sign' }], ['yield', 2, 1, { g: 'sign', al: [['give way', 'synonym', 2, 1, ['UK']]] }], ['speed limit', 1, 1, { g: 'sign' }], ['no entry', 2, 1], ['one way', 1, 1], ['do not enter', 3, 1, { reg: ['US'] }],
    ['no parking', 1, 1], ['no U-turn', 3, 2], ['pedestrian crossing', 2, 1, { al: [['crosswalk', 'synonym', 2, 1, ['US']], ['zebra crossing', 'synonym', 2, 2, ['UK']]] }], ['school zone', 3, 1, { reg: ['US'] }],
    ['deer crossing', 3, 1, { reg: ['US'] }], ['slippery road', 3, 1], ['sharp curve', 3, 1], ['merge', 2, 2, { g: 'sign' }], ['detour', 2, 1], ['road work', 2, 1, { al: [['roadworks', 'synonym', 2, 1, ['UK']]] }],
    ['dead end', 1, 1, { al: [['no through road', 'synonym', 3, 2, ['UK']], ['cul-de-sac', 'synonym', 3, 3]] }], ['railroad crossing', 2, 1, { reg: ['US'], al: [['level crossing', 'synonym', 2, 1, ['UK']]] }], ['falling rocks', 3, 1],
    ['roundabout ahead', 3, 1, { reg: ['UK'] }], ['hospital', 1, 2, { g: 'sign' }], ['rest area', 3, 2, { reg: ['US'], al: [['services', 'synonym', 3, 3, ['UK'], { g: 'motorway' }], ['lay-by', 'synonym', 4, 4, ['UK']]] }], ['no overtaking', 3, 2, { reg: ['UK'] }],
    ['no passing zone', 3, 2, { reg: ['US'] }], ['keep right', 2, 1], ['keep left', 2, 1, { reg: ['UK'] }], ['wrong way', 2, 1], ['toll road', 2, 1], ['low bridge', 3, 1, { reg: ['UK'] }],
    ['truck route', 4, 3], ['weight limit', 3, 2], ['height limit', 3, 2], ['bike lane', 2, 2, { al: [['cycle lane', 'synonym', 2, 2, ['UK']]] }], ['bus lane', 2, 2], ['HOV lane', 4, 3, { reg: ['US'] }],
    ['tow-away zone', 3, 2, { reg: ['US'] }], ['clearway', 4, 3, { reg: ['UK'] }], ['red light', 1, 2, { g: 'traffic' }], ['traffic light', 1, 1, { al: [['stoplight', 'synonym', 2, 2, ['US']], ['traffic signal', 'synonym', 2, 2]] }],
    ['hazard warning', 4, 4], ['gradient', 4, 3, { g: 'sign' }], ['chevron', 4, 3, { g: 'sign' }], ['soft shoulder', 4, 3, { al: [['soft verge', 'synonym', 5, 5, ['UK']]] }],
  ],

  // ---------------------------------------------------------------- gas station
  gas_station: [
    ['pump', 1, 1, { g: 'fuel' }], ['nozzle', 2, 1], ['gasoline', 1, 1, { al: [['petrol', 'synonym', 1, 1, ['UK']], ['gas', 'synonym', 1, 1, ['US'], { g: 'fuel' }]] }], ['diesel', 1, 1], ['unleaded', 2, 1],
    ['premium', 2, 2, { g: 'fuel' }], ['regular', 3, 3, { g: 'fuel' }], ['octane', 3, 2], ['fuel gauge', 2, 2], ['gas cap', 2, 1, { al: [['fuel cap', 'synonym', 2, 2], ['petrol cap', 'synonym', 2, 2, ['UK']]] }],
    ['gas tank', 1, 1, { al: [['fuel tank', 'synonym', 2, 2], ['petrol tank', 'synonym', 2, 2, ['UK']]] }], ['fill up', 1, 1, verb({ al: [['top up', 'synonym', 2, 3, ['UK'], { pos: 'verb', g: 'fuel' }]] })], ['car wash', 1, 2], ['air pump', 2, 1, { al: [['tire inflator', 'synonym', 3, 2, ['US']]] }],
    ['convenience store', 2, 2], ['cashier', 1, 3, { g: 'gas station' }], ['pay at the pump', 3, 2], ['price sign', 3, 2], ['canopy', 3, 3, { g: 'gas station' }], ['windshield squeegee', 4, 3, { al: [['squeegee', 'synonym', 3, 3]] }],
    ['jerry can', 3, 2, { al: [['gas can', 'synonym', 2, 2, ['US']], ['petrol can', 'synonym', 2, 2, ['UK']]] }], ['oil change', 2, 2], ['antifreeze', 3, 2], ['motor oil', 2, 1], ['propane', 3, 3, { g: 'fuel' }],
    ['LPG', 4, 3, { type: 'acronym' }], ['ethanol', 3, 3], ['biodiesel', 4, 4], ['E85', 5, 4, { type: 'acronym' }], ['underground tank', 4, 4], ['fuel card', 4, 3], ['forecourt', 4, 2, { reg: ['UK'] }],
    ['service station', 2, 1, { al: [['filling station', 'synonym', 2, 1, ['UK']]] }], ['attendant', 2, 2, { g: 'gas station' }], ['vapor recovery', 5, 5], ['hose', 2, 2, { g: 'pump' }],
  ],

  // ---------------------------------------------------------------- parking words
  parking_words: [
    ['parking lot', 1, 1, { al: [['car park', 'synonym', 1, 1, ['UK']]] }], ['parking space', 1, 1, { al: [['parking spot', 'synonym', 1, 1], ['parking bay', 'synonym', 3, 3, ['UK']]] }], ['meter', 2, 2, { g: 'parking' }],
    ['parking meter', 1, 1], ['parking ticket', 1, 1, { al: [['parking fine', 'synonym', 2, 2, ['UK']]] }], ['parallel parking', 2, 1], ['valet', 2, 2, { g: 'parking' }], ['garage', 1, 2, { g: 'parking' }],
    ['parking garage', 1, 1, { al: [['multi-storey', 'synonym', 3, 3, ['UK']]] }], ['handicap spot', 3, 2, { reg: ['US'], al: [['disabled bay', 'synonym', 3, 2, ['UK']]] }], ['permit', 2, 3, { g: 'parking' }], ['reserved', 2, 3, { g: 'parking' }],
    ['no parking', 1, 1, { g: 'zone' }], ['double yellow lines', 3, 2, { reg: ['UK'] }], ['curb', 2, 3, { g: 'street', al: [['kerb', 'spelling', 2, 3, ['UK']]] }], ['tow truck', 2, 2],
    ['wheel clamp', 3, 2, { reg: ['UK'], al: [['Denver boot', 'synonym', 4, 3, ['US']]] }], ['parking brake', 2, 2, { al: [['handbrake', 'synonym', 2, 2, ['UK']], ['emergency brake', 'synonym', 2, 2, ['US']]] }],
    ['angle parking', 4, 3], ['bay parking', 4, 4], ['park and ride', 3, 2], ['pay and display', 3, 2, { reg: ['UK'] }], ['loading zone', 3, 2], ['street parking', 2, 2, { al: [['on-street parking', 'synonym', 3, 3]] }],
    ['space', 2, 4, { g: 'parking' }], ['overnight parking', 3, 3], ['season pass', 3, 3, { g: 'parking' }], ['monthly pass', 3, 3, { g: 'parking' }], ['EV charging bay', 4, 4], ['parking attendant', 3, 2],
    ['parking enforcement', 4, 3, { reg: ['US'] }], ['traffic warden', 3, 3, { reg: ['UK'] }], ['tow zone', 3, 2], ['residents only', 4, 3, { al: [['permit holders only', 'synonym', 4, 4]] }], ['ticket machine', 2, 2], ['barrier arm', 4, 3, { al: [['boom gate', 'synonym', 4, 4, ['AU']]] }],
    ['tollbooth', 3, 4, { g: 'parking' }], ['stall', 3, 4, { g: 'parking' }],
  ],

  // ---------------------------------------------------------------- car accessories
  car_accessories: [
    ['floor mat', 1, 1, { al: [['car mat', 'synonym', 2, 2, ['UK']]] }], ['seat cover', 1, 1], ['air freshener', 1, 1], ['phone mount', 2, 1, { al: [['phone holder', 'synonym', 2, 1]] }], ['dash cam', 2, 1, { al: [['dashboard camera', 'synonym', 3, 3]] }],
    ['GPS', 1, 2, { type: 'acronym', al: [['sat nav', 'synonym', 2, 2, ['UK']]] }], ['roof rack', 2, 1], ['bike rack', 2, 1], ['tow bar', 3, 2, { al: [['tow hitch', 'synonym', 3, 2, ['US']], ['trailer hitch', 'synonym', 3, 2, ['US']]] }], ['sunshade', 3, 1, { al: [['sun visor', 'synonym', 2, 2]] }],
    ['steering wheel cover', 2, 1], ['fuzzy dice', 3, 2], ['bumper sticker', 1, 1], ['license plate frame', 3, 2], ['car cover', 2, 1], ['jumper cables', 2, 1, { al: [['jump leads', 'synonym', 3, 2, ['UK']]] }],
    ['car charger', 2, 1], ['cup holder', 1, 1], ['seat cushion', 2, 2], ['child seat', 1, 1, { al: [['booster seat', 'synonym', 2, 2], ['car seat', 'synonym', 1, 1]] }], ['tire chains', 3, 2, { al: [['snow chains', 'synonym', 3, 2, ['UK']]] }],
    ['mud flaps', 3, 2], ['spoiler', 2, 2, { g: 'car' }], ['window tint', 3, 2], ['dashboard cover', 3, 2], ['trunk organizer', 3, 2, { al: [['boot organiser', 'synonym', 3, 2, ['UK']]] }], ['first aid kit', 1, 2, { g: 'car' }],
    ['warning triangle', 3, 2], ['ice scraper', 2, 1], ['tire inflator', 3, 2], ['trim kit', 5, 4], ['running boards', 4, 3], ['bull bar', 4, 3, { reg: ['AU', 'UK'], al: [['roo bar', 'synonym', 4, 3, ['AU']]] }], ['mud guard', 4, 4, { reg: ['UK'] }],
    ['wheel locks', 4, 3], ['antenna topper', 5, 4], ['rain guard', 4, 4, { al: [['wind deflector', 'synonym', 4, 4]] }], ['hood ornament', 3, 3, { al: [['bonnet mascot', 'synonym', 4, 4, ['UK']]] }], ['decal', 3, 3, { g: 'car' }],
  ],

  // ---------------------------------------------------------------- bus types
  bus_types: [
    ['school bus', 1, 1], ['double-decker', 1, 1, { al: [['double-decker bus', 'synonym', 1, 1]] }], ['coach', 2, 2, { g: 'bus', al: [['motorcoach', 'synonym', 4, 4]] }], ['minibus', 2, 1],
    ['city bus', 1, 1], ['tour bus', 1, 1], ['shuttle bus', 1, 1], ['trolleybus', 3, 2, { al: [['trackless trolley', 'synonym', 5, 5]] }], ['articulated bus', 3, 2, { al: [['bendy bus', 'synonym', 3, 2, ['UK']], ['accordion bus', 'synonym', 4, 4]] }],
    ['electric bus', 2, 2], ['night bus', 2, 1, { reg: ['UK'] }], ['express bus', 2, 1], ['sleeper bus', 4, 3], ['party bus', 2, 2], ['bookmobile', 4, 3, { reg: ['US'] }],
    ['Greyhound', 2, 2, { type: 'org', tm: true, g: 'bus' }], ['Routemaster', 4, 2, { type: 'proper', reg: ['UK'] }], ['charabanc', 5, 4, { reg: ['UK'] }], ['omnibus', 4, 3], ['jitney', 5, 4, { reg: ['US'] }],
    ['chicken bus', 4, 3], ['dollar van', 5, 4], ['hopper bus', 4, 4], ['hybrid bus', 3, 3], ['open-top bus', 2, 2, { reg: ['UK'] }], ['airport bus', 2, 1, { al: [['airport shuttle', 'synonym', 2, 1]] }],
    ['rapid transit bus', 5, 4, { al: [['BRT', 'synonym', 5, 4, [], { type: 'acronym' }]] }], ['dial-a-ride', 5, 4], ['hop-on hop-off', 3, 3, { al: [['sightseeing bus', 'synonym', 3, 2]] }], ['ferry bus', 5, 5], ['campus shuttle', 3, 2],
    ['RV bus', 5, 5], ['kneeling bus', 5, 4], ['demand-responsive bus', 5, 5], ['trolley', 2, 3, { g: 'tram' }], ['school coach', 3, 2, { reg: ['UK'] }],
  ],

  // ---------------------------------------------------------------- on a bus
  on_a_bus: [
    ['driver', 1, 1, { g: 'bus' }], ['passenger', 1, 1], ['seat', 1, 1, { g: 'bus' }], ['bus stop', 1, 1], ['fare', 2, 1], ['bell', 1, 2, { g: 'bus' }], ['handrail', 2, 1, { al: [['grab rail', 'synonym', 3, 3]] }],
    ['strap', 2, 2, { g: 'handhold' }], ['aisle', 2, 1, { g: 'bus' }], ['window', 1, 2, { g: 'bus' }], ['luggage rack', 2, 2], ['route map', 2, 1], ['destination sign', 3, 2], ['bus pass', 1, 1],
    ['transfer', 2, 2, { g: 'bus ticket' }], ['stop request', 3, 2], ['priority seat', 3, 2], ['wheelchair ramp', 3, 2], ['back door', 2, 2, { g: 'bus' }], ['front door', 2, 2, { g: 'bus' }],
    ['conductor', 2, 2, { g: 'bus' }], ['fare box', 3, 2], ['ticket machine', 2, 2, { g: 'bus' }], ['smart card', 3, 2], ['standing room', 3, 2], ['upper deck', 2, 1, { reg: ['UK'] }],
    ['emergency exit', 2, 1, { g: 'bus' }], ['overhead rail', 4, 3], ['stop cord', 4, 3], ['pole', 2, 3, { g: 'bus' }], ['headrest', 2, 3], ['timetable', 2, 2, { g: 'bus' }],
    ['schedule', 2, 3, { g: 'bus' }], ['route number', 2, 2], ['exact change', 3, 2, { reg: ['US'] }], ['commuter', 2, 3, { g: 'bus' }], ['rider', 2, 3, { g: 'bus' }], ['wheel arch', 5, 5],
    ['bike rack', 3, 3, { g: 'bus' }], ['kneeler', 5, 4], ['card reader', 3, 2], ['validator', 4, 3, { g: 'ticket' }],
  ],

  // ---------------------------------------------------------------- ticket words
  ticket_words: [
    ['fare', 2, 1, { g: 'transport' }], ['pass', 2, 2, { g: 'ticket' }], ['one-way', 1, 1, { al: [['single', 'synonym', 2, 2, ['UK'], { g: 'ticket' }]] }], ['round-trip', 1, 1, { al: [['return', 'synonym', 2, 2, ['UK'], { g: 'ticket' }]] }],
    ['stub', 3, 2, { g: 'ticket' }], ['validate', 3, 2, { pos: 'verb', g: 'ticket' }], ['ticket', 1, 1, { g: 'transport' }], ['season ticket', 2, 1, { reg: ['UK'], al: [['commuter pass', 'synonym', 3, 2, ['US']]] }], ['day pass', 1, 1],
    ['weekly pass', 2, 1], ['monthly pass', 2, 1], ['concession', 3, 2, { g: 'fare', reg: ['UK', 'AU'] }], ['child fare', 2, 1], ['senior fare', 3, 2], ['peak fare', 3, 2, { al: [['off-peak', 'synonym', 3, 2]] }],
    ['transfer', 2, 2, { g: 'ticket' }], ['ticket office', 2, 1, { al: [['ticket booth', 'synonym', 2, 1, ['US']]] }], ['ticket machine', 2, 1], ['turnstile', 3, 2], ['fare gate', 3, 2, { al: [['ticket barrier', 'synonym', 3, 2, ['UK']]] }],
    ['smart card', 3, 2], ['tap in', 3, 2, verb()], ['tap out', 3, 3, verb()], ['top up', 3, 3, verb({ g: 'card' })], ['railcard', 4, 3, { reg: ['UK'] }], ['zone', 3, 3, { g: 'fare' }], ['fare zone', 3, 2],
    ['e-ticket', 2, 2], ['boarding pass', 2, 2], ['reservation', 2, 3, { g: 'seat' }], ['fare evasion', 4, 3], ['fine', 2, 3, { g: 'fare' }], ['penalty fare', 4, 3], ['inspector', 3, 3, { g: 'ticket' }],
    ['punch card', 3, 2], ['token', 3, 3, { g: 'subway' }], ['MetroCard', 3, 2, { type: 'proper', tm: true, reg: ['US'] }], ['Oyster card', 3, 2, { type: 'proper', tm: true, reg: ['UK'] }], ['open return', 4, 3, { reg: ['UK'] }],
    ['upgrade', 2, 3, { g: 'ticket' }], ['refund', 2, 3, { g: 'ticket' }], ['standby', 3, 3, { g: 'ticket' }], ['flat fare', 3, 2], ['free transfer', 4, 3],
  ],

  // ---------------------------------------------------------------- commuting words
  commuting_words: [
    ['commute', 1, 1, verb({ al: [] })], ['commuter', 1, 1], ['rush hour', 1, 1], ['peak hour', 3, 2], ['timetable', 2, 1], ['schedule', 2, 2, { g: 'transport' }], ['delay', 1, 2, { g: 'transport' }], ['cancelled', 2, 2, { g: 'train' }],
    ['platform', 2, 2], ['station', 1, 2, { g: 'transport' }], ['carpool', 2, 2, { g: 'commute' }], ['park and ride', 3, 2], ['season ticket', 3, 2], ['standing room only', 3, 2], ['packed', 2, 3, { g: 'train' }],
    ['overcrowded', 2, 2], ['signal failure', 3, 1, { reg: ['UK'] }], ['leaves on the line', 4, 3, { reg: ['UK'] }], ['mind the gap', 3, 2, { reg: ['UK'] }], ['stand clear', 3, 3], ['next stop', 1, 2],
    ['terminus', 3, 2], ['interchange', 3, 2], ['connection', 2, 2, { g: 'transport' }], ['transfer', 2, 2, { g: 'commuting' }], ['night owl', 4, 5, { g: 'commuting' }], ['last train', 2, 2], ['first bus', 2, 3],
    ['work from home', 2, 4], ['hybrid working', 3, 4], ['flexitime', 4, 4, { reg: ['UK'], al: [['flextime', 'spelling', 4, 4, ['US']]] }], ['straphanger', 4, 3], ['rat race', 3, 4], ['daily grind', 3, 4],
    ['nine to five', 3, 4], ['bumper to bumper', 3, 2], ['gridlock', 3, 2, { g: 'traffic' }], ['detour', 2, 2, { g: 'commute' }], ['shortcut', 2, 3, { g: 'route' }], ['back road', 3, 3], ['tailback', 4, 3, { reg: ['UK'] }],
    ['bike commute', 3, 3], ['carless', 4, 4], ['transit card', 3, 2], ['rail strike', 3, 3], ['replacement bus', 4, 3, { reg: ['UK'] }], ['engineering works', 4, 3, { reg: ['UK'] }], ['planned maintenance', 5, 4],
  ],

  // ---------------------------------------------------------------- taxis of the world
  taxis_of_the_world: [
    ['cab', 1, 1, { g: 'taxi' }], ['taxi', 1, 1], ['yellow cab', 1, 1], ['black cab', 2, 1, { reg: ['UK'] }], ['hackney carriage', 3, 2, { reg: ['UK'] }], ['tuk-tuk', 2, 1, { al: [['auto rickshaw', 'synonym', 3, 2, ['IN']]] }],
    ['rickshaw', 2, 1, { al: [['jinrikisha', 'synonym', 5, 5]] }], ['pedicab', 3, 2, { al: [['cycle rickshaw', 'synonym', 3, 2, ['IN']], ['trishaw', 'synonym', 4, 3, ['MY', 'SG']]] }], ['jeepney', 3, 2, { reg: ['PH'] }], ['matatu', 4, 3, { reg: ['KE'] }],
    ['dolmus', 4, 3, { reg: ['TR'], al: [['dolmuş', 'spelling', 4, 3, ['TR']]] }], ['water taxi', 2, 1], ['moto taxi', 3, 2, { al: [['boda boda', 'synonym', 4, 3, ['KE', 'UG']], ['okada', 'synonym', 5, 4, ['NG']]] }],
    ['gondola', 2, 3, { g: 'boat' }], ['vaporetto', 4, 3, { reg: ['IT'] }], ['shared taxi', 3, 2, { al: [['collective taxi', 'synonym', 4, 3], ['colectivo', 'synonym', 4, 3, ['AR']]] }], ['minibus taxi', 3, 2, { reg: ['ZA'] }],
    ['songthaew', 5, 4, { reg: ['TH'] }], ['calesa', 5, 4, { reg: ['PH'] }], ['tonga', 5, 4, { g: 'carriage', reg: ['IN', 'PK'] }], ['rideshare', 3, 2], ['Uber', 1, 1, { type: 'org', tm: true }],
    ['Lyft', 2, 2, { type: 'org', tm: true }], ['Grab', 4, 3, { type: 'org', tm: true, g: 'rideshare' }], ['Bolt', 4, 3, { type: 'org', tm: true, g: 'rideshare' }], ['minicab', 3, 2, { reg: ['UK'] }], ['horse-drawn cab', 3, 2, { al: [['hansom cab', 'synonym', 4, 3, ['UK']]] }],
    ['cyclo', 5, 4, { reg: ['VN'] }], ['becak', 5, 4, { reg: ['ID'] }], ['bajaj', 5, 4, { reg: ['ID', 'IN'] }], ['sedan chair', 4, 4], ['camel taxi', 4, 4], ['sidecar taxi', 5, 5],
    ['gypsy cab', 4, 4, { reg: ['US'] }], ['taxi rank', 3, 2, { reg: ['UK'], al: [['taxi stand', 'synonym', 2, 2, ['US']]] }], ['town car', 3, 4, { g: 'taxi' }], ['hailing a cab', 3, 3],
  ],

  // ---------------------------------------------------------------- cable cars and lifts
  cable_cars_and_lifts: [
    ['cable car', 1, 1], ['gondola', 2, 1, { g: 'lift' }], ['chairlift', 2, 1, { al: [['chair lift', 'spelling', 2, 1], ['ski lift', 'synonym', 1, 1]] }], ['funicular', 3, 2], ['T-bar', 3, 2, { al: [['T-bar lift', 'synonym', 3, 2]] }],
    ['aerial tram', 3, 2, { al: [['aerial tramway', 'synonym', 3, 2], ['cableway', 'synonym', 4, 3]] }], ['rope tow', 3, 2], ['magic carpet', 3, 3, { g: 'ski lift' }], ['button lift', 4, 3, { al: [['Poma lift', 'synonym', 5, 4]] }], ['drag lift', 4, 3],
    ['tramway', 3, 3], ['telecabine', 4, 3, { reg: ['FR'] }], ['detachable quad', 4, 3, { al: [['high-speed quad', 'synonym', 4, 3]] }], ['six-pack', 5, 4, { g: 'chairlift' }], ['bubble chair', 4, 3, { al: [['bubble lift', 'synonym', 4, 3]] }],
    ['cable railway', 4, 3], ['incline railway', 4, 3, { al: [['inclined plane', 'synonym', 4, 4], ['cliff railway', 'synonym', 4, 3, ['UK']]] }], ['rack railway', 4, 3, { al: [['cog railway', 'synonym', 3, 3, ['US']]] }], ['mountain railway', 3, 3],
    ['Emirates Air Line', 5, 4, P({ type: 'proper' })], ['Sugarloaf cable car', 4, 3, P({ type: 'proper' })],
    ['San Francisco cable car', 2, 2, P({ type: 'proper', al: [] })], ['Peak Tram', 4, 3, P({ type: 'proper', reg: ['HK'] })], ['Skyway', 4, 4, { g: 'cable car' }], ['Skytrain', 4, 4, { g: 'lift' }], ['People Mover', 4, 4, { g: 'transit' }],
    ['telpher', 5, 5], ['zip line', 3, 4, { al: [['zipline', 'spelling', 3, 4], ['flying fox', 'synonym', 4, 4, ['AU', 'NZ']]] }], ['tramcar', 3, 3], ['bucket lift', 5, 5], ['carrier', 4, 4, { g: 'cable car' }],
    ['haul rope', 5, 5], ['bullwheel', 5, 5], ['ski gondola', 3, 2], ['lift pass', 2, 2, { al: [['ski pass', 'synonym', 2, 2]] }], ['lift tower', 4, 3], ['base station', 4, 4, { g: 'lift' }],
  ],

  // ---------------------------------------------------------------- aircraft types
  aircraft_types: [
    ['airplane', 1, 1, { al: [['aeroplane', 'spelling', 1, 1, ['UK']], ['plane', 'synonym', 1, 1]] }], ['jet', 1, 1, { g: 'aircraft', al: [['jet plane', 'synonym', 1, 1]] }], ['jumbo jet', 1, 1], ['helicopter', 1, 2, { al: [['chopper', 'synonym', 2, 3]] }],
    ['glider', 2, 1, { al: [['sailplane', 'synonym', 4, 3]] }], ['seaplane', 2, 1, { al: [['floatplane', 'synonym', 3, 2], ['flying boat', 'synonym', 3, 2]] }], ['biplane', 2, 1], ['propeller plane', 2, 1, { al: [['prop plane', 'synonym', 3, 2]] }],
    ['airliner', 2, 1], ['fighter jet', 1, 1], ['bomber', 2, 2, { g: 'aircraft' }], ['cargo plane', 2, 1, { al: [['freighter', 'synonym', 3, 3, [], { g: 'plane' }]] }], ['private jet', 1, 1, { al: [['business jet', 'synonym', 2, 2], ['Learjet', 'synonym', 3, 3, [], { type: 'proper', tm: true }]] }],
    ['turboprop', 3, 2], ['monoplane', 3, 2], ['triplane', 4, 3], ['light aircraft', 3, 2], ['airship', 2, 3, { al: [['blimp', 'synonym', 2, 3], ['zeppelin', 'synonym', 2, 3, [], { tm: true }]] }], ['drone', 1, 3, { g: 'aircraft' }],
    ['stealth bomber', 2, 2], ['water bomber', 3, 3, { al: [['firefighting plane', 'synonym', 3, 3]] }], ['crop duster', 2, 3, { al: [['agricultural aircraft', 'synonym', 4, 4]] }], ['tiltrotor', 4, 3], ['autogyro', 4, 4, { al: [['gyrocopter', 'synonym', 4, 3]] }],
    ['VTOL', 4, 3, { type: 'acronym' }], ['supersonic jet', 2, 2, { al: [['Concorde', 'synonym', 2, 2, [], { type: 'proper' }]] }], ['hang glider', 2, 3], ['microlight', 4, 3, { reg: ['UK'], al: [['ultralight', 'synonym', 3, 3, ['US']]] }], ['trainer', 3, 3, { g: 'aircraft' }],
    ['reconnaissance plane', 4, 3, { al: [['spy plane', 'synonym', 2, 2]] }], ['transport plane', 3, 2], ['regional jet', 3, 2], ['widebody', 4, 3, { al: [['wide-body', 'spelling', 4, 3]] }], ['narrowbody', 4, 3], ['tanker', 3, 3, { g: 'aircraft' }],
    ['rotorcraft', 4, 3], ['airlifter', 5, 4], ['flying wing', 4, 3], ['air ambulance', 3, 2], ['warbird', 4, 3],
  ],

  // ---------------------------------------------------------------- plane parts
  plane_parts: [
    ['wing', 1, 1, { g: 'aircraft' }], ['cockpit', 1, 1, { al: [['flight deck', 'synonym', 3, 2]] }], ['tail', 1, 2, { g: 'aircraft' }], ['fuselage', 3, 1], ['propeller', 2, 1], ['jet engine', 2, 1], ['landing gear', 2, 1, { al: [['undercarriage', 'synonym', 3, 2, ['UK']]] }],
    ['cabin', 2, 2, { g: 'aircraft' }], ['window', 1, 3, { g: 'aircraft' }], ['flap', 3, 2, { g: 'wing' }], ['aileron', 4, 2], ['rudder', 3, 2, { g: 'aircraft' }], ['elevator', 3, 3, { g: 'aircraft' }], ['stabilizer', 4, 3, { al: [['stabiliser', 'spelling', 4, 3, ['UK']], ['tailplane', 'synonym', 4, 3, ['UK']]] }],
    ['winglet', 4, 2], ['cargo hold', 2, 1], ['nose cone', 3, 2], ['turbine', 3, 2], ['black box', 2, 2, { al: [['flight recorder', 'synonym', 3, 2]] }], ['joystick', 2, 2, { g: 'aircraft' }], ['yoke', 4, 3, { g: 'aircraft' }],
    ['throttle', 3, 3, { g: 'aircraft' }], ['altimeter', 3, 2], ['airspeed indicator', 4, 3], ['artificial horizon', 4, 3], ['autopilot', 2, 2], ['fin', 3, 3, { g: 'aircraft' }], ['spoiler', 3, 2, { g: 'wing' }],
    ['slat', 4, 3], ['air brake', 4, 3, { al: [['speed brake', 'synonym', 4, 3]] }], ['nacelle', 5, 3], ['pylon', 4, 4, { g: 'aircraft' }], ['canopy', 3, 3, { g: 'aircraft' }], ['rotor blade', 3, 2, { g: 'helicopter' }],
    ['tail rotor', 4, 2], ['fuel tank', 2, 3, { g: 'aircraft' }], ['pitot tube', 5, 3], ['bulkhead', 4, 4], ['wheel well', 4, 3], ['emergency slide', 3, 2], ['ram air turbine', 5, 4], ['APU', 5, 4, { type: 'acronym', g: 'aircraft' }],
    ['transponder', 4, 3], ['strut', 4, 4, { g: 'aircraft' }], ['spar', 5, 4, { g: 'wing' }],
  ],

  // ---------------------------------------------------------------- airport words
  airport_words: [
    ['terminal', 1, 1], ['runway', 1, 1], ['gate', 1, 1, { g: 'airport' }], ['check-in', 3, 1, { al: [['check in', 'spelling', 3, 1]] }], ['security', 1, 2, { g: 'airport' }], ['customs', 2, 1], ['passport control', 2, 1, { al: [['immigration', 'synonym', 2, 1]] }],
    ['baggage claim', 1, 1, { al: [['baggage reclaim', 'synonym', 2, 1, ['UK']]] }], ['carousel', 2, 2, { g: 'baggage' }], ['departures', 1, 1], ['arrivals', 1, 1], ['boarding', 1, 1, { g: 'flight' }], ['control tower', 2, 1, { al: [['air traffic control', 'synonym', 2, 1]] }],
    ['hangar', 3, 2], ['tarmac', 2, 2], ['taxiway', 3, 2], ['apron', 4, 3, { g: 'airport' }], ['jet bridge', 4, 2, { al: [['jetway', 'synonym', 4, 2, ['US']], ['air bridge', 'synonym', 4, 3, ['UK']], ['gangway', 'synonym', 3, 3, [], { g: 'airport' }]] }],
    ['duty-free', 2, 1, { al: [['duty free shop', 'synonym', 2, 1]] }], ['lounge', 2, 2, { g: 'airport' }], ['layover', 2, 2, { al: [['stopover', 'synonym', 2, 2], ['connection', 'synonym', 2, 3, [], { g: 'flight' }]] }], ['delay', 1, 2, { g: 'flight' }],
    ['boarding pass', 1, 1], ['luggage', 1, 2, { g: 'airport' }], ['X-ray', 2, 3, { g: 'airport' }], ['metal detector', 2, 1], ['shuttle', 2, 2, { g: 'airport' }], ['windsock', 3, 2], ['landing strip', 3, 2], ['helipad', 3, 3],
    ['departure board', 2, 1], ['concourse', 3, 1], ['baggage handler', 2, 1], ['ground crew', 3, 2], ['marshaller', 5, 4, { al: [['marshaller', 'spelling', 5, 4]] }], ['pushback', 4, 3], ['de-icing', 4, 3], ['ILS', 5, 4, { type: 'acronym' }],
    ['holding pattern', 3, 2], ['red-eye', 3, 2, { g: 'flight' }], ['standby', 3, 3, { g: 'flight' }], ['overbooked', 3, 2], ['transit', 3, 3, { g: 'airport' }], ['valet', 3, 4, { g: 'airport' }], ['skybridge', 4, 4],
  ],

  // ---------------------------------------------------------------- flight crew
  flight_crew: [
    ['pilot', 1, 1], ['co-pilot', 2, 1, { al: [['first officer', 'synonym', 3, 2], ['copilot', 'spelling', 2, 1]] }], ['captain', 1, 2, { g: 'pilot' }], ['flight attendant', 1, 1, { al: [['air hostess', 'synonym', 2, 2, ['UK']], ['stewardess', 'synonym', 2, 2], ['steward', 'synonym', 2, 2, [], { g: 'flight' }], ['cabin crew', 'synonym', 2, 1]] }],
    ['navigator', 3, 3, { g: 'aircraft' }], ['flight engineer', 3, 2], ['purser', 4, 2, { g: 'flight' }], ['air marshal', 3, 2], ['loadmaster', 4, 3], ['flight dispatcher', 4, 3], ['air traffic controller', 2, 2],
    ['ground crew', 2, 2], ['baggage handler', 2, 2], ['mechanic', 2, 3, { g: 'aircraft' }], ['aircraft engineer', 3, 3], ['gate agent', 3, 2], ['check-in agent', 3, 2], ['security officer', 3, 3, { g: 'airport' }],
    ['refueler', 4, 3], ['fueler', 5, 4], ['aviator', 3, 2], ['airman', 3, 3], ['test pilot', 3, 3], ['fighter pilot', 2, 3], ['bush pilot', 4, 3], ['crop duster pilot', 5, 4], ['stunt pilot', 3, 3], ['helicopter pilot', 2, 2],
    ['chief pilot', 4, 3], ['jump seat', 5, 4], ['cabin manager', 4, 3], ['deadheading crew', 5, 5], ['ramp agent', 4, 3, { reg: ['US'] }], ['marshaller', 4, 3], ['wing walker', 4, 4],
    ['skipper', 3, 4, { g: 'aircraft' }], ['airline pilot', 2, 1], ['commercial pilot', 3, 2], ['trainee pilot', 3, 3], ['flight instructor', 3, 2], ['flight nurse', 4, 3], ['first mate', 4, 4, { g: 'aircraft' }],
  ],

  // ---------------------------------------------------------------- airlines
  airlines: [
    ['Delta', 1, 2, O({ g: 'airline' })], ['United', 1, 2, O({ g: 'airline' })], ['American Airlines', 1, 1, O()], ['Southwest', 2, 2, O({ g: 'airline' })], ['JetBlue', 2, 2, O()], ['Alaska Airlines', 2, 2, O()],
    ['Air Canada', 2, 1, O()], ['British Airways', 1, 1, O()], ['Virgin Atlantic', 2, 1, O()], ['Lufthansa', 2, 1, O()], ['Air France', 1, 1, O()], ['KLM', 2, 2, O({ type: 'acronym' })],
    ['Ryanair', 2, 1, O()], ['easyJet', 2, 1, O()], ['Iberia', 3, 2, O()], ['Alitalia', 3, 2, O()], ['SAS', 3, 3, O({ type: 'acronym', g: 'airline' })], ['Finnair', 3, 2, O()], ['Aer Lingus', 3, 2, O()],
    ['Swiss', 3, 3, O({ g: 'airline' })], ['TAP Portugal', 4, 3, O()], ['Turkish Airlines', 2, 2, O()], ['Emirates', 1, 2, O({ g: 'airline' })], ['Qatar Airways', 2, 1, O()], ['Etihad', 3, 2, O()], ['Saudia', 4, 3, O()],
    ['El Al', 3, 2, O()], ['Qantas', 2, 1, O()], ['Air New Zealand', 3, 2, O()], ['Singapore Airlines', 2, 1, O()], ['Cathay Pacific', 3, 2, O()], ['Japan Airlines', 2, 1, O({ al: [['JAL', 'synonym', 3, 2, [], { type: 'acronym' }]] })],
    ['ANA', 4, 3, O({ type: 'acronym', g: 'airline' })], ['Korean Air', 3, 2, O()], ['Air India', 2, 2, O()], ['Thai Airways', 3, 2, O()], ['Malaysia Airlines', 3, 2, O()], ['Garuda Indonesia', 4, 3, O()],
    ['Philippine Airlines', 4, 3, O()], ['China Eastern', 4, 3, O()], ['Air China', 3, 2, O()], ['Vietnam Airlines', 4, 3, O()], ['Aeroflot', 3, 2, O()], ['LATAM', 4, 3, O()], ['Avianca', 4, 3, O()],
    ['Aeromexico', 4, 3, O()], ['Ethiopian Airlines', 4, 3, O()], ['Pan Am', 3, 2, O()], ['TWA', 3, 3, O({ type: 'acronym' })], ['Spirit', 3, 3, O({ g: 'airline' })], ['Frontier', 3, 3, O({ g: 'airline' })],
  ],

  // ---------------------------------------------------------------- flying machines
  flying_machines: [
    ['airplane', 1, 1, { al: [['plane', 'synonym', 1, 1], ['aeroplane', 'spelling', 1, 1, ['UK']]] }], ['helicopter', 1, 1, { al: [['chopper', 'synonym', 2, 2]] }], ['hot air balloon', 1, 1], ['jet', 1, 1, { g: 'aircraft' }], ['glider', 2, 1],
    ['rocket', 1, 2, { g: 'spacecraft' }], ['space shuttle', 1, 2], ['blimp', 2, 1, { al: [['airship', 'synonym', 2, 1], ['dirigible', 'synonym', 4, 3]] }], ['drone', 1, 1, { g: 'aircraft' }], ['hang glider', 2, 1],
    ['paraglider', 3, 2, { al: [['paraplane', 'synonym', 5, 4]] }], ['parachute', 1, 2], ['jetpack', 2, 2], ['seaplane', 2, 1], ['biplane', 2, 1], ['spaceship', 1, 2, { al: [['spacecraft', 'synonym', 2, 2]] }],
    ['flying saucer', 2, 3, { al: [['UFO', 'synonym', 2, 3, [], { type: 'acronym' }]] }], ['kite', 1, 3, { g: 'toy' }], ['zeppelin', 2, 2], ['gyrocopter', 4, 3], ['ultralight', 3, 2], ['autogyro', 4, 3], ['balloon', 1, 2, { g: 'aircraft' }],
    ['flying carpet', 2, 4], ['broomstick', 1, 4, { g: 'flying' }], ['wingsuit', 3, 3], ['glider plane', 3, 2], ['quadcopter', 3, 2], ['tiltrotor', 5, 4], ['hovercraft', 2, 4, { g: 'vehicle' }], ['ornithopter', 5, 4],
    ['Wright Flyer', 3, 2, P()], ['Concorde', 2, 2, P()], ['Spitfire', 3, 3, P({ g: 'aircraft' })], ['Harrier', 4, 3, P({ g: 'jet' })], ['Apache', 3, 4, P({ g: 'helicopter' })], ['Hindenburg', 3, 3, P({ g: 'airship' })],
    ['Sputnik', 3, 4, P({ g: 'satellite' })], ['gas balloon', 4, 3], ['sky crane', 5, 4], ['rocket plane', 4, 3], ['jump jet', 4, 3], ['sailplane', 4, 3],
  ],

  // ---------------------------------------------------------------- famous airports
  famous_airports: [
    ['Heathrow', 1, 1, PL()], ['JFK', 1, 1, PL({ type: 'acronym', al: [['Kennedy Airport', 'synonym', 3, 2, [], { type: 'place' }]] })], ["O'Hare", 2, 1, PL()], ['Changi', 3, 1, PL()], ['Schiphol', 3, 1, PL()], ['Narita', 3, 2, PL()],
    ['Gatwick', 2, 1, PL()], ['LAX', 1, 1, PL({ type: 'acronym' })], ['Charles de Gaulle', 2, 1, PL({ al: [['Roissy', 'synonym', 5, 4, ['FR'], { type: 'place' }]] })], ['Orly', 3, 2, PL({ g: 'airport' })],
    ['Frankfurt Airport', 3, 2, PL()], ['Dubai International', 3, 2, PL()], ['Hartsfield-Jackson', 3, 2, PL({ al: [['Atlanta Airport', 'synonym', 3, 2, [], { type: 'place' }]] })], ['Haneda', 3, 2, PL()], ['Incheon', 3, 2, PL()],
    ['Chek Lap Kok', 4, 3, PL()], ['Kai Tak', 4, 3, PL()], ['Tempelhof', 4, 3, PL()], ['Dulles', 3, 2, PL()], ['LaGuardia', 3, 1, PL()], ['Newark', 2, 2, PL({ g: 'airport' })],
    ['Logan', 4, 3, PL({ g: 'airport' })], ['Midway', 3, 3, PL({ g: 'airport' })], ['Pearson', 4, 3, PL({ g: 'airport' })], ['Ben Gurion', 3, 2, PL()], ['Ataturk', 3, 2, PL({ al: [['Atatürk', 'spelling', 3, 2]] })], ['Suvarnabhumi', 4, 3, PL()],
    ['Barajas', 4, 3, PL()], ['Fiumicino', 4, 3, PL()], ['Kastrup', 4, 4, PL()], ['Arlanda', 4, 3, PL()], ['Sydney Kingsford Smith', 4, 3, PL()], ['Ezeiza', 5, 4, PL()], ['Galeao', 5, 4, PL()],
    ['Lukla', 4, 3, PL({ g: 'airport' })], ['Kansai', 4, 3, PL()], ['Munich Airport', 3, 2, PL()], ['Zurich Airport', 3, 2, PL()], ['Dallas Fort Worth', 3, 2, PL({ al: [['DFW', 'synonym', 3, 2, [], { type: 'acronym' }]] })],
  ],

  // ---------------------------------------------------------------- in-flight words
  in_flight_words: [
    ['tray table', 1, 1], ['overhead bin', 2, 1, { al: [['overhead locker', 'synonym', 2, 1, ['UK']]] }], ['aisle seat', 1, 1], ['window seat', 1, 1], ['middle seat', 1, 1], ['seatbelt sign', 2, 1, { al: [['fasten seatbelt sign', 'synonym', 3, 2]] }],
    ['turbulence', 1, 1], ['safety demonstration', 3, 2], ['life jacket', 2, 1, { al: [['life vest', 'synonym', 2, 1, ['US']]] }], ['oxygen mask', 2, 1], ['emergency exit', 2, 1, { g: 'plane' }], ['seat pocket', 2, 1, { al: [['seatback pocket', 'synonym', 3, 2]] }],
    ['in-flight meal', 3, 1, { al: [['airline meal', 'synonym', 2, 1]] }], ['headphones', 1, 3, { g: 'flight' }], ['blanket', 1, 3, { g: 'flight' }], ['eye mask', 2, 2], ['neck pillow', 2, 2, { al: [['travel pillow', 'synonym', 2, 2]] }],
    ['jet lag', 1, 1], ['cabin pressure', 3, 2], ['landing', 1, 2, { g: 'flight' }], ['takeoff', 1, 2, { al: [['take-off', 'spelling', 1, 2, ['UK']]] }], ['cruising altitude', 2, 1], ['announcement', 2, 3, { g: 'flight' }],
    ['call button', 2, 1], ['reading light', 2, 1], ['air vent', 2, 1], ['lavatory', 3, 2, { g: 'plane', al: [['toilet', 'synonym', 1, 2, ['UK'], { g: 'plane' }]] }], ['galley', 3, 2, { g: 'plane' }], ['drinks cart', 2, 1, { al: [['trolley', 'synonym', 2, 2, ['UK'], { g: 'cart' }]] }],
    ['business class', 1, 1], ['economy class', 1, 1, { al: [['coach', 'synonym', 2, 3, ['US'], { g: 'plane' }]] }], ['first class', 1, 1], ['premium economy', 3, 2], ['exit row', 2, 1, { al: [['emergency row', 'synonym', 3, 2]] }], ['bulkhead seat', 4, 2],
    ['brace position', 3, 2, { reg: ['UK'], al: [['crash position', 'synonym', 3, 2, ['US']]] }], ['air sickness bag', 2, 1, { al: [['sick bag', 'synonym', 2, 1, ['UK']]] }], ['seat recline', 3, 2], ['armrest', 2, 2], ['sky mall', 4, 3, { tm: true }], ['red-eye', 3, 2, { g: 'flight' }],
    ['air pocket', 3, 2], ['descent', 2, 3, { g: 'flight' }], ['ascent', 3, 3], ['cross-check', 5, 4, { g: 'flight' }], ['doors to manual', 5, 4], ['flight map', 3, 2],
  ],

  // ---------------------------------------------------------------- aircraft makers
  aircraft_makers: [
    ['Boeing', 1, 1, O()], ['Airbus', 1, 1, O()], ['Embraer', 3, 2, O()], ['Cessna', 2, 1, O()], ['Lockheed', 3, 2, O({ al: [['Lockheed Martin', 'synonym', 3, 2, [], { type: 'org' }]] })], ['Antonov', 4, 3, O()],
    ['Bombardier', 3, 2, O()], ['Gulfstream', 3, 2, O()], ['Learjet', 3, 2, O()], ['Beechcraft', 4, 3, O()], ['Piper', 3, 3, O({ g: 'aircraft' })], ['Mooney', 5, 4, O()], ['Cirrus', 4, 3, O({ g: 'aircraft' })],
    ['McDonnell Douglas', 3, 2, O()], ['Douglas', 4, 3, O({ g: 'aircraft' })], ['Northrop Grumman', 3, 2, O()], ['Grumman', 4, 3, O()], ['General Dynamics', 3, 3, O()], ['Sikorsky', 3, 2, O()], ['Bell', 3, 3, O({ g: 'helicopter' })],
    ['Sukhoi', 4, 3, O()], ['Tupolev', 4, 3, O()], ['Ilyushin', 5, 4, O()], ['Mikoyan', 5, 4, O()], ['Yakovlev', 5, 4, O()], ['De Havilland', 4, 3, O()], ['Fokker', 4, 3, O()], ['Dornier', 5, 4, O()],
    ['Messerschmitt', 3, 3, O()], ['Junkers', 4, 3, O()], ['Focke-Wulf', 4, 4, O()], ['Supermarine', 4, 3, O()], ['Hawker', 4, 4, O()], ['Avro', 4, 3, O()], ['Handley Page', 5, 4, O()], ['Vickers', 5, 4, O()],
    ['Bristol', 4, 4, O({ g: 'aircraft' })], ['BAE Systems', 3, 2, O()], ['Saab', 3, 3, O({ g: 'aircraft' })], ['Dassault', 4, 3, O()], ['Rolls-Royce', 3, 4, O({ g: 'engines' })], ['Pratt & Whitney', 4, 3, O()],
    ['Mitsubishi', 3, 3, O({ g: 'aircraft' })], ['COMAC', 4, 3, O({ type: 'acronym' })], ['Wright Company', 4, 3, O()], ['Curtiss', 4, 3, O()], ['Convair', 5, 4, O()], ['Fairchild', 4, 4, O()], ['Pilatus', 4, 3, O()],
  ],

  // ---------------------------------------------------------------- hot air balloon parts
  hot_air_balloon_parts: [
    ['basket', 1, 1, { g: 'balloon' }], ['burner', 3, 1], ['envelope', 4, 1, { g: 'balloon' }], ['propane tank', 3, 2], ['fuel line', 4, 3], ['parachute valve', 5, 3, { al: [['top vent', 'synonym', 5, 4]] }],
    ['skirt', 4, 3, { g: 'balloon' }], ['gores', 5, 4, { al: [['gore panels', 'synonym', 5, 4]] }], ['load tape', 5, 5], ['suspension cables', 4, 3, { al: [['flying wires', 'synonym', 5, 4]] }], ['cables', 3, 3, { g: 'balloon' }],
    ['crown', 4, 4, { g: 'balloon' }], ['mouth', 4, 3, { g: 'balloon' }], ['throat', 5, 4, { g: 'balloon' }], ['deflation line', 5, 4], ['rip line', 5, 4], ['pilot light', 4, 3], ['blast valve', 5, 3],
    ['burner frame', 5, 4], ['basket skids', 5, 5], ['altimeter', 4, 4, { g: 'balloon' }], ['variometer', 5, 4], ['pyrometer', 5, 4], ['inflator fan', 5, 4], ['fabric', 2, 3, { g: 'balloon' }], ['nylon', 3, 4, { g: 'balloon' }],
    ['ripstop', 5, 4], ['wicker', 3, 2], ['carabiner', 4, 4, { g: 'balloon' }], ['tether line', 5, 4], ['landing line', 5, 5], ['chase vehicle', 4, 3], ['crew', 2, 4, { g: 'balloon' }], ['pilot', 1, 3, { g: 'balloon' }],
    ['hot air', 1, 2], ['lift', 2, 3, { g: 'balloon' }], ['propane', 3, 2, { g: 'balloon' }], ['tank', 2, 4, { g: 'balloon' }], ['top ring', 5, 5], ['cooling vent', 5, 5], ['mouth ring', 5, 5],
  ],

  // ---------------------------------------------------------------- boat types
  boat_types: [
    ['canoe', 1, 1], ['kayak', 1, 1], ['rowboat', 1, 1, { al: [['rowing boat', 'synonym', 1, 1, ['UK']]] }], ['sailboat', 1, 1, { al: [['sailing boat', 'synonym', 1, 1, ['UK']]] }], ['yacht', 1, 1], ['ferry', 1, 1], ['tugboat', 2, 1, { al: [['tug', 'synonym', 2, 2, [], { g: 'boat' }]] }],
    ['speedboat', 1, 1], ['motorboat', 1, 1], ['fishing boat', 1, 1, { al: [['trawler', 'synonym', 3, 2]] }], ['lifeboat', 1, 1], ['dinghy', 2, 1], ['raft', 1, 1], ['gondola', 2, 1, { g: 'boat' }], ['catamaran', 2, 1],
    ['houseboat', 2, 1], ['paddle steamer', 3, 2, { al: [['paddleboat', 'synonym', 2, 2], ['riverboat', 'synonym', 2, 2]] }], ['schooner', 3, 2], ['sloop', 4, 3], ['ketch', 4, 3], ['yawl', 5, 4], ['cutter', 4, 3, { g: 'boat' }],
    ['barge', 2, 2], ['narrowboat', 3, 2, { reg: ['UK'] }], ['punt', 3, 2, { g: 'boat', reg: ['UK'] }], ['skiff', 3, 2], ['trimaran', 4, 3], ['jet ski', 2, 2, { al: [['personal watercraft', 'synonym', 4, 4]] }], ['pontoon boat', 3, 2],
    ['dhow', 4, 3], ['junk', 3, 3, { g: 'boat' }], ['sampan', 4, 3], ['longboat', 3, 3], ['dory', 4, 3, { g: 'boat' }], ['coracle', 4, 3, { reg: ['UK'] }], ['outrigger', 4, 3], ['Viking ship', 2, 2],
    ['galley', 3, 3, { g: 'ship' }], ['caravel', 4, 3], ['clipper', 3, 3, { g: 'ship' }], ['brigantine', 5, 4], ['hovercraft', 2, 3, { g: 'boat' }], ['hydrofoil', 3, 2], ['bumper boat', 4, 3], ['pedalo', 3, 2, { reg: ['UK'], al: [['paddle boat', 'synonym', 2, 2, ['US'], { g: 'pedal' }]] }],
    ['umiak', 5, 4], ['felucca', 5, 4], ['bireme', 5, 5], ['trireme', 4, 4],
  ],

  // ---------------------------------------------------------------- ship parts
  ship_parts: [
    ['hull', 2, 1], ['deck', 1, 1, { g: 'ship' }], ['bow', 2, 2, { g: 'ship' }], ['stern', 2, 1], ['mast', 2, 1], ['anchor', 1, 1], ['rudder', 2, 1, { g: 'ship' }], ['propeller', 2, 2, { g: 'ship' }], ['funnel', 2, 2, { g: 'ship' }],
    ['porthole', 2, 1], ['bridge', 2, 2, { g: 'ship' }], ['cabin', 1, 2, { g: 'ship' }], ['keel', 3, 1], ['sail', 1, 1], ['rigging', 3, 1], ['helm', 3, 2], ['gangway', 3, 2, { al: [['gangplank', 'synonym', 3, 2]] }],
    ['crow\'s nest', 3, 1], ['figurehead', 3, 2], ['poop deck', 3, 2], ['bilge', 4, 2], ['galley', 3, 1, { g: 'ship' }], ['hold', 3, 2, { g: 'ship' }], ['bulkhead', 4, 3, { g: 'ship' }], ['bowsprit', 4, 2],
    ['boom', 3, 3, { g: 'sail' }], ['capstan', 4, 3], ['windlass', 5, 3], ['hatch', 2, 3, { g: 'ship' }], ['starboard', 2, 1], ['port', 2, 2, { g: 'ship side' }], ['forecastle', 4, 3, { al: [["fo'c'sle", 'spelling', 4, 3]] }],
    ['quarterdeck', 4, 2], ['lifeboat', 1, 3, { g: 'ship' }], ['mizzenmast', 5, 3], ['foremast', 4, 3], ['mainmast', 4, 2], ['yardarm', 4, 2], ['halyard', 5, 3], ['transom', 5, 4], ['gunwale', 5, 4, { al: [['gunnel', 'spelling', 5, 4]] }],
    ['ballast', 4, 3], ['bollard', 4, 3], ['fender', 3, 3, { g: 'boat' }], ['davit', 5, 4], ['scupper', 5, 4], ['cleat', 4, 3], ['engine room', 2, 1], ['watertight door', 4, 3],
  ],

  // ---------------------------------------------------------------- sailing words
  sailing_words: [
    ['tack', 3, 1, verb({ g: 'sailing' })], ['jibe', 4, 2, verb({ al: [['gybe', 'spelling', 4, 2, ['UK'], { pos: 'verb' }]] })], ['port', 2, 2, { g: 'left side' }], ['starboard', 2, 1], ['windward', 4, 2], ['leeward', 4, 2], ['helm', 3, 2, { g: 'sailing' }],
    ['tiller', 3, 2], ['boom', 3, 2, { g: 'sailing' }], ['jib', 4, 2], ['mainsail', 3, 2], ['spinnaker', 4, 2], ['genoa', 5, 3], ['reef', 3, 2, verb({ g: 'sail' })], ['heel', 3, 3, verb({ g: 'boat' })],
    ['capsize', 2, 2, verb()], ['moor', 3, 2, verb()], ['mooring', 3, 2], ['anchor', 1, 2, verb({ g: 'boat' })], ['knot', 2, 2, { g: 'nautical' }], ['bowline', 4, 2], ['cleat hitch', 5, 3], ['halyard', 5, 2],
    ['sheet', 4, 3, { g: 'sailing rope' }], ['beam reach', 5, 3], ['close-hauled', 5, 3], ['running', 3, 3, { g: 'sailing' }], ['tacking', 3, 2], ['regatta', 3, 1], ['skipper', 2, 2], ['crew', 1, 2, { g: 'sailing' }],
    ['ahoy', 2, 3], ['knots', 2, 2, { g: 'speed' }], ['nautical mile', 3, 2], ['fathom', 3, 3], ['draft', 4, 4, { g: 'boat depth' }], ['dead calm', 3, 3], ['doldrums', 3, 3], ['trade winds', 3, 3], ['headwind', 2, 3, { g: 'sailing' }],
    ['tailwind', 2, 3, { g: 'sailing' }], ['luff', 5, 3], ['in irons', 5, 4], ['broach', 5, 4, verb({ g: 'sailing' })], ['hoist', 3, 3, verb({ g: 'sail' })], ['furl', 4, 3, verb()], ['trim', 3, 3, verb({ g: 'sail' })], ['bearing', 3, 3, { g: 'navigation' }],
    ['lee shore', 5, 4], ['sou\'wester', 4, 4, { g: 'hat' }], ['wake', 2, 3, { g: 'boat' }], ['rigging', 3, 2, { g: 'sailing' }],
  ],

  // ---------------------------------------------------------------- ports and harbors
  ports_and_harbors: [
    ['dock', 1, 1, { g: 'harbor' }], ['pier', 2, 1], ['quay', 3, 1, { al: [['key', 'spelling', 4, 4, [], { g: 'quay' }]] }], ['wharf', 3, 1], ['jetty', 3, 1], ['marina', 2, 1], ['berth', 3, 1], ['harbor', 1, 1, { al: [['harbour', 'spelling', 1, 1, ['UK']]] }],
    ['breakwater', 3, 1, { al: [['mole', 'synonym', 5, 4, [], { g: 'harbor' }], ['seawall', 'synonym', 3, 2]] }], ['lighthouse', 1, 2], ['crane', 2, 2, { g: 'harbor' }], ['container', 1, 3, { g: 'port' }], ['warehouse', 2, 2, { g: 'port' }], ['slipway', 3, 1, { al: [['boat ramp', 'synonym', 2, 1, ['US']]] }],
    ['dry dock', 3, 1, { al: [['drydock', 'spelling', 3, 1]] }], ['boatyard', 3, 1], ['fish market', 2, 2], ['customs house', 3, 2], ['harbor master', 3, 1, { al: [['harbourmaster', 'spelling', 3, 1, ['UK']]] }], ['mooring', 3, 1, { g: 'harbor' }],
    ['bollard', 4, 2], ['gangway', 3, 3, { g: 'harbor' }], ['stevedore', 5, 3, { al: [['longshoreman', 'synonym', 4, 3, ['US']], ['docker', 'synonym', 3, 3, ['UK'], { g: 'port worker' }]] }], ['ferry terminal', 2, 1], ['cruise terminal', 2, 1],
    ['anchorage', 4, 2], ['basin', 4, 3, { g: 'harbor' }], ['lock', 2, 3, { g: 'canal' }], ['floating dock', 3, 2], ['fishing port', 2, 2], ['seaport', 2, 1], ['deepwater port', 4, 3], ['sea lane', 4, 4],
    ['buoy', 2, 3], ['beacon', 3, 3, { g: 'harbor' }], ['tide gauge', 5, 4], ['fuel dock', 3, 2], ['pontoon', 3, 2], ['landing stage', 4, 2, { reg: ['UK'] }], ['promenade', 3, 4, { g: 'harbor' }], ['inner harbor', 3, 2],
    ['lighter', 5, 4, { g: 'harbor boat' }], ['derrick', 4, 4, { g: 'harbor' }], ['bulkhead', 5, 4, { g: 'harbor' }],
  ],

  // ---------------------------------------------------------------- famous ships
  famous_ships: [
    ['Titanic', 1, 1, P()], ['Mayflower', 1, 1, P()], ['Santa Maria', 2, 1, P()], ['HMS Victory', 3, 1, P()], ['Cutty Sark', 3, 1, P()], ['Bounty', 2, 2, P({ g: 'ship' })], ['Black Pearl', 2, 3, P({ tm: true })],
    ['Queen Mary', 3, 2, P({ g: 'ship' })], ['Queen Elizabeth 2', 3, 2, P({ al: [['QE2', 'synonym', 3, 2, [], { type: 'proper' }]] })], ['Lusitania', 3, 1, P({ sens: true })], ['Bismarck', 3, 1, P({ g: 'battleship' })], ['Endeavour', 3, 2, P({ g: 'ship' })],
    ['Pinta', 3, 1, P()], ['Nina', 3, 1, P({ g: 'ship', al: [['Niña', 'spelling', 3, 1, [], { type: 'proper' }]] })], ['Golden Hind', 3, 1, P()], ['Beagle', 3, 1, P({ g: 'ship' })], ['Mary Rose', 3, 1, P()], ['Fram', 4, 2, P({ g: 'ship' })],
    ['Kon-Tiki', 3, 1, P()], ['Endurance', 3, 1, P({ g: 'ship' })], ['Ark', 2, 3, P({ g: 'Noah', sens: true })], ['Pequod', 3, 1, P({ g: 'ship' })], ['Hispaniola', 4, 2, P({ g: 'ship' })], ['Nautilus', 3, 2, P({ g: 'submarine' })],
    ['Argo', 3, 2, P({ g: 'ship' })], ['Calypso', 3, 2, P({ g: 'ship' })], ['Mary Celeste', 3, 1, P()], ['Flying Dutchman', 2, 2, P()], ['Enterprise', 2, 3, P({ g: 'ship', tm: true })],
    ['USS Constitution', 3, 1, P()], ['USS Arizona', 3, 1, P({ sens: true })], ['Missouri', 3, 3, P({ g: 'battleship' })], ['HMS Beagle', 3, 1, P()], ['HMS Bounty', 3, 1, P()], ['Mauretania', 4, 2, P()], ['Olympic', 4, 3, P({ g: 'ship' })],
    ['Britannic', 5, 3, P()], ['Carpathia', 4, 2, P()], ['Andrea Doria', 4, 2, P()], ['Costa Concordia', 3, 2, P({ sens: true })], ['Exxon Valdez', 3, 2, P()], ['Edmund Fitzgerald', 4, 2, P({ sens: true })], ['Rainbow Warrior', 4, 2, P()],
    ['Potemkin', 4, 2, P({ g: 'battleship' })], ['Graf Spee', 4, 2, P()], ['Yamato', 4, 2, P()], ['Vasa', 4, 2, P({ g: 'ship' })],
  ],
};

// ---------------------------------------------------------------- library clash handling
// Texts that already exist in the library for another meaning (and so cannot be added with a gloss) are left out; texts that exist for the
// SAME meaning take the library's gloss ('' = none) so they are only linked. Applied to rows and aliases alike.
const DROP = new Set(['cirrus', 'beagle', 'greyhound', 'nautilus', 'paddock', 'hose', 'fuel tank', 'serpentine belt', 'carabiner', 'mouth', 'throat', 'x-ray', 'car seat',
  'endurance', 'six-pack', 'blanket', 'night owl', 'skirt', 'fabric', 'joystick', 'frontier', 'broomstick', 'sputnik', 'headphones', 'strut', 'silencer', 'flying fox', 'tyre',
  'cabin', 'cutter', 'frontier', 'sky mall', 'altimeter@hot_air_balloon_parts', 'bulkhead@ship_parts', 'bulkhead@ports_and_harbors', 'pilot@hot_air_balloon_parts', 'skipper@flight_crew', 'tacking', 'lee shore@x']);
const ALIAS_DROP = new Set(['blimp', 'freighter', 'trawler', 'marshaller']);
const GLOSS = new Map(Object.entries({
  'rolls-royce': '', timetable: '', commuter: '', 'people mover': '', propeller: '', blimp: '', lifeboat: '', anchor: '', rudder: '', captain: '', crew: '', freighter: '', trawler: '',
  gangway: '', detour: '', hovercraft: '', hospital: '', garage: '', warehouse: '', mechanic: '', cashier: '', navigator: '', jeep: '', saab: '', 'town car': '',
  engine: 'machine', tire: 'wheel', bumper: 'car', muffler: 'car', dipstick: 'oil gauge', steer: 'drive', roundabout: 'road', junction: 'road', 'speed limit': '', gridlock: '',
  carpool: '', rigging: '', helm: '', mooring: '', boom: 'sail', sail: 'boat', mayflower: 'ship', 'santa maria': 'ship', 'hms beagle': 'ship', pilot: 'aircraft', 'no parking': '', diesel: 'fuel', 'ticket machine': '', 'bike rack': '', fare: 'transport', 'monthly pass': '', platform: 'station', interchange: 'transit',
}));
const fixRow = ([text, r, i, o = {}], tid) => {
  const k = text.toLowerCase();
  if (DROP.has(k) || DROP.has(k + "@" + tid)) return null;
  const al = (o.al || []).filter(a => !DROP.has(a[0].toLowerCase()) && !ALIAS_DROP.has(a[0].toLowerCase())).map(a => GLOSS.has(a[0].toLowerCase()) ? [a[0], a[1], a[2], a[3], a[4] || [], { ...(a[5] || {}), g: GLOSS.get(a[0].toLowerCase()) || undefined }] : a);
  const n = { ...o, al };
  if (GLOSS.has(k)) { n.g = GLOSS.get(k) || undefined; }
  if (!al.length) delete n.al;
  return [text, r, i, n];
};
for (const [t, rows] of Object.entries(DATA)) {
  const seen = new Set();
  DATA[t] = rows.map(r => fixRow(r, t)).filter(r => r && !seen.has(r[0].toLowerCase()) && seen.add(r[0].toLowerCase()));
}

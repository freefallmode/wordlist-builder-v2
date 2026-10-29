// Generated word data: Science & Tech playable themes (space, measurement, computers, gadgets, engineering, scientific method).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const acr = (o = {}) => ({ type: 'acronym', ...o });
const brand = (o = {}) => ({ type: 'org', tm: true, ...o });

export const THEMES = {
  space: { d: 1 },
  measurement: { d: 2 },
  computers: { d: 1 },
  gadgets: { d: 2 },
  engineering: { d: 3 },
  scientific_method: { d: 3 },
};

export const DATA = {
  // ---------------------------------------------------------------- space
  space: [
    ['universe', 1, 1], ['galaxy', 1, 1], ['star', 1, 1, { g: 'sky' }], ['sun', 1, 1], ['moon', 1, 1], ['planet', 1, 1], ['orbit', 1, 1],
    ['comet', 1, 1], ['asteroid', 1, 1], ['astronaut', 1, 1, { al: [['spaceman', 'synonym', 2, 2], ['cosmonaut', 'synonym', 3, 3], ['taikonaut', 'synonym', 5, 5]] }],
    ['rocket', 1, 1, { g: 'spacecraft' }], ['satellite', 1, 1], ['telescope', 1, 2], ['black hole', 1, 1], ['solar system', 1, 1], ['spaceship', 1, 1, { al: [['starship', 'synonym', 2, 2], ['spacecraft', 'synonym', 2, 2]] }],
    ['space shuttle', 2, 2], ['meteor', 2, 2, { al: [['shooting star', 'synonym', 1, 2], ['falling star', 'synonym', 2, 2]] }], ['eclipse', 2, 2], ['gravity', 1, 3],
    ['nebula', 2, 2], ['supernova', 2, 2], ['Milky Way', 1, 1, { type: 'proper' }], ['cosmos', 3, 2], ['NASA', 1, 1, acr({ type: 'acronym' })],
    ['Big Bang', 1, 2, { type: 'proper' }], ['light-year', 2, 2, { al: [['light year', 'spelling', 2, 2]] }], ['space station', 2, 2], ['zero gravity', 2, 2, { type: 'phrase' }],
    ['meteorite', 3, 3], ['dark matter', 2, 3], ['exoplanet', 3, 3], ['wormhole', 2, 3], ['red giant', 3, 3], ['white dwarf', 3, 3], ['neutron star', 3, 3],
    ['spacesuit', 2, 2, { al: [['space suit', 'spelling', 2, 2]] }], ['spacewalk', 3, 2, { al: [['EVA', 'synonym', 5, 5, [], { type: 'acronym' }]] }],
    ['countdown', 1, 3], ['planetarium', 2, 3], ['astronomy', 2, 2], ['astrophysics', 3, 3], ['interstellar', 3, 2, adj()], ['extraterrestrial', 3, 2, adj()],
    ['solar wind', 3, 3], ['solar flare', 3, 3], ['cosmic ray', 4, 3], ['dark energy', 3, 3], ['quasar', 4, 4], ['pulsar', 4, 4], ['event horizon', 3, 3],
    ['singularity', 4, 4, { g: 'physics' }], ['redshift', 4, 4], ['Hubble', 2, 3, { type: 'proper', g: 'telescope' }], ['Sputnik', 3, 3, { type: 'proper' }],
    ['SpaceX', 2, 3, brand()], ['Roscosmos', 4, 4, brand()], ['ESA', 4, 4, acr({ type: 'org' })],
    ['Kuiper Belt', 4, 4, { type: 'proper' }], ['Oort Cloud', 4, 4, { type: 'proper' }], ['protostar', 4, 4], ['brown dwarf', 4, 4], ['escape velocity', 4, 4],
    ['perigee', 4, 4], ['apogee', 4, 4, { g: 'orbit' }], ['cosmology', 4, 3], ['magnetar', 5, 5], ['blazar', 5, 5], ['accretion disk', 5, 5],
    ['heliopause', 5, 5], ['barycenter', 5, 5], ['Lagrange point', 5, 5], ['Roche limit', 5, 5], ['syzygy', 5, 5], ['occultation', 5, 5],
  ],

  // ---------------------------------------------------------------- measurement
  measurement: [
    ['measure', 1, 1, verb()], ['weigh', 1, 2, verb()], ['ruler', 1, 1], ['tape measure', 1, 1], ['scale', 1, 2, { g: 'weighing' }], ['thermometer', 1, 1],
    ['length', 1, 1], ['width', 1, 1], ['height', 1, 1], ['depth', 1, 1], ['weight', 1, 1], ['distance', 1, 1], ['size', 1, 2], ['speed', 1, 2],
    ['volume', 2, 2, { g: 'capacity' }], ['mass', 2, 3, { g: 'physics' }], ['area', 2, 3, { g: 'size' }], ['unit', 2, 2, { g: 'measure' }], ['dimension', 2, 3],
    ['capacity', 2, 2], ['quantity', 2, 3], ['amount', 1, 3], ['metric', 2, 2, adj()], ['imperial', 2, 2, adj({ g: 'units' })], ['metric system', 2, 1], ['estimate', 2, 2],
    ['accurate', 2, 2, adj()], ['precise', 2, 2, adj()], ['approximate', 3, 3, adj()], ['accuracy', 3, 3], ['precision', 3, 3, { g: 'measurement' }],
    ['stopwatch', 2, 2], ['protractor', 2, 3], ['speedometer', 2, 3], ['diameter', 2, 3], ['circumference', 3, 3],
    ['yardstick', 3, 2, { al: [['meter stick', 'synonym', 3, 3, ['US']], ['metre rule', 'synonym', 4, 4, ['UK']]] }],
    ['gauge', 3, 3, { g: 'instrument', al: [['gage', 'spelling', 5, 5, ['US']]] }], ['calibrate', 3, 3, verb()], ['convert', 2, 3, verb({ g: 'units' })],
    ['barometer', 3, 3], ['odometer', 3, 3, { al: [['milometer', 'synonym', 4, 4, ['UK']]] }], ['spirit level', 3, 3, { al: [['bubble level', 'synonym', 3, 3, ['US']]] }],
    ['margin of error', 3, 3, { type: 'phrase' }], ['benchmark', 3, 3], ['surveyor', 3, 3], ['net weight', 3, 3], ['span', 3, 4, { g: 'width' }],
    ['caliper', 4, 4, { al: [['calliper', 'spelling', 4, 4, ['UK']], ['vernier caliper', 'synonym', 5, 5]] }], ['micrometer', 4, 4, { g: 'instrument' }],
    ['anemometer', 4, 4], ['rangefinder', 4, 4], ['plumb line', 4, 4], ['calibration', 4, 3], ['increment', 4, 4], ['girth', 4, 4], ['magnitude', 4, 4],
    ['hygrometer', 5, 5], ['vernier', 5, 5], ['theodolite', 5, 5], ['tare', 5, 5], ['sextant', 4, 5],
  ],

  // ---------------------------------------------------------------- computers
  computers: [
    ['computer', 1, 1], ['laptop', 1, 1, { al: [['notebook', 'synonym', 3, 3, [], { g: 'computer' }]] }], ['desktop', 1, 2, { g: 'computer' }], ['keyboard', 1, 1, { g: 'computer' }],
    ['mouse', 1, 1, { g: 'computer' }], ['monitor', 1, 2, { g: 'screen' }], ['printer', 1, 1], ['scanner', 1, 2], ['webcam', 2, 1],
    ['PC', 1, 1, acr({ al: [['personal computer', 'synonym', 2, 2, [], { type: 'common' }]] })], ['software', 1, 1], ['hardware', 1, 1, { g: 'computer' }], ['program', 1, 2, { g: 'software' }],
    ['app', 1, 2], ['file', 1, 1, { g: 'computer' }], ['folder', 1, 1, { g: 'computer' }], ['icon', 1, 2, { g: 'computer' }], ['cursor', 1, 1],
    ['password', 1, 1], ['email', 1, 2, { al: [['e-mail', 'spelling', 2, 2]] }], ['website', 1, 1], ['internet', 1, 1], ['browser', 1, 1], ['download', 1, 1],
    ['upload', 1, 1], ['server', 2, 2, { g: 'computer' }], ['network', 1, 2, { g: 'computer' }], ['database', 2, 2], ['bug', 1, 2, { g: 'software' }],
    ['virus', 1, 2, { g: 'computer' }], ['firewall', 2, 2], ['backup', 2, 2], ['update', 1, 2], ['reboot', 2, 2, verb({ al: [['restart', 'synonym', 1, 1]] })],
    ['crash', 1, 2, verb({ g: 'computer' })], ['pixel', 2, 2], ['byte', 2, 2], ['bit', 2, 3, { g: 'data' }], ['binary', 2, 3, { g: 'computer' }], ['algorithm', 3, 3],
    ['code', 1, 2, { g: 'programming' }], ['operating system', 2, 1, { al: [['OS', 'synonym', 3, 3, [], { type: 'acronym' }]] }],
    ['Windows', 1, 2, brand({ g: 'Microsoft' })], ['Mac', 1, 2, brand({ g: 'Apple' })], ['USB', 2, 2, acr()], ['Wi-Fi', 1, 2, { al: [['wifi', 'spelling', 1, 1]] }],
    ['router', 2, 3], ['modem', 2, 2], ['CPU', 2, 2, acr({ al: [['processor', 'synonym', 2, 2, [], { g: 'computer', type: 'common' }]] })],
    ['RAM', 2, 2, acr({ g: 'memory' })], ['memory', 1, 3, { g: 'computer' }], ['hard drive', 2, 2, { al: [['HDD', 'synonym', 4, 4, [], { type: 'acronym' }]] }],
    ['SSD', 3, 3, acr()], ['GPU', 3, 3, acr()], ['motherboard', 3, 3, { al: [['mainboard', 'synonym', 5, 5]] }], ['mainframe', 3, 3], ['supercomputer', 2, 3],
    ['spreadsheet', 2, 3], ['cloud', 1, 3, { g: 'computing' }], ['bandwidth', 3, 3], ['malware', 3, 3],
    ['firmware', 4, 4], ['kernel', 4, 4, { g: 'computer' }], ['cache', 3, 4, { g: 'memory' }], ['BIOS', 4, 4, acr()], ['defragment', 4, 4, verb()],
    ['daemon', 5, 5, { g: 'computer' }], ['bootloader', 5, 5], ['compiler', 4, 4], ['hypervisor', 5, 5],
  ],

  // ---------------------------------------------------------------- gadgets
  gadgets: [
    ['smartphone', 1, 1, { al: [['cell phone', 'synonym', 1, 1, ['US', 'CA']], ['mobile phone', 'synonym', 1, 1, ['UK', 'AU', 'IE', 'NZ', 'ZA']], ['mobile', 'synonym', 1, 1, ['UK', 'AU', 'IE', 'IN'], { g: 'phone' }]] }],
    ['tablet', 1, 2, { g: 'computer' }], ['smartwatch', 1, 1], ['headphones', 1, 1, { al: [['cans', 'synonym', 4, 4, [], { g: 'headphones' }]] }],
    ['earbuds', 1, 1, { al: [['earphones', 'synonym', 2, 2]] }], ['e-reader', 2, 1], ['drone', 1, 2, { g: 'gadget' }], ['GPS', 2, 2, acr()], ['camcorder', 2, 2],
    ['remote control', 1, 2, { al: [['remote', 'synonym', 1, 1, [], { g: 'control' }], ['clicker', 'synonym', 3, 3, [], { g: 'remote' }]] }],
    ['flashlight', 1, 1, { reg: ['US', 'CA'], al: [['torch', 'synonym', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN', 'ZA'], { g: 'flashlight' }]] }],
    ['calculator', 1, 2], ['power bank', 2, 2, { al: [['portable charger', 'synonym', 2, 2]] }], ['fitness tracker', 2, 1], ['game console', 1, 2],
    ['VR headset', 2, 2], ['smart speaker', 2, 2], ['action camera', 3, 3], ['dashcam', 3, 3, { al: [['dash camera', 'synonym', 3, 3]] }], ['walkie-talkie', 2, 2],
    ['MP3 player', 2, 2], ['selfie stick', 2, 2], ['laser pointer', 2, 3], ['pager', 3, 3, { al: [['beeper', 'synonym', 3, 3, ['US'], { g: 'pager' }]] }],
    ['digital camera', 1, 2], ['e-cigarette', 3, 3, { adult: true, al: [['vape', 'synonym', 2, 2]] }], ['Bluetooth speaker', 2, 1, { tm: false }],
    ['iPhone', 1, 1, brand()], ['iPad', 1, 1, brand()], ['Kindle', 1, 2, brand()], ['Fitbit', 2, 2, brand()], ['GoPro', 2, 3, brand()], ['Segway', 2, 3, brand()],
    ['Walkman', 2, 2, brand()], ['Game Boy', 2, 3, { type: 'title', tm: true }], ['Tamagotchi', 2, 3, brand()], ['Alexa', 2, 3, brand({ g: 'assistant' })],
    ['Apple Watch', 1, 1, brand()], ['AirPods', 2, 2, brand()], ['Roomba', 2, 3, brand()], ['PDA', 3, 3, acr({ al: [['personal organizer', 'synonym', 4, 4, [], { type: 'common' }]] })],
    ['portable radio', 2, 3], ['transistor radio', 3, 3], ['digital watch', 2, 2], ['smart ring', 3, 3], ['hoverboard', 2, 3], ['e-scooter', 3, 3],
    ['Palm Pilot', 3, 4, brand()], ['Discman', 3, 3, brand()], ['BlackBerry', 2, 3, brand()], ['Tile tracker', 4, 4, brand()], ['Dictaphone', 4, 4, brand({ al: [['voice recorder', 'synonym', 2, 2, [], { type: 'common', tm: false }]] })],
    ['stylus', 3, 3, { g: 'gadget' }], ['dongle', 4, 4, { vulgar: false }], ['monocular', 4, 4], ['Sat Nav', 3, 3, { type: 'phrase', reg: ['UK'], al: [['satnav', 'spelling', 3, 3, ['UK']]] }],
  ],

  // ---------------------------------------------------------------- engineering
  engineering: [
    ['bridge', 1, 2, { g: 'structure' }], ['dam', 1, 2], ['tunnel', 1, 2], ['skyscraper', 1, 2], ['engine', 1, 1], ['motor', 1, 2, { g: 'machine' }],
    ['gear', 1, 2, { g: 'machine' }], ['lever', 2, 2], ['pulley', 2, 2], ['wheel', 1, 2], ['axle', 2, 2], ['pump', 1, 2, { g: 'machine' }], ['bolt', 1, 3, { g: 'hardware' }],
    ['nut', 1, 3, { g: 'hardware' }], ['screw', 1, 3, { g: 'hardware' }], ['spring', 1, 3, { g: 'coil' }], ['beam', 2, 2, { g: 'structure' }], ['arch', 2, 3, { g: 'structure' }],
    ['concrete', 1, 2], ['steel', 1, 2], ['blueprint', 2, 2], ['prototype', 2, 2], ['piston', 2, 2], ['turbine', 2, 2], ['generator', 2, 2], ['valve', 2, 2, { g: 'machine' }],
    ['girder', 3, 3], ['truss', 3, 3], ['bearing', 3, 3, { g: 'machine' }], ['load', 2, 3, { g: 'structure' }], ['stress', 2, 3, { g: 'material' }], ['strain', 3, 3, { g: 'material' }],
    ['tension', 2, 3, { g: 'force' }], ['torque', 3, 3], ['friction', 2, 3], ['efficiency', 2, 3], ['schematic', 3, 3], ['circuit', 2, 3], ['transistor', 3, 3],
    ['capacitor', 3, 3], ['resistor', 3, 3], ['weld', 2, 3, verb()], ['rivet', 3, 3], ['hydraulics', 3, 3], ['aqueduct', 3, 3], ['reservoir', 2, 3],
    ['flywheel', 3, 3], ['crankshaft', 3, 3], ['camshaft', 4, 4], ['cantilever', 4, 4], ['suspension bridge', 2, 3], ['reinforced concrete', 3, 3, { al: [['rebar', 'synonym', 4, 4, ['US', 'CA'], { g: 'steel bar' }]] }],
    ['pneumatics', 4, 4], ['gasket', 3, 3], ['bushing', 4, 4], ['actuator', 4, 4], ['servo', 4, 4], ['governor', 4, 4, { g: 'machine' }], ['CAD', 3, 3, acr({ g: 'design' })],
    ['finite element', 5, 5, { type: 'phrase' }], ['safety factor', 4, 4, { al: [['factor of safety', 'synonym', 4, 4, [], { type: 'phrase' }]] }], ['fatigue', 3, 4, { g: 'material' }], ['creep', 5, 5, { g: 'material' }],
    ['yield strength', 5, 5], ['moment of inertia', 5, 5, { type: 'phrase' }], ['Reynolds number', 5, 5], ['strut', 4, 4], ['buttress', 4, 4], ['caisson', 5, 5],
    ['tolerance', 4, 4, { g: 'engineering' }], ['thermodynamics', 3, 3], ['Newton meter', 5, 5],
  ],

  // ---------------------------------------------------------------- scientific method
  scientific_method: [
    ['hypothesis', 2, 1, { al: [['educated guess', 'synonym', 2, 2], ['hunch', 'synonym', 2, 4, [], { g: 'guess' }]] }], ['experiment', 1, 1], ['observation', 2, 1], ['theory', 1, 2, { g: 'science' }],
    ['variable', 2, 2, { g: 'experiment' }], ['control', 2, 2, { g: 'experiment' }], ['data', 1, 1], ['result', 1, 2], ['conclusion', 1, 1], ['analysis', 2, 2],
    ['evidence', 1, 2], ['prediction', 1, 2], ['research', 1, 2], ['replication', 3, 2], ['peer review', 3, 2], ['bias', 2, 3, { g: 'research' }], ['sample', 2, 3, { g: 'specimen' }],
    ['trial', 2, 3, { g: 'experiment' }], ['test', 1, 2, { g: 'experiment' }], ['independent variable', 3, 2], ['dependent variable', 3, 2], ['control group', 2, 2],
    ['placebo', 2, 3], ['double-blind', 3, 3, adj()], ['falsifiable', 4, 3, adj()], ['reproducible', 3, 3, adj()], ['correlation', 3, 3], ['causation', 3, 3],
    ['null hypothesis', 4, 3], ['p-value', 4, 4], ['statistics', 2, 3], ['sample size', 3, 3], ['outlier', 3, 3], ['anomaly', 3, 3], ['inference', 3, 3],
    ['deduction', 3, 3], ['induction', 4, 4, { g: 'reasoning' }], ['empirical', 3, 3, adj()], ['objective', 2, 3, adj({ g: 'unbiased' })], ['Occam\'s razor', 3, 3, { type: 'proper' }],
    ['scientific journal', 3, 3, { al: [['journal', 'synonym', 2, 3, [], { g: 'science' }]] }], ['lab notebook', 3, 3], ['protocol', 3, 3, { g: 'experiment' }], ['constant', 3, 3, { g: 'experiment' }],
    ['method', 1, 2, { g: 'science' }], ['question', 1, 2, { g: 'science' }], ['background research', 3, 3], ['procedure', 2, 2], ['materials', 2, 3, { g: 'experiment' }],
    ['observe', 1, 1, verb()], ['investigate', 2, 2, verb()], ['record', 1, 3, verb({ g: 'data' })], ['verify', 3, 3, verb()], ['repeat', 1, 3, verb({ g: 'experiment' })],
    ['confirmation bias', 3, 3], ['blind test', 3, 3], ['randomization', 4, 4], ['confounding variable', 4, 4], ['standard deviation', 4, 4], ['statistical significance', 4, 4, { type: 'phrase' }],
    ['peer-reviewed', 3, 3, adj()], ['preprint', 4, 4], ['retraction', 4, 4, { g: 'journal' }], ['pilot study', 4, 4], ['meta-analysis', 5, 5], ['abductive reasoning', 5, 5],
  ],
};

export const ALIASES = [];

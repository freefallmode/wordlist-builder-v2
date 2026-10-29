// Generated word data: Science & Tech depth-3 themes, chunk 5 (science places: launch pad, data center, nuclear power plant, electronics workbench).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
export const THEMES = {
  launch_pad: { d: 2 }, data_center: { d: 3 }, nuclear_power_plant: { d: 4 }, electronics_workbench: { d: 4 },
};

export const DATA = {
  launch_pad: [
    ['rocket', 1, 1, { g: 'spacecraft' }], ['countdown', 1, 1], ['astronaut', 1, 2], ['space shuttle', 1, 2], ['liftoff', 1, 1, { al: [['lift-off', 'spelling', 2, 2], ['blastoff', 'synonym', 2, 2]] }],
    ['fuel tank', 2, 2], ['countdown clock', 3, 2], ['gantry', 3, 2], ['launch tower', 3, 2], ['capsule', 2, 3, { g: 'spacecraft' }], ['booster', 2, 3, { g: 'rocket' }],
    ['ignition', 2, 3], ['mission control', 2, 3], ['Cape Canaveral', 2, 2, { type: 'place' }], ['Kennedy Space Center', 2, 2, { type: 'place' }], ['T-minus', 3, 2],
    ['flame trench', 4, 2], ['payload', 3, 3], ['launch window', 3, 3], ['exhaust plume', 3, 3], ['liquid oxygen', 3, 4, { al: [['LOX', 'short', 5, 5, [], { type: 'acronym' }]] }],
    ['Saturn V', 3, 3, { type: 'proper' }], ['Baikonur', 4, 3, { type: 'place' }], ['fairing', 4, 3, { g: 'rocket' }], ['umbilical tower', 4, 3], ['service tower', 4, 3],
    ['blast deflector', 4, 3], ['hydrogen tank', 3, 3], ['fuel line', 3, 4], ['lightning mast', 4, 4], ['escape tower', 5, 4], ['crawler transporter', 5, 4], ['sound suppression', 5, 5],
  ],

  data_center: [
    ['server rack', 2, 1], ['server', 1, 2, { g: 'computer' }], ['cable', 1, 2, { g: 'wire' }], ['router', 2, 2, { g: 'network' }], ['cooling fan', 2, 1], ['backup generator', 2, 1],
    ['raised floor', 4, 2], ['hard drive', 2, 3], ['mainframe', 3, 3], ['firewall', 3, 3], ['cloud', 2, 3, { g: 'computing' }], ['switch', 2, 3, { g: 'network' }],
    ['ethernet cable', 2, 2], ['patch cable', 3, 2], ['fiber optic', 3, 3], ['power supply', 2, 3], ['air conditioning', 2, 3], ['server room', 2, 2], ['server farm', 3, 2],
    ['blade server', 4, 3], ['cold aisle', 4, 2], ['hot aisle', 4, 3], ['patch panel', 4, 3], ['UPS', 3, 4, { type: 'acronym', g: 'power backup' }], ['rack unit', 4, 4],
    ['load balancer', 4, 4], ['storage array', 4, 3], ['fire suppression', 4, 3], ['sysadmin', 3, 4], ['colocation', 5, 4], ['data hall', 4, 3],
  ],

  nuclear_power_plant: [
    ['reactor', 2, 1], ['cooling tower', 2, 1], ['control rods', 3, 1], ['turbine', 3, 2], ['uranium', 2, 1], ['radiation suit', 3, 2], ['fuel rod', 3, 2], ['plutonium', 3, 3],
    ['containment dome', 3, 2], ['radiation', 2, 2], ['meltdown', 2, 3], ['hazmat suit', 2, 3], ['Geiger counter', 2, 3], ['Chernobyl', 2, 3, { type: 'place' }],
    ['fission', 3, 2], ['coolant', 3, 2], ['isotope', 3, 3], ['enriched uranium', 3, 2], ['control room', 2, 3], ['Three Mile Island', 3, 3, { type: 'place' }],
    ['Fukushima', 3, 3, { type: 'place' }], ['steam generator', 4, 3], ['heavy water', 4, 3], ['dosimeter', 4, 3], ['spent fuel', 4, 3], ['uranium pellets', 4, 3],
    ['graphite', 4, 4], ['moderator', 4, 3, { g: 'nuclear' }], ['containment building', 4, 3], ['PWR', 5, 4, { type: 'acronym', g: 'reactor type' }], ['Sellafield', 5, 4, { type: 'place' }],
    ['SCRAM', 5, 4, { type: 'acronym', g: 'shutdown' }], ['criticality', 5, 4], ['boron', 5, 4],
  ],

  electronics_workbench: [
    ['soldering iron', 2, 1], ['multimeter', 3, 1], ['breadboard', 3, 1], ['oscilloscope', 3, 1], ['wire stripper', 3, 1], ['resistor', 3, 1], ['solder', 2, 1],
    ['circuit board', 1, 2], ['capacitor', 3, 2], ['transistor', 2, 2], ['diode', 3, 2], ['LED', 2, 3, { type: 'acronym' }], ['jumper wire', 3, 2], ['pliers', 1, 3],
    ['screwdriver', 1, 3], ['tweezers', 2, 3], ['wire cutters', 2, 2], ['magnifying glass', 2, 3], ['fuse', 3, 3], ['PCB', 3, 3, { type: 'acronym' }],
    ['Arduino', 3, 3, { type: 'org', tm: true }], ['Raspberry Pi', 2, 3, { type: 'org', tm: true }], ['microcontroller', 3, 3], ['integrated circuit', 3, 3],
    ['heat shrink', 4, 3], ['helping hands', 4, 3], ['inductor', 4, 3], ['potentiometer', 4, 3], ['relay', 4, 4], ['function generator', 4, 3], ['logic analyzer', 5, 4],
    ['desoldering pump', 5, 4], ['solder wick', 5, 4], ['anti-static mat', 4, 3], ['flux', 4, 3, { g: 'soldering' }],
  ],
};

// Deeper science & tech themes, chunk 2 ("rest" list). Format: tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const co = (o = {}) => ({ type: 'org', ...o });
const key = (o = {}) => ({ g: 'key', ...o });
const prop = (o = {}) => ({ g: 'material', ...o });

export const THEMES = {
  four_great_chinese_inventions: { d: 3 }, japanese_inventions: { d: 3 }, middle_eastern_inventions: { d: 4 }, european_inventions: { d: 3 },
  american_inventions: { d: 2 }, australian_inventions: { d: 4 }, accidental_inventions: { d: 2 },
  branches_of_biology: { d: 3 }, earth_sciences: { d: 4 }, keyboard_keys: { d: 1 }, cables_and_connectors: { d: 3 },
  asian_tech_companies: { d: 3 }, european_tech_companies: { d: 4 }, fuels: { d: 2 }, alloys: { d: 4 },
  material_properties: { d: 5 }, science_experiments_for_kids: { d: 2 },
};

export const FIXES = [
  { gloss: ['delete', 'computer_actions', 'action'] },
  { gloss: ['acorn', 'nuts', 'nut'] }, { gloss: ['strength', 'fitness', 'physical'] },
  { split: ['SAP', 'tech_companies', 'company', { type: 'org' }] },
];

export const DATA = {
  four_great_chinese_inventions: [
    ['paper', 1, 1, { g: 'material', al: [['papermaking', 'synonym', 3, 2]] }],
    ['printing', 2, 2, { al: [['woodblock printing', 'synonym', 4, 3], ['block printing', 'synonym', 4, 3]] }],
    ['gunpowder', 2, 1, { g: 'explosive', al: [['black powder', 'synonym', 3, 3]] }],
    ['compass', 1, 1, { g: 'navigation', al: [['magnetic compass', 'synonym', 2, 2]] }],
  ],

  japanese_inventions: [
    ['karaoke', 1, 1], ['emoji', 1, 1], ['instant noodles', 1, 1, { al: [['instant ramen', 'synonym', 2, 2]] }], ['bullet train', 1, 1, { al: [['shinkansen', 'synonym', 3, 3]] }],
    ['QR code', 1, 2], ['walkman', 2, 2], ['tamagotchi', 2, 2], ['rice cooker', 2, 2], ['game boy', 2, 3], ['betamax', 3, 3], ['minidisc', 3, 3],
    ['pachinko', 3, 4], ['discman', 3, 3], ['blue LED', 4, 4, { type: 'common' }], ['pocket calculator', 2, 4], ['quartz watch', 3, 4],
    ['conveyor sushi', 4, 4, { al: [['kaitenzushi', 'synonym', 5, 5]] }], ['cup noodles', 2, 2, { tm: true }], ['karaoke machine', 3, 3],
    ['camcorder', 2, 4],
  ],

  middle_eastern_inventions: [
    ['wheel', 1, 1], ['writing', 1, 1, { g: 'activity' }], ['plough', 2, 2, { g: 'farm implement' }], ['astrolabe', 4, 3], ['algebra', 2, 3],
    ['coffeehouse', 2, 3], ['glass', 1, 2, { g: 'material' }], ['cuneiform', 3, 2], ['alphabet', 1, 2], ['windmill', 2, 3, { g: 'building' }],
    ['distillation', 3, 4], ['soap', 1, 3, { g: 'wash' }], ['chess', 1, 4], ['sundial', 2, 3], ['irrigation', 2, 3], ['crankshaft', 4, 5],
    ['calendar', 1, 3], ['hospital', 1, 4], ['mud brick', 3, 3], ['camera obscura', 4, 4], ['alarm clock', 2, 5], ['pottery wheel', 3, 3],
    ['sailing ship', 2, 4], ['algorithm', 3, 4],
  ],

  european_inventions: [
    ['printing press', 1, 1], ['telescope', 1, 2], ['steam engine', 1, 1], ['radio', 1, 2], ['jet engine', 2, 1], ['world wide web', 1, 2],
    ['microscope', 1, 2], ['eyeglasses', 2, 2], ['mechanical clock', 3, 3], ['thermometer', 1, 3], ['barometer', 3, 3], ['piano', 1, 4], ['bicycle', 1, 3],
    ['locomotive', 2, 3], ['dynamite', 2, 2], ['diesel engine', 2, 2], ['television', 1, 3], ['aspirin', 2, 3], ['hot air balloon', 1, 3],
    ['stethoscope', 2, 3], ['guillotine', 3, 4, { g: 'execution device', sens: true }], ['pasteurization', 3, 4, { al: [['pasteurisation', 'spelling', 3, 4, ['UK']]] }],
    ['safety lamp', 4, 4], ['Braille', 2, 4, { type: 'proper' }], ['pendulum clock', 4, 4], ['spinning jenny', 4, 4],
  ],

  american_inventions: [
    ['telephone', 1, 1, { g: 'device' }], ['light bulb', 1, 1], ['airplane', 1, 1], ['assembly line', 2, 2], ['internet', 1, 2], ['laser', 2, 3, { g: 'beam' }],
    ['cotton gin', 3, 2], ['phonograph', 3, 2], ['zipper', 1, 3, { g: 'clothing' }], ['transistor', 3, 3], ['air conditioner', 1, 3], ['blue jeans', 1, 3],
    ['barbed wire', 2, 3], ['safety elevator', 4, 4], ['cell phone', 1, 3], ['traffic light', 1, 3], ['nylon', 2, 3, { g: 'fabric' }], ['lightning rod', 3, 3],
    ['bifocals', 2, 3], ['mechanical reaper', 4, 4], ['sewing machine', 1, 4], ['steamboat', 2, 3], ['telegraph', 2, 3], ['basketball', 1, 4],
    ['dishwasher', 1, 4, { g: 'appliance' }], ['personal computer', 2, 4], ['GPS', 2, 4, { type: 'acronym' }],
  ],

  australian_inventions: [
    ['black box', 2, 1], ['wi-fi', 1, 2], ['cochlear implant', 3, 2, { al: [['bionic ear', 'synonym', 3, 3]] }], ['electric drill', 2, 3], ['ultrasound scanner', 3, 4],
    ['polymer banknote', 3, 2, { al: [['plastic banknote', 'synonym', 3, 3]] }], ['Hills Hoist', 3, 2, { type: 'proper', reg: ['AU'] }], ['pacemaker', 2, 4], ['Victa mower', 4, 3, { type: 'proper', reg: ['AU'] }],
    ['esky', 2, 3, { reg: ['AU'] }], ['wine cask', 3, 3, { reg: ['AU'] }], ['ute', 2, 3, { reg: ['AU'] }], ['zinc cream', 3, 3], ['spray-on skin', 4, 3],
    ['stump-jump plough', 5, 5], ['sunshine harvester', 5, 5], ['totalisator', 5, 5], ['atomic absorption', 5, 5],
    ['refrigerator', 1, 5, { al: [['fridge', 'short', 1, 5]] }], 
  ],

  accidental_inventions: [
    ['microwave oven', 1, 1], ['penicillin', 2, 1], ['Post-it note', 1, 1, { tm: true, type: 'common' }], ['velcro', 1, 2], ['X-ray', 1, 2, { g: 'medical', type: 'common', al: [['Roentgen ray', 'synonym', 4, 4]] }],
    ['superglue', 1, 2], ['potato chips', 1, 2], ['chocolate chip cookie', 1, 3], ['teflon', 2, 3], ['ice cream cone', 1, 3], ['popsicle', 1, 3],
    ['saccharin', 3, 3], ['vulcanized rubber', 3, 4], ['silly putty', 2, 3], ['slinky', 1, 3], ['cornflakes', 1, 3], ['stainless steel', 2, 4],
    ['safety glass', 3, 4], ['matches', 1, 4, { g: 'fire' }], ['tea bag', 1, 3], ['Play-Doh', 1, 4, { tm: true, type: 'common' }], ['pacemaker', 2, 4],
    ['radioactivity', 3, 4], ['fireworks', 1, 5], ['plastic', 1, 5], ['dynamite', 2, 5], ['brandy', 2, 5],
  ],

  branches_of_biology: [
    ['botany', 2, 1], ['zoology', 2, 1], ['ecology', 2, 1], ['genetics', 2, 1], ['anatomy', 2, 1], ['microbiology', 2, 2], ['entomology', 3, 2],
    ['physiology', 3, 2], ['virology', 3, 2], ['mycology', 4, 3], ['ornithology', 3, 2], ['ichthyology', 4, 3], ['herpetology', 4, 3], ['mammalogy', 4, 3],
    ['cytology', 4, 3], ['histology', 4, 3], ['embryology', 4, 3], ['taxonomy', 3, 3], ['immunology', 3, 3], ['neuroscience', 2, 3], ['biochemistry', 2, 3],
    ['paleontology', 3, 3], ['parasitology', 4, 3], ['toxicology', 3, 4], ['primatology', 4, 3], ['arachnology', 5, 4], ['bryology', 5, 5], ['phycology', 5, 5],
    ['dendrology', 5, 5], ['marine biology', 2, 2], ['molecular biology', 2, 3], ['bacteriology', 4, 3], ['lepidopterology', 5, 5],
  ],

  earth_sciences: [
    ['geology', 2, 1], ['meteorology', 2, 1], ['oceanography', 3, 1], ['seismology', 3, 2], ['volcanology', 4, 2], ['glaciology', 4, 3], ['geography', 1, 3],
    ['hydrology', 4, 2], ['mineralogy', 4, 2], ['petrology', 5, 3], ['paleontology', 3, 4], ['climatology', 4, 2], ['geophysics', 4, 2], ['cartography', 3, 4],
    ['speleology', 5, 4], ['tectonics', 4, 3], ['stratigraphy', 5, 4], ['geodesy', 5, 4], ['soil science', 3, 3], ['geochemistry', 4, 3],
    ['geomorphology', 5, 4], ['sedimentology', 5, 4], ['limnology', 5, 4], ['pedology', 5, 4], ['crystallography', 4, 4], ['atmospheric science', 3, 3],
    ['hydrogeology', 5, 4], ['planetary geology', 4, 4], ['earth science', 2, 2],
  ],

  keyboard_keys: [
    ['enter', 1, 1], ['shift', 1, 1, key()], ['tab', 1, 1, key()], ['escape', 1, 1, key()], ['space bar', 1, 1, { al: [['spacebar', 'spelling', 1, 1]] }], ['backspace', 1, 1],
    ['caps lock', 1, 1], ['delete', 1, 2, key()], ['control', 2, 2, key({ al: [['ctrl', 'short', 2, 2]] })], ['alt', 2, 2], ['home', 1, 3, key()], ['end', 1, 3, key()],
    ['page up', 2, 3], ['page down', 2, 3], ['insert', 2, 3, key()], ['num lock', 3, 3], ['scroll lock', 4, 4], ['print screen', 3, 3], ['pause', 2, 4, key()],
    ['function key', 2, 2, { al: [['fn', 'short', 3, 3]] }], ['arrow keys', 1, 2], ['windows key', 2, 2, { tm: true }], ['command', 3, 3, { g: 'key', tm: true }], ['option', 3, 4, key({ tm: true })],
    ['return', 2, 3, key()], ['menu key', 4, 4], ['F1', 2, 3, { type: 'acronym' }], ['numpad', 3, 3], ['SysRq', 5, 5, { type: 'proper' }], 
  ],

  cables_and_connectors: [
    ['USB', 1, 1, { type: 'acronym' }], ['HDMI', 1, 1], ['ethernet', 2, 1], ['VGA', 3, 2], ['DVI', 4, 3, { type: 'acronym' }], ['DisplayPort', 4, 3, { tm: true }],
    ['Thunderbolt', 3, 3, { tm: true, type: 'proper' }], ['lightning cable', 2, 1, { tm: true }], ['USB-C', 2, 1, { type: 'acronym' }], ['FireWire', 3, 3, { tm: true, type: 'proper' }],
    ['coaxial cable', 3, 2, { al: [['coax', 'short', 4, 3]] }], ['fiber optic', 3, 3, { al: [['fibre optic', 'spelling', 3, 3, ['UK']]] }], ['serial cable', 4, 3], ['RJ45', 4, 3, { type: 'acronym' }],
    ['Cat6 cable', 4, 3], ['audio jack', 2, 2], ['aux cable', 2, 2], ['micro USB', 2, 2], ['mini USB', 3, 2], ['patch cable', 4, 3], ['RCA cable', 3, 3],
    ['S-video', 4, 4], ['Toslink', 5, 5, { tm: true, type: 'proper' }], ['SATA cable', 4, 4], ['PS/2', 4, 4], ['SCSI', 4, 4, { type: 'acronym' }], ['parallel cable', 4, 4],
    ['XLR', 4, 4, { type: 'acronym' }], ['power cord', 1, 3], ['extension cord', 1, 4], ['BNC', 5, 5, { type: 'acronym' }], ['ribbon cable', 4, 4], ['twisted pair', 4, 5],
  ],

  asian_tech_companies: [
    ['Samsung', 1, 1], ['Sony', 1, 1], ['Huawei', 2, 1], ['Alibaba', 2, 1], ['Toshiba', 2, 1, co()], ['Panasonic', 2, 1, co()], ['Xiaomi', 2, 2], ['Lenovo', 2, 2],
    ['LG', 1, 2, co()], ['Tencent', 3, 2], ['Baidu', 3, 2], ['Sharp', 2, 3, co({ g: 'company' })], ['Hitachi', 2, 2, co()], ['Fujitsu', 3, 2, co()], ['NEC', 3, 3, co()],
    ['Canon', 2, 3, { g: 'camera brand', type: 'common' }], ['Nikon', 2, 3], ['TSMC', 4, 3], ['Foxconn', 4, 3], ['ByteDance', 3, 3], ['Asus', 3, 3, co()], ['Acer', 3, 3, co()],
    ['HTC', 3, 3, co({ type: 'acronym' })], ['Oppo', 3, 3, co()], ['Nintendo', 1, 4], ['Rakuten', 4, 3, co()], ['Casio', 2, 4], ['Epson', 3, 3, co()], ['Kyocera', 4, 4, co()],
    ['SoftBank', 4, 4, co()], ['DJI', 4, 4, co({ type: 'acronym' })], ['Infosys', 4, 4], ['Wipro', 5, 5, co()], ['Naver', 5, 5, co()], ['Kakao', 5, 5, co()], ['SK Hynix', 5, 5, co()],
    ['OnePlus', 3, 3, co()], ['Ricoh', 4, 4, co()], ['Sanyo', 3, 3, co()], ['Meituan', 5, 5, co()],
  ],

  european_tech_companies: [
    ['Nokia', 2, 1], ['Ericsson', 3, 2], ['SAP', 3, 3, { g: 'company', type: 'org' }], ['Philips', 2, 2], ['Siemens', 2, 2, { g: 'company' }], ['Spotify', 1, 2], ['ASML', 4, 3],
    ['Arm', 3, 3, { g: 'company' }], ['Bosch', 2, 3, co()], ['Infineon', 5, 4, co()], ['Alcatel', 3, 3, co()], ['Ubisoft', 2, 3, co()], ['Logitech', 3, 2, co()],
    ['Klarna', 3, 4, co()], ['Revolut', 3, 3, co()], ['Zalando', 3, 4, co()], ['Deezer', 3, 3, co()], ['DeepMind', 3, 3, co()], ['Sinclair', 4, 3, co()],
    ['Acorn', 4, 4, co({ g: 'computer company' })], ['Capgemini', 4, 4, co()], ['Atos', 5, 5, co()], ['Adyen', 5, 5, co()], ['Mistral AI', 4, 4, co()],
    ['Raspberry Pi', 3, 3],
    ['Bang & Olufsen', 4, 4, co()],
  ],

  fuels: [
    ['petrol', 1, 1, { g: 'fuel', al: [['gasoline', 'synonym', 1, 1, ['US']]] }], ['diesel', 1, 1, { g: 'fuel' }], ['kerosene', 3, 2], ['propane', 2, 2, { g: 'fuel' }], ['butane', 3, 2],
    ['ethanol', 3, 2], ['charcoal', 1, 2, { g: 'fuel' }], ['jet fuel', 2, 2], ['coal', 1, 1], ['natural gas', 1, 1], ['peat', 3, 3], ['hydrogen', 2, 3],
    ['biodiesel', 4, 3], ['methane', 3, 4], ['heating oil', 2, 3], ['coke', 3, 4, { g: 'fuel' }], ['firewood', 1, 2], ['uranium', 2, 4], ['methanol', 4, 3],
    ['paraffin', 3, 3, { g: 'fuel' }], ['LPG', 3, 3, { type: 'acronym' }], ['naphtha', 5, 4], ['bunker fuel', 4, 4], ['rocket fuel', 2, 3], ['wood pellets', 3, 3],
    ['lamp oil', 3, 3], ['biogas', 4, 4], ['lighter fluid', 2, 4], ['fuel oil', 3, 3], ['crude oil', 1, 4],
  ],

  alloys: [
    ['steel', 1, 1, { g: 'metal' }], ['bronze', 1, 1, { g: 'metal' }], ['brass', 1, 1, { g: 'metal' }], ['pewter', 3, 2, { g: 'metal' }], ['solder', 2, 2, { g: 'metal' }],
    ['sterling silver', 2, 2], ['white gold', 2, 2], ['stainless steel', 1, 2], ['cast iron', 2, 3], ['duralumin', 5, 4], ['nichrome', 4, 3], ['electrum', 4, 3],
    ['invar', 5, 4], ['amalgam', 3, 3], ['gunmetal', 3, 3, { g: 'alloy' }], ['babbitt metal', 5, 5], ['cupronickel', 5, 4], ['rose gold', 2, 2], ['Monel', 5, 5, { type: 'proper', tm: true }],
    ['Inconel', 5, 5, { type: 'proper', tm: true }], ['bell metal', 5, 4], ['Nitinol', 5, 5, { type: 'proper' }], ['Wood\'s metal', 5, 5], ['zamak', 5, 5], ['constantan', 5, 5],
    ['carbon steel', 3, 3], ['Damascus steel', 3, 3], ['spring steel', 4, 4], ['tool steel', 4, 3],
    ['pot metal', 4, 4], ['alnico', 5, 5], ['magnalium', 5, 5], ['Sheffield plate', 5, 5], ['Britannia metal', 5, 5], ['white metal', 4, 4], ['German silver', 4, 4], ['nickel silver', 4, 4],
  ],

  material_properties: [
    ['hardness', 2, 1], ['strength', 1, 2, prop()], ['toughness', 2, 2], ['elasticity', 2, 2], ['ductility', 4, 2], ['malleability', 3, 2], ['brittleness', 3, 2],
    ['density', 2, 2], ['conductivity', 3, 2], ['stiffness', 2, 2], ['plasticity', 3, 3], ['tensile strength', 3, 2], ['fatigue', 3, 4, prop()], ['creep', 4, 5, prop()],
    ['thermal expansion', 3, 3], ['melting point', 2, 3], ['resistivity', 4, 3], ['permeability', 4, 3], ['corrosion resistance', 3, 3], ['opacity', 3, 3], ['transparency', 2, 3],
    ['durability', 2, 3], ['flexibility', 2, 3], ['porosity', 4, 3], ['viscosity', 3, 4], ['lustre', 3, 3, { al: [['luster', 'spelling', 3, 3, ['US']]] }], ['solubility', 3, 3],
    ['fragility', 3, 3], ['shear strength', 4, 4], ['yield strength', 5, 5], ['specific heat', 4, 4], ['hysteresis', 5, 5], ['magnetism', 2, 4], ['abrasion resistance', 5, 5],
  ],

  science_experiments_for_kids: [
    ['baking soda volcano', 1, 1], ['slime', 1, 1], ['lava lamp', 2, 2], ['invisible ink', 2, 2], ['growing crystals', 2, 2, { al: [['crystal garden', 'synonym', 3, 3]] }], ['egg drop', 2, 2],
    ['elephant toothpaste', 3, 2], ['static balloon', 2, 2], ['magnet', 1, 2, { g: 'physics' }], ['dancing raisins', 3, 2], ['milk and food coloring', 3, 3, { al: [['magic milk', 'synonym', 3, 2]] }],
    ['Mentos geyser', 2, 2], ['homemade compass', 3, 3], ['bean in a bag', 3, 3], ['density tower', 3, 3], ['rock candy', 2, 3],
    ['cloud in a jar', 3, 3], ['tornado in a bottle', 3, 3], ['lemon battery', 3, 3], ['potato battery', 3, 3], ['balloon rocket', 3, 3], ['pepper and soap', 3, 3],
    ['walking water', 3, 3], ['sink or float', 2, 2], ['solar oven', 3, 3], ['oobleck', 3, 2], ['seed germination', 3, 3], ['vinegar and baking soda', 2, 2],
    ['bubble solution', 2, 3], ['paper chromatography', 4, 4], ['rainbow in a glass', 3, 3], ['catapult', 2, 4],
  ],
};

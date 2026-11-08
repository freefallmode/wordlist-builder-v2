// Easy everyday themes, list 5: things you do in the bath, people at school / a hospital / an airport, at the doctor, art supplies, opposites.
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const adj = (o = {}) => ({ pos: 'adjective', ...o });

export const THEMES = {
  things_you_do_in_the_bath: { pop: 2, ident: 3 },
  people_at_school: { pop: 1, ident: 2 },
  people_at_a_hospital: { pop: 2, ident: 2 },
  people_at_an_airport: { pop: 2, ident: 2 },
  at_the_doctor: { pop: 2, ident: 2 },
  art_supplies: { pop: 1, ident: 2 },
  opposites: { pop: 2, ident: 4 },
};

export const DATA = {
  // ---------------------------------------------------------------- things you do in the bath
  things_you_do_in_the_bath: [
    ['wash', 1, 1, verb({ g: 'cleaning' })], ['splash', 1, 1, verb({ g: 'water' })], ['soak', 1, 1], ['shampoo', 1, 2], ['rinse', 1, 1], ['scrub', 1, 1],
    ['relax', 1, 1, verb()], ['sing', 1, 2], ['play', 1, 1, verb({ g: 'have fun' })], ['float', 1, 2, verb({ g: 'swimming' })],
    ['blow bubbles', 1, 1, verb({ type: 'phrase' })], ['lather', 2, 2], ['shave', 1, 3, verb({ g: 'hair removal' })], ['read', 1, 3], ['sit', 1, 3],
    ['lie', 1, 3, verb({ g: 'recline' })], ['unwind', 2, 2, verb()], ['kick', 1, 3], ['pour', 1, 3], ['wallow', 3, 3, verb()],
  ],

  // ---------------------------------------------------------------- people at school
  people_at_school: [
    ['teacher', 1, 1], ['student', 1, 1], ['pupil', 1, 1, { g: 'student' }], ['principal', 1, 1, { g: 'school' }], ['janitor', 1, 2], ['librarian', 1, 1],
    ['lunch lady', 1, 2], ['coach', 1, 2, { g: 'sports' }], ['classmate', 1, 1], ['counselor', 2, 2, { al: [['counsellor', 'spelling', 2, 2, ['UK']]] }],
    ['secretary', 2, 2, { g: 'office' }], ['teaching assistant', 2, 2], ['bus driver', 1, 2], ['crossing guard', 2, 2], ['tutor', 2, 3],
    ['prefect', 3, 3], ['nurse', 1, 3, { g: 'health worker' }], ['headmaster', 2, 2], ['headmistress', 2, 2], ['class president', 2, 3, { type: 'phrase' }],
    ['lab technician', 3, 4],
  ],

  // ---------------------------------------------------------------- people at a hospital
  people_at_a_hospital: [
    ['doctor', 1, 1], ['nurse', 1, 1, { g: 'health worker' }], ['surgeon', 1, 1], ['patient', 1, 1, { g: 'person' }], ['paramedic', 2, 2], ['receptionist', 2, 2],
    ['orderly', 3, 2], ['porter', 3, 2, { g: 'hospital' }], ['midwife', 2, 2, { g: 'birth attendant' }], ['pharmacist', 2, 3], ['anaesthetist', 3, 3],
    ['radiologist', 3, 3], ['cardiologist', 3, 3], ['pediatrician', 2, 3], ['matron', 3, 3], ['consultant', 3, 3], ['intern', 2, 3], ['resident', 3, 3, { g: 'doctor' }],
    ['visitor', 1, 2], ['cleaner', 1, 3], ['chaplain', 3, 3], ['dietitian', 3, 3], ['physical therapist', 3, 3], ['volunteer', 2, 3], ['lab technician', 3, 4],
    ['security guard', 1, 4],
  ],

  // ---------------------------------------------------------------- people at an airport
  people_at_an_airport: [
    ['pilot', 1, 1, { g: 'aircraft' }], ['flight attendant', 1, 1], ['passenger', 1, 1, { g: 'traveler' }], ['baggage handler', 2, 1], ['security guard', 1, 2],
    ['customs officer', 2, 1], ['co-pilot', 2, 2], ['air traffic controller', 2, 2], ['check-in agent', 2, 2], ['gate agent', 2, 2], ['tourist', 1, 3, { g: 'sightseer' }],
    ['traveler', 1, 2, { al: [['traveller', 'spelling', 1, 2, ['UK'], { g: 'traveler' }]] }], ['mechanic', 2, 3], ['cleaner', 1, 3], ['ground crew', 3, 2], ['refueler', 4, 3],
    ['immigration officer', 2, 2], ['skycap', 4, 4, { reg: ['US'] }], ['captain', 1, 2, { g: 'crew' }], ['stewardess', 2, 2],
  ],

  // ---------------------------------------------------------------- at the doctor
  at_the_doctor: [
    ['stethoscope', 1, 1], ['thermometer', 1, 1], ['prescription', 2, 1], ['appointment', 1, 2], ['waiting room', 1, 1], ['injection', 1, 2], ['checkup', 1, 1],
    ['blood pressure', 2, 2], ['bandage', 1, 2], ['syringe', 2, 2], ['needle', 1, 2, { g: 'hypodermic' }], ['x-ray', 1, 2, { g: 'medical' }], ['vaccine', 1, 2],
    ['shot', 1, 1, { g: 'vaccine' }], ['clipboard', 2, 3], ['reflex hammer', 3, 2], ['otoscope', 3, 3], ['diagnosis', 2, 3], ['referral', 3, 3], ['exam table', 3, 2],
    ['tongue depressor', 3, 3], ['eye chart', 2, 3], ['swab', 2, 3, { g: 'medical' }], ['scale', 1, 3, { g: 'weighing' }], ['sticker', 1, 3], ['receptionist', 2, 2],
    ['nurse', 1, 2, { g: 'health worker' }], ['cuff', 3, 3, { g: 'blood pressure' }], ['gown', 2, 2, { g: 'patient' }], ['medicine', 1, 2], ['pill', 1, 2],
    ['blood test', 2, 2], ['symptoms', 2, 3],
  ],

  // ---------------------------------------------------------------- art supplies
  art_supplies: [
    ['paintbrush', 1, 1], ['paint', 1, 1, { g: 'pigment' }], ['canvas', 1, 1, { g: 'painting surface' }], ['crayon', 1, 1], ['easel', 1, 1], ['clay', 1, 1, { g: 'modeling' }],
    ['glue', 1, 1], ['scissors', 1, 1], ['pencil', 1, 1, { g: 'writing tool' }], ['marker', 1, 1, { g: 'pen' }], ['chalk', 1, 2, { g: 'for writing' }],
    ['paper', 1, 1, { g: 'sheet' }], ['sketchbook', 2, 2], ['palette', 2, 2, { g: 'art' }], ['charcoal', 2, 2, { g: 'drawing' }], ['watercolor', 1, 2],
    ['pastel', 2, 3, { g: 'art' }], ['ruler', 1, 3, { g: 'measuring tool' }], ['eraser', 1, 2], ['glitter', 1, 2], ['tape', 1, 3, { g: 'sticky' }], ['sequins', 2, 3],
    ['googly eyes', 2, 3], ['colored pencil', 1, 2], ['felt tip', 2, 2], ['smock', 3, 3], ['stencil', 3, 3, { g: 'template' }], ['ink', 2, 3, { g: 'writing fluid' }],
    ['acrylic', 3, 3, { g: 'paint' }], ['yarn', 1, 3], ['cardboard', 1, 3], ['pipe cleaner', 2, 3], ['pom-pom', 2, 3, { g: 'fluffy ball' }], ['sticker', 1, 3],
    ['bead', 2, 3], ['apron', 2, 3, { g: 'clothing' }], ['brush', 1, 1, { g: 'painting' }],
  ],

  // ---------------------------------------------------------------- opposites
  opposites: [
    ['hot', 1, 1, adj({ g: 'high temperature' })], ['cold', 1, 1, adj({ g: 'temperature' })], ['big', 1, 1], ['small', 1, 1], ['large', 1, 2], ['little', 1, 2, { g: 'small' }],
    ['up', 1, 1], ['down', 1, 1, { g: 'direction' }], ['happy', 1, 1, { g: 'glad' }], ['sad', 1, 1],
    ['open', 1, 1, adj()], ['closed', 1, 1, adj()], ['fast', 1, 1], ['slow', 1, 1], ['old', 1, 1], ['young', 1, 1, adj()], ['new', 1, 1, { g: 'recent' }],
    ['day', 1, 1], ['night', 1, 1, { g: 'time' }], ['good', 1, 1, adj()], ['bad', 1, 1, adj()], ['hard', 1, 2, { g: 'texture' }], ['soft', 1, 2, { g: 'texture' }],
    ['wet', 1, 2, { g: 'not dry' }], ['dry', 1, 2, adj({ g: 'no water' })], ['empty', 1, 1], ['full', 1, 1, adj({ g: 'not empty' })],
    ['heavy', 1, 2, adj()], ['light', 1, 2, adj({ g: 'not heavy' })], ['loud', 1, 2], ['quiet', 1, 2, { g: 'silent' }], ['clean', 1, 2, { g: 'tidy' }], ['dirty', 1, 2],
    ['left', 1, 2, { g: 'direction' }], ['right', 1, 2, { g: 'direction' }], ['in', 1, 2, { g: 'preposition' }], ['out', 1, 2, { pos: 'other' }],
    ['black', 1, 1, { g: 'color' }], ['white', 1, 1, { g: 'color' }], ['rich', 1, 2], ['poor', 1, 2], ['strong', 1, 2, adj()], ['weak', 1, 2],
    ['early', 1, 2], ['late', 1, 2, adj()], ['near', 1, 2, adj()], ['far', 1, 2, adj()], ['first', 1, 2, { g: 'ordinal' }], ['last', 1, 2, adj({ g: 'final' })],
    ['always', 2, 3, { pos: 'adverb' }], ['never', 1, 2], ['yes', 1, 1, { g: 'word' }], ['no', 1, 1], ['push', 1, 2, { g: 'force' }], ['pull', 1, 2, { g: 'force' }],
    ['buy', 1, 2, verb()], ['sell', 1, 2], ['win', 1, 2, verb()], ['lose', 1, 2, verb()], ['love', 1, 2, { g: 'emotion' }], ['hate', 1, 2, verb()],
    ['laugh', 1, 2], ['cry', 1, 2], ['hello', 1, 2], ['goodbye', 1, 2], ['true', 1, 2], ['false', 1, 2, adj()], ['easy', 1, 2, adj()], ['difficult', 1, 2, adj()],
    ['sweet', 1, 2, { g: 'taste' }], ['sour', 1, 2, { g: 'taste' }], ['rough', 2, 3, { g: 'texture' }], ['smooth', 2, 3, { g: 'not rough' }],
    ['north', 1, 2, { g: 'compass direction' }], ['south', 1, 2], ['inside', 1, 2, { pos: 'other' }], ['outside', 1, 2, { pos: 'other' }],
    ['above', 2, 3, { g: 'preposition' }], ['below', 2, 3, { g: 'preposition' }], ['dark', 1, 2, { g: 'unlit' }], ['bright', 1, 2],
    ['wide', 2, 3, adj({ g: 'broad' })], ['narrow', 2, 3, adj()], ['deep', 2, 3, adj()], ['shallow', 2, 3, adj()], ['cheap', 1, 3, adj()], ['expensive', 1, 3, adj()],
    ['awake', 2, 3], ['asleep', 2, 3, adj()], ['alive', 2, 3, adj()], ['dead', 2, 3, adj({ g: 'not alive' })], ['thin', 2, 3, adj({ g: 'slim' })], ['thick', 2, 3, adj()],
  ],
};

export const ALIASES = [
  ['people_at_a_hospital', 'doctor', '', [['physician', 'synonym', 2, 2]]],
  ['art_supplies', 'eraser', '', [['rubber', 'regional', 2, 2, ['UK'], { g: 'eraser' }]]],
];

export const FIXES = [];

export const GROUPS = [
  ['things_you_do_in_the_bath', 'relax', 'unwind'],
  ['people_at_school', 'student', 'pupil|student'],
  ['people_at_school', 'principal|school', 'headmaster', 'headmistress'],
  ['people_at_a_hospital', 'orderly', 'porter|hospital'],
  ['people_at_an_airport', 'flight attendant', 'stewardess'],
  ['at_the_doctor', 'injection', 'shot|vaccine'],
  ['art_supplies', 'paintbrush', 'brush|painting'],
  ['art_supplies', 'marker|pen', 'felt tip'],
  ['opposites', 'big', 'large'],
  ['opposites', 'small', 'little|small'],
];

// Easy everyday themes, chunk 4: land / water / air vehicles, things you do with hands / eyes / mouth / feet, ways to move, at school, at the beach.
// Run: node tools/apply-words.mjs tools/gen/easy/easy-4.mjs [library file]
const V = (o = {}) => ({ pos: 'verb', ...o });
const P = (o = {}) => ({ pos: 'verb', type: 'phrase', ...o });
export const THEMES = {
  land_vehicles: { pop: 1, ident: 1 },
  water_vehicles: { pop: 2, ident: 1 },
  air_vehicles: { pop: 2, ident: 2 },
  things_you_do_with_your_hands: { pop: 2, ident: 3 },
  things_you_do_with_your_eyes: { pop: 2, ident: 2 },
  things_you_do_with_your_mouth: { pop: 2, ident: 3 },
  things_you_do_with_your_feet: { pop: 2, ident: 3 },
  ways_to_move: { pop: 2, ident: 3 },
  things_you_do_at_school: { pop: 1, ident: 2 },
  things_you_do_at_the_beach: { pop: 1, ident: 2 },
};
export const ALIASES = [
  ['things_you_do_at_school', 'color in', '', [['colour in', 'spelling', 2, 2, ['UK']]]],
];
export const DATA = {
  land_vehicles: [
    ['car', 1, 1, { g: 'automobile' }], ['bus', 1, 1, { g: 'public vehicle' }], ['truck', 1, 1, { g: 'vehicle' }], ['lorry', 2, 2, { reg: ['UK'] }], ['bicycle', 1, 1], ['bike', 1, 1],
    ['train', 1, 1, { g: 'vehicle' }], ['motorcycle', 1, 1], ['tractor', 1, 1], ['van', 1, 2, { g: 'vehicle' }], ['taxi', 1, 2], ['scooter', 1, 2], ['streetcar', 2, 2],
    ['ambulance', 1, 2], ['fire truck', 1, 2], ['police car', 1, 2], ['dump truck', 1, 2], ['garbage truck', 1, 2], ['minibus', 2, 3], ['moped', 2, 3],
    ['go-kart', 2, 3], ['unicycle', 2, 3], ['subway', 1, 3, { g: 'train' }], ['pickup truck', 1, 2], ['monster truck', 2, 3], ['limousine', 2, 3], ['bulldozer', 2, 2],
    ['rickshaw', 3, 3], ['tuk-tuk', 3, 3], ['school bus', 1, 2, { g: 'yellow vehicle' }], ['double-decker', 3, 3], ['steam train', 2, 2], ['sports car', 1, 2], ['golf cart', 2, 3],
    ['snowmobile', 2, 3], ['ATV', 3, 3, { type: 'acronym' }], ['forklift', 2, 3], ['camper van', 2, 3], ['race car', 1, 2], ['monorail', 3, 3], ['bullet train', 2, 3],
    ['steamroller', 3, 3], ['excavator', 3, 3], ['tank', 1, 3, { g: 'military vehicle' }],
  ],
  water_vehicles: [
    ['boat', 1, 1, { g: 'vessel' }], ['ship', 1, 1], ['canoe', 1, 1], ['ferry', 1, 1], ['yacht', 1, 1, { g: 'boat' }], ['jet ski', 1, 2], ['submarine', 1, 1],
    ['kayak', 1, 1], ['raft', 1, 2], ['rowboat', 1, 1], ['sailboat', 1, 1], ['speedboat', 1, 1], ['motorboat', 2, 1], ['tugboat', 2, 2], ['cruise ship', 1, 1],
    ['lifeboat', 2, 2], ['steamboat', 2, 2], ['gondola', 2, 2, { g: 'boat' }], ['houseboat', 2, 3], ['barge', 2, 2], ['dinghy', 3, 2], ['catamaran', 3, 3],
    ['fishing boat', 1, 2], ['warship', 2, 2], ['hovercraft', 3, 4], ['trawler', 3, 3], ['tanker', 2, 3, { g: 'ship' }], ['cargo ship', 2, 2], ['pirate ship', 1, 2, { g: 'vessel' }],
    ['longship', 3, 3], ['aircraft carrier', 2, 2, { type: 'phrase' }], ['icebreaker', 3, 3], ['hydrofoil', 4, 4], ['paddle steamer', 3, 3, { type: 'phrase' }],
    ['life raft', 2, 3], ['schooner', 3, 3, { g: 'ship' }], ['galleon', 3, 3], ['narrowboat', 3, 4, { reg: ['UK'] }], ['frigate', 4, 4], ['steamship', 3, 3],
    ['container ship', 2, 3], ['paddleboard', 2, 4],
  ],
  air_vehicles: [
    ['plane', 1, 1, { g: 'aircraft' }], ['airplane', 1, 1], ['helicopter', 1, 1], ['chopper', 2, 2], ['balloon', 1, 2, { g: 'aircraft' }], ['jet', 1, 1, { g: 'aircraft' }],
    ['glider', 2, 2, { g: 'aircraft' }], ['blimp', 2, 2], ['rocket', 1, 2, { g: 'spacecraft' }], ['drone', 1, 2, { g: 'aircraft' }], ['hang glider', 2, 3],
    ['paraglider', 3, 3], ['biplane', 3, 2], ['jumbo jet', 2, 2], ['space shuttle', 2, 3], ['fighter jet', 2, 2], ['seaplane', 3, 3], ['spaceship', 1, 2],
    ['spacecraft', 2, 3], ['zeppelin', 3, 3], ['bomber', 2, 3, { g: 'aircraft' }], ['propeller plane', 2, 2], ['cargo plane', 2, 2], ['gyrocopter', 4, 4],
    ['rocket ship', 2, 3], ['ultralight', 4, 4, { g: 'aircraft' }],
  ],
  things_you_do_with_your_hands: [
    ['clap', 1, 1, V()], ['wave', 1, 1, { g: 'gesture' }], ['grab', 1, 1, { g: 'seize' }], ['wash', 1, 1, { g: 'cleaning' }], ['point', 1, 2, { g: 'gesture' }],
    ['knead', 3, 2, V()], ['tickle', 1, 2, V()], ['write', 1, 1], ['grip', 2, 2], ['hold', 1, 1, V({ g: 'grasp' })], ['throw', 1, 1, { g: 'toss' }], ['catch', 1, 1, { g: 'ball' }],
    ['push', 1, 2, { g: 'force' }], ['pull', 1, 2, { g: 'force' }], ['squeeze', 1, 2], ['pinch', 1, 2, { g: 'squeeze' }], ['rub', 1, 2], ['stir', 1, 2, { g: 'to mix' }],
    ['knock', 1, 2, { g: 'door' }], ['scratch', 1, 2, { g: 'itch' }], ['pat', 2, 2, { g: 'touch' }], ['stroke', 2, 3, { g: 'touch' }], ['draw', 1, 1, V({ g: 'sketch' })],
    ['punch', 1, 2, { g: 'hit' }], ['slap', 1, 2], ['tie', 1, 2, V({ g: 'knot' })], ['knit', 2, 2], ['sew', 2, 2, V()], ['wipe', 1, 2], ['wring', 3, 3],
    ['pour', 1, 3], ['fold', 1, 2, V({ g: 'paper' })], ['juggle', 2, 3, V({ g: 'objects' })], ['snap', 2, 2, { g: 'fingers' }], ['type', 1, 2],
  ],
  things_you_do_with_your_eyes: [
    ['look', 1, 1], ['blink', 1, 1], ['wink', 1, 1], ['stare', 1, 1], ['glance', 2, 1, { g: 'look' }], ['squint', 2, 2], ['cry', 1, 2], ['read', 1, 2],
    ['watch', 1, 1, { g: 'look' }], ['see', 1, 1], ['peek', 2, 2], ['gaze', 2, 2], ['weep', 3, 3], ['scan', 3, 3, { g: 'look' }], ['peer', 3, 3, { g: 'look' }],
    ['observe', 2, 2], ['view', 2, 3], ['spot', 2, 3, { g: 'see' }], ['notice', 2, 3],
  ],
  things_you_do_with_your_mouth: [
    ['eat', 1, 1, V()], ['talk', 1, 1, V()], ['drink', 1, 1, V()], ['sing', 1, 1], ['whistle', 1, 1, { g: 'with lips' }], ['kiss', 1, 1, { g: 'affection' }], ['yawn', 1, 1],
    ['chew', 1, 1], ['blow', 1, 1, { g: 'breathe' }], ['smile', 1, 1], ['lick', 1, 1, { g: 'tongue' }], ['swallow', 1, 2, { g: 'throat' }], ['bite', 1, 1, { g: 'chew' }],
    ['shout', 1, 2], ['yell', 1, 2], ['scream', 1, 2], ['laugh', 1, 1], ['whisper', 1, 2], ['hum', 1, 2, { g: 'noise' }], ['spit', 1, 2, { g: 'saliva' }], ['sip', 1, 2],
    ['taste', 1, 2], ['suck', 2, 2], ['gulp', 2, 2], ['munch', 2, 2], ['nibble', 2, 2, { g: 'small bite' }], ['gargle', 3, 3], ['sigh', 2, 3], ['gasp', 2, 3],
    ['pant', 2, 3], ['mumble', 2, 2], ['grin', 2, 2], ['pout', 2, 3], ['snore', 2, 3], ['giggle', 2, 2], ['chuckle', 2, 3], ['hiss', 3, 3],
  ],
  things_you_do_with_your_feet: [
    ['walk', 1, 1, { g: 'stroll' }], ['run', 1, 1, V({ g: 'move fast' })], ['kick', 1, 1], ['jump', 1, 1, V({ g: 'leap up' })], ['stomp', 1, 1, { g: 'walk' }], ['tiptoe', 1, 1],
    ['skip', 1, 1, { g: 'move' }], ['hop', 1, 1], ['dance', 1, 1], ['march', 1, 2, { g: 'walk' }], ['stumble', 2, 3], ['slide', 1, 3, { g: 'move' }], ['skate', 1, 2, { g: 'to skate' }],
    ['jog', 1, 1], ['sprint', 2, 2, { g: 'race' }], ['pedal', 2, 2, { g: 'bicycle' }], ['shuffle', 2, 2, { g: 'walk' }], ['limp', 2, 3, { g: 'walk' }], ['waddle', 2, 3],
    ['stride', 3, 3], ['leap', 2, 2, { g: 'jump' }], ['hike', 2, 2], ['ski', 1, 3, { g: 'verb' }], ['trample', 3, 3], ['wade', 3, 3], ['strut', 3, 3, { g: 'walk' }],
    ['trot', 3, 3, { g: 'gait' }], ['dash', 2, 3, { g: 'move' }],
  ],
  ways_to_move: [
    ['walk', 1, 1, { g: 'stroll' }], ['run', 1, 1, V({ g: 'move fast' })], ['hop', 1, 1], ['crawl', 1, 1, { g: 'movement' }], ['skip', 1, 1, { g: 'move' }],
    ['jump', 1, 1, V({ g: 'leap up' })], ['swim', 1, 1], ['climb', 1, 1], ['roll', 1, 1, { g: 'move' }], ['slide', 1, 2, { g: 'move' }], ['slither', 2, 2],
    ['creep', 2, 2, { g: 'move' }], ['sneak', 2, 2, V({ g: 'move quietly' })], ['tiptoe', 1, 2], ['march', 1, 2, { g: 'walk' }], ['jog', 1, 2], ['sprint', 2, 2, { g: 'race' }],
    ['dance', 1, 3], ['leap', 2, 2, { g: 'jump' }], ['wriggle', 2, 2], ['shuffle', 2, 3, { g: 'walk' }], ['limp', 2, 3, { g: 'walk' }], ['waddle', 2, 3], ['stroll', 1, 2],
    ['stagger', 3, 3], ['stumble', 2, 3], ['glide', 2, 2], ['bounce', 2, 3, { g: 'jump' }], ['spin', 2, 3, { g: 'turn' }], ['gallop', 2, 3], ['somersault', 3, 3],
    ['saunter', 3, 3], ['wander', 2, 2], ['swagger', 3, 3], ['fly', 1, 2, V({ g: 'through the air' })], ['hurry', 1, 3, V({ g: 'rush' })], ['dash', 2, 3, { g: 'move' }],
    ['trot', 2, 3, { g: 'gait' }], ['strut', 3, 3, { g: 'walk' }],
  ],
  things_you_do_at_school: [
    ['draw', 1, 1, V({ g: 'sketch' })], ['read', 1, 1], ['write', 1, 1], ['count', 1, 1, V({ g: 'numbers' })], ['sing', 1, 1], ['line up', 1, 2, P()],
    ['take a test', 1, 2, P()], ['paint', 1, 1, V({ g: 'picture' })], ['listen', 1, 1], ['add', 1, 2], ['subtract', 2, 3], ['multiply', 2, 3], ['learn', 1, 1, V()],
    ['play', 1, 1, V({ g: 'games' })], ['study', 1, 2, V()], ['sit', 1, 2], ['raise your hand', 1, 2, P()], ['answer', 1, 2, V({ g: 'question' })], ['ask', 1, 2, V()],
    ['glue', 1, 2], ['eat lunch', 1, 2, P()], ['make friends', 1, 2, P()], ['tidy up', 2, 3, P()], ['think', 1, 2, V()], ['erase', 2, 3, V()],
    ['color in', 1, 2, P({ reg: ['US'] })],
  ],
  things_you_do_at_the_beach: [
    ['swim', 1, 1], ['sunbathe', 1, 1], ['build a sandcastle', 1, 1, P()], ['paddle', 1, 2, V({ g: 'in shallow water' })], ['surf', 1, 1, { g: 'waves' }],
    ['collect shells', 1, 2, P()], ['snorkel', 2, 2, { g: 'diving' }], ['dive', 2, 2, { g: 'diving' }], ['play volleyball', 1, 2, P()], ['fly a kite', 1, 2, P()],
    ['dig', 1, 2, V({ g: 'sand' })], ['bury', 2, 3, V({ g: 'in sand' })], ['splash', 1, 2, { g: 'water' }], ['float', 1, 2, { g: 'swimming' }], ['relax', 1, 3, V()],
    ['picnic', 1, 2, { g: 'outdoor' }], ['take photos', 1, 3, P()], ['wade', 2, 2], ['walk', 1, 2, { g: 'stroll' }], ['play catch', 1, 3, P()], ['skim stones', 2, 3, P()],
    ['kayak', 1, 3], ['bodyboard', 3, 3], ['eat ice cream', 1, 2, P()], ['play frisbee', 1, 2, P()],
  ],
};
export const GROUPS = [
  ['land_vehicles', 'bicycle', 'bike'],
  ['land_vehicles', 'truck|vehicle', 'lorry'],
  ['water_vehicles', 'speedboat', 'motorboat'],
  ['air_vehicles', 'plane|aircraft', 'airplane'],
  ['air_vehicles', 'helicopter', 'chopper'],
  ['air_vehicles', 'spaceship', 'spacecraft'],
  ['things_you_do_with_your_hands', 'hold|grasp', 'grip'],
  ['things_you_do_with_your_eyes', 'cry', 'weep'],
  ['things_you_do_with_your_eyes', 'stare', 'gaze'],
  ['things_you_do_with_your_mouth', 'shout', 'yell'],
  ['things_you_do_with_your_feet', 'jump|leap up', 'leap|jump'],
  ['things_you_do_with_your_feet', 'sprint|race', 'dash|move'],
  ['ways_to_move', 'walk|stroll', 'stroll', 'saunter'],
  ['ways_to_move', 'jump|leap up', 'leap|jump'],
  ['ways_to_move', 'sneak|move quietly', 'creep|move'],
  ['ways_to_move', 'sprint|race', 'dash|move'],
  ['ways_to_move', 'strut|walk', 'swagger'],
];
// the town "Bury" had no meaning label; "bury" (a verb) now needs one beside it
export const FIXES = [{ gloss: ['Bury', 'places_that_are_also_words', 'town'] }];

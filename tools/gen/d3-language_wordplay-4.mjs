// Generated word data: Language & Wordplay (chunk 4): "words after" compounds (sun___ ... over___) and "hidden words" themes (body parts, colors, numbers, fruits, names, vehicles, trees).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
// In the "X___" themes the word is what comes after X. In the "hidden" themes the word is the longer word that contains the hidden item.
const A = { pos: 'adjective' }, V = { pos: 'verb' }, O = { pos: 'other' };
const PL = { type: 'place' };

export const THEMES = {
  sun_blank: { d: 1 }, sea_blank: { d: 1 }, star_blank: { d: 2 }, rain_blank: { d: 1 }, snow_blank: { d: 1 }, head_blank: { d: 2 }, back_blank: { d: 2 },
  foot_blank: { d: 2 }, hand_blank: { d: 2 }, water_blank: { d: 2 }, black_blank: { d: 2 }, home_blank: { d: 3 }, key_blank: { d: 3 }, air_blank: { d: 3 },
  ice_blank: { d: 1 }, moon_blank: { d: 2 }, paper_blank: { d: 2 }, door_blank: { d: 2 }, blue_blank: { d: 2 }, sand_blank: { d: 3 }, eye_blank: { d: 3 },
  life_blank: { d: 3 }, over_blank: { d: 4 },
  hidden_body_parts: { d: 3 }, hidden_colors: { d: 4 }, hidden_numbers: { d: 3 }, hidden_fruits: { d: 4 }, hidden_names: { d: 5 }, hidden_vehicles: { d: 4 }, hidden_trees: { d: 5 },
};

export const FIXES = [];
export const ALIASES = [];

export const DATA = {
  sun_blank: [
    ['flower', 1, 1], ['shine', 1, 1], ['glasses', 1, 1], ['burn', 1, 1], ['screen', 1, 2, { g: 'shield' }], ['light', 1, 2], ['rise', 1, 2], ['set', 1, 2, { g: 'sinking' }], ['day', 1, 3],
    ['stroke', 2, 3, { g: 'heat' }], ['block', 1, 2], ['bed', 1, 3], ['dress', 1, 2], ['hat', 1, 2], ['down', 1, 3], ['tan', 1, 2, { g: 'skin' }], ['bathe', 2, 2, V], ['lamp', 1, 3], ['cream', 1, 2, { g: 'lotion' }],
    ['dial', 2, 3], ['roof', 2, 3], ['beam', 2, 3, { g: 'light ray' }], ['spot', 1, 3], ['fish', 1, 4], ['kissed', 2, 3, A], ['dried', 2, 3, A], ['trap', 2, 3], ['deck', 2, 3], ['lounger', 3, 2],
    ['room', 1, 3], ['shade', 2, 3], ['flare', 2, 3], ['bonnet', 3, 3, { g: 'hat' }], ['bird', 1, 4], ['dew', 4, 4], ['belt', 2, 4], ['seeker', 3, 4], ['bear', 1, 4, { g: 'animal' }], 
  ],
  sea_blank: [
    ['horse', 1, 1], ['shell', 1, 1], ['weed', 1, 1], ['side', 1, 1], ['shore', 1, 2], ['gull', 1, 2], ['food', 1, 2], ['sick', 1, 2, A], ['bed', 1, 3], ['level', 1, 2, { g: 'height' }],
    ['lion', 1, 2], ['urchin', 3, 3], ['water', 1, 2], ['front', 1, 2], ['port', 2, 3, { g: 'harbor' }], ['plane', 2, 3, { g: 'aircraft' }], ['wall', 2, 3], ['breeze', 2, 2], ['salt', 1, 3], ['cucumber', 3, 3],
    ['serpent', 3, 3, { g: 'snake' }], ['bird', 1, 3], ['wolf', 2, 3], ['mist', 3, 3], ['scape', 4, 4], ['bass', 2, 3, { g: 'fish' }], ['eagle', 2, 3], ['anemone', 3, 3, { g: 'sea creature' }], ['otter', 2, 3], ['snake', 2, 3],
    ['worthy', 3, 4, A], ['faring', 3, 4, A], ['board', 2, 4], ['shanty', 3, 3], ['man', 1, 4], ['captain', 2, 4], ['legs', 2, 4], ['power', 2, 4], ['dog', 2, 4],
  ],
  star_blank: [
    ['fish', 1, 1], ['light', 1, 1], ['dust', 1, 2], ['board', 3, 3], ['ship', 1, 2], ['gazer', 3, 2], ['struck', 2, 3, A], ['burst', 2, 3], 
    ['fruit', 2, 3], ['anise', 3, 3], ['fighter', 1, 3], ['sign', 2, 3], ['gate', 1, 3, { g: 'portal' }], ['spangled', 3, 3, A], ['crossed', 3, 3, A], ['studded', 3, 3, A],
    ['bright', 2, 3, A], ['lit', 2, 3, A], ['turn', 2, 4], ['quality', 2, 4], ['system', 2, 4], ['player', 2, 3], ['gaze', 3, 3, V], ['chart', 3, 4], ['cluster', 2, 4],
    ['wort', 5, 5], ['thistle', 4, 4],
  ],
  rain_blank: [
    ['bow', 1, 1], ['coat', 1, 1], ['drop', 1, 1], ['forest', 1, 1], ['fall', 1, 2], ['storm', 1, 2], ['water', 1, 2], ['proof', 1, 3, { ...A, g: 'resistant' }], ['check', 2, 3], ['dance', 2, 3],
    ['maker', 3, 3], ['cloud', 1, 2, { g: 'weather' }], ['gauge', 2, 3, { g: 'instrument' }], ['barrel', 2, 3], ['hat', 1, 3], ['wear', 3, 3], ['bird', 3, 4], ['tree', 3, 3], ['day', 1, 3], ['shadow', 3, 3],
    ['delay', 3, 3], ['shower', 2, 4, { g: 'rain' }], ['cape', 3, 4, { g: 'clothing' }], ['spout', 3, 4], ['band', 3, 4], ['boots', 1, 4], ['mac', 3, 4, { g: 'raincoat' }], ['god', 3, 4],
  ],
  snow_blank: [
    ['man', 1, 1], ['flake', 1, 1], ['ball', 1, 1], ['board', 1, 1], ['drift', 2, 2], ['storm', 1, 2], ['fall', 1, 2], ['plow', 3, 3], ['shoe', 2, 2], ['mobile', 2, 2, { g: 'vehicle' }],
    ['bound', 3, 3, A], ['cap', 2, 3], ['drop', 3, 3], ['suit', 2, 2, { g: 'clothing' }], ['white', 2, 2, A], ['globe', 2, 2, { g: 'souvenir' }], ['line', 3, 3], ['leopard', 2, 3], ['owl', 2, 3],
    ['blind', 3, 3, A], ['bank', 3, 3, { g: 'mound' }], ['goose', 3, 3], ['field', 3, 3], ['melt', 3, 3], ['pea', 3, 4], ['bunting', 4, 4], ['day', 1, 3], ['cone', 2, 3],
    ['pack', 3, 4], ['capped', 3, 4, A], ['shovel', 2, 3], ['fort', 2, 3],
  ],
  head_blank: [
    ['ache', 1, 1], ['line', 1, 1], ['phone', 1, 1], ['quarters', 2, 1], ['band', 1, 2], ['board', 2, 3], ['lights', 1, 2], ['stone', 2, 2, { g: 'rock' }], ['strong', 2, 3, A], ['first', 2, 3, A],
    ['long', 2, 4, A], ['way', 2, 3], ['set', 2, 3, { g: 'equipment' }], ['master', 2, 2], ['rest', 2, 2, { g: 'support' }], ['count', 2, 3], ['hunter', 2, 3], ['dress', 2, 3], ['gear', 2, 3, { g: 'equipment' }], ['lamp', 2, 2],
    ['land', 2, 3], ['scarf', 2, 3], ['start', 2, 3], ['wind', 2, 3, { g: 'weather' }], ['room', 2, 3], ['butt', 3, 3, V], ['teacher', 1, 2], ['boy', 3, 3], ['lock', 3, 3],
    ['stand', 2, 3], ['piece', 3, 4], ['space', 3, 3], ['shot', 2, 3, { g: 'photo' }], ['waiter', 3, 3], ['mistress', 3, 3], ['gasket', 4, 4], 
  ],
  back_blank: [
    ['pack', 1, 1], ['yard', 1, 1], ['bone', 1, 1], ['fire', 1, 1, V], ['ground', 1, 2], ['bench', 2, 3], ['door', 1, 2], ['stage', 2, 3], ['hand', 2, 3],
    ['lash', 3, 3], ['log', 2, 3], ['side', 3, 3], ['stroke', 2, 3, { g: 'swim' }], ['ward', 3, 3, A], ['water', 3, 3], ['up', 1, 2], ['drop', 2, 3], ['pedal', 3, 3, V], ['seat', 1, 3],
    ['slash', 3, 3], ['space', 2, 3], ['stab', 3, 3, V], ['talk', 3, 3], ['flip', 3, 3], ['gammon', 3, 3], ['burner', 3, 3], ['room', 2, 3], ['street', 3, 3], ['lit', 3, 3, A],
    ['cloth', 3, 4], ['rest', 2, 3, { g: 'support' }], ['bite', 3, 4, V], ['breaking', 3, 4, { ...A, g: 'exhausting' }], ['handed', 3, 4, A], ['pay', 3, 4], ['story', 2, 4], ['country', 3, 4],
  ],
  foot_blank: [
    ['ball', 1, 1], ['print', 1, 1, { g: 'mark' }], ['step', 1, 1, { g: 'pace' }], ['note', 2, 2, { g: 'comment' }], ['path', 1, 2, { g: 'trail' }], ['hold', 2, 3], ['wear', 2, 2], ['bridge', 1, 2, { g: 'structure' }], ['fall', 2, 3], ['age', 3, 3],
    ['lights', 2, 3], ['loose', 3, 3, A], ['man', 2, 3], ['stool', 2, 3], ['work', 3, 3], ['rest', 2, 3, { g: 'support' }], ['sore', 3, 3, A], ['brake', 2, 3], ['hill', 3, 4], ['locker', 3, 3],
    ['board', 3, 4], ['soldier', 2, 3], ['bath', 2, 3], ['fault', 3, 3], ['hills', 3, 4], ['plate', 4, 4], ['pump', 2, 3, { g: 'machine' }], ['spa', 3, 4], ['long', 3, 4],
  ],
  hand_blank: [
    ['bag', 1, 1], ['shake', 1, 1], ['cuff', 2, 2], ['writing', 1, 2, { g: 'script' }], ['book', 2, 2], ['ball', 1, 2], ['brake', 1, 2], ['made', 1, 2, A], ['rail', 2, 2], ['set', 2, 3, { g: 'equipment' }],
    ['some', 2, 3, A], ['stand', 2, 2], ['out', 2, 2], ['over', 2, 3, V], ['gun', 2, 2], ['kerchief', 4, 3], ['maid', 3, 3], ['picked', 3, 3, A], ['held', 2, 2, A],
    ['saw', 2, 3], ['spring', 2, 3, { g: 'gymnastics' }], ['print', 2, 3, { g: 'mark' }], ['cream', 1, 3, { g: 'lotion' }], ['towel', 1, 3], ['grenade', 2, 2], ['luggage', 2, 3], ['signal', 3, 3, { g: 'gesture' }], ['craft', 3, 3], ['hold', 3, 4],
    ['sanitizer', 3, 3], ['basin', 3, 4], ['stitch', 4, 4], ['wash', 2, 3], ['puppet', 2, 3],
  ],
  water_blank: [
    ['fall', 1, 1], ['melon', 1, 1], ['proof', 1, 2, { ...A, g: 'resistant' }], ['color', 1, 2], ['front', 2, 3], ['mark', 3, 3], ['mill', 2, 3, { g: 'building' }], ['bed', 2, 3], ['bottle', 1, 2], ['pistol', 2, 2],
    ['cress', 3, 3], ['way', 2, 3], ['works', 3, 3], ['line', 2, 3], ['wheel', 2, 3], ['logged', 3, 3, A], ['tight', 3, 3, A], ['polo', 1, 3, { g: 'sport' }], ['park', 1, 2], ['skiing', 2, 2],
    ['tower', 2, 3], ['lily', 2, 2], ['buffalo', 2, 3, { g: 'bison' }], ['slide', 1, 2, { g: 'playground' }], ['board', 4, 4], ['level', 2, 3, { g: 'height' }], ['vole', 4, 4], ['snake', 3, 3],
    ['course', 2, 3], ['supply', 3, 3], ['sports', 1, 2], ['boarding', 2, 2], 
  ],
  black_blank: [
    ['board', 1, 1], ['bird', 1, 1], ['smith', 2, 2], ['mail', 2, 2], ['berry', 1, 2], ['out', 2, 2], ['jack', 2, 2], ['list', 2, 2], ['hole', 1, 1],
    ['belt', 1, 2], ['market', 2, 2], ['sheep', 1, 2], ['bear', 1, 2, { g: 'animal' }], ['cat', 1, 2], ['widow', 2, 3], ['magic', 2, 2], ['top', 3, 3], ['box', 1, 2],
    ['pepper', 1, 2, { g: 'spice' }], ['ice', 3, 3], ['forest', 2, 2], ['mamba', 3, 3, { g: 'snake' }], ['adder', 3, 3, { g: 'animal' }], ['beard', 2, 3], ['spot', 2, 3], ['tie', 2, 3, { g: 'neckwear' }],
    ['comedy', 3, 3, { g: 'literature' }], ['eye', 1, 2], ['hawk', 2, 3], ['thorn', 3, 3], ['humor', 3, 3], ['sea', 1, 3], ['friday', 2, 3], ['panther', 2, 2], ['swan', 2, 3],
  ],
  home_blank: [
    ['work', 1, 1], ['land', 2, 2], ['sick', 2, 2, A], ['town', 2, 2], ['page', 1, 2], ['made', 1, 2, A], ['stead', 4, 3], ['coming', 2, 2], ['run', 1, 2], ['grown', 2, 3, A],
    ['maker', 3, 3], ['owner', 2, 3], ['school', 2, 2, V], ['less', 2, 3, A], ['ward', 3, 3, A], ['boy', 3, 3], ['brew', 2, 2, { g: 'beer' }], ['front', 2, 3], ['base', 2, 3], ['plate', 2, 2],
    ['spun', 3, 3, A], ['stretch', 3, 3], ['wrecker', 3, 3], ['office', 2, 2], ['rule', 3, 3], ['bound', 3, 3, A], ['body', 3, 4], ['buyer', 3, 3], ['stay', 3, 3], ['cooked', 3, 3, A],
    ['girl', 3, 3], ['screen', 2, 2, { g: 'display' }], ['sweet', 3, 4], ['team', 3, 3], ['loan', 3, 3], ['economics', 3, 3], ['straight', 3, 4],
  ],
  key_blank: [
    ['board', 1, 1], ['hole', 1, 1], ['chain', 1, 1], ['ring', 1, 1, { g: 'loop' }], ['stone', 2, 3, { g: 'rock' }], ['note', 2, 2, { g: 'theme' }], ['pad', 2, 2], ['word', 2, 2], ['card', 1, 2], ['stroke', 2, 3, { g: 'keypress' }],
    ['lime', 2, 3, { g: 'fruit' }], ['fob', 3, 3], ['worker', 3, 3], ['signature', 3, 3], ['frame', 3, 3, { g: 'animation' }], ['logger', 3, 3], ['less', 3, 3, A], ['grip', 4, 4], ['change', 3, 3], ['stage', 3, 4],
    ['light', 3, 4], ['player', 3, 4], ['smash', 4, 4], ['cutter', 3, 4], ['lock', 3, 4], ['account', 3, 4],
  ],
  air_blank: [
    ['plane', 1, 1, { g: 'aircraft' }], ['port', 1, 1, { g: 'harbor' }], ['craft', 2, 2], ['line', 1, 2], ['bag', 1, 2], ['bus', 2, 2], ['force', 1, 1], ['mail', 1, 2], ['lift', 2, 2], ['ship', 2, 2],
    ['strip', 2, 2], ['tight', 2, 3, A], ['brush', 2, 2, { g: 'painting' }], ['bed', 2, 2], ['conditioner', 1, 2, { g: 'cooling' }], ['field', 2, 3], ['fare', 2, 3, { g: 'transport' }], ['lock', 2, 3], ['space', 1, 2],
    ['way', 2, 3], ['borne', 3, 3, A], ['raid', 1, 2], ['show', 1, 2, { g: 'display' }], ['time', 3, 3], ['hostess', 2, 3], ['freshener', 3, 3], ['guitar', 1, 2], ['pocket', 2, 3],
    ['pump', 2, 3, { g: 'machine' }], ['gun', 1, 2], ['quality', 2, 3], ['sick', 3, 3, A], ['traffic', 2, 3], ['mattress', 2, 3], ['miles', 2, 3], ['fryer', 2, 3], ['drop', 2, 3], ['dry', 2, 3, V],
  ],
  ice_blank: [
    ['cream', 1, 1, { g: 'dairy' }], ['berg', 3, 1], ['cube', 1, 1], ['skate', 1, 2, { g: 'footwear' }], ['pack', 1, 2], ['age', 1, 1], ['cap', 1, 2], ['pick', 2, 2], ['box', 1, 3], ['rink', 1, 2],
    ['hockey', 1, 2], ['storm', 1, 2], ['sheet', 2, 3, { g: 'glacier' }], ['floe', 4, 3], ['lolly', 2, 2, { reg: ['UK'] }], ['bucket', 1, 2], ['breaker', 2, 2], ['axe', 2, 3], ['maiden', 2, 3], ['queen', 2, 3],
    ['tea', 1, 2], ['water', 1, 2], ['fishing', 2, 2], ['fall', 3, 3], ['bath', 1, 2], ['field', 3, 3], ['shelf', 3, 3], ['dance', 2, 3], ['sculpture', 2, 3], ['man', 2, 3],
    ['wine', 4, 4], ['pop', 2, 3, { g: 'frozen' }], ['melt', 3, 4], ['road', 3, 4], ['dancer', 2, 3], ['coffee', 1, 2],
  ],
  moon_blank: [
    ['light', 1, 1], ['shine', 1, 1], ['walk', 1, 1, V], ['beam', 1, 1, { g: 'light ray' }], ['stone', 2, 2, { g: 'rock' }], ['struck', 2, 3, A], ['shot', 2, 3, { g: 'launch' }], ['rise', 2, 3], ['landing', 1, 2, { g: 'touchdown' }], ['dust', 2, 3],
    ['cake', 2, 3], ['flower', 2, 3], ['raker', 4, 4], ['lit', 2, 3, A], ['face', 2, 3], ['child', 3, 3], ['boot', 2, 2, { g: 'footwear' }], ['buggy', 3, 3, { g: 'vehicle' }], ['fish', 3, 3], ['scape', 4, 4],
    ['set', 2, 3, { g: 'sinking' }], ['base', 2, 3], ['river', 2, 3], ['wort', 5, 5], ['phase', 2, 3], ['roof', 4, 4], ['lighting', 2, 3], ['quake', 3, 3], ['cycle', 3, 4], ['dance', 3, 4],
    ['pie', 2, 3], ['cup', 3, 4], ['jelly', 3, 4],
  ],
  paper_blank: [
    ['back', 1, 1], ['clip', 1, 1], ['weight', 1, 2], ['work', 1, 2], ['boy', 2, 2], ['plane', 1, 1, { g: 'aircraft' }], ['towel', 1, 1], ['trail', 2, 3], ['cut', 1, 2, { g: 'wound' }], ['chase', 3, 3],
    ['bag', 1, 2], ['mill', 2, 3, { g: 'building' }], ['pusher', 3, 4], ['lace', 4, 4], ['round', 2, 3], ['knife', 2, 3], ['doll', 2, 3], ['tiger', 2, 3], ['thin', 2, 3, A], ['money', 2, 3], ['tray', 2, 3], ['cup', 1, 2],
    ['shredder', 2, 3], ['napkin', 1, 2], ['jam', 2, 3], ['lantern', 2, 3], ['route', 2, 3, { g: 'delivery' }], ['wasp', 3, 3], ['boat', 1, 2], ['hat', 1, 3], ['crane', 2, 3, { g: 'origami' }], ['chain', 1, 2],
    ['cutter', 3, 3], 
  ],
  door_blank: [
    ['bell', 1, 1, { g: 'chime' }], ['step', 1, 1, { g: 'threshold' }], ['mat', 1, 1], ['knob', 1, 1], ['way', 1, 2], ['stop', 1, 2], ['frame', 2, 2, { g: 'structure' }], ['handle', 1, 2], ['man', 2, 2], ['post', 3, 3],
    ['nail', 3, 3], ['jamb', 5, 5], ['knocker', 2, 2], ['stopper', 2, 3], ['prize', 3, 3], ['hinge', 2, 3], ['lock', 2, 3], ['chain', 2, 3],
    ['staff', 3, 3, { g: 'security' }], ['code', 3, 4, { g: 'entry' }], ['sill', 4, 4], ['plate', 3, 4], ['curtain', 3, 4], ['wedge', 3, 4], ['buster', 4, 4], ['opener', 2, 3],
  ],
  blue_blank: [
    ['berry', 1, 1], ['bird', 1, 1], ['print', 1, 2, { g: 'plan' }], ['bell', 1, 1, { g: 'flower' }], ['grass', 1, 2], ['jay', 2, 2, { g: 'bird' }], ['bottle', 2, 2], ['collar', 2, 2, { g: 'shirt' }], ['cheese', 1, 1], ['whale', 1, 1],
    ['moon', 1, 2], ['beard', 2, 2], ['ribbon', 2, 2], ['blood', 2, 2], ['sky', 1, 2], ['stocking', 3, 3], ['tit', 2, 3], ['chip', 2, 2], ['note', 3, 3, { g: 'music' }], ['fin', 3, 3],
    ['gill', 3, 3], ['jeans', 1, 3], ['screen', 2, 3, { g: 'film' }], ['wave', 2, 3], ['monday', 2, 3], ['murder', 4, 4], ['marlin', 3, 3],
    ['shift', 3, 3], ['stone', 3, 4, { g: 'rock' }], ['lagoon', 3, 3], ['planet', 2, 3], ['hour', 3, 3], ['sea', 3, 4], ['water', 3, 4], ['yonder', 4, 4],
  ],
  sand_blank: [
    ['castle', 1, 1], ['paper', 1, 1, { g: 'material' }], ['storm', 1, 1], ['box', 1, 1], ['bag', 1, 2], ['stone', 2, 2, { g: 'rock' }], ['bar', 2, 2, { g: 'ridge' }], ['bank', 2, 3, { g: 'mound' }], ['dune', 1, 2], ['man', 2, 2],
    ['piper', 3, 3, { g: 'bird' }], ['pit', 1, 2], ['blast', 2, 3, V], ['fly', 3, 3, { g: 'insect' }], ['flea', 3, 3], ['trap', 2, 3], ['shark', 3, 3], ['eel', 3, 4], ['lizard', 3, 3], ['wedge', 3, 3],
    ['hopper', 4, 4], ['worm', 3, 4], ['martin', 4, 4], ['bath', 3, 4], ['bed', 3, 4], ['timer', 3, 3], ['glass', 3, 4], ['fish', 4, 4], ['bagger', 4, 4], 
  ],
  eye_blank: [
    ['ball', 1, 1], ['brow', 1, 1], ['lash', 1, 1], ['lid', 1, 1], ['sight', 2, 2], ['witness', 2, 2], ['liner', 1, 2, { g: 'makeup' }], ['shadow', 1, 2], ['sore', 2, 2], ['glass', 3, 3],
    ['patch', 1, 2, { g: 'sewing' }], ['drops', 1, 2], ['opener', 2, 3], ['candy', 2, 3], ['contact', 2, 3], ['level', 3, 3, { g: 'height' }], ['socket', 2, 2], ['tooth', 3, 3], ['strain', 2, 3, { g: 'fatigue' }], ['wash', 3, 3],
    ['wear', 3, 3], ['catching', 3, 3, A], ['popping', 3, 3, A], ['test', 1, 3, { g: 'medical' }], ['spy', 3, 4], ['full', 3, 4], ['piece', 3, 4], ['bath', 3, 4],
    ['cup', 3, 4], ['teeth', 4, 4], 
  ],
  life_blank: [
    ['boat', 1, 1], ['guard', 1, 1, { g: 'attendant' }], ['time', 1, 1], ['style', 1, 2], ['jacket', 1, 1], ['span', 2, 2, { g: 'duration' }], ['line', 2, 2], ['long', 2, 2, A], ['like', 2, 2, A], ['less', 2, 3, A],
    ['saver', 2, 2], ['raft', 2, 2], ['support', 2, 2], ['force', 3, 3], ['cycle', 2, 3], ['size', 2, 2], ['sentence', 3, 3, { g: 'punishment' }], ['story', 2, 3], ['work', 3, 3], ['blood', 3, 3],
    ['insurance', 2, 3], ['expectancy', 3, 3], ['coach', 2, 3, { g: 'mentor' }], ['belt', 3, 3], ['form', 3, 3], ['hack', 3, 3, { g: 'tip' }], ['buoy', 3, 3], ['peer', 4, 4], ['sciences', 3, 4], ['skills', 2, 3],
    ['partner', 2, 3, { g: 'life partner' }], ['drawing', 3, 3], ['signs', 3, 4], ['sized', 3, 4, A], ['changing', 3, 3, A],
  ],
  over_blank: [
    ['coat', 1, 1], ['night', 1, 1], ['time', 1, 1], ['board', 1, 2], ['flow', 1, 1, V], ['look', 1, 2, V], ['all', 1, 3], ['come', 1, 2, V], ['due', 1, 2, A], ['draft', 2, 3],
    ['drive', 3, 3, { g: 'gear' }], ['dose', 1, 2], ['hear', 2, 3, V], ['heat', 2, 2, V], ['lap', 2, 3, V], ['load', 2, 2, { ...V, g: 'burden' }], ['pass', 1, 2], ['power', 2, 3, V],
    ['rate', 2, 3, V], ['see', 2, 3, V], ['seas', 2, 3], ['sight', 2, 3], ['throw', 2, 3, V], ['turn', 1, 2, V], ['weight', 1, 2, A], ['whelm', 4, 4, V], ['haul', 3, 3, V],
    ['hang', 2, 3], ['cast', 2, 3], ['grown', 2, 3, A], ['size', 3, 3, A], ['ride', 3, 4, { ...V, g: 'cancel' }], ['run', 2, 3, V], ['lord', 3, 3], ['kill', 3, 3],
  ],

  // ------------------------------------------------------------- hidden words (the long word that hides the item)
  hidden_body_parts: [
    ['ship', 1, 2], ['china', 1, 2], ['beard', 1, 3], ['heart', 1, 3, { g: 'organ' }], ['pearl', 2, 3], ['slip', 1, 2], ['clip', 1, 2], ['tulip', 2, 2], ['eclipse', 3, 3], ['college', 2, 3],
    ['legend', 1, 3, { g: 'story' }], ['alarm', 1, 2], ['army', 1, 2], ['charm', 1, 2], ['farm', 1, 2], ['ribbon', 1, 3], ['tribe', 2, 3], ['scribble', 3, 3], ['diagnose', 3, 3], ['machine', 1, 3],
    ['chinook', 4, 4], ['splash', 2, 3], ['flash', 1, 3], ['solid', 2, 3], ['collide', 3, 4], ['wheel', 1, 3], ['chair', 1, 3], ['basking', 3, 4, V], ['trombone', 3, 4], ['snail', 1, 3],
    ['chandelier', 3, 3], ['shandy', 3, 4], ['kneel', 2, 3, V], ['shingle', 3, 4], ['colony', 2, 4], ['gutter', 2, 3], ['browse', 2, 3, V], ['whip', 2, 3], ['delivery', 2, 4, { g: 'package' }],
  ],
  hidden_colors: [
    ['shredded', 3, 3, A], ['hundred', 1, 3], ['scared', 1, 4, A], ['credit', 1, 4], ['tango', 2, 3], ['stand', 1, 4], ['instant', 2, 4, A], ['titanic', 3, 4, A], ['stealth', 2, 3], ['steal', 1, 3, V],
    ['marigold', 3, 3], ['sublime', 3, 3, A], ['slime', 1, 3], ['blimey', 3, 4, O], ['prose', 2, 3], ['arose', 2, 3, V], ['primrose', 3, 3, { g: 'flower' }], ['plumber', 1, 3], ['plump', 2, 3, A], ['plumage', 3, 3],
    ['jaded', 3, 4, A], ['chamber', 2, 4], ['clamber', 3, 4, V], ['buffalo', 1, 4, { g: 'bison' }], ['buffet', 2, 4, { g: 'meal' }], ['buffoon', 3, 4], ['trust', 1, 4, { g: 'confidence' }], ['crust', 1, 4], ['frustrate', 3, 5, V], ['thousand', 1, 4],
    ['sandwich', 1, 3], ['message', 1, 4], ['sausage', 1, 4], ['scream', 1, 4, V], ['cyanide', 3, 3], ['greyhound', 2, 2],
  ],
  hidden_numbers: [
    ['lonely', 1, 2, A], ['often', 1, 2, A], ['money', 1, 2], ['phone', 1, 2], ['stone', 1, 2, { g: 'rock' }], ['honey', 1, 2], ['alone', 1, 2, A], ['none', 1, 3, O], ['weight', 1, 2], ['freight', 2, 3],
    ['height', 1, 3], ['sleight', 4, 4], ['canine', 2, 3], ['feminine', 2, 4, A], ['asinine', 4, 4, A], ['listen', 1, 2, V], ['kitten', 1, 2], ['mitten', 2, 2], ['glisten', 3, 3, V], ['tennis', 1, 3],
    ['tender', 1, 3, { ...A, g: 'gentle' }], ['attend', 2, 3, V], ['tent', 1, 3], ['network', 1, 3, { g: 'computer' }], ['twofold', 3, 2, A], ['foursome', 3, 2], ['sixpence', 3, 3], ['fiver', 3, 3], ['frighten', 2, 3, V], ['tenant', 2, 3],
  ],
  hidden_fruits: [
    ['figure', 1, 2], ['figment', 3, 3], ['configure', 3, 4, V], ['spear', 1, 2], ['appear', 1, 3, V], ['pearl', 1, 3], ['slime', 1, 3], ['sublime', 3, 3, A], ['blimey', 3, 3, O], ['plumber', 1, 2],
    ['plump', 2, 3, A], ['plumage', 3, 3], ['plummet', 3, 3, V], ['update', 1, 3, V], ['candidate', 2, 4], ['validate', 3, 4, V], ['mandate', 3, 4], ['sedate', 3, 4, A], ['impeach', 3, 3, V], ['pineapple', 1, 3],
    ['grapple', 3, 3, V], ['dapple', 4, 4, V], ['scrapple', 5, 5], ['mangonel', 5, 5], ['orangery', 4, 4], ['limerick', 2, 3], ['dated', 1, 4, A], 
  ],
  hidden_names: [
    ['bench', 1, 2], ['annoy', 1, 2, V], ['tomato', 1, 2], ['evening', 1, 2], ['bend', 1, 3, V], ['benefit', 2, 3], ['banner', 2, 3], ['cannon', 2, 3], ['bottom', 1, 3],
    ['level', 1, 4, { ...A, g: 'flat' }], ['dance', 1, 3, V], ['danger', 1, 3], ['candy', 1, 3], ['handy', 1, 3, A], ['sample', 1, 3, { g: 'specimen' }], ['patch', 1, 3, { g: 'sewing' }], ['pattern', 2, 3, { g: 'sewing' }],
    ['tedious', 2, 3, A], ['baron', 2, 4], ['London', 1, 4, PL], ['pardon', 1, 4], ['token', 1, 3, { g: 'transit' }], ['broken', 1, 4, A], ['lesson', 1, 3], ['market', 1, 3], ['royal', 1, 3, A],
    ['destroy', 1, 4, V], ['spray', 1, 3, V], ['crayon', 1, 3], ['dreamy', 1, 3, A], ['issue', 1, 3], ['tissue', 1, 3, { g: 'paper' }], ['robot', 1, 3], ['problem', 1, 4], ['America', 1, 4, PL], ['chameleon', 2, 4],
    ['Napoleon', 1, 4, { type: 'person' }], ['pirate', 1, 3], ['Italian', 1, 4, { type: 'proper' }], ['skim', 2, 4, V], ['compete', 2, 4, V], ['sleep', 1, 4, V], ['blizzard', 2, 4], ['timber', 2, 3], ['omega', 3, 4],
    ['victim', 2, 4], ['scarlet', 2, 4], ['vocal', 2, 4, A], ['Pakistan', 2, 4, PL], ['stanza', 3, 3],
  ],
  hidden_vehicles: [
    ['scarf', 1, 2], ['abuse', 1, 2], ['cabin', 1, 2], ['trample', 3, 3, V], ['carrot', 1, 2], ['scarce', 2, 3, A], ['business', 1, 3], ['omnibus', 3, 3], ['busy', 1, 3, A], ['cabbage', 1, 3],
    ['cable', 1, 3, { g: 'wire' }], ['cabinet', 1, 3, { g: 'furniture' }], ['trampoline', 2, 3], ['advance', 1, 3, V], ['vanilla', 1, 3], ['vanish', 1, 3, V], ['savant', 4, 4], ['jetty', 2, 3], ['carton', 1, 3], ['cartoon', 1, 3],
    ['sledge', 2, 3], ['worship', 2, 3, V], ['friendship', 1, 3], ['tankard', 3, 3], ['taxidermy', 3, 3], ['craft', 1, 2], ['draft', 2, 3], ['strike', 1, 3, V], ['recycle', 1, 3, V], ['planet', 1, 3],
    ['limousine', 2, 3], ['rehearse', 3, 3, V], ['restrain', 2, 3, V], ['constrain', 3, 4, V], ['vicar', 2, 3], ['cargo', 1, 3], ['career', 1, 3], ['subject', 1, 3], ['submit', 1, 4, V],
  ],
  hidden_trees: [
    ['soak', 1, 2, V], ['cloak', 1, 3], ['croak', 3, 3, V], ['helmet', 1, 2], ['overwhelm', 3, 3, V], ['spine', 1, 3], ['alpine', 3, 3, A], ['supine', 4, 4, A], ['opine', 4, 4, V], ['porcupine', 3, 3],
    ['steak', 1, 3], ['crash', 1, 3, { g: 'accident' }], ['trash', 1, 3], ['splash', 1, 3, V], ['stash', 2, 4], ['cashew', 3, 3], ['first', 1, 4, A], ['fire', 1, 4], ['firm', 1, 4, A], ['confirm', 2, 4, V],
    ['bayonet', 3, 3], ['bayou', 3, 3], ['alderman', 4, 4], ['balsam', 4, 4], ['Hollywood', 1, 3, PL], ['palmistry', 4, 4], ['pineapple', 1, 4],
  ],
};

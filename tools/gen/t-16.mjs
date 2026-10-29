// Top-up batch 16. Format: tools/apply-words.mjs.
const PL = (o = {}) => ({ type: 'place', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const PE = (o = {}) => ({ type: 'person', ...o });
const O = (o = {}) => ({ type: 'org', ...o });
export const THEMES = {};
export const FIXES = [
  { gloss: ['lag', 'gaming_words', 'delay'] },
  { gloss: ['glassy', 'words_for_shiny', 'shiny'] },
  { gloss: ['180', 'darts_terms', 'darts'] },
  { gloss: ['chicken salad', 'salads', 'dish'] },
  { gloss: ['roast beef', 'chip_flavors', 'flavour'] },
  { gloss: ['Canadian bacon', 'cured_meats', 'meat'] },
  { gloss: ['Swiss cheese', 'cheeses', 'cheese'] },
  { gloss: ['walkover', 'gymnastics', 'gymnastics move'] },
  { gloss: ['Sweet Sixteen', 'birthdays', 'birthday'] },
];
export const ALIASES = [
  ['paralympic_sports', 'wheelchair rugby', '', [['murderball', 'synonym', 3, 4]]],
  ['paralympic_sports', 'para ice hockey', '', [['sledge hockey', 'synonym', 3, 4, ['UK']]]],
];
export const DATA = {
  golf_clubs: [
    ['pitching wedge', 3, 2], ['lob wedge', 3, 3], ['gap wedge', 4, 4], ['3-wood', 3, 2], ['5-iron', 3, 2], ['9-iron', 3, 3], ['mashie', 5, 5],
    ['niblick', 5, 5], ['spoon', 5, 5, { g: 'golf club' }], ['brassie', 5, 5], ['cleek', 5, 5], ['baffy', 5, 5], ['long iron', 4, 4], ['utility club', 4, 4],
    ['driving iron', 4, 4], ['belly putter', 4, 4], ['fairway wood', 3, 3],
  ],
  cue_sports_terms: [
    ['stymie', 5, 5], ['fluke', 4, 4, { g: 'billiards' }], ['spider', 5, 5, { g: 'snooker rest' }], ['swan neck', 5, 5], ['lag', 4, 4, { g: 'billiards' }],
    ['double kiss', 4, 4], ['frozen ball', 4, 4], ['diamond system', 5, 5], ['cut shot', 3, 3], ['side spin', 3, 3],
  ],
  scuba_words: [
    ['trimix', 5, 5], ['heliox', 5, 5], ['surface interval', 4, 4], ['thermocline', 4, 4], ['halocline', 5, 5], ['pony bottle', 5, 5], ['liveaboard', 4, 4],
    ['sidemount', 5, 5], ['off-gassing', 5, 5], ['oxygen toxicity', 4, 4], ['buddy line', 4, 4], ['backplate', 5, 5], ['surface marker buoy', 5, 5],
  ],
  surfing_words: [
    ['A-frame', 4, 4, { g: 'surf wave' }], ['thruster', 5, 5, { g: 'surfboard' }], ['quad fin', 5, 5], ['twin fin', 4, 4], ['noserider', 4, 4],
    ["Teahupo'o", 5, 5, PL()], ['Mavericks', 4, 4, PL({ g: 'surf break' })], ['Duke Kahanamoku', 4, 4], ['Kelly Slater', 3, 3, PE()], ['glassy', 4, 4, { g: 'calm sea' }], ['kneeboard', 4, 4],
  ],
  board_and_paddle_sports: [
    ['playboating', 5, 5], ['squirt boating', 5, 5], ['creeking', 5, 5], ['wing foiling', 4, 4], ['windfoiling', 5, 5], ['SUP', 3, 3, { type: 'acronym' }],
    ["va'a", 5, 5], ['kayak cross', 4, 4], ['canoe marathon', 4, 4], ['wild water racing', 5, 5], ['canoe sailing', 5, 5], ['bodysurfing', 3, 3],
  ],
  snow_sports: [
    ['ski flying', 4, 4], ['splitboarding', 5, 5], ['speed skiing', 4, 4], ['snowbiking', 4, 4], ['ski orienteering', 5, 5], ['snow polo', 5, 5], ['monoskiing', 5, 5], ['sit-skiing', 5, 5],
  ],
  nhl_teams: [
    ['Coyotes', 3, 4, O({ g: 'NHL team' })], ['Mammoth', 4, 5, O({ g: 'NHL team' })], ['Whalers', 4, 4, O({ g: 'NHL team' })], ['Nordiques', 4, 4, O({ g: 'NHL team' })],
    ['Thrashers', 5, 5, O({ g: 'NHL team' })], ['North Stars', 4, 4, O({ g: 'NHL team' })], ['Mighty Ducks', 4, 4, O({ g: 'NHL team' })],
  ],
  snowboard_tricks: [
    ['180', 2, 2, { g: 'snowboard trick' }], ['flip', 2, 2, { g: 'snowboard trick' }], ['grab', 2, 2, { g: 'snowboard trick' }],
    ['chicken salad', 4, 5, { g: 'snowboard trick' }], ['roast beef', 3, 5, { g: 'snowboard trick' }], ['Canadian bacon', 3, 5, { g: 'snowboard trick' }],
    ['rodeo flip', 5, 5], ['misty flip', 5, 5], ['Haakon flip', 5, 5], ['Swiss cheese', 2, 5, { g: 'snowboard trick' }], ['Lien air', 5, 5], ['Cab 540', 5, 5],
  ],
  martial_arts: [
    ['Bokator', 5, 5], ['Gatka', 5, 5], ['Kajukenbo', 5, 5], ['Sanda', 4, 4], ['Taekkyeon', 5, 5], ['Naginata', 5, 5], ['Dambe', 5, 5],
    ['Muay Boran', 5, 5], ['Glima', 5, 5], ['Ssireum', 5, 5], ['Kuntao', 5, 5], ['Hwa Rang Do', 5, 5],
  ],
  karate_words: [
    ['Sanchin', 5, 5], ['Bassai', 5, 5], ['Naihanchi', 5, 5], ['kiba dachi', 5, 5], ['zenkutsu dachi', 5, 5], ['age uke', 5, 5], ['nukite', 5, 5],
    ['shihan', 5, 4], ['mokuso', 5, 5], ['seiza', 4, 4], ['kime', 5, 5], ['Mas Oyama', 4, 4, PE()], ['Chojun Miyagi', 5, 5, PE()],
  ],
  judo_words: [
    ['kosoto gari', 5, 5], ['ouchi gari', 5, 5], ['ko-uchi gari', 5, 5], ['okuri ashi barai', 5, 5], ['de ashi barai', 5, 5], ['tai otoshi', 5, 5], ['kata guruma', 5, 5],
    ['sukui nage', 5, 5], ['uki goshi', 5, 5], ['o goshi', 5, 5], ['hane goshi', 5, 5], ['tani otoshi', 5, 5], ['kami shiho gatame', 5, 5], ['kata gatame', 5, 5],
    ['hadaka jime', 5, 5], ['okuri eri jime', 5, 5], ['ude garami', 5, 5], ['sankaku jime', 5, 5], ['sore made', 5, 5],
  ],
  track_events: [
    ['1000 metres', 4, 4], ['300 metres', 4, 4], ['150 metres', 5, 5], ['50km walk', 4, 4], ['4x800 relay', 5, 5], ['mixed relay', 4, 4], ['ekiden', 5, 5],
    ['distance medley', 5, 5], ['200m hurdles', 5, 5], ['3000m steeplechase', 4, 4], ['relay race', 1, 1],
  ],
  triathlon_words: [
    ['Chrissie Wellington', 4, 4, PE()], ['Gwen Jorgensen', 4, 4, PE()], ['Mirinda Carfrae', 5, 5, PE()], ['Julie Moss', 5, 5, PE()], ['Flora Duffy', 5, 5, PE()],
    ['Normann Stadler', 5, 5, PE()], ['bento box', 5, 5], ['pull buoy', 5, 5], ['aero helmet', 4, 4], ['swim skin', 5, 5], ['tri shorts', 3, 3],
  ],
  olympic_sports: [
    ['artistic swimming', 3, 3], ['keirin', 4, 4], ['omnium', 5, 5], ['madison', 5, 5, { g: 'cycling race' }], ['trap shooting', 4, 4], ['skeet', 4, 4],
    ['Greco-Roman wrestling', 4, 4], ['heptathlon', 3, 3], ['decathlon', 3, 3], ['hammer throw', 3, 3], ['ice dance', 3, 3],
  ],
  paralympic_sports: [
    ['CP football', 5, 5], ['seven-a-side football', 5, 5], ['para nordic skiing', 4, 4], ['para track cycling', 4, 4], ['para road cycling', 4, 4],
  ],
  sports_equipment: [
    ['lifting straps', 5, 5], ['speed bag', 4, 4], ['agility ladder', 4, 4], ['sliotar', 5, 5], ['fencing foil', 4, 4], ['epee', 5, 5], ['quoit', 5, 5],
    ['medicine ball', 2, 2], ['jump rope', 2, 2], ['foam roller', 3, 3], ['resistance band', 3, 3], ['pommel horse', 4, 4],
  ],
  sports_venues: [
    ['palaestra', 5, 5], ['fronton', 5, 5], ['real tennis court', 5, 5], ['fives court', 5, 5], ['Circus Maximus', 4, 4], ['bocce court', 4, 4], ['croquet lawn', 4, 4],
    ['bowling green', 3, 3], ['ski jump hill', 4, 4], ['bobsled track', 4, 4], ['dojo', 4, 4], ['hurling pitch', 4, 4], ['BMX track', 3, 3], ['Cresta Run', 5, 5, PL()],
  ],
  sports_officials: [
    ['commissaire', 5, 5], ['gyoji', 5, 5], ['scrutineer', 5, 5], ['TMO', 4, 4, { type: 'acronym' }], ['clerk of scales', 5, 5], ['stipendiary steward', 5, 5],
    ['line caller', 4, 4], ['pit marshal', 4, 4], ['doping control officer', 5, 5], ['official scorer', 3, 3], ['drug tester', 4, 4], ['video referee', 3, 3],
  ],
  sports_clothing: [
    ['unitard', 4, 4], ['gaiters', 5, 5], ['arm warmers', 4, 4], ['spats', 5, 5], ['plus fours', 4, 4], ['salopettes', 5, 5], ['jodhpurs', 4, 4], ['gilet', 4, 4],
    ['cagoule', 4, 4], ['dobok', 5, 5], ['hakama', 5, 5], ['snood', 5, 5], ['base layer', 3, 3], ['skort', 4, 4],
  ],
  scoring_words: [
    ['pinfall', 4, 4], ['Stableford', 5, 5], ['albatross', 3, 3, { g: 'golf' }], ['condor', 5, 5, { g: 'golf' }], ['brace', 4, 4, { g: 'goals' }], ['golden duck', 4, 4],
    ['maiden over', 4, 4], ['nine-dart finish', 4, 4], ['turkey', 3, 4, { g: 'bowling' }], ['penalty try', 4, 4], ['points decision', 4, 4], ['match point', 2, 2],
    ['set point', 2, 2], ['break point', 3, 3], ['eagle', 2, 2, { g: 'golf' }],
  ],
  sports_verbs: [
    ['parry', 4, 4], ['riposte', 5, 5], ['lunge', 3, 4, { g: 'fencing' }], ['shank', 4, 4, { g: 'bad shot' }], ['scull', 5, 5, { g: 'rowing' }], ['luff', 5, 5], ['jibe', 5, 5],
    ['belay', 5, 5], ['abseil', 4, 4, { g: 'climbing' }], ['deke', 5, 5], ['dummy', 4, 4, { g: 'soccer' }], ['sidestep', 3, 3], ['slice', 3, 3, { g: 'golf' }],
  ],
  famous_sporting_events: [
    ['Cowes Week', 4, 4, P()], ['Fastnet Race', 4, 4, P()], ['Vendee Globe', 4, 4, P()], ['Paris-Roubaix', 4, 4, P()], ['Tour of Flanders', 4, 4, P()],
    ['Vasaloppet', 5, 5, P()], ['Hahnenkamm', 5, 5, P()], ['Comrades Marathon', 4, 4, P()], ['Calcutta Cup', 4, 4, P()], ['Bledisloe Cup', 4, 4, P()],
    ['Boxing Day Test', 4, 4, P()], ['Highland Games', 3, 3, P()], ['Belmont Stakes', 3, 3, P()], ['Preakness Stakes', 3, 3, P()], ["America's Cup", 3, 3, P()],
    ['Henley Royal Regatta', 3, 3, P()],
  ],
  tournament_words: [
    ['lucky loser', 5, 5], ['walkover', 4, 4, { g: 'sport' }], ['stepladder playoff', 5, 5], ['countback', 5, 5], ['goal average', 5, 5], ['double round robin', 5, 5],
    ["losers' bracket", 4, 4], ['group of death', 3, 3], ['giant killing', 4, 4], ['Cinderella story', 4, 4], ['Page playoff', 5, 5], ['Sweet Sixteen', 3, 3, { g: 'basketball' }],
    ['Final Four', 3, 3, P()],
  ],
  famous_stadiums: [
    ['Ibrox', 4, 4, PL()], ['Goodison Park', 4, 4, PL()], ['Villa Park', 4, 4, PL()], ['Hillsborough', 4, 4, PL()], ['Mestalla', 5, 5, PL()], ['Luzhniki', 5, 5, PL()],
    ['Westfalenstadion', 5, 5, PL()], ['Estadio da Luz', 5, 5, PL()], ['Eden Park', 4, 4, PL()], ['Ellis Park', 5, 5, PL()], ['Cardiff Arms Park', 5, 5, PL()],
    ['Lansdowne Road', 5, 5, PL()], ['Headingley', 4, 4, PL()], ['Edgbaston', 4, 4, PL()], ['Candlestick Park', 4, 4, PL()], ['Ebbets Field', 5, 5, PL()],
    ['Polo Grounds', 5, 5, PL()], ['Astrodome', 4, 4, PL()], ['Camden Yards', 4, 4, PL()], ['Wankhede Stadium', 5, 5, PL()],
  ],
  olympic_host_cities: [
    ['St. Moritz', 4, 4], ['Garmisch', 5, 5],
  ],
};

// Generated word data: People & Society depth-3 themes (maori / aboriginal culture, kinds of people), chunk 5.
const NP = (o = {}) => ({ type: 'person', ...o });
const PR = (o = {}) => ({ type: 'proper', ...o });
const PL = (o = {}) => ({ type: 'place', ...o });
const PH = (o = {}) => ({ type: 'phrase', ...o });

export const THEMES = {
  maori_culture: { d: 4, region: ['NZ'] },
  aboriginal_culture: { d: 4, sensitive: true, region: ['AU'] },
  words_for_a_person: { d: 3, lang: true },
  groups_of_people: { d: 2 },
  words_for_leader: { d: 2 },
  words_for_expert: { d: 3 },
  words_for_beginner: { d: 2 },
  fans_and_followers: { d: 3 },
  troublemakers: { d: 2, lang: true },
};

export const DATA = {
  maori_culture: [
    ['haka', 2, 1], ['hangi', 3, 2], ['marae', 3, 1], ['whanau', 3, 2], ['iwi', 3, 2], ['moko', 4, 3], ['waka', 3, 2], ['hongi', 4, 2], ['mana', 3, 2, { g: 'spiritual power' }], ['tapu', 3, 3],
    ['Aotearoa', 3, 2, PL()], ['pounamu', 4, 3], ['greenstone', 3, 3], ['koru', 3, 2], ['kia ora', 2, 2, PH()], ['pakeha', 3, 3], ['kai', 3, 3, { g: 'food' }],
    ['te reo', 3, 2, { g: 'Maori language' }], ['powhiri', 4, 3], ['tangi', 4, 3, { g: 'funeral' }], ['taonga', 4, 3], ['kapa haka', 4, 3], ['poi', 3, 2, { g: 'dance' }],
    ['rangatira', 5, 4], ['hapu', 4, 4], ['kaumatua', 5, 4], ['whare', 4, 4], ['wharenui', 5, 4], ['karakia', 4, 4], ['tiki', 2, 3], ['Matariki', 3, 3, PR()],
    ['Maui', 3, 3, NP({ g: 'demigod' })], ['kumara', 3, 4], ['hui', 3, 3], ['taiaha', 5, 4], ['kaitiaki', 5, 4], ['Tane Mahuta', 4, 3, PR()], ['Waitangi', 3, 3, PL()],
    ['Treaty of Waitangi', 3, 3, PR()], ['Ka Mate', 4, 3, PR()], ['Ranginui', 5, 4, NP()], ['Papatuanuku', 5, 4, NP()], ['manaakitanga', 5, 4],
  ],
  aboriginal_culture: [
    ['didgeridoo', 2, 1, { al: [['yidaki', 'synonym', 5, 4]] }], ['boomerang', 1, 1], ['Dreamtime', 3, 1, PR({ al: [['Dreaming', 'synonym', 3, 2, [], PR()]] })],
    ['songlines', 4, 2], ['corroboree', 4, 3], ['dot painting', 3, 2], ['Uluru', 2, 2, PL({ al: [['Ayers Rock', 'synonym', 2, 3, [], PL()]] })], ['walkabout', 2, 2],
    ['woomera', 4, 3], ['clapsticks', 5, 4], ['bullroarer', 5, 4], ['smoking ceremony', 4, 3], ['Welcome to Country', 3, 3, PR()], ['Rainbow Serpent', 4, 3, PR()],
    ['bush tucker', 3, 3], ['witchetty grub', 3, 3], ['totem', 2, 4], ['ochre', 3, 4], ['rock art', 3, 3], ['bark painting', 4, 3], ['coolamon', 5, 4], ['dilly bag', 5, 4],
    ['Torres Strait Islander', 4, 4, PR()], ['NAIDOC', 4, 3, { type: 'acronym' }], ['Kakadu', 3, 4, PL()], ['Arnhem Land', 4, 4, PL()], ['Kata Tjuta', 5, 3, PL()],
    ['Tjukurpa', 5, 4, PR()], ['message stick', 5, 4], ['firestick farming', 5, 5], ['Albert Namatjira', 5, 4, NP()], ['Eddie Mabo', 4, 4, NP()], ['Aboriginal flag', 3, 3],
    ['Elder', 3, 4, { g: 'community' }], ['nulla nulla', 5, 4], ['Mabo decision', 4, 4], ['Kimberley', 3, 5, PL()],
  ],
  words_for_a_person: [
    ['person', 1, 1], ['individual', 2, 2], ['human', 1, 2], ['human being', 1, 2], ['soul', 2, 4, { g: 'person' }], ['fellow', 2, 3], ['chap', 2, 3, { reg: ['UK'] }], ['guy', 1, 2],
    ['bloke', 2, 2, { reg: ['UK', 'AU', 'NZ'] }], ['dude', 1, 2, { reg: ['US'] }], ['being', 2, 3], ['mortal', 3, 3], ['someone', 1, 3], ['lad', 2, 3, { reg: ['UK'] }],
    ['gent', 3, 3], ['geezer', 3, 3, { reg: ['UK'] }], ['fella', 2, 3], ['bod', 4, 4, { reg: ['UK'] }], ['punter', 3, 4, { reg: ['UK'] }], ['lass', 2, 3, { reg: ['UK'] }],
    ['dame', 2, 4], ['homo sapiens', 4, 4], ['creature', 2, 4], ['joe', 3, 4, { g: 'man' }], ['personage', 5, 4], ['wight', 5, 5], ['cove', 5, 4, { g: 'fellow', reg: ['UK'] }], ['blighter', 4, 4, { reg: ['UK'] }],
    ['character', 2, 4, { g: 'person' }], ['gentleman', 1, 3], ['sheila', 3, 3, { reg: ['AU'] }], ['woman', 1, 3], ['man', 1, 3, { g: 'person' }],
  ],
  groups_of_people: [
    ['crowd', 1, 1], ['team', 1, 1], ['crew', 1, 2], ['gang', 1, 2], ['band', 1, 3, { g: 'group' }], ['squad', 2, 2], ['mob', 2, 3, { g: 'crowd' }], ['troupe', 3, 3, { g: 'performers' }], ['clan', 2, 2],
    ['committee', 2, 2], ['club', 1, 3, { g: 'group' }], ['party', 2, 3, { g: 'group' }], ['tribe', 2, 2], ['posse', 3, 3], ['audience', 1, 3], ['congregation', 3, 3], ['choir', 1, 4],
    ['cast', 2, 4, { g: 'actors' }], ['panel', 2, 3], ['board', 2, 3, { g: 'committee' }], ['jury', 2, 3], ['staff', 2, 4, { g: 'employees' }], ['throng', 3, 3], ['horde', 3, 3],
    ['entourage', 3, 3], ['faction', 3, 3], ['coalition', 3, 3], ['delegation', 4, 4], ['cohort', 4, 3], ['assembly', 3, 3, { g: 'gathering' }], ['brigade', 3, 3], ['platoon', 3, 3], ['syndicate', 4, 3],
    ['cabal', 4, 3], ['coterie', 5, 4], ['retinue', 4, 4], ['contingent', 4, 4], ['consortium', 4, 4], ['guild', 3, 3], ['fraternity', 3, 3], ['collective', 3, 3], ['rabble', 3, 3],
  ],
  words_for_leader: [
    ['leader', 1, 1, { g: 'person' }], ['boss', 1, 1], ['chief', 1, 1], ['captain', 1, 1, { g: 'leader' }], ['head', 1, 3, { g: 'leader' }], ['director', 2, 2, { g: 'manager' }], ['chair', 2, 3, { g: 'person' }],
    ['commander', 2, 2], ['skipper', 3, 2], ['ringleader', 3, 3], ['manager', 1, 2], ['supervisor', 2, 3], ['foreman', 3, 3], ['principal', 2, 4, { g: 'head' }], ['president', 1, 3], ['governor', 2, 3, { g: 'ruler' }],
    ['ruler', 2, 3, { g: 'leader' }], ['monarch', 2, 4], ['chieftain', 3, 2], ['kingpin', 3, 3], ['honcho', 3, 3, { al: [['head honcho', 'synonym', 3, 3]] }], ['top dog', 3, 3],
    ['big cheese', 3, 3], ['supremo', 4, 3, { reg: ['UK'] }], ['overlord', 3, 4], ['warlord', 3, 4], ['commandant', 4, 3], ['bellwether', 5, 4], ['figurehead', 3, 3], ['taskmaster', 3, 4],
    ['guvnor', 4, 4, { reg: ['UK'] }], ['premier', 2, 3], ['prime minister', 1, 3], ['chairperson', 3, 3, { al: [['chairman', 'synonym', 2, 3]] }], ['helmsman', 4, 4], ['doyen', 5, 4],
    ['mastermind', 3, 4, { g: 'planner' }], ['generalissimo', 5, 4], ['pacesetter', 4, 4], ['headman', 4, 4],
  ],
  words_for_expert: [
    ['expert', 1, 1], ['guru', 2, 1, { g: 'expert' }], ['ace', 2, 2, { g: 'expert' }], ['whiz', 3, 2, { al: [['whizz', 'spelling', 3, 2, ['UK']]] }], ['maestro', 3, 2, { g: 'expert' }], ['pro', 1, 2], ['virtuoso', 4, 2],
    ['connoisseur', 4, 2], ['authority', 2, 3, { g: 'expert' }], ['specialist', 2, 2], ['master', 2, 3, { g: 'expert' }], ['wizard', 2, 3, { g: 'expert' }], ['veteran', 3, 3],
    ['boffin', 3, 3, { reg: ['UK'] }], ['buff', 3, 4, { g: 'enthusiast' }], ['genius', 1, 4], ['prodigy', 3, 4], ['adept', 4, 3], ['maven', 4, 3], ['pundit', 3, 4], ['sage', 3, 4, { g: 'wise person' }],
    ['savant', 4, 3], ['hotshot', 3, 4], ['old hand', 3, 3, PH()], ['dab hand', 4, 3, { reg: ['UK'], type: 'phrase' }], ['past master', 4, 3, PH()], ['grandmaster', 3, 4], ['professional', 1, 2],
    ['crackerjack', 4, 3], ['oracle', 3, 4, { g: 'expert' }], ['polymath', 4, 4], ['cognoscenti', 5, 4], ['doyenne', 5, 5], ['whizz kid', 3, 3, { al: [['wunderkind', 'synonym', 4, 4]] }],
  ],
  words_for_beginner: [
    ['beginner', 1, 1], ['novice', 2, 1], ['rookie', 2, 1, { g: 'beginner' }], ['newbie', 2, 1, { g: 'beginner' }], ['trainee', 2, 2], ['apprentice', 2, 2], ['amateur', 2, 3], ['greenhorn', 3, 2], ['tenderfoot', 4, 2],
    ['learner', 1, 2], ['freshman', 2, 3], ['fresher', 3, 3, { reg: ['UK'] }], ['newcomer', 2, 3], ['tyro', 5, 3, { al: [['tiro', 'spelling', 5, 4]] }], ['neophyte', 4, 2], ['novitiate', 5, 4],
    ['initiate', 4, 4], ['recruit', 2, 3], ['cadet', 3, 4], ['intern', 2, 3], ['noob', 3, 1, { al: [['newb', 'synonym', 3, 2]] }], ['fledgling', 3, 3], ['debutant', 4, 4], ['first-timer', 3, 2],
    ['padawan', 4, 4, { tm: true, g: 'Star Wars' }], ['probationer', 5, 4], ['abecedarian', 5, 5], ['new kid', 2, 3, PH()], ['rank amateur', 3, 3, PH()], ['L-plater', 4, 4, { reg: ['UK', 'AU'] }],
    ['wet behind the ears', 3, 3, PH()], ['greenie', 4, 3],
  ],
  fans_and_followers: [
    ['fan', 1, 1, { g: 'supporter' }], ['devotee', 3, 2], ['enthusiast', 2, 2], ['buff', 3, 2, { g: 'enthusiast' }], ['aficionado', 4, 2], ['admirer', 2, 2], ['disciple', 3, 3], ['groupie', 3, 2],
    ['follower', 1, 2], ['supporter', 2, 2], ['fanatic', 2, 2], ['stan', 3, 2, { g: 'fan' }], ['superfan', 3, 2], ['fanboy', 3, 2], ['fangirl', 3, 2], ['acolyte', 4, 3], ['adherent', 4, 3],
    ['zealot', 3, 3], ['partisan', 4, 3], ['booster', 3, 4], ['hanger-on', 4, 3], ['fan club', 2, 2], ['Trekkie', 3, 3], ['Deadhead', 4, 3], ['Swiftie', 3, 3], ['diehard', 3, 3],
    ['loyalist', 4, 4], ['proselyte', 5, 4], ['votary', 5, 4], ['worshipper', 3, 4], ['fandom', 3, 3], ['stalwart', 4, 4], ['tifosi', 5, 4], ['Belieber', 3, 3], ['sycophant', 4, 5],
    ['fiend', 3, 5, { g: 'enthusiast' }], ['Beatlemaniac', 4, 3], ['cheerleader', 2, 5], ['hardcore fan', 2, 2, PH()],
  ],
  troublemakers: [
    ['rascal', 2, 1], ['rogue', 3, 2], ['scamp', 3, 2], ['brat', 2, 2], ['prankster', 3, 2], ['hooligan', 3, 2], ['imp', 3, 2, { g: 'mischievous child' }], ['scallywag', 4, 2],
    ['troublemaker', 1, 1], ['scoundrel', 3, 2], ['rapscallion', 4, 2], ['miscreant', 4, 3], ['urchin', 3, 4], ['hellion', 4, 3], ['delinquent', 3, 3], ['vandal', 2, 4],
    ['yob', 3, 3, { reg: ['UK'] }], ['lout', 3, 3], ['thug', 2, 4], ['tearaway', 4, 3, { reg: ['UK'] }], ['ruffian', 4, 3], ['mischief maker', 3, 2], ['rowdy', 2, 3], ['cad', 4, 4, { g: 'rogue' }],
    ['knave', 4, 3], ['varlet', 5, 4], ["ne'er-do-well", 4, 3], ['hoodlum', 3, 3], ['hellraiser', 3, 2], ['rabble-rouser', 4, 3], ['agitator', 3, 3], ['scapegrace', 5, 4],
    ['blackguard', 5, 4], ['whippersnapper', 4, 3], ['pest', 2, 4], ['menace', 2, 3], ['bad egg', 3, 3, PH()], ['bad apple', 2, 3, PH()], ['stirrer', 4, 3, { reg: ['UK'] }], ['gremlin', 3, 4],
    ['monkey', 1, 4, { g: 'rascal' }], ['terror', 2, 4, { g: 'rascal' }],
  ],
};

export const FIXES = [
  { gloss: ['mana', 'fantasy', 'magic power'] }, { gloss: ['cove', 'landscapes', 'bay'] }, { gloss: ['captain', 'boats_and_ships', 'ship'] }, { gloss: ['chair', 'seating', 'furniture'] },
  { gloss: ['ruler', 'measurement', 'measuring tool'] }, { gloss: ['wizard', 'fantasy', 'magic user'] }, { gloss: ['monkey', 'mammals', 'animal'] }, { gloss: ['terror', 'emotions', 'fear'] },
];

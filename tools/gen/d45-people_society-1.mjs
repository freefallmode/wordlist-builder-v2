// Generated word data: People & Society, deeper themes (chunk people_society-1 rest).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const Pr = (o = {}) => ({ type: 'proper', ...o });
const T = (o = {}) => ({ type: 'common', ...o });
const cur = (o = {}) => ({ g: 'currency', ...o });

export const THEMES = {
  words_for_mother: { d: 2, lang: true }, words_for_father: { d: 2, lang: true }, words_for_grandparents: { d: 2, lang: true }, words_for_kids: { d: 3, lang: true },
  positive_traits: { d: 1 }, negative_traits: { d: 1 },
  ottoman_titles: { d: 5 }, ranks_of_the_british_peerage: { d: 3 },
  african_currencies: { d: 4 }, asian_currencies: { d: 3 }, european_currencies: { d: 2 }, latin_american_currencies: { d: 4 },
  historic_coins: { d: 4 }, us_coins: { d: 1 },
  the_four_evangelists: { d: 3 }, four_horsemen_of_the_apocalypse: { d: 3 }, seven_deadly_sins: { d: 2 }, archangels: { d: 5 },
};

export const FIXES = [
  { gloss: ['modest', 'words_for_small', 'small'] },
  { gloss: ['da', 'ways_to_say_yes', 'yes'] },
  { gloss: ['dram', 'weight_units', 'unit'] },
  { gloss: ['lek', 'birdwatching_words', 'display'] },
  { gloss: ['balboa', 'ballroom_dances', 'dance'] },
  { gloss: ['guarani', 'languages', 'language'] },
  { gloss: ['grammy', 'award_words', 'award'] },
  { gloss: ['mutter', 'ways_of_speaking', 'speak'] },
  { gloss: ['cruzeiro', 'south_american_soccer_clubs', 'club'] },
  { gloss: ['John', 'words_for_toilet', 'toilet'] },
];

export const DATA = {
  words_for_mother: [
    ['mother', 1, 1], ['mum', 1, 1, { g: 'mother' }], ['mom', 1, 1], ['mama', 1, 1], ['mummy', 1, 1, { g: 'mother' }], ['mommy', 1, 1],
    ['ma', 2, 2, { g: 'mother' }], ['momma', 2, 2], ['mamma', 2, 2], ['mam', 2, 2, { reg: ['UK'] }], ['mammy', 2, 3, { reg: ['UK'] }],
    ['maw', 3, 3, { reg: ['UK'] }], ['mumsy', 3, 3, { reg: ['UK'] }], ['mater', 3, 3, { reg: ['UK'] }], ['old lady', 2, 4, { type: 'phrase' }],
    ['madre', 3, 3, { g: 'Spanish mother' }], ['maman', 3, 3, { g: 'French mother' }], ['mutter', 4, 4, { g: 'German mother' }],
  ],
  words_for_father: [
    ['father', 1, 1], ['dad', 1, 1, { g: 'father' }], ['daddy', 1, 1], ['papa', 1, 1, { g: 'father' }], ['pa', 2, 2, { g: 'father' }], ['pop', 2, 2, { g: 'father' }],
    ['pops', 2, 2], ['poppa', 3, 3], ['pappy', 3, 3], ['da', 3, 3, { g: 'father', reg: ['UK'] }], ['old man', 2, 4, { type: 'phrase' }],
    ['pater', 4, 4, { reg: ['UK'] }], ['padre', 3, 3, { g: 'Spanish father' }], ['vater', 4, 4, { g: 'German father' }],
  ],
  words_for_grandparents: [
    ['grandmother', 1, 1], ['grandfather', 1, 1], ['grandma', 1, 1], ['grandpa', 1, 1], ['granny', 1, 1], ['gran', 2, 2], ['grandad', 2, 2, { reg: ['UK'] }],
    ['granddad', 2, 2, { reg: ['UK'] }], ['gramps', 2, 3], ['nan', 2, 2, { reg: ['UK'] }], ['nana', 2, 2, { g: 'grandmother' }], ['nanna', 3, 3, { g: 'grandmother' }],
    ['nanny', 3, 3, { g: 'grandmother' }], ['grammy', 3, 3, { g: 'grandmother' }], ['gramma', 3, 3], ['pop-pop', 3, 3], ['nonna', 3, 3, { g: 'Italian grandmother' }],
    ['nonno', 4, 4, { g: 'Italian grandfather' }], ['oma', 3, 3, { g: 'German grandmother' }], ['opa', 3, 3, { g: 'German grandfather' }],
    ['abuela', 3, 3, { g: 'Spanish grandmother' }], ['abuelo', 4, 4, { g: 'Spanish grandfather' }], ['babushka', 3, 4, { g: 'Russian grandmother' }],
    ['yaya', 4, 4, { g: 'Greek grandmother' }], ['bubbe', 4, 4, { g: 'Yiddish grandmother' }], ['zayde', 5, 5, { g: 'Yiddish grandfather' }],
  ],
  words_for_kids: [
    ['kid', 1, 1, { g: 'child' }], ['child', 1, 1], ['toddler', 1, 1], ['tot', 2, 2], ['youngster', 2, 2], ['kiddo', 2, 2], ['rascal', 2, 3],
    ['brat', 2, 3], ['juvenile', 3, 3, { g: 'young' }], ['minor', 3, 3, { g: 'under-age person' }], ['offspring', 3, 3, { g: 'children' }],
    ['rugrat', 3, 3, { g: 'child' }], ['tyke', 3, 3, { al: [['tike', 'spelling', 4, 4]] }], ['nipper', 3, 3, { g: 'child', reg: ['UK'] }], ['bairn', 3, 3, { reg: ['UK'] }],
    ['sprog', 3, 3, { g: 'child', reg: ['UK'] }], ['munchkin', 3, 3, { g: 'child' }], ['urchin', 3, 4], ['scamp', 3, 4], ['whippersnapper', 4, 4],
    ['ankle-biter', 4, 4, { g: 'child' }], ['small fry', 3, 4, { type: 'phrase' }], ['little one', 2, 3, { type: 'phrase' }], ['progeny', 4, 4], ['youth', 2, 3, { g: 'young person' }],
  ],
  positive_traits: [
    ['kind', 1, 1, adj({ g: 'caring' })], ['honest', 1, 1, adj()], ['generous', 1, 1, adj()], ['loyal', 1, 1, adj()], ['patient', 1, 1, adj({ g: 'tolerant' })],
    ['brave', 1, 1, adj({ al: [['courageous', 'synonym', 2, 2], ['valiant', 'synonym', 3, 3], ['plucky', 'synonym', 3, 3]] })],
    ['friendly', 1, 1, adj()], ['polite', 2, 2, adj()], ['helpful', 1, 1, adj()], ['caring', 1, 1, adj({ g: 'kind' })], ['funny', 1, 2, adj()],
    ['clever', 1, 3, adj()], ['wise', 2, 3, adj()], ['gentle', 1, 2, adj()], ['cheerful', 2, 3, adj()], ['humble', 2, 2, adj()], ['modest', 2, 3, adj({ g: 'humble' })],
    ['thoughtful', 2, 2, adj()], ['easygoing', 2, 3, adj()], ['sociable', 3, 3, adj()], ['reliable', 2, 2, adj()], ['trustworthy', 2, 2, adj()],
    ['considerate', 2, 2, adj()], ['sincere', 3, 3, adj()], ['selfless', 3, 3, adj()], ['gracious', 3, 3, adj()], ['resourceful', 3, 3, adj()],
    ['conscientious', 4, 4, adj()], ['tactful', 3, 3, adj()], ['steadfast', 4, 4, adj()], ['gallant', 4, 4, adj()], ['benevolent', 4, 4, adj()],
    ['altruistic', 4, 4, adj()], ['magnanimous', 5, 4, adj()], ['forbearing', 5, 5, adj()],
  ],
  negative_traits: [
    ['greedy', 1, 1, adj()], ['rude', 1, 1, adj()], ['lazy', 1, 1, adj({ al: [['idle', 'synonym', 2, 2]] })], ['selfish', 1, 1, adj()], ['arrogant', 1, 1, adj({ al: [['haughty', 'synonym', 3, 3]] })],
    ['stubborn', 1, 1, adj({ al: [['obstinate', 'synonym', 3, 3]] })], ['mean', 1, 1, adj({ g: 'unkind' })], ['cruel', 1, 1, adj()], ['nasty', 1, 2, adj()],
    ['jealous', 1, 2, adj()], ['vain', 2, 2, adj()], ['bossy', 1, 1, adj()], ['nosy', 1, 2, adj()], ['grumpy', 1, 2, adj()], ['moody', 2, 3, adj()],
    ['impatient', 1, 2, adj()], ['dishonest', 1, 1, adj()], ['cowardly', 2, 2, adj()], ['spiteful', 2, 2, adj()], ['petty', 2, 3, adj()],
    ['bitter', 2, 3, adj({ g: 'resentful' })], ['cold', 1, 3, adj({ g: 'unfriendly' })], ['sly', 2, 3, adj()], ['boastful', 2, 2, adj()], ['conceited', 3, 3, adj()],
    ['snobby', 2, 2, adj()], ['sneaky', 2, 3, adj()], ['pushy', 2, 3, adj()], ['tactless', 3, 3, adj()], ['callous', 3, 3, adj()], ['deceitful', 3, 3, adj()],
    ['pompous', 3, 3, adj()], ['petulant', 4, 4, adj()], ['vindictive', 4, 4, adj()], ['malicious', 4, 3, adj()], ['churlish', 5, 4, adj()],
    ['surly', 4, 4, adj()], ['insolent', 4, 4, adj()], ['sanctimonious', 5, 4, adj()], ['supercilious', 5, 5, adj()], ['hypocritical', 3, 4, adj()],
  ],
  ottoman_titles: [
    ['sultan', 2, 2, T()], ['pasha', 3, 3, T()], ['vizier', 3, 3, T()], ['bey', 3, 3, T()], ['effendi', 4, 4, T()], ['janissary', 3, 4, { type: 'common' }],
    ['agha', 4, 4, T()], ['aga', 4, 4, T()], ['grand vizier', 3, 3, T()], ['caliph', 3, 3, T()], ['emir', 3, 3, T()], ['sheikh', 2, 3, T({ g: 'Muslim leader' })],
    ['padishah', 5, 5, T()], ['kadi', 5, 5, T()], ['sipahi', 5, 5, { type: 'common' }], ['beylerbey', 5, 5, T()], ['dey', 5, 5, T()], ['khedive', 5, 5, T()],
    ['hatun', 5, 5, T()], ['valide sultan', 5, 5, T()], ['kaymakam', 5, 5, T()], ['mufti', 4, 4, T()], ['dragoman', 5, 5, { type: 'common' }], ['bashaw', 5, 5, T()],
  ],
  ranks_of_the_british_peerage: [
    ['duke', 1, 1, T()], ['earl', 2, 2, T()], ['baron', 2, 2, T()], ['viscount', 3, 3, T()], ['marquess', 3, 3, T({ al: [['marquis', 'spelling', 3, 3]] })],
    ['duchess', 2, 2, T()], ['countess', 2, 3, T()], ['baroness', 2, 3, T()], ['marchioness', 4, 4, T()], ['viscountess', 4, 4, T()],
  ],
  african_currencies: [
    ['rand', 3, 2, cur()], ['naira', 3, 2], ['shilling', 2, 3], ['cedi', 4, 3], ['birr', 4, 3], ['kwacha', 4, 3], ['pula', 4, 3, cur()], ['dalasi', 5, 4, cur()],
    ['dinar', 3, 4], ['dirham', 3, 4], ['leone', 4, 4, cur()], ['kwanza', 4, 4, cur()], ['metical', 5, 5, cur()], ['ouguiya', 5, 5, cur()],
    ['lilangeni', 5, 5, cur()], ['loti', 5, 5, cur()], ['nakfa', 5, 5, cur()], ['ariary', 5, 5, cur()],
  ],
  asian_currencies: [
    ['yen', 1, 1], ['yuan', 2, 2, cur()], ['won', 2, 2, cur()], ['rupee', 2, 2], ['baht', 3, 2], ['ringgit', 3, 3], ['dong', 3, 3, cur()], ['rupiah', 3, 3],
    ['taka', 3, 3], ['renminbi', 3, 3, cur({ type: 'common' })], ['rial', 3, 4], ['dinar', 3, 4], ['dirham', 3, 4], ['shekel', 3, 3, cur()], ['kip', 4, 4, cur()],
    ['riel', 4, 4], ['kyat', 4, 4], ['tugrik', 5, 5, cur()], ['tenge', 5, 5, cur()], ['manat', 5, 5, cur()], ['lari', 5, 5, cur()], ['dram', 4, 4, cur()],
    ['ngultrum', 5, 5, cur()], ['rufiyaa', 5, 5, cur()], ['afghani', 4, 4, cur()], ['pataca', 5, 5, cur()], ['riyal', 3, 3, cur()],
  ],
  european_currencies: [
    ['euro', 1, 1], ['pound', 1, 1, { g: 'currency' }], ['franc', 2, 2], ['lira', 2, 2], ['mark', 2, 3, cur()], ['peseta', 3, 3], ['drachma', 3, 3], ['krona', 3, 3],
    ['zloty', 3, 3], ['forint', 4, 4], ['krone', 3, 3, cur()], ['koruna', 4, 4], ['lev', 4, 4], ['leu', 4, 4], ['hryvnia', 4, 4], ['ruble', 3, 3, { al: [['rouble', 'spelling', 3, 3, ['UK']]] }],
    ['lek', 5, 5, cur()], ['escudo', 3, 3, cur()], ['guilder', 3, 3], ['punt', 4, 4, cur()], ['schilling', 3, 3, cur()], ['markka', 5, 5, cur()], ['tolar', 5, 5, cur()],
    ['lat', 5, 5, cur()], ['litas', 5, 5, cur()], ['kroon', 5, 5, cur()], ['kuna', 4, 4, cur()], ['deutschmark', 3, 3], ['denar', 5, 5, cur()], ['dinar', 3, 3],
  ],
  latin_american_currencies: [
    ['real', 2, 3, { g: 'Brazilian currency' }], ['peso', 1, 1], ['sol', 3, 3, cur()], ['boliviano', 4, 4], ['guarani', 4, 4, cur()], ['bolivar', 4, 4, cur()],
    ['quetzal', 3, 3, cur()], ['colon', 3, 3, cur()], ['lempira', 5, 5], ['cordoba', 5, 5], ['balboa', 4, 4, cur()], ['sucre', 5, 5, cur()], ['inti', 5, 5, cur()],
    ['cruzeiro', 5, 5, cur()], ['gourde', 5, 5], ['austral', 5, 5, cur()], ['dollar', 1, 3], ['nuevo sol', 5, 5, cur()],
  ],
  historic_coins: [
    ['doubloon', 2, 2], ['ducat', 3, 3], ['florin', 3, 3], ['farthing', 3, 3], ['guinea', 3, 3, { g: 'coin' }], ['sovereign', 3, 3, { g: 'coin' }], ['groat', 4, 4],
    ['denarius', 3, 3], ['thaler', 4, 4], ['piece of eight', 2, 2, { type: 'phrase' }], ['shilling', 2, 2], ['crown', 2, 3, { g: 'coin' }], ['halfpenny', 3, 3],
    ['sixpence', 3, 3], ['tuppence', 2, 3], ['obol', 4, 4], ['sestertius', 4, 4], ['drachma', 3, 3], ['angel', 4, 5, { g: 'coin' }],
    ['noble', 4, 5, { g: 'coin' }], ['aureus', 5, 5], ['solidus', 5, 5, { g: 'Byzantine coin' }], ['stater', 5, 5], ['bezant', 5, 5], ['denier', 4, 4],
    ['maravedi', 5, 5], ['sou', 4, 4], ['ecu', 5, 5], ["louis d'or", 5, 5],
  ],
  us_coins: [
    ['penny', 1, 1], ['nickel', 1, 1, { g: 'coin' }], ['dime', 1, 1], ['quarter', 1, 1, { g: 'coin' }], ['half dollar', 2, 2], ['silver dollar', 2, 3], ['dollar coin', 2, 2],
    ['cent', 1, 2],
  ],
  the_four_evangelists: [
    ['Matthew', 1, 2, Pr()], ['Mark', 1, 2, Pr({ g: 'name' })], ['Luke', 1, 2, Pr({ g: 'saint' })], ['John', 1, 2, Pr({ g: 'name' })],
  ],
  four_horsemen_of_the_apocalypse: [
    ['War', 1, 1, { g: 'conflict' }], ['Famine', 2, 2], ['Death', 1, 1, Pr({ g: 'horseman' })], ['Pestilence', 3, 3], ['Conquest', 3, 3],
  ],
  seven_deadly_sins: [
    ['pride', 1, 1, { g: 'feeling' }], ['envy', 1, 1, { g: 'emotion' }], ['wrath', 2, 2], ['sloth', 1, 1, { g: 'sin' }], ['lust', 2, 2], ['gluttony', 2, 2],
    ['avarice', 3, 3, { al: [['greed', 'synonym', 1, 1]] }],
  ],
  archangels: [
    ['Michael', 2, 2, Pr({ g: 'archangel' })], ['Gabriel', 2, 2, Pr({ g: 'archangel' })], ['Raphael', 3, 3, Pr({ g: 'archangel' })], ['Uriel', 4, 3], ['Azrael', 4, 4, Pr({ g: 'angel of death' })],
    ['Metatron', 4, 4], ['Raguel', 5, 5, Pr()], ['Remiel', 5, 5, Pr()], ['Sariel', 5, 5, Pr()], ['Raziel', 5, 5, Pr()], ['Jophiel', 5, 5, Pr()],
    ['Chamuel', 5, 5, Pr()], ['Zadkiel', 5, 5, Pr()], ['Haniel', 5, 5, Pr()], ['Barachiel', 5, 5, Pr()],
  ],
};

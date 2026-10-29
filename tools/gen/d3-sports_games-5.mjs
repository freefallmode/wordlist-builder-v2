// Generated word data: Sports & Games > regional sports (chunk sports_games-5).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const O = (o = {}) => ({ type: 'org', ...o });          // clubs (trademark comes from the theme)
const AU = ['AU'];
const CLUB = { g: 'AFL club' };

export const THEMES = {
  turkish_football_clubs: { d: 4 },
  middle_eastern_pastimes: { d: 3 },
  african_soccer_clubs: { d: 4 },
  south_asian_games: { d: 4 },
  aussie_rules_terms: { d: 4, region: ['AU'] },
  afl_clubs: { d: 3, tm: true },
  south_american_soccer_clubs: { d: 3, tm: true },
  capoeira_words: { d: 5 },
  highland_games: { d: 2 },
  british_pub_games: { d: 2 },
};

export const FIXES = [
  { gloss: ['Skittles', 'desserts_and_sweets', 'candy'] },
  { gloss: ['Hawthorn', 'trees', 'tree'] }, { gloss: ['toad in the hole', 'dishes', 'dish'] }, { gloss: ['handball', 'ball_sports', 'sport'] },
];

export const DATA = {
  turkish_football_clubs: [
    ['Galatasaray', 3, 2, O({ al: [['Cim Bom', 'synonym', 5, 5, ['TR']]] })],
    ['Fenerbahçe', 3, 2, O({ al: [['Fenerbahce', 'spelling', 3, 3], ['Fener', 'synonym', 4, 4, ['TR']]] })],
    ['Beşiktaş', 3, 2, O({ al: [['Besiktas', 'spelling', 3, 3], ['Kara Kartallar', 'synonym', 5, 5, ['TR']]] })],
    ['Trabzonspor', 4, 2, O()], ['Başakşehir', 4, 3, O({ al: [['Basaksehir', 'spelling', 4, 4], ['Istanbul Basaksehir', 'synonym', 4, 4]] })],
    ['Konyaspor', 4, 3, O()], ['Sivasspor', 4, 3, O()], ['Antalyaspor', 4, 3, O()], ['Alanyaspor', 4, 3, O()], ['Kayserispor', 4, 3, O()],
    ['Rizespor', 4, 3, O({ al: [['Caykur Rizespor', 'synonym', 5, 4]] })], ['Gaziantep FK', 4, 3, O()], ['Samsunspor', 4, 3, O()],
    ['Bursaspor', 4, 3, O()], ['Göztepe', 4, 3, O({ al: [['Goztepe', 'spelling', 4, 4]] })], ['Kasımpaşa', 4, 4, O({ al: [['Kasimpasa', 'spelling', 5, 5]] })],
    ['Hatayspor', 4, 4, O()], ['Eyüpspor', 5, 4, O({ al: [['Eyupspor', 'spelling', 5, 5]] })], ['Gençlerbirliği', 5, 4, O({ al: [['Genclerbirligi', 'spelling', 5, 5]] })],
    ['Ankaragücü', 5, 4, O({ al: [['Ankaragucu', 'spelling', 5, 5]] })], ['Adana Demirspor', 5, 4, O()], ['Karagümrük', 5, 4, O({ al: [['Karagumruk', 'spelling', 5, 5], ['Fatih Karagumruk', 'synonym', 5, 5]] })],
    ['Eskişehirspor', 5, 4, O()], ['Kocaelispor', 5, 4, O()], ['Sakaryaspor', 5, 5, O()], ['Boluspor', 5, 5, O()], ['Giresunspor', 5, 5, O()],
    ['Denizlispor', 5, 5, O()], ['Pendikspor', 5, 5, O()], ['Bandırmaspor', 5, 5, O()],
  ],

  middle_eastern_pastimes: [
    ['backgammon', 2, 3], ['falconry', 3, 2], ['camel racing', 3, 1], ['baloot', 5, 3],
    ['hookah', 2, 3, { g: 'water pipe', al: [['shisha', 'synonym', 3, 3, [], { g: 'water pipe' }], ['narguile', 'synonym', 5, 5], ['water pipe', 'synonym', 3, 4]] }],
    ['tawla', 5, 2, { al: [['tavla', 'spelling', 5, 3, ['TR']]] }], ['dominoes', 2, 4], ['dama', 5, 3, { g: 'checkers game' }], ['mancala', 3, 3, { al: [['mangala', 'spelling', 5, 4]] }],
    ['okey', 5, 3, { g: 'tile game' }], ['oil wrestling', 3, 2, { al: [['yağlı güreş', 'synonym', 5, 4, ['TR']]] }], ['jereed', 5, 3], ['horse archery', 3, 3],
    ['saluki racing', 5, 3], ['dune bashing', 3, 2], ['sand skiing', 3, 3], ['pearl diving', 3, 3], ['zurkhaneh', 5, 4],
    ['rummy', 2, 4], ['senet', 5, 4], ['tarneeb', 5, 3], ['sheesh besh', 5, 3], ['camel wrestling', 4, 3], ['hawking', 3, 3],
  ],

  african_soccer_clubs: [
    ['Al Ahly', 4, 2, O({ al: [['Al-Ahly', 'spelling', 4, 4]] })], ['Zamalek', 4, 2, O()], ['Kaizer Chiefs', 3, 2, O()], ['Orlando Pirates', 3, 2, O()],
    ['Mamelodi Sundowns', 4, 2, O({ al: [['Sundowns', 'synonym', 4, 3]] })], ['TP Mazembe', 4, 2, O({ al: [['Mazembe', 'synonym', 4, 3]] })],
    ['Wydad Casablanca', 5, 3, O({ al: [['Wydad', 'synonym', 5, 4]] })], ['Raja Casablanca', 5, 3, O({ al: [['Raja Club Athletic', 'synonym', 5, 4]] })],
    ['Espérance', 5, 3, O({ al: [['Esperance Tunis', 'synonym', 5, 3]] })], ['Asante Kotoko', 5, 3, O()], ['Hearts of Oak', 4, 3, O()],
    ['Enyimba', 5, 3, O()], ['Simba SC', 5, 3, O()], ['Young Africans', 5, 3, O({ al: [['Yanga', 'synonym', 5, 4]] })], ['Étoile du Sahel', 5, 4, O({ al: [['Etoile du Sahel', 'spelling', 5, 5]] })],
    ['Club Africain', 5, 4, O()], ['JS Kabylie', 5, 4, O()], ['CR Belouizdad', 5, 5, O()], ['Pyramids FC', 5, 3, O()], ['Al Masry', 5, 4, O()],
    ['Gor Mahia', 5, 3, O()], ['Rangers International', 5, 5, O()], ['Plateau United', 5, 5, O()], ['AS Vita Club', 5, 4, O()], ['SuperSport United', 4, 3, O()],
    ['Cape Town City', 5, 4, O()], ['Stellenbosch FC', 5, 5, O()], ['Horoya AC', 5, 5, O()], ['CS Sfaxien', 5, 4, O()], ['Al Merrikh', 5, 4, O()], ['Petro de Luanda', 5, 4, O()],
    ['Kano Pillars', 5, 5, O()], ['Lobi Stars', 5, 5, O()],
  ],

  south_asian_games: [
    ['kabaddi', 3, 2], ['kho kho', 4, 2], ['carrom', 3, 2, { al: [['carom', 'spelling', 4, 3, [], { g: 'carrom' }]] }], ['gilli danda', 4, 2, { al: [['danda goli', 'synonym', 5, 4]] }],
    ['pachisi', 4, 2, { al: [['chaupar', 'synonym', 5, 3]] }], ['Ludo', 2, 4], ['snakes and ladders', 1, 4, { al: [['moksha patam', 'synonym', 5, 3]] }],
    ['pallanguzhi', 5, 2], ['lagori', 5, 2, { al: [['seven stones', 'synonym', 4, 3]] }], ['marbles', 1, 4, { g: 'game' }], ['kancha', 5, 3, { al: [['goli', 'synonym', 5, 4]] }],
    ['kite fighting', 3, 3], ['mallakhamba', 5, 3], ['kushti', 4, 3, { al: [['pehlwani', 'synonym', 5, 3]] }], ['kalaripayattu', 4, 3, { al: [['kalari', 'synonym', 5, 4]] }],
    ['chaturanga', 5, 3], ['langdi', 5, 3], ['atya patya', 5, 3], ['lattu', 5, 4, { g: 'spinning top' }], ['antakshari', 4, 4],
    ['chinnidandu', 5, 4], ['vamana guntalu', 5, 4], ['hopscotch', 2, 4],
  ],

  aussie_rules_terms: [
    ['footy', 2, 2, { al: [['Aussie rules', 'synonym', 2, 2, AU]] }], ['mark', 2, 2, { g: 'catch' }], ['goal', 1, 3, { g: 'score' }], ['behind', 2, 2, { g: 'score' }],
    ['handball', 3, 3, { g: 'AFL pass' }], ['ruck', 3, 3], ['ruckman', 4, 3, { al: [['ruckwoman', 'synonym', 4, 4]] }], ['rover', 3, 3, { g: 'AFL position' }], ['ruck-rover', 5, 4],
    ['bounce', 2, 4, { g: 'AFL restart' }], ['boundary', 2, 4, { g: 'AFL line' }], ['goal square', 4, 3], ['full forward', 3, 3], ['full back', 3, 3], ['half-forward flank', 5, 4], ['half-back flank', 5, 4],
    ['forward pocket', 4, 3], ['back pocket', 3, 3], ['wing', 2, 4, { g: 'AFL position' }], ['interchange', 3, 4, { g: 'AFL rotation' }], ['hit-out', 5, 3],
    ['speccy', 4, 2, { al: [['specky', 'spelling', 4, 3], ['screamer', 'synonym', 3, 3, [], { g: 'high mark' }]] }],
    ['banana kick', 4, 3], ['drop punt', 4, 3], ['torpedo', 3, 3, { g: 'AFL kick' }], ['checkside', 5, 3], ['snap', 3, 4, { g: 'AFL kick' }], ['dribble kick', 5, 4],
    ['play on', 3, 3], ['holding the ball', 4, 3], ['free kick', 2, 4], ['siren', 2, 4, { g: 'AFL siren' }], ['goal umpire', 4, 3], ['grand final', 3, 4], ['Brownlow Medal', 4, 2, { type: 'proper' }],
    ['Coleman Medal', 5, 3, { type: 'proper' }], ['inside 50', 5, 3], ['clearance', 4, 4], ['contested possession', 5, 4], ['stab pass', 5, 4], ['sling tackle', 5, 4], ['bag of goals', 5, 4],
    ['MCG', 4, 4, { type: 'acronym' }], ['Gabba', 4, 4, { type: 'place' }], ['flanker', 4, 4], ['centre square', 5, 4], ['rushed behind', 5, 4],
  ],

  afl_clubs: [
    ['Collingwood', 3, 2, O({ al: [['Magpies', 'synonym', 3, 2, [], CLUB], ['Pies', 'synonym', 4, 3, AU, CLUB]] })],
    ['Carlton', 3, 2, O({ g: 'AFL club', al: [['Blues', 'synonym', 3, 3, [], CLUB]] })], ['Essendon', 4, 2, O({ al: [['Bombers', 'synonym', 3, 3, [], CLUB]] })],
    ['Richmond', 3, 2, O({ g: 'AFL club', al: [['Tigers', 'synonym', 2, 3, [], CLUB]] })], ['Hawthorn', 3, 2, O({ g: 'AFL club', al: [['Hawks', 'synonym', 2, 3, [], CLUB]] })],
    ['Geelong Cats', 3, 2, O({ al: [['Geelong', 'synonym', 3, 2, [], CLUB], ['Cats', 'synonym', 2, 3, [], CLUB]] })],
    ['Melbourne Demons', 3, 2, O({ al: [['Demons', 'synonym', 3, 3, [], CLUB]] })], ['North Melbourne', 4, 2, O({ al: [['Kangaroos', 'synonym', 3, 3, [], CLUB], ['Roos', 'synonym', 4, 4, AU]] })],
    ['Western Bulldogs', 3, 2, O({ al: [['Doggies', 'synonym', 4, 4, AU]] })], ['St Kilda', 4, 2, O({ al: [['Saints', 'synonym', 2, 3, [], CLUB]] })],
    ['Sydney Swans', 3, 2, O({ al: [['Swans', 'synonym', 2, 3, [], CLUB]] })], ['West Coast Eagles', 3, 2, O({ al: [['Eagles', 'synonym', 2, 3, [], CLUB]] })],
    ['Adelaide Crows', 3, 2, O({ al: [['Crows', 'synonym', 2, 3, [], CLUB]] })], ['Port Adelaide', 3, 2, O({ al: [['Power', 'synonym', 3, 3, [], CLUB]] })],
    ['Fremantle', 3, 2, O({ g: 'AFL club', al: [['Dockers', 'synonym', 3, 3, [], CLUB]] })], ['Brisbane Lions', 3, 2, O({ al: [['Lions', 'synonym', 1, 3, [], CLUB]] })],
    ['Gold Coast Suns', 3, 2, O({ al: [['Suns', 'synonym', 2, 3, [], CLUB]] })], ['GWS Giants', 4, 3, O({ al: [['Greater Western Sydney', 'synonym', 4, 3], ['Giants', 'synonym', 2, 4, [], CLUB]] })],
    ['Fitzroy', 4, 3, O({ g: 'AFL club' })], ['Brisbane Bears', 5, 4, O()], ['South Melbourne', 5, 4, O({ g: 'AFL club' })], ['Footscray', 4, 4, O({ g: 'AFL club' })],
  ],

  south_american_soccer_clubs: [
    ['Boca Juniors', 2, 1, O({ al: [['Boca', 'synonym', 3, 2, [], { g: 'Argentine club' }]] })], ['River Plate', 2, 1, O()], ['Flamengo', 2, 1, O()], ['Corinthians', 3, 2, O()],
    ['Palmeiras', 3, 2, O()], ['Santos', 2, 2, O({ g: 'Brazilian club' })], ['São Paulo', 2, 3, O({ g: 'Brazilian club', al: [['Sao Paulo FC', 'spelling', 3, 3]] })], ['Grêmio', 3, 3, O({ al: [['Gremio', 'spelling', 3, 3]] })],
    ['Internacional', 3, 3, O({ g: 'Brazilian club' })], ['Cruzeiro', 3, 3, O()], ['Atlético Mineiro', 4, 3, O({ al: [['Atletico Mineiro', 'spelling', 4, 3], ['Galo', 'synonym', 5, 5, ['BR'], { g: 'Brazilian club' }]] })],
    ['Fluminense', 3, 3, O()], ['Vasco da Gama', 3, 3, O({ al: [['Vasco', 'synonym', 4, 4, [], { g: 'Brazilian club' }]] })], ['Botafogo', 3, 3, O()], ['Peñarol', 3, 3, O({ al: [['Penarol', 'spelling', 3, 3]] })],
    ['Nacional', 4, 4, O({ g: 'Uruguayan club' })], ['Independiente', 3, 3, O()], ['Racing Club', 3, 3, O()], ['San Lorenzo', 3, 3, O()], ['Estudiantes', 3, 3, O()],
    ['Vélez Sarsfield', 4, 3, O({ al: [['Velez Sarsfield', 'spelling', 4, 4]] })], ['Newell\'s Old Boys', 4, 3, O()], ['Rosario Central', 4, 3, O()], ['Colo-Colo', 4, 3, O()],
    ['Universidad de Chile', 4, 3, O()], ['Olimpia', 4, 4, O({ g: 'Paraguayan club' })], ['Cerro Porteño', 5, 4, O({ al: [['Cerro Porteno', 'spelling', 5, 5]] })], ['Libertad', 5, 5, O({ g: 'Paraguayan club' })],
    ['LDU Quito', 5, 4, O()], ['Barcelona SC', 4, 3, O()], ['Millonarios', 4, 4, O()], ['Atlético Nacional', 4, 3, O({ al: [['Atletico Nacional', 'spelling', 4, 4]] })], ['América de Cali', 5, 4, O()],
    ['Alianza Lima', 4, 4, O()], ['Universitario', 5, 4, O()], ['Sporting Cristal', 5, 4, O()], ['Bolívar', 5, 4, O({ g: 'Bolivian club', al: [['Bolivar', 'spelling', 5, 5, [], { g: 'Bolivian club' }]] })],
    ['The Strongest', 5, 4, O()],
  ],

  capoeira_words: [
    ['capoeira', 3, 1], ['roda', 5, 2, { g: 'capoeira circle' }], ['ginga', 5, 2], ['berimbau', 4, 2], ['atabaque', 5, 3], ['pandeiro', 4, 3, { g: 'tambourine' }],
    ['agogô', 5, 3, { al: [['agogo', 'spelling', 4, 4]] }], ['reco-reco', 5, 3], ['caxixi', 5, 3], ['mestre', 4, 3, { g: 'capoeira master' }], ['capoeirista', 4, 2], ['aú', 5, 3, { g: 'cartwheel' }],
    ['rasteira', 5, 3], ['meia lua de frente', 5, 3], ['armada', 5, 3, { g: 'capoeira kick' }], ['bênção', 5, 3, { g: 'capoeira kick' }], ['queixada', 5, 3], ['martelo', 5, 3, { g: 'capoeira kick' }],
    ['negativa', 5, 3], ['rolê', 5, 3], ['esquiva', 5, 3], ['cocorinha', 5, 3], ['malícia', 5, 3, { al: [['malicia', 'spelling', 5, 4]] }], ['jogo', 5, 4, { g: 'capoeira game' }], ['bateria', 5, 3, { g: 'capoeira band' }],
    ['ladainha', 5, 3], ['corrido', 5, 3], ['batizado', 5, 3], ['cordão', 5, 3, { al: [['corda', 'synonym', 5, 3]] }], ['mandinga', 5, 3], ['capoeira Angola', 5, 3, { type: 'proper' }], ['capoeira Regional', 5, 3, { type: 'proper' }],
    ['Mestre Bimba', 5, 3, { type: 'person' }], ['Mestre Pastinha', 5, 3, { type: 'person' }], ['chamada', 5, 3, { g: 'capoeira call' }], ['volta ao mundo', 5, 3], ['meia-lua', 5, 4],
  ],

  highland_games: [
    ['caber toss', 3, 1, { al: [['tossing the caber', 'synonym', 3, 1], ['caber', 'synonym', 3, 2]] }], ['hammer throw', 2, 2], ['stone put', 3, 2, { al: [['putting the stone', 'synonym', 4, 3], ['Braemar stone', 'synonym', 5, 3]] }],
    ['weight over the bar', 4, 2], ['weight for distance', 4, 2], ['sheaf toss', 4, 2], ['tug of war', 1, 3], ['hill race', 3, 2], ['Highland dancing', 3, 1], ['piping', 3, 2],
    ['pipe band', 2, 1], ['bagpipes', 1, 2], ['kilt', 1, 2], ['Highland fling', 3, 1], ['sword dance', 3, 2], ['Scottish dancing', 3, 2], ['Braemar Gathering', 4, 2, { type: 'proper' }],
    ['Cowal Gathering', 5, 3, { type: 'proper' }], ['heavy events', 4, 2], ['light events', 5, 3], ['clan tent', 4, 4], ['tartan', 1, 3],
    ['haggis hurling', 4, 3], ['welly wanging', 4, 4], ['Seann Triubhas', 5, 3], ['heavies', 5, 4],
  ],

  british_pub_games: [
    ['darts', 1, 1], ['pool', 1, 2, { g: 'cue sport' }], ['snooker', 2, 2], ['skittles', 2, 2, { g: 'game' }], ['dominoes', 1, 2], ['cribbage', 3, 2, { al: [['crib', 'synonym', 3, 2, [], { g: 'card game' }]] }],
    ['shove ha\'penny', 4, 2, { al: [['shove halfpenny', 'spelling', 4, 3]] }], ['bar billiards', 4, 2], ['bar skittles', 4, 2], ['table skittles', 4, 2], ['table football', 2, 2, { al: [['foosball', 'synonym', 2, 3]] }],
    ['quoits', 4, 3], ['aunt sally', 4, 2], ['bat and trap', 4, 2], ['toad in the hole', 4, 2, { g: 'pub game' }], ['devil among the tailors', 5, 3], ['ring the bull', 4, 2, { al: [['bull and ring', 'synonym', 5, 3]] }],
    ['pub quiz', 1, 1], ['shut the box', 4, 3], ['nine men\'s morris', 4, 3], ['spoof', 4, 3, { g: 'guessing game' }], ['fruit machine', 2, 3], ['arm wrestling', 2, 3], ['three-card brag', 4, 3, { al: [['brag', 'synonym', 4, 3]] }],
    ['shuffleboard', 3, 3], ['whist', 3, 3], ['euchre', 5, 4], ['dwile flonking', 5, 3], ['hood skittles', 5, 4], ['killer', 3, 4, { g: 'darts game' }],
  ],
};

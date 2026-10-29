// Generated word data: Sports & Games, chunk 1 of the deeper themes (soccer positions ... pinball words).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const team = lg => (rows) => rows.map(([t, r, i, o = {}]) => [t, r, i, { g: lg + ' team', type: 'org', ...o }]);
const nba = team('NBA'), nfl = team('NFL'), mlb = team('MLB'), nhl = team('NHL');
const club = (t, r, i, o = {}) => [t, r, i, { g: 'soccer club', type: 'org', ...o }];
const syn = (t, r, i, o) => [t, 'synonym', r, i, [], o];

export const THEMES = {
  soccer_positions: { d: 1 }, european_soccer_clubs: { d: 2 }, nba_teams: { d: 2 }, nfl_teams: { d: 2 }, american_football_positions: { d: 2 },
  mlb_teams: { d: 3 }, baseball_positions: { d: 2 }, baseball_bases: { d: 1 }, cricket_dismissals: { d: 4 }, tennis_shots: { d: 2 },
  tennis_grand_slams: { d: 2 }, golf_majors: { d: 3 }, main_swimming_strokes: { d: 1 }, figure_skating_moves: { d: 3 }, nhl_teams: { d: 3 },
  japanese_martial_arts: { d: 3 }, chinese_martial_arts: { d: 3 }, boxing_weight_classes: { d: 3 }, sumo_words: { d: 5 }, decathlon_events: { d: 3 },
  gymnastics_apparatus: { d: 3 }, gymnastics_moves: { d: 3 }, famous_marathons: { d: 4 }, fishing_tackle: { d: 3 }, poker_betting_rounds: { d: 3 },
  poker_hands: { d: 2 }, asian_board_games: { d: 4 }, chess_openings: { d: 5 }, famous_chess_players: { d: 3 }, pinball_words: { d: 4 },
};

// Existing single-meaning entries that now share their text with a sports meaning get a label first.
export const FIXES = [
  { gloss: ['Barcelona', 'cities', 'city'] }, { gloss: ['Liverpool', 'european_cities', 'city'] }, { gloss: ['Arsenal', 'words_from_arabic', 'dockyard'] },
  { gloss: ['Chelsea', 'names_that_are_places', 'name'] }, { gloss: ['Bucks', 'money_slang', 'dollars'] }, { gloss: ['Magic', 'wizard_words', 'sorcery'] },
  { gloss: ['Thunder', 'weather', 'storm'] }, { gloss: ['Flames', 'wildfire_words', 'fire'] }, { gloss: ['Lightning', 'weather', 'storm'] },
  { gloss: ['Stars', 'nature_at_night', 'sky'] }, { gloss: ['Kraken', 'mythology', 'sea monster'] }, { gloss: ['Twins', 'babies_and_birth', 'siblings'] },
  { gloss: ['Rockies', 'mountains', 'mountain range'] }, { gloss: ['Athletics', 'olympic_sports', 'sport'] }, { gloss: ['punter', 'words_for_a_person', 'gambler'] },
  { gloss: ['libero', 'volleyball_terms', 'volleyball'] }, { gloss: ['stopper', 'door_blank', 'door'] }, { gloss: ['iron cross', 'medals_and_honors', 'medal'] },
  { gloss: ['ribbon', 'fabrics_and_sewing', 'fabric strip'] }, { gloss: ['spoon', 'table_setting', 'cutlery'] }, { gloss: ['popper', 'fastenings', 'fastener'] },
  { gloss: ['praying mantis', 'insects_and_bugs', 'insect'] }, { gloss: ['saucer', 'table_setting', 'dish'] }, { gloss: ['wingback', 'seating', 'chair'] }, { gloss: ['Blues', 'music_genres', 'music'] },
];

export const DATA = {
  // ---------------------------------------------------------------- soccer positions
  soccer_positions: [
    ['goalkeeper', 1, 1], ['defender', 1, 1], ['midfielder', 1, 1], ['striker', 1, 1], ['winger', 2, 1], ['forward', 1, 2, { g: 'soccer' }],
    ['sweeper', 3, 2, { g: 'soccer' }], ['playmaker', 3, 3], ['left back', 3, 2], ['right back', 3, 2], ['wing-back', 4, 3],
    ['centre-back', 3, 2, { al: [['center back', 'spelling', 3, 2, ['US']], syn('central defender', 3, 3)] }],
    ['center forward', 3, 2, { al: [['centre forward', 'spelling', 3, 2, ['UK']], syn('number nine', 4, 4)] }],
    ['libero', 4, 3, { g: 'soccer' }], ['attacking midfielder', 3, 3], ['defensive midfielder', 3, 3], ['holding midfielder', 4, 3],
    ['central midfielder', 3, 3], ['wide midfielder', 4, 3], ['second striker', 4, 3], ['target man', 4, 3], ['poacher', 4, 4, { g: 'soccer' }],
    ['stopper', 4, 4, { g: 'soccer' }], ['false nine', 5, 4], ['inside forward', 5, 4], ['box-to-box midfielder', 5, 4], ['sweeper keeper', 5, 4],
    ['trequartista', 5, 5, { pos: 'noun' }],
  ],

  // ---------------------------------------------------------------- european soccer clubs
  european_soccer_clubs: [
    club('Real Madrid', 1, 1), club('Barcelona', 1, 1), club('Manchester United', 1, 1, { al: [['Man United', 'short form', 2, 2, ['UK'], { g: 'soccer club' }]] }),
    club('Liverpool', 1, 1), club('Arsenal', 1, 1), club('Chelsea', 1, 1), club('Bayern Munich', 2, 2, {}),
    club('Juventus', 2, 2), club('AC Milan', 2, 2), club('Inter Milan', 2, 2), club('Manchester City', 2, 2), club('Tottenham', 3, 2, { al: [['Spurs', 'synonym', 3, 3, ['UK'], { g: 'soccer club' }]] }),
    club('Paris Saint-Germain', 3, 3, { al: [['PSG', 'short form', 3, 3, [], { g: 'soccer club', type: 'acronym' }]] }),
    club('Ajax', 2, 3), club('Atletico Madrid', 3, 3), club('Borussia Dortmund', 3, 3), club('Celtic', 3, 3), club('Rangers', 3, 3),
    club('Everton', 3, 2), club('Aston Villa', 3, 3), club('West Ham', 3, 3), club('Benfica', 3, 3), club('Porto', 3, 3), club('Valencia', 3, 3),
    club('AS Roma', 3, 3), club('Napoli', 4, 3), club('Sevilla', 4, 3), club('Olympique Marseille', 4, 3), club('Bayer Leverkusen', 4, 3), club('Feyenoord', 4, 3),
    club('PSV Eindhoven', 4, 3), club('Sporting Lisbon', 4, 3), ['Fenerbahçe', 4, 3], ['Galatasaray', 4, 3],
    club('Real Sociedad', 5, 4), club('Olympiacos', 5, 4), club('Anderlecht', 5, 4), club('Red Star Belgrade', 5, 4), club('Dynamo Kyiv', 5, 4), club('Shakhtar Donetsk', 5, 5),
  ],

  // ---------------------------------------------------------------- NBA teams
  nba_teams: nba([
    ['Lakers', 1, 1], ['Celtics', 2, 1], ['Bulls', 1, 1], ['Warriors', 2, 1], ['Knicks', 2, 1, {}], ['Heat', 1, 1], ['Spurs', 2, 2], ['Nets', 2, 2],
    ['Clippers', 2, 2], ['Suns', 2, 2], ['Rockets', 2, 2], ['Bucks', 3, 2], ['Raptors', 3, 2], ['Mavericks', 3, 2], ['76ers', 3, 2, { al: [['Sixers', 'short form', 3, 3, [], { g: 'NBA team' }]] }],
    ['Nuggets', 3, 2], ['Jazz', 2, 2], ['Thunder', 2, 2], ['Timberwolves', 3, 3], ['Grizzlies', 3, 3], ['Pelicans', 3, 3], ['Hornets', 3, 3], ['Hawks', 3, 3],
    ['Pacers', 3, 3], ['Pistons', 3, 3], ['Cavaliers', 3, 3, { al: [['Cavs', 'short form', 3, 3, [], { g: 'NBA team' }]] }], ['Magic', 2, 3], ['Wizards', 3, 3],
    ['Kings', 3, 3], ['Trail Blazers', 3, 3, { al: [['Blazers', 'short form', 3, 3, [], { g: 'NBA team' }]] }],
  ]),

  // ---------------------------------------------------------------- NFL teams
  nfl_teams: nfl([
    ['Patriots', 1, 1], ['Cowboys', 1, 1], ['Packers', 2, 1], ['Steelers', 2, 1], ['49ers', 2, 1, { al: [['Niners', 'short form', 3, 3, [], { g: 'NFL team' }]] }],
    ['Giants', 1, 2], ['Jets', 2, 2], ['Eagles', 1, 2], ['Bears', 1, 2], ['Lions', 1, 2], ['Vikings', 2, 2], ['Raiders', 2, 2], ['Chiefs', 2, 1],
    ['Broncos', 2, 2], ['Chargers', 3, 2], ['Dolphins', 2, 2], ['Bills', 3, 2], ['Ravens', 3, 2], ['Bengals', 3, 2], ['Browns', 3, 2], ['Texans', 3, 2],
    ['Colts', 3, 2], ['Jaguars', 3, 2], ['Titans', 3, 2], ['Saints', 3, 2], ['Falcons', 3, 2], ['Panthers', 2, 3], ['Buccaneers', 3, 3],
    ['Seahawks', 3, 3], ['Cardinals', 2, 3], ['Rams', 3, 3], ['Commanders', 4, 3],
  ]),

  // ---------------------------------------------------------------- American football positions
  american_football_positions: [
    ['quarterback', 1, 1, { al: [['QB', 'short form', 2, 2, [], { type: 'acronym' }]] }], ['running back', 2, 1], ['wide receiver', 2, 1], ['tight end', 2, 1],
    ['linebacker', 2, 1], ['cornerback', 2, 1], ['safety', 2, 2, { g: 'american football' }], ['kicker', 2, 2, { g: 'football' }], ['punter', 2, 2, { g: 'football' }],
    ['fullback', 3, 2], ['halfback', 3, 2], ['center', 2, 2, { g: 'american football' }], ['guard', 2, 3, { g: 'american football' }], ['tackle', 2, 3, { g: 'american football' }],
    ['defensive end', 3, 2], ['defensive tackle', 3, 3], ['nose tackle', 4, 3], ['free safety', 4, 3], ['strong safety', 4, 3], ['middle linebacker', 3, 3],
    ['outside linebacker', 3, 3], ['slot receiver', 4, 3], ['defensive back', 3, 3], ['offensive lineman', 3, 3], ['long snapper', 4, 4], ['holder', 4, 4, { g: 'football' }],
    ['kick returner', 4, 4], ['edge rusher', 4, 4], ['wingback', 5, 4, { g: 'football' }],
  ],

  // ---------------------------------------------------------------- MLB teams
  mlb_teams: mlb([
    ['Yankees', 1, 1], ['Red Sox', 2, 1], ['Dodgers', 2, 1], ['Cubs', 2, 1], ['Giants', 2, 2], ['Cardinals', 2, 2], ['Mets', 2, 1], ['Braves', 2, 2],
    ['Astros', 2, 2], ['Phillies', 3, 2], ['Padres', 3, 2], ['Mariners', 3, 2], ['Orioles', 3, 2], ['Blue Jays', 2, 2], ['Rays', 3, 2], ['Twins', 2, 3],
    ['Tigers', 2, 2], ['White Sox', 3, 2], ['Royals', 3, 3], ['Guardians', 3, 3], ['Rockies', 3, 3], ['Diamondbacks', 3, 3], ['Brewers', 3, 3],
    ['Reds', 3, 3], ['Pirates', 2, 3], ['Marlins', 3, 3], ['Nationals', 3, 3], ['Angels', 2, 3], ['Athletics', 3, 3], ['Rangers', 3, 3],
  ]),

  // ---------------------------------------------------------------- baseball positions (closed set)
  baseball_positions: [
    ['pitcher', 1, 1, { g: 'baseball position' }], ['catcher', 1, 1], ['shortstop', 2, 1],
    ['first baseman', 2, 2, { al: [['first sacker', 'synonym', 5, 5]] }], ['second baseman', 2, 2], ['third baseman', 2, 2], ['left fielder', 3, 2],
    ['center fielder', 3, 2, { al: [['centre fielder', 'spelling', 4, 3, ['UK']]] }], ['right fielder', 3, 2],
  ],

  // ---------------------------------------------------------------- baseball bases (closed set)
  baseball_bases: [
    ['first base', 1, 1], ['second base', 1, 1], ['third base', 1, 1, { al: [['hot corner', 'synonym', 4, 4, ['US']]] }],
    ['home plate', 1, 1, { al: [['home base', 'synonym', 3, 3]] }],
  ],

  // ---------------------------------------------------------------- cricket dismissals (closed set)
  cricket_dismissals: [
    ['bowled', 3, 2, { g: 'cricket', pos: 'verb' }], ['caught', 3, 3, { g: 'cricket', pos: 'verb' }], ['LBW', 4, 3, { type: 'acronym', al: [['leg before wicket', 'synonym', 4, 3, [], { type: 'common' }]] }],
    ['run out', 3, 3, { g: 'cricket' }], ['stumped', 3, 3, { g: 'cricket', pos: 'verb' }], ['hit wicket', 5, 4],
  ],

  // ---------------------------------------------------------------- tennis shots
  tennis_shots: [
    ['serve', 1, 1, { g: 'tennis' }], ['forehand', 2, 1], ['backhand', 2, 1], ['volley', 2, 2, { g: 'tennis' }], ['lob', 3, 2, { g: 'tennis' }],
    ['smash', 2, 2, { g: 'tennis' }], ['ace', 2, 2, { g: 'tennis' }], ['drop shot', 3, 2], ['slice', 3, 3, { g: 'tennis' }], ['topspin', 3, 3],
    ['return', 2, 3, { g: 'tennis' }], ['passing shot', 4, 3], ['half volley', 4, 3], ['groundstroke', 4, 3], ['approach shot', 4, 3],
    ['kick serve', 4, 4], ['cross-court', 4, 4, { g: 'tennis' }], ['down the line', 4, 4, { g: 'tennis' }], ['underarm serve', 4, 4], ['tweener', 5, 5],
    ['overhead smash', 4, 3], ['backhand slice', 4, 4], ['swinging volley', 5, 5], ['moonball', 5, 5],
  ],

  // ---------------------------------------------------------------- tennis grand slams (closed set)
  tennis_grand_slams: [
    ['Wimbledon', 1, 1], ['US Open', 2, 2, { g: 'tennis' }], ['French Open', 2, 2], ['Australian Open', 2, 2],
  ],

  // ---------------------------------------------------------------- golf majors (closed set)
  golf_majors: [
    ['The Masters', 2, 1, { g: 'golf' }], ['US Open', 2, 2, { g: 'golf' }], ['PGA Championship', 3, 2, { type: 'proper' }],
    ['The Open Championship', 4, 3, { type: 'proper', al: [['British Open', 'synonym', 3, 2, [], { type: 'proper' }], ['The Open', 'short form', 3, 3, [], { type: 'proper' }]] }],
  ],

  // ---------------------------------------------------------------- main swimming strokes (closed set)
  main_swimming_strokes: [
    ['freestyle', 1, 1, { g: 'swimming' }], ['backstroke', 1, 1], ['breaststroke', 1, 1], ['butterfly', 1, 1, { g: 'swimming' }],
  ],

  // ---------------------------------------------------------------- figure skating moves
  figure_skating_moves: [
    ['axel', 2, 2], ['lutz', 3, 2], ['salchow', 3, 2], ['toe loop', 4, 3], ['flip', 2, 3, { g: 'skating' }], ['loop', 2, 3, { g: 'skating' }],
    ['camel spin', 2, 2], ['sit spin', 3, 2], ['layback spin', 4, 3], ['spiral', 3, 3, { g: 'skating' }], ['death spiral', 3, 2], ['spread eagle', 3, 3, { g: 'skating' }],
    ['triple axel', 3, 2], ['quad', 3, 3, { g: 'skating' }], ['lift', 2, 3, { g: 'skating' }], ['throw jump', 4, 3], ['step sequence', 4, 3],
    ['twizzle', 4, 3], ['crossover', 3, 4, { g: 'skating' }], ['mohawk', 3, 4, { g: 'skating' }], ['three turn', 4, 4], ['Ina Bauer', 4, 4, { type: 'proper' }],
    ['Biellmann', 5, 4], ['flying camel', 4, 4], ['pair spin', 4, 4], ['rocker', 4, 5, { g: 'skating' }], ['bracket', 4, 5, { g: 'skating' }],
  ],

  // ---------------------------------------------------------------- NHL teams
  nhl_teams: nhl([
    ['Bruins', 2, 2], ['Canadiens', 3, 2, { al: [['Habs', 'short form', 4, 4, ['CA'], { g: 'NHL team' }]] }], ['Maple Leafs', 2, 1, { al: [['Leafs', 'short form', 3, 3, ['CA'], { g: 'NHL team' }]] }],
    ['Rangers', 3, 2], ['Red Wings', 2, 2], ['Blackhawks', 3, 2], ['Penguins', 2, 2], ['Flyers', 3, 2], ['Oilers', 3, 2], ['Flames', 2, 2], ['Canucks', 3, 2],
    ['Senators', 3, 3], ['Sabres', 3, 3], ['Islanders', 3, 3], ['Devils', 2, 3], ['Capitals', 3, 3], ['Hurricanes', 3, 3], ['Lightning', 2, 3],
    ['Panthers', 2, 3], ['Predators', 3, 3], ['Blues', 3, 3], ['Stars', 2, 3], ['Avalanche', 3, 3], ['Wild', 3, 3], ['Kings', 3, 3], ['Ducks', 2, 3],
    ['Sharks', 2, 3], ['Golden Knights', 3, 3], ['Kraken', 3, 3], ['Jets', 2, 3], ['Blue Jackets', 4, 3],
  ]),

  // ---------------------------------------------------------------- Japanese martial arts
  japanese_martial_arts: [
    ['judo', 1, 1], ['karate', 1, 1], ['sumo', 1, 2], ['aikido', 2, 2], ['kendo', 2, 2], ['jujutsu', 3, 2], ['jiu-jitsu', 2, 3], ['ninjutsu', 3, 3],
    ['iaido', 4, 3], ['kyudo', 4, 3], ['budo', 4, 3], ['kenjutsu', 4, 4], ['naginata', 4, 4], ['kyokushin', 4, 4], ['shotokan', 3, 4], ['bojutsu', 4, 4],
    ['goju-ryu', 4, 4], ['jodo', 5, 5], ['kobudo', 5, 5], ['sojutsu', 5, 5], ['shorinji kempo', 5, 5], ['wado-ryu', 5, 5], ['shito-ryu', 5, 5], ['tessenjutsu', 5, 5],
  ],

  // ---------------------------------------------------------------- Chinese martial arts
  chinese_martial_arts: [
    ['kung fu', 1, 1], ['tai chi', 2, 2, { al: [['tai chi chuan', 'synonym', 4, 3]] }], ['wing chun', 3, 2], ['wushu', 3, 2], ['shaolin kung fu', 3, 2],
    ['drunken boxing', 4, 3], ['Jeet Kune Do', 4, 4, { type: 'proper' }], ['sanda', 4, 4, { al: [['sanshou', 'synonym', 5, 5]] }], ['hung gar', 4, 4],
    ['praying mantis', 4, 4, { g: 'kung fu' }], ['white crane', 5, 4, { g: 'kung fu' }], ['eagle claw', 5, 4, { g: 'kung fu' }], ['baguazhang', 5, 5, { al: [['bagua', 'short form', 5, 5]] }],
    ['xingyiquan', 5, 5, { al: [['xingyi', 'short form', 5, 5]] }], ['choy li fut', 5, 5], ['chin na', 5, 5], ['shuai jiao', 5, 5], ['monkey style', 5, 4],
  ],

  // ---------------------------------------------------------------- boxing weight classes
  boxing_weight_classes: [
    ['heavyweight', 1, 1], ['lightweight', 2, 2], ['middleweight', 2, 2], ['welterweight', 3, 2], ['featherweight', 3, 2], ['flyweight', 3, 2],
    ['bantamweight', 3, 2], ['cruiserweight', 3, 2], ['light heavyweight', 3, 2], ['super middleweight', 4, 3],
    ['light welterweight', 4, 3, { al: [['super lightweight', 'synonym', 4, 3], ['junior welterweight', 'synonym', 5, 4]] }],
    ['super welterweight', 4, 3, { al: [['light middleweight', 'synonym', 4, 3]] }], ['super featherweight', 4, 3], ['super bantamweight', 5, 4],
    ['light flyweight', 5, 4], ['super flyweight', 5, 4], ['strawweight', 5, 4, { al: [['minimumweight', 'synonym', 5, 5]] }], ['atomweight', 5, 5],
    ['super heavyweight', 4, 4], ['junior lightweight', 5, 4],
  ],

  // ---------------------------------------------------------------- sumo words
  sumo_words: [
    ['sumo', 1, 1], ['yokozuna', 3, 2], ['rikishi', 3, 2], ['sumo wrestler', 2, 2], ['mawashi', 3, 3], ['dohyo', 4, 3],
    ['basho', 4, 3, { g: 'sumo tournament' }], ['chanko nabe', 4, 3], ['ozeki', 4, 3], ['banzuke', 5, 4], ['sekiwake', 5, 4], ['komusubi', 5, 4],
    ['maegashira', 5, 4], ['juryo', 5, 4], ['chonmage', 5, 4], ['shiko', 5, 4], ['makuuchi', 5, 5], ['makushita', 5, 5], ['sandanme', 5, 5],
    ['jonidan', 5, 5], ['jonokuchi', 5, 5], ['tachiai', 5, 5], ['kimarite', 5, 5], ['gyoji', 5, 5], ['heya', 5, 5, { al: [['sumo stable', 'synonym', 4, 4]] }],
    ['oyakata', 5, 5], ['shikona', 5, 5], ['yorikiri', 5, 5], ['oshidashi', 5, 5],
  ],

  // ---------------------------------------------------------------- decathlon events (closed set)
  decathlon_events: [
    ['100 meters', 2, 2], ['long jump', 2, 2], ['shot put', 2, 2, { g: 'event' }], ['high jump', 2, 2], ['400 meters', 2, 3], ['110 meter hurdles', 3, 3, { al: [['110 metres hurdles', 'spelling', 4, 4, ['UK']]] }],
    ['discus', 2, 3, { g: 'sport' }], ['pole vault', 2, 2], ['javelin', 2, 3, { g: 'sport' }], ['1500 meters', 3, 3],
  ],

  // ---------------------------------------------------------------- gymnastics apparatus
  gymnastics_apparatus: [
    ['balance beam', 2, 1, { g: 'gymnastics' }], ['vault', 2, 2, { g: 'gymnastics' }], ['uneven bars', 2, 2], ['parallel bars', 2, 2], ['pommel horse', 2, 2],
    ['still rings', 3, 2], ['floor exercise', 3, 2], ['horizontal bar', 3, 2], ['high bar', 3, 2], ['trampoline', 1, 2], ['springboard', 3, 3],
    ['hoop', 2, 3, { g: 'rhythmic gymnastics' }], ['ribbon', 2, 3, { g: 'rhythmic gymnastics' }], ['clubs', 3, 4, { g: 'rhythmic gymnastics' }],
    ['ball', 1, 4, { g: 'rhythmic gymnastics' }], ['rope', 2, 4, { g: 'rhythmic gymnastics' }], ['mat', 2, 3, { g: 'gymnastics' }], ['crash mat', 3, 3],
    ['spring floor', 4, 3], ['tumbling track', 4, 4], ['vaulting table', 5, 4],
  ],

  // ---------------------------------------------------------------- gymnastics moves
  gymnastics_moves: [
    ['cartwheel', 1, 1], ['handstand', 1, 1], ['somersault', 1, 1], ['backflip', 1, 1], ['splits', 2, 2], ['round-off', 3, 2], ['handspring', 3, 2],
    ['walkover', 3, 2], ['front flip', 2, 2], ['back handspring', 3, 2], ['front handspring', 3, 3], ['back tuck', 3, 3], ['front tuck', 3, 3], ['split leap', 3, 3],
    ['straddle', 3, 3, { g: 'gymnastics' }], ['tuck', 2, 3, { g: 'body position' }], ['pike', 3, 3, { g: 'body position' }], ['layout', 3, 3, { g: 'gymnastics' }],
    ['bridge', 2, 3, { g: 'gymnastics' }], ['twist', 2, 3, { g: 'gymnastics' }], ['dismount', 3, 3], ['kip', 4, 3, { g: 'gymnastics' }], ['giant swing', 4, 3],
    ['aerial', 4, 3, { g: 'gymnastics' }], ['planche', 4, 4], ['iron cross', 3, 4, { g: 'gymnastics' }], ['Yurchenko', 5, 4], ['Tsukahara', 5, 5, { type: 'proper' }],
    ['Produnova', 5, 5, { type: 'proper' }], ['double back', 4, 4, { g: 'gymnastics' }],
  ],

  // ---------------------------------------------------------------- famous marathons
  famous_marathons: [
    ['Boston Marathon', 2, 1], ['London Marathon', 2, 1], ['New York City Marathon', 2, 1, { al: [['NYC Marathon', 'short form', 3, 2, [], { type: 'proper' }]] }],
    ['Berlin Marathon', 3, 2], ['Chicago Marathon', 3, 2], ['Tokyo Marathon', 3, 2], ['Olympic Marathon', 2, 2, { type: 'proper' }], ['Paris Marathon', 3, 3, { type: 'proper' }],
    ['Athens Marathon', 4, 3, { type: 'proper' }], ['Comrades Marathon', 4, 3], ['Honolulu Marathon', 4, 3, { type: 'proper' }], ['Los Angeles Marathon', 4, 3, { type: 'proper' }],
    ['Rome Marathon', 4, 4, { type: 'proper' }], ['Sydney Marathon', 4, 4, { type: 'proper' }], ['Marathon des Sables', 4, 4, { type: 'proper' }],
    ['Marine Corps Marathon', 5, 4, { type: 'proper' }], ['Big Sur Marathon', 5, 4, { type: 'proper' }], ['Rotterdam Marathon', 5, 4, { type: 'proper' }],
    ['Amsterdam Marathon', 5, 4, { type: 'proper' }], ['Valencia Marathon', 5, 4, { type: 'proper' }], ['Dubai Marathon', 5, 4, { type: 'proper' }],
    ['Great Wall Marathon', 5, 4, { type: 'proper' }], ['Two Oceans Marathon', 5, 5, { type: 'proper' }], ['Medoc Marathon', 5, 5, { type: 'proper' }],
    ['Twin Cities Marathon', 5, 5, { type: 'proper' }], ['Everest Marathon', 5, 5, { type: 'proper' }],
  ],

  // ---------------------------------------------------------------- fishing tackle
  fishing_tackle: [
    ['rod', 1, 1, { g: 'fishing' }], ['reel', 1, 1, { g: 'fishing' }], ['line', 1, 2, { g: 'fishing' }], ['hook', 1, 2, { g: 'fishing' }], ['bait', 1, 1],
    ['lure', 2, 1], ['net', 1, 2, { g: 'fishing' }], ['bobber', 2, 2], ['float', 2, 2, { g: 'fishing' }], ['sinker', 2, 2, { g: 'fishing' }], ['tackle box', 2, 1],
    ['fly', 2, 3, { g: 'fishing' }], ['spinner', 3, 3, { g: 'lure' }], ['jig', 3, 3, { g: 'lure' }], ['spoon', 3, 3, { g: 'lure' }], ['waders', 2, 3],
    ['landing net', 3, 3], ['creel', 4, 3], ['swivel', 3, 3, { g: 'fishing' }], ['leader', 4, 3, { g: 'fishing line' }], ['gaff', 4, 3, { g: 'hook' }],
    ['tippet', 5, 4, { g: 'fishing line' }], ['split shot', 4, 4], ['crankbait', 4, 4], ['plug', 4, 4, { g: 'lure' }], ['popper', 4, 4, { g: 'lure' }],
    ['fly rod', 3, 3], ['spinning reel', 4, 3], ['baitcaster', 5, 4], ['stringer', 4, 4, { g: 'fishing' }], ['weight', 2, 4, { g: 'fishing' }],
  ],

  // ---------------------------------------------------------------- poker betting rounds (closed set)
  poker_betting_rounds: [
    ['preflop', 3, 3, { al: [['pre-flop', 'spelling', 3, 3]] }], ['flop', 2, 2, { g: 'poker round' }], ['turn', 2, 2, { g: 'poker' }], ['river', 2, 2, { g: 'poker' }],
  ],

  // ---------------------------------------------------------------- poker hands (closed set)
  poker_hands: [
    ['high card', 2, 2], ['pair', 1, 2, { g: 'poker' }], ['two pair', 2, 2], ['three of a kind', 1, 2], ['straight', 2, 3, { g: 'poker' }],
    ['flush', 2, 3, { g: 'poker' }], ['full house', 2, 2], ['four of a kind', 2, 2], ['straight flush', 2, 2], ['royal flush', 2, 2],
  ],

  // ---------------------------------------------------------------- Asian board games
  asian_board_games: [
    ['go', 2, 2, { g: 'board game', al: [['weiqi', 'synonym', 5, 4], ['baduk', 'synonym', 5, 4]] }], ['shogi', 3, 2, { al: [['Japanese chess', 'synonym', 3, 3, [], { type: 'proper' }]] }],
    ['mahjong', 2, 2], ['xiangqi', 4, 3], ['ludo', 2, 3], ['carrom', 3, 3], ['Chinese checkers', 2, 3], ['othello', 2, 4, { g: 'board game' }],
    ['pachisi', 4, 3], ['gomoku', 4, 4, { al: [['gobang', 'synonym', 5, 5]] }], ['pai gow', 4, 4], ['chaturanga', 5, 4], ['janggi', 5, 5], ['makruk', 5, 5],
    ['renju', 5, 5], ['sungka', 5, 5], ['yutnori', 5, 5], ['sugoroku', 5, 5], ['dou shou qi', 5, 5],
  ],

  // ---------------------------------------------------------------- chess openings
  chess_openings: [
    ['Sicilian Defense', 3, 2, { type: 'proper', al: [['Sicilian Defence', 'spelling', 3, 2, ['UK'], { type: 'proper' }], ['Sicilian', 'short form', 3, 3, [], { type: 'proper', g: 'chess' }]] }],
    ['Ruy Lopez', 3, 2, { type: 'proper' }], ["Queen's Gambit", 2, 2, { type: 'proper' }], ["King's Gambit", 3, 3, { type: 'proper' }], ['Italian Game', 3, 3, { type: 'proper' }],
    ['French Defense', 3, 3, { type: 'proper', al: [['French Defence', 'spelling', 3, 3, ['UK'], { type: 'proper' }]] }], ['English Opening', 3, 3, { type: 'proper' }],
    ['London System', 3, 3, { type: 'proper' }], ['Scotch Game', 4, 3, { type: 'proper' }], ['Vienna Game', 4, 3, { type: 'proper' }],
    ['Caro-Kann Defense', 4, 3, { type: 'proper', al: [['Caro-Kann', 'short form', 4, 3, [], { type: 'proper' }]] }],
    ["King's Indian Defense", 4, 3, { type: 'proper', al: [["King's Indian Defence", 'spelling', 4, 3, ['UK'], { type: 'proper' }]] }],
    ['Nimzo-Indian Defense', 4, 4, { type: 'proper' }], ['Dutch Defense', 4, 3, { type: 'proper' }], ['Scandinavian Defense', 4, 3, { type: 'proper' }],
    ['Catalan Opening', 4, 3, { type: 'proper' }], ['Slav Defense', 4, 3, { type: 'proper' }], ["Queen's Pawn Opening", 4, 4, { type: 'proper' }],
    ['Grunfeld Defense', 5, 4, { type: 'proper' }], ['Pirc Defense', 5, 4, { type: 'proper' }], ["Alekhine's Defense", 5, 4, { type: 'proper' }],
    ['Benoni Defense', 5, 4, { type: 'proper' }], ['Budapest Gambit', 5, 4, { type: 'proper' }], ['Evans Gambit', 5, 4, { type: 'proper' }],
    ['Danish Gambit', 5, 4, { type: 'proper' }], ["Petrov's Defense", 5, 4, { type: 'proper' }], ['Giuoco Piano', 5, 4, { type: 'proper' }],
    ['Fried Liver Attack', 5, 4, { type: 'proper' }], ['Stonewall Attack', 5, 4, { type: 'proper' }], ["Bird's Opening", 5, 4, { type: 'proper' }],
    ['Reti Opening', 5, 4, { type: 'proper' }], ['Two Knights Defense', 5, 4, { type: 'proper' }], ['Najdorf Variation', 5, 4, { type: 'proper' }],
    ['Dragon Variation', 5, 5, { type: 'proper' }], ["Queen's Gambit Declined", 5, 4, { type: 'proper' }], ['Trompowsky Attack', 5, 5, { type: 'proper' }],
  ],

  // ---------------------------------------------------------------- famous chess players
  famous_chess_players: [
    ['Garry Kasparov', 2, 1, { type: 'person', al: [['Kasparov', 'short form', 3, 2]] }], ['Bobby Fischer', 2, 1, { type: 'person', al: [['Fischer', 'short form', 3, 3]] }],
    ['Magnus Carlsen', 2, 1, { type: 'person', al: [['Carlsen', 'short form', 3, 2]] }], ['Anatoly Karpov', 3, 2, { type: 'person', al: [['Karpov', 'short form', 4, 3]] }],
    ['Boris Spassky', 3, 2, { type: 'person' }], ['Beth Harmon', 2, 3, { type: 'person', tm: true }], ['Mikhail Tal', 4, 3, { type: 'person' }],
    ['Jose Capablanca', 4, 3, { type: 'person', al: [['Capablanca', 'short form', 4, 3]] }], ['Emanuel Lasker', 4, 3, { type: 'person' }], ['Paul Morphy', 4, 3, { type: 'person' }],
    ['Wilhelm Steinitz', 4, 3, { type: 'person' }], ['Viswanathan Anand', 3, 3, { type: 'person' }], ['Vladimir Kramnik', 4, 3, { type: 'person' }],
    ['Hikaru Nakamura', 3, 3, { type: 'person' }], ['Fabiano Caruana', 4, 3, { type: 'person' }], ['Judit Polgar', 4, 4, { type: 'person' }],
    ['Mikhail Botvinnik', 4, 4, { type: 'person' }], ['Tigran Petrosian', 5, 4, { type: 'person' }], ['Vasily Smyslov', 5, 4, { type: 'person' }],
    ['Max Euwe', 5, 4, { type: 'person' }], ['Alexander Alekhine', 4, 4, { type: 'person' }], ['Ding Liren', 4, 4, { type: 'person' }], ['Hou Yifan', 5, 4, { type: 'person' }],
    ['Nigel Short', 4, 4, { type: 'person', reg: ['UK'] }], ['Veselin Topalov', 5, 4, { type: 'person' }], ['Levon Aronian', 5, 4, { type: 'person' }],
    ['Wesley So', 5, 4, { type: 'person' }], ['Gukesh Dommaraju', 5, 4, { type: 'person' }], ['Samuel Reshevsky', 5, 5, { type: 'person' }],
  ],

  // ---------------------------------------------------------------- pinball words
  pinball_words: [
    ['flipper', 2, 1, { g: 'pinball' }], ['tilt', 2, 2, { g: 'pinball' }], ['plunger', 3, 2, { g: 'pinball' }], ['bumper', 3, 2, { g: 'pinball' }],
    ['multiball', 3, 3], ['drain', 3, 3, { g: 'pinball' }], ['ramp', 3, 3, { g: 'pinball' }], ['extra ball', 3, 3], ['nudge', 3, 3, { g: 'pinball' }],
    ['flipper button', 3, 3], ['drop target', 4, 3], ['slingshot', 4, 3, { g: 'pinball' }], ['skill shot', 4, 3], ['playfield', 4, 3], ['pop bumper', 4, 3],
    ['Pinball Wizard', 2, 3, { type: 'title', tm: true }], ['free game', 4, 4], ['spinner', 4, 4, { g: 'pinball' }], ['lane', 3, 4, { g: 'pinball' }],
    ['kicker', 5, 4, { g: 'pinball' }], ['saucer', 5, 4, { g: 'pinball' }], ['ball lock', 5, 4], ['backglass', 5, 4], ['outlane', 5, 5], ['inlane', 5, 5],
    ['Gottlieb', 5, 4, { g: 'pinball maker', type: 'org' }], ['Bally', 4, 4, { g: 'pinball maker', type: 'org' }], ['Stern', 5, 4, { g: 'pinball maker', type: 'org' }],
  ],
};

// Aliases and nicknames on roots that already exist in the library.
export const ALIASES = [
  ['tennis_grand_slams', 'French Open', '', [['Roland Garros', 'synonym', 3, 3, [], { type: 'proper' }]]],
  ['tennis_grand_slams', 'US Open', 'tennis', [['Flushing Meadows', 'synonym', 4, 4, [], { type: 'proper' }]]],
  ['golf_majors', 'The Masters', 'golf', [['Masters', 'short form', 2, 2, [], { g: 'golf' }]]],
  ['baseball_positions', 'catcher', '', [['backstop', 'synonym', 4, 4]]],
  ['poker_hands', 'three of a kind', '', [['trips', 'synonym', 4, 4, [], { g: 'poker' }]]],
  ['poker_hands', 'four of a kind', '', [['quads', 'synonym', 4, 4, [], { g: 'poker' }]]],
  ['poker_hands', 'pair', 'poker', [['one pair', 'synonym', 3, 3]]],
  ['poker_betting_rounds', 'turn', 'poker', [['fourth street', 'synonym', 4, 4]]],
  ['poker_betting_rounds', 'river', 'poker', [['fifth street', 'synonym', 4, 4]]],
  ['gymnastics_apparatus', 'still rings', '', [['rings', 'short form', 2, 2, [], { g: 'gymnastics' }]]],
  ['gymnastics_apparatus', 'uneven bars', '', [['asymmetric bars', 'synonym', 4, 3, ['UK']]]],
];

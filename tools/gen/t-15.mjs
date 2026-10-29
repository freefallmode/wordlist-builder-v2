// Top-up batch 15: home & everyday (bedroom ... things with lids) and sports team / cricket / golf themes.
const NBA = (r, i, o = {}) => (t) => [t, r, i, { g: 'NBA team', type: 'org', ...o }];

export const THEMES = {};

export const DATA = {
  bedroom: [
    ['bolster', 3, 4], ['eiderdown', 3, 4], ['coverlet', 4, 4], ['counterpane', 4, 5], ['divan', 3, 4, { g: 'bed' }], ['bed skirt', 3, 4], ['four-poster', 3, 4, { g: 'bed' }], ['bedwarmer', 4, 5],
  ],
  home_office: [
    ['pigeonhole', 3, 4], ['letter opener', 3, 4], ['label maker', 3, 4], ['laminator', 3, 4], ['desk blotter', 4, 5], ['bulldog clip', 3, 4], ['hanging file', 3, 4],
  ],
  junk_drawer: [
    ['allen key', 3, 4], ['bulldog clip', 3, 4], ['curtain hooks', 3, 4], ['washers', 3, 4, { g: 'hardware' }], ['spare buttons', 2, 4], ['twine', 3, 4], ['tea light', 2, 4], ['drawing pins', 2, 3],
  ],
  in_a_handbag: [
    ['smelling salts', 4, 5], ['tweezers', 2, 4], ['hanky', 3, 4], ['blotting papers', 4, 5], ['cheque book', 3, 4, { reg: ['UK'] }], ['pill case', 3, 4], ['lip liner', 3, 4], ['coin purse', 2, 3],
  ],
  under_the_sink: [
    ['drain snake', 4, 5], ['descaler', 3, 4], ['stopcock', 3, 4], ['P-trap', 4, 5], ['pipe lagging', 4, 5], ['isolation valve', 4, 5], ['flexi hose', 4, 5], ['silicone sealant', 3, 4],
  ],
  kitchen_appliances: [
    ['induction hob', 3, 4], ['warming drawer', 4, 5], ['soda maker', 3, 4], ['steam oven', 3, 4], ['vacuum sealer', 3, 4], ['bain-marie', 4, 5], ['hob', 2, 3],
  ],
  home_electronics: [
    ['Betamax', 3, 5], ['digital photo frame', 3, 4], ['laserdisc player', 4, 5], ['MiniDisc player', 4, 5], ['cassette recorder', 3, 4], ['walkie-talkie', 2, 4],
  ],
  small_appliances: [
    ['crepe maker', 3, 4], ['raclette grill', 4, 5], ['garment steamer', 3, 4], ['ultrasonic cleaner', 4, 5], ['cotton candy machine', 3, 4, { al: [['candy floss machine', 'synonym', 3, 4, ['UK']]] }], ['soy milk maker', 4, 5], ['electric skillet', 3, 4], ['lint shaver', 4, 5],
  ],
  electrical_fittings: [
    ['pattress', 5, 5], ['ceiling rose', 4, 5, { reg: ['UK'] }], ['busbar', 4, 5], ['trunking', 4, 5], ['batten holder', 5, 5], ['cable gland', 5, 5], ['lamp holder', 3, 4],
  ],
  ottoman_clothing: [
    ['sash', 2, 2], ['veil', 1, 2], ['headscarf', 2, 2],
  ],
  african_clothing: [
    ['tunic', 1, 2], ['headscarf', 2, 2], ['wrap skirt', 2, 2],
  ],
  south_american_clothing: [
    ['shawl', 1, 2], ['cape', 2, 2, { g: 'clothing' }], ['sandals', 1, 2],
  ],
  halloween: [
    ['soul cake', 4, 5], ['guising', 4, 5, { reg: ['UK'] }], ['barmbrack', 4, 5, { reg: ['IE'] }], ['Mischief Night', 4, 5, { type: 'proper' }], ['turnip lantern', 4, 5], ['Allhallowtide', 5, 5, { type: 'proper' }],
  ],
  wedding_anniversaries: [
    ['willow', 3, 4, { g: 'tree' }], ['sugar', 1, 4, { g: 'food' }], ['fruit and flowers', 4, 5], ['calico', 4, 5], ['furniture', 1, 5],
  ],
  holi: [
    ['sweets', 1, 2], ['water fight', 1, 2], ['dancing', 1, 2],
  ],
  day_of_the_dead: [
    ['flowers', 1, 2], ['offering', 2, 2, { g: 'religion' }], ['parade', 1, 2, { g: 'procession' }],
  ],
  paper_goods: [
    ['glassine', 5, 5], ['vellum', 4, 5], ['kraft paper', 3, 4], ['butcher paper', 3, 4], ['filter paper', 3, 4], ['serviette', 3, 4, { reg: ['UK'] }],
  ],
  things_you_plug_in: [
    ['sump pump', 4, 5], ['lava lamp', 3, 4], ['aquarium pump', 4, 5], ['garage door opener', 3, 4], ['trouser press', 4, 5], ['heated towel rail', 3, 4, { reg: ['UK'] }],
  ],
  things_with_lids: [
    ['tagine', 3, 4, { g: 'cookware' }], ['sarcophagus', 3, 4], ['canopic jar', 4, 5], ['snuffbox', 4, 5], ['inkwell', 4, 5], ['casket', 3, 4, { g: 'small box' }], ['reliquary', 5, 5],
  ],
  nba_teams: ['SuperSonics', 'Bobcats', 'Bullets'].map((t, i) => NBA(4, 4)(t)).concat([
    ['Buffalo Braves', 5, 5, { g: 'NBA team', type: 'org' }], ['Vancouver Grizzlies', 5, 5, { g: 'NBA team', type: 'org' }], ['Rochester Royals', 5, 5, { g: 'NBA team', type: 'org' }],
  ]),
  nfl_teams: [
    ['Oilers', 4, 4, { g: 'NFL team', type: 'org' }], ['Redskins', 4, 4, { g: 'NFL team', type: 'org', sens: true }], ['Baltimore Colts', 4, 4, { g: 'NFL team', type: 'org' }],
    ['Cleveland Rams', 5, 5, { g: 'NFL team', type: 'org' }], ['Decatur Staleys', 5, 5, { g: 'NFL team', type: 'org' }],
  ],
  mlb_teams: [
    ['Expos', 4, 4, { g: 'MLB team', type: 'org' }], ['Seattle Pilots', 5, 5, { g: 'MLB team', type: 'org' }], ['Devil Rays', 4, 4, { g: 'MLB team', type: 'org' }],
    ['Brooklyn Dodgers', 4, 4, { g: 'MLB team', type: 'org' }], ['Washington Senators', 5, 5, { g: 'MLB team', type: 'org' }], ['Florida Marlins', 4, 4, { g: 'MLB team', type: 'org' }],
  ],
  cricket_fielding_positions: [
    ['wicketkeeper', 2, 2], ['bowler', 1, 2, { g: 'cricket' }], ['mid-off', 3, 3], ['mid-on', 3, 3], ['square leg', 3, 3], ['fine leg', 3, 3], ['third man', 3, 3], ['extra cover', 3, 3],
    ['long on', 4, 4], ['long off', 4, 4], ['midwicket', 3, 3], ['short leg', 3, 3], ['silly point', 4, 4], ['cow corner', 4, 4], ['leg slip', 4, 4], ['long stop', 5, 5], ['fly slip', 5, 5], ['backward point', 5, 5],
  ],
  golf_shots: [
    ['tee shot', 1, 1], ['pitch', 2, 2, { g: 'golf' }], ['lob', 3, 3, { g: 'golf' }], ['flop shot', 4, 4], ['punch shot', 4, 4], ['bump and run', 5, 5], ['stinger', 5, 5, { g: 'golf' }], ['shank', 3, 4, { g: 'bad shot' }], ['duff', 4, 4],
  ],
  golf_course_features: [
    ['pin', 1, 2, { g: 'golf' }], ['cup', 1, 3, { g: 'golf' }], ['apron', 3, 4, { g: 'golf' }], ['fringe', 3, 4, { g: 'golf' }], ['pot bunker', 4, 4], ['waste area', 5, 5], ['false front', 5, 5], ['swale', 5, 5], ['water hazard', 2, 2], ['sand trap', 2, 2], ['clubhouse', 1, 2, { g: 'golf building' }],
  ],
};

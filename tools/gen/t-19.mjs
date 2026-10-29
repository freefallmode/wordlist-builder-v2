// Top-up batch 19: architects ... wild west.
const P = { type: 'person' }, pr = { type: 'proper' }, pl = { type: 'place' };

export const THEMES = {};

export const FIXES = [
  { gloss: ['Beagle', 'dog_breeds', 'dog'] },
  { gloss: ['Zeugma', 'figures_of_speech', 'figure of speech'] },
];

export const DATA = {
  architects: [
    ['Thomas Jefferson', 2, 3, P], ['John Soane', 4, 4, P], ['Augustus Pugin', 4, 4, P], ['Daniel Burnham', 4, 5, P],
    ['Moshe Safdie', 4, 5, P], ['Peter Zumthor', 4, 5, P], ['Kengo Kuma', 4, 5, P], ['Shigeru Ban', 4, 5, P],
  ],
  famous_voyages: [
    ['Odyssey', 2, 2], ['Apollo 11', 2, 2, pr], ['Beagle', 3, 3, { g: 'ship', type: 'proper' }], ['Endurance', 3, 3, { g: 'ship', type: 'proper' }],
    ['Fram', 4, 4, { g: 'ship', type: 'proper' }], ['Terra Nova', 4, 4, { g: 'ship', type: 'proper' }], ['Argo', 3, 3, { g: 'ship', type: 'proper' }],
    ['Nimrod', 4, 5, { g: 'ship', type: 'proper' }], ['Erebus', 4, 5, { g: 'ship', type: 'proper' }],
  ],
  discoveries: [
    ['gravity', 1, 1], ['DNA', 1, 2], ['Antarctica', 2, 2, { g: 'continent', type: 'place' }], ['Tutankhamun', 2, 2, P],
    ['New World', 2, 3, pl],
  ],
  pirate_words: [
    ['privateer', 3, 4], ['letter of marque', 4, 5], ['keelhaul', 3, 4], ['Black Spot', 4, 4, pr],
  ],
  french_kings: [
    ['Louis XI', 4, 5, P], ['Louis XII', 4, 5, P], ['Henri III', 4, 5, P], ['Henri II', 4, 5, P], ['Robert the Pious', 5, 5, P],
    ['Charles V', 4, 5, { g: 'French king', type: 'person' }], ['Charles IX', 4, 5, { g: 'French king', type: 'person' }],
    ['Philip VI', 5, 5, { g: 'French king', type: 'person' }], ['Louis VII', 5, 5, P],
  ],
  chinese_emperors: [
    ['Jiaqing', 4, 5, P], ['Hongxi', 5, 5, P], ['Zhengde', 5, 5, P], ['Tianqi', 5, 5, P],
  ],
  reformers: [
    ['Martin Luther King', 1, 1, P], ['Booker T. Washington', 3, 4, P], ['Sojourner Truth', 3, 3, P], ['Elizabeth Cady Stanton', 3, 4, P],
    ['Lucretia Mott', 4, 5, P], ['Samuel Plimsoll', 5, 5, P], ['Edwin Chadwick', 5, 5, P], ['Mary McLeod Bethune', 4, 5, P],
  ],
  ancient_sites_of_turkey: [
    ['Hagia Sophia', 1, 2, pl], ['Pamukkale', 3, 3, pl], ['Byzantium', 3, 3, { g: 'city', type: 'place' }], ['Sumela Monastery', 4, 4, pl],
    ['Zeugma', 4, 4, { g: 'ancient city', type: 'place' }], ['Gordium', 4, 5, pl], ['Ani', 4, 4, { g: 'ancient city', type: 'place' }],
    ['Letoon', 5, 5, pl], ['Euromos', 5, 5, pl],
  ],
  bronze_age: [
    ['Pharaoh', 2, 2],
  ],
  mesopotamian_gods: [
    ['Anunnaki', 3, 2, pr], ['Ningirsu', 5, 5, { g: 'god', type: 'proper' }], ['Ninmah', 5, 5, { g: 'goddess', type: 'proper' }],
    ['Nusku', 5, 5, { g: 'god', type: 'proper' }], ['Zababa', 5, 5, { g: 'god', type: 'proper' }], ['Shala', 5, 5, { g: 'goddess', type: 'proper' }],
    ['Nanshe', 5, 5, { g: 'goddess', type: 'proper' }], ['Lugalbanda', 5, 5, { g: 'god', type: 'proper' }],
  ],
  aztec_gods: [
    ['Tepeyollotl', 5, 5, { g: 'god', type: 'proper' }], ['Opochtli', 5, 5, { g: 'god', type: 'proper' }], ['Tzitzimime', 5, 5, pr],
    ['Toci', 5, 5, { g: 'goddess', type: 'proper' }], ['Huixtocihuatl', 5, 5, { g: 'goddess', type: 'proper' }],
  ],
  inca_gods: [
    ['Mama Pacha', 5, 5, { g: 'goddess', type: 'proper' }],
  ],
  maori_mythology: [
    ['Matariki', 3, 3, pr], ['Hine-ahu-one', 5, 5, { g: 'first woman', type: 'proper' }], ['Whaitiri', 5, 5, { g: 'goddess', type: 'proper' }],
  ],
  yoruba_orishas: [
    ['Ifa', 4, 4, pr], ['Candomble', 4, 4, pr], ['Oko', 5, 5, { g: 'god', type: 'proper' }], ['Aje', 5, 5, { g: 'goddess', type: 'proper' }],
  ],
  mythical_creatures: [
    ['cockatrice', 3, 4], ['nuckelavee', 4, 5], ['jackalope', 3, 4], ['wendigo', 3, 4], ['peryton', 5, 5], ['hippogriff', 3, 3],
    ['amphisbaena', 5, 5], ['tengu', 4, 4], ['thunderbird', 3, 4, { g: 'myth', type: 'proper' }],
  ],
  fantasy: [
    ['scrying', 3, 4], ['thaumaturge', 5, 5], ['grimdark', 4, 4], ['artificer', 4, 4],
  ],
  wizard_words: [
    ['cantrip', 4, 4], ['scrying', 3, 4], ['thaumaturgy', 5, 5], ['evocation', 4, 4], ['abjuration', 5, 5], ['conjuration', 4, 4],
    ['thaumaturge', 5, 5], ['augury', 4, 4],
  ],
  legendary_heroes: [
    ['Rustam', 5, 5, P], ['Ilya Muromets', 4, 5, P], ['Hereward the Wake', 4, 4, P], ['Tristan', 3, 4, { g: 'knight', type: 'person' }],
  ],
  ghosts_and_spirits: [
    ['dybbuk', 4, 4], ['yurei', 4, 4], ['eidolon', 5, 5], ['Gytrash', 5, 5, pr], ['Black Shuck', 4, 4, pr], ['Grey Lady', 4, 4, pr],
    ['Cock Lane Ghost', 5, 5, pr],
  ],
  ages_of_history: [
    ['Axial Age', 5, 5, pr], ['Heroic Age', 4, 4, pr], ['Anthropocene', 3, 4, pr], ['Migration Period', 4, 4, pr],
    ['Epipaleolithic', 5, 5, pr], ['Hellenistic Age', 4, 4, pr], ['Age of Aquarius', 3, 3, pr],
  ],
  chinese_dynasties: [
    ['Eastern Han', 4, 5, pr], ['Western Han', 4, 5, pr], ['Northern Song', 4, 5, pr], ['Southern Song', 4, 5, pr], ['Northern Wei', 4, 5, pr],
    ['Western Jin', 5, 5, pr], ['Eastern Jin', 5, 5, pr], ['Western Zhou', 4, 5, pr], ['Eastern Zhou', 4, 5, pr], ['Five Dynasties', 4, 5, pr],
    ['Western Xia', 5, 5, pr], ['Northern Zhou', 5, 5, pr], ['Wei', 3, 4, { g: 'dynasty', type: 'proper' }], ['Xin', 5, 5, { g: 'dynasty', type: 'proper' }],
    ['Shu Han', 4, 4, pr],
  ],
  industrial_revolution: [
    ['Abraham Darby', 4, 4, P], ['Samuel Crompton', 4, 4, P], ['Matthew Boulton', 4, 4, P], ['Henry Cort', 5, 5, P],
    ['Richard Trevithick', 4, 4, P], ['Edmund Cartwright', 5, 5, P], ['Josiah Wedgwood', 4, 4, P], ['Thomas Telford', 3, 4, P],
  ],
  victorian_era: [
    ['Great Stink', 4, 4, pr], ['Joseph Bazalgette', 4, 4, P], ['Chartists', 4, 4, pr], ['Pre-Raphaelites', 4, 4], ['antimacassar', 4, 4],
    ['ragged school', 5, 5], ['Mrs Beeton', 3, 4, P], ['mudlark', 4, 4, { g: 'scavenger' }],
  ],
  wild_west: [
    ['Bat Masterson', 3, 4, P], ['Pat Garrett', 3, 4, P], ['Belle Starr', 3, 4, P], ['Black Bart', 3, 5, { g: 'stagecoach robber', type: 'person' }],
    ['Johnny Ringo', 3, 5, P], ['Tom Horn', 4, 5, P], ['Bass Reeves', 4, 5, P], ['Roy Bean', 4, 4, P], ['Chisholm Trail', 3, 4, pr],
    ['Comstock Lode', 4, 5, pl],
  ],
};

export const ALIASES = [
  ['chinese_emperors', 'Qin Shi Huang', '', [['First Emperor', 'synonym', 3, 2]]],
];

// Top-up batch 13. Format: tools/apply-words.mjs.
const PL = (o = {}) => ({ type: 'place', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const PE = (o = {}) => ({ type: 'person', ...o });
const O = (o = {}) => ({ type: 'org', ...o });
export const THEMES = {};
export const FIXES = [{ gloss: ['cornet', 'brass_instruments', 'instrument'] }, { gloss: ['peeler', 'kitchen_utensils', 'kitchen tool'] }];
export const DATA = {
  police_words: [
    ['Garda', 4, 4, P()], ['carabinieri', 4, 4], ['constabulary', 4, 4], ['gendarmerie', 4, 4], ['peeler', 4, 4, { g: 'police', reg: ['UK'] }],
  ],
  prison_words: [
    ['panopticon', 5, 5], ['Newgate', 4, 4, PL()], ['Bastille', 3, 4, PL()], ['prison hulk', 5, 5], ['stir', 4, 4], ['tread wheel', 5, 5],
  ],
  detective_words: [
    ['Philip Marlowe', 4, 4, PE()], ['Sam Spade', 4, 4, PE()], ['Father Brown', 4, 4, PE()], ['Lord Peter Wimsey', 5, 5, PE()], ['ballistics', 4, 4], ['Dupin', 5, 5, PE({ g: 'detective' })],
  ],
  legal_documents: [
    ['indenture', 5, 5], ['quitclaim deed', 5, 5], ['letters patent', 5, 5, { type: 'phrase' }], ['bill of lading', 4, 4], ['conveyance', 5, 4, { g: 'legal' }],
  ],
  legal_latin: [
    ['ab initio', 5, 5], ['inter alia', 4, 4], ['sine die', 5, 5], ['pari passu', 5, 5], ['obiter dictum', 5, 5], ['mutatis mutandis', 5, 5], ['locus standi', 5, 5], ['ex gratia', 5, 5],
  ],
  spy_words: [
    ['Stasi', 4, 4, O()], ['Kim Philby', 4, 4, PE()], ['SIGINT', 5, 5, { type: 'acronym' }], ['dead letter box', 5, 5],
  ],
  african_currencies: [
    ['Egyptian pound', 2, 2, P()], ['CFA franc', 4, 4, P()],
  ],
  latin_american_currencies: [
    ['centavo', 3, 2], ['Mexican peso', 2, 1, P()], ['Argentine peso', 3, 2, P()],
  ],
  stock_market_words: [
    ['contango', 5, 5], ['backwardation', 5, 5], ['short squeeze', 4, 4], ['ex-dividend', 5, 4], ['stop-loss', 4, 4],
  ],
  business_words: [
    ['vertical integration', 5, 4], ['due diligence', 4, 4], ['leveraged buyout', 5, 4],
  ],
  religion_words: [
    ['transubstantiation', 5, 5], ['eschatology', 5, 5], ['ecumenical', 4, 4], ['theodicy', 5, 5], ['syncretism', 5, 5], ['numinous', 5, 5], ['apotheosis', 5, 4],
  ],
  religious_festivals: [
    ['Thaipusam', 4, 4], ['Tisha B\'Av', 5, 5, P()], ['Simchat Torah', 5, 4, P()], ['Kumbh Mela', 4, 4, P()], ['Lailat al-Qadr', 5, 5, P()], ['Esala Perahera', 5, 5, P()],
  ],
  religious_leaders: [
    ['metropolitan', 5, 5, { g: 'bishop' }], ['archimandrite', 5, 5], ['hierophant', 5, 4], ['granthi', 5, 5], ['rebbe', 4, 4], ['pujari', 5, 5],
  ],
  holy_books: [
    ['Vulgate', 4, 4, P()], ['Rigveda', 5, 5, P()], ['Book of Enoch', 5, 5, P()], ['Adi Granth', 5, 5, P()], ['Nag Hammadi', 5, 5, P({ g: 'texts' })], ['Gospel of Thomas', 4, 4, P()], ['Targum', 5, 5],
  ],
  pilgrimage_sites: [
    ['Koyasan', 5, 5], ['Mashhad', 4, 4], ['Sabarimala', 5, 5, PL()], ['Adam\'s Peak', 5, 5, PL()], ['Lalibela', 4, 4, { g: 'town' }], ['Kataragama', 5, 5, PL()], ['Pushkar', 5, 5, PL()],
  ],
  famous_saints: [
    ['Aidan', 5, 4, PE({ g: 'saint' })], ['Ninian', 5, 5, PE({ g: 'saint' })], ['Boniface', 4, 4, PE({ g: 'saint' })], ['Polycarp', 5, 5, PE({ g: 'saint' })], ['Hildegard of Bingen', 4, 4, PE()], ['Ignatius Loyola', 4, 4, PE()],
  ],
  afterlife_words: [
    ['Naraka', 5, 5, P()], ['Duat', 5, 5, { g: 'underworld' }], ['Mictlan', 5, 5, PL()], ['Annwn', 5, 5, PL()], ['Folkvangr', 5, 5, PL()],
  ],
  islam_words: [
    ['tawhid', 4, 4], ['ijtihad', 5, 5], ['tarawih', 5, 5], ['kiswah', 5, 5], ['ihram', 4, 4], ['tafsir', 5, 5], ['barzakh', 5, 5], ['Zamzam', 4, 4, PL()],
  ],
  judaism_words: [
    ['eruv', 5, 5], ['gematria', 5, 5], ['chuppah', 4, 4], ['mohel', 4, 4], ['tzitzit', 4, 4], ['Sanhedrin', 4, 4, O()], ['parsha', 5, 5], ['tzedakah', 4, 4],
  ],
  buddhism_words: [
    ['anatta', 5, 5], ['anicca', 5, 5], ['skandha', 5, 5], ['tulku', 5, 5], ['bardo', 5, 5], ['jhana', 5, 5], ['parinirvana', 5, 5],
  ],
  hinduism_words: [
    ['Brahman', 4, 4, { g: 'Hindu', type: 'common' }], ['bhakti', 4, 4], ['smriti', 5, 5], ['varna', 5, 5, { g: 'caste' }], ['samskara', 5, 5], ['jnana', 5, 5], ['kirtan', 4, 4], ['Shakti', 4, 4, { g: 'goddess' }],
  ],
  military_ranks: [
    ['generalissimo', 4, 4], ['adjutant', 4, 4], ['cornet', 5, 5, { g: 'rank' }], ['colour sergeant', 5, 5], ['Feldwebel', 5, 5, { type: 'title' }], ['decurion', 5, 5],
  ],
  army_words: [
    ['enfilade', 5, 5], ['defilade', 5, 5], ['puttees', 5, 5], ['sutler', 5, 5], ['bandolier', 4, 4],
  ],
  navy_words: [
    ['binnacle', 5, 4], ['taffrail', 5, 5], ['scupper', 5, 4], ['forecastle', 4, 4], ['orlop', 5, 5], ['poop deck', 4, 4], ['bowsprit', 4, 4],
  ],
  historic_weapons: [
    ['zweihander', 5, 5], ['pilum', 5, 5], ['gladius', 4, 4], ['assegai', 4, 4], ['bardiche', 5, 5], ['atlatl', 5, 5],
  ],
};

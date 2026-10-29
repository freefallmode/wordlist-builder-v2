// Top-up batch 12: family members ... courtroom words.
const A = (o = {}) => ({ type: 'acronym', ...o });
const T = (o = {}) => ({ type: 'title', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const O = (o = {}) => ({ type: 'org', ...o });

export const THEMES = {};

export const FIXES = [
  { gloss: ['sire', 'male_animals', 'male parent'] },
  { gloss: ['abba', 'famous_bands', 'band'] },
  { gloss: ['baba', 'swahili_words', 'Swahili'] },
];

export const DATA = {
  family_members: [
    ['kinsman', 4, 5], ['great-aunt', 3, 3], ['second cousin', 3, 4], ['brother-in-law', 2, 3], ['kin', 3, 4], ['mother-in-law', 1, 2], ['stepbrother', 2, 3], ['half-brother', 2, 3],
  ],
  life_events: [
    ['rite of passage', 3, 4, { type: 'phrase' }], ['coming out', 2, 4, { type: 'phrase' }], ['bridal shower', 2, 3], ['first kiss', 1, 3, { type: 'phrase' }],
    ['empty nest', 3, 4, { type: 'phrase' }], ['confirmation', 2, 4, { g: 'religious rite' }], ['handfasting', 5, 5], ['rehearsal dinner', 3, 4], ['housewarming', 2, 3], ['engagement party', 1, 2],
  ],
  words_for_father: [
    ['dad', 1, 1, { g: 'father' }], ['papa', 1, 1, { g: 'father' }], ['papi', 3, 3], ['abba', 4, 4, { g: 'father' }], ['baba', 4, 4, { g: 'father' }], ['daddio', 4, 4],
    ['sire', 4, 4, { g: 'father' }], ['babbo', 5, 5, { g: 'Italian father' }], ['appa', 5, 4, { g: 'Korean father' }],
  ],
  disgust_words: [
    ['loathing', 3, 3], ['revulsion', 3, 2], ['execrable', 4, 4], ['abominable', 3, 4], ['squicky', 5, 5], ['eugh', 3, 2], ['ugh', 1, 2, { g: 'interjection' }],
    ['nauseous', 2, 2], ['sickening', 2, 2], ['abomination', 3, 4],
  ],
  arts_jobs: [
    ['luthier', 4, 4], ['gaffer', 4, 5, { g: 'film crew' }], ['dramaturg', 5, 5], ['lithographer', 4, 4], ['art director', 2, 3], ['film editor', 2, 3],
    ['pianist', 1, 2], ['violinist', 1, 2], ['sketch artist', 2, 2],
  ],
  tech_jobs: [
    ['sysadmin', 3, 3], ['SRE', 5, 5, A()], ['database admin', 3, 3], ['kernel developer', 4, 5], ['firmware engineer', 4, 5], ['ML engineer', 3, 4],
    ['malware analyst', 3, 4], ['CTO', 3, 3, A()], ['data engineer', 3, 3], ['ethical hacker', 2, 3], ['solutions architect', 4, 4], ['prompt engineer', 3, 4],
  ],
  office_jobs: [
    ['amanuensis', 5, 5], ['scrivener', 4, 4], ['comptroller', 4, 4], ['company secretary', 3, 4], ['treasurer', 2, 3], ['office boy', 3, 3], ['gofer', 3, 4], ['paymaster', 4, 4],
    ['registrar', 3, 4], ['mailroom clerk', 3, 3],
  ],
  cowboy_words: [
    ['latigo', 5, 5], ['hackamore', 5, 5], ['riata', 5, 5], ['tapaderos', 5, 5], ['cowpuncher', 4, 4], ['bronc buster', 4, 4], ['hoosegow', 5, 4], ['tenderfoot', 3, 3],
    ['greenhorn', 3, 3], ['ranch hand', 2, 2], ['mustang', 2, 2, { g: 'horse' }],
  ],
  emergency_workers: [
    ['fire chief', 1, 1], ['ER nurse', 1, 2], ['lifeboat crew', 3, 3], ['rescue swimmer', 3, 4], ['medevac pilot', 4, 4], ['crisis counselor', 3, 4],
    ['swiftwater rescuer', 5, 5], ['hotshot', 4, 5, { g: 'firefighter' }], ['smoke diver', 5, 5, { reg: ['UK'] }], ['fire watcher', 4, 4],
  ],
  shopkeepers: [
    ['fruiterer', 4, 4], ['poulterer', 5, 5], ['mercer', 5, 5, { g: 'cloth seller' }], ['glover', 5, 5, { g: 'glove maker' }], ['corn chandler', 5, 5], ['perfumer', 3, 4], ['outfitter', 3, 3], ['shopkeeper', 1, 1],
    ['furrier', 3, 4], ['wine merchant', 2, 3],
  ],
  government_words: [
    ['suzerainty', 5, 5], ['plebiscite', 4, 4], ['sinecure', 5, 5], ['promulgate', 5, 4], ['enfranchise', 4, 4], ['apportionment', 5, 5], ['cloture', 5, 5], ['writ', 4, 4],
    ['polity', 5, 5], ['sunset clause', 4, 4], ['devolution', 3, 4], ['bylaw', 3, 3], ['lobbyist', 2, 2], ['legislation', 2, 1], ['government', 1, 1],
  ],
  election_words: [
    ['scrutineer', 4, 5], ['swingometer', 5, 5], ['purdah', 5, 5], ['sortition', 5, 5], ['bellwether', 4, 4], ['straw poll', 3, 3], ['write-in', 3, 4], ['ranked choice', 3, 3],
    ['electoral roll', 3, 3], ['polling booth', 2, 1], ['campaign trail', 2, 1],
  ],
  political_titles: [
    ['tribune', 4, 4], ['satrap', 4, 5], ['stadtholder', 5, 5], ['praetor', 5, 5], ['proconsul', 4, 5], ['lord provost', 4, 4], ['commissar', 4, 4], ['hetman', 5, 5],
    ['voivode', 5, 5], ['magistrate', 2, 3],
  ],
  royal_titles: [
    ['nawab', 4, 5], ['rani', 4, 4], ['begum', 5, 5], ['nizam', 5, 5], ['peshwa', 5, 5], ['hospodar', 5, 5], ['tetrarch', 5, 5], ['kabaka', 5, 5], ['oba', 5, 5],
    ['mansa', 5, 5], ['Sapa Inca', 4, 5, T()], ['jarl', 4, 4], ['atheling', 5, 5], ['tsarevich', 4, 4], ['maharani', 4, 4], ['prince consort', 3, 3], ['queen consort', 2, 2],
  ],
  ottoman_titles: [
    ['sultana', 2, 2, { g: "sultan's wife" }], ['Kizlar Agha', 5, 5, T()], ['defterdar', 5, 5], ['nishanji', 5, 5], ['reis effendi', 5, 5], ['Kapudan Pasha', 5, 5, T()],
    ['chiaus', 5, 5], ['bostanci', 5, 5],
  ],
  royal_things: [
    ['Koh-i-Noor', 4, 4, P()], ['Curtana', 5, 5, P()], ['armills', 5, 5], ['royal cypher', 4, 4], ['royal mews', 4, 4, { reg: ['UK'] }], ['privy purse', 5, 5, { reg: ['UK'] }],
    ['civil list', 5, 5, { reg: ['UK'] }], ['anointing spoon', 5, 5], ['cap of maintenance', 5, 5], ['royal yacht', 2, 2], ['state coach', 3, 3], ['fleur-de-lis', 3, 3],
    ['throne room', 1, 1],
  ],
  types_of_government: [
    ['kakistocracy', 5, 5], ['thalassocracy', 5, 5], ['polyarchy', 5, 5], ['mobocracy', 4, 4], ['triumvirate', 4, 4], ['caliphate', 3, 3], ['shogunate', 4, 4],
    ['khanate', 4, 4], ['sultanate', 3, 3], ['tetrarchy', 5, 5], ['autarchy', 5, 5],
  ],
  parts_of_parliament: [
    ['Table Office', 5, 5, P({ reg: ['UK'] })], ['Father of the House', 4, 4, T()], ['Lord Speaker', 3, 3, T()], ['Westminster Hall', 3, 3, P()], ['Bar of the House', 5, 5, P()],
    ['ten-minute rule', 5, 5], ['adjournment debate', 4, 4], ['PMQs', 3, 3, P()], ['Mr Speaker', 2, 2, T()], ['Chiltern Hundreds', 5, 5, P()], ['teller', 5, 5, { g: 'vote counter' }],
  ],
  political_ideologies: [
    ['georgism', 5, 5], ['ordoliberalism', 5, 5], ['corporatism', 4, 4], ['gaullism', 4, 4], ['bonapartism', 4, 4], ['kemalism', 5, 5], ['titoism', 5, 5], ['baathism', 5, 5],
    ['bolshevism', 3, 2], ['menshevism', 5, 5], ['minarchism', 5, 5], ['luxemburgism', 5, 5], ['pan-africanism', 4, 4], ['blairism', 3, 3], ['reaganism', 3, 3], ['agrarianism', 4, 4],
  ],
  diplomacy_words: [
    ['agrement', 5, 5], ['aide-memoire', 5, 5], ['communique', 4, 4], ['note verbale', 5, 5], ['casus belli', 4, 4, { type: 'phrase' }], ['modus vivendi', 5, 5, { type: 'phrase' }],
    ['realpolitik', 4, 4], ['legation', 4, 4], ['nuncio', 5, 5], ['chancery', 5, 5], ['entente', 4, 4], ['concordat', 5, 5], ['ultimatum', 3, 3], ['diplomatic corps', 4, 3],
  ],
  international_organizations: [
    ['CARICOM', 4, 4, A()], ['ECOWAS', 4, 4, A()], ['SADC', 5, 5, A()], ['OPCW', 5, 5, A()], ['Europol', 3, 3, O()], ['IOC', 3, 4, A()], ['ICJ', 4, 4, A()], ['FAO', 4, 4, A()],
    ['WFP', 4, 4, A()], ['APEC', 4, 4, A()], ['SAARC', 5, 5, A()], ['UPU', 5, 5, A()], ['ITU', 5, 5, A()], ['MSF', 4, 4, A()],
  ],
  us_government: [
    ['Hatch Act', 5, 5, P()], ['Federalist Papers', 4, 4], ['Posse Comitatus', 5, 5, P()], ['OMB', 5, 5, A()], ['FEMA', 3, 3, A()], ['NSA', 3, 3, A()], ['earmark', 4, 4],
    ['appropriations', 4, 4], ['parliamentarian', 5, 5], ['Rose Garden', 3, 3], ['Situation Room', 3, 3, P()], ['Camp David', 3, 3, { type: 'place' }], ['Air Force One', 2, 2, P()],
    ['Blair House', 5, 5, P()],
  ],
  british_politics: [
    ['Chiltern Hundreds', 5, 5, P()], ['three-line whip', 4, 4], ['Erskine May', 5, 5, P()], ['Privy Council', 4, 4, O()], ['Lord Chancellor', 3, 3, T()], ['Leader of the House', 4, 4, T()],
    ['Plaid Cymru', 4, 4, O()], ['DUP', 4, 4, A()], ['Sinn Fein', 3, 3, O()], ['Reform UK', 3, 3, O()], ['quango', 5, 5], ['special adviser', 4, 4], ['SpAd', 5, 5], ['Brexit', 2, 2],
    ['Hansard', 4, 4],
  ],
  crimes: [
    ['champerty', 5, 5], ['embracery', 5, 5], ['peculation', 5, 5], ['mayhem', 4, 4], ['bigamy', 3, 3], ['regicide', 4, 4], ['rustling', 3, 3], ['carjacking', 2, 2],
    ['gunrunning', 3, 3], ['conspiracy', 2, 2], ['cybercrime', 2, 2], ['lese-majeste', 5, 5], ['praemunire', 5, 5], ['subornation', 5, 5],
  ],
  courtroom_words: [
    ['certiorari', 5, 5], ['habeas corpus', 4, 4], ['estoppel', 5, 5], ['affidavit', 3, 3], ['nolo contendere', 5, 5], ['in camera', 5, 4], ['amicus curiae', 5, 5],
    ['res judicata', 5, 5], ['sub judice', 5, 5], ['mens rea', 4, 4], ['gag order', 3, 3], ['stare decisis', 5, 5], ['tipstaff', 5, 5], ['jury box', 1, 1], ['tort', 4, 4],
  ],
};

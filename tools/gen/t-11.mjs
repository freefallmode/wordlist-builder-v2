// Top-up batch 11: body & health themes lacking hard words (stretches ... ways of laughing).
const PL = (o = {}) => ({ type: 'place', ...o });

export const THEMES = {};

export const DATA = {
  stretches: [
    ['thread the needle', 3, 4], ['pancake stretch', 3, 4], ['lizard pose', 3, 5], ['scorpion stretch', 4, 5], ['Cossack squat', 4, 5, { type: 'proper' }],
  ],
  bedtime_routine: [
    ['melatonin', 3, 4], ['weighted blanket', 2, 4], ['dream journal', 3, 5], ['hot water bottle', 1, 3], ['body scan', 4, 5, { g: 'relaxation' }],
  ],
  sleep_disorders: [
    ['catathrenia', 5, 5], ['REM behavior disorder', 5, 5, { type: 'common' }],
  ],
  toiletries_for_washing: [
    ['pumice stone', 3, 4], ['soap nuts', 4, 5], ['black soap', 4, 5], ['konjac sponge', 4, 5], ['bath pouf', 3, 4],
  ],
  hair_care: [
    ['henna', 3, 4], ['co-wash', 4, 5], ['pre-poo', 5, 5], ['hot oil treatment', 3, 4], ['bond repair', 4, 5],
  ],
  skincare_products: [
    ['tretinoin', 4, 5], ['azelaic acid', 4, 5], ['bakuchiol', 5, 5], ['kojic acid', 5, 5],
  ],
  korean_skincare: [
    ['houttuynia', 5, 5], ['birch sap', 4, 4], ['toner pads', 3, 4], ['yuja', 5, 5],
  ],
  makeup: [
    ['kabuki brush', 4, 4], ['color corrector', 3, 4], ['stippling brush', 4, 5], ['lash glue', 3, 4], ['brow pomade', 4, 5],
  ],
  nail_care: [
    ['lunula', 4, 5], ['nail matrix', 5, 5], ['paronychia', 5, 5], ['ridge filler', 4, 5],
  ],
  bath_time: [
    ['plughole', 3, 4, { reg: ['UK'] }], ['bath screen', 4, 5, { reg: ['UK'] }], ['Epsom salts', 3, 4], ['bath pouf', 3, 4],
  ],
  shaving: [
    ['shavette', 5, 5], ['bay rum', 4, 5], ['witch hazel', 3, 4], ['hot towel', 2, 4, { g: 'shaving' }],
  ],
  mental_health_words: [
    ['alexithymia', 5, 5], ['dysthymia', 5, 5], ['derealization', 5, 5], ['hypervigilance', 4, 4], ['cyclothymia', 5, 5], ['somatization', 5, 5],
  ],
  phobias: [
    ['chionophobia', 5, 5], ['pogonophobia', 5, 5], ['lachanophobia', 5, 5], ['anthophobia', 5, 5], ['arachibutyrophobia', 5, 5], ['ablutophobia', 5, 5],
  ],
  massage_types: [
    ['ashiatsu', 5, 5], ['tapotement', 5, 5], ['Trager', 5, 5, { type: 'proper' }], ['Bowen technique', 5, 5, { type: 'proper' }], ['Esalen massage', 5, 5, { type: 'proper' }],
  ],
  bad_habits: [
    ['onychophagia', 5, 5], ['dermatophagia', 5, 5], ['double dipping', 3, 4],
  ],
  healthy_habits: [
    ['tongue scraping', 4, 4], ['oil pulling', 4, 5],
  ],
  spa: [
    ['Rasul', 5, 5, { type: 'proper' }], ['halotherapy', 5, 5], ['gommage', 5, 5], ['Kneipp', 5, 5, { type: 'proper' }], ['salt cave', 4, 4],
  ],
  european_spa_towns: [
    ['Rogaska Slatina', 5, 5, PL()], ['Druskininkai', 5, 5, PL()], ['Bad Pyrmont', 5, 5, PL()], ['Teplice', 5, 5, PL()], ['Sliac', 5, 5, PL()],
    ['Leamington Spa', 4, 4, PL()], ['Bad Nauheim', 5, 5, PL()],
  ],
  healthy_snacks: [
    ['jicama', 4, 4], ['skyr', 4, 4], ['chia pudding', 3, 4], ['labneh', 4, 5],
  ],
  gestures: [
    ['wai', 5, 5, { g: 'greeting' }], ['fig sign', 5, 5], ['salaam', 4, 4], ['Vulcan salute', 3, 3, { type: 'proper' }], ['pinky swear', 2, 2], ['chef\'s kiss', 2, 3],
  ],
  ways_of_walking: [
    ['stravaig', 5, 5, { reg: ['UK'] }], ['footslog', 4, 4], ['shamble', 4, 4], ['lollop', 5, 5],
  ],
  ways_of_looking: [
    ['descry', 5, 5], ['espy', 4, 4], ['gawp', 4, 4, { reg: ['UK'] }], ['squiz', 5, 5, { reg: ['AU'] }], ['peruse', 4, 4], ['once-over', 3, 3], ['side-eye', 2, 2], ['eye up', 3, 3],
  ],
  ways_of_speaking: [
    ['orate', 4, 4], ['expostulate', 5, 5], ['declaim', 5, 5], ['enunciate', 4, 4], ['natter', 3, 3, { reg: ['UK'] }], ['witter', 4, 4, { reg: ['UK'] }],
    ['yammer', 4, 4], ['bluster', 4, 5], ['falter', 4, 5],
  ],
  mouth_actions: [
    ['expectorate', 5, 5], ['belch', 2, 2], ['smirk', 2, 3], ['grimace', 2, 3, { g: 'expression' }],
  ],
  ways_of_laughing: [
    ['cachinnate', 5, 5], ['haw-haw', 4, 4], ['ho-ho-ho', 1, 1], ['heh heh', 2, 2], ['yuk yuk', 3, 3],
  ],
};

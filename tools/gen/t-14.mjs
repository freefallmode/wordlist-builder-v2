// Top-up batch 14: modern weapons ... bathroom.
const O = (o = {}) => ({ type: 'org', tm: true, ...o });   // brand / platform names

export const THEMES = {};

export const FIXES = [{ gloss: ['sidebar', 'parts_of_a_book', 'book'] }];

export const DATA = {
  modern_weapons: [
    ['recoilless rifle', 4, 4], ['Exocet', 4, 5, { type: 'proper' }], ['Scud', 4, 4, { type: 'proper' }], ['Hellfire missile', 4, 4, { type: 'proper' }],
    ['MANPADS', 5, 5, { type: 'acronym' }], ['autocannon', 4, 5], ['minigun', 3, 3], ['cluster bomb', 3, 3], ['napalm', 3, 3],
  ],
  military_units: [
    ['shield wall', 3, 4], ['cadre', 4, 5], ['tercio', 5, 5], ['flight', 3, 4, { g: 'air force unit' }], ['wing', 3, 4, { g: 'air force unit' }],
    ['maniple', 5, 5], ['praetorian guard', 3, 4], ['expeditionary force', 3, 3], ['strike force', 2, 2],
  ],
  stationery: [
    ['quill', 3, 4, { g: 'feather pen' }], ['dip pen', 4, 4], ['pen nib', 4, 4], ['carbon paper', 4, 4], ['foolscap', 5, 5], ['brass fastener', 4, 5],
    ['ink pad', 3, 3], ['stencil', 3, 3, { g: 'template' }], ['pencil case', 1, 1],
  ],
  school_staff: [
    ['bursar', 4, 4], ['schoolmaster', 4, 4], ['headmaster', 2, 2], ['headteacher', 3, 2, { reg: ['UK'] }],
    ['educational psychologist', 4, 4], ['houseparent', 5, 5], ['speech therapist', 3, 3],
  ],
  exam_words: [
    ['tripos', 5, 5], ['baccalaureate', 4, 4, { g: 'degree' }], ['Regents exam', 4, 5, { type: 'proper' }], ['Scantron', 4, 4, O()], ['rote learning', 4, 4],
    ['exam script', 3, 4], ['Abitur', 5, 5, { type: 'proper' }], ['extra time', 3, 3],
  ],
  university_words: [
    ['bursary', 4, 4], ['Michaelmas term', 5, 5, { type: 'proper' }], ['Hilary term', 5, 5, { type: 'proper' }], ['tripos', 5, 5], ['Festschrift', 5, 5],
    ['adjunct', 4, 4], ['teaching fellow', 4, 4], ['fresher', 3, 3, { reg: ['UK'] }], ['tutorial', 3, 3, { g: 'teaching' }],
  ],
  school_types: [
    ['madrasa', 4, 4], ['yeshiva', 4, 4], ['lyceum', 4, 4], ['dame school', 5, 5], ['ragged school', 5, 5], ['hedge school', 5, 5],
    ['folk high school', 5, 5], ['secondary modern', 4, 4, { reg: ['UK'] }], ['seminary', 3, 3],
  ],
  university_degrees: [
    ['DSc', 4, 4], ['DLitt', 5, 5], ['BLitt', 5, 5], ['MPhil', 3, 3], ['DBA', 4, 4, { g: 'degree' }], ['MRes', 5, 5], ['LLD', 5, 5], ['PGCE', 4, 4],
    ['HND', 4, 4], ['BTech', 4, 4], ['BCom', 4, 4], ['licentiate', 5, 5],
  ],
  graduation_words: [
    ['hooding', 4, 4], ['baccalaureate', 4, 5, { g: 'degree' }], ['sheepskin', 5, 5], ['conferral', 5, 5], ['processional', 4, 4], ['Latin honors', 4, 4],
    ['honorary degree', 3, 3], ['cap and gown', 1, 1],
  ],
  school_events: [
    ['speech day', 4, 4, { reg: ['UK'] }], ['prize giving', 3, 3], ['inset day', 5, 5, { reg: ['UK'] }], ['sports carnival', 4, 4, { reg: ['AU'] }],
    ['maypole dance', 4, 4], ["Founders' Day", 4, 4, { type: 'proper' }], ['school disco', 2, 1, { reg: ['UK'] }], ['harvest festival', 3, 3],
  ],
  places_in_a_school: [
    ['refectory', 4, 4], ['quadrangle', 4, 4], ['chapel', 3, 3], ['boot room', 4, 5], ['prep room', 5, 5], ['sanatorium', 5, 5],
    ['bell tower', 4, 4], ['lunch hall', 2, 2], ['detention hall', 2, 2],
  ],
  newspaper_words: [
    ['standfirst', 5, 5], ['galley proof', 5, 5], ['strapline', 4, 4], ['nameplate', 4, 4], ['stet', 5, 5], ['kicker', 5, 5, { g: 'newspaper' }],
    ['slug', 5, 5, { g: 'newspaper' }], ['puff piece', 4, 4],
  ],
  social_media_words: [
    ['thirst trap', 4, 4], ['sockpuppet', 4, 4], ['astroturfing', 5, 5], ['doxxing', 4, 4], ['vaguebooking', 5, 5], ['rage bait', 4, 4],
    ['hot take', 3, 3], ['catfish', 3, 3, { g: 'internet' }], ['ghosting', 3, 3, { g: 'slang' }],
  ],
  social_media_platforms: [
    ['Gab', 4, 4, O()], ['Parler', 4, 4, O()], ['Kik', 4, 4, O()], ['Mixi', 5, 5, O()], ['Renren', 5, 5, O()], ['Xanga', 5, 5, O()],
    ['LiveJournal', 4, 4, O()], ['Foursquare', 3, 3, O()], ['Ello', 5, 5, O()],
  ],
  phone_words: [
    ['touch-tone', 4, 4], ['pulse dialing', 5, 5], ['DTMF', 5, 5, { type: 'acronym' }], ['telephony', 4, 4], ['VOIP', 4, 4, { type: 'acronym' }],
    ['Ansaphone', 5, 5, O({ reg: ['UK'] })], ['answering machine', 2, 2], ['flip phone', 2, 2], ['burner phone', 3, 3], ['hold music', 2, 2], ['cell tower', 3, 3],
  ],
  mail_words: [
    ['philately', 4, 4], ['cancellation', 4, 5, { g: 'postal' }], ['pillar box', 3, 3, { reg: ['UK'] }], ['penny black', 4, 4], ['postal code', 2, 2],
    ['general delivery', 4, 4, { reg: ['US'] }], ['postmaster', 3, 3], ['postal worker', 2, 2], ['tracking number', 2, 2],
  ],
  journalism_words: [
    ['doorstepping', 5, 5], ['churnalism', 5, 5], ['nut graf', 5, 5], ['kill fee', 5, 5], ['shield law', 5, 5], ['copy desk', 4, 4], ['wire service', 3, 3],
    ['sidebar', 4, 4, { g: 'journalism' }], ['gonzo journalism', 4, 4], ['embedded journalist', 4, 4], ['D-notice', 5, 5, { reg: ['UK'] }],
  ],
  advertising_words: [
    ['advertorial', 4, 4], ['rate card', 5, 5], ['pre-roll', 4, 4], ['out-of-home', 5, 5], ['ROAS', 5, 5, { type: 'acronym' }], ['A/B testing', 4, 4],
    ['creative brief', 4, 4], ['brand equity', 4, 4], ['frequency cap', 5, 5], ['cost per click', 3, 3], ['storyboard', 3, 3], ['brand awareness', 3, 3],
  ],
  radio_words: [
    ['sideband', 5, 5], ['call sign', 4, 4], ['crystal set', 5, 5], ['kilohertz', 4, 4], ['megahertz', 3, 3], ['segue', 5, 5], ['ident', 5, 5],
    ['shipping forecast', 4, 4, { reg: ['UK'] }], ['valve radio', 4, 4], ['airplay', 3, 3], ['playlist', 2, 2], ['wavelength', 3, 3],
  ],
  old_ways_to_communicate: [
    ['speaking tube', 5, 5], ['optical telegraph', 5, 5], ['quipu', 5, 5], ['wampum', 5, 5], ['signal lamp', 4, 4], ['Aldis lamp', 5, 5, { type: 'proper', tm: true }],
    ['cable telegram', 4, 4], ['tin can telephone', 2, 2], ['bugle call', 3, 3], ['courier', 3, 3, { g: 'delivery' }],
  ],
  social_classes: [
    ['rentier', 5, 5], ['lumpenproletariat', 5, 5], ['parvenu', 5, 5], ['arriviste', 5, 5], ['helot', 5, 5], ['freedman', 4, 4], ['third estate', 4, 4],
    ['thegn', 5, 5], ['prole', 4, 4], ['toff', 3, 3, { reg: ['UK'] }], ['working poor', 3, 3], ['nobleman', 2, 2],
  ],
  protest_words: [
    ['satyagraha', 5, 5], ['bandh', 5, 5, { reg: ['IN'] }], ['work-to-rule', 5, 5], ['go-slow', 5, 5, { reg: ['UK'] }], ['lock-on', 5, 5], ['sit-down strike', 4, 4],
    ['water cannon', 3, 3], ['rubber bullets', 3, 3], ['barricade', 2, 2], ['Molotov cocktail', 3, 3], ['Jarrow March', 5, 5, { type: 'proper' }],
    ['banner drop', 4, 4], ['dissident', 3, 3],
  ],
  charity_words: [
    ['almsgiving', 4, 4], ['zakat', 5, 5], ['tzedakah', 5, 5], ['gift aid', 5, 5, { reg: ['UK'] }], ['chugger', 5, 5, { reg: ['UK'] }], ['whip-round', 4, 4, { reg: ['UK'] }],
    ['bequest', 4, 4], ['almshouse', 5, 5], ['planned giving', 5, 5], ['in-kind donation', 4, 4], ['Comic Relief', 3, 3, O({ reg: ['UK'] })],
    ['Children in Need', 3, 3, O({ reg: ['UK'] })], ['Habitat for Humanity', 3, 3, O()], ['philanthropy', 3, 3],
  ],
  manners_and_etiquette: [
    ['noblesse oblige', 5, 5], ['savoir-faire', 5, 5], ['Emily Post', 4, 4, { type: 'person' }], ["Debrett's", 5, 5, O()], ['U and non-U', 5, 5],
    ['receiving line', 4, 4], ['calling card', 5, 5], ['comportment', 5, 5], ['fish knife', 4, 4], ['elbows off the table', 2, 1, { type: 'phrase' }],
    ['tip your hat', 2, 2, { type: 'phrase' }], ['bon appetit', 2, 2, { type: 'phrase' }],
  ],
  bathroom: [
    ['cistern', 4, 4], ['pumice stone', 4, 4], ['sitz bath', 5, 5], ['towel warmer', 3, 3], ['U-bend', 4, 4], ['grab rail', 4, 4], ['plughole', 3, 3, { reg: ['UK'] }],
    ['soap scum', 3, 3], ['water closet', 4, 4], ['shaving brush', 3, 3], ['grout', 4, 4], ['sponge', 2, 2, { g: 'bath' }],
    ['flannel', 3, 3, { g: 'washcloth', reg: ['UK'] }],
  ],
};

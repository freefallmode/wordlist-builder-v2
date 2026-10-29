// Deeper-theme word batch: Arts & Entertainment chunk 1 (guitar types ... band members).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const P = (o = {}) => ({ type: 'person', ...o });
const C = (o = {}) => ({ g: 'composer', type: 'person', ...o });
const TM = (o = {}) => ({ type: 'proper', tm: true, ...o });

export const THEMES = {
  guitar_types: { d: 2 }, bowed_instruments: { d: 3 }, drums: { d: 2 }, middle_eastern_instruments: { d: 5 }, african_instruments: { d: 4 },
  chinese_instruments: { d: 4 }, japanese_instruments: { d: 4 }, indian_instruments: { d: 4 }, pacific_instruments: { d: 5 }, andean_instruments: { d: 5 },
  celtic_instruments: { d: 4 }, guitar_parts: { d: 2 }, piano_parts: { d: 3 }, rock_styles: { d: 2 }, electronic_music_styles: { d: 3 },
  african_music_styles: { d: 5 }, arabic_music_words: { d: 5 }, asian_music_styles: { d: 4 }, latin_music_styles: { d: 3 }, american_roots_music: { d: 4 },
  european_folk_music: { d: 4 }, classical_voice_types: { d: 2 }, orchestra_sections: { d: 1 }, baroque_composers: { d: 3 }, romantic_composers: { d: 3 },
  opera_composers: { d: 3 }, film_composers: { d: 3 }, the_beatles: { d: 1 }, queen_members: { d: 2 }, abba_members: { d: 2 },
};

export const FIXES = [
  { gloss: ['trot', 'horses', 'gait'] }, { split: ['cuatro', 'spanish_numbers', 'number'] }, { gloss: ['cuatro', 'folk_instruments', 'guitar'] }, { gloss: ['Les Paul', 'rock_guitarists', 'guitarist'] },
  { gloss: ['hornpipe', 'dances', 'dance'] }, { gloss: ['action', 'movie_genres', 'genre'] }, { gloss: ['cutaway', 'camera_shots', 'shot'] },
  { gloss: ['binding', 'parts_of_a_book', 'book'] }, { gloss: ['capstan', 'ship_parts', 'ship'] }, { gloss: ['escapement', 'clocks_and_calendars', 'clock'] },
  { gloss: ['kane', 'hawaiian_words', 'man'] }, { gloss: ['hokum', 'words_meaning_nonsense', 'nonsense'] }, { gloss: ['body', 'home_blank', 'main part'] },
  { gloss: ['jungle', 'forest_types', 'forest'] }, { gloss: ['glitch', 'gaming_words', 'fault'] }, { gloss: ['dreadnought', 'warships', 'battleship'] },
  { gloss: ['hardstyle', 'street_dance_styles', 'dance'] },
];

export const DATA = {
  // ---------------------------------------------------------------- guitar types
  guitar_types: [
    ['acoustic guitar', 1, 1], ['electric guitar', 1, 1], ['bass guitar', 1, 1], ['classical guitar', 2, 1], ['twelve-string guitar', 3, 2, { al: [['12-string guitar', 'spelling', 3, 2]] }],
    ['steel-string guitar', 3, 2], ['flamenco guitar', 3, 2], ['lap steel', 4, 3], ['pedal steel', 4, 4], ['slide guitar', 3, 3], ['resonator guitar', 4, 3, { al: [['dobro', 'synonym', 3, 4, [], { tm: true }]] }],
    ['archtop guitar', 4, 3], ['hollow-body guitar', 4, 3], ['semi-acoustic guitar', 4, 3], ['acoustic-electric', 3, 2], ['baritone guitar', 4, 3],
    ['Stratocaster', 2, 3, TM()], ['Telecaster', 3, 3, TM()], ['Les Paul', 2, 3, TM({ g: 'guitar' })], ['Flying V', 3, 4, TM()], ['Gibson SG', 4, 4, TM()],
    ['Hawaiian guitar', 3, 3], ['seven-string guitar', 4, 3], ['fretless guitar', 4, 4], ['travel guitar', 3, 3], ['parlor guitar', 4, 3, { al: [['parlour guitar', 'spelling', 4, 3, ['UK']]] }],
    ['dreadnought', 4, 4, { g: 'guitar' }], ['jumbo guitar', 4, 4], ['gypsy jazz guitar', 5, 4], ['guitalele', 5, 5], ['harp guitar', 5, 5], ['cigar box guitar', 4, 4],
  ],

  // ---------------------------------------------------------------- bowed instruments
  bowed_instruments: [
    ['violin', 1, 1], ['fiddle', 2, 2, { g: 'violin' }], ['viola', 3, 2], ['cello', 1, 1], ['double bass', 2, 2, { al: [['contrabass', 4, 3]] }], ['erhu', 4, 3], ['viol', 5, 3, { g: 'instrument' }],
    ['viola da gamba', 4, 3, { al: [['gamba', 'synonym', 5, 4, [], { g: 'instrument' }]] }], ["viola d'amore", 5, 4], ['rebec', 5, 4], ['hardanger fiddle', 5, 4], ['nyckelharpa', 5, 4], ['sarangi', 4, 4],
    ['kemenche', 5, 5], ['morin khuur', 5, 5, { al: [['horsehead fiddle', 'synonym', 5, 4]] }], ['gadulka', 5, 5], ['crwth', 5, 5, { reg: ['UK'] }], ['octobass', 5, 4], ['musical saw', 3, 3],
    ['bowed psaltery', 5, 5], ['rebab', 5, 5], ['gusle', 5, 5], ['vielle', 5, 5], ['baryton', 5, 5], ['tromba marina', 5, 5], ['kokyu', 5, 5],
    ['violone', 5, 4], ['lyra', 5, 5, { g: 'bowed lyre' }], ['violino piccolo', 5, 5],
  ],

  // ---------------------------------------------------------------- drums
  drums: [
    ['snare drum', 1, 1, { al: [['snare', 'synonym', 2, 2, [], { g: 'drum' }], ['side drum', 3, 3]] }], ['bass drum', 1, 1, { al: [['kick drum', 2, 2]] }], ['tom-tom', 2, 1], ['floor tom', 3, 2], ['timpani', 2, 2, { al: [['kettledrum', 3, 2]] }],
    ['bongo', 2, 2, { g: 'drum' }], ['conga', 2, 2, { g: 'drum' }], ['djembe', 3, 2], ['tabla', 3, 2], ['bodhran', 4, 3, { al: [['bodhrán', 'spelling', 4, 3]] }], ['tambourine', 1, 3], ['taiko', 3, 2],
    ['steel drum', 2, 2, { al: [['steelpan', 3, 3]] }], ['cajon', 3, 3], ['talking drum', 4, 3], ['darbuka', 4, 3, { al: [['doumbek', 'synonym', 5, 4]] }], ['frame drum', 4, 3], ['timbales', 4, 3],
    ['dhol', 4, 3], ['mridangam', 5, 4], ['goblet drum', 4, 3], ['slit drum', 4, 3], ['pandeiro', 4, 4, { g: 'tambourine' }], ['surdo', 5, 4], ['tabor', 5, 4, { g: 'small drum' }], ['udu', 5, 4], ['tsuzumi', 5, 4],
    ['cuica', 5, 4], ['tenor drum', 4, 3], ['dholak', 5, 4], ['bata drum', 5, 5], ['kettle drum', 3, 3, { g: 'drum' }], ['drum kit', 1, 2],
  ],

  // ---------------------------------------------------------------- middle eastern instruments
  middle_eastern_instruments: [
    ['oud', 3, 2, { g: 'instrument' }], ['qanun', 4, 3, { al: [['kanun', 'spelling', 5, 4]] }], ['ney', 4, 3], ['darbuka', 4, 3], ['daf', 4, 3], ['saz', 4, 3], ['baglama', 5, 4], ['santur', 5, 4],
    ['kamancheh', 5, 4], ['rebab', 5, 4], ['tar', 4, 3, { g: 'lute' }], ['setar', 5, 4], ['riq', 5, 4], ['zurna', 5, 4], ['mizmar', 5, 5], ['tanbur', 5, 5], ['tombak', 5, 4],
    ['mijwiz', 5, 5], ['buzuq', 5, 5], ['arghul', 5, 5], ['duduk', 4, 4], ['bendir', 5, 4], ['cumbus', 5, 5], ['lavta', 5, 5], ['kemenche', 5, 4],
    ['doumbek', 4, 3], ['rababa', 5, 5], ['kudum', 5, 5],
  ],

  // ---------------------------------------------------------------- african instruments
  african_instruments: [
    ['djembe', 3, 2], ['kora', 4, 3, { g: 'harp-lute' }], ['mbira', 4, 3, { al: [['thumb piano', 'synonym', 3, 2], ['kalimba', 'synonym', 3, 2]] }], ['balafon', 4, 3], ['talking drum', 4, 3], ['shekere', 4, 3],
    ['ngoni', 5, 4], ['udu', 5, 4], ['xalam', 5, 5], ['dunun', 5, 4, { al: [['djun-djun', 'spelling', 5, 4]] }], ['krar', 5, 5], ['masenqo', 5, 5], ['adungu', 5, 5], ['ilimba', 5, 5],
    ['likembe', 5, 5], ['sanza', 5, 4], ['marimba', 3, 3], ['agogo', 4, 3, { g: 'percussion' }], ['gankogui', 5, 5], ['atumpan', 5, 5], ['ngoma', 5, 4, { g: 'drum' }], ['vuvuzela', 2, 3],
    ['kudu horn', 5, 4], ['embaire', 5, 5], ['ekwe', 5, 5], ['bougarabou', 5, 5], ['caxixi', 5, 4], ['mouth bow', 5, 5], ['sistrum', 5, 5],
  ],

  // ---------------------------------------------------------------- chinese instruments
  chinese_instruments: [
    ['erhu', 3, 2], ['pipa', 3, 2, { al: [['Chinese lute', 'synonym', 4, 3]] }], ['guzheng', 4, 3, { al: [['Chinese zither', 'synonym', 4, 3]] }], ['dizi', 4, 3, { al: [['Chinese flute', 'synonym', 3, 3]] }],
    ['suona', 5, 4], ['yangqin', 5, 4], ['guqin', 5, 4], ['sheng', 4, 3], ['xiao', 5, 4, { g: 'flute' }], ['hulusi', 5, 5], ['ruan', 5, 4], ['zhongruan', 5, 5],
    ['liuqin', 5, 5], ['sanxian', 5, 5], ['yunluo', 5, 5], ['paiban', 5, 5], ['bianzhong', 5, 4], ['xun', 5, 5, { g: 'ocarina' }], ['gaohu', 5, 5], ['banhu', 5, 5], ['yueqin', 5, 4],
    ['Chinese gong', 3, 3], ['konghou', 5, 5], ['bangu', 5, 5], ['muyu', 5, 5, { g: 'wood block' }], ['paixiao', 5, 5], ['jinghu', 5, 5],
  ],

  // ---------------------------------------------------------------- japanese instruments
  japanese_instruments: [
    ['koto', 3, 2], ['shamisen', 4, 3], ['shakuhachi', 4, 3], ['taiko', 3, 2], ['biwa', 4, 3], ['shinobue', 5, 4], ['hichiriki', 5, 4], ['sho', 5, 4, { g: 'mouth organ' }], ['ryuteki', 5, 5],
    ['tsuzumi', 5, 4], ['kakko', 5, 5], ['wadaiko', 5, 4], ['kokyu', 5, 4], ['taishogoto', 5, 5], ['sanshin', 5, 4], ['odaiko', 5, 4], ['hyoshigi', 5, 5], ['mokugyo', 5, 5],
    ['suzu', 5, 4, { g: 'bell' }], ['nohkan', 5, 5], ['yokobue', 5, 5], ['sasara', 5, 5], ['tsuri-daiko', 5, 5], ['okedo', 5, 5], ['gekkin', 5, 5], ['kagurabue', 5, 5], ['kane', 5, 5, { g: 'gong' }],
    ['uchiwa-daiko', 5, 5], ['sanbasou', 5, 5],
  ],

  // ---------------------------------------------------------------- indian instruments
  indian_instruments: [
    ['sitar', 2, 1], ['tabla', 3, 1], ['harmonium', 3, 2], ['sarod', 4, 3], ['veena', 4, 3], ['sarangi', 4, 3], ['santoor', 5, 4], ['bansuri', 4, 3], ['shehnai', 4, 3], ['dholak', 4, 3],
    ['mridangam', 4, 3], ['tanpura', 4, 3, { al: [['tambura', 'spelling', 5, 4]] }], ['ektara', 5, 4], ['dhol', 4, 3], ['pakhawaj', 5, 4], ['tumbi', 5, 4], ['nadaswaram', 5, 4],
    ['ghatam', 5, 4], ['jal tarang', 5, 4], ['esraj', 5, 5], ['dilruba', 5, 5], ['rudra veena', 5, 5], ['algoza', 5, 5], ['morsing', 5, 5], ['kartal', 5, 4], ['manjira', 5, 4],
    ['damru', 5, 4], ['sursingar', 5, 5], ['swarmandal', 5, 5], ['tavil', 5, 5], ['khol', 5, 4], ['gubgubi', 5, 5], ['sarinda', 5, 5], ['tabla tarang', 5, 5], ['sundari', 5, 5],
  ],

  // ---------------------------------------------------------------- pacific instruments
  pacific_instruments: [
    ['ukulele', 1, 2], ['didgeridoo', 2, 2], ['bullroarer', 4, 3], ['clapsticks', 4, 3], ['nose flute', 4, 3], ['pahu', 5, 4], ['ipu', 5, 4, { g: 'gourd drum' }], ['koauau', 5, 4],
    ['putorino', 5, 4], ['pukaea', 5, 5], ['putatara', 5, 4], ['purerehua', 5, 4], ['toere', 5, 5], ['nguru', 5, 5], ['lali', 5, 4], ['garamut', 5, 5], ['kundu', 5, 4], ['uliuli', 5, 5],
    ['puniu', 5, 5], ['kalaau', 5, 5], ['ukeke', 5, 5], ['conch shell', 3, 3], ['slit drum', 4, 3], ['pate', 5, 5], ['pu', 5, 5, { g: 'conch trumpet' }], ['hapi', 5, 5],
    ['tokere', 5, 5], ['tifa', 5, 5, { g: 'drum' }], ['vivo', 5, 5], ['gumleaf', 5, 4], ['bamboo flute', 3, 3],
  ],

  // ---------------------------------------------------------------- andean instruments
  andean_instruments: [
    ['pan flute', 2, 2, { al: [['panpipes', 'synonym', 3, 2]] }], ['charango', 4, 3], ['quena', 4, 3], ['siku', 5, 3], ['zampona', 5, 4], ['bombo', 5, 4, { g: 'drum' }], ['ocarina', 3, 4],
    ['tarka', 5, 5], ['pinkillo', 5, 5], ['erke', 5, 5], ['cajon', 3, 4], ['guitarron', 5, 5], ['bandurria', 5, 5], ['chajchas', 5, 5], ['antara', 5, 4], ['rondador', 5, 4],
    ['quenacho', 5, 5], ['moseno', 5, 5], ['wankara', 5, 5], ['charrasca', 5, 5], ['cuatro', 4, 4, { g: 'guitar' }], ['tiple', 5, 5], ['requinto', 5, 5], ['bandola', 5, 5],
    ['pututu', 5, 5], ['sikuri', 5, 5], ['ayarachi', 5, 5], ['huaylaquepa', 5, 5], ['maracas', 3, 4], ['vihuela', 5, 5], ['zamponia', 5, 5],
  ],

  // ---------------------------------------------------------------- celtic instruments
  celtic_instruments: [
    ['bagpipes', 2, 1], ['uilleann pipes', 4, 2], ['bodhran', 4, 2], ['tin whistle', 3, 2], ['fiddle', 2, 2, { g: 'violin' }], ['harp', 1, 2], ['concertina', 3, 3], ['bombarde', 5, 4], ['accordion', 2, 3],
    ['Highland bagpipes', 3, 2], ['Scottish smallpipes', 5, 4], ['clarsach', 4, 3], ['low whistle', 4, 3], ['Irish flute', 4, 3], ['melodeon', 4, 4], ['hurdy-gurdy', 4, 4], ['crwth', 5, 4],
    ['pibgorn', 5, 5], ['hornpipe', 4, 4, { g: 'instrument' }], ['lambeg drum', 5, 4], ['bones', 3, 4, { g: 'percussion' }], ['spoons', 2, 4, { g: 'percussion' }], ['mandola', 5, 5], ['bouzouki', 3, 4],
    ['Irish harp', 3, 3], ['Northumbrian pipes', 5, 4], ['gaita', 5, 4], ['biniou', 5, 4], ['triple harp', 5, 5], ['cittern', 5, 5], ['Welsh harp', 4, 3],
  ],

  // ---------------------------------------------------------------- guitar parts
  guitar_parts: [
    ['neck', 1, 1, { g: 'instrument' }], ['fretboard', 2, 1], ['fret', 2, 1], ['headstock', 3, 2], ['tuning peg', 2, 1], ['nut', 3, 3, { g: 'music' }], ['bridge', 2, 2, { g: 'music' }],
    ['saddle', 3, 3, { g: 'guitar' }], ['soundhole', 3, 2], ['body', 1, 2, { g: 'instrument' }], ['pickup', 2, 2, { g: 'music' }], ['pickguard', 3, 3], ['truss rod', 4, 4], ['strings', 1, 1, { g: 'music' }],
    ['tremolo arm', 4, 3], ['whammy bar', 3, 3], ['volume knob', 2, 2], ['tone knob', 3, 3], ['strap button', 4, 4], ['binding', 4, 4, { g: 'guitar' }], ['heel', 4, 4, { g: 'guitar' }],
    ['cutaway', 4, 3, { g: 'guitar' }], ['inlay', 4, 4, { g: 'fretboard' }], ['output jack', 3, 3], ['pickup selector', 4, 3], ['tailpiece', 4, 4], ['fingerboard', 3, 2], ['machine head', 4, 3],
    ['scratchplate', 4, 3, { reg: ['UK'] }], ['soundboard', 4, 3], ['rosette', 5, 4, { g: 'guitar' }], ['string tree', 5, 5], ['position marker', 5, 4], ['humbucker', 4, 3],
  ],

  // ---------------------------------------------------------------- piano parts
  piano_parts: [
    ['keys', 1, 1, { g: 'music' }], ['black keys', 1, 1], ['white keys', 1, 1], ['pedal', 1, 1, { g: 'music' }], ['sustain pedal', 3, 2], ['soft pedal', 3, 2], ['sostenuto pedal', 5, 4], ['lid', 1, 2, { g: 'piano' }],
    ['music stand', 2, 3], ['keyboard', 1, 1, { g: 'music' }], ['hammer', 2, 2, { g: 'piano' }], ['damper', 4, 3, { g: 'instrument' }], ['soundboard', 4, 3], ['strings', 1, 2, { g: 'music' }],
    ['fallboard', 5, 4], ['pin block', 5, 5], ['tuning pins', 4, 3], ['cast iron frame', 5, 4], ['bridge', 3, 3, { g: 'piano' }], ['action', 4, 4, { g: 'piano' }], ['wippen', 5, 5], ['jack', 4, 5, { g: 'piano' }],
    ['escapement', 5, 5, { g: 'piano' }], ['keybed', 5, 5], ['music desk', 4, 4], ['piano bench', 1, 3], ['una corda', 5, 4], ['key slip', 5, 5], ['capstan', 5, 5, { g: 'piano' }],
    ['legs', 1, 3, { g: 'piano' }], ['case', 2, 3, { g: 'piano' }], ['felt', 2, 3, { g: 'piano' }], ['hitch pin', 5, 5], ['back check', 5, 5], ['pedal lyre', 5, 5],
  ],

  // ---------------------------------------------------------------- rock styles
  rock_styles: [
    ['rock and roll', 1, 1], ['hard rock', 1, 1], ['punk rock', 1, 1], ['heavy metal', 1, 1], ['classic rock', 1, 1], ['soft rock', 2, 1], ['indie rock', 2, 1], ['alternative rock', 2, 1],
    ['grunge', 2, 2], ['glam rock', 2, 2], ['folk rock', 2, 2], ['blues rock', 2, 2], ['progressive rock', 2, 2, { al: [['prog rock', 'synonym', 3, 2]] }], ['psychedelic rock', 2, 2, { al: [['acid rock', 'synonym', 3, 3]] }],
    ['garage rock', 3, 2], ['southern rock', 3, 2], ['surf rock', 3, 2], ['pop punk', 3, 2], ['emo', 3, 3, { g: 'music' }], ['post-punk', 3, 3], ['shoegaze', 4, 3], ['new wave', 2, 3],
    ['britpop', 3, 2], ['art rock', 3, 3], ['math rock', 4, 4], ['stoner rock', 4, 3], ['krautrock', 4, 4], ['rockabilly', 3, 2], ['yacht rock', 3, 3], ['hair metal', 3, 3], ['nu metal', 3, 3],
    ['thrash metal', 3, 3], ['death metal', 3, 3], ['post-rock', 4, 4], ['space rock', 4, 3], ['noise rock', 4, 4], ['power pop', 4, 3], ['arena rock', 3, 3], ['country rock', 3, 3], ['hardcore punk', 3, 3],
    ['Madchester', 5, 5, { type: 'proper' }], ['proto-punk', 5, 4],
  ],

  // ---------------------------------------------------------------- electronic music styles
  electronic_music_styles: [
    ['techno', 2, 1], ['house', 1, 2, { g: 'music' }], ['trance', 2, 1, { g: 'music' }], ['dubstep', 2, 1], ['drum and bass', 2, 1, { al: [['DnB', 'synonym', 4, 3, [], { type: 'acronym' }]] }],
    ['EDM', 2, 1, { type: 'acronym', al: [['electronic dance music', 'synonym', 2, 1, [], { type: 'common' }]] }], ['ambient', 2, 2, { g: 'music' }], ['synthwave', 3, 2], ['electro', 3, 2], ['trip hop', 3, 3], ['IDM', 4, 4, { type: 'acronym' }],
    ['breakbeat', 3, 3], ['UK garage', 3, 3], ['jungle', 3, 3, { g: 'music' }], ['hardstyle', 4, 3, { g: 'music' }], ['chillwave', 4, 3], ['vaporwave', 4, 3], ['acid house', 3, 3], ['deep house', 3, 2],
    ['electroclash', 5, 4], ['synthpop', 3, 3], ['big beat', 4, 3], ['glitch', 4, 4, { g: 'music' }], ['downtempo', 4, 3], ['eurodance', 3, 3], ['psytrance', 4, 3], ['gabber', 5, 4],
    ['dub techno', 5, 4], ['future bass', 4, 3], ['chiptune', 4, 3], ['lo-fi', 3, 4], ['happy hardcore', 4, 4], ['minimal techno', 4, 3], ['progressive house', 4, 3],
    ['Detroit techno', 5, 4], ['Italo disco', 4, 4], ['moombahton', 5, 5], ['tech house', 4, 3], ['hardcore techno', 5, 4], ['dark ambient', 5, 4], ['electro swing', 4, 4],
  ],

  // ---------------------------------------------------------------- african music styles
  african_music_styles: [
    ['afrobeat', 3, 2], ['highlife', 4, 3], ['juju', 4, 4, { g: 'music' }], ['soukous', 4, 3], ['mbalax', 5, 4], ['mbaqanga', 5, 4], ['kwaito', 5, 4], ['amapiano', 4, 3], ['gqom', 5, 4],
    ['afrobeats', 3, 2], ['makossa', 5, 4], ['benga', 5, 4, { g: 'music' }], ['Congolese rumba', 5, 4], ['isicathamiya', 5, 5], ['marabi', 5, 5], ['chimurenga', 5, 4], ['taarab', 5, 4],
    ['gnawa', 5, 4], ['rai', 5, 4, { g: 'music' }], ['fuji', 5, 4, { g: 'music' }], ['palm-wine music', 5, 4], ['coupe-decale', 5, 4], ['kizomba', 4, 3], ['kuduro', 5, 4], ['semba', 5, 4],
    ['morna', 5, 5], ['bikutsi', 5, 5], ['ndombolo', 5, 4], ['bongo flava', 5, 4], ['hiplife', 5, 4], ['township jive', 5, 4], ['mbube', 5, 5], ['sungura', 5, 5], ['kwela', 5, 5],
    ['jit', 5, 5, { g: 'music' }], ['zouglou', 5, 5], ['azonto', 5, 4], ['afro-pop', 3, 3], ['afro-house', 4, 4], ['apala', 5, 5], ['genge', 5, 5],
  ],

  // ---------------------------------------------------------------- arabic music words
  arabic_music_words: [
    ['maqam', 4, 2], ['taqsim', 5, 3], ['tarab', 5, 3], ['mawwal', 5, 4], ['muwashshah', 5, 4], ['qasida', 5, 4], ['dabke', 4, 4], ['raqs sharqi', 5, 4], ['iqa', 5, 4],
    ['wasla', 5, 5], ['samai', 5, 5], ['bashraf', 5, 5], ['longa', 5, 5, { g: 'music' }], ['dulab', 5, 5], ['jins', 5, 5], ['zajal', 5, 5], ['takht', 5, 5], ['nashid', 5, 4], ['ataba', 5, 5],
    ['mijana', 5, 5], ['dawr', 5, 5], ['zaghrouta', 5, 4], ['shaabi', 5, 4], ['khaleeji', 5, 5], ['mizan', 5, 5, { g: 'rhythm' }], ['rast', 5, 4, { g: 'maqam' }], ['bayati', 5, 4], ['hijaz', 5, 4, { g: 'maqam' }],
    ['nahawand', 5, 4], ['saba', 5, 4, { g: 'maqam' }], ['sikah', 5, 4], ['ajam', 5, 4, { g: 'maqam' }], ['kurd', 5, 4, { g: 'maqam' }], ['oud', 3, 3, { g: 'instrument' }], ['qanun', 4, 3], ['tahmila', 5, 5],
  ],

  // ---------------------------------------------------------------- asian music styles
  asian_music_styles: [
    ['K-pop', 1, 1], ['J-pop', 2, 1], ['C-pop', 4, 2], ['Mandopop', 4, 3], ['Cantopop', 4, 3], ['enka', 4, 3], ['gagaku', 5, 4], ['bhangra', 3, 2], ['qawwali', 4, 3], ['ghazal', 4, 3],
    ['raga', 3, 3], ['kirtan', 4, 4], ['Bollywood music', 3, 2], ['filmi', 5, 4], ['Carnatic music', 4, 3], ['Hindustani classical', 4, 3], ['dhrupad', 5, 5], ['thumri', 5, 5],
    ['khayal', 5, 5], ['gamelan', 3, 3], ['dangdut', 5, 4], ['kroncong', 5, 5], ['pansori', 5, 4], ['trot', 4, 4, { g: 'music' }], ['minyo', 5, 4], ['city pop', 3, 3], ['visual kei', 4, 4],
    ['T-pop', 4, 3], ['V-pop', 4, 3], ['OPM', 4, 4, { type: 'acronym', g: 'music' }], ['luk thung', 5, 4], ['mor lam', 5, 4], ['nagauta', 5, 5], ['bhajan', 4, 4], ['baul', 5, 5, { g: 'music' }],
    ['lavani', 5, 5], ['Indipop', 5, 4], ['kayokyoku', 5, 5], ['shidaiqu', 5, 5], ['anime music', 2, 4], ['Hindi pop', 4, 3],
  ],

  // ---------------------------------------------------------------- latin music styles
  latin_music_styles: [
    ['salsa', 1, 1, { g: 'music' }], ['reggaeton', 2, 1, { g: 'music' }], ['merengue', 3, 2], ['bachata', 3, 2], ['cumbia', 3, 2], ['bossa nova', 2, 2], ['samba', 2, 2], ['tango', 2, 2], ['mambo', 3, 2, { g: 'music' }],
    ['cha-cha-cha', 2, 3], ['bolero', 3, 3, { g: 'music' }], ['mariachi', 2, 2], ['norteno', 4, 3], ['ranchera', 4, 3], ['vallenato', 4, 3], ['tropicalia', 4, 4], ['forro', 5, 4], ['lambada', 3, 3],
    ['banda', 4, 3, { g: 'music' }], ['tejano', 3, 3], ['son cubano', 4, 3], ['rumba', 3, 3], ['danzon', 5, 4], ['bomba', 5, 4, { g: 'music' }], ['plena', 5, 4], ['conjunto', 4, 4, { g: 'music' }],
    ['corrido', 4, 4], ['latin trap', 3, 2], ['dembow', 4, 3], ['pagode', 5, 4], ['axe', 5, 4, { g: 'music' }], ['sertanejo', 5, 4], ['MPB', 5, 4, { type: 'acronym' }], ['choro', 5, 4],
    ['baile funk', 4, 3], ['nueva cancion', 5, 4], ['huayno', 5, 4], ['marinera', 5, 5], ['joropo', 5, 4], ['champeta', 5, 5], ['timba', 5, 4], ['guaracha', 5, 5], ['milonga', 4, 4],
    ['candombe', 5, 5], ['Latin jazz', 3, 3], ['boogaloo', 4, 4, { g: 'music' }], ['Latin pop', 2, 2], ['charanga', 5, 5],
  ],

  // ---------------------------------------------------------------- american roots music
  american_roots_music: [
    ['bluegrass', 2, 1, { g: 'music' }], ['blues', 1, 2, { g: 'music' }], ['country', 1, 2, { g: 'music' }], ['gospel', 2, 2, { g: 'music' }], ['zydeco', 3, 2], ['Cajun music', 3, 2], ['Appalachian folk', 3, 2],
    ['old-time music', 3, 3], ['honky-tonk', 3, 3], ['western swing', 4, 3], ['Delta blues', 3, 2], ['Chicago blues', 3, 2], ['Piedmont blues', 5, 4], ['spirituals', 3, 3], ['work songs', 3, 3],
    ['field hollers', 5, 4], ['string band', 4, 3], ['Tex-Mex', 3, 3], ['rockabilly', 3, 3], ['hillbilly music', 4, 3], ['outlaw country', 3, 3], ['Americana', 3, 3, { g: 'music' }],
    ['folk', 1, 2, { g: 'music' }], ['jug band', 4, 3], ['ragtime', 3, 3], ['swamp pop', 5, 4], ['swamp blues', 5, 4], ['Texas blues', 4, 3], ['sacred harp', 5, 4], ['shape-note singing', 5, 4],
    ['mountain music', 3, 2], ['bluegrass gospel', 5, 4], ['Creole music', 5, 4], ['hokum', 5, 5, { g: 'music' }], ['country blues', 4, 3], ['newgrass', 5, 4], ['southern gospel', 4, 3],
    ['Cajun two-step', 5, 4], ['banjo music', 3, 3], ['fiddle tune', 4, 3],
  ],

  // ---------------------------------------------------------------- european folk music
  european_folk_music: [
    ['polka', 2, 2], ['flamenco', 2, 2], ['fado', 4, 3], ['klezmer', 4, 3], ['yodeling', 3, 3, { al: [['yodelling', 'spelling', 3, 3, ['UK']]] }], ['sea shanty', 2, 2, { al: [['shanty', 'synonym', 3, 3, { g: 'song' }]] }],
    ['ceilidh music', 4, 3], ['rembetika', 5, 4], ['tarantella', 3, 3], ['mazurka', 3, 3], ['polonaise', 3, 3], ['hora', 4, 4], ['czardas', 4, 3], ['schlager', 4, 3],
    ['oompah', 3, 2], ['Volksmusik', 5, 4], ['joik', 5, 4], ['polska', 5, 4, { g: 'dance' }], ['Romani music', 4, 3], ['manele', 5, 4], ['chalga', 5, 4], ['turbo-folk', 5, 4], ['sirtaki', 4, 3],
    ['Balkan brass', 4, 3], ['tamburica', 5, 5], ['sardana', 5, 4], ['jota', 5, 4], ['muneira', 5, 5], ['fandango', 3, 3], ['Nordic folk', 3, 3], ['kolo', 5, 4],
    ['Irish folk', 2, 2], ['Celtic music', 2, 2], ['bagpipe music', 3, 3], ['skiffle', 4, 4], ['laiko', 5, 5], ['canzone napoletana', 5, 5], ['waltz musette', 5, 5], ['gypsy jazz', 4, 4],
  ],

  // ---------------------------------------------------------------- classical voice types
  classical_voice_types: [
    ['soprano', 1, 1, { g: 'singer' }], ['mezzo-soprano', 3, 2], ['alto', 2, 2], ['contralto', 3, 2], ['tenor', 1, 1, { g: 'singer' }], ['baritone', 2, 1], ['bass', 1, 2, { g: 'voice' }],
    ['countertenor', 4, 3], ['bass-baritone', 4, 3], ['treble', 3, 3, { g: 'music' }], ['coloratura', 4, 3, { al: [['coloratura soprano', 'synonym', 4, 3]] }], ['lyric soprano', 4, 3],
    ['dramatic soprano', 4, 3], ['soubrette', 5, 4], ['spinto', 5, 5], ['heldentenor', 5, 4], ['basso profondo', 5, 4], ['castrato', 4, 4], ['boy soprano', 3, 3], ['falsetto', 3, 4],
    ['lyric tenor', 4, 3], ['dramatic tenor', 4, 3], ['bass buffo', 5, 5], ['mezzo', 3, 2], ['sopranist', 5, 5], ['baritenor', 5, 5], ['lyric baritone', 5, 4],
    ['leggero', 5, 5], ['basso cantante', 5, 5], ['tenore di grazia', 5, 5], ['dramatic mezzo', 5, 5],
  ],

  // ---------------------------------------------------------------- orchestra sections (complete)
  orchestra_sections: [
    ['strings', 1, 1, { g: 'music', al: [['string section', 'synonym', 2, 2]] }], ['woodwinds', 2, 1, { al: [['woodwind section', 'synonym', 3, 2]] }],
    ['brass', 1, 1, { g: 'music', al: [['brass section', 'synonym', 2, 2]] }], ['percussion', 2, 1, { g: 'music', al: [['percussion section', 'synonym', 3, 2]] }],
  ],

  // ---------------------------------------------------------------- baroque composers
  baroque_composers: [
    ['Bach', 1, 1, C({ al: [['Johann Sebastian Bach', 'synonym', 3, 2, [], { g: '' }], ['J.S. Bach', 'synonym', 4, 3]] })], ['Handel', 2, 1, C({ al: [['George Frideric Handel', 'synonym', 4, 3]] })], ['Vivaldi', 2, 1, P({ al: [['Antonio Vivaldi', 'synonym', 3, 2]] })], ['Telemann', 4, 3, P()], ['Purcell', 3, 3, P({ al: [['Henry Purcell', 'synonym', 4, 3]] })], ['Monteverdi', 4, 3, P()], ['Corelli', 4, 3, P()],
    ['Scarlatti', 4, 3, C()], ['Rameau', 4, 3, P({ al: [['Jean-Philippe Rameau', 'synonym', 5, 4]] })], ['Couperin', 4, 4, P()], ['Pachelbel', 3, 2, P()], ['Albinoni', 4, 3, P()], ['Buxtehude', 5, 4, P()], ['Lully', 4, 4, P()],
    ['Charpentier', 5, 4, P()], ['Biber', 5, 4, P({ g: 'composer' })], ['Heinrich Schutz', 5, 4, P()], ['Frescobaldi', 5, 4, P()], ['Tartini', 5, 4, P()], ['Locatelli', 5, 5, P()],
    ['Geminiani', 5, 5, P()], ['Torelli', 5, 5, P()], ['Zelenka', 5, 5, P()], ['Froberger', 5, 5, P()], ['Cavalli', 5, 5, P({ g: 'composer' })], ['Carissimi', 5, 5, P()],
    ['Bononcini', 5, 5, P()], ['Allegri', 4, 4, P()], ['Marais', 5, 5, P({ g: 'composer' })], ['Leclair', 5, 5, P({ g: 'composer' })],
  ],

  // ---------------------------------------------------------------- romantic composers
  romantic_composers: [
    ['Chopin', 1, 1, P({ al: [['Frederic Chopin', 'synonym', 3, 2]] })], ['Liszt', 2, 2, P({ al: [['Franz Liszt', 'synonym', 3, 2]] })], ['Schumann', 3, 2, C()], ['Brahms', 2, 2, P({ al: [['Johannes Brahms', 'synonym', 3, 2]] })], ['Tchaikovsky', 2, 1, P()], ['Schubert', 2, 2, P()], ['Mendelssohn', 3, 2, P()],
    ['Wagner', 2, 2, C()], ['Berlioz', 4, 3, P()], ['Dvorak', 3, 3, P()], ['Grieg', 3, 3, P()], ['Rachmaninoff', 3, 2, P()], ['Mahler', 3, 3, P()], ['Bruckner', 4, 3, P()],
    ['Smetana', 4, 3, P()], ['Saint-Saens', 4, 3, P()], ['Paganini', 3, 3, P()], ['Rimsky-Korsakov', 4, 3, P()], ['Mussorgsky', 4, 3, P()], ['Borodin', 5, 4, P()], ['Elgar', 3, 3, P({ reg: ['UK'] })],
    ['Sibelius', 4, 3, P()], ['Faure', 4, 3, C()], ['Carl Maria von Weber', 5, 4, P()], ['Cesar Franck', 5, 4, P()], ['Bizet', 3, 3, P()], ['Glinka', 5, 4, P()], ['Balakirev', 5, 5, P()],
    ['Bruch', 5, 4, P({ g: 'composer' })], ['Lalo', 5, 5, P({ g: 'composer' })], ['Massenet', 5, 4, P()], ['Richard Strauss', 4, 3, P()], ['Clara Schumann', 4, 3, P()], ['Fanny Mendelssohn', 5, 4, P()],
    ['Cesar Cui', 5, 5, P()], ['Wieniawski', 5, 5, P()],
  ],

  // ---------------------------------------------------------------- opera composers
  opera_composers: [
    ['Verdi', 2, 1, C({ al: [['Giuseppe Verdi', 'synonym', 3, 2]] })], ['Puccini', 2, 1, P({ al: [['Giacomo Puccini', 'synonym', 3, 2]] })], ['Mozart', 1, 2, P()], ['Wagner', 2, 1, C()], ['Rossini', 3, 2, P({ al: [['Gioachino Rossini', 'synonym', 4, 3]] })], ['Donizetti', 4, 2, P({ al: [['Gaetano Donizetti', 'synonym', 5, 3]] })], ['Bellini', 4, 3, C({ al: [['Vincenzo Bellini', 'synonym', 5, 3]] })], ['Bizet', 3, 2, P()],
    ['Gounod', 4, 3, P()], ['Massenet', 5, 4, P()], ['Richard Strauss', 4, 3, P()], ['Britten', 4, 3, P({ reg: ['UK'], al: [['Benjamin Britten', 'synonym', 4, 3]] })], ['Gluck', 5, 4, P()], ['Monteverdi', 4, 3, P()], ['Leoncavallo', 5, 3, P()],
    ['Mascagni', 5, 3, P()], ['Offenbach', 4, 4, P()], ['Janacek', 5, 4, P()], ['Humperdinck', 5, 4, P()], ['Alban Berg', 5, 4, P()], ['Menotti', 5, 5, P()], ['John Adams', 4, 4, P({ g: 'composer' })],
    ['Philip Glass', 3, 4, P()], ['Weber', 4, 4, C()], ['Smetana', 4, 4, P()], ['Prokofiev', 4, 4, P()], ['Poulenc', 5, 5, P()], ['Meyerbeer', 5, 4, P()], ['Lully', 4, 4, P()], ['Purcell', 3, 4, P()],
    ['Handel', 2, 3, C()], ['Mussorgsky', 4, 4, P()], ['Tchaikovsky', 2, 4, P()],
  ],

  // ---------------------------------------------------------------- film composers
  film_composers: [
    ['John Williams', 2, 1, P({ g: 'composer' })], ['Hans Zimmer', 2, 1, P()], ['Ennio Morricone', 3, 2, P()], ['Howard Shore', 3, 2, P()], ['James Horner', 3, 2, P()], ['Danny Elfman', 3, 2, P()],
    ['Alan Silvestri', 4, 3, P()], ['Jerry Goldsmith', 4, 3, P()], ['Bernard Herrmann', 4, 3, P()], ['Max Steiner', 5, 4, P()], ['John Barry', 3, 3, P({ g: 'composer' })], ['Henry Mancini', 3, 3, P()],
    ['Vangelis', 3, 3, P()], ['Alexandre Desplat', 4, 3, P()], ['Thomas Newman', 4, 3, P()], ['Randy Newman', 3, 3, P()], ['Michael Giacchino', 4, 3, P()], ['Ludwig Goransson', 4, 3, P()],
    ['Hildur Gudnadottir', 5, 4, P()], ['Nino Rota', 4, 3, P()], ['Elmer Bernstein', 4, 3, P()], ['Maurice Jarre', 4, 3, P()], ['Bear McCreary', 5, 4, P()], ['Trent Reznor', 3, 4, P()],
    ['Clint Mansell', 4, 4, P()], ['Ramin Djawadi', 4, 3, P()], ['Rachel Portman', 5, 4, P()], ['Ryuichi Sakamoto', 4, 4, P()], ['Lalo Schifrin', 5, 4, P()], ['Dimitri Tiomkin', 5, 5, P()],
    ['Miklos Rozsa', 5, 5, P()], ['Basil Poledouris', 5, 4, P()], ['Carter Burwell', 5, 4, P()], ['Jonny Greenwood', 3, 4, P()], ['Mychael Danna', 5, 5, P()], ['Joe Hisaishi', 4, 3, P()],
    ['Elliot Goldenthal', 5, 5, P()], ['Patrick Doyle', 5, 5, P()], ['Johann Johannsson', 5, 4, P()],
  ],

  // ---------------------------------------------------------------- the beatles (complete)
  the_beatles: [
    ['John Lennon', 1, 1, P({ al: [['Lennon', 'synonym', 2, 2, [], { g: 'Beatle' }]] })],
    ['Paul McCartney', 1, 1, P({ al: [['McCartney', 'synonym', 2, 2], ['Macca', 'synonym', 4, 4, ['UK']]] })],
    ['George Harrison', 1, 1, P({ al: [['George Harrison', 'synonym', 1, 1]].slice(1) })],
    ['Ringo Starr', 1, 1, P({ al: [['Ringo', 'synonym', 1, 1], ['Richard Starkey', 'synonym', 5, 4]] })],
  ],

  // ---------------------------------------------------------------- queen members (complete)
  queen_members: [
    ['Freddie Mercury', 1, 1, P({ al: [['Farrokh Bulsara', 'synonym', 5, 4]] })],
    ['Brian May', 2, 1, P()],
    ['Roger Taylor', 3, 2, P({ g: 'drummer' })],
    ['John Deacon', 3, 3, P()],
  ],

  // ---------------------------------------------------------------- abba members (complete)
  abba_members: [
    ['Agnetha Faltskog', 3, 1, P({ al: [['Agnetha', 'synonym', 3, 1]] })],
    ['Bjorn Ulvaeus', 3, 1, P({ al: [['Bjorn', 'synonym', 3, 2, [], { g: 'ABBA' }]] })],
    ['Benny Andersson', 3, 1, P({ al: [['Benny', 'synonym', 3, 2, [], { g: 'ABBA' }]] })],
    ['Anni-Frid Lyngstad', 3, 1, P({ al: [['Frida', 'synonym', 3, 1]] })],
  ],
};

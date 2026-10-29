// Depth-3 word batch: Arts & Entertainment chunk 1 (instruments, music styles, music words, composers).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const P = (o = {}) => ({ type: 'person', ...o });
const PR = (o = {}) => ({ type: 'proper', ...o });
const ph = (o = {}) => ({ type: 'phrase', ...o });

export const THEMES = {
  string_instruments: { d: 1 }, woodwind_instruments: { d: 2 }, brass_instruments: { d: 2 }, percussion_instruments: { d: 2 }, keyboard_instruments: { d: 1 },
  folk_instruments: { d: 4 }, electronic_instruments: { d: 3 }, instrument_parts: { d: 3 }, classroom_instruments: { d: 2 },
  music_genres: { d: 1 }, classical_forms: { d: 4 }, jazz_words: { d: 4 }, world_music_styles: { d: 4 }, song_types: { d: 2 }, hip_hop_words: { d: 3 },
  music_terms: { d: 3 }, voice_types: { d: 2 }, orchestra_words: { d: 3 }, tempo_words: { d: 4 }, dynamics_markings: { d: 4 },
  notes_and_rests: { d: 3 }, concert_words: { d: 2 }, recording_studio_words: { d: 4 }, music_festivals: { d: 2 },
  music_players: { d: 1 }, rock_band_lineup: { d: 1 }, musical_modes: { d: 5 }, solfege_notes: { d: 2 },
  note_values: { d: 3 }, composers: { d: 2 },
};

export const FIXES = [{ gloss: ['LA', 'cities', 'Los Angeles'] }];

export const DATA = {
  // ---------------------------------------------------------------- string instruments
  string_instruments: [
    ['guitar', 1, 1], ['violin', 1, 1, { al: [['fiddle', 'synonym', 2, 3]] }], ['cello', 1, 1], ['harp', 1, 1], ['banjo', 2, 2], ['ukulele', 1, 2, { al: [['uke', 'synonym', 3, 3]] }],
    ['double bass', 2, 2, { al: [['upright bass', 'synonym', 3, 3], ['contrabass', 'synonym', 4, 4]] }], ['viola', 3, 3], ['mandolin', 3, 3], ['lute', 3, 3], ['sitar', 4, 4],
    ['balalaika', 4, 4], ['zither', 4, 4], ['bass guitar', 2, 2], ['electric guitar', 1, 1], ['acoustic guitar', 1, 1], ['harpsichord', 3, 4],
    ['dulcimer', 4, 4], ['bouzouki', 4, 4], ['lyre', 3, 3], ['koto', 4, 4], ['oud', 4, 4], ['banjolele', 5, 4], ['hurdy-gurdy', 4, 4], ['theorbo', 5, 5], ['viol', 5, 4, { g: 'instrument' }],
    ['rebec', 5, 5], ['cittern', 5, 5], ['autoharp', 4, 4, { tm: true }], ['psaltery', 5, 5], ['erhu', 4, 4], ['pedal steel', 4, 4], ['violone', 5, 5], ['charango', 5, 5],
  ],

  // ---------------------------------------------------------------- woodwind
  woodwind_instruments: [
    ['flute', 1, 1], ['clarinet', 1, 1], ['saxophone', 1, 1, { al: [['sax', 'synonym', 2, 2]] }], ['recorder', 1, 2, { g: 'instrument' }], ['oboe', 2, 2], ['bassoon', 2, 2],
    ['piccolo', 2, 2], ['bagpipes', 2, 3], ['tin whistle', 3, 3, { al: [['penny whistle', 'synonym', 3, 3]] }],
    ['English horn', 4, 4, { al: [['cor anglais', 'synonym', 4, 4]] }], ['contrabassoon', 4, 4], ['bass clarinet', 3, 3], ['alto flute', 4, 4], ['bass flute', 4, 4],
    ['alto saxophone', 3, 3], ['tenor saxophone', 3, 3], ['baritone sax', 4, 4], ['soprano sax', 4, 4], ['pan flute', 3, 3, { al: [['panpipes', 'synonym', 3, 3]] }], ['ocarina', 3, 4],
    ['shawm', 5, 5], ['bass oboe', 5, 5], ['basset horn', 5, 5], ['crumhorn', 5, 5], ['sopranino', 5, 5], ['heckelphone', 5, 5], ['fife', 3, 3, { g: 'instrument' }], ['shakuhachi', 4, 4],
    ['duduk', 5, 5], ['chalumeau', 5, 5], ["oboe d'amore", 5, 5], ['bansuri', 5, 5],
  ],

  // ---------------------------------------------------------------- brass
  brass_instruments: [
    ['trumpet', 1, 1], ['trombone', 1, 1], ['tuba', 1, 1], ['French horn', 2, 2], ['cornet', 3, 3], ['bugle', 2, 2], ['euphonium', 4, 4], ['flugelhorn', 4, 4], ['sousaphone', 4, 4],
    ['bass trombone', 4, 3], ['piccolo trumpet', 4, 4], ['baritone horn', 4, 4], ['tenor horn', 4, 4], ['alto horn', 4, 4], ['mellophone', 5, 5], ['bass tuba', 4, 4], ['natural horn', 5, 5],
    ['alphorn', 4, 4], ['sackbut', 5, 5], ['serpent', 5, 4, { g: 'instrument' }], ['ophicleide', 5, 5], ['vuvuzela', 3, 4],
    ['post horn', 5, 5], ['cimbasso', 5, 5], ['wagner tuba', 5, 5], ['slide trombone', 4, 3], ['hunting horn', 4, 4], ['shofar', 4, 4, { sens: true }],
    ['horn', 2, 2, { g: 'instrument' }],
  ],

  // ---------------------------------------------------------------- percussion
  percussion_instruments: [
    ['drum', 1, 1, { g: 'instrument' }], ['drums', 1, 1, { al: [['drum kit', 'synonym', 2, 2]] }], ['cymbals', 1, 1], ['tambourine', 1, 1], ['triangle', 1, 2, { g: 'instrument' }], ['xylophone', 1, 1],
    ['bongos', 2, 2], ['maracas', 3, 2], ['castanets', 3, 3], ['gong', 2, 2, { al: [['tam-tam', 'synonym', 4, 4]] }], ['snare drum', 2, 2], ['bass drum', 2, 2], ['timpani', 3, 3, { al: [['kettledrum', 'synonym', 3, 3]] }],
    ['glockenspiel', 3, 3], ['marimba', 3, 3], ['vibraphone', 3, 3], ['cowbell', 2, 2], ['woodblock', 3, 3], ['congas', 3, 3], ['tom-tom', 3, 3], ['hi-hat', 3, 3], ['tabla', 4, 4],
    ['djembe', 4, 4], ['cajon', 4, 4], ['steel drum', 2, 2, { al: [['steelpan', 'synonym', 4, 3]] }], ['tubular bells', 4, 4], ['guiro', 5, 5], ['claves', 4, 4], ['timbales', 4, 4],
    ['washboard', 3, 3], ['rainstick', 3, 3], ['cabasa', 5, 5], ['agogo', 5, 5], ['vibraslap', 5, 5], ['bodhran', 4, 4], ['cuica', 5, 5], ['crash cymbal', 3, 3], ['ride cymbal', 4, 4],
    ['chimes', 2, 2, { g: 'instrument' }], ['sleigh bells', 2, 3], ['spoons', 3, 4, { g: 'instrument' }], ['rattle', 1, 3, { g: 'instrument' }], ['shaker', 2, 3, { g: 'instrument' }],
  ],

  // ---------------------------------------------------------------- keyboard
  keyboard_instruments: [
    ['piano', 1, 1, { al: [['pianoforte', 'synonym', 4, 3]] }], ['organ', 1, 2, { g: 'instrument' }], ['keyboard', 1, 1, { g: 'instrument' }], ['synthesizer', 2, 2, { al: [['synth', 'synonym', 2, 2]] }],
    ['harpsichord', 3, 3], ['accordion', 1, 3], ['grand piano', 1, 1], ['upright piano', 2, 2], ['electric piano', 2, 2], ['celesta', 4, 4], ['clavichord', 4, 4],
    ['harmonium', 4, 4], ['pipe organ', 2, 2], ['Hammond organ', 3, 3, { tm: true, type: 'proper' }], ['Rhodes piano', 4, 4, { tm: true, type: 'proper' }], ['melodica', 3, 3], ['spinet', 5, 4],
    ['virginal', 5, 5, { g: 'instrument' }], ['fortepiano', 5, 4], ['mellotron', 5, 5, { tm: true }], ['clavinet', 5, 5, { tm: true }], ['player piano', 3, 3, { al: [['pianola', 'synonym', 4, 4]] }],
    ['baby grand', 3, 3], ['digital piano', 2, 2], ['stage piano', 4, 4], ['toy piano', 2, 2], ['concert grand', 4, 3], ['wurlitzer', 4, 4, { tm: true }], ['cathedral organ', 3, 2],
    ['calliope', 4, 4], ['carillon', 5, 4],
  ],

  // ---------------------------------------------------------------- folk instruments
  folk_instruments: [
    ['bagpipes', 2, 2], ['banjo', 2, 3], ['accordion', 1, 3], ['didgeridoo', 3, 2], ['sitar', 4, 3], ['bouzouki', 4, 3], ['balalaika', 4, 3], ['mandolin', 3, 3], ['hurdy-gurdy', 4, 3],
    ['tin whistle', 3, 3], ['bodhran', 4, 3], ['uilleann pipes', 5, 4], ['concertina', 3, 3], ['fiddle', 2, 3], ['dulcimer', 4, 3], ['panpipes', 3, 3], ['djembe', 4, 3], ['kora', 5, 4],
    ['mbira', 5, 4, { al: [['thumb piano', 'synonym', 3, 3], ['kalimba', 'synonym', 4, 4]] }], ['oud', 4, 3], ['tabla', 4, 3], ['koto', 4, 3], ['shamisen', 4, 4], ['erhu', 4, 4], ['pipa', 4, 4],
    ['guzheng', 5, 4], ['taiko', 4, 4], ['santoor', 5, 5], ['sarod', 5, 5], ['veena', 5, 5], ['tanpura', 5, 5], ['ney', 5, 5], ['saz', 5, 5], ['darbuka', 5, 5], ['balafon', 5, 5],
    ['charango', 5, 4], ['quena', 5, 5], ['zampona', 5, 5], ['cuatro', 5, 5], ['harp', 1, 4], ['jaw harp', 4, 4], ['bandura', 5, 5], ['gaida', 5, 5], ['harmonica', 1, 4], ['lyre', 3, 4],
    ['ukulele', 1, 3], ['zurna', 5, 5], ['sheng', 5, 5], ['gamelan', 4, 4], ['marimba', 3, 4],
  ],

  // ---------------------------------------------------------------- electronic
  electronic_instruments: [
    ['synthesizer', 2, 1, { al: [['synth', 'synonym', 2, 2]] }], ['theremin', 4, 3], ['drum machine', 3, 2], ['sampler', 3, 3, { g: 'music' }], ['keytar', 3, 2], ['vocoder', 4, 3], ['sequencer', 4, 3],
    ['electric guitar', 1, 3], ['electric piano', 2, 3], ['electronic drums', 3, 2], ['MIDI controller', 4, 3], ['turntable', 2, 3], ['Moog', 4, 3, { tm: true, type: 'org' }],
    ['ondes Martenot', 5, 5], ['Stylophone', 4, 4, { tm: true }], ['TB-303', 5, 5, { tm: true, type: 'proper' }], ['TR-808', 5, 5, { tm: true, type: 'proper' }],
    ['Fairlight', 5, 5, { tm: true }], ['Hammond organ', 3, 4, { tm: true, type: 'proper' }], ['electric organ', 3, 3], ['electric bass', 2, 2], ['talk box', 4, 4], ['loop pedal', 4, 4],
    ['groovebox', 5, 4], ['modular synth', 4, 3], ['drum pad', 3, 3], ['launchpad', 4, 4, { g: 'music', tm: true }], ['analog synth', 4, 3], ['digital synth', 4, 3], ['Rhodes piano', 4, 4, { tm: true, type: 'proper' }],
    ['Casio keyboard', 3, 3, { tm: true, type: 'proper' }], ['electronic keyboard', 2, 2], ['wavetable synth', 5, 4], ['Minimoog', 5, 5, { tm: true }], ['Mellotron', 5, 4, { tm: true }],
  ],

  // ---------------------------------------------------------------- instrument parts
  instrument_parts: [
    ['string', 1, 2, { g: 'music' }], ['strings', 1, 2, { g: 'music' }], ['bow', 2, 3, { g: 'music' }], ['key', 1, 3, { g: 'music' }], ['keys', 1, 3, { g: 'music' }], ['pedal', 1, 3, { g: 'music' }], ['guitar neck', 2, 2],
    ['fretboard', 3, 2, { al: [['fingerboard', 'synonym', 3, 3]] }], ['fret', 3, 2], ['bridge', 1, 3, { g: 'music' }], ['tuning peg', 3, 3, { al: [['machine head', 'synonym', 4, 4], ['tuning key', 'synonym', 4, 4]] }],
    ['headstock', 3, 3], ['soundboard', 3, 3], ['sound hole', 3, 2], ['pickup', 2, 3, { g: 'music' }], ['whammy bar', 3, 3, { al: [['tremolo arm', 'synonym', 4, 4]] }], ['mouthpiece', 2, 2],
    ['reed', 2, 3, { g: 'music' }], ['valve', 2, 3, { g: 'music' }], ['bell', 1, 4, { g: 'music' }], ['slide', 1, 4, { g: 'music' }], ['mute', 2, 3, { g: 'music' }],
    ['damper', 4, 3], ['soundpost', 5, 5], ['f-hole', 4, 4], ['nut', 1, 5, { g: 'music' }], ['tailpiece', 4, 4], ['chin rest', 4, 3],
    ['endpin', 5, 5], ['capo', 3, 3], ['plectrum', 3, 3, { al: [['pick', 'synonym', 2, 2, [], { g: 'music' }]] }], ['rosin', 3, 3], ['wrest pin', 5, 5], ['keyboard', 1, 3, { g: 'music' }],
    ['pitch pipe', 4, 4], ['truss rod', 5, 5], ['pickguard', 4, 4], ['octave key', 5, 5], ['thumb rest', 5, 5], ['stop', 1, 5, { g: 'organ' }],
  ],

  // ---------------------------------------------------------------- classroom
  classroom_instruments: [
    ['recorder', 1, 1, { g: 'instrument' }], ['tambourine', 1, 1], ['xylophone', 1, 1], ['triangle', 1, 1, { g: 'instrument' }], ['maracas', 3, 2], ['glockenspiel', 3, 2], ['castanets', 3, 3],
    ['cowbell', 2, 3], ['claves', 4, 3], ['woodblock', 3, 2], ['hand drum', 2, 2], ['jingle bells', 1, 2], ['handbells', 3, 3], ['shaker', 2, 2, { g: 'instrument' }], ['rainstick', 3, 3],
    ['kazoo', 2, 3], ['ukulele', 1, 3], ['keyboard', 1, 3, { g: 'instrument' }], ['metallophone', 5, 4], ['chime bars', 4, 3], ['guiro', 5, 4], ['bongos', 2, 3], ['tone block', 5, 4], ['finger cymbals', 4, 3],
    ['sleigh bells', 2, 3], ['rhythm sticks', 4, 3], ['egg shaker', 3, 2], ['whistle', 1, 4, { g: 'instrument' }], ['harmonica', 1, 4], ['melodica', 3, 3], ['slide whistle', 3, 3], ['cabasa', 5, 5],
    ['tone bars', 5, 4], ['boomwhackers', 4, 3, { tm: true }],
  ],

  // ---------------------------------------------------------------- music genres
  music_genres: [
    ['rock music', 1, 1], ['pop', 1, 1, { g: 'music' }], ['jazz', 1, 1], ['blues', 1, 1], ['country', 1, 1, { g: 'music' }], ['hip hop', 1, 1, { al: [['hip-hop', 'spelling', 1, 1]] }],
    ['classical', 1, 1, { g: 'music' }], ['reggae', 1, 1], ['metal', 1, 1, { g: 'music', al: [['heavy metal', 'synonym', 1, 1]] }], ['punk', 1, 1, { g: 'music' }], ['folk', 1, 1, { g: 'music' }],
    ['soul', 1, 1, { g: 'music' }], ['disco', 1, 1], ['funk', 2, 2], ['gospel', 2, 2], ['rap', 1, 1, { g: 'music' }], ['R&B', 2, 2, { type: 'acronym' }], ['opera', 1, 3], ['techno', 2, 2],
    ['house music', 2, 2], ['indie', 2, 2], ['grunge', 3, 3], ['ska', 3, 3], ['swing', 2, 3, { g: 'music' }], ['bluegrass', 3, 3], ['salsa', 2, 3, { g: 'music' }], ['trance', 3, 3, { g: 'music' }],
    ['dubstep', 3, 3], ['emo', 3, 3, { g: 'music' }], ['drum and bass', 3, 3], ['ambient', 3, 3, { g: 'music' }], ['new wave', 3, 3], ['Motown', 3, 3, { type: 'org' }], ['K-pop', 3, 3], ['Britpop', 3, 3],
    ['shoegaze', 5, 5], ['trip hop', 4, 4], ['math rock', 5, 5], ['doo-wop', 4, 4], ['zydeco', 5, 5], ['vaporwave', 5, 5], ['bossa nova', 4, 4], ['krautrock', 5, 5], ['trap', 3, 4, { g: 'music' }],
    ['synthpop', 4, 4], ['glam rock', 3, 3], ['psychedelia', 4, 4], ['rockabilly', 4, 4], ['easy listening', 3, 3],
  ],

  // ---------------------------------------------------------------- classical forms
  classical_forms: [
    ['symphony', 2, 1], ['concerto', 3, 2], ['sonata', 3, 2], ['opera', 1, 2], ['overture', 3, 2], ['fugue', 3, 3], ['suite', 3, 3, { g: 'music' }], ['requiem', 3, 3], ['mass', 2, 4, { g: 'music', sens: true }],
    ['oratorio', 4, 3], ['cantata', 4, 3], ['nocturne', 4, 3], ['prelude', 3, 3], ['etude', 4, 3], ['waltz', 2, 4], ['minuet', 4, 3],
    ['rhapsody', 4, 3], ['serenade', 3, 3], ['toccata', 4, 4], ['partita', 5, 4], ['divertimento', 5, 4], ['concerto grosso', 5, 4], ['string quartet', 3, 3], ['piano trio', 4, 3],
    ['symphonic poem', 5, 4, { al: [['tone poem', 'synonym', 5, 4]] }], ['scherzo', 4, 4], ['impromptu', 4, 4], ['bagatelle', 5, 5], ['capriccio', 5, 5], ['passacaglia', 5, 5], ['chaconne', 5, 5],
    ['sinfonia', 5, 4], ['rondo', 4, 4], ['intermezzo', 4, 4], ['berceuse', 5, 5], ['barcarolle', 5, 5], ['polonaise', 4, 4], ['mazurka', 4, 4], ['lied', 4, 4], ['madrigal', 4, 4], ['motet', 5, 4],
    ['aria', 3, 3], ['arioso', 5, 5], ['fantasia', 4, 4], ['variations', 3, 4], ['theme and variations', 4, 4], ['gavotte', 5, 5], ['sarabande', 5, 5], ['gigue', 5, 5],
  ],

  // ---------------------------------------------------------------- jazz words
  jazz_words: [
    ['swing', 2, 2, { g: 'music' }], ['bebop', 3, 2, { al: [['bop', 'synonym', 3, 3]] }], ['improvisation', 3, 3, { al: [['improv', 'synonym', 3, 3]] }], ['scat', 3, 2, { g: 'music' }], ['riff', 2, 3],
    ['lick', 3, 4, { g: 'music' }], ['groove', 2, 3], ['standard', 2, 4, { g: 'music' }], ['jam session', 2, 3, { al: [['jam', 'synonym', 2, 3, [], { g: 'music' }]] }],
    ['syncopation', 4, 3], ['blue note', 4, 3], ['walking bass', 4, 3], ['comping', 5, 4], ['big band', 2, 2], ['Dixieland', 3, 2], ['ragtime', 3, 3], ['cool jazz', 3, 2], ['hard bop', 5, 4],
    ['fusion', 3, 4, { g: 'music' }], ['free jazz', 4, 3], ['trad jazz', 4, 3], ['gypsy jazz', 4, 3], ['vamp', 4, 4, { g: 'music' }], ['chart', 2, 4, { g: 'music' }], ['head', 1, 5, { g: 'jazz' }],
    ['trading fours', 5, 5, ph()], ['ride cymbal', 4, 4], ['brushes', 3, 4, { g: 'drum' }], ['hep', 4, 3], ['hepcat', 4, 3], ['gig', 2, 3, { g: 'music' }],
    ['jazz standard', 3, 2], ['chops', 4, 4, { g: 'music' }], ['bossa nova', 4, 3], ['second line', 5, 4], ['modal jazz', 5, 4], ['sideman', 4, 4],
    ['changes', 3, 5, { g: 'jazz' }],
  ],

  // ---------------------------------------------------------------- world music styles
  world_music_styles: [
    ['reggae', 1, 1], ['salsa', 2, 2, { g: 'music' }], ['samba', 2, 2], ['tango', 2, 2], ['flamenco', 2, 2], ['bossa nova', 4, 3], ['calypso', 3, 2], ['mariachi', 2, 3], ['fado', 4, 3],
    ['afrobeat', 3, 3], ['bhangra', 3, 3], ['rumba', 3, 3], ['merengue', 3, 3], ['bachata', 3, 3], ['cumbia', 4, 3], ['reggaeton', 3, 3], ['highlife', 4, 4], ['soca', 4, 4], ['zouk', 5, 4],
    ['qawwali', 5, 4], ['rai', 5, 5, { g: 'music' }], ['raga', 4, 4], ['gamelan', 4, 4], ['klezmer', 4, 3], ['polka', 3, 3], ['ceilidh', 4, 3], ['tarantella', 4, 4], ['K-pop', 3, 3], ['J-pop', 4, 3],
    ['bollywood', 3, 3], ['mbaqanga', 5, 5], ['juju', 5, 5, { g: 'music' }], ['mento', 5, 5], ['dancehall', 3, 3], ['ska', 3, 3], ['zydeco', 5, 4], ['tejano', 5, 4], ['bluegrass', 3, 3],
    ['norteno', 5, 5], ['joik', 5, 5], ['rebetiko', 5, 5], ['tropicalia', 5, 5], ['gqom', 5, 5], ['amapiano', 4, 4], ['kuduro', 5, 5], ['kizomba', 5, 5], ['forro', 5, 5], ['choro', 5, 5],
    ['chanson', 4, 4], ['schlager', 5, 5], ['gagaku', 5, 5], ['enka', 5, 5], ['dangdut', 5, 5],
  ],

  // ---------------------------------------------------------------- song types
  song_types: [
    ['ballad', 2, 2], ['lullaby', 1, 1], ['anthem', 2, 2, { g: 'song' }], ['hymn', 2, 2, { sens: true }], ['carol', 1, 2], ['love song', 1, 1], ['nursery rhyme', 1, 3], ['jingle', 2, 2], ['theme song', 1, 1],
    ['lament', 3, 3], ['sea shanty', 2, 2, { al: [['shanty', 'synonym', 3, 3]] }], ['folk song', 1, 1], ['pop song', 1, 1], ['protest song', 2, 2], ['drinking song', 2, 2], ['duet', 2, 2],
    ['aria', 3, 3], ['serenade', 3, 3], ['spiritual', 3, 3, { g: 'music', sens: true }], ['chant', 2, 3, { g: 'music' }], ['round', 2, 4, { g: 'music' }], ['canon', 3, 4, { g: 'music' }], ['ditty', 3, 3],
    ['power ballad', 3, 2], ['torch song', 4, 3], ['elegy', 4, 3, { sens: true }], ['dirge', 4, 3, { sens: true }], ['threnody', 5, 4, { sens: true }], ['madrigal', 4, 3], ['roundelay', 5, 5],
    ['chorale', 4, 4], ['psalm', 3, 3, { sens: true }], ['work song', 3, 3], ['chanson', 4, 4], ['cover version', 3, 3], ['single', 1, 3, { g: 'music' }], ['party anthem', 3, 3],
    ['campfire song', 2, 2], ['marching song', 3, 3], ['birthday song', 1, 2], ['wassail', 5, 4], ['paean', 5, 4],
  ],

  // ---------------------------------------------------------------- hip hop
  hip_hop_words: [
    ['rap', 1, 1, { g: 'music' }], ['beat', 1, 2, { g: 'music' }], ['rhyme', 1, 2], ['flow', 2, 2, { g: 'rap' }], ['bars', 2, 2, { g: 'rap' }], ['freestyle', 2, 2], ['cypher', 4, 3], ['MC', 2, 2, { type: 'acronym', al: [['emcee', 'spelling', 3, 3, [], { type: 'common' }]] }],
    ['DJ', 1, 2, { type: 'acronym' }], ['scratching', 3, 2], ['mixtape', 3, 2], ['diss', 3, 2, { al: [['diss track', 'synonym', 3, 2]] }],
    ['breakdancing', 3, 3, { al: [['b-boying', 'synonym', 4, 4]] }], ['graffiti', 1, 3], ['boom bap', 4, 4], ['trap', 3, 3, { g: 'music' }], ['sample', 2, 3, { g: 'music' }], ['hook', 2, 3, { g: 'music' }],
    ['verse', 2, 3], ['turntable', 2, 3], ['rap battle', 2, 2], ['punchline', 3, 3], ['ad-lib', 4, 3], ['spit', 1, 4, { g: 'rap', pos: 'verb' }],
    ['dope', 2, 3, { g: 'slang', pos: 'adjective' }], ['bling', 3, 2], ['posse', 3, 3], ['homie', 3, 3], ['swag', 3, 3],
    ['old school', 2, 3, ph()], ['wordplay', 3, 3], ['lyricist', 3, 3], ['b-boy', 4, 3], ['b-girl', 4, 3], ['crossfader', 5, 4], ['backspin', 5, 4],
    ['sixteen bars', 4, 4, ph()], ['boombox', 2, 3], ['grime', 3, 3, { reg: ['UK'] }], ['drill', 3, 4, { g: 'music' }], ['mumble rap', 3, 3], ['lo-fi', 3, 4],
  ],

  // ---------------------------------------------------------------- music terms
  music_terms: [
    ['melody', 1, 1], ['harmony', 2, 1], ['rhythm', 1, 1], ['tempo', 2, 2, { g: 'music' }], ['pitch', 2, 2, { g: 'music' }], ['chord', 2, 2], ['scale', 2, 2, { g: 'music' }], ['key', 1, 2, { g: 'music' }],
    ['note', 1, 2, { g: 'music' }], ['beat', 1, 2, { g: 'music' }], ['bar', 2, 3, { g: 'music' }], ['measure', 2, 3, { g: 'music' }], ['octave', 2, 2], ['treble clef', 2, 2], ['bass clef', 3, 2],
    ['time signature', 3, 2], ['key signature', 3, 2], ['staff', 2, 3, { g: 'music' }], ['stave', 3, 3, { reg: ['UK'] }], ['sharp', 2, 3, { g: 'music' }], ['flat sign', 3, 2], ['natural', 2, 4, { g: 'music' }],
    ['accidental', 3, 3, { g: 'music' }], ['interval', 3, 3, { g: 'music' }], ['timbre', 4, 3], ['tone', 1, 3, { g: 'music' }], ['arpeggio', 3, 3], ['cadence', 4, 3], ['modulation', 4, 3, { g: 'music' }],
    ['syncopation', 4, 3], ['counterpoint', 5, 4], ['polyphony', 5, 4], ['harmonic', 3, 3, { g: 'music' }], ['tonic', 3, 4, { g: 'music' }], ['dominant', 2, 4, { g: 'music' }],
    ['legato', 3, 3], ['staccato', 3, 3], ['glissando', 4, 4], ['vibrato', 3, 3], ['tremolo', 4, 4], ['trill', 3, 3, { g: 'music' }], ['fermata', 4, 4], ['coda', 4, 4], ['refrain', 3, 3],
    ['cantabile', 5, 5], ['enharmonic', 5, 5], ['hemiola', 5, 5], ['leitmotif', 5, 4], ['ostinato', 5, 5], ['appoggiatura', 5, 5], ['mordent', 5, 5], ['sotto voce', 5, 5], ['da capo', 4, 4], ['rubato', 5, 5],
  ],

  // ---------------------------------------------------------------- voice types
  voice_types: [
    ['soprano', 2, 1, { g: 'singer' }], ['alto', 3, 2], ['tenor', 2, 1, { g: 'singer' }], ['bass', 1, 2, { g: 'voice' }], ['baritone', 3, 2], ['mezzo-soprano', 4, 3], ['contralto', 4, 3], ['countertenor', 4, 3],
    ['falsetto', 3, 3], ['treble', 3, 3], ['castrato', 4, 3, { adult: true }], ['coloratura', 5, 4], ['bass-baritone', 5, 4], ['lyric tenor', 5, 4], ['dramatic soprano', 5, 4],
    ['heldentenor', 5, 5], ['basso profondo', 5, 5], ['chest voice', 3, 3], ['head voice', 3, 3], ['whistle register', 5, 5], ['boy soprano', 3, 3], ['spinto', 5, 5], ['soubrette', 5, 5],
    ['lead vocal', 2, 3], ['backing vocal', 2, 3], ['harmony vocal', 3, 3], ['mezzo', 3, 3], ['descant', 4, 4], ['tenor voice', 2, 2], ['bass voice', 2, 2], ['alto voice', 3, 3], ['soprano voice', 2, 2],
    ['vocalist', 2, 3], ['chorister', 3, 4],
  ],

  // ---------------------------------------------------------------- orchestra words
  orchestra_words: [
    ['conductor', 1, 1, { g: 'orchestra' }], ['baton', 2, 2], ['podium', 2, 3], ['maestro', 2, 2, { g: 'conductor' }], ['concertmaster', 4, 3], ['first violin', 3, 2],
    ['second violin', 4, 3], ['string section', 3, 2], ['woodwind section', 3, 2], ['brass section', 2, 2], ['percussion section', 3, 2], ['score', 2, 2, { g: 'music' }], ['music stand', 2, 3],
    ['tuning up', 3, 2], ['pit', 2, 3, { g: 'orchestra' }], ['symphony orchestra', 2, 2], ['chamber orchestra', 3, 2], ['philharmonic', 3, 2], ['rehearsal', 2, 3], ['downbeat', 4, 3], ['tutti', 5, 4],
    ['principal', 3, 4, { g: 'orchestra' }], ['section leader', 4, 3], ['soloist', 2, 3], ['overture', 3, 3], ['movement', 2, 3, { g: 'music' }], ['tuning fork', 3, 4],
    ['repertoire', 4, 4], ['kapellmeister', 5, 5], ['divisi', 5, 5], ['first chair', 4, 3], ['orchestra pit', 2, 2], ['assistant conductor', 4, 3],
    ['guest conductor', 3, 3], ['music director', 3, 3], ['sheet music', 2, 4], ['full score', 4, 3], ['concert hall', 2, 3], ['strings', 1, 3, { g: 'music' }], ['woodwinds', 3, 3],
    ['brass', 1, 4, { g: 'music' }], ['percussion', 2, 3, { g: 'music' }], ['continuo', 5, 5], ['ripieno', 5, 5],
  ],

  // ---------------------------------------------------------------- tempo
  tempo_words: [
    ['allegro', 3, 2], ['andante', 3, 2], ['adagio', 3, 2], ['presto', 3, 2], ['largo', 4, 3], ['moderato', 4, 3], ['vivace', 4, 3], ['lento', 4, 3], ['allegretto', 4, 3], ['larghetto', 5, 4],
    ['prestissimo', 5, 4], ['grave', 5, 5, { g: 'music' }], ['andantino', 5, 4], ['adagietto', 5, 4], ['accelerando', 4, 3], ['ritardando', 4, 3], ['rallentando', 4, 3], ['ritenuto', 5, 4],
    ['a tempo', 4, 4], ['allargando', 5, 5], ['stringendo', 5, 5], ['vivacissimo', 5, 5], ['con brio', 4, 4], ['maestoso', 5, 5], ['tempo giusto', 5, 5], ['sostenuto', 5, 4],
    ['slow', 1, 3, { pos: 'adjective' }], ['fast', 1, 3, { pos: 'adjective' }], ['lively', 2, 4, { pos: 'adjective' }], ['allegro con brio', 4, 4], ['molto allegro', 4, 4], ['meno mosso', 5, 5],
    ['piu mosso', 5, 5], ['affrettando', 5, 5], ['largamente', 5, 5], ['lentissimo', 5, 5], ['tempo primo', 5, 5], ['agitato', 5, 4], ['animato', 5, 4],
  ],

  // ---------------------------------------------------------------- dynamics
  dynamics_markings: [
    ['forte', 3, 2], ['pianissimo', 3, 2], ['fortissimo', 3, 2], ['mezzo piano', 4, 3], ['mezzo forte', 4, 3], ['crescendo', 2, 2], ['diminuendo', 3, 2],
    ['decrescendo', 4, 3], ['sforzando', 5, 4], ['morendo', 5, 5], ['calando', 5, 5], ['smorzando', 5, 5], ['perdendosi', 5, 5], ['rinforzando', 5, 5],
    ['pp', 3, 3, { g: 'dynamics' }], ['ff', 3, 3, { g: 'dynamics' }], ['mp', 4, 3, { g: 'dynamics' }], ['mf', 4, 3, { g: 'dynamics' }],
    ['sf', 5, 4, { g: 'dynamics' }], ['fff', 4, 4, { g: 'dynamics' }], ['ppp', 4, 4, { g: 'dynamics' }], ['fortississimo', 5, 5], ['pianississimo', 5, 5],
    ['marcato', 4, 4], ['accent', 2, 4, { g: 'music' }], ['loud', 1, 3, { pos: 'adjective' }], ['soft', 1, 3, { pos: 'adjective' }], ['hairpin', 4, 4, { g: 'music' }],
    ['poco a poco', 5, 4], ['al niente', 5, 5], ['subito', 5, 4], ['con forza', 5, 5], ['dolce', 4, 4],
  ],

  // ---------------------------------------------------------------- notes and rests
  notes_and_rests: [
    ['whole note', 2, 2, { al: [['semibreve', 'synonym', 3, 3, ['UK']]] }], ['half note', 2, 2, { al: [['minim', 'synonym', 3, 3, ['UK']]] }], ['quarter note', 2, 2, { al: [['crotchet', 'synonym', 3, 3, ['UK']]] }],
    ['eighth note', 2, 2, { al: [['quaver', 'synonym', 3, 3, ['UK']]] }], ['sixteenth note', 3, 2, { al: [['semiquaver', 'synonym', 4, 4, ['UK']]] }], ['thirty-second note', 4, 3, { al: [['demisemiquaver', 'synonym', 5, 5, ['UK']]] }],
    ['sixty-fourth note', 5, 4, { al: [['hemidemisemiquaver', 'synonym', 5, 5, ['UK']]] }], ['whole rest', 3, 3], ['half rest', 3, 3], ['quarter rest', 3, 3], ['eighth rest', 3, 3], ['sixteenth rest', 4, 3],
    ['dotted note', 3, 3], ['dotted half note', 4, 3], ['tied note', 4, 3], ['grace note', 4, 3], ['triplet', 3, 3], ['quintuplet', 5, 4], ['tie', 2, 4, { g: 'music' }], ['dot', 1, 4, { g: 'music' }],
    ['beam', 2, 4, { g: 'music' }], ['flag', 1, 5, { g: 'music' }], ['stem', 2, 4, { g: 'music' }], ['notehead', 4, 3], ['ledger line', 4, 4], ['rest', 1, 3, { g: 'music' }], ['bar rest', 4, 4],
    ['breve', 5, 4, { al: [['double whole note', 'synonym', 5, 5, ['US']]] }], ['fermata', 4, 4], ['clef', 3, 3], ['barline', 3, 3],
    ['semitone', 3, 4], ['whole tone', 3, 4], ['middle C', 3, 3], ['tuplet', 5, 4],
  ],

  // ---------------------------------------------------------------- concert words
  concert_words: [
    ['stage', 1, 1, { g: 'concert' }], ['audience', 1, 1], ['encore', 2, 2, { g: 'music' }], ['ticket', 1, 2, { g: 'concert' }], ['setlist', 3, 2], ['support act', 3, 3], ['headliner', 3, 2],
    ['soundcheck', 3, 2], ['roadie', 3, 2, { g: 'music' }], ['backstage', 2, 2], ['mosh pit', 3, 3], ['crowd', 1, 2, { g: 'concert' }], ['venue', 2, 2], ['amphitheatre', 4, 4, { al: [['amphitheater', 'spelling', 4, 4, ['US']]] }],
    ['arena', 2, 3, { g: 'concert' }], ['spotlight', 1, 3, { g: 'concert' }], ['speakers', 1, 3, { g: 'concert' }], ['amplifier', 2, 3, { al: [['amp', 'synonym', 2, 3]] }],
    ['microphone', 1, 2, { al: [['mic', 'synonym', 2, 2]] }], ['gig', 2, 2, { g: 'music' }], ['world tour', 3, 3], ['fan', 1, 3, { g: 'concert' }], ['merch stand', 4, 3], ['merchandise', 2, 4],
    ['VIP pass', 3, 3], ['front row', 2, 3], ['standing room', 3, 3], ['box office', 2, 4], ['stage diving', 3, 3], ['crowd surfing', 3, 3], ['light show', 2, 3], ['pyrotechnics', 3, 3],
    ['glow stick', 2, 3], ['mixing desk', 4, 3], ['stage left', 3, 3], ['green room', 3, 3], ['curtain call', 3, 3],
    ['intermission', 3, 3], ['sold out', 2, 3, ph()], ['opening act', 3, 2], ['rider', 4, 3, { g: 'concert' }], ['foldback', 5, 4], ['sound engineer', 3, 3],
    ['lighting rig', 4, 3],
  ],

  // ---------------------------------------------------------------- recording studio
  recording_studio_words: [
    ['microphone', 1, 1], ['mixing desk', 3, 2, { al: [['mixing console', 'synonym', 4, 3]] }], ['headphones', 1, 2], ['studio monitors', 4, 3], ['pop filter', 4, 3], ['booth', 2, 4, { g: 'recording' }],
    ['take', 1, 3, { g: 'recording' }], ['overdub', 4, 3], ['multitrack', 4, 3], ['mixdown', 4, 3], ['mastering', 3, 3], ['producer', 2, 2, { g: 'music' }], ['recording engineer', 3, 2],
    ['reverb', 3, 3], ['echo', 1, 4, { g: 'recording' }], ['compressor', 3, 4, { g: 'recording' }], ['equalizer', 3, 3, { al: [['EQ', 'synonym', 3, 3, [], { type: 'acronym' }], ['equaliser', 'spelling', 3, 3, ['UK']]] }],
    ['fader', 4, 3], ['preamp', 4, 3], ['DAW', 4, 3, { type: 'acronym' }], ['click track', 4, 3], ['demo', 2, 3, { g: 'music' }], ['bounce', 2, 5, { g: 'recording' }], ['punch in', 5, 4],
    ['sound booth', 3, 3], ['control room', 3, 2], ['live room', 4, 3], ['patch bay', 5, 4], ['cable', 1, 4, { g: 'recording' }], ['XLR', 5, 4, { type: 'acronym' }], ['phantom power', 5, 4],
    ['gain', 2, 4, { g: 'recording' }], ['mute', 2, 4, { g: 'recording' }], ['pan', 1, 5, { g: 'recording' }], ['reel-to-reel', 4, 3], ['tape machine', 4, 3],
    ['Pro Tools', 4, 3, { tm: true, type: 'proper' }], ['Ableton', 4, 4, { tm: true, type: 'org' }], ['GarageBand', 3, 3, { tm: true, type: 'proper' }],
    ['sample rate', 4, 4], ['latency', 4, 5, { g: 'recording' }], ['clipping', 3, 5, { g: 'recording' }], ['de-esser', 5, 5], ['sidechain', 5, 5], ['stem', 3, 5, { g: 'recording' }],
    ['acoustic panel', 4, 3], ['isolation booth', 4, 3], ['vocal booth', 3, 2],
  ],

  // ---------------------------------------------------------------- music festivals
  music_festivals: [
    ['Glastonbury', 2, 1, PR({ reg: ['UK'] })], ['Coachella', 2, 1, PR()], ['Woodstock', 2, 1, PR()], ['Lollapalooza', 3, 2, PR()], ['Burning Man', 3, 4, PR({ g: 'festival' })],
    ['Reading and Leeds', 3, 2, PR({ reg: ['UK'] })], ['Isle of Wight', 3, 3, PR({ g: 'festival', reg: ['UK'] })], ['Download Festival', 3, 3, PR({ reg: ['UK'] })], ['Bonnaroo', 3, 2, PR()],
    ['Tomorrowland', 3, 2, PR()], ['Ultra', 4, 4, PR({ g: 'festival' })], ['Sziget', 5, 3, PR()], ['Primavera Sound', 4, 3, PR()], ['Roskilde', 4, 3, PR()], ['Wacken Open Air', 4, 3, PR()],
    ['Montreux Jazz', 4, 3, PR()], ['Newport Folk', 4, 3, PR()], ['Newport Jazz', 4, 3, PR()], ['Monterey Pop', 4, 3, PR()], ['Altamont', 4, 4, PR({ g: 'festival', sens: true })],
    ['Live Aid', 3, 2, PR()], ['Live 8', 4, 3, PR()], ['Latitude Festival', 3, 3, PR({ reg: ['UK'] })], ['Bestival', 4, 3, PR({ reg: ['UK'] })], ['Creamfields', 4, 3, PR({ reg: ['UK'] })],
    ['Rock in Rio', 4, 3, PR()], ['Austin City Limits', 3, 3, PR({ tm: true })], ['Lowlands', 5, 4, PR({ g: 'festival' })], ['Fuji Rock', 5, 3, PR()],
    ['Pinkpop', 5, 4, PR()], ['Governors Ball', 5, 4, PR()], ['SXSW', 3, 3, PR({ type: 'acronym' })],
    ['Edinburgh Fringe', 3, 5, PR({ g: 'festival', reg: ['UK'] })], ['Stagecoach', 4, 4, PR({ g: 'festival' })], ['Summerfest', 4, 3, PR()], ['Hellfest', 5, 4, PR()], ['Benicassim', 5, 4, PR()], ['Mad Cool', 5, 4, PR()],
  ],

  // ---------------------------------------------------------------- music players
  music_players: [
    ['radio', 1, 2], ['record player', 1, 1, { al: [['gramophone', 'synonym', 3, 2, ['UK']], ['phonograph', 'synonym', 4, 3, ['US']]] }], ['CD player', 1, 1],
    ['cassette player', 1, 1, { al: [['tape deck', 'synonym', 3, 3]] }], ['MP3 player', 3, 1], ['iPod', 1, 1, { tm: true, type: 'proper' }], ['Walkman', 2, 2, { tm: true, type: 'proper' }], ['jukebox', 2, 1], ['turntable', 2, 2],
    ['boombox', 2, 2], ['stereo', 1, 2, { g: 'music' }], ['Discman', 3, 2, { tm: true, type: 'proper' }], ['music box', 1, 3], ['smart speaker', 2, 3],
    ['Victrola', 4, 3, { tm: true, type: 'proper' }], ['eight-track', 4, 3, { al: [['8-track', 'synonym', 4, 3]] }], ['hi-fi', 2, 2],
    ['music centre', 3, 3, { reg: ['UK'], al: [['music center', 'spelling', 3, 3, ['US']]] }], ['Bluetooth speaker', 1, 2], ['Sonos', 3, 3, { tm: true, type: 'org' }], ['Alexa', 2, 4, { g: 'assistant', tm: true, type: 'proper' }],
    ['MiniDisc', 4, 3, { tm: true }], ['Zune', 4, 3, { tm: true, type: 'proper' }], ['Spotify', 1, 2, { tm: true, type: 'org' }], ['car stereo', 2, 3], ['vinyl player', 2, 2],
    ['reel-to-reel', 4, 3], ['portable speaker', 2, 3], ['clock radio', 2, 4], ['transistor radio', 3, 3],
    ['MP4 player', 3, 3], ['orchestrion', 5, 4],
  ],

  // ---------------------------------------------------------------- rock band lineup
  rock_band_lineup: [
    ['lead singer', 1, 1, { al: [['frontman', 'synonym', 2, 2], ['vocalist', 'synonym', 2, 2]] }], ['lead guitarist', 1, 1], ['rhythm guitarist', 2, 2], ['bassist', 2, 1, { al: [['bass player', 'synonym', 2, 2]] }],
    ['drummer', 1, 1], ['keyboardist', 2, 2, { al: [['keys player', 'synonym', 3, 3]] }], ['backing vocalist', 2, 2], ['backing singer', 2, 2], ['roadie', 3, 3, { g: 'music' }],
    ['guitarist', 1, 1], ['frontwoman', 3, 2], ['percussionist', 3, 3], ['saxophonist', 3, 3], ['band manager', 3, 2], ['tour manager', 3, 3], ['sound engineer', 3, 3], ['producer', 2, 3, { g: 'music' }],
    ['trio', 2, 3], ['quartet', 3, 3], ['guitar tech', 4, 3], ['drum tech', 5, 4], ['session musician', 3, 3], ['sideman', 4, 4],
    ['frontperson', 4, 3], ['bandleader', 3, 3], ['singer-songwriter', 3, 3], ['multi-instrumentalist', 4, 3], ['stage manager', 3, 4],
    ['groupie', 3, 4], ['support band', 3, 3], ['power trio', 4, 3], ['supergroup', 3, 3], ['boy band', 2, 3], ['tribute band', 3, 3], ['wedding band', 2, 3],
    ['bass guitarist', 2, 2], ['singer', 1, 1], ['vocals', 2, 2], ['lead vocals', 2, 2], ['rhythm section', 4, 3], ['horn section', 4, 3],
  ],

  // ---------------------------------------------------------------- modes (complete)
  musical_modes: [
    ['Ionian', 4, 3, { g: 'mode' }], ['Dorian', 4, 3], ['Phrygian', 5, 3], ['Lydian', 5, 3], ['Mixolydian', 5, 3], ['Aeolian', 5, 3], ['Locrian', 5, 3],
  ],

  // ---------------------------------------------------------------- solfege (complete)
  solfege_notes: [
    ['do', 2, 2, { g: 'solfege', al: [['doh', 'spelling', 3, 3]] }], ['re', 3, 2, { g: 'solfege', al: [['ray', 'spelling', 3, 3, [], { g: 'solfege' }]] }], ['mi', 2, 2, { g: 'solfege' }],
    ['fa', 3, 2, { g: 'solfege', al: [['fah', 'spelling', 3, 3]] }], ['sol', 4, 3, { g: 'solfege', al: [['soh', 'spelling', 4, 4]] }],
    ['la', 2, 2, { g: 'solfege', al: [['lah', 'spelling', 3, 3]] }], ['ti', 4, 3, { g: 'solfege', al: [['te', 'spelling', 4, 4, [], { g: 'solfege' }]] }],
  ],

  // ---------------------------------------------------------------- note values (complete)
  note_values: [
    ['whole note', 2, 2, { al: [['semibreve', 'synonym', 3, 3, ['UK']]] }], ['half note', 2, 2, { al: [['minim', 'synonym', 3, 3, ['UK']]] }], ['quarter note', 2, 2, { al: [['crotchet', 'synonym', 3, 3, ['UK']]] }],
    ['eighth note', 2, 2, { al: [['quaver', 'synonym', 3, 3, ['UK']]] }], ['sixteenth note', 3, 2, { al: [['semiquaver', 'synonym', 4, 4, ['UK']]] }],
  ],

  // ---------------------------------------------------------------- composers
  composers: [
    ['Mozart', 1, 1, P()], ['Beethoven', 1, 1, P()], ['Bach', 1, 1, P({ g: 'composer' })], ['Chopin', 1, 1, P()], ['Tchaikovsky', 2, 1, P()], ['Vivaldi', 2, 1, P()], ['Handel', 2, 2, P({ g: 'composer' })],
    ['Brahms', 2, 2, P()], ['Haydn', 3, 2, P()], ['Schubert', 3, 2, P()], ['Liszt', 3, 2, P()], ['Wagner', 2, 3, P({ g: 'composer' })], ['Verdi', 2, 2, P({ g: 'composer' })], ['Puccini', 3, 2, P()],
    ['Debussy', 3, 2, P()], ['Ravel', 3, 2, P()], ['Stravinsky', 3, 2, P()], ['Mahler', 3, 3, P()], ['Dvorak', 3, 3, P()], ['Rachmaninoff', 3, 2, P({ al: [['Rachmaninov', 'spelling', 4, 3]] })],
    ['Elgar', 3, 3, P({ reg: ['UK'] })], ['Holst', 3, 3, P()], ['Copland', 4, 3, P()], ['Gershwin', 2, 2, P()], ['Bernstein', 3, 3, P({ g: 'composer' })], ['Grieg', 3, 3, P()], ['Sibelius', 4, 3, P()],
    ['Schumann', 3, 3, P({ g: 'composer' })], ['Mendelssohn', 3, 3, P()], ['Rossini', 3, 3, P()], ['Bizet', 3, 3, P()], ['Saint-Saens', 4, 3, P()], ['Satie', 4, 3, P()], ['Vaughan Williams', 4, 3, P({ reg: ['UK'] })],
    ['Britten', 4, 3, P({ reg: ['UK'] })], ['Shostakovich', 4, 3, P()], ['Prokofiev', 4, 3, P()], ['Mussorgsky', 4, 3, P()], ['Rimsky-Korsakov', 4, 3, P()], ['Purcell', 4, 3, P()], ['Monteverdi', 4, 3, P()],
    ['Telemann', 5, 4, P()], ['Pachelbel', 4, 3, P()], ['Philip Glass', 3, 3, P()], ['Steve Reich', 4, 4, P()], ['John Cage', 4, 3, P()], ['Schoenberg', 4, 3, P()], ['Bartok', 4, 3, P()], ['Janacek', 5, 4, P()],
    ['Palestrina', 5, 4, P()], ['Hildegard von Bingen', 4, 4, P()], ['Allegri', 5, 4, P()], ['Scarlatti', 5, 4, P({ g: 'composer' })], ['Faure', 4, 4, P({ g: 'composer' })], ['Messiaen', 5, 4, P()], ['Ligeti', 5, 4, P()],
    ['Arvo Part', 5, 4, P()],
  ],
};

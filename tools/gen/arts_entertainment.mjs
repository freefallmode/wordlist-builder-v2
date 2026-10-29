// Generated word data: Arts & Entertainment and the playable themes directly under it
// (instruments, music words, musicians, dance, art, film and tv, literature, architecture).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const adj = (o = {}) => ({ pos: 'adjective', ...o });
const ph = (o = {}) => ({ type: 'phrase', ...o });
const rel = (o = {}) => ({ sens: true, ...o });

export const THEMES = {
  instruments: { d: 2 }, music_words: { d: 3 }, musicians: { d: 2 }, dance: { d: 2 }, art: { d: 2 }, film_and_tv: { d: 2 }, literature: { d: 2 }, architecture: { d: 3 },
};

export const DATA = {
  // ---------------------------------------------------------------- instruments
  instruments: [
    ['piano', 1, 1, { al: [['pianoforte', 'synonym', 4, 3], ['joanna', 'synonym', 5, 5, ['UK'], { g: 'piano' }]] }], ['guitar', 1, 1], ['violin', 1, 1, { al: [['fiddle', 'synonym', 2, 2]] }],
    ['drums', 1, 1, { al: [['drum kit', 'synonym', 2, 2]] }], ['flute', 1, 1], ['trumpet', 1, 1], ['saxophone', 1, 1, { al: [['sax', 'synonym', 2, 2]] }],
    ['clarinet', 1, 1], ['cello', 1, 1], ['harp', 1, 1], ['organ', 1, 2, { g: 'instrument' }], ['accordion', 1, 1, { al: [['squeezebox', 'synonym', 3, 3]] }],
    ['harmonica', 1, 1, { al: [['mouth organ', 'synonym', 3, 2]] }], ['tambourine', 1, 1], ['triangle', 1, 2, { g: 'instrument' }],
    ['xylophone', 1, 1], ['banjo', 1, 1], ['ukulele', 1, 1, { al: [['uke', 'synonym', 3, 3]] }], ['trombone', 1, 1], ['tuba', 1, 1], ['recorder', 1, 2, { g: 'instrument' }],
    ['oboe', 2, 2], ['bassoon', 2, 2], ['piccolo', 2, 2], ['viola', 2, 2], ['double bass', 2, 2, { al: [['contrabass', 'synonym', 4, 4], ['string bass', 'synonym', 4, 4, ['US']]] }],
    ['harpsichord', 2, 2], ['bagpipes', 2, 2, { al: [['pipes', 'synonym', 3, 3, [], { g: 'bagpipes' }]] }], ['kazoo', 2, 2], ['maracas', 2, 2], ['cymbals', 2, 2],
    ['timpani', 3, 2, { al: [['kettledrums', 'synonym', 3, 3]] }], ['glockenspiel', 3, 2], ['marimba', 3, 3], ['mandolin', 3, 3],
    ['synthesizer', 2, 2, { al: [['synth', 'synonym', 2, 2], ['synthesiser', 'spelling', 3, 3, ['UK']]] }],
    ['French horn', 2, 2], ['didgeridoo', 3, 3, { al: [['didjeridu', 'spelling', 5, 5]] }], ['bongos', 3, 3], ['castanets', 3, 3], ['sitar', 3, 3], ['tabla', 4, 4],
    ['lyre', 3, 3], ['ocarina', 4, 4], ['melodica', 4, 4], ['dulcimer', 4, 4], ['theremin', 4, 4], ['hurdy-gurdy', 4, 4], ['sackbut', 5, 5], ['serpent', 4, 4, { g: 'instrument' }],
    ['shawm', 5, 5], ['cimbalom', 5, 5], ['nyckelharpa', 5, 5], ['ondes Martenot', 5, 5, ph()], ['crwth', 5, 5], ['hang drum', 5, 5], ['glass harmonica', 5, 5],
    ['cornet', 3, 3], ['spinet', 5, 5], ['bodhrán', 4, 4, { reg: ['IE'], al: [['bodhran', 'spelling', 4, 4, ['IE']]] }], ['vuvuzela', 3, 3, { reg: ['ZA'] }],
  ],

  // ---------------------------------------------------------------- music words
  music_words: [
    ['melody', 1, 1], ['rhythm', 1, 1], ['harmony', 1, 1], ['beat', 1, 1, { g: 'music' }], ['chorus', 1, 1], ['verse', 1, 1], ['lyrics', 1, 1], ['tune', 1, 1], ['song', 1, 1],
    ['chord', 2, 1], ['scale', 2, 2, { g: 'music' }], ['key', 2, 3, { g: 'music' }], ['note', 1, 2, { g: 'music' }], ['pitch', 2, 2, { g: 'music' }],
    ['bar', 2, 3, { g: 'music', al: [['measure', 'synonym', 3, 3, ['US'], { g: 'music' }]] }],
    ['refrain', 3, 3], ['bridge', 2, 3, { g: 'song' }], ['riff', 2, 2], ['hook', 2, 3, { g: 'music' }], ['solo', 2, 2], ['duet', 2, 2], ['trio', 2, 3], ['quartet', 2, 3],
    ['ensemble', 3, 3], ['overture', 3, 3], ['interlude', 3, 3], ['octave', 3, 2], ['treble', 3, 3], ['clef', 3, 2], ['stave', 3, 2, { reg: ['UK'], al: [['staff', 'synonym', 3, 3, ['US'], { g: 'music' }]] }],
    ['staccato', 3, 2], ['legato', 3, 2], ['crescendo', 3, 2], ['arpeggio', 3, 3], ['syncopation', 4, 3], ['counterpoint', 4, 3], ['timbre', 3, 3], ['cadence', 3, 3], ['coda', 4, 3],
    ['motif', 3, 3, { al: [['leitmotif', 'synonym', 4, 4], ['theme', 'synonym', 2, 3, [], { g: 'music' }]] }], ['fugue', 4, 3], ['ostinato', 5, 4], ['cadenza', 4, 4], ['glissando', 4, 4], ['vibrato', 4, 3], ['tremolo', 4, 4],
    ['fermata', 5, 4, { al: [['pause', 'synonym', 2, 3, [], { g: 'music' }]] }], ['hemiola', 5, 5], ['melisma', 5, 5], ['tessitura', 5, 5], ['a cappella', 3, 3, ph()],
    ['key signature', 3, 3, ph()], ['time signature', 3, 3, ph()], ['accidental', 4, 4, { g: 'music' }], ['transposition', 4, 4], ['sharp', 2, 3, { g: 'music' }], ['downbeat', 4, 4],
    ['dissonance', 4, 3], ['consonance', 5, 4], ['sforzando', 5, 5], ['appoggiatura', 5, 5], ['arrangement', 3, 3, { g: 'music' }],
    ['composition', 2, 3, { g: 'music' }], ['improvisation', 3, 3, { al: [['improv', 'synonym', 3, 3], ['ad lib', 'synonym', 4, 4, [], { g: 'music' }]] }], ['rest', 2, 3, { g: 'music' }], ['tie', 2, 4, { g: 'music' }],
    ['rhapsody', 4, 3], ['cantata', 4, 3],
  ],

  // ---------------------------------------------------------------- musicians
  musicians: [
    ['musician', 1, 1], ['singer', 1, 1, { al: [['vocalist', 'synonym', 2, 2]] }], ['drummer', 1, 1],
    ['guitarist', 1, 1, { al: [['axeman', 'synonym', 4, 4, [], { g: 'guitarist' }]] }], ['pianist', 1, 1, { al: [['piano player', 'synonym', 1, 1]] }], ['violinist', 1, 1, { al: [['fiddler', 'synonym', 2, 2]] }],
    ['conductor', 2, 2, { g: 'orchestra', al: [['maestro', 'synonym', 3, 3, [], { g: 'conductor' }]] }], ['composer', 2, 1], ['bassist', 2, 2, { al: [['bass player', 'synonym', 2, 2]] }],
    ['DJ', 1, 2, { type: 'acronym', al: [['disc jockey', 'synonym', 2, 2, [], { type: 'phrase' }], ['deejay', 'spelling', 3, 3, [], { type: 'common' }]] }], ['cellist', 2, 2], ['flautist', 3, 2, { reg: ['UK'], al: [['flutist', 'synonym', 3, 3, ['US']]] }],
    ['saxophonist', 2, 2, { al: [['sax player', 'synonym', 2, 2]] }], ['trumpeter', 2, 2], ['organist', 2, 2], ['harpist', 2, 2], ['soloist', 2, 2], ['accompanist', 3, 3],
    ['bandleader', 3, 2], ['virtuoso', 3, 3], ['busker', 3, 2, { reg: ['UK', 'IE', 'AU', 'NZ'], al: [['street musician', 'synonym', 2, 2]] }], ['session musician', 4, 3, ph()],
    ['songwriter', 2, 2, { al: [['tunesmith', 'synonym', 5, 5]] }], ['lyricist', 3, 3], ['crooner', 3, 3], ['diva', 3, 3], ['child prodigy', 3, 3, ph()],
    ['piper', 3, 3, { g: 'bagpipe player' }], ['minstrel', 3, 3], ['troubadour', 3, 3], ['bard', 3, 4], ['cantor', 4, 4, rel()],
    ['percussionist', 3, 2], ['trombonist', 3, 2], ['clarinetist', 3, 2, { al: [['clarinettist', 'spelling', 3, 3, ['UK']]] }], ['oboist', 4, 3], ['bassoonist', 4, 3],
    ['cornetist', 4, 4], ['lutenist', 4, 4], ['concertmaster', 4, 4, { al: [['leader', 'synonym', 4, 4, ['UK'], { g: 'orchestra' }]] }], ['violist', 4, 3], ['banjoist', 4, 3], ['harmonica player', 3, 2, ph()],
    ['choirmaster', 4, 3], ['chorister', 4, 3, { al: [['choirboy', 'synonym', 2, 2]] }], ['backing singer', 3, 3, ph({ reg: ['UK'], al: [['backup singer', 'synonym', 3, 3, ['US']]] })],
    ['frontman', 3, 3, { al: [['lead singer', 'synonym', 2, 2], ['frontwoman', 'synonym', 3, 3]] }], ['tenor', 2, 3, { g: 'singer' }], ['soprano', 2, 3, { g: 'singer' }],
    ['repetiteur', 5, 5], ['kapellmeister', 5, 5], ['prima donna', 3, 4, ph()], ['one-man band', 3, 3, ph()], ['arranger', 4, 3], ['sideman', 5, 4], ['roadie', 3, 3, { g: 'music' }],
  ],

  // ---------------------------------------------------------------- dance
  dance: [
    ['dancer', 1, 1], ['ballet', 1, 1], ['ballerina', 1, 1], ['tutu', 1, 2], ['waltz', 1, 1], ['tango', 1, 1],
    ['tap dance', 1, 1, ph({ al: [['hoofing', 'synonym', 5, 5, ['US']]] })], ['disco', 1, 2], ['breakdancing', 2, 2, { al: [['breaking', 'synonym', 3, 3, [], { g: 'dance' }], ['b-boying', 'synonym', 5, 5]] }],
    ['square dance', 2, 2, ph({ reg: ['US'] })], ['line dancing', 2, 2, ph()], ['choreographer', 2, 2], ['choreography', 2, 2], ['routine', 2, 3, { g: 'dance' }], ['step', 1, 3, { g: 'dance' }],
    ['twirl', 2, 3, verb()], ['pirouette', 3, 2], ['leotard', 2, 2], ['tights', 1, 3], ['ballet shoes', 2, 2, ph()], ['pointe shoes', 3, 3, ph()], ['barre', 4, 3], ['dance floor', 1, 1, ph()],
    ['partner', 1, 3, { g: 'dance' }], ['troupe', 3, 3, { g: 'dance' }], ['recital', 3, 3], ['rehearsal', 2, 3], ['audition', 2, 3], ['dance card', 3, 3, ph()],
    ['flamenco', 2, 2], ['polka', 2, 2], ['conga', 2, 2, { g: 'dance' }], ['limbo', 2, 3, { g: 'dance' }], ['hokey cokey', 3, 3, ph({ reg: ['UK', 'IE'], al: [['hokey pokey', 'synonym', 2, 2, ['US', 'CA']]] })],
    ['Macarena', 2, 2, { type: 'title', tm: true }], ['twist', 1, 3, { g: 'dance' }], ['hula', 2, 2], ['belly dance', 2, 2, ph({ al: [['raqs sharqi', 'synonym', 5, 5]] })],
    ['morris dance', 3, 3, ph({ reg: ['UK'] })], ['maypole', 3, 4], ['barn dance', 3, 3, ph({ reg: ['UK', 'US'], al: [['hoedown', 'synonym', 3, 3, ['US']]] })], ['ceilidh', 3, 3, { reg: ['UK', 'IE'], al: [['céilí', 'spelling', 4, 4, ['IE']]] }],
    ['rave', 2, 3, { g: 'party' }], ['moonwalk', 2, 2, { g: 'dance' }], ['can-can', 2, 2], ['cha-cha', 2, 2, { al: [['cha-cha-cha', 'spelling', 3, 3]] }], ['samba', 2, 2], ['foxtrot', 2, 2],
    ['quickstep', 3, 3], ['jive', 2, 2, { g: 'dance' }], ['rumba', 3, 3, { al: [['rhumba', 'spelling', 4, 4]] }], ['mazurka', 4, 4], ['gavotte', 4, 4], ['minuet', 3, 3], ['fandango', 3, 3],
    ['pas de deux', 3, 3, ph()], ['plié', 4, 3, { al: [['plie', 'spelling', 4, 3]] }], ['jeté', 4, 4, { al: [['jete', 'spelling', 4, 4]] }], ['arabesque', 3, 3], ['entrechat', 5, 5], ['fouetté', 5, 5], ['tarantella', 4, 4],
    ['pole dancing', 2, 3, ph({ adult: true })], ['lap dance', 2, 3, ph({ adult: true, vulgar: true })], ['mosh pit', 3, 4, ph({ adult: true })], ['twerk', 3, 3, verb({ adult: true, vulgar: true })],
    ['jitterbug', 3, 3], ['lindy hop', 4, 4, ph()], ['charleston', 3, 3, { g: 'dance' }], ['bunny hop', 3, 4, ph()],
  ],

  // ---------------------------------------------------------------- art
  art: [
    ['painting', 1, 1], ['drawing', 1, 1], ['sculpture', 1, 1], ['canvas', 1, 1], ['easel', 2, 2], ['brush', 1, 2, { g: 'painting' }], ['palette', 2, 2], ['portrait', 1, 1], ['landscape', 1, 2],
    ['still life', 2, 2, ph()], ['sketch', 1, 1], ['charcoal', 2, 2, { g: 'drawing' }], ['watercolor', 2, 2, { al: [['watercolour', 'spelling', 2, 2, ['UK', 'IE', 'AU', 'NZ', 'CA', 'IN', 'ZA']]] }],
    ['oil painting', 1, 1, ph()], ['acrylic', 2, 2, { g: 'paint' }], ['pastel', 2, 2, { g: 'art' }], ['gallery', 1, 1, { g: 'art' }], ['museum', 1, 2], ['exhibition', 2, 2, { al: [['exhibit', 'synonym', 2, 2], ['show', 'synonym', 1, 3, [], { g: 'art' }]] }],
    ['masterpiece', 2, 2, { al: [['magnum opus', 'synonym', 4, 4], ['chef-d\'oeuvre', 'synonym', 5, 5]] }], ['mural', 2, 2], ['fresco', 3, 3], ['collage', 2, 2], ['mosaic', 2, 2], ['etching', 3, 3], ['engraving', 3, 3],
    ['lithograph', 4, 3], ['woodcut', 4, 3], ['print', 1, 3, { g: 'art' }], ['abstract', 2, 2, adj({ g: 'art' })], ['Renaissance', 3, 3, { type: 'proper' }], ['Impressionism', 3, 2, { type: 'proper' }],
    ['Cubism', 3, 2, { type: 'proper' }], ['Surrealism', 3, 2, { type: 'proper' }], ['pop art', 2, 2, ph()], ['artist', 1, 1], ['painter', 1, 1], ['sculptor', 2, 1], ['curator', 3, 3],
    ['studio', 2, 2, { g: 'artist' }], ['frame', 1, 3, { g: 'picture' }], ['gouache', 4, 4], ['tempera', 4, 4], ['chiaroscuro', 4, 4], ['perspective', 3, 3, { g: 'art' }],
    ['installation', 3, 3, { g: 'art' }], ['graffiti', 2, 2, { al: [['street art', 'synonym', 2, 2], ['tagging', 'synonym', 3, 3, [], { g: 'graffiti' }]] }], ['stencil', 2, 3], ['calligraphy', 3, 3],
    ['ceramics', 2, 3], ['terracotta', 3, 3], ['statue', 1, 2], ['bust', 2, 3, { g: 'sculpture' }], ['relief', 3, 4, { g: 'art' }], ['caricature', 2, 2], ['illustration', 2, 2],
    ['miniature', 3, 3, { g: 'painting' }], ['self-portrait', 2, 2], ['muse', 3, 3], ['avant-garde', 4, 3, adj()], ['minimalism', 3, 3], ['triptych', 4, 4], ['diptych', 5, 4],
    ['sfumato', 5, 5], ['impasto', 5, 5], ['pointillism', 4, 3], ['trompe l\'oeil', 4, 4, ph({ al: [['trompe-l\'oeil', 'spelling', 4, 4]] })], ['readymade', 5, 5], ['vanitas', 5, 5],
    ['ukiyo-e', 5, 5], ['Dadaism', 4, 4, { type: 'proper', al: [['Dada', 'synonym', 4, 4]] }], ['Fauvism', 5, 4, { type: 'proper' }], ['Art Nouveau', 4, 3, { type: 'proper', al: [['Jugendstil', 'synonym', 5, 5]] }],
  ],

  // ---------------------------------------------------------------- film and tv
  film_and_tv: [
    ['movie', 1, 1, { al: [['film', 'synonym', 1, 1, ['UK', 'IE', 'AU', 'NZ']], ['flick', 'synonym', 3, 3], ['picture', 'synonym', 3, 3, [], { g: 'film' }], ['pic', 'synonym', 4, 4, [], { g: 'film' }]] }],
    ['cinema', 1, 1, { al: [['pictures', 'synonym', 4, 4, ['UK'], { g: 'cinema' }], ['flicks', 'synonym', 4, 4, ['UK'], { g: 'cinema' }]] }], ['actor', 1, 1], ['actress', 1, 1], ['director', 1, 1, { g: 'film' }], ['producer', 2, 2, { g: 'film' }],
    ['screenplay', 2, 2, { al: [['script', 'synonym', 1, 1, [], { g: 'film' }]] }], ['scene', 1, 2], ['take', 2, 3, { g: 'film' }], ['cut', 2, 3, { g: 'film' }], ['trailer', 2, 2, { g: 'film' }], ['sequel', 1, 2],
    ['premiere', 2, 2], ['blockbuster', 2, 2], ['sitcom', 2, 2, { al: [['situation comedy', 'synonym', 3, 3]] }], ['soap opera', 2, 2, ph({ al: [['soap', 'synonym', 2, 2, [], { g: 'tv show' }]] })], ['documentary', 1, 1, { al: [['docuseries', 'synonym', 4, 4]] }],
    ['reality show', 2, 2, ph()], ['series', 1, 2, { g: 'tv' }], ['episode', 1, 1], ['season', 1, 2, { g: 'tv' }], ['channel', 1, 2, { g: 'tv' }],
    ['television', 1, 1, { al: [['telly', 'synonym', 2, 2, ['UK', 'IE', 'AU', 'NZ']], ['tube', 'synonym', 3, 3, ['US'], { g: 'television' }], ['box', 'synonym', 3, 3, ['UK'], { g: 'television' }], ['TV', 'synonym', 1, 1, [], { type: 'acronym' }]] }],
    ['remote control', 1, 3, ph({ al: [['remote', 'synonym', 1, 3, [], { g: 'tv' }], ['clicker', 'synonym', 4, 4, ['US']], ['zapper', 'synonym', 4, 4, ['UK']]] })],
    ['screen', 1, 2, { g: 'film' }], ['subtitles', 2, 2, { al: [['captions', 'synonym', 3, 3, ['US']]] }], ['credits', 2, 2, { g: 'film' }], ['cameo', 3, 3], ['extra', 2, 3, { g: 'film' }],
    ['stuntman', 2, 2, { al: [['stunt double', 'synonym', 3, 3, [], { type: 'phrase' }]] }], ['clapperboard', 3, 2, { al: [['clapboard', 'synonym', 4, 4, ['US']], ['slate', 'synonym', 4, 4, [], { g: 'film' }]] }],
    ['boom mic', 4, 4, ph()], ['dolly', 3, 4, { g: 'camera' }], ['green screen', 2, 3, ph()], ['special effects', 2, 2, ph()], ['voiceover', 3, 3], ['flashback', 2, 2], ['cliffhanger', 3, 2],
    ['spin-off', 3, 3], ['pilot', 3, 3, { g: 'tv episode' }], ['reboot', 3, 3, { g: 'film' }], ['remake', 2, 2], ['casting', 3, 3, { g: 'film' }], ['box office', 2, 2, ph()], ['matinee', 3, 3],
    ['popcorn', 1, 2], ['multiplex', 3, 3], ['streaming', 2, 3, { g: 'tv' }], ['binge-watch', 3, 3, verb()], ['rerun', 3, 2, { al: [['repeat', 'synonym', 2, 3, ['UK'], { g: 'tv' }]] }],
    ['broadcast', 2, 2, { g: 'tv' }], ['prime time', 3, 3, ph()], ['news anchor', 2, 2, ph({ al: [['newsreader', 'synonym', 3, 3, ['UK']]] })], ['host', 2, 3, { g: 'tv' }], ['laugh track', 3, 3, ph({ al: [['canned laughter', 'synonym', 4, 4]] })],
    ['teleprompter', 3, 3], ['cinematography', 3, 3], ['MacGuffin', 4, 4, { al: [['McGuffin', 'spelling', 4, 4]] }], ['Foley', 4, 4, { g: 'film sound', type: 'proper' }],
    ['rushes', 4, 4, { reg: ['UK'], al: [['dailies', 'synonym', 4, 4, ['US']]] }], ['gaffer', 4, 4, { g: 'film crew' }], ['best boy', 4, 4, ph()], ['key grip', 5, 5, ph()],
    ['Steadicam', 4, 4, { type: 'org', tm: true }], ['jump cut', 4, 4, ph()], ['montage', 3, 3], ['auteur', 4, 4], ['film noir', 3, 3, ph({ al: [['noir', 'synonym', 3, 3]] })],
    ['slasher', 3, 3, { g: 'film', adult: true }], ['talkie', 4, 4], ['mise-en-scène', 5, 5, { al: [['mise-en-scene', 'spelling', 5, 5]] }], ['biopic', 3, 3], ['voice actor', 2, 3, ph()], ['continuity', 4, 4, { g: 'film' }],
  ],

  // ---------------------------------------------------------------- literature
  literature: [
    ['book', 1, 1], ['novel', 1, 1, { g: 'book' }], ['poem', 1, 1], ['poetry', 1, 1], ['story', 1, 1], ['author', 1, 1], ['writer', 1, 1], ['poet', 1, 1], ['novelist', 2, 1],
    ['playwright', 2, 2], ['chapter', 1, 2], ['plot', 1, 2, { g: 'story' }], ['character', 1, 2, { g: 'story' }], ['narrator', 2, 2], ['protagonist', 3, 2], ['antagonist', 3, 3],
    ['hero', 1, 2, { g: 'story' }], ['villain', 1, 2], ['theme', 2, 3, { g: 'story' }], ['setting', 2, 3, { g: 'story' }], ['genre', 3, 3], ['fiction', 1, 1], ['nonfiction', 2, 2, { al: [['non-fiction', 'spelling', 2, 2]] }],
    ['biography', 2, 1, { al: [['bio', 'synonym', 2, 3]] }], ['autobiography', 2, 2], ['memoir', 3, 2], ['essay', 1, 2], ['epic', 2, 2, { g: 'poem' }], ['saga', 3, 3], ['fable', 2, 2], ['myth', 2, 2],
    ['legend', 2, 3, { g: 'story' }], ['anthology', 3, 3], ['sonnet', 3, 2], ['haiku', 2, 2], ['stanza', 3, 2], ['rhyme', 1, 2], ['metaphor', 2, 2], ['simile', 2, 2],
    ['irony', 3, 3], ['allegory', 4, 3], ['satire', 3, 3], ['prologue', 3, 3], ['epilogue', 3, 3], ['foreword', 3, 3], ['manuscript', 3, 3], ['bestseller', 2, 3, { al: [['best-seller', 'spelling', 2, 3]] }],
    ['classic', 1, 3, { g: 'literature' }], ['trilogy', 2, 3], ['novella', 3, 3], ['short story', 1, 1, ph()], ['flash fiction', 4, 4, ph()], ['folklore', 3, 3], ['parable', 3, 3],
    ['limerick', 3, 2], ['ode', 3, 3], ['elegy', 4, 3, rel()], ['ballad', 3, 3], ['epigraph', 4, 4], ['denouement', 4, 4], ['bildungsroman', 5, 4], ['picaresque', 5, 5, adj()],
    ['roman à clef', 5, 5, ph({ al: [['roman a clef', 'spelling', 5, 5]] })], ['epistolary', 5, 4, adj()], ['dystopia', 3, 3, { al: [['dystopian fiction', 'synonym', 3, 3]] }], ['pastoral', 4, 4, { g: 'literature' }],
    ['tragedy', 2, 2, { g: 'literature', sens: true }], ['comedy', 1, 2, { g: 'literature' }], ['romance', 2, 3, { g: 'literature' }], ['narrative', 3, 3], ['literary', 3, 3, adj()],
    ['pen name', 2, 3, ph({ al: [['pseudonym', 'synonym', 4, 4], ['nom de plume', 'synonym', 4, 4]] })],
    ['ghostwriter', 3, 3], ['byline', 4, 4], ['literati', 5, 5], ['bibliophile', 4, 4, { al: [['bookworm', 'synonym', 2, 2]] }], ['canon', 4, 4, { g: 'literature' }], ['oeuvre', 5, 5],
    ['iambic pentameter', 4, 4, ph()], ['free verse', 3, 3, ph()], ['alliteration', 3, 3], ['onomatopoeia', 3, 3], ['hyperbole', 3, 3], ['personification', 3, 3], ['foreshadowing', 3, 3],
  ],

  // ---------------------------------------------------------------- architecture
  architecture: [
    ['building', 1, 2], ['architect', 1, 1], ['blueprint', 2, 2, { al: [['floor plan', 'synonym', 2, 2]] }], ['foundation', 2, 3, { g: 'building' }],
    ['facade', 3, 3, { al: [['façade', 'spelling', 3, 3]] }], ['column', 2, 2, { g: 'building' }], ['arch', 2, 2, { g: 'building' }], ['dome', 2, 2], ['vault', 3, 3, { g: 'ceiling' }], ['tower', 1, 2],
    ['spire', 3, 3, rel()], ['steeple', 3, 3, rel()], ['skyscraper', 1, 1, { al: [['high-rise', 'synonym', 2, 2]] }], ['cathedral', 2, 2, rel()], ['castle', 1, 2], ['palace', 1, 2],
    ['pagoda', 3, 2], ['minaret', 3, 3, rel()], ['pavilion', 3, 3], ['atrium', 3, 3], ['balcony', 1, 2], ['staircase', 1, 2, { al: [['stairway', 'synonym', 2, 2]] }],
    ['corridor', 2, 3, { al: [['hallway', 'synonym', 1, 3]] }], ['courtyard', 2, 2, { al: [['quad', 'synonym', 3, 3, [], { g: 'courtyard' }]] }], ['cloister', 4, 3, rel()], ['colonnade', 4, 3],
    ['portico', 4, 3], ['pediment', 4, 3], ['cornice', 4, 3], ['buttress', 4, 3], ['flying buttress', 4, 3, ph({ sens: true })], ['gargoyle', 3, 3], ['gable', 3, 3], ['turret', 3, 3],
    ['battlement', 3, 3], ['parapet', 4, 3], ['rotunda', 4, 3], ['lintel', 4, 4], ['keystone', 4, 3], ['pilaster', 5, 4], ['loggia', 5, 4], ['belvedere', 5, 4], ['mansard', 4, 4],
    ['cupola', 4, 4], ['oriel', 5, 5], ['clerestory', 5, 4, { al: [['clearstory', 'spelling', 5, 5]] }], ['entablature', 5, 5], ['plinth', 4, 4], ['finial', 5, 5], ['quoin', 5, 5],
    ['corbel', 5, 5], ['Gothic', 3, 2, { type: 'proper', g: 'architecture' }], ['Baroque', 4, 3, { type: 'proper', g: 'architecture' }], ['Art Deco', 3, 3, { type: 'proper' }], ['Brutalism', 4, 3, { type: 'proper' }],
    ['modernism', 3, 3], ['Bauhaus', 4, 4, { type: 'proper' }], ['Georgian', 4, 3, { type: 'proper', g: 'architecture', reg: ['UK', 'IE', 'US'] }], ['skylight', 2, 3], ['mausoleum', 3, 3, { sens: true }],
    ['amphitheater', 3, 3, { al: [['amphitheatre', 'spelling', 3, 3, ['UK', 'IE', 'AU', 'NZ', 'ZA', 'IN']]] }], ['pillar', 2, 3], ['archway', 2, 2], ['vestibule', 4, 4, { al: [['foyer', 'synonym', 3, 3], ['lobby', 'synonym', 2, 3, [], { g: 'building' }]] }],
    ['gazebo', 2, 3], ['conservatory', 3, 3], ['stained glass', 2, 3, ph({ sens: true })], ['scaffolding', 2, 3], ['masonry', 3, 3], ['lattice', 3, 4], ['arcade', 3, 3, { g: 'architecture' }],
    ['mezzanine', 4, 4], ['dormer', 4, 4], ['porch', 1, 3, { al: [['veranda', 'synonym', 3, 3, ['UK', 'AU', 'NZ', 'IN']], ['stoop', 'synonym', 4, 4, ['US'], { g: 'porch' }]] }], ['eaves', 4, 4],
  ],
};

// Aliases for roots that other batches may already have added.
export const ALIASES = [];

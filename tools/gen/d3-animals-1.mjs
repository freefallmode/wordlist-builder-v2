// Depth-3 animal themes, chunk 1. Format: tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const A = (o = {}) => ({ g: 'animal', ...o });
const B = (o = {}) => ({ g: 'bird', ...o });
const F = (o = {}) => ({ g: 'fish', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const verb = (o = {}) => ({ pos: 'verb', ...o });

export const THEMES = {
  big_cats: { d: 1 }, small_wild_cats: { d: 3 }, primates: { d: 2 }, rodents: { d: 2 }, whales_and_dolphins: { d: 2 }, marsupials: { d: 3 },
  hoofed_mammals: { d: 3 }, bears: { d: 1, complete: true }, wild_dogs_and_foxes: { d: 2 }, weasel_family: { d: 4 }, bats: { d: 3 }, rabbits_and_hares: { d: 2 },
  birds_of_prey: { d: 2 }, seabirds: { d: 3 }, songbirds: { d: 3 }, waterbirds: { d: 2 }, flightless_birds: { d: 2 }, parrots: { d: 2 }, game_birds: { d: 4 },
  colorful_birds: { d: 2 }, bird_body_parts: { d: 3 }, birdwatching_words: { d: 5 }, pigeons_and_doves: { d: 3 },
  snakes: { d: 1 }, lizards: { d: 2 }, turtles_and_tortoises: { d: 2 }, crocodilians: { d: 3 }, frogs_and_toads: { d: 2 }, salamanders_and_newts: { d: 4 },
  freshwater_fish: { d: 3 },
};

export const DATA = {
  big_cats: [
    ['lion', 1, 1], ['tiger', 1, 1], ['leopard', 1, 1], ['jaguar', 1, 1, A()], ['cheetah', 1, 1], ['cougar', 2, 2, { al: [['mountain lion', 'synonym', 2, 2]] }],
    ['snow leopard', 2, 1], ['clouded leopard', 3, 2], ['black panther', 2, 2], ['panther', 2, 2, A()], ['Bengal tiger', 2, 1, P()], ['Siberian tiger', 2, 1, P({ al: [['Amur tiger', 'synonym', 4, 3, [], { type: 'proper' }]] })],
    ['white tiger', 2, 1], ['African lion', 2, 1, P()], ['Asiatic lion', 4, 3, P()], ['lioness', 1, 1], ['liger', 3, 3], ['tigon', 5, 4], ['Sumatran tiger', 3, 2, P()],
    ['Barbary lion', 5, 4, P()], ['white lion', 3, 2], ['cub', 1, 3, A()], ['pride', 2, 3, { g: 'lions' }], ['Persian leopard', 5, 4, P()], ['Sunda clouded leopard', 5, 5, P()],
    ['king of the jungle', 2, 3, { type: 'phrase' }], ['maneater', 3, 4], ['Indochinese tiger', 5, 5, P()], ['Malayan tiger', 4, 4, P()], ['Amur leopard', 4, 3, P()],
  ],

  small_wild_cats: [
    ['lynx', 2, 1], ['bobcat', 2, 1], ['wildcat', 2, 1], ['ocelot', 3, 1], ['serval', 3, 1], ['caracal', 4, 1], ['margay', 4, 2], ['sand cat', 4, 2],
    ['jaguarundi', 4, 2], ['fishing cat', 4, 2], ['Pallas\'s cat', 4, 2, P({ al: [['manul', 'synonym', 5, 4, [], { type: 'common' }]] })], ['leopard cat', 4, 3], ['Eurasian lynx', 4, 2, P()],
    ['Canada lynx', 3, 2, P()], ['Iberian lynx', 4, 2, P()], ['rusty-spotted cat', 5, 3], ['black-footed cat', 5, 3], ['oncilla', 5, 3], ['pampas cat', 5, 3],
    ['Geoffroy\'s cat', 5, 3, P()], ['jungle cat', 4, 2], ['marbled cat', 5, 3], ['flat-headed cat', 5, 3], ['bay cat', 5, 3], ['Asian golden cat', 5, 3, P()],
    ['African golden cat', 5, 3, P()], ['kodkod', 5, 3], ['European wildcat', 4, 2, P()], ['Scottish wildcat', 4, 2, P({ reg: ['UK'] })], ['African wildcat', 4, 2, P()],
    ['Andean mountain cat', 5, 3], ['Bornean bay cat', 5, 4, P()], ['little spotted cat', 5, 4], ['tigrina', 5, 4, { reg: ['BR'] }],
  ],

  primates: [
    ['monkey', 1, 1], ['ape', 1, 1, A()], ['gorilla', 1, 1], ['chimpanzee', 1, 1, { al: [['chimp', 'synonym', 1, 1]] }], ['orangutan', 2, 1], ['baboon', 2, 1],
    ['gibbon', 3, 1], ['lemur', 2, 1], ['bonobo', 3, 2], ['macaque', 3, 2], ['mandrill', 3, 2], ['marmoset', 3, 2], ['tamarin', 4, 2], ['capuchin', 3, 2],
    ['howler monkey', 3, 1], ['spider monkey', 2, 1], ['squirrel monkey', 3, 2], ['rhesus monkey', 3, 2], ['proboscis monkey', 4, 2], ['colobus', 4, 2],
    ['langur', 4, 2], ['tarsier', 4, 2], ['loris', 4, 2], ['slow loris', 4, 2], ['bushbaby', 3, 2, { al: [['galago', 'synonym', 5, 3]] }], ['aye-aye', 4, 2],
    ['siamang', 5, 3], ['mountain gorilla', 3, 1], ['silverback', 3, 2], ['vervet', 5, 3], ['guenon', 5, 4], ['potto', 5, 3], ['sifaka', 5, 3],
    ['ring-tailed lemur', 3, 2], ['golden lion tamarin', 5, 3], ['Barbary macaque', 4, 2, P({ al: [['Barbary ape', 'synonym', 4, 3, [], { type: 'proper' }]] })],
    ['titi', 5, 4, { g: 'monkey' }], ['saki', 5, 4, { g: 'monkey' }], ['mangabey', 5, 4],
  ],

  rodents: [
    ['mouse', 1, 1, A()], ['rat', 1, 1, A()], ['squirrel', 1, 1], ['hamster', 1, 1], ['guinea pig', 1, 1, { al: [['cavy', 'synonym', 5, 4]] }], ['beaver', 2, 1],
    ['gerbil', 2, 1], ['chipmunk', 2, 1], ['porcupine', 2, 1], ['capybara', 3, 1], ['chinchilla', 3, 1], ['lemming', 3, 1], ['vole', 3, 2], ['dormouse', 3, 2],
    ['groundhog', 3, 2, { al: [['woodchuck', 'synonym', 4, 3, ['US', 'CA']]] }], ['prairie dog', 2, 1], ['marmot', 3, 2], ['muskrat', 3, 2], ['coypu', 4, 2, { al: [['nutria', 'synonym', 4, 3, ['US']]] }],
    ['agouti', 5, 3], ['paca', 5, 3], ['jerboa', 4, 2], ['gopher', 3, 2], ['harvest mouse', 4, 2], ['field mouse', 2, 2], ['house mouse', 2, 2], ['brown rat', 3, 2],
    ['black rat', 3, 2], ['flying squirrel', 3, 2], ['red squirrel', 2, 2], ['grey squirrel', 2, 2, { al: [['gray squirrel', 'spelling', 2, 2, ['US']]] }],
    ['kangaroo rat', 4, 2], ['mole rat', 4, 2], ['naked mole-rat', 4, 2], ['springhare', 5, 4], ['degu', 5, 3], ['hutia', 5, 4], ['pocket gopher', 4, 3], ['wood mouse', 4, 3],
  ],

  whales_and_dolphins: [
    ['whale', 1, 1], ['dolphin', 1, 1], ['orca', 2, 1, { al: [['killer whale', 'synonym', 1, 1]] }], ['blue whale', 1, 1], ['humpback whale', 2, 1], ['sperm whale', 2, 1],
    ['porpoise', 3, 1], ['narwhal', 3, 1], ['beluga', 3, 1, { g: 'whale' }], ['bottlenose dolphin', 2, 1], ['minke whale', 4, 2], ['fin whale', 3, 2], ['gray whale', 3, 2, { al: [['grey whale', 'spelling', 3, 2, ['UK']]] }],
    ['right whale', 4, 2], ['bowhead whale', 4, 2], ['pilot whale', 3, 2], ['sei whale', 5, 3], ['Bryde\'s whale', 5, 3, P()], ['beaked whale', 4, 3], ['pygmy sperm whale', 5, 4],
    ['common dolphin', 3, 2], ['spinner dolphin', 4, 2], ['dusky dolphin', 5, 3], ['river dolphin', 3, 2], ['Amazon river dolphin', 4, 2, P({ al: [['boto', 'synonym', 5, 4, ['BR'], { g: 'dolphin', type: 'common' }]] })],
    ['Risso\'s dolphin', 5, 3, P()], ['harbour porpoise', 4, 2, { al: [['harbor porpoise', 'spelling', 4, 2, ['US']]] }], ['vaquita', 4, 2], ['baiji', 5, 3], ['Irrawaddy dolphin', 5, 3, P()],
    ['false killer whale', 5, 3], ['Hector\'s dolphin', 5, 3, P()], ['white-beaked dolphin', 5, 3], ['cetacean', 4, 2], ['baleen whale', 3, 2],
  ],

  marsupials: [
    ['kangaroo', 1, 1, { al: [['roo', 'synonym', 3, 2, ['AU', 'NZ']]] }], ['koala', 1, 1], ['wombat', 2, 1], ['Tasmanian devil', 2, 1, P()], ['opossum', 3, 2, { al: [['possum', 'synonym', 3, 2, ['US']]] }],
    ['wallaby', 2, 1], ['bandicoot', 3, 2], ['quokka', 4, 2], ['numbat', 4, 2], ['sugar glider', 3, 2], ['bilby', 4, 2], ['thylacine', 4, 2, { al: [['Tasmanian tiger', 'synonym', 3, 2, [], { type: 'proper' }]] }],
    ['red kangaroo', 2, 1], ['grey kangaroo', 3, 2], ['tree kangaroo', 3, 2], ['wallaroo', 4, 3], ['pademelon', 5, 3], ['potoroo', 5, 3], ['bettong', 5, 3], ['quoll', 4, 2],
    ['dunnart', 5, 3], ['antechinus', 5, 4], ['marsupial mole', 5, 3], ['cuscus', 5, 3], ['ringtail possum', 4, 3], ['brushtail possum', 3, 2, { reg: ['AU', 'NZ'] }],
    ['honey possum', 5, 3], ['Virginia opossum', 4, 2, P()], ['planigale', 5, 4], ['musky rat-kangaroo', 5, 4], ['southern hairy-nosed wombat', 5, 4].slice(0, 4),
    ['joey', 2, 2], ['pouch', 2, 3, { g: 'marsupial' }], ['marsupial', 2, 1], ['yapok', 5, 4], ['monito del monte', 5, 4],
  ].filter(r => r[0].length <= 20),

  hoofed_mammals: [
    ['horse', 1, 1], ['cow', 1, 1], ['pig', 1, 1], ['sheep', 1, 1], ['goat', 1, 1], ['deer', 1, 1], ['zebra', 1, 1], ['giraffe', 1, 1], ['rhinoceros', 2, 1, { al: [['rhino', 'synonym', 1, 1]] }],
    ['hippopotamus', 2, 2, { al: [['hippo', 'synonym', 1, 1]] }], ['camel', 1, 2], ['antelope', 2, 1], ['bison', 2, 1], ['moose', 2, 1], ['elk', 2, 1], ['reindeer', 2, 1, { al: [['caribou', 'synonym', 3, 2, ['US', 'CA']]] }],
    ['wildebeest', 3, 2, { al: [['gnu', 'synonym', 4, 3]] }], ['okapi', 3, 2], ['tapir', 3, 2], ['llama', 2, 2], ['alpaca', 2, 2], ['donkey', 1, 2], ['yak', 3, 2], ['gazelle', 2, 1],
    ['impala', 3, 1], ['kudu', 4, 2], ['eland', 4, 2], ['springbok', 3, 2], ['oryx', 4, 2], ['ibex', 3, 2], ['mouflon', 5, 3], ['chamois', 4, 2], ['warthog', 2, 2], ['boar', 2, 2, A()],
    ['water buffalo', 2, 2], ['musk ox', 3, 2], ['pronghorn', 4, 2], ['bighorn sheep', 3, 2], ['mountain goat', 2, 2], ['takin', 5, 3], ['saiga', 5, 3], ['nilgai', 5, 3], ['guanaco', 4, 3],
    ['vicuna', 4, 3], ['wild ass', 4, 3], ['onager', 5, 4], ['quagga', 5, 4], ['peccary', 4, 3], ['gaur', 5, 3], ['bongo', 4, 3, A()], ['dik-dik', 4, 3], ['hartebeest', 5, 3],
  ].slice(0, 48),

  bears: [
    ['polar bear', 1, 1], ['brown bear', 1, 1, { al: [['grizzly', 2, 1], ['grizzly bear', 1, 1], ['Kodiak bear', 3, 2], ['Kodiak', 3, 2]].map(([t, r, i]) => [t, 'synonym', r, i, [], t.startsWith('K') ? { type: 'proper' } : {}]) }],
    ['American black bear', 3, 2, P({ al: [['black bear', 'synonym', 1, 1, [], { type: 'common' }], ['cinnamon bear', 'synonym', 4, 3, [], { type: 'common' }]] })],
    ['Asiatic black bear', 4, 3, P({ al: [['moon bear', 'synonym', 3, 2, [], { type: 'common' }], ['Himalayan black bear', 'synonym', 5, 3, [], { type: 'proper' }]] })],
    ['sun bear', 3, 2, { al: [['honey bear', 'synonym', 4, 3]] }], ['sloth bear', 3, 2], ['spectacled bear', 3, 2, { al: [['Andean bear', 'synonym', 4, 3, [], { type: 'proper' }]] }],
    ['giant panda', 1, 1, {}],
  ],

  wild_dogs_and_foxes: [
    ['wolf', 1, 1], ['fox', 1, 1], ['coyote', 2, 1], ['jackal', 3, 1], ['dingo', 2, 1], ['red fox', 2, 1], ['arctic fox', 2, 1, { al: [['Arctic fox', 'spelling', 2, 1, [], { type: 'proper' }]] }].slice(0, 3),
    ['grey wolf', 2, 1, { al: [['gray wolf', 'spelling', 2, 1, ['US']], ['timber wolf', 'synonym', 3, 2]] }], ['fennec fox', 3, 1], ['dhole', 5, 3], ['African wild dog', 3, 1, P({ al: [['painted dog', 'synonym', 4, 2, [], { type: 'common' }]] })],
    ['maned wolf', 4, 2], ['bush dog', 5, 3], ['raccoon dog', 4, 3, { al: [['tanuki', 'synonym', 4, 3, [], { g: 'raccoon dog' }]] }], ['red wolf', 4, 2], ['swift fox', 4, 3], ['kit fox', 4, 3],
    ['gray fox', 4, 2, { al: [['grey fox', 'spelling', 4, 2, ['UK']]] }], ['bat-eared fox', 4, 2], ['corsac', 5, 3], ['crab-eating fox', 5, 3], ['Ethiopian wolf', 4, 2, P()],
    ['golden jackal', 4, 2], ['black-backed jackal', 4, 3], ['side-striped jackal', 5, 4], ['pampas fox', 5, 4], ['Darwin\'s fox', 5, 4, P()], ['island fox', 4, 3], ['Tibetan fox', 5, 3],
    ['lone wolf', 2, 3, { type: 'phrase' }], ['wolf pack', 2, 3], ['coydog', 5, 4], ['Tasmanian wolf', 4, 4, P()], ['vixen', 3, 2], ['Cape fox', 5, 4, P()],
  ],

  weasel_family: [
    ['weasel', 2, 1], ['stoat', 3, 1, { reg: ['UK', 'IE'], al: [['ermine', 'synonym', 3, 2]] }], ['ferret', 2, 1], ['otter', 2, 1], ['badger', 2, 1, A()], ['mink', 2, 1, A()],
    ['polecat', 3, 1], ['wolverine', 3, 1], ['marten', 4, 1], ['pine marten', 4, 1], ['fisher', 4, 2, A()], ['skunk', 2, 2], ['honey badger', 3, 1],
    ['sea otter', 2, 1], ['river otter', 3, 1], ['giant otter', 4, 2], ['American badger', 4, 2, P()], ['European badger', 3, 2, P()], ['hog badger', 5, 3],
    ['black-footed ferret', 4, 2], ['least weasel', 5, 3], ['long-tailed weasel', 4, 2], ['steppe polecat', 5, 4], ['American mink', 3, 2, P()], ['European mink', 5, 3, P()],
    ['stone marten', 5, 3], ['beech marten', 5, 4], ['tayra', 5, 3], ['grison', 5, 3], ['zorilla', 5, 3], ['ratel', 5, 4], ['hooded skunk', 5, 4], ['striped skunk', 3, 3],
    ['spotted skunk', 4, 3], ['hog-nosed skunk', 5, 4], ['Asian small-clawed otter', 5, 4].slice(0, 4),
  ].filter(r => r[0].length <= 20),

  bats: [
    ['bat', 1, 1, A()], ['vampire bat', 2, 1], ['fruit bat', 2, 1], ['flying fox', 3, 1, { g: 'bat' }], ['pipistrelle', 4, 2], ['horseshoe bat', 4, 2], ['noctule', 5, 3],
    ['long-eared bat', 4, 2], ['brown bat', 3, 2], ['little brown bat', 4, 2], ['big brown bat', 4, 2], ['Daubenton\'s bat', 5, 3, P()], ['Natterer\'s bat', 5, 3, P()],
    ['serotine', 5, 3], ['barbastelle', 5, 3], ['free-tailed bat', 5, 3], ['Mexican free-tailed bat', 5, 3, P()], ['leaf-nosed bat', 5, 3], ['bulldog bat', 5, 4], ['ghost bat', 5, 3],
    ['hoary bat', 5, 3], ['red bat', 5, 4], ['Indiana bat', 5, 3, P()], ['tomb bat', 5, 4], ['vesper bat', 5, 3], ['mouse-eared bat', 5, 4], ['Egyptian fruit bat', 4, 3, P()],
    ['spectral bat', 5, 4], ['Kitti\'s hog-nosed bat', 5, 4, P()], ['common vampire bat', 4, 2], ['megabat', 4, 3], ['microbat', 4, 3],
    ['echolocation', 3, 3], ['roost', 3, 4, { g: 'bats' }], ['colony', 2, 5, { g: 'bats' }],
  ],

  rabbits_and_hares: [
    ['rabbit', 1, 1], ['hare', 2, 1], ['bunny', 1, 2], ['jackrabbit', 3, 1], ['cottontail', 3, 1], ['snowshoe hare', 3, 2], ['Arctic hare', 3, 2, P()], ['European rabbit', 3, 2, P()],
    ['brown hare', 3, 2], ['mountain hare', 4, 2], ['pika', 4, 3], ['angora rabbit', 3, 3], ['lop', 4, 2, { g: 'rabbit' }], ['Flemish giant', 4, 3, P()], ['Dutch rabbit', 3, 3, P()],
    ['Netherland dwarf', 5, 4, P()], ['rex rabbit', 4, 3], ['marsh rabbit', 5, 3], ['swamp rabbit', 5, 3], ['pygmy rabbit', 5, 3], ['volcano rabbit', 5, 4], ['hispid hare', 5, 4],
    ['doe', 2, 3, { g: 'rabbit' }], ['buck', 2, 3, { g: 'rabbit' }], ['kit', 3, 3, { g: 'rabbit' }], ['leveret', 4, 2], ['warren', 3, 3, { g: 'rabbit' }], ['burrow', 3, 3, { g: 'rabbit' }],
    ['cony', 5, 3], ['coney', 5, 4, { al: [] }], ['Belgian hare', 5, 4, P()], ['antelope jackrabbit', 5, 4], ['Eastern cottontail', 4, 3, P()],
    ['Easter bunny', 1, 4, P()], ['hutch', 3, 4, { g: 'rabbit' }], ['March hare', 3, 4, P()],
  ],

  birds_of_prey: [
    ['eagle', 1, 1], ['hawk', 2, 1], ['falcon', 2, 1], ['owl', 1, 1], ['vulture', 2, 1], ['kite', 3, 2, B()], ['osprey', 3, 1], ['buzzard', 3, 1], ['harrier', 4, 2, B()], ['kestrel', 3, 1],
    ['condor', 2, 1], ['bald eagle', 1, 1], ['golden eagle', 2, 1], ['peregrine falcon', 3, 1], ['red-tailed hawk', 3, 2], ['barn owl', 2, 1], ['snowy owl', 2, 1], ['tawny owl', 3, 1],
    ['great horned owl', 3, 1], ['eagle owl', 4, 2], ['merlin', 4, 2, B()], ['hobby', 5, 3, B()], ['goshawk', 4, 2], ['sparrowhawk', 3, 2], ['gyrfalcon', 4, 2], ['lammergeier', 5, 3],
    ['secretary bird', 3, 2], ['caracara', 5, 3], ['harpy eagle', 4, 2], ['white-tailed eagle', 4, 2], ['sea eagle', 3, 2], ['fish eagle', 3, 2], ['turkey vulture', 3, 2], ['griffon vulture', 4, 2],
    ['bearded vulture', 4, 3], ['Andean condor', 3, 2, P()], ['California condor', 3, 2, P()], ['little owl', 3, 2], ['screech owl', 3, 2], ['raptor', 3, 2], ['bird of prey', 2, 3],
    ['talon', 3, 3, B()], ['aerie', 4, 4, { al: [['eyrie', 'spelling', 4, 4, ['UK']]] }],
  ].slice(0, 42),

  seabirds: [
    ['seagull', 1, 1, { al: [['gull', 'synonym', 2, 1]] }], ['albatross', 2, 1], ['puffin', 2, 1], ['pelican', 1, 2], ['penguin', 1, 2], ['gannet', 4, 2], ['cormorant', 3, 2], ['tern', 4, 2],
    ['petrel', 4, 2], ['skua', 4, 2], ['shearwater', 4, 3], ['fulmar', 4, 3], ['guillemot', 4, 3], ['razorbill', 4, 3], ['auk', 4, 3], ['kittiwake', 4, 3], ['frigatebird', 4, 3], ['booby', 3, 2, B()],
    ['storm petrel', 4, 3], ['Arctic tern', 3, 2, P()], ['herring gull', 3, 2], ['black-headed gull', 4, 3], ['great skua', 4, 3], ['bonxie', 5, 4, { reg: ['UK'] }], ['shag', 4, 3, B({ reg: ['UK', 'IE'] })],
    ['little auk', 5, 4], ['great auk', 4, 3], ['tropicbird', 5, 3], ['noddy', 5, 4, B()], ['sooty tern', 5, 4], ['Manx shearwater', 5, 3, P()], ['royal albatross', 4, 3], ['wandering albatross', 4, 2],
    ['sea eagle', 3, 2], ['brown pelican', 3, 2], ['magnificent frigatebird', 5, 4], ['blue-footed booby', 3, 2], ['pomarine skua', 5, 5], ['phalarope', 5, 4], ['murre', 5, 4],
  ].filter(r => r[0].length <= 20),

  songbirds: [
    ['robin', 1, 1], ['sparrow', 1, 1], ['nightingale', 2, 1], ['blackbird', 2, 1], ['thrush', 3, 1], ['lark', 3, 1, B()], ['skylark', 3, 1], ['wren', 3, 1], ['finch', 2, 1], ['canary', 2, 2],
    ['starling', 2, 2], ['swallow', 2, 3, B()], ['bluebird', 2, 1], ['cardinal', 2, 2, B()], ['mockingbird', 3, 1], ['blue jay', 2, 1], ['oriole', 3, 2], ['warbler', 3, 1], ['chickadee', 3, 1],
    ['nuthatch', 4, 2], ['goldfinch', 3, 1], ['chaffinch', 3, 1], ['bullfinch', 3, 1], ['greenfinch', 4, 2], ['bunting', 4, 2, B()], ['tit', 3, 2, B({ vulgar: false })], ['blue tit', 3, 1],
    ['great tit', 3, 1], ['song thrush', 3, 1], ['mistle thrush', 4, 2], ['redwing', 4, 3], ['fieldfare', 4, 3], ['dunnock', 4, 3, { reg: ['UK'] }], ['yellowhammer', 4, 3, { reg: ['UK'] }], ['linnet', 4, 2],
    ['siskin', 4, 3], ['redpoll', 5, 3], ['crossbill', 4, 3], ['hawfinch', 5, 3], ['treecreeper', 4, 3], ['wagtail', 4, 2], ['pipit', 4, 3], ['flycatcher', 4, 3], ['redstart', 4, 3],
    ['stonechat', 5, 3], ['whinchat', 5, 4], ['wheatear', 4, 3], ['lyrebird', 4, 2], ['meadowlark', 3, 2], ['junco', 4, 3], ['towhee', 5, 3], ['tanager', 4, 3], ['grosbeak', 4, 3],
    ['house sparrow', 2, 1], ['song sparrow', 4, 2], ['American robin', 3, 1, P()], ['zebra finch', 3, 2], ['house finch', 4, 3], ['European robin', 3, 1, P()],
    ['bellbird', 4, 3], ['tui', 4, 3, { reg: ['NZ'] }], ['fairy-wren', 5, 3], ['whitethroat', 5, 4], ['blackcap', 4, 3], ['chiffchaff', 5, 3], ['goldcrest', 4, 3],
  ].slice(0, 56),

  waterbirds: [
    ['duck', 1, 1], ['goose', 1, 1], ['swan', 1, 1], ['heron', 2, 1], ['stork', 2, 1], ['crane', 2, 2, B()], ['flamingo', 1, 2], ['pelican', 1, 2], ['mallard', 2, 1], ['teal', 3, 2, B()],
    ['egret', 3, 1], ['ibis', 3, 2], ['spoonbill', 3, 2], ['coot', 3, 2], ['moorhen', 3, 2], ['grebe', 4, 2], ['loon', 3, 2, B()], ['gadwall', 5, 3], ['pintail', 4, 3], ['wigeon', 4, 3],
    ['shoveler', 4, 3], ['pochard', 5, 3], ['goldeneye', 4, 3], ['eider', 4, 3], ['merganser', 4, 3], ['mute swan', 3, 1], ['black swan', 2, 1], ['trumpeter swan', 4, 2], ['whooper swan', 4, 2],
    ['Canada goose', 2, 1, P()], ['greylag goose', 4, 2], ['barnacle goose', 4, 3], ['brent goose', 5, 3], ['snow goose', 3, 2], ['Egyptian goose', 4, 3, P()], ['bittern', 4, 3], ['curlew', 4, 3], ['sandpiper', 4, 2],
    ['avocet', 4, 3], ['plover', 4, 3], ['snipe', 4, 3], ['godwit', 5, 3], ['redshank', 5, 3], ['oystercatcher', 4, 3], ['lapwing', 4, 3], ['wood duck', 3, 2], ['mandarin duck', 3, 2], ['muscovy duck', 4, 3],
    ['eider duck', 4, 3], ['great blue heron', 3, 2], ['kingfisher', 2, 3], ['water rail', 5, 3], ['jacana', 5, 3], ['whistling duck', 5, 4], ['tufted duck', 4, 3], ['dabbling duck', 5, 4],
  ].slice(0, 54),

  flightless_birds: [
    ['ostrich', 1, 1], ['emu', 2, 1], ['penguin', 1, 1], ['kiwi', 2, 1, B()], ['cassowary', 3, 1], ['rhea', 4, 2], ['dodo', 2, 1], ['kakapo', 4, 2], ['takahe', 5, 3], ['weka', 5, 3, { reg: ['NZ'] }],
    ['moa', 4, 2], ['emperor penguin', 1, 1], ['king penguin', 2, 1], ['Adelie penguin', 4, 2, P()], ['chinstrap penguin', 4, 2], ['gentoo penguin', 4, 2], ['macaroni penguin', 4, 2], ['rockhopper penguin', 4, 2],
    ['little penguin', 4, 2], ['fairy penguin', 4, 3], ['African penguin', 3, 2, P()], ['Galapagos penguin', 4, 2, P()], ['elephant bird', 4, 2], ['great auk', 4, 2], ['flightless cormorant', 4, 2],
    ['steamer duck', 5, 3], ['Inaccessible Island rail', 5, 5].slice(0, 0), ['Atitlan grebe', 5, 4], ['Tasmanian native hen', 5, 4], ['Stephens Island wren', 5, 5], ['common ostrich', 3, 2], ['greater rhea', 5, 3],
    ['southern cassowary', 4, 2], ['North Island brown kiwi', 5, 3].slice(0, 0), ['great spotted kiwi', 5, 3], ['brown kiwi', 3, 2], ['flightless', 3, 4, { pos: 'adjective' }], ['ratite', 5, 3],
    ['Madagascar elephant bird', 5, 4].slice(0, 0), ['Somali ostrich', 5, 4, P()], ['lesser rhea', 5, 4], ['Magellanic penguin', 5, 3], ['yellow-eyed penguin', 5, 3], ['Humboldt penguin', 5, 3],
  ].filter(r => r.length > 2),

  parrots: [
    ['parrot', 1, 1], ['macaw', 2, 1], ['cockatoo', 2, 1], ['budgie', 2, 1, { al: [['budgerigar', 'synonym', 3, 2], ['parakeet', 'synonym', 3, 2]] }], ['cockatiel', 3, 1], ['lorikeet', 4, 2], ['lovebird', 3, 1],
    ['African grey', 3, 1, P()], ['kea', 4, 2], ['kakapo', 4, 2], ['conure', 4, 2], ['rosella', 4, 2], ['amazon parrot', 4, 2], ['eclectus', 5, 3], ['lory', 5, 3], ['parrotlet', 5, 3],
    ['scarlet macaw', 2, 1], ['blue and gold macaw', 4, 2], ['hyacinth macaw', 4, 2], ['galah', 4, 2, { reg: ['AU'] }], ['corella', 5, 3, { reg: ['AU'] }],
    ['rainbow lorikeet', 3, 2], ['ring-necked parakeet', 4, 2], ['monk parakeet', 4, 3], ['Carolina parakeet', 5, 3, P()], ['sun conure', 4, 2], ['quaker parrot', 4, 3], ['kaka', 5, 3, { reg: ['NZ'], g: 'parrot' }],
    ['night parrot', 5, 3], ['ground parrot', 5, 4], ['owl parrot', 5, 3], ['pygmy parrot', 5, 4], ['hanging parrot', 5, 4], ['fig parrot', 5, 4], ['Senegal parrot', 5, 3, P()], ['Meyer\'s parrot', 5, 4, P()],
    ['palm cockatoo', 5, 3], ['black cockatoo', 4, 2], ['pink cockatoo', 4, 3], ['gang-gang', 5, 4], ['polly', 3, 4, { g: 'parrot' }], ['Polly', 2, 4, P({ g: 'parrot' })].slice(0, 0),
    ['Norwegian blue', 4, 5, P({ g: 'parrot', tm: true })],
  ].filter(r => r.length > 2),

  game_birds: [
    ['pheasant', 2, 1], ['partridge', 3, 1], ['quail', 3, 1], ['grouse', 3, 1], ['turkey', 1, 2, B()], ['guinea fowl', 3, 2], ['ptarmigan', 4, 2], ['woodcock', 4, 2], ['snipe', 4, 3],
    ['wild turkey', 2, 1], ['red grouse', 3, 1], ['black grouse', 4, 2], ['capercaillie', 4, 2], ['ruffed grouse', 4, 2], ['sage grouse', 4, 2], ['prairie chicken', 4, 2], ['bobwhite', 4, 2],
    ['red-legged partridge', 4, 2], ['grey partridge', 4, 2], ['chukar', 5, 3], ['francolin', 5, 3], ['ring-necked pheasant', 3, 2], ['golden pheasant', 3, 2], ['Reeves\'s pheasant', 5, 4, P()],
    ['jungle fowl', 4, 3], ['wood pigeon', 3, 3], ['mallard', 2, 3], ['teal', 3, 3, B()], ['wigeon', 4, 4], ['pintail', 4, 4], ['brace', 3, 4, { g: 'game' }], ['covey', 4, 3],
    ['gun dog', 2, 4, { g: 'game' }], ['beater', 3, 4, { g: 'game' }], ['shoot', 2, 4, { g: 'game', pos: 'noun' }], ['Gambel\'s quail', 5, 3, P()], ['California quail', 4, 3, P()], ['sharp-tailed grouse', 5, 3],
    ['willow ptarmigan', 5, 3], ['rock ptarmigan', 5, 3], ['hazel grouse', 5, 3], ['Hungarian partridge', 5, 3, P()], ['button quail', 5, 4], ['Japanese quail', 4, 3, P()], ['helmeted guineafowl', 5, 3],
  ].slice(0, 46),

  colorful_birds: [
    ['peacock', 1, 1], ['toucan', 1, 1], ['macaw', 2, 1], ['kingfisher', 2, 1], ['parrot', 1, 1], ['flamingo', 1, 1], ['hummingbird', 1, 1], ['cardinal', 2, 1, B()], ['blue jay', 2, 1], ['bluebird', 2, 1],
    ['bird of paradise', 2, 1, B()], ['lorikeet', 4, 1], ['rainbow lorikeet', 3, 1], ['parakeet', 3, 2], ['golden pheasant', 3, 1], ['quetzal', 4, 2, B()], ['scarlet ibis', 4, 2], ['roller', 4, 3, B()],
    ['bee-eater', 4, 2], ['hoopoe', 4, 3], ['oriole', 3, 2], ['goldfinch', 3, 2], ['tanager', 4, 2], ['scarlet tanager', 4, 2], ['painted bunting', 4, 2], ['indigo bunting', 4, 2],
    ['mandarin duck', 3, 2], ['wood duck', 3, 2], ['rainbow bee-eater', 5, 3], ['resplendent quetzal', 4, 2], ['cock-of-the-rock', 5, 3], ['lilac-breasted roller', 4, 2], ['pitta', 5, 3], ['turaco', 5, 3],
    ['sunbird', 4, 3], ['hyacinth macaw', 4, 2], ['scarlet macaw', 2, 1], ['blue-and-yellow macaw', 4, 2].slice(0, 0), ['peafowl', 3, 2], ['keel-billed toucan', 4, 2], ['hornbill', 3, 3],
    ['red-crested cardinal', 5, 3], ['Gouldian finch', 5, 3, P()], ['superb lyrebird', 5, 4].slice(0, 0), ['splendid fairywren', 5, 3], ['cockatoo', 2, 3], ['budgie', 2, 3], ['green jay', 5, 3],
    ['spoonbill', 3, 4], ['violet-eared waxbill', 5, 4], ['paradise tanager', 5, 3], ['Gouldian finch', 5, 3, P()].slice(0, 0), ['rosy-faced lovebird', 5, 4], ['bluethroat', 5, 4],
  ].filter(r => r.length > 2).slice(0, 52),

  bird_body_parts: [
    ['beak', 1, 1], ['bill', 2, 1, B()], ['feather', 1, 1], ['wing', 1, 1, B()], ['tail', 1, 1, B()], ['claw', 1, 1, B()], ['talon', 3, 1, B()], ['crest', 3, 2, B()], ['plumage', 3, 1],
    ['flanks', 3, 3, B()], ['wattle', 3, 2, B()], ['crop', 3, 2, B()], ['gizzard', 3, 2], ['down', 2, 2, B()], ['vent', 4, 4, B()], ['breastbone', 3, 2], ['breast', 1, 2, B()], ['crown', 3, 3, B()],
    ['auriculars', 5, 4], ['mantle', 4, 3, B()], ['rump', 3, 3, B()], ['primaries', 5, 3, B()], ['secondaries', 5, 3, B()], ['covert', 5, 4, B()], ['syrinx', 5, 3], ['cere', 5, 4], ['hackle', 5, 4, B()],
    ['spur', 3, 3, B()], ['tarsus', 5, 4], ['alula', 5, 4], ['barb', 4, 3, B()], ['rachis', 5, 4], ['vane', 5, 4, B()], ['preen gland', 5, 4], ['wing tip', 3, 2], ['tail feather', 2, 1],
    ['flight feather', 3, 2], ['webbed foot', 2, 2], ['eye ring', 4, 3], ['tertials', 5, 4], ['crown feather', 4, 3], ['bird\'s foot', 2, 4], ['scapulars', 5, 4],
    ['hallux', 5, 4], ['beak tip', 3, 3], ['lore', 5, 4, B()], ['supercilium', 5, 5], ['eyebrow stripe', 4, 4], ['wing bar', 4, 4], ['cloaca', 5, 4], ['air sac', 4, 4, B()], ['furcula', 5, 4],
    ['wishbone', 2, 3, B()], ['drumstick', 2, 4, B()],
  ].slice(0, 54),

  birdwatching_words: [
    ['binoculars', 1, 1], ['field guide', 2, 1], ['birdwatcher', 3, 1, { al: [['birder', 'synonym', 3, 1], ['twitcher', 'synonym', 4, 2, ['UK']]] }], ['hide', 3, 2, { g: 'birdwatching' }],
    ['bird feeder', 1, 1], ['nest box', 3, 2], ['birdhouse', 1, 2], ['birdsong', 2, 1], ['bird call', 2, 1], ['dawn chorus', 3, 2], ['migration', 2, 2, { g: 'birds' }], ['flock', 2, 2, { g: 'birds' }],
    ['plumage', 3, 3], ['roost', 3, 3, { g: 'birds' }], ['lifer', 4, 1], ['life list', 4, 1], ['spotting scope', 3, 2], ['checklist', 2, 3, { g: 'birdwatching' }], ['hotspot', 3, 3, { g: 'birdwatching' }],
    ['tick', 3, 2, { g: 'birdwatching' }], ['rarity', 3, 3, { g: 'birdwatching' }], ['vagrant', 4, 2, { g: 'birds' }], ['fledgling', 3, 2], ['juvenile', 3, 3, { g: 'birds' }], ['fall-out', 5, 4],
    ['jizz', 5, 3], ['mobbing', 4, 3, { g: 'birds' }], ['flyover', 4, 3], ['bird ringing', 4, 2, { al: [['bird banding', 'synonym', 4, 2, ['US']]] }], ['mist net', 4, 3], ['eBird', 4, 3, { tm: true }],
    ['RSPB', 3, 2, { type: 'acronym', reg: ['UK'] }], ['Audubon', 4, 2, P()], ['big year', 4, 3], ['bird count', 3, 2], ['birdathon', 5, 3], ['pishing', 5, 3], ['dip', 5, 3, { g: 'birdwatching' }],
    ['accidental', 5, 4, { g: 'birdwatching' }], ['passerine', 4, 3], ['non-passerine', 5, 4], ['summer visitor', 4, 3], ['winter visitor', 4, 3], ['resident', 3, 4, { g: 'birds' }],
    ['lek', 5, 4], ['feather ID', 5, 5].slice(0, 0), ['seed feeder', 2, 3], ['suet', 3, 3], ['bird table', 2, 2], ['birdbath', 3, 3], ['camera trap', 3, 5].slice(0, 0), ['telephoto lens', 2, 4],
    ['field notes', 3, 4], ['wing bar', 4, 3], ['bird sighting', 2, 2], ['bird of the year', 3, 4],
  ].filter(r => r.length > 2).slice(0, 56),

  pigeons_and_doves: [
    ['pigeon', 1, 1], ['dove', 1, 1], ['rock dove', 3, 1], ['wood pigeon', 3, 1], ['collared dove', 3, 1], ['turtle dove', 3, 1], ['mourning dove', 3, 1], ['homing pigeon', 2, 1],
    ['carrier pigeon', 2, 1], ['passenger pigeon', 3, 1], ['dodo', 2, 3], ['stock dove', 4, 2], ['feral pigeon', 3, 1], ['white dove', 2, 1], ['ringneck dove', 4, 2], ['Eurasian collared dove', 4, 2, P()],
    ['spotted dove', 4, 2], ['laughing dove', 4, 2], ['zebra dove', 4, 2], ['diamond dove', 5, 3], ['crested pigeon', 4, 2], ['bronzewing', 5, 3], ['fruit dove', 4, 2], ['imperial pigeon', 5, 3],
    ['crowned pigeon', 4, 2], ['Nicobar pigeon', 5, 3, P()], ['band-tailed pigeon', 5, 3], ['white-winged dove', 5, 3], ['ground dove', 4, 3], ['Inca dove', 5, 3, P()],
    ['squab', 3, 3], ['fantail pigeon', 4, 2], ['tumbler pigeon', 5, 3], ['racing pigeon', 3, 1], ['pouter pigeon', 5, 3], ['dovecote', 4, 3, { al: [['pigeon loft', 'synonym', 4, 3]] }], ['coo', 2, 4, verb({ g: 'dove' })],
    ['olive pigeon', 5, 4], ['green pigeon', 5, 4], ['peace dove', 2, 3], ['Barbary dove', 5, 4, P()], ['emerald dove', 5, 3], ['cooing', 2, 4], ['cuckoo-dove', 5, 4], ['mourning', 2, 5].slice(0, 0),
  ].filter(r => r.length > 2),

  snakes: [
    ['snake', 1, 1], ['cobra', 2, 1], ['python', 2, 1, A()], ['rattlesnake', 2, 1], ['anaconda', 2, 1], ['boa constrictor', 2, 1, { al: [['boa', 'synonym', 3, 1, [], { g: 'snake' }]] }], ['viper', 3, 1, A()],
    ['adder', 3, 1, A()], ['mamba', 3, 1, { g: 'snake' }], ['black mamba', 2, 1], ['king cobra', 3, 1], ['garter snake', 3, 1], ['coral snake', 4, 2], ['copperhead', 3, 1, A()], ['cottonmouth', 3, 1],
    ['water moccasin', 4, 2], ['sidewinder', 3, 2, A()], ['taipan', 4, 2], ['boomslang', 5, 3], ['grass snake', 3, 1], ['smooth snake', 5, 3], ['milk snake', 4, 2], ['corn snake', 3, 2], ['king snake', 4, 2],
    ['rat snake', 4, 2], ['ball python', 3, 2], ['Burmese python', 3, 2, P()], ['reticulated python', 4, 2], ['green tree python', 5, 3], ['emerald tree boa', 5, 3], ['rainbow boa', 5, 3],
    ['sea snake', 3, 2], ['whip snake', 4, 3], ['bullsnake', 5, 4], ['bull snake', 4, 3], ['hognose snake', 4, 3], ['gaboon viper', 5, 3, P()], ['puff adder', 4, 2],
    ['pit viper', 4, 2], ['bushmaster', 5, 3], ['fer-de-lance', 5, 3], ['eastern brown snake', 4, 3], ['tiger snake', 4, 2], ['death adder', 4, 2], ['inland taipan', 5, 3], ['krait', 4, 3],
    ['asp', 4, 3, A()], ['Egyptian cobra', 4, 2, P()], ['spitting cobra', 4, 2], ['blind snake', 5, 3], ['vine snake', 5, 3], ['cat snake', 5, 4], ['flying snake', 4, 3], ['sand boa', 5, 3],
    ['ringneck snake', 5, 4], ['racer', 4, 4, A()], ['worm snake', 5, 4], ['indigo snake', 5, 3], ['rattler', 3, 2, { reg: ['US'] }],
  ].slice(0, 54),

  lizards: [
    ['lizard', 1, 1], ['gecko', 2, 1], ['iguana', 2, 1], ['chameleon', 2, 1], ['Komodo dragon', 2, 1, P()], ['skink', 4, 2], ['monitor lizard', 3, 1], ['gila monster', 3, 1], ['bearded dragon', 3, 1],
    ['frilled lizard', 4, 2], ['thorny devil', 4, 2], ['horned lizard', 4, 2], ['basilisk', 4, 2, A()], ['anole', 4, 2], ['slow worm', 4, 2, { reg: ['UK', 'IE'] }], ['blue-tongued skink', 4, 2],
    ['marine iguana', 4, 2], ['green iguana', 2, 1], ['leopard gecko', 3, 1], ['tokay gecko', 4, 2], ['house gecko', 3, 2], ['leaf-tailed gecko', 5, 3], ['crested gecko', 4, 2], ['veiled chameleon', 4, 2],
    ['Jackson\'s chameleon', 5, 3, P()], ['panther chameleon', 4, 2], ['water dragon', 3, 2], ['sand lizard', 4, 2], ['common lizard', 4, 3], ['wall lizard', 4, 3], ['glass lizard', 5, 3],
    ['collared lizard', 5, 3], ['fence lizard', 5, 3], ['chuckwalla', 5, 3], ['desert iguana', 5, 3], ['rhinoceros iguana', 5, 3], ['tegu', 5, 3], ['whiptail', 5, 4], ['agama', 5, 3],
    ['Nile monitor', 4, 2, P()], ['water monitor', 4, 3], ['perentie', 5, 3], ['goanna', 4, 2, { reg: ['AU'] }], ['shingleback', 5, 3], ['bobtail', 5, 4, { g: 'lizard', reg: ['AU'] }],
    ['flying dragon', 5, 4], ['Gila monster', 3, 1, P()].slice(0, 0), ['tuatara', 4, 3, { reg: ['NZ'] }], ['anglehead', 5, 5].slice(0, 0), ['legless lizard', 5, 3], ['Madagascar day gecko', 5, 4].slice(0, 0),
    ['komodo', 3, 2, P({ g: 'lizard' })].slice(0, 0), ['girdled lizard', 5, 4], ['spiny lizard', 5, 3], ['side-blotched lizard', 5, 4], ['reptile', 1, 4, { g: 'lizard' }].slice(0, 0),
  ].filter(r => r.length > 2).slice(0, 54),

  turtles_and_tortoises: [
    ['turtle', 1, 1], ['tortoise', 1, 1], ['sea turtle', 2, 1], ['terrapin', 3, 2], ['snapping turtle', 3, 1], ['leatherback', 4, 2, { g: 'turtle' }], ['loggerhead', 4, 2, { g: 'turtle' }],
    ['green turtle', 3, 1], ['hawksbill', 4, 2], ['box turtle', 3, 2], ['painted turtle', 3, 2], ['red-eared slider', 3, 2], ['giant tortoise', 2, 1], ['Galapagos tortoise', 3, 1, P()],
    ['Aldabra tortoise', 4, 2, P()], ['desert tortoise', 3, 2], ['Hermann\'s tortoise', 4, 2, P()], ['Russian tortoise', 4, 2, P()], ['leopard tortoise', 4, 2], ['sulcata', 5, 3],
    ['softshell turtle', 4, 3], ['mud turtle', 4, 3], ['musk turtle', 5, 3], ['map turtle', 5, 3], ['wood turtle', 4, 3], ['spotted turtle', 5, 3], ['diamondback terrapin', 4, 3], 
    ['matamata', 5, 3], ['Kemp\'s ridley', 5, 3, P()], ['olive ridley', 5, 3], ['flatback turtle', 5, 3], ['pond turtle', 4, 3], ['river turtle', 4, 3], ['hatchling', 3, 3, { g: 'turtle' }],
    ['carapace', 4, 3], ['plastron', 5, 3], ['shell', 1, 3, { g: 'turtle' }], ['slider', 4, 3, { g: 'turtle' }], ['cooter', 5, 4], ['pancake tortoise', 5, 3], ['radiated tortoise', 5, 3],
    ['Indian star tortoise', 5, 3], ['Greek tortoise', 4, 3], ['Galapagos giant', 4, 3].slice(0, 0), ['gopher tortoise', 5, 3], ['bog turtle', 5, 4], ['stinkpot', 5, 4], ['leatherback turtle', 4, 2],
    ['loggerhead turtle', 4, 2], ['Lonesome George', 4, 3, P({ g: 'tortoise' })], ['Cumberland slider', 5, 5].slice(0, 0), ['tortoiseshell', 3, 5].slice(0, 0),
  ].filter(r => r.length > 2).slice(0, 52),

  crocodilians: [
    ['crocodile', 1, 1, { al: [['croc', 'synonym', 2, 1]] }], ['alligator', 1, 1, { al: [['gator', 'synonym', 2, 1, ['US']]] }], ['caiman', 3, 1], ['gharial', 4, 2], ['saltwater crocodile', 3, 1, { al: [['saltie', 'synonym', 4, 3, ['AU']]] }],
    ['Nile crocodile', 3, 1, P()], ['American alligator', 3, 1, P()], ['Chinese alligator', 4, 2, P()], ['black caiman', 4, 2], ['spectacled caiman', 4, 2], ['American crocodile', 3, 2, P()],
    ['freshwater crocodile', 4, 2], ['dwarf crocodile', 5, 3], ['slender-snouted crocodile', 5, 4], ['false gharial', 5, 3], ['Orinoco crocodile', 5, 3, P()], ['mugger crocodile', 5, 3],
    ['Siamese crocodile', 5, 3, P()], ['Cuban crocodile', 5, 3, P()], ['Philippine crocodile', 5, 3, P()], ['Morelet\'s crocodile', 5, 4, P()], ['Johnston\'s crocodile', 5, 4, P()], ['broad-snouted caiman', 5, 4],
    ['yacare caiman', 5, 4], ['Cuvier\'s dwarf caiman', 5, 5, P()], ['Schneider\'s dwarf caiman', 5, 5, P()], ['croc hunter', 3, 4].slice(0, 0), ['gavial', 4, 2], ['mugger', 4, 3, A()],
    ['hatchling', 3, 4, { g: 'crocodile' }].slice(0, 0), ['Sobek', 5, 4, P({ g: 'crocodile god', sens: true })].slice(0, 0), ['crocodilian', 4, 2], ['crocodylian', 5, 3, { al: [] }].slice(0, 0),
    ['swamp crocodile', 4, 3], ['estuarine crocodile', 4, 2], ['marsh crocodile', 5, 3], ['sacred crocodile', 5, 4], ['Australian freshwater crocodile', 5, 4].slice(0, 0), ['Tomistoma', 5, 4, P()],
  ].filter(r => r.length > 2 && r[0].length <= 20),

  frogs_and_toads: [
    ['frog', 1, 1], ['toad', 1, 1], ['tadpole', 2, 1, { al: [['polliwog', 'synonym', 5, 3, ['US']], ['pollywog', 'spelling', 5, 3, ['US']]] }], ['bullfrog', 2, 1], ['tree frog', 2, 1], ['cane toad', 3, 1],
    ['dart frog', 3, 1], ['poison dart frog', 3, 1], ['glass frog', 4, 2], ['natterjack', 5, 3, { reg: ['UK'] }], ['spadefoot', 5, 3], ['horned toad', 4, 3], ['common frog', 3, 1], ['common toad', 3, 1],
    ['leopard frog', 3, 2], ['green frog', 3, 2], ['red-eyed tree frog', 3, 1], ['marsh frog', 4, 2], ['edible frog', 4, 2], ['pool frog', 5, 3], ['midwife toad', 5, 3], ['fire-bellied toad', 4, 2],
    ['golden poison frog', 4, 2], ['strawberry poison frog', 4, 2], ['goliath frog', 4, 2], ['African clawed frog', 4, 2], ['Surinam toad', 5, 3], ['tomato frog', 4, 3], ['pacman frog', 4, 3],
    ['White\'s tree frog', 4, 3, P()], ['American toad', 3, 2, P()], ['Fowler\'s toad', 5, 3, P()], ['giant toad', 4, 3], ['gray tree frog', 4, 3], ['spring peeper', 4, 2], ['chorus frog', 5, 3],
    ['wood frog', 4, 3], ['cricket frog', 5, 4], ['barking tree frog', 5, 4], ['tailed frog', 5, 4], ['Darwin\'s frog', 5, 4, P()], ['Kermit', 1, 4, P({ tm: true, g: 'frog' })], ['froglet', 4, 3],
    ['spawn', 3, 4, { g: 'frog' }], ['croak', 2, 4, verb({ g: 'frog' })], ['ribbit', 3, 4, { g: 'frog' }], ['lily pad', 2, 4], ['frogspawn', 3, 3, { reg: ['UK'] }], ['toadlet', 5, 4],
    ['harlequin toad', 5, 3], ['golden toad', 4, 3], ['gastric-brooding frog', 5, 5].slice(0, 0), ['Titicaca water frog', 5, 4].slice(0, 0), ['hairy frog', 5, 4], ['flying frog', 4, 3],
  ].filter(r => r.length > 2).slice(0, 54),

  salamanders_and_newts: [
    ['salamander', 2, 1], ['newt', 2, 1, { al: [['eft', 'synonym', 5, 3]] }], ['axolotl', 3, 1], ['hellbender', 5, 2], ['mudpuppy', 5, 2], ['olm', 5, 2], ['fire salamander', 4, 1],
    ['giant salamander', 4, 2], ['smooth newt', 5, 2], ['crested newt', 5, 2], ['great crested newt', 4, 1, {}],
    ['palmate newt', 5, 3], ['alpine newt', 5, 3], ['marbled newt', 5, 3], ['red-spotted newt', 5, 3], ['eastern newt', 5, 3], ['rough-skinned newt', 5, 3], ['California newt', 5, 3, P()],
    ['spotted salamander', 4, 2], ['tiger salamander', 4, 2], ['marbled salamander', 5, 3], ['red-backed salamander', 5, 3], ['slimy salamander', 5, 3], 
    ['two-lined salamander', 5, 4], ['dusky salamander', 5, 4], ['cave salamander', 5, 3], ['lungless salamander', 5, 3], ['siren', 5, 3, A()], ['amphiuma', 5, 3], ['congo eel', 5, 4],
    ['waterdog', 5, 3], ['mole salamander', 5, 3], ['Pyrenean brook newt', 5, 4, P()], ['Italian crested newt', 5, 4, P()], ['sword-tail newt', 5, 5].slice(0, 0), ['caudate', 5, 4],
    ['urodele', 5, 5], ['Mexican walking fish', 5, 3], ['gills', 3, 4, { g: 'salamander' }], ['larva', 3, 4, { g: 'amphibian' }], ['eft stage', 5, 5].slice(0, 0), ['red eft', 5, 3],
    ['olm cave', 5, 5].slice(0, 0), ['Ozark hellbender', 5, 3, P()], ['Eastern hellbender', 5, 3, P()], ['axolotl', 3, 1], ['neotenic', 5, 5].slice(0, 0), ['Alpine salamander', 5, 3, P()],
    ['black salamander', 5, 4], ['Jordan\'s salamander', 5, 5, P()], ['ensatina', 5, 4], ['redwood salamander', 5, 5].slice(0, 0), ['Jefferson salamander', 5, 5, P()],
  ].filter(r => r.length > 2).slice(0, 48),

  freshwater_fish: [
    ['trout', 2, 1], ['salmon', 1, 2, F()], ['carp', 2, 1], ['pike', 3, 1, F()], ['perch', 3, 1, F()], ['bass', 2, 2, F()], ['catfish', 2, 1], ['goldfish', 1, 2], ['minnow', 3, 1], ['koi', 2, 2],
    ['bream', 4, 2, { reg: ['UK', 'AU'] }], ['roach', 3, 2, F()], ['tench', 4, 2, { reg: ['UK'] }], ['chub', 4, 3], ['dace', 4, 3], ['grayling', 4, 3], ['char', 4, 3, F()], ['zander', 4, 3],
    ['walleye', 4, 2, { reg: ['US', 'CA'] }], ['piranha', 2, 1], ['guppy', 2, 2], ['sturgeon', 3, 2], ['eel', 2, 3], ['bluegill', 3, 2], ['crappie', 4, 2, { reg: ['US'] }], ['sunfish', 4, 2],
    ['largemouth bass', 3, 1], ['smallmouth bass', 4, 2], ['rainbow trout', 3, 1], ['brown trout', 3, 1], ['brook trout', 3, 2], ['lake trout', 4, 2], ['steelhead', 4, 3], ['sockeye', 4, 3],
    ['muskellunge', 5, 3, { al: [['muskie', 'synonym', 4, 3, ['US', 'CA']]] }], ['northern pike', 3, 2], ['yellow perch', 3, 2], ['rudd', 5, 3, { reg: ['UK'] }], ['barbel', 5, 3, { reg: ['UK'] }],
    ['gudgeon', 5, 4, { reg: ['UK'] }], ['stickleback', 4, 3], ['bitterling', 5, 4], ['ide', 5, 4, F()], ['crucian carp', 5, 3], ['mirror carp', 4, 3], ['common carp', 3, 2], ['grass carp', 4, 3],
    ['silver carp', 4, 3], ['bighead carp', 5, 4], ['tilapia', 3, 2], ['Nile perch', 4, 2, P()], ['arapaima', 4, 2], ['arowana', 5, 3], ['paddlefish', 5, 3], ['gar', 4, 3, F()], ['bowfin', 5, 3],
    ['burbot', 5, 3], ['whitefish', 4, 3], ['cisco', 5, 4, F()], ['smelt', 4, 3, F()], ['shiner', 5, 4, F()], ['fathead minnow', 5, 4], ['sculpin', 5, 4], ['darter', 5, 4, F()], ['stonefish', 5, 5].slice(0, 0),
    ['Atlantic salmon', 3, 2, P()], ['chinook', 4, 2, { g: 'salmon' }], ['coho', 4, 3], ['pink salmon', 3, 2], ['chum salmon', 4, 3], ['kokanee', 5, 3], ['loach', 5, 3], ['tetra', 3, 3], ['danio', 5, 4],
    ['neon tetra', 3, 2], ['cichlid', 4, 3], ['oscar', 3, 3, F()], ['discus', 4, 3, F()], ['angelfish', 2, 3], ['swordtail', 4, 3], ['molly', 4, 3, F()], ['platy', 5, 4], ['betta', 4, 3], ['pacu', 5, 4],
    ['lungfish', 4, 3], ['river eel', 4, 4], ['electric eel', 3, 2], ['pirarucu', 5, 4], ['dorado', 5, 4, F()], ['payara', 5, 5, F()], ['tiger fish', 4, 3], ['Nile tilapia', 4, 3, P()],
  ].filter(r => r.length > 2).slice(0, 40),
};

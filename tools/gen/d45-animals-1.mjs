// Deeper animal themes, chunk 1 ("rest" list). Format: tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const A = (o = {}) => ({ g: 'animal', ...o });
const B = (o = {}) => ({ g: 'bird', ...o });
const F = (o = {}) => ({ g: 'fish', ...o });
const S = (o = {}) => ({ g: 'snake', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });
const verb = (o = {}) => ({ pos: 'verb', ...o });

export const THEMES = {
  monkeys: { d: 1 }, deer: { d: 2 }, antelopes: { d: 3 }, wild_cattle: { d: 4 }, wild_goats_and_sheep: { d: 5 }, wild_pigs: { d: 3 },
  owls: { d: 2 }, eagles: { d: 2 }, vultures: { d: 3 }, finches: { d: 4 }, crows_and_ravens: { d: 3 }, ducks: { d: 2 }, geese_and_swans: { d: 2 }, wading_birds: { d: 4 },
  venomous_snakes: { d: 2 }, constrictor_snakes: { d: 3 }, salmon_and_trout: { d: 3 }, flatfish: { d: 4 }, cephalopods: { d: 2 }, seals_and_sea_lions: { d: 2 },
  butterfly_life_stages: { d: 1, complete: true, note: 'the four stages of a butterfly, with their common names' },
  small_pets: { d: 1 }, pet_supplies: { d: 2 }, dog_commands: { d: 1 }, cat_behaviors: { d: 3 },
  terriers: { d: 4 }, hounds: { d: 3 }, toy_dogs: { d: 2 }, herding_dogs: { d: 4 }, working_dogs: { d: 4 },
};

export const FIXES = [
  { gloss: ['back', 'torso', 'body part'] }, { gloss: ['stalking', 'crimes', 'harassment'] }, { gloss: ['nutcracker', 'kitchen_utensils', 'tool'] }, { gloss: ['bedding', 'sleep', 'bed'] }, { gloss: ['hoodie', 'clothes', 'garment'] }, { gloss: ['clicker', 'film_and_tv', 'remote'] },
  { gloss: ['griffon', 'mythology', 'myth'] }, { gloss: ['witch', 'fantasy', 'sorceress'] }, { gloss: ['scratching', 'hip_hop_words', 'DJing'] }, { gloss: ['redhead', 'hair', 'person'] },
  { gloss: ['topknot', 'hair', 'hairstyle'] }, { gloss: ['mush', 'words_for_friend', 'friend'] }, { gloss: ['bolognese', 'pasta_dishes', 'sauce'] }, { gloss: ['kelpie', 'mythical_creatures', 'water spirit'] },
  { gloss: ['lassie', 'scottish_words', 'girl'] }, { gloss: ['Staffordshire', 'english_counties', 'county'] },
];

export const DATA = {
  monkeys: [
    ['capuchin', 2, 1], ['howler monkey', 2, 1], ['spider monkey', 2, 1], ['squirrel monkey', 2, 1], ['rhesus monkey', 3, 1, { al: [['rhesus macaque', 'synonym', 4, 2]] }],
    ['macaque', 3, 1], ['baboon', 2, 2], ['mandrill', 3, 2], ['vervet', 4, 2, { al: [['green monkey', 'synonym', 3, 1]] }], ['colobus', 4, 2, { al: [['colobus monkey', 'synonym', 3, 1]] }],
    ['proboscis monkey', 3, 1], ['langur', 4, 2], ['tamarin', 4, 2], ['marmoset', 3, 2], ['titi monkey', 4, 2], ['uakari', 5, 3], ['saki', 5, 3, A({ g: 'monkey' })],
    ['snub-nosed monkey', 4, 2], ['patas monkey', 4, 2], ['Barbary macaque', 3, 2, P()], ['golden lion tamarin', 4, 2], ['mangabey', 5, 3], ['guenon', 5, 3], ['drill', 4, 3, A({ g: 'monkey' })],
    ['gelada', 4, 3], ['night monkey', 5, 3, { al: [['owl monkey', 'synonym', 4, 2]] }], ['woolly monkey', 4, 2], ['Japanese macaque', 3, 2, P({ al: [['snow monkey', 'synonym', 2, 1, [], { type: 'common' }]] })],
    ['diana monkey', 5, 3], ['emperor tamarin', 5, 3], ['monkey', 1, 3, A()],
  ],

  deer: [
    ['red deer', 2, 1], ['roe deer', 3, 1], ['fallow deer', 3, 1], ['white-tailed deer', 2, 1], ['mule deer', 3, 1], ['elk', 2, 1, A()], ['moose', 2, 1], ['reindeer', 1, 1],
    ['caribou', 2, 1], ['sika deer', 4, 2], ['muntjac', 4, 2], ['chital', 5, 3], ['sambar', 5, 3], ['axis deer', 4, 2], ['wapiti', 4, 2], ['Pere David\'s deer', 5, 3, P()],
    ['water deer', 4, 2], ['pudu', 4, 2], ['brocket deer', 5, 3], ['hog deer', 5, 3], ['musk deer', 5, 3], ['stag', 2, 2, A({ g: 'deer' })], ['doe', 2, 2, A({ g: 'deer' })],
    ['fawn', 1, 2, A({ g: 'deer' })], ['hart', 3, 2], ['hind', 4, 3, A({ g: 'deer' })], ['roebuck', 4, 3], ['Bambi', 1, 3, P({ g: 'deer', tm: true })], ['Rudolph', 1, 3],
    ['barasingha', 5, 4], ['marsh deer', 5, 4],
  ],

  antelopes: [
    ['impala', 2, 1], ['gazelle', 2, 1], ['springbok', 3, 1], ['kudu', 3, 1], ['eland', 3, 1], ['oryx', 3, 1], ['wildebeest', 2, 2, { al: [['gnu', 'synonym', 3, 2]] }], ['hartebeest', 4, 2],
    ['topi', 5, 3], ['waterbuck', 4, 2], ['bongo', 4, 2, A({ g: 'antelope' })], ['nyala', 5, 3], ['sable antelope', 4, 2], ['roan antelope', 5, 3], ['gerenuk', 5, 3], ['dik-dik', 4, 2],
    ['duiker', 5, 3], ['klipspringer', 5, 3], ['steenbok', 5, 3], ['oribi', 5, 4], ['saiga', 4, 2], ['blackbuck', 4, 2], ['nilgai', 5, 3], ['addax', 5, 3], ['Thomson\'s gazelle', 3, 1, P()],
    ['bushbuck', 5, 3], ['reedbuck', 5, 3], ['sitatunga', 5, 4], ['lechwe', 5, 4], ['bontebok', 5, 4], ['blesbok', 5, 4], ['pronghorn', 4, 4], ['chiru', 5, 4],
    ['antelope', 1, 2],
  ],

  wild_cattle: [
    ['bison', 2, 1], ['American bison', 2, 1, P()], ['European bison', 3, 2, P({ al: [['wisent', 'synonym', 4, 3]] })], ['Cape buffalo', 3, 1, P()], ['water buffalo', 2, 1], ['yak', 2, 1], ['wild yak', 4, 2],
    ['gaur', 4, 2], ['banteng', 5, 3], ['kouprey', 5, 4], ['aurochs', 4, 2, { al: [['auroch', 'spelling', 4, 2]] }], ['anoa', 5, 3], ['musk ox', 3, 3, { al: [['muskox', 'spelling', 4, 3]] }], ['gayal', 5, 4],
    ['tamaraw', 5, 3], ['buffalo', 1, 2, A()], ['African buffalo', 3, 1, P()], ['forest buffalo', 5, 3], ['dwarf buffalo', 5, 4], ['Chillingham cattle', 5, 4, P()],
    ['saola', 5, 4], ['wood bison', 4, 2], ['plains bison', 4, 2],
  ],

  wild_goats_and_sheep: [
    ['ibex', 3, 1], ['mouflon', 4, 1], ['bighorn sheep', 3, 1], ['Dall sheep', 4, 2, P()], ['argali', 4, 2], ['markhor', 4, 2], ['tahr', 4, 2], ['chamois', 3, 2, A()], ['Barbary sheep', 4, 2, P({ al: [['aoudad', 'synonym', 4, 3, [], { type: 'common' }]] })],
    ['urial', 5, 3], ['mountain goat', 2, 1], ['Alpine ibex', 3, 1, P()], ['Nubian ibex', 4, 2, P()], ['bharal', 5, 3, { al: [['blue sheep', 'synonym', 4, 2]] }], ['takin', 5, 3], ['serow', 5, 3], ['goral', 5, 4],
    ['wild goat', 2, 1], ['bezoar', 5, 4, A({ g: 'wild goat' })], ['snow sheep', 5, 3], ['Siberian ibex', 4, 2, P()], ['Walia ibex', 5, 4, P()], ['Himalayan tahr', 4, 2, P()], ['Rocky Mountain goat', 3, 2, P()],
    ['wild sheep', 2, 1], ['Marco Polo sheep', 4, 3, P()], ['Stone\'s sheep', 5, 4, P()],
  ],

  wild_pigs: [
    ['wild boar', 2, 1], ['warthog', 2, 1, A()], ['bushpig', 4, 2], ['peccary', 3, 2], ['babirusa', 5, 3], ['javelina', 4, 2], ['red river hog', 4, 2], ['giant forest hog', 5, 3],
    ['pygmy hog', 5, 3], ['Visayan warty pig', 5, 3, P()], ['bearded pig', 4, 3], ['razorback', 3, 2, A({ g: 'wild pig' })], ['boar', 2, 1, A()], ['feral pig', 3, 1], ['collared peccary', 4, 2],
    ['white-lipped peccary', 5, 3], ['Chacoan peccary', 5, 4, P()], ['Sulawesi warty pig', 5, 4, P()], ['hog', 2, 2, A({ g: 'pig' })], ['sounder', 5, 4, { g: 'boars' }], ['tusker', 3, 3],
    ['Pumbaa', 2, 3, P({ g: 'warthog', tm: true })], ['wild hog', 2, 1],
  ],

  owls: [
    ['barn owl', 2, 1], ['snowy owl', 2, 1], ['great horned owl', 3, 1], ['tawny owl', 3, 1], ['screech owl', 3, 1], ['long-eared owl', 4, 1], ['short-eared owl', 4, 1], ['barred owl', 3, 1],
    ['burrowing owl', 3, 1], ['eagle owl', 3, 1], ['little owl', 3, 1], ['elf owl', 4, 2], ['spotted owl', 3, 1], ['saw-whet owl', 4, 2], ['pygmy owl', 4, 2], ['boreal owl', 5, 3],
    ['great grey owl', 4, 2], ['Ural owl', 5, 3, P()], ['fish owl', 5, 3], ['scops owl', 5, 3], ['hawk owl', 5, 3], ['masked owl', 5, 3], ['spectacled owl', 5, 3], ['Eurasian eagle-owl', 5, 3, P()],
    ['owl', 1, 2], ['owlet', 3, 2], ['Hedwig', 2, 3, P({ g: 'owl', tm: true })], ['Blakiston\'s fish owl', 5, 4, P()], ['hoot owl', 3, 2],
  ],

  eagles: [
    ['bald eagle', 1, 1], ['golden eagle', 2, 1], ['harpy eagle', 3, 1], ['white-tailed eagle', 3, 1], ['sea eagle', 3, 1], ['Steller\'s sea eagle', 5, 3, P()], ['crowned eagle', 4, 2], ['martial eagle', 4, 2],
    ['Philippine eagle', 4, 2, P()], ['wedge-tailed eagle', 4, 2], ['booted eagle', 5, 3], ['Bonelli\'s eagle', 5, 3, P()], ['imperial eagle', 4, 2], ['spotted eagle', 5, 3], ['tawny eagle', 5, 3],
    ['fish eagle', 3, 2], ['African fish eagle', 3, 2, P()], ['short-toed eagle', 5, 3], ['bateleur', 5, 3], ['serpent eagle', 5, 3], ['eaglet', 3, 2],
    ['Haast\'s eagle', 5, 4, P()], ['snake eagle', 4, 3], ['black eagle', 3, 2], ['eagle', 1, 2, B()], ['American eagle', 2, 2, P()], ['Madagascar fish eagle', 5, 4, P()],
  ],

  vultures: [
    ['turkey vulture', 2, 1], ['black vulture', 3, 1], ['griffon vulture', 4, 1], ['bearded vulture', 4, 2, { al: [['lammergeier', 'synonym', 5, 3]] }], ['Egyptian vulture', 4, 2, P()], ['king vulture', 4, 2],
    ['lappet-faced vulture', 5, 3], ['white-backed vulture', 4, 2], ['cinereous vulture', 5, 3], ['condor', 2, 1], ['Andean condor', 3, 1, P()], ['California condor', 3, 1, P()], ['hooded vulture', 5, 3],
    ['palm-nut vulture', 5, 3], ['Himalayan griffon', 5, 4, P()], ['Cape vulture', 4, 3, P()], ['white-headed vulture', 5, 3], ['vulture', 1, 2], ['buzzard', 3, 3],
    ['turkey buzzard', 3, 2], ['Old World vulture', 4, 3, P()], ['New World vulture', 4, 3, P()], ['Ruppell\'s vulture', 5, 4, P()], ['ossifrage', 5, 5], ['griffon', 4, 3, B({ g: 'vulture' })],
    ['red-headed vulture', 5, 4],
  ],

  finches: [
    ['goldfinch', 2, 1], ['chaffinch', 2, 1], ['bullfinch', 2, 1], ['greenfinch', 3, 1], ['canary', 1, 2], ['siskin', 4, 2], ['linnet', 3, 2], ['redpoll', 4, 2], ['crossbill', 4, 2],
    ['hawfinch', 4, 2], ['brambling', 4, 2], ['house finch', 3, 1], ['purple finch', 4, 2], ['zebra finch', 2, 1], ['Gouldian finch', 3, 1, P()], ['serin', 5, 3], ['twite', 5, 3], ['rosefinch', 4, 2],
    ['grosbeak', 4, 2], ['evening grosbeak', 4, 2], ['pine siskin', 4, 2], ['Darwin\'s finches', 3, 1, P()], ['American goldfinch', 3, 1, P()], ['lesser redpoll', 5, 3], ['European goldfinch', 3, 1, P()],
    ['trumpeter finch', 5, 4], ['citril finch', 5, 4], ['society finch', 4, 2], ['Bengalese finch', 4, 2, P()], ['waxbill', 5, 3], ['finch', 1, 2], ['Java sparrow', 4, 3, P()],
    ['snowfinch', 5, 4], ['hoary redpoll', 5, 5], ['rose-breasted grosbeak', 5, 4],
  ],

  crows_and_ravens: [
    ['crow', 1, 1, B()], ['raven', 2, 1, B()], ['rook', 3, 1, B()], ['jackdaw', 3, 1], ['magpie', 2, 2], ['jay', 2, 2, B()], ['chough', 5, 3], ['nutcracker', 4, 3, B()], ['carrion crow', 3, 1],
    ['hooded crow', 4, 1], ['common raven', 3, 1], ['American crow', 2, 1, P()], ['fish crow', 4, 2], ['blue jay', 2, 2], ['Eurasian jay', 3, 2, P()], ['Steller\'s jay', 4, 2, P()], ['scrub jay', 4, 2],
    ['Clark\'s nutcracker', 5, 3, P()], ['treepie', 5, 3], ['Alpine chough', 5, 3, P()], ['red-billed chough', 5, 3], ['hoodie', 4, 2, { g: 'crow' }], ['house crow', 4, 2], ['pied crow', 4, 2],
    ['white-necked raven', 5, 4], ['Australian raven', 4, 3, P()], ['pinyon jay', 5, 4], ['Canada jay', 4, 3, P()], ['corvid', 3, 2], ['murder of crows', 2, 3, { type: 'phrase' }],
    ['azure-winged magpie', 5, 4], ['black-billed magpie', 4, 3], ['gray jay', 4, 3],
  ],

  ducks: [
    ['mallard', 2, 1, { g: 'duck' }], ['teal', 3, 1, B({ g: 'duck' })], ['wigeon', 4, 1], ['pintail', 4, 1], ['shoveler', 4, 1], ['gadwall', 5, 2], ['eider', 4, 1], ['pochard', 4, 2], ['tufted duck', 4, 1],
    ['goldeneye', 4, 2], ['merganser', 4, 2], ['scaup', 5, 2], ['mandarin duck', 2, 1], ['wood duck', 3, 1], ['Muscovy duck', 3, 1, P()], ['Pekin duck', 3, 1, P()],
    ['Aylesbury duck', 4, 2, P()], ['Indian runner', 4, 2, P({ g: 'duck' })], ['canvasback', 4, 2], ['bufflehead', 4, 2], ['harlequin duck', 4, 2], ['long-tailed duck', 4, 2], ['smew', 5, 3], ['goosander', 5, 3],
    ['shelduck', 4, 2], ['redhead', 4, 3, B({ g: 'duck' })], ['ruddy duck', 4, 2], ['scoter', 5, 3], ['garganey', 5, 3], ['ringed teal', 5, 4], ['whistling duck', 4, 3], ['black duck', 3, 2],
    ['Khaki Campbell', 5, 4, P({ g: 'duck' })], ['Rouen duck', 5, 4, P()], ['drake', 3, 2, B({ g: 'duck' })], ['duckling', 1, 2], ['rubber duck', 1, 4, { g: 'toy' }],
  ],

  geese_and_swans: [
    ['Canada goose', 2, 1, P()], ['greylag goose', 4, 1], ['snow goose', 3, 1], ['barnacle goose', 4, 1], ['brent goose', 4, 1], ['pink-footed goose', 5, 2], ['white-fronted goose', 5, 2], ['bean goose', 5, 3],
    ['Egyptian goose', 4, 2, P()], ['bar-headed goose', 5, 3], ['nene', 5, 3, B({ g: 'goose' })], ['emperor goose', 5, 3], ['Ross\'s goose', 5, 4, P()], ['mute swan', 3, 1], ['whooper swan', 4, 2],
    ['Bewick\'s swan', 5, 3, P()], ['trumpeter swan', 4, 2], ['black swan', 2, 1], ['tundra swan', 4, 2], ['black-necked swan', 5, 3], ['coscoroba', 5, 5], ['swan', 1, 2], ['goose', 1, 2],
    ['gander', 3, 2, B({ g: 'male goose' })], ['gosling', 2, 2], ['cygnet', 3, 2, { g: 'young swan' }], ['cob', 4, 3, B({ g: 'male swan' })], ['pen', 4, 3, B({ g: 'female swan' })], ['brant', 5, 3, B({ g: 'goose' })],
    ['Hawaiian goose', 5, 3, P()], ['Chinese goose', 4, 3, P()], ['Toulouse goose', 5, 4, P()], ['Embden goose', 5, 4, P()], ['wild goose', 2, 2],
  ],

  wading_birds: [
    ['heron', 2, 1], ['egret', 3, 1], ['stork', 2, 1], ['crane', 2, 1, B()], ['ibis', 3, 1, B()], ['spoonbill', 3, 1], ['flamingo', 1, 2], ['avocet', 4, 1], ['stilt', 4, 1, B({ g: 'wader' })],
    ['curlew', 4, 1], ['godwit', 4, 1], ['sandpiper', 3, 1], ['plover', 3, 1], ['snipe', 3, 1], ['woodcock', 3, 2], ['oystercatcher', 3, 1], ['redshank', 4, 1], ['greenshank', 5, 2],
    ['turnstone', 4, 2, B()], ['knot', 5, 3, B()], ['dunlin', 4, 1], ['sanderling', 5, 2], ['lapwing', 3, 1], ['bittern', 4, 2], ['whimbrel', 5, 2], ['ruff', 5, 3, B()], ['phalarope', 5, 3],
    ['jacana', 5, 3], ['limpkin', 5, 3], ['sacred ibis', 4, 2], ['great blue heron', 3, 1], ['grey heron', 3, 1], ['little egret', 3, 1], ['cattle egret', 3, 1], ['marabou stork', 4, 2], ['whooping crane', 3, 2],
    ['sandhill crane', 4, 2], ['shoebill', 4, 2], ['hammerkop', 5, 3], ['night heron', 4, 2], ['glossy ibis', 5, 3], ['scarlet ibis', 4, 2], ['white stork', 3, 1], ['jabiru', 5, 3], ['killdeer', 5, 3],
    ['yellowlegs', 5, 3], ['wader', 3, 3], ['peewit', 4, 3],
  ],

  venomous_snakes: [
    ['cobra', 1, 1, S()], ['king cobra', 2, 1], ['viper', 2, 1, A()], ['adder', 2, 1, A()], ['rattlesnake', 1, 1], ['mamba', 2, 1, S()], ['black mamba', 2, 1], ['green mamba', 3, 1], ['taipan', 3, 1],
    ['inland taipan', 4, 1], ['coral snake', 3, 1], ['copperhead', 3, 1, { g: 'snake' }], ['cottonmouth', 3, 1], ['water moccasin', 3, 2], ['krait', 4, 1], ['boomslang', 4, 1], ['sea snake', 3, 1],
    ['puff adder', 4, 1], ['Gaboon viper', 5, 2, P()], ['bushmaster', 4, 2], ['fer-de-lance', 4, 2], ['death adder', 4, 2], ['tiger snake', 3, 2], ['brown snake', 3, 2], ['sidewinder', 3, 2, S()],
    ['diamondback', 3, 2], ['eastern diamondback', 4, 2], ['western diamondback', 4, 2], ['timber rattlesnake', 4, 2], ['horned viper', 5, 3], ['saw-scaled viper', 5, 3], ['Russell\'s viper', 5, 3, P()],
    ['pit viper', 4, 2], ['asp', 3, 3, A()], ['spitting cobra', 3, 2], ['Indian cobra', 3, 2, P()], ['banded krait', 5, 3], ['lancehead', 5, 3], ['terciopelo', 5, 4], ['rinkhals', 5, 4], ['mulga snake', 5, 4],
    ['venomous snake', 1, 1],
  ],

  constrictor_snakes: [
    ['boa constrictor', 2, 1], ['python', 1, 1, A()], ['anaconda', 2, 1], ['green anaconda', 3, 1], ['reticulated python', 3, 1], ['Burmese python', 3, 1, P()], ['ball python', 3, 1], ['royal python', 4, 2],
    ['rock python', 4, 2], ['African rock python', 4, 2, P()], ['carpet python', 4, 2], ['rosy boa', 4, 2], ['rubber boa', 4, 2], ['emerald tree boa', 4, 2], ['tree boa', 4, 2], ['sand boa', 4, 2],
    ['kingsnake', 3, 3], ['corn snake', 3, 3], ['rat snake', 3, 3], ['gopher snake', 4, 3], ['bull snake', 4, 3], ['milk snake', 4, 3], ['pine snake', 5, 4], ['Indian python', 4, 2, P()], ['green tree python', 4, 2],
    ['amethystine python', 5, 3], ['scrub python', 5, 3], ['Madagascar boa', 5, 3, P()], ['yellow anaconda', 5, 3], ['rainbow boa', 4, 3], ['black rat snake', 4, 3], ['boa', 2, 1, S()], ['constrictor', 2, 2],
    ['woma python', 5, 4], ['Children\'s python', 5, 4, P()], ['spotted python', 5, 4], ['Kaa', 2, 4, P({ g: 'python', tm: true })], ['Titanoboa', 4, 4, P()], ['Dumeril\'s boa', 5, 4, P()],
  ],

  salmon_and_trout: [
    ['Atlantic salmon', 2, 1, P()], ['chinook', 4, 2, { g: 'salmon' }], ['king salmon', 3, 1], ['coho', 4, 2, { al: [['silver salmon', 'synonym', 3, 1]] }], ['sockeye', 3, 1, { al: [['red salmon', 'synonym', 3, 1]] }],
    ['pink salmon', 3, 1, { al: [['humpback salmon', 'synonym', 5, 3]] }], ['chum salmon', 4, 1], ['rainbow trout', 2, 1], ['brown trout', 2, 1], ['brook trout', 3, 1], ['lake trout', 3, 1], ['cutthroat trout', 4, 1],
    ['steelhead', 4, 2], ['sea trout', 3, 1], ['Arctic char', 4, 2], ['salmon', 1, 1, F()], ['trout', 1, 1], ['Dolly Varden', 5, 3, P({ g: 'trout' })], ['golden trout', 4, 2], ['bull trout', 4, 2], ['kokanee', 5, 3],
    ['smolt', 4, 3], ['parr', 5, 3], ['grilse', 5, 3], ['alevin', 5, 4], ['fingerling', 4, 3], ['kelt', 5, 4], ['redd', 5, 4], ['salmon run', 2, 3],
    ['Pacific salmon', 3, 1, P()], ['masu salmon', 5, 3], ['tiger trout', 5, 4], ['splake', 5, 5], ['ferox trout', 5, 4], ['huchen', 5, 4], ['Danube salmon', 5, 4, P()],
    ['landlocked salmon', 4, 2], ['smoked salmon', 1, 4],
  ],

  flatfish: [
    ['flounder', 2, 1, F()], ['plaice', 3, 1], ['sole', 2, 1, F()], ['halibut', 2, 1], ['turbot', 3, 1], ['brill', 4, 1], ['dab', 4, 1, F()], ['megrim', 5, 2], ['Dover sole', 3, 1, P()], ['lemon sole', 3, 1],
    ['Greenland halibut', 4, 2, P()], ['Atlantic halibut', 3, 1, P()], ['Pacific halibut', 3, 1, P()], ['summer flounder', 4, 2], ['fluke', 3, 2, F()], ['winter flounder', 4, 2], ['witch', 5, 3, F({ g: 'flatfish' })],
    ['sand dab', 4, 2], ['tonguefish', 5, 3], ['petrale sole', 5, 3], ['rock sole', 4, 2], ['yellowtail flounder', 4, 2], ['European plaice', 4, 2, P()], ['common sole', 4, 2], ['Senegalese sole', 5, 3, P()],
    ['scaldfish', 5, 3], ['topknot', 5, 4, F({ g: 'flatfish' })], ['windowpane', 5, 3, F({ g: 'flatfish' })], ['American plaice', 5, 3, P()], ['starry flounder', 5, 3], ['California halibut', 4, 2, P()],
    ['hogchoker', 5, 4], ['peacock flounder', 5, 4],
  ],

  cephalopods: [
    ['octopus', 1, 1, A()], ['squid', 1, 1], ['cuttlefish', 2, 1], ['nautilus', 3, 1, { g: 'mollusk' }], ['giant squid', 2, 1], ['colossal squid', 3, 1], ['Humboldt squid', 4, 2, P()],
    ['vampire squid', 4, 2], ['dumbo octopus', 4, 2], ['blue-ringed octopus', 3, 1], ['giant Pacific octopus', 3, 1, P()], ['common octopus', 3, 1], ['argonaut', 5, 3, A({ g: 'octopus' })],
    ['paper nautilus', 5, 3], ['bobtail squid', 5, 3], ['firefly squid', 5, 3], ['flamboyant cuttlefish', 4, 2], ['mimic octopus', 4, 2], ['tentacle', 2, 3], ['ammonite', 3, 4],
    ['belemnite', 5, 4], ['spirula', 5, 5], ['chambered nautilus', 4, 2], ['pearly nautilus', 5, 3], ['reef squid', 4, 2], ['glass squid', 5, 3], ['wunderpus', 5, 4], ['cephalopod', 3, 1],
    ['calamari', 1, 3], ['Kraken', 2, 4],
  ],

  seals_and_sea_lions: [
    ['seal', 1, 1, A()], ['sea lion', 1, 1], ['walrus', 1, 2], ['elephant seal', 2, 1], ['fur seal', 3, 1], ['harbor seal', 3, 1, { al: [['harbour seal', 'spelling', 3, 1, ['UK']]] }], ['grey seal', 3, 1],
    ['harp seal', 3, 1], ['leopard seal', 3, 1], ['Weddell seal', 4, 2, P()], ['monk seal', 4, 2], ['Hawaiian monk seal', 4, 2, P()], ['Steller sea lion', 4, 2, P()], ['California sea lion', 3, 1, P()],
    ['ringed seal', 4, 2], ['bearded seal', 4, 2], ['hooded seal', 4, 2], ['crabeater seal', 4, 2], ['Ross seal', 5, 3, P()], ['ribbon seal', 5, 3], ['northern fur seal', 4, 2], ['Galapagos sea lion', 4, 2, P()],
    ['Australian sea lion', 4, 2, P()], ['Baikal seal', 5, 3, P()], ['Caspian seal', 5, 3, P()], ['spotted seal', 5, 3], ['common seal', 3, 1], ['southern elephant seal', 4, 2], ['Maltese monk seal', 5, 3, P()],
    ['pup', 1, 3], ['rookery', 4, 4], ['haul-out', 5, 4], ['pinniped', 4, 2], ['selkie', 3, 4],
  ],

  butterfly_life_stages: [
    ['egg', 1, 1], ['caterpillar', 1, 1], ['larva', 3, 1, { g: 'grub' }], ['chrysalis', 2, 1], ['pupa', 3, 2], ['imago', 5, 4], ['adult', 1, 3, A()], ['butterfly', 1, 1, { g: 'insect' }],
  ],

  small_pets: [
    ['hamster', 1, 1], ['guinea pig', 1, 1], ['gerbil', 2, 1], ['rabbit', 1, 1], ['mouse', 1, 1, A()], ['rat', 1, 1, A()], ['ferret', 2, 1], ['chinchilla', 3, 1], ['degu', 4, 2], ['hedgehog', 2, 2],
    ['sugar glider', 3, 2], ['dwarf hamster', 3, 1], ['Syrian hamster', 3, 1, P()], ['Roborovski hamster', 5, 3, P()], ['Campbell\'s hamster', 5, 3, P()], ['Dutch rabbit', 3, 1, P()], ['Angora rabbit', 3, 1, P()],
    ['Holland lop', 4, 2, P({ g: 'rabbit' })], ['Rex rabbit', 4, 2, P()], ['lop rabbit', 3, 1], ['fancy rat', 3, 1], ['fancy mouse', 4, 2], ['pygmy hedgehog', 4, 2], ['Netherland dwarf', 4, 2],
    ['Mongolian gerbil', 4, 2, P()], ['Himalayan rabbit', 4, 2, P()], ['bunny', 1, 2], ['pet mouse', 1, 1], ['pet rat', 1, 1], ['teddy bear hamster', 4, 2], ['pet rabbit', 1, 1],
    ['chipmunk', 2, 3], ['dormouse', 3, 3],
  ],

  pet_supplies: [
    ['leash', 1, 1, { g: 'lead' }], ['collar', 1, 1, { g: 'pet' }], ['harness', 2, 1, { g: 'pet' }], ['litter box', 1, 1], ['cat flap', 2, 1], ['dog bowl', 1, 1], ['food bowl', 1, 1], ['kibble', 2, 1],
    ['cat litter', 1, 1], ['scratching post', 2, 1], ['chew toy', 1, 1], ['squeaky toy', 1, 1], ['pet carrier', 2, 1], ['crate', 2, 2], ['dog bed', 1, 1], ['cage', 1, 2, { g: 'animal' }], ['hutch', 2, 2, { g: 'rabbit home' }],
    ['fish tank', 1, 2], ['aquarium', 2, 2], ['water bottle', 1, 3], ['hay', 1, 3], ['birdseed', 3, 2], ['cuttlebone', 4, 1], ['dog treat', 1, 1], ['catnip', 2, 1], ['flea collar', 2, 1],
    ['muzzle', 3, 1, { g: 'dog' }], ['ID tag', 2, 1], ['flea comb', 3, 1], ['grooming brush', 2, 1], ['dog coat', 1, 1], ['poop bag', 1, 1], ['pooper scooper', 3, 1], ['pet gate', 2, 1], ['cat tree', 2, 1],
    ['cat toy', 1, 1], ['hamster wheel', 1, 1], ['kennel', 2, 1], ['dog house', 1, 1], ['cat bed', 1, 1], ['feather wand', 3, 2], ['bird perch', 3, 2], ['heat lamp', 2, 3], ['bedding', 1, 3, { g: 'pet' }],
    ['pet food', 1, 1], ['clicker', 3, 2, { g: 'dog training' }], ['slow feeder', 4, 2], ['hay rack', 4, 2], ['sand bath', 5, 3],
  ],

  dog_commands: [
    ['sit', 1, 1, verb()], ['stay', 1, 1, verb()], ['heel', 2, 1, verb({ g: 'dog command' })], ['fetch', 1, 1, verb({ g: 'dog command' })], ['come', 1, 1, verb()],
    ['down', 1, 1, { g: 'dog command' }], ['roll over', 1, 1], ['shake', 1, 1, verb({ g: 'dog command' })], ['lie down', 1, 1], ['drop it', 2, 1], ['leave it', 2, 1], ['speak', 1, 1, verb({ g: 'dog command' })],
    ['beg', 1, 1, verb({ g: 'dog command' })], ['play dead', 2, 1], ['wait', 1, 2, verb({ g: 'dog command' })], ['quiet', 1, 2, { g: 'dog command' }], ['good boy', 1, 2], ['walkies', 3, 2, { reg: ['UK'] }],
    ['bring it', 2, 2], ['stand', 1, 2, verb({ g: 'dog command' })], ['spin', 2, 2, verb({ g: 'dog command' })], ['high five', 1, 3], ['give paw', 2, 2], ['release', 3, 3, verb({ g: 'dog command' })], ['settle', 3, 3, verb({ g: 'dog command' })],
    ['take it', 2, 2], ['bad dog', 1, 3], ['paw', 1, 2, verb({ g: 'dog command' })], ['off', 2, 3, { g: 'dog command' }], ['back', 1, 3, verb({ g: 'dog command' })],
    ['here', 1, 3, { g: 'dog command' }], ['no', 1, 3], ['mush', 3, 3, verb({ g: 'sled dog command' })], ['gee', 5, 4, verb({ g: 'sled dog command' })],
    ['haw', 5, 4, verb({ g: 'sled dog command' })], ['go find', 3, 3], ['crawl', 2, 3, verb({ g: 'dog command' })], ['sit up', 1, 2],
  ],

  cat_behaviors: [
    ['purring', 1, 1], ['kneading', 2, 1, { g: 'cat' }], ['hissing', 1, 1], ['meowing', 1, 1], ['scratching', 1, 2, { g: 'cat' }], ['grooming', 1, 2, { g: 'cat' }], ['pouncing', 3, 1], ['stalking', 2, 2, { g: 'cat' }],
    ['hunting', 1, 2, verb()], ['napping', 1, 2, { g: 'cat' }], ['head-butting', 3, 1], ['bunting', 4, 2, { g: 'cat' }], ['slow blinking', 3, 1], ['chattering', 3, 2, { g: 'cat' }], ['yowling', 3, 1],
    ['trilling', 4, 2, { g: 'cat' }], ['arching back', 2, 1], ['tail flicking', 3, 1], ['rubbing', 1, 2, { g: 'cat' }], ['spraying', 2, 2, { g: 'cat' }], ['marking', 2, 3, { g: 'cat' }], ['hairball', 3, 3, { g: 'cat' }],
    ['zoomies', 3, 2], ['loafing', 3, 1], ['making biscuits', 2, 1], ['sunbathing', 1, 3], ['bringing gifts', 3, 2], ['knocking things over', 2, 1], ['caterwauling', 4, 2], ['chirping', 1, 3, { g: 'cat' }],
    ['growling', 1, 2, { g: 'cat' }], ['flehmen response', 5, 3], ['sharpening claws', 3, 1], ['staring', 1, 3, { g: 'cat' }], ['hiding', 1, 3, { g: 'cat' }], ['lap sitting', 3, 2], ['allogrooming', 5, 4],
    ['ear flattening', 3, 2], ['belly exposure', 4, 2], ['cuddling', 1, 3, { g: 'cat' }],
  ],

  terriers: [
    ['Jack Russell terrier', 2, 1, P()], ['Yorkshire terrier', 2, 1, P({ al: [['Yorkie', 'short form', 2, 1]] })], ['Scottish terrier', 2, 1, P({ al: [['Scottie', 'short form', 3, 1]] })], ['West Highland terrier', 3, 1, P({ al: [['Westie', 'short form', 2, 1]] })],
    ['Airedale terrier', 3, 1, P()], ['bull terrier', 2, 1], ['Staffordshire', 3, 2, P({ g: 'bull terrier', al: [['Staffy', 'short form', 3, 2]] })], ['Border terrier', 3, 1, P()], ['Cairn terrier', 3, 1, P()],
    ['Norfolk terrier', 4, 1, P()], ['Norwich terrier', 4, 1, P()], ['Boston terrier', 3, 1, P()], ['fox terrier', 3, 1], ['Irish terrier', 4, 1, P()], ['Welsh terrier', 4, 1, P()], ['Lakeland terrier', 4, 1, P()],
    ['Kerry blue terrier', 4, 1, P()], ['Skye terrier', 4, 1, P()], ['Dandie Dinmont', 5, 2, P()], ['Bedlington terrier', 4, 1, P()], ['rat terrier', 4, 1], ['Patterdale terrier', 4, 1, P()], ['Parson Russell', 4, 2, P({ g: 'terrier' })],
    ['Manchester terrier', 4, 1, P()], ['wheaten terrier', 4, 1], ['miniature schnauzer', 3, 3], ['Sealyham terrier', 5, 2, P()], ['Cesky terrier', 5, 3, P()], ['Australian terrier', 4, 1, P()], ['Silky terrier', 4, 1, P()],
    ['pit bull terrier', 3, 2], ['terrier', 2, 2], ['toy fox terrier', 5, 2], ['Glen of Imaal', 5, 3, P({ g: 'terrier' })], ['Toto', 2, 4, P({ g: 'terrier', tm: true })],
  ],

  hounds: [
    ['beagle', 1, 1], ['basset hound', 2, 1], ['bloodhound', 2, 1], ['greyhound', 2, 1, { g: 'dog' }], ['whippet', 2, 1], ['dachshund', 2, 1], ['Afghan hound', 2, 1, P()], ['Irish wolfhound', 3, 1, P()], ['Scottish deerhound', 4, 1, P()],
    ['foxhound', 3, 1], ['harrier', 4, 2, { g: 'dog' }], ['borzoi', 3, 1], ['saluki', 4, 1], ['Rhodesian ridgeback', 3, 1, P()], ['coonhound', 4, 1], ['otterhound', 5, 2], ['basenji', 4, 1], ['Pharaoh hound', 4, 1, P()],
    ['Ibizan hound', 5, 2, P()], ['Norwegian elkhound', 4, 1, P()], ['Italian greyhound', 3, 1, P()], ['bluetick coonhound', 5, 2], ['redbone coonhound', 5, 2], ['Plott hound', 5, 3, P()], ['Sloughi', 5, 3, P()],
    ['Azawakh', 5, 3, P()], ['English foxhound', 4, 1, P()], ['American foxhound', 4, 1, P()], ['elkhound', 4, 2], ['lurcher', 4, 2], ['hound', 1, 2], ['sighthound', 4, 1], ['scent hound', 4, 1], ['staghound', 5, 2], ['deerhound', 4, 1],
    ['wolfhound', 3, 1], ['hunting dog', 1, 2],
  ],

  toy_dogs: [
    ['Chihuahua', 1, 1, { g: 'dog' }], ['Pomeranian', 2, 1], ['Pekingese', 3, 1], ['Shih Tzu', 2, 1], ['Maltese', 2, 1, { g: 'dog' }], ['Papillon', 3, 1, { g: 'dog' }], ['pug', 1, 1], ['toy poodle', 2, 1], ['miniature pinscher', 3, 1],
    ['King Charles spaniel', 3, 1, P()], ['Japanese Chin', 4, 1, P()], ['Chinese crested', 4, 1, P()], ['Havanese', 4, 1], ['Bichon Frise', 3, 1, P()], ['Brussels Griffon', 4, 1, P()], ['Italian greyhound', 3, 2, P()],
    ['Affenpinscher', 5, 2], ['Lowchen', 5, 3], ['Bolognese', 4, 2, { g: 'dog' }], ['Coton de Tulear', 5, 3, P()], ['Yorkshire terrier', 2, 2, P()], ['toy fox terrier', 5, 2], ['English toy spaniel', 5, 3, P()],
    ['Xoloitzcuintli', 5, 4], ['Yorkie', 2, 1, { g: 'dog' }], ['Chi', 3, 2, { g: 'dog' }], ['Pom', 3, 2, { g: 'dog' }], ['Peke', 3, 2, { g: 'dog' }], ['toy dog', 1, 1],
    ['teacup dog', 2, 2], ['lapdog', 2, 2], ['Prague Ratter', 5, 4, P()],
  ],

  herding_dogs: [
    ['Border collie', 1, 1], ['collie', 2, 1], ['rough collie', 3, 1], ['smooth collie', 4, 1], ['German shepherd', 1, 1], ['Australian shepherd', 3, 1, P()], ['Old English sheepdog', 3, 1, P()],
    ['Shetland sheepdog', 3, 1, P({ al: [['Sheltie', 'short form', 3, 1]] })], ['Welsh corgi', 2, 1, P()], ['Pembroke corgi', 3, 1, P()], ['Cardigan corgi', 4, 1, P()], ['Belgian Malinois', 3, 1, P()], ['Belgian Tervuren', 5, 2, P()],
    ['Briard', 5, 2], ['bearded collie', 3, 1], ['Australian cattle dog', 3, 1, P({ al: [['blue heeler', 'synonym', 3, 1, [], { type: 'common' }]] })], ['kelpie', 4, 1, { g: 'dog' }], ['Puli', 5, 2, P({ g: 'dog' })], ['Komondor', 5, 3],
    ['Bouvier des Flandres', 5, 2, P()], ['Pyrenean shepherd', 5, 2, P()], ['Catalan sheepdog', 5, 3, P()], ['Icelandic sheepdog', 5, 3, P()], ['Lancashire heeler', 5, 3, P()], ['Swedish vallhund', 5, 3, P()],
    ['Finnish Lapphund', 5, 3, P()], ['Mudi', 5, 4, P({ g: 'dog' })], ['Pumi', 5, 4, P({ g: 'dog' })], ['sheepdog', 2, 1], ['Dutch shepherd', 5, 2, P()], ['Beauceron', 5, 3], ['cattle dog', 3, 1], ['Lassie', 2, 3, P({ g: 'collie', tm: true })],
    ['corgi', 2, 1], ['Alsatian', 3, 2, { g: 'dog', reg: ['UK'] }],
  ],

  working_dogs: [
    ['Siberian husky', 2, 1, P()], ['Alaskan malamute', 3, 1, P()], ['Saint Bernard', 2, 1, P()], ['Great Dane', 2, 1], ['mastiff', 3, 1], ['bullmastiff', 4, 1], ['Newfoundland', 3, 1, { g: 'dog' }],
    ['Rottweiler', 2, 1], ['Doberman pinscher', 2, 1, P()], ['boxer', 2, 1, { g: 'dog' }], ['Great Pyrenees', 3, 1, P()], ['Bernese mountain dog', 3, 1, P()], ['Akita', 3, 1], ['Samoyed', 3, 1],
    ['giant schnauzer', 4, 1], ['Portuguese water dog', 4, 1, P()], ['Leonberger', 5, 2], ['Cane Corso', 4, 2, P()], ['Dogue de Bordeaux', 4, 2, P()],
    ['Tibetan mastiff', 4, 2, P()], ['Kuvasz', 5, 3], ['Anatolian shepherd', 5, 2, P()], ['Neapolitan mastiff', 4, 2, P()], ['Black Russian terrier', 5, 3, P()], ['Alaskan husky', 4, 2, P()], ['Greenland dog', 5, 3, P()],
    ['Canadian Eskimo dog', 5, 3, P()], ['Chinook', 5, 3, { g: 'dog' }], ['Boerboel', 5, 3], ['husky', 1, 1, { g: 'dog' }], ['malamute', 3, 1], ['sled dog', 2, 1], ['guard dog', 1, 2], ['rescue dog', 1, 3],
    ['Dobermann', 3, 1, P({ reg: ['UK'] })], ['Swiss mountain dog', 4, 2, P()], ['Hovawart', 5, 4],
  ],
};

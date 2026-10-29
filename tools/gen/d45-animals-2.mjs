// Generated word data: animals chunk 2 (deeper themes: dog breeds, regional animals, penguins, dinosaurs).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.

export const THEMES = {
  sporting_dogs: { d: 3 }, african_birds: { d: 3 }, madagascar_animals: { d: 4 }, indian_animals: { d: 2 }, himalayan_animals: { d: 4 },
  japanese_animals: { d: 4 }, southeast_asian_animals: { d: 4 }, australian_birds: { d: 2 }, new_zealand_animals: { d: 3 }, penguins: { d: 2 },
  amazon_animals: { d: 2 }, andean_animals: { d: 4 }, galapagos_animals: { d: 4 }, north_american_birds: { d: 2 }, everglades_animals: { d: 5 },
  british_wildlife: { d: 2 }, alpine_animals: { d: 4 }, meat_eating_dinosaurs: { d: 1 }, plant_eating_dinosaurs: { d: 2 },
};

export const FIXES = [
  { gloss: ['nutcracker', 'kitchen_utensils', 'tool'] },
  { gloss: ['setter', 'volleyball_terms', 'volleyball'] },
  { gloss: ['Brittany', 'french_regions', 'region'] },
  { split: ['weaver', 'blank_bird', 'bird'] },
  { gloss: ['weaver', 'medieval_jobs', 'person'] },
  { split: ['bobcat', 'north_american_animals', 'cat'] },
  { split: ['bobcat', 'small_wild_cats', 'cat'] },
  { merge: ['bobcat', ['small_wild_cats', 'north_american_animals'], 'cat'] },
  { gloss: ['bobcat', 'special_vehicles', 'vehicle'] },
];

export const DATA = {
  sporting_dogs: [
    ['Labrador retriever', 1, 1, { al: [['Lab', 'synonym', 1, 2]] }], ['Labrador', 1, 1],
    ['golden retriever', 1, 1, { al: [['golden', 'synonym', 2, 3, [], { g: 'dog' }]] }],
    ['cocker spaniel', 1, 1, { al: [['cocker', 'synonym', 3, 3]] }],
    ['springer spaniel', 2, 2, {}],
    ['Irish setter', 2, 2], ['English setter', 2, 2], ['Gordon setter', 3, 3], ['setter', 2, 2, { g: 'dog' }],
    ['pointer', 2, 2, { g: 'dog' }], ['English pointer', 3, 3],
    
    ['Weimaraner', 2, 2], ['vizsla', 3, 3], ['Brittany', 3, 3, { g: 'dog' }],
    ['flat-coated retriever', 3, 3], ['curly-coated retriever', 4, 4], ['Chesapeake retriever', 4, 4],
    ['Clumber spaniel', 4, 4], ['Sussex spaniel', 4, 4], ['field spaniel', 4, 4], ['Welsh springer spaniel', 4, 4],
    ['Irish water spaniel', 4, 4], ['American water spaniel', 5, 5], ['spinone', 5, 5], ['Munsterlander', 5, 5], ['wirehaired griffon', 5, 5],
    ['retriever', 1, 1], ['spaniel', 1, 1],
  ],

  african_birds: [
    ['ostrich', 1, 1], ['flamingo', 1, 2], ['secretary bird', 2, 2], ['hornbill', 2, 2], ['African grey parrot', 2, 2],
    ['guinea fowl', 2, 2, { al: [['guineafowl', 'spelling', 3, 3]] }], ['marabou stork', 3, 3], ['shoebill', 3, 3], ['crowned crane', 3, 3],
    ['weaver', 3, 3, { g: 'bird' }], ['lovebird', 3, 3], ['sunbird', 3, 3], ['bee-eater', 3, 3], ['oxpecker', 3, 3],
    ['lilac-breasted roller', 3, 3], ['fish eagle', 3, 3], ['African fish eagle', 3, 3], ['sacred ibis', 3, 3], ['hamerkop', 4, 4],
    ['turaco', 4, 4], ['go-away bird', 4, 4], ['Kori bustard', 4, 4], ['ground hornbill', 4, 4], ['mousebird', 4, 4],
    ['widowbird', 5, 5], ['hoopoe', 3, 4], ['saddle-billed stork', 5, 5], ['quelea', 5, 5],
    ['pel\'s fishing owl', 5, 5],
  ],

  madagascar_animals: [
    ['lemur', 1, 1], ['ring-tailed lemur', 2, 1, { al: [['ringtail lemur', 'synonym', 4, 3]] }], ['aye-aye', 3, 2], ['chameleon', 1, 2], ['panther chameleon', 3, 3],
    ['fossa', 3, 2], ['tenrec', 3, 3], ['indri', 4, 3], ['sifaka', 3, 3], ['mouse lemur', 3, 3], ['ruffed lemur', 4, 3], ['bamboo lemur', 4, 4],
    ['sportive lemur', 5, 4], ['tomato frog', 4, 3], ['mantella', 5, 4], ['leaf-tailed gecko', 4, 4], ['radiated tortoise', 4, 4],
    ['ploughshare tortoise', 5, 5], ['giraffe weevil', 5, 5], ['vanga', 5, 5], ['elephant bird', 3, 3],
    ['Madagascar fish eagle', 5, 5], ['fat-tailed dwarf lemur', 5, 5], ['brookesia', 5, 5], ['Malagasy giant rat', 5, 5], ['comet moth', 5, 5],
    ['Madagascan sunset moth', 5, 5], ['Madagascar day gecko', 5, 5], ['Verreaux\'s sifaka', 5, 5], ['hissing cockroach', 2, 3],
  ],

  indian_animals: [
    ['Bengal tiger', 1, 1], ['Asian elephant', 2, 2], ['Indian elephant', 2, 2], ['Indian rhinoceros', 3, 3], ['Asiatic lion', 3, 3], ['sloth bear', 3, 3],
    ['king cobra', 2, 2], ['Indian cobra', 3, 2], ['Indian python', 3, 3], ['Indian peafowl', 3, 2], ['peacock', 1, 2], ['rhesus macaque', 3, 3],
    ['langur', 3, 3], ['mongoose', 2, 3], ['water buffalo', 2, 3], ['nilgai', 4, 4], ['sambar', 4, 4], ['chital', 4, 4], ['blackbuck', 4, 4],
    ['gaur', 4, 4], ['gharial', 4, 4], ['dhole', 5, 5], ['Indian pangolin', 4, 4], ['bonnet macaque', 5, 5], ['great Indian bustard', 5, 5],
    ['Indian star tortoise', 5, 5], ['mugger crocodile', 5, 5], ['lion-tailed macaque', 5, 5], ['krait', 4, 4], ['Ganges river dolphin', 4, 4],
    ['leopard', 1, 2], ['hanuman langur', 5, 5], ['Indian wolf', 5, 5], ['Indian giant squirrel', 5, 5], ['hornbill', 2, 3],
  ],

  himalayan_animals: [
    ['snow leopard', 2, 1], ['yak', 2, 1], ['red panda', 2, 2], ['Himalayan tahr', 4, 4], ['blue sheep', 4, 4, { al: [['bharal', 'synonym', 5, 5]] }],
    ['Himalayan black bear', 4, 3], ['Himalayan brown bear', 4, 4], ['musk deer', 4, 4], ['markhor', 4, 4], ['Tibetan antelope', 4, 4], ['chiru', 5, 5],
    ['Himalayan monal', 4, 4], ['snowcock', 5, 5], ['pika', 4, 4], ['Himalayan marmot', 4, 4], ['takin', 5, 5], ['Tibetan wolf', 4, 4], ['argali', 5, 5],
    ['lammergeier', 4, 4], ['Himalayan griffon', 5, 5], ['Tibetan fox', 5, 5], ['kiang', 5, 5], ['wild yak', 4, 3], ['Himalayan serow', 5, 5],
    ['Tibetan mastiff', 3, 3, { g: 'dog' }], ['lynx', 3, 4, { g: 'cat' }], ['golden eagle', 2, 4], ['Himalayan newt', 5, 5], ['Himalayan wolf', 5, 5],
    ['snow pheasant', 5, 5], ['Pallas\'s cat', 5, 5], ['Asiatic black bear', 4, 4], ['Tibetan snowfinch', 5, 5],
  ],

  japanese_animals: [
    ['Japanese macaque', 2, 1, { al: [['snow monkey', 'synonym', 2, 1]] }], ['red-crowned crane', 3, 2, { al: [['Japanese crane', 'synonym', 3, 2]] }], ['tanuki', 3, 2, { g: 'raccoon dog' }], ['raccoon dog', 3, 3],
    ['Japanese serow', 4, 3], ['sika deer', 3, 3], ['giant salamander', 3, 3], ['Japanese spider crab', 3, 3],
    ['koi', 2, 2], ['Akita', 2, 2], ['Shiba Inu', 3, 2], ['Japanese crested ibis', 5, 4], ['Japanese bush warbler', 5, 5],
    ['copper pheasant', 5, 5], ['green pheasant', 4, 4], ['Hokkaido brown bear', 4, 3], ['Iriomote cat', 5, 4], ['Japanese squirrel', 4, 3],
    ['Japanese marten', 5, 5], ['Japanese badger', 5, 4], ['Japanese giant hornet', 4, 3],
    ['Japanese weasel', 5, 5], ['Japanese hare', 5, 4], ['Japanese dormouse', 5, 5], ['Japanese wolf', 4, 3], ['Japanese white-eye', 5, 5],
    ['Japanese quail', 4, 4], ['Japanese sparrow', 4, 4], ['Japanese sea lion', 5, 4], ['Japanese pond turtle', 5, 5], ['Okinawa rail', 5, 5],
    ['Tosa', 4, 4, { g: 'dog' }], ['Kai Ken', 5, 5], ['Japanese bobtail', 4, 3, { g: 'cat' }], ['Japanese chin', 4, 4],
  ],

  southeast_asian_animals: [
    ['orangutan', 2, 1], ['Sumatran tiger', 3, 2], ['Malayan tiger', 4, 3], ['Komodo dragon', 2, 2], ['proboscis monkey', 3, 2], ['tarsier', 4, 3],
    ['slow loris', 4, 3], ['gibbon', 3, 2], ['binturong', 5, 4], ['sun bear', 4, 3], ['clouded leopard', 4, 3], ['Javan rhinoceros', 4, 4],
    ['Sumatran rhinoceros', 4, 4], ['king cobra', 2, 3], ['reticulated python', 3, 3], ['flying lemur', 4, 4], ['Malayan tapir', 4, 3], ['rhinoceros hornbill', 4, 4],
    ['saltwater crocodile', 3, 3], ['babirusa', 5, 5], ['anoa', 5, 5], ['flying fox', 3, 3, { g: 'bat' }], ['Philippine eagle', 4, 3], ['Bornean orangutan', 4, 3],
    ['siamang', 5, 4], ['tamaraw', 5, 5], ['mouse-deer', 4, 4], ['Asian water monitor', 5, 5], ['flying dragon', 4, 4],
    ['Asian elephant', 2, 3], ['pangolin', 3, 4], ['gaur', 4, 4], ['Sunda pangolin', 5, 5], ['white-handed gibbon', 5, 5], ['pig-tailed macaque', 5, 5],
  ],

  australian_birds: [
    ['emu', 1, 1], ['kookaburra', 1, 1, { al: [['laughing kookaburra', 'synonym', 3, 2]] }], ['cockatoo', 1, 1], ['galah', 2, 1, { g: 'bird', reg: ['AU', 'NZ'] }], ['budgerigar', 1, 1], ['budgie', 1, 1],
    ['lyrebird', 2, 2], ['cassowary', 2, 2], ['rainbow lorikeet', 2, 2], ['black swan', 1, 2], ['wedge-tailed eagle', 3, 3], ['bowerbird', 3, 2],
    ['fairy-wren', 3, 3], ['tawny frogmouth', 3, 3], ['brolga', 3, 3], ['corella', 3, 3], ['rosella', 3, 3], ['crimson rosella', 3, 3],
    ['noisy miner', 4, 3], ['currawong', 4, 3], ['malleefowl', 5, 4], ['plains-wanderer', 5, 5], ['apostlebird', 5, 5], ['butcherbird', 4, 4],
    ['pardalote', 5, 5], ['honeyeater', 4, 3], ['willie wagtail', 4, 3], ['brush turkey', 4, 3], ['cockatiel', 1, 2], ['zebra finch', 2, 3],
    ['Australian magpie', 3, 2], ['bin chicken', 3, 3, { reg: ['AU'], type: 'common', note: 'slang for the ibis' }],
    ['mudlark', 4, 4, { g: 'bird' }], ['frogmouth', 4, 4], ['jabiru', 5, 4], ['ibis', 3, 3, { g: 'bird' }], ['spinifex pigeon', 5, 5], ['bush stone-curlew', 5, 5],
  ],

  new_zealand_animals: [
    ['kiwi', 1, 1, { g: 'bird' }], ['kakapo', 3, 2], ['kea', 3, 2], ['tuatara', 3, 2], ['weta', 3, 3], ['takahe', 3, 3], ['tui', 3, 3], ['fantail', 3, 3, { g: 'bird' }],
    ['piwakawaka', 5, 4], ['morepork', 4, 3], ['ruru', 5, 4], ['moa', 3, 2], ['kakariki', 5, 4], ['pukeko', 3, 3], ['huia', 4, 3],
    ['yellow-eyed penguin', 3, 3, { al: [['hoiho', 'synonym', 5, 4]] }], ['Hector\'s dolphin', 3, 3], ['New Zealand fur seal', 4, 3], ['New Zealand sea lion', 4, 3],
    ['glowworm', 2, 3], ['kokako', 5, 4], ['bellbird', 4, 4], ['saddleback', 5, 4], ['giant weta', 4, 3], ['kereru', 4, 4], ['Maui dolphin', 4, 3],
    ['paua', 4, 4], ['hihi', 5, 5], ['stitchbird', 5, 5], ['weka', 4, 3], ['little blue penguin', 3, 3],
    ['katipo', 5, 5], ['New Zealand falcon', 5, 4], ['karearea', 5, 5], ['kaka', 4, 4, { g: 'parrot' }], ['southern right whale', 4, 4],
  ],

  penguins: [
    ['emperor penguin', 1, 1, { al: [['emperor', 'synonym', 3, 3, [], { g: 'penguin' }]] }], ['king penguin', 2, 1], ['Adelie penguin', 3, 2], ['chinstrap penguin', 2, 2, { al: [['chinstrap', 'synonym', 3, 3]] }],
    ['gentoo penguin', 2, 2, { al: [['gentoo', 'synonym', 3, 3]] }], ['macaroni penguin', 2, 2], ['rockhopper penguin', 2, 2, { al: [['rockhopper', 'synonym', 3, 3]] }], ['little penguin', 3, 3],
    ['fairy penguin', 3, 3], ['blue penguin', 3, 3], ['African penguin', 2, 2, { al: [['jackass penguin', 'synonym', 4, 3], ['Cape penguin', 'synonym', 4, 3]] }], ['Humboldt penguin', 3, 3],
    ['Magellanic penguin', 3, 3], ['Galapagos penguin', 3, 3], ['yellow-eyed penguin', 3, 3], ['royal penguin', 4, 4], ['Fiordland penguin', 4, 4],
    ['erect-crested penguin', 5, 5], ['Snares penguin', 5, 5], ['Antarctic penguin', 2, 2],
    ['crested penguin', 4, 4], ['banded penguin', 4, 4],
  ],

  amazon_animals: [
    ['jaguar', 1, 1, { g: 'animal' }], ['anaconda', 1, 1], ['piranha', 1, 1], ['capybara', 2, 2], ['sloth', 1, 1, { g: 'animal' }], ['toucan', 1, 1], ['scarlet macaw', 2, 2],
    ['poison dart frog', 2, 1], ['harpy eagle', 3, 2], ['pink river dolphin', 3, 2], ['boto', 4, 3, { g: 'dolphin' }], ['howler monkey', 2, 2], ['spider monkey', 2, 2],
    ['squirrel monkey', 2, 2], ['capuchin', 3, 3], ['marmoset', 3, 3], ['tamarin', 4, 4], ['black caiman', 3, 3], ['caiman', 3, 3], ['arapaima', 4, 3],
    ['electric eel', 2, 2], ['giant otter', 3, 3], ['ocelot', 3, 3], ['giant anteater', 2, 3], ['goliath birdeater', 4, 3], ['leafcutter ant', 3, 3],
    ['bullet ant', 3, 3], ['hoatzin', 5, 4], ['kinkajou', 4, 4], ['agouti', 4, 4], ['tapir', 3, 3], ['tamandua', 4, 4], ['vampire bat', 2, 3],
    ['morpho butterfly', 3, 3], ['glass frog', 4, 4], ['bushmaster', 4, 4], ['boa constrictor', 2, 2], ['emerald tree boa', 4, 4], ['three-toed sloth', 3, 3],
    ['paca', 5, 5], ['jaguarundi', 5, 5], ['uakari', 5, 5], ['red-bellied piranha', 4, 3], ['green anaconda', 2, 2], ['Amazon parrot', 3, 3],
  ],

  andean_animals: [
    ['llama', 1, 1], ['alpaca', 1, 1], ['vicuna', 3, 2, { g: 'animal' }], ['guanaco', 3, 3], ['Andean condor', 2, 2], ['spectacled bear', 3, 3], ['chinchilla', 2, 3],
    ['viscacha', 4, 4], ['mountain viscacha', 5, 5], ['puma', 2, 3], ['mountain tapir', 4, 4], ['Andean flamingo', 4, 4], ['cock-of-the-rock', 4, 4],
    ['Andean cat', 5, 5], ['pudu', 4, 4], ['huemul', 5, 5], ['Andean fox', 4, 4], ['culpeo', 5, 5], ['Titicaca water frog', 5, 4],
    ['Titicaca grebe', 5, 5], ['Andean goose', 5, 5], ['Andean hillstar', 5, 5], ['torrent duck', 4, 4], ['taruca', 5, 5], ['guinea pig', 1, 3],
    ['cuy', 4, 4], ['Andean hairy armadillo', 5, 5], ['rhea', 3, 3, { g: 'bird' }], ['Darwin\'s rhea', 5, 5], ['Andean mountain cat', 5, 5], ['hummingbird', 1, 3],
    ['Peruvian hairless dog', 4, 4], ['Andean tinamou', 5, 5],
  ],

  galapagos_animals: [
    ['Galapagos tortoise', 2, 1, ], ['giant tortoise', 2, 2], ['marine iguana', 3, 2], ['land iguana', 3, 3], ['blue-footed booby', 2, 1], ['Nazca booby', 5, 4],
    ['red-footed booby', 4, 3], ['flightless cormorant', 4, 3], ['Galapagos penguin', 3, 2], ['Galapagos sea lion', 3, 3], ['Galapagos fur seal', 4, 4],
    ['Darwin\'s finch', 3, 2], ['Galapagos mockingbird', 4, 4], ['waved albatross', 4, 4], ['frigatebird', 3, 3], ['great frigatebird', 4, 4],
    ['Sally Lightfoot crab', 3, 3], ['lava lizard', 4, 4], ['lava gull', 5, 5], ['Galapagos hawk', 4, 4], ['Lonesome George', 3, 3, { type: 'proper', g: 'tortoise' }],
    ['swallow-tailed gull', 5, 4], ['Galapagos shark', 4, 4], ['Galapagos dove', 5, 5], ['vermilion flycatcher', 4, 5], ['Galapagos racer', 5, 5],
    ['Galapagos petrel', 5, 5], ['Galapagos rail', 5, 5], ['Galapagos flamingo', 4, 4], ['hammerhead shark', 2, 4], ['marine turtle', 3, 4],
    ['Pinta Island tortoise', 5, 4], 
  ],

  north_american_birds: [
    ['bald eagle', 1, 1], ['wild turkey', 1, 2], ['American robin', 2, 1], ['blue jay', 1, 1], ['northern cardinal', 2, 2, ], ['cardinal', 1, 1, { g: 'bird' }],
    ['chickadee', 2, 2], ['mockingbird', 2, 2], ['whooping crane', 3, 3], ['sandhill crane', 3, 3], ['roadrunner', 2, 2], ['common loon', 3, 3, ], ['loon', 2, 2, { g: 'bird' }],
    ['California condor', 3, 3], ['turkey vulture', 3, 3], ['red-tailed hawk', 3, 3], ['osprey', 3, 3], ['great horned owl', 3, 3], ['snowy owl', 2, 3],
    ['Canada goose', 1, 2], ['mallard', 2, 2, { g: 'duck' }], ['bobolink', 4, 4], ['Baltimore oriole', 3, 3], ['oriole', 3, 3], ['meadowlark', 3, 3], ['killdeer', 4, 4],
    ['red-winged blackbird', 3, 3], ['American goldfinch', 3, 3], ['belted kingfisher', 4, 4], ['pileated woodpecker', 3, 3],
    ['wood thrush', 4, 4], ['nuthatch', 3, 3], ['junco', 4, 4], ['towhee', 5, 5], ['bluebird', 2, 2], ['scarlet tanager', 4, 4], ['cedar waxwing', 4, 4],
    ['brown thrasher', 5, 5], ['sandpiper', 3, 3], ['Atlantic puffin', 3, 3], ['grackle', 4, 4], ['mourning dove', 3, 3], ['nighthawk', 4, 4],
    ['Carolina wren', 4, 4], ['sapsucker', 4, 4], ['phalarope', 5, 5], ['bufflehead', 5, 5], ['cowbird', 4, 4],
  ],

  everglades_animals: [
    ['American alligator', 2, 1, ], ['gator', 2, 2, { g: 'animal' }], ['American crocodile', 3, 2], ['Florida panther', 3, 2], ['manatee', 2, 2], ['roseate spoonbill', 3, 3],
    ['wood stork', 4, 4], ['great blue heron', 2, 3], ['anhinga', 4, 3], ['snail kite', 5, 4], ['osprey', 3, 4], ['bald eagle', 1, 3],
    ['river otter', 2, 3], ['bobcat', 2, 3, { g: 'cat' }], ['Florida black bear', 4, 4], ['cottonmouth', 3, 3], ['Burmese python', 3, 2], ['eastern diamondback', 3, 4],
    ['indigo snake', 4, 4], ['green tree frog', 3, 4], ['apple snail', 4, 4], ['alligator gar', 4, 4], ['largemouth bass', 3, 4], ['limpkin', 5, 4],
    ['purple gallinule', 5, 5], ['white ibis', 4, 4], ['great egret', 3, 4], ['softshell turtle', 4, 4], ['marsh rabbit', 5, 5], ['green anole', 4, 4],
    ['brown anole', 5, 5], ['bottlenose dolphin', 2, 4], ['swallow-tailed kite', 5, 5], ['key deer', 4, 4], ['sawfish', 4, 4],
    ['snook', 5, 5], ['mosquito', 1, 3], ['pig frog', 5, 5],
  ],

  british_wildlife: [
    ['red fox', 1, 1], ['badger', 1, 1, { g: 'animal' }], ['hedgehog', 1, 1], ['red squirrel', 1, 1], ['grey squirrel', 2, 2],
    ['otter', 2, 2], ['red deer', 2, 2], ['roe deer', 3, 3], ['fallow deer', 3, 3], ['muntjac', 4, 3], ['mole', 2, 2, { g: 'animal' }], ['stoat', 3, 3],
    ['weasel', 2, 2], ['pine marten', 3, 3], ['polecat', 3, 3], ['water vole', 3, 3], ['dormouse', 3, 3], ['harvest mouse', 3, 3], ['brown hare', 3, 3],
    ['wildcat', 2, 3], ['adder', 2, 2, { g: 'animal' }], ['grass snake', 2, 2], ['slow worm', 3, 3], ['common lizard', 3, 3], ['natterjack toad', 4, 4],
    ['great crested newt', 4, 4], ['kingfisher', 2, 2], ['robin', 1, 1], ['blackbird', 1, 1], ['wren', 2, 2, { g: 'bird' }], ['barn owl', 2, 2], ['tawny owl', 3, 3],
    ['red kite', 3, 3], ['puffin', 1, 3], ['golden eagle', 2, 3], ['capercaillie', 4, 4], ['ptarmigan', 4, 4], ['grey seal', 3, 3], ['harbour porpoise', 4, 4],
    ['red grouse', 3, 3], ['hen harrier', 4, 4], ['nightingale', 2, 3], ['skylark', 2, 3], ['curlew', 3, 3], ['lapwing', 3, 3], ['avocet', 4, 4],
    ['pipistrelle', 4, 4], ['noctule', 5, 5], ['yellowhammer', 4, 4], ['dunnock', 4, 4], ['chaffinch', 3, 3], ['goldcrest', 4, 4],
  ],

  alpine_animals: [
    ['ibex', 3, 2], ['Alpine ibex', 4, 3], ['chamois', 3, 2, { g: 'animal' }], ['marmot', 3, 2], ['Alpine marmot', 4, 3], ['golden eagle', 2, 3], ['bearded vulture', 3, 3], ['lammergeier', 4, 4],
    ['Alpine chough', 4, 3], ['ptarmigan', 4, 3], ['snow vole', 5, 5], ['mountain hare', 3, 3], ['lynx', 3, 3, { g: 'cat' }], ['brown bear', 1, 3], ['wolf', 1, 3],
    ['Alpine salamander', 4, 4], ['Apollo butterfly', 5, 4], ['snowfinch', 5, 5], ['wallcreeper', 5, 5], ['black grouse', 4, 4],
    ['capercaillie', 4, 4], ['ermine', 3, 3, { g: 'animal' }], ['Alpine accentor', 5, 5], ['Alpine swift', 5, 5], ['Saint Bernard', 2, 2],
    ['mouflon', 4, 4], ['red deer', 2, 3], ['roe deer', 3, 3], ['ring ouzel', 5, 5], ['nutcracker', 3, 4, { g: 'bird' }], ['Alpine shrew', 5, 5],
    ['stoat', 3, 4], ['mountain goat', 2, 3], ['Alpine newt', 4, 4],
  ],

  meat_eating_dinosaurs: [
    ['Tyrannosaurus', 1, 1], ['Tyrannosaurus rex', 1, 1], ['T. rex', 1, 1], ['Velociraptor', 1, 1], ['raptor', 2, 2, { g: 'dinosaur' }],
    ['Allosaurus', 2, 2], ['Spinosaurus', 2, 2], ['Giganotosaurus', 3, 3], ['Carnotaurus', 3, 3], ['Utahraptor', 3, 3], ['Deinonychus', 3, 3], ['Megalosaurus', 3, 3],
    ['Dilophosaurus', 3, 3], ['Baryonyx', 3, 3], ['Compsognathus', 3, 3], ['Coelophysis', 4, 4], ['Ceratosaurus', 4, 4], ['Albertosaurus', 4, 4],
    ['Gorgosaurus', 5, 5], ['Oviraptor', 3, 3], ['Troodon', 4, 4], ['Herrerasaurus', 5, 5], ['Acrocanthosaurus', 5, 5], ['Carcharodontosaurus', 5, 5],
    ['Microraptor', 4, 4], ['Yutyrannus', 5, 5], ['Tarbosaurus', 5, 5], ['Majungasaurus', 5, 5], ['Suchomimus', 5, 5], ['Irritator', 5, 5], ['Eoraptor', 5, 5],
    ['Gallimimus', 3, 4], ['Tyrannosaur', 3, 3], ['theropod', 4, 4], ['Dromaeosaurus', 5, 5], ['Cryolophosaurus', 5, 5],
  ],

  plant_eating_dinosaurs: [
    ['Triceratops', 1, 1], ['Stegosaurus', 1, 1], ['Brachiosaurus', 1, 1], ['Diplodocus', 1, 1], ['Apatosaurus', 2, 2], ['Brontosaurus', 1, 1],
    ['Iguanodon', 2, 2], ['Ankylosaurus', 2, 2], ['Parasaurolophus', 3, 2], ['Pachycephalosaurus', 3, 3], ['Edmontosaurus', 4, 4], ['Hadrosaurus', 4, 4],
    ['Maiasaura', 4, 4], ['Protoceratops', 3, 3], ['Styracosaurus', 3, 3], ['Argentinosaurus', 3, 3], ['Titanosaurus', 4, 4], ['Camarasaurus', 4, 4],
    ['Kentrosaurus', 4, 4], ['Psittacosaurus', 4, 4], ['Corythosaurus', 4, 4], ['Lambeosaurus', 5, 5], ['Euoplocephalus', 5, 5], ['Nodosaurus', 5, 5],
    ['Plateosaurus', 4, 4], ['Pentaceratops', 4, 4], ['Torosaurus', 4, 4], ['Centrosaurus', 4, 4], ['Hypsilophodon', 5, 5], ['Tenontosaurus', 5, 5],
    ['Amargasaurus', 5, 5], ['Saltasaurus', 5, 5], ['Therizinosaurus', 4, 4], ['Muttaburrasaurus', 5, 5], ['sauropod', 3, 3],
  ],
};

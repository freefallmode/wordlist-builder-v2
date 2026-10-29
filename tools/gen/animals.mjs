// Generated word data: Animals and the playable themes directly under it (mammals ... prehistoric life).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const verb = (o = {}) => ({ pos: 'verb', ...o });
const A = (o = {}) => ({ g: 'animal', ...o });
const P = (o = {}) => ({ type: 'proper', ...o });

export const THEMES = {
  mammals: { d: 1 }, birds: { d: 1 }, reptiles_and_amphibians: { d: 2 }, fish: { d: 1 }, sea_life: { d: 2 }, insects_and_bugs: { d: 1 },
  domestic_animals: { d: 1 }, horses: { d: 2 }, prehistoric_life: { d: 2 },
};

export const DATA = {
  // ---------------------------------------------------------------- mammals
  mammals: [
    ['elephant', 1, 1], ['giraffe', 1, 1], ['zebra', 1, 1], ['monkey', 1, 1], ['gorilla', 1, 1], ['kangaroo', 1, 1, { al: [['roo', 'synonym', 3, 3, ['AU', 'NZ']]] }],
    ['hippopotamus', 1, 1, { al: [['hippo', 'synonym', 1, 1]] }], ['rhinoceros', 2, 2, { al: [['rhino', 'synonym', 1, 1]] }],
    ['squirrel', 1, 1], ['mouse', 1, 2, A()], ['rat', 1, 2, A()], ['bat', 1, 2, A()], ['bear', 1, 1, A()], ['wolf', 1, 1], ['fox', 1, 1], ['deer', 1, 1],
    ['koala', 1, 1, { al: [['koala bear', 'synonym', 2, 2]] }], ['panda', 1, 1, { al: [['giant panda', 'synonym', 2, 2]] }], ['camel', 1, 1], ['hedgehog', 1, 1],
    ['chimpanzee', 1, 1, { al: [['chimp', 'synonym', 1, 1]] }], ['bison', 2, 2, { al: [['buffalo', 'synonym', 2, 3, ['US', 'CA'], { g: 'bison' }]] }],
    ['moose', 2, 2], ['otter', 2, 2], ['beaver', 2, 2], ['raccoon', 2, 2, { al: [['racoon', 'spelling', 3, 3, ['UK']]] }], ['skunk', 2, 2],
    ['badger', 2, 2, A()], ['porcupine', 2, 2], ['armadillo', 2, 2], ['sloth', 2, 2, A()], ['anteater', 2, 2], ['platypus', 2, 2], 
    ['cheetah', 2, 2], ['hyena', 2, 2], ['meerkat', 2, 2], ['lemur', 2, 2], ['orangutan', 2, 2], ['baboon', 2, 2], ['antelope', 2, 2], ['wombat', 2, 3],
    ['walrus', 2, 3], ['seal', 2, 3, A()], ['mole', 2, 2, A()], 
    ['wildebeest', 3, 3, { al: [['gnu', 'synonym', 4, 4]] }], ['mongoose', 3, 3], ['jackal', 3, 3], ['aardvark', 3, 3], ['pangolin', 3, 3], ['okapi', 3, 3],
    ['tapir', 3, 3], ['capybara', 3, 3], ['lynx', 3, 3], ['gibbon', 3, 3], ['manatee', 3, 3], 
    ['chinchilla', 3, 3], ['ferret', 3, 3], ['stoat', 3, 3, { reg: ['UK', 'IE'] }], ['wolverine', 3, 3], ['opossum', 3, 3, { al: [['possum', 'synonym', 3, 3, ['US']]] }],
    ['groundhog', 3, 3, { al: [['woodchuck', 'synonym', 4, 4, ['US', 'CA']]] }], 
    ['quokka', 4, 4], ['numbat', 4, 4], ['tarsier', 4, 4], ['hyrax', 4, 4], ['bandicoot', 4, 4], ['dugong', 4, 4],
    ['coati', 4, 4], ['civet', 4, 4], ['echidna', 4, 4], ['pronghorn', 4, 4], 
    ['aye-aye', 5, 5], ['kudu', 4, 4], 
    
  ],

  // ---------------------------------------------------------------- birds
  birds: [
    ['eagle', 1, 1], ['owl', 1, 1], ['penguin', 1, 1], ['parrot', 1, 1], ['duck', 1, 2], ['swan', 1, 1], ['goose', 1, 2], ['chicken', 1, 3],
    ['turkey', 1, 2, { g: 'bird' }], ['robin', 1, 1], ['sparrow', 1, 1], ['crow', 1, 1, { g: 'bird' }], ['pigeon', 1, 1], ['seagull', 1, 1, { al: [['gull', 'synonym', 2, 2]] }],
    ['ostrich', 1, 1], ['flamingo', 1, 1], ['peacock', 1, 1], ['hummingbird', 1, 1], ['woodpecker', 1, 1], ['pelican', 1, 1], ['toucan', 1, 1],
    ['hawk', 2, 1], ['falcon', 2, 1], ['vulture', 2, 1], ['raven', 2, 1], ['dove', 2, 1], ['stork', 2, 2], ['heron', 2, 2], ['kingfisher', 2, 2],
    ['cuckoo', 2, 2], ['magpie', 2, 2], ['starling', 2, 2], ['blackbird', 2, 2], ['finch', 2, 2], ['canary', 2, 3], ['budgie', 2, 3], ['emu', 2, 2],
    ['kiwi', 2, 3, { g: 'bird' }], ['albatross', 2, 2], ['puffin', 2, 2], ['cormorant', 3, 2], ['crane', 2, 3, { g: 'bird' }], ['swift', 3, 3, { g: 'bird' }],
    ['swallow', 2, 3, { g: 'bird' }], ['nightingale', 2, 2], ['osprey', 3, 3], ['condor', 2, 2], ['quail', 3, 2], ['pheasant', 2, 2], ['partridge', 3, 3],
    ['thrush', 3, 3], ['jay', 3, 3, { g: 'bird' }], ['jackdaw', 3, 3, { reg: ['UK', 'IE'] }], ['lark', 3, 3, { g: 'bird' }],
    ['kookaburra', 3, 3], ['cockatoo', 2, 2], ['spoonbill', 3, 3], ['ibis', 3, 3], ['kite', 3, 4, { g: 'bird' }],
    ['cassowary', 3, 3], ['hornbill', 3, 3], ['lapwing', 4, 4, { al: [['peewit', 'synonym', 5, 5, ['UK']], ['green plover', 'synonym', 5, 5, ['UK']]] }],
    ['curlew', 4, 4], ['plover', 4, 4], ['snipe', 4, 4], ['avocet', 4, 4], ['oystercatcher', 4, 4], ['tern', 4, 4], ['gannet', 4, 4], 
    ['nightjar', 4, 4], 
    ['dunnock', 4, 4, { reg: ['UK'] }], 
    ['bittern', 4, 4], ['merlin', 4, 4, { g: 'bird' }],
    ['kestrel', 3, 3], 
  ],

  // ---------------------------------------------------------------- reptiles and amphibians
  reptiles_and_amphibians: [
    ['snake', 1, 1, { al: [['serpent', 'synonym', 2, 2]] }], ['lizard', 1, 1], ['crocodile', 1, 1, { al: [['croc', 'synonym', 2, 2]] }],
    ['alligator', 1, 1, { al: [['gator', 'synonym', 2, 2, ['US']]] }], ['turtle', 1, 1], ['tortoise', 1, 1], ['frog', 1, 1], ['toad', 1, 1],
    ['salamander', 2, 2], ['newt', 2, 2, { al: [['eft', 'synonym', 5, 5]] }], ['gecko', 2, 2], ['iguana', 2, 2], ['chameleon', 2, 2],
    ['Komodo dragon', 2, 2, P({ al: [['Komodo monitor', 'synonym', 5, 5]] })], ['python', 2, 2, A()], ['cobra', 2, 2], ['viper', 3, 2, A()],
    ['rattlesnake', 2, 2, { al: [['rattler', 'synonym', 3, 3, ['US']]] }], ['boa constrictor', 2, 2, { al: [['boa', 'synonym', 3, 3, [], { g: 'snake' }]] }],
    ['anaconda', 2, 2], ['adder', 3, 2, A()], ['tadpole', 2, 2, { al: [['polliwog', 'synonym', 5, 5, ['US']], ['pollywog', 'spelling', 5, 5, ['US']]] }],
    ['bullfrog', 2, 2], ['tree frog', 2, 2], ['cane toad', 3, 3], ['dart frog', 3, 3], ['axolotl', 3, 3], ['mamba', 3, 3, { g: 'snake' }],
    ['skink', 4, 3], ['monitor lizard', 3, 3], ['gila monster', 3, 3], ['bearded dragon', 3, 3, { al: [['beardie', 4, 4, []]].map(([t, r, i]) => [t, 'synonym', r, i]) }],
    ['tuatara', 4, 4, { reg: ['NZ'] }], ['caiman', 3, 3], ['gharial', 4, 4], ['terrapin', 3, 3, { al: [] }], ['slow worm', 4, 4, { reg: ['UK', 'IE'], al: [['blindworm', 'synonym', 5, 5, ['UK']]] }],
    ['anole', 4, 4], ['horned lizard', 4, 4], ['basilisk', 4, 4, A()], ['bullsnake', 5, 5], ['hellbender', 5, 5], ['mudpuppy', 5, 5], ['olm', 5, 5],
    ['caecilian', 5, 5], ['coral snake', 4, 4], ['garter snake', 3, 3], ['copperhead', 3, 3, A()], ['sidewinder', 3, 3, A()], ['taipan', 4, 4], ['king cobra', 3, 3],
    ['boomslang', 5, 5], ['thorny devil', 4, 4], ['frilled lizard', 4, 4], ['marine iguana', 4, 4], ['snapping turtle', 3, 3], ['leatherback', 4, 4, { g: 'turtle' }],
    ['glass frog', 4, 4], ['natterjack', 5, 5, { reg: ['UK'] }], ['spadefoot', 5, 5], ['green anole', 5, 5], ['fire salamander', 4, 4], ['giant salamander', 4, 4],
    ['blue-tongued skink', 4, 4], ['horned toad', 4, 4], ['smooth newt', 5, 5], ['crested newt', 5, 5, { reg: ['UK'] }], ['Gaboon viper', 5, 5, P()],
  ],

  // ---------------------------------------------------------------- fish
  fish: [
    ['goldfish', 1, 1], ['salmon', 1, 1], ['trout', 2, 1], ['tuna', 1, 1], ['cod', 1, 1], ['shark', 1, 2], ['swordfish', 2, 1], ['piranha', 2, 1],
    ['clownfish', 1, 1], ['angelfish', 2, 1], ['seahorse', 2, 3, { al: [['sea horse', 'spelling', 2, 3]] }], ['catfish', 2, 1], ['eel', 2, 2], ['herring', 2, 1],
    ['sardine', 2, 1], ['mackerel', 3, 1], ['haddock', 3, 1], ['halibut', 3, 1], ['plaice', 3, 1, { reg: ['UK', 'IE'] }], ['carp', 2, 1], ['pike', 3, 1, { g: 'fish' }],
    ['perch', 3, 1, { g: 'fish' }], ['bass', 2, 1, { g: 'fish' }], ['sole', 3, 1, { g: 'fish' }], ['flounder', 3, 1, { g: 'fish' }], ['marlin', 3, 1],
    ['barracuda', 3, 2], ['pufferfish', 2, 2, { al: [['blowfish', 'synonym', 3, 3], ['fugu', 'synonym', 5, 5], ['globefish', 'synonym', 5, 5]] }],
    ['stingray', 2, 3, { al: [['ray', 'synonym', 2, 3, [], { g: 'fish' }]] }], ['guppy', 2, 1], ['minnow', 3, 1], ['koi', 2, 1], ['sturgeon', 3, 2],
    ['bream', 4, 2, { reg: ['UK', 'AU'] }], ['roach', 3, 3, { g: 'fish' }], ['tench', 4, 3, { reg: ['UK'] }], ['chub', 4, 4], ['dace', 4, 4], ['grayling', 4, 4],
    ['char', 4, 4, { g: 'fish', al: [['charr', 'spelling', 5, 5]] }], ['whitebait', 3, 3], ['anchovy', 2, 2], ['snapper', 3, 3, { g: 'fish' }], ['grouper', 3, 3],
    ['mahi-mahi', 3, 3, { al: [['dolphinfish', 'synonym', 4, 4], ['dorado', 'synonym', 5, 5]] }], ['wahoo', 4, 4, { g: 'fish' }], ['tarpon', 4, 4], ['bonito', 4, 4],
    ['pollock', 3, 3, { al: [['pollack', 'spelling', 4, 4]] }], ['hake', 4, 4], ['coley', 4, 4, { reg: ['UK'], al: [['saithe', 'synonym', 5, 5, ['UK']]] }],
    ['gar', 4, 4, { g: 'fish' }], ['bowfin', 5, 5], ['lungfish', 4, 4], ['coelacanth', 4, 4], ['oarfish', 4, 4], ['sunfish', 4, 4], ['lamprey', 4, 4],
    ['archerfish', 4, 4], ['wrasse', 5, 4], ['remora', 4, 4], ['hagfish', 5, 5], ['stickleback', 4, 4], 
    ['zander', 4, 4, { al: [['pikeperch', 'synonym', 5, 5], ['walleye', 'synonym', 4, 4, ['US', 'CA']]] }], 
    ['barramundi', 4, 4, { reg: ['AU'] }], ['John Dory', 5, 5, P()], ['turbot', 4, 4], ['dab', 4, 4, { g: 'fish' }], 
    ['tetra', 4, 3], ['betta', 4, 3], ['tilapia', 3, 3], ['rainbow trout', 3, 3],
    
  ],

  // ---------------------------------------------------------------- sea life
  sea_life: [
    ['whale', 1, 1], ['dolphin', 1, 1], ['shark', 1, 1], ['octopus', 1, 1], ['squid', 2, 1], ['jellyfish', 1, 1], ['starfish', 1, 1, { al: [['sea star', 'synonym', 3, 3]] }],
    ['crab', 1, 1], ['lobster', 1, 1], ['shrimp', 1, 2], ['oyster', 2, 2], ['clam', 2, 2], ['mussel', 2, 2], ['coral', 2, 1], ['seaweed', 1, 2, { al: [['sea grass', 'synonym', 3, 3]] }],
    ['kelp', 3, 2], ['seahorse', 2, 2], ['sea urchin', 3, 2], ['sea turtle', 2, 1], ['seal', 2, 1, { g: 'animal' }], ['sea lion', 2, 1], ['walrus', 2, 2], ['manatee', 3, 2],
    ['barnacle', 3, 2], ['sea anemone', 3, 2, { al: [['anemone', 'synonym', 3, 3, [], { g: 'sea creature' }]] }], ['sponge', 2, 3, { g: 'sea creature' }], ['nautilus', 3, 3],
    ['cuttlefish', 3, 3], ['krill', 3, 3], ['plankton', 3, 3], ['narwhal', 3, 2], ['orca', 2, 1, { al: [['killer whale', 'synonym', 1, 1]] }], ['blue whale', 1, 1],
    ['humpback whale', 2, 1], ['sperm whale', 2, 2], ['beluga', 3, 2, { g: 'whale' }], ['porpoise', 3, 2], ['hermit crab', 2, 2], ['scallop', 2, 3], ['abalone', 4, 3],
    ['limpet', 3, 3], ['sea slug', 3, 3, { al: [['nudibranch', 'synonym', 5, 5]] }], ['sea cucumber', 3, 3], ['brittle star', 4, 4], ['man-of-war', 4, 4],
    ['giant squid', 3, 2], ['anglerfish', 3, 3], ['clownfish', 1, 2], ['moray eel', 3, 3], ['lionfish', 3, 3], ['sea otter', 2, 2], ['dugong', 4, 3], ['conch', 3, 3],
    ['cowrie', 4, 4], ['whelk', 4, 4], ['sand dollar', 4, 4], ['sea fan', 4, 4], ['giant clam', 4, 4], ['sea snake', 3, 3],
    ['stingray', 2, 2], ['manta ray', 3, 2], ['great white', 1, 1, { g: 'shark' }], ['hammerhead', 2, 2, { g: 'shark' }], ['mantis shrimp', 4, 4], ['sea squirt', 5, 5],
    ['copepod', 5, 5], ['coralline algae', 5, 5], ['sea pen', 5, 5], ['tube worm', 5, 5], ['zooplankton', 5, 4], ['seagrass', 4, 4], ['bladderwrack', 5, 5],
  ],

  // ---------------------------------------------------------------- insects and bugs
  insects_and_bugs: [
    ['ant', 1, 1], ['bee', 1, 1], ['wasp', 1, 1], ['fly', 1, 1, { g: 'insect' }], ['mosquito', 1, 1, { al: [['mozzie', 'synonym', 3, 3, ['AU', 'NZ']], ['skeeter', 'synonym', 3, 3, ['US']]] }],
    ['butterfly', 1, 1], ['moth', 1, 1], ['beetle', 1, 1], ['ladybug', 1, 1, { al: [['ladybird', 'synonym', 2, 2, ['UK', 'AU', 'IE']], ['lady beetle', 'synonym', 4, 4]] }],
    ['grasshopper', 1, 1], ['cricket', 1, 2, { g: 'insect' }], ['cockroach', 1, 1, { al: [['roach', 'synonym', 2, 2, ['US'], { g: 'insect' }]] }], ['dragonfly', 1, 1],
    ['firefly', 1, 1, { al: [['lightning bug', 'synonym', 2, 2, ['US']]] }], ['caterpillar', 1, 1], ['spider', 1, 1], ['scorpion', 1, 2], ['centipede', 2, 2],
    ['millipede', 2, 2], ['earthworm', 1, 2], ['snail', 1, 2], ['slug', 1, 2, { g: 'animal' }], ['flea', 1, 1], ['tick', 2, 2, { g: 'bug' }], ['louse', 2, 2],
    ['aphid', 3, 2, { al: [['greenfly', 'synonym', 3, 3, ['UK']], ['blackfly', 'synonym', 4, 4, ['UK']]] }], ['cicada', 3, 2], ['termite', 2, 2],
    ['earwig', 3, 2], ['praying mantis', 2, 2, { al: [['mantis', 'synonym', 3, 3]] }], ['stick insect', 2, 2, { al: [['walking stick', 'synonym', 3, 3, ['US'], { g: 'insect' }]] }],
    ['hornet', 2, 2], ['bumblebee', 1, 1], ['honeybee', 2, 2], ['locust', 2, 2], ['crane fly', 3, 3, { al: [['daddy longlegs', 'synonym', 3, 3, ['UK', 'IE'], { g: 'crane fly' }]] }],
    ['mayfly', 3, 3], ['lacewing', 4, 4], ['weevil', 3, 3], ['stag beetle', 3, 3], ['dung beetle', 3, 3], ['scarab', 3, 3, { g: 'beetle' }], ['silverfish', 3, 3],
    ['bedbug', 2, 2], ['horsefly', 3, 3, { al: [['cleg', 'synonym', 5, 5, ['UK']], ['gadfly', 'synonym', 4, 4]] }], ['gnat', 3, 3], ['midge', 3, 3],
    ['tarantula', 2, 2], ['black widow', 2, 2, { g: 'spider' }], ['katydid', 4, 4, { reg: ['US'], al: [['bush cricket', 'synonym', 4, 4, ['UK']]] }], ['leafhopper', 4, 4],
    ['thrips', 5, 5], ['whitefly', 4, 4], ['sawfly', 5, 5], ['yellowjacket', 3, 3, { reg: ['US', 'CA'] }], ['botfly', 5, 5], ['tsetse fly', 4, 4], ['fire ant', 3, 3],
    ['army ant', 4, 3], ['leafcutter ant', 4, 4], ['glowworm', 3, 3], ['woodlouse', 3, 3, { reg: ['UK', 'IE'], al: [['pill bug', 'synonym', 3, 3, ['US']], ['roly-poly', 'synonym', 3, 3, ['US']], ['slater', 'synonym', 5, 5, ['AU', 'NZ']]] }],
    ['planthopper', 5, 5], ['water boatman', 4, 4], ['pond skater', 3, 3], ['shield bug', 4, 4, { reg: ['UK'], al: [['stink bug', 'synonym', 3, 3, ['US']]] }],
    ['lantern fly', 4, 4], ['harlequin ladybird', 5, 5, { reg: ['UK'] }], ['click beetle', 5, 5], ['cockchafer', 5, 5, { reg: ['UK'], al: [['maybug', 'synonym', 5, 5, ['UK']]] }],
    ['assassin bug', 5, 5], ['mealworm', 3, 3], ['hoverfly', 4, 4], ['robber fly', 5, 5], ['antlion', 5, 5],
  ],

  // ---------------------------------------------------------------- domestic animals
  domestic_animals: [
    ['dog', 1, 1, { al: [['hound', 'synonym', 2, 2], ['pooch', 'synonym', 2, 2], ['mutt', 'synonym', 2, 2], ['doggo', 'synonym', 3, 3]] }],
    ['cat', 1, 1, { al: [['moggy', 'synonym', 3, 3, ['UK', 'IE']], ['kitty', 'synonym', 1, 1]] }], ['cow', 1, 1], ['pig', 1, 1, { al: [['swine', 'synonym', 3, 3], ['hog', 'synonym', 2, 2, ['US']]] }],
    ['sheep', 1, 1], ['goat', 1, 1], ['horse', 1, 1, { al: [['steed', 'synonym', 3, 3], ['nag', 'synonym', 3, 3], ['gee-gee', 'synonym', 4, 4, ['UK']]] }],
    ['chicken', 1, 1], ['duck', 1, 1], ['goose', 1, 2], ['turkey', 1, 2, { g: 'bird' }], ['rabbit', 1, 1, { al: [['bunny', 'synonym', 1, 1]] }],
    ['hamster', 1, 1], ['guinea pig', 1, 1, { al: [['cavy', 'synonym', 4, 4]] }], ['gerbil', 2, 1], ['budgie', 2, 1, { al: [['budgerigar', 'synonym', 3, 3]] }],
    ['canary', 2, 2], ['goldfish', 1, 1], ['donkey', 1, 2, { al: [['ass', 'synonym', 2, 2, [], { g: 'donkey' }]] }], ['mule', 2, 2], ['llama', 2, 2], ['alpaca', 2, 2],
    ['ox', 2, 3], ['bull', 1, 2], ['hen', 1, 2], ['rooster', 1, 2, { al: [['cockerel', 'synonym', 3, 3, ['UK']]] }], ['pony', 1, 2], ['ferret', 3, 3],
    ['parrot', 1, 2], ['cockatiel', 3, 2], ['chinchilla', 3, 3], ['tortoise', 2, 3], ['yak', 3, 4], ['water buffalo', 3, 3], ['camel', 2, 4], ['guinea fowl', 3, 3],
    ['peafowl', 4, 4], ['sow', 3, 3, A({ g: 'pig' })], ['boar', 3, 4, { g: 'pig' }], ['ewe', 3, 3], ['ram', 2, 3, A()], ['heifer', 3, 3], ['steer', 3, 3, { g: 'cattle' }],
    ['stallion', 2, 3], ['mare', 3, 3, { g: 'horse' }], ['gelding', 4, 4], ['wether', 5, 5], ['capon', 4, 4], ['hinny', 5, 5], ['dromedary', 4, 4], ['zebu', 4, 4],
    ['reindeer', 2, 4], ['pigeon', 1, 3], ['rat', 1, 3, A()], ['mouse', 1, 3, A()], ['lovebird', 2, 2], ['bantam', 4, 4], ['sheepdog', 2, 2], ['cattle', 1, 1], ['livestock', 2, 1],
    ['nanny goat', 3, 3], ['billy goat', 3, 3], ['piglet', 1, 2], ['drake', 3, 3, { g: 'duck' }], ['gander', 3, 3], ['tom', 3, 3, { g: 'cat' }],
    ['muscovy duck', 4, 4], ['Angora rabbit', 4, 4, P()], ['Angora goat', 4, 4, P()], ['carthorse', 3, 3],
  ],

  // ---------------------------------------------------------------- horses
  horses: [
    ['horse', 1, 1], ['pony', 1, 1], ['stallion', 2, 1], ['mare', 3, 1, { g: 'horse' }], ['foal', 2, 1], ['colt', 3, 2, { g: 'horse' }], ['filly', 3, 2], ['gelding', 4, 2],
    ['yearling', 3, 3, { g: 'horse' }], ['thoroughbred', 3, 2], ['saddle', 1, 1], ['bridle', 2, 1], ['reins', 2, 1], ['stirrup', 2, 1], ['horseshoe', 1, 1],
    ['gallop', 1, 1, verb()], ['canter', 2, 1, verb()], ['trot', 2, 1, verb()], ['neigh', 1, 1, verb()], ['whinny', 2, 1, verb()], ['mane', 1, 1, { g: 'horse' }],
    ['hoof', 1, 1], ['jockey', 1, 2], ['rider', 1, 2, { g: 'horse' }], ['farrier', 3, 3], ['stable', 1, 1, { g: 'horse' }], ['paddock', 2, 2], ['stud', 3, 4, { g: 'horse' }],
    ['dressage', 3, 2], ['show jumping', 2, 2], ['steeplechase', 3, 3], ['horse race', 1, 2], ['derby', 3, 4, { g: 'horse race' }], ['rodeo', 2, 3], ['equestrian', 3, 2],
    ['Arabian', 3, 2, P({ g: 'horse' })], ['Clydesdale', 3, 2, P()], ['Shetland pony', 2, 2, P()], ['Appaloosa', 3, 2, P()], ['Lipizzaner', 4, 3, P()],
    ['Percheron', 4, 3, P()], ['Shire horse', 3, 2], ['Friesian', 4, 3, P()], ['Hanoverian', 5, 4, P()], ['Andalusian', 4, 3, P(), ], ['Akhal-Teke', 5, 4, P()],
    ['Suffolk Punch', 5, 4, P()], ['Camargue', 5, 4, P({ g: 'horse' })],
    ['Przewalski horse', 5, 4, P()], ['quarter horse', 3, 2], ['mustang', 2, 2, { g: 'horse' }], ['bronco', 3, 3], ['zebra', 1, 4], ['donkey', 1, 4], ['mule', 2, 3],
    ['wild ass', 4, 4], ['halter', 3, 3, { g: 'horse' }], ['bit', 3, 3, { g: 'horse tack' }], ['girth', 4, 3, { g: 'horse' }],
    ['horsebox', 3, 3, { reg: ['UK'], al: [['horse trailer', 'synonym', 2, 2, ['US']]] }],
    ['bareback', 3, 3, { pos: 'adverb' }], ['sidesaddle', 4, 3, { pos: 'adverb' }], ['piebald', 4, 3], ['skewbald', 5, 4, { reg: ['UK'] }],
    ['dapple grey', 4, 3, { reg: ['UK'] }], ['palomino', 3, 2], ['pinto', 3, 2, { g: 'horse' }], ['cob', 4, 3, { g: 'horse' }], ['nag', 3, 3], ['steed', 3, 3],
    ['racehorse', 1, 1], 
  ],

  // ---------------------------------------------------------------- prehistoric life
  prehistoric_life: [
    ['dinosaur', 1, 1], ['Tyrannosaurus', 1, 1, P({ al: [['T. rex', 'synonym', 1, 1], ['Tyrannosaurus rex', 'synonym', 1, 1]] })], ['Triceratops', 1, 1, P()],
    ['Stegosaurus', 1, 1, P()], ['Velociraptor', 2, 1, P()], ['Brontosaurus', 2, 1, P()], ['Diplodocus', 2, 2, P()], ['Brachiosaurus', 2, 2, P()],
    ['Pterodactyl', 2, 1, P()], ['mammoth', 1, 1, { al: [['woolly mammoth', 'synonym', 1, 1]] }], ['mastodon', 3, 2], ['saber-toothed cat', 2, 2, { al: [['Smilodon', 'synonym', 4, 4, []]] }],
    ['fossil', 1, 2], ['trilobite', 3, 2], ['ammonite', 3, 2], ['Allosaurus', 3, 3, P()], ['Ankylosaurus', 3, 3, P()], ['Spinosaurus', 3, 3, P()],
    ['Pteranodon', 3, 3, P()], ['Archaeopteryx', 3, 3, P()], ['Iguanodon', 3, 3, P()], ['megalodon', 3, 2], ['Plesiosaur', 3, 3, P()], ['Ichthyosaur', 4, 3, P()],
    ['Parasaurolophus', 3, 3, P()], ['Pachycephalosaurus', 4, 3, P()], ['Gallimimus', 4, 3, P()], ['Dilophosaurus', 4, 3, P()], ['Compsognathus', 4, 4, P()],
    ['Carnotaurus', 4, 4, P()], ['Giganotosaurus', 4, 4, P()], ['Utahraptor', 4, 4, P()], ['Dimetrodon', 4, 3, P()],
    ['Megatherium', 5, 4, P()], ['Deinonychus', 4, 3, P()], ['Argentinosaurus', 4, 4, P()], ['Quetzalcoatlus', 4, 4, P()],
    ['Dunkleosteus', 5, 4, P()], ['Anomalocaris', 5, 4, P()], ['Hallucigenia', 5, 4, P()], ['Elasmosaurus', 5, 4, P()],
    ['Titanoboa', 5, 4, P()], ['Liopleurodon', 5, 4, P()], ['Therizinosaurus', 5, 4, P()],
    ['dire wolf', 3, 3, {}], ['giant sloth', 3, 2], ['woolly rhinoceros', 4, 3], ['aurochs', 4, 3], ['great auk', 4, 3],
    ['moa', 4, 3], ['dodo', 2, 3], ['thylacine', 4, 4], ['Mesozoic', 3, 2, P()], ['Paleozoic', 4, 3, P()], ['Cenozoic', 4, 3, P()], ['Jurassic', 2, 2, P()],
    ['Cretaceous', 3, 2, P()], ['Triassic', 3, 3, P()], ['Ice Age', 2, 2, P({ tm: true })], ['extinction', 2, 3], ['amber', 2, 4], ['paleontologist', 3, 2],
    ['megafauna', 4, 3], ['Neanderthal', 3, 4, P()], ['Cambrian', 4, 4, P()], ['Pangaea', 3, 3, P()], 
    ['fossil record', 4, 3], ['pterosaur', 3, 2], ['mosasaur', 3, 3], ['sauropod', 4, 3], ['theropod', 4, 3], ['herbivore', 2, 4], ['carnivore', 2, 4],
  ],
};

export const ALIASES = [];

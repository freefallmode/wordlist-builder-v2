// Top-up batch 5: thin themes and themes lacking hard/easy words.
const v = (o = {}) => ({ pos: 'verb', ...o });
export const DATA = {
  animal_adjectives: [
    ['psittacine', 5, 4], ['phocine', 5, 4], ['ophidian', 4, 4], ['saurian', 4, 4], ['batrachian', 5, 5], ['musteline', 5, 5], ['accipitrine', 5, 5], ['lutrine', 5, 5], ['hirundine', 5, 5], ['colubrine', 5, 5], ['passerine', 4, 4],
  ],
  animal_experts: [
    ['cynologist', 5, 4], ['hippologist', 5, 5], ['ophiologist', 5, 5], ['nematologist', 5, 5], ['acarologist', 5, 5], ['helminthologist', 5, 5], ['coleopterist', 5, 5], ['dipterist', 5, 5], ['mahout', 3, 4],
  ],
  animal_diets: [
    ['sanguivore', 5, 5], ['xylophage', 5, 5], ['mycophage', 5, 5], ['oophage', 5, 5], ['durophage', 5, 5], ['bacterivore', 5, 5], ['necrophage', 5, 5], ['gummivore', 5, 5],
  ],
  hybrid_animals: [
    ['coydog', 4, 3], ['zony', 5, 4], ['zebrule', 5, 4], ['pumapard', 5, 5], ['jaglion', 5, 5], ['kunga', 5, 5], ['schnoodle', 4, 2], ['cavachon', 4, 2], ['yorkipoo', 5, 3],
  ],
  african_trees: [
    ['tamarind', 2, 3], ['African mahogany', 4, 3], ['African tulip tree', 4, 3], ['date palm', 3, 2], ['leadwood', 5, 5], ['jackalberry', 5, 5], ['msasa', 5, 5],
  ],
  australian_trees: [
    ['golden wattle', 3, 2], ['coolabah', 4, 2], ['ironbark', 4, 3], ['stringybark', 5, 4], ['kurrajong', 5, 5], ['bloodwood', 4, 4], ['mallee', 4, 4],
  ],
  mediterranean_trees: [
    ['pine', 1, 1, { g: 'tree' }], ['oak', 1, 2], ['date palm', 3, 2], ['tamarisk', 4, 4], ['lentisk', 5, 5],
  ],
  foraging_finds: [
    ['alexanders', 5, 5], ['pignut', 5, 5], ['fat hen', 5, 4], ['chicken of the woods', 4, 4], ['hen of the woods', 4, 4], ['dulse', 4, 4], ['laver', 4, 4, { g: 'seaweed' }], ['bladderwrack', 4, 4], ['sea beet', 5, 5], ['jelly ear', 5, 5], ['porcini', 3, 3],
  ],
  flowers_with_animal_names: [
    ["adder's tongue", 5, 4], ["cat's ear", 5, 4], ["bird's foot trefoil", 4, 4], ['oxeye daisy', 3, 3], ['lizard orchid', 5, 5], ['frog orchid', 5, 5], ['monkey orchid', 5, 5], ["pheasant's eye", 5, 5], ["leopard's bane", 5, 5], ['cockscomb', 4, 3], ['hawkweed', 4, 4], ['cuckoo pint', 4, 4], ['bee balm', 4, 3],
  ],
  houseplants: [
    ['pilea', 4, 4], ['peperomia', 5, 4], ['fittonia', 5, 5], ['haworthia', 5, 4], ['aglaonema', 5, 5], ['ctenanthe', 5, 5], ['aspidistra', 4, 4], ['schefflera', 4, 4], ['echeveria', 4, 4], ['kalanchoe', 4, 4],
  ],
  water_plants: [
    ['bladderwort', 5, 4], ['arrowhead', 3, 4], ['water crowfoot', 5, 4], ['vallisneria', 5, 5], ['cabomba', 5, 5], ['flowering rush', 5, 4], ['water soldier', 5, 5], ['hydrilla', 5, 5], ['spatterdock', 5, 5],
  ],
  plant_parts: [
    ['petiole', 4, 4], ['carpel', 4, 4], ['bract', 4, 4], ['meristem', 5, 4], ['mesophyll', 5, 5], ['lenticel', 5, 5], ['pedicel', 5, 5], ['receptacle', 3, 4], ['cuticle', 3, 4, { g: 'plant' }], ['tepal', 5, 5], ['stipule', 5, 5],
  ],
  grasses_and_reeds: [
    ['cocksfoot', 5, 4], ['phragmites', 5, 5], ['quaking grass', 4, 3], ['Yorkshire fog', 5, 5], ['canary grass', 4, 4], ['lyme grass', 5, 5], ['tussock grass', 4, 3], ['buffalo grass', 3, 3],
  ],
  weeds: [
    ['fat hen', 5, 4], ['scarlet pimpernel', 4, 4], ['sow thistle', 4, 4], ['fumitory', 5, 5], ['charlock', 5, 5], ['fleabane', 4, 4], ['pineappleweed', 5, 5], ['spurge', 4, 4],
  ],
  christmas_plants: [
    ["butcher's broom", 4, 5], ['Jerusalem cherry', 5, 5], ['noble fir', 4, 4], ['Fraser fir', 4, 4], ['Douglas fir', 3, 3], ['Scots pine', 3, 4], ['kalanchoe', 4, 5],
  ],
  desert_plants: [
    ['jojoba', 4, 4], ['ephedra', 5, 5], ['organ pipe cactus', 4, 3], ['quiver tree', 5, 5], ['saltbush', 4, 4], ['boojum tree', 5, 5], ['candelilla', 5, 5], ['bursage', 5, 5],
  ],
  thorny_plants: [
    ['buckthorn', 4, 4], ['sea holly', 4, 4], ['caltrop', 5, 5], ["devil's club", 5, 5], ['osage orange', 5, 5], ['prickly ash', 5, 5], ['Spanish bayonet', 5, 5], ['globe thistle', 4, 4],
  ],
  seeds_and_pips: [
    ['testa', 5, 5], ['radicle', 5, 5], ['plumule', 5, 5], ['seed coat', 4, 4],
  ],
  garden_tools: [
    ['billhook', 4, 4], ['mattock', 4, 4], ['hori hori', 5, 5], ['Dutch hoe', 4, 4], ['scythe', 3, 3], ['sickle', 3, 3], ['turf cutter', 4, 4],
  ],
  garden_features: [
    ['grotto', 4, 4], ['belvedere', 5, 5], ['rill', 5, 5], ['pleached hedge', 5, 5], ['stepping stones', 2, 2], ['water feature', 2, 1], ['orangery', 4, 4],
  ],
  garden_pests: [
    ['flea beetle', 4, 4], ['carrot fly', 3, 3], ['cabbage root fly', 4, 4], ['pea moth', 4, 4], ['leafminer', 5, 4], ['capsid', 5, 5], ['rosemary beetle', 4, 4], ['chafer grub', 5, 4], ['box tree moth', 3, 3], ['pigeon', 1, 2], ['deer', 1, 2],
  ],
  garden_furniture: [
    ['glider', 4, 4, { g: 'seat' }], ['chiminea', 4, 4], ['Lutyens bench', 5, 5], ['tree seat', 5, 5], ['love seat', 3, 3], ['egg chair', 3, 3], ['hanging chair', 3, 2], ['wicker chair', 2, 2], ['patio set', 2, 1], ['daybed', 3, 3], ['steamer chair', 5, 5],
  ],
  garden_birds: [
    ['siskin', 4, 4], ['redpoll', 5, 5], ['brambling', 5, 4], ['linnet', 4, 4], ['treecreeper', 4, 4], ['fieldfare', 4, 4], ['redwing', 4, 4], ['waxwing', 4, 4], ['sparrowhawk', 4, 4], ['mistle thrush', 4, 4], ['jackdaw', 3, 3], ['junco', 4, 4], ['titmouse', 4, 3], ['towhee', 5, 5], ['yellowhammer', 4, 4], ['pied wagtail', 3, 3],
  ],
  gardening_verbs: [
    ['earth up', 5, 4, v()], ['chit', 5, 5, v()], ['pot on', 5, 4, v()], ['bed out', 5, 4, v()], ['disbud', 5, 5, v()], ['pollard', 5, 5, v()], ['pleach', 5, 5, v()], ['tie in', 4, 3, v()], ['espalier', 5, 5, v()],
  ],
  garden_styles: [
    ['Mughal garden', 4, 4], ['Persian garden', 4, 4], ['karesansui', 5, 5], ['stroll garden', 5, 5], ['physic garden', 5, 4], ['cloister garden', 4, 4], ['forest garden', 4, 4], ['chahar bagh', 5, 5], ['kitchen garden', 3, 2], ['Mediterranean garden', 3, 2], ['sensory garden', 3, 3], ['Dutch garden', 3, 3], ['Victorian garden', 3, 3], ['rain garden', 3, 3],
  ],
};

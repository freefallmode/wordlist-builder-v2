// Depth 4+ themes of history_myth, chunk 3: undead, giants, labors of Hercules, Arthurian and Robin Hood legend, yokai, revolutions, royal houses, Wild West. Format: tools/apply-words.mjs.
const P = (o = {}) => ({ type: 'person', ...o });
const N = (o = {}) => ({ type: 'proper', ...o });
const L = (o = {}) => ({ type: 'place', ...o });
const T = (o = {}) => ({ type: 'title', ...o });
const US = ['US'];

export const THEMES = {
  undead: { d: 2 },
  giants_of_legend: { d: 3 },
  labors_of_hercules: { d: 3, complete: true, note: 'the twelve labors, exactly' },
  arthurian_legend: { d: 3 },
  robin_hood_legend: { d: 2 },
  yokai: { d: 5 },
  french_revolution: { d: 3 },
  american_revolution: { d: 2 },
  royal_houses: { d: 4 },
  wild_west_legends: { d: 3 },
  cowboy_gear: { d: 1 },
  wild_west_town: { d: 2 },
};

export const FIXES = [
  { gloss: ['wight', 'rhymes_with_light', 'person'] }, { gloss: ['boardwalk', 'trail_words', 'walkway'] }, { gloss: ['Black Bart', 'pirates', 'pirate'] },
  { gloss: ['Kay', 'sounds_like_a_letter', 'letter sound'] }, { gloss: ['Orleans', 'places_after_new', 'city'] },
];

export const DATA = {
  undead: [
    ['zombie', 1, 1, { g: 'undead' }], ['vampire', 1, 1], ['mummy', 1, 2, { g: 'monster' }], ['ghost', 1, 3], ['skeleton', 1, 3, { g: 'undead' }],
    ['ghoul', 2, 2], ['wraith', 3, 3], ['revenant', 3, 2], ['lich', 3, 2], ['Dracula', 1, 2, N({ g: 'character' })],
    ['Nosferatu', 3, 2, N({ tm: true })], ['draugr', 4, 2], ['wight', 4, 3, { g: 'undead' }], ['strigoi', 5, 3], ['jiangshi', 5, 3, N({ g: 'hopping vampire' })],
    ['vrykolakas', 5, 4], ['death knight', 3, 3, { tm: true }], ['living dead', 2, 2, { type: 'phrase' }], ['walker', 3, 4, { g: 'zombie', tm: true }], ['bloodsucker', 2, 3],
    ['reanimated corpse', 3, 2, { type: 'phrase' }], ['flesh eater', 3, 3], ['skeleton warrior', 3, 3], ['ghast', 5, 4],
    ['aswang', 5, 4], ['upir', 5, 4], ['haugbui', 5, 5], ['dhampir', 5, 4], ['Count Dracula', 1, 2, N()],
  ],
  giants_of_legend: [
    ['Goliath', 1, 1, N({ g: 'biblical giant' })], ['Cyclops', 2, 2], ['Paul Bunyan', 2, 2], ['Polyphemus', 3, 2, P({ type: 'proper' })], ['Ymir', 4, 3, N({ g: 'frost giant' })],
    ['Gargantua', 3, 3, N({ g: 'giant' })], ['Antaeus', 4, 3, N({ g: 'giant' })], ['Orion', 3, 4, { g: 'hunter' }], ['Typhon', 4, 3, N({ g: 'monster giant' })],
    ['Finn McCool', 3, 2, N({ al: [['Fionn mac Cumhaill', 'synonym', 5, 3, [], N()]] })], ['Benandonner', 5, 3, N()], ['Cormoran', 5, 3, N({ g: 'Cornish giant' })],
    ['Blunderbore', 5, 3, N()], ['Gog and Magog', 4, 3, N({ al: [['Gog', 'short', 4, 3, [], N()], ['Magog', 'short', 4, 3, [], N()]] })], ['Talos', 4, 3, N({ g: 'bronze giant' })],
    ['Hrungnir', 5, 4, N()], ['Thrym', 5, 4, N()], ['Skrymir', 5, 4, N()], ['Surtr', 5, 4, N({ g: 'fire giant' })], ['Pantagruel', 4, 3, N({ g: 'giant' })],
    ['Titan', 3, 3, { g: 'giant god' }], ['Tityos', 5, 4, N()], ['Argus', 4, 4], ['Jotun', 4, 3, { g: 'Norse giant', type: 'common', al: [['jotunn', 'spelling', 5, 3]] }],
    ['frost giant', 2, 2, { tm: true }], ['hill giant', 3, 3], ['Nephilim', 5, 4], ['Anak', 5, 5, P({ g: 'giant' })], ['Og of Bashan', 5, 5, P()], ['Grendel\'s mother', 4, 4, N()],
  ],
  labors_of_hercules: [
    ['Nemean lion', 2, 1], ['Hydra', 2, 1, { g: 'monster', al: [['Lernaean Hydra', 'synonym', 4, 2, [], N()]] }], ['Augean stables', 3, 1],
    ['Cerberus', 2, 2], ['Ceryneian hind', 5, 3, N()], ['Erymanthian boar', 4, 2, N()],
    ['Stymphalian birds', 4, 2, N()], ['Cretan bull', 4, 2, N()], ['Mares of Diomedes', 4, 3, N({ al: [['man-eating mares', 'synonym', 4, 2, [], { type: 'phrase' }]] })],
    ['Belt of Hippolyta', 4, 3, N({ al: [['girdle of Hippolyta', 'synonym', 5, 4, [], N()]] })], ['Cattle of Geryon', 5, 3, N({ al: [['red cattle', 'synonym', 5, 4, [], { type: 'phrase' }]] })],
    ['Hesperides', 4, 3, N({ al: [['golden apples', 'synonym', 3, 3, [], { type: 'phrase' }]] })],
  ],
  arthurian_legend: [
    ['King Arthur', 1, 1, P()], ['Merlin', 2, 1, P({ g: 'wizard' })], ['Excalibur', 2, 1, { g: 'sword' }], ['Camelot', 2, 1, L({ g: 'legend' })], ['Round Table', 1, 1, N()],
    ['Lancelot', 2, 2, P()], ['Guinevere', 2, 2, P()], ['Holy Grail', 1, 2, N()], ['Galahad', 3, 2, P()], ['Gawain', 3, 2, P()], ['Mordred', 3, 2, P()],
    ['Percival', 3, 3, P()], ['Morgan le Fay', 3, 2, P({ al: [['Morgana', 'short', 3, 2, [], P()]] })], ['Lady of the Lake', 3, 2, N()], ['Avalon', 3, 2, L()],
    ['Sword in the Stone', 2, 2, T()], ['Uther Pendragon', 4, 2, P()], ['Tristan', 3, 3, P({ g: 'knight' })], ['Isolde', 4, 3, P()], ['Bedivere', 5, 3, P()],
    ['Kay', 5, 4, P({ g: 'knight' })], ['Igraine', 5, 3, P()], ['Nimue', 5, 3, P()], ['Green Knight', 3, 2, N({ g: 'Arthurian' })], ['Fisher King', 4, 3, N()],
    ['Tintagel', 4, 3], ['Camlann', 5, 4, L({ g: 'battle' })], ['Pellinore', 5, 4, P()], ['Questing Beast', 5, 4, N()], ['Lamorak', 5, 5, P()], ['Sir Bors', 5, 4, P()],
    ['Gareth', 4, 4, P({ g: 'knight' })], ['Elaine of Astolat', 5, 5, P()], ['Pendragon', 3, 3, { type: 'title', g: 'Arthurian' }],
  ],
  robin_hood_legend: [
    ['Robin Hood', 1, 1, N({ g: 'legend' })], ['Little John', 2, 1, P()], ['Friar Tuck', 2, 1, P()], ['Maid Marian', 2, 1, P()], ['Will Scarlet', 3, 2, P()],
    ['Sherwood Forest', 1, 1, L()], ['Sheriff of Nottingham', 2, 1, T()], ['Merry Men', 2, 1, N()], ['Prince John', 3, 2, P({ g: 'Robin Hood' })], ['Guy of Gisborne', 4, 2, P()],
    ['Alan-a-Dale', 4, 3, P()], ['Much the Miller', 5, 3, P()], ['Nottingham', 2, 3, L()], ['Lincoln green', 3, 3, { type: 'common' }], ['longbow', 2, 3],
    ['archery contest', 3, 3, { type: 'phrase' }], ['silver arrow', 3, 3], ['Major Oak', 4, 3, N()], ['Locksley', 5, 3, L(), ], ['Robin of Loxley', 3, 2, P()],
    ['King Richard', 2, 3, P({ g: 'Lionheart' })], ['Richard the Lionheart', 2, 3, P()], ['outlaw', 1, 3], ['rob from the rich', 2, 2, { type: 'phrase' }], ['Nottingham Castle', 3, 3, L()],
    ['Kirklees Priory', 5, 5, L()], ['Barnsdale', 5, 4, L()], ['Friar', 2, 4], ['Sherwood', 3, 2, L()], ['Hood', 2, 4, { g: 'Robin Hood' }],
  ],
  yokai: [
    ['kappa', 3, 1, { g: 'yokai' }], ['tengu', 3, 1], ['oni', 3, 1], ['kitsune', 3, 2], ['tanuki', 3, 3, { g: 'raccoon dog' }], ['yurei', 4, 2], ['kamaitachi', 5, 3],
    ['rokurokubi', 5, 3], ['jorogumo', 5, 3], ['yuki-onna', 4, 2, N()], ['bakeneko', 4, 3], ['tsukumogami', 5, 3], ['baku', 4, 3, { g: 'dream eater' }], ['nekomata', 5, 3],
    ['umibozu', 5, 3], ['kodama', 4, 3, { g: 'tree spirit' }], ['nue', 5, 3], ['noppera-bo', 5, 3, { al: [['faceless ghost', 'synonym', 3, 3]] }], ['kuchisake-onna', 5, 3, { g: 'slit-mouthed woman' }],
    ['zashiki-warashi', 5, 4], ['gashadokuro', 5, 3], ['wanyudo', 5, 4], ['karakasa-obake', 5, 4, { al: [['umbrella ghost', 'synonym', 4, 3]] }], ['ittan-momen', 5, 4],
    ['Shuten-doji', 5, 4, N()], ['yamauba', 5, 4], ['hitotsume-kozo', 5, 4], ['aka-name', 5, 4], ['nurikabe', 5, 4, { g: 'wall yokai' }], ['Hyakki Yagyo', 5, 4, N({ g: 'night parade' })],
  ],
  french_revolution: [
    ['Bastille', 2, 1, L()], ['guillotine', 1, 1, { g: 'execution device' }], ['Robespierre', 3, 1, P()], ['Marie Antoinette', 2, 2, P()], ['Louis XVI', 2, 2, P()],
    ['Napoleon', 1, 3, P({ g: 'emperor' })], ['Danton', 4, 2, P()], ['Marat', 4, 2, P()], ['Lafayette', 3, 3, P()], ['Jacobins', 4, 2, N()], ['Girondins', 5, 3, N()],
    ['Reign of Terror', 2, 2, N()], ['Tennis Court Oath', 3, 2, N()], ['Estates-General', 4, 3, N()], ['sans-culottes', 4, 2], ['tricolor', 2, 3], ['La Marseillaise', 3, 2, T({ al: [['Marseillaise', 'short', 3, 2, [], T()]] })],
    ['Bastille Day', 2, 1, N()], ['Versailles', 2, 3, L()], ['Charlotte Corday', 5, 3, P()], ['Thermidor', 5, 3, N()], ['Great Fear', 5, 4, N()], ['Mirabeau', 5, 4, P()],
    ['Necker', 5, 4, P()], ['Sieyes', 5, 4, P({ g: 'Abbe' })], ['Phrygian cap', 4, 3], ['cockade', 4, 3], ['tumbril', 4, 3], ['Third Estate', 3, 2, N()],
    ['ancien regime', 4, 3, { al: [['old regime', 'synonym', 3, 3]] }], ['Tuileries', 5, 4, L()], ['Vendee', 5, 4, L()], ['Public Safety', 4, 4, N()], ['Cordeliers', 5, 4, N()], ['Festival of Reason', 5, 4, N()],
    ['storming', 2, 4, { g: 'Bastille' }],
  ],
  american_revolution: [
    ['Boston Tea Party', 1, 1, N()], ['Minutemen', 2, 1], ['Valley Forge', 2, 2, L()], ['Paul Revere', 1, 1, P()], ['George Washington', 1, 2, P()],
    ['redcoats', 3, 1, { al: [['lobsterbacks', 'slang', 5, 3]] }], ['Lexington and Concord', 3, 1, N()], ['Yorktown', 3, 2], ['Bunker Hill', 3, 2], ['Saratoga', 4, 2, L()],
    ['Declaration', 2, 3, { g: 'independence' }], ['Continental Army', 3, 1, N()], ['Continental Congress', 3, 2, N()], ['Thomas Jefferson', 1, 3, P()], ['Benjamin Franklin', 1, 3, P()],
    ['John Hancock', 2, 3, P()], ['Samuel Adams', 3, 2, P()], ['Patrick Henry', 3, 2, P()], ['Thomas Paine', 3, 2, P()], ['Common Sense', 3, 2, { g: 'pamphlet', type: 'proper' }],
    ['Stamp Act', 3, 2, N()], ['Intolerable Acts', 4, 3, N()], ['Boston Massacre', 3, 2, N()], ['Sons of Liberty', 3, 2, N()], ['Hessians', 4, 3, { g: 'soldiers', type: 'proper' }],
    ['Lafayette', 4, 3, P()], ['Cornwallis', 4, 3, P()], ['Benedict Arnold', 2, 2, P()], ['Betsy Ross', 2, 3, P()], ['Liberty Bell', 2, 3], ['King George III', 3, 2, P()],
    ['Patriot', 2, 2, { g: 'revolutionary' }], ['Loyalist', 3, 2], ['Treaty of Paris', 4, 3, N()], ['Nathan Hale', 4, 3, P()], ['Molly Pitcher', 4, 4, P()], ['Brandywine', 5, 4, L()],
    ['Trenton', 4, 3, L()], ['crossing the Delaware', 3, 3, { type: 'phrase' }], ['Townshend Acts', 5, 4, N()],
  ],
  royal_houses: [
    ['Tudor', 2, 1, N({ g: 'dynasty' })], ['Windsor', 2, 1, N({ g: 'dynasty' })], ['Stuart', 3, 1, N({ g: 'royal house' })], ['Bourbon', 3, 1, N({ g: 'royal house' })],
    ['Romanov', 3, 1, N({ g: 'dynasty' })], ['Habsburg', 3, 1, N()], ['Plantagenet', 4, 2, N()], ['Hanover', 3, 2, N()], ['Lancaster', 3, 2, N({ g: 'royal house' })],
    ['York', 2, 3, N({ g: 'royal house' })], ['Valois', 5, 3, N()], ['Medici', 3, 3, N()], ['Hohenzollern', 4, 3, N()], ['Wittelsbach', 5, 4, N()], ['Capet', 5, 3, N()],
    ['House of Savoy', 4, 3, N()], ['House of Orange', 4, 3, N()], ['Braganza', 5, 4, N()], ['Bernadotte', 5, 4, N()], ['Saxe-Coburg', 4, 3, N({ al: [['Saxe-Coburg-Gotha', 'synonym', 5, 3, [], N()]] })],
    ['Angevin', 5, 4, N()], ['Grimaldi', 4, 3, N({ g: 'Monaco' })], ['Orleans', 4, 4, N({ g: 'royal house' })], ['Trastamara', 5, 5, N()], ['Oldenburg', 5, 4, N({ g: 'royal house' })],
    ['Lorraine', 5, 4, N({ g: 'royal house' })], ['Wettin', 5, 5, N()], ['House of Normandy', 4, 4, N()], ['Wessex', 4, 4, N({ g: 'royal house' })], ['Stewart', 3, 3, N({ g: 'royal house' })],
    ['Hapsburg', 3, 2, N({ g: 'spelling' })], ['Romanoff', 4, 3, N({ g: 'spelling' })], ['Bonaparte', 3, 3, N({ g: 'imperial house' })], ['Mountbatten', 4, 3, N()],
  ],
  wild_west_legends: [
    ['Wyatt Earp', 2, 1, P()], ['Billy the Kid', 1, 1, P()], ['Jesse James', 1, 1, P()], ['Doc Holliday', 2, 2, P()], ['Annie Oakley', 2, 2, P()], ['Buffalo Bill', 2, 2, P()],
    ['Butch Cassidy', 2, 1, P()], ['Sundance Kid', 2, 1, P()], ['Wild Bill Hickok', 3, 2, P()], ['Calamity Jane', 3, 2, P()], ['Sitting Bull', 2, 3, P()],
    ['Geronimo', 2, 3, P()], ['Davy Crockett', 2, 3, P()], ['Kit Carson', 3, 2, P()], ['Pat Garrett', 4, 2, P()], ['Belle Starr', 4, 2, P()], ['Black Bart', 4, 3, P({ g: 'stagecoach robber' })],
    ['Bat Masterson', 4, 2, P()], ['Frank James', 4, 2, P()], ['Cole Younger', 5, 3, P()], ['John Wesley Hardin', 5, 3, P()], ['Bass Reeves', 5, 3, P()], ['Judge Roy Bean', 4, 3, P()],
    ['Johnny Ringo', 5, 3, P()], ['Ike Clanton', 5, 3, P()], ['Virgil Earp', 5, 3, P()], ['Morgan Earp', 5, 3, P()], ['Crazy Horse', 2, 4, P()], ['Daniel Boone', 2, 4, P()],
    ['Lone Ranger', 2, 2, N({ g: 'masked hero', tm: true })], ['Tom Horn', 5, 4, P()], ['Jim Bridger', 5, 4, P()], ['Wild Bunch', 4, 2, N({ g: 'outlaw gang' })], ['Dalton Gang', 4, 2, N()],
    ['James-Younger Gang', 5, 3, N()], ['Pinkerton', 4, 4, N({ g: 'detective' })], ['Texas Ranger', 2, 3, { type: 'title' }],
  ],
  cowboy_gear: [
    ['cowboy hat', 1, 1], ['cowboy boots', 1, 1], ['spurs', 2, 1, { g: 'horse tack' }], ['chaps', 2, 1, { g: 'cowboy' }], ['lasso', 2, 1, { al: [['lariat', 'synonym', 3, 2], ['riata', 'synonym', 5, 4]] }],
    ['holster', 2, 1], ['six-shooter', 2, 1], ['revolver', 2, 2], ['saddle', 1, 3, { g: 'horse gear' }], ['bandana', 2, 2], ['Stetson', 3, 1, N()], ['bridle', 2, 3],
    ['stirrup', 3, 3, { g: 'tack' }], ['saddlebag', 3, 2, { al: [['saddlebags', 'plural', 3, 2]] }], ['poncho', 2, 3], ['ten-gallon hat', 2, 1], ['gun belt', 3, 2], ['bolo tie', 3, 2],
    ['belt buckle', 2, 3], ['bedroll', 3, 2], ['canteen', 3, 3, { g: 'water bottle' }], ['Winchester', 4, 3, N({ g: 'rifle', tm: true })], ['Colt .45', 3, 2, N({ tm: true })],
    ['reins', 2, 3], ['cinch', 4, 3, { g: 'horse tack', al: [['girth', 'synonym', 4, 4, [], { g: 'horse' }]] }], ['saddle horn', 3, 2], ['hackamore', 5, 3], ['saddle blanket', 3, 3], ['western shirt', 2, 2],
    ['kerchief', 3, 3], ['leather vest', 2, 3], ['rawhide', 3, 3], ['spurs and boots', 2, 3, { type: 'phrase' }], ['horse blanket', 2, 4], ['lariat rope', 3, 2], ['scabbard', 4, 3],
    ['sheepskin coat', 3, 4], ['slicker', 4, 3], ['cartridge belt', 4, 3], ['Bowie knife', 3, 3, N()],
  ],
  wild_west_town: [
    ['saloon', 1, 1, { g: 'bar' }], ['sheriff\'s office', 2, 1], ['jail', 1, 2], ['bank', 1, 3, { g: 'financial' }], ['general store', 2, 1], ['livery stable', 3, 1],
    ['blacksmith', 2, 2], ['undertaker', 2, 1], ['hotel', 1, 3], ['boardwalk', 3, 1, { g: 'Western' }], ['hitching post', 3, 1], ['swinging doors', 2, 1], ['water trough', 3, 2],
    ['church', 1, 3], ['telegraph office', 3, 2], ['train depot', 3, 2], ['stagecoach', 2, 1, { g: 'vehicle' }], ['gallows', 2, 2], ['main street', 2, 3, { type: 'common' }],
    ['tumbleweed', 2, 2], ['Boot Hill', 4, 2, N({ g: 'cemetery' })], ['dance hall', 3, 2], ['barbershop', 2, 3], ['schoolhouse', 2, 3], ['ghost town', 2, 2], ['stockyard', 3, 2],
    ['watering hole', 3, 3], ['mercantile', 4, 2], ['assay office', 5, 2], ['wanted poster', 2, 1], ['Tombstone', 3, 2, L({ g: 'wild west town' })], ['Dodge City', 3, 2, L()],
    ['Deadwood', 3, 2, L({ g: 'Wild West town' })], ['gambling hall', 3, 2], ['poker table', 2, 2], ['piano', 1, 4], ['mining camp', 3, 3], ['corral', 3, 2], ['cattle drive', 3, 3],
    ['hay loft', 3, 4],
  ],
};

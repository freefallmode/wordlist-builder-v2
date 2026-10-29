// Generated word data: home_everyday root (furniture, appliances, tools, clothes, accessories, fabrics and sewing, holidays and celebrations).
// Format is described in tools/apply-words.mjs. Ratings: 1 every child knows it ... 5 few people.
const P = (o = {}) => ({ type: 'proper', ...o });
const long = (o) => ({ ...o, type: 'phrase' });          // holiday names
const S = (o = {}) => ({ type: 'proper', sens: true, ...o });   // religious / remembrance holidays
const BR = (o = {}) => ({ type: 'org', tm: true, ...o });

export const THEMES = {
  furniture: { d: 1 },
  appliances: { d: 1 },
  tools: { d: 2 },
  clothes: { d: 1 },
  accessories: { d: 2 },
  fabrics_and_sewing: { d: 3 },
  holidays_and_celebrations: { d: 1 },
};

export const ALIASES = [];

export const DATA = {
  // ---------------------------------------------------------------- furniture
  furniture: [
    ['chair', 1, 1], ['table', 1, 1], ['bed', 1, 1], ['desk', 1, 1], ['bookcase', 1, 1, { al: [['bookshelf', 'synonym', 1, 1]] }],
    ['sofa', 1, 1, { al: [['couch', 'synonym', 1, 1], ['settee', 'synonym', 2, 2, ['UK', 'IE']], ['davenport', 'synonym', 5, 5, ['US', 'CA'], { g: 'sofa' }], ['chesterfield', 'synonym', 4, 4, ['CA'], { g: 'sofa' }]] }],
    ['wardrobe', 1, 1, { al: [['armoire', 'synonym', 3, 3, ['US']]] }],
    ['chest of drawers', 2, 2, { type: 'phrase', al: [['dresser', 'synonym', 2, 2, ['US', 'CA'], { g: 'chest of drawers' }], ['tallboy', 'synonym', 4, 4, ['UK', 'AU', 'NZ']]] }],
    ['cabinet', 2, 2, { g: 'furniture' }], ['armchair', 1, 1], ['recliner', 2, 2], ['rocking chair', 1, 2], ['stool', 1, 2], ['bench', 2, 2],
    ['coffee table', 1, 1], ['dining table', 1, 1], ['bunk bed', 1, 1], ['high chair', 1, 2], ['barstool', 2, 2, { al: [['bar stool', 'spelling', 2, 2]] }],
    ['nightstand', 2, 2, { al: [['bedside table', 'synonym', 2, 2, ['UK', 'AU', 'IE']], ['bedside cabinet', 'synonym', 3, 3, ['UK']]] }],
    ['cupboard', 2, 2], ['footstool', 2, 2, { al: [['hassock', 'synonym', 5, 5, ['US']]] }], ['ottoman', 3, 3],
    ['pouffe', 3, 3, { reg: ['UK'], al: [['pouf', 'spelling', 3, 3, ['US']]] }], ['sideboard', 3, 3, { al: [['buffet', 'synonym', 3, 3, ['US'], { g: 'furniture' }]] }],
    ['hutch', 3, 3, { g: 'furniture' }], ['crib', 2, 2, { g: 'baby bed', al: [['cot', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE'], { g: 'baby bed' }]] }],
    ['futon', 2, 2], ['daybed', 3, 3], ['sofa bed', 2, 2], ['loveseat', 2, 2, { reg: ['US'] }], ['beanbag', 2, 2, { al: [['bean bag', 'spelling', 2, 2]] }],
    ['dressing table', 2, 2, { reg: ['UK'], al: [['vanity', 'synonym', 3, 3, ['US'], { g: 'dressing table' }]] }],
    ['console table', 3, 3], ['TV stand', 2, 2, { type: 'phrase' }], ['four-poster bed', 3, 3], ['chaise longue', 3, 3, { al: [['chaise lounge', 'spelling', 3, 3, ['US']], ['chaise', 'synonym', 3, 3]] }],
    ['wingback chair', 3, 3], ['coat stand', 3, 3, { al: [['coat rack', 'synonym', 2, 2], ['hat stand', 'synonym', 3, 3]] }], ['umbrella stand', 3, 3],
    ['trundle bed', 4, 4], ['credenza', 4, 4], ['commode', 4, 4, { g: 'furniture' }], ['bar cart', 4, 4], ['Windsor chair', 4, 4, { type: 'proper' }],
    ['bureau', 4, 4, { g: 'desk', reg: ['UK'] }], ['chiffonier', 5, 5], ['secretaire', 5, 5, { al: [['secretary desk', 'synonym', 5, 5, ['US']]] }],
    ['escritoire', 5, 5], ['tuffet', 5, 4], ['étagère', 5, 5, { al: [['etagere', 'spelling', 5, 5]] }], ['settle', 5, 5, { g: 'bench' }], ['whatnot', 5, 5, { g: 'furniture' }],
  ],

  // ---------------------------------------------------------------- appliances
  appliances: [
    ['refrigerator', 1, 1, { al: [['fridge', 'synonym', 1, 1], ['icebox', 'synonym', 3, 3, ['US']]] }], ['freezer', 1, 1], ['oven', 1, 1],
    ['stove', 1, 1, { al: [['cooker', 'synonym', 2, 2, ['UK', 'IE', 'AU', 'NZ'], { g: 'stove' }]] }],
    ['microwave', 1, 1, { al: [['microwave oven', 'synonym', 1, 1]] }], ['dishwasher', 1, 1],
    ['washing machine', 1, 1, { al: [['washer', 'synonym', 2, 2, ['US'], { g: 'washing machine' }]] }],
    ['dryer', 1, 1, { g: 'clothes dryer', al: [['tumble dryer', 'synonym', 2, 2, ['UK', 'IE'], { g: 'clothes dryer' }]] }],
    ['toaster', 1, 1], ['kettle', 1, 1], ['blender', 1, 1], ['coffee maker', 1, 1, { al: [['coffee machine', 'synonym', 2, 2]] }],
    ['vacuum cleaner', 1, 1, { al: [['vacuum', 'synonym', 1, 1, [], { g: 'vacuum cleaner' }], ['Hoover', 'synonym', 2, 2, ['UK', 'IE'], BR({ g: 'vacuum cleaner' })]] }],
    ['air conditioner', 1, 1, { al: [['AC', 'synonym', 2, 2, [], { type: 'acronym', g: 'air conditioner' }], ['aircon', 'synonym', 3, 3, ['UK', 'AU', 'NZ']]] }],
    ['steam iron', 2, 2, { al: [['clothes iron', 'synonym', 2, 2]] }], ['hair dryer', 1, 2, { al: [['hairdryer', 'spelling', 1, 1, ['UK']], ['blow dryer', 'synonym', 2, 2, ['US']]] }],
    ['fan', 1, 2, { g: 'electric fan' }], ['heater', 1, 1], ['humidifier', 2, 2], ['dehumidifier', 3, 3], ['stand mixer', 2, 2], ['hand mixer', 2, 2],
    ['food processor', 2, 2], ['rice cooker', 2, 2], ['slow cooker', 2, 2, { al: [['Crock-Pot', 'synonym', 3, 3, ['US'], BR({ g: 'slow cooker' })]] }],
    ['pressure cooker', 2, 2, { al: [['Instant Pot', 'synonym', 3, 3, ['US'], BR({ g: 'pressure cooker' })]] }], ['air fryer', 2, 2], ['deep fryer', 2, 2],
    ['waffle iron', 2, 2, { al: [['waffle maker', 'synonym', 2, 2]] }], ['toaster oven', 2, 2], ['juicer', 2, 2], ['espresso machine', 2, 2], ['bread maker', 2, 2, { al: [['bread machine', 'synonym', 2, 2]] }],
    ['robot vacuum', 2, 2, { al: [['Roomba', 'synonym', 3, 3, [], BR({ g: 'robot vacuum' })]] }], ['electric blanket', 2, 3], ['sewing machine', 1, 2],
    ['cooktop', 3, 3, { al: [['hob', 'synonym', 2, 2, ['UK', 'IE', 'AU', 'NZ']], ['stovetop', 'synonym', 2, 2, ['US']]] }],
    ['garbage disposal', 3, 3, { reg: ['US'], al: [['waste disposal unit', 'synonym', 4, 4, ['UK'], { type: 'phrase' }], ['InSinkErator', 'synonym', 4, 4, ['US'], BR({ g: 'garbage disposal' })]] }],
    ['range hood', 3, 3, { reg: ['US'], al: [['extractor fan', 'synonym', 3, 3, ['UK', 'AU'], { g: 'range hood' }], ['cooker hood', 'synonym', 3, 3, ['UK']]] }],
    ['water heater', 3, 3, { al: [['geyser', 'synonym', 4, 4, ['IN', 'ZA'], { g: 'water heater' }]] }],
    ['ice maker', 3, 3], ['air purifier', 3, 3], ['steam cleaner', 3, 3], ['immersion blender', 3, 3, { al: [['stick blender', 'synonym', 3, 3, ['UK']], ['hand blender', 'synonym', 3, 3]] }],
    ['popcorn maker', 3, 3], ['ice cream maker', 3, 3, { type: 'phrase' }], ['chest freezer', 3, 3], ['rotisserie', 3, 3], ['toastie maker', 3, 3, { reg: ['UK', 'AU', 'IE'] }],
    ['trash compactor', 4, 4, { reg: ['US'] }], ['wall oven', 4, 4], ['food dehydrator', 4, 4], ['sous vide machine', 4, 4, { type: 'phrase' }], ['spin dryer', 4, 4, { reg: ['UK'] }],
    ['wine fridge', 3, 3], ['mangle', 5, 4, { g: 'wringer' }], ['yogurt maker', 4, 4], ['egg boiler', 4, 4], ['electric kettle', 2, 2],
  ],

  // ---------------------------------------------------------------- tools
  tools: [
    ['hammer', 1, 1], ['screwdriver', 1, 1], ['wrench', 1, 1, { al: [['spanner', 'synonym', 2, 2, ['UK', 'IE', 'AU', 'NZ']]] }], ['pliers', 1, 1],
    ['saw', 1, 1], ['drill', 1, 1, { g: 'tool' }], ['tape measure', 1, 1], ['toolbox', 1, 1], ['axe', 1, 1, { al: [['ax', 'spelling', 1, 1, ['US']]] }],
    ['sandpaper', 1, 2], ['level', 2, 2, { g: 'tool' }], ['spirit level', 2, 2], ['chisel', 2, 2], ['mallet', 2, 2], ['sledgehammer', 2, 2],
    ['crowbar', 2, 2, { al: [['pry bar', 'synonym', 3, 3], ['jemmy', 'synonym', 4, 4, ['UK']]] }], ['hacksaw', 2, 2], ['jigsaw', 2, 2, { g: 'saw' }], ['chainsaw', 2, 3],
    ['plane', 2, 3, { g: 'tool' }], ['file', 2, 3, { g: 'tool' }], ['wire cutters', 2, 2], ['glue gun', 2, 2], ['staple gun', 2, 3],
    ['utility knife', 2, 2, { al: [['box cutter', 'synonym', 2, 2, ['US']], ['Stanley knife', 'synonym', 3, 3, ['UK', 'AU', 'IE'], BR({ g: 'utility knife' })]] }],
    ['Phillips screwdriver', 2, 2, { type: 'proper', tm: true }], ['clamp', 2, 2, { al: [['G-clamp', 'synonym', 3, 3, ['UK']]] }], ['workbench', 2, 2],
    ['vise', 3, 3, { g: 'tool', al: [['vice', 'spelling', 3, 3, ['UK'], { g: 'tool' }]] }], ['hex key', 3, 3, { al: [['Allen key', 'synonym', 3, 3, ['UK'], { type: 'proper' }], ['Allen wrench', 'synonym', 3, 3, ['US'], { type: 'proper' }]] }],
    ['socket wrench', 3, 3, { al: [['ratchet', 'synonym', 3, 3, [], { g: 'socket wrench' }]] }], ['torque wrench', 3, 3], ['monkey wrench', 3, 3], ['pipe wrench', 3, 3],
    ['stud finder', 3, 3], ['nail gun', 3, 3], ['soldering iron', 3, 3], ['multimeter', 3, 3], ['bolt cutters', 3, 3], ['angle grinder', 3, 3], ['circular saw', 3, 3],
    ['router', 3, 4, { g: 'power tool' }], ['wire stripper', 3, 3], ['caulking gun', 3, 3], ['sawhorse', 3, 3], ['hand saw', 2, 2],
    ['rasp', 4, 4, { g: 'tool' }], ['awl', 4, 4], ['bradawl', 4, 4, { reg: ['UK'] }], ['tin snips', 4, 4, { al: [['aviation snips', 'synonym', 5, 5]] }], ['coping saw', 4, 4],
    ['belt sander', 4, 4], ['orbital sander', 4, 4], ['putty knife', 4, 4], ['try square', 4, 4], ['rivet gun', 4, 4], ['spokeshave', 5, 5],
    ['drawknife', 5, 5, { al: [['drawshave', 'synonym', 5, 5]] }], ['adze', 5, 5, { al: [['adz', 'spelling', 5, 5, ['US']]] }], ['tenon saw', 5, 5], ['plumb bob', 5, 4],
    ['chalk line', 5, 4], ['block plane', 5, 5], ['dovetail saw', 5, 5], ['gimlet', 5, 4],
  ],

  // ---------------------------------------------------------------- clothes
  clothes: [
    ['shirt', 1, 1], ['T-shirt', 1, 1, { al: [['tee', 'synonym', 2, 2], ['tee shirt', 'spelling', 2, 2]] }],
    ['pants', 1, 1, { al: [['trousers', 'synonym', 1, 1, ['UK', 'IE', 'AU', 'NZ']], ['slacks', 'synonym', 3, 3, ['US']]] }],
    ['jeans', 1, 1], ['shorts', 1, 1], ['skirt', 1, 1], ['dress', 1, 1, { al: [['frock', 'synonym', 3, 3, ['UK', 'AU', 'IE', 'NZ']]] }], ['jacket', 1, 1], ['coat', 1, 1],
    ['sweater', 1, 1, { al: [['jumper', 'synonym', 2, 2, ['UK', 'AU', 'NZ', 'IE'], { g: 'sweater' }], ['pullover', 'synonym', 3, 3], ['jersey', 'synonym', 3, 3, ['UK'], { g: 'sweater' }], ['woolly', 'synonym', 4, 4, ['UK'], { g: 'sweater' }]] }],
    ['hoodie', 1, 1], ['sweatshirt', 1, 1], ['cardigan', 2, 2], ['blouse', 2, 2],
    ['waistcoat', 2, 2, { reg: ['UK'], al: [['vest', 'synonym', 2, 2, ['US'], { g: 'waistcoat' }]] }],
    ['suit', 1, 1, { g: 'clothing' }], ['tuxedo', 2, 2, { al: [['tux', 'synonym', 2, 2], ['dinner jacket', 'synonym', 2, 2, ['UK']]] }],
    ['pajamas', 1, 1, { al: [['pyjamas', 'spelling', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'ZA', 'IN']], ['PJs', 'synonym', 2, 2]] }],
    ['bathrobe', 2, 2, { al: [['dressing gown', 'synonym', 2, 2, ['UK', 'AU', 'IE']], ['robe', 'synonym', 2, 2]] }],
    ['overalls', 2, 2, { al: [['dungarees', 'synonym', 3, 3, ['UK']], ['coveralls', 'synonym', 3, 3, ['US']]] }],
    ['leggings', 2, 2], ['polo shirt', 2, 2], ['tank top', 2, 2, { al: [['singlet', 'synonym', 3, 3, ['AU', 'NZ', 'UK', 'ZA'], { g: 'tank top' }]] }],
    ['tracksuit', 2, 2, { al: [['sweatsuit', 'synonym', 3, 3, ['US']], ['jogging suit', 'synonym', 3, 3]] }],
    ['sweatpants', 2, 2, { al: [['joggers', 'synonym', 2, 2, ['UK', 'IE'], { g: 'sweatpants' }], ['trackies', 'synonym', 3, 3, ['AU', 'NZ', 'UK']]] }],
    ['apron', 2, 3], ['uniform', 1, 2], ['scrubs', 3, 3, { g: 'medical clothing' }], ['jumpsuit', 2, 2, { al: [['boilersuit', 'synonym', 3, 3, ['UK']]] }], ['onesie', 3, 2],
    ['romper', 3, 3, { al: [['playsuit', 'synonym', 3, 3, ['UK']]] }], ['capris', 3, 3, { al: [['pedal pushers', 'synonym', 4, 4]] }], ['chinos', 3, 3],
    ['cargo pants', 2, 2], ['corduroys', 3, 3, { al: [['cords', 'synonym', 3, 3, ['UK']]] }], ['blazer', 2, 2], ['raincoat', 1, 2], ['parka', 3, 3], ['poncho', 2, 3],
    ['tunic', 3, 3], ['kaftan', 3, 3, { al: [['caftan', 'spelling', 3, 3, ['US']]] }], ['cape', 2, 3, { g: 'clothing' }], ['bodysuit', 3, 3], ['camisole', 3, 3, { al: [['cami', 'synonym', 3, 3]] }],
    ['gilet', 3, 3, { reg: ['UK'], al: [['bodywarmer', 'synonym', 4, 4, ['UK']]] }], ['pinafore', 3, 3, { al: [['jumper', 'synonym', 4, 4, ['US'], { g: 'pinafore dress' }]] }],
    ['culottes', 4, 4], ['bolero', 4, 4, { g: 'jacket' }], ['shrug', 4, 4, { g: 'cropped cardigan' }], ['smock', 4, 4], ['jodhpurs', 4, 4], ['bloomers', 4, 4],
    ['knickerbockers', 5, 5, { al: [['plus fours', 'synonym', 5, 5]] }], ['redingote', 5, 5], ['surcoat', 5, 5], ['houppelande', 5, 5],
  ],

  // ---------------------------------------------------------------- accessories
  accessories: [
    ['belt', 1, 1], ['hat', 1, 1], ['tie', 1, 1, { g: 'neckwear' }], ['bow tie', 1, 1], ['watch', 1, 2, { g: 'wristwatch' }], ['ring', 1, 2, { g: 'jewelry' }], ['necklace', 1, 1],
    ['bracelet', 1, 1], ['earrings', 1, 1], ['sunglasses', 1, 1, { al: [['shades', 'synonym', 2, 2], ['sunnies', 'synonym', 3, 3, ['AU', 'NZ']]] }], ['scarf', 1, 1], ['gloves', 1, 1],
    ['handbag', 1, 1, { al: [['purse', 'synonym', 2, 2, ['US', 'CA'], { g: 'handbag' }], ['pocketbook', 'synonym', 4, 4, ['US'], { g: 'handbag' }]] }],
    ['wallet', 1, 1, { al: [['billfold', 'synonym', 4, 4, ['US']]] }], ['umbrella', 1, 2],
    ['backpack', 1, 1, { al: [['rucksack', 'synonym', 2, 2, ['UK', 'IE', 'AU']], ['knapsack', 'synonym', 3, 3]] }],
    ['cufflinks', 3, 3], ['brooch', 3, 3], ['headband', 2, 2, { al: [['Alice band', 'synonym', 3, 3, ['UK']]] }], ['hair clip', 2, 2, { al: [['barrette', 'synonym', 3, 3, ['US']], ['hair slide', 'synonym', 3, 3, ['UK']]] }],
    ['scrunchie', 2, 2], ['bandana', 2, 2, { al: [['bandanna', 'spelling', 2, 2]] }],
    ['suspenders', 2, 2, { reg: ['US'], al: [['braces', 'synonym', 2, 2, ['UK', 'AU', 'IE'], { g: 'suspenders' }]] }],
    ['handkerchief', 2, 2, { al: [['hankie', 'synonym', 3, 3], ['hanky', 'spelling', 3, 3]] }], ['pocket square', 3, 3], ['tie pin', 4, 4, { al: [['tie clip', 'synonym', 3, 3], ['tie bar', 'synonym', 4, 4, ['US']]] }],
    ['anklet', 3, 3], ['pendant', 2, 2], ['locket', 3, 3], ['choker', 3, 3, { g: 'necklace' }], ['bangle', 3, 3, { al: [['kada', 'synonym', 5, 5, ['IN'], { g: 'bangle' }]] }],
    ['fanny pack', 2, 2, { reg: ['US'], al: [['bum bag', 'synonym', 2, 2, ['UK', 'AU', 'IE']], ['waist pack', 'synonym', 3, 3]] }],
    ['tote bag', 2, 2], ['clutch', 3, 3, { g: 'handbag' }], ['satchel', 3, 3], ['messenger bag', 3, 3], ['briefcase', 2, 2],
    ['keychain', 2, 3, { al: [['key ring', 'synonym', 2, 2], ['keyring', 'spelling', 2, 2, ['UK']]] }], ['lanyard', 3, 3], ['wristband', 2, 2], ['sweatband', 3, 3], ['earmuffs', 2, 2],
    ['pocket watch', 2, 2], ['parasol', 3, 3], ['hand fan', 3, 3, { al: [['folding fan', 'synonym', 3, 3]] }], ['tiara', 3, 3], ['veil', 3, 3], ['money clip', 3, 3],
    ['cravat', 4, 4], ['ascot', 4, 4, { g: 'cravat' }], ['bolo tie', 4, 4], ['cummerbund', 4, 4], ['monocle', 4, 4], ['garter', 4, 4], ['pince-nez', 5, 5], ['lorgnette', 5, 5], ['hatpin', 5, 5],
    ['watch fob', 5, 5],
  ],

  // ---------------------------------------------------------------- fabrics and sewing
  fabrics_and_sewing: [
    ['needle', 1, 1, { g: 'sewing' }], ['thread', 1, 1, { g: 'sewing' }], ['button', 1, 1], ['zipper', 1, 1, { al: [['zip', 'synonym', 1, 1, ['UK', 'AU', 'NZ', 'IE', 'IN', 'ZA']]] }],
    ['fabric', 1, 1], ['scissors', 1, 2], ['sewing machine', 1, 1], ['tape measure', 1, 1], ['thimble', 2, 2], ['pattern', 2, 2, { g: 'sewing' }], ['hem', 2, 2], ['seam', 2, 2], ['stitch', 1, 1],
    ['embroidery', 2, 2], ['cross-stitch', 2, 2], ['sewing kit', 2, 2], ['ribbon', 2, 3], ['patch', 2, 2, { g: 'sewing' }], ['elastic', 2, 2, { g: 'fabric' }],
    ['cotton', 1, 1], ['silk', 1, 1], ['wool', 1, 2], ['linen', 2, 2], ['denim', 1, 2], ['velvet', 2, 2], ['satin', 2, 2], ['lace', 2, 2], ['polyester', 2, 2], ['fleece', 2, 3],
    ['felt', 2, 3, { g: 'fabric' }], ['tweed', 3, 3], ['chiffon', 3, 3], ['muslin', 3, 3], ['calico', 3, 3],
    ['Velcro', 2, 3, BR({ al: [['hook-and-loop', 'synonym', 4, 4, [], { type: 'phrase', tm: false }]] })], ['dart', 3, 3, { g: 'sewing' }], ['pleat', 3, 3], ['bobbin', 3, 3], ['seam ripper', 3, 3], ['pincushion', 3, 3],
    ['darning', 3, 3], ['quilting', 3, 3], ['patchwork', 3, 3], ['needlepoint', 3, 3], ['embroidery hoop', 3, 3], ['sequin', 3, 3], ['running stitch', 3, 3], ['zigzag stitch', 3, 3],
    ['pinking shears', 4, 4, { al: [['pinking scissors', 'synonym', 4, 4]] }], ['selvage', 4, 4, { al: [['selvedge', 'spelling', 4, 4, ['UK']]] }], ['bias tape', 4, 4], ['interfacing', 4, 4],
    ["tailor's chalk", 4, 4], ['dress form', 4, 4, { al: [["dressmaker's dummy", 'synonym', 4, 4, ['UK']]] }], ['seam allowance', 4, 4],
    ['basting', 4, 4, { al: [['tacking', 'synonym', 4, 4, ['UK'], { g: 'sewing' }]] }], ['overlocker', 4, 4, { reg: ['UK', 'AU', 'NZ'], al: [['serger', 'synonym', 4, 4, ['US', 'CA']]] }],
    ['appliqué', 4, 4, { al: [['applique', 'spelling', 4, 4]] }], ['backstitch', 4, 4, { al: [['back stitch', 'spelling', 4, 4]] }], ['blanket stitch', 4, 4], ['chain stitch', 4, 4], ['topstitch', 4, 4],
    ['rotary cutter', 4, 4], ['batting', 4, 4, { g: 'quilting', al: [['wadding', 'synonym', 4, 4, ['UK']]] }], ['needle threader', 4, 4], ['rickrack', 4, 4], ['crochet hook', 3, 3],
    ['fat quarter', 5, 5], ['French seam', 5, 5], ['whipstitch', 5, 5], ['tracing wheel', 5, 5], ["tailor's ham", 5, 5], ['bodkin', 5, 5], ['blind hem', 5, 5],
  ],

  // ---------------------------------------------------------------- holidays and celebrations
  holidays_and_celebrations: [
    ['Christmas', 1, 1, S()], ['Halloween', 1, 1, P()], ['Easter', 1, 1, S()], ['Thanksgiving', 1, 1, P({ reg: ['US', 'CA'] })],
    ["New Year's Eve", 1, 1, P({ al: [['Hogmanay', 'synonym', 3, 3, ['UK'], P()]] })], ["Valentine's Day", 1, 1, P()],
    ['birthday', 1, 1], ['wedding', 1, 1], ['anniversary', 1, 2], ["Mother's Day", 1, 1, P()], ["Father's Day", 1, 1, P()],
    ['Independence Day', 2, 2, P({ reg: ['US'], al: [['Fourth of July', 'synonym', 1, 2, ['US'], P()]] })],
    ['Hanukkah', 2, 2, S({ al: [['Chanukah', 'spelling', 3, 3, [], S()]] })], ['Diwali', 2, 2, S({ al: [['Deepavali', 'synonym', 4, 4, ['IN'], S()]] })],
    ['Eid', 2, 2, S()], ['Ramadan', 2, 3, S()], ['Passover', 2, 2, S({ al: [['Pesach', 'synonym', 4, 4, [], S()]] })], ['Lent', 3, 3, S({ g: 'season' })],
    ['Mardi Gras', 2, 2, P({ al: [['Shrove Tuesday', 'synonym', 3, 3, ['UK'], S()], ['Pancake Day', 'synonym', 2, 2, ['UK', 'IE', 'AU', 'NZ', 'CA'], P()]] })],
    ['Carnival', 2, 2, P({ g: 'festival' })], ['Oktoberfest', 2, 2, P()], ['Holi', 3, 3, S({ reg: ['IN'] })],
    ['Chinese New Year', 1, 2, P({ al: [['Lunar New Year', 'synonym', 2, 2, [], P()], ['Spring Festival', 'synonym', 4, 4, [], P()]] })],
    ['Boxing Day', 2, 2, P({ reg: ['UK', 'CA', 'AU', 'NZ', 'IE', 'ZA'] })], ['Bonfire Night', 3, 3, P({ reg: ['UK'], al: [['Guy Fawkes Night', 'synonym', 3, 3, ['UK'], P()]] })],
    ['Labor Day', 2, 2, P({ reg: ['US', 'CA'], al: [['Labour Day', 'spelling', 2, 2, ['UK', 'AU', 'NZ', 'IN'], P()]] })], ['Memorial Day', 2, 2, S({ reg: ['US'] })],
    ['Veterans Day', 2, 2, S({ reg: ['US'] })], ['Remembrance Day', 3, 3, S({ reg: ['UK', 'CA', 'AU'], al: [['Armistice Day', 'synonym', 3, 3, [], S()]] })],
    ['Anzac Day', 3, 3, S({ reg: ['AU', 'NZ'] })], ['Juneteenth', 3, 3, S({ reg: ['US'] })], ['Martin Luther King Day', 3, 3, S({ reg: ['US'] })],
    ['Groundhog Day', 2, 2, P({ g: 'holiday', reg: ['US', 'CA'] })], ['Earth Day', 3, 3, P()], ['Cinco de Mayo', 2, 2, P({ reg: ['US'] })],
    ['Day of the Dead', 2, 2, S({ al: [['Día de los Muertos', 'synonym', 3, 3, [], S()]] })], ['Kwanzaa', 3, 3, S({ reg: ['US'] })], ['Good Friday', 2, 2, S()],
    ['Epiphany', 4, 4, S({ g: 'holiday' })], ['Pentecost', 4, 4, S()], ["St. Patrick's Day", 1, 2, P({ al: [["Paddy's Day", 'synonym', 3, 3, ['IE'], P()]] })],
    ['Burns Night', 4, 4, P({ reg: ['UK'] })], ['Australia Day', 3, 3, P({ reg: ['AU'] })], ['Canada Day', 3, 3, P({ reg: ['CA'] })], ['Bastille Day', 3, 3, P()],
    ['bank holiday', 2, 2, { type: 'phrase', reg: ['UK', 'IE'], al: [['public holiday', 'synonym', 1, 2]] }], ['Eid al-Adha', 4, 4, S()], ['Rosh Hashanah', 3, 3, S()], ['Yom Kippur', 3, 3, S()],
    ['Purim', 4, 4, S()], ['Sukkot', 4, 4, S()], ['Navratri', 4, 4, S({ reg: ['IN'] })], ['Raksha Bandhan', 4, 4, S({ reg: ['IN'] })], ['Durga Puja', 4, 4, S({ reg: ['IN'] })],
    ['Onam', 4, 4, S({ reg: ['IN'] })], ['Pongal', 4, 4, S({ reg: ['IN'] })], ['Ganesh Chaturthi', 4, 4, S({ reg: ['IN'] })],
    ['Dussehra', 4, 4, S({ reg: ['IN'], al: [['Vijayadashami', 'synonym', 5, 5, ['IN'], S()]] })], ['Janmashtami', 5, 5, S({ reg: ['IN'] })], ['Baisakhi', 5, 5, S({ reg: ['IN'] })],
    ['Lohri', 5, 5, S({ reg: ['IN'] })], ['Songkran', 4, 4, P()], ['Midsummer', 3, 3, P()], ['Walpurgis Night', 5, 5, P()],
    ['graduation', 2, 2], ['baby shower', 2, 2], ['housewarming', 3, 3], ['retirement party', 2, 2],
    ['bachelor party', 2, 2, { type: 'phrase', adult: true, al: [['stag night', 'synonym', 2, 2, ['UK', 'IE'], { type: 'phrase' }], ['bucks night', 'synonym', 3, 3, ['AU', 'NZ'], { type: 'phrase' }]] }],
    ['bachelorette party', 2, 2, { type: 'phrase', adult: true, al: [['hen night', 'synonym', 2, 2, ['UK', 'IE'], { type: 'phrase' }], ['hen do', 'synonym', 3, 3, ['UK'], { type: 'phrase' }]] }],
    ['christening', 3, 3, { sens: true, al: [['baptism', 'synonym', 2, 3, [], { sens: true }]] }], ['bar mitzvah', 3, 3, { sens: true, type: 'phrase' }], ['quinceañera', 4, 4, { sens: true }],
    ['Yule', 4, 4, S()],
  ],
};

// Names of more than two words are set phrases (exempt from the word limit).
const fix = (text, o) => { if (o && text.trim().split(/\s+/).length > 2 && o.type === 'proper') o.type = 'phrase'; };
for (const rows of Object.values(DATA)) for (const [text, , , o] of rows) { fix(text, o); for (const [at, , , , , ao] of o?.al || []) fix(at, ao); }

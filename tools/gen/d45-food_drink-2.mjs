// Depth 4/5 batch: Food & Drink, chunk 2 (national cuisines, coffee words, soda flavors, wines, wine words, liqueurs, national spirits).
const B = (o = {}) => ({ type: 'org', tm: true, ...o });   // brand

export const THEMES = {
  japanese_food: { d: 2 }, japanese_sweets: { d: 4 }, sushi_types: { d: 3 }, korean_food: { d: 3 }, thai_food: { d: 2 }, vietnamese_food: { d: 3 },
  filipino_food: { d: 4 }, australian_food: { d: 2 }, bush_tucker: { d: 5 }, pacific_islands_food: { d: 5 }, peruvian_food: { d: 4 }, brazilian_food: { d: 3 },
  argentinian_food: { d: 3 }, south_american_drinks: { d: 4 }, mexican_food: { d: 1 }, southern_food: { d: 2 }, canadian_food: { d: 3 },
  coffee_words: { d: 3 }, soda_flavors: { d: 1 }, red_wines: { d: 3 }, white_wines: { d: 3 }, wine_words: { d: 4 }, liqueurs: { d: 3 }, national_spirits: { d: 4 },
};

export const FIXES = [
  { gloss: ['vintage', 'fashion_styles', 'style'] }, { gloss: ['crush', 'love_words', 'infatuation'] }, { gloss: ['crisp', 'words_for_cold', 'cold'] },
];

export const DATA = {
  japanese_food: [
    ['sushi', 1, 1], ['ramen', 1, 1], ['tempura', 2, 1], ['teriyaki', 2, 1], ['miso soup', 2, 1], ['sashimi', 2, 1], ['udon', 2, 1], ['soba', 3, 2],
    ['tonkatsu', 3, 2], ['katsu curry', 3, 2], ['yakitori', 3, 2], ['okonomiyaki', 4, 2], ['takoyaki', 3, 2], ['gyoza', 2, 2], ['edamame', 2, 3], ['wasabi', 2, 2],
    ['sukiyaki', 4, 2], ['shabu-shabu', 4, 3], ['onigiri', 3, 2], ['natto', 4, 3], ['tamagoyaki', 4, 3], ['unagi', 3, 2], ['oyakodon', 5, 3], ['gyudon', 4, 3],
    ['chawanmushi', 5, 4], ['karaage', 4, 3], ['yakisoba', 3, 2], ['dashi', 4, 3], ['furikake', 5, 4], ['bento', 2, 2, { al: [['bento box', 'synonym', 2, 2]] }],
  ],
  japanese_sweets: [
    ['mochi', 2, 2], ['dorayaki', 4, 2], ['taiyaki', 4, 2], ['daifuku', 5, 3], ['dango', 4, 2], ['anmitsu', 5, 4], ['yokan', 5, 3], ['wagashi', 5, 2],
    ['manju', 5, 3], ['castella', 5, 4], ['red bean paste', 3, 3, { al: [['anko', 'synonym', 5, 4]] }], ['kakigori', 5, 3], ['warabimochi', 5, 4], ['senbei', 4, 3],
    ['melon pan', 4, 4], ['imagawayaki', 5, 4], ['matcha ice cream', 2, 3], ['Pocky', 3, 3, B()], ['konpeito', 5, 4], ['mitarashi dango', 5, 4], ['monaka', 5, 4],
  ],
  sushi_types: [
    ['nigiri', 3, 1], ['maki', 3, 1], ['sashimi', 2, 2], ['temaki', 4, 1], ['uramaki', 4, 1], ['chirashi', 4, 1], ['inari', 4, 1, { g: 'sushi' }], ['hand roll', 3, 1],
    ['california roll', 2, 1], ['futomaki', 4, 2], ['hosomaki', 4, 2], ['gunkan', 5, 2], ['oshizushi', 5, 3], ['narezushi', 5, 4], ['spicy tuna roll', 2, 2], ['dragon roll', 3, 2],
    ['rainbow roll', 3, 2], ['philadelphia roll', 3, 3], ['tekka maki', 5, 3], ['temari sushi', 5, 3], ['sushi roll', 1, 2], ['battleship sushi', 5, 4],
  ],
  korean_food: [
    ['kimchi', 2, 1], ['bibimbap', 3, 1], ['bulgogi', 3, 1], ['tteokbokki', 4, 2], ['japchae', 4, 2], ['kimbap', 4, 2, { al: [['gimbap', 'spelling', 4, 2]] }], ['Korean BBQ', 3, 1], ['galbi', 4, 2],
    ['sundubu jjigae', 5, 3], ['kimchi jjigae', 5, 3], ['samgyeopsal', 5, 2], ['banchan', 4, 2], ['gochujang', 4, 3], ['gochugaru', 5, 4], ['naengmyeon', 5, 3],
    ['jajangmyeon', 5, 3], ['dakgalbi', 5, 3], ['soondae', 5, 4], ['pajeon', 5, 3], ['hotteok', 5, 3], ['bingsu', 4, 3], ['doenjang', 5, 4], ['Korean fried chicken', 3, 2],
    ['tteok', 5, 3], ['samgyetang', 5, 3], ['mandu', 5, 3],
  ],
  thai_food: [
    ['pad thai', 2, 1], ['green curry', 2, 1], ['red curry', 2, 1], ['tom yum', 3, 1], ['tom kha gai', 4, 2], ['massaman curry', 3, 2], ['panang curry', 4, 2],
    ['som tam', 4, 2], ['papaya salad', 3, 3], ['satay', 2, 2], ['larb', 4, 3], ['pad see ew', 4, 2], ['pad kra pao', 5, 3], ['mango sticky rice', 3, 1],
    ['khao pad', 4, 2], ['drunken noodles', 3, 2], ['spring rolls', 1, 3], ['fish sauce', 2, 3], ['thai basil', 3, 3], ['lemongrass', 2, 3], ['galangal', 4, 3],
    ['khao soi', 5, 3], ['moo ping', 5, 4], ['nam prik', 5, 4], ['gai yang', 5, 3], ['thai iced tea', 3, 2], ['sticky rice', 2, 3], ['tod mun pla', 5, 4], ['yum woon sen', 5, 4],
  ],
  vietnamese_food: [
    ['pho', 2, 1], ['banh mi', 3, 1], ['goi cuon', 4, 1], ['bun cha', 4, 2], ['com tam', 5, 2], ['banh xeo', 5, 2], ['summer rolls', 3, 2], ['bun bo hue', 5, 2],
    ['cao lau', 5, 3], ['nuoc cham', 5, 3], ['cha gio', 5, 2], ['banh cuon', 5, 3], ['bun rieu', 5, 3], ['ca phe sua da', 4, 3], ['Vietnamese coffee', 3, 2],
    ['hu tieu', 5, 3], ['mi quang', 5, 3], ['banh bao', 4, 3], ['canh chua', 5, 3], ['nem nuong', 5, 3],
  ],
  filipino_food: [
    ['adobo', 3, 1], ['sinigang', 4, 1], ['lechon', 4, 1], ['lumpia', 3, 1], ['pancit', 4, 1], ['sisig', 4, 1], ['kare-kare', 5, 2], ['halo-halo', 4, 1],
    ['balut', 3, 2], ['tapsilog', 5, 2], ['longganisa', 5, 3], ['tocino', 5, 3], ['bibingka', 5, 3], ['puto', 5, 3], ['leche flan', 4, 3], ['ube halaya', 5, 4],
    ['ube', 3, 3], ['turon', 5, 4], ['dinuguan', 5, 4], ['bulalo', 5, 4], ['pinakbet', 5, 4], ['lugaw', 5, 4], ['kinilaw', 5, 4], ['sinangag', 5, 4], ['calamansi', 4, 3], ['taho', 5, 4], ['pandesal', 5, 3],
  ],
  australian_food: [
    ['meat pie', 2, 1], ['lamington', 3, 1], ['pavlova', 3, 1], ['Vegemite', 2, 1, B()], ['damper', 3, 2, { g: 'bread', reg: ['AU'] }], ['anzac biscuit', 3, 1], ['fairy bread', 3, 1],
    ['Tim Tam', 3, 1, B()], ['sausage roll', 2, 2], ['chicken parmigiana', 3, 2], ['barramundi', 3, 2], ['kangaroo steak', 2, 2], ['Milo', 2, 3, B({ g: 'drink' })],
    ['chiko roll', 4, 2], ['balmain bug', 4, 3], ['snag', 3, 3, { g: 'sausage', reg: ['AU'] }],
    ['sausage sizzle', 3, 2], ['Golden Gaytime', 4, 3, B({ g: 'ice cream' })], ['Cherry Ripe', 4, 3, B()], ['musk sticks', 5, 4], ['vanilla slice', 3, 3], ['lolly cake', 5, 4], ['Weet-Bix', 3, 3, B()],
    ['crumpet', 2, 4], ['peach melba', 3, 4], ['Arnott\'s Shapes', 4, 4, B()],
  ],
  bush_tucker: [
    ['witchetty grub', 3, 1], ['wattleseed', 4, 1], ['finger lime', 4, 1], ['quandong', 4, 1], ['kangaroo', 1, 2], ['emu', 2, 2], ['macadamia', 2, 2], ['lemon myrtle', 4, 2],
    ['bunya nut', 5, 2], ['kakadu plum', 5, 2], ['warrigal greens', 5, 3], ['bush tomato', 4, 2], ['davidson plum', 5, 3], ['riberry', 5, 3], ['pepperberry', 5, 3],
    ['yam daisy', 5, 4], ['honey ant', 4, 2], ['bogong moth', 5, 3], ['mulga seed', 5, 4], ['sea celery', 5, 4], ['desert raisin', 5, 3], ['crocodile', 2, 3], ['bush honey', 4, 3],
    ['billy tea', 3, 3, { reg: ['AU'] }], ['yabby', 3, 3],
  ],
  pacific_islands_food: [
    ['taro', 3, 1], ['poi', 3, 1, { g: 'taro paste' }], ['kokoda', 5, 1], ['palusami', 5, 1], ['breadfruit', 3, 1], ['kalua pig', 4, 1], ['umu', 5, 2], ['poke', 3, 1, { g: 'dish' }],
    ['lau lau', 5, 2], ['spam musubi', 3, 2], ['loco moco', 4, 2], ['haupia', 5, 2], ['coconut cream', 2, 3], ['cassava', 3, 3], ['sweet potato', 1, 4], ['kava', 3, 3],
    ['lu sipi', 5, 3], ['oka', 5, 3], ['panipopo', 5, 3], ['sapasui', 5, 4], ['rourou', 5, 4], ['pani keke', 5, 4], ['pineapple', 1, 4], ['plantain', 3, 4, { g: 'fruit' }], ['coconut crab', 4, 3],
    ['hangi', 4, 2, { reg: ['NZ'] }], ['lovo', 5, 3],
  ],
  peruvian_food: [
    ['ceviche', 2, 1], ['lomo saltado', 4, 1], ['anticuchos', 4, 1], ['causa', 5, 2, { g: 'potato dish' }], ['ají de gallina', 5, 2], ['pisco sour', 3, 1], ['papa a la huancaína', 5, 2],
    ['rocoto relleno', 5, 3], ['cuy', 4, 2], ['quinoa', 2, 3], ['aji amarillo', 5, 3], ['chicha morada', 5, 2], ['Inca Kola', 3, 2, B()], ['tiradito', 5, 3],
    ['arroz con pollo', 3, 3], ['pollo a la brasa', 4, 2], ['tacu tacu', 5, 3], ['alfajores', 4, 4], ['picarones', 5, 3], ['chifa', 5, 3], ['chuño', 5, 4],
    ['pachamanca', 5, 3], ['suspiro limeño', 5, 4], ['choclo', 5, 3], ['lúcuma', 5, 4],
  ],
  brazilian_food: [
    ['feijoada', 4, 1], ['pão de queijo', 4, 1], ['coxinha', 4, 1], ['moqueca', 5, 1], ['farofa', 5, 2], ['açaí', 3, 1], ['brigadeiro', 4, 1], ['churrasco', 3, 1],
    ['picanha', 4, 1], ['caipirinha', 3, 2], ['pastel', 4, 3, { g: 'snack' }], ['tapioca', 3, 3], ['vatapá', 5, 2], ['acarajé', 5, 2],
    ['guaraná', 3, 2], ['cachaça', 4, 2], ['rodízio', 4, 2], ['pamonha', 5, 3], ['quindim', 5, 3], ['beijinho', 5, 3], ['linguiça', 4, 3],
    ['galinhada', 5, 4], ['mandioca', 4, 3], ['empadão', 5, 4], ['paçoca', 5, 3],
  ],
  argentinian_food: [
    ['asado', 3, 1], ['empanadas', 2, 1], ['chimichurri', 3, 1], ['milanesa', 4, 1], ['choripán', 4, 1], ['locro', 5, 1], ['dulce de leche', 2, 2], ['alfajores', 4, 1],
    ['provoleta', 5, 2], ['matambre', 5, 3], ['bife de chorizo', 4, 2], ['parrilla', 4, 1], ['mate', 3, 2, { g: 'drink' }], ['fainá', 5, 4], ['humita', 5, 3],
    ['medialunas', 4, 3], ['tarta pascualina', 5, 4], ['revuelto gramajo', 5, 4], ['vitel toné', 5, 4], ['chinchulines', 5, 3], ['morcilla', 4, 3],
    ['fernet con coca', 5, 3], ['sandwich de miga', 5, 4], ['carbonada', 5, 4], ['pionono', 5, 5], ['mollejas', 5, 4],
  ],
  south_american_drinks: [
    ['mate', 3, 1, { g: 'drink' }], ['chicha morada', 5, 1], ['Inca Kola', 3, 1, B()], ['guaraná', 3, 1], ['tereré', 5, 2], ['yerba mate', 3, 1],
    ['Guaraná Antarctica', 4, 2, B()], ['mocochinchi', 5, 3], ['api morado', 5, 3], ['colada morada', 5, 3], ['aguapanela', 5, 3], ['sugarcane juice', 3, 4], ['caldo de cana', 5, 4],
    ['emoliente', 5, 4], ['Colombian coffee', 3, 4], ['mazamorra morada', 5, 4], ['chicha', 4, 3],
    ['batido', 5, 4], ['Kola Real', 5, 3, B()], ['mate de coca', 5, 3], ['maracuyá juice', 4, 4],
  ],
  mexican_food: [
    ['taco', 1, 1], ['burrito', 1, 1], ['nachos', 1, 1], ['quesadilla', 2, 1], ['guacamole', 1, 1], ['enchilada', 2, 1], ['fajitas', 2, 1], ['tamale', 2, 1],
    ['salsa', 1, 1, { g: 'sauce' }], ['tortilla', 1, 2], ['churros', 2, 2], ['pozole', 4, 2], ['mole', 3, 2, { g: 'sauce' }], ['chilaquiles', 4, 2], ['elote', 3, 2],
    ['tostada', 3, 2], ['carnitas', 3, 2], ['al pastor', 4, 2], ['carne asada', 3, 2], ['huevos rancheros', 3, 2], ['barbacoa', 4, 2], ['menudo', 4, 3], ['sopes', 5, 3],
    ['tlayuda', 5, 3], ['cochinita pibil', 5, 3], ['chiles en nogada', 5, 3], ['birria', 4, 2], ['tres leches', 3, 3], ['horchata', 3, 3], ['jalapeño', 2, 3], ['refried beans', 2, 2],
    ['chimichanga', 3, 2], ['pico de gallo', 3, 2], ['gordita', 4, 3],
  ],
  southern_food: [
    ['grits', 2, 1], ['fried chicken', 1, 1], ['hush puppies', 3, 1], ['collard greens', 3, 1], ['biscuits and gravy', 2, 1], ['cornbread', 2, 1], ['gumbo', 3, 1],
    ['jambalaya', 3, 1], ['sweet tea', 2, 1], ['pecan pie', 2, 1], ['okra', 2, 2], ['black-eyed peas', 3, 2], ['catfish', 2, 2, { g: 'fish' }], ['shrimp and grits', 3, 1],
    ['red velvet cake', 2, 2], ['banana pudding', 3, 2], ['pimento cheese', 4, 1], ['chicken fried steak', 3, 2], ['po\' boy', 3, 2], ['boudin', 5, 2], ['crawfish boil', 4, 2],
    ['fried green tomatoes', 3, 1], ['hoppin\' john', 5, 1], ['chitlins', 5, 2], ['peach cobbler', 2, 2], ['livermush', 5, 3], ['country ham', 3, 2], ['succotash', 4, 2], ['beignet', 3, 3],
    ['mint julep', 3, 3], ['redeye gravy', 5, 3], ['Brunswick stew', 4, 2], ['Moon Pie', 4, 3, B({ g: 'snack' })], ['pralines', 3, 3, { g: 'candy' }], ['chow-chow', 5, 4],
  ],
  canadian_food: [
    ['poutine', 2, 1], ['butter tarts', 3, 1], ['nanaimo bars', 3, 1], ['tourtière', 4, 1], ['bannock', 4, 1], ['maple syrup', 1, 2], ['back bacon', 3, 1], ['Montreal bagel', 4, 2],
    ['smoked meat', 3, 2], ['beavertails', 4, 1], ['Caesar', 4, 2, { g: 'cocktail' }], ['peameal bacon', 4, 2], ['Kraft Dinner', 4, 3, B()], ['Timbits', 4, 1, B()],
    ['ketchup chips', 4, 2], ['saskatoon berry', 5, 3], ['fiddleheads', 5, 3], ['Tim Hortons', 2, 2, B()], ['Coffee Crisp', 4, 2, B()],
    ['Halifax donair', 5, 3], ['flapper pie', 5, 4], ['pouding chômeur', 5, 4], ['maple taffy', 4, 2], ['ice wine', 3, 3], ['Hawkins Cheezies', 5, 4, B()],
    ['Jiggs dinner', 5, 3], ['bakeapple', 5, 4], ['Oh Henry', 4, 3, B({ g: 'candy bar' })], ['pemmican', 4, 3],
  ],
  coffee_words: [
    ['barista', 2, 1], ['espresso machine', 2, 2], ['coffee bean', 1, 1], ['decaf', 2, 1], ['arabica', 3, 1], ['robusta', 4, 1], ['crema', 4, 1], ['moka pot', 4, 1],
    ['dark roast', 2, 1], ['light roast', 2, 1], ['french press', 2, 1], ['pour over', 3, 1], ['grinder', 2, 2, { g: 'coffee' }], ['portafilter', 5, 2], ['tamper', 4, 2], ['cupping', 5, 2],
    ['single origin', 4, 2], ['aeropress', 4, 2], ['chemex', 4, 2], ['latte art', 3, 1], ['steam wand', 5, 2], ['drip coffee', 2, 2],
    ['percolator', 3, 2], ['demitasse', 4, 3], ['coffee filter', 1, 2], ['burr grinder', 4, 2], ['milk frother', 3, 2], ['roaster', 3, 2],
    ['caffeine', 1, 3], ['coffee grounds', 2, 2], ['siphon', 5, 3, { g: 'coffee' }], ['green coffee', 4, 3], ['first crack', 5, 4],
  ],
  soda_flavors: [
    ['cola', 1, 1], ['root beer', 1, 1], ['ginger ale', 1, 1], ['cream soda', 2, 1], ['orange soda', 1, 1], ['lemon-lime', 1, 1], ['grape soda', 1, 1], ['cherry', 1, 1, { g: 'fruit' }],
    ['vanilla', 1, 2], ['strawberry', 1, 2], ['lime', 1, 2, { g: 'fruit' }], ['black cherry', 2, 2], ['birch beer', 4, 2], ['sarsaparilla', 4, 2],
    ['grapefruit', 1, 2], ['peach', 1, 2, { g: 'fruit' }], ['watermelon', 1, 2], ['green apple', 2, 2], ['pineapple', 1, 3], ['tropical punch', 2, 2], ['blue raspberry', 3, 2], ['cotton candy', 2, 3],
    ['bubble gum', 2, 3], ['mango', 1, 3], ['coconut', 1, 3], ['lychee', 3, 3], ['elderflower', 3, 3], ['tamarind', 3, 4], ['passion fruit', 2, 3], ['dragon fruit', 3, 4],
    ['blood orange', 2, 3], ['cucumber', 1, 4], ['pomegranate', 2, 3], ['butterscotch', 3, 4], ['mint', 1, 4, { g: 'herb' }],
  ],
  red_wines: [
    ['merlot', 2, 1], ['pinot noir', 2, 1], ['shiraz', 2, 1, { g: 'wine' }], ['malbec', 3, 1], ['chianti', 3, 1, { g: 'wine' }], ['rioja', 3, 1], ['cabernet sauvignon', 2, 1],
    ['syrah', 3, 1], ['zinfandel', 3, 1], ['tempranillo', 4, 1], ['sangiovese', 4, 1], ['grenache', 4, 1], ['nebbiolo', 5, 1], ['barolo', 4, 1], ['beaujolais', 3, 2],
    ['burgundy', 3, 2, { g: 'wine' }], ['bordeaux', 3, 2, { g: 'wine' }], ['cabernet franc', 4, 1], ['petit verdot', 5, 2], ['carménère', 5, 2], ['gamay', 5, 2],
    ['montepulciano', 5, 2], ['primitivo', 5, 2], ['mourvèdre', 5, 2], ['pinotage', 4, 2], ['tannat', 5, 2], ['valpolicella', 5, 2], ['amarone', 5, 2], ['côtes du rhône', 4, 2],
    ['châteauneuf-du-pape', 5, 3], ['Brunello', 5, 2], ['red blend', 3, 3], ['lambrusco', 4, 3], ['dolcetto', 5, 2], ['barbera', 5, 2], ['port', 2, 4, { g: 'wine' }],
  ],
  white_wines: [
    ['chardonnay', 2, 1], ['sauvignon blanc', 2, 1], ['riesling', 3, 1], ['pinot grigio', 2, 1], ['chablis', 3, 1], ['sancerre', 4, 1], ['pinot gris', 3, 1], ['moscato', 3, 1],
    ['chenin blanc', 4, 1], ['viognier', 4, 1], ['gewürztraminer', 4, 1], ['albariño', 4, 1], ['semillon', 5, 1], ['muscadet', 5, 1], ['soave', 4, 1], ['verdejo', 5, 1],
    ['grüner veltliner', 5, 1], ['vermentino', 5, 1], ['picpoul', 5, 2], ['trebbiano', 5, 1], ['gavi', 5, 2], ['orvieto', 5, 2], ['frascati', 5, 2], ['white zinfandel', 3, 3],
    ['prosecco', 2, 3], ['liebfraumilch', 4, 2], ['sauternes', 5, 2], ['tokaji', 5, 3], ['vinho verde', 4, 2], ['white burgundy', 4, 2], ['muscat', 4, 2, { g: 'wine' }],
    ['pouilly-fuissé', 5, 2], ['white blend', 3, 3], ['Müller-Thurgau', 5, 3], ['marsanne', 5, 2], ['fiano', 5, 2], ['assyrtiko', 5, 2], ['torrontés', 5, 2],
  ],
  wine_words: [
    ['vintage', 2, 1, { g: 'wine' }], ['cork', 1, 2, { g: 'stopper material' }], ['sommelier', 3, 1, { g: 'wine' }], ['tannin', 3, 1], ['bouquet', 3, 1, { g: 'wine' }], ['decant', 3, 1], ['cellar', 1, 2],
    ['terroir', 4, 1], ['vineyard', 1, 1], ['corked', 3, 2, { g: 'wine' }], ['aroma', 2, 2], ['legs', 3, 3, { g: 'wine' }], ['varietal', 4, 2], ['appellation', 4, 2], ['vintner', 4, 1],
    ['viticulture', 4, 2], ['oenology', 5, 2, { al: [['enology', 'spelling', 5, 2, ['US']]] }], ['sediment', 3, 3], ['magnum', 3, 3, { g: 'bottle' }], ['aeration', 4, 3], ['dry', 1, 3, { g: 'wine' }],
    ['full-bodied', 3, 2], ['oaky', 3, 2], ['crisp', 2, 3, { g: 'wine' }], ['fruity', 2, 3], ['finish', 2, 3, { g: 'wine' }], ['harvest', 1, 3], ['crush', 2, 3, { g: 'wine' }], ['must', 3, 4, { g: 'wine' }],
    ['barrique', 5, 3], ['lees', 5, 3], ['fermentation', 3, 3], ['sulfites', 3, 3], ['carafe', 2, 3], ['cuvée', 5, 2], ['nose', 3, 2, { g: 'wine' }], ['grand cru', 4, 2], ['chateau', 2, 3],
  ],
  liqueurs: [
    ['amaretto', 3, 1], ['cointreau', 3, 1], ['limoncello', 3, 1], ['sambuca', 3, 1], ['chartreuse', 4, 1, { g: 'liqueur' }], ['triple sec', 3, 1], ['Baileys', 2, 1, B()], ['Kahlúa', 2, 1, B()],
    ['Grand Marnier', 3, 1, B()], ['Drambuie', 4, 1, B()], ['Frangelico', 4, 1, B()], ['Jägermeister', 3, 2, B()], ['Chambord', 4, 1, B()], ['crème de menthe', 4, 1], ['crème de cassis', 4, 1],
    ['Disaronno', 4, 1, B()], ['Midori', 3, 1, B()], ['Southern Comfort', 3, 2, B()], ['Benedictine', 5, 1], ['Galliano', 4, 1, B()], ['Campari', 3, 2, B({ g: 'aperitif' })], ['Aperol', 3, 2, B()],
    ['curaçao', 3, 1], ['schnapps', 3, 2], ['absinthe', 3, 3], ['advocaat', 4, 1], ['Tia Maria', 4, 1, B()], ['St-Germain', 5, 1, B()], ['Pimm\'s', 3, 3, B()], ['maraschino', 5, 1],
    ['sloe gin', 3, 2], ['Irish cream', 2, 1], ['Amarula', 5, 1, B()], ['Cynar', 5, 3, B()], ['crème de violette', 5, 2], ['Strega', 5, 2, B()], ['Malibu', 3, 2, B({ g: 'liqueur' })], ['Goldschläger', 5, 3, B()], ['Fireball', 3, 3, B({ g: 'liqueur' })],
  ],
  national_spirits: [
    ['ouzo', 3, 1], ['rakı', 4, 1], ['tequila', 1, 1], ['soju', 3, 1], ['pisco', 4, 1], ['cachaça', 4, 1], ['vodka', 1, 2], ['whisky', 1, 3], ['sake', 2, 1],
    ['mezcal', 3, 1], ['grappa', 3, 1], ['baijiu', 4, 1], ['arak', 4, 1], ['palinka', 5, 1], ['slivovitz', 4, 1], ['rakia', 5, 1], ['genever', 4, 2], ['aquavit', 4, 1],
    ['poitín', 5, 2], ['calvados', 4, 2], ['armagnac', 4, 2], ['rum', 1, 3, { g: 'drink' }], ['tsipouro', 5, 2], ['shochu', 4, 1], ['feni', 5, 2], ['cognac', 3, 2], ['gin', 1, 3, { g: 'drink' }],
    ['kirsch', 5, 2], ['mastika', 5, 3], ['chacha', 5, 2], ['bourbon', 2, 3, { g: 'whiskey' }], ['horilka', 5, 1], ['tuica', 5, 2], ['singani', 5, 2], ['aguardiente', 4, 2], ['umeshu', 5, 3],
  ],
};

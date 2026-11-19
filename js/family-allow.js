// Word-family pairs kept as separate answers on purpose, so the family checks (family-pair, family-kin) do not report them (DESIGN-entries.md 3.7).
// Key: smallerId|largerId|themeId for one theme, or smallerId|largerId for every theme. Add a line only after a person has decided the pair stays apart.
// Themes where the form is the point as a whole (male/female titles, tenses, anagrams) are marked familyOk on the theme instead.
export const FAMILY_OK = new Set([
  '3682|3686|sleep', // sleeplessness / sleepy in sleep: opposite senses; both in groups already (v398 keep apart)
  '3682|3686|sleep_words', // sleeplessness / sleepy in sleep words, as in sleep (v398)
  '966|39566|things_that_pop', // bubbly (champagne) / bubble in things that pop: different things; both in groups already (v398)
  '117|1502', // mansion / mane: not one family (v399 kin pilot); letters only
  '117|35499', // mansion / man: not one family (v399 kin pilot); letters only
  '167|4495', // belly / bell: not one family (v399 kin pilot); letters only
  '167|10729', // belly / bell: not one family (v399 kin pilot); letters only
  '167|28550', // belly / bell: not one family (v399 kin pilot); letters only
  '167|40219', // belly / bell: not one family (v399 kin pilot); letters only
  '167|46906', // belly / bell: not one family (v399 kin pilot); letters only
  '167|55788', // belly / bell: not one family (v399 kin pilot); letters only
  '178|516', // butt / butter: not one family (v399 kin pilot); letters only
  '204|33680', // copper / cop: not one family (v399 kin pilot); copper here is the metal; cop comes from copper only in its police sense
  '205|39269', // tin / tiny: not one family (v399 kin pilot); letters only
  '206|35526', // lead / leader: not one family (v399 kin pilot); lead here is the metal, not the lead of leader
  '316|463', // hammer / ham: not one family (v399 kin pilot); letters only
  '406|43719', // corn / corner: not one family (v399 kin pilot); letters only
  '516|26499', // butter / but: not one family (v399 kin pilot); letters only
  '566|970', // cookie / cook: not one family (v399 kin pilot); cookie is from Dutch koekje, not from cook (looks alike)
  '731|7132', // gravy / gravity: not one family (v399 kin pilot); letters only
  '731|21739', // gravy / grave: not one family (v399 kin pilot); letters only
  '993|23261', // bat / batteries: not one family (v399 kin pilot); letters only
  '993|42802', // bat / batter: not one family (v399 kin pilot); bat here is the animal; batter comes from the baseball bat
  '993|46608', // bat / battery: not one family (v399 kin pilot); letters only (battery is not from bat)
  '993|49768', // bat / battery: not one family (v399 kin pilot); letters only (battery is not from bat)
  '993|52270', // bat / battery: not one family (v399 kin pilot); letters only (battery is not from bat)
  '1442|64015', // kitty / kit: not one family (v399 kin pilot); kitty (cat) is not from kit
  '1444|14280', // bunny / bun: not one family (v399 kin pilot); letters only
  '1444|67291', // bunny / bun: not one family (v399 kin pilot); letters only
  '1629|24872', // pine / pins: not one family (v399 kin pilot); letters only
  '1695|25340', // daisy / day: not one family (v399 kin pilot); daisy (day's eye) is no longer felt as day
  '1701|10765', // poppy / pop: not one family (v399 kin pilot); letters only
  '1701|39580', // poppy / pop: not one family (v399 kin pilot); letters only
  '1769|7672', // grass / gray: not one family (v399 kin pilot); letters only
  '1769|9527', // grass / gray: not one family (v399 kin pilot); letters only
  '1913|15413', // cave / cavity: not one family (v399 kin pilot); cavity and cave share a Latin root, not felt
  '1983|6304', // shower / show: not one family (v399 kin pilot); letters only
  '2063|20848', // sand / sandals: not one family (v399 kin pilot); letters only
  '2064|4475', // clay / class: not one family (v399 kin pilot); letters only
  '2646|28703', // bus / busy: not one family (v399 kin pilot); letters only
  '3171|4370', // arm / army: not one family (v399 kin pilot); army is from Latin arma, not arm
  '3177|29227', // leg / legal: not one family (v399 kin pilot); letters only
  '3186|4951', // ear / earrings: not one family (v399 kin pilot); a compound (ear + ring): the Overlap rule's work
  '3186|21316', // ear / earring: not one family (v399 kin pilot); a compound (ear + ring): the Overlap rule's work
  '3186|28112', // ear / early: not one family (v399 kin pilot); letters only
  '3240|26656', // liver / lives: not one family (v399 kin pilot); letters only
  '3240|28783', // liver / live: not one family (v399 kin pilot); letters only
  '3240|29041', // liver / lived: not one family (v399 kin pilot); letters only
  '3665|19939', // nap / napkins: not one family (v399 kin pilot); letters only
  '4198|21174', // arrest / arr: not one family (v399 kin pilot); letters only
  '4198|48172', // arrest / arrive: not one family (v399 kin pilot); letters only
  '4218|34834', // fine / final: not one family (v399 kin pilot); fine (penalty) and final share Latin finis, not felt
  '4218|44340', // fine / final: not one family (v399 kin pilot); fine (penalty) and final share Latin finis, not felt
  '4302|28476', // holy / hole: not one family (v399 kin pilot); letters only
  '4302|50346', // holy / hole: not one family (v399 kin pilot); letters only
  '4370|41090', // army / arm: not one family (v399 kin pilot); army is from Latin arma, not arm
  '4373|24211', // soldier / sold: not one family (v399 kin pilot); letters only
  '4475|6501', // class / classic: not one family (v399 kin pilot); classic is from Latin classicus, not felt as class
  '4475|10771', // class / classical: not one family (v399 kin pilot); classic is from Latin classicus, not felt as class
  '4475|12010', // class / clay: not one family (v399 kin pilot); letters only
  '4475|46002', // class / clay: not one family (v399 kin pilot); letters only
  '5241|29033', // tennis / ten: not one family (v399 kin pilot); letters only
  '5713|27316', // chess / cheers: not one family (v399 kin pilot); letters only
  '5713|32666', // chess / cheerful: not one family (v399 kin pilot); letters only
  '5713|44081', // chess / cheer: not one family (v399 kin pilot); letters only
  '5853|15799', // pottery / potty: not one family (v399 kin pilot); potty and pottery both come from pot, but are not look-alikes
  '5856|25765', // drawing / drawer: not one family (v399 kin pilot); drawer (furniture) is another word
  '6304|16272', // show / shower: not one family (v399 kin pilot); letters only
  '6385|32896', // series / serious: not one family (v399 kin pilot); letters only
  '6523|28605', // comedy / come: not one family (v399 kin pilot); letters only
  '6523|35065', // comedy / comment: not one family (v399 kin pilot); letters only
  '6523|42419', // comedy / comment: not one family (v399 kin pilot); letters only
  '6859|14585', // dig / digestion: not one family (v399 kin pilot); letters only
  '6989|28843', // fairy / fair: not one family (v399 kin pilot); fairy is not from fair
  '6993|19810', // potion / pot: not one family (v399 kin pilot); letters only
  '6993|25482', // potion / pot: not one family (v399 kin pilot); letters only
  '6993|25788', // potion / pot: not one family (v399 kin pilot); letters only
  '6993|29129', // potion / pots: not one family (v399 kin pilot); letters only
  '7108|50931', // star / staring: not one family (v399 kin pilot); letters only
  '7132|21739', // gravity / grave: not one family (v399 kin pilot); grave (tomb) is not from Latin gravis
  '7389|31529', // pump / pumpkins: not one family (v399 kin pilot); letters only
  '7666|14385', // pink / pinky: not one family (v399 kin pilot); pinky is from Dutch pink (small), not the color
  '8358|40416', // beak / beaker: not one family (v399 kin pilot); letters only
  '8833|34834', // fin / final: not one family (v399 kin pilot); letters only
  '8833|44340', // fin / final: not one family (v399 kin pilot); letters only
  '9128|29227', // leg / legal: not one family (v399 kin pilot); letters only
  '9277|25473', // boxer / box: not one family (v399 kin pilot); the dog is named after boxing, not box
  '10191|26418', // hiss / his: not one family (v399 kin pilot); letters only
  '10707|16373', // string / stress: not one family (v399 kin pilot); letters only
  '10773|41729', // metal / meter: not one family (v399 kin pilot); letters only
  '10773|49818', // metal / meter: not one family (v399 kin pilot); letters only
  '11011|24074', // bass / basement: not one family (v399 kin pilot); letters only
  '11011|41091', // bass / base: not one family (v399 kin pilot); letters only
  '11011|67108', // bass / basis: not one family (v399 kin pilot); letters only
  '11070|24408', // brass / bra: not one family (v399 kin pilot); letters only
  '12071|56704', // selfie / selfish: not one family (v399 kin pilot); letters only
  '14329|28634', // scar / scared: not one family (v399 kin pilot); letters only
  '14385|50340', // pinky / pink: not one family (v399 kin pilot); as pink/pinky
  '14585|30752', // digestion / dig: not one family (v399 kin pilot); letters only
  '14585|67334', // digestion / dig: not one family (v399 kin pilot); letters only
  '14652|31584', // stare / stars: not one family (v399 kin pilot); letters only
  '14817|31657', // rub / ruby: not one family (v399 kin pilot); letters only
  '15383|28262', // plaster / plastic: not one family (v399 kin pilot); letters only
  '15594|56674', // honey / honest: not one family (v399 kin pilot); letters only
  '15598|28679', // dates / dated: not one family (v399 kin pilot); dated (old) is not from the fruit
  '15598|32431', // dates / dating: not one family (v399 kin pilot); dating is not from the fruit
  '15841|40293', // lunge / lungs: not one family (v399 kin pilot); letters only
  '16373|23267', // stress / string: not one family (v399 kin pilot); letters only
  '17018|67109', // cry / crisis: not one family (v399 kin pilot); letters only
  '18924|32383', // broth / brother: not one family (v399 kin pilot); letters only
  '20016|41530', // bill / billion: not one family (v399 kin pilot); billion is not from bill
  '20848|38790', // sandals / sand: not one family (v399 kin pilot); letters only
  '20848|46041', // sandals / sanding: not one family (v399 kin pilot); letters only
  '21174|48172', // arr / arrive: not one family (v399 kin pilot); letters only
  '23150|56684', // car / caring: not one family (v399 kin pilot); letters only
  '23261|42802', // batteries / batter: not one family (v399 kin pilot); letters only
  '23261|42803', // batteries / bat: not one family (v399 kin pilot); letters only
  '23866|31144', // tidy / tide: not one family (v399 kin pilot); tidy (from tide) is no longer felt as tide
  '24072|26448', // attic / at: not one family (v399 kin pilot); letters only
  '24074|67108', // basement / basis: not one family (v399 kin pilot); letters only
  '24406|25473', // boxers / box: not one family (v399 kin pilot); boxers (shorts) are named after boxing, not box
  '24408|31727', // bra / brass: not one family (v399 kin pilot); letters only
  '25302|41435', // summer / sum: not one family (v400 kin pass)
  '25449|26236', // Aries / Arial: not one family (v400 kin pass)
  '25477|39269', // tin / tiny: not one family (v400 kin pass)
  '26279|28605', // comic / come: not one family (v400 kin pass)
  '26279|35065', // comic / comment: not one family (v400 kin pass)
  '26279|42419', // comic / comment: not one family (v400 kin pass)
  '26418|50902', // his / hissing: not one family (v400 kin pass)
  '26450|28392', // for / forest: not one family (v400 kin pass)
  '26504|28392', // for / forest: not one family (v400 kin pass)
  '26656|28783', // lives / live: not one family (v400 kin pass); lives here is the plural of life; live is the verb
  '26656|29041', // lives / lived: not one family (v400 kin pass); lives here is the plural of life; lived is the verb
  '28112|40259', // early / ears: not one family (v400 kin pass)
  '28327|33680', // copy / cop: not one family (v400 kin pass)
  '28605|35065', // come / comment: not one family (v400 kin pass)
  '28605|42419', // come / comment: not one family (v400 kin pass)
  '28717|28841', // career / care: not one family (v400 kin pass)
  '28717|56684', // career / caring: not one family (v400 kin pass)
  '28793|48491', // polish / pole: not one family (v400 kin pass)
  '29033|29268', // ten / tension: not one family (v400 kin pass)
  '29227|51617', // legal / legs: not one family (v400 kin pass)
  '31462|41435', // summery / sum: not one family (v400 kin pass)
  '31529|46757', // pumpkins / pump: not one family (v400 kin pass)
  '31584|50931', // stars / staring: not one family (v400 kin pass)
  '32456|56674', // honey / honest: not one family (v400 kin pass)
  '33295|41530', // bill / billion: not one family (v400 kin pass); billion is not from bill
  '33857|41530', // bill / billion: not one family (v400 kin pass); billion is not from bill
  '33937|34758', // penny / pen: not one family (v400 kin pass)
  '34525|56675', // general / generous: not one family (v400 kin pass)
  '34834|39327', // final / fine: not one family (v400 kin pass); fine and final share Latin finis, not felt
  '35412|35499', // manners / man: not one family (v400 kin pass)
  '38607|56674', // honey / honest: not one family (v400 kin pass)
  '38847|50931', // star / staring: not one family (v400 kin pass)
  '39327|44340', // fine / final: not one family (v400 kin pass); fine and final share Latin finis, not felt
  '41091|67108', // base / basis: not one family (v400 kin pass); consistency (was K?, chunk 01:164): basis is not a form of base; the Greek root is not felt (as 03:255, 03:296)
  '41673|45616', // survey / survival: not one family (v400 kin pass)
  '42802|46608', // batter / battery: not one family (v400 kin pass); battery is not from batter
  '42802|49768', // batter / battery: not one family (v400 kin pass); battery is not from batter
  '42802|52270', // batter / battery: not one family (v400 kin pass); battery is not from batter
  '42803|46608', // bat / battery: not one family (v400 kin pass); battery is not from bat
  '42803|49768', // bat / battery: not one family (v400 kin pass); battery is not from bat
  '42803|52270', // bat / battery: not one family (v400 kin pass); battery is not from bat
  '45784|50931', // star / staring: not one family (v400 kin pass)
  '149|67064', // cow / cower: not one family (v400 kin pass)
  '170|12547', // hip / hippie: not one family (v400 kin pass); hippie is from hip (cool), not the body part
  '201|67126', // iron / ironic: not one family (v400 kin pass)
  '359|28679', // date / dated: not one family (v400 kin pass); dated (old) is not from the fruit
  '359|32431', // date / dating: not one family (v400 kin pass); dating is not from the fruit
  '405|39350', // radish / rad: not one family (v400 kin pass)
  '406|48504', // corn / corner: not one family (v400 kin pass)
  '463|50259', // ham / hammer: not one family (v400 kin pass)
  '463|50375', // ham / hammer: not one family (v400 kin pass)
  '463|51601', // ham / hammer: not one family (v400 kin pass)
  '468|4079', // cod / coder: not one family (v400 kin pass)
  '553|24622', // loaf / loafers: not one family (v400 kin pass); loafers (shoes) are from loafer (idler), not loaf
  '553|40221', // loaf / loafer: not one family (v400 kin pass); loafer (shoe) is from loafer (idler), not loaf
  '662|33937', // penne / penny: not one family (v400 kin pass)
  '970|42407', // cook / cookie: not one family (v400 kin pass); cookie (computer) is not from cook (as pilot cookie/cook)
  '992|12827', // rat / ratings: not one family (v400 kin pass)
  '992|21469', // rat / rationing: not one family (v400 kin pass)
  '992|34563', // rat / ration: not one family (v400 kin pass)
  '1014|4214', // badger / badge: not one family (v400 kin pass)
  '1226|24074', // bass / basement: not one family (v400 kin pass)
  '1226|41091', // bass / base: not one family (v400 kin pass)
  '1226|67108', // bass / basis: not one family (v400 kin pass)
  '1289|17412', // coral / core: not one family (v400 kin pass)
  '1289|31898', // coral / core: not one family (v400 kin pass)
  '1349|28012', // moth / mother: not one family (v400 kin pass)
  '1440|33105', // cat / caterer: not one family (v400 kin pass)
  '1444|11901', // bunny / bun: not one family (v400 kin pass)
  '1463|34136', // stallion / stall: not one family (v400 kin pass)
  '1701|56634', // poppy / pop: not one family (v400 kin pass)
  '1707|11254', // pansy / pan: not one family (v400 kin pass)
  '1707|28035', // pansy / pan: not one family (v400 kin pass)
  '1769|53057', // grass / graying: not one family (v400 kin pass)
  '1908|13530', // river / rival: not one family (v400 kin pass)
  '1928|39448', // gorge / gorgeous: not one family (v400 kin pass)
  '1932|13383', // cove / cover: not one family (v400 kin pass)
  '2027|16329', // muggy / mug: not one family (v400 kin pass)
  '2027|25506', // muggy / mug: not one family (v400 kin pass)
  '2027|48818', // muggy / mug: not one family (v400 kin pass)
  '2063|28213', // sand / sandal: not one family (v400 kin pass)
  '2064|41114', // clay / class: not one family (v400 kin pass)
  '2064|42302', // clay / class: not one family (v400 kin pass)
  '2398|4029', // compass / compassion: not one family (v400 kin pass)
  '2498|29152', // fort / forty: not one family (v400 kin pass)
  '2711|28708', // jet / jetty: not one family (v400 kin pass)
  '2944|7493', // quest / question: not one family (v400 kin pass); question and quest share a root, not felt
  '3177|6644', // leg / legion: not one family (v400 kin pass)
  '3200|40021', // shin / shiny: not one family (v400 kin pass)
  '3240|11102', // liver / lively: not one family (v400 kin pass)
  '3250|4139', // artery / artist: not one family (v400 kin pass)
  '3250|34726', // artery / art: not one family (v400 kin pass)
  '3278|6148', // cell / cellist: not one family (v400 kin pass)
  '3450|31198', // surgery / surge: not one family (v400 kin pass)
  '3450|49823', // surgery / surge: not one family (v400 kin pass)
  '3467|6814', // treatment / treaty: not one family (v400 kin pass); treatment and treaty both from treat, not felt
  '3512|4408', // medic / medal: not one family (v400 kin pass)
  '3547|25210', // twins / twine: not one family (v400 kin pass)
  '3826|26416', // mineral / mine: not one family (v400 kin pass)
  '3836|6007', // organic / organ: not one family (v400 kin pass)
  '3836|40871', // organic / organ: not one family (v400 kin pass); organic (food) is not felt as organ
  '3845|34579', // portion / port: not one family (v400 kin pass)
  '3901|30629', // buddy / bud: not one family (v400 kin pass); bud here is the plant; buddy comes from bud only in its friend sense
  '3919|38309', // ally / alley: not one family (v400 kin pass)
  '4016|11254', // panic / pan: not one family (v400 kin pass)
  '4016|28035', // panic / pan: not one family (v400 kin pass)
  '4019|10394', // fury / fur: not one family (v400 kin pass)
  '4029|42072', // compassion / compass: not one family (v400 kin pass)
  '4131|48175', // journalist / journey: not one family (v400 kin pass)
  '4148|26416', // miner / mine: not one family (v400 kin pass)
  '4207|33290', // police / policy: not one family (v400 kin pass)
  '4214|31583', // badge / badgers: not one family (v400 kin pass)
  '4218|43346', // fine / fins: not one family (v400 kin pass)
  '4218|44366', // fine / finalist: not one family (v400 kin pass)
  '4218|46056', // fine / finish: not one family (v400 kin pass)
  '4302|29953', // holy / holly: not one family (v400 kin pass)
  '4373|49772', // soldier / solder: not one family (v400 kin pass)
  '4475|38791', // class / clay: not one family (v400 kin pass)
  '4492|35136', // recess / receiver: not one family (v400 kin pass)
  '4492|49537', // recess / receiver: not one family (v400 kin pass)
  '5241|27328', // tennis / tenner: not one family (v400 kin pass)
  '5248|6550', // archery / arch: not one family (v400 kin pass)
  '5248|7395', // archery / arch: not one family (v400 kin pass)
  '5248|14214', // archery / arch: not one family (v400 kin pass)
  '5248|38974', // archery / arch: not one family (v400 kin pass)
  '5250|29548', // bowling / bowler: not one family (v400 kin pass); bowler hat is named after the hatters Bowler, not bowling
  '5345|28022', // skiing / sky: not one family (v400 kin pass)
  '5395|12303', // boxing / box: not one family (v400 kin pass)
  '5395|30070', // boxing / box: not one family (v400 kin pass)
  '5618|15413', // caving / cavity: not one family (v400 kin pass)
  '5713|32505', // chess / cheers: not one family (v400 kin pass)
  '5849|28812', // sewing / sewer: not one family (v400 kin pass); sewer here is the drain, not one who sews
  '6061|42367', // verse / version: not one family (v400 kin pass); letters only
  '6143|24074', // bassist / basement: not one family (v400 kin pass); letters only
  '6143|41091', // bassist / base: not one family (v400 kin pass); letters only
  '6143|67108', // bassist / basis: not one family (v400 kin pass); letters only
  '6148|65783', // cellist / cell: not one family (v400 kin pass); cellist is from cello, not cell
  '6363|24247', // movie / movers: not one family (v400 kin pass); movie is from moving picture, not felt as movers
  '6456|27982', // story / store: not one family (v400 kin pass); letters only
  '6457|35564', // author / authority: not one family (v400 kin pass); authority is not felt as author
  '6501|41114', // classic / class: not one family (v400 kin pass); classic is from Latin classicus, not felt as class
  '6501|42302', // classic / class: not one family (v400 kin pass); classic is from Latin classicus, not felt as class
  '6523|42308', // comedy / comment: not one family (v400 kin pass); letters only
  '6550|20733', // arch / archer: not one family (v400 kin pass); archer is from Latin arcus (bow), not felt as arch
  '6553|67122', // tower / tow: not one family (v400 kin pass); letters only
  '6644|9128', // legion / leg: not one family (v400 kin pass); letters only
  '6644|51617', // legion / legs: not one family (v400 kin pass); letters only
  '6789|21315', // booty / boots: not one family (v400 kin pass); letters only
  '6789|27381', // booty / boot: not one family (v400 kin pass); booty (plunder) is not from boot
  '6991|16915', // wand / wander: not one family (v400 kin pass); letters only
  '6996|7614', // curse / cursive: not one family (v400 kin pass); letters only
  '7193|39117', // scale / scaly: not one family (v400 kin pass); consistency (was K?, chunk 02:66): scaly is derived from scale (fish, skin); this scale (weighing, map, music) is an unrelated word (rule: derived word vs base in another sense)
  '7271|14199', // browser / brow: not one family (v400 kin pass); browse is not from brow
  '7277|49162', // bug / buggy: not one family (v400 kin pass); buggy (carriage) is not from bug
  '7287|39202', // bit / bitter: not one family (v400 kin pass); letters only
  '7395|20733', // arch / archer: not one family (v400 kin pass); archer is from Latin arcus (bow), not felt as arch
  '7407|10707', // stress / string: not one family (v400 kin pass); letters only
  '7407|23267', // stress / string: not one family (v400 kin pass); letters only
  '7409|29033', // tension / ten: not one family (v400 kin pass); letters only
  '7614|32884', // cursive / curious: not one family (v400 kin pass); letters only
  '7688|17412', // coral / core: not one family (v400 kin pass); letters only
  '7688|31898', // coral / core: not one family (v400 kin pass); letters only
  '8057|26093', // colony / colon: not one family (v400 kin pass); letters only
  '8359|41530', // bill / billion: not one family (v400 kin pass); billion is not from bill
  '8833|44366', // fin / finalist: not one family (v400 kin pass); letters only
  '8833|46056', // fin / finish: not one family (v400 kin pass); letters only
  '9277|12303', // boxer / box: not one family (v400 kin pass); the dog is named after boxing, not box
  '9277|30070', // boxer / box: not one family (v400 kin pass); the dog is named after boxing, not box
  '9281|39355', // terrier / terrible: not one family (v400 kin pass); letters only
  '9926|17412', // coral / core: not one family (v400 kin pass); letters only
  '9926|31898', // coral / core: not one family (v400 kin pass); letters only
  '10148|40598', // den / density: not one family (v400 kin pass); letters only
  '10205|11070', // bray / brass: not one family (v400 kin pass); letters only
  '10205|24408', // bray / bra: not one family (v400 kin pass); letters only
  '10205|31727', // bray / brass: not one family (v400 kin pass); letters only
  '10242|26093', // colony / colon: not one family (v400 kin pass); letters only
  '10347|41530', // bill / billion: not one family (v400 kin pass); billion is not from bill
  '10394|32725', // fur / furious: not one family (v400 kin pass); letters only
  '10403|11823', // spines / spin: not one family (v400 kin pass); letters only
  '10403|16863', // spines / spin: not one family (v400 kin pass); letters only
  '10403|43559', // spines / spin: not one family (v400 kin pass); letters only
  '10771|41114', // classical / class: not one family (v400 kin pass); classical is from Latin classicus, not felt as class
  '10771|42302', // classical / class: not one family (v400 kin pass); classical is from Latin classicus, not felt as class
  '10773|46796', // metal / meter: not one family (v400 kin pass); letters only
  '10958|25189', // flow / flowers: not one family (v400 kin pass); letters only
  '10958|28286', // flow / flower: not one family (v400 kin pass); letters only
  '10958|45580', // flow / flower: not one family (v400 kin pass); letters only
  '11011|40486', // bass / base: not one family (v400 kin pass); letters only
  '11011|44076', // bass / base: not one family (v400 kin pass); letters only
  '11491|67878', // Cher / Cherry: not one family (v400 kin pass); letters only
  '11824|23352', // jump / jumpers: not one family (v400 kin pass); jumper (sweater) is not felt as jump
  '12010|41114', // clay / class: not one family (v400 kin pass); letters only
  '12010|42302', // clay / class: not one family (v400 kin pass); letters only
  '12017|25361', // eraser / era: not one family (v400 kin pass); letters only
  '12303|24406', // box / boxers: not one family (v400 kin pass); boxers (shorts) are named after boxing, not box
  '12542|34525', // genie / general: not one family (v400 kin pass); letters only
  '12542|56675', // genie / generous: not one family (v400 kin pass); letters only
  '12624|41109', // anime / animals: not one family (v400 kin pass); anime is from animation, not felt as animals
  '12827|20951', // ratings / rats: not one family (v400 kin pass); letters only
  '13504|40599', // pow / power: not one family (v400 kin pass); letters only
  '13931|26093', // colonial / colon: not one family (v400 kin pass); letters only
  '14214|20733', // arch / archer: not one family (v400 kin pass); archer is from Latin arcus (bow), not felt as arch
  '14457|34182', // bleed / bless: not one family (v400 kin pass); letters only
  '14585|42935', // digestion / dig: not one family (v400 kin pass); letters only
  '14810|39649', // squishy / squeal: not one family (v400 kin pass); letters only
  '14813|67290', // pat / patty: not one family (v400 kin pass); letters only
  '14817|38557', // rub / ruby: not one family (v400 kin pass); letters only
  '14833|26321', // numb / number: not one family (v400 kin pass); letters only
  '14984|50292', // cut / cutie: not one family (v400 kin pass); letters only
  '14990|26765', // graze / grazie: not one family (v400 kin pass); letters only
  '15045|26321', // numbness / number: not one family (v400 kin pass); letters only
  '15594|67486', // honey / honesty: not one family (v400 kin pass); letters only
  '15984|31529', // pump / pumpkins: not one family (v400 kin pass); letters only
  '16373|42300', // stress / string: not one family (v400 kin pass); letters only
  '16651|67126', // iron / ironic: not one family (v400 kin pass); letters only
  '16860|29360', // skip / skipper: not one family (v400 kin pass); skipper is from Dutch schipper, not skip
  '17002|24403', // pant / panties: not one family (v400 kin pass); letters only
  '17412|31674', // core / coral: not one family (v400 kin pass); letters only
  '18827|27634', // jam / jammies: not one family (v400 kin pass); jammies is from pajamas, not jam
  '18859|34964', // caper / cap: not one family (v400 kin pass); letters only
  '19684|45646', // lager / lag: not one family (v400 kin pass); letters only
  '20138|29548', // bowl / bowler: not one family (v400 kin pass); the bowler hat is named after Bowler, not bowl
  '20243|26348', // pasty / past: not one family (v400 kin pass); letters only
  '20732|41487', // miller / million: not one family (v400 kin pass); letters only
  '20733|38974', // archer / arch: not one family (v400 kin pass); archer is from Latin arcus (bow), not felt as arch
  '20761|38222', // count / counter: not one family (v400 kin pass); consistency (was K?, chunk 02:389): count (noble, Latin comes) is another word than the count of counter
  '20848|23681', // sandals / sander: not one family (v400 kin pass); letters only
  '20848|29937', // sandals / sandy: not one family (v400 kin pass); letters only
  '20848|42962', // sandals / sand: not one family (v400 kin pass); letters only
  '20951|21469', // rats / rationing: not one family (v400 kin pass); letters only
  '20951|34563', // rats / ration: not one family (v400 kin pass); letters only
  '23150|28261', // car / carrier: not one family (v400 kin pass); letters only
  '23150|41623', // car / carry: not one family (v400 kin pass); letters only
  '23150|64021', // car / carrier: not one family (v400 kin pass); letters only
  '23153|27355', // ladder / lad: not one family (v400 kin pass); letters only
  '23266|33870', // pens / pension: not one family (v400 kin pass); letters only
  '23350|48361', // suits / suite: not one family (v400 kin pass); suite (hotel) is not felt as suit
  '23352|45725', // jumpers / jump: not one family (v400 kin pass); jumper (sweater) is not felt as jump
  '23352|67309', // jumpers / jump: not one family (v400 kin pass); jumper (sweater) is not felt as jump
  '23705|23856', // washer / wash: not one family (v400 kin pass); consistency (was K?, chunk 02:431): washer (ring) is not from wash (rule, chunk 09: washer/wash)
  '23783|23856', // washer / wash: not one family (v400 kin pass); consistency (was K?, chunk 02:433): washer (ring) is not from wash (rule, chunk 09: washer/wash)
  '23834|29601', // mop / moped: not one family (v400 kin pass); letters only
  '23856|40232', // wash / washer: not one family (v400 kin pass); consistency (was K?, chunk 02:435): washer (ring) is not from wash (rule, chunk 09: washer/wash)
  '23861|48491', // polish / pole: not one family (v400 kin pass); letters only
  '23866|49751', // tidy / tidal: not one family (v400 kin pass); tidal is from tide, not tidy
  '23941|67126', // ironing / ironic: not one family (v400 kin pass); letters only
  '24034|28262', // plaster / plastic: not one family (v400 kin pass); plaster and plastic share a Greek root, not felt
  '24074|28779', // basement / bass: not one family (v400 kin pass); letters only
  '24074|39682', // basement / bass: not one family (v400 kin pass); letters only
  '24211|49772', // sold / solder: not one family (v400 kin pass); letters only
  '24406|30070', // boxers / box: not one family (v400 kin pass); boxers (shorts) are named after boxing, not box
  '24408|38688', // bra / brass: not one family (v400 kin pass); letters only
  '24627|31529', // pumps / pumpkins: not one family (v400 kin pass); letters only
  '25476|30962', // can / canal: not one family (v400 kin pass); letters only
  '25498|44272', // pitcher / pitch: not one family (v400 kin pass); the pitcher here is the jug, not from pitch (only the baseball pitcher is)
  '25760|67126', // iron / ironic: not one family (v400 kin pass); letters only
  '26093|32176', // colon / colony: not one family (v400 kin pass); letters only
  '26093|38492', // colon / colony: not one family (v400 kin pass); letters only
  '26236|41178', // Arial / Aries: not one family (v400 kin pass); letters only
  '26279|42308', // comic / comment: not one family (v400 kin pass); letters only
  '26410|34869', // they / thesis: not one family (v400 kin pass); letters only
  '26416|33291', // mine / minister: not one family (v400 kin pass); letters only
  '26416|34205', // mine / minister: not one family (v400 kin pass); letters only
  '26434|34869', // these / thesis: not one family (v400 kin pass); letters only
  '26831|27965', // tres / tree: not one family (v400 kin pass); letters only
  '26831|64321', // tres / tree: not one family (v400 kin pass); letters only
  '27228|32181', // lit / litter: not one family (v400 kin pass); letters only
  '27383|28262', // plaster / plastic: not one family (v400 kin pass); plaster and plastic share a Greek root, not felt
  '27401|29202', // lassie / laser: not one family (v400 kin pass); letters only
  '27610|28683', // dang / danger: not one family (v400 kin pass); letters only
  '27908|30962', // can / canal: not one family (v400 kin pass); letters only
  '28213|38790', // sandal / sand: not one family (v400 kin pass); letters only
  '28213|46041', // sandal / sanding: not one family (v400 kin pass); letters only
  '28262|32957', // plastic / plasterer: not one family (v400 kin pass); plastic and plasterer share a Greek root, not felt
  '28296|56719', // pet / petty: not one family (v400 kin pass); letters only
  '28298|39894', // charity / char: not one family (v400 kin pass); letters only
  '28476|29953', // hole / holly: not one family (v400 kin pass); letters only
  '28605|42308', // come / comment: not one family (v400 kin pass); letters only
  '28708|34600', // jetty / jet: not one family (v400 kin pass); jetty and jet share French jeter, not felt
  '28764|32896', // serial / serious: not one family (v400 kin pass); letters only
  '28766|58099', // cent / center: not one family (v400 kin pass); letters only
  '28779|41091', // bass / base: not one family (v400 kin pass); letters only
  '28779|67108', // bass / basis: not one family (v400 kin pass); letters only
  '28793|33290', // polish / policy: not one family (v400 kin pass); letters only
  '28793|46926', // polish / pole: not one family (v400 kin pass); letters only
  '29005|46977', // stats / station: not one family (v400 kin pass); letters only
  '29042|39211', // deliver / delicious: not one family (v400 kin pass); letters only
  '29225|34156', // earnest / earn: not one family (v400 kin pass); letters only
  '29244|40535', // rustic / rusting: not one family (v400 kin pass); letters only
  '29657|29929', // Oliver / Olive: not one family (v400 kin pass); Oliver is linked to olive only by old etymology, not felt as a pet form
  '29953|50346', // holly / hole: not one family (v400 kin pass); letters only
  '31674|31898', // coral / core: not one family (v400 kin pass); letters only
  '31788|33291', // mine / minister: not one family (v400 kin pass); letters only
  '31788|34205', // mine / minister: not one family (v400 kin pass); letters only
  '32456|67486', // honey / honesty: not one family (v400 kin pass); letters only
  '32668|33667', // pleased / plea: not one family (v400 kin pass); pleased and plea share Latin placere, not felt
  '32803|34832', // passion / pass: not one family (v400 kin pass); letters only
  '33290|48491', // policy / pole: not one family (v400 kin pass); letters only
  '33375|38222', // countess / counter: not one family (v400 kin pass); counter is from count (verb), not the noble count of countess
  '33680|38639', // cop / copper: not one family (v400 kin pass); copper here is the color/metal; cop comes from copper only in its police sense (pilot)
  '33732|40591', // motive / motion: not one family (v400 kin pass); motive and motion share a Latin root, not felt
  '33837|49162', // bug / buggy: not one family (v400 kin pass); buggy (carriage) is not from bug
  '33870|34758', // pension / pen: not one family (v400 kin pass); letters only
  '33918|46977', // statement / station: not one family (v400 kin pass); letters only
  '34525|40867', // general / gene: not one family (v400 kin pass); letters only
  '34579|47831', // port / porter: not one family (v400 kin pass); porter (carrier) is from Latin portare, not from port
  '34834|43346', // final / fins: not one family (v400 kin pass); letters only
  '34834|43404', // final / fin: not one family (v400 kin pass); letters only
  '34834|46056', // final / finish: not one family (v400 kin pass); final and finish share Latin finis, not felt
  '34834|46962', // final / fine: not one family (v400 kin pass); fine and final share Latin finis, not felt (pilot)
  '35263|46977', // static / station: not one family (v400 kin pass); letters only
  '35526|38675', // leader / lead: not one family (v400 kin pass); lead here is the metal color, not the lead of leader (pilot)
  '38607|67486', // honey / honesty: not one family (v400 kin pass); letters only
  '39117|49966', // scaly / scales: not one family (v400 kin pass); consistency (was K?, chunk 03:212): scaly is derived from scale (fish, skin); this scale (weighing, map, music) is an unrelated word (rule: derived word vs base in another sense)
  '39327|43346', // fine / fins: not one family (v400 kin pass); letters only
  '39327|44366', // fine / finalist: not one family (v400 kin pass); letters only
  '39327|46056', // fine / finish: not one family (v400 kin pass); fine and finish share Latin finis, not felt
  '39524|40218', // train / trainer: not one family (v400 kin pass); train here is the vehicle; trainer is from the verb (pilot training/train N?)
  '39524|63746', // train / trainer: not one family (v400 kin pass); train here is the vehicle; trainer is from the verb (pilot training/train N?)
  '39682|41091', // bass / base: not one family (v400 kin pass); letters only
  '39682|67108', // bass / basis: not one family (v400 kin pass); letters only
  '40025|48491', // polished / pole: not one family (v400 kin pass); letters only
  '40486|67108', // base / basis: not one family (v400 kin pass); base and basis share a Greek root, not felt
  '40867|56675', // gene / generous: not one family (v400 kin pass); letters only
  '41114|46002', // class / clay: not one family (v400 kin pass); letters only
  '41487|55952', // million / mille: not one family (v400 kin pass); million and mille share Latin mille, but in different languages
  '41554|45124', // angle / angler: not one family (v400 kin pass); angler is from angle (hook), not the geometry angle
  '42302|46002', // class / clay: not one family (v400 kin pass); letters only
  '42379|55985', // settings / sette: not one family (v400 kin pass); letters only
  '43346|44340', // fins / final: not one family (v400 kin pass); letters only
  '43404|44340', // fin / final: not one family (v400 kin pass); letters only
  '44076|67108', // base / basis: not one family (v400 kin pass); base and basis share a Greek root, not felt
  '44340|46056', // final / finish: not one family (v400 kin pass); final and finish share Latin finis, not felt
  '44340|46962', // final / fine: not one family (v400 kin pass); fine and final share Latin finis, not felt (pilot)
  '45526|50292', // cut / cutie: not one family (v400 kin pass); letters only (cutie is from cute)
  '45959|46631', // vanish / van: not one family (v400 kin pass); letters only
  '46658|56030', // steer / steal: not one family (v400 kin pass); letters only
  '48491|57572', // pole / polishing: not one family (v400 kin pass); letters only
  '49265|50292', // cut / cutie: not one family (v400 kin pass); letters only (cutie is from cute)
  '50353|67126', // iron / ironic: not one family (v400 kin pass); letters only
  '51085|62396', // setter / set: not one family (v400 kin pass); letters only
  '55951|58099', // cent / center: not one family (v400 kin pass); letters only
  '67258|67319', // stud / study: not one family (v400 kin pass); letters only
  '61|13995', // navy / nave: not one family (v400 kin pass); letters only
  '92|32800', // cherry / cherish: not one family (v400 kin pass); letters only
  '117|56021', // mansion / man: not one family (v400 kin pass); letters only
  '149|32769', // cow / cowering: not one family (v400 kin pass); letters only
  '150|12183', // pig / pigment: not one family (v400 kin pass); letters only
  '167|10233', // belly / bell: not one family (v400 kin pass); letters only
  '201|6492', // iron / irony: not one family (v400 kin pass); letters only (irony is from Greek)
  '225|35242', // tea / teaser: not one family (v400 kin pass); letters only
  '264|17424', // husky / husk: not one family (v400 kin pass); letters only
  '282|6963', // harp / harpy: not one family (v400 kin pass); letters only
  '321|39130', // pliers / pliable: not one family (v400 kin pass); pliers and pliable share the root ply, not felt
  '405|43401', // radish / radical: not one family (v400 kin pass); radish and radical share Latin radix, not felt
  '438|58275', // endive / end: not one family (v400 kin pass); letters only
  '493|26414', // herring / her: not one family (v400 kin pass); letters only
  '563|26191', // flour / flourish: not one family (v400 kin pass); flour and flourish share Latin flos, not felt
  '799|27689', // curry / cur: not one family (v400 kin pass); letters only
  '900|25520', // cordial / cord: not one family (v400 kin pass); letters only
  '992|4421', // rat / rations: not one family (v400 kin pass); letters only
  '993|4431', // bat / battalion: not one family (v400 kin pass); letters only
  '1162|41603', // adder / add: not one family (v400 kin pass); letters only
  '1251|41008', // grouper / group: not one family (v400 kin pass); letters only
  '1442|8079', // kitty / kit: not one family (v400 kin pass); kitty (cat) is not from kit (pilot)
  '1442|10137', // kitty / kit: not one family (v400 kin pass); kitty (cat) is not from kit (pilot)
  '1462|56030', // steer / steal: not one family (v400 kin pass); letters only
  '1489|7266', // filly / file: not one family (v400 kin pass); letters only
  '1489|14493', // filly / filling: not one family (v400 kin pass); letters only
  '1489|45449', // filly / file: not one family (v400 kin pass); letters only
  '1506|67374', // farrier / far: not one family (v400 kin pass); letters only
  '1509|67319', // stud / study: not one family (v400 kin pass); letters only
  '1536|39202', // bit / bitter: not one family (v400 kin pass); letters only
  '1549|56030', // steed / steal: not one family (v400 kin pass); letters only
  '1695|4570', // daisy / daily: not one family (v400 kin pass); letters only
  '1701|11856', // poppy / popping: not one family (v400 kin pass); letters only
  '1769|41877', // grass / gray: not one family (v400 kin pass); letters only
  '1983|44914', // shower / showing: not one family (v400 kin pass); letters only (shower rhymes with power here)
  '2049|46089', // rock / rocker: not one family (v400 kin pass); consistency (was K?, chunk 03:445): rocker is derived from rock (sway); rock (stone) is an unrelated word
  '2468|41459', // factory / factor: not one family (v400 kin pass); factory and factor share a root, not felt
  '2468|41617', // factory / factorial: not one family (v400 kin pass); factory and factorial share a root, not felt
  '2501|41487', // mill / million: not one family (v400 kin pass); letters only
  '2764|33285', // taxiing / tax: not one family (v400 kin pass); letters only
  '2795|23174', // raft / rafters: not one family (v400 kin pass); raft and rafter share an old root, not felt
  '2795|24086', // raft / rafter: not one family (v400 kin pass); raft and rafter share an old root, not felt
  '2823|6301', // galley / gallery: not one family (v400 kin pass); letters only
  '2968|29227', // leg / legal: not one family (v400 kin pass); letters only
  '3171|10258', // arm / army: not one family (v400 kin pass); army is from arms (weapons), not the body arm
  '3177|26181', // leg / legible: not one family (v400 kin pass); letters only
  '3225|19939', // nape / napkins: not one family (v400 kin pass)
  '3515|44217', // referral / ref: not one family (v400 kin pass); ref here is short for referee; referral is from refer
  '3773|41761', // toner / ton: not one family (v400 kin pass)
  '4000|30595', // hope / hops: not one family (v400 kin pass)
  '4031|28791', // contentment / content: not one family (v400 kin pass); content here is the material (CONtent); contentment is from conTENT
  '4192|13775', // witness / wit: not one family (v400 kin pass); witness is from old wit (knowledge), not felt as humour
  '4218|43437', // fine / finish: not one family (v400 kin pass); fine (penalty) and finish share Latin finis, not felt
  '4218|58040', // fine / fins: not one family (v400 kin pass)
  '4284|29093', // priest / pry: not one family (v400 kin pass)
  '4316|26414', // heresy / her: not one family (v400 kin pass)
  '4316|50893', // heresy / here: not one family (v400 kin pass)
  '4373|31729', // soldier / solder: not one family (v400 kin pass); letters only (soldier from soldus, pay; solder from solid)
  '4421|20951', // rations / rats: not one family (v400 kin pass)
  '4431|23261', // battalion / batteries: not one family (v400 kin pass); battalion and battery share French battre, not felt
  '4431|42802', // battalion / batter: not one family (v400 kin pass)
  '4431|42803', // battalion / bat: not one family (v400 kin pass)
  '4475|34753', // class / classics: not one family (v400 kin pass); classics from Latin classicus, not felt as class (as pilot class/classic)
  '4492|40920', // recess / recessive: not one family (v400 kin pass); recessive (genetics) shares Latin recedere with recess, not felt
  '4586|43007', // letter / let: not one family (v400 kin pass)
  '4586|43085', // letter / let: not one family (v400 kin pass)
  '4633|13385', // pager / page: not one family (v400 kin pass); pager is from page (to call someone), not the book page
  '4691|46631', // vanity / van: not one family (v400 kin pass)
  '4835|45060', // router / route: not one family (v400 kin pass); the woodworking router is from rout (gouge), not route
  '4921|6063', // tunic / tune: not one family (v400 kin pass)
  '4944|29139', // hat / hater: not one family (v400 kin pass)
  '5059|27709', // darning / darn: not one family (v400 kin pass); darn (swear) is a minced damn, not the sewing darn
  '5248|38257', // archery / archives: not one family (v400 kin pass)
  '5248|57590', // archery / archive: not one family (v400 kin pass)
  '5327|25483', // tubing / tub: not one family (v400 kin pass); tubing is from tube, not tub
  '5849|24226', // sewing / sewer: not one family (v400 kin pass); sewer (drain) is another word
  '5856|24418', // drawing / drawers: not one family (v400 kin pass); drawers (underwear) is from draw (pull on), not felt as drawing
  '6008|21494', // accordion / accord: not one family (v400 kin pass); accordion is named from accord (harmony), not felt
  '6131|39895', // singer / singe: not one family (v400 kin pass)
  '6301|47327', // gallery / galley: not one family (v400 kin pass)
  '6301|47431', // gallery / galley: not one family (v400 kin pass)
  '6320|7762', // cubism / cub: not one family (v400 kin pass)
  '6345|12245', // muse / musical: not one family (v400 kin pass); music comes from the Muses, not felt
  '6345|28084', // muse / music: not one family (v400 kin pass); music comes from the Muses, not felt
  '6345|34727', // muse / music: not one family (v400 kin pass); music comes from the Muses, not felt
  '6492|16651', // irony / iron: not one family (v400 kin pass); irony is from Greek eironeia, not iron
  '6492|23941', // irony / ironing: not one family (v400 kin pass)
  '6492|25760', // irony / iron: not one family (v400 kin pass)
  '6492|50353', // irony / iron: not one family (v400 kin pass)
  '6507|43030', // parable / par: not one family (v400 kin pass)
  '6553|67120', // tower / towed: not one family (v400 kin pass)
  '6677|21719', // vassal / vase: not one family (v400 kin pass)
  '6859|18158', // dig / digestive: not one family (v400 kin pass)
  '6991|48151', // wand / wanderer: not one family (v400 kin pass)
  '7020|58262', // ent / enter: not one family (v400 kin pass)
  '7267|10181', // folder / fold: not one family (v400 kin pass); fold (sheep pen) is another word
  '7404|28883', // truss / true: not one family (v400 kin pass)
  '7484|33448', // empirical / empire: not one family (v400 kin pass)
  '7598|43007', // letter / let: not one family (v400 kin pass)
  '7598|43085', // letter / let: not one family (v400 kin pass)
  '7628|67308', // runes / run: not one family (v400 kin pass)
  '7762|34794', // cub / cubby: not one family (v400 kin pass)
  '7762|41653', // cub / cubic: not one family (v400 kin pass)
  '7773|42932', // serval / serve: not one family (v400 kin pass)
  '7773|42985', // serval / serve: not one family (v400 kin pass)
  '7773|43075', // serval / serve: not one family (v400 kin pass)
  '8297|28793', // polly / polish: not one family (v400 kin pass)
  '8297|33313', // polly / poll: not one family (v400 kin pass)
  '8297|48491', // polly / pole: not one family (v400 kin pass)
  '8833|43437', // fin / finish: not one family (v400 kin pass)
  '9128|26181', // leg / legible: not one family (v400 kin pass)
  '10152|42379', // sett / settings: not one family (v400 kin pass); sett is not felt as set
  '10160|20737', // coop / cooper: not one family (v400 kin pass); cooper (barrel maker) is not from coop
  '10181|34765', // fold / folder: not one family (v400 kin pass); fold (sheep pen) is another word
  '10248|23349', // shoal / shoes: not one family (v400 kin pass)
  '10248|28077', // shoal / shoe: not one family (v400 kin pass)
  '10258|41090', // army / arm: not one family (v400 kin pass); army is from Latin arma, not arm
  '10293|20016', // billy / bill: not one family (v400 kin pass)
  '10293|33295', // billy / bill: not one family (v400 kin pass)
  '10293|33857', // billy / bill: not one family (v400 kin pass)
  '10293|41530', // billy / billion: not one family (v400 kin pass); billion is not from bill
  '10314|33937', // pen / penny: not one family (v400 kin pass)
  '10489|26765', // grazer / grazie: not one family (v400 kin pass)
  '10711|12039', // pedal / pedestal: not one family (v400 kin pass); pedal and pedestal share Latin pes, not felt
  '10773|13247', // metal / meter: not one family (v400 kin pass)
  '10780|20796', // rap / rapier: not one family (v400 kin pass)
  '10817|23350', // suite / suits: not one family (v400 kin pass); suite and suit share French suite, not felt (suite says sweet)
  '11001|41761', // tonic / ton: not one family (v400 kin pass)
  '11011|27237', // bass / based: not one family (v400 kin pass)
  '11070|17147', // brass / bray: not one family (v400 kin pass)
  '11113|29152', // forte / forty: not one family (v400 kin pass)
  '11169|32822', // dot / doting: not one family (v400 kin pass)
  '12288|29227', // legs / legal: not one family (v400 kin pass)
  '13674|25268', // Maisy / May: not one family (v400 kin pass)
  '13771|39202', // bit / bitter: not one family (v400 kin pass)
  '13995|50057', // nave / navy: not one family (v400 kin pass)
  '14280|67270', // bun / bunion: not one family (v400 kin pass)
  '14285|45128', // bob / bobber: not one family (v400 kin pass); consistency (was K?, chunk 04:272): bobber is derived from bob (move up and down); bob (haircut) is an unrelated word
  '14385|63641', // pinky / pink: not one family (v400 kin pass); pinky is from Dutch pink (small), not the color (as pilot)
  '14652|40071', // stare / starless: not one family (v400 kin pass)
  '14718|32387', // sonic / son: not one family (v400 kin pass)
  '14728|20113', // din / dinner: not one family (v400 kin pass)
  '14804|19976', // sticky / stick: not one family (v400 kin pass); sticky is from stick (adhere), not a stick of butter
  '14809|46004', // slippery / slip: not one family (v400 kin pass); slip (clay) is another word
  '14818|23150', // caress / car: not one family (v400 kin pass)
  '14818|28717', // caress / career: not one family (v400 kin pass)
  '14818|28841', // caress / care: not one family (v400 kin pass)
  '14818|56684', // caress / caring: not one family (v400 kin pass)
  '14858|26594', // rods / rode: not one family (v400 kin pass)
  '15292|34579', // porter / port: not one family (v400 kin pass); porter (carrier) is from portare, port (harbour) from portus
  '15383|58397', // plaster / plasticity: not one family (v400 kin pass); plaster and plasticity share Greek plassein, not felt
  '16272|44914', // shower / showing: not one family (v400 kin pass)
  '16825|28116', // bow / bower: not one family (v400 kin pass); bower is not from bow
  '16881|40293', // lunge / lungs: not one family (v400 kin pass)
  '16934|45616', // survey / survival: not one family (v400 kin pass)
  '17056|67368', // heave / heavy: not one family (v400 kin pass); heavy shares an old root with heave, not felt
  '17147|24408', // bray / bra: not one family (v400 kin pass)
  '17147|31727', // bray / brass: not one family (v400 kin pass)
  '17412|63615', // core / coral: not one family (v400 kin pass)
  '17667|25483', // tuber / tub: not one family (v400 kin pass)
  '18158|30752', // digestive / dig: not one family (v400 kin pass)
  '18158|67334', // digestive / dig: not one family (v400 kin pass)
  '19179|26348', // pasty / past: not one family (v400 kin pass)
  '19890|32884', // cure / curious: not one family (v400 kin pass); cure and curious share Latin cura, not felt
  '19955|56649', // gram / grammy: not one family (v400 kin pass)
  '19976|25225', // stick / sticker: not one family (v400 kin pass); sticker is from stick (adhere), not a stick of butter
  '20138|42847', // bowl / bowler: not one family (v400 kin pass); bowl (dish) vs bowler (cricket, a bowl = a ball): different words (as pilot bowling/bowl)
  '20733|38257', // archer / archives: not one family (v400 kin pass)
  '20781|28116', // bow / bower: not one family (v400 kin pass); bower is not from bow
  '20888|29034', // pale / pals: not one family (v400 kin pass)
  '21018|33757', // chart / charter: not one family (v400 kin pass); charter and chart share Latin charta, not felt
  '23145|46631', // vanity / van: not one family (v400 kin pass)
  '23150|40942', // car / carrier: not one family (v400 kin pass); carrier is from carry, not car
  '23150|45779', // car / carry: not one family (v400 kin pass)
  '23153|27400', // ladder / laddie: not one family (v400 kin pass)
  '23261|46032', // batteries / bat: not one family (v400 kin pass)
  '23263|25585', // tape / taper: not one family (v400 kin pass)
  '23263|64261', // tape / taps: not one family (v400 kin pass)
  '23349|50111', // shoes / shoal: not one family (v400 kin pass)
  '23682|45060', // router / route: not one family (v400 kin pass); the woodworking router is from rout (gouge), not route
  '23856|61446', // wash / washers: not one family (v400 kin pass); consistency (was K?, chunk 04:436): washer (ring) is not from wash (rule, chunk 09: washer/wash)
  '24074|27237', // basement / based: not one family (v400 kin pass)
  '24211|31729', // sold / solder: not one family (v400 kin pass)
  '24902|29033', // tension / ten: not one family (v400 kin pass)
  '25204|28116', // bow / bower: not one family (v400 kin pass); bower is not from bow
  '25473|49688', // box / boxer: not one family (v400 kin pass); the boxer engine is named for boxing, not box (as pilot boxer/box)
  '25476|27428', // can / canny: not one family (v400 kin pass); canny is from can (know), not the container
  '26179|62340', // messy / mes: not one family (v400 kin pass)
  '26181|29227', // legible / legal: not one family (v400 kin pass)
  '26181|51617', // legible / legs: not one family (v400 kin pass)
  '26213|35526', // leading / leader: not one family (v400 kin pass); leading (typography) is from lead the metal (as pilot lead/leader)
  '26280|43007', // letter / let: not one family (v400 kin pass)
  '26280|43085', // letter / let: not one family (v400 kin pass)
  '26321|39954', // number / numbing: not one family (v400 kin pass)
  '26414|40923', // her / heredity: not one family (v400 kin pass)
  '26446|42804', // in / inning: not one family (v400 kin pass); inning is from in (going in), not felt
  '26446|42856', // in / innings: not one family (v400 kin pass); as in/inning
  '26450|30241', // for / forester: not one family (v400 kin pass)
  '26504|30241', // for / forester: not one family (v400 kin pass)
  '26597|34062', // broke / broker: not one family (v400 kin pass); broker is from Old French brocour, not break
  '27237|67108', // based / basis: not one family (v400 kin pass)
  '27356|29202', // lass / laser: not one family (v400 kin pass)
  '27428|27908', // canny / can: not one family (v400 kin pass); canny is from can (know), not the can here
  '27689|32884', // cur / curious: not one family (v400 kin pass)
  '28077|50111', // shoe / shoal: not one family (v400 kin pass)
  '28116|28780', // bower / bow: not one family (v400 kin pass); bower (shelter) is not from bow
  '28392|47602', // forest / fore: not one family (v400 kin pass)
  '28552|56627', // mat / mater: not one family (v400 kin pass)
  '28833|38482', // cite / city: not one family (v400 kin pass)
  '28931|46977', // stat / station: not one family (v400 kin pass); stat is from statistic, not station
  '29658|56141', // James / Jamal: not one family (v400 kin pass)
  '31151|46089', // rocks / rocker: not one family (v400 kin pass); rocker is from rock (sway), not rock (stone)
  '31898|63615', // core / coral: not one family (v400 kin pass)
  '32464|56674', // hon / honest: not one family (v400 kin pass); hon is from honey, not honest
  '32697|39118', // down / downy: not one family (v400 kin pass); downy is from down (feathers), not down (sad)
  '32800|45810', // cherish / cherry: not one family (v400 kin pass)
  '32822|67473', // doting / dot: not one family (v400 kin pass)
  '33008|34579', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port (harbour)
  '33238|34579', // porter / port: not one family (v400 kin pass); as porter/port
  '33959|39202', // bit / bitter: not one family (v400 kin pass)
  '34834|43437', // final / finish: not one family (v400 kin pass); consistency (was K?, chunk 05:94): final is not a form of finish; the Latin root is not felt (as the four other final/finish lines)
  '34834|47124', // final / fin: not one family (v400 kin pass)
  '34834|58040', // final / fins: not one family (v400 kin pass)
  '34964|39848', // cap / caper: not one family (v400 kin pass)
  '35412|56021', // manners / man: not one family (v400 kin pass)
  '38489|43030', // parish / par: not one family (v400 kin pass)
  '39118|50870', // downy / down: not one family (v400 kin pass); downy is from down (feathers), not down (direction)
  '39202|44843', // bitter / bit: not one family (v400 kin pass)
  '39327|43437', // fine / finish: not one family (v400 kin pass)
  '39327|58040', // fine / fins: not one family (v400 kin pass)
  '39524|47096', // train / trainer: not one family (v400 kin pass); trainer is from train (teach), not the vehicle
  '40071|50931', // starless / staring: not one family (v400 kin pass)
  '40089|46516', // cab / caber: not one family (v400 kin pass)
  '40293|43796', // lungs / lunge: not one family (v400 kin pass)
  '40923|50893', // heredity / here: not one family (v400 kin pass)
  '41487|56000', // million / mille: not one family (v400 kin pass); mille is Italian; million comes from it but not felt
  '41706|46977', // statistic / station: not one family (v400 kin pass)
  '42802|46032', // batter / bat: not one family (v400 kin pass); batter is from bat (baseball), not the pottery bat
  '42940|62396', // setter / set: not one family (v400 kin pass); consistency (was K?, chunk 05:158): setter is derived from set (verb); set here is French sept, an unrelated sense
  '43030|43794', // par / parry: not one family (v400 kin pass)
  '43437|44340', // finish / final: not one family (v400 kin pass); consistency (was K?, chunk 05:170): final is not a form of finish; the Latin root is not felt (as the four other final/finish lines)
  '43719|63616', // corner / corn: not one family (v400 kin pass)
  '43761|56627', // mat / mater: not one family (v400 kin pass)
  '44340|47124', // final / fin: not one family (v400 kin pass)
  '44340|58040', // final / fins: not one family (v400 kin pass)
  '45060|46042', // route / router: not one family (v400 kin pass); router (woodworking) is from rout (gouge), not route
  '45516|64015', // kitty / kit: not one family (v400 kin pass); kitty (pool) is not from kit
  '46032|46608', // bat / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '46032|49768', // bat / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '46032|52270', // bat / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '46158|67319', // stud / study: not one family (v400 kin pass)
  '48324|57556', // spa / spaying: not one family (v400 kin pass)
  '49403|56344', // Rosie / Ross: not one family (v400 kin pass)
  '50931|64806', // staring / star: not one family (v400 kin pass)
  '56821|58407', // lust / luster: not one family (v400 kin pass)
  '67270|67291', // bunion / bun: not one family (v400 kin pass)
  '164|21213', // bull / bullion: not one family (v400 kin pass)
  '167|41884', // belly / bel: not one family (v400 kin pass)
  '206|45141', // lead / leader: not one family (v400 kin pass); lead here is the metal, not the lead of leader
  '282|63600', // harp / harpy: not one family (v400 kin pass)
  '321|24912', // pliers / ply: not one family (v400 kin pass); pliers is from ply (bend), not felt
  '401|12708', // celery / cel: not one family (v400 kin pass)
  '405|49689', // radish / radial: not one family (v400 kin pass)
  '463|50372', // ham / hammer: not one family (v400 kin pass)
  '516|1962', // butter / butte: not one family (v400 kin pass)
  '861|34290', // water / wat: not one family (v400 kin pass)
  '993|5089', // bat / batting: not one family (v400 kin pass)
  '993|34690', // bat / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '993|45486', // bat / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '1247|28298', // char / charity: not one family (v400 kin pass)
  '1358|8818', // dragonfly / dragonfish: not one family (v400 kin pass); compounds sharing dragon: the Overlap rule's work
  '1447|1913', // cavy / cave: not one family (v400 kin pass)
  '1447|15413', // cavy / cavity: not one family (v400 kin pass); cavity and cave share a Latin root, not felt
  '1629|49853', // pine / pinion: not one family (v400 kin pass)
  '1695|6435', // daisy / dailies: not one family (v400 kin pass); daisy (day's eye) is no longer felt as day
  '1701|58800', // poppy / popper: not one family (v400 kin pass)
  '1767|10392', // moss / mosey: not one family (v400 kin pass)
  '1969|55317', // wind / winder: not one family (v400 kin pass); winder is from wind (turn), not the wind (weather)
  '2049|58660', // rock / rocker: not one family (v400 kin pass); rocker is from rock (sway), not rock (stone)
  '2709|23696', // plane / planer: not one family (v400 kin pass); planer is from plane (tool), not the aircraft
  '2952|6991', // wanderings / wand: not one family (v400 kin pass)
  '2983|23266', // pension / pens: not one family (v400 kin pass)
  '2983|34758', // pension / pen: not one family (v400 kin pass)
  '3240|20841', // liver / livery: not one family (v400 kin pass)
  '4198|27031', // arrest / arre: not one family (v400 kin pass)
  '4209|14806', // fuzz / fuzzy: not one family (v400 kin pass); fuzz (police) is not felt as fuzzy
  '4217|62785', // case / casement: not one family (v400 kin pass); casement is from case (frame), not case (legal)
  '4307|58274', // homily / home: not one family (v400 kin pass)
  '4307|66794', // homily / homeless: not one family (v400 kin pass)
  '4341|41109', // animism / animals: not one family (v400 kin pass); animism shares Latin anima with animal, not felt
  '4471|23263', // taps / tape: not one family (v400 kin pass)
  '4487|32938', // test / testy: not one family (v400 kin pass); testy is from Old French testif, not test
  '4869|10155', // dress / drey: not one family (v400 kin pass)
  '5089|23261', // batting / batteries: not one family (v400 kin pass)
  '5089|42802', // batting / batter: not one family (v400 kin pass)
  '5089|42803', // batting / bat: not one family (v400 kin pass); batting here is cotton wadding (batt), not from bat
  '5089|46608', // batting / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '5089|49768', // batting / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '5089|52270', // batting / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '5228|35502', // bandy / band: not one family (v400 kin pass)
  '5609|30377', // camping / campion: not one family (v400 kin pass)
  '5826|27281', // gamer / gams: not one family (v400 kin pass)
  '6301|13439', // gallery / galley: not one family (v400 kin pass)
  '6523|39460', // comedy / comely: not one family (v400 kin pass)
  '6566|67362', // cloister / closed: not one family (v400 kin pass); cloister is from Latin claustrum, not felt as closed
  '6569|10711', // pediment / pedal: not one family (v400 kin pass)
  '6660|20995', // mummy / mumming: not one family (v400 kin pass)
  '6859|13568', // dig / digest: not one family (v400 kin pass)
  '6987|27332', // troll / trollied: not one family (v400 kin pass); trollied is from trolley, not troll
  '6989|42584', // fairy / fairing: not one family (v400 kin pass)
  '7193|57568', // scale / scaler: not one family (v400 kin pass); scaler (dental) is from scale (flake), not scale (weighing)
  '7269|39320', // cursor / cursory: not one family (v400 kin pass); cursor and cursory share Latin currere, not felt
  '7393|39314', // spring / spry: not one family (v400 kin pass)
  '7466|32938', // test / testy: not one family (v400 kin pass); testy is from Old French testif, not test
  '8320|13383', // covey / cover: not one family (v400 kin pass)
  '8385|28297', // barb / barber: not one family (v400 kin pass)
  '8632|26589', // gavial / gave: not one family (v400 kin pass)
  '8633|16329', // mugger / mug: not one family (v400 kin pass); mugger (crocodile) is from Hindi magar, not mug
  '8633|25506', // mugger / mug: not one family (v400 kin pass); mugger (crocodile) is from Hindi magar, not mug
  '8633|48818', // mugger / mug: not one family (v400 kin pass); mugger (crocodile) is from Hindi magar, not mug
  '8791|28297', // barb / barber: not one family (v400 kin pass)
  '9585|26451', // withers / with: not one family (v400 kin pass)
  '10148|56811', // den / denier: not one family (v400 kin pass)
  '10270|16373', // string / stress: not one family (v400 kin pass)
  '10711|60306', // pedal / pediment: not one family (v400 kin pass)
  '11011|27030', // bass / bas: not one family (v400 kin pass)
  '11070|27399', // brass / brae: not one family (v400 kin pass)
  '11070|67128', // brass / brasserie: not one family (v400 kin pass)
  '11254|25512', // pan / pannier: not one family (v400 kin pass)
  '11760|23261', // battement / batteries: not one family (v400 kin pass); battement is from French battre, not felt as batter
  '11760|42802', // battement / batter: not one family (v400 kin pass)
  '11760|46608', // battement / battery: not one family (v400 kin pass)
  '11760|49768', // battement / battery: not one family (v400 kin pass)
  '11760|52270', // battement / battery: not one family (v400 kin pass)
  '12535|20995', // mummy / mumming: not one family (v400 kin pass)
  '13096|63368', // subbed / sub: not one family (v400 kin pass); subbed is from sub (substitute); the sub sandwich is from submarine
  '13568|30752', // digest / dig: not one family (v400 kin pass)
  '13568|67334', // digest / dig: not one family (v400 kin pass)
  '13712|30035', // barker / bark: not one family (v400 kin pass); barker is from bark (dog), not bark (tree)
  '13731|14813', // patter / pat: not one family (v400 kin pass); patter is from paternoster, not pat
  '14338|56538', // tan / tansy: not one family (v400 kin pass)
  '14813|56640', // pat / pater: not one family (v400 kin pass)
  '14988|39137', // burn / burnished: not one family (v400 kin pass); burnished is from French brunir, not burn
  '14988|46017', // burn / burnish: not one family (v400 kin pass); burnish is from French brunir, not burn
  '15433|23150', // caries / car: not one family (v400 kin pass)
  '15433|28717', // caries / career: not one family (v400 kin pass)
  '15433|28841', // caries / care: not one family (v400 kin pass)
  '15433|56684', // caries / caring: not one family (v400 kin pass)
  '15598|26343', // dates / dative: not one family (v400 kin pass)
  '15841|17059', // lunge / lungful: not one family (v400 kin pass)
  '16348|56538', // tan / tansy: not one family (v400 kin pass)
  '16373|55314', // stress / stringer: not one family (v400 kin pass)
  '16373|58803', // stress / stringer: not one family (v400 kin pass)
  '16529|34042', // reading / readies: not one family (v400 kin pass); readies (cash) is from ready, not reading
  '16791|29157', // glower / glow: not one family (v400 kin pass)
  '16825|20747', // bow / bowyer: not one family (v400 kin pass); bowyer is from bow (weapon), not bow (gesture)
  '17124|44374', // champ / champion: not one family (v400 kin pass); champ (chew) is another word; champion is not from it
  '17410|61134', // peel / peeler: not one family (v400 kin pass); peeler (police) is from Robert Peel, not peel
  '19684|61560', // lager / lag: not one family (v400 kin pass)
  '20136|26704', // spoon / spoonerism: not one family (v400 kin pass); spoonerism is from Spooner, not spoon
  '20341|20995', // mummy / mumming: not one family (v400 kin pass); letters only
  '20373|28793', // polis / polish: not one family (v400 kin pass); letters only
  '20373|48491', // polis / pole: not one family (v400 kin pass); letters only
  '20784|27498', // dagger / daggy: not one family (v400 kin pass); letters only (daggy is from dag)
  '20841|26656', // livery / lives: not one family (v400 kin pass); letters only (livery is from deliver)
  '20841|28783', // livery / live: not one family (v400 kin pass); letters only
  '20841|29041', // livery / lived: not one family (v400 kin pass); letters only
  '20951|43457', // rats / rate: not one family (v400 kin pass); letters only
  '20995|56618', // mumming / mummy: not one family (v400 kin pass); letters only
  '21213|50376', // bullion / bull: not one family (v400 kin pass); letters only
  '23150|39716', // car / carrion: not one family (v400 kin pass); letters only
  '23150|47069', // car / carrier: not one family (v400 kin pass); letters only (carrier is from carry)
  '23263|43293', // tape / taper: not one family (v400 kin pass); letters only (taper is not from tape)
  '23263|44001', // tape / taper: not one family (v400 kin pass); letters only (taper is not from tape)
  '23266|32919', // pens / pensive: not one family (v400 kin pass); letters only
  '23403|34964', // capers / cap: not one family (v400 kin pass); letters only
  '23509|26407', // sheers / she: not one family (v400 kin pass); letters only
  '23856|48141', // wash / washers: not one family (v400 kin pass); consistency (was K?, chunk 06:41): washer (ring) is not from wash (rule, chunk 09: washer/wash)
  '24063|27338', // wall / wally: not one family (v400 kin pass); letters only (wally is from Walter)
  '24872|49853', // pins / pinion: not one family (v400 kin pass); letters only
  '25002|49853', // pin / pinion: not one family (v400 kin pass); letters only
  '25291|26784', // today / toda: not one family (v400 kin pass); letters only
  '25301|39314', // spring / spry: not one family (v400 kin pass); letters only
  '25340|30463', // day / daylily: not one family (v400 kin pass); a compound (day + lily): the Overlap rule's work
  '25512|28035', // pannier / pan: not one family (v400 kin pass); letters only
  '25586|33286', // votive / vote: not one family (v400 kin pass); votive and vote share Latin votum, not felt
  '25586|33314', // votive / voter: not one family (v400 kin pass); votive and voter share Latin votum, not felt
  '26279|39460', // comic / comely: not one family (v400 kin pass); letters only
  '26317|62785', // case / casement: not one family (v400 kin pass); letters only
  '26343|28679', // dative / dated: not one family (v400 kin pass); letters only
  '26343|32431', // dative / dating: not one family (v400 kin pass); letters only
  '26592|27487', // sang / sanger: not one family (v400 kin pass); letters only
  '26594|45596', // rode / rods: not one family (v400 kin pass); letters only
  '26704|45891', // spoonerism / spoons: not one family (v400 kin pass); letters only (spoonerism is named after Spooner)
  '27001|28793', // pole / polish: not one family (v400 kin pass); letters only (pole is Swahili for sorry)
  '27030|67108', // bas / basis: not one family (v400 kin pass); letters only
  '27031|48172', // arre / arrive: not one family (v400 kin pass); letters only
  '27281|61793', // gams / gaming: not one family (v400 kin pass); letters only
  '27316|65019', // cheers / chess: not one family (v400 kin pass); letters only
  '27333|29227', // legless / legal: not one family (v400 kin pass); letters only
  '27338|45586', // wally / wall: not one family (v400 kin pass); letters only
  '27399|31727', // brae / brass: not one family (v400 kin pass); letters only
  '28605|39460', // come / comely: not one family (v400 kin pass); letters only
  '28717|47001', // career / carless: not one family (v400 kin pass); letters only
  '28784|34042', // read / readies: not one family (v400 kin pass); letters only (readies is from ready)
  '28793|41896', // polish / pole: not one family (v400 kin pass); letters only
  '28841|47001', // care / carless: not one family (v400 kin pass); letters only
  '29058|55380', // happiness / happi: not one family (v400 kin pass); letters only
  '29227|43175', // legal / leg: not one family (v400 kin pass); letters only
  '29503|32638', // nopal / nope: not one family (v400 kin pass); letters only
  '30377|48730', // campion / camp: not one family (v400 kin pass); letters only
  '31151|58660', // rocks / rocker: not one family (v400 kin pass); consistency (was K?, chunk 06:120): rocker is derived from rock (sway); rock (stone) is an unrelated word
  '31727|67128', // brass / brasserie: not one family (v400 kin pass); letters only (brasserie is from French brasser)
  '32113|39314', // spring / spry: not one family (v400 kin pass); letters only
  '32611|56734', // sure / surly: not one family (v400 kin pass); letters only
  '32666|65019', // cheerful / chess: not one family (v400 kin pass); letters only
  '32884|40834', // curious / curie: not one family (v400 kin pass); letters only
  '32919|34758', // pensive / pen: not one family (v400 kin pass); letters only
  '32938|34829', // testy / test: not one family (v400 kin pass); testy is from Old French teste, not test
  '33937|50686', // penny / pen: not one family (v400 kin pass); letters only
  '34042|50087', // readies / reading: not one family (v400 kin pass); letters only (readies is from ready)
  '34690|42802', // battery / batter: not one family (v400 kin pass); letters only (battery is not from bat)
  '34690|42803', // battery / bat: not one family (v400 kin pass); letters only (battery is not from bat)
  '35065|39460', // comment / comely: not one family (v400 kin pass); letters only
  '35337|41111', // protester / protists: not one family (v400 kin pass); letters only
  '35483|61484', // guy / guising: not one family (v400 kin pass); letters only (guising is from disguise)
  '35520|40089', // cabal / cab: not one family (v400 kin pass); letters only
  '38584|46686', // lapis / lap: not one family (v400 kin pass); letters only
  '39137|39931', // burnished / burning: not one family (v400 kin pass); burnish is from Old French brunir, not burn
  '39226|67362', // cloying / closed: not one family (v400 kin pass); letters only
  '39241|43119', // massive / masse: not one family (v400 kin pass); letters only (masse is from French masse, a mallet)
  '39460|42419', // comely / comment: not one family (v400 kin pass); letters only
  '39514|40591', // mote / motion: not one family (v400 kin pass); letters only
  '39931|46017', // burning / burnish: not one family (v400 kin pass); burnish is from Old French brunir, not burn
  '39952|46660', // parky / park: not one family (v400 kin pass); letters only
  '40293|44841', // lungs / lunge: not one family (v400 kin pass); letters only
  '42225|62785', // case / casement: not one family (v400 kin pass); letters only
  '42802|45486', // batter / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '42803|45486', // bat / battery: not one family (v400 kin pass); letters only (battery is not from bat)
  '42862|67416', // googly / google: not one family (v400 kin pass); letters only
  '44081|65019', // cheer / chess: not one family (v400 kin pass); letters only
  '45574|55317', // wind / winder: not one family (v400 kin pass); consistency (was K?, chunk 06:217): winder is derived from wind (turn); wind (air) is an unrelated word (as 05:264)
  '47001|56684', // carless / caring: not one family (v400 kin pass); letters only
  '49750|55317', // wind / winder: not one family (v400 kin pass); consistency (was K?, chunk 06:229): winder is derived from wind (turn); wind (air) is an unrelated word (as 05:264)
  '171|53654', // ribs / riberry: not one family (v400 kin pass); letters only
  '659|8380', // cereal / cere: not one family (v400 kin pass); letters only
  '731|11085', // gravy / grave: not one family (v400 kin pass); letters only
  '799|62158', // curry / currying: not one family (v400 kin pass); letters only (currying is named after Haskell Curry)
  '1435|27587', // dog / dogie: not one family (v400 kin pass); letters only
  '1440|40457', // cat / cation: not one family (v400 kin pass); letters only
  '1440|41783', // cat / catty: not one family (v400 kin pass); letters only (catty is from Malay kati)
  '1451|14533', // pony / pons: not one family (v400 kin pass); letters only
  '2795|10280', // raft / rafter: not one family (v400 kin pass); rafter (of turkeys) is not felt as from raft
  '3247|53654', // rib / riberry: not one family (v400 kin pass); letters only
  '3441|15154', // dropsy / drops: not one family (v400 kin pass); dropsy is from hydropsy, not drop
  '3441|41795', // dropsy / drop: not one family (v400 kin pass); dropsy is from hydropsy, not drop
  '3985|31344', // shame / shamal: not one family (v400 kin pass); letters only
  '4068|30650', // vet / vetiver: not one family (v400 kin pass); letters only
  '4218|6589', // fine / finial: not one family (v400 kin pass); letters only
  '4472|41011', // sortie / sort: not one family (v400 kin pass); letters only (sortie is French for going out)
  '4481|62287', // detention / detent: not one family (v400 kin pass); detention and detent share Latin detinere, not felt
  '4568|19357', // paper / pap: not one family (v400 kin pass); letters only
  '4742|55709', // fan / fanous: not one family (v400 kin pass); letters only
  '5291|34180', // diving / divest: not one family (v400 kin pass); letters only
  '6589|8833', // finial / fin: not one family (v400 kin pass); letters only
  '6589|34834', // finial / final: not one family (v400 kin pass); letters only
  '6589|39327', // finial / fine: not one family (v400 kin pass); letters only
  '6589|44340', // finial / final: not one family (v400 kin pass); letters only
  '7132|11085', // gravity / grave: not one family (v400 kin pass); grave (tempo) and gravity share Latin gravis, not felt
  '7736|32724', // madder / mad: not one family (v400 kin pass); letters only
  '8083|20198', // cony / cone: not one family (v400 kin pass); letters only
  '8083|30053', // cony / cone: not one family (v400 kin pass); letters only
  '8083|41558', // cony / cone: not one family (v400 kin pass); letters only
  '8084|20198', // coney / cone: not one family (v400 kin pass); letters only
  '8084|30053', // coney / cone: not one family (v400 kin pass); letters only
  '8084|41558', // coney / cone: not one family (v400 kin pass); letters only
  '8769|29130', // tope / tops: not one family (v400 kin pass); letters only
  '8780|20137', // platy / plate: not one family (v400 kin pass); letters only
  '9184|20903', // hatch / hatchment: not one family (v400 kin pass); letters only (hatchment is from achievement)
  '9575|29358', // bosal / boss: not one family (v400 kin pass); letters only
  '9575|45641', // bosal / boss: not one family (v400 kin pass); letters only
  '9575|56713', // bosal / bossy: not one family (v400 kin pass); letters only
  '10160|47639', // coop / cooper: not one family (v400 kin pass); cooper (barrel maker) is not felt as from coop
  '10182|40740', // web / weber: not one family (v400 kin pass); letters only
  '10773|56760', // metal / metical: not one family (v400 kin pass); letters only
  '11200|55709', // fan / fanous: not one family (v400 kin pass); letters only
  '11984|35499', // mannerism / man: not one family (v400 kin pass); letters only
  '12011|19357', // paper / pap: not one family (v400 kin pass); letters only
  '12223|14988', // burnishing / burn: not one family (v400 kin pass); burnish is from Old French brunir, not burn
  '12223|39931', // burnishing / burning: not one family (v400 kin pass); burnish is from Old French brunir, not burn
  '13383|35495', // cover / cove: not one family (v400 kin pass); letters only
  '14546|26646', // meninges / men: not one family (v400 kin pass); letters only
  '14696|50561', // sound / sounder: not one family (v400 kin pass); sounder (of boars) is not from sound
  '14988|34400', // burn / burnous: not one family (v400 kin pass); letters only
  '15064|58264', // tabes / tab: not one family (v400 kin pass); letters only
  '16373|35209', // stress / stringer: not one family (v400 kin pass); letters only
  '16373|50131', // stress / stringer: not one family (v400 kin pass); letters only
  '17194|28297', // barberry / barber: not one family (v400 kin pass); letters only
  '18827|24484', // jam / jammers: not one family (v400 kin pass); jammers (swimwear) are not from jam
  '19169|44374', // champ / champion: not one family (v400 kin pass); consistency (was K?, chunk 06:348): champ (potato dish) is from champ (mash, chew), not from champion (as 05:473)
  '19357|20472', // pap / paper: not one family (v400 kin pass); letters only
  '19908|43719', // corn / corner: not one family (v400 kin pass); letters only
  '20877|25124', // banner / banns: not one family (v400 kin pass); letters only
  '21322|30842', // slops / slope: not one family (v400 kin pass); letters only
  '21322|43523', // slops / slope: not one family (v400 kin pass); letters only
  '23349|51469', // shoes / sho: not one family (v400 kin pass); letters only
  '23730|32881', // clevis / clever: not one family (v400 kin pass); letters only
  '23866|60108', // tidy / tiding: not one family (v400 kin pass); letters only
  '26500|39739', // or / orris: not one family (v400 kin pass); letters only
  '28327|29504', // copy / copal: not one family (v400 kin pass); letters only
  '28327|34387', // copy / cope: not one family (v400 kin pass); letters only
  '28327|48107', // copy / coping: not one family (v400 kin pass); letters only
  '28793|60970', // polish / polity: not one family (v400 kin pass); letters only
  '29165|55499', // dim / dimity: not one family (v400 kin pass); letters only
  '29504|33680', // copal / cop: not one family (v400 kin pass); letters only
  '31144|60108', // tide / tiding: not one family (v400 kin pass); tiding (of magpies) is from tidings, not felt as tide
  '31297|32640', // neve / never: not one family (v400 kin pass); letters only
  '32504|56788', // later / lat: not one family (v400 kin pass); letters only
  '32612|53668', // okay / oka: not one family (v400 kin pass); letters only
  '33680|48107', // cop / coping: not one family (v400 kin pass); letters only
  '33939|55499', // dime / dimity: not one family (v400 kin pass); letters only
  '33940|43809', // quarter / quarte: not one family (v400 kin pass); quarte (fencing) shares Latin quartus with quarter, not felt
  '34180|43304', // divest / dive: not one family (v400 kin pass); letters only
  '34400|39931', // burnous / burning: not one family (v400 kin pass); letters only
  '35609|55709', // fan / fanous: not one family (v400 kin pass); letters only
  '41580|43809', // quarter / quarte: not one family (v400 kin pass); quarte (fencing) shares Latin quartus with quarter, not felt
  '41674|61071', // chance / chancery: not one family (v400 kin pass); letters only
  '41729|56760', // meter / metical: not one family (v400 kin pass); letters only
  '42224|55709', // fan / fanous: not one family (v400 kin pass); letters only
  '43557|45408', // skates / skat: not one family (v400 kin pass); letters only
  '43810|58088', // sixte / sixty: not one family (v400 kin pass); letters only (sixte is French for sixth)
  '46977|56809', // station / stater: not one family (v400 kin pass); letters only
  '48491|60970', // pole / polity: not one family (v400 kin pass); letters only
  '49818|56760', // meter / metical: not one family (v400 kin pass); letters only
  '50091|53654', // ribs / riberry: not one family (v400 kin pass); letters only
  '33|4387', // rook / rookie: not one family (v400 kin pass); rookie is not from rook (chess), though it looks alike
  '743|1776', // cloves / clover: not one family (v400 kin pass); letters only
  '748|21688', // relish / relic: not one family (v400 kin pass); letters only
  '748|56687', // relish / reliable: not one family (v400 kin pass); letters only
  '846|22435', // haggis / hag: not one family (v400 kin pass); letters only
  '1226|40486', // bass / base: not one family (v400 kin pass); letters only
  '1226|44076', // bass / base: not one family (v400 kin pass); letters only
  '1289|3623', // coral / core: not one family (v400 kin pass); letters only
  '1289|40817', // coral / core: not one family (v400 kin pass); letters only
  '1438|16949', // mutt / mutter: not one family (v400 kin pass); letters only
  '1463|46665', // stallion / stall: not one family (v400 kin pass); stallion and stall share a root (kept in a stall), not felt
  '1615|32886', // amber / ambitious: not one family (v400 kin pass); letters only
  '1707|4016', // pansy / panic: not one family (v400 kin pass); letters only
  '1707|39017', // pansy / pane: not one family (v400 kin pass); letters only
  '1931|25479', // crater / crate: not one family (v400 kin pass); letters only
  '1939|18859', // cape / caper: not one family (v400 kin pass); letters only
  '2027|14207', // muggy / mug: not one family (v400 kin pass); letters only
  '2027|27325', // muggy / mug: not one family (v400 kin pass); letters only
  '2408|39117', // scale / scaly: not one family (v400 kin pass); consistency (was K?, chunk 06:490): scaly is derived from scale (fish, skin); this scale (weighing, map, music) is an unrelated word (rule: derived word vs base in another sense)
  '2492|29005', // station / stats: not one family (v400 kin pass)
  '2492|33918', // station / statement: not one family (v400 kin pass)
  '2492|35263', // station / static: not one family (v400 kin pass)
  '2798|34932', // mast / master: not one family (v400 kin pass)
  '2798|35566', // mast / master: not one family (v400 kin pass)
  '3253|23247', // gut / gutter: not one family (v400 kin pass)
  '3512|55746', // medic / medals: not one family (v400 kin pass)
  '3623|7688', // core / coral: not one family (v400 kin pass)
  '3623|9926', // core / coral: not one family (v400 kin pass)
  '3623|31674', // core / coral: not one family (v400 kin pass)
  '3826|33291', // mineral / minister: not one family (v400 kin pass)
  '3826|34205', // mineral / minister: not one family (v400 kin pass)
  '3836|6154', // organic / organist: not one family (v400 kin pass); organic (living) and organist (instrument): two senses of organ, not felt
  '3845|47462', // portion / port: not one family (v400 kin pass)
  '3845|47598', // portion / port: not one family (v400 kin pass)
  '3845|47831', // portion / porter: not one family (v400 kin pass)
  '3845|48887', // portion / port: not one family (v400 kin pass)
  '3907|40593', // relation / relativity: not one family (v400 kin pass); relativity (physics) is not felt as a family relation
  '3919|43211', // ally / alley: not one family (v400 kin pass)
  '4016|39017', // panic / pane: not one family (v400 kin pass)
  '4029|34772', // compassion / compass: not one family (v400 kin pass)
  '4148|33291', // miner / minister: not one family (v400 kin pass)
  '4148|34205', // miner / minister: not one family (v400 kin pass)
  '4311|33427', // communion / communism: not one family (v400 kin pass); communion and communism share a Latin root, not felt
  '4311|41044', // communion / community: not one family (v400 kin pass); communion and community share a Latin root, not felt
  '4415|32695', // mission / miserable: not one family (v400 kin pass)
  '4623|10113', // press / prey: not one family (v400 kin pass)
  '4924|18859', // cape / caper: not one family (v400 kin pass)
  '6066|39117', // scale / scaly: not one family (v400 kin pass); consistency (was K, chunk 07:106): scaly is derived from scale (fish, skin); this scale (weighing, map, music) is an unrelated word (rule: derived word vs base in another sense)
  '6069|25498', // pitch / pitcher: not one family (v400 kin pass); consistency (was K?, chunk 07:107): the pitcher (jug) is not from pitch (rule, chunk 09: pitcher/pitch)
  '6143|40486', // bassist / base: not one family (v400 kin pass)
  '6143|44076', // bassist / base: not one family (v400 kin pass)
  '6148|42083', // cellist / cells: not one family (v400 kin pass)
  '6154|40863', // organist / organism: not one family (v400 kin pass); organist (instrument) and organism (living): two senses of organ, not felt
  '6375|50292', // cut / cutie: not one family (v400 kin pass)
  '6470|55985', // setting / sette: not one family (v400 kin pass)
  '6606|42997', // lobby / lob: not one family (v400 kin pass)
  '6789|28533', // booty / boot: not one family (v400 kin pass)
  '6789|49275', // booty / boot: not one family (v400 kin pass)
  '7287|39955', // bit / biting: not one family (v400 kin pass)
  '7287|56720', // bit / bitter: not one family (v400 kin pass)
  '7407|42300', // stress / string: not one family (v400 kin pass)
  '7688|40817', // coral / core: not one family (v400 kin pass)
  '7705|32886', // amber / ambitious: not one family (v400 kin pass)
  '7707|29244', // rust / rustic: not one family (v400 kin pass)
  '8058|9551', // hare / harness: not one family (v400 kin pass)
  '8058|48701', // hare / harness: not one family (v400 kin pass)
  '8058|50835', // hare / harness: not one family (v400 kin pass)
  '9780|16913', // stag / stagger: not one family (v400 kin pass)
  '9926|40817', // coral / core: not one family (v400 kin pass)
  '10109|32886', // amber / ambitious: not one family (v400 kin pass)
  '10205|38688', // bray / brass: not one family (v400 kin pass)
  '10243|27228', // litter / lit: not one family (v400 kin pass)
  '10403|15966', // spines / spinning: not one family (v400 kin pass)
  '10403|45537', // spines / spinner: not one family (v400 kin pass)
  '10403|50884', // spines / spin: not one family (v400 kin pass)
  '10785|32617', // indie / indeed: not one family (v400 kin pass)
  '10862|27634', // jam / jammies: not one family (v400 kin pass)
  '10959|28758', // bars / bare: not one family (v400 kin pass)
  '12248|27361', // prop / proper: not one family (v400 kin pass)
  '12542|40867', // genie / gene: not one family (v400 kin pass)
  '12827|21469', // ratings / rationing: not one family (v400 kin pass)
  '12827|34563', // ratings / ration: not one family (v400 kin pass)
  '13504|41616', // pow / power: not one family (v400 kin pass)
  '14199|34008', // brow / browsing: not one family (v400 kin pass)
  '14710|25498', // pitch / pitcher: not one family (v400 kin pass); consistency (was K?, chunk 07:231): the pitcher (jug) is not from pitch (rule, chunk 09: pitcher/pitch)
  '15711|16338', // trimester / trimmer: not one family (v400 kin pass)
  '15711|19791', // trimester / trim: not one family (v400 kin pass)
  '15711|50142', // trimester / trimmer: not one family (v400 kin pass)
  '15857|29360', // skipping / skipper: not one family (v400 kin pass); skipper (captain) is from Dutch schipper, not skip
  '17002|27788', // pant / pants: not one family (v400 kin pass); pants (nonsense, from trousers) is not felt as pant (as bangs/bang)
  '18859|27222', // caper / cap: not one family (v400 kin pass)
  '18859|50360', // caper / cap: not one family (v400 kin pass)
  '19887|30962', // can / canal: not one family (v400 kin pass)
  '19963|27228', // liter / lit: not one family (v400 kin pass)
  '20019|40864', // specials / species: not one family (v400 kin pass)
  '20171|20761', // counter / count: not one family (v400 kin pass)
  '20171|33375', // counter / countess: not one family (v400 kin pass)
  '20732|55952', // miller / mille: not one family (v400 kin pass)
  '20761|23439', // count / counter: not one family (v400 kin pass)
  '20761|41713', // count / counters: not one family (v400 kin pass)
  '20761|45533', // count / counter: not one family (v400 kin pass)
  '21688|56687', // relic / reliable: not one family (v400 kin pass)
  '23352|44919', // jumpers / jumping: not one family (v400 kin pass); jumpers here are sweaters, not felt as jump
  '23439|33375', // counter / countess: not one family (v400 kin pass)
  '23681|28213', // sander / sandal: not one family (v400 kin pass)
  '23861|33290', // polish / policy: not one family (v400 kin pass)
  '23861|46926', // polish / pole: not one family (v400 kin pass)
  '25498|42855', // pitcher / pitch: not one family (v400 kin pass); consistency (was K?, chunk 07:377): the pitcher (jug) is not from pitch (rule, chunk 09: pitcher/pitch)
  '25498|43059', // pitcher / pitch: not one family (v400 kin pass); consistency (was K?, chunk 07:378): the pitcher (jug) is not from pitch (rule, chunk 09: pitcher/pitch)
  '25498|50365', // pitcher / pitch: not one family (v400 kin pass); consistency (was K?, chunk 07:379): the pitcher (jug) is not from pitch (rule, chunk 09: pitcher/pitch)
  '25589|27349', // wick / wicked: not one family (v400 kin pass)
  '26831|62740', // tres / tree: not one family (v400 kin pass)
  '27342|60103', // twit / twitter: not one family (v400 kin pass)
  '27355|27927', // lad / ladies: not one family (v400 kin pass)
  '27355|45757', // lad / ladder: not one family (v400 kin pass)
  '27982|35067', // store / story: not one family (v400 kin pass)
  '28012|31578', // mother / moths: not one family (v400 kin pass)
  '28213|29937', // sandal / sandy: not one family (v400 kin pass)
  '28213|42962', // sandal / sand: not one family (v400 kin pass)
  '28269|32636', // tote / totally: not one family (v400 kin pass)
  '28766|42725', // cent / center: not one family (v400 kin pass)
  '28766|58572', // cent / center: not one family (v400 kin pass)
  '28779|40486', // bass / base: not one family (v400 kin pass)
  '28779|44076', // bass / base: not one family (v400 kin pass)
  '28812|67302', // sewer / sew: not one family (v400 kin pass); consistency (was K?, chunk 07:418): sewer (drain) is not from sew (as 09:228)
  '29005|33918', // stats / statement: not one family (v400 kin pass)
  '29005|35263', // stats / static: not one family (v400 kin pass)
  '29005|64103', // stats / station: not one family (v400 kin pass)
  '29019|32636', // tot / totally: not one family (v400 kin pass)
  '29055|44253', // assess / assist: not one family (v400 kin pass)
  '29244|40083', // rustic / rust: not one family (v400 kin pass)
  '29548|44271', // bowler / bowl: not one family (v400 kin pass); consistency (was K?, chunk 07:434): the bowler hat is named after the Bowler hatters, not bowl (as 01:475, 02:380, 09:362)
  '30843|32803', // pass / passion: not one family (v400 kin pass)
  '31674|40817', // coral / core: not one family (v400 kin pass)
  '32803|46935', // passion / pass: not one family (v400 kin pass)
  '32803|67225', // passion / pass: not one family (v400 kin pass)
  '32886|39730', // ambitious / amber: not one family (v400 kin pass)
  '33290|40025', // policy / polished: not one family (v400 kin pass)
  '33290|46926', // policy / pole: not one family (v400 kin pass)
  '33290|57572', // policy / polishing: not one family (v400 kin pass)
  '33375|41713', // countess / counters: not one family (v400 kin pass)
  '33375|45533', // countess / counter: not one family (v400 kin pass)
  '33427|41044', // communism / community: not one family (v400 kin pass); communism and community share a Latin root, not felt
  '33918|35263', // statement / static: not one family (v400 kin pass)
  '33918|64103', // statement / station: not one family (v400 kin pass)
  '34190|50891', // offering / off: not one family (v400 kin pass)
  '35263|64103', // static / station: not one family (v400 kin pass)
  '35334|39271', // petition / petite: not one family (v400 kin pass)
  '35565|40864', // specialist / species: not one family (v400 kin pass)
  '38223|39117', // scales / scaly: not one family (v400 kin pass); scales here weigh; scaly is from fish scales
  '38791|41114', // clay / class: not one family (v400 kin pass)
  '38791|42302', // clay / class: not one family (v400 kin pass)
  '39117|45902', // scaly / scale: not one family (v400 kin pass); scale here is the model ratio; scaly is from fish scales
  '39247|67122', // towering / tow: not one family (v400 kin pass)
  '39288|41450', // modest / mode: not one family (v400 kin pass)
  '39288|41670', // modest / mode: not one family (v400 kin pass)
  '39624|67290', // patter / patty: not one family (v400 kin pass)
  '39682|40486', // bass / base: not one family (v400 kin pass); bass (music) comes from base, but is spelled and felt apart
  '39682|44076', // bass / base: not one family (v400 kin pass); as bass/base
  '40025|46926', // polished / pole: not one family (v400 kin pass)
  '41450|56686', // mode / modest: not one family (v400 kin pass)
  '41670|56686', // mode / modest: not one family (v400 kin pass)
  '42725|55951', // center / cent: not one family (v400 kin pass)
  '42740|46658', // steal / steer: not one family (v400 kin pass)
  '42997|60974', // lob / lobbyist: not one family (v400 kin pass)
  '43346|44366', // fins / finalist: not one family (v400 kin pass)
  '43346|46056', // fins / finish: not one family (v400 kin pass)
  '43346|46962', // fins / fine: not one family (v400 kin pass)
  '43404|44366', // fin / finalist: not one family (v400 kin pass)
  '43404|46056', // fin / finish: not one family (v400 kin pass)
  '44366|46056', // finalist / finish: not one family (v400 kin pass)
  '44366|46962', // finalist / fine: not one family (v400 kin pass)
  '46056|46962', // finish / fine: not one family (v400 kin pass)
  '46926|57572', // pole / polishing: not one family (v400 kin pass)
  '47462|47831', // port / porter: not one family (v400 kin pass); porter (carrier) is from Latin portare, not port
  '47598|47831', // port / porter: not one family (v400 kin pass); as port/porter
  '47831|48887', // porter / port: not one family (v400 kin pass); as port/porter
  '50292|50378', // cutie / cut: not one family (v400 kin pass)
  '51085|55985', // setter / sette: not one family (v400 kin pass)
  '55951|58572', // cent / center: not one family (v400 kin pass)
  '33|10175', // rook / rookery: not one family (v400 kin pass); rook here is the chess piece; rookery is from the bird
  '101|28668', // fig / figment: not one family (v400 kin pass)
  '159|29055', // ass / assess: not one family (v400 kin pass)
  '159|44253', // ass / assist: not one family (v400 kin pass)
  '254|1707', // paneer / pansy: not one family (v400 kin pass)
  '254|4016', // paneer / panic: not one family (v400 kin pass)
  '254|39017', // paneer / pane: not one family (v400 kin pass)
  '478|14827', // clam / clammy: not one family (v400 kin pass)
  '1033|23155', // jackal / jack: not one family (v400 kin pass)
  '1033|46059', // jackal / jacks: not one family (v400 kin pass)
  '1072|30157', // gull / gully: not one family (v400 kin pass)
  '1072|56032', // gull / gullible: not one family (v400 kin pass)
  '1080|57482', // hawk / hawker: not one family (v400 kin pass); hawker (trader) is from another hawk (to peddle), not the bird
  '1083|67067', // raven / ravenous: not one family (v400 kin pass)
  '1090|40071', // starling / starless: not one family (v400 kin pass)
  '1226|27237', // bass / based: not one family (v400 kin pass)
  '1370|34074', // tick / ticker: not one family (v400 kin pass); tick here is the bug; ticker is from the tick sound
  '1462|42740', // steer / steal: not one family (v400 kin pass)
  '1463|46833', // stallion / stall: not one family (v400 kin pass)
  '1464|50424', // mare / mars: not one family (v400 kin pass)
  '1489|4807', // filly / file: not one family (v400 kin pass)
  '1536|56720', // bit / bitter: not one family (v400 kin pass); consistency (was K?, chunk 08:184): bitter is not felt as a form of bit (as the other bit/bitter lines)
  '1549|42740', // steed / steal: not one family (v400 kin pass)
  '1549|46658', // steed / steer: not one family (v400 kin pass)
  '1638|46005', // fir / firing: not one family (v400 kin pass)
  '1776|19975', // clover / clove: not one family (v400 kin pass)
  '1925|23017', // marsh / marshal: not one family (v400 kin pass)
  '1925|34534', // marsh / marshal: not one family (v400 kin pass)
  '1932|50385', // cove / cover: not one family (v400 kin pass)
  '1939|39848', // cape / caper: not one family (v400 kin pass)
  '2492|28931', // station / stat: not one family (v400 kin pass)
  '2492|41706', // station / statistic: not one family (v400 kin pass)
  '2679|4835', // route / router: not one family (v400 kin pass); this router (power tool) is from rout (gouge), not route
  '2679|23682', // route / router: not one family (v400 kin pass); this router (woodworking) is from rout (gouge), not route
  '2679|46042', // route / router: not one family (v400 kin pass); this router (tool) is from rout (gouge), not route
  '2798|11229', // mast / mastering: not one family (v400 kin pass)
  '2815|24993', // clipper / clip: not one family (v400 kin pass); clipper (ship) is from clip (move fast), not clip (fasten)
  '2815|48513', // clipper / clip: not one family (v400 kin pass); clipper (ship) is from clip (move fast), not clip (fasten)
  '2820|58570', // punt / punter: not one family (v400 kin pass); punt (boat) is another word than punt (kick), from which punter comes
  '2924|7479', // outing / outlier: not one family (v400 kin pass)
  '2968|6644', // leg / legion: not one family (v400 kin pass)
  '2974|42804', // inn / inning: not one family (v400 kin pass)
  '2974|42856', // inn / innings: not one family (v400 kin pass)
  '3100|3689', // dozer / doze: not one family (v400 kin pass)
  '3253|26224', // gut / gutter: not one family (v400 kin pass)
  '3260|8057', // colon / colony: not one family (v400 kin pass)
  '3260|10242', // colon / colony: not one family (v400 kin pass)
  '3260|13931', // colon / colonial: not one family (v400 kin pass)
  '3260|32176', // colon / colony: not one family (v400 kin pass)
  '3260|38492', // colon / colony: not one family (v400 kin pass)
  '3309|4818', // vision / vise: not one family (v400 kin pass)
  '3623|63615', // core / coral: not one family (v400 kin pass)
  '3687|22363', // drowsy / drow: not one family (v400 kin pass)
  '3845|15292', // portion / porter: not one family (v400 kin pass)
  '3845|33008', // portion / porter: not one family (v400 kin pass)
  '3845|33238', // portion / porter: not one family (v400 kin pass)
  '3845|37954', // portion / port: not one family (v400 kin pass)
  '3845|42459', // portion / port: not one family (v400 kin pass)
  '3845|43455', // portion / port: not one family (v400 kin pass)
  '3930|56627', // mate / mater: not one family (v400 kin pass)
  '4029|25806', // compassion / compasses: not one family (v400 kin pass)
  '4034|7287', // bitterness / bit: not one family (v400 kin pass)
  '4111|7773', // server / serval: not one family (v400 kin pass)
  '4387|7745', // rookie / rook: not one family (v400 kin pass); rookie is not from the bird rook
  '4387|10175', // rookie / rookery: not one family (v400 kin pass); rookie is not from rook (bird), from which rookery comes
  '4403|27308', // bunker / bunk: not one family (v400 kin pass)
  '4415|43130', // mission / miss: not one family (v400 kin pass)
  '4421|12827', // rations / ratings: not one family (v400 kin pass)
  '4432|29037', // regiment / regal: not one family (v400 kin pass)
  '4691|45959', // vanity / vanish: not one family (v400 kin pass)
  '4818|14673', // vise / visible: not one family (v400 kin pass)
  '4924|39848', // cape / caper: not one family (v400 kin pass)
  '5289|29548', // bowls / bowler: not one family (v400 kin pass); the bowler hat is named after the hatter Bowler
  '5311|23174', // rafting / rafters: not one family (v400 kin pass); raft and rafter are felt as different words
  '5311|24086', // rafting / rafter: not one family (v400 kin pass); raft and rafter are felt as different words
  '5898|10403', // spinning / spines: not one family (v400 kin pass)
  '6143|27237', // bassist / based: not one family (v400 kin pass)
  '6150|10364', // flutist / flutter: not one family (v400 kin pass)
  '6155|6963', // harpist / harpy: not one family (v400 kin pass)
  '6169|17419', // piper / pip: not one family (v400 kin pass)
  '6169|30707', // piper / pip: not one family (v400 kin pass)
  '6252|39458', // rave / ravishing: not one family (v400 kin pass)
  '6550|38257', // arch / archives: not one family (v400 kin pass)
  '6550|57590', // arch / archive: not one family (v400 kin pass)
  '6554|38907', // spire / spiral: not one family (v400 kin pass)
  '6554|38946', // spire / spiral: not one family (v400 kin pass)
  '6606|43098', // lobby / lob: not one family (v400 kin pass)
  '6606|61529', // lobby / lob: not one family (v400 kin pass)
  '6644|12288', // legion / legs: not one family (v400 kin pass)
  '6644|26181', // legion / legible: not one family (v400 kin pass)
  '6774|19416', // matey / mate: not one family (v400 kin pass); mate (the tea) is another word than mate (friend)
  '6774|33191', // matey / mate: not one family (v400 kin pass); mate (the tea) is another word than mate (friend)
  '6774|56627', // matey / mater: not one family (v400 kin pass)
  '7218|32461', // precision / precious: not one family (v400 kin pass)
  '7274|7773', // server / serval: not one family (v400 kin pass)
  '7287|39166', // bit / bitters: not one family (v400 kin pass); bit (data) is from binary digit, not bite
  '7385|33982', // lever / levy: not one family (v400 kin pass)
  '7395|38257', // arch / archives: not one family (v400 kin pass)
  '7395|57590', // arch / archive: not one family (v400 kin pass)
  '7614|19890', // cursive / cure: not one family (v400 kin pass)
  '7614|27689', // cursive / cur: not one family (v400 kin pass)
  '7628|42858', // runes / run: not one family (v400 kin pass)
  '7669|28708', // jet / jetty: not one family (v400 kin pass)
  '8057|56796', // colony / colon: not one family (v400 kin pass)
  '8297|23861', // polly / polish: not one family (v400 kin pass)
  '8297|33290', // polly / policy: not one family (v400 kin pass)
  '8297|40025', // polly / polished: not one family (v400 kin pass)
  '8297|46926', // polly / pole: not one family (v400 kin pass)
  '8297|57572', // polly / polishing: not one family (v400 kin pass)
  '8359|10293', // bill / billy: not one family (v400 kin pass)
  '9580|14826', // tack / tacky: not one family (v400 kin pass); tack (horse gear, from tackle) is not felt as tacky (sticky)
  '9702|35493', // joey / joe: not one family (v400 kin pass)
  '9780|32790', // stag / staggered: not one family (v400 kin pass)
  '10225|41531', // trill / trillion: not one family (v400 kin pass)
  '10242|56796', // colony / colon: not one family (v400 kin pass)
  '10293|10347', // billy / bill: not one family (v400 kin pass)
  '10314|33870', // pen / pension: not one family (v400 kin pass)
  '10398|31209', // pelt / pelting: not one family (v400 kin pass); pelt (skin) and pelting (rain) are different words
  '10403|45135', // spines / spinner: not one family (v400 kin pass)
  '10403|46088', // spines / spinner: not one family (v400 kin pass)
  '10489|14990', // grazer / graze: not one family (v400 kin pass); graze (injury) is felt apart from graze (eat grass)
  '10490|14199', // browser / brow: not one family (v400 kin pass)
  '10709|28116', // bow / bower: not one family (v400 kin pass)
  '10785|26676', // indie / indices: not one family (v400 kin pass)
  '10876|33757', // chart / charter: not one family (v400 kin pass); chart and charter share Latin charta, not felt
  '10959|29131', // bars / bared: not one family (v400 kin pass)
  '10976|29054', // posse / possess: not one family (v400 kin pass)
  '11003|41531', // trill / trillion: not one family (v400 kin pass)
  '11050|39383', // pit / pitiful: not one family (v400 kin pass)
  '11753|51086', // pointe / pointer: not one family (v400 kin pass); consistency (was K?, chunk 09:13): pointe is French, not a form of point or pointer (as 12:36, 12:37)
  '11836|40028', // shimmy / shimmering: not one family (v400 kin pass)
  '11901|67270', // bun / bunion: not one family (v400 kin pass)
  '11910|23705', // wash / washer: not one family (v400 kin pass); washer (ring) is not from wash
  '11910|23783', // wash / washer: not one family (v400 kin pass); washer (tap ring) is not from wash
  '11910|40232', // wash / washer: not one family (v400 kin pass); washer (ring) is not from wash
  '11980|33888', // realism / real: not one family (v400 kin pass); real the currency is Portuguese royal, not real
  '12183|45497', // pigment / pig: not one family (v400 kin pass)
  '12303|49688', // box / boxer: not one family (v400 kin pass); the boxer engine is named after boxing, not box
  '13754|39279', // pun / puny: not one family (v400 kin pass)
  '13771|39955', // bit / biting: not one family (v400 kin pass); bit (comedy routine) is not felt as bite
  '13771|56720', // bit / bitter: not one family (v400 kin pass)
  '13931|56796', // colonial / colon: not one family (v400 kin pass)
  '14214|38257', // arch / archives: not one family (v400 kin pass)
  '14214|57590', // arch / archive: not one family (v400 kin pass)
  '14728|48280', // din / diner: not one family (v400 kin pass)
  '14826|26776', // tacky / tack: not one family (v400 kin pass)
  '14826|43467', // tacky / tacking: not one family (v400 kin pass); tacky (sticky) and tacking (sailing): two removes apart
  '14826|47459', // tacky / tack: not one family (v400 kin pass); tacky (sticky) is not felt as tack (sailing)
  '14840|39205', // tangible / tangy: not one family (v400 kin pass)
  '15292|47462', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '15292|47598', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '15292|48887', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '15711|46020', // trimester / trimming: not one family (v400 kin pass)
  '15711|47484', // trimester / trim: not one family (v400 kin pass)
  '16122|48175', // journaling / journey: not one family (v400 kin pass); journal and journey share a French root, not felt
  '16301|32886', // amber / ambitious: not one family (v400 kin pass)
  '16343|23697', // lather / lathe: not one family (v400 kin pass)
  '16915|45595', // wander / wands: not one family (v400 kin pass)
  '16959|29953', // holler / holly: not one family (v400 kin pass)
  '17147|38688', // bray / brass: not one family (v400 kin pass)
  '17156|27342', // twitter / twit: not one family (v400 kin pass)
  '17415|39383', // pit / pitiful: not one family (v400 kin pass)
  '18158|42935', // digestive / dig: not one family (v400 kin pass)
  '19387|55266', // poke / poker: not one family (v400 kin pass)
  '19887|27428', // can / canny: not one family (v400 kin pass)
  '19963|28838', // liter / lite: not one family (v400 kin pass)
  '20117|35242', // tea / teaser: not one family (v400 kin pass)
  '20489|45131', // caste / casting: not one family (v400 kin pass)
  '20732|56000', // miller / mille: not one family (v400 kin pass)
  '21765|31459', // parchment / parched: not one family (v400 kin pass)
  '23145|45959', // vanity / vanish: not one family (v400 kin pass)
  '23247|27321', // gutter / gutted: not one family (v400 kin pass)
  '23705|31203', // washer / wash: not one family (v400 kin pass); washer (ring) is not from wash
  '23705|45925', // washer / wash: not one family (v400 kin pass); washer (ring) is not from wash
  '23783|31203', // washer / wash: not one family (v400 kin pass); washer (tap ring) is not from wash
  '23783|45925', // washer / wash: not one family (v400 kin pass); washer (tap ring) is not from wash
  '23818|43038', // putty / putt: not one family (v400 kin pass)
  '23818|50356', // putty / putter: not one family (v400 kin pass)
  '24034|58397', // plaster / plasticity: not one family (v400 kin pass); plaster and plasticity share a Greek root, not felt
  '24226|67302', // sewer / sew: not one family (v400 kin pass); sewer (drain) is not from sew
  '24444|35482', // chaps / chap: not one family (v400 kin pass); chaps (leggings) is from Spanish chaparreras, not chap
  '24518|39288', // mod / modest: not one family (v400 kin pass)
  '24518|56686', // mod / modest: not one family (v400 kin pass)
  '25486|32636', // tote / totally: not one family (v400 kin pass)
  '25487|30962', // canister / canal: not one family (v400 kin pass)
  '25498|40131', // pitcher / pitch: not one family (v400 kin pass); pitcher (jug) is not from pitch (tar)
  '25498|45110', // pitcher / pitch: not one family (v400 kin pass); pitcher (jug) is not from pitch (climbing)
  '25589|30682', // wick / wicker: not one family (v400 kin pass)
  '25767|45132', // trolley / trolling: not one family (v400 kin pass); trolley and trolling (fishing) are not felt as one
  '26445|34869', // thee / thesis: not one family (v400 kin pass)
  '26568|48722', // jeepers / jeep: not one family (v400 kin pass)
  '26676|32617', // indices / indeed: not one family (v400 kin pass)
  '27222|39848', // cap / caper: not one family (v400 kin pass)
  '27237|28779', // based / bass: not one family (v400 kin pass)
  '27237|39682', // based / bass: not one family (v400 kin pass)
  '27308|50347', // bunk / bunker: not one family (v400 kin pass)
  '27336|27722', // geezer / geez: not one family (v400 kin pass)
  '27349|30682', // wicked / wicker: not one family (v400 kin pass)
  '27383|58397', // plaster / plasticity: not one family (v400 kin pass); plaster and plasticity share a Greek root, not felt
  '27400|45757', // laddie / ladder: not one family (v400 kin pass)
  '27401|43463', // lassie / laser: not one family (v400 kin pass)
  '27665|43036', // cad / caddie: not one family (v400 kin pass); cad and caddie share an old root, not felt
  '27857|42367', // verily / version: not one family (v400 kin pass)
  '27895|38723', // tarry / tar: not one family (v400 kin pass); tarry (linger) is not tar + y
  '27895|39066', // tarry / tar: not one family (v400 kin pass); tarry (linger) is not tar + y
  '28008|32803', // pass / passion: not one family (v400 kin pass)
  '28116|43433', // bower / bow: not one family (v400 kin pass); bower (shelter) is not bow
  '28116|47601', // bower / bow: not one family (v400 kin pass); bower (shelter) is not bow
  '28179|39118', // down / downy: not one family (v400 kin pass); downy is from down (feathers), not the direction
  '28644|31662', // jaded / jade: not one family (v400 kin pass); jaded (weary) is not from the gem
  '28644|38591', // jaded / jade: not one family (v400 kin pass); jaded (weary) is not from the color
  '28668|34139', // figment / figs: not one family (v400 kin pass)
  '28708|40127', // jetty / jet: not one family (v400 kin pass); jetty is not from jet (gemstone)
  '28872|40058', // ding / dingy: not one family (v400 kin pass)
  '28931|35263', // stat / static: not one family (v400 kin pass)
  '28931|64103', // stat / station: not one family (v400 kin pass)
  '29054|50077', // possess / posse: not one family (v400 kin pass); posse and possess share a Latin root, not felt
  '29360|60580', // skipper / skip: not one family (v400 kin pass)
  '29420|35612', // admiral / admirer: not one family (v400 kin pass)
  '29428|40343', // arsenal / arsenic: not one family (v400 kin pass)
  '29548|58633', // bowler / bowled: not one family (v400 kin pass); the bowler hat is named after a hatter, not bowl
  '29700|56141', // Jamie / Jamal: not one family (v400 kin pass)
  '30070|49688', // box / boxer: not one family (v400 kin pass)
  '30595|32924', // hops / hopeful: not one family (v400 kin pass)
  '30996|66805', // key / keyless: not one family (v400 kin pass); key (island) is not felt in keyless
  '31203|40232', // wash / washer: not one family (v400 kin pass); washer (ring) is not from wash
  '31256|33082', // tempest / temp: not one family (v400 kin pass)
  '31470|33105', // catkins / caterer: not one family (v400 kin pass)
  '31789|39383', // pit / pitiful: not one family (v400 kin pass)
  '32176|56796', // colony / colon: not one family (v400 kin pass)
  '32463|56719', // pet / petty: not one family (v400 kin pass)
  '32464|67486', // hon / honesty: not one family (v400 kin pass)
  '32695|43130', // miserable / miss: not one family (v400 kin pass)
  '32803|45971', // passion / pass: not one family (v400 kin pass)
  '32822|45579', // doting / dots: not one family (v400 kin pass)
  '32957|58397', // plasterer / plasticity: not one family (v400 kin pass); plaster and plasticity share a Greek root, not felt
  '33008|47462', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '33008|47598', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '33008|48887', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '33238|47462', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '33238|47598', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '33238|48887', // porter / port: not one family (v400 kin pass); porter (carrier) is not from port
  '33483|42997', // lobby / lob: not one family (v400 kin pass)
  '33918|41706', // statement / statistic: not one family (v400 kin pass)
  '33959|39955', // bit / biting: not one family (v400 kin pass)
  '33959|56720', // bit / bitter: not one family (v400 kin pass)
  '34074|59418', // ticker / ticking: not one family (v400 kin pass); ticking (fabric) is not from ticker
  '34144|46004', // slippers / slip: not one family (v400 kin pass); slip (pottery clay) is not felt in slippers
  '34559|40864', // specialist / species: not one family (v400 kin pass)
  '34753|41114', // classics / class: not one family (v400 kin pass); classics is from classic, not felt as class
  '34753|42302', // classics / class: not one family (v400 kin pass); classics is from classic, not felt as class
  '35263|41706', // static / statistic: not one family (v400 kin pass)
  '35491|42766', // punter / punt: not one family (v400 kin pass); punter (gambler) is not from punt (kick)
  '37954|47831', // port / porter: not one family (v400 kin pass); porter (railway) is not from port
  '38257|38974', // archives / arch: not one family (v400 kin pass)
  '38492|56796', // colony / colon: not one family (v400 kin pass)
  '38974|57590', // arch / archive: not one family (v400 kin pass)
  '39205|66175', // tangy / tang: not one family (v400 kin pass); tang (fish) is not felt in tangy
  '39247|67120', // towering / towed: not one family (v400 kin pass)
  '39288|45656', // modest / mod: not one family (v400 kin pass)
  '39848|50360', // caper / cap: not one family (v400 kin pass)
  '40131|50069', // pitch / pitcher: not one family (v400 kin pass); pitch here is tar; pitcher is from pitch (throw)
  '40232|45925', // washer / wash: not one family (v400 kin pass); washer (hardware ring) is not from wash
  '40817|63615', // core / coral: not one family (v400 kin pass)
  '41706|64103', // statistic / station: not one family (v400 kin pass)
  '42459|47831', // port / porter: not one family (v400 kin pass); port (socket) and porter (carrier) share Latin roots only; not felt
  '42940|55985', // setter / sette: not one family (v400 kin pass)
  '43098|60974', // lob / lobbyist: not one family (v400 kin pass)
  '43346|43437', // fins / finish: not one family (v400 kin pass)
  '43404|43437', // fin / finish: not one family (v400 kin pass)
  '43437|44366', // finish / finalist: not one family (v400 kin pass); finish and finalist share Latin finis only
  '43437|46962', // finish / fine: not one family (v400 kin pass)
  '43455|47831', // port / porter: not one family (v400 kin pass); port (left side) and porter: not felt
  '43763|49202', // reversal / rev: not one family (v400 kin pass)
  '44366|47124', // finalist / fin: not one family (v400 kin pass)
  '44366|58040', // finalist / fins: not one family (v400 kin pass)
  '44843|56720', // bit / bitter: not one family (v400 kin pass)
  '45482|56693', // tactic / tactful: not one family (v400 kin pass); tactic (Greek taktikos) and tactful (tact, touch): different roots
  '45482|56727', // tactic / tactless: not one family (v400 kin pass); as tactic/tactful
  '45656|56686', // mod / modest: not one family (v400 kin pass)
  '46056|47124', // finish / fin: not one family (v400 kin pass)
  '46056|58040', // finish / fins: not one family (v400 kin pass)
  '46516|47689', // caber / cab: not one family (v400 kin pass)
  '46962|58040', // fine / fins: not one family (v400 kin pass)
  '47628|56627', // mate / mater: not one family (v400 kin pass)
  '48504|63616', // corner / corn: not one family (v400 kin pass)
  '56627|58761', // mater / mat: not one family (v400 kin pass)
  '60974|61529', // lobbyist / lob: not one family (v400 kin pass)
  '359|26343', // date / dative: not one family (v400 kin pass)
  '430|60888', // yam / yammer: not one family (v400 kin pass)
  '1029|8779', // mole / molly: not one family (v400 kin pass)
  '1052|38723', // tarsier / tar: not one family (v400 kin pass)
  '1052|39066', // tarsier / tar: not one family (v400 kin pass)
  '1072|50382', // gull / gully: not one family (v400 kin pass)
  '1223|14223', // carp / carpals: not one family (v400 kin pass)
  '1226|27030', // bass / bas: not one family (v400 kin pass)
  '1438|56631', // mutt / mutter: not one family (v400 kin pass)
  '1447|5618', // cavy / caving: not one family (v400 kin pass)
  '1463|43786', // stallion / stalling: not one family (v400 kin pass)
  '1932|8320', // cove / covey: not one family (v400 kin pass)
  '1939|23403', // cape / capers: not one family (v400 kin pass)
  '1963|40549', // tarn / tarnishing: not one family (v400 kin pass)
  '2027|8633', // muggy / mugger: not one family (v400 kin pass)
  '2408|57568', // scale / scaler: not one family (v400 kin pass); the dental scaler removes scale (deposit), not a map scale
  '2798|15604', // mast / mastic: not one family (v400 kin pass)
  '3253|13494', // gut / gutter: not one family (v400 kin pass)
  '3731|28526', // floss / floe: not one family (v400 kin pass)
  '4341|12624', // animism / anime: not one family (v400 kin pass)
  '4404|20814', // trench / trencher: not one family (v400 kin pass); trencher (plate) is from French trancher, not felt as trench
  '4552|29037', // register / regal: not one family (v400 kin pass)
  '4924|23403', // cape / capers: not one family (v400 kin pass)
  '4937|30436', // bloomers / bloom: not one family (v400 kin pass); bloomers are named after Amelia Bloomer, not bloom
  '5045|20373', // polyester / polis: not one family (v400 kin pass)
  '5218|20338', // croquet / croquettes: not one family (v400 kin pass)
  '6066|57568', // scale / scaler: not one family (v400 kin pass); the dental scaler is not from the musical scale
  '6143|27030', // bassist / bas: not one family (v400 kin pass)
  '6155|63600', // harpist / harpy: not one family (v400 kin pass)
  '6644|27333', // legion / legless: not one family (v400 kin pass)
  '6644|43175', // legion / leg: not one family (v400 kin pass)
  '7331|30962', // cans / canal: not one family (v400 kin pass)
  '7407|10270', // stress / string: not one family (v400 kin pass)
  '7407|55314', // stress / stringer: not one family (v400 kin pass)
  '7407|58803', // stress / stringer: not one family (v400 kin pass)
  '7453|48035', // variable / varial: not one family (v400 kin pass); consistency (was K?, chunk 10:249): varial is not felt as from variable (as 11:90, 11:92)
  '7614|40834', // cursive / curie: not one family (v400 kin pass)
  '7680|56538', // tan / tansy: not one family (v400 kin pass)
  '8633|14207', // mugger / mug: not one family (v400 kin pass)
  '8633|27325', // mugger / mug: not one family (v400 kin pass)
  '8741|29279', // ling / lingerie: not one family (v400 kin pass)
  '8779|14328', // molly / mole: not one family (v400 kin pass)
  '8779|33830', // molly / mole: not one family (v400 kin pass)
  '8808|26663', // elver / elves: not one family (v400 kin pass)
  '9279|31801', // collie / colliery: not one family (v400 kin pass); collie may come from coal; not felt
  '9279|31803', // collie / collier: not one family (v400 kin pass); as collie/colliery
  '10205|27399', // bray / brae: not one family (v400 kin pass)
  '10232|16335', // nicker / nick: not one family (v400 kin pass)
  '10232|27330', // nicker / nick: not one family (v400 kin pass)
  '10254|67122', // tower / tow: not one family (v400 kin pass)
  '10403|42871', // spines / spinner: not one family (v400 kin pass)
  '10403|58899', // spines / spinner: not one family (v400 kin pass)
  '10613|24037', // timbales / timber: not one family (v400 kin pass)
  '11102|20841', // lively / livery: not one family (v400 kin pass)
  '11826|28526', // floss / floe: not one family (v400 kin pass)
  '12697|27533', // toon / toonie: not one family (v400 kin pass)
  '13568|42935', // digest / dig: not one family (v400 kin pass)
  '13609|27332', // troll / trollied: not one family (v400 kin pass); trollied (drunk) is from trolley, not troll
  '13672|62637', // Elmer / Elm: not one family (v400 kin pass)
  '13712|38794', // barker / bark: not one family (v400 kin pass); consistency (was K?, chunk 10:326): barker is derived from bark (dog); tree bark (and its color) is an unrelated word (as 05:424)
  '13731|67290', // patter / patty: not one family (v400 kin pass)
  '13839|34159', // inversion / invest: not one family (v400 kin pass)
  '14483|40435', // molar / molarity: not one family (v400 kin pass)
  '14661|39346', // peer / peerless: not one family (v400 kin pass); peerless is from peer (an equal), not peer (look)
  '15042|63052', // congestion / conger: not one family (v400 kin pass)
  '15368|32885', // cautery / cautious: not one family (v400 kin pass)
  '15604|34932', // mastic / master: not one family (v400 kin pass)
  '15604|35566', // mastic / master: not one family (v400 kin pass)
  '15966|30121', // spinning / spinney: not one family (v400 kin pass)
  '16083|49166', // surreal / surrey: not one family (v400 kin pass)
  '16094|49202', // reverie / rev: not one family (v400 kin pass)
  '16116|28526', // floss / floe: not one family (v400 kin pass)
  '16343|24050', // lather / lath: not one family (v400 kin pass)
  '16920|29019', // totter / tot: not one family (v400 kin pass)
  '16968|43710', // jabber / jab: not one family (v400 kin pass)
  '17419|25537', // pip / piping: not one family (v400 kin pass)
  '17419|28273', // pip / piping: not one family (v400 kin pass)
  '17875|41691', // skewers / skew: not one family (v400 kin pass)
  '20373|23861', // polis / polish: not one family (v400 kin pass)
  '20373|33290', // polis / policy: not one family (v400 kin pass)
  '20373|40025', // polis / polished: not one family (v400 kin pass)
  '20373|46926', // polis / pole: not one family (v400 kin pass)
  '20373|57572', // polis / polishing: not one family (v400 kin pass)
  '20747|43433', // bowyer / bow: not one family (v400 kin pass); bowyer makes bows (weapon); the bow of a boat is another word
  '20747|47601', // bowyer / bow: not one family (v400 kin pass); as bowyer/bow (rowing)
  '20814|21689', // trencher / trench: not one family (v400 kin pass); trencher (plate) is from French trancher, not felt as trench
  '21213|27785', // bullion / bull: not one family (v400 kin pass)
  '21213|34059', // bullion / bull: not one family (v400 kin pass)
  '21370|27287', // sapper / sap: not one family (v400 kin pass); sapper is from sap (a trench), not sap (fool)
  '21370|39065', // sapper / sap: not one family (v400 kin pass); sapper is from sap (a trench), not tree sap
  '21469|43457', // rationing / rate: not one family (v400 kin pass)
  '21765|39939', // parchment / parching: not one family (v400 kin pass)
  '22983|28924', // spats / spat: not one family (v400 kin pass)
  '23403|27222', // capers / cap: not one family (v400 kin pass)
  '23403|50360', // capers / cap: not one family (v400 kin pass)
  '23696|25379', // planer / planner: not one family (v400 kin pass)
  '23861|27001', // polish / pole: not one family (v400 kin pass)
  '23861|41896', // polish / pole: not one family (v400 kin pass)
  '24181|32934', // listing / listless: not one family (v400 kin pass); listless is from list (desire), not listing (property)
  '24343|34019', // sundress / sundries: not one family (v400 kin pass)
  '24344|67071', // kilt / kilter: not one family (v400 kin pass)
  '25179|53080', // proposal / propolis: not one family (v400 kin pass)
  '25512|31806', // pannier / panning: not one family (v400 kin pass)
  '25537|30707', // piping / pip: not one family (v400 kin pass)
  '27001|33290', // pole / policy: not one family (v400 kin pass)
  '27001|40025', // pole / polished: not one family (v400 kin pass)
  '27001|57572', // pole / polishing: not one family (v400 kin pass)
  '27030|28779', // bas / bass: not one family (v400 kin pass)
  '27030|39682', // bas / bass: not one family (v400 kin pass)
  '27045|35482', // chappal / chap: not one family (v400 kin pass)
  '27280|33369', // dogs / doge: not one family (v400 kin pass)
  '27332|35070', // trollied / troll: not one family (v400 kin pass); trollied (drunk) is from trolley, not troll
  '27338|43282', // wally / wall: not one family (v400 kin pass)
  '27361|42902', // proper / prop: not one family (v400 kin pass)
  '27362|27634', // jammy / jammies: not one family (v400 kin pass); jammies is from pyjamas, not jam
  '27399|38688', // brae / brass: not one family (v400 kin pass)
  '27760|41357', // gibberish / gibbous: not one family (v400 kin pass)
  '28149|33121', // mush / musher: not one family (v400 kin pass); mush (friend) and musher (from mush, go) are different words
  '28261|39716', // carrier / carrion: not one family (v400 kin pass)
  '28273|30707', // piping / pip: not one family (v400 kin pass)
  '28708|31691', // jetty / jet: not one family (v400 kin pass)
  '28766|46009', // cent / centering: not one family (v400 kin pass)
  '29005|32129', // stats / station: not one family (v400 kin pass)
  '29005|33272', // stats / stationer: not one family (v400 kin pass)
  '29012|49202', // reviver / rev: not one family (v400 kin pass)
  '29379|63993', // reef / reefer: not one family (v400 kin pass); reefer (refrigerated truck) is from refrigerator, not reef
  '30121|45537', // spinney / spinner: not one family (v400 kin pass)
  '30377|45654', // campion / camping: not one family (v400 kin pass)
  '31077|63993', // reef / reefer: not one family (v400 kin pass); reefer (refrigerated truck) is from refrigerator, not reef
  '32129|33918', // station / statement: not one family (v400 kin pass)
  '32129|35263', // station / static: not one family (v400 kin pass)
  '32505|65019', // cheers / chess: not one family (v400 kin pass)
  '32615|34187', // absolutely / absolution: not one family (v400 kin pass); absolution is from absolve; shares letters with absolutely, not felt
  '32617|43648', // indeed / indy: not one family (v400 kin pass)
  '32919|33870', // pensive / pension: not one family (v400 kin pass)
  '33082|49807', // temp / tempering: not one family (v400 kin pass)
  '33272|33918', // stationer / statement: not one family (v400 kin pass)
  '33272|35263', // stationer / static: not one family (v400 kin pass)
  '33290|41896', // policy / pole: not one family (v400 kin pass)
  '33732|39514', // motive / mote: not one family (v400 kin pass)
  '33870|50686', // pension / pen: not one family (v400 kin pass)
  '34187|67112', // absolution / absolute: not one family (v400 kin pass); absolution is from absolve; absolute looks alike, not felt
  '34556|40676', // fusilier / fuse: not one family (v400 kin pass)
  '34556|40809', // fusilier / fusion: not one family (v400 kin pass)
  '34556|49766', // fusilier / fuse: not one family (v400 kin pass)
  '34563|43457', // ration / rate: not one family (v400 kin pass); ration and rate share Latin ratio, not felt
  '35520|47689', // cabal / cab: not one family (v400 kin pass)
  '35655|43036', // cad / caddie: not one family (v400 kin pass); cad is from caddie/cadet historically, not felt
  '38584|39628', // lapis / lap: not one family (v400 kin pass)
  '38584|43273', // lapis / lap: not one family (v400 kin pass)
  '38675|45141', // lead / leader: not one family (v400 kin pass); lead here is the metal, not the lead of leader (as in the pilot)
  '38688|67128', // brass / brasserie: not one family (v400 kin pass)
  '39137|41350', // burnished / burn: not one family (v400 kin pass); burnish is from French brunir, not burn: look-alike only
  '39314|39838', // spry / spring: not one family (v400 kin pass)
  '39350|49689', // rad / radial: not one family (v400 kin pass)
  '39460|42308', // comely / comment: not one family (v400 kin pass)
  '39716|41623', // carrion / carry: not one family (v400 kin pass)
  '39716|64021', // carrion / carrier: not one family (v400 kin pass)
  '40025|41896', // polished / pole: not one family (v400 kin pass)
  '40598|56811', // density / denier: not one family (v400 kin pass)
  '40814|41836', // decay / deca: not one family (v400 kin pass)
  '41350|46017', // burn / burnish: not one family (v400 kin pass); burnish is from French brunir, not burn: look-alike only
  '41531|50914', // trillion / trilling: not one family (v400 kin pass)
  '41635|48035', // variable / varial: not one family (v400 kin pass); varial (skate trick) is not felt as from variable
  '41896|57572', // pole / polishing: not one family (v400 kin pass)
  '42295|48035', // variable / varial: not one family (v400 kin pass); varial (skate trick) is not felt as from variable
  '43052|49853', // pin / pinion: not one family (v400 kin pass)
  '43754|49853', // pin / pinion: not one family (v400 kin pass)
  '45440|49853', // pin / pinion: not one family (v400 kin pass)
  '45902|57568', // scale / scaler: not one family (v400 kin pass); consistency (was K?, chunk 11:127): the dental scaler removes scale (flake); the model scale (Latin scala) is an unrelated word (as map, music)
  '46009|55951', // centering / cent: not one family (v400 kin pass)
  '49632|57865', // phaser / phaal: not one family (v400 kin pass)
  '50191|63052', // congestion / conger: not one family (v400 kin pass)
  '54617|67908', // Clovis / Clover: not one family (v400 kin pass)
  '56784|58570', // punt / punter: not one family (v400 kin pass); consistency (was K, chunk 11:152): punter (football) is derived from punt (kick); punt here (currency, bottle dimple) is an unrelated word
  '957|33082', // temper / temp: not one family (v400 kin pass)
  '1434|10327', // antlion / antler: not one family (v400 kin pass)
  '1460|30680', // ram / ramie: not one family (v400 kin pass)
  '1501|1798', // whinny / whin: not one family (v400 kin pass)
  '1871|67090', // sundial / sunder: not one family (v400 kin pass)
  '1932|20043', // cove / covers: not one family (v400 kin pass)
  '2492|56809', // station / stater: not one family (v400 kin pass)
  '2515|27716', // bothy / bother: not one family (v400 kin pass)
  '3049|35521', // cot / coterie: not one family (v400 kin pass)
  '3441|57983', // dropsy / dropper: not one family (v400 kin pass)
  '4361|7749', // pantheism / panther: not one family (v400 kin pass)
  '4472|27360', // sortie / sorted: not one family (v400 kin pass)
  '5251|51296', // snooker / snook: not one family (v400 kin pass)
  '5311|10280', // rafting / rafter: not one family (v400 kin pass); a rafter of turkeys is not from raft
  '6589|43346', // finial / fins: not one family (v400 kin pass)
  '6589|43404', // finial / fin: not one family (v400 kin pass)
  '6589|44366', // finial / finalist: not one family (v400 kin pass)
  '6589|46056', // finial / finish: not one family (v400 kin pass)
  '6589|46962', // finial / fine: not one family (v400 kin pass)
  '7287|43696', // bit / biter: not one family (v400 kin pass)
  '7385|33902', // lever / lev: not one family (v400 kin pass)
  '7407|35209', // stress / stringer: not one family (v400 kin pass)
  '7407|50131', // stress / stringer: not one family (v400 kin pass)
  '8083|31844', // cony / cone: not one family (v400 kin pass)
  '8084|31844', // coney / cone: not one family (v400 kin pass)
  '8380|16680', // cere / cereals: not one family (v400 kin pass)
  '8387|45959', // vane / vanish: not one family (v400 kin pass)
  '9143|55562', // halteres / halter: not one family (v400 kin pass); halteres is from Greek halter (weights), not felt as halter
  '9268|30680', // ram / ramie: not one family (v400 kin pass)
  '9279|59158', // collie / collier: not one family (v400 kin pass)
  '9746|42105', // genet / genetics: not one family (v400 kin pass)
  '10228|56424', // peep / peepal: not one family (v400 kin pass)
  '10281|14744', // muster / musty: not one family (v400 kin pass)
  '10862|24484', // jam / jammers: not one family (v400 kin pass); consistency (was K?, chunk 11:221): jammers (swimwear) are not from jam (as 06:347)
  '11769|32803', // passe / passion: not one family (v400 kin pass)
  '12223|41350', // burnishing / burn: not one family (v400 kin pass); burnish is from French brunir, not burn: look-alike only
  '15525|47380', // Vicks / Vickers: not one family (v400 kin pass)
  '16913|34090', // stagger / stag: not one family (v400 kin pass)
  '19789|43809', // quarter / quarte: not one family (v400 kin pass); consistency (was K?, chunk 11:239): quarte is not a form of quarter; the Latin root is not felt (as the four other quarte/quarter lines)
  '19908|48504', // corn / corner: not one family (v400 kin pass)
  '19992|61545', // mash / mashie: not one family (v400 kin pass); mashie (golf club) is not from mash
  '20815|39215', // frumenty / fruity: not one family (v400 kin pass)
  '20903|47445', // hatchment / hatch: not one family (v400 kin pass)
  '21322|41464', // slops / slope: not one family (v400 kin pass)
  '23861|60970', // polish / polity: not one family (v400 kin pass)
  '24484|27634', // jammers / jammies: not one family (v400 kin pass); jammies is from pyjamas, not jam
  '25124|35224', // banns / banner: not one family (v400 kin pass); banns is from ban, not banner
  '25124|55637', // banns / banner: not one family (v400 kin pass); banns is from ban, not banner
  '25357|43809', // quarter / quarte: not one family (v400 kin pass); consistency (was K?, chunk 11:263): quarte is not a form of quarter; the Latin root is not felt (as the four other quarte/quarter lines)
  '27280|27587', // dogs / dogie: not one family (v400 kin pass); dogie (calf) is not felt as from dog
  '27526|41883', // stoked / stokes: not one family (v400 kin pass)
  '27760|60114', // gibberish / gib: not one family (v400 kin pass)
  '28044|49549', // lava / lavalier: not one family (v400 kin pass)
  '28261|32074', // carrier / carr: not one family (v400 kin pass)
  '28546|63101', // money / monal: not one family (v400 kin pass)
  '28823|60970', // polite / polity: not one family (v400 kin pass)
  '29005|56809', // stats / stater: not one family (v400 kin pass)
  '29011|50762', // redder / redd: not one family (v400 kin pass)
  '29238|50762', // reddish / redd: not one family (v400 kin pass)
  '29514|53948', // nemesis / nemes: not one family (v400 kin pass)
  '30271|49450', // embers / embedding: not one family (v400 kin pass)
  '32028|40964', // tropical / tropism: not one family (v400 kin pass); tropism and tropical share Greek tropos, not felt
  '32074|41623', // carr / carry: not one family (v400 kin pass)
  '32074|64021', // carr / carrier: not one family (v400 kin pass)
  '33105|40457', // caterer / cation: not one family (v400 kin pass)
  '33918|56809', // statement / stater: not one family (v400 kin pass)
  '34400|41350', // burnous / burn: not one family (v400 kin pass)
  '35263|56809', // static / stater: not one family (v400 kin pass)
  '39635|61421', // chug / chugger: not one family (v400 kin pass); chugger (charity mugger) is not from chug
  '39890|49450', // ember / embedding: not one family (v400 kin pass)
  '40025|60970', // polished / polity: not one family (v400 kin pass)
  '46796|56760', // meter / metical: not one family (v400 kin pass)
  '46926|60970', // pole / polity: not one family (v400 kin pass)
  '48829|55709', // fan / fanous: not one family (v400 kin pass)
  '49751|60108', // tidal / tiding: not one family (v400 kin pass); tiding (magpies) is not felt as from tidal
  '50062|56424', // peep / peepal: not one family (v400 kin pass)
  '50356|61240', // putter / puttees: not one family (v400 kin pass)
  '56809|64103', // stater / station: not one family (v400 kin pass)
  '57572|60970', // polishing / polity: not one family (v400 kin pass)
  '60957|67481', // mercer / mercy: not one family (v400 kin pass)
  '438|43161', // endive / end: not one family (v400 kin pass)
  '438|43691', // endive / end: not one family (v400 kin pass)
  '1033|5962', // jackal / jacks: not one family (v400 kin pass)
  '1033|10286', // jackal / jack: not one family (v400 kin pass)
  '1033|37974', // jackal / jack: not one family (v400 kin pass)
  '1232|9201', // blowfish / blowfly: not one family (v400 kin pass); compounds with blow: not one family
  '1251|11346', // grouper / groupie: not one family (v400 kin pass)
  '1347|5266', // skeeter / skeet: not one family (v400 kin pass)
  '1462|1549', // steer / steed: not one family (v400 kin pass)
  '1536|4034', // bit / bitterness: not one family (v400 kin pass)
  '1536|39166', // bit / bitters: not one family (v400 kin pass)
  '1867|46089', // rockery / rocker: not one family (v400 kin pass); consistency (was K?, chunk 11:367): rocker is derived from rock (sway); rock (stone) is an unrelated word
  '2764|33988', // taxiing / taxable: not one family (v400 kin pass)
  '2800|27739', // rudder / ruddy: not one family (v400 kin pass)
  '2820|35491', // punt / punter: not one family (v400 kin pass); consistency (was K, chunk 11:378): punter (gambler) is derived from punt (bet); punt here (boat, kick) is an unrelated word (as 13:259, 13:260)
  '2823|12301', // galley / gallery: not one family (v400 kin pass); gallery and galley share a root, not felt
  '2823|43070', // galley / gallery: not one family (v400 kin pass); gallery and galley share a root, not felt
  '2823|63880', // galley / gallerist: not one family (v400 kin pass)
  '2968|26181', // leg / legible: not one family (v400 kin pass)
  '3289|10293', // bile / billy: not one family (v400 kin pass)
  '3418|30423', // sepsis / sepal: not one family (v400 kin pass)
  '3495|6449', // biopsy / biopic: not one family (v400 kin pass)
  '3773|43181', // toner / ton: not one family (v400 kin pass)
  '3924|10447', // bestie / bestial: not one family (v400 kin pass)
  '4034|13771', // bitterness / bit: not one family (v400 kin pass)
  '4034|33959', // bitterness / bit: not one family (v400 kin pass)
  '4034|44843', // bitterness / bit: not one family (v400 kin pass)
  '4316|40923', // heresy / heredity: not one family (v400 kin pass)
  '4431|46032', // battalion / bat: not one family (v400 kin pass)
  '4575|17667', // tube / tuber: not one family (v400 kin pass)
  '4921|35265', // tunic / tuner: not one family (v400 kin pass)
  '4921|39675', // tunic / tuneful: not one family (v400 kin pass)
  '5327|17667', // tubing / tuber: not one family (v400 kin pass)
  '6169|45547', // piper / pip: not one family (v400 kin pass)
  '6415|20489', // casting / caste: not one family (v400 kin pass)
  '6507|19802', // parable / pare: not one family (v400 kin pass)
  '6507|38489', // parable / parish: not one family (v400 kin pass)
  '6554|43581', // spire / spiral: not one family (v400 kin pass); spire and spiral are different words: look-alike only
  '7704|27404', // ocher / och: not one family (v400 kin pass)
  '8079|45516', // kit / kitty: not one family (v400 kin pass); kitty (pool) is not from kit (as kitty/kit in the pilot)
  '8165|17134', // tit / titter: not one family (v400 kin pass)
  '10137|45516', // kit / kitty: not one family (v400 kin pass); kit (young fox) and kitty (pot) are not one family
  '10158|43975', // aerie / aerial: not one family (v400 kin pass)
  '11001|43181', // tonic / ton: not one family (v400 kin pass)
  '11628|29851', // Sade / Sadie: not one family (v400 kin pass)
  '11753|34791', // pointe / pointer: not one family (v400 kin pass); pointe is French, not felt as pointer
  '11753|42313', // pointe / pointer: not one family (v400 kin pass); pointe is French, not felt as pointer
  '11910|61446', // wash / washers: not one family (v400 kin pass); washer (ring) is not felt as wash, as drawer/drawing
  '12039|28433', // pedestal / pedal: not one family (v400 kin pass)
  '12043|20489', // casting / caste: not one family (v400 kin pass)
  '12288|26181', // legs / legible: not one family (v400 kin pass)
  '12299|39383', // pit / pitiful: not one family (v400 kin pass)
  '12301|47327', // gallery / galley: not one family (v400 kin pass)
  '12301|47431', // gallery / galley: not one family (v400 kin pass)
  '13674|27169', // Maisy / Mai: not one family (v400 kin pass)
  '13771|39166', // bit / bitters: not one family (v400 kin pass)
  '13814|21494', // accordionist / accord: not one family (v400 kin pass)
  '14728|64798', // din / dinner: not one family (v400 kin pass)
  '14827|34027', // clammy / clams: not one family (v400 kin pass)
  '14840|66175', // tangible / tang: not one family (v400 kin pass)
  '15292|37954', // porter / port: not one family (v400 kin pass); porter (from Latin portare) is not from port (harbour/side)
  '15292|42459', // porter / port: not one family (v400 kin pass); porter is not from port (network)
  '15292|43455', // porter / port: not one family (v400 kin pass); porter is not from port
  '17110|22493', // pucker / puck: not one family (v400 kin pass)
  '17481|34184', // cress / creed: not one family (v400 kin pass)
  '17667|43389', // tuber / tube: not one family (v400 kin pass)
  '19416|56627', // mate / mater: not one family (v400 kin pass)
  '19802|38489', // pare / parish: not one family (v400 kin pass)
  '20489|40179', // caste / caster: not one family (v400 kin pass)
  '20489|45759', // caste / caster: not one family (v400 kin pass)
  '23874|47691', // buff / buffer: not one family (v400 kin pass); buffer (train) is not from buff (polish)
  '24672|34031', // waders / wad: not one family (v400 kin pass)
  '25497|27665', // caddy / cad: not one family (v400 kin pass)
  '25585|64261', // taper / taps: not one family (v400 kin pass)
  '26197|43007', // lettering / let: not one family (v400 kin pass)
  '26197|43085', // lettering / let: not one family (v400 kin pass)
  '26224|27321', // gutter / gutted: not one family (v400 kin pass)
  '26486|39953', // per / perishing: not one family (v400 kin pass)
  '27131|29518', // martes / martial: not one family (v400 kin pass); martes and martial both go back to Mars; not felt
  '27310|39646', // chuffed / chuff: not one family (v400 kin pass); chuffed (pleased) is not from chuff (train sound)
  '27311|56045', // knackered / knack: not one family (v400 kin pass)
  '27356|43463', // lass / laser: not one family (v400 kin pass)
  '27910|34084', // commode / commodities: not one family (v400 kin pass)
  '28116|63328', // bower / bow: not one family (v400 kin pass)
  '28453|57556', // spa / spaying: not one family (v400 kin pass)
  '28504|41631', // logger / log: not one family (v400 kin pass); log (logarithm) is another word than the logger's log
  '29938|67067', // raven / ravenous: not one family (v400 kin pass)
  '30157|56032', // gully / gullible: not one family (v400 kin pass)
  '30241|47602', // forester / fore: not one family (v400 kin pass)
  '31203|61446', // wash / washers: not one family (v400 kin pass); washer (ring) is not felt as wash
  '31459|38712', // parched / parchment: not one family (v400 kin pass)
  '31918|34459', // sediment / seder: not one family (v400 kin pass)
  '32072|34031', // wader / wad: not one family (v400 kin pass)
  '33008|37954', // porter / port: not one family (v400 kin pass); porter is not from port
  '33008|42459', // porter / port: not one family (v400 kin pass); porter is not from port
  '33008|43455', // porter / port: not one family (v400 kin pass); porter is not from port
  '33191|56627', // mate / mater: not one family (v400 kin pass)
  '33238|37954', // porter / port: not one family (v400 kin pass); porter is not from port
  '33238|42459', // porter / port: not one family (v400 kin pass); porter is not from port
  '33238|43455', // porter / port: not one family (v400 kin pass); porter is not from port
  '33483|43098', // lobby / lob: not one family (v400 kin pass)
  '33483|61529', // lobby / lob: not one family (v400 kin pass)
  '33959|39166', // bit / bitters: not one family (v400 kin pass)
  '34083|40608', // option / optics: not one family (v400 kin pass)
  '34591|62340', // mess / mes: not one family (v400 kin pass)
  '35043|39129', // supplement / supple: not one family (v400 kin pass)
  '35491|44277', // punter / punt: not one family (v400 kin pass); consistency (was K?, chunk 12:259): punter (gambler) is derived from punt (bet); punt here (boat, kick) is an unrelated word (as 13:259, 13:260)
  '35568|47691', // buff / buffer: not one family (v400 kin pass); buffer (train) is not from buff
  '35626|42252', // Swiftie / Swift: not one family (v400 kin pass); Taylor Swift's fans vs the Swift language: different names
  '38632|47691', // buff / buffer: not one family (v400 kin pass); buffer (train) is not from buff (color)
  '39166|44843', // bitters / bit: not one family (v400 kin pass)
  '40608|58288', // optics / option: not one family (v400 kin pass)
  '42376|59188', // launcher / launch: not one family (v400 kin pass); launch (boat) is another word than launcher's launch
  '43070|47327', // gallery / galley: not one family (v400 kin pass)
  '43070|47431', // gallery / galley: not one family (v400 kin pass)
  '43437|47124', // finish / fin: not one family (v400 kin pass)
  '43437|58040', // finish / fins: not one family (v400 kin pass)
  '45595|48151', // wands / wanderer: not one family (v400 kin pass)
  '45648|47691', // buff / buffer: not one family (v400 kin pass); buffer (train) is not from buff
  '45925|61446', // wash / washers: not one family (v400 kin pass); washer (ring) is not felt as wash
  '46089|65292', // rocker / rock: not one family (v400 kin pass); rocker (from rock, sway) vs rock pigeon (stone): different words
  '47327|63880', // galley / gallerist: not one family (v400 kin pass)
  '47431|63880', // galley / gallerist: not one family (v400 kin pass)
  '62765|62775', // fetal / fete: not one family (v400 kin pass)
  '593|43829', // danish / dan: not one family (v400 kin pass)
  '900|41805', // cordial / cord: not one family (v400 kin pass)
  '939|20721', // baste / bastion: not one family (v400 kin pass)
  '1033|42662', // jackal / jack: not one family (v400 kin pass)
  '1033|51609', // jackal / jack: not one family (v400 kin pass)
  '1132|4034', // bittern / bitterness: not one family (v400 kin pass)
  '1251|43162', // grouper / grouping: not one family (v400 kin pass); grouper (fish, Portuguese garoupa) is not from group
  '1292|22261', // kelp / kelpie: not one family (v400 kin pass); kelpie (water spirit) is not from kelp
  '1292|51034', // kelp / kelpie: not one family (v400 kin pass); kelpie (dog) is not from kelp
  '1379|18653', // mantis / manti: not one family (v400 kin pass)
  '1407|66445', // whitefly / whitefish: not one family (v400 kin pass); compounds sharing white: the Overlap rule's work
  '1867|58660', // rockery / rocker: not one family (v400 kin pass); rockery (stone) vs rocker (skating move): different senses of rock, not felt
  '1940|11880', // steppe / stepping: not one family (v400 kin pass)
  '2615|11761', // chassis / chasse: not one family (v400 kin pass)
  '2874|32816', // tender / tenderness: not one family (v400 kin pass); tender (train car, from tend) is not felt as tenderness
  '2890|23874', // buffers / buff: not one family (v400 kin pass); buffers (railway) is not from buff
  '2890|35568', // buffers / buff: not one family (v400 kin pass); buffers is not from buff
  '2890|38632', // buffers / buff: not one family (v400 kin pass); buffers is not from buff
  '2890|45648', // buffers / buff: not one family (v400 kin pass); buffers is not from buff
  '2927|32927', // jaunt / jaunty: not one family (v400 kin pass); jaunty is not from jaunt
  '2952|45595', // wanderings / wands: not one family (v400 kin pass)
  '2983|10314', // pension / pen: not one family (v400 kin pass)
  '3335|34083', // optic / option: not one family (v400 kin pass)
  '3335|58288', // optic / option: not one family (v400 kin pass)
  '3434|30366', // scabies / scabious: not one family (v400 kin pass); scabious (plant once used for scabies): not felt
  '3545|30845', // colic / col: not one family (v400 kin pass)
  '3545|31803', // colic / collier: not one family (v400 kin pass)
  '3545|45098', // colic / col: not one family (v400 kin pass)
  '3694|19089', // kip / kippers: not one family (v400 kin pass)
  '3694|19904', // kip / kipper: not one family (v400 kin pass)
  '4199|24421', // bust / bustier: not one family (v400 kin pass); bust here is arrest; bustier is from bust (chest)
  '4246|6228', // barrister / barre: not one family (v400 kin pass)
  '4260|31334', // mistrial / mistral: not one family (v400 kin pass)
  '4307|10977', // homily / homie: not one family (v400 kin pass)
  '4307|63613', // homily / homer: not one family (v400 kin pass)
  '4421|43457', // rations / rate: not one family (v400 kin pass)
  '4431|5089', // battalion / batting: not one family (v400 kin pass)
  '4431|11760', // battalion / battement: not one family (v400 kin pass)
  '4432|4552', // regiment / register: not one family (v400 kin pass)
  '4471|25585', // taps / taper: not one family (v400 kin pass)
  '4702|34084', // commode / commodities: not one family (v400 kin pass)
  '4937|17433', // bloomers / bloom: not one family (v400 kin pass); bloomers are named from Amelia Bloomer, not bloom
  '4937|27741', // bloomers / blooming: not one family (v400 kin pass); bloomers are not from bloom
  '5089|46032', // batting / bat: not one family (v400 kin pass); batting (quilt wadding) vs a pottery bat: different words
  '5342|67132', // coasteering / coasters: not one family (v400 kin pass); coasteering and coasters: not felt as one family
  '5383|10158', // aerials / aerie: not one family (v400 kin pass)
  '5898|30121', // spinning / spinney: not one family (v400 kin pass)
  '6321|49166', // surrealism / surrey: not one family (v400 kin pass)
  '6566|24193', // cloister / closing: not one family (v400 kin pass)
  '6569|12039', // pediment / pedestal: not one family (v400 kin pass)
  '6569|28433', // pediment / pedal: not one family (v400 kin pass)
  '6686|33906', // guild / guilder: not one family (v400 kin pass); guilder (gulden, golden) is not from guild
  '7704|43172', // ocher / oche: not one family (v400 kin pass)
  '8297|9595', // polly / poll: not one family (v400 kin pass)
  '8297|20373', // polly / polis: not one family (v400 kin pass)
  '8297|27001', // polly / pole: not one family (v400 kin pass)
  '8297|41896', // polly / pole: not one family (v400 kin pass)
  '8320|50385', // covey / cover: not one family (v400 kin pass)
  '8720|27920', // crappie / crapper: not one family (v400 kin pass)
  '8779|38825', // molly / mole: not one family (v400 kin pass)
  '8779|40436', // molly / mole: not one family (v400 kin pass)
  '8779|41922', // molly / mole: not one family (v400 kin pass)
  '8818|31505', // dragonfish / dragonflies: not one family (v400 kin pass); compounds sharing dragon: the Overlap rule's work
  '9055|60580', // skipper / skip: not one family (v400 kin pass); consistency (was K?, chunk 12:490): skipper (butterfly) is derived from skip (move); this skip (container / curling) is an unrelated sense
  '9154|34373', // mite / miter: not one family (v400 kin pass); letters only
  '9154|50052', // mite / miter: not one family (v400 kin pass); letters only
  '10158|13705', // aerie / aerialist: not one family (v400 kin pass); letters only
  '10158|43415', // aerie / aerial: not one family (v400 kin pass); letters only
  '10254|67120', // tower / towed: not one family (v400 kin pass); letters only
  '10310|41542', // jill / jillion: not one family (v400 kin pass); letters only
  '10314|32919', // pen / pensive: not one family (v400 kin pass); letters only
  '10624|26704', // spoons / spoonerism: not one family (v400 kin pass); letters only (spoonerism is named after Rev. Spooner)
  '10871|34556', // fusion / fusilier: not one family (v400 kin pass); letters only
  '11229|15604', // mastering / mastic: not one family (v400 kin pass); letters only
  '11910|48141', // wash / washers: not one family (v400 kin pass); washers (rings) are not from wash, though they look it
  '12039|60306', // pedestal / pediment: not one family (v400 kin pass); letters only
  '12232|26717', // layering / lay: not one family (v400 kin pass); lay (poem) is another word
  '12301|13439', // gallery / galley: not one family (v400 kin pass); letters only (galley and gallery not felt as one word)
  '12803|20763', // marquee / marquess: not one family (v400 kin pass); letters only (marquee from marquise, not felt)
  '13439|43070', // galley / gallery: not one family (v400 kin pass); letters only
  '13439|63880', // galley / gallerist: not one family (v400 kin pass); letters only
  '13494|27321', // gutter / gutted: not one family (v400 kin pass); letters only
  '13742|18080', // palming / palmier: not one family (v400 kin pass); palmier is French for palm tree; not felt as palm the hand
  '13775|60887', // wit / witter: not one family (v400 kin pass); letters only
  '14818|15433', // caress / caries: not one family (v400 kin pass); letters only
  '14818|47001', // caress / carless: not one family (v400 kin pass); letters only
  '15419|39484', // veneer / venerable: not one family (v400 kin pass); letters only
  '16094|43763', // reverie / reversal: not one family (v400 kin pass); letters only
  '16191|61134', // peel / peeler: not one family (v400 kin pass); peeler (police) is named after Robert Peel, not peel the skin
  '16366|29137', // reapply / reaps: not one family (v400 kin pass); letters only
  '16807|27230', // simper / simp: not one family (v400 kin pass); letters only
  '16881|17059', // lunge / lungful: not one family (v400 kin pass); letters only
  '16917|32132', // swagger / swaggie: not one family (v400 kin pass); swaggie is from swag the bedroll; swagger is not felt as related
  '16917|32142', // swagger / swag: not one family (v400 kin pass); swag here is the bedroll; swagger is not felt as related
  '16922|50991', // lurch / lurcher: not one family (v400 kin pass); lurcher (dog) is from lurch, to lurk; not felt
  '16969|38183', // slur / slurry: not one family (v400 kin pass); letters only
  '17006|57482', // hawk / hawker: not one family (v400 kin pass); hawk (clear throat) and hawker (trader, from hawk to sell) are different words
  '17059|43796', // lungful / lunge: not one family (v400 kin pass); letters only
  '17114|38584', // lap / lapis: not one family (v400 kin pass); letters only
  '17147|27399', // bray / brae: not one family (v400 kin pass); letters only
  '18066|27741', // bloomer / blooming: not one family (v400 kin pass); bloomer (loaf) is not felt as from bloom
  '19402|32844', // poi / poised: not one family (v400 kin pass); letters only
  '19890|40834', // cure / curie: not one family (v400 kin pass); letters only
  '20000|26717', // layer / lay: not one family (v400 kin pass); lay (poem) is another word
  '20747|28116', // bowyer / bower: not one family (v400 kin pass); letters only
  '20763|50054', // marquess / marquee: not one family (v400 kin pass); letters only
  '20814|32036', // trencher / trench: not one family (v400 kin pass); trencher (plate) and trench share an old root (to cut), not felt
  '22436|32544', // crone / crony: not one family (v400 kin pass); letters only
  '23282|34556', // fuses / fusilier: not one family (v400 kin pass); letters only
  '23874|40455', // buff / buffer: not one family (v400 kin pass); consistency (was K?, chunk 13:147): buffer is from buff (to strike softly), unrelated to buff (leather, polish, fan, color, game) (as the railway buffer lines in chunk 12)
  '24193|39226', // closing / cloying: not one family (v400 kin pass); letters only
  '24444|27045', // chaps / chappal: not one family (v400 kin pass); letters only
  '24800|34042', // readers / readies: not one family (v400 kin pass); letters only
  '24912|39130', // ply / pliable: not one family (v400 kin pass); ply and pliable share a Latin root, not felt
  '25489|56642', // vat / vater: not one family (v400 kin pass); letters only
  '25497|35655', // caddy / cad: not one family (v400 kin pass); letters only
  '25537|45547', // piping / pip: not one family (v400 kin pass); piping (sewing) is from pipe, not pip
  '26116|27498', // dagger / daggy: not one family (v400 kin pass); letters only
  '26181|27333', // legible / legless: not one family (v400 kin pass); letters only
  '26181|43175', // legible / leg: not one family (v400 kin pass); letters only
  '26213|45141', // leading / leader: not one family (v400 kin pass); leading here is from lead the metal, not the lead of leader
  '26676|43648', // indices / indy: not one family (v400 kin pass); letters only
  '26704|45416', // spoonerism / spoons: not one family (v400 kin pass); letters only (named after Rev. Spooner)
  '26704|51571', // spoonerism / spoons: not one family (v400 kin pass); letters only (named after Rev. Spooner)
  '26704|58796', // spoonerism / spoon: not one family (v400 kin pass); letters only (named after Rev. Spooner)
  '27030|27237', // bas / based: not one family (v400 kin pass); letters only
  '27055|33379', // kai / kaiser: not one family (v400 kin pass); letters only
  '27087|33379', // kai / kaiser: not one family (v400 kin pass); letters only
  '27281|39232', // gams / gamey: not one family (v400 kin pass); letters only
  '27332|45132', // trollied / trolling: not one family (v400 kin pass); trollied is from trolley; trolling from troll
  '27351|45128', // bob / bobber: not one family (v400 kin pass); bob (shilling) and bobber (float that bobs) are different words
  '27398|28438', // burn / burner: not one family (v400 kin pass); burn (Scots stream) is another word; burner is from burn the verb
  '27398|63340', // burn / burner: not one family (v400 kin pass); burn (Scots stream) is another word; burner is from burn the verb
  '27428|57704', // canny / cannery: not one family (v400 kin pass); letters only
  '27689|40834', // cur / curie: not one family (v400 kin pass); letters only
  '27895|51407', // tarry / tar: not one family (v400 kin pass); letters only
  '28273|45547', // piping / pip: not one family (v400 kin pass); piping is from pipe, not pip
  '28433|60306', // pedal / pediment: not one family (v400 kin pass); letters only
  '28438|39137', // burner / burnished: not one family (v400 kin pass); letters only
  '28438|46017', // burner / burnish: not one family (v400 kin pass); burnish is not from burn
  '28931|32129', // stat / station: not one family (v400 kin pass); letters only
  '28931|33272', // stat / stationer: not one family (v400 kin pass); letters only
  '29012|43763', // reviver / reversal: not one family (v400 kin pass); letters only
  '29918|56156', // Amity / Amit: not one family (v400 kin pass); letters only
  '30060|39484', // veneer / venerable: not one family (v400 kin pass); letters only
  '30121|45135', // spinney / spinner: not one family (v400 kin pass); letters only
  '30121|46088', // spinney / spinner: not one family (v400 kin pass); letters only
  '30950|39118', // downs / downy: not one family (v400 kin pass); downs (hills) and downy (feathers) are different words
  '31203|48141', // wash / washers: not one family (v400 kin pass); washers (rings) are not from wash, though they look it
  '31256|49807', // tempest / tempering: not one family (v400 kin pass); letters only
  '32077|63055', // morass / moray: not one family (v400 kin pass); letters only
  '32129|41706', // station / statistic: not one family (v400 kin pass); letters only
  '32816|48895', // tenderness / tender: not one family (v400 kin pass); tender here is the boat (one who attends); tenderness is another word
  '32844|35443', // poised / poi: not one family (v400 kin pass); letters only
  '33272|41706', // stationer / statistic: not one family (v400 kin pass); letters only
  '34028|60111', // smackers / smack: not one family (v400 kin pass); a smack of jellyfish is another word from smackers (money)
  '34137|51689', // souk / soukous: not one family (v400 kin pass); letters only
  '34690|46032', // battery / bat: not one family (v400 kin pass); letters only (battery is not from bat)
  '35491|56784', // punter / punt: not one family (v400 kin pass); punt the Irish currency is another word from punter (gambler)
  '35520|46516', // cabal / caber: not one family (v400 kin pass); letters only
  '35568|40455', // buff / buffer: not one family (v400 kin pass); consistency (was K?, chunk 13:262): buffer is from buff (to strike softly), unrelated to buff (leather, polish, fan, color, game) (as the railway buffer lines in chunk 12)
  '38632|40455', // buff / buffer: not one family (v400 kin pass); consistency (was K?, chunk 13:267): buffer is from buff (to strike softly), unrelated to buff (leather, polish, fan, color, game) (as the railway buffer lines in chunk 12)
  '38712|39939', // parchment / parching: not one family (v400 kin pass); letters only
  '39137|63340', // burnished / burner: not one family (v400 kin pass); letters only
  '39716|40942', // carrion / carrier: not one family (v400 kin pass); letters only
  '39716|45779', // carrion / carry: not one family (v400 kin pass); letters only
  '40455|45648', // buffer / buff: not one family (v400 kin pass); consistency (was K?, chunk 13:276): buffer is from buff (to strike softly), unrelated to buff (leather, polish, fan, color, game) (as the railway buffer lines in chunk 12)
  '41691|45441', // skew / skewer: not one family (v400 kin pass); letters only
  '43293|64261', // taper / taps: not one family (v400 kin pass); letters only
  '43401|49689', // radical / radial: not one family (v400 kin pass); letters only
  '44001|64261', // taper / taps: not one family (v400 kin pass); letters only
  '45486|46032', // battery / bat: not one family (v400 kin pass); letters only (battery is not from bat)
  '45925|48141', // wash / washers: not one family (v400 kin pass); washers (rings) are not from wash, though they look it
  '46017|63340', // burnish / burner: not one family (v400 kin pass); letters only
  '47377|58527', // Hawker / Hawks: not one family (v400 kin pass); letters only
  '47442|58585', // hold / holder: not one family (v400 kin pass); a ship's hold is another word from holder (one who holds)
  '47464|63993', // reef / reefer: not one family (v400 kin pass); reefer (chilled cargo) is short for refrigerator
  '50151|56642', // vat / vater: not one family (v400 kin pass); letters only
  '50382|56032', // gully / gullible: not one family (v400 kin pass); letters only
  '57482|63686', // hawker / hawk: not one family (v400 kin pass); hawker (trader, from hawk to sell) and the hawk moth are different words
  '58660|65292', // rocker / rock: not one family (v400 kin pass); rocker (skating) is from rock (sway); the rock dove is from rock (stone)
  '61134|62411', // peeler / peels: not one family (v400 kin pass); peeler (police) is named after Robert Peel, not peel the skin
  '957|31256', // temper / tempest: not one family (v400 kin pass); letters only
  '1408|8798', // sawfly / sawfish: not one family (v400 kin pass); compounds sharing saw: the Overlap rule's work
  '1535|9143', // halter / halteres: not one family (v400 kin pass); letters only
  '2086|2455', // geode / geodesy: not one family (v400 kin pass); letters only
  '2800|8732', // rudder / rudd: not one family (v400 kin pass); letters only
  '2815|48015', // clipper / clipless: not one family (v400 kin pass); clipper (ship) and clipless (pedals) use different clips
  '2848|32816', // tender / tenderness: not one family (v400 kin pass); tender here is the boat (one who attends); tenderness is another word
  '3077|43663', // tinder / tindy: not one family (v400 kin pass); letters only
  '3346|33971', // audition / audit: not one family (v400 kin pass); audition and audit share a Latin root, not felt
  '3494|43804', // remission / remise: not one family (v400 kin pass); letters only
  '3545|59158', // colic / collier: not one family (v400 kin pass); letters only
  '3929|10287', // cobber / cob: not one family (v400 kin pass); letters only
  '4691|8387', // vanity / vane: not one family (v400 kin pass); letters only
  '4913|19883', // chinos / chinois: not one family (v400 kin pass); letters only
  '4921|25515', // tunic / tun: not one family (v400 kin pass); letters only
  '6405|32714', // dolly / doleful: not one family (v400 kin pass); letters only
  '6589|43437', // finial / finish: not one family (v400 kin pass); letters only
  '6589|47124', // finial / fin: not one family (v400 kin pass); letters only
  '6589|58040', // finial / fins: not one family (v400 kin pass); letters only
  '8083|14859', // cony / cones: not one family (v400 kin pass); letters only
  '8083|46028', // cony / cone: not one family (v400 kin pass); letters only
  '8084|14859', // coney / cones: not one family (v400 kin pass); letters only
  '8084|46028', // coney / cone: not one family (v400 kin pass); letters only
  '8198|8601', // coot / cooter: not one family (v400 kin pass); letters only
  '8297|60970', // polly / polity: not one family (v400 kin pass); letters only
  '8387|23145', // vane / vanity: not one family (v400 kin pass); letters only
  '8732|27739', // rudd / ruddy: not one family (v400 kin pass); rudd and ruddy share a red root, not felt
  '8780|55823', // platy / platter: not one family (v400 kin pass); letters only
  '8787|9123', // damselfish / damselfly: not one family (v400 kin pass); compounds sharing damsel: the Overlap rule's work
  '9746|32980', // genet / geneticist: not one family (v400 kin pass); letters only
  '10142|43794', // parr / parry: not one family (v400 kin pass); letters only
  '10248|51469', // shoal / sho: not one family (v400 kin pass); letters only
  '11262|48015', // clipping / clipless: not one family (v400 kin pass); clipping (distortion) and clipless (pedals) use different clips
  '11984|56021', // mannerism / man: not one family (v400 kin pass); letters only
  '12205|20903', // hatching / hatchment: not one family (v400 kin pass); letters only
  '12223|28438', // burnishing / burner: not one family (v400 kin pass); letters only
  '12223|63340', // burnishing / burner: not one family (v400 kin pass); letters only
  '12269|34688', // corpsing / corps: not one family (v400 kin pass); corpsing is from corpse, not corps
  '13247|56760', // meter / metical: not one family (v400 kin pass); letters only
  '13500|43007', // letterer / let: not one family (v400 kin pass); letters only
  '13500|43085', // letterer / let: not one family (v400 kin pass); letters only
  '13510|27933', // biff / biffy: not one family (v400 kin pass); letters only
  '13771|43696', // bit / biter: not one family (v400 kin pass); biter (curling) is from bite, not the comedy bit
  '15165|55860', // salve / salver: not one family (v400 kin pass); letters only
  '16719|27077', // halal / hale: not one family (v400 kin pass); letters only
  '16802|53051', // moue / mousy: not one family (v400 kin pass); letters only
  '16917|55241', // swagger / swag: not one family (v400 kin pass); swag (curtain) and swagger are not felt as related
  '17056|46534', // heave / heavies: not one family (v400 kin pass); letters only
  '17152|58411', // hysterics / hysteresis: not one family (v400 kin pass); letters only
  '19200|28778', // bridie / bridal: not one family (v400 kin pass); letters only
  '19357|56637', // pap / pappy: not one family (v400 kin pass); letters only
  '19381|44939', // dal / dally: not one family (v400 kin pass); letters only
  '20882|30157', // gules / gully: not one family (v400 kin pass); letters only
  '21141|30221', // Tonga / Tongass: not one family (v400 kin pass); letters only
  '23818|61240', // putty / puttees: not one family (v400 kin pass); letters only
  '24893|53654', // rib / riberry: not one family (v400 kin pass); letters only
  '25087|43833', // yams / yame: not one family (v400 kin pass); letters only
  '25514|26057', // phial / phi: not one family (v400 kin pass); letters only
  '25515|35265', // tun / tuner: not one family (v400 kin pass); letters only
  '27049|33379', // kaise / kaiser: not one family (v400 kin pass); letters only
  '27357|67077', // sod / sodality: not one family (v400 kin pass); letters only
  '27689|62158', // cur / currying: not one family (v400 kin pass); letters only
  '27922|31111', // lav / laver: not one family (v400 kin pass); letters only
  '28438|34400', // burner / burnous: not one family (v400 kin pass); letters only
  '28931|56809', // stat / stater: not one family (v400 kin pass); letters only
  '29139|52306', // hater / hat: not one family (v400 kin pass); letters only
  '30157|55677', // gully / gulal: not one family (v400 kin pass); letters only
  '30391|41551', // squill / squillion: not one family (v400 kin pass); letters only
  '30428|55368', // filament / fila: not one family (v400 kin pass); letters only
  '30960|50561', // sound / sounder: not one family (v400 kin pass); sounder (of boars) is another word from sound (water)
  '31470|40457', // catkins / cation: not one family (v400 kin pass); letters only
  '32074|40942', // carr / carrier: not one family (v400 kin pass); letters only
  '32074|45779', // carr / carry: not one family (v400 kin pass); letters only
  '32679|60448', // gleeful / gley: not one family (v400 kin pass); letters only
  '32714|40181', // doleful / dolly: not one family (v400 kin pass); letters only
  '32761|51714', // jittery / jit: not one family (v400 kin pass); letters only
  '32790|34090', // staggered / stag: not one family (v400 kin pass); letters only
  '33278|52306', // hatter / hat: not one family (v400 kin pass); hat here is Turkish calligraphy; hatter is from hat the headwear
  '33303|41629', // decree / decrement: not one family (v400 kin pass)
  '33902|33982', // lev / levy: not one family (v400 kin pass)
  '33959|43696', // bit / biter: not one family (v400 kin pass); consistency (was K?, chunk 14:8): biter is from bite; the coin bit is not its base (as data, comedy)
  '33971|50101', // audit / audition: not one family (v400 kin pass); audit and audition share a Latin root, not felt
  '34222|38417', // verger / verge: not one family (v400 kin pass); verger is from verge 'rod', not the roadside verge
  '34400|63340', // burnous / burner: not one family (v400 kin pass)
  '35495|50385', // cove / cover: not one family (v400 kin pass)
  '38134|57421', // Orange / Orangerie: not one family (v400 kin pass); Orange the city vs orangerie (orange trees): letters only
  '38466|43809', // quarter / quarte: not one family (v400 kin pass); quarte and quarter share Latin 'fourth', not felt
  '39967|57482', // hawkish / hawker: not one family (v400 kin pass); hawker is from hawk 'peddle'; hawkish from the bird
  '41706|56809', // statistic / stater: not one family (v400 kin pass)
  '43064|60121', // gimme / gimmer: not one family (v400 kin pass)
  '45743|61545', // mash / mashie: not one family (v400 kin pass)
  '46030|53654', // rib / riberry: not one family (v400 kin pass)
  '46957|60151', // zone / zony: not one family (v400 kin pass)
  '50111|51469', // shoal / sho: not one family (v400 kin pass)
  '51500|62472', // morsing / moreish: not one family (v400 kin pass)
  '56592|62472', // morion / moreish: not one family (v400 kin pass)
  '59707|64815', // atom / atomic: not one family (v400 kin pass); atom here is a Turkish yoghurt meze; atomic is from the particle
  '371|7898', // bilberry / bilby: not one family (v400 kin pass)
  '787|8779', // mole / molly: not one family (v400 kin pass)
  '1052|51407', // tarsier / tar: not one family (v400 kin pass)
  '2983|32919', // pension / pensive: not one family (v400 kin pass)
  '2983|50686', // pension / pen: not one family (v400 kin pass)
  '4471|43293', // taps / taper: not one family (v400 kin pass)
  '4471|44001', // taps / taper: not one family (v400 kin pass)
  '4937|59832', // bloomers / bloom: not one family (v400 kin pass); bloomers is from the name Bloomer, not bloom
  '5077|20721', // basting / bastion: not one family (v400 kin pass)
  '5089|11760', // batting / battement: not one family (v400 kin pass)
  '5089|34690', // batting / battery: not one family (v400 kin pass)
  '5089|45486', // batting / battery: not one family (v400 kin pass)
  '6436|27335', // gaffer / gaff: not one family (v400 kin pass)
  '6436|29294', // gaffer / gaffe: not one family (v400 kin pass)
  '6436|45142', // gaffer / gaff: not one family (v400 kin pass)
  '6566|39226', // cloister / cloying: not one family (v400 kin pass)
  '8913|9208', // stonefish / stonefly: not one family (v400 kin pass)
  '9055|43672', // skipper / skip: not one family (v400 kin pass); consistency (was K?, chunk 14:112): skipper (butterfly) is derived from skip (move); this skip (container / curling) is an unrelated sense
  '9530|27497', // dun / dunny: not one family (v400 kin pass)
  '11760|34690', // battement / battery: not one family (v400 kin pass)
  '11760|45486', // battement / battery: not one family (v400 kin pass)
  '12627|41765', // dramedy / dram: not one family (v400 kin pass)
  '12627|56774', // dramedy / dram: not one family (v400 kin pass)
  '13712|59142', // barker / bark: not one family (v400 kin pass); barker is from bark (dog); bark here is the ship
  '15433|47001', // caries / carless: not one family (v400 kin pass)
  '15553|57871', // choleric / chole: not one family (v400 kin pass)
  '16094|29012', // reverie / reviver: not one family (v400 kin pass)
  '17020|27541', // keen / keener: not one family (v400 kin pass); keen (wail) is Irish caoineadh; keener is from keen 'eager'
  '17059|44841', // lungful / lunge: not one family (v400 kin pass)
  '18739|30077', // berbere / berberis: not one family (v400 kin pass)
  '19089|43983', // kippers / kip: not one family (v400 kin pass)
  '19089|56768', // kippers / kip: not one family (v400 kin pass)
  '19876|20721', // baster / bastion: not one family (v400 kin pass)
  '19904|43983', // kipper / kip: not one family (v400 kin pass)
  '19904|56768', // kipper / kip: not one family (v400 kin pass)
  '20129|39223', // brinner / briny: not one family (v400 kin pass)
  '20373|27001', // polis / pole: not one family (v400 kin pass)
  '20373|41896', // polis / pole: not one family (v400 kin pass)
  '20712|42853', // bailey / bails: not one family (v400 kin pass)
  '20884|26677', // vert / vertices: not one family (v400 kin pass)
  '22432|24061', // scrying / screed: not one family (v400 kin pass)
  '24061|30850', // screed / scree: not one family (v400 kin pass)
  '24421|43178', // bustier / bust: not one family (v400 kin pass); bust in darts is another word from the bust of bustier
  '27261|38331', // mewing / mews: not one family (v400 kin pass); mewing is named after Dr Mew; mews from the hawks' mew
  '27261|60095', // mewing / mews: not one family (v400 kin pass); as mewing/mews above
  '27398|39137', // burn / burnished: not one family (v400 kin pass)
  '27398|46017', // burn / burnish: not one family (v400 kin pass)
  '27497|38635', // dunny / dun: not one family (v400 kin pass)
  '30121|42871', // spinney / spinner: not one family (v400 kin pass)
  '30121|58899', // spinney / spinner: not one family (v400 kin pass)
  '30249|32092', // feller / fell: not one family (v400 kin pass); fell (hill) is Norse fjall; feller is from fell 'cut down'
  '30845|31803', // col / collier: not one family (v400 kin pass)
  '31803|45098', // collier / col: not one family (v400 kin pass)
  '32919|50686', // pensive / pen: not one family (v400 kin pass)
  '39716|47069', // carrion / carrier: not one family (v400 kin pass)
  '43687|61134', // peel / peeler: not one family (v400 kin pass); peeler (police) is from Robert Peel, not peel
  '46395|47377', // Hawks / Hawker: not one family (v400 kin pass); Hawker is a surname (Harry Hawker), not from the Hawks
  '52876|57865', // phasing / phaal: not one family (v400 kin pass)
  '1052|7249', // tarsier / tare: not one family (v400 kin pass)
  '1052|14224', // tarsier / tarsals: not one family (v400 kin pass); tarsier is named for its tarsus bones, not felt
  '1124|18591', // plover / plov: not one family (v400 kin pass)
  '1179|27039', // gharial / ghar: not one family (v400 kin pass)
  '1547|3929', // cob / cobber: not one family (v400 kin pass)
  '3929|24049', // cobber / cob: not one family (v400 kin pass)
  '5874|27413', // tatting / tattie: not one family (v400 kin pass)
  '7247|25317', // vernier / vernal: not one family (v400 kin pass)
  '7818|8271', // loris / lory: not one family (v400 kin pass)
  '7818|8399', // loris / lore: not one family (v400 kin pass)
  '8101|67219', // hobby / hob: not one family (v400 kin pass)
  '8320|20043', // covey / covers: not one family (v400 kin pass)
  '8320|35495', // covey / cove: not one family (v400 kin pass)
  '8385|17194', // barb / barberry: not one family (v400 kin pass)
  '8779|47495', // molly / mole: not one family (v400 kin pass)
  '8791|17194', // barb / barberry: not one family (v400 kin pass)
  '9375|56352', // Kerry / Kerr: not one family (v400 kin pass)
  '9822|66304', // scorpionfish / scorpionfly: not one family (v400 kin pass)
  '12223|27398', // burnishing / burn: not one family (v400 kin pass)
  '14533|34052', // pons / pony: not one family (v400 kin pass)
  '15550|57871', // choler / chole: not one family (v400 kin pass)
  '15679|34177', // ama / amass: not one family (v400 kin pass)
  '17006|39967', // hawk / hawkish: not one family (v400 kin pass); hawkish is from the bird; hawk here is clearing the throat
  '20882|50382', // gules / gully: not one family (v400 kin pass)
  '20907|32934', // lists / listless: not one family (v400 kin pass)
  '21322|45058', // slops / sloper: not one family (v400 kin pass)
  '21953|50456', // Min / Minion: not one family (v400 kin pass)
  '22080|41212', // Apu / Apus: not one family (v400 kin pass)
  '24484|27362', // jammers / jammy: not one family (v400 kin pass)
  '25546|55368', // filament / fila: not one family (v400 kin pass)
  '26704|61547', // spoonerism / spoon: not one family (v400 kin pass); spoonerism is named after Spooner, not spoon
  '27001|60970', // pole / polity: not one family (v400 kin pass)
  '27398|34400', // burn / burnous: not one family (v400 kin pass)
  '27535|33284', // hoser / hosier: not one family (v400 kin pass); hoser is not from hose (stockings) as hosier is
  '27587|33369', // dogie / doge: not one family (v400 kin pass)
  '30845|59158', // col / collier: not one family (v400 kin pass)
  '32074|39716', // carr / carrion: not one family (v400 kin pass)
  '32074|47069', // carr / carrier: not one family (v400 kin pass)
  '32129|56809', // station / stater: not one family (v400 kin pass)
  '33272|56809', // stationer / stater: not one family (v400 kin pass)
  '33755|60232', // testament / testa: not one family (v400 kin pass)
  '34400|39137', // burnous / burnished: not one family (v400 kin pass)
  '34400|46017', // burnous / burnish: not one family (v400 kin pass)
  '35521|50187', // coterie / cote: not one family (v400 kin pass)
  '40068|47520', // lightless / lighter: not one family (v400 kin pass); lighter (barge) is from light 'unload', not light/dark
  '40446|41651', // monomer / monomial: not one family (v400 kin pass)
  '41357|60114', // gibbous / gib: not one family (v400 kin pass)
  '41883|47633', // stokes / stoker: not one family (v400 kin pass)
  '41896|60970', // pole / polity: not one family (v400 kin pass)
  '43809|67242', // quarte / quarter: not one family (v400 kin pass); quarte and quarter (shoe) share Latin, not felt
  '45098|59158', // col / collier: not one family (v400 kin pass)
  '45600|55515', // chalices / challis: not one family (v400 kin pass)
  '50382|55677', // gully / gulal: not one family (v400 kin pass)
  '50456|55897', // Minion / Min: not one family (v400 kin pass)
  '51500|57779', // morsing / mor: not one family (v400 kin pass)
  '53986|56876', // Elis / Ely: not one family (v400 kin pass)
  '54942|55883', // Norns / Norn: not one family (v400 kin pass); Norns and Norn (language) are different words
  '55420|61905', // sulu / sulus: not one family (v400 kin pass); sulu (skirt) and sulus (Turkish script) are different words
  '56592|57779', // morion / mor: not one family (v400 kin pass)
  '57244|57421', // Orange / Orangerie: not one family (v400 kin pass); Orange the river vs orangerie: letters only
  '61548|67128', // brassie / brasserie: not one family (v400 kin pass)
  '8271|8399', // lory / lore: not one family (v400 kin pass)
  '9694|47397', // goral / gores: not one family (v400 kin pass)
  '9855|60261', // chital / chit: not one family (v400 kin pass)
  '12223|34400', // burnishing / burnous: not one family (v400 kin pass)
  '18065|60115', // stottie / stot: not one family (v400 kin pass)
  '20043|35495', // covers / cove: not one family (v400 kin pass)
  '20882|55677', // gules / gulal: not one family (v400 kin pass)
  '25523|50896', // hawser / haw: not one family (v400 kin pass)
  '25523|60390', // hawser / haws: not one family (v400 kin pass)
  '29504|34387', // copal / cope: not one family (v400 kin pass)
  '29504|48107', // copal / coping: not one family (v400 kin pass)
  '31683|67077', // sodalite / sodality: not one family (v400 kin pass)
  '51500|56592', // morsing / morion: not one family (v400 kin pass)
  '5659|14816', // poker / poke: not one family (v400 kin pass); poker (the game) is not from poke
  '6811|56675', // general / generous: not one family (v400 kin pass)
  '6993|45244', // potion / pot: not one family (v400 kin pass)
  '20877|33804', // banner / ban: not one family (v400 kin pass)
  '179|29055', // ass / assess: not one family (v400 kin pass)
  '179|44253', // ass / assist: not one family (v400 kin pass)
  '878|5736', // rum / rummy: not one family (v400 kin pass)
  '891|19840', // whisky / whisk: not one family (v400 kin pass)
  '4218|53857', // fine / finish: not one family (v400 kin pass)
  '6148|33702', // cellist / cell: not one family (v400 kin pass); cellist is from cello, not cell
  '6811|12542', // general / genie: not one family (v400 kin pass); letters only
  '6811|40867', // general / gene: not one family (v400 kin pass); letters only
  '6993|15481', // potion / pot: not one family (v400 kin pass); letters only
  '7672|50262', // gray / grass: not one family (v400 kin pass); letters only
  '8833|53857', // fin / finish: not one family (v400 kin pass); letters only
  '9527|50262', // gray / grass: not one family (v400 kin pass); letters only
  '13530|45242', // rival / river: not one family (v400 kin pass); letters only
  '14833|45366', // numb / numbers: not one family (v400 kin pass); letters only
  '15045|45366', // numbness / numbers: not one family (v400 kin pass); letters only
  '18859|44945', // caper / cape: not one family (v400 kin pass); letters only
  '33804|35224', // ban / banner: not one family (v400 kin pass); letters only
  '33804|55637', // ban / banner: not one family (v400 kin pass); letters only
  '34834|53857', // final / finish: not one family (v400 kin pass); final and finish share Latin finis, not felt
  '39327|53857', // fine / finish: not one family (v400 kin pass); fine and finish share Latin finis, not felt
  '44340|53857', // final / finish: not one family (v400 kin pass); final and finish share Latin finis, not felt
  '1701|15512', // poppy / poppers: not one family (v400 kin pass); letters only
  '3901|50266', // buddy / bud: not one family (v400 kin pass); bud here is cannabis bud, not short for buddy
  '3973|29551', // sadness / sadism: not one family (v400 kin pass); sadism is from de Sade
  '4487|14409', // test / testes: not one family (v400 kin pass); testes is not from test
  '5659|19387', // poker / poke: not one family (v400 kin pass); poke (Hawaiian dish) is another word
  '7277|27353', // bug / bugger: not one family (v400 kin pass); bugger is not from bug
  '7466|14409', // test / testes: not one family (v400 kin pass); testes is not from test
  '10765|15512', // pop / poppers: not one family (v400 kin pass); consistency (was K?, chunk 04:226): poppers is derived from pop (the sound); pop music (popular) is an unrelated sense
  '14409|34829', // testes / test: not one family (v400 kin pass); testes is not from test
  '19701|34579', // porter / port: not one family (v400 kin pass); porter (beer) is named for porters, not port (harbour)
  '24077|33804', // banister / ban: not one family (v400 kin pass)
  '25411|45334', // evening / evens: not one family (v400 kin pass); evens (betting) is from even, not evening
  '27353|33837', // bugger / bug: not one family (v400 kin pass); bugger is from Bulgarian, not bug
  '29227|53846', // legal / legs: not one family (v400 kin pass)
  '29551|32693', // sadism / sad: not one family (v400 kin pass); sadism is from de Sade, not sad
  '39848|44945', // caper / cape: not one family (v400 kin pass)
  '39954|45366', // numbing / numbers: not one family (v400 kin pass)
  '45245|56728', // call / callous: not one family (v400 kin pass)
  '20139|20797', // glass / glaive: not one family (v400 kin pass)
  '20797|24032', // glaive / glass: not one family (v400 kin pass); letters only
  '23403|44945', // capers / cape: not one family (v400 kin pass); letters only
  '27281|45158', // gams / game: not one family (v400 kin pass); letters only
  '225|45361', // tea / teaser: not one family (v400 kin pass); letters only
  '461|19722', // lamb / lambic: not one family (v400 kin pass); letters only (lambic is from Lembeek)
  '1434|45162', // antlion / antlers: not one family (v400 kin pass); letters only
  '8833|59860', // fin / fining: not one family (v400 kin pass); letters only
  '19722|25044', // lambic / lamb: not one family (v400 kin pass); letters only (lambic is from Lembeek)
  '19722|31469', // lambic / lambs: not one family (v400 kin pass); letters only (lambic is from Lembeek)
  '34834|59860', // final / fining: not one family (v400 kin pass); letters only
  '44340|59860', // final / fining: not one family (v400 kin pass); letters only
  '891|928', // whisky / whisk: not one family (v400 kin pass); letters only
  '891|8858', // whisky / whiskers: not one family (v400 kin pass); letters only
  '891|10331', // whisky / whiskers: not one family (v400 kin pass); letters only
  '891|53041', // whisky / whiskers: not one family (v400 kin pass); letters only
  '895|28337', // brandy / brand: not one family (v400 kin pass); brandy is from Dutch brandewijn (burnt wine), not felt as brand
  '2027|33639', // muggy / mugging: not one family (v400 kin pass); letters only
  '7205|67927', // unit / unity: not one family (v400 kin pass); unit and unity: related in origin, not felt
  '21307|33068', // execution / executive: not one family (v400 kin pass); execution and executive both from execute, not felt
  '43346|53857', // fins / finish: not one family (v400 kin pass)
  '43404|53857', // fin / finish: not one family (v400 kin pass)
  '44366|53857', // finalist / finish: not one family (v400 kin pass)
  '46962|53857', // fine / finish: not one family (v400 kin pass)
  '50262|53057', // grass / graying: not one family (v400 kin pass)
  '905|3845', // port / portion: not one family (v400 kin pass)
  '905|47831', // port / porter: not one family (v400 kin pass); porter is not from port (wine)
  '1029|15488', // mole / molly: not one family (v400 kin pass)
  '3845|19701', // portion / porter: not one family (v400 kin pass)
  '5660|27920', // craps / crapper: not one family (v400 kin pass)
  '6644|53846', // legion / legs: not one family (v400 kin pass)
  '7287|19706', // bit / bitter: not one family (v400 kin pass); bit (data) is from binary digit, not bite
  '8369|50258', // down / downers: not one family (v400 kin pass); downers are from down (direction), not down (feathers)
  '10401|50258', // down / downers: not one family (v400 kin pass); downers are from down (direction), not down (feathers)
  '14328|15488', // mole / molly: not one family (v400 kin pass)
  '14744|53859', // musty / must: not one family (v400 kin pass); musty is not from must (grape juice)
  '15488|33830', // molly / mole: not one family (v400 kin pass)
  '15512|56634', // poppers / pop: not one family (v400 kin pass)
  '19701|47462', // porter / port: not one family (v400 kin pass); porter (beer) is named after porters, not port
  '19701|47598', // porter / port: not one family (v400 kin pass); porter (beer) is named after porters, not port
  '19701|48887', // porter / port: not one family (v400 kin pass); porter (beer) is named after porters, not port
  '21298|67126', // irons / ironic: not one family (v400 kin pass)
  '24413|33813', // stockings / stocks: not one family (v400 kin pass); stocks (punishment) is not felt in stockings
  '27353|49162', // bugger / buggy: not one family (v400 kin pass)
  '29379|50264', // reef / reefer: not one family (v400 kin pass)
  '31077|50264', // reef / reefer: not one family (v400 kin pass)
  '39383|45227', // pitiful / pit: not one family (v400 kin pass)
  '41877|50262', // gray / grass: not one family (v400 kin pass)
  '47124|53857', // fin / finish: not one family (v400 kin pass)
  '53857|58040', // finish / fins: not one family (v400 kin pass)
  '5599|33233', // coursing / courier: not one family (v400 kin pass)
  '5660|8720', // craps / crappie: not one family (v400 kin pass)
  '6853|7298', // rout / router: not one family (v400 kin pass); router is from route; rout (defeat) is another word
  '14744|21366', // musty / muster: not one family (v400 kin pass)
  '16879|33716', // shiver / shiv: not one family (v400 kin pass)
  '20797|40030', // glaive / glassy: not one family (v400 kin pass)
  '24421|45289', // bustier / bust: not one family (v400 kin pass); bust (blackjack, from burst) is another word than bust (chest)
  '58570|59874', // punter / punt: not one family (v400 kin pass); consistency (was K, chunk 11:153): punter (football) is derived from punt (kick); punt here (currency, bottle dimple) is an unrelated word
  '6589|53857', // finial / finish: not one family (v400 kin pass)
  '9694|44975', // goral / gore: not one family (v400 kin pass)
  '20117|45361', // tea / teaser: not one family (v400 kin pass)
  '43346|59860', // fins / fining: not one family (v400 kin pass)
  '43404|59860', // fin / fining: not one family (v400 kin pass)
  '44366|59860', // finalist / fining: not one family (v400 kin pass)
  '905|15292', // port / porter: not one family (v400 kin pass); consistency (was K?, chunk 11:342): porter (carrier, and the beer named after porters) is not from port (rule, chunk 09: porter/port)
  '905|33008', // port / porter: not one family (v400 kin pass); consistency (was K?, chunk 11:344): porter (carrier, and the beer named after porters) is not from port (rule, chunk 09: porter/port)
  '905|33238', // port / porter: not one family (v400 kin pass); consistency (was K?, chunk 11:345): porter (carrier, and the beer named after porters) is not from port (rule, chunk 09: porter/port)
  '1536|19706', // bit / bitter: not one family (v400 kin pass)
  '6492|21298', // irony / irons: not one family (v400 kin pass); irony is not from iron: look-alike only
  '10248|45217', // shoal / shoe: not one family (v400 kin pass)
  '13771|19706', // bit / bitter: not one family (v400 kin pass)
  '15488|38825', // molly / mole: not one family (v400 kin pass)
  '15488|40436', // molly / mole: not one family (v400 kin pass)
  '15488|41922', // molly / mole: not one family (v400 kin pass)
  '19701|37954', // porter / port: not one family (v400 kin pass); porter (beer) is not from port
  '19701|42459', // porter / port: not one family (v400 kin pass); porter (beer) is not from port
  '19701|43455', // porter / port: not one family (v400 kin pass); porter (beer) is not from port
  '19706|33959', // bitter / bit: not one family (v400 kin pass)
  '19706|44843', // bitter / bit: not one family (v400 kin pass)
  '24077|33818', // banister / banishment: not one family (v400 kin pass)
  '26181|53846', // legible / legs: not one family (v400 kin pass)
  '39118|50258', // downy / downers: not one family (v400 kin pass)
  '45217|50111', // shoe / shoal: not one family (v400 kin pass)
  '47464|50264', // reef / reefer: not one family (v400 kin pass); reef (sail) and reefer (marijuana) are not felt as one family
  '787|15488', // mole / molly: not one family (v400 kin pass)
  '966|56660', // bubbly / bubbe: not one family (v400 kin pass)
  '3436|45205', // croup / croupier: not one family (v400 kin pass); croupier is not felt as croup
  '4835|6853', // router / rout: not one family (v400 kin pass); router (tool) is not from rout (defeat)
  '6853|23225', // rout / router: not one family (v400 kin pass); router is not from rout (defeat)
  '6853|23682', // rout / router: not one family (v400 kin pass); router is not from rout (defeat)
  '6853|46042', // rout / router: not one family (v400 kin pass); router is not from rout (defeat)
  '7479|45274', // outlier / outs: not one family (v400 kin pass)
  '14409|32938', // testes / testy: not one family (v400 kin pass); letters only
  '15479|34028', // smack / smackers: not one family (v400 kin pass); smackers (money) is not from smack the heroin
  '27780|58914', // tripe / trips: not one family (v400 kin pass); letters only
  '30950|50258', // downs / downers: not one family (v400 kin pass); downs (hills) and downers (from down, low) are different words
  '35491|59874', // punter / punt: not one family (v400 kin pass); punt (bottle dimple) is another word from punter (gambler)
  '45205|50190', // croupier / croup: not one family (v400 kin pass); croupier is from croup (rump) in French, not felt
  '5257|33646', // rackets / racketeering: not one family (v400 kin pass); racket (sport) is another word from racket (fraud) of racketeering
  '10281|53859', // muster / must: not one family (v400 kin pass); letters only
  '15488|47495', // molly / mole: not one family (v400 kin pass); letters only
  '19722|50289', // lambic / lamb: not one family (v400 kin pass); letters only
  '47124|59860', // fin / fining: not one family (v400 kin pass)
  '58040|59860', // fins / fining: not one family (v400 kin pass)
  '504|58914', // tripe / trips: not one family (v400 kin pass)
  '20797|43631', // glaive / glass: not one family (v400 kin pass)
  '20797|61585', // glaive / glassy: not one family (v400 kin pass)
  '8632|53828', // gavial / gavi: not one family (v400 kin pass)
  '47612|53861', // lee / lees: not one family (v400 kin pass); lees (sediment) and lee (shelter) are different words
  '5426|59850', // arnis / arneis: not one family (v400 kin pass)
  '6589|59860', // finial / fining: not one family (v400 kin pass)
  '905|19701', // port / porter: not one family (v400 kin pass); consistency (was K?, chunk 11:343): porter (carrier, and the beer named after porters) is not from port (rule, chunk 09: porter/port)
  '21366|53859', // muster / must: not one family (v400 kin pass); letters only
]);

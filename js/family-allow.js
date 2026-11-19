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
  '2585|62393', // tire / tired: not one family (v399 kin pilot); letters only
  '2646|28703', // bus / busy: not one family (v399 kin pilot); letters only
  '3171|4370', // arm / army: not one family (v399 kin pilot); army is from Latin arma, not arm
  '3177|29227', // leg / legal: not one family (v399 kin pilot); letters only
  '3186|4951', // ear / earrings: not one family (v399 kin pilot); a compound (ear + ring): the Overlap rule's work
  '3186|21316', // ear / earring: not one family (v399 kin pilot); a compound (ear + ring): the Overlap rule's work
  '3186|28112', // ear / early: not one family (v399 kin pilot); letters only
  '3240|26656', // liver / lives: not one family (v399 kin pilot); letters only
  '3240|28783', // liver / live: not one family (v399 kin pilot); letters only
  '3240|29041', // liver / lived: not one family (v399 kin pilot); letters only
  '3601|39524', // training / train: not one family (v399 kin pilot); train here is the vehicle; training is from the verb
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
  '5250|20138', // bowling / bowl: not one family (v399 kin pilot); bowling (a bowl = a ball) vs bowl (dish): different words
  '5293|28786', // rowing / row: not one family (v399 kin pilot); row (argument) is another word
  '5395|25473', // boxing / box: not one family (v399 kin pilot); letters only
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
  '14274|25256', // bangs / bang: not one family (v399 kin pilot); bangs (hair) is not felt as bang
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
]);

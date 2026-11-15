// Words that are written with a capital wherever they stand inside a phrase: nationality and language words, and the place and person names that
// the proper-word review confirmed (tools/gen/propword-apply.mjs wrote the second part; add a word by hand when a new one turns up).
// The case lint (js/caselint.js, kind lower-proper-word) flags a lowercase entry typed common or phrase that contains one of them: french fries,
// yorkshire terrier. Lowercase here; a word that is also an ordinary word (china, turkey, savannah) does not belong in the list.
export const PROPER_WORDS = new Set(`
achilles advent african alaska alaskan albanian aleppo algerian alpine amazon american andean angelus anna antarctic arabian arabic argentine
argentinian armenian asian australian austrian aztec balinese bavarian belgian benedict bengal bengali berber bermuda bohemian bolivian bolognese
bombay boston brazil brazilian breton british brunswick brussels bulgarian burmese byzantine cajun california californian cambodian canadian cantonese
caribbean carolina castile catalan celtic chelsea chilean chinese christmas cobb colombian colorado congo cornish corsican covid creole cretan
croatian cuban cumberland cypriot czech danish delaware denver devon diana doppler dover dracula dutch easter egyptian english eskimo ethernet
ethiopian eton european filipino finnish flemish florentine foley fremantle french frisbee gaelic galapagos genovese georgian german ghanaian gila
gilead gladstone gloucester gothic greek greenland guatemalan haitian hanuman harlem havana hawaiian hebrew hercules himalayan hindu hokkien hungarian
icelandic incan india indian indonesian iranian iraqi irish ironman islamic israeli italian jamaican japan japanese javanese jenga jerusalem jewish
jordanian june kenyan kiev kirby korean kurdish lapita larry latin lebanese lebanon leicester lhasa libyan lincoln lincolnshire linzer lithuanian
maasai maat maine malaysian maltese manx maori martenot maui mayan mccoy mediterranean melba melbourne mentos mexican miranda mongolian moorish
moroccan moses murphy murray muscovy mysore neapolitan nepalese nigerian nordic norfolk norma norman norwegian olivier oriental padrón pakistani
palestinian parisian parma pekin peking persian peruvian philadelphia philippine philly picos polish polynesian portuguese prussian rainier rangoon
robert rockefeller roman romanian rudra russian sacher santiago sardinian scandinavian scotch scots scott scottish serbian seville shaolin sharon
shropshire siamese siberian sicilian singapore singaporean slovak spanish steadicam sudanese sumatran susan suzette swedish swiss syrian szechuan
tabasco tagalog tahiti tahitian taiwanese tasmanian texas thai tibetan tiffany tigger trinidad tuareg tudor tunisian turkish tuscan ukrainian valencia
venetian venezuelan venus vichy victorian vidalia vienna viennese vietnamese virginia wagner wellington welsh williams worcester yemeni yorkshire yule
zamzam zante zimmer zulu
`.split(/\s+/).filter(Boolean));

// Entries (by id) that contain one of those words and are right in lowercase, because the word is not a name there (alpine skiing, roman type,
// venetian blind). Add an id only after checking the entry.
export const LOWER_OK = new Set([
  56523, // alpine aster
  56537, // alpine clematis
  56532, // alpine forget-me-not
  30791, // alpine garden
  32088, // alpine meadow
  56526, // alpine poppy
  56521, // alpine rose
  5362, // alpine skiing
  45105, // alpine start
  23914, // furniture polish
  39077, // gum arabic
  3751, // nail polish
  16244, // nail polish remover
  44123, // para alpine skiing
  64050, // polish remover
  6517, // roman a clef
  6516, // roman à clef
  15425, // scale and polish
  55234, // venetian blind
  23506, // venetian blinds
]);

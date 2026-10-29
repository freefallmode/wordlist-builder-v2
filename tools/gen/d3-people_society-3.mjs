// Generated word data: People & Society depth-3 themes (law and order, money, religion, military), chunk 3.
const P = (o = {}) => ({ type: 'common', ...o });
const NP = (o = {}) => ({ type: 'person', ...o });
const PR = (o = {}) => ({ type: 'proper', ...o });
const PL = (o = {}) => ({ type: 'place', ...o });
const V = (o = {}) => ({ pos: 'verb', ...o });
const ADJ = (o = {}) => ({ pos: 'adjective', ...o });

export const THEMES = {
  punishments: { d: 2, adult: true, sensitive: true, note: 'sentences and penalties for breaking rules or laws' },
  spy_words: { d: 3, sensitive: true },
  money_words: { d: 1, note: 'general words about cash and wealth' },
  currencies: { d: 2 },
  banking_words: { d: 2 },
  coins: { d: 2 },
  tax_words: { d: 3 },
  shopping_words: { d: 1 },
  money_slang: { d: 3, lang: true },
  stock_market_words: { d: 3 },
  business_words: { d: 2 },
  bazaar: { d: 4, note: 'things in a Middle Eastern or Turkish market' },
  things_you_do_with_money: { d: 1, note: 'verbs: spend, save, lend ...' },
  religion_words: { d: 2, sensitive: true },
  religious_festivals: { d: 2, sensitive: true },
  religious_leaders: { d: 3, sensitive: true },
  holy_books: { d: 3, sensitive: true },
  angels_and_spirits: { d: 3, sensitive: true },
  places_of_worship: { d: 2, sensitive: true },
  pilgrimage_sites: { d: 4, sensitive: true },
  famous_saints: { d: 3, sensitive: true },
  religious_clothing: { d: 4, sensitive: true },
  afterlife_words: { d: 3, sensitive: true },
  islam_words: { d: 3, sensitive: true },
  judaism_words: { d: 3, sensitive: true },
  buddhism_words: { d: 4, sensitive: true },
  hinduism_words: { d: 4, sensitive: true },
  military_ranks: { d: 3 },
  army_words: { d: 2 },
  navy_words: { d: 3 },
};

export const DATA = {
  punishments: [
    ['fine', 1, 1, { g: 'penalty' }], ['jail', 1, 1], ['prison sentence', 2, 2], ['detention', 1, 1], ['grounding', 1, 2], ['community service', 2, 1],
    ['probation', 2, 1], ['parole', 2, 3], ['curfew', 2, 2], ['ban', 1, 2, { g: 'prohibition' }], ['suspension', 2, 2], ['expulsion', 2, 3],
    ['death penalty', 2, 1, { al: [['capital punishment', 'synonym', 2, 2]] }], ['life sentence', 2, 1], ['house arrest', 2, 2], ['lines', 2, 3, { g: 'school punishment' }],
    ['time out', 1, 2], ['flogging', 3, 2, { al: [['caning', 'synonym', 3, 3]] }], ['stocks', 3, 3, { g: 'punishment' }], ['pillory', 4, 3], ['hard labor', 3, 2, { al: [['hard labour', 'spelling', 3, 2, ['UK']]] }],
    ['solitary confinement', 3, 2], ['exile', 2, 3], ['banishment', 3, 3], ['transportation', 3, 4, { g: 'penal exile' }], ['ducking stool', 5, 4],
    ['keelhauling', 4, 4], ['whipping', 2, 2], ['impoundment', 4, 4], ['forfeit', 3, 3, { g: 'penalty' }], ['penalty points', 3, 3, { reg: ['UK'] }],
    ['gating', 5, 4, { reg: ['UK'] }], ['public shaming', 3, 3], ['tarring and feathering', 4, 3], ['guillotine', 2, 3, { g: 'execution device' }],
  ],

  spy_words: [
    ['spy', 1, 1], ['agent', 1, 2, { g: 'spy' }], ['mole', 2, 2, { g: 'spy' }], ['double agent', 2, 1], ['secret agent', 1, 1], ['cipher', 3, 2], ['code', 1, 3, { g: 'cipher' }],
    ['handler', 3, 2, { g: 'spy' }], ['safe house', 3, 1], ['codename', 2, 1], ['wiretap', 3, 2], ['bug', 1, 3, { g: 'listening device' }], ['surveillance', 2, 2],
    ['dead drop', 3, 1], ['sleeper agent', 3, 1], ['undercover', 2, 2], ['informant', 3, 3], ['espionage', 2, 1], ['intelligence', 2, 3, { g: 'spying' }],
    ['disguise', 1, 3], ['cover story', 3, 2], ['defector', 3, 2], ['trench coat', 2, 4], ['invisible ink', 2, 2], ['microfilm', 3, 2], ['decoy', 3, 4],
    ['honey trap', 3, 2], ['tradecraft', 4, 2], ['asset', 3, 3, { g: 'spy' }], ['cutout', 5, 3, { g: 'spy go-between' }], ['black ops', 3, 3], ['Enigma', 3, 3, PR({ g: 'cipher machine' })],
    ['MI6', 3, 2, { type: 'org' }], ['CIA', 1, 2, { type: 'acronym' }], ['KGB', 2, 2, { type: 'acronym' }], ['Mata Hari', 4, 3, NP()], ['one-time pad', 5, 3], ['burn notice', 4, 3],
  ],

  money_words: [
    ['money', 1, 1], ['cash', 1, 1], ['coin', 1, 1], ['banknote', 2, 2, { al: [['bill', 'synonym', 1, 2, ['US'], { g: 'banknote' }]] }], ['wealth', 2, 2], ['salary', 2, 2], ['wage', 2, 2], ['income', 2, 2],
    ['savings', 2, 1], ['debt', 2, 1], ['loan', 2, 1], ['price', 1, 2], ['cost', 1, 2], ['change', 1, 3, { g: 'coins' }], ['allowance', 2, 3, { g: 'pocket money' }],
    ['pocket money', 1, 2, { reg: ['UK'] }], ['fortune', 2, 3, { g: 'wealth' }], ['inheritance', 3, 3], ['pension', 2, 3, { g: 'retirement' }], ['bonus', 2, 3], ['profit', 2, 2], ['budget', 2, 2],
    ['interest', 2, 3, { g: 'finance' }], ['credit', 2, 2], ['mortgage', 2, 3], ['bankruptcy', 3, 3], ['capital', 3, 3, { g: 'finance' }], ['liquidity', 5, 4], ['legal tender', 4, 3],
    ['fiat', 5, 4, { g: 'currency' }], ['dowry', 4, 5], ['stipend', 4, 4], ['remuneration', 4, 4], ['emolument', 5, 5], ['petty cash', 3, 2], ['hard cash', 3, 2],
  ],

  currencies: [
    ['dollar', 1, 1], ['euro', 1, 1], ['pound', 1, 1, { g: 'currency' }], ['yen', 1, 1], ['peso', 2, 1], ['rupee', 2, 1], ['franc', 2, 1], ['yuan', 2, 1, { al: [['renminbi', 'synonym', 4, 3]] }],
    ['rouble', 2, 1], ['krona', 3, 2], ['rand', 3, 2], ['lira', 3, 2], ['won', 3, 2, { g: 'currency' }], ['baht', 3, 2],
    ['dinar', 3, 2], ['dirham', 4, 3], ['shekel', 3, 2], ['real', 3, 3, { g: 'Brazilian currency' }], ['zloty', 4, 2], ['forint', 4, 3], ['koruna', 4, 3], ['rial', 4, 3],
    ['ringgit', 4, 3], ['dong', 4, 3, { g: 'currency' }], ['kwacha', 5, 4], ['naira', 4, 3], ['shilling', 3, 2], ['cedi', 5, 4], ['kyat', 5, 4], ['taka', 4, 3],
    ['leu', 5, 4], ['lev', 5, 4], ['hryvnia', 4, 3], ['bolivar', 5, 4], ['quetzal', 5, 4, { g: 'currency' }], ['guilder', 4, 3], ['drachma', 3, 2], ['deutschmark', 3, 2, { al: [['mark', 'short form', 3, 4]] }],
    ['bitcoin', 2, 3, { g: 'cryptocurrency' }], ['pesetas', 3, 3],
  ],

  banking_words: [
    ['bank', 1, 1, { g: 'financial' }], ['account', 1, 2, { g: 'bank' }], ['deposit', 2, 1], ['withdrawal', 2, 1], ['balance', 2, 2, { g: 'bank' }], ['cashier', 2, 2], ['teller', 3, 2], ['ATM', 1, 1, { type: 'acronym' }],
    ['cheque', 2, 2, { reg: ['UK'], al: [['check', 'spelling', 1, 2, ['US'], { g: 'bank draft' }]] }], ['debit card', 1, 1], ['credit card', 1, 1], ['PIN', 1, 2, { type: 'acronym' }],
    ['overdraft', 3, 1], ['statement', 2, 2, { g: 'bank' }], ['vault', 2, 2, { g: 'bank' }], ['safe deposit box', 3, 2], ['mortgage', 2, 3], ['loan', 2, 1], ['savings account', 1, 1],
    ['current account', 2, 1, { reg: ['UK'], al: [['checking account', 'synonym', 2, 1, ['US']]] }], ['interest rate', 2, 1], ['direct debit', 3, 2, { reg: ['UK'] }], ['standing order', 3, 2, { reg: ['UK'] }],
    ['wire transfer', 3, 2], ['sort code', 3, 2, { reg: ['UK'] }], ['IBAN', 4, 3, { type: 'acronym' }], ['SWIFT', 4, 3, { type: 'acronym', g: 'payment network' }], ['routing number', 3, 2, { reg: ['US'] }],
    ['teller machine', 3, 3], ['credit score', 2, 2], ['collateral', 4, 3], ['escrow', 4, 4], ['lien', 5, 4], ['amortization', 5, 4], ['bank run', 4, 3], ['signatory', 4, 4], ['passbook', 4, 3],
  ],

  coins: [
    ['penny', 1, 1], ['nickel', 1, 1, { g: 'coin' }], ['dime', 1, 1], ['quarter', 1, 2, { g: 'coin' }], ['half dollar', 3, 2], ['cent', 1, 1], ['euro cent', 3, 2], ['sovereign', 3, 2],
    ['farthing', 4, 2, { reg: ['UK'] }], ['shilling', 3, 2], ['florin', 4, 2], ['crown', 3, 2, { g: 'coin' }], ['guinea', 4, 3, { g: 'coin' }], ['doubloon', 3, 2], ['ducat', 4, 3],
    ['denarius', 4, 3], ['sestertius', 5, 4], ['obol', 5, 4], ['drachma', 3, 2], ['thaler', 4, 3], ['groat', 5, 3], ['tuppence', 4, 3, { reg: ['UK'] }], ['sixpence', 3, 2, { reg: ['UK'] }],
    ['halfpenny', 3, 2, { reg: ['UK'] }], ['pound coin', 2, 1], ['two pence', 3, 2, { reg: ['UK'] }], ['loonie', 3, 2, { reg: ['CA'] }], ['toonie', 4, 3, { reg: ['CA'] }],
    ['silver dollar', 2, 2], ['gold coin', 1, 2], ['bullion coin', 4, 3], ['krugerrand', 4, 3], ['bit', 3, 4, { g: 'coin' }], ['piece of eight', 3, 2], ['token', 2, 4, { g: 'coin-like' }],
    ['pfennig', 4, 3], ['centime', 4, 3], ['kopek', 4, 3], ['Sacagawea dollar', 5, 4, PR()],
  ],

  tax_words: [
    ['tax', 1, 1], ['income tax', 1, 1], ['sales tax', 1, 1], ['VAT', 2, 1, { type: 'acronym' }], ['tariff', 3, 2], ['duty', 2, 3, { g: 'tax' }], ['customs', 2, 3], ['deduction', 3, 2],
    ['tax return', 2, 1], ['audit', 3, 2], ['refund', 2, 3], ['allowance', 2, 3, { g: 'tax' }], ['tax haven', 3, 1], ['tax evasion', 3, 2], ['loophole', 3, 3], ['withholding', 4, 3],
    ['IRS', 2, 1, { type: 'acronym' }], ['HMRC', 3, 2, { type: 'acronym', reg: ['UK'] }], ['payroll tax', 3, 2], ['property tax', 2, 1], ['council tax', 3, 2, { reg: ['UK'] }], ['inheritance tax', 2, 1],
    ['capital gains', 3, 2], ['excise', 4, 3], ['levy', 3, 2], ['toll', 2, 4], ['tithe', 4, 4], ['poll tax', 3, 2], ['window tax', 4, 3], ['stamp duty', 3, 2, { reg: ['UK'] }],
    ['tax bracket', 3, 2], ['tax credit', 3, 2], ['W-2', 4, 3, { type: 'acronym', reg: ['US'] }], ['taxable', 3, 3, ADJ()], ['fiscal year', 3, 3], ['assessment', 3, 3], ['tax code', 3, 2],
    ['windfall tax', 4, 3], ['carbon tax', 3, 2], ['Pigouvian tax', 5, 4, PR()],
  ],

  shopping_words: [
    ['shop', 1, 1], ['store', 1, 1], ['mall', 1, 1], ['supermarket', 1, 1], ['cart', 1, 1, { g: 'shopping' }], ['trolley', 2, 1, { g: 'shopping', reg: ['UK'] }], ['basket', 1, 2, { g: 'shopping' }],
    ['checkout', 1, 1], ['receipt', 1, 1], ['cashier', 2, 1], ['customer', 1, 1], ['discount', 1, 1], ['sale', 1, 1], ['coupon', 2, 1], ['bargain', 2, 1], ['refund', 2, 2],
    ['price tag', 1, 1], ['aisle', 2, 1], ['shelf', 1, 2, { g: 'shop' }], ['barcode', 2, 1], ['bag', 1, 2, { g: 'shopping' }], ['window shopping', 2, 1], ['retail', 2, 2], ['wholesale', 3, 3],
    ['browsing', 2, 2], ['haggle', 3, 2, V()], ['clearance', 2, 2], ['loyalty card', 2, 1], ['gift voucher', 2, 2, { reg: ['UK'] }], ['gift card', 1, 1], ['changing room', 2, 1], ['fitting room', 2, 1],
    ['boutique', 3, 2], ['bazaar', 3, 3], ['emporium', 4, 3], ['Black Friday', 2, 1, PR()], ['impulse buy', 3, 1], ['shopaholic', 3, 2], ['flash sale', 3, 2], ['markdown', 3, 3, { g: 'price cut' }],
    ['concession stand', 4, 4], ['shopfront', 3, 2], ['sundries', 4, 4],
  ],

  money_slang: [
    ['dough', 2, 2, { g: 'money' }], ['bread', 2, 2, { g: 'money' }], ['moolah', 3, 1], ['bucks', 1, 1], ['quid', 2, 1, { reg: ['UK'] }], ['loot', 2, 2, { g: 'money' }], ['dosh', 3, 2, { reg: ['UK'] }],
    ['greenbacks', 3, 1], ['clams', 3, 2], ['smackers', 4, 2], ['cheddar', 3, 3, { g: 'money' }], ['cabbage', 3, 4, { g: 'money' }], ['wad', 3, 3], ['benjamins', 3, 2], ['grand', 2, 2, { g: 'thousand' }],
    ['fiver', 2, 2, { reg: ['UK'] }], ['tenner', 2, 2, { reg: ['UK'] }], ['buck', 1, 1], ['cash money', 3, 3], ['paper', 2, 3, { g: 'money' }], ['stacks', 3, 3], ['dead presidents', 4, 3],
    ['simoleons', 4, 3], ['lolly', 3, 3, { g: 'money', reg: ['UK', 'AU'] }], ['wonga', 4, 2, { reg: ['UK'] }], ['spondulicks', 5, 3], ['readies', 4, 3, { reg: ['UK'] }], ['wedge', 4, 4, { g: 'money', reg: ['UK'] }],
    ['bones', 3, 3, { g: 'money' }], ['scratch', 3, 4, { g: 'money' }], ['bank', 2, 4, { g: 'money slang' }], ['green', 2, 4, { g: 'money' }],
    ['lettuce', 3, 4, { g: 'money' }], ['moola', 4, 3], ['shekels', 3, 3, { g: 'money slang' }], ['ackers', 5, 4, { reg: ['UK'] }], ['pony', 4, 4, { g: 'twenty-five pounds', reg: ['UK'] }],
    ['monkey', 3, 4, { g: 'five hundred pounds', reg: ['UK'] }], ['score', 3, 4, { g: 'twenty pounds' }], ['C-note', 4, 3, { g: 'hundred dollars' }], ['sawbuck', 5, 4],
  ],

  stock_market_words: [
    ['shares', 2, 1], ['stock', 2, 1, { g: 'shares' }], ['bull', 2, 2, { g: 'market' }], ['bear', 2, 3, { g: 'market' }], ['dividend', 3, 1], ['broker', 3, 1], ['index', 3, 2, { g: 'market' }],
    ['portfolio', 3, 1], ['bond', 2, 2, { g: 'finance' }], ['trader', 2, 1], ['investor', 2, 1], ['Wall Street', 2, 1, PL()], ['Dow Jones', 3, 1, PR()], ['NASDAQ', 3, 1, { type: 'org' }],
    ['FTSE', 3, 2, { type: 'acronym', reg: ['UK'] }], ['S&P 500', 3, 2, PR()], ['IPO', 3, 1, { type: 'acronym' }], ['ticker', 3, 2], ['crash', 2, 2, { g: 'market' }], ['rally', 3, 2, { g: 'market' }],
    ['short selling', 4, 2], ['hedge fund', 3, 1], ['mutual fund', 3, 1], ['equity', 3, 2], ['blue chip', 3, 1], ['penny stock', 3, 1], ['futures', 4, 2], ['option', 3, 3, { g: 'finance' }],
    ['commodities', 3, 2], ['bourse', 4, 2], ['arbitrage', 4, 2], ['volatility', 3, 2], ['market cap', 3, 1], ['margin call', 4, 2], ['stag', 5, 4, { g: 'share trader' }], ['dead cat bounce', 4, 2],
    ['bull run', 3, 1], ['trading floor', 3, 1], ['stock exchange', 2, 1], ['yield', 3, 3, { g: 'finance' }], ['ETF', 4, 2, { type: 'acronym' }], ['dark pool', 5, 3],
  ],

  business_words: [
    ['profit', 2, 1], ['revenue', 3, 1], ['merger', 3, 1], ['startup', 2, 1], ['CEO', 2, 1, { type: 'acronym' }], ['shareholder', 3, 1], ['budget', 2, 2], ['invoice', 2, 1],
    ['company', 1, 1], ['corporation', 2, 1], ['employee', 1, 1], ['manager', 1, 1], ['boss', 1, 2], ['client', 2, 1], ['contract', 2, 2], ['meeting', 1, 2, { g: 'business' }], ['deadline', 2, 2],
    ['office', 1, 2, { g: 'workplace' }], ['stakeholder', 3, 1], ['acquisition', 3, 1], ['takeover', 3, 1], ['partnership', 2, 1], ['franchise', 3, 1], ['brand', 2, 2], ['marketing', 2, 1],
    ['headquarters', 2, 2], ['outsourcing', 3, 1], ['board of directors', 3, 1], ['quarterly report', 3, 1], ['cash flow', 3, 1], ['overhead', 3, 2], ['supply chain', 3, 1], ['liquidation', 4, 2],
    ['synergy', 3, 1], ['benchmark', 3, 3], ['KPI', 3, 1, { type: 'acronym' }], ['turnover', 3, 2], ['SWOT analysis', 4, 2], ['venture capital', 4, 1], ['unicorn', 2, 4, { g: 'startup' }],
    ['pivot', 3, 3, { g: 'business' }], ['bootstrapping', 4, 2], ['burn rate', 4, 2], ['amalgamation', 5, 3], ['conglomerate', 4, 2],
  ],

  bazaar: [
    ['carpets', 2, 2], ['spices', 1, 2], ['lanterns', 2, 2], ['haggling', 2, 1], ['tea', 1, 3], ['brass', 2, 3], ['stall', 1, 2], ['souk', 3, 1, { al: [['souq', 'spelling', 4, 2]] }],
    ['kilim', 4, 3], ['hookah', 3, 3], ['saffron', 2, 3, { g: 'spice' }], ['sumac', 4, 3], ['dates', 2, 3, { g: 'fruit' }], ['figs', 2, 3], ['baklava', 2, 3], ['Turkish delight', 2, 2], ['ceramics', 3, 3],
    ['copper pots', 3, 2], ['evil eye', 3, 3, { g: 'charm' }], ['fez', 3, 2, { g: 'hat' }], ['henna', 3, 3], ['incense', 2, 3], ['oud', 4, 3, { g: 'perfume' }], ['rosewater', 3, 3], ['pashmina', 3, 3],
    ['slippers', 2, 4, { g: 'footwear' }], ['mosaic lamp', 4, 3], ['merchant', 2, 2], ['camel', 1, 4], ['caravanserai', 5, 3], ['hammam', 4, 4], ['tagine', 3, 3],
    ['dried apricots', 3, 3], ['pistachios', 2, 3], ['nargile', 5, 4], ['muslin', 3, 4], ['lamp', 1, 4, { g: 'light' }], ['covered market', 3, 2], ['Grand Bazaar', 4, 1, PR()], ['Khan el-Khalili', 5, 2, PL()],
    ['sherbet', 3, 4], ['silk scarf', 2, 3], ['tassels', 3, 4], ['Aleppo soap', 5, 3],
  ],

  things_you_do_with_money: [
    ['spend', 1, 1, V()], ['save', 1, 1, V()], ['earn', 1, 1, V()], ['lend', 1, 1, V()], ['borrow', 1, 1, V()], ['invest', 2, 1, V()], ['pay', 1, 1, V()], ['owe', 1, 1, V()],
    ['donate', 2, 1, V()], ['waste', 1, 2, V()], ['count', 1, 3, V({ g: 'money' })], ['deposit', 2, 1, V()], ['withdraw', 2, 1, V()], ['exchange', 2, 2, V({ g: 'money' })], ['tip', 1, 2, V({ g: 'money' })],
    ['gamble', 2, 2, V()], ['bet', 1, 2, V()], ['bribe', 2, 2, V()], ['hoard', 3, 2, V()], ['squander', 3, 2, V()], ['splurge', 3, 2, V()], ['budget', 2, 2, V()], ['launder', 4, 2, V({ g: 'money' })],
    ['pawn', 3, 3, V()], ['lend out', 2, 2, V()], ['stash', 3, 3, V()], ['embezzle', 4, 2, V()], ['bankroll', 4, 3, V()], ['refund', 2, 2, V()], ['haggle', 3, 3, V()], ['splash out', 3, 2, V()],
    ['tithe', 4, 4, V()], ['endow', 4, 3, V()], ['remit', 4, 3, V()], ['amass', 4, 3, V()], ['pocket', 2, 4, V({ g: 'money' })], ['fritter away', 4, 3, V()], ['divest', 5, 4, V()],
  ],

  religion_words: [
    ['prayer', 1, 1], ['God', 1, 1, PR()], ['faith', 1, 1], ['worship', 2, 1], ['sin', 1, 1], ['soul', 1, 2], ['bless', 2, 2, V()], ['sacred', 2, 1, ADJ()], ['holy', 1, 1, ADJ()], ['miracle', 2, 2],
    ['priest', 1, 1, P()], ['church', 1, 1], ['hymn', 2, 1], ['altar', 2, 1], ['pray', 1, 1, V()], ['saint', 1, 1, P()], ['prophet', 2, 1, P()], ['scripture', 3, 1], ['sermon', 3, 1],
    ['ritual', 2, 2], ['pilgrim', 2, 1, P()], ['baptism', 2, 1], ['creed', 3, 1], ['doctrine', 3, 1], ['heresy', 4, 1], ['sacrament', 3, 1], ['atheism', 3, 2], ['agnostic', 3, 2, P()],
    ['theology', 3, 1], ['divine', 2, 2, ADJ()], ['deity', 3, 1], ['monotheism', 4, 1], ['pantheon', 4, 2, { g: 'gods' }], ['absolution', 4, 2], ['liturgy', 4, 2], ['canon', 4, 3, { g: 'church law' }], ['apostasy', 5, 2],
    ['grace', 2, 3, { g: 'religion' }], ['offering', 2, 3, { g: 'religion' }], ['covenant', 4, 2], ['catechism', 4, 2], ['exorcism', 3, 3, { adult: true }],
  ],

  religious_festivals: [
    ['Christmas', 1, 1, PR()], ['Easter', 1, 1, PR()], ['Ramadan', 2, 1, PR()], ['Eid', 2, 1, PR()], ['Diwali', 2, 1, PR()], ['Hanukkah', 2, 1, PR()], ['Passover', 2, 1, PR()],
    ['Yom Kippur', 3, 1, PR()], ['Rosh Hashanah', 3, 1, PR()], ['Vesak', 4, 1, PR()], ['Holi', 3, 2, PR()], ['Pentecost', 3, 1, PR()], ['Lent', 2, 1, PR({ g: 'season' })], ['Ash Wednesday', 3, 1, PR()],
    ['Good Friday', 2, 1, PR()], ['Advent', 3, 1, PR()], ['Epiphany', 3, 1, PR({ g: 'holiday' })], ['Ascension Day', 4, 1, PR()], ['Whitsun', 4, 2, PR({ reg: ['UK'] })], ['Shavuot', 4, 1, PR()],
    ['Sukkot', 4, 1, PR()], ['Purim', 3, 1, PR()], ['Eid al-Fitr', 3, 1, PR()], ['Eid al-Adha', 3, 1, PR()], ['Navratri', 4, 1, PR()], ['Janmashtami', 5, 1, PR()],
    ['Maha Shivaratri', 5, 1, PR()], ['Raksha Bandhan', 4, 1, PR()], ['Vaisakhi', 4, 1, PR()], ['Candlemas', 5, 2, PR()], ['All Saints Day', 3, 1, PR()], ['Lammas', 5, 2, PR()],
    ['Samhain', 4, 3, PR()], ['Beltane', 4, 3, PR()], ['Palm Sunday', 3, 1, PR()], ['Shrove Tuesday', 3, 2, PR()], ['Mawlid', 5, 1, PR()], ['Ashura', 4, 1, PR()], ['Dussehra', 4, 1, PR()], ['Obon', 4, 2, PR()],
    ['Pesach', 4, 1, PR()],
  ],

  religious_leaders: [
    ['pope', 1, 1, P()], ['priest', 1, 1, P()], ['rabbi', 2, 1, P()], ['imam', 2, 1, P()], ['bishop', 2, 1, P({ g: 'church' })], ['archbishop', 2, 1, P()], ['cardinal', 2, 2, P({ g: 'church' })], ['vicar', 2, 1, P()],
    ['monk', 1, 2, P()], ['nun', 1, 2, P()], ['minister', 2, 2, P({ g: 'church' })], ['pastor', 2, 1, P()], ['deacon', 3, 1, P()], 
    ['guru', 2, 2, P({ g: 'spiritual' })], ['mullah', 3, 1, P()], ['ayatollah', 3, 1, P()], ['chaplain', 3, 1, P()], ['curate', 3, 1, P()], ['rector', 4, 2, P()], ['abbot', 3, 1, P()],
    ['abbess', 4, 1, P()], ['prior', 4, 2, P({ g: 'monastery' })], ['friar', 3, 1, P()], ['shaman', 3, 2, P()], ['druid', 3, 3, P({ g: 'priest' })], ['lama', 3, 1, P()], ['swami', 4, 1, P()], ['brahmin', 4, 2, P()],
    ['sheikh', 3, 3, P({ g: 'Muslim leader' })], ['muezzin', 4, 1, P()], ['cantor', 4, 2, P()], ['patriarch', 4, 2, P()], ['archdeacon', 4, 1, P()], ['dean', 3, 3, P({ g: 'church' })],
    ['canon', 4, 2, P({ g: 'clergy' })], ['moderator', 4, 3, P({ g: 'church' })], ['verger', 5, 3, P()], ['sexton', 5, 3, P()], ['Grand Mufti', 5, 1, P()], ['caliph', 4, 2, P()], ['pontiff', 4, 1, P()],
  ],

  holy_books: [
    ['Bible', 1, 1, PR()], ['Quran', 2, 1, PR({ al: [['Koran', 'spelling', 2, 1]] })], ['Torah', 2, 1, PR()], ['Talmud', 3, 1, PR()], ['Gospel', 2, 2, PR()], ['Psalms', 3, 1, PR()],
    ['Book of Mormon', 3, 1, PR()], ['Vedas', 3, 1, PR()], ['Bhagavad Gita', 3, 1, PR()], ['Upanishads', 4, 1, PR()], ['Ramayana', 3, 2, PR()], ['Mahabharata', 4, 2, PR()],
    ['Guru Granth Sahib', 4, 1, PR()], ['Tripitaka', 5, 1, PR()], ['Dhammapada', 5, 1, PR()], ['Tao Te Ching', 4, 2, PR()], ['Avesta', 5, 1, PR()], ['Hadith', 4, 1, PR()],
    ['New Testament', 2, 1, PR()], ['Old Testament', 2, 1, PR()], ['Book of Genesis', 3, 2, PR()], ['Book of Revelation', 3, 2, PR()], ['Apocrypha', 4, 2, PR()], ['Gideon Bible', 4, 3, PR()],
    ['Septuagint', 5, 2, PR()], ['Book of Common Prayer', 4, 2, PR()], ['Book of Kells', 4, 3, PR()], ['Dead Sea Scrolls', 3, 3, PR()], ['I Ching', 4, 3, PR()], ['Sutras', 4, 2, PR()],
    ['Kojiki', 5, 3, PR()], ['Puranas', 5, 1, PR()], ['Zohar', 5, 1, PR()], ['Tanakh', 5, 1, PR()], ['Pentateuch', 5, 1, PR()], ['Book of Job', 4, 3, PR()], ['Lotus Sutra', 5, 2, PR()],
    ['Book of Exodus', 3, 2, PR()], ['King James Bible', 3, 1, PR()],
  ],

  angels_and_spirits: [
    ['angel', 1, 1], ['guardian angel', 1, 1], ['cherub', 3, 1], ['seraph', 4, 1, { al: [['seraphim', 'plural', 4, 1]] }], ['archangel', 2, 1], ['Gabriel', 2, 2, PR({ g: 'archangel' })], ['Michael', 2, 3, PR({ g: 'archangel' })],
    ['Raphael', 3, 3, PR({ g: 'archangel' })], ['Uriel', 4, 2, PR()], ['demon', 1, 1], ['devil', 1, 1], ['Satan', 2, 1, PR()], ['Lucifer', 2, 1, PR()], ['ghost', 1, 2], ['spirit', 1, 1],
    ['djinn', 3, 1, { al: [['genie', 'synonym', 1, 2, [], { g: 'spirit' }]] }], ['poltergeist', 3, 3], ['banshee', 3, 3], ['fallen angel', 2, 1], ['imp', 2, 2], ['spectre', 3, 3], ['wraith', 3, 3],
    ['fiend', 3, 2], ['incubus', 4, 2, { adult: true }], ['succubus', 4, 2, { adult: true }], ['valkyrie', 3, 4], ['sylph', 4, 3], ['nymph', 3, 3], ['dryad', 4, 3], ['fairy', 1, 4],
    ['Beelzebub', 4, 2, PR()], ['Azrael', 5, 2, PR({ g: 'angel of death' })], ['Metatron', 5, 2, PR()], ['throne', 4, 3, { g: 'angel rank' }], ['principality', 5, 3, { g: 'angel rank' }],
    ['Abaddon', 5, 2, PR()], ['archdemon', 4, 3], ['halo', 1, 4, { g: 'angel' }], ['familiar', 3, 4, { g: 'spirit' }], ['elemental', 3, 4, { g: 'spirit' }], ['shade', 3, 4, { g: 'ghost' }],
  ],

  places_of_worship: [
    ['church', 1, 1], ['mosque', 1, 1], ['synagogue', 2, 1], ['temple', 1, 1, { g: 'worship' }], ['cathedral', 1, 1], ['chapel', 2, 1], ['monastery', 2, 1], ['abbey', 2, 1], ['shrine', 2, 1], ['gurdwara', 4, 1],
    ['pagoda', 2, 2], ['basilica', 3, 1], ['minster', 4, 2], ['priory', 4, 2], ['convent', 3, 2], ['nunnery', 3, 2], ['stupa', 4, 2], ['mandir', 4, 1], ['meeting house', 3, 2],
    ['kirk', 4, 2, { reg: ['UK'] }], ['tabernacle', 4, 2], ['sanctuary', 3, 3, { g: 'church' }], ['oratory', 5, 2], ['cloister', 4, 3], ['baptistery', 5, 2], ['kingdom hall', 4, 1], ['ashram', 4, 2],
    ['mausoleum', 3, 4], ['vihara', 5, 2], ['wat', 4, 2], ['fire temple', 5, 1], ['hermitage', 4, 3], ['masjid', 4, 1], ['pantheon', 4, 4, { g: 'temple' }],
    ['parish church', 3, 1], ['Orthodox church', 3, 1], ['ziggurat', 4, 3],
  ],

  pilgrimage_sites: [
    ['Mecca', 2, 1, PL()], ['Lourdes', 3, 1, PL()], ['Varanasi', 4, 1, PL()], ['Jerusalem', 2, 1, PL()], ['Santiago de Compostela', 4, 1, PL()], ['Canterbury', 3, 2, PL()], ['Bodh Gaya', 5, 1, PL()],
    ['Amritsar', 4, 1, PL()], ['Medina', 3, 1, PL()], ['Rome', 1, 3, PL()], ['Vatican City', 2, 2, PL()], ['Fatima', 4, 1, PL({ g: 'Portugal' })], ['Karbala', 4, 1, PL()], ['Najaf', 5, 1, PL()],
    ['Walsingham', 5, 1, PL()], ['Knock', 5, 2, PL({ g: 'Ireland' })], ['Croagh Patrick', 5, 1, PL()], ['Glastonbury', 3, 3, PL()], ['Iona', 4, 2, PL()], ['Lindisfarne', 4, 3, PL()],
    ['Lumbini', 5, 1, PL()], ['Kandy', 4, 3, PL()], ['Mount Kailash', 5, 1, PL()], ['Haridwar', 5, 1, PL()], ['Rishikesh', 4, 2, PL()], ['Tirupati', 5, 1, PL()], ['Kashi', 5, 1, PL()],
    ['Shikoku', 5, 1, PL()], ['Mount Sinai', 4, 2, PL()], ['Bethlehem', 3, 1, PL()], ['Nazareth', 3, 1, PL()], ['Western Wall', 4, 1, PL()], ['Kaaba', 3, 1, PL()], ['Częstochowa', 5, 1, PL()],
    ['Medjugorje', 5, 1, PL()], ['Mount Athos', 5, 1, PL()], ['Golden Temple', 3, 1, PL()], ['Ise Shrine', 5, 1, PL()], ['Ganges', 3, 3, PL({ g: 'river' })], ['Konya', 5, 2, PL()], ['Kairouan', 5, 2, PL()],
  ],

  famous_saints: [
    ['Patrick', 2, 1, NP({ g: 'saint' })], ['Nicholas', 2, 1, NP({ g: 'saint' })], ['George', 2, 1, NP({ g: 'saint' })], ['Francis', 2, 1, NP({ g: 'saint' })], ['Valentine', 2, 1, NP({ g: 'saint' })],
    ['Andrew', 2, 1, NP({ g: 'saint' })], ['Christopher', 2, 1, NP({ g: 'saint' })], ['Joan of Arc', 2, 1, NP()], ['Peter', 1, 1, NP({ g: 'saint' })], ['Paul', 1, 1, NP({ g: 'saint' })], ['David', 2, 1, NP({ g: 'saint' })],
    ['Mary', 1, 3, NP({ g: 'saint' })], ['Bernard', 3, 2, NP({ g: 'saint' })], ['Augustine', 3, 1, NP({ g: 'saint' })], ['Thomas Aquinas', 3, 1, NP()], ['Teresa of Avila', 4, 1, NP()],
    ['Mother Teresa', 2, 1, NP()], ['Thomas Becket', 3, 1, NP()], ['Thomas More', 3, 2, NP()], ['Benedict', 3, 1, NP({ g: 'saint' })], ['Jerome', 4, 1, NP({ g: 'saint' })], ['Cecilia', 4, 1, NP({ g: 'saint' })],
    ['Lucy', 3, 2, NP({ g: 'saint' })], ['Agnes', 4, 1, NP({ g: 'saint' })], ['Anthony', 3, 1, NP({ g: 'saint' })], ['Bartholomew', 4, 1, NP({ g: 'saint' })], ['Swithin', 5, 2, NP()], ['Columba', 4, 1, NP()],
    ['Bede', 4, 1, NP()], ['Cuthbert', 5, 1, NP()], ['Dunstan', 5, 1, NP()], ['Sebastian', 4, 2, NP()], ['Stephen', 3, 1, NP({ g: 'saint' })], ['Luke', 2, 2, NP({ g: 'saint' })], ['Elmo', 4, 3, NP({ g: 'saint' })],
    ['Vitus', 5, 2, NP()], ['Joseph', 2, 2, NP({ g: 'saint' })], ['Jude', 4, 1, NP({ g: 'saint' })], ['Crispin', 5, 2, NP()], ['Brigid', 5, 1, NP()],
  ],

  religious_clothing: [
    ['cassock', 4, 1], ['habit', 3, 1, { g: 'nun' }], ['hijab', 2, 1], ['kippah', 3, 1, { al: [['yarmulke', 'synonym', 3, 1], ['skullcap', 'synonym', 3, 2, [], { g: 'religious' }]] }], ['turban', 2, 2],
    ['miter', 4, 1, { al: [['mitre', 'spelling', 4, 1, ['UK']]] }], ['surplice', 5, 1], ['wimple', 4, 1], ['burqa', 3, 1], ['niqab', 4, 1], ['chador', 4, 1], ['tallit', 4, 1, { al: [['prayer shawl', 'synonym', 3, 1]] }],
    ['tefillin', 5, 1], ['dog collar', 2, 2], ['clerical collar', 3, 1], ['robe', 1, 3, { g: 'religious' }], ['cowl', 4, 2], ['stole', 4, 2, { g: 'clergy' }], ['chasuble', 5, 1], ['alb', 5, 1],
    ['cope', 5, 2, { g: 'clergy' }], ['zucchetto', 5, 1], ['scapular', 5, 1], ['saffron robe', 4, 1], ['kesa', 5, 2], ['dhoti', 4, 3], ['sari', 2, 4], ['thobe', 4, 3], ['kufi', 4, 2],
    ['keffiyeh', 4, 4], ['rosary', 3, 3, { g: 'beads' }], ['prayer cap', 4, 1], ['kirpan', 5, 1], ['kara', 5, 2, { g: 'bracelet' }], ['sheitel', 5, 1], ['tichel', 5, 1], ['biretta', 5, 1],
    ['mantle', 4, 4], ['burnous', 5, 4], ['vestments', 4, 1], ['sackcloth', 4, 2],
  ],

  afterlife_words: [
    ['heaven', 1, 1], ['hell', 1, 1], ['paradise', 2, 1], ['purgatory', 3, 1], ['limbo', 3, 2, { g: 'afterlife' }], ['nirvana', 3, 1, { g: 'enlightenment' }], ['underworld', 2, 1], ['reincarnation', 3, 1], ['afterlife', 2, 1],
    ['Hades', 3, 1, PL({ type: 'proper' })], ['Valhalla', 3, 1, PL({ type: 'proper' })], ['Elysium', 4, 1, PL({ type: 'proper' })], ['Sheol', 5, 1, PL({ type: 'proper' })], ['Jannah', 4, 1, PL({ type: 'proper' })],
    ['Gehenna', 5, 1, PL({ type: 'proper' })], ['Pearly Gates', 2, 2, PR()], ['judgment day', 2, 1], ['resurrection', 3, 1], ['salvation', 3, 1], ['damnation', 3, 1], ['eternity', 2, 2], ['soul', 1, 2],
    ['hereafter', 3, 1], ['transmigration', 5, 1], ['karma', 2, 2], ['rapture', 3, 2], ['Day of Judgment', 3, 1, PR()], ['inferno', 3, 3], ['netherworld', 4, 2], ['Styx', 4, 3, PR({ g: 'river' })],
    ['Avalon', 4, 4, PR()], ['Tartarus', 5, 2, PR()], ['Happy Hunting Ground', 4, 3, PR()], ['moksha', 5, 2], ['samsara', 5, 2], ['Abraham\'s bosom', 5, 3], ['Heaven\'s Gate', 4, 3, PR()],
    ['Fiddler\'s Green', 5, 3, PR()], ['Dreaming', 3, 4, PR({ g: 'Aboriginal' })], ['life after death', 1, 1], ['promised land', 3, 3],
  ],

  islam_words: [
    ['mosque', 1, 1], ['minaret', 3, 1], ['imam', 2, 1, P()], ['Ramadan', 2, 1, PR()], ['hajj', 3, 1], ['Quran', 2, 1, PR()], ['Eid', 2, 1, PR()], ['halal', 2, 1, ADJ()], ['muezzin', 4, 1, P()],
    ['Allah', 2, 1, PR()], ['Muhammad', 2, 1, P()], ['Mecca', 2, 1, PL()], ['Kaaba', 3, 1, PL()], ['salah', 4, 1, { g: 'prayer' }], ['zakat', 4, 1], ['sharia', 3, 1], ['fatwa', 3, 1], ['hijab', 2, 1],
    ['mihrab', 5, 1], ['minbar', 5, 1], ['Sunni', 3, 1, PR()], ['Shia', 3, 1, PR()], ['Sufi', 3, 2, PR()], ['hadith', 4, 1], ['umrah', 5, 1], ['sawm', 5, 1],
    ['shahada', 5, 1], ['iftar', 4, 1], ['suhoor', 5, 1], ['wudu', 5, 1], ['prayer mat', 3, 1], ['qibla', 5, 1], ['jihad', 3, 1, { sens: true }], ['caliphate', 4, 2], ['madrasa', 4, 1], ['jinn', 4, 2],
    ['takbir', 5, 1], ['Medina', 3, 1, PL()], ['Surah', 5, 1], ['dhikr', 5, 1], ['masjid', 4, 1], ['ummah', 5, 1], ['mashallah', 4, 2], ['inshallah', 3, 2], ['burqa', 3, 2],
  ],

  judaism_words: [
    ['synagogue', 2, 1], ['rabbi', 2, 1, P()], ['Torah', 2, 1, PR()], ['kosher', 2, 1, ADJ()], ['Shabbat', 3, 1, PR({ al: [['Sabbath', 'synonym', 2, 1]] })], ['menorah', 2, 1], ['bar mitzvah', 3, 1],
    ['Passover', 2, 1, PR()], ['Hanukkah', 2, 1, PR()], ['Talmud', 3, 1, PR()], ['kippah', 3, 1], ['mezuzah', 4, 1], ['dreidel', 3, 1], ['matzo', 2, 1], ['bat mitzvah', 3, 1], ['seder', 3, 1],
    ['Yom Kippur', 3, 1, PR()], ['Rosh Hashanah', 3, 1, PR()], ['shofar', 4, 1], ['tallit', 4, 1], ['tefillin', 5, 1], ['challah', 3, 1], ['cantor', 4, 2, P()], ['yeshiva', 4, 1], ['Star of David', 2, 1, PR()],
    ['Hebrew', 2, 2, PR()], ['Haggadah', 5, 1], ['gefilte fish', 3, 2], ['latke', 3, 2], ['minyan', 5, 1], ['bimah', 5, 1], ['Kaddish', 5, 1], ['mikvah', 5, 1], ['Sukkot', 4, 1, PR()],
    ['shalom', 2, 2], ['mazel tov', 3, 2], ['kvetch', 4, 3], ['Ark', 3, 3, { g: 'Torah cabinet' }], ['Kabbalah', 4, 2], ['Diaspora', 4, 2], ['Zion', 3, 3, PL()], ['kibbutz', 3, 3], ['Western Wall', 4, 1, PL()],
    ['Mishnah', 5, 1], ['Hasidic', 4, 2], ['Purim', 3, 1, PR()],
  ],

  buddhism_words: [
    ['nirvana', 3, 1, { g: 'enlightenment' }], ['karma', 2, 2], ['monk', 1, 2, P()], ['stupa', 4, 1], ['dharma', 3, 1], ['mantra', 3, 2], ['lama', 3, 1, P()], ['zen', 2, 1], ['Buddha', 1, 1, P()], ['meditation', 1, 1],
    ['enlightenment', 2, 1], ['bodhisattva', 4, 1], ['sangha', 5, 1], ['samsara', 5, 1], ['mandala', 3, 2], ['koan', 4, 1], ['sutra', 4, 1], ['pagoda', 2, 2], ['prayer wheel', 3, 1],
    ['Dalai Lama', 2, 1, NP()], ['Bodhi tree', 4, 1], ['lotus', 2, 3, { g: 'flower' }], ['Four Noble Truths', 4, 1, PR()], ['Eightfold Path', 4, 1, PR()], ['tantra', 4, 3], ['satori', 5, 1],
    ['thangka', 5, 1], ['prayer flag', 3, 1], ['theravada', 5, 1], ['mahayana', 5, 1], ['vajrayana', 5, 1], ['arhat', 5, 1], ['bhikkhu', 5, 1], ['vipassana', 5, 1], ['zazen', 5, 1], ['dukkha', 5, 1],
    ['Siddhartha', 4, 1, NP()], ['mindfulness', 2, 2], ['singing bowl', 3, 2], ['saffron robe', 4, 1], ['Tibet', 2, 3, PL()], ['wat', 4, 3], ['Pali', 5, 2, { g: 'language' }], ['cremation', 3, 4],
    ['metta', 5, 1],
  ],

  hinduism_words: [
    ['puja', 4, 1], ['guru', 2, 2, P({ g: 'spiritual' })], ['ashram', 4, 1], ['mantra', 3, 2], ['Vedas', 3, 1, PR()], ['avatar', 3, 2], ['moksha', 5, 1], ['ghat', 5, 2], ['karma', 2, 2], ['dharma', 3, 1],
    ['Brahma', 3, 1, PR()], ['Vishnu', 3, 1, PR()], ['Shiva', 3, 1, PR()], ['Ganesh', 3, 1, PR()], ['Krishna', 3, 1, PR()], ['Rama', 3, 1, PR()], ['Hanuman', 3, 1, PR()], ['Lakshmi', 3, 1, PR()],
    ['Durga', 4, 1, PR()], ['Kali', 3, 1, PR()], ['Ganges', 3, 2, PL({ g: 'river' })], ['Diwali', 2, 1, PR()], ['Holi', 3, 1, PR()], ['temple', 1, 2, { g: 'worship' }], ['mandir', 4, 1], ['sadhu', 4, 1, P()],
    ['yoga', 2, 3], ['chakra', 3, 3], ['om', 2, 2, { g: 'sacred syllable' }], ['bindi', 3, 2], ['sari', 2, 4], ['brahmin', 4, 1, P()], ['caste', 3, 3], ['tilak', 5, 1], ['aarti', 5, 1],
    ['prasad', 5, 1], ['darshan', 5, 1], ['Upanishads', 4, 1, PR()], ['Bhagavad Gita', 3, 1, PR()], ['swastika', 3, 3, { sens: true }], ['atman', 5, 1], ['murti', 5, 1], ['Varanasi', 4, 2, PL()],
    ['pandit', 4, 2, P()], ['yajna', 5, 1], ['lingam', 5, 1, { adult: true }], ['rangoli', 4, 2], ['diya', 4, 2],
  ],

  military_ranks: [
    ['general', 1, 1, P({ g: 'rank' })], ['colonel', 2, 1, P()], ['major', 2, 1, P({ g: 'rank' })], ['captain', 1, 1, P({ g: 'rank' })], ['lieutenant', 2, 1, P()], ['sergeant', 2, 1, P()], ['corporal', 2, 1, P()],
    ['private', 1, 1, P({ g: 'soldier' })], ['admiral', 2, 1, P()], ['commander', 2, 1, P({ g: 'rank' })], ['brigadier', 3, 1, P()], ['field marshal', 3, 1, P()], ['marshal', 3, 2, P({ g: 'rank' })],
    ['second lieutenant', 3, 1, P()], ['lance corporal', 3, 1, P()], ['staff sergeant', 3, 1, P()], ['warrant officer', 3, 1, P()], ['sergeant major', 3, 1, P()], ['rear admiral', 3, 1, P()],
    ['vice admiral', 3, 1, P()], ['commodore', 3, 1, P()], ['ensign', 3, 1, P()], ['midshipman', 4, 1, P()], ['petty officer', 3, 1, P()], ['air marshal', 4, 1, P()], ['wing commander', 3, 1, P()],
    ['squadron leader', 3, 1, P()], ['flight lieutenant', 3, 1, P()], ['group captain', 4, 1, P()], ['air commodore', 5, 1, P()], ['seaman', 2, 2, P()], ['airman', 2, 2, P()], ['cadet', 2, 2, P()],
    ['recruit', 2, 2, P()], ['chief petty officer', 4, 1, P()], ['lieutenant colonel', 3, 1, P()], ['major general', 3, 1, P()], ['brigadier general', 3, 1, P()], ['bombardier', 4, 2, P()],
    ['fusilier', 4, 3, P()], ['sapper', 4, 3, P()], ['subaltern', 5, 1, P()], ['centurion', 3, 3, P()], ['five-star general', 4, 2, P()], ['specialist', 3, 3, P({ g: 'army rank' })],
  ],

  army_words: [
    ['soldier', 1, 1, P()], ['tank', 1, 1, { g: 'military vehicle' }], ['rifle', 1, 1], ['barracks', 2, 1], ['platoon', 3, 1], ['regiment', 3, 1], ['battalion', 3, 1], ['infantry', 2, 1], ['artillery', 2, 1],
    ['cavalry', 2, 1], ['squad', 2, 1], ['recruit', 2, 1, P()], ['drill', 2, 1, { g: 'military' }], ['march', 1, 2, V({ g: 'military' })], ['uniform', 1, 2], ['camouflage', 2, 1], ['bayonet', 3, 1],
    ['grenade', 2, 1], ['trench', 2, 1], ['bunker', 2, 1], ['fort', 1, 2], ['boot camp', 2, 1], ['mess hall', 3, 1], ['salute', 1, 1, V({ g: 'military' })], ['dog tags', 2, 1], ['parade', 1, 2, { g: 'military' }],
    ['garrison', 3, 1], ['sentry', 3, 1, P()], ['reveille', 4, 1], ['bivouac', 5, 1], ['canteen', 2, 3, { g: 'army' }], ['quartermaster', 4, 1, P()], ['ration', 2, 2], ['helmet', 1, 2, { g: 'military' }],
    ['combat boots', 2, 1], ['sniper', 2, 2, P()], ['infantryman', 3, 1, P()], ['paratrooper', 3, 1, P()], ['mortar', 3, 2, { g: 'weapon' }], ['howitzer', 4, 1], ['ammunition', 2, 1],
    ['reconnaissance', 3, 1], ['flank', 3, 2, V({ g: 'military' })], ['sortie', 4, 2], ['ambush', 2, 2], ['court martial', 3, 1], ['AWOL', 3, 1, { type: 'acronym' }], ['demob', 5, 1, { reg: ['UK'] }], ['squaddie', 4, 1, P({ reg: ['UK'] })],
    ['GI', 2, 1, P({ type: 'acronym' })], ['redcoat', 3, 3, P()],
  ],

  navy_words: [
    ['ship', 1, 1], ['submarine', 1, 1], ['destroyer', 2, 1], ['battleship', 2, 1, { g: 'warship' }], ['aircraft carrier', 2, 1], ['frigate', 3, 1], ['cruiser', 3, 1], ['corvette', 4, 1], ['minesweeper', 4, 1],
    ['admiral', 2, 1, P()], ['sailor', 1, 1, P()], ['fleet', 2, 1], ['flotilla', 4, 1], ['port', 1, 3, { g: 'naval' }], ['starboard', 2, 2], ['bow', 2, 3, { g: 'ship' }], ['stern', 3, 3], ['deck', 1, 2, { g: 'ship' }],
    ['anchor', 1, 2], ['bridge', 2, 3, { g: 'ship' }], ['galley', 3, 2, { g: 'ship kitchen' }], ['brig', 3, 2, { g: 'ship prison' }], ['hull', 2, 3], ['periscope', 2, 1], ['torpedo', 2, 1], ['depth charge', 3, 1],
    ['broadside', 4, 2], ['gunwale', 5, 4], ['bosun', 4, 2, P()], ['coxswain', 5, 2, P()], ['quarterdeck', 4, 2], ['mess', 3, 3, { g: 'naval' }], ['hammock', 2, 3], ['mutiny', 3, 3], ['dreadnought', 4, 1],
    ['man-of-war', 4, 1], ['sonar', 3, 2], ['naval base', 2, 1], ['Royal Navy', 2, 1, { type: 'org' }], ['US Navy', 2, 1, { type: 'org' }], ['Marines', 2, 2, { type: 'org' }], ['gun deck', 4, 2],
    ['crow\'s nest', 3, 3], ['port side', 2, 2], ['semaphore', 4, 3], ['gunboat', 3, 1], ['carrier strike group', 4, 1], ['U-boat', 3, 1], ['capstan', 5, 3], ['bulkhead', 4, 3],
  ],
};

export const FIXES = [
  { gloss: ['green', 'colors', 'color'] }, { gloss: ['bull', 'farm_animals', 'animal'] }, { gloss: ['nickel', 'metals', 'metal'] }, { gloss: ['cheddar', 'cheeses', 'cheese'] },
  { gloss: ['lettuce', 'vegetables', 'vegetable'] }, { gloss: ['cabbage', 'vegetables', 'vegetable'] }, { gloss: ['bread', 'breads_and_baking', 'food'] }, { gloss: ['dough', 'breads_and_baking', 'food'] },
  { gloss: ['lolly', 'desserts_and_sweets', 'sweet'] }, { gloss: ['monkey', 'mammals', 'animal'] }, { gloss: ['pony', 'domestic_animals', 'horse'] }, { gloss: ['captain', 'boats_and_ships', 'ship'] },
  { gloss: ['robe', 'clothes', 'bathrobe'] }, { gloss: ['loot', 'pirates', 'plunder'] }, { gloss: ['pantheon', 'mythology', 'gods'] }, { gloss: ['unicorn', 'fantasy', 'creature'] },
];

// Library batch v398 (2026-11-19, Simon approved with three changes): word-family pairs linked in one theme.
// Two separate entries of one word family in one theme (gamer/gaming, joy/joyful) give the answer away inside one group of a level, or
// make an unfair ambiguity across two groups. The pairs are the v397 output of tools/gen/famscan.mjs (225 single-word pairs, plus the
// multi-word plural pair onion ring / onion rings found by a quick check of "X" beside "Xs"). Agreed handling (Simon and the game session):
//   form     the same word in the same sense: one entry; the other becomes a `form` alias of the root (same id, so no export index moves),
//            loses its own links (the root keeps or takes them, at the same typicality) and its show/use/name allowance for them
//   group    different words of one family: one synonym group in that theme (theme.groups); the export's clash id then keeps them out of
//            one level everywhere. A word already in a group of that theme brings the other into it; two groups are merged into one
//   unlink   a link dropped: on the wrong sense of a word (buck [male animal] in money slang, beside bucks [dollars]), or (Simon) one word of
//            the pair leaves the theme instead of a group merge; the app's unlinkEntry cleanup (shown text, use, name allowance, group places)
//   wordplay no change: a wordplay or compound theme (themeLocked: tkind wordplay or compound), where the form is the point
//   keep     no change: male/female pairs in themes about those titles, and pairs a player sorts apart (reason given)
//   nf       no change: not one family (a false match of the rough scan)
//   grouped  no change: already in one group of that theme
// Simon approved it 2026-11-19 with three changes (D entries marked '*': unlink prisoner, jailer, trooper, mariner instead of merging groups).
// The review list (one line per pair, counts per outcome, "*" on Simon's changes) is tools/gen/batch398-review.txt, written by --review.
// Changes nothing when already done, so it can be rerun as a check.
// Run: node tools/gen/batch398.mjs [--apply | --out <path>] [--lib <path>] [--review <path>]
//   (no option) dry run: prints every change; --apply writes the library; --out writes the changed library to <path> instead (for testing);
//   --lib <path> reads that copy instead of the library (a rerun on an --out copy must make 0 changes)
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, themeLocked, unlinkEntry, linkIds } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);   // --lib <path>: read another copy (to rerun on an --out copy)
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const TH = id => { const t = P.ix.theme.get(id); if (!t) throw Error(`no theme ${id}`); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const expIds = () => { const { file } = buildExport(P, PRESETS.family); return { text: file.entries.text.slice(), clash: file.entries.clash ? file.entries.clash.filter(x => x).length : 0 }; };
const [before, mBefore] = count(), expBefore = expIds();
const lab = e => `${e.text} ${e.id}`;
const gtxt = g => '(' + g.map(id => E(id).text).join(', ') + ')';
const log = []; let n = 0;
const PAIRS = `
coffee_words 38270 59831 tamper/tamping
wine_words 28014 53845 cork/corked
wine_words 53857 59860 finish/fining
restaurant_words 20020 20021 host/hostess
big_cats 215 7756 lion/lioness
rabbits_and_hares 8083 8084 cony/coney
dinosaur_words 10100 1614 extinct/extinction
dinosaur_words 6887 1616 paleontology/paleontologist
baby_animals 10133 9273 pup/puppy
forestry_words 30135 28504 log/logger
forestry_words 30249 30239 feller/felling
flower_parts 29523 30434 nectar/nectary
hot_weather_words 31452 31439 scorcher/scorching
mining_words 31788 4148 mine/miner
mining_words 31787 21812 smelter/smelting
mining_words 31803 31801 collier/colliery
taiga 1672 32108 conifer/coniferous
recycling_words 23977 32224 recycle/recyclable
green_living_words 15340 32379 refill/refillery
peninsulas 63174 36654 balkan/balkans
maps_and_globes 2428 2412 cartography/cartographer
map_words 2428 2412 cartography/cartographer
flag_words 37978 37979 vexillology/vexillologist
restaurant 20020 20021 host/hostess
dining_room_staff 20020 20021 host/hostess
hair_salon 33255 57478 stylist/styling
museum 6303 6302 exhibit/exhibition
art_gallery 6303 6302 exhibit/exhibition
commuting_words 2931 2662 commute/commuter
sailing_words 47467 47473 knot/knots
sightseeing_words 2921 48144 tour/tourist
sightseeing_words 48145 2963 sightseer/sightseeing
special_vehicles 3125 49255 tank/tanker
body_parts 3197 3196 tum/tummy
torso 3197 3196 tum/tummy
hair_colors 7672 53057 gray/graying
inside_the_body 3197 3196 tum/tummy
organs 3197 3196 tum/tummy
digestive_system 3197 3196 tum/tummy
plain_names_for_body_parts 3197 3196 tum/tummy
sight_words 3309 14673 vision/visible
sight_words 14674 14675 blurry/blurred
hearing_words 14702 14731 eavesdrop/eavesdropper
smell_words 14736 14768 odor/odorless
operating_room 15359 3477 suture/sutures
illegal_drugs 15501 15500 hash/hashish
four_humours 4023 15554 melancholy/melancholic
four_humours 15550 15553 choler/choleric
sleep 3666 3722 bed/bedding
sleep 3686 3682 sleepy/sleeplessness
sleep_words 3686 3682 sleepy/sleeplessness
personal_care 3786 3785 blush/blusher
makeup 3786 3785 blush/blusher
nail_care 16238 33016 manicure/manicurist
sun_care 16365 4953 shade/shades
mental_health_words 3468 16379 therapy/therapist
ways_of_crying 17015 50164 blub/blubber
family_and_friends 3906 3907 relative/relation
extended_family 3906 3907 relative/relation
terms_of_endearment 32457 32471 dear/dearest
terms_of_endearment 32459 32469 love/lover
terms_of_endearment 32459 50294 love/lovey
terms_of_endearment 32460 50281 babe/baby
terms_of_endearment 32463 32462 pet/petal
terms_of_endearment 32469 50294 lover/lovey
terms_of_endearment 50279 50290 duck/ducky
words_for_mother 28997 56619 mom/mommy
words_for_mother 56623 56624 mam/mammy
words_for_father 32381 56632 dad/daddy
words_for_grandparents 56644 32390 gran/granny
words_for_grandparents 32391 56648 nan/nanny
sad_words 32718 32705 teary/tearful
angry_words 3976 32742 wrath/wrathful
angry_words 4019 32725 fury/furious
disgust_words 26555 32869 yuck/yucky
disgust_words 32860 32855 revolted/revolting
disgust_words 32858 60918 sickened/sickening
disgust_words 32861 32873 nauseated/nauseating
jobs 4088 4089 cop/copper
emergency_workers 4088 4089 cop/copper
nicknames_for_workers 4088 4089 cop/copper
government_words 33290 60970 policy/polity
election_words 33286 33314 vote/voter
royal_titles 6679 33377 baron/baroness
royal_titles 20762 12531 prince/princess
royal_titles 20761 33375 count/countess
royal_titles 20764 20763 marquis/marquess
ranks_of_the_british_peerage 6679 33377 baron/baroness
ranks_of_the_british_peerage 20764 20763 marquis/marquess
ranks_of_the_british_peerage 20765 56754 viscount/viscountess
law_and_order 4183 4069 law/lawyer
law_and_order 4243 4242 felon/felony
prison_words 2485 33709 prison/prisoner
prison_words 2486 64106 jail/jailer
punishments 33804 33818 ban/banishment
wrongdoers 4243 4242 felon/felony
tax_words 33285 33988 tax/taxable
money_slang 10284 34023 buck/bucks
religion_words 34183 4276 pray/prayer
parts_of_a_religious_service 34183 4276 pray/prayer
military 4372 4382 marines/mariner
military 4390 4374 troops/trooper
navy_words 4372 4382 marines/mariner
naval_people 4372 4382 marines/mariner
military_units 34690 4431 battery/battalion
service_members 4372 4382 marines/mariner
stationery 23218 34766 stapler/staples
university_words 4539 34873 lecture/lecturer
university_words 33090 61278 bursar/bursary
media_and_communication 4614 4642 editor/editorial
newspaper_words 4614 4642 editor/editorial
social_media_words 35063 35064 follow/follower
charity_words 34160 35375 donate/donation
charity_words 61429 35388 philanthropy/philanthropist
in_a_handbag 3786 3785 blush/blusher
moving_house 24268 24269 relocate/relocation
scarves_and_gloves 64279 24778 mitt/mitts
thanksgiving 25092 4009 thankful/thankfulness
fireworks 25255 25074 sparkle/sparkler
containers 25476 25487 can/canister
things_with_lids 25476 25487 can/canister
baseball_terms 42803 42802 bat/batter
hitting_terms 42803 42802 bat/batter
volleyball_terms 42933 42940 set/setter
racket_and_target_sports 5289 5250 bowls/bowling
curling_words 43693 5350 curl/curling
running_words 43995 44015 pace/pacer
tournament_words 44340 44366 final/finalist
air_sports 45046 5611 skydiver/skydiving
air_sports 45045 5613 paraglider/paragliding
games_of_chance 5659 5665 poker/pokies
casino_games 5659 5665 poker/pokies
betting_words 33279 65890 bookie/bookies
card_game_words 45508 45206 deal/dealer
esports_words 5826 61793 gamer/gaming
pottery_words 33027 5853 potter/pottery
woodworking_words 46039 23700 joint/jointer
music_terms 6058 11000 harmony/harmonic
music_terms 10997 11001 tone/tonic
rock_band_lineup 11354 6132 vocals/vocalist
dance 6219 6218 choreography/choreographer
dance_studio_words 6219 6218 choreography/choreographer
art 6323 5855 painter/painting
art 6303 6302 exhibit/exhibition
art 6359 6358 dada/dadaism
art_movements 6359 6358 dada/dadaism
art_gallery_words 6303 6302 exhibit/exhibition
musicals_words 6219 6218 choreography/choreographer
dress_up_costumes 4088 4089 cop/copper
jobs_with_uniforms 4088 4089 cop/copper
literature 6453 6459 novel/novelist
magic_show_words 13723 13735 illusion/illusionist
architecture_styles 6595 13928 brutalism/brutalist
ancient_civilizations 6647 6648 hieroglyphs/hieroglyphics
ancient_egypt 6647 6648 hieroglyphs/hieroglyphics
egyptian_symbols 53953 53954 hieroglyph/hieroglyphic
roman_army 54007 20384 century/centurion
feudal_ranks 20764 20763 marquis/marquess
war_words 4390 4374 troops/trooper
ancient_writing 6647 6648 hieroglyphs/hieroglyphics
mythology 4275 6913 god/goddess
fantasy 6994 7029 sorcerer/sorceress
wizard_words 22405 6994 sorcery/sorcerer
wizard_words 22416 6995 enchant/enchantment
wizard_words 7031 22404 mage/magic
wizard_words 62047 62051 thaumaturge/thaumaturgy
chemistry_words 40426 40424 solute/solution
plastics 29575 39006 plexiglas/plexiglass
magnet_words 40727 40618 magnet/magnetism
magnet_words 40733 40748 electromagnet/electromagnetic
nuclear_words 40839 40813 radioactive/radioactivity
biology_words 40871 40863 organ/organism
classification_words 40872 41007 taxonomy/taxonomist
evolution_words 10100 1614 extinct/extinction
math_operations 41604 41611 subtract/subtraction
measurement 7215 7218 precise/precision
measurement 7228 7242 calibrate/calibration
coding_words 7290 4079 code/coder
coding_words 42298 7322 compile/compiler
cybersecurity_words 33044 33656 hacker/hacking
alphabets_and_writing 6647 6648 hieroglyphs/hieroglyphics
tenses 26369 26378 imperfect/imperfective
tenses 26370 26377 perfect/perfective
pronouns 26410 26445 they/thee
pronouns 27845 26433 thy/this
fire_blank 25231 55653 firecracker/firecrackers
star_blank 66651 66657 stargaze/stargazer
back_blank 42996 66722 backhand/backhanded
foot_blank 66725 1959 foothill/foothills
moon_blank 31579 66863 moonlight/moonlighting
sand_blank 9155 66907 sandfly/sandfish
sand_blank 66528 66911 sandbag/sandbagger
hidden_birds 10363 56035 prowl/prowler
hidden_vehicles 28703 28058 busy/business
reversible_words 28783 29041 live/lived
double_letters 29054 26322 possess/possessive
double_letters 29050 29069 bookkeeper/bookkeeping
double_letters 29052 29063 success/succeed
no_vowels 19889 29083 dry/dryly
no_vowels 29071 29082 shy/shyly
no_vowels 29072 29094 sly/slyly
ough_words 14801 29195 rough/roughly
silent_k_words 28553 39123 knob/knobbly
silent_w_words 25224 56062 wrap/wrapper
silent_g_words 7019 56079 gnome/gnomic
starts_with_a_body_part 29227 6644 legal/legion
starts_with_a_body_part 28630 7271 browse/browser
starts_with_a_body_part 20760 28112 earl/early
starts_with_a_number 29268 29265 tension/tenement
starts_with_bus 28703 10255 busy/business
starts_with_tea 32718 32705 teary/tearful
starts_with_arc 20733 57590 archer/archive
words_from_french 29275 971 cuisine/cuisinier
food_and_dining_words 29275 971 cuisine/cuisinier
short_forms_of_names 28013 29810 peg/peggy
shades_of_black 38725 7718 ebon/ebony
words_for_small 39272 39281 teeny/teensy
words_for_good 27289 39340 spiffy/spiffing
words_for_pretty 39444 39445 beautiful/beauteous
fire_words 39903 39911 combust/combustion
words_for_cold 19893 2026 chill/chilly
words_for_dark 40074 40049 murk/murky
words_for_dark 40057 40070 shady/shaded
orange_things 216 40139 tiger/tigerlily
things_that_pop 966 39566 bubbly/bubble
burger_toppings 19289 19053 onion ring/onion rings
`;

// Decisions for pairs that are not simply "group" (or already grouped, or in a wordplay/compound theme). Key: "theme a/b" as in PAIRS.
// [outcome, '?' for a judgement call Simon should look at, reason]
const D = new Map(Object.entries({
  'wine_words cork/corked': ['group', '?', 'the stopper and the wine fault it causes: different words, but cork in the level gives corked away'],
  'wine_words finish/fining': ['nf', '', 'finish is not from fine'],
  'big_cats lion/lioness': ['group', '', 'male/female, but big cats is not about the female forms'],
  'baby_animals pup/puppy': ['group', '', 'pet-name form: a different word'],
  'forestry_words log/logger': ['group', '?', 'log joins the logger group (woodcutter, lumberjack, feller): log then never meets those in a level anywhere'],
  'sailing_words knot/knots': ['group', '?', 'different senses (the knot tied, knots of speed): not one entry'],
  'special_vehicles tank/tanker': ['group', '?', 'military tank vs tanker truck; merges two groups'],
  'sleep bed/bedding': ['group', '?', 'bed joins (bedclothes, bedding)'],
  'sleep sleepy/sleeplessness': ['keep', '?', 'opposite senses; both are in groups already, so a group would join (sleepy, drowsy, somnolent) with (insomnia, sleeplessness) for every level'],
  'sleep_words sleepy/sleeplessness': ['keep', '?', 'as in sleep'],
  'sun_care shade/shades': ['group', '?', 'shade [sun] vs shades = sunglasses: different senses, so a group, not a form; shade joins (sunglasses, shades)'],
  'terms_of_endearment pet/petal': ['nf', '?', 'petal is the flower word used as endearment, not a form of pet'],
  'words_for_grandparents nan/nanny': ['group', '', 'nanny [grandmother] joins the grandmother group'],
  'royal_titles baron/baroness': ['keep', '', 'male/female title pair in a titles theme'],
  'royal_titles prince/princess': ['keep', '', 'male/female title pair in a titles theme'],
  'royal_titles count/countess': ['keep', '', 'male/female title pair in a titles theme'],
  'ranks_of_the_british_peerage baron/baroness': ['keep', '', 'male/female title pair in a titles theme'],
  'ranks_of_the_british_peerage viscount/viscountess': ['keep', '', 'male/female title pair in a titles theme'],
  'government_words policy/polity': ['nf', '', ''],
  'law_and_order law/lawyer': ['group', '?', 'law joins (lawyer, counsel)'],
  'prison_words prison/prisoner': ['unlink', '*', 'Simon: prisoner leaves prison words (no merge of the prison group with the inmate group); inmate and convict stay', 33709],
  'prison_words jail/jailer': ['unlink', '*', 'Simon: jailer leaves prison words (no merge with the prison group); prison guard stays', 64106],
  'punishments ban/banishment': ['nf', '?', 'banishment is from banish, not ban (they look alike)'],
  'wrongdoers felon/felony': ['group', '', 'felony is a crime, not a wrongdoer: its link here may be worth a look'],
  'money_slang buck/bucks': ['unlink', '?', 'buck [male animal] is linked in money slang (wrong sense) beside bucks [dollars]; the animal entry loses the link (it keeps male animals). Alternative: a new buck [dollar] root with bucks as its form'],
  'military marines/mariner': ['unlink', '*', 'Simon: mariner leaves military; marines is not added to the sailor group', 4382],
  'navy_words marines/mariner': ['unlink', '*', 'Simon: mariner leaves navy words, as in military', 4382],
  'naval_people marines/mariner': ['unlink', '*', 'Simon: mariner leaves naval people, as in military', 4382],
  'service_members marines/mariner': ['unlink', '*', 'Simon: mariner leaves service members, as in military', 4382],
  'military troops/trooper': ['unlink', '*', 'Simon: trooper leaves military (no merge of (troops, forces) with the soldier group)', 4374],
  'war_words troops/trooper': ['unlink', '*', 'Simon: trooper leaves war words, as in military', 4374],
  'military_units battery/battalion': ['nf', '', ''],
  'stationery stapler/staples': ['group', '?', 'tool and what it holds: different things, but one gives the other away'],
  'university_words bursar/bursary': ['group', '?', 'the officer and the grant; bursar joins (scholarship, bursary)'],
  'scarves_and_gloves mitt/mitts': ['group', '?', 'mitt [baseball] vs mitts = mittens: different senses, so a group, not a form; mitt joins (mittens, mitts)'],
  'containers can/canister': ['nf', '', ''],
  'things_with_lids can/canister': ['nf', '', ''],
  'racket_and_target_sports bowls/bowling': ['group', '?', 'two different sports (lawn bowls, ten-pin bowling)'],
  'games_of_chance poker/pokies': ['nf', '', ''],
  'casino_games poker/pokies': ['nf', '', ''],
  'woodworking_words joint/jointer': ['group', '?', 'jointer is the tool (plane) for joints'],
  'music_terms tone/tonic': ['nf', '', ''],
  'roman_army century/centurion': ['nf', '', ''],
  'mythology god/goddess': ['group', '', 'male/female, but mythology is not about the forms; goddess joins (god, deity)'],
  'fantasy sorcerer/sorceress': ['group', '', 'male/female, but fantasy is not about the forms; merges two groups'],
  'wizard_words sorcery/sorcerer': ['group', '?', 'merges (magic, sorcery) with (wizard, sorcerer, mage)'],
  'wizard_words mage/magic': ['group', '', 'the same merge as sorcery/sorcerer'],
  'chemistry_words solute/solution': ['nf', '', ''],
  'biology_words organ/organism': ['nf', '', ''],
  'coding_words code/coder': ['group', '?', 'merges (code, source code) with (programmer, coder, developer)'],
  'tenses imperfect/imperfective': ['group', '?', 'tense vs aspect term: different words, one gives the other away'],
  'tenses perfect/perfective': ['group', '?', 'tense vs aspect term: different words, one gives the other away'],
  'pronouns they/thee': ['nf', '', ''],
  'pronouns thy/this': ['nf', '', ''],
  'sand_blank sandfly/sandfish': ['nf', '', ''],
  'hidden_vehicles busy/business': ['nf', '', 'as listed (no change either way: wordplay theme)'],
  'starts_with_bus busy/business': ['nf', '', 'as listed (no change either way: wordplay theme)'],
  'starts_with_a_body_part legal/legion': ['nf', '', ''],
  'starts_with_a_body_part earl/early': ['nf', '', ''],
  'starts_with_a_number tension/tenement': ['nf', '', ''],
  'starts_with_arc archer/archive': ['nf', '', ''],
  'silent_g_words gnome/gnomic': ['nf', '', 'gnomic is from Greek gnome (maxim), not the fantasy gnome'],
  'short_forms_of_names peg/peggy': ['group', '?', 'the theme collects the short forms themselves (both are Margaret); a group only keeps them out of one level'],
  'things_that_pop bubbly/bubble': ['keep', '?', 'bubbly = champagne vs an air bubble; both in groups, so a group would join (champagne, bubbly, fizz) with (bubble, soap bubble) everywhere'],
  'orange_things tiger/tigerlily': ['nf', '', ''],
  'burger_toppings onion ring/onion rings': ['form', '?', 'one food; the plural is the root (it has all 6 links and is the name people use), onion ring becomes its form alias and drops its own burger toppings link (same typicality 3 on the root), so the theme still shows "onion rings"'],
}));

const PAIR = PAIRS.trim().split('\n').map(l => { const [t, a, b, ...w] = l.trim().split(' '); return { t, a: +a, b: +b, w: w.join(' '), key: t + ' ' + w.join(' ') }; });
for (const k of D.keys()) if (!PAIR.some(p => p.key === k)) throw Error('decision for no pair: ' + k);
// state before any change, for the review
const grpOf = (t, id) => (t.groups || []).find(g => g.includes(id));
const pre = new Map(PAIR.map(p => { const t = TH(p.t); const ga = grpOf(t, p.a); return [p.key, !!ga && ga.includes(p.b)]; }));
const lines = [], cnt = {};
const tally = k => { cnt[k] = (cnt[k] || 0) + 1; };

// group a and b in theme t: new group, add one to the other's group, or merge the two groups; returns what was done (null if nothing)
function groupPair(t, a, b) {
  for (const id of [a, b]) { const e = E(id); if (e.aliasOf || e.typ[t.id] === undefined) throw Error(`${lab(e)} is not a root linked in ${t.id}`); }
  const ga = grpOf(t, a), gb = grpOf(t, b);
  if (ga && ga === gb) return null;
  t.groups ||= [];
  if (!ga && !gb) { t.groups.push([a, b]); return { kind: 'new group', g: [a, b] }; }
  if (ga && gb) { const was = `${gtxt(ga)} + ${gtxt(gb)}`; ga.push(...gb); t.groups.splice(t.groups.indexOf(gb), 1); return { kind: 'two groups merged', was, g: ga }; }
  const g = ga || gb, add = ga ? b : a, was = gtxt(g); g.push(add); return { kind: 'added to a group', was, g };
}
// alias `aid` becomes the form alias of root `rid`: same id; its own links go (the root keeps or takes them at the same typicality)
function formAlias(t, aid, rid) {
  const a = E(aid), r = E(rid);
  if (a.aliasOf === rid && a.aliasKind === 'form' && !Object.keys(a.typ).length) return null;
  if (a.aliasOf || r.aliasOf) throw Error(`form ${aid}/${rid}: one is an alias already, check by hand`);
  if ((P.ix.aliases.get(aid) || []).length) throw Error(`form ${aid}: has aliases, re-point them by hand`);
  if (P.entries.some(x => x.use && Object.values(x.use).includes(aid))) throw Error(`form ${aid}: a use points at it`);
  if (P.themes.some(th => grpOf(th, aid))) throw Error(`form ${aid}: in a group, check by hand`);
  if (Object.keys(a.use || {}).length || Object.keys(a.show || {}).length || a.nameOkIn?.length) throw Error(`form ${aid}: has use/show/nameOkIn, check by hand`);
  const did = [];
  for (const [tid, v] of Object.entries(a.typ)) {
    if (r.typ[tid] === undefined) { r.typ[tid] = v; if (r.text !== a.text) { r.use ||= {}; r.use[tid] = aid; } did.push(`${tid}: link moved to the root at typicality ${v}${r.use?.[tid] === aid ? ', the root shows the form there (use)' : ''}`); }
    else did.push(`${tid}: own link (typicality ${v}) dropped, the root's stays (typicality ${r.typ[tid]})`);
  }
  Object.assign(a, { typ: {}, show: {}, use: {}, nameOkIn: [], aliasOf: rid, aliasKind: 'form' });
  reindex(P);
  return did;
}
function unlink(t, id) {   // the theme-local cleanup of the app (unlinkEntry: shown text, use, name allowance, group places)
  const e = E(id); if (e.typ[t.id] === undefined) return null;
  const v = e.typ[t.id], g = grpOf(t, id), was = g ? gtxt(g) : '';
  unlinkEntry(P, e, t.id); reindex(P);
  const rest = g ? g.filter(y => y !== id) : [], g2 = rest.length && (t.groups || []).find(x => x.includes(rest[0]));
  return { v, grp: was ? `${was} -> ${g2 ? gtxt(g2) : 'group gone (fewer than 2 left)'}` : '' };
}

for (const p of PAIR) {
  const t = TH(p.t), A = E(p.a), B = E(p.b), base = `${p.t}: ${lab(A)} / ${lab(B)}`;
  let [out, q, why] = D.get(p.key) || [themeLocked(P, t) && ['wordplay', 'compound'].includes(t.tkind) ? 'wordplay' : 'group', '', ''];
  if (pre.get(p.key)) out = 'grouped';
  if (out !== 'grouped' && out !== 'nf' && themeLocked(P, t) && ['wordplay', 'compound'].includes(t.tkind)) out = 'wordplay';
  let res = '';
  if (out === 'group') {
    const r = groupPair(t, p.a, p.b);
    if (r) { n++; res = r.kind + (r.was ? ` ${r.was}` : '') + ` -> ${gtxt(r.g)} (${r.g.length} of ${(P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf).length} roots)`; log.push(`${base}: ${res}`); tally(r.kind); }
    else { res = 'already in one group (made by a line above)'; tally('group made above'); }
  } else if (out === 'form') {
    const did = formAlias(t, p.a, p.b);
    if (did) { n++; res = `${lab(A)} becomes the form alias of ${lab(B)}; ${did.join('; ')}`; log.push(`${base}: ${res}`); }
    else res = 'form alias (done)';
    tally('form alias');
  } else if (out === 'unlink') {
    const X = E(D.get(p.key)[3] || p.a), r = unlink(t, X.id);
    if (r) { n++; res = `${lab(X)} loses its ${p.t} link (typicality ${r.v})${r.grp ? '; its group ' + r.grp : ''}`; log.push(`${base}: ${res}`); } else res = `${lab(X)} unlinked (done)`;
    tally(X.id === p.a && p.t === 'money_slang' ? 'wrong-sense link dropped' : 'unlinked (Simon)');
  } else tally({ wordplay: 'keep apart (wordplay)', keep: 'keep apart (other)', nf: 'not a family', grouped: 'already grouped' }[out]);
  const label = { group: res.startsWith('already') ? 'group (joins the group above)' : res.split(' (')[0].split(' ->')[0], form: 'form alias', unlink: res, wordplay: 'keep apart (wordplay)', keep: 'keep apart', nf: 'not a family', grouped: 'already grouped' }[out];
  lines.push(`${q === '*' ? '*' : ' '} ${p.t}: ${A.text} / ${B.text} (${p.a} / ${p.b}): ${out === 'group' ? res : label}${why ? ' -- ' + why : ''}`);
}
reindex(P);
// entries left with no theme at all (own links, or the root's for an alias, counting the family): reported, never deleted here
const orphans = [...new Set(PAIR.flatMap(p => [p.a, p.b, ...(D.get(p.key)?.[3] ? [D.get(p.key)[3]] : [])]))].map(E).filter(e => { const r = e.aliasOf ? E(e.aliasOf) : e; return ![r, ...(P.ix.aliases.get(r.id) || [])].some(x => linkIds(P, x).length); });
const [after, mAfter] = count(), expAfter = expIds();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const shift = expBefore.text.length !== expAfter.text.length ? `entry count ${expBefore.text.length} -> ${expAfter.text.length}` : (() => { const i = expBefore.text.findIndex((x, j) => x !== expAfter.text[j]); return i < 0 ? 0 : `first at index ${i} (${expBefore.text[i]} -> ${expAfter.text[i]})`; })();
console.log(`${PAIR.length} pairs; outcomes: ${JSON.stringify(cnt)}\n\n${log.join('\n') || 'no changes'}`
  + `\n\nEntries left with no theme (not deleted): ${orphans.map(lab).join(', ') || 'none'}`
  + `\n\nExport (family preset) index shifts: ${shift || 0}; words with a clash id ${expBefore.clash} -> ${expAfter.clash}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}\n\n${n} changes`);
if (REVIEW) {
  const order = ['form alias', 'wrong-sense link dropped', 'unlinked (Simon)', 'new group', 'added to a group', 'two groups merged', 'group made above', 'keep apart (wordplay)', 'keep apart (other)', 'not a family', 'already grouped'];
  const head = [`Library batch v398: word-family pairs in one theme (tools/gen/batch398.mjs, from tools/gen/famscan.mjs on v397 plus onion ring/onion rings).`,
    `Approved by Simon 2026-11-19, with three changes marked "*": prisoner and jailer leave prison words, trooper leaves military and war words, mariner leaves military, navy words,`,
    `naval people and service members (instead of merging groups). Every other proposed call, the buck link drop and the onion ring form alias as proposed.`,
    `Groups: the export gives every group member one clash id, so two words of one group never meet in one level of ANY theme.`,
    `Export index shifts: ${shift || 0}. Checks after: ${diff.join(', ') || 'no change in check counts'}.`, '',
    `${PAIR.length} pairs:`, ...order.filter(k => cnt[k]).map(k => `  ${String(cnt[k]).padStart(3)}  ${k}`), `  changed by Simon ("*"): ${lines.filter(l => l[0] === '*').length}`, ''];
  fs.writeFileSync(REVIEW, head.join('\n') + '\n' + lines.join('\n') + '\n');
  console.log('review written to ' + REVIEW);
}
if ((APPLY || OUT) && n) {
  if (nw.length) throw Error('new issues, not written');
  stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P));
  console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified);
}

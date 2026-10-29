// Generated word data: Places & Geography, chunk 5 (everyday places, workplaces, places to visit, buildings, shops).
// Format is described in tools/apply-words.mjs. Compact rows: "text/rec/inRec/gloss" separated by ';'.
const W = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, g] = x.split('/');
  return g ? [t, +r, +i, { g }] : [t, +r, +i];
});

export const THEMES = {
  bakery: { d: 1 }, hair_salon: { d: 2 }, street_market: { d: 3 }, park: { d: 1 }, shopping_mall: { d: 2 },
  hospital: { d: 1 }, fire_station: { d: 2 }, police_station: { d: 2 }, office: { d: 2 }, factory: { d: 2 }, construction_site: { d: 2 },
  vet_clinic: { d: 2 }, dentist_s_office: { d: 2 },
  zoo: { d: 1 }, beach: { d: 1 }, airport: { d: 1 }, museum: { d: 2 }, art_gallery: { d: 3 }, aquarium: { d: 2 }, movie_theater: { d: 1 },
  swimming_pool: { d: 1 }, ski_resort: { d: 3 }, water_park: { d: 2 },
  buildings_to_live_in: { d: 1 }, traditional_dwellings: { d: 5 }, religious_buildings: { d: 2 }, public_buildings: { d: 3 },
  farm_buildings: { d: 3 }, industrial_buildings: { d: 4 }, shops: { d: 1 },
};

export const DATA = {
  bakery: W(`bread/1/1; cake/1/2; croissant/1/1; baguette/2/1; muffin/1/2; doughnut/1/2; cookie/1/3; pie/1/3; loaf/1/2; bagel/1/2; pastry/2/2; scone/2/3;
    eclair/3/3; sourdough/2/2; brioche/3/3; cupcake/1/2; danish pastry/3/3; flour/1/4; oven/1/4; baker/1/1; bread roll/1/2; pretzel/2/3; ciabatta/3/3;
    focaccia/3/4; strudel/4/4; cinnamon roll/2/3; apple turnover/3/3; rye bread/2/3; display case/2/4; rolling pin/2/4; cooling rack/3/4; baking tray/2/4;
    cheesecake/1/3; macaron/3/3; profiterole/4/4; panettone/4/4`),
  hair_salon: W(`haircut/1/1; shampoo/1/1; scissors/1/2; comb/1/1; hair dryer/1/1; mirror/1/3; salon chair/2/2; hair dye/1/2; conditioner/1/2/hair; curlers/2/2;
    straighteners/3/2; hairspray/1/2; hairbrush/1/2; trim/1/3; perm/2/2; highlights/2/2; blow dry/2/2; stylist/1/1; hairdresser/1/1; cutting cape/3/3;
    clippers/2/3; hair gel/1/3; foils/4/4; shampoo basin/3/4; balayage/4/4; hair extensions/3/3; layers/2/4; undercut/3/4; pomade/3/4; toner/4/4/hair; relaxer/5/5;
    rollers/2/3; hair bleach/2/3; hairpin/2/4; barber/1/2; colourist/4/3`),
  street_market: W(`stall/1/1/market; vendor/2/2; haggling/2/2; crowd/1/3; fruit stand/2/2; awning/3/3; produce/2/2; market stall/1/1; bargain/1/3; cash box/3/3; scales/2/3;
    basket/1/3; crates/2/3; tarpaulin/3/4; flea market/1/2; trader/2/2; farmers market/2/2; souvenirs/2/3; street food/1/2; bric-a-brac/3/3; antiques/2/3;
    barrow/3/4/cart; costermonger/5/4; hawker/4/3; bazaar/3/2; souk/4/3; price tag/2/3; stallholder/3/2; knick-knacks/3/4; trestle table/3/4; cobblestones/3/5; spices/2/3`),
  park: W(`bench/1/1; swing/1/1/playground; slide/1/1/playground; playground/1/1; pond/1/2; fountain/1/2; path/1/3/garden; lawn/1/2; duck/1/3; picnic/1/1; tree/1/3; jogger/2/3; dog walker/2/2;
    seesaw/2/1; sandbox/2/2; bandstand/3/3; gazebo/3/3; flower bed/2/3; skate park/2/2; monkey bars/2/2; climbing frame/2/2; picnic table/2/2; litter bin/2/4;
    statue/2/4; boating lake/3/3; pavilion/3/4; kite/1/3/toy; frisbee/1/2; sundial/4/4; pergola/4/4; bowling green/3/3; footbridge/3/4; park ranger/2/3; hedge/2/4`),
  shopping_mall: W(`escalator/1/1; food court/1/1; store/1/1; anchor store/4/3; parking lot/1/3; fountain/1/4; directory/3/3; atrium/3/2/building; kiosk/3/2; department store/1/2;
    boutique/2/2; shopping cart/1/3; shopping bag/1/2; gift shop/1/3; elevator/1/3; concourse/4/3; customer service/2/4; arcade/2/3/games; skylight/3/4; storefront/2/2;
    shop window/2/3; mannequin/2/3; sale sign/2/3; changing room/2/3; information desk/2/3; cart vendor/4/4; shoppers/1/2; security guard/2/4; pretzel stand/3/3; multiplex/4/4`),
  hospital: W(`doctor/1/1; nurse/1/1; ward/2/2; ambulance/1/2; stretcher/2/2; surgeon/1/2; patient/1/2/medical; operating room/2/2; waiting room/1/3; x-ray/1/2; bandage/1/3;
    syringe/1/3; hospital bed/1/1; wheelchair/1/2; stethoscope/1/3; emergency room/1/1; scrubs/2/2/medical clothing; IV drip/2/2; defibrillator/3/3; intensive care/3/2;
    maternity ward/3/2; radiologist/3/3; anesthesiologist/4/3; triage/3/2; gurney/3/3; pharmacy/1/3; paramedic/2/3; orderly/3/3; consultant/3/4; registrar/4/4;
    phlebotomist/5/3; bedpan/3/3; crash cart/3/3; ventilator/3/3; catheter/4/3`),
  fire_station: W(`fire truck/1/1; firefighter/1/1; hose/1/1; helmet/1/3; siren/1/3/alarm; ladder/1/2; fire hydrant/1/3; fire pole/2/1; dalmatian/1/3; axe/1/3; alarm/1/3;
    fire extinguisher/1/3; turnout gear/4/2; breathing apparatus/4/3; fire chief/2/2; fire bell/3/2; dispatcher/3/3; engine bay/4/3; fire hose/1/1; aerial ladder/4/3;
    fire boots/3/3; smoke detector/2/4; fire blanket/3/4; fire drill/1/4; crew/2/3; bunk room/4/3; lieutenant/3/3; fire marshal/3/3; rescue boat/3/3`),
  police_station: W(`officer/1/1; handcuffs/1/1; badge/1/2/police; police car/1/2; uniform/1/3; detective/1/2; interview room/3/2; front desk/3/3; holding cell/3/1; fingerprints/2/2;
    mugshot/2/2; evidence/2/3; evidence locker/4/2; patrol car/2/2; desk sergeant/3/2; sergeant/2/2; inspector/3/3; constable/3/3; custody sergeant/4/3;
    police lineup/3/2; case file/2/3; walkie-talkie/2/3; baton/2/3; whistle/1/4/handheld; interrogation/3/2; bail/3/3/court; booking/4/2; warrant/3/3; arrest/1/3; lockup/3/2; dispatch/3/3; police radio/2/3`),
  office: W(`desk/1/1; computer/1/1; printer/1/1; stapler/1/1; filing cabinet/1/1; photocopier/3/1; telephone/1/2; water cooler/2/1; cubicle/2/1; meeting room/2/2; boss/1/3;
    manager/1/3; office chair/1/1; swivel chair/2/2; paper clip/1/1; sticky note/2/2; whiteboard/1/2; projector/2/3; inbox/2/3; hole punch/2/2; desk lamp/1/2;
    lanyard/3/3; conference call/2/3; spreadsheet/2/3; email/1/3; break room/2/2; coffee machine/1/3; receptionist/2/2; reception desk/2/2; swipe card/3/3; shredder/3/2;
    memo/3/3; colleague/2/3; desk tidy/4/3; lever arch file/4/3; fax machine/2/2; ring binder/2/2; mouse mat/3/3`),
  factory: W(`assembly line/1/1; conveyor belt/1/1; machine/1/2; worker/1/2; robot/1/2; hard hat/1/3; forklift/2/2; pallet/3/2; chimney/1/3; smokestack/3/2; foreman/3/2;
    shift/2/3; production line/2/1; crane/2/3/machine; mass production/3/2; boiler/3/3; warehouse/1/3; time clock/4/3; punch card/4/3; overalls/2/3; welding/2/3; lathe/4/3;
    hopper/4/4; quality control/2/3; shop floor/3/2; ear defenders/3/3; furnace/2/3; gantry/4/4; machinist/4/3; trade union/2/4; steel press/3/3; packing line/3/2`),
  construction_site: W(`crane/1/1/machine; bulldozer/1/1; hard hat/1/1; scaffolding/2/1; cement mixer/2/1; excavator/1/1; digger/1/1/machine; dump truck/1/1; wheelbarrow/1/2; shovel/1/2;
    bricklayer/2/2; brick/1/2; cement/2/2; concrete/1/2; girder/2/2; steel beam/2/2; hammer/1/3; drill/1/3/tool; jackhammer/2/2; high-visibility vest/2/2; safety goggles/2/3;
    blueprints/2/3; foreman/3/2; traffic cone/1/3; tower crane/3/1; plumb line/4/4; spirit level/3/4; trowel/3/3; rebar/4/3/steel bar; formwork/5/3; backhoe/3/2; pile driver/4/3/machine;
    steamroller/2/2; site manager/3/3; mortar/3/3; plank/2/4; surveyor/3/4; theodolite/5/5; cherry picker/3/3; builder/1/2`),
  vet_clinic: W(`vet/1/1/animal; cat/1/3; dog/1/3; cat carrier/2/2; leash/1/3; vaccination/2/2; examination table/2/2; stethoscope/1/3; thermometer/1/3; treat/1/3/dog treat; cone of shame/3/2;
    microchip/3/2; x-ray/1/3; syringe/1/3; waiting room/1/3; flea treatment/3/2; worming tablets/4/3; neutering/3/3; spay/4/3; rabies shot/3/2; veterinary nurse/3/2; cage/2/3;
    hamster/1/4; parrot/1/4; muzzle/3/3; stitches/2/3; bandage/1/4; check-up/1/3; pet insurance/3/4; otoscope/5/3; heartworm/4/3; booster/3/4/vaccine`),
  dentist_s_office: W(`dentist/1/1; drill/1/1/tool; toothbrush/1/2; dental chair/1/1; floss/1/2/dental; filling/1/1; cavity/1/1; x-ray/1/3; mouthwash/1/2; toothpaste/1/2; braces/1/2/dental; hygienist/2/1;
    dental mirror/2/1; suction tube/3/2; mouth guard/2/3; plaque/2/2; tartar/3/2; scale and polish/4/2; root canal/2/1; extraction/3/2; local anesthetic/3/3; fluoride/3/2;
    veneer/4/3; gum disease/3/2; molar/2/2; wisdom tooth/2/2; retainer/3/3; dentures/2/2; orthodontist/3/2; tooth decay/1/1; dental lamp/3/2; bite wing/5/3; scaler/4/3; amalgam/4/3`),
  zoo: W(`lion/1/2; elephant/1/2; giraffe/1/2; monkey/1/2; penguin/1/2; zookeeper/1/1; cage/1/3; enclosure/2/1; petting zoo/2/1; tiger/1/2; zebra/1/2; reptile house/3/1; aviary/3/2;
    gift shop/1/3; ticket/1/3/admission; feeding time/2/2; hippopotamus/1/2; panda/1/2; gorilla/1/2; polar bear/1/2; sea lion/2/2; meerkat/2/2; flamingo/2/2; otter/2/3; tapir/4/3;
    okapi/4/3; red panda/3/3; lemur/3/3; orangutan/2/2; komodo dragon/3/3; habitat/2/3; safari park/2/2; animal keeper/2/1; snake house/3/1; guided tour/2/4; terrarium/3/3;
    primate house/4/2; capybara/3/3; binturong/5/3; pangolin/4/3`),
  beach: W(`sand/1/1/sediment; wave/1/1; seashell/1/1; sunscreen/1/2; towel/1/2; umbrella/1/2; bucket/1/2; spade/1/2; sandcastle/1/1; surfboard/1/2; lifeguard/1/1; seagull/1/2; swimsuit/1/2;
    flip-flops/1/2; sunbathing/1/1; beach ball/1/1; deckchair/3/2; sun lounger/3/2; pier/2/2; dune/2/2; rock pool/3/2; tide/2/2; shore/2/2; seaweed/1/2; crab/1/3; boardwalk/2/3;
    beach hut/2/2; windbreak/3/2; driftwood/3/2; groyne/5/3; shingle/4/3; sandbar/4/3; undertow/4/3; rip current/4/3; snorkel/2/3; bodyboard/3/2; sarong/3/3; pebbles/2/3; cove/3/3; breakers/3/3`),
  airport: W(`airplane/1/1; runway/1/1; terminal/1/1; pilot/1/1/aircraft; passport/1/1; luggage/1/1; suitcase/1/1; boarding pass/1/1; control tower/1/1; departure lounge/2/1; check-in desk/2/1;
    security check/2/1; baggage claim/2/1; carousel/3/2/baggage; customs/2/1; duty free/2/1; gate/1/1/airport; flight attendant/1/1; hangar/3/2; air traffic control/3/2; jetway/4/2;
    boarding gate/2/1; tarmac/2/2; windsock/4/3; baggage handler/3/2; x-ray scanner/3/2; metal detector/2/2; taxiway/4/2; immigration/2/2/airport; departures board/2/1; layover/2/3;
    helipad/3/3; pushback/5/3; ground crew/3/2; trolley/2/3/luggage; visa/2/4; airline/1/3; jumbo jet/2/2; turbulence/2/4; red-eye/3/4/flight`),
  museum: W(`exhibit/1/1; artifact/2/1; display case/2/1; curator/2/1; gallery/1/2/art; tour guide/1/1; dinosaur/1/2; skeleton/1/3/body; mummy/1/3/Egyptian; statue/1/3; gift shop/1/3; ticket/1/3/admission;
    audio guide/2/2; fossil/1/2; plaque/2/3; velvet rope/3/2; ancient coin/2/3; stuffed animal/2/3; taxidermy/3/3; replica/3/2; diorama/3/2; relic/3/3; antiquity/4/3;
    sarcophagus/4/3; vitrine/5/2; archive/3/3; exhibition/2/1; collection/2/2; docent/4/2; conservator/5/2; provenance/5/3; pottery/2/3; armor/2/3; tapestry/3/4; amphora/4/4; totem pole/3/4`),
  art_gallery: W(`painting/1/1; canvas/1/2; frame/1/2/picture; sculpture/1/2; portrait/1/2; landscape/1/3; easel/2/2; artist/1/2; exhibition/2/2; gallery wall/3/2; curator/2/2; oil painting/1/2;
    watercolor/2/3; still life/2/2; abstract/2/3/art; modern art/1/2; mural/2/3; art critic/3/2; private view/4/2; vernissage/5/2; gilded frame/3/3; installation/3/2/art; art dealer/3/2;
    spotlight/2/4; brushstroke/3/3; self-portrait/2/3; lithograph/4/3; triptych/5/3; pastel/3/4/art; charcoal/2/4/drawing; sketch/1/3; palette/2/4; impressionism/3/3; fresco/4/3; collage/2/3;
    etching/4/3; gallery owner/3/2; auction/2/4; plinth/4/3; wall label/3/3`),
  aquarium: W(`fish/1/1; tank/1/1/fish tank; shark/1/1; jellyfish/1/1; dolphin/1/2; sea turtle/1/2; octopus/1/2; starfish/1/2; seahorse/1/2; touch pool/3/1; stingray/2/2; clownfish/2/2;
    coral/1/2/marine animal; glass tunnel/3/2; penguin/1/3; sea otter/2/3; moray eel/3/3; eel/2/3; sea anemone/3/2; seal/1/3/animal; whale shark/3/2; manta ray/3/2; lionfish/3/3; pufferfish/3/3;
    angelfish/3/3; piranha/2/3; cuttlefish/3/3; sea urchin/3/3; feeding show/3/2; diver/1/3; kelp forest/3/2; axolotl/3/4; nautilus/4/3; wrasse/5/4; grouper/3/3; sea dragon/4/3;
    plankton/3/4; aquarist/5/2`),
  movie_theater: W(`popcorn/1/1; screen/1/1/film; seat/1/1; ticket/1/1/admission; projector/2/2; 3D glasses/1/2; trailer/1/2/film; ticket booth/2/1; concession stand/3/1; soda/1/3; nachos/2/2; usher/2/1;
    box office/2/1; aisle/2/2; cup holder/2/2; reclining seat/3/2; popcorn bucket/2/1; film reel/3/2; surround sound/3/2; red carpet/2/3; front row/2/3; back row/2/3;
    double feature/3/2; matinee/3/2; premiere/3/3; lobby/2/3/building; movie poster/1/2; candy/1/3; intermission/3/2; projectionist/4/2; sneak preview/4/3; blockbuster/2/3`),
  swimming_pool: W(`water/1/1; diving board/1/1; lifeguard/1/1; goggles/1/1; swimsuit/1/1; swim cap/1/1; lane divider/3/1; ladder/1/3; pool noodle/2/1; armbands/2/2; kickboard/2/1;
    changing room/2/2; shallow end/2/1; deep end/1/1; chlorine/2/2; pool party/2/3; diving block/3/2; water slide/1/3; whistle/1/4/handheld; swimming lesson/2/2; paddling pool/2/3;
    wave pool/2/3; backstroke/2/2; breaststroke/2/2; front crawl/2/2; freestyle/2/3; lap/2/3/swimming; towel/1/3; locker/2/3; flippers/1/3; pool filter/3/3; pool cover/3/3;
    tread water/3/3; inflatable ring/2/3; snorkel/2/4; jacuzzi/2/4; swim trunks/1/2`),
  ski_resort: W(`ski/1/1; snowboard/1/1; ski lift/1/1; chairlift/2/1; gondola/2/2/ski lift; slope/1/1; piste/3/1; ski pole/1/1; ski boots/1/1; goggles/1/2; helmet/1/3; snow/1/2; apres-ski/3/2;
    ski instructor/2/1; ski pass/2/1; lift pass/3/1; chalet/2/2; lodge/2/3/accommodation; bunny slope/3/1; black run/3/1; mogul/4/2; powder/2/3; avalanche/2/3; cable car/2/2; T-bar/4/2;
    button lift/5/2; ski patrol/3/2; snow cannon/4/2; snowmobile/2/3; fondue/3/4; hot chocolate/1/4; slalom/3/3; off-piste/4/2; snowshoe/3/3; sled/1/4; snow groomer/4/2;
    ski rental/3/2; ski bum/4/2; salopettes/4/3; base layer/3/3; gaiter/4/4`),
  water_park: W(`water slide/1/1; wave pool/2/1; lazy river/2/1; splash pad/3/1; inner tube/2/2; swim trunks/2/3; lifeguard/1/2; kiddie pool/2/1; water cannon/3/2; log flume/3/1; flume/3/1;
    wave machine/3/2; tube slide/3/1; wristband/2/3; sunscreen/1/3; locker/2/3; life jacket/1/2; water gun/1/3; splash zone/3/2; body slide/4/2; speed slide/3/1; cabana/3/3;
    rubber ring/2/2; towel/1/3; sprinkler/2/3; turnstile/3/4; raft/2/2; rapids/3/2; whirlpool/2/3; bathing suit/1/3; water jet/3/3; toddler pool/3/2`),
  buildings_to_live_in: W(`house/1/1; apartment/1/1; mansion/1/1; bungalow/2/1; cottage/2/1; castle/1/2; cabin/1/2; townhouse/2/1; condo/2/1; penthouse/2/1; studio/2/2/apartment; villa/2/2; duplex/3/1;
    terraced house/3/1; semi-detached/3/1; detached house/2/1; tower block/3/2; skyscraper/1/3; mobile home/2/1; caravan/1/3; houseboat/2/2; lodge/3/3/accommodation; chalet/2/2; manor/3/2; palace/1/3;
    log cabin/1/1; tiny house/2/2; maisonette/4/2; brownstone/4/2; row house/3/1; ranch/3/3/house; farmhouse/2/2; bedsit/4/3; loft/3/3/apartment; dormitory/2/3; treehouse/1/3;
    chateau/3/3; homestead/4/3; high-rise/2/2; granny flat/3/2; council house/3/2`),
  traditional_dwellings: W(`igloo/1/1; tepee/3/1; yurt/3/1; longhouse/4/1; hogan/5/1; rondavel/5/1; trullo/5/1; thatched cottage/2/2; hut/1/2/building; log cabin/1/3; wigwam/3/1; adobe/3/2/mud brick; mud hut/2/1;
    stilt house/3/1; pueblo/3/2/dwelling; croft/4/2; roundhouse/4/1; bothy/5/2; chalet/2/3; kraal/5/2; izba/5/2; minka/5/1; tukul/5/2; cave dwelling/3/2; grass hut/2/2;
    wattle and daub/4/3; dugout/3/3; cob house/4/2; earth lodge/5/2; sod house/4/1; shieling/5/2; hacienda/3/3; dacha/3/2; riad/4/3; tulou/5/1; tent/1/3`),
  religious_buildings: W(`church/1/1; cathedral/1/1; mosque/1/1; temple/1/1/building; synagogue/2/1; chapel/1/1; monastery/2/1; abbey/2/1; shrine/2/1; pagoda/2/2; minaret/3/2; convent/3/2; basilica/3/1;
    gurdwara/4/1; mandir/4/1; stupa/4/1; meeting house/3/2; bell tower/2/3; steeple/3/2; kirk/4/2; tabernacle/4/2; ashram/4/3; vihara/5/2; priory/4/2; minster/4/2; oratory/5/2;
    mission/3/3/church; nunnery/3/2; fire temple/5/2; cloister/4/3; kingdom hall/4/2; wat/4/2; gompa/5/2; dagoba/5/3`),
  public_buildings: W(`library/1/1; town hall/1/1; school/1/1; hospital/1/2; post office/1/1; police station/1/2; fire station/1/2; museum/1/2; courthouse/2/1; city hall/2/1; train station/1/2;
    bus station/2/2; community center/2/1; parliament/2/2; capitol/3/2; embassy/3/2; prison/1/3; public toilet/2/3; swimming pool/1/3; art gallery/2/3; stadium/1/3; customs house/4/3;
    registry office/3/2; county hall/4/2; assembly hall/3/3; civic center/3/2; jail/1/3; armory/4/3; barracks/3/3; lighthouse/2/4; law courts/3/2; records office/4/3; sorting office/4/3; capitol building/3/2`),
  farm_buildings: W(`barn/1/1; silo/2/1; stable/1/1/building; henhouse/3/1; pigsty/3/1; farmhouse/1/1; shed/1/2; windmill/2/3; greenhouse/1/3; granary/3/1; cowshed/3/1; dairy/2/2; milking parlor/3/1;
    hayloft/3/1; hay barn/3/1; tractor shed/3/2; dovecote/4/1; oast house/5/2; kennel/2/3; stall/2/3/horse; sheepfold/4/2; outhouse/3/3; corn crib/4/1; root cellar/3/2; smokehouse/4/2;
    cart shed/5/2; pole barn/4/1; bunkhouse/3/3; apiary/4/2; hutch/3/3/rabbit; loose box/5/2; byre/5/1; lambing shed/4/1; feed store/3/2; tithe barn/5/2; poultry house/3/1; coop/2/1`),
  industrial_buildings: W(`factory/1/1; warehouse/1/1; mill/2/2/building; refinery/3/1; silo/2/2; foundry/4/1; power station/2/1; cooling tower/3/1; gasworks/4/2; workshop/2/3; brickworks/4/2; brewery/2/2;
    distillery/3/2; steelworks/3/1; sawmill/3/1; paper mill/3/1; cotton mill/3/1; textile mill/3/1; chemical plant/3/1; shipyard/3/2; tannery/4/2; smelter/4/1; pumping station/4/2;
    waterworks/4/3; depot/3/3; bottling plant/3/1; ironworks/4/1; kiln/4/3; sugar refinery/4/1; glassworks/4/1; hangar/3/3; grain elevator/3/2; assembly plant/3/1; dockyard/4/3`),
  shops: W(`bakery/1/1; butcher/1/1; supermarket/1/1; pharmacy/1/1; bookshop/1/1; florist/1/1; clothing store/1/1; shoe shop/1/1; toy shop/1/1; pet shop/1/1; grocery store/1/1;
    hardware store/1/1; department store/1/1; convenience store/1/1; newsagent/3/1; corner shop/2/1; jeweler/2/1; off-licence/4/2; liquor store/2/1; greengrocer/3/1; fishmonger/3/1;
    charity shop/2/1; thrift store/2/1; antique shop/2/1; deli/2/1; ironmonger/4/2; haberdashery/5/2; milliner/5/2; chemist/2/1/shop; gift shop/1/1; sweet shop/2/1; candy store/2/1;
    record store/2/1; tobacconist/4/2; stationer/4/2; cobbler/4/3; optician/2/3; bike shop/2/1; garden center/2/2; pawnbroker/3/2; boutique/2/1; outlet store/3/2; bottle shop/4/2;
    bodega/4/2; five and dime/5/3; delicatessen/3/1`),
};

// small special-case rows
DATA.hospital.push(['MRI', 2, 2, { type: 'acronym' }], ['CT scanner', 3, 3]);
DATA.movie_theater.push(['IMAX', 3, 2, { type: 'proper', tm: true }]);
DATA.fire_station.push(['Jaws of Life', 3, 3, { type: 'proper', tm: true }]);

export const FIXES = [
  { gloss: ['Adobe', 'silicon_valley_companies', 'company'] },
];

export const ALIASES = [
  ['hospital', 'operating room', '', [['operating theatre', 'synonym', 2, 2, ['UK']]]],
  ['hospital', 'emergency room', '', [['casualty', 'synonym', 3, 3, ['UK']], ['ER', 'short', 2, 2, [], { type: 'acronym' }]]],
  ['fire_station', 'fire truck', '', [['fire engine', 'synonym', 1, 1, ['UK']]]],
  ['fire_station', 'fire hose', '', []],
  ['office', 'photocopier', '', [['copier', 'synonym', 2, 1], ['copy machine', 'synonym', 2, 2, ['US']]]],
  ['airport', 'airplane', '', [['aeroplane', 'spelling', 1, 1, ['UK']]]],
  ['airport', 'luggage', '', [['baggage', 'synonym', 1, 1]]],
  ['airport', 'jetway', '', [['jet bridge', 'synonym', 4, 2]]],
  ['museum', 'artifact', '', [['artefact', 'spelling', 2, 1, ['UK']]]],
  ['museum', 'armor', '', [['armour', 'spelling', 2, 3, ['UK']]]],
  ['art_gallery', 'watercolor', '', [['watercolour', 'spelling', 2, 3, ['UK']]]],
  ['movie_theater', 'movie theater', '', []],
  ['shopping_mall', 'parking lot', '', [['car park', 'synonym', 1, 3, ['UK']]]],
  ['ski_resort', 'bunny slope', '', [['nursery slope', 'synonym', 4, 2, ['UK']]]],
  ['ski_resort', 'apres-ski', '', []],
  ['traditional_dwellings', 'tepee', '', [['teepee', 'spelling', 3, 1], ['tipi', 'spelling', 4, 1]]],
  ['traditional_dwellings', 'yurt', '', [['ger', 'synonym', 5, 2]]],
  ['buildings_to_live_in', 'apartment', '', [['flat', 'synonym', 1, 1, ['UK']]]],
  ['buildings_to_live_in', 'condo', '', [['condominium', 'synonym', 3, 2]]],
  ['farm_buildings', 'henhouse', '', [['hen house', 'spelling', 2, 1], ['chicken coop', 'synonym', 1, 1]]],
  ['farm_buildings', 'pigsty', '', [['pigpen', 'synonym', 2, 1, ['US']]]],
  ['farm_buildings', 'cowshed', '', [['cow barn', 'synonym', 3, 1, ['US']]]],
  ['farm_buildings', 'milking parlor', '', [['milking parlour', 'spelling', 3, 1, ['UK']]]],
  ['farm_buildings', 'dovecote', '', [['dovecot', 'spelling', 4, 1]]],
  ['industrial_buildings', 'power station', '', [['power plant', 'synonym', 2, 1, ['US']]]],
  ['shops', 'clothing store', '', [['clothes shop', 'synonym', 1, 1, ['UK']]]],
  ['shops', 'jeweler', '', [['jeweller', 'spelling', 2, 1, ['UK']]]],
  ['shops', 'garden center', '', [['garden centre', 'spelling', 2, 2, ['UK']]]],
  ['public_buildings', 'community center', '', [['community centre', 'spelling', 2, 1, ['UK']]]],
  ['public_buildings', 'civic center', '', [['civic centre', 'spelling', 3, 2, ['UK']]]],
  ['hair_salon', 'hairdresser', '', [['hairstylist', 'synonym', 2, 1]]],
  ['dentist_s_office', 'dentist', '', []],
  ['zoo', 'hippopotamus', '', [['hippo', 'short', 1, 2]]],
  ['police_station', 'handcuffs', '', [['cuffs', 'short', 2, 2]]],
  ['police_station', 'mugshot', '', [['booking photo', 'synonym', 3, 2]]],
].filter(a => a[3].length);

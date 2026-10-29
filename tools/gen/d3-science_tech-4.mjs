// Generated word data: Science & Tech depth-3 themes (computers, gadgets, engineering, science places), chunk 4.
// Format is described in tools/apply-words.mjs. Compact helper W: 'text|rec|in[|gloss[|type]]' rows separated by ';'.
const W = s => s.split(';').map(x => x.trim()).filter(Boolean).map(x => {
  const [t, r, i, g, ty] = x.split('|'); const o = {}; if (g) o.g = g; if (ty) o.type = ty;
  return [t, +r, +i, o];
});
const V = s => W(s).map(([t, r, i, o]) => [t, r, i, { pos: 'verb', ...o }]);
// brand / title names: trademark flag (and type proper unless given)
const TMX = (rows, names, type) => rows.map(([t, r, i, o]) => names.split('|').includes(t) ? [t, r, i, { tm: true, ...(type ? { type } : {}), ...o }] : [t, r, i, o]);
const ORG = s => W(s).map(([t, r, i, o]) => [t, r, i, { type: 'org', tm: true, ...o }]);

export const THEMES = {
  computer_actions: { d: 1, lang: true }, tech_companies: { d: 2 }, data_units: { d: 3 }, computer_storage: { d: 2 }, handheld_gadgets: { d: 1 },
  phone_features: { d: 1 }, robots: { d: 2 }, ai_words: { d: 3 }, smart_home: { d: 2 }, cameras: { d: 2 }, retro_tech: { d: 2 }, wearable_tech: { d: 2 },
  audio_gear: { d: 2 }, display_tech: { d: 3 }, battery_types: { d: 2 }, science_fiction_gadgets: { d: 2 }, simple_machines: { d: 3 }, engines: { d: 3 },
  engineering_fields: { d: 3 }, energy_sources: { d: 1 }, electronic_parts: { d: 4 }, materials_science: { d: 5 }, power_grid_words: { d: 3 },
  machine_parts: { d: 4 }, bridge_parts: { d: 4 }, antarctic_research_station: { d: 5 }, space_station: { d: 3 }, observatory: { d: 4 },
  science_lab: { d: 1 }, science_fair: { d: 2 },
};

export const FIXES = [
  { split: ['BlackBerry', 'fruits', 'fruit'] }, { gloss: ['BlackBerry', 'gadgets', 'phone'] },
  { gloss: ['scroll', 'alphabets_and_writing', 'writing'] }, { gloss: ['Palantir', 'fantasy', 'seeing stone'] }, { gloss: ['Data', 'scientific_method', 'information'] },
  { gloss: ['Atlas', 'maps_and_globes', 'book of maps'] }, { gloss: ['Brownie', 'breads_and_baking', 'cake'] }, { gloss: ['Pebble', 'rocks_and_minerals', 'stone'] },
  { gloss: ['belt', 'accessories', 'clothing'] }, { gloss: ['TB', 'illnesses', 'disease'] }, { gloss: ['mount', 'landscapes', 'mountain'] }, { gloss: ['Harmony', 'music_words', 'music'] }, { gloss: ['steam', 'cooking', 'vapor'] },
];

export const DATA = {
  computer_actions: V(`click|1|1; double-click|1|1; right-click|1|2; scroll|1|1|screen; drag|1|2; drop|2|3; copy|1|1; paste|1|1; cut|1|2|computer; save|1|1; upload|1|1; download|1|1;
    reboot|2|1|computing; log in|1|1; log out|1|1; restart|1|2; undo|1|1; redo|2|2; select|1|2; zoom|1|2|screen; refresh|1|2; print|1|2|computer; delete|1|1; install|1|1; uninstall|2|2;
    shut down|1|1; boot|2|2|computer; sign in|1|1; drag and drop|2|2; minimize|2|2; maximize|2|2; back up|2|2; search|1|2; type|1|3; hover|2|2; swipe|1|2; tap|1|2;
    pinch|2|3; sync|2|2; compile|3|3; debug|3|4; format|2|3; defragment|4|4; force quit|3|3; ctrl-alt-delete|3|3; screenshot|1|2; hard reset|3|3`),

  tech_companies: ORG(`Apple|1|1|tech company; Google|1|1; Microsoft|1|1; Amazon|1|2|company; Meta|2|2|tech company; Facebook|1|2; Intel|2|1; Nvidia|2|2; Tesla|1|3|car company; Oracle|2|3|tech company;
    Cisco|3|2; IBM|2|1; Adobe|2|2; Netflix|1|2; Samsung|1|1; Sony|1|1; Huawei|2|2; Xiaomi|3|2; Alibaba|2|2; Tencent|3|2; Baidu|3|2; Lenovo|3|2; TSMC|4|3; SAP|3|3;
    Nokia|2|2; ASML|5|4; Spotify|2|3; HP|2|2; Dell|2|1; AMD|3|2; Qualcomm|3|3; Salesforce|3|3; Uber|2|3; Twitter|1|2; Snap|2|3|company; Zoom|2|3|company;
    Palantir|4|3|company; Dropbox|3|3; Atlassian|4|3; ARM|4|3|company; Foxconn|4|4; Infosys|4|4; Siemens|3|4; Philips|2|3; ByteDance|3|3; Sega|3|4; Nintendo|2|3; Cloudflare|4|4; Mozilla|3|3; Yahoo|2|2`),

  data_units: W(`bit|1|1|data; byte|2|1; kilobyte|2|1; megabyte|2|1; gigabyte|2|1; terabyte|2|1; petabyte|3|2; exabyte|4|3; zettabyte|4|3; yottabyte|4|3;
    nibble|4|3; kilobit|4|3; megabit|3|3; gigabit|3|3; KB|2|1|kilobyte|acronym; MB|2|1|megabyte|acronym; GB|2|1|gigabyte|acronym; TB|2|1|terabyte|acronym;
    kibibyte|5|4; mebibyte|5|4; gibibyte|5|4; baud|4|4; bps|3|3|bits per second; Mbps|3|3; ronnabyte|5|4; quettabyte|5|4`),

  computer_storage: W(`hard drive|1|1; hard disk|2|1; SSD|2|1||acronym; USB stick|1|1; flash drive|1|1; memory card|1|1; SD card|1|1; microSD|2|2; floppy disk|1|2; CD|1|3|disc|acronym;
    DVD|1|3||acronym; Blu-ray|2|3; cloud storage|1|1; RAID|4|3||acronym; NAS|4|3||acronym; tape drive|3|2; external drive|2|1; Zip drive|3|3; cartridge|2|4|storage;
    magnetic tape|3|2; optical disc|3|2; NVMe|4|3; thumb drive|2|1; pen drive|3|2; hard disk drive|2|1; HDD|3|2||acronym; Google Drive|2|3; iCloud|2|3; data center|2|3`),

  handheld_gadgets: W(`smartphone|1|1; tablet|1|1|computer; e-reader|2|1; Kindle|2|2; calculator|1|1; handheld console|2|1; Game Boy|2|1; Nintendo Switch|1|2; PDA|3|2||acronym; walkie-talkie|1|1;
    GPS|2|2||acronym; MP3 player|2|1; iPod|2|1; Palm Pilot|3|2; BlackBerry|2|2|phone; pager|2|2; Tamagotchi|2|2; remote control|1|3; Steam Deck|3|3; Dictaphone|4|3; voice recorder|2|2;
    portable speaker|2|3; pocket calculator|1|1; handheld scanner|3|3; flip phone|1|1; mobile phone|1|1; cell phone|1|1; satnav|2|3; PSP|3|2||acronym; Nintendo DS|2|2; iPad|1|1; Walkman|2|2`),

  phone_features: W(`ringtone|1|1; voicemail|1|1; speed dial|2|1; caller ID|2|1; text message|1|1; SMS|2|1|text message|acronym; emoji|1|1; camera|1|1; flashlight|1|1; airplane mode|1|1;
    silent mode|1|1; vibrate|1|1; screen lock|1|1; fingerprint sensor|2|1; face unlock|2|1; touchscreen|1|2; app|1|2; notification|1|1; contacts|1|1; speakerphone|2|1;
    call waiting|2|1; hotspot|2|1; Bluetooth|1|2; wallpaper|1|2; autocorrect|2|1; voice assistant|2|1; SIM card|2|1; home button|2|1; missed call|1|1;
    do not disturb|2|1; selfie camera|2|1; group chat|1|1; swipe|1|2; timer|1|3; call forwarding|3|2; conference call|2|2; MMS|3|2||acronym; eSIM|4|2; haptic feedback|4|3; NFC|4|3||acronym; screen time|2|2; panorama|3|3`),

  robots: [
    ...TMX(W(`R2-D2|1|1|robot; C-3PO|1|1|robot; WALL-E|1|1|robot; Roomba|2|2|gadget; Baymax|3|2|robot; Bender|2|2|robot; Marvin|3|2|robot; HAL 9000|3|3|computer; Optimus Prime|2|2|robot; Megatron|3|3|robot;
      Johnny 5|3|2|robot; RoboCop|2|2|robot; Iron Giant|2|2|robot; Astro Boy|3|2|robot; Terminator|1|2|robot; Rosie|3|2|robot; Gort|5|3|robot; Robby the Robot|4|3|robot; BB-8|2|2|robot; K-9|4|3|robot; Data|3|3|android;
      Asimo|4|3|robot; Atlas|3|4|robot; Optimus|3|3|robot; Sophia|3|3|robot; Spot|3|3|robot dog; Daleks|3|4|robots`), 'R2-D2|C-3PO|WALL-E|Roomba|Baymax|Bender|Marvin|HAL 9000|Optimus Prime|Megatron|Johnny 5|RoboCop|Iron Giant|Astro Boy|Terminator|Rosie|Gort|Robby the Robot|BB-8|K-9|Data|Asimo|Atlas|Optimus|Sophia|Spot|Daleks', 'proper'),
    ...W(`robot vacuum|1|1; industrial robot|2|1; robotic arm|2|1; android|1|2|robot; cyborg|2|2; humanoid|2|1; automaton|3|2; droid|2|1; cobot|4|3; robot dog|2|1; drone|1|3|gadget; mech|3|3; Mars rover|2|3; chatbot|2|3; animatronic|3|3`),
  ],

  ai_words: TMX(W(`algorithm|2|2; neural network|2|1; machine learning|2|1; deep learning|3|1; chatbot|2|1; prompt|2|1; training data|3|1; model|1|3|AI; token|2|3|AI; hallucination|3|2;
    large language model|3|1; LLM|3|1||acronym; generative AI|2|1; deepfake|2|1; Turing test|3|1; GPT|3|1||acronym; computer vision|3|1; natural language|3|2; supervised learning|4|2;
    bias|1|4|AI; parameter|3|3|AI; fine-tuning|4|2; overfitting|4|2; Siri|1|2; Alexa|1|2|assistant; Gemini|2|2|AI; Copilot|2|2; AGI|3|1||acronym; singularity|3|2|technology; image generator|2|1;
    speech recognition|2|1; self-driving car|1|2; transformer|2|3|AI; embedding|5|3; backpropagation|5|3; gradient descent|5|3; autonomous|3|3; AI|1|1||acronym; ChatGPT|1|1; Claude|2|2|AI; Midjourney|3|2; deep neural net|4|2`),
    'Siri|Alexa|Gemini|Copilot|ChatGPT|Claude|Midjourney|GPT', 'proper'),

  smart_home: TMX(W(`smart speaker|1|1; smart bulb|2|1; smart thermostat|2|1; Nest|2|2|thermostat; Alexa|1|2|assistant; Google Home|2|1; video doorbell|2|1; Ring doorbell|3|2; smart lock|2|1; robot vacuum|1|1;
    smart plug|2|1; security camera|1|1; motion sensor|2|1; smart TV|1|1; hub|3|3|smart home; voice control|2|1; Zigbee|5|3; Wi-Fi|1|2; smart fridge|2|1; smart blinds|3|1;
    smoke detector|1|3; home automation|3|1; Philips Hue|3|2; Z-Wave|5|3; Matter|3|4|smart home; smart meter|3|2; smart display|3|1; smart light|2|1; HomeKit|4|2; sprinkler controller|4|2; app|1|4; routine|3|4|smart home; geofencing|5|3; smart switch|3|2`),
    'Alexa|Nest|Google Home|Ring doorbell|Philips Hue|HomeKit'),

  cameras: TMX(W(`DSLR|3|1; mirrorless|3|1; point-and-shoot|2|1; Polaroid|2|1; GoPro|2|2; camcorder|2|1; webcam|1|1; film camera|1|1; disposable camera|2|1; lens|1|2|camera; shutter|2|2|camera;
    flash|1|3|camera; tripod|2|2; viewfinder|3|2; aperture|3|3; zoom lens|2|2; telephoto|3|2; wide-angle|3|2; selfie stick|1|2; dashcam|2|1; security camera|1|1; action camera|2|1; pinhole camera|3|2; Leica|3|2;
    Canon|2|3|camera brand; Nikon|2|3; instant camera|1|1; camera obscura|4|2; SLR|3|1; medium format|5|3; camera phone|1|1; lens cap|2|2; light meter|4|3; hot shoe|5|4; filter|2|4|camera; bokeh|4|4;
    Kodak|2|3; Hasselblad|4|3; Brownie|4|3|camera; Super 8|4|3; drone camera|2|2; body camera|3|2; trail camera|3|2; shutter speed|3|3; f-stop|4|4; CCTV|3|2`),
    'Polaroid|GoPro|Leica|Canon|Nikon|Kodak|Hasselblad|Brownie'),

  retro_tech: TMX(W(`floppy disk|1|1; cassette|1|1; VHS|1|1; pager|2|1; Walkman|2|1; fax machine|1|1; dial-up|2|1; punch card|3|2; Betamax|3|2; LaserDisc|3|2;
    rotary phone|1|1; typewriter|1|1; vinyl record|1|3; 8-track|3|1; CRT monitor|2|1; dot matrix printer|3|1; Commodore 64|3|1; Atari|2|2; Game Boy|2|2; Tamagotchi|2|2;
    MiniDisc|3|2; Polaroid|2|3; overhead projector|2|1; slide rule|3|2; answering machine|2|1; payphone|1|1; Zip drive|3|2; modem|2|1; Discman|3|1; CD player|1|1;
    VCR|2|1; tape recorder|2|1; Nokia 3310|2|1; Palm Pilot|3|2; Teletext|3|2; telegraph|2|2; telex|4|2; boombox|2|2; flip phone|1|1; cathode ray tube|3|2; reel-to-reel|4|2; video rental|2|3; Filofax|3|4; Game Gear|4|2; ZX Spectrum|4|2; BBC Micro|4|2; Nintendo 64|2|2; walkie-talkie|1|4`),
    'Walkman|Betamax|LaserDisc|Commodore 64|Atari|Game Boy|Tamagotchi|MiniDisc|Polaroid|Discman|Nokia 3310|Palm Pilot|Game Gear|ZX Spectrum|BBC Micro|Nintendo 64|Filofax|Zip drive|Teletext'),

  wearable_tech: TMX(W(`smartwatch|1|1; fitness tracker|1|1; VR headset|1|1; earbuds|1|1; smart glasses|2|1; hearing aid|1|2; Apple Watch|1|1; Fitbit|2|1; Oculus|3|2; AirPods|1|1;
    smart ring|3|1; Google Glass|3|1; heart rate monitor|2|1; GPS watch|2|1; smart band|3|1; AR glasses|3|1; smart clothing|3|1; sleep tracker|2|1; pedometer|2|2; Bluetooth headset|2|1;
    Apple Vision Pro|3|2; Oura Ring|4|2; Garmin|3|2; glucose monitor|3|3; smart shoes|3|2; Pebble|4|2|smartwatch; Meta Quest|3|2; step counter|2|2; activity tracker|2|1; Samsung Galaxy Watch|3|2; smart jewelry|4|2; exoskeleton|4|3; headset|1|3; wristband|1|3`),
    'Apple Watch|Fitbit|Oculus|AirPods|Google Glass|Apple Vision Pro|Oura Ring|Garmin|Pebble|Meta Quest|Samsung Galaxy Watch'),

  audio_gear: TMX(W(`headphones|1|1; speaker|1|1; amplifier|2|1; microphone|1|1; turntable|2|1; subwoofer|2|1; soundbar|2|1; earphones|1|1; mixing desk|3|1; equalizer|2|1;
    preamp|4|2; receiver|2|3|audio; tweeter|3|2; woofer|2|2; DAC|4|2||acronym; boombox|2|2; stereo|1|1; hi-fi|2|1; jukebox|2|3; studio monitor|3|2; pop filter|3|2; mic stand|2|1; XLR cable|4|2;
    headset|1|2; loudspeaker|2|1; phono stage|5|3; cassette deck|3|2; tape deck|3|2; midrange|4|3; sound card|2|3; PA system|3|2; in-ear monitor|4|3; lavalier|5|3; stylus|2|3|record player;
    tonearm|4|3; crossover|4|4|audio; bookshelf speaker|3|2; mixer|2|2|audio; sound system|1|1; record player|1|1; speaker cable|2|2; Bluetooth speaker|1|1; audio interface|4|2; compressor|3|4|audio; Sonos|3|3; Bose|3|3`),
    'Sonos|Bose'),

  display_tech: TMX(W(`LCD|2|1; LED|1|1; OLED|2|1; QLED|3|2; plasma|2|2|screen; CRT|2|1; touchscreen|1|1; projector|1|1; e-ink|3|1; 4K|2|1; 8K|3|1; HD|2|1; Full HD|2|1; HDR|3|1;
    retina display|3|2; pixel|1|2; refresh rate|3|2; resolution|2|3; backlight|3|2; AMOLED|3|1; microLED|4|2; DLP|5|2; LED matrix|4|2; VGA|3|3; HDMI|2|3; aspect ratio|3|3; curved screen|2|1; flat screen|1|1;
    widescreen|2|1; monitor|1|1|screen; VFD|5|3; Nixie tube|5|3; liquid crystal|3|1; 1080p|2|1; 720p|3|1; ultra HD|3|1; Super AMOLED|4|2; Gorilla Glass|4|3; touch panel|4|2; seven-segment|4|2; dot matrix|4|3; vector display|5|3; OLED TV|2|1; LCD screen|1|1`),
    'Gorilla Glass'),

  battery_types: TMX(W(`AA|1|1|battery|acronym; AAA|1|1|battery|acronym; 9-volt|2|1; button cell|2|1; lithium-ion|2|1; alkaline|2|1; power bank|1|1; car battery|1|1; C cell|3|1; D cell|3|1; coin cell|3|1;
    rechargeable|1|1; lead-acid|3|1; NiMH|4|2; nickel-cadmium|4|2; lithium polymer|4|2; solar battery|2|2; Duracell|1|2; Energizer|2|2; zinc-carbon|4|2; watch battery|2|1;
    hearing aid battery|3|1; AAAA|5|2; PP3|4|2; flow battery|5|3; solid-state battery|3|2; Powerwall|3|3; laptop battery|1|1; phone battery|1|1; CR2032|4|2; LR44|5|3; voltaic pile|4|3; Leclanche cell|5|4; 18650|5|3; lithium battery|2|1; 12-volt|2|2; truck battery|2|2; button battery|2|1; jump pack|3|3`),
    'Duracell|Energizer|Powerwall'),

  science_fiction_gadgets: TMX(W(`lightsaber|1|1; phaser|2|1; tricorder|3|1; communicator|3|2|gadget; sonic screwdriver|3|1; TARDIS|3|2; hoverboard|1|1; jetpack|1|1; ray gun|1|1; laser gun|1|1; teleporter|1|1;
    transporter|3|2|gadget; time machine|1|1; replicator|3|1; holodeck|3|1; hologram|1|2; force field|1|1; tractor beam|2|1; warp drive|2|1; cloaking device|2|1; universal translator|3|1;
    death ray|2|1; flux capacitor|2|1; Pip-Boy|3|2; utility belt|2|3; DeLorean|2|2; light cycle|3|2; neuralyzer|4|2; blaster|2|1; flying car|1|1; Babel fish|3|2; Infinity Gauntlet|3|2; portal gun|3|2;
    stasis pod|4|2; cryo chamber|3|2; laser pistol|2|1; shrink ray|3|1; mind reader|2|3; robot butler|2|2; invisibility cloak|2|2; matter transmitter|4|2; Death Star|2|2; hyperdrive|3|1`),
    'lightsaber|phaser|tricorder|communicator|sonic screwdriver|TARDIS|holodeck|flux capacitor|Pip-Boy|DeLorean|light cycle|neuralyzer|Babel fish|Infinity Gauntlet|portal gun|Death Star|invisibility cloak|replicator|transporter|hyperdrive|utility belt'),

  simple_machines: W(`lever|2|1; pulley|2|1; wedge|2|1; screw|1|1|hardware; inclined plane|3|1; wheel and axle|3|1; ramp|1|1; seesaw|1|1; crowbar|2|1; wheelbarrow|1|1; scissors|1|2; axe|1|2; knife|1|3; doorknob|1|2;
    bottle opener|1|2; nutcracker|2|2; tweezers|1|3; staircase|1|3; tongs|2|2; fishing rod|1|3; slide|1|4|playground; gear|1|3|machine; winch|3|2; crank|3|2; block and tackle|3|2; fulcrum|3|2; spade|1|3; chisel|2|3;
    zipper|1|4; jar lid|1|4; corkscrew|2|3; windlass|5|3; cleaver|2|3; bolt|2|3|hardware; ladder|1|4; door wedge|2|2; screwdriver|1|3; hammer|1|3; Archimedes screw|4|2; spiral staircase|2|3; wheel|1|2; axle|2|2; catapult|2|3; shovel|1|3; cart|1|3`),

  engines: W(`diesel|1|1|fuel; steam|1|1|engine; jet|1|1|engine; rocket|1|1|engine; turbine|2|1; rotary|3|1; two-stroke|3|1; V8|2|1; four-stroke|3|1; petrol|1|1; electric motor|1|1; turbojet|3|1; turbofan|4|1; turboprop|4|2; ramjet|4|2; scramjet|5|3;
    Wankel|4|2; V6|2|1; inline-four|4|2; boxer|3|3|engine; radial|4|3|engine; flat-six|4|2; hybrid|1|2; internal combustion|2|1; steam turbine|3|2; Stirling|5|3; hemi|3|2; outboard|2|2; ion thruster|4|2;
    gas turbine|3|2; V12|3|1; W16|5|3; straight-six|4|2; pulse jet|5|3; Newcomen|5|4; beam engine|4|3; traction engine|3|3; steam engine|1|1; diesel engine|1|1; jet engine|1|1; rocket engine|1|1; piston engine|2|1; V-twin|4|2; single-cylinder|4|2; aircraft engine|2|1`),

  engineering_fields: W(`civil engineering|2|1; mechanical engineer|2|1; electrical engineer|2|1; chemical engineering|2|1; aerospace engineering|2|1; software engineering|2|1; biomedical engineer|3|1;
    structural engineer|3|1; nuclear engineering|3|1; petroleum engineering|3|1; marine engineering|3|1; industrial engineer|3|1; materials engineering|3|1; automotive engineer|3|1;
    mining engineering|3|1; agricultural engineer|3|1; geotechnical engineer|4|1; systems engineering|3|1; acoustic engineering|4|2; mechatronics|4|2; robotics|2|2; telecommunications|3|3;
    computer engineering|2|1; optical engineering|4|2; hydraulic engineering|4|2; transport engineering|4|2; naval architecture|4|3; genetic engineering|2|4; audio engineering|3|2;
    electronic engineer|3|1; sound engineering|3|2; railway engineering|4|2; coastal engineering|4|2; textile engineering|5|3; aeronautical engineer|3|1; control engineering|4|2; traffic engineering|4|2; bioengineering|3|2; reliability engineer|5|3; ceramic engineering|5|3`),

  energy_sources: W(`coal|1|1; oil|1|1; gas|1|1|fuel; uranium|2|1; solar|1|1; wind|1|1|energy; tidal|2|1; hydroelectric|2|1; geothermal|2|1; biomass|3|1; nuclear|1|1; wood|1|2; peat|3|2; hydrogen|2|2; biofuel|2|1;
    natural gas|1|1; petroleum|2|1; wave power|2|1; diesel|1|2|fuel; petrol|1|2; propane|2|2; ethanol|2|2; methane|3|3; fusion|2|2; charcoal|2|3|fuel; kerosene|3|3; oil shale|4|2; tar sands|4|2; wind power|1|1; solar power|1|1;
    hydro|2|1; plutonium|3|3; thorium|4|3; biogas|3|2; firewood|2|2; fuel oil|3|2; lignite|4|2; anthracite|4|2; dung|3|3; hydropower|2|1; fossil fuel|1|1; waste-to-energy|4|2; ocean thermal|5|3; sunlight|1|2; steam power|2|3; muscle power|3|3`),

  electronic_parts: TMX(W(`resistor|2|1; capacitor|2|1; transistor|2|1; diode|2|1; LED|1|1; inductor|3|1; transformer|2|2|electrical; relay|3|2; switch|1|3|electronics; fuse|2|3|electrical; microchip|1|1; circuit board|1|1; battery|1|3|component;
    potentiometer|4|1; integrated circuit|2|1; sensor|2|3; thermistor|4|2; crystal oscillator|4|2; breadboard|3|2; solder|2|3|electronics; wire|1|3|electronics; buzzer|2|2; heat sink|3|2; connector|2|3;
    jumper wire|4|2; photodiode|5|2; Zener diode|5|2; thyristor|5|3; MOSFET|5|2; op-amp|5|2; varistor|5|3; trimmer|4|3; solenoid|3|2; rectifier|4|2; PCB|3|1||acronym; microcontroller|3|2; 555 timer|5|3;
    Arduino|3|3; Raspberry Pi|2|3; photoresistor|5|2; LDR|5|3||acronym; vacuum tube|3|2; chip|1|2|electronics; microprocessor|2|1; DIP switch|5|3; ferrite bead|5|3`),
    'Arduino|Raspberry Pi', 'proper'),

  materials_science: TMX(W(`composite|3|2|material; ceramic|2|2; polymer|3|2; semiconductor|3|2; nanomaterial|4|2; graphene|3|2; carbon fiber|2|2; fiberglass|2|2; Kevlar|3|3; titanium|2|3; aluminum|2|4; steel|1|4;
    concrete|1|4; glass|1|4; silicon|2|3; plastic|1|4; rubber|1|4; crystal lattice|4|2; metallurgy|3|2; alloy|2|2; superconductor|3|2; aerogel|4|2; Teflon|3|3; carbon nanotube|4|2; bioplastic|3|3;
    smart material|4|2; metamaterial|5|2; shape memory alloy|5|2; liquid crystal|3|3; biomaterial|4|2; laminate|3|3; tensile test|4|3; annealing|4|2; sintering|5|3; corrosion|2|3; fatigue|2|4|material;
    grain boundary|5|3; doping|4|3|semiconductor; quenching|5|3; tempering|4|3; vulcanization|4|3; nanotechnology|3|2; microstructure|5|2; thin film|4|3; amorphous|4|3; piezoelectric|4|3; fracture toughness|5|3; polymerization|4|2`),
    'Kevlar|Teflon'),

  power_grid_words: W(`generator|1|1; transformer|2|1|electrical; pylon|2|1; substation|3|1; power line|1|1; turbine|2|2; grid|2|1; cable|1|2|electrical; insulator|3|2; circuit breaker|3|2; voltage|2|1; blackout|1|1; power station|1|1;
    meter|1|3|electric; fuse box|2|2; utility pole|2|1; high voltage|1|1; megawatt|3|2; kilowatt-hour|3|2; transmission line|3|1; brownout|3|1; surge|2|3|power; power plant|1|1; smart meter|2|2;
    step-down|4|2; load|2|3|electrical; wind farm|1|2; grounding|3|3; three-phase|4|2; outage|2|1; overhead line|3|1; distribution|3|3|power; national grid|2|1; power cut|1|1; mains|2|2; kilovolt|3|2;
    busbar|5|3; lineman|3|2; transmission tower|3|1; telegraph pole|2|2; solar farm|1|3; alternating current|2|2; AC|2|2|current|acronym; DC|2|2|current|acronym; load shedding|4|2; peak demand|4|2; power surge|1|1`),

  machine_parts: W(`gear|1|1|machine; cog|1|1; piston|2|1; cylinder|2|2|machine; crankshaft|3|1; camshaft|4|1; bearing|3|1|machine; shaft|2|2|machine; valve|2|2|machine; spring|1|3|coil; belt|1|3|machine; chain|1|3|machine; sprocket|3|1;
    flywheel|3|1; axle|2|1; cam|3|2; lever|2|2; bolt|1|2|hardware; nut|1|3|hardware; washer|2|3|hardware; rivet|3|2; gasket|3|1; pulley|2|2; clutch|2|1|machine; bushing|4|2; spindle|3|2; rotor|3|2; stator|4|2; governor|4|3|machine;
    linkage|4|2; piston ring|4|2; connecting rod|4|1; ratchet|3|2|machine; pinion|4|2; worm gear|4|1; hydraulic pump|3|2; coupling|3|3|machine; seal|2|4|machine; o-ring|3|2; turbine blade|3|2; impeller|4|2; nozzle|3|3;
    fastener|3|2; pawl|5|3; fan belt|2|2; drive shaft|3|1; gearbox|2|1; crank|3|2; plunger|3|3; thrust bearing|5|2; cotter pin|5|3; keyway|5|3; idler|5|3`),

  bridge_parts: W(`deck|2|2|bridge; pier|2|1; abutment|4|1; cable|1|2|bridge; tower|1|2; girder|3|1; truss|3|1; arch|1|2|structure; suspension cable|3|1; span|2|1|bridge; beam|1|3|structure; parapet|3|2; handrail|1|3;
    railing|1|3; expansion joint|4|1; anchorage|4|2; hanger|3|3; keystone|3|2; bearing|3|3|machine; roadway|1|2; stay cable|4|1; cantilever|3|2; buttress|3|3; spandrel|5|2; approach|2|3|bridge; footing|3|3;
    walkway|1|2; pylon|2|2; piling|4|2; bascule|5|2; strut|3|3; rivet|3|3; wing wall|5|3; bearing pad|5|3; foundation|2|3|building; main cable|3|1; suspender cable|4|2; lamp post|1|4; toll booth|1|4; arch rib|5|3; box girder|5|2; caisson|5|3; sidewalk|1|3; guardrail|2|3; deck slab|5|2`),

  antarctic_research_station: W(`ice core|3|1; weather balloon|2|1; snowcat|3|1; generator|1|3; radio|1|2; parka|1|2; snowmobile|2|2; sled|1|2; ice drill|3|1; thermometer|1|3; weather station|2|1; satellite dish|2|2; fuel drums|3|2;
    bunk bed|1|3; mess hall|3|2; greenhouse|2|3; wind turbine|2|3; flag|1|4; sample tube|3|2; crevasse flag|5|2; helipad|3|3; ice runway|4|2; field hut|4|2; survival suit|3|2; crampons|3|2;
    ice axe|3|2; hydroponics|4|3; sea ice|2|3; antenna|2|3; sledge|2|2; snow goggles|3|2; supply plane|2|2; research vessel|3|2; ice auger|4|2; seismometer|4|2; glaciologist|4|2; ski plane|4|2; Hagglund|5|3;
    cold weather gear|2|2; polar tent|3|2; snow tractor|3|2; mass spectrometer|5|3; penguin|1|4`),

  space_station: W(`airlock|3|1; solar panel|2|1; module|3|2; robotic arm|2|1; docking port|3|1; treadmill|2|2; sleeping bag|1|2; spacesuit|1|1; Canadarm|4|2; Soyuz|3|2; cupola|4|2; Dragon capsule|3|2; hatch|2|2;
    handrail|2|3; oxygen generator|3|1; water recycler|4|1; zero gravity|1|1; astronaut|1|2; radiator|1|4|space station; experiment rack|4|2; ISS|2|1|space station|acronym; Tiangong|4|2; Mir|3|2|space station; Skylab|3|2;
    Zvezda|5|3; Unity|3|4|module; Harmony|3|4|module; Destiny|2|4|module; Columbus|2|4|module; thruster|3|2; tether|3|3; window|1|4|space station; food pouch|2|2; space toilet|2|1; cargo ship|2|3; microgravity|3|1;
    orbit|1|2; Salyut|5|3; Kibo|5|3; crew quarters|3|1; solar array|3|1; docking adapter|4|2; space walk|1|2; mission control|1|3; Space Shuttle|1|3`),

  observatory: W(`telescope|1|1; dome|1|1; star chart|2|1; eyepiece|2|1; mount|2|3|telescope; astronomer|1|1; mirror|1|3|telescope; lens|1|3|telescope; tripod|2|3; finderscope|4|1; spectrograph|4|2; observing slit|4|1;
    control room|2|3; radio dish|2|2; CCD camera|5|2; sky map|2|1; celestial globe|3|2; planetarium|2|2; refractor|3|1; reflector|3|1; Cassegrain|5|2; logbook|2|4; red light|3|3; Mauna Kea|3|2; Arecibo|3|2; Palomar|4|2;
    Jodrell Bank|4|2; Keck|5|2; Lick Observatory|5|2; Yerkes|5|2; Greenwich|2|3; Mount Wilson|5|2; Griffith Observatory|4|2; Very Large Telescope|4|2; radio telescope|2|1; star atlas|3|1; equatorial mount|5|2; Dobsonian|5|2;
    focuser|5|3; rotating dome|3|1; sky survey|4|2; aperture|3|3; light pollution|3|2; astrophotography|4|3; solar telescope|4|2; clock drive|5|3; Hubble|2|3|telescope`),

  science_lab: W(`goggles|1|1; lab coat|1|1; fume hood|3|1; bunsen burner|2|1; specimen|2|1; eyewash|3|1; beaker|1|1; test tube|1|1; flask|1|1; petri dish|2|1; microscope|1|1; pipette|2|1; centrifuge|3|1; burette|4|1;
    tongs|2|2; tripod stand|3|2; gloves|1|2; safety shower|3|1; tweezers|1|3; scales|1|3|lab; slide|1|3|microscope; thermometer|1|3; spatula|2|2; clipboard|1|4; notebook|1|3|paper; lab bench|2|1; autoclave|4|1;
    incubator|3|1; ice bath|3|2; retort stand|4|1; funnel|1|2; stirrer|3|2; wash bottle|3|2; fire blanket|2|2; graduated cylinder|3|1; filter paper|3|1; hot plate|2|1; desiccator|5|2; mortar and pestle|3|2;
    safety goggles|1|1; cover slip|4|2; chemicals|1|2; Erlenmeyer flask|3|1; sink|1|4; fire extinguisher|1|3; lab report|2|2; scientist|1|2; hazard sign|2|2; reagent|3|2; fume cupboard|3|2`),

  science_fair: W(`poster|1|1; volcano model|1|1; hypothesis|2|1; judge|1|1; ribbon|1|1; display board|2|1; trifold board|3|1; project|1|2; trophy|1|2; experiment|1|1; results|1|2; conclusion|1|2; baking soda|1|2; vinegar|1|3;
    magnet|1|2; plant growth|2|1; solar system model|1|1; lemon battery|2|1; slime|1|2; crystal growing|2|1; lab notebook|2|1; bibliography|3|2; abstract|3|2|science; data table|2|1; graph|1|2; variable|2|2|experiment; control group|3|1;
    prize|1|2; first place|1|2; blue ribbon|1|1; presentation|1|2; demonstration|2|2; egg drop|2|1; paper airplane|1|3; circuit|2|2|electric; robot|1|3; tornado in a bottle|3|1; hand-crank generator|4|2;
    question|1|3|science; observation|2|2; materials list|3|2; procedure|2|2; science teacher|1|1;  test tube rack|3|3; potato clock|3|1; bean sprout|2|2; pH test|3|2; chromatography|4|2; dry ice|2|3; mentos geyser|3|1`),
};

export const ALIASES = [
  ['computer_actions', 'minimize', '', [['minimise', 'spelling', 2, 2, ['UK']]]],
  ['computer_actions', 'maximize', '', [['maximise', 'spelling', 2, 2, ['UK']]]],
  ['computer_storage', 'flash drive', '', [['jump drive', 'synonym', 4, 4, ['US']]]],
  ['energy_sources', 'petrol', '', [['gasoline', 'synonym', 1, 2, ['US']]]],
  ['materials_science', 'aluminum', '', [['aluminium', 'spelling', 2, 4, ['UK']]]],
  ['materials_science', 'carbon fiber', '', [['carbon fibre', 'spelling', 2, 2, ['UK']]]],
  ['materials_science', 'vulcanization', '', [['vulcanisation', 'spelling', 4, 3, ['UK']]]],
  ['phone_features', 'voicemail', '', [['answerphone', 'synonym', 3, 3, ['UK']]]],
  ['power_grid_words', 'blackout', '', [['power failure', 'synonym', 2, 1]]],
  ['electronic_parts', 'microchip', '', [['silicon chip', 'synonym', 2, 2]]],
  ['battery_types', 'power bank', '', [['portable charger', 'synonym', 2, 2]]],
  ['space_station', 'spacesuit', '', [['space suit', 'spelling', 1, 1]]],
  ['simple_machines', 'crowbar', '', [['pry bar', 'synonym', 3, 3, ['US']]]],
  ['retro_tech', 'answering machine', '', [['message machine', 'synonym', 4, 4]]],
  ['display_tech', 'flat screen', '', [['flatscreen', 'spelling', 2, 2]]],
  ['science_lab', 'goggles', '', [['safety glasses', 'synonym', 3, 3]]],
];

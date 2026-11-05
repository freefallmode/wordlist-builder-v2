// One-off: adds the themes "types of public transport" and "modes of transport", and links the missing "train" (the vehicle) into public transportation and trains.
// Run: node tools/gen/transport-themes.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, moveTheme } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(readFileSync(LIB, 'utf8')); reindex(P);

const THEMES = [
  { id: 'types_of_public_transport', name: 'types of public transport', pop: 1, note: 'kinds of public transport a person can ride: bus, train, tram, subway, ferry, taxi, cable car' },
  { id: 'modes_of_transport', name: 'modes of transport', pop: 1, note: 'ways of getting around: car, bus, train, plane, boat, bike, on foot' },
];
for (const t of THEMES) {
  if (P.ix.theme.has(t.id)) throw Error('theme exists: ' + t.id);
  P.themes.push({ id: t.id, name: t.name, parent: 'travel_transport', group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: false, region: [], note: t.note, pop: t.pop });
  reindex(P); moveTheme(P, t.id, 'travel_transport'); reindex(P);
}

// theme -> [entry id, expected text, popularity]; an alias row gives the alias its own popularity in the theme
const LINKS = {
  types_of_public_transport: [[2646, 'bus', 1], [39524, 'train', 1], [2647, 'subway', 1], [2650, 'metro', 1], [2648, 'underground', 2], [2649, 'tube', 2], [2651, 'tram', 2], [2652, 'streetcar', 2], [2654, 'ferry', 2],
    [40088, 'taxi', 2], [47041, 'cable car', 3], [2669, 'light rail', 3], [2670, 'monorail', 3], [2671, 'minibus', 3], [2674, 'coach', 3], [2866, 'bullet train', 3], [47014, 'water taxi', 3], [2682, 'tuk-tuk', 3],
    [2675, 'trolleybus', 4], [2687, 'funicular', 4], [2684, 'rickshaw', 4], [2685, 'jeepney', 4], [2691, 'water bus', 4], [47042, 'gondola', 4], [2686, 'matatu', 5]],
  modes_of_transport: [[23150, 'car', 1], [2646, 'bus', 1], [39524, 'train', 1], [2707, 'airplane', 1], [2709, 'plane', 1], [2779, 'boat', 1], [28280, 'bike', 1],
    [2778, 'ship', 2], [40174, 'motorcycle', 2], [40088, 'taxi', 2], [2647, 'subway', 2], [2712, 'helicopter', 2], [15808, 'walking', 2],
    [5954, 'scooter', 3], [2651, 'tram', 3], [2654, 'ferry', 3], [28334, 'truck', 3], [46631, 'van', 3],
    [43578, 'skateboard', 4], [39769, 'hot air balloon', 4], [2781, 'canoe', 4], [2782, 'kayak', 4], [34572, 'submarine', 4], [47041, 'cable car', 4], [29601, 'moped', 4],
    [3155, 'hovercraft', 5], [7356, 'Segway', 5]],
  public_transportation: [[39524, 'train', 1], [40088, 'taxi', 3], [47041, 'cable car', 3]],
  trains: [[39524, 'train', 1]],
};
let n = 0;
for (const [tid, rows] of Object.entries(LINKS)) for (const [id, text, pop] of rows) {
  const e = P.ix.entry.get(id);
  if (!e || e.text !== text) throw Error(`entry ${id} is not "${text}"`);
  if (e.typ[tid] === undefined) { e.typ[tid] = pop; n++; }
}
reindex(P); stampSave(P); writeFileSync(LIB, serializeProject(P));
console.log(n, 'links added; library v' + P.lib.version);

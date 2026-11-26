"""Make the selector app's level list from levels.json.

Usage: python make_levels_asset.py ../levels.json app/src/main/assets/levels.tsv
One line per level, tab-separated:
  level, types (comma list, for the filter), specials (shown text), new (types first seen here),
  themes count, split words, theme names (top-level themes, '; ').
"""
import json, sys

src, out = sys.argv[1], sys.argv[2]
levels = json.load(open(src, encoding='utf-8'))

# (short name, random_specials key, prefix of the per-word 'special' note)
TYPES = [('chain', 'chain separator', 'behind chain'), ('cryptic', 'cryptic', 'cryptic'),
         ('backward', 'backward', 'backward'), ('frozen', 'frozen', 'frozen'), ('burst', 'burst', 'burst'),
         ('linked', 'linked', 'linked'), ('key lock', 'key lock', 'locked'), ('cracked', 'cracked', 'cracked'),
         ('screw lock', 'screw lock', 'screw lock')]

seen_set, seen_random = set(), set()
rows = []
for lv in levels:
    rnd = lv.get('random_specials', {})
    words = [w for t in lv['themes'] for w in t['words']]
    types, shown, new = [], [], []
    for name, key, prefix in TYPES:
        if key in rnd:
            r = rnd[key]
            types.append(name)
            shown.append(f'{name} (random)' if r is None else
                         f'{name} {r[0]}' + ('' if r[0] == r[1] else f'-{r[1]}') + ' (random)')
            if name not in seen_random:
                seen_random.add(name)
                new.append(f'random {name}')
        else:
            n = sum(1 for w in words if any(s.startswith(prefix) for s in w.get('special', [])))
            if n:
                types.append(name)
                shown.append(f'{name} x{n}')
                if name not in seen_set:
                    seen_set.add(name)
                    new.append(name)
    names = [t['theme'] for t in lv['themes'] if not t['parent']]
    rows.append('\t'.join([str(lv['level']), ','.join(types), ', '.join(shown), ', '.join(new),
                           str(lv['themes_count']), str(lv['split_words']), '; '.join(names)]))

with open(out, 'w', encoding='utf-8', newline='\n') as f:
    f.write('\n'.join(rows) + '\n')
print(len(rows), 'levels ->', out)

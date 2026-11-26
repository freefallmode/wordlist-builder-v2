"""Export Bubble Word Jam level data, as this device sees it, from the game's Unity level assets.

How the raw input is made (see README.md):
  1. adb pull /sdcard/Android/data/com.AppFore.BubbleWordJam/files/UnityCache/Shared  (cached level bundles)
     and the APK's split_UnityDataAssetPack.apk (levelfallback_0_99 bundle).
  2. Every MonoBehaviour with a 'categories' field is dumped with UnityPy into levels_raw.json
     ({asset name: typetree}); asset names are Level_N[_variant], N counting from 0 (game level = N + 1).

Variant rule: this device plays Level_N_ob where it exists, else Level_N (checked against levels 1-74 as played).
Other installs are in other A/B groups and play other variant sets (a phone in group 2 plays plain Level_N);
the optional SUFFIX picks the set: _ob (default), '' for the original levels, _cd, _heartbeat and so on.

Usage: python export_levels.py levels_raw.json OUT_DIR [SUFFIX]
Writes OUT_DIR/levels.json and OUT_DIR/words.tsv.
"""
import json, os, re, sys

raw, out_dir = sys.argv[1], sys.argv[2]
SUFFIX = sys.argv[3] if len(sys.argv) > 3 else '_ob'
L = json.load(open(raw, encoding='utf-8'))


def pick(n):
    if SUFFIX and f'Level_{n}{SUFFIX}' in L:
        return f'Level_{n}{SUFFIX}'
    return f'Level_{n}'


def cryptic_start(c):
    # letters hidden until their revealAtMerge count; 0 = visible at the start
    return ''.join(chr(l['letter']).upper() if l['revealAtMerge'] == 0 else '?' for l in c['letters'])


# Special bubble types: export name, level flag (levels 501+: placed at random when the level loads),
# and the field holding the [min, max] count for that random placement (none for the chain separator).
RANDOM = [('chain separator', 'hasSeperator', None), ('cryptic', 'hasCrypticBubbles', 'minMaxCrypticBubbles'),
          ('backward', 'hasBackwardBubbles', 'minMaxBackwardBubbles'), ('frozen', 'hasFrozenBubbles', 'minMaxFrozenBubbles'),
          ('burst', 'hasBurstBubbles', 'minMaxBurstBubbles'), ('linked', 'hasLinkedBubbles', 'minMaxLinkedBubbles'),
          ('key lock', 'hasKeyLockBubbles', 'minMaxKeyLockBubbles'), ('cracked', 'hasCrackBubbles', 'minMaxCrackBubbles'),
          ('screw lock', 'hasScrewLockBubbles', 'minMaxScrewLockBubbles')]

levels, rows = [], []
n_levels = 1 + max(int(m.group(1)) for k in L if (m := re.fullmatch(r'Level_(\d+)', k)))
for n in range(n_levels):
    name = pick(n)
    t = L[name]
    cats = t['categories']
    sep = bool(t.get('useBubbleSeparator'))
    special = {}
    for w in t.get('crypticBubbles') or []:
        special.setdefault(w['word'].lower(), []).append('cryptic ' + cryptic_start(w))
    for w in t.get('backwardBubbles') or []:
        special.setdefault(w['word'].lower(), []).append('backward')
    for w in t.get('frozenBubbles') or []:
        special.setdefault(w['word'].lower(), []).append(f"frozen {w['mergesNeeded']} merges")
    for w in t.get('burstBubbles') or []:
        special.setdefault(w['word'].lower(), []).append(f"burst {w['movesRemaining']} moves")
    for w in t.get('linkedBubbles') or []:
        special.setdefault(w['word'].lower(), []).append('linked to ' + '+'.join(w['linkedChunks']))
    for w in t.get('keyLockBubbles') or []:
        special.setdefault(w['lockWord'].lower(), []).append(f"locked, key {w['keyWord']}")
        special.setdefault(w['keyWord'].lower(), []).append(f"key for {w['lockWord']}")
    for w in t.get('screwLockBubbles') or []:
        special.setdefault(w['screwLockWord'].lower(), []).append(
            f"screw lock x{w['screwCount']}, screwdrivers {'/'.join(w['screwDriverWords'])}")
    for w in t.get('crackedBubbles') or []:
        special.setdefault(w['fullWord'].lower(), []).append(f"cracked {w['chunkA']}|{w['chunkB']} after {w['breakNum']}")
    if sep:
        for w in (t.get('bubbleSeparatorData') or {}).get('linkedWords', []):
            special.setdefault(w.lower(), []).append('behind chain')

    themes, splits = [], 0
    for c in cats:
        words = []
        for w in c['words']:
            e = {'word': w['fullWord']}
            if w['chunks']:
                e['split'] = '|'.join(w['chunks'])
                splits += 1
            if w['icon']:
                e['icon'] = w['icon']
            if special.get(w['fullWord'].lower()):
                e['special'] = special[w['fullWord'].lower()]
            words.append(e)
            rows.append([n + 1, c['category'], c['parentCategory'], w['fullWord'], e.get('split', ''),
                         '; '.join(e.get('special', []))])
        themes.append({'theme': c['category'], 'parent': c['parentCategory'] or None, 'words': words})

    levels.append({
        'level': n + 1,
        'asset': name,
        'themes_count': len(cats),
        'split_words': splits,
        'start_moves_est': 3 * len(cats) + splits + t['moveLimit'],
        'move_slack': t['moveLimit'],
        'chain_separator': sep or bool(t.get('hasSeperator')),
        # levels 501+: types switched on for the level, placed on random words at load; value = [min, max] count
        'random_specials': {name: (t[rng] if rng else None) for name, flag, rng in RANDOM if t.get(flag)},
        'max_bubbles_on_screen': t.get('maxBubblesInScene'),
        'themes': themes,
    })

os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, 'levels.json'), 'w', encoding='utf-8') as f:
    json.dump(levels, f, ensure_ascii=False, indent=1)
with open(os.path.join(out_dir, 'words.tsv'), 'w', encoding='utf-8', newline='\n') as f:
    f.write('level\ttheme\tparent_theme\tword\tsplit\tspecial\n')
    for r in rows:
        f.write('\t'.join(str(x) for x in r) + '\n')
print(len(levels), 'levels,', len(rows), 'word rows')

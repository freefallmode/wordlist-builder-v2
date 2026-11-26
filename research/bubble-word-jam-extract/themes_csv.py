"""One row per theme, for Google Sheets: Level, Theme, Parent theme, Words, Split words, Special notes.

Usage: python themes_csv.py levels.json themes.csv
Words and splits are in capitals, as the game shows them. Level facts (theme count, estimated
start moves, chain separator) go in the notes of each level's first theme row.
"""
import csv, json, sys

src, out = sys.argv[1], sys.argv[2]
levels = json.load(open(src, encoding='utf-8'))


def cell(s):
    # keep Sheets from reading a cell as a formula
    return "'" + s if s and s[0] in '=+-@' else s


rows = 0
with open(out, 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f)
    w.writerow(['Level', 'Theme', 'Parent theme', 'Words', 'Split words', 'Special notes'])
    for lv in levels:
        for i, t in enumerate(lv['themes']):
            words = ', '.join(x['word'].upper() for x in t['words'])
            splits = ', '.join(x['split'].upper() for x in t['words'] if x.get('split'))
            notes = []
            if i == 0:
                lvl = f"Level: {lv['themes_count']} themes, {lv['split_words']} split words, ~{lv['start_moves_est']} moves"
                if lv['chain_separator']:
                    lvl += ', chain separator'
                notes.append(lvl)
            for x in t['words']:
                for s in x.get('special', []):
                    notes.append(f"{x['word'].upper()}: {s}")
                if x.get('icon'):
                    notes.append(f"{x['word'].upper()}: picture ({x['icon']})")
            w.writerow([lv['level'], cell(t['theme'].upper()), cell((t['parent'] or '').upper()),
                        cell(words), cell(splits), cell('; '.join(notes))])
            rows += 1
print(rows, 'theme rows')

"""Words that contain or give away their own theme name.

Usage: python theme_leaks.py levels.json theme-leaks.xlsx
One row per word: Level, Theme, Word, Kind. Kinds, checked in this order:
  - "word = theme": the same after dropping a plural (hatchets / hatchet)
  - "shares a word": a whole word in common, plurals folded (bears / polar bear)
  - "theme word inside": a theme word of 4+ letters inside the word, ignoring spaces (Berries / Blueberry)
Small words (the, of, and, things, types ...) are ignored. A word that is the name of another theme in the
same level is left out: that is a sub-theme returning as a bubble, which the game does by design.
Matching is by letters, not meaning, so some rows are coincidences (birds of prey / osprey).
"""
import json, re, sys
from openpyxl import Workbook
from openpyxl.styles import Font

src, out = sys.argv[1], sys.argv[2]
levels = json.load(open(src, encoding='utf-8'))
STOP = {'the', 'of', 'and', 'a', 'in', 'on', 'to', 'for', 'with', 'things', 'types', 'kinds', 'parts', 'famous', 'at'}


def stem(w):
    for suf in ('ies', 'es', 's'):
        if w.endswith(suf) and len(w) - len(suf) >= 3:
            return w[:-len(suf)] + ('y' if suf == 'ies' else '')
    return w


def toks(s):
    return [stem(t) for t in re.findall(r'[a-z]+', s.lower()) if t not in STOP]


rows = []
for lv in levels:
    names = {t['theme'].lower() for t in lv['themes']}
    for t in lv['themes']:
        th = t['theme'].lower().strip()
        tt = set(toks(th))
        for x in t['words']:
            w = x['word'].lower().strip()
            if w in names:
                continue
            if stem(w) == stem(th):
                kind = 'word = theme'
            elif set(toks(w)) & tt:
                kind = 'shares a word'
            elif any(len(k) >= 4 and k in re.sub(r'[^a-z]', '', w) for k in tt):
                kind = 'theme word inside'
            else:
                continue
            rows.append([lv['level'], t['theme'], x['word'], kind])

wb = Workbook()
ws = wb.active
ws.title = 'Theme leaks'
ws.append(['Level', 'Theme', 'Word', 'Kind'])
for c in ws[1]:
    c.font = Font(bold=True)
for r in rows:
    ws.append(r)
ws.freeze_panes = 'A2'
ws.auto_filter.ref = f'A1:D{len(rows) + 1}'
for col, width in zip('ABCD', (7, 34, 30, 18)):
    ws.column_dimensions[col].width = width
wb.save(out)
from collections import Counter
print(len(rows), 'rows', dict(Counter(r[3] for r in rows)), '| levels 1-500:', sum(r[0] <= 500 for r in rows))

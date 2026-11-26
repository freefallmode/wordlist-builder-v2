"""One row per theme, grouped by level, for Google Sheets or Excel.

Usage: python themes_table.py levels.json OUT_BASENAME
Writes OUT_BASENAME.xlsx (a bold summary row per level, its theme rows grouped under it so they
collapse and expand) and OUT_BASENAME.csv (the theme rows only, no grouping).
Columns: Level, Theme, Parent theme, Words, Split words (count), Special notes.
Text keeps the game's original case.
"""
import csv, json, sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill

src, base = sys.argv[1], sys.argv[2]
levels = json.load(open(src, encoding='utf-8'))
HEAD = ['Level', 'Theme', 'Parent theme', 'Words', 'Split words', 'Special notes']


def theme_row(lv, t):
    notes = []
    for x in t['words']:
        notes += [f"{x['word']}: {s}" for s in x.get('special', [])]
        if x.get('icon'):
            notes.append(f"{x['word']}: picture ({x['icon']})")
    return [lv['level'], t['theme'], t['parent'] or '', ', '.join(x['word'] for x in t['words']),
            sum(1 for x in t['words'] if x.get('split')), '; '.join(notes)]


def level_row(lv):
    note = f"~{lv['start_moves_est']} moves"
    if lv['chain_separator']:
        note += ', chain separator'
    return [lv['level'], f"{lv['themes_count']} themes", '', '', lv['split_words'], note]


def safe(v):
    # keep Sheets from reading text as a formula
    return "'" + v if isinstance(v, str) and v and v[0] in '=+-@' else v


wb = Workbook()
ws = wb.active
ws.title = 'Themes'
ws.append(HEAD)
for c in ws[1]:
    c.font = Font(bold=True)
ws.freeze_panes = 'A2'
ws.sheet_properties.outlinePr.summaryBelow = False   # the level row sits above its group
bold = Font(bold=True)
fill = PatternFill('solid', fgColor='E8EEF7')
n = 0
with open(base + '.csv', 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f)
    w.writerow(HEAD)
    for lv in levels:
        ws.append(level_row(lv))
        for c in ws[ws.max_row]:
            c.font, c.fill = bold, fill
        for t in lv['themes']:
            r = theme_row(lv, t)
            ws.append(r)
            ws.row_dimensions[ws.max_row].outline_level = 1
            w.writerow([safe(v) for v in r])
            n += 1
for col, width in zip('ABCDEF', (7, 28, 20, 55, 11, 60)):
    ws.column_dimensions[col].width = width
wb.save(base + '.xlsx')
print(len(levels), 'levels,', n, 'theme rows')

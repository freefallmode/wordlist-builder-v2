"""One row per theme, grouped by level, for Google Sheets or Excel.

Usage: python themes_table.py levels.json OUT_BASENAME
Writes OUT_BASENAME.xlsx (a bold summary row per level, its theme rows grouped under it so they
collapse and expand), OUT_BASENAME-averages.xlsx (the same plus a first sheet of per-level
averages: all levels, 1-500, 501-1800 and each block of 100) and OUT_BASENAME.csv (the theme rows only, no grouping).
Columns: Level, Theme, Parent theme, Words, Split words (count), Special notes.
Text keeps the game's original case.
"""
import csv, json, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill

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

# Second file: the same sheet plus an Averages sheet.
avg = wb.create_sheet('Averages', 0)
avg.append(['Levels', 'Levels in range', 'Themes per level (mean)', 'Themes (median)',
            'Levels with split words', 'Split words per level, where any (mean)',
            'Split words where any (median)', 'Split words per level, all levels (mean)'])
for c in avg[1]:
    c.font = bold


def stats(name, lv):
    t = [l['themes_count'] for l in lv]
    s = [l['split_words'] for l in lv]
    nz = [x for x in s if x]
    med = lambda xs: sorted(xs)[len(xs) // 2] if len(xs) % 2 else sum(sorted(xs)[len(xs) // 2 - 1:len(xs) // 2 + 1]) / 2
    avg.append([name, len(lv), round(sum(t) / len(t), 2), med(t), len(nz),
                round(sum(nz) / len(nz), 2), med(nz), round(sum(s) / len(s), 2)])


stats('All 1-1800', levels)
stats('1-500', levels[:500])
stats('501-1800', levels[500:])
for b in range(0, len(levels), 100):
    stats(f'{b + 1}-{b + 100}', levels[b:b + 100])
avg.insert_rows(5)
for col, width in zip('ABCDEFGH', (12, 10, 14, 10, 14, 18, 14, 18)):
    avg.column_dimensions[col].width = width
for c in avg[1]:
    c.alignment = Alignment(wrap_text=True, vertical='top')
wb.save(base + '-averages.xlsx')
print(len(levels), 'levels,', n, 'theme rows')

"""One row per theme, grouped by level, for Google Sheets or Excel.

Usage: python themes_table.py levels.json OUT_BASENAME
Writes OUT_BASENAME.xlsx (a bold summary row per level, its theme rows grouped under it so they
collapse and expand), OUT_BASENAME-averages.xlsx (the same plus a first sheet of per-level
averages: all levels, 1-500, 501-1800 and each block of 100) and OUT_BASENAME.csv (the theme
rows only, no grouping).

Columns: Level, Theme, Parent theme, Words, Split words, one count column per special bubble type,
Special notes. Text keeps the game's original case.
Special bubble counts:
  - Levels 1-500 place special bubbles on set words: each theme row counts its words of that type
    (Behind chain = words behind the chain separator), and the level row totals them.
  - Levels 501-1800 only switch a type on and give a min-max count; the game picks the words at
    load. The level row shows the range (e.g. "3-4"; "yes" for the chain separator) and the theme
    rows are left blank for those types.
"""
import csv, json, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill

src, base = sys.argv[1], sys.argv[2]
levels = json.load(open(src, encoding='utf-8'))

# (column header, levels.json random_specials key, prefix of the per-word 'special' note)
TYPES = [('Behind chain', 'chain separator', 'behind chain'), ('Cryptic', 'cryptic', 'cryptic'),
         ('Backward', 'backward', 'backward'), ('Frozen', 'frozen', 'frozen'), ('Burst', 'burst', 'burst'),
         ('Linked', 'linked', 'linked'), ('Key lock', 'key lock', 'locked'), ('Cracked', 'cracked', 'cracked'),
         ('Screw lock', 'screw lock', 'screw lock')]
HEAD = ['Level', 'Theme', 'Parent theme', 'Words', 'Split words'] + [t[0] for t in TYPES] + ['Special notes']


def theme_counts(t):
    return [sum(1 for x in t['words'] if any(s.startswith(p) for s in x.get('special', []))) for _, _, p in TYPES]


def theme_row(lv, t):
    notes = []
    for x in t['words']:
        notes += [f"{x['word']}: {s}" for s in x.get('special', [])]
        if x.get('icon'):
            notes.append(f"{x['word']}: picture ({x['icon']})")
    counts = theme_counts(t)
    rnd = lv.get('random_specials', {})
    counts = ['' if key in rnd else c for c, (_, key, _) in zip(counts, TYPES)]
    return ([lv['level'], t['theme'], t['parent'] or '', ', '.join(x['word'] for x in t['words']),
             sum(1 for x in t['words'] if x.get('split'))] + counts + ['; '.join(notes)])


def level_row(lv):
    rnd = lv.get('random_specials', {})
    totals = [sum(c) for c in zip(*(theme_counts(t) for t in lv['themes']))]
    cells = []
    for total, (_, key, _) in zip(totals, TYPES):
        if key in rnd:
            r = rnd[key]
            cells.append('yes' if r is None else (str(r[0]) if r[0] == r[1] else f'{r[0]}-{r[1]}'))
        else:
            cells.append(total)
    note = f"~{lv['start_moves_est']} moves"
    if lv['chain_separator']:
        note += ', chain separator'
    if rnd:
        note += '; special bubbles placed on random words when the level loads'
    return [lv['level'], f"{lv['themes_count']} themes", '', '', lv['split_words']] + cells + [note]


def safe(v):
    # keep Sheets from reading text as a formula
    return "'" + v if isinstance(v, str) and v and v[0] in '=+-@' else v


wb = Workbook()
ws = wb.active
ws.title = 'Themes'
ws.append(HEAD)
for c in ws[1]:
    c.font = Font(bold=True)
    c.alignment = Alignment(wrap_text=True, vertical='top')
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
widths = [7, 28, 20, 55, 8] + [8] * len(TYPES) + [60]
for i, width in enumerate(widths):
    ws.column_dimensions[ws.cell(1, i + 1).column_letter].width = width
wb.save(base + '.xlsx')

# Second file: the same sheet plus an Averages sheet.
avg = wb.create_sheet('Averages', 0)
avg.append(['Levels', 'Levels in range', 'Themes per level (mean)', 'Themes (median)',
            'Levels with split words', 'Split words per level, where any (mean)',
            'Split words where any (median)', 'Split words per level, all levels (mean)']
           + [h for name, _, _ in TYPES for h in (f'{name}: levels with any',
                                                 f'{name}: bubbles per level, where any (mean)')])
for c in avg[1]:
    c.font = bold


def type_counts(l):
    """Per type: the number of bubbles in the level, the midpoint of the random range for
    levels 501+, None when the level has the type but no count (random chain separator), 0 when none."""
    rnd = l.get('random_specials', {})
    totals = [sum(c) for c in zip(*(theme_counts(t) for t in l['themes']))]
    out = []
    for total, (_, key, _) in zip(totals, TYPES):
        if key in rnd:
            r = rnd[key]
            out.append(None if r is None else (r[0] + r[1]) / 2)
        else:
            out.append(total)
    return out


def stats(name, lv):
    t = [l['themes_count'] for l in lv]
    s = [l['split_words'] for l in lv]
    nz = [x for x in s if x]
    med = lambda xs: sorted(xs)[len(xs) // 2] if len(xs) % 2 else sum(sorted(xs)[len(xs) // 2 - 1:len(xs) // 2 + 1]) / 2
    row = [name, len(lv), round(sum(t) / len(t), 2), med(t), len(nz),
           round(sum(nz) / len(nz), 2), med(nz), round(sum(s) / len(s), 2)]
    per = list(zip(*(type_counts(l) for l in lv)))
    for col in per:
        has = [x for x in col if x != 0]
        nums = [x for x in has if x is not None]
        row += [len(has), round(sum(nums) / len(nums), 2) if nums else '']
    avg.append(row)


stats('All 1-1800', levels)
stats('1-500', levels[:500])
stats('501-1800', levels[500:])
for b in range(0, len(levels), 100):
    stats(f'{b + 1}-{b + 100}', levels[b:b + 100])
avg.insert_rows(5)
avg.append([])
avg.append(['Special-bubble means: levels 501+ place bubbles on random words; their count is taken as '
            'the middle of the level\'s min-max range. Random chain separators have no count, so they '
            'count in "levels with any" but not in the mean.'])
for i, width in enumerate([12, 10, 14, 10, 14, 18, 14, 18] + [12, 16] * len(TYPES)):
    avg.column_dimensions[avg.cell(1, i + 1).column_letter].width = width
for c in avg[1]:
    c.alignment = Alignment(wrap_text=True, vertical='top')
avg.freeze_panes = 'B2'

# Theme words sheet: every theme name once (case-insensitive), with all the words it uses across levels.
pools = {}
for lv in levels:
    for t in lv['themes']:
        key = ' '.join(t['theme'].lower().split())
        p = pools.setdefault(key, {'name': t['theme'], 'levels': [], 'words': {}})
        p['levels'].append(lv['level'])
        for x in t['words']:
            p['words'].setdefault(' '.join(x['word'].lower().split()), x['word'])
tw = wb.create_sheet('Theme words', 1)
tw.append(['Theme', 'Words', 'Levels used', 'First level', 'All words'])
for c in tw[1]:
    c.font = bold
for key in sorted(pools):
    p = pools[key]
    tw.append([safe(p['name']), len(p['words']), len(p['levels']), p['levels'][0],
               safe(', '.join(sorted(p['words'].values(), key=str.lower)))])
tw.freeze_panes = 'B2'
tw.auto_filter.ref = f'A1:E{len(pools) + 1}'
for col, width in zip('ABCDE', (30, 8, 8, 8, 120)):
    tw.column_dimensions[col].width = width
wb.save(base + '-averages.xlsx')
print(len(levels), 'levels,', n, 'theme rows')

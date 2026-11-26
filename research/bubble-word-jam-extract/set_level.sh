#!/bin/bash
# Edit Bubble Word Jam's own save file on a device (emulator or phone over USB debugging) for testing:
# jump to a level, set lives, hints and other boosters.
#
# Usage: bash set_level.sh LEVEL|-|restore [DEVICE] [--lives N|inf] [--hints N] [--magnets N] [--bubbles N]
#   LEVEL     the number shown in the game, e.g. 76; "-" leaves the level as it is
#   restore   put back this device's save from before the first edit
#   DEVICE    adb serial (adb devices); default emulator-5556; or set it with --device
#   --lives   current lives (the game's normal maximum is 5), or "inf" for unlimited lives for 30 days
#   --hints / --magnets / --bubbles   booster counts (Hint, Magnet, Extra Bubbles)
# Examples: bash set_level.sh 51 2B211JEGR02969 --lives inf --hints 20
#           bash set_level.sh - --hints 50
#
# Everything is in files/IDIPref.dat (plain JSON, no checksum): int_data gameLevel (counted from 0, so
# level 76 = 75), currentLives, totalHint, totalMagnet, totalBubbleBooster; bool_data hasInfinityLife with
# string_data infinityLifeEndTime (.NET ticks). The game is force-stopped first so it can't overwrite the
# edit, then relaunched. Each device's first edit backs up its whole save to save-backup/<DEVICE>/.
# The game may then offer its cloud save ("Load Data"): close that popup with X to keep the edit.
set -e
B="${ADB:-/c/Simon/Dev/Android/sdk/platform-tools/adb.exe}"
DEV=emulator-5556
LVL="$1"; shift || true
ARGS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --device) DEV="$2"; shift 2 ;;
    --lives|--hints|--magnets|--bubbles) ARGS+=("$1" "$2"); shift 2 ;;
    --*) echo "unknown option $1"; exit 1 ;;
    *) DEV="$1"; shift ;;
  esac
done
[ -n "$LVL" ] || { sed -n '5,10p' "$0"; exit 1; }
PKG=com.AppFore.BubbleWordJam
D=/sdcard/Android/data/$PKG/files
F=$D/IDIPref.dat
HERE="$(cd "$(dirname "$0")" && pwd)"
win() { cygpath -m "$1" 2>/dev/null || echo "$1"; }   # adb.exe and python need Windows paths under Git Bash
BK="$HERE/save-backup/$DEV"
TMP="$HERE/save-backup/tmp"
export MSYS_NO_PATHCONV=1
mkdir -p "$TMP" "$BK"

"$B" -s "$DEV" shell am force-stop $PKG
"$B" -s "$DEV" pull "$F" "$(win "$TMP/IDIPref.dat")" >/dev/null 2>&1
if [ ! -e "$BK/IDIPref.dat" ]; then
  for f in $("$B" -s "$DEV" shell ls $D | tr -d '\r' | grep '\.dat$'); do
    "$B" -s "$DEV" pull "$D/$f" "$(win "$BK/$f")" >/dev/null 2>&1
  done
  echo "backed up this device's save to $BK"
fi

if [ "$LVL" = restore ]; then
  cp "$BK/IDIPref.dat" "$TMP/IDIPref.dat"
  echo "restored IDIPref.dat from $BK"
else
  python - "$(win "$TMP/IDIPref.dat")" "$LVL" "${ARGS[@]}" <<'EOF'
import json, sys, time
p, lvl, opts = sys.argv[1], sys.argv[2], sys.argv[3:]
d = json.load(open(p, encoding='utf-8'))
i = d['int_data']
def show(k, new):
    print(f'{k} {i.get(k)} -> {new}')
    i[k] = new
if lvl != '-':
    n = int(lvl)
    print(f'game level {i["gameLevel"] + 1} -> {n}')
    i['gameLevel'], i['levelAttempt'] = n - 1, 1
keys = {'--hints': 'totalHint', '--magnets': 'totalMagnet', '--bubbles': 'totalBubbleBooster'}
for k, v in zip(opts[::2], opts[1::2]):
    if k == '--lives' and v == 'inf':
        # .NET ticks: 100 ns since 0001-01-01
        end = int((time.time() + 30 * 86400) * 10**7) + 621355968000000000
        d['bool_data']['hasInfinityLife'] = True
        d['string_data']['infinityLifeEndTime'] = str(end)
        print('unlimited lives for 30 days')
    elif k == '--lives':
        show('currentLives', int(v))
    else:
        show(keys[k], int(v))
json.dump(d, open(p, 'w', encoding='utf-8'), separators=(',', ':'), ensure_ascii=False)
EOF
fi
"$B" -s "$DEV" push "$(win "$TMP/IDIPref.dat")" "$F" >/dev/null 2>&1
rm -rf "$TMP"
"$B" -s "$DEV" shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
echo "relaunched on $DEV"

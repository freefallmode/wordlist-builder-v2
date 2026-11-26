#!/bin/bash
# Jump Bubble Word Jam on the emulator to a given game level, by editing the game's own save file.
# Usage: bash set_level.sh LEVEL [DEVICE]      (LEVEL is the number shown in the game, e.g. 76)
#        bash set_level.sh restore [DEVICE]    (put back the save from before the first jump)
# The level is the int "gameLevel" in files/IDIPref.dat (plain JSON, counted from 0, so level 76 = 75).
# The game is force-stopped first so it can't overwrite the edit, then relaunched.
set -e
B="${ADB:-/c/Simon/Dev/Android/sdk/platform-tools/adb.exe}"
DEV="${2:-emulator-5556}"
PKG=com.AppFore.BubbleWordJam
F=/sdcard/Android/data/$PKG/files/IDIPref.dat
HERE="$(cd "$(dirname "$0")" && pwd)"
win() { cygpath -m "$1" 2>/dev/null || echo "$1"; }   # adb.exe needs Windows paths under Git Bash
BK="$HERE/save-backup"
TMP="$BK/tmp"
export MSYS_NO_PATHCONV=1
mkdir -p "$TMP"

"$B" -s "$DEV" shell am force-stop $PKG
"$B" -s "$DEV" pull "$F" "$(win "$TMP/IDIPref.dat")" >/dev/null
if [ ! -e "$BK/IDIPref.dat" ]; then cp "$TMP/IDIPref.dat" "$BK/IDIPref.dat"; echo "backed up the original save to $BK"; fi

if [ "$1" = restore ]; then
  cp "$BK/IDIPref.dat" "$TMP/IDIPref.dat"
else
  python - "$(win "$TMP/IDIPref.dat")" "$1" <<'EOF'
import json, sys
p, lvl = sys.argv[1], int(sys.argv[2])
d = json.load(open(p, encoding='utf-8'))
old = d['int_data']['gameLevel']
d['int_data']['gameLevel'] = lvl - 1
d['int_data']['levelAttempt'] = 1
json.dump(d, open(p, 'w', encoding='utf-8'), separators=(',', ':'), ensure_ascii=False)
print(f'gameLevel {old} -> {lvl - 1} (game level {old + 1} -> {lvl})')
EOF
fi
"$B" -s "$DEV" push "$(win "$TMP/IDIPref.dat")" "$F" >/dev/null
rm -rf "$TMP"
"$B" -s "$DEV" shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
echo "relaunched"

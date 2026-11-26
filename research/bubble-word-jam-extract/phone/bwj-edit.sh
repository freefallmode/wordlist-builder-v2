#!/system/bin/sh
# Bubble Word Jam test edit, run on the phone itself as the adb "shell" user (through Shizuku's rish;
# the bwj command in Termux calls it). Plain adb from a computer works too:
#   adb shell sh /sdcard/bwj/bwj-edit.sh 81
# Sets the level, unlimited lives for 30 days (and 5 lives), and 99 of each booster (Hint, Magnet,
# Extra Bubbles) in the game's save, then relaunches the game.
# The first run keeps a copy of the original save at /sdcard/bwj/IDIPref.backup.dat.
L=$1
case "$L" in ''|*[!0-9]*) echo "usage: bwj LEVEL   (the level number shown in the game, e.g. 81)"; exit 1 ;; esac
PKG=com.AppFore.BubbleWordJam
F=/sdcard/Android/data/$PKG/files/IDIPref.dat
[ -f "$F" ] || { echo "no save file at $F: open the game once first"; exit 1; }

am force-stop $PKG   # so the game can't overwrite the edit
mkdir -p /sdcard/bwj
[ -f /sdcard/bwj/IDIPref.backup.dat ] || cp "$F" /sdcard/bwj/IDIPref.backup.dat
# unlimited lives end time, in .NET ticks (100 ns since 0001-01-01): now + 30 days, i.e.
# (unix seconds + 62135596800) * 10^7. The phone's shell only has 32-bit arithmetic, so the sum is
# done in two parts (above and below 10^4) and written out as digits.
T=$(( $(date +%s) + 30 * 86400 ))
LO=$(( 6800 + T % 10000 ))
HI=$(( 6213559 + T / 10000 + LO / 10000 ))
END="$HI$(printf %04d $((LO % 10000)))0000000"
sed -i \
  -e "s/\"gameLevel\":[0-9]*/\"gameLevel\":$((L - 1))/" \
  -e 's/"levelAttempt":[0-9]*/"levelAttempt":1/' \
  -e 's/"totalHint":[0-9]*/"totalHint":99/' \
  -e 's/"totalMagnet":[0-9]*/"totalMagnet":99/' \
  -e 's/"totalBubbleBooster":[0-9]*/"totalBubbleBooster":99/' \
  -e 's/"currentLives":[0-9]*/"currentLives":5/' \
  -e 's/"hasInfinityLife":false/"hasInfinityLife":true/' \
  -e "s/\"infinityLifeEndTime\":\"[0-9]*\"/\"infinityLifeEndTime\":\"$END\"/" \
  "$F"
if grep -q "\"gameLevel\":$((L - 1))[,}]" "$F" && grep -q '"totalHint":99' "$F" && grep -q '"totalMagnet":99' "$F" && grep -q '"hasInfinityLife":true' "$F"; then
  echo "level $L, unlimited lives, 99 hints, magnets and extra bubbles"
else
  echo "the edit did not take: the save's format may have changed"; exit 1
fi
monkey -p $PKG -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
echo "game relaunched. If it offers 'Load Data', close that with X (LOAD brings back the cloud level)."

#!/data/data/com.termux/files/usr/bin/sh
# One-time setup in Termux (needs storage access: termux-setup-storage):   sh /sdcard/bwj/install.sh
# Copies Shizuku's rish (a shell with adb rights, on the phone) into Termux, adds the bwj command, and
# adds home-screen buttons: ~/.shortcuts scripts, shown by the Termux widget (long-press the home screen,
# Widgets, Termux). Rerunning it is safe.
set -e
SRC=/sdcard/bwj
R="$HOME/.rish"
mkdir -p "$R"
cp "$SRC/rish" "$SRC/rish_shizuku.dex" "$R/"
sed -i 's/RISH_APPLICATION_ID="PKG"/RISH_APPLICATION_ID="com.termux"/' "$R/rish"
chmod 700 "$R/rish"
chmod 400 "$R/rish_shizuku.dex"   # Android 14+ won't load a writable dex
cat > "$PREFIX/bin/bwj" <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
# bwj LEVEL: jump Bubble Word Jam to LEVEL with unlimited lives and 99 hints (needs Shizuku running)
exec "$HOME/.rish/rish" -c "sh /sdcard/bwj/bwj-edit.sh $1"
EOF
chmod 700 "$PREFIX/bin/bwj"

# Widget buttons: the first level of each special bubble (set words), and the first random-special level.
S="$HOME/.shortcuts"
mkdir -p "$S"
rm -f "$S"/L[0-9]*
for b in "021 chain" "031 cryptic" "051 backward" "076 frozen" "081 burst" "101 linked" \
         "126 key lock" "151 cracked" "161 screw lock" "502 random specials"; do
  n=$(echo "${b%% *}" | sed 's/^0*//')   # the name is zero-padded so the buttons sort in level order
  printf '#!/data/data/com.termux/files/usr/bin/sh\nbwj %s\nsleep 2\n' "$n" > "$S/L$b"
done
# a button that asks for any level number
printf '#!/data/data/com.termux/files/usr/bin/sh\nprintf "Level: "\nread n\nbwj "$n"\nsleep 2\n' > "$S/Level..."
chmod 700 "$S"/*
echo "installed. Usage: bwj 81, or the Termux widget on the home screen"

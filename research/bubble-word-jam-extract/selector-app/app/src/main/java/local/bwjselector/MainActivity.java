package local.bwjselector;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Insets;
import android.graphics.Typeface;
import android.os.Bundle;
import android.text.Editable;
import android.text.InputType;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.inputmethod.EditorInfo;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import rikka.shizuku.Shizuku;

/**
 * Bubble Word Jam level selector for testing. Tap a level: the game's save is set to that level, with
 * unlimited lives and 99 of each booster, and the game relaunches. The edit is assets/bwj-edit.sh (the same
 * script as the Termux bwj command), run with adb-level rights through Shizuku.
 */
public class MainActivity extends Activity {
    private static final String SHIZUKU_PKG = "moe.shizuku.privileged.api";
    private static final String[] FILTERS = {"All levels", "First appearances", "chain", "cryptic",
            "backward", "frozen", "burst", "linked", "key lock", "cracked", "screw lock"};
    /** The game is A/B testing level variants: each install plays one set (see the README). */
    private static final String[] SET_NAMES = {"Original levels (Level_N)", "_ob levels (Level_N_ob)"};
    private static final String[] SET_FILES = {"levels-original.tsv", "levels-ob.tsv"};

    /** One line of assets/levels-*.tsv. */
    private static final class Level {
        int number, themes, split;
        String types, specials, isNew, names;
    }

    private final List<Level> all = new ArrayList<>();
    private final List<Level> shown = new ArrayList<>();
    private String script;
    private TextView status;
    private ListView list;
    private EditText number;
    private LevelAdapter adapter;
    private int pad;
    private int filterPos;

    private final Shizuku.OnBinderReceivedListener binderReceived = () -> runOnUiThread(this::updateStatus);
    private final Shizuku.OnBinderDeadListener binderDead = () -> runOnUiThread(this::updateStatus);
    private final Shizuku.OnRequestPermissionResultListener permissionResult =
            (code, result) -> runOnUiThread(this::updateStatus);

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        int set = getPreferences(MODE_PRIVATE).getInt("set", 0);
        try {
            script = new String(readAll(getAssets().open("bwj-edit.sh")), StandardCharsets.UTF_8);
        } catch (Exception e) {
            Toast.makeText(this, "Could not read the edit script: " + e, Toast.LENGTH_LONG).show();
        }
        loadLevels(set);
        pad = dp(16);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            Insets b = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.ime());
            v.setPadding(pad + b.left, pad + b.top, pad + b.right, b.bottom);
            return WindowInsets.CONSUMED;
        });

        status = new TextView(this);
        status.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        status.setPadding(0, dp(4), 0, dp(8));
        status.setOnClickListener(v -> onStatusTapped());
        root.addView(status);

        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        number = new EditText(this);
        number.setHint("Level 1-" + Math.max(all.size(), 1));
        number.setInputType(InputType.TYPE_CLASS_NUMBER);
        number.setImeOptions(EditorInfo.IME_ACTION_GO);
        number.setSingleLine(true);
        number.setOnEditorActionListener((v, id, e) -> {
            goToTyped();
            return true;
        });
        number.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence s, int a, int b, int c) {}
            public void onTextChanged(CharSequence s, int a, int b, int c) {}
            public void afterTextChanged(Editable s) { scrollToTyped(); }
        });
        row.addView(number, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        Button go = new Button(this);
        go.setText("Jump");
        go.setOnClickListener(v -> goToTyped());
        row.addView(go);
        root.addView(row);

        Spinner sets = new Spinner(this);
        ArrayAdapter<String> sa = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, SET_NAMES);
        sa.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        sets.setAdapter(sa);
        sets.setSelection(set);
        sets.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onItemSelected(AdapterView<?> p, View v, int pos, long id) {
                if (pos == getPreferences(MODE_PRIVATE).getInt("set", 0)) return;
                getPreferences(MODE_PRIVATE).edit().putInt("set", pos).apply();
                loadLevels(pos);
                applyFilter(filterPos);
            }
            public void onNothingSelected(AdapterView<?> p) {}
        });
        root.addView(sets);

        Spinner filter = new Spinner(this);
        ArrayAdapter<String> fa = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, FILTERS);
        fa.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        filter.setAdapter(fa);
        filter.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onItemSelected(AdapterView<?> p, View v, int pos, long id) { applyFilter(pos); }
            public void onNothingSelected(AdapterView<?> p) {}
        });
        root.addView(filter);

        list = new ListView(this);
        adapter = new LevelAdapter();
        list.setAdapter(adapter);
        list.setOnItemClickListener((p, v, pos, id) -> confirmJump(shown.get(pos).number));
        root.addView(list, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1));

        setContentView(root);
        applyFilter(0);

        Shizuku.addBinderReceivedListenerSticky(binderReceived);
        Shizuku.addBinderDeadListener(binderDead);
        Shizuku.addRequestPermissionResultListener(permissionResult);
        updateStatus();
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateStatus();
    }

    @Override
    protected void onDestroy() {
        Shizuku.removeBinderReceivedListener(binderReceived);
        Shizuku.removeBinderDeadListener(binderDead);
        Shizuku.removeRequestPermissionResultListener(permissionResult);
        super.onDestroy();
    }

    private void loadLevels(int set) {
        all.clear();
        try (BufferedReader r = new BufferedReader(new InputStreamReader(
                getAssets().open(SET_FILES[set]), StandardCharsets.UTF_8))) {
            String line;
            while ((line = r.readLine()) != null) {
                String[] f = line.split("\t", -1);
                if (f.length < 7) continue;
                Level l = new Level();
                l.number = Integer.parseInt(f[0]);
                l.types = f[1];
                l.specials = f[2];
                l.isNew = f[3];
                l.themes = Integer.parseInt(f[4]);
                l.split = Integer.parseInt(f[5]);
                l.names = f[6];
                all.add(l);
            }
        } catch (Exception e) {
            Toast.makeText(this, "Could not read the level list: " + e, Toast.LENGTH_LONG).show();
        }
    }

    private void applyFilter(int pos) {
        filterPos = pos;
        shown.clear();
        for (Level l : all) {
            if (pos == 0
                    || (pos == 1 && !l.isNew.isEmpty())
                    || (pos > 1 && Arrays.asList(l.types.split(",")).contains(FILTERS[pos]))) {
                shown.add(l);
            }
        }
        adapter.notifyDataSetChanged();
        scrollToTyped();
    }

    private int typed() {
        try {
            return Integer.parseInt(number.getText().toString().trim());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    /** Scroll the list to the typed level, or the nearest shown level after it. */
    private void scrollToTyped() {
        int n = typed();
        if (n < 1) return;
        for (int i = 0; i < shown.size(); i++) {
            if (shown.get(i).number >= n) {
                list.setSelection(i);
                return;
            }
        }
    }

    private void goToTyped() {
        int n = typed();
        if (n < 1 || n > all.size()) {
            Toast.makeText(this, "Type a level from 1 to " + all.size(), Toast.LENGTH_SHORT).show();
            return;
        }
        confirmJump(n);
    }

    private boolean shizukuReady() {
        return Shizuku.pingBinder() && Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED;
    }

    private void updateStatus() {
        if (status == null) return;
        if (!Shizuku.pingBinder()) {
            status.setText("Shizuku isn't running. Tap here to open Shizuku, then start it with Wireless debugging.");
        } else if (Shizuku.checkSelfPermission() != PackageManager.PERMISSION_GRANTED) {
            status.setText("Tap here to allow this app in Shizuku.");
        } else {
            status.setText("Ready. Tap a level: it also sets unlimited lives and 99 of each booster, then relaunches the game. Pick the level set this install plays (it depends on its A/B group).");
        }
    }

    private void onStatusTapped() {
        if (!Shizuku.pingBinder()) {
            Intent i = getPackageManager().getLaunchIntentForPackage(SHIZUKU_PKG);
            if (i != null) startActivity(i);
            else Toast.makeText(this, "Shizuku isn't installed", Toast.LENGTH_LONG).show();
        } else if (Shizuku.checkSelfPermission() != PackageManager.PERMISSION_GRANTED) {
            Shizuku.requestPermission(1);
        }
    }

    private void confirmJump(int level) {
        if (!shizukuReady()) {
            updateStatus();
            onStatusTapped();
            return;
        }
        Level l = all.get(level - 1);
        String msg = (l.specials.isEmpty() ? "No special bubbles." : l.specials)
                + "\n\nSets unlimited lives and 99 hints, magnets and extra bubbles, then relaunches Bubble Word Jam."
                + " If the game offers Load Data, close it with X.";
        new AlertDialog.Builder(this)
                .setTitle("Jump to level " + level + "?")
                .setMessage(msg)
                .setPositiveButton("Jump", (d, w) -> jump(level))
                .setNegativeButton("Cancel", null)
                .show();
    }

    private void jump(int level) {
        new Thread(() -> {
            String out;
            int code;
            try {
                Process p = newProcess(new String[]{"sh", "-c", script, "bwj", String.valueOf(level)});
                byte[] o = readAll(p.getInputStream());
                byte[] e = readAll(p.getErrorStream());
                code = p.waitFor();
                out = (new String(o, StandardCharsets.UTF_8) + new String(e, StandardCharsets.UTF_8)).trim();
            } catch (Throwable t) {
                code = -1;
                out = t.toString();
            }
            final int c = code;
            final String text = out;
            runOnUiThread(() -> {
                if (c == 0) {
                    Toast.makeText(this, "Level " + level + ": game relaunched", Toast.LENGTH_SHORT).show();
                } else {
                    new AlertDialog.Builder(this).setTitle("Jump failed")
                            .setMessage(text.isEmpty() ? "exit code " + c : text)
                            .setPositiveButton("OK", null).show();
                }
            });
        }).start();
    }

    /** Shizuku.newProcess is private in API 13 but still the simplest way to run a shell command. */
    private static Process newProcess(String[] cmd) throws Exception {
        Method m = Shizuku.class.getDeclaredMethod("newProcess", String[].class, String[].class, String.class);
        m.setAccessible(true);
        return (Process) m.invoke(null, cmd, null, null);
    }

    private static byte[] readAll(InputStream in) throws Exception {
        try (InputStream s = in) {
            ByteArrayOutputStream b = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            while ((n = s.read(buf)) > 0) b.write(buf, 0, n);
            return b.toByteArray();
        }
    }

    private int dp(int v) {
        return Math.round(v * getResources().getDisplayMetrics().density);
    }

    private final class LevelAdapter extends BaseAdapter {
        public int getCount() { return shown.size(); }
        public Object getItem(int i) { return shown.get(i); }
        public long getItemId(int i) { return shown.get(i).number; }

        public View getView(int i, View view, ViewGroup parent) {
            LinearLayout box;
            TextView head, sub;
            if (view == null) {
                box = new LinearLayout(MainActivity.this);
                box.setOrientation(LinearLayout.VERTICAL);
                box.setPadding(0, dp(10), 0, dp(10));
                head = new TextView(MainActivity.this);
                head.setTextSize(TypedValue.COMPLEX_UNIT_SP, 17);
                sub = new TextView(MainActivity.this);
                sub.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
                sub.setMaxLines(2);
                sub.setEllipsize(TextUtils.TruncateAt.END);
                sub.setAlpha(0.7f);
                box.addView(head);
                box.addView(sub);
            } else {
                box = (LinearLayout) view;
                head = (TextView) box.getChildAt(0);
                sub = (TextView) box.getChildAt(1);
            }
            Level l = shown.get(i);
            String h = "Level " + l.number + (l.specials.isEmpty() ? "" : "  ·  " + l.specials);
            if (!l.isNew.isEmpty()) h += "  ·  NEW: " + l.isNew;
            head.setText(h);
            head.setTypeface(l.isNew.isEmpty() ? Typeface.DEFAULT : Typeface.DEFAULT_BOLD);
            sub.setText(l.themes + " themes, " + l.split + " split  ·  " + l.names);
            return box;
        }
    }
}

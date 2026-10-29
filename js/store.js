// Saving and loading. Two places: an autosave in the browser (IndexedDB) and a project file you keep in git.
// The project file is JSON with one theme or entry per line, so diffs and merges stay readable.
import { newProject, entryDefaults, nowStamp } from './model.js';

const DB = 'wordlist-builder-v2';

function idb() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function kv(mode, fn) {
  const db = await idb();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', mode), st = tx.objectStore('kv'), rq = fn(st);
    tx.oncomplete = () => res(rq && rq.result);
    tx.onerror = () => rej(tx.error);
  });
}
export const loadLocal = async () => { try { const s = await kv('readonly', st => st.get('project')); return s ? parseProject(s) : null; } catch { return null; } };
export const saveLocal = P => kv('readwrite', st => st.put(serializeProject(P), 'project'));

// ---------- file format ----------

const DEFAULTS = entryDefaults();
function packEntry(e) {
  const o = {};
  for (const [k, v] of Object.entries(e)) {
    if (k === 'id' || k === 'text') continue;
    if (JSON.stringify(v) === JSON.stringify(DEFAULTS[k])) continue;
    o[k] = v;
  }
  return JSON.stringify({ id: e.id, text: e.text, ...o });
}
const packTheme = ({ geo, kind, ...t }) => JSON.stringify(t);

export function serializeProject(P) {
  const head = { schema: P.schema, lang: P.lang, lib: P.lib, nextId: P.nextId, settings: P.settings };
  return '{"project":' + JSON.stringify(head) + ',\n"themes":[\n' + P.themes.map(packTheme).join(',\n') + '\n],\n"entries":[\n' + P.entries.map(packEntry).join(',\n') + '\n]}\n';
}

export function parseProject(text) {
  const j = JSON.parse(text);
  if (!j.project || !j.themes) throw Error('Not a wordlist-builder project file.');
  const P = Object.assign(newProject(), j.project);
  P.settings = Object.assign(newProject().settings, j.project.settings);
  P.themes = j.themes.map(({ geo, kind, ...t }) => t);
  P.entries = j.entries.map(e => Object.assign(entryDefaults(), e));
  P.nextId = Math.max(P.nextId || 1, ...P.entries.map(e => e.id + 1), 1);
  return P;
}

// ---------- browser helpers ----------

export function download(name, text, type = 'application/json') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export function pickFile(accept) {
  return new Promise(res => {
    const i = document.createElement('input');
    i.type = 'file'; i.accept = accept;
    i.onchange = async () => res(i.files[0] ? { name: i.files[0].name, text: await i.files[0].text() } : null);
    i.click();
  });
}

// Version bump when a project file is written: lib.version +1 and modified = now (the library's own change counter).
export function stampSave(P) { P.lib.version++; P.lib.modified = nowStamp(); }

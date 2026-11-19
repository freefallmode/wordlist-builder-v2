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
// One connection per transaction, closed when it settles. An aborted transaction (quota exceeded) fires onabort, not always onerror, so both reject.
async function kv(mode, fn) {
  const db = await idb();
  return new Promise((res, rej) => {
    const fail = e => { db.close(); rej(e || Error('Browser storage transaction failed.')); };
    let tx, rq;
    try { tx = db.transaction('kv', mode); rq = fn(tx.objectStore('kv')); } catch (e) { try { tx && tx.abort(); } catch {} return fail(e); }
    const val = r => Array.isArray(r) ? r.map(val) : r && r.result;
    tx.oncomplete = () => { db.close(); res(val(rq)); };
    tx.onerror = () => fail(tx.error);
    tx.onabort = () => fail(tx.error || Error('Browser storage write was aborted.'));
  });
}
// The project text and the dirty flag (differs from the last project file) are written in one transaction so they cannot disagree.
// loadLocal: null when nothing is stored; { P, dirty } when it reads; throws when something is stored but cannot be read,
// with err.raw = the stored text when it was read but would not parse. A record from before the flag existed counts as dirty.
export async function loadLocal() {
  const [s, d] = await kv('readonly', st => [st.get('project'), st.get('dirty')]);
  if (s === undefined || s === null) return null;
  try { return { P: parseProject(s), dirty: d === undefined ? true : !!d }; }
  catch (e) { throw Object.assign(Error('The library stored in this browser could not be read: ' + e.message), { raw: typeof s === 'string' ? s : undefined }); }
}
export const saveLocal = (P, dirty) => { const s = serializeProject(P); return kv('readwrite', st => [st.put(s, 'project'), st.put(!!dirty, 'dirty')]); };

// ---------- file format ----------

const DEFAULTS = entryDefaults(), DEF_JSON = Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, JSON.stringify(v)]));
// Is v the default for k, as JSON? Plain values compare directly and empty arrays and objects by length, without writing them out (most fields are defaults: this was most of an 8 MB autosave).
const isDefault = (k, v) => {
  if (v === null || typeof v !== 'object') return v === DEFAULTS[k];
  const d = DEFAULTS[k];
  if (Array.isArray(v) && Array.isArray(d) && !v.length && !d.length) return true;
  if (d && typeof d === 'object' && !Array.isArray(d) && !Array.isArray(v) && !d.toJSON && !v.toJSON && !Object.keys(d).length) { for (const x in v) if (Object.hasOwn(v, x) && v[x] !== undefined && typeof v[x] !== 'function') return false; return true; }
  return JSON.stringify(v) === DEF_JSON[k];
};
function packEntry(e) {
  const o = {};
  for (const k in e) {
    if (!Object.hasOwn(e, k) || k === 'id' || k === 'text') continue;
    const v = e[k];
    if (isDefault(k, v)) continue;
    o[k] = v;
  }
  return JSON.stringify({ id: e.id, text: e.text, ...o });
}
const packTheme = t => JSON.stringify(t);

export function serializeProject(P) {
  const head = { schema: P.schema, lang: P.lang, lib: P.lib, nextId: P.nextId, settings: P.settings };
  return '{"project":' + JSON.stringify(head) + ',\n"themes":[\n' + P.themes.map(packTheme).join(',\n') + '\n],\n"entries":[\n' + P.entries.map(packEntry).join(',\n') + '\n]}\n';
}

export function parseProject(text) {
  const j = JSON.parse(text);
  if (!j.project || !j.themes) throw Error('Not a wordlist-builder project file.');
  const P = Object.assign(newProject(), j.project);
  P.settings = Object.assign(newProject().settings, j.project.settings);
  P.themes = j.themes.slice();
  P.entries = j.entries.map(e => Object.assign(entryDefaults(), e));
  let n = Math.max(P.nextId || 1, 1);
  for (const e of P.entries) if (e.id + 1 > n) n = e.id + 1;   // a loop, not Math.max(...entries): spreading overflows the stack above ~120,000 entries
  P.nextId = n;
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
    i.oncancel = () => res(null);   // otherwise a dialog button that picks a file stays disabled after Cancel
    i.click();
  });
}

// Version bump when a project file is written: lib.version +1 and modified = now (the library's own change counter).
// Word and theme difficulty are never stored: the export and the editor work them out from the ratings (see model.js).
export function stampSave(P) { P.lib.version++; P.lib.modified = nowStamp(); }

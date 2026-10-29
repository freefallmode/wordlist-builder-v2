// Small DOM helpers: element builder, dialogs, toasts.

// h('div.cls#id', { onclick, title }, child, 'text', ...) -> element. Falsy children are skipped; arrays are flattened.
export function h(sel, attrs, ...kids) {
  const m = sel.match(/^([a-z0-9]+)?((?:[.#][\w-]+)*)$/i);
  const el = document.createElement(m[1] || 'div');
  for (const p of (m[2].match(/[.#][\w-]+/g) || [])) p[0] === '.' ? el.classList.add(p.slice(1)) : (el.id = p.slice(1));
  if (attrs != null && (typeof attrs !== "object" || attrs instanceof Node || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === 'class') el.classList.add(...String(v).split(/\s+/).filter(Boolean));   // adds to the classes from the selector
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'value' || k === 'checked' || k === 'selected' || k === 'disabled' || k === 'indeterminate') el[k] = v;
    else if (k === 'data') Object.assign(el.dataset, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  const add = c => { if (Array.isArray(c)) c.forEach(add); else if (c !== false && c != null) el.append(c instanceof Node ? c : document.createTextNode(String(c))); };
  kids.forEach(add);
  return el;
}
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export function option(value, label, selected) { return h('option', { value, selected: selected }, label ?? value); }
export function select(values, current, attrs = {}) {
  const s = h('select', attrs);
  for (const v of values) { const [val, label] = Array.isArray(v) ? v : [v, v || '(none)']; s.append(h('option', { value: val }, label)); }
  s.value = current;
  return s;
}
export const check = (label, checked, attrs = {}) => h('label.chk', {}, h('input', { type: 'checkbox', checked, ...attrs }), ' ', label);
export const field = (label, control, hint) => h('label.field', {}, h('span.lab', label), control, hint && h('span.hint', hint));

// Modal dialog. `body` is a node; `buttons` is [{ label, primary, action: () => result | false | Promise }]. Returns when closed.
// An action returning false keeps the dialog open.
export function dialog(title, body, buttons = [{ label: 'Close' }], { wide = false, onopen } = {}) {
  return new Promise(resolve => {
    const d = h('dialog' + (wide ? '.wide' : ''));
    const st = h('div.st');
    const close = v => { d.close(); d.remove(); resolve(v); };
    d.append(h('h2', title), h('div.dbody', body), st, h('div.dbtns', buttons.map(b => h('button' + (b.primary ? '.primary' : ''), {
      type: 'button',
      onclick: async ev => {
        ev.target.disabled = true;
        try { const r = b.action ? await b.action(st) : true; if (r !== false) close(r === undefined ? true : r); }
        catch (e) { st.textContent = e.message; st.classList.add('err'); }
        finally { ev.target.disabled = false; }
      },
    }, b.label))));
    d.addEventListener('cancel', ev => { ev.preventDefault(); close(false); });
    document.body.append(d);
    d.showModal();
    if (onopen) onopen(d);
  });
}

let toastTimer;
export function toast(msg, err = false) {
  const t = $('#toast');
  t.textContent = msg; t.classList.toggle('err', err); t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), err ? 6000 : 2500);
}

export const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
export const plural = (n, w) => `${n.toLocaleString()} ${n === 1 ? w : w.endsWith('y') ? w.slice(0, -1) + 'ies' : w + 's'}`;
export const fmtBytes = n => n > 1e6 ? (n / 1e6).toFixed(2) + ' MB' : (n / 1e3).toFixed(0) + ' KB';

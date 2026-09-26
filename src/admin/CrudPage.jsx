import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

/**
 * Generic admin CRUD page (replaces PHP v_*.php + e_*.php pairs).
 * fields: [{ name, label, type: 'text'|'textarea'|'image', required }]
 * Minimal: one form + one responsive list that works on every screen.
 */
export default function CrudPage({ title, subtitle, endpoint, fields, columns }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = () => api.get(endpoint).then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); setForm({}); setEditing(null); }, [endpoint]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fields.forEach((f) => {
        if (f.type === 'image') { if (files[f.name]) fd.append(f.name === 'image' ? 'image' : 'img', files[f.name]); }
        else fd.append(f.name, form[f.name] || '');
      });
      if (editing) await api.put(`${endpoint}/${editing}`, fd);
      else await api.post(endpoint, fd);
      setMsg({ ok: true, text: 'Saved successfully!' });
      setForm({}); setFiles({}); setEditing(null);
      load();
    } catch (err) { setMsg({ ok: false, text: err.response?.data?.message || 'Save failed' }); }
  };

  const del = async (id) => {
    if (!confirm('Are you sure?')) return;
    await api.delete(`${endpoint}/${id}`);
    load();
  };

  const startEdit = (it) => {
    setEditing(it._id);
    const f = {};
    fields.forEach((fld) => { if (fld.type !== 'image') f[fld.name] = it[fld.name] || ''; });
    setForm(f);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const textCols = columns.filter((c) => !c.toLowerCase().includes('img') && c !== 'image');

  return (
    <div className="min-w-0 max-w-3xl">
      <h1 className="text-xl sm:text-2xl font-bold break-words">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      {msg && <div className={`my-3 border p-3 rounded-xl text-sm ${msg.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>{msg.text}</div>}

      <form onSubmit={submit} className="bg-white border rounded-2xl p-4 sm:p-5 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label className="text-sm font-semibold">{f.label}</label>
            {f.type === 'textarea'
              ? <textarea required={f.required && !editing} value={form[f.name] || ''} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} rows={3} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-base" />
              : f.type === 'image'
                ? <input type="file" accept="image/*" required={f.required && !editing} onChange={(e) => setFiles({ ...files, [f.name]: e.target.files[0] })} className="mt-1 w-full text-sm py-2" />
                : <input required={f.required && !editing} value={form[f.name] || ''} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-base" />}
          </div>
        ))}
        <div className="sm:col-span-2 flex flex-col xs:flex-row gap-2">
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-semibold w-full xs:w-auto">{editing ? 'Update' : 'Save'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({}); }} className="border px-4 py-2.5 rounded-xl w-full xs:w-auto">Cancel</button>}
        </div>
      </form>

      <div className="mt-4 space-y-2.5">
        {items.map((it) => {
          const thumb = textCols.length === columns.length
            ? (it.img || it.image)
            : (columns.map((c) => it[c] || '').find((v) => typeof v === 'string' && /\.(jpg|jpeg|png|webp|gif|svg)/i.test(v)) || it.img || it.image);
          return (
            <div key={it._id} className="bg-white border rounded-xl p-3 flex items-center gap-3">
              {thumb ? <img src={imgUrl(thumb)} className="h-12 w-14 object-cover rounded-lg shrink-0" alt="" /> : null}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{String(it[textCols[0]] ?? '—').slice(0, 80)}</div>
                {textCols[1] && <div className="text-xs text-slate-500 truncate">{String(it[textCols[1]] ?? '').slice(0, 100)}</div>}
              </div>
              <div className="flex gap-3 shrink-0 text-sm">
                <button onClick={() => startEdit(it)} className="text-emerald-700 font-medium">Edit</button>
                <button onClick={() => del(it._id)} className="text-red-600 font-medium">Delete</button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && <div className="bg-white border rounded-xl p-6 text-center text-slate-400 text-sm">No records yet.</div>}
      </div>
      {items.length > 0 && <div className="text-xs text-slate-400 mt-2">{items.length} record{items.length > 1 ? 's' : ''}</div>}
    </div>
  );
}

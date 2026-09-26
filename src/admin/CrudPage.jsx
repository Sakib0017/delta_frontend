import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

/**
 * Generic admin CRUD page (replaces PHP v_*.php + e_*.php pairs).
 * fields: [{ name, label, type: 'text'|'textarea'|'image', required }]
 */
export default function CrudPage({ title, subtitle, endpoint, fields, columns }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

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
      setMsg('Saved successfully!');
      setForm({}); setFiles({}); setEditing(null);
      load();
    } catch (err) { setMsg(err.response?.data?.message || 'Save failed'); }
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

  return (
    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold break-words">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      {msg && <div className="my-3 bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded text-sm">{msg}</div>}

      <form onSubmit={submit} className="bg-white border rounded-2xl p-4 sm:p-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="text-sm font-semibold">{f.label}</label>
            {f.type === 'textarea'
              ? <textarea required={f.required && !editing} value={form[f.name] || ''} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" />
              : f.type === 'image'
                ? <input type="file" accept="image/*" required={f.required && !editing} onChange={(e) => setFiles({ ...files, [f.name]: e.target.files[0] })} className="mt-1 w-full text-sm py-2" />
                : <input required={f.required && !editing} value={form[f.name] || ''} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" />}
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold w-full sm:w-auto">{editing ? 'Update' : 'Save'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({}); }} className="border px-4 py-2.5 rounded-lg w-full sm:w-auto">Cancel</button>}
        </div>
      </form>

      {/* Desktop table */}
      <div className="bg-white border rounded-2xl mt-4 sm:mt-6 overflow-x-auto hidden sm:block">
        <table className="w-full text-sm min-w-[560px]">
          <thead><tr className="bg-slate-50 text-left">{columns.map((c) => <th key={c} className="px-4 py-3 capitalize">{c}</th>)}<th className="px-4 py-3 text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((it) => (
              <tr key={it._id} className="border-t">
                {columns.map((c) => (
                  <td key={c} className="px-4 py-2 max-w-xs truncate">
                    {c.toLowerCase().includes('img') || c === 'image' ? (it[c] || it.img || it.image ? <img src={imgUrl(it[c] || it.img || it.image)} className="h-10 w-16 object-cover rounded" alt="" /> : '—') : String(it[c] ?? '').slice(0, 80)}
                  </td>
                ))}
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  <button onClick={() => startEdit(it)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => del(it._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-6 text-center text-slate-400 text-sm">No records yet.</div>}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden mt-4 space-y-3">
        {items.map((it) => {
          const thumb = columns.map((c) => it[c] || '').find((v) => typeof v === 'string' && /\.(jpg|jpeg|png|webp|gif|svg)/i.test(v)) || it.img || it.image;
          return (
            <div key={it._id} className="bg-white border rounded-xl p-3 flex gap-3">
              {thumb ? <img src={imgUrl(thumb)} className="h-14 w-16 object-cover rounded-lg shrink-0" alt="" /> : null}
              <div className="flex-1 min-w-0 text-sm">
                {columns.filter((c) => !c.toLowerCase().includes('img') && c !== 'image').slice(0, 2).map((c) => (
                  <div key={c} className="truncate"><span className="text-slate-400 capitalize text-xs">{c}: </span>{String(it[c] ?? '—').slice(0, 60)}</div>
                ))}
                <div className="mt-1.5 flex gap-4">
                  <button onClick={() => startEdit(it)} className="text-blue-600 font-medium">Edit</button>
                  <button onClick={() => del(it._id)} className="text-red-600 font-medium">Delete</button>
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && <div className="bg-white border rounded-xl p-6 text-center text-slate-400 text-sm">No records yet.</div>}
      </div>
    </div>
  );
}

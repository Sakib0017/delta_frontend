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
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      {msg && <div className="my-3 bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded text-sm">{msg}</div>}

      <form onSubmit={submit} className="bg-white border rounded-2xl p-5 mt-4 grid md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="text-sm font-semibold">{f.label}</label>
            {f.type === 'textarea'
              ? <textarea required={f.required && !editing} value={form[f.name] || ''} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2" />
              : f.type === 'image'
                ? <input type="file" accept="image/*" required={f.required && !editing} onChange={(e) => setFiles({ ...files, [f.name]: e.target.files[0] })} className="mt-1 w-full text-sm" />
                : <input required={f.required && !editing} value={form[f.name] || ''} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="mt-1 w-full border rounded-lg px-3 py-2" />}
          </div>
        ))}
        <div className="md:col-span-2 flex gap-2">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold">{editing ? 'Update' : 'Save'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({}); }} className="border px-4 py-2 rounded-lg">Cancel</button>}
        </div>
      </form>

      <div className="bg-white border rounded-2xl mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-slate-50 text-left">{columns.map((c) => <th key={c} className="px-4 py-3">{c}</th>)}<th className="px-4 py-3 text-right">Actions</th></tr></thead>
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
    </div>
  );
}

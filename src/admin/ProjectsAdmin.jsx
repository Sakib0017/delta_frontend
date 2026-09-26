import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

export const CATS = [
  ['climate', 'Building'],
  ['environ', 'Roads'],
  ['transportation', 'Environment'],
  ['agricultural', 'Water'],
  ['advisory', 'Digital'],
  ['engineering', 'Engineering'],
];

export default function ProjectsAdmin() {
  const [cat, setCat] = useState('climate');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ header: '', content: '' });
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = () => api.get(`/projects/${cat}`).then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, [cat]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('header', form.header); fd.append('content', form.content);
    if (file) fd.append('img', file);
    if (editing) await api.put(`/projects/${editing}`, fd);
    else await api.post(`/projects/${cat}`, fd);
    setForm({ header: '', content: '' }); setFile(null); setEditing(null);
    load();
  };

  return (
    <div className="min-w-0 max-w-3xl">
      <h1 className="text-xl sm:text-2xl font-bold">Projects</h1>
      <p className="text-sm text-slate-500 mt-1">Entries shown on the six service pages.</p>
      <div className="rail flex gap-2 mt-3 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
        {CATS.map(([v, l]) => (
          <button key={v} onClick={() => setCat(v)} aria-pressed={cat === v} className={`text-sm px-4 py-1.5 rounded-full border whitespace-nowrap shrink-0 transition ${cat === v ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white hover:border-emerald-300'}`}>{l}</button>
        ))}
      </div>
      <form onSubmit={submit} className="bg-white border rounded-2xl p-4 sm:p-5 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-semibold">Header</label><input required value={form.header} onChange={(e) => setForm({ ...form, header: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-base" /></div>
        <div><label className="text-sm font-semibold">Image {!editing && '(required)'}</label><input type="file" accept="image/*" required={!editing} onChange={(e) => setFile(e.target.files[0])} className="mt-1 w-full text-sm py-2" /></div>
        <div className="sm:col-span-2"><label className="text-sm font-semibold">Content</label><textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="mt-1 w-full border rounded-xl px-3 py-2.5 text-base" /></div>
        <div className="sm:col-span-2 flex flex-col xs:flex-row gap-2">
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-semibold w-full xs:w-auto">{editing ? 'Update' : 'Save'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ header: '', content: '' }); }} className="border px-4 py-2.5 rounded-xl w-full xs:w-auto">Cancel</button>}
        </div>
      </form>
      <div className="mt-4 space-y-2.5">
        {items.map((it) => (
          <div key={it._id} className="bg-white border rounded-xl p-3 flex items-center gap-3">
            {it.img ? <img src={imgUrl(it.img)} className="h-12 w-14 object-cover rounded-lg shrink-0" alt="" /> : null}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{it.header}</div>
              <div className="text-xs text-slate-500 truncate">{it.content}</div>
            </div>
            <div className="flex gap-3 shrink-0 text-sm">
              <button onClick={() => { setEditing(it._id); setForm({ header: it.header, content: it.content }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-emerald-700 font-medium">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await api.delete(`/projects/${it._id}`); load(); } }} className="text-red-600 font-medium">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="bg-white border rounded-xl p-6 text-center text-slate-400 text-sm">No items in this category yet.</div>}
      </div>
      {items.length > 0 && <div className="text-xs text-slate-400 mt-2">{items.length} record{items.length > 1 ? 's' : ''}</div>}
    </div>
  );
}

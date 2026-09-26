import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

export const CATS = [
  ['climate', 'Building & Infrastructure (climate)'],
  ['environ', 'Road & Transportation (environ)'],
  ['transportation', 'Environmental Assessment (transportation)'],
  ['agricultural', 'Water & Wastewater (agricultural)'],
  ['advisory', 'Digital Monitoring & Smart Systems (advisory)'],
  ['engineering', 'Engineering Design (engineering)'],
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
    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold">Projects</h1>
      <p className="text-sm text-slate-500 mt-1">Replaces PHP: climate / environ / transportation / agricultural / advisory / engineering tables.</p>
      <div className="flex gap-2 flex-wrap mt-3 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
        {CATS.map(([v, l]) => <button key={v} onClick={() => setCat(v)} className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap shrink-0 ${cat === v ? 'bg-slate-900 text-white border-slate-900' : 'bg-white'}`}>{l}</button>)}
      </div>
      <form onSubmit={submit} className="bg-white border rounded-2xl p-4 sm:p-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm font-semibold">Header</label><input required value={form.header} onChange={(e) => setForm({ ...form, header: e.target.value })} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" /></div>
        <div><label className="text-sm font-semibold">Image {!editing && '(required)'}</label><input type="file" accept="image/*" required={!editing} onChange={(e) => setFile(e.target.files[0])} className="mt-1 w-full text-sm py-2" /></div>
        <div className="md:col-span-2"><label className="text-sm font-semibold">Content</label><textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" /></div>
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg w-full sm:w-auto">{editing ? 'Update' : 'Save'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ header: '', content: '' }); }} className="border px-4 py-2.5 rounded-lg w-full sm:w-auto">Cancel</button>}
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
        {items.map((it) => (
          <div key={it._id} className="bg-white border rounded-xl p-3 sm:p-4 flex gap-3">
            <img src={imgUrl(it.img)} className="h-20 w-20 sm:w-28 object-cover rounded-lg shrink-0" alt="" />
            <div className="flex-1 min-w-0 text-sm"><div className="font-semibold line-clamp-2">{it.header}</div><div className="text-slate-600 line-clamp-3">{it.content}</div>
              <div className="mt-1"><button onClick={() => { setEditing(it._id); setForm({ header: it.header, content: it.content }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-blue-600 mr-3">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await api.delete(`/projects/${it._id}`); load(); } }} className="text-red-600">Delete</button></div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <div className="text-center text-slate-400 text-sm py-8">No items in this category yet.</div>}
    </div>
  );
}

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
    <div>
      <h1 className="text-2xl font-bold">Projects</h1>
      <p className="text-sm text-slate-500">Replaces PHP: climate / environ / transportation / agricultural / advisory / engineering tables.</p>
      <div className="flex gap-2 flex-wrap mt-3">
        {CATS.map(([v, l]) => <button key={v} onClick={() => setCat(v)} className={`text-xs px-3 py-1.5 rounded-full border ${cat === v ? 'bg-slate-900 text-white' : 'bg-white'}`}>{l}</button>)}
      </div>
      <form onSubmit={submit} className="bg-white border rounded-2xl p-5 mt-4 grid md:grid-cols-2 gap-4">
        <div><label className="text-sm font-semibold">Header</label><input required value={form.header} onChange={(e) => setForm({ ...form, header: e.target.value })} className="mt-1 w-full border rounded-lg px-3 py-2" /></div>
        <div><label className="text-sm font-semibold">Image {!editing && '(required)'}</label><input type="file" accept="image/*" required={!editing} onChange={(e) => setFile(e.target.files[0])} className="mt-1 w-full text-sm" /></div>
        <div className="md:col-span-2"><label className="text-sm font-semibold">Content</label><textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2" /></div>
        <div className="md:col-span-2 flex gap-2">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg">{editing ? 'Update' : 'Save'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ header: '', content: '' }); }} className="border px-4 py-2 rounded-lg">Cancel</button>}
        </div>
      </form>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {items.map((it) => (
          <div key={it._id} className="bg-white border rounded-xl p-4 flex gap-3">
            <img src={imgUrl(it.img)} className="h-20 w-28 object-cover rounded" alt="" />
            <div className="flex-1 text-sm"><div className="font-semibold">{it.header}</div><div className="text-slate-600 line-clamp-3">{it.content}</div>
              <div className="mt-1"><button onClick={() => { setEditing(it._id); setForm({ header: it.header, content: it.content }); }} className="text-blue-600 mr-3">Edit</button>
              <button onClick={async () => { if (confirm('Delete?')) { await api.delete(`/projects/${it._id}`); load(); } }} className="text-red-600">Delete</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

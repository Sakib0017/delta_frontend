import { useEffect, useState } from 'react';
import api from '../lib/api';

// Vision & Mission singleton editor (history table) + About page editor (about table)
export function VisionAdmin() {
  const [form, setForm] = useState({ vision: '', mission: '', contain: '', header: '' });
  const [id, setId] = useState(null);
  const [msg, setMsg] = useState('');
  useEffect(() => { api.get('/history').then((r) => { const l = r.data[0]; if (l) { setId(l._id); setForm({ vision: l.vision || '', mission: l.mission || '', contain: l.contain || '', header: l.header || '' }); } }).catch(() => {}); }, []);
  const save = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/history/${id}`, form);
    else { const r = await api.post('/history', form); setId(r.data._id); }
    setMsg('Saved!');
  };
  return (
    <form onSubmit={save} className="bg-white border rounded-2xl p-4 sm:p-5 space-y-4 max-w-3xl">
      <h1 className="text-xl sm:text-2xl font-bold">Vision &amp; Mission</h1>
      {msg && <div className="text-sm text-emerald-700">{msg}</div>}
      <div><label className="text-sm font-semibold">Intro (hs_contain)</label><textarea value={form.contain} onChange={(e) => setForm({ ...form, contain: e.target.value })} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" /></div>
      <div><label className="text-sm font-semibold">Vision</label><textarea value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} rows={4} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" /></div>
      <div><label className="text-sm font-semibold">Mission</label><textarea value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} rows={4} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" /></div>
      <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-semibold w-full sm:w-auto">Save</button>
    </form>
  );
}

export function AboutAdmin() {
  const [form, setForm] = useState({ content: '', eContent1: '', eContent2: '', chairmanName: '', chairmanEducation: '', chairmanSpeech: '', proDetail: '' });
  const [id, setId] = useState(null);
  const [msg, setMsg] = useState('');
  useEffect(() => { api.get('/about').then((r) => { const l = r.data[0]; if (l) { setId(l._id); setForm({ content: l.content || '', eContent1: l.eContent1 || '', eContent2: l.eContent2 || '', chairmanName: l.chairmanName || '', chairmanEducation: l.chairmanEducation || '', chairmanSpeech: l.chairmanSpeech || '', proDetail: l.proDetail || '' }); } }).catch(() => {}); }, []);
  const save = async (e) => {
    e.preventDefault();
    if (id) await api.put(`/about/${id}`, form);
    else { const r = await api.post('/about', form); setId(r.data._id); }
    setMsg('Saved!');
  };
  return (
    <form onSubmit={save} className="bg-white border rounded-2xl p-4 sm:p-5 space-y-4 max-w-3xl">
      <h1 className="text-xl sm:text-2xl font-bold">About Page Content</h1>
      {msg && <div className="text-sm text-emerald-700">{msg}</div>}
      {Object.entries({ content: 'Main content', eContent1: 'Extra content 1', eContent2: 'Extra content 2', chairmanName: 'Chairman name', chairmanEducation: 'Chairman education', chairmanSpeech: 'Chairman speech', proDetail: 'Project detail' }).map(([k, label]) => (
        <div key={k}><label className="text-sm font-semibold">{label}</label><textarea value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} rows={2} className="mt-1 w-full border rounded-lg px-3 py-2 text-base" /></div>
      ))}
      <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-semibold w-full sm:w-auto">Save</button>
    </form>
  );
}

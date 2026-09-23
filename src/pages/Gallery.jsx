import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

export default function Gallery() {
  const [cats, setCats] = useState([]);
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState('');

  useEffect(() => {
    api.get('/gallery/meta/categories').then((r) => { setCats(r.data); setTab(r.data[0] || ''); }).catch(() => {});
    api.get('/gallery').then((r) => setItems(r.data)).catch(() => {});
  }, []);

  const shown = items.filter((i) => !tab || i.header === tab);
  return (
    <div>
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="text-xs tracking-widest text-emerald-400">OUR WORK</div>
        <h1 className="text-4xl font-bold mt-2">Photo Gallery</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-6">
          {cats.map((c) => (
            <button key={c} onClick={() => setTab(c)} className={`px-4 py-1.5 rounded-full border text-sm ${tab === c ? 'bg-slate-900 text-white' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shown.map((g) => <img key={g._id} src={imgUrl(g.img)} alt={g.header} className="h-56 w-full object-cover rounded-lg" />)}
        </div>
      </section>
    </div>
  );
}

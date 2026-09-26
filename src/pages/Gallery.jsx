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
    <div className="overflow-x-hidden">
      <section className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-400">OUR WORK</div>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Photo Gallery</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-2 flex-wrap mb-5 sm:mb-6 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {cats.map((c) => (
            <button key={c} onClick={() => setTab(c)} className={`px-4 py-1.5 rounded-full border text-sm whitespace-nowrap shrink-0 transition ${tab === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-slate-100'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {shown.map((g) => <img key={g._id} src={imgUrl(g.img)} alt={g.header} loading="lazy" className="h-60 xs:h-48 sm:h-56 w-full object-cover rounded-lg" />)}
        </div>
        {shown.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No photos in this category yet.</p>}
      </section>
    </div>
  );
}

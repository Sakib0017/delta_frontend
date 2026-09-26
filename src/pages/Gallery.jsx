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
    <div className="overflow-x-clip">
      <section className="bg-emerald-50 border-b border-emerald-100 text-slate-900 py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-700 font-semibold">OUR WORK</div>
        <h1 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold mt-2 text-balance">Photo Gallery</h1>
      </section>
      <section className="mx-auto w-full max-w-6xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="rail flex gap-2 sm:flex-wrap mb-5 sm:mb-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {cats.map((c) => (
            <button key={c} onClick={() => setTab(c)} aria-pressed={tab === c} className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap shrink-0 transition ${tab === c ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white hover:bg-emerald-50 hover:border-emerald-200'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
          {shown.map((g) => <img key={g._id} src={imgUrl(g.img)} alt={g.header} loading="lazy" className="h-60 xs:h-48 sm:h-56 w-full object-cover rounded-lg aspect-[4/3]" />)}
        </div>
        {shown.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No photos in this category yet.</p>}
      </section>
    </div>
  );
}

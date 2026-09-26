import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Vision() {
  const [h, setH] = useState(null);
  useEffect(() => { api.get('/history/meta/latest').then((r) => setH(r.data)).catch(() => {}); }, []);
  return (
    <div className="overflow-x-clip">
      <section className="bg-emerald-50 border-b border-emerald-100 text-slate-900 py-12 sm:py-16 lg:py-20 2xl:py-24 text-center px-4 sm:px-6">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-700 font-semibold">OUR DIRECTION</div>
        <h1 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold mt-2 text-balance">Vision &amp; Mission</h1>
      </section>
      <section className="mx-auto w-full max-w-4xl 2xl:max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <p className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed">{h?.contain || 'No history content available right now.'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
          <div className="border rounded-xl p-4 sm:p-5 bg-white"><h3 className="font-bold">Vision</h3><p className="text-sm whitespace-pre-line mt-1 leading-relaxed text-slate-600">{h?.vision || '—'}</p></div>
          <div className="border rounded-xl p-4 sm:p-5 bg-white"><h3 className="font-bold">Mission</h3><p className="text-sm whitespace-pre-line mt-1 leading-relaxed text-slate-600">{h?.mission || '—'}</p></div>
        </div>
      </section>
    </div>
  );
}

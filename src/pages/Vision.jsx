import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Vision() {
  const [h, setH] = useState(null);
  useEffect(() => { api.get('/history/meta/latest').then((r) => setH(r.data)).catch(() => {}); }, []);
  return (
    <div className="overflow-x-hidden">
      <section className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-400">OUR DIRECTION</div>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Vision &amp; Mission</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <p className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed">{h?.contain || 'No history content available right now.'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-6">
          <div className="border rounded-xl p-4 sm:p-5 bg-white"><h3 className="font-bold">Vision</h3><p className="text-sm whitespace-pre-line mt-1 leading-relaxed text-slate-600">{h?.vision || '—'}</p></div>
          <div className="border rounded-xl p-4 sm:p-5 bg-white"><h3 className="font-bold">Mission</h3><p className="text-sm whitespace-pre-line mt-1 leading-relaxed text-slate-600">{h?.mission || '—'}</p></div>
        </div>
      </section>
    </div>
  );
}

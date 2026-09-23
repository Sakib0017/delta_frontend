import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Vision() {
  const [h, setH] = useState(null);
  useEffect(() => { api.get('/history/meta/latest').then((r) => setH(r.data)).catch(() => {}); }, []);
  return (
    <div>
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="text-xs tracking-widest text-emerald-400">OUR DIRECTION</div>
        <h1 className="text-4xl font-bold mt-2">Vision & Mission</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-slate-700 whitespace-pre-line">{h?.contain || 'No history content available right now.'}</p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="border rounded-xl p-5"><h3 className="font-bold">Vision</h3><p className="text-sm whitespace-pre-line mt-1">{h?.vision || '—'}</p></div>
          <div className="border rounded-xl p-5"><h3 className="font-bold">Mission</h3><p className="text-sm whitespace-pre-line mt-1">{h?.mission || '—'}</p></div>
        </div>
      </section>
    </div>
  );
}

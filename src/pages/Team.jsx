import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  useEffect(() => { api.get('/team').then((r) => setTeam(r.data)).catch(() => {}); }, []);
  return (
    <div className="overflow-x-hidden">
      <section className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-400">WHO WE ARE</div>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Our Management Team</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {team.map((m) => (
          <article key={m._id} className="border rounded-xl overflow-hidden bg-white flex flex-col">
            <img src={imgUrl(m.img)} alt={m.name} loading="lazy" className="h-64 sm:h-60 lg:h-64 w-full object-cover object-top" />
            <div className="p-4 flex-1">
              <h3 className="font-bold text-[15px] sm:text-base">{m.name}</h3>
              <div className="text-emerald-700 text-sm">{m.description}</div>
              <p className="text-sm text-slate-600 whitespace-pre-line mt-1 leading-relaxed">{m.content}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

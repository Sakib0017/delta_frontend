import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  useEffect(() => { api.get('/team').then((r) => setTeam(r.data)).catch(() => {}); }, []);
  return (
    <div className="overflow-x-clip">
      <section className="bg-emerald-50 border-b border-emerald-100 text-slate-900 py-12 sm:py-16 lg:py-20 2xl:py-24 text-center px-4 sm:px-6">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-700 font-semibold">WHO WE ARE</div>
        <h1 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold mt-2 text-balance">Our Management Team</h1>
      </section>
      <section className="mx-auto w-full max-w-6xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {team.map((m) => (
          <article key={m._id} className="border rounded-xl overflow-hidden bg-white flex flex-col">
            <img src={imgUrl(m.img)} alt={m.name} loading="lazy" className="h-64 xs:h-56 sm:h-60 lg:h-64 w-full object-cover object-top aspect-[3/4]" />
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

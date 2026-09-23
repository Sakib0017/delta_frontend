import { useEffect, useState } from 'react';
import api, { imgUrl } from '../lib/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  useEffect(() => { api.get('/team').then((r) => setTeam(r.data)).catch(() => {}); }, []);
  return (
    <div>
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="text-xs tracking-widest text-emerald-400">WHO WE ARE</div>
        <h1 className="text-4xl font-bold mt-2">Our Management Team</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((m) => (
          <article key={m._id} className="border rounded-xl overflow-hidden bg-white">
            <img src={imgUrl(m.img)} alt={m.name} className="h-64 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{m.name}</h3>
              <div className="text-emerald-700 text-sm">{m.description}</div>
              <p className="text-sm text-slate-600 whitespace-pre-line mt-1">{m.content}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

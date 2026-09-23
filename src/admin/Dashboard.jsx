import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export default function Dashboard() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get('/stats').then((r) => setS(r.data)).catch(() => {}); }, []);
  if (!s) return <div>Loading dashboard…</div>;
  const cards = [
    ['Sliders', s.sliders, '/admin/sliders'], ['Core Services', s.services, '/admin/services'],
    ['Partners', s.partners, '/admin/partners'], ['News', s.news, '/admin/news'],
    ['Messages', s.messages, '/admin/messages'], ['Team', s.team, '/admin/team'],
    ['Gallery', s.gallery, '/admin/gallery'], ['Key Areas', s.keys, '/admin/keys'],
    ['Project Items', s.projects, '/admin/projects'], ['Admin Users', s.users, '/admin/members'],
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-500">Overview of all content (converted from PHP admin).</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {cards.map(([label, n, to]) => (
          <Link key={label} to={to} className="bg-white border rounded-xl p-5 hover:shadow">
            <div className="text-3xl font-extrabold">{n}</div>
            <div className="text-sm text-slate-600">{label}</div>
          </Link>
        ))}
      </div>
      <div className="bg-white border rounded-xl mt-6 p-5">
        <div className="font-bold mb-3">Latest messages</div>
        {(s.latestMessages || []).map((m) => (
          <div key={m._id} className="text-sm border-b py-2"><strong>{m.firstName} {m.lastName}</strong> — {m.subject} <span className="text-slate-500">({m.email})</span></div>
        ))}
      </div>
    </div>
  );
}

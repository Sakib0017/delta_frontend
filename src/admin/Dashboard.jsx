import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const GROUPS = [
  { label: 'Homepage', cards: [['Sliders', 'sliders', '/admin/sliders'], ['Core Services', 'services', '/admin/services'], ['Partners', 'partners', '/admin/partners'], ['News', 'news', '/admin/news']] },
  { label: 'Company', cards: [['Key Areas', 'keys', '/admin/keys'], ['Team', 'team', '/admin/team'], ['Gallery', 'gallery', '/admin/gallery']] },
  { label: 'Work & Inquiries', cards: [['Project Items', 'projects', '/admin/projects'], ['Messages', 'messages', '/admin/messages']] },
  { label: 'System', cards: [['Members', 'members', '/admin/members'], ['Miscellaneous', 'misc', '/admin/misc'], ['Admin Users', 'users', null]] },
];

export default function Dashboard() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get('/stats').then((r) => setS(r.data)).catch(() => {}); }, []);
  if (!s) return <div className="text-sm sm:text-base p-2">Loading dashboard…</div>;
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-500 mt-1">Overview of all content. Pick a section to manage it.</p>
      {GROUPS.map((g) => (
        <div key={g.label} className="mt-5 sm:mt-6">
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">{g.label}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 2xl:gap-5">
            {g.cards.map(([label, key, to]) => {
              const body = (
                <>
                  <div className="text-2xl sm:text-3xl font-extrabold">{s[key] ?? 0}</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1">{label}</div>
                </>
              );
              return to ? (
                <Link key={label} to={to} className="bg-white border rounded-xl p-4 sm:p-5 hover:shadow hover:border-emerald-200 transition">{body}</Link>
              ) : (
                <div key={label} title="Login accounts (managed via registration)" className="bg-white border border-dashed rounded-xl p-4 sm:p-5">{body}</div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="bg-white border rounded-xl mt-5 sm:mt-6 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-[15px] sm:text-base">Latest messages</div>
          <Link to="/admin/messages" className="text-sm text-emerald-700 font-medium">View all →</Link>
        </div>
        {(s.latestMessages || []).map((m) => (
          <div key={m._id} className="text-sm border-b last:border-0 py-2 break-words"><strong>{m.firstName} {m.lastName}</strong> — {m.subject} <span className="text-slate-500 break-all">({m.email})</span></div>
        ))}
        {(s.latestMessages || []).length === 0 && <div className="text-sm text-slate-400">No messages yet.</div>}
      </div>
    </div>
  );
}

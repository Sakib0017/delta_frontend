import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import api from '../lib/api';

const LINKS = [
  ['/admin', 'Dashboard'],
  ['/admin/sliders', 'Slider'],
  ['/admin/services', 'Core Services'],
  ['/admin/partners', 'Corporate Partner'],
  ['/admin/news', 'Latest News'],
  ['/admin/messages', 'Messages'],
  ['/admin/keys', 'About Us (Keys)'],
  ['/admin/vision', 'Vision & Mission'],
  ['/admin/team', 'Team'],
  ['/admin/gallery', 'Gallery'],
  ['/admin/projects', 'Projects'],
  ['/admin/about', 'About Page'],
  ['/admin/members', 'Members'],
  ['/admin/misc', 'Miscellaneous'],
];

export default function AdminLayout() {
  const nav = useNavigate();
  const loc = useLocation();
  const [drawer, setDrawer] = useState(false);
  const user = JSON.parse(localStorage.getItem('delta_user') || 'null');

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch (e) {}
    localStorage.removeItem('delta_token');
    localStorage.removeItem('delta_user');
    nav('/admin/login');
  };

  useEffect(() => { setDrawer(false); }, [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer ]);

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden lg:block shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="font-bold text-slate-800 mb-4 text-sm leading-snug">DELTA International Corporate (BD)</div>
        <nav className="flex flex-col gap-1 text-sm">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`}>{label}</NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-4 w-full bg-slate-900 text-white rounded py-2 text-sm">Logout</button>
      </aside>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setDrawer(false)}>
          <div className="bg-white w-72 max-w-[85vw] h-full p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-slate-800 text-sm">DELTA Admin</div>
              <button onClick={() => setDrawer(false)} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-xl">✕</button>
            </div>
            <nav className="flex flex-col gap-1 text-sm">
              {LINKS.map(([to, label]) => (
                <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => `px-3 py-2.5 rounded-lg ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`}>{label}</NavLink>
              ))}
            </nav>
            <button onClick={logout} className="mt-4 w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm">Logout</button>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="min-h-16 bg-white border-b flex items-center justify-between gap-3 px-3 sm:px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={() => setDrawer(true)} aria-label="Open menu" className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-xl shrink-0">☰</button>
            <Link to="/" className="text-sm text-slate-500 whitespace-nowrap">← <span className="hidden sm:inline">View Website</span><span className="sm:hidden">Site</span></Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-sm min-w-0">
            <span className="font-semibold truncate max-w-[120px] sm:max-w-none">{user?.fullname || 'Administrator'}</span>
            <button onClick={logout} className="bg-slate-900 text-white px-3 py-1.5 rounded text-xs whitespace-nowrap shrink-0">Logout</button>
          </div>
        </header>
        <main className="p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full"><Outlet /></main>
      </div>
    </div>
  );
}

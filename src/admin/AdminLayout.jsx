import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
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
  const user = JSON.parse(localStorage.getItem('delta_user') || 'null');

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch (e) {}
    localStorage.removeItem('delta_token');
    localStorage.removeItem('delta_user');
    nav('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r p-4 hidden lg:block">
        <div className="font-bold text-slate-800 mb-4">DELTA International Corporate (BD)</div>
        <nav className="flex flex-col gap-1 text-sm">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`}>{label}</NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-4 w-full bg-slate-900 text-white rounded py-2 text-sm">Logout</button>
      </aside>
      <div className="flex-1">
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0">
          <Link to="/" className="text-sm text-slate-500">← View Website</Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold">{user?.fullname || 'Administrator'}</span>
            <button onClick={logout} className="bg-slate-900 text-white px-3 py-1.5 rounded text-xs">Logout</button>
          </div>
        </header>
        <main className="p-4 sm:p-8"><Outlet /></main>
      </div>
    </div>
  );
}

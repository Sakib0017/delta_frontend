import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import api from '../lib/api';

const GROUPS = [
  {
    label: null,
    links: [['/admin', 'Dashboard']],
  },
  {
    label: 'Homepage',
    links: [
      ['/admin/sliders', 'Slider'],
      ['/admin/services', 'Core Services'],
      ['/admin/partners', 'Corporate Partner'],
      ['/admin/news', 'Latest News'],
    ],
  },
  {
    label: 'Company',
    links: [
      ['/admin/keys', 'About Us (Keys)'],
      ['/admin/vision', 'Vision & Mission'],
      ['/admin/about', 'About Page'],
      ['/admin/team', 'Team'],
      ['/admin/gallery', 'Gallery'],
    ],
  },
  {
    label: 'Work & Inquiries',
    links: [
      ['/admin/projects', 'Projects'],
      ['/admin/messages', 'Messages'],
    ],
  },
  {
    label: 'System',
    links: [
      ['/admin/members', 'Members'],
      ['/admin/misc', 'Miscellaneous'],
      ['/admin/password', 'Change Password'],
    ],
  },
];

const linkCls = ({ isActive }) =>
  `block px-3 py-2 rounded ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`;

const mLinkCls = ({ isActive }) =>
  `block px-3 py-2.5 rounded-lg ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`;

function isCurrent(to, pathname) {
  return to === '/admin' ? pathname === '/admin' : pathname === to || pathname.startsWith(`${to}/`);
}

function GroupedNav({ className, itemClass, scrollKey }) {
  const { pathname } = useLocation();
  const activeRef = useRef(null);

  // Keep the active item visible when the menu scrolls (short / landscape screens)
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' });
  }, [scrollKey, pathname]);

  return (
    <nav className={className} aria-label="Admin sections">
      {GROUPS.map((g) => (
        <div key={g.label || 'top'}>
          {g.label && <div className="px-3 pt-3 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">{g.label}</div>}
          {g.links.map(([to, label]) => (
            <NavLink key={to} ref={isCurrent(to, pathname) ? activeRef : null} to={to} end={to === '/admin'} className={itemClass}>{label}</NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default function AdminLayout() {
  const nav = useNavigate();
  const loc = useLocation();
  const [drawer, setDrawer] = useState(false);
  const user = JSON.parse(localStorage.getItem('delta_user') || 'null');
  const openBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const firstRender = useRef(true);

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch (e) {}
    localStorage.removeItem('delta_token');
    localStorage.removeItem('delta_user');
    nav('/admin/login');
  };

  useEffect(() => { setDrawer(false); }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setDrawer(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [drawer ]);

  // Move focus into the drawer on open, back to the hamburger on close
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (drawer) closeBtnRef.current?.focus();
    else openBtnRef.current?.focus();
  }, [drawer ]);

  return (
    <div className="min-h-svh bg-slate-100 flex overflow-x-clip">
      {/* Fixed sidebar — desktop & landscape tablets */}
      <aside className="w-64 xl:w-72 bg-white border-r p-4 hidden lg:flex flex-col shrink-0 sticky top-0 h-svh overflow-y-auto overscroll-contain">
        <div className="font-bold text-slate-800 mb-2 text-sm leading-snug shrink-0">DELTA International Corporate (BD)</div>
        <GroupedNav key="side" scrollKey="side" className="flex flex-col gap-0.5 text-sm flex-1 min-h-0" itemClass={linkCls} />
        <button onClick={logout} className="mt-4 w-full shrink-0 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-2 text-sm font-medium">Logout</button>
      </aside>

      {/* Slide-in drawer — phones & portrait tablets */}
      {drawer && (
        <div className="drawer-backdrop fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setDrawer(false)} role="dialog" aria-modal="true" aria-label="Admin menu">
          <div className="drawer-panel bg-white w-72 xs:w-80 max-w-[85vw] h-svh ml-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2 shrink-0">
              <div className="font-bold text-slate-800 text-sm">DELTA Admin</div>
              <button ref={closeBtnRef} onClick={() => setDrawer(false)} aria-label="Close menu" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-xl">✕</button>
            </div>
            <GroupedNav key="drawer" scrollKey="drawer" className="flex flex-col gap-0.5 text-sm flex-1 min-h-0" itemClass={mLinkCls} />
            <button onClick={logout} className="mt-4 w-full shrink-0 bg-emerald-700 text-white rounded-xl py-2.5 text-sm font-medium">Logout</button>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="min-h-16 bg-white border-b flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-6 py-3 sticky top-0 z-30">
          <div className="flex items-center gap-2 min-w-0">
            <button ref={openBtnRef} onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-xl shrink-0">☰</button>
            <Link to="/" className="text-sm text-slate-500 whitespace-nowrap">← <span className="hidden sm:inline">View Website</span><span className="sm:hidden">Site</span></Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-sm min-w-0">
            <span className="font-semibold truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">{user?.fullname || 'Administrator'}</span>
            <button onClick={logout} className="border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 font-medium">Logout</button>
          </div>
        </header>
        <main className="p-3 sm:p-6 lg:p-8 2xl:p-10 mx-auto w-full max-w-6xl 2xl:max-w-[1440px]"><Outlet /></main>
      </div>
    </div>
  );
}

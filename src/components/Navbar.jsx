import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import api from '../lib/api';

export default function Navbar() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  const [mAbout, setMAbout] = useState(false);
  const [mSvc, setMSvc] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data)).catch(() => {});
  }, []);

  // Close mobile menu on route change + lock body scroll when open + Esc to close
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open ]);

  const linkCls = ({ isActive }) =>
    `hover:text-emerald-700 transition ${isActive ? 'text-emerald-700 font-semibold' : ''}`;

  return (
    <>
      {/* Top bar — light */}
      <div className="bg-emerald-50 border-b border-emerald-100 text-slate-700 text-xs sm:text-sm">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-3 sm:px-4 lg:px-6 py-2 flex flex-wrap gap-x-3 gap-y-1 justify-between items-center">
          <a href="tel:01981623105" className="truncate min-w-0">
            <span className="hidden xs:inline">Head Office: </span>
            <strong>01981623105</strong>
            <span className="hidden sm:inline"> · Support 24/7</span>
          </a>
          <Link to="/admin/login" className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap shrink-0">
            Portal Login
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="font-extrabold text-[15px] xs:text-base sm:text-lg leading-tight min-w-0">
            <span className="block xs:inline truncate">DELTA International</span>{' '}
            <span className="text-emerald-700 text-[10px] sm:text-xs font-medium whitespace-nowrap">
              Dev Corp (BD) — Estd. 2020
            </span>
          </Link>

          {/* Desktop nav — lg+ only so tablets (768–1023px) get the roomy drawer */}
          <nav className="hidden lg:flex gap-5 xl:gap-6 text-sm font-medium items-center">
            <NavLink to="/" className={linkCls}>Home</NavLink>
            <div className="relative" onMouseEnter={() => setDrop('about')} onMouseLeave={() => setDrop(null)}>
              <button className="py-3 px-1" aria-haspopup="true" aria-expanded={drop === 'about'}>About ▾</button>
              {drop === 'about' && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg p-2 w-48 flex flex-col border z-50">
                  <Link to="/about" className="px-3 py-2 rounded hover:bg-slate-100">Our Company</Link>
                  <Link to="/vision" className="px-3 py-2 rounded hover:bg-slate-100">Vision &amp; Mission</Link>
                  <Link to="/team" className="px-3 py-2 rounded hover:bg-slate-100">Our Team</Link>
                  <Link to="/gallery" className="px-3 py-2 rounded hover:bg-slate-100">Gallery</Link>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setDrop('svc')} onMouseLeave={() => setDrop(null)}>
              <button className="py-3 px-1" aria-haspopup="true" aria-expanded={drop === 'svc'}>Services ▾</button>
              {drop === 'svc' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-lg rounded-lg p-2 w-72 flex flex-col max-h-96 overflow-auto border z-50">
                  <Link to="/services" className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold mb-1 text-center">View All Services</Link>
                  {services.map((s) => (
                    <Link key={s._id} to={s.links?.startsWith('/') ? s.links : `/services/${slugOf(s.links)}`} className="px-3 py-2 rounded hover:bg-slate-100 text-sm">{s.content}</Link>
                  ))}
                  <hr className="my-1" />
                  <Link to="/services/building" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Building &amp; Infrastructure</Link>
                  <Link to="/services/road" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Road &amp; Transportation</Link>
                  <Link to="/services/environment" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Environmental Assessment</Link>
                  <Link to="/services/water" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Water &amp; Wastewater</Link>
                  <Link to="/services/digital" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Digital Monitoring &amp; Smart Systems</Link>
                  <Link to="/services/engineering" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Engineering Design</Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-lg whitespace-nowrap">Consult Us</Link>
          </nav>

          {/* Hamburger — everything below lg (phones + tablets) */}
          <button
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 text-2xl leading-none w-11 h-11 flex items-center justify-center shrink-0"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile / tablet drawer — full-screen overlay so it works at any header height */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Site menu">
          <div
            className="bg-white shadow-xl h-full h-svh overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-1 text-[15px] w-[88vw] max-w-sm ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm">DELTA International</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-xl">✕</button>
            </div>
            <Link to="/" className="px-3 py-3 rounded-lg hover:bg-slate-100 font-medium">Home</Link>

            <button onClick={() => setMAbout(!mAbout)} aria-expanded={mAbout} className="flex justify-between items-center px-3 py-3 rounded-lg hover:bg-slate-100 font-medium w-full text-left">
              About <span>{mAbout ? '▴' : '▾'}</span>
            </button>
            {mAbout && (
              <div className="ml-2 pl-3 border-l flex flex-col gap-1 pb-1">
                <Link to="/about" className="px-3 py-2.5 rounded hover:bg-slate-100">Our Company</Link>
                <Link to="/vision" className="px-3 py-2.5 rounded hover:bg-slate-100">Vision &amp; Mission</Link>
                <Link to="/team" className="px-3 py-2.5 rounded hover:bg-slate-100">Our Team</Link>
                <Link to="/gallery" className="px-3 py-2.5 rounded hover:bg-slate-100">Gallery</Link>
              </div>
            )}

            <button onClick={() => setMSvc(!mSvc)} aria-expanded={mSvc} className="flex justify-between items-center px-3 py-3 rounded-lg hover:bg-slate-100 font-medium w-full text-left">
              Services <span>{mSvc ? '▴' : '▾'}</span>
            </button>
            {mSvc && (
              <div className="ml-2 pl-3 border-l flex flex-col gap-1 pb-1 max-h-[40svh] overflow-y-auto">
                <Link to="/services" className="px-3 py-2.5 rounded bg-emerald-700 text-white text-sm font-semibold text-center">View All Services</Link>
                {services.map((s) => (
                  <Link key={s._id} to={s.links?.startsWith('/') ? s.links : `/services/${slugOf(s.links)}`} className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">{s.content}</Link>
                ))}
                <Link to="/services/building" className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">Building &amp; Infrastructure</Link>
                <Link to="/services/road" className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">Road &amp; Transportation</Link>
                <Link to="/services/environment" className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">Environmental Assessment</Link>
                <Link to="/services/water" className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">Water &amp; Wastewater</Link>
                <Link to="/services/digital" className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">Digital Monitoring</Link>
                <Link to="/services/engineering" className="px-3 py-2.5 rounded hover:bg-slate-100 text-sm">Engineering Design</Link>
              </div>
            )}

            <Link to="/contact" className="mt-3 bg-teal-700 hover:bg-teal-800 text-white text-center px-4 py-3.5 rounded-xl font-semibold">Consult Us</Link>
            <Link to="/admin/login" className="text-center text-sm text-slate-500 py-3">Portal Login</Link>
          </div>
        </div>
      )}
    </>
  );
}

function slugOf(links) {
  if (!links) return 'building';
  if (links.includes('building')) return 'building';
  if (links.includes('road')) return 'road';
  if (links.includes('environment')) return 'environment';
  if (links.includes('water')) return 'water';
  if (links.includes('digital')) return 'digital';
  if (links.includes('engineering')) return 'engineering';
  return 'building';
}

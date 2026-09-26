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

  // Close mobile menu on route change + lock body scroll when open
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open ]);

  const linkCls = ({ isActive }) =>
    `hover:text-emerald-700 transition ${isActive ? 'text-emerald-700 font-semibold' : ''}`;

  return (
    <>
      {/* Top bar — stacks gracefully on mobile */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap gap-x-3 gap-y-1 justify-between items-center">
          <a href="tel:01981623105" className="truncate">
            <span className="hidden xs:inline sm:inline">Head Office: </span>
            <strong>01981623105</strong>
            <span className="hidden sm:inline"> · Support 24/7</span>
          </a>
          <Link to="/admin/login" className="bg-emerald-600 px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap shrink-0">
            Portal Login
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="font-extrabold text-base sm:text-lg leading-tight min-w-0">
            <span className="block sm:inline truncate">DELTA International</span>{' '}
            <span className="text-emerald-700 text-[10px] sm:text-xs font-medium whitespace-nowrap">
              Dev Corp (BD) — Estd. 2020
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-5 text-sm font-medium items-center">
            <NavLink to="/" className={linkCls}>Home</NavLink>
            <div className="relative" onMouseEnter={() => setDrop('about')} onMouseLeave={() => setDrop(null)}>
              <button className="py-2">About ▾</button>
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
              <button className="py-2">Services ▾</button>
              {drop === 'svc' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-lg rounded-lg p-2 w-72 flex flex-col max-h-96 overflow-auto border z-50">
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
            <Link to="/contact" className="bg-teal-700 text-white px-4 py-1.5 rounded whitespace-nowrap">Consult Us</Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-slate-100 text-2xl leading-none w-11 h-11 flex items-center justify-center shrink-0"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/30" onClick={() => setOpen(false)}>
            <div
              className="bg-white border-t shadow-xl h-full overflow-y-auto p-4 flex flex-col gap-1 text-[15px] max-w-sm ml-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="/" className="px-3 py-2.5 rounded-lg hover:bg-slate-100 font-medium">Home</Link>

              <button onClick={() => setMAbout(!mAbout)} className="flex justify-between items-center px-3 py-2.5 rounded-lg hover:bg-slate-100 font-medium w-full text-left">
                About <span>{mAbout ? '▴' : '▾'}</span>
              </button>
              {mAbout && (
                <div className="ml-2 pl-3 border-l flex flex-col gap-1 pb-1">
                  <Link to="/about" className="px-3 py-2 rounded hover:bg-slate-100">Our Company</Link>
                  <Link to="/vision" className="px-3 py-2 rounded hover:bg-slate-100">Vision &amp; Mission</Link>
                  <Link to="/team" className="px-3 py-2 rounded hover:bg-slate-100">Our Team</Link>
                  <Link to="/gallery" className="px-3 py-2 rounded hover:bg-slate-100">Gallery</Link>
                </div>
              )}

              <button onClick={() => setMSvc(!mSvc)} className="flex justify-between items-center px-3 py-2.5 rounded-lg hover:bg-slate-100 font-medium w-full text-left">
                Services <span>{mSvc ? '▴' : '▾'}</span>
              </button>
              {mSvc && (
                <div className="ml-2 pl-3 border-l flex flex-col gap-1 pb-1 max-h-64 overflow-y-auto">
                  {services.map((s) => (
                    <Link key={s._id} to={s.links?.startsWith('/') ? s.links : `/services/${slugOf(s.links)}`} className="px-3 py-2 rounded hover:bg-slate-100 text-sm">{s.content}</Link>
                  ))}
                  <Link to="/services/building" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Building &amp; Infrastructure</Link>
                  <Link to="/services/road" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Road &amp; Transportation</Link>
                  <Link to="/services/environment" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Environmental Assessment</Link>
                  <Link to="/services/water" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Water &amp; Wastewater</Link>
                  <Link to="/services/digital" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Digital Monitoring</Link>
                  <Link to="/services/engineering" className="px-3 py-2 rounded hover:bg-slate-100 text-sm">Engineering Design</Link>
                </div>
              )}

              <Link to="/contact" className="mt-2 bg-teal-700 text-white text-center px-4 py-3 rounded-xl font-semibold">Consult Us</Link>
              <Link to="/admin/login" className="text-center text-sm text-slate-500 py-2">Portal Login</Link>
            </div>
          </div>
        )}
      </header>
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

import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../lib/api';

export default function Navbar() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data)).catch(() => {});
  }, []);

  return (
    <>
      <div className="bg-slate-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <a href="tel:01981623105">Head Office: <strong>01981623105</strong> · Support 24/7</a>
          <Link to="/admin/login" className="bg-emerald-600 px-3 py-1 rounded">Portal Login</Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-lg">DELTA International <span className="text-emerald-700 text-xs font-medium">Dev Corp (BD) — Estd. 2020</span></Link>
          <nav className="hidden md:flex gap-5 text-sm font-medium">
            <NavLink to="/">Home</NavLink>
            <div className="relative" onMouseEnter={() => setDrop('about')} onMouseLeave={() => setDrop(null)}>
              <button>About ▾</button>
              {drop === 'about' && (
                <div className="absolute bg-white shadow rounded p-2 w-48 flex flex-col">
                  <Link to="/about">Our Company</Link>
                  <Link to="/vision">Vision & Mission</Link>
                  <Link to="/team">Our Team</Link>
                  <Link to="/gallery">Gallery</Link>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setDrop('svc')} onMouseLeave={() => setDrop(null)}>
              <button>Services ▾</button>
              {drop === 'svc' && (
                <div className="absolute bg-white shadow rounded p-2 w-72 flex flex-col max-h-96 overflow-auto">
                  {services.map((s) => (
                    <Link key={s._id} to={s.links?.startsWith('/') ? s.links : `/services/${slugOf(s.links)}`} className="py-1">{s.content}</Link>
                  ))}
                  <hr className="my-1" />
                  <Link to="/services/building">Building & Infrastructure</Link>
                  <Link to="/services/road">Road & Transportation</Link>
                  <Link to="/services/environment">Environmental Assessment</Link>
                  <Link to="/services/water">Water & Wastewater</Link>
                  <Link to="/services/digital">Digital Monitoring & Smart Systems</Link>
                  <Link to="/services/engineering">Engineering Design</Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="bg-teal-700 text-white px-4 py-1.5 rounded">Consult Us</Link>
          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
        </div>
        {open && (
          <div className="md:hidden border-t p-4 flex flex-col gap-2 text-sm">
            <Link to="/">Home</Link><Link to="/about">Our Company</Link><Link to="/vision">Vision & Mission</Link>
            <Link to="/team">Our Team</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link>
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

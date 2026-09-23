import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-bold text-white text-lg">DELTA International.</div>
          <div className="text-xs">Development Corporation (BD) — Estd. 2020</div>
          <p className="text-sm mt-3">Advancing global resilience through science-driven consultancy and innovative environmental intelligence.</p>
          <div className="text-sm mt-3">📞 01981623105<br />📍 Nirman Samad Trade Center, 63/1 Ground Floor, Pioneer Road, Kakrail, Ramna, Dhaka-1000, Bangladesh.</div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Company</div>
          <div className="flex flex-col gap-1 text-sm">
            <Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/team">Team</Link><Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Expertise</div>
          <div className="flex flex-col gap-1 text-sm">
            <Link to="/services/environment">Climate</Link><Link to="/services/water">Environment</Link><Link to="/services/digital">AI AgTech</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Stay Connected</div>
          <p className="text-sm">Join our global network for the latest resilience insights.</p>
          <Link to="/contact" className="inline-block mt-3 bg-emerald-600 text-white px-4 py-2 rounded">Get In Touch</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} DELTA International Development Corporation (BD) — All rights reserved.</div>
    </footer>
  );
}

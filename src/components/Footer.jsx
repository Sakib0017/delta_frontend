import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="font-bold text-white text-lg">DELTA International.</div>
          <div className="text-xs">Development Corporation (BD) — Estd. 2020</div>
          <p className="text-sm mt-3 leading-relaxed">Advancing global resilience through science-driven consultancy and innovative environmental intelligence.</p>
          <div className="text-sm mt-3 space-y-1.5 leading-relaxed">
            <div>📞 <a href="tel:01981623105" className="hover:text-white">01981623105</a></div>
            <div>📍 Nirman Samad Trade Center, 63/1 Ground Floor, Pioneer Road, Kakrail, Ramna, Dhaka-1000, Bangladesh.</div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2 sm:mb-3">Company</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-white w-fit">Home</Link>
            <Link to="/about" className="hover:text-white w-fit">About Us</Link>
            <Link to="/team" className="hover:text-white w-fit">Team</Link>
            <Link to="/contact" className="hover:text-white w-fit">Contact</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2 sm:mb-3">Expertise</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/services/environment" className="hover:text-white w-fit">Climate</Link>
            <Link to="/services/water" className="hover:text-white w-fit">Environment</Link>
            <Link to="/services/digital" className="hover:text-white w-fit">AI AgTech</Link>
            <Link to="/services/building" className="hover:text-white w-fit">Infrastructure</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2 sm:mb-3">Stay Connected</div>
          <p className="text-sm leading-relaxed">Join our global network for the latest resilience insights.</p>
          <Link to="/contact" className="inline-block mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium">Get In Touch</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 px-4 text-center text-xs leading-relaxed">© {new Date().getFullYear()} DELTA International Development Corporation (BD) — All rights reserved.</div>
    </footer>
  );
}

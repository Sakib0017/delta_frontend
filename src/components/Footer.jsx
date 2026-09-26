import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-emerald-50/60 border-t border-emerald-100 text-slate-600 mt-12 sm:mt-16 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
        <div className="xs:col-span-2 lg:col-span-1">
          <div className="font-bold text-slate-900 text-lg">DELTA International.</div>
          <div className="text-xs text-slate-500">Development Corporation (BD) — Estd. 2020</div>
          <p className="text-sm mt-3 leading-relaxed">Advancing global resilience through science-driven consultancy and innovative environmental intelligence.</p>
          <div className="text-sm mt-3 space-y-1.5 leading-relaxed">
            <div>📞 <a href="tel:01981623105" className="hover:text-emerald-700 font-medium">01981623105</a></div>
            <div>📍 Nirman Samad Trade Center, 63/1 Ground Floor, Pioneer Road, Kakrail, Ramna, Dhaka-1000, Bangladesh.</div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2 sm:mb-3">Company</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link to="/" className="hover:text-emerald-700 w-fit py-0.5">Home</Link>
            <Link to="/about" className="hover:text-emerald-700 w-fit py-0.5">About Us</Link>
            <Link to="/team" className="hover:text-emerald-700 w-fit py-0.5">Team</Link>
            <Link to="/contact" className="hover:text-emerald-700 w-fit py-0.5">Contact</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2 sm:mb-3">Expertise</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link to="/services/building" className="hover:text-emerald-700 w-fit py-0.5">Building & Infrastructure</Link>
            <Link to="/services/road" className="hover:text-emerald-700 w-fit py-0.5">Road & Transportation</Link>
            <Link to="/services/environment" className="hover:text-emerald-700 w-fit py-0.5">Environmental Assessment</Link>
            <Link to="/services/water" className="hover:text-emerald-700 w-fit py-0.5">Water & Wastewater</Link>
            <Link to="/services/digital" className="hover:text-emerald-700 w-fit py-0.5">Digital & Smart Systems</Link>
            <Link to="/services/engineering" className="hover:text-emerald-700 w-fit py-0.5">Engineering Design</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-2 sm:mb-3">Stay Connected</div>
          <p className="text-sm leading-relaxed">Join our global network for the latest resilience insights.</p>
          <Link to="/contact" className="inline-block mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium">Get In Touch</Link>
        </div>
      </div>
      <div className="border-t border-emerald-100 py-4 px-4 text-center text-xs text-slate-500 leading-relaxed">© {new Date().getFullYear()} DELTA International Development Corporation (BD) — All rights reserved.</div>
    </footer>
  );
}

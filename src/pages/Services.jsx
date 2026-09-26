import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { ServiceCard } from '../components/ServiceBits';

export default function Services() {
  return (
    <div className="overflow-x-clip">
      {/* Hero — light */}
      <section className="bg-emerald-50 border-b border-emerald-100 text-slate-900 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] py-12 sm:py-16 lg:py-20 text-center">
          <div className="text-[11px] sm:text-xs tracking-widest text-emerald-700 font-semibold">WHAT WE DO</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 text-balance">Our Services</h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Six engineering and consultancy practices — from buildings and roads to water, environment and smart monitoring — delivered by one accountable team.
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3 mt-6">
            <Link to="/contact" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base">
              Consult Us
            </Link>
            <a href="tel:01981623105" className="border border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base">
              01981623105
            </a>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </section>

      {/* Why strip */}
      <section className="bg-slate-50 border-y">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          {[
            ['One accountable team', 'Design, supervision and compliance under a single contract.'],
            ['Delta-tested methods', 'Details proven against floods, salinity and monsoon loads.'],
            ['Fundable documentation', 'DoE-format reports, lender safeguards and clean BOQs.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border bg-white p-5 sm:p-6">
              <div className="font-bold text-[15px] sm:text-base">{t}</div>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-balance">Not sure which service fits your project?</h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">Describe it in one message — we will point you to the right practice.</p>
        <Link to="/contact" className="inline-block mt-5 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl font-semibold text-sm sm:text-base">
          Talk to an Engineer
        </Link>
      </section>
    </div>
  );
}

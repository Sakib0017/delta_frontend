import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';

/** Minimal line icons — no emoji, consistent 1.5px stroke. */
export function ServiceIcon({ icon, className = 'w-6 h-6' }) {
  const paths = {
    building: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01',
    road: 'M4 19L9 5M20 19L15 5M12 8v2M12 12v2M12 16v2',
    leaf: 'M5 21c0-9 5-14 14-14 0 9-5 14-14 14M5 21c3-5 7-9 11-11',
    drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
    chip: 'M9 9h6v6H9zM4 4h16v16H4zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3',
    compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z',
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[icon] || paths.compass} />
    </svg>
  );
}

/** Small card used on the Services index + "other services" nav. */
export function ServiceCard({ s }) {
  return (
    <Link
      to={`/services/${s.slug}`}
      className="group rounded-2xl border bg-white p-5 sm:p-6 flex flex-col hover:shadow-lg hover:border-emerald-200 hover:-translate-y-0.5 transition"
    >
      <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
        <ServiceIcon icon={s.icon} />
      </span>
      <h3 className="font-bold text-base sm:text-lg mt-3 group-hover:text-emerald-800">{s.title}</h3>
      <p className="text-xs text-emerald-700/80 font-medium mt-0.5">{s.tagline}</p>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1 line-clamp-3">{s.short}</p>
      <span className="text-emerald-700 text-sm font-medium mt-3">Explore service →</span>
    </Link>
  );
}

export function OtherServices({ current }) {
  const rest = SERVICES.filter((s) => s.slug !== current);
  return (
    <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      <div className="flex items-end justify-between gap-3 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">Other services</h2>
        <Link to="/services" className="text-sm text-emerald-700 font-medium whitespace-nowrap">View all →</Link>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-5">
        {rest.map((s) => (
          <Link key={s.slug} to={`/services/${s.slug}`} className="rounded-2xl border bg-white p-4 flex items-center gap-3 hover:shadow hover:border-emerald-200 transition">
            <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <ServiceIcon icon={s.icon} className="w-5 h-5" />
            </span>
            <span className="font-semibold text-sm leading-snug">{s.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

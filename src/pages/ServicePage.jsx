import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { imgUrl } from '../lib/api';
import { SERVICES, serviceBySlug } from '../data/services';
import { ServiceIcon, OtherServices } from '../components/ServiceBits';

export default function ServicePage() {
  const { slug } = useParams();
  const svc = serviceBySlug(slug) || SERVICES[0];
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get(`/projects/${svc.category}`).then((r) => setItems(r.data)).catch(() => setItems([]));
  }, [svc.category]);

  const pos = SERVICES.findIndex((s) => s.slug === svc.slug);
  const prev = SERVICES[(pos - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(pos + 1) % SERVICES.length];

  return (
    <div className="overflow-x-clip">
      {/* Breadcrumb */}
      <nav className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 text-xs sm:text-sm text-slate-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span className="mx-1.5">/</span>
        <Link to="/services" className="hover:text-emerald-700">Services</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-800 font-medium">{svc.title}</span>
      </nav>

      {/* Hero — minimal */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-10">
        <div className="rounded-2xl sm:rounded-3xl bg-emerald-50 border border-emerald-100 text-slate-900 px-5 py-10 sm:p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-emerald-500/10" aria-hidden="true" />
          <div className="absolute right-16 bottom-[-60px] w-40 h-40 rounded-full bg-teal-400/10 hidden sm:block" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest text-emerald-700 uppercase">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <ServiceIcon icon={svc.icon} className="w-4 h-4" />
              </span>
              Service {String(pos + 1).padStart(2, '0')} / 06
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight text-balance">{svc.title}</h1>
            <p className="text-emerald-700 text-sm sm:text-lg mt-2 font-medium">{svc.tagline}</p>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl">{svc.short}</p>
            <div className="flex flex-col xs:flex-row gap-3 mt-6">
              <Link to="/contact" className="bg-emerald-600 hover:bg-emerald-500 text-white text-center px-6 py-3 rounded-xl font-semibold text-sm sm:text-base">
                Request a Proposal
              </Link>
              <a href="#scope" className="border border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 text-center px-6 py-3 rounded-xl font-semibold text-sm sm:text-base">
                View Scope
              </a>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5">
          {svc.stats.map(([n, l]) => (
            <div key={l} className="rounded-2xl border bg-white px-3 py-4 sm:p-5 text-center">
              <div className="text-lg sm:text-2xl font-extrabold text-slate-900">{n}</div>
              <div className="text-[11px] sm:text-sm text-slate-500 mt-0.5 leading-snug">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="text-[11px] sm:text-xs font-semibold tracking-widest text-emerald-700 uppercase">Overview</div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1">What we do</h2>
          {svc.overview.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed mt-3">{p}</p>
          ))}
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-slate-50 p-5 sm:p-6 lg:sticky lg:top-24">
            <div className="font-bold text-base">What you receive</div>
            <ul className="mt-3 space-y-2.5">
              {svc.deliverables.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="block mt-5 bg-emerald-700 hover:bg-emerald-800 text-white text-center px-5 py-3 rounded-xl font-semibold text-sm">
              Discuss your project
            </Link>
          </div>
        </div>
      </section>

      {/* Scope grid */}
      <section id="scope" className="bg-slate-50 border-y scroll-mt-20">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-[11px] sm:text-xs font-semibold tracking-widest text-emerald-700 uppercase">Scope of work</div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1">Everything covered under {svc.title.toLowerCase()}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-6">
            {svc.scopes.map((sc, i) => (
              <div key={sc.title} className="rounded-2xl border bg-white p-5">
                <div className="text-xs font-bold text-emerald-700">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-bold text-[15px] sm:text-base mt-1">{sc.title}</h3>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{sc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-[11px] sm:text-xs font-semibold tracking-widest text-emerald-700 uppercase">How we work</div>
        <h2 className="text-xl sm:text-2xl font-bold mt-1">A simple four-step process</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {svc.steps.map((st, i) => (
            <li key={st.title} className="relative rounded-2xl border bg-white p-5">
              <span className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">{i + 1}</span>
              <h3 className="font-bold text-[15px] sm:text-base mt-3">{st.title}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Related work (live from backend) */}
      {items.length > 0 && (
        <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
          <div className="flex items-end justify-between gap-3 mb-5">
            <div>
              <div className="text-[11px] sm:text-xs font-semibold tracking-widest text-emerald-700 uppercase">Selected work</div>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">Related projects</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {items.slice(0, 6).map((row) => (
              <article key={row._id} className="rounded-2xl overflow-hidden border bg-white flex flex-col">
                {row.img && <img src={imgUrl(row.img)} alt="" loading="lazy" className="h-44 sm:h-48 w-full object-cover" />}
                <div className="p-4 flex-1">
                  <div className="text-xs font-semibold text-emerald-700">{row.header}</div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-3 leading-relaxed">{row.content}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Link to={`/services/${prev.slug}`} className="rounded-2xl border bg-white p-4 sm:p-5 hover:border-emerald-300 hover:shadow transition">
            <div className="text-[11px] sm:text-xs text-slate-400">← Previous</div>
            <div className="font-bold text-sm sm:text-base mt-1 leading-snug">{prev.title}</div>
          </Link>
          <Link to={`/services/${next.slug}`} className="rounded-2xl border bg-white p-4 sm:p-5 text-right hover:border-emerald-300 hover:shadow transition">
            <div className="text-[11px] sm:text-xs text-slate-400">Next →</div>
            <div className="font-bold text-sm sm:text-base mt-1 leading-snug">{next.title}</div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="rounded-2xl sm:rounded-3xl bg-emerald-700 text-white px-5 py-8 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-balance">Have a {svc.title.toLowerCase()} project in mind?</h2>
            <p className="text-white/85 text-sm sm:text-base mt-1.5">Send us the location and a short brief — we reply with next steps within one working day.</p>
          </div>
          <div className="flex flex-col xs:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
            <Link to="/contact" className="bg-white text-emerald-800 text-center px-6 py-3 rounded-xl font-semibold text-sm sm:text-base">Consult Us</Link>
            <a href="tel:01981623105" className="border border-white/40 text-center px-6 py-3 rounded-xl font-semibold text-sm sm:text-base">01981623105</a>
          </div>
        </div>
      </section>

      <OtherServices current={svc.slug} />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { imgUrl } from '../lib/api';

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [news, setNews] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    api.get('/sliders').then((r) => setSlides(r.data)).catch(() => {});
    api.get('/services').then((r) => setServices(r.data)).catch(() => {});
    api.get('/clients').then((r) => setClients(r.data)).catch(() => {});
    api.get('/news').then((r) => setNews(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="overflow-x-clip">
      {/* Hero slider — svh units keep it correct on mobile browser chrome + landscape */}
      <section className="hero-flex relative h-[62svh] sm:h-[65svh] lg:h-[72svh] 2xl:h-[74svh] min-h-[380px] max-h-[900px] bg-slate-900 text-white overflow-hidden">
        {slides.map((s, i) => (
          <div key={s._id} className={`absolute inset-0 hero-slide ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${imgUrl(s.img)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full mx-auto w-full max-w-5xl 2xl:max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <h1 className="text-[1.65rem] leading-[1.15] xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-light text-balance">{s.header}</h1>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-white/85 line-clamp-4 sm:line-clamp-3 max-w-3xl">{s.content}</p>
            </div>
          </div>
        ))}
        {slides.length > 1 && (
          <>
            <button aria-label="Previous slide" onClick={() => setIdx((idx - 1 + slides.length) % Math.max(slides.length, 1))} className="absolute left-2 sm:left-4 2xl:left-8 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50">‹</button>
            <button aria-label="Next slide" onClick={() => setIdx((idx + 1) % Math.max(slides.length, 1))} className="absolute right-2 sm:right-4 2xl:right-8 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50">›</button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((s, i) => (
                <button key={s._id} aria-label={`Go to slide ${i + 1}`} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Welcome */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
        <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold leading-tight text-balance">Welcome to <span className="text-emerald-700">DELTA International</span></h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">Development Corporation BD — Engineering Excellence, Global Impact</p>
        <p className="max-w-3xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">DELTA International Development Corporation BD is a leading engineering and development consultancy firm serving both public and private sectors. Founded in 2020.</p>
      </section>

      {/* Core services */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <div className="flex items-end justify-between gap-3 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Our Core Services</h2>
          <Link to="/services" className="text-sm text-emerald-700 font-medium whitespace-nowrap">View all →</Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((s) => {
            const to = s.links?.startsWith('/') ? s.links : `/services/${homeSlug(s.links)}`;
            return (
              <Link key={s._id} to={to} className="group rounded-xl overflow-hidden border shadow-sm bg-white flex flex-col hover:shadow-lg hover:border-emerald-200 transition">
                <img src={imgUrl(s.img)} alt={s.content} loading="lazy" className="h-44 sm:h-48 w-full object-cover aspect-[4/3]" />
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-[15px] sm:text-base group-hover:text-emerald-800">{s.content}</h3>
                  {s.content1 && <p className="text-sm text-slate-600 mt-1">{s.content1}</p>}
                  <span className="text-emerald-700 text-sm mt-2 inline-block font-medium">Read Detailed Scope →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Counters */}
      <section className="bg-emerald-50 border-y border-emerald-100 py-8 sm:py-10 px-4">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-6xl grid grid-cols-2 lg:grid-cols-4 text-center gap-6 sm:gap-4">
          {[['52', 'Happy Clients'], ['63', 'Cups of Coffee'], ['25', 'Projects'], ['125', 'Working Days']].map(([n, l]) => (
            <div key={l}><div className="text-2xl sm:text-3xl font-bold text-slate-900">{n}</div><div className="text-xs sm:text-sm text-slate-500 mt-1">{l}</div></div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6">Our Service Partner</h2>
        <div className="rail flex gap-4 sm:gap-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {clients.map((c) => <img key={c._id} src={imgUrl(c.img)} alt="Partner" loading="lazy" className="h-12 sm:h-16 2xl:h-20 w-auto object-contain shrink-0" />)}
        </div>
      </section>

      {/* News */}
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-12 sm:pb-14">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {news.map((n) => (
            <article key={n._id} className="rounded-xl overflow-hidden border bg-white flex flex-col">
              <img src={imgUrl(n.img)} alt="" loading="lazy" className="h-44 xs:h-40 sm:h-40 w-full object-cover aspect-[16/10]" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-[15px] sm:text-base line-clamp-2">{n.header}</h3>
                <p className="text-sm text-slate-600 line-clamp-3 mt-1 flex-1">{n.content}</p>
                <Link to={`/news/${n._id}`} className="text-emerald-700 text-sm mt-2 font-medium w-fit">Read More →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function homeSlug(links) {
  if (!links) return 'building';
  if (links.includes('building')) return 'building';
  if (links.includes('road')) return 'road';
  if (links.includes('environment')) return 'environment';
  if (links.includes('water')) return 'water';
  if (links.includes('digital')) return 'digital';
  if (links.includes('engineering')) return 'engineering';
  return 'building';
}

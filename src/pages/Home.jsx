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
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div>
      {/* Hero slider (slider table) */}
      <section className="relative h-[70vh] bg-slate-900 text-white overflow-hidden">
        {slides.map((s, i) => (
          <div key={s._id} className={`absolute inset-0 hero-slide ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${imgUrl(s.img)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-light">{s.header}</h1>
              <p className="mt-3 text-lg text-white/85">{s.content}</p>
            </div>
          </div>
        ))}
        <button onClick={() => setIdx((idx - 1 + slides.length) % Math.max(slides.length, 1))} className="absolute left-4 top-1/2 text-3xl">‹</button>
        <button onClick={() => setIdx((idx + 1) % Math.max(slides.length, 1))} className="absolute right-4 top-1/2 text-3xl">›</button>
      </section>

      {/* Welcome */}
      <section className="max-w-7xl mx-auto px-4 py-14 text-center">
        <h2 className="text-3xl font-bold">Welcome to <span className="text-emerald-700">DELTA International</span></h2>
        <p className="text-slate-600">Development Corporation BD — Engineering Excellence, Global Impact</p>
        <p className="max-w-3xl mx-auto mt-4 text-slate-700">DELTA International Development Corporation BD is a leading engineering and development consultancy firm serving both public and private sectors. Founded in 2020.</p>
      </section>

      {/* Core services (c_services) */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-bold text-center mb-6">Our Core Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article key={s._id} className="rounded-xl overflow-hidden border shadow-sm bg-white">
              <img src={imgUrl(s.img)} alt={s.content} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{s.content}</h3>
                {s.content1 && <p className="text-sm text-slate-600">{s.content1}</p>}
                {s.links && <span className="text-emerald-700 text-sm">Read Detailed Scope →</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Counters (static, as in PHP) */}
      <section className="bg-slate-900 text-white py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-4">
          {[['52', 'Happy Clients'], ['63', 'Cups of Coffee'], ['25', 'Projects'], ['125', 'Working Days']].map(([n, l]) => (
            <div key={l}><div className="text-3xl font-bold">{n}</div><div className="text-sm text-white/70">{l}</div></div>
          ))}
        </div>
      </section>

      {/* Partners (clients) */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">Our Service Partner</h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {clients.map((c) => <img key={c._id} src={imgUrl(c.img)} alt="Partner" className="h-16 object-contain" />)}
        </div>
      </section>

      {/* News */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((n) => (
            <article key={n._id} className="rounded-xl overflow-hidden border bg-white">
              <img src={imgUrl(n.img)} alt="" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{n.header}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{n.content}</p>
                <Link to={`/news/${n._id}`} className="text-emerald-700 text-sm">Read More →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

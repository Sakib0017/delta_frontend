import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { imgUrl } from '../lib/api';

// Maps frontend slugs -> legacy tables (via backend categories)
const MAP = {
  building: { category: 'climate', title: 'Building & Infrastructure Development' },
  road: { category: 'environ', title: 'Road & Transportation Infrastructure' },
  environment: { category: 'transportation', title: 'Environmental Assessment & Compliance' },
  water: { category: 'agricultural', title: 'Water & Wastewater Treatment Systems' },
  digital: { category: 'advisory', title: 'Digital Monitoring & Smart Systems' },
  engineering: { category: 'engineering', title: 'Engineering Design, Review & Documentation' },
};

export default function ServicePage() {
  const { slug } = useParams();
  const meta = MAP[slug] || MAP.building;
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get(`/projects/${meta.category}`).then((r) => setItems(r.data)).catch(() => setItems([]));
  }, [meta.category]);

  return (
    <div className="overflow-x-hidden">
      <section className="bg-slate-900 text-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-light max-w-6xl mx-auto leading-tight">{items[0]?.header || meta.title}</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 gap-4 sm:gap-8">
        {items.map((row) => (
          <article key={row._id} className="flex flex-col md:flex-row rounded-2xl overflow-hidden border shadow-sm bg-white">
            <img src={imgUrl(row.img)} alt="" loading="lazy" className="w-full md:w-1/3 h-52 sm:h-64 object-cover shrink-0" />
            <div className="p-4 sm:p-5 flex-1">
              <div className="text-xs text-slate-500">{row.header}</div>
              <p className="mt-2 text-sm sm:text-base whitespace-pre-line leading-relaxed">{row.content}</p>
            </div>
          </article>
        ))}
        {items.length === 0 && <p className="text-slate-500 text-sm sm:text-base text-center py-6">No entries yet for this section.</p>}
      </section>
    </div>
  );
}

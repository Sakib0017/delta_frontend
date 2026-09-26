import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function About() {
  const [keys, setKeys] = useState([]);
  useEffect(() => { api.get('/keys').then((r) => setKeys(r.data)).catch(() => {}); }, []);
  return (
    <div className="overflow-x-hidden">
      <section className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="text-[11px] sm:text-xs tracking-widest text-emerald-400">WHO WE ARE</div>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">About Us</h1>
        <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto mt-2 leading-relaxed">Committed to climate-resilient development, environmental governance, and sustainable infrastructure across Bangladesh&apos;s deltaic landscape.</p>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="text-xl sm:text-2xl font-bold">About Us</h2>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">DELTA International is an international consulting and advisory firm established in 2020 and headquartered in Dhaka, Bangladesh. Since 2020 it has expanded globally, collaborating with national and international firms to provide innovative solutions in water resources, agriculture, transportation, rural infrastructure, and environmental sustainability.</p>
        <div className="mt-6 bg-slate-50 border rounded-xl p-4 sm:p-5">
          <div className="font-bold mb-2">The DELTA Framework</div>
          <ul className="text-sm space-y-1.5 leading-relaxed">
            <li><strong>D</strong> – Development with Disaster Resilience</li>
            <li><strong>E</strong> – Environment, Ecosystems &amp; Climate Change Adaptation</li>
            <li><strong>L</strong> – Livelihood Transformation using AI-Enabled Agriculture and Land Systems</li>
            <li><strong>T</strong> – Transportation &amp; Territorial Infrastructure</li>
            <li><strong>A</strong> – Advocacy for Sustainable Policy and Institutional Strengthening</li>
          </ul>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-14">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Exploring Our Key Areas Of Impact And Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {keys.map((k) => (
            <article key={k._id} className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-[15px] sm:text-base">{k.header}</h3>
              <p className="text-sm text-slate-600 whitespace-pre-line mt-1 leading-relaxed">{k.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

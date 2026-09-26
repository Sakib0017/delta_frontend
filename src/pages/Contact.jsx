import { useState } from 'react';
import api from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', subject: '', message: '' });
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const r = await api.post('/contacts', form);
      setMsg({ ok: true, text: r.data.message });
      setForm({ firstName: '', lastName: '', email: '', mobile: '', subject: '', message: '' });
    } catch (err) { setMsg({ ok: false, text: err.response?.data?.message || 'Could not send message.' }); }
  };

  const inputCls = 'border rounded-xl px-4 py-3 w-full text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/40 focus:border-teal-700';

  return (
    <div className="overflow-x-clip">
      <section className="bg-emerald-50 border-b border-emerald-100 text-slate-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px]">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">Contact</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">Let&apos;s Work Together and Impact The Future.</p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-2 xl:gap-10 gap-5 sm:gap-8 items-start">
        <form onSubmit={submit} className="border rounded-2xl p-4 sm:p-6 space-y-4 bg-white order-1 w-full min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-center">Get in Touch</h2>
          {msg && <div className={`p-3 rounded text-sm ${msg.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{msg.text}</div>}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <input required placeholder="First name" autoComplete="given-name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputCls} />
            <input required placeholder="Last name" autoComplete="family-name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputCls} />
          </div>
          <input required type="email" placeholder="Email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
          <input required placeholder="Phone" inputMode="tel" autoComplete="tel" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className={inputCls} />
          <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} />
          <textarea required rows={5} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} />
          <button className="w-full bg-teal-700 hover:bg-teal-800 text-white rounded-xl py-3.5 font-semibold text-base">Send Message</button>
        </form>
        <div className="space-y-4 order-2 w-full min-w-0">
          <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3652.3735111957243!2d90.407147!3d23.734063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzAyLjYiTiA5MMKwMjQnMjUuNyJF!5e0!3m2!1sen!2sbd!4v1650000000000!5m2!1sen!2sbd" className="h-[280px] xs:h-[320px] sm:h-[350px] lg:h-[400px] 2xl:h-[440px] w-full rounded-2xl border" loading="lazy" />
          <div className="border rounded-2xl p-4 sm:p-5 text-sm space-y-2 leading-relaxed bg-white">
            <div className="font-bold text-base">Office Information</div>
            <div>📍 Nirman Samad Trade Center, 63/1 Ground Floor, Pioneer Road, Kakrail, Ramna, Dhaka-1000, Bangladesh.</div>
            <div>📞 <a href="tel:01981623105" className="text-teal-700 font-medium">01981623105</a></div>
            <div className="break-all">✉️ info@deltainternational.bd, deltabd.info@gmail.com</div>
          </div>
        </div>
      </section>
    </div>
  );
}

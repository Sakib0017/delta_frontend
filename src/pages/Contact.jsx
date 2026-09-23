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

  return (
    <div>
      <section className="bg-slate-900 text-white py-20 px-4">
        <h1 className="text-5xl font-light max-w-7xl mx-auto">Contact</h1>
        <p className="max-w-7xl mx-auto mt-2 text-white/80">Let's Work Together and Impact The Future.</p>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
        <form onSubmit={submit} className="border rounded-2xl p-6 space-y-4 bg-white">
          <h2 className="text-2xl font-bold text-center">Get in Touch</h2>
          {msg && <div className={`p-3 rounded text-sm ${msg.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{msg.text}</div>}
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="border rounded-xl px-4 py-3" />
            <input required placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="border rounded-xl px-4 py-3" />
          </div>
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border rounded-xl px-4 py-3 w-full" />
          <input required placeholder="Phone" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="border rounded-xl px-4 py-3 w-full" />
          <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="border rounded-xl px-4 py-3 w-full" />
          <textarea required rows={5} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="border rounded-xl px-4 py-3 w-full" />
          <button className="w-full bg-teal-700 text-white rounded-xl py-3 font-semibold">Send Message</button>
        </form>
        <div className="space-y-4">
          <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3652.3735111957243!2d90.407147!3d23.734063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzAyLjYiTiA5MMKwMjQnMjUuNyJF!5e0!3m2!1sen!2sbd!4v1650000000000!5m2!1sen!2sbd" className="h-[400px] w-full rounded-2xl border" loading="lazy" />
          <div className="border rounded-2xl p-5 text-sm space-y-2">
            <div className="font-bold">Office Information</div>
            <div>📍 Nirman Samad Trade Center, 63/1 Ground Floor, Pioneer Road, Kakrail, Ramna, Dhaka-1000, Bangladesh.</div>
            <div>📞 01981623105</div>
            <div>✉️ info@deltainternational.bd, deltabd.info@gmail.com</div>
          </div>
        </div>
      </section>
    </div>
  );
}

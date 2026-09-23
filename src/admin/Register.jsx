import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Register() {
  const [form, setForm] = useState({ fullname: '', username: '', email: '', password: '', confirm: '' });
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setOk('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await api.post('/auth/register', fd);
      setOk('Registration successful. Redirecting to login…');
      setTimeout(() => nav('/admin/login'), 1200);
    } catch (e2) { setErr(e2.response?.data?.message || 'Registration failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <form onSubmit={submit} className="bg-white rounded-2xl border p-7 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-extrabold">Create your account</h1>
        {ok && <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded">{ok}</div>}
        {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded">{err}</div>}
        <input required placeholder="Full name" value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <input required placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <div className="grid grid-cols-2 gap-3">
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border rounded-xl px-4 py-3" />
          <input required type="password" placeholder="Confirm" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="border rounded-xl px-4 py-3" />
        </div>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-sm" />
        <button className="w-full bg-blue-600 text-white rounded-full py-3 font-semibold">Create account</button>
        <p className="text-sm text-center">Already have an account? <Link to="/admin/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
}

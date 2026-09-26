import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export function Forgot() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    const r = await api.post('/auth/forgot', { email });
    setMsg(r.data.resetUrl ? `Dev mode — reset link: ${r.data.resetUrl}` : r.data.message);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50/50 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-7 w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Forgot password</h1>
        {msg && <div className="bg-emerald-50 text-emerald-800 text-sm p-3 rounded break-all border border-emerald-100">{msg}</div>}
        <input required type="email" placeholder="Your account email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-3 font-semibold">Send reset link</button>
        <Link to="/admin/login" className="block text-center text-sm text-emerald-700 font-medium">Back to login</Link>
      </form>
    </div>
  );
}

export function Reset() {
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({ email: params.get('email') || '', token: params.get('token') || '', password: '', confirm: '' });
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post('/auth/reset', form);
      setMsg(r.data.message);
    } catch (e2) { setMsg(e2.response?.data?.message || 'Reset failed'); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50/50 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-7 w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Reset password</h1>
        {msg && <div className="bg-emerald-50 text-emerald-800 text-sm p-3 rounded border border-emerald-100">{msg}</div>}
        <input required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <input required placeholder="Token from email" value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <input required type="password" placeholder="New password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <input required type="password" placeholder="Confirm" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full border rounded-xl px-4 py-3" />
        <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-3 font-semibold">Reset password</button>
        <Link to="/admin/login" className="block text-center text-sm text-emerald-700 font-medium">Back to login</Link>
      </form>
    </div>
  );
}

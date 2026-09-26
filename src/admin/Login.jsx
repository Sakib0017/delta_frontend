import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const r = await api.post('/auth/login', { email, password });
      localStorage.setItem('delta_token', r.data.token);
      localStorage.setItem('delta_user', JSON.stringify(r.data.user));
      nav('/admin');
    } catch (e2) { setErr(e2.response?.data?.message || 'Login failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50/50 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-emerald-100 p-7 w-full max-w-md space-y-4 shadow-sm">
        <h1 className="text-2xl font-extrabold">Welcome back</h1>
        <p className="text-sm text-slate-500">Login with your registered email and password.</p>
        {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded">{err}</div>}
        <input type="email" required placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3" />
        <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-3 font-semibold">Login</button>
        <div className="text-sm text-center flex justify-center gap-3">
          <Link to="/admin/register" className="text-emerald-700 font-medium">Register</Link>
          <Link to="/admin/forgot" className="text-slate-500">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

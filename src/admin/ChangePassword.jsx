import { useState } from 'react';
import api from '../lib/api';

export default function ChangePassword() {
  const [form, setForm] = useState({ current: '', password: '', confirm: '' });
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const r = await api.post('/auth/change-password', form);
      setMsg({ ok: true, text: r.data.message });
      setForm({ current: '', password: '', confirm: '' });
    } catch (err) { setMsg({ ok: false, text: err.response?.data?.message || 'Could not change password.' }); }
  };

  const cls = 'mt-1 w-full border rounded-lg px-3 py-2.5 text-base';
  return (
    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold">Change Password</h1>
      <p className="text-sm text-slate-500 mt-1">Update the password for your logged-in admin account.</p>
      <form onSubmit={submit} className="bg-white border rounded-2xl p-4 sm:p-6 mt-4 space-y-4 max-w-lg">
        {msg && (
          <div className={`p-3 rounded text-sm border ${msg.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
            {msg.text}
          </div>
        )}
        <div>
          <label className="text-sm font-semibold">Current password</label>
          <input type="password" required value={form.current} onChange={(e) => setForm({ ...form, current: e.target.value })} className={cls} autoComplete="current-password" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">New password</label>
            <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={cls} autoComplete="new-password" />
          </div>
          <div>
            <label className="text-sm font-semibold">Confirm new password</label>
            <input type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className={cls} autoComplete="new-password" />
          </div>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-semibold w-full sm:w-auto">Update password</button>
      </form>
    </div>
  );
}

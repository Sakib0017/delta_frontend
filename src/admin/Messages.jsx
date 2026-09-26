import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Messages() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/contacts').then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const del = async (id) => { if (!confirm('Delete this inquiry?')) return; await api.delete(`/contacts/${id}`); load(); };
  return (
    <div className="min-w-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div><h1 className="text-xl sm:text-2xl font-bold">Contact Inquiries</h1><p className="text-sm text-slate-500 mt-1">Messages from the public contact form.</p></div>
        <div className="text-sm bg-white border rounded-lg px-3 py-1 w-fit">Total: {items.length}</div>
      </div>

      {/* Desktop table */}
      <div className="bg-white border rounded-2xl mt-4 overflow-x-auto hidden sm:block">
        <table className="w-full text-sm min-w-[640px]">
          <thead><tr className="bg-slate-50 text-left"><th className="px-4 py-3">Sender</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Subject & Message</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="px-4 py-2 font-semibold whitespace-nowrap">{m.firstName} {m.lastName}</td>
                <td className="px-4 py-2 break-all">{m.email}<br /><span className="text-slate-500">{m.mobile}</span></td>
                <td className="px-4 py-2"><strong>{m.subject}</strong><br /><span className="text-slate-500">{m.message}</span></td>
                <td className="px-4 py-2 text-right"><button onClick={() => del(m._id)} className="text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-6 text-center text-slate-400">No inquiries found.</div>}
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden mt-4 space-y-3">
        {items.map((m) => (
          <div key={m._id} className="bg-white border rounded-xl p-4 text-sm">
            <div className="flex justify-between items-start gap-2">
              <div className="font-semibold">{m.firstName} {m.lastName}</div>
              <button onClick={() => del(m._id)} className="text-red-600 text-sm shrink-0">Delete</button>
            </div>
            <div className="text-slate-500 text-xs mt-1 break-all">{m.email} · {m.mobile}</div>
            <div className="mt-2"><strong>{m.subject}</strong></div>
            <div className="text-slate-600 mt-1 leading-relaxed break-words">{m.message}</div>
          </div>
        ))}
        {items.length === 0 && <div className="bg-white border rounded-xl p-6 text-center text-slate-400 text-sm">No inquiries found.</div>}
      </div>
    </div>
  );
}

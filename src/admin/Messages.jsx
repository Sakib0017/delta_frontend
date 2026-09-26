import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Messages() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/contacts').then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const del = async (id) => { if (!confirm('Delete this inquiry?')) return; await api.delete(`/contacts/${id}`); load(); };
  return (
    <div className="min-w-0 max-w-3xl">
      <div className="flex justify-between items-center gap-2">
        <div><h1 className="text-xl sm:text-2xl font-bold">Messages</h1><p className="text-sm text-slate-500 mt-1">Inquiries from the contact form.</p></div>
        <div className="text-sm bg-white border rounded-lg px-3 py-1 whitespace-nowrap">{items.length}</div>
      </div>

      <div className="mt-4 space-y-2.5">
        {items.map((m) => (
          <div key={m._id} className="bg-white border rounded-xl p-4">
            <div className="flex justify-between items-start gap-2">
              <div className="font-semibold text-sm min-w-0">{m.firstName} {m.lastName}</div>
              <button onClick={() => del(m._id)} className="text-red-600 text-sm shrink-0 font-medium">Delete</button>
            </div>
            <div className="text-xs text-slate-500 mt-0.5 break-all">{m.email}{m.mobile ? ` · ${m.mobile}` : ''}</div>
            <div className="text-sm mt-2 font-medium">{m.subject}</div>
            <div className="text-sm text-slate-600 mt-0.5 leading-relaxed break-words">{m.message}</div>
          </div>
        ))}
        {items.length === 0 && <div className="bg-white border rounded-xl p-6 text-center text-slate-400 text-sm">No inquiries found.</div>}
      </div>
    </div>
  );
}

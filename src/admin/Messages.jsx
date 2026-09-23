import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Messages() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/contacts').then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const del = async (id) => { if (!confirm('Delete this inquiry?')) return; await api.delete(`/contacts/${id}`); load(); };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Contact Inquiries</h1><p className="text-sm text-slate-500">Messages from the public contact form.</p></div>
        <div className="text-sm bg-white border rounded-lg px-3 py-1">Total: {items.length}</div>
      </div>
      <div className="bg-white border rounded-2xl mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-slate-50 text-left"><th className="px-4 py-3">Sender</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Subject & Message</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="px-4 py-2 font-semibold">{m.firstName} {m.lastName}</td>
                <td className="px-4 py-2">{m.email}<br /><span className="text-slate-500">{m.mobile}</span></td>
                <td className="px-4 py-2"><strong>{m.subject}</strong><br /><span className="text-slate-500">{m.message}</span></td>
                <td className="px-4 py-2 text-right"><button onClick={() => del(m._id)} className="text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-6 text-center text-slate-400">No inquiries found.</div>}
      </div>
    </div>
  );
}

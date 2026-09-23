import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { imgUrl } from '../lib/api';

export default function NewsDetail() {
  const { id } = useParams();
  const [n, setN] = useState(null);
  useEffect(() => { api.get(`/news/${id}`).then((r) => setN(r.data)).catch(() => {}); }, [id]);
  if (!n) return <div className="max-w-3xl mx-auto p-10">Loading…</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-emerald-700">← Back</Link>
      <h1 className="text-3xl font-bold mt-2">{n.header}</h1>
      <img src={imgUrl(n.img)} alt="" className="rounded-xl my-4 w-full object-cover" />
      <p className="whitespace-pre-line text-slate-700">{n.content}</p>
      {n.detail && <p className="whitespace-pre-line text-slate-700 mt-3">{n.detail}</p>}
    </div>
  );
}

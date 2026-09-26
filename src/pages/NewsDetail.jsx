import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { imgUrl } from '../lib/api';

export default function NewsDetail() {
  const { id } = useParams();
  const [n, setN] = useState(null);
  useEffect(() => { api.get(`/news/${id}`).then((r) => setN(r.data)).catch(() => {}); }, [id]);
  if (!n) return <div className="max-w-3xl mx-auto p-6 sm:p-10 text-sm sm:text-base">Loading…</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 overflow-x-hidden">
      <Link to="/" className="text-sm text-emerald-700 font-medium">← Back</Link>
      <h1 className="text-2xl sm:text-3xl font-bold mt-2 leading-tight">{n.header}</h1>
      <img src={imgUrl(n.img)} alt="" className="rounded-xl my-4 w-full max-h-[320px] sm:max-h-[440px] object-cover" />
      <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed">{n.content}</p>
      {n.detail && <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 mt-3 leading-relaxed">{n.detail}</p>}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { imgUrl } from '../lib/api';

export default function NewsDetail() {
  const { id } = useParams();
  const [n, setN] = useState(null);
  useEffect(() => { api.get(`/news/${id}`).then((r) => setN(r.data)).catch(() => {}); }, [id]);
  if (!n) return <div className="max-w-3xl mx-auto p-6 sm:p-10 text-sm sm:text-base">Loading…</div>;
  return (
    <div className="mx-auto w-full max-w-3xl 2xl:max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-x-clip">
      <Link to="/" className="text-sm text-emerald-700 font-medium py-1 inline-block">← Back</Link>
      <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold mt-2 leading-tight text-balance">{n.header}</h1>
      <img src={imgUrl(n.img)} alt="" className="rounded-xl my-4 w-full max-h-[320px] sm:max-h-[440px] 2xl:max-h-[520px] object-cover aspect-[16/9]" />
      <p className="whitespace-pre-line text-sm sm:text-base 2xl:text-lg text-slate-700 leading-relaxed">{n.content}</p>
      {n.detail && <p className="whitespace-pre-line text-sm sm:text-base 2xl:text-lg text-slate-700 mt-3 leading-relaxed">{n.detail}</p>}
    </div>
  );
}

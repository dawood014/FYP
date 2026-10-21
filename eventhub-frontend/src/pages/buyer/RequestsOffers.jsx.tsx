import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { requestApi, type ServiceRequest } from '../../api/client';

const TABS = ['Pending', 'Quotes', 'Accepted', 'Declined'] as const;
type Tab = typeof TABS[number];
export default function RequestsOffers() {
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>('Quotes');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { requestApi.list().then((page) => setRequests(page.items)).catch((err) => setError(err instanceof Error ? err.message : 'Could not load requests.')); }, []);
  const offers = requests.flatMap((request) => (request.offers || []).map((offer) => ({ offer, request })));
  const counts: Record<Tab, number> = {
    Pending: requests.filter((request) => !request.offers?.length).length,
    Quotes: offers.filter(({ offer }) => offer.status === 'SENT').length,
    Accepted: offers.filter(({ offer }) => offer.status === 'ACCEPTED').length,
    Declined: offers.filter(({ offer }) => offer.status === 'DECLINED').length,
  };
  const rows = tab === 'Pending' ? requests.filter((request) => !request.offers?.length).map((request) => ({ id: request.id, request, offer: null })) : offers.filter(({ offer }) => tab === 'Quotes' ? offer.status === 'SENT' : tab === 'Accepted' ? offer.status === 'ACCEPTED' : offer.status === 'DECLINED');
  return <div className="space-y-6"><h1 className="text-2xl font-extrabold text-[#0f1f3d]">Requests & Offers</h1>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<div className="bg-white rounded-2xl border border-slate-100 overflow-hidden"><div className="flex border-b border-slate-100">{TABS.map((item) => <button key={item} onClick={() => setTab(item)} className={'flex-1 py-3.5 text-sm font-semibold transition-colors ' + (tab === item ? 'text-[#4f8ef7] border-b-2 border-[#4f8ef7]' : 'text-slate-500 hover:text-slate-700')}>{item} {counts[item] > 0 && <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-slate-100">{counts[item]}</span>}</button>)}</div><div className="p-4">{!rows.length ? <div className="text-center py-16"><div className="text-4xl mb-3">ðŸ“­</div><p className="font-bold text-[#0f1f3d] mb-1">No {tab.toLowerCase()} requests</p><p className="text-slate-400 text-sm">Requests in this category will appear here.</p></div> : <div className="space-y-3">{rows.map(({ request, offer }) => <div key={(offer?.id || request.id)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold flex-shrink-0">#{request.id}</div><div><div className="font-semibold text-[#0f1f3d] text-sm">{offer?.seller?.name || 'Waiting for provider'} </div><div className="text-xs text-slate-500">{request.title} · {request.eventDate ? new Date(request.eventDate).toLocaleDateString() : 'Date not set'}</div>{offer && <div className="text-sm font-extrabold text-[#0f1f3d] mt-1">{offer.currency} {Number(offer.amount).toLocaleString()}</div>}</div></div><div className="flex items-center gap-2"><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">{offer?.status || request.status}</span>{offer?.status === 'SENT' && <button onClick={() => nav('/buyer/quote-details?offerId=' + offer.id)} className="text-xs font-semibold text-[#4f8ef7] border border-[#4f8ef7]/30 px-3 py-1.5 rounded-lg">View Quote</button>}</div></div>)}</div>}</div></div></div>;
}
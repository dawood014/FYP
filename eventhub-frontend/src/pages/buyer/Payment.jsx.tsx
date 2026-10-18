import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { bookingApi, paymentApi, type Booking } from '../../api/client';

const METHODS = [
  { id: 'card', label: 'Debit / Credit Card', icon: 'ðŸ’³' },
  { id: 'jazzcash', label: 'JazzCash', icon: 'ðŸ“±' },
  { id: 'easypaisa', label: 'EasyPaisa', icon: 'ðŸ’š' },
  { id: 'bank', label: 'Bank Transfer', icon: 'ðŸ¦' },
];
export default function Payment() {
  const [method, setMethod] = useState('card');
  const [params] = useSearchParams();
  const bookingId = Number(params.get('bookingId'));
  const [booking, setBooking] = useState<Booking | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (bookingId) bookingApi.get(bookingId).then(setBooking).catch((err) => setError(err instanceof Error ? err.message : 'Could not load booking.')); }, [bookingId]);
  const requestPayment = async () => {
    if (!bookingId) { setError('Choose an accepted booking first.'); return; }
    setError(''); setNotice(''); setBusy(true);
    try { await paymentApi.request(bookingId); setNotice('Payment request recorded. No payment provider is configured, so no money has been collected.'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not create payment request.'); }
    finally { setBusy(false); }
  };
  const provider = booking?.seller?.sellerProfile?.businessName || booking?.seller?.name || '—';
  const amount = booking ? Number(booking.amount) : 0;
  return <div className="max-w-2xl mx-auto space-y-6"><h1 className="text-2xl font-extrabold text-[#0f1f3d]">Payment</h1><div className="grid sm:grid-cols-5 gap-6"><div className="sm:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 space-y-5"><h2 className="font-bold text-[#0f1f3d]">Payment Method</h2><div className="space-y-2">{METHODS.map((item) => <label key={item.id} className={'flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ' + (method === item.id ? 'border-[#4f8ef7] bg-blue-50' : 'border-slate-100 hover:border-slate-200')}><input type="radio" name="method" value={item.id} checked={method === item.id} onChange={() => setMethod(item.id)} className="text-[#4f8ef7]"/><span className="text-xl">{item.icon}</span><span className="font-semibold text-sm text-[#0f1f3d]">{item.label}</span></label>)}</div>{method === 'card' && <div className="space-y-3 pt-2"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Card Number</label><input autoComplete="off" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"/></div><div className="grid grid-cols-2 gap-3"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Expiry</label><input autoComplete="off" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"/></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">CVV</label><input autoComplete="off" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"/></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Name on Card</label><input autoComplete="off" placeholder="Ahmed Khan" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"/></div></div>}{error && <p role="alert" className="text-sm text-red-600">{error}</p>}{notice && <p role="status" className="text-sm text-amber-700 bg-amber-50 rounded-xl p-3">{notice}</p>}<button onClick={() => void requestPayment()} disabled={busy || !booking} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-60">{busy ? 'Submitting…' : 'Request Payment'}</button><p className="text-xs text-slate-400 text-center">Payment provider is not configured. Card details are not sent or stored.</p></div><div className="sm:col-span-2 space-y-4"><div className="bg-white rounded-2xl border border-slate-100 p-5"><h2 className="font-bold text-[#0f1f3d] mb-4">Order Summary</h2><div className="space-y-2 text-sm"><div className="flex justify-between text-slate-600"><span>Provider</span><span className="font-semibold text-right">{provider}</span></div><div className="flex justify-between text-slate-600"><span>Service</span><span className="font-semibold text-right">{booking?.listing?.title || '—'}</span></div><div className="flex justify-between text-slate-600"><span>Date</span><span className="font-semibold">{booking?.eventDate ? new Date(booking.eventDate).toLocaleDateString() : '—'}</span></div><hr className="border-slate-100 my-3"/><div className="flex justify-between text-slate-600"><span>Booking Amount</span><span className="font-semibold">{booking?.currency || 'PKR'} {amount.toLocaleString()}</span></div><hr className="border-slate-100 my-3"/><div className="flex justify-between font-extrabold text-[#0f1f3d] text-base"><span>Amount Due</span><span>{booking?.currency || 'PKR'} {amount.toLocaleString()}</span></div></div></div></div></div></div>;
}
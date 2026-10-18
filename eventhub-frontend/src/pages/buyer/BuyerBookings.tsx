import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { bookingApi, type Booking } from '../../api/client';

export default function BuyerBookings() {
  const nav = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');
  const load = () => bookingApi.list().then((page) => setBookings(page.items)).catch((err) => setError(err instanceof Error ? err.message : 'Could not load bookings.'));
  useEffect(() => { void load(); }, []);
  const cancel = async (booking: Booking) => { try { await bookingApi.updateStatus(booking.id, 'CANCELLED'); await load(); } catch (err) { setError(err instanceof Error ? err.message : 'Could not cancel booking.'); } };
  return <div className="space-y-6"><h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Bookings</h1>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<div className="space-y-4">{bookings.map((booking) => {
    const canPay = ['ACCEPTED', 'CONFIRMED'].includes(booking.status);
    const canCancel = ['PENDING', 'ACCEPTED', 'CONFIRMED'].includes(booking.status);
    return <div key={booking.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold text-slate-400">#{booking.id}</span><span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">{booking.status}</span></div><h3 className="font-bold text-[#0f1f3d]">{booking.seller?.sellerProfile?.businessName || booking.seller?.name || 'Service provider'} — {booking.listing?.title || 'Service booking'}</h3><p className="text-xs text-slate-500 mt-0.5">{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : 'Date not set'}</p></div><div className="flex items-center gap-3"><span className="font-extrabold text-[#0f1f3d]">{booking.currency} {Number(booking.amount).toLocaleString()}</span>{canPay && <button onClick={() => nav('/buyer/payment?bookingId=' + booking.id)} className="text-xs font-bold bg-[#4f8ef7] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a7ae8] transition-colors">Pay Now</button>}<button onClick={() => nav('/buyer/booking?bookingId=' + booking.id)} className="text-xs font-semibold border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">View</button>{canCancel && <button onClick={() => void cancel(booking)} className="text-xs font-semibold text-red-500 px-2 py-1.5">Cancel</button>}</div></div></div>;
  })}{!bookings.length && !error && <p className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-sm text-slate-400">No bookings yet.</p>}</div></div>;
}
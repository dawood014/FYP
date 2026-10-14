import { useNavigate } from 'react-router';

const BOOKINGS = [
  { id: 'BK-001', provider: 'Lens & Light Studio', service: 'Photography', event: 'TechCorp Conference', date: 'Oct 20, 2024', amount: 'Rs. 45,000', status: 'Confirmed' },
  { id: 'BK-002', provider: 'Bloom & Décor', service: 'Decoration', event: 'Sara & Ali Wedding', date: 'Nov 15, 2024', amount: 'Rs. 28,000', status: 'Pending Payment' },
];

export default function BuyerBookings() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Bookings</h1>
      <div className="space-y-4">
        {BOOKINGS.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400">{b.id}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{b.status}</span>
                </div>
                <h3 className="font-bold text-[#0f1f3d]">{b.provider} — {b.service}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{b.event} · 📅 {b.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-[#0f1f3d]">{b.amount}</span>
                {b.status === 'Pending Payment' && (
                  <button onClick={() => nav('/buyer/payment')} className="text-xs font-bold bg-[#4f8ef7] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a7ae8] transition-colors">Pay Now</button>
                )}
                <button onClick={() => nav('/buyer/booking')} className="text-xs font-semibold border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router';
import Icon, { type IconName } from '../../components/Icon';

const STATS: { label: string; value: string; change: string; color: string; icon: IconName }[] = [
  { label: 'New Requests', value: '5', change: '+2', color: 'text-blue-600 bg-blue-50', icon: 'inbox' },
  { label: 'Upcoming Bookings', value: '3', change: 'this week', color: 'text-emerald-600 bg-emerald-50', icon: 'booking' },
  { label: 'Monthly Earnings', value: 'Rs. 90K', change: '+12%', color: 'text-violet-600 bg-violet-50', icon: 'wallet' },
  { label: 'Avg Rating', value: '4.9', change: '128 reviews', color: 'text-amber-600 bg-amber-50', icon: 'star' },
];

export default function SellerDashboard() {
  const nav = useNavigate();
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Good morning, Lens & Light Studio</h1>
          <p className="text-slate-500 text-sm mt-1">You have 5 new requests waiting for your response.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => nav('/seller/services/new')} className="text-sm font-semibold border border-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">+ Add Service</button>
          <button onClick={() => nav('/seller/requests')} className="text-sm font-semibold bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors">View Requests</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><Icon name={s.icon} className="size-5" /></div>
            <div className="text-2xl font-extrabold text-[#0f1f3d] mb-0.5">{s.value}</div>
            <div className="text-slate-400 text-xs">{s.label}</div>
            <div className="text-xs text-emerald-500 font-semibold mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-[#0f1f3d]">Recent Requests</h2>
            <button onClick={() => nav('/seller/requests')} className="text-xs text-emerald-500 font-semibold hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {[
              { buyer: 'Ahmed Khan', event: 'TechCorp Conference', service: 'Photography', guests: '500', date: 'Oct 20', budget: 'Rs. 50,000', status: 'New', statusColor: 'bg-blue-50 text-blue-700' },
              { buyer: 'Sara Malik', event: 'Nikah Ceremony', service: 'Photography', guests: '200', date: 'Nov 5', budget: 'Rs. 35,000', status: 'New', statusColor: 'bg-blue-50 text-blue-700' },
            ].map((r, i) => (
              <div key={i} onClick={() => nav('/seller/requests')} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#0f1f3d]">{r.event}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.buyer} · {r.service} · {r.guests} guests</div>
                    <div className="text-xs text-slate-500">{r.date} · Budget: {r.budget}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.statusColor}`}>{r.status}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); nav('/seller/create-quote'); }} className="flex-1 text-xs font-semibold bg-emerald-500 text-white py-1.5 rounded-lg hover:bg-emerald-600 transition-colors">Send Quote</button>
                  <button onClick={(e) => { e.stopPropagation(); window.alert('Request management is not connected to a backend. No request was declined.'); }} className="flex-1 text-xs font-semibold border border-slate-200 text-slate-600 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-[#0f1f3d]">Upcoming Bookings</h2>
            <button onClick={() => nav('/seller/bookings')} className="text-xs text-emerald-500 font-semibold hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {[
              { id: 'BK-001', event: 'TechCorp Conference', buyer: 'Ahmed Khan', date: 'Oct 20, 2024', amount: 'Rs. 45,000', status: 'Confirmed' },
              { id: 'BK-002', event: 'Sara & Ali Wedding', buyer: 'Sara Malik', date: 'Nov 15, 2024', amount: 'Rs. 60,000', status: 'Pending Payment' },
            ].map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm text-[#0f1f3d]">{b.event}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5"><span>{b.buyer}</span><span className="text-slate-300">·</span><Icon name="calendar" className="size-3.5" /><span>{b.date}</span></div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-[#0f1f3d]">{b.amount}</div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-extrabold text-[#0f1f3d]">Monthly Revenue</h2>
          <span className="text-xs text-slate-400">Last 6 months</span>
        </div>
        <div className="flex items-end gap-3 h-32">
          {[
            { month: 'Apr', amount: 60000 },
            { month: 'May', amount: 80000 },
            { month: 'Jun', amount: 55000 },
            { month: 'Jul', amount: 90000 },
            { month: 'Aug', amount: 75000 },
            { month: 'Sep', amount: 90000 },
          ].map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400 font-medium">{(d.amount / 1000).toFixed(0)}k</span>
              <div className="w-full bg-emerald-500/80 hover:bg-emerald-500 rounded-t-lg transition-colors" style={{ height: `${(d.amount / 90000) * 100}%` }} />
              <span className="text-xs text-slate-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Link, useNavigate } from 'react-router';
import StarRating from '../../components/StarRating';
import Icon, { type IconName } from '../../components/Icon';

const STATS: { label: string; value: string; color: string; icon: IconName }[] = [
  { label: 'Upcoming Events', value: '2', color: 'bg-blue-50 text-blue-600', icon: 'calendar' },
  { label: 'Pending Requests', value: '3', color: 'bg-amber-50 text-amber-600', icon: 'clipboard' },
  { label: 'Active Bookings', value: '1', color: 'bg-emerald-50 text-emerald-600', icon: 'booking' },
];

export default function BuyerDashboard() {
  const nav = useNavigate();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Good morning, Ahmed</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your events.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => nav('/buyer/find-services')} className="text-sm font-semibold border border-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">Find Services</button>
          <button onClick={() => nav('/buyer/create-event')} className="text-sm font-semibold bg-[#4f8ef7] text-white px-4 py-2 rounded-xl hover:bg-[#3a7ae8] transition-colors">+ Create Event</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><Icon name={s.icon} className="size-5" /></div>
            <div className="text-3xl font-extrabold text-[#0f1f3d] mb-1">{s.value}</div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Event */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-[#0f1f3d]">Upcoming Event</h2>
            <Link to="/buyer/events" className="text-xs text-[#4f8ef7] font-semibold hover:underline">View all</Link>
          </div>
          <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] rounded-xl p-5 text-white">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs bg-[#4f8ef7]/30 text-blue-200 px-2 py-0.5 rounded-full font-medium">Corporate</span>
                <h3 className="font-extrabold text-lg mt-2">TechCorp Annual Conference</h3>
              </div>
              <span className="text-xs bg-amber-400/20 text-amber-200 px-2 py-1 rounded-full font-semibold">Planning</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mt-4">
              {([['calendar', 'Oct 20, 2024'], ['location', 'Islamabad'], ['users', '500 Guests']] as [IconName, string][]).map(([icon, val]) => (
                <div key={val} className="bg-white/10 rounded-lg p-2">
                  <Icon name={icon} className="size-4 mx-auto mb-1 text-blue-200" />
                  <div className="text-xs text-blue-200">{val}</div>
                </div>
              ))}
            </div>
            <button onClick={() => nav('/buyer/event-workspace')} className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 rounded-lg transition-colors">
              Open Event Workspace →
            </button>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-[#0f1f3d]">Recent Requests</h2>
            <Link to="/buyer/requests" className="text-xs text-[#4f8ef7] font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {[
              { provider: 'Lens & Light Studio', service: 'Photography', event: 'TechCorp Conference', status: 'Quote Received', statusColor: 'bg-emerald-50 text-emerald-600' },
              { provider: 'Echo Sound Solutions', service: 'Sound & AV', event: 'TechCorp Conference', status: 'Pending', statusColor: 'bg-amber-50 text-amber-600' },
            ].map((r, i) => (
              <div key={i} onClick={() => nav('/buyer/requests')} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-slate-100">
                <div>
                  <div className="font-semibold text-sm text-[#0f1f3d]">{r.provider}</div>
                  <div className="text-xs text-slate-500">{r.service} · {r.event}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.statusColor}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-extrabold text-[#0f1f3d]">Recent Bookings</h2>
          <Link to="/buyer/bookings" className="text-xs text-[#4f8ef7] font-semibold hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {[
            { id: 'BK-001', provider: 'Bloom & Décor', service: 'Decoration', event: 'Sara & Ali Wedding', amount: 'Rs. 28,000', status: 'Confirmed', statusColor: 'bg-emerald-50 text-emerald-700' },
            { id: 'BK-002', provider: 'Grand Feast Co.', service: 'Catering', event: 'TechCorp Conference', amount: 'Rs. 120,000', status: 'Pending Payment', statusColor: 'bg-amber-50 text-amber-700' },
          ].map((b) => (
            <div key={b.id} onClick={() => nav('/buyer/booking')} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">{b.id}</div>
                <div>
                  <div className="font-semibold text-sm text-[#0f1f3d]">{b.provider} — {b.service}</div>
                  <div className="text-xs text-slate-500">{b.event}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm text-[#0f1f3d]">{b.amount}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.statusColor}`}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

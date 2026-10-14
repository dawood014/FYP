import { useNavigate } from 'react-router';
import Icon, { type IconName } from '../../components/Icon';

const STATS: { label: string; value: string; change: string; color: string; icon: IconName }[] = [
  { label: 'Total Users', value: '12,450', change: '+124 this week', color: 'bg-blue-50 text-blue-600', icon: 'users' },
  { label: 'Total Sellers', value: '1,230', change: '18 pending', color: 'bg-emerald-50 text-emerald-600', icon: 'building' },
  { label: 'Total Events', value: '5,670', change: '+89 this month', color: 'bg-amber-50 text-amber-600', icon: 'calendar' },
  { label: 'Total Bookings', value: '8,920', change: 'Rs. 89M total', color: 'bg-violet-50 text-violet-600', icon: 'booking' },
  { label: 'Revenue', value: 'Rs. 8.9M', change: 'Commission 10%', color: 'bg-pink-50 text-pink-600', icon: 'wallet' },
  { label: 'Pending Verification', value: '23', change: 'Requires action', color: 'bg-orange-50 text-orange-600', icon: 'check' },
  { label: 'Disputes', value: '7', change: '3 urgent', color: 'bg-red-50 text-red-600', icon: 'warning' },
  { label: 'Avg Rating', value: '4.7', change: 'Platform wide', color: 'bg-slate-50 text-slate-600', icon: 'star' },
];

export default function AdminDashboard() {
  const nav = useNavigate();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Platform overview as of {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}><Icon name={s.icon} className="size-4.5" /></div>
            <div className="text-xl font-extrabold text-[#0f1f3d] mb-0.5">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
            <div className="text-xs text-slate-400 mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User growth */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-bold text-[#0f1f3d] mb-5">User Growth</h2>
          <div className="flex items-end gap-2 h-28">
            {[800, 1200, 950, 1500, 1800, 2100, 1650, 2400, 2800, 3200, 2900, 3600].map((v, i) => (
              <div key={i} className="flex-1 bg-violet-500/70 hover:bg-violet-500 rounded-t-md transition-colors" style={{ height: `${(v / 3600) * 100}%` }} title={`${v} users`} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-bold text-[#0f1f3d] mb-5">Monthly Revenue (Commission)</h2>
          <div className="flex items-end gap-2 h-28">
            {[400, 650, 500, 800, 1100, 950, 1300, 1200, 1500, 1800, 1600, 2000].map((v, i) => (
              <div key={i} className="flex-1 bg-emerald-500/70 hover:bg-emerald-500 rounded-t-md transition-colors" style={{ height: `${(v / 2000) * 100}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-bold text-[#0f1f3d] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Verify Sellers (23)', href: '/admin/verification', color: 'bg-orange-500 text-white' },
            { label: 'Review Disputes (7)', href: '/admin/disputes', color: 'bg-red-500 text-white' },
            { label: 'Manage Users', href: '/admin/users', color: 'bg-[#4f8ef7] text-white' },
            { label: 'View Reports', href: '/admin/reports', color: 'bg-violet-500 text-white' },
          ].map((a) => (
            <button key={a.label} onClick={() => nav(a.href)} className={`${a.color} text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity`}>{a.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

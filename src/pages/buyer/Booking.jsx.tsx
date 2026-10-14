import { useNavigate } from 'react-router';

const TIMELINE = [
  { label: 'Requested', done: true, date: 'Sep 28, 2024' },
  { label: 'Confirmed', done: true, date: 'Sep 29, 2024' },
  { label: 'In Progress', done: false, date: 'Oct 20, 2024' },
  { label: 'Completed', done: false, date: '—' },
];

export default function Booking() {
  const nav = useNavigate();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => nav('/buyer/requests')} className="text-slate-500 hover:text-[#0f1f3d] text-sm">← Back</button>
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Booking Details</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Booking ID</div>
            <div className="font-extrabold text-[#0f1f3d] text-lg">BK-2024-001</div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full">Confirmed</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ['Provider', 'Lens & Light Studio'],
            ['Service', 'Photography & Videography'],
            ['Event', 'TechCorp Annual Conference'],
            ['Date', 'October 20, 2024'],
            ['Location', 'Islamabad'],
            ['Amount', 'Rs. 45,000'],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-xs text-slate-400 mb-0.5">{k}</div>
              <div className="font-semibold text-[#0f1f3d] text-sm">{v}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="font-bold text-[#0f1f3d] text-sm mb-4">Booking Timeline</h3>
          <div className="space-y-3">
            {TIMELINE.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${t.done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {t.done ? '✓' : i + 1}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className={`text-sm font-semibold ${t.done ? 'text-[#0f1f3d]' : 'text-slate-400'}`}>{t.label}</span>
                  <span className="text-xs text-slate-400">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => nav('/buyer/payment')} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
          Proceed to Payment →
        </button>
      </div>
    </div>
  );
}

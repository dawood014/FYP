import { useNavigate } from 'react-router';

const EVENTS = [
  { id: 'EV-001', name: 'TechCorp Annual Conference', category: 'Corporate', date: 'Oct 20, 2024', location: 'Islamabad', guests: 500, budget: 'Rs. 500,000', status: 'Planning' },
  { id: 'EV-002', name: 'Sara & Ali Wedding', category: 'Wedding', date: 'Nov 15, 2024', location: 'Lahore', guests: 400, budget: 'Rs. 300,000', status: 'Confirmed' },
];

export default function MyEvents() {
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Events</h1>
        <button onClick={() => nav('/buyer/create-event')} className="text-sm font-bold bg-[#4f8ef7] text-white px-4 py-2 rounded-xl hover:bg-[#3a7ae8] transition-colors">+ Create Event</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {EVENTS.map((ev) => (
          <div key={ev.id} onClick={() => nav('/buyer/event-workspace')} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{ev.category}</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ev.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{ev.status}</span>
            </div>
            <h2 className="font-extrabold text-[#0f1f3d] text-lg mb-3 group-hover:text-[#4f8ef7] transition-colors">{ev.name}</h2>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <span>📅 {ev.date}</span>
              <span>📍 {ev.location}</span>
              <span>👥 {ev.guests} guests</span>
              <span>💰 {ev.budget}</span>
            </div>
            <button onClick={(event) => { event.stopPropagation(); nav('/buyer/event-workspace'); }} className="mt-4 w-full text-xs font-semibold text-[#4f8ef7] border border-[#4f8ef7]/30 py-2 rounded-xl hover:bg-[#4f8ef7]/5 transition-colors">Open Workspace →</button>
          </div>
        ))}

        <div onClick={() => nav('/buyer/create-event')} className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#4f8ef7] group transition-colors">
          <div className="text-4xl mb-3">🎪</div>
          <div className="font-bold text-slate-400 group-hover:text-[#4f8ef7] transition-colors text-sm">Create New Event</div>
        </div>
      </div>
    </div>
  );
}

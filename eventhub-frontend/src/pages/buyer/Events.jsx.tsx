import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { eventApi, type EventRecord } from '../../api/client';

export default function MyEvents() {
  const nav = useNavigate();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { eventApi.list().then((page) => setEvents(page.items)).catch((err) => setError(err instanceof Error ? err.message : 'Could not load events.')); }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d]">My Events</h1>
        <button onClick={() => nav('/buyer/create-event')} className="text-sm font-bold bg-[#4f8ef7] text-white px-4 py-2 rounded-xl hover:bg-[#3a7ae8] transition-colors">+ Create Event</button>
      </div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-5">
        {events.map((ev) => (
          <div key={ev.id} onClick={() => nav('/buyer/event-workspace', { state: { eventId: ev.id } })} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-3"><span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{ev.category}</span><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">{ev.status}</span></div>
            <h2 className="font-extrabold text-[#0f1f3d] text-lg mb-3 group-hover:text-[#4f8ef7] transition-colors">{ev.name}</h2>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500"><span>ðŸ“… {new Date(ev.eventDate).toLocaleDateString()}</span><span>ðŸ“ {ev.location}</span><span>ðŸ‘¥ {ev.guests} guests</span><span>ðŸ’° Rs. {Number(ev.budget).toLocaleString()}</span></div>
            <button onClick={(event) => { event.stopPropagation(); nav('/buyer/event-workspace', { state: { eventId: ev.id } }); }} className="mt-4 w-full text-xs font-semibold text-[#4f8ef7] border border-[#4f8ef7]/30 py-2 rounded-xl hover:bg-[#4f8ef7]/5 transition-colors">Open Workspace â†’</button>
          </div>
        ))}
        {!events.length && !error && <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-sm text-slate-400">No events yet.</div>}
        <div onClick={() => nav('/buyer/create-event')} className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#4f8ef7] group transition-colors"><div className="text-4xl mb-3">ðŸŽª</div><div className="font-bold text-slate-400 group-hover:text-[#4f8ef7] transition-colors text-sm">Create New Event</div></div>
      </div>
    </div>
  );
}

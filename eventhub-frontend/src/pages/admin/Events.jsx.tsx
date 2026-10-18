const EVENTS = [
  { id: 'EV-001', event: 'TechCorp Annual Conference', organizer: 'Ahmed Khan', category: 'Corporate', date: 'Oct 20, 2024', location: 'Islamabad', budget: 'Rs. 500,000', status: 'Active' },
  { id: 'EV-002', event: 'Sara & Ali Wedding', organizer: 'Sara Malik', category: 'Wedding', date: 'Nov 15, 2024', location: 'Lahore', budget: 'Rs. 300,000', status: 'Active' },
  { id: 'EV-003', event: 'Birthday Bash', organizer: 'Ali Hassan', category: 'Birthday', date: 'Oct 30, 2024', location: 'Karachi', budget: 'Rs. 50,000', status: 'Completed' },
];

export default function AdminEvents() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d]">Events Management</h1>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['ID', 'Event', 'Organizer', 'Category', 'Date', 'Location', 'Budget', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 px-5 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENTS.map((e) => (
                <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs font-bold text-slate-400">{e.id}</td>
                  <td className="px-5 py-4 font-semibold text-sm text-[#0f1f3d]">{e.event}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{e.organizer}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{e.category}</td>
                  <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{e.date}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{e.location}</td>
                  <td className="px-5 py-4 text-sm font-semibold">{e.budget}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${e.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

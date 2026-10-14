import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function RequestQuote() {
  const nav = useNavigate();
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">📤</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-2">Quote Request Sent!</h2>
        <p className="text-slate-500 text-sm mb-6">Lens & Light Studio will respond within 24 hours. You'll be notified when a quote arrives.</p>
        <div className="flex gap-3">
          <button onClick={() => nav('/buyer/requests')} className="flex-1 border border-slate-200 text-[#0f1f3d] font-semibold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors">View Requests</button>
          <button onClick={() => nav('/buyer/event-workspace')} className="flex-1 bg-[#4f8ef7] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#3a7ae8] transition-colors">Event Workspace</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-1">Request Quote</h1>
      <p className="text-slate-500 text-sm mb-8">Sending to: <span className="font-semibold text-[#0f1f3d]">Lens & Light Studio</span></p>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Event</label>
          <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
            <option>TechCorp Annual Conference</option>
            <option>Sara & Ali Wedding</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Service Required</label>
          <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
            <option>Photography</option>
            <option>Videography</option>
            <option>Both Photography & Videography</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Event Date</label>
            <input type="date" defaultValue="2024-10-20" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Location</label>
            <input defaultValue="Islamabad" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Expected Guests</label>
          <input type="number" defaultValue="500" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Your Budget (PKR)</label>
          <input type="number" placeholder="e.g. 50000" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Requirements</label>
          <textarea rows={3} placeholder="Describe what you need — coverage hours, specific shots, deliverables..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] resize-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Additional Notes <span className="font-normal text-slate-400">(optional)</span></label>
          <textarea rows={2} placeholder="Any other details..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] resize-none" />
        </div>
        <button onClick={() => setSent(true)} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
          Send Request →
        </button>
      </div>
    </div>
  );
}

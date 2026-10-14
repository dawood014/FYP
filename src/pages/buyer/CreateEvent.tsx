import { useState } from 'react';
import { useNavigate } from 'react-router';

const STEPS = ['Event Details', 'Budget', 'Services Needed', 'Review'];

const SERVICES_LIST = [
  { id: 'venue', label: 'Venue', icon: '🏛️' },
  { id: 'catering', label: 'Catering', icon: '🍽️' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'videography', label: 'Videography', icon: '🎥' },
  { id: 'sound', label: 'Sound & AV', icon: '🎙️' },
  { id: 'lighting', label: 'Lighting', icon: '💡' },
  { id: 'decoration', label: 'Decoration', icon: '🌸' },
  { id: 'transportation', label: 'Transportation', icon: '🚌' },
  { id: 'security', label: 'Security', icon: '🔐' },
  { id: 'branding', label: 'Branding', icon: '🎨' },
];

export default function CreateEvent() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(['photography', 'catering']);
  const [form, setForm] = useState({
    name: 'TechCorp Annual Conference',
    category: 'Corporate',
    date: '2024-10-20',
    time: '09:00',
    location: 'Islamabad',
    guests: '500',
    description: '',
    budget: '500000',
  });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleService = (id: string) => setSelectedServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  if (done) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-2">Your event has been created!</h2>
        <p className="text-slate-500 text-sm mb-6">Start finding service providers from the Event Workspace.</p>
        <button onClick={() => nav('/buyer/event-workspace')} className="w-full bg-[#4f8ef7] text-white font-bold py-3 rounded-xl hover:bg-[#3a7ae8] transition-colors">Open Event Workspace →</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-1">Create New Event</h1>
        <p className="text-slate-500 text-sm">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${i < step ? 'bg-[#4f8ef7] text-white' : i === step ? 'bg-[#0f1f3d] text-white' : 'bg-slate-100 text-slate-400'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-[#0f1f3d] font-bold' : 'text-slate-400'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-[#4f8ef7]' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Event Name</label><input value={form.name} onChange={set('name')} placeholder="e.g. Annual Corporate Conference" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
              <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Category</label>
                <select value={form.category} onChange={set('category')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
                  {['Wedding', 'Corporate', 'Birthday', 'Conference', 'Concert', 'Exhibition'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Location</label>
                <select value={form.location} onChange={set('location')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
                  {['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Date</label><input type="date" value={form.date} onChange={set('date')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
              <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Time</label><input type="time" value={form.time} onChange={set('time')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Expected Guests</label><input type="number" value={form.guests} onChange={set('guests')} placeholder="e.g. 200" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Description <span className="text-slate-400 font-normal">(optional)</span></label><textarea rows={3} value={form.description} onChange={set('description')} placeholder="Briefly describe your event..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] resize-none" /></div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Estimated Total Budget (PKR)</label>
              <input type="number" value={form.budget} onChange={set('budget')} placeholder="e.g. 500000" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" />
            </div>
            {form.budget && (
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-blue-700 text-sm font-semibold">Budget: Rs. {parseInt(form.budget).toLocaleString()}</p>
                <p className="text-blue-500 text-xs mt-1">This helps providers tailor their quotes to your budget.</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-slate-500 text-sm mb-4">Select all the services you need for your event. You can add more later.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICES_LIST.map((svc) => (
                <button key={svc.id} onClick={() => toggleService(svc.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedServices.includes(svc.id) ? 'border-[#4f8ef7] bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="text-2xl mb-1.5">{svc.icon}</div>
                  <div className={`text-sm font-bold ${selectedServices.includes(svc.id) ? 'text-[#4f8ef7]' : 'text-[#0f1f3d]'}`}>{svc.label}</div>
                  {selectedServices.includes(svc.id) && <div className="text-xs text-[#4f8ef7] mt-0.5">✓ Selected</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-[#0f1f3d] mb-4">Review Event Details</h3>
            {[
              ['Event Name', form.name],
              ['Category', form.category],
              ['Date & Time', `${form.date} at ${form.time}`],
              ['Location', form.location],
              ['Expected Guests', form.guests],
              ['Budget', `Rs. ${parseInt(form.budget || '0').toLocaleString()}`],
              ['Services', selectedServices.map((s) => SERVICES_LIST.find((sl) => sl.id === s)?.label).join(', ')],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="font-semibold text-[#0f1f3d] text-right max-w-xs">{v}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-8">
          {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 text-sm transition-colors">← Back</button>}
          <button onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : setDone(true)} className="flex-1 bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3 rounded-xl text-sm transition-colors">
            {step < STEPS.length - 1 ? 'Continue →' : 'Create Event 🎉'}
          </button>
        </div>
      </div>
    </div>
  );
}

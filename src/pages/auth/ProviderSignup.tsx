import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const STEPS = ['Business Info', 'Location & Services', 'Description', 'Verification'];

export default function ProviderSignup() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">🏢</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-2">Business Account Created!</h2>
        <p className="text-slate-500 text-sm mb-6">Complete your profile to start receiving bookings.</p>
        <button onClick={() => nav('/seller')} className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors">Complete Business Profile →</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#0f1f3d] flex items-center justify-center"><span className="text-white text-sm font-bold">E</span></div>
        <span className="text-[#0f1f3d] font-extrabold text-lg">EventHub</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-1">Create Provider Account</h1>
        <p className="text-slate-500 text-sm mb-6">Step {step + 1} of {STEPS.length}</p>

        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Business Name</label><input placeholder="Lens & Light Studio" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Contact Person</label><input placeholder="Muhammad Ali" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Email</label><input type="email" placeholder="info@lenslightstudio.pk" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Phone</label><input placeholder="+92 321 1234567" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">City</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">Select city</option>
                {['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Address</label><input placeholder="123 Main Street, Gulberg" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Primary Category</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">Select category</option>
                {['Photography', 'Catering', 'Decoration', 'Sound & AV', 'Venue', 'Transportation', 'Security', 'Branding'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Business Description</label><textarea rows={4} placeholder="Tell clients about your business, expertise, and what makes you unique..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Years of Experience</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                {['Less than 1 year', '1–2 years', '3–5 years', '5–10 years', '10+ years'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Website / Social Links <span className="text-slate-400 font-normal">(optional)</span></label><input placeholder="https://www.yourwebsite.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-slate-500 text-sm">Upload documents to get your business verified. Verified providers get more visibility and trust badges.</p>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-slate-600 text-sm font-medium">Drop verification documents here</p>
              <p className="text-slate-400 text-xs mt-1">CNIC, Business Registration, etc.</p>
              <button className="mt-4 text-xs text-emerald-500 font-semibold border border-emerald-200 px-4 py-1.5 rounded-lg hover:bg-emerald-50">Choose Files</button>
            </div>
            <p className="text-xs text-slate-400">Verification is optional. You can submit documents later from your profile.</p>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 text-sm transition-colors">← Back</button>}
          <button onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : setDone(true)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
            {step < STEPS.length - 1 ? 'Continue →' : 'Create Business Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

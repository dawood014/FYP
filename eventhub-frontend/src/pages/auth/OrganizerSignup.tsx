import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../auth/AuthProvider';

const STEPS = ['Personal Info', 'Account Setup', 'Review'];

export default function OrganizerSignup() {
  const nav = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', city: '', org: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setError('');
    if (form.name.trim().length < 2) { setError('Please enter your full name (at least 2 characters).'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setError('Please enter a valid email address.'); return; }
    if (form.password.length < 10) { setError('Password must be at least 10 characters long.'); setStep(1); return; }
    if (new TextEncoder().encode(form.password).length > 72) { setError('Password must be no more than 72 bytes.'); setStep(1); return; }
    setBusy(true);
    try { await register({ name: form.name, email: form.email, password: form.password, role: 'buyer' }); setDone(true); }
    catch (err) { setError(err instanceof Error ? err.message : 'Registration failed.'); }
    finally { setBusy(false); }
  };

  if (done) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">✅</div>
        <h2 className="text-2xl font-extrabold text-[#0f1f3d] mb-2">Account Created!</h2>
        <p className="text-slate-500 text-sm mb-6">Welcome to EventHub. Start planning your first event.</p>
        <button onClick={() => nav('/buyer')} className="w-full bg-[#4f8ef7] text-white font-bold py-3 rounded-xl hover:bg-[#3a7ae8] transition-colors">Go to Dashboard →</button>
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
        <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-1">Create Organizer Account</h1>
        <p className="text-slate-500 text-sm mb-6">Step {step + 1} of {STEPS.length}</p>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-[#4f8ef7] text-white' : 'bg-slate-100 text-slate-400'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-[#0f1f3d]' : 'text-slate-400'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Full Name</label><input value={form.name} onChange={set('name')} placeholder="Ahmed Khan" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Email</label><input type="email" value={form.email} onChange={set('email')} placeholder="ahmed@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Phone</label><input value={form.phone} onChange={set('phone')} placeholder="+92 300 1234567" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Password</label><input type="password" minLength={10} maxLength={72} autoComplete="new-password" value={form.password} onChange={set('password')} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /><p className="text-xs text-slate-400">Use a password with at least 10 characters.</p></div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">City</label>
              <select value={form.city} onChange={set('city')} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]">
                <option value="">Select city</option>
                {['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Organization <span className="text-slate-400 font-normal">(optional)</span></label><input value={form.org} onChange={set('org')} placeholder="Your company/org name" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" /></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h3 className="font-bold text-[#0f1f3d] mb-4">Review Your Information</h3>
            {[['Name', form.name || 'Ahmed Khan'], ['Email', form.email || 'ahmed@example.com'], ['Phone', form.phone || '+92 300 1234567'], ['City', form.city || 'Lahore'], ['Organization', form.org || '—']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="font-semibold text-[#0f1f3d]">{v}</span>
              </div>
            ))}
          </div>
        )}

        {error && <p role="alert" className="text-sm text-red-600 mt-4">{error}</p>}
        <div className="flex gap-3 mt-8">
          {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="flex-1 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 text-sm transition-colors">← Back</button>}
          <button onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : void submit()} disabled={busy} className="flex-1 bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3 rounded-xl text-sm transition-colors">
            {step < STEPS.length - 1 ? 'Continue →' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

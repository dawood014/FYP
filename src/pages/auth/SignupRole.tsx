import { Link, useNavigate } from 'react-router';

export default function SignupRole() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-[#0f1f3d] flex items-center justify-center"><span className="text-white text-sm font-bold">E</span></div>
        <span className="text-[#0f1f3d] font-extrabold text-lg">EventHub</span>
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-[#0f1f3d] mb-2">How will you use EventHub?</h1>
        <p className="text-slate-500">Choose your role to get started. You can always switch later.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <button onClick={() => nav('/signup/organizer')} className="bg-white border-2 border-slate-200 hover:border-[#4f8ef7] rounded-2xl p-8 text-left group transition-all hover:shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-[#4f8ef7]/10 flex items-center justify-center text-3xl mb-5 transition-colors">🎪</div>
          <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-2">Event Organizer</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">Create events, find service providers, compare quotes, and manage your bookings all in one place.</p>
          <span className="inline-flex items-center gap-2 bg-[#4f8ef7] text-white text-sm font-bold px-5 py-2.5 rounded-xl group-hover:bg-[#3a7ae8] transition-colors">
            Continue as Organizer →
          </span>
        </button>

        <button onClick={() => nav('/signup/provider')} className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-2xl p-8 text-left group transition-all hover:shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-500/10 flex items-center justify-center text-3xl mb-5 transition-colors">🏢</div>
          <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-2">Service Provider</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">Offer your services to event organizers, showcase your portfolio, receive bookings, and grow your business.</p>
          <span className="inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl group-hover:bg-emerald-600 transition-colors">
            Continue as Provider →
          </span>
        </button>
      </div>

      <p className="text-center text-sm text-slate-500 mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-[#4f8ef7] font-semibold hover:underline">Login</Link>
      </p>
    </div>
  );
}

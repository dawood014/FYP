import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../auth/AuthProvider';

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const user = await login(email, password);
      if (user.role !== role) throw new Error('This account does not have the selected role.');
      nav(user.role === 'admin' ? '/admin' : user.role === 'seller' ? '/seller' : '/buyer');
    } catch (err) { setError(err instanceof Error ? err.message : 'Login failed.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f1f3d] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #4f8ef7 0%, transparent 60%)' }} />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4f8ef7] flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="text-white font-extrabold text-lg">EventHub</span>
        </Link>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format" alt="Event" className="rounded-2xl w-full object-cover h-64 mb-8" />
          <blockquote className="text-white text-xl font-bold leading-snug mb-3">"EventHub made our corporate conference planning effortless. Found every vendor in one place."</blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4f8ef7] flex items-center justify-center text-white font-bold">S</div>
            <div>
              <div className="text-white text-sm font-semibold">Sara Malik</div>
              <div className="text-blue-300 text-xs">Event Manager, TechCorp Pakistan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0f1f3d] flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <span className="text-[#0f1f3d] font-extrabold text-lg">EventHub</span>
            </Link>
          </div>

          <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your EventHub account</p>

          {/* Demo role switcher */}
          <div className="bg-slate-50 rounded-xl p-1 flex mb-6">
            {(['buyer', 'seller', 'admin'] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-colors ${role === r ? 'bg-[#0f1f3d] text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                {r === 'buyer' ? 'Organizer' : r === 'seller' ? 'Provider' : 'Admin'}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 -mt-3 mb-6 text-center">Demo: select role to login</p>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0f1f3d] mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] focus:border-transparent" />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-[#0f1f3d]">Password</label>
                <button type="button" onClick={() => window.alert('Password recovery is not available because authentication is not connected.')} className="text-xs text-[#4f8ef7] hover:underline">Forgot password?</button>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] focus:border-transparent" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-[#4f8ef7]" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me</label>
            </div>
            <button type="submit" disabled={busy} className="w-full bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
              Login as {role === 'buyer' ? 'Organizer' : role === 'seller' ? 'Provider' : 'Admin'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button type="button" onClick={() => window.alert('Google sign-in is not configured.')} className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
            <span className="text-lg">G</span> Continue with Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4f8ef7] font-semibold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

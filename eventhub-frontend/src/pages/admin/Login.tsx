import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/AuthProvider';

export default function AdminLogin() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setBusy(true);
    try { const user = await login(email, password); if (user.role !== 'admin') throw new Error('This account is not an administrator.'); nav('/admin'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Login failed.'); }
    finally { setBusy(false); }
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-violet-500 flex items-center justify-center">
            <span className="text-white font-extrabold text-lg">E</span>
          </div>
        </div>
        <h1 className="text-xl font-extrabold text-white text-center mb-1">Admin Portal</h1>
        <p className="text-slate-400 text-sm text-center mb-6">EventHub Administration</p>

        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@eventhub.pk" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <button type="submit" disabled={busy} className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            Login to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}

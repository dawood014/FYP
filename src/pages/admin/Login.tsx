import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@eventhub.pk" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <button onClick={() => window.alert('Admin authentication is not configured. No session was created.')} className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            Login to Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}

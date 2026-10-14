import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import Icon, { type IconName } from '../components/Icon';

const SIDEBAR_LINKS: { label: string; href: string; icon: IconName }[] = [
  { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { label: 'Users', href: '/admin/users', icon: 'users' },
  { label: 'Sellers', href: '/admin/sellers', icon: 'building' },
  { label: 'Verification', href: '/admin/verification', icon: 'check' },
  { label: 'Services', href: '/admin/services', icon: 'package' },
  { label: 'Events', href: '/admin/events', icon: 'calendar' },
  { label: 'Bookings', href: '/admin/bookings', icon: 'booking' },
  { label: 'Payments', href: '/admin/payments', icon: 'card' },
  { label: 'Commissions', href: '/admin/commissions', icon: 'wallet' },
  { label: 'Reviews', href: '/admin/reviews', icon: 'star' },
  { label: 'Disputes', href: '/admin/disputes', icon: 'warning' },
  { label: 'Reports', href: '/admin/reports', icon: 'report' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings' },
];

export default function AdminLayout() {
  const loc = useLocation();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = (href: string) =>
    href === '/admin' ? loc.pathname === '/admin' : loc.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 flex flex-col transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="text-white font-extrabold text-base">EventHub Admin</span>
          <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-sm">SA</div>
            <div>
              <div className="text-white text-sm font-bold">Super Admin</div>
              <div className="text-violet-300 text-xs">Administrator</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {SIDEBAR_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-colors ${
                active(l.href) ? 'bg-violet-500 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon name={l.icon} className="size-4.5 shrink-0" />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button onClick={() => nav('/')} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
            <Icon name="logout" className="size-4" /> Back to Website
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <div className="w-5 h-0.5 bg-slate-700 mb-1.5 rounded" />
            <div className="w-5 h-0.5 bg-slate-700 mb-1.5 rounded" />
            <div className="w-5 h-0.5 bg-slate-700 rounded" />
          </button>
          <span className="text-slate-700 font-bold text-sm hidden sm:block">Admin Panel</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:block">admin@eventhub.pk</span>
            <button onClick={() => nav('/admin/login')} className="text-xs text-red-500 hover:text-red-700 font-medium">Logout</button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

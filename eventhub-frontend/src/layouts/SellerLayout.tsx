import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import Icon, { type IconName } from '../components/Icon';

const SIDEBAR_LINKS: { label: string; href: string; icon: IconName }[] = [
  { label: 'Dashboard', href: '/seller', icon: 'dashboard' },
  { label: 'Business Profile', href: '/seller/profile', icon: 'building' },
  { label: 'Services', href: '/seller/services', icon: 'package' },
  { label: 'Customer Requests', href: '/seller/requests', icon: 'inbox' },
  { label: 'Quotations', href: '/seller/quotations', icon: 'document' },
  { label: 'Bookings', href: '/seller/bookings', icon: 'booking' },
  { label: 'Messages', href: '/seller/messages', icon: 'message' },
  { label: 'Earnings', href: '/seller/earnings', icon: 'wallet' },
  { label: 'Analytics', href: '/seller/analytics', icon: 'chart' },
  { label: 'Notifications', href: '/seller/notifications', icon: 'bell' },
  { label: 'Settings', href: '/seller/settings', icon: 'settings' },
];

export default function SellerLayout() {
  const loc = useLocation();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = (href: string) =>
    href === '/seller' ? loc.pathname === '/seller' : loc.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1f3d] flex flex-col transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="text-white font-extrabold text-base">EventHub</span>
          <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">L</div>
            <div>
              <div className="text-white text-sm font-bold">Lens & Light Studio</div>
              <div className="text-emerald-300 text-xs">Service Provider</div>
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
                active(l.href) ? 'bg-emerald-500 text-white' : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon name={l.icon} className="size-4.5 shrink-0" />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button onClick={() => nav('/')} className="flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium transition-colors">
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
          <span className="text-slate-700 font-bold text-sm hidden sm:block">Seller Portal</span>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/seller/services/new" className="hidden sm:flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
              + Add Service
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

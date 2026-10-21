import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import Icon, { type IconName } from '../components/Icon';

const SIDEBAR_LINKS: { label: string; href: string; icon: IconName }[] = [
  { label: 'Dashboard', href: '/buyer', icon: 'dashboard' },
  { label: 'My Events', href: '/buyer/events', icon: 'calendar' },
  { label: 'Find Services', href: '/buyer/find-services', icon: 'search' },
  { label: 'Requests & Offers', href: '/buyer/requests', icon: 'clipboard' },
  { label: 'Messages', href: '/buyer/messages', icon: 'message' },
  { label: 'Bookings', href: '/buyer/bookings', icon: 'booking' },
  { label: 'Reviews', href: '/buyer/review', icon: 'star' },
  { label: 'Notifications', href: '/buyer/notifications', icon: 'bell' },
  { label: 'Profile', href: '/buyer/profile', icon: 'user' },
  { label: 'Settings', href: '/buyer/settings', icon: 'settings' },
];

export default function BuyerLayout() {
  const loc = useLocation();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = (href: string) =>
    href === '/buyer' ? loc.pathname === '/buyer' : loc.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1f3d] flex flex-col transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="w-7 h-7 rounded-lg bg-[#4f8ef7] flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="text-white font-extrabold text-base">EventHub</span>
          <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4f8ef7] flex items-center justify-center text-white font-bold text-sm">A</div>
            <div>
              <div className="text-white text-sm font-bold">Ahmed Khan</div>
              <div className="text-blue-300 text-xs">Event Organizer</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="text-blue-300/60 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Menu</p>
          {SIDEBAR_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-colors ${
                active(l.href) ? 'bg-[#4f8ef7] text-white' : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon name={l.icon} className="size-4.5 shrink-0" />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button onClick={() => nav('/')} className="flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium transition-colors w-full">
            <Icon name="logout" className="size-4" /> Back to Website
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <div className="w-5 h-0.5 bg-slate-700 mb-1.5 rounded" />
            <div className="w-5 h-0.5 bg-slate-700 mb-1.5 rounded" />
            <div className="w-5 h-0.5 bg-slate-700 rounded" />
          </button>
          <div className="hidden sm:block text-slate-500 text-sm">
            {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button onClick={() => nav('/buyer/notifications')} className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link to="/buyer/create-event" className="hidden sm:flex items-center gap-1.5 bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
              + Create Event
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

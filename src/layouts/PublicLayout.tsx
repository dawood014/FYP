import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#102c2a] flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <span className="text-[#102c2a] font-extrabold text-lg tracking-tight">EventHub</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <Link key={l.label} to={l.href} className="text-slate-600 hover:text-[#102c2a] text-sm font-medium transition-colors">{l.label}</Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-[#102c2a] hover:text-[#a56f27] transition-colors">Login</Link>
              <Link to="/signup" className="text-sm font-semibold bg-stone-100 text-[#102c2a] px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors">Sign Up</Link>
              <Link to="/signup" className="text-sm font-semibold bg-[#c89445] text-white px-4 py-2 rounded-lg hover:bg-[#b27c32] transition-colors">Create Event</Link>
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setOpen(!open)}>
              <div className="w-5 h-0.5 bg-slate-700 mb-1.5 rounded" />
              <div className="w-5 h-0.5 bg-slate-700 mb-1.5 rounded" />
              <div className="w-5 h-0.5 bg-slate-700 rounded" />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.href} className="text-slate-700 font-medium text-sm py-1" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <hr className="border-slate-100" />
            <Link to="/login" className="text-sm font-semibold text-[#102c2a]" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/signup" className="text-sm font-semibold bg-[#c89445] text-white px-4 py-2.5 rounded-lg text-center" onClick={() => setOpen(false)}>Create Event</Link>
          </div>
        )}
      </nav>

      <main className="pt-16 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0b211f] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#c89445] flex items-center justify-center">
                  <span className="text-white text-sm font-bold">E</span>
                </div>
                <span className="text-white font-extrabold text-lg">EventHub</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Pakistan's trusted marketplace for event services.</p>
            </div>
            {[
              { title: 'Platform', links: [{ label: 'How It Works', href: '/#how-it-works' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }] },
              { title: 'Services', links: [{ label: 'Photography', href: '/services?category=photography' }, { label: 'Catering', href: '/services?category=catering' }, { label: 'Decoration', href: '/services?category=decoration' }, { label: 'Sound & AV', href: '/services?category=music' }] },
              { title: 'Support', links: [{ label: 'Help Center', href: '/help' }, { label: 'Contact Us', href: '/contact' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms & Conditions', href: '/terms' }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}><Link to={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">© 2024 EventHub. All rights reserved.</p>
            <p className="text-slate-500 text-xs">Built for events across Pakistan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

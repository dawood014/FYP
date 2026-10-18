import { Link } from 'react-router';

const CONTENT: Record<string, { eyebrow: string; title: string; intro: string; sections: { title: string; body: string }[] }> = {
  privacy: {
    eyebrow: 'Legal', title: 'Privacy Policy', intro: 'We protect your data and explain clearly how it is used across EventHub.',
    sections: ['Introduction', 'Information We Collect', 'How We Use Information', 'Data Protection', 'User Rights', 'Cookies', 'Contact Information'].map((title) => ({ title, body: 'EventHub only collects information needed to operate bookings, payments, support, and marketplace safety. We apply appropriate safeguards and give you meaningful control over your information.' })),
  },
  terms: {
    eyebrow: 'Legal', title: 'Terms & Conditions', intro: 'The rules that keep EventHub safe, fair, and dependable for every participant.',
    sections: ['Introduction', 'User Accounts', 'Event Organizers', 'Service Providers', 'Bookings', 'Payments', 'Cancellations', 'Reviews', 'Prohibited Activities', 'Platform Responsibilities', 'Account Termination', 'Contact'].map((title) => ({ title, body: 'By using EventHub, users agree to provide accurate information, communicate responsibly, honor confirmed commitments, and follow marketplace and payment policies.' })),
  },
  about: {
    eyebrow: 'About EventHub', title: 'Better events start with trusted people', intro: 'We bring organizers and verified event professionals together in one transparent marketplace.',
    sections: [
      { title: 'Our mission', body: 'Make professional event planning accessible, reliable, and stress-free across Pakistan.' },
      { title: 'Why EventHub', body: 'Compare services, request tailored quotes, book securely, and manage every event from one workspace.' },
      { title: 'Built on trust', body: 'Provider verification, genuine reviews, clear pricing, and protected workflows help every event run confidently.' },
    ],
  },
};

export function InfoPage({ type }: { type: keyof typeof CONTENT }) {
  const content = CONTENT[type];
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#0f1f3d] py-20 text-center"><p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">{content.eyebrow}</p><h1 className="text-4xl font-extrabold text-white mb-4">{content.title}</h1><p className="text-blue-100/80 max-w-2xl mx-auto px-4">{content.intro}</p></section>
      <div className="max-w-4xl mx-auto px-4 py-14 space-y-5">
        {content.sections.map((section) => <section key={section.title} className="bg-white border border-slate-100 rounded-2xl p-6"><h2 className="text-lg font-extrabold text-[#0f1f3d] mb-2">{section.title}</h2><p className="text-slate-600 leading-7 text-sm">{section.body}</p></section>)}
        <div className="text-center pt-4"><Link to="/contact" className="text-[#4f8ef7] font-bold text-sm">Questions? Contact our team →</Link></div>
      </div>
    </div>
  );
}

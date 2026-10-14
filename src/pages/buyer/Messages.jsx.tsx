import { useState } from 'react';

const CONVERSATIONS = [
  { id: 1, name: 'Lens & Light Studio', last: 'We will be there at 8am for setup.', time: '2:30 PM', unread: 1, event: 'TechCorp Conference' },
  { id: 2, name: 'Grand Feast Co.', last: 'The menu has been finalized.', time: '11:00 AM', unread: 0, event: 'Sara & Ali Wedding' },
  { id: 3, name: 'Bloom & Décor', last: 'Could you share the venue floor plan?', time: 'Yesterday', unread: 2, event: 'Sara & Ali Wedding' },
];

const MESSAGES = [
  { id: 1, sender: 'provider', text: 'Hello! Thank you for reaching out. We would love to cover your corporate conference.', time: '10:00 AM' },
  { id: 2, sender: 'buyer', text: 'Great! We have 500 guests and need full-day coverage from 9am to 9pm.', time: '10:05 AM' },
  { id: 3, sender: 'provider', text: 'That works perfectly. We will send you a detailed quote within a few hours.', time: '10:08 AM' },
  { id: 4, sender: 'buyer', text: 'Can you also include a highlight video for social media?', time: '10:10 AM' },
  { id: 5, sender: 'provider', text: 'Absolutely! Our Standard package includes a 5-minute highlight reel. I have included that in the quote.', time: '10:15 AM' },
  { id: 6, sender: 'provider', text: 'We will be there at 8am for setup.', time: '2:30 PM' },
];

export default function Messages() {
  const [active, setActive] = useState(1);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState(MESSAGES);

  const send = () => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'buyer', text: msg.trim(), time: 'Just now' }]);
    setMsg('');
  };

  return (
    <div className="h-[calc(100vh-10rem)]">
      <h1 className="text-2xl font-extrabold text-[#0f1f3d] mb-4">Messages</h1>
      <div className="bg-white rounded-2xl border border-slate-100 flex h-[calc(100%-3.5rem)] overflow-hidden">
        {/* Conversation list */}
        <div className="w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-100">
            <input placeholder="Search conversations..." className="w-full px-3 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`w-full p-4 text-left border-b border-slate-50 hover:bg-slate-50 transition-colors ${active === c.id ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] flex items-center justify-center font-bold text-sm flex-shrink-0">{c.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0f1f3d] text-sm truncate">{c.name}</span>
                      <span className="text-xs text-slate-400 ml-1 shrink-0">{c.time}</span>
                    </div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{c.event}</div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{c.last}</div>
                  </div>
                  {c.unread > 0 && <span className="w-5 h-5 bg-[#4f8ef7] text-white text-xs rounded-full flex items-center justify-center font-bold ml-1 flex-shrink-0">{c.unread}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-[#0f1f3d]">{CONVERSATIONS.find((c) => c.id === active)?.name}</div>
              <div className="text-xs text-slate-500">TechCorp Conference · Photography</div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50">View Profile</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl text-sm ${m.sender === 'buyer' ? 'bg-[#4f8ef7] text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                  <p>{m.text}</p>
                  <p className={`text-xs mt-1 ${m.sender === 'buyer' ? 'text-blue-200' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 flex items-center gap-3">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">📎</button>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"
            />
            <button onClick={send} className="w-9 h-9 bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

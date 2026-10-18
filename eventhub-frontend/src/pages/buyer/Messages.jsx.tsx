import { useEffect, useState } from 'react';
import { messageApi } from '../../api/client';
import { useAuth } from '../../auth/AuthProvider';

type Conversation = { id: number; buyerId: number; sellerId: number; buyer: { id: number; name: string }; seller: { id: number; name: string }; messages: { body: string; createdAt: string }[] };
type ChatMessage = { id: number; sender: { id: number; name: string }; body: string; createdAt: string };

export default function Messages() {
  const { user } = useAuth();
  const [active, setActive] = useState<number | null>(null);
  const [msg, setMsg] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState('');
  const activeConversation = conversations.find((conversation) => conversation.id === active);
  const counterpart = activeConversation ? (user?.role === 'buyer' ? activeConversation.seller : activeConversation.buyer) : null;
  const loadConversations = () => messageApi.conversations().then((page) => { const items = page.items as Conversation[]; setConversations(items); setActive((current) => current ?? items[0]?.id ?? null); }).catch((err) => setError(err instanceof Error ? err.message : 'Could not load conversations.'));
  useEffect(() => { void loadConversations(); }, []);
  useEffect(() => { if (active === null) { setMessages([]); return; } messageApi.messages(active).then((page) => setMessages(page.items as ChatMessage[])).catch((err) => setError(err instanceof Error ? err.message : 'Could not load messages.')); }, [active]);
  const send = async () => {
    if (!msg.trim() || !counterpart) return;
    try { await messageApi.send(counterpart.id, msg.trim()); setMsg(''); setError(''); const page = await messageApi.messages(active!); setMessages(page.items as ChatMessage[]); void loadConversations(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not send message.'); }
  };
  const conversationName = (conversation: Conversation) => user?.role === 'buyer' ? conversation.seller.name : conversation.buyer.name;
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
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`w-full p-4 text-left border-b border-slate-50 hover:bg-slate-50 transition-colors ${active === c.id ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] flex items-center justify-center font-bold text-sm flex-shrink-0">{conversationName(c)[0] || '?'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0f1f3d] text-sm truncate">{conversationName(c)}</span>
                      <span className="text-xs text-slate-400 ml-1 shrink-0">{c.messages[0] ? new Date(c.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                    
                    <div className="text-xs text-slate-500 truncate mt-0.5">{c.messages[0]?.body || 'No messages yet'}</div>
                  </div>
                  
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
              <div className="font-extrabold text-[#0f1f3d]">{activeConversation ? conversationName(activeConversation) : 'Select a conversation'}</div>
              <div className="text-xs text-slate-500">TechCorp Conference · Photography</div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50">View Profile</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}{messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender.id === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl text-sm ${m.sender.id === user?.id ? 'bg-[#4f8ef7] text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                  <p>{m.body}</p>
                  <p className={`text-xs mt-1 ${m.sender.id === user?.id ? 'text-blue-200' : 'text-slate-400'}`}>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
              onKeyDown={(e) => e.key === 'Enter' && void send()}
              placeholder={counterpart ? "Type a message..." : "Choose a conversation"}
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]"
            />
            <button disabled={!counterpart || !msg.trim()} onClick={() => void send()} className="w-9 h-9 bg-[#4f8ef7] hover:bg-[#3a7ae8] text-white rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

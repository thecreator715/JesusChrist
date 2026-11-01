import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, CpuChipIcon, UserIcon, SparklesIcon, TrashIcon, BoltIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { createAtlantisChat } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
}

export const AtlantisAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init-msg',
      role: 'model', 
      text: "Greetings, Initiate. I am optimized for swift wisdom. How may I assist your ascension?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createAtlantisChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const userMsgId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      const modelMsgId = crypto.randomUUID();
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: response.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: 'err-' + Date.now(), role: 'model', text: "Signal interrupted. Please retry." }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: 'reset-' + Date.now(), role: 'model', text: "Resonance reset. Ready for swift guidance." }]);
    chatRef.current = createAtlantisChat();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] max-w-5xl mx-auto px-4 md:py-8 animate-fade-in">
      <div className="bg-white dark:bg-stone-900 flex-1 rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-gold-500/20 relative">
              <CpuChipIcon className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 bg-white dark:bg-stone-900 rounded-full p-1 border border-gold-500">
                <BoltIcon className="w-2 h-2 text-gold-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 uppercase tracking-widest">Atlantis AI</h2>
              <p className="text-[10px] text-gold-600 font-bold uppercase tracking-[0.2em]">Flash Resonance Mode</p>
            </div>
          </div>
          <button onClick={clearChat} className="p-2 text-stone-400 hover:text-red-500 transition-colors" title="Clear Resonance">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 scroll-smooth">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in group`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-500 ${m.role === 'user' ? 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500' : 'bg-gold-500 text-white shadow-lg shadow-gold-500/20'}`}>
                {m.role === 'user' ? <UserIcon className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5" />}
              </div>
              
              <div className="flex flex-col gap-2 max-w-[85%]">
                <div className={`relative p-6 rounded-[30px] font-serif leading-relaxed text-lg shadow-sm transition-all duration-300 ${
                  m.role === 'user' 
                  ? 'bg-stone-900 text-white rounded-tr-none border border-stone-800' 
                  : 'bg-white dark:bg-stone-950 text-stone-800 dark:text-stone-100 rounded-tl-none border-l-4 border-gold-500 border-y border-r border-stone-100 dark:border-stone-800'
                }`}>
                  <div className="whitespace-pre-wrap selection:bg-gold-500/20">
                    {m.text}
                  </div>

                  {/* Message Actions */}
                  {m.role === 'model' && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => copyToClipboard(m.text, m.id)} 
                        className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:text-gold-500 transition-colors"
                        title="Copy Wisdom"
                      >
                        {copiedId === m.id ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ClipboardDocumentIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                </div>
                {m.role === 'model' && (
                   <span className="text-[8px] text-stone-400 font-bold uppercase tracking-[0.3em] px-4">Received from Source</span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white shadow-lg">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div className="bg-white dark:bg-stone-950 p-6 rounded-[30px] rounded-tl-none border-l-4 border-gold-500 border-stone-100 dark:border-stone-800">
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 bg-stone-50 dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-amber-500/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for swift guidance..."
              className="relative w-full p-6 pr-20 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-lg font-serif outline-none focus:ring-4 focus:ring-gold-500/10 shadow-inner transition-all"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="absolute right-3 top-3 bottom-3 bg-gold-500 hover:bg-gold-600 text-white rounded-full px-8 flex items-center justify-center transition-all disabled:opacity-30 shadow-lg active:scale-95"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
             <div className="h-px w-8 bg-stone-200 dark:bg-stone-800"></div>
             <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold flex items-center gap-2">
                <BoltIcon className="w-3 h-3 text-gold-500" /> Swift Ascension Mode Active
             </p>
             <div className="h-px w-8 bg-stone-200 dark:bg-stone-800"></div>
          </div>
        </form>
      </div>
    </div>
  );
};
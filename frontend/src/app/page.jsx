'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Reset textarea height
    const textarea = document.getElementById('chat-input');
    if (textarea) textarea.style.height = '48px';
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'ai', content: 'This is a simulated response. I am a minimalistic AI interface.' }]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#131314] text-neutral-200 font-sans selection:bg-neutral-700">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-wide text-neutral-300">Gemini</span>
          <span className="text-[10px] uppercase tracking-wider bg-neutral-800/80 text-neutral-400 px-2 py-1 rounded-full font-semibold">Advanced</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-semibold shadow-md">
          U
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 w-full max-w-4xl mx-auto pb-36 pt-8 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] opacity-90">
            <h1 className="text-4xl sm:text-[3.5rem] font-medium tracking-tight mb-2 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Hello, there
            </h1>
            <p className="text-3xl sm:text-4xl text-[#444746] font-medium text-center mt-2 tracking-tight">
              How can I help you today?
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-[24px] px-5 py-3 ${msg.role === 'user' ? 'bg-[#2a2a2b] text-neutral-100 rounded-tr-sm' : 'bg-transparent text-neutral-200'}`}>
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-3 mb-2 text-indigo-400 font-medium">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                      </svg>
                      Gemini
                    </div>
                  )}
                  <div className="leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-[#131314] via-[#131314] to-transparent pt-10 pb-6 px-4 md:px-8">
        <div className="max-w-4xl mx-auto relative">
          <form 
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-[#1e1f20] border border-[#333537] rounded-[32px] pl-4 pr-2 py-2 focus-within:bg-[#252628] focus-within:border-[#44474a] transition-colors duration-300 shadow-lg"
          >
            <button 
              type="button" 
              className="p-3 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 rounded-full transition-colors shrink-0 mb-0.5"
              aria-label="Upload file"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
            </button>
            
            <textarea
              id="chat-input"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask Gemini"
              className="w-full bg-transparent text-neutral-100 placeholder-[#7e7f81] outline-none resize-none max-h-[200px] overflow-y-auto py-3.5 px-1 font-medium [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              rows={1}
              style={{ minHeight: '48px' }}
            />
            
            <div className="flex items-center gap-1 shrink-0 pb-1.5 pr-1">
              {input.trim() ? (
                <button 
                  type="submit" 
                  className="p-2.5 text-neutral-900 bg-neutral-200 hover:bg-white rounded-full transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              ) : (
                <button 
                  type="button" 
                  className="p-3 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 rounded-full transition-colors"
                  aria-label="Voice input"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </button>
              )}
            </div>
          </form>
          <div className="text-center mt-3">
            <span className="text-[11px] text-neutral-500 font-medium tracking-wide">
              Gemini can make mistakes. Check important info.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

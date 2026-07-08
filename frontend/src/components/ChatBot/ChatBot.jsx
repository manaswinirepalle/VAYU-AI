import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vayu-ai-b011.onrender.com';

function ChatBot({ chatResponse, setChatResponse }) {
  const [question, setQuestion] = useState('Is it safe for my asthmatic child to go to school today?');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/api/chatbot/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, city: 'Vizag' }),
    });
    const payload = await response.json();
    setChatResponse(payload);
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Ask VAYU</p>
          <p className="text-xl text-slate-50">Personalised health guidance</p>
        </div>
        <div className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-sm text-teal-200">RAG • CPCB/NCAP</div>
      </div>
      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            ask();
          }
        }}
        className="min-h-[96px] w-full rounded-[1rem] border border-white/10 bg-slate-950/30 p-4 text-slate-100"
      />
      <button onClick={ask} className="mt-4 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-4 py-2 text-sm text-slate-950">
        {loading ? 'Thinking...' : 'Ask VAYU'}
      </button>
      {chatResponse && (
        <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-slate-950/30 p-4">
          <p className="text-sm text-slate-400">Answer</p>
          <p className="mt-2 text-slate-100">{chatResponse.answer}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {chatResponse.citations.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{item}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;

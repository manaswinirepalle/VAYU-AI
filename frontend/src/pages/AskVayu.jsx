import ChatBot from '../components/ChatBot/ChatBot';

function AskVayu({ chatResponse, setChatResponse }) {
  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Ask VAYU</p>
        <h2 className="mt-2 text-3xl text-slate-50">A calm, doctor-toned answer to urgent questions about breathing.</h2>
      </section>
      <ChatBot chatResponse={chatResponse} setChatResponse={setChatResponse} />
    </div>
  );
}

export default AskVayu;

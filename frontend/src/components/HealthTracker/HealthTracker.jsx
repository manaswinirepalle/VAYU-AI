function HealthTracker({ healthData }) {
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Lung age impact</p>
          <p className="text-xl text-slate-50">Your lungs are ageing faster than normal</p>
        </div>
        <div className="rounded-full border border-crimson/30 bg-crimson/10 px-3 py-1 text-sm text-crimson">{healthData?.lung_age ?? 36} years</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/30 p-4">
          <p className="text-sm text-slate-400">Estimated lung age</p>
          <p className="mt-2 font-mono text-3xl text-slate-100">{healthData?.lung_age ?? 36}</p>
          <p className="mt-2 text-sm text-slate-400">{healthData?.message}</p>
        </div>
        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/30 p-4">
          <p className="text-sm text-slate-400">WHO comparison</p>
          <p className="mt-2 text-slate-100">{healthData?.who_comparison}</p>
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;

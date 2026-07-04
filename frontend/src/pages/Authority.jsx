function Authority() {
  const downloadReport = async () => {
    const response = await fetch('/api/reports/generate?city=Vizag');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vayu-report.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Authority portal</p>
        <h2 className="mt-2 text-3xl text-slate-50">One-click report generator for municipalities and regulators.</h2>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm text-slate-400">AQI trend summary</p>
          <p className="mt-3 text-2xl text-slate-50">Hotspots: Gajuwaka, Madhurawada, port corridor</p>
          <p className="mt-3 text-slate-400">The report surfaces where intervention will have the fastest public-health gain and highlights likely regulatory gaps.</p>
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <button onClick={downloadReport} className="rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-4 py-2 text-sm text-slate-950">Generate PDF report</button>
          <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
            <p>• Source attribution for action planning</p>
            <p>• CPCB-aligned intervention suggestions</p>
            <p>• Instant export for municipal review</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Authority;

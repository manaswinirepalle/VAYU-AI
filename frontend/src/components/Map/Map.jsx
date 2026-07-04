function Map({ neighbourhoods = [] }) {
  return (
    <div className="glass-panel relative h-[280px] overflow-hidden rounded-[2rem] p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,255,209,0.18),_transparent_30%),radial-gradient(circle_at_70%_60%,_rgba(255,59,92,0.18),_transparent_35%)]" />
      <div className="absolute left-[8%] top-[15%] h-40 w-40 rounded-full border border-white/10" />
      <div className="absolute right-[10%] top-[20%] h-28 w-28 rounded-full border border-white/10" />
      <div className="absolute bottom-[16%] left-[18%] h-20 w-20 rounded-full border border-white/10" />
      <div className="absolute inset-x-[15%] top-[30%] h-[2px] rotate-[10deg] bg-white/10" />
      <div className="absolute inset-x-[20%] top-[60%] h-[2px] rotate-[-16deg] bg-white/10" />
      {neighbourhoods.map((item, index) => (
        <div key={item.name} className="absolute" style={{ left: `${18 + index * 22}%`, top: `${30 + (index % 2) * 22}%` }}>
          <div className="rounded-full border border-teal-300/30 bg-teal-400/20 px-3 py-1 text-xs text-slate-100">{item.name}</div>
        </div>
      ))}
      <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-300">
        Hyperlocal intelligence • Gajuwaka & nearby zones
      </div>
    </div>
  );
}

export default Map;

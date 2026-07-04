import React from 'react';

function LiveAQIPanel({ liveAqiData, connected, selectedLocation }) {
  const isMatchingCity = liveAqiData?.city?.toLowerCase() === selectedLocation?.toLowerCase();
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Live push</p>
          <p className="mt-2 text-2xl text-slate-50">{connected ? 'Connected' : 'Disconnected'}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm ${connected ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
          {connected ? 'Streaming' : 'Offline'}
        </span>
      </div>
      <div className="mt-5 space-y-3 text-slate-300">
        {liveAqiData ? (
          <>
            <p className="text-sm">Latest live reading for {liveAqiData.city || selectedLocation}:</p>
            <p className="text-3xl font-semibold text-slate-100">AQI {liveAqiData.aqi}</p>
            <p className="text-sm text-slate-400">{liveAqiData.category}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-3 text-xs text-slate-300">Temp: {liveAqiData.temperature ?? 'N/A'}°C</div>
              <div className="rounded-2xl bg-white/5 p-3 text-xs text-slate-300">Humidity: {liveAqiData.humidity ?? 'N/A'}%</div>
              <div className="rounded-2xl bg-white/5 p-3 text-xs text-slate-300">Wind: {liveAqiData.wind ?? 'N/A'} km/h</div>
            </div>
            <p className="text-xs text-slate-500">{isMatchingCity ? 'Live update matches the selected location.' : 'Live feed provides the most recent available city update.'}</p>
          </>
        ) : (
          <p className="text-sm text-slate-400">Waiting for live AQI push data from the backend...</p>
        )}
      </div>
    </div>
  );
}

export default LiveAQIPanel;

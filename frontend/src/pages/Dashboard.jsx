import AQIOrb from '../components/AQIOrb/AQIOrb';
import BreathingCity from '../components/BreathingCity/BreathingCity';
import Map from '../components/Map/Map';
import LocationPicker from '../components/LocationPicker/LocationPicker';
import LiveAQIPanel from '../components/LiveAQIPanel';

function Dashboard({ aqiData, currentAqi, safeHours, selectedLocation, onLocationChange, selectedLanguage, onLanguageChange, recommendationsData, wsConnected, liveAqiMessage }) {
  const liveAqiData = liveAqiMessage?.data ?? null;
  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Dangerous beauty</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-50 sm:text-5xl">Live urban breathing intelligence for citizens who deserve a warning before it is too late.</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">VAYU.AI translates AQI into human risk, hyperlocal guidance, and multilingual action.</p>
          </div>
          <BreathingCity aqi={currentAqi} />
        </div>
      </section>

      <LocationPicker selectedLocation={selectedLocation} onLocationChange={onLocationChange} selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <AQIOrb aqi={currentAqi} />
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-sm text-slate-400">Safe hours planner</p>
            <p className="mt-2 text-3xl text-slate-50">{safeHours}</p>
            <p className="mt-3 text-sm text-slate-400">We map the safest breathing window for outdoor activity in your neighbourhood.</p>
          </div>
        </div>
        <div className="space-y-6">
          <Map neighbourhoods={aqiData?.neighbourhoods ?? []} />
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-sm text-slate-400">Now breathing</p>
            <p className="mt-2 text-2xl text-slate-50">{aqiData?.category ?? 'Unhealthy for sensitive groups'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(aqiData?.neighbourhoods ?? []).map((item) => (
                <span key={item.name} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{item.name}: {item.aqi}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">How it works</p>
          <div className="mt-4 space-y-3 text-slate-300">
            <p>1. VAYU.AI gathers live AQI, weather, and neighbourhood readings from trusted public data.</p>
            <p>2. The AI forecasts air conditions 24–72 hours ahead and explains likely causes such as traffic, industry, and dust.</p>
            <p>3. Citizens receive clear, multilingual guidance on when it is safe to step outside, exercise, or send children to school.</p>
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Advanced actions</p>
          <div className="mt-4 space-y-3 text-slate-300">
            <p>• Smart action plan: {recommendationsData?.priority ?? 'Medium'} priority</p>
            <p>• Family mode: keep sensitive people indoors on high-risk days</p>
            <p>• School & commute: avoid long outdoor routes during peak traffic</p>
            <p>• Health tip: {recommendationsData?.safety_tip ?? 'Use the health checker to plan your day carefully.'}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <LiveAQIPanel liveAqiData={liveAqiData} connected={wsConnected} selectedLocation={selectedLocation} />
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Live recommendations</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {(recommendationsData?.recommendations ?? []).map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

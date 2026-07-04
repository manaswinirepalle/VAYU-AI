import HealthTracker from '../components/HealthTracker/HealthTracker';
import LocationPicker from '../components/LocationPicker/LocationPicker';

function HealthImpact({ healthData, selectedLocation, onLocationChange, selectedLanguage, onLanguageChange }) {
  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Health checker</p>
        <h2 className="mt-2 text-3xl text-slate-50">You’ve breathed 14 days of unhealthy air this month.</h2>
        <p className="mt-3 text-slate-400">Check your location, choose your preferred language, and get a friendly, medically toned health view for your surroundings.</p>
      </section>
      <LocationPicker selectedLocation={selectedLocation} onLocationChange={onLocationChange} selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
      <HealthTracker healthData={healthData} />
      <section className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm text-slate-400">Historical exposure trail</p>
        <div className="mt-4 flex h-48 items-end gap-2">
          {[72, 95, 121, 144, 162, 178, 191].map((value, index) => (
            <div key={value} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-[1rem] bg-gradient-to-t from-crimson to-teal-400" style={{ height: `${value / 2}px` }} />
              <span className="text-xs text-slate-400">D{index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HealthImpact;

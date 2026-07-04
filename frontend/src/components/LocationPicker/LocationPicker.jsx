import { useMemo, useState } from 'react';
import { locationCatalog, supportedLanguages } from '../../data/locationCatalog';

function LocationPicker({ selectedLocation, onLocationChange, selectedLanguage, onLanguageChange }) {
  const [query, setQuery] = useState('');

  const filteredLocations = useMemo(() => {
    const lower = query.trim().toLowerCase();
    if (!lower) return locationCatalog;
    return locationCatalog.filter((item) => `${item.type} ${item.name} ${item.country ?? ''} ${item.state ?? ''} ${item.city ?? ''}`.toLowerCase().includes(lower));
  }, [query]);

  return (
    <div className="glass-panel rounded-[2rem] p-5">
      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm text-slate-400">Location availability</p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city, state, village or country"
            className="mt-2 w-full rounded-full border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {filteredLocations.slice(0, 8).map((item) => (
              <button
                key={`${item.type}-${item.name}`}
                onClick={() => onLocationChange(item.name)}
                className={`rounded-full px-3 py-2 text-sm ${selectedLocation === item.name ? 'bg-teal-400/20 text-teal-200' : 'bg-white/5 text-slate-300'}`}
              >
                {item.name} • {item.type}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-400">Supported languages</p>
          <select
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="mt-2 w-full rounded-full border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100"
          >
            {supportedLanguages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.native} ({language.name})
              </option>
            ))}
          </select>
          <div className="mt-3 flex flex-wrap gap-2">
            {supportedLanguages.map((language) => (
              <span key={language.code} className={`rounded-full px-3 py-2 text-sm ${selectedLanguage === language.code ? 'bg-sky-400/20 text-sky-200' : 'bg-white/5 text-slate-400'}`}>
                {language.native}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationPicker;

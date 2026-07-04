import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import AskVayu from './pages/AskVayu';
import HealthImpact from './pages/HealthImpact';
import Authority from './pages/Authority';
import { supportedLanguages } from './data/locationCatalog';
import { useSocket } from './hooks/useSocket';

const tabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'predict', label: 'Predict' },
  { key: 'askvayu', label: 'Ask VAYU' },
  { key: 'health', label: 'Health Checker' },
  { key: 'authority', label: 'Authority' },
];

function App() {
  const { t, i18n } = useTranslation();
  const [view, setView] = useState('dashboard');
  const [aqiData, setAqiData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [chatResponse, setChatResponse] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [recommendationsData, setRecommendationsData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('Visakhapatnam');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { connected: wsConnected, message: wsMessage } = useSocket();

  const normalizeLocation = (value) => value?.trim() || 'Vizag';

  useEffect(() => {
    const load = async () => {
      try {
        const apiLocation = normalizeLocation(selectedLocation);
        const [aqiRes, forecastRes, healthRes, recommendationsRes] = await Promise.all([
          fetch(`/api/aqi/live?city=${apiLocation}`),
          fetch(`/api/forecast/predict?city=${apiLocation}&hours=24`),
          fetch(`/api/health/lung-age?age=29&location=${encodeURIComponent(selectedLocation)}&hours_outdoors=2.0`),
          fetch(`/api/aqi/recommendations?city=${apiLocation}`),
        ]);
        const [aqi, forecast, health, recommendations] = await Promise.all([
          aqiRes.json(),
          forecastRes.json(),
          healthRes.json(),
          recommendationsRes.json(),
        ]);
        setAqiData(aqi);
        setForecastData(forecast);
        setHealthData(health);
        setRecommendationsData(recommendations);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [selectedLocation]);

  const currentAqi = aqiData?.aqi ?? 168;
  const safeHours = useMemo(() => {
    if (currentAqi < 100) return '6–8 AM';
    if (currentAqi < 200) return '7–9 AM';
    return 'Stay indoors';
  }, [currentAqi]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,255,209,0.16),_transparent_34%),linear-gradient(135deg,#050B1F_0%,#07132A_100%)] text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="font-display text-3xl text-slate-50">VAYU.AI</p>
          <p className="text-sm text-slate-400">{t('hero.tagline')}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
          >
            <option>Visakhapatnam</option>
            <option>Gajuwaka</option>
            <option>Hyderabad</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>London</option>
            <option>New York</option>
            <option>Dubai</option>
            <option>Sydney</option>
            <option>India</option>
            <option>United Kingdom</option>
          </select>
          <select
            className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-2 text-sm text-teal-200"
            value={selectedLanguage}
            onChange={(event) => {
              const next = event.target.value;
              setSelectedLanguage(next);
              i18n.changeLanguage(next);
            }}
          >
            {supportedLanguages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.native}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6 pb-6 lg:px-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            className={`rounded-full border px-4 py-2 text-sm transition ${view === tab.key ? 'border-teal-400 bg-teal-400/20 text-teal-200' : 'border-white/10 bg-white/5 text-slate-300'}`}
          >
            {t(`nav.${tab.key}`)}
          </button>
        ))}
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <Dashboard
                aqiData={aqiData}
                currentAqi={currentAqi}
                safeHours={safeHours}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                recommendationsData={recommendationsData}
                wsConnected={wsConnected}
                liveAqiMessage={wsMessage}
              />
            </motion.div>
          )}
          {view === 'predict' && (
            <motion.div key="predict" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <Predict forecastData={forecastData} aqiData={aqiData} />
            </motion.div>
          )}
          {view === 'askvayu' && (
            <motion.div key="askvayu" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <AskVayu chatResponse={chatResponse} setChatResponse={setChatResponse} />
            </motion.div>
          )}
          {view === 'health' && (
            <motion.div key="health" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <HealthImpact healthData={healthData} selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
            </motion.div>
          )}
          {view === 'authority' && (
            <motion.div key="authority" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <Authority />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

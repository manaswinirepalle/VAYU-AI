import ForecastChart from '../components/ForecastChart/ForecastChart';

function Predict({ forecastData, aqiData }) {
  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Predictive intelligence</p>
        <h2 className="mt-2 text-3xl text-slate-50">Tomorrow morning AQI in Gajuwaka is expected at 187 • Unhealthy</h2>
        <p className="mt-3 text-slate-400">A hybrid forecaster surfaces the likely trend and the reasons behind it in plain language.</p>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ForecastChart forecastData={forecastData} />
        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm text-slate-400">Source fingerprint</p>
          <div className="mt-4 space-y-4">
            {[
              { name: 'Vehicles', value: 58, color: '#00FFD1' },
              { name: 'Industry', value: 31, color: '#FFB347' },
              { name: 'Dust', value: 11, color: '#FF3B5C' },
            ].map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-400">Confidence interval is shown as a soft band on the chart so citizens can understand uncertainty without fear.</p>
        </div>
      </div>
    </div>
  );
}

export default Predict;

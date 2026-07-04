import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function ForecastChart({ forecastData }) {
  const data = forecastData?.forecast ?? [];
  return (
    <div className="glass-panel rounded-[2rem] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Forecast band</p>
          <p className="text-xl text-slate-50">24-hour AQI trajectory</p>
        </div>
        <div className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-sm text-teal-200">Confidence +84%</div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFD1" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#00FFD1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="hour" stroke="#7B9BB5" />
            <YAxis stroke="#7B9BB5" />
            <Tooltip />
            <Area type="monotone" dataKey="aqi" stroke="#00FFD1" fill="url(#aqiGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastChart;

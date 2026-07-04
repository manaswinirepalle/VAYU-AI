import { motion } from 'framer-motion';

function AQIOrb({ aqi = 168 }) {
  const color = aqi > 220 ? '#FF3B5C' : aqi > 150 ? '#FFB347' : '#00FFD1';
  return (
    <motion.div
      className="glass-panel relative flex h-56 flex-col justify-between overflow-hidden rounded-[2rem] p-6"
      animate={{ scale: [1, 1.03, 1], boxShadow: [`0 0 0 0 rgba(0,255,209,0.18)`, `0 0 80px 10px rgba(0,255,209,0.24)`, `0 0 0 0 rgba(0,255,209,0.18)`] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ y: -6, rotate: -1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_55%)]" />
      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live AQI</p>
      <div className="relative flex items-center justify-center">
        <div className="absolute h-36 w-36 rounded-full blur-3xl" style={{ backgroundColor: `${color}33` }} />
        <motion.div
          className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/20 text-4xl font-semibold"
          style={{ background: `radial-gradient(circle, ${color}88 0%, ${color}22 72%, transparent 100%)` }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {aqi}
        </motion.div>
      </div>
      <div>
        <p className="font-mono text-sm text-slate-300">AQI • breathing pulse</p>
        <p className="text-slate-400">Current city state is {aqi > 150 ? 'breathing dangerously' : 'stable'}</p>
      </div>
    </motion.div>
  );
}

export default AQIOrb;

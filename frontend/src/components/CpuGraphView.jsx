import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CpuGraphView({ systemInfo, history }) {
  // Prepare chart data
  const chartData = history.timestamps.map((time, idx) => ({
    time,
    CPU: history.cpu[idx],
  }));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-800">
        <div className="flex items-baseline gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{systemInfo?.cpu ?? 0}%</h2>
            <p className="text-slate-400 text-sm mt-1">CPU-användning</p>
          </div>
          <div className="text-slate-500 text-sm">Cores: {systemInfo?.cpuCores ?? 0}</div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 p-6 md:p-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" domain={[0, 100]} style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #475569',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line 
              type="monotone" 
              dataKey="CPU" 
              stroke="#06b6d4" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 md:p-8 border-t border-slate-800 bg-slate-900/30">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Genomsnittlig Last</p>
          <p className="text-xl font-semibold text-cyan-300 mt-2">{systemInfo?.avgLoad ?? 0}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Kärnor</p>
          <p className="text-xl font-semibold text-cyan-300 mt-2">{systemInfo?.cpuCores ?? 0}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Uptime</p>
          <p className="text-xl font-semibold text-cyan-300 mt-2">{formatUptime(systemInfo?.uptime ?? 0)}</p>
        </div>
      </div>
    </div>
  );
}

function formatUptime(seconds) {
  if (!seconds) return '0h 0m';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

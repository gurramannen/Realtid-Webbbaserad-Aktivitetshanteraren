import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RamGraphView({ systemInfo, history }) {
  // Prepare chart data
  const chartData = history.timestamps.map((time, idx) => ({
    time,
    RAM: history.ram[idx],
  }));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-200 card">
        <div className="flex items-baseline gap-4 justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{systemInfo?.ramPercent ?? 0}%</h2>
            <p className="text-slate-500 text-sm mt-1">Minne använt</p>
          </div>
          <div className="text-slate-600 text-sm flex gap-4">
            <span>Använt: {formatBytes(systemInfo?.usedMemory ?? 0)}</span>
            <span>Totalt: {formatBytes(systemInfo?.totalMemory ?? 0)}</span>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 p-6 md:p-8 card">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ee" />
            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" domain={[0, 100]} style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e6e9ee',
                borderRadius: '8px',
                color: '#0f172a'
              }}
              labelStyle={{ color: '#0f172a' }}
            />
            <Line 
              type="monotone" 
              dataKey="RAM" 
              stroke="#7c3aed" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 md:p-8 border-t border-gray-100">
        <div className="card p-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest">Använt</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">{formatBytes(systemInfo?.usedMemory ?? 0)}</p>
        </div>
        <div className="card p-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest">Fritt</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">{formatBytes(systemInfo?.freeMemory ?? 0)}</p>
        </div>
        <div className="card p-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest">Totalt</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">{formatBytes(systemInfo?.totalMemory ?? 0)}</p>
        </div>
      </div>
    </div>
  );
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(1)} ${units[index]}`;
}

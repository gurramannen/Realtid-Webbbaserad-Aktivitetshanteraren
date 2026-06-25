import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function NetworkGraphView({ systemInfo, history }) {
  // Prepare chart data
  const chartData = history.timestamps.map((time, idx) => ({
    time,
    'Rx': history.networkRx[idx],
    'Tx': history.networkTx[idx],
  }));

  const activeInterfaces = systemInfo?.network ?? [];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-slate-800">
        <div className="flex items-baseline gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{activeInterfaces.length} gränssnitt</h2>
            <p className="text-slate-400 text-sm mt-1">Aktiva nätverkskort</p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 p-6 md:p-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #475569',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(value) => formatBytes(value) + '/s'}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Rx" 
              stroke="#06b6d4" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="Tx" 
              stroke="#3b82f6" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active Interfaces */}
      <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-900/30 max-h-48 overflow-y-auto">
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-4">Aktiva gränssnitt</p>
        <div className="space-y-3">
          {activeInterfaces.length === 0 ? (
            <p className="text-slate-500 text-sm">Inga nätverksgränssnitt hittades</p>
          ) : (
            activeInterfaces.map((iface) => (
              <div key={iface.iface} className="rounded-lg bg-slate-950/70 p-3 text-sm">
                <div className="font-semibold text-white uppercase tracking-wider text-xs">{iface.iface}</div>
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>↓ {formatBytes(iface.rx_sec)}/s</span>
                  <span>↑ {formatBytes(iface.tx_sec)}/s</span>
                  <span>Totalt ↓ {formatBytes(iface.rx)}</span>
                  <span>Totalt ↑ {formatBytes(iface.tx)}</span>
                </div>
              </div>
            ))
          )}
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

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
      <div className="p-6 md:p-8 border-b border-gray-200 card">
        <div className="flex items-baseline gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{activeInterfaces.length} gränssnitt</h2>
            <p className="text-slate-500 text-sm mt-1">Aktiva nätverkskort</p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="flex-1 p-6 md:p-8 card">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ee" />
            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e6e9ee',
                borderRadius: '8px',
                color: '#0f172a'
              }}
              labelStyle={{ color: '#0f172a' }}
              formatter={(value) => formatBytes(value) + '/s'}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Rx" 
              stroke="#0b84ff" 
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
      <div className="p-6 md:p-8 border-t border-gray-100 bg-white max-h-48 overflow-y-auto">
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Aktiva gränssnitt</p>
        <div className="space-y-3">
          {activeInterfaces.length === 0 ? (
            <p className="text-slate-500 text-sm">Inga nätverksgränssnitt hittades</p>
          ) : (
            activeInterfaces.map((iface) => (
              <div key={iface.iface} className="rounded-lg bg-white p-3 text-sm border border-gray-100">
                <div className="font-semibold text-slate-900 uppercase tracking-wider text-xs">{iface.iface}</div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
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

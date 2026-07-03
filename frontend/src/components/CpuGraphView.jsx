import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CpuGraphView({ systemInfo, history }) {
  // Prepare chart data
  const chartData = history.timestamps.map((time, idx) => ({
    time,
    CPU: history.cpu[idx],
  }));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header (compact) */}
      <div className="p-4 border-b border-gray-200 card">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold text-slate-900">{systemInfo?.cpu ?? 0}%</h2>
            <span className="text-[11px] px-2 py-1 rounded-full bg-green-100 text-green-700">Live</span>
          </div>
          <div className="text-slate-600 text-xs">
            <div className="text-right">{systemInfo?.cpuCores ?? 0} kärnor</div>
          </div>
        </div>
      </div>

      {/* Graph (smaller) */}
      <div className="flex-1 p-4 card">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#94a3b8" hide={true} />
            <YAxis stroke="#94a3b8" domain={[0, 100]} hide={true} />
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
              dataKey="CPU" 
              stroke="#0b84ff" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CPU Statistics */}
      <div className="p-4 border-t border-gray-200 card bg-slate-50">
        <div className="grid grid-cols-2 gap-4">
          {systemInfo?.cpuModel && (
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Modell</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">{systemInfo.cpuModel}</div>
            </div>
          )}
          {systemInfo?.cpuSpeed && (
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Hastighet</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">{systemInfo.cpuSpeed} GHz</div>
            </div>
          )}
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Kärnor</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">{systemInfo?.cpuCores ?? 0}</div>
          </div>
          {systemInfo?.cpuThreads && (
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Trådar</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">{systemInfo.cpuThreads}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

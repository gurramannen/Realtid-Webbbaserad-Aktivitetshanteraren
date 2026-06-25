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

export default function RamGauge({ value, freeMemory, usedMemory }) {
  return (
    <div className="rounded-[2rem] bg-slate-900/95 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.35)] ring-1 ring-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">RAM</h2>
          <p className="mt-2 text-sm text-slate-400">Minne i användning</p>
        </div>
        <span className="rounded-3xl bg-emerald-500/10 px-4 py-2 text-lg font-semibold text-emerald-300">{value}%</span>
      </div>
      <div className="mt-7 space-y-4">
        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div className="h-4 rounded-full bg-emerald-400" style={{ width: `${value}%` }} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/90 p-4">
            <div className="text-sm text-slate-400">Använt</div>
            <div className="mt-2 text-2xl font-semibold text-white">{formatBytes(usedMemory)}</div>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-4">
            <div className="text-sm text-slate-400">Fritt</div>
            <div className="mt-2 text-2xl font-semibold text-white">{formatBytes(freeMemory)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

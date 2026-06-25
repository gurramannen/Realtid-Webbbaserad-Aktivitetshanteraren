export default function CpuChart({ value, avgLoad, cores }) {
  return (
    <div className="rounded-[2rem] bg-slate-900/95 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.35)] ring-1 ring-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">CPU</h2>
          <p className="mt-2 text-sm text-slate-400">Processorbelastning</p>
        </div>
        <span className="rounded-3xl bg-cyan-500/10 px-4 py-2 text-lg font-semibold text-cyan-300">{value}%</span>
      </div>
      <div className="mt-7 space-y-4">
        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div className="h-4 rounded-full bg-cyan-400" style={{ width: `${value}%` }} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/90 p-4">
            <div className="text-sm text-slate-400">Genomsnittlig last</div>
            <div className="mt-2 text-2xl font-semibold text-white">{avgLoad}</div>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-4">
            <div className="text-sm text-slate-400">Kärnor</div>
            <div className="mt-2 text-2xl font-semibold text-white">{cores}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export default function TempWidget({ platform, uptime }) {
  return (
    <div className="rounded-[2rem] bg-slate-900/95 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.35)] ring-1 ring-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Systeminfo</h2>
          <p className="mt-2 text-sm text-slate-400">Plattform och uptime</p>
        </div>
        <span className="rounded-3xl bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">Realtime</span>
      </div>

      <div className="mt-10">
        <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
          <div className="rounded-[1.75rem] bg-slate-950/90 p-5">
            <div className="text-slate-400">Operativsystem</div>
            <div className="mt-3 text-lg font-semibold text-white">{platform || 'Okänt'}</div>
          </div>
          <div className="rounded-[1.75rem] bg-slate-950/90 p-5">
            <div className="text-slate-400">Uptime</div>
            <div className="mt-3 text-lg font-semibold text-white">{uptime ? formatUptime(uptime) : 'Okänt'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

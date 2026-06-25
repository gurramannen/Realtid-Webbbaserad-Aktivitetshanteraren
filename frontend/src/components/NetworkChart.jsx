function formatBytes(bytes) {
  if (bytes == null) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(1)} ${units[index]}`;
}

export default function NetworkChart({ data }) {
  return (
    <div className="rounded-[2rem] bg-slate-900/95 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.35)] ring-1 ring-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Nätverk</h2>
          <p className="text-slate-400">Aktiva gränssnitt</p>
        </div>
        <span className="text-slate-400 text-sm">Uppdateras live</span>
      </div>
      <div className="mt-6 space-y-4">
        {data.length === 0 ? (
          <div className="rounded-3xl bg-slate-950/80 p-6 text-center text-slate-500">Inga nätverksdata hittades</div>
        ) : (
          data.map((item) => (
            <div key={item.iface} className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.iface}</div>
                  <div className="mt-2 text-lg font-semibold text-white">Rx: {formatBytes(item.rx)} · Tx: {formatBytes(item.tx)}</div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-900/90 p-3 text-sm text-slate-300">
                    <div className="text-slate-400">Rx/sek</div>
                    <div className="mt-1 text-white">{formatBytes(item.rx_sec)}/s</div>
                  </div>
                  <div className="rounded-2xl bg-slate-900/90 p-3 text-sm text-slate-300">
                    <div className="text-slate-400">Tx/sek</div>
                    <div className="mt-1 text-white">{formatBytes(item.tx_sec)}/s</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

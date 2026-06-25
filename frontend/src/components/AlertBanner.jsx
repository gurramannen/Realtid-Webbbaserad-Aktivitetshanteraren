export default function AlertBanner({ alerts }) {
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-100 shadow-lg shadow-rose-950/10">
      <h2 className="text-lg font-semibold">Varningar</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-100/90">
        {alerts.map((alert) => (
          <li key={alert}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

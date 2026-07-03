import { useState } from 'react';

export default function AlertBanner({ alerts }) {
  const [visible, setVisible] = useState(true);
  if (!alerts.length || !visible) return null;

  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 shadow-sm relative mb-4">
      <button
        aria-label="Stäng varningar"
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 text-yellow-800/80 hover:text-yellow-900"
      >
        ✕
      </button>
      <h2 className="text-sm font-semibold">Varningar</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-800/90">
        {alerts.map((alert) => (
          <li key={alert}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

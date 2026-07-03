const colorStyles = {
  cpu: { bg: '#164e63', border: '#06b6d4', text: '#06b6d4' },    // cyan
  ram: { bg: '#581c87', border: '#a855f7', text: '#a855f7' },    // purple
  network: { bg: '#1e3a8a', border: '#3b82f6', text: '#3b82f6' }, // blue
};

export default function ResourceSidebar({ activeResource, onSelectResource, systemInfo }) {
  const resources = [
    { id: 'cpu', label: 'CPU' },
    { id: 'ram', label: 'Minne' },
    { id: 'network', label: 'Nätverk' },
  ];

  return (
    <div className="resource-sidebar w-36 md:w-44 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 px-2 py-6 md:py-8 rounded-2xl animate-fade-up flex-shrink-0 h-full flex flex-col items-center">
      <h2 className="hidden md:block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-4">Resurser</h2>

      <div className="flex flex-col gap-5 items-center w-full mt-6">
        {resources.map((resource) => {
          const isActive = activeResource === resource.id;
          const colors = colorStyles[resource.id];

          return (
            <button
              key={resource.id}
              onClick={() => onSelectResource(resource.id)}
              title={resource.label}
              style={isActive ? {
                backgroundColor: `${colors.bg}10`,
                borderColor: `${colors.border}30`,
                color: colors.text,
              } : undefined}
              className={`w-5/6 flex flex-col items-center justify-center text-center px-3 py-6 rounded-xl transition-all duration-150 border ${
                isActive ? 'bg-white border-gray-100 shadow-lg' : 'bg-transparent border-transparent text-slate-600 hover:bg-white hover:border-gray-100'
              }`}
            >
              <div className={`text-[12px] font-semibold ${isActive ? 'block text-slate-900' : 'hidden'}`}>{resource.label}</div>
              {isActive && (resource.id === 'cpu' || resource.id === 'ram') && (
                <div className="text-[11px] text-slate-500 mt-1">{resource.id === 'cpu' ? `${systemInfo?.cpu ?? 0}%` : `${systemInfo?.ramPercent ?? 0}%`}</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

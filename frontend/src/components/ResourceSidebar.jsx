const colorStyles = {
  cpu: { bg: '#164e63', border: '#06b6d4', text: '#06b6d4' },    // cyan
  ram: { bg: '#581c87', border: '#a855f7', text: '#a855f7' },    // purple
  network: { bg: '#1e3a8a', border: '#3b82f6', text: '#3b82f6' }, // blue
};

export default function ResourceSidebar({ activeResource, onSelectResource, systemInfo }) {
  const resources = [
    { id: 'cpu', label: 'Processor', icon: '⚙️' },
    { id: 'ram', label: 'Minne', icon: '🧠' },
    { id: 'network', label: 'Nätverk', icon: '🌐' },
  ];

  return (
    <div className="w-full md:w-64 bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-800 px-4 py-6 md:py-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6 md:mb-8">Resurser</h2>
      
      <div className="flex md:flex-col gap-3">
        {resources.map((resource) => {
          const isActive = activeResource === resource.id;
          const colors = colorStyles[resource.id];
          
          return (
            <button
              key={resource.id}
              onClick={() => onSelectResource(resource.id)}
              style={isActive ? {
                backgroundColor: `${colors.bg}20`,
                borderColor: `${colors.border}80`,
                color: colors.text,
              } : undefined}
              className={`flex-1 md:flex-none w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border ${
                isActive ? '' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-xl">{resource.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{resource.label}</div>
                  <div className="text-xs opacity-75 mt-0.5">
                    {resource.id === 'cpu' && `${systemInfo?.cpu ?? 0}%`}
                    {resource.id === 'ram' && `${systemInfo?.ramPercent ?? 0}%`}
                    {resource.id === 'network' && `${systemInfo?.network?.length ?? 0} gränssnitt`}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

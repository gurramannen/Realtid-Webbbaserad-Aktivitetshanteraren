import CpuChart from './CpuChart.jsx';
import RamGauge from './RamGauge.jsx';
import NetworkChart from './NetworkChart.jsx';
import TempWidget from './TempWidget.jsx';

export default function Dashboard({ systemInfo }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.95fr]">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CpuChart value={systemInfo?.cpu ?? 0} avgLoad={systemInfo?.avgLoad ?? 0} cores={systemInfo?.cpuCores ?? 0} />
          <RamGauge value={systemInfo?.ramPercent ?? 0} freeMemory={systemInfo?.freeMemory ?? 0} usedMemory={systemInfo?.usedMemory ?? 0} />
        </div>

        <NetworkChart data={systemInfo?.network ?? []} />
      </div>

      <TempWidget platform={systemInfo?.platform} uptime={systemInfo?.uptime} />
    </div>
  );
}

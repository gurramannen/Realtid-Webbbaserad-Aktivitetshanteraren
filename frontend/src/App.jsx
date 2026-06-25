import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import ResourceSidebar from './components/ResourceSidebar.jsx';
import CpuGraphView from './components/CpuGraphView.jsx';
import RamGraphView from './components/RamGraphView.jsx';
import NetworkGraphView from './components/NetworkGraphView.jsx';
import AlertBanner from './components/AlertBanner.jsx';

const socket = io('http://localhost:3001');

function App() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [history, setHistory] = useState({ timestamps: [], cpu: [], ram: [], networkRx: [], networkTx: [] });
  const [connected, setConnected] = useState(false);
  const [activeResource, setActiveResource] = useState('cpu');

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('systemInfo', (info) => setSystemInfo(info));
    socket.on('history', (hist) => setHistory(hist));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('systemInfo');
      socket.off('history');
    };
  }, []);

  const alerts = useMemo(() => {
    if (!systemInfo) return [];
    const list = [];
    if (systemInfo.cpu > 85) list.push('CPU-användning är hög.');
    if (systemInfo.ramPercent > 85) list.push('RAM-användning är hög.');
    return list;
  }, [systemInfo]);

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/60 px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">Systemövervakning</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Aktivitetshanterare</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 px-4 py-3">
                <div className="text-xs uppercase tracking-widest text-slate-400">Status</div>
                <div className="mt-1 text-lg font-semibold flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {connected ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 px-4 py-3">
                <div className="text-xs uppercase tracking-widest text-slate-400">Uppdaterad</div>
                <div className="mt-1 text-lg font-semibold">{systemInfo ? new Date(systemInfo.timestamp).toLocaleTimeString('sv-SE') : '–'}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {alerts.length > 0 && <AlertBanner alerts={alerts} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <ResourceSidebar 
          activeResource={activeResource} 
          onSelectResource={setActiveResource}
          systemInfo={systemInfo}
        />

        {/* Main View */}
        <div className="flex-1 flex flex-col bg-slate-900/30">
          {activeResource === 'cpu' && <CpuGraphView systemInfo={systemInfo} history={history} />}
          {activeResource === 'ram' && <RamGraphView systemInfo={systemInfo} history={history} />}
          {activeResource === 'network' && <NetworkGraphView systemInfo={systemInfo} history={history} />}
        </div>
      </div>
    </div>
  );
}

export default App;

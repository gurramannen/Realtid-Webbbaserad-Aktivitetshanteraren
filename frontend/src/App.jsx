import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import ResourceSidebar from './components/ResourceSidebar.jsx';
import CpuGraphView from './components/CpuGraphView.jsx';
import RamGraphView from './components/RamGraphView.jsx';
import NetworkGraphView from './components/NetworkGraphView.jsx';
import AlertBanner from './components/AlertBanner.jsx';

const socket = io('http://localhost:3000');

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto card px-4 py-3 rounded-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v20M2 12h20" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-slate-900">Aktivitetshanterare</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg bg-white border border-gray-100 text-sm shadow-sm">
                <div className="text-xs uppercase tracking-widest text-slate-500">Status</div>
                <div className="mt-1 text-sm font-semibold flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {connected ? 'Online' : 'Offline'}
                </div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white border border-gray-100 text-sm shadow-sm">
                <div className="text-xs uppercase tracking-widest text-slate-500">Uppdaterad</div>
                <div className="mt-1 text-sm font-semibold">{systemInfo ? new Date(systemInfo.timestamp).toLocaleTimeString('sv-SE') : '–'}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {alerts.length > 0 && <AlertBanner alerts={alerts} />}

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-row max-w-7xl w-full mx-auto px-4 md:px-0 gap-6 py-6">
        {/* Left sidebar (buttons) */}
        <ResourceSidebar 
          activeResource={activeResource} 
          onSelectResource={setActiveResource}
          systemInfo={systemInfo}
        />

        {/* Right: main graph area fills remaining space */}
        <div className="flex-1 flex items-start bg-transparent animate-fade-up">
          <div className="h-full flex-1 flex items-start justify-center px-4 md:px-6 py-6">
            <div className="w-full">
              {activeResource === 'cpu' && <CpuGraphView systemInfo={systemInfo} history={history} />}
              {activeResource === 'ram' && <RamGraphView systemInfo={systemInfo} history={history} />}
              {activeResource === 'network' && <NetworkGraphView systemInfo={systemInfo} history={history} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

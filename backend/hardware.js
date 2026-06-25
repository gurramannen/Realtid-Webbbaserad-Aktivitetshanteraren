const si = require('systeminformation');
const os = require('os');

function formatNetworkStats(networkStats) {
  if (!Array.isArray(networkStats)) return [];
  return networkStats
    .filter((iface) => iface && iface.iface && !iface.iface.toLowerCase().includes('lo'))
    .filter((iface) => !iface.operstate || iface.operstate === 'up')
    .map((iface) => ({
      iface: iface.iface,
      rx: iface.rx_bytes || 0,
      tx: iface.tx_bytes || 0,
      rx_sec: iface.rx_sec || 0,
      tx_sec: iface.tx_sec || 0,
    }))
    .slice(0, 5);
}

async function getSystemInfo() {
  try {
    let load = { currentLoad: 0, avgLoad: 0, cpus: [] };
    let mem = { used: 0, total: 1, free: 0 };
    let cpuTemp = { main: null, max: null };
    let network = [];
    let osInfo = { platform: os.platform(), arch: os.arch() };
    let time = { uptime: os.uptime() };

    try {
      load = await si.currentLoad();
    } catch (err) {
      console.error('currentLoad error:', err.message);
    }

    try {
      mem = await si.mem();
    } catch (err) {
      console.error('mem error:', err.message);
    }

    try {
      cpuTemp = await si.cpuTemperature();
    } catch (err) {
      console.error('cpuTemperature error:', err.message);
    }

    try {
      network = await si.networkStats();
    } catch (err) {
      console.error('networkStats error:', err.message);
    }

    try {
      osInfo = await si.osInfo();
    } catch (err) {
      console.error('osInfo error:', err.message);
    }

    try {
      time = await si.time();
    } catch (err) {
      console.error('time error:', err.message);
    }

    return {
      cpu: Math.round(load.currentLoad || 0),
      cpuCores: (load.cpus && load.cpus.length) || os.cpus().length,
      avgLoad: Number((load.avgLoad || 0).toFixed(2)),
      ramPercent: mem.total > 0 ? Math.round((mem.used / mem.total) * 100) : 0,
      totalMemory: mem.total || 0,
      freeMemory: mem.free || 0,
      usedMemory: mem.used || 0,
      temperature: cpuTemp && (cpuTemp.main || cpuTemp.max) ? Math.round(cpuTemp.main || cpuTemp.max) : null,
      network: formatNetworkStats(network),
      platform: osInfo.distro ? `${osInfo.distro} ${osInfo.arch || ''}`.trim() : `${os.platform()} ${os.arch()}`,
      uptime: time.uptime || os.uptime(),
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error getting system info:', error.message);
    return {
      cpu: 0,
      cpuCores: os.cpus().length,
      avgLoad: 0,
      ramPercent: 0,
      totalMemory: 0,
      freeMemory: 0,
      usedMemory: 0,
      temperature: null,
      network: [],
      platform: `${os.platform()} ${os.arch()}`,
      uptime: os.uptime(),
      timestamp: Date.now(),
    };
  }
}

module.exports = { getSystemInfo };
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { getSystemInfo } = require('./hardware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
    methods: ['GET', 'POST'],
  },
});

// Store historical data for charts (last 60 data points)
const dataHistory = {
  timestamps: [],
  cpu: [],
  ram: [],
  networkRx: [],
  networkTx: [],
};
const MAX_HISTORY = 60;

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send initial history when client connects
  socket.emit('history', dataHistory);

  const interval = setInterval(async () => {
    const systemInfo = await getSystemInfo();
    
    // Store in history
    const now = new Date().toLocaleTimeString('sv-SE', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    dataHistory.timestamps.push(now);
    dataHistory.cpu.push(systemInfo.cpu);
    dataHistory.ram.push(systemInfo.ramPercent);
    
    // Calculate network totals
    const totalRx = systemInfo.network.reduce((sum, iface) => sum + (iface.rx_sec || 0), 0);
    const totalTx = systemInfo.network.reduce((sum, iface) => sum + (iface.tx_sec || 0), 0);
    dataHistory.networkRx.push(totalRx);
    dataHistory.networkTx.push(totalTx);
    
    // Keep only last MAX_HISTORY entries
    if (dataHistory.timestamps.length > MAX_HISTORY) {
      dataHistory.timestamps.shift();
      dataHistory.cpu.shift();
      dataHistory.ram.shift();
      dataHistory.networkRx.shift();
      dataHistory.networkTx.shift();
    }
    
    socket.emit('systemInfo', systemInfo);
    socket.emit('history', dataHistory);
  }, 1500);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

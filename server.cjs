const WebSocket = require('ws');
const http = require('http');
const httpServer = http.createServer((req , res) =>{ 
res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Chat Server');
});

const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (client) => {
  console.log('Client connected!');

  client.on('message', (msg) => {
    console.log(`Message: ${msg}`);
    broadcast(msg);
  });
});

function broadcast(msg) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  })}

httpServer.listen(process.argv[2] || 8080, () => {
  console.log('Server listening...');
});
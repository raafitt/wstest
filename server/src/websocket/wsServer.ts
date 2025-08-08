import WebSocket, { WebSocketServer } from 'ws';
import {
  startGenerator,
  stopGenerator,
  updateConfig,
} from '../logic/generatorManager';

const clients = new Set<WebSocket>();

export function startWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    clients.add(ws);
    ws.send(JSON.stringify({ type: 'info', message: 'Connected to WebSocket server' }));

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        const { type, param, min, max, frequency } = msg;

        
        const p = String(param);

        if (type === 'start') {
          updateConfig(p, Number(min), Number(max), Number(frequency));
          startGenerator(p, (param, value, timestamp) => {
            broadcast({
              type: 'data',
              param,
              value,
              timestamp,
            });
          });
        }

        if (type === 'stop') {
          stopGenerator(p);
        }
      } catch (err) {
        console.error('Invalid message:', err);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  console.log(`WebSocket server running at ws://localhost:${port}`);
}

function broadcast(message: any) {
  const json = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}

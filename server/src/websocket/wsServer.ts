// websocket/wsServer.ts
import WebSocket, { WebSocketServer } from 'ws';
import {
  ParamKey,
  startGenerator,
  stopGenerator,
  updateConfig,
} from '../logic/generatorManager';

const clients = new Set<WebSocket>();

export function startWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    clients.add(ws);//Добавили клиента в множество
    ws.send(JSON.stringify({ type: 'info', message: 'Connected to WebSocket server' }));//Отправили данные клиенту

    //получение данных с клиента
    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        const { type, param, min, max, frequency } = msg;

        if (!['param1', 'param2'].includes(param)) return;
        const p = param as ParamKey;

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

  console.log(`✅ WebSocket server running at ws://localhost:${port}`);
}

function broadcast(message: any) {
  const json = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }
}

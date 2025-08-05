"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebSocketServer = startWebSocketServer;
const ws_1 = __importStar(require("ws"));
const generatorManager_1 = require("../logic/generatorManager");
const clients = new Set();
function startWebSocketServer(port) {
    const wss = new ws_1.WebSocketServer({ port });
    wss.on('connection', (ws) => {
        clients.add(ws);
        ws.send(JSON.stringify({ type: 'info', message: 'Connected to WebSocket server' }));
        ws.on('message', (data) => {
            try {
                const msg = JSON.parse(data.toString());
                const { type, param, min, max, frequency } = msg;
                if (!['param1', 'param2'].includes(param))
                    return;
                const p = param;
                if (type === 'start') {
                    (0, generatorManager_1.updateConfig)(p, Number(min), Number(max), Number(frequency));
                    (0, generatorManager_1.startGenerator)(p, (param, value, timestamp) => {
                        broadcast({
                            type: 'data',
                            param,
                            value,
                            timestamp,
                        });
                    });
                }
                if (type === 'stop') {
                    (0, generatorManager_1.stopGenerator)(p);
                }
            }
            catch (err) {
                console.error('Invalid message:', err);
            }
        });
        ws.on('close', () => {
            clients.delete(ws);
        });
    });
    console.log(`✅ WebSocket server running at ws://localhost:${port}`);
}
function broadcast(message) {
    const json = JSON.stringify(message);
    for (const client of clients) {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(json);
        }
    }
}
//# sourceMappingURL=wsServer.js.map
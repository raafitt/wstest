// services/ws.ts
let socket: WebSocket | null = null;

export function initWebSocket(onMessage: (msg: MessageEvent) => void) {
  if (socket) return; // уже создан

  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("WebSocket connection opened.");
  };

  socket.onmessage = onMessage;

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
    socket = null;
  };
}

export function sendMessage(msg: any) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  }
}

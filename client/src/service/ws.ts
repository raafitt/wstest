// services/ws.ts
let socket: WebSocket;

export function initWebSocket(onMessage: (msg: MessageEvent) => void) {
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
  };
}

export function sendMessage(msg: any) {
  if (socket?.readyState === WebSocket.OPEN) {
    console.log(JSON.stringify(msg))
    socket.send(JSON.stringify(msg));
  }
}

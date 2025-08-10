// services/ws.ts
let socket: WebSocket | null = null;

export function initWebSocket(onMessage: (msg: MessageEvent) => void) {
  if (socket) return; // уже создан

  socket = new WebSocket("ws://localhost:8080");

  //Калбек При подключении 
  socket.onopen = () => {
    console.log("WebSocket connection opened.");
  };

  //При получении сообщения с сервера вызывается переданный в initWebSocket callback
  socket.onmessage = onMessage;

  //callback При ошибке 
  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  //При закрытии соединения
  socket.onclose = () => {
    console.log("WebSocket connection closed.");
    socket = null;
  };
}
//Функция отправки данных на сервер
export function sendMessage(msg: any) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  }
}

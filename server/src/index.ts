import dotenv from "dotenv";
import { startWebSocketServer } from './websocket/wsServer';

function getWsPort (){
    dotenv.config({path:'../.env'});
    const portStr = process.env.WS_SERVER_PORT;
    if (!portStr) throw new Error("Не удалось установить порт");

    const port = Number(portStr);
    if (Number.isNaN(port)) throw new Error("Неккоректный порт из .env");

    return port;
  };

function main(){
    const port = getWsPort()
    startWebSocketServer(port);
}

main()

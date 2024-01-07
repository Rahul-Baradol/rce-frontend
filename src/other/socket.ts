import { io } from "socket.io-client";

const URL = process.env.JUDGESOCKETURL || "http://localhost:3002"

function establishSocketConnection() {
   let socket = io(URL, {
      autoConnect: true
   })
   return socket;
}

export default establishSocketConnection;
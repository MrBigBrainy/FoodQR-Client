import { io } from "socket.io-client";

export const socket = io("https://foodqr-server.onrender.com", {
  transports: ["websocket"],
  autoConnect: true
});
// export const socket = io("http://localhost:3000", {
//   transports: ["websocket"],
//   autoConnect: true
// });

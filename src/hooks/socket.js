// import { io } from "socket.io-client";

// export const socket = io("http://localhost:8000");

// with env variables

// import { io } from "socket.io-client";


//  export const socket = io(import.meta.env.VITE_SOCKET_URL, {
//   withCredentials: true
  
// });

// new connection
// hooks/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId) return;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    query: { userId }
  });

  return socket;
};

export const getSocket = () => socket;


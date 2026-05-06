import { io } from "socket.io-client";

let socket = null;

export function initSocket(url, opts = {}) {
  if (socket) return socket;
  socket = io(url, opts);
  return socket;
}

export function getSocket() {
  return socket;
}

export function closeSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

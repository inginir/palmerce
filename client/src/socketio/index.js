import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:8080";

let socket = null;

export const initSocketIo = () => {
  if (!socket) {
    socket = socketIOClient(ENDPOINT);
    socket.on("greetings", (data) => {
      console.log("greetings", socket.id, data); // undefined
      // setResponse(data);
    });
    socket.on("connect", () => {
      console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("connection", () => {
      console.log("connection", socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }
  return socket;
};

export const getSocketIo = () => socket;
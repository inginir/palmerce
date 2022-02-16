import { useState, useEffect } from "react";
import { Home, Topbar } from "./components";
import "./App.css";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:8080";

// const socket = io("https://127.0.0.1:8080/");
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });
// socket.on("disconnect", () => {
//   console.log(socket.id); // undefined
// });

// socket.on("greetings", () => {
//   console.log("greetings", socket.id); // undefined
// });

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  useEffect(() => {
    console.log('gets here')
    const socket = socketIOClient(ENDPOINT);
    socket.on("greetings", (data) => {
      console.log("greetings", socket.id, data); // undefined
      // setResponse(data);
    });
    socket.on("connect", () => {
        console.log('connect', socket.id); // x8WIv7-mJelg7on_ALbx
      });
      socket.on("connection", () => {
        console.log('connection', socket.id); // x8WIv7-mJelg7on_ALbx
      });
  }, []);

  return (
    <>
      <Topbar />
      <Home />
    </>
  );
}

export default App;

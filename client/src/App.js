import { useState, useEffect } from "react";
import { Home, Topbar } from "./components";
import "./App.css";
import { initSocketIo } from "./socketio";

initSocketIo();

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <Topbar />
      <Home />
    </>
  );
}

export default App;

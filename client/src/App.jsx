import React, { useState } from "react";
import { io } from "socket.io-client";
import Navbar from "./lib/Navigation/Navbar";
import Table from "./lib/Table/Table";
import Map from "./lib/Map/Map";
const App = () => {
  var connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  const socket = io.connect("http://localhost:4000", connectionOptions);
  console.log(socket);
  const [navToggle, setNavToggle] = useState(true);
  return (
    <div>
      <Navbar navToggle={navToggle} setNavToggle={setNavToggle} />
      {navToggle ? <Table socket={socket} /> : <Map />}
    </div>
  );
};

export default App;

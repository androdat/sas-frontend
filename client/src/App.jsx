import React, { useState } from "react";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./lib/Navigation/Navbar";
import Table from "./lib/Table/Table";
import Map from "./lib/Map/Map";
const App = () => {
  console.log("App jsx running")
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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Table socket={socket} />} />
        <Route path="/map" element={<Map socket={socket} />} />
      </Routes>
    </>
  );
};

export default App;

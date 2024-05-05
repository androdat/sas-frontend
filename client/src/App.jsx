import React, { useState } from "react";
import Navbar from "./lib/Navigation/Navbar";
import Table from "./lib/Table/Table";
import Map from "./lib/Map/Map";
const App = () => {
  const [navToggle, setNavToggle] = useState(true);
  return (
    <div>
      <Navbar navToggle={navToggle} setNavToggle={setNavToggle} />
      {navToggle ? <Table /> : <Map />}
    </div>
  );
};

export default App;

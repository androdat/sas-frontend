import React from "react";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <div className="nav-parent">
        <p className="logo">Security Alarm System</p>
      <div className="button-parent">
        <div className="button"> Table</div>
        <div className="button"> Map</div>
      </div>
    </div>
  );
};

export default Navbar;

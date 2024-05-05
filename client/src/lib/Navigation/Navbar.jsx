import React from "react";
import "./Navbar.scss";
const Navbar = ({ navToggle, setNavToggle }) => {
  return (
    <div className="nav-parent">
      <p className="logo">Security Alarm System</p>
      <div className="button-parent">
        <div
          className="button"
          onClick={() => {
            setNavToggle(true);
          }}
        >
          Table
        </div>
        <div
          className="button"
          onClick={() => {
            setNavToggle(false);
          }}
        >
          Map
        </div>
      </div>
    </div>
  );
};

export default Navbar;

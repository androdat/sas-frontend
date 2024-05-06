import { useNavigate } from "react-router-dom";
import React from "react";
import "./Navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-parent">
      <p className="logo">Security Alarm System</p>
      <div className="button-parent">
        <div
          className="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Table
        </div>
        <div
          className="button"
          onClick={() => {
            navigate("/map");
          }}
        >
          Map
        </div>
      </div>
    </div>
  );
};

export default Navbar;

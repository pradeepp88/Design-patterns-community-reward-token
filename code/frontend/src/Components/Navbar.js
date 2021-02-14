import React from "react";
import { Link } from "react-router-dom";

const loginStyle = {
  padding: "5px",
  background: "#1976D2",
  borderRadius: "10px",
  textDecoration: "none",
  color: "white",
  width: "50px",
  textAlign: "center",
};

export default function Navbar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        placeItems: "center",
        justifyContent: "center",
        gridGap: "15px",
        padding: ".5em",
      }}
    >
      <Link to="/" style={loginStyle}>
        Login
      </Link>
      <Link to="/home" style={loginStyle}>
        Wall
      </Link>
    </div>
  );
}

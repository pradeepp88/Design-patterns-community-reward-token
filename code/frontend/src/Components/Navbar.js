import React from "react";
import { Link } from "react-router-dom";

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
      <Link to="/">Login </Link>
      <Link to="/home">Wall</Link>
    </div>
  );
}

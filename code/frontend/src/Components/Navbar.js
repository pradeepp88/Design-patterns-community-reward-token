import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ display: "grid", spacing: "1em", padding: "3em" }}>
      <Link to="/">Login </Link>
      <Link to="/home">Wall</Link>
    </div>
  );
}

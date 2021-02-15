import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const loginStyle = {
  padding: "5px",
  background: "#1976D2",
  borderRadius: "10px",
  textDecoration: "none",
  color: "white",
  width: "50px",
  textAlign: "center",
};

function Navbar(props) {
  const handleLogOut = () => {
    console.log("logging out");
    // localStorage.clear();
    //Logout User
    props.history.push('/', {"​​​user" : {}});


  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
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
      <Link to="/" style={loginStyle} onClick={handleLogOut}>
        Logout
      </Link>
    </div>
  );
}

export default withRouter(Navbar);
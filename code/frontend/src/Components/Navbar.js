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

  const handleLogOut = async () => {
    console.log("logging out");
    localStorage.clear();
    //Logout User
    props.history.push('/', {"​​​user" : {}});
    const username = localStorage.getItem('username');
    await fetch('http://localhost:8000/users/logout', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        isLoggedIn: false
      })
    })
    localStorage.clear();
  };


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        placeItems: "center",
        justifyContent: "center",
        gridGap: "15px",
        padding: ".5em",
      }}
    >
      <Link to="/" style={loginStyle}>
        Home
      </Link>
      <Link to="/" style={loginStyle} onClick={handleLogOut}>
        Logout
      </Link>
    </div>
  );
}

export default withRouter(Navbar);
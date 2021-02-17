import { useState } from "react";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SaveIcon from "@material-ui/icons/Save";
import logo from './logo.png';
import './Login.css';

import SCO from '../sco';
let sco = new SCO();

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const buttonDivStyle = {
  display: "flex",
  flexDirection: "row",
};

const LoginForm = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  // const { setLoggedInUser } = useContext(UserContext);

  // Register User
  const registerUser = async () => {
    const response = await fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        address: address,
      }),
    });
    const user = await response.json();
    alert(
      `You are now registered as ${user.username}. Please login to continue`
    );
    
    //Smart Contract Operations
    const key = prompt('Please enter your private key (this will not be saved and used only for one transaction)');
    await sco.registerNewUser(address,key);

    // clear username and address fields
    setUsername("");
    setAddress("");
  };

  //Login User
  const loginUser = async () => {
    if(username === "" || address === "" ){
      alert("Please fill both username and address");
      return;
    }
    console.log("Loggin in..");
    const response = await fetch(
      `http://localhost:8000/users?username=${username}&address=${address}`
    );
    const user = await response.json();
    // clear username and address fields
    setUsername("");
    setAddress("");

    if (user.exist) {
      // set loggedIn user (from Context ) here
      user.isLoggedIn = true;
      props.history.push("/home", { user: user });
      localStorage.setItem('username', username);
      // setLoggedInUser(user);
    } else {
      alert(`You are not a registered user. Please register first.`);
    }
    
  };

  

  return (
    <div className="divStyle">
    <form style={formStyle}>
      <img src={logo} alt="Logo" className="image" />

      <TextField
        placeholder="Username"
        margin="dense"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        placeholder="Ethereum Address"
        margin="dense"
        autoComplete="off"
        length="5"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onSubmit={loginUser}
      />

      <div style={buttonDivStyle}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={registerUser}
        >
          Register
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
          onClick={loginUser}
        >
          Login
        </Button>
        <br/>
        

      </div>
    </form>
    </div>
  );
};

export default withRouter(LoginForm);

// import { TextField, Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import SaveIcon from "@material-ui/icons/Save";

import "./Login.css";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
// };

// const buttonDivStyle = {
//   display: "flex",
//   flexDirection: "row",
// };

const handleSubmit = (e) => {
  e.preventDefault();
};

const LoginForm = () => {
  // const classes = useStyles();

  return (
    // <form style={formStyle}>
    //   <img src="" alt="" className={classes} />

    //   <TextField placeholder="Username" margin="dense" autoComplete="off" />

    //   <TextField
    //     placeholder="Ethereum Address"
    //     margin="dense"
    //     autoComplete="off"
    //     length="5"
    //   />

    //   <div style={buttonDivStyle}>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       size="large"
    //       className={classes.button}
    //       startIcon={<SaveIcon />}
    //     >
    //       Register
    //     </Button>

    //     <Button
    //       variant="contained"
    //       color="primary"
    //       size="large"
    //       className={classes.button}
    //       startIcon={<ExitToAppIcon />}
    //     >
    //       Login
    //     </Button>
    //   </div>
    // </form>

    // body{margin:0px;padding:0px;font-family:tahoma;font-size:13px;background:#cf000f;}

    <div className="login">
      <form action="" method="">
        <input
          type="text"
          name="username"
          placeholder="Username eg.@user"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Eth Address eg.0x099999999999999999999"
          required
        />
        <input type="submit" value="Login" onClick={(e) => handleSubmit(e)} />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default LoginForm;

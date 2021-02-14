import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SaveIcon from "@material-ui/icons/Save";

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

const LoginForm = () => {
  const classes = useStyles();

  return (
    <form style={formStyle}>
      <img src="" alt="" className={classes} />

      <TextField placeholder="Username" margin="dense" autoComplete="off" />

      <TextField
        placeholder="Ethereum Address"
        margin="dense"
        autoComplete="off"
        length="5"
      />

      <div style={buttonDivStyle}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Register
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

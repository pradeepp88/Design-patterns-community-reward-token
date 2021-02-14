import { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const buttonDivStyle = {
  display: 'flex',
  flexDirection: 'row',
}

const LoginForm = () => {
  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')

  // Register User
  const registerUser = async () => {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        address: address,
      }),
    })
    const user = await response.json()
    alert(
      `You are now registered ${user.username}. Start asking/answering questions!`,
    )
    // if we want to auto login user after registering - uncomment code below
    //loginUser()

    // clear username and address fields
    // setUsername('')
    // setAddress('')
  }

  //Login User
  const loginUser = async () => {
    const response = await fetch(
      `http://localhost:8000/users?username=${username}&address=${address}`,
    )
    const user = await response.json()

    // clear username and address fields
    setUsername('')
    setAddress('')
    if (user.exist) {
      alert(
        `You are now logged in ${user.username}. Start asking/answering questions!`,
      )
    } else {
      alert(`Oh no! You are not a registered user. Please register first.`)
    }
  }

  return (
    <form style={formStyle}>
      <img src="" alt="" className={classes} />

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
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
          onClick={loginUser}
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm

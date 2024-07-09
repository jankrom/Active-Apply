import GoogleIcon from "@mui/icons-material/Google"

import { Button } from "@mui/material"
import { loginWithGoogle } from "../auth/login-helper"

const Login = () => {
  return (
    <div
      style={{
        height: "432.5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          position: "relative",
          bottom: "16px",
        }}
      >
        Login to continue
      </h1>
      <Button
        id="submit-btn"
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={loginWithGoogle}
      >
        Login with Google
      </Button>
    </div>
  )
}
export default Login

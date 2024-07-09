import { useState, useEffect } from "react"

import Form from "../components/Form"
import Login from "../components/Login"
import Loading from "../components/Loading"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkedLogIn, setCheckedLogIn] = useState(false)

  useEffect(async () => {
    const resp = await fetch(
      `${import.meta.env.VITE_ORIGIN_URL}/api/login/chrome-extension/verify`
    )
    const status = resp?.status

    if (status === 200) setLoggedIn(true)

    setCheckedLogIn(true)
  }, [])

  return (
    <div id="appContainer">
      {!checkedLogIn && <Loading />}
      {checkedLogIn && loggedIn && <Form />}
      {checkedLogIn && !loggedIn && <Login />}
    </div>
  )
}

export default App

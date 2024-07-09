import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { loginWithGoogle } from "../auth/login-helper"

import Form from "../components/Form"
import { useEffect } from "react"

function App() {
  const [count, setCount] = useState(0)

  useEffect(async () => {
    const resp = await fetch(
      `${import.meta.env.VITE_ORIGIN_URL}/api/login/chrome-extension/verify`
    )
    const status = resp?.status
    console.log(status)
  }, [])

  return (
    <div id="appContainer">
      <button onClick={loginWithGoogle}>CLICK ME</button>
      <Form />
    </div>
  )
}

export default App

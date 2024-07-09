import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { loginWithGoogle } from "../auth/login-helper"

import Form from "../components/Form"
import { useEffect } from "react"

function App() {
  const [count, setCount] = useState(0)

  useEffect(async () => {
    // const { session } = await chrome.storage.local.get("session")
    // console.log(session)
    // if (session) {
    //   const supabase = createClient(
    //     import.meta.env.VITE_SUPABASE_URL,
    //     import.meta.env.VITE_SUPABASE_ANON_KEY
    //   )

    //   const { error: supaAuthError } = await supabase.auth.setSession(session)
    //   if (supaAuthError) {
    //     throw supaAuthError
    //   }

    //   console.log("LOGGED IN")
    //   console.log(session)
    // }
    console.log(`${import.meta.env.VITE_ORIGIN_URL}/api/login`)
    const resp = await fetch(`${import.meta.env.VITE_ORIGIN_URL}/api/login`)
    console.log(resp)
    console.log(resp?.json)
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

import { useState, useEffect } from "react"

import Form from "../components/Form"
import Login from "../components/Login"
import Loading from "../components/Loading"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkedLogIn, setCheckedLogIn] = useState(false)
  const [jobInformation, setJobInformation] = useState({
    jobUrl: "",
    companyName: "",
    position: "",
    positionNumber: "",
  })

  useEffect(() => {
    const getUserInfo = async () => {
      await chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        async (tabs) => {
          const jobUrl = tabs[0].url
          const resp = await fetch(
            `${
              import.meta.env.VITE_ORIGIN_URL
            }/api/login/chrome-extension/verify?jobUrl=${jobUrl}`
          )
          const status = resp?.status

          if (status === 200) {
            setLoggedIn(true)
            const jobInformation = await resp.json()
            setJobInformation({ ...jobInformation })
          }
          setCheckedLogIn(true)
        }
      )
    }

    getUserInfo()
  }, [])

  return (
    <div id="appContainer">
      {!checkedLogIn && <Loading text={"Authenticating..."} />}
      {checkedLogIn && loggedIn && (
        <Form key={jobInformation.jobUrl} jobInformation={jobInformation} />
      )}
      {checkedLogIn && !loggedIn && <Login />}
    </div>
  )
}

export default App

import { useState, useEffect } from "react"

import Form from "../components/Form"
import Login from "../components/Login"
import Loading from "../components/Loading"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkedLogIn, setCheckedLogIn] = useState(false)
  const [paid, setPaid] = useState(false)
  const [jobInformation, setJobInformation] = useState({
    jobUrl: "",
    companyName: "",
    position: "",
    positionNumber: "",
  })

  useEffect(() => {
    const getUserInfo = async () => {
      const resp = await fetch(
        `${import.meta.env.VITE_ORIGIN_URL}/api/login/chrome-extension/verify`
      )
      const status = resp?.status

      if (status === 200) {
        setLoggedIn(true)

        const json = await resp.json()
        const currentlyPaid = json.currentlyPaid

        // if paid, then try to autofill form
        if (currentlyPaid) {
          await chrome.tabs.query(
            { active: true, lastFocusedWindow: true },
            async (tabs) => {
              const jobUrl = tabs[0].url
              const resp = await fetch(
                `${
                  import.meta.env.VITE_ORIGIN_URL
                }/api/chrome-extension/autofill-form?jobUrl=${jobUrl}`
              )
              const jobInformation = await resp.json()
              setJobInformation({ ...jobInformation, jobUrl })
            }
          )
          setPaid(true)
        }
      }
      setCheckedLogIn(true)
    }

    getUserInfo()
  }, [])

  return (
    <div id="appContainer">
      {!checkedLogIn && <Loading text={"Authenticating..."} />}
      {checkedLogIn &&
        loggedIn &&
        (paid ? (
          jobInformation.jobUrl ? (
            <Form key={jobInformation.jobUrl} jobInformation={jobInformation} />
          ) : (
            <Loading text={"Autofilling information..."} />
          )
        ) : (
          <Form key={jobInformation.jobUrl} jobInformation={jobInformation} />
        ))}
      {checkedLogIn && !loggedIn && <Login />}
    </div>
  )
}

export default App

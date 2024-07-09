import { useState } from "react"

import Form from "../components/Form"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="appContainer">
      <Form />
    </div>
  )
}

export default App

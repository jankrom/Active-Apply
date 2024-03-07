import { useState } from "react"

import Footer from "../components/Footer"
import Form from "../components/Form"
import Navbar from "../components/Navbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="appContainer">
      <Navbar />
      <Form />
      <Footer />
    </div>
  )
}

export default App

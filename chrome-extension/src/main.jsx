import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"

import MainPage from "./pages/MainPage"
import Navbar from "./components/Navbar"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="bottom-right" reverseOrder={false} />
    <Navbar />
    <MainPage />
  </React.StrictMode>
)

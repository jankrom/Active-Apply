import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import MainPage from "./pages/MainPage"
import ProfilePage from "./pages/ProfilePage"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

import "./index.css"

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/profile", element: <ProfilePage /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    {/* <RouterProvider router={router} /> */}
    <MainPage />
    <Footer />
  </React.StrictMode>
)

import { useState, useRef } from "react"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import MenuIcon from "@mui/icons-material/Menu"
import { IconButton } from "@mui/material"

import activeApplyIcon from "../assets/active-apply-icon.svg"

const navItems = ["About", "Contact"]

const Navbar = () => {
  //   const clicked = useRef(false)
  const [clicked, setClicked] = useState(false)

  return (
    <Box>
      <AppBar component="nav" id="navBar">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingRight: 500,
          }}
          disableGutters
        >
          <img
            src={activeApplyIcon}
            alt="Active Apply logo"
            id="activeApplyIcon"
            onClick={() => console.log("hi")}
          />
          {/* <Box>
            {navItems.map((item) => (
              <Button variant="text" key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box> */}
          <IconButton aria-label="options" sx={{ color: "#fff" }}>
            <MenuIcon
              className={clicked ? `rotate90` : ""}
              fontSize="medium"
              sx={{ fontSize: 30, transition: "all 0.5s" }}
              onClick={() => setClicked(!clicked)}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

import { useState } from "react"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"

import activeApplyIcon from "../assets/active-apply-icon.svg"

const navItems = ["About", "Contact"]

const Navbar = () => {
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
          />
          <Box>
            {navItems.map((item) => (
              <Button variant="text" key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

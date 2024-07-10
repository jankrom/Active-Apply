import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import SettingsIcon from "@mui/icons-material/Settings"
import { IconButton } from "@mui/material"

import activeApplyIcon from "../assets/active-apply-icon.svg"

const Navbar = () => {
  const handleLogoClick = async () => {
    await chrome.tabs.create({
      url: `${import.meta.env.VITE_ORIGIN_URL}/dashboard`,
    })
  }

  const handleSettingsClick = async () => {
    await chrome.tabs.create({
      url: `${import.meta.env.VITE_ORIGIN_URL}/settings`,
    })
  }

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
            onClick={handleLogoClick}
          />
          <IconButton aria-label="options" sx={{ color: "#fff" }}>
            <SettingsIcon
              fontSize="medium"
              sx={{
                fontSize: 30,
                "&:hover": { fontSize: 32 },
                transitionDuration: "150ms",
              }}
              onClick={handleSettingsClick}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

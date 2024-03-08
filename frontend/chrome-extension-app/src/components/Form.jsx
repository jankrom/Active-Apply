import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"

import { useState, useEffect } from "react"

const Form = () => {
  const [companyUrl, setCompanyUrl] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [positionNumber, setPositionNumber] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "75%" },
        "& .MuiInputLabel-root": { color: "white" },
        "& .MuiInputBase-root": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { border: "1.5px solid white" },
          "&:hover fieldset": { border: "1.5px solid #0c7acd" },
        },
        marginTop: "10px",
      }}
      noValidate
      autoComplete="off"
      method="POST"
      textAlign="center"
    >
      <TextField
        className="form-input"
        id="company-url"
        label="Company URL"
        name="company-url"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={companyUrl}
        onChange={(e) => setCompanyUrl(e.target.value)}
      />
      <TextField
        className="form-input"
        id="company-name"
        name="company-name"
        label="Company Name"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <TextField
        className="form-input"
        id="position"
        name="position"
        label="Position"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <TextField
        className="form-input"
        id="position-number"
        name="position-number"
        label="Position Number"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={positionNumber}
        onChange={(e) => setPositionNumber(e.target.value)}
      />
      <TextField
        className="form-input"
        id="date"
        name="date"
        label="Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button id="submit-btn" variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  )
}
export default Form

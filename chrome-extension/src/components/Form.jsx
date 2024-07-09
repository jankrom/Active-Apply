import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import CheckIcon from "@mui/icons-material/Check"
import { CircularProgress, Alert } from "@mui/material"
import { green } from "@mui/material/colors"

import { useState, useEffect } from "react"

const Form = () => {
  const [companyUrl, setCompanyUrl] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [positionNumber, setPositionNumber] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmitClick = () => {
    setLoading(!loading)
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      setError(true)
    }, 1000)
  }

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
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      method="POST"
      textAlign="center"
    >
      <TextField
        required
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
        required
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
      <Box>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            id="submit-btn"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmitClick}
            disabled={loading}
          >
            Send
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          {success && (
            <CheckIcon
              sx={{
                position: "absolute",
                left: 110,
                bgcolor: green[500],
                color: "white",
                padding: 0.9,
                borderRadius: 120,
              }}
            />
          )}
        </Box>
      </Box>
      {isError && (
        <Alert severity="error" sx={{ width: "25%" }}>
          Error
        </Alert>
      )}
    </Box>
  )
}
export default Form
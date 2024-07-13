import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import { CircularProgress } from "@mui/material"

import { useState } from "react"
import toast from "react-hot-toast"

const Form = ({ jobInformation }) => {
  const [companyUrl, setCompanyUrl] = useState(jobInformation?.jobUrl)
  const [companyName, setCompanyName] = useState(jobInformation?.companyName)
  const [position, setPosition] = useState(jobInformation?.position)
  const [positionNumber, setPositionNumber] = useState(
    jobInformation?.positionNumber
  )
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    setLoading(!loading)

    event.preventDefault()

    const inputs = {
      companyName: event.target.elements.companyName.value,
      jobUrl: event.target.elements.jobUrl.value,
      position: event.target.elements?.position.value,
      positionNumber: event.target.elements?.positionNumber.value,
    }

    const response = await fetch(
      `${import.meta.env.VITE_ORIGIN_URL}/api/chrome-extension/submit-form`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }
    )

    const status = response?.status

    const text = await response.text()

    if (status === 200) toast.success("Added job!")
    else toast.error(text)

    setLoading(false)
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
      autoComplete="off"
      textAlign="center"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        className="form-input"
        id="jobUrl"
        label="Job URL"
        name="jobUrl"
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
        id="companyName"
        name="companyName"
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
        id="positionNumber"
        name="positionNumber"
        label="Position Number"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={positionNumber}
        onChange={(e) => setPositionNumber(e.target.value)}
      />
      {/* <TextField
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
      /> */}
      <Box>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            id="submit-btn"
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={loading}
            sx={{
              "&:hover": { scale: "1.05" },
              transitionDuration: "150ms",
            }}
          >
            Add Job
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
        </Box>
      </Box>
    </Box>
  )
}
export default Form

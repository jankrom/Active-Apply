import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import { green } from "@mui/material/colors"

const Form = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "75%" },
        marginTop: "10px",
      }}
      noValidate
      autoComplete="off"
      method="POST"
      textAlign="center"
    >
      <TextField
        id="outlined-number"
        label="Company URL"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number"
        label="Company Name"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number"
        label="Position"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number"
        label="Position Number"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number"
        label="Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button id="submit-btn" variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  )
}
export default Form

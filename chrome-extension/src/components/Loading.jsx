import { CircularProgress } from "@mui/material"

const Loading = ({ text }) => {
  return (
    <div
      style={{
        height: "360.5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        size={24}
        sx={{
          color: "white",
        }}
      />
      <h3 style={{ color: "white" }}>{text}</h3>
    </div>
  )
}
export default Loading

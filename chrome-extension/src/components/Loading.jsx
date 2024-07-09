import { CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <div style={{ height: "432.5px" }}>
      <CircularProgress
        size={24}
        sx={{
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    </div>
  )
}
export default Loading

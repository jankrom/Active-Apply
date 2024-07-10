import Spreadhsheet from "./spreadhsheet"

const Spreadhsheets = () => {
  const spreadsheets = [
    { name: "Fall Season", amount: 50, url: "" },
    { name: "Spring Season", amount: 18, url: "" },
    { name: "Summer Season", amount: 24, url: "" },
  ]

  return (
    <div className="flex flex-col gap-5 items-center rounded-xl">
      <h2 className="text-2xl lg:text-4xl font-bold text-white">
        Your Job Spreadsheets
      </h2>
      <div className="flex flex-col items-center min-w-full">
        {spreadsheets.map((spreadhsheet, index) => (
          <Spreadhsheet key={index} spreadsheet={spreadhsheet} />
        ))}
      </div>
    </div>
  )
}
export default Spreadhsheets

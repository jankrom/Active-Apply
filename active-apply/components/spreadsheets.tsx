import Spreadhsheet from "./spreadhsheet"

interface Props {
  spreadsheets: {
    id: string
    userId: string
    name: string
    totalJobs: number
  }[]
  defaultSpreadsheet: { id: string | undefined; name: string | undefined }
}

const Spreadhsheets = ({ spreadsheets, defaultSpreadsheet }: Props) => {
  return (
    <div className="flex flex-col gap-5 items-center rounded-xl">
      <h2 className="text-2xl lg:text-4xl font-bold text-white">
        Your Job Spreadsheets
      </h2>
      <div className="flex flex-col items-center min-w-full">
        {spreadsheets.map((spreadhsheet, index) => (
          <Spreadhsheet
            key={index}
            spreadsheet={spreadhsheet}
            isDefault={defaultSpreadsheet.id === spreadhsheet.id}
          />
        ))}
      </div>
    </div>
  )
}
export default Spreadhsheets

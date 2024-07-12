import { cn } from "@/lib/utils"

interface Props {
  spreadsheetRow: {
    id: number
    jobUrl: string
    companyName: string
    position: string | null
    positionNumber: string | null
    date: Date
    status: string
    userId: string
  }
  spreadsheetId: string
}

const SpreadsheetRow = ({ spreadsheetRow, spreadsheetId }: Props) => {
  return (
    <>
      <div className="w-full grid grid-cols-6 bg-gray-50 items-center border border-1">
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.companyName}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.jobUrl}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.position}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.positionNumber}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(spreadsheetRow.date)}
        </div>
        <div
          className={`text-center overflow-auto h-full flex items-center justify-center ${
            spreadsheetRow.status === "Interviewing"
              ? "bg-yellow-300"
              : spreadsheetRow.status === "Accepted"
              ? "bg-green-300"
              : spreadsheetRow.status === "Rejected"
              ? "bg-red-300"
              : "bg-gray-50"
          }`}
        >
          {spreadsheetRow.status}
        </div>
      </div>
    </>
  )
}
export default SpreadsheetRow

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
      <div className="w-full grid grid-cols-6 bg-gray-50 py-4 px-2 items-center border border-1">
        <div className="text-center overflow-auto">
          {spreadsheetRow.companyName}
        </div>
        <div className="text-center overflow-auto">{spreadsheetRow.jobUrl}</div>
        <div className="text-center overflow-auto">
          {spreadsheetRow.position}
        </div>
        <div className="text-center overflow-auto">
          {spreadsheetRow.positionNumber}
        </div>
        <div className="text-center overflow-auto">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(spreadsheetRow.date)}
        </div>
        <div className="text-center overflow-auto">{spreadsheetRow.status}</div>
      </div>
    </>
  )
}
export default SpreadsheetRow

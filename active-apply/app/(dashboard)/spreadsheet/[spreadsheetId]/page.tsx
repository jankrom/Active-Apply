import { AddSpreadsheetRowButton } from "@/components/spreadhsheet-add-row-btn"
import SpreadsheetRow from "@/components/spreadsheet-row"
import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

const isValidPage = async (spreadsheetId: string) => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return { isValid: false, spreadhseet: null } // return false if no user exists

  let response

  try {
    response = await prismadb.spreadsheet.findUnique({
      where: { id: spreadsheetId },
      include: { rows: { orderBy: { date: "asc" } } },
    })
  } catch (error) {
    return { isValid: false, spreadsheet: null }
  }

  if (!response) return { isValid: false, spreadsheet: null } // return false if spreadsheet doesnt exist

  // validate that user made the spreadsheet
  return { isValid: user.id === response.userId, spreadsheet: response }
}

export default async function SpreadsheetPage({
  params: { spreadsheetId },
}: {
  params: { spreadsheetId: string }
}) {
  const { spreadsheet, isValid } = await isValidPage(spreadsheetId)

  if (!isValid || !spreadsheet) notFound()

  return (
    <div className="w-full flex flex-col items-center mt-4 gap-12">
      <h2 className="text-4xl font-bold text-white">{spreadsheet.name}</h2>
      <div className="w-full flex flex-col items-center">
        <div className="w-full grid grid-cols-6 bg-[#0059bb] shadow-2xl text-gray-200 p-4 rounded-t-xl font-semibold">
          <div className="text-center">Company Name</div>
          <div className="text-center">Job Url</div>
          <div className="text-center">Position</div>
          <div className="text-center">Position Number</div>
          <div className="text-center">Date</div>
          <div className="text-center">Status</div>
        </div>
        {spreadsheet.rows.map((spreadsheetRow) => (
          <SpreadsheetRow
            key={spreadsheetRow.id}
            spreadsheetRow={spreadsheetRow}
            spreadsheetId={spreadsheetId}
          />
        ))}
        <AddSpreadsheetRowButton spreadsheetId={spreadsheetId} />
      </div>
    </div>
  )
}

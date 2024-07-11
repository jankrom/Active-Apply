import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

const isValidPage = async (spreadsheetId: string) => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return false // return false if no user exists

  let response

  try {
    response = await prismadb.spreadsheet.findUnique({
      where: { id: spreadsheetId },
    })
  } catch (error) {
    return false
  }

  if (!response) return false // return false if spreadsheet doesnt exist

  // validate that user made the spreadsheet
  return user.id === response.userId
}

export default async function SpreadsheetPage({
  params: { spreadsheetId },
}: {
  params: { spreadsheetId: string }
}) {
  const isValid: boolean = await isValidPage(spreadsheetId)

  if (!isValid) notFound()

  return <div>Spreadsheet page</div>
}

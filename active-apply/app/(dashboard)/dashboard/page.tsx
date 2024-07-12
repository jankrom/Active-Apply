import { AddSpreadsheetButton } from "@/components/spreadhsheet-add-btn"
import Spreadhsheets from "@/components/spreadsheets"
import UserProfile from "@/components/user-profile"
import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

const getInfo = async () => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return { isValid: false, spreadhseets: null, user: null } // return false if no user exists

  let response

  try {
    response = await prismadb.spreadsheet.findMany({
      where: { userId: user.id },
    })
  } catch (error) {
    return { isValid: false, spreadsheet: null, user: null }
  }

  if (!response) return { isValid: false, spreadsheets: null, user: null } // return false if spreadsheet doesnt exist

  // validate that user made the spreadsheet
  return { isValid: true, spreadsheets: response, user: user }
}

const DashboardPage = async () => {
  const { spreadsheets, isValid, user } = await getInfo()

  if (!isValid || spreadsheets === undefined || spreadsheets === null)
    notFound()

  return (
    <div className="w-full lg:flex lg:justify-between gap-8 px-8 pt-12">
      <UserProfile spreadsheets={spreadsheets} user={user} />
      <Spreadhsheets spreadsheets={spreadsheets} />
      <AddSpreadsheetButton />
    </div>
  )
}
export default DashboardPage

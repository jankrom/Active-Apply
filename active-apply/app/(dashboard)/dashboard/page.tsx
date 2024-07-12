import { NewUserModal } from "@/components/new-user-modal"
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

  if (!user)
    return {
      isValid: false,
      spreadhseets: null,
      user: null,
      defaultSpreadsheet: "",
    } // return false if no user exists

  let response
  let defaultSpreadsheet

  try {
    response = await prismadb.spreadsheet.findMany({
      where: { userId: user.id },
    })

    const profile = await prismadb.profile.findUnique({
      where: { id: user.id },
    })

    defaultSpreadsheet = profile?.defaultSpreadsheet
  } catch (error) {
    return {
      isValid: false,
      spreadsheet: null,
      user: null,
      defaultSpreadsheet: "",
    }
  }

  if (!response)
    return {
      isValid: false,
      spreadsheets: null,
      user: null,
      defaultSpreadsheet: "",
    } // return false if spreadsheet doesnt exist

  // validate that user made the spreadsheet
  return {
    isValid: true,
    spreadsheets: response,
    user: user,
    defaultSpreadsheet: defaultSpreadsheet,
  }
}

const DashboardPage = async () => {
  const { spreadsheets, isValid, user, defaultSpreadsheet } = await getInfo()

  if (
    !isValid ||
    spreadsheets === undefined ||
    spreadsheets === null ||
    defaultSpreadsheet === undefined
  )
    notFound()

  return (
    <div className="w-full lg:flex lg:justify-between gap-8 px-8 pt-12">
      <UserProfile
        spreadsheets={spreadsheets}
        defaultSpreadsheet={defaultSpreadsheet}
      />
      <Spreadhsheets spreadsheets={spreadsheets} />
      <AddSpreadsheetButton />
      {!defaultSpreadsheet && <NewUserModal />}
    </div>
  )
}
export default DashboardPage

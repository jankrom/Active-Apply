import { NewUserModal } from "@/components/new-user-modal"
import ProModal from "@/components/pro-modal"
import { AddSpreadsheetButton } from "@/components/spreadhsheet-add-btn"
import Spreadhsheets from "@/components/spreadsheets"
import UserProfile from "@/components/user-profile"
import prismadb from "@/lib/prismadb"
import { checkSubscription } from "@/lib/subscription"
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
      defaultSpreadsheet: { id: "", name: "" },
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

    defaultSpreadsheet = {
      name: profile?.defaultSpreadsheet,
      id: profile?.defaultSpreadsheetId,
    }
  } catch (error) {
    return {
      isValid: false,
      spreadsheet: null,
      defaultSpreadsheet: { id: "", name: "" },
    }
  }

  if (!response)
    return {
      isValid: false,
      spreadsheets: null,
      defaultSpreadsheet: { id: "", name: "" },
    } // return false if spreadsheet doesnt exist

  // validate that user made the spreadsheet
  return {
    isValid: true,
    spreadsheets: response,
    defaultSpreadsheet: defaultSpreadsheet,
  }
}

const DashboardPage = async () => {
  const { spreadsheets, isValid, defaultSpreadsheet } = await getInfo()

  if (
    !isValid ||
    spreadsheets === undefined ||
    spreadsheets === null ||
    defaultSpreadsheet === undefined
  )
    notFound()

  const isPro = await checkSubscription()

  return (
    <div className="w-full lg:flex lg:justify-between gap-16 px-8 pt-12">
      <UserProfile
        spreadsheets={spreadsheets}
        defaultSpreadsheet={defaultSpreadsheet}
      />
      <Spreadhsheets
        spreadsheets={spreadsheets}
        defaultSpreadsheet={defaultSpreadsheet}
      />
      <AddSpreadsheetButton defaultSpreadsheet={defaultSpreadsheet} />
      <ProModal isPro={isPro} />
      {!defaultSpreadsheet?.id && <NewUserModal />}
    </div>
  )
}
export default DashboardPage

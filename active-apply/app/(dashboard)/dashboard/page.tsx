import { AddSpreadsheetButton } from "@/components/spreadhsheet-add-btn"
import Spreadhsheets from "@/components/spreadsheets"
import UserProfile from "@/components/user-profile"

const DashboardPage = () => {
  return (
    <div className="w-full lg:flex lg:justify-between gap-8 px-8 pt-12">
      <UserProfile />
      <Spreadhsheets />
      <AddSpreadsheetButton />
    </div>
  )
}
export default DashboardPage

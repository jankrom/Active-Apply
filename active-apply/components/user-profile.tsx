import Link from "next/link"
import UserCharts from "./user-charts"
interface Props {
  spreadsheets: {
    id: string
    userId: string
    name: string
    totalJobs: number
  }[]
  defaultSpreadsheet: { id: string | undefined; name: string | undefined }
}

const UserProfile = async ({ spreadsheets, defaultSpreadsheet }: Props) => {
  return (
    <div className="mb-8 py-6 px-8 max-h-[400px] flex flex-col gap-5 items-center rounded-xl lg:w-[500px] bg-gradient-to-tr from-[#0059bb] via-[#0c7acd] to-[#199cdf] text-white border-0 shadow-sm">
      <h2 className="text-4xl font-bold">About You</h2>
      <div>
        <UserCharts spreadsheets={spreadsheets} />
      </div>
      <div className="flex flex-col items-center">
        <div>
          Currently adding to:{" "}
          <Link
            className="font-medium"
            href={`/spreadsheet/${defaultSpreadsheet.id}`}
          >
            {defaultSpreadsheet?.name
              ? defaultSpreadsheet?.name
              : "Make your first spreadsheet"}
          </Link>
        </div>
        <Link
          className="underline text-black text-xs hover:scale-110 transition"
          href="/settings"
        >
          Change default spreadhseet
        </Link>
      </div>
    </div>
  )
}
export default UserProfile

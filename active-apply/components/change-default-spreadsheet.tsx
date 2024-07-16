"use client"

import { setDefaultSpreadsheet } from "@/lib/set-default-spreadsheet"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const ChangeDefaultSpreadsheet = ({
  isDefault,
  spreadsheet,
}: {
  isDefault: boolean
  spreadsheet:
    | { id: string; userId: string; name: string; totalJobs: number }
    | null
    | undefined
}) => {
  const router = useRouter()

  const setDefault = async () => {
    await toast.promise(setDefaultSpreadsheet(spreadsheet), {
      loading: "Setting DefaultSpreadsheet...",
      success: <b>Default spreadsheet set!</b>,
      error: <b>Couldn't update default spreadsheet</b>,
    })

    router.refresh()
  }

  if (isDefault) return null
  return (
    <div className="flex justify-start" onClick={setDefault}>
      <div className="flex justify-center underline text-black text-xs hover:scale-105 transition hover:cursor-pointer">
        Set as default spreadhseet
      </div>
    </div>
  )
}
export default ChangeDefaultSpreadsheet

"use server"

import { createClient } from "@/utils/supabase/server"
import prismadb from "@/lib/prismadb"

interface Props {
  companyName: string
  jobUrl: string
  position?: string
  positionNumber?: string
  date: Date
  status: string
  spreadsheetRowId: number
}

export const editSpreadsheetRow = async ({
  companyName,
  jobUrl,
  position,
  positionNumber,
  date,
  status,
  spreadsheetRowId,
}: Props) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("User not authenticated")

  const data = {
    companyName,
    jobUrl,
    position,
    positionNumber,
    date,
    status,
  }

  try {
    // create new spreadsheet row
    await prismadb.spreadsheetRow.update({
      where: { id: spreadsheetRowId },
      data,
    })
  } catch (error: any) {
    throw new Error("Error editing spreadsheet row")
  }

  return { success: true, error: null }
}

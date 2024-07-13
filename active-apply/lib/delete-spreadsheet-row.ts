"use server"

import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"

export const deleteSpreadsheetRow = async (
  spreadsheetRowId: number,
  spreadsheetId: string
) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("User not authenticated")

  try {
    await prismadb.spreadsheetRow.delete({
      where: { id: spreadsheetRowId },
    })

    await prismadb.spreadsheet.update({
      where: { id: spreadsheetId },
      data: { totalJobs: { decrement: 1 } },
    })
  } catch (error: any) {
    throw new Error("Error deleting spreadsheet")
  }

  return { success: true, error: null }
}

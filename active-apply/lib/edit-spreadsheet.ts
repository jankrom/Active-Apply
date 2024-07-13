"use server"

import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"

export const editSpreadsheet = async (
  spreadsheetName: string,
  spreadsheetId: string
) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("User not authenticated")

  try {
    await prismadb.spreadsheet.update({
      where: { id: spreadsheetId },
      data: { name: spreadsheetName },
    })
  } catch (error: any) {
    throw new Error("Error updating spreadsheet")
  }

  try {
    // update default spreadsheet if needed
    await prismadb.profile.update({
      where: { id: user.id, defaultSpreadsheetId: spreadsheetId },
      data: {
        defaultSpreadsheet: spreadsheetName,
        defaultSpreadsheetId: spreadsheetId,
      },
    })
  } catch {}

  return { success: true, error: null }
}

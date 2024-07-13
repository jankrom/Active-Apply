"use server"

import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"

export const deleteSpreadsheet = async (spreadsheetId: string) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("User not authenticated")

  try {
    await prismadb.spreadsheet.delete({
      where: { id: spreadsheetId },
    })

    const response = await prismadb.profile.findUnique({
      where: { id: user.id },
      include: { spreadsheet: true },
    })

    const spreadsheets = response?.spreadsheet

    let newDefaultSpreadsheetName = ""
    let newDefaultSpreadsheetId = ""

    if (spreadsheets !== undefined && spreadsheets.length !== 0) {
      newDefaultSpreadsheetName = spreadsheets[0].name
      newDefaultSpreadsheetId = spreadsheets[0].id
    }

    // update default spreadsheet
    await prismadb.profile.update({
      where: { id: user.id },
      data: {
        defaultSpreadsheet: newDefaultSpreadsheetName,
        defaultSpreadsheetId: newDefaultSpreadsheetId,
      },
    })
  } catch (error: any) {
    throw new Error("Error deleting spreadsheet")
  }

  return { success: true, error: null }
}

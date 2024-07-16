"use server"

import prismadb from "./prismadb"

export const setDefaultSpreadsheet = async (
  spreadsheet:
    | {
        id: string
        userId: string
        name: string
        totalJobs: number
      }
    | null
    | undefined
) => {
  try {
    await prismadb.profile.update({
      where: { id: spreadsheet?.userId },
      data: {
        defaultSpreadsheet: spreadsheet?.name,
        defaultSpreadsheetId: spreadsheet?.id,
      },
    })
  } catch (error: any) {
    throw new Error("Error updating spreadsheet")
  }

  return 200
}

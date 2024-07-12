"use server"

import { createClient } from "@/utils/supabase/server"
import prismadb from "@/lib/prismadb"

interface Props {
  companyName: string
  jobUrl: string
  position?: string
  positionNumber?: string
  spreadsheetId: string
}

export const createSpreadsheetRow = async ({
  companyName,
  jobUrl,
  position,
  positionNumber,
  spreadsheetId,
}: Props) => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return

  const data = {
    spreadsheetId,
    userId: user.id,
    companyName,
    jobUrl,
    position,
    positionNumber,
    date: new Date(),
    status: "Applied",
  }

  try {
    const spreadsheet = await prismadb.spreadsheet.findUnique({
      where: { id: spreadsheetId },
    })
    if (spreadsheet?.userId !== user.id) return { success: false, error } // can only add to your own spreadsheet

    // create new spreadsheet row
    await prismadb.spreadsheetRow.create({
      data,
    })

    // update spreadsheet to have 1 more total job
    await prismadb.spreadsheet.update({
      where: { id: spreadsheetId },
      data: {
        totalJobs: spreadsheet.totalJobs + 1,
      },
    })
  } catch (error: any) {
    return { success: false, error }
  }

  return { success: true, error: null }
}

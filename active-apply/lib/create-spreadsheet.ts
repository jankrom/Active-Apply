"use server"

import { createClient } from "@/utils/supabase/server"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"

export const createSpreadsheet = async (spreadsheetName: string) => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return

  let redirectId: string = ""

  try {
    const { id } = await prismadb.spreadsheet.create({
      data: { userId: user.id, name: spreadsheetName },
    })
    redirectId = id

    await prismadb.profile.update({
      where: { id: user.id },
      data: { defaultSpreadsheet: spreadsheetName },
    })
  } catch (error: any) {
    return error
  }

  redirect(`spreadsheet/${redirectId}`)
}

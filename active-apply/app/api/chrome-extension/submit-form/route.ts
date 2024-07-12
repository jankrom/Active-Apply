"use server"

import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"
import prismadb from "@/lib/prismadb"
import { createSpreadsheetRow } from "@/lib/create-spreadsheet-row"
import { revalidatePath } from "next/cache"

// api route to check add a spreadsheet row from extension
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("Invalid method", { status: 404 })
  }

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return new NextResponse("Unauthorized", { status: 401 })

  const body = await req.json()

  try {
    if (!body.companyName || !body.jobUrl)
      return new NextResponse("Invalid request", { status: 400 })

    const profile = await prismadb.profile.findUnique({
      where: { id: user.id },
    })

    if (!profile?.defaultSpreadsheetId)
      return new NextResponse("No spreadsheet selected", { status: 400 })

    const { success, error } = (await createSpreadsheetRow({
      ...body,
      spreadsheetId: profile?.defaultSpreadsheetId,
    })) as {
      success: boolean
      error: any
    }

    if (!success) throw error
  } catch (error) {
    return new NextResponse("Error", { status: 404 })
  }

  // successfully
  return new NextResponse("Success", { status: 200 })
}

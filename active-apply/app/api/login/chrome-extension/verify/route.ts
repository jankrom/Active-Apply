"use server"

import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"
import prismadb from "@/lib/prismadb"

// api route to check if user is signed in. Called from chrome extension
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new NextResponse("Invalid method", { status: 404 })
  }

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return new NextResponse("Unauthorized", { status: 401 })

  let currentlyPaid = false

  try {
    const profile = await prismadb.profile.findUnique({
      where: { id: user.id },
    })
    if (profile?.currentlyPaid) currentlyPaid = true
  } catch (error) {}

  //   successfully found user
  return NextResponse.json({ currentlyPaid }, { status: 200 })
}

"use server"

import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"
import { checkSubscription } from "@/lib/subscription"

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

  let currentlyPaid = await checkSubscription()

  //   successfully found user
  return NextResponse.json({ currentlyPaid }, { status: 200 })
}

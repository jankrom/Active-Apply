"use server"

import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function GET(req: Request) {
  const supabase = createClient()
  const origin = process.env.WEBSITE_URL

  console.log(`${origin}/auth/callback`)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.redirect(new URL("/error", req.url))
  }

  return NextResponse.redirect(new URL(data?.url, req.url))
}

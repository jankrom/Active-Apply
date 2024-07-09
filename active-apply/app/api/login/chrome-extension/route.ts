"use server"

import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"
import loginWithGoogleOauth from "@/lib/login-google"

export async function GET(req: Request) {
  // const supabase = createClient()
  // const origin = process.env.WEBSITE_URL

  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: `${origin}/auth/callback`,
  //   },
  // })

  const { data, error } = await loginWithGoogleOauth()

  if (error) {
    return NextResponse.redirect(new URL("/error", req.url))
  }

  return NextResponse.redirect(new URL(data?.url, req.url))
}

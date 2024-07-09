"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"

export default async function loginChromeExtension() {
  const supabase = createClient()
  const origin = headers().get("origin")

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return "/error"
  }

  return data?.url
}

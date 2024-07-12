"use server"

import { NextResponse } from "next/server"

import loginWithGoogleOauth from "@/lib/login-google"
import { Provider } from "@supabase/supabase-js"

export async function GET(req: Request) {
  const { data, error } = (await loginWithGoogleOauth()) as {
    data: { provider: Provider; url: string }
    error: any
  }

  if (error) {
    return NextResponse.redirect(new URL("/error", req.url))
  }

  return NextResponse.redirect(new URL(data.url, req.url))
}

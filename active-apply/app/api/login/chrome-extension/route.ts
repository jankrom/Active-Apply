"use server"

import { NextResponse } from "next/server"

import loginWithGoogleOauth from "@/lib/login-google"

export async function GET(req: Request) {
  const { data, error } = await loginWithGoogleOauth()

  if (error) {
    return NextResponse.redirect(new URL("/error", req.url))
  }

  return NextResponse.redirect(new URL(data?.url, req.url))
}

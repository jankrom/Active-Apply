"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function loginWithGoogleOauth() {
  const supabase = createClient()
  const origin = process.env.NEXT_PUBLIC_APP_URL

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  return { data, error }
}

export async function loginWithGoogleFromLoginPage() {
  const supabase = createClient()
  const origin = process.env.NEXT_PUBLIC_APP_URL

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    redirect("/error")
  }

  redirect(data.url)
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

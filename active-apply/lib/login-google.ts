"use server"

import { createClient } from "@/utils/supabase/server"

export default async function loginWithGoogleOauth() {
  const supabase = createClient()
  const origin = process.env.WEBSITE_URL

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  return { data, error }
}

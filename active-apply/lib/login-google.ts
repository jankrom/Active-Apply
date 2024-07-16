"use server"

import { createClient } from "@/utils/supabase/server"

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

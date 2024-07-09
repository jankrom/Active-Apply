import { createClient } from "@supabase/supabase-js"

/**
 * Method used to login with google provider.
 */
export async function loginWithGoogle() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: chrome.identity.getRedirectURL(),
    },
  })
  if (error) throw error

  await chrome.tabs.create({ url: data.url })
}

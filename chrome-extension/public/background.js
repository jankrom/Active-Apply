import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// add tab listener when background script starts
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url?.startsWith(chrome.identity.getRedirectURL())) {
    finishUserOAuth(changeInfo.url)
  }
})

/**
 * Method used to finish OAuth callback for a user authentication.
 */
async function finishUserOAuth(url) {
  try {
    const SUPABASE_URL = "https://pgkingabsmshdzrfxxwn.supabase.co"
    const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBna2luZ2Fic21zaGR6cmZ4eHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0ODM2NzksImV4cCI6MjAzNjA1OTY3OX0.qWO67TtMm3pZumm8z-DuIlaqi1bvHRjsK7lxYC94y5A"
    const SUCCESS_LOGIN_PAGE = "http://localhost:3000/login/success"
    console.log(`handling user OAuth callback ...`)
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // extract tokens from hash
    const hashMap = parseUrlHash(url)
    const access_token = hashMap.get("access_token")
    const refresh_token = hashMap.get("refresh_token")
    if (!access_token || !refresh_token) {
      throw new Error(`no supabase tokens found in URL hash`)
    }

    // check if they work
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })
    if (error) throw error

    // persist session to storage
    await chrome.storage.local.set({ session: data.session })

    // finally redirect to a post oauth page
    chrome.tabs.update({ url: `${SUCCESS_LOGIN_PAGE}` })

    console.log(`finished handling user OAuth callback`)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Helper method used to parse the hash of a redirect URL.
 */
function parseUrlHash(url) {
  const hashParts = new URL(url).hash.slice(1).split("&")
  const hashMap = new Map(
    hashParts.map((part) => {
      const [name, value] = part.split("=")
      return [name, value]
    })
  )

  return hashMap
}

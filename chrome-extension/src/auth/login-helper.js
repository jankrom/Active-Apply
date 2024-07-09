/**
 * Method used to login with google provider.
 */
export async function loginWithGoogle() {
  await chrome.tabs.create({
    url: `${import.meta.env.VITE_ORIGIN_URL}/api/login/chrome-extension`,
  })
}

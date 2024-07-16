import SubscriptionButton from "@/components/subscription-button"
import { checkSubscription } from "@/lib/subscription"
import { Settings } from "lucide-react"

const SettingsPage = async () => {
  const isPro = await checkSubscription()

  return (
    <div className="text-gray-50 mt-8">
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className="p-2 w-fit rounded-md bg-gray-300/10">
          <Settings className="w-10 h-10 text-gray-300" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-sm">Manage account settings</p>
        </div>
      </div>
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-sm">
          {isPro
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}
export default SettingsPage

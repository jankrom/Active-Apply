"use client"

import axios from "axios"

import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import toast, { LoaderIcon } from "react-hot-toast"

interface Props {
  isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      disabled={isLoading}
      variant={isPro ? "blue" : "premium"}
      onClick={onClick}
      className="relative"
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      {isLoading && (
        <div className="h-full w-full flex flex-col gap-y-4 items-end -right-5 justify-center absolute">
          <div className="relative animate-spin">
            <LoaderIcon />
          </div>
        </div>
      )}
    </Button>
  )
}
export default SubscriptionButton

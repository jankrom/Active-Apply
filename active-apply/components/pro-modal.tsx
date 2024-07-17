"use client"

import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Badge } from "./ui/badge"
import { ClockArrowUp, Zap } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { useState } from "react"
import toast, { LoaderIcon } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { MdAutoFixHigh } from "react-icons/md"

const ProModal = ({ isPro }: { isPro: boolean }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (isPro) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="w-48 fixed bottom-10 left-10 hover:scale-125 transition"
          variant="premium"
        >
          Upgrade
          <Zap className="w-4 h-4 ml-2 fill-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Pro User
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <Card className="p-3 border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", "green")}>
                  <MdAutoFixHigh className={cn("w-6 h-6", "red")} />
                </div>
                <div className="font-semibold text-sm">
                  Autofill job infromation for you
                </div>
              </div>
            </Card>
            <Card className="p-3 border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", "green")}>
                  <ClockArrowUp className={cn("w-6 h-6", "red")} />
                </div>
                <div className="font-semibold text-sm">
                  Additional time savings of 20 seconds per application
                </div>
              </div>
            </Card>
            <video
              controls
              autoPlay
              muted
              className="w-full mt-8 rounded-lg border bg-black"
            >
              <source src="/pro-video.mp4" type="video/mp4" />
            </video>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            {loading && (
              <div className="h-full w-full flex flex-col gap-y-4 items-end px-10 justify-center absolute">
                <div className="relative animate-spin">
                  <LoaderIcon />
                </div>
              </div>
            )}
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default ProModal

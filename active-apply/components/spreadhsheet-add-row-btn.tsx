"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AsteriskIcon, PlusIcon } from "lucide-react"
import toast from "react-hot-toast"
import { createSpreadsheetRow } from "@/lib/create-spreadsheet-row"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  spreadsheetId: string
}

export function AddSpreadsheetRowButton({ spreadsheetId }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    const inputs: {
      companyName: string
      jobUrl: string
      position?: string
      positionNumber?: string
      spreadsheetId: string
    } = {
      companyName: event.target.elements.companyName.value,
      jobUrl: event.target.elements.jobUrl.value,
      position: event.target.elements?.position.value,
      positionNumber: event.target.elements?.positionNumber.value,
      spreadsheetId: spreadsheetId,
    }

    await toast.promise(createSpreadsheetRow(inputs), {
      loading: "Creating Spreadsheet Row...",
      success: <b>Job row created!</b>,
      error: <b>Couldn't create job row</b>,
    })

    setLoading(false)
    setOpen(false)

    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PlusIcon
          onClick={() => setOpen(true)}
          size="40"
          className="shadow-lg bg-gradient-to-t from-[#0059bb]
            to-[#a7c6ff] hover:scale-125 transition
            hover:cursor-pointer rounded-full text-white mt-4 mb-8"
        >
          <Button className="rounded-full"></Button>
        </PlusIcon>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
        <DialogHeader>
          <DialogTitle>Add Spreadsheet Row</DialogTitle>
          <DialogDescription>
            Create a new spreadhsheet row here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Google..."
                className="col-span-3 text-black border-black bg-gray-50"
                required
              />
              <AsteriskIcon className="text-red-500 absolute w-4 right-1 top-24.5" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobUrl" className="text-right">
                Job Url
              </Label>
              <Input
                id="jobUrl"
                name="jobUrl"
                placeholder="www.google.com/jobs..."
                className="col-span-3 text-black border-black bg-gray-50"
                required
              />
              <AsteriskIcon className="text-red-500 absolute w-4 right-1 top-24.5" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                placeholder="Software Engineer..."
                className="col-span-3 text-black border-black bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="positionNumber" className="text-right">
                Position Number
              </Label>
              <Input
                id="positionNumber"
                name="positionNumber"
                placeholder="912412..."
                className="col-span-3 text-black border-black bg-gray-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="hover:scale-110 transition"
              type="submit"
              variant="blue"
              disabled={loading}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

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
import { PlusIcon } from "lucide-react"
import { createSpreadsheet } from "@/lib/create-spreadsheet"
import toast from "react-hot-toast"
import { useState } from "react"

interface Props {
  defaultSpreadsheet: { id: string | undefined; name: string | undefined }
}

export function AddSpreadsheetButton({ defaultSpreadsheet }: Props) {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    await toast.promise(createSpreadsheet(event.target.elements.name.value), {
      loading: "Creating Spreadsheet...",
      success: <b>Spreadsheet created!</b>,
      error: <b>Couldn't create spreadsheet</b>,
    })

    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusIcon
          size="40"
          className="shadow-lg bg-gradient-to-t from-[#0059bb]
            to-[#a7c6ff] hover:scale-125 transition
            hover:cursor-pointer fixed bottom-10 right-10 rounded-full text-white"
        >
          <Button className="rounded-full"></Button>
        </PlusIcon>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create Spreadsheet</DialogTitle>
            <DialogDescription>
              Create a new spreadhsheet here. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Fall Recruiting Season..."
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

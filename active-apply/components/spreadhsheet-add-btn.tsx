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
import { Checkbox } from "./ui/checkbox"
import { createSpreadsheet } from "@/lib/create-spreadsheet"
import { FormEventHandler } from "react"
import toast from "react-hot-toast"

export function AddSpreadsheetButton() {
  const onSubmit = async (event: any) => {
    event.preventDefault()

    const error = await createSpreadsheet(event.target.elements.name.value)

    if (error !== undefined)
      toast.error(`Couldn't create spreadsheet: ${error}`)
    else toast.success("Successfully created spreadsheet!")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-10 right-10 rounded-full">
          <PlusIcon
            size="40"
            className="shadow-lg bg-gradient-to-t from-[#0059bb] to-[#a7c6ff] rounded-full hover:scale-125 transition hover:cursor-pointer"
          />
        </Button>
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
                defaultValue="Fall Recruiting Season..."
                className="col-span-3 text-black border-black bg-gray-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="hover:scale-110 transition"
              type="submit"
              variant="blue"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

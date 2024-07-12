"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSpreadsheet } from "@/lib/create-spreadsheet"
import toast from "react-hot-toast"

export function NewUserModal() {
  const onSubmit = async (event: any) => {
    event.preventDefault()

    const error = await createSpreadsheet(event.target.elements.name.value)

    if (error !== undefined)
      toast.error(`Couldn't create spreadsheet: ${error}`)
    else toast.success("Successfully created spreadsheet!")
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create Your First Job Spreadsheet</DialogTitle>
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
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { Edit2Icon, TrashIcon } from "lucide-react"
import { useState } from "react"

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
import toast from "react-hot-toast"
import { editSpreadsheet } from "@/lib/edit-spreadsheet"
import { deleteSpreadsheet } from "@/lib/delete-spreadsheet"
import { useRouter } from "next/navigation"

const SpreadsheetHeader = ({
  spreadsheetName,
  spreadsheetId,
}: {
  spreadsheetName: string
  spreadsheetId: string
}) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hovering, setHovering] = useState(false)

  const router = useRouter()

  const onSubmitEdit = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    await toast.promise(
      editSpreadsheet(event.target.elements.name.value, spreadsheetId),
      {
        loading: "Editing Spreadsheet...",
        success: <b>Spreadsheet edited!</b>,
        error: <b>Couldn't edit spreadsheet</b>,
      }
    )

    router.refresh()
    setIsLoading(false)
  }

  const onSubmitDelete = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)

    await toast.promise(deleteSpreadsheet(spreadsheetId), {
      loading: "Deleting Spreadsheet...",
      success: <b>Spreadsheet deleted!</b>,
      error: <b>Couldn't delete spreadsheet</b>,
    })

    router.push("/dashboard")
  }

  return (
    <>
      <h2
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="max-w-full text-4xl font-bold text-white relative text-center flex flex-wrap justify-center items-center gap-4"
      >
        <span className="break-words max-w-full">{spreadsheetName}</span>
        {hovering && (
          <div className="flex gap-1">
            <Edit2Icon
              onClick={() => setEditOpen(!editOpen)}
              className="text-blue-500 hover:scale-125 rounded-sm hover:cursor-pointer transition-all"
            />
            <TrashIcon
              onClick={() => setDeleteOpen(!deleteOpen)}
              className="text-red-500 hover:scale-125 rounded-sm hover:cursor-pointer transition-all"
            />
          </div>
        )}
      </h2>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
          <form onSubmit={onSubmitEdit}>
            <DialogHeader>
              <DialogTitle>Edit Spreadsheet</DialogTitle>
              <DialogDescription>
                Edit spreadhsheet name here. Click save edit when you're done.
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
                  defaultValue={spreadsheetName}
                  className="col-span-3 text-black border-black bg-gray-50"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="hover:scale-110 transition"
                type="submit"
                variant="blue"
                disabled={isLoading}
              >
                Save edit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
          <form onSubmit={onSubmitDelete}>
            <DialogHeader>
              <DialogTitle>Delete Spreadsheet: {spreadsheetName}</DialogTitle>
              <DialogDescription>
                Delete spreadhsheet here. Click delete when you're done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="hover:scale-110 transition"
                type="submit"
                variant="destructive"
                disabled={isLoading}
              >
                DELETE
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default SpreadsheetHeader

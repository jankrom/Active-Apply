"use client"

import { AsteriskIcon, Edit2Icon, TrashIcon } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker"
import { useRouter } from "next/navigation"
import { editSpreadsheetRow } from "@/lib/edit-spreasheet-row"
import toast from "react-hot-toast"
import { deleteSpreadsheetRow } from "@/lib/delete-spreadsheet-row"

interface Props {
  spreadsheetRow: {
    id: number
    jobUrl: string
    companyName: string
    position: string | null
    positionNumber: string | null
    date: Date
    status: string
    userId: string
  }
  spreadsheetId: string
}

const SpreadsheetRow = ({ spreadsheetRow, spreadsheetId }: Props) => {
  const router = useRouter()

  const [hovering, setHovering] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date>(spreadsheetRow.date as Date)
  const [statusValue, setStatusValue] = useState(spreadsheetRow.status)

  const onEditSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    const inputs: {
      companyName: string
      jobUrl: string
      position?: string
      positionNumber?: string
      date: Date
      status: string
      spreadsheetRowId: number
    } = {
      companyName: event.target.elements.companyName.value,
      jobUrl: event.target.elements.jobUrl.value,
      position: event.target.elements?.position.value,
      positionNumber: event.target.elements?.positionNumber.value,
      date: date,
      status: statusValue,
      spreadsheetRowId: spreadsheetRow.id,
    }

    await toast.promise(editSpreadsheetRow(inputs), {
      loading: "Editing Job...",
      success: <b>Job edited!</b>,
      error: <b>Couldn't edit job</b>,
    })

    setLoading(false)
    setEditOpen(false)

    router.refresh()
  }

  const onSubmitDelete = async (event: any) => {
    event.preventDefault()
    setLoading(true)

    await toast.promise(
      deleteSpreadsheetRow(spreadsheetRow.id, spreadsheetId),
      {
        loading: "Deleting Job...",
        success: <b>Job deleted!</b>,
        error: <b>Couldn't delete job</b>,
      }
    )

    setLoading(false)
    setDeleteOpen(false)

    router.refresh()
  }

  const editModalOpenChange = (e: boolean) => {
    // e will be false on close
    setEditOpen(e)
    setStatusValue(spreadsheetRow.status)
    setDate(spreadsheetRow.date)
  }

  return (
    <>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="w-full grid grid-cols-6 bg-gray-50 items-center border border-1 relative"
      >
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.companyName}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.jobUrl}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.position}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {spreadsheetRow.positionNumber}
        </div>
        <div className="text-center overflow-auto py-4 px-2">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(spreadsheetRow.date)}
        </div>
        <div
          className={`text-center overflow-auto h-full flex items-center justify-center ${
            spreadsheetRow.status === "Interviewing"
              ? "bg-yellow-300"
              : spreadsheetRow.status === "Accepted"
              ? "bg-green-300"
              : spreadsheetRow.status === "Rejected"
              ? "bg-red-300"
              : "bg-gray-50"
          }`}
        >
          <p className="mr-6">{spreadsheetRow.status}</p>
        </div>
        {hovering && (
          <div className="absolute right-2 flex gap-1">
            <Edit2Icon
              onClick={() => setEditOpen(true)}
              className="text-blue-700 hover:bg-blue-200 hover:scale-125 hover:rounded-sm hover:cursor-pointer transition-all"
            />
            <TrashIcon
              onClick={() => setDeleteOpen(true)}
              className="text-red-600 hover:bg-red-200 hover:scale-125 hover:rounded-sm hover:cursor-pointer transition-all"
            />
          </div>
        )}
      </div>
      {/* edit button */}
      <Dialog open={editOpen} onOpenChange={editModalOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
          <DialogHeader>
            <DialogTitle>Edit Spreadsheet Row</DialogTitle>
            <DialogDescription>
              Edit a spreadhsheet row here. Click edit when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyName" className="text-right">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  defaultValue={spreadsheetRow.companyName}
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
                  defaultValue={spreadsheetRow.jobUrl}
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
                  defaultValue={spreadsheetRow?.position || ""}
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
                  defaultValue={spreadsheetRow?.positionNumber || ""}
                  className="col-span-3 text-black border-black bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  name="status"
                  defaultValue={spreadsheetRow.status}
                  onValueChange={setStatusValue}
                >
                  <SelectTrigger
                    className={`col-span-3 text-black border-black
                      ${
                        statusValue === "Interviewing"
                          ? "bg-yellow-300"
                          : statusValue === "Accepted"
                          ? "bg-green-300"
                          : statusValue === "Rejected"
                          ? "bg-red-300"
                          : "bg-gray-50"
                      } `}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="col-span-3 text-black border-black bg-gray-50"
                      value="Applied"
                    >
                      Applied
                    </SelectItem>
                    <SelectItem
                      className="col-span-3 text-black border-black bg-yellow-300"
                      value="Interviewing"
                    >
                      Interviewing
                    </SelectItem>
                    <SelectItem
                      className="col-span-3 text-black border-black bg-green-300"
                      value="Accepted"
                    >
                      Accepted
                    </SelectItem>
                    <SelectItem
                      className="col-span-3 text-black border-black bg-red-300"
                      value="Rejected"
                    >
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
                <AsteriskIcon className="text-red-500 absolute w-4 right-1 top-24.5" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 text-black border-black bg-gray-50 justify-start text-right font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate as SelectSingleEventHandler}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <AsteriskIcon className="text-red-500 absolute w-4 right-1 top-24.5" />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="hover:scale-110 transition"
                type="submit"
                variant="blue"
                disabled={loading}
              >
                Edit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* delete button */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111827] border-0 text-white">
          <form onSubmit={onSubmitDelete}>
            <DialogHeader>
              <DialogTitle>Delete Job</DialogTitle>
              <DialogDescription>
                Delete job here. Click delete when you're done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="hover:scale-110 transition"
                type="submit"
                variant="destructive"
                disabled={loading}
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
export default SpreadsheetRow

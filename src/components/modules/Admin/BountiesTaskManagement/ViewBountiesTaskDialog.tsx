"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getBountyAndTaskById } from "@/services/bounty.service"
import { ITaskAndBounty } from "@/types/bounty.types"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskId: string | null
}

const formatDateTime = (value?: string) => {
  if (!value) return "N/A"
  const d = new Date(value)
  if (isNaN(d.getTime())) return "N/A"
  return format(d, "MMM dd, yyyy hh:mm a")
}

export default function ViewBountyTaskDialog({
  open,
  onOpenChange,
  taskId,
}: Props) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task-details", taskId],
    queryFn: () => getBountyAndTaskById(taskId!),
    enabled: open && !!taskId,
  })

  const task: ITaskAndBounty | undefined = data?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Task / Bounty Details</DialogTitle>
          <DialogDescription>
            View full task information
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="space-y-4 px-6 py-5">

            {isLoading && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}

            {isError && (
              <p className="text-sm text-red-500">Failed to load task</p>
            )}

            {task && (
              <>
                {/* Basic */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Basic</h3>
                  <p><b>ID:</b> {task._id}</p>
                  <p><b>Title:</b> {task.title}</p>
                  <p><b>Description:</b> {task.description}</p>
                </div>

                {/* Status */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>{task.status}</Badge>
                    <Badge variant="secondary">{task.paymentStatus}</Badge>
                    <Badge variant="outline">{task.paymentFlowStatus}</Badge>
                  </div>
                </div>

                {/* Budget */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Budget</h3>
                  <p><b>Budget:</b> ${task.budget}</p>
                  <p><b>Deadline:</b> {formatDateTime(task.deadline)}</p>
                  <p><b>Max Submissions:</b> {task.maxSubmissions}</p>
                </div>

                {/* Requirements */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Requirements</h3>
                  <ul className="list-disc pl-5 text-sm">
                    {task.successRequirements?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Tags</h3>
                  <div className="flex gap-2 flex-wrap">
                    {task.categories?.map((c, i) => (
                      <Badge key={i} variant="secondary">{c}</Badge>
                    ))}
                    {task.tags?.map((t, i) => (
                      <Badge key={i} variant="outline">{t}</Badge>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Meta</h3>
                  <p><b>Created:</b> {formatDateTime(task.createdAt)}</p>
                  <p><b>Updated:</b> {formatDateTime(task.updatedAt)}</p>
                </div>
              </>
            )}

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

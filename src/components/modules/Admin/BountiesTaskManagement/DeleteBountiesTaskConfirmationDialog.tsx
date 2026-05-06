"use client"

import { deleteBountyAndTask } from "@/services/bounty.service"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ITaskAndBounty } from "@/types/bounty.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: ITaskAndBounty | null
}

const getTaskLabel = (task: ITaskAndBounty | null) => {
  if (!task) return "this task"
  return `"${task.title}"`
}

export default function DeleteBountyTaskConfirmationDialog({
  open,
  onOpenChange,
  task,
}: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteBountyAndTask,
  })

  const handleDelete = async () => {
    if (!task) {
      toast.error("Task not found")
      return
    }

    try {
      const res = await mutateAsync(task._id)

      if (!res) {
        toast.error("Failed to delete task")
        return
      }

      toast.success("Task deleted successfully")
      onOpenChange(false)

      await queryClient.invalidateQueries({ queryKey: ["tasks"] })
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {getTaskLabel(task)}? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e: any) => {
              e.preventDefault()
              void handleDelete()
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

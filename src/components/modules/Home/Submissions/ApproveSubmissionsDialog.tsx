"use client"

import { approvedBountySubmissionAction } from "@/app/(home)/my-bounties/[id]/submissions/_action"
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
import { ISubmission } from "@/types/submission.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: ISubmission | null
  bountyId: string
}

export default function ApproveSubmissionDialog({
  open,
  onOpenChange,
  submission,
  bountyId, 
}: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ submissionId, bountyId }: { submissionId: string; bountyId: string }) => {
      const res = await approvedBountySubmissionAction(bountyId, submissionId)
     console.log("IN APPROVED MODAL",res)     
      if (!res.success) {
        return { success: false }
      }
      return { success: true }
    },
  })

  const handleApprove = async () => {
    if (!submission) {
      toast.error("Submission not found")
      return
    }

    try {
      const res = await mutateAsync({ submissionId: submission._id, bountyId })

      if (!res?.success) {
        toast.error("Failed to approve submission")
        return
      }

      toast.success("Submission approved successfully")
      onOpenChange(false)

      await queryClient.invalidateQueries({ queryKey: ["submissions"] })
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  if (!submission) {
    return null
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Submission</AlertDialogTitle>
          
          <AlertDialogDescription asChild>
            <div>
              Are you sure you want to approve this submission and process the payment?
              <div className="mt-3 p-2 rounded bg-muted text-sm">
                <p><span className="font-medium">Task:</span> {typeof submission.task === "string" ? submission.task : submission.task?.title}</p>
                <p><span className="font-medium">User:</span> {typeof submission.user === "string" ? submission.user : submission.user?.username}</p>
              </div>
            </div>
          </AlertDialogDescription>
          
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault()
              void handleApprove()
            }}
          >
            {isPending ? "Approving..." : "Approve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

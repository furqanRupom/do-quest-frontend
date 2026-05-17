"use client"

import { rejectBountySubmissionAction } from "@/app/(home)/my-bounties/[id]/submissions/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ISubmission } from "@/types/submission.types"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: ISubmission | null
}

const getInitialValues = () => ({
  rejectionReason: "",
})

export default function RejectSubmissionDialog({
  open,
  onOpenChange,
  submission,
}: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { submissionId: string; rejectionReason: string }) => {
       const res = await rejectBountySubmissionAction(payload.submissionId, { rejectionReason: payload.rejectionReason })

       if(!res.success) {
         return {success:false}
       }
      return { success: true }
    },
  })

  const form = useForm({
    defaultValues: getInitialValues(),

    onSubmit: async ({ value }) => {
      if (!submission) {
        toast.error("Submission not found")
        return
      }

      if (!value.rejectionReason.trim()) {
        toast.error("Please provide a rejection reason")
        return
      }

      try {
        const res = await mutateAsync({
          submissionId: submission._id,
          rejectionReason: value.rejectionReason,
        })

        if (!res?.success) {
          toast.error("Failed to reject submission")
          return
        }

        toast.success("Submission rejected")
        onOpenChange(false)
        form.reset()

        await queryClient.invalidateQueries({ queryKey: ["submissions"] })
        router.refresh()
      } catch (error) {
        toast.error("Something went wrong")
      }
    },
  })

  if (!submission) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Reject Submission</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting this submission
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="px-6 py-5">
            {/* Submission Info */}
            <div className="mb-6 p-4 rounded-lg border bg-muted/30">
              <p className="text-sm"><span className="font-medium">Task:</span> {typeof submission.task === "string" ? submission.task : submission.task?.title}</p>
              <p className="text-sm mt-1"><span className="font-medium">User:</span> {typeof submission.user === "string" ? submission.user : submission.user?.username}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              {/* Rejection Reason */}
              <form.Field name="rejectionReason">
                {(field) => (
                  <AppField
                    field={field}
                    label="Rejection Reason"
                    type="textarea"
                    rows={10}
                    placeholder="Explain why this submission is being rejected..."
                  />
                )}
              </form.Field>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t pt-4 cursor-pointer">
                <DialogClose asChild>
                  <Button className="cursor-pointer" variant="outline">Cancel</Button>
                </DialogClose>

                <form.Subscribe
                  selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                >
                  {([canSubmit, isSubmitting]) => (
                    <AppSubmitButton
                      isPending={isSubmitting || isPending}
                      disabled={!canSubmit}
                    >
                      Reject Submission
                    </AppSubmitButton>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

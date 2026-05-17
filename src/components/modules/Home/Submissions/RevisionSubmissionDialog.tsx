"use client"

import { revisionBountySubmissionAction } from "@/app/(home)/my-bounties/[id]/submissions/_action"
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
  revisionNote: "",
})

export default function RevisionSubmissionDialog({
  open,
  onOpenChange,
  submission,
}: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { submissionId: string; revisionNote: string }) => {
       const res = await revisionBountySubmissionAction(payload.submissionId, { revisionNote: payload.revisionNote })

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

      if (!value.revisionNote.trim()) {
        toast.error("Please provide revision details")
        return
      }

      try {
        const res = await mutateAsync({
          submissionId: submission._id,
          revisionNote: value.revisionNote,
        })

        if (!res?.success) {
          toast.error("Failed to request revision")
          return
        }

        toast.success("Revision requested successfully")
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
          <DialogTitle>Request Revision</DialogTitle>
          <DialogDescription>
            Provide detailed feedback for the user to revise their submission
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="px-6 py-5">
            {/* Submission Info */}
            <div className="mb-6 p-4 rounded-lg border bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-200"><span className="font-medium">Task:</span> {typeof submission.task === "string" ? submission.task : submission.task?.title}</p>
              <p className="text-sm mt-1 text-blue-900 dark:text-blue-200"><span className="font-medium">User:</span> {typeof submission.user === "string" ? submission.user : submission.user?.username}</p>
            </div>

            {/* Current Message Preview */}
            <div className="mb-6 p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-sm mb-2">Current Submission Message</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {submission.message || "No message provided"}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              {/* Revision Note */}
              <form.Field name="revisionNote">
                {(field) => (
                  <AppField
                    field={field}
                    label="Revision Feedback"
                    type="textarea"
                    rows={10}
                    placeholder="Describe what needs to be revised or improved..."
                  />
                )}
              </form.Field>

              {/* Help Text */}
              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <span className="font-medium">Tip:</span> Be clear and specific about what changes are needed. The user will be able to resubmit based on your feedback.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t pt-4">
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
                      Request Revision
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

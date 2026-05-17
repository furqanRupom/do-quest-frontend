"use client"

import { resubmitBountySubmissionAction } from "@/app/(home)/submissions/_action"
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
import { useEffect } from "react"
import { toast } from "sonner"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: ISubmission | null
}

const getInitialValues = (submission: ISubmission | null) => ({
  message: submission?.message ?? "",
  attachments: submission?.attachments ?? [],
})

export default function ResubmitSubmissionModal({
  open,
  onOpenChange,
  submission,
}: Props) {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { message: string; attachments: string[] } }) =>
      resubmitBountySubmissionAction(id, payload),
  })

  const form = useForm({
    defaultValues: getInitialValues(submission),

    onSubmit: async ({ value }) => {
      if (!submission) {
        toast.error("Submission not found")
        return
      }

      const payload = {
        message: value.message,
        attachments: value.attachments || [],
      }

      try {
        const res = await mutateAsync({
          id: submission._id,
          payload,
        })

        if (!res?.success) {
          toast.error(res?.message || "Resubmission failed")
          return
        }

        toast.success("Submission updated successfully")
        onOpenChange(false)

        await queryClient.invalidateQueries({ queryKey: ["my-submissions"] })
      } catch (error) {
        toast.error("Something went wrong")
      }
    },
  })

  useEffect(() => {
    if (open && submission) {
      form.reset(getInitialValues(submission))
    }
  }, [submission, open, form])

  if (!submission) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Resubmit Your Submission</DialogTitle>
          <DialogDescription>
            Update your submission based on feedback
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="px-6 py-5">
            {/* Previous Feedback */}
            <div className="mb-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Feedback to Address</h4>
              {submission.revisionNote && (
                <div className="mb-3">
                  <p className="text-sm text-amber-800 dark:text-amber-300 mb-1">
                    <span className="font-medium">Revision Note:</span>
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-400 whitespace-pre-wrap">
                    {submission.revisionNote}
                  </p>
                </div>
              )}
              {submission.rejectionReason && (
                <div>
                  <p className="text-sm text-red-800 dark:text-red-300 mb-1">
                    <span className="font-medium">Rejection Reason:</span>
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400 whitespace-pre-wrap">
                    {submission.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              {/* Message */}
              <form.Field name="message">
                {(field) => (
                  <AppField
                    field={field}
                    label="Your Message"
                    placeholder="Describe your updated submission..."
                  />
                )}
              </form.Field>

              {/* Attachments Info */}
              <div className="rounded-lg border p-3 bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Current Attachments:</span> {submission.attachments?.length || 0} file{(submission.attachments?.length || 0) !== 1 ? "s" : ""}
                </p>
                {submission.attachments && submission.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {submission.attachments.map((attachment, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        • {attachment.split("/").pop()}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <form.Subscribe
                  selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                >
                  {([canSubmit, isSubmitting]) => (
                    <AppSubmitButton
                      isPending={isSubmitting || isPending}
                      disabled={!canSubmit}
                    >
                      Submit Changes
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

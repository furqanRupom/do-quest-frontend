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
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ISubmission } from "@/types/submission.types"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Link, Plus, X } from "lucide-react"

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
  const [newAttachment, setNewAttachment] = useState("")

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: { message: string; attachments: string[] }
    }) => resubmitBountySubmissionAction(id, payload),
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

        await queryClient.invalidateQueries({
          queryKey: ["my-submissions"],
        })
      } catch (error) {
        toast.error("Something went wrong")
      }
    },
  })

  useEffect(() => {
    if (open && submission) {
      form.reset(getInitialValues(submission))
      setNewAttachment("")
    }
  }, [submission, open, form])

  if (!submission) {
    return null
  }

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
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
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Feedback to Address
              </h4>
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
                    type="textarea"
                    rows={8}
                    placeholder="Describe your updated submission..."
                  />
                )}
              </form.Field>

              {/* Attachments */}
              <form.Field name="attachments">
                {(field) => {
                  const attachments: string[] = field.state.value ?? []

                  const handleAdd = () => {
                    const trimmed = newAttachment.trim()
                    if (!trimmed) return
                    if (!isValidUrl(trimmed)) {
                      toast.error("Please enter a valid URL")
                      return
                    }
                    if (attachments.includes(trimmed)) {
                      toast.error("This URL has already been added")
                      return
                    }
                    field.handleChange([...attachments, trimmed])
                    setNewAttachment("")
                  }

                  const handleRemove = (index: number) => {
                    const updated = attachments.filter((_, i) => i !== index)
                    field.handleChange(updated)
                  }

                  const handleKeyDown = (
                    e: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAdd()
                    }
                  }

                  return (
                    <div className="space-y-3">
                      <label className="text-sm font-medium">
                        Attachments
                        <span className="text-muted-foreground ml-1 text-xs font-normal">
                          (URLs, GitHub repos, file links, etc.)
                        </span>
                      </label>

                      {/* Existing attachments list */}
                      {attachments.length > 0 && (
                        <div className="space-y-2">
                          {attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="group flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2"
                            >
                              <Link className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <a
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 truncate text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
                              >
                                {attachment}
                              </a>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemove(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add new attachment */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://github.com/..."
                          value={newAttachment}
                          onChange={(e) => setNewAttachment(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAdd}
                          disabled={!newAttachment.trim()}
                          className="shrink-0 gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Press Enter or click Add to include a link. You can add
                        multiple URLs.
                      </p>
                    </div>
                  )
                }}
              </form.Field>

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

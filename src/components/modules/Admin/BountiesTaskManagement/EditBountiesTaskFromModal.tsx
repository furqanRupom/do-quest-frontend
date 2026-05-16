"use client"

import { updateBountiesTaskAction } from "@/app/(dashboard)/admin/dashboard/bounties-management/_action"
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
import { ITaskAndBounty } from "@/types/bounty.types"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "sonner"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: ITaskAndBounty | null
}

const getInitialValues = (task: ITaskAndBounty | null) => ({
  title: task?.title ?? "",
  description: task?.description ?? "",
  budget: task?.budget?.toString() ?? "",
  deadline: task?.deadline ?? "",
  maxSubmissions: task?.maxSubmissions?.toString() ?? "",
  categories: task?.categories?.join(", ") ?? "",
  tags: task?.tags?.join(", ") ?? "",
  successRequirements: task?.successRequirements?.join("\n") ?? "",
})

export default function EditBountyTaskModal({
  open,
  onOpenChange,
  task,
}: Props) {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ITaskAndBounty> }) =>
      updateBountiesTaskAction(id, payload),
  })

  const form = useForm({
    defaultValues: getInitialValues(task),

    onSubmit: async ({ value }) => {
      if (!task) {
        toast.error("Task not found")
        return
      }

      const payload: Partial<ITaskAndBounty> = {
        title: value.title,
        description: value.description,
        budget: Number(value.budget),
        deadline: value.deadline,
        maxSubmissions: Number(value.maxSubmissions),
        categories: value.categories.split(",").map((i) => i.trim()),
        tags: value.tags.split(",").map((i) => i.trim()),
        successRequirements: value.successRequirements
          .split("\n")
          .map((i) => i.trim()),
      }

      const res = await mutateAsync({
        id: task._id,
        payload,
      })

      if (!res) {
        toast.error("Update failed")
        return
      }

      toast.success("Task updated successfully")
      onOpenChange(false)

      await queryClient.invalidateQueries({ queryKey: ["tasks","bounty"] })
    },
  })

  useEffect(() => {
    if (open) {
      form.reset(getInitialValues(task))
    }
  }, [task, open, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Edit Task / Bounty</DialogTitle>
          <DialogDescription>
            Update task / Bounty information
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="px-6 py-5">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              {/* Title */}
              <form.Field name="title">
                {(field) => (
                  <AppField field={field} label="Title" />
                )}
              </form.Field>

              {/* Description */}
              <form.Field name="description">
                {(field) => (
                  <AppField field={field} label="Description" />
                )}
              </form.Field>

              {/* Budget */}
              <form.Field name="budget">
                {(field) => (
                  <AppField field={field} label="Budget" type="number" />
                )}
              </form.Field>

              {/* Deadline */}
              <form.Field name="deadline">
                {(field) => (
                  <AppField field={field} label="Deadline" type="number" />
                )}
              </form.Field>

              {/* Max submissions */}
              <form.Field name="maxSubmissions">
                {(field) => (
                  <AppField field={field} label="Max Submissions" type="number" />
                )}
              </form.Field>

              {/* Categories */}
              <form.Field name="categories">
                {(field) => (
                  <AppField
                    field={field}
                    label="Categories (comma separated)"
                  />
                )}
              </form.Field>

              {/* Tags */}
              <form.Field name="tags">
                {(field) => (
                  <AppField field={field} label="Tags (comma separated)" />
                )}
              </form.Field>

              {/* Requirements */}
              <form.Field name="successRequirements">
                {(field) => (
                  <AppField
                    field={field}
                    label="Success Requirements (one per line)"
                  />
                )}
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
                      Update Task
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

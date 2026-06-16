"use client"

import { updateUserAction } from "@/app/(dashboard)/admin/dashboard/users-management/_action"
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
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { IUser } from "@/types/user.types"
import { IUpdateUserPayload } from "@/zod/settings.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "sonner"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
}

const getInitialValues = (user: IUpdateUserPayload | null) => ({
    name: user?.name ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    isDeleted: user?.isDeleted ?? false,
    needPasswordChange: user?.needPasswordChange ?? false,
    location: user?.location ?? "",
    company: user?.company ?? "",
})

export default function EditUsersFormModal({ open, onOpenChange, user }: Props) {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<IUpdateUserPayload> }) =>
            updateUserAction(id, payload),
    })

    const form = useForm({
        defaultValues: getInitialValues(user),

        onSubmit: async ({ value }) => {
            if (!user) {
                toast.error("User not found")
                return
            }

            const payload: Partial<IUpdateUserPayload> = {
                name: value.name,
                username: value.username,
                email: value.email,
                isDeleted: value.isDeleted,
                needPasswordChange: value.needPasswordChange,
                location: value.location,
                company: value.company,
            }

            const res = await mutateAsync({ id: user._id, payload })

            if (!res) {
                toast.error("Update failed")
                return
            }

            toast.success("User updated successfully")
            onOpenChange(false)
            await queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    useEffect(() => {
        if (open) {
            form.reset(getInitialValues(user))
        }
    }, [user, open, form])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Update user information</DialogDescription>
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
                            <form.Field name="name">
                                {(field) => <AppField field={field} label="Name" />}
                            </form.Field>

                            <form.Field name="username">
                                {(field) => <AppField field={field} label="Username" />}
                            </form.Field>

                            <form.Field name="email">
                                {(field) => <AppField field={field} label="Email" type="email" />}
                            </form.Field>

                            <form.Field name="location">
                                {(field) => <AppField field={field} label="Location" />}
                            </form.Field>

                            <form.Field name="company">
                                {(field) => <AppField field={field} label="Company" />}
                            </form.Field>

                            {/* Is Deleted */}
                            <form.Field name="isDeleted">
                                {(field) => (
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <Label htmlFor="isDeleted" className="cursor-pointer">
                                            Is Deleted
                                        </Label>
                                        <Switch
                                            id="isDeleted"
                                            checked={field.state.value}
                                            onCheckedChange={(checked) => field.handleChange(checked)}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Need Password Change */}
                            <form.Field name="needPasswordChange">
                                {(field) => (
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <Label htmlFor="needPasswordChange" className="cursor-pointer">
                                            Need Password Change
                                        </Label>
                                        <Switch
                                            id="needPasswordChange"
                                            checked={field.state.value}
                                            onCheckedChange={(checked) => field.handleChange(checked)}
                                        />
                                    </div>
                                )}
                            </form.Field>

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
                                            Update User
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
"use client"

import { getUserAction } from "@/app/(dashboard)/admin/dashboard/users-management/_action"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    userId: string | null
}

const formatDateTime = (value?: string) => {
    if (!value) return "N/A"
    const d = new Date(value)
    if (isNaN(d.getTime())) return "N/A"
    return format(d, "MMM dd, yyyy hh:mm a")
}

export default function ViewUsersDialog({ open, onOpenChange, userId }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user-details", userId],
        queryFn: () => getUserAction(userId!),
        enabled: open && !!userId,
    })

    const user = data?.success ? data.data : null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>View full user information</DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[calc(90vh-5rem)]">
                    <div className="space-y-4 px-6 py-5">
                        {isLoading && (
                            <p className="text-sm text-muted-foreground">Loading...</p>
                        )}
                        {isError && (
                            <p className="text-sm text-red-500">Failed to load user</p>
                        )}

                        {user && (
                            <>
                                {/* Basic Info */}
                                <div className="rounded-lg border p-4 space-y-1">
                                    <h3 className="mb-2 font-semibold">Basic Info</h3>
                                    <p className="text-sm"><b>ID:</b> {user._id}</p>
                                    <p className="text-sm"><b>Name:</b> {user.name}</p>
                                    <p className="text-sm"><b>Username:</b> @{user.username}</p>
                                    <p className="text-sm"><b>Email:</b> {user.email}</p>
                                    <p className="text-sm capitalize"><b>Role:</b> {user.role}</p>
                                </div>

                                {/* Profile */}
                                <div className="rounded-lg border p-4 space-y-1">
                                    <h3 className="mb-2 font-semibold">Profile</h3>
                                    <p className="text-sm"><b>Location:</b> {user.location || "—"}</p>
                                    <p className="text-sm"><b>Company:</b> {user.company || "—"}</p>
                                </div>

                                {/* Status */}
                                <div className="rounded-lg border p-4">
                                    <h3 className="mb-2 font-semibold">Status</h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant={user.isDeleted ? "destructive" : "default"}>
                                            {user.isDeleted ? "Deleted" : "Active"}
                                        </Badge>
                                        <Badge variant={user.needPasswordChange ? "secondary" : "outline"}>
                                            {user.needPasswordChange ? "Password Change Required" : "Password OK"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="rounded-lg border p-4 space-y-1">
                                    <h3 className="mb-2 font-semibold">Meta</h3>
                                    <p className="text-sm"><b>Created:</b> {formatDateTime(user.createdAt)}</p>
                                    <p className="text-sm"><b>Updated:</b> {formatDateTime(user.updatedAt)}</p>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
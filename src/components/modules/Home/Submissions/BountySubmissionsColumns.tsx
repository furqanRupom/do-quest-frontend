"use client"

import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { ISubmission, SubmissionStatus } from "@/types/submission.types"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2, XCircle, MessageSquare } from "lucide-react"

const truncateText = (
  text: string | undefined | null,
  maxLen: number = 40
): string => {
  if (!text) return ""
  if (text.length <= maxLen) return text
  return `${text.slice(0, maxLen)}...`
}

const getStatusVariant = (status: SubmissionStatus | string) => {
  switch (status) {
    case SubmissionStatus.pending:
      return "default"
    case SubmissionStatus.approved:
      return "secondary"
    case SubmissionStatus.rejected:
      return "destructive"
    case SubmissionStatus.revision_requested:
      return "outline"
    default:
      return "outline"
  }
}

const getStatusIcon = (status: SubmissionStatus | string) => {
  switch (status) {
    case SubmissionStatus.pending:
      return null
    case SubmissionStatus.approved:
      return <CheckCircle2 className="w-4 h-4" />
    case SubmissionStatus.rejected:
      return <XCircle className="w-4 h-4" />
    case SubmissionStatus.revision_requested:
      return <MessageSquare className="w-4 h-4" />
    default:
      return null
  }
}

export const bountySubmissionColumns: ColumnDef<ISubmission>[] = [
  {
    id: "task",
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => (
      <span className="font-medium line-clamp-1 text-sm">
        {typeof row.original.task === "string"
          ? row.original.task
          : row.original.task?.title || "N/A"}
      </span>
    ),
  },
  {
    id: "user",
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <span className="text-sm">
        {typeof row.original.user === "string"
          ? row.original.user
          : row.original.user?.username ||
          row.original.user?.email ||
          "Anonymous"}
      </span>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {getStatusIcon(row.original.status)}
        <Badge variant={getStatusVariant(row.original.status)}>
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    id: "message",
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const msg = row.original.message
      if (!msg) return <span className="text-sm text-muted-foreground">No message</span>
      return (
        <span className="text-sm text-muted-foreground" title={msg}>
          {truncateText(msg, 40)}
        </span>
      )
    },
  },
  {
    id: "attachments",
    accessorKey: "attachments",
    header: "Files",
    enableSorting: false,
    cell: ({ row }) => {
      const count = row.original.attachments?.length ?? 0
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{count}</span>
          {count > 0 && (
            <span className="text-xs text-muted-foreground">file{count !== 1 ? "s" : ""}</span>
          )}
        </div>
      )
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => {
      if (!row.original.createdAt) return <span className="text-muted-foreground text-sm">N/A</span>
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
  // No Actions column needed here - DataTable handles it!
]

export const myBountySubmissionColumns: ColumnDef<ISubmission>[] = [
  {
    id: "task",
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => (
      <span className="font-medium line-clamp-1 text-sm">
        {typeof row.original.task === "string" ? truncateText(row.original.task, 40)
          : truncateText(row.original.task?.title, 40) || "N/A"}
      </span>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {getStatusIcon(row.original.status)}
        <Badge variant={getStatusVariant(row.original.status)}>
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    id: "message",
    accessorKey: "message",
    header: "Your Message",
    cell: ({ row }) => {
      const msg = row.original.message
      if (!msg) return <span className="text-sm text-muted-foreground">No message</span>
      return (
        <span className="text-sm text-muted-foreground" title={msg}>
          {truncateText(msg, 40)}
        </span>
      )
    },
  },
  {
    id: "revisionNote",
    accessorKey: "revisionNote",
    header: "Revision Note",
    cell: ({ row }) => {
      const note = row.original.revisionNote
      if (!note) return <span className="text-muted-foreground text-sm">—</span>
      return (
        <span className="text-sm text-amber-600 dark:text-amber-400" title={note}>
          {truncateText(note, 40)}
        </span>
      )
    },
  },
  {
    id: "rejectionReason",
    accessorKey: "rejectionReason",
    header: "Rejection Reason",
    cell: ({ row }) => {
      const reason = row.original.rejectionReason
      if (!reason) return <span className="text-muted-foreground text-sm">—</span>
      return (
        <span className="text-sm text-red-600 dark:text-red-400" title={reason}>
          {truncateText(reason, 40)}
        </span>
      )
    },
  },
  {
    id: "attachments",
    accessorKey: "attachments",
    header: "Files",
    enableSorting: false,
    cell: ({ row }) => {
      const count = row.original.attachments?.length ?? 0
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{count}</span>
          {count > 0 && (
            <span className="text-xs text-muted-foreground">file{count !== 1 ? "s" : ""}</span>
          )}
        </div>
      )
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => {
      if (!row.original.createdAt) return <span className="text-muted-foreground text-sm">N/A</span>
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
  // No Actions column needed here - DataTable handles it!
]

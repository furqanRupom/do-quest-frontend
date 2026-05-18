"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ISubmission, SubmissionStatus } from "@/types/submission.types"
import { format } from "date-fns"
import { 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink, 
  User, 
  ClipboardList, 
  Clock,
  FileText
} from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: ISubmission | null
}

const formatDateTime = (value?: string) => {
  if (!value) return "N/A"
  const d = new Date(value)
  if (isNaN(d.getTime())) return "N/A"
  return format(d, "MMM dd, yyyy hh:mm a")
}

const getStatusColor = (status: SubmissionStatus | string) => {
  switch (status) {
    case SubmissionStatus.pending:
      return "text-blue-600 dark:text-blue-400"
    case SubmissionStatus.approved:
      return "text-green-600 dark:text-green-400"
    case SubmissionStatus.rejected:
      return "text-red-600 dark:text-red-400"
    case SubmissionStatus.revision_requested:
      return "text-amber-600 dark:text-amber-400"
    default:
      return "text-gray-600 dark:text-gray-400"
  }
}

const getStatusIcon = (status: SubmissionStatus | string) => {
  switch (status) {
    case SubmissionStatus.approved:
      return <CheckCircle2 className="w-5 h-5" />
    case SubmissionStatus.rejected:
      return <AlertCircle className="w-5 h-5" />
    case SubmissionStatus.revision_requested:
      return <MessageSquare className="w-5 h-5" />
    default:
      return <Clock className="w-5 h-5" />
  }
}

export default function ViewSubmissionDetailsDialog({
  open,
  onOpenChange,
  submission,
}: Props) {
  if (!submission) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Changed to max-w-5xl w-full to guarantee it expands properly */}
      <DialogContent className="max-h-[90vh] max-w-5xl w-full overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            Review submission status and feedback
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="space-y-5 px-6 py-5">
            
            {/* Status & ID Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className={getStatusColor(submission.status)}>
                  {getStatusIcon(submission.status)}
                </div>
                <span className="font-semibold text-lg">
                  {submission.status?.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </div>
              <Badge className={`text-xs py-1 px-3 font-medium`}>
                ID: {submission._id?.substring(0, 10)}...
              </Badge>
            </div>

            {/* Revision Note (Conditionally Rendered) */}
            {submission.revisionNote && (
              <div className="rounded-lg border border-amber-200 dark:border-amber-800 p-4 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Revision Requested</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-300 whitespace-pre-wrap">
                      {submission.revisionNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Reason (Conditionally Rendered) */}
            {submission.rejectionReason && (
              <div className="rounded-lg border border-red-200 dark:border-red-800 p-4 bg-red-50/50 dark:bg-red-900/10">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">Rejection Reason</h3>
                    <p className="text-sm text-red-800 dark:text-red-300 whitespace-pre-wrap">
                      {submission.rejectionReason}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Information Grid */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-muted-foreground" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Task</p>
                  <p className="font-medium">
                    {typeof submission.task === "string"
                      ? submission.task
                      : submission.task?.title || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1">
                    <User className="w-3 h-3" /> Submitted By
                  </p>
                  <p className="font-medium">
                    {typeof submission.user === "string"
                      ? submission.user
                      : submission.user?.username || submission.user?.email || "Anonymous"}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Submission Message
              </h3>
              <div className="text-sm text-foreground whitespace-pre-wrap bg-muted/50 p-4 rounded-md border">
                {submission.message || "No message provided"}
              </div>
            </div>

            {/* Attachments - Links/URLs */}
            {submission.attachments && submission.attachments.length > 0 && (
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-semibold flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  Attachments ({submission.attachments.length})
                </h3>
                <div className="space-y-2">
                  {submission.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md border bg-muted/30 hover:bg-muted/60 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm truncate text-blue-600 dark:text-blue-400 group-hover:underline decoration-blue-400">
                        {attachment}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Timeline
              </h3>
              <div className="space-y-0 text-sm">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Submitted</span>
                  <span className="font-medium">{formatDateTime(submission.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{formatDateTime(submission.updatedAt)}</span>
                </div>
                {submission.stripeTransferId && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Transfer ID</span>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{submission.stripeTransferId}</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

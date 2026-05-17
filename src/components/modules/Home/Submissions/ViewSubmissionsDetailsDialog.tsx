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
import { Button } from "@/components/ui/button"
import { ISubmission, SubmissionStatus } from "@/types/submission.types"
import { format } from "date-fns"
import { Download, AlertCircle, CheckCircle2, MessageSquare } from "lucide-react"

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
      return null
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
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            Review and manage submission
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5rem)]">
          <div className="space-y-4 px-6 py-5">

            {/* Status Section */}
            <div className="rounded-lg border p-4 bg-muted/30">
              <div className="flex items-center gap-3 mb-3">
                {getStatusIcon(submission.status) && (
                  <div className={getStatusColor(submission.status)}>
                    {getStatusIcon(submission.status)}
                  </div>
                )}
                <h3 className="font-semibold">Status</h3>
              </div>
              <Badge variant="outline" className="text-base py-1 px-3">
                {submission.status}
              </Badge>
            </div>

            {/* Basic Information */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submission ID</p>
                  <p className="font-mono text-sm">{submission._id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Task</p>
                  <p className="text-sm">
                    {typeof submission.task === "string"
                      ? submission.task
                      : submission.task?.title || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted By</p>
                  <p className="text-sm">
                    {typeof submission.user === "string"
                      ? submission.user
                      : submission.user?.username || submission.user?.email || "Anonymous"}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">Submission Message</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded">
                {submission.message || "No message provided"}
              </p>
            </div>

            {/* Attachments */}
            {submission.attachments && submission.attachments.length > 0 && (
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-semibold">Attachments ({submission.attachments.length})</h3>
                <div className="space-y-2">
                  {submission.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50 hover:bg-muted/80 transition-colors">
                      <span className="text-sm truncate">{attachment}</span>
                      <a href={attachment} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Revision Note */}
            {submission.revisionNote && (
              <div className="rounded-lg border border-amber-200 dark:border-amber-800 p-4 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Revision Requested</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-300 whitespace-pre-wrap">
                      {submission.revisionNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            {submission.rejectionReason && (
              <div className="rounded-lg border border-red-200 dark:border-red-800 p-4 bg-red-50/50 dark:bg-red-900/10">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Rejection Reason</h3>
                    <p className="text-sm text-red-800 dark:text-red-300 whitespace-pre-wrap">
                      {submission.rejectionReason}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Meta Information */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">Timeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Submitted</span>
                  <span className="font-medium">{formatDateTime(submission.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-medium">{formatDateTime(submission.updatedAt)}</span>
                </div>
                {submission.stripeTransferId && (
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-muted-foreground">Transfer ID</span>
                    <span className="font-mono text-xs">{submission.stripeTransferId}</span>
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

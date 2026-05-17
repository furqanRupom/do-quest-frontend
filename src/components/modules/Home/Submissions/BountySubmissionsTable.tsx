"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { getBountySubmissions } from "@/services/submission.service"
import { PaginationMeta } from "@/types/api.types"
import { ISubmission, SubmissionStatus } from "@/types/submission.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import RejectSubmissionDialog from "./RejectSubmissionDialog"
import RevisionSubmissionDialog from "./RevisionSubmissionDialog"
import ViewSubmissionDetailsDialog from "./ViewSubmissionsDetailsDialog"
import ApproveSubmissionDialog from "./ApproveSubmissionsDialog"
import { bountySubmissionColumns } from "./BountySubmissionsColumns"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

interface BountySubmissionsTableProps {
  bountyId: string
  queryString: string
}

const BountySubmissionsTable = ({
  bountyId,
  queryString,
}: BountySubmissionsTableProps) => {
  const searchParams = useSearchParams()

  const {
    viewingItem,
    approvingItem,
    rejectingItem,
    revisionItem,
    isViewDialogOpen,
    isApproveDialogOpen,
    isRejectDialogOpen,
    isRevisionDialogOpen,
    onViewOpenChange,
    onApproveOpenChange,
    onRejectOpenChange,
    onRevisionOpenChange,
    tableActions,
  } = useRowActionModalState<ISubmission>({
    enableView: true,
    enableEdit: false,
    enableDelete: false,
    enableStatusChange: false,
    enableApprove: true,
    enableReject: true,
    enableRevision: true,
  })

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  })

  const { handleDebouncedSearchChange, searchTermFromUrl } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    })

  const finalQueryString = queryStringFromUrl || queryString

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["submissions", bountyId, finalQueryString],
    queryFn: () => getBountySubmissions(bountyId, finalQueryString),
  })

  const submissions = data?.success ? data?.data : []
  const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined

  return (
    <>
      <DataTable
        data={submissions}
        columns={bountySubmissionColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No submissions found for this bounty."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search by user, status...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={meta}
        actions={(submission) => ({
          // Always allow viewing
          onView: tableActions.onView,
          // Only allow approve/reject/revision if submission is pending
          onApprove: submission.status === SubmissionStatus.pending ? tableActions.onApprove : undefined,
          onReject: submission.status === SubmissionStatus.pending ? tableActions.onReject : undefined,
          onRevision: submission.status === SubmissionStatus.pending ? tableActions.onRevision : undefined,
        })}
      />

      <ViewSubmissionDetailsDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        submission={viewingItem}
      />

      <ApproveSubmissionDialog
        open={isApproveDialogOpen}
        onOpenChange={onApproveOpenChange}
        submission={approvingItem}
      />

      <RejectSubmissionDialog
        open={isRejectDialogOpen}
        onOpenChange={onRejectOpenChange}
        submission={rejectingItem}
      />

      <RevisionSubmissionDialog
        open={isRevisionDialogOpen}
        onOpenChange={onRevisionOpenChange}
        submission={revisionItem}
      />
    </>
  )
}

export default BountySubmissionsTable

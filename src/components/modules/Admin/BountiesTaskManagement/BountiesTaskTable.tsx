"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import {  retriveAllTaskBountiesAdmin } from "@/services/bounty.service"
import { PaginationMeta } from "@/types/api.types"
import { ITaskAndBounty } from "@/types/bounty.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { bountiesTaskColumns } from "./BountiesTaskColumns"
import EditBountyTaskModal from "./EditBountiesTaskFromModal"
import DeleteBountyTaskConfirmationDialog from "./DeleteBountiesTaskConfirmationDialog"
import ViewBountyTaskDialog from "./ViewBountiesTaskDialog"
import ChangeBountyStatusModal from "./BountyTaskChangeStatusModal"


const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const BountiesTaskTable = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams()

  const {
    viewingItem,
    editingItem,
    deletingItem,
    statusItem,
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    isStatusModalOpen,
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    onStatusOpenChange,
    tableActions,
  } = useRowActionModalState<ITaskAndBounty>()

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

  const queryString = queryStringFromUrl || initialQueryString

  const {
    searchTermFromUrl,
    handleDebouncedSearchChange,
  } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["tasks", queryString],
    queryFn: () => retriveAllTaskBountiesAdmin(queryString),
  })

  const tasks = data?.success ? data?.data :  []
  console.log(tasks)
  const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined

  return (
    <>
      <DataTable
        data={tasks}
        columns={bountiesTaskColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No tasks / bounties found."
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
          placeholder: "Search tasks by title or status...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        meta={meta}
        actions={tableActions}
      />

      <EditBountyTaskModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        task={editingItem}
      />
    <ChangeBountyStatusModal open={isStatusModalOpen} onOpenChange={onStatusOpenChange} task={statusItem} />

      <DeleteBountyTaskConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        task={deletingItem}
      />

      <ViewBountyTaskDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        taskId={viewingItem?._id ?? null}
      />
    </>
  )
}

export default BountiesTaskTable

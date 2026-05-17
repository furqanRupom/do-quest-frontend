"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { retriveAllMyBounties } from "@/services/bounty.service"
import { PaginationMeta } from "@/types/api.types"
import { ITaskAndBounty } from "@/types/bounty.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import ViewBountyTaskDialog from "../../Admin/BountiesTaskManagement/ViewBountiesTaskDialog"
import DeleteBountyTaskConfirmationDialog from "../../Admin/BountiesTaskManagement/DeleteBountiesTaskConfirmationDialog"
import ChangeBountyStatusModal from "../../Admin/BountiesTaskManagement/BountyTaskChangeStatusModal"
import EditBountyTaskModal from "../../Admin/BountiesTaskManagement/EditBountiesTaskFromModal"
import { myBountiesColumns } from "./MyBountiesColumns"


const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const MyBountiesTable = ({ initialQueryString }: { initialQueryString: string }) => {
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
    queryKey: ["bounty", queryString],
    queryFn: () => retriveAllMyBounties(queryString),
  })

  const tasks = data?.success ? data?.data : []
  const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined
console.log(tasks)
  return (
    <>
      <DataTable
        data={tasks}
        columns={myBountiesColumns}
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

export default MyBountiesTable

"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { PaginationMeta } from "@/types/api.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { IUser } from "@/types/user.types"
import { retriveAllUsers } from "@/services/user.service"
import { UsersColumns } from "./UsersColumns"
import EditUsersFormModal from "./EditUsersFormModal"
import ViewUsersDialog from "./ViewUsersDialog"


const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const UsersTable = ({ initialQueryString }: { initialQueryString: string }) => {
    const searchParams = useSearchParams()

    const {
        viewingItem,
        editingItem,
        isViewDialogOpen,
        isEditModalOpen,
        onViewOpenChange,
        onEditOpenChange,
        tableActions,
    } = useRowActionModalState<IUser>({
        enableDelete:false,
        enableStatusChange:false
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

    const queryString = queryStringFromUrl || initialQueryString

    const {
        searchTermFromUrl,
        handleDebouncedSearchChange,
    } = useServerManagedDataTableSearch({
        searchParams,
        updateParams,
    })

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["users", queryString],
        queryFn: () => retriveAllUsers(queryString),
    })

    const users = data?.success ? data?.data : []
    const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined

    return (
        <>
            <DataTable
                data={users}
                columns={UsersColumns}
                isLoading={isLoading || isFetching || isRouteRefreshPending}
                emptyMessage="No users found."
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
                    placeholder: "Search users by name or email...",
                    debounceMs: 700,
                    onDebouncedChange: handleDebouncedSearchChange,
                }}
                meta={meta}
                actions={tableActions}
            />

            <EditUsersFormModal
                open={isEditModalOpen}
                onOpenChange={onEditOpenChange}
                user={editingItem}
            />



            <ViewUsersDialog
                open={isViewDialogOpen}
                onOpenChange={onViewOpenChange}
                userId={viewingItem?._id ?? null}
            />
        </>
    )
}

export default UsersTable

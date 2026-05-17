"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationMeta } from "@/types/api.types";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash2, ArrowRightLeft, CheckCircle2, XCircle, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import DataTableFilters, {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "./DataTableFilters";
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";

export interface DataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
  onStatusChange?: (data: TData) => void;
  onApprove?: (data: TData) => void;
  onReject?: (data: TData) => void;
  onRevision?: (data: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableActions<TData> | ((data: TData) => DataTableActions<TData>);
  toolbarAction?: React.ReactNode;
  emptyMessage?: string;
  isLoading?: boolean;
  sorting?: {
    state: SortingState;
    onSortingChange: (state: SortingState) => void;
  };
  pagination?: {
    state: PaginationState;
    onPaginationChange: (state: PaginationState) => void;
  };
  search?: {
    initialValue?: string;
    placeholder?: string;
    debounceMs?: number;
    onDebouncedChange: (value: string) => void;
  };
  filters?: {
    configs: DataTableFilterConfig[];
    values: DataTableFilterValues;
    onFilterChange: (filterId: string, value: DataTableFilterValue | undefined) => void;
    onClearAll?: () => void;
  };
  meta?: PaginationMeta;
}

const DataTable = <TData,>({ data = [] as TData[], columns, actions, toolbarAction, emptyMessage, isLoading, sorting, pagination, search, filters, meta }: DataTableProps<TData>) => {

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const hydratedIsLoading = hasHydrated ? Boolean(isLoading) : false;
  const showLoadingOverlay = hydratedIsLoading;

  const tableColumns: ColumnDef<TData>[] = actions ? [...columns,

  // Action column
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const rowData = row.original;
      
      // Allow actions to be a function for row-specific logic, or an object
      const rowActions = typeof actions === 'function' ? actions(rowData) : actions;
      
      // Hide the dropdown completely if no actions apply to this row
      const hasActions = Object.values(rowActions).some(val => typeof val === 'function');

      if (!hasActions) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {rowActions.onView && (
              <DropdownMenuItem onClick={() => rowActions.onView?.(rowData)} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
            )}

            {rowActions.onEdit && (
              <DropdownMenuItem onClick={() => rowActions.onEdit?.(rowData)} className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
            )}

            {rowActions.onStatusChange && (
              <DropdownMenuItem onClick={() => rowActions.onStatusChange?.(rowData)} className="cursor-pointer">
                <ArrowRightLeft className="mr-2 h-4 w-4" /> Change Status
              </DropdownMenuItem>
            )}

            {rowActions.onApprove && (
              <DropdownMenuItem onClick={() => rowActions.onApprove?.(rowData)} className="cursor-pointer text-green-600 focus:text-green-600 focus:bg-green-50 dark:focus:bg-green-950">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
              </DropdownMenuItem>
            )}

            {rowActions.onReject && (
              <DropdownMenuItem onClick={() => rowActions.onReject?.(rowData)} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </DropdownMenuItem>
            )}

            {rowActions.onRevision && (
              <DropdownMenuItem onClick={() => rowActions.onRevision?.(rowData)} className="cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950">
                <MessageSquare className="mr-2 h-4 w-4" /> Request Revision
              </DropdownMenuItem>
            )}

            {rowActions.onDelete && (
              <DropdownMenuItem onClick={() => rowActions.onDelete?.(rowData)} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
  ] : columns;

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: !!sorting,
    manualPagination: !!pagination,
    pageCount: pagination ? Math.max(meta?.totalPages ?? 0, 0) : undefined,
    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
      ...(pagination ? { pagination: pagination.state } : {}),
    },
    onSortingChange: sorting ?
      (updater) => {
        const currentSortingState = sorting.state;
        const nextSortingState = typeof updater === "function" ? updater(currentSortingState) : updater;
        sorting.onSortingChange(nextSortingState);
      }
      : undefined,
    onPaginationChange: pagination
      ? (updater) => {
        const currentPaginationState = pagination.state;
        const nextPaginationState =
          typeof updater === "function"
            ? updater(currentPaginationState)
            : updater;

        pagination.onPaginationChange(nextPaginationState);
      }
      : undefined,
  });

  return (
    <div className="relative">
      {showLoadingOverlay && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}

      {(search || filters || toolbarAction) && (
        <div className="mb-4 flex flex-wrap items-start gap-3">
          {search && (
            <DataTableSearch
              key={search.initialValue ?? ""}
              initialValue={search.initialValue}
              placeholder={search.placeholder}
              debounceMs={search.debounceMs}
              onDebouncedChange={search.onDebouncedChange}
              isLoading={hydratedIsLoading}
            />
          )}

          {filters && (
            <DataTableFilters
              filters={filters.configs}
              values={filters.values}
              onFilterChange={filters.onFilterChange}
              onClearAll={filters.onClearAll}
              isLoading={hydratedIsLoading}
            />
          )}

          {toolbarAction && (
            <div className="ml-auto shrink-0">{toolbarAction}</div>
          )}
        </div>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        variant={"ghost"}
                        className="h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {
                          header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-1 h-4 w-4" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-1 h-4 w-4" />
                          ) : <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                        }

                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage || "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {pagination && (
          <DataTablePagination
            table={table}
            totalPages={meta?.totalPages}
            totalRows={meta?.total}
            isLoading={hydratedIsLoading}
          />
        )}
      </div>
    </div>
  );
}

export default DataTable

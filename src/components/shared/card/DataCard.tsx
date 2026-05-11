"use client";

import { PaginationMeta } from "@/types/api.types";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import DataCardSearch from "./DataCardSearch";
import DataCardFilters, {
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
} from "./DataCardFilters";
import DataCardPagination from "./DataCardPagination";

// ── Types ────────────────────────────────────────────────────────────────────

interface DataCardProps<TData> {
  data: TData[];
  renderCard: (item: TData) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonCount?: number;
  emptyContent?: React.ReactNode;
  gridClassName?: string;
  isLoading?: boolean;
  search?: {
    initialValue?: string;
    placeholder?: string;
    debounceMs?: number;
    onDebouncedChange: (value: string) => void;
  };
  filters?: {
    configs: DataTableFilterConfig[];
    values: DataTableFilterValues;
    onFilterChange: (
      filterId: string,
      value: DataTableFilterValue | undefined
    ) => void;
    onClearAll?: () => void;
  };
  pagination?: {
    state: PaginationState;
    onPaginationChange: (state: PaginationState) => void;
  };
  meta?: PaginationMeta;
  toolbarAction?: React.ReactNode;
}

// ── Main Component ───────────────────────────────────────────────────────────

const DataCard = <TData,>({
  data = [] as TData[],
  renderCard,
  renderSkeleton,
  skeletonCount = 6,
  emptyContent,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 gap-4",
  isLoading,
  search,
  filters,
  pagination,
  meta,
  toolbarAction,
}: DataCardProps<TData>) => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const hydratedIsLoading = hasHydrated ? Boolean(isLoading) : false;
  const totalPages = meta?.totalPages ?? 0;
  const totalItems = meta?.total ?? 0;

  const DefaultSkeleton = () => (
    <div className="rounded-xl border bg-white p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-24 bg-muted rounded-full" />
          <div className="h-5 w-3/4 bg-muted rounded" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="h-7 w-16 bg-muted rounded" />
          <div className="h-3 w-10 bg-muted rounded" />
        </div>
      </div>
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-5/6 bg-muted rounded" />
      <div className="flex gap-2 mt-1">
        <div className="h-5 w-12 bg-muted rounded-full" />
        <div className="h-5 w-16 bg-muted rounded-full" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-3">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
        <div className="h-8 w-24 bg-muted rounded-md" />
      </div>
    </div>
  );

  // Must be uppercase for React to render it as a component instead of an HTML tag
  const SkeletonComponent = renderSkeleton ?? DefaultSkeleton;

  return (
    <div className="relative">
      {/* Search, Filters, Toolbar */}
      {(search || filters || toolbarAction) && (
        <div className="mb-6 space-y-4">
          {search && (
            <DataCardSearch
              key={search.initialValue ?? ""}
              initialValue={search.initialValue}
              placeholder={search.placeholder}
              debounceMs={search.debounceMs}
              onDebouncedChange={search.onDebouncedChange}
              isLoading={hydratedIsLoading}
            />
          )}

          <div className="flex flex-wrap items-start gap-3">
            {filters && (
              <DataCardFilters
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
        </div>
      )}

      {/* Loading Overlay (only for subsequent page loads where data already exists) */}
      {hydratedIsLoading && data.length > 0 && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}

      {/* Card Grid / Loading / Empty State */}
      {hydratedIsLoading && data.length === 0 ? (
        <div className={gridClassName}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonComponent key={i} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="py-16">
          {emptyContent || (
            <p className="text-center text-sm text-muted-foreground">
              No data available.
            </p>
          )}
        </div>
      ) : (
        <div className={gridClassName}>
          {data.map((item, index) => (
            <div key={index}>{renderCard(item)}</div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="mt-8">
          <DataCardPagination
            pagination={pagination.state}
            onPaginationChange={pagination.onPaginationChange}
            totalPages={totalPages}
            totalRows={totalItems}
            isLoading={hydratedIsLoading}
          />
        </div>
      )}
    </div>
  );
};

export default DataCard;

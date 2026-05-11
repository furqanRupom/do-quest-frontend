"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PaginationState } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

type PaginationToken = number | "start-ellipsis" | "end-ellipsis";

const DEFAULT_PAGE_SIZES = [12, 24, 36, 48, 100] as const; // Adjusted for Cards (multiples of grid columns)

const isDefaultPageSize = (value: number) => {
  return DEFAULT_PAGE_SIZES.includes(value as (typeof DEFAULT_PAGE_SIZES)[number]);
};

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationToken[] => {
  if (totalPages <= 0) return [];
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  if (currentPage <= 5) return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
  if (currentPage >= totalPages - 4) return [1, "start-ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

  return [1, "start-ellipsis", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "end-ellipsis", totalPages];
};

interface DataCardPaginationProps {
  pagination: PaginationState;
  onPaginationChange: (state: PaginationState) => void;
  totalRows?: number;
  totalPages?: number;
  isLoading?: boolean;
}

const DataCardPagination = ({
  pagination,
  onPaginationChange,
  totalRows,
  totalPages,
  isLoading,
}: DataCardPaginationProps) => {
  const pageSize = pagination.pageSize;
  const currentPage = pagination.pageIndex + 1;
  const computedTotalPages = totalPages ?? 0;

  const [isCustomMode, setIsCustomMode] = useState<boolean>(!isDefaultPageSize(pageSize));
  const [customPageSize, setCustomPageSize] = useState<string>(String(pageSize));

  const isCurrentPageSizeCustom = !isDefaultPageSize(pageSize);
  const showCustomInput = isCustomMode || isCurrentPageSizeCustom;
  const pageSizeSelectValue = showCustomInput ? "custom" : String(pageSize);

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, computedTotalPages),
    [currentPage, computedTotalPages],
  );

  const goToPage = (page: number) => {
    onPaginationChange({ pageIndex: page - 1, pageSize });
  };

  const applyCustomPageSize = () => {
    const parsed = Number(customPageSize);
    if (!Number.isInteger(parsed) || parsed <= 0) return;
    setIsCustomMode(!isDefaultPageSize(parsed));
    onPaginationChange({ pageIndex: 0, pageSize: parsed });
  };

  const onPageSizeSelect = (value: string) => {
    if (value === "custom") {
      setIsCustomMode(true);
      setCustomPageSize(String(pageSize));
      return;
    }

    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) return;

    setIsCustomMode(false);
    setCustomPageSize(String(parsed));
    onPaginationChange({ pageIndex: 0, pageSize: parsed });
  };

  const jumpBackwardTarget = Math.max(1, currentPage - 5);
  const jumpForwardTarget = Math.min(computedTotalPages, currentPage + 5);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < computedTotalPages;

  if (computedTotalPages <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
      {/* Pagination Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs rounded-lg"
          onClick={() => goToPage(currentPage - 1)}
          disabled={!canGoPrevious || isLoading}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </Button>

        {paginationItems.map((item) => {
          if (item === "start-ellipsis") {
            return (
              <Button
                key="start-ellipsis"
                variant="ghost"
                size="sm"
                className="min-w-8 h-8 px-2 text-xs rounded-lg"
                onClick={() => goToPage(jumpBackwardTarget)}
                disabled={isLoading}
              >
                …
              </Button>
            );
          }

          if (item === "end-ellipsis") {
            return (
              <Button
                key="end-ellipsis"
                variant="ghost"
                size="sm"
                className="min-w-8 h-8 px-2 text-xs rounded-lg"
                onClick={() => goToPage(jumpForwardTarget)}
                disabled={isLoading}
              >
                …
              </Button>
            );
          }

          const isActive = item === currentPage;
          return (
            <Button
              key={item}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                "min-w-8 h-8 text-xs rounded-lg",
                isActive && "pointer-events-none shadow-sm"
              )}
              onClick={() => goToPage(item)}
              disabled={isLoading}
            >
              {item}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs rounded-lg"
          onClick={() => goToPage(currentPage + 1)}
          disabled={!canGoNext || isLoading}
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Page Size & Counts */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Select value={pageSizeSelectValue} onValueChange={onPageSizeSelect}>
          <SelectTrigger className="w-20 h-8 text-xs rounded-lg" aria-label="Cards per page">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>

          <SelectContent>
            {DEFAULT_PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)} className="text-xs">
                {size}
              </SelectItem>
            ))}
            <SelectItem value="custom" className="text-xs">Custom</SelectItem>
          </SelectContent>
        </Select>
        <span>per page</span>

        {showCustomInput && (
          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              min={1}
              className="h-8 w-20 text-xs rounded-lg"
              value={customPageSize}
              onChange={(event) => setCustomPageSize(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyCustomPageSize();
                }
              }}
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs rounded-lg"
              onClick={applyCustomPageSize}
              disabled={isLoading}
            >
              Apply
            </Button>
          </div>
        )}

        <span className="ml-1 text-muted-foreground/70">
          {totalRows ?? 0} results · Page {currentPage} of {computedTotalPages}
        </span>
      </div>
    </div>
  );
};

export default DataCardPagination;

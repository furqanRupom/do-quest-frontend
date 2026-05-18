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
const DEFAULT_PAGE_SIZES = [12, 24, 36, 48, 100] as const;

const isDefaultPageSize = (value: number) => DEFAULT_PAGE_SIZES.includes(value as (typeof DEFAULT_PAGE_SIZES)[number]);

const getPaginationItems = (currentPage: number, totalPages: number): PaginationToken[] => {
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

const DataCardPagination = ({ pagination, onPaginationChange, totalRows, totalPages, isLoading }: DataCardPaginationProps) => {
  const pageSize = pagination.pageSize;
  const currentPage = pagination.pageIndex + 1;
  const computedTotalPages = totalPages ?? 0;
  const canGoPrevious = currentPage > 1;
  const [isCustomMode, setIsCustomMode] = useState<boolean>(!isDefaultPageSize(pageSize));
  const [customPageSize, setCustomPageSize] = useState<string>(String(pageSize));

  const isCurrentPageSizeCustom = !isDefaultPageSize(pageSize);
  const showCustomInput = isCustomMode || isCurrentPageSizeCustom;
  const pageSizeSelectValue = showCustomInput ? "custom" : String(pageSize);

  const paginationItems = useMemo(() => getPaginationItems(currentPage, computedTotalPages), [currentPage, computedTotalPages]);

  const goToPage = (page: number) => onPaginationChange({ pageIndex: page - 1, pageSize });

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

  if (computedTotalPages <= 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border/30 pt-8 md:flex-row md:items-center md:justify-between">
      {/* Pagination Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 p-0 bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary hover:text-primary"
          onClick={() => goToPage(currentPage - 1)}
          disabled={!canGoPrevious || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {paginationItems.map((item) => {
          if (typeof item === "string") {
            return (
              <Button key={item} variant="ghost" size="sm" className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground" onClick={() => goToPage(item === "start-ellipsis" ? Math.max(1, currentPage - 5) : Math.min(computedTotalPages, currentPage + 5))} disabled={isLoading}>
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
                "h-10 w-10 p-0 text-xs cursor-pointer font-bold transition-all",
                isActive && "bg-primary/10 text-primary border border-primary shadow-[0_0_12px_rgba(0,245,255,0.3)] pointer-events-none",
                !isActive && "bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary hover:text-primary"
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
          className="h-10 w-10 p-0 cursor-pointer bg-card/40 backdrop-blur-xl border-border/50 hover:border-primary hover:text-primary"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= computedTotalPages || isLoading}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Page Size & Counts */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <Select value={pageSizeSelectValue} onValueChange={onPageSizeSelect}>
          <SelectTrigger className="w-20 h-9 text-xs bg-card/40 backdrop-blur-xl border-border/50" aria-label="Cards per page">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
            {DEFAULT_PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)} className="text-xs">{size}</SelectItem>
            ))}
            <SelectItem value="custom" className="text-xs">Custom</SelectItem>
          </SelectContent>
        </Select>
        <span className="uppercase tracking-widest text-[10px]">per page</span>

        {showCustomInput && (
          <div className="flex items-center gap-1.5">
            <Input type="number" min={1} className="h-8 w-20 text-xs bg-card/40 border-border/50" value={customPageSize} onChange={(event) => setCustomPageSize(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); applyCustomPageSize(); } }} />
            <Button size="sm" variant="outline" className="h-8 text-xs bg-card/40 border-border/50 hover:border-primary" onClick={applyCustomPageSize} disabled={isLoading}>Go</Button>
          </div>
        )}

        <span className="ml-1 text-muted-foreground/70 uppercase tracking-widest text-[10px]">
          {totalRows ?? 0} results · Page {currentPage} of {computedTotalPages}
        </span>
      </div>
    </div>
  );
};

export default DataCardPagination;

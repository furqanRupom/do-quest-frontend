"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

// Re-using exact types from DataTableFilters so your existing logic works seamlessly
export type {
  DataTableFilterOption,
  DataTableFilterConfig,
  DataTableFilterValue,
  DataTableFilterValues,
  SingleSelectFilterConfig,
  MultiSelectFilterConfig,
  RangeFilterConfig,
  RangeOperator,
  DataTableRangeValue,
} from "../table/DataTableFilters";

import {
  DataTableFilterConfig,
  DataTableFilterOption,
  DataTableFilterValue,
  DataTableFilterValues,
  DataTableRangeValue,
  RangeOperator,
} from "../table/DataTableFilters";

interface DataCardFiltersProps {
  filters: DataTableFilterConfig[];
  values: DataTableFilterValues;
  onFilterChange: (filterId: string, value: DataTableFilterValue | undefined) => void;
  onClearAll?: () => void;
  isLoading?: boolean;
}

const RANGE_OPERATOR_LABEL: Record<RangeOperator, string> = {
  gte: "Min",
  lte: "Max",
};

const RANGE_OPERATORS: RangeOperator[] = ["gte", "lte"];

const isRangeValue = (value: DataTableFilterValue | undefined): value is DataTableRangeValue => {
  return !!value && !Array.isArray(value) && typeof value === "object";
};

const getFilterActiveCount = (
  filter: DataTableFilterConfig,
  value: DataTableFilterValue | undefined,
): number => {
  if (!value) return 0;
  if (filter.type === "single-select") return typeof value === "string" && value.length > 0 ? 1 : 0;
  if (filter.type === "multi-select") return Array.isArray(value) ? value.length : 0;
  if (isRangeValue(value)) return Object.values(value).filter((item) => item && item.length > 0).length;
  return 0;
};

// ── Sub-components for Popovers ──────────────────────────────────────────

const MultiSelectFilterControl = ({ filter, value, isLoading, onFilterChange }: { filter: any; value: string[]; isLoading?: boolean; onFilterChange: any }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  return (
    <div className="space-y-3">
      <div className="max-h-52 space-y-2 overflow-auto pr-1">
        {filter.options.map((option: DataTableFilterOption) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm p-1 rounded-md hover:bg-muted">
            <Checkbox
              checked={selectedValues.includes(option.value)}
              onCheckedChange={(checked) => setSelectedValues(checked ? [...selectedValues, option.value] : selectedValues.filter((v) => v !== option.value))}
              disabled={isLoading}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedValues([])}>Clear</Button>
        <Button size="sm" className="w-full" onClick={() => onFilterChange(filter.id, selectedValues.length > 0 ? selectedValues : undefined)}>Apply</Button>
      </div>
    </div>
  );
};

const RangeFilterControl = ({ filter, value, isLoading, onFilterChange }: { filter: any; value: DataTableRangeValue; isLoading?: boolean; onFilterChange: any }) => {
  const [rangeValue, setRangeValue] = useState<DataTableRangeValue>(value);
  const applyNow = () => {
    const hasAnyValue = RANGE_OPERATORS.some((op) => rangeValue[op]?.trim());
    onFilterChange(filter.id, hasAnyValue ? rangeValue : undefined);
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {RANGE_OPERATORS.map((operator) => (
          <div key={operator} className="space-y-1">
            <Label className="text-xs text-muted-foreground">{RANGE_OPERATOR_LABEL[operator]}</Label>
            <Input
              type="number"
              value={rangeValue[operator] ?? ""}
              onChange={(e) => setRangeValue((prev) => ({ ...prev, [operator]: e.target.value }))}
              placeholder="0"
              disabled={isLoading}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="w-full" onClick={() => { setRangeValue({}); onFilterChange(filter.id, undefined); }}>Clear</Button>
        <Button size="sm" className="w-full" onClick={applyNow}>Apply</Button>
      </div>
    </div>
  );
};

// ── Active Badges ────────────────────────────────────────────────────────

type ActiveBadge = { key: string; label: string; onRemove: () => void };

const DataCardFilters = ({ filters, values, onFilterChange, onClearAll, isLoading }: DataCardFiltersProps) => {
  const totalActiveFilters = useMemo(() => {
    return filters.reduce((count, filter) => count + getFilterActiveCount(filter, values[filter.id]), 0);
  }, [filters, values]);

  const activeBadges = useMemo<ActiveBadge[]>(() => {
    const badges: ActiveBadge[] = [];
    for (const filter of filters) {
      const filterValue = values[filter.id];
      if (filter.type === "single-select" && typeof filterValue === "string" && filterValue.length > 0) {
        const option = filter.options.find((o) => o.value === filterValue);
        // Just show the category/status name in the badge, not the label prefix
        badges.push({ key: `${filter.id}:${filterValue}`, label: option?.label ?? filterValue, onRemove: () => onFilterChange(filter.id, undefined) });
      }
      if (filter.type === "multi-select" && Array.isArray(filterValue)) {
        for (const val of filterValue) {
          const option = filter.options.find((o) => o.value === val);
          badges.push({ key: `${filter.id}:${val}`, label: option?.label ?? val, onRemove: () => { const next = (filterValue as string[]).filter((v) => v !== val); onFilterChange(filter.id, next.length > 0 ? next : undefined); } });
        }
      }
      if (filter.type === "range" && isRangeValue(filterValue)) {
        for (const op of RANGE_OPERATORS) {
          const val = filterValue[op]?.trim();
          if (val) {
            badges.push({ key: `${filter.id}:${op}`, label: `${RANGE_OPERATOR_LABEL[op]} ${val}`, onRemove: () => { const next: DataTableRangeValue = { ...filterValue, [op]: "" }; const hasAny = RANGE_OPERATORS.some((o) => next[o]?.trim()); onFilterChange(filter.id, hasAny ? next : undefined); } });
          }
        }
      }
    }
    return badges;
  }, [filters, values, onFilterChange]);

  if (filters.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {filters.map((filter) => {
          // ── Render Single-Select as Wrapping Pills ──
          if (filter.type === "single-select") {
            return (
              <div key={filter.id} className="flex flex-wrap items-center gap-1.5 w-full">
                {filter.label && (
                  <span className="text-sm font-medium text-foreground mr-1">{filter.label}</span>
                )}
                {filter.options.map((option) => {
                  const isAllOption = option.value === "ALL";
                  const currentFilterValue = values[filter.id];
                  const isActive = isAllOption ? !currentFilterValue : currentFilterValue === option.value;

                  return (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 text-xs px-4 rounded-full font-medium transition-all",
                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-sm",
                        !isActive && "text-muted-foreground hover:text-foreground bg-background border-border/60"
                      )}
                      disabled={isLoading}
                      onClick={() => {
                        if (isAllOption) {
                          onFilterChange(filter.id, undefined);
                        } else {
                          onFilterChange(filter.id, isActive ? undefined : option.value);
                        }
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            );
          }

          // ── Render Multi-Select & Range as Popovers ──
          const filterValue = values[filter.id];
          const activeCount = getFilterActiveCount(filter, filterValue);

          return (
            <Popover key={`${filter.id}-${JSON.stringify(filterValue ?? null)}`}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-9 gap-1.5 text-xs font-medium rounded-lg border-border/60",
                    activeCount > 0 && "border-primary/50 text-primary bg-primary/5"
                  )}
                  disabled={isLoading}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {filter.label}
                  {activeCount > 0 && (
                    <Badge className="h-4 min-w-4 px-1 text-[10px] ml-1" variant="secondary">
                      {activeCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-72 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{filter.label}</h3>
                </div>
                {filter.type === "multi-select" && (
                  <MultiSelectFilterControl
                    filter={filter}
                    value={Array.isArray(filterValue) ? filterValue : []}
                    isLoading={isLoading}
                    onFilterChange={onFilterChange}
                  />
                )}
                {filter.type === "range" && (
                  <RangeFilterControl
                    filter={filter}
                    value={isRangeValue(filterValue) ? filterValue : {}}
                    isLoading={isLoading}
                    onFilterChange={onFilterChange}
                  />
                )}
              </PopoverContent>
            </Popover>
          );
        })}
      </div>

      {/* Active Filter Chips & Clear All */}
      {(activeBadges.length > 0 || totalActiveFilters > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {activeBadges.map((badge) => (
            <span
              key={badge.key}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {badge.label}
              <button
                type="button"
                onClick={badge.onRemove}
                disabled={isLoading}
                className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors disabled:pointer-events-none"
                aria-label={`Remove ${badge.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          
          {onClearAll && totalActiveFilters > 0 && (
            <Button
              type="button"
              variant="link"
              size="sm"
              className="h-6 text-xs text-destructive hover:text-destructive px-1"
              onClick={onClearAll}
              disabled={isLoading}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DataCardFilters;

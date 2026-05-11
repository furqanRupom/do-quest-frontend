
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { retriveBountiesAndTasks } from "@/services/bounty.service";
import { ITaskAndBounty, TaskStatus } from "@/types/bounty.types";
import { PaginationMeta } from "@/types/api.types";
import DataCard from "@/components/shared/card/DataCard";
import BountyCard from "./BountyCard";
import EmptyState from "./EmptyState";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
  DataTableFilterValue,
} from "@/components/shared/table/DataTableFilters";

// ── Configs ──────────────────────────────────────────────────────────────────

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12; 

const CATEGORIES = [
  { label: "All", value: "ALL" },
  { label: "AI / Machine Learning", value: "AI" },
  { label: "Web Development", value: "Web Development" },
  { label: "Mobile Development", value: "Mobile Development" },
  { label: "Blockchain / Web3", value: "Blockchain" },
  { label: "Ethical Hacking", value: "Ethical Hacking" },
  { label: "Cybersecurity", value: "Cybersecurity" },
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "Graphic Design", value: "Graphic Design" },
  { label: "Data Science", value: "Data Science" },
  { label: "Cloud / DevOps", value: "Cloud / DevOps" },
  { label: "Smart Contracts", value: "Smart Contracts" },
  { label: "Content Writing", value: "Content Writing" },
  { label: "QA / Testing", value: "QA / Testing" },
  { label: "Marketing / SEO", value: "Marketing / SEO" },
  { label: "Video / Animation", value: "Video / Animation" },
];

const TASK_STATUSES = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Disputed", value: "DISPUTED" },
];

// Categories first (Primary), Status second (Secondary)
const filterConfigs: DataTableFilterConfig[] = [
  {
    id: "categories",
    label: "Filter by category:",
    type: "single-select",
    options: CATEGORIES,
  },
];

// ── Component ────────────────────────────────────────────────────────────────

const BrowseBounties = ({
  initialQueryString,
}: {
  initialQueryString: string;
}) => {
  const searchParams = useSearchParams();

  // ── Server managed hooks ──
  const {
    queryStringFromUrl,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  // ── Map URL params to DataCardFilters format ──
  const filterValues: DataTableFilterValues = {
    categories: searchParams.get("categories") || undefined,
    status: (searchParams.get("status") as TaskStatus) || undefined,
  };

  // ── Handle filter updates ──
  const handleFilterChange = (
    filterId: string,
    value: DataTableFilterValue | undefined
  ) => {
    updateParams((params) => {
      params.set("page", "1");
      
      // If "ALL" is selected, remove the param so the backend fetches everything.
      // Otherwise, set the selected string value (e.g., categories=Blockchain)
      if (value && value !== "ALL") {
        params.set(filterId, String(value));
      } else {
        params.delete(filterId);
      }
    });
  };

  const handleClearFilters = () => {
    updateParams((params) => {
      params.delete("status");
      params.delete("categories");
      params.set("page", "1");
    });
  };

  // ── Fetch data ──
  const queryString = queryStringFromUrl || initialQueryString;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["browse-bounties", queryString],
    queryFn: () => retriveBountiesAndTasks(queryString),
  });

  const tasks = data?.success ? data?.data : [];
  const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined;
  const isBusy = isLoading || isFetching || isRouteRefreshPending;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ── Hero ── */}
      <div className="bg-background border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">
            Find your next opportunity
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            From quick tasks to complex projects, find bounties that match your
            skills and start earning on your own terms.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <DataCard
          data={tasks}
          renderCard={(task) => <BountyCard task={task} />}
          emptyContent={<EmptyState />}
          isLoading={isBusy}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
          search={{
            initialValue: searchTermFromUrl,
            placeholder: "Search by title, description, category...",
            onDebouncedChange: handleDebouncedSearchChange,
            debounceMs: 700,
          }}
          filters={{
            configs: filterConfigs,
            values: filterValues,
            onFilterChange: handleFilterChange,
            onClearAll: handleClearFilters,
          }}
          pagination={{
            state: optimisticPaginationState,
            onPaginationChange: handlePaginationChange,
          }}
          meta={meta}
        />
      </div>
    </div>
  );
};

export default BrowseBounties;

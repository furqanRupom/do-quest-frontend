"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { retriveBountiesAndTasks } from "@/services/bounty.service";
import { TaskStatus } from "@/types/bounty.types";
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
  { label: "All Quests", value: "ALL" },
  { label: "Web3", value: "Blockchain" },
  { label: "Backend", value: "backend" },
  { label: "Frontend", value: "Web Development" },
  { label: "Design", value: "UI/UX Design" },
  { label: "AI", value: "AI" },
  { label: "Mobile", value: "Mobile Development" },
  { label: "Security", value: "Cybersecurity" },
];

const filterConfigs: DataTableFilterConfig[] = [
  {
    id: "categories",
    label: "Filter by category:",
    type: "single-select",
    options: CATEGORIES,
  },
];

// ── Component ────────────────────────────────────────────────────────────────

const BrowseBounties = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams();

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

  const { searchTermFromUrl, handleDebouncedSearchChange } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  });

  const filterValues: DataTableFilterValues = {
    categories: searchParams.get("categories") || undefined,
    status: (searchParams.get("status") as TaskStatus) || undefined,
  };

  const handleFilterChange = (filterId: string, value: DataTableFilterValue | undefined) => {
    updateParams((params) => {
      params.set("page", "1");
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

  const queryString = queryStringFromUrl || initialQueryString;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["browse-bounties", queryString],
    queryFn: () => retriveBountiesAndTasks(queryString),
  });

  const tasks = data?.success ? data?.data : [];
  const meta: PaginationMeta | undefined = data?.success ? data?.meta : undefined;
  const isBusy = isLoading || isFetching || isRouteRefreshPending;

  return (
    <main className="min-h-screen bg-background relative">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,oklch(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,oklch(var(--secondary)/0.1),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-black text-foreground tracking-tighter mb-4">
            Marketplace
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Forge your path in the digital frontier. Solve high-stakes challenges and earn merit-based rewards in the global economy.
          </p>
        </section>

        {/* Data Grid Section */}
        <DataCard
          data={tasks}
          renderCard={(task) => <BountyCard task={task} />}
          emptyContent={<EmptyState />}
          isLoading={isBusy}
          gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          search={{
            initialValue: searchTermFromUrl,
            placeholder: "Search for quests, technologies, or rewards...",
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
    </main>
  );
};

export default BrowseBounties;
